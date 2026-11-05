import {beforeAll, describe, expect, test} from 'vitest'
import {Box} from '@svgdotjs/svg.js'
import {Draw} from '../../src/Draw/Draw'
import {editedRecord, reusableCount, type ILineRecord} from '../../src/Draw/Draw.diff'
import type {Point} from '../../src/figures/Point/Point'
import {basic_examples} from '../../demo/parsing_examples/basic_examples'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(() => {
    useDocument()
})

const draw = (code: string, parameters?: string) => new Draw(createContainer(), {code, ...(parameters === undefined ? {} : {parameters})})
const names = (d: Draw) => Object.keys(d.graph.figures)
const point = (d: Draw, name: string) => d.graph.figures[name] as Point

/** The svg of a drawing, without what changes from one drawing to the next (the numbers of svg.js) and without the markers, which stay. */
function drawing(d: Draw): string {
    return d.graph.rootSVG.svg().replace(/Svgjs\w*\d+/g, 'Svgjs').replace(/svgjs:data="[^"]*"/g, '').replace(/<defs>[\s\S]*?<\/defs>/, '')
}

const problems = (d: Draw) => d.errors.map(e => `${e.line} ${e.severity} ${e.message}`)

/** Drag a point as the mouse does: its shape fires `dragmove` with the box that the mouse gives it. */
function mouseTo(handle: Point, center: { x: number, y: number }): void {
    const box = handle.shape.bbox()

    handle.shape.fire('dragmove', {
        event: {},
        handler: {},
        box: new Box(center.x - box.width / 2, center.y - box.height / 2, box.width, box.height),
        dx: 0,
        dy: 0
    })
}

const record = (text: string, fallback = false): ILineRecord => ({
    number: 1, text, indent: 0, valid: null, validText: null, error: null, fallback, created: []
})

describe('Draw reusable lines', () => {
    test('are the lines at the start that are the same', () => {
        const before = ['A(1,2)', 'B(3,4)', 'C(5,6)'].map(text => record(text))

        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(3,4)'}, {text: 'C(5,6)'}])).toBe(3)
        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(3,4)'}, {text: 'C(7,8)'}])).toBe(2)
        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(3,4)'}])).toBe(2)
        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(3,4)'}, {text: 'C(5,6)'}, {text: 'D(7,8)'}])).toBe(3)
    })

    test('stop at the first line that differs, even if a later one is the same', () => {
        const before = ['A(1,2)', 'B(3,4)', 'C(5,6)'].map(text => record(text))

        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(0,0)'}, {text: 'C(5,6)'}])).toBe(1)
        expect(reusableCount(before, [{text: 'Z(0,0)'}, {text: 'A(1,2)'}, {text: 'B(3,4)'}])).toBe(0)
    })

    test('do not include a line that was made from its version before', () => {
        const before = [record('A(1,2)'), record('B(3,', true), record('C(5,6)')]

        expect(reusableCount(before, [{text: 'A(1,2)'}, {text: 'B(3,'}, {text: 'C(5,6)'}])).toBe(1)
    })

    test('are none without a drawing before, or without code', () => {
        expect(reusableCount([], [{text: 'A(1,2)'}])).toBe(0)
        expect(reusableCount([record('A(1,2)')], [])).toBe(0)
    })
})

describe('Draw line being written, among the lines', () => {
    const before = [
        {...record('A(1,2)'), number: 1},
        {...record('B(3,4)'), number: 2},
        {...record('C(5,6)'), number: 4}
    ]
    const lines = (...texts: [number, string][]) => texts.map(([number, text]) => ({number, text}))

    test('is the record of the line, if it is the only one that is not the same', () => {
        expect(editedRecord(before, lines([1, 'A(1,2)'], [2, 'B(3,'], [4, 'C(5,6)']), 2)).toBe(before[1])
        expect(editedRecord(before, lines([1, 'A(1,2)'], [2, 'B(3,4)'], [4, 'C(5,6)']), 2)).toBe(before[1])
    })

    test('is none if another line changed, was added, removed or moved', () => {
        expect(editedRecord(before, lines([1, 'A(1,'], [2, 'B(3,'], [4, 'C(5,6)']), 2)).toBeUndefined()
        expect(editedRecord(before, lines([1, 'A(1,2)'], [2, 'B(3,'], [4, 'C(5,6)'], [5, 'D(0,0)']), 2)).toBeUndefined()
        expect(editedRecord(before, lines([1, 'A(1,2)'], [2, 'B(3,']), 2)).toBeUndefined()
        expect(editedRecord(before, lines([2, 'A(1,2)'], [3, 'B(3,'], [5, 'C(5,6)']), 3)).toBeUndefined()
    })

    test('is none for a line that was not there', () => {
        expect(editedRecord(before, lines([1, 'A(1,2)'], [2, 'B(3,4)'], [3, 'D('], [4, 'C(5,6)']), 3)).toBeUndefined()
    })
})

describe('Draw lines that did not change', () => {
    const code = 'A(1,2)\nB(3,4)\nC(5,6)'

    test('keep their figures, the others are made again', () => {
        const d = draw(code)
        const [A, B, C] = [d.graph.figures.A, d.graph.figures.B, d.graph.figures.C]

        d.refresh('A(1,2)\nB(3,4)\nC(7,8)')

        expect(d.graph.figures.A).toBe(A)
        expect(d.graph.figures.B).toBe(B)
        expect(d.graph.figures.C).not.toBe(C)
        expect(point(d, 'C').config).toMatchObject({coordinates: {x: 7, y: 8}})
    })

    test('a line that changes makes the ones after it again, as they may name it', () => {
        const d = draw('A(1,2)\nB(3,4)\ns=seg A,B')
        const [A, B, s] = [d.graph.figures.A, d.graph.figures.B, d.graph.figures.s]

        d.refresh('A(1,2)\nB(5,6)\ns=seg A,B')

        expect(d.graph.figures.A).toBe(A)
        expect(d.graph.figures.B).not.toBe(B)
        expect(d.graph.figures.s).not.toBe(s)
        expect(d.errors).toEqual([])
    })

    test('the same code builds nothing', () => {
        const d = draw(code)
        const figures = Object.values(d.graph.figures)
        d.refresh(code)

        expect(Object.values(d.graph.figures)).toEqual(figures)
        expect(Object.values(d.graph.figures).every((figure, i) => figure === figures[i])).toBe(true)
    })

    test('with an empty line before are the same lines: their errors follow their number', () => {
        const d = draw('A(1,2)\nd=ABC')
        const A = d.graph.figures.A

        d.refresh('\n\nA(1,2)\nd=ABC')

        expect(d.graph.figures.A).toBe(A)
        expect(d.errors.map(e => e.line)).toEqual([4])
        expect(d.report.lines).toEqual([{line: 3, status: 'ok'}, {line: 4, status: 'error'}])
    })

    test('a line that is not valid is the line being written, or not, as the code says', () => {
        const d = draw('A(1,2)\nB(3,')

        expect(d.errors[0].severity).toBe('error')
        expect(d.refresh('A(1,2)\nB(3,', {editing: 2}).errors[0].severity).toBe('pending')
        expect(d.refresh('A(1,2)\nB(3,').errors[0].severity).toBe('error')
    })

    test('a line made from its version before is made again when it is not being written', () => {
        const d = draw('A(1,2)\nB(3,4)')

        d.refresh('A(1,2)\nB(3,', {editing: 2})
        expect(names(d)).toEqual(['A', 'B'])

        d.refresh('A(1,2)\nB(3,')
        expect(names(d)).toEqual(['A'])
    })

    test('are made again when the parameters of the graph changed, not when they did not', () => {
        const d = draw(code, 'x=-5:5')
        const A = d.graph.figures.A

        expect(d.refreshLayout('x=-5:5')).toBeNull()
        d.refresh(code)
        expect(d.graph.figures.A).toBe(A)

        expect(d.refreshLayout('x=-3:3')).toBeNull()
        d.refresh(code)
        expect(d.graph.figures.A).not.toBe(A)
    })

    test('a figure made by hand in the graph does not stay', () => {
        const d = draw(code)

        d.graph.create.point({x: 9, y: 9}, 'Z')
        d.refresh(code)

        expect(names(d)).toEqual(['A', 'B', 'C'])
    })

    test('give the drawing of a new Draw, whatever was changed', () => {
        const variants = (code: string) => {
            const lines = code.split('\n')
            const middle = Math.floor(lines.length / 2)

            return [
                lines.slice(0, -1).join('\n'),
                [...lines.slice(0, middle), lines[middle], ...lines.slice(middle)].join('\n'),
                `${code}\nZ(0,0)->red`,
                [...lines.slice(0, middle), 'bad line', ...lines.slice(middle)].join('\n')
            ]
        }

        for (const example of basic_examples) {
            for (const changed of variants(example.code)) {
                const again = draw(example.code)
                again.refresh(changed)
                const fresh = draw(changed)

                expect(drawing(again), example.name).toBe(drawing(fresh))
                expect(problems(again), example.name).toEqual(problems(fresh))
                expect(names(again), example.name).toEqual(names(fresh))
            }
        }
    }, 20_000)
})

describe('Draw points that were dragged', () => {
    const code = 'A(1,2)->drag\nB(3,4)\nd=seg A,B'

    /** A drawing where the user dragged A to (300, 200). */
    function dragged(source = code, parameters?: string) {
        const d = draw(source, parameters)

        mouseTo(point(d, 'A_drag'), {x: 300, y: 200})

        return d
    }

    test('stay where they were left when their line is the same', () => {
        const d = dragged()
        const A = point(d, 'A')

        d.refresh('A(1,2)->drag\nB(3,4)\nd=seg A,B->red')

        expect(point(d, 'A')).toBe(A)
        expect(A.pixels).toEqual({x: 300, y: 200})
    })

    test('are put back where they were left when their line is made again: a new rank', () => {
        const d = dragged()
        const A = point(d, 'A')

        d.refresh(`P(0,0)\n${code}`)

        expect(point(d, 'A')).not.toBe(A)
        expect(point(d, 'A').pixels).toEqual({x: 300, y: 200})
        expect(point(d, 'A_drag').pixels).toEqual({x: 300, y: 200})
        expect(d.errors).toEqual([])
    })

    test('the figures that name them are built on the place they were left', () => {
        const d = dragged()

        d.refresh(`P(0,0)\n${code}`)

        expect(d.graph.figures.d.shape.bbox().x).toBeCloseTo(Math.min(300, point(d, 'B').pixels.x), 0)
    })

    test('are put where the line says with the option drag reset', () => {
        const d = dragged()
        const initial = draw(code)

        d.refresh(code, {drag: 'reset'})

        expect(point(d, 'A').pixels).toEqual(point(initial, 'A').pixels)
        expect(drawing(d)).toBe(drawing(initial))
    })

    test('are put where the line says with reset when their line is made again too', () => {
        const d = dragged()
        const initial = draw(`P(0,0)\n${code}`)

        d.refresh(`P(0,0)\n${code}`, {drag: 'reset'})

        expect(point(d, 'A').pixels).toEqual(point(initial, 'A').pixels)
    })

    test('are forgotten for good after reset', () => {
        const d = dragged()

        d.refresh(code, {drag: 'reset'})
        d.refresh(`P(0,0)\n${code}`)

        expect(point(d, 'A').pixels).toEqual(point(draw(code), 'A').pixels)
    })

    test('are put where the line says when the line is not the same', () => {
        const d = dragged()

        d.refresh('A(1,3)->drag\nB(3,4)\nd=seg A,B')

        expect(point(d, 'A').pixels).toEqual(point(draw('A(1,3)->drag'), 'A').pixels)
    })

    test('keep the rules of their drag', () => {
        const d = dragged('A(1,2)->drag=Ox\nB(3,4)')
        const height = point(draw('A(1,2)->drag=Ox'), 'A').pixels.y

        expect(point(d, 'A').pixels.x).toBe(300)
        expect(point(d, 'A').pixels.y).toBeCloseTo(height, 9)

        d.refresh('P(0,0)\nA(1,2)->drag=Ox\nB(3,4)')

        expect(point(d, 'A').pixels.x).toBe(300)
        expect(point(d, 'A').pixels.y).toBeCloseTo(height, 9)
    })

    test('that were not dragged are where the line says, even if what they depend on changed', () => {
        const d = draw('P(0,0)\nA(1,2)->drag')

        d.refresh('Q(0,0)\nA(1,2)->drag')

        expect(drawing(d)).toBe(drawing(draw('Q(0,0)\nA(1,2)->drag')))
    })

    test('keep their place in units when the scale changes', () => {
        const d = dragged(code, 'x=-5:5')
        const units = d.graph.toCoordinates(point(d, 'A').pixels)

        d.refreshLayout('x=-3:3')
        d.refresh(code)

        const after = d.graph.toCoordinates(point(d, 'A').pixels)
        expect(after).toMatchObject({x: expect.closeTo(units.x, 6) as number, y: expect.closeTo(units.y, 6) as number})
    })

    test('are forgotten with their line', () => {
        const d = dragged()

        d.refresh('B(3,4)')
        d.refresh(code)

        expect(point(d, 'A').pixels).toEqual(point(draw(code), 'A').pixels)
    })

    test('a point dragged while its line is being written is put back from the last valid line', () => {
        const d = dragged('P(0,0)\nA(1,2)->drag\nB(3,4)')

        d.refresh('P(0,0)\nA(1,2)->dra\nB(3,4)', {editing: 2})
        expect(point(d, 'A').pixels).toEqual({x: 300, y: 200})

        d.refresh('P(0,0)\nA(1,2)->drag\nB(3,4)', {editing: 2})
        expect(point(d, 'A').pixels).toEqual({x: 300, y: 200})
    })
})

describe('Draw with a unit and a scale', () => {
    const code = 'O(0,0)\nc=circ O,2->label=@radius\nA(1,1)\nB(4,1)\nC(1,4)\na=arc B,A,C->label=@'

    test('the labels write the lengths with the unit and the scale of the parameters', () => {
        const d = draw('O(0,0)\nc=circ O,2->label=@radius', 'unit=mm,scale=10')

        expect(d.graph.figures.c.label?.displayName).toBe('20 mm')
    })

    test('the angle has the degree sign without any parameter', () => {
        const d = draw(code)

        expect(d.graph.figures.a.label?.displayName).toBe('90°')
    })

    test('a drawing with the parameters refreshed is the one of a new drawing, and the unit does not change the shapes', () => {
        const plain = draw(code, 'x=-3:6,y=-3:6')
        const measured = draw(code, 'x=-3:6,y=-3:6,unit=cm,scale=2')
        const refreshed = draw(code, 'x=-3:6,y=-3:6')

        refreshed.refreshLayout('x=-3:6,y=-3:6,unit=cm,scale=2')
        refreshed.refresh(code)

        expect(drawing(refreshed)).toBe(drawing(measured))
        expect(refreshed.graph.figures.c.label?.displayName).toBe('4 cm')
        expect(plain.graph.figures.c.label?.displayName).toBe('2')
        expect(problems(refreshed)).toEqual([])
    })

    test('a unit that does not exist is a layout error and the lengths stay as they were', () => {
        const d = draw('O(0,0)\nc=circ O,2->label=@radius', 'unit=mm')
        const error = d.refreshLayout('unit=inch')

        expect(error).not.toBeNull()
        expect(d.graph.figures.c.label?.displayName).toBe('2 mm')
    })
})

describe('Draw with labels pushed away from a figure', () => {
    const code = 'O(0,0)\nc=circ O,4\nA(0,4)->drag=c,label=@/>O'

    test('the label of a point on a circle lies on the side opposite to the center', () => {
        const d = draw(code, 'x=-6:6,y=-6:6')
        const away = point(d, 'A').label?.config.away

        expect(away?.x).toBeCloseTo(0, 6)
        expect(away?.y).toBeCloseTo(-1, 6)
        expect(problems(d)).toEqual([])
    })

    test('the label turns around the point when it is dragged on the circle', () => {
        const d = draw(code, 'x=-6:6,y=-6:6')
        const target = d.graph.toPixels({x: 4, y: 0})

        mouseTo(point(d, 'A_drag'), target)

        const away = point(d, 'A').label?.config.away

        expect(away?.x).toBeCloseTo(1, 6)
        expect(away?.y).toBeCloseTo(0, 6)
    })

    test('a point with a drag handle keeps its label clear of the handle, and the distance that is written replaces it', () => {
        const d = draw('A(1,1)->drag,label=A\nB(2,2)->label=B/tr/0.2,drag', 'x=-6:6,y=-6:6')

        expect(point(d, 'A').label?.config.clearance).toBe(15)
        expect(point(d, 'A').label?.config.push).toBeNull()
        expect(point(d, 'B').label?.config.clearance).toBe(15)
        expect(point(d, 'B').label?.config.push).toBeGreaterThan(0)
    })

    test('the order of drag and label does not matter', () => {
        const d = draw('A(1,1)->label=A,drag', 'x=-6:6,y=-6:6')

        expect(point(d, 'A').label?.config.clearance).toBe(15)
    })

    test('a name that does not exist is an error of the line, and the others are drawn', () => {
        const d = draw('A(1,1)->label=A/>Z\nB(2,2)', 'x=-6:6,y=-6:6')

        expect(problems(d)).toHaveLength(1)
        expect(names(d)).toContain('B')
    })

    test('a drawing refreshed is the one of a new drawing', () => {
        const fresh = draw(code, 'x=-6:6,y=-6:6')
        const refreshed = draw('O(0,0)\nc=circ O,4\nA(0,4)->drag=c', 'x=-6:6,y=-6:6')

        refreshed.refresh(code)

        expect(drawing(refreshed)).toBe(drawing(fresh))
        expect(point(refreshed, 'A').label?.config.away).toEqual(point(fresh, 'A').label?.config.away)
    })

    test('the label of a point follows another point that is dragged', () => {
        const d = draw('O(0,0)->drag\nA(0,4)->label=@/>O', 'x=-6:6,y=-6:6')

        expect(point(d, 'A').label?.config.away?.y).toBeCloseTo(-1, 6)

        mouseTo(point(d, 'O_drag'), d.graph.toPixels({x: 4, y: 4}))

        // O is now level with A, to the right: the label lies to the left of A.
        expect(point(d, 'A').label?.config.away?.x).toBeCloseTo(-1, 6)
    })
})
