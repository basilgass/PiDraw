import {describe, expect, test, vi} from 'vitest'
import type {Box, Text} from '@svgdotjs/svg.js'
import {Label} from '../../../src/figures/Label/Label'
import type {LabelOptions} from '../../../src/figures/Label/Label.types'
import type {XY} from '../../../src/pidraw.common'
import {createSvg} from '../../helpers/figure'

// The label of a figure, in a virtual DOM. The size of a text is measured by the browser: here it is given.
function create(options: LabelOptions = {}, size = {width: 40, height: 20}) {
    const group = createSvg().group()
    const label = new Label(group, 'A', {text: 'hello', ...options})
    const center = vi.spyOn(label.shape, 'center')

    if (!label.asHtml) {
        vi.spyOn(label.shape as Text, 'length').mockReturnValue(size.width)
        vi.spyOn(label.shape as Text, 'bbox').mockReturnValue({h: size.height} as Box)
    }

    return {group, label, center}
}

/** The matrix of the transform of the label. */
function matrixOf(label: Label): number[] {
    const found = /matrix\(([^)]+)\)/.exec(String(label.shape.attr('transform')))

    if (found === null) {
        throw new Error('the label is not transformed')
    }

    return found[1].split(/[ ,]+/).map(Number)
}

const turned = (matrix: number[], x: number, y: number): XY => ({
    x: matrix[0] * x + matrix[2] * y + matrix[4],
    y: matrix[1] * x + matrix[3] * y + matrix[5]
})

describe('Label', () => {
    test('is a text with the name of the figure for id, in the group of the figure', () => {
        const {group, label} = create()

        expect(label.shape.attr('id')).toBe('A-label')
        expect(label.shape.node.textContent).toBe('hello')
        expect(group.has(label.shape)).toBe(true)
    })

    test('has the name of the figure for text by default', () => {
        const label = new Label(createSvg().group(), 'B')

        expect(label.displayName).toBe('B')
        expect(label.config).toEqual({asHtml: false, alignement: 'br', offset: {x: 0, y: 0}, rotate: 0, size: 'inherit'})
    })

    test('has the font size that it is given, in both modes', () => {
        expect(create({size: '24px'}).label.shape.css('font-size')).toBe('24px')
        expect(create({}).label.shape.css('font-size')).toBe('inherit')
        expect(create({asHtml: true, size: '24px'}).label.shape.node.innerHTML).toContain('font-size: 24px')
    })

    test('is shown until it is hidden, and shown again', () => {
        const {label} = create()

        expect(label.visible).toBe(true)
        label.hide()
        expect(label.visible).toBe(false)
        label.show()
        expect(label.visible).toBe(true)
    })
})

describe('Label text', () => {
    test('a new text is written in the same element', () => {
        const {label} = create()
        const shape = label.shape

        label.setLabel('bye')

        expect(label.shape).toBe(shape)
        expect(label.shape.node.textContent).toBe('bye')
        expect(label.displayName).toBe('bye')
    })

    test('a label that is hidden stays hidden when its text changes', () => {
        const {label} = create()

        label.hide()
        label.setLabel('bye')

        expect(label.visible).toBe(false)
    })

    test('the same text, or none, writes nothing', () => {
        const {label} = create()
        const write = vi.spyOn(label.shape as Text, 'text')

        label.setLabel('hello')
        label.setLabel()

        expect(write).not.toHaveBeenCalled()
    })

    test('an HTML label is written in the same element too', () => {
        const {label} = create({asHtml: true, texConverter: value => `<i>${value}</i>`})
        const shape = label.shape

        label.setLabel('bye')

        expect(label.shape).toBe(shape)
        expect(label.shape.node.innerHTML).toContain('<i>bye</i>')
        expect(label.displayName).toBe('<i>bye</i>')
    })

    test('the text of an HTML label is written as text when nothing converts it', () => {
        const {label} = create({asHtml: true, text: '<img src=x onerror=alert(1)>'})

        expect(label.shape.node.innerHTML).not.toContain('<img')
        expect(label.shape.node.textContent).toBe('<img src=x onerror=alert(1)>')
    })

    test('the converter makes the HTML of an HTML label', () => {
        const {label} = create({asHtml: true, text: 'x', texConverter: value => `<b>${value}</b>`})

        expect(label.shape.node.innerHTML).toContain('<b>x</b>')
    })
})

describe('Label place', () => {
    test('is centered from the anchor as it is aligned', () => {
        const {label, center} = create()

        label.position('tl').move(100, 100)

        expect(center).toHaveBeenLastCalledWith(80, 90)
    })

    test('the offset is in pixels with the y axis pointing up', () => {
        const {label, center} = create()

        label.position('mc', {x: 5, y: 8}).move(100, 100)

        expect(center).toHaveBeenLastCalledWith(105, 92)
    })

    test('an offset that is not a number is 0', () => {
        const {label} = create()

        label.position('mc', {x: NaN, y: 3})

        expect(label.config.offset).toEqual({x: 0, y: 3})
    })

    test('an alignment that is asked for is given, the default one is not', () => {
        const {label} = create()

        expect(label.alignementGiven).toBe(false)
        label.position(undefined, {x: 1, y: 1})
        expect(label.alignementGiven).toBe(false)
        label.position('tl')
        expect(label.alignementGiven).toBe(true)
        expect(label.alignement).toBe('tl')
    })

    test('is not put again when nothing changed', () => {
        const {label, center} = create()

        label.move(100, 100)
        label.move(100, 100)

        expect(center).toHaveBeenCalledTimes(1)
    })

    test('is put again when the anchor, the alignment, the offset, the rotation or the text changes', () => {
        const {label, center} = create()
        label.move(100, 100)

        label.move(101, 100)
        expect(center).toHaveBeenCalledTimes(2)

        label.config.alignement = 'tl'
        label.move(101, 100)
        expect(center).toHaveBeenCalledTimes(3)

        label.config.offset = {x: 3, y: 0}
        label.move(101, 100)
        expect(center).toHaveBeenCalledTimes(4)

        label.config.rotate = 20
        label.move(101, 100)
        expect(center).toHaveBeenCalledTimes(5)

        label.setLabel('bye')
        label.move(101, 100)
        expect(center).toHaveBeenCalledTimes(6)
    })

    test('position puts the label again even when nothing changed', () => {
        const {label, center} = create()

        label.move(100, 100)
        label.position()

        expect(center).toHaveBeenCalledTimes(2)
    })
})

describe('Label rotation', () => {
    test('turns around the anchor: a label centered on it stays there', () => {
        const {label} = create()

        label.position('mc', undefined, 90).move(100, 100)
        const point = turned(matrixOf(label), 100, 100)

        expect(point.x).toBeCloseTo(100, 9)
        expect(point.y).toBeCloseTo(100, 9)
    })

    test('clockwise on the screen: a point at the right of the anchor goes below it', () => {
        const {label} = create()

        label.position('mc', undefined, 90).move(100, 100)
        const point = turned(matrixOf(label), 110, 100)

        expect(point.x).toBeCloseTo(100, 9)
        expect(point.y).toBeCloseTo(110, 9)
    })

    test('a label beside the anchor stays on its side of the way when it turns', () => {
        const {label} = create()

        // Below the anchor, in the frame of the label, then turned by 90 degrees: on the left of the anchor.
        label.position('bc', undefined, 90).move(100, 100)
        const center = turned(matrixOf(label), 100, 110)

        expect(center.x).toBeCloseTo(90, 9)
        expect(center.y).toBeCloseTo(100, 9)
    })

    test('turns back to straight with an angle of 0', () => {
        const {label} = create()

        label.position('mc', undefined, 30).move(100, 100)
        expect(label.shape.attr('transform')).toBeTruthy()

        label.position(undefined, undefined, 0)

        expect(label.shape.attr('transform')).toBeFalsy()
    })

    test('is not turned along its figure unless the figure asks', () => {
        expect(create().label.autoRotate).toBe(false)
    })
})
