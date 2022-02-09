"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Line_1 = require("./figures/Line");
class Parser {
    figures;
    step;
    _graph;
    _buildedSteps;
    constructor(graph, construction) {
        this._graph = graph;
        this.update(construction);
    }
    update(construction) {
        if (!this._buildedSteps) {
            this._buildedSteps = [];
        }
        let steps = this._processConstruction(construction);
        let i;
        for (i = 0; i < this._buildedSteps.length; i++) {
            if (this._buildedSteps[i].step !== steps[i]) {
                for (let j = i; j < this._buildedSteps.length; j++) {
                    for (let fig of this._buildedSteps[j].figures) {
                        fig.remove();
                    }
                }
                this._buildedSteps = this._buildedSteps.slice(0, i);
                break;
            }
        }
        this.generate(steps.slice(i));
    }
    generate(steps) {
        let name, match, assign, builded;
        for (let construct of steps) {
            if (construct.length < 3) {
                continue;
            }
            match = construct.match(/^[A-Za-z0-9_]+/g);
            if (!match) {
                return;
            }
            name = match[0].trim();
            assign = construct.split('=');
            if (assign.length === 1) {
                builded = this._generatePoint(construct);
            }
            else if (assign.length === 2) {
                if (this._graph.getFigure(name)) {
                    continue;
                }
                let constr = assign[1].trim(), key = constr.match(/^[a-z]+\s/g);
                if (key === null) {
                    builded = this._generateLine(name, constr);
                }
                else {
                    let constructKey = key[0].trim();
                    if (constructKey === 'mid') {
                        builded = this._generateMidPoint(name, constr);
                    }
                    else if (constructKey === 'perp') {
                        builded = this._generatePerpendicular(name, constr);
                    }
                    else if (constructKey === 'para') {
                        builded = this._generateParallel(name, constr);
                    }
                    else if (constructKey === 'circ') {
                        builded = this._generateCircle(name, constr);
                    }
                }
            }
            builded.step = construct;
            this._buildedSteps.push(builded);
        }
    }
    _processConstruction(construction) {
        return construction.split('\n').map(x => x.trim()).filter(x => x !== '');
    }
    _generatePoint(step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)\(([0-9.]+)[,;]([0-9.]+)\)/g)], figures;
        if (match.length > 0) {
            let name = match[0][1], x = +match[0][2], y = +match[0][3];
            if (this._graph.getPoint(name)) {
                return { step, figures };
            }
            if (isNaN(x) || isNaN(y)) {
                return { step, figures };
            }
            figures = [this._graph.point(x, y, name)];
        }
        return { step, figures };
    }
    _generateLine(name, step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(A, B, null, name)];
        }
        return { figures, step };
    }
    _generateMidPoint(name, step) {
        let match = [...step.matchAll(/^mid ([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            figures = [this._graph.point(0, 0, name).middleOf(A, B)];
        }
        return { figures, step };
    }
    _generatePerpendicular(name, step) {
        let match = [...step.matchAll(/^perp ([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]), P = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(P, null, {
                    rule: Line_1.LINECONSTRUCTION.PERPENDICULAR,
                    value: d
                }, name)];
        }
        return { figures, step };
    }
    _generateParallel(name, step) {
        let match = [...step.matchAll(/^para ([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]), P = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(P, null, {
                    rule: Line_1.LINECONSTRUCTION.PARALLEL,
                    value: d
                }, name)];
        }
        return { figures, step };
    }
    _generateCircle(name, step) {
        let match = [...step.matchAll(/^circ ([A-Z]_?[0-9]?),([0-9.]+)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), radius = +match[0][2];
            figures = [this._graph.circle(A, radius)];
        }
        return { figures, step };
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map