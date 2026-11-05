import {describe, expect, test} from 'vitest'
import {Arc} from '../../../src/figures/Arc/Arc'
import {Point} from '../../../src/figures/Point/Point'
import type {IArcConfig} from '../../../src/figures/Arc/Arc.types'
import {InvalidArgumentError} from '../../../src/errors'
import type {IGraphConfig, XY} from '../../../src/pidraw.common'
import {createContext, graphConfig} from '../../helpers/figure'

// A position given in units of the coordinate system (800 x 600 pixels, 50 pixels per unit, the origin in the middle), in pixels.
const at = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})

function create(config?: IGraphConfig) {
    const context = createContext(config)
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const arc = (name: string, values: IArcConfig) => new Arc(context, name, values)

    return {context, point, arc}
}

/** The numbers of the path of an arc, with the letters. */
function pathOf(arc: Arc): (string | number)[] {
    const d = arc.shape.attr('d') as string

    return d.split(' ').map(part => isNaN(+part) ? part : +part)
}

function expectPath(arc: Arc, expected: (string | number)[]) {
    const path = pathOf(arc)

    expect(path).toHaveLength(expected.length)
    expected.forEach((value, index) => {
        if (typeof value === 'number') {
            expect(path[index]).toBeCloseTo(value, 6)
        } else {
            expect(path[index]).toBe(value)
        }
    })
}

function expectNowhere(arc: Arc) {
    expect(arc.element.attr('visibility')).toBe('hidden')
    expect(arc.center.x).toBeNaN()
    expect(arc.radius).toBeNaN()
    expect(arc.angle).toBeNaN()
}

describe('Arc given by the three points of an angle', () => {
    test('goes counterclockwise from the first point to the last one, around the second', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})

        expect(a.angle).toBeCloseTo(90, 8)
        expect(a.radius).toBeCloseTo(100, 8)
        expectPath(a, ['M', 500, 300, 'A', 100, 100, 0, 0, 0, 400, 200])
    })

    test('the other way round it covers the rest of the turn, as a large arc', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(0, 2), center: at(0, 0), end: at(2, 0)}})

        expect(a.angle).toBeCloseTo(270, 8)
        expectPath(a, ['M', 400, 200, 'A', 100, 100, 0, 1, 0, 500, 300])
    })

    test('an arc through 0 degrees goes on to the other side', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(1, -1), center: at(0, 0), end: at(1, 1)}})

        expect(a.angle).toBeCloseTo(90, 8)
    })

    test('the alternative arc goes clockwise between the same directions', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, alternative: true})

        expect(a.angle).toBeCloseTo(270, 8)
        expectPath(a, ['M', 500, 300, 'A', 100, 100, 0, 1, 1, 400, 200])
    })

    test('the alternative of a large arc is the small one, drawn clockwise', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(0, 2), center: at(0, 0), end: at(2, 0)}, alternative: true})

        expect(a.angle).toBeCloseTo(90, 8)
        expectPath(a, ['M', 400, 200, 'A', 100, 100, 0, 0, 1, 500, 300])
    })

    test('the radius is the distance to the start by default, and is a number in units of the x axis', () => {
        const {arc, point} = create()
        const config = {start: at(2, 0), center: at(0, 0), end: at(0, 2)}

        expect(arc('a', {points: config}).radius).toBeCloseTo(100, 8)
        expect(arc('b', {points: {...config, radius: 3}}).radius).toBeCloseTo(150, 8)
        expect(arc('c', {points: {...config, radius: point('P', 0, 1)}}).radius).toBeCloseTo(50, 8)
        expect(arc('d', {points: {...config, radius: {point1: at(0, 0), point2: at(3, 4)}}}).radius).toBeCloseTo(250, 8)
    })

    test('the ends do not have to be on the arc: only their directions count', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(4, 0), center: at(0, 0), end: at(0, 1), radius: 1}})

        expectPath(a, ['M', 450, 300, 'A', 50, 50, 0, 0, 0, 400, 250])
    })
})

describe('Arc given by a center, a radius and two angles', () => {
    test('goes counterclockwise from the first angle to the second, in degrees', () => {
        const {arc} = create()
        const a = arc('a', {angles: {center: at(0, 0), radius: 2, from: 30, to: 120}})

        expect(a.angle).toBeCloseTo(90, 8)
        expect(a.radius).toBeCloseTo(100, 8)
        expect(a.start.x).toBeCloseTo(400 + 100 * Math.cos(Math.PI / 6), 8)
        expect(a.start.y).toBeCloseTo(300 - 100 * Math.sin(Math.PI / 6), 8)
        expect(a.end.x).toBeCloseTo(400 - 50, 8)
    })

    test('an angle greater than the second one goes through 0 degrees', () => {
        const {arc} = create()

        expect(arc('a', {angles: {center: at(0, 0), radius: 1, from: 300, to: 60}}).angle).toBeCloseTo(120, 8)
    })

    test('with the alternative it goes clockwise', () => {
        const {arc} = create()
        const a = arc('a', {angles: {center: at(0, 0), radius: 1, from: 30, to: 120}, alternative: true})

        expect(a.angle).toBeCloseTo(270, 8)
    })
})

describe('Arc given by a point that turns around a center', () => {
    test('a positive angle goes counterclockwise from the point', () => {
        const {arc} = create()
        const a = arc('a', {rotation: {center: at(0, 0), start: at(2, 0), angle: 60}})

        expect(a.angle).toBeCloseTo(60, 8)
        expect(a.radius).toBeCloseTo(100, 8)
        expect(a.start.x).toBeCloseTo(500, 8)
        expect(a.end.x).toBeCloseTo(400 + 100 * Math.cos(Math.PI / 3), 8)
        expect(a.end.y).toBeCloseTo(300 - 100 * Math.sin(Math.PI / 3), 8)
    })

    test('a negative angle goes clockwise from the point: the arc is on the other side', () => {
        const {arc} = create()
        const a = arc('a', {rotation: {center: at(0, 0), start: at(2, 0), angle: -60}})

        expect(a.angle).toBeCloseTo(60, 8)
        expect(a.end.x).toBeCloseTo(500, 8)
        expect(a.start.y).toBeGreaterThan(300)
    })

    test('with the alternative it covers the rest of the turn', () => {
        const {arc} = create()

        expect(arc('a', {rotation: {center: at(0, 0), start: at(2, 0), angle: 60}, alternative: true}).angle).toBeCloseTo(300, 8)
    })

    test('a radius replaces the distance to the point', () => {
        const {arc} = create()

        expect(arc('a', {rotation: {center: at(0, 0), start: at(2, 0), angle: 60, radius: 1}}).radius).toBeCloseTo(50, 8)
    })
})

describe('Arc sector and square', () => {
    test('a sector is closed by its two radii', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, sector: true})

        expectPath(a, ['M', 500, 300, 'A', 100, 100, 0, 0, 0, 400, 200, 'L', 400, 300, 'L', 500, 300])
    })

    test('a right angle is a square corner of half the radius, only with the option', () => {
        const {arc} = create()
        const config = {start: at(2, 0), center: at(0, 0), end: at(0, 2)}

        expect(pathOf(arc('a', {points: config}))).toContain('A')
        expectPath(arc('b', {points: config, square: true}), ['M', 450, 300, 'l', 0, -50, 'L', 400, 250])
    })

    test('a square corner can be a sector', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, square: true, sector: true})

        expectPath(a, ['M', 450, 300, 'l', 0, -50, 'L', 400, 250, 'L', 400, 300, 'L', 450, 300])
    })

    test.each([
        ['an angle that is not right', {start: at(2, 0), center: at(0, 0), end: at(1, 1)}, false],
        ['a right angle that is covered the long way', {start: at(0, 2), center: at(0, 0), end: at(2, 0)}, false],
        ['the alternative of a right angle', {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, true]
    ])('%s is an arc even with the square option', (_, points, alternative) => {
        const {arc} = create()

        expect(pathOf(arc('a', {points, square: true, alternative}))).toContain('A')
    })

    test('asSector and asSquare set the options and draw the arc again', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})

        a.asSector()
        expect(a.config.sector).toBe(true)
        expect(pathOf(a)).toContain('L')

        a.asSquare()
        expect(a.config.square).toBe(true)
        expect(pathOf(a)).not.toContain('A')
    })
})

describe('Arc that is not valid or does not exist', () => {
    test.each([
        ['a radius that is zero', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2), radius: 0}}],
        ['a radius that is negative', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2), radius: -1}}],
        ['a radius that is not a number', {angles: {center: at(0, 0), radius: NaN, from: 0, to: 90}}],
        ['an angle that is not finite', {angles: {center: at(0, 0), radius: 1, from: 0, to: Infinity}}],
        ['a rotation that is not finite', {rotation: {center: at(0, 0), start: at(1, 0), angle: NaN}}],
        ['a center that is not a position', {points: {start: at(2, 0), center: 3 as never, end: at(0, 2)}}],
        ['no construction', {}],
        ['two constructions', {
            points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)},
            angles: {center: at(0, 0), radius: 1, from: 0, to: 90}
        }]
    ] as [string, IArcConfig][])('%s is an InvalidArgumentError, and nothing is left in the svg', (_, config) => {
        const {context, arc} = create()

        expect(() => arc('a', config)).toThrow(InvalidArgumentError)
        expect(context.rootSVG.children()).toHaveLength(0)
    })

    test.each([
        ['an end on the center', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 0)}}],
        ['a start on the center', {points: {start: at(0, 0), center: at(0, 0), end: at(0, 2)}}],
        ['two ends in the same direction', {points: {start: at(1, 1), center: at(0, 0), end: at(3, 3)}}],
        ['a point without a position', {points: {start: nowhere(), center: at(0, 0), end: at(0, 2)}}],
        ['two angles that are the same', {angles: {center: at(0, 0), radius: 1, from: 20, to: 380}}],
        ['a rotation of nothing', {rotation: {center: at(0, 0), start: at(1, 0), angle: 0}}]
    ] as [string, IArcConfig][])('%s is not drawn', (_, config) => {
        const {arc} = create()

        expectNowhere(arc('a', config))
    })

    test('an arc that does not exist is drawn again when its points come back', () => {
        const {arc} = create()
        const end = at(3, 0)
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end}})

        expectNowhere(a)

        end.y = at(0, 2).y
        end.x = at(0, 2).x
        a.update(true)

        expect(a.element.attr('visibility')).toBeFalsy()
        expect(a.angle).toBeCloseTo(90, 8)
    })

    test('an arc follows its points', () => {
        const {arc, point} = create()
        const P = point('P', 2, 0)
        const Q = point('Q', 0, 2)
        const a = arc('a', {points: {start: P, center: at(0, 0), end: Q}})

        Q.config = {coordinates: {x: -2, y: 0}}
        a.update(true)

        expect(a.angle).toBeCloseTo(180, 8)
    })

    test('a config that is not valid leaves the arc as it was', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})
        const path = a.shape.attr('d') as string

        expect(() => {
            a.config = {angles: {center: at(0, 0), radius: -1, from: 0, to: 90}}
        }).toThrow(InvalidArgumentError)
        expect(a.shape.attr('d')).toBe(path)
        expect(a.angle).toBeCloseTo(90, 8)
    })

    test('the config is a copy: changing the object that was given does not change the arc', () => {
        const {arc} = create()
        const values: IArcConfig = {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}}
        const a = arc('a', values)

        values.sector = true

        expect(a.config.sector).toBeUndefined()
    })
})

// The label is outside of the arc, in the middle direction of what is drawn.
describe('Arc label', () => {
    // An arc of 40 degrees around the direction `middle`, of radius 2.
    const around = (middle: number): IArcConfig => ({angles: {center: at(0, 0), radius: 2, from: middle - 20, to: middle + 20}})

    test.each([
        [0, 'mr'],
        [45, 'tr'],
        [90, 'tc'],
        [135, 'tl'],
        [180, 'ml'],
        [225, 'bl'],
        [270, 'bc'],
        [315, 'br']
    ])('an arc in the direction of %d degrees puts its label at "%s"', (middle, alignement) => {
        const {arc} = create()
        const a = arc('a', around(middle))

        expect(a.addLabel('x').config.alignement).toBe(alignement)
    })

    test('the label is a little further than the arc, in the middle direction', () => {
        const {arc} = create()
        const a = arc('a', around(0))
        const label = a.addLabel('x')

        expect(label.x).toBeCloseTo(400 + 100 + 8, 8)
        expect(label.y).toBeCloseTo(300, 8)
    })

    test('the label of the alternative arc is on the other side', () => {
        const {arc} = create()
        const a = arc('a', {...around(0), alternative: true})
        const label = a.addLabel('x')

        expect(label.x).toBeCloseTo(400 - 100 - 8, 8)
        expect(label.config.alignement).toBe('ml')
    })

    test('the label of a straight angle is above the line, not lost', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(-2, 0)}})
        const label = a.addLabel('x')

        expect(label.x).toBeCloseTo(400, 8)
        expect(label.y).toBeCloseTo(300 - 108, 8)
        expect(label.config.alignement).toBe('tc')
    })

    test('the label of a square corner is out of the corner', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, square: true})
        const label = a.addLabel('x')
        const reach = 100 * Math.SQRT1_2 + 8

        expect(label.x).toBeCloseTo(400 + reach * Math.SQRT1_2, 8)
        expect(label.y).toBeCloseTo(300 - reach * Math.SQRT1_2, 8)
    })

    test('the alignment that was asked for is kept when the arc moves', () => {
        const {arc} = create()
        const end = at(0, 2)
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end}})
        const label = a.addLabel('x')
        label.position('bl')

        end.x = at(-2, 0).x
        end.y = at(-2, 0).y
        a.update(true)

        expect(label.alignementGiven).toBe(true)
        expect(label.config.alignement).toBe('bl')
    })

    test('without an alignment asked for, the label follows the arc when it moves', () => {
        const {arc} = create()
        const end = at(0, 2)
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end}})
        const label = a.addLabel('x')

        expect(label.alignementGiven).toBe(false)
        expect(label.config.alignement).toBe('tr')

        end.x = at(-2, 0).x
        end.y = at(-2, 0).y
        a.update(true)

        expect(label.config.alignement).toBe('tc')
    })

    test('an arc that does not exist leaves its label where it was', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 0)}})

        expect(() => a.addLabel('x')).not.toThrow()
    })
})

// The TikZ code works in units of the coordinate system.
describe('Arc TikZ', () => {
    const points = (): IArcConfig => ({points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})

    test('an arc is drawn from its start, with its angles and its radius', () => {
        const {arc} = create()

        expect(arc('a', points()).tikz()).toContain('(2,0) arc[start angle=0, end angle=90, radius=2];')
    })

    test('the alternative arc has an end angle smaller than the start one, so TikZ goes clockwise', () => {
        const {arc} = create()

        expect(arc('a', {...points(), alternative: true}).tikz()).toContain('(2,0) arc[start angle=0, end angle=-270, radius=2];')
    })

    test('a sector is closed by its radii', () => {
        const {arc} = create()

        expect(arc('a', {...points(), sector: true}).tikz()).toContain('(0,0) -- (2,0) arc[start angle=0, end angle=90, radius=2] -- cycle;')
    })

    test('a square corner is three points of half the radius', () => {
        const {arc} = create()

        expect(arc('a', {...points(), square: true}).tikz()).toContain('(1,0) -- (1,1) -- (0,1);')
        expect(arc('b', {...points(), square: true, sector: true}).tikz()).toContain('(1,0) -- (1,1) -- (0,1) -- (0,0) -- cycle;')
    })

    test('the radius is written for each axis when their scales differ', () => {
        const {arc} = create(graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 0, y: -25}}}))

        expect(arc('a', {angles: {center: at(0, 0), radius: 2, from: 0, to: 90}}).tikz()).toContain('x radius=2, y radius=4')
    })

    test('the label is a node at its place', () => {
        const {arc} = create()
        const a = arc('a', points())
        a.addLabel('$\\theta$')

        expect(a.tikz()).toMatch(/\\node\[anchor=-?\d+(\.\d+)?, xshift=[\d.]+pt, yshift=[\d.]+pt\] at \(1\.\d+,1\.\d+\) \{\$\\theta\$\};/)
    })

    test('an arc that is hidden or does not exist writes nothing', () => {
        const {arc} = create()
        const hidden = arc('a', points())
        hidden.hide()

        expect(hidden.tikz()).toBe('')
        expect(arc('b', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 0)}}).tikz()).toBe('')
    })
})

function nowhere(): XY {
    return {x: NaN, y: NaN}
}

describe('Arc label fields', () => {
    const quarter = (alternative = false) => {
        const {arc} = create()

        return arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}, ...(alternative ? {alternative} : {})})
    }
    const labelOf = (a: Arc, field: 'angle' | 'length' | 'radius' | 'area', digits?: number) => {
        a.addLabel([{field, ...(digits === undefined ? {} : {digits})}])

        return a.computeLabel()
    }

    test('the angle is in degrees, always with the degree sign, and it is the default field', () => {
        const a = quarter()

        expect(a.defaultLabelField()).toBe('angle')
        expect(labelOf(a, 'angle')).toBe('90°')
    })

    test('the angle of the alternative arc is the rest of the turn', () => {
        expect(labelOf(quarter(true), 'angle')).toBe('270°')
    })

    test('the angle takes the decimals that the label asks for', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(2, 1)}})

        expect(labelOf(a, 'angle', 1)).toBe('26.6°')
    })

    test('its length, its radius and the area of its sector are in units of the coordinate system', () => {
        const a = quarter()

        expect(labelOf(a, 'radius')).toBe('2')
        expect(labelOf(a, 'length')).toBe('3.14')
        expect(labelOf(a, 'area')).toBe('3.14')
        expect(labelOf(quarter(true), 'area')).toBe('9.42')
    })

    test('the area is written inside of the sector, centered', () => {
        const a = quarter()

        labelOf(a, 'area')

        expect(a.label?.alignement).toBe('mc')
        // Halfway along the middle radius: 45 degrees, 1 unit from the center.
        expect(a.label?.x).toBeCloseTo(400 + 50 * Math.SQRT1_2, 6)
        expect(a.label?.y).toBeCloseTo(300 - 50 * Math.SQRT1_2, 6)
    })

    test('the area keeps the alignment that was asked for', () => {
        const a = quarter()

        labelOf(a, 'area')
        a.label?.position('tl')
        a.moveLabel()

        expect(a.label?.alignement).toBe('tl')
    })

    test('the angle is written outside of the arc', () => {
        const a = quarter()

        labelOf(a, 'angle')

        expect(a.label?.alignement).toBe('tr')
    })
})

describe('Arc label with a unit and a scale', () => {
    const measured = (unit: 'mm' | null, scale: number) => {
        const {arc} = create({...graphConfig(), measure: {unit, scale}})

        return arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})
    }
    const labelOf = (a: Arc, field: 'angle' | 'length' | 'radius' | 'area', asHtml = false) => {
        a.addLabel([{field}], {asHtml})

        return a.computeLabel()
    }

    test('the lengths are multiplied by the scale and followed by the unit', () => {
        const a = measured('mm', 10)

        expect(labelOf(a, 'radius')).toBe('20 mm')
        expect(labelOf(a, 'length')).toBe('31.42 mm')
    })

    test('the area is multiplied by the square of the scale and followed by the square of the unit', () => {
        expect(labelOf(measured('mm', 10), 'area')).toBe('314.16 mm²')
    })

    test('a scale without a unit writes the number only', () => {
        expect(labelOf(measured(null, 0.1), 'radius')).toBe('0.2')
    })

    test('a unit without a scale writes the lengths as they are', () => {
        expect(labelOf(measured('mm', 1), 'radius')).toBe('2 mm')
    })

    test('the angle has the degree sign whatever the unit and the scale', () => {
        expect(labelOf(measured(null, 1), 'angle')).toBe('90°')
        expect(labelOf(measured('mm', 10), 'angle')).toBe('90°')
    })

    test('a label in TeX is written as a formula', () => {
        const a = measured('mm', 10)

        expect(labelOf(a, 'angle', true)).toBe('90^\\circ')
        expect(labelOf(a, 'radius', true)).toBe('20\\,\\mathrm{mm}')
        expect(labelOf(a, 'area', true)).toBe('314.16\\,\\mathrm{mm}^2')
    })
})

describe('Arc label on the side of its middle direction', () => {
    const quarter = () => {
        const {arc} = create()

        return arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})
    }

    test('lies in the middle direction of the arc, at any angle', () => {
        const a = quarter()

        a.addLabel('a')

        // The middle of a quarter from 0 to 90 degrees is 45 degrees: up and to the right on the screen.
        expect(a.label?.config.away?.x).toBeCloseTo(Math.SQRT1_2, 6)
        expect(a.label?.config.away?.y).toBeCloseTo(-Math.SQRT1_2, 6)
    })

    test('follows the angle when the arc turns', () => {
        const {arc} = create()
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(2, 1)}})

        a.addLabel('a')

        const away = a.label?.config.away

        expect(Math.atan2(-(away?.y ?? 0), away?.x ?? 0) * 180 / Math.PI).toBeCloseTo(Math.atan2(1, 2) * 90 / Math.PI, 6)
    })

    test('is on the anchor of the area, with no direction', () => {
        const a = quarter()

        a.addLabel([{field: 'area'}])

        expect(a.label?.config.away).toBeNull()
        expect(a.label?.alignement).toBe('mc')
    })

    test('keeps the position that is asked for, with no direction', () => {
        const a = quarter()

        a.addLabel('a').position('tl')
        a.moveLabel()

        expect(a.label?.alignement).toBe('tl')
        expect(a.label?.config.away).toBeNull()
    })

    test('is pushed away from another figure when it is asked to', () => {
        const {arc, point} = create()
        const O = point('O', 4, 0)
        const a = arc('a', {points: {start: at(2, 0), center: at(0, 0), end: at(0, 2)}})

        a.setLabelReference(O)
        a.addLabel('a')

        // O is at (600, 300) and the anchor of the label is up and to the right of the center, to the left of O.
        expect(a.label?.config.away?.x).toBeLessThan(0)
    })

    test('is a reference: the center of the arc', () => {
        const a = quarter()

        expect(a.referenceable).toBe(true)
        expect(a.referenceAnchorPoint()).toEqual({x: 400, y: 300})
    })
})
