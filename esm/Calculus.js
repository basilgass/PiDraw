"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumExp = exports.mathLine = exports.mathVector = exports.distanceAB = exports.isInfinity = exports.numberCorrection = void 0;
const interfaces_1 = require("./variables/interfaces");
function numberCorrection(value, epsilonDigit = 1, epsilonNumberOfDigits = 10, number_of_digits = 10) {
    return +value.toFixed(number_of_digits);
    //
    // // Must modify the number if it's like:
    // // a: 3.0000000000000003
    // // b: 3.9999999999999994
    // // remove the last character
    // // check if around n last characters are either 0 or 9
    // // if it is, 'round' the number.
    // function extractDecimalPart(valueToExtract: number, decimalLength: number) {
    //     let decimal = valueToExtract.toString()
    //
    //     if (!decimal.includes('.')) {
    //         return ''
    //     }
    //
    //     decimal = decimal.split('.')[1]
    //     return decimal.substring(0, decimalLength)
    // }
    //
    // const epsilon = Number(`0.${"0".repeat(epsilonNumberOfDigits - 1)}${epsilonDigit}`)
    // const decimal = extractDecimalPart(value, epsilonNumberOfDigits)
    // if (decimal === '') {
    //     return value
    // }
    //
    // const n9 = decimal.match(/9+$/g)
    // const n0 = decimal.match(/0+$/g)
    //
    // if (n9 && n9[0].length >= number_of_digits) {
    //     // New tested values.
    //     const mod = extractDecimalPart(value + epsilon, epsilonNumberOfDigits),
    //         mod0 = mod.match(/0+$/g)
    //
    //     if (mod0 && mod0[0].length >= number_of_digits) {
    //         return +((value + epsilon).toString().split(mod0[0])[0])
    //     }
    // }
    //
    // if (n0 && n0[0].length >= number_of_digits) {
    //     // New tested values.
    //     const mod = extractDecimalPart(value - epsilon, epsilonNumberOfDigits),
    //         mod9 = mod.match(/9+$/g)
    //
    //     if (mod9 && mod9[0].length >= number_of_digits) {
    //         // The value can be changed. Remove all nines!
    //         return +(value.toString().split(n0[0])[0])
    //     }
    // }
    //
    // return value
}
exports.numberCorrection = numberCorrection;
function isInfinity(value) {
    return value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY;
}
exports.isInfinity = isInfinity;
function distanceAB(A, B) {
    return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
}
exports.distanceAB = distanceAB;
class mathVector {
    constructor(x, y) {
        // Does not exist.
        if (x === null || y === null) {
            return null;
        }
        if (typeof x === 'number' && typeof y === 'number') {
            this._x = +x;
            this._y = +y;
        }
        else if ((0, interfaces_1.isXY)(x) && (0, interfaces_1.isXY)(y)) {
            this._x = y.x - x.x;
            this._y = y.y - x.y;
        }
    }
    _x;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    _y;
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get norm() {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }
    get normal() {
        return new mathVector(this._y, -this._x);
    }
    get unit() {
        const n = this.norm;
        return new mathVector(this._x / n, this._y / n);
    }
    static scalarProduct(u, v) {
        return u.x * v.x + u.y * v.y;
    }
    projection(on) {
        let x, y;
        return new mathVector(x, y);
    }
    rotate(angle) {
        // Rotate the vector by <angle> degrees.
        // (cos  -sin ) ( x )
        // (sin  cos  ) ( y )
        // => x: cos * x - sin * y
        // => y: sin * x + cos * y
        const rads = +angle * Math.PI / 180, x = +this._x, y = +this._y;
        this._x = Math.cos(rads) * x - Math.sin(rads) * y;
        this._y = Math.sin(rads) * x + Math.cos(rads) * y;
        return this;
    }
    add(v) {
        return new mathVector(this._x + v.x, this._y + v.y);
    }
}
exports.mathVector = mathVector;
class mathLine {
    constructor(A, B) {
        if (B instanceof mathVector) {
            this._A = A;
            this._director = B;
        }
        else {
            return new mathLine(A, new mathVector(A, B));
        }
    }
    _A;
    get A() {
        return this._A;
    }
    set A(value) {
        this._A = value;
    }
    _director;
    get director() {
        return this._director;
    }
    set director(value) {
        this._director = value;
    }
    get normal() {
        return new mathVector(this._director.y, -this._director.x);
    }
    get slope() {
        return this._director.y / this._director.x;
    }
    get ordinate() {
        // A = (a,b)
        // d = (dx,dy)
        // x = a + k.dx => x = 0 => k = -a/dx
        // y = b + k.dy => y = b - a.dy/dx => h = y - mx
        return this._A.y - this._A.x * this.slope;
    }
    getValueAtX(x) {
        // y = mx + h
        return x * this.slope + this.ordinate;
    }
    getValueAtY(y) {
        // x = (y-h)/m
        let slope = this.slope;
        if (isInfinity(slope)) {
            return this._A.x;
        }
        return (y - this.ordinate) / this.slope;
    }
    intersection(value) {
        // (d1): y = m1x+h1
        // (d2): y = m2x+h2
        // m1x+h1  = m2x+h2 => x = (h2-h1)/(m1-m2)
        const m1 = this.slope, h1 = this.ordinate, m2 = value.slope, h2 = value.ordinate;
        let x, y;
        if (m1 === Number.POSITIVE_INFINITY || m1 === Number.NEGATIVE_INFINITY) {
            x = this._A.x;
            y = m2 * x + h2;
        }
        else if (m2 === Number.POSITIVE_INFINITY || m2 === Number.NEGATIVE_INFINITY) {
            x = value.A.x;
            y = m1 * x + h1;
        }
        else {
            x = (h2 - h1) / (m1 - m2);
            y = m1 * x + h1;
        }
        if (x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
            return null;
        }
        return { x, y };
    }
}
exports.mathLine = mathLine;
/** -----------------------------------------
 * numeric expression and shutting yard for expressions.
 *
 */
class NumExp {
    constructor(value, uniformize) {
        this._expression = value;
        try {
            this._rpn = new Shutingyard(ShutingyardMode.NUMERIC).parse(value, uniformize || uniformize === undefined).rpn;
        }
        catch (e) {
            this._rpn = null;
            this._isValid = false;
            console.log(e);
        }
    }
    _rpn;
    get rpn() {
        return this._rpn;
    }
    _expression;
    get expression() {
        return this._expression;
    }
    _isValid;
    get isValid() {
        if (this._isValid === undefined) {
            try {
                const v = this.evaluate({ x: 0 });
            }
            catch {
                this._isValid = false;
            }
        }
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
    }
    evaluate(values) {
        const stack = [];
        if (this._rpn === null) {
            this._isValid = false;
            return 0;
        }
        this.isValid = true;
        for (const element of this._rpn) {
            if (element.tokenType === ShutingyardType.COEFFICIENT) {
                // May be a numeric value or a Fraction.
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token);
                }
                else {
                    console.log('adding Fraction - should not be here ! ');
                    // this._addToStack(stack, new Fraction(element.token).value)
                }
            }
            else if (element.tokenType === ShutingyardType.VARIABLE) {
                if (values && values[element.token] !== undefined) {
                    this._addToStack(stack, +values[element.token]);
                }
            }
            else if (element.tokenType === ShutingyardType.CONSTANT) {
                this._addToStack(stack, tokenConstant[element.token]);
            }
            else if (element.tokenType === ShutingyardType.OPERATION) {
                if (element.token === '*') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a * b);
                }
                else if (element.token === '/') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a / b);
                }
                else if (element.token === '+') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, (+a) + (+b));
                }
                else if (element.token === '-') {
                    const b = stack.pop(), a = stack.pop() || 0;
                    if (b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a - b);
                }
                else if (element.token === '^') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, Math.pow(a, b));
                }
            }
            else if (element.tokenType === ShutingyardType.FUNCTION) {
                const a = stack.pop();
                if (a === undefined) {
                    this.isValid = false;
                }
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a));
                }
                else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a));
                }
                else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a));
                }
                else if (element.token === 'asin') {
                    this._addToStack(stack, Math.asin(a));
                }
                else if (element.token === 'acos') {
                    this._addToStack(stack, Math.acos(a));
                }
                else if (element.token === 'atan') {
                    this._addToStack(stack, Math.atan(a));
                }
                else if (element.token === 'sqrt') {
                    this._addToStack(stack, Math.sqrt(a));
                }
                else if (element.token === 'nthrt') {
                    let b = stack.pop();
                    if (a % 2 === 0 && b < 0) {
                        this._addToStack(stack, NaN);
                    }
                    else {
                        this._addToStack(stack, (b < 0 ? -1 : 1) * Math.pow(Math.abs(b), 1 / a));
                    }
                }
                else if (element.token === 'ln') {
                    this._addToStack(stack, Math.log(a));
                }
                else if (element.token === 'log') {
                    this._addToStack(stack, Math.log10(a));
                }
                else if (element.token === 'abs') {
                    this._addToStack(stack, Math.abs(a));
                }
            }
        }
        if (stack.length === 1) {
            return stack[0];
        }
        else {
            throw `There was a problem parsing: ${this._expression}`;
        }
    }
    _extractDecimalPart(value) {
        let decimal = value.toString();
        if (!decimal.includes('.')) {
            return '';
        }
        decimal = decimal.split('.')[1];
        return decimal.substring(0, decimal.length - 2);
    }
    _addToStack(stack, value) {
        stack.push(numberCorrection(value));
    }
}
exports.NumExp = NumExp;
const tokenConstant = {
    pi: Math.PI,
    e: Math.exp(1)
};
var ShutingyardType;
(function (ShutingyardType) {
    ShutingyardType["VARIABLE"] = "variable";
    ShutingyardType["COEFFICIENT"] = "coefficient";
    ShutingyardType["OPERATION"] = "operation";
    ShutingyardType["CONSTANT"] = "constant";
    ShutingyardType["FUNCTION"] = "function";
    ShutingyardType["MONOM"] = "monom";
})(ShutingyardType || (ShutingyardType = {}));
var ShutingyardMode;
(function (ShutingyardMode) {
    ShutingyardMode["EXPRESSION"] = "expression";
    ShutingyardMode["POLYNOM"] = "polynom";
    ShutingyardMode["NUMERIC"] = "numeric";
})(ShutingyardMode || (ShutingyardMode = {}));
class Shutingyard {
    _mode;
    _tokenConfig;
    _tokenConstant;
    _tokenKeys;
    _uniformize;
    constructor(mode) {
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode;
        this.tokenConfigInitialization();
    }
    _rpn = [];
    // Getter
    get rpn() {
        // console.log(this._rpn)
        return this._rpn;
    }
    get rpnToken() {
        return this._rpn.map(x => x.token);
    }
    tokenConfigInitialization() {
        if (this._mode === ShutingyardMode.NUMERIC) {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'asin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'acos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'atan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'sqrt': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'nthrt': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'ln': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'log': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'abs': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
            this._uniformize = false;
        }
        else if (this._mode === ShutingyardMode.EXPRESSION) {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'asin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'acos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'atan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'sqrt': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'nthrt': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'abs': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
            this._uniformize = true;
        }
        else {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
            };
            this._uniformize = true;
        }
        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length);
        return this._tokenConfig;
    }
    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr, start) {
        let token, tokenType;
        token = '';
        tokenType = '';
        // Case of parenthesis or comma (generic items)
        if (expr[start] === '(') {
            token = '(';
            tokenType = '(';
        }
        // It's a closing parenthese
        else if (expr[start] === ')') {
            token = ')';
            tokenType = ')';
        }
        // It's an argument separator for a function
        else if (expr[start] === ',') {
            token = ',';
            tokenType = 'function-argument';
        }
        else {
            // Extract operation and function tokens
            for (let key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = this._tokenConfig[key].type;
                    break;
                }
            }
            // Extract constant
            for (let key in tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = ShutingyardType.CONSTANT;
                    break;
                }
            }
            if (token === '') {
                // No function found ! Might be a coefficient !
                if (expr[start].match(/[0-9]/)) {
                    if (this._mode === ShutingyardMode.POLYNOM && false) {
                        token = expr.substring(start).match(/^([0-9.,/]+)/)[0];
                    }
                    else {
                        token = expr.substring(start).match(/^([0-9.]+)/)[0];
                    }
                    tokenType = ShutingyardType.COEFFICIENT;
                }
                else if (expr[start].match(/[a-zA-Z]/)) {
                    token = expr.substring(start).match(/^([a-zA-Z])/)[0];
                    tokenType = ShutingyardType.VARIABLE;
                }
                else {
                    console.log('Unidentified token', expr[start], expr, start);
                    token = expr[start];
                    tokenType = ShutingyardType.MONOM;
                }
            }
        }
        return [token, start + token.length, tokenType];
    }
    normalize(expr) {
        if (expr.length === 1) {
            return expr;
        }
        // Get the list of function token.
        let fnToken = [], kToken = [];
        for (let token in this._tokenConfig) {
            if (this._tokenConfig[token].type === ShutingyardType.FUNCTION) {
                fnToken.push(token);
            }
        }
        // sort if from the lengthy to the smallest function
        fnToken.sort((a, b) => b.length - a.length);
        for (let token in tokenConstant) {
            kToken.push(token);
        }
        // sort if from the lengthy to the smallest function
        kToken.sort((a, b) => b.length - a.length);
        let normalizedExpr = "", i = 0, crtToken, nextToken;
        while (i < expr.length - 1) {
            // Check if we have a function token.
            // The function MUST have an open parentheses
            let tokenIdx = 0;
            while (tokenIdx < fnToken.length) {
                let token = fnToken[tokenIdx];
                if (expr.slice(i, i + token.length + 1) === token + '(') {
                    normalizedExpr += token + '(';
                    i += token.length + 1;
                    // Restart the scan for the function token
                    tokenIdx = 0;
                }
                else {
                    // scan for a next function token
                    tokenIdx++;
                }
            }
            // Check for a constant
            tokenIdx = 0;
            while (tokenIdx < kToken.length) {
                let token = kToken[tokenIdx];
                if (expr.slice(i, i + token.length) === token) {
                    // We have found a constant.
                    normalizedExpr += token;
                    i += token.length;
                    // Exit the loop
                    break;
                }
                tokenIdx++;
            }
            // The function token are solved.
            if (i >= expr.length)
                break;
            crtToken = expr[i];
            nextToken = expr[i + 1];
            normalizedExpr += crtToken;
            if (crtToken.match(/[a-zA-Z]/g)) {
                // Current element is a letter.
                // if the next element is a letter, a number or an opening parentheses, add the multiplication sign.
                if (nextToken.match(/[a-zA-Z\d(]/)) {
                    normalizedExpr += '*';
                }
            }
            else if (crtToken.match(/\d/)) {
                // Current element is a number.
                // if the next element is a letter or a parentheses, add the multiplication sign.
                if (nextToken.match(/[a-zA-Z(]/)) {
                    normalizedExpr += '*';
                }
            }
            else if (crtToken === ')') {
                // Current element is a closing parentheses.
                // if the next element is a letter, a number or an opening parentheses, add the multiplication sign
                if (nextToken.match(/[a-zA-Z\d(]/)) {
                    normalizedExpr += '*';
                }
            }
            // Go to next token
            i++;
        }
        // add the last token
        return normalizedExpr + (nextToken !== undefined ? nextToken : '');
    }
    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     * @param uniformize
     */
    parse(expr, uniformize) {
        let outQueue = [], // Output queue
        opStack = [], // Operation queue
        token = '', tokenPos = 0, tokenType = '', previousOpStatckLength = 0;
        // Normalize the input if required.
        if (uniformize || this._uniformize)
            expr = this.normalize(expr);
        let securityLoopLvl1 = 50, securityLoopLvl2_default = 50, securityLoopLvl2;
        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }
            // Get the next token and the corresponding new (ending) position
            [token, tokenPos, tokenType] = this.NextToken(expr, tokenPos);
            if (expr === '2pi') {
                console.log(token, tokenPos, tokenType);
            }
            switch (tokenType) {
                case 'monom':
                case 'coefficient':
                case 'variable':
                case 'constant':
                    outQueue.push({
                        token,
                        tokenType
                    });
                    break;
                case 'operation':
                    previousOpStatckLength = opStack.length;
                    //If the token is an operator, o1, then:
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];
                        securityLoopLvl2 = +securityLoopLvl2_default;
                        //while there is an operator token o2, at the top of the operator stack and
                        while (opTop.token in this._tokenConfig && (
                        //either o1 is left-associative and its precedence is less than or equal to that of o2,
                        (this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                            ||
                                //or o1 is right associative, and has precedence less than that of o2,
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence))) {
                            /* Security exit ! */
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }
                            // Add the operation to the queue
                            outQueue.push((opStack.pop()) || { token: '', tokenType: 'operation' });
                            // Get the next operation on top of the Stack.
                            if (opStack.length === 0) {
                                break;
                            }
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    //at the end of iteration push o1 onto the operator stack
                    opStack.push({ token, tokenType });
                    break;
                case 'function-argument':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 0) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    break;
                case '(':
                    opStack.push({ token, tokenType });
                    // Add an empty value if next element is negative.
                    if (expr[tokenPos] === '-') {
                        outQueue.push({ token: '0', tokenType: 'coefficient' });
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1 /*Maybe zero !? */) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    //Pop the left parenthesis from the stack, but not onto the output queue.
                    opStack.pop();
                    break;
                case 'function':
                    opStack.push({ token, tokenType });
                    break;
                default:
                    // In theory, everything should be handled.
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `);
            }
        }
        this._rpn = outQueue.concat(opStack.reverse());
        return this;
    }
}
//# sourceMappingURL=Calculus.js.map