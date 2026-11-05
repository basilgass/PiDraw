import {describe, expect, test} from 'vitest'
import {Grid} from '../../../src/figures/Grid/Grid'
import type {IGridConfig} from '../../../src/figures/Grid/Grid.types'
import {InvalidArgumentError} from '../../../src/errors'
import {toCoordinates} from '../../../src/calculus'
import {createContext, graphConfig} from '../../helpers/figure'

function create(config = graphConfig()) {
    const context = createContext(config)
    const grid = (values?: IGridConfig, name = 'g') => new Grid(context, name, values)

    return {context, grid}
}

const horizontal = (grid: Grid) => grid.lines.filter(([a, b]) => a.y === b.y && a.x !== b.x)
const vertical = (grid: Grid) => grid.lines.filter(([a, b]) => a.x === b.x && a.y !== b.y)

describe('Grid', () => {
    test('has a line every unit, in both directions, by default', () => {
        const {grid} = create()
        const g = grid()

        // The drawing is 16 units by 12.
        expect(horizontal(g)).toHaveLength(13)
        expect(vertical(g)).toHaveLength(17)
    })

    test('has the step that it is given, in units of each axis', () => {
        const {grid} = create()
        const g = grid({step: {x: 2, y: 4}})

        expect(horizontal(g).map(([a]) => a.y).sort((a, b) => a - b)).toEqual([100, 300, 500])
        expect(vertical(g)).toHaveLength(9)
    })

    test('has a step in units: a different scale of the axes changes the lines', () => {
        const {grid} = create(graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -25}}}))
        const g = grid()

        expect(horizontal(g)).toHaveLength(25)
        expect(vertical(g)).toHaveLength(9)
    })

    test('follows axes that are not orthogonal', () => {
        const {grid} = create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}}))
        const g = grid()

        expect(horizontal(g)).toHaveLength(13)
        // The lines of the other family go along the y axis.
        const slanted = g.lines.filter(([a, b]) => a.y !== b.y && a.x !== b.x)

        expect(slanted.length).toBeGreaterThan(10)
        for (const [a, b] of slanted) {
            expect((b.x - a.x) * -50 - (b.y - a.y) * 25).toBeCloseTo(0, 6)
        }
    })

    test('is drawn in one path, in gray, and does not move with the figures', () => {
        const {grid} = create()
        const g = grid()

        expect(g.shape.attr('stroke')).toBe('lightgray')
        expect((g.shape.attr('d') as string).match(/M/g)).toHaveLength(30)
        expect(g.static).toBe(true)
    })

    test('is not drawn when its lines would be closer than 3 pixels, and is drawn again when they are not', () => {
        const {grid} = create()
        const g = grid({step: {x: 0.05, y: 0.05}})

        expect(g.lines).toEqual([])
        expect(g.element.attr('visibility')).toBe('hidden')
        expect(g.shape.attr('d')).toBe('M 0 0')

        g.config = {step: {x: 1, y: 1}}

        expect(g.lines).toHaveLength(30)
        expect(g.element.attr('visibility')).not.toBe('hidden')
    })

    test('has no label to move', () => {
        const {grid} = create()

        expect(grid().moveLabel()).toBeInstanceOf(Grid)
    })

    test.each([
        ['a step of 0', {step: {x: 0, y: 1}}],
        ['a negative step', {step: {x: 1, y: -1}}],
        ['a step that is not a number', {step: {x: NaN, y: 1}}],
        ['a step that is not finite', {step: {x: 1, y: Infinity}}],
        ['a step that is not a position', {step: 2 as unknown as { x: number, y: number }}]
    ])('%s is an InvalidArgumentError, and the grid is left as it was', (_, values) => {
        const {grid} = create()
        const g = grid({step: {x: 2, y: 2}})
        const lines = g.lines

        expect(() => grid(values, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            g.config = values
        }).toThrow(InvalidArgumentError)
        expect(g.lines).toEqual(lines)
    })
})

describe('Grid on a part of the drawing', () => {
    const part = {x: {min: 0, max: 4}, y: {min: 0, max: 2}}

    test('has its lines only in the part, and on its edges', () => {
        const {grid} = create()
        const g = grid(part)

        expect(vertical(g)).toHaveLength(5)
        expect(horizontal(g)).toHaveLength(3)
        expect(vertical(g).map(([a]) => a.x).sort((a, b) => a - b)).toEqual([400, 450, 500, 550, 600])
        expect(horizontal(g).every(([a, b]) => Math.min(a.x, b.x) === 400 && Math.max(a.x, b.x) === 600)).toBe(true)
    })

    test('has the step that it is given', () => {
        const {grid} = create()
        const g = grid({...part, step: {x: 2, y: 1}})

        expect(vertical(g)).toHaveLength(3)
        expect(horizontal(g)).toHaveLength(3)
    })

    test('has a line on each edge of the part, even when it is not a multiple of the step', () => {
        const {grid} = create()
        const g = grid({x: {min: 0.5, max: 3.2}, y: {min: 0, max: 1}})

        expect(vertical(g).map(([a]) => a.x).sort((a, b) => a - b)).toEqual([425, 450, 500, 550, 560])
    })

    test('has subdivisions in the part only', () => {
        const {grid} = create()
        const g = grid({...part, subdivisions: 2})

        expect(g.subLines.filter(([a, b]) => a.x === b.x)).toHaveLength(4)
        expect(g.subLines.filter(([a, b]) => a.y === b.y && a.x !== b.x)).toHaveLength(2)
    })

    test('is cut by what is seen', () => {
        const {grid} = create()
        const g = grid({x: {min: -100, max: 100}, y: {min: -100, max: 100}})

        expect(vertical(g)).toHaveLength(17)
        expect(horizontal(g)).toHaveLength(13)
    })

    test('is not drawn when the part is out of the drawing', () => {
        const {grid} = create()
        const g = grid({x: {min: 20, max: 30}, y: {min: 0, max: 1}})

        expect(g.lines).toEqual([])
        expect(g.element.attr('visibility')).toBe('hidden')
    })

    test('follows axes that are not orthogonal: the part is a parallelogram', () => {
        const {grid} = create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}}))
        const g = grid(part)
        const slanted = g.lines.filter(([a, b]) => a.y !== b.y)

        expect(slanted).toHaveLength(5)
        for (const [a, b] of slanted) {
            expect((b.x - a.x) * -50 - (b.y - a.y) * 25).toBeCloseTo(0, 6)
        }
    })

    test('can be given to a grid that has none, and taken away', () => {
        const {grid} = create()
        const g = grid()

        g.config = part
        expect(g.lines).toHaveLength(8)

        g.config = {}
        expect(g.lines).toHaveLength(30)
    })

    test.each([
        ['only x', {x: {min: 0, max: 1}}],
        ['only y', {y: {min: 0, max: 1}}],
        ['an interval upside down', {x: {min: 3, max: 1}, y: {min: 0, max: 1}}],
        ['an empty interval', {x: {min: 1, max: 1}, y: {min: 0, max: 1}}],
        ['an interval that is not finite', {x: {min: 0, max: Infinity}, y: {min: 0, max: 1}}],
        ['an interval that is a number', {x: 3 as unknown as { min: number, max: number }, y: {min: 0, max: 1}}]
    ])('%s is an InvalidArgumentError, and the grid is left as it was', (_, values) => {
        const {grid} = create()
        const g = grid(part)
        const lines = g.lines

        expect(() => grid(values, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            g.config = values
        }).toThrow(InvalidArgumentError)
        expect(g.lines).toEqual(lines)
    })

    test('is in the TikZ, in units', () => {
        const {grid} = create()
        const tikz = grid({x: {min: 0, max: 1}, y: {min: 0, max: 1}}).tikz()

        expect(tikz).toMatch(/\(0,0\) grid\[xstep=1, ystep=1\] \(1,1\) \(0,0\) rectangle \(1,1\);$/)
    })
})

describe('Grid TikZ', () => {
    test('is all of its lines in one draw, in units of the coordinate system', () => {
        const {grid} = create()
        const tikz = grid({step: {x: 8, y: 6}}).tikz()

        expect(tikz).toMatch(/^\\definecolor\{pidraw-lightgray\}\{HTML\}\{D3D3D3\}\n\\draw\[.*\] \(-8,-6\) grid\[xstep=8, ystep=6\] \(8,6\);$/s)
        expect(tikz.match(/\\draw/g)).toHaveLength(1)
    })

    test('has the step of each axis, in units', () => {
        const {grid} = create()

        expect(grid({step: {x: 2, y: 0.5}}).tikz()).toContain('grid[xstep=2, ystep=0.5]')
    })

    test('has the edges of a part of the coordinate system that are not multiples of the step, as a rectangle', () => {
        const {grid} = create()

        expect(grid({x: {min: 0.5, max: 3.5}, y: {min: 0, max: 2}}).tikz())
            .toContain('(0.5,0) grid[xstep=1, ystep=1] (3.5,2) (0.5,0) rectangle (3.5,2);')
    })

    test.each([[1], [2], [3], [0.5]])('has, with grid, the lines that are drawn, for a step of %s', (step) => {
        const {context, grid} = create()
        const g = grid({step: {x: step, y: step}})
        const round = (value: number) => Math.round(value * 1e5) / 1e5 + 0
        const positions = (lines: [{ x: number, y: number }, { x: number, y: number }][], axis: 'x' | 'y') =>
            [...new Set(lines.map(([a]) => round(toCoordinates(a, context.config)[axis])))].sort((a, b) => a - b)
        // The multiples of the step in the part that is seen, counted from the origin: the lines of grid.
        const multiples = (limit: number) => Array.from({length: Math.floor(limit / step) * 2 + 1}, (_, k) => round((k - Math.floor(limit / step)) * step))

        expect(positions(vertical(g), 'x')).toEqual(multiples(8))
        expect(positions(horizontal(g), 'y')).toEqual(multiples(6))
        expect(g.tikz()).toContain(`(-8,-6) grid[xstep=${step}, ystep=${step}] (8,6)`)
    })

    test('writes the lines one by one when those of a direction are too close to be drawn', () => {
        const {grid} = create()
        // A line every 2.5 pixels is not drawn: grid would draw lines that the drawing does not show.
        const tikz = grid({step: {x: 0.05, y: 1}}).tikz()

        expect(tikz).not.toContain('grid[')
        expect(tikz.match(/ -- /g)).toHaveLength(13)
    })

    test('writes the lines one by one when the axes are not orthogonal', () => {
        const {grid} = create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 25, y: -50}}}))
        const tikz = grid({step: {x: 4, y: 4}}).tikz()

        expect(tikz).not.toContain('grid[')
        expect(tikz).toContain(' -- ')
    })

    test('has the color of the lines', () => {
        const {grid} = create()

        expect(grid({step: {x: 8, y: 6}}).stroke('red').tikz()).toContain('draw=pidraw-red')
    })

    test('is nothing when the grid is hidden or not drawn', () => {
        const {grid} = create()

        expect(grid().hide().tikz()).toBe('')
        expect(grid({step: {x: 0.01, y: 0.01}}, 'h').tikz()).toBe('')
    })
})

describe('Grid subdivisions', () => {
    test('cut each step in equal parts, with lines that are not lines of the grid', () => {
        const {grid} = create()
        const g = grid({step: {x: 2, y: 2}, subdivisions: 2})
        const main = new Set(g.lines.map(([a, b]) => `${a.x},${a.y},${b.x},${b.y}`))

        // The steps of 2 units are 100 pixels, the subdivisions every 50 pixels.
        expect(g.lines).toHaveLength(7 + 9)
        expect(g.subLines).toHaveLength(6 + 8)
        expect(g.subLines.some(([a, b]) => main.has(`${a.x},${a.y},${b.x},${b.y}`))).toBe(false)
    })

    test('are drawn lighter, with the stroke of the grid', () => {
        const {grid} = create()
        const g = grid({subdivisions: 4}).stroke('red')
        const sub = g.element.findOne('g path')

        expect(g.shape.attr('stroke')).toBe('red')
        expect(sub?.attr('stroke')).toBe('red')
        expect(sub?.parent()?.attr('opacity')).toBe(0.5)
    })

    test('are none by default', () => {
        const {grid} = create()

        expect(grid().subLines).toEqual([])
    })

    test('are dropped alone when they would be too close', () => {
        const {grid} = create()
        const g = grid({subdivisions: 20})

        // A unit is 50 pixels: 20 parts are 2.5 pixels.
        expect(g.subLines).toEqual([])
        expect(g.lines).toHaveLength(30)
    })

    test('follow the step in each direction', () => {
        const {grid} = create()
        const g = grid({step: {x: 4, y: 2}, subdivisions: 2})

        expect(g.subLines.filter(([a, b]) => a.x === b.x && a.y !== b.y)).toHaveLength(4)
    })

    test('are in the TikZ, with half of the opacity, below the grid', () => {
        const {grid} = create()
        const tikz = grid({step: {x: 8, y: 6}, subdivisions: 2}).tikz()

        expect(tikz.startsWith('\\begin{scope}[opacity=0.5]')).toBe(true)
        expect(tikz).toContain('\\end{scope}')
        expect(tikz.match(/\\draw/g)).toHaveLength(2)
        expect(tikz).toContain('(-8,-6) grid[xstep=4, ystep=3] (8,6)')
        expect(tikz).toContain('(-8,-6) grid[xstep=8, ystep=6] (8,6)')
    })

    test('are not surrounded by a rectangle in a part of the coordinate system, as the edges are the ones of the grid', () => {
        const {grid} = create()
        const tikz = grid({step: {x: 4, y: 2}, subdivisions: 2, x: {min: 0.5, max: 3.5}, y: {min: 0, max: 2}}).tikz()

        expect(tikz.match(/rectangle/g)).toHaveLength(1)
    })

    test.each([
        ['one', 1],
        ['0', 0],
        ['more than 20', 21],
        ['a number that is not an integer', 2.5],
        ['text', 'a' as unknown as number]
    ])('%s subdivision is an InvalidArgumentError, and the grid is left as it was', (_, subdivisions) => {
        const {grid} = create()
        const g = grid({subdivisions: 2})
        const lines = g.subLines

        expect(() => grid({subdivisions}, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            g.config = {subdivisions}
        }).toThrow(InvalidArgumentError)
        expect(g.subLines).toEqual(lines)
    })

    test('can be added to a grid that has none', () => {
        const {grid} = create()
        const g = grid()

        g.config = {...g.config, subdivisions: 5}

        expect(g.subLines.length).toBeGreaterThan(0)
    })
})
