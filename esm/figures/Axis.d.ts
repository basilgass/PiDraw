import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
export declare enum AXIS {
    HORIZONTAL = 0,
    VERTICAL = 1
}
export declare class Axis extends Figure {
    constructor(canvas: Canvas, name: string, orientation: AXIS);
    generateName(): string;
}
