import { Canvas } from "../Canvas";
import { Figure } from "./Figure";
import { IPoint } from "../interfaces";
import { Grid } from "./Grid";
export declare class Point extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, pixels: IPoint);
    generateName(): string;
    updateFigure(): Point;
    middleOf(A: Point, B: Point): Point;
    draggable(grid?: Grid): Point;
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
    get coord(): IPoint;
}
