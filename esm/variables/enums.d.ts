/**
 * Layer names
 */
export declare enum LAYER {
    BACKGROUND = "background",
    GRIDS = "grids",
    AXIS = "axis",
    MAIN = "main",
    PLOTSBG = "plotsBG",
    PLOTS = "plots",
    PLOTSFG = "plotsFG",
    FOREGROUND = "foreground",
    POINTS = "points"
}
/**
 * Axis values
 */
export declare enum AXIS {
    HORIZONTAL = "x",
    VERTICAL = "y"
}
/**
 * Grid values
 */
export declare enum GRIDTYPE {
    ORTHOGONAL = 4,
    TRIANGLE = 3,
    HEXAGONAL = 6
}
/**
 * Point shape
 */
export declare enum POINTSHAPE {
    CIRCLE = 0,
    CROSS = 1,
    HANDLE = 2,
    SQUARE = 3,
    TICK = 4
}
/**
 * Point constrain
 */
export declare enum POINTCONSTRAIN {
    FREE = 0,
    MIDDLE = 1,
    FIXED = 2,
    PROJECTION = 3,
    VECTOR = 4,
    DIRECTION = 5,
    INTERSECTION_LINES = 6,
    INTERSECTION_CIRCLE_LINE = 7,
    INTERSECTION_CIRCLES = 8,
    SYMMETRY = 9,
    COORDINATES = 10
}
/**
 * Line constrain
 */
export declare enum LINERULE {
    DEFAULT = 0,
    PARALLEL = 1,
    PERPENDICULAR = 2,
    TANGENT = 3
}
