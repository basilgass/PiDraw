import type {PARSER, PiParse} from "piparser"
import {parseParametricShorthand} from "../figures/Parametric/Parametric.parser"
import {parsePlotShorthand} from "../figures/Plot/Plot.parser"
import {parsePointShorthand} from "../figures/Point/Point.parser"
import {parseLineShorthand} from "../figures/Line/Line.parser"
import {ParseError} from "../errors"
import {THEMES} from "../controls/controls"
import type {IControlsFigure, IControlsGraph} from "../controls/controls.types"
import type {ICommandLine, ICommandSyntax} from "../parser/parser.types"

/**
 * A command of the code, a line that starts with `@`. The themes give the commands (`@pause`, `@slides=<2->`...), see `ICommandSyntax`: what a
 * command says reaches the figures of the lines after it, as `controls`.
 */
export type IDrawCommand = ICommandLine

/** A line of code that holds a figure, a command, or why it cannot be read. */
export type IDrawLine = {
    /** The number of the line in the code, from 1. */
    number: number
    /** The text of the line, without the spaces around it. */
    text: string
    /** How many spaces the line had before its text. */
    indent: number
} & (
    | {
        /** The figure. */
        item: PARSER
        /** What the commands before the line give to the controls of its figures, unless the line has its own option for them. */
        controls: Partial<IControlsFigure>
        /** What the commands before the line say, by theme (the buttons that are declared above a `toggle`). */
        states: ReadonlyMap<string, unknown>
        command?: never
        error?: never
    }
    | { command: IDrawCommand, item?: never, controls?: never, states?: never, error?: never }
    | {
        error: ParseError
        /** What the commands before the line give, so that the version before of the line, if it falls back to it, gets them. */
        controls: Partial<IControlsFigure>
        states: ReadonlyMap<string, unknown>
        item?: never
        command?: never
    }
)

/** What the commands say that belongs to the graph: the entries to set, and `null` for the ones to take away. */
export type IGraphControls = { [K in keyof IControlsGraph]?: IControlsGraph[K] | null }

/** The code, read: its lines, and what its commands give to the graph. */
export interface IDrawCode {
    lines: IDrawLine[]
    /** The state of the commands at the end of the code, so a command may be anywhere in it. */
    graphControls: IGraphControls
}

/** The first character of a line that is a comment. */
const COMMENT = '%'

/**
 * The first character of a line that is not for PiDraw: it is skipped like a comment, but it is meant for something else that reads the same
 * code (the parameters of an application, for example), which tells it from a comment.
 */
const FOREIGN = '$'

/** The first character of a line that is a command. */
const COMMAND = '@'

/**
 * Write a line of code in its standard form (`<id>=<key> <values>`): the shorthand of a point (`A(3,4)`), of a function
 * (`f(x)=x^2`) or of a line (`d=AB`). Any other text is already in that form and is not changed.
 * @throws ParseError if the text is the shorthand of a line, but not a valid one.
 */
export function standardForm(text: string): string {
    // The shorthands belong to the parser of their figure.
    return parsePointShorthand(text)
        ?? parsePlotShorthand(text)
        ?? parseParametricShorthand(text)
        ?? parseLineShorthand(text)
        ?? text
}

/** The themes that have commands, by the name of their entry in the controls of a figure. */
function commandThemes(): [string, ICommandSyntax][] {
    return Object.entries(THEMES).flatMap(([key, theme]): [string, ICommandSyntax][] => theme.commands === undefined ? [] : [[key, theme.commands]])
}

/**
 * Read the code, line by line. The empty lines, the comments (`% ...`) and the lines for something else (`$ ...`) are skipped, but they count:
 * `number` is the position in the code.
 *
 * A line that starts with `@` is a command (see {@link IDrawCommand}); what the commands give is in the `controls` of the lines of figures after
 * them, worked out here from the lines before: nothing else than the code before a line decides it.
 *
 * A line that cannot be read does not stop the others: it is in the result with its `error`, so that the caller reports it.
 * @param input the code.
 * @param parse reads one line of figure (see {@link standardForm} for its shorthands). Anything it throws is the error of the line.
 * @param parser reads the values of the commands (the steps of `@slides=<2->`). Anything the commands throw is the error of the line.
 */
export function readCode(input: string, parse: (text: string) => PARSER, parser: PiParse): IDrawCode {
    const lines: IDrawLine[] = []
    const themes = commandThemes()

    // What the commands before the line say, for each theme that has commands, and what they give to the controls of the figures that follow.
    const states = new Map<string, unknown>(themes.map(([key, commands]) => [key, commands.initial]))
    let controls: Partial<IControlsFigure> = {}

    input.split('\n').forEach((raw, index) => {
        const number = index + 1
        const text = raw.trim()
        const indent = raw.length - raw.trimStart().length

        if (text === '' || text.startsWith(COMMENT) || text.startsWith(FOREIGN)) {
            return
        }

        try {
            if (text.startsWith(COMMAND)) {
                const [command, key, commands] = readCommand(text, themes)

                states.set(key, commands.fold(states.get(key), command, parser))
                controls = Object.assign({}, ...themes.map(([themeKey, theme]) => theme.defaults(states.get(themeKey)))) as Partial<IControlsFigure>

                lines.push({number, text, indent, command})

                return
            }

            // The states are replaced, never changed (`fold` returns new ones): a copy of the map is what the line saw.
            lines.push({number, text, indent, item: parse(text), controls, states: new Map(states)})
        } catch (e) {
            lines.push({number, text, indent, error: asParseError(e, text), controls, states: new Map(states)})
        }
    })

    const graphControls = themes.reduce<IGraphControls>((all, [key, commands]) => ({...all, ...commands.graphControls?.(states.get(key))}), {})

    return {lines, graphControls}
}

/**
 * Read a command: its name and what follows it, and the theme that has it (its name in the controls, and its commands).
 * @throws ParseError if no theme has a command of that name.
 */
function readCommand(text: string, themes: [string, ICommandSyntax][]): [IDrawCommand, string, ICommandSyntax] {
    const match = /^@(\w+)\s*(.*)$/.exec(text)
    const theme = match === null ? undefined : themes.find(([, commands]) => commands.names.includes(match[1]))

    if (match === null || theme === undefined) {
        const names = themes.flatMap(([, commands]) => commands.names)

        throw new ParseError(`Cannot read the command "${text}": expected ${names.map(name => `@${name}`).join(' or ')}`)
    }

    return [{name: match[1], value: match[2], text}, ...theme]
}

/** The error of a line is a ParseError, whatever the parser threw: a line of code that is being written can be anything. */
function asParseError(error: unknown, text: string): ParseError {
    if (error instanceof ParseError) {
        return error
    }

    const reason = error instanceof Error ? error.message : String(error)

    return new ParseError(`Cannot read "${text}": ${reason}`, {cause: error})
}
