import type {Path as svgPath, Shape} from "@svgdotjs/svg.js"
import {
    bezierMiddle,
    bezierPolyline,
    nearestOnPolyline,
    nowhere,
    type PathCommand,
    pathPieces,
    pathToString,
    toPixels,
    transformPath
} from "../../calculus"
import type {LABEL_POSITION} from "../Label/Label.types"
import {labelBesideWay} from "../Label/Label.constraints"
import type {IFigureContext, XY} from "../../pidraw.common"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {readPath} from "./Path.constraints"
import type {IPathConfig} from "./Path.types"

/** The length of a polyline, in pixels. */
const polylineLength = (points: XY[]) =>
    points.reduce((sum, point, index) => index === 0 ? 0 : sum + Math.hypot(point.x - points[index - 1].x, point.y - points[index - 1].y), 0)

/**
 * A path of the SVG (see {@link IPathConfig}): lines and curves written as the data of an SVG path, in pixels or in units of the
 * coordinate system. It is read as absolute lines and cubic curves (an arc is a few curves that follow it), and drawn with them.
 *
 * A path without a command is not drawn. A path can have several pieces (each one begins with `M`); its label is half way along the
 * longest one, and a point follows the nearest piece.
 */
export class Path extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-path'
    }

    /**
     * @throws InvalidArgumentError if `d` is not a text, or `units` is not a boolean.
     * @throws ParseError if `d` is not the data of an SVG path. Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IPathConfig) {
        // Before the figure draws anything in the svg.
        const commands = readPath(values, name)

        super(context, name)

        this._config = {...values}
        this._commands = commands
        this._pixels = []

        this._makeShape()
        this.computed()
    }

    protected _config: IPathConfig

    get config(): IPathConfig {
        return this._config
    }

    /**
     * Replace the path: it is drawn again, and its label follows.
     * @throws InvalidArgumentError, ParseError if `value` is not valid (see the constructor). The path is then left as it was.
     */
    set config(value: IPathConfig) {
        const commands = readPath(value, this.name)

        this._config = {...value}
        this._commands = commands
        this.computed()
        this.updateLabel()
    }

    /** The data of the path, as they were given. */
    get d(): string {
        return this._config.d
    }

    /** @throws ParseError if `path` is not the data of an SVG path. The path is then left as it was. */
    set d(path: string) {
        this.config = {...this._config, d: path}
    }

    /** The path as it was given, as absolute lines and cubic curves. */
    protected _commands: PathCommand[]

    /** The path in pixels. */
    protected _pixels: PathCommand[]

    /** The path in pixels, as absolute lines and cubic curves. A copy, empty for a path that is not drawn. */
    get commands(): PathCommand[] {
        return structuredClone(this._pixels)
    }

    /** Find the path in pixels again (the coordinate system may have changed), and draw it. A path without a command is not drawn. */
    computed(): this {
        const graph = this.graphConfig

        this._pixels = this._config.units === true ? transformPath(this._commands, (position) => toPixels(position, graph)) : this._commands
        this._setDefined(this._pixels.length > 0)
        ;(this.shape as svgPath).plot(this._pixels.length === 0 ? 'M 0 0' : pathToString(this._pixels))

        return this
    }

    override readonly followable = true

    /** The point of the path that is the closest to a position, in pixels: `NaN` when the path is not drawn. */
    override follow(x: number, y: number): XY {
        let best = nowhere()
        let distance = Infinity

        for (const piece of pathPieces(this._pixels)) {
            const found = nearestOnPolyline(bezierPolyline(piece), {x, y})
            const d = Math.hypot(found.x - x, found.y - y)

            if (d < distance) {
                distance = d
                best = found
            }
        }

        return best
    }

    /** Where the label is, in pixels, and how it is aligned: half way along the longest piece, on the left of the way it goes. */
    protected _labelPlace(): { point: XY, alignement: LABEL_POSITION } | null {
        const pieces = pathPieces(this._pixels).map(piece => ({piece, length: polylineLength(bezierPolyline(piece))}))
        const longest = pieces.reduce<typeof pieces[number] | null>((best, item) => best === null || item.length > best.length ? item : best, null)
        const middle = longest === null ? null : bezierMiddle(longest.piece)

        return middle === null ? null : labelBesideWay(middle.point, middle.direction, this._labelGap)
    }

    /** Put the label half way along the path. The alignment that was asked for (`label=p/tl`) is kept. */
    moveLabel(): this {
        const place = this._labelPlace()

        if (!this.label || place === null) {
            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = place.alignement
        }

        this.label.move(place.point.x, place.point.y)

        return this
    }

    /** The path as a TikZ path: `(a) -- (b) .. controls (c) and (d) .. (e) -- cycle`. */
    protected _tikzPath(): string {
        const at = (p: XY) => `(${this._tikzCoordinates(p)})`
        const parts: string[] = []
        let start: XY = {x: 0, y: 0}
        // After `cycle` a line begins again where the piece began.
        let closed = false

        for (const command of this._pixels) {
            if (command.type === 'Z') {
                parts.push('-- cycle')
                closed = true
                continue
            }

            if (command.type === 'M') {
                start = command.p
                closed = false
                parts.push(at(command.p))
                continue
            }

            if (closed) {
                parts.push(at(start))
                closed = false
            }

            parts.push(command.type === 'L'
                ? `-- ${at(command.p)}`
                : `.. controls ${at(command.c1)} and ${at(command.c2)} .. ${at(command.p)}`)
        }

        return parts.join(' ')
    }

    /**
     * The path as TikZ (`\draw (a) -- (b) .. controls (c) and (d) .. (e) -- cycle`), then its label. Nothing for a path that is hidden or
     * not drawn.
     * @throws InvalidArgumentError if the appearance of the path has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()
        const place = this._labelPlace()

        if (this._pixels.length === 0 || (!shown.shape && !shown.label)) {
            return ''
        }

        return [
            shown.shape ? this._tikzDraw(this._tikzPath()) : '',
            shown.label && place !== null ? this._tikzLabel(this._tikzCoordinates(place.point)) : ''
        ].filter(part => part !== '').join('\n')
    }

    _makeShape(): Shape {
        this.clear()

        // The path is drawn by `computed`.
        this.shape = this.element.path('M 0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
