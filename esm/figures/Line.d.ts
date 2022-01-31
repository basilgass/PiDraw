import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export interface LineConfig {
    rule: string;
    point?: Point;
    k?: number;
}
export declare class Line extends Figure {
    #private;
    constructor(graph: Graph, name: string, A: Point, B: Point, construction?: LineConfig);
    get segment(): boolean;
    set segment(value: boolean);
    get A(): Point;
    get B(): Point;
    isSegment(value: boolean): void;
    generateName(): string;
    updateFigure(): Line;
}
