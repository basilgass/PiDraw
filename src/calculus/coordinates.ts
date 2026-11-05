import {type Domain, type IGraphConfig, isDomain, isXY, type XY} from "../pidraw.common"
import {InvalidArgumentError, MathError} from "../errors"

/**
 * Convert a length (number), a domain or a point from the coordinate system to the pixels.
 *
 * - number: a length, along the axis `axis` (default `'x'`). The origin plays no role. A length and a domain use the
 *   `x` component of `axis.x` and the `y` component of `axis.y`: they assume the axes are aligned with the screen.
 * - domain: the bounds are converted along `axis` (default `'x'`) and sorted, so `min <= max` even if the axis
 *   points toward the negative pixels. The `axis` property of the domain itself is ignored.
 * - point: the origin and the two axes vectors of the configuration are applied, so the axes can be oblique.
 *
 * @throws InvalidArgumentError if `value` is none of the above.
 */
export function toPixels(value: number, config: IGraphConfig, axis?: 'x' | 'y'): number
export function toPixels(value: Domain, config: IGraphConfig, axis?: 'x' | 'y'): Domain
export function toPixels(value: XY, config: IGraphConfig): XY
export function toPixels(value: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY
export function toPixels(value: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY {
    if (typeof value === 'number') {
        return value * (axis === 'y' ? config.axis.y.y : config.axis.x.x)
    }

    if (isDomain(value)) {
        const origin = axis === 'y' ? config.origin.y : config.origin.x
        const scale = axis === 'y' ? config.axis.y.y : config.axis.x.x
        const a = origin + value.min * scale
        const b = origin + value.max * scale

        return {min: Math.min(a, b), max: Math.max(a, b)}
    }

    if (isXY(value)) {
        return {
            x: config.origin.x + value.x * config.axis.x.x + value.y * config.axis.y.x,
            y: config.origin.y + value.x * config.axis.x.y + value.y * config.axis.y.y
        }
    }

    throw new InvalidArgumentError(`Cannot convert ${JSON.stringify(value)} to pixels`)
}

/**
 * Convert a length (number), a domain or a point from the pixels to the coordinate system: the inverse of
 * {@link toPixels}.
 *
 * @throws InvalidArgumentError if `pixels` is none of the above.
 * @throws MathError if a point is converted while the two axes of the configuration are collinear.
 */
export function toCoordinates(pixels: number, config: IGraphConfig, axis?: 'x' | 'y'): number
export function toCoordinates(pixels: Domain, config: IGraphConfig, axis?: 'x' | 'y'): Domain
export function toCoordinates(pixels: XY, config: IGraphConfig): XY
export function toCoordinates(pixels: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY
export function toCoordinates(pixels: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY {
    if (typeof pixels === 'number') {
        return pixels / (axis === 'y' ? config.axis.y.y : config.axis.x.x)
    }

    if (isDomain(pixels)) {
        const origin = axis === 'y' ? config.origin.y : config.origin.x
        const scale = axis === 'y' ? config.axis.y.y : config.axis.x.x
        const a = (pixels.min - origin) / scale
        const b = (pixels.max - origin) / scale

        return {min: Math.min(a, b), max: Math.max(a, b)}
    }

    if (isXY(pixels)) {
        // Invert the matrix [[axis.x.x, axis.y.x], [axis.x.y, axis.y.y]] applied by toPixels.
        const {x: ax, y: ay} = config.axis.x
        const {x: bx, y: by} = config.axis.y
        const det = ax * by - bx * ay

        if (det === 0) {
            throw new MathError('The axes of the coordinate system are collinear: a point cannot be converted to coordinates')
        }

        const dx = pixels.x - config.origin.x
        const dy = pixels.y - config.origin.y

        return {x: (dx * by - dy * bx) / det, y: (dy * ax - dx * ay) / det}
    }

    throw new InvalidArgumentError(`Cannot convert ${JSON.stringify(pixels)} to coordinates`)
}
