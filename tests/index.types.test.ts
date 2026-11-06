import {describe, expect, test} from 'vitest'
import type {
    AnimationEasing,
    BezierSegment,
    BuildResult,
    CircleOnly,
    IButton,
    IButtonsEventMap,
    IFigureToggle,
    FigureKind,
    IAnimateEventMap,
    IDraggableConfig,
    IDrawReport,
    IFigureAnimation,
    IGraphConstructorConfig,
    IGraphController,
    IGraphDragEvent,
    ISlideSet,
    ISlidesEventMap,
    ISlidesOptions,
    ISlidesState,
    IZoomEventMap,
    IZoomOptions,
    IParserConfig,
    ParserItem,
    PathCommand,
    Point,
    RiemannRectangle,
    TickLabel,
    TickSelection,
    ViewWindow,
    ZoomAllow
} from '../src'

// The types that a program names: this file compiles only while the package exports them (`tsc` checks it).
describe('the types of the package pidraw', () => {
    test('are exported', () => {
        const easing: AnimationEasing = 'inOut'
        const kind: FigureKind = 'point'
        const selection: TickSelection = {every: 5}
        const events: keyof IAnimateEventMap = 'end'
        const allow: ZoomAllow = 'zoom'
        const options: IZoomOptions = {allow, gestures: true}
        const zoomEvent: keyof IZoomEventMap = 'navigation'
        const shown: ViewWindow = {x: {min: 0, max: 1}, y: {min: 0, max: 1}}
        const set: ISlideSet = [{from: 2}]
        const state: ISlidesState = {current: 1, count: 3, title: null}
        const slidesEvent: keyof ISlidesEventMap = 'change'
        const slidesOptions: ISlidesOptions = {count: 3}
        const button: IButton = {id: 'area', title: 'Area', active: false}
        const buttonsEvent: keyof IButtonsEventMap = 'change'
        const toggle: IFigureToggle = {id: 'area', duration: 0.5, hidden: true}

        expect([easing, kind, events, selection.every, options.allow, zoomEvent, shown.x.max, set[0].from, state.count, slidesEvent, slidesOptions.count, button.id, buttonsEvent, toggle.duration])
            .toEqual(['inOut', 'point', 'end', 5, 'zoom', 'navigation', 1, 2, 3, 'change', 3, 'area', 'change', 0.5])
    })

    test('name the shapes that the figures give back', () => {
        const shapes: [
            BezierSegment | undefined, PathCommand | undefined, RiemannRectangle | undefined, TickLabel | undefined,
            BuildResult<unknown> | undefined, CircleOnly<{ center: number }> | undefined, ParserItem | undefined
        ] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined]

        expect(shapes).toHaveLength(7)
    })

    test('name the objects of a program', () => {
        const objects: [
            Point | undefined, IFigureAnimation | undefined, IGraphController | undefined, IGraphConstructorConfig | undefined,
            IGraphDragEvent | undefined, IDraggableConfig | undefined, IDrawReport | undefined, IParserConfig | undefined
        ] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

        expect(objects).toHaveLength(8)
    })
})
