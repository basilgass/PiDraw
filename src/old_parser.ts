import { PiDraw } from '../lib/main.ts'


function autoParse() {
    let graph = new PiDraw('root'),
        axis = graph.axis(),
        construct

    graph.texConverter = {
        toTex: katex.renderToString,
        options: {
            throwOnError: false,
            displayMode: true
        }
    }

    construct = `x1=line y=0.1->hide
y1=line x=0.1->hide
x2=line y=-0.1->hide
y2=line x=-0.1->hide
O(0,0)
O1(0,0.1)->hide
O2(0,-0.1)->hide
O3(0.1,0)->hide
O4(-0.1,0)->hide
c=circ O,10
P(5,8.6)->drag:c,?
v=[OP]
P3=dpt O,v,10,p->hide
P2=sym P3,y2
C1=proj P,x1->?
C2=proj P2,x2->?
S1=proj P,y1->?
S2=proj P2,y2->?
cos=[O1C1]->ultrathick,green
cos2=[O2C2]->ultrathick,green,dash
sin=[O3S1]->ultrathick,red
sin2=[O4S2]->ultrathick,red,dash
v2=[OP2]
cs=[PC1]->dot,ultrathin
sn=[PS1]->dot,ultrathin
cs2=[P2C2]->dot,ultrathin
sn2=[P2S2]->dot,ultrathin
X(10,0)->hide
a=arc X,O,P,2->mark:end,$\\alpha
a2=arc X,O,P2,5->mark:end,$\\frac{\\pi}{2}-\\alpha/r
t=line x=10->ultrathin
T=inter v,t->?
T2=inter v2,t->?
tan=[XT]->ultrathick,orange
tan2=[XT2]->ultrathick,orange,dash
r=[OT[->ultrathin,dot
r2=[OT2[->ultrathin,dot`

    // construct = "A(3,2)\nc=circ A,4\nP(7,5)\nt=tan c,P"
    construct = "A(2,3)\n" +
        "B(5,6)->drag\n" +
        "C(A.x,7)\n" +
        "t=poly 8,B,A\n" +
        ""

    construct = "A(0,0)\n" +
        "B(20,0)\n" +
        "d=AB\n" +
        "X(18,0)->drag:d\n" +
        "e=AX\n" +
        "C=dpt X,e,A:X,p\n" +
        "e=AX->move/3,label:une ligne bien jolie"

    construct = "A(3,4)->tex\n" +
        "B(5,4)->label:hello world"

    construct = "f(x)=(x+2)*(x-2)^2/((x+1)*(x-3)^2),@300->blue\n" +
        "d1=line y=1->green\n" +
        "d2=line x=-1->red\n" +
        "d3=line x=3->red\n" +
        "A(2,0)->?"

    construct = "A(8,4)->drag:grid\n" +
        "O(0,0)\n" +
        "z=vOA->tex:z=@A.x+@A.y\\cdot i"
    construct = "A(-8,2)->drag\n" +
        "B(3,4)->drag\n" +
        "O(0,0)->drag\n" +
        "b=bezier A,B/v/0.6,O\n" +
        "a=arc A,O,B,1->tex:\\alpha\n" +
        "t=poly A,B,O->rotate:O/90"

    construct = `@begin:static
O(0,0)
c=circ O,10
P0(10,0)
P1(8.67,5)->tex:\\frac{\\pi}{6}/mr/0.5:0
P2(7.07,7.07)->tex:\\frac{\\pi}{4}/mr/0.5:0.4
P3(5,8.67)->tex:\\frac{\\pi}{3}/tr/0.5:0
P4(0,10)->tex:\\frac{\\pi}{2}/tl/-0.5:0.2
P7(-8.67,5)->tex:\\frac{5\\pi}{6}/ml/-0.5:0
P6(-7.07,7.07)->tex:\\frac{3\\pi}{4}/ml/-0.5:0.4
P5(-5,8.67)->tex:\\frac{2\\pi}{3}/tl/-0.5:0
P8(-10,0)->tex:\\frac{3\\pi}{2}/tl/-0.5:0.3
P9(8.67,-5)->tex:\\frac{11\\pi}{6}/mr/0.5:0
P10(7.07,-7.07)->tex:\\frac{7\\pi}{4}/br/0.5:0
P311(5,-8.67)->tex:\\frac{5\\pi}{3}/br/0.5:0
P12(0,-10)->tex:\\frac{3\\pi}{2}/bl/-0.5:-0.3
P13(-8.67,-5)->tex:\\frac{7\\pi}{6}/ml/-0.5:0
P14(-7.07,-7.07)->tex:\\frac{5\\pi}{4}/bl/-0.5:0
P15(-5,-8.67)->tex:\\frac{4\\pi}{3}/bl/-0.5:0
T1(5,0)->tex:\\scriptsize\\frac{1}{2}/cb/0:-0.5
T2(7.07,0)->tex:\\scriptsize\\frac{\\sqrt{2}}{2}/cb/0:-0.5
T3(8.6,0)->tex:\\scriptsize\\frac{\\sqrt{3}}{2}/cb/0:-0.5
T4(10,0)->tex:\\scriptsize 1/rb/0.4:0
T5(0,5)->tex:\\scriptsize\\frac{1}{2}/rm/0.5:0
T6(0,7.07)->tex:\\scriptsize\\frac{\\sqrt{2}}{2}/rm/0.5:0
T7(0,8.6)->tex:\\scriptsize\\frac{\\sqrt{3}}{2}/rm/0.5:0
T9(0,10)->tex:\\scriptsize 1/rt/0.5:0
T11(-5,0)->tex:\\scriptsize-\\frac{1}{2}/cb/0:-0.5
T12(-7.07,0)->tex:\\scriptsize-\\frac{\\sqrt{2}}{2}/cb/0:-0.5
T13(-8.6,0)->tex:\\scriptsize-\\frac{\\sqrt{3}}{2}/cb/0:-0.5
T14(-10,0)->tex:\\scriptsize -1/lb/-0.4:0
T15(0,-5)->tex:\\scriptsize-\\frac{1}{2}/rm/0.5:0
T16(0,-7.07)->tex:\\scriptsize-\\frac{\\sqrt{2}}{2}/rm/0.5:0
T17(0,-8.6)->tex:\\scriptsize-\\frac{\\sqrt{3}}{2}/rm/0.5:0
T19(0,-10)->tex:\\scriptsize -1/rb/0.5:0
T(10,10)->hide
X1(10,5.77)->tex:\\scriptsize \\frac{\\sqrt{3}}{3}/mr/0.5:
X2(10,10)->tex:\\scriptsize 1/mr/0.5:
X3(10,17.3)->tex:\\scriptsize \\sqrt{3}/mr/0.5:
X4(10,-5.77)->tex:\\scriptsize -\\frac{\\sqrt{3}}{3}/mr/0.5:
X5(10,-10)->tex:\\scriptsize -1/mr/0.5:
X6(10,-17.3)->tex:\\scriptsize -\\sqrt{3}/mr/0.5:
t=TP0
@end:static
P(7.07,7.07)->drag:c
C(P.x,0)->hide
S(0,P.y)->hide
c=PC.->dash
s=PS.->dash
p0=PO->dot
p=PO.->w:3
c1=OC.->green,w:5
s1=OS.->red,w:5
a=arc P0,O,P->tex:\\theta
T=inter p,t
t1=P0T.->gold,w:5`

    construct = `f(x)=1/4x^2-8
P(2,-7)->drag:f
Q(0,P.y)->trace:red/5`

    construct = `A(3,2)
c=circ A,4
P(2,4)->drag:c/in`

    construct = `f(x)=1/10x^2-1/2x+2->riemann:2/8/6
g=fill f,2:8->fill:red/0.2
A(2,0)->tex:2/bc,!
B(8,0)->tex:8/bc,!
d=AB.->move:0/-0.5,mark,tex:d=6/c`

    construct = "f(t)=sin(t),cos(t),0,2pi"
    // construct = "A(0,0)->tex:A_1=@\n" +
    // 	"B(3,4)\n"
    const parameters = 'grid,axis,x=-12:12,y=-12:12,nolabel',
        parser = graph.parse(construct, parameters)

    /**
     * // Add a resizeObserver on the root element
     * 		const root = document.getElementById('root')
     * 		const resizeObserver = new ResizeObserver(entries => {
     * 			parser.updateLayout(parameters)
     * 			parser.update(construct, true)
     * 		})
     * 		resizeObserver.observe(root)
     */
    return {
        construct,
        helper: graph.parseHelper,
        parameters,
        changeCaret() {
            // Get the caret postion
            const pos = document.getElementById("construct").selectionStart,
                lines = this.construct.split('\n'),
                lineIndex = this.construct.substring(0, pos).split('\n').length - 1

            const line = lines[lineIndex]
        },
        build() {
            parser.update(this.construct)
        },
        modify() {
            // Get the parameters.
            parser.updateLayout(this.parameters)
        },
        logKeys() {
            console.log(parser.getParserKeys(this.construct))
        }
    }
}