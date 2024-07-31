import { Svg, G, Shape } from "@svgdotjs/svg.js"
import { IFigureAppearanceConfig, IGraphConfig, XY } from "../pidraw.common"
import { } from "@svgdotjs/svg.js"
import { Label } from "../labels/Label"

export abstract class AbstractFigure {
    #rootSVG: Svg
    #name: string
    #element: G
    #shape: Shape
    #appearance: IFigureAppearanceConfig
    #static: boolean
    #isDraggable: boolean
    #label: Label | null

    // abstract #makeShape(): Shape
    abstract computed(): this

    constructor(rootSVG: Svg, name: string) {
        this.#rootSVG = rootSVG
        this.#name = name
        this.#static = false
        this.#isDraggable = false

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

    get element() { return this.#element }
    get name() { return this.#name }
    get rootSVG() { return this.#rootSVG }
    get shape() { return this.#shape }
    set shape(value: Shape) { this.#shape = value }
    get appearance() { return this.#appearance }
    set appearance(value) { this.#appearance = value }
    get graphConfig() { return this.#rootSVG.data('config') as IGraphConfig }
    get static() { return this.#static }
    set static(value: boolean) { this.#static = value }
    get isDraggable() { return this.#isDraggable }
    set isDraggable(value: boolean) { this.#isDraggable = value }

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
        if (typeof color === 'number' || strokeWidth === undefined) {
            this.#appearance.stroke.width = color as number
        }

        this.strokeable().forEach((shape) => {
            shape.stroke(this.#appearance.stroke)
            shape.opacity(this.#appearance.stroke.opacity)
        })

        return this
    }

    dash(dasharray?: string): this {
        this.strokeable().forEach((shape) => {
            shape.stroke({ dasharray: dasharray ?? (this.graphConfig.axis.x.x / 2).toString() })
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
            if (child.attr('id') !== `${this.#name}-label`) { child.remove() }
        })
        return this
    }

    update(forceUpdate?: boolean): this {
        if (this.name === 'B') {
            console.log(this.name, this.static)
        }

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
                offset: { x: 0, y: 0 },
                texConverter: texConverter ?? ((value: string) => value)
            })

        this.updateLabel()
        return this.#label
    }
    get label() { return this.#label }
    abstract moveLabel(): this

    // Update the label of the figure when the figure is updated.
    updateLabel(): this {
        if (!this.#label) { return this }

        // if the label is dynamic, update it.
        this.#label.setLabel(this.computeLabel())

        // Move the label position
        this.moveLabel()

        return this
    }

    computeLabel(): string {
        return this.#label?.config.text ?? this.#name
    }

    follow(x: number, y: number): XY {
        return { x, y }
    }
}