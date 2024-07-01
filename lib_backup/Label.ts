import { ForeignObject, SVG, Text } from "@svgdotjs/svg.js"
import { Svg, Shape } from "@svgdotjs/svg.js"
import { LabelConfig } from "./pidraw.interface"
import { LABELPOS } from "./enums"

export class Label {
    private _config: LabelConfig

    private _currentDisplayName: string

    private _svg: Shape

    get svg(): Shape {
        return this._svg
    }

    private _rootSVG: Svg
    get rootSvg(): Svg { return this._rootSVG }

    constructor(rootSVG: Svg, config?: LabelConfig) {

        this._rootSVG = rootSVG

        this._name = ''
        this._freeze = false

        // default configuration
        this._config = {
            el: undefined,
            position: {
                horizontal: LABELPOS.RIGHT,
                vertical: LABELPOS.BOTTOM
            },
            offset: { x: 0, y: 0 },
            template: undefined
        }

        this._config = Object.assign(this._config, config)

        this.generateName()
        this._currentDisplayName = " ?? "
        this._isConverting = false
        this._isHtml = false
        this._isTex = false

        // Create the text object.
        this._svg = this.rootSvg
            .text(this._config.el?.name ?? '< ? >')
            .font({ 'anchor': 'middle' })
        // this.graph.layers.foreground.add(this.svg)

        // Create the HTML object.
        this._html = this.rootSvg.foreignObject(1, 1)
        this._html.attr('style', "overflow:visible")

        this.isTex = false

        // Update the label text and position
        this.update()
    }

    private _name: string
    get name() { return this._name }
    set name(value: string) { this._name = value }
    private _freeze: boolean
    get freeze() { return this._freeze }
    set freeze(value: boolean) { this._freeze = value }

    private _isConverting: boolean

    get isConverting(): boolean {
        return this._isConverting
    }

    set isConverting(value: boolean) {
        this._isConverting = value
    }

    private _html: ForeignObject

    get html(): ForeignObject {
        return this._html
    }

    private _isHtml: boolean

    get isHtml(): boolean {
        return this._isHtml
    }

    set isHtml(value: boolean) {
        this._isHtml = value

        this.show()
    }

    private _isTex: boolean

    get isTex(): boolean {
        return this._isTex
    }

    set isTex(value: boolean) {
        this._isTex = value
        this.isHtml = value
        this.displayName = " ?? "
    }

    get displayName(): string {
        if (this.template === undefined) {
            return this._config.name ?? this.name
        }

        // Build the name based on a template.
        let name = this.template

        if (name.includes('~')) {
            name = name
                .replaceAll(/~[A-Z0-9]+\.[xy]/g,
                    (match: string): string => {
                        const [ptName, direction] = match.substring(1).split(".")

                        if (Object.hasOwn(this.graph.points, ptName)) {

                            const pt = this.graph.getPoint(ptName)

                            if (pt) {
                                return direction === 'x' ? pt.coord.x.toString() : pt.coord.y.toString()
                            }
                        }
                        return ''
                    })

            name = name.replaceAll('+-', "-")
                .replaceAll('++', '+')
                .replaceAll('--', '+')
                .replaceAll('-+', '+')
        }

        return name
    }

    set displayName(value: string) {
        this._config.name = value
        this._currentDisplayName = " ?? "
    }

    update(): this {
        // The update mechanism is frozen.
        if (this.freeze) { return this }

        // Update the name if needed.
        const display = this.displayName
        if (this._currentDisplayName !== display) {
            // If it's the same text - no need to update it !
            if (!this.isHtml && this.svg instanceof Text) {
                this.svg.text(display)
            } else {
                this.addHtml(display)
            }
            this._currentDisplayName = display
        }

        if (this.isTex && this._html.node.children.length === 0) {
            return this
        }

        this.updatePositionAndWidth()

        return this
    }

    generateName(): string {
        if (this.name === '') {
            this.name = '?'
            return this.name
        }

        if (this.name.includes('_')) {
            // it has subscript part.
        }

        return this.name
    }

    hide(): this {
        this.svg.hide()
        this.html.hide()

        return this
    }

    show(): this {
        if (this._isHtml) {
            this.svg.hide()
            this.html.show()
        } else {
            this.svg.show()
            this.html.hide()
        }
        return this
    }

    isShown(): boolean {
        return this.svg.visible() || this.html.visible()
    }

    get template(): string | undefined {
        return this._config.template
    }

    set template(value: string) {
        this._config.template = value
    }

    updatePositionAndWidth(): this {
        let x = 0, y = 0, w = 0, h = 0

        // Get the default position
        if (this._config.el.type === 'point') {
            x = (this._config.el satisfies IPoint).x
            y = (this._config.el satisfies IPoint).y
        } else if (this._config.el instanceof Line) {
            if (this._config.el.segment && this._config.el.B instanceof Point) {
                x = (this._config.el.A.x + this._config.el.B.x) / 2
                y = (this._config.el.A.y + this._config.el.B.y) / 2
            } else {
                //TODO: set the label for a line
            }
        } else if (this._config.el instanceof Arc) {
            /**
             * A(3,2)->drag
             * B(2,7)->drag
             * C(10,7)->drag
             * a=arc A,B,C
             */
            const arc = this._config.el,
                r = arc.getRadius,
                d = arc.angle < 180 ? 1 : -1

            const OA = new mathVector(arc.center, arc.start).unit
            const OB = new mathVector(arc.center, arc.end).unit


            const v = OA.add(OB).unit

            x = arc.center.x + d * v.x * (r + 20)
            y = arc.center.y + d * v.y * (r + 20)
        }


        // Label position relative to the current (x,y) coordinate
        if (this.isHtml) {
            // Getting the width and height of the HTML element
            w = this._html.node.children[0].clientWidth
            h = this._html.node.children[0].clientHeight

            this.html.width(w)
            this.html.height(h)
        } else {
            if (this.svg instanceof Text) {
                w = this.svg.length()
            }
            h = this.svg.bbox().h
        }

        if (this._config.position) {
            if (this._config.position.horizontal === LABELPOS.LEFT) {
                x = x - w / 2
            } else if (this._config.position.horizontal === LABELPOS.RIGHT) {
                x = x + w / 2
            } else if (this._config.position.horizontal === LABELPOS.CENTER) {
                x = +x
            }

            if (this._config.position.vertical === LABELPOS.TOP) {
                y = y - h / 2
            } else if (this._config.position.vertical === LABELPOS.MIDDLE) {
                y = +y
            } else if (this._config.position.vertical === LABELPOS.BOTTOM) {
                y = y + h / 2
            }
        }

        if (this.isHtml) {
            this.html.center(x + (this._config.offset?.x ?? 0), y - (this._config.offset?.y ?? 0))
        } else {
            this.svg.center(x + (this._config.offset?.x ?? 0), y - (this._config.offset?.y ?? 0))
        }

        return this
    }

    addHtml(value: string): this {
        if (this._isConverting) { return this }

        this.isConverting = true

        // Remove existing values.
        this.html.children().forEach(child => child.remove())

        if (this.isTex) {
            this.graph.toTex(value)
                .then((value) => {
                    // @ts-expect-error - The boolean is not documented in typescript
                    this.html.add(SVG(`<div style="display: inline-block; position: fixed; padding-left: 8px; padding-right: 8px">${value}</div>`, true))
                    this.updatePositionAndWidth()

                    this.isConverting = false
                })
                .catch(() => {
                    this.isConverting = false
                })
        } else {
            // @ts-expect-error - The boolean is not documented in typescript
            this.html.add(SVG(`<div style="display: inline-block; position: fixed">${value}</div>`, true))
            this.isConverting = false
        }
        // this.html.add(SVG(`<div style="display: inline-block; position: fixed">${this.isTex ? this._graph.toTex(value) : value}</div>`, true))

        this.isHtml = true
        return this
    }

    offset(value: IPoint): this {
        this._config.offset = value
        this.update()
        return this
    }

    position(value: string): this {
        if (this._config.position === undefined) { return this }

        if (value.includes('l')) {
            this._config.position.horizontal = LABELPOS.LEFT
        }
        if (value.includes('c')) {
            this._config.position.horizontal = LABELPOS.CENTER
        }
        if (value.includes('r')) {
            this._config.position.horizontal = LABELPOS.RIGHT
        }
        if (value.includes('t')) {
            this._config.position.vertical = LABELPOS.TOP
        }
        if (value.includes('m')) {
            this._config.position.vertical = LABELPOS.MIDDLE
        }
        if (value.includes('b')) {
            this._config.position.vertical = LABELPOS.BOTTOM
        }

        this.update()
        return this
    }

    center(): this {
        if (this._config.position === undefined) { this._config.position = { horizontal: LABELPOS.CENTER, vertical: LABELPOS.MIDDLE } }
        this._config.position.horizontal = LABELPOS.CENTER

        this.update()
        return this
    }

    middle(): this {
        if (this._config.position === undefined) { this._config.position = { horizontal: LABELPOS.CENTER, vertical: LABELPOS.MIDDLE } }
        this._config.position.vertical = LABELPOS.MIDDLE

        this.update()
        return this
    }

}