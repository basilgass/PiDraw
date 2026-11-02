PiDraw - geometric illustration
=============

PiDraw is a script designed to create and generate geometrical illustration.
It is based above svg.js to display the graphics. PiDraw comes also with a *parser*, which is a "text to graphical
illustration" application.

This application is made for **me** and I'm glad to share it :)

*Made with Love and LOTS of coffee :)*

## `class Draw`

The `Draw` class is the main class. It is simply created with:

```ts
const draw = new Draw(element
:
<id | HTMLElement>, config ? : IParserConfig
)
```

`config` is an object describing the display and the constructions

```ts
interface IParserConfig {
    parameters?: string,
    code?: string
    tex?: TeXConverterType,
}
```

### `parameters`

`parameters` is a string code, defined by `<key1>[=<value1>],<key1>[=<value1>],...`. For example, a complete
`parameters` string could be

```ts
parameters = "axis,grid->subgrid=2,x=-5:10,y=-2:9,unitX=1.2"
```

| key                | value                          | description                                                                              |
|--------------------|--------------------------------|------------------------------------------------------------------------------------------|
| x, y               | `min:max` or `n`               | the part of the coordinate system that is drawn (`x=6` is `x=-6:6`; a bound can be `2pi`) |
| box                | `n`, `a;b` or `min:max`        | `x` and `y` together (`box=5` is `x=-5:5,y=-5:5`)                                       |
| unitX, unitY       | `<number>`                     | the length of a unit in cm (1 by default): the drawing has its real size                  |
| axis, axisX, axisY | word, or a step                | shows the axes (`axisX`: only that one)                                                   |
| grid, gridX, gridY | word, or a step                | shows the grid; the option `subgrid=n` cuts each step in `n` (`grid->subgrid=4`)         |
| default.label      | word                           | the points have a label                                                                  |
| default.tex        | word                           | the labels are written in LaTeX                                                          |
| default.points     | `no`, `o`, `s`, `*` + size      | hides the points, or gives their shape                                                   |

An entry can have options after `->` (`grid=2->red,w=5`); a double comma `,,` ends them. See `docs/parser.md`.

### `code`

`code` describes the geometric figures to be created. Each line of the string is a figure.

#### code `points`
- `A(x,y)` create a point at coordinates `x` and `y`
- `A(x,y)->drag` creates a point at coordinates `x` and `y` and make it draggable.

#### code `line / ray / segment`
- `d=AB` creates an infinite line through the points `A` and `B`. These points must be created *before*
- `d=AB.` creates a segment from the point `A` to `B`.
- `d=vAB` creates a vector from the point `A` to `B`.
- `d=AB[` creates a ray from the point `A` through `B`.

#### code `plot`
- `f(x)=x^2-4x+2` or `f=plot x^2-4x+2` creates a plot using the *natural math language* (asciiMath).

## `class Graph`

Graph is the root class to display the illustration. Even if it's possible to use it directly, this class is designed to
be used in conjunction with the Draw class.

```ts
const graph = new Graph(element
:
id | HTMLElement, config
:
IGraphConstructorConfig
)
```

`config` is an object describing the global configuration of the illustration:

```ts
interface IGraphConstructorConfig {
    width?: number,
    height?: number,
    origin?: { x: number, y: number },
    system?: cartesian_2d | polar,
    axis?: {
        x: { x: number, y: number }
        y: { x: number, y: number }
    },
    display?: {
        axis?: boolean | { x: IAxisDisplay | false, y: IAxisDisplay | false },
        grid?: boolean | IGridConfig,
    },
    tex?: (value: string) => string
}
```

### config

| key     | value                                              | default                                | description                                                                                                                                                                                       |
|---------|----------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| width   | `number`                                           | `800`                                  | width of the svg viewbox in pixels                                                                                                                                                                |                
| height  | `number`                                           | `600`                                  | width of the svg viewbox in pixels                                                                                                                                                                | 
| origin  | `{x:number,y:number}`                              | `{x: 400, y: 300}`                     | origin of the axis, from the top left of the viewbox.                                                                                                                                             |
| system  | `string`                                           | `"cartesian_2d"`                       | type of coordinate system.<br/>Allowed values: `cartesian_2d` or `polar`                                                                                                                          |
| axis    | `{x: {x:number,y:number}, y:{x:number,y:number}}`  | one cm per unit (37.94 px)             | x and y axis. Each axis is defined by it's vector in pixels, with the y-axis inverted                                                                                                             |
| display | `{axis, grid}`                                     | `{grid: true, axis: true}`             | `grid`: hide, show, or the config of the grid (`step`, `subdivisions`) <br/> `axis`: show or hide the axes, or each one                                                                           |
| tex     | `(value:string)=>string`                           | none                                   | the TeX converter (I'm using katex). Without it the text of an HTML label is written as text, never read as HTML                                                                                  |

