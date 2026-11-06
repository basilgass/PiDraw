<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import AnimationControls from './AnimationControls.vue'
import ButtonsControls from './ButtonsControls.vue'
import SlidesControls from './SlidesControls.vue'

// The code of the example is encoded by the Markdown fence (see config.mts): a newline or a quote cannot travel in an attribute.
const props = defineProps<{ code: string, params?: string }>()

const host = ref<HTMLElement | null>(null)
const errors = ref<{ line: number, message: string }[]>([])
const animated = ref(false)
const interactive = ref(false)
const stepped = ref(false)
const pushable = ref(false)

const source = computed(() => decodeURIComponent(props.code))

// The library is loaded when the page is in the browser: building the site must not touch the DOM.
let draw: import('pidraw').PiDraw | null = null
const animation = shallowRef<import('pidraw').Animate | null>(null)
const slides = shallowRef<import('pidraw').Slides | null>(null)
const buttons = shallowRef<import('pidraw').Buttons | null>(null)

function show(): void {
    if (draw === null) {
        return
    }

    errors.value = draw.errors.map(({line, message}) => ({line, message}))
    animated.value = animation.value?.canBeAnimated() ?? false
    interactive.value = Object.keys(draw.graph.figures).some(name => name.endsWith('_drag'))
    stepped.value = (slides.value?.count ?? 1) > 1
    pushable.value = (buttons.value?.buttons.length ?? 0) > 0
}

function reset(): void {
    animation.value?.stop()
    slides.value?.first()
    buttons.value?.reset()
    draw?.refresh(source.value, {drag: 'reset'})
    show()
}

onMounted(async () => {
    const [{PiDraw, Animate, Slides, Buttons}, katex] = await Promise.all([import('pidraw'), import('katex')])

    draw = new PiDraw(host.value as HTMLElement, {
        code: source.value,
        parameters: props.params ?? '',
        tex: value => katex.default.renderToString(value, {throwOnError: false, displayMode: true})
    })
    animation.value = new Animate(draw.graph)
    slides.value = new Slides(draw.graph)
    buttons.value = new Buttons(draw.graph)
    show()
})

onBeforeUnmount(() => {
    draw?.graph.dispose()
    draw = null
    animation.value = null
    slides.value = null
    buttons.value = null
})
</script>

<template>
    <div class="pd-example">
        <div ref="host" class="pd-figure"></div>

        <div v-if="animated || interactive || stepped || pushable" class="pd-bar">
            <SlidesControls v-if="stepped" :slides="slides" />
            <ButtonsControls :buttons="buttons" />
            <AnimationControls v-if="animated" :animation="animation" />
            <button type="button" @click="reset">Reset</button>
            <span v-if="interactive" class="pd-hint">Drag the points</span>
        </div>

        <ul v-if="errors.length > 0" class="pd-errors">
            <li v-for="error in errors" :key="error.line">
                <strong>Line {{ error.line }}</strong>: {{ error.message }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.pd-example {
    margin: 0 0 16px;
}

/* The figures are drawn for a white page, whatever the theme of the site. */
.pd-figure {
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    padding: 8px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0 0 8px 8px;
    background: #fff;
    color: #000;
}

.pd-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
}

.pd-bar button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 2px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.pd-hint {
    color: var(--vp-c-text-3);
    font-size: 0.85em;
}

.pd-errors {
    margin: 6px 0 0;
    padding: 8px 12px 8px 28px;
    border-radius: 6px;
    background: var(--vp-c-danger-soft);
    color: var(--vp-c-danger-1);
    font-size: 0.9em;
}
</style>
