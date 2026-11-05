import type {Rect} from "@svgdotjs/svg.js"
import {
    boundedFactor,
    moveLayout,
    visibleWindow,
    windowLayout,
    ZOOM_LIMITS,
    zoomLayout,
    zoomRatio
} from "../calculus/computeZoom"
import {InvalidArgumentError, UnsupportedOperationError} from "../errors"
import type {Graph} from "../Graph"
import type {IGraphController} from "../Graph.types"
import type {IGraphConfig, XY} from "../pidraw.common"
import {type IZoomEventMap, type IZoomOptions, type ViewWindow, ZOOM_ALLOWS, type ZoomAllow} from "./Zoom.types"

/** The factor of a step of `zoomIn` and `zoomOut`. */
export const ZOOM_STEP = 1.25

/** How much a wheel turns the zoom: the factor of a notch of 100 pixels is `exp(100 * WHEEL_SPEED)`. */
const WHEEL_SPEED = 0.0015

/**
 * Zooms and moves the part of the plane that a graph shows: the drawing keeps its size, the units get longer or shorter and the origin moves.
 * It is made with the graph, `new Zoom(graph)`, and attaches itself to it; a graph has one. It is independent from the other controllers.
 *
 * What it may do is `allow` (`both`, `zoom` or `move`). The units never go below a hundredth or above a hundred times the ones at the start: a
 * zoom that would go beyond stops there. The points that were dragged or animated keep their place in the plane (see `Graph.updateLayout`).
 *
 * With `gestures: true` it may also listen to the mouse and the fingers: Ctrl and the wheel always zoom around the cursor, and in the mode of
 * navigation (`navigating`) a drag moves the drawing, the wheel zooms, and two fingers pinch to zoom and move. In that mode the points of the
 * drawing cannot be dragged: a layer over the drawing takes the mouse and the fingers.
 *
 * The events are `change` (the window that is shown, whoever changed the layout) and `navigation` (the mode was entered or left).
 */
export class Zoom extends EventTarget implements IGraphController {
    /** What the zoom may do. */
    readonly allow: ZoomAllow

    /** Whether the zoom may listen to the mouse and the fingers. */
    readonly gestures: boolean

    protected _graph: Graph

    /** The layout to which `reset` comes back: the one at the start, then the last one that someone else gave to the graph. */
    protected _home: IGraphConfig

    /** Whether the zoom is the one that changes the layout: `onLayoutChanged` is then no change of someone else. */
    protected _own = false

    protected _navigating = false

    /** The layer over the drawing that takes the mouse and the fingers in the mode of navigation. */
    protected _layer: Rect | null = null

    /** The layout that the gestures led to and that no frame drew yet: the next gesture goes on from it. */
    protected _pending: IGraphConfig | null = null

    protected _frame: number | null = null

    /** The fingers (or the mouse) that are down on the layer, by identifier, with their position in pixels of the drawing. */
    protected _pointers = new Map<number, XY>()

    /**
     * @throws InvalidArgumentError if `allow` is not one of `both`, `zoom` and `move`, or if the graph already has a `Zoom`.
     */
    constructor(graph: Graph, options: IZoomOptions = {}) {
        super()

        const allow = options.allow ?? 'both'

        if (!ZOOM_ALLOWS.includes(allow)) {
            throw new InvalidArgumentError(`Invalid zoom allow ${allow}: expected ${ZOOM_ALLOWS.join(', ')}`)
        }

        this.allow = allow
        this.gestures = options.gestures ?? false
        this._graph = graph
        graph.attach(this)

        this._home = structuredClone(graph.config)

        if (this.gestures && this.canZoom) {
            graph.rootSVG.node.addEventListener('wheel', this._ctrlWheel, {passive: false})
        }
    }

    /** Whether the zoom may change the length of a unit. */
    get canZoom(): boolean {
        return this.allow !== 'move'
    }

    /** Whether the zoom may move the origin. */
    get canMove(): boolean {
        return this.allow !== 'zoom'
    }

    /**
     * The part of the plane that the drawing shows, in units.
     * @throws MathError if the two axes of the graph are collinear.
     */
    get window(): ViewWindow {
        return visibleWindow(this._graph.config)
    }

    /** The length of a unit compared with the one at the start: 2 when it is twice as long. */
    get scale(): XY {
        return zoomRatio(this._graph.config, this._home)
    }

    /**
     * Makes the units `factor` times longer. The point of the drawing under `center` (in pixels, the middle of the drawing by default) stays
     * under it; with `allow: 'zoom'` the origin is the one that stays, and `center` is not used. Stops at the limits of the zoom.
     * @throws UnsupportedOperationError if the zoom may not zoom (`allow: 'move'`).
     * @throws InvalidArgumentError if `factor` is not a finite number greater than 0.
     */
    zoomIn(factor: number = ZOOM_STEP, center?: XY): void {
        this._zoom(factor, center)
    }

    /**
     * Makes the units `factor` times shorter: the opposite of {@link zoomIn}.
     * @throws UnsupportedOperationError if the zoom may not zoom (`allow: 'move'`).
     * @throws InvalidArgumentError if `factor` is not a finite number greater than 0.
     */
    zoomOut(factor: number = ZOOM_STEP, center?: XY): void {
        if (!Number.isFinite(factor) || factor <= 0) {
            throw new InvalidArgumentError(`Invalid zoom factor ${factor}: expected a finite number greater than 0`)
        }

        this._zoom(1 / factor, center)
    }

    /**
     * Shows exactly this part of the plane, each axis with its own length of unit.
     * @throws UnsupportedOperationError unless the zoom may both zoom and move (`allow: 'both'`).
     * @throws InvalidArgumentError if the window is not valid, the axes are not the usual ones, or the units it asks for go beyond the limits.
     */
    zoomTo(window: ViewWindow): void {
        this._requireZoom()
        this._requireMove()

        const next = windowLayout(this._current(), window)
        const ratio = zoomRatio(next, this._home)
        const outside = (value: number) => value < ZOOM_LIMITS.min || value > ZOOM_LIMITS.max

        if (outside(ratio.x) || outside(ratio.y)) {
            throw new InvalidArgumentError('This window needs units more than a hundred times shorter or longer than the ones at the start')
        }

        this._apply(next)
    }

    /**
     * Moves the origin by (`dx`, `dy`) pixels: the plane slides under the drawing.
     * @throws UnsupportedOperationError if the zoom may not move (`allow: 'zoom'`).
     * @throws InvalidArgumentError if `dx` or `dy` is not finite.
     */
    moveOrigin(dx: number, dy: number): void {
        this._requireMove()

        this._apply(moveLayout(this._current(), {x: dx, y: dy}))
    }

    /** Comes back to the layout at the start (or the last one that someone else gave to the graph). It is always allowed. */
    reset(): void {
        this._apply(structuredClone(this._home))
    }

    /** Whether the mode of navigation is on: see {@link gestures}. */
    get navigating(): boolean {
        return this._navigating
    }

    /**
     * Enters or leaves the mode of navigation. In it a layer over the drawing takes the mouse and the fingers: a drag moves the drawing (if the
     * zoom may move), the wheel zooms (if it may zoom), and two fingers pinch to zoom and move. The points cannot be dragged meanwhile.
     * @throws UnsupportedOperationError if the zoom was made without `gestures`.
     */
    set navigating(value: boolean) {
        if (!this.gestures) {
            throw new UnsupportedOperationError('This zoom was made without gestures: made it with {gestures: true} to navigate with the mouse and the fingers')
        }

        if (value === this._navigating) {
            return
        }

        if (value) {
            this._enter()
        } else {
            this._leave()
        }

        this._navigating = value
        this._emit('navigation', value)
    }

    /** Stops listening and takes the layer away. The layout stays as it is. */
    dispose(): void {
        this._cancelFrame()
        this._pending = null
        this._removeLayer()
        this._graph.rootSVG.node.removeEventListener('wheel', this._ctrlWheel)
        this._navigating = false
    }

    /** Someone else changed the layout: it becomes the one that `reset` comes back to. Either way, the window changed. */
    onLayoutChanged(config: IGraphConfig): void {
        if (!this._own) {
            this._home = structuredClone(config)
            this._pending = null
            this._cancelFrame()
        }

        this._layer?.size(config.width, config.height)
        this._emit('change', this.window)
    }

    /** Call `handler` when the zoom sends `event`. The same handler given twice is called once. @returns the zoom, to chain. */
    on<K extends keyof IZoomEventMap>(event: K, handler: (e: CustomEvent<IZoomEventMap[K]>) => void): this {
        this.addEventListener(event, handler as EventListener)

        return this
    }

    /** Stop calling a handler given to {@link on}. @returns the zoom, to chain. */
    off<K extends keyof IZoomEventMap>(event: K, handler: (e: CustomEvent<IZoomEventMap[K]>) => void): this {
        this.removeEventListener(event, handler as EventListener)

        return this
    }

    protected _emit<K extends keyof IZoomEventMap>(event: K, detail: IZoomEventMap[K]): void {
        this.dispatchEvent(new CustomEvent(event, {detail}))
    }

    protected _requireZoom(): void {
        if (!this.canZoom) {
            throw new UnsupportedOperationError('This zoom may only move (allow: "move"): it cannot change the length of a unit')
        }
    }

    protected _requireMove(): void {
        if (!this.canMove) {
            throw new UnsupportedOperationError('This zoom may only zoom (allow: "zoom"): the origin stays where it is')
        }
    }

    /** The layout to go on from: the one that the gestures led to if no frame drew it yet, the one of the graph otherwise. */
    protected _current(): IGraphConfig {
        return this._pending ?? this._graph.config
    }

    /** The point that stays when the units change: the origin with `allow: 'zoom'`, the given point, or the middle of the drawing. */
    protected _fixed(center?: XY): XY {
        const config = this._current()

        if (this.allow === 'zoom') {
            return config.origin
        }

        return center ?? {x: config.width / 2, y: config.height / 2}
    }

    protected _zoom(factor: number, center?: XY): void {
        this._requireZoom()

        const config = this._current()
        const bounded = boundedFactor(factor, zoomRatio(config, this._home))

        if (bounded === 1) {
            return
        }

        this._apply(zoomLayout(config, bounded, this._fixed(center)))
    }

    /** Draw the layout now, unless it is the one that is drawn. */
    protected _apply(next: IGraphConfig): void {
        this._pending = null
        this._cancelFrame()

        const current = this._graph.config
        const same = next.origin.x === current.origin.x && next.origin.y === current.origin.y
            && next.axis.x.x === current.axis.x.x && next.axis.x.y === current.axis.x.y
            && next.axis.y.x === current.axis.y.x && next.axis.y.y === current.axis.y.y

        if (same) {
            return
        }

        this._own = true

        try {
            this._graph.updateLayout(next)
        } finally {
            this._own = false
        }
    }

    protected _cancelFrame(): void {
        if (this._frame !== null) {
            cancelAnimationFrame(this._frame)
            this._frame = null
        }
    }

    /** Puts the layer over the drawing, which takes the mouse and the fingers. */
    protected _enter(): void {
        const {width, height} = this._graph.config
        const layer = this._graph.rootSVG.rect(width, height).fill({color: '#000', opacity: 0}).attr({'pointer-events': 'all'})
        layer.css({touchAction: 'none', cursor: this.canMove ? 'grab' : 'default'})

        const node = layer.node
        node.addEventListener('pointerdown', this._down)
        node.addEventListener('pointermove', this._moved)
        node.addEventListener('pointerup', this._up)
        node.addEventListener('pointercancel', this._up)
        node.addEventListener('wheel', this._wheel, {passive: false})

        this._layer = layer
    }

    /** Takes the layer away. What the last gestures led to is drawn first. */
    protected _leave(): void {
        this._flushNow()
        this._pointers.clear()
        this._removeLayer()
    }

    protected _removeLayer(): void {
        this._layer?.remove()
        this._layer = null
        this._pointers.clear()
    }

    /** Where an event of the mouse or of a finger is, in pixels of the drawing. */
    protected _local(event: MouseEvent): XY {
        const box = this._graph.rootSVG.node.getBoundingClientRect()
        const {width, height} = this._graph.config

        return {
            x: box.width > 0 ? (event.clientX - box.left) * width / box.width : event.clientX,
            y: box.height > 0 ? (event.clientY - box.top) * height / box.height : event.clientY
        }
    }

    /** The layout that gestures led to is drawn at the next frame: a gesture sends many events, the drawing is made again once for them. */
    protected _schedule(next: IGraphConfig): void {
        this._pending = next

        this._frame ??= requestAnimationFrame(this._flush)
    }

    protected _flush = (): void => {
        this._frame = null

        this._flushNow()
    }

    protected _flushNow(): void {
        const next = this._pending

        this._cancelFrame()
        this._pending = null

        if (next !== null) {
            this._apply(next)
        }
    }

    protected _down = (event: PointerEvent): void => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return
        }

        event.preventDefault()

        try {
            this._layer?.node.setPointerCapture(event.pointerId)
        } catch {
            // The pointer is already gone, or the page cannot capture it: the layer still gets what happens over it.
        }

        this._pointers.set(event.pointerId, this._local(event))

        if (this.canMove) {
            this._layer?.css({cursor: 'grabbing'})
        }
    }

    protected _moved = (event: PointerEvent): void => {
        const before = this._pointers.get(event.pointerId)

        if (before === undefined) {
            return
        }

        const after = this._local(event)
        const previous = [...this._pointers.values()]
        this._pointers.set(event.pointerId, after)
        event.preventDefault()

        if (previous.length === 1) {
            if (this.canMove) {
                this._schedule(moveLayout(this._current(), {x: after.x - before.x, y: after.y - before.y}))
            }

            return
        }

        this._pinch([previous[0], previous[1]], [...this._pointers.values()].slice(0, 2) as [XY, XY])
    }

    protected _up = (event: PointerEvent): void => {
        this._pointers.delete(event.pointerId)

        if (this._pointers.size === 0 && this.canMove) {
            this._layer?.css({cursor: 'grab'})
        }
    }

    /** Two fingers: the gap between them zooms around where they were, and the move of their middle moves the drawing. */
    protected _pinch(before: [XY, XY], after: [XY, XY]): void {
        const middle = ([a, b]: [XY, XY]): XY => ({x: (a.x + b.x) / 2, y: (a.y + b.y) / 2})
        const gap = ([a, b]: [XY, XY]): number => Math.hypot(a.x - b.x, a.y - b.y)

        let config = this._current()

        if (this.canZoom && gap(before) > 0 && gap(after) > 0) {
            const factor = boundedFactor(gap(after) / gap(before), zoomRatio(config, this._home))

            if (factor !== 1) {
                config = zoomLayout(config, factor, this._fixed(middle(before)))
            }
        }

        if (this.canMove) {
            const from = middle(before)
            const to = middle(after)
            config = moveLayout(config, {x: to.x - from.x, y: to.y - from.y})
        }

        this._schedule(config)
    }

    /** The wheel in the mode of navigation. Without the right to zoom, the page keeps the wheel. */
    protected _wheel = (event: WheelEvent): void => {
        if (!this.canZoom) {
            return
        }

        event.preventDefault()
        this._wheelBy(event)
    }

    /** Ctrl and the wheel (a pinch on a touchpad is sent as such), outside the mode of navigation. */
    protected _ctrlWheel = (event: WheelEvent): void => {
        if (this._navigating || !event.ctrlKey) {
            return
        }

        event.preventDefault()
        this._wheelBy(event)
    }

    protected _wheelBy(event: WheelEvent): void {
        const lines = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1
        const factor = Math.exp(-event.deltaY * lines * WHEEL_SPEED)

        if (!Number.isFinite(factor) || factor <= 0) {
            return
        }

        const config = this._current()
        const bounded = boundedFactor(factor, zoomRatio(config, this._home))

        if (bounded !== 1) {
            this._schedule(zoomLayout(config, bounded, this._fixed(this._local(event))))
        }
    }
}
