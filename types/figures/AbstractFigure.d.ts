import { G, Shape, Svg } from "@svgdotjs/svg.js";
import { type IFigureAnimation, type IFigureAppearanceConfig, type IFigureContext, type XY } from "../pidraw.common";
import { Label } from "../labels/Label";
import type { LabelContent, LabelFields } from "../labels/Label";
export declare abstract class AbstractFigure {
    protected _context: IFigureContext;
    constructor(context: IFigureContext, name: string);
    protected _rootSVG: Svg;
    get rootSVG(): Svg;
    protected _name: string;
    get name(): string;
    protected _element: G;
    get element(): G;
    protected _shape: Shape;
    get shape(): Shape;
    set shape(value: Shape);
    protected _appearance: IFigureAppearanceConfig;
    get appearance(): IFigureAppearanceConfig;
    set appearance(value: IFigureAppearanceConfig);
    protected _static: boolean;
    get static(): boolean;
    set static(value: boolean);
    protected _isDraggable: boolean;
    get isDraggable(): boolean;
    set isDraggable(value: boolean);
    protected _label: Label | null;
    protected _labelContent: LabelContent;
    get label(): Label | null;
    protected _animate: IFigureAnimation | null;
    get animate(): IFigureAnimation | null;
    set animate(value: IFigureAnimation | null);
    readonly animatable: boolean;
    readonly followable: boolean;
    protected _checkAnimation(animation: IFigureAnimation): void;
    get graphConfig(): import("..").IGraphConfig;
    abstract computed(): this;
    hide(): this;
    show(): this;
    strokeable(): Shape[];
    fillable(): Shape[];
    fill(color?: string): this;
    stroke(): this;
    stroke(color: string): this;
    stroke(strokeWidth: number): this;
    stroke(color: string, strokeWidth: number): this;
    protected _dasharray: string | null;
    protected _markerStart: string | null;
    protected _markerEnd: string | null;
    protected _styleMarkers(): void;
    dash(dasharray?: string | number): this;
    dot(): this;
    clear(): this;
    update(forceUpdate?: boolean): this;
    addLabel(content?: LabelContent, asHtml?: boolean, texConverter?: (value: string) => string): Label;
    protected _setDefined(defined: boolean): void;
    protected _tikzCoordinates(pixels: XY): string;
    protected _tikzUnits(): {
        x: string;
        y: string;
    };
    protected _tikzView(): {
        x: [number, number];
        y: [number, number];
    };
    protected _tikzAxis(content: string[], restrict?: {
        x?: [number, number];
        y?: [number, number];
    }): string[];
    protected _tikzSamples(intervals: number): number;
    protected _tikzCurveStyle(): {
        definitions: string[];
        options: string[];
    };
    protected _tikzLength(pixels: number): string;
    protected _tikzRadius(pixels: number): string;
    protected _tikzShown(): {
        shape: boolean;
        label: boolean;
    };
    abstract moveLabel(): this;
    abstract tikz(): string;
    protected _tikzStyle(): {
        definitions: string[];
        options: string[];
    };
    protected _tikzDraw(path: string): string;
    protected _tikzLabel(at: string): string;
    updateLabel(): this;
    labelFields(): LabelFields;
    computeLabel(): string;
    move(pos: number): this;
    move(pos: XY): this;
    scale(value: XY | number): this;
    mark(value?: string | boolean, options?: (string | number)[]): this;
    follow(x: number, y: number): XY;
    dispose(): void;
}
//# sourceMappingURL=AbstractFigure.d.ts.map