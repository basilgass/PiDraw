import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Path} from "@svgdotjs/svg.js";

export class Bezier extends Figure {
    private _path: string
    private _points: { point: Point, control: string, ratio?: number }[]
    private _ratio: number

    constructor(graph: Graph, name: string, values: (string | Point | {point: string|Point, control: string, ratio?: number})[]) {
        // TODO : build the path class
        super(graph, name);

        this.generateName()

        this.definePoints(values)
        this._path = this.getCurve()
        this.svg = graph.svg.path(this._path).stroke('black').fill('none');

        this._ratio = 0.3
        this.updateFigure()
    }

    get points(): { point: Point; control: string }[] {
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

    definePoints(values: (string | Point | {point: string|Point, control: string, ratio?: number})[]) {
        this._points = values.map(x => {
            if(x instanceof Point || typeof x ==='string') {
                return {
                    point: this.graph.getPoint(x),
                    control: 'smooth', // min | max | flat | smooth,
                    ratio: this.ratio
                }
            }else{
                return {
                    point: this.graph.getPoint(x.point),
                    control: x.control,
                    ratio: x.ratio===undefined?this.ratio:x.ratio
                }
            }
        }).filter(pt => pt.point)
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
        return control === 'vertical' || control ==="av"
    }

    getCtrlPoint(
        p0: Point,
        p1: Point | { x: number, y: number, px: number, py: number },
        p2: Point,
        control?: string,
        ratio?: number
    ): { x: number, y: number, px: number, py:number } {
        if (ratio === undefined) {
            ratio = this._ratio
        }
        if(control===undefined){
            control = "smooth"
        }

        if (p2 === null) {
            // It's a starting point.
            return {
                x: this.isVertical(control)?p0.x:p0.x + (p1.x - p0.x) * ratio,
                y: this.isFlat(control)?p0.y:p0.y + (p1.y - p0.y) * ratio,
                px: p0.x,
                py: p0.y
            }
        }

        if (p0 === null) {
            // It's an ending point
            // Control point (p1) must use the symmetric version
            // 2*p1 - p1x
            return {
                x: this.isVertical(control)?p2.x:p2.x - (p2.x - (!(p1 instanceof Point) ? 2 * p1.x - p1.px :0)) * ratio,
                y: this.isFlat(control)?p2.y:p2.y - (p2.y - (!(p1 instanceof Point) ? 2 * p1.y - p1.py :0)) * ratio,
                px: p2.x,
                py: p2.y
            }
        }

        const dx = p2.x - p0.x,
            dy = p2.y - p0.y,
            n = Math.sqrt(dx * dx + dy * dy),
            n1 = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2),
            n2 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)

        return {
            x: this.isVertical(control)?p1.x:p1.x - dx * ratio / n * Math.min(n1, n2),
            y: this.isFlat(control)?p1.y:p1.y - dy * ratio / n * Math.min(n1, n2),
            px: p1.x,
            py: p1.y
        }
    }

    getCurve(): string {
        let path: string = '',
            pts = this._points

        // Initialize
        if (pts.length === 0) {
            return ""
        }
        if (pts.length === 1) {
            return ""
        }
        if (pts.length === 2) {
            if(this.isSmooth(pts[0].control) && this.isSmooth(pts[1].control)) {
                // Two smooth point => it is a straight line.
                return `M${pts[0].point.x},${pts[0].point.y} L${pts[1].point.x},${pts[1].point.y}`
            }else{
                // at least of of the two point is flat or vertical - make the control
                let dx = pts[1].point.x - pts[0].point.x,
                    dy = pts[1].point.y - pts[0].point.y,
                    c1 = {x: pts[0].point.x, y: pts[0].point.y}, c2 = {x: pts[1].point.x, y: pts[1].point.y}

                if(this.isFlat(pts[0].control)){
                    c1 = {x: pts[0].point.x + dx*this.ratio, y: pts[0].point.y}
                }else if(this.isVertical(pts[0].control)){
                    c1 = {x: pts[0].point.x, y: pts[0].point.y + dy*this.ratio}
                }

                if(this.isFlat(pts[1].control)){
                    c2 = {x: pts[1].point.x - dx*this.ratio, y: pts[1].point.y}
                }else if(this.isVertical(pts[1].control)){
                    c2 = {x: pts[1].point.x, y: pts[1].point.y - dy*this.ratio}
                }

                return `M${pts[0].point.x},${pts[0].point.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${pts[1].point.x},${pts[1].point.y}`
            }
        }

        // Bezier curve

        // Build the control points
        let ctrlPoints: { x: number, y: number, px: number, py: number }[] = [],
            ratio = 0.3

        for (let i = 1; i < pts.length - 1; i++) {
            ctrlPoints.push(this.getCtrlPoint(pts[i - 1].point, pts[i].point, pts[i + 1].point, pts[i].control, pts[i].ratio))
        }
        ctrlPoints.unshift(this.getCtrlPoint(pts[0].point, ctrlPoints[0], null, pts[0].control, pts[0].ratio))
        ctrlPoints.push(this.getCtrlPoint(null, ctrlPoints[ctrlPoints.length - 1], pts[pts.length - 1].point, pts[pts.length-1].control, pts[pts.length-1].ratio))

        // Starting point
        path = `M${pts[0].point.x},${pts[0].point.y} `
        for (let i = 1; i < pts.length; i++) {
            // Initialize the path
            if (i === 1) {
                // Add the control point
                path += `C${ctrlPoints[i - 1].x},${ctrlPoints[i - 1].y} ${ctrlPoints[i].x},${ctrlPoints[i].y} ${pts[i].point.x},${pts[i].point.y}`
            } else {
                path += `S${ctrlPoints[i].x},${ctrlPoints[i].y}  ${pts[i].point.x},${pts[i].point.y}`
            }
        }

        return path
    }

    plot(values?: (string | Point | {point: string|Point, control: string, ratio?: number})[], speed?: number): Bezier {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this
        }

        // Generate the new values.
        if (values !== undefined) {
            this.definePoints(values)
        }
        this._path = this.getCurve()

        // Build the path.
        if (this.svg instanceof Path) {
            // @ts-ignore
            this.svg.plot(this._path)
        }


        return this
    }

    updateFigure(): Bezier {
        this.plot()
        return this
    }
}