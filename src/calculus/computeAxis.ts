import type {XY} from "../pidraw.common"
import {numberCorrection} from "./numbers"

// The graduations of an axis: where the ticks are, and what is written at them. Pure maths: the figure draws them.

/** A tick: its number (0 at the zero of the axis), the value it stands for, and its position in pixels. */
export interface Tick {
    index: number,
    value: number,
    point: XY
}

/**
 * Which ticks are kept, by their index (0 at the zero, 1 at the first tick after it, -1 before it...): the multiples of `every`, and the
 * first tick (index 1) with `first`. `first` alone keeps only the first tick; nothing keeps them all.
 */
export interface TickSelection {
    every?: number,
    first?: boolean
}

/** A tick this far beyond an end of the segment is still on it (rounding). */
const EDGE_TOLERANCE = 1e-9

/** More ticks than this are never drawn: the segment is longer than any drawing. */
const MAX_TICKS = 2000

/** The greatest denominator of a fraction of pi that is written. */
const MAX_DENOMINATOR = 12

/**
 * The ticks of an axis on a segment of it.
 *
 * @param zero where the value 0 is, in pixels.
 * @param unit the vector of one unit, in pixels.
 * @param step the distance between two ticks, in units.
 * @param start one end of the segment, in pixels. The segment is on the axis.
 * @param end the other end.
 * @param minSpacing there is no tick if they would be closer than this, in pixels.
 * @returns the ticks from the lowest value to the highest one, the zero included when it is on the segment.
 */
export function tickPositions(zero: XY, unit: XY, step: number, start: XY, end: XY, minSpacing: number): Tick[] {
    const squared = unit.x * unit.x + unit.y * unit.y
    const spacing = step * Math.sqrt(squared)

    if (!(squared > 0) || !(spacing >= minSpacing) || !Number.isFinite(spacing)) {
        return []
    }

    // The value at a position of the axis.
    const valueAt = (p: XY) => ((p.x - zero.x) * unit.x + (p.y - zero.y) * unit.y) / squared
    const ends = [valueAt(start) / step, valueAt(end) / step]
    const first = Math.ceil(Math.min(...ends) - EDGE_TOLERANCE)
    const last = Math.floor(Math.max(...ends) + EDGE_TOLERANCE)

    if (!Number.isFinite(first) || !Number.isFinite(last) || last - first > MAX_TICKS) {
        return []
    }

    return Array.from({length: Math.max(0, last - first + 1)}, (_, i) => {
        const index = first + i
        const value = numberCorrection(index * step)

        return {index, value, point: {x: zero.x + index * step * unit.x, y: zero.y + index * step * unit.y}}
    })
}

/**
 * Whether a tick is kept by a selection. The zero (index 0) is always kept: whether it is drawn is for the axis to say.
 * @param selection `undefined` keeps every tick.
 */
export function selects(index: number, selection: TickSelection | undefined): boolean {
    if (selection === undefined || index === 0) {
        return true
    }

    if (selection.first === true && index === 1) {
        return true
    }

    return selection.every === undefined ? selection.first !== true : index % selection.every === 0
}

/**
 * Every how many ticks a number is written, so that the numbers do not touch: 1 when the ticks are at least `minSpacing` apart.
 * @param spacing the distance between two ticks, in pixels.
 */
export function labelEvery(spacing: number, minSpacing: number): number {
    return spacing > 0 ? Math.max(1, Math.ceil(minSpacing / spacing - EDGE_TOLERANCE)) : 1
}

/**
 * A value as a fraction of pi, `p/q` of pi with the smallest `q` up to 12.
 * @returns `null` if the value is not such a fraction.
 */
export function piFraction(value: number): { p: number, q: number } | null {
    const x = value / Math.PI

    for (let q = 1; q <= MAX_DENOMINATOR; q++) {
        const p = Math.round(x * q)

        if (Math.abs(x - p / q) < EDGE_TOLERANCE) {
            return {p: p + 0, q}
        }
    }

    return null
}

/** What is written at a tick: as text for the drawing, and as LaTeX for TikZ. */
export interface TickLabel {
    text: string,
    latex: string
}

/**
 * What is written at a value.
 * @param labels `'numbers'` writes the number, rounded to `digits` decimals; `'pi'` writes it as a fraction of pi (`π/2`, `3π/2`,
 * `-π`), and as a number when it is not one.
 */
export function tickLabel(value: number, labels: 'numbers' | 'pi', digits: number): TickLabel {
    const fraction = labels === 'pi' ? piFraction(value) : null

    if (fraction === null) {
        const text = String(numberCorrection(value, digits))

        return {text, latex: text}
    }

    const {p, q} = fraction
    const sign = p < 0 ? '-' : ''
    const times = Math.abs(p)

    if (p === 0) {
        return {text: '0', latex: '0'}
    }

    const text = times === 1 ? 'π' : `${times}π`
    const latex = times === 1 ? '\\pi' : `${times}\\pi`

    return q === 1
        ? {text: `${sign}${text}`, latex: `${sign}${latex}`}
        : {text: `${sign}${text}/${q}`, latex: `${sign}\\frac{${latex}}{${q}}`}
}
