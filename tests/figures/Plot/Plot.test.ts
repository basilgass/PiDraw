import {describe, expect, test} from 'vitest'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import type {IPlotConfig} from '../../../src/figures/Plot/Plot.types'
import {InvalidArgumentError, ParseError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const plot = (name: string, values: IPlotConfig) => new Plot(context, name, values)

    return {context, point, plot}
}

/** The points of the path of a plot, as [x, y] in pixels. A new piece is marked by `null`. */
function pathOf(plot: Plot): ([number, number] | null)[] {
    const d = plot.shape.attr('d') as string
    const result: ([number, number] | null)[] = []
    const tokens = d.split(' ')

    for (let i = 0; i < tokens.length; i += 3) {
        if (tokens[i] === 'M' && i > 0) {
            result.push(null)
        }

        result.push([+tokens[i + 1], +tokens[i + 2]])
    }

    return result
}

const pointsOf = (plot: Plot) => pathOf(plot).filter((p): p is [number, number] => p !== null)

describe('Plot given by an expression', () => {
    test('a line is two points', () => {
        const {plot} = create()
        const p = plot('f', {expression: '2x+1'})

        expect(pointsOf(p)).toHaveLength(2)
        expect(pointsOf(p)[0][1]).toBeGreaterThan(pointsOf(p)[1][1])
    })

    test('a parabola has points on the real curve, a lot fewer than pixels', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x^2'})
        const points = pointsOf(p)

        expect(points.length).toBeGreaterThan(20)
        expect(points.length).toBeLessThan(150)

        for (const [x, y] of points) {
            const u = (x - 400) / 50
            if (y > 0 && y < 600) {
                expect(y).toBeCloseTo(300 - 50 * u * u, 0)
            }
        }
    })

    test('the numbers of the path have 2 decimals at most', () => {
        const {plot} = create()
        const d = plot('f', {expression: 'sin(x)'}).shape.attr('d') as string

        expect(d).not.toMatch(/\d\.\d{3}/)
    })

    test('only what is seen is drawn: the curve stops one unit after the drawing', () => {
        const {plot} = create()
        const points = pointsOf(plot('f', {expression: 'x'}))

        expect(points[0][0]).toBeCloseTo(400 - 400 - 50, 6)
        expect(points[points.length - 1][0]).toBeCloseTo(850, 6)
    })

    test('the domain limits the curve', () => {
        const {plot} = create()
        const points = pointsOf(plot('f', {expression: 'x', domain: {min: -2, max: 3}}))

        expect(points[0][0]).toBeCloseTo(at(-2, 0).x, 6)
        expect(points[points.length - 1][0]).toBeCloseTo(at(3, 0).x, 6)
    })

    test('a domain that is not seen draws nothing', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x', domain: {min: 100, max: 200}})

        expect(p.shape.attr('d')).toBe('M 0 0')
    })

    test('the image cuts the curve where the function is out of it', () => {
        const {plot} = create()
        const points = pointsOf(plot('f', {expression: 'x', image: {min: -1, max: 2}}))

        expect(Math.min(...points.map(p => p[1]))).toBeGreaterThanOrEqual(at(0, 2).y - 1e-6)
        expect(Math.max(...points.map(p => p[1]))).toBeLessThanOrEqual(at(0, -1).y + 1e-6)
    })

    test('the function is cut where it is not defined, and reaches the edge', () => {
        const {plot} = create()
        const points = pointsOf(plot('f', {expression: 'sqrt(x)'}))

        expect(points[0][0]).toBeCloseTo(400, 0)
        expect(points[0][1]).toBeCloseTo(300, 0)
    })

    test('an asymptote cuts the curve into pieces', () => {
        const {plot} = create()
        const path = pathOf(plot('f', {expression: '1/x'}))

        expect(path.filter(p => p === null).length).toBeGreaterThanOrEqual(1)
    })

    test('samples, tolerance and maxDepth change the number of points', () => {
        const {plot} = create()
        const base = pointsOf(plot('a', {expression: 'sin(3x)'})).length

        expect(pointsOf(plot('b', {expression: 'sin(3x)', tolerance: 0.01})).length).toBeGreaterThan(base)
        expect(pointsOf(plot('c', {expression: 'sin(3x)', tolerance: 5})).length).toBeLessThan(base)
        expect(pointsOf(plot('d', {expression: 'sin(3x)', samples: 1, maxDepth: 0, tolerance: 0.01})).length).toBeLessThanOrEqual(20)
    })

    test('asymptoteThreshold bounds the curve: a point farther than it is not drawn', () => {
        const {plot} = create()
        const points = pointsOf(plot('f', {expression: '1000x', asymptoteThreshold: 1}))

        expect(points.every(p => Math.abs(p[1]) <= 600)).toBe(true)
    })

    test('evaluate gives a point in pixels and valueAt a value in units', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x^2'})

        expect(p.valueAt(3)).toBe(9)
        expect(p.evaluate(3)).toEqual(at(3, 9))
        expect(p.valueAt(-2)).toBe(4)
    })

    test('follow gives the point of the curve above a position', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x^2'})

        expect(p.follow(at(2, 7).x, at(2, 7).y)).toEqual(at(2, 4))
    })

    test('the function is NaN where it is not defined', () => {
        const {plot} = create()

        expect(plot('f', {expression: 'sqrt(x)'}).valueAt(-1)).toBeNaN()
    })

    test('the numExp is the function', () => {
        const {plot} = create()

        expect(plot('f', {expression: 'x+1'}).numExp.evaluate({x: 2})).toBe(3)
    })
})

describe('Plot given by three points', () => {
    test('is the parabola through them', () => {
        const {plot} = create()
        const p = plot('f', {quadratic: {A: at(0, 1), B: at(1, 3), C: at(2, 9)}})

        expect(p.valueAt(0)).toBeCloseTo(1, 6)
        expect(p.valueAt(1)).toBeCloseTo(3, 6)
        expect(p.valueAt(2)).toBeCloseTo(9, 6)
    })

    test('is a line if the points are aligned', () => {
        const {plot} = create()
        const p = plot('f', {quadratic: {A: at(0, 1), B: at(1, 3), C: at(2, 5)}})

        expect(p.valueAt(3)).toBeCloseTo(7, 6)
        expect(pointsOf(p)).toHaveLength(2)
    })

    test('follows its points', () => {
        const {plot, point} = create()
        const A = point('A', 0, 1)
        const B = point('B', 1, 3)
        const C = point('C', 2, 9)
        const p = plot('f', {quadratic: {A, B, C}})

        C.config = {coordinates: {x: 2, y: 5}}
        p.update(true)

        expect(p.valueAt(2)).toBeCloseTo(5, 6)
        expect(p.valueAt(3)).toBeCloseTo(7, 6)
    })

    test('does not exist if two points have the same abscissa: it is not drawn, and comes back', () => {
        const {plot, point} = create()
        const A = point('A', 0, 1)
        const B = point('B', 1, 3)
        const C = point('C', 1, 9)
        const p = plot('f', {quadratic: {A, B, C}})

        expect(p.element.attr('visibility')).toBe('hidden')
        expect(p.shape.attr('d')).toBe('M 0 0')
        expect(p.valueAt(0)).toBeNaN()

        C.config = {coordinates: {x: 2, y: 9}}
        p.update(true)

        expect(p.element.attr('visibility')).toBeFalsy()
        expect(p.valueAt(2)).toBeCloseTo(9, 6)
    })

    test('options go with it', () => {
        const {plot} = create()
        const p = plot('f', {quadratic: {A: at(0, 1), B: at(1, 3), C: at(2, 9)}, domain: {min: 0, max: 2}})

        expect(pointsOf(p)[0][0]).toBeCloseTo(at(0, 0).x, 6)
    })
})

describe('Plot that is not valid', () => {
    test.each([
        ['no construction', {}],
        ['two constructions', {expression: 'x', quadratic: {A: at(0, 0), B: at(1, 1), C: at(2, 4)}}],
        ['a variable other than x', {expression: 'x+t'}],
        ['a samples of 0', {expression: 'x', samples: 0}],
        ['a samples that is negative', {expression: 'x', samples: -5}],
        ['a samples that is not a number', {expression: 'x', samples: NaN}],
        ['a domain that is infinite', {expression: 'x', domain: {min: -Infinity, max: 3}}],
        ['a domain with min > max', {expression: 'x', domain: {min: 3, max: -3}}],
        ['an image with NaN', {expression: 'x', image: {min: NaN, max: 3}}],
        ['a tolerance of 0', {expression: 'x', tolerance: 0}],
        ['a maxDepth that is not an integer', {expression: 'x', maxDepth: 2.5}],
        ['an asymptoteThreshold of 0', {expression: 'x', asymptoteThreshold: 0}],
        ['a point that is not a position', {quadratic: {A: 3 as never, B: at(1, 1), C: at(2, 4)}}]
    ] as [string, IPlotConfig][])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const {context, plot} = create()

        expect(() => plot('f', config)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test.each([
        ['an empty expression', ''],
        ['an expression that is not valid', 'x+'],
        ['an expression with a character that is not known', 'x$2']
    ])('%s is a ParseError, and nothing is left in the svg', (_, expression) => {
        const {context, plot} = create()

        expect(() => plot('f', {expression})).toThrow(ParseError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test('a config that is not valid leaves the plot as it was', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x^2'})
        const path = p.shape.attr('d') as string

        expect(() => {
            p.config = {expression: 'x+', samples: 5}
        }).toThrow(ParseError)
        expect(() => {
            p.config = {expression: 'x', samples: -1}
        }).toThrow(InvalidArgumentError)
        expect(p.shape.attr('d')).toBe(path)
        expect(p.valueAt(3)).toBe(9)
    })

    test('a new config draws the plot again', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x^2'})

        p.config = {expression: 'x+1', domain: {min: 0, max: 1}}

        expect(p.valueAt(3)).toBe(4)
        expect(pointsOf(p)[0][0]).toBeCloseTo(at(0, 0).x, 6)
    })

    test('the config is a copy: changing the object that was given does not change the plot', () => {
        const {plot} = create()
        const values: IPlotConfig = {expression: 'x'}
        const p = plot('f', values)

        values.domain = {min: 0, max: 1}

        expect(p.config.domain).toBeUndefined()
    })
})

describe('Plot label', () => {
    test('is at the end of the curve that is seen, under a curve that rises', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x', domain: {min: -2, max: 3}})
        const label = p.addLabel('f')

        expect(label.config.alignement).toBe('bl')
        expect(label.x).toBeLessThan(at(3, 3).x)
        expect(label.y).toBeGreaterThan(at(3, 3).y)
    })

    test('is over a curve that falls', () => {
        const {plot} = create()
        const label = plot('f', {expression: '-x', domain: {min: -2, max: 3}}).addLabel('f')

        expect(label.config.alignement).toBe('tl')
    })

    test('is inside of the drawing even when the curve goes on beyond', () => {
        const {plot} = create()
        const label = plot('f', {expression: '0.1x'}).addLabel('f')

        expect(label.x).toBeLessThan(800)
        expect(label.x).toBeGreaterThan(700)
    })

    test('keeps the alignment that was asked for when the plot is drawn again', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x'})
        const label = p.addLabel('f')
        label.position('tr')

        p.config = {expression: '2x'}

        expect(label.alignementGiven).toBe(true)
        expect(label.config.alignement).toBe('tr')
    })

    test('a plot that is not seen, or does not exist, leaves its label where it was', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'x+100'})

        expect(() => p.addLabel('f')).not.toThrow()
    })
})

// The TikZ code is a pgfplots axis that has the units of the coordinate system (50 pixels = 37.5pt), and the function in it.
describe('Plot TikZ', () => {
    test('is an axis that covers the drawing, with the function and its appearance', () => {
        const {plot} = create()
        const tikz = plot('f', {expression: 'x^2'}).stroke('red').tikz()

        expect(tikz).toContain('\\begin{axis}[hide axis, scale only axis, trig format plots=deg, unbounded coords=jump, x=37.5pt, y=37.5pt, at={(-300pt,-225pt)}, anchor=south west, xmin=-8, xmax=8, ymin=-6, ymax=6, restrict y to domain=-18:18]')
        expect(tikz).toContain('\\addplot[domain=-9:9, samples=451, draw=pidraw-red, line width=0.75pt] {(x^2)};')
        expect(tikz).toContain('\\end{axis}')
    })

    test('the function is written for pgf: angles in degrees', () => {
        const {plot} = create()

        expect(plot('f', {expression: 'sin(3x)'}).tikz()).toContain('{sin(deg((3*x)))};')
    })

    test('the domain and the image limit what is drawn', () => {
        const {plot} = create()
        const tikz = plot('f', {expression: 'x', domain: {min: -2, max: 3}, image: {min: -1, max: 2}}).tikz()

        expect(tikz).toContain('domain=-2:3')
        expect(tikz).toContain('restrict y to domain=-1:2')
    })

    test('a parabola through three points is written with its expression', () => {
        const {plot} = create()
        const tikz = plot('f', {quadratic: {A: at(0, 1), B: at(1, 3), C: at(2, 9)}}).tikz()

        expect(tikz).toMatch(/\{\(\(2\*\(x\^2\)\)\+1\)\};/)
    })

    test('a dash pattern is written', () => {
        const {plot} = create()

        expect(plot('f', {expression: 'x'}).dash('4 2').tikz()).toContain('dash pattern=on 3pt off 1.5pt')
    })

    test('the label is a node, after the axis', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'sqrt(x)'})
        p.addLabel('$f$')

        expect(p.tikz()).toMatch(/\\end\{axis\}\n\\node\[below left\] at \([\d.]+,[\d.]+\) \{\$f\$\};$/)
    })

    test('only the label with ! and only the axis with ?', () => {
        const {plot} = create()
        const p = plot('f', {expression: 'sqrt(x)'})
        p.addLabel('f')

        p.shape.hide()
        expect(p.tikz()).not.toContain('axis')
        expect(p.tikz()).toContain('\\node')

        p.shape.show()
        p.label?.hide()
        expect(p.tikz()).toContain('\\addplot')
        expect(p.tikz()).not.toContain('\\node')
    })

    test.each([
        ['a plot that is hidden', (p: Plot) => p.hide()],
        ['a domain that is not seen', (p: Plot) => { p.config = {expression: 'x', domain: {min: 100, max: 200}} }],
        ['an image that is out of what is seen', (p: Plot) => { p.config = {expression: 'x', image: {min: 100, max: 200}} }]
    ])('%s writes nothing', (_, change) => {
        const {plot} = create()
        const p = plot('f', {expression: 'x'})
        change(p)

        expect(p.tikz()).toBe('')
    })

    test('a plot that does not exist writes nothing', () => {
        const {plot, point} = create()
        const p = plot('f', {quadratic: {A: point('A', 0, 1), B: point('B', 1, 3), C: point('C', 1, 9)}})

        expect(p.tikz()).toBe('')
    })

    test('a fill has no equivalent: InvalidArgumentError', () => {
        const {plot} = create()

        expect(() => plot('f', {expression: 'x'}).fill('blue').tikz()).toThrow(InvalidArgumentError)
    })
})
