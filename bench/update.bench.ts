import {test} from 'vitest'
import {Draw} from '../src/Draw/Draw'
import type {AbstractFigure} from '../src/figures/AbstractFigure/AbstractFigure'
import {Point} from '../src/figures/Point/Point'
import {countCreatedNodes, createContainer, useDocument} from '../tests/helpers/graph'

// How much work an update does when one point is moved. The counts are what to trust: the time under svgdom is not the time of a
// browser, it only compares one version of the code with another. Run with `npm run bench`.

useDocument()
const created = countCreatedNodes()

/** Groups of figures that do not depend on each other: three points, two segments and a circle through the points. */
function code(groups: number): string {
    const lines: string[] = []

    for (let i = 0; i < groups; i++) {
        const x = (i % 10) * 1.5 - 7
        const y = Math.floor(i / 10) * 0.5 - 6

        lines.push(
            `A${i}=pt ${x},${y}`,
            `B${i}=pt ${x + 1},${y}`,
            `C${i}=pt ${x},${y + 1}`,
            `s${i}=seg A${i},B${i}`,
            `t${i}=seg B${i},C${i}`,
            `c${i}=circ A${i},B${i},C${i}`
        )
    }

    return lines.join('\n')
}

interface Counters { computed: number, updateLabel: number }

/** Count the calls to `computed` and `updateLabel` of every figure, from now on. */
function instrument(figures: AbstractFigure[], counters: Counters): void {
    for (const figure of figures) {
        const own = figure as unknown as Record<'computed' | 'updateLabel', () => unknown>

        for (const method of ['computed', 'updateLabel'] as const) {
            const original = own[method]

            own[method] = function (this: unknown) {
                counters[method]++

                return original.call(this)
            }
        }
    }
}

/** How many nodes the svg holds. */
function nodes(node: { childNodes?: ArrayLike<unknown> }): number {
    return Array.from(node.childNodes ?? []).reduce<number>((sum, child) => sum + 1 + nodes(child as { childNodes?: ArrayLike<unknown> }), 0)
}

interface Scenario {
    name: string

    run(): void
}

function build(groups: number, labels: boolean) {
    const draw = new Draw(createContainer(), {code: code(groups), ...(labels ? {parameters: 'default.label'} : {})})
    const figures = Object.values(draw.graph.figures)

    // `Draw` keeps going when a line is wrong: do not measure a graph that is not the one that was asked for.
    if (figures.length !== groups * 6) {
        throw new Error(`Expected ${groups * 6} figures, found ${figures.length}`)
    }

    const counters: Counters = {computed: 0, updateLabel: 0}
    instrument(figures, counters)

    const moved = draw.graph.figures.A0 as Point
    moved.isDraggable = true
    let step = 0

    const scenarios: Scenario[] = [
        {
            name: 'one point moved',
            run() {
                step++
                moved.pixels = {x: moved.pixels.x + (step % 2 === 0 ? -5 : 5), y: moved.pixels.y}
                draw.graph.update([moved])
            }
        },
        {name: 'update of the whole graph', run: () => { draw.graph.update() }},
        {name: 'forced update', run: () => { draw.graph.update(undefined, true) }},
        {name: 'layout drawn again', run: () => { draw.graph.updateLayout() }},
        {name: 'decor drawn again, figures not updated', run: () => { (draw.graph as unknown as { _makeLayout(): unknown })._makeLayout() }}
    ]

    return {draw, figures, counters, scenarios}
}

/** The median time of a scenario, in milliseconds, after a few runs to warm up. */
function median(run: () => void): number {
    for (let i = 0; i < WARM_UP; i++) {
        run()
    }

    const times: number[] = []

    for (let i = 0; i < RUNS; i++) {
        const start = performance.now()
        run()
        times.push(performance.now() - start)
    }

    return times.sort((a, b) => a - b)[Math.floor(RUNS / 2)]
}

/** The rows as a table of markdown, to keep with the notes of the measure. */
function markdown(rows: Record<string, string | number>[]): string {
    const keys = Object.keys(rows[0])

    return [
        `| ${keys.join(' | ')} |`,
        `|${keys.map(() => '---').join('|')}|`,
        ...rows.map(row => `| ${keys.map(key => row[key]).join(' | ')} |`)
    ].join('\n')
}

const SIZES = [50, 200]
const WARM_UP = 3
const RUNS = 15

test('how much work an update does', () => {
    const rows: Record<string, string | number>[] = []

    for (const groups of SIZES) {
        for (const labels of [false, true]) {
            const {draw, figures, counters, scenarios} = build(groups, labels)

            for (const scenario of scenarios) {
                const before = {created: created(), nodes: nodes(draw.graph.rootSVG.node)}

                counters.computed = 0
                counters.updateLabel = 0
                scenario.run()

                rows.push({
                    figures: figures.length,
                    labels: labels ? 'yes' : 'no',
                    scenario: scenario.name,
                    'computed()': counters.computed,
                    'updateLabel()': counters.updateLabel,
                    'nodes created': created() - before.created,
                    'nodes in svg': nodes(draw.graph.rootSVG.node),
                    'median ms': Number(median(() => { scenario.run() }).toFixed(2))
                })
            }
        }
    }

    console.log(markdown(rows))
}, 600_000)

test('how much work drawing the code again does', () => {
    const rows: Record<string, string | number>[] = []

    for (const groups of SIZES) {
        const source = code(groups)
        const lines = source.split('\n')

        /** The code with a width added to a line: another value each time, so that the line is not the same as in the last drawing. */
        const changed = (index: number, step: number) => lines.map((line, i) => i === index ? `${line}->w=${1 + (step % 2)}` : line).join('\n')

        const scenarios: { name: string, run(draw: Draw, step: number): void }[] = [
            {name: 'a new drawing of the code', run: () => { new Draw(createContainer(), {code: source}) }},
            {name: 'the same code', run: (draw) => { draw.refresh(source) }},
            {name: 'the last line changed', run: (draw, step) => { draw.refresh(changed(lines.length - 1, step)) }},
            {name: 'a line in the middle changed', run: (draw, step) => { draw.refresh(changed(Math.floor(lines.length / 2), step)) }},
            {name: 'the first line changed', run: (draw, step) => { draw.refresh(changed(0, step)) }}
        ]

        for (const scenario of scenarios) {
            const draw = new Draw(createContainer(), {code: source})
            let step = 0
            const run = () => { scenario.run(draw, ++step) }
            const before = created()

            run()
            const makes = created() - before

            rows.push({
                figures: groups * 6,
                scenario: scenario.name,
                'nodes created': makes,
                'median ms': Number(median(run).toFixed(2))
            })
        }
    }

    console.log(markdown(rows))
}, 600_000)
