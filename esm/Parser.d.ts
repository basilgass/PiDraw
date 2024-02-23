import { Graph } from "./Graph";
import { Figure } from "./figures/Figure";
export type ParserPrepocessType = {
    label: string;
    key: string;
    code: string[];
    options: string[];
};
export declare const parserKeys: {
    [Key: string]: {
        generate: Function;
        parameters: string;
        description: string;
        options: string;
    };
};
export declare function parserPreprocess(step: string): ParserPrepocessType;
export declare function parserHelperText(step: string): {
    parameters: string;
    description: string;
    options: string;
};
export type BuildStep = {
    step: string;
    figures: Figure[];
};
export declare class Parser {
    private _construction;
    private _config;
    constructor(graph: Graph, construction: string, parameters?: string);
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
    updateLayout(parameters: string, constructUpdate?: boolean): Parser;
    getParserKeys(construction: string): string[];
    preprocess(step: string): ParserPrepocessType;
    generate(steps: string[], parameters: {
        refresh?: boolean;
        keysOnly: boolean;
    }): {
        buildedKeys: string[];
        freezedFigures: Figure[];
    };
    getHelperText(step: string): {
        parameters: string;
        description: string;
        options: string;
    };
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
