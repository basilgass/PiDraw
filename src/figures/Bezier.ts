import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Path} from "@svgdotjs/svg.js";
import {Line} from "./Line";

export type BezierPoint = {
    point: Point,
    control: string,
    ratio: number,
    c1?: { x: number, y: number, point?: Point, segment?: Line },
    c2?: { x: number, y: number, point?: Point, segment?: Line }
}

export class Bezier extends Figure {
    private _path: string
    private _points: BezierPoint[]
    private _ratio: number
    private _showControlPoints: boolean

    constructor(graph: Graph, name: string, values: (string | Point | { point: string | Point, control: string, ratio?: number })[]) {
        // TODO : build the path class
        super(graph, name);

        this.generateName()

        this.definePoints(values)
        this._ratio = 0.3
        this.svg = graph.svg.path("").stroke('black').fill('none');

        this._showControlPoints = false

        this.updateFigure()
    }

    get points(): BezierPoint[] {
        return this._points;
    }

    get path(): string {
        return this._path;
    }

    get ratio(): number {
        return this._ratio;
    }

    set ratio(value: number) {
        this._ratio = value;
        this.update()
    }


    get showControlPoints(): boolean {
        return this._showControlPoints;
    }

    set showControlPoints(value: boolean) {
        this._showControlPoints = value;

        if (value === false) {
            // Remove all !
            this._resetControlPoints()
        }
        this.update()
    }

    _resetControlPoints() {
        if (this._points) {
            let index = 0
            for (let pt of this._points) {
                if (pt.c1.point instanceof Point) {
                    pt.c1.point.remove()
                    pt.c1.segment.remove()
                }
                if (pt.c2.point instanceof Point) {
                    pt.c2.point.remove()
                    pt.c2.segment.remove()
                }

                pt.c1 = index > 0 ? {x: 0, y: 0} : null
                pt.c2 = index < this._points.length - 1 ? {x: 0, y: 0} : null

                index++
            }
        }
    }

    _resetAllPoints() {
        if (this._points) {
            for (let pt of this._points) {
                if (pt.point instanceof Point) {
                    pt.point.remove()
                }
            }
        }

        this._resetControlPoints()
    }

    definePoints(values: (string | Point | { point: string | Point, control: string, ratio?: number })[]) {
        // Reset all control points and existing points before doing anything else.
        this._resetControlPoints()

        this._points = values.map((x, index) => {
            if (x instanceof Point || typeof x === 'string') {
                return {
                    point: this.graph.getPoint(x),
                    control: 'smooth', // min | max | flat | smooth,
                    ratio: this.ratio,
                    c1: index > 0 ? {x: 0, y: 0} : null,
                    c2: index < values.length - 1 ? {x: 0, y: 0} : null
                }
            } else {
                return {
                    point: this.graph.getPoint(x.point),
                    control: x.control,
                    ratio: x.ratio === undefined ? this.ratio : x.ratio,
                    c1: index > 0 ? {x: 0, y: 0} : null,
                    c2: index < values.length - 1 ? {x: 0, y: 0} : null
                }
            }
        }).filter(pt => pt.point)
    }

    _updateControlPoints() {
        if (this._points.length <= 1) return

        if (this._points.length === 2) {
            // Special case
            // TODO: generate for two points
            return ""
        }

        let pts = this._points,
            path: string = `M${pts[0].point.x},${pts[0].point.y}`,
            n: number = 0

        while (n < pts.length) {
            if (n === 0) {
                // First point
                let dx = pts[n + 1].point.x - pts[n].point.x,
                    dy = pts[n + 1].point.y - pts[n].point.y,
                    ratio = pts[n].ratio === undefined ? this.ratio : pts[n].ratio

                pts[n].c2.x = this.isVertical(pts[0].control) ? pts[0].point.x : pts[0].point.x + dx * ratio / 2
                pts[n].c2.y = this.isFlat(pts[0].control) ? pts[0].point.y : pts[0].point.y + dy * ratio / 2
            } else if (n === this._points.length - 1) {
                // Last point
                let dx = pts[n].point.x - pts[n - 1].point.x,
                    dy = pts[n].point.y - pts[n - 1].point.y,
                    ratio = pts[n].ratio === undefined ? this.ratio : pts[n].ratio

                pts[n].c1.x = this.isVertical(pts[n].control) ? pts[n].point.x : pts[n].point.x - dx * ratio / 2
                pts[n].c1.y = this.isFlat(pts[n].control) ? pts[n].point.y : pts[n].point.y - dy * ratio / 2
            } else {
                // Other point
                let dx = pts[n + 1].point.x - pts[n - 1].point.x,
                    dy = pts[n + 1].point.y - pts[n - 1].point.y,
                    norm = Math.sqrt(dx ** 2 + dy ** 2),
                    dx1 = pts[n].point.x - pts[n - 1].point.x,
                    dx2 = pts[n + 1].point.x - pts[n].point.x,
                    ratio = pts[n].ratio === undefined ? this.ratio : pts[n].ratio

                if (norm !== 0) {
                    dx = dx / norm
                    dy = dy / norm
                }

                pts[n].c1.x = this.isVertical(pts[n].control) ? pts[n].point.x : pts[n].point.x - dx * dx1 * ratio
                pts[n].c1.y = this.isFlat(pts[n].control) ? pts[n].point.y : pts[n].point.y - dy * dx1 * ratio
                pts[n].c2.x = this.isVertical(pts[n].control) ? pts[n].point.x : pts[n].point.x + dx * dx2 * ratio
                pts[n].c2.y = this.isFlat(pts[n].control) ? pts[n].point.y : pts[n].point.y + dy * dx2 * ratio
            }
            // Go to the next point
            n++
        }
    }

    generateName(): string {
        return super.generateName();
    }

    isSmooth(control: string): boolean {
        return !(this.isFlat(control) || this.isVertical(control))
    }

    isFlat(control: string): boolean {
        return control === 'flat' || control === 'min' || control === 'max' || control === 'ah'
    }

    isVertical(control: string): boolean {
        return control === 'vertical' || control === "av"
    }

    getCurve(): string {
        if (this._points.length <= 1) {
            return ""
        }

        // Update the control points for each point.
        this._updateControlPoints()

        let path = `M${this._points[0].point.x},${this._points[0].point.y} C${this._points[0].c2.x},${this._points[0].c2.y} `

        for (let n = 1; n < this._points.length - 1; n++) {
            path += `${this._points[n].c1.x},${this._points[n].c1.y} ${this._points[n].point.x},${this._points[n].point.y} C ${this._points[n].c2.x},${this._points[n].c2.y} `
        }

        let n = this._points.length - 1
        path += `${this._points[n].c1.x},${this._points[n].c1.y} ${this._points[n].point.x},${this._points[n].point.y}`

        // Initialize
        return path
    }

    plot(values?: (string | Point | { point: string | Point, control: string, ratio?: number })[], speed?: number): Bezier {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) return this

        // Generate the new values.
        if (values !== undefined) this.definePoints(values)

        this._path = this.getCurve()

        // Build the path.
        if (this.svg instanceof Path) {
            // @ts-ignore
            this.svg.plot(this._path)
        }

        // Show the control points.
        if (this._showControlPoints) {
            this.graph.freeze = true
            let segments = []
            for (let pt of this._points) {
                if (pt.c1 !== null) {
                    if (pt.c1.point === undefined) {
                        // Create the point
                        pt.c1.point = this.graph.point(0, 0, `${pt.point.name}_c1`).asCircle()
                        pt.c1.point.hideLabel()
                        pt.c1.segment = this.graph.line(pt.c1.point, pt.point).asSegment()
                    }
                    pt.c1.point.x = pt.c1.x
                    pt.c1.point.y = pt.c1.y
                    segments.push(pt.c1.segment)
                }
                if (pt.c2 !== null) {
                    if (pt.c2.point === undefined) {
                        // Create the point
                        pt.c2.point = this.graph.point(0, 0, `${pt.point.name}_c2`).asCircle()
                        pt.c2.point.hideLabel()
                        pt.c2.segment = this.graph.line(pt.c2.point, pt.point).asSegment()
                    }
                    pt.c2.point.x = pt.c2.x
                    pt.c2.point.y = pt.c2.y
                    segments.push(pt.c2.segment)
                }
            }
            this.graph.freeze = false

            this._points.forEach(pt => {
                if (pt.c1) {
                    pt.c1.point.update()
                    pt.c1.segment.update()
                }
                if (pt.c2) {
                    pt.c2.point.update()
                    pt.c2.segment.update()
                }
            })
        }
        return this
    }

    updateFigure(): Bezier {
        this.plot()
        return this
    }
}