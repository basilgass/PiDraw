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
    ease: (t: number) => number, // TODO: add easing to animation
    loop: LOOP_STYLE,
    reverse: boolean,
    startTime: number,
}

export class Animate {
    #graph: Graph
    #animatedPoints: Point[] = []

    #startTime = 0
    #elapsedAtPause = 0
    #paused = false

    #rafId: number | null = null

    #animations = new Map<string, animationParams>()

    constructor(graph: Graph) {
        this.#graph = graph

        this.#updatePoints()
    }

    start() {
        this.cancel() // stop previous if any

        this.#paused = false
        this.#startTime = 0
        this.#elapsedAtPause = 0

        // Set the starttime to every point
        this.#animations.forEach(anim => {
            anim.startTime = 0
        })

        this.#rafId = requestAnimationFrame(this.#step)
    }

    pause() {
        if (this.#rafId !== null) {
            cancelAnimationFrame(this.#rafId)
            this.#rafId = null
        }

        this.#paused = true
        this.#elapsedAtPause = performance.now()


    }

    resume() {
        if (this.#paused) {
            const pauseDuration = performance.now() - this.#elapsedAtPause

            this.#animations.forEach(anim => {
                anim.startTime += pauseDuration
            })

            this.#paused = false
            this.#rafId = requestAnimationFrame(this.#step)
        }
    }

    cancel() {
        if (this.#rafId !== null) {
            cancelAnimationFrame(this.#rafId)
            this.#rafId = null
        }

        this.#paused = false
        this.#elapsedAtPause = 0
        this.#startTime = 0


        setTimeout(() => {
            // Reset the graph
            this.#graph.update()

            // Reset the points after the graph update.
            this.#updatePoints()
        }, 200)
    }

    isRunning() {
        return this.#rafId !== null && !this.#paused
    }

    isPaused() {
        return this.#paused
    }

    canBeAnimated(): boolean {
        return this.#animations.size > 0
    }

    #updatePoints(): Point[] {
        this.#animations = new Map()

        Object.values(this.#graph.figures).forEach(figure => {
            if (isXY(figure) && figure.animate !== null) {
                const animate = figure.animate as unknown as IFigureAnimation
                const point = figure as Point

                console.log(animate)
                
                const from = animate.from as Point
                const to = animate.to as Point

                this.#animations.set(
                    figure.name,
                    {
                        point,
                        from: {x: +from.pixels.x, y: +from.pixels.y},
                        to: {x: +to.pixels.x, y: +to.pixels.y},
                        duration: animate.duration * 1000,  // ms
                        ease: (t: number) => t, // TODO: Add easing function
                        loop: animate.loop,
                        reverse: false,
                        startTime: 0
                    }
                )
            }
        })

        return this.#animatedPoints
    }

    #step = (now: number): void => {
        if (this.#startTime === 0) {
            this.#startTime = now - this.#elapsedAtPause
        }
        
        if (this.#paused) {
            return
        }

        let anyRunning = false

        for (const anim of this.#animations.values()) {
            if (anim.startTime === 0) {
                anim.startTime = this.#startTime
            }

            const elapsed = now - anim.startTime
            const t = Math.min(elapsed / anim.duration, 1)
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


        if (anyRunning) {
            this.#rafId = requestAnimationFrame(this.#step)
        } else {
            this.#rafId = null
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