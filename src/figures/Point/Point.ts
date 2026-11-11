import type {G, Shape} from "@svgdotjs/svg.js"
import type {XY, IFigureContext} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {
    diamondVertices,
    type INodeSize,
    isDefinedPosition,
    type NodeAnchor,
    nodeAnchor,
    nodeBoundary,
    nodeCornerRadius,
    type NodeShape,
    nodeSize,
    nowhere,
    toCoordinates
} from "../../calculus"
import {constraintOf, nodeOf, resolveConstraint} from "./Point.constraints"
import {fieldNumber} from "../Label/Label.constraints"
import type {LabelFieldName, LabelFields} from "../Label/Label.types"
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
function optionsOf({shape = 'circle', size}: IPointOptions, name: string): Required<Pick<IPointOptions, 'shape' | 'size'>> {
    if (!Object.hasOwn(SHAPES, shape)) {
        const expected = Object.keys(SHAPES).map(key => `'${key}'`).join(', ')
        throw new InvalidArgumentError(`Invalid shape "${shape}" for the point "${name}": expected ${expected}`)
    }

    return {shape, size: checkSize(size ?? SHAPES[shape].size, name)}
}

/** How far a point may be from the place of its constraint, in pixels, and not be moved: the rounding of a calculation. */
const MOVED_TOLERANCE = 1e-6

/** The margin between the text of a node and its border, in pixels. */
const NODE_PADDING = 8

/** The smallest node, in pixels: a node whose label is short or empty is still a box. */
const NODE_MIN_SIZE: INodeSize = {width: 30, height: 22}

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
    protected override get _className(): string {
        // Read by the constructor of the base class, before the fields of the point are set.
        return this._node ? 'pidraw-point pidraw-node' : 'pidraw-point'
    }

    /** The shape of the node that the point is, or `null` for a point that is a mark. */
    protected _node: NodeShape | null = null

    /** Whether a shape or a size of a mark was asked: a node has none. */
    protected _markAsked = false

    /** The size of the node as it was drawn, in pixels (the one of the label and what it asks of the box). */
    protected _box: INodeSize = {width: 0, height: 0}

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one constraint, has a shape that does not exist or a
     * size that is not a finite number greater than 0, or has a coordinate that is not valid, or is a node with a shape or a size of
     * a mark. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IPointConfig) {
        // Before the figure draws anything in the svg.
        constraintOf(values, name)
        const node = nodeOf(values, name)
        const options = optionsOf(values, name)

        super(context, name)

        this._node = node
        this._markAsked = values.shape !== undefined || values.size !== undefined
        this._writeClasses()
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
        const node = nodeOf(value, this.name)
        const previous = this._config
        this._config = {...value, ...optionsOf(value, this.name)}

        try {
            this.computed()
        } catch (error) {
            this._config = previous
            throw error
        }

        this._node = node
        this._markAsked = value.shape !== undefined || value.size !== undefined
        this._writeClasses()
        this._makeShape()
        this.updateLabel()
    }

    /** The shape of the node that the point is (a box around its label), or `null` for a point that is a mark. */
    get node(): NodeShape | null {
        return this._node
    }

    /**
     * Make the point a node: a box of a shape around its label, as big as the label asks, in place of its mark. `null` makes it a mark
     * again. The label is centered in the box.
     * @throws InvalidArgumentError if the shape is not one of a node, or if a shape or a size of a mark was asked. The point is then left as it was.
     */
    setNode(shape: NodeShape | null): this {
        if (shape !== null) {
            nodeOf({node: shape}, this.name)

            if (this._markAsked) {
                throw new InvalidArgumentError(`The point "${this.name}" has a shape or a size of a mark, and a node has none`)
            }
        }

        this._node = shape

        if (shape === null) {
            delete this._config.node
        } else {
            this._config.node = shape
        }

        this._writeClasses()
        this._makeShape()
        this.updateLabel()

        return this
    }

    /**
     * Where a half line from the center of the point toward `from` meets the border of the node, in pixels: the center itself for a point that is
     * not a node. `NaN` when the point has no position.
     */
    boundaryPoint(from: XY): XY {
        if (!isDefinedPosition(this._pixels)) {
            return nowhere()
        }

        if (this._node === null) {
            return {x: this._pixels.x, y: this._pixels.y}
        }

        const offset = nodeBoundary(this._node, this._box, {x: from.x - this._pixels.x, y: from.y - this._pixels.y})

        return {x: this._pixels.x + offset.x, y: this._pixels.y + offset.y}
    }

    /** A named place of the node, in pixels: on its border, or its center for `mc`. The center for a point that is not a node. `NaN` when the point has no position. */
    anchorPoint(position: NodeAnchor): XY {
        if (!isDefinedPosition(this._pixels)) {
            return nowhere()
        }

        const offset = this._node === null ? {x: 0, y: 0} : nodeAnchor(this._node, this._box, position)

        return {x: this._pixels.x + offset.x, y: this._pixels.y + offset.y}
    }

    /**
     * Whether the point is given by two numbers (`A(3,4)`), and not found from other figures (an intersection, a projection, the
     * abscissa of another point). A line through such points has a slope that is exact, and a label shows it as a fraction.
     */
    get givenByNumbers(): boolean {
        const coordinates = this._config.coordinates

        return coordinates !== undefined && typeof coordinates.x === 'number' && typeof coordinates.y === 'number'
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

    /** @throws InvalidArgumentError if `value` is not a finite number greater than 0, or if the point is a node (its size is the one of its label). The point is then left as it was. */
    set size(value: number) {
        this._checkMark()
        this._config.size = checkSize(value, this.name)
        this._markAsked = true
        this._makeShape()
    }

    /** @throws InvalidArgumentError if the point is a node: it has no mark to give a shape or a size to. */
    protected _checkMark(): void {
        if (this._node !== null) {
            throw new InvalidArgumentError(`The point "${this.name}" is a node, and a node has no shape nor size of a mark`)
        }
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
        this._checkMark()
        Object.assign(this._config, optionsOf({shape, size}, this.name))
        this._markAsked = true
        this._makeShape()

        return this
    }

    /** The coordinates of the point, in units of the coordinate system: `(x;y)`. */
    override labelFields(): LabelFields {
        return {
            coordinates: (digits) => {
                const {x, y} = this.coordinates

                return `(${fieldNumber(x, digits)};${fieldNumber(y, digits)})`
            }
        }
    }

    override defaultLabelField(): LabelFieldName {
        return 'coordinates'
    }

    override readonly referenceable = true

    /** The position of the point. `null` when it has none. */
    override referenceAnchorPoint(): XY | null {
        return isDefinedPosition(this._pixels) ? {x: this._pixels.x, y: this._pixels.y} : null
    }

    override get snappable(): boolean {
        return true
    }

    /** The position of the point. Empty when it has none. */
    override snapPoints(): XY[] {
        const position = this.referenceAnchorPoint()

        return position === null ? [] : [position]
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
        const path = this._node === null ? SHAPES[this._config.shape].tikz(at, half) : this._tikzNode(this._node)

        return [
            shown.shape ? this._tikzDraw(path) : '',
            shown.label ? this._tikzLabel(at) : ''
        ].filter(part => part !== '').join('\n')
    }

    /** The path of a node in TikZ: the same box as in the svg, from its size as it was drawn. */
    protected _tikzNode(node: NodeShape): string {
        const {x, y} = this._pixels
        const [a, b] = [this._box.width / 2, this._box.height / 2]
        const at = (dx: number, dy: number) => `(${this._tikzCoordinates({x: x + dx, y: y + dy})})`

        if (node === 'circle') {
            return `${at(0, 0)} circle[radius=${this._tikzLength(a)}]`
        }

        if (node === 'diamond') {
            return `${diamondVertices(this._box).map(({x: dx, y: dy}) => at(dx, dy)).join(' -- ')} -- cycle`
        }

        const corners = node === 'round' ? `[rounded corners=${this._tikzLength(nodeCornerRadius(node, this._box))}] ` : ''

        return `${corners}${at(-a, -b)} rectangle ${at(a, b)}`
    }

    /** Put the label on the point, or in the middle of the box of a node, whose size follows the label. */
    moveLabel(): this {
        if (!this.label) {
            return this
        }

        if (this._node !== null) {
            this.label.config.alignement = 'mc'
        }

        this.label.move(this.x, this.y)

        if (this._node !== null && this._measureNode() !== null) {
            this._makeShape()
        }

        return this
    }

    /** The size that the node asks for its label as it is now, or `null` if it is the one that is drawn. */
    protected _measureNode(): INodeSize | null {
        if (this._node === null) {
            return null
        }

        const size = nodeSize(this._node, this.label?.size() ?? {width: 0, height: 0}, NODE_PADDING, NODE_MIN_SIZE)

        return size.width === this._box.width && size.height === this._box.height ? null : size
    }

    /** Draw the shape again, with its appearance, centered on the point. The label stays. */
    protected _makeShape(): Shape {
        this.clear()

        const {shape, size} = this._config

        if (this._node === null) {
            this.shape = this._centerShape(SHAPES[shape].draw(this.element, size))
        } else {
            this._box = this._measureNode() ?? this._box
            this.shape = this._centerShape(this._drawNode(this._node, this._box))
            // The box is behind the label.
            this.shape.back()
        }

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }

    /** The box of a node of a size, in the svg, not yet placed. */
    protected _drawNode(node: NodeShape, size: INodeSize): Shape {
        if (node === 'circle') {
            return this.element.circle(size.width)
        }

        if (node === 'diamond') {
            return this.element.polygon(diamondVertices(size).map(({x, y}): [number, number] => [x, y]))
        }

        return this.element.rect(size.width, size.height).radius(nodeCornerRadius(node, size))
    }

    /** Center the shape on the point. A point without a position leaves it where it is: svg refuses a `NaN` attribute. */
    protected _centerShape<T extends Shape>(shape: T): T {
        if (isDefinedPosition(this._pixels)) {
            shape.center(this._pixels.x, this._pixels.y)
        }

        return shape
    }
}
