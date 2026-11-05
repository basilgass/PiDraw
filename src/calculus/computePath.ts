import type {XY} from "../pidraw.common"
import {ParseError} from "../errors"
import type {BezierSegment} from "./computeBezier"
import {pathNumber} from "./computeCurve"

// A path of the SVG (`M 0 0 L 2 1 C ... A ... Z`), read as lines and cubic curves with absolute positions: what is easy to transform,
// to write in another language, to measure and to follow. Pure maths.

/** A piece of a path: where it moves to (`M`), a line (`L`), a cubic curve (`C`), or the line back to the start of the piece (`Z`). */
export type PathCommand =
    | { type: 'M', p: XY }
    | { type: 'L', p: XY }
    | { type: 'C', c1: XY, c2: XY, p: XY }
    | { type: 'Z' }

/** How many numbers each command takes (an arc: the radii, the rotation, two flags, and the end). */
const COUNTS: Record<string, number> = {M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0}

/** A number of a path: `10`, `-.5`, `1e-3`. */
const NUMBER = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y

const COMMAND = /[A-Za-z]/

/**
 * The arc of an ellipse from `from` to `to`, as cubic curves (one per quarter of turn at most), following the rules of the SVG: the radii
 * grow if they are too small, and two flags choose among the four arcs that fit.
 */
function arcToCubics(from: XY, rx: number, ry: number, rotation: number, large: boolean, sweep: boolean, to: XY): PathCommand[] {
    if (from.x === to.x && from.y === to.y) {
        return []
    }

    if (rx === 0 || ry === 0) {
        return [{type: 'L', p: to}]
    }

    const phi = rotation * Math.PI / 180
    const cos = Math.cos(phi)
    const sin = Math.sin(phi)
    const half = {x: (from.x - to.x) / 2, y: (from.y - to.y) / 2}
    const x1 = cos * half.x + sin * half.y
    const y1 = -sin * half.x + cos * half.y

    let radiusX = Math.abs(rx)
    let radiusY = Math.abs(ry)
    // Radii that are too small to reach are grown until they just do.
    const scale = (x1 * x1) / (radiusX * radiusX) + (y1 * y1) / (radiusY * radiusY)

    if (scale > 1) {
        radiusX *= Math.sqrt(scale)
        radiusY *= Math.sqrt(scale)
    }

    const rx2 = radiusX * radiusX
    const ry2 = radiusY * radiusY
    const numerator = rx2 * ry2 - rx2 * y1 * y1 - ry2 * x1 * x1
    const coefficient = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, numerator / (rx2 * y1 * y1 + ry2 * x1 * x1)))
    const cx1 = coefficient * radiusX * y1 / radiusY
    const cy1 = -coefficient * radiusY * x1 / radiusX
    const center = {x: cos * cx1 - sin * cy1 + (from.x + to.x) / 2, y: sin * cx1 + cos * cy1 + (from.y + to.y) / 2}

    const angle = (ux: number, uy: number, vx: number, vy: number) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
    const start = angle(1, 0, (x1 - cx1) / radiusX, (y1 - cy1) / radiusY)
    let extent = angle((x1 - cx1) / radiusX, (y1 - cy1) / radiusY, (-x1 - cx1) / radiusX, (-y1 - cy1) / radiusY)

    if (!sweep && extent > 0) {
        extent -= 2 * Math.PI
    } else if (sweep && extent < 0) {
        extent += 2 * Math.PI
    }

    // The point of the ellipse at an angle of the circle it comes from.
    const onEllipse = (theta: number): XY => ({
        x: center.x + radiusX * Math.cos(theta) * cos - radiusY * Math.sin(theta) * sin,
        y: center.y + radiusX * Math.cos(theta) * sin + radiusY * Math.sin(theta) * cos
    })
    // The direction of the ellipse there, scaled.
    const slope = (theta: number): XY => ({
        x: -radiusX * Math.sin(theta) * cos - radiusY * Math.cos(theta) * sin,
        y: -radiusX * Math.sin(theta) * sin + radiusY * Math.cos(theta) * cos
    })

    const pieces = Math.max(1, Math.ceil(Math.abs(extent) / (Math.PI / 2) - 1e-9))
    const delta = extent / pieces
    const k = 4 / 3 * Math.tan(delta / 4)

    return Array.from({length: pieces}, (_, index): PathCommand => {
        const a = start + index * delta
        const b = a + delta
        const pa = onEllipse(a)
        const pb = index === pieces - 1 ? to : onEllipse(b)
        const da = slope(a)
        const db = slope(b)

        return {
            type: 'C',
            c1: {x: pa.x + k * da.x, y: pa.y + k * da.y},
            c2: {x: pb.x - k * db.x, y: pb.y - k * db.y},
            p: pb
        }
    })
}

/**
 * Read the data of an SVG path as absolute lines and cubic curves: the relative commands (`m l h v c s q t a`) are moved to where they
 * are, `H V` are lines, `S` and `Q T` are cubic curves, and an arc `A` is a few cubic curves that follow it. A path of the SVG can have
 * several pieces (each begins with `M`).
 *
 * @returns the commands in order; none for a path that is empty.
 * @throws ParseError if the path does not begin with `M`, has a command that does not exist, a number that is missing or not valid, or
 * something that is neither of those.
 */
export function parsePath(d: string): PathCommand[] {
    const commands: PathCommand[] = []
    let pos = 0
    let command = ''
    let current: XY = {x: 0, y: 0}
    let start: XY = {x: 0, y: 0}
    // The last control point of a cubic curve (for `S`) and of a quadratic one (for `T`), if the command before made one.
    let cubic: XY | null = null
    let quadratic: XY | null = null

    const fail = (message: string): never => {
        throw new ParseError(`Invalid path ${JSON.stringify(d)}: ${message} (at the character ${pos + 1})`)
    }

    const spaces = () => {
        while (pos < d.length && /\s/.test(d[pos])) {
            pos++
        }
    }

    // What separates two values: spaces, and one comma.
    const separator = () => {
        spaces()

        if (d[pos] === ',') {
            pos++
            spaces()
        }
    }

    const number = (): number => {
        separator()
        NUMBER.lastIndex = pos
        const found = NUMBER.exec(d)

        if (found === null) {
            return fail('expected a number')
        }

        pos += found[0].length

        return +found[0]
    }

    const flag = (): boolean => {
        separator()

        if (d[pos] !== '0' && d[pos] !== '1') {
            return fail('expected 0 or 1')
        }

        pos++

        return d[pos - 1] === '1'
    }

    spaces()

    while (pos < d.length) {
        spaces()

        if (pos >= d.length) {
            break
        }

        if (COMMAND.test(d[pos])) {
            command = d[pos]

            if (!(command.toUpperCase() in COUNTS)) {
                fail(`the command "${command}" does not exist`)
            }

            if (commands.length === 0 && command !== 'M' && command !== 'm') {
                fail('a path begins with M')
            }

            pos++

            if (command === 'Z' || command === 'z') {
                commands.push({type: 'Z'})
                current = start
                cubic = quadratic = null
                command = ''

                continue
            }
        } else if (command === '') {
            fail('expected a command')
        }

        const relative = command === command.toLowerCase()
        const kind = command.toUpperCase()
        const base = relative ? current : {x: 0, y: 0}
        const point = (): XY => {
            const x = base.x + number()

            return {x, y: base.y + number()}
        }

        switch (kind) {
            case 'M': {
                current = point()
                start = current
                commands.push({type: 'M', p: current})
                cubic = quadratic = null
                // The pairs that follow are lines.
                command = relative ? 'l' : 'L'
                break
            }
            case 'L': {
                current = point()
                commands.push({type: 'L', p: current})
                cubic = quadratic = null
                break
            }
            case 'H': {
                current = {x: base.x + number(), y: current.y}
                commands.push({type: 'L', p: current})
                cubic = quadratic = null
                break
            }
            case 'V': {
                current = {x: current.x, y: base.y + number()}
                commands.push({type: 'L', p: current})
                cubic = quadratic = null
                break
            }
            case 'C': {
                const c1 = point()
                const c2 = point()
                current = point()
                commands.push({type: 'C', c1, c2, p: current})
                cubic = c2
                quadratic = null
                break
            }
            case 'S': {
                const c1 = cubic === null ? current : {x: 2 * current.x - cubic.x, y: 2 * current.y - cubic.y}
                const c2 = point()
                current = point()
                commands.push({type: 'C', c1, c2, p: current})
                cubic = c2
                quadratic = null
                break
            }
            case 'Q':
            case 'T': {
                const control: XY = kind === 'T'
                    ? quadratic === null ? current : {x: 2 * current.x - quadratic.x, y: 2 * current.y - quadratic.y}
                    : point()
                const end = point()

                // A quadratic curve is the cubic curve with controls two thirds of the way to its control.
                commands.push({
                    type: 'C',
                    c1: {x: current.x + 2 / 3 * (control.x - current.x), y: current.y + 2 / 3 * (control.y - current.y)},
                    c2: {x: end.x + 2 / 3 * (control.x - end.x), y: end.y + 2 / 3 * (control.y - end.y)},
                    p: end
                })
                current = end
                quadratic = control
                cubic = null
                break
            }
            default: {
                // An arc: the radii, the rotation, the two flags, and the end.
                const rx = number()
                const ry = number()
                const rotation = number()
                const large = flag()
                const sweep = flag()
                const end = point()

                commands.push(...arcToCubics(current, rx, ry, rotation, large, sweep, end))
                current = end
                cubic = quadratic = null
            }
        }
    }

    return commands
}

/** The same commands with each position changed by `change`. A change that keeps lines straight (a scale, a rotation, a shear) keeps curves exact. */
export function transformPath(commands: PathCommand[], change: (position: XY) => XY): PathCommand[] {
    return commands.map((command): PathCommand => {
        switch (command.type) {
            case 'M':
            case 'L':
                return {type: command.type, p: change(command.p)}
            case 'C':
                return {type: 'C', c1: change(command.c1), c2: change(command.c2), p: change(command.p)}
            case 'Z':
                return command
        }
    })
}

/** The commands as the data of an SVG path, with 2 decimals at most: `M 0 0 L 10 5 C ... Z`. */
export function pathToString(commands: PathCommand[]): string {
    const at = (p: XY) => `${pathNumber(p.x)} ${pathNumber(p.y)}`

    return commands.map((command) => {
        switch (command.type) {
            case 'M':
            case 'L':
                return `${command.type} ${at(command.p)}`
            case 'C':
                return `C ${at(command.c1)} ${at(command.c2)} ${at(command.p)}`
            case 'Z':
                return 'Z'
        }
    }).join(' ')
}

/**
 * The curves of each piece of the path, as cubic curves (a line is one). A piece begins at an `M`; `Z` adds the line back to its start,
 * if it is not there already. A piece that draws nothing (an `M` alone) is left out.
 */
export function pathPieces(commands: PathCommand[]): BezierSegment[][] {
    const pieces: BezierSegment[][] = []
    let segments: BezierSegment[] = []
    let current: XY = {x: 0, y: 0}
    let start: XY = {x: 0, y: 0}

    const line = (to: XY): BezierSegment => ({
        start: current,
        control1: {x: current.x + (to.x - current.x) / 3, y: current.y + (to.y - current.y) / 3},
        control2: {x: current.x + 2 * (to.x - current.x) / 3, y: current.y + 2 * (to.y - current.y) / 3},
        end: to
    })

    const finish = () => {
        if (segments.length > 0) {
            pieces.push(segments)
        }

        segments = []
    }

    for (const command of commands) {
        if (command.type === 'M') {
            finish()
            current = start = command.p
        } else if (command.type === 'L') {
            segments.push(line(command.p))
            current = command.p
        } else if (command.type === 'C') {
            segments.push({start: current, control1: command.c1, control2: command.c2, end: command.p})
            current = command.p
        } else {
            if (current.x !== start.x || current.y !== start.y) {
                segments.push(line(start))
            }

            current = start
        }
    }

    finish()

    return pieces
}
