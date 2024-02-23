"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStep = exports.getStepType = exports.STEP_KIND = exports.STEP_TYPE = void 0;
const Point_1 = require("../figures/Point");
var STEP_TYPE;
(function (STEP_TYPE) {
    STEP_TYPE["number"] = "number";
    STEP_TYPE["point"] = "point";
    STEP_TYPE["figure"] = "figure";
    STEP_TYPE["option"] = "option";
})(STEP_TYPE || (exports.STEP_TYPE = STEP_TYPE = {}));
var STEP_KIND;
(function (STEP_KIND) {
    STEP_KIND[STEP_KIND["static"] = 0] = "static";
    STEP_KIND[STEP_KIND["dynamic"] = 1] = "dynamic";
})(STEP_KIND || (exports.STEP_KIND = STEP_KIND = {}));
/**
 * getStepType extract the value type.
 * It can be the following values:
 *    3 or 3.5 => a number, static
 *    3/7 => a number, static
 *    A.x => a number, dynamic
 *    A:B => distance from A ot B, dynamic
 *    A or A3 => a point, dynamic
 *    d, f1 => a figure, dynamic
 * @param value
 *
 */
function getStepType(parser, value) {
    // It's a number
    if (!isNaN(+value)) {
        return {
            type: STEP_TYPE.number,
            kind: STEP_KIND.static,
            item: +value
        };
    }
    // It's a number as fraction
    if (value.includes('/')) {
        const [den, num] = value.split("/"), v = +num / +den;
        if (!isNaN(v)) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.static,
                item: v
            };
        }
    }
    // It's a dynamic number based on a plot
    if (value.match(/[a-z]\(.*/)) {
        const v = getStepType(parser, value.split('(')[1].split(')')[0]);
        const f = parser.graph.getFigure(value.split('(')[0]);
        return {
            type: STEP_TYPE.number,
            kind: STEP_KIND.dynamic,
            item: [f, v],
            option: 'function'
        };
        // return {
        //     type: STEP_TYPE.number,
        //     kind: STEP_KIND.dynamic,
        //     item: v.item,
        //     option: value.split('(')[0]
        // }
    }
    // It's a dynamic number based on a point
    if (value.endsWith('.x') || value.endsWith('.y')) {
        const [name, option] = value.split('.'), A = parser.graph.getPoint(name);
        if (A !== null) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.dynamic,
                item: A,
                option
            };
        }
    }
    // It's a dynamic number bases on a distance between two points (or a point and an object).
    if (value.includes(':')) {
        let [nameA, nameB] = value.split(":"), direction = 1;
        if (nameA[0] === '-') {
            direction = -1;
            nameA = nameA.substring(1);
        }
        let A = parser.graph.getPoint(nameA), B = parser.graph.getPoint(nameB);
        if (A !== null && B !== null) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.dynamic,
                item: [A, B, direction],
                option: 'distance'
            };
        }
    }
    // Get the figure or maybe the point
    let F = parser.graph.getFigure(value);
    if (F !== null) {
        return {
            type: (F instanceof Point_1.Point) ? STEP_TYPE.point : STEP_TYPE.figure,
            kind: STEP_KIND.dynamic,
            item: F
        };
    }
    // Get anything else...
    return {
        type: STEP_TYPE.option,
        kind: STEP_KIND.static,
        item: value
    };
}
exports.getStepType = getStepType;
function parseStep(parser, step, template) {
    const data = step.split(',');
    let figures = [];
    if (data.length === 1) {
        // Handle special cases
        // TODO: parseStep: handel special case when data is of length 1.
    }
    for (let i = 0; i < template.length; i++) {
        if (data.length < i) {
            return figures;
        }
        if (data[i] === undefined || data[i] === "") {
            return [];
        }
        if (template[i] === STEP_TYPE.number) {
            // can be a
            // number 3 or 3.5
            // fraction 2/5
            // point coordinate A.x or A.y
            // a distance between two points A:B
            // a calculation ?
            if (!isNaN(+data[i])) {
                figures.push(+data[i]);
            }
            else if (data[i].includes("/")) {
                const [num, den] = data[i].split('/'), v = +num / +den;
                if (!isNaN(v)) {
                    figures.push(+v);
                }
            }
            else if (data[i].endsWith('.x') || data[i].endsWith('.y')) {
                const pt = parser.graph.getPoint(data[i].split('.')[0]);
                if (pt !== null) {
                    figures.push(data[i].endsWith('.x') ? pt.coord.x : pt.coord.y);
                }
            }
            else if (data[i].includes(':')) {
                const [Aname, Bname] = data[i].split(':'), A = parser.graph.getPoint(Aname), B = parser.graph.getPoint(Bname);
                if (A !== null && B !== null) {
                    figures.push(parser.graph.distanceToUnit(A.getDistanceTo(B)));
                }
            }
            else {
                console.warn(`Unsupported number value for ${data[i]}`);
            }
        }
        if (template[i] === STEP_TYPE.point) {
            // can be
            // - a simple point by name A, A2, ...
            // - a point on a line.
            // - a point on a circle
            const F = parser.graph.getPoint(data[i]);
            if (F !== null) {
                figures.push(F);
            }
            else {
                // Special case... to be done.
                console.warn(`Unsupported point value for ${data[i]}`);
            }
        }
        if (template[i] === STEP_TYPE.figure) {
            const F = parser.graph.getFigure(data[i]);
            if (F !== null) {
                figures.push(F);
            }
            else {
                console.warn(`Unsupported figure value for ${data[i]}`);
            }
        }
    }
    return figures;
}
exports.parseStep = parseStep;
//# sourceMappingURL=parseStep.js.map