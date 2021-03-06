"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.LABELPOS = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const Line_1 = require("./Line");
const svg_js_1 = require("@svgdotjs/svg.js");
var LABELPOS;
(function (LABELPOS) {
    LABELPOS["LEFT"] = "left";
    LABELPOS["RIGHT"] = "right";
    LABELPOS["CENTER"] = "cener";
    LABELPOS["TOP"] = "top";
    LABELPOS["BOTTOM"] = "bottom";
    LABELPOS["MIDDLE"] = "middle";
})(LABELPOS = exports.LABELPOS || (exports.LABELPOS = {}));
class Label extends Figure_1.Figure {
    _config;
    get displayName() {
        return this._config.name === undefined ? this.name : this._config.name;
    }
    set displayName(value) {
        this._config.name = value;
        this.updateFigure();
    }
    constructor(graph, name, config) {
        super(graph, name);
        this.generateName();
        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            }
        };
        this._config = Object.assign({}, this._config, config);
        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({ 'anchor': 'middle' });
        this.graph.layers.foreground.add(this.svg);
        // Update the label text and position
        this.updateFigure();
    }
    generateName() {
        if (this.name === undefined) {
            this.name = '?';
            return this.name;
        }
        if (this.name.includes('_')) {
            // it has subscript part.
        }
        return this.name;
    }
    updateFigure() {
        let x = 0, y = 0, w = 0, h = 0;
        // Update the name
        if (this.svg instanceof svg_js_1.Text) {
            this.svg.text(this.displayName);
        }
        if (this._config.el instanceof Point_1.Point) {
            x = this._config.el.x;
            y = this._config.el.y;
        }
        else if (this._config.el instanceof Line_1.Line) {
            //TODO: set the label for a line
        }
        // Label position relative to the current (x,y) coordinate
        if (this.svg instanceof svg_js_1.Text) {
            w = this.svg.length();
        }
        h = this._config.el.svg.bbox().h;
        if (this._config.position) {
            if (this._config.position.horizontal === LABELPOS.LEFT) {
                x = x - w / 2;
            }
            else if (this._config.position.horizontal === LABELPOS.RIGHT) {
                x = x + w;
            }
            else if (this._config.position.horizontal === LABELPOS.CENTER) {
                x = +x;
            }
            if (this._config.position.vertical === LABELPOS.TOP) {
                y = y - h / 2;
            }
            else if (this._config.position.vertical === LABELPOS.MIDDLE) {
                y = +y;
            }
            else if (this._config.position.vertical === LABELPOS.BOTTOM) {
                y = y + h / 2;
            }
        }
        this.svg.center(x, y);
        return this;
    }
}
exports.Label = Label;
//# sourceMappingURL=Label.js.map