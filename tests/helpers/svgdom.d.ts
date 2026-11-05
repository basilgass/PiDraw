// svgdom ships no types: only what the tests use.
declare module 'svgdom' {
    export function createSVGWindow(): Window & { document: Document }
}
