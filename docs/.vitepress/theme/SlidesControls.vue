<script setup lang="ts">
import {computed, onBeforeUnmount, ref, watch} from 'vue'
import type {Slides} from 'pidraw'

// The buttons of a presentation: they act on a `Slides` and show where it is. PiDraw has no interface, this is one that a page can copy.
const props = defineProps<{ slides: Slides | null }>()

const current = ref(1)
const count = ref(1)
const title = ref<string | null>(null)

const atStart = computed(() => props.slides === null || current.value <= 1)
const atEnd = computed(() => props.slides === null || current.value >= count.value)

function show(): void {
    if (props.slides === null) {
        current.value = 1
        count.value = 1
        title.value = null

        return
    }

    current.value = props.slides.current
    count.value = props.slides.count
    title.value = props.slides.title
}

// The step and the number of steps come from the event of the presentation, not from what the buttons were pressed: the code can change them.
watch(() => props.slides, (slides, previous) => {
    previous?.off('change', show)
    slides?.on('change', show)
    show()
}, {immediate: true})

onBeforeUnmount(() => {
    props.slides?.off('change', show)
})
</script>

<template>
    <div class="pd-slides" role="group" aria-label="Slides">
        <button type="button" title="First step" :disabled="atStart" @click="slides?.first()">&laquo;</button>
        <button type="button" title="Previous step" :disabled="atStart" @click="slides?.previous()">&lsaquo; Previous</button>
        <button type="button" title="Next step" :disabled="atEnd" @click="slides?.next()">Next &rsaquo;</button>
        <button type="button" title="Last step" :disabled="atEnd" @click="slides?.last()">&raquo;</button>
        <span class="pd-step">{{ current }} / {{ count }}</span>
        <span v-if="title !== null" class="pd-title">{{ title }}</span>
    </div>
</template>

<style scoped>
.pd-slides {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.pd-slides button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 2px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.pd-slides button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pd-title {
    color: var(--vp-c-text-1);
    font-weight: 600;
}

.pd-step {
    min-width: 3.5em;
    color: var(--vp-c-text-2);
    font-variant-numeric: tabular-nums;
}
</style>
