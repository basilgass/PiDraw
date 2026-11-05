# Polygons and paths

| Key | Makes |
|---|---|
| [`poly`](#poly-a-polygon) | a polygon from its vertices, a regular polygon, or a regular star |
| [`path`](#path-an-svg-path) | any shape, written as the data of an SVG path |

## `poly`: a polygon

```
p=poly A,B,C,D
p=poly A,4,5
p=poly A,B,5
p=poly A,4,5,2
p=poly A,B,5,2
```

The key is always `poly`, and the values say how the polygon is made: only points, a point then numbers, or two points then a number.

| Values | The polygon |
|---|---|
| `A,B,C,...` | the vertices, in order. Three points at least |
| `A,radius,n` | a regular polygon with `n` sides: center `A` and radius `radius`. The radius is a number (in units of the x axis) or `B:C`, the distance between two points. The first vertex is above the center, the others follow counter-clockwise |
| `A,B,n` | a regular polygon with `n` sides, of which `A` and `B` are two consecutive vertices. The polygon is on the **left** of `A` toward `B`, as seen on the screen: for the other side, write `B,A,n` |
| `...,n,k` | the regular star `{n/k}`, see below |

`n` is an integer from 3 to 1000.

```pidraw params="x=-1:9,y=-1:6,axis"
A(1,1)->label
B(6,1)->label
C(8,4)->label
D(3,5)->label
p=poly A,B,C,D->fill=yellow/0.3
```

```pidraw params="x=-5:5,y=-4:4"
O(0,0)
p=poly O,3,6->fill=teal/0.3
q=poly O,1.5,3->red
```

```pidraw params="x=-1:9,y=-1:5"
A(1,1)->label
B(4,1)->label
p=poly A,B,5->fill=orange/0.3
q=poly B,A,4->fill=blue/0.2
```

### Stars

With a last number `k`, the polygon is the regular star `{n/k}`: the vertices are joined `k` by `k`. `5,2` is the pentagram. `k` is an integer from 1 (the convex polygon) to less than `n/2`. When `n` and `k` have a common divisor, the figure is made of several polygons: `6,2` gives two triangles. With `A,B,n,k`, `[AB]` is one of the strokes of the star: two vertices that it joins.

```pidraw params="x=-4:12,y=-4:4"
O(0,0)
P(7,0)
s=poly O,3,5,2->red
h=poly P,3,6,2->blue
```

```pidraw params="x=-1:6,y=-1:6"
A(1,1)
B(5,1)
s=poly A,B,5,2->fill=gold/0.4
```

A polygon with a vertex that has no position (a point that is not drawn, `A` and `B` the same point) is not drawn. The label is at the center of the vertices. A position that you give (`label=p/tl`) is kept.

### Mistakes

```pidraw params="x=-1:6,y=-1:6" errors="3,4,5,6"
A(1,1)
B(4,2)
a=poly A,B
b=poly A,3,2
c=poly A,3,2000
d=poly A,3,5,3
```

| Line | What is wrong |
|---|---|
| 3 | two points are not a polygon |
| 4 | a polygon has 3 sides at least |
| 5 | and 1000 at most |
| 6 | `k` is less than `n/2`: `5,3` is the same star as `5,2` |

## `path`: an SVG path

```
p=path M 0,0 L 2,1 Q 3,3 4,0 Z
```

The data of an SVG path (`d`), **written in units of the graph** and not in pixels: `M 1,2` is the point (1; 2), the y axis goes up. The commas of the line split the values, which are put end to end: write the data as in an SVG file, with commas or spaces between the numbers.

| Command | Description |
|---|---|
| `M x,y` | the start of a piece (the first command is always `M`) |
| `L x,y`, `H x`, `V y` | segments |
| `C x1,y1 x2,y2 x,y`, `S x2,y2 x,y` | cubic Bézier curves |
| `Q x1,y1 x,y`, `T x,y` | quadratic Bézier curves |
| `A rx,ry rotation large sweep x,y` | an arc of an ellipse |
| `Z` | closes the piece |

Capital letters are positions, small letters are moves from the current point. A path can have several pieces (one `M` per piece). It is read as segments and cubic Bézier curves: an arc is drawn by a few curves that follow it.

```pidraw params="x=-1:6,y=-1:6,axis,grid"
p=path M 0,0 L 2,1 L 3,0->red
q=path M 0,3 C 1,5 3,5 4,3 Z->fill=green/0.3
r=path M 1,1 A 1,1 0 0 1 2,2->blue,w=2
s=path M 4,0 L 5,0 L 5,1 L 4,1 Z M 4.3,0.3 L 4.7,0.3 L 4.7,0.7 L 4.3,0.7 Z->fill=orange/0.4
```

Data that are not the ones of a path (they do not start with `M`, an unknown command, a missing number) are an error.

```pidraw params="x=-1:6,y=-1:4" errors="1,2"
p=path L 2,1
q=path M 0,0 L 2
```

The label is at the middle of the longest piece, on the left of the way the path goes. A position that you give is kept. A point can follow a path: `t=follow p`, see [curves](./curves#follow-a-point-that-follows-a-curve).
