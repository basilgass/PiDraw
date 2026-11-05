import type { IFigureAppearanceConfig, IGraphConfig, XY } from "../../pidraw.common";
import type { ILabelConfig } from "../Label/Label.types";
export declare function tikzNumber(value: number, digits?: number): string;
export declare function tikzLength(pixels: number): string;
export declare function tikzColor(value: string): {
    name: string;
    definition: string | null;
} | null;
export declare function tikzCoordinates(pixels: XY, graph: IGraphConfig): string;
export declare function tikzUnits(graph: IGraphConfig): {
    x: string;
    y: string;
};
export declare function tikzView(graph: IGraphConfig): {
    x: [number, number];
    y: [number, number];
};
export declare function tikzAxis(graph: IGraphConfig, content: string[], restrict?: {
    x?: [number, number];
    y?: [number, number];
}): string[];
export declare function tikzSamples(intervals: number): number;
export declare function tikzRadius(pixels: number, graph: IGraphConfig): string;
export interface TikzStyle {
    definitions: string[];
    options: string[];
}
export declare function tikzStyle(appearance: IFigureAppearanceConfig, dasharray: string | null, markers: {
    start: string | null;
    end: string | null;
}): TikzStyle;
export declare function tikzLabelText(text: string, isTex: boolean): string;
export declare function tikzLabelNode(config: Pick<ILabelConfig, 'alignement' | 'offset' | 'rotate'>, at: string, text: string): string;
export declare const TIKZ_PREAMBLE: string;
export declare function tikzPicture(graph: IGraphConfig, fragments: string[]): string;
//# sourceMappingURL=AbstractFigure.tikz.d.ts.map