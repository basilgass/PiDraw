import { Figure } from "../Figure";
import { Plot } from "../Plot";
export declare class FillBetween extends Figure {
    private _plot;
    private _plot2;
    private _from;
    private _to;
    private _samples;
    private _d;
    constructor(plot: Plot, plot2: Plot, from: number, to: number, samples: number);
    get plot(): Plot;
    clean(): void;
    updateFigure(): FillBetween;
}
