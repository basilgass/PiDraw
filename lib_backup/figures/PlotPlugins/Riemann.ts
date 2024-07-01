import { Figure, IFigureConfig } from "../../Figure"
import { IPlot } from "../../pidraw.interface"
import { AXIS } from "../../enums"
import { Rect } from "@svgdotjs/svg.js"

export interface RiemannValues {
    index: number
    box: {
        x: number
        y: number
        height: number
        width: number
    }
    coords: {
        a: number
        b: number
        dx: number
        dy: number
    }
}

export class Riemann extends Figure {
    private _from: number
    private _to: number
    private _number: number
    private _pos: number
    private _rectangles: Rect[]
    private _plot: IPlot

    constructor(config: IFigureConfig, plot: IPlot, from: number, to: number, rectangles: number, pos?: number) {
        super(config)

        this._plot = plot
        this._from = from
        this._to = to
        this._number = rectangles

        if (pos !== undefined) {
            if (pos < 0) {
                pos = 0
            }
            if (pos > 1) {
                pos = 1
            }
        } else {
            pos = 0
        }

        this._pos = pos



        this.svg = this.rootSVG.group()

        // Add the riemann plugin to the plotBG
        this.graph.layers.plotsBG.add(this.svg)

        this._rectangles = []

        this.updateFigure()
    }

    get from(): number {
        return this._from
    }

    set from(value: number) {
        this._from = value
        this.update()
    }

    get to(): number {
        return this._to
    }

    set to(value: number) {
        this._to = value
        this.update()
    }

    get number(): number {
        return this._number
    }

    set number(value: number) {
        this._number = value
        this.update()
    }

    get pos(): number {
        return this._pos
    }

    set below(value: number) {
        this._pos = value
        this.update()
    }

    get rectangles(): Rect[] {
        return this._rectangles
    }

    clean() {
        for (const r of this._rectangles) {
            // Remove the listener
            r.off('riemann')
            r.click(null)
            r.mouseover(null)
            r.mouseout(null)
            r.remove()
        }
        this.svg.remove()
    }

    updateFigure(): this {
        let x = 0, y = 0,
            height,
            pxX

        const step = (this._to - this._from) / this._number,
            width = this.graph.distanceToPixels(step)


        // reset the rectangles if not the same number (for animation purpose)
        if (this._rectangles.length && this._number !== this._rectangles.length) {
            this.clean()
        }

        // Generate the base version with "flatten rectangle"
        if (this._rectangles.length === 0 || this._number !== this._rectangles.length) {
            this._rectangles = []

            // Create the zero height rectangles.
            for (let i = 0; i < this._number; i++) {
                // Unit value
                x = +this._from + step * i
                y = x + step
                // pixels value
                pxX = this.graph.unitsToPixels({ x: x, y: 0 })
                height = 0

                const rectangle = this.rootSVG.rect(
                    width,
                    height
                )
                    .move(pxX.x, pxX.y)
                    .addTo(this.svg)
                this._rectangles.push(rectangle)
            }

            // Add events for all rectangles.
            const rectanglesForEvents = this._rectangles

            this._rectangles.forEach(rectangle => {
                rectangle
                    .click(function () {
                        makeEvent('riemann.click', rectangle.data('values') as unknown as RiemannValues, rectanglesForEvents)
                    })
                    .mouseover(function () {
                        makeEvent('riemann.mouseover', rectangle.data('values') as unknown as RiemannValues, rectanglesForEvents)
                    })
                    .mouseout(function () {
                        makeEvent('riemann.mouseout', rectangle.data('values') as unknown as RiemannValues, rectanglesForEvents)
                    })
            })

            this.svg.fill('yellow')
                .stroke({
                    color: 'black', width: 1
                })

            // Add to the correct layer
            this.graph.layers.plots.add(this.svg)

        }

        for (let i = 0; i < this._number; i++) {
            // Unit value
            x = +this._from + step * i
            y = x + step
            // pixels value
            pxX = this.graph.unitsToPixels({ x: x, y: 0 })

            // The value can be negative
            // (this._pos === undefined || this._pos) ? this._plot.evaluate(x).y : this._plot.evaluate(y).y, AXIS.VERTICAL
            const dy = this._plot.evaluate(x + step * this._pos).y
            height = this.graph.distanceToPixels(dy, AXIS.VERTICAL)
            // pxY = this.graph.unitsToPixels({ x: y, y: height })
            const data: RiemannValues = {
                index: i,
                box: {
                    x: pxX.x,
                    y: pxX.y,
                    height, width
                },
                coords: {
                    a: x,
                    b: y,
                    dx: step,
                    dy
                }
            }

            this._rectangles[i]
                .data('values', data)
                .animate(500)
                .height(Math.abs(height))
                .width(width)
                .move(pxX.x, pxX.y - (height > 0 ? height : 0))

        }

        return this
    }
}


function makeEvent(name: string, values: RiemannValues, targets: Rect[]): void {
    const event = new CustomEvent(name, { detail: { ...values, rectangle: targets[values.index], rectangles: targets }, })
    document.dispatchEvent(event)
}