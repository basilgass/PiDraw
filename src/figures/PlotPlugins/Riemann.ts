import {Figure} from "../Figure";
import {AXIS} from "../../variables/enums";
import {Rect} from "@svgdotjs/svg.js";
import {Plot} from "../Plot";

export class Riemann extends Figure {
    #plot: Plot
    #from: number
    #to: number
    #number: number
    #below: boolean
    #rectangles: Rect[]

    constructor(plot: Plot, from: number, to: number, rectangles: number, below?: boolean) {
        super(plot.graph, '');

        this.#plot = plot
        this.#from = from
        this.#to = to
        this.#number = rectangles
        this.#below = below === undefined || below

        this.svg = this.graph.svg.group()
        this.#rectangles = []

        this.updateFigure()
    }

    get plot(): Plot {
        return this.#plot;
    }

    get from(): number {
        return this.#from;
    }

    set from(value: number) {
        this.#from = value;
        this.update()
    }

    get to(): number {
        return this.#to;
    }

    set to(value: number) {
        this.#to = value;
        this.update()
    }

    get number(): number {
        return this.#number;
    }

    set number(value: number) {
        this.#number = value;
        this.update()
    }

    get below(): boolean {
        return this.#below;
    }

    set below(value: boolean) {
        this.#below = value;
        this.update()
    }

    get rectangles(): Rect[] {
        return this.#rectangles;
    }

    clean() {
        for (let r of this.#rectangles) {
            r.remove()
        }
        this.svg.remove()
    }

    updateFigure(): Riemann {
        let x = 0, y = 0,
            height,
            step = (this.#to - this.#from) / this.#number,
            width = this.graph.distanceToPixels(step),
            pxX

        // reset the rectangles if not the same number (for animation purpose)
        if (this.#rectangles !== undefined && this.#number !== this.#rectangles.length) {
            this.clean()
        }

        // Generate the base version with "flatten rectangle"
        if (this.#rectangles === undefined || this.#number !== this.#rectangles.length) {
            this.#rectangles = []

            // Create the zero height rectangles.
            for (let i = 0; i < this.#number; i++) {
                // Unit value
                x = +this.#from + step * i
                y = x + step
                // pixels value
                pxX = this.graph.unitsToPixels({x: x, y: 0})
                height = 0

                this.#rectangles.push(
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

        for (let i = 0; i < this.#number; i++) {
            // Unit value
            x = +this.#from + step * i
            y = x + step
            // pixels value
            pxX = this.graph.unitsToPixels({x: x, y: 0})

            // The value can be negative
            height = this.graph.distanceToPixels(
                (this.#below === undefined || this.#below) ? this.#plot.evaluate(x).y : this.#plot.evaluate(y).y, AXIS.VERTICAL
            )

            this.#rectangles[i]
                .data('values', {x, y, height, width})
                .animate(500)
                .height(Math.abs(height))
                .width(width)
                .move(pxX.x, pxX.y - (height > 0 ? height : 0))

        }

        return this
    }
}