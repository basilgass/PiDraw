import {InvalidArgumentError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {IFigureToggle} from "./Buttons.types"

// The button that a figure is tied to: functions on the entry `toggle` of its controls, which `Buttons` and the syntax of the theme share.

/**
 * @throws InvalidArgumentError if the id is empty or holds a `/` (the separator of the duration), or if the duration is not a number from 0. `name` is the figure.
 */
export function checkToggle(toggle: IFigureToggle, name: string): void {
    if (toggle.id === '' || toggle.id.includes('/')) {
        throw new InvalidArgumentError(`Invalid toggle for "${name}": the id of a button is not empty and has no "/", got "${toggle.id}"`)
    }

    if (!Number.isFinite(toggle.duration) || toggle.duration < 0) {
        throw new InvalidArgumentError(`Invalid toggle for "${name}": the duration is a number of seconds from 0, got ${toggle.duration}`)
    }
}

/** The button that shows or hides the figure, `null` for a figure that no button controls. */
export function toggleOf(figure: AbstractFigure): IFigureToggle | null {
    return figure.controls.toggle ?? null
}

/**
 * Tie the figure to a button, or free it with `null`. The figure keeps a frozen copy and tells the graph, which tells its controllers; without a
 * `Buttons`, nothing changes and the figure is shown.
 * @throws InvalidArgumentError if the id or the duration is not valid (see {@link checkToggle}). The figure is then left unchanged.
 */
export function setToggle(figure: AbstractFigure, toggle: IFigureToggle | null): void {
    if (toggle !== null) {
        checkToggle(toggle, figure.name)
    }

    figure.setControl('toggle', toggle === null ? null : Object.freeze({...toggle}))
}
