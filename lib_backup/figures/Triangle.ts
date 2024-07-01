import { Figure, IFigureConfig } from "../Figure"

export class Triangle extends Figure {
    constructor(
        config: IFigureConfig,
    ) {
        // TODO : build the triangle class
        super(config)

        this.generateName()
    }

    generateName(): string {
        return super.generateName()
    }
}