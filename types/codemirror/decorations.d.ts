import { type Extension } from '@codemirror/state';
export type NameKind = 'def' | 'dup' | 'ref';
export interface INameRange {
    from: number;
    to: number;
    kind: NameKind;
}
export declare function nameRanges(code: string): INameRange[];
export declare function pidrawNames(): Extension;
//# sourceMappingURL=decorations.d.ts.map