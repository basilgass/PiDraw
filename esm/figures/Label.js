"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const Figure_1 = require("./Figure");
class Label extends Figure_1.Figure {
    constructor(canvas, name) {
        super(canvas, name);
        this.generateName();
    }
    generateName() {
        return '';
    }
}
exports.Label = Label;
//# sourceMappingURL=Label.js.map