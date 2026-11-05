/**
 * Typed error hierarchy for PiDraw.
 *
 * All PiDraw errors extend {@link PiDrawError}, so a consumer can catch every library error at once with
 * `catch (e) { if (e instanceof PiDrawError) ... }`, or discriminate a specific kind with `instanceof ParseError`.
 * The names follow the ones of PiMath.
 */
export class PiDrawError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)
        // Use the concrete subclass name (ParseError, MathError, ...).
        this.name = new.target.name
    }
}

/** The input string cannot be parsed into the target object. */
export class ParseError extends PiDrawError {
}

/**
 * An option of a figure (what follows the `->` of the parser) is not valid, or cannot be applied to the figure.
 * It is a {@link ParseError}: catching that one catches both, and `instanceof OptionError` tells them apart.
 */
export class OptionError extends ParseError {
    /** Name of the option, as written in the code (`o`, `points`...). */
    readonly option: string

    constructor(option: string, message: string, options?: ErrorOptions) {
        super(message, options)
        this.option = option
    }
}

/** An argument is invalid (outside of string parsing). */
export class InvalidArgumentError extends PiDrawError {
}

/** The operation exists in the contract but is not implemented yet (for instance a figure that cannot be written in TikZ). */
export class NotImplementedError extends PiDrawError {
}

/** Mathematically invalid operation on otherwise valid inputs. */
export class MathError extends PiDrawError {
}

/** The operation is not allowed by the way the object was made (for instance a zoom that was made to move only, asked to zoom). */
export class UnsupportedOperationError extends PiDrawError {
}
