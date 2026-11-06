# Changelog

All the changes of PiDraw that a user or a program can see. The details of what to change when you upgrade are in the [migration guide](docs/guide/migration.md).

## Unreleased (after 0.2.28)

### Added

- **Usage**: `draw.hasDraggable()`, `draw.uses('animate' | 'slide' | 'toggle')` and `draw.usedControls()` tell what the figures ask of the program, and the event `usage` (`draw.on('usage', …)`) says when a drawing changes it. `Draw` is now an `EventTarget`.
- **Slides**: `Slides` controller, the option `slide=<2-5,7,9->`, the commands `@pause`, `@pause=Title`, `@slides`, `@slides=<…>` and `@title,N=Title`. The TikZ export writes the step that is shown.
- **Buttons**: `Buttons` controller (`buttons`, `toggle(id)`, `reset()`, the event `change`), the command `@button=id->title=Text` and the option `toggle=id/seconds`: the figures that name a button appear and go together, with a fade of the given seconds. The TikZ export writes what is shown.
- **Zoom**: `Zoom` controller (`zoomIn`, `zoomOut`, `zoomTo`, `moveOrigin`, `reset`), with mouse, touch and pinch gestures.
- **Animation**: `Animate` is a controller made with the graph (`new Animate(graph)`) with the events `start`, `pause`, `end` and `stop`. `easing=inOut` and `loop` are applied and checked.
- **TikZ export**: `graph.tikz()` writes a complete `tikzpicture` for every figure, and `graph.tikzPreamble()` gives the lines to put before `\begin{document}`. The curves use `pgfplots`.
- **CodeMirror**: the entry `pidraw/codemirror` (language, highlighting, names of the figures, suggestions) for CodeMirror 6.
- **Comments**: a line that starts with `%` is a comment. A line that starts with `$` is still ignored, but it is for something else than PiDraw; the editor colors it apart (`tok-meta`).
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
- **Values in a label**: `@` alone is the most classical value of the figure (point: coordinates, segment: length, arc: angle in degrees), and `@name` is another one (`@slope`, `@length`, `@radius`, `@perimeter`, `@area`). The slope is a fraction when it is exact, the angle of an arc always has its degree sign, `@@` is a `@` of the text, and the editor suggests the fields after a `@`.
- **The position of a label** can be written with its two letters in either order: `label=A/rm` is `label=A/mr`.
- **Labels pushed away from a figure**: `label=A/>O` puts the label on the side of `A` that is opposite to `O` (a point, a circle, an arc, a polygon), at any angle, and it follows when they move. A number after the position (`label=A/ml/1`, `label=A/>O/0.3`) pushes the label further. The label of an arc lies on the side of its middle direction, at any angle; the label of a circle is at its center; the label of a point that has a drag handle is kept clear of the handle.
- **Unit and scale of the lengths**: the parameters `unit=mm` (the symbol written after the lengths and the areas of the labels) and `scale=10` or `scale=1/10` (a length is multiplied by it, an area by its square). They change nothing of the drawing. A label in TeX writes them as a formula.
- **Range of an axis**: the option `range=-10:10` (or `range=10`) of an axis, of `axis`, `axisX` and `axisY`, and of a line `a=axis A,B`, draws only the part of the axis between these units from its zero. The arrow, the graduation and the TikZ export follow.
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
- `dash` without a value is a pattern in pixels (6, then a gap of 4) and no longer half a unit of the x axis, so it looks the same at any scale or zoom. `dash=xs|sm|md|lg|xl` are sizes.
- The label text (`label`, `tex`) runs up to the next option and can hold commas.
- A `@` followed by letters in a label is the name of a field: it is an error when the figure does not have it, and `@` alone is an error for a line, a ray, a vector, a circle and a polygon.
- Several constants and types are renamed (`AXIS` to `Axes`, `DOMAIN` to `Domain`, `LAYER_NAME` to `LayerName`…).
- `piparser` 0.2.1 or later is required.
- **TikZ colors**: a color name is defined with `\definecolor` from its CSS shade, so the PDF has the colors of the screen (`green`, `orange`, `purple`, `lightgray`… no longer take the shade of `xcolor`). Every name of CSS is exported, `gold`, `grey`, `darkgrey` and `lightgrey` included, and the definitions are gathered once at the start of the `tikzpicture`.

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
