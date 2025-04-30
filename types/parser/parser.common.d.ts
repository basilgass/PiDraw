import { AbstractFigure } from '../figures/AbstractFigure';
import { TeXConverterType } from '../pidraw.common';
import { PARSER_VALUES } from 'piparser';
export declare enum PARSER_TYPE {
    UNKNOWN = "unknown",// OK
    POINT = "pt",// OK: (x,y)
    MIDDLE = "mid",// OK: mid <point>,<point>
    PROJECTION = "proj",// OK: proj <point>,<line>
    INTERSECTION = "inter",// OK: inter <line>,<line> // TODO: inter <line>,<circle>
    SYMMETRY = "sym",// OK: sym <point>,<point|line>
    DIRECTION_POINT = "dpt",// OK: dpt <point>,<line>,<distance>,<perpendicular?>
    VECTOR_POINT = "vpt",// OK: vpt <point>,<point>,<scale?>,<starting point?>
    LINE = "line",// OK : <point><point> or line <point>,<point>
    VECTOR = "vec",
    SEGMENT = "seg",
    RAY = "ray",
    PERPENDICULAR = "perp",// OK : perp <line>,<point>
    PARALLEL = "para",// OK : para <line>,<point>
    MEDIATOR = "med",// OK : med <point>,<point>
    TANGENT = "tan",
    BISECTOR = "bis",
    CIRCLE = "circ",// OK : <center>,<radius>
    ARC = "arc",// OK : arc <point>,<point>,<point>
    PLOT = "plot",// OK : plot <function>[,@<number>,<domain>,<domain>]
    PARAMETRIC = "parametric",// OK : parametric <function>,<function>[,@<number>,<domain>]
    POLYGON = "poly",// OK : poly <point>,<point>,<point>,...
    REGULAR = "reg",// OK: reg <center>,<radius>,<sides>
    FOLLOW = "follow",// OK : follow <function>,<tangent?>
    FILL_BETWEEN = "fill",// OK : fillbetween <function>,<function?>,<domain?>
    RIEMANN = "riemann",// riemann <function>,<domain>,<number>,<position>
    PATH = "path"
}
export type IParserValues = PARSER_VALUES | AbstractFigure;
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
export declare function convertIdToFigure(options: PARSER_VALUES[], figures: Record<string, AbstractFigure>): IParserValues[];
export declare const PARSER_COLOR_VALUES: string[];
