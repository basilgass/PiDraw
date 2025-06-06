import {type PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure"
import {type IFillBetweenConfig} from "../figures/FillBetween"
import {type IFollowConfig} from "../figures/Follow"
import {type IParametricConfig} from "../figures/Parametric"
import {type IPlotConfig, Plot} from "../figures/Plot"
import {type IRiemannConfig} from "../figures/Riemann"
import {type buildInterface, type IGraphConfig, isDOMAIN} from "../pidraw.common"
import {convertIdToFigure, PARSER_TYPE} from "./parser.common"

export function buildPlot(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IPlotConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    // console.log(item)
    // console.log(code)

    if (item.key === PARSER_TYPE.PLOT.toString()) {
        // item.code = [<function>,<domain>,<image>,<@samples>]
        const [f, ...data] = code

        const config: IPlotConfig = {expression: typeof f === 'number' ? f.toString() : f as string}

        // data *can* contains: domain, image, samples
        // domain is the first DOMAIN object
        // image is the second DOMAIN object
        // samples is number
        const domains = data.filter((x) => isDOMAIN(x))
        if (domains.length > 0) {
            config.domain = domains[0]
        }
        if (domains.length > 1) {
            config.image = domains[1]
        }

        const samples = data.filter(d => typeof d === 'number')
        if (samples.length > 0) {
            config.samples = samples[0] > 0 ? samples[0] : 10
        }

        return {
            create: 'plot',
            config
        }
    }

    return null

}

export function buildParametric(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IParametricConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.PARAMETRIC.toString() && code.length === 2) {
        // item.code = [<function>,<function>]
        const [x, y] = code
        if (typeof x === 'string' && typeof y === 'string') {
            return {
                create: 'parametric',
                config: {expressions: {x, y}}
            }
        }
    }

    return null
}

export function buildFollow(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IFollowConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.FOLLOW.toString() && code.length >= 1) {
        // item.code = [<function>,<show tangent ?>]

        const [f, showTangent] = code
        // TODO: Folow with a parametric curve
        if (f instanceof Plot) {
            return {
                create: 'follow',
                config: {
                    follow: f,
                    tangent: showTangent === 'show'
                }

            }
        }
    }

    return null

}

export function buildFillBetween(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IFillBetweenConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.FILL_BETWEEN.toString() && code.length >= 2) {

        const f1 = code[0]
        const f2 = code[1] instanceof Plot ? code[1] : null
        const domain = isDOMAIN(code[1]) ? code[1] : code[2]
        const image = isDOMAIN(code[1]) ? code[2] : code[3]

        if (f1 instanceof Plot) {
            return {
                create: 'fillbetween',
                config: {
                    expressions: (f2 instanceof Plot) ? [f1, f2] : [f1],
                    domain: isDOMAIN(domain) ? domain : {min: NaN, max: NaN},
                    image: isDOMAIN(image) ? image : {min: NaN, max: NaN}
                }

            }
        }
    }

    return null
}

export function buildRiemann(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IRiemannConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.RIEMANN.toString() && code.length >= 2) {
        // item.code = [<function>,<domain>,<number>,<number>]

        const [f, domain, rectangles, position] = code
        return {
            create: 'riemann',
            config: {
                follow: f as Plot,
                domain: isDOMAIN(domain) ? domain : {min: NaN, max: NaN},
                rectangles: typeof rectangles === "number" ? rectangles : 5,
                position: typeof position === "number" ? position : 0
            }
        }
    }

    return null
}