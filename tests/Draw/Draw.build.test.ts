import {beforeAll, describe, expect, test} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import {asPiDrawError, locate} from '../../src/Draw/Draw.report'
import {InvalidArgumentError, OptionError, ParseError} from '../../src/errors'
import type {Point} from '../../src/figures/Point/Point'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(() => {
    useDocument()
})

const draw = (code: string, parameters?: string) => new Draw(createContainer(), {code, ...(parameters === undefined ? {} : {parameters})})
const names = (d: Draw) => Object.keys(d.graph.figures)
const stroke = (d: Draw, name: string) => d.graph.figures[name].appearance.stroke.color

describe('Draw report', () => {
    test('code that is valid gives no error, and every line is ok', () => {
        const d = draw('A(1,2)\n\n$ a comment\nB(3,4)\ns=seg A,B')

        expect(d.errors).toEqual([])
        expect(d.report.lines).toEqual([{line: 1, status: 'ok'}, {line: 4, status: 'ok'}, {line: 5, status: 'ok'}])
        expect(names(d)).toEqual(['A', 'B', 's'])
    })

    test('comments (%) and lines for something else ($) draw the same figures as code without them', () => {
        const d = draw('% the points\nA(1,2)\n$a=1,2,3/0.1=1\n%B(9,9)\nB(3,4)\ns=seg A,B')

        expect(d.errors).toEqual([])
        expect(d.report.lines).toEqual([{line: 2, status: 'ok'}, {line: 5, status: 'ok'}, {line: 6, status: 'ok'}])
        expect(names(d)).toEqual(['A', 'B', 's'])
    })

    test('refresh gives the same report as the draw keeps', () => {
        const d = draw('A(1,2)')
        const report = d.refresh('A(1,2)\nB(3,')

        expect(report).toBe(d.report)
        expect(d.errors).toBe(report.errors)
    })

    test('a line that cannot be built is an error with its number and its text: the others are drawn', () => {
        const d = draw('A(1,2)\nd=ABC\nB(3,4)')

        expect(names(d)).toEqual(['A', 'B'])
        expect(d.errors).toHaveLength(1)
        expect(d.errors[0]).toMatchObject({line: 2, text: 'd=ABC', severity: 'error'})
        expect(d.errors[0].error).toBeInstanceOf(ParseError)
        expect(d.errors[0].message).toBe(d.errors[0].error.message)
        expect(d.report.lines.map(l => l.status)).toEqual(['ok', 'error', 'ok'])
    })

    test('a figure that names a figure that is not built is an error of its line, and the other lines are drawn', () => {
        const d = draw('A(1,2)\nd=seg A,Z\nB(3,4)')

        expect(names(d)).toEqual(['A', 'B'])
        expect(d.errors.map(e => e.line)).toEqual([2])
    })

    test('a line that is not a figure (a name alone, an unknown key) is an error', () => {
        const d = draw('hello\nA=nothing 1,2\nB(3,4)')

        expect(d.errors.map(e => e.line)).toEqual([1, 2])
        expect(d.errors.every(e => e.error instanceof ParseError)).toBe(true)
        expect(names(d)).toEqual(['B'])
    })

    test('a command is an error of its line', () => {
        const d = draw('@begin:static\nA(1,2)')

        expect(d.errors.map(e => e.line)).toEqual([1])
        expect(names(d)).toEqual(['A'])
    })

    test('the name of an axis is an error of its line', () => {
        const d = draw('Ox(1,2)\nA(1,2)')

        expect(d.errors.map(e => e.line)).toEqual([1])
        expect(names(d)).toEqual(['A'])
    })

    test('an option that is not valid is an OptionError on its entry: the figure is drawn, and the options before it are applied', () => {
        const d = draw('A(1,2)->color=red,colr=blue,fill=green\n  B(3,4)->w=red')

        expect(names(d)).toEqual(['A', 'B'])
        expect(stroke(d, 'A')).toBe('red')
        expect(d.errors).toHaveLength(2)
        expect(d.errors[0].error).toBeInstanceOf(OptionError)
        expect(d.errors[0]).toMatchObject({line: 1, from: 18, to: 27})
        // The line starts with two spaces: the columns are the ones of the line as it is written.
        expect(d.errors[1]).toMatchObject({line: 2, from: 10, to: 15})
    })

    test('the errors of the code before are gone when it is drawn again', () => {
        const d = draw('A(1,2)\nd=ABC')

        expect(d.errors).toHaveLength(1)

        d.refresh('A(1,2)')

        expect(d.errors).toEqual([])
        expect(d.report.lines).toEqual([{line: 1, status: 'ok'}])
    })

    test('code without a line is a report without a line', () => {
        expect(draw('').report).toEqual({errors: [], lines: []})
    })
})

describe('Draw line being written', () => {
    const code = (b: string) => `A(1,2)\n${b}\nC(5,6)`

    test('a line that is not valid keeps the figure it had: the problem is pending, and the others are drawn', () => {
        const d = draw(code('B(3,4)->color=red'))
        const before = d.graph.figures.B

        expect(before).toBeDefined()

        const report = d.refresh(code('B(3,4)->colr=red'), {editing: 2})

        expect(report.errors).toHaveLength(1)
        expect(report.errors[0]).toMatchObject({line: 2, severity: 'pending'})
        expect(report.lines.map(l => l.status)).toEqual(['ok', 'pending', 'ok'])
        expect(names(d)).toEqual(['A', 'B', 'C'])
        expect(stroke(d, 'B')).toBe('red')
        expect(d.graph.figures.B).not.toBe(before)
    })

    test('the same line, not being written, is drawn as far as it goes: the problem is an error', () => {
        const d = draw(code('B(3,4)->color=red'))

        const report = d.refresh(code('B(3,4)->colr=red'))

        expect(report.errors[0]).toMatchObject({line: 2, severity: 'error'})
        expect(names(d)).toEqual(['A', 'B', 'C'])
        expect(stroke(d, 'B')).not.toBe('red')
    })

    test('the figures that name the line that is being written are still built', () => {
        const d = draw('A(1,2)\nB(3,4)\nd=seg A,B')

        const report = d.refresh('A(1,2)\nB(3,\nd=seg A,B', {editing: 2})

        expect(report.errors.map(e => [e.line, e.severity])).toEqual([[2, 'pending']])
        expect(names(d)).toEqual(['A', 'B', 'd'])
        expect((d.graph.figures.B as Point).config).toMatchObject({coordinates: {x: 3, y: 4}})

        // Not being written, the same code leaves the segment without its point.
        const other = d.refresh('A(1,2)\nB(3,\nd=seg A,B')
        expect(other.errors.map(e => e.line)).toEqual([2, 3])
        expect(names(d)).toEqual(['A'])
    })

    test('a line that becomes valid is built as it is written', () => {
        const d = draw(code('B(3,4)'))

        const report = d.refresh(code('B(7,8)'), {editing: 2})

        expect(report.errors).toEqual([])
        expect((d.graph.figures.B as Point).config).toMatchObject({coordinates: {x: 7, y: 8}})
    })

    test('a line with no version before has no figure, and its problem is pending', () => {
        const d = draw('A(1,2)')

        const report = d.refresh('A(1,2)\nB(3,', {editing: 2})

        expect(report.errors).toMatchObject([{line: 2, severity: 'pending'}])
        expect(names(d)).toEqual(['A'])
    })

    test('the version kept is the last valid one, not the one of two drawings ago', () => {
        const d = draw(code('B(3,4)'))

        d.refresh(code('B(5,6)'), {editing: 2})
        d.refresh(code('B(5,'), {editing: 2})
        d.refresh(code('B(5,6'), {editing: 2})

        expect((d.graph.figures.B as Point).config).toMatchObject({coordinates: {x: 5, y: 6}})
    })

    test('the version before is not used when a line was added or removed', () => {
        const d = draw(code('B(3,4)'))

        d.refresh('A(1,2)\nB(3,\n\nC(5,6)', {editing: 2})

        expect(names(d)).toEqual(['A', 'C'])
    })

    test('the version before is not used when another line changed too: it is not known which line it belongs to', () => {
        const d = draw('A(1,2)\nB(3,4)\nC(5,6)')

        // The same number of lines, a different code: the second line is not the one that was there.
        const report = d.refresh('P(0,0)\nB(3,\nQ(7,8)', {editing: 2})

        expect(report.errors.map(e => [e.line, e.severity])).toEqual([[2, 'pending']])
        expect(names(d)).toEqual(['P', 'Q'])
    })

    test('the line being written falls back when the other lines are the ones of the last drawing, even if one is not valid', () => {
        const d = draw('A(1,\nB(3,4)\nC(5,6)')

        const report = d.refresh('A(1,\nB(3,\nC(5,6)', {editing: 2})

        expect(report.errors.map(e => [e.line, e.severity])).toEqual([[1, 'error'], [2, 'pending']])
        expect(names(d)).toEqual(['B', 'C'])
    })

    test.each([0, -1, 1.5, NaN])('the line %s to edit is an InvalidArgumentError', (editing) => {
        const d = draw('A(1,2)')

        expect(() => d.refresh('A(1,2)', {editing})).toThrow(InvalidArgumentError)
    })
})

describe('Draw parameters of the graph', () => {
    test('parameters that are valid give no error', () => {
        const d = draw('A(1,2)', 'x=-4:12,y=-2:10')

        expect(d.layoutError).toBeNull()
        expect(d.refreshLayout('x=-5:5')).toBeNull()
    })

    test('a parameter that is not valid is an error that the draw gives: nothing is thrown', () => {
        const d = draw('A(1,2)', 'x=-4:12,y=-2:10')
        const config = d.graph.config

        const error = d.refreshLayout('nothing=1')

        expect(error).toMatchObject({line: 1, text: 'nothing=1', severity: 'error'})
        expect(error?.error).toBeInstanceOf(ParseError)
        expect(d.layoutError).toBe(error)
        expect(d.graph.config).toBe(config)
    })

    test('the error goes away with parameters that are valid', () => {
        const d = draw('A(1,2)')

        d.refreshLayout('nothing=1')
        d.refreshLayout('x=-5:5')

        expect(d.layoutError).toBeNull()
    })

    test('parameters that are not valid when the draw is made give the default layout and an error', () => {
        const d = draw('A(1,2)', 'nothing=1')
        const reference = draw('A(1,2)')

        expect(d.layoutError).not.toBeNull()
        expect(d.graph.config).toEqual(reference.graph.config)
        expect(names(d)).toEqual(['A'])
    })
})

describe('Draw default shape of the points', () => {
    const point = (code: string, parameters?: string) => draw(code, parameters).graph.figures.A as Point

    test('the points of the drawing take the shape of the points setting', () => {
        const A = point('A(1,2)', 'default.points=s/12')

        expect(A.config.shape).toBe('square')
        expect(A.size).toBe(12)
    })

    test('the shape of the setting has the default size when it gives none', () => {
        const A = point('A(1,2)', 'default.points=*')

        expect(A.config.shape).toBe('crosshair')
        expect(A.size).toBe(10)
    })

    test('a shape option of the point wins over the setting', () => {
        const A = point('A(1,2)->o', 'default.points=s/12')

        expect(A.config.shape).toBe('circle')
        expect(A.size).toBe(5)
    })

    test('without a setting, a point stays a circle of the default size', () => {
        const A = point('A(1,2)')

        expect(A.config.shape).toBe('circle')
        expect(A.size).toBe(5)
    })
})

describe('Draw report helpers', () => {
    test('an error that is not an error of PiDraw becomes a ParseError that names the line and keeps its cause', () => {
        const cause = new TypeError('boom')
        const error = asPiDrawError(cause, 'A(1,2)')

        expect(error).toBeInstanceOf(ParseError)
        expect(error.message).toContain('A(1,2)')
        expect(error.message).toContain('boom')
        expect(error.cause).toBe(cause)
    })

    test('an error of PiDraw is kept', () => {
        const error = new OptionError('w', 'no')

        expect(asPiDrawError(error, 'A(1,2)')).toBe(error)
    })

    test('the position of an option is its entry after the arrow, with the spaces before the line', () => {
        const text = 'A(1,2)->red, w=3 ,dash'

        expect(locate(text, new OptionError('red', 'x'))).toEqual({from: 8, to: 11})
        expect(locate(text, new OptionError('w', 'x'), 2)).toEqual({from: 15, to: 18})
        expect(locate(text, new OptionError('dash', 'x'))).toEqual({from: 18, to: 22})
    })

    test('an error that is not about an option, or an option that is not found, concerns the whole line', () => {
        expect(locate('A(1,2)->red', new ParseError('x'))).toEqual({})
        expect(locate('A(1,2)', new OptionError('red', 'x'))).toEqual({})
        expect(locate('A(1,2)->red', new OptionError('blue', 'x'))).toEqual({})
    })
})
