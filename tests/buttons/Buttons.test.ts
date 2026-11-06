import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest'
import {Buttons} from '../../src/buttons/Buttons'
import type {IButtonsChange} from '../../src/buttons/Buttons.types'
import {setToggle} from '../../src/buttons/toggle'
import {InvalidArgumentError} from '../../src/errors'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import {Slides} from '../../src/slides/Slides'
import {setSlide} from '../../src/slides/slideSet'
import {createGraph, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const REAL = {request: globalThis.requestAnimationFrame, cancel: globalThis.cancelAnimationFrame}

// Only the frames are replaced by a test: the virtual document of the helper stays.
afterEach(() => {
    globalThis.requestAnimationFrame = REAL.request
    globalThis.cancelAnimationFrame = REAL.cancel
    vi.restoreAllMocks()
})

const shown = (figure: AbstractFigure) => figure.element.attr('visibility') !== 'hidden'

const BUTTONS = [{id: 'area', title: 'Area'}, {id: 'sides', title: 'sides'}]

/** A graph with two buttons, two figures on `area` (one starts hidden, one shown), one on `sides` and one without button. */
function setup() {
    const {graph} = createGraph()
    const hidden = graph.create.point({x: 0, y: 0}, 'hidden')
    const visible = graph.create.point({x: 1, y: 0}, 'visible')
    const other = graph.create.point({x: 2, y: 0}, 'other')
    const free = graph.create.point({x: 3, y: 0}, 'free')

    graph.setControl('buttons', BUTTONS)
    setToggle(hidden, {id: 'area', duration: 0, hidden: true})
    setToggle(visible, {id: 'area', duration: 0, hidden: false})
    setToggle(other, {id: 'sides', duration: 0, hidden: true})

    const buttons = new Buttons(graph)
    const changes: IButtonsChange[] = []
    buttons.on('change', (event) => { changes.push(event.detail) })

    return {graph, buttons, changes, hidden, visible, other, free}
}

describe('Buttons made with a graph', () => {
    test('attaches itself to the graph: a graph has one', () => {
        const {graph} = setup()

        expect(() => new Buttons(graph)).toThrow(InvalidArgumentError)
    })

    test('lists the buttons of the code, none of them pressed', () => {
        const {buttons} = setup()

        expect(buttons.buttons).toEqual([{id: 'area', title: 'Area', active: false}, {id: 'sides', title: 'sides', active: false}])
    })

    test('each figure starts from its line: the hidden ones are not shown, the others are', () => {
        const {hidden, visible, other, free} = setup()

        expect([hidden, visible, other, free].map(shown)).toEqual([false, true, false, true])
    })

    test('a press reverses all the figures of the button and no other', () => {
        const {buttons, hidden, visible, other, free} = setup()

        buttons.toggle('area')

        expect([hidden, visible, other, free].map(shown)).toEqual([true, false, false, true])
        expect(buttons.isActive('area')).toBe(true)
        expect(buttons.isActive('sides')).toBe(false)
    })

    test('a second press brings the figures back', () => {
        const {buttons, hidden, visible} = setup()

        buttons.toggle('area')
        buttons.toggle('area')

        expect([hidden, visible].map(shown)).toEqual([false, true])
        expect(buttons.isActive('area')).toBe(false)
    })

    test('says change with the buttons and the one that was pressed', () => {
        const {buttons, changes} = setup()

        buttons.toggle('sides')

        expect(changes).toEqual([{buttons: [{id: 'area', title: 'Area', active: false}, {id: 'sides', title: 'sides', active: true}], toggled: 'sides'}])
    })

    test('a button that the code does not declare is an InvalidArgumentError', () => {
        const {buttons, changes} = setup()

        expect(() => { buttons.toggle('nothing') }).toThrow(InvalidArgumentError)
        expect(() => buttons.isActive('nothing')).toThrow(InvalidArgumentError)
        expect(changes).toEqual([])
    })

    test('reset releases every button', () => {
        const {buttons, changes, hidden, visible} = setup()

        buttons.toggle('area')
        buttons.toggle('sides')
        buttons.reset()

        expect(buttons.buttons.map(button => button.active)).toEqual([false, false])
        expect([hidden, visible].map(shown)).toEqual([false, true])
        expect(changes.map(change => change.toggled)).toEqual(['area', 'sides', null])
    })

    test('reset says nothing when no button is pressed', () => {
        const {buttons, changes} = setup()

        buttons.reset()

        expect(changes).toEqual([])
    })

    test('a figure tied to a button after the controller is shown or hidden at once', () => {
        const {graph, buttons} = setup()
        const late = graph.create.point({x: 4, y: 0}, 'late')

        buttons.toggle('area')
        setToggle(late, {id: 'area', duration: 0, hidden: true})

        expect(shown(late)).toBe(true)

        setToggle(late, null)

        expect(shown(late)).toBe(true)
    })

    test('a figure freed from its button is shown again', () => {
        const {hidden} = setup()

        setToggle(hidden, null)

        expect(shown(hidden)).toBe(true)
    })

    test('other buttons in the code replace the list, and a button that is no more forgets its presses', () => {
        const {graph, buttons, changes} = setup()

        buttons.toggle('sides')
        graph.setControl('buttons', [{id: 'sides', title: 'Sides'}, {id: 'extra', title: 'extra'}])

        expect(buttons.buttons).toEqual([{id: 'sides', title: 'Sides', active: true}, {id: 'extra', title: 'extra', active: false}])
        expect(changes).toHaveLength(2)
        expect(changes[1].toggled).toBeNull()

        graph.setControl('buttons', null)

        expect(buttons.buttons).toEqual([])
    })

    test('the same buttons said again are not a change', () => {
        const {graph, changes} = setup()

        graph.setControl('buttons', [...BUTTONS])

        expect(changes).toEqual([])
    })

    test('a figure that a presentation hides stays hidden when its button shows it', () => {
        const {graph, buttons, hidden} = setup()

        setSlide(hidden, [{from: 2}])
        new Slides(graph)
        buttons.toggle('area')

        expect(shown(hidden)).toBe(false)
    })

    test('the shape that `!` hid is shown by the button', () => {
        const {graph, buttons} = setup()
        const A = graph.create.point({x: 5, y: 5}, 'A')

        A.hideShape()
        setToggle(A, {id: 'area', duration: 0, hidden: true})
        buttons.toggle('area')

        expect(shown(A)).toBe(true)
        expect(A.element.children().every(child => child.css('display') !== 'none')).toBe(true)
    })

    test('dispose shows every figure again', () => {
        const {buttons, hidden, other} = setup()

        buttons.dispose()

        expect([hidden, other].map(shown)).toEqual([true, true])
    })

    test('a figure that is removed forgets its button', () => {
        const {graph, buttons} = setup()

        graph.remove('hidden')

        expect(() => { buttons.toggle('area') }).not.toThrow()
    })
})

describe('the fade of the figures', () => {
    /** A clock and a queue of frames that the test advances by hand. */
    function clock() {
        let now = 0
        let next = 1
        const frames = new Map<number, (time: number) => void>()

        globalThis.requestAnimationFrame = (callback: (time: number) => void) => {
            frames.set(next, callback)

            return next++
        }
        globalThis.cancelAnimationFrame = (id: number) => { frames.delete(id) }
        vi.spyOn(performance, 'now').mockImplementation(() => now)

        return {
            advance(ms: number) {
                now += ms
                const due = [...frames.entries()]

                frames.clear()
                due.forEach(([, callback]) => { callback(now) })
            },
            pending: () => frames.size
        }
    }

    function fading(duration: number) {
        const {graph} = createGraph()
        const A = graph.create.point({x: 0, y: 0}, 'A')

        graph.setControl('buttons', [{id: 'a', title: 'a'}])
        setToggle(A, {id: 'a', duration, hidden: true})

        return {A, buttons: new Buttons(graph)}
    }

    test('a figure that appears goes from invisible to opaque in its seconds', () => {
        const time = clock()
        const {A, buttons} = fading(2)

        buttons.toggle('a')

        expect(shown(A)).toBe(true)
        expect(Number(A.element.node.getAttribute('opacity'))).toBe(0)

        time.advance(1000)

        expect(Number(A.element.node.getAttribute('opacity'))).toBeCloseTo(0.5)

        time.advance(1000)

        expect(A.element.node.getAttribute('opacity')).toBeNull()
        expect(shown(A)).toBe(true)
        expect(time.pending()).toBe(0)
    })

    test('a figure that goes stays drawn until it is invisible', () => {
        const time = clock()
        const {A, buttons} = fading(1)

        buttons.toggle('a')
        time.advance(1000)
        buttons.toggle('a')
        time.advance(500)

        expect(shown(A)).toBe(true)
        expect(Number(A.element.node.getAttribute('opacity'))).toBeCloseTo(0.5)

        time.advance(500)

        expect(shown(A)).toBe(false)
    })

    test('a press in the middle of a fade goes back from where the figure is', () => {
        const time = clock()
        const {A, buttons} = fading(1)

        buttons.toggle('a')
        time.advance(250)
        buttons.toggle('a')

        expect(Number(A.element.node.getAttribute('opacity'))).toBeCloseTo(0.25)
        expect(time.pending()).toBe(1)
    })

    test('a duration of 0 shows and hides at once', () => {
        const time = clock()
        const {A, buttons} = fading(0)

        buttons.toggle('a')

        expect(shown(A)).toBe(true)
        expect(time.pending()).toBe(0)
    })

    test('dispose stops the fades and leaves the figures opaque', () => {
        const time = clock()
        const {A, buttons} = fading(1)

        buttons.toggle('a')
        buttons.dispose()

        expect(time.pending()).toBe(0)
        expect(A.element.node.getAttribute('opacity')).toBeNull()
    })
})
