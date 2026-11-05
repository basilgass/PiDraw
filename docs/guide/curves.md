# Functions and curves

| Key | Makes |
|---|---|
| [`plot`](#plot-a-function) | the graph of a function `f(x)`, or the parabola through three points |
| [`parametric`](#parametric-a-parametric-curve) | a curve `(x(t), y(t))` |
| [`bezier`](#bezier-a-bezier-curve) | a smooth curve through points, or a curve pulled by control points |
| [`follow`](#follow-a-point-that-follows-a-curve) | a point that follows the mouse along a figure, with its tangent |
| [`fill`](#fill-an-area-between-curves) | the area between two functions, or between a function and the x axis |
| [`riemann`](#riemann-a-riemann-sum) | the rectangles of a Riemann sum |

## `plot`: a function

```
f(x)=<expression>
f(x)=<expression>@samples,domain,image
f=plot <expression>,@samples,domain,image
f=plot A,B,C
```

The expression is read as it is written, with `x` as its only variable. The functions are `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `abs`, `ln`, `log` and `nthrt`, and the constants are `pi` and `e`.

```pidraw params="x=-4:4,y=-3:5,axis,grid"
f(x)=x^2/2-1->red
g(x)=sin(2x)+1->blue
h(x)=sqrt(x+4)->green
k(x)=abs(x)-2->dash
```

After the expression, in any order, come at most one number and two intervals. All of them are optional:

| Value | Description |
|---|---|
| `@50` | the number of samples **per unit of x** to start from. By default one every 8 pixels. The curve is then refined where it bends, so a line has only its two ends |
| `min:max` (first) | the domain: the values of `x` that are drawn. By default what is visible |
| `min:max` (second) | the image: the values of `y` that are drawn. The curve is cut outside |

The bounds of an interval are numbers or expressions of numbers: `-1.5:2.5`, `-2pi:2pi`, `.5pi:pi`, `0:3pi/2`, `-2e:e`. A variable is refused. The number of samples is glued to the end of a value (`sin(x)@50`, `-pi:pi@50`) or alone (`,@50`).

```pidraw params="x=-7:7,y=-3:3,axis"
f(x)=sin(x)@50,-2pi:2pi->red
g(x)=x^3/6,-3:3,-2:2->blue
h=plot cos(x),@80,-pi:pi->green
```

The curve is never more than half a pixel away from the real one, with far fewer points than one per pixel: a line has two, a sine about a hundred. It is cut where the function does not exist, and at the asymptotes.

```pidraw params="x=-5:5,y=-4:4,axis"
f(x)=tan(x)->red
g(x)=1/x->blue
h(x)=ln(x)->green
```

### The parabola through three points

`f=plot A,B,C` is the parabola through three points (a line if they are aligned). It follows the points when they move. If two points have the same abscissa there is no parabola, and nothing is drawn.

```pidraw params="x=-2:8,y=-2:6,axis"
A(0,0)->drag,label
B(3,3)->drag,label
C(6,0)->drag,label
f=plot A,B,C->red
```

A label of a curve is at its visible end, on the free side: under a curve that goes up, above one that goes down. A position that you give (`label=f/tl`) is kept.

## `parametric`: a parametric curve

```
f(t)=<x(t)>,<y(t)>
f(t)=<x(t)>,<y(t)>,domain@samples
f=parametric <x(t)>,<y(t)>,domain,@samples
```

The curve is the point `(x(t), y(t))` when `t` goes over the domain. The expressions are written with `t` as their only variable.

| Value | Description |
|---|---|
| `min:max` | the domain of `t`, **`0:2pi`** by default. The bounds are numbers or expressions of numbers: `-1.5:2.5`, `0:2pi`, `-pi:pi`, `.5pi:2pi` |
| `@50` | the number of samples **per unit of `t`** to start from. By default at least 64 intervals, or one every 8 pixels of the extent. The curve is refined where it bends |

The domain and the number of samples go in any order.

```pidraw params="x=-5:5,y=-3:3,axis"
c(t)=cos(t),sin(t)->red
e(t)=2cos(t),sin(t),0:2pi@80->blue
s(t)=t^2/4,sin(t),-2pi:2pi->green
```

## `bezier`: a Bézier curve

```
b=bezier A,B,C,D
b=bezier A,B/H,C/V/0.4,D
b=bezier A,B,C,D,*
b=bezier A,B,C,D->close
```

With points only, the curve is smooth and goes **through** all of them, two at least.

After the name of a point, `/direction` then `/ratio` set how the curve goes through it. Both are optional.

| Direction | Description |
|---|---|
| `S` (or none) | Smooth, the default: the curve follows the line between the neighbours of the point |
| `H` | Horizontal. The way (left or right) is the one that goes to the neighbours |
| `V` | Vertical. The way (up or down) is the one that goes to the neighbours |
| a number | An angle in degrees, counter-clockwise as seen on the screen (`45`, `-30`, `90` is up). The curve goes through the point exactly in that direction |

The `ratio` is a number greater than 0: how far the control points are from the point, as a part of the distance between its two neighbours (0.2 by default).

```pidraw params="x=-1:9,y=-1:6,axis"
A(0,0)->label
B(2,4)->label
C(5,1)->label
D(8,5)->label
b=bezier A,B,C,D->red
c=bezier A,B/H,C/V/0.4,D->blue
d=bezier A,B/90,C/-45/0.3,D->green
```

### Control points

A last `*` gives the curve of drawing software: it starts at the first point, ends at the last one, and does **not** go through the others, which are its handles. Only 3 points (a quadratic curve) or 4 (a cubic one) are accepted, with no direction or ratio.

```pidraw params="x=-1:9,y=-1:6,axis"
A(0,0)->label
B(3,5)->label
C(6,5)->label
D(8,0)->label
s=bezier A,B,C,*->red
t=bezier A,B,C,D,*->blue
```

The option `close` closes a smooth curve: the last curve joins the first point, smoothly there too. It needs at least 3 points, and it does not exist with control points.

```pidraw params="x=-1:9,y=-1:6,axis"
A(1,1)
B(4,5)
C(7,3)
D(5,0)
b=bezier A,B,C,D->close,fill=teal/0.3
```

A curve with a point that has no position is not drawn. The label is at the middle of the curve, on the left of the way it goes. A position that you give is kept.

## `follow`: a point that follows a curve

```
t=follow f
t=follow f,A
t=follow f,*
t=follow f,A,*
```

An interactive point that follows the mouse along a figure: a line (a segment, a ray), a circle, an arc, a polygon (its outline), a Bézier curve, a function or a parametric curve. At the end of an arc the point stops. A last `*` draws the tangent of the figure at that point as well; without it there is only the point.

Before the mouse moves, the point is where the figure is closest to the point `A`, if it is given, to the origin otherwise. When the figure does not exist where the mouse is, the point and the tangent disappear. The point stays on the figure when it changes. A fill color (`fill=red`) colors the point, a color (`color=red`) the tangent.

```pidraw params="x=-4:4,y=-1:6,axis"
f(x)=x^2/2->blue
t=follow f,*->red,fill=red
```

Move the mouse over the drawing. Without `*` there is only the point, and it starts at the origin of the graph unless a point is given.

```pidraw params="x=-4:4,y=-1:6,axis"
f(x)=x^2/2->blue
A(2,2)
t=follow f
u=follow f,A,*->green,fill=green
```

```pidraw params="x=-4:4,y=-4:4,axis"
A(2,2)
c=circ A,Ox
f(x)=x^3/4
t=follow f,A->fill=green
u=follow c,*
```

The label of the point is next to it, on the left of the way the figure goes. A position that you give is kept.

## `fill`: an area between curves

```
z=fill f
z=fill f,g
z=fill f,domain
z=fill f,g,domain
```

The area between two functions, or between a function and the x axis if `g` is missing. The domain is an interval `min:max` whose bounds can be written with `pi` (`0:2pi`). By default it is the domain of the functions (where all of them are drawn), and if they have none, what you see. Functions that have no abscissa in common are an error.

The area is cut where a function does not exist or has an asymptote, and where the two curves cross, both sides are filled. It follows the functions when they change. The label can show the area (`@`, 2 decimals by default) and it is at the middle of the area.

```pidraw params="x=-3:4,y=-1:7,axis"
f(x)=x^2->red
g(x)=x+2->blue
z=fill f,g,-1:2->fill=lightblue/0.5
```

```pidraw params="x=-1:7,y=-1:5,axis"
f(x)=sqrt(x)
w=fill f,0:5->fill=green/0.3,label=@
```

Without a domain, the area is the one of the visible part:

```pidraw params="x=-3:3,y=-1:5,axis"
f(x)=x^2/2
z=fill f->fill=orange/0.3
```

## `riemann`: a Riemann sum

```
r=riemann f
r=riemann f,domain
r=riemann f,domain,n
r=riemann f,domain,n,position
r=riemann f,n,position
```

| Value | Description |
|---|---|
| `f` | a function (`plot`) |
| `domain` | an interval `min:max`, whose bounds can be written with `pi`. By default the domain of `f`, which must then have one (`f(x)=x^2@50,0:4`): otherwise it is an error |
| `n` | the number of rectangles, an integer from 1 to 1000 (5 by default) |
| `position` | where `f` is read in each interval: `0` (left, the default) to `1` (right), `0.5` is the middle |

The rectangles go from the x axis to the curve; the ones of a negative function are under the axis. Where `f` is not defined there is no rectangle. The sum is computed again when `f` changes. The label can show the sum (`@`, 2 decimals by default) and the number of rectangles.

```pidraw params="x=-1:5,y=-1:17,axis"
f(x)=x^2@50,0:4->blue
r=riemann f,0:4,10,0.5->fill=green/0.4
```

```pidraw params="x=-1:5,y=-1:17,axis"
f(x)=x^2->blue
l=riemann f,0:4,8->fill=red/0.3,label=@
s=riemann f,0:4,8,1->fill=green/0.3
```

The domain and the number of rectangles can be left out, and the number of rectangles can come before the position. Without a domain, `f` needs one of its own:

```pidraw params="x=-1:5,y=-1:17,axis"
f(x)=x^2@50,0:4->blue
r=riemann f->fill=red/0.3
s=riemann f,0:2->fill=green/0.3
t=riemann f,12,1->fill=orange/0.3
```

## Mistakes

```pidraw params="x=-1:7,y=-1:5,axis" errors="4,5,6,7,8,10,11,12,13,14,17"
A(1,1)
B(3,3)
C(5,1)
a=plot
b=plot x^2,1,2,3
c=plot A,B
d=bezier A,B,*
e=bezier A,B->close
f(x)=x^2
g=bezier A,B,C,*->close
h=riemann f,0:4,0
i=riemann f
j=riemann A
k=fill f,A
p(x)=x@10,0:1
q(x)=x@10,5:6
z=fill p,q
```

| Line | What is wrong |
|---|---|
| 4 | `plot` wants an expression or three points |
| 5 | at most one number and two intervals after the expression |
| 6 | two points are not enough for a parabola |
| 7 | control points are 3 or 4 |
| 8 | `close` wants 3 points at least |
| 10 | `close` does not exist with control points |
| 11 | a Riemann sum has 1 rectangle at least |
| 12 | `f` has no domain of its own: write the domain in the line |
| 13 | `riemann` wants a function: `A` is a point |
| 14 | `fill` wants functions: `A` is a point |
| 17 | the functions `p` and `q` have no abscissa in common |
