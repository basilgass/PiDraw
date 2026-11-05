import {describe, expect, test} from 'vitest'
import {
    cartesianToAngle,
    distanceAB,
    isDefinedPosition,
    mathLine,
    mathVector,
    nowhere,
    polarToCartesian
} from '../../src/calculus/geometry'
import {InvalidArgumentError} from '../../src/errors'

describe('nowhere', () => {
    test('is a position whose two coordinates are NaN', () => {
        const position = nowhere()

        expect(position.x).toBeNaN()
        expect(position.y).toBeNaN()
    })

    test('is a new object at each call: a figure never shares its position with another', () => {
        expect(nowhere()).not.toBe(nowhere())
    })

    test('is not a defined position', () => {
        expect(isDefinedPosition(nowhere())).toBe(false)
    })
})

describe('isDefinedPosition', () => {
    test.each([
        [{x: 0, y: 0}],
        [{x: -3.5, y: 1e9}]
    ])('%j is defined', (position) => {
        expect(isDefinedPosition(position)).toBe(true)
    })

    test.each([
        [{x: NaN, y: 0}],
        [{x: 0, y: NaN}],
        [{x: Infinity, y: 0}],
        [{x: 0, y: -Infinity}],
        [{x: NaN, y: NaN}]
    ])('%j is not defined', (position) => {
        expect(isDefinedPosition(position)).toBe(false)
    })
})

describe('distanceAB', () => {
    test('is the euclidean distance', () => {
        expect(distanceAB({x: 0, y: 0}, {x: 3, y: 4})).toBe(5)
        expect(distanceAB({x: 1, y: 1}, {x: 1, y: 1})).toBe(0)
        expect(distanceAB({x: -1, y: -1}, {x: 2, y: 3})).toBe(5)
    })
})

describe('mathVector', () => {
    test('can be built from components, from a point or from two points', () => {
        const fromComponents = new mathVector(3, 4)
        const fromPoint = new mathVector({x: 3, y: 4})
        const fromPoints = new mathVector({x: 1, y: 1}, {x: 4, y: 5})

        for (const v of [fromComponents, fromPoint, fromPoints]) {
            expect([v.x, v.y]).toEqual([3, 4])
        }
    })

    test('does not keep a reference to the point it is built from', () => {
        const point = {x: 1, y: 2}
        const v = new mathVector(point)
        v.x = 10

        expect(point.x).toBe(1)
    })

    test.each([
        [undefined, undefined],
        ['abc', 1],
        [1, ''],
        [1, undefined],
        [{a: 1}, undefined],
    ])('(%s, %s) cannot build a vector', (x, y) => {
        expect(() => new mathVector(x as unknown as number, y as unknown as number)).toThrow(InvalidArgumentError)
    })

    test('the components can be NaN: the value of an undefined result', () => {
        expect(new mathVector(NaN, 1).x).toBeNaN()
    })

    test('the norm, the unit vector and the normal', () => {
        const v = new mathVector(3, 4)

        expect(v.norm).toBe(5)
        expect(v.unit.x).toBeCloseTo(0.6, 12)
        expect(v.unit.y).toBeCloseTo(0.8, 12)
        expect(v.unit.norm).toBeCloseTo(1, 12)
        expect([v.normal.x, v.normal.y]).toEqual([4, -3])
        expect(mathVector.scalarProduct(v, v.normal)).toBe(0)
    })

    test('the unit vector of the null vector is NaN, not an error', () => {
        const unit = new mathVector(0, 0).unit

        expect(unit.x).toBeNaN()
        expect(unit.y).toBeNaN()
    })

    test('add returns a new vector', () => {
        const u = new mathVector(1, 2)
        const sum = u.add(new mathVector(3, 4))

        expect([sum.x, sum.y]).toEqual([4, 6])
        expect([u.x, u.y]).toEqual([1, 2])
    })

    test.each([
        [0, 1, 0],
        [90, 0, 1],
        [180, -1, 0],
        [270, 0, -1],
        [360, 1, 0],
        [-90, 0, -1],
    ])('rotate by %d degrees the vector (1, 0)', (angle, x, y) => {
        const v = new mathVector(1, 0).rotate(angle)

        expect(v.x).toBeCloseTo(x, 12)
        expect(v.y).toBeCloseTo(y, 12)
    })

    test('rotate and setLength change the vector and return it', () => {
        const v = new mathVector(1, 0)

        expect(v.rotate(90)).toBe(v)
        expect(v.y).toBeCloseTo(1, 12)
        expect(v.setLength(5)).toBe(v)
        expect(v.norm).toBeCloseTo(5, 12)
        expect(v.y).toBeCloseTo(5, 12)
    })

    test('setLength keeps the direction and accepts a negative length', () => {
        const v = new mathVector(3, 4).setLength(-10)

        expect(v.x).toBeCloseTo(-6, 12)
        expect(v.y).toBeCloseTo(-8, 12)
    })

    test('projection on another vector', () => {
        const p = new mathVector(3, 4).projection(new mathVector(2, 0))

        expect([p.x, p.y]).toEqual([3, 0])
    })

    test('projection on the null vector is NaN, not an error', () => {
        const p = new mathVector(3, 4).projection(new mathVector(0, 0))

        expect(p.x).toBeNaN()
    })
})

describe('mathLine', () => {
    const line = (A: [number, number], B: [number, number]) =>
        new mathLine({x: A[0], y: A[1]}, {x: B[0], y: B[1]})

    test('can be built from a point and a vector', () => {
        const l = new mathLine({x: 1, y: 1}, new mathVector(2, 0))

        expect([l.director.x, l.director.y]).toEqual([2, 0])
    })

    test('intersection of two secant lines', () => {
        expect(line([0, 0], [1, 1]).intersection(line([0, 2], [2, 0]))).toEqual({x: 1, y: 1})
        expect(line([0, 0], [4, 2]).intersection(line([3, -5], [3, 7]))).toEqual({x: 3, y: 1.5})
    })

    test('intersection with a vertical or a horizontal line, in both orders', () => {
        const vertical = line([3, 0], [3, 5])
        const horizontal = line([0, 2], [9, 2])
        const diagonal = line([0, 0], [1, 1])

        expect(vertical.intersection(diagonal)).toEqual({x: 3, y: 3})
        expect(diagonal.intersection(vertical)).toEqual({x: 3, y: 3})
        expect(vertical.intersection(horizontal)).toEqual({x: 3, y: 2})
        expect(horizontal.intersection(vertical)).toEqual({x: 3, y: 2})
    })

    test('parallel lines, vertical or not, have no intersection', () => {
        expect(line([0, 0], [1, 1]).intersection(line([0, 1], [1, 2]))).toBeNull()
        expect(line([3, 0], [3, 5]).intersection(line([4, 0], [4, 5]))).toBeNull()
        expect(line([0, 0], [1, 0]).intersection(line([0, 3], [5, 3]))).toBeNull()
    })

    test('the same line has no single intersection', () => {
        expect(line([0, 0], [1, 1]).intersection(line([0, 0], [2, 2]))).toBeNull()
        expect(line([0, 0], [1, 1]).intersection(line([3, 3], [-1, -1]))).toBeNull()
    })

    test('a nearly parallel line is treated as parallel', () => {
        expect(line([0, 0], [1, 1]).intersection(line([0, 1], [1, 2 + 1e-14]))).toBeNull()
    })

    test('a line with a null direction has no intersection', () => {
        expect(line([1, 1], [1, 1]).intersection(line([0, 0], [1, 0]))).toBeNull()
    })

    test('projection of a point on the line', () => {
        expect(line([0, 0], [4, 0]).projection({x: 3, y: 5})).toEqual({x: 3, y: 0})
        expect(line([0, 0], [1, 1]).projection({x: 2, y: 0})).toEqual({x: 1, y: 1})
        expect(line([0, 1], [3, 1]).projection({x: 7, y: 7})).toEqual({x: 7, y: 1})
    })

    test('projection on a line with a null direction is NaN, not an error', () => {
        expect(line([1, 1], [1, 1]).projection({x: 2, y: 2}).x).toBeNaN()
    })
})

describe('polarToCartesian and cartesianToAngle', () => {
    const O = {x: 10, y: 20}

    test.each([
        [0, 15, 20],
        [90, 10, 15],
        [180, 5, 20],
        [270, 10, 25],
    ])('the point at %d degrees and a radius of 5', (angle, x, y) => {
        const p = polarToCartesian(O.x, O.y, 5, angle)

        expect(p.x).toBeCloseTo(x, 12)
        expect(p.y).toBeCloseTo(y, 12)
    })

    test.each([
        [{x: 1, y: 0}, 0],
        [{x: 1, y: -1}, 45],
        [{x: 0, y: -1}, 90],
        [{x: -1, y: -1}, 135],
        [{x: -1, y: 0}, 180],
        [{x: -1, y: 1}, 225],
        [{x: 0, y: 1}, 270],
        [{x: 1, y: 1}, 315],
    ])('the angle of the direction %o is %d', (direction, expected) => {
        const angle = cartesianToAngle(O, {x: O.x + direction.x, y: O.y + direction.y})

        expect(angle).toBeCloseTo(expected, 12)
    })

    test('the angle is never negative nor -0', () => {
        expect(Object.is(cartesianToAngle(O, {x: 20, y: 20}), 0)).toBe(true)

        for (let degrees = 0; degrees < 360; degrees += 15) {
            const angle = cartesianToAngle(O, polarToCartesian(O.x, O.y, 7, degrees))

            expect(angle).toBeGreaterThanOrEqual(0)
            expect(angle).toBeLessThan(360)
        }
    })

    test('are the inverse of each other', () => {
        for (let degrees = 0; degrees < 360; degrees += 7) {
            const p = polarToCartesian(O.x, O.y, 12, degrees)

            expect(cartesianToAngle(O, p)).toBeCloseTo(degrees, 9)
        }
    })
})
