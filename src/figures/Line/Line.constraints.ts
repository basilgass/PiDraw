import type {IGraphConfig, XY} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {
    bisectorOfAngle,
    bisectorOfLines,
    type LineDefinition,
    mathLine,
    mediatorOf,
    parseLinearEquation,
    toCoordinates,
    toPixels
} from "../../calculus"
import {constraintIn, resolveIn} from "../constraints"
import type {Line} from "./Line"
import type {ILineConfig, LineConstraints} from "./Line.types"

/** A line found from its constraint, in pixels: one of its points, its direction, and the other end for two given points. */
export interface LineFound {
    start: XY,
    direction: XY,
    end?: XY
}

const asLine = ({point, direction}: LineDefinition): LineFound => ({start: point, direction})

/** The line through a point and in a direction, both given in units of the coordinate system. */
function fromUnits(point: XY, direction: XY, config: IGraphConfig): LineFound {
    const start = toPixels(point, config)
    const next = toPixels({x: point.x + direction.x, y: point.y + direction.y}, config)

    return {start, direction: {x: next.x - start.x, y: next.y - start.y}}
}

/** The line through a point in pixels, with a slope in units of the coordinate system. */
function withSlope(point: XY, slope: number, config: IGraphConfig): LineFound {
    const units = toCoordinates(point, config)

    return fromUnits(units, {x: 1, y: slope}, config)
}

/**
 * The line (an axis is one) as a pure line in pixels.
 * @throws InvalidArgumentError if `line` is not a line.
 */
export function mathLineOf(line: Line): mathLine {
    // The config can come from the parser or from JavaScript: what is not a line is refused here. A `Line` is recognised
    // by its maths, because importing the class would make a cycle with Line.ts.
    const candidate: unknown = line

    if (typeof candidate === 'object' && candidate !== null && (candidate as Line).math instanceof mathLine) {
        return (candidate as Line).math
    }

    throw new InvalidArgumentError(`Invalid line (${typeof candidate}): expected a line or an axis`)
}

/** How far to the sides the slope of a curve is read (units of the coordinate system). */
const STEP = 1e-4

/** How to find each constraint of a line. */
const RESOLVERS: { [K in keyof LineConstraints]: (value: LineConstraints[K], config: IGraphConfig) => LineFound } = {
    bisector: (value) => asLine('d1' in value
        ? bisectorOfLines(mathLineOf(value.d1), mathLineOf(value.d2), value.alternative)
        : bisectorOfAngle(value.A, value.B, value.C)),

    director: ({A, d}) => ({start: A, direction: d, end: {x: A.x + d.x, y: A.y + d.y}}),

    equation: (equation, config) => {
        const {a, b, c} = parseLinearEquation(equation)

        // The direction of ax+by+c=0 is (b, -a); the point is where it crosses the axis it is the least parallel to.
        const point = Math.abs(b) >= Math.abs(a) ? {x: 0, y: -c / b} : {x: -c / a, y: 0}

        return fromUnits(point, {x: b, y: -a}, config)
    },

    mediator: ({A, B}) => asLine(mediatorOf(A, B)),

    parallel: ({to, through}) => ({start: through, direction: to.direction}),

    perpendicular: ({to, through}) => ({start: through, direction: to.normal}),

    slope: ({A, slope}, config) => {
        if (!Number.isFinite(slope)) {
            throw new InvalidArgumentError(`Invalid slope ${slope}: expected a finite number`)
        }

        return withSlope(A, slope, config)
    },

    through: ({A, B}) => ({start: A, direction: {x: B.x - A.x, y: B.y - A.y}, end: B}),

    tangent: ({f, A}, config) => {
        const x = toCoordinates(A, config).x
        // Undefined where the curve is: the line then has no position.
        const slope = (f.numExp.evaluate({x: x + STEP}) - f.numExp.evaluate({x: x - STEP})) / (2 * STEP)

        return withSlope(A, slope, config)
    }
}

/** The only constraint of a line. @throws InvalidArgumentError if the config has none, or several. */
export function constraintOf(config: ILineConfig, name: string): keyof LineConstraints {
    return constraintIn(RESOLVERS, config, name, 'line')
}

/**
 * Find the line of the constraint `key` of a config that holds it.
 * @throws InvalidArgumentError if the constraint is not valid (a slope that is not finite).
 * @throws ParseError if the equation cannot be read.
 */
export function resolveConstraint(key: keyof LineConstraints, config: ILineConfig, graph: IGraphConfig): LineFound {
    return resolveIn(RESOLVERS, key, config, graph)
}
