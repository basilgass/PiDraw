import type { XY } from "../pidraw.common";
export type NodeShape = 'rect' | 'round' | 'diamond' | 'circle';
export declare const NODE_SHAPES: readonly NodeShape[];
export type NodeAnchor = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
export declare const NODE_ANCHORS: readonly NodeAnchor[];
export declare const NODE_CORNER_RADIUS = 8;
export interface INodeSize {
    width: number;
    height: number;
}
export declare function nodeSize(shape: NodeShape, text: INodeSize, padding: number, minimum: INodeSize): INodeSize;
export declare function nodeCornerRadius(shape: NodeShape, size: INodeSize): number;
export declare function diamondVertices(size: INodeSize): XY[];
export declare function nodeBoundary(shape: NodeShape, size: INodeSize, direction: XY): XY;
export declare function nodeAnchor(shape: NodeShape, size: INodeSize, position: NodeAnchor): XY;
//# sourceMappingURL=computeNode.d.ts.map