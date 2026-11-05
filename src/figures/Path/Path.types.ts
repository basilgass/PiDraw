/**
 * A path of the SVG, drawn as it is written: lines and curves from the data of an SVG path (`M 10 10 L 100 50 C ... A ... Z`).
 */
export interface IPathConfig {
    /**
     * The data of the path. An empty text is a path that draws nothing. The commands are those of the SVG (`M L H V C S Q T A Z`, in
     * capital letters for absolute positions and in small ones for relative positions).
     */
    d: string,
    /**
     * Whether the positions are in units of the coordinate system (as in a line of code) rather than in pixels. The path then follows
     * the coordinate system when it changes. Pixels by default.
     */
    units?: boolean
}
