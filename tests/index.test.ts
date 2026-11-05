import {describe, expect, test} from 'vitest'
import * as library from '../src'
import {PiDrawError} from '../src'

describe('the package pidraw', () => {
    // What a program can use at run time. A name added or removed here is a decision: a removed one breaks the API (breaking-changes.md).
    const EXPORTED = [
        'Animate',
        'Axes',
        'CoordinateSystem',
        'EASINGS',
        'InvalidArgumentError',
        'LayerName',
        'LoopStyle',
        'MathError',
        'NotImplementedError',
        'OptionError',
        'ParseError',
        'PiDraw',
        'PiDrawError',
        'PiGraph',
        'Slides',
        'setAnimation',
        'setSlide',
        'UnsupportedOperationError',
        'ZOOM_ALLOWS',
        'ZOOM_LIMITS',
        'ZOOM_STEP',
        'Zoom',
        'isDomain',
        'isXY'
    ]

    test('exports these names at run time, and no other', () => {
        expect(Object.keys(library).sort()).toEqual([...EXPORTED].sort())
    })

    test('the two classes are the library itself', () => {
        expect(library.PiDraw).toBeTypeOf('function')
        expect(library.PiGraph).toBeTypeOf('function')
        expect(library.Animate).toBeTypeOf('function')
    })

    test('every error is a PiDrawError, which a program can catch alone', () => {
        const errors = [
            library.ParseError, library.OptionError, library.InvalidArgumentError, library.MathError, library.NotImplementedError,
            library.UnsupportedOperationError
        ]

        for (const Error of errors) {
            expect(Error.prototype).toBeInstanceOf(PiDrawError)
        }
    })

    test('the figures are not exported at run time: they come from the graph', () => {
        const names = Object.keys(library)

        for (const figure of ['Point', 'Line', 'Circle', 'Arc', 'Plot', 'Polygon', 'Label']) {
            expect(names).not.toContain(figure)
        }
    })

    test('the easings are the ones the option easing accepts', () => {
        expect(Object.keys(library.EASINGS)).toEqual(['linear', 'inOut'])
    })
})
