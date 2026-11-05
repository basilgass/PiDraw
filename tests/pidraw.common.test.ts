import {describe, expect, test} from 'vitest'
import {Axes, CoordinateSystem, isDomain, isXY, LayerName} from '../src/pidraw.common'

describe('isXY', () => {
    test('accepts an object with an x and a y', () => {
        expect(isXY({x: 1, y: 2})).toBe(true)
        expect(isXY({x: 0, y: 0})).toBe(true)
    })

    test('does not check the values: NaN passes', () => {
        expect(isXY({x: NaN, y: 0})).toBe(true)
    })

    test('refuses a missing or undefined coordinate', () => {
        expect(isXY({x: 1})).toBe(false)
        expect(isXY({x: 1, y: undefined})).toBe(false)
    })

    test('refuses what is not an object', () => {
        expect(isXY(null)).toBe(false)
        expect(isXY(undefined)).toBe(false)
        expect(isXY('xy')).toBe(false)
        expect(isXY(3)).toBe(false)
    })

    test('accepts an instance with getters', () => {
        class Position {
            private readonly _values = {x: 1, y: 2}

            get x() { return this._values.x }

            get y() { return this._values.y }
        }

        expect(isXY(new Position())).toBe(true)
    })
})

describe('isDomain', () => {
    test('accepts an object with a min and a max, with or without axis', () => {
        expect(isDomain({min: -1, max: 1})).toBe(true)
        expect(isDomain({min: -1, max: 1, axis: 'x'})).toBe(true)
    })

    test('refuses a missing or undefined bound', () => {
        expect(isDomain({min: 0})).toBe(false)
        expect(isDomain({min: 0, max: undefined})).toBe(false)
    })

    test('refuses what is not an object', () => {
        expect(isDomain(null)).toBe(false)
        expect(isDomain(undefined)).toBe(false)
        expect(isDomain([1, 2])).toBe(false)
    })
})

describe('enumerations of the public API', () => {
    test('the axes are named Ox and Oy', () => {
        expect(Axes.X).toBe('Ox')
        expect(Axes.Y).toBe('Oy')
        expect(Object.values(Axes)).toEqual(['Ox', 'Oy'])
    })

    test('the layers are listed from the back to the front, the interactive one last', () => {
        const layers = Object.values(LayerName)

        expect(layers[0]).toBe('background')
        expect(layers[layers.length - 1]).toBe('interactive')
        expect(layers.indexOf(LayerName.GRIDS)).toBeLessThan(layers.indexOf(LayerName.AXIS))
        expect(layers.indexOf(LayerName.MAIN)).toBeLessThan(layers.indexOf(LayerName.POINTS))
    })

    test('the coordinate systems', () => {
        expect(CoordinateSystem.CARTESIAN_2D).toBe('cartesian_2d')
        expect(CoordinateSystem.POLAR).toBe('polar')
    })
})
