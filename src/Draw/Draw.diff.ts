import type {PARSER} from "piparser"
import type {PiDrawError} from "../errors"

/** What the last drawing did with one line of code. */
export interface ILineRecord {
    /** The number of the line in the code, from 1. */
    number: number
    /** The text of the line, without the spaces around it. */
    text: string
    /** How many spaces the line had before its text. */
    indent: number
    /** The version of the line that made the figures, as it was read: the line itself, or its version before when it fell back to it. `null` if none. */
    valid: PARSER | null
    /** The text of the version that made the figures. */
    validText: string | null
    /** What was wrong with the line, `null` if nothing. */
    error: PiDrawError | null
    /** The figures are the ones of the version before: the line was being written and was not valid. */
    fallback: boolean
    /** The names of the figures that the line made, in the order they were made (a point that is dragged has a handle). */
    created: string[]
}

/**
 * How many lines at the start of the code are the same as in the last drawing, so that their figures are left as they are: the same line (same text,
 * at the same rank), and made as it is written.
 *
 * A line builds from the figures of the lines before it only, and from nothing else that the code says: when the first lines are the same, the
 * figures they made are what a new drawing would make. After the first line that differs, everything is built again.
 */
export function reusableCount(before: readonly ILineRecord[], lines: readonly { text: string }[]): number {
    let count = 0

    while (count < before.length && count < lines.length && before[count].text === lines[count].text && !before[count].fallback) {
        count++
    }

    return count
}

/**
 * The line being written as the last drawing had it, if it is the only line that is not the same: then the lines are those of the user who edits one
 * line, and the line has a version before. If another line differs (or was added, removed or moved), it is not known which line the version belongs to.
 */
export function editedRecord(before: readonly ILineRecord[], lines: readonly { number: number, text: string }[], editing: number): ILineRecord | undefined {
    const others = (list: readonly { number: number, text: string }[]) => list.filter(line => line.number !== editing).map(line => `${line.number}:${line.text}`)
    const was = others(before)
    const is = others(lines)

    if (was.length !== is.length || was.some((line, index) => line !== is[index])) {
        return undefined
    }

    return before.find(record => record.number === editing)
}
