"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.LABELPOS = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const Line_1 = require("./Line");
const svg_js_1 = require("@svgdotjs/svg.js");
const Arc_1 = require("./Arc");
const Calculus_1 = require("../Calculus");
var LABELPOS;
(function (LABELPOS) {
    LABELPOS["LEFT"] = "left";
    LABELPOS["RIGHT"] = "right";
    LABELPOS["CENTER"] = "center";
    LABELPOS["TOP"] = "top";
    LABELPOS["BOTTOM"] = "bottom";
    LABELPOS["MIDDLE"] = "middle";
})(LABELPOS || (exports.LABELPOS = LABELPOS = {}));
class Label extends Figure_1.Figure {
    _config;
    _currentDisplayName;
    constructor(graph, name, config) {
        super(graph, name);
        // default configuration
        this._config = {
            el: null,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            },
            offset: { x: 0, y: 0 },
            template: null
        };
        this._config = Object.assign({}, this._config, config);
        this.generateName();
        this._currentDisplayName = " ?? ";
        // Create the text object.
        this.svg = this.graph.svg.text(this._config.el.name).font({ 'anchor': 'middle' });
        this.graph.layers.foreground.add(this.svg);
        // Create the HTML object.
        this._html = this.graph.svg.foreignObject(1, 1);
        this._html.attr('style', "overflow:visible");
        this.graph.layers.foreground.add(this._html);
        this.isTex = false;
        // Update the label text and position
        this.updateFigure();
    }
    _isConverting;
    get isConverting() {
        return this._isConverting;
    }
    set isConverting(value) {
        this._isConverting = value;
    }
    _html;
    get html() {
        return this._html;
    }
    _isHtml;
    get isHtml() {
        return this._isHtml;
    }
    set isHtml(value) {
        this._isHtml = value;
        this.show();
    }
    _isTex;
    get isTex() {
        return this._isTex;
    }
    set isTex(value) {
        this._isTex = value;
        this.isHtml = value;
        this.displayName = " ?? ";
    }
    get displayName() {
        if (this.template === null) {
            return this._config.name === undefined ? this.name : this._config.name;
        }
        // Build the name based on a template.
        let name = this._config.template;
        if (name.includes('~')) {
            name = name
                .replaceAll(/~[A-Z0-9]+\.[xy]/g, (match) => {
                let [ptName, direction] = match.substring(1).split(".");
                let pt = this.graph.getPoint(ptName);
                if (pt === null) {
                    return match.substring(1);
                }
                return direction === 'x' ? pt.coord.x.toString() : pt.coord.y.toString();
            });
            name = name.replaceAll('+-', "-")
                .replaceAll('++', '+')
                .replaceAll('--', '+')
                .replaceAll('-+', '+');
        }
        return name;
    }
    set displayName(value) {
        this._config.name = value;
        this._currentDisplayName = " ?? ";
    }
    updateFigure() {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        // Update the name if needed.
        const display = this.displayName;
        if (this._currentDisplayName !== display) {
            // If it's the same text - no need to update it !
            if (!this.isHtml && this.svg instanceof svg_js_1.Text) {
                this.svg.text(display);
            }
            else {
                this.addHtml(display);
            }
            this._currentDisplayName = display;
        }
        if (this.isTex && this._html.node.children.length === 0) {
            return this;
        }
        this.updatePositionAndWidth();
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
    hide() {
        this.svg.hide();
        this.html.hide();
        return this;
    }
    show() {
        if (this._isHtml) {
            this.svg.hide();
            this.html.show();
        }
        else {
            this.svg.show();
            this.html.hide();
        }
        return this;
    }
    isShown() {
        return this.svg.visible() || this.html.visible();
    }
    get template() {
        return this._config.template;
    }
    set template(value) {
        this._config.template = value;
    }
    updatePositionAndWidth() {
        let x = 0, y = 0, w = 0, h = 0;
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
            const arc = this._config.el, r = arc.getRadius, d = arc.angle < 180 ? 1 : -1;
            const OA = new Calculus_1.mathVector(arc.center, arc.start).unit;
            const OB = new Calculus_1.mathVector(arc.center, arc.end).unit;
            const v = OA.add(OB).unit;
            x = arc.center.x + d * v.x * (r + 20);
            y = arc.center.y + d * v.y * (r + 20);
        }
        // Label position relative to the current (x,y) coordinate
        if (this.isHtml) {
            // Getting the width and height of the HTML element
            w = this._html.node.children[0].clientWidth;
            h = this._html.node.children[0].clientHeight;
            this.html.width(w);
            this.html.height(h);
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
    addHtml(value) {
        if (this._isConverting)
            return this;
        this.isConverting = true;
        // Remove existing values.
        this.html.children().forEach(child => child.remove());
        if (this.isTex) {
            this.graph.toTex(value)
                .then((value) => {
                // @ts-ignore
                this.html.add((0, svg_js_1.SVG)(`<div style="display: inline-block; position: fixed; padding-left: 8px; padding-right: 8px">${value}</div>`, true));
                this.updatePositionAndWidth();
                this.isConverting = false;
            })
                .catch(() => {
                this.isConverting = false;
            });
        }
        else {
            // @ts-ignore
            this.html.add((0, svg_js_1.SVG)(`<div style="display: inline-block; position: fixed">${value}</div>`, true));
            this.isConverting = false;
        }
        // this.html.add(SVG(`<div style="display: inline-block; position: fixed">${this.isTex ? this._graph.toTex(value) : value}</div>`, true))
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
}
exports.Label = Label;
//# sourceMappingURL=Label.js.map