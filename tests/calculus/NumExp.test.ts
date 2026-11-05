import {describe, expect, test} from 'vitest'
import {NumExp} from '../../src/calculus/NumExp'
import {InvalidArgumentError, ParseError, PiDrawError} from '../../src/errors'

const ev = (expression: string, values: Record<string, number> = {x: 2}) => new NumExp(expression).evaluate(values)

describe('NumExp precedence', () => {
    test.each([
        ['2+3*4', 14],
        ['(2+3)*4', 20],
        ['2-3-4', -5],
        ['8/4/2', 1],
        ['2^3^2', 512],
        ['-x^2', -4],
        ['2*-3', -6],
        ['x^-1', 0.5],
        ['3*(-x)', -6],
        ['+x', 2],
        ['10%4*2', 4],
        ['10%4+1', 3],
    ])('%s = %d', (expression, expected) => {
        expect(ev(expression)).toBe(expected)
    })

    test('a function binds tighter than the power', () => {
        expect(ev('sin(x)^2')).toBeCloseTo(Math.sin(2) ** 2, 9)
        expect(ev('2sin(x)^2')).toBeCloseTo(2 * Math.sin(2) ** 2, 9)
    })
})

describe('NumExp constants and rounding', () => {
    test('constants inside a function', () => {
        expect(ev('sin(pi)')).toBe(0)
        expect(ev('ln(e)')).toBe(1)
        expect(ev('cos(2*pi)')).toBe(1)
        expect(ev('pi')).toBeCloseTo(Math.PI, 9)
        expect(ev('e')).toBeCloseTo(Math.E, 9)
    })

    test('the floating point noise is rounded and a negative zero is a zero', () => {
        expect(Object.is(ev('sin(-pi)'), 0)).toBe(true)
        expect(ev('0.1+0.2')).toBe(0.3)
    })

    test('a big value is not rounded', () => {
        expect(ev('10^15+1')).toBe(1e15 + 1)
    })
})

describe('NumExp implicit multiplication', () => {
    test.each([
        ['2x', {x: 2}, 4],
        ['2(x+1)', {x: 2}, 6],
        ['(x+1)(x-1)', {x: 2}, 3],
        ['x(x+1)', {x: 2}, 6],
        ['xy', {x: 2, y: 3}, 6],
        ['2xy', {x: 2, y: 3}, 12],
        ['x^2y', {x: 2, y: 3}, 12],
        ['1/2x', {x: 4}, 2],
    ])('%s', (expression, values, expected) => {
        expect(ev(expression, values)).toBe(expected)
    })

    test('a coefficient before a function', () => {
        expect(ev('3sin(x)')).toBeCloseTo(3 * Math.sin(2), 9)
    })

    test('spaces are ignored', () => {
        expect(ev(' 2 * ( x + 1 ) ')).toBe(6)
    })
})

describe('NumExp functions', () => {
    test.each([
        ['sqrt(x+7)', 3],
        ['abs(-x)', 2],
        ['log(1000)', 3],
        ['ln(1)', 0],
        ['nthrt(8,3)', 2],
        ['nthrt(-8,3)', -2],
        ['nthrt(16,4)', 2],
    ])('%s = %d', (expression, expected) => {
        expect(ev(expression)).toBeCloseTo(expected, 9)
    })

    test('trigonometry', () => {
        expect(ev('tan(x)')).toBeCloseTo(Math.tan(2), 9)
        expect(ev('asin(1)')).toBeCloseTo(Math.PI / 2, 9)
        expect(ev('acos(1)')).toBe(0)
        expect(ev('atan(1)')).toBeCloseTo(Math.PI / 4, 9)
    })

    test('nested functions and arguments with an operation', () => {
        expect(ev('sqrt(abs(x-5))')).toBeCloseTo(Math.sqrt(3), 9)
        expect(ev('nthrt(x+6,x+1)')).toBeCloseTo(2, 9)
    })
})

describe('NumExp undefined results are values', () => {
    test('they are NaN or infinite, never an error', () => {
        expect(ev('sqrt(-1)')).toBeNaN()
        expect(ev('nthrt(-4,2)')).toBeNaN()
        expect(ev('1/0')).toBe(Infinity)
        expect(ev('-1/0')).toBe(-Infinity)
        expect(ev('ln(0)')).toBe(-Infinity)
        expect(ev('0/0')).toBeNaN()
    })
})

describe('NumExp length and reuse', () => {
    test('an expression of more than 50 tokens is not truncated', () => {
        expect(ev(Array(60).fill('1').join('+'))).toBe(60)
        expect(ev(Array(60).fill('x').join('+'))).toBe(120)
    })

    test('one instance gives the right value for each set of variables', () => {
        const expression = new NumExp('x^2+t')

        expect(expression.evaluate({x: 3, t: 1})).toBe(10)
        expect(expression.evaluate({x: 4, t: 0})).toBe(16)
        expect(expression.expression).toBe('x^2+t')
    })

    test('an expression without variable needs no value', () => {
        expect(new NumExp('2+3').evaluate()).toBe(5)
    })
})

describe('NumExp errors', () => {
    test.each([
        [''],
        ['   '],
        ['(x+1'],
        ['x)'],
        ['2 3'],
        ['x+'],
        ['*x'],
        [','],
        ['.'],
        ['x=2'],
        ['3x-2y+5=0'],
        ['x$'],
        ['sin(x,2)'],
        ['nthrt(8)'],
        ['sin()'],
        ['2(('],
    ])('"%s" is a ParseError', (expression) => {
        expect(() => new NumExp(expression)).toThrow(ParseError)
    })

    test('a ParseError is a PiDrawError and names the expression', () => {
        let error: unknown

        try {
            new NumExp('x+')
        } catch (e) {
            error = e
        }

        expect(error).toBeInstanceOf(PiDrawError)
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).name).toBe('ParseError')
        expect((error as Error).message).toContain('x+')
    })

    test('a missing variable is an InvalidArgumentError', () => {
        expect(() => new NumExp('y+1').evaluate({x: 2})).toThrow(InvalidArgumentError)
        expect(() => new NumExp('x').evaluate()).toThrow(InvalidArgumentError)
        expect(() => new NumExp('y+1').evaluate({x: 2})).toThrow('"y"')
    })
})

describe('NumExp against a JavaScript reference', () => {
    const cases: [string, (x: number) => number][] = [
        ['x^2+3x-1', x => x ** 2 + 3 * x - 1],
        ['x^3-2x^2+x', x => x ** 3 - 2 * x ** 2 + x],
        ['(x+1)/(x-2)', x => (x + 1) / (x - 2)],
        ['sin(x)*cos(x)', x => Math.sin(x) * Math.cos(x)],
        ['sqrt(abs(x))', x => Math.sqrt(Math.abs(x))],
        ['2^x', x => 2 ** x],
        ['-x^2+2x', x => -(x ** 2) + 2 * x],
        ['3sin(2x)^2-x/2', x => 3 * Math.sin(2 * x) ** 2 - x / 2],
        ['ln(abs(x)+1)', x => Math.log(Math.abs(x) + 1)],
    ]

    test.each(cases)('%s', (expression, reference) => {
        const numExp = new NumExp(expression)

        for (const x of [-3, -1.5, 0, 0.5, 3, 7]) {
            expect(numExp.evaluate({x})).toBeCloseTo(reference(x), 8)
        }
    })
})

describe('NumExp speed', () => {
    test('a hundred thousand evaluations stay fast', () => {
        const numExp = new NumExp('3sin(x)^2+x^2/(x+10)-2')
        const values = {x: 0}
        let sum = 0

        const start = performance.now()
        for (let i = 0; i < 100_000; i++) {
            values.x = i / 1000
            sum += numExp.evaluate(values)
        }
        const duration = performance.now() - start

        expect(Number.isFinite(sum)).toBe(true)
        // Loose bound: a safeguard against a regression to the former interpreter, not a benchmark.
        expect(duration).toBeLessThan(1000)
    })
})

describe('NumExp written for pgf', () => {
    test.each([
        ['x', 'x'],
        ['x^2', '(x^2)'],
        ['-x^2', '(-(x^2))'],
        ['2x+1', '((2*x)+1)'],
        ['x^-1', '(x^(-1))'],
        ['sin(x)', 'sin(deg(x))'],
        ['cos(2x)', 'cos(deg((2*x)))'],
        ['asin(x/4)', 'rad(asin((x/4)))'],
        ['atan(x)', 'rad(atan(x))'],
        ['sqrt(x+4)', 'sqrt((x+4))'],
        ['abs(x)', 'abs(x)'],
        ['ln(x)', 'ln(x)'],
        ['log(x)', 'log10(x)'],
        ['x%2', '(x-int(x/2)*2)'],
        ['nthrt(x,3)', '(sign(x)*abs(x)^(1/3))'],
        ['nthrt(x,2)', '(x^(1/2))']
    ])('%s is %s', (expression, pgf) => {
        expect(new NumExp(expression).toPgf()).toBe(pgf)
    })

    test('the constants are numbers, in fixed notation, parenthesized when negative', () => {
        expect(new NumExp('pi*x').toPgf()).toBe('(3.14159265358979*x)')
        expect(new NumExp('10^-7*x').toPgf()).toBe('(0.0000001*x)')
        expect(new NumExp('2*-3x').toPgf()).toBe('((-6)*x)')
        expect(new NumExp('1/0+x').toPgf()).toBe('((1/0)+x)')
    })
})

describe('NumExp written for pgf with another variable', () => {
    test('the variables are renamed', () => {
        expect(new NumExp('cos(t)+t^2').toPgf({t: 'x'})).toBe('(cos(deg(x))+(x^2))')
        expect(new NumExp('x+y').toPgf({x: 'a', y: 'b'})).toBe('(a+b)')
    })

    test('the variables keep their name by default', () => {
        expect(new NumExp('t+1').toPgf()).toBe('(t+1)')
    })
})
