import {describe, expect, test} from 'vitest'
import {PiParse} from 'piparser'
import {OptionError, ParseError} from '../../src/errors'
import {buildLayout, LAYOUT_KEYS, parsePointsSetting, splitParameters} from '../../src/parser/buildLayout'
import type {IParserParameters} from '../../src/parser/parser.types'

// The parser of Draw, without the shorthands of the figures.
const parser = new PiParse({
    formatter: (line: string) => line,
    keys: LAYOUT_KEYS,
    splitter: {main: '->', entry: ',', parameter: '/'}
})

const layout = (text: string) => buildLayout(text, parser)

describe('splitParameters', () => {
    test('entries are separated by a comma', () => {
        expect(splitParameters('x=-5:5,y=-3:3,axis')).toEqual(['x=-5:5', 'y=-3:3', 'axis'])
    })

    test('an entry with options goes on to the end', () => {
        expect(splitParameters('x=5,grid=2->red,width=5')).toEqual(['x=5', 'grid=2->red,width=5'])
    })

    test('a double comma ends the options', () => {
        expect(splitParameters('axis=pi/2,grid=2->red,width=5,,unitX=5')).toEqual(['axis=pi/2', 'grid=2->red,width=5', 'unitX=5'])
    })

    test('two entries can each have options', () => {
        expect(splitParameters('axis->red,thick,,grid->lightgray')).toEqual(['axis->red,thick', 'grid->lightgray'])
    })

    test('empty entries are ignored, and more commas do not matter', () => {
        expect(splitParameters(',,axis,,,grid,,')).toEqual(['axis', 'grid'])
        expect(splitParameters('')).toEqual([])
        expect(splitParameters('  x = 5 , axis ')).toEqual(['x = 5', 'axis'])
    })

    test('an entry whose options are empty is an entry', () => {
        expect(splitParameters('grid->,,axis')).toEqual(['grid->', 'axis'])
    })
})

describe('buildLayout window', () => {
    test('is from -8 to 8 by default', () => {
        expect(layout('').window).toEqual({x: {min: -8, max: 8}, y: {min: -8, max: 8}})
    })

    test('x and y give the intervals', () => {
        expect(layout('x=-10:10,y=-2:9').window).toEqual({x: {min: -10, max: 10}, y: {min: -2, max: 9}})
    })

    test('a number is the interval from its opposite to itself', () => {
        expect(layout('x=6,y=4').window).toEqual({x: {min: -6, max: 6}, y: {min: -4, max: 4}})
    })

    test('a bound can be an expression with pi', () => {
        const {x, y} = layout('x=-2pi:2pi,y=pi').window

        expect(x.min).toBeCloseTo(-2 * Math.PI, 9)
        expect(x.max).toBeCloseTo(2 * Math.PI, 9)
        expect(y.max).toBeCloseTo(Math.PI, 9)
        expect(y.min).toBeCloseTo(-Math.PI, 9)
    })

    test.each([
        ['box=5', {min: -5, max: 5}, {min: -5, max: 5}],
        ['box=8;6', {min: -8, max: 8}, {min: -6, max: 6}],
        ['box=-3:7', {min: -3, max: 7}, {min: -3, max: 7}],
        ['box=4,x=2', {min: -2, max: 2}, {min: -4, max: 4}],
        ['box=4,y=1:2', {min: -4, max: 4}, {min: 1, max: 2}]
    ])('%s gives both intervals, x and y being more exact', (text, x, y) => {
        expect(layout(text).window).toEqual({x, y})
    })

    test('a fraction is a number', () => {
        expect(layout('box=4/2').window.x).toEqual({min: -2, max: 2})
    })

    test('an interval upside down is put in order by the parser', () => {
        expect(layout('x=5:-5').window.x).toEqual({min: -5, max: 5})
    })

    test.each([
        ['an empty interval', 'x=3:3'],
        ['a number that is 0', 'x=0'],
        ['a negative number', 'y=-4'],
        ['text', 'x=abc'],
        ['a bound that is text', 'x=1:abc'],
        ['an interval with three bounds', 'x=1:2:3'],
        ['an interval with an option', 'x=1:2/3'],
        ['an empty bound', 'x=:3'],
        ['a box of 0', 'box=0'],
        ['a box with a negative side', 'box=3;-1']
    ])('%s is a ParseError', (_, text) => {
        expect(() => layout(text)).toThrow(ParseError)
    })
})

describe('buildLayout unit', () => {
    test('is 1 cm by default', () => {
        expect(layout('').unit).toEqual({x: 1, y: 1})
    })

    test('unitX and unitY give the length of a unit of each axis, in cm', () => {
        expect(layout('unitX=2,unitY=3').unit).toEqual({x: 2, y: 3})
    })

    test('unitY is unitX when it is alone, and 1 when only unitY is given', () => {
        expect(layout('unitX=2').unit).toEqual({x: 2, y: 2})
        expect(layout('unitY=3').unit).toEqual({x: 1, y: 3})
    })

    test.each([
        ['0', 'unitX=0'],
        ['a negative length', 'unitY=-1'],
        ['text', 'unitX=big'],
        ['an interval', 'unitX=1:2']
    ])('%s is a ParseError', (_, text) => {
        expect(() => layout(text)).toThrow(ParseError)
    })

    test('a fraction is a length', () => {
        expect(layout('unitX=2/3').unit.x).toBeCloseTo(2 / 3, 9)
    })
})

describe('buildLayout display', () => {
    test('shows nothing by default', () => {
        expect(layout('').display).toEqual({axis: {x: false, y: false}, grid: false})
    })

    test('axis shows both axes, and the word alone has no graduation', () => {
        expect(layout('axis').display.axis).toEqual({x: {}, y: {}})
    })

    test('axisX or axisY shows only that axis', () => {
        expect(layout('axisX').display.axis).toEqual({x: {}, y: false})
        expect(layout('axisY').display.axis).toEqual({x: false, y: {}})
    })

    test('a step is the graduation of both axes', () => {
        expect(layout('axis=2').display.axis).toEqual({x: {step: 2, labels: 'numbers'}, y: {step: 2, labels: 'numbers'}})
    })

    test('a step in pi is for the x axis, the y axis gets a step of 1', () => {
        const axis = layout('axis=pi/3').display.axis as { x: { step: number, labels: string }, y: { step: number, labels: string } }

        expect(axis.x.step).toBeCloseTo(Math.PI / 3, 9)
        expect(axis.x.labels).toBe('pi')
        expect(axis.y).toEqual({step: 1, labels: 'numbers'})
    })

    test('axisX and axisY change the step of one axis', () => {
        expect(layout('axis=2,axisY=0.5').display.axis).toEqual({
            x: {step: 2, labels: 'numbers'},
            y: {step: 0.5, labels: 'numbers'}
        })
    })

    test('a name is written at the end of the axis, and shows it', () => {
        expect(layout('axis,axisXname=t,axisYname=y').display.axis).toEqual({x: {name: 't'}, y: {name: 'y'}})
        expect(layout('axisXname=t').display.axis).toEqual({x: {name: 't'}, y: false})
    })

    test('grid is a step of 1, and gives its steps', () => {
        expect(layout('grid').display.grid).toEqual({})
        expect(layout('grid=0.5').display.grid).toEqual({step: {x: 0.5, y: 0.5}})
        expect(layout('grid=2,gridY=1').display.grid).toEqual({step: {x: 2, y: 1}})
        expect(layout('gridX=3').display.grid).toEqual({step: {x: 3, y: 1}})
        expect(layout('gridY=3').display.grid).toEqual({step: {x: 1, y: 3}})
    })

    test.each([
        ['a step of 0', 'grid=0'],
        ['text', 'grid=abc'],
        ['an axis step of 0', 'axisX=0'],
        ['an axis with text', 'axis=big'],
        ['a name that is a number of options', 'axisXname=x/2'],
        ['a name that is a word alone', 'axisXname']
    ])('%s is a ParseError', (_, text) => {
        expect(() => layout(text)).toThrow(ParseError)
    })
})

describe('buildLayout axes with a selection of ticks', () => {
    test('axis->ticks=first graduates both axes with a step of 1, the unit alone', () => {
        const {display, options} = layout('axis->ticks=first')

        expect(display.axis).toEqual({
            x: {step: 1, labels: 'numbers', marks: {first: true}},
            y: {step: 1, labels: 'numbers', marks: {first: true}}
        })
        expect(options.x).toEqual({})
        expect(options.y).toEqual({})
    })

    test('a step and a selection of numbers', () => {
        const {display} = layout('axis=2->numbers=5/first')

        expect(display.axis).toEqual({
            x: {step: 2, labels: 'numbers', numbers: {every: 5, first: true}},
            y: {step: 2, labels: 'numbers', numbers: {every: 5, first: true}}
        })
    })

    test('each axis has its own selection, the one of axisX coming after the one of axis', () => {
        const {display} = layout('axis->ticks=2,,axisX->ticks=first')

        expect(display.axis).toEqual({
            x: {step: 1, labels: 'numbers', marks: {first: true}},
            y: {step: 1, labels: 'numbers', marks: {every: 2}}
        })
    })

    test('axisY alone is the only axis that is graduated', () => {
        expect(layout('axisY=0.5->numbers=none').display.axis).toEqual({
            x: false,
            y: {step: 0.5, labels: 'numbers', numbers: 'none'}
        })
    })

    test('a padding is for the axes it is written for', () => {
        const {display} = layout('axisX->padding=40')

        expect(display.axis).toEqual({x: {padding: 40}, y: false})
    })

    test('the style stays an option of the axis', () => {
        const {options} = layout('axis->ticks=5,color=red,w=3')

        expect(Object.keys(options.x)).toEqual(['color', 'w'])
        expect(Object.keys(options.y)).toEqual(['color', 'w'])
    })

    test.each([
        ['name', 'axis->name=x', /axisXname/],
        ['side', 'axisX->side=left', /inside/],
        ['ticks that are not valid', 'axis->ticks=0', /ticks/],
        ['numbers that are text', 'axis->numbers=all', /numbers/],
        ['a padding that is negative', 'axis->padding=-3', /padding/]
    ])('%s is a ParseError', (_, text, message) => {
        expect(() => layout(text)).toThrow(ParseError)
        expect(() => layout(text)).toThrow(message)
    })
})

describe('buildLayout defaults', () => {
    test('are no label, no tex and round points by default', () => {
        expect(layout('').defaults).toEqual({label: false, tex: false, points: {shape: 'o'}})
    })

    test('default.label and default.tex are words', () => {
        expect(layout('default.label,default.tex').defaults).toMatchObject({label: true, tex: true})
    })

    test.each([
        ['default.points=s', {shape: 's'}],
        ['default.points=*', {shape: '*'}],
        ['default.points=o/12', {shape: 'o', size: 12}],
        ['default.points=no', false]
    ])('%s gives %j', (text, points) => {
        expect(layout(text).defaults.points).toEqual(points)
    })

    test.each([
        ['a shape that does not exist', 'default.points=z'],
        ['a size that is not a number', 'default.points=o/big'],
        ['a value for default.label', 'default.label=3'],
        ['an option for default.tex', 'default.tex/2'],
        ['no with a size', 'default.points=no/3']
    ])('%s is a ParseError', (_, text) => {
        expect(() => layout(text)).toThrow(ParseError)
    })
})

describe('buildLayout options', () => {
    test('are the options after the arrow, until the double comma', () => {
        const {options} = layout('axis->color=red,w=3,,grid->color=gray,,x=5')

        expect(Object.keys(options.x)).toEqual(['color', 'w'])
        expect(options.x.w.value).toBe(3)
        expect(Object.keys(options.y)).toEqual(['color', 'w'])
        expect(Object.keys(options.grid)).toEqual(['color'])
    })

    test('go to the axis that the parameter is for', () => {
        const {options} = layout('axisX->red,,axisY->blue')

        expect(Object.keys(options.x)).toEqual(['red'])
        expect(Object.keys(options.y)).toEqual(['blue'])
    })

    test('of axisX come after the ones of axis, and win', () => {
        const {options} = layout('axis->w=1,,axisX->w=4')

        expect(options.x.w.value).toBe(4)
        expect(options.y.w.value).toBe(1)
    })

    test('the option subgrid cuts the grid', () => {
        const {options} = layout('grid=2->subgrid=4')

        expect(options.grid.subgrid.value).toBe(4)
    })

    test('are none when the parameters have none', () => {
        expect(layout('axis,grid=2').options).toEqual({x: {}, y: {}, grid: {}})
    })

    test('a parameter that cannot have options is a ParseError', () => {
        expect(() => layout('x=5->red')).toThrow(ParseError)
        expect(() => layout('default.label->red')).toThrow(ParseError)
    })
})

describe('buildLayout names', () => {
    test.each([
        ['ppu=50', /unitX/],
        ['subgrid=5', /grid->subgrid/],
        ['label', /default\.label/],
        ['tex', /default\.tex/],
        ['points=s', /default\.points/],
        ['no-points', /default\.points=no/]
    ])('%s does not exist any more: the message says what replaces it', (text, replacement) => {
        expect(() => layout(text)).toThrow(ParseError)
        expect(() => layout(text)).toThrow(replacement)
    })

    test('a name that does not exist is a ParseError that names it', () => {
        expect(() => layout('axis,gri')).toThrow(ParseError)
        expect(() => layout('axis,gri')).toThrow(/"gri"/)
    })

    test('a name written twice is a ParseError', () => {
        expect(() => layout('x=5,x=6')).toThrow(/written twice/)
    })

    test('the whole string of the demo is read', () => {
        const read = layout('x=-11:11,y=-11:11,axis,grid,unitX=0.8')

        expect(read.window.x).toEqual({min: -11, max: 11})
        expect(read.unit).toEqual({x: 0.8, y: 0.8})
        expect(read.display.grid).toEqual({})
    })
})

describe('parsePointsSetting', () => {
    const setting = (value: IParserParameters['value'], options: IParserParameters['options'] = []): IParserParameters => ({value, options})

    test('points alone is the default circle', () => {
        expect(parsePointsSetting(setting(true))).toEqual({shape: 'o'})
    })

    test.each(['o', 's', '*'] as const)('points=%s is the shape of the points', (shape) => {
        expect(parsePointsSetting(setting(shape))).toEqual({shape})
    })

    test('a size can follow the shape', () => {
        expect(parsePointsSetting(setting('s', [12]))).toEqual({shape: 's', size: 12})
    })

    test.each([
        ['a shape that does not exist', setting('triangle')],
        ['a number', setting(3)],
        ['a size that is not a number', setting('s', ['big'])],
        ['a size of zero', setting('s', [0])]
    ])('%s is an OptionError that names points', (_, value) => {
        expect(() => parsePointsSetting(value)).toThrow(OptionError)
        expect(() => parsePointsSetting(value)).toThrow(/"points"/)
    })
})
