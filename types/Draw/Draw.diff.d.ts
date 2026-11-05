import type { PARSER } from "piparser";
import type { PiDrawError } from "../errors";
export interface ILineRecord {
    number: number;
    text: string;
    indent: number;
    valid: PARSER | null;
    validText: string | null;
    error: PiDrawError | null;
    fallback: boolean;
    created: string[];
}
export declare function reusableCount(before: readonly ILineRecord[], lines: readonly {
    text: string;
}[]): number;
export declare function editedRecord(before: readonly ILineRecord[], lines: readonly {
    number: number;
    text: string;
}[], editing: number): ILineRecord | undefined;
//# sourceMappingURL=Draw.diff.d.ts.map