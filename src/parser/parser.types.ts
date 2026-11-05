import type {PARSER, PARSER_VALUES, PiParse} from "piparser"
import type {IGraphConfig} from "../pidraw.common"
import type {PARSER_TYPE} from "./parser.common"
import type {IControlsFigure, IControlsGraph} from "../controls/controls.types"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {Graph} from "../Graph"
import type {TeXConverterType} from "../Graph.types"

/** A value of a line of code: what the parser reads (number, text, list), or a figure when the text was the name of one. */
export type IParserValues = PARSER_VALUES | AbstractFigure

/** A kind of figure that the graph can make: a key of `Graph.create` (`point`, `line`, `circle`...), not a key of the syntax (`pt`, `circ`...). */
export type FigureKind = keyof Graph['create']

/** What the `build*` of a figure returns: the kind of figure to create and its config. */
export interface BuildResult<T> {
    create: FigureKind,
    config: T
}

/**
 * A kind of figure of the syntax, as the parser of the figure describes it: how to build it from a line of code, and what
 * `PiDraw.documentation()` and the editor say about it. The parser of a figure exports one table of these, by key.
 */
export interface ParserItem {
    /**
     * Reads the definition of a line (before the `->`): the figures to make, or `null` when there is nothing to make. The options are not read.
     * @throws ParseError if the values of the line do not suit the key.
     */
    build: (item: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => BuildResult<unknown> | BuildResult<unknown>[] | null,
    /** What the key makes, in a sentence. */
    description: string,
    /** The forms of the line, one by string, with the kinds of values between `<>` (`A=mid <point>,<point>`). */
    forms: string[],
    /** The name of the kind of figure. */
    name: string,
    /** One line for the suggestions of the editor: an example of the key, and what it makes (`A=mid A,B — middle`). */
    summary: string,
}

/** The kinds of figures that a parser describes, by key of the syntax. */
export type ParserItems = Partial<Record<PARSER_TYPE, ParserItem>>

export interface IParserConfig {
    parameters?: string,
    code?: string
    tex?: TeXConverterType,
}

/** The options of the shape of a point: a circle (`o`), a square (`s`) or a crosshair (`*`). */
export type PointShapeOption = 'o' | 's' | '*'

/** The shape that the points of a drawing take when they do not ask for one (`points=s/12`). */
export interface IPointsSetting {
    shape: PointShapeOption,
    /** Size of the shape, by default the one of the shape. */
    size?: number
}

export interface IParserSettings {
    label?: boolean,
    tex?: boolean,
    /** `false` hides the points (`no-points`). */
    points?: false | IPointsSetting,
}

/** An option (after the `->`) or a parameter of the graph: its `value` (`true` for one written without a value) and the values that come with it (`options`). */
export interface IParserParameters {
    value: IParserValues,
    options: IParserValues[]
}

/**
 * What applies one option of a line (`label=A/tl`, `close`) to a figure: the value of the option, and its parameters.
 * @throws OptionError if the figure cannot take the option, or the value is not valid.
 */
export type FigureOptionHandler = (figure: AbstractFigure, option: IParserParameters) => void

/** The options of a line of code (what follows the `->`), by name. */
export type Options = Record<string, IParserParameters>

/** What an option can need besides the figure: the graph, and the other options of the same line (`animate` reads `from`, `to`...). */
export interface IOptionContext {
    graph: Graph
    options: Options
}

/**
 * What applies one option to a figure.
 * @throws OptionError if the figure cannot take the option, or the value is not valid.
 */
export type OptionHandler = (figure: AbstractFigure, option: IParserParameters, context: IOptionContext) => void

/** How the parser reads the value of an option: the text as it is written, or a set between chevrons (`<2-4>`). */
export type OptionValueType = 'text' | 'set'

/** A line of the code that is a command: its name, what follows the name (`=<2->`, or nothing), and the whole line for the messages. */
export interface ICommandLine {
    name: string
    value: string
    text: string
}

/** The commands of a theme (the lines that start with `@`), folded over the lines of the code. */
export interface ICommandSyntax<State = unknown> {
    /** The names of the commands, without the `@`. */
    names: readonly string[]
    /** Every full line that is a valid command of the theme, for an editor that colors them. */
    pattern: RegExp
    /** What the theme knows before the first line. */
    initial: State
    /**
     * Fold a command into what the theme knows.
     * @throws ParseError if the command is not valid.
     */
    fold(state: State, command: ICommandLine, parser: PiParse): State
    /** What the state gives to the figures that follow, unless a line says its own. */
    defaults(state: State): Partial<IControlsFigure>
    /**
     * What the state at the end of the code gives to the graph: the entries it sets, and `null` for the ones it takes away. The state of the end holds
     * every line, so a command can be anywhere in the code.
     */
    graphControls?(state: State): { [K in keyof IControlsGraph]?: IControlsGraph[K] | null }
}

/** What a theme adds to the language of the code. The registry (`controls/controls.ts`) lists them; nothing else in the syntax names a theme. */
export interface IThemeSyntax {
    /** The options it adds, by name. A name belongs to one handler in the whole language. */
    options: Record<string, OptionHandler>
    /** The options whose value the parser must read differently from the default. */
    optionTypes?: Record<string, OptionValueType>
    /** What an editor says about the options (the suggestions). */
    optionDetails?: Record<string, string>
    /** The values that an editor suggests after an option and `=`. */
    optionValues?: Record<string, readonly string[]>
    /** The commands it adds. */
    commands?: ICommandSyntax
    /** The entries of the controls of a point that its drag handle takes too: the handle goes with the point. */
    handleControls?: readonly (keyof IControlsFigure)[]
}
