import {afterEach, beforeAll, beforeEach, describe, expect, test, vi} from 'vitest'
import {Edge} from '../../../src/figures/Edge/Edge'
import {Point} from '../../../src/figures/Point/Point'
import {Label} from '../../../src/figures/Label/Label'
import {Draw} from '../../../src/Draw/Draw'
import {createContext, createSvg} from '../../helpers/figure'
import {createContainer, useDocument} from '../../helpers/graph'

beforeAll(() => {
    useDocument()
})

// The text of a label is measured by the browser: here it is 40 x 20.
beforeEach(() => {
    vi.spyOn(Label.prototype, 'size').mockReturnValue({width: 40, height: 20})
})

afterEach(() => {
    vi.restoreAllMocks()
})

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const [A, B] = [point('A', 0, 0), point('B', 4, 0)]
    const edge = new Edge(context, 'e', {from: A, to: B})
    const label = edge.addLabel('yes')

    return {context, A, B, edge, label}
}

const mask = (edge: Edge) => edge.rootSVG.findOne('#e-label-cut')

describe('Edge label on the line', () => {
    test('makes a hole in the line, the size of the label and a margin', () => {
        const {edge, label} = create()

        label.position('mc')
        edge.updateLabel()

        const hole = mask(edge)?.children()[1]
        expect(mask(edge)).not.toBeNull()
        expect(edge.shape.attr('mask')).toBe('url(#e-label-cut)')
        expect(hole?.attr('fill')).toBe('black')
        expect(Number(hole?.attr('width'))).toBe(46)
        expect(Number(hole?.attr('height'))).toBe(26)
        expect(hole?.cx()).toBeCloseTo(label.x)
        expect(hole?.cy()).toBeCloseTo(label.y)
    })

    test('keeps the rest of the line: the mask is white everywhere else', () => {
        const {edge, label} = create()

        label.position('mc')
        edge.updateLabel()

        const [everywhere] = mask(edge)?.children() ?? []
        expect(everywhere.attr('fill')).toBe('white')
        expect(mask(edge)?.attr('maskUnits')).toBe('userSpaceOnUse')
    })

    test.each(['tl', 'tc', 'br', 'ml', 'bc'] as const)('has no hole for a label that is beside the line (%s)', (position) => {
        const {edge, label} = create()

        label.position(position)
        edge.updateLabel()

        expect(mask(edge)).toBeNull()
        expect(edge.shape.attr('mask')).toBeUndefined()
    })

    test('has no hole for a label that has no position', () => {
        const {edge} = create()

        expect(mask(edge)).toBeNull()
        expect(edge.cutsLine).toBe(false)
    })

    test('has no hole when the label has a background of its own, whatever the order', () => {
        const {edge, label} = create()

        label.position('mc')
        edge.setLabelStyle({fill: 'white'})
        edge.updateLabel()

        expect(mask(edge)).toBeNull()
        expect(label.config.fill).toEqual({color: 'white', opacity: 1})
    })

    test('loses its hole when a background is asked for after it', () => {
        const {edge, label} = create()
        label.position('mc')
        edge.updateLabel()
        expect(mask(edge)).not.toBeNull()

        edge.setLabelStyle({fill: 'yellow'})

        expect(mask(edge)).toBeNull()
        expect(edge.shape.attr('mask')).toBeUndefined()
    })

    test('has no hole and no background with labelFill none or transparent', () => {
        for (const color of ['none', 'transparent']) {
            const {edge, label} = create()
            label.position('mc')
            edge.setLabelStyle({fill: color})
            edge.updateLabel()

            expect(mask(edge)).toBeNull()
            expect(edge.element.children().some(child => child.type === 'rect')).toBe(false)
        }
    })

    test('has no hole for a label that is hidden, and gets it back when it is shown', () => {
        const {edge, label} = create()
        label.position('mc')
        label.hide()
        edge.updateLabel()
        expect(mask(edge)).toBeNull()

        label.show()
        edge.updateLabel()

        expect(mask(edge)).not.toBeNull()
    })

    test('follows the label when the edge moves', () => {
        const {A, B, edge, label} = create()
        label.position('mc')
        edge.updateLabel()
        const before = mask(edge)?.children()[1].cx() ?? 0

        B.pixels = {x: B.x + 100, y: B.y}
        edge.computed()
        edge.updateLabel()

        expect(mask(edge)?.children()[1].cx()).toBeCloseTo(label.x)
        expect(mask(edge)?.children()[1].cx()).toBeGreaterThan(before + 20)
        expect(A.x).toBeLessThan(label.x)
    })

    test('is made once: the mask is the same when the label is put again', () => {
        const {edge, label} = create()
        label.position('mc')
        edge.updateLabel()
        edge.updateLabel()

        expect(edge.rootSVG.find('#e-label-cut')).toHaveLength(1)
    })

    test('has no hole for an edge that does not exist', () => {
        const context = createContext()
        const edge = new Edge(context, 'e', {from: new Point(context, 'A', {coordinates: {x: 1, y: 1}}), to: new Point(context, 'B', {coordinates: {x: 1, y: 1}})})
        const label = edge.addLabel('yes')
        label.position('mc')
        edge.updateLabel()

        expect(edge.rootSVG.findOne('#e-label-cut')).toBeNull()
    })

    test('is taken away with the edge', () => {
        const {edge, label} = create()
        label.position('mc')
        edge.updateLabel()

        edge.dispose()

        expect(mask(edge)).toBeNull()
        expect(edge.shape.attr('mask')).toBeUndefined()
    })

    test('is written in TikZ as a white background, the margin of the hole', () => {
        const {edge, label} = create()
        label.position('mc')
        edge.updateLabel()

        expect(edge.tikz()).toContain('node[fill=white, inner sep=2.25pt] at (')
    })

    test('is written in TikZ with the background that was asked for, and without one for none', () => {
        const yellow = create()
        yellow.label.position('mc')
        yellow.edge.setLabelStyle({fill: 'yellow'})
        yellow.edge.updateLabel()

        const none = create()
        none.label.position('mc')
        none.edge.setLabelStyle({fill: 'none'})
        none.edge.updateLabel()

        expect(yellow.edge.tikz()).toContain('fill=pidraw-yellow')
        expect(none.edge.tikz()).not.toContain('fill=')
    })

    test('is not in TikZ for a label that is beside the line', () => {
        const {edge} = create()

        expect(edge.tikz()).not.toContain('fill=')
    })
})

describe('Label bounds and a background that is not seen', () => {
    test('are the center and the size of the text as it was last drawn', () => {
        const label = new Label(createSvg().group(), 'A', {text: 'hello', alignement: 'mc'})

        expect(label.bounds).toBeNull()

        label.move(100, 50)

        expect(label.bounds).toEqual({x: 100, y: 50, width: 40, height: 20})
    })

    test.each([
        [{color: 'none', opacity: 1}],
        [{color: 'transparent', opacity: 1}],
        [{color: 'white', opacity: 0}]
    ])('a background %j makes no box', (fill) => {
        const group = createSvg().group()
        const label = new Label(group, 'A', {text: 'hello', fill, alignement: 'mc'})

        label.move(10, 10)

        expect(group.find('rect')).toHaveLength(0)
    })
})

describe('Draw edge label on the line', () => {
    const draw = (options: string) => new Draw(createContainer(), {code: `A(0,0)\nB(4,0)\ne=edge A,B->label=yes/mc${options}`})
    const cut = (d: Draw) => d.graph.rootSVG.findOne('#e-label-cut')

    test('makes a hole in the line', () => {
        const d = draw('')

        expect(d.errors).toEqual([])
        expect(cut(d)).not.toBeNull()
    })

    test('does not make one with a background of its own, in any order', () => {
        const after = draw(',labelFill=white')
        const before = new Draw(createContainer(), {code: 'A(0,0)\nB(4,0)\ne=edge A,B->labelFill=white,label=yes/mc'})

        expect(cut(after)).toBeNull()
        expect(cut(before)).toBeNull()
    })

    test('does not make one with labelFill=none', () => {
        expect(cut(draw(',labelFill=none'))).toBeNull()
    })

    test('does not make one for a label beside the line, or for a label that is hidden', () => {
        const beside = new Draw(createContainer(), {code: 'A(0,0)\nB(4,0)\ne=edge A,B->label=yes'})
        const hidden = draw(',?')

        expect(cut(beside)).toBeNull()
        expect(cut(hidden)).toBeNull()
    })

    test('is taken away when the line of the edge goes', () => {
        const d = draw('')

        d.refresh('A(0,0)\nB(4,0)')

        expect(cut(d)).toBeNull()
    })

    test('is made again with a drawing that is drawn again, as with a new one', () => {
        const d = draw('')

        d.refresh('A(0,0)\nB(4,0)\ne=edge A,B->label=yes/mc')

        expect(d.graph.rootSVG.find('#e-label-cut')).toHaveLength(1)
        expect(d.graph.rootSVG.findOne('#e')?.findOne('path')?.attr('mask')).toBe('url(#e-label-cut)')
    })
})
