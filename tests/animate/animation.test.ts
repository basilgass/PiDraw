import {describe, expect, test, vi} from 'vitest'
import {animationOf, setAnimation} from '../../src/animate/animation'
import {type IFigureAnimation, LoopStyle} from '../../src/animate/Animate.types'
import {InvalidArgumentError} from '../../src/errors'
import {Line} from '../../src/figures/Line/Line'
import {Point} from '../../src/figures/Point/Point'
import {createContext} from '../helpers/figure'

function createPoints(figureChanged = vi.fn()) {
    const context = {...createContext(), figureChanged}
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    return {A: point('A', 0, 0), B: point('B', 2, 1), C: point('C', 4, 3), context, figureChanged}
}

const animation = (overrides: Partial<IFigureAnimation> = {}): IFigureAnimation => ({
    from: null,
    to: null,
    duration: 2,
    delay: 0,
    easing: 'linear',
    loop: LoopStyle.NONE,
    ...overrides
})

describe('setAnimation', () => {
    test('a point has no animation by default', () => {
        const {A} = createPoints()

        expect(animationOf(A)).toBeNull()
    })

    test('a point keeps its animation from a point to another one, and gives it up', () => {
        const {A, B, C} = createPoints()
        const value = animation({from: B, to: C, duration: 5, delay: 1})

        setAnimation(A, value)
        expect(animationOf(A)).toBe(value)
        expect(A.controls.animate).toBe(value)

        setAnimation(A, null)
        expect(animationOf(A)).toBeNull()
    })

    test('tells the graph, with its name, when the animation is set', () => {
        const {A, B, C, figureChanged} = createPoints()

        setAnimation(A, animation({from: B, to: C}))

        expect(figureChanged).toHaveBeenCalledWith('A')
    })

    test('no animation (null) is always possible, even for a figure that cannot be animated', () => {
        const {context, A} = createPoints()
        const line = new Line(context, 'd', {through: {A, B: new Point(context, 'B', {coordinates: {x: 1, y: 1}})}})

        expect(() => { setAnimation(line, null) }).not.toThrow()
        expect(animationOf(line)).toBeNull()
    })

    test('a figure that is not a point refuses an animation and names itself', () => {
        const {context, A, B, C} = createPoints()
        const line = new Line(context, 'd', {through: {A, B}})
        const value = animation({from: B, to: C})

        expect(() => { setAnimation(line, value) }).toThrow(InvalidArgumentError)
        expect(() => { setAnimation(line, value) }).toThrow(/"d".*cannot be animated/)
        expect(animationOf(line)).toBeNull()
    })

    test.each([
        ['no start', {from: null}],
        ['no end', {to: null}],
        ['neither', {from: null, to: null}],
        ['a start that is not a point', {from: {x: 1, y: 1}}],
        ['an end that is not a point', {to: {x: 1, y: 1}}],
    ])('%s is an InvalidArgumentError that names the point', (_, overrides) => {
        const {A, B, C} = createPoints()
        const previous = animation({from: B, to: C})
        setAnimation(A, previous)

        expect(() => { setAnimation(A, animation({from: B, to: C, ...overrides})) }).toThrow(InvalidArgumentError)
        expect(() => { setAnimation(A, animation({from: B, to: C, ...overrides})) }).toThrow(/"A".*start and an end point/)
        expect(animationOf(A)).toBe(previous)
    })

    test.each(['foo', '', 'toString', 3])('an easing that is not the name of an easing (%j) is refused, and the animation stays', (easing) => {
        const {A, B, C} = createPoints()
        const previous = animation({from: B, to: C})
        setAnimation(A, previous)

        expect(() => { setAnimation(A, animation({from: B, to: C, easing: easing as never})) }).toThrow(InvalidArgumentError)
        expect(() => { setAnimation(A, animation({from: B, to: C, easing: easing as never})) }).toThrow(/easing.*linear, inOut/)
        expect(animationOf(A)).toBe(previous)
    })

    test.each(['inOut', 'linear'] as const)('the easing %s is accepted', (easing) => {
        const {A, B, C} = createPoints()

        setAnimation(A, animation({from: B, to: C, easing}))

        expect(animationOf(A)).toMatchObject({easing})
    })

    test.each(['revers', '', 'RESET', 1])('a loop that is not a style of loop (%j) is refused, and the animation stays', (loop) => {
        const {A, B, C} = createPoints()

        expect(() => { setAnimation(A, animation({from: B, to: C, loop: loop as never})) }).toThrow(InvalidArgumentError)
        expect(() => { setAnimation(A, animation({from: B, to: C, loop: loop as never})) }).toThrow(/loop.*reset, reverse, none/)
        expect(animationOf(A)).toBeNull()
    })

    test.each(Object.values(LoopStyle))('the loop %s is accepted', (loop) => {
        const {A, B, C} = createPoints()

        setAnimation(A, animation({from: B, to: C, loop}))

        expect(animationOf(A)).toMatchObject({loop})
    })

    test.each([[0], [-1], [NaN], [Infinity]])('the duration %s is an InvalidArgumentError and the animation stays', (duration) => {
        const {A, B, C} = createPoints()
        const previous = animation({from: B, to: C})
        setAnimation(A, previous)

        expect(() => { setAnimation(A, animation({from: B, to: C, duration})) }).toThrow(InvalidArgumentError)
        expect(animationOf(A)).toBe(previous)
    })

    test.each([[-1], [NaN], [Infinity]])('the delay %s is an InvalidArgumentError', (delay) => {
        const {A, B, C} = createPoints()

        expect(() => { setAnimation(A, animation({from: B, to: C, delay})) }).toThrow(InvalidArgumentError)
        expect(animationOf(A)).toBeNull()
    })

    test('a delay of 0 and a very short duration are accepted', () => {
        const {A, B, C} = createPoints()

        setAnimation(A, animation({from: B, to: C, delay: 0, duration: 0.001}))

        expect(animationOf(A)?.duration).toBe(0.001)
    })

    test('a refused animation tells nobody', () => {
        const {A, B, C, figureChanged} = createPoints()

        expect(() => { setAnimation(A, animation({from: B, to: C, duration: 0})) }).toThrow(InvalidArgumentError)
        expect(figureChanged).not.toHaveBeenCalled()
    })
})
