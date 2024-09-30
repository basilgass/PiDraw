import { G, Text as svgLabel, ForeignObject as svgHTML, SVG } from "@svgdotjs/svg.js"
import type { XY } from "../pidraw.common"

type LabelType = svgLabel | svgHTML
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'
export interface ILabelConfig {
    text: string,
    asHtml: boolean,
    alignement: LABEL_POSITION,
    offset: XY,
    texConverter: (value: string) => string
}
export class Label {
    #element: G
    #name: string
    #shape: LabelType
    #config: ILabelConfig
    #displayName: string
    #x: number
    #y: number
    #style: string

    get config() { return this.#config }
    get x() { return this.#x }
    set x(value: number) { this.#x = value }
    get y() { return this.#y }
    set y(value: number) { this.#y = value }
    get asHtml() { return this.#config.asHtml }
    get shape() { return this.#shape }
    get alignement() { return this.#config.alignement }

    constructor(rootG: G, name: string, config: ILabelConfig) {
        // The parent group : the figure which the label is attached to.
        this.#element = rootG

        // The name of the label - it's the name / id of the label.
        // Uses the name of the base figure.
        this.#name = name

        // Store the configuration of the label.
        this.#config = Object.assign(
            {
                text: name,
                asHtml: false,
                alignement: 'br',
                offset: { x: 0, y: 0 },
                texConverter: (value: string) => value
            },
            config
        )

        // displayName is the text displayed on the label.
        this.#displayName = config.text ?? name

        // Position of the label
        this.#x = 0
        this.#y = 0

        // Default style
        this.#style = 'display: block; position: fixed; white-space:nowrap'

        // Create the label shape
        this.#shape = this.#makeLabel()
    }

    #makeLabel(): svgLabel | svgHTML {
        // Remove the existing label.
        if (this.#shape) { this.#shape.remove() }

        // Create a new label.
        this.#shape = this.#config.asHtml ?
            this.#element.foreignObject(1, 1)
                .attr('style', "overflow:visible")
                .add(SVG(`<div style="${this.#style}">${this.displayName}</div>`, true)) :
            this.#element.text(this.displayName)

        this.#shape.attr('id', `${this.#name}-label`)

        return this.#shape
    }

    // Get the label of the figure.
    get label(): LabelType { return this.#shape }

    get displayName() {
        if (this.#config.asHtml) {
            return this.#config.texConverter(this.#displayName)
        }
        return this.#displayName
    }


    hide() {
        this.#shape.hide()
        return this
    }
    show() {
        this.#shape.show()
        return this
    }
    // Set the label of the figure.
    setLabel(text?: string): this {
        // Default label is the name of the figure.
        if (text !== undefined) { this.#displayName = text }

        // Update the text.
        this.#makeLabel()

        return this
    }

    move(x: number, y: number): this {
        this.#x = x
        this.#y = y
        this.position()
        return this
    }
    rotate(angle: number): this {
        this.#shape.transform({
            rotate: angle,
            origin: { x: this.#x, y: this.#y }
        })
        return this
    }

    position(alignement?: LABEL_POSITION, offset?: XY): this {
        if (alignement === undefined) { alignement = this.#config.alignement }
        if (offset === undefined) { offset = this.#config.offset }

        // Make sure the offset is correct (NaN value must be zero.)
        offset = {
            x: isNaN(offset.x) ? 0 : offset.x,
            y: isNaN(offset.y) ? 0 : offset.y
        }

        // Set the alignement and offset
        this.#config.alignement = alignement
        this.#config.offset = offset

        // TODO: label placement / alignement to optimize !
        // Current object position
        let x = this.#x,
            y = this.#y

        // Get and set the width of the label
        let width = 0, height = 0
        if (this.#shape instanceof svgHTML) {
            // Getting the width and height of the HTML element
            width = this.#shape.node.children[0].clientWidth
            height = this.#shape.node.children[0].clientHeight

            this.label.width(width)
            this.label.height(height)
        } else {
            width = this.#shape.length()
            height = this.#shape.bbox().h
        }

        if (alignement.includes('l')) {
            x = x - width / 2 + (alignement.includes('m') ? -10 : 0)
        } else if (alignement.includes('r')) {
            x = x + width / 2 + (alignement.includes('m') ? 10 : 0)
        } else if (alignement.includes('c')) {
            x = +x
        }

        if (alignement.includes("t")) {
            y = y - height / 2
        } else if (alignement.includes("m")) {
            y = +y
        } else if (alignement.includes("b")) {
            y = y + height / 2
        }

        if (this.#shape instanceof svgHTML) {
            this.#shape.center(x + (offset.x ?? 0), y - (offset.y ?? 0))
        } else {
            this.#shape.center(x + (offset.x ?? 0), y - (offset.y ?? 0))
        }
        return this
    }

}