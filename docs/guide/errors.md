# Errors and editing

A drawing is often written live, so lines that are not valid are normal. PiDraw never throws for a line of code: it draws what it can, and tells you what was wrong, line by line. This page is for a program that shows the code and the drawing together, such as an editor.

## The report

`draw.refresh(code)` returns a report, and `draw.report` (or `draw.errors`) keeps the last one.

| Field | Description |
|---|---|
| `errors` | the problems, one per line that is not valid |
| `lines` | the state of each line that holds a figure: `{line, status}`, with `status` `'ok'`, `'error'` or `'pending'`. The empty lines and the comments are not listed |

Each error has:

| Field | Description |
|---|---|
| `line` | the number of the line in the code, from 1 |
| `text` | the line, without the spaces around it |
| `from`, `to` | when the problem is an option, the part of the line that is wrong, in columns of the line **as it is written** (the spaces before it included), `to` not included. Without them, the whole line is wrong |
| `severity` | `'error'`, or `'pending'` for the line that is being written |
| `message` | what is wrong, in a sentence that names the figure and the option |
| `error` | the error itself: a `ParseError`, or an `OptionError` for an option |

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(4,2)\ns=seg A,B->colr=red\nC(3,'})
const {errors, lines} = draw.report

errors.map(error => [error.line, error.severity]) // [ [ 3, 'error' ], [ 4, 'error' ] ]
errors[0].message // Unknown option "colr" for "s"
errors[0].from // 11
errors[0].to // 19
errors[1].from // undefined
lines.map(line => line.status).join(' ') // ok ok error error
Object.keys(draw.graph.figures).join(' ') // A B s
draw.errors === errors // true
```

The segment `s` is drawn, without the option that is wrong. The line `C(3,` is not a figure and draws nothing.

What counts as an error is listed with each figure (the *Mistakes* sections) and in [the syntax](./syntax#errors).

## While a line is being typed

A line is not valid at every keystroke: `B(4,` is not a point yet. If the drawing followed the text, the point would disappear and come back at each key, and so would everything that depends on it. The option `editing` is the number of the line that is being typed:

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(4,2)->color=red\ns=seg A,B'})

const report = draw.refresh('A(1,1)\nB(4,2)->colr=red\ns=seg A,B', {editing: 2})

report.errors[0].severity // pending
report.errors[0].line // 2
Object.keys(draw.graph.figures).join(' ') // A B s
draw.graph.figures.B.appearance.stroke.color // red
```

If the line that is being typed is not valid, **the figure it had in the last drawing is kept**, and the figures that depend on it are still built. Its problem is `'pending'`: an editor shows it quietly, or not at all, until the line is valid, or the cursor goes away. The same code without `editing` draws the line as far as it goes, and the problem is an `'error'`.

The figure is kept only if the line that is being typed is the **only one that is not the same** as in the last drawing: if another line changed too, or a line was added, removed or moved, it is not known which line the old figure belongs to.

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(4,2)'})

// A line was added: nothing is kept for the line that is being typed
draw.refresh('A(1,1)\nB(\nC(5,5)', {editing: 2}).errors[0].severity // pending
Object.keys(draw.graph.figures).join(' ') // A C
```

## Only what changed is drawn again

The lines at the start of the code that are the same as in the last drawing keep their figures (the same objects); the first line that changes, and the ones after it, are made again. Typing at the end of a long code is cheap: a code of 1200 figures is redrawn in a few milliseconds when the last line changes, instead of about two seconds.

### Points that were dragged

When the user dragged a point, its place is not in the code. When the line of the point is made again, the point is put back where it was left, **if its line is the same** and under the rules of its drag (a limit, a figure it follows). If the line changed, the code wins.

| Option | Description |
|---|---|
| `drag: 'keep'` | the default: the points are put back where they were left |
| `drag: 'reset'` | every point is put where its line says |

```ts
draw.refresh(code, {editing: line, drag: 'keep'})
```

## The parameters of the graph

The parameters are not lines of code: they have their own field, and their own problem. `refreshLayout` gives the error, or `null`, and `draw.layoutError` keeps it. The graph keeps the parameters it had.

```js
const draw = new PiDraw(container, {parameters: 'x=-4:4'})

draw.refreshLayout('x=-4:') !== null // true
draw.layoutError.severity // error
draw.refreshLayout('x=-5:5') // null
```

A `PiDraw` made with parameters that are not valid has the default graph, and `layoutError` says why.

## An editor with CodeMirror

The report maps to the diagnostics of CodeMirror: the line gives the start (`doc.line(line).from`), and `from` and `to` the part to underline. The line that has the cursor is `editing`.

```ts
import {linter, type Diagnostic} from '@codemirror/lint'

const pidrawLinter = linter((view) => {
    const {doc, selection} = view.state
    const report = draw.refresh(doc.toString(), {editing: doc.lineAt(selection.main.head).number})

    return report.errors.map((error): Diagnostic => {
        const line = doc.line(error.line)

        return {
            from: error.from === undefined ? line.from : line.from + error.from,
            to: error.to === undefined ? line.to : line.from + error.to,
            severity: error.severity === 'pending' ? 'info' : 'error',
            message: error.message
        }
    })
})
```

`report.lines` gives the state of each line, for a mark in the margin.
