"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.LABELPOS = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const Line_1 = require("./Line");
const svg_js_1 = require("@svgdotjs/svg.js");
const Arc_1 = require("./Arc");
var LABELPOS;
(function (LABELPOS) {
    LABELPOS["LEFT"] = "left";
    LABELPOS["RIGHT"] = "right";
    LABELPOS["CENTER"] = "center";
    LABELPOS["TOP"] = "top";
    LABELPOS["BOTTOM"] = "bottom";
    LABELPOS["MIDDLE"] = "middle";
})(LABELPOS = exports.LABELPOS || (exports.LABELPOS = {}));
class Label extends Figure_1.Figure {
    _config;
    _html;
    _isHtml;
    _isTex;
    constructor(graph, name, config) {
        super(graph, name);
        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            },
            offset: { x: 0, y: 0 }
        };
        this._config = Object.assign({}, this._config, config);
        this.generateName();
        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({ 'anchor': 'middle' });
        this.graph.layers.foreground.add(this.svg);
        // How to handle dimension
        this._html = this.graph.svg.foreignObject(1, 1);
        this._html.attr('style', "overflow:visible");
        this.graph.layers.foreground.add(this._html);
        this.isHtml = false;
        // Update the label text and position
        this.updateFigure();
    }
    get isHtml() {
        return this._isHtml;
    }
    set isHtml(value) {
        this._isHtml = value;
        if (this._isHtml) {
            this.svg.hide();
            this.html.show();
        }
        else {
            this.svg.show();
            this.html.hide();
        }
    }
    get isTex() {
        return this._isTex;
    }
    set isTex(value) {
        this._isHtml = value || this._isHtml;
        this._isTex = value;
    }
    get html() {
        return this._html;
    }
    get displayName() {
        return this._config.name === undefined ? this.name : this._config.name;
    }
    set displayName(value) {
        this._config.name = value;
        this.updateFigure();
    }
    addHtml(value) {
        // Remove existing values.
        this.html.children().forEach(child => child.remove());
        // @ts-ignore
        this.html.add((0, svg_js_1.SVG)(`<div style="display: inline-block">${this.isTex ? this._graph.toTex(value) : value}</div>`, true));
        this.isHtml = true;
        return this;
    }
    offset(value) {
        this._config.offset = value;
        this.updateFigure();
        return this;
    }
    position(value) {
        if (value.includes('l')) {
            this._config.position.horizontal = LABELPOS.LEFT;
        }
        if (value.includes('c')) {
            this._config.position.horizontal = LABELPOS.CENTER;
        }
        if (value.includes('r')) {
            this._config.position.horizontal = LABELPOS.RIGHT;
        }
        if (value.includes('t')) {
            this._config.position.vertical = LABELPOS.TOP;
        }
        if (value.includes('m')) {
            this._config.position.vertical = LABELPOS.MIDDLE;
        }
        if (value.includes('b')) {
            this._config.position.vertical = LABELPOS.BOTTOM;
        }
        this.updateFigure();
        return this;
    }
    center() {
        this._config.position.horizontal = LABELPOS.CENTER;
        this.updateFigure();
        return this;
    }
    middle() {
        this._config.position.vertical = LABELPOS.MIDDLE;
        this.updateFigure();
        return this;
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
        if (!this.isHtml && this.svg instanceof svg_js_1.Text) {
            this.svg.text(this.displayName);
        }
        else {
            this.addHtml(this.displayName);
        }
        // Get the default position
        if (this._config.el instanceof Point_1.Point) {
            x = this._config.el.x;
            y = this._config.el.y;
        }
        else if (this._config.el instanceof Line_1.Line) {
            if (this._config.el.segment) {
                x = (this._config.el.A.x + this._config.el.B.x) / 2;
                y = (this._config.el.A.y + this._config.el.B.y) / 2;
            }
            else {
                //TODO: set the label for a line
            }
        }
        else if (this._config.el instanceof Arc_1.Arc) {
            /**
             * A(3,2)->drag
             * B(2,7)->drag
             * C(10,7)->drag
             * a=arc A,B,C
             */
            const arc = this._config.el, v1 = { x: arc.start.x - arc.center.x, y: arc.start.y - arc.center.y }, v2 = { x: arc.end.x - arc.center.x, y: arc.end.y - arc.center.y }, vr = { x: v1.x + v2.x, y: v1.y + v2.y }, norm = Math.sqrt(vr.x ** 2 + vr.y ** 2), r = arc.getRadius, d = arc.angle < 180 ? 1 : -1, vn = { x: vr.x / norm * (r + 20), y: vr.y / norm * (r + 20) };
            x = arc.center.x + d * vn.x;
            y = arc.center.y + d * vn.y;
        }
        // Label position relative to the current (x,y) coordinate
        if (this.isHtml) {
            // Getting the width and height of the HTML element
            w = this._html.node.children[0].clientWidth;
            h = this._html.node.children[0].clientHeight;
            this.html.width(w);
            this.html.height(h);
            //
            // this._HtmlLabelRefresh()
        }
        else {
            if (this.svg instanceof svg_js_1.Text) {
                w = this.svg.length();
            }
            h = this.svg.bbox().h;
        }
        if (this._config.position) {
            if (this._config.position.horizontal === LABELPOS.LEFT) {
                x = x - w / 2;
            }
            else if (this._config.position.horizontal === LABELPOS.RIGHT) {
                x = x + w / 2;
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
        if (this.isHtml) {
            this.html.center(x + this._config.offset.x, y - this._config.offset.y);
        }
        else {
            this.svg.center(x + this._config.offset.x, y - this._config.offset.y);
        }
        return this;
    }
}
exports.Label = Label;
//# sourceMappingURL=Label.js.map