"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Line_1 = require("./figures/Line");
const Plot_1 = require("./figures/Plot");
const line_1 = require("pimath/esm/maths/geometry/line");
const Point_1 = require("./figures/Point");
class Parser {
    figures;
    step;
    _buildedSteps; // {'A(4,6)': ['A']} {step: [list of object names]}
    _construction;
    _graph;
    constructor(graph, construction) {
        this._graph = graph;
        this.update(construction);
    }
    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     * @param refresh
     */
    update(construction, refresh) {
        if (refresh === true) {
            // Reset the construction
            this.update('');
        }
        // Keep the construction value
        this._construction = construction;
        // Initialize the built steps
        if (!this._buildedSteps) {
            this._buildedSteps = [];
        }
        // Build sanitize the build array.
        let steps = this._processConstruction(construction);
        // Remove all figures and builded steps.
        let i;
        for (i = 0; i < this._buildedSteps.length; i++) {
            // Go through each already built steps.
            // It must be the same than the current one, in this order !
            if (this._buildedSteps[i].step !== steps[i]) {
                // Not the same step ! Everything after this must be removed from the graph!
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
        // Build the new steps from the current point
        this.generate(steps.slice(i));
    }
    updateLayout(parameters) {
        // TODO: add segment and half-rule
        // TODO: parse the values using regex
        // x=3:-5,y=-5:2                            min/max
        // dx=20,dy=12                              number of units
        // ppu=50                                   pixels per unit
        // grid/nogrid                              show / hide grid
        // axes/miniaxes/noaxes                     show full axes, min axes (one unit long), hide axis
        // origin=bl/bc/br/ml/mc/mr/tl/tc/tr/mc     place the origin to top, bottom, middle, left, center or right
        let values = parameters.split(',');
        let xMin = -1, xMax = 10, yMin = -1, yMax = 10;
        if (values.length >= 4) {
            xMin = +values[0];
            xMax = +values[1];
            yMin = +values[2];
            yMax = +values[3];
        }
        let pixelsPerUnitX = this._graph.width / (Math.max(xMin, xMax) - Math.min(xMin, xMax));
        this._graph.updateLayout({
            xMin,
            xMax,
            yMin,
            yMax,
            pixelsPerUnit: pixelsPerUnitX
        });
        this.update(this._construction, true);
        return this;
    }
    preprocess(step) {
        let label = "", key = "", code = "", options = [], value = step + '';
        // Remove the options.
        if (value.includes('->')) {
            let arr = value.split('->');
            // The last item from the array is the option string
            options = arr.pop().split(',');
            // Rebuilt the value, without the option
            value = arr.length > 1 ? arr.join('->') : arr[0];
        }
        // Get the label and the key - code
        if (value.includes('=')) {
            let arr = value.split('=');
            // First item of the array concern the label
            label = arr.shift();
            // Rebuit the rest of the value string
            value = arr.length > 1 ? arr.join('=') : arr[0];
            // Get the key
            arr = value.trim().split(' ');
            if (arr.length === 1) {
                // special case of line, segment, vector or plot
                if (arr[0][0] === 'v') {
                    key = 'v';
                    code = arr[0].substring(1);
                }
                else if ([']', '['].includes(arr[0][0])) {
                    key = 'line';
                    code = arr[0];
                }
                else if (label.match(/^[a-zA-z_0-9]+\(x\)/g)) {
                    key = 'plot';
                    code = arr[0];
                }
                else {
                    key = 'line';
                    code = arr[0];
                }
            }
            else {
                key = arr.shift();
                code = arr.join(' ');
            }
        }
        else {
            // special case of a point
            label = value.split('(')[0];
            key = 'pt';
            code = value.substring(label.length);
        }
        return {
            label,
            key,
            code,
            options
        };
    }
    generate(steps) {
        // get all current figures.
        let builded;
        for (let construct of steps) {
            // The step command is empty or too small - do not continue to parse it.
            if (construct.length < 3) {
                continue;
            }
            if (!construct.match(/^[A-Za-z0-9_]+/g)) {
                console.log('The current step is not a valid step: ', construct);
                continue;
            }
            // Current building steps.
            builded = {
                step: construct,
                figures: []
            };
            // Preprocess the step
            let { label, key, code, options } = this.preprocess(construct);
            // console.log(construct, label, key, code, options)
            switch (key) {
                case 'pt':
                    builded.figures = this._generatePoint(label, code);
                    break;
                case 'mid':
                    builded.figures = this._generateMidPoint(label, code);
                    break;
                case 'v':
                    builded.figures = this._generateVector(label, code);
                    break;
                case 'line':
                    builded.figures = this._generateLine(label, code);
                    break;
                case 'perp':
                    builded.figures = this._generatePerpendicular(label, code);
                    break;
                case 'para':
                    builded.figures = this._generateParallel(label, code);
                    break;
                case 'circ':
                    builded.figures = this._generateCircle(label, code);
                    break;
                case 'plot':
                    builded.figures = this._generatePlot(label, code);
                    break;
                case 'zone':
                    builded.figures = this._generateFillBetween(label, code);
                    break;
                default:
                    console.log('No key found for ' + construct);
                    continue;
            }
            // change the color or settings
            this._postprocess(builded, options);
            // Do whatever check
            this._buildedSteps.push(builded);
        }
    }
    _postprocess(builded, options) {
        if (options.length > 0) {
            options.forEach(el => {
                builded.figures.forEach(fig => {
                    if (el === 'drag' && fig instanceof Point_1.Point) {
                        fig.draggable(this._graph.getGrid());
                    }
                    else if (el === 'dash') {
                        fig.dash(this._graph.pixelsPerUnit.x / 4);
                    }
                    else if (el === 'dot') {
                        fig.dash(`2 ${this._graph.pixelsPerUnit.x / 4}`);
                    }
                    else if (el === 'thick') {
                        fig.thick();
                    }
                    else if (el === 'thin') {
                        fig.thin();
                    }
                    else if (el === 'ultrathick') {
                        fig.ultrathick();
                    }
                    else if (el === 'ultrathin') {
                        fig.ultrathin();
                    }
                    else {
                        fig.color(el);
                    }
                });
            });
        }
    }
    /**
     * Parse the main input string and sanitize it.
     * @param {string} construction
     * @returns {string[]}
     * @private
     */
    _processConstruction(construction) {
        return construction.split('\n').map(x => x.trim()).filter(x => x !== '');
    }
    _generatePoint(name, step) {
        // The label for the point can be:
        // letters with or without @
        let showCoords = name.includes('@'), figures;
        // Update the name to remove the @ sign
        name = name.split('@')[0];
        // If the figure exist, no need to continue
        if (this._graph.getPoint(name)) {
            return figures;
        }
        // analyse the step/code value and extract the data
        let match = [...step.matchAll(/^\((-?[0-9.]+)[,;](-?[0-9.]+)\)(\*?)/g)].shift();
        if (match === undefined || match.length < 2)
            return figures;
        // Everything should be fine now
        let x = +match[1], y = +match[2], label = showCoords ? `${name}(${x},${y})` : name;
        // The point already exists
        if (this._graph.getPoint(name))
            return figures;
        // The coordinates aren't a number
        if (isNaN(x) || isNaN(y))
            return figures;
        // Create the point
        const pt = this._graph.point(x, y, name);
        pt.label.displayName = label;
        if (match.length >= 3) {
            if (match[3] === '*') {
                pt.asCircle();
            }
        }
        // Generate and return the figures.
        figures = [pt];
        return figures;
    }
    _generateVector(name, step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(A, B, null, name).asVector()];
        }
        return figures;
    }
    _generateLineThroughTwoPoints(name, step, segmentStart, segmentEnd) {
        let match = [...step.matchAll(/^[\[\]]?([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)[\[\]]?/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]);
            let line = this._graph.line(A, B, null, name);
            line.segmentStart = segmentStart;
            line.segmentEnd = segmentEnd;
            figures = [line];
        }
        return figures;
    }
    _generateLine(name, step) {
        let figures;
        if (step.includes(',')) {
            // type is      d = line A,3/4      Point through and slope
            let pointSlope = step.split(',');
            // Get another point
            let A = this._graph.getPoint(pointSlope[0]);
            // Get the figures.
            figures = [this._graph.line(A, null, {
                    rule: Line_1.LINECONSTRUCTION.SLOPE,
                    value: pointSlope[1]
                }, name)];
        }
        else if (step.includes('=')) {
            // type is      d = line 3x-2y=0    From equation
            let equ = new line_1.Line(step);
            if (equ.equation.variables.includes('y')) {
                // Get the point
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
            else {
                // It's a vertical line.
                let x = equ.getValueAtY(0).value;
                let A = this._graph.point(x, 0), B = this._graph.point(x, 1);
                A.hide().label.hide();
                B.hide().label.hide();
                figures = [
                    A, B,
                    this._graph.line(A, B)
                ];
            }
        }
        else {
            // Must check if it's a segment or not.
            let segmentStart = step[0] === '[', segmentEnd = step[step.length - 1] === ']';
            return this._generateLineThroughTwoPoints(name, step, segmentStart, segmentEnd);
        }
        return figures;
    }
    _generateMidPoint(name, step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), B = this._graph.getPoint(match[0][2]), pt = this._graph.point(0, 0, name).middleOf(A, B);
            pt.asCircle().svg.fill('black');
            // pt.label.displayName = name
            figures = [pt];
        }
        return figures;
    }
    _generatePerpendicular(name, step) {
        let match = [...step.matchAll(/^([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]), P = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(P, null, {
                    rule: Line_1.LINECONSTRUCTION.PERPENDICULAR,
                    value: d
                }, name)];
        }
        return figures;
    }
    _generateParallel(name, step) {
        let match = [...step.matchAll(/^([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)], figures;
        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]), P = this._graph.getPoint(match[0][2]);
            figures = [this._graph.line(P, null, {
                    rule: Line_1.LINECONSTRUCTION.PARALLEL,
                    value: d
                }, name)];
        }
        return figures;
    }
    _generateCircle(name, step) {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?),([0-9.]+)/g)], figures;
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]), radius = +match[0][2];
            figures = [this._graph.circle(A, radius, name)];
        }
        return figures;
    }
    _generatePlot(name, step) {
        let figures;
        let domain = this._graph.unitXDomain, fx = step;
        // Domain of the function
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
        // Plottings
        // PLot the function
        figures = [this._graph.plot(fx, {
                samples: 100,
                domain
            }, name)];
        return figures;
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
            // Get the main figure
            let FX = this._graph.getFigure(f), GX = g !== null ? this._graph.getFigure(g) : null;
            if (FX instanceof Plot_1.Plot) {
                figures = [FX.fillBetween((GX instanceof Plot_1.Plot) ? GX : null, min, max)];
            }
        }
        /**
         f(x)=3/2*x+1
         g(x)=1/2*x+3
         zone=fill f,g 3,6
         */
        return figures;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map