import {describe, expect, test} from 'vitest'
import {Path} from '../../../src/figures/Path/Path'
import type {IPathConfig} from '../../../src/figures/Path/Path.types'
import {InvalidArgumentError, ParseError} from '../../../src/errors'
import {createContext, graphConfig} from '../../helpers/figure'

function create() {
    const context = createContext()
    const path = (values: IPathConfig, name = 'p') => new Path(context, name, values)

    return {context, path}
}

const dOf = (path: Path) => path.shape.attr('d') as string

describe('Path in pixels', () => {
    test('is drawn as it is given', () => {
        const {path} = create()

        expect(dOf(path({d: 'M 100 100 L 200 100 L 200 200 Z'}))).toBe('M 100 100 L 200 100 L 200 200 Z')
    })

    test('is drawn with absolute positions, whatever it was written', () => {
        const {path} = create()

        expect(dOf(path({d: 'm 10 10 l 5 0 v 5 h -5 z'}))).toBe('M 10 10 L 15 10 L 15 15 L 10 15 Z')
    })

    test('has a black line of 1 pixel and no fill, like any figure', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 10 10'})

        expect(p.shape.attr('stroke')).toBe('black')
        expect(p.shape.attr('stroke-width')).toBe(1)
        expect(p.shape.attr('fill')).toBe('transparent')
    })

    test('has the stroke and the fill that it is given', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 10 0 L 10 10 Z'}).stroke('red', 3).fill({color: 'blue', opacity: 0.3})

        expect(p.shape.attr('stroke')).toBe('red')
        expect(p.shape.attr('stroke-width')).toBe(3)
        expect(p.shape.attr('fill')).toBe('blue')
    })

    test('an arc is drawn as curves', () => {
        const {path} = create()
        const p = path({d: 'M 100 100 A 50 50 0 0 1 150 150'})

        expect(dOf(p)).toMatch(/^M 100 100 C /)
        expect(p.commands.at(-1)).toMatchObject({type: 'C', p: {x: 150, y: 150}})
    })

    test('has its commands in pixels, as a copy', () => {
        const {path} = create()
        const p = path({d: 'M 1 2 L 3 4'})

        p.commands[1] = {type: 'Z'}

        expect(p.commands).toEqual([{type: 'M', p: {x: 1, y: 2}}, {type: 'L', p: {x: 3, y: 4}}])
    })

    test('without a command is not drawn', () => {
        const {path} = create()
        const p = path({d: ''})

        expect(p.commands).toEqual([])
        expect(dOf(p)).toBe('M 0 0')
        expect(p.element.attr('visibility')).toBe('hidden')
    })

    test('is drawn again when its data change, and shown when it has some', () => {
        const {path} = create()
        const p = path({d: ''})

        p.d = 'M 5 5 L 10 10'

        expect(p.d).toBe('M 5 5 L 10 10')
        expect(dOf(p)).toBe('M 5 5 L 10 10')
        expect(p.element.attr('visibility')).not.toBe('hidden')
    })

    test('keeps its stroke when its data change', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 1 1'}).stroke('red')

        p.d = 'M 0 0 L 5 5'

        expect(p.shape.attr('stroke')).toBe('red')
    })
})

describe('Path in units', () => {
    test('is drawn in pixels: a unit is 50 pixels, the y axis pointing up', () => {
        const {path} = create()

        expect(dOf(path({d: 'M 0 0 L 2 1', units: true}))).toBe('M 400 300 L 500 250')
    })

    test('follows the coordinate system when it changes', () => {
        const {context, path} = create()
        const p = path({d: 'M 0 0 L 2 1', units: true})

        context.config = graphConfig({origin: {x: 100, y: 100}, axis: {x: {x: 10, y: 0}, y: {x: 0, y: -20}}})
        p.computed()

        expect(dOf(p)).toBe('M 100 100 L 120 80')
    })

    test('a curve is moved with its controls', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 C 1 1 2 1 3 0', units: true})

        expect(dOf(p)).toBe('M 400 300 C 450 250 500 250 550 300')
    })

    test('an arc follows scales that are different', () => {
        const {context, path} = create()
        const p = path({d: 'M 1 0 A 1 1 0 0 1 0 1', units: true})

        context.config = graphConfig({axis: {x: {x: 100, y: 0}, y: {x: 0, y: -50}}})
        p.computed()

        // A quarter of a circle of radius 1 is a quarter of an ellipse of 100 x 50 pixels.
        expect(p.commands.at(-1)).toMatchObject({p: {x: 400, y: 250}})
    })
})

describe('Path that is not valid', () => {
    test.each([
        ['a path that does not begin with M', 'L 1 1'],
        ['a command that does not exist', 'M 0 0 X 1 1'],
        ['a number that is missing', 'M 0']
    ])('%s is a ParseError, and nothing is left in the svg', (_, d) => {
        const {context, path} = create()

        expect(() => path({d})).toThrow(ParseError)
        expect(context.rootSVG.children().length).toBe(0)
    })

    test('data that are not a text, or units that are not a boolean, are an InvalidArgumentError', () => {
        const {path} = create()

        expect(() => path({d: 3 as unknown as string})).toThrow(InvalidArgumentError)
        expect(() => path({d: 'M 0 0', units: 'yes' as unknown as boolean})).toThrow(InvalidArgumentError)
    })

    test('data that are replaced by data that are not valid leave the path as it was', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 10 10'})

        expect(() => {
            p.d = 'M 0 0 L'
        }).toThrow(ParseError)
        expect(p.d).toBe('M 0 0 L 10 10')
        expect(dOf(p)).toBe('M 0 0 L 10 10')
    })
})

describe('Path follow', () => {
    test('can be followed', () => {
        const {path} = create()

        expect(path({d: 'M 0 0 L 10 10'}).followable).toBe(true)
    })

    test('is followed at the point that is the closest', () => {
        const {path} = create()
        const p = path({d: 'M 100 100 L 300 100'})

        expect(p.follow(200, 150)).toEqual({x: 200, y: 100})
        expect(p.follow(50, 100)).toEqual({x: 100, y: 100})
        expect(p.follow(400, 20)).toEqual({x: 300, y: 100})
    })

    test('is followed on a curve', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 C 0 100 100 100 100 0'})
        const found = p.follow(50, 500)

        expect(found.x).toBeCloseTo(50, 0)
        expect(found.y).toBeCloseTo(75, 0)
    })

    test('is followed on the nearest piece, and not between two pieces', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 100 0 M 0 100 L 100 100'})

        expect(p.follow(50, 30)).toEqual({x: 50, y: 0})
        expect(p.follow(50, 70)).toEqual({x: 50, y: 100})
    })

    test('is followed in units too', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 4 0', units: true})

        expect(p.follow(500, 200)).toEqual({x: 500, y: 300})
    })

    test('is not followed anywhere when it is not drawn', () => {
        const {path} = create()
        const found = path({d: ''}).follow(10, 10)

        expect(found.x).toBeNaN()
        expect(found.y).toBeNaN()
    })
})

describe('Path label', () => {
    test('is half way along the path, on the left of the way it goes', () => {
        const {path} = create()
        const label = path({d: 'M 100 100 L 300 100'}).addLabel('p')

        expect(label.x).toBeCloseTo(200, 6)
        expect(label.y).toBeCloseTo(92, 6)
        expect(label.config.alignement).toBe('tc')
    })

    test('is on the longest piece', () => {
        const {path} = create()
        const label = path({d: 'M 0 0 L 10 0 M 100 300 L 300 300'}).addLabel('p')

        expect(label.x).toBeCloseTo(200, 6)
        expect(label.y).toBeCloseTo(292, 6)
    })

    test('keeps the alignment that was asked for', () => {
        const {path} = create()
        const p = path({d: 'M 100 100 L 300 100'})
        const label = p.addLabel('p')
        label.position('bl')

        p.updateLabel()

        expect(label.config.alignement).toBe('bl')
    })

    test('moves with the path', () => {
        const {path} = create()
        const p = path({d: 'M 100 100 L 300 100'})
        const label = p.addLabel('p')

        p.d = 'M 100 200 L 500 200'

        expect(label.x).toBeCloseTo(300, 6)
        expect(label.y).toBeCloseTo(192, 6)
    })

    test('a path that is not drawn leaves its label where it was', () => {
        const {path} = create()
        const p = path({d: ''})

        expect(() => p.addLabel('p')).not.toThrow()
    })
})

describe('Path TikZ', () => {
    test('is its lines in units of the coordinate system', () => {
        const {path} = create()

        expect(path({d: 'M 400 300 L 500 250 L 500 350'}).tikz()).toMatch(/^\\draw\[.*\] \(0,0\) -- \(2,1\) -- \(2,-1\);$/)
    })

    test('is its curves with their controls', () => {
        const {path} = create()

        expect(path({d: 'M 0 0 C 1 1 2 1 3 0', units: true}).tikz()).toContain('(0,0) .. controls (1,1) and (2,1) .. (3,0);')
    })

    test('is closed with cycle', () => {
        const {path} = create()

        expect(path({d: 'M 0 0 L 2 0 L 2 2 Z', units: true}).tikz()).toContain('(0,0) -- (2,0) -- (2,2) -- cycle;')
    })

    test('begins again at the start of the piece after a cycle', () => {
        const {path} = create()

        expect(path({d: 'M 0 0 L 2 0 L 2 2 Z L 5 5', units: true}).tikz()).toContain('-- cycle (0,0) -- (5,5);')
    })

    test('is all its pieces in one draw', () => {
        const {path} = create()
        const tikz = path({d: 'M 0 0 L 1 1 M 2 2 L 3 3', units: true}).tikz()

        expect(tikz.match(/\\draw/g)).toHaveLength(1)
        expect(tikz).toContain('(0,0) -- (1,1) (2,2) -- (3,3);')
    })

    test('has the color and the fill of the figure', () => {
        const {path} = create()
        const tikz = path({d: 'M 0 0 L 2 0 L 2 2 Z', units: true}).stroke('red').fill({color: 'green', opacity: 0.4}).tikz()

        expect(tikz).toContain('draw=pidraw-red')
        expect(tikz).toContain('fill=pidraw-green, fill opacity=0.4')
    })

    test('has its label at the middle', () => {
        const {path} = create()
        const p = path({d: 'M 0 0 L 4 0', units: true})
        p.addLabel('$p$')

        expect(p.tikz()).toMatch(/\n\\node\[above\] at \(2,0\.16\) \{\$p\$\};$/)
    })

    test('is nothing when the path is hidden or not drawn', () => {
        const {path} = create()

        expect(path({d: 'M 0 0 L 4 0'}).hide().tikz()).toBe('')
        expect(path({d: ''}, 'q').tikz()).toBe('')
    })
})
