import type {CurveOptions} from "../Curve/Curve.types"

/**
 * A parametric curve: the point `(x(t), y(t))` for `t` in the domain. The functions are written as text with the only
 * variable `t` (`cos(t)`, `t^2/4`): see `NumExp` for what they can contain.
 *
 * The `domain` is from `0` to `2π` by default; `samples` are per unit of `t`, and by default there are 64 at least, or one
 * every 8 pixels of the extent of the domain.
 */
export interface IParametricConfig extends CurveOptions {
    expressions: {
        x: string,
        y: string
    }
}
