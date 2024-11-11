// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
// Render the svg <path> element
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
import {type IBezierPointInterface} from "../figures/Bezier"
import {BEZIERCONTROL} from "../pidraw.common"

export type bezierCommandType = (bPoint: IBezierPointInterface, i: number, a: IBezierPointInterface[]) => string
export function computeBezierPath(points: IBezierPointInterface[]) {
    // build the d attributes by looping over the points
    return points.reduce((acc, point, i, a) => i === 0
            // if first point
            ? `M ${point.x},${point.y}`
            // else
            : `${acc} ${bezierCommand(point, i, a)}`
        , '')
}

// Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
function bezierLine(pointA: IBezierPointInterface, pointB: IBezierPointInterface) {
    const lengthX = pointB.x - pointA.x
    const lengthY = pointB.y - pointA.y

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
function bezierControlPoint(current: IBezierPointInterface, previous: IBezierPointInterface | undefined, next: IBezierPointInterface | undefined, reverse?: boolean) {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous ?? current
    const n = next ?? current
    // The smoothing ratio
    const smoothing = current.controls?.ratio ?? 0.2
    // Properties of the opposed-line
    const o = bezierLine(p, n)
    // If is end-control-point, add PI to the angle to go backward
    let angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    // If the current control type is vertical or horizontal, adapt the angle
    if (current.controls?.type === BEZIERCONTROL.VERTICAL) {
        angle = Math.PI / 2 + (reverse ? Math.PI : 0)
    } else if (current.controls?.type === BEZIERCONTROL.HORIZONTAL) {
        angle = 0 + (reverse ? Math.PI : 0)
    }

    // The control point position is relative to the current point
    const x = current.x + Math.cos(angle) * length
    const y = current.y + Math.sin(angle) * length
    return [x, y]
}

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command


function bezierCommand(bPoint: IBezierPointInterface, i: number, a: IBezierPointInterface[]) {
    // start control point
    const [cpsX, cpsY] = bezierControlPoint(a[i - 1], a[i - 2], bPoint)
    // end control point
    const [cpeX, cpeY] = bezierControlPoint(bPoint, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${bPoint.x},${bPoint.y}`
}