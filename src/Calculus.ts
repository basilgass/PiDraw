/**
 * The calculus class is intended to replace PiMath and avoid using "fractions" and work directly with number.
 */

import type {Marker, Path as svgPath, Svg} from "@svgdotjs/svg.js"
import {type IGraphConfig, isDOMAIN, isXY, type XY} from "./pidraw.common"

export function numberCorrection(value: number, number_of_digits = 10): number {
    return +value.toFixed(number_of_digits)
}

export function isInfinity(value: number): boolean {
    return value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY
}

export function distanceAB(A: XY, B: XY): number {
    return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)
}

export class mathVector {
    constructor(x: number | XY, y?: number | XY) {
        this._x = 0
        this._y = 0

        if (isXY(x) && isXY(y)) {
            this._x = y.x - x.x
            this._y = y.y - x.y
        } else if (isXY(x) && y === undefined) {
            this._x = x.x
            this._y = x.y
        } else if (!isNaN(+x) && y !== undefined && !isNaN(+y)) {
            this._x = +x
            this._y = +y
        }

        return this
    }

    private _x: number

    get x(): number {
        return this._x
    }

    set x(value: number) {
        this._x = value
    }

    private _y: number

    get y(): number {
        return this._y
    }

    set y(value: number) {
        this._y = value
    }

    get norm(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2)
    }

    get normal(): mathVector {
        return new mathVector(this._y, -this._x)
    }

    get unit(): mathVector {
        const n = this.norm
        return new mathVector(this._x / n, this._y / n)
    }

    static scalarProduct(u: mathVector, v: mathVector): number {
        return u.x * v.x + u.y * v.y
    }

    projection(on: mathVector): mathVector {
        const x = on.x
        const y = on.y

        const k = mathVector.scalarProduct(this, on) / (x ** 2 + y ** 2)

        return new mathVector(x * k, y * k)
    }

    rotate(angle: number): this {

        // Rotate the vector by <angle> degrees.
        // (cos  -sin ) ( x )
        // (sin  cos  ) ( y )
        // => x: cos * x - sin * y
        // => y: sin * x + cos * y
        const rads = +angle * Math.PI / 180,
            x = +this._x,
            y = +this._y

        this._x = Math.cos(rads) * x - Math.sin(rads) * y
        this._y = Math.sin(rads) * x + Math.cos(rads) * y

        return this
    }

    add(v: mathVector): mathVector {
        return new mathVector(this._x + v.x, this._y + v.y)
    }

    setLength(length: number): this {
        const n = this.norm
        this._x = this._x * length / n
        this._y = this._y * length / n

        return this
    }
}

export class mathLine {
    constructor(A: XY, B: XY | mathVector) {
        this._A = {x: 0, y: 0}
        this._director = new mathVector(0, 0)

        if (B instanceof mathVector) {
            this._A = A
            this._director = B
        } else {
            return new mathLine(A, new mathVector(A, B))
        }
    }

    private _A: XY

    get A(): XY {
        return this._A
    }

    set A(value: XY) {
        this._A = value
    }

    private _director: mathVector

    get director(): mathVector {
        return this._director
    }

    set director(value: mathVector) {
        this._director = value
    }

    get normal(): mathVector {
        return new mathVector(this._director.y, -this._director.x)
    }

    get slope(): number {
        return this._director.y / this._director.x
    }

    get ordinate(): number {
        // A = (a,b)
        // d = (dx,dy)
        // x = a + k.dx => x = 0 => k = -a/dx
        // y = b + k.dy => y = b - a.dy/dx => h = y - mx
        return this._A.y - this._A.x * this.slope
    }

    getValueAtX(x: number): number {
        // y = mx + h
        return x * this.slope + this.ordinate
    }

    getValueAtY(y: number): number {
        // x = (y-h)/m
        const slope = this.slope

        if (isInfinity(slope)) {
            return this._A.x
        }
        return (y - this.ordinate) / this.slope
    }

    intersection(value: mathLine): XY | null {
        // (d1): y = m1x+h1
        // (d2): y = m2x+h2
        // m1x+h1  = m2x+h2 => x = (h2-h1)/(m1-m2)
        const m1 = this.slope,
            h1 = this.ordinate,
            m2 = value.slope,
            h2 = value.ordinate

        let x: number, y: number

        if (m1 === Number.POSITIVE_INFINITY || m1 === Number.NEGATIVE_INFINITY) {
            x = this._A.x
            y = m2 * x + h2
        } else if (m2 === Number.POSITIVE_INFINITY || m2 === Number.NEGATIVE_INFINITY) {
            x = value.A.x
            y = m1 * x + h1
        } else {
            x = (h2 - h1) / (m1 - m2)
            y = m1 * x + h1
        }

        if (x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
            return null
        }
        return {x, y}
    }

    projection(value: XY): XY {
        // d = (dx,dy)
        // p = (px,py)
        // k = (d.p)/(d.d)
        // proj = k.d
        const d = this._director,
            p = new mathVector(this._A, value)

        const k = mathVector.scalarProduct(d, p) / mathVector.scalarProduct(d, d)

        return {x: this._A.x + d.x * k, y: this._A.y + d.y * k}
    }
}


/** -----------------------------------------
 * numeric expression and shutting yard for expressions.
 *
 */

export class NumExp {
    constructor(value: string, uniformize?: boolean) {
        this._expression = value

        try {
            this._rpn = new Shutingyard(ShutingyardMode.NUMERIC).parse(value, uniformize ?? true).rpn
            this._isValid = true
        } catch (e) {
            this._rpn = []
            this._isValid = false
        }
    }

    private _rpn: { token: string, tokenType: ShutingyardType }[]

    get rpn(): { token: string; tokenType: ShutingyardType }[] {
        return this._rpn
    }

    private _expression: string

    get expression(): string {
        return this._expression
    }

    private _isValid: boolean

    get isValid(): boolean {
        try {
            this.evaluate({x: 0})
            this._isValid = true
        } catch {
            this._isValid = false
        }
        return this._isValid
    }

    set isValid(value: boolean) {
        this._isValid = value
    }

    evaluate(values?: Record<string, number>): number {
        const stack: number[] = []

        if (this._rpn.length === 0) {
            this._isValid = false
            return NaN
        }

        this.isValid = true

        for (const element of this._rpn) {
            if (element.tokenType === ShutingyardType.COEFFICIENT) {
                // May be a numeric value or a Fraction.
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token)
                } else {
                    console.log('adding Fraction - should not be here ! ')
                    // this._addToStack(stack, new Fraction(element.token).value)
                }
            } else if (element.tokenType === ShutingyardType.VARIABLE) {
                if (values?.[element.token] !== undefined) {
                    this._addToStack(stack, +values[element.token])
                }
            } else if (element.tokenType === ShutingyardType.CONSTANT) {
                this._addToStack(stack, tokenConstant[element.token])
            } else if (element.tokenType === ShutingyardType.OPERATION) {
                if (element.token === '*') {
                    const b = stack.pop(),
                        a = stack.pop()
                    if (a === undefined || b === undefined) {
                        this.isValid = false
                        return NaN
                    }

                    this._addToStack(stack, a * b)
                } else if (element.token === '/') {
                    const b = stack.pop(),
                        a = stack.pop()
                    if (a === undefined || b === undefined) {
                        this.isValid = false
                        return NaN
                    }
                    this._addToStack(stack, a / b)
                } else if (element.token === '+') {
                    const b = stack.pop(),
                        a = stack.pop()
                    if (a === undefined || b === undefined) {
                        this.isValid = false
                        return NaN
                    }
                    this._addToStack(stack, (+a) + (+b))
                } else if (element.token === '-') {
                    const b = stack.pop(),
                        a = stack.pop() ?? 0
                    if (b === undefined) {
                        this.isValid = false
                        return NaN
                    }
                    this._addToStack(stack, a - b)
                } else if (element.token === '^') {
                    const b = stack.pop(),
                        a = stack.pop()
                    if (a === undefined || b === undefined) {
                        this.isValid = false
                        return NaN
                    }
                    this._addToStack(stack, Math.pow(a, b))
                }
            } else if (element.tokenType === ShutingyardType.FUNCTION) {
                const a = stack.pop()
                if (a === undefined) {
                    this.isValid = false
                    return NaN
                }
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a))
                } else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a))
                } else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a))
                } else if (element.token === 'asin') {
                    this._addToStack(stack, Math.asin(a))
                } else if (element.token === 'acos') {
                    this._addToStack(stack, Math.acos(a))
                } else if (element.token === 'atan') {
                    this._addToStack(stack, Math.atan(a))
                } else if (element.token === 'sqrt') {
                    this._addToStack(stack, Math.sqrt(a))
                } else if (element.token === 'nthrt') {
                    const b = stack.pop()
                    if (b === undefined) {
                        this._isValid = false
                        return NaN
                    }
                    if (a % 2 === 0 && b < 0) {
                        this._addToStack(stack, NaN)
                    } else {
                        this._addToStack(stack, (b < 0 ? -1 : 1) * Math.pow(Math.abs(b), 1 / a))
                    }
                } else if (element.token === 'ln') {
                    this._addToStack(stack, Math.log(a))
                } else if (element.token === 'log') {
                    this._addToStack(stack, Math.log10(a))
                } else if (element.token === 'abs') {
                    this._addToStack(stack, Math.abs(a))
                }
            }
        }

        if (stack.length === 1) {
            return stack[0]
        } else {
            throw new Error(`There was a problem parsing: ${this._expression}`)
        }
    }

    private _extractDecimalPart(value: number): string {
        let decimal = value.toString()

        if (!decimal.includes('.')) {
            return ''
        }

        decimal = decimal.split('.')[1]

        return decimal.substring(0, decimal.length - 2)
    }

    private _addToStack(stack: number[], value: number): void {
        stack.push(numberCorrection(value))
    }
}

type tokenType = Record<string, {
    precedence: number,
    associative: string,
    type: ShutingyardType
}>;

const tokenConstant: Record<string, number> = {
    pi: Math.PI,
    e: Math.exp(1)
}

enum ShutingyardType {
    LEFT_PARENTHESIS = '(',
    RIGHT_PARENTHESIS = ')',
    VARIABLE = 'variable',
    COEFFICIENT = 'coefficient',
    OPERATION = 'operation',
    CONSTANT = 'constant',
    FUNCTION = 'function',
    FUNCTION_ARGUMENT = 'function-argument',
    MONOM = 'monom'
}

enum ShutingyardMode {
    EXPRESSION = 'expression',
    POLYNOM = 'polynom',
    NUMERIC = 'numeric'
}

interface Token {
    token: string,
    tokenType: ShutingyardType
}

class Shutingyard {
    readonly _mode: ShutingyardMode
    private _tokenConfig: tokenType
    private _tokenConstant: Record<string, number>
    private _tokenKeys: string[]
    private _uniformize: boolean

    constructor(mode?: ShutingyardMode) {
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode

        this._tokenConfig = {}
        this._tokenConstant = {}
        this._tokenKeys = []
        this._uniformize = false

        this.tokenConfigInitialization()
    }

    private _rpn: Token[] = []

    // Getter
    get rpn() {
        // console.log(this._rpn)
        return this._rpn
    }

    get rpnToken() {
        return this._rpn.map(x => x.token)
    }

    tokenConfigInitialization(): tokenType {
        if (this._mode === ShutingyardMode.NUMERIC) {
            this._tokenConfig = {
                '^': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '*': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '/': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '+': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '%': {precedence: 3, associative: 'right', type: ShutingyardType.OPERATION},
                'sin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'cos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'tan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'asin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'acos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'atan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'sqrt': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'nthrt': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'ln': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'log': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'abs': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
            }
            this._uniformize = false
        } else if (this._mode === ShutingyardMode.EXPRESSION) {
            this._tokenConfig = {
                '^': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '*': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '/': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '+': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '%': {precedence: 3, associative: 'right', type: ShutingyardType.OPERATION},
                'sin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'cos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'tan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'asin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'acos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'atan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'sqrt': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'nthrt': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'abs': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
            }
            this._uniformize = true
        } else {
            this._tokenConfig = {
                '^': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '*': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '/': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '+': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
            }
            this._uniformize = true
        }

        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length)
        return this._tokenConfig
    }

    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr: string, start: number): [string, number, ShutingyardType] {
        let token: string, tokenType: ShutingyardType

        token = ''
        tokenType = ShutingyardType.MONOM

        // Case of parenthesis or comma (generic items)
        if (expr[start] === '(') {
            token = '('
            tokenType = ShutingyardType.LEFT_PARENTHESIS
        }
        // It's a closing parentheses
        else if (expr[start] === ')') {
            token = ')'
            tokenType = ShutingyardType.RIGHT_PARENTHESIS
        }
        // It's an argument separator for a function
        else if (expr[start] === ',') {
            token = ','
            tokenType = ShutingyardType.FUNCTION_ARGUMENT
        } else {
            // Extract operation and function tokens
            for (const key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key
                    tokenType = this._tokenConfig[key].type
                    break
                }
            }

            // Extract constant
            for (const key in tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key
                    tokenType = ShutingyardType.CONSTANT
                    break
                }
            }

            if (token === '') {
                // No function found ! Might be a coefficient !
                if (/[0-9]/.exec(expr[start])) {
                    const k = /^([0-9.]+)/.exec(expr.substring(start))
                    if (k) {
                        token = k[0]
                    }
                    tokenType = ShutingyardType.COEFFICIENT
                } else if (/[a-zA-Z]/.exec(expr[start])) {
                    const variable = /^([a-zA-Z]+)/.exec(expr.substring(start))
                    if (variable) {
                        token = variable[0]
                        tokenType = ShutingyardType.VARIABLE
                    }
                } else {
                    console.log('Unidentified token', expr[start], expr, start)
                    token = expr[start]
                    tokenType = ShutingyardType.MONOM
                }

            }
        }

        return [token, start + token.length, tokenType]
    }

    normalize(expr: string): string {
        if (expr.length === 1) {
            return expr
        }

        // Get the list of function token.
        const fnToken: string[] = [],
            kToken: string[] = []
        for (const token in this._tokenConfig) {
            if (this._tokenConfig[token].type === ShutingyardType.FUNCTION) {
                fnToken.push(token)
            }
        }
        // sort if from the lengthy to the smallest function
        fnToken.sort((a, b) => b.length - a.length)

        for (const token in tokenConstant) {
            kToken.push(token)
        }
        // sort if from the lengthy to the smallest function
        kToken.sort((a, b) => b.length - a.length)

        let normalizedExpr = "",
            i = 0,
            crtToken,
            nextToken

        while (i < expr.length - 1) {
            // Check if we have a function token.
            // The function MUST have an open parentheses
            let tokenIdx = 0
            while (tokenIdx < fnToken.length) {
                const token = fnToken[tokenIdx]
                if (expr.slice(i, i + token.length + 1) === token + '(') {
                    normalizedExpr += token + '('
                    i += token.length + 1

                    // Restart the scan for the function token
                    tokenIdx = 0
                } else {
                    // scan for a next function token
                    tokenIdx++
                }
            }

            // Check for a constant
            tokenIdx = 0
            while (tokenIdx < kToken.length) {
                const token = kToken[tokenIdx]
                if (expr.slice(i, i + token.length) === token) {
                    // We have found a constant.
                    normalizedExpr += token
                    i += token.length

                    // Exit the loop
                    break
                }
                tokenIdx++
            }

            // The function token are solved.
            if (i >= expr.length) {
                break
            }

            crtToken = expr[i]
            nextToken = expr[i + 1]
            normalizedExpr += crtToken
            if (crtToken.match(/[a-zA-Z]/g)) {
                // Current element is a letter.
                // if the next element is a letter, a number or an opening parentheses, add the multiplication sign.
                if (/[a-zA-Z\d(]/.exec(nextToken)) {
                    normalizedExpr += '*'
                }
            } else if (/\d/.exec(crtToken)) {
                // Current element is a number.
                // if the next element is a letter or a parentheses, add the multiplication sign.
                if (/[a-zA-Z(]/.exec(nextToken)) {
                    normalizedExpr += '*'
                }
            } else if (crtToken === ')') {
                // Current element is a closing parentheses.
                // if the next element is a letter, a number or an opening parentheses, add the multiplication sign
                if (/[a-zA-Z\d(]/.exec(nextToken)) {
                    normalizedExpr += '*'
                }
            }

            // Go to next token
            i++
        }

        // add the last token
        return normalizedExpr + (nextToken ?? '')
    }

    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     * @param uniformize
     */
    parse(expr: string, uniformize?: boolean): this {

        // Normalize the input if required.
        if (uniformize ?? this._uniformize) {
            expr = this.normalize(expr)
        }

        let securityLoopLvl1 = 50
        let securityLoopLvl2
        let tokenPos = 0
        let token: string
        let tokenType: ShutingyardType
        const securityLoopLvl2_default = 50

        const outQueue: Token[] = []
        const opStack: Token[] = []

        while (tokenPos < expr.length) {
            securityLoopLvl1--
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT')
                break
            }

            // Get the next token and the corresponding new (ending) position
            [token, tokenPos, tokenType] = this.NextToken(expr, tokenPos)

            switch (tokenType) {
                case ShutingyardType.MONOM:
                case ShutingyardType.COEFFICIENT:
                case ShutingyardType.VARIABLE:
                case ShutingyardType.CONSTANT:
                    outQueue.push({token, tokenType})
                    break

                case ShutingyardType.OPERATION:
                    //If the token is an operator, o1, then:
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1]

                        securityLoopLvl2 = +securityLoopLvl2_default

                        //while there is an operator token o2, at the top of the operator stack and
                        while (opTop.token in this._tokenConfig && (
                                //either o1 is left-associative and its precedence is less than or equal to that of o2,
                                (this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                                ||
                                //or o1 is right associative, and has precedence less than that of o2,
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence)
                            )
                            ) {

                            /* Security exit ! */
                            securityLoopLvl2--
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT')
                                break
                            }

                            // Add the operation to the queue
                            outQueue.push(opStack.pop() ?? {token: '', tokenType: ShutingyardType.OPERATION})

                            // Get the next operation on top of the Stack.
                            if (opStack.length === 0) {
                                break
                            }
                            opTop = opStack[opStack.length - 1]
                        }
                    }
                    //at the end of iteration push o1 onto the operator stack
                    opStack.push({token, tokenType})
                    break
                case ShutingyardType.FUNCTION_ARGUMENT:
                    securityLoopLvl2 = +securityLoopLvl2_default
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 0) {
                        securityLoopLvl2--
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT')
                            break
                        }

                        outQueue.push((opStack.pop()) ?? {token, tokenType})
                    }
                    break
                case ShutingyardType.LEFT_PARENTHESIS:
                    opStack.push({token, tokenType})
                    // Add an empty value if next element is negative.
                    if (expr[tokenPos] === '-') {
                        outQueue.push({token: '0', tokenType: ShutingyardType.COEFFICIENT})
                    }
                    break
                case ShutingyardType.RIGHT_PARENTHESIS:
                    securityLoopLvl2 = +securityLoopLvl2_default
                    //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1 /*Maybe zero !? */) {
                        securityLoopLvl2--
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESES EXIT')
                            break
                        }

                        outQueue.push((opStack.pop()) ?? {token, tokenType})
                    }

                    //Pop the left parenthesis from the stack, but not onto the output queue.
                    opStack.pop()
                    break
                case ShutingyardType.FUNCTION:
                    opStack.push({token, tokenType})
                    break
                default:
                    // In theory, everything should be handled.
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `)
            }
        }

        this._rpn = outQueue.concat(opStack.reverse())

        return this
    }
}

export function toPixels<T>(coordinates: T, config: IGraphConfig, axis?: 'x' | 'y'): T {
    // It's a number
    if (typeof coordinates === 'number') {
        if (axis === 'y') {
            return coordinates * config.axis.y.y as T
        }
        return coordinates * config.axis.x.x as T
    }

    // It's a domain
    if (isDOMAIN(coordinates)) {
        let min, max
        if (axis === 'y') {
            min = config.origin.y +
                coordinates.min * config.axis.y.y
            max = config.origin.y +
                coordinates.max * config.axis.y.y

        } else {
            min = config.origin.x +
                coordinates.min * config.axis.x.x
            max = config.origin.x +
                coordinates.max * config.axis.x.x
        }

        return {
            min: Math.min(min, max),
            max: Math.max(min, max)
        } as T
    }

    // It's a point
    if (isXY(coordinates)) {
        return {
            x: config.origin.x +
                coordinates.x * config.axis.x.x +
                coordinates.y * config.axis.y.x,
            y: config.origin.y +
                coordinates.x * config.axis.x.y +
                coordinates.y * config.axis.y.y
        } as T
    }

    // No changes
    return coordinates
}

export function toCoordinates<T>(pixels: T, config: IGraphConfig, axis?: 'x' | 'y'): T {

    // It's a number
    if (typeof pixels === 'number') {
        if (axis === 'y') {
            return pixels / config.axis.y.y as T
        }
        return pixels / config.axis.x.x as T
    }

    // It's a domain
    if (isDOMAIN(pixels)) {
        let min, max
        if (axis === 'y') {
            min = config.origin.y +
                pixels.min / config.axis.y.y
            max = config.origin.y +
                pixels.max / config.axis.y.y

        } else {
            min = config.origin.x +
                pixels.min / config.axis.x.x
            max = config.origin.x +
                pixels.max / config.axis.x.x
        }

        return {
            min: Math.min(min, max),
            max: Math.max(min, max)
        } as T
    }

    // It's a point
    if (isXY(pixels)) {
        return {
            x: (pixels.x - config.origin.x) / config.axis.x.x,
            y: (pixels.y - config.origin.y) / config.axis.y.y
        } as T
    }


    return pixels
}

export function computeLine(
    origin: XY,
    direction: XY,
    width: number,
    height: number,
    padding = 0,
    half_axis = false,
    length?: number,
): [XY, XY] | null {
    // Returned values
    // (x1, y1) = start of the line
    // (x2, y2) = end of the line
    let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0

    // Define special cases (vertical or horizontal direction)
    if (direction.x === 0) {
        // vertical line
        x1 = origin.x

        if (half_axis) {
            y1 = origin.y + padding
        } else {
            y1 = direction.y > 0 ? +padding : height - padding
        }

        x2 = origin.x
        if (length) {
            y2 = direction.y < 0 ? origin.y + length * direction.y : 0 + padding
        } else {
            y2 = direction.y > 0 ? height - padding : 0 + padding
        }

    } else if (direction.y === 0) {
        // horizontal line
        if (half_axis) {
            x1 = origin.x - padding
        } else {
            x1 = direction.x > 0 ? 0 + padding : width - padding
        }
        y1 = origin.y

        if (length) {
            x2 = direction.x > 0 ? origin.x + length * direction.x : 0 - padding
        } else {
            x2 = direction.x > 0 ? width - padding : 0 + padding
        }
        y2 = origin.y
    } else {
        // We have a diagonal line
        let k_start = 0,
            k_end = 0

        // Two cases: direction.x is strictly positive or strictly negative.
        if (direction.x > 0) {
            k_start = half_axis ?
                -padding / direction.x :
                length ? length : (origin.x - padding) / direction.x
            k_end = length ?
                length : (width - origin.x - padding) / direction.x
        } else if (direction.x < 0) {
            k_start = half_axis ?
                -padding / direction.x :
                length ? length : (width - origin.x - padding) / direction.x
            k_end = length ?
                length : (origin.x - padding) / direction.x
        }

        // The coefficient must be positive
        k_start = Math.abs(k_start)
        k_end = Math.abs(k_end)

        // Define the starting and ending points of the line.
        x1 = origin.x - k_start * direction.x
        y1 = origin.y - k_start * direction.y
        x2 = origin.x + k_end * direction.x
        y2 = origin.y + k_end * direction.y
    }

    // Determine if the line is visible in the canvas
    if (
        (x1 > width && x2 > width) ||
        (x1 < 0 && x2 < 0) ||
        (y1 > height && y2 > height) ||
        (y1 < 0 && y2 < 0)
    ) {
        return null
    }

    return [{x: x1, y: y1}, {x: x2, y: y2}]
}


/**
 * Get coordinate by radius / angle
 * Reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
 * @param centerX
 * @param centerY
 * @param radius
 * @param angleInDegrees
 */
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): XY {
    const angleInRadians = -(angleInDegrees) * Math.PI / 180.0

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    }
}

/**
 * get the angle from Ox to OP, where O is origin and P is the handle
 * @param {Point} origin
 * @param {Point} handle
 * @returns {number}
 */
export function cartesianToAngle(origin: XY, handle: XY): number {
    let angle
    const dx = handle.x - origin.x,
        dy = -(handle.y - origin.y)

    angle = (handle.x - origin.x === 0) ? 90 : Math.atan(dy / dx) * 180.0 / Math.PI

    // Depending on the position in the grid, modify the value.
    if (dx >= 0) {
        if (dy >= 0) {
            // 0 -> 90

        } else {
            // 270->360
            while (angle < 270) {
                angle += 180
            }
        }
    } else {
        if (dy >= 0) {
            // 90->180
            while (angle < 90) {
                angle += 180
            }
        } else {
            // 180->270
            while (angle < 180) {
                angle += 180
            }
        }
    }


    return angle
}


function markerAttr(scale: number, ref?: {refX: number, refY: number}){

    return {
        viewBox: `0 0 ${scale} ${scale}`,
        ...(ref ?? {refX: scale / 2, refY: scale / 2}),
        markerWidth: scale,
        markerHeight: scale,
        orient: 'auto',
        markerUnits: 'userSpaceOnUse'
    }
}
export function createMarker(svg: Svg, scale: number, shape?: string): { start: Marker, end: Marker } {

    if (shape === 'x') {
        return {
            start: svg.marker(
                scale,
                scale,
                function (add) {

                    const p = add.path(`M0,0 L${scale},${scale} M${scale},0 L0,${scale}`)

                    p.stroke({
                        color: 'black',
                        width: 1
                    })
                }).attr(markerAttr(scale)),
            end: svg.marker(
                scale,
                scale,
                function (add) {
                    const p = add.path(`M0,0 L${scale},${scale} M${scale},0 L0,${scale}`)

                    p.stroke({
                        color: 'black',
                        width: 1
                    })
                }).attr(markerAttr(scale)),
        }
    }

    if (shape === '|') {
        return {
            start: svg.marker(
                scale,
                scale,
                function (add) {
                    const p = add.path(`M${scale / 2},${scale} L${scale / 2},0`)

                    p.stroke({color: 'black', width: 1})
                }).attr(markerAttr(scale)),
            end: svg.marker(
                scale,
                scale,
                function (add) {
                    const p = add.path(`M${scale / 2},${scale} L${scale / 2},0`)

                    p.stroke({color: 'black', width: 1})
                }).attr(markerAttr(scale)),
        }
    }

    return {
        start: svg.marker(
            scale * 1.2,
            scale * 1.2,
            function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180)
            }).ref(0, scale / 2).attr(markerAttr(scale, {refX: 0, refY: scale/2})),
        end: svg.marker(
            scale * 1.2,
            scale * 1.2,
            function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`)
            }).ref(scale, scale / 2).attr(markerAttr(scale, {refX: scale, refY: scale/2})),
    }
}

//TODO: optimize the neearesPointToPath function
export function nearestPointToPath(value: XY, path: svgPath, precision = 1): XY {
    const xy = path.pointAt(0)

    function distance(a: XY, b: XY): number {
        return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
    }

    for (let t = precision; t < path.length(); t += precision) {
        const {x, y} = path.pointAt(t)

        // Check if the distance with the current value is less than the previous one.
        if (distance(value, {x, y}) < distance(value, xy)) {
            xy.x = x
            xy.y = y
        }
    }
    return xy
}

export function toNumber(value: number | string): number {

    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string') {
        if (value.includes('/')) {
            const [num, den] = value.split('/')
            return +num / +den
        }
    }

    return +value
}