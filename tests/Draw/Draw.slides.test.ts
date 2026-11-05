import {beforeAll, describe, expect, test} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import type {AbstractFigure} from '../../src/figures/AbstractFigure/AbstractFigure'
import {Slides} from '../../src/slides/Slides'
import {slideOf} from '../../src/slides/slideSet'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const draw = (code: string) => new Draw(createContainer(), {code})
const steps = (d: Draw, name: string) => slideOf(d.graph.figures[name])
const shown = (figure: AbstractFigure) => figure.element.attr('visibility') !== 'hidden'
const problems = (d: Draw) => d.errors.map(error => `${error.line}: ${error.message}`)

describe('the option slide', () => {
    test('gives the steps to the figure', () => {
        const d = draw('A(1,1)->slide=<2-4,6,8->')

        expect(problems(d)).toEqual([])
        expect(steps(d, 'A')).toEqual([{from: 2, to: 4}, {from: 6, to: 6}, {from: 8}])
    })

    test.each([
        ['<3->', [{from: 3}]],
        ['<-3>', [{from: 1, to: 3}]],
        ['<2-3>', [{from: 2, to: 3}]],
        ['<5>', [{from: 5, to: 5}]]
    ])('reads %s', (text, expected) => {
        const d = draw(`A(1,1)->slide=${text}`)

        expect(problems(d)).toEqual([])
        expect(steps(d, 'A')).toEqual(expected)
    })

    test('the other options go on after the set', () => {
        const d = draw('A(1,1)->slide=<2-3,5>,red,label=A, B')

        expect(problems(d)).toEqual([])
        expect(steps(d, 'A')).toEqual([{from: 2, to: 3}, {from: 5, to: 5}])
        expect(d.graph.figures.A.label?.shape.node.textContent).toBe('A, B')
    })

    test.each([
        ['steps without chevrons', 'A(1,1)->slide=3'],
        ['steps with a range but no chevrons', 'A(1,1)->slide=3-5'],
        ['no steps', 'A(1,1)->slide'],
        ['a step below 1', 'A(1,1)->slide=<0>'],
        ['an option after the set', 'A(1,1)->slide=<2>/tl']
    ])('%s is an error of the line, and the figure has no steps', (_, code) => {
        const d = draw(code)

        expect(d.errors).toHaveLength(1)
        expect(d.errors[0].line).toBe(1)
        expect(Object.hasOwn(d.graph.figures, 'A') ? slideOf(d.graph.figures.A) : null).toBeNull()
    })

    test('works for any kind of figure', () => {
        const d = draw('A(1,1)\nB(3,2)\nd=AB->slide=<2->\nc=circ A,1->slide=<3->')

        expect(problems(d)).toEqual([])
        expect(steps(d, 'd')).toEqual([{from: 2}])
        expect(steps(d, 'c')).toEqual([{from: 3}])
    })

    test('a drag handle goes with its point, whatever the order of the options', () => {
        const before = draw('A(1,1)->drag,slide=<2->')
        const after = draw('A(1,1)->slide=<2->,drag')

        for (const d of [before, after]) {
            expect(problems(d)).toEqual([])
            expect(steps(d, 'A_drag')).toEqual([{from: 2}])
        }
    })

    test('without a Slides the steps mean nothing', () => {
        const d = draw('A(1,1)->slide=<2->')

        expect(shown(d.graph.figures.A)).toBe(true)
    })
})

describe('the commands @pause and @slides', () => {
    test('@pause shows what follows at the next step', () => {
        const d = draw('A(1,1)\n@pause\nB(2,2)\n@pause\nC(3,3)')

        expect(problems(d)).toEqual([])
        expect([steps(d, 'A'), steps(d, 'B'), steps(d, 'C')]).toEqual([null, [{from: 2}], [{from: 3}]])
    })

    test('@slides=<steps> gives the steps to the figures that follow, and the line can say its own', () => {
        const d = draw('@slides=<2-3>\nA(1,1)\nB(2,2)->slide=<5>')

        expect(steps(d, 'A')).toEqual([{from: 2, to: 3}])
        expect(steps(d, 'B')).toEqual([{from: 5, to: 5}])
    })

    test('a line of several figures gives them all the steps', () => {
        const d = draw('A(1,1)\nB(3,2)\nd=AB\n@pause\nC=inter d,d')

        expect(problems(d).filter(message => !message.includes('inter'))).toEqual([])
    })

    test('two parts of a drawing go step by step together', () => {
        const d = draw(['@slides', 'A(1,1)', '@pause', 'B(2,2)', '@pause', 'C(3,3)',
            '@slides', 'D(-1,-1)', '@pause', 'E(-2,-2)', 'F(-3,-3)->slide=<4->'].join('\n'))

        expect(problems(d)).toEqual([])
        expect(['A', 'B', 'C', 'D', 'E', 'F'].map(name => steps(d, name))).toEqual([
            null, [{from: 2}], [{from: 3}], null, [{from: 2}], [{from: 4}]
        ])
    })

    test('the handle of a point gets the steps from the commands too', () => {
        const d = draw('@pause\nA(1,1)->drag')

        expect(steps(d, 'A_drag')).toEqual([{from: 2}])
    })

    test('a command is a line of the report that is valid', () => {
        const d = draw('A(1,1)\n@pause\nB(2,2)')

        expect(d.report.lines).toEqual([{line: 1, status: 'ok'}, {line: 2, status: 'ok'}, {line: 3, status: 'ok'}])
    })

    test.each(['@play', '@pause 2', '@slides=3', '@slides=<2->,red', '@'])('the command %s is an error of its line', (command) => {
        const d = draw(`A(1,1)\n${command}\nB(2,2)`)

        expect(d.errors).toHaveLength(1)
        expect(d.errors[0].line).toBe(2)
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B'])
    })
})

describe('the slides of a drawing of the code', () => {
    const code = ['A(1,1)->label', '@pause', 'B(3,2)->label', '@pause', 'C(5,3)->label', 'd=AB'].join('\n')

    test('Slides shows the figures step by step', () => {
        const d = draw(code)
        const slides = new Slides(d.graph)
        const at = () => ['A', 'B', 'C', 'd'].map(name => shown(d.graph.figures[name]))

        expect(slides.count).toBe(3)
        expect(at()).toEqual([true, false, false, false])

        slides.next()
        expect(at()).toEqual([true, true, false, false])

        slides.next()
        expect(at()).toEqual([true, true, true, true])
    })

    test('a code that is redrawn gets the steps again, at the step that is shown', () => {
        const d = draw('A(1,1)\n@pause\nB(2,2)')
        const slides = new Slides(d.graph)
        slides.next()

        d.refresh('A(1,1)\n@pause\nB(2,2)\n@pause\nC(3,3)')

        expect(slides.count).toBe(3)
        expect(slides.current).toBe(2)
        expect(shown(d.graph.figures.B)).toBe(true)
        expect(shown(d.graph.figures.C)).toBe(false)
    })

    test('a code that loses its steps shows its figures again, and the steps are counted again', () => {
        const d = draw('A(1,1)\n@pause\nB(2,2)')
        const slides = new Slides(d.graph)

        d.refresh('A(1,1)\nB(2,2)')

        expect(slides.count).toBe(1)
        expect(shown(d.graph.figures.B)).toBe(true)
    })

    test('a code that changes a command above the lines gives them other steps', () => {
        const d = draw('@pause\nA(1,1)\nB(2,2)')

        d.refresh('@slides=<3->\nA(1,1)\nB(2,2)')

        expect(steps(d, 'A')).toEqual([{from: 3}])
        expect(steps(d, 'B')).toEqual([{from: 3}])
    })

    test('a code redrawn from the middle is the same drawing as a code drawn at once', () => {
        const first = 'A(1,1)\n@pause\nB(2,2)\n@pause\nC(3,3)\nd=AB'
        const second = 'A(1,1)\n@pause\nB(2,2)\n@slides=<4->\nC(3,3)\nd=AB'
        const redrawn = draw(first)
        redrawn.refresh(second)
        const fresh = draw(second)

        for (const name of ['A', 'B', 'C', 'd']) {
            expect(steps(redrawn, name)).toEqual(steps(fresh, name))
        }
    })

    test('the figures that a line made keep their steps when the line is the same', () => {
        const d = draw('@pause\nA(1,1)\nB(2,2)')
        const A = d.graph.figures.A

        d.refresh('@pause\nA(1,1)\nB(3,3)')

        expect(d.graph.figures.A).toBe(A)
        expect(steps(d, 'A')).toEqual([{from: 2}])
    })

    test('the line being written keeps its figure, and the steps that it had', () => {
        const d = draw('@pause\nA(1,1)')

        d.refresh('@pause\nA(1,1', {editing: 2})

        expect(d.errors).toHaveLength(1)
        expect(steps(d, 'A')).toEqual([{from: 2}])
    })

    test('the TikZ writes what is shown at the step', () => {
        const d = draw(code)
        const slides = new Slides(d.graph)
        const circles = () => d.graph.tikz().match(/circle/g)?.length ?? 0

        expect(circles()).toBe(1)

        slides.last()
        expect(circles()).toBe(3)
    })
})

describe('the titles of the steps of a drawing of the code', () => {
    const titled = ['A(1,1)', '@pause=Second step', 'B(2,2)', '@pause=Third step', 'C(3,3)'].join('\n')

    test('go to the graph, and a Slides made afterward reads them', () => {
        const d = draw(titled)
        const slides = new Slides(d.graph)

        expect(problems(d)).toEqual([])
        expect(d.graph.controls.titles).toEqual({2: 'Second step', 3: 'Third step'})
        expect(slides.titles).toEqual({2: 'Second step', 3: 'Third step'})
        expect(slides.count).toBe(3)
    })

    test('a title can be written anywhere in the code', () => {
        const d = draw('@title,3=Conclusion\nA(1,1)\n@pause\nB(2,2)\n@pause\nC(3,3)\n@title,1=Start')
        const slides = new Slides(d.graph)

        expect(problems(d)).toEqual([])
        expect([slides.titleOf(1), slides.titleOf(3)]).toEqual(['Start', 'Conclusion'])
    })

    test('a code without titles leaves the graph without them', () => {
        expect(draw('A(1,1)').graph.controls.titles).toBeUndefined()
    })

    test('a change of a title alone changes the titles, and a Slides that exists says so once', () => {
        const code = (title: string) => ['A(1,1)', '@pause', 'B(2,2)', `@title,2=${title}`].join('\n')
        const d = draw(code('First'))
        const slides = new Slides(d.graph)
        const states: unknown[] = []
        slides.on('change', (event) => { states.push(event.detail) })
        slides.goto(2)
        states.length = 0

        d.refresh(code('Other'))

        expect(slides.titleOf(2)).toBe('Other')
        expect(states).toEqual([{current: 2, count: 2, title: 'Other'}])
    })

    test('the same code again says nothing', () => {
        const d = draw(titled)
        const slides = new Slides(d.graph)
        const states: unknown[] = []
        slides.on('change', (event) => { states.push(event.detail) })

        d.refresh(titled)

        expect(states).toEqual([])
    })

    test('titles taken out of the code are taken away', () => {
        const d = draw(titled)
        const slides = new Slides(d.graph)

        d.refresh('A(1,1)\n@pause\nB(2,2)')

        expect(slides.titles).toEqual({})
        expect(slides.title).toBeNull()
    })

    test('a code redrawn has the titles of a new one', () => {
        const d = draw('A(1,1)')
        d.refresh(titled)

        expect(d.graph.controls).toEqual(draw(titled).graph.controls)
    })

    test.each([
        ['an empty title', '@pause='],
        ['a second title for a step', '@pause=A\n@title,2=B'],
        ['a step that is not from 1', '@title,0=Zero'],
        ['a title without its step', '@title=Zero']
    ])('%s is an error of its line, and the figures are still drawn', (_, command) => {
        const d = draw(`A(1,1)\n${command}\nB(2,2)`)

        expect(d.errors.length).toBeGreaterThan(0)
        expect(Object.keys(d.graph.figures)).toEqual(['A', 'B'])
    })

    test('the title does not appear in the TikZ', () => {
        const d = draw(titled)

        expect(d.graph.tikz()).not.toContain('Second step')
    })
})
