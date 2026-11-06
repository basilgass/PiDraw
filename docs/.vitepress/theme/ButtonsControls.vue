<script setup lang="ts">
import {onBeforeUnmount, ref, watch} from 'vue'
import type {Buttons, IButton} from 'pidraw'

// The buttons that the code declares (`@button=id->title=Text`): they act on a `Buttons`. PiDraw has no interface, this is one that a page can copy.
const props = defineProps<{ buttons: Buttons | null }>()

const list = ref<IButton[]>([])

// The list and the pressed ones come from the event of the controller, not from what the buttons were pressed: the code can change them.
function show(): void {
    list.value = props.buttons?.buttons ?? []
}

watch(() => props.buttons, (buttons, previous) => {
    previous?.off('change', show)
    buttons?.on('change', show)
    show()
}, {immediate: true})

onBeforeUnmount(() => {
    props.buttons?.off('change', show)
})
</script>

<template>
    <div v-if="list.length > 0" class="pd-buttons" role="group" aria-label="Figures">
        <button
            v-for="button in list"
            :key="button.id"
            type="button"
            :aria-pressed="button.active"
            :class="{'pd-pressed': button.active}"
            @click="buttons?.toggle(button.id)"
        >
            {{ button.title }}
        </button>
    </div>
</template>

<style scoped>
.pd-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.pd-buttons button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 2px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.pd-buttons button.pd-pressed {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
}
</style>
