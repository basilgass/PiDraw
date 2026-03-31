import {Path, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import type {DOMAIN, XY} from "../pidraw.common"
import {NumExp, quadraticThroughABC, toCoordinates, toPixels} from "../Calculus"
import {Point} from "./Point"

export interface IPlotConfig {
    expression: string | null,
    quadratic?: XY[],
    domain?: DOMAIN,
    image?: DOMAIN,
    samples?: number,
    asymptoteThreshold?: number,
    tolerance?: number,
    maxDepth?: number
}

export class Plot extends AbstractFigure {
    protected _fx: string

    constructor(rootSVG: Svg, name: string, values: IPlotConfig) {
        super(rootSVG, name)

        // Store the constraints
        this._config = Object.assign({
            expression: '',
            samples: this.graphConfig.axis.x.x,
            asymptoteThreshold: 10
        }, values)

        // Generate the base shape
        this.shape = this._makeShape()

        this._fx = this._getExpression()
        this._numExp = new NumExp(this._fx)

        // Compute the shape
        this.computed()
        return this
    }

    protected _numExp: NumExp

    get numExp() {
        return this._numExp
    }

    protected _config: IPlotConfig

    get config() {
        return this._config
    }

    set config(value: IPlotConfig) {
        this._config = value

        this.computed()
    }

    computed(): this {
        // Get the mathematical function from the config
        const fn: string = this._getExpression()

        if (!fn || fn === '') {
            return this
        }

        if (fn !== this._fx) {
            // update the num exp.
            this._fx = fn
            this._numExp = new NumExp(fn)
        }

        const graphConfig = this.graphConfig

        // Get the domain from the config
        const minX = -graphConfig.origin.x / graphConfig.axis.x.x - 1
        const maxX = (graphConfig.width - graphConfig.origin.x) / graphConfig.axis.x.x + 1
        const domain = (this._config.domain ?? {min: minX, max: maxX})
        const image = (this._config.image ?? {min: -Infinity, max: Infinity})

        // Get the samples from the config
        const samples = (this._config.samples ?? graphConfig.axis.x.x)

        // Make the numeric expression.
        const expr = this._numExp

        // Get the (x;y) points from the function
        // 0 < x < width
        // y = fn(x)
        const points: XY[] = this._calculatePointsCoordinates(domain, samples, expr, image, graphConfig)

        // Create the path string from the points.
        let previous: XY = points[0]
        const discontinuityThreshold = graphConfig.height * (this._config.asymptoteThreshold ?? 10)
        let path = ''

        for(let index=0; index<points.length; index++){

            let {x, y} = points[index]
            let cmd = (index === 0) ? 'M' : 'L'

            if (isNaN(y)) {
                // If the y value is not defined, move the cursor to the next point.
                cmd = 'M'

                if (isNaN(previous.y)) {
                    const next = points[index + 1] ?? {x: NaN, y: NaN}
                    y = next.y > 0 ? -discontinuityThreshold : discontinuityThreshold
                } else {
                    y = previous.y > 0 ? -discontinuityThreshold : discontinuityThreshold
                }
            } else if (index > 0) {
                if (Math.abs(y - previous.y) > discontinuityThreshold) {
                    cmd = 'M'
                }
            }

            // Set the current point as the previous point
            previous = {x, y}
            path+= `${cmd} ${x} ${y} `
        }

        // Update the path
        const shape = this.shape as Path
        shape.plot(path)

        return this
    }

    moveLabel(): this {
        return this
    }

    evaluate(x: number, asCoordinates?: boolean): XY {
        if (asCoordinates === true) {
            return {x, y: this._numExp.evaluate({x})}
        }

        return toPixels(
            {x, y: this._numExp.evaluate({x})}
            , this.graphConfig)
    }

    override follow(x: number, y: number): XY {

        /**
         * TODO: implement the nearestPointToPath function
         * return nearestPointToPath( { x, y }, fig.shape as svgPath, 1 )
         */
        const pt = toCoordinates({x, y}, this.graphConfig)
        return this.evaluate(pt.x)
    }

    _getExpression(): string {
        if (typeof this._config.expression === "string") {
            return this._config.expression
        }

        if (this._config.quadratic && this._config.quadratic.length === 3 && this._config.quadratic.every(x => x instanceof Point)) {
            // Values given here
            const [A, B, C] = this._config.quadratic.map(x => x.coordinates)
            return quadraticThroughABC(A, B, C)
        }

        return ""
    }

    _makeShape() {
        this.element.clear()

        // Create the path
        this.shape = this.element.path('M0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }

    _calculatePointsCoordinates(domain: DOMAIN, samples: number, expr: NumExp, image: DOMAIN, graphConfig = this.graphConfig): XY[] {
        const toleranceSq = (this._config.tolerance ?? 1.0) ** 2
        const maxDepth = this._config.maxDepth ?? 6
        const discontinuityThreshold = graphConfig.height * (this._config.asymptoteThreshold ?? 10)

        // Constantes de conversion inlinées (évite les appels toPixels + vérifications de type)
        const ox = graphConfig.origin.x
        const oy = graphConfig.origin.y
        const sx = graphConfig.axis.x.x
        const sy = graphConfig.axis.y.y

        // Objet réutilisable pour expr.evaluate (évite N allocations {x})
        const vars: Record<string, number> = {x: 0}

        const toPixelPoint = (x: number): XY => {
            vars.x = x
            const y = expr.evaluate(vars)
            const px = ox + x * sx
            if (isNaN(y) || y === Infinity || y === -Infinity || y < image.min || y > image.max) {
                return {x: px, y: NaN}
            }
            return {x: px, y: oy + y * sy}
        }

        const points: XY[] = []

        // subdivide pousse directement dans points — aucune allocation de tableau intermédiaire
        const subdivide = (x1: number, p1: XY, x2: number, p2: XY, depth: number): void => {
            if (depth >= maxDepth) return
            if (isNaN(p1.y) || isNaN(p2.y)) return
            if (Math.abs(p1.y - p2.y) > discontinuityThreshold) return

            const xm = (x1 + x2) / 2
            const pm = toPixelPoint(xm)

            if (isNaN(pm.y)) {
                points.push(pm)
                return
            }

            // Distance² de pm à la droite p1-p2 (évite Math.sqrt)
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const len2 = dx * dx + dy * dy
            let ecartSq: number
            if (len2 === 0) {
                ecartSq = (pm.x - p1.x) ** 2 + (pm.y - p1.y) ** 2
            } else {
                const t = Math.max(0, Math.min(1, ((pm.x - p1.x) * dx + (pm.y - p1.y) * dy) / len2))
                ecartSq = (pm.x - (p1.x + t * dx)) ** 2 + (pm.y - (p1.y + t * dy)) ** 2
            }

            if (ecartSq <= toleranceSq) {
                points.push(pm)
                return
            }

            subdivide(x1, p1, xm, pm, depth + 1)
            points.push(pm)
            subdivide(xm, pm, x2, p2, depth + 1)
        }

        // Passe initiale + subdivisions sans tableau intermédiaire
        const step = 1 / samples
        let prevX = domain.min
        let prevP = toPixelPoint(prevX)
        points.push(prevP)

        for (let x = domain.min + step; x <= domain.max; x += step) {
            const p = toPixelPoint(x)
            subdivide(prevX, prevP, x, p, 0)
            points.push(p)
            prevX = x
            prevP = p
        }

        return points
    }
}