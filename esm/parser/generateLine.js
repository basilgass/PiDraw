"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVector = exports.generateTangent = exports.generateParallel = exports.generatePerpendicular = exports.generateLine = void 0;
const Line_1 = require("../figures/Line");
const Calculus_1 = require("../Calculus");
function generateLine(parser, name, code, options) {
    // d=line A,3/4     code: [A,3/4]
    // d=2x-3y=5        code: [2x-3y=5]
    // d=AB             code: [A,B]
    if (code.length === 1) {
        // Get the point
        let left = parseLine(code[0].split('=')[0]), right = parseLine(code[0].split('=')[1]);
        // Get the cartesian ax+by+c=0
        let a = left.a - right.a, b = left.b - right.b, c = left.c - right.c;
        // ax + by + c = 0
        // director = (-b, a)
        // A = (0, -c/b)
        let A;
        if (b !== 0) {
            A = parser.graph.point(0, -c / b);
        }
        else if (a !== 0) {
            A = parser.graph.point(-c / a, 0);
        }
        else {
            return null;
        }
        A.hide().label.hide();
        return [
            A,
            parser.graph.line(A, null, {
                rule: Line_1.LINECONSTRUCTION.SLOPE,
                value: -a / b
            }, name)
        ];
    }
    else if (code.length >= 2) {
        let A, B, slope;
        A = parser.graph.getPoint(code.shift());
        if (A === null)
            return [];
        B = parser.graph.getPoint(code[0]);
        if (B === null) {
            slope = +code[0];
            if (isNaN(slope)) {
                return [];
            }
            return [parser.graph.line(A, null, {
                    rule: Line_1.LINECONSTRUCTION.SLOPE,
                    value: slope
                }, name)];
        }
        code.shift();
        // Must check if it's a segment or not.
        let segmentStart = code[0] === 'segment', segmentEnd = code[1] === 'segment';
        let line = parser.graph.line(A, B, null, name);
        line.segmentStart = segmentStart;
        line.segmentEnd = segmentEnd;
        return [line];
    }
    return [];
}
exports.generateLine = generateLine;
function generatePerpendicular(parser, name, code, options) {
    let figures;
    if (code.length >= 2) {
        let d = parser.graph.getFigure(code.shift()), P = parser.graph.getPoint(code.shift());
        figures = [parser.graph.line(P, null, {
                rule: Line_1.LINECONSTRUCTION.PERPENDICULAR,
                value: d
            }, name)];
    }
    return figures;
}
exports.generatePerpendicular = generatePerpendicular;
function generateParallel(parser, name, code, options) {
    if (code.length >= 2) {
        let d = parser.graph.getFigure(code.shift()), P = parser.graph.getPoint(code.shift()), k = code[0] !== undefined ? +code[0] : 0;
        return [parser.graph.line(P, null, {
                rule: Line_1.LINECONSTRUCTION.PARALLEL,
                value: d
            }, name)];
    }
    return [];
}
exports.generateParallel = generateParallel;
function generateTangent(parser, name, code, options) {
    if (code.length >= 2) {
        let c = parser.graph.getFigure(code.shift()), P = parser.graph.getPoint(code.shift()), k = code[0] === undefined ? 1 : +code[0];
        // there are potentially TWO tangents.
        // The point name is generated:
        // name = t => t1 and t2
        // TODO: tangent : get the two lines in one round.
        return [
            parser.graph.line(P, null, {
                rule: Line_1.LINECONSTRUCTION.TANGENT,
                value: c,
                k: 1
            }, name + '1'),
            parser.graph.line(P, null, {
                rule: Line_1.LINECONSTRUCTION.TANGENT,
                value: c,
                k: 2
            }, name + '2')
        ];
    }
    return [];
}
exports.generateTangent = generateTangent;
function generateVector(parser, name, code, options) {
    let figures;
    if (code.length > 0) {
        let A = parser.graph.getPoint(code.shift()), B = parser.graph.getPoint(code.shift());
        let k = code.length > 0 ? +code[0] : 1;
        let v = parser.graph.line(A, B, null, name).asVector(true, k);
        figures = [v];
    }
    return figures;
}
exports.generateVector = generateVector;
function parseLine(equ) {
    const x = equ.match(/([-0-9/.]+)x/g), y = equ.match(/([-0-9/.]+)y/g);
    let dx, dy, dc;
    if (x && x[0].endsWith('x')) {
        equ = equ.replace(x[0], "");
        dx = x[0].substring(0, x[0].length - 1);
        if (dx.includes('/')) {
            let [n, d] = dx.split('/');
            dx = (+n) / (+d);
        }
    }
    else {
        dx = equ.includes('x') ? 1 : 0;
    }
    if (y && y[0].endsWith('y')) {
        equ = equ.replace(y[0], "");
        dy = y[0].substring(0, y[0].length - 1);
        if (dy.includes('/')) {
            let [n, d] = dy.split('/');
            dy = (+n) / (+d);
        }
    }
    else {
        dy = equ.includes('y') ? 1 : 0;
    }
    let c = equ.match(/([-0-9./]+)(?![xy])/);
    if (c) {
        if (c[0].includes('/')) {
            let [n, d] = c[0].split('/');
            dc = (+n) / (+d);
        }
        else {
            dc = +c[0];
        }
    }
    else {
        dc = 0;
    }
    if ((0, Calculus_1.isInfinity)(+dx))
        dx = 0;
    if ((0, Calculus_1.isInfinity)(+dy))
        dy = 0;
    if ((0, Calculus_1.isInfinity)(+dc))
        dc = 0;
    return { a: +dx, b: +dy, c: +dc };
}
//# sourceMappingURL=generateLine.js.map