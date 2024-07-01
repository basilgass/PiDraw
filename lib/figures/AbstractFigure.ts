import { Svg, G, Shape } from "@svgdotjs/svg.js"
import { IFigureAppearanceConfig, IGraphConfig } from "../pidraw.common"
import { } from "@svgdotjs/svg.js"
import { Label } from "../labels/Label"

export abstract class AbstractFigure {
    #rootSVG: Svg
    #name: string
    #element: G
    #shape: Shape
    #appearance: IFigureAppearanceConfig
    #static: boolean
    #label: Label | null

    // abstract #makeShape(): Shape
    abstract computed(): this

    constructor(rootSVG: Svg, name: string) {
        this.#rootSVG = rootSVG
        this.#name = name
        this.#static = false

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
                opacity: 1
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


    fill(color?: string): this {
        if (typeof color === 'string' && color.includes('/')) {
            const [colorName, opacity] = color.split('/')
            this.#appearance.fill.color = colorName
            this.#appearance.fill.opacity = parseFloat(opacity)
            this.#shape.fill(this.#appearance.fill)
            return this
        }
        this.#appearance.fill.color = color ?? this.#appearance.fill.color

        this.#shape.fill(this.#appearance.fill)
        this.#shape.opacity(this.#appearance.fill.opacity)
        return this
    }

    stroke(): this
    stroke(color: string): this
    stroke(strokeWidth: number): this
    stroke(color: string, strokeWidth: number): this
    stroke(color?: string | number, strokeWidth?: number): this {


        if (typeof color === 'string' && color.includes('/')) {
            const [colorName, opacity] = color.split('/')

            this.#appearance.stroke.color = colorName
            this.#appearance.stroke.width = (strokeWidth ?? this.#appearance.stroke.width)
            this.#appearance.stroke.opacity = parseFloat(opacity)

            this.#shape.stroke(this.#appearance.stroke)
            return this
        }

        this.#appearance.stroke.color = (typeof color === 'string') ? color : this.#appearance.stroke.color
        this.#appearance.stroke.width = (typeof color === 'number') ? color : (strokeWidth ?? this.#appearance.stroke.width)
        this.#appearance.stroke.opacity = 1

        this.#shape.stroke(this.#appearance.stroke)
        return this
    }

    dash(dasharray?: string): this {
        this.#shape.stroke({ dasharray: dasharray ?? '5' })
        return this
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

    update(): this {
        if (this.static) { return this }

        this.computed()

        // Update the label.
        this.updateLabel()

        return this
    }


    // The position depends on the figure.
    addLabel(value?: string, asHtml?: boolean): Label {
        this.#label = new Label(this.#element, this.#name, value, asHtml)
        this.moveLabel()
        return this.#label
    }
    get label() { return this.#label }
    abstract moveLabel(): this

    // Update the label of the figure when the figure is updated.
    updateLabel(): this {
        if (!this.#label) { return this }

        // if the label is dynamic, update it.
        // TODO: dynamic label update.

        this.moveLabel()

        return this
    }
}