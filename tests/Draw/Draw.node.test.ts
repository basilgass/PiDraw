import {afterEach, beforeAll, beforeEach, describe, expect, test, vi} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import {Label} from '../../src/figures/Label/Label'
import type {Line} from '../../src/figures/Line/Line'
import type {Point} from '../../src/figures/Point/Point'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(() => {
    useDocument()
})

// The text of a label is measured by the browser: here it is 40 x 20, so a box of 56 x 36.
beforeEach(() => {
    vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 40, height: 20})
})

afterEach(() => {
    vi.restoreAllMocks()
})

const draw = (code: string, parameters?: string) => new Draw(createContainer(), {code, ...(parameters === undefined ? {} : {parameters})})
const point = (d: Draw, name: string) => d.graph.figures[name] as Point
const problems = (d: Draw) => d.errors.map(e => `${e.line} ${e.severity} ${e.message}`)

/** The svg of a drawing, without what changes from one drawing to the next (the numbers of svg.js) and without the markers, which stay. */
function drawing(d: Draw): string {
    return d.graph.rootSVG.svg().replace(/Svgjs\w*\d+/g, 'Svgjs').replace(/svgjs:data="[^"]*"/g, '').replace(/<defs>[\s\S]*?<\/defs>/, '')
}

describe('Draw option node', () => {
    test.each(['rect', 'round', 'diamond', 'circle'])('node=%s makes the point a node of that shape', (shape) => {
        const d = draw(`A(0,0)->label=Hello,node=${shape}`)

        expect(problems(d)).toEqual([])
        expect(point(d, 'A').node).toBe(shape)
    })

    test('node alone is a rectangle, and it works before the label', () => {
        const d = draw('A(0,0)->node,label=Hello')

        expect(problems(d)).toEqual([])
        expect(point(d, 'A').node).toBe('rect')
        expect(point(d, 'A').label?.alignement).toBe('mc')
    })

    test('works with tex', () => {
        const d = draw('A(0,0)->tex=x,node=circle')

        expect(problems(d)).toEqual([])
        expect(point(d, 'A').node).toBe('circle')
    })

    test('takes the stroke and the fill of the point', () => {
        const d = draw('A(0,0)->label,node=rect,fill=yellow,red,dash')
        const box = point(d, 'A').shape

        expect(box.attr('fill')).toBe('yellow')
        expect(box.attr('stroke')).toBe('red')
    })

    test.each([
        ['node=hexagon'],
        ['node=3'],
        ['node=rect,s'],
        ['s,node=rect'],
        ['o=8,node']
    ])('%s is an error on the line', (options) => {
        const d = draw(`A(0,0)->label,${options}`)

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toMatch(/^1 error/)
    })

    test('is an error on a figure that is not a point', () => {
        const d = draw('A(0,0)\nB(1,1)\nd=line A,B->node')

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toMatch(/^3 error .*not a point/)
    })

    test('is not touched by the shape and the visibility that the graph gives to the points', () => {
        const hidden = draw('A(0,0)->label,node=rect\nB(2,0)', 'default.points=no')
        const shaped = draw('A(0,0)->label,node=rect\nB(2,0)', 'default.points=s/12')

        expect(problems(hidden)).toEqual([])
        expect(point(hidden, 'A').shape.css('display')).not.toBe('none')
        expect(point(hidden, 'B').shape.css('display')).toBe('none')
        expect(problems(shaped)).toEqual([])
        expect(point(shaped, 'A').node).toBe('rect')
    })
})

describe('Draw places of a node', () => {
    const code = 'A(0,0)->label,node=rect\nB(4,0)->label,node=circle\nd=seg A.mr,B.ml'

    test('are points that are not drawn, which are named like the place', () => {
        const d = draw(code)

        expect(problems(d)).toEqual([])
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B', 'A.mr', 'B.ml', 'd'])
        expect(point(d, 'A.mr').element.css('display')).toBe('none')
        expect(point(d, 'A.mr').pixels).toEqual(point(d, 'A').anchorPoint('mr'))
    })

    test('are the ends of the figures that name them', () => {
        const d = draw(code)
        const {start, end} = d.graph.figures.d as Line

        expect(start).toEqual(point(d, 'A').anchorPoint('mr'))
        expect(end.x).toBeCloseTo(point(d, 'B').anchorPoint('ml').x)
    })

    test('are made once, whatever the number of lines that name them', () => {
        const d = draw(`${code}\nm=mid A.mr,B.ml\nt=seg A.mr,B.ml`)

        expect(problems(d)).toEqual([])
        expect(Object.keys(d.graph.figures).filter(name => name === 'A.mr')).toHaveLength(1)
    })

    test('follow the node when it moves, and the figures that use them follow', () => {
        const d = draw(code)
        const A = point(d, 'A')

        A.pixels = {x: A.x + 100, y: A.y + 50}
        d.graph.update([A])

        expect(point(d, 'A.mr').pixels).toEqual(A.anchorPoint('mr'))
        expect((d.graph.figures.d as Line).start).toEqual(A.anchorPoint('mr'))
    })

    test('follow the node when its label changes size', () => {
        const d = draw(code)
        const A = point(d, 'A')
        vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 100, height: 20})

        A.updateLabel()
        d.graph.update([A])

        expect(point(d, 'A.mr').pixels.x).toBeCloseTo(A.x + 58)
    })

    test('are all the places of the box: the corners, the sides and the center', () => {
        const d = draw('A(0,0)->label,node=rect\nB(4,3)\n' + ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'].map(place => `s${place}=seg A.${place},B`).join('\n'))

        expect(problems(d)).toEqual([])
        expect(point(d, 'A.tl').pixels).toEqual({x: point(d, 'A').x - 28, y: point(d, 'A').y - 18})
        expect(point(d, 'A.mc').pixels).toEqual({x: point(d, 'A').x, y: point(d, 'A').y})
    })

    test('can be named by a point construction', () => {
        const d = draw('A(0,0)->label,node=rect\nB(4,0)->label,node=rect\nM=mid A.mr,B.ml')

        expect(problems(d)).toEqual([])
        expect(point(d, 'M').coordinates.x).toBeCloseTo((point(d, 'A.mr').coordinates.x + point(d, 'B.ml').coordinates.x) / 2)
    })

    test('are an error for a point that is not a node', () => {
        const d = draw('A(0,0)\nB(4,0)\nd=seg A.mr,B')

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toMatch(/^3 error .*"A" is not a node/)
        expect(d.graph.figures.d).toBeUndefined()
    })

    test('are not a place that exists in other cases: a name that is not a node, or a place that is not one, is an error as before', () => {
        expect(problems(draw('A(0,0)->node\nd=seg A.zz,A'))).toHaveLength(1)
        expect(problems(draw('d=seg Z.mr,Z'))).toHaveLength(1)
    })

    test('give a drawing, drawn again, that is the one of a new drawing', () => {
        const before = `${code}\nm=mid A.mr,B.ml`
        const after = 'A(0,0)->label,node=diamond\nB(4,0)->label,node=circle\nd=seg A.mr,B.ml\nm=mid A.mr,B.ml'
        const again = draw(before)
        const fresh = draw(after)

        again.refresh(after)

        expect(problems(again)).toEqual([])
        expect(drawing(again)).toBe(drawing(fresh))
        expect(Object.keys(again.graph.figures)).toEqual(Object.keys(fresh.graph.figures))
    })

    test('are taken away with the line that named them, and made again by a line that names them later', () => {
        const d = draw(`${code}\nm=mid A.mr,B.ml`)

        d.refresh('A(0,0)->label,node=rect\nB(4,0)->label,node=circle\nd=seg A.mr,B.ml')
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B', 'A.mr', 'B.ml', 'd'])

        d.refresh('A(0,0)->label,node=rect\nB(4,0)->label,node=circle\nm=mid A.mr,B.ml')
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B', 'A.mr', 'B.ml', 'm'])

        d.refresh('A(0,0)->label,node=rect\nB(4,0)->label,node=circle')
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B'])
    })
})
