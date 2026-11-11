import type {Circle as svgCircle, Shape} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {CircleDefinition} from "../../calculus"
import {
    circleArea,
    circlePerimeter,
    intersectionCircleCircle,
    intersectionCircleLine,
    isDefinedPosition,
    nowhere,
    toCoordinates
} from "../../calculus"
import {fieldLength} from "../Label/Label.constraints"
import type {LabelFields} from "../Label/Label.types"
import {constructionOf, resolveConstraint} from "./Circle.constraints"
import type {ICircleConfig} from "./Circle.types"
import type {Line} from "../Line/Line"

/**
 * A circle, found from exactly one construction: its center and its radius, three points, a center and a tangent line, a
 * diameter, or the triangle it is inscribed in (see {@link ICircleConfig}).
 *
 * A circle that does not exist (aligned points, a center on its tangent, a radius point on the center, a point without a
 * position) is not drawn: its `center` and its `radius` are `NaN`, and it is drawn again when it exists again.
 */
export class Circle extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-circle'
    }

    /**
     * Where a point dragged to (`x`, `y`) lands on the circle: the nearest point of the circle. The center goes to the right
     * of the circle. A circle that does not exist does not constrain the point.
     */
    override readonly followable = true

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one construction, or has a value that is not valid: a
     * radius that is a number but not finite and greater than 0, a position that is not `{x, y}`, a tangent that is not a
     * line. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: ICircleConfig) {
        // Before the figure draws anything in the svg.
        resolveConstraint(constructionOf(values, name), values, context.config)

        super(context, name)

        this._config = {...values}
        this._center = nowhere()
        this._radius = NaN

        this._makeShape()
        this.computed()
    }

    protected _config: ICircleConfig

    get config(): ICircleConfig {
        return this._config
    }

    /**
     * Replace the construction of the circle: it finds its place again, and its shape and its label follow.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The circle is then left as it was.
     */
    set config(value: ICircleConfig) {
        const found = resolveConstraint(constructionOf(value, this.name), value, this.graphConfig)

        this._config = {...value}
        this._makeShape()
        this._place(found)
        this.updateLabel()
    }

    protected _center: XY

    /** Center of the circle, in pixels. `NaN` when the circle does not exist. A copy: it follows its points when the circle is computed again. */
    get center(): XY {
        return this._center
    }

    protected _radius: number

    /** Radius of the circle, in pixels. `NaN` when the circle does not exist. */
    get radius(): number {
        return this._radius
    }

    /** Find the circle from its construction and draw it. A circle that does not exist is not drawn (see the class). */
    computed(): this {
        return this._place(resolveConstraint(constructionOf(this._config, this.name), this._config, this.graphConfig))
    }

    /**
     * The circle as TikZ: its center and its radius in units of the coordinate system, then its label. The radius is the one
     * of the x axis; when the axes have different scales it is written for each axis, so that the circle stays round like
     * on screen. Nothing for a circle that is hidden or does not exist.
     * @throws InvalidArgumentError if the appearance of the circle has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (!shown.shape && !shown.label) {
            return ''
        }

        return [
            shown.shape ? this._tikzDraw(`(${this._tikzCoordinates(this._center)}) circle[${this._tikzRadius(this._radius)}]`) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(this._labelPoint())) : ''
        ].filter(part => part !== '').join('\n')
    }

    moveLabel(): this {
        // A circle that does not exist has no place for a label.
        if (this.label && Number.isFinite(this._radius)) {
            const {x, y} = this._labelPoint()

            // The label is centered on the center. The alignment that was asked for (`label=c/tl`) is kept.
            if (!this.label.alignementGiven) {
                this.label.config.alignement = 'mc'
            }

            this.label.move(x, y)
        }

        return this
    }

    override follow(x: number, y: number): XY {
        const {x: cx, y: cy} = this._center
        const r = this._radius

        if (!Number.isFinite(r)) {
            return {x, y}
        }

        const dx = x - cx
        const dy = y - cy
        const d = Math.hypot(dx, dy)

        if (d === 0) {
            return {x: cx + r, y: cy}
        }

        return {x: cx + dx / d * r, y: cy + dy / d * r}
    }

    /**
     * The points where the whole line cuts the circle (not only the part that is drawn), in pixels and in the order of the
     * line: two points, one if the line touches the circle.
     * @returns `null` if the line misses the circle, or if the circle or the line does not exist.
     */
    intersectionWithLine(line: Line): XY[] | null {
        return intersectionCircleLine(this._center, this._radius, line.start, line.end)
    }

    /**
     * The points where this circle crosses another one, in pixels: two points, one if they touch.
     * @returns `null` if they are apart, one is inside the other, they have the same center, or a circle does not exist.
     */
    intersectionWithCircle(circle: Circle): XY[] | null {
        return intersectionCircleCircle(this._center, this._radius, circle.center, circle.radius)
    }

    /** Set the center and the radius of the circle from what the construction gave, and draw them. */
    protected _place({center, radius}: CircleDefinition): this {
        if (!isDefinedPosition(center) || !Number.isFinite(radius) || radius <= 0) {
            this._center = nowhere()
            this._radius = NaN
            this._setDefined(false)

            return this
        }

        this._center = {x: center.x, y: center.y}
        this._radius = radius
        this._setDefined(true)

        const shape = this.shape as svgCircle
        shape.radius(radius)
        shape.center(center.x, center.y)

        return this
    }

    /**
     * What a circle can show in its label, in units of the coordinate system and with the unit and the scale of the graph (see
     * {@link IGraphConfig.measure}): its radius (measured along the x axis, like in TikZ), its perimeter and its area. There is no
     * default field: `@` alone is refused.
     */
    override labelFields(): LabelFields {
        const radius = () => Math.abs(toCoordinates(this._radius, this.graphConfig))

        const measure = () => this.graphConfig.measure

        return {
            radius: (digits, format) => fieldLength(radius(), digits, measure(), format),
            perimeter: (digits, format) => fieldLength(circlePerimeter(radius()), digits, measure(), format),
            area: (digits, format) => fieldLength(circleArea(radius()), digits, measure(), format, 2)
        }
    }

    override readonly referenceable = true

    /** The center of the circle. `null` when the circle does not exist. */
    override referenceAnchorPoint(): XY | null {
        return Number.isFinite(this._radius) ? {x: this._center.x, y: this._center.y} : null
    }

    override get snappable(): boolean {
        return true
    }

    /** The center of the circle. Empty when the circle does not exist. */
    override snapPoints(): XY[] {
        const center = this.referenceAnchorPoint()

        return center === null ? [] : [center]
    }

    /** Where the label is, in pixels: exactly at the center. */
    protected _labelPoint(): XY {
        return {x: this._center.x, y: this._center.y}
    }

    /** Draw the circle again, empty: `computed` gives it its size and its place. */
    protected _makeShape(): Shape {
        this.clear()

        this.shape = this.element.circle(0)

        this.fill().stroke()
        return this.shape
    }
}
