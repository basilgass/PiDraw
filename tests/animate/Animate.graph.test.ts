import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest'
import {Animate} from '../../src/animate/Animate'
import {setAnimation} from '../../src/animate/animation'
import {LoopStyle} from '../../src/animate/Animate.types'
import {Draw} from '../../src/Draw/Draw'
import {InvalidArgumentError} from '../../src/errors'
import {createContainer, createGraph, useDocument} from '../helpers/graph'

beforeAll(useDocument)

// The animation needs the frames of the page, which node does not have: the graph needs its document back after.
afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
    useDocument()
})

/** A graph with a point that moves from B to C, and its animation started: it asks for the next frame. */
function createAnimated() {
    const frames = vi.fn(() => 7)
    const cancelled = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frames)
    vi.stubGlobal('cancelAnimationFrame', cancelled)
    // Only the timer of the reset: the frames are the ones above.
    vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})

    const made = createGraph()
    const {graph} = made
    const A = graph.create.point({x: 0, y: 0}, 'A')
    const B = graph.create.point({x: 2, y: 1}, 'B')
    const C = graph.create.point({x: 4, y: 3}, 'C')
    setAnimation(A, {from: B, to: C, duration: 2, delay: 1, easing: 'linear', loop: LoopStyle.RESET})

    const animation = new Animate(graph)
    animation.start()

    return {...made, A, animation, cancelled, frames}
}

describe('Animate on a graph', () => {
    test('attaches itself to the graph: a graph has one animation', () => {
        const {graph} = createGraph()
        new Animate(graph)

        expect(() => new Animate(graph)).toThrow(InvalidArgumentError)
    })

    test('is stopped when the graph is taken out of the page, and so is the reset that stop planned', () => {
        const {graph, animation, cancelled} = createAnimated()
        animation.stop()
        const update = vi.spyOn(graph, 'update')
        animation.start()
        expect(animation.isRunning()).toBe(true)

        graph.dispose()
        vi.advanceTimersByTime(1000)

        expect(cancelled).toHaveBeenCalledWith(7)
        expect(animation.isRunning()).toBe(false)
        expect(update).not.toHaveBeenCalled()
    })

    test('is stopped by clear, which removes the figures that were animated', () => {
        const {graph, animation, cancelled} = createAnimated()

        graph.clear()

        expect(cancelled).toHaveBeenCalledWith(7)
        expect(animation.isRunning()).toBe(false)
        expect(animation.canBeAnimated()).toBe(false)
    })

    test('reads the figures that come after clear', () => {
        const {graph, animation} = createAnimated()

        graph.clear()
        const A = graph.create.point({x: 0, y: 0}, 'A')
        const B = graph.create.point({x: 2, y: 1}, 'B')
        expect(animation.canBeAnimated()).toBe(false)

        setAnimation(A, {from: B, to: B, duration: 1, delay: 0, easing: 'linear', loop: LoopStyle.NONE})

        expect(animation.canBeAnimated()).toBe(true)
    })

    test('stops when the animated point is removed from the graph', () => {
        const {graph, animation} = createAnimated()

        graph.remove('A', {cascade: true})

        expect(animation.isRunning()).toBe(false)
    })

    test('goes on when another figure is removed', () => {
        const {graph, animation} = createAnimated()
        graph.create.point({x: 9, y: 9}, 'Z')

        graph.remove('Z')

        expect(animation.isRunning()).toBe(true)
    })
})

describe('Animate with a drawing of the code', () => {
    const code = 'A(1,1)\nB(5,3)\nP(1,1)->animate,from=A,to=B,duration=2,loop=reverse\nC(7,8)'

    function drawn() {
        vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
        vi.stubGlobal('cancelAnimationFrame', vi.fn())
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})
        const draw = new Draw(createContainer(), {code})
        const animation = new Animate(draw.graph)
        animation.start()

        return {animation, draw}
    }

    test('refresh with the same code leaves the animation running', () => {
        const {animation, draw} = drawn()

        draw.refresh(code)

        expect(animation.isRunning()).toBe(true)
    })

    test('refresh that removes the animated point stops the animation', () => {
        const {animation, draw} = drawn()

        draw.refresh('A(1,1)\nB(5,3)')

        expect(animation.isRunning()).toBe(false)
    })

    test('refresh that only changes the figures after the animated point leaves the animation running', () => {
        const {animation, draw} = drawn()

        draw.refresh('A(1,1)\nB(5,3)\nP(1,1)->animate,from=A,to=B,duration=2,loop=reverse\nC(2,2)')

        expect(animation.isRunning()).toBe(true)
    })
})
