import {afterEach, describe, expect, test, vi} from 'vitest'
import type {Circle as SvgCircle, Rect} from '@svgdotjs/svg.js'
import {Point} from '../../../src/figures/Point/Point'
import {Label} from '../../../src/figures/Label/Label'
import type {NodeShape} from '../../../src/calculus'
import {InvalidArgumentError} from '../../../src/errors'
import {createContext} from '../../helpers/figure'

afterEach(() => {
    vi.restoreAllMocks()
})

// The text of a label is measured by the browser: here it is 40 x 20, so a box of 56 x 36 (a margin of 8 on each side).
function create(node?: NodeShape, text = {width: 40, height: 20}) {
    vi.spyOn(Label.prototype, 'size').mockReturnValue(text)
    const context = createContext()
    const point = new Point(context, 'A', {coordinates: {x: 0, y: 0}, ...(node === undefined ? {} : {node})})
    point.addLabel('A')

    return {context, point}
}

describe('Point node', () => {
    test('has the class of a node besides the one of a point', () => {
        expect(create('rect').point.element.attr('class')).toBe('pidraw-point pidraw-node')
        expect(create().point.element.attr('class')).toBe('pidraw-point')
    })

    test('is a box around the label as big as the label asks, centered on the point', () => {
        const {point} = create('rect')
        const box = point.shape as unknown as Rect

        expect(box.type).toBe('rect')
        expect(box.width()).toBe(56)
        expect(box.height()).toBe(36)
        expect(box.cx()).toBeCloseTo(point.x)
        expect(box.cy()).toBeCloseTo(point.y)
    })

    test('has the box behind its label, and the label in the middle of it', () => {
        const {point} = create('rect')

        expect(point.element.children().map(child => child.type)).toEqual(['rect', 'text'])
        expect(point.label?.alignement).toBe('mc')
    })

    test('has the shape that it is given', () => {
        expect(create('round').point.shape.attr('rx')).toBe(8)
        expect(create('diamond').point.shape.type).toBe('polygon')
        expect(create('circle').point.shape.type).toBe('circle')
    })

    test('has a diamond twice as big as the box of its text, and a circle as big as the diagonal of it', () => {
        const diamond = create('diamond').point.shape.bbox()
        const circle = create('circle').point.shape as unknown as SvgCircle

        expect(diamond.width).toBeCloseTo(112)
        expect(diamond.height).toBeCloseTo(72)
        expect(Number(circle.attr('r'))).toBeCloseTo(Math.hypot(56, 36) / 2)
    })

    test('keeps a minimum size when the label is short', () => {
        const box = create('rect', {width: 0, height: 0}).point.shape as unknown as Rect

        expect(box.width()).toBe(30)
        expect(box.height()).toBe(22)
    })

    test('takes the size of its label again when the label changes', () => {
        const {point} = create('rect')
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 100, height: 20})

        point.updateLabel()

        expect((point.shape as unknown as Rect).width()).toBe(116)
    })

    test('keeps its box behind the label when it is made a node after its label, and when the shape is drawn again', () => {
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 40, height: 20})
        const point = new Point(createContext(), 'A', {coordinates: {x: 0, y: 0}})

        point.addLabel('A')
        point.setNode('rect')
        point.setNode('circle')

        expect(point.node).toBe('circle')
        expect(point.element.children().map(child => child.type)).toEqual(['circle', 'text'])
    })

    test('is a mark again with null', () => {
        const {point} = create('rect')

        point.setNode(null)

        expect(point.node).toBeNull()
        expect(point.config.node).toBeUndefined()
        expect(point.shape.type).toBe('circle')
        expect(point.element.attr('class')).toBe('pidraw-point')
    })

    test.each([['hexagon'], ['']])('the node "%s" is an InvalidArgumentError', (shape) => {
        const {point} = create()

        expect(() => point.setNode(shape as NodeShape)).toThrow(InvalidArgumentError)
        expect(() => new Point(createContext(), 'B', {coordinates: {x: 0, y: 0}, node: shape as NodeShape})).toThrow(InvalidArgumentError)
    })

    test('a node with a shape or a size of a mark is an InvalidArgumentError, whatever the way it is asked', () => {
        const {point} = create('rect')
        const mark = new Point(createContext(), 'B', {coordinates: {x: 0, y: 0}, shape: 'square'})

        expect(() => new Point(createContext(), 'C', {coordinates: {x: 0, y: 0}, node: 'rect', size: 8})).toThrow(InvalidArgumentError)
        expect(() => new Point(createContext(), 'C', {coordinates: {x: 0, y: 0}, node: 'rect', shape: 'square'})).toThrow(InvalidArgumentError)
        expect(() => point.asSquare()).toThrow(InvalidArgumentError)
        expect(() => {
            point.size = 8
        }).toThrow(InvalidArgumentError)
        expect(() => mark.setNode('rect')).toThrow(InvalidArgumentError)
        expect(mark.node).toBeNull()
    })

    test('follows a new config', () => {
        const {point} = create('rect')

        point.config = {coordinates: {x: 1, y: 1}, node: 'diamond'}

        expect(point.node).toBe('diamond')
        expect(point.shape.type).toBe('polygon')

        point.config = {coordinates: {x: 1, y: 1}}

        expect(point.node).toBeNull()
    })
})

describe('Point node boundaryPoint', () => {
    test('is the border of the box that a half line toward a position meets', () => {
        const {point} = create('rect')

        expect(point.boundaryPoint({x: point.x + 200, y: point.y})).toEqual({x: point.x + 28, y: point.y})
        expect(point.boundaryPoint({x: point.x, y: point.y - 90})).toEqual({x: point.x, y: point.y - 18})
    })

    test('goes to the corner of the box on the diagonal of the box', () => {
        const {point} = create('rect')
        const corner = point.boundaryPoint({x: point.x + 56, y: point.y + 36})

        expect(corner.x).toBeCloseTo(point.x + 28)
        expect(corner.y).toBeCloseTo(point.y + 18)
    })

    test('follows the shape', () => {
        const {point} = create('diamond')
        const border = point.boundaryPoint({x: point.x + 100, y: point.y})

        expect(border.x).toBeCloseTo(point.x + 56)
    })

    test('is the point itself for a point that is not a node', () => {
        const {point} = create()

        expect(point.boundaryPoint({x: 0, y: 0})).toEqual({x: point.x, y: point.y})
    })

    test('is nowhere for a point that has no position', () => {
        const point = new Point(createContext(), 'A', {coordinates: {x: NaN, y: 0}, node: 'rect'})

        expect(point.boundaryPoint({x: 0, y: 0}).x).toBeNaN()
    })
})

describe('Point node anchorPoint', () => {
    test('is a place of the box', () => {
        const {point} = create('rect')

        expect(point.anchorPoint('mc')).toEqual({x: point.x, y: point.y})
        expect(point.anchorPoint('mr')).toEqual({x: point.x + 28, y: point.y})
        expect(point.anchorPoint('tl')).toEqual({x: point.x - 28, y: point.y - 18})
    })

    test('is the position of the point for a point that is not a node', () => {
        const {point} = create()

        expect(point.anchorPoint('tr')).toEqual({x: point.x, y: point.y})
    })
})

describe('Point anchor constraint', () => {
    test('is a point on the place of the node, and follows it', () => {
        const {context, point} = create('rect')
        const anchor = new Point(context, 'A.tr', {anchor: {node: point, position: 'tr'}})

        expect(anchor.pixels).toEqual({x: point.x + 28, y: point.y - 18})

        point.x += 100
        anchor.computed()

        expect(anchor.pixels).toEqual({x: point.x + 28, y: point.y - 18})
    })

    test('has the size of the label that the node has now', () => {
        const {context, point} = create('rect')
        const anchor = new Point(context, 'A.mr', {anchor: {node: point, position: 'mr'}})
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 100, height: 20})

        point.updateLabel()
        anchor.computed()

        expect(anchor.pixels.x).toBeCloseTo(point.x + 58)
    })
})

describe('Point node tikz', () => {
    test('is the box and the label in the middle of it', () => {
        const {point} = create('rect')

        expect(point.tikz()).toContain('(-0.56,0.36) rectangle (0.56,-0.36);')
        expect(point.tikz()).toContain('node at (0,0) {A};')
    })

    test('writes the corners of a round node', () => {
        expect(create('round').point.tikz()).toContain('[rounded corners=6pt] ')
    })

    test('writes the vertices of a diamond and the radius of a circle', () => {
        expect(create('diamond').point.tikz()).toContain('(0,0.72) -- (1.12,0) -- (0,-0.72) -- (-1.12,0) -- cycle;')
        expect(create('circle').point.tikz()).toContain('circle[radius=')
    })

    test('has the fill that the point is given', () => {
        const {point} = create('rect')

        point.fill('yellow')

        expect(point.tikz()).toContain('fill=pidraw-yellow')
    })
})
