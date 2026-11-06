import {beforeAll, describe, expect, test, vi} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import type {IDrawUsage} from '../../src/Draw/Draw.report'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const draw = (code: string) => new Draw(createContainer(), {code})

describe('what the figures ask of the program', () => {
    test('a drawing without drag, animation, steps or button asks nothing', () => {
        const d = draw('A(1,1)\nB(3,2)\nd=AB')

        expect(d.hasDraggable()).toBe(false)
        expect(d.usedControls()).toEqual([])
        expect(d.uses('animate')).toBe(false)
    })

    test('a point with drag is draggable', () => {
        expect(draw('A(1,1)->drag').hasDraggable()).toBe(true)
    })

    test('uses and usedControls tell the themes that a figure uses', () => {
        const d = draw('A(1,1)\nB(5,3)\n@button=p\nP(1,1)->animate,from=A,to=B,slide=<2->\nC(2,2)->toggle=p')

        expect(d.errors).toEqual([])
        expect(d.uses('animate')).toBe(true)
        expect(d.uses('slide')).toBe(true)
        expect(d.uses('toggle')).toBe(true)
        expect(d.usedControls()).toEqual(['animate', 'slide', 'toggle'])
    })

    test('the steps given by @pause count as slides', () => {
        const d = draw('A(1,1)\n@pause\nB(2,2)')

        expect(d.uses('slide')).toBe(true)
    })

    test('a button that no figure cites is not a use of toggle', () => {
        const d = draw('@button=p\nA(1,1)')

        expect(d.uses('toggle')).toBe(false)
    })

    test('the answer follows the code when it is drawn again', () => {
        const d = draw('A(1,1)->drag,slide=<2->')

        d.refresh('A(1,1)')
        expect(d.hasDraggable()).toBe(false)
        expect(d.usedControls()).toEqual([])
    })
})

describe('the event usage', () => {
    const listened = (code: string) => {
        const d = draw(code)
        const handler = vi.fn((_: CustomEvent<IDrawUsage>) => undefined)

        d.on('usage', handler)

        return {d, handler}
    }

    test('tells which extension to turn on when a figure begins to use it', () => {
        const {d, handler} = listened('A(1,1)')

        d.refresh('A(1,1)->drag,slide=<2->')

        expect(handler).toHaveBeenCalledTimes(1)
        expect(handler.mock.calls[0][0].detail).toEqual({draggable: true, controls: ['slide']})
    })

    test('tells when the last figure of a theme is gone', () => {
        const {d, handler} = listened('A(1,1)->slide=<2->')

        d.refresh('A(1,1)')

        expect(handler.mock.calls[0][0].detail).toEqual({draggable: false, controls: []})
    })

    test('tells nothing when the usage is the same', () => {
        const {d, handler} = listened('A(1,1)->drag')

        d.refresh('A(1,1)->drag\nB(2,2)')
        d.refresh('A(1,1)->drag\nB(3,3)')

        expect(handler).not.toHaveBeenCalled()
    })

    test('off stops the handler', () => {
        const {d, handler} = listened('A(1,1)')

        d.off('usage', handler)
        d.refresh('A(1,1)->drag')

        expect(handler).not.toHaveBeenCalled()
    })
})
