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
    HORIZONTAL='x',
    VERTICAL='y'
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
    SQUARE
}

/**
 * Point constrain
 */
export enum POINTCONSTRAIN {
    FREE,
    MIDDLE,
    FIXED,
    PROJECTION,
    VECTOR
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
