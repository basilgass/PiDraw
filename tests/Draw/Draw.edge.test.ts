import {afterEach, beforeAll, beforeEach, describe, expect, test, vi} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import {Edge} from '../../src/figures/Edge/Edge'
import {Label} from '../../src/figures/Label/Label'
import type {Point} from '../../src/figures/Point/Point'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(() => {
    useDocument()
})

// The text of a label is measured by the browser: here it is 40 x 20, so a node is a box of 56 x 36.
beforeEach(() => {
    vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 40, height: 20})
})

afterEach(() => {
    vi.restoreAllMocks()
})

const draw = (code: string, parameters?: string) => new Draw(createContainer(), {code, ...(parameters === undefined ? {} : {parameters})})
const edge = (d: Draw, name: string) => d.graph.figures[name] as Edge
const point = (d: Draw, name: string) => d.graph.figures[name] as Point
const problems = (d: Draw) => d.errors.map(e => `${e.line} ${e.severity} ${e.message}`)

/** The svg of a drawing, without what changes from one drawing to the next (the numbers of svg.js) and without the markers, which stay. */
function drawing(d: Draw): string {
    return d.graph.rootSVG.svg().replace(/Svgjs\w*\d+/g, 'Svgjs').replace(/svgjs:data="[^"]*"/g, '').replace(/<defs>[\s\S]*?<\/defs>/, '')
}

const NODES = 'A(0,0)->label,node=round\nB(4,0)->label,node=diamond'

describe('Draw key edge', () => {
    test('joins two nodes, stops at their borders', () => {
        const d = draw(`${NODES}\ne=edge A,B`)

        expect(problems(d)).toEqual([])
        expect(edge(d, 'e')).toBeInstanceOf(Edge)
        expect(edge(d, 'e').segments[0].start.x).toBeCloseTo(point(d, 'A').anchorPoint('mr').x)
        expect(edge(d, 'e').segments[0].end.x).toBeCloseTo(point(d, 'B').anchorPoint('ml').x)
    })

    test('joins two places of nodes, exactly', () => {
        const d = draw(`${NODES}\ne=edge A.mr,B.tl`)

        expect(problems(d)).toEqual([])
        expect(edge(d, 'e').segments[0].start).toEqual(point(d, 'A').anchorPoint('mr'))
        expect(edge(d, 'e').segments[0].end).toEqual(point(d, 'B').anchorPoint('tl'))
    })

    test('joins points that are not nodes', () => {
        const d = draw('A(0,0)\nB(3,2)\ne=edge A,B')

        expect(problems(d)).toEqual([])
        expect(edge(d, 'e').segments[0].end).toEqual({x: point(d, 'B').x, y: point(d, 'B').y})
    })

    test('is a loop when the point is the same twice', () => {
        const d = draw(`${NODES}\ne=edge A,A->loopSide=r`)

        expect(problems(d)).toEqual([])
        expect(edge(d, 'e').isLoop).toBe(true)
        expect(edge(d, 'e').config.loopSide).toBe('r')
    })

    test('is under the nodes: the edges are in a layer before the one of the points', () => {
        const d = draw(`${NODES}\ne=edge A,B`)
        const svg = d.graph.rootSVG.svg()

        expect(svg.indexOf('id="e"')).toBeLessThan(svg.indexOf('id="A"'))
        expect(svg.indexOf('id="e"')).toBeLessThan(svg.indexOf('id="B"'))
    })

    test('takes the options of every figure: the appearance, the marker, the label and the classes', () => {
        const d = draw(`${NODES}\ne=edge A,B->mark=end,dash,blue,w=2,label=yes/mc,labelFill=white,class=link`)
        const e = edge(d, 'e')

        expect(problems(d)).toEqual([])
        expect(e.shape.attr('marker-end')).toMatch(/^url\(#/)
        expect(e.shape.attr('stroke')).toBe('blue')
        expect(e.shape.attr('stroke-dasharray')).toBe('6 4')
        expect(e.label?.alignement).toBe('mc')
        expect(e.label?.config.fill).toEqual({color: 'white', opacity: 1})
        expect(e.element.attr('class')).toBe('pidraw-edge link')
    })

    test('is bent by curve, to the left for a positive number and to the right for a negative one', () => {
        const d = draw('A(0,0)\nB(4,0)\nu=edge A,B->curve=0.3\nv=edge A,B->curve=-0.3')

        expect(problems(d)).toEqual([])
        expect(edge(d, 'u').segments[0].control1.y).toBeLessThan(point(d, 'A').y)
        expect(edge(d, 'v').segments[0].control1.y).toBeGreaterThan(point(d, 'A').y)
    })

    test('has a loop on the top by default', () => {
        const d = draw(`${NODES}\ne=edge A,A->mark=end`)

        expect(problems(d)).toEqual([])
        expect(edge(d, 'e').segments[0].control1.y).toBeLessThan(point(d, 'A').y - 18)
    })

    test.each([
        ['edge A', 'one point'],
        ['edge A,B,A', 'three points'],
        ['edge A,Ox', 'a line that is not a point'],
        ['edge A,Z', 'a name that is not a figure']
    ])('"%s" is an error on the line (%s): no edge is made, and the other lines are drawn', (line) => {
        const d = draw(`A(0,0)\nB(3,0)\ne=${line}\nC(1,1)`)

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toMatch(/^3 error/)
        expect(d.graph.figures.e).toBeUndefined()
        expect(d.graph.figures.C).toBeDefined()
    })

    test.each([
        ['edge A,B->curve=left', 'a curve that is not a number'],
        ['edge A,B->loopSide=t', 'a side for an edge that is not a loop'],
        ['edge A,A->curve=0.3', 'a curve for a loop'],
        ['edge A,A->loopSide=x', 'a side that is not one'],
        ['edge A,B->curve=0.3,loopSide=r', 'a side for an edge that is not a loop']
    ])('"%s" is an error on the line (%s): the edge stays as it was before the option, and the other lines are drawn', (line) => {
        const d = draw(`A(0,0)\nB(3,0)\ne=${line}\nC(1,1)`)

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toMatch(/^3 error/)
        expect(d.graph.figures.C).toBeDefined()
        expect(edge(d, 'e').config.loopSide).toBeUndefined()
    })

    test('curve and loopSide are errors on a figure that is not an edge', () => {
        const d = draw('A(0,0)->curve=0.3\nB(1,0)->loopSide=t')

        expect(problems(d)).toHaveLength(2)
    })
})

describe('Draw edge and what it joins', () => {
    const code = `${NODES}\ne=edge A.mr,B.ml->mark=end\nf=edge A,B->curve=0.2`

    test('follows a node that moves', () => {
        const d = draw(code)
        const a = point(d, 'A')

        a.pixels = {x: a.x + 80, y: a.y + 60}
        d.graph.update([a])

        expect(edge(d, 'e').segments[0].start).toEqual(a.anchorPoint('mr'))
        expect(point(d, 'A.mr').pixels).toEqual(a.anchorPoint('mr'))
        expect(edge(d, 'f').segments[0].start.y).toBeCloseTo(a.y - 18)
    })

    test('follows a node whose label is bigger', () => {
        const d = draw(`${code}\nh=edge A,B`)
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 100, height: 20})

        point(d, 'A').updateLabel()
        d.graph.update()

        expect(edge(d, 'h').segments[0].start.x).toBeCloseTo(point(d, 'A').x + 58)
        expect(edge(d, 'e').segments[0].start).toEqual(point(d, 'A').anchorPoint('mr'))
    })

    test('gives a drawing, drawn again, that is the one of a new drawing', () => {
        const before = `${code}\ng=edge B,B`
        const after = `A(0,0)->label,node=diamond\nB(4,0)->label,node=circle\ne=edge A.mr,B.ml->mark=end\nf=edge B,B->loopSide=b`
        const again = draw(before)
        const fresh = draw(after)

        again.refresh(after)

        expect(problems(again)).toEqual([])
        expect(drawing(again)).toBe(drawing(fresh))
        expect(Object.keys(again.graph.figures)).toEqual(Object.keys(fresh.graph.figures))
    })

    test('is taken away with the node when its line goes', () => {
        const d = draw(code)

        d.refresh(NODES)

        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B'])
    })

    test('is hidden with a point that has no position, and is back when it has one', () => {
        const d = draw('A(0,0)\nB(3,0)\ne=edge A,B')

        point(d, 'B').pixels = {x: NaN, y: NaN}
        d.graph.update([point(d, 'B')])
        expect(edge(d, 'e').segments).toEqual([])

        point(d, 'B').pixels = {x: 300, y: 300}
        d.graph.update([point(d, 'B')])
        expect(edge(d, 'e').segments).toHaveLength(1)
    })
})

describe('Draw edge in TikZ', () => {
    test('is written between the nodes, under them, with the arrow and the label', () => {
        const d = draw(`${NODES}\ne=edge A.mr,B.ml->mark=end,label=yes`, 'x=-2:6,y=-2:2')
        const tikz = d.graph.tikz()

        expect(tikz).toContain('->')
        expect(tikz).toContain('{yes};')
        expect(tikz.indexOf('{A};')).toBeGreaterThan(tikz.indexOf('->'))
    })
})
