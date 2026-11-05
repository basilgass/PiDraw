/**
 * Vectors, lines and angles.
 *
 * Conventions: the pixels follow the SVG orientation (y goes down), the angles are in degrees, and a result that is
 * mathematically undefined (normalizing a null vector...) is a value (`NaN`), not an error.
 */

import {isXY, type XY} from "../pidraw.common"
import {InvalidArgumentError} from "../errors"

/**
 * The position of a figure that does not exist (lines that do not cross, points that are aligned...): `NaN` for both
 * coordinates. A new object at each call, so that two figures never share their position.
 */
export function nowhere(): XY {
    return {x: NaN, y: NaN}
}

/** Whether a position exists: its two coordinates are finite numbers (see {@link nowhere}). */
export function isDefinedPosition(position: XY): boolean {
    return Number.isFinite(position.x) && Number.isFinite(position.y)
}

export function distanceAB(A: XY, B: XY): number {
    return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)
}

/**
 * A 2D vector. `rotate` and `setLength` change the vector and return it, every other method returns a new vector.
 */
export class mathVector {
    x: number
    y: number

    /**
     * - `new mathVector(x, y)`: the vector of components `x` and `y`
     * - `new mathVector(v)`: a copy of any `{x, y}`
     * - `new mathVector(A, B)`: the vector from the point `A` to the point `B`
     *
     * @throws InvalidArgumentError for any other combination of arguments.
     */
    constructor(x: number | XY, y?: number | XY) {
        if (isXY(x) && isXY(y)) {
            this.x = y.x - x.x
            this.y = y.y - x.y
        } else if (isXY(x) && y === undefined) {
            this.x = x.x
            this.y = x.y
        } else if (typeof x === "number" && typeof y === "number") {
            // NaN is accepted: it is the value of an undefined result (the unit vector of the null vector...).
            this.x = x
            this.y = y
        } else {
            throw new InvalidArgumentError(`Cannot build a vector from ${JSON.stringify(x)} and ${JSON.stringify(y)}`)
        }
    }

    get norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /** The vector `(y, -x)`, perpendicular to this one. */
    get normal(): mathVector {
        return new mathVector(this.y, -this.x)
    }

    /** The vector of norm 1 with the same direction. `NaN` components for the null vector. */
    get unit(): mathVector {
        const n = this.norm
        return new mathVector(this.x / n, this.y / n)
    }

    static scalarProduct(u: mathVector, v: mathVector): number {
        return u.x * v.x + u.y * v.y
    }

    /** The orthogonal projection of this vector on `on`. `NaN` components if `on` is the null vector. */
    projection(on: mathVector): mathVector {
        const k = mathVector.scalarProduct(this, on) / (on.x * on.x + on.y * on.y)

        return new mathVector(on.x * k, on.y * k)
    }

    /** Rotate this vector by `angle` degrees, counterclockwise in the axes (x, y). */
    rotate(angle: number): this {
        const rads = angle * Math.PI / 180
        const cos = Math.cos(rads)
        const sin = Math.sin(rads)
        const x = this.x
        const y = this.y

        this.x = cos * x - sin * y
        this.y = sin * x + cos * y

        return this
    }

    add(v: mathVector): mathVector {
        return new mathVector(this.x + v.x, this.y + v.y)
    }

    /** Give this vector the norm `length`, in the same direction. `NaN` components for the null vector. */
    setLength(length: number): this {
        const k = length / this.norm
        this.x *= k
        this.y *= k

        return this
    }
}

/** A line, given by a point and a direction vector. */
export class mathLine {
    A: XY
    director: mathVector

    /** @param B a second point of the line, or the direction vector. */
    constructor(A: XY, B: XY | mathVector) {
        this.A = A
        this.director = B instanceof mathVector ? B : new mathVector(A, B)
    }

    /**
     * The intersection point with another line, or `null` if the lines are parallel (including the same line) or if
     * one of them has a null direction.
     */
    intersection(value: mathLine): XY | null {
        const d1 = this.director
        const d2 = value.director
        const det = d1.x * d2.y - d1.y * d2.x

        // Relative threshold: nearly parallel lines cross very far away, which is no usable point.
        if (Math.abs(det) <= 1e-12 * d1.norm * d2.norm) {
            return null
        }

        const t = ((value.A.x - this.A.x) * d2.y - (value.A.y - this.A.y) * d2.x) / det

        return {x: this.A.x + t * d1.x, y: this.A.y + t * d1.y}
    }

    /** The orthogonal projection of a point on the line. `NaN` coordinates if the direction is null. */
    projection(value: XY): XY {
        const d = this.director
        const p = new mathVector(this.A, value)

        const k = mathVector.scalarProduct(d, p) / mathVector.scalarProduct(d, d)

        return {x: this.A.x + d.x * k, y: this.A.y + d.y * k}
    }
}

/**
 * The point at distance `radius` from the center, at the angle `angleInDegrees` measured counterclockwise from
 * the Ox axis, in pixels (y goes down).
 * Reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
 */
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): XY {
    const angleInRadians = -(angleInDegrees) * Math.PI / 180.0

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    }
}

/**
 * The angle, in degrees in [0, 360), from the Ox axis to the segment from `origin` to `handle`, counterclockwise
 * on the screen (y goes down): the inverse of {@link polarToCartesian}.
 */
export function cartesianToAngle(origin: XY, handle: XY): number {
    const angle = Math.atan2(-(handle.y - origin.y), handle.x - origin.x) * 180.0 / Math.PI

    // "+ 0" turns -0 into 0.
    return (angle < 0 ? angle + 360 : angle) + 0
}
