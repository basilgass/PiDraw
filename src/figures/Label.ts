import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Line} from "./Line";
import {Text} from "@svgdotjs/svg.js";

export enum LABELPOS {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'cener',
    TOP = 'top',
    BOTTOM = 'bottom',
    MIDDLE = 'middle'

}

export interface LabelConfig {
    el: Figure,
    position?: {
        horizontal: string,
        vertical: string
    },
    offset?: {
        dx: number,
        dy: number
    }
}

export class Label extends Figure {
    private _config: LabelConfig

    constructor(graph: Graph, name: string, config?: LabelConfig) {
        super(graph, name);

        this.generateName()

        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            }
        }

        this._config = Object.assign({}, this._config, config)

        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({'anchor': 'middle'})
        this.graph.layers.foreground.add(this.svg)

        // Update the label text and position
        this.updateFigure()
    }

    generateName(): string {
        this.name = `LABEL_${this.name}`
        return this.name
    }

    updateFigure(): Label {
        let x = 0, y = 0, w = 0, h = 0

        if (this._config.el instanceof Point) {
            x = this._config.el.x
            y = this._config.el.y

        } else if (this._config.el instanceof Line) {

        }


        // Label position relative to the current (x,y) coordinate
        if (this.svg instanceof Text) {
            w = this.svg.length()
        }
        h = this._config.el.svg.bbox().h

        if (this._config.position) {
            if (this._config.position.horizontal === LABELPOS.LEFT) {
                x = x - w / 2
            } else if (this._config.position.horizontal === LABELPOS.RIGHT) {
                x = x + w
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

        this.svg.center(x, y)

        return this
    }
}