import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {IPoint} from "../variables/interfaces";
import {Grid} from "./Grid";
import {POINTCONSTRAIN, POINTSHAPE} from "../variables/enums";
import {Label} from "./Label";

export interface PointConfig {
    type: POINTCONSTRAIN,
    data?: any
}

export class Point extends Figure {
    private _scale: number
    private _shape: POINTSHAPE
    private _constrain: PointConfig

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

    private _x: number

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
        this.update()
    }

    private _y: number

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

    draggable(grid?: Grid): Point {
        this._shape = POINTSHAPE.HANDLE
        this.updateFigure()

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
            if (grid !== null) {
                if (grid instanceof Grid) {
                    const intersection = grid.nearestPoint({x, y})
                    x = intersection.x
                    y = intersection.y
                }
            }

            // Move the circle to the current positiovn
            handler.move(x, y)

            // TODO: Work with constrains.

            // Set the point shape coordinate
            point.x = x //handler.el.cx()
            point.y = y //handler.el.cy()

            // console.log(handler.el.cy())
            // Update the figures and labels.
            point.graph.update()

            // TODO: add after drag event ?
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
    }
}