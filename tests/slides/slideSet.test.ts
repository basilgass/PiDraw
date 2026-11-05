import {describe, expect, test, vi} from 'vitest'
import {checkSlideSet, setSlide, slideIncludes, slideLast, slideOf} from '../../src/slides/slideSet'
import {Point} from '../../src/figures/Point/Point'
import {createContext} from '../helpers/figure'
import {InvalidArgumentError} from '../../src/errors'
import type {ISlideSet} from '../../src/slides/Slides.types'

describe('slideIncludes', () => {
    test('a run with both ends holds the steps from the first to the last', () => {
        const set: ISlideSet = [{from: 2, to: 4}]

        expect([1, 2, 3, 4, 5].map(step => slideIncludes(set, step))).toEqual([false, true, true, true, false])
    })

    test('a run without an end holds every step after its start', () => {
        const set: ISlideSet = [{from: 3}]

        expect([1, 2, 3, 4, 100].map(step => slideIncludes(set, step))).toEqual([false, false, true, true, true])
    })

    test('a run of one step holds that step only', () => {
        const set: ISlideSet = [{from: 5, to: 5}]

        expect([4, 5, 6].map(step => slideIncludes(set, step))).toEqual([false, true, false])
    })

    test('a set holds the steps of any of its runs', () => {
        const set: ISlideSet = [{from: 2, to: 3}, {from: 7, to: 7}, {from: 9}]

        expect([1, 2, 3, 4, 6, 7, 8, 9, 12].map(step => slideIncludes(set, step)))
            .toEqual([false, true, true, false, false, true, false, true, true])
    })

    test('a number that is not an integer is in no run with an end that is not its own', () => {
        expect(slideIncludes([{from: 2, to: 3}], 2.5)).toBe(true)
        expect(slideIncludes([{from: 2, to: 2}], 2.5)).toBe(false)
    })
})

describe('slideLast', () => {
    test('is the end of the last run', () => {
        expect(slideLast([{from: 2, to: 5}, {from: 7, to: 9}])).toBe(9)
    })

    test('is the start of a run that has no end', () => {
        expect(slideLast([{from: 2, to: 3}, {from: 6}])).toBe(6)
    })

    test('does not depend on the order of the runs', () => {
        expect(slideLast([{from: 8}, {from: 1, to: 2}])).toBe(8)
    })

    test('is 0 for a set without run', () => {
        expect(slideLast([])).toBe(0)
    })
})

describe('checkSlideSet', () => {
    test.each([
        [[{from: 1}]],
        [[{from: 2, to: 2}]],
        [[{from: 2, to: 5}, {from: 7}]]
    ])('accepts %j', (set) => {
        expect(() => { checkSlideSet(set, 'A') }).not.toThrow()
    })

    test.each([
        ['a set without run', []],
        ['a start below 1', [{from: 0}]],
        ['a start that is not an integer', [{from: 1.5}]],
        ['an end before the start', [{from: 4, to: 3}]],
        ['an end that is not an integer', [{from: 1, to: 2.5}]],
        ['a start that is not finite', [{from: NaN}]]
    ])('refuses %s, and names the figure', (_, set) => {
        expect(() => { checkSlideSet(set as ISlideSet, 'A') }).toThrow(InvalidArgumentError)
        expect(() => { checkSlideSet(set as ISlideSet, 'A') }).toThrow(/"A"/)
    })
})

describe('setSlide', () => {
    const figure = (changed = vi.fn()) => ({figure: new Point({...createContext(), figureChanged: changed}, 'A', {coordinates: {x: 0, y: 0}}), changed})

    test('a figure has no steps by default: it is shown at every step', () => {
        expect(slideOf(figure().figure)).toBeNull()
    })

    test('keeps the steps it is given, in a frozen copy', () => {
        const set = [{from: 2, to: 4}, {from: 6}]
        const {figure: A} = figure()

        setSlide(A, set)
        set[0].to = 99

        expect(slideOf(A)).toEqual([{from: 2, to: 4}, {from: 6}])
        expect(Object.isFrozen(slideOf(A))).toBe(true)
    })

    test('tells the graph, with its name, when the steps are set and when they are taken away', () => {
        const {figure: A, changed} = figure()

        setSlide(A, [{from: 2}])
        setSlide(A, null)

        expect(changed).toHaveBeenCalledTimes(2)
        expect(changed).toHaveBeenCalledWith('A')
        expect(slideOf(A)).toBeNull()
    })

    test.each([[[]], [[{from: 0}]], [[{from: 3, to: 2}]], [[{from: 1.5}]]])('refuses the steps %j, and keeps the ones it had', (set) => {
        const {figure: A, changed} = figure()
        setSlide(A, [{from: 2}])
        changed.mockClear()

        expect(() => { setSlide(A, set) }).toThrow(InvalidArgumentError)

        expect(slideOf(A)).toEqual([{from: 2}])
        expect(changed).not.toHaveBeenCalled()
    })
})
