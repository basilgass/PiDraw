import {type PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure"
import {type buildInterface, type IGraphConfig} from "../pidraw.common"
import {buildArc, buildCircle} from "./buildCircle"
import {buildLine} from "./buildLine"
import {buildFillBetween, buildFollow, buildParametric, buildPlot, buildRiemann} from "./buildPlot"
import {buildPoint} from "./buildPoint"
import {buildPolygon} from "./buildPolygon"
import {buildBezier} from "./buildBezier"
import {buildIntersection} from "./buildIntersection"

// TODO: add the build and create parameters to make it easily accessible and extensible.
export interface parser_item {
    build: (values: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => buildInterface<unknown> | buildInterface<unknown>[] | null,
    code: string,
    description: string,
    name: string,
    option?: string
    parameters: string[],
}
export const parser_config: Record<string, parser_item> = {
    pt: {
        name: 'point',
        description: 'Create a point',
        code: 'A(3,4)',
        parameters: ['drag', 'drag:grid', 'drag:axis', 'drag:x', 'drag:y', 'drag:<figure>'],
        build: buildPoint,
    },
    vpt: {
        name: 'point from vector',
        description: 'Create a point from a vector and a starting point',
        code: 'A=vpt <point>,<point>,<scale?>,<starting point?>',
        parameters: [],
        build: buildPoint,
    },
    dpt: {
        name: 'point from direction line',
        description: 'Create a point from a line and a starting point',
        code: 'A=vpt <point>,<line>,<distance>,<perpendicular?>',
        parameters: [],
        build: buildPoint,
    },
    mid: {
        name: 'mid',
        description: 'Create the middle of two points',
        code: 'A=mid <point>,<point>',
        parameters: [],
        build: buildPoint,
    },
    proj: {
        name: 'projection',
        description: 'Create the projection of a point on a line',
        code: 'A=proj <point>,<line>',
        parameters: [],
        build: buildPoint,
    },
    inter: {
        name: 'intersection',
        description: 'Create the intersection of two lines',
        code: 'A=inter <line|circle>,<line|circle>',
        parameters: [],
        build: buildIntersection,
    },
    sym: {
        name: 'symmetry',
        description: 'Create the symmetry of a point',
        code: 'A=sym <point>,<point|line>',
        parameters: [],
        build: buildPoint,
    },
    line: {
        name: 'line',
        description: 'Create a line, a half line or a segment',
        code: 'd=<line> | <line>[ | <line>.',
        parameters: ['dash', 'dot'],
        build: buildLine,
    },
    vec: {
        name: 'vector',
        description: 'Create a vector',
        code: 'd=v<line>',
        parameters: [],
        build: buildLine,
    },
    seg: {
        name: 'segment',
        description: 'Create a segment through two points',
        code: 's=<A><B>.',
        parameters: [],
        build: buildLine,
    },
    ray: {
        name: 'ray (half line)',
        description: 'Create a line, a half line or a segment',
        code: 'd=<line> | <line>[ | <line>.',
        parameters: ['dash', 'dot'],
        build: buildLine,
    },
    perp: {
        name: 'perpendicular',
        description: 'Create the perpendicular of a line from a point',
        code: 'd=perp <line>,<point>',
        parameters: [],
        build: buildLine,
    },
    para: {
        name: 'parallel',
        description: 'Create a parallel line from a point',
        code: 'd=para <line>,<point>',
        parameters: [],
        build: buildLine,
    },
    med: {
        name: 'mediator',
        description: 'Create the mediator of two points',
        code: 'd=med <point>,<point>',
        parameters: [],
        build: buildLine,
    },
    // tangent: {
    // name: 'tangent',
    //     description: 'Create a tangent line from a point to a circle',
    //     code: 'd=tan <point>,<point>',
    //     parameters: []
    // },
    bis: {
        name: 'bisector',
        description: 'Create the bisector of an angle',
        code: 'd=bis <point>,<point>,<point>',
        parameters: [],
        build: buildLine
    },
    circ: {
        name: 'circle',
        description: 'Create a circle',
        code: 'c=circ <point>,<radius>',
        parameters: [],
        build: buildCircle,
    },
    arc: {
        name: 'arc',
        description: 'Create an arc',
        code: 'c=arc <point>,<point>,<point>[,<number>]',
        parameters: [],
        build: buildArc,
    },
    plot: {
        name: 'plot',
        description: 'Plot a function',
        code: 'f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]',
        parameters: [],
        build: buildPlot,
    },
    parametric: {
        name: 'parametric',
        description: 'Plot a parametric function',
        code: 'f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]',
        parameters: [],
        build: buildParametric,
    },
    bezier: {
        name: 'bezier',
        description: 'bezier curve through points',
        code: 'b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>',
        parameters: [],
        build: buildBezier,
    },
    poly: {
        name: 'polygon',
        description: 'Create a polygon',
        code: 'p=poly <point>,<point>,<point>,...',
        parameters: [],
        build: buildPolygon,
    },
    reg: {
        name: 'regular',
        description: 'Create a regular polygon',
        code: 'p=reg <center>,<radius>,<sides>',
        parameters: [],
        build: buildPolygon,
    },
    follow: {
        name: 'follow',
        description: 'Create a tangent that follows a function',
        code: 'f=follow <function>,<tangent?>',
        parameters: [],
        build: buildFollow,
    },
    fill: {
        name: 'fillbetween',
        description: 'Fill the area between two functions',
        code: 'f=fill <function>,<function?>,<domain?>',
        parameters: [],
        build: buildFillBetween,
    },
    riemann: {
        name: 'riemann',
        description: 'Create a Riemann sum',
        code: 'f=riemann <function>,<domain>,<number>,<position>',
        parameters: [],
        build: buildRiemann,
    }
}
