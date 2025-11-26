/**
 * This file contains everything related to animation.
 */
import {type Graph} from "./Graph"
import type {Point} from "./figures/Point"
import {type IFigureAnimation, isXY, type XY} from "./pidraw.common"

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
    protected _animatedPoints: string[] = []

    protected _startTime = 0
    protected _elapsedAtPause = 0
    protected _paused = false

    protected _rafId: number | null = null

    protected _animations = new Map<string, animationParams>()

    constructor(graph: Graph) {
        this._graph = graph

        this._updatePoints()
    }

    start() {
        this.cancel() // stop previous if any

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


        setTimeout(() => {
            // Reset the graph
            this._graph.update()

            // Reset the points after the graph update.
            this._updatePoints()
        }, 200)
    }

    isRunning() {
        return this._rafId !== null && !this._paused
    }

    isPaused() {
        return this._paused
    }

    canBeAnimated(): boolean {
        return this._animations.size > 0
    }

    _updatePoints(): string[] {
        this._animations = new Map()
        this._animatedPoints = []

        Object.values(this._graph.figures).forEach(figure => {
            if (isXY(figure) && figure.animate !== null) {
                const animate = figure.animate as unknown as IFigureAnimation
                const point = figure as Point

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

                this._animatedPoints.push(figure.name)
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
                anim.point.x = anim.from.x
                anim.point.y = anim.from.y
                anyRunning = true
                continue
            }

            const effectiveElapsed = elapsed - anim.delay
            const t = Math.min(effectiveElapsed / anim.duration, 1)
            const e = anim.ease(t)

            anim.point.x = anim.from.x + (anim.to.x - anim.from.x) * e
            anim.point.y = anim.from.y + (anim.to.y - anim.from.y) * e

            if(t < 1) {
                anyRunning = true
            }else if(anim.loop === LOOP_STYLE.RESET){
                anim.point.x = anim.from.x
                anim.point.y = anim.from.y
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