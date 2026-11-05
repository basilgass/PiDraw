import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Axis} from '../../../src/figures/Axis/Axis'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {OptionError, ParseError} from '../../../src/errors'
import {
    applyAxisOption,
    buildAxes,
    buildAxis,
    type IAxisParameters,
    parseSelection,
    splitAxisOptions
} from '../../../src/figures/Axis/Axis.parser'
import type {IParserParameters} from '../../../src/parser/parser.types'
import {createContext} from '../../helpers/figure'

const parameter = (value: unknown, ...options: unknown[]) => ({value, options}) as unknown as IParserParameters
const axes = (parameters: Partial<Record<keyof IAxisParameters, IParserParameters>>, extra?: Parameters<typeof buildAxes>[1]) => buildAxes(parameters, extra)

describe('buildAxes', () => {
    test('shows no axis without a parameter, or with false', () => {
        expect(axes({})).toEqual({x: false, y: false})
        expect(axes({axis: parameter(false), axisX: parameter(false)})).toEqual({x: false, y: false})
    })

    test('the word axis shows both axes, without graduation', () => {
        expect(axes({axis: parameter(true)})).toEqual({x: {}, y: {}})
    })

    test('axisX or axisY shows only that axis', () => {
        expect(axes({axisX: parameter(true)})).toEqual({x: {}, y: false})
        expect(axes({axisY: parameter(true)})).toEqual({x: false, y: {}})
    })

    test('a number is the step of both axes', () => {
        expect(axes({axis: parameter(2)})).toEqual({x: {step: 2, labels: 'numbers'}, y: {step: 2, labels: 'numbers'}})
    })

    test('a step in pi is for the x axis, the y axis gets a step of 1', () => {
        const {x, y} = axes({axis: parameter('pi', 3)}) as { x: { step: number, labels: string }, y: { step: number, labels: string } }

        expect(x.step).toBeCloseTo(Math.PI / 3, 9)
        expect(x.labels).toBe('pi')
        expect(y).toEqual({step: 1, labels: 'numbers'})
    })

    test('axisX and axisY give the step of their axis, over the step of axis', () => {
        expect(axes({axis: parameter(2), axisX: parameter(5)})).toEqual({
            x: {step: 5, labels: 'numbers'},
            y: {step: 2, labels: 'numbers'}
        })
        expect(axes({axisY: parameter('pi', 4)}).y).toMatchObject({labels: 'pi'})
    })

    test('a name is written at the end of the axis, and shows it', () => {
        expect(axes({axisXname: parameter('t')})).toEqual({x: {name: 't'}, y: false})
        expect(axes({axis: parameter(1), axisYname: parameter('y')})).toEqual({
            x: {step: 1, labels: 'numbers'},
            y: {step: 1, labels: 'numbers', name: 'y'}
        })
    })

    test('a number is a name', () => {
        expect(axes({axisXname: parameter(2)}).x).toEqual({name: '2'})
    })

    test.each([
        ['a step of 0', {axis: parameter(0)}],
        ['text for a step', {axisX: parameter('big')}],
        ['a denominator that is not an integer', {axis: parameter('pi', 2.5)}],
        ['a name that is a word alone', {axisXname: parameter(true)}],
        ['a name with an option', {axisXname: parameter('x', 2)}],
        ['an empty name', {axisYname: parameter(' ')}]
    ])('%s is a ParseError that names the parameter', (_, parameters) => {
        expect(() => axes(parameters)).toThrow(ParseError)
        expect(() => axes(parameters)).toThrow(/axis/)
    })
})

describe('buildAxes with the options of the entries', () => {
    test('a selection of ticks graduates an axis that has no step, with a step of 1', () => {
        expect(axes({axis: parameter(true)}, {x: {marks: {first: true}}, y: {marks: {first: true}}})).toEqual({
            x: {step: 1, labels: 'numbers', marks: {first: true}},
            y: {step: 1, labels: 'numbers', marks: {first: true}}
        })
    })

    test('a selection of numbers keeps the step that the axis has', () => {
        const {x} = axes({axis: parameter(2)}, {x: {numbers: {every: 5, first: true}}, y: {}}) as { x: { step: number } }

        expect(x.step).toBe(2)
        expect(axes({axis: parameter(2)}, {x: {numbers: 'none'}}).x).toEqual({step: 2, labels: 'numbers', numbers: 'none'})
    })

    test('a padding is kept, and does not graduate the axis', () => {
        expect(axes({axis: parameter(true)}, {x: {padding: 40}})).toEqual({x: {padding: 40}, y: {}})
    })

    test('an axis that is not shown shows nothing', () => {
        expect(axes({}, {x: {marks: {first: true}}})).toEqual({x: false, y: false})
    })
})

describe('parseSelection', () => {
    test.each([
        [parameter(1), {every: 1}],
        [parameter(5), {every: 5}],
        [parameter('first'), {first: true}],
        [parameter(5, 'first'), {every: 5, first: true}]
    ])('%j', (value, expected) => {
        expect(parseSelection(value, 'ticks', false)).toEqual(expected)
        expect(parseSelection(value, 'numbers', true)).toEqual(expected)
    })

    test('none is for the numbers only', () => {
        expect(parseSelection(parameter('none'), 'numbers', true)).toBe('none')
        expect(() => parseSelection(parameter('none'), 'ticks', false)).toThrow(ParseError)
    })

    test.each([
        ['0', parameter(0)],
        ['a number that is not an integer', parameter(2.5)],
        ['more than 1000', parameter(1001)],
        ['negative', parameter(-5)],
        ['the word alone', parameter(true)],
        ['text', parameter('all')],
        ['first with another option', parameter(5, 'last')],
        ['first before the number', parameter('first', 5)],
        ['two options', parameter(5, 'first', 'first')],
        ['an option after first alone', parameter('first', 'first')]
    ])('%s is a ParseError that names the option', (_, value) => {
        expect(() => parseSelection(value, 'ticks', true)).toThrow(ParseError)
        expect(() => parseSelection(value, 'ticks', true)).toThrow(/"ticks=/)
    })
})

describe('splitAxisOptions', () => {
    test('ticks, numbers and padding are for the graduation, the others are the style', () => {
        const {extra, style} = splitAxisOptions({
            ticks: parameter(5),
            numbers: parameter('none'),
            padding: parameter(40),
            color: parameter('red'),
            w: parameter(3)
        })

        expect(extra).toEqual({marks: {every: 5}, numbers: 'none', padding: 40})
        expect(Object.keys(style)).toEqual(['color', 'w'])
    })

    test('no option is nothing', () => {
        expect(splitAxisOptions({})).toEqual({extra: {}, style: {}})
    })

    test.each([
        ['name', 'axisXname'],
        ['side', 'inside']
    ])('%s is a ParseError that says what to do', (key, advice) => {
        expect(() => splitAxisOptions({[key]: parameter('x')})).toThrow(ParseError)
        expect(() => splitAxisOptions({[key]: parameter('x')})).toThrow(new RegExp(advice))
    })

    test.each([
        ['a padding that is negative', {padding: parameter(-1)}],
        ['a padding that is text', {padding: parameter('big')}],
        ['ticks that are not valid', {ticks: parameter(0)}]
    ])('%s is a ParseError', (_, options) => {
        expect(() => splitAxisOptions(options)).toThrow(ParseError)
    })
})

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
    const B = new Point(context, 'B', {coordinates: {x: 2, y: 0}})
    const figures = {A, B}
    const item = (values: unknown[], key = 'axis') => ({name: 'a', key, values, parameters: {}}) as unknown as PARSER

    return {context, A, B, figures, item}
}

describe('buildAxis', () => {
    test('two points are the zero and the unit of a graduated line', () => {
        const {item, figures, A, B} = create()

        expect(buildAxis(item(['A', 'B']), figures)).toEqual({create: 'axis', config: {through: {A, B}, ticks: {}}})
    })

    test('a number is the step', () => {
        const {item, figures} = create()

        expect(buildAxis(item(['A', 'B', 0.5]), figures).config.ticks).toEqual({step: 0.5, labels: 'numbers'})
    })

    test('a number of pi is the step, and the numbers are fractions of pi', () => {
        const {item, figures} = create()
        const ticks = buildAxis(item(['A', 'B', 'pi/3']), figures).config.ticks

        expect(ticks?.step).toBeCloseTo(Math.PI / 3, 9)
        expect(ticks?.labels).toBe('pi')
    })

    test.each([
        ['no value', []],
        ['one point', ['A']],
        ['a name that is not a figure', ['A', 'Z']],
        ['a number instead of a point', ['A', 3]],
        ['a step of 0', ['A', 'B', 0]],
        ['a step that is text', ['A', 'B', 'big']],
        ['two steps', ['A', 'B', 1, 2]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildAxis(item(values), figures)).toThrow(ParseError)
        expect(() => buildAxis(item(values), figures)).toThrow(/"a"/)
    })

    test('a key that does not define an axis is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildAxis(item(['A', 'B'], 'line'), figures)).toThrow(ParseError)
    })
})

describe('applyAxisOption', () => {
    const axis = () => {
        const {context, A, B} = create()

        return new Axis(context, 'a', {through: {A, B}, ticks: {}})
    }

    test('ticks and numbers select the ticks and the numbers', () => {
        const a = axis()

        applyAxisOption(a, 'ticks', parameter(5, 'first'))
        applyAxisOption(a, 'numbers', parameter('none'))

        expect(a.config.ticks).toEqual({marks: {every: 5, first: true}, numbers: 'none'})
    })

    test('ticks graduate an axis that has no graduation', () => {
        const {context, A, B} = create()
        const a = new Axis(context, 'a', {through: {A, B}})

        applyAxisOption(a, 'ticks', parameter('first'))

        expect(a.ticks.length).toBeGreaterThan(0)
    })

    test('name, side and padding are kept', () => {
        const a = axis()

        applyAxisOption(a, 'name', parameter('t'))
        applyAxisOption(a, 'side', parameter('left'))
        applyAxisOption(a, 'padding', parameter(40))

        expect(a.config).toMatchObject({name: 't', side: 'left', padding: 40})
        expect(a.padding).toBe(40)
    })

    test('an option keeps the other options', () => {
        const a = axis()

        applyAxisOption(a, 'name', parameter('t'))
        applyAxisOption(a, 'ticks', parameter(2))

        expect(a.config.name).toBe('t')
        expect(a.config.ticks).toEqual({marks: {every: 2}})
    })

    test.each([
        ['a selection that is not valid', 'ticks', parameter(0)],
        ['a name that is empty', 'name', parameter(' ')],
        ['a name with an option', 'name', parameter('t', 2)],
        ['a side that does not exist', 'side', parameter('up')],
        ['a padding that is negative', 'padding', parameter(-4)]
    ] as const)('%s is an OptionError that names the option, and the axis is left as it was', (_, option, value) => {
        const a = axis()
        const ticks = a.ticks.length

        expect(() => {
            applyAxisOption(a, option, value)
        }).toThrow(OptionError)
        expect(() => {
            applyAxisOption(a, option, value)
        }).toThrow(new RegExp(`"${option}"`))
        expect(a.ticks).toHaveLength(ticks)
    })

    test('an axis that has no zero cannot take a selection: it is an OptionError', () => {
        const {context, A} = create()
        const a = new Axis(context, 'a', {slope: {A, slope: 1}})

        expect(() => {
            applyAxisOption(a, 'ticks', parameter(2))
        }).toThrow(OptionError)
    })

    test('a figure that is not an axis is an OptionError', () => {
        const {context, A, B} = create()
        const line = new Line(context, 'd', {through: {A, B}})

        expect(() => {
            applyAxisOption(line, 'ticks', parameter(2))
        }).toThrow(OptionError)
        expect(() => {
            applyAxisOption(line, 'ticks', parameter(2))
        }).toThrow(/"d"/)
    })
})
