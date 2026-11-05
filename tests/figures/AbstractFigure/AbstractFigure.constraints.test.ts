import {describe, expect, test} from 'vitest'
import {InvalidArgumentError} from '../../../src/errors'
import {checkVector} from '../../../src/figures/AbstractFigure/AbstractFigure.constraints'

describe('checkVector', () => {
    test('is the vector when it is a {x, y} of finite numbers', () => {
        const vector = {x: 1, y: -2}

        expect(checkVector(vector, 'move')).toBe(vector)
    })

    test.each([null, 3, {x: 1}, {x: 1, y: Infinity}, {x: NaN, y: 0}, {x: '1', y: 0}])('%j is an InvalidArgumentError that names the method', (value) => {
        expect(() => checkVector(value, 'move')).toThrow(InvalidArgumentError)
        expect(() => checkVector(value, 'move')).toThrow(/^move expects/)
    })
})
