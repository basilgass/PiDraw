"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = void 0;
class Figure {
    constructor(graph, name) {
        this._freeze = false;
        this._graph = graph;
        this._name = name;
    }
    /**
     * Canvas root object.
     * @type {Graph}
     * @private
     */
    _graph;
    get graph() {
        return this._graph;
    }
    /**
     * Define if the object should update or not.
     * @type {boolean}
     * @private
     */
    _freeze;
    get freeze() {
        return this._freeze;
    }
    set freeze(value) {
        this._freeze = value;
    }
    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    _name;
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    _svg;
    get svg() {
        return this._svg;
    }
    set svg(value) {
        this._svg = value;
    }
    /**
     * Label figure
     * @type {Label}
     * @private
     */
    _label;
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get tex() {
        return ' - ';
    }
    draw() {
        this._freeze = false;
        this.update();
    }
    update() {
        // We don't want to update.
        if (this._freeze || this._graph.freeze) {
            return;
        }
        this.updateFigure();
        if (this._label) {
            this._label.update();
        }
        return this;
    }
    updateFigure() {
        return this;
    }
    updateLabel() {
        return this;
    }
    remove() {
        // Remove the label
        if (this.label) {
            this.label.svg.remove();
            this.label.html.remove();
        }
        // Remove the svg
        this.svg.remove();
        // Remove the item from the graph build list.
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
        if (typeof value === 'string') {
            value = { color: value, opacity: 1 };
        }
        this.svg.stroke(value);
        this.svg.fill(value);
        return this;
    }
    stroke(value) {
        this.svg.stroke(value);
        return this;
    }
    fill(value) {
        if (typeof value === "string") {
            this.svg.fill({ color: value, opacity: 1 });
        }
        else {
            this.svg.fill(value);
        }
        return this;
    }
    hide() {
        this._svg.hide();
        return this;
    }
    show() {
        this._svg.show();
        return this;
    }
    hideLabel() {
        this._label.hide();
        return this;
    }
    showLabel() {
        this._label.show();
        return this;
    }
}
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map