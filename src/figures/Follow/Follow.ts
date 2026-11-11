import type {Circle as svgCircle, G, Line as svgLine, Shape} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LABEL_POSITION} from "../Label/Label.types"
import {labelBesideWay} from "../Label/Label.constraints"
import {clipSegment, computeLine, directionAlong, isDefinedPosition} from "../../calculus"
import {checkFollow, DEFAULT_SIZE} from "./Follow.constraints"
import type {IFollowConfig} from "./Follow.types"

/** Where the figure is followed: the point, and the tangent of the figure there (null if it has none). */
interface FollowState {
    point: XY,
    direction: XY | null
}

/**
 * A point that follows the mouse along a figure (a line, a circle, a plot, a parametric curve), and optionally the tangent of the
 * figure at that point (see {@link IFollowConfig}).
 *
 * The point is placed at the position of the mouse projected on the figure (`follow`), and again every time the figure is computed,
 * so it stays on the figure when the figure changes. Before the mouse moves it is at `at`, or the origin of the coordinate system. When
 * the figure does not exist where the mouse is, the point and the tangent are hidden.
 */
export class Follow extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-follow'
    }

    /** The label is this far, in pixels, from the point. */
    protected override readonly _labelGap: number = 12

    /**
     * @throws InvalidArgumentError if the figure to follow cannot be followed, the size is not a finite number greater than 0, or the
     * starting position is not `{x, y}`. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IFollowConfig) {
        // Before the figure draws anything in the svg.
        checkFollow(values, name)

        super(context, name)

        // Default fill color
        this.appearance.fill.color = 'black'

        this._config = {...values}
        this._mouse = null
        this._state = null

        // The mouse is followed on the whole drawing.
        this._listener = (event: Event) => {
            const svg = this.rootSVG.node
            const matrix = svg.getScreenCTM()

            if (matrix === null) {
                return
            }

            const mouse = svg.createSVGPoint()
            mouse.x = (event as MouseEvent).clientX
            mouse.y = (event as MouseEvent).clientY

            const {x, y} = mouse.matrixTransform(matrix.inverse())
            this.moveTo(x, y)
        }
        this.rootSVG.on('mousemove', this._listener)

        this._makeShape()
        this.computed()
    }

    protected _config: IFollowConfig

    get config(): IFollowConfig {
        return this._config
    }

    /**
     * Replace the config of the point: it is drawn again, and its label follows.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The point is then left as it was.
     */
    set config(value: IFollowConfig) {
        checkFollow(value, this.name)

        this._config = {...value}
        this._makeShape()
        this.computed()
        this.updateLabel()
    }

    /** Where the mouse was last, in pixels. `null` before it moves. */
    protected _mouse: XY | null

    /** What is drawn now: `null` when the figure does not exist where the mouse is. */
    protected _state: FollowState | null

    protected _listener: (event: Event) => void

    protected _point?: svgCircle

    protected _tangent?: svgLine

    /** The point where the figure is followed, in pixels. `NaN` when the figure does not exist where the mouse is. */
    get position(): XY {
        return this._state === null ? {x: NaN, y: NaN} : {...this._state.point}
    }

    /** Remove the listener of the mouse. */
    override dispose(): void {
        this.rootSVG.off('mousemove', this._listener)
    }

    /** Put the point where the figure is the closest to a position, in pixels (the mouse), and draw it. */
    moveTo(x: number, y: number): this {
        this._mouse = {x, y}

        return this.computed().updateLabel()
    }

    /** Where the point follows: the mouse, or before it moves the starting position, or the origin of the coordinate system. */
    protected _target(): XY {
        return this._mouse ?? this._config.at ?? this.graphConfig.origin
    }

    /** Project the position on the figure again, and draw the point and the tangent. */
    computed(): this {
        const target = this._config.follow
        const mouse = this._target()
        const point = target.follow(mouse.x, mouse.y)

        if (!isDefinedPosition(point)) {
            this._state = null
            this._point?.hide()
            this._tangent?.hide()

            return this
        }

        this._state = {point: {x: point.x, y: point.y}, direction: directionAlong((x, y) => target.follow(x, y), point)}
        this._point?.show().center(point.x, point.y)

        const line = this._tangentLine()

        if (line === null) {
            this._tangent?.hide()
        } else {
            this._tangent?.show().plot(line[0].x, line[0].y, line[1].x, line[1].y)
        }

        return this
    }

    /** The tangent across the drawing, in pixels: `null` if it is not drawn, because of the option or because the figure has none there. */
    protected _tangentLine(): [XY, XY] | null {
        const direction = this._state?.direction

        if (this._config.tangent !== true || this._state === null || !direction) {
            return null
        }

        const {width, height} = this.graphConfig
        const line = computeLine(this._state.point, direction, width, height)

        // A tangent that is nearly vertical would be given by the points where it crosses the left and the right borders, far above and below.
        return line === null ? null : clipSegment(line[0], line[1], width, height)
    }

    /** Put the label beside the point, on the left of the way the figure goes there. */
    moveLabel(): this {
        if (!this.label || this._state === null) {
            return this
        }

        const {point, alignement} = this._labelPlace(this._state)

        if (!this.label.alignementGiven) {
            this.label.config.alignement = alignement
        }

        this.label.move(point.x, point.y)

        return this
    }

    protected _labelPlace({point, direction}: FollowState): { point: XY, alignement: LABEL_POSITION } {
        return labelBesideWay(point, direction ?? {x: 0, y: 0}, this._labelGap)
    }

    /**
     * The point as TikZ (a filled circle) and its tangent (a line across the drawing), as they are drawn now: where the mouse is, or
     * where the point starts. Then its label. Nothing when the figure does not exist there, or is hidden.
     * @throws InvalidArgumentError if the appearance has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()

        if (this._state === null || (!shown.shape && !shown.label)) {
            return ''
        }

        const {definitions, options} = this._tikzStyle()
        const parts: string[] = []

        if (shown.shape) {
            const line = this._tangentLine()
            const stroke = options.filter(option => !option.startsWith('fill'))
            const fill = options.filter(option => option.startsWith('fill'))
            const at = (p: XY) => `(${this._tikzCoordinates(p)})`

            parts.push(...definitions)

            if (line !== null && !stroke.includes('draw=none')) {
                parts.push(`\\draw[${stroke.join(', ')}] ${at(line[0])} -- ${at(line[1])};`)
            }

            if (fill.length > 0) {
                parts.push(`\\fill[${fill.join(', ')}] ${at(this._state.point)} circle[radius=${this._tikzLength((this._config.size ?? DEFAULT_SIZE) / 2)}];`)
            }
        }

        if (shown.label) {
            parts.push(this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._state).point)))
        }

        return parts.join('\n')
    }

    _makeShape(): G {
        this.clear()

        // The group of the point and of its tangent.
        const group = this.element.group()
        this.shape = group
        this._tangent = group.line(0, 0, 0, 0)
        this._point = group.circle(this._config.size ?? DEFAULT_SIZE)

        // Apply the stroke and fill.
        this.fill().stroke()

        return group
    }

    override strokeable(): Shape[] {
        return this._tangent ? [this._tangent] : []
    }

    override fillable(): Shape[] {
        return this._point ? [this._point] : []
    }
}
