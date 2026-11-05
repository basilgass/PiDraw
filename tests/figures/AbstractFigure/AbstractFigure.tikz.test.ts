import {describe, expect, test} from 'vitest'
import {InvalidArgumentError, NotImplementedError} from '../../../src/errors'
import {
    tikzAxis,
    tikzColor,
    tikzCoordinates,
    tikzLabelNode,
    tikzLabelText,
    tikzLength,
    tikzNumber,
    tikzRadius,
    tikzSamples,
    TIKZ_PREAMBLE,
    tikzPicture,
    tikzStyle,
    tikzUnits,
    tikzView
} from '../../../src/figures/AbstractFigure/AbstractFigure.tikz'
import {graphConfig} from '../../helpers/figure'

// The graph of the tests: 800 x 600 pixels, 50 pixels per unit, the origin in the middle.
const graph = graphConfig()
const appearance = {stroke: {color: 'black', width: 1, opacity: 1}, fill: {color: 'transparent', opacity: 1}}
const none = {start: null, end: null}

describe('tikzNumber', () => {
    test('is rounded to the thousandth, without trailing zeros', () => {
        expect(tikzNumber(1.23456)).toBe('1.235')
        expect(tikzNumber(2)).toBe('2')
        expect(tikzNumber(0.5, 5)).toBe('0.5')
    })
})

describe('tikzLength', () => {
    test('is a length in points: a pixel is 0.75 pt', () => {
        expect(tikzLength(10)).toBe('7.5pt')
    })
})

describe('tikzColor', () => {
    test.each(['red', 'Teal', ' blue '])('the name %s of xcolor needs no definition', (name) => {
        expect(tikzColor(name)).toEqual({name: name.trim().toLowerCase(), definition: null})
    })

    test.each([['#f00', 'ff0000'], ['#1A2b3C', '1a2b3c'], ['rgb(255, 0, 16)', 'ff0010']])('%s is defined as pidraw-%s', (value, hex) => {
        expect(tikzColor(value)).toEqual({name: `pidraw-${hex}`, definition: `\\definecolor{pidraw-${hex}}{HTML}{${hex.toUpperCase()}}`})
    })

    test.each(['transparent', 'none'])('%s paints nothing', (value) => {
        expect(tikzColor(value)).toBeNull()
    })

    test.each(['salmon', '#12', 'rgb(256, 0, 0)'])('%s has no equivalent: InvalidArgumentError', (value) => {
        expect(() => tikzColor(value)).toThrow(InvalidArgumentError)
    })
})

describe('tikzCoordinates, tikzUnits, tikzView', () => {
    test('a position in pixels is in units of the coordinate system', () => {
        expect(tikzCoordinates({x: 500, y: 250}, graph)).toBe('2,1')
    })

    test('the units are the length of one unit of each axis', () => {
        expect(tikzUnits(graph)).toEqual({x: '37.5pt', y: '37.5pt'})
    })

    test('the view is what the drawing shows, in units', () => {
        expect(tikzView(graph)).toEqual({x: [-8, 8], y: [-6, 6]})
    })
})

describe('tikzRadius', () => {
    test('is in units of the coordinate system', () => {
        expect(tikzRadius(100, graph)).toBe('radius=2')
    })

    test('has a radius for each axis when the scales differ', () => {
        expect(tikzRadius(100, graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}}))).toBe('x radius=1, y radius=2')
    })
})

describe('tikzSamples', () => {
    test('is four times the intervals, with a minimum and a maximum', () => {
        expect(tikzSamples(10)).toBe(41)
        expect(tikzSamples(0)).toBe(2)
        expect(tikzSamples(10000)).toBe(1000)
    })
})

describe('tikzAxis', () => {
    test('is a pgfplots axis with the units of the graph around the content', () => {
        const lines = tikzAxis(graph, ['\\addplot {x};'])

        expect(lines[0]).toMatch(/^\\begin\{axis\}\[hide axis, scale only axis,.*x=37\.5pt, y=37\.5pt,.*xmin=-8, xmax=8, ymin=-6, ymax=6\]$/)
        expect(lines.slice(1)).toEqual(['\\addplot {x};', '\\end{axis}'])
    })

    test('restricts the values that are kept', () => {
        expect(tikzAxis(graph, [], {y: [-2, 2]})[0]).toContain('restrict y to domain=-2:2')
    })
})

describe('tikzStyle', () => {
    test('writes the stroke, with the width in points', () => {
        expect(tikzStyle({...appearance, stroke: {color: 'red', width: 2, opacity: 1}}, null, none).options)
            .toEqual(['draw=red', 'line width=1.5pt'])
    })

    test('writes the opacities and the fill', () => {
        const {options} = tikzStyle({stroke: {color: 'red', width: 1, opacity: 0.5}, fill: {color: 'green', opacity: 0.25}}, null, none)

        expect(options).toEqual(['draw=red', 'line width=0.75pt', 'draw opacity=0.5', 'fill=green', 'fill opacity=0.25'])
    })

    test('a stroke that paints nothing is draw=none, without a width', () => {
        expect(tikzStyle({...appearance, stroke: {color: 'none', width: 3, opacity: 1}}, null, none).options).toEqual(['draw=none'])
    })

    test('collects the definitions of the colors that need one', () => {
        const {definitions} = tikzStyle({...appearance, stroke: {color: '#ff0000', width: 1, opacity: 1}}, null, none)

        expect(definitions).toEqual(['\\definecolor{pidraw-ff0000}{HTML}{FF0000}'])
    })

    test('a pattern of dashes is in points, and repeated when it has an odd number of lengths', () => {
        expect(tikzStyle(appearance, '4 8', none).options).toContain('dash pattern=on 3pt off 6pt')
        expect(tikzStyle(appearance, '4', none).options).toContain('dash pattern=on 3pt off 3pt')
    })

    test('the markers are the tips at the start and at the end', () => {
        expect(tikzStyle(appearance, null, {start: null, end: '->'}).options).toContain('->')
        expect(tikzStyle(appearance, null, {start: '->', end: null}).options).toContain('<-')
        expect(tikzStyle(appearance, null, {start: '|', end: '|'}).options).toContain('|-|')
    })
})

describe('tikzLabelText', () => {
    test('a formula is put between dollars', () => {
        expect(tikzLabelText('A_1', true)).toBe('$A_1$')
    })

    test('a formula that has dollars already is left as it is', () => {
        expect(tikzLabelText('x $y$', true)).toBe('x $y$')
    })

    test('a text is left as it is', () => {
        expect(tikzLabelText('A1', false)).toBe('A1')
    })
})

describe('tikzLabelNode', () => {
    const config = {alignement: 'br', offset: {x: 0, y: 0}, rotate: 0} as const

    test('is a node anchored on the side that the alignment says', () => {
        expect(tikzLabelNode(config, '1,2', 'A')).toBe('\\node[below right] at (1,2) {A};')
        expect(tikzLabelNode({...config, alignement: 'tc'}, '0,0', 'A')).toBe('\\node[above] at (0,0) {A};')
        expect(tikzLabelNode({...config, alignement: 'mc'}, '0,0', 'A')).toBe('\\node at (0,0) {A};')
    })

    test('the offset is in points and the rotation counterclockwise', () => {
        expect(tikzLabelNode({...config, offset: {x: 4, y: -8}, rotate: 30}, '0,0', 'A'))
            .toBe('\\node[below right, xshift=3pt, yshift=-6pt, rotate=-30] at (0,0) {A};')
    })
})

describe('tikzPicture', () => {
    test('has the unit of each axis, the size of the window and the commands of the figures cut to it', () => {
        expect(tikzPicture(graph, ['\\draw (0,0) -- (1,1);', '\\node at (2,2) {a};'])).toBe([
            '\\begin{tikzpicture}[x=37.5pt, y=37.5pt]',
            '\\path (-8,-6) rectangle (8,6);',
            '\\begin{scope}',
            '\\clip (-8,-6) rectangle (8,6);',
            '\\draw (0,0) -- (1,1);',
            '\\node at (2,2) {a};',
            '\\end{scope}',
            '\\end{tikzpicture}'
        ].join('\n'))
    })

    test('has the window of the part of the coordinate system that the drawing shows', () => {
        const moved = graphConfig({origin: {x: 100, y: 500}})

        expect(tikzPicture(moved, ['\\draw (0,0);'])).toContain('\\path (-2,-2) rectangle (14,10);')
    })

    test('is only the window without a figure', () => {
        expect(tikzPicture(graph, [])).toBe('\\begin{tikzpicture}[x=37.5pt, y=37.5pt]\n\\path (-8,-6) rectangle (8,6);\n\\end{tikzpicture}')
    })

    test('leaves out the figures that write nothing', () => {
        expect(tikzPicture(graph, ['', '\\draw (0,0);', ''])).toBe(tikzPicture(graph, ['\\draw (0,0);']))
    })

    test('does not cut a pgfplots axis, and cuts the commands before it, after it, and between two of them', () => {
        const axis = '\\begin{axis}[hide axis]\n\\end{axis}'
        const picture = tikzPicture(graph, ['\\draw (1);', '\\draw (2);', axis, '\\draw (3);', axis, axis])

        expect(picture.split('\n')).toEqual([
            '\\begin{tikzpicture}[x=37.5pt, y=37.5pt]',
            '\\path (-8,-6) rectangle (8,6);',
            '\\begin{scope}', '\\clip (-8,-6) rectangle (8,6);', '\\draw (1);', '\\draw (2);', '\\end{scope}',
            '\\begin{axis}[hide axis]', '\\end{axis}',
            '\\begin{scope}', '\\clip (-8,-6) rectangle (8,6);', '\\draw (3);', '\\end{scope}',
            '\\begin{axis}[hide axis]', '\\end{axis}',
            '\\begin{axis}[hide axis]', '\\end{axis}',
            '\\end{tikzpicture}'
        ])
    })

    test.each([
        ['a y axis that is not vertical', {y: {x: 25, y: -50}}],
        ['a x axis that is not horizontal', {x: {x: 50, y: 5}}],
        ['a x axis that goes to the left', {x: {x: -50, y: 0}}],
        ['a y axis that goes down', {y: {x: 0, y: 50}}]
    ])('refuses %s', (_, change) => {
        const config = graphConfig({axis: {x: {x: 50, y: 0}, y: {x: 0, y: -50}, ...change}})

        expect(() => tikzPicture(config, [])).toThrow(NotImplementedError)
    })

    test('refuses a drawing that TeX cannot hold, which would fail with Dimension too large', () => {
        const wide = graphConfig({width: 25000, height: 600})

        expect(() => tikzPicture(wide, [])).toThrow(InvalidArgumentError)
        expect(() => tikzPicture(graphConfig({width: 800, height: 25000}), [])).toThrow(InvalidArgumentError)
    })
})

describe('TIKZ_PREAMBLE', () => {
    test('has the packages and the libraries that the figures need', () => {
        expect(TIKZ_PREAMBLE.split('\n')).toEqual([
            '\\usepackage{tikz}',
            '\\usepackage{pgfplots}',
            '\\pgfplotsset{compat=1.18}',
            '\\usetikzlibrary{arrows.meta}',
            '\\usepgfplotslibrary{fillbetween}'
        ])
    })
})
