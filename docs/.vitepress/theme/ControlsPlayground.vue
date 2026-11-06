<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import AnimationControls from './AnimationControls.vue'
import ButtonsControls from './ButtonsControls.vue'
import ZoomControls from './ZoomControls.vue'
import SlidesControls from './SlidesControls.vue'
import {controlsDemos} from './controlsDemos'

const MAX_LOG = 8

const host = ref<HTMLElement | null>(null)
const selected = ref(0)
const errors = ref<string[]>([])
const log = ref<{ id: number, at: string, event: string }[]>([])
const animation = shallowRef<import('pidraw').Animate | null>(null)
const zoom = shallowRef<import('pidraw').Zoom | null>(null)
const slides = shallowRef<import('pidraw').Slides | null>(null)
const buttons = shallowRef<import('pidraw').Buttons | null>(null)
const animated = ref(false)

const current = computed(() => controlsDemos[selected.value])

// The library is loaded when the page is in the browser: building the site must not touch the DOM.
let draw: import('pidraw').PiDraw | null = null
let katex: typeof import('katex') | null = null
let counter = 0
let origin = 0

const ANIMATION_EVENTS = ['start', 'pause', 'end', 'stop'] as const

/** Write an event of a controller in the log: what the program would receive from `on`. */
function record(source: 'animation' | 'zoom' | 'slides' | 'buttons', event: string): void {
    if (counter === 0) {
        origin = performance.now()
    }

    const at = ((performance.now() - origin) / 1000).toFixed(1)

    log.value = [{id: counter++, at: `${at} s`, event: `${source}: ${event}`}, ...log.value].slice(0, MAX_LOG)
}

const animationHandlers = {
    start: () => { record('animation', 'start') },
    pause: () => { record('animation', 'pause') },
    end: () => { record('animation', 'end') },
    stop: () => { record('animation', 'stop') }
}

function slidesHandler(event: CustomEvent<{ current: number, count: number }>): void {
    record('slides', `change ${event.detail.current} / ${event.detail.count}`)
}

const zoomHandlers = {
    change: () => { record('zoom', 'change') },
    navigation: (event: CustomEvent<boolean>) => { record('zoom', `navigation ${event.detail ? 'on' : 'off'}`) }
}

function buttonsHandler(event: CustomEvent<{ toggled: string | null }>): void {
    record('buttons', event.detail.toggled === null ? 'change (the buttons of the code)' : `change ${event.detail.toggled}`)
}

function listen(target: import('pidraw').Animate | null, other: import('pidraw').Zoom | null, steps: import('pidraw').Slides | null, pushed: import('pidraw').Buttons | null): void {
    for (const event of ANIMATION_EVENTS) {
        target?.on(event, animationHandlers[event])
    }

    other?.on('change', zoomHandlers.change).on('navigation', zoomHandlers.navigation)
    steps?.on('change', slidesHandler)
    pushed?.on('change', buttonsHandler)
}

function unlisten(target: import('pidraw').Animate | null, other: import('pidraw').Zoom | null, steps: import('pidraw').Slides | null, pushed: import('pidraw').Buttons | null): void {
    for (const event of ANIMATION_EVENTS) {
        target?.off(event, animationHandlers[event])
    }

    other?.off('change', zoomHandlers.change).off('navigation', zoomHandlers.navigation)
    steps?.off('change', slidesHandler)
    pushed?.off('change', buttonsHandler)
}

function clearLog(): void {
    log.value = []
    counter = 0
}

/** Draw the demo that is chosen, with the controllers of its own: the previous drawing and its controllers are let go. */
async function show(): Promise<void> {
    if (host.value === null) {
        return
    }

    const library = await import('pidraw')
    katex ??= await import('katex')

    unlisten(animation.value, zoom.value, slides.value, buttons.value)
    draw?.graph.dispose()
    host.value.replaceChildren()
    clearLog()

    const demo = current.value
    draw = new library.PiDraw(host.value, {
        parameters: demo.parameters,
        code: demo.code,
        tex: value => (katex as typeof import('katex')).default.renderToString(value, {throwOnError: false, displayMode: true})
    })
    errors.value = draw.errors.map(({line, message}) => `Line ${line}: ${message}`)

    // Two controllers that know nothing of each other, on the same graph.
    const nextAnimation = new library.Animate(draw.graph)
    const nextZoom = demo.zoom === undefined ? null : new library.Zoom(draw.graph, demo.zoom)
    const nextSlides = demo.slides === undefined ? null : new library.Slides(draw.graph, demo.slides)
    const nextButtons = demo.buttons === true ? new library.Buttons(draw.graph) : null
    listen(nextAnimation, nextZoom, nextSlides, nextButtons)
    animated.value = nextAnimation.canBeAnimated()
    animation.value = nextAnimation
    zoom.value = nextZoom
    slides.value = nextSlides
    buttons.value = nextButtons
}

onMounted(() => {
    void show()
})

onBeforeUnmount(() => {
    unlisten(animation.value, zoom.value, slides.value, buttons.value)
    draw?.graph.dispose()
    draw = null
    animation.value = null
    zoom.value = null
    slides.value = null
    buttons.value = null
})
</script>

<template>
    <div class="pd-controls-page">
        <div class="pd-bar">
            <label>
                Demo
                <select v-model.number="selected" @change="show">
                    <option v-for="(demo, index) in controlsDemos" :key="demo.name" :value="index">
                        {{ demo.name }}
                    </option>
                </select>
            </label>
        </div>

        <p class="pd-about">{{ current.about }}</p>

        <div ref="host" class="pd-figure"></div>

        <ul v-if="errors.length > 0" class="pd-problem">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>

        <div v-if="slides !== null" class="pd-panel">
            <SlidesControls :slides="slides" />
        </div>

        <div v-if="buttons !== null" class="pd-panel">
            <ButtonsControls :buttons="buttons" />
        </div>

        <div v-if="animated" class="pd-panel">
            <AnimationControls :animation="animation" />
        </div>

        <div v-if="zoom !== null" class="pd-panel">
            <ZoomControls :zoom="zoom" />
        </div>

        <div class="pd-log">
            <div class="pd-log-title">
                <strong>Events</strong>
                <button type="button" :disabled="log.length === 0" @click="clearLog">Clear</button>
            </div>
            <ol v-if="log.length > 0">
                <li v-for="entry in log" :key="entry.id"><code>{{ entry.event }}</code> <span>{{ entry.at }}</span></li>
            </ol>
            <p v-else class="pd-empty">Use the buttons: the events that the controllers send are listed here.</p>
        </div>
    </div>
</template>

<style scoped>
.pd-controls-page {
    margin: 16px 0;
}

.pd-bar select,
.pd-log button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 4px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}

.pd-log button {
    cursor: pointer;
    font-size: 0.85em;
}

.pd-log button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pd-about {
    margin: 8px 0;
    color: var(--vp-c-text-2);
}

/* The figures are drawn for a white page, whatever the theme of the site. */
.pd-figure {
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    padding: 8px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: #fff;
    color: #000;
}

.pd-panel {
    margin: 10px 0;
}

.pd-problem {
    margin: 8px 0;
    padding: 8px 12px 8px 28px;
    border-radius: 6px;
    background: var(--vp-c-danger-soft);
    color: var(--vp-c-danger-1);
    font-size: 0.9em;
}

.pd-log {
    margin-top: 12px;
    padding: 8px 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
}

.pd-log-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pd-log ol {
    margin: 6px 0 0;
    padding-left: 20px;
    font-size: 0.9em;
}

.pd-log li span {
    margin-left: 8px;
    color: var(--vp-c-text-3);
}

.pd-empty {
    margin: 6px 0 0;
    color: var(--vp-c-text-3);
    font-size: 0.9em;
}
</style>
