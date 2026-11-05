import {beforeAll, describe, expect, test, vi} from 'vitest'
import {InvalidArgumentError} from '../../src/errors'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import {Slides} from '../../src/slides/Slides'
import {setSlide} from '../../src/slides/slideSet'
import type {ISlidesState} from '../../src/slides/Slides.types'
import {createGraph, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const shown = (figure: AbstractFigure) => figure.element.attr('visibility') !== 'hidden'

/** A graph with a point at every step, a point from the second step on, one at the third step only and one at the second and the fourth. */
function setup() {
    const {graph} = createGraph()
    const always = graph.create.point({x: 0, y: 0}, 'always')
    const fromSecond = graph.create.point({x: 1, y: 0}, 'fromSecond')
    const thirdOnly = graph.create.point({x: 2, y: 0}, 'thirdOnly')
    const gaps = graph.create.point({x: 3, y: 0}, 'gaps')
    setSlide(fromSecond, [{from: 2}])
    setSlide(thirdOnly, [{from: 3, to: 3}])
    setSlide(gaps, [{from: 2, to: 2}, {from: 4, to: 4}])

    const slides = new Slides(graph)
    const states: ISlidesState[] = []
    slides.on('change', (event) => { states.push(event.detail) })

    return {graph, slides, states, always, fromSecond, thirdOnly, gaps}
}

const visible = (figures: AbstractFigure[]) => figures.map(shown)

describe('Slides made with a graph', () => {
    test('attaches itself to the graph: a graph has one presentation', () => {
        const {graph} = setup()

        expect(() => new Slides(graph)).toThrow(InvalidArgumentError)
    })

    test.each([0, -1, 1.5, NaN])('a count of %s is an InvalidArgumentError', (count) => {
        const {graph} = createGraph()

        expect(() => new Slides(graph, {count})).toThrow(InvalidArgumentError)
    })

    test('a graph without steps has one step, which is shown', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')

        const slides = new Slides(graph)

        expect(slides.state).toEqual({current: 1, count: 1, title: null})
        expect(shown(A)).toBe(true)
    })

    test('the steps are the largest one that a figure names', () => {
        const {slides} = setup()

        expect(slides.count).toBe(4)
        expect(slides.current).toBe(1)
    })

    test('the least count lengthens the presentation, and never shortens it', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        setSlide(A, [{from: 3}])

        expect(new Slides(graph, {count: 6}).count).toBe(6)

        const other = createGraph().graph
        const B = other.create.point({x: 1, y: 1}, 'B')
        setSlide(B, [{from: 5}])

        expect(new Slides(other, {count: 2}).count).toBe(5)
    })

    test('starts at the first step: a figure is shown at the steps it has', () => {
        const {always, fromSecond, thirdOnly, gaps} = setup()

        expect(visible([always, fromSecond, thirdOnly, gaps])).toEqual([true, false, false, false])
    })
})

describe('Slides steps', () => {
    test('next shows the figures of the next step', () => {
        const {slides, always, fromSecond, thirdOnly, gaps} = setup()
        const all = [always, fromSecond, thirdOnly, gaps]

        slides.next()
        expect(visible(all)).toEqual([true, true, false, true])

        slides.next()
        expect(visible(all)).toEqual([true, true, true, false])

        slides.next()
        expect(visible(all)).toEqual([true, true, false, true])
    })

    test('previous goes back', () => {
        const {slides, fromSecond} = setup()
        slides.last()

        slides.previous()
        slides.previous()
        slides.previous()

        expect(slides.current).toBe(1)
        expect(shown(fromSecond)).toBe(false)
    })

    test('first and last go to the ends', () => {
        const {slides} = setup()

        slides.last()
        expect(slides.current).toBe(4)

        slides.first()
        expect(slides.current).toBe(1)
    })

    test('goto shows a step', () => {
        const {slides, thirdOnly} = setup()

        slides.goto(3)

        expect(slides.current).toBe(3)
        expect(shown(thirdOnly)).toBe(true)
    })

    test.each([0, 5, -1, 2.5, NaN])('goto %s is an InvalidArgumentError, and nothing changes', (step) => {
        const {slides, states} = setup()

        expect(() => { slides.goto(step) }).toThrow(InvalidArgumentError)

        expect(slides.current).toBe(1)
        expect(states).toEqual([])
    })

    test('next at the last step and previous at the first one do nothing, and say nothing', () => {
        const {slides, states} = setup()

        slides.previous()
        slides.last()
        states.length = 0
        slides.next()

        expect(slides.current).toBe(4)
        expect(states).toEqual([])
    })

    test('a figure that has no steps is at every step', () => {
        const {slides, always} = setup()

        for (let step = 1; step <= 4; step++) {
            slides.goto(step)
            expect(shown(always)).toBe(true)
        }
    })

    test('the label goes with its figure', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        A.addLabel('A')
        setSlide(A, [{from: 2}])
        new Slides(graph)

        expect(shown(A)).toBe(false)
    })
})

describe('Slides events', () => {
    test('change gives the step and the number of steps, at each new step', () => {
        const {slides, states} = setup()

        slides.next()
        slides.goto(4)

        expect(states).toEqual([{current: 2, count: 4, title: null}, {current: 4, count: 4, title: null}])
    })

    test('a step that is already shown says nothing', () => {
        const {slides, states} = setup()

        slides.goto(1)
        slides.first()

        expect(states).toEqual([])
    })

    test('a handler that was removed is not called', () => {
        const {slides} = setup()
        const handler = vi.fn()
        slides.on('change', handler)
        slides.off('change', handler)

        slides.next()

        expect(handler).not.toHaveBeenCalled()
    })
})

describe('Slides and the figures that change', () => {
    test('a figure that gets its steps after the presentation was made is shown or hidden at once', () => {
        const {graph} = createGraph()
        const slides = new Slides(graph)
        const A = graph.create.point({x: 1, y: 1}, 'A')

        setSlide(A, [{from: 2}])

        expect(shown(A)).toBe(false)
        expect(slides.count).toBe(2)
    })

    test('a figure that appears at the step that is shown is shown', () => {
        const {graph} = createGraph()
        const slides = new Slides(graph, {count: 3})
        slides.goto(3)
        const A = graph.create.point({x: 1, y: 1}, 'A')

        setSlide(A, [{from: 3}])

        expect(shown(A)).toBe(true)
    })

    test('a figure that has a new number of steps says it', () => {
        const {graph} = createGraph()
        const slides = new Slides(graph)
        const states: ISlidesState[] = []
        slides.on('change', (event) => { states.push(event.detail) })
        const A = graph.create.point({x: 1, y: 1}, 'A')

        setSlide(A, [{from: 4}])
        setSlide(A, [{from: 2}])

        expect(states).toEqual([{current: 1, count: 4, title: null}, {current: 1, count: 2, title: null}])
    })

    test('steps that are taken away show the figure again', () => {
        const {graph} = createGraph()
        const slides = new Slides(graph)
        const A = graph.create.point({x: 1, y: 1}, 'A')
        setSlide(A, [{from: 2}])

        setSlide(A, null)

        expect(shown(A)).toBe(true)
        expect(slides.count).toBe(1)
    })

    test('a figure whose steps do not change the count says nothing', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        setSlide(A, [{from: 3}])
        const slides = new Slides(graph)
        const handler = vi.fn()
        slides.on('change', handler)
        const B = graph.create.point({x: 2, y: 2}, 'B')

        setSlide(B, [{from: 2, to: 3}])

        expect(handler).not.toHaveBeenCalled()
    })

    test('a figure that is removed takes its steps away: the steps are counted again, the shown step stays inside them', () => {
        const {graph, slides, states} = setup()
        slides.last()
        states.length = 0

        graph.remove('thirdOnly')
        expect(slides.count).toBe(4)

        graph.remove('gaps')
        graph.remove('fromSecond')

        expect(slides.count).toBe(1)
        expect(slides.current).toBe(1)
        expect(states.at(-1)).toEqual({current: 1, count: 1, title: null})
    })

    test('a figure that is removed and that held the steps does not change the others', () => {
        const {graph, slides, always} = setup()

        graph.remove('fromSecond')

        expect(slides.current).toBe(1)
        expect(shown(always)).toBe(true)
    })

    test('a figure that is not in the graph is ignored', () => {
        const {slides, states} = setup()

        expect(() => { slides.onFigureChanged('nothing') }).not.toThrow()
        expect(states).toEqual([])
    })
})

describe('Slides and the other reasons to hide a figure', () => {
    test('a figure hidden by hide() stays hidden at every step', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        A.hide()
        const slides = new Slides(graph, {count: 2})

        slides.next()
        slides.first()

        expect(A.element.css('display')).toBe('none')
    })

    test('without a Slides the steps mean nothing: every figure is shown', () => {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')

        setSlide(A, [{from: 2, to: 2}])

        expect(shown(A)).toBe(true)
    })

    test('dispose shows every figure again, and the presentation no longer follows the graph', () => {
        const {slides, fromSecond, thirdOnly} = setup()

        slides.dispose()
        expect(visible([fromSecond, thirdOnly])).toEqual([true, true])

        setSlide(thirdOnly, [{from: 7}])
        expect(shown(thirdOnly)).toBe(true)
    })

    test('the TikZ of the graph writes what is shown at the step', () => {
        const {graph, slides} = setup()
        const first = graph.tikz()

        slides.goto(3)
        const third = graph.tikz()

        expect(third).not.toBe(first)
        expect(third.split('\n').length).toBeGreaterThan(first.split('\n').length - 1)
    })
})

describe('Slides titles', () => {
    /** A graph with three steps and the titles of the second and the third. */
    function titled() {
        const {graph} = createGraph()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        setSlide(A, [{from: 3}])
        graph.setControl('titles', {2: 'Second', 3: 'Third'})

        const slides = new Slides(graph)
        const states: ISlidesState[] = []
        slides.on('change', (event) => { states.push(event.detail) })

        return {graph, slides, states}
    }

    test('a presentation without titles has none', () => {
        const {graph} = createGraph()
        const slides = new Slides(graph)

        expect([slides.title, slides.titleOf(1), slides.titles]).toEqual([null, null, {}])
    })

    test('reads the titles the graph already has when it is made', () => {
        const {slides} = titled()

        expect(slides.titles).toEqual({2: 'Second', 3: 'Third'})
        expect(slides.titleOf(2)).toBe('Second')
        expect(slides.titleOf(1)).toBeNull()
    })

    test('title is the one of the step that is shown, and the state carries it', () => {
        const {slides} = titled()

        expect(slides.title).toBeNull()

        slides.goto(2)

        expect(slides.title).toBe('Second')
        expect(slides.state).toEqual({current: 2, count: 3, title: 'Second'})
    })

    test('change gives the title of the new step', () => {
        const {slides, states} = titled()

        slides.next()
        slides.next()

        expect(states).toEqual([{current: 2, count: 3, title: 'Second'}, {current: 3, count: 3, title: 'Third'}])
    })

    test('the titles are given as a copy', () => {
        const {slides} = titled()

        const copy = slides.titles as Record<number, string>
        copy[2] = 'changed'

        expect(slides.titleOf(2)).toBe('Second')
    })

    test('other titles in the graph say change, with the title of the step that is shown', () => {
        const {graph, slides, states} = titled()
        slides.goto(2)
        states.length = 0

        graph.setControl('titles', {2: 'Other'})

        expect(states).toEqual([{current: 2, count: 3, title: 'Other'}])
        expect(slides.titles).toEqual({2: 'Other'})
    })

    test('the same titles say nothing', () => {
        const {graph, states} = titled()

        graph.setControl('titles', {2: 'Second', 3: 'Third'})

        expect(states).toEqual([])
    })

    test('titles taken away say change, and leave none', () => {
        const {graph, slides, states} = titled()

        graph.setControl('titles', null)

        expect(states).toHaveLength(1)
        expect(slides.titles).toEqual({})
    })

    test('a title for a step that does not exist is kept and does not make a step', () => {
        const {graph, slides} = titled()

        graph.setControl('titles', {2: 'Second', 9: 'Far'})

        expect(slides.count).toBe(3)
        expect(slides.titleOf(9)).toBe('Far')
        expect(() => { slides.goto(9) }).toThrow(InvalidArgumentError)
    })

    test('a presentation that was taken away does not follow the titles', () => {
        const {graph, slides, states} = titled()
        slides.dispose()

        graph.setControl('titles', {2: 'Other'})

        expect(states).toEqual([])
    })
})
