import { IDrawConfigUnitMinMax, IDrawConfigUnitWidthHeight, IDrawConfigWidthHeight } from "./interfaces";
import { Circle, G, Line, Path, Shape } from "@svgdotjs/svg.js";
export declare type GraphConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax;
export declare type svgShape = Shape | G | Line | Path | Circle;
