import type {PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {buildInterface, IGraphConfig} from "../pidraw.common"
import {buildArc} from "../figures/Arc/Arc.parser"
import {buildAxis} from "../figures/Axis/Axis.parser"
import {buildCircle} from "../figures/Circle/Circle.parser"
import {buildLine} from "../figures/Line/Line.parser"
import {buildFillBetween} from "../figures/FillBetween/FillBetween.parser"
import {buildGrid} from "../figures/Grid/Grid.parser"
import {buildFollow} from "../figures/Follow/Follow.parser"
import {buildParametric} from "../figures/Parametric/Parametric.parser"
import {buildPath} from "../figures/Path/Path.parser"
import {buildPlot} from "../figures/Plot/Plot.parser"
import {buildRiemann} from "../figures/Riemann/Riemann.parser"
import {buildIntersection, buildPoint} from "../figures/Point/Point.parser"
import {buildPolygon} from "../figures/Polygon/Polygon.parser"
import {buildBezier} from "../figures/Bezier/Bezier.parser"
import {ALTERNATIVE} from "./parser.common"

// TODO: add the build and create parameters to make it easily accessible and extensible.
// TODO: ajouter l'ellipse
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
        name: 'point from two points',
        description: 'Create a point from a vector defined by two points and a starting point',
        code: 'A=vpt <point>,<point>,<scale?>,<starting point?>',
        parameters: [],
        build: buildPoint,
    },
    dpt: {
        name: 'point from direction line',
        description: 'Create a point from a line and a starting point',
        code: 'A=dpt <point>,<line>,<distance>,<perpendicular?>',
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
    eval: {
        name: 'evaluate function',
        description: 'Evaluate a funciton at a value',
        code: 'A=eval f,3',
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
    tan: {
        name: 'tangent',
        description: 'Create a tangent line from a <circle|plot> by a Point',
        code: 'd=tan <circle|plot>,<point>',
        parameters: [],
        build: buildLine,
    },
    bis: {
        name: 'bisector',
        description: `Create the bisector of an angle (three points), or of two lines or axes (a last ${ALTERNATIVE} for the other bisector)`,
        code: `d=bis <point>,<point>,<point> | d=bis <line>,<line>[,${ALTERNATIVE}]`,
        parameters: [],
        build: buildLine
    },
    circ: {
        name: 'circle',
        description: `Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last ${ALTERNATIVE} for the inscribed circle), from a center and a tangent line, or from a diameter A:B`,
        code: `c=circ <point>,<radius> | c=circ <point>,<line> | c=circ <point>,<point>,<point>[,${ALTERNATIVE}] | c=circ <point>:<point>`,
        parameters: [],
        build: buildCircle,
    },
    arc: {
        name: 'arc',
        description: `Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last ${ALTERNATIVE} for the other arc)`,
        code: `a=arc <point>,<point>,<point>[,<radius>][,${ALTERNATIVE}] | a=arc <point>,<number>,<number>,<number>[,${ALTERNATIVE}] | a=arc <point>,<point>,<number>[,<radius>][,${ALTERNATIVE}]`,
        parameters: ['sector', 'square', 'acute'],
        build: buildArc,
    },
    plot: {
        name: 'plot',
        description: 'Plot a function, or the parabola through three points (a line if they are aligned)',
        code: 'f(x)=<function>[@<number>,<domain>,<image>] | f=plot <function>[@<number>,<domain>,<image>] | f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]',
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
        description: `Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last ${ALTERNATIVE}, the curve pulled by 3 or 4 control points`,
        code: `b=bezier <point>[/<H|V|S|angle>[/<ratio>]],... | b=bezier <point>,<point>,<point>[,<point>],${ALTERNATIVE}`,
        parameters: [],
        build: buildBezier,
    },
    poly: {
        name: 'polygon',
        description: 'Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side',
        code: 'p=poly <point>,<point>,<point>,... | p=poly <point>,<radius>,<sides>[,<step>] | p=poly <point>,<point>,<sides>[,<step>]',
        parameters: [],
        build: buildPolygon,
    },
    follow: {
        name: 'follow',
        description: `Create a point that follows the mouse along a line, a circle or a curve (a last ${ALTERNATIVE} draws the tangent too)`,
        code: `t=follow <figure>[,<point>][,${ALTERNATIVE}]`,
        parameters: [],
        build: buildFollow,
    },
    fill: {
        name: 'fillbetween',
        description: 'Fill the area between two plots, or between a plot and the x axis',
        code: 'z=fill <plot>[,<plot>][,<domain>]',
        parameters: [],
        build: buildFillBetween,
    },
    path: {
        name: 'path',
        description: 'Draw an SVG path, written in units of the coordinate system',
        code: 'p=path M 0,0 L 2,1 Q 3,3 4,0 Z',
        parameters: [],
        build: buildPath,
    },
    grid: {
        name: 'grid',
        description: 'Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph',
        code: 'g=grid [<x interval>,<y interval>][,<step>]',
        parameters: [],
        build: buildGrid,
    },
    axis: {
        name: 'axis',
        description: 'Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph',
        code: 'a=axis <point>,<point>[,<step>]',
        parameters: [],
        build: buildAxis,
    },
    riemann: {
        name: 'riemann',
        description: 'Create the Riemann sum of a plot: rectangles from the x axis to its graph',
        code: 'r=riemann <plot>[,<domain>][,<rectangles>][,<position>]',
        parameters: [],
        build: buildRiemann,
    }
}
