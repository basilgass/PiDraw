import {afterEach, describe, expect, test, vi} from 'vitest'
import {Edge} from '../../../src/figures/Edge/Edge'
import {Point} from '../../../src/figures/Point/Point'
import {Label} from '../../../src/figures/Label/Label'
import {InvalidArgumentError} from '../../../src/errors'
import {createContext} from '../../helpers/figure'
import type {NodeShape} from '../../../src/calculus'

afterEach(() => {
    vi.restoreAllMocks()
})

// The text of a label is measured by the browser: here it is 40 x 20, so a node is a box of 56 x 36.
function create() {
    vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 40, height: 20})
    const context = createContext()
    const point = (name: string, x: number, y: number, node?: NodeShape) => {
        const made = new Point(context, name, {coordinates: {x, y}, ...(node === undefined ? {} : {node})})

        if (node !== undefined) {
            made.addLabel(name)
        }

        return made
    }

    return {context, point}
}

describe('Edge', () => {
    test('is a path in the group of the edge, with the class of an edge', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 0, 0), to: point('B', 2, 0)})

        expect(edge.element.attr('class')).toBe('pidraw-edge')
        expect(edge.shape.type).toBe('path')
        expect(edge.shape.attr('d')).toMatch(/^M/)
    })

    test('goes from the border of a node to the border of another, not from center to center', () => {
        const {context, point} = create()
        const A = point('A', 0, 0, 'rect')
        const B = point('B', 4, 0, 'rect')
        const edge = new Edge(context, 'e', {from: A, to: B})
        const [segment] = edge.segments

        // 56 pixels wide: the border is 28 pixels from the center.
        expect(segment.start.x).toBeCloseTo(A.x + 28)
        expect(segment.end.x).toBeCloseTo(B.x - 28)
        expect(segment.start.y).toBeCloseTo(A.y)
    })

    test('ends exactly on a point that is not a node', () => {
        const {context, point} = create()
        const A = point('A', 0, 0, 'rect')
        const B = point('B', 4, 0)
        const edge = new Edge(context, 'e', {from: A, to: B})

        expect(edge.segments[0].end).toEqual({x: B.x, y: B.y})
    })

    test('ends on a place of a node, which is a point', () => {
        const {context, point} = create()
        const A = point('A', 0, 0, 'rect')
        const B = point('B', 4, 3, 'rect')
        const place = new Point(context, 'B.tl', {anchor: {node: B, position: 'tl'}})
        const edge = new Edge(context, 'e', {from: A, to: place})

        expect(edge.segments[0].end).toEqual(B.anchorPoint('tl'))
    })

    test('is bent by a curve, to the left of the way for a positive number', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 0, 0), to: point('B', 4, 0), curve: 0.3})
        const [segment] = edge.segments

        expect(segment.control1.y).toBeLessThan(segment.start.y)
    })

    test('is drawn again with a new config', () => {
        const {context, point} = create()
        const A = point('A', 0, 0)
        const edge = new Edge(context, 'e', {from: A, to: point('B', 4, 0)})
        const straight = String(edge.shape.attr('d'))

        edge.config = {...edge.config, curve: 0.5}

        expect(edge.shape.attr('d')).not.toBe(straight)
        expect(edge.config.curve).toBe(0.5)
    })

    test('follows the points when they move, when it is drawn again', () => {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0), point('B', 4, 0)]
        const edge = new Edge(context, 'e', {from: A, to: B})

        B.pixels = {x: B.x, y: B.y + 100}
        edge.computed()

        expect(edge.segments[0].end).toEqual({x: B.x, y: B.y})
    })

    test('follows the size of the nodes', () => {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0, 'rect'), point('B', 4, 0, 'rect')]
        const edge = new Edge(context, 'e', {from: A, to: B})
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 100, height: 20})

        A.updateLabel()
        edge.computed()

        expect(edge.segments[0].start.x).toBeCloseTo(A.x + 58)
    })

    test('is a loop when the point is the same twice, and goes out of its side', () => {
        const {context, point} = create()
        const A = point('A', 0, 0, 'rect')
        const loop = new Edge(context, 'e', {from: A, to: A})
        const right = new Edge(context, 'f', {from: A, to: A, loopSide: 'r'})

        expect(loop.isLoop).toBe(true)
        expect(loop.segments[0].control1.y).toBeLessThan(A.y - 18)
        expect(right.segments[0].control1.x).toBeGreaterThan(A.x + 28)
    })

    test('is not drawn when a point has no position, and is drawn again when it has one', () => {
        const {context, point} = create()
        const A = point('A', 0, 0)
        const B = point('B', 4, 0)
        const edge = new Edge(context, 'e', {from: A, to: B})

        B.pixels = {x: NaN, y: NaN}
        edge.computed()
        expect(edge.segments).toEqual([])
        expect(edge.element.attr('visibility')).toBe('hidden')

        B.pixels = {x: 300, y: 300}
        edge.computed()
        expect(edge.segments).toHaveLength(1)
        expect(edge.element.attr('visibility')).toBeUndefined()
    })

    test('is not drawn when the two points are at the same place', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 1, 1), to: point('B', 1, 1)})

        expect(edge.segments).toEqual([])
    })

    test('has a marker at its end that the figure draws', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 0, 0), to: point('B', 4, 0)})

        edge.mark({side: 'end'})

        expect(edge.shape.attr('marker-end')).toMatch(/^url\(#/)
        expect(edge.shape.attr('marker-start')).toBeUndefined()
    })

    test('can be dashed like any figure', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 0, 0), to: point('B', 4, 0)})

        edge.dash()

        expect(edge.shape.attr('stroke-dasharray')).toBe('6 4')
    })

    test('has the point that is the closest to a position, which is on it', () => {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0), point('B', 4, 0)]
        const edge = new Edge(context, 'e', {from: A, to: B})
        const found = edge.follow(A.x + 100, A.y + 40)

        expect(found.x).toBeCloseTo(A.x + 100)
        expect(found.y).toBeCloseTo(A.y)
        expect(edge.followable).toBe(true)
    })

    test('has no point to follow when it does not exist', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 1, 1), to: point('B', 1, 1)})

        expect(edge.follow(0, 0).x).toBeNaN()
    })
})

describe('Edge config', () => {
    test.each([
        ['an end that is not a point', (A: Point) => ({from: {x: 0, y: 0}, to: A})],
        ['a curve that is not a number', (A: Point, B: Point) => ({from: A, to: B, curve: NaN})],
        ['a curve that is not finite', (A: Point, B: Point) => ({from: A, to: B, curve: Infinity})],
        ['a side that is not one', (A: Point) => ({from: A, to: A, loopSide: 'x'})],
        ['a side on an edge that is not a loop', (A: Point, B: Point) => ({from: A, to: B, loopSide: 't'})],
        ['a curve on a loop', (A: Point) => ({from: A, to: A, curve: 0.3})]
    ])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, make) => {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0), point('B', 4, 0)]
        const before = context.rootSVG.svg()

        expect(() => new Edge(context, 'e', make(A, B) as never)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.svg()).toBe(before)
    })

    test('an invalid config is an InvalidArgumentError, and the edge is left as it was', () => {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0), point('B', 4, 0)]
        const edge = new Edge(context, 'e', {from: A, to: B})
        const d = String(edge.shape.attr('d'))

        expect(() => {
            edge.config = {from: A, to: B, curve: NaN}
        }).toThrow(InvalidArgumentError)
        expect(edge.config.curve).toBeUndefined()
        expect(edge.shape.attr('d')).toBe(d)
    })

    test('keeps a copy of the config it was given', () => {
        const {context, point} = create()
        const values = {from: point('A', 0, 0), to: point('B', 4, 0)}
        const edge = new Edge(context, 'e', values)

        expect(edge.config).not.toBe(values)
        expect(edge.config).toEqual(values)
    })
})

describe('Edge label', () => {
    function labelled(options: { curve?: number } = {}) {
        const {context, point} = create()
        const [A, B] = [point('A', 0, 0), point('B', 6, 0)]
        const edge = new Edge(context, 'e', {from: A, to: B, ...options})
        const label = edge.addLabel('yes')

        return {A, B, edge, label}
    }

    test('is beside the edge, on the left of the way, by default', () => {
        const {A, label} = labelled()

        // Going to the right, the left is up on the screen.
        expect(label.y).toBeLessThan(A.y)
        expect(label.x).toBeCloseTo(A.x + 150)
    })

    test('is on the edge with a position, which is kept', () => {
        const {A, edge, label} = labelled()

        label.position('mc')
        edge.updateLabel()

        expect(label.alignement).toBe('mc')
        expect(label.y).toBeCloseTo(A.y)
        expect(label.x).toBeCloseTo(A.x + 150)
    })

    test('follows the edge when it is bent', () => {
        const {A, label} = labelled({curve: 0.3})

        expect(label.y).toBeLessThan(A.y - 40)
    })

    test('of a loop is away from the point, on the side of the loop', () => {
        const {context, point} = create()
        const A = point('A', 0, 0, 'rect')
        const loop = new Edge(context, 'e', {from: A, to: A, loopSide: 'r'})
        const label = loop.addLabel('0.5')

        expect(label.x).toBeGreaterThan(A.x + 28)
        expect(label.config.away).toEqual({x: 1, y: 0})
    })

    test('is not moved when the edge does not exist', () => {
        const {context, point} = create()
        const edge = new Edge(context, 'e', {from: point('A', 1, 1), to: point('B', 1, 1)})

        expect(() => edge.addLabel('x')).not.toThrow()
    })
})

describe('Edge tikz', () => {
    function tikzOf(options: { curve?: number, loopSide?: 't' | 'r' | 'b' | 'l', loop?: boolean } = {}) {
        const {context, point} = create()
        const A = point('A', 0, 0)
        const B = options.loop === true ? A : point('B', 2, 0)
        const edge = new Edge(context, 'e', {from: A, to: B, ...(options.curve === undefined ? {} : {curve: options.curve}), ...(options.loopSide === undefined ? {} : {loopSide: options.loopSide})})

        return {edge, A}
    }

    test('is a straight line for an edge that is not bent', () => {
        const {edge} = tikzOf()

        expect(edge.tikz()).toBe('\\draw[draw=black, line width=0.75pt] (0,0) -- (2,0);')
    })

    test('is a curve with its control points for a bent edge', () => {
        const {edge} = tikzOf({curve: 0.25})

        expect(edge.tikz()).toMatch(/^\\draw\[.*\] \(0,0\) \.\. controls \(.*\) and \(.*\) \.\. \(2,0\);$/)
    })

    test('is a curve for a loop', () => {
        const {edge} = tikzOf({loop: true, loopSide: 'r'})

        expect(edge.tikz()).toContain('.. controls')
    })

    test('has the arrow of its marker', () => {
        const {edge} = tikzOf()

        edge.mark({side: 'end'})

        expect(edge.tikz()).toContain('->')
    })

    test('has its label, and nothing for an edge that is hidden or does not exist', () => {
        const {edge} = tikzOf()
        edge.addLabel('yes')

        expect(edge.tikz()).toContain('{yes};')

        edge.hide()
        expect(edge.tikz()).toBe('')

        const {context, point} = create()
        expect(new Edge(context, 'f', {from: point('A', 1, 1), to: point('B', 1, 1)}).tikz()).toBe('')
    })

    test('has the colors of its appearance defined before it', () => {
        const {edge} = tikzOf()

        edge.stroke('red')

        expect(edge.tikz().split('\n')[0]).toBe('\\definecolor{pidraw-red}{HTML}{FF0000}')
    })
})
