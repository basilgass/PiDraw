import { AbstractFigure } from "../figures/AbstractFigure"
import { IParametricConfig } from "../figures/Parametric"
import { IPlotConfig } from "../figures/Plot"
import { IGraphConfig } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildPlot(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPlotConfig | IParametricConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.PLOT && code.length === 1) {
        // item.code = [<function>]
        const [f] = code
        if (typeof f === 'string') {
            return { expression: f }
        }
    }

    if (item.key === PARSER_TYPE.PARAMETRIC && code.length === 2) {
        // item.code = [<function>,<function>]
        const [x, y] = code
        if (typeof x === 'string' && typeof y === 'string') {
            return { expressions: { x, y } }
        }
    }

    return null

}