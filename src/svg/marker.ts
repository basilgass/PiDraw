import type {Marker, Svg} from "@svgdotjs/svg.js"

/** The shapes of marker: an arrow, a cross and a bar. */
export const MARKER_SHAPES = ['->', 'x', '|']

function markerAttr(id: string, scale: number, ref?: { refX: number, refY: number }) {
    return {
        id,
        viewBox: `0 0 ${scale} ${scale}`,
        ...(ref ?? {refX: scale / 2, refY: scale / 2}),
        markerWidth: scale,
        markerHeight: scale,
        orient: 'auto-start-reverse',
        markerUnits: 'userSpaceOnUse'
    }
}

/**
 * The marker (arrow head, cross or bar) to put on the end of a line, created once per `id`, `scale` and `shape`:
 * asking again for the same marker returns the existing one.
 *
 * @param id name of the figure the marker is for.
 * @param shape `'x'` for a cross, `'|'` for a bar, anything else for an arrow.
 */
export function createMarker(svg: Svg, id: string, scale: number, shape = '->'): Marker {
    // The id of an svg element is used in a css selector: keep only the characters that are safe there.
    const safe = (value: string) => value.replace(/[^\w-]/g, '_')
    // The markers are in the defs: looking in the whole svg would cross every figure of the drawing.
    const getMarker = (markerId: string) => svg.defs().findOne(`#${markerId}`) as Marker | null

    if (shape === 'x') {
        const markerId = safe(`marker-x-${id}-${scale}`)
        return getMarker(markerId) ??
            svg.marker(scale, scale, add => {
                const p = add.path(`M0,0 L${scale},${scale} M${scale},0 L0,${scale}`)
                p.stroke({color: 'black', width: 1})
            }).attr(markerAttr(markerId, scale))
    }

    if (shape === '|') {
        const markerId = safe(`marker-bar-${id}-${scale}`)
        return getMarker(markerId) ??
            svg.marker(scale, scale, add => {
                const p = add.path(`M${scale / 2},${scale} L${scale / 2},0`)
                p.stroke({color: 'black', width: 1})
            }).attr(markerAttr(markerId, scale))
    }

    const markerId = safe(`marker-${id}-${scale}`)
    return getMarker(markerId) ??
        svg.marker(
            scale * 1.2,
            scale * 1.2,
            (add) => {
                const p = add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`)
                p.stroke({color: 'black', width: 1})
            }).attr(markerAttr(markerId, scale, {refX: scale, refY: scale / 2}))
}
