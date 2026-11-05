import {describe, expect, test} from 'vitest'
import {Parametric} from '../../../src/figures/Parametric/Parametric'
import type {IParametricConfig} from '../../../src/figures/Parametric/Parametric.types'
import {InvalidArgumentError, ParseError} from '../../../src/errors'
import {createContext} from '../../helpers/figure'

// 800 x 600 pixels, 50 pixels per unit, the origin in the middle (400, 300), y pointing up.
function create() {
    const context = createContext()
    const curve = (name: string, values: IParametricConfig) => new Parametric(context, name, values)

    return {context, curve}
}

const circle = (extra: Partial<IParametricConfig> = {}): IParametricConfig => ({expressions: {x: 'cos(t)', y: 'sin(t)'}, ...extra})

/** The pieces of the path of a curve, each one a list of [x, y] in pixels. */
function piecesOf(curve: Parametric): [number, number][][] {
    const d = curve.shape.attr('d') as string
    const pieces: [number, number][][] = []
    const tokens = d.split(' ')

    for (let i = 0; i < tokens.length; i += 3) {
        if (tokens[i] === 'M') {
            pieces.push([])
        }

        pieces[pieces.length - 1].push([+tokens[i + 1], +tokens[i + 2]])
    }

    return pieces
}

const pointsOf = (curve: Parametric) => piecesOf(curve).flat()

describe('Parametric curve', () => {
    test('a circle has all its points on the circle, with far fewer points than pixels', () => {
        const {curve} = create()
        const points = pointsOf(curve('c', circle({domain: {min: 0, max: 2 * Math.PI}})))

        expect(points.length).toBeGreaterThan(8)
        expect(points.length).toBeLessThan(120)

        for (const [x, y] of points) {
            expect(Math.hypot(x - 400, y - 300)).toBeCloseTo(50, 1)
        }
    })

    test('the domain is from 0 to 2 pi by default: one turn, closed', () => {
        const {curve} = create()
        const points = pointsOf(curve('c', circle()))

        expect(points[0][0]).toBeCloseTo(450, 1)
        expect(points[0][1]).toBeCloseTo(300, 1)
        // The end is included: the circle is closed.
        expect(points[points.length - 1][0]).toBeCloseTo(450, 1)
        expect(points[points.length - 1][1]).toBeCloseTo(300, 1)
    })

    test('the domain limits the curve, and its end is included', () => {
        const {curve} = create()
        const points = pointsOf(curve('c', circle({domain: {min: 0, max: Math.PI / 2}})))

        expect(points[0][0]).toBeCloseTo(450, 1)
        expect(points[points.length - 1][0]).toBeCloseTo(400, 1)
        expect(points[points.length - 1][1]).toBeCloseTo(250, 1)
    })

    test('a line is two points', () => {
        const {curve} = create()
        const points = pointsOf(curve('l', {expressions: {x: 't', y: '2t+1'}, domain: {min: -3, max: 3}}))

        expect(points).toHaveLength(2)
        expect(points[0][0]).toBeCloseTo(400 - 150, 1)
        expect(points[1][1]).toBeCloseTo(300 - 350, 1)
    })

    test('a curve that goes fast is followed', () => {
        const {curve} = create()
        const fast = curve('f', {expressions: {x: 't', y: 'sin(10t)'}, domain: {min: -4, max: 4}})
        const points = pointsOf(fast)

        for (const [x, y] of points) {
            expect(y).toBeCloseTo(300 - 50 * Math.sin(10 * (x - 400) / 50), 0)
        }

        expect(points.length).toBeGreaterThan(100)
    })

    test('where a function is not defined the curve is cut, and the path has no NaN', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: 'sqrt(t)'}, domain: {min: -4, max: 4}})
        const d = c.shape.attr('d') as string

        expect(d).not.toContain('NaN')
        expect(pointsOf(c)[0][0]).toBeCloseTo(400, 0)
        expect(pointsOf(c)[0][1]).toBeCloseTo(300, 0)
    })

    test('an asymptote cuts the curve into pieces', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: '1/t'}, domain: {min: -4, max: 4}})

        expect(piecesOf(c).length).toBeGreaterThanOrEqual(2)
        expect(c.shape.attr('d')).not.toContain('NaN')
    })

    test('a curve that is not defined anywhere draws nothing', () => {
        const {curve} = create()

        expect(curve('c', {expressions: {x: 'sqrt(-1-t^2)', y: 't'}}).shape.attr('d')).toBe('M 0 0')
    })

    test('samples, tolerance and maxDepth change the number of points', () => {
        const {curve} = create()
        const base = pointsOf(curve('a', circle({domain: {min: 0, max: 2 * Math.PI}}))).length

        expect(pointsOf(curve('b', circle({tolerance: 0.01}))).length).toBeGreaterThan(base)
        expect(pointsOf(curve('c', circle({tolerance: 5}))).length).toBeLessThan(base)
        expect(pointsOf(curve('d', circle({samples: 2, maxDepth: 0, tolerance: 0.01}))).length).toBeLessThanOrEqual(15)
    })

    test('the samples start the curve: a few of them can miss what a thin curve does', () => {
        const {curve} = create()
        const spike = (samples: number) => pointsOf(curve(`s${samples}`, {
            expressions: {x: 't', y: 'sin(40t)'}, domain: {min: -2, max: 2}, samples, maxDepth: 0
        })).length

        expect(spike(60)).toBeGreaterThan(spike(2))
    })

    test('valueAt gives a point in units and evaluate a point in pixels', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: 't^2'}})

        expect(c.valueAt(3)).toEqual({x: 3, y: 9})
        expect(c.evaluate(3)).toEqual({x: 400 + 150, y: 300 - 450})
        expect(curve('d', {expressions: {x: 'sqrt(t)', y: 't'}}).valueAt(-1).x).toBeNaN()
    })
})

describe('Parametric curve that is not valid', () => {
    test.each([
        ['a function of x that is not text', {expressions: {x: 3 as never, y: 't'}}],
        ['a variable other than t', {expressions: {x: 't', y: 'x'}}],
        ['no functions', {} as never],
        ['a samples of 0', circle({samples: 0})],
        ['a samples that is negative', circle({samples: -2})],
        ['a domain that is infinite', circle({domain: {min: 0, max: Infinity}})],
        ['a domain with min > max', circle({domain: {min: 3, max: 1}})],
        ['a tolerance of 0', circle({tolerance: 0})],
        ['a maxDepth that is not an integer', circle({maxDepth: 1.5})],
        ['an asymptoteThreshold of 0', circle({asymptoteThreshold: 0})]
    ] as [string, IParametricConfig][])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const {context, curve} = create()

        expect(() => curve('c', config)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test.each([
        ['an empty function', {expressions: {x: '', y: 't'}}],
        ['a function that is not valid', {expressions: {x: 't', y: 'cos('}}],
        ['a character that is not known', {expressions: {x: 't$', y: 't'}}]
    ])('%s is a ParseError, and nothing is left in the svg', (_, config) => {
        const {context, curve} = create()

        expect(() => curve('c', config)).toThrow(ParseError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test('a new config compiles the functions again and draws the curve again', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: 't'}, domain: {min: 0, max: 1}})

        c.config = {expressions: {x: 't', y: '2t'}, domain: {min: 0, max: 1}}

        expect(c.valueAt(1)).toEqual({x: 1, y: 2})
        expect(pointsOf(c)[1][1]).toBeCloseTo(300 - 100, 1)
    })

    test('a config that is not valid leaves the curve as it was', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: 't^2'}})
        const path = c.shape.attr('d') as string

        expect(() => {
            c.config = {expressions: {x: 't', y: 't+'}}
        }).toThrow(ParseError)
        expect(() => {
            c.config = {expressions: {x: 't', y: 't'}, samples: -1}
        }).toThrow(InvalidArgumentError)
        expect(c.shape.attr('d')).toBe(path)
        expect(c.valueAt(2).y).toBe(4)
    })

    test('the config is a copy: changing the object that was given does not change the curve', () => {
        const {curve} = create()
        const values = circle()
        const c = curve('c', values)

        values.expressions.x = 'nothing'
        values.domain = {min: 0, max: 1}

        expect(c.config.expressions.x).toBe('cos(t)')
        expect(c.config.domain).toBeUndefined()
    })
})

describe('Parametric curve label', () => {
    test('is at the end of the curve, on the left of the way it goes', () => {
        const {curve} = create()
        // A line that goes to the right: the left of the way is above.
        const label = curve('c', {expressions: {x: 't', y: '0'}, domain: {min: -2, max: 2}}).addLabel('c')

        expect(label.x).toBeCloseTo(500, 1)
        expect(label.y).toBeCloseTo(300 - 8, 1)
        expect(label.config.alignement).toBe('tc')
    })

    test('follows the way the curve goes', () => {
        const {curve} = create()
        // A line that goes up: the left of the way is to the left of the screen.
        const label = curve('c', {expressions: {x: '0', y: 't'}, domain: {min: -2, max: 2}}).addLabel('c')

        expect(label.x).toBeCloseTo(400 - 8, 1)
        expect(label.y).toBeCloseTo(200, 1)
        expect(label.config.alignement).toBe('ml')
    })

    test('is at the end that is seen when the curve goes beyond the drawing', () => {
        const {curve} = create()
        const label = curve('c', {expressions: {x: '10t', y: '0'}, domain: {min: 0, max: 100}}).addLabel('c')

        expect(label.x).toBeLessThanOrEqual(800)
        expect(label.x).toBeGreaterThan(700)
    })

    test('keeps the alignment that was asked for when the curve is drawn again', () => {
        const {curve} = create()
        const c = curve('c', circle())
        const label = c.addLabel('c')
        label.position('tr')

        c.config = circle({domain: {min: 0, max: 1}})

        expect(label.alignementGiven).toBe(true)
        expect(label.config.alignement).toBe('tr')
    })

    test('a curve that is not seen leaves its label where it was', () => {
        const {curve} = create()

        expect(() => curve('c', {expressions: {x: 't+1000', y: 't'}}).addLabel('c')).not.toThrow()
    })
})

// The TikZ code is a pgfplots axis that has the units of the coordinate system (50 pixels = 37.5pt), and the curve in it.
describe('Parametric curve TikZ', () => {
    test('is an axis that covers the drawing, with the curve as a point of x', () => {
        const {curve} = create()
        const tikz = curve('c', circle({domain: {min: 0, max: 2 * Math.PI}})).stroke('red').tikz()

        expect(tikz).toContain('\\begin{axis}[hide axis, scale only axis, trig format plots=deg, unbounded coords=jump, x=37.5pt, y=37.5pt, at={(-300pt,-225pt)}, anchor=south west, xmin=-8, xmax=8, ymin=-6, ymax=6, restrict x to domain=-24:24, restrict y to domain=-18:18]')
        expect(tikz).toContain('\\addplot[domain=0:6.28319, samples=')
        expect(tikz).toContain('draw=pidraw-red, line width=0.75pt] ({cos(deg(x))}, {sin(deg(x))});')
        expect(tikz).toContain('\\end{axis}')
    })

    test('the variable is written x whatever it is called', () => {
        const {curve} = create()

        expect(curve('c', {expressions: {x: 't^2', y: 't+1'}}).tikz()).toContain('({(x^2)}, {(x+1)});')
    })

    test('the label is a node, after the axis', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: '0'}, domain: {min: -2, max: 2}})
        c.addLabel('$c$')

        expect(c.tikz()).toMatch(/\\end\{axis\}\n\\node\[above\] at \([\d.]+,[\d.]+\) \{\$c\$\};$/)
    })

    test('a curve that is hidden writes nothing', () => {
        const {curve} = create()
        const c = curve('c', circle())
        c.hide()

        expect(c.tikz()).toBe('')
    })

    test('a fill has no equivalent: InvalidArgumentError', () => {
        const {curve} = create()

        expect(() => curve('c', circle()).fill('blue').tikz()).toThrow(InvalidArgumentError)
    })
})

describe('Parametric curve follow', () => {
    test('is followable', () => {
        const {curve} = create()

        expect(curve('c', circle()).followable).toBe(true)
    })

    test('gives the point of the curve that is the closest to a position', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: '2cos(t)', y: '2sin(t)'}})
        const found = c.follow(400 + 300, 300)

        expect(found.x).toBeCloseTo(500, 0)
        expect(found.y).toBeCloseTo(300, 0)
    })

    test('does not join the pieces of a curve that is cut', () => {
        const {curve} = create()
        const c = curve('c', {expressions: {x: 't', y: '1/t'}, domain: {min: -4, max: 4}})
        const found = c.follow(400, 0)

        // Far above the asymptote, the closest point is one of the piece on the right, not a point on the line between the two pieces.
        expect(found.x).toBeGreaterThan(400)
    })

    test('gives nothing for a curve that does not exist', () => {
        const {curve} = create()

        expect(curve('c', {expressions: {x: 'sqrt(-1-t^2)', y: 't'}}).follow(1, 1).x).toBeNaN()
    })
})
