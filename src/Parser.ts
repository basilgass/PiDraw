import {Graph} from "./Graph";
import {Figure} from "./figures/Figure";
import {Line as svgLine, Path} from "@svgdotjs/svg.js";
import {Point} from "./figures/Point";
import {Axis} from "./figures/Axis";
import {
    generateBissector,
    generateLine,
    generateParallel,
    generatePerpendicular,
    generateTangent,
    generateVector
} from "./parser/generateLine";
import {generateBezier} from "./parser/generateBezier";
import {generateFillBetween, generateParametricPlot, generatePlot} from "./parser/generatePlot";
import {generateArc} from "./parser/generateArc";
import {generatePolygon} from "./parser/generatePolygon";
import {
    generateIntersectionPoint,
    generateMidPoint,
    generatePoint,
    generatePointFromDirection,
    generatePointFromVector,
    generateProjectionPoint,
    generateSymmetricPoint,
    setPointStyle
} from "./parser/generatePoint";
import {generateCircle} from "./parser/generateCircle";
import {Line} from "./figures/Line";

const ptOption: string = "*,o,s,@",
    lineOption: string = "",
    plotOption: string = ""
export const parserKeys: {
    [Key: string]: {
        generate: Function,
        parameters: string,
        description: string,
        options: string
    }
} = {
    pt: {
        generate: generatePoint,
        parameters: "a,b | A(a,b)",
        description: "créer un point par coordonnées (x,y)",
        options: ptOption
    },
    mid: {
        generate: generateMidPoint,
        parameters: "A,B",
        description: "milieu de A, B",
        options: ptOption
    },
    vpt: {
        generate: generatePointFromVector,
        parameters: "<nb>*A,B[,X]",
        description: "créer un point grâce à un vecteur",
        options: ptOption + ", u(nitaire)"
    },
    dpt: {
        generate: generatePointFromDirection,
        parameters: "A,d,distance,p",
        description: "point construit par un vecteur directeur de la droite d, en partant du point. La longueur du vecteur est défini par distance. Le parmètre *p* indique de prendre le vecteur normal au lieu du directeur.",
        options: ptOption
    },
    proj: {
        generate: generateProjectionPoint,
        parameters: "A, d|Ox|Oy",
        description: "projection de A sur la droite d ou sur l'axe Ox ou Oy",
        options: ptOption
    },
    sym: {
        generate: generateSymmetricPoint,
        parameters: "A,B|d",
        description: "symétrie centrale d'un point A par B ou axiale d'une point A par l'axe d.",
        options: ptOption
    },
    inter: {
        generate: generateIntersectionPoint,
        parameters: "a, b",
        description: "point d'intersection des droites a et b",
        options: ptOption
    },
    line: {
        generate: generateLine,
        parameters: "[AB] | A,3/4 | 3x+4x=-5",
        description: "droite passant par A et B (les accolades ouvrent ou ferment la droite) ou par un point et une pente ou par son équation",
        options: lineOption
    },
    v: {
        generate: generateVector,
        parameters: "AB,k",
        description: "vecteur AB, multiplié par k",
        options: lineOption
    },
    perp: {
        generate: generatePerpendicular,
        parameters: "d,A",
        description: "perpendiculaire à d par A",
        options: lineOption
    },
    para: {
        generate: generateParallel,
        parameters: "d,A[,1 ou 2]",
        description: "parallèle à d par A, 1ère ou 2ème tangente.",
        options: lineOption
    },
    biss: {
        generate: generateBissector,
        parameters: "B,A,C",
        description: "bissectrice de l'angle BAC",
        options: lineOption
    },
    tan: {
        generate: generateTangent,
        parameters: "circle,point",
        description: "tangente à un cercle passant par un point",
        options: lineOption
    },
    poly: {
        generate: generatePolygon,
        parameters: "A,B,C,... | <sides:number>,<center:Point>,<radius:number|Point>",
        description: "tracer un polygone passant par les points A,B,C, ...",
        options: lineOption
    },
    circ: {
        generate: generateCircle,
        parameters: "A,r",
        description: "cercle de centre A et de rayon r",
        options: ""
    },
    arc: {
        generate: generateArc,
        parameters: "B,A,C[,r]",
        description: "arc de cercle de l'angle BAC, de rayon r",
        options: ""
    },
    plot: {
        generate: generatePlot,
        parameters: "func,min:max,@500,follow",
        description: "Tracer une fonction y=f(x)",
        options: ""
    },
    fill: {
        generate: generateFillBetween,
        parameters: "f[,g],a:b",
        description: "Remplir l'espace entre une fonction et l'axe Ox ou entre deux fonctions, borné par a et b",
        options: ""
    },
    parametric: {
        generate: generateParametricPlot,
        parameters: "sin(t),cos(t),a,b",
        description: "Tracer une fonction paramétrique, en utilisant a et b comme borne.",
        options: ""
    },
    bezier: {
        generate: generateBezier,
        parameters: "A,B,C...",
        description: "Tracer une courbe de bezier passant par plusieurs points A, B, C, ...",
        options: ""
    }


}

export type BuildStep = { step: string, figures: Figure[] }

export class Parser {
    private _construction: string

    constructor(graph: Graph, construction: string) {
        this._graph = graph
        this.update(construction)
    }

    private _graph: Graph

    get graph(): Graph {
        return this._graph;
    }

    private _buildedSteps: BuildStep[] // {'A(4,6)': ['A']} {step: [list of object names]}

    get buildedSteps(): BuildStep[] {
        return this._buildedSteps;
    }

    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     * @param refresh
     */
    update(construction: string, refresh?: boolean) {
        if (refresh === true) {
            // Reset the construction
            this.update('')
        }

        // Keep the construction value
        this._construction = construction

        // Initialize the built steps
        if (!this._buildedSteps) {
            this._buildedSteps = []
        }

        // Build sanitize the build array.
        let steps = this._processConstruction(construction)

        // Remove all figures and builded steps.
        let i
        for (i = 0; i < this._buildedSteps.length; i++) {
            // Go through each already built steps.

            // It must be the same than the current one, in this order !
            if (this._buildedSteps[i].step !== steps[i]) {
                // Maybe it's the same object and it just needs to be updated !
                // This means that every beyond must be modified.
                const currentStepProcess = this._preprocess(steps[i]),
                    prevStepProcess = this._preprocess(this._buildedSteps[i].step)

                let updateResult = false

                if (!updateResult) {
                    // Not the same step ! Everything after this must be removed from the graph!
                    for (let j = +i; j < this._buildedSteps.length; j++) {
                        if (this._buildedSteps[j].figures === undefined) {
                            continue
                        }
                        for (let fig of this._buildedSteps[j].figures) {
                            fig.remove()
                        }
                    }

                    this._buildedSteps = this._buildedSteps.slice(0, i)
                    break;
                }

            }
        }

        // Build the new steps from the current point
        this.generate(steps.slice(i))
    }

    updateLayout(parameters: string): Parser {
        // x=3:-5,y=-5:2                            min/max
        // ppu=50                                   pixels per unit
        // grid/nogrid                              show / hide grid
        // axis/miniaxis/noaxes                     show full axes, min axes (one unit long), hide axis
        // unit=1:5                                 unit on x scale / y scale
        let values = parameters.split(',')

        let xMin = -1, xMax = 10, yMin = -1, yMax = 10, ppu = null, xUnit = 1, yUnit = 1

        for (let param of values) {
            if (param.includes('=')) {
                let keyValue = param.split('=')
                if (keyValue[0] === 'x') {
                    if (keyValue[1].includes(':')) {
                        xMin = +keyValue[1].split(':')[0]
                        xMax = +keyValue[1].split(':')[1]
                    }
                } else if (keyValue[0] === 'y') {
                    if (keyValue[1].includes(':')) {
                        yMin = +keyValue[1].split(':')[0]
                        yMax = +keyValue[1].split(':')[1]
                    }
                } else if (keyValue[0] === 'ppu') {
                    let value = +keyValue[1]
                    if (!isNaN(value) && value > 0) {
                        ppu = +keyValue[1]
                    }
                } else if (keyValue[0] === "unit") {
                    if (keyValue[1].includes(':')) {
                        xUnit = +keyValue[1].split(':')[0]
                        yUnit = +keyValue[1].split(':')[1]
                    }

                    if (xUnit <= 0) {
                        xUnit = 1
                    }
                    if (yUnit <= 0) {
                        yUnit = 1
                    }
                }
            }
        }

        let pixelsPerUnitX = ppu !== null ? ppu : this._graph.width / (Math.max(xMin, xMax) - Math.min(xMin, xMax))

        this._graph.updateLayout({
            xMin,
            xMax,
            yMin,
            yMax,
            pixelsPerUnit: pixelsPerUnitX
        }, false)

        // Update the grid for different ppuX / ppuY
        if (xUnit !== yUnit) {
            this._graph.pixelsPerUnit = {
                x: this._graph.pixelsPerUnit.x / xUnit,
                y: this._graph.pixelsPerUnit.y / yUnit
            }
        }


        // Update the visibility.
        if (values.includes('grid')) {
            this._graph.getFigure('MAINGRID').update().show()
        } else {
            this._graph.getFigure('MAINGRID').hide()
        }

        if (values.includes('axis')) {
            let axis = this._graph.getFigure('Ox')
            if (axis instanceof Axis) {
                axis.setMinAxis(false).update().show()
            }
            axis = this._graph.getFigure('Oy')

            if (axis instanceof Axis) {
                axis.setMinAxis(false).update().show()
            }
        } else if (values.includes('minaxis')) {
            let axis = this._graph.getFigure('Ox')
            if (axis instanceof Axis) {
                axis.setMinAxis(true).update().show()
            }
            axis = this._graph.getFigure('Oy')

            if (axis instanceof Axis) {
                axis.setMinAxis(true).update().show()
            }
        } else {
            this._graph.getFigure('Ox').hide()
            this._graph.getFigure('Oy').hide()
        }

        this.update(this._construction, true)
        return this
    }

    generate(steps: string[]) {
        // get all current figures.
        let builded: { step: string, figures: Figure[] }

        for (let construct of steps) {
            // The step command is empty or too small - do not continue to parse it.
            if (construct.length < 3) {
                continue
            }

            if (!construct.match(/^[A-Za-z0-9_]+/g)) {
                console.warn('The current step is not a valid step: ', construct)
                continue
            }

            // Current building steps.
            builded = {
                step: construct,
                figures: []
            }

            // Preprocess the step
            let {label, key, code, options} = this._preprocess(construct)
            // console.log(construct, label, key, code, options)

            // continue;
            if (parserKeys[key]) {
                builded.figures = parserKeys[key].generate(this, label, code, options)
            } else {
                console.log('No key found for ' + construct)
            }

            // apply options
            this._postprocess(builded, options)

            // Do whatever check
            this._buildedSteps.push(builded)
        }
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
    private _preprocess(step: string): { label: string, key: string, code: string[], options: string[] } {
        let label = "",
            key = "",
            code: string[] = [],
            options: string[] = [],
            value = step + '',
            key_code: string = ""


        // Remove the options.
        let [label_key_code, step_options] = value.split("->")

        if (step_options !== undefined) {
            options = step_options.split(',')
        }

        // Special case of point
        if (!label_key_code.includes("=")) {
            // It's a point: A(3,2)
            key = "pt"
            label = label_key_code.split('(')[0]
            code = label_key_code
                .substring(label.length + 1, label_key_code.length - 1
                ).split(/[;,]/)

            return {label, key, code, options}
        }

        let key_code_as_array = label_key_code.split("=")
        label = key_code_as_array.shift()
        key_code = key_code_as_array.join("=")

        // special case of plot or parametric   f(x)=3x or f(t)=...
        if (label.includes("(")) {
            let plotType: string

            [label, plotType] = label.substring(0, label.length - 1).split('(')

            if (plotType === "x") {
                key = "plot"
            } else if (plotType === "t") {
                key = "param"
            }

            code = key_code.split(',')
            return {label, key, code, options}
        }

        // special case of vector or segment:   d=AB or d=vAB
        if (!key_code.includes(" ")) {
            if (key_code[0] === 'v') {
                key = 'v'
                key_code = key_code.substring(1)
            } else {
                key = "line"
            }

            // Next, we need to "cut" the value to two points.
            // AB => [A,B]
            // A1B4 => [A1,B4]
            let match = [...key_code.matchAll(/^[\[\]]?([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)[\[\]]?/g)]

            if (match.length > 0) {
                code = [match[0][1], match[0][2]]
            }
            code.push(key_code.startsWith("[") ? "segment" : "open")
            code.push(key_code.endsWith("]") ? "segment" : "open")

            return {label, key, code, options}
        }

        // Any other case
        // A=<key> <code>-><options>
        let code_with_sep = key_code.split(" ")
        key = code_with_sep.shift()
        code = code_with_sep.join(",").split(',')

        return {label, key, code, options}
    }

    private _postprocess(builded: BuildStep, options: string[]) {
        if (options.length > 0) {

            // Reset the colors
            builded.figures
                .forEach(fig => {
                    fig.stroke('black')
                    if (fig instanceof Point) {
                        fig.fill("white")
                    } else {
                        fig.fill('transparent')
                    }
                })


            options.forEach(elWithOptions => {
                let options = elWithOptions.split(':'),
                    el = options.shift()

                if (el !== '') {
                    // reserved keys
                    builded.figures.forEach(fig => {
                        if (fig instanceof Point && ["*", "o", "sq"].indexOf(el) !== -1) {
                            setPointStyle(fig, el, options.length > 0 ? +options[0] : null)
                        } else if (el === 'drag' && fig instanceof Point) {
                            fig.draggable({
                                grid: options.includes('grid') ? this._graph.getGrid() : null,
                                constrain: options.map(opt => {
                                    if (['x', 'y', 'grid'].indexOf(opt) === -1) {
                                        return this._graph.getFigure(opt)
                                    } else {
                                        return opt
                                    }
                                })
                            })
                        } else if (el === 'dash') {
                            fig.dash(this._graph.pixelsPerUnit.x / 4)
                        } else if (el === 'dot') {
                            fig.dash(`2 ${this._graph.pixelsPerUnit.x / 4}`)
                        } else if (!isNaN(+el)) {
                            fig.width(+el)
                        } else if (el === 'thick') {
                            fig.thick()
                        } else if (el === 'thin') {
                            fig.thin()
                        } else if (el === 'ultrathick') {
                            fig.ultrathick()
                        } else if (el === 'ultrathin') {
                            fig.ultrathin()
                        } else if (el === 'label') {
                            fig.label.show()
                        } else if (el === '?') {
                            fig.label.hide()
                        } else if (el === '!') {
                            fig.hide()
                        } else if (el === 'hide') {
                            fig.label.hide()
                            fig.hide()
                        } else if (el.startsWith('mark')) {
                            if (options.length === 0) {
                                options = ["start", "mid", "end"]
                            }

                            if ((fig.svg instanceof Path) || (fig.svg instanceof svgLine)) {
                                for (let pos of options) {
                                    switch (pos) {
                                        case "start":
                                            fig.svg.marker(pos, this._graph.markers.start)
                                            break
                                        case "end":
                                            fig.svg.marker(pos, this._graph.markers.end)
                                            break
                                        case "mid":
                                            // TODO : handle mid marker ?
                                            // fig.svg.marker(pos, this._graph.markers.mid)
                                            break
                                    }

                                }

                            }
                        } else if (el.startsWith('#') || el.startsWith('$')) {
                            // Label configuration
                            // #name/position/x:y
                            let [label, position, offset] = el.substring(1).split("/")

                            // Setting display name
                            if (el.startsWith('$')) {
                                fig.label.isTex = true
                            }
                            fig.displayName = label

                            // Changing the default position
                            if (position !== undefined && position !== "") {
                                fig.label.position(position)
                            }

                            // Adding offsets
                            if (offset !== undefined) {
                                let x = +offset,
                                    y = options.length === 1 ? +options[0] : 0

                                if (!isNaN(x) && !isNaN(y)) {
                                    fig.label.offset({x, y})
                                }
                            }

                        } else if (el.startsWith('move')) {
                            if (options.length === 1 && fig instanceof Line) {
                                const n = fig.math.normal,
                                    norm = n.norm

                                fig.svg.translate(
                                    n.x / norm * (+options[0]),
                                    n.y / norm * (+options[0])
                                )
                            } else if (options.length === 2) {
                                fig.svg.translate(+options[0], +options[1])
                            }
                        } else if (el === 'fill' && options.length>0) {
                            // fill color
                            let [color, opacity] = options[0].split('/')
                            if (CSS.supports('color', color)) {
                                fig.fill({color, opacity: opacity === undefined ? 1 : +opacity})
                            }
                        } else {
                            let [color, opacity] = el.split('/')
                            // stroke
                            if (CSS.supports('color', color)) {
                                fig.stroke({color, opacity: opacity === undefined ? 1 : +opacity})
                            }
                        }
                    })

                }
            })

        }
    }

    /**
     * Parse the main input string and sanitize it.
     * @param {string} construction
     * @returns {string[]}
     * @private
     */
    private _processConstruction(construction: string): string[] {
        return construction
            .split('\n')
            .map(x => x.trim())                         // remove white spaces
            .filter(x => x !== '')                      // remove empty lines
            .filter(x => x[0] !== "$" && x[0] !== "%")  // remove commented lines
    }

}