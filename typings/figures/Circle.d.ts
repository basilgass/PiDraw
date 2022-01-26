import { Canvas } from "../Canvas";
import { Figure } from "./Figure";
import { Point } from "./Point";
export declare class Circle extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, center: Point, radius: number | Point);
    get center(): Point;
    set center(value: Point);
    get radius(): number | Point;
    set radius(value: number | Point);
    getRadiusAsPixels(): number;
    generateName(): string;
    updateFigure(): Circle;
}
