"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINERULE = exports.POINTCONSTRAIN = exports.POINTSHAPE = exports.GRIDTYPE = exports.AXIS = exports.LAYER = void 0;
var LAYER;
(function (LAYER) {
    LAYER["BACKGROUND"] = "background";
    LAYER["GRIDS"] = "grids";
    LAYER["AXIS"] = "axis";
    LAYER["MAIN"] = "main";
    LAYER["PLOTS"] = "plots";
    LAYER["FOREGROUND"] = "foreground";
    LAYER["POINTS"] = "points";
})(LAYER = exports.LAYER || (exports.LAYER = {}));
var AXIS;
(function (AXIS) {
    AXIS[AXIS["HORIZONTAL"] = 0] = "HORIZONTAL";
    AXIS[AXIS["VERTICAL"] = 1] = "VERTICAL";
})(AXIS = exports.AXIS || (exports.AXIS = {}));
var GRIDTYPE;
(function (GRIDTYPE) {
    GRIDTYPE[GRIDTYPE["ORTHOGONAL"] = 4] = "ORTHOGONAL";
    GRIDTYPE[GRIDTYPE["TRIANGLE"] = 3] = "TRIANGLE";
    GRIDTYPE[GRIDTYPE["HEXAGONAL"] = 6] = "HEXAGONAL";
})(GRIDTYPE = exports.GRIDTYPE || (exports.GRIDTYPE = {}));
var POINTSHAPE;
(function (POINTSHAPE) {
    POINTSHAPE[POINTSHAPE["CIRCLE"] = 0] = "CIRCLE";
    POINTSHAPE[POINTSHAPE["CROSS"] = 1] = "CROSS";
    POINTSHAPE[POINTSHAPE["HANDLE"] = 2] = "HANDLE";
})(POINTSHAPE = exports.POINTSHAPE || (exports.POINTSHAPE = {}));
var POINTCONSTRAIN;
(function (POINTCONSTRAIN) {
    POINTCONSTRAIN[POINTCONSTRAIN["FREE"] = 0] = "FREE";
    POINTCONSTRAIN[POINTCONSTRAIN["MIDDLE"] = 1] = "MIDDLE";
    POINTCONSTRAIN[POINTCONSTRAIN["FIXED"] = 2] = "FIXED";
})(POINTCONSTRAIN = exports.POINTCONSTRAIN || (exports.POINTCONSTRAIN = {}));
var LINERULE;
(function (LINERULE) {
    LINERULE[LINERULE["DEFAULT"] = 0] = "DEFAULT";
    LINERULE[LINERULE["PARALLEL"] = 1] = "PARALLEL";
    LINERULE[LINERULE["PERPENDICULAR"] = 2] = "PERPENDICULAR";
    LINERULE[LINERULE["TANGENT"] = 3] = "TANGENT";
})(LINERULE = exports.LINERULE || (exports.LINERULE = {}));
//# sourceMappingURL=enums.js.map