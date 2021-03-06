import {Figure} from "../Figure";
import {AXIS} from "../../variables/enums";
import {Rect} from "@svgdotjs/svg.js";
import {Plot} from "../Plot";

export class Riemann extends Figure {
    private _plot: Plot
    private _from: number
    private _to: number
    private _number: number
    private _pos: number
    private _rectangles: Rect[]

    constructor(plot: Plot, from: number, to: number, rectangles: number, pos?: number) {
        super(plot.graph, '');

        this._plot = plot
        this._from = from
        this._to = to
        this._number = rectangles
        this._pos = pos === undefined?0:pos

        if(pos<0){pos =0}
        if(pos>1){pos =1}

        this.svg = this.graph.svg.group()
        this._rectangles = []

        this.updateFigure()
    }

    get plot(): Plot {
        return this._plot;
    }

    get from(): number {
        return this._from;
    }

    set from(value: number) {
        this._from = value;
        this.update()
    }

    get to(): number {
        return this._to;
    }

    set to(value: number) {
        this._to = value;
        this.update()
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
        this.update()
    }

    get pos(): number {
        return this._pos;
    }

    set below(value: number) {
        this._pos = value;
        this.update()
    }

    get rectangles(): Rect[] {
        return this._rectangles;
    }

    clean() {
        for (let r of this._rectangles) {
            r.remove()
        }
        this.svg.remove()
    }

    updateFigure(): Riemann {
        let x = 0, y = 0,
            height,
            step = (this._to - this._from) / this._number,
            width = this.graph.distanceToPixels(step),
            pxX

        // reset the rectangles if not the same number (for animation purpose)
        if (this._rectangles !== undefined && this._number !== this._rectangles.length) {
            this.clean()
        }

        // Generate the base version with "flatten rectangle"
        if (this._rectangles === undefined || this._number !== this._rectangles.length) {
            this._rectangles = []

            // Create the zero height rectangles.
            for (let i = 0; i < this._number; i++) {
                // Unit value
                x = +this._from + step * i
                y = x + step
                // pixels value
                pxX = this.graph.unitsToPixels({x: x, y: 0})
                height = 0

                this._rectangles.push(
                    this.graph.svg.rect(
                        width,
                        height
                    )
                        .click(function () {
                            let event = new CustomEvent('RiemannRectangleClick',
                                {
                                    detail: this.data('values')
                                })
                            document.dispatchEvent(event)
                        })
                        .mouseover(function () {
                            this.fill('orange')
                        })
                        .mouseout(function () {
                            this.fill('yellow')
                        })
                        .move(pxX.x, pxX.y)
                        .addTo(this.svg)
                )
            }

            this.svg.fill('yellow')
                .stroke({
                    color: 'black', width: 1
                })

            // Add to the correct layer
            this.graph.layers.main.add(this.svg)

        }

        for (let i = 0; i < this._number; i++) {
            // Unit value
            x = +this._from + step * i
            y = x + step
            // pixels value
            pxX = this.graph.unitsToPixels({x: x, y: 0})

            // The value can be negative
            // (this._pos === undefined || this._pos) ? this._plot.evaluate(x).y : this._plot.evaluate(y).y, AXIS.VERTICAL
            height = this.graph.distanceToPixels(this._plot.evaluate(x + step*this._pos).y, AXIS.VERTICAL)

            this._rectangles[i]
                .data('values', {x, y, height, width})
                .animate(500)
                .height(Math.abs(height))
                .width(width)
                .move(pxX.x, pxX.y - (height > 0 ? height : 0))

        }

        return this
    }
}