import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Line as svgLine} from "@svgdotjs/svg.js";
import {Line as mathLine} from "pimath/esm/maths/geometry/line"
import {Point as mathPoint} from "pimath/esm/maths/geometry/point"
import {PiMath} from "pimath/esm";

export interface LineConfig {
    rule: string,
    value?: Figure|number|string,
    k?: number
}

export enum LINECONSTRUCTION {
    PARALLEL = 'parallel',
    PERPENDICULAR = 'perpendicular',
    TANGENT = 'tangent',
    SLOPE = 'slope'
}

export class Line extends Figure {
    constructor(graph: Graph, name: string, A: Point, B: Point, construction?: LineConfig) {
        super(graph, name)

        this._A = A
        this._B = B

        this.generateName()

        // Construction
        if (construction) {
            this._construction = construction
        }

        this.svg = this.graph.svg.line(
            0, 0, 0, 0
        ).stroke('black');

        this.updateFigure()
    }

    private _A: Point

    get A(): Point {
        return this._A;
    }

    private _B: Point

    get B(): Point {
        return this._B;
    }

    private _construction: LineConfig

    get construction(): LineConfig {
        return this._construction;
    }

    private _math: mathLine

    get math(): mathLine {
        return this._math;
    }

    private _segment: boolean

    get segment(): boolean {
        return this._segment;
    }

    set segment(value: boolean) {
        this._segment = value;
    }

    asSegment(value?: boolean): Line {
        this._segment = value === undefined || value
        this.update()
        return this
    }

    asVector(value?: boolean): Line {
        this._segment = value === undefined || value

        if (this.svg instanceof svgLine) {
            this.svg.marker('end', this.graph.markers.end)
        }
        this.update()
        return this
    }

    generateName(): string {
        if (this.name === undefined) {

            if (this._B) {
                this.name = `d_${this.A.name + this.B.name}`
            } else if (this._construction && this._construction.value instanceof Figure) {
                this.name = `p_${this._construction.value.name},${this.A.name}`
            }
        }

        return this.name
    }

    updateFigure(): Line {
        if (this._B) {
            this._updateLineThroughAandB()
        } else {
            this._updateLineFromConstruction()
        }
        return this
    }

    private _updateLineThroughAandB() {
        this._math = new mathLine(
            new mathPoint(this._A.x, this._A.y),
            new mathPoint(this._B.x, this._B.y)
        )

        if (this._math.slope.isInfinity()) {
            if (this.svg instanceof svgLine) {
                this.svg.plot(
                    this._A.x, 0,
                    this._A.x, this.graph.height
                )
            }
        } else {
            let x1 = this._segment ? this._A.x : 0,
                x2 = this._segment ? this._B.x : this.graph.width
            if (this.svg instanceof svgLine) {
                this.svg.plot(
                    x1,
                    this._math.getValueAtX(x1).value,
                    x2,
                    this._math.getValueAtX(x2).value
                )
            }
        }
    }

    private _updateLineFromConstruction() {
        let x1 = 0, y1 = 0, x2 = this.graph.width, y2 = this.graph.height

        if (this._construction) {

            if ((this._construction.rule === LINECONSTRUCTION.PARALLEL)) {
                if (this._construction.value instanceof Line) {
                    let director = this._construction.value.math.director
                    this._math = new mathLine(
                        new mathPoint(this._A.x, this._A.y),
                        director,
                        LINECONSTRUCTION.PARALLEL
                    )


                }
            }

            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    let normal = this._construction.value.math.normal
                    this._math = new mathLine(
                        new mathPoint(this._A.x, this._A.y),
                        normal,
                        LINECONSTRUCTION.PERPENDICULAR
                    )
                }
            }

            if((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (! (this._construction.value instanceof Figure)) {
                    let value = new PiMath.Fraction(this._construction.value).value
                    this._math = new mathLine(
                        new mathPoint(this._A.x, this._A.y),
                        new mathPoint(this._A.x + 1, this._A.y - value)
                    )
                }
            }

            if (this._math.slope.isInfinity()) {
                x1 = this._A.x
                x2 = this._A.x
                y1 = 0
                y2 = this.graph.height
            } else {
                y1 = this._math.getValueAtX(0).value
                y2 = this._math.getValueAtX(this.graph.width).value
            }

            if (this.svg instanceof svgLine) {
                this.svg.plot(
                    x1,
                    y1,
                    x2,
                    y2
                )
            }
        }

    }
}