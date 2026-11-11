import type {G} from "@svgdotjs/svg.js"
import type {IControlsGraph} from "./controls/controls.types"
import type {IMeasure, TickSelection} from "./calculus"
import type {IGridConfig} from "./figures/Grid/Grid.types"
import type {Point} from "./figures/Point/Point"
import type {AbstractFigure} from "./figures/AbstractFigure/AbstractFigure"
import type {Graph} from "./Graph"
import type {AxisVectors, CoordinateSystem, IGraphConfig, LayerName, XY} from "./pidraw.common"

export type TeXConverterType = (value: string) => string

/** The svg group of each layer of the graph, from the back to the front in the order of {@link LayerName}. */
export type Layers = Record<LayerName, G>

export interface IGraphDragEvent {
    graph: Graph
    /** The point that is held: the handle, if the point that moves is not the one that is held. */
    figure: AbstractFigure
    /** The point that moves with the mouse: the `target` of the drag, the held point itself without one. */
    target: Point
}

/** What a move of a point that is dragged did: the update, and where the point snapped. */
export interface IGraphMove extends IGraphUpdate {
    /** The position, in pixels, that the point snapped to (see `snap`): `null` when it is not on one. */
    snapped: XY | null
}

/** What an update of the graph did: how many figures it reached, out of the figures the graph has. */
export interface IGraphUpdate {
    /** The figures drawn again, and the ones that were moved, whose label was put at its place. */
    updated: number,
    /** The figures of the graph (the grid and the axes of the layout are not among them). */
    total: number
}

/** A point was moved by the mouse: with how many figures this reached. */
export interface IGraphDragMoveEvent extends IGraphDragEvent, IGraphMove {
}

/**
 * A module that acts on a graph from outside (the animation, a zoom, the slides): the program makes it with the graph
 * (`new Animate(graph)`) and the module attaches itself with `graph.attach`. The graph never imports a controller: it only calls this contract.
 */
export interface IGraphController {
    /** Called when the graph is taken out of the page (`dispose`): stop what the controller does, and let go of the listeners and the timers. */
    dispose(): void

    /**
     * Called after figures were removed from the graph (`remove`, with the ones that depended on it, or `clear`, which `dispose` calls too),
     * with their names: forget the ones that were read. Not called when no figure was removed.
     */
    onFiguresRemoved?(names: string[]): void

    /**
     * Called when a figure tells the graph that something a controller may care about changed in it (the steps of a presentation, `slide`): its
     * name. A controller reads what it needs from the figure, `graph.figures[name]`.
     */
    onFigureChanged?(name: string): void

    /**
     * Called when a theme gave the graph a value, or took it away (`Graph.setControl`, which `Draw` calls after reading the code): the name of the
     * entry. A controller reads what it needs in `graph.controls`.
     */
    onControlsChanged?(key: keyof IControlsGraph): void

    /**
     * Called after the layout of the graph was drawn again (`updateLayout`, whoever asked for it) with the configuration that is now the one of
     * the graph: the size, the origin and the vector of a unit of each axis. A controller that keeps what it read from the layout reads it again.
     */
    onLayoutChanged?(config: IGraphConfig): void
}

export interface IGraphEventMap {
    'dragstart': IGraphDragEvent
    'dragmove': IGraphDragMoveEvent
    'dragend': IGraphDragEvent
}

/** What an axis of the coordinate system shows besides its line. */
export interface IAxisDisplay {
    /** The step of the graduation, in units of the axis. Without it the axis is not graduated. */
    step?: number,
    /** What is written at the graduations: the numbers, or fractions of pi. */
    labels?: 'numbers' | 'pi',
    /** The name written at the end of the axis. */
    name?: string,
    /** Which ticks are drawn (`{every: 5}`, `{first: true}`, both): the graduation has a step of 1 when there is no step. */
    marks?: TickSelection,
    /** On which ticks a number is written, or `'none'`. */
    numbers?: TickSelection | 'none',
    /** How far the axis stops from the borders of the drawing, in pixels. */
    padding?: number,
    /** The part of the axis that is drawn, in units from the zero. */
    range?: { min: number, max: number }
}

/** What the graph shows besides the figures. */
export interface IGraphDisplay {
    /** The axes of the coordinate system: both (`true`), or each one with what it shows (`false` for one that is not drawn). */
    axis?: boolean | { x: IAxisDisplay | false, y: IAxisDisplay | false },
    /** The grid: `true` for a step of 1, or its config. */
    grid?: boolean | IGridConfig,
}

/**
 * What the constructor of a graph accepts. Every field is optional: a missing one takes the default of the graph
 * (see `resolveGraphConfig`).
 */
export interface IGraphConstructorConfig {
    /** The vector of one unit of each axis, in pixels (default: 1 cm to the right and 1 cm up). */
    axis?: AxisVectors,
    display?: IGraphDisplay,
    /** In pixels (default 600). */
    height?: number,
    /** How the labels write a length (default: as they are, without a unit). */
    measure?: Partial<IMeasure>,
    /** Where the point (0, 0) is, in pixels from the top left corner of the drawing (default: the middle). */
    origin?: XY,
    system?: CoordinateSystem,
    /** Turns a LaTeX text into HTML, for the labels written as LaTeX. */
    tex?: TeXConverterType
    /** In pixels (default 800). */
    width?: number,
}
