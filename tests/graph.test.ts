import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest'
import {Graph} from '../src/Graph'
import {Box} from '@svgdotjs/svg.js'
import {Draw} from '../src/Draw'
import {LOOP_STYLE} from '../src/Animate'
import type {IDraggableConfig} from '../src/Graph'
import type {IGraphDragEvent, IGraphDragMoveEvent} from '../src/pidraw.common'
import {TIKZ_PREAMBLE} from '../src/figures/AbstractFigure/AbstractFigure.tikz'
import {basic_examples} from '../demo/parsing_examples/basic_examples'
import {InvalidArgumentError, NotImplementedError} from '../src/errors'
import {COORDINATE_SYSTEM, LAYER_NAME} from '../src/pidraw.common'
import type {AbstractFigure} from '../src/figures/AbstractFigure/AbstractFigure'
import {Arc} from '../src/figures/Arc/Arc'
import {Axis} from '../src/figures/Axis/Axis'
import {Bezier} from '../src/figures/Bezier/Bezier'
import {Circle} from '../src/figures/Circle/Circle'
import {FillBetween} from '../src/figures/FillBetween/FillBetween'
import {Follow} from '../src/figures/Follow/Follow'
import {Grid} from '../src/figures/Grid/Grid'
import {Line} from '../src/figures/Line/Line'
import {Parametric} from '../src/figures/Parametric/Parametric'
import {Path} from '../src/figures/Path/Path'
import {Plot} from '../src/figures/Plot/Plot'
import {Point} from '../src/figures/Point/Point'
import {Polygon} from '../src/figures/Polygon/Polygon'
import {Riemann} from '../src/figures/Riemann/Riemann'
import {PX_PER_CM} from '../src/calculus'
import {createContainer, createGraph, useDocument} from './helpers/graph'

beforeAll(useDocument)

/** How many elements a layer holds. */
function count(layer: { children(): { length: number } }): number {
    return layer.children().length
}

describe('Graph construction', () => {
    test('is built in the container it is given', () => {
        const {graph, container} = createGraph()

        expect(graph.rootSVG).toBeDefined()
        expect(container.children.length).toBe(1)
    })

    test('finds its container by id', () => {
        const container = createContainer('graph-by-id')

        new Graph('graph-by-id')

        expect(container.children.length).toBe(1)
    })

    test('refuses a container that does not exist, instead of drawing nowhere', () => {
        expect(() => new Graph('nothing-has-this-id')).toThrow(InvalidArgumentError)
    })

    test('is 800 x 600 with its origin in the middle and a unit of 1 cm by default', () => {
        const {graph} = createGraph()

        expect(graph.config).toEqual({
            width: 800,
            height: 600,
            origin: {x: 400, y: 300},
            system: COORDINATE_SYSTEM.CARTESIAN_2D,
            axis: {x: {x: PX_PER_CM, y: 0}, y: {x: 0, y: -PX_PER_CM}}
        })
    })

    test('keeps the origin it is given', () => {
        const {graph} = createGraph({width: 1000, height: 400, origin: {x: 10, y: 20}})

        expect(graph.config.origin).toEqual({x: 10, y: 20})
    })

    test('puts the origin in the middle of a size it is given', () => {
        const {graph} = createGraph({width: 1000, height: 400})

        expect(graph.config.origin).toEqual({x: 500, y: 200})
    })

    test('keeps the default of a value that is undefined', () => {
        const {graph} = createGraph({width: undefined, origin: undefined})

        expect(graph.config.width).toBe(800)
        expect(graph.config.origin).toEqual({x: 400, y: 300})
    })

    test('does not keep the display and the converter in its config', () => {
        const {graph} = createGraph({display: {grid: false}, tex: (value) => value})

        expect(Object.keys(graph.config).sort()).toEqual(['axis', 'height', 'origin', 'system', 'width'])
    })

    test.each([
        ['a width of 0', {width: 0}],
        ['a negative height', {height: -5}],
        ['a width that is not a number', {width: Number.NaN}],
        ['a height that is infinite', {height: Infinity}]
    ])('refuses %s', (_, config) => {
        expect(() => createGraph(config)).toThrow(InvalidArgumentError)
    })

    test('refuses a coordinate system it cannot draw, and leaves nothing in the container', () => {
        const container = createContainer()

        expect(() => new Graph(container, {system: COORDINATE_SYSTEM.POLAR})).toThrow(NotImplementedError)
        expect(container.children.length).toBe(0)
    })

    test('keeps the default of a display that is undefined', () => {
        const {graph} = createGraph({display: {grid: undefined}})

        expect(graph.display.grid).toBe(true)
    })
})

describe('Graph layout', () => {
    test('draws a grid and the axes Ox and Oy on their line', () => {
        const {graph} = createGraph()

        expect(graph.mainGrid).not.toBeNull()
        expect(count(graph.layers.grids)).toBe(1)
        expect(count(graph.layers.axis)).toBe(2)
        expect([graph.axes.x.name, graph.axes.y.name]).toEqual(['Ox', 'Oy'])
        expect(graph.drawnAxes.x).toBe(graph.axes.x)
        expect(graph.drawnAxes.y).toBe(graph.axes.y)
    })

    test('draws no grid when the display says none', () => {
        const {graph} = createGraph({display: {grid: false}})

        expect(graph.mainGrid).toBeNull()
        expect(count(graph.layers.grids)).toBe(0)
    })

    test('hides an axis that is not asked for, which stays whole to be built from', () => {
        const {graph} = createGraph({display: {axis: {x: {}, y: false}}})

        expect(graph.axes.y.element.css('display')).toBe('none')
        expect(graph.axes.x.element.css('display')).not.toBe('none')
    })

    test('draws an axis at the border when its line is out of the drawing', () => {
        const {graph} = createGraph({origin: {x: -100, y: 300}})

        expect(graph.axes.y.name).toBe('Oy')
        expect(graph.axes.y.element.css('display')).toBe('none')
        expect(graph.drawnAxes.y.name).toBe('Oy-edge')
        expect(graph.drawnAxes.x).toBe(graph.axes.x)
        expect(count(graph.layers.axis)).toBe(3)
    })

    test('draws the layout again for a new configuration and a new display', () => {
        const {graph} = createGraph()

        graph.updateLayout({...graph.config, width: 1200, height: 500}, {grid: false, axis: true})

        const box = graph.rootSVG.viewbox()
        expect([box.width, box.height]).toEqual([1200, 500])
        expect(graph.config.width).toBe(1200)
        expect(graph.mainGrid).toBeNull()
        expect(count(graph.layers.grids)).toBe(0)
    })

    test('does not pile up the grid and the axes when it is drawn again', () => {
        const {graph} = createGraph()

        graph.updateLayout()
        graph.updateLayout()

        expect(count(graph.layers.grids)).toBe(1)
        expect(count(graph.layers.axis)).toBe(2)
    })

    test('is left as it was by a configuration that is not valid', () => {
        const {graph} = createGraph()

        expect(() => { graph.updateLayout({...graph.config, width: -1}) }).toThrow(InvalidArgumentError)
        expect(() => { graph.updateLayout({...graph.config, system: COORDINATE_SYSTEM.POLAR}) }).toThrow(NotImplementedError)

        expect(graph.config.width).toBe(800)
        expect(count(graph.layers.grids)).toBe(1)
        expect(count(graph.layers.axis)).toBe(2)
    })

    test('draws the previous layout again when the display cannot be drawn', () => {
        const {graph} = createGraph()
        const display = graph.display

        expect(() => { graph.updateLayout({...graph.config, width: 1200}, {grid: {step: {x: 0, y: 1}}, axis: true}) }).toThrow(InvalidArgumentError)

        expect(graph.config.width).toBe(800)
        expect(graph.display).toBe(display)
        expect(graph.rootSVG.viewbox().width).toBe(800)
        expect(count(graph.layers.grids)).toBe(1)
        expect(count(graph.layers.axis)).toBe(2)
    })

    test('keeps the grids of the figures when it is drawn again', () => {
        const {graph} = createGraph()
        const grid = graph.create.grid({}, 'G')

        graph.updateLayout()

        expect(graph.layers.grids.has(grid.element)).toBe(true)
        expect(count(graph.layers.grids)).toBe(2)
    })
})

/** How many nodes the svg of a graph holds. */
function nodes(node: { childNodes?: ArrayLike<unknown> }): number {
    return Array.from(node.childNodes ?? []).reduce<number>((sum, child) => sum + 1 + nodes(child as { childNodes?: ArrayLike<unknown> }), 0)
}

const O = {x: 0, y: 0}

/** Each kind of figure of `create`: the layer it is put in, its class, and how to make one named `F`. */
const FIGURES: [string, LAYER_NAME, abstract new (...args: never[]) => AbstractFigure, (graph: Graph) => AbstractFigure][] = [
    ['point', LAYER_NAME.POINTS, Point, g => g.create.point(O, 'F')],
    ['line', LAYER_NAME.MAIN, Line, g => g.create.line({through: {A: O, B: {x: 100, y: 50}}}, 'F')],
    ['path', LAYER_NAME.MAIN, Path, g => g.create.path({d: 'M 0 0 L 10 10'}, 'F')],
    ['bezier', LAYER_NAME.MAIN, Bezier, g => g.create.bezier({through: [O, {x: 100, y: 50}, {x: 200, y: 0}].map(point => ({point}))}, 'F')],
    ['plot', LAYER_NAME.PLOTS, Plot, g => g.create.plot({expression: 'x^2'}, 'F')],
    ['parametric', LAYER_NAME.PLOTS, Parametric, g => g.create.parametric({expressions: {x: 'cos(t)', y: 'sin(t)'}}, 'F')],
    ['circle', LAYER_NAME.MAIN, Circle, g => g.create.circle({center: O, radius: 1}, 'F')],
    ['polygon', LAYER_NAME.MAIN, Polygon, g => g.create.polygon({vertices: [O, {x: 100, y: 0}, {x: 0, y: 100}]}, 'F')],
    ['arc', LAYER_NAME.MAIN, Arc, g => g.create.arc({points: {start: {x: 500, y: 300}, center: {x: 400, y: 300}, end: {x: 400, y: 200}}}, 'F')],
    ['follow', LAYER_NAME.PLOTS_FOREGROUND, Follow, g => g.create.follow({follow: g.create.plot({expression: 'x'}, 'p')}, 'F')],
    ['fillbetween', LAYER_NAME.PLOTS_BACKGROUND, FillBetween, g => g.create.fillbetween({plot: g.create.plot({expression: 'x'}, 'p')}, 'F')],
    ['grid', LAYER_NAME.GRIDS, Grid, g => g.create.grid({}, 'F')],
    ['axis', LAYER_NAME.MAIN, Axis, g => g.create.axis({director: {A: O, d: {x: 50, y: 0}}}, 'F')],
    ['riemann', LAYER_NAME.PLOTS_BACKGROUND, Riemann, g => g.create.riemann({plot: g.create.plot({expression: 'x', domain: {min: 0, max: 4}}, 'p')}, 'F')]
]

describe('Graph create', () => {
    test.each(FIGURES)('%s makes a figure of its class, in its layer and among the figures', (_, layer, Class, make) => {
        const {graph} = createGraph()
        const figure = make(graph)

        expect(figure).toBeInstanceOf(Class)
        expect(graph.figures.F).toBe(figure)
        expect(graph.layers[layer].has(figure.element)).toBe(true)
    })

    test('gives a point its name as a label when it is asked for', () => {
        const {graph} = createGraph()
        const point = graph.create.point(O, 'A', {html: false})

        expect(point.element.findOne('#A-label')).not.toBeNull()
        expect(graph.create.point(O, 'B').element.findOne('#B-label')).toBeNull()
    })

    test('refuses a name that a figure already has, and draws nothing', () => {
        const {graph} = createGraph()
        const first = graph.create.point(O, 'A')
        const before = nodes(graph.rootSVG.node)

        expect(() => graph.create.point({x: 10, y: 10}, 'A')).toThrow(InvalidArgumentError)
        expect(() => graph.create.line({through: {A: O, B: {x: 1, y: 1}}}, 'A')).toThrow(InvalidArgumentError)

        expect(graph.figures.A).toBe(first)
        expect(nodes(graph.rootSVG.node)).toBe(before)
    })

    test.each(['Ox', 'Oy', 'Ox-edge', 'Oy-edge', 'MAINGRID'])('refuses %s, the name of a figure of the layout', (name) => {
        const {graph} = createGraph()
        const before = nodes(graph.rootSVG.node)

        expect(() => graph.create.point(O, name)).toThrow(InvalidArgumentError)
        expect(nodes(graph.rootSVG.node)).toBe(before)
    })

    test.each([[''], ['  ']])('refuses the name "%s"', (name) => {
        const {graph} = createGraph()

        expect(() => graph.create.point(O, name)).toThrow(InvalidArgumentError)
    })

    test('takes the names of the properties of an object as names like any other', () => {
        const {graph} = createGraph()

        const proto = graph.create.point(O, '__proto__')
        const inherited = graph.create.point(O, 'toString')

        expect(Object.getOwnPropertyDescriptor(graph.figures, '__proto__')?.value).toBe(proto)
        expect(Object.getOwnPropertyDescriptor(graph.figures, 'toString')?.value).toBe(inherited)
        expect(Object.keys(graph.figures)).toEqual(['__proto__', 'toString'])
    })

    test('leaves the name free when the figure cannot be made', () => {
        const {graph} = createGraph()

        expect(() => graph.create.line({} as never, 'L')).toThrow(InvalidArgumentError)
        expect(Object.keys(graph.figures)).toEqual([])

        expect(graph.create.line({through: {A: O, B: {x: 1, y: 1}}}, 'L')).toBeInstanceOf(Line)
    })
})

describe('Graph remove and clear', () => {
    test('removes a figure from the svg and from the figures, and frees its name', () => {
        const {graph} = createGraph()
        const point = graph.create.point(O, 'A')
        const dispose = vi.spyOn(point, 'dispose')

        graph.remove('A')

        expect(dispose).toHaveBeenCalledOnce()
        expect(graph.figures.A).toBeUndefined()
        expect(graph.layers.points.has(point.element)).toBe(false)
        expect(() => graph.create.point(O, 'A')).not.toThrow()
    })

    test('refuses to remove a figure that does not exist', () => {
        const {graph} = createGraph()

        expect(() => { graph.remove('A') }).toThrow(InvalidArgumentError)
        expect(() => { graph.remove('Ox') }).toThrow(InvalidArgumentError)
    })

    test('removes every figure and keeps the layout', () => {
        const {graph} = createGraph()
        const follow = graph.create.follow({follow: graph.create.plot({expression: 'x'}, 'f')}, 't')
        const dispose = vi.spyOn(follow, 'dispose')
        graph.create.point(O, 'A')
        graph.create.grid({}, 'G')

        graph.clear()

        expect(Object.keys(graph.figures)).toEqual([])
        expect(dispose).toHaveBeenCalledOnce()
        expect(count(graph.layers.points)).toBe(0)
        expect(count(graph.layers.grids)).toBe(1)
        expect(graph.mainGrid).not.toBeNull()
        expect(count(graph.layers.axis)).toBe(2)
    })
})

/** A graph with figures that depend on each other: `d` and `P` depend on `A`, `e` and `P` on `C`, `Z` on nothing. */
function createDependent() {
    const {graph} = createGraph()
    const A = graph.create.point({x: 0, y: 0}, 'A', {html: false})
    const B = graph.create.point({x: 2, y: 1}, 'B')
    const C = graph.create.point({x: 0, y: 3}, 'C')
    const D = graph.create.point({x: 3, y: 3}, 'D')
    const d = graph.create.line({through: {A, B}}, 'd')
    const e = graph.create.line({through: {A: C, B: D}}, 'e')
    const P = graph.create.point({intersection: {A: d, B: e}}, 'P')
    const Z = graph.create.point({x: -5, y: -5}, 'Z')
    const figures = {A, B, C, D, d, e, P, Z}
    const computed = Object.fromEntries(Object.entries(figures).map(([name, figure]) => [name, vi.spyOn(figure, 'computed')]))

    return {graph, ...figures, computed}
}

/** Move a point by a vector in pixels, as the user does. */
function shift(point: Point, dx = 30, dy = 20): void {
    point.pixels = {x: point.pixels.x + dx, y: point.pixels.y + dy}
}

describe('Graph update', () => {
    test('draws again only the figures that depend on the figure that moved', () => {
        const {graph, A, computed} = createDependent()
        shift(A)

        graph.update(A)

        const drawn = Object.entries(computed).filter(([, spy]) => spy.mock.calls.length > 0).map(([name]) => name)
        expect(drawn).toEqual(['d', 'P'])
        expect(computed.d).toHaveBeenCalledTimes(1)
        expect(computed.P).toHaveBeenCalledTimes(1)
    })

    test('draws a figure after the figures it depends on', () => {
        const {graph, A, computed} = createDependent()
        shift(A)

        graph.update(A)

        expect(computed.d.mock.invocationCallOrder[0]).toBeLessThan(computed.P.mock.invocationCallOrder[0])
    })

    test('draws once a figure that depends on several figures that moved', () => {
        const {graph, A, C, computed} = createDependent()
        shift(A)
        shift(C)

        graph.update([A, C])

        expect(computed.d).toHaveBeenCalledTimes(1)
        expect(computed.e).toHaveBeenCalledTimes(1)
        expect(computed.P).toHaveBeenCalledTimes(1)
        expect(computed.A).not.toHaveBeenCalled()
        expect(computed.C).not.toHaveBeenCalled()
    })

    test('puts the label of the figure that moved at its place, without drawing the figure again', () => {
        const {graph, A, computed} = createDependent()
        const moveLabel = vi.spyOn(A, 'moveLabel')
        shift(A)

        graph.update(A)

        expect(computed.A).not.toHaveBeenCalled()
        expect(moveLabel).toHaveBeenCalled()
    })

    test('does not change the list of figures it is given', () => {
        const {graph, A, C} = createDependent()
        const changed = Object.freeze([A, C])

        expect(() => { graph.update(changed) }).not.toThrow()
        expect(changed).toEqual([A, C])
    })

    test('draws every figure again without a figure that moved', () => {
        const {graph, computed} = createDependent()

        graph.update()

        Object.values(computed).forEach((spy) => {
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    test('leaves a static figure as it is, unless it is forced', () => {
        const {graph, Z, computed} = createDependent()
        Z.static = true

        graph.update()
        expect(computed.Z).not.toHaveBeenCalled()

        graph.update(undefined, true)
        expect(computed.Z).toHaveBeenCalledTimes(1)
    })

    test('does not draw again a figure that the user holds, only its label', () => {
        const {graph, A, computed} = createDependent()
        const moveLabel = vi.spyOn(A, 'moveLabel')

        graph.draggable(A)
        graph.update()

        expect(computed.A).not.toHaveBeenCalled()
        expect(moveLabel).toHaveBeenCalled()
    })

    test('follows the figures a figure is given afterward', () => {
        const {graph, A, C, d, computed} = createDependent()

        d.config = {through: {A: C, B: {x: 10, y: 10}}}
        computed.d.mockClear()
        shift(A)
        graph.update(A)
        expect(computed.d).not.toHaveBeenCalled()

        shift(C)
        graph.update(C)
        expect(computed.d).toHaveBeenCalledTimes(1)
    })

    test('refuses a figure that depends on itself', () => {
        const {graph, A, d} = createDependent()

        d.config = {parallel: {to: d, through: A}}

        expect(() => { graph.update(A) }).toThrow(InvalidArgumentError)
    })

    test('draws again every figure when the layout is drawn again, even the static ones', () => {
        const {graph, Z, computed} = createDependent()
        Z.static = true

        graph.updateLayout()

        expect(computed.Z).toHaveBeenCalledTimes(1)
        expect(computed.A).toHaveBeenCalledTimes(1)
    })
})

describe('Graph remove with figures that depend on the one removed', () => {
    test('refuses to remove a figure that others depend on, and names them', () => {
        const {graph} = createDependent()

        expect(() => graph.remove('A')).toThrow(InvalidArgumentError)
        expect(() => graph.remove('A')).toThrow(/"d".*"P"/)
        expect(Object.keys(graph.figures)).toHaveLength(8)
    })

    test('removes the figures that depend on it first with the option cascade', () => {
        const {graph, B} = createDependent()

        expect(graph.remove('A', {cascade: true})).toEqual(['P', 'd', 'A'])

        expect(Object.keys(graph.figures).sort()).toEqual(['B', 'C', 'D', 'Z', 'e'])
        expect(() => { graph.update(B) }).not.toThrow()
    })

    test('removes a figure that nothing depends on', () => {
        const {graph} = createDependent()

        expect(graph.remove('P')).toEqual(['P'])
        expect(graph.remove('A', {cascade: true})).toEqual(['d', 'A'])
    })

    test('removes every figure with clear, whatever depends on what', () => {
        const {graph} = createDependent()

        graph.clear()

        expect(Object.keys(graph.figures)).toEqual([])
        expect(() => graph.create.point({x: 0, y: 0}, 'A')).not.toThrow()
    })
})

/** The svg of a drawing, without the identifiers svg.js numbers. */
function drawing(draw: Draw): string {
    return draw.graph.rootSVG.svg().replace(/Svgjs\w*\d+/g, 'Svgjs').replace(/svgjs:data="[^"]*"/g, '')
}

describe('Graph update of the dependents gives the same drawing as the update of everything', () => {
    test.each(basic_examples.map(example => [example.name, example.code]))('%s', (_, code) => {
        const targeted = new Draw(createContainer(), {code})
        const everything = new Draw(createContainer(), {code})

        // A point that is not built from other figures, which nothing draws again: it stays where it was moved.
        const free = Object.keys(targeted.graph.figures).filter((name) => {
            const figure = targeted.graph.figures[name]

            return figure instanceof Point && Object.hasOwn(figure.config, 'coordinates') && !name.endsWith('_drag')
        })

        for (const name of free) {
            const moved = targeted.graph.figures[name] as Point
            const other = everything.graph.figures[name] as Point

            shift(moved)
            shift(other)
            targeted.graph.update(moved)

            // What the user held was left alone: do the same with the full update.
            other.isDraggable = true
            other.updateLabel()
            everything.graph.update()

            expect(drawing(targeted), name).toBe(drawing(everything))
        }
    })
})

/**
 * The mouse moves the shape of a point so that its center is at a position, in pixels: the plugin of the drag gives the box that the
 * shape would take.
 */
function dragTo(point: Point, center: { x: number, y: number }): void {
    const box = point.shape.bbox()

    point.shape.fire('dragmove', {
        event: {},
        handler: {},
        box: new Box(center.x - box.width / 2, center.y - box.height / 2, box.width, box.height),
        dx: 0,
        dy: 0
    })
}

describe('Graph draggable', () => {
    /** A handle at the center of the drawing, and a point under it, with a line from it to another point. */
    function createHandle(options?: IDraggableConfig) {
        const {graph} = createGraph()
        const target = graph.create.point({x: 0, y: 1}, 'A')
        const B = graph.create.point({x: 2, y: 1}, 'B')
        const d = graph.create.line({through: {A: target, B}}, 'd')
        const handle = graph.create.point(target.pixels, 'T')

        handle.asCircle(30)
        graph.draggable(handle, {target, ...options})

        return {graph, target, B, d, handle}
    }

    test('moves the point by the distance the mouse moved', () => {
        const {graph} = createGraph()
        const point = graph.create.point({x: 0, y: 0}, 'T')
        point.asCircle(30)
        graph.draggable(point)

        const start = {...point.pixels}
        dragTo(point, {x: start.x + 10, y: start.y + 5})

        expect(point.pixels).toEqual({x: start.x + 10, y: start.y + 5})
    })

    test('keeps the point in the drawing', () => {
        const {graph} = createGraph()
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point)

        dragTo(point, {x: -50, y: 700})

        expect(point.pixels).toEqual({x: 0, y: 600})
    })

    test('moves the target with the point, and draws again the figures built on the target', () => {
        const {target, d, handle} = createHandle()
        const computed = vi.spyOn(d, 'computed')

        dragTo(handle, {x: 300, y: 200})

        expect(handle.pixels).toEqual({x: 300, y: 200})
        expect(target.pixels).toEqual({x: 300, y: 200})
        expect(computed).toHaveBeenCalledTimes(1)
    })

    test('calls the callback with the point once it moved', () => {
        const callback = vi.fn()
        const {handle} = createHandle({callback})

        dragTo(handle, {x: 300, y: 200})

        expect(callback).toHaveBeenCalledOnce()
        expect(callback).toHaveBeenCalledWith(handle)
    })

    test('does nothing when the position does not change', () => {
        const callback = vi.fn()
        const {graph, handle} = createHandle({callback})
        dragTo(handle, {x: 300, y: 200})
        callback.mockClear()
        const update = vi.spyOn(graph, 'update')
        const moved = vi.fn()
        graph.on('dragmove', moved)

        dragTo(handle, {x: 300, y: 200})

        expect(update).not.toHaveBeenCalled()
        expect(callback).not.toHaveBeenCalled()
        expect(moved).not.toHaveBeenCalled()
    })

    test('says how many figures a move reached, out of how many there are', () => {
        const {graph, handle} = createHandle()
        const events: IGraphDragMoveEvent[] = []
        graph.on('dragmove', (e) => { events.push(e.detail) })

        dragTo(handle, {x: 300, y: 200})

        // The handle and the target that moved, and the line that is built on the target; the handle, the target, B and the line exist.
        expect(events).toEqual([{graph, figure: handle, updated: 3, total: 4}])
    })

    test('emits the start and the end of a drag with the point', () => {
        const {graph, handle} = createHandle()
        const started = vi.fn<(e: CustomEvent<IGraphDragEvent>) => void>()
        const ended = vi.fn<(e: CustomEvent<IGraphDragEvent>) => void>()
        graph.on('dragstart', started).on('dragend', ended)

        handle.shape.fire('dragstart', {event: {}, handler: {}, box: handle.shape.bbox()})
        handle.shape.fire('dragend', {event: {}, handler: {}, box: handle.shape.bbox()})

        expect(started.mock.calls[0][0].detail).toEqual({graph, figure: handle})
        expect(ended.mock.calls[0][0].detail).toEqual({graph, figure: handle})
    })

    test('moves along the x axis only, at the height of the target', () => {
        const {target, handle} = createHandle({along: 'x'})
        const height = target.pixels.y

        dragTo(handle, {x: 500, y: 100})

        expect(handle.pixels.x).toBe(500)
        expect(handle.pixels.y).toBeCloseTo(height, 9)
        expect(target.pixels.y).toBeCloseTo(height, 9)
    })

    test('moves along the y axis only, at the abscissa of the target', () => {
        const {target, handle} = createHandle({along: 'y'})
        const abscissa = target.pixels.x

        dragTo(handle, {x: 500, y: 100})

        expect(handle.pixels.x).toBeCloseTo(abscissa, 9)
        expect(handle.pixels.y).toBe(100)
    })

    test('puts the point on the grid, counted from the origin', () => {
        const {graph, handle} = createHandle({grid: true})
        const unit = graph.config.axis.x.x

        // The origin is at 400 and the unit is 37.9 pixels: the lines are not at the multiples of the unit.
        dragTo(handle, {x: 450, y: 250})

        expect(handle.pixels.x).toBeCloseTo(400 + unit, 6)
        expect(handle.pixels.y).toBeCloseTo(300 - unit, 6)
    })

    test('puts the point on the grid that the graph shows, with its step', () => {
        const {graph} = createGraph({display: {grid: {step: {x: 2, y: 2}}}})
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point, {grid: true})

        dragTo(point, {x: 450, y: 250})

        expect(point.pixels.x).toBeCloseTo(400 + 2 * graph.config.axis.x.x, 6)
        expect(point.pixels.y).toBeCloseTo(300 - 2 * graph.config.axis.x.x, 6)
    })

    test('puts the point on the lines of a unit when the graph shows no grid', () => {
        const {graph} = createGraph({display: {grid: false}})
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point, {grid: true})

        dragTo(point, {x: 450, y: 250})

        expect(point.pixels.x).toBeCloseTo(400 + graph.config.axis.x.x, 6)
    })

    test('keeps the point in the bounds, in units', () => {
        const {graph, handle} = createHandle({bounds: {x: {min: -1, max: 1}, y: {min: 0, max: 2}}})
        const unit = graph.config.axis.x.x

        dragTo(handle, {x: 700, y: 700})
        expect(handle.pixels.x).toBeCloseTo(400 + unit, 6)
        expect(handle.pixels.y).toBeCloseTo(300, 6)

        dragTo(handle, {x: 10, y: 10})
        expect(handle.pixels.x).toBeCloseTo(400 - unit, 6)
        expect(handle.pixels.y).toBeCloseTo(300 - 2 * unit, 6)
    })

    test('limits the point by a function', () => {
        const {handle} = createHandle({follow: [(x, y) => ({x: x + 1, y: y - 1})]})

        dragTo(handle, {x: 300, y: 200})

        expect(handle.pixels).toEqual({x: 301, y: 199})
    })

    test('keeps the point on a figure it must follow', () => {
        const {graph} = createGraph()
        const axis = graph.create.line({through: {A: {x: 400, y: 300}, B: {x: 500, y: 300}}}, 'f')
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point, {follow: [axis]})

        dragTo(point, {x: 450, y: 250})

        expect(point.pixels.x).toBeCloseTo(450, 9)
        expect(point.pixels.y).toBeCloseTo(300, 9)
    })

    test('gives the limits the position that the rules left, in the order of the list', () => {
        const seen: number[][] = []
        const record = (name: number) => (x: number, y: number) => {
            seen.push([name, x, y])

            return {x: x + 1, y}
        }
        const {graph} = createGraph()
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point, {along: 'x', follow: [record(1), record(2)]})

        const height = point.pixels.y
        dragTo(point, {x: 500, y: 100})

        expect(seen).toEqual([[1, 500, height], [2, 501, height]])
        expect(point.pixels).toEqual({x: 502, y: height})
    })

    describe('refuses', () => {
        test.each([
            ['a figure that is not a point', (graph: Graph) => graph.create.line({through: {A: {x: 0, y: 0}, B: {x: 1, y: 1}}}, 'L'), {}],
            ['a text', () => 'A', {}],
            ['an along that is not an axis', (graph: Graph) => graph.create.point({x: 0, y: 0}, 'T'), {along: 'z'}],
            ['a target that is not a point', (graph: Graph) => graph.create.point({x: 0, y: 0}, 'T'), {target: {name: 'A'}}],
            ['a limit that is neither a function nor a figure', (graph: Graph) => graph.create.point({x: 0, y: 0}, 'T'), {follow: ['Ox']}],
            ['a list of limits that is not a list', (graph: Graph) => graph.create.point({x: 0, y: 0}, 'T'), {follow: () => ({x: 0, y: 0})}],
            ['a bound that is not finite', (graph: Graph) => graph.create.point({x: 0, y: 0}, 'T'), {bounds: {x: {min: 0, max: Number.NaN}}}]
        ])('%s', (_, make, options) => {
            const {graph} = createGraph()
            const figure = make(graph) as Point

            expect(() => graph.draggable(figure, options as IDraggableConfig)).toThrow(InvalidArgumentError)
            expect(figure instanceof Point ? figure.isDraggable : false).toBe(false)
        })

        test('a point that is already draggable, which would add the listeners twice', () => {
            const {graph} = createGraph()
            const point = graph.create.point({x: 0, y: 0}, 'T')
            const moved = vi.fn()
            graph.on('dragmove', moved)
            graph.draggable(point)

            expect(() => graph.draggable(point)).toThrow(InvalidArgumentError)

            dragTo(point, {x: 300, y: 200})
            expect(moved).toHaveBeenCalledOnce()
        })
    })
})

describe('Draw drag', () => {
    /** The handle of the point `A` of a drawing: the point that the mouse holds. */
    function drawWith(code: string) {
        const draw = new Draw(createContainer(), {code})

        return {draw, A: draw.graph.figures.A as Point, handle: draw.graph.figures.A_drag as Point}
    }

    test('moves a point along the x axis with drag=Ox', () => {
        const {A, handle} = drawWith('A(1,2)->drag=Ox')
        const height = A.pixels.y

        dragTo(handle, {x: 600, y: 100})

        expect(A.pixels.x).toBe(600)
        expect(A.pixels.y).toBeCloseTo(height, 9)
    })

    test('moves a point along the y axis with drag=Oy', () => {
        const {A, handle} = drawWith('A(1,2)->drag=Oy')
        const abscissa = A.pixels.x

        dragTo(handle, {x: 600, y: 100})

        expect(A.pixels.x).toBeCloseTo(abscissa, 9)
        expect(A.pixels.y).toBe(100)
    })

    test('puts a point on the grid with drag=grid', () => {
        const {draw, A, handle} = drawWith('A(1,2)->drag=grid')

        dragTo(handle, {x: 480, y: 210})

        const coordinates = draw.graph.toCoordinates(A.pixels)
        expect(coordinates.x).toBeCloseTo(Math.round(coordinates.x), 6)
        expect(coordinates.y).toBeCloseTo(Math.round(coordinates.y), 6)
    })

    test('keeps a point on a figure with drag=<figure>', () => {
        const {draw, A, handle} = drawWith('f(x)=x^2/4\nA(1,2)->drag=f')

        dragTo(handle, {x: 480, y: 210})

        const f = draw.graph.figures.f as Plot
        const near = f.follow(480, 210)
        expect(A.pixels.x).toBeCloseTo(near.x, 6)
        expect(A.pixels.y).toBeCloseTo(near.y, 6)
    })

    test('draws again the figures built on the point, and says how many', () => {
        const {draw, A, handle} = drawWith('A(1,2)->drag\nB(3,1)\nd=line A,B\nC(-2,-2)')
        const events: IGraphDragMoveEvent[] = []
        draw.graph.on('dragmove', (e) => { events.push(e.detail) })
        const line = draw.graph.figures.d
        const computed = vi.spyOn(line, 'computed')

        dragTo(handle, {x: 300, y: 200})

        expect(A.pixels).toEqual({x: 300, y: 200})
        expect(computed).toHaveBeenCalledOnce()
        // The handle, the point and the line, out of the handle, A, B, d and C.
        expect(events.map(({updated, total}) => ({updated, total}))).toEqual([{updated: 3, total: 5}])
    })

    describe('limits of the option', () => {
        // Only the translation of the option into the limits of the drag is used: a bare instance does.
        function limits(values: unknown[], figures: Record<string, unknown> = {}) {
            const draw = Object.create(Draw.prototype) as { graph: { figures: Record<string, unknown> }, _dragConfig(values: unknown[]): IDraggableConfig }
            draw.graph = {figures}

            return draw._dragConfig(values)
        }

        test('reads grid, Ox and Oy', () => {
            expect(limits(['grid'])).toEqual({grid: true})
            expect(limits(['Ox'])).toEqual({along: 'x'})
            expect(limits(['Oy'])).toEqual({along: 'y'})
        })

        test('combines the values', () => {
            expect(limits(['grid', 'Ox'])).toEqual({grid: true, along: 'x'})
        })

        test('reads a domain, of the x axis by default', () => {
            expect(limits([{min: -2, max: 3}])).toEqual({bounds: {x: {min: -2, max: 3}}})
            expect(limits([{min: -2, max: 3, axis: 'y'}])).toEqual({bounds: {y: {min: -2, max: 3}}})
        })

        test('keeps the part that two domains of the same axis share', () => {
            expect(limits([{min: -2, max: 3}, {min: 0, max: 5}])).toEqual({bounds: {x: {min: 0, max: 3}}})
        })

        test('follows the figures that are named', () => {
            const f = {name: 'f'}

            expect(limits(['f'], {f})).toEqual({follow: [f]})
        })

        test('ignores what means nothing', () => {
            expect(limits([true, 'nothing', 3])).toEqual({})
        })
    })
})

describe('Graph layout figures that stay', () => {
    test('puts the defs first in the svg, where the markers are looked for', () => {
        const {graph} = createGraph()

        expect(graph.rootSVG.node.childNodes[0].nodeName).toBe('defs')
    })

    test('keeps the objects Ox and Oy when the layout is drawn again', () => {
        const {graph} = createGraph()
        const {x, y} = graph.axes

        graph.updateLayout({...graph.config, width: 1000}, {grid: false, axis: {x: {step: 2}, y: false}})

        expect(graph.axes.x).toBe(x)
        expect(graph.axes.y).toBe(y)
        expect(graph.drawnAxes.x).toBe(x)
    })

    test('keeps Ox and Oy where the origin puts them', () => {
        const {graph} = createGraph()
        const {x, y} = graph.axes

        graph.updateLayout({...graph.config, origin: {x: 100, y: 200}})

        expect(x.config.director).toEqual({A: {x: 100, y: 200}, d: graph.config.axis.x})
        expect(y.config.director).toEqual({A: {x: 100, y: 200}, d: graph.config.axis.y})
    })

    test('keeps a figure built on Ox or Oy on it when the layout changes', () => {
        const draw = new Draw(createContainer(), {code: 'A(1,2)\nH=proj A,Ox\nK=proj A,Oy'})

        draw.refreshLayout('x=-4:12,y=-2:10')

        const H = draw.graph.toCoordinates((draw.graph.figures.H as Point).pixels)
        const K = draw.graph.toCoordinates((draw.graph.figures.K as Point).pixels)
        expect(H.x).toBeCloseTo(1, 6)
        expect(H.y).toBeCloseTo(0, 6)
        expect(K.x).toBeCloseTo(0, 6)
        expect(K.y).toBeCloseTo(2, 6)
    })

    test('draws an axis at the border when its line goes out of the drawing, and takes it away when it is back', () => {
        const draw = new Draw(createContainer(), {code: ''})

        draw.refreshLayout('x=2:10,y=-3:3,axis')
        expect(draw.graph.drawnAxes.y.name).toBe('Oy-edge')
        expect(count(draw.graph.layers.axis)).toBe(3)

        draw.refreshLayout('axis')
        expect(draw.graph.drawnAxes.y).toBe(draw.graph.axes.y)
        expect(count(draw.graph.layers.axis)).toBe(2)
    })
})

// Layout parameters with options, a graduation, an axis out of the drawing, no axis, a hidden one...
const LAYOUTS = [
    '',
    'axis',
    'axis,grid',
    'axis->red,w=3',
    'axisX=2->dash',
    'x=2:10,y=-3:3,axis',
    'axis=1,grid=0.5',
    'axisXname=t,axisYname=y',
    'axis->hide',
    'grid->subgrid=4'
]

/**
 * The drawing without the defs: a layout that was drawn before may leave the marker of an axis that is gone (they are named after the
 * figure and found again when it comes back), which a new graph does not have.
 */
function drawingWithoutDefs(draw: Draw): string {
    return drawing(draw).replace(/<defs>[\s\S]*?<\/defs>/, '')
}

/** The markers that the svg uses and does not have. */
function missingMarkers(draw: Draw): string[] {
    const svg = draw.graph.rootSVG.svg()
    const defined = new Set([...svg.matchAll(/id="([^"]+)"/g)].map(match => match[1]))

    return [...svg.matchAll(/url\(#([^)]+)\)/g)].map(match => match[1]).filter(id => !defined.has(id))
}

describe('Graph layout drawn again gives the same drawing as a layout drawn the first time', () => {
    const code = 'A(1,2)\nH=proj A,Ox\nK=proj A,Oy\nP=inter Ox,Oy\nd=line A,P'

    test.each(LAYOUTS.flatMap(before => LAYOUTS.map(after => [before, after])))('"%s" then "%s"', (before, after) => {
        const again = new Draw(createContainer(), {code, parameters: before})
        const first = new Draw(createContainer(), {code, parameters: after})

        again.refreshLayout(after)

        expect(drawingWithoutDefs(again)).toBe(drawingWithoutDefs(first))
        expect(missingMarkers(again)).toEqual([])
    })
})

// A graph of 16 x 12 units: 50 pixels a unit, so a unit is 37.5 pt in TikZ and the window is -8..8 by -6..6.
const NICE = {axis: {x: {x: 50, y: 0}, y: {x: 0, y: -50}}}

describe('Graph tikz', () => {
    test('is the grid and the axes of the layout in a whole tikzpicture', () => {
        const {graph} = createGraph(NICE)

        expect(graph.tikz()).toBe([
            '\\begin{tikzpicture}[x=37.5pt, y=37.5pt]',
            '\\path (-8,-6) rectangle (8,6);',
            '\\begin{scope}',
            '\\clip (-8,-6) rectangle (8,6);',
            '\\draw[draw=lightgray, line width=0.75pt] (-8,-6) grid[xstep=1, ystep=1] (8,6);',
            '\\draw[draw=black, line width=0.75pt, ->] (-7.6,0) -- (7.6,0);',
            '\\draw[draw=black, line width=0.75pt, ->] (0,-5.6) -- (0,5.6);',
            '\\end{scope}',
            '\\end{tikzpicture}'
        ].join('\n'))
    })

    test('has nothing between the begin and the end when there is nothing to draw', () => {
        const {graph} = createGraph({...NICE, display: {grid: false, axis: false}})

        expect(graph.tikz()).toBe([
            '\\begin{tikzpicture}[x=37.5pt, y=37.5pt]',
            '\\path (-8,-6) rectangle (8,6);',
            '\\end{tikzpicture}'
        ].join('\n'))
    })

    test('has the length of a unit of each axis', () => {
        const {graph} = createGraph({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -40}}})

        expect(graph.tikz()).toContain('\\begin{tikzpicture}[x=75pt, y=30pt]')
    })

    test('draws the grid, then the axes, then the figures, layer by layer', () => {
        const {graph} = createGraph(NICE)
        // The point is made first, and still comes after the line, which is in a layer below.
        graph.create.point({x: 1, y: 2}, 'A')
        graph.create.line({through: {A: {x: 0, y: 0}, B: {x: 100, y: 50}}}, 'd')
        const lines = graph.tikz().split('\n')
        const at = (found: (line: string) => boolean) => lines.findIndex(found)
        const grid = at(line => line.includes('grid['))
        const axes = at(line => line.includes('->'))
        const line = at(line => line.includes(' -- ') && !line.includes('->'))
        const point = at(line => line.includes('circle'))

        expect(grid).toBeGreaterThan(-1)
        expect(grid).toBeLessThan(axes)
        expect(axes).toBeLessThan(line)
        expect(line).toBeLessThan(point)
    })

    test('writes the commands of the figures in units, after the grid and the axes', () => {
        const {graph} = createGraph(NICE)
        graph.create.circle({center: {x: 400, y: 300}, radius: 1}, 'c')

        expect(graph.tikz()).toContain('\\draw[draw=black, line width=0.75pt] (0,0) circle[radius=1];')
    })

    test('leaves out a figure that is hidden', () => {
        const {graph} = createGraph(NICE)
        graph.create.circle({center: {x: 400, y: 300}, radius: 50}, 'c').hide()

        expect(graph.tikz()).not.toContain('circle')
    })

    test('leaves out the handle of a point that is dragged, which is not part of the drawing', () => {
        const {graph} = createGraph(NICE)
        const handle = graph.create.point({x: 0, y: 0}, 'T')
        const target = graph.create.point({x: 1, y: 1}, 'A')
        handle.asCircle(30)
        graph.draggable(handle, {target})

        const tikz = graph.tikz()

        // The point that the handle moves is written, the handle is not.
        expect(tikz.match(/circle/g)).toHaveLength(1)
        expect(tikz).toContain('(1,1) circle')
    })

    test('writes the label of a point', () => {
        const {graph} = createGraph(NICE)
        graph.create.point({x: 1, y: 2}, 'A', {html: false})

        expect(graph.tikz()).toContain('\\node')
    })

    test('writes the axis that is drawn at the border when the line is out of the drawing, and not the line', () => {
        const {graph} = createGraph({origin: {x: -100, y: 300}, display: {grid: false}})
        const tikz = graph.tikz()

        // The x axis and the y axis at the border: two arrows.
        expect(tikz.match(/->/g)).toHaveLength(2)
    })

    test('writes no axis when the display asks for none', () => {
        const {graph} = createGraph({display: {grid: false, axis: false}})

        expect(graph.tikz()).not.toContain('->')
    })

    test('does not clip a pgfplots axis, which cuts itself to its limits', () => {
        const {graph} = createGraph(NICE)
        graph.create.line({through: {A: {x: 0, y: 0}, B: {x: 100, y: 50}}}, 'd')
        graph.create.plot({expression: 'x^2'}, 'f')
        graph.create.circle({center: {x: 400, y: 300}, radius: 1}, 'c')
        graph.create.point({x: 1, y: 1}, 'A')
        const tikz = graph.tikz()

        // What comes before the curve (the layout, the line, the circle) and what comes after it (the point).
        expect(tikz.match(/\\begin\{scope\}/g)).toHaveLength(2)
        expect(tikz.match(/\\end\{scope\}/g)).toHaveLength(2)
        expect(tikz).toContain('\\begin{axis}')
        // No axis is inside a scope: a clip that is active makes pgfplots fail for a fill between.
        expect(tikz).not.toMatch(/\\begin\{scope\}(?:(?!\\end\{scope\})[\s\S])*\\begin\{axis\}/)
    })

    test('refuses a figure whose appearance has no TikZ equivalent', () => {
        const {graph} = createGraph(NICE)
        graph.create.circle({center: {x: 400, y: 300}, radius: 50}, 'c').stroke('gold')

        expect(() => graph.tikz()).toThrow(InvalidArgumentError)
    })

    test('refuses axes that do not go to the right and up', () => {
        const {graph} = createGraph({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}, display: {grid: false, axis: false}})

        expect(() => graph.tikz()).toThrow(NotImplementedError)
    })

    test('has the packages that its figures need in the preamble', () => {
        const {graph} = createGraph()

        expect(graph.tikzPreamble()).toBe(TIKZ_PREAMBLE)
        expect(graph.tikzPreamble()).toContain('\\usepackage{pgfplots}')
        expect(graph.tikzPreamble()).toContain('\\usepgfplotslibrary{fillbetween}')
        expect(graph.tikzPreamble()).toContain('\\usetikzlibrary{arrows.meta}')
    })
})

describe('Graph events', () => {
    function createDraggable() {
        const {graph} = createGraph()
        const point = graph.create.point({x: 0, y: 0}, 'T')
        graph.draggable(point)

        const start = () => { point.shape.fire('dragstart', {event: {}, handler: {}, box: point.shape.bbox()}) }

        return {graph, point, start}
    }

    test('calls the handler with the event of the drag, and returns the graph to chain', () => {
        const {graph, point, start} = createDraggable()
        const handler = vi.fn<(e: CustomEvent<IGraphDragEvent>) => void>()

        expect(graph.on('dragstart', handler)).toBe(graph)
        start()

        expect(handler).toHaveBeenCalledOnce()
        expect(handler.mock.calls[0][0].detail).toEqual({graph, figure: point})
    })

    test('stops calling a handler that is taken off, and returns the graph to chain', () => {
        const {graph, start} = createDraggable()
        const handler = vi.fn()
        graph.on('dragstart', handler)
        start()

        expect(graph.off('dragstart', handler)).toBe(graph)
        start()

        expect(handler).toHaveBeenCalledOnce()
    })

    test('calls a handler that is given twice once', () => {
        const {graph, start} = createDraggable()
        const handler = vi.fn()

        graph.on('dragstart', handler).on('dragstart', handler)
        start()

        expect(handler).toHaveBeenCalledOnce()
    })

    test('calls each handler of an event, and not the ones of another event', () => {
        const {graph, start} = createDraggable()
        const first = vi.fn()
        const second = vi.fn()
        const other = vi.fn()
        graph.on('dragstart', first).on('dragstart', second).on('dragend', other)

        start()

        expect(first).toHaveBeenCalledOnce()
        expect(second).toHaveBeenCalledOnce()
        expect(other).not.toHaveBeenCalled()
    })
})

describe('Graph conversions', () => {
    test('puts a length, a domain and a position in pixels, with the scale of each axis', () => {
        const {graph} = createGraph(NICE)

        expect(graph.toPixels(2)).toBe(100)
        expect(graph.toPixels(2, 'y')).toBe(-100)
        expect(graph.toPixels({min: -1, max: 2})).toEqual({min: 350, max: 500})
        expect(graph.toPixels({min: -1, max: 2}, 'y')).toEqual({min: 200, max: 350})
        expect(graph.toPixels({x: 1, y: 2})).toEqual({x: 450, y: 200})
    })

    test('puts a length, a domain and a position in units of the coordinate system', () => {
        const {graph} = createGraph(NICE)

        expect(graph.toCoordinates(100)).toBe(2)
        expect(graph.toCoordinates(-100, 'y')).toBe(2)
        expect(graph.toCoordinates({min: 350, max: 500})).toEqual({min: -1, max: 2})
        expect(graph.toCoordinates({x: 450, y: 200})).toEqual({x: 1, y: 2})
    })

    test('gives back what it took, for the scale of the unit of centimeters of a graph', () => {
        const {graph} = createGraph()
        const position = {x: 1.5, y: -2.25}

        const back = graph.toCoordinates(graph.toPixels(position))
        expect(back.x).toBeCloseTo(position.x, 9)
        expect(back.y).toBeCloseTo(position.y, 9)
        expect(graph.toPixels(1)).toBeCloseTo(PX_PER_CM, 9)
    })

    test('follows the layout when it changes', () => {
        const {graph} = createGraph(NICE)

        graph.updateLayout({...graph.config, origin: {x: 0, y: 0}})

        expect(graph.toPixels({x: 0, y: 0})).toEqual({x: 0, y: 0})
        expect(graph.toPixels({x: 1, y: 1})).toEqual({x: 50, y: -50})
    })

    test('refuses a value that is not a length, a domain or a position', () => {
        const {graph} = createGraph()

        expect(() => graph.toPixels('1' as never)).toThrow(InvalidArgumentError)
        expect(() => graph.toCoordinates({} as never)).toThrow(InvalidArgumentError)
    })
})

describe('Graph dispose', () => {
    // The animation needs the frames of the page, which node does not have: the graph needs its document back after.
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.useRealTimers()
        useDocument()
    })

    /** A graph with a point that moves from B to C, and its animation started: it asks for the next frame. */
    function createAnimated() {
        const frames = vi.fn(() => 7)
        const cancelled = vi.fn()
        vi.stubGlobal('requestAnimationFrame', frames)
        vi.stubGlobal('cancelAnimationFrame', cancelled)
        // Only the timer of the reset: the frames are the ones above.
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']})

        const made = createGraph()
        const {graph} = made
        const A = graph.create.point({x: 0, y: 0}, 'A')
        const B = graph.create.point({x: 2, y: 1}, 'B')
        const C = graph.create.point({x: 4, y: 3}, 'C')
        A.animate = {from: B, to: C, duration: 2, delay: 1, easing: 'linear', loop: LOOP_STYLE.RESET}

        graph.animation.start()

        return {...made, A, cancelled, frames}
    }

    test('is the same animation each time it is asked for', () => {
        const {graph} = createGraph()

        expect(graph.animation).toBe(graph.animation)
    })

    test('takes the element of the graph out of its container', () => {
        const {graph, container} = createGraph()
        expect(container.children.length).toBe(1)

        graph.dispose()

        expect(container.children.length).toBe(0)
    })

    test('removes the figures and the layout, and lets go of what the figures keep', () => {
        const {graph} = createGraph()
        const follow = graph.create.follow({follow: graph.create.plot({expression: 'x'}, 'f')}, 't')
        const dispose = vi.spyOn(follow, 'dispose')
        const {x, y} = graph.axes

        graph.dispose()

        expect(Object.keys(graph.figures)).toEqual([])
        expect(dispose).toHaveBeenCalledOnce()
        expect(count(graph.layers.grids)).toBe(0)
        expect(count(graph.layers.axis)).toBe(0)
        expect(graph.layers.axis.has(x.element)).toBe(false)
        expect(graph.layers.axis.has(y.element)).toBe(false)
    })

    test('does nothing the second time', () => {
        const {graph, container} = createGraph()
        graph.create.point({x: 0, y: 0}, 'A')

        graph.dispose()

        expect(() => { graph.dispose() }).not.toThrow()
        expect(container.children.length).toBe(0)
    })

    test('stops the animation, and the reset that it planned', () => {
        const {graph, cancelled} = createAnimated()
        const update = vi.spyOn(graph, 'update')
        expect(graph.animation.isRunning()).toBe(true)

        graph.dispose()
        vi.advanceTimersByTime(1000)

        expect(cancelled).toHaveBeenCalledWith(7)
        expect(graph.animation.isRunning()).toBe(false)
        expect(update).not.toHaveBeenCalled()
    })

    test('is stopped by clear too, which removes the figures that were animated', () => {
        const {graph, cancelled} = createAnimated()

        graph.clear()

        expect(cancelled).toHaveBeenCalledWith(7)
        expect(graph.animation.isRunning()).toBe(false)
        expect(graph.animation.canBeAnimated()).toBe(false)
    })

    test('lets the animation be read again from the figures that come after clear', () => {
        const {graph} = createAnimated()

        graph.clear()
        const A = graph.create.point({x: 0, y: 0}, 'A')
        const B = graph.create.point({x: 2, y: 1}, 'B')
        expect(graph.animation.canBeAnimated()).toBe(false)

        A.animate = {from: B, to: B, duration: 1, delay: 0, easing: 'linear', loop: LOOP_STYLE.NONE}

        expect(graph.animation.canBeAnimated()).toBe(true)
    })
})
