import {
    generateBissector,
    generateLine,
    generateMediator,
    generateParallel,
    generatePerpendicular,
    generateTangent,
    generateVector
} from "./parser/generateLine"
import { generateBezier } from "./parser/generateBezier"
import { generateFillBetween, generateParametricPlot, generatePlot } from "./parser/generatePlot"
import { generateArc } from "./parser/generateArc"
import { generatePolygon } from "./parser/generatePolygon"
import {
    generateIntersectionPoint,
    generateMidPoint,
    generatePoint,
    generatePointFromDirection,
    generatePointFromVector,
    generateProjectionPoint,
    generateSymmetricPoint
} from "./parser/generatePoint"
import { generateCircle } from "./parser/generateCircle"

import type { Figure } from "./Figure"
import type { Parser } from "./Parser"

const ptOption = "*,o,sq,tick,@,trace:color/size", lineOption = ""

export interface ParserPreprocessType { label: string; key: string; code: string[]; options: string[]; }

export const parserKeys: Record<string, {
    generate: (parser: Parser, name: string, code: string[], options: string[]) => Figure[];
    parameters: string;
    description: string;
    options: string;
}> = {
    pt: {
        generate: generatePoint,
        parameters: "a,b | A(a,b)",
        description: "créer un point par coordonnées (x,y)",
        options: ptOption
    },
    mid: {
        generate: generateMidPoint,
        parameters: "A,B",
        description: "milieu de A, B",
        options: ptOption
    },
    vpt: {
        generate: generatePointFromVector,
        parameters: "<nb>*A,B[,X]",
        description: "créer un point grâce à un vecteur",
        options: ptOption + ", u(nitaire)"
    },
    dpt: {
        generate: generatePointFromDirection,
        parameters: "A,d,distance,p",
        description: "point construit par un vecteur directeur de la droite d, en partant du point. La longueur du vecteur est défini par distance. Le parmètre *p* indique de prendre le vecteur normal au lieu du directeur.",
        options: ptOption
    },
    proj: {
        generate: generateProjectionPoint,
        parameters: "A,d|Ox|Oy",
        description: "projection de A sur la droite d ou sur l'axe Ox ou Oy",
        options: ptOption
    },
    sym: {
        generate: generateSymmetricPoint,
        parameters: "A,B|d",
        description: "symétrie centrale d'un point A par B ou axiale d'une point A par l'axe d.",
        options: ptOption
    },
    inter: {
        generate: generateIntersectionPoint,
        parameters: "a, b",
        description: "point d'intersection des droites a et b",
        options: ptOption
    },
    line: {
        generate: generateLine,
        parameters: "[AB] | AB. | A,3/4 | 3x+4x=-5",
        description: "droite passant par A et B (sans crochet = droite, avec un point à la fin = segment, les crochets ouvrent ou ferment la droite) ou par un point et une pente ou par son équation",
        options: lineOption
    },
    v: {
        generate: generateVector,
        parameters: "AB,k",
        description: "vecteur AB, multiplié par k",
        options: lineOption
    },
    perp: {
        generate: generatePerpendicular,
        parameters: "d,A",
        description: "perpendiculaire à d par A",
        options: lineOption
    },
    med: {
        generate: generateMediator,
        parameters: "P,Q",
        description: "médiatrice à P et Q",
        options: lineOption
    },
    para: {
        generate: generateParallel,
        parameters: "d,A[,1 ou 2]",
        description: "parallèle à d par A, 1ère ou 2ème tangente.",
        options: lineOption
    },
    biss: {
        generate: generateBissector,
        parameters: "B,A,C",
        description: "bissectrice de l'angle BAC",
        options: lineOption
    },
    tan: {
        generate: generateTangent,
        parameters: "circle,point",
        description: "tangente à un cercle passant par un point",
        options: lineOption
    },
    poly: {
        generate: generatePolygon,
        parameters: "A,B,C,... | <sides:number>,<center:Point>,<radius:number|Point>",
        description: "tracer un polygone passant par les points A,B,C, ...",
        options: lineOption
    },
    circ: {
        generate: generateCircle,
        parameters: "A,r",
        description: "cercle de centre A et de rayon r",
        options: ""
    },
    arc: {
        generate: generateArc,
        parameters: "B,A,C[,r]",
        description: "arc de cercle de l'angle BAC, de rayon r",
        options: ""
    },
    plot: {
        generate: generatePlot,
        parameters: "func,min:max,@500,follow",
        description: "Tracer une fonction y=f(x)",
        options: "riemann:from/to/rectangles/pos/color"
    },
    fill: {
        generate: generateFillBetween,
        parameters: "f[,g],a:b",
        description: "Remplir l'espace entre une fonction et l'axe Ox ou entre deux fonctions, borné par a et b",
        options: ""
    },
    param: {
        generate: generateParametricPlot,
        parameters: "sin(t),cos(t),a,b",
        description: "Tracer une fonction paramétrique, en utilisant a et b comme borne.",
        options: ""
    },
    bezier: {
        generate: generateBezier,
        parameters: "A/<v,h>,B,C...",
        description: "Tracer une courbe de bezier passant par plusieurs points A, B, C, ...",
        options: ""
    }
}

export function parserPreprocess(step: string): ParserPreprocessType {
    let label = "", key = "", code: string[] = [], options: string[] = [], key_code = ""
    const value = step + ''


    // Remove the options.
    const [label_key_code, step_options] = value.split("->")

    if (step_options) { options = step_options.split(',') }

    // Special case of point
    if (!label_key_code.includes("=")) {
        // It's a point: A(3,2)
        key = "pt"
        label = label_key_code.split('(')[0]
        code = label_key_code
            .substring(label.length + 1, label_key_code.length - 1
            ).split(/[;,]/)

        return { label, key, code, options }
    }

    const key_code_as_array = label_key_code.split("=")
    label = key_code_as_array.shift() ?? '?'
    key_code = key_code_as_array.join("=")

    // special case of plot or parametric   f(x)=3x or f(t)=...
    if (label.includes("(")) {
        let plotType: string;

        [label, plotType] = label.substring(0, label.length - 1).split('(')

        if (plotType === "x") {
            key = "plot"
        } else if (plotType === "t") {
            key = "param"
        }

        code = key_code.split(',')
        return { label, key, code, options }
    }

    // special case of vector or segment:   d=AB or d=vAB
    if (!key_code.includes(" ")) {
        if (key_code.startsWith('v')) {
            key = 'v'
            key_code = key_code.substring(1)
        } else {
            key = "line"
        }

        // Cut the special values.
        const [value, ...code_option] = key_code.split(',')

        // Next, we need to "cut" the value to two points.
        // AB => [A,B]
        // A1B4 => [A1,B4]
        const match = [...value.matchAll(/^[[\]]?([A-Z]_?[0-9]?)([A-Z]_?[0-9]?)[[\].]?/g)]

        // Get the two points.
        if (match.length > 0) {
            code = [match[0][1], match[0][2]]
        }

        if (!value.endsWith('.')) {
            code.push(key_code.startsWith("[") ? "segment" : "open")
            code.push(key_code.endsWith("]") ? "segment" : "open")
        } else {
            code.push('segment')
            code.push('segment')
        }

        return { label, key, code: [...code, ...code_option], options }
    }

    // Any other case
    // A=<key> <code>-><options>
    const code_with_sep = key_code.split(" ")
    key = code_with_sep.shift() ?? ''
    code = code_with_sep.join(",").split(',')

    return { label, key, code, options }
}

export function parserHelperText(step: string): {
    parameters: string;
    description: string;
    options: string;
} | null {
    const process = parserPreprocess(step)

    if (process.key === "") {
        return null
    }
    if (!Object.hasOwn(parserKeys, process.key)) {
        return null
    }

    return parserKeys[process.key]
}

export interface BuildStep { step: string; figures: Figure[]; }

export interface parserConfig {
    nolabel: boolean;
    nopoint: boolean;
    labelAsTex: boolean;
}
