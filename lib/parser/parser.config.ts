import { AbstractFigure } from "../figures/AbstractFigure"
import { IGraphConfig } from "../pidraw.common"
import { buildArc, buildCircle } from "./buildCircle"
import { buildLine } from "./buildLine"
import { buildFillBetween, buildFollow, buildParametric, buildPlot, buildRiemann } from "./buildPlot"
import { buildPoint } from "./buildPoint"
import { buildPolygon } from "./buildPolygon"
import { IParser } from "./parser.common"

// TODO: add the build and create parameters to make it easily accessible and extensible.
export const parser_config: Record<string, {
    name: string,
    description: string,
    code: string,
    parameters: string[]
    build: (values: IParser, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown,
    create: string
}> = {
    point: {
        name: 'point',
        description: 'Create a point',
        code: 'A(3,4)',
        parameters: ['drag', 'drag:grid', 'drag:axis', 'drag:x', 'drag:y', 'drag:<figure>'],
        build: buildPoint,
        create: 'point'
    },
    mid: {
        name: 'mid',
        description: 'Create the middle of two points',
        code: 'A=mid <point>,<point>',
        parameters: [],
        build: buildPoint,
        create: 'point'
    },
    proj: {
        name: 'projection',
        description: 'Create the projection of a point on a line',
        code: 'A=proj <point>,<line>',
        parameters: [],
        build: buildPoint,
        create: 'point'
    },
    intersection: {
        name: 'intersection',
        description: 'Create the intersection of two lines',
        code: 'A=inter <line>,<line>',
        parameters: [],
        build: buildPoint,
        create: 'point'
    },
    symmetry: {
        name: 'symmetry',
        description: 'Create the symmetry of a point',
        code: 'A=sym <point>,<point|line>',
        parameters: [],
        build: buildPoint,
        create: 'point'
    },
    line: {
        name: 'line',
        description: 'Create a line, a half line or a segment',
        code: 'd=<line> | <line>[ | <line>.',
        parameters: ['dash', 'dot'],
        build: buildLine,
        create: 'line'
    },
    vector: {
        name: 'vector',
        description: 'Create a vector',
        code: 'd=v<line>',
        parameters: [],
        build: buildLine,
        create: 'line'
    },
    perp: {
        name: 'perpendicular',
        description: 'Create the perpendicular of a line from a point',
        code: 'd=perp <line>,<point>',
        parameters: [],
        build: buildLine,
        create: 'line'
    },
    para: {
        name: 'parallel',
        description: 'Create a parallel line from a point',
        code: 'd=para <line>,<point>',
        parameters: [],
        build: buildLine,
        create: 'line'
    },
    med: {
        name: 'mediator',
        description: 'Create the mediator of two points',
        code: 'd=med <point>,<point>',
        parameters: [],
        build: buildLine,
        create: 'line'
    },
    // tangent: {
    // name: 'tangent',
    //     description: 'Create a tangent line from a point to a circle',
    //     code: 'd=tan <point>,<point>',
    //     parameters: []
    // },
    // bisector: {
    // name: 'bisector',
    //     description: 'Create the bisector of an angle',
    //     code: 'd=bis <point>,<point>,<point>',
    //     parameters: []
    // },
    circ: {
        name: 'circle',
        description: 'Create a circle',
        code: 'c=circ <point>,<radius>',
        parameters: [],
        build: buildCircle,
        create: 'circle'
    },
    arc: {
        name: 'arc',
        description: 'Create an arc',
        code: 'c=arc <point>,<point>,<point>[,<number>]',
        parameters: [],
        build: buildArc,
        create: 'arc'
    },
    plot: {
        name: 'plot',
        description: 'Plot a function',
        code: 'f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]',
        parameters: [],
        build: buildPlot,
        create: 'plot'
    },
    parametric: {
        name: 'parametric',
        description: 'Plot a parametric function',
        code: 'f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]',
        parameters: [],
        build: buildParametric,
        create: 'parametric'
    },
    poly: {
        name: 'polygon',
        description: 'Create a polygon',
        code: 'p=poly <point>,<point>,<point>,...',
        parameters: [],
        build: buildPolygon,
        create: 'polygon'
    },
    reg: {
        name: 'regular',
        description: 'Create a regular polygon',
        code: 'p=reg <center>,<radius>,<sides>',
        parameters: [],
        build: buildPolygon,
        create: 'polygon'
    },
    follow: {
        name: 'follow',
        description: 'Create a tangent that follows a function',
        code: 'f=follow <function>,<tangent?>',
        parameters: [],
        build: buildFollow,
        create: 'follow'
    },
    fillbetween: {
        name: 'fillbetween',
        description: 'Fill the area between two functions',
        code: 'f=fill <function>,<function?>,<domain?>',
        parameters: [],
        build: buildFillBetween,
        create: 'fillbetween'
    },
    riemann: {
        name: 'riemann',
        description: 'Create a Riemann sum',
        code: 'f=riemann <function>,<domain>,<number>,<position>',
        parameters: [],
        build: buildRiemann,
        create: 'riemann'
    }
}
