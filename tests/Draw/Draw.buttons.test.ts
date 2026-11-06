import {beforeAll, describe, expect, test} from 'vitest'
import {Buttons} from '../../src/buttons/Buttons'
import {toggleOf} from '../../src/buttons/toggle'
import {Draw} from '../../src/Draw/Draw'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const draw = (code: string) => new Draw(createContainer(), {code})
const toggle = (d: Draw, name: string) => toggleOf(d.graph.figures[name])
const shown = (figure: AbstractFigure) => figure.element.attr('visibility') !== 'hidden'
const problems = (d: Draw) => d.errors.map(error => `${error.line}: ${error.message}`)

const EXAMPLE = [
    'f(x)=x/3+6',
    'g(x)=1/8(2x-8)^2+2',
    '@button=a->title=Between',
    '@button=b->title=Under f',
    'a=fill f,g,1.05:7.6->fill=yellow/0.3,!,toggle=a/0.5',
    'b=fill f,1.05:7.6->fill=green/0.3,!,toggle=b/2',
    'c=fill g,1.05:7.6->fill=red/0.3,!,toggle=a'
].join('\n')

describe('the command @button and the option toggle', () => {
    test('give the button to the figure, with the duration in seconds and whether the line hides it', () => {
        const d = draw(EXAMPLE)

        expect(problems(d)).toEqual([])
        expect(toggle(d, 'a')).toEqual({id: 'a', duration: 0.5, hidden: true})
        expect(toggle(d, 'b')).toEqual({id: 'b', duration: 2, hidden: true})
        expect(toggle(d, 'c')).toEqual({id: 'a', duration: 0, hidden: true})
    })

    test('a figure without `!` is shown when the button is not pressed', () => {
        const d = draw('@button=p\nA(1,1)->toggle=p')

        expect(problems(d)).toEqual([])
        expect(toggle(d, 'A')).toEqual({id: 'p', duration: 0, hidden: false})
    })

    test('the title is what follows title=, to the end of the line, and the id when there is none', () => {
        const d = draw('@button=a->title=Show f, g and h\n@button=b\nA(1,1)')
        const buttons = new Buttons(d.graph)

        expect(buttons.buttons).toEqual([{id: 'a', title: 'Show f, g and h', active: false}, {id: 'b', title: 'b', active: false}])
    })

    test('Buttons presses the figures of the code together', () => {
        const d = draw('@button=p->title=Points\nA(1,1)->!,toggle=p\nB(2,2)->!,toggle=p\nC(3,3)->toggle=p\nD(4,4)')
        const buttons = new Buttons(d.graph)
        const { A, B, C, D } = d.graph.figures

        expect([A, B, C, D].map(shown)).toEqual([false, false, true, true])

        buttons.toggle('p')

        expect([A, B, C, D].map(shown)).toEqual([true, true, false, true])
    })

    test('a figure of `!` shows its label too, once the button shows it', () => {
        const d = draw('@button=p\nA(1,1)->!,toggle=p,label=A')
        const buttons = new Buttons(d.graph)

        buttons.toggle('p')

        expect(shown(d.graph.figures.A)).toBe(true)
        expect(d.graph.figures.A.label?.visible).toBe(true)
    })

    test('without a Buttons, every figure is shown', () => {
        const d = draw('@button=p\nA(1,1)->!,toggle=p')

        expect(shown(d.graph.figures.A)).toBe(true)
    })

    test('the buttons follow the code when it is written again', () => {
        const d = draw('@button=p\nA(1,1)->!,toggle=p')
        const buttons = new Buttons(d.graph)

        buttons.toggle('p')
        d.refresh('@button=p->title=Point\n@button=q\nA(1,1)->!,toggle=p\nB(2,2)->!,toggle=q')

        expect(buttons.buttons).toEqual([{id: 'p', title: 'Point', active: true}, {id: 'q', title: 'q', active: false}])
        expect([d.graph.figures.A, d.graph.figures.B].map(shown)).toEqual([true, false])
    })

    test.each([
        ['a button that is declared after the figure', 'A(1,1)->toggle=p\n@button=p', 1],
        ['a button that is not declared', '@button=q\nA(1,1)->toggle=p', 2],
        ['no id', '@button=p\nA(1,1)->toggle', 2],
        ['a negative duration', '@button=p\nA(1,1)->toggle=p/-1', 2],
        ['a duration that is not a number', '@button=p\nA(1,1)->toggle=p/long', 2],
        ['more than a duration', '@button=p\nA(1,1)->toggle=p/1/2', 2]
    ])('%s is an error of the line, and the figure has no button', (_, code, line) => {
        const d = draw(code)

        expect(d.errors.map(error => error.line)).toContain(line)
        expect(Object.hasOwn(d.graph.figures, 'A') ? toggle(d, 'A') : null).toBeNull()
    })

    test.each([
        ['a button twice', '@button=p\n@button=p->title=Again'],
        ['no id', '@button'],
        ['an id with a space', '@button=a b'],
        ['an empty title', '@button=p->title='],
        ['another option', '@button=p->color=red'],
        ['no =', '@button p']
    ])('%s is an error of the command', (_, code) => {
        const d = draw(code)

        expect(d.errors).toHaveLength(1)
        expect(d.errors[0].line).toBe(code.split('\n').length)
    })

    test('the TikZ of a figure that the button hides is not written, and is when it shows it', () => {
        const d = draw('@button=p\nA(1,1)->!,toggle=p')
        const buttons = new Buttons(d.graph)

        expect(d.graph.tikz()).not.toContain('(1,1)')

        buttons.toggle('p')

        expect(d.graph.tikz()).toContain('(1,1)')
    })
})
