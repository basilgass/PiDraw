# Dragging and animation

Two options make a drawing move: `drag` lets the user move a point with the mouse, and `animate` moves a point along a segment by itself. In both cases the figures that depend on the point are drawn again, so a whole construction follows. The examples of this page are alive: the buttons under a drawing play the animation and put the points back.

## Drag a point

```
A(1,2)->drag
A(1,2)->drag=grid
A(1,2)->drag=Ox
A(1,2)->drag=Oy
A(1,2)->drag=-2:3
A(1,2)->drag=grid/Ox
```

The option `drag` is only for points. Other figures are an error. A point that can be dragged has a large pale disc on it, which the mouse takes: it is easy to catch a small point, and a point that is hidden can be dragged too.

```pidraw params="x=-1:9,y=-1:6,axis,grid"
A(1,1)->drag,label
B(6,2)->drag,label
C(3,5)->drag,label
t=poly A,B,C->fill=lightblue/0.4
```

### Limits

An option `drag` can have limits, written after `=`. The limits go together, separated by slashes (`drag=grid/Ox`), and they apply in this order: `Ox` or `Oy`, then the grid, then the domain, then the figures that the point follows. The point always stays in the drawing.

| Value | The point |
|---|---|
| `grid` | is put on the lines of the grid: its step if the graph shows a grid, one unit otherwise, counting from the origin. When the grid has a `subgrid`, the point is put on the lines of the subgrid |
| `Ox` | moves parallel to the x axis: it keeps its height |
| `Oy` | moves parallel to the y axis: it keeps its abscissa |
| `min:max` | stays between two abscissas. `min:max:y` is for the ordinates |
| `<figure>` | is held on a figure (a plot, a line, a circle...): it follows it |

Two domains on the same axis keep the part that they share.

```pidraw params="x=-1:9,y=-1:7,axis,grid"
A(1,1)->drag=grid,label
B(1,3)->drag=Ox,label
C(1,5)->drag=2:7,label
D(8,1)->drag=Oy,label
E(5,6)->drag=grid/Oy/0:4:y,label
```

With a `subgrid`, the point stops on every line of the grid, the thin ones too:

```pidraw params="x=-1:9,y=-1:7,axis,grid->subgrid=4"
A(1.5,1.25)->drag=grid,label
```

### Along a figure

`drag=f` holds the point on the figure `f`. It is how to make a point that moves along a curve, a line or a circle.

```pidraw params="x=-4:4,y=-1:5,axis"
f(x)=x^2/2->blue
A(1,1)->drag=f,red,label
B=proj A,Ox->label
s=seg A,B->dash
```

```pidraw params="x=-5:5,y=-4:4,axis"
O(0,0)
c=circ O,3->blue
P(3,0)->drag=c,red,label
H=proj P,Ox->label
s=seg P,H->dash
```

### What the rules do

The limits are the rules of the drag. From code, [`graph.dragTo`](./code#drag-from-code) puts a point where the mouse would have put it, under the same rules. This is how the page checks them:

```js
const draw = new PiDraw(container, {
    parameters: 'x=-5:5,y=-5:5',
    code: 'A(1,2)->drag=grid\nB(1,2)->drag=Ox\nC(1,2)->drag=-2:3/0:4:y\nf(x)=x^2/4\nD(1,2)->drag=f'
})
const {graph} = draw
const {A, B, C, D} = graph.figures

// where a point is, in units of the graph, to two decimals
const at = point => Object.values(graph.toCoordinates(point.pixels)).map(value => +value.toFixed(2))

graph.dragTo(A, graph.toPixels({x: 2.4, y: 3.6}))
at(A) // [ 2, 4 ]

graph.dragTo(B, graph.toPixels({x: -3, y: 4}))
at(B) // [ -3, 2 ]

graph.dragTo(C, graph.toPixels({x: 4.5, y: 4.5}))
at(C) // [ 3, 4 ]

graph.dragTo(D, graph.toPixels({x: 2, y: 4}))
at(D) // [ 2, 1 ]
```

### Mistakes

```pidraw params="x=-1:6,y=-1:4" errors="2,3"
A(1,1)->drag
s=seg A,A->drag
B(2,1)->drag=x
```

The second line is an error: only a point can be dragged. So is a limit that means nothing (`drag=x`, line 3): it is none of `grid`, `Ox`, `Oy`, an interval or the name of a figure.

## Animate a point

```
P(1,1)->animate,from=A,to=B
P(1,1)->animate,from=A,to=B,duration=4,delay=1,easing=inOut,loop=reverse
```

`animate` moves a point from the point `from` to the point `to`, and the figures built on it follow. For now only points can be animated. The animation is started by the program (see [`Animate`](./code#animation)); the buttons under the examples of this page do it.

| Option | Description |
|---|---|
| `animate` | the point is animated. It needs `from` and `to` |
| `from=A`, `to=B` | the names of two points of the drawing: where the point starts and where it ends |
| `duration=4` | the duration in seconds, a number greater than 0 (2 by default) |
| `delay=1` | how long to wait before it starts, in seconds, 0 or more (0 by default) |
| `easing=linear`, `easing=inOut` | how it speeds up: at a constant speed (the default), or slowly at the start and at the end |
| `loop`, `loop=reset`, `loop=reverse` | what happens at the end: the point starts again from the beginning (`loop` and `loop=reset`), goes back (`reverse`), or stays at the end (`none`, the default) |

```pidraw params="x=-1:9,y=-1:6,axis"
A(1,1)->label
B(7,4)->label
s=seg A,B->dash
P(1,1)->animate,from=A,to=B,duration=3,easing=inOut,loop=reverse,red
M=mid A,P->blue,label
```

```pidraw params="x=-4:4,y=-4:4,axis"
O(0,0)
A(3,0)
B(0,3)
C(-3,0)
P(3,0)->animate,from=A,to=B,duration=2,red
Q(0,3)->animate,from=B,to=C,duration=2,delay=2,blue
```

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(5,3)\nP(1,1)->animate,from=A,to=B,duration=4,delay=1,easing=inOut,loop=reverse\nQ(1,2)->animate,from=A,to=B,loop'})
const {P, Q} = draw.graph.figures

P.controls.animate.duration // 4
P.controls.animate.delay // 1
P.controls.animate.easing // inOut
P.controls.animate.loop // reverse
Q.controls.animate.duration // 2
Q.controls.animate.loop // reset
new Animate(draw.graph).canBeAnimated() // true
```

### Mistakes

```pidraw params="x=-1:6,y=-1:4" errors="3,4,5,6,7,8,9,10,11"
A(1,1)
B(4,2)
P(1,2)->animate
Q(1,3)->animate,from=A
R(1,3)->animate,from=A,to=Z
S(1,3)->animate,from=A,to=B,duration=0
T(1,3)->animate,from=A,to=B,delay=-1
U(1,3)->from=A
s=seg A,B->animate,from=A,to=B
V(1,3)->animate,from=A,to=B,easing=slow
W(1,3)->animate,from=A,to=B,loop=again
```

| Line | What is wrong |
|---|---|
| 3, 4 | an animation needs a start and an end point, `from` and `to` |
| 5 | `Z` is not a point of the drawing |
| 6 | a duration is greater than 0 |
| 7 | a delay is 0 or more |
| 8 | `from` is part of an animation: it needs `animate` |
| 9 | only a point can be animated |
| 10 | `easing` is `linear` or `inOut` |
| 11 | `loop` is written alone, or `loop=reset`, `loop=reverse` or `loop=none` |
