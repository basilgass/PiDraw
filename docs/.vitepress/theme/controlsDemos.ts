/** A drawing for the page of the controls: with an animation, with a zoom, or both. */
export interface IControlsDemo {
    name: string
    /** What the demo shows, in a sentence. */
    about: string
    /** The parameters of the graph. */
    parameters: string
    code: string
    /** The zoom of the demo, as `new Zoom(graph, zoom)` makes it: none for a demo without. */
    zoom?: { allow?: 'both' | 'zoom' | 'move', gestures?: boolean }
    /** The presentation of the demo, as `new Slides(graph, slides)` makes it: none for a demo without. */
    slides?: { count?: number }
}

export const controlsDemos: IControlsDemo[] = [
    {
        name: 'A point on a segment',
        about: 'The point goes from A to B and back, slowly at both ends. The midpoint M follows it.',
        parameters: 'x=-1:9,y=-1:6,axis',
        code: [
            'A(1,1)->label',
            'B(7,4)->label',
            's=seg A,B->dash',
            'P(1,1)->animate,from=A,to=B,duration=3,easing=inOut,loop=reverse,red',
            'M=mid A,P->blue,label'
        ].join('\n')
    },
    {
        name: 'Two points, one after the other',
        about: 'The second point waits two seconds. Stop puts both back, Restart begins again.',
        parameters: 'x=-4:4,y=-4:4,axis',
        code: [
            'O(0,0)',
            'A(3,0)',
            'B(0,3)',
            'C(-3,0)',
            'P(3,0)->animate,from=A,to=B,duration=2,red',
            'Q(0,3)->animate,from=B,to=C,duration=2,delay=2,blue'
        ].join('\n')
    },
    {
        name: 'A construction that follows',
        about: 'A circle around the moving point P that goes through C, and a segment from P to C: everything built on P follows.',
        parameters: 'x=-2:10,y=-2:7,axis',
        code: [
            'A(1,1)->label',
            'B(7,1)->label',
            'P(1,1)->animate,from=A,to=B,duration=4,loop=reverse,red,label',
            'C(4,5)->label',
            'c=circ P,C->blue',
            's=seg P,C->dash'
        ].join('\n')
    },
    {
        name: 'A loop that starts again',
        about: 'The point goes back to its start at each end, without stopping. Pause it to look closely.',
        parameters: 'x=-4:4,y=-4:4,axis',
        code: [
            'A(-3,-2)->label',
            'B(3,2)->label',
            'P(-3,-2)->animate,from=A,to=B,duration=3,loop,green',
            's=seg A,P->green'
        ].join('\n')
    },
    {
        name: 'Zoom and move',
        about: 'Use the buttons, or the button Move / Zoom and then the mouse (drag, wheel) or two fingers (pinch). The points keep their place in the plane.',
        parameters: 'x=-7:7,y=-4:4,axis,grid',
        code: [
            'f(x)=sin(x)->blue',
            'A(1,1)->drag,label',
            'B(3,2)->drag,label',
            's=seg A,B->red'
        ].join('\n'),
        zoom: {gestures: true}
    },
    {
        name: 'Zoom only',
        about: 'The origin stays where it is: the zoom is always around it, and the drawing cannot be moved.',
        parameters: 'x=-7:7,y=-4:4,axis,grid',
        code: [
            'f(x)=x^2/4->blue',
            'A(2,1)->label',
            'c=circ A,1->red'
        ].join('\n'),
        zoom: {allow: 'zoom', gestures: true}
    },
    {
        name: 'Move only',
        about: 'The length of a unit never changes: the drawing can be moved, not zoomed.',
        parameters: 'x=-7:7,y=-4:4,axis,grid',
        code: [
            'f(x)=cos(x)->green',
            'A(0,1)->label',
            'B(3.14,-1)->label'
        ].join('\n'),
        zoom: {allow: 'move', gestures: true}
    },
    {
        name: 'An animation that can be zoomed',
        about: 'Play the animation, then zoom or move the drawing: the point goes on between the two points as they are now.',
        parameters: 'x=-6:6,y=-4:4,axis,grid',
        code: [
            'A(-4,-2)->label',
            'B(4,2)->label',
            's=seg A,B->dash',
            'P(-4,-2)->animate,from=A,to=B,duration=4,loop=reverse,red',
            'M=mid A,P->blue'
        ].join('\n'),
        zoom: {gestures: true}
    },
    {
        name: 'Step by step with @pause',
        about: 'Each @pause shows what follows one step later. Use the buttons under the drawing to go from a step to the next.',
        parameters: 'x=-1:7,y=-1:5,axis',
        code: [
            'A(1,1)->label',
            '@pause',
            'B(5,3)->label',
            's=seg A,B->red',
            '@pause',
            'M=mid A,B->blue,label'
        ].join('\n'),
        slides: {}
    },
    {
        name: 'Titles of the steps',
        about: 'A title after @pause names the step it opens, and @title,1= names the first one. The title of the step that is shown is under the drawing.',
        parameters: 'x=-1:7,y=-1:5,axis',
        code: [
            '@title,1=A point',
            'A(1,1)->label',
            '@pause=A second point and a segment',
            'B(5,3)->label',
            's=seg A,B->red',
            '@pause=The middle',
            'M=mid A,B->blue,label'
        ].join('\n'),
        slides: {}
    },
    {
        name: 'Two parts that go together',
        about: 'A second @slides starts again from the first step: both parts appear at their step 2 and 3, and the last point asks for the step 4.',
        parameters: 'x=-6:6,y=-4:4,axis',
        code: [
            '$ First part',
            '@slides',
            'A(-4,-2)->label',
            '@pause',
            'B(-2,0)->label',
            '@pause',
            'C(-4,2)->label',
            '$ Second part',
            '@slides',
            'D(3,-2)->label',
            '@pause',
            'E(1,0)->label',
            'F(3,2)->label,slide=<4>'
        ].join('\n'),
        slides: {}
    },
    {
        name: 'The steps of a figure',
        about: 'slide=<1-2> is shown at the steps 1 and 2, slide=<2-> from the step 2 on, slide=<3> at the step 3 only.',
        parameters: 'x=-4:4,y=-3:5,axis,grid',
        code: [
            'f(x)=x^2/4->blue,slide=<1-2>',
            'g(x)=x/2->red,slide=<2->',
            'A(2,1)->label,slide=<3>'
        ].join('\n'),
        slides: {}
    },
    {
        name: 'Steps, a zoom and an animation',
        about: 'Three controllers on the same graph that know nothing of each other: go to the step 2, zoom, and play the animation.',
        parameters: 'x=-6:6,y=-4:4,axis,grid',
        code: [
            'A(-4,-2)->label',
            'B(4,2)->label',
            's=seg A,B->dash',
            '@pause',
            'P(-4,-2)->animate,from=A,to=B,duration=4,loop=reverse,red',
            'M=mid A,P->blue'
        ].join('\n'),
        zoom: {gestures: true},
        slides: {}
    }
]
