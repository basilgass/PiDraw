import {CSS_COLORS, numberCorrection, toCoordinates} from "../../calculus"
import {InvalidArgumentError, NotImplementedError} from "../../errors"
import type {IFigureAppearanceConfig, IGraphConfig, XY} from "../../pidraw.common"
import {
    alignementDirection,
    LABEL_PADDING,
    LABEL_SIZE_COMMANDS,
    labelAwayGap,
    labelPush,
    labelSizeInPoints,
    unitDirection
} from "../Label/Label.constraints"
import type {ILabelConfig} from "../Label/Label.types"

// How a figure is written in TikZ: pure functions from what the figure keeps (its appearance, its label, the graph it is in) to the text of
// the commands. The figure calls them through the helpers of `AbstractFigure` (`_tikzDraw`, `_tikzLabel`...); it never builds the text itself.

/** A pixel of the svg is 0.75 pt: the conversion of the widths and the lengths to TikZ. */
const PX_TO_PT = 0.75

/** The names that LaTeX shades like CSS, the default colors of the figures: they are written as they are, without a definition. */
const TIKZ_SAME_COLORS = ['black', 'white']

/** The TikZ arrow tip of a marker shape, on the end (`'>'`) or the start (`'<'`) of a path. */
const TIKZ_TIPS: Record<string, { start: string, end: string }> = {
    '->': {start: '<', end: '>'},
    '|': {start: '|', end: '|'},
    // The tip of a cross comes from the `arrows.meta` library.
    'x': {start: '{Rays[n=4,angle=45:1pt]}', end: '{Rays[n=4,angle=45:1pt]}'}
}

/** A number for LaTeX: rounded to the thousandth, without trailing zeros. */
export function tikzNumber(value: number, digits = 3): string {
    const factor = 10 ** digits

    return String(Math.round(value * factor) / factor)
}

/** A length in pixels as a TikZ length in points: `7.5pt`. */
export function tikzLength(pixels: number): string {
    return `${tikzNumber(pixels * PX_TO_PT)}pt`
}

/**
 * The TikZ name of a svg color, and the `\definecolor` it needs (`null` for the names that LaTeX shades like CSS). A named color is
 * defined from its CSS shade (`pidraw-green`), not left to `xcolor`, which gives `green`, `orange`, `purple`... other shades and does
 * not know `gold`.
 * `null` for a color that paints nothing ('transparent', 'none').
 * @throws InvalidArgumentError if the color is neither a hexadecimal color, an `rgb(r, g, b)`, nor a color name of CSS.
 */
export function tikzColor(value: string): { name: string, definition: string | null } | null {
    const color = value.trim().toLowerCase()

    if (color === 'transparent' || color === 'none') {
        return null
    }

    let hex: string | null = null
    const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(color)
    const long = /^#([0-9a-f]{6})$/.exec(color)
    const rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(color)

    if (short) {
        hex = short.slice(1).map(c => c + c).join('')
    } else if (long) {
        hex = long[1]
    } else if (rgb?.slice(1).every(c => +c <= 255)) {
        hex = rgb.slice(1).map(c => (+c).toString(16).padStart(2, '0')).join('')
    }

    if (hex !== null) {
        return definedColor(`pidraw-${hex}`, hex)
    }

    if (TIKZ_SAME_COLORS.includes(color)) {
        return {name: color, definition: null}
    }

    if (Object.hasOwn(CSS_COLORS, color)) {
        return definedColor(`pidraw-${color}`, CSS_COLORS[color])
    }

    throw new InvalidArgumentError(`The color "${value}" has no TikZ equivalent: use a hexadecimal color ('#rrggbb') or a name of CSS`)
}

function definedColor(name: string, hex: string): { name: string, definition: string } {
    return {name, definition: `\\definecolor{${name}}{HTML}{${hex.toUpperCase()}}`}
}

/** A position in pixels as a TikZ coordinate, in units of the coordinate system and with 5 decimals at most: `1.5,-2`. */
export function tikzCoordinates(pixels: XY, graph: IGraphConfig): string {
    const {x, y} = toCoordinates(pixels, graph)

    return `${tikzNumber(x, 5)},${tikzNumber(y, 5)}`
}

/** The length of one unit of each axis of the coordinate system, as TikZ lengths. */
export function tikzUnits(graph: IGraphConfig): { x: string, y: string } {
    const {x, y} = graph.axis

    return {x: tikzLength(Math.hypot(x.x, x.y)), y: tikzLength(Math.hypot(y.x, y.y))}
}

/** The part of the coordinate system that the drawing shows, in units. */
export function tikzView(graph: IGraphConfig): { x: [number, number], y: [number, number] } {
    const {origin, width, height, axis} = graph
    const xEnds = [-origin.x / axis.x.x, (width - origin.x) / axis.x.x]
    const yEnds = [-origin.y / axis.y.y, (height - origin.y) / axis.y.y]

    return {
        x: [Math.min(...xEnds), Math.max(...xEnds)],
        y: [Math.min(...yEnds), Math.max(...yEnds)]
    }
}

/**
 * The lines of a pgfplots `axis` with no axis drawn, that covers the drawing and has the units of the coordinate system.
 *
 * @param content the lines in the axis.
 * @param restrict the values of `x` and `y` that are kept: a point out of them is not a point of the curve (an asymptote)
 * and cuts the line.
 */
export function tikzAxis(graph: IGraphConfig, content: string[], restrict: { x?: [number, number], y?: [number, number] } = {}): string[] {
    const {x, y} = tikzView(graph)
    const unit = tikzUnits(graph)
    const {axis} = graph
    const number = (value: number) => numberCorrection(value, 5)
    const options = [
        'hide axis', 'scale only axis', 'trig format plots=deg', 'unbounded coords=jump',
        `x=${unit.x}`, `y=${unit.y}`,
        `at={(${tikzLength(x[0] * Math.abs(axis.x.x))},${tikzLength(y[0] * Math.abs(axis.y.y))})}`, 'anchor=south west',
        `xmin=${number(x[0])}`, `xmax=${number(x[1])}`, `ymin=${number(y[0])}`, `ymax=${number(y[1])}`
    ]

    for (const [name, range] of Object.entries(restrict)) {
        options.push(`restrict ${name} to domain=${number(range[0])}:${number(range[1])}`)
    }

    return [`\\begin{axis}[${options.join(', ')}]`, ...content, '\\end{axis}']
}

/**
 * How many samples pgfplots takes for a curve that starts from `intervals` intervals: it does not refine the curve where it
 * bends, as the drawing does, so it takes more.
 */
export function tikzSamples(intervals: number): number {
    return Math.min(1000, Math.max(2, Math.ceil(4 * intervals) + 1))
}

/**
 * A radius in pixels as the options of a TikZ circle or arc, in units of the coordinate system: `radius=2`. When the axes
 * have different scales it is written for each axis (`x radius=2, y radius=1`), so that the figure stays round like on screen.
 */
export function tikzRadius(pixels: number, graph: IGraphConfig): string {
    const {x, y} = graph.axis
    const scaleX = Math.hypot(x.x, x.y)
    const scaleY = Math.hypot(y.x, y.y)
    const radiusX = numberCorrection(pixels / scaleX, 5)

    if (Math.abs(scaleX - scaleY) <= 1e-9 * Math.max(scaleX, scaleY)) {
        return `radius=${radiusX}`
    }

    return `x radius=${radiusX}, y radius=${numberCorrection(pixels / scaleY, 5)}`
}

/** The options of a TikZ path, with the `\definecolor` they need. */
export interface TikzStyle {
    definitions: string[],
    options: string[]
}

/**
 * The options of a TikZ path for the appearance of a figure (stroke, fill, dashes, markers), and the `\definecolor` they need.
 * Defaults are written too: the width of the stroke is not the one of TikZ.
 *
 * @param dasharray the pattern of the dashes, as in svg (`null` for a solid line).
 * @param markers the shape of the marker at each end (`null` for none).
 * @throws InvalidArgumentError if a color has no TikZ equivalent.
 */
export function tikzStyle(
    appearance: IFigureAppearanceConfig,
    dasharray: string | null,
    markers: { start: string | null, end: string | null }
): TikzStyle {
    const {stroke, fill} = appearance
    const definitions = new Set<string>()
    const options: string[] = []

    const use = (value: string) => {
        const color = tikzColor(value)
        if (color?.definition) {
            definitions.add(color.definition)
        }
        return color?.name ?? null
    }

    const strokeColor = use(stroke.color)
    options.push(strokeColor === null ? 'draw=none' : `draw=${strokeColor}`)

    if (strokeColor !== null) {
        options.push(`line width=${tikzNumber(stroke.width * PX_TO_PT)}pt`)

        if (stroke.opacity < 1) {
            options.push(`draw opacity=${tikzNumber(stroke.opacity)}`)
        }
    }

    const fillColor = use(fill.color)
    if (fillColor !== null) {
        options.push(`fill=${fillColor}`)

        if (fill.opacity < 1) {
            options.push(`fill opacity=${tikzNumber(fill.opacity)}`)
        }
    }

    if (dasharray !== null) {
        const lengths = dasharray.split(/[\s,]+/).map(x => `${tikzNumber(+x * PX_TO_PT)}pt`)
        // Like in svg, a pattern with an odd number of lengths is repeated, so that dashes and gaps alternate.
        const pattern = lengths.length % 2 === 1 ? [...lengths, ...lengths] : lengths
        options.push(`dash pattern=${pattern.map((x, i) => `${i % 2 === 0 ? 'on' : 'off'} ${x}`).join(' ')}`)
    }

    if (markers.start !== null || markers.end !== null) {
        const start = markers.start === null ? '' : TIKZ_TIPS[markers.start].start
        const end = markers.end === null ? '' : TIKZ_TIPS[markers.end].end
        options.push(`${start}-${end}`)
    }

    return {definitions: [...definitions], options}
}

/**
 * The text of a label in TikZ. A label written in TeX (`tex`) is a formula (`A_1`, `\theta`): it is put between `$`, unless it has some
 * already, because LaTeX does not accept a subscript or a command of mathematics in a text. In a text, the infinity sign of a slope is
 * the formula `$\infty$`: `pdflatex` has no character for it.
 */
export function tikzLabelText(text: string, isTex: boolean): string {
    if (!isTex) {
        return text.replaceAll('∞', '$\\infty$')
    }

    return text.includes('$') ? text : `$${text}$`
}

type TikzLabelConfig = Pick<ILabelConfig, 'alignement' | 'offset' | 'rotate'> & Partial<Pick<ILabelConfig, 'away' | 'push' | 'clearance' | 'color' | 'fill' | 'size'>>

/**
 * The size of the text of a label in LaTeX: the command of its name (`\small`) or `\fontsize{9pt}{10.8pt}\selectfont`. `null` for the size of
 * the page.
 * @throws InvalidArgumentError if the size is not one that a label can have (see `parseLabelSize`).
 */
export function tikzLabelFont(size: string): string | null {
    if (Object.hasOwn(LABEL_SIZE_COMMANDS, size)) {
        return LABEL_SIZE_COMMANDS[size]
    }

    const points = labelSizeInPoints(size)

    return points === null ? null : `\\fontsize{${tikzNumber(points)}pt}{${tikzNumber(points * 1.2)}pt}\\selectfont`
}

/**
 * The `\definecolor` that the color of the text and the background of a label need, before its `\node` (see {@link tikzLabelNode}).
 * @throws InvalidArgumentError if a color has no TikZ equivalent.
 */
export function tikzLabelDefinitions({color = null, fill = null}: Partial<Pick<ILabelConfig, 'color' | 'fill'>>): string[] {
    return [color, fill?.color ?? null]
        .flatMap(value => value === null ? [] : [tikzColor(value)?.definition ?? null])
        .filter((definition): definition is string => definition !== null)
        .filter((definition, index, all) => all.indexOf(definition) === index)
}

/**
 * The `\node` of a label. The color of the text is `text=`; the background is `fill=` (with `fill opacity=` when it is not opaque), and
 * the margin of the box is `inner sep=`, the one of the svg.
 * @param at where the figure puts its label, in the units of the coordinate system (`'1,2'`).
 * @param text the text of the node, as it is written (see {@link tikzLabelText}).
 * @throws InvalidArgumentError if a color has no TikZ equivalent.
 */
export function tikzLabelNode(config: TikzLabelConfig, at: string, text: string): string {
    const {alignement, offset, rotate, away = null, push = null, clearance = 0, color = null, fill = null, size = 'inherit'} = config
    const direction = away === null ? null : unitDirection(away)
    const vertical = {t: 'above', b: 'below', m: ''}[alignement[0] as 't' | 'b' | 'm']
    const horizontal = {l: 'left', r: 'right', c: ''}[alignement[1] as 'l' | 'r' | 'c']
    // A label that lies on the side that a direction points to (any angle) has the point of its border that faces the anchor on the node: the
    // angle of that point, from the center of the box, is the opposite of the direction (y points up in TikZ, down on the screen).
    const options = [direction === null ? `${vertical} ${horizontal}`.trim() : `anchor=${tikzNumber(Math.atan2(direction.y, -direction.x) * 180 / Math.PI)}`]

    // The push, and the gap of a label that lies in a direction, are in pixels on the screen: further along the direction where it lies.
    const gap = direction === null ? {x: 0, y: 0} : labelAwayGap(direction)
    const pushed = labelPush(direction ?? alignementDirection(alignement), push ?? clearance)
    // The offset is in pixels with y pointing up, the rotation is clockwise in svg and counterclockwise in TikZ.
    const shift = {x: offset.x + pushed.x + gap.x, y: offset.y - pushed.y - gap.y}

    if (Math.abs(shift.x) > 1e-9) {
        options.push(`xshift=${tikzNumber(shift.x * PX_TO_PT)}pt`)
    }
    if (Math.abs(shift.y) > 1e-9) {
        options.push(`yshift=${tikzNumber(shift.y * PX_TO_PT)}pt`)
    }
    if (rotate) {
        options.push(`rotate=${tikzNumber(-rotate)}`)
    }

    const textColor = color === null ? null : tikzColor(color)
    const fillColor = fill === null ? null : tikzColor(fill.color)

    const font = tikzLabelFont(size)

    if (font !== null) {
        options.push(`font=${font}`)
    }

    if (textColor !== null) {
        options.push(`text=${textColor.name}`)
    }
    if (fillColor !== null && fill !== null) {
        options.push(`fill=${fillColor.name}`, ...(fill.opacity < 1 ? [`fill opacity=${tikzNumber(fill.opacity)}`] : []), `inner sep=${tikzNumber(LABEL_PADDING * PX_TO_PT)}pt`)
    }

    const style = options.filter(x => x !== '').join(', ')
    return `\\node${style === '' ? '' : `[${style}]`} at (${at}) {${text}};`
}

/** The lines to put before `\begin{document}` for the pictures of a graph: the packages and the libraries that its figures need. */
export const TIKZ_PREAMBLE = [
    '\\usepackage{tikz}',
    '\\usepackage{pgfplots}',
    '\\pgfplotsset{compat=1.18}',
    '\\usetikzlibrary{arrows.meta}',
    '\\usepgfplotslibrary{fillbetween}'
].join('\n')

/**
 * A whole `tikzpicture` of a graph: the unit of each axis (so that the commands of the figures, written in units of the coordinate
 * system, land where they are on screen), the size of the part of the coordinate system that the drawing shows, and the commands of the
 * figures one after the other.
 *
 * The commands are cut to that part, as the svg is cut to its `viewBox`, except the `axis` of pgfplots (the figures that draw a function),
 * which cut themselves to their limits: a `\clip` that is active when a `fill between` is written makes pgfplots fail ("Dimension too
 * large"), so the clip is put in a `scope` around the commands that follow each other between two `axis`.
 *
 * @param fragments the commands of each figure, from the one drawn first; the ones that are empty (a figure that is hidden) are left out.
 * @throws NotImplementedError if the x axis does not go to the right or the y axis does not go up, along the screen: TikZ units are
 * along its own axes, and the commands of the figures are written for them.
 * @throws InvalidArgumentError if the drawing is wider or higher than TeX can hold (about 5.8 meters): LaTeX would fail with "Dimension too large".
 */
export function tikzPicture(graph: IGraphConfig, fragments: string[]): string {
    const {x, y} = graph.axis

    if (!(Math.abs(x.y) <= TIKZ_ORTHOGONAL && Math.abs(y.x) <= TIKZ_ORTHOGONAL && x.x > 0 && y.y < 0)) {
        throw new NotImplementedError('A graph can be written in TikZ only if its x axis goes to the right and its y axis goes up')
    }

    if (Math.max(graph.width, graph.height) * PX_TO_PT > TEX_MAX_DIMENSION) {
        throw new InvalidArgumentError(`A drawing of ${tikzLength(graph.width)} by ${tikzLength(graph.height)} is too large for TeX, which holds at most ${TEX_MAX_DIMENSION}pt`)
    }

    const unit = tikzUnits(graph)
    const view = tikzView(graph)
    const number = (value: number) => numberCorrection(value, 5)
    const window = `(${number(view.x[0])},${number(view.y[0])}) rectangle (${number(view.x[1])},${number(view.y[1])})`

    const body: string[] = []
    let clipped: string[] = []
    const flush = () => {
        if (clipped.length > 0) {
            body.push('\\begin{scope}', `\\clip ${window};`, ...clipped, '\\end{scope}')
            clipped = []
        }
    }

    // The colors are defined once, at the start: a fragment keeps its own `\definecolor` to be usable alone, the picture gathers them.
    const definitions = new Set<string>()
    const withoutDefinitions = (fragment: string) => fragment.split('\n').filter(line => {
        if (!line.startsWith('\\definecolor')) {
            return true
        }
        definitions.add(line)
        return false
    }).join('\n')

    for (const fragment of fragments.map(withoutDefinitions).filter(fragment => fragment !== '')) {
        if (fragment.includes('\\begin{axis}')) {
            flush()
            body.push(fragment)
        } else {
            clipped.push(fragment)
        }
    }

    flush()

    return [
        `\\begin{tikzpicture}[x=${unit.x}, y=${unit.y}]`,
        ...definitions,
        `\\path ${window};`,
        ...body,
        '\\end{tikzpicture}'
    ].join('\n')
}

/** The greatest length that TeX holds, in points. */
const TEX_MAX_DIMENSION = 16383

/** An axis is along the screen up to this, in pixels. */
const TIKZ_ORTHOGONAL = 1e-9
