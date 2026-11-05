import type {Domain} from "../pidraw.common"

// The rectangles of a Riemann sum, in the units of the coordinate system. Pure maths: the figure turns them into pixels.

/** A rectangle from the x axis to the height `y` (negative under the axis), between `x0` and `x1`. */
export interface RiemannRectangle {
    x0: number,
    x1: number,
    y: number
}

/**
 * The rectangles of the Riemann sum of a function.
 *
 * @param valueAt the function, in units. `NaN` where it is not defined.
 * @param domain what is cut in `rectangles` intervals of the same width.
 * @param position where the function is read in each interval: 0 at its left end, 0.5 at its middle, 1 at its right end.
 * @returns the rectangles from left to right, without the ones where the function is not defined (a function that is not defined
 * anywhere gives none).
 */
export function riemannRectangles(valueAt: (x: number) => number, domain: Domain, rectangles: number, position: number): RiemannRectangle[] {
    const width = (domain.max - domain.min) / rectangles

    return Array.from({length: rectangles}, (_, index) => {
        const x0 = domain.min + index * width

        return {x0, x1: x0 + width, y: valueAt(x0 + position * width)}
    }).filter(({y}) => Number.isFinite(y))
}

/** The sum of the areas of the rectangles, under the x axis they count for less. */
export function riemannSum(rectangles: RiemannRectangle[]): number {
    return rectangles.reduce((sum, {x0, x1, y}) => sum + y * (x1 - x0), 0)
}
