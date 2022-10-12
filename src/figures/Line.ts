import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Line as svgLine} from "@svgdotjs/svg.js";
import {Line as mathLine} from "pimath/esm/maths/geometry/line"
import {Point as mathPoint} from "pimath/esm/maths/geometry/point"
import {Fraction} from "pimath/esm/maths/coefficients/fraction";
import {Vector} from "pimath/esm/maths/geometry/vector";
import {Numeric} from "pimath/esm/maths/numeric";

export interface LineConfig {
    k?: number
    rule: string,
    value?: Figure | number | string,
}

export enum LINECONSTRUCTION {
    PARALLEL = 'parallel',
    PERPENDICULAR = 'perpendicular',
    TANGENT = 'tangent',
    SLOPE = 'slope'
}

export class Line extends Figure {
    private _A: Point
    private _B: Point
    private _construction: LineConfig
    private _math: mathLine
    private _segment: boolean
    private _segmentEnd: boolean
    private _segmentStart: boolean

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

    get tex(): string {
        return `${this.name}: ${this.texMath.canonical}`
    }

    get texMath() {
        let A: {x:number, y:number},B: { x:number, y:number }
        let m: mathLine

        A = this.graph.pixelsToUnits(this.A)
        m = new mathLine(new mathPoint(A.x, A.y), this.d)

        return m.tex
    }

    get d(): Vector {

        if(this.B){
            let A = this.graph.pixelsToUnits(this.A),
                B = this.graph.pixelsToUnits(this.B)
            return new Vector(B.x-A.x, B.y-A.y)
        }else{
            switch(this._construction.rule){
                case LINECONSTRUCTION.SLOPE:
                    let slope = new Fraction(this._construction.value)
                    return new Vector(slope.denominator, slope.numerator)
                case LINECONSTRUCTION.PARALLEL:
                    if(this._construction.value instanceof Line){
                        return this._construction.value.d
                    }
                    break
                case LINECONSTRUCTION.PERPENDICULAR:
                    if(this._construction.value instanceof Line){
                        return this._construction.value.d.clone().normal()
                    }
                    break
                case LINECONSTRUCTION.TANGENT:
                    return new Vector()
            }
        }
        return new Vector()
    }

    get A(): Point {
        return this._A;
    }

    get B(): Point {
        return this._B;
    }

    get construction(): LineConfig {
        return this._construction;
    }

    get math(): mathLine {
        return this._math;
    }

    get segment(): boolean {
        return this._segment;
    }

    set segment(value: boolean) {
        this._segmentStart = value
        this._segmentEnd = value
        this._segment = value

        this.update()
    }

    get segmentStart(): boolean {
        return this._segmentStart;
    }

    set segmentStart(value: boolean) {
        this._segmentStart = value;
        this.update()
    }

    get segmentEnd(): boolean {
        return this._segmentEnd;
    }

    set segmentEnd(value: boolean) {
        this._segmentEnd = value;
        this.update()
    }

    asSegment(value?: boolean): Line {
        this.segment = value === undefined || value
        return this
    }

    asVector(value?: boolean): Line {
        this.segment = value === undefined || value

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
                if (this._segmentStart === this._segmentEnd) {
                    this.svg.plot(
                        this._A.x, this._segmentStart ? this._A.y : 0,
                        this._A.x, this.segmentEnd ? this._B.y : this.graph.height
                    )
                } else {
                    if (this._segmentStart) {
                        this.svg.plot(
                            this._A.x, this._A.y > this._B.y ? 0 : this._A.y,
                            this._A.x, this._A.y > this._B.y ? this._A.y : this.graph.height
                        )
                    } else {
                        this.svg.plot(
                            this._A.x, this._A.y > this._B.y ? this._B.y : 0,
                            this._A.x, this._A.y > this._B.y ? this.graph.height : this._B.y
                        )
                    }
                }
            }
        } else {
            let x1, x2
            if (this._segmentStart === this._segmentEnd) {
                x1 = this._segmentStart ? this._A.x : 0
                x2 = this._segmentEnd ? this._B.x : this.graph.width
            } else {
                if (this._segmentStart) {
                    x1 = this.A.x > this.B.x ? 0 : this.A.x
                    x2 = this.A.x > this.B.x ? this.A.x : this.graph.width
                } else {
                    x1 = this.A.x > this.B.x ? this._B.x : 0
                    x2 = this.A.x > this.B.x ? this.graph.width : this.B.x
                }
            }
            // [AB]=[BA] OK
            // ]AB[=]BA[ OK
            // the problem comes for half rules - the order is then important depending of the relative position of each reference point


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
                    this._math = new mathLine(
                        new mathPoint(this._A.x, this._A.y),
                        this._construction.value.math.director,
                        LINECONSTRUCTION.PARALLEL
                    )
                }
            }

            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    this._math = new mathLine(
                        new mathPoint(this._A.x, this._A.y),
                        this._construction.value.math.director,
                        LINECONSTRUCTION.PERPENDICULAR
                    )
                }
            }

            if ((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (!(this._construction.value instanceof Figure)) {
                    let value = new Fraction(this._construction.value).value

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