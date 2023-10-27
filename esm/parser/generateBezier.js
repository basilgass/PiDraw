"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBezier = void 0;
function generateBezier(parser, name, code, options) {
    let figures = [];
    const bezierPoints = code.map((pt) => {
        const [ptName, control, ratio] = pt.split("/");
        return {
            point: parser.graph.getPoint(ptName),
            control: control ? control : "smooth",
            ratio: ratio ? +ratio : 0.2
        };
    });
    let bezier = parser.graph.bezier(bezierPoints);
    figures = [
        bezier
    ];
    return figures;
}
exports.generateBezier = generateBezier;
//# sourceMappingURL=generateBezier.js.map