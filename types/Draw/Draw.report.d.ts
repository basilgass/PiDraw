import { PiDrawError } from "../errors";
export type DrawSeverity = 'error' | 'pending';
export interface IDrawError {
    line: number;
    text: string;
    from?: number;
    to?: number;
    severity: DrawSeverity;
    message: string;
    error: PiDrawError;
}
export type DrawLineState = 'ok' | DrawSeverity;
export interface IDrawLineStatus {
    line: number;
    status: DrawLineState;
}
export interface IDrawReport {
    errors: IDrawError[];
    lines: IDrawLineStatus[];
}
export interface IRefreshOptions {
    editing?: number;
    drag?: 'keep' | 'reset';
}
export declare function asPiDrawError(error: unknown, text: string): PiDrawError;
export declare function locate(text: string, error: PiDrawError, indent?: number): {
    from?: number;
    to?: number;
};
export declare function drawError(line: {
    number: number;
    text: string;
    indent: number;
}, error: PiDrawError, severity: DrawSeverity): IDrawError;
//# sourceMappingURL=Draw.report.d.ts.map