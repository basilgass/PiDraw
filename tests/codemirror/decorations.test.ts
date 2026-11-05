import {describe, expect, test} from 'vitest'
import {nameRanges} from '../../src/codemirror'

/** The names marked in the code, as `name:kind`. */
function marked(code: string): string[] {
    return nameRanges(code).map(({from, to, kind}) => `${code.slice(from, to)}:${kind}`)
}

describe('names of the figures', () => {
    test('a figure made once is a definition', () => {
        expect(marked('A=pt 1,1\nB(2,2)')).toEqual(['A:def', 'B:def'])
    })

    test('a name made twice is marked on both lines', () => {
        expect(marked('A(1,1)\nA(2,2)')).toEqual(['A:dup', 'A:dup'])
    })

    test('the figures that a line uses are references', () => {
        expect(marked('A(1,1)\nB(2,2)\ns=seg A,B')).toEqual(['A:def', 'B:def', 's:def', 'A:ref', 'B:ref'])
    })

    test('a shorthand of a line has the names of its points', () => {
        expect(marked('A(1,1)\nB(2,2)\nd=AB')).toEqual(['A:def', 'B:def', 'd:def', 'A:ref', 'B:ref'])
    })

    test('a figure of a lowercase name is a reference when it is a value', () => {
        expect(marked('A(1,1)\nd=line A,A\nP=proj A,d')).toEqual(['A:def', 'd:def', 'A:ref', 'A:ref', 'P:def', 'A:ref', 'd:ref'])
    })

    test('A.x and A.y are references, in a point and in a function', () => {
        expect(marked('A(1,2)\nB(A.x,3)\nf(x)=A.y*x')).toEqual(['A:def', 'B:def', 'A:ref', 'f:def', 'A:ref'])
    })

    test('a name that is not a figure is not marked', () => {
        expect(marked('A(1,1)\nf(x)=x^2\nP=eval f,2')).toEqual(['A:def', 'f:def', 'P:def', 'f:ref'])
    })

    test('the kind of figure is not a name', () => {
        // `p` is a figure, and `perp` starts with it: only the two values are references.
        expect(marked('p=pt 1,1\nq=perp p,p')).toEqual(['p:def', 'q:def', 'p:ref', 'p:ref'])
    })

    test('the options are not read', () => {
        expect(marked('A(1,1)->label=A')).toEqual(['A:def'])
    })

    test('a comment, a line for something else and an invalid line make no figure', () => {
        expect(marked('% A=pt 1,1\n$ A=pt 1,1\n@ A=pt 1,1\nA(1,1)')).toEqual(['A:def'])
    })

    test('the ranges are in the text, with its indent', () => {
        const [first] = nameRanges('   A(1,1)')
        expect(first).toEqual({from: 3, to: 4, kind: 'def'})
    })
})
