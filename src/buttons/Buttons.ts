import {InvalidArgumentError} from "../errors"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {Graph} from "../Graph"
import type {IGraphController} from "../Graph.types"
import type {IControlsGraph} from "../controls/controls.types"
import type {IButton, IButtonDefinitions, IButtonsChange, IButtonsEventMap, IFigureToggle} from "./Buttons.types"
import {toggleOf} from "./toggle"

/** The reason for which the figures that a button hides are hidden (see `AbstractFigure.setHiddenBy`). */
const REASON = 'toggle'

/**
 * Shows and hides figures with buttons: the code declares a button (`@button=area->title=Show the area`), and the figures that name it
 * (`toggle=area/0.5`, `figure.controls.toggle`) are shown or hidden together each time it is {@link toggle}d. It is made with the graph,
 * `new Buttons(graph)`, and attaches itself to it; a graph has one. It is independent from the other controllers.
 *
 * It draws nothing: an interface reads {@link buttons}, shows them, calls {@link toggle} when the user presses one, and listens to the event
 * `change` to show the state again.
 *
 * Each figure starts from what its line says (hidden with `!`, shown without), and a press reverses all the figures of the button, so two figures
 * that start differently stay opposite. A button is `active` after an odd number of presses. The figures fade in and out in the seconds of their
 * `toggle` (at once for 0, or where the platform has no animation frames).
 *
 * Without a `Buttons`, the buttons mean nothing: every figure is shown. What a button hides is apart from `hide()`, from the lack of a position
 * and from the other controllers (a figure that a presentation hides stays hidden); the figures are still drawn and updated. The TikZ of the
 * graph writes what is shown.
 *
 * The event is `change`: a button was pressed, or the code declared other buttons.
 */
export class Buttons extends EventTarget implements IGraphController {
    protected _graph: Graph

    protected _definitions: IButtonDefinitions

    /** The ids of the buttons that were pressed an odd number of times. */
    protected _active = new Set<string>()

    /** The animation frame of the fade of each figure that fades, by name. */
    protected _fades = new Map<string, number>()

    protected _disposed = false

    /**
     * @throws InvalidArgumentError if the graph already has a `Buttons`.
     */
    constructor(graph: Graph) {
        super()

        this._graph = graph
        graph.attach(this)

        this._definitions = graph.controls.buttons ?? []
        this._applyAll()
    }

    /** The buttons that the code declares, in the order of the code. */
    get buttons(): IButton[] {
        return this._definitions.map(({id, title}) => ({id, title, active: this._active.has(id)}))
    }

    /** Whether the button was pressed an odd number of times. @throws InvalidArgumentError if the code declares no such button. */
    isActive(id: string): boolean {
        this._check(id)

        return this._active.has(id)
    }

    /** Press the button: its figures are shown if they were hidden, and hidden if they were shown. @throws InvalidArgumentError if the code declares no such button. */
    toggle(id: string): void {
        this._check(id)

        if (this._active.has(id)) {
            this._active.delete(id)
        } else {
            this._active.add(id)
        }

        this._figuresOf(id).forEach((figure) => {
            this._apply(figure, true)
        })
        this._emit(id)
    }

    /** Release every button: the figures are as their lines say. Nothing is said when no button was pressed. */
    reset(): void {
        if (this._active.size === 0) {
            return
        }

        this._active.clear()
        this._applyAll(true)
        this._emit(null)
    }

    /** A figure was tied to a button or freed from it: it is shown or hidden at once. */
    onFigureChanged(name: string): void {
        if (this._disposed || !Object.hasOwn(this._graph.figures, name)) {
            return
        }

        this._apply(this._graph.figures[name], false)
    }

    /** The code declared other buttons, or took them away. A button that is no more forgets that it was pressed. Nothing is said when they are the same. */
    onControlsChanged(key: keyof IControlsGraph): void {
        if (this._disposed || key !== 'buttons') {
            return
        }

        const definitions = this._graph.controls.buttons ?? []
        const same = definitions.length === this._definitions.length
            && definitions.every(({id, title}, index) => id === this._definitions[index].id && title === this._definitions[index].title)

        if (same) {
            return
        }

        this._definitions = definitions
        this._active.forEach((id) => {
            if (!definitions.some(button => button.id === id)) {
                this._active.delete(id)
            }
        })
        this._applyAll()
        this._emit(null)
    }

    /** The figures that were removed do not fade any more. */
    onFiguresRemoved(names: string[]): void {
        names.forEach((name) => { this._stopFade(name) })
    }

    /** Shows every figure again, and stops following the graph. */
    dispose(): void {
        this._disposed = true

        Array.from(this._fades.keys()).forEach((name) => { this._stopFade(name) })
        Object.values(this._graph.figures).forEach((figure) => {
            figure.setHiddenBy(REASON, false)
            figure.element.attr('opacity', null)
        })
    }

    /** Call `handler` when the buttons send `event`. The same handler given twice is called once. @returns the buttons, to chain. */
    on<K extends keyof IButtonsEventMap>(event: K, handler: (e: CustomEvent<IButtonsEventMap[K]>) => void): this {
        this.addEventListener(event, handler as EventListener)

        return this
    }

    /** Stop calling a handler given to {@link on}. @returns the buttons, to chain. */
    off<K extends keyof IButtonsEventMap>(event: K, handler: (e: CustomEvent<IButtonsEventMap[K]>) => void): this {
        this.removeEventListener(event, handler as EventListener)

        return this
    }

    protected _check(id: string): void {
        if (!this._definitions.some(button => button.id === id)) {
            throw new InvalidArgumentError(`Invalid button "${id}": the code declares ${this._definitions.length === 0 ? 'none' : this._definitions.map(button => button.id).join(', ')}`)
        }
    }

    protected _emit(toggled: string | null): void {
        const detail: IButtonsChange = {buttons: this.buttons, toggled}

        this.dispatchEvent(new CustomEvent('change', {detail}))
    }

    protected _figuresOf(id: string): AbstractFigure[] {
        return Object.values(this._graph.figures).filter(figure => toggleOf(figure)?.id === id)
    }

    /** Whether the button shows the figure: what its line says, reversed once the button is pressed. */
    protected _shown({id, hidden}: IFigureToggle): boolean {
        return hidden === this._active.has(id)
    }

    protected _applyAll(animate = false): void {
        Object.values(this._graph.figures).forEach((figure) => {
            this._apply(figure, animate)
        })
    }

    /** A figure is shown or hidden as its button says, and always shown when it has none. */
    protected _apply(figure: AbstractFigure, animate: boolean): void {
        const toggle = toggleOf(figure)

        if (toggle === null) {
            this._stopFade(figure.name)
            figure.setHiddenBy(REASON, false)
            figure.element.attr('opacity', null)

            return
        }

        const shown = this._shown(toggle)
        const duration = toggle.duration * 1000

        // `!` on the line of the figure hid its shape: what the button shows is the whole figure.
        if (shown && toggle.hidden) {
            figure.showShape()
        }

        if (!animate || duration === 0 || typeof requestAnimationFrame !== 'function') {
            this._stopFade(figure.name)
            figure.setHiddenBy(REASON, !shown)
            figure.element.attr('opacity', null)

            return
        }

        this._fade(figure, shown, duration)
    }

    /** Change the opacity of the figure to the one of its state, from the one it has now. The figure is hidden at the end of a fade out. */
    protected _fade(figure: AbstractFigure, shown: boolean, duration: number): void {
        this._stopFade(figure.name)

        // svg.js answers 1 for an opacity that is not written, which a figure that is hidden by a button does not have: the attribute itself is read.
        const written = figure.element.node.getAttribute('opacity')
        const from = written === null ? (figure.isHiddenBy(REASON) ? 0 : 1) : Number(written)
        const to = shown ? 1 : 0
        const start = performance.now()

        // The figure starts from where it is: a figure that comes back must not flash at full opacity before the first frame.
        figure.element.attr('opacity', from)

        if (shown) {
            figure.setHiddenBy(REASON, false)
        }

        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)

            figure.element.attr('opacity', from + (to - from) * progress)

            if (progress < 1) {
                this._fades.set(figure.name, requestAnimationFrame(step))

                return
            }

            this._fades.delete(figure.name)

            if (!shown) {
                figure.setHiddenBy(REASON, true)
            }

            figure.element.attr('opacity', null)
        }

        this._fades.set(figure.name, requestAnimationFrame(step))
    }

    protected _stopFade(name: string): void {
        const frame = this._fades.get(name)

        if (frame !== undefined) {
            cancelAnimationFrame(frame)
            this._fades.delete(name)
        }
    }
}
