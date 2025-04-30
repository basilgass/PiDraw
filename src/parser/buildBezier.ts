import type {PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure"
import {BEZIERCONTROL, type buildInterface, type IGraphConfig} from "../pidraw.common"
import type {IBezierConfig} from "../figures/Bezier"
import type {Point} from "../figures/Point"

export function buildBezier(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IBezierConfig> | null {
    const points = item.values.map(value => {
        if (typeof value === "string") {
            const [name, control, ratio] = value.split('/')

            if (!(name in figures)) {
                return null
            }

            const point = figures[name] as unknown as Point

            let BControl: BEZIERCONTROL
            switch (control) {
                case 'H':
                    BControl = BEZIERCONTROL.HORIZONTAL
                    break
                case 'V':
                    BControl = BEZIERCONTROL.VERTICAL
                    break
                default:
                    BControl = BEZIERCONTROL.SMOOTH
            }

            return {
                point,
                controls: {
                    type: BControl,
                    ratio: ratio === undefined ? 0.2 : +ratio,
                    left: null,
                    right: null
                }
            }

        } else {
            return null
        }
    }).filter(x => x!==null)

    return {
        create: 'bezier',
        config: {points}
    }

}