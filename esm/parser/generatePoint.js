"use strict";
/* Parser point class
A point is define using

A=(3,4)
B=proj A,d
C=sym A,[d,B]
D=vpt
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIntersectionPoint = exports.generateMidPoint = exports.generatePointFromDirection = exports.generatePointFromVector = exports.generateSymmetricPoint = exports.generateProjectionPoint = exports.generatePoint = exports.setPointStyle = void 0;
const Line_1 = require("../figures/Line");
const Point_1 = require("../figures/Point");
const Circle_1 = require("../figures/Circle");
const parseStep_1 = require("./parseStep");
function setPointStyle(pt, style, size) {
    if (size === undefined || size === null) {
        size = +pt.defaultScale;
    }
    if (style === 'o') {
        pt.asCircle(size);
        pt.fill('white').stroke('black');
    }
    else if (style === '*') {
        pt.asCircle(size);
        pt.fill('black').stroke('black');
    }
    else if (style === 'x') {
        pt.asCross();
    }
    else if (style === "sq") {
        pt.asSquare(size);
    }
    else if (style === "tick") {
        pt.asTick(size);
    }
}
exports.setPointStyle = setPointStyle;
function generatePoint(parser, name, code, options) {
    // step should be
    // A=(3,5)->[@,*o,x]
    // The label for the point can be:
    // letters with or without @
    let showCoords = options.includes('@') ||
        options.includes('coords') ||
        options.includes('coord');
    // If the figure exist, no need to continue
    if (parser.graph.getPoint(name))
        return [];
    // analyse the step/code value and extract the data
    if (code.length < 2)
        return [];
    // Create the point
    const pt = parser.graph.point(-100, -100, name, true);
    // pt.hide().hideLabel()
    parser.graph.freeze = true;
    // Move the point
    let stepX = (0, parseStep_1.getStepType)(parser, code.shift()), stepY = (0, parseStep_1.getStepType)(parser, code.shift()), x, y;
    if (stepX.kind === parseStep_1.STEP_KIND.static && stepY.kind === parseStep_1.STEP_KIND.static) {
        let pixels = pt.graph.unitsToPixels({ x: +stepX.item, y: +stepY.item });
        pt.x = pixels.x;
        pt.y = pixels.y;
    }
    else {
        pt.fromCoord(stepX, stepY);
    }
    // By default, use a circle as point
    pt.asCircle();
    if (showCoords) {
        pt.label.isTex = true;
        pt.displayName = `${name} = @`;
    }
    parser.graph.freeze = false;
    return [pt];
}
exports.generatePoint = generatePoint;
function generateProjectionPoint(parser, name, code, options) {
    // let match = [...step.matchAll(/^([A-Z]_?[0-9]?),(([A-Za-z]_?[0-9]?)|(Ox)|(Oy))/g)]
    if (code) {
        let A = parser.graph.getPoint(code[0]), to = ['Ox', 'Oy'].indexOf(code[1]) === -1 ? parser.graph.getFigure(code[1]) : code[1], pt;
        if (to instanceof Line_1.Line || typeof to === 'string') {
            pt = parser.graph.point(0, 0, name).projection(A, to);
        }
        else {
            return [];
        }
        pt.fill('black');
        // pt.label.displayName = name
        return [pt];
    }
    return [];
}
exports.generateProjectionPoint = generateProjectionPoint;
function generateSymmetricPoint(parser, name, code, options) {
    if (code.length > 0) {
        let A = parser.graph.getPoint(code[0]), to = ['Ox', 'Oy'].indexOf(code[1]) === -1 ? parser.graph.getFigure(code[1]) : code[1], pt;
        if (to instanceof Line_1.Line || to instanceof Point_1.Point || typeof to === 'string') {
            return [parser.graph.point(0, 0, name).symmetry(A, to)];
        }
    }
    return [];
}
exports.generateSymmetricPoint = generateSymmetricPoint;
function generatePointFromVector(parser, name, code, options) {
    if (code.length > 0) {
        let kA = code[0], AName = code[0], k;
        // Get the scale
        if (kA.includes("*")) {
            [k, AName] = kA.split("*");
        }
        else {
            k = 1;
        }
        // Get the points.
        let A = parser.graph.getPoint(AName), B = parser.graph.getPoint(code[1]), X = parser.graph.getPoint(code[2]), pt;
        if (A !== null && B !== null) {
            pt = parser.graph
                .point(0, 0, name)
                .fromVector(A, B, +k, X);
            pt.asCircle().svg.fill('black');
            // pt.label.displayName = name
            return [pt];
        }
    }
    return [];
}
exports.generatePointFromVector = generatePointFromVector;
function generatePointFromDirection(parser, name, code, options) {
    let A, d, distance, perp = code[3] === 'p';
    if (code.length >= 3) {
        A = parser.graph.getPoint(code[0]);
        d = parser.graph.getFigure(code[1]);
        if (isNaN(+code[2])) {
            distance = (0, parseStep_1.getStepType)(parser, code[2]);
        }
        else {
            distance = +code[2];
        }
        if (d instanceof Line_1.Line) {
            let pt = parser.graph.point(0, 0, name).fromDirection(A, d, distance, perp);
            pt.asCircle().svg.fill('black');
            return [pt];
        }
    }
    return [];
}
exports.generatePointFromDirection = generatePointFromDirection;
function generateMidPoint(parser, name, code, options) {
    if (code.length > 0) {
        let A = parser.graph.getPoint(code[0]), B = parser.graph.getPoint(code[1]), pt = parser.graph.point(0, 0, name).middleOf(A, B);
        pt.asCircle().svg.fill('black');
        // pt.label.displayName = name
        return [pt];
    }
    return [];
}
exports.generateMidPoint = generateMidPoint;
function generateIntersectionPoint(parser, name, code, options) {
    if (code.length > 0) {
        let d1 = parser.graph.getFigure(code[0]), d2 = parser.graph.getFigure(code[1]);
        if (d1 instanceof Line_1.Line && d2 instanceof Line_1.Line) {
            let pt = parser.graph.point(0, 0, name).intersectionOf(d1, d2);
            if (pt !== null) {
                pt.asCircle().svg.fill('black');
                return [pt];
            }
        }
        if (d1 instanceof Circle_1.Circle && d2 instanceof Line_1.Line) {
            let pt1 = parser.graph.point(0, 0, name + '1').intersectionOf(d2, d1, 1), pt2 = parser.graph.point(0, 0, name + '2').intersectionOf(d2, d1, 2);
            pt1.asCircle().svg.fill('black');
            pt2.asCircle().svg.fill('black');
            return [
                pt1, pt2
            ];
        }
        else if (d1 instanceof Line_1.Line && d2 instanceof Circle_1.Circle) {
            let pt1 = parser.graph.point(0, 0, name + '1').intersectionOf(d1, d2, 1), pt2 = parser.graph.point(0, 0, name + '2').intersectionOf(d1, d2, 2);
            pt1.asCircle().svg.fill('black');
            pt2.asCircle().svg.fill('black');
            return [
                pt1, pt2
            ];
        }
    }
    return [];
}
exports.generateIntersectionPoint = generateIntersectionPoint;
//# sourceMappingURL=generatePoint.js.map