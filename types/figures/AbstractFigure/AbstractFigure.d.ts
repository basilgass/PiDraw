import type { G, Shape, Svg } from "@svgdotjs/svg.js";
import type { IFigureAppearanceConfig, IFigureContext, XY } from "../../pidraw.common";
import type { IControlsFigure } from "../../controls/controls.types";
import { Label } from "../Label/Label";
import type { ILabelConfig, LabelContent, LabelFieldName, LabelFields } from "../Label/Label.types";
export type MarkerSide = 'start' | 'end' | 'both' | 'none';
export interface IMarkOptions {
    side?: MarkerSide;
    size?: number;
    shape?: string;
}
export type ILabelOptions = Partial<Pick<ILabelConfig, 'asHtml' | 'texConverter'>>;
export declare const DEFAULT_DASH = "6 4";
export interface IColorValue {
    color: string;
    opacity?: number;
}
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
    protected _labelReference: AbstractFigure | null;
    get labelReference(): AbstractFigure | null;
    protected _labelClearance: number;
    get label(): Label | null;
    protected _controls: Partial<IControlsFigure>;
    get controls(): Readonly<Partial<IControlsFigure>>;
    setControl<K extends keyof IControlsFigure>(key: K, value: IControlsFigure[K] | null): this;
    protected _hiders: Set<string>;
    protected _defined: boolean;
    readonly followable: boolean;
    readonly referenceable: boolean;
    referenceAnchorPoint(): XY | null;
    get graphConfig(): import("../..").IGraphConfig;
    abstract computed(): this;
    abstract get config(): object;
    setHiddenBy(reason: string, hidden: boolean): this;
    isHiddenBy(reason: string): boolean;
    hide(): this;
    show(): this;
    hideShape(): this;
    resetStyle(): this;
    strokeable(): Shape[];
    fillable(): Shape[];
    fill(color?: string | IColorValue): this;
    stroke(): this;
    stroke(color: string | IColorValue): this;
    stroke(strokeWidth: number): this;
    stroke(color: string | IColorValue, strokeWidth: number): this;
    protected _dasharray: string | null;
    protected _markerStart: string | null;
    protected _markerEnd: string | null;
    protected _styleMarkers(): void;
    dash(dasharray?: string | number): this;
    dot(): this;
    clear(): this;
    update(forceUpdate?: boolean): this;
    addLabel(content?: LabelContent, options?: ILabelOptions): Label;
    protected _setDefined(defined: boolean): void;
    protected _applyVisibility(): void;
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
    protected _tikzLabelText(): string;
    protected readonly _labelGap: number;
    updateLabel(): this;
    setLabelReference(reference: AbstractFigure | null): this;
    setLabelClearance(pixels: number): this;
    protected _orientLabel(): void;
    labelFields(): LabelFields;
    defaultLabelField(): LabelFieldName | null;
    protected _firstLabelField(): LabelFieldName | null;
    computeLabel(): string;
    move(pos: number): this;
    move(pos: XY): this;
    scale(value: XY | number): this;
    mark(options?: IMarkOptions): this;
    follow(x: number, y: number): XY;
    dispose(): void;
}
//# sourceMappingURL=AbstractFigure.d.ts.map