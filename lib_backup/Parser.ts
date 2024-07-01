import { Figure, IGraphConfig } from "./Figure"
import { Line as svgLine, Path } from "@svgdotjs/svg.js"
import { Point } from "./figures/Point"
import { Axis } from "./figures/Axis"
import { setPointStyle } from "./parser/generatePoint"
import { Line } from "./figures/Line"
import { AXIS } from "./enums"
import { Circle } from "./figures/Circle"
import { BuildStep, ParserPreprocessType, parserConfig, parserHelperText, parserKeys, parserPreprocess } from "./parserConfig"

export class Parser {
    private _construction: string
    private _config: parserConfig

    constructor(graph: IGraphConfig, construction: string, parameters?: string) {

        this._graph = graph

        // Store the construction value.
        this._construction = construction

        this._buildedSteps = []
        // Configuration
        this._config = {
            nolabel: false,
            nopoint: false,
            labelAsTex: false
        }

        // Update the parameters
        if (parameters !== undefined) {
            this.updateLayout(parameters)
        } else {
            this.update(construction)
        }

    }

    private _graph: IGraphConfig

    get graph(): IGraphConfig {
        return this._graph
    }

    private _buildedSteps: BuildStep[] // {'A(4,6)': ['A']} {step: [list of object names]}

    get buildedSteps(): BuildStep[] {
        return this._buildedSteps
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

        // TODO: système de mise à jour à revoir, pour optimiser les calculs. Essayer de mettre à jour plutôt que de tout recalculer !
        // Keep the construction value
        this._construction = construction

        // Initialize the built steps
        this._buildedSteps = []

        // Build sanitize the build array.
        const steps = this._processConstruction(construction)

        // Remove all figures and builded steps.
        let i
        for (i = 0; i < this._buildedSteps.length; i++) {
            // Go through each already built steps.

            // It must be the same than the current one, in this order !
            if (this._buildedSteps[i].step !== steps[i]) {
                // Maybe it's the same object and it just needs to be updated !
                // This means that every beyond must be modified.

                // Not the same step ! Everything after this must be removed from the graph!
                for (let j = +i; j < this._buildedSteps.length; j++) {
                    // No figures to remove
                    if (this._buildedSteps[j].figures.length) { continue }

                    // Remove the figures
                    for (const fig of this._buildedSteps[j].figures) { fig.remove() }
                }

                this._buildedSteps = this._buildedSteps.slice(0, i)
                break

            }


        }

        // Build the new steps from the current point
        const { freezedFigures } = this.generate(steps.slice(i), { refresh, keysOnly: false })

        // Update globally the graph
        this.graph.update()

        // Freeze the static elements.
        if (refresh) {
            freezedFigures.forEach(fig => {
                fig.freeze = true
            })
        }
    }

    updateLayout(parameters: string): this {
        // x=3:-5,y=-5:2                            min/max
        // ppu=50                                   pixels per unit
        // grid/nogrid                              show / hide grid
        // axis/miniaxis/noaxes                     show full axes, min axes (one unit long), hide axis
        // unit=1:5                                 unit on x scale / y scale
        const values = parameters.split(',')

        let xMin = -1,
            xMax = 10,
            yMin = -1,
            yMax = 10,
            ppu = null,
            xUnit = 1,
            yUnit = 1

        for (const param of values) {
            if (param.includes('=')) {
                const [key, value] = param.split("=")
                // let keyValue = param.split('=')
                if (key === 'x') {
                    if (value.includes(':')) {
                        const [a, b] = value.split(":").map(x => +x)
                        if (!isNaN(a) && !isNaN(b)) {
                            xMin = Math.min(a, b)
                            xMax = Math.max(a, b, a + 1)
                        }
                    }
                } else if (key === 'y') {
                    if (value.includes(':')) {
                        const [a, b] = value.split(":").map(x => +x)
                        if (!isNaN(a) && !isNaN(b)) {
                            yMin = Math.min(a, b)
                            yMax = Math.max(a, b, a + 1)
                        }
                    }
                } else if (key === 'ppu') {
                    if (!isNaN(+value) && +value > 0) {
                        ppu = +value
                    }
                } else if (key === "unit") {
                    if (value.includes(':')) {
                        xUnit = +value.split(':')[0]
                        yUnit = +value.split(':')[1]
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

        this._graph.updateLayout({
            xMin,
            xMax,
            yMin,
            yMax,
            pixelsPerUnit: ppu ?? 0
        }, false)

        // Update the grid for different ppuX / ppuY
        if (xUnit !== yUnit) {
            this._graph.pixelsPerUnit = {
                x: this._graph.pixelsPerUnit.x / xUnit,
                y: this._graph.pixelsPerUnit.y / yUnit
            }
        }

        // Update the grid
        if (values.includes('grid')) {
            this._graph.getFigure('MAINGRID')?.update().show()
        } else {
            this._graph.getFigure('MAINGRID')?.hide()
        }

        // update the axis
        if (values.includes('axis')) {
            let axis = this._graph.getFigure('Ox')
            if (axis instanceof Axis) {
                axis.setMinAxis(false).width(2).update().show()
            }
            axis = this._graph.getFigure('Oy')

            if (axis instanceof Axis) {
                axis.setMinAxis(false).width(2).update().show()
            }
        } else if (values.includes('minaxis')) {
            let axis = this._graph.getFigure('Ox')
            if (axis instanceof Axis) {
                axis.setMinAxis(true).width(1).update().show()
            }
            axis = this._graph.getFigure('Oy')

            if (axis instanceof Axis) {
                axis.setMinAxis(true).width(1).update().show()
            }
        } else {
            this._graph.getFigure('Ox')?.hide()
            this._graph.getFigure('Oy')?.hide()
        }

        // Other options
        this._config.nolabel = values.includes('nolabel')
        this._config.nopoint = values.includes('nopoint')
        this._config.labelAsTex = values.includes('tex')

        this.update(this._construction, true)
        return this
    }

    preprocess(step: string): ParserPreprocessType {
        return this._preprocess(step)
    }

    generate(steps: string[], parameters: { refresh?: boolean, keysOnly: boolean }): {
        buildedKeys: string[],
        freezedFigures: Figure[]
    } {
        // get all current figures.
        let builded: { step: string, figures: Figure[] }, freeze = false
        const buildedKeys: string[] = []
        const freezedFigures: Figure[] = []

        for (const construct of steps) {
            // The step command is empty or too small - do not continue to parse it.
            if (construct.length < 3) {
                continue
            }

            if (construct.startsWith('@')) {
                // Special commands
                if (construct === '@begin:static') { freeze = true }
                if (construct === '@end:static') { freeze = false }
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
            // try {
            const { label, key, code, options } = this._preprocess(construct)

            buildedKeys.push(key)

            // continue;
            if (!parameters.keysOnly) {
                if (Object.hasOwn(parserKeys, key)) {
                    builded.figures = parserKeys[key].generate(this, label, code, options)
                } else {
                    console.log('No key found for ' + construct)
                }

                // apply options
                this._postprocess(builded, options)

                // Do whatever check
                this._buildedSteps.push(builded)

                if (freeze) {
                    freezedFigures.push(...builded.figures)
                }
            }

            // } catch (error) {
            //     console.warn({
            //         step: construct,
            //         error
            //     })
            // }
        }

        return { buildedKeys, freezedFigures }
    }

    getHelperText(step: string): {
        parameters: string,
        description: string,
        options: string
    } | null {
        return parserHelperText(step)
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
    private _preprocess(step: string): ParserPreprocessType {
        return parserPreprocess(step)
    }

    private _postprocess(builded: BuildStep, codeOptions: string[]) {
        /**
         * builded: contains the figures for the current code
         * options: is the list of options to be applied.
         *          [optionA,optionB:param,optionC:param/other/some:thing]
         */

        // Reset the colors and labels
        builded.figures
            .forEach(fig => {
                // Set stroke to black
                fig.stroke('black')

                // Change the fill value
                if (fig instanceof Point) {
                    fig.fill("white")
                } else {
                    fig.fill('transparent')
                }

                // If the label is shown, maybe force it to be as TeX.
                if (fig instanceof Point && !fig.isInvisible()) {
                    // Hide or show the label
                    if (this._config.nolabel) {
                        fig.hideLabel()
                    } else {
                        if (fig instanceof Point) {
                            fig.showLabel()
                        } else {
                            // Always hide by default every label other than points
                            (fig as Figure).hideLabel()
                        }
                    }

                    if (
                        fig.label &&
                        fig.label.isTex !== this._config.labelAsTex &&
                        codeOptions.filter(x => x.startsWith('label') || x.startsWith('tex')).length === 0 &&
                        !codeOptions.includes('hide') && !codeOptions.includes('?')
                    ) {
                        codeOptions.push(this._config.labelAsTex ? 'tex' : 'label')
                        fig.label.isTex = this._config.labelAsTex
                    }
                }

                // Hide or show the points
                if (this._config.nopoint && fig instanceof Point) {
                    fig.hide()
                }
            })


        if (codeOptions.length > 0) {
            codeOptions.forEach(elWithCodeOptions => {
                // let options = elWithCodeOptions.split(':'),
                //     key = options.shift(),
                //     keyParameter = ""

                let options = elWithCodeOptions.split('/')
                // TODO: Make a smarter key / param / options parser
                const key_param = options.shift() ?? ''
                const [key, param] = key_param.split(':')

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
                        if (fig instanceof Point && ["*", "o", "sq", "tick"].includes(key)) {
                            setPointStyle(fig, key, options.length > 0 ? +options[0] : null)

                            if (key === "tick" && fig.label) {
                                // Change the label.
                                fig.label.isTex = true
                                if (fig.coord.x !== 0 && fig.coord.y === 0) {
                                    fig.label.position('bc')
                                    fig.displayName = fig.coord.x.toString()
                                } else if (fig.coord.x === 0 && fig.coord.y !== 0) {
                                    fig.label.position('ml')
                                    fig.displayName = fig.coord.y.toString()
                                } else if (fig.coord.x === 0 && fig.coord.y === 0) {
                                    fig.label.position('bl')
                                    fig.displayName = "0"
                                } else {
                                    fig.label.position('br')
                                    fig.displayName = `(${fig.coord.x},${fig.coord.y})`
                                }
                            }
                        }
                        else if (key === 'static') {
                            fig.freeze = true
                            // Drag options
                        }
                        else if (key === 'drag' && fig instanceof Point) {
                            // Get the figure to follow
                            // Might be the horizontal axes
                            let follow: Figure | string | null
                            if (param === 'grid') {
                                follow = this._graph.getGrid()
                            } else if (param !== 'x' && param != 'y') {
                                follow = this._graph.getFigure(param)
                            } else {
                                follow = param
                            }

                            // Determine the bounds
                            const bounds: { x?: [number, number], y?: [number, number], d?: [number, number] } = {}
                            if (options.length) {
                                if (follow instanceof Circle) {
                                    if (options[0] === 'in') {
                                        bounds.d = [0, follow.getRadiusAsPixels() - 5]
                                    } else if (options[0] === 'out') {
                                        bounds.d = [follow.getRadiusAsPixels() + 5, 1000]
                                    }
                                }
                                const bndX = options[0].split(":").map(x => +x)
                                if (bndX.length === 2) {
                                    bounds.x = [bndX[0], bndX[1]]
                                }
                            }
                            if (options.length > 1) {
                                const bndY = options[1].split(":").map(x => +x)
                                if (bndY.length === 2) {
                                    bounds.y = [bndY[0], bndY[1]]
                                }
                            }

                            fig.draggable({
                                constrain: follow ?? '',
                                bounds
                            })
                        }
                        else if (key === 'trace') {
                            if (fig instanceof Point) {
                                fig.trace(param, +options[0])
                            }
                        }
                        // Everything with DASH and DOTS
                        else if (key === 'dash' || key === 'dot') {
                            const scale = this._graph.pixelsPerUnit.x / 10
                            if (param || !isNaN(+param)) {
                                const size: number = param ? 5 : +param
                                fig.dash(key === 'dash' ? size * scale : `${scale / 2} ${size}`)
                            } else {
                                // Convert the values to the units.
                                const values = param.split(" ")
                                    .map(v => +v * scale)
                                fig.dash(values.join(" "))
                            }
                        }
                        // Everything for the line WIDTH
                        else if (key === 'w') {
                            fig.width(+param)
                        } else if (key === 'thick') {
                            fig.thick()
                        } else if (key === 'thin') {
                            fig.thin()
                        } else if (key === 'ultrathick') {
                            fig.ultrathick()
                        } else if (key === 'ultrathin') {
                            fig.ultrathin()
                        }
                        // Everything concerning the hide / show of items
                        // label / ? : show or hide the label
                        // ! : hide the figure
                        // hide: hide label and figure.

                        // else if (key === 'label') {
                        //     fig.label.show()
                        // }
                        else if (key === '?') {
                            fig.label?.hide()
                        } else if (key === '!') {
                            fig.hide()
                        } else if (key === 'hide') {
                            fig.label?.hide()
                            fig.hide()
                        }
                        // Everything concerning the end of line marks
                        else if (key.startsWith('mark')) {
                            if (options.length === 0) {
                                options = ["start", "mid", "end"]
                            }
                            if ((fig.svg instanceof Path) || (fig.svg instanceof svgLine)) {
                                for (const pos of options) {
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
                        }
                        // Everything concerning the label text: either plain text, either TeX
                        else if (fig.label && (key === 'tex' || key === 'label')) {
                            // Label configuration
                            // <tex or text>:name/position/x:y
                            // let [label, position, offset] = key.substring(1).split("/")

                            // Set it as TeX
                            fig.label.isTex = key === 'tex'

                            // Setting display name
                            if (typeof param === "string" && param.includes('~')) {
                                fig.label.template = param
                            }
                            fig.displayName = param

                            // Changing the default position
                            const position = options.filter(opt => opt.match(/[tmblcr]{1,2}/))[0] ?? ""
                            if (position !== "") {
                                fig.label.position(position)
                            }

                            // Adding offsets
                            const offset = options.filter(opt => opt.includes(':'))[0] ?? ""
                            if (offset !== "") {
                                const [x, y] = offset.split(':').map(v => +v)

                                if (!isNaN(x) && !isNaN(y)) {
                                    // Convert the distances to pixels.
                                    fig.label.offset({
                                        x: this._graph.distanceToPixels(x),
                                        y: this._graph.distanceToPixels(y, AXIS.VERTICAL)
                                    })
                                }
                            }

                            // Make sure the label is visible
                            fig.showLabel().updateLabel()
                        }

                        // Move the figure
                        // TODO: must change the value to UNIT and also move the label the same way.
                        else if (key.startsWith('move')) {
                            // move/4
                            // move/4:6
                            if (options.length > 0) {
                                const [x, y] = options[0].split(':')

                                // Convert the distances to pixels.
                                const dx = this._graph.distanceToPixels(+x),
                                    dy = this._graph.distanceToPixels(y ? 0 : +y, AXIS.VERTICAL)

                                if (y && fig instanceof Line) {
                                    const n = fig.math.normal,
                                        norm = n.norm

                                    fig.svg.translate(
                                        n.x / norm * (dx),
                                        n.y / norm * (dx)
                                    )

                                    // Move the label
                                    fig.label?.offset({
                                        x: n.x / norm * (dx),
                                        y: n.y / norm * (-dx)
                                    })
                                } else {
                                    fig.svg.translate(dx, -dy)
                                    fig.label?.offset({ x: dx, y: dy })
                                }
                            }


                        }
                        // Rotate the svg element
                        else if (key === 'rotate') {
                            // origin: x:y
                            // angle: number

                            const O = this._graph.getPoint(param)
                            if (O instanceof Point) {
                                fig.svg.rotate(-options[0], O.x, O.y)
                            } else {
                                fig.svg.rotate(-options[0])
                            }
                        }
                        // Everything concerning the color
                        // fill:color   to fill the figure
                        // color        to stroke the figure
                        else if (key === 'fill') {
                            // fill color
                            // let [color, opacity] = options[0].split('/')
                            if (CSS.supports('color', param)) {
                                const opacity = isNaN(+options[0]) ? 1 : +options[0]
                                fig.fill({ color: param, opacity })
                            }
                        } else if (CSS.supports('color', key)) {
                            const opacity = isNaN(+options[0]) ? 1 : +options[0]
                            // stroke
                            fig.stroke({ color: key, opacity })
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
            .filter(x => !x.startsWith("$") && !x.startsWith("%"))  // remove commented lines
    }

}