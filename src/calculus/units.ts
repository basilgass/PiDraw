import {InvalidArgumentError} from "../errors"

// The unit and the scale of the lengths that a label writes (`@length`, `@area`...). They change nothing of the drawing: a figure
// is measured in units of the coordinate system, and the label multiplies by the scale and adds the symbol. Pure maths and text.

/** A unit of length that a graph can write: the metric ones, and `u` for a unit that is not a length of the real world. */
export type LengthUnit = 'pm' | 'nm' | 'µm' | 'mm' | 'cm' | 'dm' | 'm' | 'dam' | 'hm' | 'km' | 'u'

/** The units of length that a graph can write. */
export const LENGTH_UNITS: readonly LengthUnit[] = ['pm', 'nm', 'µm', 'mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km', 'u']

/** How the lengths of a graph are written. */
export interface IMeasure {
    /** The symbol written after a length. `null` writes none. */
    unit: LengthUnit | null,
    /** How many `unit` (or how many times) a length of one unit of the coordinate system is: the length written is `length * scale`. */
    scale: number
}

/** No unit, and a length as it is. */
export const DEFAULT_MEASURE: Readonly<IMeasure> = {unit: null, scale: 1}

/** The spellings of the micro sign and the ascii one, that are the same unit. */
const MICRO = /^[µμu]m$/

/**
 * The unit written as the user gives it, in its form of {@link LENGTH_UNITS}.
 * @returns `null` if it is none of them (`um`, with the micro sign or the Greek mu, is `µm`).
 */
export function lengthUnitOf(text: string): LengthUnit | null {
    const written = MICRO.test(text) ? 'µm' : text

    return (LENGTH_UNITS as readonly string[]).includes(written) ? written as LengthUnit : null
}

/**
 * Check how the lengths are written.
 * @throws InvalidArgumentError if the unit is not one of {@link LENGTH_UNITS}, or the scale is not a finite number greater than 0.
 */
export function checkMeasure(measure: IMeasure): void {
    if (measure.unit !== null && !(LENGTH_UNITS as readonly string[]).includes(measure.unit)) {
        throw new InvalidArgumentError(
            `Invalid unit ${JSON.stringify(measure.unit)} for the graph: expected ${LENGTH_UNITS.join(', ')}`
        )
    }

    if (!(Number.isFinite(measure.scale) && measure.scale > 0)) {
        throw new InvalidArgumentError(`Invalid scale ${String(measure.scale)} for the graph: expected a finite number greater than 0`)
    }
}

/** A length (`power` 1) or an area (`power` 2) of the coordinate system, multiplied by the scale. */
export function scaled(value: number, measure: IMeasure, power: 1 | 2): number {
    return value * measure.scale ** power
}

/** The symbol of a unit, with its power: `mm`, `mm²`; in TeX `\mathrm{mm}`, `\mathrm{mm}^2`. */
function unitSymbol(unit: LengthUnit, power: 1 | 2, tex: boolean): string {
    if (!tex) {
        return `${unit}${power === 2 ? '²' : ''}`
    }

    const name = unit === 'µm' ? '\\mu\\mathrm{m}' : `\\mathrm{${unit}}`

    return `${name}${power === 2 ? '^2' : ''}`
}

/**
 * A number of a length followed by the unit, with a space between: `5 mm`, in TeX `5\,\mathrm{mm}`. The number alone without a unit.
 * @param power 1 for a length, 2 for an area.
 */
export function withUnit(number: string, unit: LengthUnit | null, power: 1 | 2, tex: boolean): string {
    if (unit === null) {
        return number
    }

    return `${number}${tex ? '\\,' : ' '}${unitSymbol(unit, power, tex)}`
}

/** A number of degrees followed by the degree sign: `60°`, in TeX `60^\circ`. */
export function withDegree(number: string, tex: boolean): string {
    return tex ? `${number}^\\circ` : `${number}°`
}
