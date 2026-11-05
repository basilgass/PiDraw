import type {AnimationEasing} from "../calculus/easing"

export type {AnimationEasing}
import type {Point} from "../figures/Point/Point"
import type {XY} from "../pidraw.common"

/** What an animation does when it reaches its end. */
export enum LoopStyle {
    /** Starts again from `from`. */
    RESET = 'reset',
    /** Goes back from `to` to `from`, then forward again. */
    REVERSE = 'reverse',
    /** Stops at `to`. */
    NONE = 'none'
}

/** The animation of a figure: a point moving from `from` to `to`. */
export interface IFigureAnimation {
    /** Where the point starts: a point (followed while it moves) or a position in coordinates. `null` when not given. */
    from: Point | XY | null,
    /** Where the point ends: a point or a position in coordinates. `null` when not given. */
    to: Point | XY | null,
    /** In seconds. */
    duration: number,
    /** How the point speeds up: the name of an easing (`linear`, `inOut`...). */
    easing: AnimationEasing,
    /** Before the animation starts, in seconds. */
    delay: number,
    loop: LoopStyle,
    /** Called when the animation ends. */
    callback?: () => void
}

/** The events of an `Animate`: they carry nothing, the type says what happened. */
export interface IAnimateEventMap {
    /** The animation began, or went on after a pause. */
    'start': null
    'pause': null
    /** Every animation reached its end and none loops: the animation is over. */
    'end': null
    /** The animation was stopped, or has nothing left to play because its points were removed. */
    'stop': null
}
