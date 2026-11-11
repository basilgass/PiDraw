import {describe, expect, test} from 'vitest'
import {Point} from '../../../src/figures/Point/Point'
import type {IPointConfig, IPointOptions} from '../../../src/figures/Point/Point.types'
import {Line} from '../../../src/figures/Line/Line'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Plot} from '../../../src/figures/Plot/Plot'
import {InvalidArgumentError} from '../../../src/errors'
import type {IGraphConfig} from '../../../src/pidraw.common'
import {createAxes, createContext, graphConfig} from '../../helpers/figure'

function createPoints() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    return {A: point('A', 0, 0), B: point('B', 2, 1), C: point('C', 4, 3)}
}

// The figures of a drawing, with a point at each coordinates given in units of the coordinate system.
function createDrawing(config?: IGraphConfig) {
    const context = createContext(config)
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const through = (name: string, A: Point, B: Point) => new Line(context, name, {through: {A, B}})
    const from = (name: string, values: IPointConfig) => new Point(context, name, values)
    const circle = (name: string, center: Point, radius: number) => new Circle(context, name, {center, radius})

    return {context, point, through, from, circle, axes: createAxes(context)}
}

// Where the point is, in units of the coordinate system and not in pixels.
function at(point: Point) {
    return {x: point.coordinates.x, y: point.coordinates.y}
}

function expectAt(point: Point, x: number, y: number) {
    expect(point.coordinates.x).toBeCloseTo(x, 8)
    expect(point.coordinates.y).toBeCloseTo(y, 8)
}

describe('Point coordinates', () => {
    test('numbers are the coordinates of the point, converted to pixels', () => {
        const {point} = createDrawing()
        const A = point('A', 3, 4)

        expect(A.pixels).toEqual({x: 550, y: 100})
        expect(at(A)).toEqual({x: 3, y: 4})
    })

    test('a coordinate can be the abscissa or the ordinate of another point', () => {
        const {point, from} = createDrawing()
        const A = point('A', 1, 2)
        const B = from('B', {coordinates: {x: {point: A, axis: 'y'}, y: {point: A, axis: 'x'}}})

        expectAt(B, 2, 1)
    })

    test('a coordinate can be the distance between two points', () => {
        const {point, from} = createDrawing()
        const A = point('A', 0, 0)
        const B = point('B', 3, 4)
        const C = from('C', {coordinates: {x: {point1: A, point2: B}, y: 0}})

        expectAt(C, 5, 0)
    })

    test('the point follows the points its coordinates depend on', () => {
        const {point, from} = createDrawing()
        const A = point('A', 1, 2)
        const B = from('B', {coordinates: {x: {point: A, axis: 'x'}, y: 0}})

        A.pixels = {x: 450, y: 300}
        B.update(true)

        expectAt(B, 1, 0)
    })
})

describe('Point middle', () => {
    test('is the middle of two points', () => {
        const {point, from} = createDrawing()
        const M = from('M', {middle: {A: point('A', 0, 0), B: point('B', 4, 2)}})

        expectAt(M, 2, 1)
    })
})

describe('Point projection', () => {
    test.each([
        ['Ox', 3, 0],
        ['Oy', 0, 4]
    ] as const)('on the axis %s keeps the other coordinate at the origin', (axis, x, y) => {
        const {point, from, axes} = createDrawing()
        const P = from('P', {projection: {point: point('A', 3, 4), axis: axes[axis]}})

        expectAt(P, x, y)
    })

    test('on a line is the foot of the perpendicular', () => {
        const {point, through, from} = createDrawing()
        const line = through('d', point('A', 0, 0), point('B', 4, 4))
        const P = from('P', {projection: {point: point('C', 4, 0), axis: line}})

        expectAt(P, 2, 2)
    })
})

describe('Point symmetry', () => {
    test.each([
        ['a point', (d: ReturnType<typeof createDrawing>) => d.point('B', 3, 3), 5, 4],
        ['the axis Ox', (d: ReturnType<typeof createDrawing>) => d.axes.Ox, 1, -2],
        ['the axis Oy', (d: ReturnType<typeof createDrawing>) => d.axes.Oy, -1, 2],
        ['a line', (d: ReturnType<typeof createDrawing>) => d.through('d', d.point('B', 0, 0), d.point('C', 4, 4)), 2, 1]
    ])('about %s', (_, center, x, y) => {
        const drawing = createDrawing()
        const A = drawing.point('A', 1, 2)
        const S = drawing.from('S', {symmetry: {A, B: center(drawing)}})

        expectAt(S, x, y)
    })
})

describe('Point direction', () => {
    test('along the axis Ox, by a distance in units', () => {
        const {point, from, axes} = createDrawing()
        const P = from('P', {direction: {point: point('A', 1, 1), direction: axes.Ox, distance: 2}})

        expectAt(P, 3, 1)
    })

    test('along the axis Oy, by a distance in units, going up', () => {
        const {point, from, axes} = createDrawing()
        const P = from('P', {direction: {point: point('A', 1, 1), direction: axes.Oy, distance: 2}})

        expectAt(P, 1, 3)
    })

    test('along the axis Oy, by a distance in units of the y axis', () => {
        const {point, from, axes} = createDrawing(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 0, y: -25}}}))
        const P = from('P', {direction: {point: point('A', 1, 1), direction: axes.Oy, distance: 2}})

        expectAt(P, 1, 3)
    })

    test('along a line, by a distance in units', () => {
        const {point, through, from} = createDrawing()
        const line = through('d', point('B', 0, 0), point('C', 2, 2))
        const P = from('P', {direction: {point: point('A', 0, 0), direction: line, distance: Math.SQRT2}})

        expectAt(P, 1, 1)
    })

    test('perpendicular to a line, by a distance in units', () => {
        const {point, through, from} = createDrawing()
        const line = through('d', point('B', 0, 0), point('C', 2, 2))
        const P = from('P', {direction: {point: point('A', 0, 0), direction: line, distance: Math.SQRT2, perpendicular: true}})

        expect(Math.abs(P.coordinates.x)).toBeCloseTo(1, 8)
        expect(P.coordinates.x).toBeCloseTo(-P.coordinates.y, 8)
    })

    test('along a vector, by a factor of the vector', () => {
        const {point, from} = createDrawing()
        const P = from('P', {
            direction: {
                point: point('P0', 1, 1),
                direction: {A: point('A', 0, 0), B: point('B', 1, 2)},
                distance: 2
            }
        })

        expectAt(P, 3, 5)
    })
})

describe('Point evaluation', () => {
    test('is the point of a curve at an abscissa', () => {
        const {context, from} = createDrawing()
        const fx = new Plot(context, 'f', {expression: 'x^2'})
        const P = from('P', {evaluation: {fx, x: 3}})

        expectAt(P, 3, 9)
    })

    test('can take the abscissa of another point', () => {
        const {context, point, from} = createDrawing()
        const fx = new Plot(context, 'f', {expression: '2*x'})
        const P = from('P', {evaluation: {fx, x: {point: point('A', 4, 0), axis: 'x'}}})

        expectAt(P, 4, 8)
    })
})

describe('Point constraint', () => {
    test('a point has exactly one constraint', () => {
        const {point, context} = createDrawing()
        const A = point('A', 0, 0)

        expect(() => new Point(context, 'P', {} as IPointConfig)).toThrow(InvalidArgumentError)
        expect(() => new Point(context, 'P', {coordinates: {x: 0, y: 0}, middle: {A, B: A}} as unknown as IPointConfig))
            .toThrow(InvalidArgumentError)
    })

    test('the compiler refuses a config that mixes constraints or holds none', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        // @ts-expect-error a point has exactly one constraint
        const mixed: IPointConfig = {coordinates: {x: 0, y: 0}, middle: {A, B: A}}
        // @ts-expect-error a point has at least one constraint
        const empty: IPointConfig = {}

        expect([mixed, empty]).toHaveLength(2)
    })

    test('the error names the point', () => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {} as IPointConfig)).toThrow(/"P"/)
    })
})

// A point that has no position is not drawn: the group of the point is hidden, apart from `display` that `hide()` uses.
function expectUndefined(point: Point) {
    expect(point.pixels.x).toBeNaN()
    expect(point.pixels.y).toBeNaN()
    expect(point.element.attr('visibility')).toBe('hidden')
}

function expectDefined(point: Point) {
    expect(Number.isFinite(point.pixels.x)).toBe(true)
    expect(point.element.attr('visibility')).toBeFalsy()
}

describe('Point intersection', () => {
    test('of two lines is their common point', () => {
        const {point, through, from} = createDrawing()
        const d1 = through('d1', point('A', 0, 0), point('B', 2, 2))
        const d2 = through('d2', point('C', 0, 2), point('D', 2, 0))
        const P = from('P', {intersection: {A: d1, B: d2}})

        expectAt(P, 1, 1)
        expectDefined(P)
    })

    test.each([
        ['Ox', 1, 0],
        ['Oy', 0, -1]
    ] as const)('of a line and the axis %s', (axis, x, y) => {
        const {point, through, from, axes} = createDrawing()
        const line = through('d', point('A', 0, -1), point('B', 2, 1))
        const P = from('P', {intersection: {A: line, B: axes[axis]}})

        expectAt(P, x, y)
    })

    test('of the two axes is the origin', () => {
        const {from, axes} = createDrawing()
        const P = from('P', {intersection: {A: axes.Ox, B: axes.Oy}})

        expectAt(P, 0, 0)
    })

    test('of two parallel lines does not exist', () => {
        const {point, through, from} = createDrawing()
        const d1 = through('d1', point('A', 0, 0), point('B', 1, 1))
        const d2 = through('d2', point('C', 0, 1), point('D', 1, 2))
        const P = from('P', {intersection: {A: d1, B: d2}})

        expectUndefined(P)
    })

    test('of an axis and itself does not exist', () => {
        const {from, axes} = createDrawing()

        expectUndefined(from('P', {intersection: {A: axes.Ox, B: axes.Ox}}))
    })
})

describe('Point built from axes that are not orthogonal', () => {
    // The y axis goes up and to the right: a unit of it is (25, -50) on the screen.
    const sheared = () => createDrawing(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}}))

    test('the intersection of a line and the y axis is on the y axis', () => {
        const {point, through, from, axes} = sheared()
        const line = through('d', point('A', -3, 2), point('B', 3, 2))
        const P = from('P', {intersection: {A: line, B: axes.Oy}})

        // The y axis passes by the origin with the direction (25, -50): at the height 2 units, it is at (50, -100) from the origin.
        expect(P.pixels.x).toBeCloseTo(400 + 50, 6)
        expect(P.pixels.y).toBeCloseTo(300 - 100, 6)
    })

    test('the projection on the y axis is the foot of the perpendicular on the line, not on the vertical', () => {
        const {point, from, axes} = sheared()
        const P = from('P', {projection: {point: point('A', 2, 0), axis: axes.Oy}})
        const foot = {x: P.pixels.x - 400, y: P.pixels.y - 300}

        // On the axis, and the vector to the point is perpendicular to it.
        expect(foot.x * -50 - foot.y * 25).toBeCloseTo(0, 6)
        expect((P.pixels.x - 500) * 25 + (P.pixels.y - 300) * -50).toBeCloseTo(0, 6)
    })

    test('the symmetric about the y axis keeps the distance to the axis', () => {
        const {point, from, axes} = sheared()
        const A = point('A', 2, 0)
        const S = from('S', {symmetry: {A, B: axes.Oy}})

        expect((S.pixels.x + A.pixels.x) / 2 - 400).toBeCloseTo(((S.pixels.y + A.pixels.y) / 2 - 300) * -0.5, 6)
    })

    test('moving along the y axis follows its direction, by its own unit', () => {
        const {point, from, axes} = sheared()
        const P = from('P', {direction: {point: point('A', 0, 0), direction: axes.Oy, distance: 2}})

        expect(P.pixels.x).toBeCloseTo(400 + 2 * 25, 6)
        expect(P.pixels.y).toBeCloseTo(300 - 2 * 50, 6)
    })

    test('the two axes meet at the origin', () => {
        const {from, axes} = sheared()
        const P = from('P', {intersection: {A: axes.Ox, B: axes.Oy}})

        expect(P.pixels.x).toBeCloseTo(400, 6)
        expect(P.pixels.y).toBeCloseTo(300, 6)
    })
})

describe('Point intersection with a circle', () => {
    test('of a circle and a line gives the two points, by index', () => {
        const {point, through, circle, from} = createDrawing()
        const c = circle('c', point('O', 0, 0), 2)
        const line = through('d', point('A', -3, 0), point('B', 3, 0))
        const first = from('P0', {intersectionWithCircle: {A: c, B: line, index: 0}})
        const second = from('P1', {intersectionWithCircle: {A: c, B: line, index: 1}})

        expectAt(first, -2, 0)
        expectAt(second, 2, 0)
    })

    test('of a circle and a line that does not touch it does not exist', () => {
        const {point, through, circle, from} = createDrawing()
        const c = circle('c', point('O', 0, 0), 2)
        const line = through('d', point('A', -3, 5), point('B', 3, 5))

        expectUndefined(from('P', {intersectionWithCircle: {A: c, B: line, index: 0}}))
    })

    test('of two circles gives the two points, by index', () => {
        const {point, circle, from} = createDrawing()
        const c1 = circle('c1', point('O1', 0, 0), 5)
        const c2 = circle('c2', point('O2', 6, 0), 5)
        const first = from('P0', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}})
        const second = from('P1', {intersectionBetweenCircles: {A: c1, B: c2, index: 1}})

        expect(first.coordinates.x).toBeCloseTo(3, 8)
        expect(second.coordinates.x).toBeCloseTo(3, 8)
        expect([first.coordinates.y, second.coordinates.y].sort((a, b) => a - b)[0]).toBeCloseTo(-4, 8)
        expect([first.coordinates.y, second.coordinates.y].sort((a, b) => a - b)[1]).toBeCloseTo(4, 8)
    })

    test('of two circles that do not touch does not exist', () => {
        const {point, circle, from} = createDrawing()
        const c1 = circle('c1', point('O1', 0, 0), 2)
        const c2 = circle('c2', point('O2', 10, 0), 2)

        expectUndefined(from('P', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}}))
    })

    test('of two circles that touch has one point: the second one does not exist', () => {
        const {point, circle, from} = createDrawing()
        const c1 = circle('c1', point('O1', 0, 0), 2)
        const c2 = circle('c2', point('O2', 4, 0), 2)
        const first = from('P0', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}})
        const second = from('P1', {intersectionBetweenCircles: {A: c1, B: c2, index: 1}})

        expectAt(first, 2, 0)
        expectUndefined(second)
    })

    test('appears again when the circles cross again', () => {
        const {point, circle, from} = createDrawing()
        const center = point('O2', 10, 0)
        const c1 = circle('c1', point('O1', 0, 0), 2)
        const c2 = circle('c2', center, 2)
        const P = from('P', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}})

        expectUndefined(P)

        // The circle follows its center first, then the point that depends on the circle.
        center.pixels = {x: 400 + 3 * 50, y: 300}
        c2.update(true)
        P.update(true)

        expectDefined(P)
        expect(P.coordinates.x).toBeCloseTo(1.5, 8)
    })
})

describe('Point without a position', () => {
    test('leaves its shape where it was: no NaN is written in the svg', () => {
        const {point, circle, from} = createDrawing()
        const center = point('O2', 3, 0)
        const c1 = circle('c1', point('O1', 0, 0), 2)
        const c2 = circle('c2', center, 2)
        const P = from('P', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}})
        const before = {cx: +P.shape.attr('cx'), cy: +P.shape.attr('cy')}

        center.pixels = {x: 400 + 10 * 50, y: 300}
        c2.update(true)
        P.update(true)

        expectUndefined(P)
        expect(Number.isFinite(before.cx)).toBe(true)
        expect(+P.shape.attr('cx')).toBe(before.cx)
        expect(+P.shape.attr('cy')).toBe(before.cy)
    })

    test('is hidden whatever its constraint, as a function that is not defined', () => {
        const {context, from} = createDrawing()
        const fx = new Plot(context, 'f', {expression: 'sqrt(x)'})
        const defined = from('P', {evaluation: {fx, x: 4}})
        const undefinedPoint = from('Q', {evaluation: {fx, x: -1}})

        expectAt(defined, 4, 2)
        expectDefined(defined)
        expectUndefined(undefinedPoint)
    })

    test('does not undo a hide() asked on the point when its position comes back', () => {
        const {point, circle, from} = createDrawing()
        const center = point('O2', 3, 0)
        const c1 = circle('c1', point('O1', 0, 0), 2)
        const c2 = circle('c2', center, 2)
        const P = from('P', {intersectionBetweenCircles: {A: c1, B: c2, index: 0}})

        P.hide()
        P.update(true)

        expect(P.element.css('display')).toBe('none')
        expectDefined(P)
    })
})

describe('Point pixels', () => {
    const centerOf = (point: Point) => ({cx: +point.shape.attr('cx'), cy: +point.shape.attr('cy')})

    test('assigning pixels moves the shape', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        A.pixels = {x: 550, y: 100}

        expect(centerOf(A)).toEqual({cx: 550, cy: 100})
        expect(at(A)).toEqual({x: 3, y: 4})
    })

    test('assigning x or y moves the shape along that coordinate only', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        A.x = 450
        expect(centerOf(A)).toEqual({cx: 450, cy: 300})

        A.y = 200
        expect(centerOf(A)).toEqual({cx: 450, cy: 200})
        expect(A.pixels).toEqual({x: 450, y: 200})
    })

    test('a square is centered on the point too', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0).asSquare(10)

        A.pixels = {x: 500, y: 200}

        expect([+A.shape.attr('x'), +A.shape.attr('y')]).toEqual([495, 195])
    })

    test('the position is a copy: changing the object that was given does not move the point', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)
        const value = {x: 450, y: 300}

        A.pixels = value
        value.x = 0

        expect(A.x).toBe(450)
        expect(centerOf(A).cx).toBe(450)
    })

    test('two points that take the position of one another do not move together', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)
        const B = point('B', 1, 1)

        B.pixels = A.pixels
        B.x = 0
        B.y = 0

        expect(A.pixels).toEqual({x: 400, y: 300})
        expect(B.pixels).toEqual({x: 0, y: 0})
    })

    test('the position cannot be changed in place', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        expect(() => {
            (A.pixels as { x: number }).x = 5
        }).toThrow(TypeError)
        expect(A.x).toBe(400)
    })

    test('a position that is not finite hides the point, and a finite one shows it again', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        A.x = NaN
        expect(A.element.attr('visibility')).toBe('hidden')

        A.x = 450
        expect(A.element.attr('visibility')).toBeFalsy()
    })

    test('a position that is not finite leaves the shape where it was', () => {
        const {point} = createDrawing()
        const A = point('A', 0, 0)

        A.y = NaN

        expect(centerOf(A)).toEqual({cx: 400, cy: 300})
    })
})

describe('Point shape', () => {
    // A point at the center of the svg (400, 300), with the given shape and size.
    function create(options: IPointOptions = {}) {
        const {from} = createDrawing()

        return from('P', {coordinates: {x: 0, y: 0}, ...options})
    }

    // The box of the shape, as [left, top, width, height].
    const boxOf = (point: Point) => {
        const {x, y, width, height} = point.shape.bbox()
        return [x, y, width, height].map(v => Math.round(v * 1000) / 1000)
    }

    test('a circle has the size for diameter, centered on the point', () => {
        const P = create({shape: 'circle', size: 8})

        expect([+P.shape.attr('r'), +P.shape.attr('cx'), +P.shape.attr('cy')]).toEqual([4, 400, 300])
    })

    test('a square has the size for side, centered on the point', () => {
        const P = create({shape: 'square', size: 12})

        expect([+P.shape.attr('width'), +P.shape.attr('height'), +P.shape.attr('x'), +P.shape.attr('y')]).toEqual([12, 12, 394, 294])
    })

    test('a crosshair fits in a square of the size, centered on the point', () => {
        const P = create({shape: 'crosshair', size: 12})

        expect(boxOf(P)).toEqual([394, 294, 12, 12])
    })

    test.each([
        ['circle', 'r', 2.5],
        ['square', 'width', 10]
    ] as const)('a %s without a size has the default one', (shape, attribute, expected) => {
        expect(+create({shape}).shape.attr(attribute)).toBe(expected)
    })

    test('a crosshair without a size has the default one', () => {
        expect(boxOf(create({shape: 'crosshair'}))).toEqual([395, 295, 10, 10])
    })

    test('a point without options is a circle of diameter 5', () => {
        const P = create()

        expect(P.config.shape).toBe('circle')
        expect(P.size).toBe(5)
        expect(+P.shape.attr('r')).toBe(2.5)
    })

    test.each([
        ['asCircle', 'circle', 5],
        ['asSquare', 'square', 10],
        ['asCrosshair', 'crosshair', 10]
    ] as const)('%s without a size takes the default size of the shape', (method, shape, size) => {
        const P = create({shape: shape === 'circle' ? 'square' : 'circle', size: 7})

        P[method]()

        expect(P.config.shape).toBe(shape)
        expect(P.size).toBe(size)
    })

    test('asSquare with a size draws a square of that side, and keeps the fill and the stroke', () => {
        const P = create().fill('red').stroke('blue', 3)

        P.asSquare(20)

        expect([+P.shape.attr('width'), P.shape.attr('fill'), P.shape.attr('stroke'), +P.shape.attr('stroke-width')])
            .toEqual([20, 'red', 'blue', 3])
    })

    test('changing the size draws the shape again', () => {
        const P = create({shape: 'square', size: 10})

        P.size = 20

        expect(P.size).toBe(20)
        expect(+P.shape.attr('width')).toBe(20)
    })

    test('a new config has the default shape and size when it gives none, and puts the point at its new place', () => {
        const P = create({shape: 'square', size: 30})

        P.config = {coordinates: {x: 1, y: 1}}

        expect(P.config.shape).toBe('circle')
        expect(+P.shape.attr('r')).toBe(2.5)
        expectAt(P, 1, 1)
        expect([+P.shape.attr('cx'), +P.shape.attr('cy')]).toEqual([450, 250])
    })

    test('a new config with a shape and a size uses them', () => {
        const P = create()

        P.config = {coordinates: {x: 0, y: 0}, shape: 'square', size: 14}

        expect(+P.shape.attr('width')).toBe(14)
    })
})

describe('Point shape and size that are not valid', () => {
    const failures: [string, (point: Point) => void][] = [
        ['the size setter', (P) => {
            P.size = -1
        }],
        ['asCircle', (P) => {
            P.asCircle(0)
        }],
        ['asSquare', (P) => {
            P.asSquare(NaN)
        }],
        ['asCrosshair', (P) => {
            P.asCrosshair(Infinity)
        }],
        ['the config setter', (P) => {
            P.config = {coordinates: {x: 0, y: 0}, size: 0}
        }]
    ]

    test.each(failures)('%s refuses it and leaves the point as it was', (_, change) => {
        const {from} = createDrawing()
        const P = from('P', {coordinates: {x: 0, y: 0}, shape: 'square', size: 10})

        expect(() => {
            change(P)
        }).toThrow(InvalidArgumentError)
        expect(() => {
            change(P)
        }).toThrow(/"P"/)
        expect(P.config.shape).toBe('square')
        expect(P.size).toBe(10)
        expect(+P.shape.attr('width')).toBe(10)
    })

    test.each([0, -3, NaN, Infinity])('the constructor refuses the size %s', (size) => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {coordinates: {x: 0, y: 0}, size})).toThrow(InvalidArgumentError)
    })

    test('the constructor refuses a shape that does not exist', () => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {coordinates: {x: 0, y: 0}, shape: 'triangle' as never})).toThrow(InvalidArgumentError)
    })

    test('a point that is refused leaves nothing in the svg', () => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {coordinates: {x: 0, y: 0}, size: -1})).toThrow()
        expect(context.rootSVG.findOne('#P')).toBeNull()
    })
})

describe('Point label', () => {
    test('shows the coordinates in units of the coordinate system, 2 decimals by default', () => {
        const {point} = createDrawing()
        const A = point('A', 1, 2)

        A.addLabel(['A', {field: 'coordinates', digits: 2}])

        expect(A.label?.displayName).toBe('A(1;2)')
    })

    test('follows the point when it moves, as when it is dragged or animated', () => {
        const {point} = createDrawing()
        const A = point('A', 1, 2)
        A.addLabel(['A', {field: 'coordinates', digits: 2}])

        A.pixels = {x: 400 + 1.23456 * 50, y: 300 - 5 * 50}
        A.updateLabel()

        expect(A.label?.displayName).toBe('A(1.23;5)')
    })

    test('writes the number of decimals that is asked', () => {
        const {point} = createDrawing()
        const A = point('A', 1.23456, 0)
        A.addLabel(['A', {field: 'coordinates', digits: 3}])

        expect(A.label?.displayName).toBe('A(1.235;0)')
    })

    test('cannot show the length of a segment', () => {
        const {point} = createDrawing()

        expect(() => point('A', 0, 0).addLabel([{field: 'length', digits: 2}])).toThrow(InvalidArgumentError)
    })
})

describe('Point construction that fails', () => {
    test('a coordinate that is neither a number nor a reference to a point is an InvalidArgumentError', () => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {coordinates: {x: {} as never, y: 0}})).toThrow(InvalidArgumentError)
    })

    test('leaves nothing in the svg', () => {
        const {context} = createDrawing()

        expect(() => new Point(context, 'P', {coordinates: {x: {} as never, y: 0}})).toThrow()
        expect(context.rootSVG.findOne('#P')).toBeNull()
    })

    test('a new config that cannot be resolved leaves the point as it was', () => {
        const {point} = createDrawing()
        const A = point('A', 1, 2)

        expect(() => {
            A.config = {coordinates: {x: {} as never, y: 0}}
        }).toThrow(InvalidArgumentError)

        expectAt(A, 1, 2)
        A.update(true)
        expectAt(A, 1, 2)
    })
})

describe('Point tikz', () => {
    const create = (options: IPointOptions = {}) => {
        const {from} = createDrawing()

        return from('A', {coordinates: {x: 1, y: 2}, ...options})
    }
    const style = 'draw=black, line width=0.75pt'

    test('a circle is drawn with its radius in points', () => {
        expect(create().tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=1.875pt];`)
    })

    test('a square is drawn around the point', () => {
        expect(create({shape: 'square'}).tikz())
            .toBe(`\\draw[${style}] (1,2) +(-3.75pt,-3.75pt) rectangle +(3.75pt,3.75pt);`)
    })

    test('a crosshair is drawn as two segments across the point', () => {
        expect(create({shape: 'crosshair'}).tikz())
            .toBe(`\\draw[${style}] (1,2) +(-3.75pt,-3.75pt) -- +(3.75pt,3.75pt) (1,2) +(-3.75pt,3.75pt) -- +(3.75pt,-3.75pt);`)
    })

    test('the size is the box of the shape, in points', () => {
        expect(create({size: 20}).tikz()).toContain('circle[radius=7.5pt]')
    })

    test('the appearance of the point is written as options', () => {
        const tikz = create().fill({color: 'red', opacity: 0.5}).stroke('blue', 2).dash('4 2').tikz()

        expect(tikz).toContain('draw=pidraw-blue, line width=1.5pt, fill=pidraw-red, fill opacity=0.5, dash pattern=on 3pt off 1.5pt')
    })

    test('a point without a fill is not filled, like in the drawing', () => {
        expect(create().tikz()).not.toContain('fill')
    })

    test('a color that has no equivalent in LaTeX is an InvalidArgumentError', () => {
        const point = create().fill('periwinkle')

        expect(() => point.tikz()).toThrow(InvalidArgumentError)
    })

    test('follows the point when it moves', () => {
        const point = create()

        point.pixels = {x: 400 + 1.23456 * 50, y: 300 - 5 * 50}

        expect(point.tikz()).toContain('(1.23456,5)')
    })

    test('the label is a node after the shape, with the current text of its fields', () => {
        const point = create()
        point.addLabel(['A', {field: 'coordinates', digits: 1}])

        expect(point.tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=1.875pt];\n\\node[below right] at (1,2) {A(1;2)};`)
    })

    test('a point that is hidden is not written', () => {
        const point = create()
        point.addLabel('A')
        point.hide()

        expect(point.tikz()).toBe('')
    })

    test('a point whose shape is hidden keeps its label only', () => {
        const point = create()
        point.addLabel('A')
        point.shape.hide()

        expect(point.tikz()).toBe('\\node[below right] at (1,2) {A};')
    })

    test('a point whose label is hidden keeps its shape only', () => {
        const point = create()
        point.addLabel('A').hide()

        expect(point.tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=1.875pt];`)
    })

    test('a point that has no position is not written, label included', () => {
        const {point, through, from} = createDrawing()
        const d1 = through('d1', point('A', 0, 0), point('B', 1, 1))
        const d2 = through('d2', point('C', 0, 1), point('D', 1, 2))
        const P = from('P', {intersection: {A: d1, B: d2}})
        P.addLabel('P')

        expect(P.tikz()).toBe('')
    })
})

describe('Point moved', () => {
    test('a point at the place of its constraint is not moved', () => {
        const {A} = createPoints()

        expect(A.isMoved()).toBe(false)
    })

    test('a point that was put elsewhere (dragged, animated) is moved', () => {
        const {A} = createPoints()

        A.pixels = {x: A.pixels.x + 40, y: A.pixels.y}

        expect(A.isMoved()).toBe(true)
    })

    test('a point put back at the place of its constraint is not moved', () => {
        const {A} = createPoints()
        const place = A.pixels

        A.pixels = {x: place.x + 40, y: place.y}
        A.pixels = place

        expect(A.isMoved()).toBe(false)
    })

    test('a point is moved from the place of its own constraint: the middle of two points, once it was moved, is', () => {
        const {point, from} = createDrawing()
        const M = from('M', {middle: {A: point('A', 0, 0), B: point('B', 4, 2)}})
        expect(M.isMoved()).toBe(false)

        M.pixels = {x: M.pixels.x, y: M.pixels.y + 10}

        expect(M.isMoved()).toBe(true)
    })

    test('a point that follows its constraint again after computed() is not moved', () => {
        const {A} = createPoints()
        A.pixels = {x: A.pixels.x + 40, y: A.pixels.y}

        A.computed()

        expect(A.isMoved()).toBe(false)
    })

    test('a rounding of the calculation is not a move', () => {
        const {A} = createPoints()

        A.pixels = {x: A.pixels.x + 1e-9, y: A.pixels.y - 1e-9}

        expect(A.isMoved()).toBe(false)
    })
})

describe('Point as a figure to snap to', () => {
    test('is attracted to its position', () => {
        const {point} = createDrawing()
        const A = point('A', 1, 2)

        expect(A.snappable).toBe(true)
        expect(A.snapPoints()).toEqual([{x: 450, y: 200}])
    })

    test('attracts nowhere without a position', () => {
        const {from} = createDrawing()
        const fx = new Plot(createContext(), 'f', {expression: 'sqrt(x)'})

        expect(from('Q', {evaluation: {fx, x: -1}}).snapPoints()).toEqual([])
    })
})
