import { type Domain } from "../../pidraw.common";
import type { IRiemannConfig } from "./Riemann.types";
export declare const DEFAULT_RECTANGLES = 5;
export declare const MAX_RECTANGLES = 1000;
export declare const DEFAULT_POSITION = 0;
export declare function domainOf(config: IRiemannConfig): Domain | null;
export declare function checkRiemann(config: IRiemannConfig, name: string): void;
//# sourceMappingURL=Riemann.constraints.d.ts.map