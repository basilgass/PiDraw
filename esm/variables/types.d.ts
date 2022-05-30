import { IDrawConfigUnitMinMax, IDrawConfigUnitWidthHeight, IDrawConfigWidthHeight } from "./interfaces";
import { Circle, G, Line as svgLine, Path, Shape } from "@svgdotjs/svg.js";
export declare type GraphConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax;
export declare type svgShape = Shape | G | svgLine | Path | Circle;
