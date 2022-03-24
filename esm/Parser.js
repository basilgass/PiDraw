"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Line_1 = require("./figures/Line");
const Plot_1 = require("./figures/Plot");
const geometry_1 = require("pimath/esm/maths/geometry");
class Parser {
    constructor(graph, construction) {
        this._graph = graph;
        this.update(construction);
    }
    update(construction, refresh) {
        if (refresh === true) {
            this.update('');
        }
        this._construction = construction;
        if (!this._buildedSteps) {
            this._buildedSteps = [];
        }
        let steps = this._processConstruction(construction);
        let i;
        for (i = 0; i < this._buildedSteps.length; i++) {
            if (this._buildedSteps[i].step !== steps[i]) {
                for (let j = +i; j < this._buildedSteps.length; j++) {
                    if (this._buildedSteps[j].figures === undefined) {
                        continue;
                    }
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
    updateLayout(parameters) {
        let values = parameters.split(',');
        if (values.length === 4) {
            let xMin = +values[0], xMax = +values[1], yMin = +values[2], yMax = +values[3];
            let pixelsPerUnitX = 800 / (Math.max(xMin, xMax) - Math.min(xMin, xMax));
            this._graph.updateLayout({
                xMin,
                xMax,
                yMin,
                yMax,
                pixelsPerUnit: pixelsPerUnitX
            });
            this.update(this._construction, true);
        }
        return this;
    }
    generate(steps) {
        let name, match, color, assign, builded;
        for (let construct of steps) {
            if (construct.length < 3) {
                continue;
            }
            match = construct.match(/^[A-Za-z0-9_]+/g);
            if (!match) {
                return;
            }
            name = match[0].trim();
            color = null;
            if (construct.includes('->')) {
                color = construct.split('->')[1];
                construct = construct.split('->')[0];
            }
            assign = construct.split('=').map(x => x.trim());
            try {
                if (assign.length === 1) {
                    builded = this._generatePoint(construct);
                }
                else if (assign.length === 2 || assign.length === 3) {
                    if (this._graph.getFigure(name)) {
                        continue;
                    }
                    let constr = assign[1], key = constr.match(/^[a-z]+\s/g);
                    if (assign.length === 3) {
                        constr = constr + '=' + assign[2];
                    }
                    if (constr === '') {
                        break;
                    }
                    if (key === null) {
                        let checkFx = assign[0].match(/^[a-zA-z_0-9]+\(x\)/g);
                        if (checkFx) {
                            builded = this._generatePlot(name, constr);
                        }
                        else {
                            if (constr[0] === 'v') {
                                builded = this._generateVector(name, constr);
                            }
                            else {
                                builded = this._generateLineThroughTwoPoints(name, constr);
                            }
                        }
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
                        else if (constructKey === 'fill') {
                            builded = this._generateFillBetween(name, constr);
                        }
                        else if (constructKey === 'line') {
                            builded = this._generateLine(name, constr);
                        }
                    }
                }
            }
            catch {
                console.error('There was an error building', {
                    name: name,
                    step: construct
                });
            }
            builded.step = construct;
            if (color !== null) {
                for (let fig of builded.figures) {
                    fig.color(color);
                }
            }
            this._buildedSteps.push(builded);
        }
    }
    _processConstruction(construction) {
        return construction.split('\n').map(x => x.trim()).filter(x => x !== '');
    }
    _generatePoint(step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9_]*@?)\((-?[0-9.]+)[,;](-?[0-9.]+)\)(\*?)/g)], figures;
        if (match.length > 0) {
            let name = match[0][1].includes('@') ? match[0][1].slice(0, -1) : match[0][1], x = +match[0][2], y = +match[0][3], label = match[0][1].includes('@') ? `${name}(${x},${y})` : name;
            if (this._graph.getPoint(name)) {
                return { step, figures };
            }
            if (isNaN(x) || isNaN(y)) {
                return { step, figures };
            }
            const pt = this._graph.point(x, y, name);
            pt.label.displayName = label;
            if (match[0].length >= 3) {
                if (match[0][4] === '*') {
                    pt.asCircle();
                }
            }
            figures = [pt];
        }
        return { step, figures };
    }
    _generateVector(name, step) {
        let match = [...step.matchAll(/^v([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(A, B, null, name).asVector()];
        }
        return { figures, step };
    }
    _generateLineThroughTwoPoints(name, step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(A, B, null, name)];
        }
        return { figures, step };
    }
    _generateLine(name, step) {
        let match = step.split('line ')[1], figures;
        if (match.includes(',')) {
            let pointSlope = match.split(',');
            let A = this._graph.getPoint(pointSlope[0]);
            figures = [this._graph.line(A, null, {
                    rule: Line_1.LINECONSTRUCTION.SLOPE,
                    value: pointSlope[1]
                }, name)];
        }
        else if (match.includes('=')) {
            let equ = new geometry_1.Line(match);
            let A = this._graph.point(0, equ.getValueAtX(0).value);
            A.hide().label.hide();
            figures = [
                A,
                this._graph.line(A, null, {
                    rule: Line_1.LINECONSTRUCTION.SLOPE,
                    value: equ.slope.value
                })
            ];
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
            figures = [this._graph.circle(A, radius, name)];
        }
        return { figures, step };
    }
    _generatePlot(name, step) {
        let figures;
        let domain = this._graph.unitXDomain, fx = step;
        if (step.includes(',')) {
            let values = step.split(',');
            if (values.length >= 3) {
                let x = +values[1], y = +values[2];
                if (!isNaN(x) && !isNaN(y)) {
                    domain.min = x;
                    domain.max = y;
                }
            }
            fx = values[0];
        }
        figures = [this._graph.plot(fx, {
                samples: 100,
                domain
            }, name)];
        return { figures, step };
    }
    _generateFillBetween(name, step) {
        let figures = [], match, f = null, g = null, min, max;
        match = [...step.matchAll(/fill ([a-z]),?([a-z])?.?(([\-\d.]+),([\-\d.]+))?/g)];
        if (match.length > 0) {
            f = match[0][1] || null;
            g = match[0][2] || null;
            min = +match[0][4] || this._graph.unitXDomain.min;
            max = +match[0][5] || this._graph.unitXDomain.max;
        }
        if (f !== null) {
            let FX = this._graph.getFigure(f), GX = g !== null ? this._graph.getFigure(g) : null;
            if (FX instanceof Plot_1.Plot) {
                figures = [FX.fillBetween((GX instanceof Plot_1.Plot) ? GX : null, min, max)];
            }
        }
        return { figures, step };
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map