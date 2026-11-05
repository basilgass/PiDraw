/// <reference types="vite/client" />
import {describe, expect, test, vi} from 'vitest'
import './helpers/figure'

// A cycle of imports breaks only when a module is the first one loaded ("Class extends value undefined"):
// every module of the library is loaded alone, as the first one.
const modules = import.meta.glob('../src/**/*.ts')

describe('modules of src', () => {
    test.each(Object.keys(modules))('%s can be loaded first', async (path) => {
        vi.resetModules()

        await expect(modules[path]()).resolves.toBeDefined()
    })

    test('there are modules to load', () => {
        expect(Object.keys(modules).length).toBeGreaterThan(30)
    })
})
