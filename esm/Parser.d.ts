import { Graph } from "./Graph";
export declare class Parser {
    figures: [];
    step: "";
    private _buildedSteps;
    private _construction;
    private _graph;
    constructor(graph: Graph, construction: string);
    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     * @param refresh
     */
    update(construction: string, refresh?: boolean): void;
    updateLayout(parameters: string): Parser;
    preprocess(step: string): {
        label: string;
        key: string;
        code: string;
        options: string[];
    };
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
    private _generateMidPoint;
    private _generatePerpendicular;
    private _generateParallel;
    private _generateCircle;
    private _generatePlot;
    private _generateParametricPlot;
    private _generateFillBetween;
}
