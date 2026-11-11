import type {PiDraw} from "../../src"
import {basic_examples, DEFAULT_PARAMETERS, type IDemoExample} from "./basic_examples"

/** What an example of the demo lets the reader do, read from the drawing and not written by hand. */
export interface IExampleFeatures {
    drag: boolean
    snap: boolean
    animate: boolean
    slide: boolean
    toggle: boolean
}

/** The columns of the table of the examples, in order: the key of the feature and its title. */
export const FEATURE_COLUMNS: readonly { key: keyof IExampleFeatures, title: string }[] = [
    {key: 'animate', title: 'Animation'},
    {key: 'drag', title: 'Drag'},
    {key: 'snap', title: 'Snap'},
    {key: 'slide', title: 'Slides'},
    {key: 'toggle', title: 'Buttons'}
]

/**
 * The features of the code that `draw` has just drawn. `snap` is not an entry of `controls` but an option of `drag`, which `Draw` does not report:
 * it is read in the text of the code.
 */
export function featuresOf(draw: PiDraw, code: string): IExampleFeatures {
    return {
        drag: draw.hasDraggable(),
        snap: /\bsnap=/.test(code),
        animate: draw.uses('animate'),
        slide: draw.uses('slide'),
        toggle: draw.uses('toggle')
    }
}

/** The features of each example, by drawing them one after the other on `draw` (a drawing that nobody sees). */
export function featuresOfExamples(draw: PiDraw, examples: readonly IDemoExample[] = basic_examples): IExampleFeatures[] {
    return examples.map((example) => {
        draw.refreshLayout(example.parameters ?? DEFAULT_PARAMETERS)
        draw.refresh(example.code)

        return featuresOf(draw, example.code)
    })
}
