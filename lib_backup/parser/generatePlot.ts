import { Plot } from "../figures/Plot"
import { Figure } from "../Figure"
import { NumExp } from "../../src/Calculus"
import { Parser } from "../Parser"


interface BuildStep { step: string, figures: Figure[] }

export function updatePlot(parser: Parser, BStep: BuildStep, fx: string): boolean {
    if (BStep.figures.length > 0 && BStep.figures[0] instanceof Plot) {
        // Modify the plot.
        BStep.figures[0].plot(fx, 100)
        return true
    } else {
        return false
    }
}

export function generatePlot(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // f=plot func,min:max,@500,follow
    const domain = parser.graph.unitXDomain,
        fx = code.shift() ?? ''
    let samples = 100

    // Get the samples
    for (const check of code) {
        if (check.startsWith("@")) {
            samples = +check.substring(1)
        }

        if (check.includes(":")) {
            [domain.min, domain.max] = check.split(":").map(x => +x)
        }
    }

    const plot = parser.graph.plot(fx, {
        samples,
        domain,
        animate: false
    }, name)

    // Must follow ?
    if (code.includes('follow')) {
        plot.follow(true)
    }

    // TODO: Move riemann to an external parser, like fillBetween ?
    for (const opt of options) {
        if (opt.startsWith("riemann:")) {
            const [from, to, rectangles, pos, color, opacity] = opt.split(":")[1].split("/")
            if (!isNaN(+from) && !isNaN(+to) && !isNaN(+rectangles)) {
                const riemann = plot.riemann(+from, +to, +rectangles, pos === undefined ? 0 : +pos)

                if (color !== undefined) {
                    riemann.color({ color, opacity: opacity === undefined ? 1 : +opacity })
                }
            }


        }
    }


    return [plot]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateParametricPlot(parser: Parser, name: string, code: string[], options: string[]): Figure[] {

    if (code.length < 2) { return [] }

    const fx = code[0],
        fy = code[1],
        a = new NumExp(
            code[2] ?? '0', true
        ).evaluate(),
        b = new NumExp(
            code[3] ?? '2pi', true
        ).evaluate()

    return [
        parser.graph.parametric(fx, fy, {
            samples: 100,
            domain: {
                min: Math.min(a, b),
                max: Math.max(a, b)
            },
            animate: false
        })
    ]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateFillBetween(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = [],
        f: string | null = null,
        g: string | null = null,
        min: number = parser.graph.unitXDomain.min,
        max: number = parser.graph.unitXDomain.max

    if (code.length > 0) {
        f = code.shift() ?? ''

        if (code.length > 0 && !code[0].includes(":")) {
            g = code.shift() ?? ''
        }

        if (code.length > 0 && code[0].includes(":")) {
            [min, max] = code[0].split(":").map(x => +x)
        }
    }

    if (f !== null) {
        // Get the main figure
        const FX = parser.graph.getFigure(f),
            GX = g !== null ? parser.graph.getFigure(g) : null

        if (FX instanceof Plot) {
            figures = [FX.fillBetween((GX instanceof Plot) ? GX : null, min, max, undefined)]
        }
    }

    /**
     f(x)=3/2*x+1
     g(x)=1/2*x+3
     zone=fill f,g 3,6
     */
    return figures
}