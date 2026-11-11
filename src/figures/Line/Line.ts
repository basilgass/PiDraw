import {InvalidArgumentError} from "../../errors"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {XY, IFigureContext} from "../../pidraw.common"
import {fieldLength} from "../Label/Label.constraints"
import type {LabelFieldName, LabelFields} from "../Label/Label.types"
import type {Point} from "../Point/Point"
import type {Line as svgLine, Shape} from "@svgdotjs/svg.js"
import {clipSegment, computeLine, distanceAB, isDefinedPosition, mathLine, nowhere, toCoordinates} from "../../calculus"
import {constraintOf, type LineFound, resolveConstraint, slopeText} from "./Line.constraints"
import type {ILineConfig, ILineResolvedConfig, ILineType} from "./Line.types"

const SHAPES: readonly ILineType[] = ['segment', 'ray', 'line', 'vector']

/** How far inside the canvas, in pixels, the label of a line or a ray is from the end of the line. */
const LABEL_INSET = 10

/**
 * The config of a line as it keeps it, with its default shape.
 * @throws InvalidArgumentError if the config has no constraint or several, the shape does not exist, or a segment or a
 * vector is given by anything but two points or a vector.
 */
function resolvedConfig(values: ILineConfig, name: string): ILineResolvedConfig {
    const constraint = constraintOf(values, name)
    const shape = values.shape ?? 'line'

    if (!SHAPES.includes(shape)) {
        throw new InvalidArgumentError(
            `Invalid shape "${shape}" for the line "${name}": expected ${SHAPES.map(s => `'${s}'`).join(', ')}`
        )
    }

    if ((shape === 'segment' || shape === 'vector') && constraint !== 'through' && constraint !== 'director') {
        throw new InvalidArgumentError(
            `The ${shape} "${name}" is given by two points (through) or a point and a vector (director), not by ${constraint}`
        )
    }

    return {...values, shape}
}

/**
 * A line, a ray, a segment or a vector, found from exactly one constraint (two points, a point and a slope, an equation, a
 * parallel, the bisector of an angle...).
 *
 * A line that cannot be found (two points that are the same, a point without a position) has no position: it is not
 * drawn, `start` and `end` are `NaN`, and it is drawn again when its position comes back.
 */
export class Line extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-line'
    }

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one constraint, has a shape that does not exist, or
     * gives a segment or a vector by anything but two points or a vector, or has a slope that is not finite.
     * @throws ParseError if the equation cannot be read. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: ILineConfig) {
        // Before the figure draws anything in the svg.
        const config = resolvedConfig(values, name)

        super(context, name)

        this._config = config
        this._start = nowhere()
        this._end = nowhere()

        try {
            this._makeShape()
            this.computed()
        } catch (error) {
            this.element.remove()
            throw error
        }
    }

    protected _config: ILineResolvedConfig

    /** The constraint of the line, and its shape (by default or as asked). */
    get config(): ILineResolvedConfig {
        return this._config
    }

    /**
     * Replace the config of the line: it finds its place again, and its shape and its label follow. The shape that `value`
     * does not give is the default one.
     * @throws InvalidArgumentError, ParseError if `value` is not a valid config (see the constructor). The line is then
     * left as it was.
     */
    set config(value: ILineConfig) {
        const config = resolvedConfig(value, this.name)
        const found = resolveConstraint(constraintOf(config, this.name), config, this.graphConfig)

        this._config = config
        this._makeShape()
        this._place(found)
        this.updateLabel()
    }

    protected _end: XY

    /** The end of the drawn part, in pixels: the border of the canvas for a line, the second point for a segment or a vector. */
    get end() {
        return this._end
    }

    set end(value: XY) {
        this._end = value
    }

    protected _start: XY

    /**
     * The start of the drawn part, in pixels: the border of the canvas for a line, the first point for a ray, a segment or
     * a vector. A copy of the position: it follows the points of the line when the line is computed again.
     */
    get start() {
        return this._start
    }

    set start(value: XY) {
        this._start = value
    }

    /** Angle of the line with the Ox axis, in degrees, counterclockwise. */
    get angle(): number {
        return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI
    }

    /** Vector from `start` to `end`, in pixels (the y axis points down). */
    get direction(): XY {
        return {
            x: this.end.x - this.start.x,
            y: this.end.y - this.start.y
        }
    }

    /**
     * The line as a tool of calculation.
     * @internal
     */
    get math(): mathLine {
        return new mathLine(this.start, this.end)
    }

    /** A vector perpendicular to the line, as long as `direction`, in pixels. */
    get normal(): XY {
        const d = this.direction

        return {
            x: d.y,
            y: -d.x
        }
    }

    /**
     * The slope of the line, and the length of a segment, in units of the coordinate system (the length is written with the unit and
     * the scale of the graph, see {@link IGraphConfig.measure}). The slope is a fraction when it is exact and the label asks for no
     * decimals (see `slopeText`).
     */
    override labelFields(): LabelFields {
        const slope: LabelFields = {
            slope: (digits, format) => {
                const A = toCoordinates(this._start, this.graphConfig)
                const B = toCoordinates(this._end, this.graphConfig)

                return slopeText(B.x - A.x, B.y - A.y, this._slopeIsExact(), digits, format)
            }
        }

        if (this._config.shape !== 'segment') {
            return slope
        }

        return {
            ...slope,
            length: (digits, format) => {
                const A = toCoordinates(this._start, this.graphConfig)
                const B = toCoordinates(this._end, this.graphConfig)

                return fieldLength(distanceAB(A, B), digits, this.graphConfig.measure, format)
            }
        }
    }

    /** `@` is the length of a segment. The slope of the other lines is `@slope`: a line has no most classical value. */
    override defaultLabelField(): LabelFieldName | null {
        return this._config.shape === 'segment' ? 'length' : null
    }

    /** Whether the slope comes from numbers that were given: the slope of the line, or two points that are given by numbers. */
    protected _slopeIsExact(): boolean {
        const {slope, through} = this._config

        if (slope !== undefined) {
            return true
        }

        const byNumbers = (point: XY) => (point as Partial<Point>).givenByNumbers === true

        return through !== undefined && byNumbers(through.A) && byNumbers(through.B)
    }

    /**
     * Find the line from its constraint and draw it. A line that cannot be found is not drawn (see the class).
     * @throws InvalidArgumentError if the constraint is not valid, ParseError if the equation cannot be read.
     */
    computed(): this {
        this._place(resolveConstraint(constraintOf(this._config, this.name), this._config, this.graphConfig))

        return this
    }

    /** Set the ends of the drawn part from what the constraint gave, and draw them. */
    protected _place({start, direction, end}: LineFound): this {
        const shape = this._config.shape
        const given = isDefinedPosition(start) && isDefinedPosition(direction) && (end === undefined || isDefinedPosition(end))

        if (!given || (direction.x === 0 && direction.y === 0)) {
            this._start = nowhere()
            this._end = nowhere()
            this._setDefined(false)

            return this
        }

        let from: XY = {x: start.x, y: start.y}
        let to: XY = end ? {x: end.x, y: end.y} : {x: start.x + direction.x, y: start.y + direction.y}

        // A line and a ray go to the borders of the canvas (all four of them). A line outside the canvas keeps two points of the line.
        if (shape === 'line' || shape === 'ray') {
            const {width, height} = this.graphConfig
            const reach = computeLine(from, direction, width, height, 0, shape === 'ray')
            const visible = reach === null ? null : clipSegment(reach[0], reach[1], width, height)

            if (visible !== null) {
                [from, to] = visible
            }
        }

        this._start = from
        this._end = to
        this._setDefined(true)
        ;(this.shape as svgLine).plot(from.x, from.y, to.x, to.y)

        return this
    }

    /** Only a segment attracts: the ends of a ray or a vector, and the borders of a line, are not what the user means. */
    override get snappable(): boolean {
        return this._config.shape === 'segment'
    }

    /** The two ends of a segment and its middle. Empty for the other lines, and for a segment that does not exist. */
    override snapPoints(): XY[] {
        if (!this.snappable || !isDefinedPosition(this._start) || !isDefinedPosition(this._end)) {
            return []
        }

        return [
            {x: this._start.x, y: this._start.y},
            {x: (this._start.x + this._end.x) / 2, y: (this._start.y + this._end.y) / 2},
            {x: this._end.x, y: this._end.y}
        ]
    }

    /**
     * Where a point dragged to (`x`, `y`) lands on the line: its projection, kept between the ends of a ray, a segment or
     * a vector. A line without a position does not constrain the point.
     */
    override readonly followable = true

    override follow(x: number, y: number): XY {
        const {x: x1, y: y1} = this.start
        const dx = this.end.x - x1
        const dy = this.end.y - y1
        const length = dx * dx + dy * dy

        if (!(length > 0)) {
            return {x, y}
        }

        const t = ((x - x1) * dx + (y - y1) * dy) / length
        const along = this._config.shape === 'line' ? t : Math.max(0, Math.min(1, t))

        return {
            x: x1 + along * dx,
            y: y1 + along * dy
        }
    }

    /**
     * The line as TikZ: the drawn part from `start` to `end` (the borders of the canvas for a line or a ray; an arrow for a
     * vector), then its label. Nothing for a line that is hidden or has no position.
     * @throws InvalidArgumentError if the appearance of the line has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (!shown.shape && !shown.label) {
            return ''
        }

        return [
            shown.shape ? this._tikzDraw(`(${this._tikzCoordinates(this._start)}) -- (${this._tikzCoordinates(this._end)})`) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(this._labelPoint())) : ''
        ].filter(part => part !== '').join('\n')
    }

    /**
     * Where the label is, in pixels: the middle of a segment or a vector, near the end of a line or a ray (inside the
     * canvas, by `LABEL_INSET` pixels along the line).
     */
    protected _labelPoint(): XY {
        const {start, end} = this

        if (this._config.shape === 'segment' || this._config.shape === 'vector') {
            return {x: (start.x + end.x) / 2, y: (start.y + end.y) / 2}
        }

        const length = Math.hypot(end.x - start.x, end.y - start.y)

        return {
            x: end.x - LABEL_INSET * (end.x - start.x) / length,
            y: end.y - LABEL_INSET * (end.y - start.y) / length
        }
    }

    /** Put the label at its place (see `_labelPoint`), turned along the line when it is asked to. */
    moveLabel(): this {
        // A line without a position has no place for a label.
        if (!this.label || !isDefinedPosition(this._start) || !isDefinedPosition(this._end)) {
            return this
        }

        const {x, y} = this._labelPoint()
        this.label.move(x, y)

        if (this.label.autoRotate) {
            let angle = -this.angle
            if (angle > 90) {
                angle = angle - 180
            }
            if (angle < -90) {
                angle = angle + 180
            }

            this.label.position(undefined, undefined, angle)
        }

        return this
    }

    /** Draw the line again, empty: `computed` places it. */
    protected _makeShape(): Shape {
        this.clear()

        this.shape = this.element.line(0, 0, 0, 0)

        // The arrow of a vector is a marker of its end like any other; the other shapes have none.
        this.mark({side: this._config.shape === 'vector' ? 'end' : 'none'})

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }
}
