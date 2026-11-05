import {afterEach, describe, expect, test, vi} from 'vitest'
import {Animate} from '../../src/animate/Animate'
import {setAnimation} from '../../src/animate/animation'
import {type AnimationEasing, LoopStyle} from '../../src/animate/Animate.types'
import type {Graph} from '../../src/Graph'
import {Point} from '../../src/figures/Point/Point'
import {createContext} from '../helpers/figure'
import {stubFrames} from '../helpers/frames'

function fake(figures: object, update = vi.fn()): Graph {
    return {figures, update, attach: vi.fn()} as unknown as Graph
}

function createGraph() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const figures = {A: point('A', 0, 0), B: point('B', 2, 1), C: point('C', 4, 3), D: point('D', -1, -1)}
    const graph = fake(figures)

    return {figures, graph}
}

const move = (from: Point, to: Point) => ({
    from, to, duration: 2, delay: 1, easing: 'linear' as const, loop: LoopStyle.RESET
})

const expectAt = (point: Point, x: number, y: number) => {
    expect(point.coordinates.x).toBeCloseTo(x, 8)
    expect(point.coordinates.y).toBeCloseTo(y, 8)
}

const expectX = (point: Point, x: number) => {
    expect(point.coordinates.x).toBeCloseTo(x, 8)
}

describe('Animate', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('nothing is animated when no point has an animation', () => {
        const {graph} = createGraph()

        expect(new Animate(graph).canBeAnimated()).toBe(false)
    })

    test('the points that have an animation are the animated ones, in the order of the figures', () => {
        const {figures} = createGraph()
        const frames = stubFrames()
        const update = vi.fn()
        setAnimation(figures.A, move(figures.B, figures.C))
        setAnimation(figures.D, move(figures.C, figures.B))
        const animate = new Animate(fake(figures, update))

        expect(animate.canBeAnimated()).toBe(true)
        animate.start()
        frames.at(1000)

        expect(update).toHaveBeenCalledWith([figures.A, figures.D])
    })

    test('the animations are read again from the points', () => {
        const {figures, graph} = createGraph()
        const animate = new Animate(graph)
        expect(animate.canBeAnimated()).toBe(false)

        setAnimation(figures.A, move(figures.B, figures.C))

        expect(animate.canBeAnimated()).toBe(true)
    })

    test('a figure that only looks like a point is not an animated point', () => {
        const lookalike = {figures: {X: {x: 1, y: 2, name: 'X', animate: {}}}, attach: vi.fn()} as unknown as Graph

        expect(new Animate(lookalike).canBeAnimated()).toBe(false)
    })
})

describe('Animate step', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    // A goes from B (2, 1) to C (4, 3) in 2 seconds, after a delay of 1 second. The animation is started, and no frame has come yet.
    function animated(loop: LoopStyle, easing: AnimationEasing = 'linear') {
        const {figures} = createGraph()
        const frames = stubFrames()
        const update = vi.fn()

        setAnimation(figures.A, {...move(figures.B, figures.C), loop, easing})
        const animate = new Animate(fake(figures, update))
        animate.start()

        return {A: figures.A, animate, frames, update}
    }

    test('the point waits at its start during the delay', () => {
        const {A, frames} = animated(LoopStyle.NONE)

        frames.play(1000, 1500)

        expectAt(A, 2, 1)
    })

    test('the point is halfway at half of the duration', () => {
        const {A, frames} = animated(LoopStyle.NONE)

        frames.play(1000, 3000)

        expectAt(A, 3, 2)
    })

    test('the point stops at its end without a loop, and no other frame is asked', () => {
        const {A, frames} = animated(LoopStyle.NONE)

        frames.play(1000, 4000)
        const asked = frames.request.mock.calls.length
        frames.at(4050)

        expectAt(A, 4, 3)
        expect(frames.request.mock.calls.length).toBe(asked)
        expect(frames.asked()).toBe(false)
    })

    test('the point goes back to its start with a reset loop, and another frame is asked', () => {
        const {A, frames} = animated(LoopStyle.RESET)

        frames.play(1000, 3950)
        frames.request.mockClear()
        frames.at(4000)

        expectAt(A, 2, 1)
        expect(frames.request).toHaveBeenCalledOnce()
    })

    test('the point comes back the other way with a reverse loop', () => {
        const {A, frames} = animated(LoopStyle.REVERSE)

        frames.play(1000, 4000)
        expectAt(A, 4, 3)

        frames.play(4050, 5000)
        expectAt(A, 4, 3)

        frames.play(5050, 6000)
        expectAt(A, 3, 2)

        frames.play(6050, 7000)
        expectAt(A, 2, 1)
    })

    // The delay is 1 second and the duration 2: a quarter of the movement is 500 ms after the delay.
    test('the point is slower at the start with inOut than with linear', () => {
        const linear = animated(LoopStyle.NONE, 'linear')
        linear.frames.play(1000, 2500)

        const inOut = animated(LoopStyle.NONE, 'inOut')
        inOut.frames.play(1000, 2500)

        expectAt(linear.A, 2.5, 1.5)
        expectAt(inOut.A, 2.125, 1.125)
    })

    test('inOut and linear are at the same place halfway, and at the end', () => {
        const linear = animated(LoopStyle.NONE, 'linear')
        linear.frames.play(1000, 3000)
        const halfway = {x: linear.A.coordinates.x, y: linear.A.coordinates.y}
        linear.frames.play(3050, 4000)

        const inOut = animated(LoopStyle.NONE, 'inOut')
        inOut.frames.play(1000, 3000)
        expectAt(inOut.A, halfway.x, halfway.y)
        inOut.frames.play(3050, 4000)

        expectAt(linear.A, 4, 3)
        expectAt(inOut.A, 4, 3)
    })

    test('the figures that depend on the animated points are updated, not the points', () => {
        const {A, frames, update} = animated(LoopStyle.NONE)

        frames.at(1000)

        expect(update).toHaveBeenCalledWith([A])
    })

    test('a frame adds at most 100 ms: a page that was hidden does not jump ahead', () => {
        const {A, frames} = animated(LoopStyle.NONE)

        frames.at(1000)
        frames.at(31000)
        expectAt(A, 2, 1)

        frames.play(31050, 32050)
        expectAt(A, 2.15, 1.15)
    })
})

describe('Animate follows the ends of the animation', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    // A goes from B (2, 1) to C (4, 3) in 10 seconds, with the delay and the loop that are given.
    function playing(delay = 0, loop = LoopStyle.NONE, duration = 10) {
        const {figures} = createGraph()
        const frames = stubFrames()

        setAnimation(figures.A, {from: figures.B, to: figures.C, duration, delay, easing: 'linear', loop})
        const animate = new Animate(fake(figures))
        animate.start()

        return {A: figures.A, B: figures.B, C: figures.C, animate, frames}
    }

    /** Move a point by `dx` pixels: the layout of the graph or the mouse does it. 50 pixels are 1 unit. */
    const shift = (point: Point, dx: number) => {
        point.pixels = {x: point.pixels.x + dx, y: point.pixels.y}
    }

    test('the point goes toward the place where its end is now', () => {
        const {A, C, frames} = playing()
        frames.play(1000, 3000)
        expectX(A, 2.4)

        shift(C, 100)
        frames.play(3050, 4000)

        // Three tenths of the way from B (2) to C, which is now at 6.
        expectX(A, 3.2)
    })

    test('the point leaves from the place where its start is now', () => {
        const {A, B, frames} = playing(1)
        frames.play(1000, 1500)
        expectAt(A, 2, 1)

        shift(B, 50)
        frames.at(1550)

        expectAt(A, 3, 1)
    })

    test('a loop that goes back comes back to the place where the start is now', () => {
        const {A, B, frames} = playing(0, LoopStyle.REVERSE, 2)
        frames.play(1000, 3000)
        expectAt(A, 4, 3)

        shift(B, 50)
        frames.play(3050, 4000)

        // Halfway from C (4, 3) to B, which is now at (3, 1).
        expectAt(A, 3.5, 2)
    })
})

describe('Animate pause', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.useRealTimers()
    })

    // A goes from B (2, 1) to C (4, 3) in 10 seconds, with the delay and the loop that are given.
    function playing(delay = 0, loop = LoopStyle.NONE) {
        const {figures} = createGraph()
        const frames = stubFrames()
        const update = vi.fn()
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})

        setAnimation(figures.A, {from: figures.B, to: figures.C, duration: 10, delay, easing: 'linear', loop})
        const animate = new Animate(fake(figures, update))

        return {A: figures.A, animate, frames, update}
    }

    test('the point keeps its place during a pause, however long, and goes on from there', () => {
        const {A, animate, frames} = playing()
        animate.start()
        frames.play(1000, 3000)
        expectX(A, 2.4)

        animate.pause()
        expect(animate.isPaused()).toBe(true)
        expect(animate.isRunning()).toBe(false)

        animate.start()
        frames.at(900000)
        expectX(A, 2.4)

        frames.at(900050)
        expectX(A, 2.41)
    })

    test('a second pause changes nothing', () => {
        const {A, animate, frames} = playing()
        animate.start()
        frames.play(1000, 3000)

        animate.pause()
        animate.pause()
        animate.start()
        frames.at(900000)

        expectX(A, 2.4)
    })

    test('a pause before the animation started changes nothing', () => {
        const {animate, frames} = playing()

        animate.pause()

        expect(animate.isPaused()).toBe(false)
        expect(animate.isRunning()).toBe(false)
        expect(frames.request).not.toHaveBeenCalled()
    })

    test('start does nothing while the animation runs', () => {
        const {animate, frames} = playing()
        animate.start()
        frames.request.mockClear()

        animate.start()

        expect(frames.request).not.toHaveBeenCalled()
        expect(animate.isRunning()).toBe(true)
    })

    test('start plans no reset', () => {
        const {animate} = playing()

        animate.start()

        expect(vi.getTimerCount()).toBe(0)
    })

    test('start ends the reset that stop planned', () => {
        const {animate, update} = playing()

        animate.stop()
        animate.start()
        vi.advanceTimersByTime(1000)

        expect(vi.getTimerCount()).toBe(0)
        expect(update).not.toHaveBeenCalled()
    })

    test('a pause just after the start, then a start, does not jump to the end', () => {
        const {A, animate, frames} = playing()
        animate.start()
        frames.at(1000)

        animate.pause()
        vi.advanceTimersByTime(1000)
        animate.start()
        frames.at(5000)

        expectX(A, 2)
    })

    test('a pause during the delay keeps the time that was waited', () => {
        const {A, animate, frames} = playing(1)
        animate.start()
        frames.play(1000, 1500)

        animate.pause()
        animate.start()
        frames.play(9000, 9450)
        expectX(A, 2)

        // 950 ms are waited: 1050 more reach the end of the delay and 1000 ms of the movement.
        frames.play(9500, 10500)
        expectX(A, 2.2)
    })
})

describe('Animate stop and read again', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.useRealTimers()
    })

    function running() {
        const {figures} = createGraph()
        const frames = stubFrames(7)
        const update = vi.fn()
        // Only the timer of the reset: the frames are the ones above.
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})

        setAnimation(figures.A, move(figures.B, figures.C))
        const animate = new Animate(fake(figures, update))

        return {animate, frames, figures, update}
    }

    test('stop ends the animation that runs', () => {
        const {animate, frames} = running()
        animate.start()
        expect(animate.isRunning()).toBe(true)

        animate.stop()

        expect(frames.cancel).toHaveBeenCalledWith(7)
        expect(animate.isRunning()).toBe(false)
    })

    test('dispose ends the reset that stop planned', () => {
        const {animate, update} = running()
        animate.start()
        animate.stop()

        animate.dispose()
        vi.advanceTimersByTime(1000)

        expect(vi.getTimerCount()).toBe(0)
        expect(update).not.toHaveBeenCalled()
    })

    test('dispose forgets the points, and they are read again afterward', () => {
        const {animate} = running()

        animate.dispose()
        animate.dispose()

        expect(animate.canBeAnimated()).toBe(true)
    })

    test('stop plans one reset, not one for each call', () => {
        const {animate, update} = running()

        animate.stop()
        animate.stop()
        expect(vi.getTimerCount()).toBe(1)

        vi.advanceTimersByTime(300)
        expect(update).toHaveBeenCalledOnce()
    })

    test('says whether a point has an animation from the points as they are now', () => {
        const {figures} = createGraph()
        const animate = new Animate(fake(figures))
        expect(animate.canBeAnimated()).toBe(false)

        setAnimation(figures.A, move(figures.B, figures.C))

        expect(animate.canBeAnimated()).toBe(true)
    })

    test('does not read the points again while the animation runs, which would restart it', () => {
        const {animate, frames, figures} = running()
        setAnimation(figures.A, {...move(figures.B, figures.C), loop: LoopStyle.NONE})
        animate.start()
        frames.play(1000, 2500)
        const reached = figures.A.coordinates.x

        setAnimation(figures.D, move(figures.B, figures.C))

        expect(animate.canBeAnimated()).toBe(true)
        frames.play(2550, 3000)
        expect(figures.A.coordinates.x).toBeGreaterThan(reached)
        expectAt(figures.D, -1, -1)
    })

    test('plays the points that got an animation after it was made', () => {
        const {figures} = createGraph()
        const frames = stubFrames()
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})
        const animate = new Animate(fake(figures))
        setAnimation(figures.A, {...move(figures.B, figures.C), loop: LoopStyle.NONE})

        animate.start()
        frames.play(1000, 1000 + 1000 + 2000)

        expect(figures.A.coordinates.x).toBeCloseTo(4, 8)
        expect(figures.A.coordinates.y).toBeCloseTo(3, 8)
    })
})

describe('Animate verbs and events', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.useRealTimers()
    })

    // A goes from B (2, 1) to C (4, 3) in 2 seconds, without delay, once.
    function ready() {
        const {figures} = createGraph()
        const frames = stubFrames()
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})

        setAnimation(figures.A, {from: figures.B, to: figures.C, duration: 2, delay: 0, easing: 'linear', loop: LoopStyle.NONE})
        const animate = new Animate(fake(figures))
        const events: string[] = []

        for (const event of ['start', 'pause', 'end', 'stop'] as const) {
            animate.on(event, () => { events.push(event) })
        }

        return {A: figures.A, animate, events, figures, frames}
    }

    test('start, pause, start, then the end: the events come in that order', () => {
        const {animate, events, frames} = ready()

        animate.start()
        frames.play(1000, 1500)
        animate.pause()
        animate.start()
        frames.play(9000, 10500)

        expect(events).toEqual(['start', 'pause', 'start', 'end'])
    })

    test('the end is sent once, when the animation is over, and not when it loops', () => {
        const {animate, figures, events, frames} = ready()
        setAnimation(figures.A, {...move(figures.B, figures.C), delay: 0, loop: LoopStyle.RESET})
        animate.start()

        frames.play(1000, 6000)

        expect(events).toEqual(['start'])
    })

    test('stop sends stop when the animation ran, and nothing when it was not playing', () => {
        const {animate, events} = ready()

        animate.stop()
        expect(events).toEqual([])

        animate.start()
        animate.stop()
        expect(events).toEqual(['start', 'stop'])
    })

    test('start goes on from where a pause left it, and does not begin again', () => {
        const {A, animate, frames} = ready()
        animate.start()
        frames.play(1000, 2000)
        const reached = A.coordinates.x

        animate.pause()
        animate.start()
        frames.at(500000)

        expect(A.coordinates.x).toBeCloseTo(reached, 8)
        expect(reached).toBeGreaterThan(2)
    })

    test('restart begins again from the start while the animation runs', () => {
        const {A, animate, events, frames} = ready()
        animate.start()
        frames.play(1000, 2000)
        expect(A.coordinates.x).toBeGreaterThan(2.9)

        animate.restart()
        frames.at(7000)

        expect(A.coordinates.x).toBeCloseTo(2, 8)
        expect(events).toEqual(['start', 'start'])
    })

    test('restart begins an animation that is over', () => {
        const {A, animate, frames} = ready()
        animate.start()
        frames.play(1000, 4000)
        expect(A.coordinates.x).toBeCloseTo(4, 8)

        animate.restart()
        frames.at(9000)

        expect(A.coordinates.x).toBeCloseTo(2, 8)
        expect(animate.isRunning()).toBe(true)
    })

    test('start begins again an animation that is over', () => {
        const {A, animate, frames} = ready()
        animate.start()
        frames.play(1000, 4000)

        animate.start()
        frames.at(9000)

        expect(A.coordinates.x).toBeCloseTo(2, 8)
    })

    test('a handler that was removed is not called', () => {
        const {animate} = ready()
        const handler = vi.fn()
        animate.on('start', handler)
        animate.off('start', handler)

        animate.start()

        expect(handler).not.toHaveBeenCalled()
    })
})

describe('Animate and the figures that are removed', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.useRealTimers()
    })

    // A and D go from B (2, 1) to C (4, 3) in 10 seconds.
    function playingTwo() {
        const {figures} = createGraph()
        const frames = stubFrames()
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})
        const animation = {duration: 10, delay: 0, easing: 'linear' as const, loop: LoopStyle.NONE}

        setAnimation(figures.A, {from: figures.B, to: figures.C, ...animation})
        setAnimation(figures.D, {from: figures.B, to: figures.C, ...animation})
        const animate = new Animate(fake(figures))
        const events: string[] = []
        animate.on('stop', () => { events.push('stop') })
        animate.start()
        frames.play(1000, 2000)

        return {animate, events, figures, frames}
    }

    test('an animated point that is removed stops moving, and the others go on', () => {
        const {animate, figures, frames} = playingTwo()
        const stuck = figures.A.coordinates.x

        animate.onFiguresRemoved(['A'])
        frames.play(2050, 3000)

        expect(figures.A.coordinates.x).toBe(stuck)
        expect(figures.D.coordinates.x).toBeGreaterThan(stuck)
        expect(animate.isRunning()).toBe(true)
    })

    test('a point whose end is removed stops moving', () => {
        const {animate, figures, frames} = playingTwo()
        const stuck = figures.A.coordinates.x

        animate.onFiguresRemoved(['C'])
        frames.play(2050, 3000)

        expect(figures.A.coordinates.x).toBe(stuck)
        expect(figures.D.coordinates.x).toBe(stuck)
    })

    test('the animation stops, and says it, when nothing is left to play', () => {
        const {animate, events} = playingTwo()

        animate.onFiguresRemoved(['A', 'D'])

        expect(animate.isRunning()).toBe(false)
        expect(events).toEqual(['stop'])
    })

    test('a figure that is not animated changes nothing', () => {
        const {animate, events} = playingTwo()

        animate.onFiguresRemoved(['Z'])

        expect(animate.isRunning()).toBe(true)
        expect(events).toEqual([])
    })
})
