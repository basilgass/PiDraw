import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {IPoint} from "../variables/interfaces";
import {Grid} from "./Grid";
import {POINTCONSTRAIN, POINTSHAPE} from "../variables/enums";
import {Circle as svgCircle} from "@svgdotjs/svg.js";

export interface PointConfig {
    type: POINTCONSTRAIN,
    data?: any
}

export class Point extends Figure {
    #x: number
    #y: number
    #scale: number
    #shape: POINTSHAPE
    #constrain: PointConfig

    constructor(graph: Graph, name: string, pixels: IPoint) {
        super(graph, name);

        this.#x = pixels.x
        this.#y = pixels.y

        this.generateName()

        this.#shape = POINTSHAPE.CROSS
        this.#scale = 6

        this.#constrain = {type: POINTCONSTRAIN.FIXED}

        this.#updateShape()
    }

    generateName(): string {
        if (this.name === undefined) {
            this.name = `P${Object.keys(this.graph.points).length}`
        }

        return this.name
    }

    #updateShape(): void {
        // If the shape exist and is the same, no need to continue.
        if (this.svg && this.#shape === this.svg.data('shape')) {
            return
        }

        // Remove the current shape if it already exist and is not the same
        if (this.svg && this.#shape !== this.svg.data('shape')) {
            this.svg.remove()
        }

        // Create the new shape
        if (this.#shape === POINTSHAPE.CIRCLE) {
            this.svg = this.graph.svg.circle(
                this.#scale
            ).stroke('black').fill('white').data('shape', POINTSHAPE.CIRCLE);
        } else if (this.#shape === POINTSHAPE.CROSS) {
            this.svg = this.graph.svg.path(
                `M${-this.#scale},${-this.#scale} L${+this.#scale},${+this.#scale} M${+this.#scale},${-this.#scale} L${-this.#scale},${+this.#scale}`
            ).stroke('black').center(0, 0).data('shape', POINTSHAPE.CROSS);
        } else if (this.#shape === POINTSHAPE.HANDLE) {
            this.svg = this.graph.svg.circle(
                20
            ).stroke('black').fill('white').opacity(0.4).data('shape', POINTSHAPE.HANDLE);
        }
    }

    asCross(): Point {
        this.#shape = POINTSHAPE.CROSS
        this.#updateShape()
        return this
    }
    asCircle(): Point {
        this.#shape = POINTSHAPE.CIRCLE
        this.update()
        return this
    }
    setSize(value: number): Point {
        this.#scale = value
        // Force update
        this.svg.data('shape', null)
        this.update()
        return this
    }

    updateFigure(): Point {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this
        }

        this.#updateShape()
        this.#updateCoordinate()

        this.svg.center(this.#x, this.#y)

        return this
    }

    #updateCoordinate(): void {
        if (this.#constrain.type === POINTCONSTRAIN.MIDDLE) {
            const A: Point = this.#constrain.data[0],
                B: Point = this.#constrain.data[1]

            this.#x = (A.x + B.x) / 2
            this.#y = (A.y + B.y) / 2
        }
    }

    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A: Point, B: Point): Point {
        this.#constrain = {
            type: POINTCONSTRAIN.MIDDLE,
            data: [A, B]
        }
        this.update()
        return this
    }

    draggable(grid?: Grid): Point {
        this.#shape = POINTSHAPE.HANDLE
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
            if(grid!==null){
                if(grid instanceof Grid) {
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

    get x(): number {
        return this.#x;
    }

    get y(): number {
        return this.#y;
    }

    set x(value: number) {
        this.#x = value;
        this.update()
    }

    set y(value: number) {
        this.#y = value;
        this.update()
    }

    get coord(): IPoint {
        return this.graph.pixelsToUnits(this)
    }
}