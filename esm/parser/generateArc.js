"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArc = void 0;
function generateArc(parser, name, code, options) {
    let figures, showAngle = options.includes("coord");
    name = name.split('@')[0];
    if (code.length > 0) {
        let A = parser.graph.getPoint(code[0]), O = parser.graph.getPoint(code[1]), B = parser.graph.getPoint(code[2]), radiusValue = code[3] === undefined ? undefined : code[3], radius;
        if (isNaN(+radiusValue)) {
            radius = parser.graph.getPoint(radiusValue);
        }
        else {
            radius = parser.graph.distanceToPixels(+radiusValue);
        }
        const arc = parser.graph.arc(A, O, B, radius, name);
        if (showAngle) {
            arc.label.isTex = true;
            arc.displayName = `${name} = @°`;
        }
        figures = [arc];
    }
    return figures;
}
exports.generateArc = generateArc;
//# sourceMappingURL=generateArc.js.map