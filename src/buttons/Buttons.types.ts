/**
 * The button that a figure is tied to (`toggle=id/0.5`): the id of the button, how long the figure takes to appear or to go (seconds, 0 for at once), and
 * whether the figure is hidden when the button is not pressed (`!` on its line).
 */
export interface IFigureToggle {
    readonly id: string
    readonly duration: number
    readonly hidden: boolean
}

/** A button that the code declares (`@button=id->title=Text`). */
export interface IButtonDefinition {
    readonly id: string
    /** What the button says; the id when the code gives none. */
    readonly title: string
}

/** The buttons that the code declares, in the order of the code. */
export type IButtonDefinitions = readonly IButtonDefinition[]

/** A button, as an interface shows it. */
export interface IButton extends IButtonDefinition {
    /** Whether the button was pressed an odd number of times: the figures that it controls are the reverse of what their line says. */
    readonly active: boolean
}

/** What the event `change` of `Buttons` carries. */
export interface IButtonsChange {
    /** The buttons, in the order of the code. */
    readonly buttons: readonly IButton[]
    /** The button that was pressed, `null` when the list of the buttons changed (the code was changed). */
    readonly toggled: string | null
}

/** The events of `Buttons` by name, with what they carry. */
export interface IButtonsEventMap {
    change: IButtonsChange
}
