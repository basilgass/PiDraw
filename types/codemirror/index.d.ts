import type { Extension } from '@codemirror/state';
export { pidrawCompletion } from './completion';
export { nameRanges, pidrawNames } from './decorations';
export type { INameRange, NameKind } from './decorations';
export { pidrawHighlight } from './highlight';
export { pidrawLanguage } from './language';
export type { PidrawMode } from './language';
export { readVocabulary } from './vocabulary';
export type { IVocabulary } from './vocabulary';
export interface IPidrawEditorOptions {
    completion?: boolean;
    highlight?: boolean;
    names?: boolean;
}
export declare function pidraw(options?: IPidrawEditorOptions): Extension[];
export declare function pidrawParameters(options?: IPidrawEditorOptions): Extension[];
//# sourceMappingURL=index.d.ts.map