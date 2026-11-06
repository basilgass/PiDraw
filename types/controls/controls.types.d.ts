import type { IFigureAnimation } from "../animate/Animate.types";
import type { IButtonDefinitions, IFigureToggle } from "../buttons/Buttons.types";
import type { ISlideSet, ISlideTitles } from "../slides/Slides.types";
export interface IControlsFigure {
    animate: IFigureAnimation;
    slide: ISlideSet;
    toggle: IFigureToggle;
}
export interface IControlsGraph {
    titles: ISlideTitles;
    buttons: IButtonDefinitions;
}
//# sourceMappingURL=controls.types.d.ts.map