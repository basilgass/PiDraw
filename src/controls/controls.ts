import {ANIMATE_SYNTAX} from "../animate/Animate.syntax"
import type {IThemeSyntax, OptionValueType} from "../parser/parser.types"
import {SLIDES_SYNTAX} from "../slides/Slides.syntax"
import type {IControlsFigure} from "./controls.types"

/**
 * The themes that add something to the language of the code (options after the `->`, commands `@`), by the name of their entry in the controls
 * of a figure. This is the only place, outside the themes, that names them: the syntax (`Draw`) and the editors (`pidraw/codemirror`) read the
 * language here. A theme that is taken out of the library is taken out of this list and of `index.ts`, and nothing else changes.
 *
 * The type makes the list match `IControlsFigure`: a theme that keeps something on the figures has its syntax here.
 */
export const THEMES: Readonly<Record<keyof IControlsFigure, IThemeSyntax>> = {
    animate: ANIMATE_SYNTAX,
    slide: SLIDES_SYNTAX
}

/** The syntax of every theme. */
export function themeSyntaxes(): IThemeSyntax[] {
    return Object.values(THEMES)
}

/** How the parser reads the value of each option that a theme adds (`slide` is a set). */
export function themeOptionTypes(): Record<string, OptionValueType> {
    return Object.fromEntries(themeSyntaxes().flatMap(theme => Object.entries(theme.optionTypes ?? {})))
}

/** What an editor says about each option that a theme adds. */
export function themeOptionDetails(): Record<string, string> {
    return Object.fromEntries(themeSyntaxes().flatMap(theme => Object.entries(theme.optionDetails ?? {})))
}

/** The values that an editor suggests after each option of a theme and `=`. */
export function themeOptionValues(): Record<string, readonly string[]> {
    return Object.fromEntries(themeSyntaxes().flatMap(theme => Object.entries(theme.optionValues ?? {})))
}
