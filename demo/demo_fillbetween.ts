import { Draw } from '../lib'

const { createApp, ref } = Vue


let draw
createApp({
    mounted() {
        // this.code = 'f(x)=sin(x),-pi:2pi'
        this.code = `f(x)=1/10x^2-1/2x+1
A=follow f
g(x)=-1/8x^2-3/7x+3
z=fill f,g,-2:5->fill=yellow/0.4,w=10,red
r=riemann f,6:9,4->fill=green/0.4
`

        //         this.code = `a=line x=3
        // b=line y=-1
        // c=line 2x-3y=5
        // d=line y=2/3x-1
        // e=line 2x=3y-4`
        // const parsedCode = PiDraw.parse(this.code)
        draw = new Draw(
            'root',
            {
                tex: (value) => katex.renderToString(value, { throwOnError: false, displayMode: true }),
                parameters: this.parameter,
                code: this.code
            }
        )

        // Extract only the parameters.
        // const parameters = result.map((item) => item.parameters)
        // console.table(parameters[2].label);

    },
    setup() {
        const output = ref(null)
        const parameter = ref('x=-5:10,y=-3:5,grid,axis')
        const code = ref(``)
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
