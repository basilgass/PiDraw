<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import AnimationControls from './AnimationControls.vue'
import SlidesControls from './SlidesControls.vue'
import {basic_examples} from '../../../demo/parsing_examples/basic_examples'

interface IExample {
    name: string
    code: string
    parameters?: string
}

const examples: IExample[] = basic_examples
const DEFAULT_PARAMETERS = 'x=-11:11,y=-11:11,axis,grid,unitX=0.9'

const editorHost = ref<HTMLElement | null>(null)
const figureHost = ref<HTMLElement | null>(null)
const selected = ref(0)
const parameters = ref(examples[0].parameters ?? DEFAULT_PARAMETERS)
const parametersError = ref('')
const errors = ref<{ line: number, message: string, pending: boolean }[]>([])
const animated = ref(false)
const stepped = ref(false)
const showTikz = ref(false)
const tikz = ref('')
const ready = ref(false)

const current = computed(() => examples[selected.value])

type Library = typeof import('pidraw')
type Diagnostic = import('@codemirror/lint').Diagnostic

let draw: InstanceType<Library['PiDraw']> | null = null
const animation = shallowRef<InstanceType<Library['Animate']> | null>(null)
const slides = shallowRef<InstanceType<Library['Slides']> | null>(null)
let view: import('@codemirror/view').EditorView | null = null
let lint: typeof import('@codemirror/lint') | null = null
let scheduled = false

/** The TikZ of the drawing, or the reason why it cannot be written. */
function writeTikz(): string {
    try {
        return `${draw?.graph.tikzPreamble() ?? ''}\n\n${draw?.graph.tikz() ?? ''}`
    } catch (error) {
        return error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    }
}

/** Draw the code that is in the editor, and mark its lines that are not valid. The line that has the cursor is the one being typed. */
function run(): void {
    scheduled = false

    if (draw === null || view === null || lint === null) {
        return
    }

    const {state} = view
    const report = draw.refresh(state.doc.toString(), {editing: state.doc.lineAt(state.selection.main.head).number})

    errors.value = report.errors.map(({line, message, severity}) => ({line, message, pending: severity === 'pending'}))
    animated.value = animation.value?.canBeAnimated() ?? false
    stepped.value = (slides.value?.count ?? 1) > 1

    if (showTikz.value) {
        tikz.value = writeTikz()
    }

    // The columns of an error are the ones of its line as it is written: the line gives where it starts.
    const diagnostics = report.errors.map((error): Diagnostic => {
        const line = state.doc.line(error.line)

        return {
            from: error.from === undefined ? line.from : line.from + error.from,
            to: error.to === undefined ? line.to : line.from + error.to,
            severity: error.severity === 'pending' ? 'info' : 'error',
            message: error.message
        }
    })

    view.dispatch(lint.setDiagnostics(state, diagnostics))
}

/** An update of the editor cannot be followed by another one inside the same update: draw right after it. */
function schedule(): void {
    if (!scheduled) {
        scheduled = true
        queueMicrotask(run)
    }
}

function choose(): void {
    parameters.value = current.value.parameters ?? DEFAULT_PARAMETERS
    changeParameters()
    view?.dispatch({changes: {from: 0, to: view.state.doc.length, insert: current.value.code}})
}

function changeParameters(): void {
    parametersError.value = draw?.refreshLayout(parameters.value)?.message ?? ''
    schedule()
}

function reset(): void {
    animation.value?.stop()
    slides.value?.first()
    draw?.refresh(view?.state.doc.toString() ?? '', {drag: 'reset'})
    schedule()
}

function toggleTikz(): void {
    showTikz.value = !showTikz.value
    tikz.value = showTikz.value ? writeTikz() : ''
}

onMounted(async () => {
    const [library, katex, {EditorState}, {EditorView, keymap, lineNumbers}, {defaultKeymap, history, historyKeymap, indentWithTab}, lintModule, editorModule] = await Promise.all([
        import('pidraw'),
        import('katex'),
        import('@codemirror/state'),
        import('@codemirror/view'),
        import('@codemirror/commands'),
        import('@codemirror/lint'),
        import('pidraw/codemirror')
    ])

    lint = lintModule

    view = new EditorView({
        parent: editorHost.value as HTMLElement,
        state: EditorState.create({
            doc: current.value.code,
            extensions: [
                lineNumbers(),
                history(),
                keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
                // The colors, the marks on the names of the figures and the suggestions come with the package.
                editorModule.pidraw(),
                lintModule.lintGutter(),
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    // The diagnostics are a transaction too: only a change of the text or of the cursor draws again.
                    if (update.docChanged || update.selectionSet) {
                        schedule()
                    }
                })
            ]
        })
    })

    draw = new library.PiDraw(figureHost.value as HTMLElement, {
        parameters: parameters.value,
        code: current.value.code,
        tex: value => katex.default.renderToString(value, {throwOnError: false, displayMode: true})
    })

    animation.value = new library.Animate(draw.graph)
    slides.value = new library.Slides(draw.graph)

    parametersError.value = draw.layoutError?.message ?? ''
    ready.value = true
    run()
})

onBeforeUnmount(() => {
    view?.destroy()
    draw?.graph.dispose()
    view = null
    draw = null
    animation.value = null
    slides.value = null
})
</script>

<template>
    <div class="pd-playground">
        <div class="pd-bar">
            <label>
                Example
                <select v-model.number="selected" :disabled="!ready" @change="choose">
                    <option v-for="(example, index) in examples" :key="example.name" :value="index">
                        {{ example.name }}
                    </option>
                </select>
            </label>
            <AnimationControls v-if="animated" :animation="animation" />
            <SlidesControls v-if="stepped" :slides="slides" />
            <button type="button" :disabled="!ready" @click="reset">Reset</button>
            <button type="button" :disabled="!ready" @click="toggleTikz">{{ showTikz ? 'Hide TikZ' : 'TikZ' }}</button>
        </div>

        <label class="pd-parameters">
            Parameters
            <input v-model="parameters" type="text" spellcheck="false" :disabled="!ready" @input="changeParameters">
        </label>
        <p v-if="parametersError" class="pd-problem">{{ parametersError }}</p>

        <div ref="editorHost" class="pd-editor"></div>

        <ul v-if="errors.length > 0" class="pd-problem pd-list">
            <li v-for="error in errors" :key="`${error.line}-${error.message}`" :class="{'pd-pending': error.pending}">
                <strong>Line {{ error.line }}</strong>: {{ error.message }}
            </li>
        </ul>

        <div ref="figureHost" class="pd-figure"></div>

        <pre v-if="showTikz" class="pd-tikz">{{ tikz }}</pre>
    </div>
</template>

<style scoped>
.pd-playground {
    margin: 16px 0;
}

.pd-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.pd-bar select,
.pd-bar button,
.pd-parameters input {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 4px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}

.pd-bar button {
    cursor: pointer;
}

.pd-bar button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pd-parameters {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.pd-parameters input {
    flex: 1;
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
}

.pd-editor {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: var(--vp-code-block-bg);
    min-height: 160px;
    max-height: 420px;
    overflow: auto;
}

.pd-editor :deep(.cm-editor) {
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
    background: transparent;
    color: var(--vp-c-text-1);
}

.pd-editor :deep(.cm-editor.cm-focused) {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: -1px;
    border-radius: 6px;
}

.pd-editor :deep(.cm-gutters) {
    background: transparent;
    color: var(--vp-c-text-3);
    border-right: 1px solid var(--vp-c-divider);
}

.pd-editor :deep(.cm-content) {
    caret-color: var(--vp-c-text-1);
    padding: 8px 0;
}

.pd-editor :deep(.cm-cursor) {
    border-left-color: var(--vp-c-text-1);
}

/* The colors of the code: the package gives classes, the site gives them their color (light or dark). */
.pd-editor :deep(.tok-keyword) { color: var(--vp-c-brand-1); }
.pd-editor :deep(.tok-string) { color: var(--vp-c-green-1); }
.pd-editor :deep(.tok-number) { color: var(--vp-c-purple-1); }
.pd-editor :deep(.tok-comment) { color: var(--vp-c-text-3); font-style: italic; }
.pd-editor :deep(.tok-function) { color: var(--vp-c-indigo-1); }
.pd-editor :deep(.tok-class) { color: var(--vp-c-yellow-1); }
.pd-editor :deep(.tok-invalid) { color: var(--vp-c-danger-1); }

.pd-editor {
    --pidraw-dup: var(--vp-c-danger-1);
    --pidraw-ref: var(--vp-c-brand-soft);
}

.pd-problem {
    margin: 8px 0;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--vp-c-danger-soft);
    color: var(--vp-c-danger-1);
    font-size: 0.9em;
}

.pd-list {
    padding-left: 28px;
}

/* The line that is being typed: its problem is shown quietly. */
.pd-pending {
    opacity: 0.6;
}

/* The figures are drawn for a white page, whatever the theme of the site. */
.pd-figure {
    margin-top: 12px;
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    padding: 8px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: #fff;
    color: #000;
}

.pd-tikz {
    margin-top: 12px;
    padding: 12px;
    max-height: 360px;
    overflow: auto;
    border-radius: 6px;
    background: var(--vp-code-block-bg);
    font-size: 0.8em;
}
</style>
