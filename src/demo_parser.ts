import { PiDraw } from "../lib/main"



const { createApp, ref } = Vue

let draw
createApp({
    mounted() {
        // const parsedCode = PiDraw.parse(this.code)

        draw = new PiDraw.graph('root')
        draw.load(this.code)

        // Extract only the parameters.
        // const parameters = result.map((item) => item.parameters)
        // console.table(parameters[2].label);

    },
    setup() {

        const code = ref(`A(3,4)->red,w=0.5,drag=grid
B(-2,-1)->blue/0.4,?,w=0.1
AB=AB.->dash=7,w=5,!,label=hello=world/mc/0:4,black/0.1
f=plot x^2*sin(x)/8->#,samples=500,w=2,color=orange
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
            modify: () => {
            },
            update: () => {
                draw.refresh(code.value)
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
