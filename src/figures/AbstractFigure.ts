import {G, Path, Shape, Svg} from "@svgdotjs/svg.js"
import {type IFigureAnimation, type IFigureAppearanceConfig, type IGraphConfig, isXY, type XY} from "../pidraw.common"
import {Label} from "../labels/Label"
import {createMarker, toPixels} from "../Calculus"

export abstract class AbstractFigure {
    constructor(rootSVG: Svg, name: string) {
        this._rootSVG = rootSVG
        this._name = name
        this._static = false
        this._isDraggable = false
        this._animate = null

        this._label = null
        this._element = this._rootSVG.group().attr('id', this._name)
        this._appearance = {
            stroke: {
                color: 'black',
                width: 1,
                opacity: 1.0
            },
            fill: {
                color: 'transparent',
                opacity: 1.0
            },
        }

        this._shape = this._element.path()
    }

    protected _rootSVG: Svg

    get rootSVG() {
        return this._rootSVG
    }

    protected _name: string

    get name() {
        return this._name
    }

    protected _element: G

    get element() {
        return this._element
    }

    protected _shape: Shape

    get shape() {
        return this._shape
    }

    set shape(value: Shape) {
        this._shape = value
    }

    protected _appearance: IFigureAppearanceConfig

    get appearance() {
        return this._appearance
    }

    set appearance(value) {
        this._appearance = value
    }

    protected _static: boolean

    get static() {
        return this._static
    }

    set static(value: boolean) {
        this._static = value
    }

    protected _isDraggable: boolean

    get isDraggable() {
        return this._isDraggable
    }

    set isDraggable(value: boolean) {
        this._isDraggable = value
    }

    protected _label: Label | null

    get label() {
        return this._label
    }

    protected _animate: IFigureAnimation | null

    get animate(){
        return this._animate
    }

    set animate(value){
        this._animate = value
    }

    get graphConfig() {
        return this._rootSVG.data('config') as IGraphConfig
    }

    // abstract _makeShape(): Shape
    abstract computed(): this

    hide() {
        this._element.hide()
        return this
    }

    show() {
        this._element.show()
        return this
    }

    // Defines the shape as strokeable and fillable.
    strokeable(): Shape[] {
        return [this._shape]
    }

    fillable(): Shape[] {
        return [this._shape]
    }

    fill(color?: string): this {
        if (color !== undefined) {
            const [colorName, opacity] = color.split('/')
            this._appearance.fill.color = colorName
            this._appearance.fill.opacity = opacity === undefined ? 1 : +opacity
        }

        this.fillable().forEach((shape) => {
            shape.fill(this._appearance.fill)
            shape.opacity(this._appearance.fill.opacity)
        })

        return this
    }

    stroke(): this

    stroke(color: string): this

    stroke(strokeWidth: number): this

    stroke(color: string, strokeWidth: number): this

    stroke(color?: string | number, strokeWidth?: number): this {
        if (typeof color === 'string') {
            const [colorName, opacity] = color.split('/')
            this._appearance.stroke.color = colorName
            this._appearance.stroke.opacity = opacity === undefined ? 1 : +opacity
            this._appearance.stroke.width = strokeWidth ?? this._appearance.stroke.width
        }

        if (typeof color === 'number' && strokeWidth === undefined) {
            this._appearance.stroke.width = color
        }

        this.strokeable().forEach((shape) => {
            shape.stroke(this._appearance.stroke)
            shape.opacity(this._appearance.stroke.opacity)
        });

        // Apply the color and width to the markers.
        [this._shape.reference('marker-start'), this._shape.reference('marker-end')]
            .filter(x => x !== null)
            .forEach((marker) => {
                marker.children().forEach((m) => {
                    m.attr({
                        fill: this._appearance.stroke.color,
                        stroke: this._appearance.stroke.color,
                        'stroke-width': this._appearance.stroke.width
                    })
                })
            })

        return this
    }

    dash(dasharray?: string): this {
        this.strokeable().forEach((shape) => {
            shape.stroke({dasharray: dasharray ?? (this.graphConfig.axis.x.x / 2).toString()})
        })
        return this
    }

    dot(): this {
        return this.dash((3).toString())
    }

    clear(all?: boolean): this {

        // Clear the figure
        if (all) {
            this._element.clear()
            return this
        }

        // Remove everything but the label.
        this._element.children().forEach((child) => {
            if (child.attr('id') !== `${this._name}-label`) {
                child.remove()
            }
        })

        return this
    }

    update(forceUpdate?: boolean): this {
        if (
            (this.static || this._isDraggable)
            && forceUpdate !== true) {
            return this
        }

        this.computed()

        // Update the label.
        this.updateLabel()

        return this
    }

    // The position depends on the figure.
    addLabel(text?: string, asHtml?: boolean, texConverter?: (value: string) => string): Label {
        this._label = new Label(
            this._element,
            this._name,
            {
                text: text ?? this._name,
                asHtml: asHtml ?? false,
                alignement: 'br',
                offset: {x: 0, y: 0},
                texConverter: texConverter ?? ((value: string) => value)
            })

        this.updateLabel()
        return this._label
    }

    abstract moveLabel(): this

    // Update the label of the figure when the figure is updated.
    updateLabel(): this {
        if (!this._label) {
            return this
        }

        // if the label is dynamic, update it.
        this._label.setLabel(this.computeLabel())

        // Move the label position
        this.moveLabel()

        return this
    }

    computeLabel(): string {
        return this._label?.config.text ?? this._name
    }

    move(pos: number): this
    move(pos: XY): this
    move(pos: XY | number): this {
        if (isXY(pos)) {
            const dx = toPixels(pos.x, this.graphConfig)
            const dy = toPixels(pos.y, this.graphConfig)
            this._shape.translate(dx, -dy)
        } else if (typeof pos === 'number') {
            const d = toPixels(pos, this.graphConfig)
            this._shape.translate(d, 0)
        }
        return this
    }

    scale(value: XY | number): this {
        if (typeof value === 'number') {
            return this.scale({
                x: value,
                y: value
            })
        }

        this._shape.scale(value.x, value.y)
        return this
    }

    mark(value?: string | boolean, options?: (string | number)[]): this {
        const scale = options?.find(x => typeof x === 'number') ?? 10
        const shape = options?.find(x => typeof x === 'string') ?? '->'

        const marker = createMarker(
            this._rootSVG,
            this.name,
            scale,
            shape
        )

        const path = this._shape as Path

        if (value === 'start') {
            path.marker('start', marker)
            return this
        }
        if (value === 'end') {
            path.marker('end', marker)
            return this
        }

        path.marker('start', marker)
        path.marker('end', marker)

        return this
    }

    follow(x: number, y: number): XY {
        return {x, y}
    }
}