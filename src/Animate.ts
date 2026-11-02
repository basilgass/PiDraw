/**
 * This file contains everything related to animation.
 */
import type {Graph} from "./Graph"
import {Point} from "./figures/Point/Point"
import type {XY} from "./pidraw.common"

export enum LOOP_STYLE {
    RESET = 'reset',
    REVERSE = 'reverse',
    NONE = 'none'
}

interface animationParams {
    point: Point,
    from: XY,
    to: XY,
    duration: number,
    delay: number,
    ease: (t: number) => number, // TODO: add easing to animation
    loop: LOOP_STYLE,
    reverse: boolean,
    startTime: number,
}

export class Animate {
    protected _graph: Graph
    protected _animatedPoints: Point[] = []

    protected _startTime = 0
    protected _elapsedAtPause = 0
    protected _paused = false

    protected _rafId: number | null = null

    /** The reset that `cancel` plans, kept to be stopped. */
    protected _resetTimer: ReturnType<typeof setTimeout> | null = null

    protected _animations = new Map<string, animationParams>()

    constructor(graph: Graph) {
        this._graph = graph

        this._updatePoints()
    }

    start() {
        this.cancel() // stop previous if any

        // The figures may have changed since the animations were read.
        this._updatePoints()

        this._paused = false
        this._startTime = 0
        this._elapsedAtPause = 0

        // Set the starttime to every point
        this._animations.forEach(anim => {
            anim.startTime = 0
        })

        this._rafId = requestAnimationFrame(this._step)
    }

    pause() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId)
            this._rafId = null
        }

        this._paused = true
        this._elapsedAtPause = performance.now()


    }

    resume() {
        if (this._paused) {
            const pauseDuration = performance.now() - this._elapsedAtPause

            this._animations.forEach(anim => {
                anim.startTime += pauseDuration
            })

            this._paused = false
            this._rafId = requestAnimationFrame(this._step)
        }
    }

    cancel() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId)
            this._rafId = null
        }

        this._paused = false
        this._elapsedAtPause = 0
        this._startTime = 0

        this._clearReset()
        this._resetTimer = setTimeout(() => {
            this._resetTimer = null

            // Reset the graph
            this._graph.update()

            // Reset the points after the graph update.
            this._updatePoints()
        }, 200)
    }

    /**
     * Stop the animation, and the reset that `cancel` plans, and forget the points that were animated: the figures they belonged to are
     * gone (the graph was cleared or taken out of the page). `start` and `canBeAnimated` read the points again.
     */
    stop() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId)
            this._rafId = null
        }

        this._clearReset()
        this._paused = false
        this._elapsedAtPause = 0
        this._startTime = 0
        this._animations = new Map()
        this._animatedPoints = []
    }

    protected _clearReset(): void {
        if (this._resetTimer !== null) {
            clearTimeout(this._resetTimer)
            this._resetTimer = null
        }
    }

    isRunning() {
        return this._rafId !== null && !this._paused
    }

    isPaused() {
        return this._paused
    }

    /** Whether a point of the graph has an animation. The points are read again unless the animation is running or paused. */
    canBeAnimated(): boolean {
        if (!this.isRunning() && !this.isPaused()) {
            this._updatePoints()
        }

        return this._animations.size > 0
    }

    _updatePoints(): Point[] {
        this._animations = new Map()
        this._animatedPoints = []

        Object.values(this._graph.figures).forEach(figure => {
            // Only the points are played. Another kind of figure that can be animated needs its own case here.
            if (figure instanceof Point && figure.animate !== null) {
                const animate = figure.animate
                const point = figure

                // Point.animate checks that the animation of a point has a start and an end point.
                const from = animate.from as Point
                const to = animate.to as Point

                this._animations.set(
                    figure.name,
                    {
                        point,
                        from: {x: +from.pixels.x, y: +from.pixels.y},
                        to: {x: +to.pixels.x, y: +to.pixels.y},
                        duration: animate.duration * 1000,  // ms
                        ease: (t: number) => t, // TODO: Add easing function
                        loop: animate.loop,
                        reverse: false,
                        delay: animate.delay * 1000,
                        startTime: 0
                    }
                )

                this._animatedPoints.push(figure)
            }
        })

        return this._animatedPoints
    }

    _step = (now: number): void => {
        if (this._startTime === 0) {
            this._startTime = now - this._elapsedAtPause
        }
        
        if (this._paused) {
            return
        }

        let anyRunning = false

        for (const anim of this._animations.values()) {
            if (anim.startTime === 0) {
                anim.startTime = this._startTime
            }

            const elapsed = now - anim.startTime

            if(elapsed < anim.delay){
                anim.point.pixels = anim.from
                anyRunning = true
                continue
            }

            const effectiveElapsed = elapsed - anim.delay
            const t = Math.min(effectiveElapsed / anim.duration, 1)
            const e = anim.ease(t)

            anim.point.pixels = {
                x: anim.from.x + (anim.to.x - anim.from.x) * e,
                y: anim.from.y + (anim.to.y - anim.from.y) * e
            }

            if(t < 1) {
                anyRunning = true
            }else if(anim.loop === LOOP_STYLE.RESET){
                anim.point.pixels = anim.from
                anim.startTime = now
                anyRunning = true
            }else if(anim.loop === LOOP_STYLE.REVERSE){
                [anim.from, anim.to] = [anim.to, anim.from]
                anim.startTime = now
                anyRunning = true
            }
        }

        // Update the other figures.
        this._graph.update(this._animatedPoints)

        if (anyRunning) {
            this._rafId = requestAnimationFrame(this._step)
        } else {
            this._rafId = null
        }
    }
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function getLoopStyle(loop: string | boolean | number): LOOP_STYLE {
    if (loop === true || loop === '1' || loop === 1) {
        return LOOP_STYLE.RESET
    }

    // Vérifie si loop est une valeur valide de l'enum
    if (typeof loop === 'string' && Object.values(LOOP_STYLE).includes(loop as LOOP_STYLE)) {
        return loop as LOOP_STYLE
    }

    return LOOP_STYLE.NONE
}