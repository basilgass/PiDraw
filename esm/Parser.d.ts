import { Graph } from "./Graph";
import { Figure } from "./figures/Figure";
declare type BuildStep = {
    step: string;
    figures: Figure[];
};
export declare class Parser {
    private _buildedSteps;
    private _construction;
    private _graph;
    constructor(graph: Graph, construction: string);
    get buildedSteps(): BuildStep[];
    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     * @param refresh
     */
    update(construction: string, refresh?: boolean): void;
    updateLayout(parameters: string): Parser;
    private _preprocess;
    generate(steps: string[]): void;
    private _postprocess;
    /**
     * Parse the main input string and sanitize it.
     * @param {string} construction
     * @returns {string[]}
     * @private
     */
    private _processConstruction;
    private _generatePoint;
    private _generateVector;
    private _generateLineThroughTwoPoints;
    private _generateLine;
    private _generateProjectionPoint;
    private _generateMidPoint;
    private _generatePerpendicular;
    private _generateParallel;
    private _generateCircle;
    private _generateArc;
    private _updatePlot;
    private _generatePlot;
    private _generateParametricPlot;
    private _generateFillBetween;
    private _generateBezier;
}
export {};
