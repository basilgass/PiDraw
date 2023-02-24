"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINERULE = exports.POINTCONSTRAIN = exports.POINTSHAPE = exports.GRIDTYPE = exports.AXIS = exports.LAYER = void 0;
/**
 * Layer names
 */
var LAYER;
(function (LAYER) {
    LAYER["BACKGROUND"] = "background";
    LAYER["GRIDS"] = "grids";
    LAYER["AXIS"] = "axis";
    LAYER["MAIN"] = "main";
    LAYER["PLOTSBG"] = "plotsBG";
    LAYER["PLOTS"] = "plots";
    LAYER["PLOTSFG"] = "plotsFG";
    LAYER["FOREGROUND"] = "foreground";
    LAYER["POINTS"] = "points";
})(LAYER = exports.LAYER || (exports.LAYER = {}));
/**
 * Axis values
 */
var AXIS;
(function (AXIS) {
    AXIS["HORIZONTAL"] = "x";
    AXIS["VERTICAL"] = "y";
})(AXIS = exports.AXIS || (exports.AXIS = {}));
/**
 * Grid values
 */
var GRIDTYPE;
(function (GRIDTYPE) {
    GRIDTYPE[GRIDTYPE["ORTHOGONAL"] = 4] = "ORTHOGONAL";
    GRIDTYPE[GRIDTYPE["TRIANGLE"] = 3] = "TRIANGLE";
    GRIDTYPE[GRIDTYPE["HEXAGONAL"] = 6] = "HEXAGONAL";
})(GRIDTYPE = exports.GRIDTYPE || (exports.GRIDTYPE = {}));
/**
 * Point shape
 */
var POINTSHAPE;
(function (POINTSHAPE) {
    POINTSHAPE[POINTSHAPE["CIRCLE"] = 0] = "CIRCLE";
    POINTSHAPE[POINTSHAPE["CROSS"] = 1] = "CROSS";
    POINTSHAPE[POINTSHAPE["HANDLE"] = 2] = "HANDLE";
    POINTSHAPE[POINTSHAPE["SQUARE"] = 3] = "SQUARE";
})(POINTSHAPE = exports.POINTSHAPE || (exports.POINTSHAPE = {}));
/**
 * Point constrain
 */
var POINTCONSTRAIN;
(function (POINTCONSTRAIN) {
    POINTCONSTRAIN[POINTCONSTRAIN["FREE"] = 0] = "FREE";
    POINTCONSTRAIN[POINTCONSTRAIN["MIDDLE"] = 1] = "MIDDLE";
    POINTCONSTRAIN[POINTCONSTRAIN["FIXED"] = 2] = "FIXED";
    POINTCONSTRAIN[POINTCONSTRAIN["PROJECTION"] = 3] = "PROJECTION";
    POINTCONSTRAIN[POINTCONSTRAIN["VECTOR"] = 4] = "VECTOR";
    POINTCONSTRAIN[POINTCONSTRAIN["DIRECTION"] = 5] = "DIRECTION";
    POINTCONSTRAIN[POINTCONSTRAIN["INTERSECTION_LINES"] = 6] = "INTERSECTION_LINES";
    POINTCONSTRAIN[POINTCONSTRAIN["SYMMETRY"] = 7] = "SYMMETRY";
})(POINTCONSTRAIN = exports.POINTCONSTRAIN || (exports.POINTCONSTRAIN = {}));
/**
 * Line constrain
 */
var LINERULE;
(function (LINERULE) {
    LINERULE[LINERULE["DEFAULT"] = 0] = "DEFAULT";
    LINERULE[LINERULE["PARALLEL"] = 1] = "PARALLEL";
    LINERULE[LINERULE["PERPENDICULAR"] = 2] = "PERPENDICULAR";
    LINERULE[LINERULE["TANGENT"] = 3] = "TANGENT";
})(LINERULE = exports.LINERULE || (exports.LINERULE = {}));
//# sourceMappingURL=enums.js.map