import {describe, expect, test, vi} from 'vitest'
import {Arc} from '../../../src/figures/Arc/Arc'
import {Bezier} from '../../../src/figures/Bezier/Bezier'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Follow} from '../../../src/figures/Follow/Follow'
import type {IFollowConfig} from '../../../src/figures/Follow/Follow.types'
import {Line} from '../../../src/figures/Line/Line'
import {Parametric} from '../../../src/figures/Parametric/Parametric'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {Polygon} from '../../../src/figures/Polygon/Polygon'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const line = (name: string, A: XY, B: XY) => new Line(context, name, {through: {A, B}})
    const follow = (name: string, values: IFollowConfig) => new Follow(context, name, values)

    return {context, point, line, follow}
}

function expectPoint(actual: XY, expected: XY) {
    expect(actual.x).toBeCloseTo(expected.x, 4)
    expect(actual.y).toBeCloseTo(expected.y, 4)
}

/** The tangent that is drawn: its two ends in pixels, or `null` when it is hidden. */
function tangentOf(follow: Follow): [XY, XY] | null {
    const line = follow.element.find('line')[0]

    if (line.css('display') === 'none') {
        return null
    }

    return [{x: +line.attr('x1'), y: +line.attr('y1')}, {x: +line.attr('x2'), y: +line.attr('y2')}]
}

/** The tangent that is drawn, that must exist. */
function drawn(follow: Follow): [XY, XY] {
    const ends = tangentOf(follow)

    if (ends === null) {
        throw new Error('the tangent is not drawn')
    }

    return ends
}

const pointShown = (follow: Follow) => follow.element.find('circle')[0].css('display') !== 'none'

describe('Follow along a figure', () => {
    test('starts at the origin of the coordinate system: on a plot, at x = 0', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2+1'})
        const t = follow('t', {follow: f})

        expectPoint(t.position, at(0, 1))
        expectPoint({x: +t.element.find('circle')[0].attr('cx'), y: +t.element.find('circle')[0].attr('cy')}, at(0, 1))
    })

    test('starts where the figure is the closest to the starting position', () => {
        const {context, point, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})
        const A = point('A', 2, 7)
        const t = follow('t', {follow: f, at: A})

        expectPoint(t.position, at(2, 4))
    })

    test('follows the mouse along a line', () => {
        const {line, follow} = create()
        const d = line('d', at(0, 0), at(4, 4))
        const t = follow('t', {follow: d})

        t.moveTo(at(3, 1).x, at(3, 1).y)

        expectPoint(t.position, at(2, 2))
    })

    test('follows the mouse along a segment, and stays at its ends', () => {
        const {context, follow} = create()
        const s = new Line(context, 's', {through: {A: at(0, 0), B: at(2, 0)}, shape: 'segment'})
        const t = follow('t', {follow: s})

        t.moveTo(at(5, 3).x, at(5, 3).y)

        expectPoint(t.position, at(2, 0))
    })

    test('follows the mouse along a circle', () => {
        const {context, follow} = create()
        const c = new Circle(context, 'c', {center: at(0, 0), radius: 2})
        const t = follow('t', {follow: c})

        t.moveTo(at(5, 0).x, at(5, 0).y)

        expectPoint(t.position, at(2, 0))
    })

    test('follows the mouse along a plot: the point is at the abscissa of the mouse', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})
        const t = follow('t', {follow: f})

        t.moveTo(at(3, -5).x, at(3, -5).y)

        expectPoint(t.position, at(3, 9))
    })

    test('follows the mouse along a parametric curve: the point is the closest to the mouse', () => {
        const {context, follow} = create()
        const c = new Parametric(context, 'c', {expressions: {x: '2cos(t)', y: '2sin(t)'}})
        const t = follow('t', {follow: c})

        t.moveTo(at(5, 5).x, at(5, 5).y)

        expect(Math.hypot(t.position.x - 400, t.position.y - 300)).toBeCloseTo(100, 0)
        expect(t.position.x).toBeCloseTo(at(Math.SQRT2, Math.SQRT2).x, 0)
        expect(t.position.y).toBeCloseTo(at(Math.SQRT2, Math.SQRT2).y, 0)
    })

    test('the point is hidden where the figure does not exist, and comes back', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'sqrt(x)'})
        const t = follow('t', {follow: f, tangent: true})

        t.moveTo(at(-3, 0).x, at(-3, 0).y)

        expect(t.position.x).toBeNaN()
        expect(pointShown(t)).toBe(false)
        expect(tangentOf(t)).toBeNull()

        t.moveTo(at(4, 0).x, at(4, 0).y)

        expectPoint(t.position, at(4, 2))
        expect(pointShown(t)).toBe(true)
        expect(tangentOf(t)).not.toBeNull()
    })

    test('is put again on the figure when the figure changes', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x'})
        const t = follow('t', {follow: f})
        t.moveTo(at(2, 0).x, at(2, 0).y)

        f.config = {expression: 'x^2'}
        t.update(true)

        expectPoint(t.position, at(2, 4))
    })

    test('is put again on the figure when the point it starts from moves', () => {
        const {context, point, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})
        const A = point('A', 1, 0)
        const t = follow('t', {follow: f, at: A})

        A.config = {coordinates: {x: 3, y: 0}}
        t.update(true)

        expectPoint(t.position, at(3, 9))
    })
})

describe('Follow tangent', () => {
    test('is not drawn by default, and is with the option', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})

        expect(tangentOf(follow('a', {follow: f}))).toBeNull()
        expect(tangentOf(follow('b', {follow: f, tangent: true}))).not.toBeNull()
    })

    test.each([
        ['horizontal', at(0, 1), at(3, 1), 0],
        ['rising at 45 degrees', at(0, 0), at(3, 3), -1],
        ['falling at 45 degrees', at(0, 3), at(3, 0), 1],
        ['a gentle slope', at(0, 0), at(5, 1), -0.2],
        ['a steep slope', at(0, 0), at(1, 4), -4]
    ])('along a line that is %s, the tangent is the line', (_, A, B, slope) => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', A, B), tangent: true})
        const [a, b] = drawn(t)
        expect((b.y - a.y) / (b.x - a.x)).toBeCloseTo(slope, 3)
        // The tangent goes through the point.
        const p = t.position
        expect((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y)).toBeCloseTo(0, 3)
    })

    test('along a vertical line, the tangent is vertical', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(1, 0), at(1, 3)), tangent: true, at: at(1, 1)})
        const [a, b] = drawn(t)

        expect(b.x).toBeCloseTo(a.x, 6)
    })

    test('along a circle at its highest point, the tangent is horizontal; at its leftmost point, vertical', () => {
        const {context, follow} = create()
        const c = new Circle(context, 'c', {center: at(0, 0), radius: 2})
        const t = follow('t', {follow: c, tangent: true})

        t.moveTo(at(0, 5).x, at(0, 5).y)
        const [a, b] = drawn(t)
        // The tangent crosses the drawing (800 pixels): a tenth of a pixel is a slope of 0.0001.
        expect(b.y).toBeCloseTo(a.y, 1)

        t.moveTo(at(-5, 0).x, at(-5, 0).y)
        const [c1, c2] = drawn(t)
        expect(c2.x).toBeCloseTo(c1.x, 1)
    })

    test('along a plot, the tangent has the slope of the curve', () => {
        const {context, follow} = create()
        const f = new Plot(context, 'f', {expression: 'x^2'})
        const t = follow('t', {follow: f, tangent: true})

        t.moveTo(at(1.5, 0).x, at(1.5, 0).y)
        const [a, b] = drawn(t)

        // The slope of x^2 at 1.5 is 3 in units; on the screen the y axis points down.
        expect((b.y - a.y) / (b.x - a.x)).toBeCloseTo(-3, 2)
    })
})

describe('Follow along an arc, a polygon and a Bézier curve', () => {
    // A quarter of a circle of 2 units, from the east to the north, counterclockwise.
    const quarter = (context: ReturnType<typeof createContext>, end = at(0, 2)) =>
        new Arc(context, 'a', {points: {start: at(2, 0), center: at(0, 0), end}})
    const square = (context: ReturnType<typeof createContext>) =>
        new Polygon(context, 'p', {vertices: [at(0, 0), at(2, 0), at(2, 2), at(0, 2)]})
    const arch = (context: ReturnType<typeof createContext>) =>
        new Bezier(context, 'b', {through: [at(0, 0), at(2, 2), at(4, 0)].map(point => ({point}))})

    test('each of them can be followed', () => {
        const {context} = create()

        expect([quarter(context), square(context), arch(context)].map(figure => figure.followable)).toEqual([true, true, true])
    })

    test('an arc is followed on its circle, in its angle', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: quarter(context)})

        t.moveTo(at(5, 5).x, at(5, 5).y)

        expectPoint(t.position, at(Math.SQRT2, Math.SQRT2))
    })

    test('an arc is followed up to its ends, where the point stays', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: quarter(context)})

        t.moveTo(at(0, -5).x, at(0, -5).y)
        expectPoint(t.position, at(2, 0))

        t.moveTo(at(-5, 5).x, at(-5, 5).y)
        expectPoint(t.position, at(0, 2))
    })

    test('the tangent of an arc is drawn at its end, and goes the way of the arc', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: quarter(context), tangent: true})

        t.moveTo(at(0, -5).x, at(0, -5).y)
        const [a, b] = drawn(t)

        // At the east end the arc goes up: the tangent is vertical.
        expect(Math.abs(b.x - a.x) / Math.abs(b.y - a.y)).toBeLessThan(0.01)
    })

    test('the tangent of an arc is perpendicular to its radius inside the arc', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: quarter(context), tangent: true})

        t.moveTo(at(5, 5).x, at(5, 5).y)
        const [a, b] = drawn(t)
        const radius = {x: t.position.x - at(0, 0).x, y: t.position.y - at(0, 0).y}

        expect(((b.x - a.x) * radius.x + (b.y - a.y) * radius.y) / (Math.hypot(b.x - a.x, b.y - a.y) * Math.hypot(radius.x, radius.y)))
            .toBeCloseTo(0, 2)
    })

    test('an arc that does not exist is not followed', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: quarter(context, at(3, 0))})

        t.moveTo(at(1, 1).x, at(1, 1).y)

        expect(pointShown(t)).toBe(false)
    })

    test('a polygon is followed on its outline, from the outside and from the inside', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: square(context)})

        t.moveTo(at(1, 5).x, at(1, 5).y)
        expectPoint(t.position, at(1, 2))

        t.moveTo(at(1, 1.6).x, at(1, 1.6).y)
        expectPoint(t.position, at(1, 2))
    })

    test('the tangent of a polygon is its side', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: square(context), tangent: true})

        t.moveTo(at(1, 5).x, at(1, 5).y)
        const [a, b] = drawn(t)

        expect(b.y).toBeCloseTo(a.y, 1)
    })

    test('a Bézier curve is followed on the curve', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: arch(context)})

        t.moveTo(at(2, 5).x, at(2, 5).y)

        expect(Math.hypot(t.position.x - at(2, 2).x, t.position.y - at(2, 2).y)).toBeLessThan(1)
    })

    test('the tangent of a Bézier curve at its top is horizontal', () => {
        const {context, follow} = create()
        const t = follow('t', {follow: arch(context), tangent: true})

        t.moveTo(at(2, 5).x, at(2, 5).y)
        const [a, b] = drawn(t)

        expect(Math.abs((b.y - a.y) / (b.x - a.x))).toBeLessThan(0.05)
    })
})

describe('Follow that is not valid', () => {
    test.each([
        ['a point, which cannot be followed', (c: ReturnType<typeof create>) => ({follow: c.point('P', 0, 0)})],
        ['no figure', () => ({} as IFollowConfig)],
        ['something that is not a figure', () => ({follow: {x: 1, y: 2}} as unknown as IFollowConfig)],
        ['a size of 0', (c: ReturnType<typeof create>) => ({follow: c.line('d', at(0, 0), at(1, 1)), size: 0})],
        ['a size that is NaN', (c: ReturnType<typeof create>) => ({follow: c.line('d', at(0, 0), at(1, 1)), size: NaN})],
        ['a starting position that is not a position', (c: ReturnType<typeof create>) => ({follow: c.line('d', at(0, 0), at(1, 1)), at: 3 as never})]
    ])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const made = create()
        const values = config(made)
        const before = made.context.rootSVG.children().length

        expect(() => made.follow('t', values)).toThrow(InvalidArgumentError)
        expect(made.context.rootSVG.children()).toHaveLength(before)
    })

    test('a new config draws the point again, and a config that is not valid leaves it as it was', () => {
        const {line, follow, point} = create()
        const t = follow('t', {follow: line('d', at(0, 0), at(4, 4)), tangent: true})

        t.config = {follow: line('e', at(0, 1), at(4, 1)), size: 20}
        expect(t.config.size).toBe(20)
        expectPoint(t.position, at(0, 1))

        expect(() => {
            t.config = {follow: point('P', 0, 0)}
        }).toThrow(InvalidArgumentError)
        expect(t.config.size).toBe(20)
    })

    test('the config is a copy: changing the object that was given does not change the point', () => {
        const {line, follow} = create()
        const values: IFollowConfig = {follow: line('d', at(0, 0), at(4, 4))}
        const t = follow('t', values)

        values.tangent = true

        expect(t.config.tangent).toBeUndefined()
    })
})

describe('Follow listener', () => {
    test('listens to the mouse on the drawing, and stops when it is disposed', () => {
        const made = create()
        const on = vi.spyOn(made.context.rootSVG, 'on')
        const off = vi.spyOn(made.context.rootSVG, 'off')
        const t = made.follow('t', {follow: made.line('d', at(0, 0), at(4, 4))})

        expect(on).toHaveBeenCalledWith('mousemove', expect.any(Function))
        const listener = on.mock.calls[0][1]

        t.dispose()

        expect(off).toHaveBeenCalledWith('mousemove', listener)
    })
})

describe('Follow label', () => {
    test('is beside the point, on the left of the way the figure goes', () => {
        const {line, follow} = create()
        // A line that goes to the right: the left of the way is above.
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1)), at: at(1, 0)})
        const label = t.addLabel('t')

        expect(label.x).toBeCloseTo(at(1, 1).x, 4)
        expect(label.y).toBeLessThan(at(1, 1).y)
        expect(label.config.alignement).toBe('tc')
    })

    test('follows the point when the mouse moves, and keeps the alignment that was asked for', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1))})
        const label = t.addLabel('t')
        label.position('bl')

        t.moveTo(at(3, 0).x, at(3, 0).y)

        expect(label.x).toBeCloseTo(at(3, 1).x, 4)
        expect(label.config.alignement).toBe('bl')
    })
})

// The TikZ code is what is drawn now, in units of the coordinate system.
describe('Follow TikZ', () => {
    test('is the point, a filled circle', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1)), at: at(2, 0)})

        expect(t.tikz()).toBe('\\fill[fill=black] (2,1) circle[radius=3.75pt];')
    })

    test('has the tangent too with the option, drawn across the drawing', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1)), at: at(2, 0), tangent: true})

        expect(t.tikz()).toBe(
            '\\draw[draw=black, line width=0.75pt] (-8,1) -- (8,1);\n\\fill[fill=black] (2,1) circle[radius=3.75pt];'
        )
    })

    test('has its colors and its size', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1)), at: at(2, 0), tangent: true, size: 20}).stroke('red').fill('blue')

        expect(t.tikz()).toContain('\\draw[draw=red, line width=0.75pt] (-8,1) -- (8,1);')
        expect(t.tikz()).toContain('\\fill[fill=blue] (2,1) circle[radius=7.5pt];')
    })

    test('the label is a node beside the point', () => {
        const {line, follow} = create()
        const t = follow('t', {follow: line('d', at(-4, 1), at(4, 1)), at: at(2, 0)})
        t.addLabel('$t$')

        expect(t.tikz()).toMatch(/circle\[radius=3\.75pt\];\n\\node\[above\] at \(2,1\.\d+\) \{\$t\$\};$/)
    })

    test('writes nothing where the figure does not exist, or when hidden', () => {
        const {context, line, follow} = create()
        const f = new Plot(context, 'f', {expression: 'sqrt(x)'})
        const gone = follow('t', {follow: f, at: at(-3, 0)})
        const hidden = follow('u', {follow: line('d', at(-4, 1), at(4, 1))})
        hidden.hide()

        expect(gone.tikz()).toBe('')
        expect(hidden.tikz()).toBe('')
    })
})
