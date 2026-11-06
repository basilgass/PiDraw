# Buttons

A drawing can have buttons that show and hide figures: a solution that appears when the student asks for it, the areas of a function one by one, a construction that the teacher reveals in the order of the lesson. The code only says *which figures go with which button*; the program draws the buttons, with a [`Buttons`](./code#buttons) made with the graph. The examples of this page are alive: the buttons under a drawing show and hide the figures.

Several figures can share a button: they appear and go together. Without a `Buttons`, the buttons mean nothing and every figure is shown.

## Declare a button: `@button`

```
@button=<id>
@button=<id>-><title=Text>
```

A button is declared on a line of its own, **above** the figures that use it. Its `id` is a word (letters, digits and `_`). The title is what the button says: the text up to the end of the line, with the commas and the spaces inside it. When there is no title, the button says its `id`.

```pidraw params="x=-1:10,y=-1:10,axis,grid"
f(x)=x/3+6
g(x)=1/8(2x-8)^2+2
@button=between->title=Between f and g
@button=under_f->title=Under f
a=fill f,g,1.05:7.6->fill=yellow/0.3,!,toggle=between
b=fill f,1.05:7.6->fill=green/0.3,!,toggle=under_f
```

## Tie a figure to a button: `toggle`

```
toggle=<id>
toggle=<id>/<seconds>
```

`toggle=between` ties the figure to the button `between`. The figure takes the **whole figure**: its shape and its label. After a slash, the number of seconds that the figure takes to fade in or out; without it, the figure appears at once, as `0` does.

```pidraw params="x=-1:10,y=-1:10,axis,grid"
f(x)=x/3+6
g(x)=1/8(2x-8)^2+2
@button=between->title=Between f and g
@button=under_g->title=Under g
a=fill f,g,1.05:7.6->fill=yellow/0.3,!,toggle=between/0.5
c=fill g,1.05:7.6->fill=red/0.3,!,toggle=under_g/2
```

The area between the curves takes half a second to appear, the one under `g` two seconds. A figure that appears and goes in the middle of a fade goes back from where it is.

## What the button does to a figure

A figure starts as its line says: hidden with [`!`](./options#visibility), shown without. **A press reverses every figure of the button.** In the examples above, all the areas start hidden, so the first press shows them and the second hides them.

```pidraw params="x=-1:7,y=-1:5,axis"
@button=middle->title=The middle
A(1,1)->label
B(5,3)->label
s=seg A,B->red
M=mid A,B->blue,label,toggle=middle/0.5
```

`M` has no `!`: it is shown, and its button hides it. A button can hold figures that start differently. They stay opposite: when one is shown, the other one is hidden.

```pidraw params="x=-1:7,y=-1:5,axis"
@button=swap->title=Swap
A(1,1)->label,toggle=swap
B(5,3)->label,!,toggle=swap
```

`!` on a line that has a `toggle` means *hidden until the button is pressed*. It hides the label too, unlike a `!` alone, which hides the shape and keeps the label: a button shows and hides the whole figure.

## With the steps of a presentation

A figure that a button hides and a [step](./slides) hides is shown only when none of them hides it.

```pidraw params="x=-1:7,y=-1:5,axis"
@button=middle->title=The middle
A(1,1)->label
@pause
B(5,3)->label
s=seg A,B->red
M=mid A,B->blue,label,toggle=middle
```

## The TikZ export

The [TikZ export](./tikz) writes what the drawing shows at that moment: a figure that a button hides is not written, and is when it is pressed.

## Mistakes

```pidraw params="x=-1:7,y=-1:5" errors="2,3,4,5,6"
@button=a
A(1,1)->toggle=b
@button=a
B(2,2)->toggle=a/-1
@button
C(3,3)->toggle
```

| Line | What is wrong |
|---|---|
| 2 | the button `b` is not declared above this line |
| 3 | the button `a` is declared already |
| 4 | the duration is a number of seconds from 0 |
| 5 | `@button` needs the id of the button: `@button=a` |
| 6 | `toggle` needs the id of a button |

A button declared **after** the figure that names it is the same error as line 2: the declaration comes first.
