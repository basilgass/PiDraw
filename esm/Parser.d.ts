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
     */
    update(construction: string, refresh?: boolean): void;
    updateLayout(parameters: string): Parser;
    generate(steps: string[]): void;
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
    /**
     * FillBetween two plots
     * <NAME> = fill(f,g)   fill between f and g
     * <NAME> = fill(f)     fill between f and Ox axis
     * @param {string} name
     * @param {string} step
     * @returns {BuildStep}
     * @private
     */
    private _generateFillBetween;
}
