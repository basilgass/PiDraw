<script lang="ts" setup>
import {FEATURE_COLUMNS, type IExampleFeatures} from "../parsing_examples/features"
import type {IDemoExample} from "../parsing_examples/basic_examples"

defineProps<{
  examples: readonly IDemoExample[]
  // What each example does, in the order of the examples (empty until it is computed).
  features: readonly IExampleFeatures[]
  // The index of the example that is drawn.
  current: number
}>()

defineEmits<{
  select: [index: number]
}>()
</script>

<template>
	<table class="w-full text-left border-collapse">
		<thead>
			<tr class="bg-gray-200">
				<th class="p-2">
					Example
				</th>
				<th
					v-for="column in FEATURE_COLUMNS"
					:key="column.key"
					class="p-2 text-center"
				>
					{{ column.title }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(example, index) in examples"
				:key="example.name"
				class="border-t cursor-pointer hover:bg-gray-100"
				:class="index === current ? 'bg-blue-50 font-semibold' : ''"
				@click="$emit('select', index)"
			>
				<td class="p-2">
					{{ example.name }}
				</td>
				<td
					v-for="column in FEATURE_COLUMNS"
					:key="column.key"
					class="p-2 text-center"
				>
					{{ features[index]?.[column.key] ? '●' : '' }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
