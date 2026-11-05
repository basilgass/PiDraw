export interface ISlideRange {
    from: number;
    to?: number;
}
export type ISlideSet = readonly ISlideRange[];
export type ISlideTitles = Readonly<Record<number, string>>;
export interface ISlidesOptions {
    count?: number;
}
export interface ISlidesState {
    current: number;
    count: number;
    title: string | null;
}
export interface ISlidesEventMap {
    'change': ISlidesState;
}
//# sourceMappingURL=Slides.types.d.ts.map