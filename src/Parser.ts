import {Graph} from "./Graph";
import {LINECONSTRUCTION} from "./figures/Line";
import {Figure} from "./figures/Figure";
import {Plot} from "./figures/Plot";

type BuildStep = { step: string, figures: Figure[] }

export class Parser {
    figures: []
    step: ""
    private _graph: Graph
    private _buildedSteps: BuildStep[] // {'A(4,6)': ['A']} {step: [list of object names]}

    constructor(graph: Graph, construction: string) {
        this._graph = graph
        this.update(construction)
    }

    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     */
    update(construction: string, refresh?: boolean) {
        if(refresh===true){
            // Reset the construction
            this.update('')
        }

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

    generate(steps: string[]) {
        // get all current figures.
        let name,
            match,
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
            assign = construct.split('=')

            try {
                // Check for a point
                if (assign.length === 1) {
                    builded = this._generatePoint(construct)

                } else if (assign.length === 2) {
                    // The name of the figure already exist.
                    if (this._graph.getFigure(name)) {
                        continue
                    }

                    // The construction data to parse
                    let constr = assign[1].trim(),
                        key = constr.match(/^[a-z]+\s/g)

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
                                builded = this._generateLine(name, constr)
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
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)\(([0-9.]+)[,;]([0-9.]+)\)/g)],
            figures: Figure[]

        if (match.length > 0) {
            // The name of the figure
            let name = match[0][1],
                x = +match[0][2],
                y = +match[0][3]

            // The point already exists
            if (this._graph.getPoint(name)) {
                return {step, figures}
            }

            // The coordinates aren't a number
            if (isNaN(x) || isNaN(y)) {
                return {step, figures}
            }

            // Generate and return the figures.
            figures = [this._graph.point(x, y, name)]
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

    private _generateLine(name: string, step: string): BuildStep {
        let match = [...step.matchAll(/^([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)/g)],
            figures: Figure[]
        if (match.length > 0) {
            let A = this._graph.getPoint(match[0][1]),
                B = this._graph.getPoint(match[0][2])

            figures = [this._graph.line(A, B, null, name)]
        }

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

        // PLot the function
        figures = [this._graph.plot(step, {
            samples: 100,
            domain: this._graph.unitXDomain
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

        match = [...step.matchAll(/fill ([a-z]),?([a-z])?.?(([\d.]+),([\d.]+))?/g)]

        if (match.length > 0) {
            f = match[0][1] || null
            g = match[0][2] || null
            min = +match[0][4] || this._graph.unitXDomain.min
            max = +match[0][5] || this._graph.unitXDomain.max
        }

        if (f !== null) {
            // Get the main figure
            let FX = this._graph.getFigure(f),
                GX = g!==null?this._graph.getFigure(g):null

            if (FX instanceof Plot) {
                figures = [FX.fillBetween((GX instanceof Plot)?GX:null, min, max)]
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