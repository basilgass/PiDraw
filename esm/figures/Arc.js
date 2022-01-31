"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = void 0;
const Figure_1 = require("./Figure");
class Arc extends Figure_1.Figure {
    #center;
    #start;
    #stop;
    constructor(graph, name, center, start, stop) {
        super(graph, name);
        this.#center = center;
        this.#start = start;
        this.#stop = stop;
        this.generateName();
    }
    generateName() {
        if (this.name === undefined) {
            return `a_${this.#start.name}${this.#center.name}${this.#stop.name}`;
        }
        return super.generateName();
    }
}
exports.Arc = Arc;
//# sourceMappingURL=Arc.js.map