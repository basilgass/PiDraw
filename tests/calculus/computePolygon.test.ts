import {describe, expect, test} from 'vitest'
import {
    gcd,
    nearestOnPolygon,
    nowhere,
    polygonArea,
    polygonCentroid,
    polygonCycles,
    polygonPath,
    polygonPerimeter,
    regularPolygon,
    regularPolygonOnSide
} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

/** The polygon, that must exist. */
function exists<T>(value: T | null): T {
    if (value === null) {
        throw new Error('the polygon does not exist')
    }

    return value
}

function expectPoint(actual: XY, x: number, y: number) {
    expect(actual.x).toBeCloseTo(x, 6)
    expect(actual.y).toBeCloseTo(y, 6)
}

describe('gcd', () => {
    test.each([[12, 18, 6], [5, 2, 1], [6, 2, 2], [7, 7, 7], [9, 0, 9]])('the gcd of %d and %d is %d', (a, b, expected) => {
        expect(gcd(a, b)).toBe(expected)
    })
})

describe('polygonCycles', () => {
    test('a step of 1 is the convex polygon', () => {
        expect(polygonCycles(5)).toEqual([[0, 1, 2, 3, 4]])
        expect(polygonCycles(5, 1)).toEqual([[0, 1, 2, 3, 4]])
    })

    test('the pentagram joins the vertices 2 by 2', () => {
        expect(polygonCycles(5, 2)).toEqual([[0, 2, 4, 1, 3]])
    })

    test.each([
        [7, 3, [[0, 3, 6, 2, 5, 1, 4]]],
        [8, 3, [[0, 3, 6, 1, 4, 7, 2, 5]]]
    ])('{%d/%d} is one polygon through all the vertices', (sides, step, expected) => {
        expect(polygonCycles(sides, step)).toEqual(expected)
    })

    test('a step with a common divisor makes several polygons: two triangles for {6/2}', () => {
        expect(polygonCycles(6, 2)).toEqual([[0, 2, 4], [1, 3, 5]])
        expect(polygonCycles(10, 4)).toEqual([[0, 4, 8, 2, 6], [1, 5, 9, 3, 7]])
    })
})

describe('regularPolygon', () => {
    test('has its first vertex above the center, then counterclockwise as seen on the screen', () => {
        const square = exists(regularPolygon({x: 400, y: 300}, 100, 4))

        expect(square.vertices).toHaveLength(4)
        expectPoint(square.vertices[0], 400, 200)
        expectPoint(square.vertices[1], 300, 300)
        expectPoint(square.vertices[2], 400, 400)
        expectPoint(square.vertices[3], 500, 300)
    })

    test.each([3, 5, 6, 12])('%d sides: all the vertices are on the circle, evenly', (sides) => {
        const polygon = exists(regularPolygon({x: 400, y: 300}, 100, sides))
        const side = 2 * 100 * Math.sin(Math.PI / sides)

        polygon.vertices.forEach((p, i) => {
            expect(Math.hypot(p.x - 400, p.y - 300)).toBeCloseTo(100, 6)
            const next = polygon.vertices[(i + 1) % sides]
            expect(Math.hypot(next.x - p.x, next.y - p.y)).toBeCloseTo(side, 6)
        })
    })

    test('a star keeps the vertices and changes the paths', () => {
        const polygon = exists(regularPolygon({x: 400, y: 300}, 100, 5))
        const star = exists(regularPolygon({x: 400, y: 300}, 100, 5, 2))

        expect(star.vertices).toEqual(polygon.vertices)
        expect(star.cycles).toEqual([[0, 2, 4, 1, 3]])
    })

    test.each([
        ['a radius of 0', {x: 0, y: 0}, 0],
        ['a radius that is negative', {x: 0, y: 0}, -5],
        ['a radius that is NaN', {x: 0, y: 0}, NaN],
        ['a radius that is infinite', {x: 0, y: 0}, Infinity],
        ['a center that does not exist', nowhere(), 10]
    ])('%s is not a polygon: null', (_, center, radius) => {
        expect(regularPolygon(center, radius, 5)).toBeNull()
    })
})

describe('regularPolygonOnSide', () => {
    test('puts the polygon on the left of A to B, as seen on the screen, with A and B consecutive', () => {
        const square = exists(regularPolygonOnSide({x: 400, y: 300}, {x: 500, y: 300}, 4))

        expectPoint(square.vertices[0], 400, 300)
        expectPoint(square.vertices[1], 500, 300)
        expectPoint(square.vertices[2], 500, 200)
        expectPoint(square.vertices[3], 400, 200)
    })

    test('swapping A and B puts the polygon on the other side', () => {
        const square = exists(regularPolygonOnSide({x: 500, y: 300}, {x: 400, y: 300}, 4))

        expectPoint(square.vertices[2], 400, 400)
        expectPoint(square.vertices[3], 500, 400)
    })

    test('an equilateral triangle has its apex above the middle of the side', () => {
        const triangle = exists(regularPolygonOnSide({x: 400, y: 300}, {x: 500, y: 300}, 3))

        expectPoint(triangle.vertices[2], 450, 300 - 100 * Math.sin(Math.PI / 3))
    })

    test.each([5, 6, 9])('works for a side that is not horizontal, with %d sides', (sides) => {
        const A = {x: 400, y: 300}
        const B = {x: 460, y: 220}
        const polygon = exists(regularPolygonOnSide(A, B, sides))
        const length = Math.hypot(B.x - A.x, B.y - A.y)

        expectPoint(polygon.vertices[0], A.x, A.y)
        expectPoint(polygon.vertices[1], B.x, B.y)

        polygon.vertices.forEach((p, i) => {
            const next = polygon.vertices[(i + 1) % sides]
            expect(Math.hypot(next.x - p.x, next.y - p.y)).toBeCloseTo(length, 6)
        })
    })

    test('a star on a segment: A and B are two vertices that the star joins', () => {
        const A = {x: 400, y: 300}
        const B = {x: 500, y: 300}
        const star = exists(regularPolygonOnSide(A, B, 5, 2))

        expect(star.cycles).toEqual([[0, 2, 4, 1, 3]])
        expectPoint(star.vertices[0], A.x, A.y)
        expectPoint(star.vertices[2], B.x, B.y)

        // The segment is longer than the side of the pentagon, so the radius is the one of the star.
        const radius = 100 / (2 * Math.sin(2 * Math.PI / 5))
        const center = polygonCentroid(star.vertices)
        star.vertices.forEach(p => {
            expect(Math.hypot(p.x - center.x, p.y - center.y)).toBeCloseTo(radius, 6)
        })
    })

    test.each([
        ['A and B at the same place', {x: 1, y: 1}, {x: 1, y: 1}],
        ['A that does not exist', nowhere(), {x: 1, y: 1}],
        ['B that does not exist', {x: 1, y: 1}, nowhere()]
    ])('%s is not a polygon: null', (_, A, B) => {
        expect(regularPolygonOnSide(A, B, 5)).toBeNull()
    })
})

describe('polygonCentroid and polygonPath', () => {
    test('the centroid is the average of the vertices', () => {
        expect(polygonCentroid([{x: 0, y: 0}, {x: 4, y: 0}, {x: 4, y: 6}, {x: 0, y: 6}])).toEqual({x: 2, y: 3})
    })

    test('the path is a closed path for each cycle, with 2 decimals', () => {
        const path = polygonPath({
            vertices: [{x: 0, y: 0}, {x: 1.006, y: 2}, {x: 3, y: 4.4999}, {x: 5, y: 6}, {x: 7, y: 8}, {x: 9, y: 10}],
            cycles: [[0, 2, 4], [1, 3, 5]]
        })

        expect(path).toBe('M 0 0 L 3 4.5 L 7 8 Z M 1.01 2 L 5 6 L 9 10 Z')
    })
})

describe('nearestOnPolygon', () => {
    // A square of 100 pixels around the origin: its vertices are at (100, 0), (0, -100), (-100, 0) and (0, 100).
    const square = exists(regularPolygon({x: 0, y: 0}, 100, 4))
    const near = (x: number, y: number) => nearestOnPolygon(square, {x, y})

    test('the point is on the side that is the closest', () => {
        const found = near(80, 80)

        expect(found.x).toBeCloseTo(50, 6)
        expect(found.y).toBeCloseTo(50, 6)
    })

    test('the last vertex is joined to the first one', () => {
        const found = near(100, 100)

        expect(found.x).toBeCloseTo(50, 6)
        expect(found.y).toBeCloseTo(50, 6)
    })

    test('a position beyond a vertex gives the vertex', () => {
        const found = near(150, 0)

        expect(found.x).toBeCloseTo(100, 6)
        expect(found.y).toBeCloseTo(0, 6)
    })

    test('the inside of the polygon is not followed: from the center, a side is found', () => {
        expect(Math.hypot(near(0, 0).x, near(0, 0).y)).toBeCloseTo(100 * Math.SQRT1_2, 6)
    })

    test('a star of several polygons is followed polygon by polygon', () => {
        const star = exists(regularPolygon({x: 0, y: 0}, 100, 6, 2))
        const found = nearestOnPolygon(star, {x: 0, y: 0})

        expect(star.cycles).toHaveLength(2)
        expect(Math.hypot(found.x, found.y)).toBeCloseTo(50, 6)
    })
})

describe('polygonPerimeter and polygonArea', () => {
    const triangle = {vertices: [{x: 0, y: 0}, {x: 3, y: 0}, {x: 0, y: 4}], cycles: [[0, 1, 2]]}

    test('are the length of the outline and the area it goes round', () => {
        expect(polygonPerimeter(triangle)).toBeCloseTo(12, 9)
        expect(polygonArea(triangle)).toBeCloseTo(6, 9)
    })

    test('do not depend on the way the vertices go round', () => {
        const reversed = {vertices: triangle.vertices, cycles: [[2, 1, 0]]}

        expect(polygonArea(reversed)).toBeCloseTo(6, 9)
    })

    test('add up the closed paths of a star made of several polygons', () => {
        const star = exists(regularPolygon({x: 0, y: 0}, 2, 6, 2))

        expect(polygonArea(star)).toBeCloseTo(2 * Math.sqrt(3) / 4 * 12, 9)
        expect(polygonPerimeter(star)).toBeCloseTo(6 * 2 * Math.sqrt(3), 9)
    })
})
