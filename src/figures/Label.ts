import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Line} from "./Line";
import {ForeignObject, SVG, Text} from "@svgdotjs/svg.js";
import {IPoint} from "../variables/interfaces";

export enum LABELPOS {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
    TOP = 'top',
    BOTTOM = 'bottom',
    MIDDLE = 'middle'

}

export interface LabelConfig {
    el: Figure,
    name?: string,
    offset?: {
        x: number,
        y: number
    }
    position?: {
        horizontal: string,
        vertical: string
    },
}

export class Label extends Figure {
    private _config: LabelConfig
    private _html: ForeignObject
    private _isHtml: Boolean

    constructor(graph: Graph, name: string, config?: LabelConfig) {
        super(graph, name);

        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            },
            offset: {x: 0, y: 0}
        }

        this._config = Object.assign({}, this._config, config)

        this.generateName()

        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({'anchor': 'middle'})
        this.graph.layers.foreground.add(this.svg)

        // How to handle dimension
        this._html = this.graph.svg.foreignObject(1, 1)
        this._html.attr('style', "overflow:visible")
        this.graph.layers.foreground.add(this._html)

        this.isHtml = false

        // Update the label text and position
        this.updateFigure()
    }

    get isHtml(): Boolean {
        return this._isHtml;
    }

    set isHtml(value: Boolean) {
        this._isHtml = value;

        if (this._isHtml) {
            this.svg.hide()
            this.html.show()
        } else {
            this.svg.show()
            this.html.hide()
        }
    }

    get html(): ForeignObject {
        return this._html;
    }

    get displayName(): string {
        return this._config.name === undefined ? this.name : this._config.name
    }

    set displayName(value: string) {
        this._config.name = value
        this.updateFigure()
    }

    addHtml(value: string): Label {
        // Remove existing values.
        this.html.children().forEach(child => child.remove())

        // @ts-ignore
        this.html.add(SVG(`<div style="display: inline-block">${value}</div>`, true))

        this.isHtml = true
        this.updateFigure()
        return this
    }

    offset(value: IPoint): Label {
        this._config.offset = value
        this.updateFigure()
        return this
    }

    position(value: string): Label {
        if (value.includes('l')) {
            this._config.position.horizontal = LABELPOS.LEFT
        }
        if (value.includes('c')) {
            this._config.position.horizontal = LABELPOS.CENTER
        }
        if (value.includes('r')) {
            this._config.position.horizontal = LABELPOS.RIGHT
        }
        if (value.includes('t')) {
            this._config.position.vertical = LABELPOS.TOP
        }
        if (value.includes('m')) {
            this._config.position.vertical = LABELPOS.MIDDLE
        }
        if (value.includes('b')) {
            this._config.position.vertical = LABELPOS.BOTTOM
        }

        this.updateFigure()
        return this
    }

    center(): Label {
        this._config.position.horizontal = LABELPOS.CENTER

        this.updateFigure()
        return this
    }

    middle(): Label {
        this._config.position.vertical = LABELPOS.MIDDLE

        this.updateFigure()
        return this
    }

    generateName(): string {
        if (this.name === undefined) {
            this.name = '?'
            return this.name
        }

        if (this.name.includes('_')) {
            // it has subscript part.
        }
        return this.name
    }

    updateFigure(): Label {
        let x = 0, y = 0, w = 0, h = 0

        // Update the name
        if (this.svg instanceof Text) {
            this.svg.text(this.displayName)
        }

        // Get the default position
        if (this._config.el instanceof Point) {
            x = this._config.el.x
            y = this._config.el.y
        } else if (this._config.el instanceof Line) {
            if (this._config.el.segment) {
                x = (this._config.el.A.x + this._config.el.B.x) / 2
                y = (this._config.el.A.y + this._config.el.B.y) / 2
            } else {
                //TODO: set the label for a line
            }
        }


        // Label position relative to the current (x,y) coordinate
        if (this.isHtml) {
            // Getting the width and height of the HTML element
            w = this._html.node.children[0].clientWidth
            h = this._html.node.children[0].clientHeight

            this.html.width(w)
            this.html.height(h)
            //
            // this._HtmlLabelRefresh()
        } else {
            if (this.svg instanceof Text) {
                w = this.svg.length()
            }
            h = this.svg.bbox().h
        }

        if (this._config.position) {
            if (this._config.position.horizontal === LABELPOS.LEFT) {
                x = x - w / 2
            } else if (this._config.position.horizontal === LABELPOS.RIGHT) {
                x = x + w / 2
            } else if (this._config.position.horizontal === LABELPOS.CENTER) {
                x = +x
            }

            if (this._config.position.vertical === LABELPOS.TOP) {
                y = y - h / 2
            } else if (this._config.position.vertical === LABELPOS.MIDDLE) {
                y = +y
            } else if (this._config.position.vertical === LABELPOS.BOTTOM) {
                y = y + h / 2
            }
        }

        if (this.isHtml) {
            this.html.center(x + this._config.offset.x, y - this._config.offset.y)
        } else {
            this.svg.center(x + this._config.offset.x, y - this._config.offset.y)
        }

        return this
    }

    // private _HtmlLabelRefresh(timeout?: number) {
    //     setTimeout(() => {
    //         let w = this._html.node.children[0].clientWidth,
    //             h = this._html.node.children[0].clientHeight
    //         // Getting the width and height of the HTML element
    //         this.html.width(w)
    //         this.html.height(h)
    //     }, timeout || 500)
    // }
}