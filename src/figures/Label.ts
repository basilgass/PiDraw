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
    name?: string,
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

    get displayName(): string {
        return this._config.name===undefined?this.name:this._config.name
    }
    set displayName(value: string) {
        this._config.name = value
        this.updateFigure()
    }
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
        if(this.name===undefined){
            this.name = '?'
            return this.name
        }

        if(this.name.includes('_')){
            // it has subscript part.
        }
        return this.name
    }

    updateFigure(): Label {
        let x = 0, y = 0, w = 0, h = 0

        // Update the name
        if(this.svg instanceof Text) {
            this.svg.text(this.displayName)

        }

        if (this._config.el instanceof Point) {
            x = this._config.el.x
            y = this._config.el.y
        } else if (this._config.el instanceof Line) {
                //TODO: set the label for a line
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