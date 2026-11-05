import type {PiParse, SET} from "piparser"
import {ParseError} from "../errors"
import {invalidOption} from "../parser/parser.common"
import type {ICommandSyntax, IThemeSyntax, OptionHandler} from "../parser/parser.types"
import {checkSlideSet, frozenSlide, setSlide} from "./slideSet"
import type {ISlideSet} from "./Slides.types"

// What the theme adds to the language of the code: the option `slide` and the commands `@pause`, `@slides` and `@title`. The registry
// (controls/controls.ts) is the only place that names this file.

/**
 * The steps of a set that the parser read (`<2-5,7,9->`), as the steps of a figure.
 * @returns `null` if the value is not a set.
 */
export function slideSetFrom(value: unknown): ISlideSet | null {
    if (typeof value !== 'object' || value === null || !('items' in value) || !Array.isArray(value.items)) {
        return null
    }

    return (value as SET).items.map(({from, to}) => to === undefined ? {from} : {from, to})
}

/**
 * Read the steps of a command (`<2->`) with the parser.
 * @throws ParseError if the text is not a set of steps between chevrons and nothing else.
 */
export function parseSteps(parser: PiParse, text: string): ISlideSet {
    const read = parser.parameters(`slides=${text}`, {types: {slides: 'set'}})
    const set = slideSetFrom(Object.hasOwn(read, 'slides') ? read.slides.value : undefined)

    if (Object.keys(read).length !== 1 || read.slides.options.length > 0 || set === null) {
        throw new ParseError(`Expected steps between chevrons and nothing else, like <2-4,6>, got "${text}"`)
    }

    return set
}

const applySlide: OptionHandler = (figure, {value, options}) => {
    const set = slideSetFrom(value)

    if (set === null || options.length > 0) {
        // The text of the steps as it was written, with what follows it, and not the set that the parser made of it.
        const written = set === null ? value : [(value as SET).raw, ...options.map(String)].join('/')

        throw invalidOption('slide', figure, written, 'steps between chevrons and nothing after them, like <2-4,6>')
    }

    setSlide(figure, set)
}

/** What the commands before a line say: how many `@pause` there were, the steps they give to the figures that follow, and the titles of the steps. */
interface ISlidesState {
    pauses: number
    slide: ISlideSet | null
    titles: Readonly<Record<number, string>>
}

/** The title of a command (`@pause=Title`, `@title,3=Title`): what follows the `=`, without the spaces around it. */
function titleOf(text: string, command: string): string {
    const title = text.trim()

    if (title === '') {
        throw new ParseError(`Cannot read the command "${command}": the title is empty`)
    }

    return title
}

/** Give a title to a step. @throws ParseError if the step has one already. */
function withTitle(titles: Readonly<Record<number, string>>, step: number, title: string, command: string): Readonly<Record<number, string>> {
    if (Object.hasOwn(titles, step)) {
        throw new ParseError(`Cannot read the command "${command}": the step ${step} has the title "${titles[step]}" already`)
    }

    return {...titles, [step]: title}
}

const COMMANDS: ICommandSyntax<ISlidesState> = {
    names: ['pause', 'slides', 'title'],
    pattern: /^@(?:pause(?:\s*=\s*\S.*)?|slides(?:\s*=\s*<[0-9,\s-]*>)?|title\s*,\s*\d+\s*=\s*\S.*)\s*$/,
    initial: {pauses: 0, slide: null, titles: {}},
    fold(state, {name, value, text}, parser) {
        if (name === 'pause') {
            const pauses = state.pauses + 1
            const next = {...state, pauses, slide: frozenSlide([{from: pauses + 1}])}

            if (value === '') {
                return next
            }

            if (!value.startsWith('=')) {
                throw new ParseError(`Cannot read the command "${text}": @pause takes a title only after a =, like @pause=Introduction`)
            }

            return {...next, titles: withTitle(state.titles, pauses + 1, titleOf(value.slice(1), text), text)}
        }

        if (name === 'title') {
            const match = /^\s*,\s*(\d+)\s*=(.*)$/.exec(value)

            if (match === null) {
                throw new ParseError(`Cannot read the command "${text}": expected the step and the title, like @title,3=Conclusion`)
            }

            const step = Number(match[1])

            if (step < 1) {
                throw new ParseError(`Cannot read the command "${text}": the step ${step} is not an integer from 1`)
            }

            return {...state, titles: withTitle(state.titles, step, titleOf(match[2], text), text)}
        }

        // @slides alone gives every step back, and counts the pauses from zero again.
        if (value === '') {
            return {...state, pauses: 0, slide: null}
        }

        if (!value.startsWith('=')) {
            throw new ParseError(`Cannot read the command "${text}": the steps of @slides come after a =, like @slides=<2->`)
        }

        const set = parseSteps(parser, value.slice(1).trim())

        checkSlideSet(set, text)

        return {...state, slide: frozenSlide(set)}
    },
    defaults: state => state.slide === null ? {} : {slide: state.slide},
    graphControls: state => ({titles: Object.keys(state.titles).length === 0 ? null : Object.freeze({...state.titles})})
}

/** The syntax of the theme. */
export const SLIDES_SYNTAX: IThemeSyntax = {
    options: {slide: applySlide},
    optionTypes: {slide: 'set'},
    optionDetails: {slide: 'slide=<2-4,6> — steps at which it is shown'},
    commands: COMMANDS,
    // The handle of a point that is dragged goes with the point: a pale disc must not stay where the point is not shown.
    handleControls: ['slide']
}
