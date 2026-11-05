# Circles and arcs

| Key | Makes |
|---|---|
| [`circ`](#circ-a-circle) | a circle, from its center and its radius, from three points, or from its diameter |
| [`arc`](#arc-an-arc) | an arc of a circle, from an angle or from two directions |

## `circ`: a circle

```
c=circ O,3
c=circ O,A
c=circ O,A:B
c=circ O,d
c=circ A,B,C
c=circ A,B,C,*
c=circ A:B
```

| Values | The circle |
|---|---|
| `O,r` | center `O`, radius `r` |
| `O,d` | center `O`, tangent to the line `d`, or to an axis (`circ O,Ox`) |
| `A,B,C` | through the three points: the circumscribed circle |
| `A,B,C,*` | inscribed in the triangle `ABC` |
| `A:B` | the circle of diameter `[AB]` |

The radius `r` is a number, a point on the circle, or `A:B`: the distance between the points `A` and `B`. A number is a length in units of the x axis, so the circle stays round when the two axes have different scales. A radius that is zero, negative, or not a number is an error.

```pidraw params="x=-1:9,y=-1:5,axis"
O(2,2)->label
A(5,2)->label
c=circ O,1.5->red
d=circ O,A->blue,dash
```

### The radius from a distance

`circ O,A:B` takes the distance between two points as the radius.

```pidraw params="x=-1:9,y=-1:6,axis"
O(2,2)->label
A(5,5)->label
B(6,5)->label
c=circ O,A:B->red
```

### Tangent to a line

`circ O,d` is the circle with center `O` that touches `d`. The axes `Ox` and `Oy` are lines too.

```pidraw params="x=-1:9,y=-1:6,axis"
O(3,2)->label
A(1,5)
B(8,4)
d=line A,B
c=circ O,d->red
e=circ O,Ox->blue
```

### Through three points

```pidraw params="x=-1:8,y=-3:7,axis"
A(1,1)->label
B(6,2)->label
C(3,5)->label
c=circ A,B,C->red
i=circ A,B,C,*->blue
t=poly A,B,C
```

### From a diameter

```pidraw params="x=-1:8,y=-1:6,axis"
A(1,1)->label
B(6,4)->label
c=circ A:B->red
s=seg A,B
```

When the circle does not exist, it is not drawn, and it appears again as soon as it exists: the point that gives the radius is the center, three points are on one line, the center is on its tangent. Any other combination of values is an error that names the line.

## `arc`: an arc

```
a=arc B,A,C
a=arc B,A,C,2
a=arc O,2,30,120
a=arc O,A,60
a=arc O,A,-60,2
a=arc B,A,C,*
```

| Values | The arc |
|---|---|
| `B,A,C` | the angle `BAC`: the center is `A`, from the direction `AB` to the direction `AC` |
| `B,A,C,r` | the same, with a radius |
| `O,2,30,120` | center `O`, radius 2, from 30 to 120 degrees |
| `O,A,60` | the point `A` turned by 60 degrees around `O` |
| `O,A,-60,r` | the same, clockwise, with a radius |
| `B,A,C,*` | the other arc between the same directions |

An arc always turns counter-clockwise, from the first direction to the second. A last `*` is the other arc between the same directions, which is drawn clockwise: for `O,A,60`, it is the rest of the turn, 300 degrees. The radius is a number (in units of the x axis), a point (the distance to the center) or `A:B`. Without a radius, it is the distance from the center to the first point. The angles are in degrees.

Mind the order of the points: `B,A,C` has the center in the middle, `O,A,60` has it first.

Two identical directions do not make an arc (a circle draws that better), and the arc is not drawn.

```pidraw params="x=-1:8,y=-1:6,axis"
A(1,1)->label
B(6,2)->label
C(3,5)->label
s=seg A,B
t=seg A,C
a=arc B,A,C->red,label=θ
b=arc B,A,C,*->blue,dash
```

```pidraw params="x=-3:5,y=-3:5,axis"
O(0,0)->label
A(2,0)->label
a=arc O,2,30,120->red
b=arc O,A,60->blue
c=arc O,A,-60,1.5->green
d=arc O,A,60,*->dash
```

### Sector and right angle

Two options shape an arc. `sector` closes it with its two radii, to fill it. `square` draws a right angle as a square corner, if the arc covers 90 degrees.

```pidraw params="x=-1:8,y=-1:6,axis"
A(1,1)
B(6,1)
C(1,5)
s=seg A,B
t=seg A,C
O(5,3)
a=arc B,A,C,1->square
b=arc O,3,0,70->sector,fill=orange/0.4
```

The label of an arc is outside it, in the direction of the middle of the angle. A position that you give (`label=θ/tl`) is kept, even when the arc moves.

## Mistakes

```pidraw params="x=-1:7,y=-1:5" errors="3,4,5,6,7,8"
O(2,2)
A(4,3)
a=circ O,0
b=circ O,-2
c=circ O,x
d=circ A
e=arc O,A
f=arc O,A,60,30,10
```

| Line | What is wrong |
|---|---|
| 3 | a radius that is zero |
| 4 | a negative radius |
| 5 | `x` is not a number or a figure |
| 6 | `circ` wants a radius, a line, three points or `A:B` |
| 7 | `arc` wants an angle |
| 8 | too many values |
