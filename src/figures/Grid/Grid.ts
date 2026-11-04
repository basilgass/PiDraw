import type {Path, Shape} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import {gridBoxLines, gridLines, numberCorrection, pathNumber, toCoordinates, toPixels} from "../../calculus"
import {checkGrid, stepOf} from "./Grid.constraints"
import type {IGridConfig} from "./Grid.types"

/** The lines of a grid that are closer than this, in pixels, are not drawn: they would be a gray surface. */
const MIN_SPACING = 3

/** How much of the color of the grid the lines of the subdivisions keep. */
const SUBDIVISION_OPACITY = 0.5

/** The path of segments, with 2 decimals at most. `M 0 0` for none. */
function segmentsPath(lines: [XY, XY][]): string {
    const at = (p: XY) => `${pathNumber(p.x)},${pathNumber(p.y)}`

    return lines.length === 0 ? 'M 0 0' : lines.map(([a, b]) => `M${at(a)} L${at(b)}`).join(' ')
}

/**
 * The grid of the coordinate system: lines parallel to its two axes, a step apart (see {@link IGridConfig}), on the whole drawing, and
 * optionally lines that cut each step in equal parts.
 *
 * It follows the axes of the graph as they are when it is computed, so it is right for axes that are not orthogonal. Lines that would
 * be closer than `MIN_SPACING` pixels are not drawn (the subdivisions are dropped on their own when they are too close), and a
 * grid without any line is not drawn at all (`visibility="hidden"`): it is drawn again when the drawing is zoomed in.
 *
 * The subdivisions have the color, the width and the dashes of the grid, with half of its opacity.
 */
export class Grid extends AbstractFigure {
    /**
     * @throws InvalidArgumentError if the step is not made of two finite numbers greater than 0, or the subdivisions are not an integer
     * from 2 to 20. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IGridConfig = {}) {
        // Before the figure draws anything in the svg.
        checkGrid(values, name)

        super(context, name)

        this.static = true
        this.appearance.stroke.color = 'lightgray'

        this._config = {...values}
        this._lines = []
        this._subLines = []

        this._makeShape()
        this.computed()
    }

    protected _config: IGridConfig

    get config(): IGridConfig {
        return this._config
    }

    /**
     * Replace the config of the grid: it is drawn again.
     * @throws InvalidArgumentError if `value` is not valid (see the constructor). The grid is then left as it was.
     */
    set config(value: IGridConfig) {
        checkGrid(value, this.name)

        this._config = {...value}
        this.computed()
    }

    protected _lines: [XY, XY][]

    protected _subLines: [XY, XY][]

    protected _sub?: Path

    /** The lines of the grid that are drawn, in pixels: the part of each one that is in the drawing. A copy, empty when nothing is drawn. */
    get lines(): [XY, XY][] {
        return this._lines.map(([a, b]) => [{...a}, {...b}])
    }

    /** The lines of the subdivisions, which are not lines of the grid. A copy. */
    get subLines(): [XY, XY][] {
        return this._subLines.map(([a, b]) => [{...a}, {...b}])
    }

    /** The part of the coordinate system that is seen, as the smallest box in units that has the drawing. */
    protected _view(): { x: { min: number, max: number }, y: { min: number, max: number } } {
        const {width, height} = this.graphConfig
        const corners = [{x: 0, y: 0}, {x: width, y: 0}, {x: 0, y: height}, {x: width, y: height}].map(corner => toCoordinates(corner, this.graphConfig))
        const xs = corners.map(corner => corner.x)
        const ys = corners.map(corner => corner.y)

        return {x: {min: Math.min(...xs), max: Math.max(...xs)}, y: {min: Math.min(...ys), max: Math.max(...ys)}}
    }

    /** The lines parallel to each axis, one family after the other, for a step of `parts` times less. */
    protected _family(parts: number, skipEvery: number): [XY, XY][] {
        const {origin, width, height, axis} = this.graphConfig
        const step = stepOf(this._config)
        const {x, y} = this._config

        if (x !== undefined && y !== undefined) {
            return gridBoxLines({x, y}, this._view(), step, (position) => toPixels(position, this.graphConfig), MIN_SPACING, parts)
        }

        // The lines parallel to an axis are a step of the other axis apart.
        return [
            ...gridLines(origin, axis.x, {x: axis.y.x * step.y / parts, y: axis.y.y * step.y / parts}, width, height, MIN_SPACING, skipEvery),
            ...gridLines(origin, axis.y, {x: axis.x.x * step.x / parts, y: axis.x.y * step.x / parts}, width, height, MIN_SPACING, skipEvery)
        ]
    }

    /** Find the lines again from the axes of the graph, and draw them. */
    computed(): this {
        const parts = this._config.subdivisions ?? 0

        this._lines = this._family(1, 0)
        this._subLines = parts === 0 ? [] : this._family(parts, parts)
        this._setDefined(this._lines.length > 0 || this._subLines.length > 0)

        ;(this.shape as Path).plot(segmentsPath(this._lines))
        this._sub?.plot(segmentsPath(this._subLines))

        return this
    }

    /** A grid has no label. */
    moveLabel(): this {
        return this
    }

    /** The grid and its subdivisions carry the stroke. */
    override strokeable(): Shape[] {
        return this._sub === undefined ? [this.shape] : [this.shape, this._sub]
    }

    /**
     * The grid as TikZ: its lines in one `\draw` with `grid`, whose lines are at the multiples of the step from the origin as the ones of the
     * grid are, then the lines of the subdivisions in another one, with half of the opacity, under it. When `grid` cannot say what is drawn
     * (the lines of a direction are too close to be drawn, or the axes are not orthogonal) the lines are written one by one.
     * Nothing for a grid that is hidden or not drawn.
     * @throws InvalidArgumentError if the appearance of the grid has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        if ((this._lines.length === 0 && this._subLines.length === 0) || !this._tikzShown().shape) {
            return ''
        }

        const draw = (lines: [XY, XY][], parts: number) => lines.length === 0
            ? ''
            : this._tikzDraw(this._tikzGridPath(parts) ?? lines.map(([a, b]) => `(${this._tikzCoordinates(a)}) -- (${this._tikzCoordinates(b)})`).join(' '))
        const subdivisions = draw(this._subLines, this._config.subdivisions ?? 1)

        return [
            subdivisions === '' ? '' : `\\begin{scope}[opacity=${SUBDIVISION_OPACITY}]\n${subdivisions}\n\\end{scope}`,
            draw(this._lines, 1)
        ].filter(part => part !== '').join('\n')
    }

    /**
     * The path of the lines of the grid for the steps of `1 / parts` of its step, with the `grid` of TikZ: from corner to corner of the part of the
     * coordinate system that the grid has (a box also gets its four edges, which are lines of the grid whatever the step is), in units.
     * `null` if the lines of a direction are closer than a pixel limit and so are not drawn, or the axes are not orthogonal: `grid` would draw
     * lines that the drawing does not show.
     */
    protected _tikzGridPath(parts: number): string | null {
        const {axis} = this.graphConfig
        const step = stepOf(this._config)
        const orthogonal = Math.abs(axis.x.y) <= 1e-9 && Math.abs(axis.y.x) <= 1e-9
        const spaced = Math.hypot(axis.x.x, axis.x.y) * step.x / parts >= MIN_SPACING
            && Math.hypot(axis.y.x, axis.y.y) * step.y / parts >= MIN_SPACING

        if (!orthogonal || !spaced) {
            return null
        }

        const {x, y} = this._config
        const box = x !== undefined && y !== undefined
        const range: { x: [number, number], y: [number, number] } = box ? {x: [x.min, x.max], y: [y.min, y.max]} : this._tikzView()
        const number = (value: number) => numberCorrection(value, 5)
        const from = `(${number(range.x[0])},${number(range.y[0])})`
        const to = `(${number(range.x[1])},${number(range.y[1])})`

        return `${from} grid[xstep=${number(step.x / parts)}, ystep=${number(step.y / parts)}] ${to}${box && parts === 1 ? ` ${from} rectangle ${to}` : ''}`
    }

    _makeShape() {
        this.clear()

        // The subdivisions are below the grid, in a group that makes them lighter.
        this._sub = this.element.group().opacity(SUBDIVISION_OPACITY).path('M 0 0')

        // The lines are one path.
        this.shape = this.element.path('M 0 0')

        // Apply the stroke.
        this.stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
