import type {IControlsFigure} from "../controls/controls.types"
import {OptionError, ParseError, PiDrawError} from "../errors"

/**
 * How serious the problem of a line is: `error` is a line that cannot be drawn as written, `pending` the same problem on the line
 * that is being written (see {@link IRefreshOptions}), which an editor shows less loudly or not at all.
 */
export type DrawSeverity = 'error' | 'pending'

/** What was wrong in one line of code. */
export interface IDrawError {
    /** The number of the line in the code, from 1. */
    line: number
    /** The line, without the spaces around it. */
    text: string
    /**
     * The part of the line that is wrong, in columns of the line as it is written (from 0, `to` not included): the option that is not valid.
     * Without them, it is the whole line.
     */
    from?: number
    to?: number
    severity: DrawSeverity
    message: string
    /** The error itself: a {@link ParseError}, or an {@link OptionError} for an option. */
    error: PiDrawError
}

/** What a line of code came to. */
export type DrawLineState = 'ok' | DrawSeverity

export interface IDrawLineStatus {
    /** The number of the line in the code, from 1. */
    line: number
    status: DrawLineState
}

/** What drawing the code said: the problems, and the state of each line that holds a figure (the empty lines and the comments are not listed). */
export interface IDrawReport {
    errors: IDrawError[]
    lines: IDrawLineStatus[]
}

/** What the figures of a drawing ask of the program: which extensions it must turn on. */
export interface IDrawUsage {
    /** Whether a point can be dragged. */
    draggable: boolean
    /** The themes (`animate`, `slide`, `toggle`...) that at least one figure uses, in alphabetical order. */
    controls: readonly (keyof IControlsFigure)[]
}

/** The events of a `Draw`. */
export interface IDrawEventMap {
    /** The code was drawn again and the {@link IDrawUsage} is not the one it was: an extension may have to be turned on or off. */
    'usage': IDrawUsage
}

/** How to draw the code again. */
export interface IRefreshOptions {
    /**
     * The number of the line that is being written, from 1. If it is not valid, the figure that the line had in the last drawing is kept, and its
     * problem is `pending`: the drawing does not blink while a line is typed. The figure is kept only if that line is the only one that is not the same as in
     * the last drawing.
     */
    editing?: number
    /**
     * What happens to the points the user dragged when the code is drawn again: `keep` (the default) puts them where they were left, as long as their
     * line is the same and under the rules of its drag (a limit, a figure to follow...); `reset` puts every point where its line says.
     */
    drag?: 'keep' | 'reset'
}

/** The error of a line is a {@link PiDrawError}, whatever was thrown: a line that is being written can break anything. */
export function asPiDrawError(error: unknown, text: string): PiDrawError {
    if (error instanceof PiDrawError) {
        return error
    }

    const reason = error instanceof Error ? error.message : String(error)

    return new ParseError(`Cannot read "${text}": ${reason}`, {cause: error})
}

/**
 * Where an error is in a line: the entry of the option for an {@link OptionError}, found after the `->`. Nothing for the other errors, which
 * concern the whole line.
 *
 * @param indent how many spaces the line had before `text`, which the columns count.
 */
export function locate(text: string, error: PiDrawError, indent = 0): { from?: number, to?: number } {
    const arrow = text.indexOf('->')

    if (!(error instanceof OptionError) || arrow < 0) {
        return {}
    }

    let start = arrow + 2

    for (const entry of text.slice(start).split(',')) {
        const key = entry.split(/[=/]/)[0].trim()

        if (key === error.option) {
            const lead = entry.length - entry.trimStart().length

            return {from: indent + start + lead, to: indent + start + entry.trimEnd().length}
        }

        start += entry.length + 1
    }

    return {}
}

/** The problem of a line, as the report gives it. */
export function drawError(line: { number: number, text: string, indent: number }, error: PiDrawError, severity: DrawSeverity): IDrawError {
    return {line: line.number, text: line.text, ...locate(line.text, error, line.indent), severity, message: error.message, error}
}
