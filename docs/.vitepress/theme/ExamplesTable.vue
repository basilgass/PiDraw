<script setup lang="ts">
import {FEATURE_COLUMNS, type IExampleFeatures} from '../../../demo/parsing_examples/features'
import type {IDemoExample} from '../../../demo/parsing_examples/basic_examples'

// The examples and what each one does (drag, animation...). PiDraw has no interface, this is one that a page can copy.
defineProps<{
    examples: readonly IDemoExample[]
    // What each example does, in the order of the examples (empty until it is computed).
    features: readonly IExampleFeatures[]
    // The index of the example that is drawn.
    current: number
    disabled?: boolean
}>()

defineEmits<{ select: [index: number] }>()
</script>

<template>
    <div class="pd-examples">
        <table>
            <thead>
                <tr>
                    <th>Example</th>
                    <th v-for="column in FEATURE_COLUMNS" :key="column.key">{{ column.title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(example, index) in examples"
                    :key="example.name"
                    :class="{'pd-current': index === current, 'pd-disabled': disabled}"
                    :aria-selected="index === current"
                    tabindex="0"
                    @click="!disabled && $emit('select', index)"
                    @keydown.enter="!disabled && $emit('select', index)"
                >
                    <td>{{ example.name }}</td>
                    <td v-for="column in FEATURE_COLUMNS" :key="column.key" class="pd-feature">
                        <span v-if="features[index]?.[column.key]" :aria-label="column.title">&bull;</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.pd-examples {
    margin-top: 16px;
    overflow-x: auto;
}

table {
    display: table;
    width: 100%;
    margin: 0;
}

th,
td {
    padding: 6px 12px;
}

.pd-feature,
th:not(:first-child) {
    text-align: center;
}

.pd-feature span {
    color: var(--vp-c-brand-1);
}

tbody tr {
    cursor: pointer;
}

tbody tr:hover {
    background: var(--vp-c-bg-soft);
}

tbody tr.pd-current {
    background: var(--vp-c-brand-soft);
    font-weight: 600;
}

tbody tr.pd-disabled {
    cursor: default;
    opacity: 0.5;
}
</style>
