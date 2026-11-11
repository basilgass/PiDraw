# Nodes and edges

A diagram is made of **nodes**, boxes around a text, and **edges**, the lines that join them. A node is a [point with the option `node`](./points#a-node), and an edge is a figure of its own: `edge` joins two points and stops at the border of the nodes, so that the arrow touches the box and not its center.

```pidraw params="x=-1:11,y=-1:7"
A(1,5)->label=Start,node=round
B(5,5)->label=Is it done?,node=diamond
C(9,5)->label=End,node=round,fill=lightgreen
D(5,1.5)->label=Work,node
e1=edge A,B->mark=end
e2=edge B,C->mark=end,label=yes/mc
e3=edge B,D->mark=end,label=no
e4=edge D,D->mark=end,loopSide=r
```

## `edge`: a line between two points

```
e=edge A,B
```

The edge goes from `A` to `B`. It starts on the border of `A` and ends on the border of `B`, on the line between them: a node has a border (a rectangle, a rounded rectangle, a diamond or a circle), and a point that is not a node is its own border, so the edge ends exactly on it. An edge is drawn under the nodes, and it follows them when they move, are dragged, or change their size.

| Option | Description |
|---|---|
| `mark=end` | an arrow at the end (an edge has no arrow by default, see [markers](./options#markers)) |
| `curve=0.3` | bends the edge: the middle of it is moved sideways by this part of the distance between the points. To the left of the way when the number is positive, to the right when it is negative, as seen on the screen |
| `loopSide=r` | the side of a loop: `t`, `r`, `b` or `l` (see below). `loopSide` alone is `t` |

All the options of the figures work on an edge: `dash`, `dot`, a color, `w`, `class`, `label`...

```pidraw params="x=-1:9,y=-1:5"
A(1,3)->label=A,node=circle
B(6,3)->label=B,node=rect
C(3.5,0.5)->label=C,node=round
a=edge A,B->mark=end
b=edge A,C->mark=end,dash,blue
c=edge C,B->mark=end/x,red,w=2
```

### The places of a node

An edge can start or end at a [place of a node](./points#the-places-of-a-node): `edge A.mr,B.tl` goes from the middle of the right side of `A` to the top left corner of `B`. A place is a point, so the edge ends exactly on it.

```pidraw params="x=-1:9,y=-1:5"
A(1,4)->label=A,node
B(6,1)->label=B,node
a=edge A.mr,B.tc->mark=end
b=edge A.bc,B.ml->mark=end,green
```

### A curve

Two edges between the same nodes, one each way, do not overlap with a curve of the same sign: each one is on the left of its own way.

```pidraw params="x=-1:9,y=-1:5"
A(1,2)->label=A,node=circle
B(7,2)->label=B,node=circle
a=edge A,B->mark=end,curve=0.25,label=0.4
b=edge B,A->mark=end,curve=0.25,label=0.6
c=edge A,B->mark=end,curve=-0.25,dash
```

### A loop

An edge from a point to itself is a loop. It leaves the node by the side that `loopSide` says, and comes back to it.

```pidraw params="x=-1:9,y=-2:6"
A(1,2)->label=A,node
B(6,2)->label=B,node=circle
t=edge A,A->mark=end,loopSide=t,label=top
l=edge A,A->mark=end,loopSide=l
r=edge B,B->mark=end,loopSide=r,label=right
b=edge B,B->mark=end,loopSide=b
```

A loop has no `curve`: its side is its shape. A side is only for a loop.

## The label of an edge

The label of an edge is beside it, on the left of the way it goes. With a position it is where the position says: `label=yes/mc` puts it on the edge, in the middle. The label of a loop is on the side of the loop.

A label that is **on the edge** (`mc`) makes a hole in the line, the size of the label and a margin, so the line does not go through the text. The hole is a mask of the line, not a color: it works on any background of the page, and it leaves the grid and the other figures as they are. With a background of its own (`labelFill=white`, see [the color and the background of a label](./options#color-and-background)) the label has a box of that color instead, and `labelFill=none` leaves the line whole. In TikZ, which has no mask, the label has a white background.

```pidraw params="x=-1:9,y=-1:5"
A(1,2)->label=A,node
B(7,2)->label=B,node
a=edge A,B->mark=end,label=beside
b=edge A,B->mark=end,curve=0.4,label=on the edge/mc
```

## Mistakes

An edge joins two points: other values are an error that names the line. The options are checked for the edge they are given to.

```pidraw params="x=-1:7,y=-1:3" errors="3,4,5,6,7,8,9"
A(1,1)->label,node
B(5,1)
c=edge A
d=edge A,B,A
e=edge A,Ox
f=edge A,B->curve=left
g=edge A,B->loopSide=t
h=edge A,A->curve=0.3
i=edge A,A->loopSide=x
```

| Line | What is wrong |
|---|---|
| 3 | an edge has two points |
| 4 | an edge has two points, not three |
| 5 | `Ox` is a line, and an edge joins points |
| 6 | a curve is a number |
| 7 | a side is for a loop: the edge is from `A` to `B` |
| 8 | a loop has no curve |
| 9 | a side is `t`, `r`, `b` or `l` |

## A probability tree

A tree is a root, branches and leaves: the nodes are placed where the tree needs them, and the edges carry the probabilities. A label in TeX (`tex`) writes a fraction, it is on its edge (`/mc`, the line is cut behind it) and a little smaller than the nodes (`labelSize=sm`).

```pidraw params="x=-1:12,y=-1:9"
R(0.5,4)->label=Start,node=circle
A(5,6.5)->label=Red,node=round
B(5,1.5)->label=Blue,node=round
A1(10,7.5)->label=Red,node
A2(10,5.5)->label=Blue,node
B1(10,2.5)->label=Red,node
B2(10,0.5)->label=Blue,node
r=edge R,A->tex=\frac{3}{5}/mc,labelSize=sm
s=edge R,B->tex=\frac{2}{5}/mc,labelSize=sm
a1=edge A,A1->tex=\frac{1}{2}/mc,labelSize=sm
a2=edge A,A2->tex=\frac{1}{2}/mc,labelSize=sm
b1=edge B,B1->tex=\frac{3}{4}/mc,labelSize=sm
b2=edge B,B2->tex=\frac{1}{4}/mc,labelSize=sm
```

With the labels on the edges, the ones of the edges that leave the same node do not meet: each one is on its own line.

## A Markov graph

The states are circles, two edges between the same states bend the same way (each one on the left of its own way), and a loop is an edge from a state to itself.

```pidraw params="x=-1:9,y=-1:7"
A(1,3)->label=A,node=circle
B(6,5)->label=B,node=circle
C(6,1)->label=C,node=circle
ab=edge A,B->mark=end,curve=0.2,label=0.5
ba=edge B,A->mark=end,curve=0.2,label=0.3
bc=edge B,C->mark=end,curve=0.2,label=0.2
cb=edge C,B->mark=end,curve=0.2,label=0.4
ca=edge C,A->mark=end,label=0.6
aa=edge A,A->mark=end,loopSide=l,label=0.5
bb=edge B,B->mark=end,loopSide=t,label=0.5
```

## In TikZ

An edge is written as a line, or as a curve with its control points when it is bent or a loop, with the arrow of its marker, and its label as a node. An edge is written before the nodes, as it is drawn.

```pidraw params="x=-1:6,y=-1:3"
A(1,1)
B(4,1)
e=edge A,B->mark=end,dash
f=edge A,B->curve=0.3,blue,label=up/mc
```

```latex
\begin{tikzpicture}[x=28.453pt, y=28.453pt]
\definecolor{pidraw-blue}{HTML}{0000FF}
\path (-1,-1) rectangle (6,3);
\begin{scope}
\clip (-1,-1) rectangle (6,3);
\draw[draw=black, line width=0.75pt, dash pattern=on 4.5pt off 3pt, ->] (1,1) -- (4,1);
\draw[draw=pidraw-blue, line width=0.75pt] (1,1) .. controls (2,2.2) and (3,2.2) .. (4,1);
\node[fill=white, inner sep=2.25pt] at (2.5,1.9) {up};
\draw[draw=black, line width=0.75pt] (1,1) circle[radius=1.875pt];
\draw[draw=black, line width=0.75pt] (4,1) circle[radius=1.875pt];
\end{scope}
\end{tikzpicture}
```

A node is written as its box (`rectangle`, `rounded corners`, a polygon or a `circle`) and its label in the middle of it. The size of a box is the one of its label **as the browser measures it**, so a drawing that is written in TikZ from a page has the sizes of that page: the same code gives other numbers under a virtual DOM, where a text has no measure of its own. See [TikZ](./tikz).
