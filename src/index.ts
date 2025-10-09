// import { Graph } from "./Graph"
// import { NumExp } from "./Calculus"

// export const PiDraw = Graph
// export const PiNum = NumExp

// Export figures
export type * from "./figures/Arc"
export type * from "./figures/Bezier"
export type * from "./figures/Circle"
export type * from "./figures/CoordinateSystem"
export type * from "./figures/FillBetween"
export type * from "./figures/Follow"
export type * from "./figures/Grid"
export type * from "./figures/Line"
export type * from "./figures/Parametric"
export type * from "./figures/Path"
export type * from "./figures/Plot"
export type * from "./figures/Point"
export type * from "./figures/Polygon"
export type * from "./figures/Riemann"
export type * from "./labels/Label"

// Animate types
export type * from "./Animate"

// Main exports.
export * from "./pidraw.common"
export {Graph as PiGraph} from "./Graph"
export {Draw as PiDraw} from "./Draw"
