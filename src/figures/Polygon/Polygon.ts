import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import {
    nearestOnPolygon,
    nowhere,
    type PolygonShape,
    polygonArea,
    polygonCentroid,
    polygonPath,
    polygonPerimeter,
    toCoordinates
} from "../../calculus"
import {fieldLength} from "../Label/Label.constraints"
import type {LabelFields} from "../Label/Label.types"
import {constructionOf, resolveConstraint} from "./Polygon.constraints"
import type {IPolygonConfig} from "./Polygon.types"

/**
 * A polygon, found from exactly one construction: the points it goes through, a regular polygon of a center and a radius, or a
 * regular polygon of a side (see {@link IPolygonConfig}). A regular star polygon (`{5/2}`, the pentagram) is a regular polygon
 * whose vertices are joined by steps.
 *
 * A polygon that does not exist (a vertex that has no position, a radius that is not greater than 0, the two ends of a side at the
 * same place) is not drawn: its `vertices` are empty, and it is drawn again when it exists again.
 */
export class Polygon extends AbstractFigure {
    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one construction, or has a value that is not valid: fewer than
     * 3 vertices, a position that is not `{x, y}`, a number of sides that is not an integer from 3 to 1000, a star that is not an
     * integer from 1 to less than half of the sides, a radius that is a number but not finite and greater than 0. Nothing is left in
     * the svg.
     */
    constructor(context: IFigureContext, name: string, values: IPolygonConfig) {
        // Before the figure draws anything in the svg.
        resolveConstraint(constructionOf(values, name), values, context.config)

        super(context, name)

        this._config = Polygon._copy(values)
        this._polygon = null

        this._makeShape()
        this.computed()
    }

    /** A copy of a config, so that the list of vertices that was given is not the one of the polygon. */
    protected static _copy(values: IPolygonConfig): IPolygonConfig {
        return values.vertices === undefined ? {...values} : {...values, vertices: [...values.vertices]}
    }

    protected _config: IPolygonConfig

    get config(): IPolygonConfig {
        return this._config
    }

    /**
     * Replace the construction of the polygon: it finds its place again, and its shape and its label follow.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The polygon is then left as it was.
     */
    set config(value: IPolygonConfig) {
        const found = resolveConstraint(constructionOf(value, this.name), value, this.graphConfig)

        this._config = Polygon._copy(value)
        this._makeShape()
        this._place(found)
        this.updateLabel()
    }

    protected _polygon: PolygonShape | null

    /** The vertices of the polygon, in pixels, in order. A copy, empty when the polygon does not exist. */
    get vertices(): XY[] {
        return this._polygon === null ? [] : this._polygon.vertices.map(p => ({x: p.x, y: p.y}))
    }

    /** The center of the vertices, in pixels: `NaN` when the polygon does not exist. */
    get centroid(): XY {
        return this._polygon === null ? nowhere() : polygonCentroid(this._polygon.vertices)
    }

    /**
     * What a polygon can show in its label, in units of the coordinate system and with the unit and the scale of the graph (see
     * {@link IGraphConfig.measure}): its perimeter and its area (see `polygonArea` for a star). There is no default field: `@`
     * alone is refused.
     */
    override labelFields(): LabelFields {
        const inUnits = (): PolygonShape => {
            const shape = this._polygon ?? {vertices: [], cycles: []}

            return {...shape, vertices: shape.vertices.map(vertex => toCoordinates(vertex, this.graphConfig))}
        }

        const measure = () => this.graphConfig.measure

        return {
            perimeter: (digits, format) => fieldLength(polygonPerimeter(inUnits()), digits, measure(), format),
            area: (digits, format) => fieldLength(polygonArea(inUnits()), digits, measure(), format, 2)
        }
    }

    override readonly referenceable = true

    /** The center of the vertices. `null` when the polygon does not exist. */
    override referenceAnchorPoint(): XY | null {
        return this._polygon === null ? null : this.centroid
    }

    /** Find the polygon from its construction and draw it. A polygon that does not exist is not drawn (see the class). */
    computed(): this {
        return this._place(resolveConstraint(constructionOf(this._config, this.name), this._config, this.graphConfig))
    }

    /** Keep the vertices that the construction gave, and draw them. */
    protected _place(shape: PolygonShape | null): this {
        this._polygon = shape
        this._setDefined(shape !== null)
        ;(this.shape as Path).plot(shape === null ? 'M 0 0' : polygonPath(shape))

        return this
    }

    override readonly followable = true

    /** The point of the outline that is the closest to a position, in pixels: `NaN` when the polygon does not exist. */
    override follow(x: number, y: number): XY {
        return this._polygon === null ? nowhere() : nearestOnPolygon(this._polygon, {x, y})
    }

    /** Put the label at the center of the vertices. The alignment that was asked for (`label=p/tl`) is kept. */
    moveLabel(): this {
        if (!this.label || this._polygon === null) {
            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = 'mc'
        }

        const {x, y} = this.centroid
        this.label.move(x, y)

        return this
    }

    /**
     * The polygon as TikZ: its vertices joined and closed (`\draw (A) -- (B) -- (C) -- cycle`), a closed path for each polygon of a
     * star made of several, then its label at the center. Nothing for a polygon that is hidden or does not exist.
     * @throws InvalidArgumentError if the appearance of the polygon has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (this._polygon === null || (!shown.shape && !shown.label)) {
            return ''
        }

        const {vertices, cycles} = this._polygon
        const at = (index: number) => `(${this._tikzCoordinates(vertices[index])})`
        const path = cycles.map(cycle => `${cycle.map(at).join(' -- ')} -- cycle`).join(' ')

        return [
            shown.shape ? this._tikzDraw(path) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(this.centroid)) : ''
        ].filter(part => part !== '').join('\n')
    }

    _makeShape() {
        this.clear()

        // Create the path
        this.shape = this.element.path('M 0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
