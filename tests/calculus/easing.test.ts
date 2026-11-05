import {describe, expect, test} from 'vitest'
import {EASINGS} from '../../src/calculus/easing'

describe('EASINGS', () => {
    const SAMPLES = Array.from({length: 101}, (_, i) => i / 100)

    test.each(Object.entries(EASINGS))('%s starts at 0 and ends at 1', (_, easing) => {
        expect(easing(0)).toBeCloseTo(0, 12)
        expect(easing(1)).toBeCloseTo(1, 12)
    })

    test.each(Object.entries(EASINGS))('%s never goes back: the movement only moves on', (_, easing) => {
        const values = SAMPLES.map(easing)

        values.slice(1).forEach((value, i) => {
            expect(value).toBeGreaterThanOrEqual(values[i])
        })
    })

    test.each(Object.entries(EASINGS))('%s stays between 0 and 1', (_, easing) => {
        SAMPLES.map(easing).forEach((value) => {
            expect(value).toBeGreaterThanOrEqual(0)
            expect(value).toBeLessThanOrEqual(1)
        })
    })

    test('linear is the progress itself', () => {
        SAMPLES.forEach((t) => {
            expect(EASINGS.linear(t)).toBe(t)
        })
    })

    test('inOut is slower than linear at the start and at the end, and the same in the middle', () => {
        expect(EASINGS.inOut(0.25)).toBeCloseTo(0.0625, 12)
        expect(EASINGS.inOut(0.5)).toBeCloseTo(0.5, 12)
        expect(EASINGS.inOut(0.75)).toBeCloseTo(0.9375, 12)
    })

    test('inOut is symmetrical: what is done after the middle mirrors what is done before it', () => {
        SAMPLES.forEach((t) => {
            expect(EASINGS.inOut(t) + EASINGS.inOut(1 - t)).toBeCloseTo(1, 12)
        })
    })

    test('the names are plain: nothing comes from the prototype', () => {
        expect(Object.hasOwn(EASINGS, 'toString')).toBe(false)
    })
})
