import type {G, Shape} from "@svgdotjs/svg.js"
import type {XY, IFigureContext} from "../../pidraw.common"
import type {IFigureAnimation} from "../../animate/Animate.types"
import {InvalidArgumentError} from "../../errors"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {isDefinedPosition, numberCorrection, toCoordinates} from "../../calculus"
import {constraintOf, resolveConstraint} from "./Point.constraints"
import type {LabelFields} from "../Label/Label.types"
import type {IPointConfig, IPointOptions, IPointResolvedConfig, PointShape} from "./Point.types"

/**
 * How to draw each shape of a point: its default size, the shape that fits in a box of the size (not yet placed), and the
 * TikZ path of the shape around the coordinate `at`, with `half` the half of the size as a TikZ length.
 */
const SHAPES: Record<PointShape, {
    size: number,
    draw: (element: G, size: number) => Shape,
    tikz: (at: string, half: string) => string
}> = {
    circle: {
        size: 5,
        draw: (element, size) => element.circle(size),
        tikz: (at, half) => `(${at}) circle[radius=${half}]`
    },
    square: {
        size: 10,
        draw: (element, size) => element.rect(size, size),
        tikz: (at, half) => `(${at}) +(-${half},-${half}) rectangle +(${half},${half})`
    },
    crosshair: {
        size: 10,
        draw: (element, size) => {
            const half = size / 2

            return element.path(`M ${-half} ${half} L ${half} ${-half} M ${-half} ${-half} L ${half} ${half}`)
        },
        tikz: (at, half) => `(${at}) +(-${half},-${half}) -- +(${half},${half}) (${at}) +(-${half},${half}) -- +(${half},-${half})`
    }
}

/** @throws InvalidArgumentError if `size` is not a finite number greater than 0. */
function checkSize(size: number, name: string): number {
    if (!Number.isFinite(size) || size <= 0) {
        throw new InvalidArgumentError(`Invalid size ${size} for the point "${name}": expected a finite number greater than 0`)
    }

    return size
}

/**
 * The shape and the size of a point, by default or as asked.
 * @throws InvalidArgumentError if the shape does not exist, or the size is not a finite number greater than 0.
 */
function optionsOf({shape = 'circle', size}: IPointOptions, name: string): Required<IPointOptions> {
    if (!Object.hasOwn(SHAPES, shape)) {
        const expected = Object.keys(SHAPES).map(key => `'${key}'`).join(', ')
        throw new InvalidArgumentError(`Invalid shape "${shape}" for the point "${name}": expected ${expected}`)
    }

    return {shape, size: checkSize(size ?? SHAPES[shape].size, name)}
}

/** How far a point may be from the place of its constraint, in pixels, and not be moved: the rounding of a calculation. */
const MOVED_TOLERANCE = 1e-6

/**
 * A point of the drawing: a position found from exactly one constraint (its coordinates, the middle of two points, an
 * intersection...), shown by a circle, a square or a crosshair.
 *
 * The position is in pixels of the svg (`pixels`, `x`, `y`) or in units of the coordinate system (`coordinates`). It is
 * computed by `computed()` from the constraint, and set by assigning `pixels` when the point is dragged or animated. A
 * point without a position (lines that do not cross, a function that is not defined) is not drawn. Its label can show
 * its coordinates (see {@link labelFields}).
 */
export class Point extends AbstractFigure {
    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one constraint, has a shape that does not exist or a
     * size that is not a finite number greater than 0, or has a coordinate that is not valid. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IPointConfig) {
        // Before the figure draws anything in the svg.
        constraintOf(values, name)
        const options = optionsOf(values, name)

        super(context, name)

        this._pixels = Object.freeze({x: NaN, y: NaN})
        this._config = {...values, ...options}

        try {
            this.computed()
        } catch (error) {
            this.element.remove()
            throw error
        }

        this._makeShape()
    }

    protected _config: IPointResolvedConfig

    /** The constraint of the point, and its shape and size (by default or as asked). */
    get config(): IPointResolvedConfig {
        return this._config
    }

    /**
     * Replace the config of the point: it finds its place again, and its shape and its label follow. The shape and the
     * size that `value` does not give are the default ones.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The point is then left as it was.
     */
    set config(value: IPointConfig) {
        constraintOf(value, this.name)
        const previous = this._config
        this._config = {...value, ...optionsOf(value, this.name)}

        try {
            this.computed()
        } catch (error) {
            this._config = previous
            throw error
        }

        this._makeShape()
        this.updateLabel()
    }

    /** A point can be animated: it moves from a point to another one. */
    override readonly animatable = true

    /** @throws InvalidArgumentError if the animation has no start point or no end point (`from` and `to`). */
    protected override _checkAnimation(animation: IFigureAnimation): void {
        if (!(animation.from instanceof Point) || !(animation.to instanceof Point)) {
            throw new InvalidArgumentError(`The animation of the point "${this.name}" needs a start and an end point (from, to)`)
        }
    }

    protected _pixels: Readonly<XY>

    /**
     * Position of the point in pixels of the svg, `NaN` when it has none (see {@link computed}). The position is
     * never changed in place: assign a new one (`pixels`, `x`, `y`).
     */
    get pixels(): Readonly<XY> {
        return this._pixels
    }

    /** The point keeps a copy of `value`. The shape follows the position, and the point is hidden if it is not finite. */
    set pixels(value: Readonly<XY>) {
        this._pixels = Object.freeze({x: value.x, y: value.y})
        // A point that has no position is not drawn.
        this._setDefined(isDefinedPosition(value))
        this._centerShape(this.shape)
    }

    /** Position of the point in units of the coordinate system (`NaN` when it has no position). A new object at each read. */
    get coordinates(): XY {
        return toCoordinates(this._pixels, this.graphConfig)
    }

    get size(): number {
        return this._config.size
    }

    /** @throws InvalidArgumentError if `value` is not a finite number greater than 0. The point is then left as it was. */
    set size(value: number) {
        this._config.size = checkSize(value, this.name)
        this._makeShape()
    }

    /** Abscissa of the point in pixels (not in units of the coordinate system: see {@link coordinates}). */
    get x() {
        return this._pixels.x
    }

    set x(value: number) {
        this.pixels = {x: value, y: this._pixels.y}
    }

    /** Ordinate of the point in pixels (not in units of the coordinate system: see {@link coordinates}). */
    get y() {
        return this._pixels.y
    }

    set y(value: number) {
        this.pixels = {x: this._pixels.x, y: value}
    }

    /** @throws InvalidArgumentError if `size` is not a finite number greater than 0. The point is then left as it was. */
    asCircle(size?: number): this {
        return this._as('circle', size)
    }

    /** @throws InvalidArgumentError if `size` is not a finite number greater than 0. The point is then left as it was. */
    asCrosshair(size?: number): this {
        return this._as('crosshair', size)
    }

    /** @throws InvalidArgumentError if `size` is not a finite number greater than 0. The point is then left as it was. */
    asSquare(size?: number): this {
        return this._as('square', size)
    }

    protected _as(shape: PointShape, size?: number): this {
        Object.assign(this._config, optionsOf({shape, size}, this.name))
        this._makeShape()

        return this
    }

    /** The coordinates of the point, in units of the coordinate system: `(x;y)`. */
    override labelFields(): LabelFields {
        return {
            coordinates: (digits) => {
                const {x, y} = this.coordinates

                return `(${numberCorrection(x, digits)};${numberCorrection(y, digits)})`
            }
        }
    }

    /**
     * Put the point at the position its constraint gives. A position that is not finite (lines that do not cross, a
     * function that is not defined) is `NaN`: the point is hidden with `visibility`, apart from `hide()`, and it is
     * drawn again when its position comes back.
     * @throws InvalidArgumentError if the config of the point does not hold exactly one constraint.
     */
    /**
     * Whether the point is not where its constraint puts it: it was dragged or animated, and holds its place in `pixels` alone. A point without a
     * place, or whose constraint gives none, is not moved.
     */
    isMoved(): boolean {
        const placed = resolveConstraint(constraintOf(this._config, this.name), this._config, this.graphConfig)

        if (!isDefinedPosition(placed) || !isDefinedPosition(this._pixels)) {
            return false
        }

        return Math.hypot(placed.x - this._pixels.x, placed.y - this._pixels.y) > MOVED_TOLERANCE
    }

    computed(): this {
        this.pixels = resolveConstraint(constraintOf(this._config, this.name), this._config, this.graphConfig)

        return this
    }

    /**
     * The point as TikZ: its shape, as the drawing shows it (filled only if the point has a fill), and its label. Nothing
     * for a point that is hidden or has no position.
     * @throws InvalidArgumentError if the appearance of the point has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (!shown.shape && !shown.label) {
            return ''
        }

        const at = this._tikzCoordinates(this._pixels)
        const half = this._tikzLength(this.size / 2)

        return [
            shown.shape ? this._tikzDraw(SHAPES[this._config.shape].tikz(at, half)) : '',
            shown.label ? this._tikzLabel(at) : ''
        ].filter(part => part !== '').join('\n')
    }

    moveLabel(): this {
        if (this.label) {
            this.label.move(this.x, this.y)
        }

        return this
    }

    /** Draw the shape again, with its appearance, centered on the point. The label stays. */
    protected _makeShape(): Shape {
        this.clear()

        const {shape, size} = this._config
        this.shape = this._centerShape(SHAPES[shape].draw(this.element, size))

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }

    /** Center the shape on the point. A point without a position leaves it where it is: svg refuses a `NaN` attribute. */
    protected _centerShape<T extends Shape>(shape: T): T {
        if (isDefinedPosition(this._pixels)) {
            shape.center(this._pixels.x, this._pixels.y)
        }

        return shape
    }
}
