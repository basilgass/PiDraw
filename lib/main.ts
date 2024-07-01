// import { Graph } from "./Graph"
// import { NumExp } from "./Calculus"

// export const PiDraw = Graph
// export const PiNum = NumExp

import { Graph } from "./Graph"

export const PiDraw = {
    graph: Graph,
    parse: (input: string) => Graph.parse(input)
}