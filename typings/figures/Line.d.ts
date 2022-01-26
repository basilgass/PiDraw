import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
import { Point } from "./Point";
export declare enum LINERULE {
    DEFAULT = 0,
    PARALLEL = 1,
    PERPENDICULAR = 2,
    TANGENT = 3
}
export interface ConstructionSettings {
    rule: string;
    point?: Point;
    k?: number;
}
export declare class Line extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, A: Point, B: Point, construction?: ConstructionSettings);
    get segment(): boolean;
    set segment(value: boolean);
    get A(): Point;
    get B(): Point;
    isSegment(value: boolean): void;
    generateName(): string;
    updateFigure(): Line;
}
