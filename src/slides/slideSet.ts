import {InvalidArgumentError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {ISlideSet} from "./Slides.types"

// The steps at which a figure is shown: functions on the set, which `Slides` and the syntax of the theme share.

/**
 * @throws InvalidArgumentError if the set has no run, a run starts below 1 or is not an integer, or ends before it starts. `name` is the figure.
 */
export function checkSlideSet(set: ISlideSet, name: string): void {
    if (set.length === 0) {
        throw new InvalidArgumentError(`Invalid slides for "${name}": expected at least one run of steps, like [{from: 2}]`)
    }

    for (const {from, to} of set) {
        const end = to ?? from

        if (!Number.isInteger(from) || from < 1 || !Number.isInteger(end) || end < from) {
            throw new InvalidArgumentError(`Invalid slides for "${name}": the run from ${from} to ${to ?? 'the end'} needs integers from 1, the end not below the start`)
        }
    }
}

/** Whether `step` is one of the steps of the set. */
export function slideIncludes(set: ISlideSet, step: number): boolean {
    return set.some(({from, to}) => step >= from && (to === undefined || step <= to))
}

/** The largest step that the set names: the end of a run, or the start of a run that has none. 0 for a set without run. */
export function slideLast(set: ISlideSet): number {
    return set.reduce((last, {from, to}) => Math.max(last, to ?? from), 0)
}

/** A copy of the set that nobody can change: the figure and the commands that give the same steps to several figures share it. */
export function frozenSlide(set: ISlideSet): ISlideSet {
    return Object.freeze(set.map(range => Object.freeze({...range})))
}

/** The steps at which the figure is shown, `null` for every step. */
export function slideOf(figure: AbstractFigure): ISlideSet | null {
    return figure.controls.slide ?? null
}

/**
 * Give the figure the steps at which it is shown, or `null` for every step. The figure keeps a frozen copy and tells the graph, which tells its
 * controllers; without a `Slides`, nothing changes and the figure is always shown.
 * @throws InvalidArgumentError if the set has no run, or a run that is not made of integers from 1 with its end not below its start.
 * The steps of the figure are then left unchanged.
 */
export function setSlide(figure: AbstractFigure, set: ISlideSet | null): void {
    if (set !== null) {
        checkSlideSet(set, figure.name)
    }

    figure.setControl('slide', set === null ? null : frozenSlide(set))
}
