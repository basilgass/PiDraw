import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest'
import {toCoordinates, toPixels, visibleWindow, ZOOM_LIMITS} from '../../src/calculus'
import {InvalidArgumentError, UnsupportedOperationError} from '../../src/errors'
import type {Graph} from '../../src/Graph'
import type {XY} from '../../src/pidraw.common'
import {Zoom, ZOOM_STEP} from '../../src/zoom/Zoom'
import type {IZoomOptions, ViewWindow} from '../../src/zoom/Zoom.types'
import {fireEvent, createGraph, useDocument} from '../helpers/graph'
import {stubFrames} from '../helpers/frames'

beforeAll(useDocument)

afterEach(() => {
    vi.unstubAllGlobals()
    useDocument()
})

/** A zoom whose events give the position as it is written, without the box of the page, which the virtual document has none. */
class FlatZoom extends Zoom {
    protected override _local(event: MouseEvent): XY {
        return {x: event.clientX, y: event.clientY}
    }
}

function setup(options?: IZoomOptions) {
    const frames = stubFrames()
    const made = createGraph()
    const zoom = new FlatZoom(made.graph, options)
    const changes: ViewWindow[] = []
    zoom.on('change', (event) => { changes.push(event.detail) })

    return {...made, zoom, frames, changes}
}

const origin = (graph: Graph) => ({...graph.config.origin})
const unit = (graph: Graph) => graph.config.axis.x.x
const middle = (graph: Graph) => ({x: graph.config.width / 2, y: graph.config.height / 2})

describe('Zoom made with a graph', () => {
    test('attaches itself to the graph: a graph has one zoom', () => {
        const {graph} = setup()

        expect(() => new FlatZoom(graph)).toThrow(InvalidArgumentError)
    })

    test.each(['everything', '', 'ZOOM'])('allow "%s" is an InvalidArgumentError', (allow) => {
        const {graph} = createGraph()

        expect(() => new Zoom(graph, {allow: allow as never})).toThrow(InvalidArgumentError)
    })

    test('allows both by default, without gestures', () => {
        const {zoom} = setup()

        expect(zoom.allow).toBe('both')
        expect(zoom.gestures).toBe(false)
        expect(zoom.canZoom).toBe(true)
        expect(zoom.canMove).toBe(true)
    })

    test('says the part of the plane that is shown', () => {
        const {zoom, graph} = setup()

        expect(zoom.window).toEqual(visibleWindow(graph.config))
    })
})

describe('Zoom zoomIn and zoomOut', () => {
    test('makes the units longer by the step, around the middle of the drawing', () => {
        const {zoom, graph} = setup()
        const before = unit(graph)
        const under = toCoordinates(middle(graph), graph.config)

        zoom.zoomIn()

        expect(unit(graph)).toBeCloseTo(before * ZOOM_STEP, 8)
        const now = toPixels(under, graph.config)
        expect(now.x).toBeCloseTo(middle(graph).x, 6)
        expect(now.y).toBeCloseTo(middle(graph).y, 6)
    })

    test('zooms around the center that is given', () => {
        const {zoom, graph} = setup()
        const center = {x: 100, y: 500}
        const under = toCoordinates(center, graph.config)

        zoom.zoomIn(2, center)

        const now = toPixels(under, graph.config)
        expect(now.x).toBeCloseTo(100, 6)
        expect(now.y).toBeCloseTo(500, 6)
    })

    test('zoomOut is the opposite of zoomIn', () => {
        const {zoom, graph} = setup()
        const before = {origin: origin(graph), unit: unit(graph)}

        zoom.zoomIn(3)
        zoom.zoomOut(3)

        expect(unit(graph)).toBeCloseTo(before.unit, 8)
        expect(graph.config.origin.x).toBeCloseTo(before.origin.x, 6)
        expect(graph.config.origin.y).toBeCloseTo(before.origin.y, 6)
    })

    test('keeps the size of the drawing', () => {
        const {zoom, graph} = setup()
        const {width, height} = graph.config

        zoom.zoomIn(4)

        expect(graph.config.width).toBe(width)
        expect(graph.config.height).toBe(height)
    })

    test('stops at the limit, and says nothing more', () => {
        const {zoom, graph, changes} = setup()

        zoom.zoomIn(1000)
        expect(zoom.scale.x).toBeCloseTo(ZOOM_LIMITS.max, 6)
        const count = changes.length

        zoom.zoomIn(2)

        expect(zoom.scale.x).toBeCloseTo(ZOOM_LIMITS.max, 6)
        expect(changes).toHaveLength(count)
        expect(unit(graph)).toBeCloseTo(graph.config.axis.x.x, 8)
    })

    test('stops at the limit when zooming out too', () => {
        const {zoom} = setup()

        zoom.zoomOut(100000)

        expect(zoom.scale.x).toBeCloseTo(ZOOM_LIMITS.min, 8)
    })

    test.each([0, -2, NaN, Infinity])('a factor of %s is an InvalidArgumentError', (factor) => {
        const {zoom} = setup()

        expect(() => { zoom.zoomIn(factor) }).toThrow(InvalidArgumentError)
        expect(() => { zoom.zoomOut(factor) }).toThrow(InvalidArgumentError)
    })

    test('the points that were moved keep their coordinates', () => {
        const {zoom, graph} = setup()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        A.pixels = {x: A.pixels.x + 90, y: A.pixels.y}
        const {x, y} = A.coordinates

        zoom.zoomIn(2.5)

        expect(A.coordinates.x).toBeCloseTo(x, 8)
        expect(A.coordinates.y).toBeCloseTo(y, 8)
    })

    test('the figures are drawn again at the new scale', () => {
        const {zoom, graph} = setup()
        const A = graph.create.point({x: 1, y: 1}, 'A')
        const before = A.pixels.x - graph.config.origin.x

        zoom.zoomIn(2)

        expect(A.pixels.x - graph.config.origin.x).toBeCloseTo(before * 2, 6)
    })
})

describe('Zoom moveOrigin, zoomTo and reset', () => {
    test('moves the origin by pixels, and leaves the units', () => {
        const {zoom, graph} = setup()
        const before = {origin: origin(graph), unit: unit(graph)}

        zoom.moveOrigin(30, -40)

        expect(graph.config.origin).toEqual({x: before.origin.x + 30, y: before.origin.y - 40})
        expect(unit(graph)).toBe(before.unit)
    })

    test('a move that is not finite is an InvalidArgumentError', () => {
        const {zoom} = setup()

        expect(() => { zoom.moveOrigin(NaN, 0) }).toThrow(InvalidArgumentError)
    })

    test('shows exactly the window that is given', () => {
        const {zoom} = setup()

        zoom.zoomTo({x: {min: -2, max: 2}, y: {min: 0, max: 3}})

        const window = zoom.window
        expect(window.x.min).toBeCloseTo(-2, 6)
        expect(window.x.max).toBeCloseTo(2, 6)
        expect(window.y.min).toBeCloseTo(0, 6)
        expect(window.y.max).toBeCloseTo(3, 6)
    })

    test('refuses a window that needs units beyond the limits', () => {
        const {zoom, graph} = setup()
        const before = origin(graph)

        expect(() => { zoom.zoomTo({x: {min: 0, max: 1e-6}, y: {min: 0, max: 1e-6}}) }).toThrow(InvalidArgumentError)
        expect(() => { zoom.zoomTo({x: {min: 0, max: 1e9}, y: {min: 0, max: 1e9}}) }).toThrow(InvalidArgumentError)

        expect(origin(graph)).toEqual(before)
    })

    test('a window that is not valid is an InvalidArgumentError', () => {
        const {zoom} = setup()

        expect(() => { zoom.zoomTo({x: {min: 2, max: 1}, y: {min: 0, max: 1}}) }).toThrow(InvalidArgumentError)
    })

    test('reset comes back to the layout at the start, after zooms and moves', () => {
        const {zoom, graph} = setup()
        const start = structuredClone(graph.config)

        zoom.zoomIn(3)
        zoom.moveOrigin(77, 12)
        zoom.zoomOut(1.3)
        zoom.reset()

        expect(graph.config.origin.x).toBeCloseTo(start.origin.x, 6)
        expect(graph.config.origin.y).toBeCloseTo(start.origin.y, 6)
        expect(graph.config.axis.x.x).toBeCloseTo(start.axis.x.x, 8)
        expect(graph.config.axis.y.y).toBeCloseTo(start.axis.y.y, 8)
        expect(zoom.scale).toEqual({x: 1, y: 1})
    })

    test('reset at the start changes nothing and says nothing', () => {
        const {zoom, changes} = setup()

        zoom.reset()

        expect(changes).toEqual([])
    })
})

describe('Zoom allow', () => {
    test('zoom only: the origin stays where it is, whatever the center', () => {
        const {zoom, graph} = setup({allow: 'zoom'})
        const start = origin(graph)

        zoom.zoomIn(2)
        zoom.zoomIn(2, {x: 10, y: 10})
        zoom.zoomOut(3, {x: 700, y: 500})

        expect(origin(graph).x).toBeCloseTo(start.x, 6)
        expect(origin(graph).y).toBeCloseTo(start.y, 6)
        expect(zoom.scale.x).toBeCloseTo(4 / 3, 8)
        expect(zoom.canZoom).toBe(true)
        expect(zoom.canMove).toBe(false)
    })

    test('zoom only: moving and showing a window are refused', () => {
        const {zoom, graph} = setup({allow: 'zoom'})
        const before = structuredClone(graph.config)

        expect(() => { zoom.moveOrigin(10, 0) }).toThrow(UnsupportedOperationError)
        expect(() => { zoom.zoomTo({x: {min: -1, max: 1}, y: {min: -1, max: 1}}) }).toThrow(UnsupportedOperationError)

        expect(graph.config).toEqual(before)
    })

    test('move only: the units never change', () => {
        const {zoom, graph} = setup({allow: 'move'})
        const before = unit(graph)

        zoom.moveOrigin(25, 5)

        expect(unit(graph)).toBe(before)
        expect(zoom.canZoom).toBe(false)
        expect(zoom.canMove).toBe(true)
    })

    test('move only: zooming and showing a window are refused', () => {
        const {zoom, graph} = setup({allow: 'move'})
        const before = structuredClone(graph.config)

        expect(() => { zoom.zoomIn() }).toThrow(UnsupportedOperationError)
        expect(() => { zoom.zoomOut() }).toThrow(UnsupportedOperationError)
        expect(() => { zoom.zoomTo({x: {min: -1, max: 1}, y: {min: -1, max: 1}}) }).toThrow(UnsupportedOperationError)

        expect(graph.config).toEqual(before)
    })

    test.each(['zoom', 'move', 'both'] as const)('reset is always allowed (%s)', (allow) => {
        const {zoom, graph} = setup({allow})

        if (zoom.canZoom) {
            zoom.zoomIn(2)
        } else {
            zoom.moveOrigin(40, 40)
        }

        expect(() => { zoom.reset() }).not.toThrow()
        expect(zoom.scale).toEqual({x: 1, y: 1})
        expect(graph.config.origin.x).toBeCloseTo(graph.config.width / 2, 6)
    })
})

describe('Zoom events', () => {
    test('change gives the window that is shown now, at each zoom and each move', () => {
        const {zoom, changes} = setup()

        zoom.zoomIn(2)
        zoom.moveOrigin(10, 0)

        expect(changes).toHaveLength(2)
        expect(changes[1]).toEqual(zoom.window)
        expect(changes[0].x.max - changes[0].x.min).toBeLessThan(changes[1].x.max - changes[1].x.min + 1e-9)
    })

    test('a layout that someone else gives is a change, and the new start of reset', () => {
        const {zoom, graph, changes} = setup()
        zoom.zoomIn(2)
        const given = {...graph.config, origin: {x: 11, y: 22}}

        graph.updateLayout(given)

        expect(changes).toHaveLength(2)
        zoom.zoomIn(2)
        zoom.reset()
        expect(graph.config.origin.x).toBeCloseTo(11, 8)
        expect(graph.config.origin.y).toBeCloseTo(22, 8)
        expect(zoom.scale).toEqual({x: 1, y: 1})
    })

    test('a handler that was removed is not called', () => {
        const {zoom} = setup()
        const handler = vi.fn()
        zoom.on('change', handler)
        zoom.off('change', handler)

        zoom.zoomIn()

        expect(handler).not.toHaveBeenCalled()
    })
})

describe('Zoom navigation', () => {
    test('is refused without gestures', () => {
        const {zoom} = setup()

        expect(() => { zoom.navigating = true }).toThrow(UnsupportedOperationError)
        expect(zoom.navigating).toBe(false)
    })

    test('enters and leaves the mode, and says it once for each change', () => {
        const {zoom} = setup({gestures: true})
        const seen: boolean[] = []
        zoom.on('navigation', (event) => { seen.push(event.detail) })

        zoom.navigating = true
        zoom.navigating = true
        zoom.navigating = false
        zoom.navigating = false

        expect(seen).toEqual([true, false])
        expect(zoom.navigating).toBe(false)
    })

    test('puts a layer over the drawing in the mode, and takes it away after', () => {
        const {zoom, graph} = setup({gestures: true})
        const children = () => graph.rootSVG.children().length
        const before = children()

        zoom.navigating = true
        expect(children()).toBe(before + 1)
        expect(graph.rootSVG.last().type).toBe('rect')

        zoom.navigating = false
        expect(children()).toBe(before)
    })

    test('the layer is not in the TikZ of the drawing', () => {
        const {zoom, graph} = setup({gestures: true})
        graph.create.point({x: 1, y: 1}, 'A')
        const before = graph.tikz()

        zoom.navigating = true

        expect(graph.tikz()).toBe(before)
    })

    test('dispose takes the layer away and leaves the layout', () => {
        const {zoom, graph} = setup({gestures: true})
        zoom.zoomIn(2)
        const layout = structuredClone(graph.config)
        zoom.navigating = true

        zoom.dispose()

        expect(graph.rootSVG.children().some(child => child.type === 'rect')).toBe(false)
        expect(graph.config).toEqual(layout)
        expect(zoom.navigating).toBe(false)
    })
})

describe('Zoom gestures', () => {
    // The mouse down at `from` and moved to `to`, as a drag.
    const drag = (graph: Graph, from: XY, to: XY, id = 1) => {
        const layer = graph.rootSVG.last().node
        fireEvent(layer, 'pointerdown', {pointerId: id, pointerType: 'mouse', button: 0, clientX: from.x, clientY: from.y})
        fireEvent(layer, 'pointermove', {pointerId: id, pointerType: 'mouse', clientX: to.x, clientY: to.y})
        fireEvent(layer, 'pointerup', {pointerId: id, pointerType: 'mouse'})
    }

    test('a drag in the mode moves the drawing, once the frame comes', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const start = origin(graph)
        zoom.navigating = true

        drag(graph, {x: 100, y: 100}, {x: 140, y: 120})
        expect(origin(graph)).toEqual(start)
        frames.at(16)

        expect(origin(graph).x).toBeCloseTo(start.x + 40, 8)
        expect(origin(graph).y).toBeCloseTo(start.y + 20, 8)
    })

    test('many moves in a frame draw the layout once', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const update = vi.spyOn(graph, 'updateLayout')
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'mouse', button: 0, clientX: 0, clientY: 0})
        fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 10, clientY: 0})
        fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 25, clientY: 0})
        fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 30, clientY: 0})
        frames.at(16)

        expect(update).toHaveBeenCalledOnce()
        expect(origin(graph).x).toBeCloseTo(graph.config.width / 2 + 30, 8)
    })

    test('the right button of the mouse does not move the drawing', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const start = origin(graph)
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'mouse', button: 2, clientX: 0, clientY: 0})
        fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 50, clientY: 50})
        frames.at(16)

        expect(origin(graph)).toEqual(start)
    })

    test('the wheel in the mode zooms around the cursor, and the page does not scroll', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const cursor = {x: 200, y: 150}
        const under = toCoordinates(cursor, graph.config)
        zoom.navigating = true

        const event = fireEvent(graph.rootSVG.last().node, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: false, clientX: cursor.x, clientY: cursor.y})
        frames.at(16)

        expect(event.defaultPrevented).toBe(true)
        expect(zoom.scale.x).toBeCloseTo(Math.exp(100 * 0.0015), 8)
        const now = toPixels(under, graph.config)
        expect(now.x).toBeCloseTo(cursor.x, 6)
        expect(now.y).toBeCloseTo(cursor.y, 6)
    })

    test('the wheel turned the other way zooms out', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        zoom.navigating = true

        fireEvent(graph.rootSVG.last().node, 'wheel', {deltaY: 100, deltaMode: 0, clientX: 10, clientY: 10})
        frames.at(16)

        expect(zoom.scale.x).toBeLessThan(1)
    })

    test('Ctrl and the wheel zoom outside the mode, the wheel alone does not', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const root = graph.rootSVG.node

        const plain = fireEvent(root, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: false, clientX: 10, clientY: 10})
        frames.at(16)
        expect(zoom.scale.x).toBe(1)
        expect(plain.defaultPrevented).toBe(false)

        const withCtrl = fireEvent(root, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: true, clientX: 10, clientY: 10})
        frames.at(32)
        expect(zoom.scale.x).toBeGreaterThan(1)
        expect(withCtrl.defaultPrevented).toBe(true)
    })

    test('Ctrl and the wheel are not listened to without gestures', () => {
        const {zoom, graph, frames} = setup()

        fireEvent(graph.rootSVG.node, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: true, clientX: 10, clientY: 10})
        frames.at(16)

        expect(zoom.scale.x).toBe(1)
    })

    test('Ctrl and the wheel in the mode are taken once, not twice', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        zoom.navigating = true

        fireEvent(graph.rootSVG.last().node, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: true, clientX: 10, clientY: 10})
        frames.at(16)

        expect(zoom.scale.x).toBeCloseTo(Math.exp(100 * 0.0015), 8)
    })

    test('two fingers apart zoom around where they were, and the move of their middle moves the drawing', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        zoom.navigating = true
        const layer = graph.rootSVG.last().node
        const under = toCoordinates({x: 400, y: 300}, graph.config)

        fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'touch', clientX: 300, clientY: 300})
        fireEvent(layer, 'pointerdown', {pointerId: 2, pointerType: 'touch', clientX: 500, clientY: 300})
        // The second finger goes 200 pixels to the right: the gap doubles and the middle goes 100 pixels to the right.
        fireEvent(layer, 'pointermove', {pointerId: 2, pointerType: 'touch', clientX: 700, clientY: 300})
        frames.at(16)

        expect(zoom.scale.x).toBeCloseTo(2, 8)
        const now = toPixels(under, graph.config)
        expect(now.x).toBeCloseTo(500, 6)
        expect(now.y).toBeCloseTo(300, 6)
    })

    test('one finger moves the drawing', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const start = origin(graph)
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        fireEvent(layer, 'pointerdown', {pointerId: 7, pointerType: 'touch', clientX: 50, clientY: 50})
        fireEvent(layer, 'pointermove', {pointerId: 7, pointerType: 'touch', clientX: 10, clientY: 80})
        frames.at(16)

        expect(origin(graph).x).toBeCloseTo(start.x - 40, 8)
        expect(origin(graph).y).toBeCloseTo(start.y + 30, 8)
    })

    test('a finger that went up does not move the drawing', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        const start = origin(graph)
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        fireEvent(layer, 'pointerdown', {pointerId: 7, pointerType: 'touch', clientX: 50, clientY: 50})
        fireEvent(layer, 'pointerup', {pointerId: 7, pointerType: 'touch'})
        fireEvent(layer, 'pointermove', {pointerId: 7, pointerType: 'touch', clientX: 90, clientY: 90})
        frames.at(16)

        expect(origin(graph)).toEqual(start)
    })

    test('a gesture that was not drawn yet is drawn when the mode is left', () => {
        const {zoom, graph} = setup({gestures: true})
        const start = origin(graph)
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'mouse', button: 0, clientX: 0, clientY: 0})
        fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 60, clientY: 0})
        zoom.navigating = false

        expect(origin(graph).x).toBeCloseTo(start.x + 60, 8)
    })

    test('the gestures stop at the limits of the zoom', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        zoom.navigating = true
        const layer = graph.rootSVG.last().node

        for (let step = 0; step < 30; step++) {
            fireEvent(layer, 'wheel', {deltaY: -1000, deltaMode: 0, clientX: 400, clientY: 300})
            frames.at(16 * (step + 1))
        }

        expect(zoom.scale.x).toBeCloseTo(ZOOM_LIMITS.max, 6)
    })

    describe('zoom only', () => {
        test('a drag does nothing, the wheel and the pinch zoom around the origin', () => {
            const {zoom, graph, frames} = setup({gestures: true, allow: 'zoom'})
            const start = origin(graph)
            zoom.navigating = true
            const layer = graph.rootSVG.last().node

            fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'mouse', button: 0, clientX: 0, clientY: 0})
            fireEvent(layer, 'pointermove', {pointerId: 1, pointerType: 'mouse', clientX: 80, clientY: 80})
            fireEvent(layer, 'pointerup', {pointerId: 1, pointerType: 'mouse'})
            frames.at(16)
            expect(origin(graph)).toEqual(start)

            fireEvent(layer, 'wheel', {deltaY: -100, deltaMode: 0, clientX: 10, clientY: 10})
            frames.at(32)
            expect(zoom.scale.x).toBeGreaterThan(1)
            expect(origin(graph).x).toBeCloseTo(start.x, 6)
            expect(origin(graph).y).toBeCloseTo(start.y, 6)
        })
    })

    describe('move only', () => {
        test('the wheel is left to the page, a pinch moves and does not zoom', () => {
            const {zoom, graph, frames} = setup({gestures: true, allow: 'move'})
            const start = origin(graph)
            zoom.navigating = true
            const layer = graph.rootSVG.last().node

            const wheel = fireEvent(layer, 'wheel', {deltaY: -100, deltaMode: 0, clientX: 10, clientY: 10})
            frames.at(16)
            expect(wheel.defaultPrevented).toBe(false)
            expect(zoom.scale.x).toBe(1)

            fireEvent(layer, 'pointerdown', {pointerId: 1, pointerType: 'touch', clientX: 300, clientY: 300})
            fireEvent(layer, 'pointerdown', {pointerId: 2, pointerType: 'touch', clientX: 500, clientY: 300})
            fireEvent(layer, 'pointermove', {pointerId: 2, pointerType: 'touch', clientX: 700, clientY: 300})
            frames.at(32)

            expect(zoom.scale.x).toBe(1)
            expect(origin(graph).x).toBeCloseTo(start.x + 100, 8)
        })

        test('Ctrl and the wheel do nothing outside the mode', () => {
            const {zoom, graph, frames} = setup({gestures: true, allow: 'move'})

            const event = fireEvent(graph.rootSVG.node, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: true, clientX: 10, clientY: 10})
            frames.at(16)

            expect(zoom.scale.x).toBe(1)
            expect(event.defaultPrevented).toBe(false)
        })
    })

    test('after dispose, Ctrl and the wheel do nothing', () => {
        const {zoom, graph, frames} = setup({gestures: true})
        zoom.dispose()

        fireEvent(graph.rootSVG.node, 'wheel', {deltaY: -100, deltaMode: 0, ctrlKey: true, clientX: 10, clientY: 10})
        frames.at(16)

        expect(zoom.scale.x).toBe(1)
    })
})
