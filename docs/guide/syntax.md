# Syntax

A drawing is a list of lines. Each line makes one figure (or a few), and may use the figures named on the lines above it.

```pidraw params="x=-1:7,y=-1:5,axis"
A(1,1)
B(6,2)
M=mid A,B->red,label
```

## A line

```
<name>=<key> <value>,<value>,... -> <option>,<option>,...
```

- **`<name>`** is the name of the figure. Other lines use it to build on the figure, and the label of the figure shows it. `Ox` and `Oy` are the axes of the graph and cannot be used.
- **`<key>`** is the kind of figure: `pt` for a point, `seg` for a segment, `circ` for a circle... See [the kinds of figures](#the-kinds-of-figures).
- **The values** follow the key, separated by commas. They are numbers, or the names of figures made above (`seg A,B`).
- **The options** follow `->`, separated by commas. They change how the figure looks or behaves, and none is required.

```pidraw params="x=-1:7,y=-1:5"
A=pt 1,1
B=pt 6,2
s=seg A,B->red,w=3,dash
```

Here `s=seg A,B` is the segment between the points `A` and `B`, and `red`, `w=3` and `dash` are its options: a red stroke, 3 pixels wide, dashed.

An option is a name, or a name with a value: `dash`, `w=3`. A value can have parameters after slashes: `label=A/tl` writes the label of the figure at the top left of it, and `color=red/0.5` is a half transparent red. The options are applied in the order they are written.

The same name used twice does not replace the figure: the second one is named `A_1`.

## The kinds of figures

| Figures | Keys |
|---|---|
| [Points](./points) | `pt`, `mid`, `proj`, `sym`, `dpt`, `vpt`, `eval`, `inter` |
| [Lines](./lines) | `line`, `seg`, `ray`, `vec`, `perp`, `para`, `med`, `tan`, `bis` |
| [Circles and arcs](./circles) | `circ`, `arc` |
| [Functions and curves](./curves) | `plot`, `parametric`, `bezier`, `follow`, `fill`, `riemann` |
| [Polygons and paths](./polygons) | `poly`, `path` |
| [Grids and graduated lines](./grids-axes) | `grid`, `axis` |

Every key with all its forms is listed in [the reference of the keys](./reference).

## Values

| You write | It is |
|---|---|
| `3`, `-1.5` | a number |
| `1/2` | the number 0.5 |
| `2;3` | a position, the point of coordinates `x=2` and `y=3` |
| `-2:3` | a domain, from `-2` to `3` |
| `A`, `d` | the figure with this name |
| `A.x`, `A.y` | the abscissa or the ordinate of the point `A` |

```pidraw params="x=-1:6,y=-1:5,axis"
A(1/2,3)->label
B(A.x,1)->label
C(4,A.y)->label
```

## Shorthands

The most common lines have a shorter form. The two forms of a line are the same line.

| Shorthand | Is the line | Description |
|---|---|---|
| `A(3,4)` | `A=pt 3,4` | a point (a capital letter, then digits if you want) |
| `d=AB` | `d=line A,B` | the line through `A` and `B` |
| `d=AB.` or `d=[AB]` | `d=seg A,B` | the segment |
| `d=AB[`, `d=[AB[` or `d=[AB` | `d=ray A,B` | the ray from `A` through `B` |
| `d=vAB` | `d=vec A,B` | the vector from `A` to `B` |
| `f(x)=x^2` | `f=plot x^2` | the plot of a function |
| `f(t)=cos(t),sin(t),0:2pi` | `f=parametric cos(t),sin(t),0:2pi` | a parametric curve |

```pidraw params="x=-3:7,y=-3:5,axis"
A(0,0)
B(4,0)
C(2,3)
d=AB
e=BC.
k=[CA]
f=[CA[
r=AB[
q=[BC
v=vAC
g(x)=x^2/4-2
h(t)=2+cos(t),1+sin(t),0:2pi
```

Four kinds of figures have a shorthand: the points, the lines (with the segments, the rays and the vectors), the functions and the parametric curves. The shorthand of a point has a capital letter and digits for its name, the one of a function a lowercase letter and digits (`f`, `g1`), and the one of a line two such names of points. The name of the line itself is free.

```pidraw params="x=-1:6,y=-1:4" errors="2"
A(1,1)
F(x)=x^2
```

## The alternative form

Some keys have two forms. A last value `*` chooses the second one: `c=circ A,B,C` is the circle through three points, `c=circ A,B,C,*` the circle inscribed in the triangle they make. Only `*` is accepted.

```pidraw params="x=-2:6,y=-2:5,axis"
A(0,0)->label
B(5,0)->label
C(1,4)->label
c=circ A,B,C->dash
i=circ A,B,C,*->blue
d=line A,B
P=dpt C,d,2->label
Q=dpt C,d,2,*->label
```

`P=dpt C,d,2` is the point 2 units from `C` along `d`. With `*`, `Q` is 2 units from `C` perpendicularly to `d`.

The keys that have an alternative form say so on their own page.

## Comments and empty lines

Empty lines are ignored, and so are two kinds of lines. They still count in the numbers of the lines of the [report](./errors).

- A line that starts with `%` is a comment. Putting `%` before a line of code switches that line off.
- A line that starts with `$` is ignored by PiDraw too, but it is not a comment: it is meant for something else that reads the same code (an application that keeps its own parameters in it, for example), which can tell it from a comment.

A line that starts with `@` is a command: `@pause` and `@slides` (see [slides](./slides)); any other one is an error. Only a whole line can be a comment: after the code of a figure, a `%` is part of the line (`A(1,1) % here` is an error).

```pidraw params="x=-1:5,y=-1:4"
% the vertices
A(1,1)
B(4,1)

$ not for PiDraw
%C(2,3)

% the segment between them
s=seg A,B
```

## Errors

A line that cannot be drawn never stops the others, and nothing is thrown. The report of the drawing says which lines were wrong, and why; the other lines are drawn as usual.

```pidraw params="x=-1:6,y=-1:4" errors="4,5,6,7,8"
A(1,1)
B(4,2)
s=seg A,B
t=seg A,Z
Ox=pt 1,1
u=nothing 1,2
hello
v=pt 1
```

| Line | What is wrong |
|---|---|
| 4 | `Z` is not a figure that was made above |
| 5 | `Ox` is the name of an axis |
| 6 | `nothing` is not a kind of figure |
| 7 | The line is not `<name>=<key> <values>` |
| 8 | `pt` wants two coordinates |

A wrong option is also an error, but the figure is drawn, with the options written before the wrong one:

```pidraw params="x=-1:6,y=-1:4" errors="3"
A(1,1)
B(4,2)
s=seg A,B->red,colr=blue,w=3
```

The segment is drawn red, and `w=3` is not applied: the options after the wrong one are not read. The error gives the line, the message, and the columns of the option that is wrong.

[Getting started](./getting-started#when-a-line-is-wrong) shows how to read the report.
