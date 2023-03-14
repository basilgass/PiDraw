"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFillBetween = exports.generateParametricPlot = exports.generatePlot = exports.updatePlot = void 0;
const Plot_1 = require("../figures/Plot");
function updatePlot(parser, BStep, fx) {
    if (BStep.figures.length > 0 && BStep.figures[0] instanceof Plot_1.Plot) {
        // Modify the plot.
        BStep.figures[0].plot(fx, 100);
        return true;
    }
    else {
        return false;
    }
}
exports.updatePlot = updatePlot;
function generatePlot(parser, name, code, options) {
    let figures;
    // f=plot func,min:max,@500,follow
    let domain = parser.graph.unitXDomain, fx = code.shift(), 
    // fx = step.split(',')[0],//.split('@')[0],
    samples = 100;
    // Get the samples
    for (let check in code) {
        if (check.startsWith("@")) {
            samples = +check.substring(1);
        }
        if (check.includes(":")) {
            [domain.min, domain.max] = check.split(":").map(x => +x);
        }
    }
    let plot = parser.graph.plot(fx, {
        samples,
        domain,
        animate: false
    }, name);
    // Must follow ?
    if (code.includes('follow')) {
        plot.follow(true);
    }
    // Plottings
    // PLot the function
    figures = [plot];
    return figures;
}
exports.generatePlot = generatePlot;
function generateParametricPlot(parser, name, code, options) {
    let figures;
    if (code.length < 3) {
        return [];
    }
    let fx = code[0], fy = code[1], a = !isNaN(+code[2]) ? +code[2] : 0, b = !isNaN(+code[3]) ? +code[3] : 2 * Math.PI;
    figures = [
        parser.graph.parametric(fx, fy, {
            samples: 100,
            domain: {
                min: Math.min(a, b),
                max: Math.max(a, b)
            },
            animate: false
        })
    ];
    return figures;
}
exports.generateParametricPlot = generateParametricPlot;
function generateFillBetween(parser, name, code, options) {
    let figures = [], f = null, g = null, min = parser.graph.unitXDomain.min, max = parser.graph.unitXDomain.max;
    if (code.length > 0) {
        f = code.shift();
        if (code[0] !== undefined && !code[0].includes(":")) {
            g = code.shift();
        }
        if (code[0] !== undefined && code[0].includes(":")) {
            [min, max] = code.shift().split(":").map(x => +x);
        }
    }
    if (f !== null) {
        // Get the main figure
        let FX = parser.graph.getFigure(f), GX = g !== null ? parser.graph.getFigure(g) : null;
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
exports.generateFillBetween = generateFillBetween;
//# sourceMappingURL=generatePlot.js.map