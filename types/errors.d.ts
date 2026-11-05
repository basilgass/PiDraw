export declare class PiDrawError extends Error {
    constructor(message: string, options?: ErrorOptions);
}
export declare class ParseError extends PiDrawError {
}
export declare class OptionError extends ParseError {
    readonly option: string;
    constructor(option: string, message: string, options?: ErrorOptions);
}
export declare class InvalidArgumentError extends PiDrawError {
}
export declare class NotImplementedError extends PiDrawError {
}
export declare class MathError extends PiDrawError {
}
export declare class UnsupportedOperationError extends PiDrawError {
}
//# sourceMappingURL=errors.d.ts.map