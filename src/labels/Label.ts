import {ForeignObject as svgHTML, G, SVG, Text as svgLabel} from "@svgdotjs/svg.js"
import type {XY} from "../pidraw.common"

type LabelType = svgLabel | svgHTML
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'
export interface ILabelConfig {
    text: string,
    asHtml: boolean,
    alignement: LABEL_POSITION,
    offset: XY,
    rotate?: number,
    texConverter: (value: string) => string
}
export class Label {
    _element: G
    protected _name: string
    protected _style: string

    constructor(rootG: G, name: string, config: ILabelConfig) {
        // The parent group : the figure which the label is attached to.
        this._element = rootG

        // The name of the label - it's the name / id of the label.
        // Uses the name of the base figure.
        this._name = name

        // Store the configuration of the label.
        this._config = Object.assign(
            {
                text: name,
                asHtml: false,
                alignement: 'br',
                offset: { x: 0, y: 0 },
                rotate: 0,
                texConverter: (value: string) => value
            },
            config
        )

        // displayName is the text displayed on the label.
        this._displayName = config.text ?? name

        // Position of the label
        this._x = 0
        this._y = 0

        // Default style
        this._style = 'display: block; position: fixed; white-space:nowrap'

        // Create the label shape
        this._shape = this._makeLabel()
    }

    protected _shape: LabelType

    get shape() { return this._shape }

    protected _config: ILabelConfig

    get config() { return this._config }

    protected _displayName: string

    get displayName() {
        if (this._config.asHtml) {
            return this._config.texConverter(this._displayName)
        }
        return this._displayName
    }

    protected _x: number

    get x() { return this._x }

    set x(value: number) { this._x = value }

    protected _y: number

    get y() { return this._y }

    set y(value: number) { this._y = value }

    protected _auto_rotate = false

    get auto_rotate(): boolean {
        return this._auto_rotate
    }

    set auto_rotate(value: boolean) {
        this._auto_rotate = value
    }

    get asHtml() { return this._config.asHtml }

    get alignement() { return this._config.alignement }

    // Get the label of the figure.
    get label(): LabelType { return this._shape }

    hide() {
        this._shape.hide()
        return this
    }

    show() {
        this._shape.show()
        return this
    }

    // Set the label of the figure.
    setLabel(text?: string): this {
        // Default label is the name of the figure.
        if (text !== undefined) { this._displayName = text }

        // Update the text.
        this._makeLabel()

        return this
    }

    move(x: number, y: number): this {
        this._x = x
        this._y = y
        this.position()
        return this
    }

    rotate(angle: number): this {
        this._shape.transform({
            rotate: angle,
            origin: { x: this._x, y: this._y }
        })
        return this
    }

    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number): this {
        alignement ??= this._config.alignement
        offset ??= this._config.offset
        rotate ??= this._config.rotate

        // Make sure the offset is correct (NaN value must be zero.)
        offset = {
            x: isNaN(offset.x) ? 0 : offset.x,
            y: isNaN(offset.y) ? 0 : offset.y
        }

        // Set the alignement and offset
        this._config.alignement = alignement
        this._config.offset = offset
        this._config.rotate = rotate

        // Current object position
        let x = this._x,
            y = this._y

        // Get and set the width of the label
        let width = 0, height = 0
        if (this._shape instanceof svgHTML) {
            // Getting the width and height of the HTML element
            width = this._shape.node.children[0].clientWidth
            height = this._shape.node.children[0].clientHeight

            this.label.width(width)
            this.label.height(height)
        } else {
            width = this._shape.length()
            height = this._shape.bbox().h
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

        if (this._shape instanceof svgHTML) {
            this._shape.center(x + (offset.x ?? 0), y - (offset.y ?? 0))
        } else {
            this._shape.center(x + (offset.x ?? 0), y - (offset.y ?? 0))
        }

        if(rotate !== 0 && rotate !== undefined) {
            this.rotate(rotate)
        }
        return this
    }

    _makeLabel(): svgLabel | svgHTML {
        // Remove the existing label.
        if (this._shape) { this._shape.remove() }

        // Create a new label.
        this._shape = this._config.asHtml ?
            this._element.foreignObject(1, 1)
                .attr('style', "overflow:visible")
                .add(SVG(`<div style="${this._style}">${this.displayName}</div>`, true)) :
            this._element.text(this.displayName)

        this._shape.attr('id', `${this._name}-label`)

        return this._shape
    }

}