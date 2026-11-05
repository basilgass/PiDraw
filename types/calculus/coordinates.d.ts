import { type Domain, type IGraphConfig, type XY } from "../pidraw.common";
export declare function toPixels(value: number, config: IGraphConfig, axis?: 'x' | 'y'): number;
export declare function toPixels(value: Domain, config: IGraphConfig, axis?: 'x' | 'y'): Domain;
export declare function toPixels(value: XY, config: IGraphConfig): XY;
export declare function toPixels(value: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY;
export declare function toCoordinates(pixels: number, config: IGraphConfig, axis?: 'x' | 'y'): number;
export declare function toCoordinates(pixels: Domain, config: IGraphConfig, axis?: 'x' | 'y'): Domain;
export declare function toCoordinates(pixels: XY, config: IGraphConfig): XY;
export declare function toCoordinates(pixels: number | Domain | XY, config: IGraphConfig, axis?: 'x' | 'y'): number | Domain | XY;
//# sourceMappingURL=coordinates.d.ts.map