import { Svg, G, Shape } from '@svgdotjs/svg.js';
import { IFigureAppearanceConfig, IGraphConfig, XY } from '../pidraw.common';
import { Label } from '../labels/Label';
export declare abstract class AbstractFigure {
    #private;
    abstract computed(): this;
    constructor(rootSVG: Svg, name: string);
    get element(): G;
    get name(): string;
    get rootSVG(): Svg;
    get shape(): Shape;
    set shape(value: Shape);
    get appearance(): IFigureAppearanceConfig;
    set appearance(value: IFigureAppearanceConfig);
    get graphConfig(): IGraphConfig;
    get static(): boolean;
    set static(value: boolean);
    get isDraggable(): boolean;
    set isDraggable(value: boolean);
    hide(): this;
    show(): this;
    strokeable(): Shape[];
    fillable(): Shape[];
    fill(color?: string): this;
    stroke(): this;
    stroke(color: string): this;
    stroke(strokeWidth: number): this;
    stroke(color: string, strokeWidth: number): this;
    dash(dasharray?: string): this;
    dot(): this;
    clear(all?: boolean): this;
    update(forceUpdate?: boolean): this;
    addLabel(text?: string, asHtml?: boolean, texConverter?: (value: string) => string): Label;
    get label(): Label | null;
    abstract moveLabel(): this;
    updateLabel(): this;
    computeLabel(): string;
    move(pos: number): this;
    move(pos: XY): this;
    mark(value?: string | boolean, options?: (string | number)[]): this;
    follow(x: number, y: number): XY;
}
