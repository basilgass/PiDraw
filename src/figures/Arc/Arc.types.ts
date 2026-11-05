import type {Exclusive, XY} from "../../pidraw.common"
import type {CircleRadius} from "../Circle/Circle.types"

/**
 * The arc of the angle `start` - `center` - `end`: from the direction of `start` to the one of `end`, counterclockwise. The
 * radius is a number (in units of the x axis), a position (the radius is its distance to the center) or two positions;
 * without it, the distance from the center to `start`.
 */
export interface ArcByPoints {
    start: XY,
    center: XY,
    end: XY,
    radius?: CircleRadius
}

/** The arc of a circle of a given center and radius (a number, in units of the x axis), from an angle to another one, in degrees. */
export interface ArcByAngles {
    center: XY,
    radius: number,
    from: number,
    to: number
}

/**
 * The arc that `start` draws when it turns around `center` by `angle` degrees: counterclockwise if the angle is positive,
 * clockwise if it is negative. The radius is the one of {@link ArcByPoints}.
 */
export interface ArcByRotation {
    start: XY,
    center: XY,
    angle: number,
    radius?: CircleRadius
}

/** The constructions of an arc, by the key of the config that holds them. */
export interface ArcConstraints {
    points: ArcByPoints,
    angles: ArcByAngles,
    rotation: ArcByRotation
}

/** How an arc is drawn, whatever its construction. */
export interface ArcOptions {
    /** The other arc between the same two directions: clockwise instead of counterclockwise. */
    alternative?: boolean,
    /** Closed by the two radii, so that it can be filled like a slice. */
    sector?: boolean,
    /** A right angle is drawn as a square corner instead of an arc. */
    square?: boolean
}

/** An arc is given by exactly one construction, then how it is drawn. */
export type IArcConfig = Exclusive<ArcConstraints> & ArcOptions
