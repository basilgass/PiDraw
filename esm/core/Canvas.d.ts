import { Svg } from "@svgdotjs/svg.js";
import { DrawConfig, IPoint } from "../interfaces";
import { Figure } from "../figures/figure";
export declare class Canvas {
    private _container;
    private _svg;
    private _width;
    private _height;
    private _origin;
    private _drawings;
    private _freeze;
    constructor(containerID: string | HTMLElement, config?: DrawConfig);
    private _initSetWidthAndHeight;
    private _initGetContainerId;
    private _initCreateSVG;
    get container(): HTMLElement;
    get svg(): Svg;
    get width(): number;
    get height(): number;
    get origin(): IPoint;
    get drawings(): Figure[];
}
