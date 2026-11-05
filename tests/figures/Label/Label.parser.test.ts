import {describe, expect, test} from 'vitest'
import {Arc} from '../../../src/figures/Arc/Arc'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {Polygon} from '../../../src/figures/Polygon/Polygon'
import {Plot} from '../../../src/figures/Plot/Plot'
import {InvalidArgumentError} from '../../../src/errors'
import type {ILineType} from '../../../src/figures/Line/Line.types'
import {parseLabelPosition, parseLabelText} from '../../../src/figures/Label/Label.parser'
import {createContext} from '../../helpers/figure'

function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
    const B = new Point(context, 'B', {coordinates: {x: 1, y: 1}})
    const C = new Point(context, 'C', {coordinates: {x: 2, y: 0}})
    const line = (shape: ILineType) => new Line(context, 'd', {through: {A, B}, shape})

    return {
        A,
        circle: new Circle(context, 'c', {center: A, radius: 1}),
        arc: new Arc(context, 'a', {points: {start: C, center: A, end: B}}),
        polygon: new Polygon(context, 'p', {vertices: [A, B, C]}),
        line
    }
}

const coordinates = {field: 'coordinates'}
const length = {field: 'length'}

describe('parseLabelText', () => {
    test('a text without @ is kept as it is', () => {
        const {A} = create()

        expect(parseLabelText('A_1', A)).toBe('A_1')
    })

    test('@ is the field of a point: its coordinates, with no digits asked', () => {
        const {A} = create()

        expect(parseLabelText('A@', A)).toEqual(['A', coordinates])
    })

    test('@ followed by .n asks for n decimals, and the .n is not part of the text', () => {
        const {A} = create()

        expect(parseLabelText('@.3', A)).toEqual([{...coordinates, digits: 3}])
        expect(parseLabelText('A@.0 end', A)).toEqual(['A', {...coordinates, digits: 0}, ' end'])
    })

    test('every @ is a field', () => {
        const {A} = create()

        expect(parseLabelText('@ and @.1', A)).toEqual([coordinates, ' and ', {...coordinates, digits: 1}])
    })

    test('@ is the length of a segment', () => {
        const {line} = create()

        expect(parseLabelText('d=@.1', line('segment'))).toEqual(['d=', {...length, digits: 1}])
    })

    test('@ followed by a name is the field of this name, with or without decimals', () => {
        const {line} = create()

        expect(parseLabelText('m=@slope', line('line'))).toEqual(['m=', {field: 'slope'}])
        expect(parseLabelText('@slope.3', line('segment'))).toEqual([{field: 'slope', digits: 3}])
        expect(parseLabelText('@length and @slope', line('segment'))).toEqual([length, ' and ', {field: 'slope'}])
    })

    test('@@ is a @ of the text', () => {
        const {A} = create()

        expect(parseLabelText('a@@b @', A)).toEqual(['a@b ', coordinates])
        expect(parseLabelText('@@', A)).toEqual(['@'])
    })

    test.each(['line', 'ray', 'vector'] as const)('@ alone is refused for a %s: it has no most classical value', (shape) => {
        const {line} = create()

        expect(() => parseLabelText('a@b', line(shape))).toThrow(InvalidArgumentError)
        expect(() => parseLabelText('@', line(shape))).toThrow(/@slope/)
    })

    test('@ alone is refused for a circle and a polygon, whose fields it lists', () => {
        const {circle, polygon} = create()

        expect(() => parseLabelText('@', circle)).toThrow(/@radius, @perimeter, @area/)
        expect(() => parseLabelText('@', polygon)).toThrow(/@perimeter, @area/)
    })

    test('@ is the angle of an arc', () => {
        const {arc} = create()

        expect(parseLabelText('@°', arc)).toEqual([{field: 'angle'}, '°'])
    })

    test('a name that the figure does not have is an InvalidArgumentError that lists the ones it has', () => {
        const {A, circle} = create()

        expect(() => parseLabelText('@area', A)).toThrow(InvalidArgumentError)
        expect(() => parseLabelText('@width', circle)).toThrow(/@radius/)
    })

    test('@ stays a character of the text for a figure that shows no field', () => {
        const plot = new Plot(createContext(), 'f', {expression: 'x'})

        expect(parseLabelText('f@.2', plot)).toBe('f@.2')
    })
})

describe('parseLabelPosition', () => {
    test.each(['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'])('%s is the position %s', (position) => {
        expect(parseLabelPosition(position)).toBe(position)
    })

    test.each([['lt', 'tl'], ['ct', 'tc'], ['rt', 'tr'], ['lm', 'ml'], ['cm', 'mc'], ['rm', 'mr'], ['lb', 'bl'], ['cb', 'bc'], ['rb', 'br']])(
        'the letters of %s in the other order are the position %s', (written, position) => {
            expect(parseLabelPosition(written)).toBe(position)
        })

    test('a single letter replaces the same part of the default position', () => {
        expect(parseLabelPosition('t')).toBe('tr')
        expect(parseLabelPosition('l')).toBe('bl')
    })

    test.each(['', 'tt', 'll', 'tlr', 'x', 'xy', 'TL', 'tl '])('"%s" is no position', (text) => {
        expect(parseLabelPosition(text)).toBeNull()
    })
})
