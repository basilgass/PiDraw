import { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { TeXConverterType } from "../pidraw.common";
import type { PARSER, PARSER_VALUES } from "piparser";
import type { CircleRadius } from "../figures/Circle/Circle.types";
import { Line } from "../figures/Line/Line";
import { Point } from "../figures/Point/Point";
export declare enum PARSER_TYPE {
    UNKNOWN = "unknown",
    POINT = "pt",
    MIDDLE = "mid",
    PROJECTION = "proj",
    INTERSECTION = "inter",
    SYMMETRY = "sym",
    DIRECTION_POINT = "dpt",
    VECTOR_POINT = "vpt",
    EVAL_FX = "eval",
    LINE = "line",
    VECTOR = "vec",
    SEGMENT = "seg",
    RAY = "ray",
    PERPENDICULAR = "perp",
    PARALLEL = "para",
    MEDIATOR = "med",
    TANGENT = "tan",
    BISECTOR = "bis",
    CIRCLE = "circ",
    ARC = "arc",
    PLOT = "plot",
    PARAMETRIC = "parametric",
    BEZIER = "bezier",
    POLYGON = "poly",
    GRID = "grid",
    AXIS = "axis",
    FOLLOW = "follow",
    FILL_BETWEEN = "fill",
    RIEMANN = "riemann",
    PATH = "path"
}
export type IParserValues = PARSER_VALUES | AbstractFigure;
export interface IParserConfig {
    parameters?: string;
    code?: string;
    tex?: TeXConverterType;
}
export type PointShapeOption = 'o' | 's' | '*';
export interface IPointsSetting {
    shape: PointShapeOption;
    size?: number;
}
export interface IParserSettings {
    label?: boolean;
    tex?: boolean;
    points?: false | IPointsSetting;
}
export interface IParserParameters {
    value: IParserValues;
    options: IParserValues[];
}
export interface IParser {
    id: string;
    key: PARSER_TYPE;
    code: string[];
    parameters: Record<string, IParserParameters>;
}
export declare const PARSER_BOOLEAN_VALUES: string[];
export declare function convertIdToFigure(options: PARSER_VALUES[], figures: Record<string, AbstractFigure>): IParserValues[];
export declare const PARSER_COLOR_VALUES: string[];
export declare const isPoint: (value: IParserValues | undefined) => value is Point;
export declare const isLine: (value: IParserValues | undefined) => value is Line;
export declare const ALTERNATIVE = "*";
export declare const isAlternative: (value: IParserValues | undefined) => value is typeof ALTERNATIVE;
export declare function parsePointPair(value: IParserValues | undefined, figures: Record<string, AbstractFigure>): [Point, Point] | null;
export declare function parseRadius(value: IParserValues | undefined, figures: Record<string, AbstractFigure>): CircleRadius | null;
export declare function describeValue(value: unknown): string;
export declare function buildError(item: PARSER, expected: string, got: string): never;
export declare function expectCount(item: PARSER, values: IParserValues[], min: number, max: number, expected: string): void;
//# sourceMappingURL=parser.common.d.ts.map