// import { Graph } from "./Graph"
// import { NumExp } from "./Calculus"

// export const PiDraw = Graph
// export const PiNum = NumExp

import { Graph } from "./Graph"
import { graphLayoutParser, parser_documentation, } from "./Parser"
import { IGraphConstructorConfig } from "./pidraw.common"

export const PiDraw = {
    Graph: Graph,
    Parse: {
        build: (id: string, config: string, code: string, toTex: (value: string) => string) => Graph.build(id, config, code, toTex),
        load: (input: string) => Graph.parse(input),
        documentation: parser_documentation,
        config: (input: string, config?: IGraphConstructorConfig) => graphLayoutParser(input, config)
    }
}