"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePolygon = void 0;
function generatePolygon(parser, name, code, options) {
    let figures;
    if (code.length > 2) {
        let polyPoints = code.map(pt => parser.graph.getPoint(pt)).filter(x => x !== null);
        figures = [parser.graph.polygon(polyPoints)];
    }
    return figures;
}
exports.generatePolygon = generatePolygon;
//# sourceMappingURL=generatePolygon.js.map