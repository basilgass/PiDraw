"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = void 0;
class Figure {
    constructor(graph, name) {
        this._freeze = false;
        this._graph = graph;
        this._name = name;
    }
    _graph;
    get graph() {
        return this._graph;
    }
    _freeze;
    get freeze() {
        return this._freeze;
    }
    set freeze(value) {
        this._freeze = value;
    }
    _name;
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    _svg;
    get svg() {
        return this._svg;
    }
    set svg(value) {
        this._svg = value;
    }
    _label;
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    draw() {
        this._freeze = false;
        this.update();
    }
    update() {
        if (this._freeze || this._graph.freeze) {
            return;
        }
        this.updateFigure();
        if (this._label) {
            this._label.update();
        }
    }
    updateFigure() {
        return this;
    }
    updateLabel() {
        return this;
    }
    remove() {
        if (this.label) {
            this.label.svg.remove();
        }
        this.svg.remove();
        if (this.graph.points[this.name] !== undefined) {
            delete this.graph.points[this.name];
        }
        for (let i = 0; i < this.graph.figures.length; i++) {
            if (this.graph.figures[i].name === this.name) {
                this.graph.figures.splice(i, 1);
            }
        }
    }
    generateName() {
        return this._name;
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
}
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map