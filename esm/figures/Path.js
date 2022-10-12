"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const Figure_1 = require("./Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
class Path extends Figure_1.Figure {
    _d;
    constructor(graph, name, d) {
        super(graph, name);
        this.svg = this.graph.svg.path().fill('none').stroke({ color: 'black', width: 1 });
        this.generateName();
        this.plot(d);
        return this;
    }
    plot(d) {
        if (this.svg instanceof svg_js_1.Path && d) {
            this.svg.plot(d);
        }
        return this;
    }
    generateName() {
        return super.generateName();
    }
}
exports.Path = Path;
//# sourceMappingURL=Path.js.map