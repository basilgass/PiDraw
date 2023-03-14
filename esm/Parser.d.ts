import { Graph } from "./Graph";
import { Figure } from "./figures/Figure";
export declare const parserKeys: {
    [Key: string]: {
        generate: Function;
        parameters: string;
        description: string;
        options: string;
    };
};
export type BuildStep = {
    step: string;
    figures: Figure[];
};
export declare class Parser {
    private _construction;
    constructor(graph: Graph, construction: string);
    private _graph;
    get graph(): Graph;
    private _buildedSteps;
    get buildedSteps(): BuildStep[];
    /**
     * Update the graph using a new construction string.
     * @param {string} construction
     * @param refresh
     */
    update(construction: string, refresh?: boolean): void;
    updateLayout(parameters: string): Parser;
    generate(steps: string[]): void;
    /**
     * Convert a construct string to the label, key, code and options)
     * A step string can be as following:
     * A(3,4)
     * d=[AB]
     * c=<key> <params sep. by ,>->option
     * @param step
     * @private
     */
    private _preprocess;
    private _postprocess;
    /**
     * Parse the main input string and sanitize it.
     * @param {string} construction
     * @returns {string[]}
     * @private
     */
    private _processConstruction;
}
