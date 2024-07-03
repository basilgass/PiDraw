import { PiDraw } from "../lib/main"



const { createApp, ref } = Vue

createApp({
    mounted: () => {
        const draw = new PiDraw.Graph('root')

        // for (let i = 0; i < 4; i++) {
        //     for (let j = 0; j < 4; j++) {
        //         draw.create.point({ x: i, y: j }, `helper_${i}-${j}`)
        //             .asCircle().stroke('red', 2)
        //     }
        // }
        const pt = draw.create.point({ x: 1, y: -2 }, 'A')
        const pt2 = draw.create.point({ x: 2, y: 3 }, 'B').asCircle(20)
        draw.draggable(pt2)

        const pt_middle = draw.create.point({
            middle: { A: pt, B: pt2 }
        }, 'MIDDLE').asCrosshair()

        const projY = draw.create.point({
            projection: { axis: 'y', point: pt2 }
        }, 'C')

        const projX = draw.create.point({
            projection: { axis: 'x', point: pt2 }
        }, 'D')

        const line = draw.create.line({
            through: { A: pt, B: pt2 },
        }, 'AB')


        const parallel = draw.create.line({
            parallel: { to: line, through: projX }
        }, 'AB2').stroke('green', 2)

        const perp = draw.create.line({
            perpendicular: { to: line, through: projY }
        }, 'AB3').stroke('red', 2)

        const med = draw.create.line({
            mediator: { A: pt, B: pt2 }
        }, 'AB4').stroke('purple', 2)


        const perp_parallel_intersection = draw.create.point({
            intersection: { A: perp, B: parallel },
        }, 'E').asSquare(20).stroke('blue', 2)
        pt.asCrosshair(10).stroke('blue', 2)

        const fx = draw.create.plot({
            expression: 'x^2*sin(x)/8',
            samples: 500
        }, 'fx')
            .stroke('orange', 2)

        const c1 = draw.create.circle(
            {
                radius: 2,
                center: pt2
            },
            'c1')

        const c2 = draw.create.circle({
            center: pt,
            radius: pt2
        }, 'c2')

        const c3 = draw.create.circle({
            center: pt,
            radius: 3
        }, 'c3')

        const pCircle = draw.create.point({
            x: -2, y: -2
        }, 'pC').asCircle(10)
        draw.draggable(pCircle, { follow: c3 })

        const pProjLine = draw.create.point({
            projection: { axis: parallel, point: pt }
        }, 'pL').asSquare(40).fill('pink')


        const poly = draw.create.polygon({
            vertices: [pt, projX, pt2, projY],
        }, 'poly').fill('green/0.3').stroke('black', 2)

        const regularPolygon = draw.create.polygon(
            {
                regular: {
                    center: pt,
                    sides: 7,
                    radius: pt2
                }
            },
            'rpoly')

        const arc = draw.create.arc({
            center: pt,
            start: pt2,
            end: pCircle,
            radius: 2
        }, 'arc')
        arc.mark(true)
        arc.addLabel('angle', true)
        // arc.label?.position('tl')
        // pt.coordinates = { x: 2, y: 3 }
    },
    setup() {
        const code = ref('')
        const params = ref('')

        const message = ref("no message now")
        return {
            code,
            params,
            message,
            modify: () => {
                console.log('modify', params.value);
            },
            update: () => {
                console.log('- update - ')
                console.log(code.value);
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
