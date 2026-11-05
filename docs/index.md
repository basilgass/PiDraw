---
layout: home
hero:
  name: PiDraw
  text: Geometry drawing for teachers
  tagline: Describe points, lines, circles, polygons and function plots with a short text syntax, and get an SVG that students can move.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Syntax
      link: /guide/syntax
    - theme: alt
      text: View on GitHub
      link: https://github.com/basilgass/PiDraw
features:
  - title: A short text syntax
    details: One line per figure. M=mid A,B is the midpoint, c=circ A,B,C the circle through three points. Change a line and the figures that depend on it follow.
  - title: Constructions that stay alive
    details: Projections, symmetries, perpendiculars, tangents, intersections. Drag a point and everything built on it is drawn again.
  - title: Plots and animations
    details: Functions, parametric curves, areas between curves, Riemann sums, and points that move along a path.
  - title: Made for an editor
    details: Every problem is reported with its line and the part of the line that is wrong, and the drawing keeps its last valid state while you type.
  - title: TikZ export
    details: The drawing is written as a tikzpicture that compiles with pdflatex, for the handout as well as for the screen.
  - title: SVG, nothing else
    details: The figures are plain SVG elements, drawn with svg.js. No canvas, no server.
---

## A triangle, its circle and its midpoints

```pidraw params="x=-2:8,y=-2:6,axis,grid,unitX=0.9"
A(0,0)->label=A/bl,drag
B(6,1)->label=B/br,drag
C(2,5)->label=C/tl,drag
t=poly A,B,C->fill=lightblue/0.4
c=circ A,B,C->blue,dash
M=mid A,B->red,label=M/bc
N=mid B,C->red,label=N/mr
P=mid C,A->red,label=P/ml
```

Drag a vertex: the triangle, the circle and the midpoints follow it, because each line is built on the figures named before it. The option `drag` is all it takes. See [Getting started](./guide/getting-started).
