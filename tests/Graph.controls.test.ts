import {beforeAll, describe, expect, test, vi} from 'vitest'
import type {IGraphController} from '../src/Graph.types'
import {createGraph, useDocument} from './helpers/graph'

beforeAll(useDocument)

function controller(onControlsChanged = vi.fn()): IGraphController {
    return {dispose: vi.fn(), onControlsChanged}
}

describe('Graph controls', () => {
    test('a graph has none by default', () => {
        expect(createGraph().graph.controls).toEqual({})
    })

    test('keeps what a theme gives it, and gives it up with null', () => {
        const {graph} = createGraph()

        graph.setControl('titles', {2: 'Second'})
        expect(graph.controls.titles).toEqual({2: 'Second'})

        graph.setControl('titles', null)
        expect(graph.controls).toEqual({})
        expect(Object.hasOwn(graph.controls, 'titles')).toBe(false)
    })

    test('returns the graph, to chain', () => {
        const {graph} = createGraph()

        expect(graph.setControl('titles', {1: 'A'})).toBe(graph)
    })

    test('tells the attached controllers, with the name of the entry', () => {
        const {graph} = createGraph()
        const onControlsChanged = vi.fn()
        graph.attach(controller(onControlsChanged))

        graph.setControl('titles', {1: 'A'})
        graph.setControl('titles', null)

        expect(onControlsChanged).toHaveBeenCalledTimes(2)
        expect(onControlsChanged).toHaveBeenCalledWith('titles')
    })

    test('a controller without the hook is left alone', () => {
        const {graph} = createGraph()
        graph.attach({dispose: vi.fn()})

        expect(() => graph.setControl('titles', {1: 'A'})).not.toThrow()
    })

    test('dispose forgets them', () => {
        const {graph} = createGraph()
        graph.setControl('titles', {1: 'A'})

        graph.dispose()

        expect(graph.controls).toEqual({})
    })
})
