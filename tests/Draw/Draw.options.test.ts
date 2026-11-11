import {describe, expect, test, vi} from 'vitest'
import {Graph} from '../../src/Graph'
import {Point} from '../../src/figures/Point/Point'
import {Line} from '../../src/figures/Line/Line'
import {InvalidArgumentError, OptionError} from '../../src/errors'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import type {IParserParameters} from '../../src/parser/parser.types'
import {applyOptions, dragConfig, type Options, withDefaults} from '../../src/Draw/Draw.options'
import {animationOf} from '../../src/animate/animation'
import {createContext} from '../helpers/figure'

const option = (value: IParserParameters['value'], ...options: IParserParameters['options']): IParserParameters => ({value, options})

/** A graph that only has what the options read: the figures and the scale. */
function createGraph(figures: Record<string, AbstractFigure> = {}) {
    const context = createContext()
    const graph = Object.create(Graph.prototype) as Graph
    Object.defineProperty(graph, 'config', {value: context.config, configurable: true})
    Object.defineProperty(graph, 'figures', {value: figures, configurable: true})

    return {graph, context}
}

function createPoint(figures: Record<string, AbstractFigure> = {}) {
    const {graph, context} = createGraph(figures)
    const point = new Point(context, 'A', {coordinates: {x: 1, y: 1}})

    return {graph, context, point}
}

describe('Draw apply options', () => {
    test('an option that does not exist is an OptionError that names the option and the figure', () => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({colr: option(true)}, point, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({colr: option(true)}, point, graph)
        }).toThrow(/"colr".*"A"/)
    })

    test('the options before the one that is not valid are applied', () => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({color: option('red'), colr: option(true), fill: option('blue')}, point, graph)
        }).toThrow(OptionError)
        expect(point.appearance.stroke.color).toBe('red')
        expect(point.appearance.fill.color).not.toBe('blue')
    })

    test('the options are applied in the order they are written', () => {
        const {graph, point} = createPoint()

        applyOptions({red: option(true), blue: option(true)}, point, graph)

        expect(point.appearance.stroke.color).toBe('blue')
    })

    test('the name of a color strokes the figure with that color', () => {
        const {graph, point} = createPoint()

        applyOptions({orange: option(true)}, point, graph)

        expect(point.appearance.stroke.color).toBe('orange')
    })

    test('an option that the figure refuses is an OptionError, whatever the error of the figure', () => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({dash: option('x')}, point, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({move: option('x')}, point, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({mark: option('sideways')}, point, graph)
        }).toThrow(OptionError)
    })
})

describe('Draw options of the appearance', () => {
    test('w is the width of the stroke', () => {
        const {graph, point} = createPoint()

        applyOptions({w: option(3)}, point, graph)

        expect(point.appearance.stroke.width).toBe(3)
    })

    test.each([['red'], [true]])('w=%s is an OptionError: it is a number', (value) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({w: option(value)}, point, graph)
        }).toThrow(OptionError)
    })

    test.each([
        ['ultrathin', 0.5],
        ['thin', 0.75],
        ['thick', 2.5],
        ['ultrathick', 4]
    ])('%s is a stroke of %s', (key, width) => {
        const {graph, point} = createPoint()

        applyOptions({[key]: option(true)}, point, graph)

        expect(point.appearance.stroke.width).toBe(width)
    })

    test('color is the color of the stroke, with an opacity or not', () => {
        const {graph, point} = createPoint()

        applyOptions({color: option('red')}, point, graph)
        expect(point.appearance.stroke).toMatchObject({color: 'red', opacity: 1})

        applyOptions({color: option('blue', 0.3)}, point, graph)
        expect(point.appearance.stroke).toMatchObject({color: 'blue', opacity: 0.3})
    })

    test('fill is the color of the fill, with an opacity or not', () => {
        const {graph, point} = createPoint()

        applyOptions({fill: option('teal', 0.25)}, point, graph)
        expect(point.appearance.fill).toEqual({color: 'teal', opacity: 0.25})

        applyOptions({fill: option('green')}, point, graph)
        expect(point.appearance.fill).toEqual({color: 'green', opacity: 1})
    })

    test.each([
        ['without a color', option(true)],
        ['with a number for a color', option(3)],
        ['with an opacity that is not a number', option('red', 'half')],
        ['with an opacity above 1', option('red', 2)],
        ['with more than an opacity', option('red', 0.5, 0.5)]
    ])('color and fill %s is an OptionError', (_, value) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({color: value}, point, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({fill: value}, point, graph)
        }).toThrow(OptionError)
    })

    test('dash is a pattern, the default one without a value', () => {
        const {graph, context} = createGraph()
        const dashed = (value: IParserParameters['value']) => {
            const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

            applyOptions({dash: option(value)}, line, graph)

            return line.shape.node.getAttribute('stroke-dasharray')
        }

        expect(dashed(true)).toBe('6 4')
        expect(dashed('5 2')).toBe('5 2')
        expect(dashed(4)).toBe('4')
    })

    test('dash accepts a size, a pattern in pixels', () => {
        const {graph, context} = createGraph()
        const dashed = (value: IParserParameters['value']) => {
            const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

            applyOptions({dash: option(value)}, line, graph)

            return line.shape.node.getAttribute('stroke-dasharray')
        }

        expect(dashed('xs')).toBe('2 2')
        expect(dashed('sm')).toBe('4 3')
        expect(dashed('md')).toBe('6 4')
        expect(dashed('lg')).toBe('10 6')
        expect(dashed('xl')).toBe('16 8')
    })

    test('dash with an unknown size is an option error', () => {
        const {graph, context} = createGraph()
        const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

        expect(() => {
            applyOptions({dash: option('xxl')}, line, graph)
        }).toThrow(OptionError)
    })

    test('dot is a dotted stroke', () => {
        const {graph, context} = createGraph()
        const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

        applyOptions({dot: option(true)}, line, graph)

        expect(line.shape.node.getAttribute('stroke-dasharray')).toBe('3')
    })

    describe('mark', () => {
        const lineWith = (option: IParserParameters) => {
            const {graph, context} = createGraph()
            const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

            applyOptions({mark: option}, line, graph)

            return line
        }

        const ends = (line: Line) => [Boolean(line.shape.attr('marker-start')), Boolean(line.shape.attr('marker-end'))]

        test.each([
            ['mark', option(true), [true, true]],
            ['mark=both', option('both'), [true, true]],
            ['mark=start', option('start'), [true, false]],
            ['mark=end', option('end'), [false, true]],
            ['mark=none', option('none'), [false, false]],
            ['mark=false', option(false), [false, false]]
        ])('%s puts the markers on the ends it names', (_, value, expected) => {
            expect(ends(lineWith(value))).toEqual(expected)
        })

        test('a number among the parameters is the size, a text is the shape, in any order', () => {
            expect(lineWith(option('end', 20)).shape.attr('marker-end')).toContain('marker-d-20')
            expect(lineWith(option('end', 'x', 12)).shape.attr('marker-end')).toContain('marker-x-d-12')
            expect(lineWith(option('end', 15, '|')).shape.attr('marker-end')).toContain('marker-bar-d-15')
        })

        test.each([
            ['a number for the side', option(3)],
            ['a side that does not exist', option('sideways')],
            ['a size that is not valid', option('end', -1)],
            ['a shape that does not exist', option('end', 'abc')]
        ])('%s is an OptionError', (_, value) => {
            expect(() => lineWith(value)).toThrow(OptionError)
        })
    })
})

describe('Draw option label', () => {
    test.each(['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'])('the position %s is accepted and given to the label', (position) => {
        const {graph, point} = createPoint()

        applyOptions({label: option('A', position)}, point, graph)

        expect(point.label?.config.alignement).toBe(position)
    })

    test.each([['x'], ['top'], ['tt'], ['tlr'], [3]])('the position %s is an OptionError: it is none of the nine positions, nor one letter of them', (position) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({label: option('A', position)}, point, graph)
        }).toThrow(OptionError)
        expect(point.label).toBeNull()
    })

    test('a shift is a pair of numbers in units, and a rotation an angle or nothing', () => {
        const {graph, point} = createPoint()

        applyOptions({label: option('A', 'tl', {x: 0.5, y: 1}, 30)}, point, graph)
        expect(point.label?.config.rotate).toBe(30)
        expect(point.label?.config.offset.x).toBeGreaterThan(0)

        applyOptions({label: option('A', 'tl', {x: 0, y: 0}, true)}, point, graph)
        expect(point.label?.autoRotate).toBe(true)
    })

    test.each([
        ['a shift that is not a pair', option('A', 'tl', 'near')],
        ['a rotation that is not an angle', option('A', 'tl', {x: 0, y: 0}, 'left')]
    ])('%s is an OptionError', (_, value) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({label: value}, point, graph)
        }).toThrow(OptionError)
    })

    test('@ followed by the name of a field the figure has is written in the label', () => {
        const {graph, context} = createGraph()
        const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
        const B = new Point(context, 'B', {coordinates: {x: 2, y: 3}})
        const d = new Line(context, 'd', {through: {A, B}})

        applyOptions({label: option('m=@slope')}, d, graph)
        expect(d.label?.displayName).toBe('m=3/2')

        applyOptions({tex: option('m=@slope')}, d, graph)
        expect(d.label?.displayName).toBe('m=\\frac{3}{2}')

        applyOptions({label: option('@slope.1')}, d, graph)
        expect(d.label?.displayName).toBe('1.5')
    })

    test.each([
        ['a field the figure does not have', option('@area')],
        ['a @ alone for a figure that has no default field', option('@')]
    ])('%s is an OptionError', (_, value) => {
        const {graph, context} = createGraph()
        const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
        const B = new Point(context, 'B', {coordinates: {x: 2, y: 3}})
        const d = new Line(context, 'd', {through: {A, B}})

        expect(() => {
            applyOptions({label: value}, d, graph)
        }).toThrow(OptionError)
    })
})

describe('Draw option class', () => {
    test('class=a/b gives the group of the figure the classes a and b after the one of its kind', () => {
        const {graph, point} = createPoint()

        applyOptions({class: option('a', 'b')}, point, graph)

        expect(point.element.attr('class')).toBe('pidraw-point a b')
    })

    test('class=primary gives one class', () => {
        const {graph, point} = createPoint()

        applyOptions({class: option('primary')}, point, graph)

        expect(point.classes).toEqual(['primary'])
    })

    test.each([[true], [3], ['1a'], ['a b']])('class=%s is an OptionError: the names are CSS identifiers', (value) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({class: option(value)}, point, graph)
        }).toThrow(OptionError)
    })
})

describe('Draw options of the visibility', () => {
    test('hide hides the figure', () => {
        const {graph, point} = createPoint()

        applyOptions({hide: option(true)}, point, graph)

        expect(point.element.css('display')).toBe('none')
    })

    test('! hides the figure but keeps its label, ? hides the label but keeps the figure', () => {
        const {graph, point} = createPoint()

        applyOptions({label: option('A'), '!': option(true)}, point, graph)
        expect(point.shape.css('display')).toBe('none')
        expect(point.label?.shape.css('display')).not.toBe('none')

        const other = createPoint()
        applyOptions({label: option('A'), '?': option(true)}, other.point, other.graph)
        expect(other.point.shape.css('display')).not.toBe('none')
        expect(other.point.label?.shape.css('display')).toBe('none')
    })

    test('_ and static make the figure static, static=false makes it follow again', () => {
        const {graph, point} = createPoint()

        applyOptions({_: option(true)}, point, graph)
        expect(point.static).toBe(true)

        applyOptions({static: option(false)}, point, graph)
        expect(point.static).toBe(false)

        applyOptions({static: option(true)}, point, graph)
        expect(point.static).toBe(true)
    })
})

describe('Draw options of the placement', () => {
    test('move and scale transform the shape', () => {
        const {graph, point} = createPoint()

        applyOptions({move: option({x: 10, y: 5}), scale: option({x: 2, y: 2})}, point, graph)

        const transform = point.shape.node.getAttribute('transform') ?? ''
        expect(transform).not.toBe('')
    })
})

describe('Draw options of the animation', () => {
    /** A point A and the points B and C of the drawing it can go between. */
    function createAnimation() {
        const {graph, context} = createGraph()
        const from = new Point(context, 'B', {coordinates: {x: 0, y: 0}})
        const to = new Point(context, 'C', {coordinates: {x: 3, y: 3}})
        const point = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
        Object.defineProperty(graph, 'figures', {value: {B: from, C: to}, configurable: true})

        return {graph, point}
    }

    test.each(['from', 'to', 'duration', 'delay', 'easing', 'loop'])('%s without animate is an OptionError', (key) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({[key]: option('B')}, point, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({[key]: option('B')}, point, graph)
        }).toThrow(/animate/)
    })

    test('animate reads the points, the duration and the delay of the other options', () => {
        const {graph, context} = createGraph()
        const from = new Point(context, 'B', {coordinates: {x: 0, y: 0}})
        const to = new Point(context, 'C', {coordinates: {x: 3, y: 3}})
        const point = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
        Object.defineProperty(graph, 'figures', {value: {B: from, C: to}, configurable: true})

        applyOptions({animate: option(true), from: option('B'), to: option('C'), duration: option(4), delay: option(1), easing: option('inOut')}, point, graph)

        expect(animationOf(point)).toMatchObject({from, to, duration: 4, delay: 1, easing: 'inOut'})
    })

    test.each([
        [true, 'reset'],
        ['1', 'reset'],
        [1, 'reset'],
        ['reset', 'reset'],
        ['reverse', 'reverse'],
        ['none', 'none']
    ])('loop=%j is the style %s', (value, style) => {
        const {graph, point} = createAnimation()

        applyOptions({animate: option(true), from: option('B'), to: option('C'), loop: option(value)}, point, graph)

        expect(animationOf(point)?.loop).toBe(style)
    })

    test.each([['revers'], [''], ['RESET'], [0], [false], [2], ['toString']])('loop=%j is an OptionError that names the option and the styles', (value) => {
        const {graph, point} = createAnimation()
        const apply = () => {
            applyOptions({animate: option(true), from: option('B'), to: option('C'), loop: option(value)}, point, graph)
        }

        expect(apply).toThrow(OptionError)
        expect(apply).toThrow(/"loop".*reset, reverse, none/)
        expect(animationOf(point)).toBeNull()
    })

    test.each(['linear', 'inOut'])('easing=%s is kept', (value) => {
        const {graph, point} = createAnimation()

        applyOptions({animate: option(true), from: option('B'), to: option('C'), easing: option(value)}, point, graph)

        expect(animationOf(point)?.easing).toBe(value)
    })

    test.each([['foo'], [''], ['inout'], [3], [true], ['toString']])('easing=%j is an OptionError that names the option and the easings', (value) => {
        const {graph, point} = createAnimation()
        const apply = () => {
            applyOptions({animate: option(true), from: option('B'), to: option('C'), easing: option(value)}, point, graph)
        }

        expect(apply).toThrow(OptionError)
        expect(apply).toThrow(/"easing".*linear, inOut/)
        expect(animationOf(point)).toBeNull()
    })

    test('from and to that are not points are an OptionError', () => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({animate: option(true), from: option('B'), to: option('C')}, point, graph)
        }).toThrow(OptionError)
    })
})

describe('Draw option drag', () => {
    test('a point is given a handle with the limits of the option', () => {
        const {graph, point} = createPoint()
        const handle = vi.fn()
        Object.defineProperty(graph, 'handle', {value: handle})

        applyOptions({drag: option('grid', 'Ox')}, point, graph)

        expect(handle).toHaveBeenCalledWith(point, {grid: true, along: 'x'})
    })

    test('a limit that means nothing is an OptionError', () => {
        const {graph, point} = createPoint()
        const handle = vi.fn()
        Object.defineProperty(graph, 'handle', {value: handle})

        expect(() => {
            applyOptions({drag: option('Oz')}, point, graph)
        }).toThrow(OptionError)
        expect(handle).not.toHaveBeenCalled()
    })

    test('a figure that is not a point is an OptionError', () => {
        const {graph, context} = createGraph()
        const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

        expect(() => {
            applyOptions({drag: option(true)}, line, graph)
        }).toThrow(OptionError)
    })
})

describe('Draw limits of a drag', () => {
    test('there is none without a value that means one', () => {
        expect(dragConfig([true], {})).toEqual({})
    })

    test('domains of an axis, by default of x', () => {
        expect(dragConfig([{min: -2, max: 3, axis: 'x'}], {})).toEqual({bounds: {x: {min: -2, max: 3}}})
        expect(dragConfig([{min: 0, max: 1, axis: 'y'}], {})).toEqual({bounds: {y: {min: 0, max: 1}}})
    })
})

describe('Draw options with the defaults of the graph', () => {
    const point = () => createPoint().point

    test('the options of a figure that is not a point are not changed', () => {
        const {context} = createGraph()
        const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})
        const options: Options = {red: option(true)}

        expect(withDefaults(options, {label: true, points: false}, line)).toBe(options)
    })

    test('the label of the points is asked by the settings, unless the line asks for a label', () => {
        expect(Object.keys(withDefaults({}, {label: true}, point()))).toEqual(['label'])
        expect(Object.keys(withDefaults({tex: option(true)}, {label: true}, point()))).toEqual(['tex'])
        expect(withDefaults({label: option('B')}, {label: true}, point()).label.value).toBe('B')
    })

    test('the tex of the points is asked by the settings, but a label setting wins over it', () => {
        expect(Object.keys(withDefaults({}, {tex: true}, point()))).toEqual(['tex'])
        expect(Object.keys(withDefaults({}, {label: true, tex: true}, point()))).toEqual(['label'])
    })

    test('points=false hides the points but their label', () => {
        expect(withDefaults({}, {points: false}, point())['!']).toEqual(option(true))
    })

    test('the shape of the settings comes first, and a shape of the line wins over it', () => {
        expect(Object.keys(withDefaults({red: option(true)}, {points: {shape: 's', size: 12}}, point()))).toEqual(['s', 'red'])
        expect(withDefaults({}, {points: {shape: 's', size: 12}}, point()).s.value).toBe(12)
        expect(Object.keys(withDefaults({o: option(true)}, {points: {shape: 's', size: 12}}, point()))).toEqual(['o'])
    })

    test('the default shape, with its default size, adds nothing', () => {
        expect(withDefaults({}, {points: {shape: 'o'}}, point())).toEqual({})
    })

    test('the options given are not changed', () => {
        const options: Options = {red: option(true)}

        withDefaults(options, {label: true, points: {shape: '*'}}, point())

        expect(Object.keys(options)).toEqual(['red'])
    })
})

describe('Draw option label pushed away from a figure', () => {
    function setup() {
        const figures: Record<string, AbstractFigure> = {}
        const {graph, context} = createGraph(figures)
        const O = new Point(context, 'O', {coordinates: {x: 0, y: 0}})
        const A = new Point(context, 'A', {coordinates: {x: 2, y: 3}})
        const d = new Line(context, 'd', {through: {A: O, B: A}})
        figures.O = O
        figures.A = A
        figures.d = d

        return {graph, context, O, A, d}
    }

    test('>O puts the label on the side of its anchor that is opposite to O, and keeps O as its reference', () => {
        const {graph, O, A} = setup()

        applyOptions({label: option('A', '>O')}, A, graph)

        expect(A.labelReference).toBe(O)
        // A is at (500, 150) and O at (400, 300): the label lies up and to the right.
        const away = A.label?.config.away

        expect(away?.x).toBeCloseTo(100 / Math.hypot(100, 150), 6)
        expect(away?.y).toBeCloseTo(-150 / Math.hypot(100, 150), 6)
    })

    test('the label that follows O is not asked a position: the alignement stays the one of the figure', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', '>O')}, A, graph)

        expect(A.label?.alignementGiven).toBe(false)
    })

    test('a distance after >O is in units of the x axis, and pushes the label further', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', '>O', 0.5)}, A, graph)

        expect(A.label?.config.push).toBeCloseTo(25, 6)
    })

    test('a distance alone pushes the label further where its position puts it', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', 'tl', 0.2)}, A, graph)

        expect(A.label?.alignement).toBe('tl')
        expect(A.label?.config.push).toBeCloseTo(10, 6)
        expect(A.label?.config.offset).toEqual({x: 0, y: 0})
    })

    test('a distance alone is allowed when the position is not written, whatever the position of the figure', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', true, 1)}, A, graph)

        expect(A.label?.config.push).toBeCloseTo(50, 6)
    })

    test('a position that lies on no side has no direction for a distance', () => {
        const {graph, A} = setup()

        expect(() => {
            applyOptions({label: option('A', 'mc', 1)}, A, graph)
        }).toThrow(OptionError)
    })

    test('a shift by a pair is still a shift, with no push', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', 'tl', {x: 2, y: 3})}, A, graph)

        expect(A.label?.config.push).toBeNull()
        expect(A.label?.config.offset.x).toBeCloseTo(100, 6)
    })

    test('a figure that does not exist, or that has no point, cannot be the reference', () => {
        const {graph, A} = setup()

        expect(() => {
            applyOptions({label: option('A', '>Z')}, A, graph)
        }).toThrow(OptionError)
        expect(() => {
            applyOptions({label: option('A', '>d')}, A, graph)
        }).toThrow(/point, a circle, an arc or a polygon/)
    })

    test('a wrong position still names the three kinds of values', () => {
        const {graph, A} = setup()

        expect(() => {
            applyOptions({label: option('A', 'xx')}, A, graph)
        }).toThrow(/figure/)
    })

    test('a label without >O has no reference, even after one', () => {
        const {graph, A} = setup()

        applyOptions({label: option('A', '>O')}, A, graph)
        applyOptions({label: option('A', 'tl')}, A, graph)

        expect(A.labelReference).toBeNull()
    })
})

describe('Draw options snap and snapRadius', () => {
    test('the figures named are given to the graph, with the radius', () => {
        const context = createContext()
        const B = new Point(context, 'B', {coordinates: {x: 3, y: 3}})
        const C = new Point(context, 'C', {coordinates: {x: 4, y: 4}})
        const {graph, point} = createPoint({B, C})
        const snap = vi.fn()
        Object.defineProperty(graph, 'snap', {value: snap})

        applyOptions({snap: option('B', 'C'), snapRadius: option(30)}, point, graph)

        expect(snap).toHaveBeenNthCalledWith(1, point, {figures: [B, C]})
        expect(snap).toHaveBeenNthCalledWith(2, point, {radius: 30})
    })

    test.each([['snap', 'Z'], ['snap', 3], ['snapRadius', 'a'], ['snapRadius', true]])('%s=%s is an OptionError', (key, value) => {
        const {graph, point} = createPoint()
        const snap = vi.fn()
        Object.defineProperty(graph, 'snap', {value: snap})

        expect(() => { applyOptions({[key]: option(value)}, point, graph) }).toThrow(OptionError)
        expect(snap).not.toHaveBeenCalled()
    })

    test.each(['snap', 'snapRadius'])('%s on a figure that is not a point is an OptionError', (key) => {
        const {graph, context} = createGraph()
        const line = new Line(context, 'd', {through: {A: new Point(context, 'A', {coordinates: {x: 0, y: 0}}), B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

        expect(() => { applyOptions({[key]: option(10)}, line, graph) }).toThrow(OptionError)
    })

    test('an error of the graph becomes an OptionError', () => {
        const {graph, point} = createPoint({})
        Object.defineProperty(graph, 'snap', {value: () => { throw new InvalidArgumentError('no') }})

        expect(() => { applyOptions({snapRadius: option(10)}, point, graph) }).toThrow(OptionError)
    })
})

describe('Draw options labelColor and labelFill', () => {
    test('labelColor is the color of the text of the label', () => {
        const {graph, point} = createPoint()

        applyOptions({label: option('A'), labelColor: option('red')}, point, graph)

        expect(point.label?.config.color).toBe('red')
    })

    test('labelFill is the background of the label, with an opacity or not', () => {
        const {graph, point} = createPoint()
        applyOptions({label: option('A'), labelFill: option('white', 0.8)}, point, graph)
        expect(point.label?.config.fill).toEqual({color: 'white', opacity: 0.8})

        const other = createPoint()
        applyOptions({label: option('A'), labelFill: option('white')}, other.point, other.graph)
        expect(other.point.label?.config.fill).toEqual({color: 'white', opacity: 1})
    })

    test('work before the label, and with tex', () => {
        const {graph, point} = createPoint()

        applyOptions({labelColor: option('red'), labelFill: option('white'), tex: option('x')}, point, graph)

        expect(point.label?.config.color).toBe('red')
        expect(point.label?.config.fill).toEqual({color: 'white', opacity: 1})
        expect(point.label?.asHtml).toBe(true)
    })

    test('are kept without a label, and draw nothing', () => {
        const {graph, point} = createPoint()

        applyOptions({labelColor: option('red')}, point, graph)

        expect(point.label).toBeNull()
    })

    test.each([
        ['labelColor', option('red', 0.5)],
        ['labelColor', option(true)],
        ['labelFill', option(true)],
        ['labelFill', option('white', 2)]
    ])('%s with an invalid value is an OptionError', (key, parameters) => {
        const {graph, point} = createPoint()

        expect(() => {
            applyOptions({label: option('A'), [key]: parameters}, point, graph)
        }).toThrow(OptionError)
    })
})
