import {describe, expect, test} from 'vitest'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import type {ICircleConfig} from '../../../src/figures/Circle/Circle.types'
import {InvalidArgumentError} from '../../../src/errors'
import {toCoordinates} from '../../../src/calculus'
import type {IGraphConfig} from '../../../src/pidraw.common'
import {createAxes, createContext, graphConfig} from '../../helpers/figure'

// The figures of a drawing, with points placed in units of the coordinate system (800 x 600 pixels, 50 pixels per unit).
function create(config?: IGraphConfig) {
    const context = createContext(config)
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const circle = (name: string, constraints: ICircleConfig) => new Circle(context, name, constraints)
    const line = (name: string, A: Point, B: Point) => new Line(context, name, {through: {A, B}})

    return {context, point, circle, line, axes: createAxes(context)}
}

// The center and the radius of the circle, in units of the coordinate system (the radius in units of the x axis).
function expectCircle(circle: Circle, x: number, y: number, radius: number) {
    const center = toCoordinates(circle.center, circle.graphConfig)

    expect(center.x).toBeCloseTo(x, 8)
    expect(center.y).toBeCloseTo(y, 8)
    expect(toCoordinates(circle.radius, circle.graphConfig)).toBeCloseTo(radius, 8)
}

function expectNowhere(circle: Circle) {
    expect(circle.element.attr('visibility')).toBe('hidden')
    expect(circle.center.x).toBeNaN()
    expect(circle.radius).toBeNaN()
    expect(Number.isNaN(+circle.shape.attr('r'))).toBe(false)
}

describe('Circle given by its center and its radius', () => {
    test('a radius that is a number is in units of the x axis', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 2), radius: 2})

        expectCircle(c, 1, 2, 2)
        expect([+c.shape.attr('r'), +c.shape.attr('cx'), +c.shape.attr('cy')]).toEqual([100, 450, 200])
    })

    test('a radius that is a number keeps the circle round when the axes have different scales', () => {
        const config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        const {point, circle} = create(config)
        const c = circle('c', {center: point('O', 0, 0), radius: 1})

        expect(c.radius).toBe(100)
        expect(+c.shape.attr('r')).toBe(100)
    })

    test('a radius that is a point is the distance to the center', () => {
        const {point, circle} = create()

        expectCircle(circle('c', {center: point('O', 1, 2), radius: point('A', 3, 2)}), 1, 2, 2)
    })

    test('a radius that is the distance between two points', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 2), radius: {point1: point('A', 0, 0), point2: point('B', 0, 3)}})

        expectCircle(c, 1, 2, 3)
    })

    test('the circle follows the points it depends on, when it is computed again', () => {
        const {point, circle} = create()
        const O = point('O', 0, 0)
        const A = point('A', 2, 0)
        const c = circle('c', {center: O, radius: A})

        O.pixels = {x: 450, y: 250}
        A.pixels = {x: 450, y: 150}
        c.update(true)

        expectCircle(c, 1, 1, 2)
    })

    test('a center that is a plain position is allowed', () => {
        const {circle} = create()

        expectCircle(circle('c', {center: {x: 450, y: 250}, radius: 1}), 1, 1, 1)
    })
})

describe('Circle through three points', () => {
    test('is the circumscribed circle of the triangle', () => {
        const {point, circle} = create()

        expectCircle(circle('c', {through: {A: point('A', 0, 0), B: point('B', 4, 0), C: point('C', 0, 3)}}), 2, 1.5, 2.5)
    })

    test('is not drawn when the points are aligned, and is drawn again when they are not', () => {
        const {point, circle} = create()
        const C = point('C', 2, 2)
        const c = circle('c', {through: {A: point('A', 0, 0), B: point('B', 1, 1), C}})

        expectNowhere(c)

        C.pixels = {x: 400, y: 200}
        c.update(true)

        expect(c.element.attr('visibility')).toBeFalsy()
        expect(c.radius).toBeGreaterThan(0)
    })
})

describe('Circle tangent to a line', () => {
    test('has the distance from the center to the line for radius', () => {
        const {point, circle, line} = create()
        const d = line('d', point('A', -3, 2), point('B', 3, 2))

        expectCircle(circle('c', {tangent: {center: point('O', 0, 0), to: d}}), 0, 0, 2)
    })

    test('is not drawn when the center is on the line', () => {
        const {point, circle, line} = create()
        const d = line('d', point('A', -3, 2), point('B', 3, 2))

        expectNowhere(circle('c', {tangent: {center: point('O', 1, 2), to: d}}))
    })

    test.each([
        ['Ox', 2],
        ['Oy', 1]
    ] as const)('is tangent to the axis %s: the radius is the distance from the center to it', (axis, radius) => {
        const {point, circle, axes} = create()

        expectCircle(circle('c', {tangent: {center: point('O', 1, 2), to: axes[axis]}}), 1, 2, radius)
    })

    test('is tangent to an axis with the distance on the screen when the axes have different scales', () => {
        const config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        const {point, circle, axes} = create(config)

        expect(circle('c', {tangent: {center: point('O', 1, 2), to: axes.Ox}}).radius).toBe(100)
        expect(circle('d', {tangent: {center: point('O2', 1, 2), to: axes.Oy}}).radius).toBe(100)
    })

    test.each([
        ['Ox', 3, 0],
        ['Oy', 0, 3]
    ] as const)('is not drawn when the center is on the axis %s', (axis, x, y) => {
        const {point, circle, axes} = create()

        expectNowhere(circle('c', {tangent: {center: point('O', x, y), to: axes[axis]}}))
    })

    test('is tangent to an axis that is not orthogonal to the other one: the distance is the one to the axis itself', () => {
        const {point, circle, axes} = create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 30, y: -40}}}))
        const c = circle('c', {tangent: {center: point('O', 1, 0), to: axes.Oy}})

        // The center is at (50, 0) pixels from the origin, the y axis goes by (30, -40): the distance is |50 * 40| / 50 = 40 pixels.
        expect(c.radius).toBeCloseTo(40, 6)
    })

    test.each(['d', 'Oz', 3])('is not a circle when "to" is %j, which is neither a line nor an axis', (to) => {
        const {point, context} = create()

        expect(() => new Circle(context, 'c', {tangent: {center: point('O', 0, 0), to: to as never}})).toThrow(InvalidArgumentError)
    })
})

describe('Circle with a diameter', () => {
    test('has the middle of the segment for center and half of it for radius', () => {
        const {point, circle} = create()

        expectCircle(circle('c', {diameter: {A: point('A', 0, 0), B: point('B', 4, 0)}}), 2, 0, 2)
    })

    test('is not drawn when the two points are the same', () => {
        const {point, circle} = create()
        const A = point('A', 1, 1)

        expectNowhere(circle('c', {diameter: {A, B: A}}))
    })
})

describe('Circle inscribed in a triangle', () => {
    test('is tangent to the three sides', () => {
        const {point, circle} = create()

        expectCircle(circle('c', {inscribed: {A: point('A', 0, 0), B: point('B', 4, 0), C: point('C', 0, 3)}}), 1, 1, 1)
    })

    test('is not drawn when the points are aligned', () => {
        const {point, circle} = create()

        expectNowhere(circle('c', {inscribed: {A: point('A', 0, 0), B: point('B', 1, 1), C: point('C', 2, 2)}}))
    })
})

describe('Circle configuration that is not valid', () => {
    test('a configuration without a construction is an InvalidArgumentError that names the circle', () => {
        const {context} = create()

        expect(() => new Circle(context, 'c', {} as ICircleConfig)).toThrow(InvalidArgumentError)
        expect(() => new Circle(context, 'c', {} as ICircleConfig)).toThrow(/"c"/)
    })

    test('a center without a radius is an InvalidArgumentError', () => {
        const {context} = create()

        expect(() => new Circle(context, 'c', {center: {x: 0, y: 0}} as ICircleConfig)).toThrow(InvalidArgumentError)
    })

    test('several constructions are an InvalidArgumentError', () => {
        const {context, point} = create()
        const A = point('A', 0, 0)

        expect(() => new Circle(context, 'c', {center: A, radius: 1, diameter: {A, B: A}} as unknown as ICircleConfig))
            .toThrow(InvalidArgumentError)
        expect(() => new Circle(context, 'c', {through: {A, B: A, C: A}, inscribed: {A, B: A, C: A}} as unknown as ICircleConfig))
            .toThrow(InvalidArgumentError)
    })

    test('a center that goes with another construction than a radius is an InvalidArgumentError', () => {
        const {context, point} = create()
        const A = point('A', 0, 0)

        expect(() => new Circle(context, 'c', {center: A, diameter: {A, B: A}} as unknown as ICircleConfig))
            .toThrow(InvalidArgumentError)
    })

    test.each([0, -1, NaN, Infinity])('a radius of %s is an InvalidArgumentError', (radius) => {
        const {context, point} = create()

        expect(() => new Circle(context, 'c', {center: point('O', 0, 0), radius})).toThrow(InvalidArgumentError)
    })

    test.each([
        ['a center that is not a position', {center: 'O', radius: 1}],
        ['a radius that is not a number or a position', {center: {x: 0, y: 0}, radius: 'big'}],
        ['a point of the diameter that is not a position', {diameter: {A: {x: 0, y: 0}, B: 'B'}}]
    ])('%s is an InvalidArgumentError', (_, config) => {
        const {context} = create()

        expect(() => new Circle(context, 'c', config as unknown as ICircleConfig)).toThrow(InvalidArgumentError)
    })

    test('a circle that is refused leaves nothing in the svg', () => {
        const {context} = create()

        expect(() => new Circle(context, 'c', {} as ICircleConfig)).toThrow()
        expect(context.rootSVG.findOne('#c')).toBeNull()
    })
})

describe('Circle without a position', () => {
    test('a center that is not a number hides the circle, without NaN in its shape', () => {
        const {circle} = create()

        expectNowhere(circle('c', {center: {x: NaN, y: NaN}, radius: 2}))
    })

    test('a radius that is a point on the center hides the circle, and it is drawn again when the point moves', () => {
        const {point, circle} = create()
        const A = point('A', 0, 0)
        const c = circle('c', {center: point('O', 0, 0), radius: A})

        expectNowhere(c)

        A.pixels = {x: 500, y: 300}
        c.update(true)

        expect(c.element.attr('visibility')).toBeFalsy()
        expectCircle(c, 0, 0, 2)
    })
})

describe('Circle new configuration', () => {
    test('the radius is the same as with the constructor', () => {
        const {point, circle} = create()
        const O = point('O', 0, 0)
        const c = circle('c', {center: O, radius: 2})

        c.config = {center: O, radius: 3}

        expect(+c.shape.attr('r')).toBe(150)
        expectCircle(c, 0, 0, 3)
    })

    test('the circle takes another construction', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        c.config = {diameter: {A: point('A', 0, 0), B: point('B', 4, 0)}}

        expectCircle(c, 2, 0, 2)
        expect(+c.shape.attr('cx')).toBe(500)
    })

    test('a new configuration that is not valid leaves the circle as it was', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        expect(() => {
            c.config = {} as ICircleConfig
        }).toThrow(InvalidArgumentError)
        expect(() => {
            c.config = {center: {x: 0, y: 0}, radius: -2}
        }).toThrow(InvalidArgumentError)

        expectCircle(c, 0, 0, 2)
        expect(+c.shape.attr('r')).toBe(100)
    })

    test('the label follows the new configuration', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})
        const label = c.addLabel('c')

        c.config = {diameter: {A: point('A', 0, 0), B: point('B', 4, 0)}}

        expect(label.x).toBeCloseTo(500, 6)
    })
})

describe('Circle intersections', () => {
    test('with a line gives two points, in the order of the line', () => {
        const {point, circle, line} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})
        const d = line('d', point('A', -3, 0), point('B', 3, 0))

        const result = c.intersectionWithLine(d)

        expect(result?.map(p => toCoordinates(p, c.graphConfig).x)).toEqual([expect.closeTo(-2, 6), expect.closeTo(2, 6)])
    })

    test('with a segment is with the whole line', () => {
        const {context, point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})
        const s = new Line(context, 's', {through: {A: point('C', -1, 0), B: point('D', 1, 0)}, shape: 'segment'})

        expect(c.intersectionWithLine(s)).toHaveLength(2)
    })

    test('with a line that touches it is one point', () => {
        const {point, circle, line} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        expect(c.intersectionWithLine(line('d', point('A', -3, 2), point('B', 3, 2)))).toHaveLength(1)
    })

    test('with a line that misses it is null', () => {
        const {point, circle, line} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        expect(c.intersectionWithLine(line('d', point('A', -3, 5), point('B', 3, 5)))).toBeNull()
    })

    test('with another circle gives two points, or one when they touch', () => {
        const {point, circle} = create()
        const c1 = circle('c1', {center: point('O1', 0, 0), radius: 5})
        const c2 = circle('c2', {center: point('O2', 6, 0), radius: 5})
        const c3 = circle('c3', {center: point('O3', 10, 0), radius: 5})

        expect(c1.intersectionWithCircle(c2)).toHaveLength(2)
        expect(c1.intersectionWithCircle(c3)).toHaveLength(1)
    })

    test('with a circle that is not drawn is null', () => {
        const {point, circle} = create()
        const c1 = circle('c1', {center: point('O1', 0, 0), radius: 5})
        const c2 = circle('c2', {center: {x: NaN, y: NaN}, radius: 5})

        expect(c1.intersectionWithCircle(c2)).toBeNull()
    })
})

describe('Circle follow', () => {
    // Pixels: the origin is at (400, 300), 50 pixels per unit, y points down. The circle has a radius of 100 pixels.
    const unit = () => {
        const {point, circle} = create()

        return circle('c', {center: point('O', 0, 0), radius: 2})
    }

    test('a point is projected on the circle', () => {
        const result = unit().follow(700, 300)

        expect(result.x).toBeCloseTo(500, 6)
        expect(result.y).toBeCloseTo(300, 6)
    })

    test('a point inside the circle goes out to the circle', () => {
        const result = unit().follow(400, 250)

        expect(result.x).toBeCloseTo(400, 6)
        expect(result.y).toBeCloseTo(200, 6)
    })

    test('the center is projected on the right of the circle', () => {
        expect(unit().follow(400, 300)).toEqual({x: 500, y: 300})
    })

    test('a circle that is not drawn leaves the point where it is', () => {
        const {circle} = create()

        expect(circle('c', {center: {x: NaN, y: NaN}, radius: 2}).follow(123, 456)).toEqual({x: 123, y: 456})
    })
})

describe('Circle label', () => {
    test('is exactly at the center of the circle, centered on it', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 1), radius: 2})
        const label = c.addLabel('c')

        expect(label.x).toBeCloseTo(450, 6)
        expect(label.y).toBeCloseTo(250, 6)
        expect(label.alignement).toBe('mc')
    })

    test('keeps the position that was asked for', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})
        const label = c.addLabel('c')

        label.position('tl')
        c.moveLabel()

        expect(label.alignement).toBe('tl')
    })

    test('stays where it was for a circle that is not drawn, without NaN', () => {
        const {circle} = create()
        const label = circle('c', {center: {x: NaN, y: NaN}, radius: 2}).addLabel('c')

        expect(label.x).not.toBeNaN()
        expect(label.y).not.toBeNaN()
    })
})

describe('Circle tikz', () => {
    const style = 'draw=black, line width=0.75pt'

    const make = (config?: IGraphConfig) => {
        const {point, circle} = create(config)

        return circle('c', {center: point('O', 1, 2), radius: 2})
    }

    test('is a circle around the center, in units of the coordinate system', () => {
        expect(make().tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=2];`)
    })

    test('is a circle that stays round when the axes have different scales', () => {
        const config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        const {point, circle} = create(config)
        const c = circle('c', {center: point('O', 0, 0), radius: 1})

        expect(c.tikz()).toBe(`\\draw[${style}] (0,0) circle[x radius=1, y radius=2];`)
    })

    test('writes the appearance of the circle as options', () => {
        const tikz = make().fill({color: 'red', opacity: 0.5}).stroke('blue', 2).dash('4 2').tikz()

        expect(tikz).toContain('draw=pidraw-blue, line width=1.5pt, fill=pidraw-red, fill opacity=0.5, dash pattern=on 3pt off 1.5pt')
    })

    test('writes the label as a node at the center of the circle', () => {
        const c = make()
        c.addLabel('c')

        expect(c.tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=2];\n\\node at (1,2) {c};`)
    })

    test('a color that has no equivalent in LaTeX is an InvalidArgumentError', () => {
        const c = make().stroke('periwinkle')

        expect(() => c.tikz()).toThrow(InvalidArgumentError)
    })

    test('a circle that is hidden or not drawn is not written', () => {
        const hidden = make()
        hidden.hide()
        const {circle} = create()

        expect(hidden.tikz()).toBe('')
        expect(circle('c', {center: {x: NaN, y: NaN}, radius: 2}).tikz()).toBe('')
    })

    test('a circle whose shape is hidden keeps its label only, and a circle whose label is hidden keeps its shape only', () => {
        const noShape = make()
        noShape.addLabel('c')
        noShape.shape.hide()
        const noLabel = make()
        noLabel.addLabel('c').hide()

        expect(noShape.tikz()).toBe('\\node at (1,2) {c};')
        expect(noLabel.tikz()).toBe(`\\draw[${style}] (1,2) circle[radius=2];`)
    })
})

describe('Circle label fields', () => {
    const labelOf = (c: Circle, field: 'radius' | 'perimeter' | 'area', digits?: number) => {
        c.addLabel([{field, ...(digits === undefined ? {} : {digits})}])

        return c.computeLabel()
    }

    test('it shows its radius, its perimeter and its area, in units of the coordinate system', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        expect(labelOf(c, 'radius')).toBe('2')
        expect(labelOf(c, 'perimeter')).toBe('12.57')
        expect(labelOf(c, 'area', 4)).toBe('12.5664')
    })

    test('it has no default field', () => {
        const {point, circle} = create()

        expect(circle('c', {center: point('O', 0, 0), radius: 2}).defaultLabelField()).toBeNull()
    })

    test('the area is written at the center, centered', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 1), radius: 2})

        labelOf(c, 'area')

        expect(c.label?.alignement).toBe('mc')
        expect(c.label?.x).toBeCloseTo(450, 6)
        expect(c.label?.y).toBeCloseTo(250, 6)
    })

    test('the other fields are written at the center too', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 0, 0), radius: 2})

        labelOf(c, 'radius')

        expect(c.label?.x).toBeCloseTo(400, 6)
        expect(c.label?.y).toBeCloseTo(300, 6)
        expect(c.label?.alignement).toBe('mc')
    })
})

describe('Circle label with a unit and a scale', () => {
    const measured = (unit: 'cm' | 'u' | null, scale: number) => {
        const {point, circle} = create({...graphConfig(), measure: {unit, scale}})

        return circle('c', {center: point('O', 0, 0), radius: 2})
    }
    const labelOf = (c: Circle, field: 'radius' | 'perimeter' | 'area') => {
        c.addLabel([{field, digits: 1}])

        return c.computeLabel()
    }

    test('the radius and the perimeter are multiplied by the scale', () => {
        const c = measured('cm', 0.5)

        expect(labelOf(c, 'radius')).toBe('1 cm')
        expect(labelOf(c, 'perimeter')).toBe('6.3 cm')
    })

    test('the area is multiplied by the square of the scale', () => {
        expect(labelOf(measured('cm', 0.5), 'area')).toBe('3.1 cm²')
    })

    test('the generic unit u is written like the others', () => {
        expect(labelOf(measured('u', 1), 'radius')).toBe('2 u')
    })

    test('the unit follows the graph when its layout changes', () => {
        const c = measured(null, 1)

        expect(labelOf(c, 'radius')).toBe('2')

        c.graphConfig.measure = {unit: 'cm', scale: 3}
        c.updateLabel()

        expect(c.computeLabel()).toBe('6 cm')
    })
})

describe('Figures as the reference of a label', () => {
    test('a point is its position', () => {
        const {point} = create()
        const A = point('A', 1, 2)

        expect(A.referenceable).toBe(true)
        expect(A.referenceAnchorPoint()).toEqual({x: 450, y: 200})
    })

    test('a circle is its center', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 1), radius: 2})

        expect(c.referenceable).toBe(true)
        expect(c.referenceAnchorPoint()).toEqual({x: 450, y: 250})
    })

    test('a line is none: it is not a point', () => {
        const {point, line} = create()
        const d = line('d', point('A', 0, 0), point('B', 1, 1))

        expect(d.referenceable).toBe(false)
        expect(d.referenceAnchorPoint()).toBeNull()
        expect(() => point('P', 2, 2).setLabelReference(d)).toThrow(InvalidArgumentError)
    })

    test('the label of a figure is pushed from its reference, and back to its own side without one', () => {
        const {point} = create()
        const O = point('O', 0, 0)
        const A = point('A', 2, 0)

        A.addLabel('A')
        expect(A.label?.config.away).toBeNull()

        A.setLabelReference(O)
        expect(A.label?.config.away).toEqual({x: 1, y: 0})

        A.setLabelReference(null)
        expect(A.label?.config.away).toBeNull()
    })

    test('a label at the place of its reference lies in no direction and is left alone', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 1), radius: 2})

        c.setLabelReference(c)
        c.addLabel('c')

        expect(c.label?.config.away).toBeNull()
        expect(c.label?.alignement).toBe('mc')
    })

    test('resetStyle forgets the reference', () => {
        const {point} = create()
        const A = point('A', 2, 0)

        A.setLabelReference(point('O', 0, 0))
        A.resetStyle()

        expect(A.labelReference).toBeNull()
    })
})

describe('Circle as a figure to snap to', () => {
    test('is attracted to its center, and not to its outline', () => {
        const {point, circle} = create()
        const c = circle('c', {center: point('O', 1, 1), radius: 2})

        expect(c.snappable).toBe(true)
        expect(c.snapPoints()).toEqual([{x: 450, y: 250}])
    })

    test('attracts nowhere when it does not exist', () => {
        const {circle} = create()

        expect(circle('c', {center: {x: NaN, y: NaN}, radius: 2}).snapPoints()).toEqual([])
    })
})
