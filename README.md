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
parameters = "axis,grid,ppu=80,x=-5:10,y=-2:9,subgrid=2"
```

| key     | value               | description                                                |
|---------|---------------------|------------------------------------------------------------|
| axis    | `null`              | if `axis` is given, the axis are displayed                 |
| grid    | `null`              | if `grid` is given, the grids are displayed                |
| subgrid | `<number>`          | number of subdivisions of the grid                         |
| x       | `<number>:<number>` | gives the `x-axis` min and max value, separated by `:`     |
| y       | `<number>:<number>` | gives the `y-axis` min and max value, separated by `:`     |
| ppu     | `<number>`          | points per unit - used to defined the scale of the viewbox |

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
    ppu?: number,
    system?: cartesian_2d | polar,
    axis?: {
        x: { x: number, y: number }
        y: { x: number, y: number }
    },
    display?: {
        axis?: boolean | {
            x: boolean | number | IAxisConfig,
            y: boolean | number | IAxisConfig
        },
        grid?: boolean,
        subgrid?: number,
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
| ppu     | `number`                                           | `50`                                   | points per unit. With the default `width` at `800`, the `x-axis` will have `800/50=16 units`                                                                                                      |
| system  | `string`                                           | `"cartesian_2d"`                       | type of coordinate system.<br/>Allowed values: `cartesian_2d` or `polar`                                                                                                                          |
| axis    | `{x: {x:number,y:number}, y:{x:number,y:number}}`  | `{x: {x: 50, y: 0}, y: {x: 0, y:-50}}` | x and y axis. Each axis is defined by it's vector in pixels, with the y-axis inverted                                                                                                             |
| display | `{axis: boolean, grid: boolean, subgrid: number }` | `{grid: true, subgrid: 0, axis: true}` | `grid`: hide or show the <br/> `subgrid`: set a subgrid, defined by the number of subdivision (0=no subgrid, 1=one subdivision) <br/> `axis`: show or hide the grid (TODO: more possibilities...) |
| tex     | `(value:string)=>string`                           | `(value)=>value`                       | the TeX converter (I'm using katex)                                                                                                                                                               |

