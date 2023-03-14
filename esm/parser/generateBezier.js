"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBezier = void 0;
function generateBezier(parser, name, code, options) {
    let figures = [];
    let bezier = parser.graph.bezier(code);
    figures = [
        bezier
    ];
    return figures;
}
exports.generateBezier = generateBezier;
//# sourceMappingURL=generateBezier.js.map