import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { ConstructionSettings } from "../variables/interfaces";
export declare class Line extends Figure {
    #private;
    constructor(canvas: Graph, name: string, A: Point, B: Point, construction?: ConstructionSettings);
    get segment(): boolean;
    set segment(value: boolean);
    get A(): Point;
    get B(): Point;
    isSegment(value: boolean): void;
    generateName(): string;
    updateFigure(): Line;
}
