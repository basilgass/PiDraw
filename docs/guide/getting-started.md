# Getting started

PiDraw reads a few lines of text and draws them as an SVG. This page goes from the install to a drawing in a web page, and shows what the library tells you when a line is wrong.

## Install

```bash
npm install pidraw
```

PiDraw is published as an ES module. Without a bundler, import the built file from a module script:

```html
<div id="figure"></div>

<script type="module">
    import {PiDraw} from './node_modules/pidraw/dist/pidraw.js'

    new PiDraw('figure', {
        parameters: 'x=-1:6,y=-1:5,axis,grid',
        code: `
            A(1,1)
            B(5,2)
            s=seg A,B
        `
    })
</script>
```

With a bundler, `import {PiDraw} from 'pidraw'` does the same.

## The first drawing

`PiDraw` takes the element to draw in (or its `id`) and an object with three optional fields:

| Field | Description |
|---|---|
| `code` | The figures, one per line. See [Syntax](./syntax). |
| `parameters` | What the graph shows: the part of the plane, the axes, the grid, the defaults of the figures. |
| `tex` | A function that turns the text of a `tex=` label into HTML, for example with KaTeX. |

The drawing below is the code of the page above.

```pidraw params="x=-1:6,y=-1:5,axis,grid"
A(1,1)
B(5,2)
s=seg A,B
```

The `parameters` are written like the options of a line, separated by commas: `x=-1:6` and `y=-1:5` are the part of the plane that is drawn, `axis` shows the axes and `grid` the grid. Without them the graph shows `-8:8` on both axes and nothing else.

A unit is one centimeter, and the drawing keeps that size: a wider window makes a wider drawing, not smaller figures. `unitX=1.5` makes a unit 1.5 cm long.

## Each line is built on the ones before it

A figure can use the figures named above it. When one of them moves, the ones that depend on it are drawn again.

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,1)->drag,label
B(6,4)->drag,label
M=mid A,B->red,label
d=line A,B->dash
```

`drag` makes a point movable with the mouse. Move `A` or `B`: the midpoint and the line follow. `label` writes the name of the figure next to it.

## Change the drawing

A `PiDraw` keeps its graph, so the code can be replaced as the user types:

```ts
import {PiDraw} from 'pidraw'

const draw = new PiDraw('figure', {code: 'A(1,1)'})

draw.refresh('A(1,1)\nB(5,2)')          // the code changes
draw.refreshLayout('x=-1:6,y=-1:5')     // the parameters change
```

Only the lines that changed are drawn again: the figures of the lines at the start of the code that did not change stay as they are, and so do the points the user dragged.

## When a line is wrong

A line that cannot be drawn never stops the others, and nothing is thrown. `refresh` returns a report of what was wrong, line by line:

```pidraw params="x=-1:6,y=-1:5" errors="3,4"
A(1,1)
B(5,2)
s=seg A,B->colr=red
C(3,
```

Line 3 draws the segment, but `colr` is not an option. Line 4 is not a figure at all. The report says so:

```ts
const report = draw.refresh(code)

report.errors[0]
// {
//   line: 3,               the number of the line, from 1
//   text: 's=seg A,B->colr=red',
//   from: 11, to: 19,      the part of the line that is wrong, when it is known
//   severity: 'error',
//   message: 'Unknown option "colr" for "s"',
//   error: OptionError
// }
```

Reading the report lets an editor underline the line in red. [Syntax](./syntax#errors) lists what counts as an error, and [errors and editing](./errors) shows how a program uses the report.

## Labels in TeX

A label written with `tex=` is a TeX formula. PiDraw does not draw TeX itself: it gives the text to the `tex` function and writes what the function returns. With KaTeX:

```ts
import katex from 'katex'
import {PiDraw} from 'pidraw'

new PiDraw('figure', {
    code: 'A(1,1)->tex=A_1',
    tex: text => katex.renderToString(text, {throwOnError: false})
})
```

Without a `tex` function, the text of the label is written as it is.

```pidraw params="x=-1:6,y=-1:4"
A(1,1)->tex=A_1
B(3,2)->tex=\alpha
C(5,1)->tex=\frac{\pi}{3}
```

A label of two characters, a letter and a digit (`tex=A1`), is written with the digit as a subscript: `A_1`.

## What next

- [Syntax](./syntax): the shape of a line, its options, the shorthands.
- The figures: [points](./points), [lines](./lines), [circles and arcs](./circles), [functions and curves](./curves), [polygons and paths](./polygons), [grids and graduated lines](./grids-axes).
- [The graph](./graph) and [the options](./options) that every figure has.
- [Dragging and animation](./interaction), [using it from code](./code), [errors and editing](./errors) and [TikZ](./tikz).
