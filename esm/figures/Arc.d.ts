import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
import { Point } from "./Point";
export declare class Arc extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, center: Point, start: Point, stop: Point);
    generateName(): string;
}
