import type {Graph, IDraggableConfig, IDraggableFollow} from "../Graph"
import type {PiParseOptions} from "piparser"
import type {IOptionContext, IParserParameters, IParserSettings, OptionHandler, Options} from "../parser/parser.types"
import {
    describeValue,
    invalidOption,
    PARSER_COLOR_VALUES
} from "../parser/parser.common"
import {themeOptionTypes, themeSyntaxes} from "../controls/controls"
import {Axes, isDomain, type XY} from "../pidraw.common"
import {AbstractFigure, type IColorValue, type IMarkOptions, type MarkerSide} from "../figures/AbstractFigure/AbstractFigure"
import {Point} from "../figures/Point/Point"
import {POINT_OPTIONS} from "../figures/Point/Point.parser"
import {ARC_OPTION_HANDLERS} from "../figures/Arc/Arc.parser"
import {BEZIER_OPTION_HANDLERS} from "../figures/Bezier/Bezier.parser"
import {AXIS_OPTION_HANDLERS} from "../figures/Axis/Axis.parser"
import {GRID_OPTION_HANDLERS} from "../figures/Grid/Grid.parser"
import {parseLabelPosition, parseLabelText} from "../figures/Label/Label.parser"
import {alignementDirection, DEFAULT_LABEL_POSITION, LABEL_POSITIONS} from "../figures/Label/Label.constraints"
import {InvalidArgumentError, OptionError} from "../errors"

export type {IOptionContext, OptionHandler, Options}

/** The width of the stroke that the options without a value give. */
const STROKE_WIDTHS = {ultrathin: 0.5, thin: 0.75, thick: 2.5, ultrathick: 4}

/** The sizes of `dash=…`, as patterns in pixels (a dash, then a gap). `md` is the pattern of `dash` alone. */
const DASH_SIZES: Record<string, string> = {xs: '2 2', sm: '4 3', md: '6 4', lg: '10 6', xl: '16 8'}

/** The options a point takes when it does not ask for a shape (`o`, `s` or `*`). */
const SHAPE_KEYS = Object.keys(POINT_OPTIONS)

/** The color of `color=red` or `color=red/0.5`, and the opacity that follows it. */
function colorOf(key: string, figure: AbstractFigure, {value, options}: IParserParameters): IColorValue {
    if (typeof value !== 'string' || options.length > 1) {
        throw invalidOption(key, figure, value, `a color (${key}=red) with an opacity or not (${key}=red/0.5)`)
    }

    const [opacity] = options as (number | string | undefined)[]

    if (opacity === undefined) {
        return {color: value}
    }

    if (typeof opacity !== 'number') {
        throw invalidOption(key, figure, opacity, 'an opacity, a number from 0 to 1')
    }

    return {color: value, opacity}
}

/**
 * The marker of `mark`, `mark=end`, `mark=both/20`, `mark=end/x/20`: the value is the side (`true` is both ends, `false` is none), and a
 * number among the parameters is the size, a text the shape.
 */
function markOf(figure: AbstractFigure, {value, options}: IParserParameters): IMarkOptions {
    if (typeof value !== 'string' && typeof value !== 'boolean') {
        throw invalidOption('mark', figure, value, "a side ('start', 'end', 'both' or 'none')")
    }

    const side = value === true ? 'both' : value === false ? 'none' : value
    const size = options.find(x => typeof x === 'number')
    const shape = options.find(x => typeof x === 'string')

    return {side: side as MarkerSide, ...(size === undefined ? {} : {size}), ...(shape === undefined ? {} : {shape})}
}

/** The sign before the name of a figure, in the position of a label, that pushes the label away from it (`label=A/>O`). */
const AWAY = '>'

/**
 * The figure that a label is pushed away from (`label=A/>O`).
 * @throws OptionError if there is no such figure, or if it has no point to be pushed away from.
 */
function referenceOf(key: string, figure: AbstractFigure, name: string, figures: Record<string, AbstractFigure>): AbstractFigure {
    const reference = Object.hasOwn(figures, name) ? figures[name] : undefined

    if (reference === undefined) {
        throw invalidOption(key, figure, `${AWAY}${name}`, `${AWAY} followed by the name of a figure that is defined before`)
    }

    if (!reference.referenceable) {
        throw invalidOption(key, figure, `${AWAY}${name}`, `${AWAY} followed by a point, a circle, an arc or a polygon (${name} is none of them)`)
    }

    return reference
}

function applyLabel(key: 'label' | 'tex'): OptionHandler {
    return (figure, {value, options}, {graph}) => {
        let text = figure.name // default value

        if (typeof value === 'string') {
            text = value // custom value
        }

        // Convert to indice for TeX label: [a-zA-Z][0-9] is converted to [a-zA-Z]_[0-9]
        if (key === 'tex' && text.length === 2 && !isNaN(+text[1])) {
            text = text[0] + '_' + text[1]
        }

        // Without a position, the figure keeps its own (`br`, or the one it chooses from where the label lies). `>O` is not a position: the
        // label is pushed away from the figure `O`.
        const given = options[0] as (typeof options)[0] | undefined
        const reference = typeof given === 'string' && given.startsWith(AWAY) ? referenceOf(key, figure, given.slice(AWAY.length), graph.figures) : null
        const alignement = typeof given === 'boolean' || given === undefined || reference !== null ? undefined : typeof given === 'string' ? parseLabelPosition(given) : null
        const offsetGiven = options[1]
        const rotate = options[2] as number | boolean | undefined

        if (alignement === null) {
            throw invalidOption(key, figure, given, `a position (${LABEL_POSITIONS.join(', ')}), one letter (t, m, b, l, c, r) that replaces the same part of ${DEFAULT_LABEL_POSITION}, or ${AWAY}<figure> to push the label away from a figure`)
        }

        if (offsetGiven !== undefined && typeof offsetGiven !== 'boolean' && typeof offsetGiven !== 'number'
            && !(typeof offsetGiven === 'object' && 'x' in offsetGiven && 'y' in offsetGiven)) {
            throw invalidOption(key, figure, offsetGiven, 'a shift in units (0.5;0), or a distance in units (0.5)')
        }

        // A distance alone pushes the label further in the direction where it lies: a position that lies in no direction (mc) has none.
        if (typeof offsetGiven === 'number' && alignement !== undefined && alignementDirection(alignement) === null) {
            throw invalidOption(key, figure, given, `a position that lies on a side (${alignement} has none) for the distance ${offsetGiven}`)
        }

        if (rotate !== undefined && rotate !== true && typeof rotate !== 'number') {
            throw invalidOption(key, figure, rotate, 'an angle in degrees, or nothing to turn the label with a line')
        }

        figure.setLabelReference(reference)
        figure.addLabel(parseLabelText(text, figure), {asHtml: key === 'tex', ...(graph.toTex === undefined ? {} : {texConverter: graph.toTex})})

        if (figure.label) {
            const offsetAsUnits = typeof offsetGiven === 'object' ? offsetGiven : {x: 0, y: 0}
            const axisX = graph.config.axis.x
            // A distance alone is in units of the x axis, like a radius.
            const push = typeof offsetGiven === 'number' ? offsetGiven * Math.hypot(axisX.x, axisX.y) : undefined
            const offset = {
                x: offsetAsUnits.x * graph.config.axis.x.x,
                y: -offsetAsUnits.y * graph.config.axis.y.y
            }

            figure.label.autoRotate = rotate === true

            figure.label.position(
                alignement,
                offset,
                typeof rotate === 'number' ? rotate : 0,
                push
            )
        }
    }
}

/**
 * The limits of a drag from the values of its option (`drag=grid`, `drag=Ox`, `drag=Oy`, `drag=-2:3`, `drag=f` for a figure `f`), which
 * can be given together. Two domains of the same axis limit the point to the part they share.
 * @throws InvalidArgumentError if a value means none of these (`drag` alone gives `true`, which limits nothing).
 */
export function dragConfig(values: unknown[], figures: Record<string, AbstractFigure>): IDraggableConfig {
    const config: IDraggableConfig = {}
    const follow: IDraggableFollow[] = []

    for (const value of values) {
        if (value === true) {
            continue
        }

        if (value === 'grid') {
            config.grid = true
        } else if (value === Axes.X) {
            config.along = 'x'
        } else if (value === Axes.Y) {
            config.along = 'y'
        } else if (isDomain(value)) {
            const axis = value.axis ?? 'x'
            const own = config.bounds?.[axis]

            config.bounds = {
                ...config.bounds,
                [axis]: {min: Math.max(own?.min ?? -Infinity, value.min), max: Math.min(own?.max ?? Infinity, value.max)}
            }
        } else if (typeof value === 'string' && Object.hasOwn(figures, value)) {
            follow.push(figures[value])
        } else {
            throw new InvalidArgumentError(`Invalid limit ${describeValue(value)}: expected grid, ${Axes.X}, ${Axes.Y}, an interval (-2:3) or the name of a figure`)
        }
    }

    if (follow.length > 0) {
        config.follow = follow
    }

    return config
}

const applyDrag: OptionHandler = (figure, {value, options}, {graph}) => {
    // Actually, only points are draggable.
    if (!(figure instanceof Point)) {
        throw new OptionError('drag', `The option "drag" is for a point, and "${figure.name}" is not one`)
    }

    graph.handle(figure, dragConfig([value, ...options], graph.figures))
}

/** Join the tables of options. @throws Error if two tables give the same option: a name belongs to one handler. */
function registry(...tables: Record<string, OptionHandler>[]): Record<string, OptionHandler> {
    const joined: Record<string, OptionHandler> = Object.create(null) as Record<string, OptionHandler>

    for (const table of tables) {
        for (const [key, handler] of Object.entries(table)) {
            if (key in joined) {
                throw new Error(`The option "${key}" is defined twice`)
            }

            joined[key] = handler
        }
    }

    return joined
}

/** Every option of a line of code, by name. The options of one kind of figure come with its parser. */
const OPTIONS = registry(
    // Appearance
    {
        w: (figure, {value}) => {
            if (typeof value !== 'number') {
                throw invalidOption('w', figure, value, 'a width, a number')
            }

            figure.stroke(value)
        },
        color: (figure, option) => { figure.stroke(colorOf('color', figure, option)) },
        fill: (figure, option) => { figure.fill(colorOf('fill', figure, option)) },
        dash: (figure, {value}) => {
            if (value === true) {
                figure.dash()
            } else if (typeof value === 'string' && Object.hasOwn(DASH_SIZES, value)) {
                figure.dash(DASH_SIZES[value])
            } else if (typeof value === 'string' || typeof value === 'number') {
                figure.dash(value)
            } else {
                throw invalidOption('dash', figure, value, 'a pattern or a size (xs, sm, md, lg, xl), like dash=5, dash=5 2 or dash=lg')
            }
        },
        dot: (figure) => { figure.dot() },
        mark: (figure, option) => { figure.mark(markOf(figure, option)) }
    },
    Object.fromEntries(Object.entries(STROKE_WIDTHS).map(([key, width]): [string, OptionHandler] => [key, (figure) => { figure.stroke(width) }])),

    // Visibility
    {
        hide: (figure) => { figure.hide() },
        '!': (figure) => { figure.hideShape() },
        '?': (figure) => { figure.label?.hide() },
        _: (figure, {value}) => { figure.static = value as boolean },
        static: (figure, {value}) => { figure.static = value as boolean }
    },

    // Placement
    {
        move: (figure, {value}) => { figure.move(value as XY) },
        scale: (figure, {value}) => { figure.scale(value as XY) }
    },

    // Label and text, draggable
    {
        label: applyLabel('label'),
        tex: applyLabel('tex'),
        drag: applyDrag
    },

    // The options of the themes (animation, slides...)
    ...themeSyntaxes().map(theme => theme.options),

    // The options of a kind of figure
    POINT_OPTIONS, ARC_OPTION_HANDLERS, BEZIER_OPTION_HANDLERS, AXIS_OPTION_HANDLERS, GRID_OPTION_HANDLERS
)

/** The names of the options of a line of code (the names of the colors are options too, see {@link applyOptions}). */
export function optionNames(): string[] {
    return Object.keys(OPTIONS)
}

let parseOptions: PiParseOptions | undefined

/**
 * What the parser needs to read a line of a figure. Every option is a known key, and so is every color: a value that is a text ends at the next
 * option, so the text of a label may hold commas (`label=Hello, world,red`). The text of `label` and of `tex` is kept as it is written, never converted.
 */
export function lineParseOptions(): PiParseOptions {
    parseOptions ??= {keys: [...optionNames(), ...PARSER_COLOR_VALUES], types: {label: 'text', tex: 'text', ...themeOptionTypes()}}

    return parseOptions
}

/**
 * Apply the options of a line of code to its figure, in the order they are written.
 * @throws OptionError if an option does not exist, cannot be applied to the figure, or has a value that is not valid. The options
 * before it are applied.
 * @param states what the commands before the line say, by theme (see {@link IOptionContext.states}).
 */
export function applyOptions(options: Options, figure: AbstractFigure, graph: Graph, states: ReadonlyMap<string, unknown> = new Map()): void {
    const context: IOptionContext = {graph, options, states}

    for (const [key, option] of Object.entries(options)) {
        applyOption(key, option, figure, context)
    }
}

function applyOption(key: string, option: IParserParameters, figure: AbstractFigure, context: IOptionContext): void {
    // The name of a color is an option that strokes the figure with that color.
    if (!(key in OPTIONS) && PARSER_COLOR_VALUES.includes(key)) {
        figure.stroke(key)
        return
    }

    if (!(key in OPTIONS)) {
        throw new OptionError(key, `Unknown option "${key}" for "${figure.name}"`)
    }

    try {
        OPTIONS[key](figure, option, context)
    } catch (error) {
        if (error instanceof InvalidArgumentError && !(error instanceof OptionError)) {
            throw new OptionError(key, `Invalid option "${key}" of "${figure.name}": ${error.message}`, {cause: error})
        }

        throw error
    }
}

/**
 * The options of a figure with what the settings of the graph add to them (see `IParserSettings`): the labels of the points, their shape,
 * their visibility. An option written in the line is never replaced. The options given are not changed.
 */
export function withDefaults(options: Options, settings: IParserSettings, figure: AbstractFigure): Options {
    if (!(figure instanceof Point)) {
        return options
    }

    const resolved: Options = {}
    const shape = settings.points

    // The shape that the points take when they do not ask for one (`points=s/12`).
    if (shape && !SHAPE_KEYS.some(key => Object.hasOwn(options, key)) && (shape.shape !== 'o' || shape.size !== undefined)) {
        resolved[shape.shape] = {value: shape.size ?? true, options: []}
    }

    Object.assign(resolved, options)

    const labelled = () => Object.hasOwn(resolved, 'label') || Object.hasOwn(resolved, 'tex')

    if (settings.label && !labelled()) {
        resolved.label = {value: true, options: []}
    }

    if (settings.tex && !labelled()) {
        resolved.tex = {value: true, options: []}
    }

    if (settings.points === false) {
        resolved['!'] = {value: true, options: []}
    }

    return resolved
}
