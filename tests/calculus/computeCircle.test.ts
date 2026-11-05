import {describe, expect, test} from 'vitest'
import {circleTangentTo, circleWithDiameter, circumcircle, incircle} from '../../src/calculus/computeCircle'
import type {CircleDefinition} from '../../src/calculus/computeCircle'

function expectCircle(circle: CircleDefinition, x: number, y: number, radius: number) {
    expect(circle.center.x).toBeCloseTo(x, 9)
    expect(circle.center.y).toBeCloseTo(y, 9)
    expect(circle.radius).toBeCloseTo(radius, 9)
}

function expectNowhere(circle: CircleDefinition) {
    expect(circle.center.x).toBeNaN()
    expect(circle.center.y).toBeNaN()
    expect(circle.radius).toBeNaN()
}

// A right triangle with legs of 4 and 3, and a hypotenuse of 5.
const A = {x: 0, y: 0}
const B = {x: 4, y: 0}
const C = {x: 0, y: 3}

describe('circumcircle', () => {
    test('of a right triangle has the middle of the hypotenuse for center and half of it for radius', () => {
        expectCircle(circumcircle(A, B, C), 2, 1.5, 2.5)
    })

    test('does not depend on the order of the points', () => {
        expectCircle(circumcircle(C, A, B), 2, 1.5, 2.5)
        expectCircle(circumcircle(B, C, A), 2, 1.5, 2.5)
    })

    test('goes through the three points, far from the origin', () => {
        const circle = circumcircle({x: 100, y: 200}, {x: 130, y: 240}, {x: 90, y: 250})

        for (const point of [{x: 100, y: 200}, {x: 130, y: 240}, {x: 90, y: 250}]) {
            expect(Math.hypot(point.x - circle.center.x, point.y - circle.center.y)).toBeCloseTo(circle.radius, 9)
        }
    })

    test.each([
        ['aligned points', A, {x: 1, y: 1}, {x: 2, y: 2}],
        ['two points that are the same', A, A, C],
        ['three points that are the same', A, A, A],
        ['a point that is not a number', A, B, {x: NaN, y: 1}]
    ])('of %s does not exist', (_, a, b, c) => {
        expectNowhere(circumcircle(a, b, c))
    })
})

describe('incircle', () => {
    test('of a right triangle with legs of 4 and 3 has a radius of 1, centered at (1, 1)', () => {
        expectCircle(incircle(A, B, C), 1, 1, 1)
    })

    test('does not depend on the order of the points', () => {
        expectCircle(incircle(C, B, A), 1, 1, 1)
    })

    test('is at the same distance of the three sides', () => {
        const circle = incircle({x: 0, y: 0}, {x: 7, y: 1}, {x: 2, y: 5})
        const distance = (P: { x: number, y: number }, Q: { x: number, y: number }) =>
            Math.abs((Q.x - P.x) * (circle.center.y - P.y) - (Q.y - P.y) * (circle.center.x - P.x)) / Math.hypot(Q.x - P.x, Q.y - P.y)

        expect(distance({x: 0, y: 0}, {x: 7, y: 1})).toBeCloseTo(circle.radius, 9)
        expect(distance({x: 7, y: 1}, {x: 2, y: 5})).toBeCloseTo(circle.radius, 9)
        expect(distance({x: 2, y: 5}, {x: 0, y: 0})).toBeCloseTo(circle.radius, 9)
    })

    test.each([
        ['aligned points', A, {x: 1, y: 1}, {x: 2, y: 2}],
        ['two points that are the same', A, A, C],
        ['a point that is not a number', A, B, {x: NaN, y: 1}]
    ])('of %s does not exist', (_, a, b, c) => {
        expectNowhere(incircle(a, b, c))
    })
})

describe('circleWithDiameter', () => {
    test('has the middle of the segment for center and half of it for radius', () => {
        expectCircle(circleWithDiameter({x: 0, y: 0}, {x: 4, y: 0}), 2, 0, 2)
        expectCircle(circleWithDiameter({x: 1, y: 1}, {x: 4, y: 5}), 2.5, 3, 2.5)
    })

    test.each([
        ['two points that are the same', {x: 1, y: 1}, {x: 1, y: 1}],
        ['a point that is not a number', {x: 1, y: 1}, {x: NaN, y: 1}]
    ])('of %s does not exist', (_, a, b) => {
        expectNowhere(circleWithDiameter(a, b))
    })
})

describe('circleTangentTo', () => {
    test('has the distance from the center to the line for radius, and keeps the center', () => {
        expectCircle(circleTangentTo({x: 0, y: 0}, {x: -3, y: 2}, {x: 3, y: 2}), 0, 0, 2)
        expectCircle(circleTangentTo({x: 1, y: 1}, {x: 0, y: 0}, {x: 4, y: 3}), 1, 1, 0.2)
    })

    test('does not depend on the direction of the line', () => {
        expectCircle(circleTangentTo({x: 0, y: 0}, {x: 3, y: 2}, {x: -3, y: 2}), 0, 0, 2)
    })

    test.each([
        ['a center on the line', {x: 0, y: 2}, {x: -3, y: 2}, {x: 3, y: 2}],
        ['a line reduced to a point', {x: 0, y: 0}, {x: 1, y: 1}, {x: 1, y: 1}],
        ['a line that is not a number', {x: 0, y: 0}, {x: NaN, y: 1}, {x: 1, y: 1}]
    ])('with %s does not exist', (_, center, start, end) => {
        expectNowhere(circleTangentTo(center, start, end))
    })
})
