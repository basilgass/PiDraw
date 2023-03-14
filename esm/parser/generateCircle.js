"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCircle = void 0;
function generateCircle(parser, name, code, options) {
    let figures;
    if (code.length > 0) {
        let A = parser.graph.getPoint(code[0]), radius = +code[1];
        figures = [parser.graph.circle(A, radius, name)];
    }
    return figures;
}
exports.generateCircle = generateCircle;
//# sourceMappingURL=generateCircle.js.map