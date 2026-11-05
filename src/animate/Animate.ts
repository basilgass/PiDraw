import {EASINGS} from "../calculus/easing"
import type {Graph} from "../Graph"
import type {IGraphController} from "../Graph.types"
import {Point} from "../figures/Point/Point"
import {animationOf} from "./animation"
import type {IAnimateEventMap} from "./Animate.types"
import {LoopStyle} from "./Animate.types"

/**
 * The longest time that one frame adds to the animation, in milliseconds. A hidden page gets no frames: without this limit the first
 * frame back would jump ahead by the whole time it was hidden. The animation waits instead.
 */
const MAX_FRAME_STEP = 100

interface AnimationParams {
    point: Point,
    /** Where the point starts and where it ends. They are read at each frame, so that a point that is moved, or a new scale, is followed. */
    start: Point,
    end: Point,
    /** Whether the point goes from `end` to `start`: a loop that goes back. */
    reversed: boolean,
    duration: number,
    delay: number,
    ease: (t: number) => number,
    loop: LoopStyle,
    /** How long this animation was played, in milliseconds: the frames add to it, a pause does not. */
    elapsed: number,
}

/**
 * Plays the animation of the points of a graph (the option `animate`): each point goes from the point `from` to the point `to`, and the figures
 * built on it follow. It is made with the graph, `new Animate(graph)`, and attaches itself to it; a graph has one. The program calls the methods
 * below, and a page that shows buttons listens to the events (`on`).
 *
 * The events are `start` (the animation began, or went on after a pause), `pause`, `end` (every animation reached its end, and none loops) and
 * `stop`.
 */
export class Animate extends EventTarget implements IGraphController {
    protected _graph: Graph
    protected _animatedPoints: Point[] = []

    /** The instant of the last frame. `null` before the first frame and after a pause: the next frame has no frame to be measured from. */
    protected _last: number | null = null
    protected _paused = false

    protected _rafId: number | null = null

    /** The reset that `stop` plans, kept to be stopped. */
    protected _resetTimer: ReturnType<typeof setTimeout> | null = null

    protected _animations = new Map<string, AnimationParams>()

    /**
     * @throws InvalidArgumentError if the graph already has an `Animate`.
     */
    constructor(graph: Graph) {
        super()
        this._graph = graph
        graph.attach(this)

        this._updatePoints()
    }

    /**
     * Starts the animation from the beginning. After a pause it goes on from where it was, and while it runs it does nothing
     * (see {@link restart}). The points are read again when it starts from the beginning.
     */
    start(): void {
        if (this.isRunning()) {
            return
        }

        if (this._paused) {
            this._paused = false
            this._last = null
            this._rafId = requestAnimationFrame(this._step)
            this._emit('start')

            return
        }

        this._begin()
    }

    /** Stops it where it is, to go on with {@link start}. Does nothing unless the animation runs. */
    pause(): void {
        if (this._rafId === null || this._paused) {
            return
        }

        cancelAnimationFrame(this._rafId)
        this._rafId = null
        this._paused = true
        this._last = null
        this._emit('pause')
    }

    /** Starts again from the beginning, whether it runs, is paused or is over. */
    restart(): void {
        this._begin()
    }

    /**
     * Stops the animation, and puts the points back where the code says (after a short delay, once the last frame is drawn). Does nothing
     * to an animation that is over, except putting the points back. The event `stop` is sent only if the animation ran or was paused.
     */
    stop(): void {
        const active = this.isRunning() || this._paused

        this._halt()

        this._resetTimer = setTimeout(() => {
            this._resetTimer = null

            // Reset the graph
            this._graph.update()

            // Reset the points after the graph update.
            this._updatePoints()
        }, 200)

        if (active) {
            this._emit('stop')
        }
    }

    /**
     * Stops the animation and forgets the points that were animated, to let go of what the animation holds. The graph calls it when it is taken
     * out of the page. {@link start} and {@link canBeAnimated} read the points again.
     */
    dispose(): void {
        this._halt()
        this._animations = new Map()
        this._animatedPoints = []
    }

    /**
     * Forgets the animations of the points that were removed from the graph, and of the points that end at a removed point. If nothing is left
     * to play, a running animation stops.
     */
    onFiguresRemoved(names: string[]): void {
        const gone = (figure: unknown): boolean => figure instanceof Point && names.includes(figure.name)

        for (const [name, anim] of this._animations) {
            const animate = animationOf(anim.point)

            if (gone(anim.point) || gone(animate?.from) || gone(animate?.to)) {
                this._animations.delete(name)
            }
        }

        this._animatedPoints = [...this._animations.values()].map(anim => anim.point)

        if (this._animations.size === 0 && (this.isRunning() || this._paused)) {
            this._halt()
            this._emit('stop')
        }
    }

    /** Whether the animation is playing. */
    isRunning(): boolean {
        return this._rafId !== null && !this._paused
    }

    /** Whether the animation is stopped by {@link pause}. */
    isPaused(): boolean {
        return this._paused
    }

    /** Whether a point of the graph has an animation. The points are read again unless the animation is running or paused. */
    canBeAnimated(): boolean {
        if (!this.isRunning() && !this._paused) {
            this._updatePoints()
        }

        return this._animations.size > 0
    }

    /** Call `handler` when the animation sends `event`. The same handler given twice is called once. @returns the animation, to chain. */
    on<K extends keyof IAnimateEventMap>(event: K, handler: (e: CustomEvent<IAnimateEventMap[K]>) => void): this {
        this.addEventListener(event, handler as EventListener)

        return this
    }

    /** Stop calling a handler given to {@link on}. @returns the animation, to chain. */
    off<K extends keyof IAnimateEventMap>(event: K, handler: (e: CustomEvent<IAnimateEventMap[K]>) => void): this {
        this.removeEventListener(event, handler as EventListener)

        return this
    }

    protected _emit(event: keyof IAnimateEventMap): void {
        this.dispatchEvent(new CustomEvent(event))
    }

    /** Starts every animation from the beginning, whatever the animation was doing. */
    protected _begin(): void {
        this._halt()

        // The figures may have changed since the animations were read.
        this._updatePoints()

        this._rafId = requestAnimationFrame(this._step)
        this._emit('start')
    }

    /** Stop the frames and the planned reset. Nothing is read or forgotten. */
    protected _halt(): void {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId)
            this._rafId = null
        }

        if (this._resetTimer !== null) {
            clearTimeout(this._resetTimer)
            this._resetTimer = null
        }

        this._paused = false
        this._last = null
    }

    /**
     * Read the animations of the points of the graph, from the beginning. Only a point whose animation goes from a point to a point is played:
     * `setAnimation` checks it, and the type of `IFigureAnimation` leaves the door open for another kind of start.
     * @returns the points that are animated.
     */
    protected _updatePoints(): Point[] {
        this._animations = new Map()
        this._animatedPoints = []

        Object.values(this._graph.figures).forEach(figure => {
            // Only the points are played. Another kind of figure that can be animated needs its own case here.
            if (!(figure instanceof Point)) {
                return
            }

            const animation = animationOf(figure)

            if (animation === null) {
                return
            }

            const {from, to, duration, delay, easing, loop} = animation

            if (!(from instanceof Point) || !(to instanceof Point)) {
                return
            }

            this._animations.set(figure.name, {
                point: figure,
                start: from,
                end: to,
                reversed: false,
                duration: duration * 1000,
                delay: delay * 1000,
                ease: EASINGS[easing],
                loop,
                elapsed: 0
            })

            this._animatedPoints.push(figure)
        })

        return this._animatedPoints
    }

    /**
     * One frame of the browser: moves every point, draws again what depends on them, and asks for the next frame unless every animation
     * is over. The ends of a point are read here, at each frame, in the pixels of the moment.
     */
    protected _step = (now: number): void => {
        if (this._paused) {
            return
        }

        // The time of this frame is the one since the last frame, without the pauses and not more than a limit.
        const step = this._last === null ? 0 : Math.min(Math.max(now - this._last, 0), MAX_FRAME_STEP)
        this._last = now

        let anyRunning = false

        for (const anim of this._animations.values()) {
            anim.elapsed += step

            const from = anim.reversed ? anim.end.pixels : anim.start.pixels
            const to = anim.reversed ? anim.start.pixels : anim.end.pixels

            if (anim.elapsed < anim.delay) {
                anim.point.pixels = from
                anyRunning = true
                continue
            }

            const effectiveElapsed = anim.elapsed - anim.delay
            const t = Math.min(effectiveElapsed / anim.duration, 1)
            const e = anim.ease(t)

            anim.point.pixels = {
                x: from.x + (to.x - from.x) * e,
                y: from.y + (to.y - from.y) * e
            }

            if (t < 1) {
                anyRunning = true
            } else if (anim.loop === LoopStyle.RESET) {
                anim.point.pixels = from
                anim.elapsed = 0
                anyRunning = true
            } else if (anim.loop === LoopStyle.REVERSE) {
                anim.reversed = !anim.reversed
                anim.elapsed = 0
                anyRunning = true
            }
        }

        // Update the other figures.
        this._graph.update(this._animatedPoints)

        if (anyRunning) {
            this._rafId = requestAnimationFrame(this._step)
        } else {
            this._rafId = null
            this._emit('end')
        }
    }
}
