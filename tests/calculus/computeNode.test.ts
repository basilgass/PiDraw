import {describe, expect, test} from 'vitest'
import {
    diamondVertices,
    NODE_ANCHORS,
    NODE_CORNER_RADIUS,
    type NodeAnchor,
    nodeAnchor,
    nodeBoundary,
    nodeCornerRadius,
    type NodeShape,
    nodeSize
} from '../../src/calculus'

const none = {width: 0, height: 0}

describe('nodeSize', () => {
    test('a rectangle is the text and a margin on each side', () => {
        expect(nodeSize('rect', {width: 40, height: 20}, 8, none)).toEqual({width: 56, height: 36})
        expect(nodeSize('round', {width: 40, height: 20}, 8, none)).toEqual({width: 56, height: 36})
    })

    test('a diamond holds the box of the text: twice its size', () => {
        expect(nodeSize('diamond', {width: 40, height: 20}, 8, none)).toEqual({width: 112, height: 72})
    })

    test('a circle has the box of the text on its circle: its diameter is the diagonal', () => {
        const {width, height} = nodeSize('circle', {width: 30, height: 40}, 10, none)

        expect(width).toBeCloseTo(Math.hypot(50, 60))
        expect(height).toBe(width)
    })

    test('a node has a minimum size, and a circle keeps the biggest of the two', () => {
        expect(nodeSize('rect', none, 0, {width: 30, height: 20})).toEqual({width: 30, height: 20})
        expect(nodeSize('circle', none, 0, {width: 30, height: 20})).toEqual({width: 30, height: 30})
    })
})

describe('nodeBoundary', () => {
    const size = {width: 40, height: 20}

    test.each<[NodeShape, number, number, number, number]>([
        ['rect', 1, 0, 20, 0],
        ['rect', 0, -1, 0, -10],
        ['round', 1, 0, 20, 0],
        ['round', 0, 1, 0, 10],
        ['diamond', 1, 0, 20, 0],
        ['diamond', 0, 1, 0, 10],
        ['circle', 1, 0, 20, 0],
        ['circle', 0, -1, 0, -10]
    ])('%s: a half line on an axis reaches the middle of a side (%s;%s)', (shape, dx, dy, x, y) => {
        const point = nodeBoundary(shape, size, {x: dx, y: dy})

        expect(point.x).toBeCloseTo(x)
        expect(point.y).toBeCloseTo(y)
    })

    test('a rectangle is reached on its corner by the diagonal of its box, wherever the length of the direction is', () => {
        expect(nodeBoundary('rect', size, {x: 20, y: 10})).toEqual({x: 20, y: 10})
        expect(nodeBoundary('rect', size, {x: 2, y: 1})).toEqual({x: 20, y: 10})
    })

    test('a rectangle is reached on its side when the direction is steeper than its diagonal', () => {
        const point = nodeBoundary('rect', size, {x: 1, y: 4})

        expect(point.y).toBeCloseTo(10)
        expect(point.x).toBeCloseTo(2.5)
    })

    test('a diamond is reached on the segment between two of its vertices', () => {
        const point = nodeBoundary('diamond', size, {x: 1, y: 1})

        expect(Math.abs(point.x) / 20 + Math.abs(point.y) / 10).toBeCloseTo(1)
        expect(point.x).toBeCloseTo(point.y)
    })

    test('a circle of a box that is square is reached at its radius, in any direction', () => {
        const point = nodeBoundary('circle', {width: 20, height: 20}, {x: 3, y: 4})

        expect(Math.hypot(point.x, point.y)).toBeCloseTo(10)
    })

    test('a round node is reached inside the corner that a rectangle has', () => {
        const rectangle = nodeBoundary('rect', size, {x: 2, y: 1})
        const round = nodeBoundary('round', size, {x: 2, y: 1})

        expect(Math.hypot(round.x, round.y)).toBeLessThan(Math.hypot(rectangle.x, rectangle.y))

        // The point is on the circle of the corner.
        const radius = nodeCornerRadius('round', size)
        const center = {x: 20 - radius, y: 10 - radius}
        expect(Math.hypot(round.x - center.x, round.y - center.y)).toBeCloseTo(radius)
    })

    test('a round node is reached on a side like a rectangle when the half line is away from the corners', () => {
        expect(nodeBoundary('round', size, {x: 1, y: 0.1})).toEqual(nodeBoundary('rect', size, {x: 1, y: 0.1}))
    })

    test('a null direction gives the center', () => {
        expect(nodeBoundary('diamond', size, {x: 0, y: 0})).toEqual({x: 0, y: 0})
    })

    test('a direction that is not a position gives no place', () => {
        const point = nodeBoundary('rect', size, {x: NaN, y: 1})

        expect(point.x).toBeNaN()
        expect(point.y).toBeNaN()
    })
})

describe('nodeCornerRadius', () => {
    test('is the radius of a round node, smaller on a node that is too small, and none for the other shapes', () => {
        expect(nodeCornerRadius('round', {width: 100, height: 50})).toBe(NODE_CORNER_RADIUS)
        expect(nodeCornerRadius('round', {width: 100, height: 10})).toBe(5)
        expect(nodeCornerRadius('rect', {width: 100, height: 50})).toBe(0)
    })
})

describe('diamondVertices', () => {
    test('are the top, the right, the bottom and the left', () => {
        expect(diamondVertices({width: 40, height: 20})).toEqual([{x: 0, y: -10}, {x: 20, y: 0}, {x: 0, y: 10}, {x: -20, y: 0}])
    })
})

describe('nodeAnchor', () => {
    const size = {width: 40, height: 20}

    test('the center of a node is mc, whatever its shape', () => {
        for (const shape of ['rect', 'round', 'diamond', 'circle'] as NodeShape[]) {
            expect(nodeAnchor(shape, size, 'mc')).toEqual({x: 0, y: 0})
        }
    })

    test.each<[NodeAnchor, number, number]>([
        ['tl', -20, -10], ['tc', 0, -10], ['tr', 20, -10],
        ['ml', -20, 0], ['mr', 20, 0],
        ['bl', -20, 10], ['bc', 0, 10], ['br', 20, 10]
    ])('the anchor %s of a rectangle is on its box', (position, x, y) => {
        const point = nodeAnchor('rect', size, position)

        expect(point.x).toBeCloseTo(x)
        expect(point.y).toBeCloseTo(y)
    })

    test('the sides of a diamond are its vertices, and its corners are the middles of its sides', () => {
        expect(nodeAnchor('diamond', size, 'tc').y).toBeCloseTo(-10)
        expect(nodeAnchor('diamond', size, 'mr').x).toBeCloseTo(20)

        const corner = nodeAnchor('diamond', size, 'tr')
        expect(corner.x).toBeCloseTo(10)
        expect(corner.y).toBeCloseTo(-5)
    })

    test('every anchor of every shape is on the border, in the box of the node', () => {
        for (const shape of ['rect', 'round', 'diamond', 'circle'] as NodeShape[]) {
            for (const position of NODE_ANCHORS) {
                const point = nodeAnchor(shape, size, position)

                expect(Math.abs(point.x)).toBeLessThanOrEqual(20 + 1e-9)
                expect(Math.abs(point.y)).toBeLessThanOrEqual(10 + 1e-9)
            }
        }
    })

    test('the anchors keep the side they name', () => {
        for (const shape of ['rect', 'round', 'diamond', 'circle'] as NodeShape[]) {
            expect(nodeAnchor(shape, size, 'tl').x).toBeLessThan(0)
            expect(nodeAnchor(shape, size, 'tl').y).toBeLessThan(0)
            expect(nodeAnchor(shape, size, 'br').x).toBeGreaterThan(0)
            expect(nodeAnchor(shape, size, 'br').y).toBeGreaterThan(0)
        }
    })
})
