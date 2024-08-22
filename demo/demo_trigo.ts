import { PiDraw } from "../lib"

const { createApp, ref } = Vue

let draw
createApp({
    mounted() {
        // const parsedCode = PiDraw.parse(this.code)

        draw = new PiDraw(
            'root',
            {
                parameters: `axis,x=-12:12,y=-20:20,ppu=20`,
                code: this.code,
                tex: (value) => katex.renderToString(value, { throwOnError: false, displayMode: true }),
            }
        )

        // Extract only the parameters.
        // const parameters = result.map((item) => item.parameters)
        // console.table(parameters[2].label);

    },
    setup() {

        const code = ref(`@begin:static
O(0,0)
c=circ O,10
P0(10,0)
P1(8.67,5)->tex=\\frac{\\pi}{6}/mr/0.5;0
P2(7.07,7.07)->tex=\\frac{\\pi}{4}/mr/0.5;0.4
P3(5,8.67)->tex=\\frac{\\pi}{3}/tr/0.5;0
P4(0,10)->tex=\\frac{\\pi}{2}/tl/-0.5;0.2
P7(-8.67,5)->tex=\\frac{5\\pi}{6}/ml/-0.5;0
P6(-7.07,7.07)->tex=\\frac{3\\pi}{4}/ml/-0.5;0.4
P5(-5,8.67)->tex=\\frac{2\\pi}{3}/tl/-0.5;0
P8(-10,0)->tex=\\frac{3\\pi}{2}/tl/-0.5;0.3
P9(8.67,-5)->tex=\\frac{11\\pi}{6}/mr/0.5;0
P10(7.07,-7.07)->tex=\\frac{7\\pi}{4}/br/0.5;0
P311(5,-8.67)->tex=\\frac{5\\pi}{3}/br/0.5;0
P12(0,-10)->tex=\\frac{3\\pi}{2}/bl/-0.5;-0.3
P13(-8.67,-5)->tex=\\frac{7\\pi}{6}/ml/-0.5;0
P14(-7.07,-7.07)->tex=\\frac{5\\pi}{4}/bl/-0.5;0
P15(-5,-8.67)->tex=\\frac{4\\pi}{3}/bl/-0.5;0
T1(5,0)->tex=\\scriptsize\\frac{1}{2}/cb/0;-0.5
T2(7.07,0)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/cb/0;-0.5
T3(8.6,0)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/cb/0;-0.5
T4(10,0)->tex=\\scriptsize 1/rb/0.4;0
T5(0,5)->tex=\\scriptsize\\frac{1}{2}/rm/0.5;0
T6(0,7.07)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/rm/0.5;0
T7(0,8.6)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/rm/0.5;0
T9(0,10)->tex=\\scriptsize 1/rt/0.5;0
T11(-5,0)->tex=\\scriptsize-\\frac{1}{2}/cb/0;-0.5
T12(-7.07,0)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/cb/0;-0.5
T13(-8.6,0)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/cb/0;-0.5
T14(-10,0)->tex=\\scriptsize -1/lb/-0.4;0
T15(0,-5)->tex=\\scriptsize-\\frac{1}{2}/rm/0.5;0
T16(0,-7.07)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/rm/0.5;0
T17(0,-8.6)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/rm/0.5;0
T19(0,-10)->tex=\\scriptsize -1/rb/0.5;0
T(10,10)->hide
X1(10,5.77)->tex=\\scriptsize \\frac{\\sqrt{3}}{3}/mr/0.5;0
X2(10,10)->tex=\\scriptsize 1/mr/0.5;0
X3(10,17.3)->tex=\\scriptsize \\sqrt{3}/mr/0.5;0
X4(10,-5.77)->tex=\\scriptsize -\\frac{\\sqrt{3}}{3}/mr/0.5;0
X5(10,-10)->tex=\\scriptsize -1/mr/0.5;0
X6(10,-17.3)->tex=\\scriptsize -\\sqrt{3}/mr/0.5;0
t=TP0
@end:static
P(7.07,7.07)->drag=c
C=proj P,Ox->hide
S=proj P,Oy->hide
c=PC.->dash
s=PS.->dash
p0=PO->dot
p=PO.->w=3
c1=OC.->green,w=5
s1=OS.->red,w=5
a=arc P0,O,P,1->tex=\\theta/mc
T=inter p,t
t1=P0T.->gold,w=5`
        )

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
