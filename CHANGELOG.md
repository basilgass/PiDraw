# Changelog

All the changes of PiDraw that a user or a program can see. The details of what to change when you upgrade are in the [migration guide](docs/guide/migration.md).

## Unreleased (after 0.2.28)

### Added

- **Slides**: `Slides` controller, the option `slide=<2-5,7,9->`, the commands `@pause`, `@pause=Title`, `@slides`, `@slides=<…>` and `@title,N=Title`. The TikZ export writes the step that is shown.
- **Zoom**: `Zoom` controller (`zoomIn`, `zoomOut`, `zoomTo`, `moveOrigin`, `reset`), with mouse, touch and pinch gestures.
- **Animation**: `Animate` is a controller made with the graph (`new Animate(graph)`) with the events `start`, `pause`, `end` and `stop`. `easing=inOut` and `loop` are applied and checked.
- **TikZ export**: `graph.tikz()` writes a complete `tikzpicture` for every figure, and `graph.tikzPreamble()` gives the lines to put before `\begin{document}`. The curves use `pgfplots`.
- **CodeMirror**: the entry `pidraw/codemirror` (language, highlighting, names of the figures, suggestions) for CodeMirror 6.
- **Errors**: a report for each drawing (`draw.refresh(code)` returns the errors and the state of each line), the line being typed keeps its last valid figure (`{editing}`), and typed errors (`ParseError`, `OptionError`, `InvalidArgumentError`, `MathError`, `NotImplementedError`, `UnsupportedOperationError`).
- **Figures and syntax**:
  - `g=grid` and `a=axis` in the code, graduated axes (`ticks`, `numbers`, `name`), axes drawn at the edge when the origin is outside the window.
  - `circ` by three points, by a diameter (`A:B`), tangent to a line, inscribed (`*`); `arc O,2,30,120` and `arc O,A,60`.
  - `bezier` with directions (`H`, `V`, angle) and control points (`*`), `->close`.
  - Regular star polygons (`poly O,3,5,2`) and `poly A,B,5` on a side.
  - `follow` on lines, circles, arcs, polygons, Bézier curves and paths; `follow f,A` to start at a point.
  - `path` (an SVG path in units of the coordinate system), `fill` between two plots or to the x axis, `riemann` with a position.
  - Equations of a line (`y=1/2`, `3x=6`, `2x-3y+6=0`), `bis d1,d2` and its other bisector, `drag` along an axis, on the grid, in a domain.
  - Parameters of the graph: `box`, `unitX`, `unitY` in centimeters, `axisX`, `axisY`, `gridX`, `gridY`, `default.label`, `default.tex`, `default.points`.
- **Documentation**: a guide with examples checked at each build, a reference of the keys made from the parser, and `PiDraw.documentation()` with the forms of each key.

### Changed

- A wrong input is an error, no longer a silent result: unknown options, options written twice, values too many, unknown keys of the parameters, invalid figure configurations.
- `PiDraw` has a graph (`draw.graph`) instead of being one.
- The drawing has its real size in centimeters (`unitX`, `unitY`) and no longer fills its container; `ppu` is gone.
- Curves are traced adaptively: about twenty times fewer points, and cut where the function is not defined.
- The configurations of the figures (`Point`, `Line`, `Circle`, `Arc`, `Plot`, `Polygon`) are exclusive unions: exactly one construction.
- The figures depend on each other through their configuration, and `graph.update(changed)` redraws only the figures that depend on the ones that moved.
- `Graph.updateLayout` keeps the points that were dragged or animated at their coordinates, and `refresh` keeps the figures of the lines that did not change.
- The classes of the figures are exported as types only.
- The label text (`label`, `tex`) runs up to the next option and can hold commas.
- Several constants and types are renamed (`AXIS` to `Axes`, `DOMAIN` to `Domain`, `LAYER_NAME` to `LayerName`…).
- `piparser` 0.2.1 or later is required.

### Removed

- The keys `quad` (use `plot A,B,C`) and `reg` (use `poly`), the word `show` of `follow`, the option `acute` of `arc`, the image of `fill`, the commands `@begin` and `@end`.
- The parameters `ppu`, `subgrid`, `label`, `tex`, `points` and `no-points` of the graph.
- `graph.animation`, `figure.animate` and `figure.slide` (use `new Animate(graph)`, `setAnimation`, `setSlide` and `figure.controls`), `CoordinateSystem` as a figure, `Graph.grid` and `Graph.subgrid`.

### Fixed

- Opacity was applied twice, and the last `fill` or `stroke` imposed its opacity on the other.
- A dragged point was off by half the size of its shape and drifted at each move.
- `Parametric`, `Plot` and `fill` could write `NaN` in the svg or loop for ever with an invalid number of samples or domain.
- The color of the markers depended on the order of the options.
- A label hidden with `?` came back after an update.
- Lines and grids on oblique axes mixed the components of the axes.
- `Ox` and `Oy` were replaced at each change of layout, so figures built on them became wrong.
- The tangent of `follow` was always drawn, and was null for a line at -45 degrees.
