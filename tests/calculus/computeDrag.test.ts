import {describe, expect, test} from 'vitest'
import {constrainDrag, snapCandidates} from '../../src/calculus'
import {graphConfig} from '../helpers/figure'

// 800 x 600 pixels, the origin in the middle (400, 300), 50 pixels per unit, y pointing up.
const config = graphConfig()

describe('constrainDrag', () => {
    test('leaves a position alone without a rule', () => {
        expect(constrainDrag({x: 123, y: 456}, {}, config)).toEqual({x: 123, y: 456})
    })

    test('keeps the height of the point to move along the x axis', () => {
        expect(constrainDrag({x: 500, y: 100}, {along: {axis: 'x', keep: {x: 10, y: 250}}}, config)).toEqual({x: 500, y: 250})
    })

    test('keeps the abscissa of the point to move along the y axis', () => {
        expect(constrainDrag({x: 500, y: 100}, {along: {axis: 'y', keep: {x: 10, y: 250}}}, config)).toEqual({x: 10, y: 100})
    })

    test('puts the point on the nearest line of the grid', () => {
        const near = constrainDrag({x: 432, y: 281}, {step: {x: 1, y: 1}}, config)

        expect(near.x).toBeCloseTo(450, 9)
        expect(near.y).toBeCloseTo(300, 9)
    })

    test('counts the lines of the grid from the origin, not from the border of the drawing', () => {
        // The lines are at 410, 460, 510...: 463 is the closest to 460, where rounding the pixels would have given 450.
        const moved = graphConfig({origin: {x: 410, y: 300}})

        expect(constrainDrag({x: 463, y: 300}, {step: {x: 1, y: 1}}, moved).x).toBeCloseTo(460, 9)
    })

    test('uses the step of each axis, in units', () => {
        const snapped = constrainDrag({x: 440, y: 270}, {step: {x: 2, y: 0.5}}, config)

        // 0.8 unit is closer to 0 than to 2; 0.6 unit is closer to 0.5 than to 1.
        expect(snapped.x).toBeCloseTo(400, 9)
        expect(snapped.y).toBeCloseTo(275, 9)
    })

    test('follows axes that are not orthogonal', () => {
        const oblique = graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}})
        const at = (x: number, y: number) => ({x: 400 + 50 * x + 25 * y, y: 300 - 50 * y})
        const snapped = constrainDrag(at(1.3, 2.2), {step: {x: 1, y: 1}}, oblique)

        expect(snapped.x).toBeCloseTo(at(1, 2).x, 9)
        expect(snapped.y).toBeCloseTo(at(1, 2).y, 9)
    })

    test('keeps the point in the bounds of the x axis, given in units', () => {
        const bounds = {x: {min: -1, max: 1}}

        expect(constrainDrag({x: 600, y: 10}, {bounds}, config)).toEqual({x: 450, y: 10})
        expect(constrainDrag({x: 100, y: 10}, {bounds}, config)).toEqual({x: 350, y: 10})
        expect(constrainDrag({x: 420, y: 10}, {bounds}, config)).toEqual({x: 420, y: 10})
    })

    test('keeps the point in the bounds of the y axis, which points up', () => {
        const bounds = {y: {min: -1, max: 2}}

        expect(constrainDrag({x: 10, y: 0}, {bounds}, config)).toEqual({x: 10, y: 200})
        expect(constrainDrag({x: 10, y: 590}, {bounds}, config)).toEqual({x: 10, y: 350})
    })

    test('puts the point on the grid before it limits it to the bounds, which no rule goes beyond', () => {
        const rules = {step: {x: 1, y: 1}, bounds: {x: {min: 0, max: 1.2}}}

        // 1.6 unit is the line 2 of the grid, and 2 is out of the bounds: the point stops at 1.2.
        expect(constrainDrag({x: 480, y: 300}, rules, config).x).toBeCloseTo(460, 9)
        expect(constrainDrag({x: 455, y: 300}, rules, config).x).toBeCloseTo(450, 9)
    })

    test('keeps the height before it puts the point on the grid', () => {
        const rules = {along: {axis: 'x' as const, keep: {x: 0, y: 281}}, step: {x: 1, y: 1}}

        expect(constrainDrag({x: 500, y: 100}, rules, config).y).toBeCloseTo(300, 9)
    })
})

describe('snapCandidates', () => {
    const position = {x: 100, y: 100}

    test('keeps the candidates within the radius, the closest first', () => {
        const near = snapCandidates(position, [{x: 110, y: 100}, {x: 103, y: 100}, {x: 200, y: 100}], 12)

        expect(near).toEqual([{x: 103, y: 100}, {x: 110, y: 100}])
    })

    test('keeps a candidate that is exactly at the radius', () => {
        expect(snapCandidates(position, [{x: 112, y: 100}], 12)).toEqual([{x: 112, y: 100}])
    })

    test('gives none when every candidate is too far', () => {
        expect(snapCandidates(position, [{x: 130, y: 100}], 12)).toEqual([])
    })

    test('leaves out a position that does not exist', () => {
        expect(snapCandidates(position, [{x: NaN, y: NaN}, {x: 101, y: 100}], 12)).toEqual([{x: 101, y: 100}])
    })
})
