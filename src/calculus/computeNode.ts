import type {XY} from "../pidraw.common"
import {nowhere} from "./geometry"

// The geometry of a node: the box that a point draws around its label. Everything is in pixels of the svg, from the center of the node,
// the y axis pointing down.

/** The shape of a node: a rectangle, a rectangle with rounded corners, a diamond or a circle. */
export type NodeShape = 'rect' | 'round' | 'diamond' | 'circle'

/** The shapes of a node. */
export const NODE_SHAPES: readonly NodeShape[] = ['rect', 'round', 'diamond', 'circle']

/** The places of a node that are named: top, middle or bottom, then left, center or right (the positions of a label). */
export type NodeAnchor = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'

/** The anchors of a node, in the order of reading. */
export const NODE_ANCHORS: readonly NodeAnchor[] = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']

/** The radius of the corners of a `round` node, in pixels, as long as the node is big enough for it. */
export const NODE_CORNER_RADIUS = 8

export interface INodeSize {
    width: number
    height: number
}

/**
 * The size of the node that holds a text.
 * @param text the size of the text.
 * @param padding the margin around the text, on each side.
 * @param minimum the smallest size of a node: a node without text is not a point. A circle keeps the biggest of the two.
 */
export function nodeSize(shape: NodeShape, text: INodeSize, padding: number, minimum: INodeSize): INodeSize {
    const box = {width: text.width + 2 * padding, height: text.height + 2 * padding}
    const size = {
        rect: box,
        round: box,
        // The box of the text is inscribed in the diamond: half of the width and half of the height of the box make the half diagonals.
        diamond: {width: 2 * box.width, height: 2 * box.height},
        // The corners of the box are on the circle.
        circle: {width: Math.hypot(box.width, box.height), height: Math.hypot(box.width, box.height)}
    }[shape]

    if (shape === 'circle') {
        const diameter = Math.max(size.width, minimum.width, minimum.height)

        return {width: diameter, height: diameter}
    }

    return {width: Math.max(size.width, minimum.width), height: Math.max(size.height, minimum.height)}
}

/** The radius of the corners of a node: the one of a `round` node, smaller if the node is not big enough, and 0 for the other shapes. */
export function nodeCornerRadius(shape: NodeShape, size: INodeSize): number {
    return shape === 'round' ? Math.min(NODE_CORNER_RADIUS, size.width / 2, size.height / 2) : 0
}

/** The vertices of a diamond of a size, from the center: top, right, bottom, left. */
export function diamondVertices(size: INodeSize): XY[] {
    const [a, b] = [size.width / 2, size.height / 2]

    return [{x: 0, y: -b}, {x: a, y: 0}, {x: 0, y: b}, {x: -a, y: 0}]
}

/**
 * The point of the border of a node that a half line from its center reaches, from the center.
 * @param direction where the half line goes; it does not need a length of 1. A direction that is null gives the center.
 */
export function nodeBoundary(shape: NodeShape, size: INodeSize, direction: XY): XY {
    const {x: dx, y: dy} = direction

    if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
        return nowhere()
    }

    if (dx === 0 && dy === 0) {
        return {x: 0, y: 0}
    }

    const [a, b] = [size.width / 2, size.height / 2]
    // How many times the direction fits before the border.
    const reach = {
        rect: () => Math.min(a / Math.abs(dx), b / Math.abs(dy)),
        round: () => roundReach(a, b, nodeCornerRadius(shape, size), direction),
        diamond: () => 1 / (Math.abs(dx) / a + Math.abs(dy) / b),
        circle: () => 1 / Math.hypot(dx / a, dy / b)
    }[shape]()

    return {x: dx * reach, y: dy * reach}
}

/** `reach` for a rectangle of half sides `a` and `b` with rounded corners of radius `r`. */
function roundReach(a: number, b: number, r: number, {x: dx, y: dy}: XY): number {
    const straight = Math.min(a / Math.abs(dx), b / Math.abs(dy))
    const [px, py] = [dx * straight, dy * straight]

    // On a side, away from the corners: the rectangle gives the point.
    if (Math.abs(px) <= a - r || Math.abs(py) <= b - r) {
        return straight
    }

    // In a corner: the point is where the half line leaves the circle of the corner.
    const [cx, cy] = [Math.sign(px) * (a - r), Math.sign(py) * (b - r)]
    const square = dx * dx + dy * dy
    const along = dx * cx + dy * cy

    return (along + Math.sqrt(along * along - square * (cx * cx + cy * cy - r * r))) / square
}

/** The direction, from the center, in which an anchor is: toward the corner of the box of the node, or the middle of its side. */
function anchorDirection(position: NodeAnchor, size: INodeSize): XY {
    const x = {l: -size.width / 2, c: 0, r: size.width / 2}[position[1] as 'l' | 'c' | 'r']
    const y = {t: -size.height / 2, m: 0, b: size.height / 2}[position[0] as 't' | 'm' | 'b']

    return {x, y}
}

/** The place of an anchor of a node, from its center: on the border, or the center for `mc`. */
export function nodeAnchor(shape: NodeShape, size: INodeSize, position: NodeAnchor): XY {
    return nodeBoundary(shape, size, anchorDirection(position, size))
}
