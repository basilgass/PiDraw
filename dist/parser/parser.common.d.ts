import { AbstractFigure } from '../figures/AbstractFigure';
import { DOMAIN, TeXConverterType, XY } from '../pidraw.common';

export declare enum PARSER_TYPE {
    UNKNOWN = "unknown",
    POINT = "pt",
    MIDDLE = "mid",
    PROJECTION = "proj",
    INTERSECTION = "inter",
    SYMMETRY = "sym",
    DIRECTION_POINT = "dpt",
    VECTOR_POINT = "vpt",
    LINE = "line",
    PERPENDICULAR = "perp",
    PARALLEL = "para",
    MEDIATOR = "med",
    TANGENT = "tan",
    BISECTOR = "bis",
    CIRCLE = "circ",
    ARC = "arc",
    PLOT = "plot",
    PARAMETRIC = "parametric",
    POLYGON = "poly",
    REGULAR = "reg",
    FOLLOW = "follow",
    FILL_BETWEEN = "fill",
    RIEMANN = "riemann"
}
export type IParserValues = (string | number | boolean | XY | DOMAIN | AbstractFigure);
export interface IParserConfig {
    parameters?: string;
    code?: string;
    tex?: TeXConverterType;
}
export interface IParserSettings {
    label?: boolean;
    tex?: boolean;
    points?: boolean | 'o' | '*' | 's';
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
export declare const PARSER_COLOR_VALUES: string[];
export declare function convertValues(options: string[], figures: Record<string, AbstractFigure>): IParserValues[];
