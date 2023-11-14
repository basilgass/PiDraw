import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Line} from "./Line";
import {ForeignObject, SVG, Text} from "@svgdotjs/svg.js";
import {IPoint} from "../variables/interfaces";
import {Arc} from "./Arc";
import {mathVector} from "../Calculus";

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
    template?: string
}

export class Label extends Figure {
    private _config: LabelConfig

    private _currentDisplayName: string

    constructor(graph: Graph, name: string, config?: LabelConfig) {
        super(graph, name);

        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            },
            offset: {x: 0, y: 0},
            template: null
        }

        this._config = Object.assign({}, this._config, config)

        this.generateName()
        this._currentDisplayName = this.displayName


        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({'anchor': 'middle'})
        this.graph.layers.foreground.add(this.svg)

        // How to handle dimension
        this._html = this.graph.svg.foreignObject(1, 1)
        this._html.attr('style', "overflow:visible")
        this.graph.layers.foreground.add(this._html)

        this.isTex = false

        // Update the label text and position
        this.updateFigure()
    }

    private _html: ForeignObject

    get html(): ForeignObject {
        return this._html;
    }

    private _isHtml: Boolean

    get isHtml(): Boolean {
        return this._isHtml;
    }

    set isHtml(value: Boolean) {
        this._isHtml = value;

        this.show()
    }

    private _isTex: Boolean

    get isTex(): Boolean {
        return this._isTex;
    }

    set isTex(value: Boolean) {
        this._isTex = value;
        this.isHtml = value
    }

    get displayName(): string {
        if (this.template === null) {
            return this._config.name === undefined ? this.name : this._config.name
        }

        // Build the name based on a template.
        let name = this._config.template

        if (name.includes('~')) {
            name = name
                .replaceAll(/~[A-Z0-9]+\.[xy]/g,
                    (match: string): string => {
                        let [ptName, direction] = match.substring(1).split(".")

                        let pt = this.graph.getPoint(ptName)
                        if (pt === null) {
                            return match.substring(1)
                        }

                        return direction === 'x' ? pt.coord.x.toString() : pt.coord.y.toString()
                    })

            name = name.replaceAll('+-', "-")
                .replaceAll('++', '+')
                .replaceAll('--', '+')
                .replaceAll('-+', '+')
        }

        return name
    }

    set displayName(value: string) {
        this._config.name = value
        this.updateFigure()
    }

    get template(): string {
        return this._config.template
    }

    set template(value: string) {
        this._config.template = value
    }

    hide(): Figure {
        this.svg.hide()
        this.html.hide()

        return this
    }

    show(): Figure {
        if (this._isHtml) {
            this.svg.hide()
            this.html.show()
        } else {
            this.svg.show()
            this.html.hide()
        }
        return this
    }

    isShown(): Boolean {
        return this.svg.visible() || this.html.visible()
    }

    addHtml(value: string): Label {
        // Remove existing values.
        this.html.children().forEach(child => child.remove())

        // @ts-ignore
        this.html.add(SVG(`<div style="display: inline-block; position: fixed">${this.isTex ? this._graph.toTex(value) : value}</div>`, true))

        this.isHtml = true
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
        const display = this.displayName
        if(this._currentDisplayName !== display) {
            if (!this.isHtml && this.svg instanceof Text) {
                // If it's the same text - no need to update it !
                    this.svg.text(display)
            } else {
                this.addHtml(display)
            }
            this._currentDisplayName = display
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
        } else if (this._config.el instanceof Arc) {
            /**
             * A(3,2)->drag
             * B(2,7)->drag
             * C(10,7)->drag
             * a=arc A,B,C
             */
            const arc = this._config.el,
                r = arc.getRadius,
                d = arc.angle < 180 ? 1 : -1

            const OA = new mathVector(arc.center, arc.start).unit
            const OB = new mathVector(arc.center, arc.end).unit


            const v = OA.add(OB).unit

            x = arc.center.x + d * v.x * (r + 20)
            y = arc.center.y + d * v.y * (r + 20)
        }


        // Label position relative to the current (x,y) coordinate
        if (this.isHtml) {
            // Getting the width and height of the HTML element
            w = this._html.node.children[0].clientWidth
            h = this._html.node.children[0].clientHeight

            this.html.width(w)
            this.html.height(h)
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