import {describe, expect, test} from 'vitest'
import {axisPlacement, checkGraphConfig, EDGE_MARGIN, layoutGeometry, PX_PER_CM, resolveGraphConfig} from '../../src/calculus'
import {InvalidArgumentError, NotImplementedError} from '../../src/errors'
import {CoordinateSystem, type IGraphConfig} from '../../src/pidraw.common'

describe('PX_PER_CM', () => {
    test('is a centimeter of TeX points, with a pixel of 0.75 point', () => {
        expect(PX_PER_CM * 0.75).toBeCloseTo(28.45274, 6)
        expect(PX_PER_CM).toBeCloseTo(37.937, 3)
    })
})

describe('layoutGeometry', () => {
    const k = PX_PER_CM

    test('is as big as the window, with a unit of 1 cm', () => {
        const g = layoutGeometry({x: {min: -8, max: 8}, y: {min: -8, max: 8}, unit: {x: 1, y: 1}})

        expect(g.width).toBeCloseTo(16 * k, 9)
        expect(g.height).toBeCloseTo(16 * k, 9)
    })

    test('has its origin where the window puts the coordinate 0', () => {
        const g = layoutGeometry({x: {min: -5, max: 10}, y: {min: -2, max: 9}, unit: {x: 1, y: 1}})

        expect(g.origin.x).toBeCloseTo(5 * k, 9)
        expect(g.origin.y).toBeCloseTo(9 * k, 9)
    })

    test('the origin is outside of the drawing when 0 is outside of the window', () => {
        const g = layoutGeometry({x: {min: 2, max: 10}, y: {min: -3, max: -1}, unit: {x: 1, y: 1}})

        expect(g.origin.x).toBeLessThan(0)
        expect(g.origin.y).toBeLessThan(0)
    })

    test('has a vector of a unit for each axis, the y axis pointing up on the screen', () => {
        const g = layoutGeometry({x: {min: 0, max: 4}, y: {min: 0, max: 3}, unit: {x: 2, y: 3}})

        expect(g.axis.x.x).toBeCloseTo(2 * k, 9)
        expect(g.axis.x.y).toBe(0)
        expect(g.axis.y.x).toBe(0)
        expect(g.axis.y.y).toBeCloseTo(-3 * k, 9)
    })

    test('a longer unit makes a bigger drawing for the same window', () => {
        const small = layoutGeometry({x: {min: -4, max: 4}, y: {min: -4, max: 4}, unit: {x: 1, y: 1}})
        const big = layoutGeometry({x: {min: -4, max: 4}, y: {min: -4, max: 4}, unit: {x: 2, y: 3}})

        expect(big.width / small.width).toBeCloseTo(2, 9)
        expect(big.height / small.height).toBeCloseTo(3, 9)
    })

    test('a window that changes does not change the size of a unit', () => {
        const a = layoutGeometry({x: {min: -4, max: 4}, y: {min: -4, max: 4}, unit: {x: 1, y: 1}})
        const b = layoutGeometry({x: {min: -10, max: 10}, y: {min: -4, max: 4}, unit: {x: 1, y: 1}})

        expect(b.axis.x.x).toBe(a.axis.x.x)
    })
})

describe('axisPlacement', () => {
    // A drawing of 800 x 600 pixels, 50 pixels per unit, the y axis pointing up on the screen.
    const axis = {x: {x: 50, y: 0}, y: {x: 0, y: -50}}
    const place = (x: number, y: number) => axisPlacement({x, y}, 800, 600, axis)

    test('the axes stay on their line when the origin is in the drawing', () => {
        const {x, y} = place(400, 300)

        expect(x).toEqual({A: {x: 400, y: 300}, displaced: false, side: 'right'})
        expect(y).toEqual({A: {x: 400, y: 300}, displaced: false, side: 'left'})
    })

    test('the numbers are under the x axis and left of the y axis when they stay', () => {
        const {x, y} = place(100, 500)

        expect(x.side).toBe('right')
        expect(y.side).toBe('left')
    })

    test.each([
        [0, 300],
        [800, 300],
        [400, 0],
        [400, 600]
    ])('an origin on a border (%d, %d) does not move the axes', (px, py) => {
        const {x, y} = place(px, py)

        expect(x.displaced).toBe(false)
        expect(y.displaced).toBe(false)
    })

    test('the y axis goes to the left border when the origin is at the left of the drawing, its numbers on its right', () => {
        const {x, y} = place(-100, 300)

        expect(y).toEqual({A: {x: EDGE_MARGIN, y: 300}, displaced: true, side: 'right'})
        expect(x.displaced).toBe(false)
    })

    test('the y axis goes to the right border when the origin is at the right of the drawing, its numbers on its left', () => {
        const {y} = place(900, 300)

        expect(y).toEqual({A: {x: 800 - EDGE_MARGIN, y: 300}, displaced: true, side: 'left'})
    })

    test('the x axis goes to the top border when the origin is above the drawing, its numbers under it', () => {
        const {x, y} = place(400, -100)

        expect(x).toEqual({A: {x: 400, y: EDGE_MARGIN}, displaced: true, side: 'right'})
        expect(y.displaced).toBe(false)
    })

    test('the x axis goes to the bottom border when the origin is under the drawing, its numbers above it', () => {
        const {x} = place(400, 700)

        expect(x).toEqual({A: {x: 400, y: 600 - EDGE_MARGIN}, displaced: true, side: 'left'})
    })

    test('both axes move when the origin is out of the drawing in both directions', () => {
        const {x, y} = place(-50, 800)

        expect(x.A).toEqual({x: -50, y: 598})
        expect(y.A).toEqual({x: 2, y: 800})
        expect([x.displaced, y.displaced]).toEqual([true, true])
    })

    test('the zero of a moved axis stays at the origin, along the axis', () => {
        // The x axis moved to the top keeps the abscissa of the origin; the y axis moved to the left keeps its ordinate.
        const {x, y} = place(-250, -80)

        expect(x.A.x).toBe(-250)
        expect(y.A.y).toBe(-80)
    })

    test('the numbers are on the inside whatever the way of the axes', () => {
        const mirrored = axisPlacement({x: 400, y: -100}, 800, 600, {x: {x: -50, y: 0}, y: {x: 0, y: 50}})

        // The x axis goes to the left: the right of its way is up, so the inside (down) is its left.
        expect(mirrored.x.side).toBe('left')
        expect(mirrored.x.displaced).toBe(true)
    })

    test('axes that are not orthogonal stay on their line', () => {
        const {x, y} = axisPlacement({x: -100, y: -100}, 800, 600, {x: {x: 50, y: 0}, y: {x: 25, y: -50}})

        expect(x).toEqual({A: {x: -100, y: -100}, displaced: false, side: 'right'})
        expect(y).toEqual({A: {x: -100, y: -100}, displaced: false, side: 'left'})
    })

    test('the position of the origin is not shared with the placement', () => {
        const origin = {x: 400, y: 300}
        const {x} = axisPlacement(origin, 800, 600, axis)

        x.A.x = 0

        expect(origin.x).toBe(400)
    })
})

describe('resolveGraphConfig', () => {
    test('is 800 x 600 with the origin in the middle and a unit of 1 cm by default', () => {
        const {config, display} = resolveGraphConfig()

        expect(config).toEqual({
            width: 800,
            height: 600,
            origin: {x: 400, y: 300},
            system: CoordinateSystem.CARTESIAN_2D,
            axis: {x: {x: PX_PER_CM, y: 0}, y: {x: 0, y: -PX_PER_CM}}
        })
        expect(display).toEqual({grid: true, axis: true})
    })

    test('puts the origin in the middle of the size it is given', () => {
        expect(resolveGraphConfig({width: 1000, height: 400}).config.origin).toEqual({x: 500, y: 200})
    })

    test('keeps only the keys of the configuration, and ignores the ones that are undefined', () => {
        const {config, display} = resolveGraphConfig({width: undefined, display: {axis: false, grid: undefined}, tex: (value) => value})

        expect(Object.keys(config).sort()).toEqual(['axis', 'height', 'origin', 'system', 'width'])
        expect(config.width).toBe(800)
        expect(display).toEqual({grid: true, axis: false})
    })

    test('refuses a size that is not a finite number greater than 0', () => {
        expect(() => resolveGraphConfig({width: 0})).toThrow(InvalidArgumentError)
        expect(() => resolveGraphConfig({height: Number.NaN})).toThrow(InvalidArgumentError)
    })
})

describe('checkGraphConfig', () => {
    const valid = (): IGraphConfig => resolveGraphConfig().config

    test('accepts a configuration whose origin is out of the drawing', () => {
        expect(() => { checkGraphConfig({...valid(), origin: {x: -50, y: 900}}) }).not.toThrow()
    })

    test.each([
        ['an origin that is not finite', {origin: {x: Infinity, y: 0}}],
        ['an axis without a direction', {axis: {x: {x: 0, y: 0}, y: {x: 0, y: -1}}}],
        ['an axis that is not finite', {axis: {x: {x: 1, y: 0}, y: {x: Number.NaN, y: -1}}}],
        ['a negative width', {width: -1}]
    ])('refuses %s', (_, change) => {
        expect(() => { checkGraphConfig({...valid(), ...change}) }).toThrow(InvalidArgumentError)
    })

    test('refuses a coordinate system it cannot draw', () => {
        expect(() => { checkGraphConfig({...valid(), system: CoordinateSystem.POLAR}) }).toThrow(NotImplementedError)
    })
})
