import {type Box, SVG, type Svg} from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'

import {Axes, type Domain, type IFigureContext, type IGraphConfig, isXY, LayerName, type XY} from "./pidraw.common"
import type {
    IAxisDisplay,
    IGraphConstructorConfig,
    IGraphController,
    IGraphDisplay,
    IGraphEventMap,
    IGraphUpdate,
    Layers,
    TeXConverterType
} from "./Graph.types"
import {Point} from "./figures/Point/Point"
import type {IPointConfig} from "./figures/Point/Point.types"
import {Line} from "./figures/Line/Line"
import {Plot} from "./figures/Plot/Plot"
import {
    type AxisPlacement,
    axisPlacement,
    checkGraphConfig,
    isDefinedPosition,
    constrainDrag,
    resolveGraphConfig,
    toCoordinates as pixelsToCoordinates,
    toPixels as coordToPixels
} from "./calculus"
import {AbstractFigure} from "./figures/AbstractFigure/AbstractFigure"
import {TIKZ_PREAMBLE, tikzPicture} from "./figures/AbstractFigure/AbstractFigure.tikz"
import {Circle} from "./figures/Circle/Circle"
import {Polygon} from "./figures/Polygon/Polygon"
import {Grid} from "./figures/Grid/Grid"
import {Arc} from "./figures/Arc/Arc"
import {InvalidArgumentError} from "./errors"
import type {IControlsGraph} from "./controls/controls.types"
import {Axis} from "./figures/Axis/Axis"
import {axesDisplay, axisConfigOf} from "./figures/Axis/Axis.constraints"
import {stepOf} from "./figures/Grid/Grid.constraints"
import {Parametric} from "./figures/Parametric/Parametric"
import {Follow} from "./figures/Follow/Follow"
import {FillBetween} from "./figures/FillBetween/FillBetween"
import {Riemann} from "./figures/Riemann/Riemann"
import {Path} from "./figures/Path/Path"
import {Bezier} from "./figures/Bezier/Bezier"

/** The names of the figures of the layout (the grid and the axes, with the ones at the border): a figure of the graph cannot have one. */
const MAIN_GRID = 'MAINGRID'
const EDGE = '-edge'
const LAYOUT_NAMES: string[] = [MAIN_GRID, Axes.X, Axes.Y, `${Axes.X}${EDGE}`, `${Axes.Y}${EDGE}`]

/** A way to limit where a point that is dragged goes: a function from the position in pixels to the one it takes, or a figure to stay on. */
export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure

/** How a point is dragged. The rules apply in this order: `along`, `grid`, `bounds`, then each of `follow`. */
export interface IDraggableConfig {
    /** Move on the screen along an axis only: the point keeps its other coordinate (`'x'` keeps its height). */
    along?: 'x' | 'y',
    /** The part of each axis the point stays in, in units of the coordinate system. */
    bounds?: {
        x?: Domain
        y?: Domain
    }
    /** Called with the point each time it moves, before the other figures are drawn again. */
    callback?: (point: Point) => void
    /** Limits that are applied in turn, after the rules above: a function, or a figure the point stays on. */
    follow?: IDraggableFollow[],
    /** Put the point on the lines of the grid of the graph, subdivisions included: its step if it shows one, a unit otherwise, from the origin. */
    grid?: boolean
    /** A point that moves with the one that is dragged, and is the one other figures are built on (the dragged one is a handle). */
    target?: Point,
}

/** How deep `figuresIn` goes into a configuration: the figures are in objects and lists nested a few levels (`{through: [{point}]}`). */
const CONFIG_DEPTH = 5

/**
 * The figures that a configuration holds, in objects and lists: the figures that the figure made from it depends on. Functions and other
 * objects (an expression, a converter) are not looked into.
 */
function figuresIn(value: unknown, depth = CONFIG_DEPTH): AbstractFigure[] {
    if (value instanceof AbstractFigure) {
        return [value]
    }

    if (depth === 0 || typeof value !== 'object' || value === null) {
        return []
    }

    const prototype = Object.getPrototypeOf(value) as unknown

    if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) {
        return []
    }

    return [...new Set(Object.values(value).flatMap(item => figuresIn(item, depth - 1)))]
}

/** The axes of the layout: on their line, and as they are drawn. */
interface ILayoutFigures {
    axes: { x: Axis, y: Axis },
    drawn: { x: Axis, y: Axis }
}

/**
 * A drawing in the page: a coordinate system with its grid and its axes (the layout), and the figures that are made in it.
 *
 * The figures are made by `create`, drawn again by `update` when what they depend on moves, and written in TikZ by `tikz`. A point is made
 * draggable by `draggable`, and the graph tells what happens by events (`on`). `dispose` takes it out of the page.
 */
export class Graph extends EventTarget {
    /** The controllers attached to the graph (see {@link attach}), in the order they were attached. */
    protected _controllers: IGraphController[] = []

    protected _controls: Partial<IControlsGraph> = {}

    /**
     * What the themes keep on the graph (the titles of the slides...), by the name of the entry. The graph does not know what the entries mean: a theme
     * writes its own with {@link setControl} and the controllers read them here.
     */
    get controls(): Readonly<Partial<IControlsGraph>> {
        return this._controls
    }

    /**
     * Keep a value for a theme, or take it away with `null`. The attached controllers are told (`onControlsChanged`). The value is not checked: the
     * theme does it.
     */
    setControl<K extends keyof IControlsGraph>(key: K, value: IControlsGraph[K] | null): this {
        if (value === null) {
            Reflect.deleteProperty(this._controls, key)
        } else {
            this._controls[key] = value
        }

        this._controllers.forEach((controller) => {
            controller.onControlsChanged?.(key)
        })

        return this
    }

    protected _layout: ILayoutFigures

    /**
     * The figures that draw the layout (the grid and the axes), to remove them when it is drawn again: the layer of the grids holds
     * the grids of the figures too.
     */
    protected _decor: AbstractFigure[] = []

    /**
     * The axes `Ox` and `Oy`, which the layout keeps from one drawing to the next: the figures built on them hold these objects, so they
     * must stay the same.
     */
    protected _lines = new Map<string, Axis>()

    /** The figures that the user holds (dragged), which an update leaves where they are. */
    protected _held = new Set<AbstractFigure>()

    /** How each point that can be dragged is: by the point that is held, and by its target. */
    protected _drags = new Map<Point, { figure: Point, options: IDraggableConfig }>()

    /** How many figures the graph has. */
    protected _total = 0

    /** What each figure was read from last: its configuration, and the figures found in it, which it depends on. */
    protected _links = new Map<AbstractFigure, { config: object, dependencies: AbstractFigure[] }>()

    /** The figures that each figure is a dependency of, `null` when it must be read again. */
    protected _dependents: Map<AbstractFigure, AbstractFigure[]> | null = null

    /**
     * Draw a graph in a container. A unit is a centimeter by default (see `resolveGraphConfig`).
     * @param id the container, or the `id` of an element of the page.
     * @throws InvalidArgumentError if the container does not exist, or the size, the origin or an axis of `config` is not valid.
     * @throws NotImplementedError if the coordinate system of `config` is not the cartesian one.
     * Nothing is left in the container in case of an error.
     */
    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig) {
        super()

        // Before anything is put in the page.
        const {config: resolved, display} = resolveGraphConfig(config)
        const container = typeof id === 'string' ? document.getElementById(id) : id

        if (container === null) {
            throw new InvalidArgumentError(`Cannot find the element "${id as string}" to draw the graph in`)
        }

        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        wrapper.style.userSelect = 'none'
        container.appendChild(wrapper)
        this._wrapper = wrapper

        this._config = resolved
        this._display = display

        // TexConverter: without one, the text of an HTML label is written as text, never read as HTML.
        this._toTex = config?.tex

        this._rootSVG = SVG().addTo(wrapper)
        this._fitSvg()

        // The defs come first, so that looking for them (for a marker) stops at once, without crossing the figures.
        this._rootSVG.defs()

        this._layers = {} as Layers

        Object.values(LayerName).forEach((key) => {
            this._layers[key] = this._rootSVG
                .group()
                .attr('id', `LAYER_${key}`)
        })

        // Without a prototype, `__proto__` and `toString` are names like any other.
        this._figures = Object.create(null) as Record<string, AbstractFigure>

        try {
            this._layout = this._makeLayout()
        } catch (error) {
            wrapper.remove()
            throw error
        }
    }

    /** The element that the graph made in its container, and that holds its svg. */
    protected _wrapper: HTMLElement

    protected _config: IGraphConfig

    /**
     * The size of the drawing, its origin and the vector of a unit of each axis, in pixels. The same object until `updateLayout` gives another
     * one: the figures read it when they are drawn.
     */
    get config(): IGraphConfig {
        return this._config
    }

    protected _display: IGraphDisplay

    /** What the layout shows (the grid, the axes), as it was last asked for. */
    get display(): IGraphDisplay {
        return this._display
    }

    protected _figures: Record<string, AbstractFigure>

    /**
     * The figures of the graph by name, in the order they were made. An object without a prototype: any text is a name. The layout (the grid and
     * the axes) is not in it.
     */
    get figures(): Record<string, AbstractFigure> {
        return this._figures
    }

    protected _layers: Layers

    /** The groups of the svg that the figures are in, from the back of the drawing to the front (see `LayerName`). */
    get layers(): Layers {
        return this._layers
    }

    protected _rootSVG: Svg

    /** The svg of the drawing. */
    get rootSVG(): Svg {
        return this._rootSVG
    }

    protected _toTex: TeXConverterType | undefined

    /** The converter of the text of an HTML label to HTML, `undefined` if the graph was made without one. */
    get toTex() {
        return this._toTex
    }

    /**
     * Make a figure of the graph: each one is in its layer and among the {@link figures}, under its name.
     * @throws InvalidArgumentError if the name is not a text, is already the one of a figure or of the layout (`Ox`, `Oy`, the grid...), or
     * if the configuration is not valid (see the figure). Nothing is drawn in case of an error.
     */
    get create() {
        return {
            point: (coordinates: XY | IPointConfig, name: string, label?: { html: boolean }) => {
                const config: IPointConfig = isXY(coordinates) ? {coordinates} : coordinates
                const point = this._make(name, LayerName.POINTS, () => new Point(this, name, config))

                if (label) {
                    // The label of a point is its name.
                    point.addLabel(name, {asHtml: label.html, ...(this._toTex === undefined ? {} : {texConverter: this._toTex})})
                }

                return point
            },
            line: this._maker(Line, LayerName.MAIN),
            path: this._maker(Path, LayerName.MAIN),
            bezier: this._maker(Bezier, LayerName.MAIN),
            plot: this._maker(Plot, LayerName.PLOTS),
            parametric: this._maker(Parametric, LayerName.PLOTS),
            circle: this._maker(Circle, LayerName.MAIN),
            polygon: this._maker(Polygon, LayerName.MAIN),
            arc: this._maker(Arc, LayerName.MAIN),
            follow: this._maker(Follow, LayerName.PLOTS_FOREGROUND),
            fillbetween: this._maker(FillBetween, LayerName.PLOTS_BACKGROUND),
            grid: this._maker(Grid, LayerName.GRIDS),
            axis: this._maker(Axis, LayerName.MAIN),
            riemann: this._maker(Riemann, LayerName.PLOTS_BACKGROUND)
        }
    }

    protected _mainGrid: Grid | null = null

    /** The grid of the layout (the display `grid`), `null` when the graph does not show one. */
    get mainGrid(): Grid | null {
        return this._mainGrid
    }

    /**
     * The axes of the coordinate system, named `Ox` and `Oy`: the lines `y = 0` and `x = 0`, so that a figure can be built from them. They
     * always exist, drawn or not (the display `axis`). They are not among the `figures`, which `clear()` removes.
     */
    get axes(): { x: Axis, y: Axis } {
        return this._layout.axes
    }

    /**
     * The axes that are drawn: the same as {@link axes}, except for an axis whose line is out of the drawing, which is drawn at a border
     * (`Ox-edge`, `Oy-edge`) and has its graduation there. The options of the parameters of the graph are given to these.
     */
    get drawnAxes(): { x: Axis, y: Axis } {
        return this._layout.drawn
    }

    /**
     * Remove a figure of the graph: from the svg, and from the {@link figures}. The layout (the grid and the axes) is not a figure.
     *
     * @param options `cascade`: also remove the figures that depend on this one (a line built on a point...), which go first. Without it
     * a figure that others depend on is not removed.
     * @returns the names of the figures that were removed, the ones that depend on others first.
     * @throws InvalidArgumentError if no figure has this name, or other figures depend on it and `cascade` is not `true`.
     */
    remove(name: string, options?: { cascade?: boolean }): string[] {
        if (!Object.hasOwn(this._figures, name)) {
            throw new InvalidArgumentError(`There is no figure named "${name}" to remove`)
        }

        const figure = this._figures[name]
        const dependents = this._affectedBy([figure])

        if (dependents.length > 0 && options?.cascade !== true) {
            const names = dependents.map(dependent => `"${dependent.name}"`).join(', ')

            throw new InvalidArgumentError(`Cannot remove the figure "${name}": ${names} depend on it (remove them first, or use {cascade: true})`)
        }

        // The figures that depend on the others go first.
        const removed = [...dependents.reverse(), figure]
        removed.forEach((removing) => {
            this._detach(removing)
        })

        const names = removed.map(removing => removing.name)
        this._notifyRemoved(names)

        return names
    }

    /**
     * Attach a controller to the graph: a module that acts on the drawing from outside (the animation, a zoom, the slides), made by
     * the program with `new Animate(graph)`. The graph tells it when figures are removed (`remove`, `clear`) and when it is taken out of the page
     * (`dispose`), so that it stops what it does.
     * @returns the controller.
     * @throws InvalidArgumentError if a controller of the same class is already attached: two of them would act on the same figures.
     */
    attach<T extends IGraphController>(controller: T): T {
        if (this._controllers.some(attached => attached.constructor === controller.constructor)) {
            throw new InvalidArgumentError(`A ${controller.constructor.name} is already attached to this graph`)
        }

        this._controllers.push(controller)

        return controller
    }

    /** Remove every figure of the graph, but not the layout. The attached controllers are told which figures were removed (`onFiguresRemoved`). */
    clear(): void {
        const names = Object.keys(this._figures)

        Object.values(this._figures).forEach((figure) => {
            this._detach(figure)
        })

        this._notifyRemoved(names)
    }

    /**
     * A figure of the graph tells that something changed in it that the controllers may care about (see `IGraphController.onFigureChanged`). It is
     * what the figures call on their context, and it is not for a program to call.
     */
    figureChanged(name: string): void {
        this._controllers.forEach((controller) => {
            controller.onFigureChanged?.(name)
        })
    }

    /** Tell the attached controllers that these figures are gone from the graph. Nothing is said for no figure. */
    protected _notifyRemoved(names: string[]): void {
        if (names.length === 0) {
            return
        }

        this._controllers.forEach((controller) => {
            controller.onFiguresRemoved?.(names)
        })
    }

    /**
     * Take the graph out of the page: remove every figure (the ones that keep a listener let it go) and the layout, and
     * remove from its container the element that the graph made. The attached controllers are disposed, and detached. The graph is not used
     * afterward; calling this again does nothing.
     */
    dispose(): void {
        this.clear()

        this._controllers.forEach((controller) => {
            controller.dispose()
        })
        this._controllers = []
        this._controls = {}

        this._clearLayout()

        this._lines.forEach((axis) => {
            axis.dispose()
            axis.element.remove()
        })
        this._lines.clear()

        this._wrapper.remove()
    }

    /**
     * Make a point draggable by a handle: a large pale disc, on the layer of the interactions, that follows the point and moves it when it is
     * dragged. The user reaches a point that is small, or hidden.
     *
     * @returns the handle, which is a figure of the graph named `<point>_drag`.
     * @throws InvalidArgumentError as `draggable` does, or if the name of the handle is taken. Nothing is left in the graph in case of an error.
     */
    handle(target: Point, options: IDraggableConfig = {}): Point {
        const handle = this.create.point({x: 0, y: 0}, `${target.name}_drag`)

        try {
            handle.pixels = target.pixels
            handle.asCircle(30).fill({color: 'white', opacity: 0.8})
            this.layers.interactive.add(handle.element)

            return this.draggable(handle, {target, ...options})
        } catch (error) {
            this.remove(handle.name)
            throw error
        }
    }

    /**
     * Put a point that can be dragged where it would be if the mouse had dragged it to `pixels`: the rules of its drag apply (along an axis, on the
     * grid, in bounds, on a figure it follows), then the figures that depend on it are drawn again. No event is emitted.
     *
     * @param point the point that is held (the handle), or its `target`.
     * @param pixels where the mouse would be, in pixels.
     * @throws InvalidArgumentError if the point cannot be dragged.
     */
    dragTo(point: Point, pixels: XY): void {
        const drag = this._drags.get(point)

        if (drag === undefined) {
            throw new InvalidArgumentError(`The point "${point.name}" cannot be dragged: make it draggable first`)
        }

        this._dragMove(drag.figure, drag.options, pixels)
    }

    /**
     * Move the point that is dragged to where the mouse is, under the rules of its drag, and draw again what depends on it.
     * @param figure the point that is held.
     * @param options the rules of its drag.
     * @param mouse the position of the mouse in pixels, which is put inside the drawing.
     * @returns what the update did, `null` if the point did not move.
     */
    protected _dragMove(figure: Point, options: IDraggableConfig, mouse: XY): IGraphUpdate | null {
        const {along, bounds, callback, follow = [], grid, target} = options

        const inside = {
            x: Math.max(0, Math.min(mouse.x, this._config.width)),
            y: Math.max(0, Math.min(mouse.y, this._config.height))
        }

        let position = constrainDrag(inside, {
            ...(along ? {along: {axis: along, keep: (target ?? figure).pixels}} : {}),
            ...(bounds ? {bounds} : {}),
            ...(grid ? {step: this._gridStep()} : {})
        }, this._config)

        for (const limit of follow) {
            position = limit instanceof AbstractFigure ? limit.follow(position.x, position.y) : limit(position.x, position.y)
        }

        if (figure.pixels.x === position.x && figure.pixels.y === position.y) {
            return null
        }

        figure.pixels = position

        if (target) {
            target.pixels = position
        }

        if (callback) {
            callback(figure)
        }

        return this.update(target ? [figure, target] : [figure])
    }

    /**
     * Make a point draggable with the mouse. The figures that depend on it, and on its `target`, are drawn again each time it moves, and
     * the events `dragstart`, `dragmove` (with how many figures that reached) and `dragend` are emitted. It stays in the drawing.
     *
     * @throws InvalidArgumentError if `figure` is not a point, or is already draggable; if `options.along` is neither `'x'` nor `'y'`;
     * `options.target` is not a point; a `follow` is neither a function nor a figure; or a bound is not a finite number.
     * Nothing is changed in case of an error.
     */
    draggable(figure: Point, options: IDraggableConfig = {}): Point {
        this._checkDraggable(figure, options)

        const target = options.target ?? figure

        const dragmove = (e: Event & { detail: { box: Box } }): void => {
            // The plugin would move the shape by itself: the point moves it, through its position.
            e.preventDefault()

            // The box is the one of the shape, and the point is at its center.
            const {box} = e.detail
            const report = this._dragMove(figure, options, {x: box.x + box.width / 2, y: box.y + box.height / 2})

            // Nothing moved (the rules put the point where it was): nothing to draw again.
            if (report !== null) {
                this._emit('dragmove', {graph: this, figure, target, ...report})
            }
        }

        this._drags.set(figure, {figure, options})
        if (options.target) {
            this._drags.set(options.target, {figure, options})
        }

        // The user holds the figure and its target: a full update leaves them where they are.
        this._held.add(figure)
        this._held.add(target)

        // Move the figure to the top layer.
        this._layers.interactive.add(figure.element)

        figure.isDraggable = true
        figure.shape
            .draggable()
            .on('dragstart', () => { this._emit('dragstart', {graph: this, figure, target}) })
            .on('dragmove', dragmove as EventListener)
            .on('dragend', () => { this._emit('dragend', {graph: this, figure, target}) })

        return figure
    }

    /**
     * A length, a domain or a position of the coordinate system in pixels, with the scale of the graph as it is now. A length or a domain is
     * along `axis` (`'x'` by default); a domain comes back with its `min` below its `max`, even on the y axis, which points up.
     * @throws InvalidArgumentError if `value` is none of a number, a domain and a position.
     */
    toPixels(value: number, axis?: 'x' | 'y'): number

    toPixels(value: Domain, axis?: 'x' | 'y'): Domain

    toPixels(value: XY): XY

    toPixels(value: number | Domain | XY, axis?: 'x' | 'y'): number | Domain | XY {
        return coordToPixels(value, this.config, axis)
    }

    /**
     * A length, a domain or a position in pixels in units of the coordinate system: the opposite of {@link toPixels}.
     * @throws InvalidArgumentError if `value` is none of a number, a domain and a position.
     * @throws MathError if a position is converted while the two axes of the graph are collinear.
     */
    toCoordinates(value: number, axis?: 'x' | 'y'): number

    toCoordinates(value: Domain, axis?: 'x' | 'y'): Domain

    toCoordinates(value: XY): XY

    toCoordinates(value: number | Domain | XY, axis?: 'x' | 'y'): number | Domain | XY {
        return pixelsToCoordinates(value, this.config, axis)
    }

    /**
     * Draw the figures again and put their labels at their place, to follow what changed.
     *
     * With `changed`, only the figures that depend on them, directly or not, are drawn again, each one once and after the ones it depends
     * on: a figure that does not depend on them is left alone. The figures of `changed` are not drawn again, their position is the one they
     * were given (a point that was dragged or animated): only their labels are. Without `changed`, every figure is drawn again.
     *
     * A figure that the user holds (see {@link draggable}) is never drawn again, only its label. A figure that is `static` is left as it is
     * too, unless `forceUpdate` is `true`.
     *
     * @param changed the figure, or the figures, that were moved.
     * @returns how many figures were reached: the ones drawn again (a figure left as it is, `static`, is not counted) and the ones that
     * were moved, out of the figures of the graph.
     * @throws InvalidArgumentError if a figure that depends on `changed` depends on itself (a cycle).
     */
    update(changed?: AbstractFigure | readonly AbstractFigure[], forceUpdate?: boolean): IGraphUpdate {
        let updated = 0

        if (changed === undefined) {
            Object.values(this._figures).forEach((figure) => {
                updated += this._refresh(figure, forceUpdate) ? 1 : 0
            })

            return {updated, total: this._total}
        }

        const sources = changed instanceof AbstractFigure ? [changed] : changed

        this._affectedBy(sources).forEach((figure) => {
            updated += this._refresh(figure, forceUpdate) ? 1 : 0
        })

        const moved = new Set(sources)
        moved.forEach((figure) => {
            figure.updateLabel()
        })

        return {updated: updated + moved.size, total: this._total}
    }

    /**
     * Draw the layout again (the size of the drawing, the grid and the axes), and update every figure to follow it.
     *
     * @param config the new configuration, whole. The one of the graph stays by default.
     * @param display what the layout shows, as it is (without the defaults of the constructor). The one of the graph stays by default.
     * @throws InvalidArgumentError if `config` is not valid (see `checkGraphConfig`), or `display` cannot be drawn.
     * @throws NotImplementedError if the coordinate system of `config` is not the cartesian one.
     * @throws MathError if the position of a moved point cannot be read in the coordinate system of the graph as it is now.
     * The graph is left as it was in case of an error.
     *
     * A point that was moved (dragged, animated: see `Point.isMoved`) keeps its place in the coordinate system, not in pixels: it is put
     * where the same coordinates are in the new layout, and what depends on it is drawn again. The attached controllers are told afterward
     * (`onLayoutChanged`).
     */
    updateLayout(config?: IGraphConfig, display?: IGraphDisplay): void {
        if (config !== undefined) {
            checkGraphConfig(config)
        }

        // Read before anything changes: an error leaves the graph as it was.
        const moved = Object.values(this._figures)
            .filter((figure): figure is Point => figure instanceof Point && figure.isMoved())
            .map(point => ({point, coordinates: point.coordinates}))

        const previous = {config: this._config, display: this._display}

        try {
            this._config = config ?? this._config
            this._display = display ?? this._display

            // Update the viewbox and the size, and redo the layout.
            this._fitSvg()
            this._layout = this._makeLayout()
        } catch (error) {
            this._config = previous.config
            this._display = previous.display
            this._fitSvg()
            this._layout = this._makeLayout()

            throw error
        }

        // The figures hold what they computed from the old layout, the static ones too: draw them all again.
        this.update(undefined, true)

        // The moved points were put back at the place of their constraint: they go to their coordinates in the new layout.
        const placed = moved.filter(({coordinates}) => isDefinedPosition(coordinates))

        placed.forEach(({point, coordinates}) => {
            point.pixels = this.toPixels(coordinates)
        })

        if (placed.length > 0) {
            this.update(placed.map(({point}) => point))
        }

        this._controllers.forEach((controller) => {
            controller.onLayoutChanged?.(this._config)
        })
    }

    /**
     * Call `handler` each time a point of the graph is dragged: `dragstart`, `dragmove` (with how many figures that reached) and `dragend`.
     * The same handler given twice is called once.
     * @returns the graph, to chain.
     */
    on<K extends keyof IGraphEventMap>(
        event: K,
        handler: (e: CustomEvent<IGraphEventMap[K]>) => void
    ): this {
        this.addEventListener(event, handler as EventListener)
        return this
    }

    /**
     * Stop calling a handler given to {@link on}.
     * @returns the graph, to chain.
     */
    off<K extends keyof IGraphEventMap>(
        event: K,
        handler: (e: CustomEvent<IGraphEventMap[K]>) => void
    ): this {
        this.removeEventListener(event, handler as EventListener)
        return this
    }

    /**
     * The graph as a whole `tikzpicture`: the grid and the axes, then the figures, in the order they are drawn on screen (layer by layer, and in
     * a layer in the order of its elements). The picture has the size of the part of the coordinate system that is drawn, which the commands are cut
     * to (see `tikzPicture`). The handles of the points
     * the user drags are not part of the drawing, and a figure that is hidden writes nothing. The packages it needs are in {@link tikzPreamble}.
     *
     * @throws InvalidArgumentError if the appearance of a figure has no TikZ equivalent (a color that is neither hexadecimal nor a name of `xcolor`).
     * @throws NotImplementedError if a figure cannot be written in TikZ, or the x axis does not go to the right or the y axis does not go up.
     */
    tikz(): string {
        const owners = new Map<unknown, AbstractFigure>()

        ;[...Object.values(this._figures), ...this._decor, ...this._lines.values()].forEach((figure) => {
            owners.set(figure.element.node, figure)
        })

        const fragments: string[] = []

        for (const layer of Object.values(LayerName)) {
            if (layer === LayerName.INTERACTIVE) {
                continue
            }

            this._layers[layer].children().forEach((child) => {
                const figure = owners.get(child.node)

                if (figure) {
                    fragments.push(figure.tikz())
                }
            })
        }

        return tikzPicture(this._config, fragments)
    }

    /** The lines to put before `\begin{document}` for the {@link tikz} of a graph: the packages and the libraries its figures need. */
    tikzPreamble(): string {
        return TIKZ_PREAMBLE
    }

    /**
     * Give the svg the size of the drawing: its viewbox, and its width in pixels, which is the size the drawing has (a unit has the
     * length it was given), unless the page is narrower: then it is reduced to fit.
     */
    protected _fitSvg(): void {
        const {width, height} = this._config

        this._rootSVG
            .viewbox(0, 0, width, height)
            .css({width: `${width}px`, 'max-width': '100%', height: 'auto'})
    }

    protected _emit<K extends keyof IGraphEventMap>(
        event: K,
        detail: IGraphEventMap[K]
    ): void {
        this.dispatchEvent(new CustomEvent(event, {detail}))
    }

    /**
     * Draw a figure again, unless the user holds it: then only its label is put at its place.
     * @returns `false` for a figure that is left as it is (`static`, and not forced).
     */
    protected _refresh(figure: AbstractFigure, forceUpdate?: boolean): boolean {
        if (this._held.has(figure)) {
            figure.updateLabel()

            return true
        }

        if ((figure.static || figure.isDraggable) && forceUpdate !== true) {
            return false
        }

        figure.update(forceUpdate)

        return true
    }

    /**
     * The step of the grid of the layout, in units: the one of the grid that is shown, a unit if it has none, cut in the subdivisions of the
     * grid if it has some (they count even when they are too close to be drawn, so that the step does not depend on the zoom).
     */
    protected _gridStep(): { x: number, y: number } {
        const grid = typeof this._display.grid === 'object' ? this._display.grid : {}
        const {x, y} = stepOf(grid)
        const parts = grid.subdivisions ?? 1

        return {x: x / parts, y: y / parts}
    }

    /**
     * Check that a point can be made draggable with these options.
     * @throws InvalidArgumentError see {@link draggable}.
     */
    protected _checkDraggable(figure: unknown, options: IDraggableConfig): void {
        if (!(figure instanceof Point)) {
            const what = figure instanceof AbstractFigure ? `"${figure.name}" is a ${figure.constructor.name}` : 'it is not a figure'

            throw new InvalidArgumentError(`Only a point can be made draggable: ${what}`)
        }

        if (this._held.has(figure) || figure.isDraggable) {
            throw new InvalidArgumentError(`The point "${figure.name}" is already draggable`)
        }

        const { along, bounds, follow, target } = options as Record<string, unknown>

        if (along !== undefined && along !== 'x' && along !== 'y') {
            throw new InvalidArgumentError(`Invalid along ${JSON.stringify(along)} for the point "${figure.name}": expected 'x' or 'y'`)
        }

        if (target !== undefined && !(target instanceof Point)) {
            throw new InvalidArgumentError(`The target of the point "${figure.name}" must be a point`)
        }

        if (follow !== undefined
            && (!Array.isArray(follow) || follow.some(limit => typeof limit !== 'function' && !(limit instanceof AbstractFigure)))) {
            throw new InvalidArgumentError(`The follow of the point "${figure.name}" must be a list of functions and figures`)
        }

        for (const [axis, domain] of Object.entries((bounds ?? {}) as Record<string, Domain | undefined>)) {
            if (domain !== undefined && !(Number.isFinite(domain.min) && Number.isFinite(domain.max))) {
                throw new InvalidArgumentError(`Invalid bounds ${axis} ${JSON.stringify(domain)} for the point "${figure.name}": expected {min, max}, two finite numbers`)
            }
        }
    }

    /** Take a figure out of the graph: its svg, its name and the links to the figures it depends on. */
    protected _detach(figure: AbstractFigure): void {
        figure.dispose()
        figure.element.remove()

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this._figures[figure.name]
        this._total--
        this._held.delete(figure)
        this._drags.forEach((drag, key) => {
            if (key === figure || drag.figure === figure) {
                this._drags.delete(key)
            }
        })
        this._links.delete(figure)
        this._dependents = null
    }

    /**
     * The figures that each figure is a dependency of. Read again from the configurations of the figures that changed since the last
     * time (a figure that has a new `config` has other dependencies); the same map otherwise.
     */
    protected _dependentsMap(): Map<AbstractFigure, AbstractFigure[]> {
        const figures = Object.values(this._figures)
        let changed = this._dependents === null

        for (const figure of figures) {
            if (this._links.get(figure)?.config !== figure.config) {
                this._links.set(figure, {config: figure.config, dependencies: figuresIn(figure.config)})
                changed = true
            }
        }

        if (this._dependents !== null && !changed) {
            return this._dependents
        }

        const dependents = new Map<AbstractFigure, AbstractFigure[]>()

        for (const figure of figures) {
            for (const dependency of this._links.get(figure)?.dependencies ?? []) {
                dependents.set(dependency, [...(dependents.get(dependency) ?? []), figure])
            }
        }

        this._dependents = dependents

        return dependents
    }

    /**
     * The figures that depend on `sources`, directly or not, without the sources themselves, each one after the figures it depends on.
     * @throws InvalidArgumentError if one of them depends on itself.
     */
    protected _affectedBy(sources: readonly AbstractFigure[]): AbstractFigure[] {
        const dependents = this._dependentsMap()
        const state = new Map<AbstractFigure, 'visiting' | 'done'>()
        const order: AbstractFigure[] = []

        const visit = (figure: AbstractFigure): void => {
            state.set(figure, 'visiting')

            for (const next of dependents.get(figure) ?? []) {
                const seen = state.get(next)

                if (seen === 'visiting') {
                    throw new InvalidArgumentError(`The figure "${next.name}" depends on itself, through "${figure.name}"`)
                }

                if (seen === undefined) {
                    visit(next)
                }
            }

            state.set(figure, 'done')
            order.push(figure)
        }

        sources.forEach((source) => {
            if (!state.has(source)) {
                visit(source)
            }
        })

        // The last figure visited is the first of the order.
        return order.reverse().filter(figure => !sources.includes(figure))
    }

    /** Remove the grid and the axes at the border, and only them: the figures keep their own grids, and `Ox` and `Oy` stay. */
    protected _clearLayout(): void {
        this._decor.forEach((figure) => {
            figure.dispose()
            figure.element.remove()
        })

        this._decor = []
        this._mainGrid = null
    }

    /**
     * Draw the grid and the axes again, and give the axes.
     *
     * Each axis always exists on its line. It is the axis that is drawn, with what the display says (a graduation, a name...), unless its
     * line is out of the drawing: it is then hidden, and an axis is drawn at the nearest border instead (see `axisPlacement`).
     * `Ox` and `Oy` are made once and given their new place and style afterward, so that the figures built on them keep following them.
     * @throws InvalidArgumentError if the display has a grid or an axis that is not valid.
     */
    protected _makeLayout(): ILayoutFigures {
        this._clearLayout()

        const grid = this._display.grid
        this._mainGrid = grid ? this._decorate(new Grid(this, MAIN_GRID, grid === true ? {} : grid), LayerName.GRIDS) : null

        // The axes always exist, but are drawn only when they are asked for.
        const {origin, axis, width, height} = this._config
        const wanted = axesDisplay(this._display.axis)
        const placement = axisPlacement(origin, width, height, axis)

        const x = this._makeLayoutAxis(Axes.X, axis.x, wanted.x, placement.x)
        const y = this._makeLayoutAxis(Axes.Y, axis.y, wanted.y, placement.y)

        // The axes lie in the layer in the same order whether they were made now or before.
        new Set([x.line, x.drawn, y.line, y.drawn]).forEach((figure) => {
            this._layers.axis.add(figure.element)
        })

        return {axes: {x: x.line, y: y.line}, drawn: {x: x.drawn, y: y.drawn}}
    }

    /**
     * The axis on its line, and the one that is drawn: the same, unless the line is out of the drawing. The line stays, without anything
     * drawn, and the axis is drawn at the border.
     * @param d the vector of one unit of the axis, in pixels.
     */
    protected _makeLayoutAxis(name: string, d: XY, display: IAxisDisplay | false, where: AxisPlacement): { line: Axis, drawn: Axis } {
        if (!where.displaced) {
            const own = this._makeAxis(name, d, this._config.origin, display, where.side, true)

            return {line: own, drawn: own}
        }

        const line = this._makeAxis(name, d, this._config.origin, false, where.side, true)

        return {line, drawn: display === false ? line : this._makeAxis(`${name}${EDGE}`, d, where.A, display, where.side)}
    }

    /**
     * An axis of the layout, in the layer of the axes, hidden if the display does not ask for it (`false`).
     * @param kept the axis is one of `Ox` and `Oy`: the one of the previous drawing is given its new place and style, if there was one.
     */
    protected _makeAxis(name: string, d: XY, A: XY, display: IAxisDisplay | false, side: 'left' | 'right', kept = false): Axis {
        const config = axisConfigOf({A, d}, side, display)
        let axis = kept ? this._lines.get(name) : undefined

        if (axis) {
            // As if it was new: the options of the previous layout (a color, a dash) are not the ones of this one.
            axis.resetStyle()
            axis.config = config
        } else if (kept) {
            axis = new Axis(this, name, config)
            this._layers.axis.add(axis.element)
            this._lines.set(name, axis)
        } else {
            axis = this._decorate(new Axis(this, name, config), LayerName.AXIS)
        }

        axis.static = true

        return display === false ? axis.hide() : axis
    }

    /** Put a figure of the layout in a layer, and among the figures that are removed when the layout is drawn again. */
    protected _decorate<F extends AbstractFigure>(figure: F, layer: LayerName): F {
        this._layers[layer].add(figure.element)
        this._decor.push(figure)

        return figure
    }

    /**
     * A function that makes a figure of a class and puts it in a layer.
     * @throws InvalidArgumentError when it is called, see {@link create}.
     */
    protected _maker<C, F extends AbstractFigure>(Figure: new (context: IFigureContext, name: string, config: C) => F, layer: LayerName): (config: C, name: string) => F {
        return (config, name) => this._make(name, layer, () => new Figure(this, name, config))
    }

    /**
     * Make a figure, put it in its layer and among the {@link figures}. The name is checked before the figure is made, which draws it under
     * this name (the `id` of its group in the svg).
     * @throws InvalidArgumentError if the name cannot be the one of a figure (see {@link create}).
     */
    protected _make<F extends AbstractFigure>(name: string, layer: LayerName, build: () => F): F {
        this._checkName(name)

        const figure = build()

        this._layers[layer].add(figure.element)
        this._figures[name] = figure
        this._total++

        return figure
    }

    /** @throws InvalidArgumentError if the name is not a text, or is already the one of a figure or of the layout. */
    protected _checkName(name: string): void {
        const value = name as unknown

        if (typeof value !== 'string' || value.trim() === '') {
            throw new InvalidArgumentError(`Invalid name ${JSON.stringify(value)} for a figure: expected a text`)
        }

        if (LAYOUT_NAMES.includes(name)) {
            throw new InvalidArgumentError(`The name "${name}" is the one of a figure of the layout of the graph (the grid and the axes): choose another name`)
        }

        if (Object.hasOwn(this._figures, name)) {
            throw new InvalidArgumentError(`There is already a figure named "${name}"`)
        }
    }
}
