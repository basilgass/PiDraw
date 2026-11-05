import {describe, expect, test} from 'vitest'
import {riemannRectangles, riemannSum} from '../../src/calculus'

const identity = (x: number) => x

describe('riemannRectangles', () => {
    test('cuts the domain in intervals of the same width', () => {
        const rectangles = riemannRectangles(identity, {min: 0, max: 4}, 4, 0)

        expect(rectangles.map(({x0, x1}) => [x0, x1])).toEqual([[0, 1], [1, 2], [2, 3], [3, 4]])
    })

    test.each([
        ['at the left end of each interval', 0, [0, 1, 2, 3]],
        ['at the middle', 0.5, [0.5, 1.5, 2.5, 3.5]],
        ['at the right end', 1, [1, 2, 3, 4]],
        ['a quarter of the way', 0.25, [0.25, 1.25, 2.25, 3.25]]
    ])('reads the function %s', (_, position, heights) => {
        expect(riemannRectangles(identity, {min: 0, max: 4}, 4, position).map(({y}) => y)).toEqual(heights)
    })

    test('a height under the axis is negative', () => {
        expect(riemannRectangles(x => -x, {min: 0, max: 2}, 2, 1).map(({y}) => y)).toEqual([-1, -2])
    })

    test('leaves out the intervals where the function is not defined', () => {
        const rectangles = riemannRectangles(Math.sqrt, {min: -2, max: 2}, 4, 0.5)

        expect(rectangles.map(({x0}) => x0)).toEqual([0, 1])
    })

    test('a function that is not defined anywhere gives no rectangle', () => {
        expect(riemannRectangles(() => NaN, {min: 0, max: 1}, 3, 0)).toEqual([])
    })
})

describe('riemannSum', () => {
    test('the middle sum of a line is its exact area', () => {
        expect(riemannSum(riemannRectangles(identity, {min: 0, max: 4}, 5, 0.5))).toBeCloseTo(8, 9)
    })

    test('the left and the right sums frame the area of an increasing function', () => {
        const left = riemannSum(riemannRectangles(identity, {min: 0, max: 4}, 5, 0))
        const right = riemannSum(riemannRectangles(identity, {min: 0, max: 4}, 5, 1))

        expect(left).toBeCloseTo(6.4, 9)
        expect(right).toBeCloseTo(9.6, 9)
    })

    test('what is under the axis counts for less', () => {
        expect(riemannSum(riemannRectangles(identity, {min: -2, max: 2}, 4, 0.5))).toBeCloseTo(0, 9)
    })

    test('no rectangle is a sum of 0', () => {
        expect(riemannSum([])).toBe(0)
    })
})
