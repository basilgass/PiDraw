export interface IFigureToggle {
    readonly id: string;
    readonly duration: number;
    readonly hidden: boolean;
}
export interface IButtonDefinition {
    readonly id: string;
    readonly title: string;
}
export type IButtonDefinitions = readonly IButtonDefinition[];
export interface IButton extends IButtonDefinition {
    readonly active: boolean;
}
export interface IButtonsChange {
    readonly buttons: readonly IButton[];
    readonly toggled: string | null;
}
export interface IButtonsEventMap {
    change: IButtonsChange;
}
//# sourceMappingURL=Buttons.types.d.ts.map