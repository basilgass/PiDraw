import { loadConfigFromFile } from "vite"
import { AbstractFigure } from "../figures/AbstractFigure"
import { IFillBetweenConfig } from "../figures/FillBetween"
import { IFollowConfig } from "../figures/Follow"
import { IParametricConfig } from "../figures/Parametric"
import { IPlotConfig, Plot } from "../figures/Plot"
import { IRiemannConfig } from "../figures/Riemann"
import { IGraphConfig, isDOMAIN } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildPlot(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPlotConfig | null {
    const code = convertValues(item.code, figures)

    // console.log(item)
    // console.log(code)

    if (item.key === PARSER_TYPE.PLOT) {
        // item.code = [<function>,<domain>,<image>,<@samples>]
        const [f, ...data] = code

        const cfg: IPlotConfig = { expression: typeof f === 'number' ? f.toString() : f as string }

        // data *can* contains: domain, image, samples
        // domain is the first DOMAIN object
        // image is the second DOMAIN object
        // samples is number
        const domains = data.filter((x) => isDOMAIN(x))
        if (domains.length > 0) {
            cfg.domain = domains[0]
        }
        if (domains.length > 1) {
            cfg.image = domains[1]
        }

        const samples = data.filter(d => typeof d === 'number')
        if (samples.length > 0) {
            cfg.samples = samples[0] > 0 ? samples[0] : 10
        }

        return cfg
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

    return null

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