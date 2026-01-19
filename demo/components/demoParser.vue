<script lang="ts" setup>

import {onMounted, ref} from "vue"
import katex from "katex"
import {PiDraw} from "../../src"
import {basic_examples} from "../parsing_examples/basic_examples"

const parameter = ref<string>(`x=-11:11,y=-11:11,axis,grid,ppu=50`)
const code = ref<string>('a=line y=1/2x+3->w=10')
// const code = ref<string>(basic_examples[id].code ?? '')

const showAnimation = ref<boolean>(false)

let draw: PiDraw

function update(newCode: unknown) {
  if (typeof newCode === "string") {
    code.value = newCode
    // scroll to top
    document.getElementsByTagName('BODY')[0].scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "start"
    })
  }

  draw.refresh(code.value)
  showAnimation.value = draw.animation.canBeAnimated()
}

function updateLayout() {
  draw.refreshLayout(parameter.value)
}

function animation(value) {
  if (value === 'start') {
    draw.animation.start()
  } else if (value === 'pause') {
    draw.animation.pause()
  } else if (value === 'continue') {
    draw.animation.resume()
  } else if (value === 'stop') {
    draw.animation.cancel()
  }
}


onMounted(() => {
  draw = new PiDraw(
      'root',
      {
        tex: (value) => katex.renderToString(`${value}`, {throwOnError: false, displayMode: true}),
        parameters: parameter.value,
        code: code.value
      }
  )
})


</script>

<template>
	<main class="max-w-7xl mx-auto">
		<h1 class="text-center text-2xl font-semibold my-10">
			Graph builder
		</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			<div class="flex w-full flex-col gap-3">
				<input
					id="param"
					v-model="parameter"
					class="border px-3 py-1"
					@input="updateLayout"
				>
				<textarea
					id="construct"
					v-model="code"
					class="border p-3 rounded w-full"
					rows="20"
					@input="update"
				/>
			</div>
			<!-- output -->
			<div>
				<div
					id="root"
					class="bg-white rounded p-3 border"
				/>

				<div
					v-show="showAnimation"
					class="flex gap-3 mt-3"
				>
					<button
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('start')"
					>
						start
					</button>
					<button
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('pause')"
					>
						pause
					</button>
					<button
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('continue')"
					>
						continue
					</button>
					<button
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('stop')"
					>
						stop
					</button>
				</div>
			</div>
		</div>

		<div>
			<h3 class="my-10 font-semibold uppercase text-lg">
				Documentation
			</h3>

			<details class="border rounded p-3 bg-white">
				<summary class="my-5 text-xl">
					List of all commands
				</summary>
				<div
					ref="output"
					class="w-full grid grid-cols-1 md:grid-cols-2 gap-3"
				>
					<div
						v-for="(doc, index) in PiDraw.documentation()"
						:key="`doc-${index}`"
						class="border rounded flex flex-col gap-2"
					>
						<h2 class="font-semibold text-lg bg-gray-200 p-3">
							{{ doc.name }}
						</h2>
						<p class="px-3">
							{{ doc.description }}
						</p>
						<pre class="px-3 pb-3">{{ doc.code }}</pre>
					</div>
				</div>
			</details>

			<details
				class="border rounded p-3 bg-white mt-3"
				open
			>
				<summary class="my-5 text-xl">
					Code examples
				</summary>
				<div
					ref="examples"
					class="w-full grid grid-cols-1 md:grid-cols-2 gap-3"
				>
					<div
						v-for="(example, index) in basic_examples"
						:key="`example-${index}`"
						class="border rounded flex flex-col gap-2"
						@click="update(example.code)"
					>
						<h2 class="font-semibold text-lg bg-gray-200 p-3">
							{{ example.name }}
						</h2>
						<pre class="text-sm text-gray-500 px-3 py-1">{{ example.code }}</pre>
					</div>
				</div>
			</details>
		</div>
	</main>
</template>

<style scoped>

</style>