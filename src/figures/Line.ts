import {Figure} from "./Figure";
import {Canvas} from "../Canvas";
import {Point} from "./Point";
import {Line as mathLine, Point as mathPoint} from "pimath/esm/maths/geometry";
import {Line as svgLine} from "@svgdotjs/svg.js";

export enum LINERULE {
    DEFAULT,
    PARALLEL,
    PERPENDICULAR,
    TANGENT
}

export interface ConstructionSettings {
    rule: string,
    point?: Point,
    k?: number
}

export class Line extends Figure {
    #A: Point
    #B: Point
    #construction: ConstructionSettings
    #math: mathLine

    constructor(canvas: Canvas, name: string, A: Point, B: Point, construction?: ConstructionSettings) {
        super(canvas, name)

        this.#A = A
        this.#B = B

        this.generateName()

        // Construction
        if (construction) {
            this.#construction = construction
        }

        this.svg = this.canvas.svg.line(
            0, 0, 0, 0
        ).stroke('black');

        this.updateFigure()
    }

    generateName(): string {
        if (this.name === undefined) {
            this.name = `d_${this.A.name + this.B.name}`
        }

        return this.name
    }

    updateFigure(): Line {
        this.#math = new mathLine(
            new mathPoint(this.#A.x, this.#A.y),
            new mathPoint(this.#B.x, this.#B.y)
        )

        if(this.#math.slope.isInfinity()){
            if(this.svg instanceof svgLine) {
                this.svg.plot(
                    this.#A.x, 0,
                    this.#A.x, this.canvas.height
                )
            }
        }else {
            if(this.svg instanceof svgLine) {
                this.svg.plot(
                    0, this.#math.getValueAtX(0).value,
                    this.canvas.width, this.#math.getValueAtX(this.canvas.width).value
                )
            }
        }
        return this
    }


    get A(): Point {
        return this.#A;
    }

    get B(): Point {
        return this.#B;
    }
}