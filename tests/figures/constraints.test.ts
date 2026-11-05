import {describe, expect, test} from 'vitest'
import {InvalidArgumentError} from '../../src/errors'
import {constraintIn, positionList, positions, radiusOf, resolveIn} from '../../src/figures/constraints'
import {graphConfig} from '../helpers/figure'

const RESOLVERS = {
    double: (value: number, factor: number) => value * factor,
    name: (value: string) => value.length
}

describe('constraintIn', () => {
    test('is the only constraint that the config holds', () => {
        expect(constraintIn(RESOLVERS, {double: 2}, 'f', 'thing')).toBe('double')
        expect(constraintIn(RESOLVERS, {name: 'abc', other: 1} as object, 'f', 'thing')).toBe('name')
    })

    test('without a constraint, or with several, is an InvalidArgumentError that names the figure', () => {
        expect(() => constraintIn(RESOLVERS, {}, 'f', 'thing')).toThrow(InvalidArgumentError)
        expect(() => constraintIn(RESOLVERS, {double: 1, name: 'a'}, 'f', 'thing')).toThrow(/thing "f"/)
    })
})

describe('resolveIn', () => {
    test('calls the resolver of the key with the value of the config and the extra argument', () => {
        expect(resolveIn(RESOLVERS, 'double', {double: 4}, 3)).toBe(12)
        expect(resolveIn(RESOLVERS, 'name', {name: 'abcd'}, 0)).toBe(4)
    })
})

describe('positions', () => {
    test('are returned when every value is {x, y}', () => {
        const A = {x: 1, y: 2}

        expect(positions({A}, 'point').A).toBe(A)
    })

    test.each([{x: 1}, {x: '1', y: 2}, null, 3])('%j is not a position', (value) => {
        expect(() => positions({A: value}, 'point')).toThrow(InvalidArgumentError)
        expect(() => positions({A: value}, 'point')).toThrow(/point.*"A"/)
    })
})

describe('positionList', () => {
    test('is the positions of a list', () => {
        expect(positionList([{x: 1, y: 2}, {x: 3, y: 4}], 'vertex')).toEqual([{x: 1, y: 2}, {x: 3, y: 4}])
    })

    test('names the index of the value that is not a position', () => {
        expect(() => positionList([{x: 1, y: 2}, 5], 'vertex')).toThrow(/vertex.*"1"/)
    })
})

describe('radiusOf', () => {
    const graph = graphConfig()

    test('a number is in units: 50 pixels each', () => {
        expect(radiusOf(2, {x: 0, y: 0}, graph)).toBe(100)
    })

    test('two points are the distance between them', () => {
        expect(radiusOf({point1: {x: 0, y: 0}, point2: {x: 30, y: 40}}, {x: 5, y: 5}, graph)).toBe(50)
    })

    test('a point is the distance from the center', () => {
        expect(radiusOf({x: 3, y: 4}, {x: 0, y: 0}, graph)).toBe(5)
    })

    test.each([0, -1, Infinity, NaN])('the number %s is an InvalidArgumentError', (radius) => {
        expect(() => radiusOf(radius, {x: 0, y: 0}, graph)).toThrow(InvalidArgumentError)
    })
})
