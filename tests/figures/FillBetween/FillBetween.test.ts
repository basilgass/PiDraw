import {describe, expect, test} from 'vitest'
import {FillBetween} from '../../../src/figures/FillBetween/FillBetween'
import type {IFillBetweenConfig} from '../../../src/figures/FillBetween/FillBetween.types'
import {Plot} from '../../../src/figures/Plot/Plot'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    let count = 0
    const plot = (expression: string, domain?: { min: number, max: number }) =>
        new Plot(context, `f${++count}`, {expression, ...(domain === undefined ? {} : {domain})})
    const fill = (values: IFillBetweenConfig, name = 'z') => new FillBetween(context, name, values)

    return {context, plot, fill}
}

const pathOf = (fill: FillBetween) => fill.shape.attr('d') as string

/** The points of a path of straight lines. */
function pointsOf(fill: FillBetween): XY[] {
    return [...pathOf(fill).matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map(([, x, y]) => ({x: +x, y: +y}))
}

describe('FillBetween to the x axis', () => {
    test('is closed along the axis', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x', {min: 0, max: 2})})

        expect(pathOf(z)).toBe('M 400 300 L 500 200 L 500 300 L 400 300 Z')
    })

    test('under the axis, goes down from it', () => {
        const c = create()
        const z = c.fill({plot: c.plot('-x', {min: 0, max: 2})})

        expect(pathOf(z)).toBe('M 400 300 L 500 400 L 500 300 L 400 300 Z')
    })

    test('has the area under the curve', () => {
        const c = create()

        expect(c.fill({plot: c.plot('x', {min: 0, max: 2})}).area).toBeCloseTo(2, 6)
        expect(c.fill({plot: c.plot('x^2', {min: 0, max: 3})}).area).toBeCloseTo(9, 1)
    })
})

describe('FillBetween two plots', () => {
    test('has the area between them', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x'), other: c.plot('x^2'), domain: {min: 0, max: 1}})

        expect(z.area).toBeCloseTo(1 / 6, 2)
    })

    test('the order of the plots does not change the area', () => {
        const c = create()
        const a = c.plot('x')
        const b = c.plot('x^2')

        expect(c.fill({plot: a, other: b, domain: {min: 0, max: 1}}).area)
            .toBeCloseTo(c.fill({plot: b, other: a, domain: {min: 0, max: 1}}, 'y').area, 9)
    })

    test('where they cross, both sides count', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x'), other: c.plot('-x'), domain: {min: -1, max: 1}})

        // Two triangles of 1 x 2 / 2 each.
        expect(z.area).toBeCloseTo(2, 6)
    })

    test('follows its plots when they change', () => {
        const c = create()
        const plot = c.plot('x', {min: 0, max: 2})
        const z = c.fill({plot})

        plot.config = {expression: '2*x', domain: {min: 0, max: 2}}
        z.computed()

        expect(z.area).toBeCloseTo(4, 6)
    })
})

describe('FillBetween domain', () => {
    test('is the one of the config', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x', {min: 0, max: 4}), domain: {min: 1, max: 2}})

        expect(pointsOf(z)[0].x).toBeCloseTo(at(1, 0).x, 6)
        expect(z.area).toBeCloseTo(1.5, 6)
    })

    test('is the one of the plot by default', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x', {min: 1, max: 3})})

        expect(z.area).toBeCloseTo(4, 6)
    })

    test('is where both plots are drawn: the part that they have in common', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x', {min: 0, max: 4}), other: c.plot('0', {min: 1, max: 5})})

        expect(z.area).toBeCloseTo(7.5, 6)
    })

    test('is what is seen when nothing gives one', () => {
        const c = create()
        const z = c.fill({plot: c.plot('1')})

        // 18 units: the 16 that are seen, and a unit to spare on each side.
        expect(z.area).toBeCloseTo(18, 6)
        expect(pointsOf(z)[0].x).toBeCloseTo(at(-9, 0).x, 6)
    })

    test('is cut where the plot does not exist', () => {
        const c = create()
        const z = c.fill({plot: c.plot('sqrt(x)', {min: -2, max: 1})})

        expect(z.area).toBeCloseTo(2 / 3, 1)
    })

    test('does not keep the domain object that it was given', () => {
        const c = create()
        const domain = {min: 0, max: 1}
        const z = c.fill({plot: c.plot('x'), domain})

        domain.max = 100

        expect(z.config.domain).toEqual({min: 0, max: 1})
    })
})

describe('FillBetween that is not drawn', () => {
    test('is hidden, with no area, when the plot does not exist', () => {
        const c = create()
        const plot = new Plot(c.context, 'g', {quadratic: {A: at(0, 0), B: at(0, 1), C: at(1, 1)}})
        const z = c.fill({plot, domain: {min: 0, max: 2}})

        expect(z.area).toBeNaN()
        expect(z.element.attr('visibility')).toBe('hidden')
        expect(pathOf(z)).toBe('M 0 0')
    })

    test('is drawn again when the plot comes back', () => {
        const c = create()
        const plot = c.plot('x')
        const z = c.fill({plot, domain: {min: 0, max: 1}})

        plot.config = {quadratic: {A: at(0, 0), B: at(0, 1), C: at(1, 1)}}
        z.computed()
        expect(z.element.attr('visibility')).toBe('hidden')

        plot.config = {expression: 'x'}
        z.computed()
        expect(z.element.attr('visibility')).not.toBe('hidden')
    })
})

describe('FillBetween that is not valid', () => {
    test.each([
        ['a domain with its minimum over its maximum', {domain: {min: 3, max: 1}}],
        ['an empty domain', {domain: {min: 1, max: 1}}],
        ['a domain that is not finite', {domain: {min: 0, max: Infinity}}]
    ])('%s is an InvalidArgumentError, and the area is left as it was', (_, values) => {
        const c = create()
        const plot = c.plot('x')
        const z = c.fill({plot, domain: {min: 0, max: 1}})
        const path = pathOf(z)

        expect(() => c.fill({plot, ...values}, 'y')).toThrow(InvalidArgumentError)
        expect(() => {
            z.config = {plot, ...values}
        }).toThrow(InvalidArgumentError)
        expect(pathOf(z)).toBe(path)
    })

    test('plots that have no abscissa in common are an InvalidArgumentError', () => {
        const c = create()

        expect(() => c.fill({plot: c.plot('x', {min: 0, max: 1}), other: c.plot('x', {min: 2, max: 3})})).toThrow(InvalidArgumentError)
    })

    test('a figure that is not a plot is an InvalidArgumentError', () => {
        const c = create()

        expect(() => c.fill({plot: undefined as unknown as Plot})).toThrow(InvalidArgumentError)
        expect(() => c.fill({plot: c.plot('x'), other: {} as unknown as Plot})).toThrow(InvalidArgumentError)
    })
})

describe('FillBetween label', () => {
    test('shows the area with the given decimals', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x^2', {min: 0, max: 3})})
        z.addLabel(['A = ', {field: 'area', digits: 1}])

        expect(z.computeLabel()).toBe('A = 9')
    })

    test('is at the middle of the box of the area', () => {
        const c = create()
        const label = c.fill({plot: c.plot('x', {min: 0, max: 2})}).addLabel('z')

        expect(label.x).toBeCloseTo(at(1, 1).x, 6)
        expect(label.y).toBeCloseTo(at(1, 1).y, 6)
        expect(label.config.alignement).toBe('mc')
    })

    test('keeps the alignment that was asked for', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x')})
        const label = z.addLabel('z')
        label.position('tl')

        z.updateLabel()

        expect(label.config.alignement).toBe('tl')
    })

    test('does not offer a field that another figure has', () => {
        const c = create()

        expect(() => c.fill({plot: c.plot('x')}).addLabel([{field: 'sum', digits: 1}])).toThrow(InvalidArgumentError)
    })
})

describe('FillBetween TikZ', () => {
    test('is the area between a plot and the x axis', () => {
        const c = create()
        const tikz = c.fill({plot: c.plot('x^2', {min: 0, max: 2})}).tikz()

        expect(tikz).toContain('\\begin{axis}')
        expect(tikz).toContain('\\addplot[name path=pidraw-z-1, draw=none, domain=0:2, samples=')
        expect(tikz).toContain('{(x^2)};')
        expect(tikz).toContain('\\path[name path=pidraw-z-2] (axis cs:0,0) -- (axis cs:2,0);')
        expect(tikz).toContain('fill between[of=pidraw-z-1 and pidraw-z-2];')
    })

    test('is the area between two plots', () => {
        const c = create()
        const tikz = c.fill({plot: c.plot('x'), other: c.plot('x^2'), domain: {min: 0, max: 1}}).tikz()

        expect(tikz).toContain('name path=pidraw-z-1')
        expect(tikz).toContain('\\addplot[name path=pidraw-z-2, draw=none, domain=0:1')
        expect(tikz).not.toContain('\\path[name path')
    })

    test('has the color and the fill of the figure', () => {
        const c = create()
        const tikz = c.fill({plot: c.plot('x', {min: 0, max: 1})}).stroke('red').fill({color: 'green', opacity: 0.4}).tikz()

        expect(tikz).toContain('\\addplot[draw=red, ')
        expect(tikz).toContain('fill=green, fill opacity=0.4')
    })

    test('the label is a node at the middle', () => {
        const c = create()
        const z = c.fill({plot: c.plot('x', {min: 0, max: 2})})
        z.addLabel('$z$')

        expect(z.tikz()).toMatch(/\n\\node at \(1,1\) \{\$z\$\};$/)
    })

    test('is nothing when the area is hidden or not drawn', () => {
        const c = create()
        const plot = new Plot(c.context, 'g', {quadratic: {A: at(0, 0), B: at(0, 1), C: at(1, 1)}})

        expect(c.fill({plot, domain: {min: 0, max: 2}}).tikz()).toBe('')
        expect(c.fill({plot: c.plot('x')}, 'y').hide().tikz()).toBe('')
    })
})
