import {describe, expect, test} from 'vitest'
import {type PathCommand, parsePath, pathPieces, pathToString, transformPath} from '../../src/calculus'
import {ParseError} from '../../src/errors'
import type {XY} from '../../src/pidraw.common'

const ends = (commands: PathCommand[]): (XY | null)[] => commands.map(command => command.type === 'Z' ? null : command.p)

function near(actual: XY | null | undefined, expected: XY, digits = 6) {
    expect(actual?.x).toBeCloseTo(expected.x, digits)
    expect(actual?.y).toBeCloseTo(expected.y, digits)
}

describe('parsePath lines', () => {
    test('M, L and Z are the commands that they are', () => {
        expect(parsePath('M 10 20 L 30 40 Z')).toEqual([
            {type: 'M', p: {x: 10, y: 20}},
            {type: 'L', p: {x: 30, y: 40}},
            {type: 'Z'}
        ])
    })

    test('an empty path has no command', () => {
        expect(parsePath('')).toEqual([])
        expect(parsePath('   ')).toEqual([])
    })

    test('spaces and commas separate the numbers, and the signs do too', () => {
        const expected = [{type: 'M', p: {x: 1, y: -2}}, {type: 'L', p: {x: 3.5, y: 4}}]

        expect(parsePath('M1,-2L3.5,4')).toEqual(expected)
        expect(parsePath('M 1 -2 L 3.5 4')).toEqual(expected)
        expect(parsePath('M1-2L3.5 4')).toEqual(expected)
        expect(parsePath('  M 1 , -2   L 3.5 , 4  ')).toEqual(expected)
    })

    test('numbers can be written .5, 1e2, 2.', () => {
        expect(ends(parsePath('M .5 1e2 L 2. -1.5e-1'))).toEqual([{x: 0.5, y: 100}, {x: 2, y: -0.15}])
    })

    test('numbers without a space stick to the next dot: .5.5 is 0.5 and 0.5', () => {
        expect(ends(parsePath('M .5.5'))).toEqual([{x: 0.5, y: 0.5}])
    })

    test('the pairs after M are lines, and after m too', () => {
        expect(parsePath('M 0 0 1 1 2 2').map(command => command.type)).toEqual(['M', 'L', 'L'])
        expect(ends(parsePath('m 1 1 1 1 1 1'))).toEqual([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}])
    })

    test('a command can be repeated without writing it again', () => {
        expect(ends(parsePath('M 0 0 L 1 0 1 1 0 1'))).toEqual([{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}])
    })

    test('the relative commands are moved to where they are', () => {
        expect(ends(parsePath('M 10 10 l 5 0 l 0 5 l -5 0'))).toEqual([{x: 10, y: 10}, {x: 15, y: 10}, {x: 15, y: 15}, {x: 10, y: 15}])
    })

    test('H and V are lines, absolute or relative', () => {
        expect(ends(parsePath('M 1 1 H 5 V 4 h -2 v 1'))).toEqual([{x: 1, y: 1}, {x: 5, y: 1}, {x: 5, y: 4}, {x: 3, y: 4}, {x: 3, y: 5}])
    })

    test('Z goes back to the start of the piece, where a relative command then begins', () => {
        const commands = parsePath('M 5 5 L 10 5 L 10 10 z l 1 1')

        expect(commands.map(command => command.type)).toEqual(['M', 'L', 'L', 'Z', 'L'])
        near(commands[4]?.type === 'L' ? commands[4].p : null, {x: 6, y: 6})
    })

    test('a second M begins another piece, relative to the place where the last one stopped', () => {
        const commands = parsePath('M 0 0 L 4 0 m 1 1 L 9 9')

        expect(ends(commands)).toEqual([{x: 0, y: 0}, {x: 4, y: 0}, {x: 5, y: 1}, {x: 9, y: 9}])
    })
})

describe('parsePath curves', () => {
    test('C is a cubic curve, relative c too', () => {
        expect(parsePath('M 0 0 C 1 2 3 4 5 6')[1]).toEqual({type: 'C', c1: {x: 1, y: 2}, c2: {x: 3, y: 4}, p: {x: 5, y: 6}})
        expect(parsePath('M 1 1 c 1 2 3 4 5 6')[1]).toEqual({type: 'C', c1: {x: 2, y: 3}, c2: {x: 4, y: 5}, p: {x: 6, y: 7}})
    })

    test('S reflects the last control point of the curve before', () => {
        const [, first, second] = parsePath('M 0 0 C 0 2 4 2 4 0 S 8 -2 8 0')

        expect(first.type).toBe('C')
        expect(second).toEqual({type: 'C', c1: {x: 4, y: -2}, c2: {x: 8, y: -2}, p: {x: 8, y: 0}})
    })

    test('S begins at the current point when the command before is not a curve', () => {
        const [, , curve] = parsePath('M 1 1 L 2 2 S 5 5 6 6')

        expect(curve).toEqual({type: 'C', c1: {x: 2, y: 2}, c2: {x: 5, y: 5}, p: {x: 6, y: 6}})
    })

    test('Q is the cubic curve that has the same shape', () => {
        const [, curve] = parsePath('M 0 0 Q 3 6 6 0')

        expect(curve).toEqual({type: 'C', c1: {x: 2, y: 4}, c2: {x: 4, y: 4}, p: {x: 6, y: 0}})
    })

    test('T reflects the control point of the curve before', () => {
        const commands = parsePath('M 0 0 Q 3 6 6 0 T 12 0')
        const second = commands[2]

        // The control point of the second curve is (9, -6).
        expect(second).toEqual({type: 'C', c1: {x: 8, y: -4}, c2: {x: 10, y: -4}, p: {x: 12, y: 0}})
    })

    test('T begins at the current point when the command before is not a quadratic curve', () => {
        const commands = parsePath('M 0 0 T 6 0')

        expect(commands[1]).toEqual({type: 'C', c1: {x: 0, y: 0}, c2: {x: 2, y: 0}, p: {x: 6, y: 0}})
    })
})

describe('parsePath arcs', () => {
    // The distance of a point to a circle: 0 on it.
    const onCircle = (p: XY | null | undefined, center: XY, radius: number) =>
        Math.hypot((p?.x ?? NaN) - center.x, (p?.y ?? NaN) - center.y) - radius

    test('a quarter of a circle is a cubic curve that stays on the circle', () => {
        const [, arc] = parsePath('M 10 0 A 10 10 0 0 1 0 10')

        expect(parsePath('M 10 0 A 10 10 0 0 1 0 10')).toHaveLength(2)
        expect(arc.type).toBe('C')

        if (arc.type === 'C') {
            near(arc.p, {x: 0, y: 10})
            // The middle of the curve is on the circle, with the tolerance of the approximation of a quarter by a cubic curve.
            const middle = {
                x: (arc.c1.x * 3 + arc.c2.x * 3 + 10 + 0) / 8,
                y: (arc.c1.y * 3 + arc.c2.y * 3 + 0 + 10) / 8
            }

            expect(Math.abs(onCircle(middle, {x: 0, y: 0}, 10))).toBeLessThan(0.01)
        }
    })

    test('the controls of a quarter of a circle are at 0.5523 of the radius', () => {
        const [, arc] = parsePath('M 10 0 A 10 10 0 0 1 0 10')

        if (arc.type === 'C') {
            near(arc.c1, {x: 10, y: 5.5228}, 3)
            near(arc.c2, {x: 5.5228, y: 10}, 3)
        }
    })

    test('a half circle is two curves, a whole circle made of two arcs is four', () => {
        expect(parsePath('M 10 0 A 10 10 0 0 1 -10 0')).toHaveLength(3)
        expect(parsePath('M 10 0 A 10 10 0 0 1 -10 0 A 10 10 0 0 1 10 0')).toHaveLength(5)
    })

    test('the flags choose among the four arcs: the sweep and the large arc', () => {
        const through = (d: string) => parsePath(d).flatMap(command => command.type === 'C' ? [command.p] : [])
        // From (10, 0) to (0, 10) with a radius of 10: the center is the origin for the short arc going one way, (10, 10) for the other.
        const short = through('M 10 0 A 10 10 0 0 1 0 10')
        const other = through('M 10 0 A 10 10 0 0 0 0 10')
        const large = through('M 10 0 A 10 10 0 1 1 0 10')

        expect(short).toHaveLength(1)
        expect(other).toHaveLength(1)
        expect(large.length).toBeGreaterThan(2)
        // The arc of the sweep 0 has (10, 10) for center: it bulges toward the origin, the other one away from it.
        const bulge = (d: string) => {
            const arc = parsePath(d)[1]

            return arc.type === 'C' ? arc.c1.x + arc.c1.y : NaN
        }

        expect(bulge('M 10 0 A 10 10 0 0 0 0 10')).toBeLessThan(bulge('M 10 0 A 10 10 0 0 1 0 10'))
    })

    test('the end is exactly the one given, relative or not', () => {
        const absolute = parsePath('M 10 0 A 10 10 0 0 1 0 10')
        const relative = parsePath('M 10 0 a 10 10 0 0 1 -10 10')

        expect(ends(absolute).at(-1)).toEqual({x: 0, y: 10})
        expect(ends(relative).at(-1)).toEqual({x: 0, y: 10})
    })

    test('radii that are too small grow to reach the end', () => {
        const commands = parsePath('M 0 0 A 1 1 0 0 1 10 0')

        // A half circle of radius 5: two curves, ending at the end.
        expect(commands).toHaveLength(3)
        expect(ends(commands).at(-1)).toEqual({x: 10, y: 0})
    })

    test('an arc with a radius of 0 is a line, and an arc to the same point is nothing', () => {
        expect(parsePath('M 0 0 A 0 5 0 0 1 10 0')[1]).toEqual({type: 'L', p: {x: 10, y: 0}})
        expect(parsePath('M 3 3 A 5 5 0 0 1 3 3')).toHaveLength(1)
    })

    test('the flags can be written without a space', () => {
        expect(parsePath('M 10 0 A 10 10 0 0110 10')).toEqual(parsePath('M 10 0 A 10 10 0 0 1 10 10'))
    })

    test('an ellipse that is turned stays on its ellipse', () => {
        const commands = parsePath('M 10 0 A 10 5 90 0 1 0 10')

        expect(commands.length).toBeGreaterThan(1)
        near(ends(commands).at(-1), {x: 0, y: 10})
    })
})

describe('parsePath errors', () => {
    test.each([
        ['a path that does not begin with M', 'L 1 1'],
        ['a path that begins with numbers', '1 2 L 3 4'],
        ['a command that does not exist', 'M 0 0 X 1 1'],
        ['a number that is missing', 'M 0'],
        ['a command without numbers', 'M 0 0 L'],
        ['half a pair', 'M 0 0 L 1'],
        ['text instead of a number', 'M 0 a'],
        ['something that is not a number or a command', 'M 0 0 # 1'],
        ['numbers after Z', 'M 0 0 L 1 1 Z 5 5'],
        ['a flag that is not 0 or 1', 'M 0 0 A 1 1 0 2 0 5 5'],
        ['an arc with a missing end', 'M 0 0 A 1 1 0 0 1 5'],
        ['a comma where a command is', 'M 0 0 , L 1 1']
    ])('%s is a ParseError that gives the path', (_, d) => {
        expect(() => parsePath(d)).toThrow(ParseError)
        expect(() => parsePath(d)).toThrow(/Invalid path/)
    })
})

describe('transformPath', () => {
    test('moves every position, the controls of the curves too', () => {
        const commands = parsePath('M 1 1 L 2 2 C 3 3 4 4 5 5 Z')
        const moved = transformPath(commands, ({x, y}) => ({x: 2 * x, y: y + 10}))

        expect(moved).toEqual([
            {type: 'M', p: {x: 2, y: 11}},
            {type: 'L', p: {x: 4, y: 12}},
            {type: 'C', c1: {x: 6, y: 13}, c2: {x: 8, y: 14}, p: {x: 10, y: 15}},
            {type: 'Z'}
        ])
    })

    test('does not change the path that it is given', () => {
        const commands = parsePath('M 1 1 L 2 2')

        transformPath(commands, () => ({x: 0, y: 0}))

        expect(commands[1]).toEqual({type: 'L', p: {x: 2, y: 2}})
    })
})

describe('pathToString', () => {
    test('writes the commands as absolute data of a path', () => {
        expect(pathToString(parsePath('m 1 1 l 2 0 c 1 1 2 1 3 0 z'))).toBe('M 1 1 L 3 1 C 4 2 5 2 6 1 Z')
    })

    test('rounds to 2 decimals', () => {
        expect(pathToString(parsePath('M 0.123456 0.987654'))).toBe('M 0.12 0.99')
    })

    test('writes a path again that reads the same', () => {
        const commands = parsePath('M 1 2 L 3 4 C 5 6 7 8 9 10 Z M 0 0 L 1 1')

        expect(parsePath(pathToString(commands))).toEqual(commands)
    })

    test('writes nothing for no command', () => {
        expect(pathToString([])).toBe('')
    })
})

describe('pathPieces', () => {
    test('a line is a cubic curve with its controls a third of the way', () => {
        const [[line]] = pathPieces(parsePath('M 0 0 L 9 0'))

        expect(line).toEqual({start: {x: 0, y: 0}, control1: {x: 3, y: 0}, control2: {x: 6, y: 0}, end: {x: 9, y: 0}})
    })

    test('a curve is the curve', () => {
        const [[curve]] = pathPieces(parsePath('M 0 0 C 1 2 3 4 5 6'))

        expect(curve).toEqual({start: {x: 0, y: 0}, control1: {x: 1, y: 2}, control2: {x: 3, y: 4}, end: {x: 5, y: 6}})
    })

    test('each piece is a list of curves that follow each other', () => {
        const pieces = pathPieces(parsePath('M 0 0 L 1 0 L 1 1 M 5 5 L 6 5'))

        expect(pieces).toHaveLength(2)
        expect(pieces[0]).toHaveLength(2)
        expect(pieces[1]).toHaveLength(1)
        expect(pieces[0][1].start).toEqual({x: 1, y: 0})
    })

    test('Z adds the line back to the start, unless it is there', () => {
        expect(pathPieces(parsePath('M 0 0 L 4 0 L 4 4 Z'))[0]).toHaveLength(3)
        expect(pathPieces(parsePath('M 0 0 L 4 0 L 4 4 L 0 0 Z'))[0]).toHaveLength(3)
    })

    test('a piece that draws nothing is left out', () => {
        expect(pathPieces(parsePath('M 0 0 M 5 5 L 6 6'))).toHaveLength(1)
        expect(pathPieces(parsePath('M 0 0'))).toEqual([])
        expect(pathPieces([])).toEqual([])
    })

    test('a piece after Z begins at the start of the piece before', () => {
        const pieces = pathPieces(parsePath('M 1 1 L 3 1 L 3 3 Z L 5 5'))

        expect(pieces[0].at(-1)?.end).toEqual({x: 5, y: 5})
        expect(pieces[0].at(-1)?.start).toEqual({x: 1, y: 1})
    })
})
