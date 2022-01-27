"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAYER = exports.isXY = exports.isDrawConfigUnitMinMax = exports.isDrawConfigUnitWidthHeight = exports.isDrawConfigWidthHeight = void 0;
function isDrawConfigWidthHeight(config) {
    return config && 'width' in config;
}
exports.isDrawConfigWidthHeight = isDrawConfigWidthHeight;
function isDrawConfigUnitWidthHeight(config) {
    return config && 'dx' in config;
}
exports.isDrawConfigUnitWidthHeight = isDrawConfigUnitWidthHeight;
function isDrawConfigUnitMinMax(config) {
    return config && 'xMin' in config;
}
exports.isDrawConfigUnitMinMax = isDrawConfigUnitMinMax;
function isXY(config) {
    return config && 'x' in config && 'y' in config;
}
exports.isXY = isXY;
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
//# sourceMappingURL=interfaces.js.map