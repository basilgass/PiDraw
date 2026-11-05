---
aside: false
---

# Demo

Pick an example, change the code, and the drawing follows. The code runs in your browser, against the library.

<ClientOnly>
    <Playground />
</ClientOnly>

## How it works

- The drawing is made again at each key, but only from the first line that changed: the lines above it keep their figures, so typing stays fast in a long code.
- A line that is not valid is underlined, with the reason when you put the mouse on it, and listed under the editor. The line that has the cursor is the one you are typing: if it is not valid, the figure it had stays, and its problem is shown in a lighter color.
- The parameters of the graph are the field above the editor. See [the graph](./guide/graph).
- **Reset** puts the points that you dragged back where the code says, and stops the animation.
- **TikZ** shows what [`graph.tikz()`](./guide/tikz) writes for the drawing.

The syntax is explained in [getting started](./guide/getting-started) and [syntax](./guide/syntax). To put the same editor in your own page, the report of `refresh` gives what an editor needs: see [errors and editing](./guide/errors).
