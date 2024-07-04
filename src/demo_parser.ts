import PiDraw from "../lib";

const { createApp, ref } = Vue

const escapeHTML = str =>
    str.replace(
        /[&<>'"]/g,
        tag =>
        ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );

let draw
createApp({
    mounted() {
        // this.code = 'f(x)=sin(x),-pi:2pi'
        // const parsedCode = PiDraw.parse(this.code)
        draw = PiDraw.build(
            'root',
            this.parameter,
            this.code,
            (value: string): string => katex.renderToString(value, { throwOnError: false })
        )

        const result = PiDraw.documentation()

        this.output.innerHTML = Object.keys(result).map((key) => {
            return `<div class="border rounded flex flex-col gap-2">
            <h2 class="font-semibold text-lg bg-gray-200 p-3">${key}</h2>
            <p class="px-3">${escapeHTML(result[key].description)}</p>
            <pre class="px-3 pb-3">${escapeHTML(result[key].code)}</pre>
            </div>`
        }).join('')
        // Extract only the parameters.
        // const parameters = result.map((item) => item.parameters)
        // console.table(parameters[2].label);

    },
    setup() {
        const output = ref(null)
        const parameter = ref('x=-5:10,y=-3:5,grid,axis')
        const code = ref(`A(3,1)->red,w=0.5,drag=grid,tex=\\sin(\\alpha)/mc/0;0.3
B(-2,-1)->blue/0.4,?,w=0.1,label
AB=AB.->dash=7,w=5,!,label=hello=world/mc/0;0.3,black/0.1
f=plot x^2*sin(x)/8->#,w=2,color=orange
C=circ A,3->w=10,color=green,fill=red/0.3
p1=perp AB,A
Px=proj A,x->w=5
Py=proj A,y->w=5
Pl=proj Px,AB->w=10
poly=reg A,2,5
T(1,1)
x=PxT
X=inter x,AB->w=10,red
`)

        const message = ref("no message now")
        return {
            code,
            message,
            output,
            parameter,
            modify: () => {
            },
            update: () => {
                draw.refresh(code.value)
            },
            updateLayout: () => {
                draw.refreshLayout(parameter.value)
            },
            analyseCode: () => {
                console.log('analyseCode');
            },
            changeCaret: () => {
                console.log('change caret - display current line.');
            }
        }
    }
}).mount('#app')
