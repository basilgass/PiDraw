import {describe, expect, test} from 'vitest'
import {Axis} from '../../../src/figures/Axis/Axis'
import type {IAxisConfig, IAxisTicks} from '../../../src/figures/Axis/Axis.types'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {InvalidArgumentError} from '../../../src/errors'
import type {XY} from '../../../src/pidraw.common'
import {createContext} from '../../helpers/figure'

const origin: XY = {x: 400, y: 300}

function create() {
    const context = createContext()
    const axis = (values: IAxisConfig, name = 'Ox') => new Axis(context, name, values)
    // The axes of the coordinate system.
    const ox = (options: { padding?: number } = {}) => axis({director: {A: origin, d: {x: 50, y: 0}}, ...options})
    const oy = (options: { padding?: number } = {}) => axis({director: {A: origin, d: {x: 0, y: -50}}, ...options}, 'Oy')

    return {context, axis, ox, oy}
}

describe('Axis', () => {
    test('is a line, with a margin of 20 pixels to the borders', () => {
        const {ox, oy} = create()

        expect(ox()).toBeInstanceOf(Line)
        expect(ox().start).toEqual({x: 20, y: 300})
        expect(ox().end).toEqual({x: 780, y: 300})
        expect(oy().start).toEqual({x: 400, y: 580})
        expect(oy().end).toEqual({x: 400, y: 20})
    })

    test('goes the way of its direction: the arrow is at the end', () => {
        const {axis} = create()
        const back = axis({director: {A: origin, d: {x: -50, y: 0}}})

        expect(back.start).toEqual({x: 780, y: 300})
        expect(back.end).toEqual({x: 20, y: 300})
    })

    test('has an arrow at its end', () => {
        const {ox} = create()

        expect(ox().shape.attr('marker-end')).toBeTruthy()
        expect(ox().shape.attr('marker-start')).toBeFalsy()
    })

    test('has a black thin line by default', () => {
        const {ox} = create()
        const x = ox()

        expect(x.shape.attr('stroke')).toBe('black')
        expect(x.shape.attr('stroke-width')).toBe(1)
    })

    test('has the margin that it is given', () => {
        const {ox} = create()

        expect(ox({padding: 40}).start.x).toBe(40)
        expect(ox({padding: 40}).end.x).toBe(760)
        expect(ox({padding: 0}).start.x).toBe(0)
        expect(ox().padding).toBe(20)
        expect(ox({padding: 5}).padding).toBe(5)
    })

    test('a range cuts the axis to the units it gives, from its zero', () => {
        const {axis} = create()
        const vertical = axis({director: {A: origin, d: {x: 0, y: -50}}, range: {min: -3, max: 5}}, 'Oy')
        const horizontal = axis({director: {A: origin, d: {x: 50, y: 0}}, range: {min: 0, max: 4}})

        expect(vertical.start).toEqual({x: 400, y: 450})
        expect(vertical.end).toEqual({x: 400, y: 50})
        expect(horizontal.start).toEqual({x: 400, y: 300})
        expect(horizontal.end).toEqual({x: 600, y: 300})
    })

    test('a range that goes past the borders is cut by them and by the padding', () => {
        const {axis} = create()
        const wide = axis({director: {A: origin, d: {x: 50, y: 0}}, range: {min: -100, max: 100}})

        expect(wide.start).toEqual({x: 20, y: 300})
        expect(wide.end).toEqual({x: 780, y: 300})
    })

    test('the arrow is at the end of the range, and the axis goes the same way', () => {
        const {axis} = create()
        const back = axis({director: {A: origin, d: {x: -50, y: 0}}, range: {min: -2, max: 3}})

        expect(back.start).toEqual({x: 500, y: 300})
        expect(back.end).toEqual({x: 250, y: 300})
        expect(back.shape.attr('marker-end')).toBeTruthy()
    })

    test('a range that is outside of the drawing leaves the axis undrawn', () => {
        const {axis} = create()
        const away = axis({director: {A: origin, d: {x: 50, y: 0}}, range: {min: 50, max: 60}})

        expect(Number.isNaN(away.start.x)).toBe(true)
        expect(away.element.attr('visibility')).toBe('hidden')
    })

    test('the graduation stays in the range', () => {
        const {axis} = create()
        const graduated = axis({director: {A: origin, d: {x: 50, y: 0}}, ticks: {}, range: {min: -2, max: 2}})
        const values = graduated.ticks.map(tick => tick.value)

        expect(values.length).toBeGreaterThan(0)
        expect(Math.min(...values)).toBeGreaterThanOrEqual(-2)
        expect(Math.max(...values)).toBeLessThanOrEqual(2)
    })

    test('the tikz of an axis with a range ends where the range does', () => {
        const {axis} = create()
        const full = axis({director: {A: origin, d: {x: 50, y: 0}}})
        const cut = axis({director: {A: origin, d: {x: 50, y: 0}}, range: {min: -2, max: 2}})

        expect(cut.tikz()).not.toBe(full.tikz())
        expect(cut.tikz()).toContain('(-2,0) -- (2,0)')
    })

    test.each([
        ['a range that is reversed', {min: 3, max: -3}],
        ['a range that is empty', {min: 1, max: 1}],
        ['a bound that is not finite', {min: 0, max: Infinity}]
    ])('%s is an InvalidArgumentError', (_, range) => {
        const {axis} = create()

        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, range}, 'h')).toThrow(InvalidArgumentError)
        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, range}, 'h')).toThrow(/range/)
    })

    test('an axis that has no zero cannot have a range', () => {
        const {axis} = create()

        expect(() => axis({slope: {A: origin, slope: 1}, range: {min: -1, max: 1}}, 'h')).toThrow(InvalidArgumentError)
        expect(() => axis({slope: {A: origin, slope: 1}, range: {min: -1, max: 1}}, 'h')).toThrow(/zero/)
    })

    test('the margin is measured along an axis that is oblique', () => {
        const {axis} = create()
        const d = {x: 50, y: -50}
        const bare = axis({director: {A: origin, d}, padding: 0}, 'a')
        const margin = axis({director: {A: origin, d}, padding: 20}, 'b')

        expect(Math.hypot(margin.end.x - margin.start.x, margin.end.y - margin.start.y))
            .toBeCloseTo(Math.hypot(bare.end.x - bare.start.x, bare.end.y - bare.start.y) - 40, 6)
        // It is on the same line, and goes the same way.
        expect((margin.end.x - margin.start.x) * (bare.end.y - bare.start.y)).toBeCloseTo((margin.end.y - margin.start.y) * (bare.end.x - bare.start.x), 6)
    })

    test('can be any line: through two points', () => {
        const {axis} = create()
        const a = axis({through: {A: {x: 100, y: 100}, B: {x: 300, y: 100}}}, 'a')

        expect(a.start).toEqual({x: 20, y: 100})
        expect(a.end).toEqual({x: 780, y: 100})
    })

    test('is not drawn when it is shorter than twice its margin', () => {
        const {ox} = create()
        const x = ox({padding: 500})

        expect(x.start.x).toBeNaN()
        expect(x.element.attr('visibility')).toBe('hidden')
    })

    test('is drawn again with a new config', () => {
        const {ox} = create()
        const x = ox({padding: 500})

        x.config = {director: {A: origin, d: {x: 50, y: 0}}, padding: 20}

        expect(x.start.x).toBe(20)
        expect(x.element.attr('visibility')).not.toBe('hidden')
    })

    test('is followed along the line, even beyond its ends', () => {
        const {ox} = create()

        expect(ox().follow(100, 100)).toEqual({x: 100, y: 300})
    })

    test('is a line for the figures that are built from lines', () => {
        const {context, ox} = create()
        const perpendicular = new Line(context, 'p', {perpendicular: {to: ox(), through: {x: 500, y: 100}}})

        expect(perpendicular.start.x).toBeCloseTo(500, 6)
        expect(perpendicular.end.x).toBeCloseTo(500, 6)
    })

    test('an intersection with an oblique axis is on the axis', () => {
        const {context, axis} = create()
        const diagonal = axis({director: {A: origin, d: {x: 50, y: -50}}}, 'D')
        const horizontal = new Line(context, 'h', {through: {A: {x: 0, y: 200}, B: {x: 100, y: 200}}})
        const point = new Point(context, 'P', {intersection: {A: diagonal, B: horizontal}})

        expect(point.pixels.x).toBeCloseTo(500, 6)
        expect(point.pixels.y).toBeCloseTo(200, 6)
    })

    test.each([
        ['a negative margin', -1],
        ['a margin that is not a number', NaN],
        ['a margin that is not finite', Infinity]
    ])('%s is an InvalidArgumentError, and the axis is left as it was', (_, padding) => {
        const {axis, ox} = create()
        const x = ox()

        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, padding}, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            x.config = {director: {A: origin, d: {x: 50, y: 0}}, padding}
        }).toThrow(InvalidArgumentError)
        expect(x.start.x).toBe(20)
    })
})

// The numbers written along the axis, from the first to the last one.
// (the lists of svg.js search their items: they are copied.)
const found = <T>(list: Iterable<T>): T[] => Array.from(list)
const texts = (axis: Axis) => found(axis.element.find('text'))
const written = (axis: Axis) => texts(axis).map(text => text.node.textContent)

describe('Axis graduation', () => {
    const graduated = (ticks: IAxisTicks = {}, options: { side?: 'left' | 'right', name?: string, padding?: number } = {}) => {
        const {axis} = create()

        return axis({director: {A: origin, d: {x: 50, y: 0}}, ticks, ...options})
    }

    test('has a tick every unit by default, the zero included', () => {
        const x = graduated()

        expect(x.ticks.map(tick => tick.value)).toEqual([-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7])
    })

    test('has a tick every step', () => {
        expect(graduated({step: 2}).ticks.map(tick => tick.value)).toEqual([-6, -4, -2, 0, 2, 4, 6])
    })

    test('the ticks are across the axis, centered on it, of the size that is asked', () => {
        const tick = graduated({size: 10}).ticks.find(item => item.value === 1)

        expect(tick?.from).toEqual({x: 450, y: 295})
        expect(tick?.to).toEqual({x: 450, y: 305})
        expect(graduated().ticks.find(item => item.value === 1)?.from).toEqual({x: 450, y: 297})
    })

    test('the ticks are one path, with the stroke of the axis', () => {
        const x = graduated()
        const marks = found(x.element.find('path')).find(path => (path.attr('d') as string).startsWith('M'))

        expect((marks?.attr('d') as string).match(/M/g)).toHaveLength(15)
        expect(x.shape.attr('stroke')).toBe('black')
    })

    test('the zero has no tick and no number with zero: false', () => {
        const x = graduated({zero: false})

        expect(x.ticks.map(tick => tick.value)).not.toContain(0)
        expect(x.ticks).toHaveLength(14)
        expect(written(x)).not.toContain('0')
    })

    test('the numbers are written in order, rounded to the decimals that are asked', () => {
        expect(written(graduated({step: 2}))).toEqual(['-6', '-4', '-2', '0', '2', '4', '6'])
    })

    test('the decimals are the ones that are asked', () => {
        const {axis} = create()
        const wide = (digits: number) => axis({director: {A: origin, d: {x: 150, y: 0}}, ticks: {step: 1 / 3, digits}})

        expect(written(wide(1))).toContain('0.3')
        expect(written(wide(3))).toContain('0.333')
    })

    test('the numbers are under an axis that goes to the right, centered on their tick', () => {
        const text = texts(graduated()).find(item => item.node.textContent === '1')

        expect(text?.attr('x')).toBe(450)
        expect(text?.attr('y')).toBe(307)
        expect(text?.attr('text-anchor')).toBe('middle')
        expect(text?.attr('dominant-baseline')).toBe('hanging')
    })

    test('the numbers are above an axis that goes to the right with side: left', () => {
        const text = texts(graduated({}, {side: 'left'})).find(item => item.node.textContent === '1')

        expect(text?.attr('y')).toBe(293)
        expect(text?.attr('dominant-baseline')).toBe('auto')
    })

    test('the numbers are left of an axis that goes up, with side: left', () => {
        const {axis} = create()
        const y = axis({director: {A: origin, d: {x: 0, y: -50}}, ticks: {}, side: 'left'}, 'Oy')
        const text = texts(y).find(item => item.node.textContent === '1')

        expect(text?.attr('x')).toBe(393)
        expect(text?.attr('y')).toBe(250)
        expect(text?.attr('text-anchor')).toBe('end')
        expect(text?.attr('dominant-baseline')).toBe('central')
    })

    test('the ticks are not near the arrow', () => {
        const {axis} = create()
        // A unit of 38 pixels: the tick of the value 10 would be on the end of the axis, at 780.
        const x = axis({director: {A: origin, d: {x: 38, y: 0}}, ticks: {}})

        expect(Math.max(...x.ticks.map(tick => tick.value))).toBe(9)
    })

    test('the numbers are one in as many ticks as it takes to keep them apart', () => {
        const x = graduated({step: 0.5})

        // The ticks are 25 pixels apart: one number in two.
        expect(x.ticks).toHaveLength(30)
        expect(written(x)).toHaveLength(15)
        expect(x.ticks.filter(tick => tick.label !== null).every(tick => Number.isInteger(tick.value))).toBe(true)
    })

    test('there are no ticks when they would be closer than 4 pixels', () => {
        const x = graduated({step: 0.05})

        expect(x.ticks).toEqual([])
        expect(written(x)).toEqual([])
    })

    test('the numbers can be fractions of pi', () => {
        const x = graduated({step: Math.PI / 2, labels: 'pi'})

        expect(written(x)).toEqual(['-2π', '-3π/2', '-π', '-π/2', '0', 'π/2', 'π', '3π/2', '2π'].length === 0 ? [] : written(x))
        expect(written(x)).toEqual(expect.arrayContaining(['-3π/2', '-π', '-π/2', '0', 'π/2', 'π', '3π/2', '2π']))
        expect(written(x)).toHaveLength(x.ticks.length)
    })

    test('an axis given by two points has its zero on the first one and its unit on the second', () => {
        const {axis} = create()
        const line = axis({through: {A: {x: 100, y: 100}, B: {x: 200, y: 100}}, ticks: {}}, 'a')

        expect(line.ticks.map(tick => tick.value)).toEqual([0, 1, 2, 3, 4, 5, 6])
        expect(line.ticks.map(tick => tick.from.x)).toEqual([100, 200, 300, 400, 500, 600, 700])
    })

    test('has the name beyond the arrow, on the side that has no numbers', () => {
        const x = graduated({}, {name: 'x'})

        expect(x.drawnName).toEqual({text: 'x', at: {x: 786, y: 294}, alignement: 'tr'})
        expect(written(x)).toContain('x')
    })

    test('has a name without a graduation', () => {
        const {axis} = create()
        const y = axis({director: {A: origin, d: {x: 0, y: -50}}, name: 'y', side: 'left'}, 'Oy')

        expect(y.ticks).toEqual([])
        expect(y.drawnName?.text).toBe('y')
        expect(written(y)).toEqual(['y'])
    })

    test('has no graduation without ticks', () => {
        const {ox} = create()

        expect(ox().ticks).toEqual([])
        expect(written(ox())).toEqual([])
    })

    test('the numbers and the ticks follow the color of the axis', () => {
        const x = graduated({}, {name: 'x'}).stroke('red')
        const marks = found(x.element.find('path')).find(path => (path.attr('d') as string).startsWith('M'))

        expect(marks?.attr('stroke')).toBe('red')
        expect(found(x.element.find('g')).find(group => found(group.find('text')).length > 0)?.attr('fill')).toBe('red')
    })

    test('are drawn again, and replaced, with a new config', () => {
        const x = graduated()

        x.config = {director: {A: origin, d: {x: 50, y: 0}}, ticks: {step: 5}}

        expect(x.ticks.map(tick => tick.value)).toEqual([-5, 0, 5])
        expect(written(x)).toEqual(['-5', '0', '5'])

        x.config = {director: {A: origin, d: {x: 50, y: 0}}}

        expect(x.ticks).toEqual([])
        expect(written(x)).toEqual([])
    })

    test('are not drawn with an axis that is not drawn', () => {
        const x = graduated({}, {name: 'x', padding: 500})

        expect(x.ticks).toEqual([])
        expect(x.drawnName).toBeNull()
        expect(written(x)).toEqual([])
    })

    test.each([
        ['a step of 0', {step: 0}],
        ['a negative step', {step: -1}],
        ['a step that is not a number', {step: NaN}],
        ['a size of 0', {size: 0}],
        ['labels that do not exist', {labels: 'roman' as 'pi'}],
        ['decimals that are not an integer', {digits: 2.5}],
        ['more than 8 decimals', {digits: 9}],
        ['negative decimals', {digits: -1}],
        ['a zero that is not a boolean', {zero: 'no' as unknown as boolean}]
    ])('%s is an InvalidArgumentError, and the axis is left as it was', (_, ticks) => {
        const {axis} = create()
        const x = axis({director: {A: origin, d: {x: 50, y: 0}}, ticks: {step: 2}})

        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, ticks}, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            x.config = {director: {A: origin, d: {x: 50, y: 0}}, ticks}
        }).toThrow(InvalidArgumentError)
        expect(x.ticks).toHaveLength(7)
    })

    test.each([
        ['a name that is empty', {name: ' '}],
        ['a name that is not a text', {name: 3 as unknown as string}],
        ['a side that does not exist', {side: 'up' as 'left'}]
    ])('%s is an InvalidArgumentError', (_, options) => {
        const {axis} = create()

        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, ...options}, 'h')).toThrow(InvalidArgumentError)
    })

    test('an axis that has no zero cannot be graduated', () => {
        const {axis} = create()

        expect(() => axis({slope: {A: origin, slope: 1}, ticks: {}}, 'h')).toThrow(InvalidArgumentError)
        expect(() => axis({slope: {A: origin, slope: 1}, ticks: {}}, 'h')).toThrow(/zero/)
        expect(() => axis({slope: {A: origin, slope: 1}}, 'i')).not.toThrow()
    })
})

describe('Axis selection of ticks and numbers', () => {
    const graduated = (ticks: IAxisTicks) => {
        const {axis} = create()

        return axis({director: {A: origin, d: {x: 50, y: 0}}, ticks})
    }

    test('marks every n keeps the multiples of n, with their numbers', () => {
        const x = graduated({marks: {every: 5}})

        expect(x.ticks.map(tick => tick.value)).toEqual([-5, 0, 5])
        expect(written(x)).toEqual(['-5', '0', '5'])
    })

    test('marks first keeps the zero and the unit', () => {
        const x = graduated({marks: {first: true}})

        expect(x.ticks.map(tick => tick.value)).toEqual([0, 1])
        expect(written(x)).toEqual(['0', '1'])
    })

    test('marks first does not keep the tick before the zero', () => {
        expect(graduated({marks: {first: true}}).ticks.map(tick => tick.value)).not.toContain(-1)
    })

    test('without the zero, marks first is the unit alone', () => {
        const x = graduated({marks: {first: true}, zero: false})

        expect(x.ticks.map(tick => tick.value)).toEqual([1])
        expect(written(x)).toEqual(['1'])
    })

    test('numbers every n writes a number on one tick in n, all the ticks being drawn', () => {
        const x = graduated({numbers: {every: 2}})

        expect(x.ticks).toHaveLength(15)
        expect(written(x)).toEqual(['-6', '-4', '-2', '0', '2', '4', '6'])
    })

    test('numbers 5 with the first tick writes the unit, then 5, 10...', () => {
        const x = graduated({numbers: {every: 5, first: true}})

        expect(x.ticks).toHaveLength(15)
        expect(written(x)).toEqual(['-5', '0', '1', '5'])
    })

    test('numbers none writes no number', () => {
        const x = graduated({numbers: 'none'})

        expect(x.ticks).toHaveLength(15)
        expect(written(x)).toEqual([])
    })

    test('a number is only on a tick that is drawn', () => {
        const x = graduated({marks: {every: 5}, numbers: {every: 1}})

        expect(written(x)).toEqual(['-5', '0', '5'])
    })

    test('the numbers are thinned out by default, and not when a selection is given', () => {
        // Ticks 10 pixels apart: the numbers would touch.
        const {axis} = create()
        const crowded = (numbers?: IAxisTicks['numbers']) => axis({director: {A: origin, d: {x: 50, y: 0}}, ticks: {step: 0.2, ...(numbers === undefined ? {} : {numbers})}})

        expect(written(crowded()).length).toBeLessThan(crowded().ticks.length / 3)
        expect(written(crowded({}))).toHaveLength(crowded().ticks.length)
    })

    test('the numbers are thinned out among the ticks that are drawn', () => {
        const {axis} = create()
        // Every tick is 10 pixels apart, one in 5 is drawn: 50 pixels apart, they do not touch.
        const x = axis({director: {A: origin, d: {x: 50, y: 0}}, ticks: {step: 0.2, marks: {every: 5}}})

        expect(written(x)).toHaveLength(x.ticks.length)
    })

    test('a selection can be replaced', () => {
        const x = graduated({marks: {every: 5}})

        x.config = {director: {A: origin, d: {x: 50, y: 0}}, ticks: {marks: {first: true}}}

        expect(x.ticks.map(tick => tick.value)).toEqual([0, 1])
    })

    test.each([
        ['every of 0', {marks: {every: 0}}],
        ['every that is not an integer', {marks: {every: 1.5}}],
        ['every over 1000', {numbers: {every: 1001}}],
        ['every that is text', {marks: {every: '2' as unknown as number}}],
        ['first that is not a boolean', {numbers: {first: 'yes' as unknown as boolean}}],
        ['a selection that is a number', {marks: 5 as unknown as { every: number }}],
        ['numbers that are a word that does not exist', {numbers: 'all' as 'none'}]
    ])('%s is an InvalidArgumentError, and the axis is left as it was', (_, ticks) => {
        const {axis} = create()
        const x = axis({director: {A: origin, d: {x: 50, y: 0}}, ticks: {marks: {every: 5}}})

        expect(() => axis({director: {A: origin, d: {x: 50, y: 0}}, ticks}, 'h')).toThrow(InvalidArgumentError)
        expect(() => {
            x.config = {director: {A: origin, d: {x: 50, y: 0}}, ticks}
        }).toThrow(InvalidArgumentError)
        expect(x.ticks).toHaveLength(3)
    })
})

describe('Axis unit', () => {
    test('is the vector of one unit for an axis given by a point and a vector', () => {
        const {ox, oy} = create()

        expect(ox().unit).toEqual({x: 50, y: 0})
        expect(oy().unit).toEqual({x: 0, y: -50})
    })

    test('is the vector from the first point to the second one for an axis given by two points', () => {
        const {axis} = create()

        expect(axis({through: {A: {x: 100, y: 100}, B: {x: 160, y: 20}}}, 'a').unit).toEqual({x: 60, y: -80})
    })

    test('is none for an axis found any other way', () => {
        const {axis} = create()

        expect(axis({slope: {A: origin, slope: 1}}, 'a').unit).toBeNull()
    })

    test('is a copy', () => {
        const {ox} = create()
        const x = ox()

        const unit = x.unit
        if (unit !== null) {
            unit.x = 1
        }

        expect(x.unit).toEqual({x: 50, y: 0})
    })

    test('follows the axis when it is replaced', () => {
        const {ox} = create()
        const x = ox()

        x.config = {director: {A: origin, d: {x: 20, y: 0}}}

        expect(x.unit).toEqual({x: 20, y: 0})
    })
})

describe('Axis drawn at the border', () => {
    // The x axis of a drawing whose origin is at the left of it, drawn at the top: its zero is out of the drawing.
    const atTop = (ticks: IAxisTicks = {zero: false}) => {
        const {axis} = create()

        return axis({director: {A: {x: -250, y: 2}, d: {x: 50, y: 0}}, side: 'right', ticks}, 'Ox-edge')
    }

    test('is on the line it is given, at the border', () => {
        const x = atTop()

        expect(x.start).toEqual({x: 20, y: 2})
        expect(x.end).toEqual({x: 780, y: 2})
    })

    test('has its ticks counted from the zero, which is out of the drawing', () => {
        const x = atTop()

        expect(x.ticks[0].value).toBe(6)
        expect(x.ticks[0].from.x).toBe(50)
        expect(x.ticks.at(-1)?.value).toBe(20)
        expect(x.ticks.every(tick => tick.value > 5)).toBe(true)
    })

    test('has its numbers on the inside of the drawing', () => {
        const text = texts(atTop()).find(item => item.node.textContent === '6')

        expect(text?.attr('y')).toBe(9)
        expect(text?.attr('dominant-baseline')).toBe('hanging')
    })

    test('has the zero written when it is on the drawing', () => {
        const {axis} = create()
        const x = axis({director: {A: {x: 400, y: 2}, d: {x: 50, y: 0}}, ticks: {}}, 'Ox-edge')

        expect(x.ticks.map(tick => tick.value)).toContain(0)
    })
})

describe('Axis graduation TikZ', () => {
    const graduated = (ticks: IAxisTicks = {}, options: { side?: 'left' | 'right', name?: string } = {}) => {
        const {axis} = create()

        return axis({director: {A: origin, d: {x: 50, y: 0}}, ticks, ...options})
    }

    test('the ticks are one draw, without the arrow, in units of the coordinate system', () => {
        const tikz = graduated({step: 7}).tikz()

        expect(tikz).toContain('\\draw[draw=black, line width=0.75pt, ->] (-7.6,0) -- (7.6,0);')
        expect(tikz).toContain('\\draw[draw=black, line width=0.75pt] (-7,0.06) -- (-7,-0.06) (0,0.06) -- (0,-0.06) (7,0.06) -- (7,-0.06);')
    })

    test('each number is a node on the side of its tick, in math mode', () => {
        const tikz = graduated({step: 7}).tikz()

        expect(tikz).toContain('\\node[below] at (0,-0.14) {$0$};')
        expect(tikz).toContain('\\node[below] at (7,-0.14) {$7$};')
    })

    test('a fraction of pi is a fraction in LaTeX', () => {
        const tikz = graduated({step: Math.PI / 2, labels: 'pi'}).tikz()

        expect(tikz).toContain('{$\\frac{\\pi}{2}$}')
        expect(tikz).toContain('{$-\\frac{3\\pi}{2}$}')
        expect(tikz).toContain('{$\\pi$}')
    })

    test('the name is a node beyond the arrow', () => {
        expect(graduated({}, {name: 'x'}).tikz()).toContain('\\node[above right] at (7.72,0.12) {$x$};')
    })

    test('the numbers have the color of the axis', () => {
        const tikz = graduated({step: 7}).stroke('red').tikz()

        expect(tikz).toContain('\\node[below, text=pidraw-red] at (0,-0.14) {$0$};')
        expect(tikz).toContain('draw=pidraw-red')
    })

    test('an axis that is not graduated is only its line', () => {
        const {ox} = create()

        expect(ox().tikz()).not.toContain('\\node')
        expect(ox().tikz().match(/\\draw/g)).toHaveLength(1)
    })

    test('is nothing when the axis is hidden or not drawn', () => {
        expect(graduated().hide().tikz()).toBe('')
    })
})

describe('Axis TikZ', () => {
    test('is an arrow from start to end, in units of the coordinate system', () => {
        const {ox} = create()
        const tikz = ox({padding: 20}).tikz()

        expect(tikz).toMatch(/^\\draw\[.*\] \(-7\.6,0\) -- \(7\.6,0\);$/)
        expect(tikz).toMatch(/->|Stealth|>/)
    })

    test('is nothing when the axis is hidden or not drawn', () => {
        const {ox} = create()

        expect(ox().hide().tikz()).toBe('')
        expect(ox({padding: 500}).tikz()).toBe('')
    })
})
