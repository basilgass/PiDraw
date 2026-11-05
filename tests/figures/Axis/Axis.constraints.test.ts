import {describe, expect, test} from 'vitest'
import {axesDisplay, axisConfigOf} from '../../../src/figures/Axis/Axis.constraints'

describe('axesDisplay', () => {
    test('shows both axes, each with nothing more than its line, for true', () => {
        expect(axesDisplay(true)).toEqual({x: {}, y: {}})
    })

    test.each([[false], [undefined]])('shows no axis for %s', (axis) => {
        expect(axesDisplay(axis)).toEqual({x: false, y: false})
    })

    test('keeps what each axis shows', () => {
        expect(axesDisplay({x: {step: 2}, y: false})).toEqual({x: {step: 2}, y: false})
    })
})

describe('axisConfigOf', () => {
    const director = {A: {x: 400, y: 300}, d: {x: 38, y: 0}}

    test('is the line through the point with the vector of the unit, on a side', () => {
        expect(axisConfigOf(director, 'left', {})).toEqual({director, side: 'left'})
    })

    test('leaves an axis that is not drawn whole, without a margin', () => {
        expect(axisConfigOf(director, 'right', false)).toEqual({director, side: 'right', padding: 0})
    })

    test('gives the padding and the name of the display', () => {
        expect(axisConfigOf(director, 'right', {padding: 5, name: 't'})).toEqual({director, side: 'right', padding: 5, name: 't'})
    })

    test('graduates the axis from a step, leaving the zero to the other axis', () => {
        expect(axisConfigOf(director, 'right', {step: 2})).toEqual({
            director,
            side: 'right',
            ticks: {step: 2, labels: 'numbers', zero: false}
        })
    })

    test('gives the labels and the selections of ticks of the display', () => {
        const config = axisConfigOf(director, 'right', {step: 1, labels: 'pi', marks: {every: 5}, numbers: 'none'})

        expect(config.ticks).toEqual({step: 1, labels: 'pi', zero: false, marks: {every: 5}, numbers: 'none'})
    })

    test('has no graduation without a step', () => {
        expect(axisConfigOf(director, 'right', {labels: 'pi', marks: {every: 5}}).ticks).toBeUndefined()
    })
})
