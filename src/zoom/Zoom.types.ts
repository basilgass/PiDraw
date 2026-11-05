import type {ViewWindow} from "../calculus/computeZoom"

export type {ViewWindow}

/**
 * What a {@link Zoom} may do with the part of the plane that the drawing shows:
 * - `both`: zoom and move;
 * - `zoom`: zoom only, always around the origin, which stays where it is;
 * - `move`: move only, the length of a unit never changes.
 */
export type ZoomAllow = 'both' | 'zoom' | 'move'

/** The names of the ways to allow a zoom, in the order of {@link ZoomAllow}. */
export const ZOOM_ALLOWS: readonly ZoomAllow[] = ['both', 'zoom', 'move']

/** What a zoom is made with. */
export interface IZoomOptions {
    /** What the zoom may do. `both` by default. */
    allow?: ZoomAllow
    /**
     * Whether the zoom may listen to the mouse and the fingers on the drawing: the wheel with Ctrl, and the mode of navigation (`navigating`),
     * where a drag moves and a wheel or a pinch zooms. `false` by default: the program (its buttons) is then the only one to act.
     */
    gestures?: boolean
}

/** The events of a zoom: the detail of each is what the type says. */
export interface IZoomEventMap {
    /** The part of the plane that the drawing shows changed (the zoom did it, or someone else changed the layout): the window now. */
    'change': ViewWindow
    /** The mode of navigation was entered (`true`) or left (`false`). */
    'navigation': boolean
}
