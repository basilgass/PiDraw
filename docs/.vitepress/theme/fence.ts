/**
 * The examples of the documentation are fenced blocks whose language is `pidraw`:
 *
 *     ```pidraw params="x=-1:6,y=-1:5,axis" errors="2"
 *     A(1,2)
 *     ```
 *
 * - `params` are the parameters of the graph (the first field of `PiDraw`);
 * - `errors` are the numbers of the lines of the block that are not valid, when the example is there to show it.
 *
 * The site draws such a block under its code; `npm run docs:check` builds it and compares the report with `errors`.
 */

export interface IExampleInfo {
    /** The parameters of the graph, empty for the default ones. */
    params: string
    /** The lines of the block that the example announces as not valid, in order. */
    errors: number[]
}

export interface IExampleBlock extends IExampleInfo {
    /** The code of the example. */
    code: string
    /** The line of the page where the code starts, from 1. */
    line: number
    /**
     * The TikZ that the page shows for the example: the `latex` block that follows it, if there is one. It is the output of `tikz()`, and
     * `npm run docs:check` says when it is not.
     */
    tikz?: string
}

/** A block of JavaScript of a page, which `npm run docs:check` runs (unless it is `js no-run`). */
export interface IScriptBlock {
    code: string
    /** The line of the page where the code starts, from 1. */
    line: number
    run: boolean
}

/** The attributes of the opening line of a block, or `null` if the block is not an example. */
export function parseInfo(info: string): IExampleInfo | null {
    const match = /^pidraw(?:\s+(.*))?$/.exec(info.trim())

    if (match === null) {
        return null
    }

    const attributes = new Map<string, string>()

    for (const [, name, value] of (match[1] ?? '').matchAll(/(\w+)="([^"]*)"/g)) {
        attributes.set(name, value)
    }

    const errors = (attributes.get('errors') ?? '')
        .split(',')
        .map(text => text.trim())
        .filter(text => text !== '')
        .map(Number)

    return {params: attributes.get('params') ?? '', errors}
}

/** The examples of a Markdown page, with the line where each one starts. */
export function blocksOf(markdown: string): IExampleBlock[] {
    const lines = markdown.split(/\r?\n/)
    const blocks: IExampleBlock[] = []

    for (let i = 0; i < lines.length; i++) {
        const open = /^(`{3,})\s*(.*)$/.exec(lines[i])

        if (open === null) {
            continue
        }

        let end = i + 1
        while (end < lines.length && !lines[end].startsWith(open[1])) {
            end++
        }

        const info = parseInfo(open[2])

        if (info !== null) {
            blocks.push({...info, code: lines.slice(i + 1, end).join('\n'), line: i + 2, ...followingTikz(lines, end + 1)})
        }

        i = end
    }

    return blocks
}

/** The `latex` block that comes next, after empty lines only. */
function followingTikz(lines: string[], from: number): { tikz?: string } {
    let next = from

    while (next < lines.length && lines[next].trim() === '') {
        next++
    }

    const open = /^(`{3,})\s*latex\s*$/.exec(lines[next] ?? '')

    if (open === null) {
        return {}
    }

    let end = next + 1
    while (end < lines.length && !lines[end].startsWith(open[1])) {
        end++
    }

    return {tikz: lines.slice(next + 1, end).join('\n')}
}

/** The `js` blocks of a Markdown page. */
export function scriptsOf(markdown: string): IScriptBlock[] {
    const lines = markdown.split(/\r?\n/)
    const blocks: IScriptBlock[] = []

    for (let i = 0; i < lines.length; i++) {
        const open = /^(`{3,})\s*(\w*)\s*(.*)$/.exec(lines[i])

        if (open === null) {
            continue
        }

        let end = i + 1
        while (end < lines.length && !lines[end].startsWith(open[1])) {
            end++
        }

        if (open[2] === 'js') {
            blocks.push({code: lines.slice(i + 1, end).join('\n'), line: i + 2, run: !/\bno-run\b/.test(open[3])})
        }

        i = end
    }

    return blocks
}

/**
 * The lines written in the blocks of a page that have no language: the syntax that a page lists (`c=circ A,B,C,*`). A line with a placeholder
 * (`<expression>`) is not a line of code, and is left out.
 */
export function listedLines(markdown: string): string[] {
    const lines = markdown.split(/\r?\n/)
    const listed: string[] = []

    for (let i = 0; i < lines.length; i++) {
        const open = /^(`{3,})\s*(.*)$/.exec(lines[i])

        if (open === null) {
            continue
        }

        let end = i + 1
        while (end < lines.length && !lines[end].startsWith(open[1])) {
            end++
        }

        if (open[2] === '') {
            listed.push(...lines.slice(i + 1, end).map(line => line.trim()).filter(line => line !== '' && !line.includes('<')))
        }

        i = end
    }

    return listed
}
