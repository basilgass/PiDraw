import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Line as svgLine} from "@svgdotjs/svg.js";
// import {Line as mathLine} from "pimath/esm/maths/geometry/line"
// import {Point as mathPoint} from "pimath/esm/maths/geometry/point"
// import {Fraction} from "pimath/esm/maths/coefficients/fraction";
// import {mathVector} from "pimath/esm/maths/geometry/vector";
import {Label} from "./Label";
import {IPoint} from "../variables/interfaces";
import {isInfinity, mathLine, mathVector} from "../Calculus";
import {Circle} from "./Circle";

export interface LineConfig {
    k?: number
    rule: string,
    value?: Figure | number | string,
    options?: Figure[]
}

export enum LINECONSTRUCTION {
    PARALLEL = 'parallel',
    PERPENDICULAR = 'perpendicular',
    TANGENT = 'tangent',
    SLOPE = 'slope',
    BISSECTOR = "bissector"
}

export class Line extends Figure {
    constructor(graph: Graph, name: string, A: Point, B: Point, construction?: LineConfig) {
        super(graph, name)

        this._A = A
        this._B = B
        this._scale = 1

        this.generateName()

        // Construction
        if (construction) {
            this._construction = construction
        }

        this.svg = this.graph.svg.line(
            0, 0, 0, 0
        ).stroke('black');

        this.updateFigure()

        // Add the label
        this.label = new Label(this.graph, name, {el: this})
        this.label.hide()
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

    private _scale: number

    get scale(): number {
        return this._scale;
    }

    set scale(value: number) {
        this._scale = value;
    }

    private _segment: boolean

    get segment(): boolean {
        return this._segment;
    }

    set segment(value: boolean) {
        this._segmentStart = value
        this._segmentEnd = value
        this._segment = value

        this.update()
    }

    private _segmentEnd: boolean

    get segmentEnd(): boolean {
        return this._segmentEnd;
    }

    set segmentEnd(value: boolean) {
        this._segmentEnd = value;
        this._segment = this._segmentStart && this._segmentEnd;

        this.update()
    }

    private _segmentStart: boolean

    get segmentStart(): boolean {
        return this._segmentStart;
    }

    set segmentStart(value: boolean) {
        this._segmentStart = value;
        this._segment = this._segmentStart && this._segmentEnd;

        this.update()
    }

    get tex(): string {
        // TODO : remove tex and display
        // return `${this.name}: ${this.texMath.canonical}`
        return ""
    }

    get display(): { canonical: string; mxh: string; parametric: string } {
        let A: { x: number, y: number }, B: { x: number, y: number }
        let m: mathLine

        A = this.graph.pixelsToUnits(this.A)
        m = new mathLine(A, this.d)

        // TODO : output a display method or disable the output
        return {canonical: "", mxh: "", parametric: ""}
    }

    get texMath() {
        let A: { x: number, y: number }, B: { x: number, y: number }
        let m: mathLine

        A = this.graph.pixelsToUnits(this.A)
        m = new mathLine(A, this.d)

        // TODO : output a display method
        return ""
    }

    get d(): mathVector {

        if (this.B) {
            let A = this.graph.pixelsToUnits(this.A),
                B = this.graph.pixelsToUnits(this.B)
            return new mathVector(B.x - A.x, B.y - A.y)
        } else {
            switch (this._construction.rule) {
                case LINECONSTRUCTION.SLOPE:
                    return new mathVector(1, +this._construction.value)
                case LINECONSTRUCTION.PARALLEL:
                    if (this._construction.value instanceof Line) {
                        return this._construction.value.d
                    }
                    break
                case LINECONSTRUCTION.PERPENDICULAR:
                    if (this._construction.value instanceof Line) {
                        return this._construction.value.d.normal
                    }
                    break
                case LINECONSTRUCTION.TANGENT:
                    return new mathVector(null, null)
            }
        }
        return new mathVector(null, null)
    }

    asSegment(value?: boolean, scale?: number): Line {
        if (scale !== undefined) {
            this.scale = scale
        }
        this.segment = value === undefined || value

        this._addMarker(false)

        return this
    }

    asVector(value?: boolean, scale?: number): Line {
        this.segment = value === undefined || value
        if (scale !== undefined) {
            this.scale = scale
        }

        this._addMarker(true)

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

    getPointOnLine(): IPoint {
        let x: number,
            y: number

        const slope = this.math.slope

        if (slope === Number.POSITIVE_INFINITY || slope === Number.NEGATIVE_INFINITY) {
            // it's a vertical line
            y = 0
            x = this.math.getValueAtY(0)
        } else {
            x = 0
            y = this.math.getValueAtX(0)
        }

        return {x, y}
    }

    private _addMarker(enable: Boolean): Line {
        if (this.svg instanceof svgLine) {
            if (enable) {
                this.svg.marker('end', this.graph.markers.end)
            } else {
                this.svg.marker('end', null)
            }
        }
        return this
    }

    private _updateLineThroughAandB() {
        this._math = new mathLine(this._A, this._B)
        const slope = this._math.slope

        if (slope === Number.POSITIVE_INFINITY || slope === Number.NEGATIVE_INFINITY) {
            if (this.svg instanceof svgLine) {
                if (this._segmentStart === this._segmentEnd) {
                    this.svg.plot(
                        this._A.x, this._segmentStart ? this._A.y : 0,
                        this._A.x, this.segmentEnd ? this._B.y + (this._B.y - this._A.y) * (this.scale - 1) : this.graph.height
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
                x2 = this._segmentEnd ? this._B.x + (this._B.x - this._A.x) * (this.scale - 1) : this.graph.width
            } else {
                if (this._segmentStart) {
                    x1 = this.A.x > this.B.x ? 0 : this.A.x
                    x2 = this.A.x > this.B.x ? this.A.x : this.graph.width
                } else {
                    x1 = this.A.x > this.B.x ? this._B.x : 0
                    x2 = this.A.x > this.B.x ? this.graph.width : this.B.x
                }
            }

            if (this.svg instanceof svgLine) {
                this.svg.plot(
                    x1,
                    this._math.getValueAtX(x1),
                    x2,
                    this._math.getValueAtX(x2)
                )
            }
        }
    }

    private _updateLineFromConstruction() {
        let x1 = 0,
            y1 = 0,
            x2 = this.graph.width,
            y2 = this.graph.height

        if (this._construction) {
            if ((this._construction.rule === LINECONSTRUCTION.PARALLEL)) {
                if (this._construction.value instanceof Line) {
                    this._math = new mathLine(
                        this._A,
                        this._construction.value.math.director
                    )
                }
            }

            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    this._math = new mathLine(
                        this._A,
                        this._construction.value.math.normal
                    )
                }
            }

            if (this._construction.rule === LINECONSTRUCTION.BISSECTOR) {
                if (this._construction.options.length === 2) {
                    let A = this._construction.value,
                        B: Figure = this._construction.options[0],
                        C: Figure = this._construction.options[1]

                    if (A instanceof Point && B instanceof Point && C instanceof Point) {
                        const AB = new mathVector(A, B),
                            normAB = AB.norm,
                            AC = new mathVector(A, C),
                            normAC = AC.norm

                        this._math = new mathLine(
                            A,
                            new mathVector(
                                AB.x / normAB + AC.x / normAC,
                                AB.y / normAB + AC.y / normAC
                            ),
                        )
                    }
                }
            }

            if ((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (!(this._construction.value instanceof Figure)) {
                    this._math = new mathLine(
                        this._A,
                        isInfinity(+this._construction.value) ?
                            new mathVector(0, 1) :
                            new mathVector(1, -this._construction.value)
                    )
                }
            }

            if (this._construction.rule === LINECONSTRUCTION.TANGENT) {
                // Construction value is [circle, point]
                if (this._construction.value instanceof Circle) {
                    const circle = this._construction.value,
                        point = this._A

                    const radius = circle.getRadiusAsPixels(),
                        distance = circle.center.getDistanceTo(point)

                    // Point is inside => do nothing
                    if (distance < radius) {
                        // TODO: how to handle invalid values ?
                        return
                    }

                    // Point is on the circle => perpendicular
                    if (distance === radius) {
                        this._math = new mathLine(
                            this._A,
                            new mathVector(circle.center, point).normal
                        )
                    }

                    // Point is outside the circle => tangent
                    if (distance > radius) {
                        let c1: number = circle.center.x,
                            c2: number = circle.center.y,
                            p1: number = point.x,
                            p2: number = point.y,
                            r: number = circle.getRadiusAsPixels(),
                            a: number = ((c1 - p1) ** 2) - (r ** 2),
                            b: number = 2 * (c1 - p1) * (c2 - p2),
                            c: number = ((c2 - p2) ** 2) - (r ** 2),
                            delta: number = b ** 2 - 4 * a * c,
                            m: number

                        if (delta < 0) {
                            // TODO: how to handle invalid values ?
                            return
                        }

                        // There are two tangents.
                        if (this._construction.k === undefined || this._construction.k === 1) {
                            // return the first tangent.
                            m = (-b + Math.sqrt(delta)) / (2 * a)
                        } else {
                            // return the second tangent.
                            m = (-b - Math.sqrt(delta)) / (2 * a)
                        }

                        this._math = new mathLine(
                            this._A,
                            isInfinity(+m) ?
                                new mathVector(0, 1) :
                                new mathVector(1, -m)
                        )

                    }

                }


            }

            // Draw the line
            if (isInfinity(this._math.slope)) {
                x1 = this._A.x
                x2 = this._A.x
                y1 = 0
                y2 = this.graph.height
            } else {
                y1 = this._math.getValueAtX(0)
                y2 = this._math.getValueAtX(this.graph.width)
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