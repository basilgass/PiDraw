import {describe, expect, test} from 'vitest'
import {PARSER_TYPE} from '../../src/parser/parser.common'
import {buildArc} from '../../src/figures/Arc/Arc.parser'
import {buildAxis} from '../../src/figures/Axis/Axis.parser'
import {buildBezier} from '../../src/figures/Bezier/Bezier.parser'
import {buildCircle} from '../../src/figures/Circle/Circle.parser'
import {buildFillBetween} from '../../src/figures/FillBetween/FillBetween.parser'
import {buildFollow} from '../../src/figures/Follow/Follow.parser'
import {buildGrid} from '../../src/figures/Grid/Grid.parser'
import {buildLine} from '../../src/figures/Line/Line.parser'
import {buildParametric} from '../../src/figures/Parametric/Parametric.parser'
import {buildPath} from '../../src/figures/Path/Path.parser'
import {buildPlot} from '../../src/figures/Plot/Plot.parser'
import {buildIntersection, buildPoint} from '../../src/figures/Point/Point.parser'
import {buildPolygon} from '../../src/figures/Polygon/Polygon.parser'
import {buildRiemann} from '../../src/figures/Riemann/Riemann.parser'
import {PARSER_CONFIG} from '../../src/parser/parser.config'
import type {BuildResult} from '../../src/parser/parser.types'

describe('PARSER_CONFIG', () => {
    test('has an entry for each key of the syntax', () => {
        const missing = Object.values(PARSER_TYPE).filter(key => !Object.hasOwn(PARSER_CONFIG, key))

        expect(missing).toEqual([])
    })

    test('has no entry that is not a key of the syntax', () => {
        const keys: string[] = Object.values(PARSER_TYPE)
        const unknown = Object.keys(PARSER_CONFIG).filter(key => !keys.includes(key))

        expect(unknown).toEqual([])
    })

    test.each(Object.entries(PARSER_CONFIG))('%s builds with a function', (_, item) => {
        expect(item.build).toBeTypeOf('function')
    })
})

describe('BuildResult', () => {
    test('the figure to create is a kind the graph can make', () => {
        const point: BuildResult<unknown> = {create: 'point', config: {}}
        // @ts-expect-error : 'pt' is a key of the syntax, the graph makes a 'point'
        const key: BuildResult<unknown> = {create: 'pt', config: {}}

        expect(point.create).toBe('point')
        expect(key.create).toBe('pt')
    })
})

describe('documentation of the entries', () => {
    test.each(Object.entries(PARSER_CONFIG))('%s has a name, a description, forms and a summary', (_, item) => {
        expect(item.name.trim()).not.toBe('')
        expect(item.description.trim()).not.toBe('')
        expect(item.forms.length).toBeGreaterThan(0)
        expect(item.forms.every(form => form.trim() !== '')).toBe(true)
        expect(item.summary.trim()).not.toBe('')
    })

    test.each(Object.entries(PARSER_CONFIG))('the summary of %s shows its key', (key, item) => {
        expect(item.summary).toContain(`=${key} `)
    })

    test('two keys never show the same form', () => {
        const forms = Object.values(PARSER_CONFIG).flatMap(item => item.forms)

        expect(new Set(forms).size).toBe(forms.length)
    })

    test('an entry has nothing but its build, what documents it and the fields of its label', () => {
        for (const item of Object.values(PARSER_CONFIG)) {
            expect(Object.keys(item).filter(key => key !== 'labelFields').sort()).toEqual(['build', 'description', 'forms', 'name', 'summary'])
        }
    })

    test('the fields of the label of an entry are not written twice', () => {
        for (const item of Object.values(PARSER_CONFIG)) {
            const fields = item.labelFields ?? []

            expect(new Set(fields).size).toBe(fields.length)
        }
    })
})

describe('the parser of each kind of figure', () => {
    const POINTS = [PARSER_TYPE.POINT, PARSER_TYPE.VECTOR_POINT, PARSER_TYPE.DIRECTION_POINT, PARSER_TYPE.MIDDLE, PARSER_TYPE.PROJECTION, PARSER_TYPE.SYMMETRY, PARSER_TYPE.EVAL_FX]
    const LINES = [PARSER_TYPE.LINE, PARSER_TYPE.VECTOR, PARSER_TYPE.SEGMENT, PARSER_TYPE.RAY, PARSER_TYPE.PERPENDICULAR, PARSER_TYPE.PARALLEL, PARSER_TYPE.MEDIATOR, PARSER_TYPE.TANGENT, PARSER_TYPE.BISECTOR]

    test.each(POINTS)('%s is built by buildPoint', (key) => {
        expect(PARSER_CONFIG[key].build).toBe(buildPoint)
    })

    test.each(LINES)('%s is built by buildLine', (key) => {
        expect(PARSER_CONFIG[key].build).toBe(buildLine)
    })

    test.each([
        [PARSER_TYPE.INTERSECTION, buildIntersection],
        [PARSER_TYPE.CIRCLE, buildCircle],
        [PARSER_TYPE.ARC, buildArc],
        [PARSER_TYPE.PLOT, buildPlot],
        [PARSER_TYPE.PARAMETRIC, buildParametric],
        [PARSER_TYPE.BEZIER, buildBezier],
        [PARSER_TYPE.POLYGON, buildPolygon],
        [PARSER_TYPE.FOLLOW, buildFollow],
        [PARSER_TYPE.FILL_BETWEEN, buildFillBetween],
        [PARSER_TYPE.RIEMANN, buildRiemann],
        [PARSER_TYPE.PATH, buildPath],
        [PARSER_TYPE.GRID, buildGrid],
        [PARSER_TYPE.AXIS, buildAxis]
    ])('%s is built by its own parser', (key, build) => {
        expect(PARSER_CONFIG[key].build).toBe(build)
    })
})
