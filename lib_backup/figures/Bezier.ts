import { Figure, IFigureConfig } from "../Figure"
import { Path } from "@svgdotjs/svg.js"
import { BezierPoint, IPoint, isPoint } from "../pidraw.interface"
import { BEZIERCONTROL } from "../enums"


export class Bezier extends Figure {
    private _path: string
    private _points: BezierPoint[]
    private _ratio: number

    constructor(
        config: IFigureConfig,
        values: (string | IPoint | BezierPoint)[]) {
        super(config)

        this.generateName()

        this._path = ''
        this._points = []
        this.definePoints(values)
        this._ratio = 0.3
        this.svg = this.rootSVG.path("").stroke('black').fill('none')

        this.updateFigure()
    }

    get points(): BezierPoint[] {
        return this._points
    }

    get path(): string {
        return this._path
    }

    get ratio(): number {
        return this._ratio
    }

    set ratio(value: number) {
        this._ratio = value
        this.update()
    }

    /**
     * Defines the points for a graph.
     *
     * @param {Array.<string|Point|Object>} values - The values representing the points for the graph.
     *     Each value can be either a string representing the name of a point,
     *     an instance of the Point class, or an object with properties `point`, `control`, and `ratio`.
     * @param {string|Point} values.point - The name of the point or an instance of the Point class.
     * @param {string} values.control - The control type for the point. Possible values are 'min', 'max',
     *     'flat', or 'smooth'.
     * @param {number} [values.ratio] - The ratio for the point. Default value is `this.ratio`.
     * @param {Array} values.c1 - The control point for the curve before the current point.
     *     It is an object with properties `x` and `y`.
     * @param {Array} values.c2 - The control point for the curve after the current point.
     *     It is an object with properties `x` and `y`.
     * @return {void}
     */
    definePoints(values: (string | IPoint | { point: string | IPoint, control: string, ratio?: number })[]) {
        // @ts-expect-error - TS doesn't like the fact that we're using a setter here.
        this._points = values.map(
            (x, index) => {
                if (isPoint(x) || typeof x === 'string') {
                    return {
                        point: this.graph.getPoint(x),
                        control: Bezier.uniformizeControlType('smooth'), // min | max | flat | smooth,
                        ratio: this.ratio,
                        c1: index > 0 ? { x: 0, y: 0 } : null,
                        c2: index < values.length - 1 ? { x: 0, y: 0 } : null
                    }
                }

                return {
                    point: this.graph.getPoint(x.point),
                    control: Bezier.uniformizeControlType(x.control),
                    ratio: x.ratio ?? this.ratio,
                    c1: index > 0 ? { x: 0, y: 0 } : null,
                    c2: index < values.length - 1 ? { x: 0, y: 0 } : null
                }
            }).filter(pt => pt.point)
    }

    public static uniformizeControlType(ctrl: string): BEZIERCONTROL {
        if (Bezier.isVertical(ctrl)) { return BEZIERCONTROL.VERTICAL }
        if (Bezier.isHorizontal(ctrl)) { return BEZIERCONTROL.HORIZONTAL }

        return BEZIERCONTROL.SMOOTH
    }

    generateName(): string {
        return "bezier"
    }

    public static isSmooth(control: string): boolean {
        return !(Bezier.isHorizontal(control) || Bezier.isVertical(control))
    }

    public static isHorizontal(control: string): boolean {
        return control === 'flat' || control === 'min' || control === 'max' || control === 'ah' || control === "h"
    }

    public static isVertical(control: string): boolean {
        return control === 'vertical' || control === "av" || control === "v"
    }

    plot(values?: (string | IPoint | {
        point: string | IPoint,
        control: string,
        ratio?: number
    })[], speed?: number): this {
        // The update mechanism is frozen.
        if (this.freeze) { return this }

        // Generate the new values.
        if (values !== undefined) { this.definePoints(values) }

        // Build the smooth path
        this._path = svgPath(this.points, bezierCommand)

        // Build the path.
        if (this.svg instanceof Path) {
            this.svg.plot(this._path)
        } else if (speed !== undefined && speed > 0) {
            this.svg.animate(speed).plot(this._path as unknown as object)
        }

        return this
    }

    updateFigure(): this {
        this.plot()
        return this
    }

}


// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
// Render the svg <path> element
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
const svgPath = (points: BezierPoint[], command: bezierCommandType) => {
    // build the d attributes by looping over the points
    return points.reduce((acc, point, i, a) => i === 0
        // if first point
        ? `M ${point.point.x},${point.point.y}`
        // else
        : `${acc} ${command(point, i, a)}`
        , '')
}

// Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA: BezierPoint, pointB: BezierPoint) => {
    const lengthX = pointB.point.x - pointA.point.x
    const lengthY = pointB.point.y - pointA.point.y

    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

// Position of a control point
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current: BezierPoint, previous: BezierPoint | undefined, next: BezierPoint | undefined, reverse?: boolean) => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous ?? current
    const n = next ?? current
    // The smoothing ratio
    const smoothing = current.ratio
    // Properties of the opposed-line
    const o = line(p, n)
    // If is end-control-point, add PI to the angle to go backward
    let angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    // If the current control type is vertical or horizontal, adapt the angle
    if (current.control === BEZIERCONTROL.VERTICAL) {
        angle = Math.PI / 2 + (reverse ? Math.PI : 0)
    } else if (current.control === BEZIERCONTROL.HORIZONTAL) {
        angle = 0 + (reverse ? Math.PI : 0)
    }

    // The control point position is relative to the current point
    const x = current.point.x + Math.cos(angle) * length
    const y = current.point.y + Math.sin(angle) * length
    return [x, y]
}

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
export type bezierCommandType = (bPoint: BezierPoint, i: number, a: BezierPoint[]) => string
const bezierCommand = (bPoint: BezierPoint, i: number, a: BezierPoint[]) => {
    // start control point
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], bPoint)
    // end control point
    const [cpeX, cpeY] = controlPoint(bPoint, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${bPoint.point.x},${bPoint.point.y}`
}