import {EASINGS} from "../calculus/easing"
import {InvalidArgumentError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import {Point} from "../figures/Point/Point"
import {LoopStyle} from "./Animate.types"
import type {IFigureAnimation} from "./Animate.types"

/** The animation of the figure, `null` for none. */
export function animationOf(figure: AbstractFigure): IFigureAnimation | null {
    return figure.controls.animate ?? null
}

/**
 * Give a point its animation, or take it away with `null` (always possible). Only a point can be animated, from a point to a point: the code that
 * plays the animations (`Animate`) has to know how to play a figure, so another kind of figure has its own case here and there.
 * @throws InvalidArgumentError if the figure is not a point, if the duration is not a finite number greater than 0, if the delay is not a finite
 * number of 0 or more, if the easing or the loop do not exist, or if the animation has no start point or no end point (`from` and `to`).
 * The animation of the figure is then left unchanged.
 */
export function setAnimation(figure: AbstractFigure, animation: IFigureAnimation | null): void {
    if (animation !== null) {
        checkAnimation(figure, animation)
    }

    figure.setControl('animate', animation)
}

function checkAnimation(figure: AbstractFigure, animation: IFigureAnimation): void {
    const name = figure.name

    if (!(figure instanceof Point)) {
        throw new InvalidArgumentError(`The figure "${name}" cannot be animated`)
    }

    if (!Number.isFinite(animation.duration) || animation.duration <= 0) {
        throw new InvalidArgumentError(`Invalid duration ${animation.duration} for the animation of "${name}": expected a number greater than 0`)
    }

    if (!Number.isFinite(animation.delay) || animation.delay < 0) {
        throw new InvalidArgumentError(`Invalid delay ${animation.delay} for the animation of "${name}": expected a number of 0 or more`)
    }

    if (!Object.hasOwn(EASINGS, animation.easing)) {
        throw new InvalidArgumentError(`Invalid easing ${animation.easing} for the animation of "${name}": expected ${Object.keys(EASINGS).join(', ')}`)
    }

    if (!Object.values<string>(LoopStyle).includes(animation.loop)) {
        throw new InvalidArgumentError(`Invalid loop ${animation.loop} for the animation of "${name}": expected ${Object.values(LoopStyle).join(', ')}`)
    }

    if (!(animation.from instanceof Point) || !(animation.to instanceof Point)) {
        throw new InvalidArgumentError(`The animation of the point "${name}" needs a start and an end point (from, to)`)
    }
}
