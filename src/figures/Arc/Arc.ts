import type {Path as svgPath} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LABEL_POSITION, LabelFieldName, LabelFields} from "../Label/Label.types"
import {fieldAngle, fieldLength, labelAlignementToward} from "../Label/Label.constraints"
import {
    arcLength,
    cartesianToAngle,
    counterclockwiseSweep,
    distanceAB,
    isDefinedPosition,
    nearestOnArc,
    nowhere,
    numberCorrection,
    polarToCartesian,
    sectorArea,
    toCoordinates
} from "../../calculus"
import {constructionOf, resolveConstraint} from "./Arc.constraints"
import type {ArcDefinition} from "./Arc.constraints"
import type {IArcConfig} from "./Arc.types"

/** An angle of the sweep is taken for a right angle within this many degrees. */
const RIGHT_ANGLE_EPSILON = 1e-6

/**
 * An arc of a circle, found from exactly one construction: the points of an angle, a center with two angles, or a point that
 * turns around a center (see {@link IArcConfig}).
 *
 * It is drawn counterclockwise from the first direction to the second one, or clockwise with `alternative`, which is the other
 * arc between them. It can be closed as a sector, and a right angle can be drawn as a square corner.
 *
 * An arc that does not exist (a point without a position, an end on the center, two ends in the same direction) is not drawn:
 * its `center` is `NaN` and its `angle` too, and it is drawn again when it exists again.
 */
export class Arc extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-arc'
    }

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one construction, or has a value that is not valid: a
     * radius that is a number but not finite and greater than 0, an angle that is not finite, a position that is not `{x, y}`.
     * Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IArcConfig) {
        // Before the figure draws anything in the svg.
        resolveConstraint(constructionOf(values, name), values, context.config)

        super(context, name)

        this._config = {...values}
        this._center = nowhere()
        this._start = nowhere()
        this._end = nowhere()
        this._radius = NaN
        this._from = NaN
        this._sweep = NaN

        this._makeShape()
        this.computed()
    }

    protected _config: IArcConfig

    get config(): IArcConfig {
        return this._config
    }

    /**
     * Replace the construction of the arc: it finds its place again, and its shape and its label follow.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The arc is then left as it was.
     */
    set config(value: IArcConfig) {
        const found = resolveConstraint(constructionOf(value, this.name), value, this.graphConfig)

        this._config = {...value}
        this._makeShape()
        this._place(found)
        this.updateLabel()
    }

    protected _center: XY

    /** Center of the arc, in pixels. `NaN` when the arc does not exist. A copy: it follows its points when the arc is computed again. */
    get center(): XY {
        return this._center
    }

    protected _start: XY

    /** The end of the arc that the construction starts from, in pixels. `NaN` when the arc does not exist. */
    get start(): XY {
        return this._start
    }

    protected _end: XY

    /** The other end given by the construction, in pixels. `NaN` when the arc does not exist. */
    get end(): XY {
        return this._end
    }

    protected _radius: number

    /** Radius of the arc, in pixels. `NaN` when the arc does not exist. */
    get radius(): number {
        return this._radius
    }

    /** The direction of `start` from the center, in degrees in [0, 360). */
    protected _from: number

    /** What the arc covers, in degrees in (0, 360): counterclockwise from `start`, or clockwise with `alternative`. */
    protected _sweep: number

    /** The angle that the arc covers, in degrees. `NaN` when the arc does not exist. */
    get angle(): number {
        return this._sweep
    }

    /** Whether the arc covers a right angle. A corner is then drawn instead of the arc if the config asks for it. */
    get isSquare(): boolean {
        return Math.abs(this._sweep - 90) < RIGHT_ANGLE_EPSILON
    }

    /**
     * What an arc can show in its label: its angle in degrees, always with the degree sign (the arc `*` covers the rest of the turn),
     * its length, its radius and the area of its sector, in units of the coordinate system and with the unit and the scale of the graph
     * (see {@link IGraphConfig.measure}). The radius is measured along the x axis, like in TikZ.
     */
    override labelFields(): LabelFields {
        const radius = () => Math.abs(toCoordinates(this._radius, this.graphConfig))

        const measure = () => this.graphConfig.measure

        return {
            angle: (digits, format) => fieldAngle(this._sweep, digits, format),
            length: (digits, format) => fieldLength(arcLength(radius(), this._sweep), digits, measure(), format),
            radius: (digits, format) => fieldLength(radius(), digits, measure(), format),
            area: (digits, format) => fieldLength(sectorArea(radius(), this._sweep), digits, measure(), format, 2)
        }
    }

    override defaultLabelField(): LabelFieldName {
        return 'angle'
    }

    /** Close the arc with its two radii, so that it can be filled like a slice. */
    asSector(): this {
        this.config = {...this._config, sector: true}

        return this
    }

    /** Draw a right angle as a square corner. */
    asSquare(): this {
        this.config = {...this._config, square: true}

        return this
    }

    /** Find the arc from its construction and draw it. An arc that does not exist is not drawn (see the class). */
    computed(): this {
        return this._place(resolveConstraint(constructionOf(this._config, this.name), this._config, this.graphConfig))
    }

    /** Set the ends, the radius and the angle of the arc from what the construction gave, and draw them. */
    protected _place({center, start, end, radius}: ArcDefinition): this {
        const from = isDefinedPosition(center) && isDefinedPosition(start) && isDefinedPosition(end)
            && Number.isFinite(radius) && radius > 0
            && distanceAB(center, start) > 0 && distanceAB(center, end) > 0
            ? cartesianToAngle(center, start)
            : NaN
        const counterclockwise = Number.isNaN(from) ? 0 : counterclockwiseSweep(from, cartesianToAngle(center, end))

        // The two ends are in the same direction: there is no arc, only a full circle that a circle draws better.
        if (counterclockwise === 0) {
            this._center = nowhere()
            this._start = nowhere()
            this._end = nowhere()
            this._radius = NaN
            this._from = NaN
            this._sweep = NaN
            this._setDefined(false)

            return this
        }

        this._center = {x: center.x, y: center.y}
        this._start = {x: start.x, y: start.y}
        this._end = {x: end.x, y: end.y}
        this._radius = radius
        this._from = from
        this._sweep = this._config.alternative ? 360 - counterclockwise : counterclockwise
        this._setDefined(true)

        ;(this.shape as svgPath).plot(this._path())

        return this
    }

    override readonly followable = true

    /**
     * The point of the arc that is the closest to a position, in pixels: `NaN` when the arc does not exist. Only the arc is followed,
     * not the two radii of a sector nor a square corner.
     */
    override follow(x: number, y: number): XY {
        return nearestOnArc(this._center, this._radius, this._from, this._sweep, this._config.alternative === true, {x, y})
    }

    override get snappable(): boolean {
        return true
    }

    /** The two ends of the arc and its middle, the point of the arc in the middle direction. Empty when the arc does not exist. */
    override snapPoints(): XY[] {
        if (Number.isNaN(this._sweep)) {
            return []
        }

        return [
            {x: this._start.x, y: this._start.y},
            this._pointAt(this._directionAt(0.5), this._radius),
            {x: this._end.x, y: this._end.y}
        ]
    }

    /** Whether the arc is drawn as a square corner. */
    protected _drawnAsSquare(): boolean {
        return this._config.square === true && this.isSquare
    }

    /** The direction of the arc at `fraction` of its angle (0 at its start, 1 at its end), in degrees. */
    protected _directionAt(fraction: number): number {
        return this._config.alternative ? this._from - fraction * this._sweep : this._from + fraction * this._sweep
    }

    /** The point of the arc, or of the corner in its place, in the direction of `degrees`, at `distance` from the center. */
    protected _pointAt(degrees: number, distance: number): XY {
        return polarToCartesian(this._center.x, this._center.y, distance, degrees)
    }

    /** The radius of what is drawn: the corner of a square is made of half the radius. */
    protected _drawnRadius(): number {
        return this._drawnAsSquare() ? this._radius / 2 : this._radius
    }

    /** The path of the arc, its sector, or the square corner. */
    protected _path(): string {
        const radius = this._drawnRadius()
        const start = this._pointAt(this._from, radius)
        const end = this._pointAt(this._directionAt(1), radius)

        const path = this._drawnAsSquare()
            ? ["M", start.x, start.y, "l", end.x - this._center.x, end.y - this._center.y, "L", end.x, end.y]
            : [
                "M", start.x, start.y,
                // Counterclockwise on screen is the 0 flag of the svg arc; the large one is the arc of more than half a turn.
                "A", radius, radius, 0, this._sweep > 180 ? 1 : 0, this._config.alternative ? 1 : 0, end.x, end.y
            ]

        if (this._config.sector) {
            path.push("L", this._center.x, this._center.y, "L", start.x, start.y)
        }

        return path.join(" ")
    }

    _makeShape() {
        this.clear()

        // Create the path
        this.shape = this.element.path('M0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }

    /**
     * Where the label is, in pixels, and on which side of that place it lies to be outside of the arc: on the middle direction of what is
     * drawn, a little further than the arc (or than the corner of a square), on the side that this direction points to. `away` is that
     * direction on the screen (the y axis points down), whatever its angle; `alignement` is the nearest of the nine positions.
     */
    protected _labelPlace(): { point: XY, alignement: LABEL_POSITION, away: XY | null } {
        const direction = this._directionAt(0.5)

        // The area of the sector is written inside of it, halfway along the middle radius.
        if (this._firstLabelField() === 'area') {
            return {point: this._pointAt(direction, this._radius / 2), alignement: 'mc', away: null}
        }

        const reach = this._drawnAsSquare() ? this._radius * Math.SQRT1_2 : this._radius
        const point = this._pointAt(direction, reach + this._labelGap)
        const away = {x: Math.cos(direction * Math.PI / 180), y: -Math.sin(direction * Math.PI / 180)}

        return {point, alignement: labelAlignementToward(away.x, away.y), away}
    }

    override readonly referenceable = true

    /** The center of the arc. `null` when the arc does not exist. */
    override referenceAnchorPoint(): XY | null {
        return Number.isNaN(this._sweep) ? null : {x: this._center.x, y: this._center.y}
    }

    /**
     * Put the label outside of the arc, on the middle of its angle. The alignment that was asked for (`label=θ/tl`) is kept;
     * without one, the label lies on the side of the middle direction, whatever its angle.
     */
    moveLabel(): this {
        // An arc that does not exist has no place for a label.
        if (!this.label || Number.isNaN(this._sweep)) {
            return this
        }

        const {point, alignement, away} = this._labelPlace()

        if (!this.label.alignementGiven) {
            this.label.config.alignement = alignement
            this.label.config.away = away
        }

        this.label.move(point.x, point.y)

        return this
    }

    /**
     * The arc as TikZ: from its start, around its center, with the radius in units of the coordinate system, then its label.
     * A sector is closed by its two radii and a right angle can be a square corner. Nothing for an arc that is hidden or does
     * not exist.
     * @throws InvalidArgumentError if the appearance of the arc has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (!shown.shape && !shown.label) {
            return ''
        }

        return [
            shown.shape ? this._tikzDraw(this._tikzPath()) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(this._labelPlace().point)) : ''
        ].filter(part => part !== '').join('\n')
    }

    /** The path of the arc in TikZ. */
    protected _tikzPath(): string {
        const at = (point: XY) => `(${this._tikzCoordinates(point)})`
        const center = at(this._center)
        const radius = this._drawnRadius()
        const start = this._pointAt(this._from, radius)

        if (this._drawnAsSquare()) {
            const end = this._pointAt(this._directionAt(1), radius)
            const corner = {x: start.x + end.x - this._center.x, y: start.y + end.y - this._center.y}
            const square = `${at(start)} -- ${at(corner)} -- ${at(end)}`

            return this._config.sector ? `${square} -- ${center} -- cycle` : square
        }

        // TikZ turns counterclockwise when the end angle is greater than the start angle, clockwise when it is smaller.
        const angles = `start angle=${numberCorrection(this._from, 5)}, end angle=${numberCorrection(this._directionAt(1), 5)}`
        const arc = `${at(start)} arc[${angles}, ${this._tikzRadius(this._radius)}]`

        return this._config.sector ? `${center} -- ${arc} -- cycle` : arc
    }
}
