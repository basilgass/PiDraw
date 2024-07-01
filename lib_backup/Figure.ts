import { Label } from "./Label"
import { Shape, Marker } from "@svgdotjs/svg.js"
import { Svg } from "@svgdotjs/svg.js"
import { ILayers, IPoint, svgShape } from "./pidraw.interface"
import { AXIS } from "./enums"

export interface IGraphConfig {
    width: number,
    height: number,
    origin: IPoint,
    unitXDomain: { min: number, max: number },
    figures: Record<string, { figure: Figure, label?: Label }>,
    getFigure: (name: string) => Figure | null,
    markers: { start: Marker; end: Marker },
    layers: ILayers,
    pixelsPerUnit: IPoint,
    unitsToPixels: (value: IPoint) => IPoint,
    pixelsToUnits: (value: IPoint) => IPoint,
    distanceToPixels: (value: number, direction?: AXIS) => number
    update(): void
    updateLayout(config?: unknown, updateConstructions?: boolean): void
    getGrid: (name?: string) => Figure
    getPoint: (name: string) => Figure | null
}

export interface IFigureConfig {
    rootSVG: Svg,
    name: string,
    label?: Label,
    graph: IGraphConfig,
}

export class Figure {
    private _displayName: string
    /**
     * Define if the object should update or not.
     * @type {boolean}
     * @private
     */
    private _freeze: boolean
    private _label: Label | undefined
    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    private _name: string
    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    private _svg: svgShape | null

    private _rootSVG: Svg
    get rootSVG(): Svg { return this._rootSVG }

    private _graph: IGraphConfig
    get graph(): IGraphConfig { return this._graph }

    constructor(config: IFigureConfig) {
        // By default, freeze is disabled
        this._freeze = false

        // Store the svg
        this._rootSVG = config.rootSVG

        // Store the graph
        this._graph = config.graph

        // Store the name and display name
        this._label = config.label
        this._name = config.name
        this._displayName = config.name

        // This is the svg of the object.
        this._svg = null
    }

    freezeElement(): this {
        this._freeze = true
        return this
    }
    releaseElement(): this {
        this._freeze = false
        this.update()
        return this
    }
    get freeze(): boolean {
        return this._freeze
    }

    set freeze(value: boolean) {
        this._freeze = value
    }

    get name(): string {
        return this._name
    }

    set name(value: string) {
        this._name = value
    }

    get displayName(): string {
        return this._displayName
    }

    set displayName(value: string) {
        this._displayName = value
        this.generateDisplayName()
    }

    get svg(): Shape {
        if (this._svg === null) {
            throw new Error("SVG is not defined.")
        }
        return this._svg
    }

    set svg(value: Shape) {
        this._svg = value
    }

    get label(): Label | undefined {
        return this._label
    }

    set label(value: Label) {
        this._label = value
    }

    draw() {
        this._freeze = false
        this.update()
    }

    update(): this {
        // We don't want to update.
        if (this._freeze) { return this }

        this.updateFigure()

        if (this.label?.isShown()) { this.label.update() }

        return this
    }

    updateFigure(): this {
        return this
    }

    updateLabel(): this {
        if (this instanceof Label) { return this }

        this.label?.update()
        return this
    }

    remove(): void {
        if (this instanceof Label) { return }

        // Remove the label
        this.label?.svg.remove()
        this.label?.html.remove()

        // Remove the svg
        this.svg.remove()
    }

    generateName(): string {
        return this._name
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dash(value: string | number): this {
        // value = '5,5' or 5
        return this
    }

    width(value: number): this {
        this.svg.stroke({ width: value })

        return this
    }

    thin(): this {
        return this.width(1)
    }

    ultrathin(): this {
        return this.width(0.5)
    }

    thick(): this {
        return this.width(2)
    }

    ultrathick(): this {
        return this.width(3)
    }

    color(value: { color: string, opacity?: number } | string): this {

        if (typeof value === 'string') {
            value = { color: value, opacity: 1 }
        }

        this.svg.stroke(value)
        this.svg.fill(value)
        return this
    }

    stroke(value: { width?: number, color?: string, opacity?: number } | string): this {
        if (typeof value === "string") {
            this.svg.stroke({ color: value, opacity: 1 })
        } else {
            this.svg.stroke(value)
        }
        return this
    }

    fill(value: { color: string, opacity?: number } | string): this {
        if (typeof value === "string") {
            this.svg.fill({ color: value, opacity: 1 })
        } else {
            this.svg.fill(value)
        }
        return this
    }

    hide(): this {
        this._svg?.hide()
        return this
    }

    show(): this {
        this._svg?.show()
        return this
    }

    hideLabel(): this {
        this.label?.hide()
        return this
    }

    showLabel(): this {
        this.label?.show()
        return this
    }

    isShown(): boolean {
        return this._svg === null ? false : this._svg.visible()
    }


    generateDisplayName(): this {
        if (this.label === undefined) { return this }

        if (this._displayName) {
            this.label.displayName = this._displayName
        } else {
            this.label.displayName = this.name
        }

        return this
    }
}
