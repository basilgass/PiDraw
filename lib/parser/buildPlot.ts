import { AbstractFigure } from "../figures/AbstractFigure"
import { IFillBetweenConfig } from "../figures/FillBetween"
import { IFollowConfig } from "../figures/Follow"
import { IParametricConfig } from "../figures/Parametric"
import { IPlotConfig, Plot } from "../figures/Plot"
import { IRiemannConfig } from "../figures/Riemann"
import { IGraphConfig, isDOMAIN } from "../pidraw.common"
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

    return null

}

export function buildParametric(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IParametricConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.PARAMETRIC && code.length === 2) {
        // item.code = [<function>,<function>]
        const [x, y] = code
        if (typeof x === 'string' && typeof y === 'string') {
            return { expressions: { x, y } }
        }
    }

    return null
}

export function buildFollow(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFollowConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.FOLLOW && code.length >= 1) {
        // item.code = [<function>,<show tangent ?>]

        const [f, showTangent] = code
        // TODO: Folow with a parametric curve
        if (f instanceof Plot) {
            return {
                follow: f,
                tangent: showTangent === 'show'
            }
        }
    }

}

export function buildFillBetween(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFillBetweenConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.FILL_BETWEEN && code.length >= 2) {
        // item.code = [<function>,<function>,<domain>,<image>]

        const [f1, f2, domain, image] = code
        if (f1 instanceof Plot && f2 instanceof Plot) {

            return {
                expressions: [f1, f2],
                domain: isDOMAIN(domain) ? domain : { min: NaN, max: NaN },
                image: isDOMAIN(image) ? image : { min: NaN, max: NaN }
            }
        }
    }

    return null
}

export function buildRiemann(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IRiemannConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.RIEMANN && code.length >= 2) {
        // item.code = [<function>,<domain>,<number>,<number>]

        const [f, domain, rectangles, position] = code
        return {
            follow: f as Plot,
            domain: isDOMAIN(domain) ? domain : { min: NaN, max: NaN },
            rectangles: typeof rectangles === "number" ? rectangles : 5,
            position: typeof position === "number" ? position : 0
        }
    }

    return null
}