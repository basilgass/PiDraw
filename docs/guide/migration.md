# Migration

This page lists what changes for a program or a drawing written for PiDraw 0.2.28 or before. The changes come in three kinds: the **code** of a drawing (the syntax), the **API** of the library, and what the drawing **looks like**. The list of the new features is in the [changelog](https://github.com/basilgass/PiDraw/blob/master/CHANGELOG.md).

The general rule of this version: **a wrong input is an error, no longer a silent result**. A line that was ignored, an option that was lost or a value that was replaced by a default is now reported. Most of the entries below are the same change seen from different places.

## The code of a drawing

### Keys and forms that changed

| Before | Now |
|---|---|
| `f=quad A,B,C` | `f=plot A,B,C` (the parabola through three points, a line if they are aligned) |
| `p=reg O,3,6` | `p=poly O,3,6`. A regular polygon from its center and a vertex (`reg O,A,5`) does not exist any more: `poly A,B,5` is the regular polygon of side `[AB]` |
| `c=circ A,B,C` | a circle through the three points (it used to ignore `C` and make the circle of center `A` through `B`) |
| `dpt A,d,3,x` | the fourth value must be `*`; any other value is an error |
| `t=follow f,show` | `t=follow f,*`. The tangent is drawn only with `*` |
| `a=arc B,A,C->acute` | `a=arc B,A,C,*` (the other arc). `acute` is no longer an option |
| `z=fill f,g,0:3,-2:2` | the image (last value) is gone: `z=fill f,g,0:3` |
| `@begin:x`, `@end:x` | removed. A line that starts with `@` is a [command](./slides) or an error |

### Values that were ignored and are now errors

| Line | Why |
|---|---|
| `A=pt 1`, `A=pt 1,2,3` | a point has two coordinates |
| `line A,B,A`, `circ O,3,5`, `d=ABC` | a value too many used to be dropped |
| `seg A,2` | a slope only goes with `line` |
| `d=A`, `d=vAB.`, `d=y=2x+1` | not a line (write `d=line y=2x+1`) |
| `bis d1,d2,3` | the last value of a bisector can only be `*` |
| `A:B:C` | a pair has two names |
| `poly A,B` | a polygon has at least three vertices |
| `hello`, `A=nothing 1,2` | a line that is not a figure was skipped without a word |

### Options

- **An unknown option is an error** (`->colr=red`, `->tick`). It used to be ignored, except a color name.
- **An option written twice is an error** (`->red,red`, `->w=2,w=3`). The last one used to win.
- **The values are checked**: `w=red`, `mark=3`, `loop=revers`, `easing=foo`, `drag` on a figure that is not a point, or `from`/`to` without `animate`.
- **`easing=inOut` now eases the movement.** The option was accepted and had no effect.
- **A label text can hold commas**: `label=Hello, world,red`. The text runs up to the next option, so a word after it that is not an option is part of the text.
- **The size of a point shape** is `o=8`, `s=12`, `*=6` (and `points=s/12` for the whole drawing). `o/8` and `o:8` never worked.

### Parameters of the graph

- **An unknown key or an invalid value is an error** (`x=-2pi:2pi` used to fall back to `-8:8`).
- **`ppu` is gone, and `unitX` / `unitY` are lengths in centimeters.** The drawing has its real size (1 cm is 37.94 px) instead of filling its container, and the bounds `x` and `y` are in units of the coordinate system.
- **Removed**: `ppu`, `subgrid`, `label`, `tex`, `points`, `no-points`. The error names the replacement: `subgrid` is the option `subgrid=n` of `grid` (`grid->subgrid=4`), `label` and `tex` are `default.label` and `default.tex`, `points` is `default.points`.
- **Axes outside the window** are drawn at the nearest edge, with their numbers inside.
- **`axis=<step>` draws the ticks and the numbers** it used to read and ignore.

### Names

A figure cannot be named `Ox` or `Oy`: they are the axes of the graph, and they can be used wherever a line is expected (`H=proj A,Ox`, `circ O,Ox`).

## The API

### `PiDraw` and `PiGraph`

| Before | Now |
|---|---|
| `PiDraw` extends `PiGraph` | `PiDraw` has a graph: `draw.graph.create`, `draw.graph.figures`, `draw.graph.on('dragmove', …)`, `draw.graph.tikz()`… |
| `draw.refresh(code)` returns nothing and writes to the console | it returns a report `{errors, lines}`; `draw.errors` has the last one. See [Errors and editing](./errors) |
| `refresh` clears the graph | the lines at the start of the code that did not change keep their figures (the same objects), and a dragged point stays where it was left (`refresh(code, {drag: 'reset'})` for the old behavior) |
| `refreshLayout(parameters)` and the constructor throw | they report: `draw.layoutError` |
| `graph.config = …`, `graph.display = …` | `graph.updateLayout(config, display)`; it validates first and leaves the graph as it was on failure. Points that were dragged or animated keep their coordinates |
| `graph.update(except)` | `graph.update(changed)`: the figures that depend on `changed` are redrawn, once, after the ones they depend on |
| `graph.remove(name)` | it throws if other figures depend on it, unless `{cascade: true}` |
| `graph.create.point(config, 'A')` with a name already taken | `InvalidArgumentError` (the old figure used to stay in the svg) |
| `new PiGraph('missing')` | `InvalidArgumentError` (a detached `div` used to be made) |
| `graph.grid(name, …)`, `graph.subgrid(name, n)`, `graph.coordinate_system()` | `graph.create.grid`, `graph.mainGrid` and `graph.axes` (`Ox` and `Oy`, which are lines) |

### Figures

The classes of the figures are exported as **types only**: make them with `graph.create` or with `PiDraw`, never with `new`.

| Before | Now |
|---|---|
| `fill('red/0.5')`, `stroke('red/0.5')` | `fill({color: 'red', opacity: 0.5})`; the string with `/` is an `InvalidArgumentError`. The syntax `color=red/0.5` is unchanged |
| `mark('end', ['x', 12])` | `mark({side: 'end', shape: 'x', size: 12})` |
| `addLabel(text, true, converter)` | `addLabel(text, {asHtml: true, texConverter: converter})`. The `@` is no longer read: a label with fields is a list `['P', {field: 'coordinates', digits: 2}]` |
| `figure.animate = {…}`, `figure.animate` | `setAnimation(point, {…})`, `figure.controls.animate` |
| `graph.animation.start()` | `const animation = new Animate(graph)`, then `animation.start()`. `cancel()` is now `stop()`, `resume()` is `start()` |
| a configuration with zero or several constructions | `InvalidArgumentError`. The configurations of `Point`, `Line`, `Circle`, `Arc`, `Plot` and `Polygon` are **exclusive unions**: exactly one construction (`through`, `parallel`, `slope`…) plus the common options |
| `new Point(rootSVG, …)` | figures are made by the graph and get a context; they do not depend on the `Graph` class |
| `Label.auto_rotate` | `Label.autoRotate` |
| `point.pixels.x = 5` | `point.pixels = {x: 5, y}`, `point.x = 5`. `pixels` is read only and copied on write |
| a figure that cannot exist (parallel lines, a circle that misses a line) | it is not drawn (`visibility="hidden"`) and its position is `NaN`; it comes back when its position does |

### Renamed

| Before | Now |
|---|---|
| `DOMAIN`, `isDOMAIN` | `Domain`, `isDomain` |
| `AXIS` | `Axes` (`Axes.X === 'Ox'`) |
| `COORDINATE_SYSTEM` | `CoordinateSystem` |
| `LAYER_NAME` | `LayerName` |
| `LOOP_STYLE` | `LoopStyle` |
| `ILayers` | `Layers` |
| `buildInterface` | `BuildResult` |
| `parser_item`, `PiDraw.documentation()[key].code` | `ParserItem`; the entries have `forms` (a list) and `summary` instead of `code` |
| `IFigureAnimation.easing: 'linear' \| 'inOut'` | `AnimationEasing` (same values) |
| `Only` (type of `ICircleConfig`) | `CircleOnly` |

### Errors and mathematics

- The errors have types, all under `PiDrawError`: `ParseError`, `OptionError` (a `ParseError` for an option), `InvalidArgumentError`, `MathError`, `NotImplementedError`, `UnsupportedOperationError`. Test with `instanceof` or `toThrow(Class)`, not with the message.
- `new NumExp(expression)` throws a `ParseError` for a malformed expression (`isValid` is gone), and `evaluate` throws for a variable without a value. `sin(x)^2` is `sin(x)²` (it was `sin(x²)`).
- `toPixels` and `toCoordinates` throw for a value that is not a number, a domain or a point.
- An invalid shape, size, slope, radius, `dash` pattern, `mark` side or animation is an `InvalidArgumentError` at the call, and the figure is left unchanged.

### Building

- The code that `pidraw.js` and `pidraw/codemirror` share is in `dist/shared.js`. Importing `pidraw` is unchanged; a direct import of `dist/pidraw.js` outside the package needs `dist/shared.js` next to it.
- The CodeMirror packages are optional peer dependencies: only `pidraw/codemirror` uses them.
- PiDraw needs `piparser` 0.2.1 or later.

## What a drawing looks like

These changes are visible without any error. Compare the drawings of a page you already have.

| What | Before | Now |
|---|---|---|
| Size of the drawing | fills its container | its real size, in centimeters, and at most the width of its container |
| Point | circle of size 2 when made from the API without a size, 5 from the parser | size 5 everywhere; a cross is about 29% smaller (its size is its bounding box) |
| Curves | one point per pixel of the domain, cut at an asymptote | adaptive, about twenty times fewer points, refined where the curve bends, cut where it is not defined |
| `parametric` default domain | `-2pi:2pi` | `0:2pi` |
| `fill f` | closed by a chord | goes down to the x axis |
| Riemann rectangles of a negative function | from the curve downward | from the x axis |
| Opacity | applied twice (`red/0.5` gave a fill at 0.25) | applied once |
| Arrow of a vector, markers | the color depended on the order of the options | the marker takes the stroke of the figure |
| Line and ray labels | at the top left corner | near the end of the line, rotated along it |
| `follow` | starts at the corner of the drawing, always draws the tangent | starts at the origin, draws the tangent only with `*` |
| Bézier `H` and `V` | `H` always starts to the right, `V` downward | the direction follows the path |
| Oblique axes | treated as horizontal and vertical | the intersections, grids and projections are right |
| Drag of a point | off by half the size of its shape | follows the mouse to the pixel; `drag=grid` follows the subdivisions of the grid (`subgrid`) |
| Right angle mark (`square`) of an arc | whenever the sides were perpendicular | only for an arc of 90 degrees |

## TikZ

`graph.tikz()` writes a complete `tikzpicture` (the scale, the window, the grid and the axes, then the figures in the order of the screen), and `graph.tikzPreamble()` gives the lines to put before `\begin{document}`. See [TikZ export](./tikz).
