import {ARC_ITEMS} from "../figures/Arc/Arc.parser"
import {AXIS_ITEMS} from "../figures/Axis/Axis.parser"
import {BEZIER_ITEMS} from "../figures/Bezier/Bezier.parser"
import {CIRCLE_ITEMS} from "../figures/Circle/Circle.parser"
import {FILL_BETWEEN_ITEMS} from "../figures/FillBetween/FillBetween.parser"
import {FOLLOW_ITEMS} from "../figures/Follow/Follow.parser"
import {GRID_ITEMS} from "../figures/Grid/Grid.parser"
import {LINE_ITEMS} from "../figures/Line/Line.parser"
import {PARAMETRIC_ITEMS} from "../figures/Parametric/Parametric.parser"
import {PATH_ITEMS} from "../figures/Path/Path.parser"
import {PLOT_ITEMS} from "../figures/Plot/Plot.parser"
import {POINT_ITEMS} from "../figures/Point/Point.parser"
import {POLYGON_ITEMS} from "../figures/Polygon/Polygon.parser"
import {RIEMANN_ITEMS} from "../figures/Riemann/Riemann.parser"
import type {ParserItem, ParserItems} from "./parser.types"

/** Joins the tables of the parsers: a key that two of them describe is an error, found when the module loads. */
function registry(...tables: ParserItems[]): Record<string, ParserItem> {
    const joined: Record<string, ParserItem> = Object.create(null) as Record<string, ParserItem>

    for (const table of tables) {
        for (const [key, item] of Object.entries(table)) {
            if (key in joined) {
                throw new Error(`The key "${key}" is defined twice`)
            }

            joined[key] = item
        }
    }

    return joined
}

/**
 * The kinds of figures of the syntax, by key: the tables of the parsers of the figures, which describe each key (name, forms, description) next to
 * its `build`. `Draw` picks the `build` of a line from its key, and `PiDraw.documentation()` and the editor read the descriptions. A new figure adds
 * its table here, and a new key needs an example in the guide (`docs:check` lists the ones that have none).
 */
export const PARSER_CONFIG: Record<string, ParserItem> = registry(
    POINT_ITEMS, LINE_ITEMS, CIRCLE_ITEMS, ARC_ITEMS, PLOT_ITEMS, PARAMETRIC_ITEMS, BEZIER_ITEMS, POLYGON_ITEMS,
    FOLLOW_ITEMS, FILL_BETWEEN_ITEMS, PATH_ITEMS, GRID_ITEMS, AXIS_ITEMS, RIEMANN_ITEMS
)
