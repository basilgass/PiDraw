<script lang="ts" setup>

import {onMounted, ref} from "vue"
import katex from "katex"
import {Animate, Buttons, type IButton, type IGraphDragEvent, type IGraphDragMoveEvent, PiDraw, Slides} from "../../src"
import {basic_examples, DEFAULT_PARAMETERS} from "../parsing_examples/basic_examples"
import {featuresOfExamples, type IExampleFeatures} from "../parsing_examples/features"
import ExamplesTable from "./examplesTable.vue"

// The example that is drawn first: the first one, the simplest.
const current = ref<number>(0)
const parameter = ref<string>(basic_examples[0].parameters ?? DEFAULT_PARAMETERS)
// How many figures the last move of a point reached, out of how many there are.
const touched = ref<string>('')
// The message of the parameters that cannot be read.
const parameterError = ref<string>('')
// const code = ref<string>('a=line y=1/2x+3->w=10')
const code = ref<string>(basic_examples[0].code)
// What each example does (drag, animation...), computed by drawing them on a drawing that is not shown.
const features = ref<IExampleFeatures[]>([])

const showAnimation = ref<boolean>(false)
// The step of the presentation, when the code has more than one.
const slidesState = ref({current: 1, count: 1, title: null as string | null})
// The buttons that the code declares (@button=id->title=Text) and the ones that are pressed.
const buttons = ref<IButton[]>([])
// What is wrong with the lines of the code: the report of the last drawing.
const lineErrors = ref<string[]>([])

let draw: PiDraw
let player: Animate
let pushers: Buttons
let slides: Slides

function update() {
  const report = draw.refresh(code.value)
  lineErrors.value = report.errors.map(error => `Line ${error.line}: ${error.message}`)
  showAnimation.value = player.canBeAnimated()
  slidesState.value = slides.state
}

// An example of the table: its code and its parameters are drawn, and the page goes back to the editor.
function select(index: number) {
  current.value = index
  parameter.value = basic_examples[index].parameters ?? DEFAULT_PARAMETERS
  code.value = basic_examples[index].code
  updateLayout()
  document.getElementsByTagName('BODY')[0].scrollIntoView({
    block: "start",
    behavior: "smooth",
    inline: "start"
  })
}

function updateLayout() {
  // A parameter that is not valid does not throw: the graph keeps the ones it had, and the error is given.
  parameterError.value = draw.refreshLayout(parameter.value)?.message ?? ''

  // The lines are built with the layout: they are drawn again.
  update()
}

function animation(value: string) {
  // TODO: type correctly value.
  if (value === 'start') {
    player.start()
  } else if (value === 'pause') {
    player.pause()
  } else if (value === 'continue') {
    player.start()
  } else if (value === 'stop') {
    player.stop()
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

  player = new Animate(draw.graph)
  slides = new Slides(draw.graph)
  slides.on('change', event => {
    slidesState.value = event.detail
  })
  slidesState.value = slides.state
  pushers = new Buttons(draw.graph)
  buttons.value = pushers.buttons
  pushers.on('change', event => {
    buttons.value = [...event.detail.buttons]
  })
  parameterError.value = draw.layoutError?.message ?? ''
  lineErrors.value = draw.errors.map(error => `Line ${error.line}: ${error.message}`)
  showAnimation.value = player.canBeAnimated()

  // A drawing that nobody sees reads what each example does.
  const scan = new PiDraw('scan', {})
  features.value = featuresOfExamples(scan)
  scan.graph.dispose()

  draw.graph.on('dragstart', (e: CustomEvent<IGraphDragEvent>)=>{
    console.log('MOVE', e.detail.figure.name)
  })
  draw.graph.on('dragmove', (e: CustomEvent<IGraphDragMoveEvent>)=>{
    const {figure, updated, total} = e.detail

    touched.value = `${figure.name} moved: ${updated} figures reached out of ${total}`
  })
})

function logTikz(){
  console.log(draw.graph.tikzPreamble())
  console.log(draw.graph.tikz())
}

</script>

<template>
	<main class="max-w-7xl mx-auto">
		<div
			id="scan"
			class="hidden"
		/>
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
				<p
					v-if="parameterError"
					class="text-red-600 text-sm"
				>
					{{ parameterError }}
				</p>
				<textarea
					id="construct"
					v-model="code"
					class="border p-3 rounded w-full"
					rows="20"
					@input="update"
				/>
				<ul
					v-if="lineErrors.length > 0"
					class="text-red-600 text-sm list-disc pl-5"
				>
					<li
						v-for="message in lineErrors"
						:key="message"
					>
						{{ message }}
					</li>
				</ul>

        <button @click="logTikz">Log Tikz output</button>
			</div>
			<!-- output -->
			<div>
				<div
					id="root"
					class="bg-white rounded p-3 border"
				/>
				<p
					v-if="touched"
					class="text-sm text-gray-600 mt-1"
				>
					{{ touched }}
				</p>

				<div
					v-if="buttons.length > 0 || showAnimation || slidesState.count > 1"
					class="flex flex-wrap gap-3 mt-3"
				>
					<button
						v-for="button in buttons"
						:key="button.id"
						class="hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						:class="button.active ? 'bg-gray-300' : 'bg-white'"
						@click="pushers.toggle(button.id)"
					>
						{{ button.title }}
					</button>
					<button
						v-if="showAnimation"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('start')"
					>
						start
					</button>
					<button
						v-if="showAnimation"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('pause')"
					>
						pause
					</button>
					<button
						v-if="showAnimation"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('continue')"
					>
						continue
					</button>
					<button
						v-if="showAnimation"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="animation('stop')"
					>
						stop
					</button>
					<button
						v-if="slidesState.count > 1"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="slides.previous()"
					>
						Previous
					</button>
					<button
						v-if="slidesState.count > 1"
						class="bg-white hover:bg-gray-200 transition-colors border rounded px-4 py-2"
						@click="slides.next()"
					>
						Next
					</button>
					<span
						v-if="slidesState.count > 1"
						class="self-center text-sm text-gray-600"
					>
						{{ slidesState.current }} / {{ slidesState.count }} {{ slidesState.title ?? '' }}
					</span>
				</div>
			</div>
		</div>

		<div>
			<h3 class="my-10 font-semibold uppercase text-lg">
				Examples
			</h3>
			<div class="border rounded bg-white overflow-x-auto">
				<examples-table
					:examples="basic_examples"
					:features="features"
					:current="current"
					@select="select"
				/>
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
						<pre class="px-3 pb-3">{{ doc.forms.join('\n') }}</pre>
					</div>
				</div>
			</details>
		</div>
	</main>
</template>

<style scoped>

</style>