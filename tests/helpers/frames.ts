import {vi} from 'vitest'

/**
 * The frames of the page, which node does not have: `requestAnimationFrame` keeps the call it is given, and `at` is the browser calling it.
 * Like the browser, it calls nothing when no frame is asked for (the animation is paused, over or not started).
 * @param id what `requestAnimationFrame` gives back, and `cancelAnimationFrame` receives.
 */
export function stubFrames(id = 1) {
    let pending: ((now: number) => void) | null = null

    const request = vi.fn((callback: (now: number) => void) => {
        pending = callback

        return id
    })
    const cancel = vi.fn((_id: number) => {
        pending = null
    })

    vi.stubGlobal('requestAnimationFrame', request)
    vi.stubGlobal('cancelAnimationFrame', cancel)

    return {
        request,
        cancel,

        /** Whether a frame is asked for. */
        asked: (): boolean => pending !== null,

        /** One frame, at the instant `now` in milliseconds. */
        at(now: number): void {
            const callback = pending
            pending = null
            callback?.(now)
        },

        /** Frames of 50 ms from the instant `from` to the instant `to`: one frame never adds more than a limit to the animation. */
        play(from: number, to: number): void {
            for (let instant = from; instant <= to; instant += 50) {
                const callback = pending
                pending = null
                callback?.(instant)
            }
        }
    }
}
