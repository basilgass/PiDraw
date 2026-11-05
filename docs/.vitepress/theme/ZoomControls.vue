<script setup lang="ts">
import {computed, onBeforeUnmount, ref, watch} from 'vue'
import type {Zoom} from 'pidraw'

// The buttons of a zoom: they act on a `Zoom` and show what it says. PiDraw has no interface, this is one that a page can copy.
const props = defineProps<{ zoom: Zoom | null }>()

/** How far an arrow moves the drawing, in pixels. */
const STEP = 60

const text = ref('')
const navigating = ref(false)

const canZoom = computed(() => props.zoom?.canZoom ?? false)
const canMove = computed(() => props.zoom?.canMove ?? false)
const gestures = computed(() => props.zoom?.gestures ?? false)

function show(): void {
    if (props.zoom === null) {
        text.value = ''
        return
    }

    const {x, y} = props.zoom.window
    text.value = `x: ${x.min.toFixed(2)} to ${x.max.toFixed(2)}, y: ${y.min.toFixed(2)} to ${y.max.toFixed(2)}`
}

// The window and the mode come from the events of the zoom, not from what the buttons were pressed: a gesture changes them too.
const handlers = {
    change: show,
    navigation: (event: CustomEvent<boolean>) => { navigating.value = event.detail }
}

function listen(zoom: Zoom): void {
    zoom.on('change', handlers.change).on('navigation', handlers.navigation)
}

function stopListening(zoom: Zoom): void {
    zoom.off('change', handlers.change).off('navigation', handlers.navigation)
}

watch(() => props.zoom, (zoom, previous) => {
    if (previous) {
        stopListening(previous)
    }

    if (zoom) {
        listen(zoom)
    }

    navigating.value = zoom?.navigating ?? false
    show()
}, {immediate: true})

onBeforeUnmount(() => {
    if (props.zoom) {
        stopListening(props.zoom)
    }
})

function toggleNavigation(): void {
    if (props.zoom) {
        props.zoom.navigating = !props.zoom.navigating
    }
}
</script>

<template>
    <div class="pd-zoom" role="group" aria-label="Zoom">
        <button type="button" title="Zoom in" :disabled="!canZoom" @click="zoom?.zoomIn()">+</button>
        <button type="button" title="Zoom out" :disabled="!canZoom" @click="zoom?.zoomOut()">&minus;</button>
        <button type="button" title="Move left" :disabled="!canMove" @click="zoom?.moveOrigin(STEP, 0)">&larr;</button>
        <button type="button" title="Move up" :disabled="!canMove" @click="zoom?.moveOrigin(0, STEP)">&uarr;</button>
        <button type="button" title="Move down" :disabled="!canMove" @click="zoom?.moveOrigin(0, -STEP)">&darr;</button>
        <button type="button" title="Move right" :disabled="!canMove" @click="zoom?.moveOrigin(-STEP, 0)">&rarr;</button>
        <button type="button" :disabled="zoom === null" @click="zoom?.reset()">Reset</button>
        <button
            v-if="gestures"
            type="button"
            class="pd-mode"
            :aria-pressed="navigating"
            :class="{'pd-on': navigating}"
            @click="toggleNavigation"
        >
            {{ canMove && canZoom ? 'Move / Zoom' : canMove ? 'Move' : 'Zoom' }}
        </button>
        <span class="pd-window">{{ text }}</span>
    </div>
</template>

<style scoped>
.pd-zoom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.pd-zoom button {
    min-width: 2em;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 2px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.pd-zoom button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pd-zoom .pd-on {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.pd-window {
    color: var(--vp-c-text-3);
    font-family: var(--vp-font-family-mono);
    font-size: 0.8em;
}
</style>
