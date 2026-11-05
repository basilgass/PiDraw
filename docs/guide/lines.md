# Lines

A line is a straight figure. `line` is infinite, `seg` stops at its two points, `ray` starts at the first and goes through the second, `vec` is a segment with an arrow. `perp`, `para`, `med`, `tan` and `bis` build a line from other figures.

| Key | Makes |
|---|---|
| [`line`](#line-a-line) | a line through two points, through a point with a slope, or from its equation |
| [`seg`](#seg-a-segment) | the segment between two points |
| [`ray`](#ray-a-ray) | the ray from a point through another |
| [`vec`](#vec-a-vector) | the vector from a point to another |
| [`perp`](#perp-a-perpendicular) | the perpendicular to a line through a point |
| [`para`](#para-a-parallel) | the parallel to a line through a point |
| [`med`](#med-a-perpendicular-bisector) | the perpendicular bisector of two points |
| [`tan`](#tan-a-tangent) | the tangent to a function |
| [`bis`](#bis-a-bisector) | a bisector of two lines, or of an angle |

A line whose values do not suit its key (the number of values, the kind of figure: `seg` wants two points, `perp` a line and a point) is an error that names the line.

The shorthands `d=AB`, `d=AB.`, `d=[AB]`, `d=AB[`, `d=[AB[`, `d=[AB` and `d=vAB` take exactly two names of points, each a capital letter followed by digits (`A`, `B1`, `d=A1B2`). Any other writing is an error.

## `line`: a line

```
d=AB
d=line A,B
d=line A,2
d=line y=2x+1
```

A line through two points, through a point with a slope, or from its equation. Only `line` accepts a slope or an equation: `seg`, `vec` and `ray` want two points.

The slope is a number or a fraction (`d=line A,1/2`), in units of the graph. An equation has a term on each side of the `=`: `y=2x+1`, `3x=6`, `y=x/2`, `2x-3y+6=0`. An equation that is not the one of a line (`y=x^2`, `1=2`) is an error.

```pidraw params="x=-4:6,y=-3:5,axis,grid"
A(0,1)->label
B(3,3)->label
d=AB->red
e=line A,-1/2->blue
f=line y=2x-2->green
g=line 3x=6->dash
h=line 2x-3y+6=0->dot
v=line x=-3->green
```

A vertical line has no slope: write it with its equation, `d=line x=2`.

```pidraw params="x=-3:5,y=-2:4,axis" errors="2,3"
A(1,1)
d=line y=x^2
e=line 1=2
```

## `seg`: a segment

```
s=AB.
s=[AB]
s=seg A,B
```

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label
B(6,4)->label
s=seg A,B->w=2
t=[AB]->red,dash
u=AB.->blue
```

## `ray`: a ray

```
r=AB[
r=[AB[
r=[AB
r=ray A,B
```

The ray starts at the first point and goes through the second.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label
B(3,2)->label
r=AB[->red
s=ray B,A->blue
t=[BA->green
```

## `vec`: a vector

```
v=vAB
v=vec A,B
```

A vector is a segment with an arrow at its end.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label
B(5,3)->label
v=vAB->blue
w=vec B,A->red
```

### Markers

Any segment, ray or line can have the arrow, or another marker, with the option `mark` (see [options](./options#markers)): `mark` alone puts one at both ends, `mark=end` and `mark=start` at one end, `mark=none` removes them. A second value is the size (`mark=end/20`) and a text is the shape: `x` for a cross, `|` for a bar.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)
B(5,1)
C(1,3)
D(5,3)
E(1,4.5)
F(5,4.5)
s=seg A,B->mark
t=seg C,D->mark=end/20,red
u=seg E,F->mark=both/x/12,blue
```

## `perp`: a perpendicular

```
p=perp d,A
p=perp Ox,A
```

The perpendicular to `d` that goes through `A`. `d` is a line, or an axis: `Ox` and `Oy` are lines like the others.

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,0.5)
B(6,3)
d=AB
C(3,4)->label
p=perp d,C->red
q=perp Ox,C->blue
```

## `para`: a parallel

```
p=para d,A
p=para Ox,A
```

The parallel to `d` that goes through `A`.

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,0.5)
B(6,3)
d=AB
C(3,4)->label
p=para d,C->red
q=para Oy,C->blue
```

## `med`: a perpendicular bisector

```
m=med A,B
```

The perpendicular bisector of the segment `AB`: the line that is perpendicular to it, through its midpoint.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label
B(5,3)->label
s=seg A,B
m=med A,B->red
```

## `tan`: a tangent

```
t=tan f,A
```

The tangent to the function `f`: the line through the point `A` that has the slope of `f` at the abscissa of `A`. To touch the curve, `A` must be on it: `A=eval f,x` is a point of `f`.

```pidraw params="x=-4:4,y=-1:6,axis"
f(x)=x^2/4
A=eval f,2->red,label
t=tan f,A->blue
```

## `bis`: a bisector

```
b=bis d1,d2
b=bis d1,d2,*
b=bis B,A,C
```

Two lines that cross have two bisectors, perpendicular to each other. `bis d1,d2` is the one whose direction is the sum of the directions of `d1` and `d2`, `bis d1,d2,*` is the other one. Both go through the point where the lines cross. Parallel lines have one bisector, the line halfway between them, and `bis d1,d2,*` does not exist then: it is not drawn.

With three points, `bis B,A,C` is the bisector of the angle `BAC`: the vertex is the second point. `d1` and `d2` can be the axes `Ox` and `Oy`.

```pidraw params="x=-4:6,y=-3:5,axis"
A(-3,-2)
B(5,3)
C(-2,3)
D(4,-2)
d1=AB
d2=CD
b1=bis d1,d2->red
b2=bis d1,d2,*->blue
```

```pidraw params="x=-1:7,y=-1:6"
A(1,1)
B(6,2)
C(3,5)
s=seg A,B
t=seg A,C
b=bis B,A,C->red
d1=line A,B
c=bis Ox,d1->green
```

## Mistakes

```pidraw params="x=-1:7,y=-1:5" errors="4,5,6,7,8,9"
A(1,1)
B(4,2)
d=line A,B
s=seg A
v=vec A,2
p=perp A,B
q=para d
t=tan d,A
m=med A,d
```

| Line | What is wrong |
|---|---|
| 4 | `seg` wants two points |
| 5 | only `line` takes a slope: a vector wants two points |
| 6 | `perp` wants a line and a point, in this order |
| 7 | `para` wants a line and a point |
| 8 | `tan` wants a function and a point: `d` is a line |
| 9 | `med` wants two points |
