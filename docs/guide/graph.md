# The graph

The parameters of the graph say what the drawing shows: the part of the plane, the size of a unit, the axes, the grid, and the defaults of the figures. They are the `parameters` field of `PiDraw`, and what `refreshLayout` reads. They are separated by commas, and all of them are optional.

```pidraw params="x=-4:4,y=-3:3,axis,grid"
A(1,2)->label
B(-2,-1)->label
```

| Parameter | What it sets |
|---|---|
| [`x`, `y`, `box`](#the-window) | the part of the plane that is drawn |
| [`unitX`, `unitY`](#the-size-of-a-unit) | the length of a unit |
| [`unit`, `scale`](#the-unit-of-the-lengths) | the unit and the scale of the lengths that the labels write |
| [`axis`, `axisX`, `axisY`, `axisXname`, `axisYname`](#axes) | the axes |
| [`grid`, `gridX`, `gridY`](#grid) | the grid |
| [`default.label`, `default.tex`, `default.points`](#defaults-of-the-figures) | what the figures have by default |

## The window

| Parameter | Description |
|---|---|
| `x=min:max`, `y=min:max` | the part of the plane that is drawn, in units (`-8:8` by default). A bound can be written with `pi`: `x=-2pi:2pi` |
| `x=6`, `y=4` | for `x=-6:6`, `y=-4:4` |
| `box=5` | for `x=-5:5,y=-5:5` |
| `box=8;6` | for `x=-8:8,y=-6:6` |
| `box=-3:7` | the same interval for both axes |

`x` and `y` are more precise than `box`: they set what `box` leaves.

```pidraw params="x=-2pi:2pi,y=-1.5:1.5,axis"
f(x)=sin(x)->red
g(x)=cos(x)->blue
```

```pidraw params="box=8;6,axis"
A(5,4)->label
B(-5,-3)->label
```

```pidraw params="box=-3:7,y=-1:3,axis,grid"
A(6,2)->label
```

When the origin is outside the window (`x=2:10`), the axis that would be outside is drawn at the nearest edge, with its numbers toward the inside. The ticks are still the ones of the plane (`2`, `3`, `4`...). This is done for orthogonal axes only.

```pidraw params="x=2:10,y=-3:3,axis"
A(5,1)->label
```

## The size of a unit

| Parameter | Description |
|---|---|
| `unitX=2`, `unitY=3` | the length of a unit of each axis, **in centimeters** (1 by default). `unitX` alone is the unit of both axes, `unitY` alone leaves `unitX` at 1 |

The drawing has its **real size**: `dx × unitX` centimeters wide and `dy × unitY` centimeters high, where `dx` and `dy` are the lengths of the two intervals. It does not depend on the page. It is shown at that size, or reduced to the width of the page when it is wider. The window can change without a unit, the width of a stroke or the size of a point changing. In the TikZ export, a unit is exactly `unitX` centimeters.

```js
const draw = new PiDraw(container, {parameters: 'x=-5:5,y=-2:2'})

// 1 cm is about 37.9 pixels (a pixel is 0.75 point of TeX): the window is 10 cm wide and 4 cm high
Math.round(draw.graph.config.width) // 379
Math.round(draw.graph.config.height) // 152
```

```pidraw params="x=-3:3,y=-2:2,unitX=1.2,unitY=0.8,axis,grid"
A(2,1)->label
```

## The unit of the lengths

| Parameter | Description |
|---|---|
| `unit=mm` | the symbol written after the lengths and the areas of the labels: `pm`, `nm`, `µm`, `mm`, `cm`, `dm`, `m`, `dam`, `hm`, `km`, or `u` for a unit that is not a real length. None by default: the lengths are written without a unit |
| `scale=10`, `scale=1/10` | how long the lengths of the labels are compared with the units of the graph: a length is multiplied by `scale`, an area by its square (1 by default) |

They change nothing of the drawing, of the axes or of the coordinates of the points: they are for the values that a [label shows](./options#values-in-a-label) (`@length`, `@radius`, `@perimeter`, `@area`). A unit does not give a scale, and a scale does not give a unit: `scale=1/10` alone corrects a circle drawn with a radius of 10 units, and `unit=mm` alone writes the lengths as they are, in millimeters. An angle always has its degree sign, and a slope or the coordinates of a point have no unit.

The area under a curve (`fill`, `riemann`) has no unit: the vertical axis of a function is not always a length.

```pidraw params="x=-1:6,y=-1:5,unit=cm"
A(0,0)
B(4,3)
s=seg A,B->label=@
c=circ A,2->label=@radius
```

```js
const draw = new PiDraw(container, {
    code: 'O(0,0)\nc=circ O,2->label=@radius\nA(1,1)\nB(4,1)\nC(1,4)\na=arc B,A,C->label=@',
    parameters: 'unit=mm,scale=10'
})
const {c, a} = draw.graph.figures

c.label.displayName // 20 mm
a.label.displayName // 90°
```

With `scale=10`, a unit of the graph is worth 10 millimeters: the lengths are multiplied by 10 and the areas by 100.

```pidraw params="x=-1:6,y=-1:5,unit=mm,scale=10"
A(0,0)
B(4,0)
C(4,3)
s=seg A,C->label=@
p=poly A,B,C->label=@area,fill=orange/0.3
```

## Axes

The axes of the graph are called `Ox` and `Oy`. They are lines like the others, shown or not, and any figure can be built on them (`P=inter d,Ox`, `H=proj A,Oy`, `p=perp Ox,A`, `c=circ O,Ox`, `b=bis Ox,d`). These two names are reserved: a figure cannot have them.

| Parameter | Description |
|---|---|
| `axis` | shows the axes `Ox` and `Oy`, with an arrow at their end, 20 pixels from the edges. Without it they exist but are not drawn |
| `axisX`, `axisY` | shows only this axis |
| `axis=1`, `axis=0.5`, `axis=pi`, `axis=pi/3` | graduates the axes: a tick and a number every `step` units, from 0. With a step in π, the x axis writes fractions of π (`π/2`, `3π/2`, `-π`) and the y axis keeps a step of 1. `axisX=...` and `axisY=...` set one axis |
| `axisXname=x`, `axisYname=y` | the name written at the end of the axis, on the side without numbers. The axis is shown |

```pidraw params="x=-4:4,y=-3:3,axisX,axisYname=y"
A(1,1)->label
```

```pidraw params="x=-5:5,y=-3:3,axis=0.5"
A(1,1)->label
```

```pidraw params="x=-2pi:2pi,y=-2:2,axis=pi/2,grid=pi/2"
f(x)=sin(x)->red
```

```pidraw params="x=-4:4,y=-3:3,axisX=pi,axisY,axisXname=x"
A(1,1)
```

The numbers of the x axis are under the axis, the ones of the y axis on its left, without the 0 (it is where the axes cross). Ticks that are less than 4 pixels apart are not drawn, and when they are less than 36 pixels apart, a number every two, three... is written, so that they do not touch. No tick is drawn against the arrow. The numbers and the name have the color of the axis.

### The options of an axis

An entry of the graph that draws something (`axis`, `axisX`, `axisY`, `axisXname`, `axisYname`, `grid`, `gridX`, `gridY`) can have options after `->`, the same as the ones of a figure: color, width, dashes... The commas that follow are the ones of its options, **up to a double comma `,,`** (or to the end):

```pidraw params="x=-4:4,y=-3:3,axis->red,thick,,grid=2->gray,,unitX=0.9"
A(1,1)
```

Here `axis` has the options `red` and `thick`, `grid=2` has `gray`, and `unitX=0.9` is an entry. The options of `axis` are given to both axes, the ones of `axisX` or `axisY` are added to its own for one axis.

Four options are for the graduation and the extent of an axis: `ticks`, `numbers`, `padding` and `range`. They are the ones of the graduated line [`axis`](./grids-axes#axis-a-graduated-line), and so are `name` and `side`.

```pidraw params="x=-6:6,axis->ticks=first"
A(2,1)
```

```pidraw params="x=-20:20,axis=1->numbers=5/first,,grid"
A(10,1)
```

```pidraw params="x=-6:6,axisX=pi/2->numbers=2,,axisY->ticks=first"
A(2,1)
```

`range` limits the part of an axis that is drawn, in units from its zero: `range=-2:3` draws the axis from -2 to 3, and `range=3` is `-3:3`. The arrow is at the end of the range. The axis is also cut by the window and by `padding`. The range is written after `->`, and the `,,` ends the options, so that the next entry (`axisX` here) is not one of them:

```pidraw params="x=-6:6,y=-4:4,axisY->range=-2:3,,axisX"
A(2,1)
```

## Grid

| Parameter | Description |
|---|---|
| `grid` | the grid: one line per unit on each axis |
| `grid=0.5` | a step of 0.5 on both axes |
| `grid=pi`, `grid=2pi`, `grid=pi/3` | a step of π/2, 2π/2, π/3 on the x axis (the denominator is the parameter, 2 by default), and of 1 on the y axis |
| `gridX=2`, `gridY=0.5` | the step of one axis. The other one keeps the value of `grid`, or 1 |

Lines of a grid that would be less than 3 pixels apart are not drawn: a grid that is too fine for the scale.

```pidraw params="x=-4:4,y=-3:3,grid=0.5"
A(1,1)
```

```pidraw params="x=-4:4,y=-3:3,gridX=2,gridY=0.5,axis"
A(1,1)
```

The option of the grid is `subgrid`: each step is cut in 2 parts (`subgrid`), or in `n` (`subgrid=4`, an integer from 2 to 20), with lines of the same color, twice as light.

```pidraw params="x=-2pi:2pi,y=-2:2,axis,grid=pi/2->subgrid=3"
f(x)=sin(x)->red
```

## Defaults of the figures

| Parameter | Description |
|---|---|
| `default.label` | the points have a label: their name |
| `default.tex` | the labels of the points are written in TeX |
| `default.points=no` | the points are not drawn |
| `default.points=o`, `s`, `*`, `o/12` | the shape of the points (circle, square, crosshair) and their size |

A label or a shape that a point asks for itself wins.

```pidraw params="x=-1:6,y=-1:4,default.label,default.points=s/8"
A(1,1)
B(3,2)
C(5,1)->o=10
```

```pidraw params="x=-1:6,y=-1:4,default.tex"
A(1,1)
B(3,2)
C(5,1)->label=C_1
```

```pidraw params="x=-1:6,y=-1:4,default.points=no"
A(1,1)
B(3,2)
s=seg A,B
```

```pidraw params="x=-1:6,y=-1:4,default.points=*"
A(1,1)
B(3,2)
```

## Mistakes

A parameter that does not exist, or that does not exist any more, and a value that is not of the expected form, are an error. The graph then keeps the parameters it had, and the error is in `layoutError`. The message says what replaces a name that was removed.

```js
const draw = new PiDraw(container, {parameters: 'ppu=3'})

draw.layoutError.message // The parameter "ppu" does not exist any more: use unitX and unitY, the length of a unit in cm (unitX=1.5)
draw.refreshLayout('label').message // The parameter "label" does not exist any more: use default.label
draw.refreshLayout('x=abc').message // Cannot read the parameter "x": "abc" is not a number, or an expression of numbers like 2pi
draw.refreshLayout('x=-4:4,axis') // null
draw.layoutError // null
```
