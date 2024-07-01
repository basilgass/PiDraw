// Interfaces, types and helpers
import { IPoint, PointConfig } from "../pidraw.interface"
import { AXIS, POINTCONSTRAIN, POINTSHAPE } from "../enums"
import { mathLine, mathVector } from "../../lib/Calculus"

// Figure
import { Figure, IFigureConfig } from "../Figure"

// SVG.js
import { Array, G, Box, Circle as svgCircle } from "@svgdotjs/svg.js"
import { StepValueType } from "../parser/parseStep"

export class Point extends Figure {
    get shape(): POINTSHAPE {
        return this._shape
    }
    private _constrain: PointConfig
    private _scale: number
    private _shape: POINTSHAPE
    private _trace: G | undefined
    private _isTracing: { enabled: boolean, color: string, width: number }
    private _hiddenPoint: boolean
    private _defaultScale: number
    private _x: number
    private _y: number

    constructor(config: IFigureConfig, pixels: IPoint) {
        super(config)

        this._defaultScale = 6

        this._x = pixels.x
        this._y = pixels.y

        this._shape = POINTSHAPE.CIRCLE
        this._scale = +this._defaultScale

        this._hiddenPoint = false

        this._constrain = { type: POINTCONSTRAIN.FIXED }

        // this._updateShape()

        // Add the label
        this.generateName()

        this._trace = undefined
        this._isTracing = { enabled: false, color: 'red', width: 1 }
    }

    get isTracing(): { enabled: boolean; color: string, width: number } {
        return this._isTracing
    }

    set isTracing(value: { enabled: boolean; color: string, width: number }) {
        this._isTracing = value
    }

    get hiddenPoint(): boolean {
        return this._hiddenPoint
    }

    set hiddenPoint(value: boolean) {
        this._hiddenPoint = value
    }

    get defaultScale(): number {
        return this._defaultScale
    }

    get x(): number {
        return this._x
    }

    set x(value: number) {
        this._x = value
        this.update()
    }

    get y(): number {
        return this._y
    }

    set y(value: number) {
        this._y = value
        this.update()
    }

    get coord(): IPoint {
        return this.graph.pixelsToUnits(this)
    }

    set coord(value) {
        this.coordX = value.x
        this.coordY = value.y
    }

    set coordX(value: number) {
        this._x = this.graph.unitsToPixels({
            x: value,
            y: 0
        }).x
    }

    set coordY(value: number) {
        this._y = this.graph.unitsToPixels({
            x: 0,
            y: value
        }).y
    }

    get coordAsTex(): string {
        const P = this.graph.pixelsToUnits(this)
        return `\\left( ${P.x} ; ${P.y} \\right)`
    }

    addUnit(value: number, axis?: AXIS): this {
        if (axis === undefined || axis === AXIS.HORIZONTAL) {
            this.coordX = this.coord.x + value
        } else {
            this.coordY = this.coord.y + value
        }
        return this
    }

    asCross(): this {
        this._shape = POINTSHAPE.CROSS
        this.update()
        return this
    }

    asCircle(size?: number): this {
        if (size !== undefined && size > 0) {
            this.setSize(size)
        }

        this._shape = POINTSHAPE.CIRCLE
        this.update()
        return this
    }

    asSquare(size?: number): this {
        if (size !== undefined && size > 0) {
            this.setSize(size)
        }

        this._shape = POINTSHAPE.SQUARE
        this.update()
        return this
    }

    asTick(size?: number): this {
        if (size !== undefined && size > 0) {
            this.setSize(size)
        }

        this._shape = POINTSHAPE.TICK
        this.update()
        return this
    }

    setSize(value: number): this {
        this._scale = value

        // Force update
        this.svg.data('shape', null)
        this.update()
        return this
    }

    getDistanceTo(value: Figure, byDefault = 40): number {
        if (value instanceof Point) {
            return Math.sqrt((this.x - value.x) ** 2 + (this.y - value.y) ** 2)
        }

        return byDefault
    }

    updateFigure(): this {
        // The update mechanism is frozen.
        if (this.freeze) { return this }

        this._updateShape()
        this._updateCoordinate()
        this.svg.center(this._x, this._y)

        this.generateDisplayName()

        return this
    }

    updateLabel(): this {
        return this
    }

    // TODO: handle the display name
    // generateDisplayName(): this {
    //     if (this.displayName) {
    //         this.label.displayName = this.displayName
    //             .replace('?', this.name)
    //             .replace('@', this.coordAsTex)
    //     } else {
    //         this.label.displayName = this.name
    //     }

    //     return this
    // }

    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A: Point, B: Point): this {
        this._constrain = {
            type: POINTCONSTRAIN.MIDDLE,
            data: [A, B]
        }
        this.update()
        return this
    }

    intersectionOf(a: Line, b: Line | Circle, k?: number): this {
        if (b instanceof Line) {
            this._constrain = {
                type: POINTCONSTRAIN.INTERSECTION_LINES,
                data: [a, b]
            }
        } else if (b instanceof Circle) {
            this._constrain = {
                type: POINTCONSTRAIN.INTERSECTION_CIRCLE_LINE,
                data: [b, a, k ?? 1]
            }
        }

        return this
    }

    fromVector(A: Point, B: Point, scale: number, X?: Point): this {
        this._constrain = {
            type: POINTCONSTRAIN.VECTOR,
            data: [A, B, scale, X]
        }

        this.update()
        return this
    }

    fromDirection(A: Point, d: Line, size: number | StepValueType, perpendicular: boolean): this {
        this._constrain = {
            type: POINTCONSTRAIN.DIRECTION,
            data: [A, d, size, perpendicular]
        }
        this.update()
        return this
    }

    fromCoord(
        ptX: StepValueType,
        ptY: StepValueType
    ): this {
        this._constrain = {
            type: POINTCONSTRAIN.COORDINATES,
            data: [ptX, ptY]
        }
        this.update()
        return this
    }

    /**
     * Constrain the point to be bound to an axis or projection
     * @param A: Point
     * @param to: Line | string
     */
    projection(A: Point, to: Line | string): this {
        this._constrain = {
            type: POINTCONSTRAIN.PROJECTION,
            data: [A, to]
        }
        this.update()
        return this
    }

    symmetry(A: Point, of: Line | Point | string): this {
        this._constrain = {
            type: POINTCONSTRAIN.SYMMETRY,
            data: [A, of]
        }

        this.update()
        return this
    }

    draggable(options?: {
        // grid?: Grid,
        constrain?: string | Figure,
        bounds?: { x?: [number, number], y?: [number, number], d?: [number, number] }
        callback?: (value: Point) => void
    }): this {
        this._shape = POINTSHAPE.HANDLE
        this.updateFigure()

        if (options === undefined) { options = {} }

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const point = this

        // let grid = this.graph.getFigure('MAINGRID')

        function dragmove(e: Event & { detail: { box: Box, handler: svgShape } }): void {
            // Get the event details
            const { handler, box } = e.detail
            // Get the bounding box
            let { x, y } = box

            // Prevent default behavior
            e.preventDefault()

            // Do not allow to go outside the graph.
            if (x < 0 || x > point.graph.width - box.width / 2) {
                return
            }
            if (y < 0 || y > point.graph.height - box.height / 2) {
                return
            }

            // Do not allow to go outside the bounds.
            if (options?.bounds?.x) {
                if (x < point.graph.unitsToPixels({ x: options.bounds.x[0], y: 0 }).x ||
                    x > point.graph.unitsToPixels({ x: options.bounds.x[1], y: 0 }).x
                ) {
                    return
                }
            }
            if (options?.bounds?.y) {
                if (y > point.graph.unitsToPixels({ y: options.bounds.y[0], x: 0 }).y ||
                    y < point.graph.unitsToPixels({ y: options.bounds.y[1], x: 0 }).y
                ) {
                    return
                }
            }


            // Constrain
            if (options?.constrain) {
                // Update the value to match the grid
                if (options.constrain instanceof Grid) {
                    const intersection = options.constrain.nearestPoint({ x, y })
                    x = intersection.x
                    y = intersection.y
                } else if (options.constrain === 'x') {
                    y = point.y
                } else if (options.constrain === 'y') {
                    x = point.x
                } else {
                    if (options.constrain instanceof Circle) {
                        const v = new mathVector(options.constrain.center, { x, y })
                        let r = options.constrain.getRadiusAsPixels()

                        if (options.bounds?.d) {
                            const d = Math.sqrt(v.x ** 2 + v.y ** 2)
                            if (d < options.bounds.d[0] || d > options.bounds.d[1]) {
                                r = (d < options.bounds.d[0]) ? options.bounds.d[0] : options.bounds.d[1]
                                x = options.constrain.center.x + v.x / v.norm * r
                                y = options.constrain.center.y + v.y / v.norm * r
                            }
                        } else {
                            x = options.constrain.center.x + v.x / v.norm * r
                            y = options.constrain.center.y + v.y / v.norm * r
                        }
                    } else if (options.constrain instanceof Line) {
                        //TODO: must constrain to the segment
                        y = options.constrain.math.getValueAtX(x)
                    } else if (options.constrain instanceof Plot) {
                        const pt = point.graph.pixelsToUnits({ x, y })
                        y = point.graph.unitsToPixels(options.constrain.evaluate(pt.x)).y
                    }

                }
            }

            // Move the circle to the current position
            handler.move(x, y)

            // Set the point shape coordinate
            point.x = x //handler.el.cx()
            point.y = y //handler.el.cy()

            // console.log(handler.el.cy())
            // Update the figures and labels.
            point.graph.update()

            // Callback at the end, with the point
            if (options?.callback) {
                options.callback(point)
            }
        }

        // @ts-expect-error - draggable is not defined in svgjs
        this.svg.draggable().on('dragmove', dragmove)
        return this
    }

    makeInvisible(value?: boolean): this {
        this._hiddenPoint = value !== false
        this.hide()
        return this
    }

    isInvisible(): boolean {
        return this._hiddenPoint
    }

    trace(color?: string, width?: number): void {
        // Initilaisation must be with parameters.
        if (this._trace == undefined && color === undefined) { return }

        // Make sur the group exists.
        if (this._trace === undefined) {
            this._trace = this.rootSVG.group()
            this._isTracing = {
                enabled: true,
                color: color ?? 'red',
                width: width ? width : this._scale
            }

        }

        // Add the point to the group.
        const pt = this.svg.clone()
        pt.fill(this._isTracing.color)
        pt.stroke(this._isTracing.color);

        (pt as svgCircle).radius(this._isTracing.width)

        this._trace.add(pt)
    }

    private _updateShape(): void {
        // If the shape exist and is the same, no need to continue.
        if (this._shape === this.svg.data('shape')) {
            return
        }

        // Remove the current shape if it already exist and is not the same
        if (this._shape !== this.svg.data('shape')) {
            this.svg.remove()
        }

        // Create the new shape
        if (this._shape === POINTSHAPE.CIRCLE) {
            this.svg = this.rootSVG.circle(this._scale)
                .stroke('black').fill('white')
                .data('shape', POINTSHAPE.CIRCLE)
        } else if (this._shape === POINTSHAPE.CROSS) {
            this.svg = this.rootSVG
                .path(`M${-this._scale},${-this._scale} L${+this._scale},${+this._scale} M${+this._scale},${-this._scale} L${-this._scale},${+this._scale}`)
                .stroke('black')
                .data('shape', POINTSHAPE.CROSS)
        } else if (this._shape === POINTSHAPE.SQUARE) {
            this.svg = this.rootSVG
                .path(`M${-this._scale},${-this._scale} L${+this._scale},${-this._scale} L${+this._scale},${+this._scale} L${-this._scale},${+this._scale} Z`)
                .stroke('black')
                .data('shape', POINTSHAPE.SQUARE)
        } else if (this._shape === POINTSHAPE.HANDLE) {
            this.svg = this.rootSVG.circle(20)
                .stroke('black').fill('white').opacity(0.4)
                .data('shape', POINTSHAPE.HANDLE)
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (this._shape === POINTSHAPE.TICK) {
            if (this.coord.x !== 0 && this.coord.y === 0) {
                this.svg = this.rootSVG
                    .path(`M0,${-this._scale} L0,${this._scale}`)
                    .stroke('black')
                    .data('shape', POINTSHAPE.TICK)
            } else if (this.coord.x === 0 && this.coord.y !== 0) {
                this.svg = this.rootSVG
                    .path(`M${-this._scale},0 L${this._scale},0`)
                    .stroke('black')
                    .data('shape', POINTSHAPE.TICK)
            } else {
                this.svg = this.rootSVG
                    .path(`M${-this._scale},0 L${this._scale},0 M0,${-this._scale} L0,${this._scale}`)
                    .stroke('black')
                    .data('shape', POINTSHAPE.TICK)
            }
        } else {
            console.warn("Point shape is not supported")
        }

    }

    private _updateCoordinate(): void {
        // this._constrain.data = [Point, Point]
        if (this._constrain.type === POINTCONSTRAIN.MIDDLE &&
            this._constrain.data?.length === 2 &&
            this._constrain.data[0] instanceof Point &&
            this._constrain.data[1] instanceof Point
        ) {
            const A: Point = this._constrain.data[0],
                B: Point = this._constrain.data[1]

            this._x = (A.x + B.x) / 2
            this._x = (A.x + B.x) / 2
            this._y = (A.y + B.y) / 2
        }

        // this._constrain.data = [Line, Line]
        if (this._constrain.type === POINTCONSTRAIN.INTERSECTION_LINES
            && this._constrain.data?.length === 2
            && this._constrain.data[0] instanceof Line
            && this._constrain.data[1] instanceof Line
        ) {
            const a: mathLine = this._constrain.data[0].math,
                b: mathLine = this._constrain.data[1].math,
                intersection = a.intersection(b)

            if (intersection !== null) {
                this._x = intersection.x
                this._y = intersection.y
                this.show()
            } else {
                // TODO: must mark an invalid point
                this.hide()
            }
        }

        // this._constrain.data = [circle, line, k]
        if (this._constrain.type === POINTCONSTRAIN.INTERSECTION_CIRCLE_LINE &&
            this._constrain.data?.length === 3 &&
            this._constrain.data[0] instanceof Circle &&
            this._constrain.data[1] instanceof Line
        ) {
            const circle: Circle = this._constrain.data[0],
                d: Line = this._constrain.data[1],
                k: number = this._constrain.data[2] as number

            // Get the intersection of the circle with the line.
            const m: number = d.math.slope,
                h: number = d.math.ordinate,
                r: number = circle.getRadiusAsPixels(),
                c1: number = circle.center.x,
                c2: number = circle.center.y,
                a: number = m ** 2 + 1,
                b: number = -2 * c1 + 2 * m * (h - c2),
                c: number = c1 ** 2 + (h - c2) ** 2 - r ** 2,
                delta = b ** 2 - 4 * a * c

            if (delta < 0) {
                this.hide()
                return
            }

            this.show()
            if (delta === 0) {
                this._x = -b / (2 * a)
                this._y = m * (-b / (2 * a)) + h
            } else {
                const x1 = (-b + Math.sqrt(delta)) / (2 * a),
                    y1 = m * x1 + h,
                    x2 = (-b - Math.sqrt(delta)) / (2 * a),
                    y2 = m * x2 + h

                if (x1 <= x2) {
                    this._x = k === 1 ? x1 : x2
                    this._y = k === 1 ? y1 : y2
                } else {
                    this._x = k === 1 ? x2 : x1
                    this._y = k === 1 ? y2 : y1
                }
            }
        }

        // this._constrain.data = [Point, Line|string]
        if (this._constrain.type === POINTCONSTRAIN.PROJECTION &&
            this._constrain.data?.length === 2 &&
            this._constrain.data[0] instanceof Point &&
            (this._constrain.data[1] instanceof Line || typeof this._constrain.data[1] === 'string')
        ) {
            const M: Point = this._constrain.data[0],
                to: Line | string = this._constrain.data[1]

            if (to === 'Ox') {
                this._x = M.x
                this._y = this.graph.origin.y
            } else if (to === 'Oy') {
                this._x = this.graph.origin.x
                this._y = M.y
            } else if (to instanceof Line) {
                // Get the projection to a line.
                const u = to.math.director,
                    A = to.getPointOnLine(),  // Point on the line
                    AP = new mathVector(A, M),
                    k = mathVector.scalarProduct(AP, u) / (u.norm ** 2)

                this._x = A.x + k * u.x
                this._y = A.y + k * u.y
            }
        }

        // this._constrain.data = [A:Point, symmetry:Point|string|Line]
        if (this._constrain.type === POINTCONSTRAIN.SYMMETRY &&
            this._constrain.data?.length === 2 &&
            this._constrain.data[0] instanceof Point
        ) {
            const symmetry_reference = this._constrain.data[1],
                pt = this._constrain.data[0]

            if (pt instanceof Point && symmetry_reference instanceof Point) {
                this._x = pt.x + 2 * (symmetry_reference.x - pt.x)
                this._y = pt.y + 2 * (symmetry_reference.y - pt.y)
            } else if (typeof symmetry_reference === "string") {
                if (symmetry_reference === 'Ox') {
                    this._x = pt.x
                    this._y = this.graph.origin.y - (pt.y - this.graph.origin.y)
                } else if (symmetry_reference === 'Oy') {
                    this._x = this.graph.origin.x - (pt.x - this.graph.origin.x)
                    this._y = pt.y
                }
            } else if (symmetry_reference instanceof Line) {
                // Get the projection to a line.
                const u = symmetry_reference.math.director

                const A = symmetry_reference.getPointOnLine(),  // Point on the line
                    AP = new mathVector(A, pt),
                    k = mathVector.scalarProduct(AP, u) / (u.norm ** 2),
                    proj = {
                        x: A.x + k * u.x,
                        y: A.y + k * u.y
                    }

                this._x = pt.x + 2 * (proj.x - pt.x)
                this._y = pt.y + 2 * (proj.y - pt.y)

            }
        }

        // this._constrain.data = [A:Point, B:Point, scale, <From point>Point]
        if (this._constrain.type === POINTCONSTRAIN.VECTOR &&
            (this._constrain.data?.length === 3 || this._constrain.data?.length === 4) &&
            this._constrain.data[0] instanceof Point &&
            this._constrain.data[1] instanceof Point &&
            typeof this._constrain.data[2] === "number"
        ) {
            const A: Point = this._constrain.data[0],
                B: Point = this._constrain.data[1],
                scale: number = this._constrain.data[2] ?? 1,
                X = this._constrain.data[3]

            if (X instanceof Point) {
                this._x = X.x + (B.x - A.x) * scale
                this._y = X.y + (B.y - A.y) * scale
            } else {
                this._x = A.x + (B.x - A.x) * scale
                this._y = A.y + (B.y - A.y) * scale
            }
        }

        // this._constrain.data = [A:Point, d:Line, distance:number, perpendicular:boolean]
        if (this._constrain.type === POINTCONSTRAIN.DIRECTION &&
            this._constrain.data?.length === 4 &&
            this._constrain.data[0] instanceof Point &&
            this._constrain.data[1] instanceof Line &&
            (typeof this._constrain.data[2] === "number" || Object.hasOwn(this._constrain.data[2] as StepValueType, 'item')) &&
            typeof this._constrain.data[3] === "boolean"
        ) {
            const A: Point = this._constrain.data[0],
                d: Line = this._constrain.data[1],
                perp: boolean = this._constrain.data[3],
                v = perp ? d.math.normal : d.math.director,
                norm = v.norm

            let distance = 1
            if (typeof this._constrain.data[2] === 'number') {
                distance = this.graph.distanceToPixels(this._constrain.data[2])
            } else {
                // this._constrain.data[2]
                // return {
                //     type: STEP_TYPE.number,
                //     kind: STEP_KIND.dynamic,
                //     item: [A, B],
                //     option: 'distance'
                // }
                const [X, Y] = (this._constrain.data[2] as StepValueType).item as Point[]
                if (X instanceof Point && Y instanceof Point) {
                    distance = X.getDistanceTo(Y)
                }
            }

            this._x = A.x + v.x * distance / norm
            this._y = A.y + v.y * distance / norm
        }

        // this._constrain.data = [A:StepValueType, B:StepValueType]
        // StepValueType: {
        //      type<number|figure|point|option>,
        //      kind<static|dynamic>,
        //      item<Point | Figure | string | number | (Point|Figure|number)[]>,
        //      option?: string
        // }
        if (this._constrain.type === POINTCONSTRAIN.COORDINATES &&
            this._constrain.data?.length === 2
        ) {
            const [ptX, ptY] = this._constrain.data

            this._x = this._updateOneCoordinate(ptX as StepValueType)
            this._y = this._updateOneCoordinate(ptY as StepValueType)
        }
    }

    private _updateOneCoordinate(value: StepValueType): number {
        if (!isNaN(+value.item)) {
            return this.graph.unitsToPixels({ x: +value.item, y: 0 }).x
        } else {
            if (value.option === 'x' && value.item instanceof Point) {
                return value.item.x
            } else if (value.option === 'y' && value.item instanceof Point) {
                return value.item.y
            } else if (value.option === 'distance' && value.item instanceof Array) {
                const [X, Y, direction] = value.item
                if (X instanceof Point && Y instanceof Point) { return this.graph.origin.x + (+direction) * X.getDistanceTo(Y) }
            } else if (value.option === "function" && value.item instanceof Array) {
                const [f, v] = value.item
                if (f instanceof Plot) {
                    const vx = this.graph.pixelsToUnits({
                        x: this._updateOneCoordinate(v as unknown as StepValueType),
                        y: 0
                    }).x
                    return this.graph.unitsToPixels({
                        x: +v,
                        y: f.evaluate(vx).y
                    }).y
                }
            } else {
                console.warn("Point constrain is not supported for ")
                console.log(this._constrain)
            }
        }

        return NaN
    }
}
