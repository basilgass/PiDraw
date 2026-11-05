import type {IFigureAnimation} from "../animate/Animate.types"
import type {ISlideSet, ISlideTitles} from "../slides/Slides.types"

/**
 * What the themes (animation, slides...) keep on a figure, by the name of the theme. It is the only place of the core that names them, and only by
 * type: a theme writes its entry with `AbstractFigure.setControl` (through its own function, which checks the value), and reads it in
 * `AbstractFigure.controls`. A new theme adds its line here and its entry to the registry of `controls.ts`.
 */
export interface IControlsFigure {
    /** The animation of a point (see `Animate`). */
    animate: IFigureAnimation
    /** The steps at which the figure is shown (see `Slides`). */
    slide: ISlideSet
}

/**
 * What the themes keep on the graph, by the name of the entry, as they keep theirs on a figure (see `IControlsFigure`): what the code says that belongs
 * to no figure. `Draw` writes it with `Graph.setControl` after each reading, and the controllers read it in `Graph.controls`.
 */
export interface IControlsGraph {
    /** The titles of the steps of a presentation (see `Slides`). */
    titles: ISlideTitles
}
