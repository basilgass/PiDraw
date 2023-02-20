import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {IPoint} from "../variables/interfaces";
import {Grid} from "./Grid";
import {AXIS, POINTCONSTRAIN, POINTSHAPE} from "../variables/enums";
import {Label} from "./Label";
import {Circle} from "./Circle";
import {Line} from "./Line";
import {Plot} from "./Plot";
import {Vector} from "pimath/esm/maths/geometry/vector"

export interface PointConfig {
    data?: any
    type: POINTCONSTRAIN,
}

export class Point extends Figure {
    private _constrain: PointConfig
    private _scale: number
    private _shape: POINTSHAPE
    private _x: number
    private _y: number

    constructor(graph: Graph, name: string, pixels: IPoint) {
        super(graph, name);

        this._x = pixels.x
        this._y = pixels.y

        this.generateName()

        this._shape = POINTSHAPE.CROSS
        this._scale = 6

        this._constrain = {type: POINTCONSTRAIN.FIXED}

        this._updateShape()

        // Add the label
        this.label = new Label(this.graph, name, {el: this})
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
        this.update()
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
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

    addUnit(value:number, axis?: AXIS): Point {
        if(axis===undefined || axis===AXIS.HORIZONTAL){
            this.coordX = this.coord.x + value
        }else{
            this.coordY = this.coord.y + value
        }
        return this
    }

    get tex(): string {
        let P = this.graph.pixelsToUnits(this)
        return `${this.name}${this.coordAsTex}`
    }

    get coordAsTex(): string {
        let P = this.graph.pixelsToUnits(this)
        return `\\left( ${P.x} ; ${P.y} \\right)`
    }

    generateName(): string {
        if (this.name === undefined) {
            this.name = `P${Object.keys(this.graph.points).length}`
        }

        return this.name
    }

    asCross(): Point {
        this._shape = POINTSHAPE.CROSS
        this._updateShape()
        return this
    }

    asCircle(size?: number): Point {
        if (size !== undefined && size > 0) {
            this._scale = size
        }

        this._shape = POINTSHAPE.CIRCLE
        this.update()
        return this
    }

    asSquare(size?: number, orientation?:Vector): Point {
        if (size !== undefined && size > 0) {
            this._scale = size
        }
        if(orientation !== undefined ){
            // TODO: add the orientation to the square - really useful ?
            console.log(orientation.tex)
        }

        this._shape = POINTSHAPE.SQUARE
        this.update()
        return this
    }

    setSize(value: number): Point {
        this._scale = value
        // Force update
        this.svg.data('shape', null)
        this.update()
        return this
    }

    getDistanceTo(value: Figure): number {
        if (value instanceof Point) {
            return Math.sqrt((this.x - value.x) ** 2 + (this.y - value.y) ** 2)
        }

        return 40
    }

    updateFigure(): Point {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this
        }

        this._updateShape()
        this._updateCoordinate()

        this.svg.center(this._x, this._y)

        return this
    }

    updateLabel(): Point {
        return this
    }

    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A: Point, B: Point): Point {
        this._constrain = {
            type: POINTCONSTRAIN.MIDDLE,
            data: [A, B]
        }
        this.update()
        return this
    }

    intersectionOf(a: Line, b: Line): Point {
        this._constrain = {
            type: POINTCONSTRAIN.INTERSECTION_LINES,
            data: [a, b]
        }

        return this
    }
    fromVector(A: Point, B: Point, scale: number): Point {
        this._constrain = {
            type: POINTCONSTRAIN.VECTOR,
            data: [A,B, scale]
        }
        this.update()
        return this
    }
    /**
     * Constrain the point to be bound to an axis or projection
     * @param A: Point
     * @param to: Line | string
     */
    projection(A: Point, to: Line | string): Point {
        this._constrain = {
            type: POINTCONSTRAIN.PROJECTION,
            data: [A, to]
        }
        this.update()
        return this
    }

    draggable(options: {
        grid?: Grid,
        constrain?: (string | Figure)[],
        callback?: Function
    }): Point {
        this._shape = POINTSHAPE.HANDLE
        this.updateFigure()

        if(options===undefined)options = {}

        let point = this

        // let grid = this.graph.getFigure('MAINGRID')

        function dragmove(e: any): void {
            // Get the event details
            const {handler, box} = e.detail;
            // Get the bounding box
            let {x, y} = box;

            // Prevent default behavior
            e.preventDefault()

            // Do not allow to go outside the graph.
            if (x < 0 || x > point.graph.width - box.width / 2) {
                return
            }
            if (y < 0 || y > point.graph.height - box.height / 2) {
                return
            }

            // Update the value to match the grid
            if (options.grid) {
                if (options.grid instanceof Grid) {
                    const intersection = options.grid.nearestPoint({x, y})
                    x = intersection.x
                    y = intersection.y
                }
            }

            // Constrain
            if (options.constrain) {
                if (options.constrain.includes('x')) {
                    y = point.y
                } else if (options.constrain.includes('y')) {
                    x = point.x
                } else {
                    for (let c of options.constrain) {
                        if (c instanceof Circle) {
                            let v = new Vector(c.center, {x, y}),
                                r = c.getRadiusAsPixels()

                            x = c.center.x + v.x.value / v.norm * r
                            y = c.center.y + v.y.value / v.norm * r
                        } else if (c instanceof Line) {
                            y = c.math.getValueAtX(x).value
                        } else if (c instanceof Plot) {
                            const pt = point.graph.pixelsToUnits({x, y})
                            y = point.graph.unitsToPixels(c.evaluate(pt.x)).y
                        }
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
            if (options.callback) {
                options.callback(point)
            }
        }

        this.svg.draggable()
            .on('dragmove', dragmove)
        return this
    }

    private _updateShape(): void {
        // If the shape exist and is the same, no need to continue.
        if (this.svg && this._shape === this.svg.data('shape')) {
            return
        }

        // Remove the current shape if it already exist and is not the same
        if (this.svg && this._shape !== this.svg.data('shape')) {
            this.svg.remove()
        }

        // Create the new shape
        if (this._shape === POINTSHAPE.CIRCLE) {
            this.svg = this.graph.svg.circle(
                this._scale
            ).stroke('black').fill('white').data('shape', POINTSHAPE.CIRCLE);
        } else if (this._shape === POINTSHAPE.CROSS) {
            this.svg = this.graph.svg.path(
                `M${-this._scale},${-this._scale} L${+this._scale},${+this._scale} M${+this._scale},${-this._scale} L${-this._scale},${+this._scale}`
            ).stroke('black').center(0, 0).data('shape', POINTSHAPE.CROSS);
        } else if(this._shape === POINTSHAPE.SQUARE) {
            this.svg = this.graph.svg.path(
                `M${-this._scale},${-this._scale} L${+this._scale},${-this._scale} L${+this._scale},${+this._scale} L${-this._scale},${+this._scale} Z`
            ).stroke('black').center(0, 0).data('shape', POINTSHAPE.SQUARE);
        } else if (this._shape === POINTSHAPE.HANDLE) {
            this.svg = this.graph.svg.circle(
                20
            ).stroke('black').fill('white').opacity(0.4).data('shape', POINTSHAPE.HANDLE);
        }
    }

    private _updateCoordinate(): void {
        if (this._constrain.type === POINTCONSTRAIN.MIDDLE) {
            const A: Point = this._constrain.data[0],
                B: Point = this._constrain.data[1]

            this._x = (A.x + B.x) / 2
            this._y = (A.y + B.y) / 2
        }

        if (this._constrain.type === POINTCONSTRAIN.INTERSECTION_LINES) {
            let a:Line = this._constrain.data[0],
                b: Line = this._constrain.data[1],
                intersection = a.math.intersection(b.math)

            if(intersection.hasIntersection){
                this._x = intersection.point.x.value
                this._y = intersection.point.y.value
            }else{
                // TODO: must mark an invalid point
                this.hide()
            }
        }

        if (this._constrain.type === POINTCONSTRAIN.PROJECTION) {
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
                let u = to.math.director,
                    A = {x: 0, y: to.math.getValueAtX(0).value},  // Point on the line
                    AP = new Vector(A, M),
                    k = Vector.scalarProduct(AP, u) / u.normSquare.value

                this._x = A.x + k * u.x.value
                this._y = A.y + k * u.y.value
            }
        }

        if(this._constrain.type === POINTCONSTRAIN.VECTOR) {
            const A: Point = this._constrain.data[0],
                B: Point = this._constrain.data[1],
                scale: number = this._constrain.data[2]

            this._x = A.x + (B.x-A.x)*scale
            this._y = A.y + (B.y-A.y)*scale
        }
    }
}