import type {PARSER} from "piparser"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {IGraphConfig} from "../pidraw.common"
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
import type {BuildResult} from "./parser.types"
import {ALTERNATIVE, PARSER_TYPE} from "./parser.common"

/** A kind of figure of the syntax: how to build it from a line of code, and what `PiDraw.documentation()` says about it. */
export interface ParserItem {
    /**
     * Reads the definition of a line (before the `->`): the figures to make, or `null` when there is nothing to make. The options are not read.
     * @throws ParseError if the values of the line do not suit the key.
     */
    build: (item: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => BuildResult<unknown> | BuildResult<unknown>[] | null,
    /** The forms of the line, with the kinds of values between `<>` (`A=mid <point>,<point>`). */
    code: string,
    /** What the key makes, in a sentence. */
    description: string,
    /** The name of the kind of figure. */
    name: string,
}

/**
 * The kinds of figures of the syntax, by key: one entry for each value of `PARSER_TYPE`. `Draw` picks the `build` of a line from its key,
 * and `PiDraw.documentation()` gives the table. A new key needs an example in the guide (`docs:check` lists the ones that have none).
 */
export const PARSER_CONFIG: Record<string, ParserItem> = {
    [PARSER_TYPE.POINT]: {
        name: 'point',
        description: 'Create a point',
        code: 'A(3,4)',
        build: buildPoint,
    },
    [PARSER_TYPE.VECTOR_POINT]: {
        name: 'point from two points',
        description: 'Create a point from a vector defined by two points and a starting point',
        code: 'A=vpt <point>,<point>,<scale?>,<starting point?>',
        build: buildPoint,
    },
    [PARSER_TYPE.DIRECTION_POINT]: {
        name: 'point from direction line',
        description: 'Create a point from a line and a starting point',
        code: 'A=dpt <point>,<line>,<distance>,<perpendicular?>',
        build: buildPoint,
    },
    [PARSER_TYPE.MIDDLE]: {
        name: 'mid',
        description: 'Create the middle of two points',
        code: 'A=mid <point>,<point>',
        build: buildPoint,
    },
    [PARSER_TYPE.PROJECTION]: {
        name: 'projection',
        description: 'Create the projection of a point on a line',
        code: 'A=proj <point>,<line>',
        build: buildPoint,
    },
    [PARSER_TYPE.INTERSECTION]: {
        name: 'intersection',
        description: 'Create the intersection of two lines',
        code: 'A=inter <line|circle>,<line|circle>',
        build: buildIntersection,
    },
    [PARSER_TYPE.SYMMETRY]: {
        name: 'symmetry',
        description: 'Create the symmetry of a point',
        code: 'A=sym <point>,<point|line>',
        build: buildPoint,
    },
    [PARSER_TYPE.EVAL_FX]: {
        name: 'point on a function',
        description: 'Create the point of a function at a value',
        code: 'A=eval f,3',
        build: buildPoint,
    },
    [PARSER_TYPE.LINE]: {
        name: 'line',
        description: 'Create a line through two points, through a point with a slope, or from its equation',
        code: 'd=AB | d=line <point>,<point> | d=line <point>,<slope> | d=line <equation>',
        build: buildLine,
    },
    [PARSER_TYPE.VECTOR]: {
        name: 'vector',
        description: 'Create a vector: a segment with an arrow at its end',
        code: 'v=vAB | v=vec <point>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.SEGMENT]: {
        name: 'segment',
        description: 'Create a segment through two points',
        code: 's=AB. | s=[AB] | s=seg <point>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.RAY]: {
        name: 'ray (half line)',
        description: 'Create a ray: it starts at the first point and goes through the second',
        code: 'r=AB[ | r=[AB[ | r=[AB | r=ray <point>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.PERPENDICULAR]: {
        name: 'perpendicular',
        description: 'Create the perpendicular of a line from a point',
        code: 'd=perp <line>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.PARALLEL]: {
        name: 'parallel',
        description: 'Create a parallel line from a point',
        code: 'd=para <line>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.MEDIATOR]: {
        name: 'mediator',
        description: 'Create the mediator of two points',
        code: 'd=med <point>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.TANGENT]: {
        name: 'tangent',
        description: 'Create a tangent line from a <circle|plot> by a Point',
        code: 'd=tan <circle|plot>,<point>',
        build: buildLine,
    },
    [PARSER_TYPE.BISECTOR]: {
        name: 'bisector',
        description: `Create the bisector of an angle (three points), or of two lines or axes (a last ${ALTERNATIVE} for the other bisector)`,
        code: `d=bis <point>,<point>,<point> | d=bis <line>,<line>[,${ALTERNATIVE}]`,
        build: buildLine
    },
    [PARSER_TYPE.CIRCLE]: {
        name: 'circle',
        description: `Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last ${ALTERNATIVE} for the inscribed circle), from a center and a tangent line, or from a diameter A:B`,
        code: `c=circ <point>,<radius> | c=circ <point>,<line> | c=circ <point>,<point>,<point>[,${ALTERNATIVE}] | c=circ <point>:<point>`,
        build: buildCircle,
    },
    [PARSER_TYPE.ARC]: {
        name: 'arc',
        description: `Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last ${ALTERNATIVE} for the other arc)`,
        code: `a=arc <point>,<point>,<point>[,<radius>][,${ALTERNATIVE}] | a=arc <point>,<number>,<number>,<number>[,${ALTERNATIVE}] | a=arc <point>,<point>,<number>[,<radius>][,${ALTERNATIVE}]`,
        build: buildArc,
    },
    [PARSER_TYPE.PLOT]: {
        name: 'plot',
        description: 'Plot a function, or the parabola through three points (a line if they are aligned)',
        code: 'f(x)=<function>[@<number>,<domain>,<image>] | f=plot <function>[@<number>,<domain>,<image>] | f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]',
        build: buildPlot,
    },
    [PARSER_TYPE.PARAMETRIC]: {
        name: 'parametric',
        description: 'Plot a parametric function',
        code: 'f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]',
        build: buildParametric,
    },
    [PARSER_TYPE.BEZIER]: {
        name: 'bezier',
        description: `Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last ${ALTERNATIVE}, the curve pulled by 3 or 4 control points`,
        code: `b=bezier <point>[/<H|V|S|angle>[/<ratio>]],... | b=bezier <point>,<point>,<point>[,<point>],${ALTERNATIVE}`,
        build: buildBezier,
    },
    [PARSER_TYPE.POLYGON]: {
        name: 'polygon',
        description: 'Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side',
        code: 'p=poly <point>,<point>,<point>,... | p=poly <point>,<radius>,<sides>[,<step>] | p=poly <point>,<point>,<sides>[,<step>]',
        build: buildPolygon,
    },
    [PARSER_TYPE.FOLLOW]: {
        name: 'follow',
        description: `Create a point that follows the mouse along a line, a circle or a curve (a last ${ALTERNATIVE} draws the tangent too)`,
        code: `t=follow <figure>[,<point>][,${ALTERNATIVE}]`,
        build: buildFollow,
    },
    [PARSER_TYPE.FILL_BETWEEN]: {
        name: 'fillbetween',
        description: 'Fill the area between two plots, or between a plot and the x axis',
        code: 'z=fill <plot>[,<plot>][,<domain>]',
        build: buildFillBetween,
    },
    [PARSER_TYPE.PATH]: {
        name: 'path',
        description: 'Draw an SVG path, written in units of the coordinate system',
        code: 'p=path M 0,0 L 2,1 Q 3,3 4,0 Z',
        build: buildPath,
    },
    [PARSER_TYPE.GRID]: {
        name: 'grid',
        description: 'Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph',
        code: 'g=grid [<x interval>,<y interval>][,<step>]',
        build: buildGrid,
    },
    [PARSER_TYPE.AXIS]: {
        name: 'axis',
        description: 'Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph',
        code: 'a=axis <point>,<point>[,<step>]',
        build: buildAxis,
    },
    [PARSER_TYPE.RIEMANN]: {
        name: 'riemann',
        description: 'Create the Riemann sum of a plot: rectangles from the x axis to its graph',
        code: 'r=riemann <plot>[,<domain>][,<rectangles>][,<position>]',
        build: buildRiemann,
    }
}
