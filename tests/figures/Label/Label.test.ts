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
        expect(label.config).toEqual({
            asHtml: false, alignement: 'br', away: null, push: null, clearance: 0, offset: {x: 0, y: 0}, rotate: 0, size: 'inherit', color: null, fill: null
        })
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

describe('Label that lies on a side of its anchor', () => {
    test('a direction puts the label on that side: the side of its box that faces the anchor touches it', () => {
        const {label, center} = create()

        label.move(100, 100)
        label.setAway({x: 1, y: 0})

        // To the right: the left side of the box (a width of 40, a gap of 10) is at the anchor.
        expect(center).toHaveBeenLastCalledWith(130, 100)

        label.setAway({x: 0, y: -1})

        // Above: the bottom side of the box (a height of 20) is at the anchor.
        expect(center).toHaveBeenLastCalledWith(100, 90)
    })

    test('any angle works, not only the nine positions', () => {
        const {label, center} = create()

        label.move(0, 0)
        label.setAway({x: 3, y: 4})

        const [x, y] = center.mock.lastCall as number[]

        // Down and to the right, at an angle that is none of the positions of the box: the label is not centered on the anchor or at a corner.
        expect(x).toBeGreaterThan(0)
        expect(y).toBeGreaterThan(10)
        expect(Math.atan2(y, x)).toBeCloseTo(Math.atan2(4, 3), 6)
    })

    test('a null direction gives the alignement back', () => {
        const {label, center} = create()

        label.move(100, 100)
        label.setAway({x: 1, y: 0})
        label.setAway({x: 0, y: 0})

        expect(label.config.away).toBeNull()
        expect(center).toHaveBeenLastCalledWith(120, 110)
    })

    test('a position that is asked for replaces the direction', () => {
        const {label} = create()

        label.setAway({x: 1, y: 0})
        label.position('tl')

        expect(label.config.away).toBeNull()
        expect(label.alignement).toBe('tl')
    })
})

describe('Label that is pushed', () => {
    test('a distance pushes the label further in the direction where it lies', () => {
        const {label, center} = create()

        label.move(100, 100)
        label.position('mr', undefined, undefined, 15)

        // `mr` puts the center 20 to the right and 10 for the side; the push is 15 more to the right.
        expect(center).toHaveBeenLastCalledWith(145, 100)
    })

    test('the push of a diagonal position is along the diagonal', () => {
        const {label, center} = create()

        label.move(0, 0)
        label.position('br', undefined, undefined, Math.SQRT2 * 10)

        // br is the center at (20, 10); the push is 10 to the right and 10 down.
        expect(center).toHaveBeenLastCalledWith(30, 20)
    })

    test('a label centered on its anchor has no direction to be pushed in', () => {
        const {label, center} = create()

        label.move(50, 50)
        label.position('mc', undefined, undefined, 30)

        expect(center).toHaveBeenLastCalledWith(50, 50)
    })

    test('the clearance pushes a label that was asked no push, and a push that is asked replaces it', () => {
        const {label, center} = create()

        label.move(0, 0)
        label.position('mr')
        label.setClearance(15)

        expect(center).toHaveBeenLastCalledWith(45, 0)

        label.position('mr', undefined, undefined, 0)

        expect(center).toHaveBeenLastCalledWith(30, 0)
    })

    test('a push of null asks none again', () => {
        const {label, center} = create()

        label.move(0, 0)
        label.position('mr', undefined, undefined, 5)
        label.setClearance(15)
        label.position('mr', undefined, undefined, null)

        expect(center).toHaveBeenLastCalledWith(45, 0)
    })

    test('the shift by a pair is added to the push', () => {
        const {label, center} = create()

        label.move(0, 0)
        label.position('mr', {x: 5, y: -5}, undefined, 10)

        expect(center).toHaveBeenLastCalledWith(45, 5)
    })
})

describe('Label color and background', () => {
    const white = {color: 'white', opacity: 0.8}

    test('size is the size of the text that is measured', () => {
        const {label} = create({}, {width: 33, height: 11})

        expect(label.size()).toEqual({width: 33, height: 11})
    })

    test('has the color of its text on a <text>, and none by default', () => {
        expect(create({color: 'red'}).label.shape.attr('fill')).toBe('red')
        expect(create().label.shape.node.hasAttribute('fill')).toBe(false)
    })

    test('has the color of its text in the div of an HTML label', () => {
        expect(create({asHtml: true, color: 'red'}).label.shape.node.innerHTML).toContain('color: red')
        expect(create({asHtml: true}).label.shape.node.innerHTML).not.toContain('color:')
    })

    test('has no background by default', () => {
        const {group, label} = create()

        label.move(100, 50)

        expect(group.find('rect')).toHaveLength(0)
    })

    test('has a background behind its text, a margin bigger than the text on each side', () => {
        const {group, label} = create({fill: white, alignement: 'mc'})

        label.move(100, 50)

        const [background] = group.find('rect')
        expect(background.attr('fill')).toBe('white')
        expect(background.attr('fill-opacity')).toBe(0.8)
        expect(background.width()).toBe(46)
        expect(background.height()).toBe(26)
        expect(background.cx()).toBeCloseTo(100)
        expect(background.cy()).toBeCloseTo(50)
        expect(group.children().indexOf(background)).toBeLessThan(group.children().indexOf(label.shape))
    })

    test('measures an HTML label for its background as well', () => {
        const {group, label} = create({asHtml: true, fill: white, alignement: 'mc'})
        vi.spyOn(label, 'size').mockReturnValue({width: 10, height: 6})

        label.move(0, 0)

        expect(group.find('rect')[0].width()).toBe(16)
    })

    test('the background follows the label when it moves and when it is turned', () => {
        const {group, label} = create({fill: white, alignement: 'mc'})

        label.move(10, 20)
        label.move(60, 80)
        label.position(undefined, undefined, 30)

        const [background] = group.find('rect')
        expect(background.cx()).toBeCloseTo(60)
        expect(background.cy()).toBeCloseTo(80)
        expect(String(background.attr('transform'))).toContain('matrix')
    })

    test('setStyle gives the background and the color after the label is drawn, and takes the background away with null', () => {
        const {group, label} = create({alignement: 'mc'})
        label.move(10, 10)

        label.setStyle({fill: white, color: 'blue'})
        expect(group.find('rect')).toHaveLength(1)
        expect(label.shape.attr('fill')).toBe('blue')

        label.setStyle({fill: null, color: null})
        expect(group.find('rect')).toHaveLength(0)
        expect(label.shape.node.hasAttribute('fill')).toBe(false)
    })

    test('hide, show and remove act on the background too', () => {
        const {group, label} = create({fill: white})
        label.move(10, 10)
        const [background] = group.find('rect')

        label.hide()
        expect(background.css('display')).toBe('none')

        label.show()
        expect(background.css('display')).not.toBe('none')

        label.remove()
        expect(group.find('rect')).toHaveLength(0)
        expect(group.has(label.shape)).toBe(false)
    })

    test('a background that is given to a hidden label is hidden', () => {
        const {group, label} = create({})
        label.hide()
        label.move(10, 10)

        label.setStyle({fill: white})

        expect(group.find('rect')[0].css('display')).toBe('none')
    })
})
