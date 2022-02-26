import { Graph } from "./Graph";
export declare class Parser {
    figures: [];
    step: "";
    private _graph;
    private _buildedSteps;
    constructor(graph: Graph, construction: string);
    update(construction: string, refresh?: boolean): void;
    generate(steps: string[]): void;
    private _processConstruction;
    private _generatePoint;
    private _generateVector;
    private _generateLine;
    private _generateMidPoint;
    private _generatePerpendicular;
    private _generateParallel;
    private _generateCircle;
    private _generatePlot;
    private _generateFillBetween;
}
