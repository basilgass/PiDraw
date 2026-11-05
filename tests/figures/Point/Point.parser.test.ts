import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Line} from '../../../src/figures/Line/Line'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {OptionError, ParseError} from '../../../src/errors'
import {
    applyPointShapeOption,
    buildIntersection,
    buildPoint,
    parsePointShorthand
} from '../../../src/figures/Point/Point.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createAxes, createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 0, 0)
    const B = point('B', 2, 1)
    const C = point('C', 4, 3)
    const d = new Line(context, 'd', {through: {A, B}})
    const e = new Line(context, 'e', {through: {A: C, B}})
    const c = new Circle(context, 'c', {center: A, radius: 2})
    const c2 = new Circle(context, 'c2', {center: B, radius: 2})
    const f = new Plot(context, 'f', {expression: 'x^2'})

    const figures = {A, B, C, d, e, c, c2, f, ...createAxes(context)}
    const item = (key: string, values: unknown[], parameters: PARSER['parameters'] = {}) =>
        ({name: 'P', key, values, parameters}) as unknown as PARSER

    return {...figures, figures, item, context}
}

describe('buildPoint of a point given by its coordinates', () => {
    test('numbers are the coordinates', () => {
        const {item, figures} = create()

        expect(buildPoint(item('pt', [3, 4]), figures)).toEqual({create: 'point', config: {coordinates: {x: 3, y: 4}}})
    })

    test('the options of the line do not change the config of the point', () => {
        const {item, figures} = create()
        const parameters = {o: {value: 8, options: []}, color: {value: 'red', options: []}} as unknown as PARSER['parameters']

        expect(buildPoint(item('pt', [3, 4], parameters), figures).config).toEqual({coordinates: {x: 3, y: 4}})
    })

    test('A.x and A.y are the abscissa and the ordinate of a point', () => {
        const {item, figures, A, B} = create()

        expect(buildPoint(item('pt', ['A.y', 'B.x']), figures).config)
            .toEqual({coordinates: {x: {point: A, axis: 'y'}, y: {point: B, axis: 'x'}}})
    })

    test('A:B is the distance between two points', () => {
        const {item, figures, A, B} = create()

        expect(buildPoint(item('pt', ['A:B', 0]), figures).config)
            .toEqual({coordinates: {x: {point1: A, point2: B}, y: 0}})
    })

    test.each([
        ['a missing value', [3]],
        ['a third value, which is not supported', [3, 4, 5]],
        ['the name of a point alone', ['B', 3]],
        ['a point that does not exist', ['Z.x', 0]],
        ['an axis that does not exist', ['A.z', 0]],
        ['a distance to a point that does not exist', ['A:Z', 0]],
        ['text that is not a coordinate', ['abc', 0]],
        ['a value that is not a number', [true, 0]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildPoint(item('pt', values), figures)).toThrow(ParseError)
        expect(() => buildPoint(item('pt', values), figures)).toThrow(/"P".*pt/)
    })
})

describe('buildPoint of a point given by points and lines', () => {
    test('mid is the middle of two points', () => {
        const {item, figures, A, B} = create()

        expect(buildPoint(item('mid', ['A', 'B']), figures).config).toEqual({middle: {A, B}})
    })

    test.each([
        ['a line', 'd'],
        ['the axis Ox', 'Ox'],
        ['the axis Oy', 'Oy']
    ])('proj is the projection of a point on %s', (_, target) => {
        const {item, figures, A} = create()
        const axis = target in figures ? figures[target as keyof typeof figures] : target

        expect(buildPoint(item('proj', ['A', target]), figures).config).toEqual({projection: {point: A, axis}})
    })

    test.each([
        ['a point', 'C'],
        ['a line', 'd'],
        ['the axis Ox', 'Ox'],
        ['the axis Oy', 'Oy']
    ])('sym is the symmetric of a point about %s', (_, target) => {
        const {item, figures, A} = create()
        const center = target in figures ? figures[target as keyof typeof figures] : target

        expect(buildPoint(item('sym', ['A', target]), figures).config).toEqual({symmetry: {A, B: center}})
    })

    test('dpt moves a point along a line by a distance', () => {
        const {item, figures, A, d} = create()

        expect(buildPoint(item('dpt', ['A', 'd', 3]), figures).config)
            .toEqual({direction: {point: A, direction: d, distance: 3, perpendicular: false}})
    })

    test('dpt with a last * moves the point perpendicular to the line', () => {
        const {item, figures} = create()

        expect(buildPoint(item('dpt', ['A', 'Ox', 3, ALTERNATIVE]), figures).config)
            .toEqual({direction: expect.objectContaining({direction: figures.Ox, perpendicular: true}) as unknown})
    })

    test('vpt follows the vector AB from A, once, by default', () => {
        const {item, figures, A, B} = create()

        expect(buildPoint(item('vpt', ['A', 'B']), figures).config)
            .toEqual({direction: {point: A, direction: {A, B}, distance: 1}})
    })

    test('vpt can scale the vector and start from another point', () => {
        const {item, figures, A, B, C} = create()

        expect(buildPoint(item('vpt', ['A', 'B', 2, 'C']), figures).config)
            .toEqual({direction: {point: C, direction: {A, B}, distance: 2}})
    })

    test('eval is the point of a curve at an abscissa', () => {
        const {item, figures, f} = create()

        expect(buildPoint(item('eval', ['f', 2]), figures).config).toEqual({evaluation: {fx: f, x: 2}})
    })

    test('eval can take the abscissa of a point', () => {
        const {item, figures, f, A} = create()

        expect(buildPoint(item('eval', ['f', 'A.x']), figures).config)
            .toEqual({evaluation: {fx: f, x: {point: A, axis: 'x'}}})
    })

    test.each([
        ['mid with one point', 'mid', ['A']],
        ['mid with three points', 'mid', ['A', 'B', 'C']],
        ['mid with a number', 'mid', ['A', 3]],
        ['mid with a line', 'mid', ['A', 'd']],
        ['proj on a point', 'proj', ['A', 'B']],
        ['proj without a line', 'proj', ['A']],
        ['sym about a number', 'sym', ['A', 3]],
        ['sym of a line', 'sym', ['d', 'A']],
        ['dpt without a distance', 'dpt', ['A', 'd']],
        ['dpt with a distance that is not a number', 'dpt', ['A', 'd', 'far']],
        ['dpt along a point', 'dpt', ['A', 'B', 3]],
        ['dpt with five values', 'dpt', ['A', 'd', 3, ALTERNATIVE, ALTERNATIVE]],
        ['dpt with a fourth value that is a number', 'dpt', ['A', 'd', 3, 1]],
        ['dpt with a fourth value that is text', 'dpt', ['A', 'd', 3, 'perp']],
        ['dpt with a fourth value that is true', 'dpt', ['A', 'd', 3, true]],
        ['vpt with one point', 'vpt', ['A']],
        ['vpt with a scale that is not a number', 'vpt', ['A', 'B', 'big']],
        ['vpt from something that is not a point', 'vpt', ['A', 'B', 2, 'd']],
        ['eval of something that is not a curve', 'eval', ['A', 2]],
        ['eval without an abscissa', 'eval', ['f']],
        ['eval at an abscissa that is not valid', 'eval', ['f', 'abc']],
        ['a key that is not a point', 'line', ['A', 'B']]
    ])('%s is a ParseError that names the line', (_, key, values) => {
        const {item, figures} = create()

        expect(() => buildPoint(item(key, values), figures)).toThrow(ParseError)
        expect(() => buildPoint(item(key, values), figures)).toThrow(/"P"/)
    })
})

describe('buildIntersection', () => {
    test('of two lines is one point', () => {
        const {item, figures, d, e} = create()

        expect(buildIntersection(item('inter', ['d', 'e']), figures).map(b => b.config))
            .toEqual([{intersection: {A: d, B: e}}])
    })

    test('of a line and an axis, or of two axes, is one point', () => {
        const {item, figures, d} = create()

        expect(buildIntersection(item('inter', ['d', 'Ox']), figures).map(b => b.config))
            .toEqual([{intersection: {A: d, B: figures.Ox}}])
        expect(buildIntersection(item('inter', ['Ox', 'Oy']), figures).map(b => b.config))
            .toEqual([{intersection: {A: figures.Ox, B: figures.Oy}}])
    })

    test('of a circle and an axis is two points, like a circle and a line', () => {
        const {item, figures, c} = create()

        expect(buildIntersection(item('inter', ['c', 'Ox']), figures).map(b => b.config))
            .toEqual([{intersectionWithCircle: {A: c, B: figures.Ox, index: 0}}, {intersectionWithCircle: {A: c, B: figures.Ox, index: 1}}])
    })

    test.each([
        ['a circle and a line', ['c', 'd']],
        ['a line and a circle', ['d', 'c']]
    ])('of %s is two points, by index', (_, values) => {
        const {item, figures, c, d} = create()

        const results = buildIntersection(item('inter', values), figures)

        expect(results.map(b => b.create)).toEqual(['point', 'point'])
        expect(results.map(b => b.config)).toEqual([
            {intersectionWithCircle: {A: c, B: d, index: 0}},
            {intersectionWithCircle: {A: c, B: d, index: 1}}
        ])
    })

    test('of two circles is two points, by index', () => {
        const {item, figures, c, c2} = create()

        expect(buildIntersection(item('inter', ['c', 'c2']), figures).map(b => b.config)).toEqual([
            {intersectionBetweenCircles: {A: c, B: c2, index: 0}},
            {intersectionBetweenCircles: {A: c, B: c2, index: 1}}
        ])
    })

    test.each([
        ['one figure', ['d']],
        ['three figures', ['d', 'e', 'c']],
        ['a point', ['d', 'A']],
        ['a number', ['d', 3]],
        ['a curve', ['f', 'd']]
    ])('of %s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildIntersection(item('inter', values), figures)).toThrow(ParseError)
        expect(() => buildIntersection(item('inter', values), figures)).toThrow(/"P"/)
    })
})

describe('applyPointShapeOption', () => {
    test.each([
        ['o', 'circle', 5],
        ['s', 'square', 10],
        ['*', 'crosshair', 10]
    ] as const)('%s without a value is a %s of the default size', (key, shape, size) => {
        const {A} = create()

        applyPointShapeOption(A, key, true)

        expect(A.config.shape).toBe(shape)
        expect(A.size).toBe(size)
    })

    test.each([
        ['o', 'circle'],
        ['s', 'square'],
        ['*', 'crosshair']
    ] as const)('%s with a number is a %s of that size', (key, shape) => {
        const {A} = create()

        applyPointShapeOption(A, key, 8)

        expect(A.config.shape).toBe(shape)
        expect(A.size).toBe(8)
    })

    test.each([
        ['text', 'big'],
        ['zero', 0],
        ['a negative number', -2],
        ['not a number', NaN]
    ])('%s as a size is an OptionError that names the option', (_, value) => {
        const {A} = create()

        expect(() => {
            applyPointShapeOption(A, 's', value)
        }).toThrow(OptionError)
        expect(() => {
            applyPointShapeOption(A, 's', value)
        }).toThrow(/"s"/)
        expect(A.config.shape).toBe('circle')
    })

    test('an OptionError is a ParseError and holds the name of the option', () => {
        const {A} = create()

        try {
            applyPointShapeOption(A, '*', 'big')
            expect.unreachable('the option is not valid')
        } catch (error) {
            expect(error).toBeInstanceOf(ParseError)
            expect((error as OptionError).option).toBe('*')
        }
    })

    test('a figure that is not a point has no shape: OptionError', () => {
        const {d} = create()

        expect(() => {
            applyPointShapeOption(d, 'o', true)
        }).toThrow(OptionError)
    })
})

describe('parsePointShorthand', () => {
    test.each([
        ['A(3,4)', 'A=pt 3,4'],
        ['B1(-1,2)', 'B1=pt -1,2'],
        ['A(A.x,0)', 'A=pt A.x,0'],
        ['C(3, 4)', 'C=pt 3,4'],
        ['A(1,2,3)', 'A=pt 1,2,3'],
        ['A()', 'A=pt ']
    ])('%s is %s', (shorthand, expected) => {
        expect(parsePointShorthand(shorthand)).toBe(expected)
    })

    test.each([
        ['a point with its key', 'A=pt 3,4'],
        ['a line', 'd=AB'],
        ['a function', 'f(x)=x^2'],
        ['a lower case name', 'a(3,4)'],
        ['text', 'hello']
    ])('%s is not a shorthand: null', (_, text) => {
        expect(parsePointShorthand(text)).toBeNull()
    })
})
