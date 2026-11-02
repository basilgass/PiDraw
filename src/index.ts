// import { Graph } from "./Graph"
// import { NumExp } from "./Calculus"

// export const PiDraw = Graph
// export const PiNum = NumExp

// Export figures
export type * from "./figures/AbstractFigure/AbstractFigure"
export type * from "./figures/Arc/Arc"
export type * from "./figures/Arc/Arc.types"
export type * from "./figures/Bezier/Bezier"
export type * from "./figures/Bezier/Bezier.types"
export type * from "./figures/Circle/Circle"
export type * from "./figures/Circle/Circle.types"
export type * from "./figures/FillBetween/FillBetween"
export type * from "./figures/FillBetween/FillBetween.types"
export type * from "./figures/Follow/Follow"
export type * from "./figures/Follow/Follow.types"
export type * from "./figures/Axis/Axis"
export type * from "./figures/Axis/Axis.types"
export type * from "./figures/Grid/Grid"
export type * from "./figures/Grid/Grid.types"
export type * from "./figures/Line/Line"
export type * from "./figures/Line/Line.types"
export type * from "./figures/Parametric/Parametric"
export type * from "./figures/Parametric/Parametric.types"
export type * from "./figures/Curve/Curve.types"
export type * from "./figures/Path/Path"
export type * from "./figures/Path/Path.types"
export type * from "./figures/Plot/Plot"
export type * from "./figures/Plot/Plot.types"
export type * from "./figures/Point/Point"
export type * from "./figures/Point/Point.types"
export type * from "./figures/Polygon/Polygon"
export type * from "./figures/Polygon/Polygon.types"
export type * from "./figures/Riemann/Riemann"
export type * from "./figures/Riemann/Riemann.types"
export type * from "./figures/Label/Label"
export type * from "./figures/Label/Label.types"

// Animate types
export type * from "./Animate"

// Main exports.
export * from "./pidraw.common"
export {Graph as PiGraph} from "./Graph"
export type {IDraggableConfig, IDraggableFollow} from "./Graph"
export {Draw as PiDraw} from "./Draw"

// Errors
export * from "./errors"
