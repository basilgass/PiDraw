import {describe, expect, test} from 'vitest'
import {Line} from '../../../src/figures/Line/Line'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import type {ILineConfig, ILineType} from '../../../src/figures/Line/Line.types'
import {InvalidArgumentError, ParseError} from '../../../src/errors'
import {toCoordinates} from '../../../src/calculus'
import type {IGraphConfig} from '../../../src/pidraw.common'
import {createAxes, createContext, graphConfig} from '../../helpers/figure'

// The figures of a drawing, with points placed in units of the coordinate system (800 x 600 pixels, 50 pixels per unit).
function create(config?: IGraphConfig) {
    const context = createContext(config)
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const line = (name: string, constraints: ILineConfig) => new Line(context, name, constraints)

    return {context, point, line, axes: createAxes(context)}
}

// The ends of the drawn part of the line, in units of the coordinate system.
const end = (line: Line, which: 'start' | 'end') => toCoordinates({x: line[which].x, y: line[which].y}, line.graphConfig)
const slopeOf = (line: Line) => {
    const start = end(line, 'start')
    const stop = end(line, 'end')

    return (stop.y - start.y) / (stop.x - start.x)
}
// The ordinate of the line at an abscissa, in units.
const yAt = (line: Line, x: number) => {
    const start = end(line, 'start')

    return start.y + slopeOf(line) * (x - start.x)
}

function expectLine(line: Line, slope: number, through: { x: number, y: number }) {
    expect(slopeOf(line)).toBeCloseTo(slope, 6)
    expect(yAt(line, through.x)).toBeCloseTo(through.y, 6)
}

function expectVertical(line: Line, x: number) {
    expect(end(line, 'start').x).toBeCloseTo(x, 6)
    expect(end(line, 'end').x).toBeCloseTo(x, 6)
}

describe('Line through two points', () => {
    test('a line goes through both points and across the canvas', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}})

        expectLine(d, 0.5, {x: 1, y: 1})
        expect(end(d, 'start').x).toBeCloseTo(-8, 6)
        expect(end(d, 'end').x).toBeCloseTo(8, 6)
    })

    test('a segment ends at the two points', () => {
        const {point, line} = create()
        const s = line('s', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape: 'segment'})

        expect(end(s, 'start')).toEqual({x: 1, y: 1})
        expect(end(s, 'end')).toEqual({x: 3, y: 2})
    })

    test('a vector ends at the two points', () => {
        const {point, line} = create()
        const v = line('v', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape: 'vector'})

        expect(end(v, 'start')).toEqual({x: 1, y: 1})
        expect(end(v, 'end')).toEqual({x: 3, y: 2})
    })

    test('a ray starts at the first point and goes through the second to the border', () => {
        const {point, line} = create()
        const r = line('r', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape: 'ray'})

        expect(end(r, 'start')).toEqual({x: 1, y: 1})
        expect(end(r, 'end').x).toBeCloseTo(8, 6)
        expect(end(r, 'end').y).toBeCloseTo(4.5, 6)
    })

    test('the line follows the points when they move', () => {
        const {point, line} = create()
        const A = point('A', 0, 0)
        const B = point('B', 1, 1)
        const d = line('d', {through: {A, B}})

        B.pixels = {x: 400 + 100, y: 300}
        d.update(true)

        expect(slopeOf(d)).toBeCloseTo(0, 6)
    })

    test('the ends are copies of the positions: they do not follow a point until the line is computed again', () => {
        const {point, line} = create()
        const A = point('A', 0, 0)
        const s = line('s', {through: {A, B: point('B', 1, 1)}, shape: 'segment'})

        A.pixels = {x: 0, y: 0}

        expect(end(s, 'start').x).toBeCloseTo(0, 9)
        expect(end(s, 'start').y).toBeCloseTo(0, 9)
    })
})

describe('Line given by a point and a vector', () => {
    test('a segment goes from the point by the vector, in pixels', () => {
        const {point, line} = create()
        const s = line('s', {director: {A: point('A', 1, 1), d: {x: 100, y: -100}}, shape: 'segment'})

        expect(end(s, 'start')).toEqual({x: 1, y: 1})
        expect(end(s, 'end')).toEqual({x: 3, y: 3})
    })

    test('a line has the direction of the vector', () => {
        const {point, line} = create()
        const d = line('d', {director: {A: point('A', 1, 1), d: {x: 100, y: -100}}})

        expectLine(d, 1, {x: 1, y: 1})
    })
})

describe('Line given by a slope', () => {
    test.each([2, 1, 0.5, 0, -1])('a slope of %s', (slope) => {
        const {point, line} = create()
        const d = line('d', {slope: {A: point('A', 1, 1), slope}})

        expectLine(d, slope, {x: 1, y: 1})
    })

    test('a slope of 0 is a horizontal line, not the diagonal of the canvas', () => {
        const {point, line} = create()
        const d = line('d', {slope: {A: point('A', 1, 1), slope: 0}})

        expect(end(d, 'start').y).toBeCloseTo(1, 6)
        expect(end(d, 'end').y).toBeCloseTo(1, 6)
    })

    test('the slope is in units of the coordinate system when the axes have different scales', () => {
        const config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        const {point, line} = create(config)
        const d = line('d', {slope: {A: point('A', 1, 1), slope: 1}})

        expectLine(d, 1, {x: 1, y: 1})
    })

    test.each([NaN, Infinity])('a slope of %s is an InvalidArgumentError', (slope) => {
        const {point, context} = create()

        expect(() => new Line(context, 'd', {slope: {A: point('A', 1, 1), slope}})).toThrow(InvalidArgumentError)
    })
})

describe('Line given by an equation', () => {
    test('y=2x+1', () => {
        const {line} = create()
        const d = line('d', {equation: 'y=2x+1'})

        expectLine(d, 2, {x: 0, y: 1})
    })

    test('a horizontal line with a fraction: y=1/2', () => {
        const {line} = create()
        const d = line('d', {equation: 'y=1/2'})

        expectLine(d, 0, {x: 0, y: 0.5})
    })

    test('a vertical line: x=-1 and 3x=6', () => {
        const {line} = create()

        expectVertical(line('d', {equation: 'x=-1'}), -1)
        expectVertical(line('e', {equation: '3x=6'}), 2)
    })

    test('a division of the variable: y=x/2', () => {
        const {line} = create()

        expectLine(line('d', {equation: 'y=x/2'}), 0.5, {x: 0, y: 0})
    })

    test('the form ax+by+c=0: 2x-3y+6=0', () => {
        const {line} = create()

        expectLine(line('d', {equation: '2x-3y+6=0'}), 2 / 3, {x: 0, y: 2})
    })

    test('the equation is in units of the coordinate system when the axes have different scales', () => {
        const config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        const {line} = create(config)

        expectLine(line('d', {equation: 'y=x'}), 1, {x: 0, y: 0})
        expectLine(line('e', {equation: 'y=2x+1'}), 2, {x: 0, y: 1})
    })

    test.each(['y2x', 'y=x^2', '1=1', 'y=(x'])('the equation %s is a ParseError that leaves nothing in the svg', (equation) => {
        const {context} = create()

        expect(() => new Line(context, 'd', {equation})).toThrow(ParseError)
        expect(context.rootSVG.findOne('#d')).toBeNull()
    })
})

describe('Line parallel or perpendicular', () => {
    test('a parallel to a line goes through the point with the same slope', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 1)}})
        const p = line('p', {parallel: {to: d, through: point('C', 1, 3)}})

        expectLine(p, 0.5, {x: 1, y: 3})
    })

    test('a parallel to an axis', () => {
        const {point, line, axes} = create()

        expectLine(line('p', {parallel: {to: axes.Ox, through: point('C', 1, 3)}}), 0, {x: 1, y: 3})
        expectVertical(line('q', {parallel: {to: axes.Oy, through: point('D', 2, 1)}}), 2)
    })

    test('a perpendicular to a line goes through the point with the opposite inverse slope', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 1)}})
        const p = line('p', {perpendicular: {to: d, through: point('C', 1, 3)}})

        expectLine(p, -2, {x: 1, y: 3})
    })

    test('a perpendicular to an axis', () => {
        const {point, line, axes} = create()

        expectVertical(line('p', {perpendicular: {to: axes.Ox, through: point('C', 1, 3)}}), 1)
        expectLine(line('q', {perpendicular: {to: axes.Oy, through: point('D', 2, 1)}}), 0, {x: 2, y: 1})
    })
})

describe('Line built from axes that are not orthogonal', () => {
    const sheared = () => create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}}))

    test('a parallel to the y axis goes along it', () => {
        const {point, line, axes} = sheared()
        const p = line('p', {parallel: {to: axes.Oy, through: point('C', 1, 0)}})

        expect(p.direction.x / p.direction.y).toBeCloseTo(-0.5, 6)
    })

    test('a perpendicular to the y axis is perpendicular on the screen', () => {
        const {point, line, axes} = sheared()
        const p = line('p', {perpendicular: {to: axes.Oy, through: point('C', 1, 0)}})

        expect(p.direction.x * 25 + p.direction.y * -50).toBeCloseTo(0, 6)
    })
})

describe('Line mediator, bisector and tangent', () => {
    test('the mediator of a segment goes through its middle, perpendicular to it', () => {
        const {point, line} = create()

        expectVertical(line('m', {mediator: {A: point('A', 0, 0), B: point('B', 2, 0)}}), 1)
        expectLine(line('n', {mediator: {A: point('C', 0, 0), B: point('D', 2, 2)}}), -1, {x: 1, y: 1})
    })

    test('the bisector of an angle goes through the vertex, between its two sides', () => {
        const {point, line} = create()
        const b = line('b', {bisector: {A: point('A', 0, 0), B: point('B', 3, 0), C: point('C', 0, 2)}})

        expectLine(b, 1, {x: 0, y: 0})
    })

    test('the bisector of two lines that cross goes through their common point', () => {
        const {point, line} = create()
        const O = point('O', 0, 0)
        const d1 = line('d1', {through: {A: O, B: point('A', 1, 0)}})
        const d2 = line('d2', {through: {A: O, B: point('B', 0, 1)}})

        const b = line('b', {bisector: {d1, d2}})

        expect(Math.abs(slopeOf(b))).toBeCloseTo(1, 6)
        expect(yAt(b, 0)).toBeCloseTo(0, 6)
    })

    test('the bisector of two parallel lines is the line in the middle of them', () => {
        const {point, line} = create()
        const d1 = line('d1', {through: {A: point('A', 0, 0), B: point('B', 1, 0)}})
        const d2 = line('d2', {through: {A: point('C', 0, 2), B: point('D', 1, 2)}})

        expectLine(line('b', {bisector: {d1, d2}}), 0, {x: 0, y: 1})
    })

    test('the other bisector of two lines is perpendicular to the first, through their common point', () => {
        const {point, line} = create()
        const O = point('O', 0, 0)
        const d1 = line('d1', {through: {A: O, B: point('A', 1, 0)}})
        const d2 = line('d2', {through: {A: O, B: point('B', 0, 1)}})

        const first = line('b', {bisector: {d1, d2}})
        const other = line('b2', {bisector: {d1, d2, alternative: true}})

        expect(slopeOf(first) * slopeOf(other)).toBeCloseTo(-1, 6)
        expect(yAt(other, 0)).toBeCloseTo(0, 6)
    })

    test('the bisectors of the two axes go through the origin, one after the other', () => {
        const {line, axes} = create()
        const first = line('b', {bisector: {d1: axes.Ox, d2: axes.Oy}})
        const other = line('b2', {bisector: {d1: axes.Ox, d2: axes.Oy, alternative: true}})

        expect(Math.abs(slopeOf(first))).toBeCloseTo(1, 6)
        expect(slopeOf(first) * slopeOf(other)).toBeCloseTo(-1, 6)
        expect(yAt(first, 0)).toBeCloseTo(0, 6)
        expect(yAt(other, 0)).toBeCloseTo(0, 6)
    })

    test('the bisectors of a line and an axis cut the angle between them in two', () => {
        const {point, line, axes} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 1, 1)}})

        const first = line('b', {bisector: {d1: axes.Ox, d2: d}})
        const other = line('b2', {bisector: {d1: axes.Ox, d2: d, alternative: true}})

        expect(slopeOf(first)).toBeCloseTo(Math.tan(Math.PI / 8), 6)
        expect(slopeOf(other)).toBeCloseTo(-1 / Math.tan(Math.PI / 8), 6)
    })

    test('two parallel lines have no other bisector: it is not drawn', () => {
        const {point, line} = create()
        const d1 = line('d1', {through: {A: point('A', 0, 0), B: point('B', 1, 0)}})
        const d2 = line('d2', {through: {A: point('C', 0, 2), B: point('D', 1, 2)}})

        expect(line('b', {bisector: {d1, d2, alternative: true}}).element.attr('visibility')).toBe('hidden')
        expect(line('b2', {bisector: {d1, d2}}).element.attr('visibility')).toBeFalsy()
    })

    test('a bisector of lines that are not lines is an InvalidArgumentError', () => {
        const {context, axes} = create()

        expect(() => new Line(context, 'b', {bisector: {d1: 'Oz' as never, d2: axes.Ox}})).toThrow(InvalidArgumentError)
    })

    test('the tangent to a curve has the slope of the curve at the point', () => {
        const {context, point, line} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})
        const t = line('t', {tangent: {f, A: point('A', 1, 1)}})

        expect(slopeOf(t)).toBeCloseTo(2, 4)
        expect(yAt(t, 1)).toBeCloseTo(1, 4)
    })
})

describe('Line configuration that is not valid', () => {
    test('a configuration without a constraint is an InvalidArgumentError that names the line, not a diagonal', () => {
        const {context} = create()

        expect(() => new Line(context, 'd', {} as ILineConfig)).toThrow(InvalidArgumentError)
        expect(() => new Line(context, 'd', {} as ILineConfig)).toThrow(/"d"/)
    })

    test('several constraints are an InvalidArgumentError', () => {
        const {context, point} = create()
        const A = point('A', 0, 0)

        expect(() => new Line(context, 'd', {through: {A, B: A}, slope: {A, slope: 1}} as unknown as ILineConfig))
            .toThrow(InvalidArgumentError)
    })

    test('a shape that does not exist is an InvalidArgumentError', () => {
        const {context} = create()

        expect(() => new Line(context, 'd', {equation: 'y=x', shape: 'curve' as never})).toThrow(InvalidArgumentError)
    })

    test.each(['segment', 'vector'] as const)('a %s given by anything but two points or a vector is an InvalidArgumentError', (shape) => {
        const {context, point} = create()

        expect(() => new Line(context, 'd', {slope: {A: point('A', 1, 1), slope: 1}, shape})).toThrow(InvalidArgumentError)
    })

    test('a line that is refused leaves nothing in the svg', () => {
        const {context} = create()

        expect(() => new Line(context, 'd', {} as ILineConfig)).toThrow()
        expect(context.rootSVG.findOne('#d')).toBeNull()
    })
})

describe('Line new configuration', () => {
    test('the line takes its new constraint and the default shape', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: point('B', 3, 2)}, shape: 'segment'})

        d.config = {slope: {A, slope: 2}}

        expect(d.config.shape).toBe('line')
        expectLine(d, 2, {x: 1, y: 1})
    })

    test('a new configuration that is not valid leaves the line as it was', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}})

        expect(() => {
            d.config = {equation: 'y=x^2'}
        }).toThrow(ParseError)
        expect(() => {
            d.config = {} as ILineConfig
        }).toThrow(InvalidArgumentError)

        expectLine(d, 0.5, {x: 1, y: 1})
    })
})

describe('Line without a position', () => {
    test('a line through two points that are the same is not drawn', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: A}})

        expect(d.element.attr('visibility')).toBe('hidden')
        expect(Number.isNaN(d.start.x)).toBe(true)
        expect(Number.isNaN(d.end.x)).toBe(true)
    })

    test('a line through a point that has no position is not drawn, and keeps no NaN in its shape', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: point('B', 3, 2)}})

        A.pixels = {x: NaN, y: NaN}
        d.update(true)

        expect(d.element.attr('visibility')).toBe('hidden')
        expect(Number.isNaN(+d.shape.attr('x1'))).toBe(false)
    })

    test('the line is drawn again when its position comes back', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: point('B', 3, 2)}})
        A.pixels = {x: NaN, y: NaN}
        d.update(true)

        A.pixels = {x: 450, y: 250}
        d.update(true)

        expect(d.element.attr('visibility')).toBeFalsy()
        expectLine(d, 0.5, {x: 1, y: 1})
    })

    test('a line that is outside the canvas keeps a start and an end on the line', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 20), B: point('B', 1, 21)}})

        expect(d.element.attr('visibility')).toBeFalsy()
        expect(slopeOf(d)).toBeCloseTo(1, 6)
        expect(yAt(d, 0)).toBeCloseTo(20, 6)
    })
})

function createLine(shape: ILineType, B: { x: number, y: number }) {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    return new Line(context, 'd', {through: {A: point('A', 0, 0), B: point('B', B.x, B.y)}, shape})
}

describe('Line label', () => {
    test('a segment shows its length in units of the coordinate system, 2 decimals by default', () => {
        const segment = createLine('segment', {x: 3, y: 4})
        segment.addLabel(['d = ', {field: 'length', digits: 2}])

        expect(segment.label?.displayName).toBe('d = 5')
    })

    test('a segment writes the number of decimals that is asked', () => {
        const two = createLine('segment', {x: 1, y: 1})
        const three = createLine('segment', {x: 1, y: 1})
        two.addLabel([{field: 'length', digits: 2}])
        three.addLabel([{field: 'length', digits: 3}])

        expect(two.label?.displayName).toBe('1.41')
        expect(three.label?.displayName).toBe('1.414')
    })

    test('the length follows the segment when it changes', () => {
        const segment = createLine('segment', {x: 3, y: 4})
        segment.addLabel([{field: 'length', digits: 2}])

        segment.end = {x: 400 + 50, y: 300}
        segment.updateLabel()

        expect(segment.label?.displayName).toBe('1')
    })

    test.each(['line', 'ray', 'vector'] as const)('a %s has no length to show', (shape) => {
        const line = createLine(shape, {x: 3, y: 4})

        expect(() => line.addLabel([{field: 'length', digits: 2}])).toThrow(InvalidArgumentError)
    })
})

describe('Line that crosses the canvas steeply', () => {
    // The canvas goes from -8 to 8 in x and from -6 to 6 in y (units).
    const steep = (shape: 'line' | 'ray') => {
        const {point, line} = create()

        return line('d', {through: {A: point('A', 0, 0), B: point('B', 1, 3)}, shape})
    }

    test('a line stops at the borders of the canvas, top and bottom included', () => {
        const d = steep('line')

        expect(end(d, 'start').x).toBeCloseTo(-2, 6)
        expect(end(d, 'start').y).toBeCloseTo(-6, 6)
        expect(end(d, 'end').x).toBeCloseTo(2, 6)
        expect(end(d, 'end').y).toBeCloseTo(6, 6)
    })

    test('a ray stops at the border of the canvas', () => {
        const d = steep('ray')

        expect(end(d, 'start').x).toBeCloseTo(0, 9)
        expect(end(d, 'start').y).toBeCloseTo(0, 9)
        expect(end(d, 'end').x).toBeCloseTo(2, 6)
        expect(end(d, 'end').y).toBeCloseTo(6, 6)
    })

    test('the label of the line is inside the canvas', () => {
        const label = steep('line').addLabel('d')

        expect(label.x).toBeGreaterThanOrEqual(0)
        expect(label.x).toBeLessThanOrEqual(800)
        expect(label.y).toBeGreaterThanOrEqual(0)
        expect(label.y).toBeLessThanOrEqual(600)
    })

    test('the TikZ of the line stays in the frame of the drawing', () => {
        expect(steep('line').tikz()).toContain('(-2,-6) -- (2,6)')
    })
})

describe('Line label placement', () => {
    const through = (shape: ILineType) => {
        const {point, line} = create()

        return line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape})
    }

    test.each(['line', 'ray'] as const)('the label of a %s is near its end, 10 pixels inside', (shape) => {
        const d = through(shape)
        const label = d.addLabel('d')
        const length = Math.hypot(d.end.x - d.start.x, d.end.y - d.start.y)

        expect(label.x).toBeCloseTo(d.end.x - 10 * (d.end.x - d.start.x) / length, 6)
        expect(label.y).toBeCloseTo(d.end.y - 10 * (d.end.y - d.start.y) / length, 6)
    })

    test.each(['segment', 'vector'] as const)('the label of a %s is at its middle', (shape) => {
        const d = through(shape)
        const label = d.addLabel('d')

        expect(label.x).toBeCloseTo((d.start.x + d.end.x) / 2, 6)
        expect(label.y).toBeCloseTo((d.start.y + d.end.y) / 2, 6)
    })

    test.each(['line', 'ray', 'segment', 'vector'] as const)('the label of a %s turns along it when asked', (shape) => {
        const d = through(shape)
        const label = d.addLabel('d')

        label.autoRotate = true
        d.updateLabel()

        expect(label.config.rotate).toBeCloseTo(-d.angle, 6)
    })

    test('the label that turned along a line is straight again when the line becomes horizontal', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: point('B', 3, 2)}})
        const label = d.addLabel('d')
        label.autoRotate = true
        d.updateLabel()
        expect(label.shape.attr('transform')).toBeTruthy()

        d.config = {through: {A, B: point('C', 3, 1)}}
        d.updateLabel()

        expect(label.config.rotate).toBeCloseTo(0, 6)
        expect(label.shape.attr('transform')).toBeFalsy()
    })

    test('the label of a line that has no position stays where it was, without NaN', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: A}})
        const label = d.addLabel('d')

        expect(Number.isNaN(label.x)).toBe(false)
        expect(Number.isNaN(label.y)).toBe(false)
    })
})

describe('Line move', () => {
    test('a number moves along the Ox axis, in units, like every figure', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}})

        d.move(1)

        expect(d.shape.attr('transform')).toBe('matrix(1,0,0,1,50,0)')
    })

    test('a vector moves along its two axes, in units', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}})

        d.move({x: 0, y: 1})

        expect(d.shape.attr('transform')).toBe('matrix(1,0,0,1,0,-50)')
    })
})

describe('Line vector', () => {
    const through = (shape: ILineType) => {
        const {point, line} = create()

        return line('v', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape})
    }

    test('a vector has an arrow at its end, a segment does not', () => {
        expect(String(through('vector').shape.attr('marker-end'))).toContain('marker-v-10')
        expect(through('segment').shape.attr('marker-end')).toBeFalsy()
    })

    test('a vector that becomes a segment loses its arrow, in the drawing and in the TikZ', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const B = point('B', 3, 2)
        const v = line('v', {through: {A, B}, shape: 'vector'})
        expect(v.tikz()).toContain('->')

        v.config = {through: {A, B}, shape: 'segment'}

        expect(v.shape.attr('marker-end')).toBeFalsy()
        expect(v.tikz()).not.toContain('->')
    })

    test('the arrow takes the color of the line', () => {
        const v = through('vector').stroke('red')

        expect(v.tikz()).toContain('draw=pidraw-red')
    })
})

describe('Line tikz', () => {
    const through = (shape: ILineType) => {
        const {point, line} = create()

        return line('d', {through: {A: point('A', 1, 1), B: point('B', 3, 2)}, shape})
    }
    const style = 'draw=black, line width=0.75pt'

    test('a segment is drawn between its two points, in units of the coordinate system', () => {
        expect(through('segment').tikz()).toBe(`\\draw[${style}] (1,1) -- (3,2);`)
    })

    test('a line is drawn between the borders of the canvas', () => {
        expect(through('line').tikz()).toBe(`\\draw[${style}] (-8,-3.5) -- (8,4.5);`)
    })

    test('a ray is drawn from its first point to the border of the canvas', () => {
        expect(through('ray').tikz()).toBe(`\\draw[${style}] (1,1) -- (8,4.5);`)
    })

    test('a vector is drawn with an arrow at its end', () => {
        expect(through('vector').tikz()).toBe(`\\draw[${style}, ->] (1,1) -- (3,2);`)
    })

    test('the appearance of the line is written as options', () => {
        const tikz = through('segment').stroke('blue', 2).dash('4 2').tikz()

        expect(tikz).toContain('draw=pidraw-blue, line width=1.5pt, dash pattern=on 3pt off 1.5pt')
    })

    test('a color that has no equivalent in LaTeX is an InvalidArgumentError', () => {
        const d = through('segment').stroke('periwinkle')

        expect(() => d.tikz()).toThrow(InvalidArgumentError)
    })

    test('the label of a segment is a node at its middle', () => {
        const s = through('segment')
        s.addLabel('s')

        expect(s.tikz()).toBe(`\\draw[${style}] (1,1) -- (3,2);\n\\node[below right] at (2,1.5) {s};`)
    })

    test('the label of a line is a node near its end', () => {
        const d = through('line')
        d.addLabel('d')

        expect(d.tikz()).toContain('\\node[below right] at (7.82111,4.41056) {d};')
    })

    test('a line that is hidden or has no position is not written', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const hidden = through('segment')
        hidden.hide()

        expect(hidden.tikz()).toBe('')
        expect(line('same', {through: {A, B: A}}).tikz()).toBe('')
    })

    test('a line whose shape is hidden keeps its label only, and a line whose label is hidden keeps its shape only', () => {
        const noShape = through('segment')
        noShape.addLabel('s')
        noShape.shape.hide()
        const noLabel = through('segment')
        noLabel.addLabel('s').hide()

        expect(noShape.tikz()).toBe('\\node[below right] at (2,1.5) {s};')
        expect(noLabel.tikz()).toBe(`\\draw[${style}] (1,1) -- (3,2);`)
    })
})

describe('Line follow', () => {
    // Pixels: the origin is at (400, 300), 50 pixels per unit, y points down.
    const horizontal = (shape: ILineType) => {
        const {point, line} = create()

        return line('d', {through: {A: point('A', 0, 1), B: point('B', 2, 1)}, shape})
    }

    test('a point is projected on a line', () => {
        const point = horizontal('line').follow(550, 100)

        expect(point.x).toBeCloseTo(550, 6)
        expect(point.y).toBeCloseTo(250, 6)
    })

    test.each(['segment', 'vector'] as const)('a point stays between the ends of a %s', (shape) => {
        const d = horizontal(shape)

        expect(d.follow(550, 100).x).toBeCloseTo(500, 6)
        expect(d.follow(300, 100).x).toBeCloseTo(400, 6)
        expect(d.follow(450, 100).x).toBeCloseTo(450, 6)
    })

    test('a point stays on the ray: before its start it stops at the start', () => {
        const ray = horizontal('ray')

        expect(ray.follow(300, 100).x).toBeCloseTo(400, 6)
        expect(ray.follow(700, 100).x).toBeCloseTo(700, 6)
    })

    test('a line that has no position leaves the point where it is', () => {
        const {point, line} = create()
        const A = point('A', 1, 1)
        const d = line('d', {through: {A, B: A}})

        expect(d.follow(123, 456)).toEqual({x: 123, y: 456})
    })
})

describe('Line label fields', () => {
    const labelOf = (d: Line, field: 'slope' | 'length', digits?: number) => {
        d.addLabel([{field, ...(digits === undefined ? {} : {digits})}], {asHtml: true})

        return d.computeLabel()
    }

    test('the slope of a line through two points given by numbers is a fraction in TeX', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 3)}})

        expect(labelOf(d, 'slope')).toBe('\\frac{3}{2}')
    })

    test('a negative slope has its sign in front of the fraction, and a whole slope is a number', () => {
        const {point, line} = create()

        expect(labelOf(line('d', {through: {A: point('A', 0, 0), B: point('B', 4, -2)}}), 'slope')).toBe('-\\frac{1}{2}')
        expect(labelOf(line('e', {through: {A: point('C', 0, 0), B: point('D', 1, 2)}}), 'slope')).toBe('2')
    })

    test('the slope with decimals asked is a decimal number', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 3)}})

        expect(labelOf(d, 'slope', 2)).toBe('1.5')
        expect(labelOf(d, 'slope', 0)).toBe('2')
    })

    test('the slope of a line given by a slope is a fraction', () => {
        const {point, line} = create()

        expect(labelOf(line('d', {slope: {A: point('A', 1, 1), slope: 0.75}}), 'slope')).toBe('\\frac{3}{4}')
    })

    test('a slope that is no fraction with a denominator of 100 at most is a decimal number', () => {
        const {point, line} = create()

        expect(labelOf(line('d', {slope: {A: point('A', 1, 1), slope: 0.123456}}), 'slope')).toBe('0.12')
    })

    test('the slope of a vertical line is infinite', () => {
        const {point, line} = create()

        expect(labelOf(line('d', {through: {A: point('A', 1, 0), B: point('B', 1, 3)}}), 'slope')).toBe('\\infty')
    })

    test('the slope is a decimal number when a point is found from other figures', () => {
        const {context, point, line} = create()
        const middle = new Point(context, 'M', {middle: {A: point('A', 0, 0), B: point('B', 2, 1)}})
        const d = line('d', {through: {A: point('O', 0, 0), B: middle}})

        expect(labelOf(d, 'slope')).toBe('0.5')
    })

    test('the slope is in units of the coordinate system when the scales differ', () => {
        const base = graphConfig()
        const {point, line} = create({...base, axis: {x: {x: 50, y: 0}, y: {x: 0, y: -100}}})
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 3)}})

        expect(labelOf(d, 'slope')).toBe('\\frac{3}{2}')
    })

    test('the length of a segment is in units of the coordinate system, and it is the default field', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 3, 4)}, shape: 'segment'})

        expect(labelOf(d, 'length')).toBe('5')
        expect(d.defaultLabelField()).toBe('length')
    })

    test.each(['line', 'ray', 'vector'] as const)('a %s has a slope, no length and no default field', (shape) => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 1, 1)}, shape})

        expect(Object.keys(d.labelFields())).toEqual(['slope'])
        expect(d.defaultLabelField()).toBeNull()
    })
})

describe('Line label slope in TikZ', () => {
    test('the fraction of a TeX label is a formula between $', () => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', 2, 3)}})

        d.addLabel([{field: 'slope'}], {asHtml: true})

        expect(d.tikz()).toContain('{$\\frac{3}{2}$};')
    })
})

describe('Line label with a unit and a scale', () => {
    const segment = (unit: 'mm' | null, scale: number) => {
        const {point, line} = create({...graphConfig(), measure: {unit, scale}})

        return line('d', {through: {A: point('A', 0, 0), B: point('B', 3, 4)}, shape: 'segment'})
    }

    test('the length of a segment is multiplied by the scale and followed by the unit', () => {
        const d = segment('mm', 10)

        d.addLabel([{field: 'length'}])

        expect(d.computeLabel()).toBe('50 mm')
    })

    test('the slope has no unit and does not depend on the scale', () => {
        const d = segment('mm', 10)

        d.addLabel([{field: 'slope'}])

        expect(d.computeLabel()).toBe('4/3')
    })
})

describe('Line label slope in a text', () => {
    const slopeOf = (through: [number, number], asHtml: boolean) => {
        const {point, line} = create()
        const d = line('d', {through: {A: point('A', 0, 0), B: point('B', ...through)}})

        d.addLabel([{field: 'slope'}], {asHtml})

        return d.computeLabel()
    }

    test('a fraction is written with a slash in a text and with \\frac in TeX', () => {
        expect(slopeOf([2, 3], false)).toBe('3/2')
        expect(slopeOf([2, 3], true)).toBe('\\frac{3}{2}')
        expect(slopeOf([4, -2], false)).toBe('-1/2')
    })

    test('the infinity is a sign in a text and \\infty in TeX', () => {
        expect(slopeOf([0, 3], false)).toBe('∞')
        expect(slopeOf([0, 3], true)).toBe('\\infty')
    })
})
