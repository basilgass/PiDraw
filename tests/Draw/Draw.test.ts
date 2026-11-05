import {describe, expect, test} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import {LAYOUT_KEYS} from '../../src/parser/buildLayout'
import {PiParse, type PARSER} from 'piparser'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import {Arc} from '../../src/figures/Arc/Arc'
import {Axis} from '../../src/figures/Axis/Axis'
import {Grid} from '../../src/figures/Grid/Grid'
import {Bezier} from '../../src/figures/Bezier/Bezier'
import {Line} from '../../src/figures/Line/Line'
import {Point} from '../../src/figures/Point/Point'
import {InvalidArgumentError, OptionError, ParseError} from '../../src/errors'
import {buildAxis} from '../../src/figures/Axis/Axis.parser'
import {buildGrid} from '../../src/figures/Grid/Grid.parser'
import {buildPath} from '../../src/figures/Path/Path.parser'
import {buildLayout, type ILayout} from '../../src/parser/buildLayout'
import {PARSER_CONFIG} from '../../src/parser/parser.config'
import type {IParserParameters} from '../../src/parser/parser.types'
import {createContext} from '../helpers/figure'
import {Graph} from '../../src/Graph'
import {standardForm} from '../../src/Draw/Draw.lines'
import {applyOptions} from '../../src/Draw/Draw.options'
import {animationPoint} from '../../src/animate/Animate.syntax'

// Draw and its Graph build an html wrapper in their constructors: only the method under test is used, on bare instances. The test sets
// what that method reads (the figures, the layout...) on `graph`.
function graphOf(draw: { graph: unknown }): Graph {
    return draw.graph as Graph
}

function bare(): unknown {
    const draw = Object.create(Draw.prototype) as { graph: Graph }
    draw.graph = Object.create(Graph.prototype) as Graph

    return draw
}

describe('Draw animation points', () => {
    const figures = () => {
        const point = new Point(createContext(), 'A', {coordinates: {x: 1, y: 1}})

        return {point, figures: {A: point, c: {name: 'c'}} as unknown as Record<string, AbstractFigure>}
    }

    test('the name of a point gives that point', () => {
        const {point, figures: all} = figures()

        expect(animationPoint('A', 'from', all)).toBe(point)
        expect(animationPoint('A', 'to', all)).toBe(point)
    })

    test.each([
        ['a figure that is not a point', 'c'],
        ['an unknown figure', 'Z'],
        ['a number', 3],
        ['undefined', undefined],
        ['a boolean', true],
        ['an inherited property name', 'toString'],
    ])('%s is an InvalidArgumentError that names the option', (_, name) => {
        const {figures: all} = figures()

        expect(() => animationPoint(name, 'from', all)).toThrow(InvalidArgumentError)
        expect(() => animationPoint(name, 'to', all)).toThrow(/to=/)
    })
})

// The options are applied after the figure is created: only the methods under test are used, on a bare instance.
interface OptionsApplier {
    graph: object
}

function createOptionsDraw() {
    const context = createContext()
    const point = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
    const draw = bare() as OptionsApplier

    return {draw, point, context}
}

const option = (value: IParserParameters['value']): IParserParameters => ({value, options: []})

describe('Draw options of the shape of a point', () => {
    test.each([
        ['o', 'circle', 5],
        ['s', 'square', 10],
        ['*', 'crosshair', 10]
    ] as const)('%s alone gives a %s of the default size', (key, shape, size) => {
        const {draw, point} = createOptionsDraw()

        applyOptions({[key]: option(true)}, point, graphOf(draw))

        expect(point.config.shape).toBe(shape)
        expect(point.size).toBe(size)
    })

    test('o=8 gives a circle of size 8, whatever the other options', () => {
        const {draw, point} = createOptionsDraw()

        applyOptions({color: option('red'), o: option(8)}, point, graphOf(draw))

        expect(point.config.shape).toBe('circle')
        expect(point.size).toBe(8)
    })

    test('a size that is not valid is an OptionError', () => {
        const {draw, point} = createOptionsDraw()

        expect(() => {
            applyOptions({s: option('big')}, point, graphOf(draw))
        }).toThrow(OptionError)
    })

    test('a shape on a figure that is not a point is an OptionError', () => {
        const {draw, context} = createOptionsDraw()
        const A = new Point(context, 'B', {coordinates: {x: 0, y: 0}})
        const line = new Line(context, 'd', {through: {A, B: A}})

        expect(() => {
            applyOptions({o: option(true)}, line, graphOf(draw))
        }).toThrow(OptionError)
    })
})

// The parser of Draw: its formatter writes the shorthands in their standard form.
function createParser() {
    return new PiParse({
        formatter: standardForm,
        keys: LAYOUT_KEYS,
        splitter: {main: '->', entry: ',', parameter: '/'}
    })
}

describe('Draw option mark', () => {
    test.each([
        ['mark', 'mark', true, []],
        ['mark=end', 'mark', 'end', []],
        ['mark=both/20', 'mark', 'both', [20]],
        ['mark=end/x/12', 'mark', 'end', ['x', 12]],
        ['mark=end/|', 'mark', 'end', ['|']]
    ])('%s is read as the side, then the size and the shape', (code, key, value, options) => {
        const item = createParser().parse(`d=line A,B->${code}`)

        expect(item.parameters[key]).toMatchObject({value, options})
    })
})

describe('Draw line of a path', () => {
    const build = (line: string) => {
        const item = createParser().parse(line)

        return buildPath(item)
    }

    test('is read as the data of an SVG path, in units', () => {
        expect(build('p=path M 0,0 L 2,1 Q 3,3 4,0 Z')).toEqual({create: 'path', config: {d: 'M 0,0 L 2,1 Q 3,3 4,0 Z', units: true}})
    })

    test('keeps the options out of the data', () => {
        expect(build('p=path M 0,0 L 2,1 -> red')).toMatchObject({config: {d: 'M 0,0 L 2,1'}})
    })

    test('with data that are not valid is a ParseError', () => {
        expect(() => build('p=path L 2,1')).toThrow(ParseError)
    })
})

describe('Draw options of an arc', () => {
    const arcOf = () => {
        const {draw, context} = createOptionsDraw()
        const arc = new Arc(context, 'a', {points: {start: {x: 500, y: 300}, center: {x: 400, y: 300}, end: {x: 400, y: 200}}})
        // The label reads the scales of the graph.
        Object.defineProperty(draw.graph, 'config', {value: context.config})

        return {draw, arc}
    }

    test('sector and square are applied to the arc', () => {
        const {draw, arc} = arcOf()

        applyOptions({sector: option(true), square: option(true)}, arc, graphOf(draw))

        expect(arc.config).toMatchObject({sector: true, square: true})
    })

    test('an option of an arc on a figure that is not an arc is an OptionError', () => {
        const {draw, point} = createOptionsDraw()

        expect(() => {
            applyOptions({sector: option(true)}, point, graphOf(draw))
        }).toThrow(OptionError)
    })
})

describe('Draw label position', () => {
    const arcOf = () => {
        const {draw, context} = createOptionsDraw()
        const arc = new Arc(context, 'a', {points: {start: {x: 500, y: 300}, center: {x: 400, y: 300}, end: {x: 400, y: 200}}})
        // The label reads the scales of the graph.
        Object.defineProperty(draw.graph, 'config', {value: context.config})

        return {draw, arc}
    }

    test('a label without a position is left to the figure, which chooses the side of its angle', () => {
        const {draw, arc} = arcOf()

        applyOptions({label: option(true)}, arc, graphOf(draw))

        expect(arc.label?.alignementGiven).toBe(false)
        expect(arc.label?.config.alignement).toBe('tr')
    })

    test('a label with a position keeps it', () => {
        const {draw, arc} = arcOf()

        applyOptions({label: {value: 'x', options: ['bl']}}, arc, graphOf(draw))

        expect(arc.label?.alignementGiven).toBe(true)
        expect(arc.label?.config.alignement).toBe('bl')

        arc.update(true)

        expect(arc.label?.config.alignement).toBe('bl')
    })
})

describe('Draw options of a Bézier curve', () => {
    const curveOf = () => {
        const {draw, context} = createOptionsDraw()
        const through = [{x: 100, y: 100}, {x: 200, y: 50}, {x: 300, y: 100}].map(point => ({point}))

        return {draw, curve: new Bezier(context, 'b', {through}), context}
    }

    test('close closes the curve', () => {
        const {draw, curve} = curveOf()

        applyOptions({close: option(true)}, curve, graphOf(draw))

        expect(curve.config.closed).toBe(true)
    })

    test('close on a figure that is not a Bézier curve is an OptionError', () => {
        const {draw, point} = createOptionsDraw()

        expect(() => {
            applyOptions({close: option(true)}, point, graphOf(draw))
        }).toThrow(OptionError)
    })

    test('close on a curve of control points is an OptionError', () => {
        const {draw, context} = createOptionsDraw()
        const pulled = new Bezier(context, 'c', {controls: [{x: 0, y: 0}, {x: 10, y: 50}, {x: 100, y: 0}]})

        expect(() => {
            applyOptions({close: option(true)}, pulled, graphOf(draw))
        }).toThrow(OptionError)
    })
})

// The options of the parameters of the graph are given to the axes and to the grid: only the method under test is used.
interface LayoutApplier {
    _parser: PiParse
    graph: { _layout: { axes: { x: Axis, y: Axis }, drawn: { x: Axis, y: Axis } }, _mainGrid: Grid | null }

    _applyLayoutOptions(options: ILayout['options']): void
}

function createLayoutDraw() {
    const context = createContext()
    const draw = bare() as LayoutApplier
    const axis = (name: string, d: { x: number, y: number }) => new Axis(context, name, {director: {A: {x: 400, y: 300}, d}})

    draw._parser = createParser()
    const axes = {x: axis('Ox', {x: 50, y: 0}), y: axis('Oy', {x: 0, y: -50})}
    draw.graph._layout = {axes, drawn: axes}
    draw.graph._mainGrid = new Grid(context, 'MAINGRID')

    return draw
}

describe('Draw names of the axes', () => {
    interface Namer {
        graph: { _layout: LayoutApplier['graph']['_layout'], _figures: Record<string, AbstractFigure> }

        _namedFigures(): Record<string, AbstractFigure>

        _buildItem(item: PARSER): void
    }

    const createNamer = () => {
        const draw = bare() as Namer
        const context = createContext()
        const A = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
        const axes = {x: new Axis(context, 'Ox', {director: {A: {x: 400, y: 300}, d: {x: 50, y: 0}}}), y: new Axis(context, 'Oy', {director: {A: {x: 400, y: 300}, d: {x: 0, y: -50}}})}

        draw.graph._layout = {axes, drawn: axes}
        draw.graph._figures = {A}

        return {draw, axes, A}
    }

    test('the axes can be named in a line of code, with the figures of the drawing', () => {
        const {draw, axes, A} = createNamer()

        expect(draw._namedFigures()).toEqual({Ox: axes.x, Oy: axes.y, A})
        expect(draw._namedFigures().Ox).toBe(axes.x)
    })

    test('a figure of the drawing cannot take the place of an axis', () => {
        const {draw, axes} = createNamer()

        draw.graph._figures.Ox = new Point(createContext(), 'Ox', {coordinates: {x: 0, y: 0}})

        expect(draw._namedFigures().Ox).toBe(draw.graph._figures.Ox)
        expect(axes.x).not.toBe(draw.graph._figures.Ox)
    })

    test.each(['Ox', 'Oy'])('a figure cannot be named %s: it is the name of an axis of the graph', (name) => {
        const {draw} = createNamer()
        const item = {name, key: 'pt', values: [1, 1], parameters: {}} as unknown as PARSER

        expect(() => {
            draw._buildItem(item)
        }).toThrow(ParseError)
        expect(() => {
            draw._buildItem(item)
        }).toThrow(new RegExp(`"${name}"`))
    })
})

describe('Draw option subgrid', () => {
    test('cuts the steps of a grid', () => {
        const draw = createLayoutDraw()
        const grid = new Grid(createContext(), 'g')

        applyOptions({subgrid: option(4)}, grid, graphOf(draw))

        expect(grid.config.subdivisions).toBe(4)
    })

    test('on a figure that is not a grid is an OptionError', () => {
        const draw = createLayoutDraw()

        expect(() => {
            applyOptions({subgrid: option(4)}, draw.graph._layout.drawn.x, graphOf(draw))
        }).toThrow(OptionError)
    })
})

describe('Draw options of an axis', () => {
    test.each([
        ['ticks', option(5), (axis: Axis) => axis.config.ticks?.marks, {every: 5}],
        ['numbers', option('none'), (axis: Axis) => axis.config.ticks?.numbers, 'none'],
        ['name', option('t'), (axis: Axis) => axis.config.name, 't'],
        ['side', option('left'), (axis: Axis) => axis.config.side, 'left'],
        ['padding', option(40), (axis: Axis) => axis.config.padding, 40],
        ['range', option(10), (axis: Axis) => axis.config.range, {min: -10, max: 10}]
    ] as const)('%s is given to the axis', (key, value, read, expected) => {
        const draw = createLayoutDraw()

        applyOptions({[key]: value}, draw.graph._layout.drawn.x, graphOf(draw))

        expect(read(draw.graph._layout.drawn.x)).toEqual(expected)
    })

    test('ticks with the first tick, as the parser gives it', () => {
        const draw = createLayoutDraw()

        applyOptions({ticks: {value: 5, options: ['first']}}, draw.graph._layout.drawn.x, graphOf(draw))

        expect(draw.graph._layout.drawn.x.config.ticks?.marks).toEqual({every: 5, first: true})
    })

    test('on a figure that is not an axis is an OptionError', () => {
        const draw = createLayoutDraw()

        expect(() => {
            applyOptions({ticks: option(5)}, new Grid(createContext(), 'g'), graphOf(draw))
        }).toThrow(OptionError)
    })

    test('a value that is not valid is an OptionError', () => {
        const draw = createLayoutDraw()

        expect(() => {
            applyOptions({side: option('up')}, draw.graph._layout.drawn.x, graphOf(draw))
        }).toThrow(OptionError)
    })
})

describe('Draw layout options', () => {
    test('are given to the axes that are drawn, not to the lines they are on', () => {
        const draw = createLayoutDraw()
        const context = createContext()
        const edge = new Axis(context, 'Ox-edge', {director: {A: {x: 400, y: 2}, d: {x: 50, y: 0}}})
        draw.graph._layout = {axes: draw.graph._layout.axes, drawn: {x: edge, y: draw.graph._layout.axes.y}}

        draw._applyLayoutOptions(buildLayout('axisX->color=red', draw._parser).options)

        expect(edge.shape.attr('stroke')).toBe('red')
        expect(draw.graph._layout.axes.x.shape.attr('stroke')).toBe('black')
    })

    test('are read with the parser of Draw, and given to the axes and to the grid', () => {
        const draw = createLayoutDraw()
        const layout = buildLayout('axis->color=red,w=3,,grid=2->color=gray,subgrid=2,,x=5', draw._parser)

        draw._applyLayoutOptions(layout.options)

        expect(draw.graph._layout.drawn.x.shape.attr('stroke')).toBe('red')
        expect(draw.graph._layout.drawn.y.shape.attr('stroke')).toBe('red')
        expect(draw.graph._layout.drawn.x.shape.attr('stroke-width')).toBe(3)
        expect(draw.graph._mainGrid?.shape.attr('stroke')).toBe('gray')
        expect(draw.graph._mainGrid?.config.subdivisions).toBe(2)
    })

    test('of one axis do not touch the other one', () => {
        const draw = createLayoutDraw()
        const layout = buildLayout('axisX->color=red', draw._parser)

        draw._applyLayoutOptions(layout.options)

        expect(draw.graph._layout.drawn.x.shape.attr('stroke')).toBe('red')
        expect(draw.graph._layout.drawn.y.shape.attr('stroke')).toBe('black')
    })

    test('are not needed: the figures are left as they are', () => {
        const draw = createLayoutDraw()

        draw._applyLayoutOptions(buildLayout('axis,grid', draw._parser).options)

        expect(draw.graph._layout.drawn.x.shape.attr('stroke')).toBe('black')
        expect(draw.graph._mainGrid?.shape.attr('stroke')).toBe('lightgray')
    })

    test('a grid that the graph does not show has no options to receive', () => {
        const draw = createLayoutDraw()
        draw.graph._mainGrid = null

        expect(() => {
            draw._applyLayoutOptions(buildLayout('grid->color=red', draw._parser).options)
        }).not.toThrow()
    })
})

describe('Draw lines of the grid and of the axis', () => {
    const parse = (line: string) => createParser().parse(line)

    test.each([
        ['g=grid', {}],
        ['g=grid 0.5', {step: {x: 0.5, y: 0.5}}],
        ['g=grid 0:5,0:3', {x: {min: 0, max: 5}, y: {min: 0, max: 3}}],
        ['g=grid -2:2,-1:1,0.5;1', {x: {min: -2, max: 2}, y: {min: -1, max: 1}, step: {x: 0.5, y: 1}}]
    ])('%s gives the config of a grid', (line, config) => {
        expect(buildGrid(parse(line)).config).toEqual(config)
    })

    test('the option subgrid is read as an option of the line', () => {
        const item = parse('g=grid 0:5,0:3->subgrid=4,color=gray')

        expect(item.parameters.subgrid.value).toBe(4)
        expect(Object.keys(item.parameters)).toEqual(['subgrid', 'color'])
    })

    test('a line of an axis gives its points, its step, and its options', () => {
        const context = createContext()
        const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
        const B = new Point(context, 'B', {coordinates: {x: 1, y: 0}})
        const item = parse('a=axis A,B,pi/2->name=t,ticks=5/first')
        const built = buildAxis(item, {A, B})

        expect(built.create).toBe('axis')
        expect(built.config.ticks?.labels).toBe('pi')
        expect(item.parameters.name.value).toBe('t')
        expect(item.parameters.ticks).toMatchObject({value: 5, options: ['first']})
    })

    test('grid and axis are keys of the parser, built by their builders', () => {
        expect(PARSER_CONFIG.grid.build).toBe(buildGrid)
        expect(PARSER_CONFIG.axis.build).toBe(buildAxis)
    })
})
