import {type AnimationEasing, EASINGS} from "../calculus/easing"
import {InvalidArgumentError, OptionError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import {Point} from "../figures/Point/Point"
import {invalidOption} from "../parser/parser.common"
import type {IThemeSyntax, OptionHandler} from "../parser/parser.types"
import {setAnimation} from "./animation"
import {LoopStyle} from "./Animate.types"
import type {IFigureAnimation} from "./Animate.types"

// What the theme adds to the language of the code: the option `animate` and the options that describe the animation. The registry
// (controls/controls.ts) is the only place that names this file.

/** The options that are part of the animation, and mean nothing without `animate`. */
const ANIMATION_PARTS = ['from', 'to', 'duration', 'delay', 'easing', 'loop']

/**
 * The point named by the option `from` or `to` of an animation.
 * @throws InvalidArgumentError if the name is not the one of a point of the drawing.
 */
export function animationPoint(name: unknown, option: 'from' | 'to', figures: Record<string, AbstractFigure>): Point {
    const figure = typeof name === 'string' && Object.hasOwn(figures, name) ? figures[name] : undefined

    if (!(figure instanceof Point)) {
        throw new InvalidArgumentError(`The option ${option}=${String(name)} of an animation must be the name of a point of the drawing`)
    }

    return figure
}

/** The styles of loop by their name. */
const LOOP_STYLES: Readonly<Record<string, LoopStyle>> = Object.fromEntries(Object.values(LoopStyle).map(style => [style, style]))

/**
 * The loop of an animation from the value of `loop`: `loop` and `loop=1` (reset), or the name of a style.
 * @throws OptionError for any other value.
 */
export function getLoopStyle(loop: unknown, figure: AbstractFigure): LoopStyle {
    if (loop === true || loop === '1' || loop === 1) {
        return LoopStyle.RESET
    }

    if (typeof loop === 'string' && Object.hasOwn(LOOP_STYLES, loop)) {
        return LOOP_STYLES[loop]
    }

    throw invalidOption('loop', figure, loop, `loop alone, or one of ${Object.keys(LOOP_STYLES).join(', ')}`)
}

/**
 * The easing of an animation from the value of `easing`.
 * @throws OptionError if it is not the name of an easing.
 */
export function getEasing(easing: unknown, figure: AbstractFigure): AnimationEasing {
    if (typeof easing === 'string' && Object.hasOwn(EASINGS, easing)) {
        return easing as AnimationEasing
    }

    throw invalidOption('easing', figure, easing, Object.keys(EASINGS).join(', '))
}

const applyAnimate: OptionHandler = (figure, _, {graph, options}) => {
    const animate: IFigureAnimation = {
        from: null,
        to: null,
        duration: 2,
        delay: 0,
        easing: 'linear',
        loop: LoopStyle.NONE,
    }

    // Whether the figure needs a start and an end point is for the theme to say (setAnimation below).
    if (Object.hasOwn(options, 'from')) {
        animate.from = animationPoint(options.from.value, 'from', graph.figures)
    }

    if (Object.hasOwn(options, 'to')) {
        animate.to = animationPoint(options.to.value, 'to', graph.figures)
    }

    if (Object.hasOwn(options, 'duration')) {
        animate.duration = options.duration.value as number
    }

    if (Object.hasOwn(options, 'delay')) {
        animate.delay = options.delay.value as number
    }

    if (Object.hasOwn(options, 'easing')) {
        animate.easing = getEasing(options.easing.value, figure)
    }

    if (Object.hasOwn(options, 'loop')) {
        animate.loop = getLoopStyle(options.loop.value, figure)
    }

    setAnimation(figure, animate)
}

/** The syntax of the theme. */
export const ANIMATE_SYNTAX: IThemeSyntax = {
    options: {
        animate: applyAnimate,
        ...Object.fromEntries(ANIMATION_PARTS.map((key): [string, OptionHandler] => [key, (figure, _, {options}) => {
            if (!Object.hasOwn(options, 'animate')) {
                throw new OptionError(key, `The option "${key}" is part of an animation: "${figure.name}" needs "animate"`)
            }
        }]))
    },
    optionDetails: {
        animate: 'animation of a point',
        from: 'from=A — start of the animation',
        to: 'to=B — end of the animation',
        duration: 'duration=3 — seconds',
        delay: 'delay=1 — seconds',
        easing: 'easing=linear|inOut',
        loop: 'loop=reset|reverse|none'
    },
    optionValues: {
        easing: ['linear', 'inOut'],
        loop: ['reset', 'reverse', 'none']
    }
}
