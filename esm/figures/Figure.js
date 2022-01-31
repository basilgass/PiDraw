"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = void 0;
class Figure {
    #graph;
    #freeze;
    #name;
    #label;
    #svg;
    constructor(graph, name) {
        this.#freeze = false;
        this.#graph = graph;
        this.#name = name;
    }
    draw() {
        this.#freeze = false;
        this.update();
    }
    update() {
        if (this.#freeze || this.#graph.freeze) {
            return;
        }
        this.updateFigure();
    }
    updateFigure() {
        return this;
    }
    generateName() {
        return this.#name;
    }
    dash(value) {
        if (typeof value === "number") {
            this.svg.stroke({ 'dasharray': `${value} ${value}` });
        }
        else {
            this.svg.stroke({ 'dasharray': value });
        }
        return this;
    }
    width(value) {
        this.svg.stroke({ width: value });
        return this;
    }
    thin() {
        return this.width(1);
    }
    ultrathin() {
        return this.width(0.5);
    }
    thick() {
        return this.width(2);
    }
    ultrathick() {
        return this.width(3);
    }
    color(value) {
        this.svg.stroke({ color: value });
        return this;
    }
    stroke(value) {
        this.svg.stroke(value);
        return this;
    }
    get freeze() {
        return this.#freeze;
    }
    get name() {
        return this.#name;
    }
    get label() {
        return this.#label;
    }
    get graph() {
        return this.#graph;
    }
    get svg() {
        return this.#svg;
    }
    set freeze(value) {
        this.#freeze = value;
    }
    set name(value) {
        this.#name = value;
    }
    set svg(value) {
        this.#svg = value;
    }
}
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map