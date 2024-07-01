import { PiDraw } from "../lib/main"



const { createApp, ref } = Vue

createApp({
    mounted: () => {
        const draw = new PiDraw.graph('root')

        const pos = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']

        // Regulat text label
        pos.forEach((item, index) => {
            const pt = draw.create.point({ x: -3 + 3 * (index % 3), y: 4 - Math.trunc(index / 3) }, item)
            pt.label?.position(item)

        })

        // HTML label
        pos.forEach((item, index) => {
            const pt = draw.create.point(
                { x: -3 + 3 * (index % 3), y: -1 - Math.trunc(index / 3) },
                item,
                { create: true, html: true }
            )
            pt.label?.setLabel('hello world')
            pt.label?.position(item)

        })

    },
    setup() {
        const message = ref("no message now")
        return {
            message,
            modify: () => {
                console.log('modify')
            },
            update: () => {
                console.log('update');
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
