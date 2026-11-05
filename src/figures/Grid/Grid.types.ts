/**
 * A grid: lines parallel to the axes of the coordinate system, a step apart.
 */
export interface IGridConfig {
    /** The step between two lines, in units of each axis. 1 by default. */
    step?: { x: number, y: number },
    /**
     * The part of the coordinate system that has the grid, in units: the lines are at the multiples of the step in it, and on its edges.
     * Both or none; none (the default) is the whole drawing.
     */
    x?: { min: number, max: number },
    y?: { min: number, max: number },
    /** Each step is cut in this many parts (an integer from 2 to 20) by lines of a lighter gray. None by default. */
    subdivisions?: number
}
