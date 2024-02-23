import {Plot} from "../figures/Plot";
import {Figure} from "../figures/Figure";
import {BuildStep, Parser} from "../Parser";

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
    let figures: Figure[]

    // f=plot func,min:max,@500,follow
    let domain = parser.graph.unitXDomain,
        fx = code.shift(),
        // fx = step.split(',')[0],//.split('@')[0],
        samples: number = 100

    // Get the samples
    for(let check of code){
        if(check.startsWith("@")){
            samples = +check.substring(1)
        }

        if(check.includes(":")){
            [domain.min, domain.max] = check.split(":").map(x=>+x)
        }
    }

    let plot = parser.graph.plot(fx, {
        samples,
        domain,
        animate: false
    }, name)

    // Must follow ?
    if (code.includes('follow')) {
        plot.follow(true)
    }

    for(let opt of options){
        if(opt.startsWith("riemann:")){
            const [from, to, rectangles, pos, color, opacity] = opt.split(":")[1].split("/")
            if(!isNaN(+from) && !isNaN(+to) && !isNaN(+rectangles)) {
                const riemann = plot.riemann(+from, +to, +rectangles, pos===undefined?0:+pos)

                if(color!==undefined){
                    riemann.color({color, opacity: opacity===undefined?1:+opacity})
                }
            }


        }
    }


    // Plottings
    // PLot the function
    figures = [plot]

    return figures
}

export function generateParametricPlot(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length < 3) {
        return []
    }

    let fx = code[0],
        fy = code[1],
        a = !isNaN(+code[2]) ? +code[2] : 0,
        b = !isNaN(+code[3]) ? +code[3] : 2 * Math.PI

    figures = [
        parser.graph.parametric(fx, fy, {
            samples: 100,
            domain: {
                min: Math.min(a, b),
                max: Math.max(a, b)
            },
            animate: false
        })
    ]
    return figures
}

export function generateFillBetween(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = [],
        f: string = null,
        g: string = null,
        min: number = parser.graph.unitXDomain.min,
        max: number = parser.graph.unitXDomain.max

    if (code.length > 0) {
        f = code.shift()

        if(code[0]!==undefined && !code[0].includes(":")){
            g = code.shift()
        }

        if(code[0]!==undefined && code[0].includes(":")){
            [min,max] = code.shift().split(":").map(x=>+x)
        }
    }

    if (f !== null) {
        // Get the main figure
        let FX = parser.graph.getFigure(f),
            GX = g !== null ? parser.graph.getFigure(g) : null

        if (FX instanceof Plot) {
            figures = [FX.fillBetween((GX instanceof Plot) ? GX : null, min, max)]
        }
    }

    /**
     f(x)=3/2*x+1
     g(x)=1/2*x+3
     zone=fill f,g 3,6
     */
    return figures
}