# Slides

A drawing can be shown step by step, as the slides of a presentation: a point first, then the segment, then its middle. PiDraw uses the notation of the overlays of LaTeX Beamer: a figure says at which **steps** it is shown, and a program moves from a step to the next. The examples of this page are alive: the buttons under a drawing go from a step to another.

The steps are numbered from 1. A figure that says nothing is shown at every step. The code only says *when* a figure is shown; the program decides *which step* is shown, with a [`Slides`](./code#slides) made with the graph. Without a `Slides`, the steps mean nothing and every figure is shown.

## The steps of a figure: `slide`

```
slide=<steps>
```

The steps are written between chevrons, like in Beamer:

| Written | The figure is shown at |
|---|---|
| `<3>` | the step 3 only |
| `<2-4>` | the steps 2, 3 and 4 |
| `<-3>` | the steps 1, 2 and 3 |
| `<4->` | the step 4 and every step after it |
| `<2-4,6,8->` | the steps 2 to 4, then 6, then 8 and the following ones |

```pidraw params="x=-4:4,y=-3:5,axis,grid"
f(x)=x^2/4->blue,slide=<1-2>
g(x)=x/2->red,slide=<2->
A(2,1)->label,slide=<3>
```

The curve `f` is shown at the steps 1 and 2, the line `g` from the step 2, and the point `A` at the step 3 only. The drawing has three steps: the largest step that a figure names.

A figure that is not shown is still computed. What is built on it follows it, and a line through a point that comes later is drawn as soon as the line is shown. A figure hidden with [`hide`](./options#visibility) stays hidden at every step.

## One step later each time: `@pause`

A line `@pause` shows everything that follows it one step later than what is before it, as `\pause` does in Beamer. Each new `@pause` is one more step.

```
@pause
```

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,1)->label
@pause
B(5,3)->label
s=seg A,B->red
@pause
M=mid A,B->blue,label
```

`A` is always shown, `B` and the segment from the second step, and the middle `M` from the third. A line that has its own `slide` keeps it: it is stronger than the commands.

## The steps of the lines that follow: `@slides`

`@slides=<steps>` gives the same steps to every figure that follows it, up to the next command. A figure can still say its own.

```
@slides=<steps>
@slides
```

A line `@slides` alone gives back every step to what follows, and starts counting the `@pause` again from zero. It lets a drawing hold several parts that go step by step **together**: the steps are the same for the whole drawing.

```pidraw params="x=-6:6,y=-4:4,axis"
$ The first part
@slides
A(-4,-2)->label
@pause
B(-2,0)->label
@pause
C(-4,2)->label
$ The second part, which starts again from the first step
@slides
D(3,-2)->label
@pause
E(1,0)->label
F(3,2)->label,slide=<4>
```

`A` and `D` are shown at the first step, `B` and `E` at the second, `C` at the third and `F` at the fourth.

`@slides=<steps>` does not count the `@pause`: a `@pause` that follows it is the next one after those before it.

## The title of a step: `@pause=Title` and `@title`

A step can have a title, which a page shows next to the number of the step. A title is written in the code, **anywhere** in it, because it belongs to a step and not to a figure.

```
@pause=Title
@title,3=Title
```

`@pause=Title` is a `@pause` that names the step it opens. `@title,3=Title` names the step 3, wherever it is written: the first step, which no `@pause` opens, is named with `@title,1=`. The title is the text up to the end of the line, with the commas and the spaces inside it; the spaces around it are not part of it.

```pidraw params="x=-1:7,y=-1:5,axis"
@title,1=A point
A(1,1)->label
@pause=A second point and a segment
B(5,3)->label
s=seg A,B->red
@pause=The middle
M=mid A,B->blue,label
```

A title does not make a step: the steps are still the ones of the figures, so a title written for a step that no figure reaches is kept, and shown the day a figure reaches it. A step has one title: a second one for the same step is an error of its line. `@slides` does not forget the titles.

```pidraw params="x=-1:7,y=-1:5" errors="3,4,5,6"
A(1,1)
@pause=First
@pause=
@title,2=Again
@title,0=Zero
@title=Nothing
```

| Line | What is wrong |
|---|---|
| 3 | the title is empty |
| 4 | the step 2 has the title "First" already |
| 5 | the steps start at 1 |
| 6 | `@title` needs its step: `@title,3=Title` |

## Mistakes

```pidraw params="x=-1:7,y=-1:5" errors="2,3,4,5,6,7,8"
A(1,1)
B(2,2)->slide=3
C(3,3)->slide=<0>
D(4,4)->slide
E(5,5)->slide=<2>/tl
@play
@pause now
@slides=2
```

| Line | What is wrong |
|---|---|
| 2 | the steps need chevrons: `<3>` |
| 3 | the steps start at 1 |
| 4 | `slide` needs its steps |
| 5 | nothing follows the steps with a `/` |
| 6 | the only commands are `@pause`, `@slides` and `@title` |
| 7 | a title comes after a `=`: `@pause=Title` |
| 8 | `@slides` takes its steps between chevrons, or nothing at all |

A line in error does not change the steps of the lines after it.

## From a program

```js
const draw = new PiDraw(container, {code: 'A(1,1)\n@pause\nB(2,2)\n@pause\nC(3,3)'})
const slides = new Slides(draw.graph)

slides.count // 3
slides.current // 1
slides.next()
slides.current // 2
slides.last()
slides.current // 3
```

The methods and the events of `Slides` are described in [using it from code](./code#slides), and the page of [the controls](../controls) shows buttons that act on one.

## In TikZ

The TikZ that [`graph.tikz()`](./tikz) writes is the drawing as it is shown: only the figures of the step that is shown are in it.
