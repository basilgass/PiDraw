import {describe, expect, test} from 'vitest'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Riemann} from '../../../src/figures/Riemann/Riemann'
import type {IRiemannConfig} from '../../../src/figures/Riemann/Riemann.types'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    const plot = (expression: string, domain?: { min: number, max: number }) =>
        new Plot(context, 'f', {expression, ...(domain === undefined ? {} : {domain})})
    const riemann = (values: IRiemannConfig, name = 'r') => new Riemann(context, name, values)

    return {context, plot, riemann}
}

const line = (create_: ReturnType<typeof create>) => create_.plot('x', {min: 0, max: 4})
const pathOf = (riemann: Riemann) => riemann.shape.attr('d') as string

describe('Riemann sum', () => {
    test('has 5 rectangles read at the left end by default, on the domain of the plot', () => {
        const c = create()
        const r = c.riemann({plot: line(c)})

        expect(r.rectangles).toBe(5)
        expect(r.position).toBe(0)
        expect(r.rectanglesDrawn).toHaveLength(5)
        expect(r.sum).toBeCloseTo(6.4, 9)
    })

    test.each([
        ['left', 0, 6.4],
        ['middle', 0.5, 8],
        ['right', 1, 9.6]
    ])('reads the plot at the %s of each interval', (_, position, sum) => {
        const c = create()

        expect(c.riemann({plot: line(c), position}).sum).toBeCloseTo(sum, 9)
    })

    test('draws a rectangle from the axis to the plot, for each interval', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('x'), domain: {min: 0, max: 2}, rectangles: 2, position: 1})

        expect(pathOf(r)).toBe(`M 400 300 L 450 300 L 450 250 L 400 250 Z M 450 300 L 500 300 L 500 200 L 450 200 Z`)
    })

    test('draws a rectangle under the axis from the axis down', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('-x'), domain: {min: 0, max: 2}, rectangles: 2, position: 1})

        expect(pathOf(r)).toBe(`M 400 300 L 450 300 L 450 350 L 400 350 Z M 450 300 L 500 300 L 500 400 L 450 400 Z`)
        expect(r.sum).toBeCloseTo(-3, 9)
    })

    test('the domain of the config is used instead of the one of the plot', () => {
        const c = create()
        const r = c.riemann({plot: line(c), domain: {min: 0, max: 2}, rectangles: 2, position: 0.5})

        expect(r.rectanglesDrawn.map(({x0, x1}) => [x0, x1])).toEqual([[0, 1], [1, 2]])
        expect(r.sum).toBeCloseTo(2, 9)
    })

    test('leaves out where the plot is not defined', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('sqrt(x)'), domain: {min: -2, max: 2}, rectangles: 4, position: 0.5})

        expect(r.rectanglesDrawn).toHaveLength(2)
    })

    test('is not drawn, and has no sum, when the plot does not exist', () => {
        const c = create()
        const plot = new Plot(c.context, 'g', {quadratic: {A: at(0, 0), B: at(0, 1), C: at(1, 1)}})
        const r = c.riemann({plot, domain: {min: 0, max: 2}})

        expect(r.rectanglesDrawn).toEqual([])
        expect(r.sum).toBeNaN()
        expect(r.element.attr('visibility')).toBe('hidden')
    })

    test('follows its plot when the plot changes', () => {
        const c = create()
        const plot = line(c)
        const r = c.riemann({plot, position: 0.5})

        plot.config = {expression: '2*x', domain: {min: 0, max: 4}}
        r.computed()

        expect(r.sum).toBeCloseTo(16, 9)
    })

    test('does not keep the domain object that it was given', () => {
        const c = create()
        const domain = {min: 0, max: 2}
        const r = c.riemann({plot: c.plot('x'), domain, rectangles: 2})

        domain.max = 100

        expect(r.config.domain).toEqual({min: 0, max: 2})
    })
})

describe('Riemann sum settings', () => {
    test('rectangles redraws the sum', () => {
        const c = create()
        const r = c.riemann({plot: line(c), position: 0.5})

        r.rectangles = 10

        expect(r.rectanglesDrawn).toHaveLength(10)
        expect(r.rectangles).toBe(10)
    })

    test('position redraws the sum, and reading it does not change it', () => {
        const c = create()
        const r = c.riemann({plot: line(c)})

        r.position = 1

        expect(r.position).toBe(1)
        expect(r.sum).toBeCloseTo(9.6, 9)
    })

    test('a config that replaces the old one redraws the sum and its label', () => {
        const c = create()
        const r = c.riemann({plot: line(c)})
        r.addLabel([{field: 'sum', digits: 1}])

        r.config = {plot: line(c), position: 0.5}

        expect(r.computeLabel()).toBe('8')
    })

    test.each([
        ['no rectangle', {rectangles: 0}],
        ['a number of rectangles that is not an integer', {rectangles: 2.5}],
        ['more than 1000 rectangles', {rectangles: 1001}],
        ['a position under 0', {position: -0.1}],
        ['a position over 1', {position: 1.5}],
        ['a position that is not a number', {position: NaN}],
        ['a domain with its minimum over its maximum', {domain: {min: 3, max: 1}}],
        ['an empty domain', {domain: {min: 1, max: 1}}],
        ['a domain that is not finite', {domain: {min: 0, max: Infinity}}]
    ])('%s is an InvalidArgumentError, and the sum is left as it was', (_, values) => {
        const c = create()
        const r = c.riemann({plot: line(c), position: 0.5})
        const path = pathOf(r)

        expect(() => c.riemann({plot: line(c), ...values})).toThrow(InvalidArgumentError)
        expect(() => {
            r.config = {plot: line(c), ...values}
        }).toThrow(InvalidArgumentError)
        expect(pathOf(r)).toBe(path)
    })

    test('a sum without a domain, when the plot has none, is an InvalidArgumentError that names the plot', () => {
        const c = create()

        expect(() => c.riemann({plot: c.plot('x')})).toThrow(InvalidArgumentError)
        expect(() => c.riemann({plot: c.plot('x')})).toThrow(/"f"/)
    })

    test('a figure that is not a plot is an InvalidArgumentError', () => {
        const c = create()

        expect(() => c.riemann({plot: undefined as unknown as Plot})).toThrow(InvalidArgumentError)
        expect(() => c.riemann({plot: {} as unknown as Plot})).toThrow(InvalidArgumentError)
    })

    test('the setters of an invalid value throw, and the sum is left as it was', () => {
        const c = create()
        const r = c.riemann({plot: line(c)})

        expect(() => {
            r.rectangles = 0
        }).toThrow(InvalidArgumentError)
        expect(() => {
            r.position = 2
        }).toThrow(InvalidArgumentError)
        expect(r.rectangles).toBe(5)
        expect(r.position).toBe(0)
    })
})

describe('Riemann sum label', () => {
    test('shows the sum with the given decimals, and the number of rectangles', () => {
        const c = create()
        const r = c.riemann({plot: line(c), rectangles: 3})
        r.addLabel(['S = ', {field: 'sum', digits: 2}, ' with ', {field: 'rectangles', digits: 0}])

        expect(r.computeLabel()).toBe('S = 5.33 with 3')
    })

    test('is above the highest rectangle, in the middle of the domain', () => {
        const c = create()
        const r = c.riemann({plot: line(c), rectangles: 4, position: 1})
        const label = r.addLabel('r')

        // The highest rectangle is 4 units high.
        expect(label.x).toBeCloseTo(at(2, 4).x, 6)
        expect(label.y).toBeLessThan(at(2, 4).y)
        expect(label.config.alignement).toBe('tc')
    })

    test('keeps the alignment that was asked for', () => {
        const c = create()
        const r = c.riemann({plot: line(c)})
        const label = r.addLabel('r')
        label.position('bl')

        r.updateLabel()

        expect(label.config.alignement).toBe('bl')
    })

    test('does not offer a field that another figure has', () => {
        const c = create()

        expect(() => c.riemann({plot: line(c)}).addLabel([{field: 'length', digits: 1}])).toThrow(InvalidArgumentError)
    })
})

describe('Riemann sum TikZ', () => {
    test('is a rectangle for each interval, in the units of the coordinate system', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('x'), domain: {min: 0, max: 2}, rectangles: 2, position: 1})

        expect(r.tikz()).toMatch(/^\\draw\[.*\] \(0,0\) rectangle \(1,1\) \(1,0\) rectangle \(2,2\);$/)
    })

    test('a rectangle under the axis is written from the axis', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('-x'), domain: {min: 0, max: 1}, rectangles: 1, position: 1})

        expect(r.tikz()).toContain('(0,0) rectangle (1,-1)')
    })

    test('has the color and the fill of the figure', () => {
        const c = create()
        const tikz = c.riemann({plot: line(c)}).stroke('red').fill({color: 'green', opacity: 0.4}).tikz()

        expect(tikz).toContain('draw=pidraw-red')
        expect(tikz).toContain('fill=pidraw-green, fill opacity=0.4')
    })

    test('the label is a node above the rectangles', () => {
        const c = create()
        const r = c.riemann({plot: c.plot('x'), domain: {min: 0, max: 2}, rectangles: 2, position: 1})
        r.addLabel('$S$')

        expect(r.tikz()).toMatch(/\n\\node\[above\] at \(1,2\.\d+\) \{\$S\$\};$/)
    })

    test('is nothing when the sum is hidden or not drawn', () => {
        const c = create()
        const plot = new Plot(c.context, 'g', {quadratic: {A: at(0, 0), B: at(0, 1), C: at(1, 1)}})

        expect(c.riemann({plot, domain: {min: 0, max: 2}}).tikz()).toBe('')
        expect(c.riemann({plot: line(c)}).hide().tikz()).toBe('')
    })
})
