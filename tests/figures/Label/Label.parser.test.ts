import {describe, expect, test} from 'vitest'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import type {ILineType} from '../../../src/figures/Line/Line.types'
import {parseLabelText} from '../../../src/figures/Label/Label.parser'
import {createContext} from '../../helpers/figure'

function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
    const B = new Point(context, 'B', {coordinates: {x: 1, y: 1}})
    const line = (shape: ILineType) => new Line(context, 'd', {through: {A, B}, shape})

    return {A, circle: new Circle(context, 'c', {center: A, radius: 1}), line}
}

const coordinates = (digits: number) => ({field: 'coordinates', digits})
const length = (digits: number) => ({field: 'length', digits})

describe('parseLabelText', () => {
    test('a text without @ is kept as it is', () => {
        const {A} = create()

        expect(parseLabelText('A_1', A)).toBe('A_1')
    })

    test('@ is the field of a point: its coordinates, with 2 decimals', () => {
        const {A} = create()

        expect(parseLabelText('A@', A)).toEqual(['A', coordinates(2)])
    })

    test('@ followed by .n asks for n decimals, and the .n is not part of the text', () => {
        const {A} = create()

        expect(parseLabelText('@.3', A)).toEqual([coordinates(3)])
        expect(parseLabelText('A@.0 end', A)).toEqual(['A', coordinates(0), ' end'])
    })

    test('every @ is a field', () => {
        const {A} = create()

        expect(parseLabelText('@ and @.1', A)).toEqual([coordinates(2), ' and ', coordinates(1)])
    })

    test('@ is the length of a segment', () => {
        const {line} = create()

        expect(parseLabelText('d=@.1', line('segment'))).toEqual(['d=', length(1)])
    })

    test.each(['line', 'ray', 'vector'] as const)('@ stays a character of the text for a %s', (shape) => {
        const {line} = create()

        expect(parseLabelText('a@b', line(shape))).toBe('a@b')
    })

    test('@ stays a character of the text for a figure that shows no field', () => {
        const {circle} = create()

        expect(parseLabelText('c@.2', circle)).toBe('c@.2')
    })
})
