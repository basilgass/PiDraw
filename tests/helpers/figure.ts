import {createSVGWindow} from 'svgdom'
import {registerWindow, SVG, type Svg} from '@svgdotjs/svg.js'
import {Axis} from '../../src/figures/Axis/Axis'
import type {IFigureContext, IGraphConfig, XY} from '../../src/pidraw.common'

const window = createSVGWindow()
registerWindow(window, window.document)

/** A configuration of the graph: 800 x 600 pixels, the origin in the middle, 50 pixels per unit, y pointing up. */
export function graphConfig(overrides: Partial<IGraphConfig> = {}): IGraphConfig {
    return {
        width: 800,
        height: 600,
        origin: {x: 400, y: 300},
        system: 'cartesian_2d',
        axis: {x: {x: 50, y: 0}, y: {x: 0, y: -50}},
        ...overrides
    } as unknown as IGraphConfig
}

/** A new empty svg, in a virtual DOM. */
export function createSvg(): Svg {
    return SVG(window.document.documentElement) as Svg
}

/**
 * What a figure needs from its graph, without a `Graph`. The `config` is a property that can be reassigned, like
 * the one of `Graph`: a figure must see the change.
 */
export function createContext(config: IGraphConfig = graphConfig()): IFigureContext & { config: IGraphConfig } {
    return {rootSVG: createSvg().clear(), config}
}

/**
 * The axes of the coordinate system of a context, `Ox` and `Oy`, as the graph makes them: the line through the origin with the vector
 * of one unit of each axis, whole (no padding).
 */
export function createAxes(context: IFigureContext & { config: IGraphConfig }): { Ox: Axis, Oy: Axis } {
    const {origin, axis} = context.config
    const make = (name: string, d: XY) => new Axis(context, name, {director: {A: origin, d}, padding: 0})

    return {Ox: make('Ox', axis.x), Oy: make('Oy', axis.y)}
}
