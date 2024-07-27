import { PiParser } from '../lib'

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
        this.code = `A(8,3)->red,w=5,drag=grid
B(-4,-1)->blue,w=10
M=mid A,B
P1=proj A,Ox
P2=proj A,Oy
d=AB
e=line P1,P2
p=perp d,M
q=med A,M
C(1,-2)
p1=poly A,B,C->fill=teal/0.3,red/0.5,w=10
q=para d,C
f(x)=x^2*sin(x)/8
g(t)=t^2/4,sin(t)
c=circ A,3
a=arc C,B,A,1
d1=BC.
v1=vCA
X(0,0)->drag=f
d=follow f->red,w=4,dash
`

        //         this.code = `a=line x=3
        // b=line y=-1
        // c=line 2x-3y=5
        // d=line y=2/3x-1
        // e=line 2x=3y-4`
        // const parsedCode = PiDraw.parse(this.code)
        draw = new PiParser(
            'root',
            {
                tex: (value) => katex.renderToString(value, { throwOnError: false, displayMode: true }),
                parameters: this.parameter,
                input: this.code
            }
        )

        const result = PiParser.documentation()

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
