# Points

A point is made at fixed coordinates, or from other figures: the midpoint of two points, the projection of a point on a line, the intersection of two figures... A point made from other figures moves when they move.

| Key | Makes |
|---|---|
| [`pt`](#pt-a-fixed-point) | a point at given coordinates |
| [`mid`](#mid-a-midpoint) | the midpoint of two points |
| [`proj`](#proj-a-projection) | the projection of a point on a line |
| [`sym`](#sym-a-symmetric-point) | the symmetric of a point about a point or a line |
| [`dpt`](#dpt-a-point-at-a-distance) | a point at a distance from a point, along or across a line |
| [`vpt`](#vpt-a-point-from-a-vector) | a point moved by a vector |
| [`eval`](#eval-a-point-of-a-function) | the point of a function at a given abscissa |
| [`inter`](#inter-an-intersection) | the intersections of two lines, or of a circle and a line or a circle |

A line whose values do not suit its key (the number of values, the kind of figure: `mid` wants two points, `proj` a point and a line) is an error that names the line. See [mistakes](#mistakes).

## `pt`: a fixed point

```
A(x,y)
A=pt x,y
```

The two forms are the same. A coordinate is a number, the abscissa or the ordinate of another point (`A.x` and `A.y`), or the distance between two points (`A:B`). A point has exactly two coordinates: there is no third dimension, and a missing or an extra value is an error.

```pidraw params="x=-1:7,y=-1:5,axis,grid"
A(1,1)->label
B(4,3)->label
C(A.x,4)->label
D(6.5,A.y)->label
E(A:B,0.5)->label
```

`E` is the point whose abscissa is the length of the segment `AB`.

### The shape of a point

By default a point is a small circle. Three options change its shape, with a size or not:

| Option | Shape | Default size |
|---|---|---|
| `o` or `o=<size>` | circle | 5 |
| `s` or `s=<size>` | square | 10 |
| `*` or `*=<size>` | crosshair | 10 |

The size is the one of the box around the shape: the diameter of the circle, the side of the square, the width of the crosshair. A size that is not a number greater than 0 is an error, and so is the option on a figure that is not a point.

```pidraw params="x=-1:7,y=-1:4,axis"
A(1,2)->o=8,red
B(3,2)->s
C(5,2)->*=16,blue
D(6,3)->s=14,fill=orange
```

All the points of a drawing take the shape of the graph parameter `default.points`, with a size or not: `default.points=s/12`. The option of a point wins over the parameter.

```pidraw params="x=-1:7,y=-1:4,default.points=s/12"
A(1,2)
B(3,2)
C(5,2)->o=12
```

### Move a point

The option `drag` makes a point movable with the mouse. The figures made from it follow.

```pidraw params="x=-1:7,y=-1:4,axis"
A(1,2)->drag,label
B(4,2)->drag=Ox,label
C(6,3)->drag=Oy,label
```

`drag=Ox` keeps the height of the point, `drag=Oy` keeps its abscissa. The limits of a drag are in [dragging and animation](./interaction).

## `mid`: a midpoint

```
M=mid A,B
```

The point halfway between two points.

```pidraw params="x=-1:7,y=-1:4,axis"
A(1,1)->label
B(6,3)->label
s=seg A,B
M=mid A,B->red,label
```

## `proj`: a projection

```
H=proj A,d
H=proj A,Ox
H=proj A,Oy
```

The projection of a point on a line, perpendicularly. `Ox` and `Oy` are the axes of the graph: they are lines like the others, shown or not.

```pidraw params="x=-1:7,y=-1:5,axis"
A(2,4)->drag,label
B(1,0.5)
C(6,2)
d=line B,C
H=proj A,d->red,label
K=proj A,Ox->red,label
L=proj A,Oy->red,label
```

## `sym`: a symmetric point

```
S=sym A,B
S=sym A,d
S=sym A,Ox
```

The symmetric of `A` about a point `B`, or about a line `d` or an axis.

```pidraw params="x=-5:5,y=-4:5,axis"
A(2,3)->label
B(-1,1)->label
E(3,-2)
d=line B,E->dash
P=sym A,B->red,label
Q=sym A,Ox->red,label
R=sym A,d->red,label
```

## `dpt`: a point at a distance

```
P=dpt A,d,distance
P=dpt A,d,distance,*
```

The point at `distance` units from `A`, along the line `d`. With a last value `*`, the point is at the same distance, but perpendicularly to `d`. Any other fourth value is an error.

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,1)->label
B(5,2)
d=line A,B->dash
P=dpt A,d,3->red,label
Q=dpt A,d,3,*->blue,label
```

## `vpt`: a point from a vector

```
P=vpt A,B
P=vpt A,B,scale
P=vpt A,B,scale,C
```

The point you reach by following the vector from `A` to `B`, multiplied by `scale` (1 by default), from the point `C` (`A` by default).

```pidraw params="x=-1:9,y=-1:6,axis"
A(0,0)->label
B(3,1)->label
C(1,3)->label
P=vpt A,B->red,label
Q=vpt A,B,2->red,label
R=vpt A,B,2,C->red,label
```

## `eval`: a point of a function

```
P=eval f,x
```

The point of the function `f` at the abscissa `x`. The function is made above, with the shorthand `f(x)=...` or the key `plot`.

```pidraw params="x=-4:4,y=-1:5,axis"
f(x)=x^2/4
P=eval f,2->red,label
Q=eval f,-3->red,label
```

## `inter`: an intersection

```
P=inter d1,d2
P=inter c,d
P=inter c1,c2
```

| Figures | Points |
|---|---|
| two lines | one |
| a circle and a line | two |
| two circles | two |

The axes `Ox` and `Oy` are lines, so they can be intersected as well. The two figures can be in any order. Two figures of another kind, or another number of figures, are an error.

A line that gives two points makes two figures, named after it with a number: `P=inter c,d` makes `P1` and `P2`.

```pidraw params="x=-5:5,y=-4:4,axis"
A(0,0)
B(4,3)
C(0,3)
D(4,0)
d1=line A,B
d2=line C,D
P=inter d1,d2->red,label
c=circ P,2->dash
Q=inter c,Ox->blue,label
R=inter c,d1->green,label
```

When the intersection does not exist (parallel lines, figures that do not meet), the point is not drawn. It appears again as soon as the intersection exists. Drag `A` up in the example below: the circle leaves the axis, and `P1` and `P2` disappear.

```pidraw params="x=-1:7,y=-1:5,axis"
A(3,1)->drag,label
c=circ A,1.5
P=inter c,Ox->red,label
```

## Mistakes

A line that does not suit its key is an error that names the line. The other lines are drawn.

```pidraw params="x=-1:7,y=-1:5" errors="4,5,6,7,8,10"
A(1,1)
B(4,2)
d=line A,B
C(1,2,3)
E=mid A
F=proj A,B
G=dpt A,d,3,x
H=inter A,B
I=dpt A,d,3,*
J=eval f,2
```

| Line | What is wrong |
|---|---|
| 4 | a point has two coordinates |
| 5 | `mid` wants two points |
| 6 | `proj` wants a point and a line: `B` is a point |
| 7 | the last value of `dpt` can only be `*` |
| 8 | `inter` wants two lines, a circle and a line, or two circles |
| 10 | `eval` wants a function, and `f` does not exist |
