# TikZ export

A drawing can be written for LaTeX: `graph.tikz()` gives a complete `tikzpicture`, and `graph.tikzPreamble()` the lines to put before `\begin{document}`. Here is a drawing, and what `draw.graph.tikz()` writes for it.

```pidraw params="x=-1:5,y=-1:4,axis"
A(1,1)->label
B(4,3)
s=seg A,B->red,mark=end
```

```latex
\begin{tikzpicture}[x=28.453pt, y=28.453pt]
\definecolor{pidraw-red}{HTML}{FF0000}
\path (-1,-1) rectangle (5,4);
\begin{scope}
\clip (-1,-1) rectangle (5,4);
\draw[draw=black, line width=0.75pt, ->] (-0.47281,0) -- (4.47281,0);
\draw[draw=black, line width=0.75pt, ->] (0,-0.47281) -- (0,3.47281);
\draw[draw=pidraw-red, line width=0.75pt, ->] (1,1) -- (4,3);
\draw[draw=black, line width=0.75pt] (1,1) circle[radius=1.875pt];
\node[below right] at (1,1) {A};
\draw[draw=black, line width=0.75pt] (4,3) circle[radius=1.875pt];
\end{scope}
\end{tikzpicture}
```

The text of a `latex` block that follows a drawing is checked against the library each time the documentation is built.

- **The coordinates are in units of the graph**, not in pixels. The scale of the picture is `x=…, y=…`: a unit is as long as it is on the screen, `unitX` centimeters (28.453 points for a centimeter).
- **The colors** are defined once, at the start of the picture (`\definecolor`).
- **The window** is the rectangle `\path (-1,-1) rectangle (5,4);`: the picture has the size of the part of the plane that is drawn.
- **The figures** come in the order they are on the screen, layer by layer. They are cut to the window by a `\clip` in a `scope`.
- **The widths and the lengths in pixels** are written in points: 1 pixel is 0.75 point.

## The drawing is what is written

The TikZ is faithful to the screen:

- a figure that is hidden (`hide`), and a point that has no position, write nothing;
- with `!`, only the label is written, with `?` only the figure;
- the handles of the points that can be dragged are not part of the drawing;
- no fill is written that the drawing does not have.

```js
const shown = code => new PiDraw(container, {parameters: 'x=-1:5,y=-1:4', code}).graph.tikz()

shown('A(1,1)->label').includes('\\node') // true
shown('A(1,1)->label,!').includes('circle') // false
shown('A(1,1)->label,?').includes('\\node') // false
shown('A(1,1)->hide').includes('\\draw') // false
shown('A(1,1)->drag').includes('A_drag') // false
```

## Colors

Every color is defined in the picture with `\definecolor`, so that the PDF has the shade of the screen: a hexadecimal color (`#ff8800`) as `pidraw-ff8800`, and a name of CSS (`green`, `gold`, `lightblue`…) as `pidraw-green`, with the shade that CSS gives it. `black` and `white` are written as they are. LaTeX alone would give `green`, `orange`, `purple` or `lightgray` other shades, and does not know `gold`. The opacities are written as options. An appearance that has no equivalent in TikZ is an error, and it is never left out silently: a color that CSS does not know is an `InvalidArgumentError`.

```js
const shown = code => new PiDraw(container, {code}).graph.tikz()

shown('A(1,1)->color=#ff8800').includes('pidraw-ff8800') // true
shown('A(1,1)->color=green').includes('\\definecolor{pidraw-green}{HTML}{008000}') // true
shown('A(1,1)->color=gold').includes('pidraw-gold') // true
shown('A(1,1)->color=periwinkle') // throws InvalidArgumentError
```

## Functions

The figures that draw a function (`plot`, `parametric`, `fill`) are written with `pgfplots`: each curve has its own `axis`, with the same units as the picture. `fill` also needs the library `fillbetween`.

```pidraw params="x=-4:4,y=-1:5"
f(x)=x^2/4->blue
A(2,1)->label
```

```latex
\begin{tikzpicture}[x=28.453pt, y=28.453pt]
\definecolor{pidraw-blue}{HTML}{0000FF}
\path (-4,-1) rectangle (4,5);
\begin{axis}[hide axis, scale only axis, trig format plots=deg, unbounded coords=jump, x=28.453pt, y=28.453pt, at={(-113.811pt,-28.453pt)}, anchor=south west, xmin=-4, xmax=4, ymin=-1, ymax=5, restrict y to domain=-7:11]
\addplot[domain=-5:5, samples=191, draw=pidraw-blue, line width=0.75pt] {((x^2)/4)};
\end{axis}
\begin{scope}
\clip (-4,-1) rectangle (4,5);
\draw[draw=black, line width=0.75pt] (2,1) circle[radius=1.875pt];
\node[below right] at (2,1) {A};
\end{scope}
\end{tikzpicture}
```

## The preamble

`graph.tikzPreamble()` gives the packages and the libraries that the figures need:

```js
const draw = new PiDraw(container, {code: 'A(1,1)'})

draw.graph.tikzPreamble().split('\n') // [ '\\usepackage{tikz}', '\\usepackage{pgfplots}', '\\pgfplotsset{compat=1.18}', '\\usetikzlibrary{arrows.meta}', '\\usepgfplotslibrary{fillbetween}' ]
```

A whole document is then:

```latex
\documentclass[tikz]{standalone}
\usepackage{tikz}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\usetikzlibrary{arrows.meta}
\usepgfplotslibrary{fillbetween}
\begin{document}
% the text of draw.graph.tikz()
\end{document}
```

## What cannot be written

- The axes of the graph must go to the right and up: a graph with oblique or reversed axes is a `NotImplementedError`.
- A picture that is larger than what TeX can hold (16 383 points) is an `InvalidArgumentError`.
- A color that is neither hexadecimal nor a name of CSS is an `InvalidArgumentError`.

```js
const oblique = new PiGraph(container, {axis: {x: {x: 50, y: 10}, y: {x: 0, y: -50}}})
oblique.tikz() // throws NotImplementedError

const huge = new PiDraw(container, {parameters: 'x=-500:500,y=-1:1'})
huge.graph.tikz() // throws InvalidArgumentError
```
