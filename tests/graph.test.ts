import { describe, test, expect } from 'vitest'
import { Graph } from '../lib/Graph'

describe('Graph', () => {
    test.skip('create a graph', () => {
        const graph = new Graph('virtualDom')

        console.log(graph)

        expect(true).toBe(true)
    })
})