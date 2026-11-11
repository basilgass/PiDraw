import {beforeAll, describe, expect, test} from 'vitest'
import {Label} from '../../../src/figures/Label/Label'
import {
    LABEL_SIZES,
    labelSizeInPoints,
    parseLabelSize
} from '../../../src/figures/Label/Label.constraints'
import {tikzLabelFont, tikzLabelNode} from '../../../src/figures/AbstractFigure/AbstractFigure.tikz'
import {InvalidArgumentError, OptionError} from '../../../src/errors'
import {Draw} from '../../../src/Draw/Draw'
import {createContext, createSvg} from '../../helpers/figure'
import {AbstractFigure} from '../../../src/figures/AbstractFigure/AbstractFigure'
import {createContainer, useDocument} from '../../helpers/graph'
import type {Point} from '../../../src/figures/Point/Point'
import {applyOptions} from '../../../src/Draw/Draw.options'
import {Point as PointFigure} from '../../../src/figures/Point/Point'
import {Graph} from '../../../src/Graph'
import type {IParserParameters} from '../../../src/parser/parser.types'

beforeAll(() => {
    useDocument()
})

describe('parseLabelSize', () => {
    test.each([
        ['xs', '0.7em'],
        ['sm', '0.85em'],
        ['md', '1em'],
        ['lg', '1.25em'],
        ['xl', '1.5em']
    ])('the name %s is the CSS size %s, relative to the font of the page', (name, css) => {
        expect(parseLabelSize(name)).toBe(css)
        expect(LABEL_SIZES[name as keyof typeof LABEL_SIZES]).toBe(css)
    })

    test('a number is a number of pixels', () => {
        expect(parseLabelSize(14)).toBe('14px')
        expect(parseLabelSize(9.5)).toBe('9.5px')
    })

    test.each(['14px', '12pt', '1.2em', '1.2rem', '120%', '.5em'])('the length %s is kept', (length) => {
        expect(parseLabelSize(length)).toBe(length)
    })

    test('spaces around a size are not part of it', () => {
        expect(parseLabelSize(' lg ')).toBe('1.25em')
    })

    test.each([['large'], ['x-large'], ['calc(1em + 2px)'], ['12'], ['12 px'], ['-2px'], ['0px'], [0], [-3], [NaN], [Infinity], [true], [null], [undefined], [{}], ['']])(
        '%j is an InvalidArgumentError',
        (value) => {
            expect(() => parseLabelSize(value)).toThrow(InvalidArgumentError)
        }
    )

    test('the error says what is expected', () => {
        expect(() => parseLabelSize('large')).toThrow(/xs, sm, md, lg, xl.*14px/)
    })
})

describe('labelSizeInPoints', () => {
    test.each([
        ['12pt', 12],
        ['16px', 12],
        ['1.2em', 12],
        ['1.2rem', 12],
        ['120%', 12]
    ])('%s is %s points', (css, points) => {
        expect(labelSizeInPoints(css)).toBeCloseTo(points)
    })

    test('the size of the page has none', () => {
        expect(labelSizeInPoints('inherit')).toBeNull()
    })

    test('a size that is not one is an InvalidArgumentError', () => {
        expect(() => labelSizeInPoints('large')).toThrow(InvalidArgumentError)
    })
})

describe('tikzLabelFont', () => {
    test.each([
        ['xs', '\\scriptsize'],
        ['sm', '\\small'],
        ['md', '\\normalsize'],
        ['lg', '\\large'],
        ['xl', '\\Large']
    ])('the name %s is the command %s', (name, command) => {
        expect(tikzLabelFont(parseLabelSize(name))).toBe(command)
    })

    test('a length is a font size and a line of a fifth more', () => {
        expect(tikzLabelFont('16px')).toBe('\\fontsize{12pt}{14.4pt}\\selectfont')
        expect(tikzLabelFont('1.2em')).toBe('\\fontsize{12pt}{14.4pt}\\selectfont')
    })

    test('the size of the page is none', () => {
        expect(tikzLabelFont('inherit')).toBeNull()
    })
})

describe('tikzLabelNode size', () => {
    const config = {alignement: 'br', offset: {x: 0, y: 0}, rotate: 0} as const

    test('writes the font of a size', () => {
        expect(tikzLabelNode({...config, size: '1.25em'}, '1,2', 'A')).toBe('\\node[below right, font=\\large] at (1,2) {A};')
    })

    test('writes nothing for the size of the page', () => {
        expect(tikzLabelNode({...config, size: 'inherit'}, '1,2', 'A')).toBe('\\node[below right] at (1,2) {A};')
        expect(tikzLabelNode(config, '1,2', 'A')).toBe('\\node[below right] at (1,2) {A};')
    })
})

describe('Label size', () => {
    test('is set on the text of a <text>, and kept in the config', () => {
        const label = new Label(createSvg().group(), 'A', {text: 'hello'})

        label.setStyle({size: '1.5em'})

        expect(label.shape.css('font-size')).toBe('1.5em')
        expect(label.config.size).toBe('1.5em')
    })

    test('is set in the div of an HTML label', () => {
        const label = new Label(createSvg().group(), 'A', {text: 'hello', asHtml: true})

        label.setStyle({size: '20px'})

        expect(label.shape.node.innerHTML).toContain('font-size: 20px')
    })

    test('is drawn again with the size that the browser measures for it', () => {
        const label = new Label(createSvg().group(), 'A', {text: 'hello'})
        label.move(10, 10)
        let measured = 0
        label.size = () => {
            measured++

            return {width: 10, height: 10}
        }

        label.setStyle({size: '2em'})

        expect(measured).toBe(1)
    })

    test('stays when it is not given', () => {
        const label = new Label(createSvg().group(), 'A', {text: 'hello', size: '2em'})

        label.setStyle({color: 'red'})

        expect(label.config.size).toBe('2em')
    })
})

class TestFigure extends AbstractFigure {
    readonly config: object = {}

    computed(): this {
        return this
    }

    moveLabel(): this {
        return this
    }

    tikz(): string {
        return this._tikzLabel('0,0')
    }
}

describe('AbstractFigure label size', () => {
    test('gives the label its size, from a name, a number or a length', () => {
        const figure = new TestFigure(createContext(), 'A')
        const label = figure.addLabel('A')

        figure.setLabelStyle({size: 'lg'})
        expect(label.config.size).toBe('1.25em')

        figure.setLabelStyle({size: 14})
        expect(label.config.size).toBe('14px')

        figure.setLabelStyle({size: '2em'})
        expect(label.config.size).toBe('2em')
    })

    test('keeps the size for the label that is made after it, whatever the order', () => {
        const figure = new TestFigure(createContext(), 'A')

        figure.setLabelStyle({size: 'xl'})

        expect(figure.addLabel('A').config.size).toBe('1.5em')
    })

    test('null is the size of the page', () => {
        const figure = new TestFigure(createContext(), 'A')
        const label = figure.addLabel('A')
        figure.setLabelStyle({size: 'xl'})

        figure.setLabelStyle({size: null})

        expect(label.config.size).toBe('inherit')
    })

    test('resetStyle takes the size away', () => {
        const figure = new TestFigure(createContext(), 'A')
        figure.setLabelStyle({size: 'xl'})

        figure.resetStyle()

        expect(figure.addLabel('A').config.size).toBe('inherit')
    })

    test('an invalid size is an InvalidArgumentError, and the figure is left as it was', () => {
        const figure = new TestFigure(createContext(), 'A')
        figure.setLabelStyle({size: 'lg'})

        expect(() => figure.setLabelStyle({size: 'large'})).toThrow(InvalidArgumentError)
        expect(figure.addLabel('A').config.size).toBe('1.25em')
    })

    test('is written in TikZ', () => {
        const figure = new TestFigure(createContext(), 'A')
        figure.addLabel('A')
        figure.setLabelStyle({size: 'sm'})

        expect(figure.tikz()).toContain('font=\\small')
    })
})

describe('Draw option labelSize', () => {
    const option = (value: IParserParameters['value'], ...options: IParserParameters['options']): IParserParameters => ({value, options})

    function create() {
        const context = createContext()
        const graph = Object.create(Graph.prototype) as Graph
        Object.defineProperty(graph, 'config', {value: context.config, configurable: true})
        Object.defineProperty(graph, 'figures', {value: {}, configurable: true})
        const point = new PointFigure(context, 'A', {coordinates: {x: 1, y: 1}})

        return {graph, point}
    }

    test.each([
        ['lg', '1.25em'],
        [14, '14px'],
        ['1.2em', '1.2em']
    ])('labelSize=%s gives the label the size %s', (value, css) => {
        const {graph, point} = create()

        applyOptions({label: option('A'), labelSize: option(value)}, point, graph)

        expect(point.label?.config.size).toBe(css)
    })

    test('works before the label, and with tex', () => {
        const {graph, point} = create()

        applyOptions({labelSize: option('xl'), tex: option('x')}, point, graph)

        expect(point.label?.config.size).toBe('1.5em')
        expect(point.label?.asHtml).toBe(true)
    })

    test.each([[true], ['large'], [0], [-1]])('labelSize=%j is an OptionError', (value) => {
        const {graph, point} = create()

        expect(() => {
            applyOptions({label: option('A'), labelSize: option(value)}, point, graph)
        }).toThrow(OptionError)
    })

    test('is read from the code, in the forms that a user writes', () => {
        const d = new Draw(createContainer(), {code: 'A(0,0)->label,labelSize=lg\nB(1,0)->label,labelSize=14\nC(2,0)->label,labelSize=1.2em\nD(3,0)->label,labelSize=120%\nE(4,0)->label,labelSize=12pt\nF(5,0)->label,labelSize=14px'})
        const sizes = ['A', 'B', 'C', 'D', 'E', 'F'].map(name => (d.graph.figures[name] as Point).label?.config.size)

        expect(d.errors).toEqual([])
        expect(sizes).toEqual(['1.25em', '14px', '1.2em', '120%', '12pt', '14px'])
    })

    test('is an error on the line for a value that is not a size', () => {
        const d = new Draw(createContainer(), {code: 'A(0,0)->label,labelSize=large\nB(1,0)'})

        expect(d.errors).toHaveLength(1)
        expect(d.errors[0].line).toBe(1)
        expect(d.errors[0].message).toMatch(/xs, sm, md, lg, xl/)
    })
})
