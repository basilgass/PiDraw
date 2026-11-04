# PiDraw

Draw geometry and function plots in SVG from a short text syntax. Made for teachers: describe points, lines, circles, polygons and
curves in a few lines, let students move the points, and export the drawing to TikZ.

**Documentation: https://basilgass.github.io/PiDraw/**

```ts
import {PiDraw} from 'pidraw'

new PiDraw('figure', {
    parameters: 'x=-1:7,y=-1:5,axis,grid',
    code: `
        A(1,1)->drag,label
        B(6,4)->drag,label
        M=mid A,B->red,label
        d=line A,B->dash
    `
})
```

Each line makes a figure and may use the figures named above it: drag `A` or `B`, and the midpoint and the line follow.
A line that is not valid never stops the others: `refresh` gives a report, line by line, that an editor can show.

## What the site has

- a guide to the syntax, with an example of each kind of figure and each option, all of them built when the documentation is;
- a demo with an editor that underlines the lines that are not valid;
- the API reference.

## Development

```bash
npm install
npm run test          # tests, with the examples of the documentation
npm run test:quick    # while you work
npm run docs:dev      # the site, in your browser
npm run docs:check    # builds every example of the documentation
npm run docs:build    # docs:check, the API reference, and the site
npm run build         # the library (dist/, types/)
```

The rules of the project are in `.claude/guideline.md`.

## License

MIT. Basil Gass.
