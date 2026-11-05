import {describe, expect, test} from 'vitest'
import {Bezier} from '../../../src/figures/Bezier/Bezier'
import {Point} from '../../../src/figures/Point/Point'
import type {IBezierConfig} from '../../../src/figures/Bezier/Bezier.types'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const curve = (name: string, values: IBezierConfig) => new Bezier(context, name, values)

    return {context, point, curve}
}

const pathOf = (curve: Bezier) => curve.shape.attr('d') as string
const through = (...points: XY[]) => points.map(point => ({point}))

describe('Bezier through points', () => {
    test('a smooth curve of a cubic curve for each pair of points', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))})

        expect(c.segments).toHaveLength(2)
        expect(pathOf(c)).toMatch(/^M 400,300 C [\d.,]+ [\d.,]+ 500,200 C [\d.,]+ [\d.,]+ 600,300$/)
    })

    test('goes through the points, and the control points are on both sides of each one', () => {
        const {curve} = create()
        const [first, second] = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))}).segments

        expect(first.end).toEqual(at(2, 2))
        expect(second.start).toEqual(at(2, 2))
        expect((first.control2.x + second.control1.x) / 2).toBeCloseTo(500, 8)
        expect((first.control2.y + second.control1.y) / 2).toBeCloseTo(200, 8)
    })

    test('the ratio is the distance of the control points', () => {
        const {curve} = create()
        const near = curve('a', {through: [{point: at(0, 0)}, {point: at(2, 0), ratio: 0.1}, {point: at(4, 0)}]}).segments[0]
        const far = curve('b', {through: [{point: at(0, 0)}, {point: at(2, 0), ratio: 0.4}, {point: at(4, 0)}]}).segments[0]

        expect(near.control2.x).toBeCloseTo(500 - 20, 8)
        expect(far.control2.x).toBeCloseTo(500 - 80, 8)
    })

    test('a horizontal direction goes toward the next point, on each side', () => {
        const {curve} = create()
        const right = curve('a', {through: [{point: at(0, 0), direction: 'horizontal'}, {point: at(3, 2)}]}).segments[0]
        const left = curve('b', {through: [{point: at(0, 0), direction: 'horizontal'}, {point: at(-3, 2)}]}).segments[0]

        expect(right.control1.y).toBeCloseTo(300, 8)
        expect(right.control1.x).toBeGreaterThan(400)
        expect(left.control1.y).toBeCloseTo(300, 8)
        expect(left.control1.x).toBeLessThan(400)
    })

    test('an angle is the direction of the curve, counterclockwise as seen on the screen', () => {
        const {curve} = create()
        const [segment] = curve('a', {through: [{point: at(0, 0), direction: 90}, {point: at(4, 0)}]}).segments

        expect(segment.control1.x).toBeCloseTo(400, 8)
        expect(segment.control1.y).toBeLessThan(300)
    })

    test('a closed curve comes back to its first point, smoothly', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0), at(2, -2)), closed: true})
        const segments = c.segments

        expect(segments).toHaveLength(4)
        expect(segments[3].end).toEqual(at(0, 0))
        expect(pathOf(c).endsWith(' Z')).toBe(true)
        expect((segments[3].control2.x + segments[0].control1.x) / 2).toBeCloseTo(400, 8)
        expect((segments[3].control2.y + segments[0].control1.y) / 2).toBeCloseTo(300, 8)
    })

    test('asClosed closes the curve', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))})

        c.asClosed()

        expect(c.config.closed).toBe(true)
        expect(c.segments).toHaveLength(3)
    })

    test('follows its points', () => {
        const {curve, point} = create()
        const A = point('A', 0, 0)
        const B = point('B', 2, 2)
        const C = point('C', 4, 0)
        const c = curve('b', {through: through(A, B, C)})

        B.config = {coordinates: {x: 2, y: 4}}
        c.update(true)

        expect(c.segments[0].end).toEqual(at(2, 4))
    })

    test('does not exist if a point has no position: it is not drawn, and comes back', () => {
        const {curve} = create()
        const B = at(2, 2)
        const c = curve('b', {through: through(at(0, 0), B, at(4, 0))})

        B.y = NaN
        c.update(true)

        expect(c.element.attr('visibility')).toBe('hidden')
        expect(c.segments).toEqual([])
        expect(pathOf(c)).toBe('M 0 0')

        B.y = 200
        c.update(true)

        expect(c.element.attr('visibility')).toBeFalsy()
        expect(c.segments).toHaveLength(2)
    })
})

describe('Bezier of control points', () => {
    test('4 points are a cubic curve that starts and ends at the first and the last', () => {
        const {curve} = create()
        const c = curve('b', {controls: [at(0, 0), at(1, 3), at(3, 3), at(4, 0)]})

        expect(pathOf(c)).toBe('M 400,300 C 450,150 550,150 600,300')
    })

    test('3 points are a quadratic curve, written as a cubic one', () => {
        const {curve} = create()
        const [segment] = curve('b', {controls: [at(0, 0), at(2, 4), at(4, 0)]}).segments

        expect(segment.start).toEqual(at(0, 0))
        expect(segment.end).toEqual(at(4, 0))
        expect(segment.control1.x).toBeCloseTo(400 + 2 * 100 / 3, 8)
        expect(segment.control1.y).toBeCloseTo(300 - 2 * 200 / 3, 8)
    })

    test('follows its points', () => {
        const {curve, point} = create()
        const P = point('P', 1, 3)
        const c = curve('b', {controls: [at(0, 0), P, at(3, 3), at(4, 0)]})

        P.config = {coordinates: {x: 1, y: 5}}
        c.update(true)

        expect(c.segments[0].control1).toEqual(at(1, 5))
    })
})

describe('Bezier that is not valid', () => {
    test.each([
        ['no construction', {}],
        ['two constructions', {through: through(at(0, 0), at(1, 1)), controls: [at(0, 0), at(1, 1), at(2, 0)]}],
        ['one point', {through: through(at(0, 0))}],
        ['no points', {through: []}],
        ['points that are not a list', {through: 3 as never}],
        ['a point that is not a position', {through: [{point: at(0, 0)}, {point: 3 as never}]}],
        ['a point without a position property', {through: [{point: at(0, 0)}, {} as never]}],
        ['a closed curve through 2 points', {through: through(at(0, 0), at(1, 1)), closed: true}],
        ['a closed curve of control points', {controls: [at(0, 0), at(1, 1), at(2, 0)], closed: true}],
        ['a direction that is not valid', {through: [{point: at(0, 0), direction: 'diagonal' as never}, {point: at(1, 1)}]}],
        ['a direction that is NaN', {through: [{point: at(0, 0), direction: NaN}, {point: at(1, 1)}]}],
        ['a ratio of 0', {through: [{point: at(0, 0), ratio: 0}, {point: at(1, 1)}]}],
        ['a ratio that is negative', {through: [{point: at(0, 0), ratio: -1}, {point: at(1, 1)}]}],
        ['a ratio that is NaN', {through: [{point: at(0, 0), ratio: NaN}, {point: at(1, 1)}]}],
        ['2 control points', {controls: [at(0, 0), at(1, 1)]}],
        ['5 control points', {controls: [at(0, 0), at(1, 1), at(2, 0), at(3, 1), at(4, 0)]}]
    ] as [string, IBezierConfig][])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const {context, curve} = create()

        expect(() => curve('b', config)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test('a new config draws the curve again', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))})

        c.config = {controls: [at(0, 0), at(1, 3), at(3, 3), at(4, 0)]}

        expect(pathOf(c)).toBe('M 400,300 C 450,150 550,150 600,300')
    })

    test('a config that is not valid leaves the curve as it was', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))})
        const path = pathOf(c)

        expect(() => {
            c.config = {through: through(at(0, 0))}
        }).toThrow(InvalidArgumentError)
        expect(pathOf(c)).toBe(path)
        expect(c.config.through).toHaveLength(3)
    })

    test('the config is a copy: changing the lists that were given does not change the curve', () => {
        const {curve} = create()
        const points = through(at(0, 0), at(2, 2), at(4, 0))
        const c = curve('b', {through: points})

        points.push({point: at(6, 2)})
        points[0].point = at(9, 9)

        expect(c.config.through).toHaveLength(3)
        expect(c.config.through?.[0].point).toEqual(at(0, 0))
    })
})

describe('Bezier label', () => {
    test('is half way along the curve, on the left of the way it goes', () => {
        const {curve} = create()
        // A straight curve to the right: the left of the way is above.
        const label = curve('b', {through: through(at(0, 0), at(4, 0))}).addLabel('b')

        expect(label.x).toBeCloseTo(500, 6)
        expect(label.y).toBeCloseTo(300 - 8, 6)
        expect(label.config.alignement).toBe('tc')
    })

    test('keeps the alignment that was asked for when the curve moves', () => {
        const {curve} = create()
        const B = at(4, 0)
        const c = curve('b', {through: through(at(0, 0), B)})
        const label = c.addLabel('b')
        label.position('bl')

        B.y = 100
        c.update(true)

        expect(label.alignementGiven).toBe(true)
        expect(label.config.alignement).toBe('bl')
    })

    test('a curve that does not exist leaves its label where it was', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), {x: NaN, y: NaN})})

        expect(() => c.addLabel('b')).not.toThrow()
    })
})

describe('Bezier TikZ', () => {
    test('is the cubic curves joined, in units of the coordinate system', () => {
        const {curve} = create()
        const tikz = curve('b', {controls: [at(0, 0), at(1, 3), at(3, 3), at(4, 0)]}).tikz()

        expect(tikz).toBe('\\draw[draw=black, line width=0.75pt] (0,0) .. controls (1,3) and (3,3) .. (4,0);')
    })

    test('a smooth curve has a cubic curve for each pair of points', () => {
        const {curve} = create()
        const tikz = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0))}).tikz()

        expect(tikz.match(/\.\. controls/g)).toHaveLength(2)
        expect(tikz).toContain('.. (2,2) .. controls')
        expect(tikz.endsWith('.. (4,0);')).toBe(true)
    })

    test('a closed curve ends with cycle', () => {
        const {curve} = create()
        const tikz = curve('b', {through: through(at(0, 0), at(2, 2), at(4, 0), at(2, -2)), closed: true}).tikz()

        expect(tikz.match(/\.\. controls/g)).toHaveLength(4)
        expect(tikz.endsWith('.. cycle;')).toBe(true)
    })

    test('has its appearance and its label', () => {
        const {curve} = create()
        const c = curve('b', {through: through(at(0, 0), at(4, 0))}).stroke('red')
        c.addLabel('$b$')

        expect(c.tikz()).toMatch(/^\\draw\[draw=red, line width=0.75pt\] .*;\n\\node\[above\] at \(2,0\.\d+\) \{\$b\$\};$/)
    })

    test('a curve that is hidden or does not exist writes nothing', () => {
        const {curve} = create()
        const hidden = curve('b', {through: through(at(0, 0), at(4, 0))})
        hidden.hide()

        expect(hidden.tikz()).toBe('')
        expect(curve('c', {through: through(at(0, 0), {x: NaN, y: NaN})}).tikz()).toBe('')
    })
})
