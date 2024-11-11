/**
 * Layer names
 */
export enum LAYER {
    BACKGROUND = 'background',
    GRIDS = 'grids',
    AXIS = 'axis',
    MAIN = 'main',
    PLOTSBG = 'plotsBG',
    PLOTS = 'plots',
    PLOTSFG = 'plotsFG',
    FOREGROUND = 'foreground',
    POINTS = 'points'
}

/**
 * Axis values
 */
export enum AXIS {
    HORIZONTAL = 'x',
    VERTICAL = 'y'
}

/**
 * Grid values
 */
export enum GRIDTYPE {
    ORTHOGONAL = 4,
    TRIANGLE = 3,
    HEXAGONAL = 6
}

/**
 * Point shape
 */
export enum POINTSHAPE {
    CIRCLE,
    CROSS,
    HANDLE,
    SQUARE,
    TICK,
}

/**
 * Point constrain
 */
export enum POINTCONSTRAIN {
    FREE,
    MIDDLE,
    FIXED,
    PROJECTION,
    VECTOR,
    DIRECTION,
    INTERSECTION_LINES,
    INTERSECTION_CIRCLE_LINE,
    INTERSECTION_CIRCLES,
    SYMMETRY,
    COORDINATES
}

/**
 * Line constrain
 */
export enum LINERULE {
    DEFAULT,
    PARALLEL,
    PERPENDICULAR,
    TANGENT
}

export enum FIGURE_TYPE {
    UNKNOWN,
    ARC,
    AXIS,
    BEZIER,
    CIRCLE,
    GRID,
    LINE,
    PARAMETRIC,
    PATH,
    PLOT,
    POINT,
    POLYGON,
    TRIANGLE
}


export enum LABELPOS {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
    TOP = 'top',
    BOTTOM = 'bottom',
    MIDDLE = 'middle'
}
export enum BEZIERCONTROL {
    SMOOTH = 'smooth',
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export enum LINECONSTRUCTION {
    PARALLEL = 'parallel',
    PERPENDICULAR = 'perpendicular',
    TANGENT = 'tangent',
    SLOPE = 'slope',
    BISSECTOR = "bissector",
    MEDIATOR = "mediator"
}
