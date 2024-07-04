import { G, Text as svgLabel, ForeignObject as svgHTML, SVG } from "@svgdotjs/svg.js"
import { XY } from "../pidraw.common"

type LabelType = svgLabel | svgHTML
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'
export class Label {
    #element: G
    #name: string
    #shape: LabelType
    #displayName: string
    #isHtml: boolean
    #x: number
    #y: number
    #style: string
    #texConverter: (value: string) => string
    #alignement: LABEL_POSITION

    get name() { return this.#name }
    get x() { return this.#x }
    set x(value: number) { this.#x = value }
    get y() { return this.#y }
    set y(value: number) { this.#y = value }
    get isHtml() { return this.#isHtml }
    get shape() { return this.#shape }
    get alignement() { return this.#alignement }
    set alignement(value: LABEL_POSITION) { this.#alignement = value }

    constructor(rootG: G, name: string, config: {
        text?: string,
        asHtml?: boolean,
        texConverter?: (value: string) => string
    }) {
        this.#element = rootG
        this.#name = name
        this.#displayName = config.text ?? name
        this.#isHtml = config.asHtml ?? false
        this.#texConverter = config.texConverter ?? ((value: string) => value)
        this.#x = 0
        this.#y = 0

        this.#alignement = 'br'
        this.#style = 'display: block; position: fixed; white-space:nowrap'
        this.#shape = this.#makeLabel()
    }

    #makeLabel(): svgLabel | svgHTML {
        // Remove the existing label.
        if (this.#shape) { this.#shape.remove() }

        // Create a new label.
        this.#shape = this.#isHtml ?
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
        if (this.#isHtml) {
            return this.#texConverter(this.#displayName)
        }

        return this.#displayName
    }
    // Set the label of the figure.
    setLabel(text?: string): this {
        // Default label is the name of the figure.
        if (text !== undefined) { this.#displayName = text }

        // Update the text.
        this.#makeLabel()

        // this.moveLabel()
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
        if (alignement === undefined) { alignement = this.#alignement }

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
            x = x - width / 2
        } else if (alignement.includes('r')) {
            x = x + width / 2
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
            this.#shape.center(x + (offset?.x ?? 0), y - (offset?.y ?? 0))
        } else {
            this.#shape.center(x + (offset?.x ?? 0), y - (offset?.y ?? 0))
        }
        return this
    }

}