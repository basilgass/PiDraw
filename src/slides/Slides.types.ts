/** A run of steps of a presentation, the integers from `from` to `to` included, to the last step when there is no `to` (`<4->`). */
export interface ISlideRange {
    /** The first step of the run, an integer from 1. */
    from: number
    /** The last step of the run, an integer not below `from`. */
    to?: number
}

/**
 * The steps at which a figure is shown, as the overlay specification of LaTeX Beamer: `<2-5,7,9->` is `[{from: 2, to: 5}, {from: 7, to: 7},
 * {from: 9}]`. A figure that has none is shown at every step.
 */
export type ISlideSet = readonly ISlideRange[]

/** The titles of the steps of a presentation, by step (from 1): the steps that have none are not there. */
export type ISlideTitles = Readonly<Record<number, string>>

/** What a presentation is made with. */
export interface ISlidesOptions {
    /**
     * The least number of steps. The steps are otherwise the largest one that a figure names: this adds steps after it (a last step where
     * nothing changes, for instance).
     */
    count?: number
}

/** Where a presentation is. */
export interface ISlidesState {
    /** The step that is shown, from 1. */
    current: number
    /** How many steps there are, at least 1. */
    count: number
    /** The title of the step that is shown, `null` if it has none. */
    title: string | null
}

/** The events of a presentation. */
export interface ISlidesEventMap {
    /** The step changed, or the number of steps did (a figure with a new set, or one removed), or the titles did (the code was changed). */
    'change': ISlidesState
}
