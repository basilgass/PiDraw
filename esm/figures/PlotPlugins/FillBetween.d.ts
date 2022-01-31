import { Figure } from "../Figure";
import { Plot } from "../Plot";
export declare class FillBetween extends Figure {
    #private;
    constructor(plot: Plot, plot2: Plot, from: number, to: number, samples: number);
    get plot(): Plot;
    clean(): void;
    updateFigure(): FillBetween;
}
