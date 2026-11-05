import {defineLoader} from 'vitepress'
import {PARSER_CONFIG} from '../../src/parser/parser.config'

/** A kind of figure, as the parser of the figure describes it. */
export interface IKeyReference {
    key: string
    name: string
    description: string
    forms: string[]
}

declare const data: IKeyReference[]
export {data}

// The reference of the keys is the registry of the parser, read when the site is built: the page cannot drift from the library.
export default defineLoader({
    load(): IKeyReference[] {
        return Object.entries(PARSER_CONFIG).map(([key, {name, description, forms}]) => ({key, name, description, forms}))
    }
})
