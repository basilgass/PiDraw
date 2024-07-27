
export const parser_documentation = {
    point: {
        description: 'Create a point',
        code: 'A(3,4)',
        parameters: ['drag', 'drag:grid', 'drag:axis', 'drag:x', 'drag:y', 'drag:<figure>']
    },
    mid: {
        description: 'Create the middle of two points',
        code: 'A=mid <point>,<point>',
        parameters: []
    },
    projection: {
        description: 'Create the projection of a point on a line',
        code: 'A=proj <point>,<line>',
        parameters: []
    },
    intersection: {
        description: 'Create the intersection of two lines',
        code: 'A=inter <line>,<line>',
        parameters: []
    },
    symmetry: {
        description: 'Create the symmetry of a point',
        code: 'A=sym <point>,<point|line>',
        parameters: []
    },
    line: {
        description: 'Create a line, a half line or a segment',
        code: 'd=<line> | <line>[ | <line>.',
        parameters: ['dash', 'dot']
    },
    vector: {
        description: 'Create a vector',
        code: 'd=v<line>',
        parameters: []
    },
    perpendicular: {
        description: 'Create the perpendicular of a line from a point',
        code: 'd=perp <line>,<point>',
        parameters: []
    },
    parallel: {
        description: 'Create a parallel line from a point',
        code: 'd=para <line>,<point>',
        parameters: []
    },
    mediator: {
        description: 'Create the mediator of two points',
        code: 'd=med <point>,<point>',
        parameters: []
    },
    tangent: {
        description: 'Create a tangent line from a point to a circle',
        code: 'd=tan <point>,<point>',
        parameters: []
    },
    bisector: {
        description: 'Create the bisector of an angle',
        code: 'd=bis <point>,<point>,<point>',
        parameters: []
    },
    circle: {
        description: 'Create a circle',
        code: 'c=circ <point>,<radius>',
        parameters: []
    },
    arc: {
        description: 'Create an arc',
        code: 'c=arc <point>,<point>,<point>[,<number>]',
        parameters: []
    },
    plot: {
        description: 'Plot a function',
        code: 'f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]',
        parameters: []
    },
    parametric: {
        description: 'Plot a parametric function',
        code: 'f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]',
        parameters: []
    },
    polygon: {
        description: 'Create a polygon',
        code: 'p=poly <point>,<point>,<point>,...',
        parameters: []
    },
    regular: {
        description: 'Create a regular polygon',
        code: 'p=reg <center>,<radius>,<sides>',
        parameters: []
    }
}
