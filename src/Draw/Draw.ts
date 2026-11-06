import {Graph} from "../Graph"
import type {IParserConfig, IParserSettings} from "../parser/parser.types"
import {Axes, CoordinateSystem, type XY} from "../pidraw.common"
import {layoutGeometry} from "../calculus"
import {PARSER_CONFIG} from "../parser/parser.config"
import {buildLayout, type ILayout} from "../parser/buildLayout"
import {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {Point} from "../figures/Point/Point"
import {type PARSER, PiParse} from "piparser"
import {InvalidArgumentError, ParseError, PiDrawError} from "../errors"
import {type IDrawLine, readCode, standardForm} from "./Draw.lines"
import {applyOptions, lineParseOptions, withDefaults} from "./Draw.options"
import {themeSyntaxes} from "../controls/controls"
import type {IControlsFigure, IControlsGraph} from "../controls/controls.types"
import {editedRecord, type ILineRecord, reusableCount} from "./Draw.diff"
import {
    asPiDrawError,
    drawError,
    type IDrawError,
    type IDrawEventMap,
    type IDrawLineStatus,
    type IDrawReport,
    type IDrawUsage,
    type IRefreshOptions
} from "./Draw.report"

/** The names of the axes of the graph, which no figure can have. */
const AXIS_NAMES: string[] = Object.values(Axes)

/** The entries of the controls of a point that its drag handle takes too, as the themes ask. */
const HANDLE_CONTROLS: readonly (keyof IControlsFigure)[] = themeSyntaxes().flatMap(theme => theme.handleControls ?? [])

/** Give the figure the entry `key` of the controls `from`, if there is one. */
function copyControl(from: Readonly<Partial<IControlsFigure>>, to: AbstractFigure, key: keyof IControlsFigure): void {
    const value = from[key]

    if (value !== undefined) {
        to.setControl(key, value)
    }
}

/**
 * Reads the code of a drawing and builds it in a {@link Graph}, which is the one that draws, updates and exports it.
 *
 * A line of code that is not valid does not stop the others: the problems are in the report that {@link refresh} gives (and in `report`), line
 * by line, for an editor to show.
 */
export class Draw extends EventTarget {
    /** The graph that the code is drawn in. */
    readonly graph: Graph

    protected _parser: PiParse
    protected _settings: IParserSettings

    /** What the last drawing of the code said. */
    protected _report: IDrawReport = {errors: [], lines: []}

    /** What is wrong with the parameters of the graph, `null` if nothing. */
    protected _layoutError: IDrawError | null = null

    /** What the last drawing did with each line that holds a figure: the lines that are the same are not built again. */
    protected _lines: ILineRecord[] = []

    /** The parameters of the graph as they were last read. A drawing made with other ones is not reused: the layout changes how a line is built. */
    protected _parameters: string | undefined

    /** The points the user dragged, by name: the line they were made by, and where they were left (in units, so that a new scale keeps them). */
    protected _moved = new Map<string, { text: string, coordinates: XY }>()

    /** What the figures used when `usage` was last told, to tell it again only when it differs. */
    protected _usage: IDrawUsage = {draggable: false, controls: []}

    constructor(id: string | HTMLElement, config?: IParserConfig) {
        super()

        // Without a converter the text of an HTML label is written as text, never read as HTML.
        this.graph = new Graph(id, config?.tex === undefined ? {} : {tex: config.tex})

        // Set the parser
        this._parser = new PiParse({
            formatter: standardForm,
            splitter: {
                main: '->',
                entry: ',',
                parameter: '/'
            }
        })

        this._settings = {}

        this.graph.on('dragmove', (e) => {
            this._remember(e.detail.target)
        })

        // Build the layout using the default values or the parameters. Parameters that are not valid are in `layoutError`: the drawing has
        // the default layout.
        const error = this.refreshLayout(config?.parameters)
        if (error !== null) {
            this.refreshLayout()
            this._layoutError = error
        }

        // Define the code to display
        this._code = []
        if (config?.code) {
            this._build(config.code)
        }

        return this
    }

    /** Whether a point of the drawing can be dragged (`drag`): the program turns the pointer interactions on only then. */
    hasDraggable(): boolean {
        return Object.values(this.graph.figures).some(figure => figure.isDraggable)
    }

    /**
     * Whether at least one figure uses the theme `key` (`animate`, `slide`, `toggle`...): the program creates `Animate`, `Slides`, `Buttons` only then.
     * A declaration that no figure uses (a `@button` that no figure cites) does not count.
     */
    uses(key: keyof IControlsFigure): boolean {
        return Object.values(this.graph.figures).some(figure => figure.controls[key] !== undefined)
    }

    /** The themes that at least one figure uses (see {@link uses}), in alphabetical order. */
    usedControls(): (keyof IControlsFigure)[] {
        const keys = new Set<keyof IControlsFigure>()

        for (const figure of Object.values(this.graph.figures)) {
            (Object.keys(figure.controls) as (keyof IControlsFigure)[]).forEach(key => keys.add(key))
        }

        return [...keys].sort()
    }

    /**
     * Call `handler` each time drawing the code changes what the figures ask of the program (`usage`): a point became draggable or stopped
     * being so, or a theme gained or lost its last figure. Nothing is told when the usage is the same.
     * The same handler given twice is called once.
     * @returns the drawing, to chain.
     */
    on<K extends keyof IDrawEventMap>(event: K, handler: (e: CustomEvent<IDrawEventMap[K]>) => void): this {
        this.addEventListener(event, handler as EventListener)

        return this
    }

    /**
     * Stop calling a handler given to {@link on}.
     * @returns the drawing, to chain.
     */
    off<K extends keyof IDrawEventMap>(event: K, handler: (e: CustomEvent<IDrawEventMap[K]>) => void): this {
        this.removeEventListener(event, handler as EventListener)

        return this
    }

    /** Tell `usage` if what the figures use is not what it was. */
    protected _tellUsage(): void {
        const usage: IDrawUsage = {draggable: this.hasDraggable(), controls: this.usedControls()}
        const before = this._usage

        if (usage.draggable === before.draggable && usage.controls.join() === before.controls.join()) {
            return
        }

        this._usage = usage
        this.dispatchEvent(new CustomEvent('usage', {detail: usage}))
    }

    protected _code: PARSER[]

    /** The lines of code that were read, in the form the parser gives. */
    get code() {
        return this._code
    }

    /** What the last drawing of the code said (the same object as the one `refresh` gave). */
    get report(): IDrawReport {
        return this._report
    }

    /** The problems of the last drawing of the code. */
    get errors(): readonly IDrawError[] {
        return this._report.errors
    }

    /** What is wrong with the parameters of the graph, `null` if nothing. */
    get layoutError(): IDrawError | null {
        return this._layoutError
    }

    static documentation() {
        return PARSER_CONFIG
    }

    /**
     * Refresh the code to display. A line that is not valid does not stop the others, and nothing is thrown for it. The lines at the start of the
     * code that did not change keep their figures; the others are built again.
     * @param code Code to parse and display
     * @param options see {@link IRefreshOptions}.
     * @returns what was wrong with which line, and the state of each line.
     * @throws InvalidArgumentError if `options.editing` is not a line number (an integer from 1).
     */
    refresh(code: string, options: IRefreshOptions = {}): IDrawReport {
        const {editing, drag = 'keep'} = options

        if (editing !== undefined && !(Number.isInteger(editing) && editing >= 1)) {
            throw new InvalidArgumentError(`Invalid line ${String(editing)} to edit: expected a line number, an integer from 1`)
        }

        return this._build(code, editing, drag)
    }

    /**
     * Refresh the layout: the part of the coordinate system that is drawn, the size of a unit, the axes, the grid and the defaults of the
     * figures.
     * @param code Parameters to read (`x=-10:10,axis,grid=2->red`, see `buildLayout`). The default layout without them.
     * @returns what is wrong with the parameters, `null` if nothing: the layout is then left as it was, unless it is an option of the axes or of
     * the grid that is not valid, which leaves the options before it applied.
     */
    refreshLayout(code?: string): IDrawError | null {
        try {
            const layout = buildLayout(code ?? '', this._parser)

            // Update the layout
            this.graph.updateLayout({
                ...layoutGeometry({...layout.window, unit: layout.unit}),
                system: CoordinateSystem.CARTESIAN_2D,
                measure: layout.measure
            }, layout.display)
            this._settings = layout.defaults
            this._applyLayoutOptions(layout.options)

            // The lines were built with other parameters: they are built again.
            if ((code ?? '') !== this._parameters) {
                this._lines = []
            }

            this._parameters = code ?? ''
            this._layoutError = null
        } catch (error) {
            if (!(error instanceof PiDrawError)) {
                throw error
            }

            const text = (code ?? '').trim()
            this._layoutError = drawError({number: 1, text, indent: 0}, error, 'error')
        }

        return this._layoutError
    }

    /** Give the options of the parameters (`axis->red`, `grid->subgrid=4`) to the axes and to the grid. */
    protected _applyLayoutOptions(options: ILayout['options']): void {
        const targets: [AbstractFigure | null, ILayout['options']['grid']][] = [
            [this.graph.drawnAxes.x, options.x],
            [this.graph.drawnAxes.y, options.y],
            [this.graph.mainGrid, options.grid]
        ]

        for (const [figure, own] of targets) {
            if (figure !== null && Object.keys(own).length > 0) {
                applyOptions(own, figure, this.graph)
            }
        }
    }

    /**
     * Build the figures from the code.
     * @param editing the line that is being written (see {@link IRefreshOptions}).
     * @param drag what to do with the points the user dragged (see {@link IRefreshOptions}).
     */
    protected _build(input: string, editing?: number, drag: 'keep' | 'reset' = 'keep'): IDrawReport {
        const {lines, graphControls} = readCode(input, text => this._parser.parse(text, lineParseOptions()), this._parser)
        const before = this._lines

        // The version before of the line that is being written, if it is the only line that changed.
        const previous = editing === undefined ? undefined : editedRecord(before, lines, editing)

        // The lines at the start that are the same keep their figures, whatever their number has become. The others are made again.
        let kept = reusableCount(before, lines)

        // The points the user dragged are put back where their line says: from the first of them, the lines are made again.
        if (drag === 'reset') {
            const first = before.findIndex(record => record.created.some(name => this._moved.has(name)))

            kept = first < 0 ? kept : Math.min(kept, first)
            this._moved.clear()
        }

        const records: ILineRecord[] = before.slice(0, kept).map((record, index) => ({...record, number: lines[index].number, indent: lines[index].indent}))
        this._removeAfter(new Set(records.flatMap(record => record.created)))

        const made: string[] = []

        for (const line of lines.slice(kept)) {
            const record = this._buildLine(line, line.number === editing ? previous : undefined)

            this._restore(record)
            made.push(...record.created)
            records.push(record)
        }

        this._code = lines.flatMap(line => line.item === undefined ? [] : [line.item])
        this._lines = records
        this._report = this._reportOf(records, editing)

        // What the commands say that belongs to the graph (the titles of the slides), after the figures: a controller reads both.
        for (const key of Object.keys(graphControls) as (keyof IControlsGraph)[]) {
            this.graph.setControl(key, graphControls[key] ?? null)
        }

        // A point that is no more is no more dragged.
        this._moved.forEach((_, name) => {
            if (!Object.hasOwn(this.graph.figures, name)) {
                this._moved.delete(name)
            }
        })

        // Draw the new figures a second time (for the alignment of the labels)
        // TODO: remove the "dual" update ? buildItem should place everything correctly or the new update systme will be smooth enough to handle this correctly ?
        if (made.length > 0) {
            this.graph.update(made.map(name => this.graph.figures[name]))
        }

        this._tellUsage()

        return this._report
    }

    /**
     * Remove the figures of the graph that are not in `keep`, the last ones first.
     * The controllers attached to the graph are told by the graph.
     */
    protected _removeAfter(keep: ReadonlySet<string>): void {
        const names = Object.keys(this.graph.figures).reverse().filter(name => !keep.has(name))

        names.forEach((name) => {
            // A figure that depended on another one is already gone with it.
            if (Object.hasOwn(this.graph.figures, name)) {
                this.graph.remove(name, {cascade: true})
            }
        })
    }

    /** The report of the lines: what is wrong with each, and how the line being written is shown. */
    protected _reportOf(records: readonly ILineRecord[], editing: number | undefined): IDrawReport {
        const errors: IDrawError[] = []
        const lines: IDrawLineStatus[] = []

        for (const record of records) {
            if (record.error === null) {
                lines.push({line: record.number, status: 'ok'})
            } else {
                const severity = record.number === editing ? 'pending' : 'error'

                errors.push(drawError(record, record.error, severity))
                lines.push({line: record.number, status: severity})
            }
        }

        return {errors, lines}
    }

    /** Note where the user left a point that is dragged, with the version of the line that made it. */
    protected _remember(point: Point): void {
        const record = this._lines.find(line => line.created.includes(point.name))

        if (record?.validText != null) {
            this._moved.set(point.name, {text: record.validText, coordinates: point.coordinates})
        }
    }

    /** Put back the points of a line that the user had dragged, under the rules of their drag. A line that says something else forgets them. */
    protected _restore(record: ILineRecord): void {
        for (const name of record.created) {
            const moved = this._moved.get(name)

            if (moved === undefined) {
                continue
            }

            if (moved.text !== record.validText) {
                this._moved.delete(name)
                continue
            }

            try {
                this.graph.dragTo(this.graph.figures[name] as Point, this.graph.toPixels(moved.coordinates))
            } catch {
                // The point cannot be dragged any more: it stays where the line puts it.
                this._moved.delete(name)
            }
        }
    }

    /**
     * Build the figures of one line.
     *
     * @param previous the version before of the line, for a line that is being written: if the line is not valid, the figures of that
     * version are made instead of the ones of the line.
     */
    protected _buildLine(line: IDrawLine, previous: ILineRecord | undefined): ILineRecord {
        // The figures of the line are the ones that the graph has after it: the figures it names, and the handles of the points it makes draggable.
        const count = Object.keys(this.graph.figures).length
        const made = () => Object.keys(this.graph.figures).slice(count)
        const record = {number: line.number, text: line.text, indent: line.indent}

        try {
            if (line.error !== undefined) {
                throw line.error
            }

            // A command makes no figure: it only gave the steps to the lines after it.
            if (line.command !== undefined) {
                return {...record, valid: null, validText: line.text, error: null, fallback: false, created: []}
            }

            const read = structuredClone(line.item)

            this._buildItem(line.item, line.controls, line.states)

            return {...record, valid: read, validText: line.text, error: null, fallback: false, created: made()}
        } catch (e) {
            const error = asPiDrawError(e, line.text)

            if (previous?.valid == null) {
                return {...record, valid: null, validText: null, error, fallback: false, created: made()}
            }

            this._removeMade(made())

            try {
                this._buildItem(structuredClone(previous.valid), line.controls ?? {}, line.states ?? new Map())

                return {...record, valid: previous.valid, validText: previous.validText, error, fallback: true, created: made()}
            } catch {
                // The version before is not valid either (the figures it names have changed): the line has no figure.
                this._removeMade(made())

                return {...record, valid: null, validText: null, error, fallback: false, created: []}
            }
        }
    }

    /** Remove figures that were just made, the last ones first (they may depend on the first ones). */
    protected _removeMade(names: readonly string[]): void {
        ;[...names].reverse().forEach((name) => {
            if (Object.hasOwn(this.graph.figures, name)) {
                this.graph.remove(name, {cascade: true})
            }
        })
    }

    /**
     * Build the figures of one line of code and apply its options.
     * @param controls what the commands before the line give to the controls of its figures, unless the line has its own option for them.
     * @param states what the commands before the line say, by theme (the buttons that a `toggle` names).
     * @throws ParseError if the line cannot be built, OptionError if one of its options is not valid.
     */
    protected _buildItem(item: PARSER, controls: Partial<IControlsFigure>, states: ReadonlyMap<string, unknown>): void {
        // The names of the axes are theirs.
        if (AXIS_NAMES.includes(item.name)) {
            throw new ParseError(`Cannot build "${item.name}" (${item.key}): ${item.name} is the name of an axis of the graph, choose another name`)
        }

        // A line that is not <id>=<key> <values> (a name alone, for instance) is not a figure.
        const key = item.key as string | undefined
        if (key === undefined || !Object.hasOwn(PARSER_CONFIG, key)) {
            throw new ParseError(`Cannot build "${item.name}": ${key === undefined ? 'expected <name>=<key> <values>' : `"${key}" is not a kind of figure`}`)
        }

        // Determine the id of the figure.
        item.name = this._uniqueName(item.name)

        const buildResult = PARSER_CONFIG[item.key].build(item, this._namedFigures(), this.graph.config)

        if (buildResult === null) {
            throw new ParseError(`Cannot build "${item.name}" (${item.key}): nothing to build`)
        }

        const builds = Array.isArray(buildResult) ? buildResult : [buildResult]

        builds.forEach(({config, create}, index) => {
            const makers = this.graph.create as unknown as Record<string, ((config: unknown, name: string) => AbstractFigure) | undefined>
            const make = Object.hasOwn(makers, create) ? makers[create] : undefined

            if (make === undefined) {
                throw new ParseError(`Cannot build "${item.name}" (${item.key}): the graph cannot make a "${create}"`)
            }

            const obj = make.call(makers, config, item.name + (builds.length > 1 ? `${index + 1}` : ''))

            applyOptions(withDefaults(item.parameters, this._settings, obj), obj, this.graph, states)

            // What the commands before the line give, unless the line says its own (the name of the entry is the one of its option).
            for (const key of Object.keys(controls) as (keyof IControlsFigure)[]) {
                if (!Object.hasOwn(item.parameters, key)) {
                    copyControl(controls, obj, key)
                }
            }

            // The handle of a point that is dragged takes some of what the point has: it must not stay where the point is not shown.
            const handle = this.graph.figures[`${obj.name}_drag`] as AbstractFigure | undefined

            if (handle !== undefined) {
                HANDLE_CONTROLS.forEach(key => { copyControl(obj.controls, handle, key) })
            }
        })
    }

    /**
     * The figures that a line of code can name: the ones of the drawing, and the axes of the graph, `Ox` and `Oy`, which are lines like
     * the others (an intersection, a perpendicular, a tangent circle...). They exist whether they are drawn or not.
     */
    protected _namedFigures(): Record<string, AbstractFigure> {
        return {Ox: this.graph.axes.x, Oy: this.graph.axes.y, ...this.graph.figures}
    }

    protected _uniqueName(name: string): string {
        let newName = name
        let i = 1
        while (this.graph.figures[newName]) {
            newName = `${name}_${i}`
            i++
        }
        return newName
    }
}
