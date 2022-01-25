import { Canvas } from "../Canvas";
import { Figure } from "./Figure";
export declare class Label extends Figure {
    constructor(canvas: Canvas, name: string);
    generateName(): string;
}
