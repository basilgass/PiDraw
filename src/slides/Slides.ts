import {slideIncludes, slideLast, slideOf} from "./slideSet"
import {InvalidArgumentError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {Graph} from "../Graph"
import type {IGraphController} from "../Graph.types"
import type {ISlideTitles, ISlidesEventMap, ISlidesOptions, ISlidesState} from "./Slides.types"

/** The reason for which the figures that are not at this step are hidden (see `AbstractFigure.setHiddenBy`). */
const REASON = 'slide'

/**
 * Shows the figures of a graph step by step, as the slides of LaTeX Beamer: a figure that has the steps `<2->` (`figure.controls.slide`) appears at the
 * second step and stays, one that has `<3>` is there at the third step only, and one that has none is always there. It is made with the graph,
 * `new Slides(graph)`, and attaches itself to it; a graph has one. It is independent from the other controllers.
 *
 * Without a `Slides`, the steps of the figures mean nothing: every figure is shown. With one, the steps are the integers from 1 to {@link count},
 * which is the largest step that a figure names (at least 1, or what the option `count` asks). The presentation starts at the first step.
 *
 * What the steps hide is apart from `hide()` and from the lack of a position: a figure that is hidden for another reason stays hidden. The
 * figures are still drawn and updated, so what depends on a figure that is not shown follows it. The TikZ of the graph writes what is shown at
 * the step.
 *
 * The steps can have a title (`@pause=Title`, `@title,3=Title` in the code), which the graph keeps for the presentation: {@link title}, {@link titleOf}
 * and {@link titles}. A title does not make a step: only the figures and `count` do.
 *
 * The event is `change` (the step, the number of steps or the titles changed: a figure got its steps, or was removed, or the code was changed).
 */
export class Slides extends EventTarget implements IGraphController {
    protected _graph: Graph

    /** The least number of steps that the program asked for. */
    protected _least: number

    protected _current = 1

    protected _count: number

    protected _disposed = false

    protected _titles: ISlideTitles

    /**
     * @throws InvalidArgumentError if `count` is not an integer from 1, or if the graph already has a `Slides`.
     */
    constructor(graph: Graph, options: ISlidesOptions = {}) {
        super()

        const least = options.count ?? 1

        if (!Number.isInteger(least) || least < 1) {
            throw new InvalidArgumentError(`Invalid count ${least} of slides: expected an integer from 1`)
        }

        this._graph = graph
        graph.attach(this)

        this._least = least
        this._titles = graph.controls.titles ?? {}
        this._count = this._countOfFigures()
        this._applyAll()
    }

    /** The step that is shown, from 1. */
    get current(): number {
        return this._current
    }

    /** How many steps there are: the largest step that a figure names, at least 1 (or what the option `count` asked). */
    get count(): number {
        return this._count
    }

    /** The title of the step that is shown, `null` if it has none. */
    get title(): string | null {
        return this.titleOf(this._current)
    }

    /** The title of this step, `null` if it has none (or if there is no such step). */
    titleOf(step: number): string | null {
        return Object.hasOwn(this._titles, step) ? this._titles[step] : null
    }

    /** The titles of the steps by step, a copy. A title for a step that does not exist is kept: it shows when the code gives the step. */
    get titles(): ISlideTitles {
        return {...this._titles}
    }

    /** The step that is shown, the number of steps, and the title of the step. */
    get state(): ISlidesState {
        return {current: this._current, count: this._count, title: this.title}
    }

    /** Shows the next step. At the last one, nothing happens. */
    next(): void {
        this._show(Math.min(this._current + 1, this._count))
    }

    /** Shows the step before. At the first one, nothing happens. */
    previous(): void {
        this._show(Math.max(this._current - 1, 1))
    }

    /** Shows the first step. */
    first(): void {
        this._show(1)
    }

    /** Shows the last step. */
    last(): void {
        this._show(this._count)
    }

    /**
     * Shows this step.
     * @throws InvalidArgumentError if `step` is not an integer from 1 to {@link count}.
     */
    goto(step: number): void {
        if (!Number.isInteger(step) || step < 1 || step > this._count) {
            throw new InvalidArgumentError(`Invalid step ${step}: expected an integer from 1 to ${this._count}`)
        }

        this._show(step)
    }

    /** A figure got other steps: it is shown or hidden for the step that is shown, and the steps are counted again. */
    onFigureChanged(name: string): void {
        if (this._disposed || !Object.hasOwn(this._graph.figures, name)) {
            return
        }

        this._apply(this._graph.figures[name])
        this._sync()
    }

    /** The code gave other titles, or took them away. Nothing is said when they are the same. */
    onControlsChanged(key: string): void {
        if (this._disposed || key !== 'titles') {
            return
        }

        const titles = this._graph.controls.titles ?? {}
        const before = Object.entries(this._titles)
        const after = Object.entries(titles)

        if (before.length === after.length && before.every(([step, title]) => titles[Number(step)] === title)) {
            return
        }

        this._titles = titles
        this._emit()
    }

    /** The figures that were removed took their steps with them: the steps are counted again. */
    onFiguresRemoved(): void {
        if (!this._disposed) {
            this._sync()
        }
    }

    /** Shows every figure again, and stops following the graph. */
    dispose(): void {
        this._disposed = true

        Object.values(this._graph.figures).forEach((figure) => {
            figure.setHiddenBy(REASON, false)
        })
    }

    /** Call `handler` when the presentation sends `event`. The same handler given twice is called once. @returns the presentation, to chain. */
    on<K extends keyof ISlidesEventMap>(event: K, handler: (e: CustomEvent<ISlidesEventMap[K]>) => void): this {
        this.addEventListener(event, handler as EventListener)

        return this
    }

    /** Stop calling a handler given to {@link on}. @returns the presentation, to chain. */
    off<K extends keyof ISlidesEventMap>(event: K, handler: (e: CustomEvent<ISlidesEventMap[K]>) => void): this {
        this.removeEventListener(event, handler as EventListener)

        return this
    }

    protected _emit(): void {
        this.dispatchEvent(new CustomEvent('change', {detail: this.state}))
    }

    /** The largest step that a figure names, at least 1 and what the program asked. */
    protected _countOfFigures(): number {
        return Object.values(this._graph.figures).reduce((count, figure) => Math.max(count, slideLast(slideOf(figure) ?? [])), this._least)
    }

    /** A figure is shown at the steps it has, and always when it has none. */
    protected _apply(figure: AbstractFigure): void {
        const set = slideOf(figure)

        figure.setHiddenBy(REASON, set !== null && !slideIncludes(set, this._current))
    }

    protected _applyAll(): void {
        Object.values(this._graph.figures).forEach((figure) => {
            this._apply(figure)
        })
    }

    protected _show(step: number): void {
        if (step === this._current) {
            return
        }

        this._current = step
        this._applyAll()
        this._emit()
    }

    /** Count the steps again, keep the step that is shown inside them, and say it if the step or their number changed. */
    protected _sync(): void {
        const count = this._countOfFigures()
        const current = Math.min(this._current, count)

        if (count === this._count && current === this._current) {
            return
        }

        this._count = count

        if (current !== this._current) {
            this._current = current
            this._applyAll()
        }

        this._emit()
    }
}
