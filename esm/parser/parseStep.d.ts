import { Figure } from "../figures/Figure";
import { Parser } from "../Parser";
import { Point } from "../figures/Point";
export declare enum STEP_TYPE {
    number = "number",
    point = "point",
    figure = "figure",
    option = "option"
}
export declare enum STEP_KIND {
    static = 0,
    dynamic = 1
}
export type StepValueType = {
    type: STEP_TYPE;
    kind: STEP_KIND;
    item: Point | Figure | string | number | (Point | Figure | number | unknown)[];
    option?: string;
};
/**
 * getStepType extract the value type.
 * It can be the following values:
 *    3 or 3.5 => a number, static
 *    3/7 => a number, static
 *    A.x => a number, dynamic
 *    A:B => distance from A ot B, dynamic
 *    A or A3 => a point, dynamic
 *    d, f1 => a figure, dynamic
 * @param value
 *
 */
export declare function getStepType(parser: Parser, value: string): StepValueType;
export declare function parseStep(parser: Parser, step: string, template: string[]): (Figure | number | string)[];
