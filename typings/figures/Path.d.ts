import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
export declare class Path extends Figure {
    constructor(canvas: Canvas, name: string);
    generateName(): string;
}
