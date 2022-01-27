import {IDrawConfigUnitMinMax, IDrawConfigUnitWidthHeight, IDrawConfigWidthHeight} from "./interfaces";
import {Circle, G, Line, Path, Shape} from "@svgdotjs/svg.js";

export type GraphConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax

export type svgShape = Shape | G | Line | Path | Circle