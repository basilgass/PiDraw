// The entry of the package `pidraw`.
//
// What is exported as a value (`export {…}`, `export *`) can be used at run time: the two classes of the library, the controllers, the enumerations,
// the helpers and the errors. What is exported as a type only (`export type`) is for typing a program.
//
// The figures are exported as types only: a program makes them with `PiGraph.create` (or with the code of `PiDraw`), never with `new`, and
// types are all it needs to name what it gets back. `tests/index.test.ts` lists what is exported at run time: adding or removing a name there is
// a decision, and a break of the API when it removes one (see `.claude/docs/breaking-changes.md`).

// Figures
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

// What the figures give back: the shapes of the data that their getters return.
export type {TickLabel, TickSelection} from "./calculus/computeAxis"
export type {BezierSegment} from "./calculus/computeBezier"
export type {PathCommand} from "./calculus/computePath"
export type {RiemannRectangle} from "./calculus/computeRiemann"

// Animation (a controller: made with the graph, `new Animate(graph)`)
export * from "./animate/Animate.types"
export {Animate} from "./animate/Animate"
export {setAnimation} from "./animate/animation"
export {EASINGS} from "./calculus/easing"

// Zoom (a controller: made with the graph, `new Zoom(graph)`)
export * from "./zoom/Zoom.types"
export {Zoom, ZOOM_STEP} from "./zoom/Zoom"
export {ZOOM_LIMITS} from "./calculus/computeZoom"

// Slides (a controller: made with the graph, `new Slides(graph)`)
export type * from "./slides/Slides.types"
export {Slides} from "./slides/Slides"
export {setSlide} from "./slides/slideSet"

// What the themes keep on a figure (`figure.controls`)
export type * from "./controls/controls.types"

// The graph and the code
export * from "./pidraw.common"
export type * from "./Graph.types"
export {Graph as PiGraph} from "./Graph"
export type {IDraggableConfig, IDraggableFollow} from "./Graph"
export {Draw as PiDraw} from "./Draw/Draw"
export type {BuildResult, FigureKind, IParserConfig, ParserItem} from "./parser/parser.types"
export type * from "./Draw/Draw.report"

// Errors
export * from "./errors"
