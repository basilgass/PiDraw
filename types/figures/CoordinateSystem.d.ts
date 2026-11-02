import { Line as svgLine } from "@svgdotjs/svg.js";
import { COORDINATE_SYSTEM, type IAxisConfig, type XY, type IFigureContext } from "../pidraw.common";
import { AbstractFigure } from "./AbstractFigure";
export interface ICoordinateSystem {
    x: {
        direction: XY;
    } & IAxisConfig;
    y: {
        direction: XY;
    } & IAxisConfig;
}
export declare class CoordinateSystem extends AbstractFigure {
    protected _axis: {
        x: svgLine;
        y: svgLine;
    };
    constructor(context: IFigureContext, name: string, values: COORDINATE_SYSTEM | ICoordinateSystem);
    protected _config: ICoordinateSystem;
    get config(): ICoordinateSystem;
    set config(value: ICoordinateSystem);
    get xAxis(): svgLine;
    get yAxis(): svgLine;
    computed(): this;
    tikz(): string;
    moveLabel(): this;
    _defaultConfig(coordinateSystem: COORDINATE_SYSTEM): ICoordinateSystem;
    _makeShape(): {
        x: svgLine;
        y: svgLine;
    };
    _updateAxis(axis: svgLine, direction: XY, config?: IAxisConfig): svgLine;
}
//# sourceMappingURL=CoordinateSystem.d.ts.map