/**
 * How an animation speeds up: each easing turns the progress of the animation, from 0 to 1 in time, into the progress of the movement, from 0
 * to 1 in distance. To add one, add a line: its name is the one the option `easing` accepts, and the type, the checks and the messages follow.
 */
export const EASINGS = {
    /** At a constant speed. */
    linear: (t: number) => t,
    /** Slowly at the start and at the end (a cubic curve). */
    inOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
} as const

/** The name of an easing. */
export type AnimationEasing = keyof typeof EASINGS
