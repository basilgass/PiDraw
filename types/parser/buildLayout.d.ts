import type { PiParse } from "piparser";
import type { IGraphDisplay } from "../Graph.types";
import { type IMeasure } from "../calculus/units";
import type { IParserParameters, IParserSettings, IPointsSetting } from "./parser.types";
import { type Interval } from "./parser.interval";
export declare const LAYOUT_KEYS: string[];
type Options = Record<string, IParserParameters>;
export interface ILayout {
    window: {
        x: Interval;
        y: Interval;
    };
    unit: {
        x: number;
        y: number;
    };
    measure: IMeasure;
    display: IGraphDisplay;
    defaults: IParserSettings;
    options: {
        x: Options;
        y: Options;
        grid: Options;
    };
}
export declare function splitParameters(text: string): string[];
export declare function buildLayout(text: string, parser: PiParse): ILayout;
export declare function parsePointsSetting({ value, options }: IParserParameters): IPointsSetting;
export {};
//# sourceMappingURL=buildLayout.d.ts.map