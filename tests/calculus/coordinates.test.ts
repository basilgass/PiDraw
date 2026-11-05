import {describe, expect, test} from 'vitest'
import {toCoordinates, toPixels} from '../../src/calculus/coordinates'
import type {IGraphConfig} from '../../src/pidraw.common'
import {InvalidArgumentError, MathError} from '../../src/errors'

const config = (axis: IGraphConfig['axis']): IGraphConfig => ({
    axis,
    origin: {x: 100, y: 200},
    width: 400,
    height: 300,
    system: 'orthonormal'
} as unknown as IGraphConfig)

// The y axis points up on the screen: its pixel direction is negative.
const orthogonal = config({x: {x: 10, y: 0}, y: {x: 0, y: -20}})
const oblique = config({x: {x: 10, y: 2}, y: {x: 3, y: -10}})

describe('toPixels', () => {
    test('a number is a length along the axis, the origin plays no role', () => {
        expect(toPixels(2, orthogonal)).toBe(20)
        expect(toPixels(2, orthogonal, 'x')).toBe(20)
        expect(toPixels(2, orthogonal, 'y')).toBe(-40)
    })

    test('a point uses the origin and the two axes', () => {
        expect(toPixels({x: 0, y: 0}, orthogonal)).toEqual({x: 100, y: 200})
        expect(toPixels({x: 3, y: 2}, orthogonal)).toEqual({x: 130, y: 160})
        expect(toPixels({x: 1, y: 2}, oblique)).toEqual({x: 100 + 10 + 6, y: 200 + 2 - 20})
    })

    test('a domain is converted along the axis and sorted', () => {
        expect(toPixels({min: 1, max: 3}, orthogonal)).toEqual({min: 110, max: 130})
        expect(toPixels({min: 1, max: 3}, orthogonal, 'y')).toEqual({min: 140, max: 180})
        expect(toPixels({min: -3, max: -1}, orthogonal, 'y')).toEqual({min: 220, max: 260})
    })

    test('the axis property of the domain is ignored in favor of the parameter', () => {
        expect(toPixels({min: 1, max: 3, axis: 'y'}, orthogonal)).toEqual({min: 110, max: 130})
    })

    test('anything else is an InvalidArgumentError', () => {
        expect(() => toPixels('3' as unknown as number, orthogonal)).toThrow(InvalidArgumentError)
        expect(() => toPixels(undefined as unknown as number, orthogonal)).toThrow(InvalidArgumentError)
        expect(() => toPixels({a: 1} as unknown as number, orthogonal)).toThrow(InvalidArgumentError)
    })
})

describe('toCoordinates', () => {
    test('a number is a length along the axis', () => {
        expect(toCoordinates(20, orthogonal)).toBe(2)
        expect(toCoordinates(-40, orthogonal, 'y')).toBe(2)
    })

    test('a point', () => {
        expect(toCoordinates({x: 130, y: 160}, orthogonal)).toEqual({x: 3, y: 2})
    })

    test('a domain subtracts the origin', () => {
        expect(toCoordinates({min: 110, max: 130}, orthogonal)).toEqual({min: 1, max: 3})
        expect(toCoordinates({min: 140, max: 180}, orthogonal, 'y')).toEqual({min: 1, max: 3})
    })

    test('anything else is an InvalidArgumentError', () => {
        expect(() => toCoordinates('3' as unknown as number, orthogonal)).toThrow(InvalidArgumentError)
    })

    test('a point cannot be converted if the axes are collinear', () => {
        const collinear = config({x: {x: 10, y: 10}, y: {x: 20, y: 20}})

        expect(() => toCoordinates({x: 1, y: 1}, collinear)).toThrow(MathError)
        // The other direction needs no inverse.
        expect(toPixels({x: 1, y: 1}, collinear)).toEqual({x: 130, y: 230})
    })
})

describe('toPixels and toCoordinates are the inverse of each other', () => {
    const configs: [string, IGraphConfig][] = [
        ['orthogonal axes', orthogonal],
        ['oblique axes', oblique],
        ['x axis pointing left', config({x: {x: -10, y: 0}, y: {x: 0, y: -20}})],
        ['axes swapped', config({x: {x: 0, y: -10}, y: {x: 20, y: 0}})],
    ]

    test.each(configs)('a point, with %s', (_, c) => {
        for (const p of [{x: 0, y: 0}, {x: 1, y: 2}, {x: -3.5, y: 4.25}, {x: 100, y: -100}]) {
            const back = toCoordinates(toPixels(p, c), c)

            expect(back.x).toBeCloseTo(p.x, 9)
            expect(back.y).toBeCloseTo(p.y, 9)
        }
    })

    // A length and a domain assume the axes are aligned with the screen: the swapped axes are only for the points.
    const aligned = configs.filter(([name]) => name !== 'axes swapped')

    test.each(aligned)('a domain, with %s', (_, c) => {
        for (const axis of ['x', 'y'] as const) {
            const back = toCoordinates(toPixels({min: -2, max: 5}, c, axis), c, axis)

            expect(back.min).toBeCloseTo(-2, 9)
            expect(back.max).toBeCloseTo(5, 9)
        }
    })

    test.each(aligned)('a length, with %s', (_, c) => {
        for (const axis of ['x', 'y'] as const) {
            expect(toCoordinates(toPixels(7, c, axis), c, axis)).toBeCloseTo(7, 9)
        }
    })
})
