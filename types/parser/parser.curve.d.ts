import type { PARSER, PARSER_VALUES } from "piparser";
import { type Domain } from "../pidraw.common";
export interface CurveValues {
    samples?: number;
    domain?: Domain;
    image?: Domain;
}
export declare function splitFunction(value: PARSER_VALUES | undefined): {
    text: string;
    samples: string[];
} | null;
export declare function curveValues(values: PARSER_VALUES[], item: PARSER, intervals: 1 | 2, expected: string): CurveValues;
//# sourceMappingURL=parser.curve.d.ts.map