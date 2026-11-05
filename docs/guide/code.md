# Using it from code

`PiDraw` reads text and builds a drawing. The drawing itself is a `PiGraph`, which `draw.graph` gives. `PiGraph` draws the figures, draws them again when something moves, answers to the mouse, and writes the TikZ. You can use it alone, without any text.

The blocks of this page are run when the documentation is built: the results in the comments are the real ones. `container` is the element to draw in, and every name of the library (`PiDraw`, `PiGraph`...) is available.

## PiDraw

```js
const draw = new PiDraw(container, {
    parameters: 'x=-1:7,y=-1:5,axis',
    code: 'A(1,1)\nB(5,3)\ns=seg A,B'
})

Object.keys(draw.graph.figures) // [ 'A', 'B', 's' ]
draw.errors.length // 0
```

| Member | Description |
|---|---|
| `new PiDraw(container, {code, parameters, tex})` | draws in `container` (an element, or its `id`). All the fields are optional |
| `refresh(code, options)` | draws the code again, and gives the [report](./errors). The lines at the start of the code that did not change keep their figures |
| `refreshLayout(parameters)` | reads the parameters of [the graph](./graph) again. It gives the error of the parameters, or `null` |
| `report`, `errors` | what the last `refresh` said, line by line |
| `layoutError` | what is wrong with the parameters, or `null` |
| `code` | the lines that were read |
| `graph` | the `PiGraph` |
| `PiDraw.documentation()` | the list of the kinds of figures: their key, name, description, forms (the ways to write the line) and a summary |

```js
const draw = new PiDraw(container, {code: 'A(1,1)'})

draw.refresh('A(1,1)\nB(2,2)\nC(3,')
Object.keys(draw.graph.figures) // [ 'A', 'B' ]
draw.errors.map(error => error.line) // [ 3 ]

draw.refreshLayout('x=-3:3,axis') // null
Object.keys(PiDraw.documentation()).includes('seg') // true
```

## PiGraph alone

A graph can be built without text. The figures are made by `graph.create`, and the figures that depend on others hold them.

```js
const graph = new PiGraph(container, {width: 400, height: 300})

const A = graph.create.point({x: 1, y: 1}, 'A')
const B = graph.create.point({x: 3, y: 2}, 'B')
const d = graph.create.line({through: {A, B}}, 'd')

Object.keys(graph.figures) // [ 'A', 'B', 'd' ]
A.coordinates.x.toFixed(2) // 1.00
Object.keys(graph.create).join(' ') // point line path bezier plot parametric circle polygon arc follow fillbetween grid axis riemann
```

`width` and `height` are in pixels (800 by 600 by default), `origin` is where the origin of the plane is, and `axis` the vectors of the two axes: `PiDraw` sets all of them from its parameters, and a `PiGraph` alone is for those who want to set them. `tex` is the function of the labels in TeX. `measure: {unit: 'mm', scale: 10}` sets the unit and the scale of the lengths that the labels write (the parameters `unit` and `scale`, see [the unit of the lengths](./graph#the-unit-of-the-lengths)); `graph.updateLayout({...graph.config, measure})` changes them.

### Update

When a point moves, the figures that depend on it are drawn again with `update`. It says how many figures it reached.

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(5,3)\ns=seg A,B\nt=seg B,B'})
const {A} = draw.graph.figures

A.pixels = {x: A.pixels.x + 20, y: A.pixels.y}

draw.graph.update([A]) // { updated: 2, total: 4 }
draw.graph.update() // { updated: 4, total: 4 }
```

A figure holds the figures it depends on in its configuration: it is how the graph knows what to draw again. `update()` without a figure draws everything.

### Remove

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(5,3)\ns=seg A,B'})

draw.graph.remove('A') // throws InvalidArgumentError
draw.graph.remove('A', {cascade: true}) // [ 's', 'A' ]
Object.keys(draw.graph.figures) // [ 'B' ]
```

A figure that others depend on is not removed, unless you say `cascade`: the figures that depend on it go first. `graph.clear()` removes all the figures, and `graph.dispose()` takes the graph out of the page.

## Drag from code

`graph.draggable(point, options)` makes a point draggable, and `graph.handle(point, options)` does it with a handle: the pale disc of the option `drag`. The options are explicit: `along` (`'x'` or `'y'`), `grid`, `bounds` (`{x: {min, max}}`), `follow` (a list of figures or functions), and `target`.

`graph.dragTo(point, pixels)` puts a draggable point where the mouse would have put it at `pixels`, under the same rules, and draws what depends on it. No event is emitted. It is how a drawing is set from a program, and how the options of [dragging](./interaction#what-the-rules-do) are checked.

```js
const draw = new PiDraw(container, {parameters: 'x=-5:5,y=-5:5', code: 'A(1,1)->drag=Ox\nB(0,3)\ns=seg A,B'})
const {graph} = draw
const {A, B} = graph.figures

graph.dragTo(A, graph.toPixels({x: 3, y: -4}))

// A keeps its height, and the segment follows
Object.values(graph.toCoordinates(A.pixels)).map(value => +value.toFixed(2)) // [ 3, 1 ]
Object.keys(graph.figures) // [ 'A', 'A_drag', 'B', 's' ]
```

`graph.toPixels` and `graph.toCoordinates` change a position, a length or an interval from units of the graph to pixels, and back.

Drag events are listened to with `graph.on`, and `graph.off` stops it. The event has the graph, the figure that is held (`figure`), the point that moves with it (`target`: the same point, or the point behind a handle), and for `dragmove` how many figures the move reached.

```ts
draw.graph.on('dragmove', (event) => {
    const {figure, target, updated, total} = event.detail

    console.log(`${target.name} moved: ${updated} figures of ${total}`)
})
```

The events are `dragstart`, `dragmove` and `dragend`.

## Animation

The points that have `animate` are played by an `Animate`, which is made with the graph: `new Animate(graph)`. A graph has one. It is started by the program. The animation of a point is kept in `point.controls.animate`; a program from code gives it one with `setAnimation(point, {from, to, duration, delay, easing, loop})` (a point, from a point to a point: anything else is an `InvalidArgumentError`).

| Member | Description |
|---|---|
| `new Animate(graph)` | the animation of the points of `graph`; a second one for the same graph is an error |
| `canBeAnimated()` | whether a point of the drawing has an animation |
| `start()` | starts the animation from the beginning, or goes on after a pause; while it runs it does nothing |
| `pause()` | stops it where it is |
| `stop()` | stops it and puts the points back |
| `restart()` | starts again from the beginning, whatever the animation was doing |
| `isRunning()`, `isPaused()` | what the animation is doing |
| `on(event, handler)`, `off(event, handler)` | the events `start` (begun, or gone on after a pause), `pause`, `end` (every point reached its end and none loops) and `stop` |

A figure that is removed (the code was changed) takes its animation with it, and the others go on. A page that shows buttons listens to the events instead of keeping its own idea of what the animation does.

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(5,3)\nP(1,1)->animate,from=A,to=B'})
const animation = new Animate(draw.graph)

animation.canBeAnimated() // true
animation.isRunning() // false
```

## Zoom

A `Zoom` changes the part of the plane that the drawing shows: the drawing keeps its size, the units get longer or shorter and the origin moves. It is made with the graph, `new Zoom(graph, options)`, like `Animate`, and a graph has one. The two do not know each other.

| Member | Description |
|---|---|
| `new Zoom(graph, {allow, gestures})` | `allow` is `both` (the default), `zoom` or `move`; `gestures` (`false` by default) lets it listen to the mouse and the fingers |
| `zoomIn(factor?, center?)`, `zoomOut(factor?, center?)` | the units get `factor` times longer or shorter (1.25 by default), around the pixel `center` (the middle of the drawing by default) |
| `zoomTo({x: {min, max}, y: {min, max}})` | shows exactly this part of the plane |
| `moveOrigin(dx, dy)` | slides the plane under the drawing, in pixels |
| `reset()` | comes back to the layout at the start |
| `window`, `scale`, `canZoom`, `canMove` | the part of the plane that is shown, the length of a unit compared with the start, and what `allow` lets it do |
| `navigating` | the mode of navigation, see below |
| `on(event, handler)`, `off(event, handler)` | the events `change` (the window, whoever changed the layout) and `navigation` (the mode was entered or left) |

What `allow` lets the zoom do:

| `allow` | Zoom | Move | |
|---|---|---|---|
| `both` | yes | yes | |
| `zoom` | yes | no | the origin stays where it is: the zoom is always around it, whatever the `center`. `moveOrigin` and `zoomTo` are refused |
| `move` | no | yes | the length of a unit never changes. `zoomIn`, `zoomOut` and `zoomTo` are refused |

A call that `allow` does not permit is an `UnsupportedOperationError`; `reset` is always allowed. The units stay between a hundredth and a hundred times the ones at the start: a zoom that would go further stops there.

The points that were dragged or animated keep their place in the plane when the layout changes, and what depends on them follows.

```js
const draw = new PiDraw(container, {code: 'A(1,1)'})
const zoom = new Zoom(draw.graph)

zoom.zoomIn(2)
Math.round(zoom.scale.x) // 2
zoom.reset()
zoom.scale.x // 1
```

A zoom that may only move refuses to zoom:

```js
const other = new PiDraw(container, {code: 'A(1,1)'})
const moving = new Zoom(other.graph, {allow: 'move'})

moving.zoomIn() // throws UnsupportedOperationError
```

### The mouse and the fingers

PiDraw has three levels. Without a `Zoom`, the drawing cannot be zoomed. With `new Zoom(graph)`, only the program (its buttons) acts. With `new Zoom(graph, {gestures: true})`, the zoom may listen to the drawing:

- **Ctrl and the wheel** zoom around the cursor (this is also what a pinch on a touchpad sends). They never get in the way of dragging a point.
- **The mode of navigation** (`zoom.navigating = true`) puts a layer over the drawing that takes the mouse and the fingers: a drag moves the drawing, the wheel zooms around the cursor, one finger moves, two fingers pinch to zoom and move together. The points cannot be dragged meanwhile. A page shows a button to enter and leave the mode, and listens to the event `navigation` to show it.

`allow` applies to the gestures too: with `zoom` a drag does nothing and the pinch zooms around the origin; with `move` the wheel is left to the page and the pinch only moves. `zoom.navigating = true` on a zoom made without `gestures` is an `UnsupportedOperationError`. The [page of the controls](../controls) shows all this at work.

## Slides

A `Slides` shows the figures step by step. It is made with the graph, `new Slides(graph, options)`, like `Animate` and `Zoom`, and a graph has one. The three do not know each other. The steps at which a figure is shown are its `slide` (the option [`slide`](./slides), the commands `@pause` and `@slides`, or a program that calls `setSlide(figure, [{from: 2}])`; the figure keeps them in `figure.controls.slide`); the `Slides` decides which step is shown.

| Member | Description |
|---|---|
| `new Slides(graph, {count})` | the presentation of `graph`, at its first step. `count` is the least number of steps (the steps are otherwise the largest one that a figure names) |
| `current`, `count`, `title`, `state` | the step that is shown (from 1), the number of steps (at least 1), the title of the step that is shown (`null` if it has none), and the three |
| `titleOf(step)`, `titles` | the title of a step (`null` if it has none), and all the titles by step, a copy. The titles come from the code (`@pause=Title`, `@title,3=Title`, see [slides](./slides#the-title-of-a-step-pause-title-and-title)); a title for a step that does not exist is kept |
| `next()`, `previous()`, `first()`, `last()` | go to a step; at the end or at the start nothing happens |
| `goto(step)` | goes to this step; an integer outside 1 to `count` is an `InvalidArgumentError` |
| `on(event, handler)`, `off(event, handler)` | the event `change`, which gives the step and the number of steps: it is sent when the step changes, and when the number of steps or the titles do (the code was changed) |

A figure that is not shown is still drawn and updated; it is hidden, and `hide()` is not touched. Without a `Slides` the steps mean nothing and every figure is shown. A figure that is made after the `Slides`, or whose steps change, is shown or hidden at once for the step that is shown.

```js
const draw = new PiDraw(container, {code: 'A(1,1)\n@pause\nB(2,2)->slide=<2-3>'})
const slides = new Slides(draw.graph)

slides.count // 3
slides.current // 1
slides.goto(3)
slides.current // 3
slides.goto(4) // throws InvalidArgumentError
```

## Changing the code while it is typed

`refresh` gives a report and does not throw for a line of code. A program that shows a text field calls it at each keystroke, with the number of the line being written: [the errors page](./errors) shows how.

## TikZ

`graph.tikz()` writes the drawing as a `tikzpicture`, and `graph.tikzPreamble()` the lines to put before `\begin{document}`. See [TikZ](./tikz).

## In a CodeMirror editor

`pidraw/codemirror` gives [CodeMirror 6](https://codemirror.net/) the language of PiDraw: the colors, a mark on the names of the figures and the suggestions. It reads the kinds of figures, the options, the parameters and the colors from the parser, so it always knows the syntax of the version you use.

```ts
import {EditorView} from '@codemirror/view'
import {pidraw, pidrawParameters} from 'pidraw/codemirror'

// The code of the drawing
new EditorView({parent: codeElement, extensions: [pidraw()]})

// The parameters of the graph: x=-10:10,axis,grid
new EditorView({parent: parametersElement, extensions: [pidrawParameters()]})
```

`@codemirror/autocomplete`, `@codemirror/language`, `@codemirror/state`, `@codemirror/view` and `@lezer/highlight` are peer dependencies: your project installs them, and the editor and the language share the same copy.

The colors are classes, the same ones as [PiMath](https://basilgass.github.io/PiMath/) uses, so the page decides the colors and an editor of each library looks the same:

| Class | Used for |
|---|---|
| `tok-keyword` | the kinds of figures (`seg`), the parameters of the graph (`axis`) |
| `tok-function` | the options (`w`, `label`) |
| `tok-string` | the colors (`red`) |
| `tok-number` | numbers |
| `tok-comment` | a comment (`% ...`) |
| `tok-meta` | a line for something else than PiDraw (`$ ...`) |
| `tok-invalid` | a line that starts with `@` |

```css
.cm-editor .tok-keyword { color: #2563eb; }
.cm-editor .tok-function { color: #4f46e5; }
.cm-editor .tok-string { color: #16a34a; }
.cm-editor .tok-number { color: #9333ea; }
.cm-editor .tok-comment { color: #64748b; font-style: italic; }
.cm-editor .tok-meta { color: #b45309; font-style: italic; }
.cm-editor .tok-invalid { color: #dc2626; }
```

The names of the figures have their own classes: `cm-pidraw-def` where a figure is made (bold), `cm-pidraw-ref` where it is used, and `cm-pidraw-dup` for a name made twice. The colors of the last two are the CSS variables `--pidraw-ref` and `--pidraw-dup`.

Each function takes options to leave a part out: `pidraw({completion: false, highlight: false, names: false})`. The parts are also exported alone (`pidrawLanguage`, `pidrawHighlight`, `pidrawNames`, `pidrawCompletion`) to build the editor piece by piece.

The errors of the drawing are not part of it: see [the errors page](./errors) for the diagnostics.
