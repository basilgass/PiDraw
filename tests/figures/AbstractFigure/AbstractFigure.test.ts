import {describe, expect, test, vi} from 'vitest'
import type {Path} from '@svgdotjs/svg.js'
import {AbstractFigure, type IColorValue, type MarkerSide} from '../../../src/figures/AbstractFigure/AbstractFigure'
import {Circle} from '../../../src/figures/Circle/Circle'
import {InvalidArgumentError} from '../../../src/errors'
import type {IGraphConfig} from '../../../src/pidraw.common'
import {createContext, graphConfig} from '../../helpers/figure'

class TestFigure extends AbstractFigure {
    readonly config: object = {}

    computed(): this {
        return this
    }

    moveLabel(): this {
        return this
    }

    // A segment and its label, to see what the helpers of the base class write.
    tikz(): string {
        return [this._tikzDraw('(0,0) -- (1,1)'), this._tikzLabel('0,0')].filter(x => x !== '').join('\n')
    }
}

function createFigure(config?: IGraphConfig) {
    const figure = new TestFigure(createContext(config), 'A');
    (figure.shape as Path).plot('M 0 0 L 10 10')

    return figure
}

describe('AbstractFigure graph context', () => {
    test('draws in the svg of the context', () => {
        const context = createContext()
        const figure = new TestFigure(context, 'A')

        expect(figure.rootSVG).toBe(context.rootSVG)
        expect(context.rootSVG.findOne('#A')).not.toBeNull()
    })

    test('graphConfig is the configuration of the context itself, not a copy', () => {
        const context = createContext()
        const figure = new TestFigure(context, 'A')

        expect(figure.graphConfig).toBe(context.config)
        expect(figure.graphConfig).toBe(figure.graphConfig)
    })

    test('graphConfig keeps the whole configuration, including the coordinate system', () => {
        const figure = new TestFigure(createContext(), 'A')

        expect(figure.graphConfig.system).toBe('cartesian_2d')
        expect(figure.graphConfig.origin).toEqual({x: 400, y: 300})
    })

    test('a new configuration of the graph is seen at once by an existing figure', () => {
        const context = createContext()
        const figure = new TestFigure(context, 'A')

        context.config = graphConfig({width: 1000, origin: {x: 100, y: 100}})

        expect(figure.graphConfig.width).toBe(1000)
        expect(figure.graphConfig.origin).toEqual({x: 100, y: 100})
    })

    test('the configuration is not written in the svg', () => {
        const context = createContext()
        new TestFigure(context, 'A')

        expect(context.rootSVG.attr('data-config')).toBeUndefined()
    })

    test('two figures of a context share the same configuration', () => {
        const context = createContext()
        const a = new TestFigure(context, 'A')
        const b = new TestFigure(context, 'B')

        expect(a.graphConfig).toBe(b.graphConfig)
    })
})

const INVALID_COLORS: [string, string | IColorValue][] = [
    ['an opacity above 1', {color: 'red', opacity: 2}],
    ['a negative opacity', {color: 'red', opacity: -0.1}],
    ['an opacity that is not a number', {color: 'red', opacity: NaN}],
    ['an empty color', ''],
    ['an empty color with an opacity', {color: '', opacity: 0.5}],
    ['an opacity written after the name', 'red/0.5']
]

describe('AbstractFigure fill', () => {
    test('the opacity of a fill is the fill-opacity, not the opacity of the whole shape', () => {
        const figure = createFigure().fill({color: 'red', opacity: 0.5})

        expect(figure.shape.attr('fill')).toBe('red')
        expect(figure.shape.attr('fill-opacity')).toBe(0.5)
        expect(figure.shape.node.hasAttribute('opacity')).toBe(false)
        expect(figure.appearance.fill).toEqual({color: 'red', opacity: 0.5})
    })

    test('a color without opacity is opaque', () => {
        const figure = createFigure().fill({color: 'blue', opacity: 0.2}).fill('green')

        expect(figure.appearance.fill).toEqual({color: 'green', opacity: 1})
        expect(figure.shape.attr('fill-opacity')).toBe(1)
    })

    test('fill without argument applies the current fill again', () => {
        const figure = createFigure()
        figure.appearance.fill = {color: 'orange', opacity: 0.4}
        figure.fill()

        expect(figure.shape.attr('fill')).toBe('orange')
        expect(figure.shape.attr('fill-opacity')).toBe(0.4)
    })

    test.each(INVALID_COLORS)('%s is an InvalidArgumentError and leaves the figure unchanged', (_, color) => {
            const figure = createFigure().fill({color: 'red', opacity: 0.5})

            expect(() => figure.fill(color)).toThrow(InvalidArgumentError)
            expect(figure.appearance.fill).toEqual({color: 'red', opacity: 0.5})
            expect(figure.shape.attr('fill-opacity')).toBe(0.5)
        })

    test('the bounds of the opacity are accepted', () => {
        expect(createFigure().fill({color: 'red', opacity: 0}).appearance.fill.opacity).toBe(0)
        expect(createFigure().fill({color: 'red', opacity: 1}).appearance.fill.opacity).toBe(1)
    })
})

describe('AbstractFigure stroke', () => {
    test('the opacity of a stroke is the stroke-opacity, not the opacity of the whole shape', () => {
        const figure = createFigure().stroke({color: 'blue', opacity: 0.3}, 2)

        expect(figure.shape.attr('stroke')).toBe('blue')
        expect(figure.shape.attr('stroke-opacity')).toBe(0.3)
        expect(figure.shape.attr('stroke-width')).toBe(2)
        expect(figure.shape.node.hasAttribute('opacity')).toBe(false)
    })

    test('the fill and the stroke keep their own opacity, whatever the order', () => {
        const strokeLast = createFigure().fill({color: 'red', opacity: 0.5}).stroke({color: 'blue', opacity: 0.3})
        const fillLast = createFigure().stroke({color: 'blue', opacity: 0.3}).fill({color: 'red', opacity: 0.5})

        for (const figure of [strokeLast, fillLast]) {
            expect(figure.shape.attr('fill-opacity')).toBe(0.5)
            expect(figure.shape.attr('stroke-opacity')).toBe(0.3)
            expect(figure.shape.node.hasAttribute('opacity')).toBe(false)
        }
    })

    test('fill without argument does not change the stroke', () => {
        const figure = createFigure().stroke({color: 'red', opacity: 0.3}, 3)
        figure.fill()

        expect(figure.shape.attr('stroke-opacity')).toBe(0.3)
        expect(figure.shape.attr('stroke-width')).toBe(3)
    })

    test('a number alone is the width and keeps the color', () => {
        const figure = createFigure().stroke('red').stroke(4)

        expect(figure.appearance.stroke).toEqual({color: 'red', width: 4, opacity: 1})
    })

    test('a color alone keeps the width', () => {
        const figure = createFigure().stroke(5).stroke({color: 'green', opacity: 0.7})

        expect(figure.appearance.stroke).toEqual({color: 'green', width: 5, opacity: 0.7})
    })

    test.each(INVALID_COLORS)('%s is an InvalidArgumentError and leaves the figure unchanged', (_, color) => {
            const figure = createFigure().stroke({color: 'red', opacity: 0.5}, 2)

            expect(() => figure.stroke(color)).toThrow(InvalidArgumentError)
            expect(figure.appearance.stroke).toEqual({color: 'red', width: 2, opacity: 0.5})
        })
})

describe('AbstractFigure move', () => {
    const translation = (figure: AbstractFigure) => {
        const matrix = figure.shape.matrix()
        return [matrix.e, matrix.f]
    }

    test('moves by a vector in the units of the coordinate system, y pointing up', () => {
        const figure = createFigure().move({x: 2, y: 3})

        expect(translation(figure)).toEqual([100, -150])
    })

    test('a number moves along the Ox axis', () => {
        expect(translation(createFigure().move(2))).toEqual([100, 0])
        expect(translation(createFigure().move(-1))).toEqual([-50, 0])
    })

    test('uses the scale of each axis', () => {
        const config = graphConfig({axis: {x: {x: 40, y: 0}, y: {x: 0, y: -20}}})
        const figure = createFigure(config).move({x: 1, y: 1})

        expect(translation(figure)).toEqual([40, -20])
    })

    test('follows oblique axes', () => {
        const config = graphConfig({axis: {x: {x: 10, y: 2}, y: {x: 3, y: -10}}})

        expect(translation(createFigure(config).move({x: 1, y: 2}))).toEqual([16, -18])
        expect(translation(createFigure(config).move(2))).toEqual([20, 4])
    })

    test('follows an axis y pointing down', () => {
        const config = graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 0, y: 50}}})

        expect(translation(createFigure(config).move({x: 0, y: 1}))).toEqual([0, 50])
    })

    test('the moves are added', () => {
        const figure = createFigure().move({x: 1, y: 0}).move({x: 0, y: 1}).move(1)

        expect(translation(figure)).toEqual([100, -50])
    })

    test('a zero move changes nothing', () => {
        expect(translation(createFigure().move({x: 0, y: 0}))).toEqual([0, 0])
    })

    test.each([
        ['a string', 'a'],
        ['NaN', NaN],
        ['Infinity', Infinity],
        ['an incomplete vector', {x: 1}],
        ['a vector of strings', {x: '1', y: '2'}],
        ['a vector with NaN', {x: 1, y: NaN}],
        ['null', null],
        ['undefined', undefined],
    ])('%s is an InvalidArgumentError and does not move', (_, value) => {
        const figure = createFigure()

        expect(() => figure.move(value as unknown as number)).toThrow(InvalidArgumentError)
        expect(translation(figure)).toEqual([0, 0])
    })
})

describe('AbstractFigure scale', () => {
    test('a number scales both axes', () => {
        const matrix = createFigure().scale(2).shape.matrix()

        expect([matrix.a, matrix.d]).toEqual([2, 2])
    })

    test('a vector scales each axis', () => {
        const matrix = createFigure().scale({x: 2, y: 3}).shape.matrix()

        expect([matrix.a, matrix.d]).toEqual([2, 3])
    })

    test('the scales are multiplied', () => {
        const matrix = createFigure().scale(2).scale({x: 3, y: 1}).shape.matrix()

        expect([matrix.a, matrix.d]).toEqual([6, 2])
    })

    test.each([
        ['a string', 'a'],
        ['NaN', NaN],
        ['an incomplete vector', {x: 2}],
        ['null', null],
        ['undefined', undefined],
    ])('%s is an InvalidArgumentError and does not scale', (_, value) => {
        const figure = createFigure()

        expect(() => figure.scale(value as unknown as number)).toThrow(InvalidArgumentError)
        expect(figure.shape.matrix().a).toBe(1)
    })
})

describe('AbstractFigure shape', () => {
    test('a new figure has a single shape in its group', () => {
        const figure = new TestFigure(createContext(), 'A')

        expect(figure.element.children().length).toBe(1)
        expect(figure.element.children()[0]).toBe(figure.shape)
    })

    test('a new shape replaces the previous one, which leaves the svg', () => {
        const figure = new TestFigure(createContext(), 'A')
        const previous = figure.shape

        figure.shape = figure.element.circle(5)

        expect(figure.shape.type).toBe('circle')
        expect(figure.element.children().length).toBe(1)
        expect(figure.element.has(previous)).toBe(false)
    })

    test('setting the same shape again keeps it in the svg', () => {
        const figure = new TestFigure(createContext(), 'A')
        const shape = figure.shape

        figure.shape = shape

        expect(figure.shape).toBe(shape)
        expect(figure.element.has(shape)).toBe(true)
    })

    test('a shape can be set after the group was cleared', () => {
        const figure = new TestFigure(createContext(), 'A')

        figure.clear()
        figure.shape = figure.element.rect(2, 2)

        expect(figure.element.children().length).toBe(1)
        expect(figure.shape.type).toBe('rect')
    })
})

describe('AbstractFigure clear', () => {
    test('removes everything but the label', () => {
        const figure = createFigure()
        figure.element.circle(5)
        figure.element.line(0, 0, 1, 1)
        figure.addLabel('label')

        figure.clear()

        expect(figure.element.children().map(child => child.node.id)).toEqual(['A-label'])
    })

    test('removes everything of a figure without a label', () => {
        const figure = createFigure()
        figure.element.circle(5)

        expect(figure.clear()).toBe(figure)
        expect(figure.element.children().length).toBe(0)
    })
})

describe('AbstractFigure label', () => {
    test('the label is drawn in the group of the figure', () => {
        const figure = createFigure()
        const label = figure.addLabel('my label')

        expect(figure.label).toBe(label)
        expect(figure.element.has(label.shape)).toBe(true)
        expect(label.shape.attr('id')).toBe('A-label')
    })

    test('a figure has one label: a second one replaces the first', () => {
        const figure = createFigure()
        const first = figure.addLabel('one')
        const second = figure.addLabel('two')

        expect(figure.label).toBe(second)
        expect(figure.element.has(first.shape)).toBe(false)
        expect(figure.element.find('#A-label').length).toBe(1)
    })
})

describe('a figure that rebuilds its shape keeps its label', () => {
    test('Circle, when its configuration changes', () => {
        const circle = new Circle(createContext(), 'C', {center: {x: 0, y: 0}, radius: 1})
        const label = circle.addLabel('c')

        circle.config = {center: {x: 1, y: 1}, radius: 2}

        expect(circle.element.has(label.shape)).toBe(true)
        expect(circle.element.find('#C-label').length).toBe(1)
        expect(circle.element.children().length).toBe(2)
        expect(circle.shape.type).toBe('circle')
    })
})

describe('AbstractFigure mark', () => {
    const has = (figure: AbstractFigure, side: 'start' | 'end') => figure.shape.node.hasAttribute(`marker-${side}`)
    const markers = (figure: AbstractFigure) => figure.rootSVG.find('marker')

    test.each([
        ['start', true, false],
        ['end', false, true],
        ['both', true, true],
        [undefined, true, true],
    ] as const)('mark({side: %s}) puts markers at the start: %s, at the end: %s', (side, start, end) => {
        const figure = createFigure().mark(side === undefined ? {} : {side})

        expect(has(figure, 'start')).toBe(start)
        expect(has(figure, 'end')).toBe(end)
    })

    test('a marker on one end leaves the other end as it is', () => {
        const figure = createFigure().mark({side: 'start'}).mark({side: 'end', size: 20})

        expect(figure.shape.attr('marker-start')).toContain('marker-A-10')
        expect(figure.shape.attr('marker-end')).toContain('marker-A-20')
    })

    test('the side none removes the markers of both ends', () => {
        const figure = createFigure().mark({side: 'both'}).mark({side: 'none'})

        expect(has(figure, 'start')).toBe(false)
        expect(has(figure, 'end')).toBe(false)
    })

    test('the size and the shape of the marker', () => {
        expect(createFigure().mark({side: 'end', size: 20}).shape.attr('marker-end')).toContain('marker-A-20')
        expect(createFigure().mark({side: 'end', size: 10, shape: 'x'}).shape.attr('marker-end')).toContain('marker-x-A-10')
        expect(createFigure().mark({side: 'end', size: 15, shape: '|'}).shape.attr('marker-end')).toContain('marker-bar-A-15')
    })

    test('the same marker is used again', () => {
        const figure = createFigure().mark({side: 'end'}).mark({side: 'end'}).mark({side: 'both'})

        expect(markers(figure).length).toBe(1)
    })

    test.each([['edn'], ['']])('the position "%s" is an InvalidArgumentError and changes nothing', (value) => {
        const figure = createFigure()

        expect(() => figure.mark({side: value as MarkerSide})).toThrow(InvalidArgumentError)
        expect(has(figure, 'start')).toBe(false)
        expect(has(figure, 'end')).toBe(false)
        expect(markers(figure).length).toBe(0)
    })

    test.each([['abc'], ['--'], ['']])('the shape "%s" is an InvalidArgumentError and changes nothing', (shape) => {
        const figure = createFigure()

        expect(() => figure.mark({side: 'end', size: 10, shape})).toThrow(InvalidArgumentError)
        expect(has(figure, 'end')).toBe(false)
        expect(markers(figure).length).toBe(0)
    })

    test.each([[0], [-5], [NaN], [Infinity]])('the size %s is an InvalidArgumentError', (size) => {
        const figure = createFigure()

        expect(() => figure.mark({side: 'end', size})).toThrow(InvalidArgumentError)
        expect(markers(figure).length).toBe(0)
    })

    test('a figure whose shape cannot carry a marker is an InvalidArgumentError that names it', () => {
        const circle = new Circle(createContext(), 'C', {center: {x: 0, y: 0}, radius: 1})

        expect(() => circle.mark({side: 'end'})).toThrow(InvalidArgumentError)
        expect(() => circle.mark({side: 'end'})).toThrow(/"C".*circle/)
        expect(has(circle, 'end')).toBe(false)
        expect(markers(circle).length).toBe(0)
    })

    test('removing the markers of a figure that cannot carry any is not an error', () => {
        const circle = new Circle(createContext(), 'C', {center: {x: 0, y: 0}, radius: 1})

        expect(() => circle.mark({side: 'none'})).not.toThrow()
    })

    test('the marker takes the stroke of the figure, whatever the order of the calls', () => {
        // One figure at a time: creating a context empties the svg of the previous one.
        const orders = [
            () => createFigure().stroke('red', 3).mark({side: 'end'}),
            () => createFigure().mark({side: 'end'}).stroke('red', 3),
        ]

        for (const create of orders) {
            const figure = create()
            const marker = figure.shape.reference('marker-end')

            expect(marker).not.toBeNull()
            for (const child of marker?.children() ?? []) {
                expect(child.attr('stroke')).toBe('red')
                expect(child.attr('fill')).toBe('red')
                expect(child.attr('stroke-width')).toBe(3)
            }
            expect(marker?.children().length).toBeGreaterThan(0)
        }
    })

    test('a later stroke changes the color of the markers', () => {
        const figure = createFigure().mark({side: 'both'}).stroke('blue')

        for (const side of ['marker-start', 'marker-end']) {
            expect(figure.shape.reference(side).children()[0].attr('stroke')).toBe('blue')
        }
    })
})

describe('AbstractFigure hide and show', () => {
    test('hide hides the whole group of the figure, show shows it again', () => {
        const figure = createFigure()

        expect(figure.hide()).toBe(figure)
        expect(figure.element.css('display')).toBe('none')

        expect(figure.show()).toBe(figure)
        expect(figure.element.css('display')).not.toBe('none')
    })

    test('hide hides the label too', () => {
        const figure = createFigure()
        const label = figure.addLabel('label')

        figure.hide()

        // The label is drawn in the group that is hidden.
        expect(figure.element.css('display')).toBe('none')
        expect(figure.element.has(label.shape)).toBe(true)
    })
})

describe('AbstractFigure resetStyle', () => {
    /** The markup of the figure, without the numbers that svg.js gives. */
    const markup = (figure: AbstractFigure) => figure.element.svg().replace(/Svgjs\w*\d+/g, 'Svgjs')

    /** A figure that was asked for a color, dashes, a move, a scale, a label, and to be hidden, dragged and animated. */
    function styled() {
        const figure = createFigure()

        figure.stroke('red').fill({color: 'blue', opacity: 0.5}).dash().move(1).scale(2)
        figure.addLabel('label')
        figure.hide()
        figure.isDraggable = true

        return figure
    }

    test('gives a figure that was styled the look of a new one once its shape is made again', () => {
        const figure = styled()

        figure.resetStyle()
        // What a new configuration does: it makes the shape again, in the default style.
        figure.shape = figure.element.path();
        (figure.shape as Path).plot('M 0 0 L 10 10')
        figure.fill().stroke()

        const expected = createFigure()
        expected.fill().stroke()
        expect(markup(figure)).toBe(markup(expected))
    })

    test('takes away the appearance, the dashes, the label and the hiding', () => {
        const figure = styled()

        figure.resetStyle()

        expect(figure.appearance.stroke).toEqual({color: 'black', width: 1, opacity: 1})
        expect(figure.appearance.fill).toEqual({color: 'transparent', opacity: 1})
        expect(figure.label).toBeNull()
        expect(figure.isDraggable).toBe(false)
        expect(figure.controls).toEqual({})
        expect(figure.element.css('display')).not.toBe('none')
        expect(figure.element.attr('style')).toBeUndefined()
    })

    test('takes away the moves and the scales of the shape it has', () => {
        const figure = styled()

        figure.resetStyle()

        expect(figure.shape.attr('transform')).toBeUndefined()
    })

    test('leaves static as it was, which the owner of the figure sets', () => {
        const figure = styled()
        figure.static = true

        figure.resetStyle()

        expect(figure.static).toBe(true)
    })

    test('is harmless on a figure that is new', () => {
        const figure = createFigure()

        figure.resetStyle()

        expect(markup(figure)).toBe(markup(createFigure()))
    })
})

describe('AbstractFigure update', () => {
    // Counts the redraws and the moves of the label.
    class CountingFigure extends AbstractFigure {
        readonly config: object = {}
        computations = 0
        labelMoves = 0

        computed(): this {
            this.computations++
            return this
        }

        moveLabel(): this {
            this.labelMoves++
            return this
        }

        tikz(): string {
            return ''
        }
    }

    const counting = () => new CountingFigure(createContext(), 'A')

    test('update draws the figure again and updates its label', () => {
        const figure = counting()
        figure.addLabel('label')
        const moves = figure.labelMoves

        expect(figure.update()).toBe(figure)

        expect(figure.computations).toBe(1)
        expect(figure.labelMoves).toBe(moves + 1)
    })

    test('update keeps the same element for the label, and keeps it hidden if it was', () => {
        const figure = counting()
        const label = figure.addLabel('label')
        label.hide()

        figure.update()

        expect(figure.label).toBe(label)
        expect(figure.element.find('#A-label')).toHaveLength(1)
        expect(label.visible).toBe(false)
    })

    test('update writes the text of a field in the same element', () => {
        const figure = counting()
        const label = figure.addLabel('label')
        const shape = label.shape

        figure.update()

        expect(label.shape).toBe(shape)
    })

    test('update does not need a label', () => {
        const figure = counting()

        figure.update()

        expect(figure.computations).toBe(1)
        expect(figure.labelMoves).toBe(0)
    })

    test.each([
        ['static', (figure: CountingFigure) => {
            figure.static = true
        }],
        ['draggable', (figure: CountingFigure) => {
            figure.isDraggable = true
        }],
    ])('a %s figure is left as it is, unless the update is forced', (_, setup) => {
        const figure = counting()
        setup(figure)

        figure.update()
        figure.update(false)
        expect(figure.computations).toBe(0)

        figure.update(true)
        expect(figure.computations).toBe(1)
    })

    test('a figure is neither static nor draggable by default', () => {
        const figure = counting()

        expect(figure.static).toBe(false)
        expect(figure.isDraggable).toBe(false)
    })
})

describe('AbstractFigure dash', () => {
    const dasharray = (figure: AbstractFigure) => figure.shape.node.getAttribute('stroke-dasharray')

    test('draws the stroke with the given pattern', () => {
        const figure = createFigure()

        expect(figure.dash('5 2')).toBe(figure)
        expect(dasharray(figure)).toBe('5 2')
    })

    test('the default pattern is in pixels, whatever the scale of the graph', () => {
        expect(dasharray(createFigure().dash())).toBe('6 4')
        expect(dasharray(createFigure(graphConfig({axis: {x: {x: 400, y: 0}, y: {x: 0, y: -400}}})).dash())).toBe('6 4')
        expect(dasharray(createFigure(graphConfig({axis: {x: {x: 4, y: 0}, y: {x: 0, y: -4}}})).dash())).toBe('6 4')
    })

    test('dot is dashes of 3 pixels', () => {
        expect(dasharray(createFigure().dot())).toBe('3')
    })

    test('a number is a pattern, as the parser gives it', () => {
        expect(dasharray(createFigure().dash(5))).toBe('5')
    })

    test('the dashes are kept by the next strokes', () => {
        const figure = createFigure().dash('4 1').stroke('red', 3)

        expect(dasharray(figure)).toBe('4 1')
        expect(figure.shape.attr('stroke')).toBe('red')
    })

    test('the dashes are applied to a new shape by the stroke', () => {
        const figure = createFigure().dash('4 1')

        figure.shape = figure.element.rect(5, 5)
        expect(dasharray(figure)).toBeNull()

        figure.stroke()
        expect(dasharray(figure)).toBe('4 1')
    })

    test("'none' gives back a continuous stroke, which stays so", () => {
        const figure = createFigure().dash('4 1').dash('none')

        expect(dasharray(figure)).toBe('none')

        figure.shape = figure.element.rect(5, 5)
        figure.stroke()
        expect(dasharray(figure)).toBeNull()
    })

    test.each([['abc'], ['-3'], ['5 x'], [''], ['5;2']])('the pattern "%s" is an InvalidArgumentError and changes nothing', (pattern) => {
        const figure = createFigure().dash('4 1')

        expect(() => figure.dash(pattern)).toThrow(InvalidArgumentError)
        expect(dasharray(figure)).toBe('4 1')
    })

    test('every shape that carries the stroke is dashed', () => {
        class TwoShapes extends TestFigure {
            other = this.element.line(0, 0, 5, 5)

            override strokeable() {
                return [this.shape, this.other]
            }
        }
        const figure = new TwoShapes(createContext(), 'A').dash('6')

        expect(figure.shape.node.getAttribute('stroke-dasharray')).toBe('6')
        expect(figure.other.node.getAttribute('stroke-dasharray')).toBe('6')
    })

    test('a figure that builds a new shape keeps its dashes: Circle, when its configuration changes', () => {
        const circle = new Circle(createContext(), 'C', {center: {x: 0, y: 0}, radius: 1})
        circle.dash('7 3').stroke({color: 'green', opacity: 0.5}, 4)

        circle.config = {center: {x: 1, y: 1}, radius: 2}

        expect(dasharray(circle)).toBe('7 3')
        expect(circle.shape.attr('stroke')).toBe('green')
        expect(circle.shape.attr('stroke-opacity')).toBe(0.5)
        expect(circle.shape.attr('stroke-width')).toBe(4)
    })
})

describe('AbstractFigure tikz', () => {
    const draw = (figure: TestFigure) => figure.tikz().split('\n').find(line => line.startsWith('\\draw'))

    test('the default appearance is a black stroke of 0.75 pt, without fill', () => {
        expect(draw(createFigure())).toBe('\\draw[draw=black, line width=0.75pt] (0,0) -- (1,1);')
    })

    test('the width of the stroke is converted from pixels to points', () => {
        expect(draw(createFigure().stroke(2))).toContain('line width=1.5pt')
    })

    test('the color and the opacity of the stroke become draw and draw opacity', () => {
        expect(draw(createFigure().stroke({color: 'red', opacity: 0.5}))).toContain('draw=pidraw-red, line width=0.75pt, draw opacity=0.5')
    })

    test('a stroke that is transparent draws nothing', () => {
        expect(draw(createFigure().stroke('transparent'))).toBe('\\draw[draw=none] (0,0) -- (1,1);')
    })

    test('the color and the opacity of the fill become fill and fill opacity', () => {
        expect(draw(createFigure().fill({color: 'blue', opacity: 0.25}))).toContain('fill=pidraw-blue, fill opacity=0.25')
    })

    test('a fill that is transparent writes no fill', () => {
        expect(draw(createFigure())).not.toContain('fill')
    })

    test('a hexadecimal color is defined in the fragment, before the command that uses it', () => {
        const lines = createFigure().stroke('#ff8000').tikz().split('\n')

        expect(lines[0]).toBe('\\definecolor{pidraw-ff8000}{HTML}{FF8000}')
        expect(lines[1]).toContain('draw=pidraw-ff8000')
    })

    test('a short hexadecimal color and an rgb() color give the same definition', () => {
        const short = createFigure().stroke('#f80').tikz()
        const rgb = createFigure().stroke('rgb(255, 136, 0)').tikz()

        expect(short).toContain('\\definecolor{pidraw-ff8800}{HTML}{FF8800}')
        expect(rgb).toBe(short)
    })

    test('a color used by the stroke and the fill is defined once', () => {
        const tikz = createFigure().stroke('#ff8000').fill({color: '#ff8000', opacity: 0.5}).tikz()

        expect(tikz.match(/\\definecolor/g)).toHaveLength(1)
        expect(tikz).toContain('fill=pidraw-ff8000, fill opacity=0.5')
    })

    test('a color with no equivalent in LaTeX is refused', () => {
        const figure = createFigure().fill('periwinkle')

        expect(() => figure.tikz()).toThrow(InvalidArgumentError)
    })

    test('the dashes become a dash pattern in points', () => {
        expect(draw(createFigure().dash('5 2'))).toContain('dash pattern=on 3.75pt off 1.5pt')
    })

    test('the default dashes are 6 pixels and a gap of 4', () => {
        expect(draw(createFigure().dash())).toContain('dash pattern=on 4.5pt off 3pt')
    })

    test('a dash pattern of one length alternates dashes and gaps of that length', () => {
        expect(draw(createFigure().dash(4))).toContain('dash pattern=on 3pt off 3pt')
    })

    test('a dash pattern of an odd length is repeated, like in svg', () => {
        expect(draw(createFigure().dash('4 2 1'))).toContain('dash pattern=on 3pt off 1.5pt on 0.75pt off 3pt on 1.5pt off 0.75pt')
    })

    test('no dash pattern without dashes', () => {
        expect(draw(createFigure().dash(4).dash('none'))).not.toContain('dash')
    })

    test.each([
        ['end', '->'],
        ['start', '<-'],
        ['both', '<->']
    ])('a marker on the %s is the arrow %s', (side, arrow) => {
        expect(draw(createFigure().mark({side: side as MarkerSide}))).toContain(`, ${arrow}]`)
    })

    test('the bar marker is the bar tip of TikZ', () => {
        expect(draw(createFigure().mark({side: 'both', shape: '|'}))).toContain(', |-|]')
    })

    test('the cross marker is written with the rays tip of arrows.meta', () => {
        expect(draw(createFigure().mark({side: 'end', shape: 'x'}))).toContain('-{Rays[n=4,angle=45:1pt]}]')
    })

    test('markers on each end are both written when asked one after the other', () => {
        expect(draw(createFigure().mark({side: 'start'}).mark({side: 'end', shape: '|'}))).toContain(', <-|]')
    })

    test('removing the markers removes the arrows', () => {
        expect(draw(createFigure().mark({side: 'both'}).mark({side: 'none'}))).not.toContain('<')
    })

    test('no label, no node', () => {
        expect(createFigure().tikz()).not.toContain('\\node')
    })

    test('the label is a node below right of its place by default, with its text as it is', () => {
        const figure = createFigure()
        figure.addLabel('$x_1$')

        expect(figure.tikz()).toContain('\\node[below right] at (0,0) {$x_1$};')
    })

    test.each([
        ['tl', 'above left'],
        ['tc', 'above'],
        ['tr', 'above right'],
        ['ml', 'left'],
        ['mr', 'right'],
        ['bl', 'below left'],
        ['bc', 'below']
    ] as const)('the alignment %s of the label is the anchor "%s"', (alignement, anchor) => {
        const figure = createFigure()
        figure.addLabel('A').config.alignement = alignement

        expect(figure.tikz()).toContain(`\\node[${anchor}] at (0,0) {A};`)
    })

    test('a label written in TeX is a formula: it is put between dollars', () => {
        const figure = createFigure()
        figure.addLabel('A_1', {asHtml: true, texConverter: (value) => value})

        expect(figure.tikz()).toContain('\\node[below right] at (0,0) {$A_1$};')
    })

    test('a label written in TeX that has dollars already is left as it is', () => {
        const figure = createFigure()
        figure.addLabel('\\text{price $x$}', {asHtml: true, texConverter: (value) => value})

        expect(figure.tikz()).toContain('{\\text{price $x$}};')
    })

    test('a label that is not written in TeX is a text, whatever it has', () => {
        const figure = createFigure()
        figure.addLabel('A1')

        expect(figure.tikz()).toContain('{A1};')
    })

    test('a label centered on its place has no anchor', () => {
        const figure = createFigure()
        figure.addLabel('A').config.alignement = 'mc'

        expect(figure.tikz()).toContain('\\node at (0,0) {A};')
    })

    test('the offset and the rotation of the label are written in points and counterclockwise', () => {
        const figure = createFigure()
        const label = figure.addLabel('A')
        label.config.offset = {x: 4, y: -8}
        label.config.rotate = 30

        expect(figure.tikz()).toContain('\\node[below right, xshift=3pt, yshift=-6pt, rotate=-30] at (0,0) {A};')
    })
})

describe('AbstractFigure label content', () => {
    // A figure that can show one field in its label: `c` followed by the number of digits.
    class FieldFigure extends TestFigure {
        override labelFields() {
            return {coordinates: (digits: number | undefined) => `c${String(digits)}`}
        }
    }

    const create = () => new FieldFigure(createContext(), 'A')

    test('a text is the text of the label as it is', () => {
        const figure = create()

        expect(figure.addLabel('x = @').displayName).toBe('x = @')
    })

    test('without a content, the label is the name of the figure', () => {
        const figure = create()

        expect(figure.addLabel().displayName).toBe('A')
        expect(figure.computeLabel()).toBe('A')
    })

    test('a list of texts and fields is written with the value of each field', () => {
        const figure = create()
        const label = figure.addLabel(['P', {field: 'coordinates', digits: 3}, '!'])

        expect(label.displayName).toBe('Pc3!')
        expect(figure.computeLabel()).toBe('Pc3!')
    })

    test('a field the figure cannot show is an InvalidArgumentError that names the fields it can', () => {
        const figure = create()

        expect(() => figure.addLabel([{field: 'length', digits: 2}])).toThrow(InvalidArgumentError)
        expect(() => figure.addLabel([{field: 'length', digits: 2}])).toThrow(/length.*coordinates/)
    })

    test('a figure without fields cannot show any', () => {
        const figure = createFigure()

        expect(() => figure.addLabel([{field: 'coordinates', digits: 2}])).toThrow(InvalidArgumentError)
    })

    test.each([-1, 1.5, NaN, Infinity])('a field with %s digits is an InvalidArgumentError', (digits) => {
        const figure = create()

        expect(() => figure.addLabel([{field: 'coordinates', digits}])).toThrow(InvalidArgumentError)
    })

    test('a label that is refused leaves the previous label as it was', () => {
        const figure = create()
        const label = figure.addLabel('one')

        expect(() => figure.addLabel([{field: 'length', digits: 2}])).toThrow(InvalidArgumentError)

        expect(figure.label).toBe(label)
        expect(figure.element.has(label.shape)).toBe(true)
        expect(figure.computeLabel()).toBe('one')
    })
})

describe('AbstractFigure tikz helpers', () => {
    // Writes what the helpers give: a position, a length, and which parts of the figure are shown.
    class HelperFigure extends TestFigure {
        override tikz(): string {
            return [this._tikzCoordinates({x: 450, y: 250}), this._tikzLength(10), JSON.stringify(this._tikzShown())].join('|')
        }
    }

    const create = () => new HelperFigure(createContext(), 'A')
    const shown = (figure: HelperFigure) => JSON.parse(figure.tikz().split('|')[2]) as { shape: boolean, label: boolean }

    test('a position in pixels is written in units of the coordinate system', () => {
        expect(create().tikz().split('|')[0]).toBe('1,1')
    })

    test('a position is written with 5 decimals at most', () => {
        const figure = new (class extends HelperFigure {
            override tikz() {
                return this._tikzCoordinates({x: 400 + 50 / 3, y: 300})
            }
        })(createContext(), 'A')

        expect(figure.tikz()).toBe('0.33333,0')
    })

    test('a length in pixels is written in points', () => {
        expect(create().tikz().split('|')[1]).toBe('7.5pt')
    })

    test('a figure is shown with its label by default', () => {
        const figure = create()
        figure.addLabel('A')

        expect(shown(figure)).toEqual({shape: true, label: true})
    })

    test('a figure without a label shows no label', () => {
        expect(shown(create())).toEqual({shape: true, label: false})
    })

    test('a figure that is hidden shows nothing', () => {
        const figure = create()
        figure.addLabel('A')
        figure.hide()

        expect(shown(figure)).toEqual({shape: false, label: false})
    })

    test('a figure whose shape is hidden still shows its label', () => {
        const figure = create()
        figure.addLabel('A')
        figure.shape.hide()

        expect(shown(figure)).toEqual({shape: false, label: true})
    })

    test('a figure whose label is hidden still shows its shape', () => {
        const figure = create()
        figure.addLabel('A').hide()

        expect(shown(figure)).toEqual({shape: true, label: false})
    })

    test('a figure that is not visible, as a point without a position, shows nothing', () => {
        const figure = create()
        figure.addLabel('A')
        figure.element.attr('visibility', 'hidden')

        expect(shown(figure)).toEqual({shape: false, label: false})
    })
})

describe('AbstractFigure follow', () => {
    test('a figure cannot be followed by default: a position stays where it is', () => {
        const figure = createFigure()

        expect(figure.followable).toBe(false)
        expect(figure.follow(12, 34)).toEqual({x: 12, y: 34})
    })

    test('dispose does nothing by default', () => {
        expect(() => {
            createFigure().dispose()
        }).not.toThrow()
    })
})

describe('AbstractFigure controls', () => {
    const figure = (changed = vi.fn()) => ({figure: new TestFigure({...createContext(), figureChanged: changed}, 'A'), changed})
    const steps = [{from: 2}]

    test('a figure has no controls by default', () => {
        expect(createFigure().controls).toEqual({})
    })

    test('keeps what a theme gives it, and gives it up with null', () => {
        const {figure: A} = figure()

        A.setControl('slide', steps)
        expect(A.controls.slide).toBe(steps)

        A.setControl('slide', null)
        expect(A.controls).toEqual({})
        expect(Object.hasOwn(A.controls, 'slide')).toBe(false)
    })

    test('returns the figure, to chain', () => {
        const {figure: A} = figure()

        expect(A.setControl('slide', steps)).toBe(A)
    })

    test('tells the graph, with its name, when an entry is set and when it is taken away', () => {
        const {figure: A, changed} = figure()

        A.setControl('slide', steps)
        A.setControl('slide', null)

        expect(changed).toHaveBeenCalledTimes(2)
        expect(changed).toHaveBeenCalledWith('A')
    })

    test('a figure without a graph that listens keeps its controls and tells nobody', () => {
        const A = new TestFigure(createContext(), 'A')

        expect(() => { A.setControl('slide', steps) }).not.toThrow()
        expect(A.controls.slide).toEqual(steps)
    })

    test('does not check the value: the theme does', () => {
        const {figure: A} = figure()

        expect(() => { A.setControl('slide', []) }).not.toThrow()
    })

    test('resetStyle takes every entry away, and says it', () => {
        const {figure: A, changed} = figure()
        A.setControl('slide', steps)
        changed.mockClear()

        A.resetStyle()

        expect(A.controls).toEqual({})
        expect(changed).toHaveBeenCalledOnce()
    })

    test('resetStyle of a figure without controls tells nobody', () => {
        const {figure: A, changed} = figure()

        A.resetStyle()

        expect(changed).not.toHaveBeenCalled()
    })
})

describe('AbstractFigure hidden for a reason', () => {
    class Placed extends TestFigure {
        place(defined: boolean): void {
            this._setDefined(defined)
        }

        shown(): { shape: boolean, label: boolean } {
            return this._tikzShown()
        }
    }

    const create = () => new Placed(createContext(), 'A')
    const visibility = (A: Placed): string | undefined => A.element.attr('visibility') as string | undefined

    test('is shown by default', () => {
        const A = create()

        expect(visibility(A)).toBeUndefined()
        expect(A.isHiddenBy('slide')).toBe(false)
    })

    test('a reason hides the figure, and releasing it shows the figure again', () => {
        const A = create()

        A.setHiddenBy('slide', true)
        expect(visibility(A)).toBe('hidden')
        expect(A.isHiddenBy('slide')).toBe(true)

        A.setHiddenBy('slide', false)
        expect(visibility(A)).toBeUndefined()
        expect(A.isHiddenBy('slide')).toBe(false)
    })

    test('the figure stays hidden while one reason holds', () => {
        const A = create()

        A.setHiddenBy('slide', true)
        A.setHiddenBy('other', true)
        A.setHiddenBy('slide', false)
        expect(visibility(A)).toBe('hidden')

        A.setHiddenBy('other', false)
        expect(visibility(A)).toBeUndefined()
    })

    test('the same reason twice is one reason', () => {
        const A = create()

        A.setHiddenBy('slide', true)
        A.setHiddenBy('slide', true)
        A.setHiddenBy('slide', false)

        expect(visibility(A)).toBeUndefined()
    })

    test('does not undo hide(): a figure hidden on purpose stays hidden', () => {
        const A = create()
        A.hide()

        A.setHiddenBy('slide', true)
        A.setHiddenBy('slide', false)

        expect(A.element.css('display')).toBe('none')
    })

    test('does not undo the lack of a position: the figure comes back only when it has both', () => {
        const A = create()
        A.place(false)

        A.setHiddenBy('slide', true)
        A.setHiddenBy('slide', false)
        expect(visibility(A)).toBe('hidden')

        A.place(true)
        expect(visibility(A)).toBeUndefined()
    })

    test('a position that comes back does not show a figure that a reason hides', () => {
        const A = create()
        A.setHiddenBy('slide', true)

        A.place(false)
        A.place(true)

        expect(visibility(A)).toBe('hidden')
    })

    test('the TikZ shows nothing of a figure that a reason hides, and shows it again after', () => {
        const A = create()
        expect(A.shown().shape).toBe(true)

        A.setHiddenBy('slide', true)
        expect(A.shown()).toEqual({shape: false, label: false})

        A.setHiddenBy('slide', false)
        expect(A.shown().shape).toBe(true)
    })
})
