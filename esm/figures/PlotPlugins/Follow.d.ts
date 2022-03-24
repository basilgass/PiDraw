import { Figure } from "../Figure";
import { Plot } from "../Plot";
export declare class Follow extends Figure {
    private _plot;
    private _size;
    private _tangent;
    private _tangentVisible;
    private _tangentDX;
    constructor(plot: Plot, showTangent?: boolean);
    get plot(): Plot;
    clean(): void;
    updateFigure(): Follow;
    setPointSize(value: number): Follow;
    showTangent(value: boolean): Follow;
}
