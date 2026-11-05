import {createSVGWindow} from 'svgdom'
import {registerWindow} from '@svgdotjs/svg.js'
import {vi} from 'vitest'
import {Graph} from '../../src/Graph'
import type {IGraphConstructorConfig} from '../../src/Graph.types'

const window = createSVGWindow()
registerWindow(window, window.document)

const XHTML = 'http://www.w3.org/1999/xhtml'

/** An HTML element: svgdom makes every element of `createElement` an svg one, which svg.js would not take for the parent of a root svg. */
function createHtml(tag: string): HTMLElement {
    return window.document.createElementNS(XHTML, tag)
}

/** The virtual document that `Graph` writes in: it reads the global `document`, which Node does not have. */
export function useDocument(): void {
    vi.stubGlobal('document', {
        createElement: createHtml,
        getElementById: (id: string) => window.document.getElementById(id)
    })
}

let createdNodes = 0
let counting = false

/** How many elements have been created in the virtual document since this was first called (svg.js makes them with `createElementNS`). */
export function countCreatedNodes(): () => number {
    if (!counting) {
        const create = window.document.createElementNS.bind(window.document)

        window.document.createElementNS = ((...args: Parameters<typeof create>) => {
            createdNodes++

            return create(...args)
        }) as typeof create
        counting = true
    }

    return () => createdNodes
}

/** A container in the virtual document, to give to a `Graph`: with an `id` it is in the document, so that a `Graph` finds it by it. */
export function createContainer(id?: string): HTMLElement {
    const container = createHtml('div')

    if (id !== undefined) {
        container.setAttribute('id', id)
        window.document.documentElement.appendChild(container)
    }

    return container
}

/** A `Graph` in a new container, in a virtual DOM. Call {@link useDocument} before (a `beforeAll`). */
export function createGraph(config?: IGraphConstructorConfig): { graph: Graph, container: HTMLElement } {
    const container = createContainer()

    return {graph: new Graph(container, config), container}
}

/**
 * Send an event to an element of the virtual document, as the browser would: the properties of `props` (`clientX`, `pointerId`, `ctrlKey`...) are
 * on the event that the handlers receive.
 * @returns the event, to see whether a handler cancelled it.
 */
export function fireEvent(node: Element, type: string, props: object = {}): CustomEvent {
    const event = new (window as unknown as { CustomEvent: typeof CustomEvent }).CustomEvent(type, {cancelable: true, bubbles: true})
    Object.assign(event, props)
    node.dispatchEvent(event)

    return event
}
