# Grids and graduated lines

These two figures are written in the code like the others, but they have **no effect on the graph**: its own axes and its own grid are set by the [parameters of the graph](./graph#axes) (`axis`, `grid`). The figures here are extra ones: a grid on a part of the plane, a graduated line that is not an axis.

| Key | Makes |
|---|---|
| [`grid`](#grid-a-grid) | a grid, on the whole window or on a part of it |
| [`axis`](#axis-a-graduated-line) | a line with an arrow, graduated like an axis |

## `grid`: a grid

```
g=grid
g=grid 0.5
g=grid 0:5,0:3
g=grid -2pi:2pi,-1:1,pi/2
g=grid 0:5,0:3,0.5;1
```

| Value | Description |
|---|---|
| `x,y` | two intervals `min:max` (the bounds can be written with `pi`): the part that has the grid. Without them, the whole window |
| step | a number (both axes), a number of π (`pi/3`; `pi` is π/2; for the x axis, the y axis keeps 1) or a vector `sx;sy`. 1 by default |

```pidraw params="x=-1:7,y=-1:5"
a=grid 0:5,0:3->color=gray
b=grid 5.5:6.5,3.5:4.5,0.25->red
```

Without values, the grid covers the whole window, with a step of 1. A number alone is the step of both axes:

```pidraw params="x=-3:3,y=-2:2"
a=grid->gray
b=grid 0.5->red
```

The lines of a part are at the multiples of the step, so they line up with the grid of the graph, and **on the edges of the part**, which make a frame. Lines that are less than 3 pixels apart are not drawn. The grid is under all the figures.

```pidraw params="x=-4:4,y=-3:3,axis"
g=grid -2:2,-2:2,0.5->color=gray
```

The step can be a vector, one step for each axis:

```pidraw params="x=-1:7,y=-1:5,axis"
g=grid 0:6,0:4,2;1->gray
```

A step in π gives the grid of a trigonometric plot:

```pidraw params="x=-7:7,y=-2:2,axis"
g=grid -2pi:2pi,-1:1,pi/2->gray
f(x)=sin(x)->red
```

### Subdivisions

The option `subgrid` cuts each step in 2 parts, or in `n` with `subgrid=n` (an integer from 2 to 20), with lines of the same color, twice as light.

```pidraw params="x=-1:7,y=-1:5"
g=grid 0:6,0:4->subgrid=4,color=gray
```

## `axis`: a graduated line

```
a=axis A,B
a=axis A,B,0.5
a=axis A,B,pi/2
```

The line goes through `A`, which is its zero, and `B`, which is its unit. It has an arrow at its end, and a tick with its number at each step, on both sides of the zero (the 0 is written). The numbers are on the right of the line seen in the direction from `A` to `B` (under a line that goes to the right). The step is a number, or a number of π (`pi/3`; `pi` is π/2).

```pidraw params="x=-1:9,y=-3:4"
A(0,0)
B(1,0)
a=axis A,B
```

```pidraw params="x=-1:9,y=-1:5"
A(0,3)
B(2,3)
C(0,0)
D(1,1)
a=axis A,B,0.5->red
b=axis C,D->blue
```

With a step in π, the numbers are fractions of π.

```pidraw params="x=-1:8,y=-1:2"
A(0,0)
B(1,0)
a=axis A,B,pi/2->green
```

### Options

The colors, the width and the dashes are the common options, and the numbers and the name have the color of the line. Five more options set the graduation:

| Option | Description |
|---|---|
| `ticks=n`, `ticks=first`, `ticks=n/first` | which ticks are drawn: the multiples of `n` (the index is 0 at the zero, 1 at the first tick), the first one only, or both |
| `numbers=n`, `numbers=first`, `numbers=n/first`, `numbers=none` | on which ticks a number is written (all the ticks stay drawn); `none` writes no number |
| `name=t` | the name written at the end of the arrow, on the side without numbers |
| `side=left` | the numbers are on the other side (`right`: under a line that goes to the right) |
| `padding=40` | the distance to the edges of the window, in pixels (20 by default) |

A selection without a step graduates the line with a step of 1. Without `numbers`, the numbers are thinned out when they would touch, and a selection that you write is taken as it is.

```pidraw params="x=-1:11,y=-1:9"
A(0,0)
B(1,0)
C(0,2)
D(1,2)
E(0,4)
F(1,4)
G(0,6)
H(1,6)
a=axis A,B->ticks=first
b=axis C,D->numbers=5/first,red
c=axis E,F->ticks=2,name=t,blue
d=axis G,H->side=left,padding=40,green
```

```pidraw params="x=-1:9,y=-1:3"
A(0,0)
B(1,0)
a=axis A,B->numbers=none
```

## Mistakes

```pidraw params="x=-1:7,y=-1:5" errors="3,4,5,6,7,8"
A(0,0)
B(1,0)
g=grid 0:5
h=grid 0:5,0:3,x
a=axis A
b=axis A,B,x
c=axis A,B->ticks=x
d=axis A,B->side=up
```

| Line | What is wrong |
|---|---|
| 3 | an interval needs the other one |
| 4 | the step is a number, a number of π or a vector |
| 5 | an axis wants two points |
| 6 | the step is a number or a number of π |
| 7 | `ticks` takes a number, `first`, or both |
| 8 | `side` is `left` or `right` |
