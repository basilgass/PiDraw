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
    HORIZONTAL = 0,
    VERTICAL = 1
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
    SQUARE = 3
}
/**
 * Point constrain
 */
export declare enum POINTCONSTRAIN {
    FREE = 0,
    MIDDLE = 1,
    FIXED = 2
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
