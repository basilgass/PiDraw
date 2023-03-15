"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCircle = void 0;
function generateCircle(parser, name, code, options) {
    let figures;
    if (code.length >= 2) {
        let A = parser.graph.getPoint(code.shift()), radius = code.shift();
        figures = [parser.graph.circle(A, isNaN(+radius) ? parser.graph.getPoint(radius) : +radius, name)];
    }
    return figures;
}
exports.generateCircle = generateCircle;
//# sourceMappingURL=generateCircle.js.map