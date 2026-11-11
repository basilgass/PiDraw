import {describe, expect, test} from 'vitest'
import {Polygon} from '../../../src/figures/Polygon/Polygon'
import {Point} from '../../../src/figures/Point/Point'
import type {IPolygonConfig} from '../../../src/figures/Polygon/Polygon.types'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext, graphConfig} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const polygon = (name: string, values: IPolygonConfig) => new Polygon(context, name, values)

    return {context, point, polygon}
}

const pathOf = (polygon: Polygon) => polygon.shape.attr('d') as string

function expectPoint(actual: XY, expected: XY) {
    expect(actual.x).toBeCloseTo(expected.x, 6)
    expect(actual.y).toBeCloseTo(expected.y, 6)
}

describe('Polygon through points', () => {
    test('is closed through its vertices, in order', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]})

        expect(pathOf(p)).toBe('M 400 300 L 500 300 L 400 200 Z')
        expect(p.vertices).toEqual([at(0, 0), at(2, 0), at(0, 2)])
    })

    test('has the center of its vertices for centroid', () => {
        const {polygon} = create()

        expectPoint(polygon('p', {vertices: [at(0, 0), at(3, 0), at(0, 3)]}).centroid, at(1, 1))
    })

    test('follows its points', () => {
        const {polygon, point} = create()
        const A = point('A', 0, 0)
        const B = point('B', 2, 0)
        const C = point('C', 0, 2)
        const p = polygon('p', {vertices: [A, B, C]})

        C.config = {coordinates: {x: 0, y: 4}}
        p.update(true)

        expect(pathOf(p)).toBe('M 400 300 L 500 300 L 400 100 Z')
    })

    test('does not exist if a vertex has no position: it is not drawn, and comes back', () => {
        const {polygon} = create()
        const C = at(0, 2)
        const p = polygon('p', {vertices: [at(0, 0), at(2, 0), C]})

        C.x = NaN
        p.update(true)

        expect(p.element.attr('visibility')).toBe('hidden')
        expect(p.vertices).toEqual([])
        expect(pathOf(p)).toBe('M 0 0')
        expect(p.centroid.x).toBeNaN()

        C.x = 400
        p.update(true)

        expect(p.element.attr('visibility')).toBeFalsy()
        expect(p.vertices).toHaveLength(3)
    })
})

describe('Polygon regular', () => {
    test('has its first vertex above the center, then counterclockwise', () => {
        const {polygon} = create()
        const square = polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 4}})

        expect(pathOf(square)).toBe('M 400 200 L 300 300 L 400 400 L 500 300 Z')
    })

    test('the radius is in units of the x axis', () => {
        const {polygon} = create()
        const vertices = polygon('p', {regular: {center: at(1, 1), radius: 3, sides: 6}}).vertices

        expect(vertices).toHaveLength(6)
        vertices.forEach(v => {
            expect(Math.hypot(v.x - at(1, 1).x, v.y - at(1, 1).y)).toBeCloseTo(150, 6)
        })
    })

    test('the radius can be the distance between two points', () => {
        const {polygon} = create()
        const p = polygon('p', {regular: {center: at(0, 0), radius: {point1: at(0, 0), point2: at(3, 4)}, sides: 5}})

        expect(Math.hypot(p.vertices[0].x - 400, p.vertices[0].y - 300)).toBeCloseTo(250, 6)
    })

    test('a radius from two points that are the same does not exist: it is not drawn', () => {
        const {polygon} = create()
        const p = polygon('p', {regular: {center: at(0, 0), radius: {point1: at(1, 1), point2: at(1, 1)}, sides: 5}})

        expect(p.element.attr('visibility')).toBe('hidden')
        expect(p.vertices).toEqual([])
    })

    test('follows its center', () => {
        const {polygon, point} = create()
        const O = point('O', 0, 0)
        const p = polygon('p', {regular: {center: O, radius: 2, sides: 4}})

        O.config = {coordinates: {x: 1, y: 0}}
        p.update(true)

        expect(pathOf(p)).toBe('M 450 200 L 350 300 L 450 400 L 550 300 Z')
    })
})

describe('Polygon regular on a side', () => {
    test('is on the left of A to B, as seen on the screen', () => {
        const {polygon} = create()
        const square = polygon('p', {onSide: {A: at(0, 0), B: at(2, 0), sides: 4}})

        expect(pathOf(square)).toBe('M 400 300 L 500 300 L 500 200 L 400 200 Z')
    })

    test('is on the other side when A and B are swapped', () => {
        const {polygon} = create()
        const square = polygon('p', {onSide: {A: at(2, 0), B: at(0, 0), sides: 4}})

        expect(pathOf(square)).toBe('M 500 300 L 400 300 L 400 400 L 500 400 Z')
    })

    test('follows its points', () => {
        const {polygon, point} = create()
        const A = point('A', 0, 0)
        const B = point('B', 2, 0)
        const p = polygon('p', {onSide: {A, B, sides: 3}})

        B.config = {coordinates: {x: 4, y: 0}}
        p.update(true)

        expectPoint(p.vertices[1], at(4, 0))
        expectPoint(p.vertices[2], at(2, 4 * Math.sin(Math.PI / 3)))
    })

    test('does not exist if A and B are at the same place', () => {
        const {polygon} = create()
        const p = polygon('p', {onSide: {A: at(1, 1), B: at(1, 1), sides: 5}})

        expect(p.element.attr('visibility')).toBe('hidden')
        expect(p.vertices).toEqual([])
    })
})

describe('Polygon regular star', () => {
    test('the pentagram is one closed path that joins the vertices 2 by 2', () => {
        const {polygon} = create()
        const p = polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 5, star: 2}})
        const vertices = p.vertices
        const expected = [0, 2, 4, 1, 3].map((index, i) => `${i === 0 ? 'M' : 'L'} ${Math.round(vertices[index].x * 100) / 100} ${Math.round(vertices[index].y * 100) / 100}`)

        expect(pathOf(p)).toBe(`${expected.join(' ')} Z`)
    })

    test('a step of 1 is the convex polygon', () => {
        const {polygon} = create()
        const star = polygon('a', {regular: {center: at(0, 0), radius: 2, sides: 5, star: 1}})
        const convex = polygon('b', {regular: {center: at(0, 0), radius: 2, sides: 5}})

        expect(pathOf(star)).toBe(pathOf(convex))
    })

    test('{6/2} is two triangles, two closed paths', () => {
        const {polygon} = create()
        const p = polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 6, star: 2}})

        expect(pathOf(p).match(/M/g)).toHaveLength(2)
        expect(pathOf(p).match(/Z/g)).toHaveLength(2)
        expect(pathOf(p).match(/L/g)).toHaveLength(4)
    })

    test('a star on a segment has the two ends of the segment for vertices', () => {
        const {polygon} = create()
        const p = polygon('p', {onSide: {A: at(0, 0), B: at(2, 0), sides: 5, star: 2}})

        expectPoint(p.vertices[0], at(0, 0))
        expectPoint(p.vertices[2], at(2, 0))
    })
})

describe('Polygon that is not valid', () => {
    test.each([
        ['no construction', {}],
        ['two constructions', {vertices: [at(0, 0), at(1, 0), at(0, 1)], regular: {center: at(0, 0), radius: 1, sides: 4}}],
        ['two vertices', {vertices: [at(0, 0), at(1, 0)]}],
        ['no vertices', {vertices: []}],
        ['vertices that are not a list', {vertices: 3 as never}],
        ['a vertex that is not a position', {vertices: [at(0, 0), at(1, 0), 3 as never]}],
        ['2 sides', {regular: {center: at(0, 0), radius: 1, sides: 2}}],
        ['1001 sides', {regular: {center: at(0, 0), radius: 1, sides: 1001}}],
        ['a number of sides that is not an integer', {regular: {center: at(0, 0), radius: 1, sides: 3.5}}],
        ['a number of sides that is NaN', {regular: {center: at(0, 0), radius: 1, sides: NaN}}],
        ['a number of sides that is infinite', {regular: {center: at(0, 0), radius: 1, sides: Infinity}}],
        ['a radius of 0', {regular: {center: at(0, 0), radius: 0, sides: 5}}],
        ['a radius that is negative', {regular: {center: at(0, 0), radius: -2, sides: 5}}],
        ['a radius that is NaN', {regular: {center: at(0, 0), radius: NaN, sides: 5}}],
        ['a center that is not a position', {regular: {center: 3 as never, radius: 1, sides: 5}}],
        ['a star of 0', {regular: {center: at(0, 0), radius: 1, sides: 5, star: 0}}],
        ['a star that is not an integer', {regular: {center: at(0, 0), radius: 1, sides: 7, star: 1.5}}],
        ['a star of half the sides', {regular: {center: at(0, 0), radius: 1, sides: 6, star: 3}}],
        ['a star of more than half the sides', {regular: {center: at(0, 0), radius: 1, sides: 5, star: 3}}],
        ['a side with a star that is not valid', {onSide: {A: at(0, 0), B: at(1, 0), sides: 5, star: 4}}],
        ['a side with 2 sides', {onSide: {A: at(0, 0), B: at(1, 0), sides: 2}}]
    ] as [string, IPolygonConfig][])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const {context, polygon} = create()

        expect(() => polygon('p', config)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test('a new config draws the polygon again', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]})

        p.config = {regular: {center: at(0, 0), radius: 2, sides: 4}}

        expect(pathOf(p)).toBe('M 400 200 L 300 300 L 400 400 L 500 300 Z')
    })

    test('a config that is not valid leaves the polygon as it was', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]})

        expect(() => {
            p.config = {regular: {center: at(0, 0), radius: 2, sides: 2}}
        }).toThrow(InvalidArgumentError)
        expect(pathOf(p)).toBe('M 400 300 L 500 300 L 400 200 Z')
        expect(p.config.vertices).toHaveLength(3)
    })

    test('the config is a copy: changing the list that was given does not change the polygon', () => {
        const {polygon} = create()
        const vertices = [at(0, 0), at(2, 0), at(0, 2)]
        const p = polygon('p', {vertices})

        vertices.push(at(5, 5))

        expect(p.config.vertices).toHaveLength(3)
    })
})

describe('Polygon label', () => {
    test('is at the center of the vertices, centered', () => {
        const {polygon} = create()
        const label = polygon('p', {vertices: [at(0, 0), at(3, 0), at(0, 3)]}).addLabel('p')

        expectPoint({x: label.x, y: label.y}, at(1, 1))
        expect(label.config.alignement).toBe('mc')
    })

    test('keeps the alignment that was asked for when the polygon moves', () => {
        const {polygon} = create()
        const C = at(0, 3)
        const p = polygon('p', {vertices: [at(0, 0), at(3, 0), C]})
        const label = p.addLabel('p')
        label.position('tl')

        C.y = at(0, 6).y
        p.update(true)

        expect(label.alignementGiven).toBe(true)
        expect(label.config.alignement).toBe('tl')
        expectPoint({x: label.x, y: label.y}, at(1, 2))
    })

    test('a polygon that does not exist leaves its label where it was', () => {
        const {polygon} = create()
        const p = polygon('p', {onSide: {A: at(1, 1), B: at(1, 1), sides: 5}})

        expect(() => p.addLabel('p')).not.toThrow()
    })
})

describe('Polygon TikZ', () => {
    test('is the vertices joined and closed, in units of the coordinate system', () => {
        const {polygon} = create()

        expect(polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]}).tikz())
            .toBe('\\draw[draw=black, line width=0.75pt] (0,0) -- (2,0) -- (0,2) -- cycle;')
    })

    test('has its appearance', () => {
        const {polygon} = create()
        const tikz = polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]}).stroke('red').fill({color: 'blue', opacity: 0.3}).tikz()

        expect(tikz).toContain('draw=pidraw-red')
        expect(tikz).toContain('fill=pidraw-blue, fill opacity=0.3')
    })

    test('a regular polygon is written with its vertices', () => {
        const {polygon} = create()

        expect(polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 4}}).tikz())
            .toBe('\\draw[draw=black, line width=0.75pt] (0,2) -- (-2,0) -- (0,-2) -- (2,0) -- cycle;')
    })

    test('a star with several polygons is a closed path for each one', () => {
        const {polygon} = create()
        const tikz = polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 6, star: 2}}).tikz()

        expect(tikz.match(/-- cycle/g)).toHaveLength(2)
        expect(tikz.match(/\\draw/g)).toHaveLength(1)
    })

    test('the label is a node at the center', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(3, 0), at(0, 3)]})
        p.addLabel('$p$')

        expect(p.tikz()).toMatch(/cycle;\n\\node at \(1,1\) \{\$p\$\};$/)
    })

    test('a polygon that is hidden or does not exist writes nothing', () => {
        const {polygon} = create()
        const hidden = polygon('p', {vertices: [at(0, 0), at(2, 0), at(0, 2)]})
        hidden.hide()

        expect(hidden.tikz()).toBe('')
        expect(polygon('q', {onSide: {A: at(1, 1), B: at(1, 1), sides: 5}}).tikz()).toBe('')
    })
})

describe('Polygon label fields', () => {
    const labelOf = (p: Polygon, field: 'perimeter' | 'area', digits?: number) => {
        p.addLabel([{field, ...(digits === undefined ? {} : {digits})}])

        return p.computeLabel()
    }

    test('it shows its perimeter and its area, in units of the coordinate system', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(3, 0), at(0, 4)]})

        expect(labelOf(p, 'perimeter')).toBe('12')
        expect(labelOf(p, 'area')).toBe('6')
    })

    test('it has no default field', () => {
        const {polygon} = create()

        expect(polygon('p', {vertices: [at(0, 0), at(3, 0), at(0, 4)]}).defaultLabelField()).toBeNull()
    })

    test('its fields follow the points it goes through', () => {
        const {point, polygon} = create()
        const C = point('C', 0, 4)
        const p = polygon('p', {vertices: [point('A', 0, 0), point('B', 3, 0), C]})

        labelOf(p, 'area')
        C.config = {coordinates: {x: 0, y: 2}}
        p.computed().updateLabel()

        expect(p.computeLabel()).toBe('3')
    })

    test('a regular hexagon of radius 2 has the area of six equilateral triangles', () => {
        const {polygon} = create()
        const p = polygon('h', {regular: {center: at(0, 0), radius: 2, sides: 6}})

        expect(labelOf(p, 'area', 4)).toBe('10.3923')
        expect(labelOf(p, 'perimeter')).toBe('12')
    })

    test('a star made of two triangles adds the area of each one', () => {
        const {polygon} = create()
        const p = polygon('s', {regular: {center: at(0, 0), radius: 2, sides: 6, star: 2}})

        // Two equilateral triangles of side 2 * sqrt(3).
        expect(labelOf(p, 'area', 4)).toBe('10.3923')
        expect(labelOf(p, 'perimeter', 4)).toBe('20.7846')
    })
})

describe('Polygon label with a unit and a scale', () => {
    const measured = (unit: 'm' | null, scale: number) => {
        const context = createContext({...graphConfig(), measure: {unit, scale}})

        return new Polygon(context, 'p', {vertices: [at(0, 0), at(3, 0), at(0, 4)]})
    }
    const labelOf = (p: Polygon, field: 'perimeter' | 'area') => {
        p.addLabel([{field}])

        return p.computeLabel()
    }

    test('the perimeter is multiplied by the scale and the area by its square', () => {
        const p = measured('m', 2)

        expect(labelOf(p, 'perimeter')).toBe('24 m')
        expect(labelOf(p, 'area')).toBe('24 m²')
    })

    test('nothing is added without a unit and a scale', () => {
        const p = measured(null, 1)

        expect(labelOf(p, 'perimeter')).toBe('12')
        expect(labelOf(p, 'area')).toBe('6')
    })
})

describe('Polygon as the reference of a label', () => {
    test('is the center of its vertices', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(4, 0), at(0, 4)]})

        expect(p.referenceable).toBe(true)
        expect(p.referenceAnchorPoint()?.x).toBeCloseTo(400 + 200 / 3, 6)
        expect(p.referenceAnchorPoint()?.y).toBeCloseTo(300 - 200 / 3, 6)
    })
})

describe('Polygon as a figure to snap to', () => {
    test('is attracted to its vertices, then to the middle of each side', () => {
        const {polygon} = create()
        const p = polygon('p', {vertices: [at(0, 0), at(4, 0), at(0, 4)]})

        expect(p.snappable).toBe(true)
        expect(p.snapPoints()).toEqual([
            at(0, 0), at(4, 0), at(0, 4),
            at(2, 0), at(2, 2), at(0, 2)
        ])
    })

    test('the middles of a star are the ones of the sides that are drawn', () => {
        const {polygon} = create()
        const p = polygon('p', {regular: {center: at(0, 0), radius: 2, sides: 5, star: 2}})
        const vertices = p.vertices
        const middles = p.snapPoints().slice(5)

        expect(middles).toHaveLength(5)
        // The pentagram joins the vertices 2 by 2.
        for (const [i, [from, to]] of [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0]].entries()) {
            expectPoint(middles[i], {x: (vertices[from].x + vertices[to].x) / 2, y: (vertices[from].y + vertices[to].y) / 2})
        }
    })

    test('attracts nowhere when it does not exist', () => {
        const {polygon} = create()

        expect(polygon('p', {vertices: [at(0, 0), at(1, 0), at(NaN, NaN)]}).snapPoints()).toEqual([])
    })
})
