/**
 * Builds the examples of the documentation (`docs/**\/*.md`, the ```pidraw blocks) with the library, and fails when an example does not say
 * what the page claims. Run it with `npm run docs:check`.
 *
 * - An example has no problem in its report, unless the block announces them (`errors="2,4"`: the lines of the block, in order).
 * - Its parameters (`params="..."`) are valid.
 * - Every kind of figure, every option and every parameter of the graph has at least one example: what is missing is listed.
 * - Every form of syntax that a page lists, and every result written in a comment of a `js` block, is built or compared.
 *
 * The examples run under `svgdom`, like the tests: the check says that a block builds, not how it looks.
 */
import fs from 'node:fs'
import path from 'node:path'
import util from 'node:util'
import {beforeAll, describe, expect, test} from 'vitest'
import {Animate} from '../src/animate/Animate'
import {Zoom} from '../src/zoom/Zoom'
import {Slides} from '../src/slides/Slides'
import {Draw} from '../src/Draw/Draw'
import {optionNames} from '../src/Draw/Draw.options'
import {LAYOUT_KEYS} from '../src/parser/buildLayout'
import {PARSER_COLOR_VALUES} from '../src/parser/parser.common'
import {PARSER_CONFIG} from '../src/parser/parser.config'
import {basic_examples} from '../demo/parsing_examples/basic_examples'
import {controlsDemos} from '../docs/.vitepress/theme/controlsDemos'
import {PiParse} from 'piparser'
import {standardForm} from '../src/Draw/Draw.lines'
import * as library from '../src/index'
import {blocksOf, type IExampleBlock, listedLines, scriptsOf} from '../docs/.vitepress/theme/fence'
import {createContainer, useDocument} from '../tests/helpers/graph'

const docs = path.resolve(import.meta.dirname, '../docs')

/** The pages of the documentation: not the generated reference, the site files or the fragments. */
function pages(dir: string): string[] {
    return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const full = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            return ['.vitepress', 'public', 'node_modules', '_generated'].includes(entry.name) ? [] : pages(full)
        }

        return entry.name.endsWith('.md') ? [full] : []
    })
}

interface IExample extends IExampleBlock {
    /** `file:line`, as an editor opens it. */
    where: string
}

const examples: IExample[] = pages(docs).flatMap((file) => {
    const name = path.relative(path.dirname(docs), file).replace(/\\/g, '/')

    return blocksOf(fs.readFileSync(file, 'utf8')).map(block => ({...block, where: `${name}:${block.line}`}))
})

/** The shape of a line of code: its key, its number of values, and `*` if it ends with the alternative form. `null` if it is not a figure. */
function formOf(item: { key?: string, values: unknown[] }): string | null {
    const key = item.key

    if (key === undefined || !Object.hasOwn(PARSER_CONFIG, key)) {
        return null
    }

    return `${key}/${item.values.length}${item.values.at(-1) === '*' ? '*' : ''}`
}

/** What an example made: the lines of its report that are not valid, and what it uses. */
interface IResult {
    layoutError: string | null
    errors: number[]
    keys: string[]
    options: string[]
    parameters: string[]
    forms: string[]
}

const results = new Map<IExample, IResult>()

/** The names of the entries of the parameters of the graph, without their options (what follows `->` up to `,,`). */
function parameterNames(params: string): string[] {
    const names: string[] = []
    let inOptions = false

    for (const entry of params.split(',')) {
        if (inOptions) {
            inOptions = entry !== ''
            continue
        }

        const name = /^\s*([\w.]+)/.exec(entry)?.[1]

        if (name !== undefined) {
            names.push(name)
        }

        inOptions = entry.includes('->')
    }

    return names
}

function run(example: IExample): IResult {
    const known = results.get(example)

    if (known !== undefined) {
        return known
    }

    const draw = new Draw(createContainer(), {code: example.code, parameters: example.params})
    const items = draw.code

    const result = {
        layoutError: draw.layoutError?.message ?? null,
        errors: draw.errors.map(error => error.line),
        keys: items.map(item => item.key),
        options: items.flatMap(item => Object.keys(item.parameters)),
        parameters: parameterNames(example.params),
        forms: items.map(formOf).filter(form => form !== null)
    }

    results.set(example, result)
    draw.graph.dispose()

    return result
}

beforeAll(() => {
    useDocument()
})

describe('examples of the documentation', () => {
    test.each(examples.map(example => [example.where, example] as const))('%s', (_, example) => {
        const result = run(example)

        expect(result.layoutError, 'the parameters of the graph').toBeNull()
        expect(result.errors, 'the lines of the example that are not valid').toEqual(example.errors)
    })
})

describe('TikZ shown in the documentation', () => {
    const shown = examples.filter(example => example.tikz !== undefined)

    test.each(shown.map(example => [example.where, example] as const))('%s', (_, example) => {
        const draw = new Draw(createContainer(), {code: example.code, parameters: example.params})

        expect(draw.graph.tikz().trim(), 'the page shows another TikZ than the one the library writes').toBe((example.tikz ?? '').trim())
        draw.graph.dispose()
    })
})

// ── the JavaScript blocks ────────────────────────────────────────────────────

interface IScript {
    where: string
    code: string
    line: number
    name: string
}

const scripts: IScript[] = pages(docs).flatMap((file) => {
    const name = path.relative(path.dirname(docs), file).replace(/\\/g, '/')

    return scriptsOf(fs.readFileSync(file, 'utf8')).filter(block => block.run).map(block => ({where: `${name}:${block.line}`, code: block.code, line: block.line, name}))
})

const STATEMENT = /^\s*(const|let|var|function|class|import|export|if|for|while|return|throw|try|catch|switch|else|\}|\{)\b/

function balanced(text: string): boolean {
    let depth = 0

    // The brackets inside a string literal do not count.
    for (const character of text.replace(/'[^']*'|"[^"]*"/g, '')) {
        depth += '([{'.includes(character) ? 1 : ')]}'.includes(character) ? -1 : 0
    }

    return depth === 0
}

/** Rewrite a block so that each expression that has a result in a comment is compared with it (`expr // result`, `expr // throws ParseError`). */
function prepare(script: IScript): string {
    return script.code.split('\n').map((text, index) => {
        const at = text.indexOf(' // ')

        if (at === -1) {
            return text
        }

        const expression = text.slice(0, at).trim()
        const expected = text.slice(at + 4).trim()

        if (expression === '' || STATEMENT.test(expression) || !balanced(expression) || /[,{([]$|=>$/.test(expression)) {
            return text
        }

        return `;__check(${script.line + index}, () => (${expression.replace(/;$/, '')}), ${JSON.stringify(expected)})`
    }).join('\n')
}

const show = (value: unknown): string => typeof value === 'string' ? value : typeof value === 'object' && value !== null ? util.inspect(value, {breakLength: Infinity, depth: 4}) : String(value)

describe('JavaScript of the documentation', () => {
    test.each(scripts.map(script => [script.where, script] as const))('%s', async (_, script) => {
        const problems: string[] = []

        const check = (line: number, thunk: () => unknown, expected: string) => {
            const error = /^throws (\w+)$/.exec(expected)?.[1]
            let actual: string

            try {
                actual = show(thunk())
            } catch (thrown) {
                const name = (thrown as { constructor?: { name?: string } }).constructor?.name

                if (error === undefined || name !== error) {
                    problems.push(`${script.name}:${line}: expected ${error ?? expected}, got ${name}: ${(thrown as Error).message}`)
                }

                return
            }

            if (error !== undefined) {
                problems.push(`${script.name}:${line}: expected ${error} to be thrown, got ${actual}`)
            } else if (!/^e\.g\.(\s|$)/.test(expected) && actual !== expected) {
                problems.push(`${script.name}:${line}: expected ${expected}, got ${actual}`)
            }
        }

        const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (...names: string[]) => (...values: unknown[]) => Promise<void>
        // `with` gives the exports of the library, and a container to draw in, as free names: a `const` of the block shadows them.
        const body = new AsyncFunction('__module', '__check', 'console', `with (__module) {\n${prepare(script)}\n}`)

        await body({...library, container: createContainer()}, check, {log: (value: unknown) => value})

        expect(problems).toEqual([])
    })
})

describe('syntax listed in the pages', () => {
    test('every form that a page lists is built by an example', () => {
        const parser = new PiParse({formatter: standardForm, splitter: {main: '->', entry: ',', parameter: '/'}})
        const built = new Set(examples.flatMap(example => run(example).forms))
        const listed = new Map<string, string>()

        // The old reference (docs/parser.md) is not written for this check: it goes when the guide has taken over.
        for (const file of pages(path.join(docs, 'guide'))) {
            for (const line of listedLines(fs.readFileSync(file, 'utf8'))) {
                try {
                    const form = formOf(parser.parse(line))

                    if (form !== null && !listed.has(form)) {
                        listed.set(form, `${path.basename(file)}: ${line}`)
                    }
                } catch {
                    // Not a line of code: some text that a block shows.
                }
            }
        }

        const missing = [...listed].filter(([form]) => !built.has(form)).map(([form, where]) => `${form} (${where})`)

        expect(missing, 'forms that a page lists and no example builds').toEqual([])
    })
})

/**
 * The numbers of values that a form of the registry accepts: `<a>,<b>[,<c>]` is 2 to 3, `<a>,...` is 1 to `Infinity`. A value is optional when it is
 * written in brackets (`[,<c>]`, `[<a>,<b>]`) or marked with `?`.
 */
function valueRange(values: string): { min: number, max: number } {
    const tokens: { text: string, optional: boolean }[] = []
    let depth = 0
    let current = {text: '', optional: false}

    for (const char of values) {
        if (char === ',' ) {
            tokens.push(current)
            current = {text: '', optional: depth > 0}
            continue
        }

        if (char === '[') {
            current.optional ||= current.text === ''
            depth++
        } else if (char === ']') {
            depth--
        }

        current.text += char
    }

    tokens.push(current)

    const counted = tokens.filter(token => token.text.trim() !== '...')
    const unbounded = counted.length < tokens.length

    return {
        min: counted.filter(token => !token.optional && !token.text.includes('?')).length,
        max: unbounded ? Infinity : counted.length
    }
}

describe('syntax of the registry', () => {
    const parser = new PiParse({formatter: standardForm, splitter: {main: '->', entry: ',', parameter: '/'}})
    /** The forms the examples build: read when the first test runs, once the document exists. */
    const builtForms = () => new Set(examples.flatMap(example => run(example).forms))

    /** Does an example build a line of this key with a number of values in the range? */
    function builds(key: string, {min, max}: { min: number, max: number }): boolean {
        const built = builtForms()

        for (let count = min; count <= Math.min(max, min + 12); count++) {
            if (built.has(`${key}/${count}`) || built.has(`${key}/${count}*`)) {
                return true
            }
        }

        return false
    }

    test.each(Object.entries(PARSER_CONFIG).flatMap(([key, item]) => item.forms.map(form => [key, form] as const)))('%s: %s is built by an example', (key, form) => {
        const keyword = /^[A-Za-z_]\w*=([a-z]+)\s+(.*)$/.exec(form)

        if (keyword !== null) {
            expect(keyword[1], 'the key written in the form').toBe(key)
            expect(builds(key, valueRange(keyword[2])), 'no example builds this number of values').toBe(true)
            return
        }

        // `f(x)=<function>` and `f(t)=...` are shorthands with placeholders: their key is checked with the forms that name it.
        if (form.includes('<')) {
            return
        }

        const shape = formOf(parser.parse(form))

        expect(shape, 'the form is a line of code').not.toBeNull()
        expect(builtForms().has(shape ?? ''), 'no example builds this shorthand').toBe(true)
    })
})

describe('examples of the demo', () => {
    test.each(basic_examples.map(example => [example.name, example.code]))('%s', (_, code) => {
        const draw = new Draw(createContainer(), {code})

        expect(draw.errors.map(error => `${error.line}: ${error.message}`)).toEqual([])
        draw.graph.dispose()
    })
})

describe('demos of the controls page', () => {
    test.each(controlsDemos.map(demo => [demo.name, demo] as const))('%s', (_, demo) => {
        const draw = new Draw(createContainer(), {code: demo.code, parameters: demo.parameters})

        expect(draw.layoutError).toBeNull()
        expect(draw.errors.map(error => `${error.line}: ${error.message}`)).toEqual([])
        const animated = new Animate(draw.graph).canBeAnimated()

        if (demo.zoom === undefined && demo.slides === undefined) {
            expect(animated, 'a demo with neither a zoom nor slides has an animation').toBe(true)
        }

        if (demo.zoom !== undefined) {
            const zoom = new Zoom(draw.graph, demo.zoom)

            expect(zoom.window.x.max).toBeGreaterThan(zoom.window.x.min)
        }

        if (demo.slides !== undefined) {
            expect(new Slides(draw.graph, demo.slides).count, 'a demo with slides has more than one step').toBeGreaterThan(1)
        }
        draw.graph.dispose()
    })

    test('each demo says what it shows', () => {
        controlsDemos.forEach((demo) => {
            expect(demo.about.trim()).not.toBe('')
        })
    })
})

describe('coverage of the documentation', () => {
    test('every figure, option and parameter has an example', () => {
        const used = examples.map(run)
        const keys = new Set(used.flatMap(result => result.keys))
        const options = new Set(used.flatMap(result => result.options))
        const parameters = new Set(used.flatMap(result => result.parameters))

        const missing = [
            ...Object.keys(PARSER_CONFIG).filter(key => !keys.has(key)).map(key => `figure ${key}`),
            ...optionNames().filter(option => !options.has(option)).map(option => `option ${option}`),
            ...(PARSER_COLOR_VALUES.some(color => options.has(color)) ? [] : ['option <color name>']),
            ...LAYOUT_KEYS.filter(key => !parameters.has(key)).map(key => `parameter ${key}`)
        ]

        const total = Object.keys(PARSER_CONFIG).length + optionNames().length + 1 + LAYOUT_KEYS.length

        console.log(`docs:check: ${examples.length} examples, coverage ${total - missing.length}/${total}${missing.length > 0 ? `\n  missing: ${missing.join(', ')}` : ''}`)

        expect(missing, 'figures, options and parameters that no example uses').toEqual([])
    })
})
