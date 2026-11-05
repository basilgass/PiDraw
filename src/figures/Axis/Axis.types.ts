import type {TickSelection} from "../../calculus"
import type {LineConstraint} from "../Line/Line.types"

/**
 * The graduation of an axis: ticks one step apart, with a number at each one. The zero is the point of the line that gives its position
 * (`A` of `director` or `through`) and one unit is its vector (`d` of `director`, `B - A` of `through`): an axis found any other way
 * (`slope`, `parallel`...) has no zero and cannot be graduated.
 */
export interface IAxisTicks {
    /** The distance between two ticks, in units of the axis. 1 by default. */
    step?: number,
    /** What is written at a tick: the number, or a fraction of pi (`π/2`, `-π`; the number when it is not one). `'numbers'` by default. */
    labels?: 'numbers' | 'pi',
    /** How many decimals a number has at most. 2 by default. */
    digits?: number,
    /** The length of a tick, in pixels. 6 by default. */
    size?: number,
    /** Whether the zero has a tick and a number. By default it does (the axes of the graph leave it to the other axis). */
    zero?: boolean,
    /**
     * Which ticks are drawn, by their index from the zero: the multiples of `every` (`{every: 5}`: one in 5), the first tick with
     * `first` (`{first: true}`: the unit alone, `{every: 5, first: true}`: the unit and the multiples of 5). All of them by default.
     */
    marks?: TickSelection,
    /**
     * On which of the drawn ticks a number is written: a selection like `marks`, or `'none'`. By default all of them, thinned out when
     * they would touch; a selection is taken as it is.
     */
    numbers?: TickSelection | 'none'
}

/** How an axis is drawn, whatever the line it is on. */
export interface IAxisOptions {
    /**
     * How far the drawn axis stops from the borders of the drawing, in pixels, measured along the axis. 20 by default.
     */
    padding?: number,
    /**
     * The part of the axis that is drawn, in units of the axis from its zero (`{min: -10, max: 10}`). The axis is also cut by the borders
     * of the drawing and by `padding`. The whole axis by default. The axis must have a zero (`director` or `through`).
     */
    range?: { min: number, max: number },
    /** The graduation. None by default. */
    ticks?: IAxisTicks,
    /** The name of the axis, written beyond its arrow, on the side that has no numbers. None by default. */
    name?: string,
    /**
     * The side of the axis where the numbers are, seen from the way the axis goes: `'right'` is under an axis that goes to the right,
     * `'left'` is left of an axis that goes up. `'right'` by default.
     */
    side?: 'left' | 'right'
}

/**
 * An axis: a line, found like any {@link LineConstraint} (the axes of the graph are the line through the origin with the direction of
 * the axis, `director`), with an arrow at its end and a margin to the borders of the drawing.
 */
export type IAxisConfig = LineConstraint & IAxisOptions
