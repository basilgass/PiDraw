import { describe, test, expect } from 'vitest'
import { Graph } from '../src/Graph'
import {NumExp} from "../src/Calculus";
import {parsePolynom} from "../src/parser/buildLine";

describe('Graph', () => {
    test.skip('create a graph', () => {
        const graph = new Graph('virtualDom')

        console.log(graph)

        expect(true).toBe(true)
    })

    test('NUmeric expression of vertical asymptote', ()=>{
        const numexp = new NumExp('3x-2y+5=0')

        console.log(numexp.evaluate({x:3}))
    })

    test('extract coefficients', ()=>{
        console.log('3x+2y-5=0'.match(/[+-]?[0-9/]*x/g))
        console.log('3x-2y-5=0'.match(/[+-]?[0-9/]*y/g))
        console.log('3x-2/5y-5=0'.match(/[+-]?[0-9/]*y/g))
        console.log('3x-2/5y-5=0'.split(/([+-]?[0-9/]*x)([+-][0-9/]*y)/g))

        console.log('2/3x-5'.match(/^[-]?[0-9/]*/g))
        console.log('2/3x-5'.match(/^[-]?[0-9/]*/g))

        console.log('2x-5'.match(/[-]?[0-9/]*$/g))
        console.log('2x-5/3'.match(/[-]?[0-9/]*$/g))
        console.log('2x'.match(/[-]?[0-9/]*$/g))


    })
    test('parse polynom', ()=>{
        console.log(parsePolynom('3x+2y-5'));
        console.log(parsePolynom('3/2x+2/5y-5/7'));
    })
})