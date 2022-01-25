import {Figure} from "./Figure";
import {Canvas} from "../Canvas";
import {IPoint} from "../interfaces";
import {NumExp} from "pimath/esm/maths/numexp";
import {Path} from "@svgdotjs/svg.js";

export interface plotConfig {
    domain: { min: number, max: number },
    samples: number
}

export class Plot extends Figure {
    #config: plotConfig
    #precision: number
    #fx: Function | NumExp

    constructor(canvas: Canvas, name: string, fn: Function | string, config?: plotConfig) {
        super(canvas, name);

        this.#config = {
            samples: 20,
            domain: this.canvas.unitXDomain
        }

        if (config !== undefined) {
            // TODO: Must merge the config ?
            this.#config = config
        }

        this.generateName()
        this.#precision = 2

        this.svg = this.canvas.svg.path(this.#getFlatPath()).fill('none').stroke({color: 'black', width: 2});
        this.plot(fn);
    }

    generateName(): string {
        if (this.name === undefined) {
            let n = this.canvas.figures.filter(fig=>fig instanceof Plot).length,
                idx = Math.trunc(n/5)
            this.name = 'fghij'[n%5] + (idx>=1 ? idx:'')
        }

        return this.name
    }

    #parse(fn: Function | string): Function | NumExp {
        // TODO : must calculate differently
        if (typeof fn === 'string') {
            return new NumExp(fn)
        }
        return fn
    }

    plot(fn: string | Function, speed?: number): Plot {
        // Parse the function
        this.#fx = this.#parse(fn)

        // Create the path
        const {d, points} = this.#getPath()

        // Draw the path.
        if(this.svg instanceof Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot(this.#getFlatPath(points.length))
            }

            if (points.length === this.svg.array().length) {
                if (this.svg instanceof Path) {
                    // @ts-ignore
                    this.svg.animate(speed === undefined ? 500 : speed).plot(d)
                }
            } else {
                this.svg.plot(d)
            }
        }

        return this
    }

    #getFlatPath(numberOfPoints?: number): string {
        if(numberOfPoints === undefined) {
            numberOfPoints = (this.#config.domain.max - this.#config.domain.min) * this.#config.samples
        }

        let h = this.canvas.origin.y,
            pt = this.canvas.unitsToPixels({x: this.#config.domain.min, y: 0}),
            d:string = `M${pt.x},${pt.y}`

        for(let x = 1; x<numberOfPoints; x++){
            pt = this.canvas.unitsToPixels({x: this.#config.domain.min + x/this.#config.samples, y: 0})
            d += `L${pt.x},${pt.y}`
        }

        return d
    }
    #getPath(): { d: string, points: IPoint[] } {
        let d = '',
            points:IPoint[]  = [],
            nextToken = 'M',
            prevToken = '',
            canvasHeight = this.canvas.height,
            x = +this.#config.domain.min

        while (x <= this.#config.domain.max) {
            // Evaluate the function at the point.
            const pt = this.#evaluate(x)

            // Do not add consecutive "move to"
            if(prevToken==='M' && nextToken==='M'){
            }else {
                // store the previous token.
                prevToken = '' + nextToken

                // If it was already a line before (or will be after), add a L (lineto)
                d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;

                // Create next coordinate, removing extra decimals
                d += `${pt.x.toFixed(this.#precision)},${(Math.abs(pt.y) > canvasHeight * 5) ? 0 : pt.y.toFixed(this.#precision)} `

                points.push(pt)
            }

            // Prepare the next point (break or continuous line)
            if ((pt.y > -100 && pt.y < canvasHeight + 100)) { // The point is not too far - draw a line.
                nextToken = 'L';
            } else {
                // The line is out of scope - no need to draw it !
                nextToken = 'M';
            }

            // Next point
            x += 1 / this.#config.samples;
        }

        return {d, points}
    }

    #evaluate(x: number): IPoint {
        let y
        if (this.#fx instanceof NumExp) {
            y = this.#fx.evaluate({x: +x})
            if (isNaN(y)) {
                console.log('error calculating', this.#fx.expression, x)
                y = 0
            }
        } else if (typeof this.#fx === 'function') {
            y = this.#fx(x)
        } else {
            console.log('Function type error: ', typeof this.#fx)
        }

        return this.canvas.unitsToPixels({x, y})
    }

}