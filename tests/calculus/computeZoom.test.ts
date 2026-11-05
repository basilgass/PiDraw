import {describe, expect, test} from 'vitest'
import {
    boundedFactor,
    moveLayout,
    toCoordinates,
    toPixels,
    visibleWindow,
    windowLayout,
    ZOOM_LIMITS,
    zoomLayout,
    zoomRatio
} from '../../src/calculus'
import {InvalidArgumentError} from '../../src/errors'
import type {IGraphConfig} from '../../src/pidraw.common'
import {graphConfig} from '../helpers/figure'

const config = (): IGraphConfig => graphConfig()

describe('zoomLayout', () => {
    test('makes the units longer by the factor, and keeps the size of the drawing', () => {
        const before = config()
        const after = zoomLayout(before, 2, {x: 400, y: 300})

        expect(after.axis.x.x).toBeCloseTo(before.axis.x.x * 2, 10)
        expect(after.axis.y.y).toBeCloseTo(before.axis.y.y * 2, 10)
        expect(after.width).toBe(before.width)
        expect(after.height).toBe(before.height)
    })

    test('keeps the point of the plane that is under the center where it is', () => {
        const before = config()
        const center = {x: 123, y: 456}
        const under = toCoordinates(center, before)

        const after = zoomLayout(before, 3.7, center)
        const now = toPixels(under, after)

        expect(now.x).toBeCloseTo(center.x, 8)
        expect(now.y).toBeCloseTo(center.y, 8)
    })

    test('a zoom and its inverse give the layout back', () => {
        const before = config()
        const center = {x: 50, y: 700}

        const back = zoomLayout(zoomLayout(before, 4, center), 1 / 4, center)

        expect(back.origin.x).toBeCloseTo(before.origin.x, 8)
        expect(back.origin.y).toBeCloseTo(before.origin.y, 8)
        expect(back.axis.x.x).toBeCloseTo(before.axis.x.x, 8)
        expect(back.axis.y.y).toBeCloseTo(before.axis.y.y, 8)
    })

    test('a factor of 1 changes nothing', () => {
        const before = config()

        expect(zoomLayout(before, 1, {x: 10, y: 20})).toEqual(before)
    })

    test('zooms oblique axes too, both by the same factor', () => {
        const before: IGraphConfig = {...config(), axis: {x: {x: 40, y: 10}, y: {x: 5, y: -45}}}

        const after = zoomLayout(before, 2, {x: 0, y: 0})

        expect(after.axis).toEqual({x: {x: 80, y: 20}, y: {x: 10, y: -90}})
    })

    test('does not change the layout it is given', () => {
        const before = config()
        const copy = structuredClone(before)

        zoomLayout(before, 2, {x: 1, y: 2})

        expect(before).toEqual(copy)
    })

    test.each([0, -1, NaN, Infinity])('a factor of %s is an InvalidArgumentError', (factor) => {
        expect(() => zoomLayout(config(), factor, {x: 0, y: 0})).toThrow(InvalidArgumentError)
    })

    test('a center that is not finite is an InvalidArgumentError', () => {
        expect(() => zoomLayout(config(), 2, {x: NaN, y: 0})).toThrow(InvalidArgumentError)
    })
})

describe('moveLayout', () => {
    test('slides the plane under the drawing: the origin moves, the units do not', () => {
        const before = config()

        const after = moveLayout(before, {x: 30, y: -20})

        expect(after.origin).toEqual({x: before.origin.x + 30, y: before.origin.y - 20})
        expect(after.axis).toEqual(before.axis)
    })

    test('a move and its opposite give the layout back', () => {
        const before = config()

        expect(moveLayout(moveLayout(before, {x: 7, y: 9}), {x: -7, y: -9})).toEqual(before)
    })

    test('a delta that is not finite is an InvalidArgumentError', () => {
        expect(() => moveLayout(config(), {x: 0, y: Infinity})).toThrow(InvalidArgumentError)
    })
})

describe('visibleWindow', () => {
    test('is the part of the plane under the drawing', () => {
        // 800 x 600 pixels, origin in the middle, 50 pixels per unit.
        const window = visibleWindow(config())

        expect(window.x.min).toBeCloseTo(-8, 8)
        expect(window.x.max).toBeCloseTo(8, 8)
        expect(window.y.min).toBeCloseTo(-6, 8)
        expect(window.y.max).toBeCloseTo(6, 8)
    })

    test('follows a zoom: twice as long units show half of the window', () => {
        const window = visibleWindow(zoomLayout(config(), 2, {x: 400, y: 300}))

        expect(window.x.max - window.x.min).toBeCloseTo(8, 8)
        expect(window.y.max - window.y.min).toBeCloseTo(6, 8)
    })

    test('follows a move', () => {
        const window = visibleWindow(moveLayout(config(), {x: 100, y: 0}))

        expect(window.x.min).toBeCloseTo(-10, 8)
        expect(window.x.max).toBeCloseTo(6, 8)
    })
})

describe('windowLayout', () => {
    test('shows exactly the window that is given', () => {
        const layout = windowLayout(config(), {x: {min: -2, max: 6}, y: {min: -1, max: 5}})
        const window = visibleWindow(layout)

        expect(window.x.min).toBeCloseTo(-2, 8)
        expect(window.x.max).toBeCloseTo(6, 8)
        expect(window.y.min).toBeCloseTo(-1, 8)
        expect(window.y.max).toBeCloseTo(5, 8)
        expect(layout.width).toBe(800)
        expect(layout.height).toBe(600)
    })

    test('each axis has its own unit when the window does not have the shape of the drawing', () => {
        const layout = windowLayout(config(), {x: {min: 0, max: 8}, y: {min: 0, max: 12}})

        expect(layout.axis.x.x).toBeCloseTo(100, 8)
        expect(layout.axis.y.y).toBeCloseTo(-50, 8)
    })

    test.each([
        ['a window with min above max', {x: {min: 3, max: 1}, y: {min: 0, max: 1}}],
        ['an empty window', {x: {min: 1, max: 1}, y: {min: 0, max: 1}}],
        ['a window that is not finite', {x: {min: 0, max: NaN}, y: {min: 0, max: 1}}]
    ])('%s is an InvalidArgumentError', (_, window) => {
        expect(() => windowLayout(config(), window)).toThrow(InvalidArgumentError)
    })

    test('axes that are not the usual ones are an InvalidArgumentError', () => {
        const oblique: IGraphConfig = {...config(), axis: {x: {x: 40, y: 10}, y: {x: 0, y: -50}}}
        const flipped: IGraphConfig = {...config(), axis: {x: {x: -50, y: 0}, y: {x: 0, y: -50}}}
        const window = {x: {min: 0, max: 1}, y: {min: 0, max: 1}}

        expect(() => windowLayout(oblique, window)).toThrow(InvalidArgumentError)
        expect(() => windowLayout(flipped, window)).toThrow(InvalidArgumentError)
    })
})

describe('zoomRatio and boundedFactor', () => {
    test('the ratio is 1 at the start, and the factor after a zoom', () => {
        const home = config()

        expect(zoomRatio(home, home)).toEqual({x: 1, y: 1})
        expect(zoomRatio(zoomLayout(home, 3, {x: 0, y: 0}), home).x).toBeCloseTo(3, 10)
    })

    test('a factor inside the limits is kept', () => {
        expect(boundedFactor(2, {x: 1, y: 1})).toBe(2)
        expect(boundedFactor(0.5, {x: 1, y: 1})).toBe(0.5)
    })

    test('a factor that goes past the limits is brought back to them', () => {
        expect(boundedFactor(1000, {x: 1, y: 1})).toBeCloseTo(ZOOM_LIMITS.max, 8)
        expect(boundedFactor(0.0001, {x: 1, y: 1})).toBeCloseTo(ZOOM_LIMITS.min, 8)
    })

    test('the limits are about the units as they are now: already zoomed in, there is less room', () => {
        expect(boundedFactor(100, {x: 50, y: 50})).toBeCloseTo(2, 8)
    })

    test('the limits hold for both axes', () => {
        const factor = boundedFactor(1000, {x: 1, y: 10})

        expect(1 * factor).toBeLessThanOrEqual(ZOOM_LIMITS.max + 1e-8)
        expect(10 * factor).toBeLessThanOrEqual(ZOOM_LIMITS.max + 1e-8)
    })

    test('axes so different that no factor suits both leave nothing to change', () => {
        expect(boundedFactor(2, {x: 1, y: 10000}, {min: 0.5, max: 2})).toBe(1)
    })

    test('a factor that is not valid is an InvalidArgumentError', () => {
        expect(() => boundedFactor(-2, {x: 1, y: 1})).toThrow(InvalidArgumentError)
    })
})
