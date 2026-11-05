import type {G, Line as svgLine, Path, Shape} from "@svgdotjs/svg.js"
import {labelEvery, nowhere, pathNumber, selects, tickLabel, type TickLabel, tickPositions} from "../../calculus"
import type {LABEL_POSITION} from "../Label/Label.types"
import {labelAlignementToward} from "../Label/Label.constraints"
import type {IFigureContext, XY} from "../../pidraw.common"
import {AXIS_PADDING, checkAxis, insetEnds, ticksOf} from "./Axis.constraints"
import type {IAxisConfig, IAxisOptions} from "./Axis.types"
import {Line} from "../Line/Line"
import {constraintOf, type LineFound} from "../Line/Line.constraints"
import type {ILineResolvedConfig} from "../Line/Line.types"

/** There is no tick if they would be closer than this, in pixels. */
const MIN_TICK_SPACING = 4

/** The numbers are written one in as many ticks as it takes to keep them this far apart, in pixels. */
const MIN_LABEL_SPACING = 36

/** No tick is nearer than this to the arrow, in pixels. */
const ARROW_CLEARANCE = 10

/** How far from its tick a number is, in pixels. */
const NUMBER_GAP = 4

/** How far the name of an axis is from its arrow, in pixels. */
const NAME_GAP = 6

/** The config of an axis as it keeps it: the line, with the options of the axis. */
export type IAxisResolvedConfig = ILineResolvedConfig & IAxisOptions

/** A tick that is drawn: its segment, and the number written at it (none for a tick between two numbers). */
export interface DrawnTick {
    /** The value the tick stands for, in units. */
    value: number,
    /** The ends of the tick, in pixels. */
    from: XY,
    to: XY,
    /** The number, with where it is written and how it is aligned to that place. */
    label: (TickLabel & { at: XY, alignement: LABEL_POSITION }) | null
}

/** The name of an axis, with where it is written and how it is aligned to that place. */
export interface DrawnName {
    text: string,
    at: XY,
    alignement: LABEL_POSITION
}

/** The `text-anchor` and the `dominant-baseline` of a text that lies on a side of its place. */
const TEXT_ANCHOR: Record<string, string> = {l: 'end', c: 'middle', r: 'start'}
const TEXT_BASELINE: Record<string, string> = {t: 'auto', m: 'central', b: 'hanging'}

/** The words of TikZ that put a node on a side of its place (`above left`). */
const TIKZ_VERTICAL: Record<string, string> = {t: 'above', m: '', b: 'below'}
const TIKZ_HORIZONTAL: Record<string, string> = {l: 'left', c: '', r: 'right'}

/**
 * An axis: a line with an arrow at its end, that stops `padding` pixels before the borders of the drawing (see {@link IAxisConfig}).
 * Being a line, it is found like one, and is a line for the figures that are built from lines (an intersection, a perpendicular...).
 *
 * The axes of the coordinate system are the line through the origin with the direction of each axis; any other line can be an axis.
 * An axis that is shorter than twice its padding, or has no position, is not drawn.
 *
 * An axis can be graduated (`ticks`): a tick and a number every step, from its zero. The numbers are written on one side of the axis,
 * and thinned out when the ticks are too close (one number in as many ticks as it takes). Its `name` is written beyond the arrow.
 */
export class Axis extends Line {
    declare protected _config: IAxisResolvedConfig

    // These are made while the line is, before the fields of this class are set: they are only declared.
    declare protected _marks?: Path
    declare protected _texts?: G
    declare protected _ticks: DrawnTick[]
    declare protected _drawnName: DrawnName | null
    declare protected _unit: XY | null

    /**
     * @throws InvalidArgumentError if the padding, the graduation, the name or the side are not valid, the axis is graduated but is not
     * given by two points or a point and a vector, or `values` is not a valid line (see {@link Line}). Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IAxisConfig) {
        // Before the figure draws anything in the svg.
        checkAxis(values, name)

        super(context, name, {...values, shape: 'line'})
    }

    override get config(): IAxisResolvedConfig {
        return this._config
    }

    /**
     * Replace the config of the axis: it finds its place again.
     * @throws InvalidArgumentError, ParseError if `value` is not valid (see the constructor). The axis is then left as it was.
     */
    override set config(value: IAxisConfig) {
        checkAxis(value, this.name)

        super.config = {...value, shape: 'line'}
    }

    /** How far the drawn axis stops from the borders of the drawing, in pixels. */
    get padding(): number {
        return this._config.padding ?? AXIS_PADDING
    }

    /**
     * The vector of one unit of the axis, in pixels: `d` for an axis given by `director`, `B - A` for one given by `through`. `null` for an
     * axis found any other way (`slope`, `parallel`...), which has no unit, or that is not drawn.
     */
    get unit(): XY | null {
        const unit = this._unit as XY | null | undefined

        return unit === undefined || unit === null ? null : {...unit}
    }

    /** The ticks that are drawn, with their numbers. A copy, empty when the axis is not graduated or not drawn. */
    get ticks(): DrawnTick[] {
        return (this._ticks as DrawnTick[] | undefined ?? []).map(tick => ({
            ...tick,
            from: {...tick.from},
            to: {...tick.to},
            label: tick.label === null ? null : {...tick.label, at: {...tick.label.at}}
        }))
    }

    /** The name of the axis as it is drawn, or `null` for an axis without a name or that is not drawn. */
    get drawnName(): DrawnName | null {
        const drawn = this._drawnName as DrawnName | null | undefined

        return drawn === undefined || drawn === null ? null : {...drawn, at: {...drawn.at}}
    }

    /** The line, with an arrow at its end, then what the graduation draws. */
    protected override _makeShape(): Shape {
        const shape = super._makeShape()

        this.mark({side: 'end'})
        this._marks = this.element.path('M 0 0')
        this._texts = this.element.group()
        this._ticks = []
        this._drawnName = null
        this.stroke()

        return shape
    }

    /** The ticks carry the stroke of the axis, like its line. */
    override strokeable(): Shape[] {
        return this._marks === undefined ? [this.shape] : [this.shape, this._marks]
    }

    /** The numbers and the name have the color of the stroke, which the markers follow too. */
    protected override _styleMarkers(): void {
        super._styleMarkers()
        this._texts?.attr('fill', this._appearance.stroke.color)
    }

    /** Draw the line, move its ends in by the padding, then draw the graduation. */
    protected override _place(found: LineFound): this {
        super._place(found)

        // The unit is the vector of the zero: an axis with a graduation has one.
        const constraint = constraintOf(this._config, this.name)
        this._unit = (constraint === 'director' || constraint === 'through') && Number.isFinite(found.direction.x) && Number.isFinite(found.direction.y)
            ? {x: found.direction.x, y: found.direction.y}
            : null

        if (Number.isNaN(this._start.x)) {
            return this._graduate(found, false)
        }

        const inset = insetEnds(this._start, this._end, this.padding)

        if (inset === null) {
            this._start = nowhere()
            this._end = nowhere()
            this._setDefined(false)

            return this._graduate(found, false)
        }

        [this._start, this._end] = inset
        ;(this.shape as svgLine).plot(this._start.x, this._start.y, this._end.x, this._end.y)

        return this._graduate(found, true)
    }

    /** The side of the axis that has the numbers, as a unit vector on the screen. */
    protected _numbersSide(direction: XY): XY {
        // The right of a way (dx, dy) on the screen, where y points down, is (-dy, dx).
        return this._config.side === 'left' ? {x: direction.y, y: -direction.x} : {x: -direction.y, y: direction.x}
    }

    /** Find the ticks, the numbers and the name again, and draw them. Nothing for an axis that is not drawn. */
    protected _graduate(found: LineFound, drawn: boolean): this {
        this._ticks = []
        this._drawnName = null

        const length = drawn ? Math.hypot(this._end.x - this._start.x, this._end.y - this._start.y) : 0

        if (length > 0) {
            const direction = {x: (this._end.x - this._start.x) / length, y: (this._end.y - this._start.y) / length}
            const side = this._numbersSide(direction)

            this._ticks = this._ticksOf(found, direction, side)

            if (this._config.name !== undefined) {
                this._drawnName = {
                    text: this._config.name,
                    at: {x: this._end.x + NAME_GAP * (direction.x - side.x), y: this._end.y + NAME_GAP * (direction.y - side.y)},
                    alignement: labelAlignementToward(direction.x - side.x, direction.y - side.y)
                }
            }
        }

        this._paint()

        return this
    }

    /** The ticks of the graduation on the drawn part of the axis, with the numbers that are written. */
    protected _ticksOf(found: LineFound, direction: XY, side: XY): DrawnTick[] {
        const config = ticksOf(this._config)

        if (config === null) {
            return []
        }

        const end = {x: this._end.x - ARROW_CLEARANCE * direction.x, y: this._end.y - ARROW_CLEARANCE * direction.y}
        const ticks = tickPositions(found.start, found.direction, config.step, this._start, end, MIN_TICK_SPACING)
        const alignement = labelAlignementToward(side.x, side.y)
        const half = config.size / 2

        // The numbers are thinned out by default: one in as many of the ticks that are drawn as it takes to keep them apart.
        const marksEvery = config.marks?.every ?? 1
        const every = labelEvery(config.step * Math.hypot(found.direction.x, found.direction.y) * marksEvery, MIN_LABEL_SPACING) * marksEvery
        const numbered = (index: number) => config.numbers === undefined
            ? index % every === 0 || (config.marks?.first === true && index === 1)
            : config.numbers !== 'none' && selects(index, config.numbers)

        return ticks
            .filter(tick => (config.zero || tick.index !== 0) && selects(tick.index, config.marks))
            .map(({index, value, point}) => ({
                value,
                from: {x: point.x - half * side.x, y: point.y - half * side.y},
                to: {x: point.x + half * side.x, y: point.y + half * side.y},
                label: numbered(index)
                    ? {
                        ...tickLabel(value, config.labels, config.digits),
                        at: {x: point.x + (half + NUMBER_GAP) * side.x, y: point.y + (half + NUMBER_GAP) * side.y},
                        alignement
                    }
                    : null
            }))
    }

    /** Draw the ticks and the texts that were found. */
    protected _paint(): void {
        const at = (p: XY) => `${pathNumber(p.x)},${pathNumber(p.y)}`
        const ticks = this._ticks
        const texts = this._texts

        this._marks?.plot(ticks.length === 0 ? 'M 0 0' : ticks.map(({from, to}) => `M${at(from)} L${at(to)}`).join(' '))
        texts?.clear()

        const write = (text: string, place: XY, alignement: LABEL_POSITION) => {
            texts?.text(text).attr({
                x: pathNumber(place.x),
                y: pathNumber(place.y),
                'text-anchor': TEXT_ANCHOR[alignement[1]],
                'dominant-baseline': TEXT_BASELINE[alignement[0]]
            })
        }

        for (const tick of ticks) {
            if (tick.label !== null) {
                write(tick.label.text, tick.label.at, tick.label.alignement)
            }
        }

        if (this._drawnName !== null) {
            write(this._drawnName.text, this._drawnName.at, this._drawnName.alignement)
        }

        this._styleMarkers()
    }

    /** The words that put a TikZ node on the side of its place that an alignment says. */
    protected static _tikzSide(alignement: LABEL_POSITION): string {
        return [TIKZ_VERTICAL[alignement[0]], TIKZ_HORIZONTAL[alignement[1]]].filter(word => word !== '').join(' ')
    }

    /**
     * The axis as TikZ: its line with the arrow and its label, then its ticks in one `\draw` (without the arrow), then a node for each
     * number and for the name, in math mode (`$\frac{\pi}{2}$`). The numbers have the color of the axis. Nothing for an axis that is
     * hidden or not drawn.
     * @throws InvalidArgumentError if the appearance of the axis has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    override tikz(): string {
        const line = super.tikz()

        if (!this._tikzShown().shape || (this._ticks.length === 0 && this._drawnName === null)) {
            return line
        }

        const {options} = this._tikzStyle()
        // The arrow is the line's: the ticks have the color, the width and the dashes.
        const stroke = options.filter(option => option.includes('='))
        const color = options.find(option => option.startsWith('draw='))?.slice('draw='.length)
        const at = (p: XY) => `(${this._tikzCoordinates(p)})`
        const node = (text: string, place: XY, alignement: LABEL_POSITION) => {
            const style = [Axis._tikzSide(alignement), ...(color === undefined || color === 'black' || color === 'none' ? [] : [`text=${color}`])]
                .filter(word => word !== '')
                .join(', ')

            return `\\node${style === '' ? '' : `[${style}]`} at ${at(place)} {$${text}$};`
        }

        return [
            line,
            this._ticks.length === 0 || stroke.includes('draw=none')
                ? ''
                : `\\draw[${stroke.join(', ')}] ${this._ticks.map(({from, to}) => `${at(from)} -- ${at(to)}`).join(' ')};`,
            ...this._ticks.flatMap(({label}) => label === null ? [] : [node(label.latex, label.at, label.alignement)]),
            this._drawnName === null ? '' : node(this._drawnName.text, this._drawnName.at, this._drawnName.alignement)
        ].filter(part => part !== '').join('\n')
    }
}
