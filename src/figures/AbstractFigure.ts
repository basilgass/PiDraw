import {G, Path, Shape, Svg} from "@svgdotjs/svg.js"
import {type IFigureAnimation, type IFigureAppearanceConfig, type IGraphConfig, isXY, type XY} from "../pidraw.common"
import {Label} from "../labels/Label"
import {createMarker, toPixels} from "../Calculus"

export abstract class AbstractFigure {
    #rootSVG: Svg
    #name: string
    #element: G
    #shape: Shape
    #appearance: IFigureAppearanceConfig
    #static: boolean
    #isDraggable: boolean
    #label: Label | null

    #animate: IFigureAnimation | null

    constructor(rootSVG: Svg, name: string) {
        this.#rootSVG = rootSVG
        this.#name = name
        this.#static = false
        this.#isDraggable = false
        this.#animate = null

        this.#label = null
        this.#element = this.#rootSVG.group().attr('id', this.#name)
        this.#appearance = {
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

        this.#shape = this.#element.path()
    }

    get element() {
        return this.#element
    }

    get name() {
        return this.#name
    }

    get rootSVG() {
        return this.#rootSVG
    }

    get shape() {
        return this.#shape
    }

    set shape(value: Shape) {
        this.#shape = value
    }

    get appearance() {
        return this.#appearance
    }

    set appearance(value) {
        this.#appearance = value
    }

    get graphConfig() {
        return this.#rootSVG.data('config') as IGraphConfig
    }

    get static() {
        return this.#static
    }

    set static(value: boolean) {
        this.#static = value
    }

    get isDraggable() {
        return this.#isDraggable
    }

    set isDraggable(value: boolean) {
        this.#isDraggable = value
    }

    get label() {
        return this.#label
    }

    get animate(){
        return this.#animate
    }

    set animate(value){
        this.#animate = value
    }

    // abstract #makeShape(): Shape
    abstract computed(): this

    hide() {
        this.#element.hide()
        return this
    }

    show() {
        this.#element.show()
        return this
    }

    // Defines the shape as strokeable and fillable.
    strokeable(): Shape[] {
        return [this.#shape]
    }

    fillable(): Shape[] {
        return [this.#shape]
    }

    fill(color?: string): this {
        if (color !== undefined) {
            const [colorName, opacity] = color.split('/')
            this.#appearance.fill.color = colorName
            this.#appearance.fill.opacity = opacity === undefined ? 1 : +opacity
        }

        this.fillable().forEach((shape) => {
            shape.fill(this.#appearance.fill)
            shape.opacity(this.#appearance.fill.opacity)
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
            this.#appearance.stroke.color = colorName
            this.#appearance.stroke.opacity = opacity === undefined ? 1 : +opacity
            this.#appearance.stroke.width = strokeWidth ?? this.#appearance.stroke.width
        }

        if (typeof color === 'number' && strokeWidth === undefined) {
            this.#appearance.stroke.width = color
        }

        this.strokeable().forEach((shape) => {
            shape.stroke(this.#appearance.stroke)
            shape.opacity(this.#appearance.stroke.opacity)
        });

        // Apply the color and width to the markers.
        [this.#shape.reference('marker-start'), this.#shape.reference('marker-end')]
            .filter(x => x !== null)
            .forEach((marker) => {
                marker.children().forEach((m) => {
                    m.attr({
                        fill: this.#appearance.stroke.color,
                        stroke: this.#appearance.stroke.color,
                        'stroke-width': this.#appearance.stroke.width
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
            this.#element.clear()
            return this
        }

        // Remove everything but the label.
        this.#element.children().forEach((child) => {
            if (child.attr('id') !== `${this.#name}-label`) {
                child.remove()
            }
        })

        return this
    }

    update(forceUpdate?: boolean): this {
        if (
            (this.static || this.#isDraggable)
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
        this.#label = new Label(
            this.#element,
            this.#name,
            {
                text: text ?? this.#name,
                asHtml: asHtml ?? false,
                alignement: 'br',
                offset: {x: 0, y: 0},
                texConverter: texConverter ?? ((value: string) => value)
            })

        this.updateLabel()
        return this.#label
    }

    abstract moveLabel(): this

    // Update the label of the figure when the figure is updated.
    updateLabel(): this {
        if (!this.#label) {
            return this
        }

        // if the label is dynamic, update it.
        this.#label.setLabel(this.computeLabel())

        // Move the label position
        this.moveLabel()

        return this
    }

    computeLabel(): string {
        return this.#label?.config.text ?? this.#name
    }

    move(pos: number): this
    move(pos: XY): this
    move(pos: XY | number): this {
        if (isXY(pos)) {
            const dx = toPixels(pos.x, this.graphConfig)
            const dy = toPixels(pos.y, this.graphConfig)
            this.#shape.translate(dx, -dy)
        } else if (typeof pos === 'number') {
            const d = toPixels(pos, this.graphConfig)
            this.#shape.translate(d, 0)
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

        this.#shape.scale(value.x, value.y)
        return this
    }

    mark(value?: string | boolean, options?: (string | number)[]): this {
        const scale = options?.find(x => typeof x === 'number') ?? 10
        const shape = options?.find(x => typeof x === 'string') ?? '->'

        const marker = createMarker(
            this.#rootSVG,
            scale,
            shape
        )

        const path = this.#shape as Path

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