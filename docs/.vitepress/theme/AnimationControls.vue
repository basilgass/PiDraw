<script setup lang="ts">
import {computed, onBeforeUnmount, ref, watch} from 'vue'
import type {Animate} from 'pidraw'

// The buttons of an animation: they act on an `Animate` and show what it says. PiDraw has no interface, this is one that a page can copy.
const props = defineProps<{ animation: Animate | null }>()

type State = 'ready' | 'playing' | 'paused' | 'stopped' | 'finished'

const LABELS: Record<State, string> = {
    ready: 'Ready',
    playing: 'Playing',
    paused: 'Paused',
    stopped: 'Stopped',
    finished: 'Finished'
}

const state = ref<State>('ready')

const playing = computed(() => state.value === 'playing')
const paused = computed(() => state.value === 'paused')

// The state comes from the events of the animation, never from what the buttons were pressed.
const handlers: Record<'start' | 'pause' | 'end' | 'stop', () => void> = {
    start: () => { state.value = 'playing' },
    pause: () => { state.value = 'paused' },
    end: () => { state.value = 'finished' },
    stop: () => { state.value = 'stopped' }
}

function listen(animation: Animate): void {
    animation.on('start', handlers.start).on('pause', handlers.pause).on('end', handlers.end).on('stop', handlers.stop)
}

function stopListening(animation: Animate): void {
    animation.off('start', handlers.start).off('pause', handlers.pause).off('end', handlers.end).off('stop', handlers.stop)
}

watch(() => props.animation, (animation, previous) => {
    if (previous) {
        stopListening(previous)
    }

    if (animation) {
        listen(animation)
    }

    state.value = animation?.isRunning() ? 'playing' : animation?.isPaused() ? 'paused' : 'ready'
}, {immediate: true})

onBeforeUnmount(() => {
    if (props.animation) {
        stopListening(props.animation)
    }
})
</script>

<template>
    <div class="pd-controls" role="group" aria-label="Animation">
        <button type="button" :disabled="animation === null || playing" @click="animation?.start()">{{ paused ? 'Resume' : 'Play' }}</button>
        <button type="button" :disabled="animation === null || !playing" @click="animation?.pause()">Pause</button>
        <button type="button" :disabled="animation === null || state === 'ready'" @click="animation?.stop()">Stop</button>
        <button type="button" :disabled="animation === null" @click="animation?.restart()">Restart</button>
        <span class="pd-state" :data-state="state">{{ LABELS[state] }}</span>
    </div>
</template>

<style scoped>
.pd-controls {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.pd-controls button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 2px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.pd-controls button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pd-state {
    min-width: 5em;
    color: var(--vp-c-text-3);
    font-size: 0.85em;
}

.pd-state[data-state='playing'] {
    color: var(--vp-c-brand-1);
}
</style>
