import {InvalidArgumentError, ParseError} from "../errors"

/**
 * Numeric (floating point, not exact) evaluation of a mathematical expression.
 *
 * The expression is parsed and compiled once, in the constructor, into a tree of closures: `evaluate` does no
 * parsing and allocates nothing.
 *
 * Grammar, from the loosest to the tightest binding:
 * - `+` `-` (left associative)
 * - `*` `/` `%` (left associative, `%` is the JavaScript remainder), and the implicit multiplication
 *   (`2x`, `2(x+1)`, `(x+1)(x-1)`, `3sin(x)`, `xy`), which binds like `*`
 * - unary `-` and `+`: `-x^2` is `-(x^2)`, and `2*-3` or `x^-1` are accepted
 * - `^` (right associative: `2^3^2` is `2^9`)
 *
 * Atoms are the numbers (`2`, `1.5`, `.5`, no exponent notation), the constants `pi` and `e`, the variables
 * (a single letter, other than the constant `e`) and the functions, which are only recognised when followed by `(`:
 * `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `abs`, `ln` (natural), `log` (base 10) and
 * `nthrt(radicand, index)`.
 *
 * Mathematically undefined results are values, not errors, so that a plot can handle asymptotes and holes:
 * `sqrt(-1)` is `NaN`, `1/0` is `Infinity`.
 */
export class NumExp {
    private readonly _expression: string
    private readonly _run: Compiled

    /**
     * @throws ParseError if the expression is empty or malformed (unbalanced parentheses, unknown character,
     * wrong number of arguments, missing operand...).
     */
    constructor(expression: string) {
        this._expression = expression
        const root = new Parser(expression).parse()
        this._run = root.run
        this._pgf = root.pgf
    }

    private readonly _pgf: string

    /**
     * The expression written for pgf (`\pgfmathparse`, pgfplots): every operation is parenthesized, the angles go through
     * `deg` and `rad` because pgf works in degrees, and the constants are written as numbers. The only variable that pgfplots
     * reads as the coordinate of a curve is `x`: `rename` writes the variables of the expression under another name
     * (`{t: 'x'}`).
     */
    toPgf(rename: Record<string, string> = {}): string {
        return this._pgf.replace(/«(.)»/g, (_, name: string) => rename[name] ?? name)
    }

    get expression(): string {
        return this._expression
    }

    /**
     * Evaluate the expression, rounded to 10 decimals (below 1e5 in absolute value) to hide the floating point
     * noise: `sin(pi)` is `0`, never `1.2e-16`.
     *
     * @param values value of each variable of the expression, by name.
     * @throws InvalidArgumentError if the expression uses a variable that has no value.
     */
    evaluate(values: Values = {}): number {
        return round(this._run(values))
    }
}

type Values = Record<string, number>
type Compiled = (values: Values) => number

/** A compiled sub-expression. `value` is defined when it does not depend on any variable. `pgf` is its pgf form. */
interface Node {
    run: Compiled
    value?: number
    pgf: string
}

const CONSTANTS: Record<string, number> = {
    pi: Math.PI,
    e: Math.E
}

const FUNCTIONS_1: Record<string, (a: number) => number> = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sqrt: Math.sqrt,
    abs: Math.abs,
    ln: Math.log,
    log: Math.log10
}

// pgf works in degrees: the angle goes in and out through `deg` and `rad`.
const PGF_FUNCTIONS_1: Record<string, (a: string) => string> = {
    sin: a => `sin(deg(${a}))`,
    cos: a => `cos(deg(${a}))`,
    tan: a => `tan(deg(${a}))`,
    asin: a => `rad(asin(${a}))`,
    acos: a => `rad(acos(${a}))`,
    atan: a => `rad(atan(${a}))`,
    sqrt: a => `sqrt(${a})`,
    abs: a => `abs(${a})`,
    ln: a => `ln(${a})`,
    log: a => `log10(${a})`
}

const FUNCTIONS_2: Record<string, (a: number, b: number) => number> = {
    // The root of a negative number only exists for an odd index.
    nthrt: (radicand, index) => radicand < 0 && index % 2 === 0
        ? NaN
        : (radicand < 0 ? -1 : 1) * Math.pow(Math.abs(radicand), 1 / index)
}

// Longest first: "asin" must be tried before "sin".
const FUNCTION_NAMES = [...Object.keys(FUNCTIONS_1), ...Object.keys(FUNCTIONS_2)].sort((a, b) => b.length - a.length)

function round(value: number): number {
    // Above 1e5 the 10th decimal is beyond the precision of a double. "+ 0" turns -0 into 0.
    return Math.abs(value) < 1e5 ? Math.round(value * 1e10) / 1e10 + 0 : value
}

/** A number for pgf: fixed notation (it does not read an exponent), parenthesized when negative. */
function pgfNumber(value: number): string {
    if (!Number.isFinite(value)) {
        return Number.isNaN(value) ? '(0/0)' : (value > 0 ? '(1/0)' : '(-1/0)')
    }

    const text = String(Number(value.toPrecision(15)))
    const plain = text.includes('e') ? value.toFixed(20).replace(/\.?0+$/, '') : text

    return value < 0 ? `(${plain})` : plain
}

function constant(value: number): Node {
    return {run: () => value, value, pgf: pgfNumber(value)}
}

function unary(a: Node, fn: (a: number) => number, pgf: (a: string) => string): Node {
    if (a.value !== undefined) {
        return constant(fn(a.value))
    }

    const run = a.run
    return {run: values => fn(run(values)), pgf: pgf(a.pgf)}
}

function binary(operator: string, a: Node, b: Node): Node {
    const ra = a.run
    const rb = b.run

    if (a.value !== undefined && b.value !== undefined) {
        return constant(applyBinary(operator, a.value, b.value))
    }

    const pa = a.pgf
    const pb = b.pgf

    switch (operator) {
        case '+':
            return {run: values => ra(values) + rb(values), pgf: `(${pa}+${pb})`}
        case '-':
            return {run: values => ra(values) - rb(values), pgf: `(${pa}-${pb})`}
        case '*':
            return {run: values => ra(values) * rb(values), pgf: `(${pa}*${pb})`}
        case '/':
            return {run: values => ra(values) / rb(values), pgf: `(${pa}/${pb})`}
        // The remainder has the sign of the dividend, like in JavaScript: `int` truncates toward zero.
        case '%':
            return {run: values => ra(values) % rb(values), pgf: `(${pa}-int(${pa}/${pb})*${pb})`}
        default:
            return {run: values => Math.pow(ra(values), rb(values)), pgf: `(${pa}^${pb})`}
    }
}

function applyBinary(operator: string, a: number, b: number): number {
    switch (operator) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return a / b
        case '%':
            return a % b
        default:
            return Math.pow(a, b)
    }
}

function variable(name: string): Node {
    return {
        pgf: `«${name}»`,
        run: values => {
            const value = values[name] as number | undefined
            if (value === undefined) {
                throw new InvalidArgumentError(`No value for the variable "${name}"`)
            }
            return value
        }
    }
}

type TokenKind = 'number' | 'variable' | 'constant' | 'function' | 'operator' | '(' | ')' | ','

interface Token {
    kind: TokenKind
    text: string
}

const NUMBER = /^(?:\d+\.?\d*|\.\d+)/

function tokenize(expression: string): Token[] {
    const tokens: Token[] = []
    let i = 0

    while (i < expression.length) {
        const char = expression[i]

        if (/\s/.test(char)) {
            i++
        } else if (/[\d.]/.test(char)) {
            const match = NUMBER.exec(expression.slice(i))
            if (match === null) {
                throw new ParseError(`Cannot parse "${expression}": invalid number at position ${i}`)
            }
            tokens.push({kind: 'number', text: match[0]})
            i += match[0].length
        } else if (/[a-zA-Z]/.test(char)) {
            const name = FUNCTION_NAMES.find(fn => expression.startsWith(fn + '(', i))

            if (name !== undefined) {
                tokens.push({kind: 'function', text: name})
                i += name.length
            } else if (expression.startsWith('pi', i)) {
                tokens.push({kind: 'constant', text: 'pi'})
                i += 2
            } else {
                tokens.push({kind: char === 'e' ? 'constant' : 'variable', text: char})
                i++
            }
        } else if ('+-*/%^'.includes(char)) {
            tokens.push({kind: 'operator', text: char})
            i++
        } else if (char === '(' || char === ')' || char === ',') {
            tokens.push({kind: char, text: char})
            i++
        } else {
            throw new ParseError(`Cannot parse "${expression}": unexpected character "${char}" at position ${i}`)
        }
    }

    return tokens
}

/** Recursive descent parser: one method per level of the grammar, each one building the compiled node. */
class Parser {
    private readonly _expression: string
    private readonly _tokens: Token[]
    private _pos = 0

    constructor(expression: string) {
        this._expression = expression
        this._tokens = tokenize(expression)
    }

    parse(): Node {
        if (this._tokens.length === 0) {
            this._fail('the expression is empty')
        }

        const node = this._additive()

        if (this._pos < this._tokens.length) {
            this._fail(`unexpected "${this._tokens[this._pos].text}"`)
        }

        return node
    }

    private _fail(reason: string): never {
        throw new ParseError(`Cannot parse "${this._expression}": ${reason}`)
    }

    private _peek(): Token | undefined {
        return this._tokens[this._pos]
    }

    private _isOperator(...operators: string[]): boolean {
        const token = this._peek()
        return token?.kind === 'operator' && operators.includes(token.text)
    }

    private _expect(kind: TokenKind): void {
        const token = this._peek()
        if (token?.kind !== kind) {
            this._fail(token === undefined ? `missing "${kind}"` : `expected "${kind}" but found "${token.text}"`)
        }
        this._pos++
    }

    private _additive(): Node {
        let left = this._multiplicative()

        while (this._isOperator('+', '-')) {
            const operator = this._tokens[this._pos++].text
            left = binary(operator, left, this._multiplicative())
        }

        return left
    }

    private _multiplicative(): Node {
        let left = this._unary()

        for (; ;) {
            if (this._isOperator('*', '/', '%')) {
                const operator = this._tokens[this._pos++].text
                left = binary(operator, left, this._unary())
                continue
            }

            // Implicit multiplication: a value is directly followed by the start of another one.
            const next = this._peek()
            const startsValue = next !== undefined &&
                (['number', 'variable', 'constant', 'function', '('] as TokenKind[]).includes(next.kind)

            if (!startsValue) {
                return left
            }

            if (next.kind === 'number' && this._tokens[this._pos - 1].kind === 'number') {
                this._fail(`two numbers in a row ("${this._tokens[this._pos - 1].text} ${next.text}")`)
            }

            left = binary('*', left, this._unary())
        }
    }

    private _unary(): Node {
        if (this._isOperator('-')) {
            this._pos++
            return unary(this._unary(), a => -a, a => `(-${a})`)
        }

        if (this._isOperator('+')) {
            this._pos++
            return this._unary()
        }

        return this._power()
    }

    private _power(): Node {
        const base = this._primary()

        if (this._isOperator('^')) {
            this._pos++
            // The exponent is a unary level, which makes "^" right associative and accepts "x^-1".
            return binary('^', base, this._unary())
        }

        return base
    }

    private _primary(): Node {
        const token = this._peek()

        if (token === undefined) {
            return this._fail('the expression ends unexpectedly')
        }

        this._pos++

        switch (token.kind) {
            case 'number':
                return constant(+token.text)
            case 'constant':
                return constant(CONSTANTS[token.text])
            case 'variable':
                return variable(token.text)
            case '(': {
                const node = this._additive()
                this._expect(')')
                return node
            }
            case 'function':
                return this._call(token.text)
            default:
                return this._fail(`unexpected "${token.text}"`)
        }
    }

    private _call(name: string): Node {
        this._expect('(')

        const args = [this._additive()]
        while (this._peek()?.kind === ',') {
            this._pos++
            args.push(this._additive())
        }

        this._expect(')')

        if (name in FUNCTIONS_1 && args.length === 1) {
            return unary(args[0], FUNCTIONS_1[name], PGF_FUNCTIONS_1[name])
        }

        if (name in FUNCTIONS_2 && args.length === 2) {
            const fn = FUNCTIONS_2[name]
            const [a, b] = args

            if (a.value !== undefined && b.value !== undefined) {
                return constant(fn(a.value, b.value))
            }

            // The root of a negative number with an odd index keeps its sign; an even index is written for a positive radicand.
            const even = b.value !== undefined && b.value % 2 === 0
            const pgf = even ? `(${a.pgf}^(1/${b.pgf}))` : `(sign(${a.pgf})*abs(${a.pgf})^(1/${b.pgf}))`

            return {run: values => fn(a.run(values), b.run(values)), pgf}
        }

        return this._fail(`"${name}" does not take ${args.length} argument(s)`)
    }
}
