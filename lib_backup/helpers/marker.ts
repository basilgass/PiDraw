import { Svg } from "@svgdotjs/svg.js"
import { Marker } from "@svgdotjs/svg.js"

export function createMarker(svg: Svg, scale: number): { start: Marker, end: Marker } {
    return {
        start: svg.marker(
            scale * 1.2,
            scale * 1.2,
            function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180)
            }).ref(0, scale / 2),
        end: svg.marker(
            scale + 5,
            scale + 5,
            function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`)
            }).ref(scale, scale / 2)
    }
}