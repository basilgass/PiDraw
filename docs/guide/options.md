# Options

The options of a line are written after the `->`, separated by commas. These ones work on every figure; the ones that belong to one kind of figure (`sector` of an arc, `close` of a Bézier curve, `ticks` of an axis...) are on the page of that figure. The options are applied in the order they are written.

An option that does not exist (`->colr=red`), that is not made for the figure (`close` on a circle, `drag` on anything but a point), or whose value is not valid (`w=red`, `color=red/2`) is an error that names the option and the figure. The options written before it are applied, and the other figures are drawn.

| Group | Options |
|---|---|
| [Stroke and fill](#stroke-and-fill) | `w`, `ultrathin`, `thin`, `thick`, `ultrathick`, `color`, a color name, `fill`, `dash`, `dot`, `mark` |
| [Visibility](#visibility) | `hide`, `!`, `?`, `_`, `static` |
| [Labels](#labels) | `label`, `tex` |
| [Move and scale](#move-and-scale) | `move`, `scale` |
| [Interaction](./interaction) | `drag`, `animate`, `from`, `to`, `duration`, `delay`, `easing`, `loop` |
| [Slides](./slides) | `slide` |

## Stroke and fill

| Option | Description |
|---|---|
| `w=3` | the width of the stroke, a number |
| `ultrathin`, `thin`, `thick`, `ultrathick` | a stroke of 0.5, 0.75, 2.5 or 4 |
| `color=red`, `red` | the color of the stroke. A color name alone is the same as `color=` |
| `color=red/0.5` | the color of the stroke with an opacity, from 0 to 1 |
| `fill=blue`, `fill=blue/0.3` | the color of the fill, with an opacity or not |
| `dash`, `dash=5`, `dash=5 2`, `dash=none` | a dashed stroke: half a unit by default, or lengths in pixels (the dash, then the gap), or `none` for a continuous stroke |
| `dot` | a dotted stroke |
| `mark` | an arrow, or another marker, on the ends: see [markers](#markers) |

```pidraw params="x=-1:7,y=-1:5"
A(1,1)
B(6,1)
a=seg A,B->w=4,red
b=seg A,B->ultrathin
c=circ A,1->color=blue/0.5,fill=lightblue/0.3,thick
d=poly B,1,5->fill=orange/0.4,dash
```

```pidraw params="x=-1:7,y=-1:5"
A(1,1)
B(6,1)
C(1,2)
D(6,2)
E(1,3)
F(6,3)
G(1,4)
H(6,4)
a=seg A,B->ultrathin
b=seg C,D->thin
c=seg E,F->thick
d=seg G,H->ultrathick
```

The colors that can be written alone are `black`, `white`, `red`, `green`, `blue`, `cyan`, `magenta`, `yellow`, `gray`, `grey`, `darkgray`, `darkgrey`, `lightgray`, `lightgrey`, `brown`, `lime`, `olive`, `orange`, `pink`, `purple`, `teal` and `gold`. `color=` and `fill=` accept any name of color of CSS, and a hexadecimal color (`color=#ff8800`).

```js
const draw = new PiDraw(container, {code: 'A(1,1)->w=3,color=#ff8800/0.5\nB(2,1)->thin\nC(3,1)->ultrathick,blue'})
const {A, B, C} = draw.graph.figures

A.appearance.stroke.width // 3
A.appearance.stroke.color // #ff8800
A.appearance.stroke.opacity // 0.5
B.appearance.stroke.width // 0.75
C.appearance.stroke.width // 4
C.appearance.stroke.color // blue
```

```pidraw params="x=-1:7,y=-1:6"
A(1,1)
B(6,1)
C(1,2.5)
D(6,2.5)
E(1,4)
F(6,4)
a=seg A,B->dash,red
b=seg C,D->dash=3 6,blue
c=seg E,F->dot,green
```

### Markers

`mark` puts an arrow, or another marker, on the ends of a figure that is drawn as a line: a line, a segment, a ray, a Bézier curve, an arc, a function, a polygon or a path. A point or a circle with `mark` is an error.

| Option | Description |
|---|---|
| `mark` | a marker at both ends |
| `mark=start`, `mark=end`, `mark=both` | a marker at the start, at the end, or at both |
| `mark=none` | removes the markers |
| `mark=end/20` | the size of the marker, 10 by default |
| `mark=end/x`, `mark=end/\|` | the shape: an arrow by default, `x` for a cross, `\|` for a bar. The size and the shape go in any order: `mark=both/x/12` |

The marker takes the color and the width of the stroke, whatever the order of the options.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)
B(6,1)
C(1,2.5)
D(6,2.5)
E(1,4)
F(6,4)
a=seg A,B->mark=end,red
b=seg C,D->mark=both/x/12,blue
c=seg E,F->mark=start/20,thick,green
```

## Visibility

| Option | Description |
|---|---|
| `hide` | hides the figure and its label |
| `!` | hides the figure and keeps its label |
| `?` | hides the label and keeps the figure |
| `_` or `static` | the figure is static: it is not drawn again when what it depends on moves |

```pidraw params="x=-1:7,y=-1:4"
A(1,2)->label
B(3,2)->label,hide
C(5,2)->label,!
D(6,2)->label,?
```

A static figure keeps what it was drawn with when something it depends on moves; it is drawn again only when the whole graph is (a new scale, for instance). `_` is the short form of `static`. It saves work for the figures that never change, in a drawing with many of them.

```pidraw params="x=-1:7,y=-1:4"
A(1,2)->_,label
B(4,2)->static,label
s=seg A,B
```

```js
const draw = new PiDraw(container, {code: 'A(1,1)\nB(4,2)\nM=mid A,B->static\nN=mid A,B'})
const {A, M, N} = draw.graph.figures
const before = M.pixels.x

// A point moves, and the figures that depend on it are drawn again... but the static one
A.pixels = {x: A.pixels.x + 40, y: A.pixels.y}
draw.graph.update([A])

M.pixels.x === before // true
N.pixels.x === before // false
```

A hidden figure still exists: the figures built on it are drawn, and a line can go through a point that is hidden. `default.points=no` hides all the points, the same way as `!`.

```js
const draw = new PiDraw(container, {code: 'A(1,1)->hide\nB(2,1)->static\nC(3,1)->_'})
const {A, B, C} = draw.graph.figures

A.element.css('display') // none
B.static // true
C.static // true
```

## Labels

```
label
label=<text>
label=<text>/<position>/<shift>/<rotation>
tex=<text>/<position>/<shift>/<rotation>
```

`label` writes a text next to the figure: its name, or the text you give. `tex` writes a TeX formula (see [getting started](./getting-started#labels-in-tex)). All the parts after the text are optional.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label
B(3,1)->label=point B
C(5,1)->label=C/tl
```

### The text

The text of `label` and of `tex` is kept as it is written, and it goes up to the next option. It may hold commas, and it is a text even when it looks like a number (`label=2` writes `2`, not the name of the figure).

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label=Hello, world
B(4,1)->label=One, two, three,red
C(1,3)->label=2
```

A word of the text that is the name of an option ends the text: `label=a,red` is the text `a` and the color red. To write a comma that is followed by such a word, escape it with a backslash (`label=a\,red`). A word that is not the name of an option is part of the text: `label=Hello,rde` writes `Hello,rde`, which the drawing shows, and not an error.

### The position

The position says which part of the label is at the figure. It has two letters (or one, see below): the first is the height, `t` for top, `m` for middle or `b` for bottom, and the second the side, `l` for left, `c` for center or `r` for right. So `tl` puts the label above the figure and to its left, `br` (the default) below and to the right, and `mc` centers it on the figure.

| | left | center | right |
|---|---|---|---|
| **top** | `tl` | `tc` | `tr` |
| **middle** | `ml` | `mc` | `mr` |
| **bottom** | `bl` | `bc` | `br` |

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label=tl/tl
B(3,1)->label=tc/tc
C(5,1)->label=tr/tr
D(1,2.5)->label=ml/ml
E(3,2.5)->label=mc/mc
F(5,2.5)->label=mr/mr
G(1,4)->label=bl/bl
H(3,4)->label=bc/bc
I(5,4)->label=br/br
```

A single letter is a shortcut: it replaces the same part of the default `br` and keeps the other. A height (`t`, `m`, `b`) keeps the right side, so `t` is `tr` and `m` is `mr`. A side (`l`, `c`, `r`) keeps the bottom, so `l` is `bl` and `c` is `bc`.

```pidraw params="x=-1:7,y=-1:3"
A(1,1)->label=t/t
B(3,1)->label=m/m
C(5,1)->label=l/l
D(1,2.5)->label=c/c
```

Any other position is an error. Without a position, the figure keeps its own (`br`, or the one it chooses from where its label lies).

### Shift and rotation

The shift is a pair `x;y` in units of the graph, added to the place of the label. The rotation is an angle in degrees, clockwise on the screen, around the figure. For a line, an empty rotation (`label=d/t/0;0/`) turns the label with the line.

```pidraw params="x=-1:7,y=-1:5"
A(1,1)->label=A/tl/0.5;0.5
B(4,1)->label=B/tl/0;0/-30
C(1,3)
D(6,4)
d=line C,D->label=d/tc/0;0/
```

### Values in a label

In the text, `@` is a value that the figure computes. It is kept up to date when the figure moves (dragging, animation).

| Figure | Value of `@` |
|---|---|
| point | its coordinates: `(x;y)` |
| segment | its length, in units of the graph |
| area (`fill`) | the area |
| Riemann sum (`riemann`) | the sum |

`@.n` writes `n` decimals (2 by default). Every `@` of the text is replaced. On the other figures (a line, a circle...), `@` is a character like another.

```pidraw params="x=-1:7,y=-1:5"
A(1.23456,2)->label=A@
B(4.5,2)->label=B@.4/tl
C(2,4)
s=seg A,C->label=@.1
```

```js
const draw = new PiDraw(container, {code: 'A(1.23456,2)->label=A@\nB(4,2)->label=B@.4\nC(0,0)\ns=seg A,C->label=@.1\nd=line A,B->label=@'})
const {A, B, s, d} = draw.graph.figures

A.label.displayName // A(1.23;2)
B.label.displayName // B(4;2)
s.label.displayName // 2.4
d.label.displayName // @
```

### Letters and subscripts

With `tex`, a label of a letter and a digit is written with a subscript: `tex=A1` is `A_1`.

```pidraw params="x=-1:6,y=-1:4"
A1(1,1)->tex
B(3,2)->tex=\alpha/tl
C(5,1)->tex=\frac{1}{2}/br
```

## Move and scale

| Option | Description |
|---|---|
| `move=2;3` | moves the shape by a vector, in units. A number alone is a move along the x axis: `move=2` |
| `scale=2` | scales the shape around its center. `scale=2;3` has a factor for each axis |

These options change the shape that is drawn, and nothing else: the label stays where it is, and the figures built on it are not moved.

```pidraw params="x=-1:8,y=-1:5"
A(1,1)
B(4,1)->move=0;2
c=circ A,0.5->scale=2,blue
d=circ B,0.5->scale=2;1,red
```

```js
const draw = new PiDraw(container, {code: 'A(1,1)->move=2;0'})
const plain = new PiDraw(container, {code: 'A(1,1)'})

// The point is still at (1;1): only its shape moved.
draw.graph.figures.A.pixels.x === plain.graph.figures.A.pixels.x // true
```

## Mistakes

```pidraw params="x=-1:6,y=-1:4" errors="2,3,4,5,6,7,8,9,10,11,12"
A(1,1)
B(2,1)->w=red
C(3,1)->color=red/2
D(4,1)->color
E(1,2)->dash=x
f=seg A,B->mark=3
G(3,2)->label=G/x
H(4,2)->move=a
I(1,3)->scale=a
J(2,3)->colr=red
k=circ A,1->mark
l=circ A,1->sector
```

| Line | What is wrong |
|---|---|
| 2 | `w` is a number |
| 3 | an opacity is from 0 to 1 |
| 4 | `color` needs a color |
| 5 | a dash is a number, two numbers, or `none` |
| 6 | a marker is at `start`, `end`, `both` or `none` |
| 7 | `x` is not a position: a position is two letters (`tl`) or one of `t`, `m`, `b`, `l`, `c`, `r` |
| 8, 9 | a move or a scale is a number, or a pair `x;y` |
| 10 | `colr` is not an option |
| 11 | a circle cannot carry a marker |
| 12 | `sector` is the option of an arc |
