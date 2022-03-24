import {Graph} from "./Graph";
import {LINECONSTRUCTION} from "./figures/Line";
import {Figure} from "./figures/Figure";
import {Plot} from "./figures/Plot";
import {Line as mathLine} from "pimath/esm/maths/geometry/line"

type BuildStep = { step: string, figures: Figure[] }

export class Parser {
    figures: []
    step: ""
    private _buildedSteps: BuildStep[] // {'A(4,6)': ['A']} {step: [list of object names]}
    private _construction: string
    private _graph: Graph

    constructor(graph: Graph, construction: string) {
        this._graph = graph
        this.update(construction)
    }

    /**
     * Update the graph using a new construction string.
     * @param {string} construction
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

        // Build the new steps from the current point
        this.generate(steps.slice(i))
    }

    updateLayout(parameters: string): Parser {
        let values = parameters.split(',')

        if (values.length === 4) {
            let xMin = +values[0],
                xMax = +values[1],
                yMin = +values[2],
                yMax = +values[3]


            let pixelsPerUnitX = 800 / (Math.max(xMin, xMax) - Math.min(xMin, xMax))
            this._graph.updateLayout({
                xMin,
                xMax,
                yMin,
                yMax,
                pixelsPerUnit: pixelsPerUnitX
            })

            this.update(this._construction, true)
        }
        return this
    }

    generate(steps: string[]) {
        // get all current figures.
        let name,
            match,
            color,
            assign: string[],
            builded: { step: string, figures: Figure[] }

        for (let construct of steps) {
            // The step command is empty or too small - do not continue to parse it.
            if (construct.length < 3) {
                continue
            }

            // Get the object name of the command
            match = construct.match(/^[A-Za-z0-9_]+/g)

            // This step is not a correct step (no name found)
            if (!match) {
                return
            }

            // Get the name
            name = match[0].trim()
            color = null

            if (construct.includes('->')) {
                color = construct.split('->')[1]
                construct = construct.split('->')[0]
            }
            assign = construct.split('=').map(x=>x.trim())


            try {
                // Check for a point
                if (assign.length === 1) {
                    builded = this._generatePoint(construct)

                } else if (assign.length === 2 || assign.length===3) {
                    // The name of the figure already exist.
                    if (this._graph.getFigure(name)) {
                        continue
                    }

                    // The construction data to parse
                    let constr = assign[1],
                        key = constr.match(/^[a-z]+\s/g)

                    if(assign.length===3){
                        constr = constr + '=' + assign[2]
                    }

                    if (constr === '') {
                        break
                    }
                    if (key === null) {
                        // une droite ou une fonction.
                        let checkFx = assign[0].match(/^[a-zA-z_0-9]+\(x\)/g)
                        if (checkFx) {
                            // une fonction.
                            builded = this._generatePlot(name, constr)
                        } else {
                            if (constr[0] === 'v') {
                                // un vecteur
                                builded = this._generateVector(name, constr)
                            } else {
                                // Une droite
                                builded = this._generateLineThroughTwoPoints(name, constr)
                            }
                        }
                    } else {
                        let constructKey = key[0].trim()
                        // n'importe quel autre commande
                        if (constructKey === 'mid') {
                            builded = this._generateMidPoint(name, constr)
                        } else if (constructKey === 'perp') {
                            builded = this._generatePerpendicular(name, constr)
                        } else if (constructKey === 'para') {
                            builded = this._generateParallel(name, constr)
                        } else if (constructKey === 'circ') {
                            builded = this._generateCircle(name, constr)
                        } else if (constructKey === 'fill') {
                            builded = this._generateFillBetween(name, constr)
                        } else if (constructKey === 'line') {
                            builded = this._generateLine(name, constr)
                        }
                    }

                }

            } catch {
                console.error('There was an error building', {
                    name: name,
                    step: construct
                })
            }

            // Add the builded step.
            builded.step = construct // reset to the original construct key.

            // change the color
            if (color !== null) {
                for (let fig of builded.figures) {
                    fig.color(color)
                }
            }

            // Do whatever check
            this._buildedSteps.push(builded)
        }
    }

    /**
     * Parse the main input string and sanitize it.
     * @param {string} construction
     * @returns {string[]}
     * @private
     */
    private _processConstruction(construction: string): string[] {
        return construction.split('\n').map(x => x.trim()).filter(x => x !== '')
    }

    private _generatePoint(step: string): BuildStep {
        // Regexp to get the data.
        let match = [...step.matchAll(/^([A-Z]_?[0-9_]*@?)\((-?[0-9.]+)[,;](-?[0-9.]+)\)(\*?)/g)],
            figures: Figure[]

        if (match.length > 0) {
            // The name of the figure
            let name = match[0][1].includes('@')?match[0][1].slice(0,-1):match[0][1],
                x = +match[0][2],
                y = +match[0][3],
                label = match[0][1].includes('@')?`${name}(${x},${y})`:name

            // The point already exists
            if (this._graph.getPoint(name)) {
                return {step, figures}
            }

            // The coordinates aren't a number
            if (isNaN(x) || isNaN(y)) {
                return {step, figures}
            }

            const pt = this._graph.point(x, y, name)
            pt.label.displayName=label

            if(match[0].length>=3){
                if(match[0][4]==='*'){
                    pt.asCircle()
                }
            }
            // Generate and return the figures.
            figures = [pt]
        }

        return {step, figures}
    }

    private _generateVector(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^v([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)],
            figures: Figure[]

        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]),
                B = this._graph.getPoint(match[0][2])

            figures = [this._graph.line(A, B, null, name).asVector()]
        }

        return {figures, step};
    }

    private _generateLineThroughTwoPoints(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)],
            figures: Figure[]
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]),
                B = this._graph.getPoint(match[0][2])

            figures = [this._graph.line(A, B, null, name)]
        }

        return {figures, step};
    }

    private _generateLine(name: string, step: string): BuildStep {
        let match = step.split('line ')[1],
            figures: Figure[]

        if (match.includes(',')) {
            // type is      d = line A,3/4      Point through and slope
            let pointSlope = match.split(',')

            // Get another point
            let A = this._graph.getPoint(pointSlope[0])

            // Get the figures.
            figures = [this._graph.line(A, null, {
                rule: LINECONSTRUCTION.SLOPE,
                value: pointSlope[1]
            }, name)]
        } else if (match.includes('=')){
            // type is      d = line 3x-2y=0    From equation
            let equ = new mathLine(match)

            // Get the point
            let A = this._graph.point(0, equ.getValueAtX(0).value)
            A.hide().label.hide()

            figures = [
                A,
                this._graph.line(A, null, {
                    rule: LINECONSTRUCTION.SLOPE,
                    value: equ.slope.value
                })
            ]
        }
        // let match = [...step.matchAll(/^line ([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)],
        //     figures: Figure[]
        // if (match.length > 0) {
        //     let A = this._graph.getPoint(match[0][1]),
        //         B = this._graph.getPoint(match[0][2])
        //
        //     figures = [this._graph.line(A, B, null, name)]
        // }

        return {figures, step};
    }

    private _generateMidPoint(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^mid ([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)],
            figures: Figure[]

        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]),
                B = this._graph.getPoint(match[0][2])
            figures = [this._graph.point(0, 0, name).middleOf(A, B)]
        }

        return {figures, step};
    }

    private _generatePerpendicular(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^perp ([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)],
            figures: Figure[]

        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]),
                P = this._graph.getPoint(match[0][2])

            figures = [this._graph.line(
                P, null,
                {
                    rule: LINECONSTRUCTION.PERPENDICULAR,
                    value: d
                }, name)]
        }

        return {figures, step}
    }

    private _generateParallel(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^para ([a-z]_?[0-9]?),([A-Z]_?[0-9]?)/g)],
            figures: Figure[]

        if (match.length > 0) {
            let d = this._graph.getFigure(match[0][1]),
                P = this._graph.getPoint(match[0][2])

            figures = [this._graph.line(
                P, null,
                {
                    rule: LINECONSTRUCTION.PARALLEL,
                    value: d
                }, name)]
        }

        return {figures, step}
    }

    private _generateCircle(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^circ ([A-Z]_?[0-9]?),([0-9.]+)/g)],
            figures: Figure[]

        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]),
                radius = +match[0][2]

            figures = [this._graph.circle(A, radius, name)]
        }
        return {figures, step}
    }

    private _generatePlot(name: string, step: string): BuildStep {
        let figures: Figure[]

        let domain = this._graph.unitXDomain,
            fx = step

        if (step.includes(',')) {
            let values = step.split(',')

            if (values.length >= 3) {
                let x = +values[1],
                    y = +values[2]

                if (!isNaN(x) && !isNaN(y)) {
                    domain.min = x
                    domain.max = y
                }
            }
            fx = values[0]
        }

        // PLot the function
        figures = [this._graph.plot(fx, {
            samples: 100,
            domain
        }, name)]

        return {figures, step}
    }

    /**
     * FillBetween two plots
     * <NAME> = fill(f,g)   fill between f and g
     * <NAME> = fill(f)     fill between f and Ox axis
     * @param {string} name
     * @param {string} step
     * @returns {BuildStep}
     * @private
     */
    private _generateFillBetween(name: string, step: string): BuildStep {
        let figures: Figure[] = [],
            match, f: string = null, g: string = null, min: number, max: number

        match = [...step.matchAll(/fill ([a-z]),?([a-z])?.?(([\-\d.]+),([\-\d.]+))?/g)]

        if (match.length > 0) {
            f = match[0][1] || null
            g = match[0][2] || null
            min = +match[0][4] || this._graph.unitXDomain.min
            max = +match[0][5] || this._graph.unitXDomain.max
        }

        if (f !== null) {
            // Get the main figure
            let FX = this._graph.getFigure(f),
                GX = g !== null ? this._graph.getFigure(g) : null

            if (FX instanceof Plot) {
                figures = [FX.fillBetween((GX instanceof Plot) ? GX : null, min, max)]
            }
        }

        /**
         f(x)=3/2*x+1
         g(x)=1/2*x+3
         zone=fill f,g 3,6
         */
        return {figures, step}
    }
}