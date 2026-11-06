import {describe, expect, test} from 'vitest'
import {THEMES, themeSyntaxes} from '../../src/controls/controls'
import {optionNames} from '../../src/Draw/Draw.options'
import {PiParse} from 'piparser'

describe('the registry of the themes', () => {
    test('has a syntax for each entry that the themes keep on a figure', () => {
        expect(Object.keys(THEMES).sort()).toEqual(['animate', 'slide', 'toggle'])
    })

    test('the options of the themes are options of the language, each once', () => {
        const options = themeSyntaxes().flatMap(theme => Object.keys(theme.options))

        expect(new Set(options).size).toBe(options.length)
        options.forEach((option) => {
            expect(optionNames()).toContain(option)
        })
    })

    test('the option that gives the entry has the name of the entry', () => {
        Object.entries(THEMES).forEach(([key, theme]) => {
            expect(Object.keys(theme.options)).toContain(key)
        })
    })

    test('the options whose value is a set are read as sets', () => {
        expect(THEMES.slide.optionTypes).toEqual({slide: 'set'})
    })

    test('a command of a theme has a pattern that accepts its forms and refuses the others', () => {
        const pattern = THEMES.slide.commands?.pattern

        if (pattern === undefined) {
            throw new Error('the slides have commands')
        }

        expect(['@pause', '@slides', '@slides=<2->', '@slides = <2-4,6>'].map(line => pattern.test(line))).toEqual([true, true, true, true])
        expect(['@play', '@pause now', '@slides=3'].map(line => pattern.test(line))).toEqual([false, false, false])
    })

    test('the commands read their values with the parser', () => {
        const commands = THEMES.slide.commands
        const parser = new PiParse()
        const state = commands?.fold(commands.initial, {name: 'slides', value: '=<3->', text: '@slides=<3->'}, parser)

        expect(commands?.defaults(state)).toEqual({slide: [{from: 3}]})
    })

    test('the handle of a point takes the steps and not the animation', () => {
        expect(themeSyntaxes().flatMap(theme => theme.handleControls ?? [])).toEqual(['slide'])
    })
})
