import {OptionError, ParseError} from "../errors"
import {invalidOption} from "../parser/parser.common"
import type {ICommandSyntax, IThemeSyntax, OptionHandler} from "../parser/parser.types"
import type {IButtonDefinition, IButtonDefinitions} from "./Buttons.types"
import {setToggle} from "./toggle"

// What the theme adds to the language of the code: the option `toggle` and the command `@button`. The registry (controls/controls.ts) is the
// only place that names this file, and the key of the theme in it (`toggle`) is the one under which the options find the buttons declared above.

/** The key of the theme in the registry: the state of its commands, for an option, is under it. */
const THEME_KEY = 'toggle'

/** The buttons that the lines before declare, in the order of the code. */
type IButtonsSyntaxState = IButtonDefinitions

const applyToggle: OptionHandler = (figure, {value, options}, {states, options: written}) => {
    // The duration is optional: nothing after the slash is no value, which the type of the list does not say.
    const duration = options.at(0)

    if (typeof value !== 'string' || options.length > 1 || (duration !== undefined && (typeof duration !== 'number' || duration < 0))) {
        const text = [value, ...options].map(String).join('/')

        throw invalidOption('toggle', figure, text, 'the id of a button, and a duration in seconds from 0 after a /, like toggle=id or toggle=id/0.5')
    }

    const buttons = states.get(THEME_KEY) as IButtonsSyntaxState | undefined ?? []

    if (!buttons.some(({id}) => id === value)) {
        throw new OptionError('toggle', `Invalid option "toggle" of "${figure.name}": the button "${value}" is not declared above this line, write @button=${value} first`)
    }

    // `!` on a line that has a button is the state where the button is not pressed: the whole figure is hidden, and the button shows it. A button
    // that is not there (no `Buttons`) leaves the figure shown.
    const hidden = Object.hasOwn(written, '!')

    if (hidden) {
        figure.showShape()
    }

    setToggle(figure, {id: value, duration: duration ?? 0, hidden})
}

/** What follows the `=` of `@button=id->title=Text`: the id, and the part after `->` if there is one. */
const BUTTON = /^=\s*(\w+)\s*(?:->(.*))?$/s

/** The title of a button, from the part after the `->`. @throws ParseError if it is not `title=Text` with a text. */
function titleOf(part: string, id: string, text: string): string {
    const match = /^\s*title\s*=(.*)$/s.exec(part)

    if (match === null) {
        throw new ParseError(`Cannot read the command "${text}": after the -> expected title=Text, like @button=${id}->title=Show the area`)
    }

    const title = match[1].trim()

    if (title === '') {
        throw new ParseError(`Cannot read the command "${text}": the title is empty`)
    }

    return title
}

const COMMANDS: ICommandSyntax<IButtonsSyntaxState> = {
    names: ['button'],
    pattern: /^@button\s*=\s*\w+\s*(?:->\s*title\s*=\s*\S.*)?$/,
    initial: [],
    fold(state, {value, text}) {
        const match = BUTTON.exec(value)

        if (match === null) {
            throw new ParseError(`Cannot read the command "${text}": expected the id of the button after a =, like @button=area or @button=area->title=Show the area`)
        }

        const [, id, part] = match as unknown as [string, string, string | undefined]

        if (state.some(button => button.id === id)) {
            throw new ParseError(`Cannot read the command "${text}": the button "${id}" is declared already`)
        }

        const button: IButtonDefinition = {id, title: part === undefined ? id : titleOf(part, id, text)}

        return [...state, Object.freeze(button)]
    },
    defaults: () => ({}),
    graphControls: state => ({buttons: state.length === 0 ? null : Object.freeze([...state])})
}

/** The syntax of the theme. */
export const BUTTONS_SYNTAX: IThemeSyntax = {
    options: {toggle: applyToggle},
    optionTypes: {toggle: 'text'},
    optionDetails: {toggle: 'toggle=id/0.5 — button that shows or hides it, and seconds of the fade'},
    commands: COMMANDS
}
