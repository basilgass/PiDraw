import {describe, expect, test} from 'vitest'
import {InvalidArgumentError} from '../../../src/errors'
import {
    alignementDirection,
    checkLabelContent,
    labelAlignementToward,
    labelAwayGap,
    labelBesideWay,
    labelCenter,
    labelCenterToward,
    labelPush,
    renderLabelContent,
    unitDirection
} from '../../../src/figures/Label/Label.constraints'

describe('labelAlignementToward', () => {
    // The direction on screen: to the right, downward.
    test.each([
        [1, 0, 'mr'],
        [1, -1, 'tr'],
        [0, -1, 'tc'],
        [-1, -1, 'tl'],
        [-1, 0, 'ml'],
        [-1, 1, 'bl'],
        [0, 1, 'bc'],
        [1, 1, 'br']
    ])('the direction (%d, %d) puts the label at %s', (x, y, alignement) => {
        expect(labelAlignementToward(x, y)).toBe(alignement)
    })

    test('the length of the direction does not matter', () => {
        expect(labelAlignementToward(300, -300)).toBe('tr')
        expect(labelAlignementToward(0.0001, -0.002)).toBe('tc')
    })

    test('a direction that is nearly one of the axes is that axis', () => {
        expect(labelAlignementToward(10, -1)).toBe('mr')
        expect(labelAlignementToward(1, -10)).toBe('tc')
    })

    test('a null direction puts the label above', () => {
        expect(labelAlignementToward(0, 0)).toBe('tc')
    })
})

describe('labelBesideWay', () => {
    test.each([
        [1, 0, 0, -8, 'tc'],
        [-1, 0, 0, 8, 'bc'],
        [0, 1, 8, 0, 'mr'],
        [0, -1, -8, 0, 'ml'],
        [1, -1, -Math.SQRT1_2 * 8, -Math.SQRT1_2 * 8, 'tl']
    ])('a curve that goes (%d, %d) on the screen has its label on the left of the way', (dx, dy, x, y, alignement) => {
        const place = labelBesideWay({x: 100, y: 100}, {x: dx * 40, y: dy * 40}, 8)

        expect(place.point.x).toBeCloseTo(100 + x, 8)
        expect(place.point.y).toBeCloseTo(100 + y, 8)
        expect(place.alignement).toBe(alignement)
    })

    test('a curve with no direction has its label above', () => {
        expect(labelBesideWay({x: 10, y: 10}, {x: 0, y: 0}, 5)).toEqual({point: {x: 10, y: 5}, alignement: 'tc'})
    })
})

describe('labelCenter', () => {
    // A label of 40 x 20 pixels with its anchor at (100, 100).
    test.each([
        ['tl', 80, 90],
        ['tc', 100, 90],
        ['tr', 120, 90],
        ['ml', 70, 100],
        ['mc', 100, 100],
        ['mr', 130, 100],
        ['bl', 80, 110],
        ['bc', 100, 110],
        ['br', 120, 110]
    ] as const)('the alignment %s puts the center at (%d, %d)', (alignement, x, y) => {
        expect(labelCenter(alignement, {x: 100, y: 100}, 40, 20)).toEqual({x, y})
    })
})

describe('checkLabelContent', () => {
    const fields = {length: () => '1'}

    test('a text is always valid', () => {
        expect(() => {
            checkLabelContent('hello', {}, 'A')
        }).not.toThrow()
    })

    test('texts and fields that the figure offers are valid', () => {
        expect(() => {
            checkLabelContent(['AB = ', {field: 'length', digits: 2}], fields, 'AB')
        }).not.toThrow()
    })

    test('a field that the figure does not offer is an InvalidArgumentError that names the figure and the field', () => {
        expect(() => {
            checkLabelContent([{field: 'area', digits: 1}], fields, 'AB')
        }).toThrow(InvalidArgumentError)
        expect(() => {
            checkLabelContent([{field: 'area', digits: 1}], fields, 'AB')
        }).toThrow(/"AB".*"area"/)
    })

    test.each([-1, 1.5, NaN])('%s digits is an InvalidArgumentError', (digits) => {
        expect(() => {
            checkLabelContent([{field: 'length', digits}], fields, 'AB')
        }).toThrow(InvalidArgumentError)
    })
})

describe('renderLabelContent', () => {
    test('a text is as it is', () => {
        expect(renderLabelContent('a@b', {})).toBe('a@b')
    })

    test('the parts are written one after the other, the fields with their digits', () => {
        const fields = {length: (digits: number | undefined) => (Math.PI).toFixed(digits)}

        expect(renderLabelContent(['AB = ', {field: 'length', digits: 2}, ' cm'], fields)).toBe('AB = 3.14 cm')
    })

    test('a field that is not offered is an InvalidArgumentError', () => {
        expect(() => renderLabelContent([{field: 'sum', digits: 1}], {})).toThrow(InvalidArgumentError)
    })
})

describe('alignementDirection', () => {
    test.each([
        ['tl', {x: -1, y: -1}],
        ['tc', {x: 0, y: -1}],
        ['tr', {x: 1, y: -1}],
        ['ml', {x: -1, y: 0}],
        ['mr', {x: 1, y: 0}],
        ['bl', {x: -1, y: 1}],
        ['bc', {x: 0, y: 1}],
        ['br', {x: 1, y: 1}]
    ] as const)('%s lies toward %j on the screen', (position, expected) => {
        expect(alignementDirection(position)).toEqual(expected)
    })

    test('a label centered on its anchor lies on no side', () => {
        expect(alignementDirection('mc')).toBeNull()
    })
})

describe('unitDirection', () => {
    test('has a length of 1', () => {
        expect(unitDirection({x: 3, y: 4})).toEqual({x: 0.6, y: 0.8})
    })

    test.each([{x: 0, y: 0}, {x: NaN, y: 1}, {x: Infinity, y: 0}])('%j has no direction', (vector) => {
        expect(unitDirection(vector)).toBeNull()
    })
})

describe('labelCenterToward', () => {
    const anchor = {x: 100, y: 100}

    test('puts the side of the box that faces the anchor on the anchor', () => {
        expect(labelCenterToward(anchor, {x: 0, y: 1}, 40, 20)).toEqual({x: 100, y: 110})
        expect(labelCenterToward(anchor, {x: 0, y: -1}, 40, 20)).toEqual({x: 100, y: 90})
    })

    test('keeps a label that lies to a side a little away, like ml and mr', () => {
        expect(labelCenterToward(anchor, {x: 1, y: 0}, 40, 20)).toEqual({x: 130, y: 100})
        expect(labelCenterToward(anchor, {x: -1, y: 0}, 40, 20)).toEqual({x: 70, y: 100})
    })

    test('puts the corner of the box on the anchor for the diagonal of the box', () => {
        const {x, y} = labelCenterToward(anchor, {x: 2, y: 1}, 40, 20)
        const unit = {x: 2 / Math.sqrt(5), y: 1 / Math.sqrt(5)}
        const gap = 10 * unit.x ** 2

        // The diagonal of a box of 40 x 20 goes to its corner: the center is 20 to the right and 10 down, and the gap is along the direction.
        expect(x).toBeCloseTo(120 + gap * unit.x, 6)
        expect(y).toBeCloseTo(110 + gap * unit.y, 6)
    })

    test('a null direction puts the label on the anchor', () => {
        expect(labelCenterToward(anchor, {x: 0, y: 0}, 40, 20)).toEqual(anchor)
    })

    test('does not move the anchor it is given', () => {
        const given = {x: 5, y: 5}

        labelCenterToward(given, {x: 1, y: 1}, 10, 10)

        expect(given).toEqual({x: 5, y: 5})
    })
})

describe('labelAwayGap', () => {
    test('is the whole gap to a side, and none above or below', () => {
        expect(labelAwayGap({x: 1, y: 0})).toEqual({x: 10, y: 0})
        expect(labelAwayGap({x: 0, y: 1})).toEqual({x: 0, y: 0})
    })

    test('is half the gap on a diagonal, along the direction', () => {
        const gap = labelAwayGap({x: 1, y: 1})

        expect(gap.x).toBeCloseTo(Math.SQRT1_2 * 5, 6)
        expect(gap.y).toBeCloseTo(Math.SQRT1_2 * 5, 6)
    })
})

describe('labelPush', () => {
    test('is the distance along the direction', () => {
        expect(labelPush({x: 0, y: 5}, 10)).toEqual({x: 0, y: 10})
        expect(labelPush({x: 3, y: 4}, 10)).toEqual({x: 6, y: 8})
    })

    test('is null for no direction', () => {
        expect(labelPush(null, 10)).toEqual({x: 0, y: 0})
        expect(labelPush({x: 0, y: 0}, 10)).toEqual({x: 0, y: 0})
    })
})
