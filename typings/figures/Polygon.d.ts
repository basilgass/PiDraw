import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
export declare class Polygon extends Figure {
    constructor(canvas: Canvas, name: string);
    generateName(): string;
}
