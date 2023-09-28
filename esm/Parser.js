"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.parserHelperText = exports.parserKeys = void 0;
const svg_js_1 = require("@svgdotjs/svg.js");
const Point_1 = require("./figures/Point");
const Axis_1 = require("./figures/Axis");
const generateLine_1 = require("./parser/generateLine");
const generateBezier_1 = require("./parser/generateBezier");
const generatePlot_1 = require("./parser/generatePlot");
const generateArc_1 = require("./parser/generateArc");
const generatePolygon_1 = require("./parser/generatePolygon");
const generatePoint_1 = require("./parser/generatePoint");
const generateCircle_1 = require("./parser/generateCircle");
const Line_1 = require("./figures/Line");
const enums_1 = require("./variables/enums");
const ptOption = "*,o,sq,@", lineOption = "", plotOption = "";
exports.parserKeys = {
    pt: {
        generate: generatePoint_1.generatePoint,
        parameters: "a,b | A(a,b)",
        description: "créer un point par coordonnées (x,y)",
        options: ptOption
    },
    mid: {
        generate: generatePoint_1.generateMidPoint,
        parameters: "A,B",
        description: "milieu de A, B",
        options: ptOption
    },
    vpt: {
        generate: generatePoint_1.generatePointFromVector,
        parameters: "<nb>*A,B[,X]",
        description: "créer un point grâce à un vecteur",
        options: ptOption + ", u(nitaire)"
    },
    dpt: {
        generate: generatePoint_1.generatePointFromDirection,
        parameters: "A,d,distance,p",
        description: "point construit par un vecteur directeur de la droite d, en partant du point. La longueur du vecteur est défini par distance. Le parmètre *p* indique de prendre le vecteur normal au lieu du directeur.",
        options: ptOption
    },
    proj: {
        generate: generatePoint_1.generateProjectionPoint,
        parameters: "A,d|Ox|Oy",
        description: "projection de A sur la droite d ou sur l'axe Ox ou Oy",
        options: ptOption
    },
    sym: {
        generate: generatePoint_1.generateSymmetricPoint,
        parameters: "A,B|d",
        description: "symétrie centrale d'un point A par B ou axiale d'une point A par l'axe d.",
        options: ptOption
    },
    inter: {
        generate: generatePoint_1.generateIntersectionPoint,
        parameters: "a, b",
        description: "point d'intersection des droites a et b",
        options: ptOption
    },
    line: {
        generate: generateLine_1.generateLine,
        parameters: "[AB] | AB. | A,3/4 | 3x+4x=-5",
        description: "droite passant par A et B (sans crochet = droite, avec un point à la fin = segment, les crochets ouvrent ou ferment la droite) ou par un point et une pente ou par son équation",
        options: lineOption
    },
    v: {
        generate: generateLine_1.generateVector,
        parameters: "AB,k",
        description: "vecteur AB, multiplié par k",
        options: lineOption
    },
    perp: {
        generate: generateLine_1.generatePerpendicular,
        parameters: "d,A",
        description: "perpendiculaire à d par A",
        options: lineOption
    },
    para: {
        generate: generateLine_1.generateParallel,
        parameters: "d,A[,1 ou 2]",
        description: "parallèle à d par A, 1ère ou 2ème tangente.",
        options: lineOption
    },
    biss: {
        generate: generateLine_1.generateBissector,
        parameters: "B,A,C",
        description: "bissectrice de l'angle BAC",
        options: lineOption
    },
    tan: {
        generate: generateLine_1.generateTangent,
        parameters: "circle,point",
        description: "tangente à un cercle passant par un point",
        options: lineOption
    },
    poly: {
        generate: generatePolygon_1.generatePolygon,
        parameters: "A,B,C,... | <sides:number>,<center:Point>,<radius:number|Point>",
        description: "tracer un polygone passant par les points A,B,C, ...",
        options: lineOption
    },
    circ: {
        generate: generateCircle_1.generateCircle,
        parameters: "A,r",
        description: "cercle de centre A et de rayon r",
        options: ""
    },
    arc: {
        generate: generateArc_1.generateArc,
        parameters: "B,A,C[,r]",
        description: "arc de cercle de l'angle BAC, de rayon r",
        options: ""
    },
    plot: {
        generate: generatePlot_1.generatePlot,
        parameters: "func,min:max,@500,follow",
        description: "Tracer une fonction y=f(x)",
        options: ""
    },
    fill: {
        generate: generatePlot_1.generateFillBetween,
        parameters: "f[,g],a:b",
        description: "Remplir l'espace entre une fonction et l'axe Ox ou entre deux fonctions, borné par a et b",
        options: ""
    },
    parametric: {
        generate: generatePlot_1.generateParametricPlot,
        parameters: "sin(t),cos(t),a,b",
        description: "Tracer une fonction paramétrique, en utilisant a et b comme borne.",
        options: ""
    },
    bezier: {
        generate: generateBezier_1.generateBezier,
        parameters: "A,B,C...",
        description: "Tracer une courbe de bezier passant par plusieurs points A, B, C, ...",
        options: ""
    }
};
function parserPreprocess(step) {
    let label = "", key = "", code = [], options = [], value = step + '', key_code = "";
    // Remove the options.
    let [label_key_code, step_options] = value.split("->");
    if (step_options !== undefined) {
        options = step_options.split(',');
    }
    // Special case of point
    if (!label_key_code.includes("=")) {
        // It's a point: A(3,2)
        key = "pt";
        label = label_key_code.split('(')[0];
        code = label_key_code
            .substring(label.length + 1, label_key_code.length - 1).split(/[;,]/);
        return { label, key, code, options };
    }
    let key_code_as_array = label_key_code.split("=");
    label = key_code_as_array.shift();
    key_code = key_code_as_array.join("=");
    // special case of plot or parametric   f(x)=3x or f(t)=...
    if (label.includes("(")) {
        let plotType;
        [label, plotType] = label.substring(0, label.length - 1).split('(');
        if (plotType === "x") {
            key = "plot";
        }
        else if (plotType === "t") {
            key = "param";
        }
        code = key_code.split(',');
        return { label, key, code, options };
    }
    // special case of vector or segment:   d=AB or d=vAB
    if (!key_code.includes(" ")) {
        if (key_code[0] === 'v') {
            key = 'v';
            key_code = key_code.substring(1);
        }
        else {
            key = "line";
        }
        // Cut the special values.
        let [value, ...code_option] = key_code.split(',');
        // Next, we need to "cut" the value to two points.
        // AB => [A,B]
        // A1B4 => [A1,B4]
        let match = [...value.matchAll(/^[\[\]]?([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)[\[\].]?/g)];
        // Get the two points.
        if (match.length > 0) {
            code = [match[0][1], match[0][2]];
        }
        if (!value.endsWith('.')) {
            code.push(key_code.startsWith("[") ? "segment" : "open");
            code.push(key_code.endsWith("]") ? "segment" : "open");
        }
        else {
            code.push('segment');
            code.push('segment');
        }
        return { label, key, code: [...code, ...code_option], options };
    }
    // Any other case
    // A=<key> <code>-><options>
    let code_with_sep = key_code.split(" ");
    key = code_with_sep.shift();
    code = code_with_sep.join(",").split(',');
    return { label, key, code, options };
}
function parserHelperText(step) {
    let { label, key, code, options } = parserPreprocess(step);
    if (key === "") {
        return null;
    }
    if (!exports.parserKeys.hasOwnProperty(key)) {
        return null;
    }
    return exports.parserKeys[key];
}
exports.parserHelperText = parserHelperText;
class Parser {
    _construction;
    _config;
    constructor(graph, construction, parameters) {
        this._graph = graph;
        // Store the construction value.
        this._construction = construction;
        // Configuration
        this._config = {
            nolabel: false,
            nopoint: false,
            labelAsTex: false
        };
        // Update the parameters
        if (parameters !== undefined) {
            this.updateLayout(parameters);
        }
        else {
            this.update(construction);
        }
    }
    _graph;
    get graph() {
        return this._graph;
    }
    _buildedSteps; // {'A(4,6)': ['A']} {step: [list of object names]}
    get buildedSteps() {
        return this._buildedSteps;
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
                // Maybe it's the same object and it just needs to be updated !
                // This means that every beyond must be modified.
                const currentStepProcess = this._preprocess(steps[i]), prevStepProcess = this._preprocess(this._buildedSteps[i].step);
                let updateResult = false;
                if (!updateResult) {
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
        }
        // Build the new steps from the current point
        this.generate(steps.slice(i));
    }
    updateLayout(parameters, constructUpdate) {
        // x=3:-5,y=-5:2                            min/max
        // ppu=50                                   pixels per unit
        // grid/nogrid                              show / hide grid
        // axis/miniaxis/noaxes                     show full axes, min axes (one unit long), hide axis
        // unit=1:5                                 unit on x scale / y scale
        let values = parameters.split(',');
        let xMin = -1, xMax = 10, yMin = -1, yMax = 10, ppu = null, xUnit = 1, yUnit = 1;
        for (let param of values) {
            if (param.includes('=')) {
                let [key, value] = param.split("=");
                // let keyValue = param.split('=')
                if (key === 'x') {
                    if (value.includes(':')) {
                        let [a, b] = value.split(":").map(x => +x);
                        if (!isNaN(a) && !isNaN(b)) {
                            xMin = Math.min(a, b);
                            xMax = Math.max(a, b, a + 1);
                        }
                    }
                }
                else if (key === 'y') {
                    if (value.includes(':')) {
                        let [a, b] = value.split(":").map(x => +x);
                        if (!isNaN(a) && !isNaN(b)) {
                            yMin = Math.min(a, b);
                            yMax = Math.max(a, b, a + 1);
                        }
                    }
                }
                else if (key === 'ppu') {
                    if (!isNaN(+value) && +value > 0) {
                        ppu = +value;
                    }
                }
                else if (key === "unit") {
                    if (value.includes(':')) {
                        xUnit = +value.split(':')[0];
                        yUnit = +value.split(':')[1];
                    }
                    if (xUnit <= 0) {
                        xUnit = 1;
                    }
                    if (yUnit <= 0) {
                        yUnit = 1;
                    }
                }
            }
        }
        let pixelsPerUnitX = ppu !== null ? ppu : this._graph.width / (Math.max(xMin, xMax) - Math.min(xMin, xMax));
        this._graph.updateLayout({
            xMin,
            xMax,
            yMin,
            yMax,
            pixelsPerUnit: pixelsPerUnitX
        }, false);
        // Update the grid for different ppuX / ppuY
        if (xUnit !== yUnit) {
            this._graph.pixelsPerUnit = {
                x: this._graph.pixelsPerUnit.x / xUnit,
                y: this._graph.pixelsPerUnit.y / yUnit
            };
        }
        // Update the grid
        if (values.includes('grid')) {
            this._graph.getFigure('MAINGRID').update().show();
        }
        else {
            this._graph.getFigure('MAINGRID').hide();
        }
        // update the axis
        if (values.includes('axis')) {
            let axis = this._graph.getFigure('Ox');
            if (axis instanceof Axis_1.Axis) {
                axis.setMinAxis(false).update().show();
            }
            axis = this._graph.getFigure('Oy');
            if (axis instanceof Axis_1.Axis) {
                axis.setMinAxis(false).update().show();
            }
        }
        else if (values.includes('minaxis')) {
            let axis = this._graph.getFigure('Ox');
            if (axis instanceof Axis_1.Axis) {
                axis.setMinAxis(true).update().show();
            }
            axis = this._graph.getFigure('Oy');
            if (axis instanceof Axis_1.Axis) {
                axis.setMinAxis(true).update().show();
            }
        }
        else {
            this._graph.getFigure('Ox').hide();
            this._graph.getFigure('Oy').hide();
        }
        // Other options
        this._config.nolabel = values.includes('nolabel');
        this._config.nopoint = values.includes('nopoint');
        this._config.labelAsTex = values.includes('tex');
        this.update(this._construction, true);
        return this;
    }
    getParserKeys(construction) {
        return this.generate(this._processConstruction(construction), true);
    }
    preprocess(step) {
        return this._preprocess(step);
    }
    generate(steps, getKeysOnly = false) {
        // get all current figures.
        let builded, errors = [], buildedKeys = [];
        for (let construct of steps) {
            // The step command is empty or too small - do not continue to parse it.
            if (construct.length < 3) {
                continue;
            }
            if (!construct.match(/^[A-Za-z0-9_]+/g)) {
                console.warn('The current step is not a valid step: ', construct);
                continue;
            }
            // Current building steps.
            builded = {
                step: construct,
                figures: []
            };
            // Preprocess the step
            try {
                let { label, key, code, options } = this._preprocess(construct);
                // console.log(construct, label, key, code, options)
                buildedKeys.push(key);
                // continue;
                if (!getKeysOnly) {
                    if (exports.parserKeys[key]) {
                        builded.figures = exports.parserKeys[key].generate(this, label, code, options);
                    }
                    else {
                        console.log('No key found for ' + construct);
                    }
                    // apply options
                    this._postprocess(builded, options);
                    // Do whatever check
                    this._buildedSteps.push(builded);
                }
            }
            catch (error) {
                console.warn({
                    step: construct,
                    error
                });
            }
        }
        return buildedKeys;
    }
    /**
     * Convert a construct string to the label, key, code and options)
     * A step string can be as following:
     * A(3,4)
     * d=[AB]
     * c=<key> <params sep. by ,>->option
     * @param step
     * @private
     */
    _preprocess(step) {
        return parserPreprocess(step);
        // let label = "",
        //     key = "",
        //     code: string[] = [],
        //     options: string[] = [],
        //     value = step + '',
        //     key_code: string = ""
        //
        //
        // // Remove the options.
        // let [label_key_code, step_options] = value.split("->")
        //
        // if (step_options !== undefined) {
        //     options = step_options.split(',')
        // }
        //
        // // Special case of point
        // if (!label_key_code.includes("=")) {
        //     // It's a point: A(3,2)
        //     key = "pt"
        //     label = label_key_code.split('(')[0]
        //     code = label_key_code
        //         .substring(label.length + 1, label_key_code.length - 1
        //         ).split(/[;,]/)
        //
        //     return {label, key, code, options}
        // }
        //
        // let key_code_as_array = label_key_code.split("=")
        // label = key_code_as_array.shift()
        // key_code = key_code_as_array.join("=")
        //
        // // special case of plot or parametric   f(x)=3x or f(t)=...
        // if (label.includes("(")) {
        //     let plotType: string
        //
        //     [label, plotType] = label.substring(0, label.length - 1).split('(')
        //
        //     if (plotType === "x") {
        //         key = "plot"
        //     } else if (plotType === "t") {
        //         key = "param"
        //     }
        //
        //     code = key_code.split(',')
        //     return {label, key, code, options}
        // }
        //
        // // special case of vector or segment:   d=AB or d=vAB
        // if (!key_code.includes(" ")) {
        //     if (key_code[0] === 'v') {
        //         key = 'v'
        //         key_code = key_code.substring(1)
        //     } else {
        //         key = "line"
        //     }
        //
        //     // Cut the special values.
        //     let [value, ...code_option] = key_code.split(',')
        //
        //     // Next, we need to "cut" the value to two points.
        //     // AB => [A,B]
        //     // A1B4 => [A1,B4]
        //     let match = [...value.matchAll(/^[\[\]]?([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)[\[\].]?/g)]
        //
        //     // Get the two points.
        //     if (match.length > 0) {
        //         code = [match[0][1], match[0][2]]
        //     }
        //
        //     if (!value.endsWith('.')) {
        //         code.push(key_code.startsWith("[") ? "segment" : "open")
        //         code.push(key_code.endsWith("]") ? "segment" : "open")
        //     } else {
        //         code.push('segment')
        //         code.push('segment')
        //     }
        //
        //     return {label, key, code: [...code, ...code_option], options}
        // }
        //
        // // Any other case
        // // A=<key> <code>-><options>
        // let code_with_sep = key_code.split(" ")
        // key = code_with_sep.shift()
        // code = code_with_sep.join(",").split(',')
        //
        // return {label, key, code, options}
    }
    _postprocess(builded, codeOptions) {
        /**
         * builded: contains the figures for the current code
         * options: is the list of options to be applied.
         *          [optionA,optionB:param,optionC:param/other/some:thing]
         */
        // Reset the colors and labels
        builded.figures
            .forEach(fig => {
            // Set stroke to black
            fig.stroke('black');
            // Change the fill value
            if (fig instanceof Point_1.Point) {
                fig.fill("white");
            }
            else {
                fig.fill('transparent');
            }
            // If the label is shown, maybe force it to be as TeX.
            if (fig instanceof Point_1.Point && !fig.isInvisible()) {
                // Hide or show the label
                if (this._config.nolabel) {
                    fig.hideLabel();
                }
                else {
                    if (fig instanceof Point_1.Point) {
                        fig.showLabel();
                    }
                }
                if (fig.label.isTex !== this._config.labelAsTex &&
                    codeOptions.filter(x => x.startsWith('label') || x.startsWith('tex')).length === 0 &&
                    !codeOptions.includes('hide') && !codeOptions.includes('?')) {
                    codeOptions.push(this._config.labelAsTex ? 'tex' : 'label');
                    fig.label.isTex = this._config.labelAsTex;
                }
            }
            // Hide or show the points
            if (this._config.nopoint && fig instanceof Point_1.Point) {
                fig.hide();
            }
        });
        if (codeOptions.length > 0) {
            codeOptions.forEach(elWithCodeOptions => {
                // let options = elWithCodeOptions.split(':'),
                //     key = options.shift(),
                //     keyParameter = ""
                let options = elWithCodeOptions.split('/'), key_param = options.shift(), [key, param] = key_param.split(':');
                // Build the options:
                // each options can be of the type
                //      key
                //      key:param
                //      key/optA/optB/optX:optY
                //      key:param/optA/optB/x:y
                if (key !== '') {
                    // reserved keys
                    builded.figures.forEach(fig => {
                        // Special case for points
                        if (fig instanceof Point_1.Point && ["*", "o", "sq"].indexOf(key) !== -1) {
                            (0, generatePoint_1.setPointStyle)(fig, key, options.length > 0 ? +options[0] : null);
                            // Drag options
                        }
                        else if (key === 'drag' && fig instanceof Point_1.Point) {
                            // Get the figure to follow
                            // Might be the horizontal axes
                            let follow;
                            if (param === 'grid') {
                                follow = this._graph.getGrid();
                            }
                            else if (param !== 'x' && param != 'y') {
                                follow = this._graph.getFigure(param);
                            }
                            else {
                                follow = param;
                            }
                            // Determine the bounds
                            let bounds = {};
                            if (options[0] !== undefined) {
                                const bndX = options[0].split(":").map(x => +x);
                                if (bndX.length === 2) {
                                    bounds['x'] = [bndX[0], bndX[1]];
                                }
                            }
                            if (options[1] !== undefined) {
                                const bndY = options[1].split(":").map(x => +x);
                                if (bndY.length === 2) {
                                    bounds['y'] = [bndY[0], bndY[1]];
                                }
                            }
                            fig.draggable({
                                constrain: follow,
                                bounds
                            });
                        }
                        // Everything with DASH and DOTS
                        else if (key === 'dash' || key === 'dot') {
                            const scale = this._graph.pixelsPerUnit.x / 10;
                            if (param === undefined || !isNaN(+param)) {
                                const size = param === undefined ? 5 : +param;
                                fig.dash(key === 'dash' ? size * scale : `${scale / 2} ${size}`);
                            }
                            else {
                                // Convert the values to the units.
                                const values = param.split(" ")
                                    .map(v => +v * scale);
                                fig.dash(values.join(" "));
                            }
                        }
                        // Everything for the line WIDTH
                        else if (key === 'w') {
                            fig.width(+param);
                        }
                        else if (key === 'thick') {
                            fig.thick();
                        }
                        else if (key === 'thin') {
                            fig.thin();
                        }
                        else if (key === 'ultrathick') {
                            fig.ultrathick();
                        }
                        else if (key === 'ultrathin') {
                            fig.ultrathin();
                        }
                        // Everything concerning the hide / show of items
                        // label / ? : show or hide the label
                        // ! : hide the figure
                        // hide: hide label and figure.
                        // else if (key === 'label') {
                        //     fig.label.show()
                        // }
                        else if (key === '?') {
                            fig.label.hide();
                        }
                        else if (key === '!') {
                            fig.hide();
                        }
                        else if (key === 'hide') {
                            fig.label.hide();
                            fig.hide();
                        }
                        // Everything concerning the end of line marks
                        else if (key.startsWith('mark')) {
                            if (options.length === 0) {
                                options = ["start", "mid", "end"];
                            }
                            if ((fig.svg instanceof svg_js_1.Path) || (fig.svg instanceof svg_js_1.Line)) {
                                for (let pos of options) {
                                    switch (pos) {
                                        case "start":
                                            fig.svg.marker(pos, this._graph.markers.start);
                                            break;
                                        case "end":
                                            fig.svg.marker(pos, this._graph.markers.end);
                                            break;
                                        case "mid":
                                            // TODO : handle mid marker ?
                                            // fig.svg.marker(pos, this._graph.markers.mid)
                                            break;
                                    }
                                }
                            }
                        }
                        // Everything concerning the label text: either plain text, either TeX
                        else if (key === 'tex' || key === 'label') {
                            // Label configuration
                            // <tex or text>:name/position/x:y
                            // let [label, position, offset] = key.substring(1).split("/")
                            // Set it as TeX
                            fig.label.isTex = key === 'tex';
                            // Setting display name
                            if (typeof param === "string" && param.includes('~')) {
                                fig.label.template = param;
                            }
                            fig.displayName = param;
                            // Changing the default position
                            let position = options.filter(opt => opt.match(/[tmblcr]{1,2}/))[0];
                            if (position !== undefined && position !== "") {
                                fig.label.position(position);
                            }
                            // Adding offsets
                            let offset = options.filter(opt => opt.includes(':'))[0];
                            if (offset !== undefined) {
                                let [x, y] = offset.split(':').map(v => +v);
                                if (!isNaN(x) && !isNaN(y)) {
                                    // Convert the distances to pixels.
                                    fig.label.offset({
                                        x: this._graph.distanceToPixels(x),
                                        y: this._graph.distanceToPixels(y === undefined ? 0 : y, enums_1.AXIS.VERTICAL)
                                    });
                                }
                            }
                            // Make sure the label is visible
                            fig.showLabel().updateLabel();
                        }
                        // Move the figure
                        // TODO: must change the value to UNIT and also move the label the same way.
                        else if (key.startsWith('move')) {
                            // move/4
                            // move/4:6
                            if (options.length > 0) {
                                let [x, y] = options[0].split(':');
                                // Convert the distances to pixels.
                                let dx = this._graph.distanceToPixels(+x), dy = this._graph.distanceToPixels(y === undefined ? 0 : +y, enums_1.AXIS.VERTICAL);
                                if (y === undefined && fig instanceof Line_1.Line) {
                                    const n = fig.math.normal, norm = n.norm;
                                    fig.svg.translate(n.x / norm * (dx), n.y / norm * (dx));
                                    // Move the label
                                    fig.label.offset({
                                        x: n.x / norm * (dx),
                                        y: n.y / norm * (-dx)
                                    });
                                }
                                else {
                                    fig.svg.translate(dx, -dy);
                                    fig.label.offset({ x: dx, y: dy });
                                }
                            }
                        }
                        // Everything concerning the color
                        // fill:color   to fill the figure
                        // color        to stroke the figure
                        else if (key === 'fill') {
                            // fill color
                            // let [color, opacity] = options[0].split('/')
                            if (CSS.supports('color', param)) {
                                const opacity = isNaN(+options[0]) ? 1 : +options[0];
                                fig.fill({ color: param, opacity });
                            }
                        }
                        else if (CSS.supports('color', key)) {
                            const opacity = isNaN(+options[0]) ? 1 : +options[0];
                            // stroke
                            fig.stroke({ color: key, opacity });
                        }
                    });
                }
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
        return construction
            .split('\n')
            .map(x => x.trim()) // remove white spaces
            .filter(x => x !== '') // remove empty lines
            .filter(x => x[0] !== "$" && x[0] !== "%"); // remove commented lines
    }
    getHelperText(step) {
        return parserHelperText(step);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map