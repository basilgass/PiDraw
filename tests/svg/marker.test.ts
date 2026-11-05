import {describe, expect, test} from 'vitest'
import type {Marker, Svg} from '@svgdotjs/svg.js'
import {createMarker} from '../../src/svg/marker'

// svg.js needs a DOM, which the tests do not have: this stand-in only keeps the markers by id, like the document does.
function fakeSvg() {
    const markers = new Map<string, FakeMarker>()
    let created = 0

    class FakeMarker {
        attrs: Record<string, unknown> = {}

        attr(attributes: Record<string, unknown>) {
            Object.assign(this.attrs, attributes)
            markers.set(String(attributes.id), this)
            return this
        }
    }

    // The markers are looked for in the defs, not in the whole svg, which holds every figure.
    const defs = {
        findOne: (selector: string) => {
            // A selector with a special character would be rejected by the browser.
            expect(selector).toMatch(/^#[\w-]+$/)
            return markers.get(selector.slice(1)) ?? null
        }
    }

    const svg = {
        defs: () => defs,
        findOne: () => {
            throw new Error('the whole svg must not be searched')
        },
        marker: (_width: number, _height: number, build: (add: unknown) => void) => {
            created++
            build({path: () => ({stroke: () => undefined})})
            return new FakeMarker()
        }
    }

    return {svg: svg as unknown as Svg, created: () => created, ids: () => [...markers.keys()]}
}

describe('createMarker', () => {
    test.each(['->', 'x', '|'])('the %s marker is created once and reused', (shape) => {
        const {svg, created} = fakeSvg()

        const first = createMarker(svg, 'line1', 10, shape)
        const second = createMarker(svg, 'line1', 10, shape)

        expect(second).toBe(first)
        expect(created()).toBe(1)
    })

    test('the shape, the scale and the figure give different markers', () => {
        const {svg, created, ids} = fakeSvg()

        const markers = new Set<Marker>([
            createMarker(svg, 'line1', 10, '->'),
            createMarker(svg, 'line1', 10, 'x'),
            createMarker(svg, 'line1', 10, '|'),
            createMarker(svg, 'line1', 20, '->'),
            createMarker(svg, 'line2', 10, '->'),
        ])

        expect(markers.size).toBe(5)
        expect(created()).toBe(5)
        expect(new Set(ids()).size).toBe(5)
    })

    test('the id of the marker is a safe css identifier even for an unusual figure name', () => {
        const {svg, ids} = fakeSvg()

        createMarker(svg, 'axis-0.5--1', 10)
        createMarker(svg, 'my figure#1', 10, '|')

        for (const id of ids()) {
            expect(id).toMatch(/^[\w-]+$/)
        }
    })
})
