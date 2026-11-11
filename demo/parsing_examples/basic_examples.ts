/** An example of the demo: the code, and the parameters of the graph it is drawn with (the default ones of the demo when absent). */
export interface IDemoExample {
    name: string
    code: string
    parameters?: string
}

/** The parameters of the graph for an example that gives none. */
export const DEFAULT_PARAMETERS = 'x=-11:11,y=-11:11,axis,grid,unitX=1.3'

export const basic_examples: IDemoExample[] = [
    {
        name: 'Drag on the grid',
        parameters: 'axis,grid,x=-5:5,y=-5:5',
        code: `A(0,0)->drag=grid
B(2,1)->drag=grid
d=AB`
    },
    {
        name: 'Overview of the constructions',
        code: `A(8,3)->red,w=5,drag=grid,tex=@
B(-4,-1)->blue,w=10
M=mid A,B
P1=proj A,Ox
P2=proj A,Oy
d=AB
e=line P1,P2
p=perp d,M
q=med A,M
C(1,-2)
p1=poly A,B,C->fill=teal/0.3,w=10
q=para d,C
f(x)=x^2*sin(x)/8
g(t)=t^2/4,sin(t)
c=circ A,3
a=arc C,B,A,1
d1=BC.
v1=vCA
X(0,0)->drag=f
`,
    },
    {
        name: 'Bisector and symmetries',
        code: `A(1,2)->drag=grid,tex=A=@/tr/1;3
B(2,0)->drag=grid
C(6,5)->drag=grid
b=bis B,A,C
T=sym B,A
K=sym B,b

A1=sym A,Ox
A2=sym A,Oy
l1=AK
l2=AT->ultrathick,blue
l3=TC
l4=BA2
I=inter l3,l4
X=dpt A2,l3,-2
Y=vpt A2,K,1,B`
    },
    {
        name: 'Bezier curve and its control points',
        code: `A(3,2)->drag
B(-4,4)->drag
C(-8,2)->drag
D(-10,5)->drag
b=bezier A,B,C,D
l1=AB.
l2=BC.
l3=CD.`,
    },
    {
        name: 'Circle intersections',
        code: `A(3,2)->tex=A,!,drag
c1=circ A,4
B(1,1)->drag
l=AB
X=inter c1,l->tex
P(-3,4)
d1=PX1
d2=PX2
c2=circ P,6
Y=inter c1,c2
Z=inter c2,l
j=Y1Y2->red,w=3`,
    },
    {
        name: 'Snap to points, centers, ends and middles',
        parameters: 'x=-10:12,y=-9:9,axis,grid',
        code: `A(-7,-4)->label
B(1,-4)->label
C(-3,2)->label
t=poly A,B,C->fill=teal/0.3
O(6,3)->label
c=circ O,2->blue
E(-8,5)->label
F(-2,7)->label
s=seg E,F->red
M(4,-4)->label
N(8,-4)
L(4,0)
a=arc N,M,L->green,w=3
P(0,0)->drag,snap=t/c/s/a,snapRadius=20,red,label`,
    },
    {
        name: 'Trigonometric circle',
        parameters: 'unitX=10,unitY=10,x=1.2,y=1.8,axis->range=-1.1:1.1',
        code: `
O(0,0)
c=circ O,1
P0(1,0)
P1(0.867,0.5)->tex=\\frac{\\pi}{6}/mr/0.05;0
P2(0.707,0.707)->tex=\\frac{\\pi}{4}/mr/0.05;0.04
P3(0.5,0.867)->tex=\\frac{\\pi}{3}/tr/0.05;0
P4(0,1)->tex=\\frac{\\pi}{2}/tl/-0.05;0.02
P7(-0.867,0.5)->tex=\\frac{5\\pi}{6}/ml/-0.05;0
P6(-0.707,0.707)->tex=\\frac{3\\pi}{4}/ml/-0.05;0.04
P5(-0.5,0.867)->tex=\\frac{2\\pi}{3}/tl/-0.05;0
P8(-1,0)->tex=\\frac{3\\pi}{2}/tl/-0.05;0.03
P9(0.867,-0.5)->tex=\\frac{11\\pi}{6}/mr/0.05;0
P10(0.707,-0.707)->tex=\\frac{7\\pi}{4}/br/0.05;0
P311(0.5,-0.867)->tex=\\frac{5\\pi}{3}/br/0.05;0
P12(0,-1)->tex=\\frac{3\\pi}{2}/bl/-0.05;-0.03
P13(-0.867,-0.5)->tex=\\frac{7\\pi}{6}/ml/-0.05;0
P14(-0.707,-0.707)->tex=\\frac{5\\pi}{4}/bl/-0.05;0
P15(-0.5,-0.867)->tex=\\frac{4\\pi}{3}/bl/-0.05;0
T1(0.5,0)->tex=\\scriptsize\\frac{1}{2}/bc/0;-0.05
T2(0.707,0)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/bc/0;-0.05
T3(0.86,0)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/bc/0;-0.05
T4(1,0)->tex=\\scriptsize 1/br/0.04;0
T5(0,0.5)->tex=\\scriptsize\\frac{1}{2}/mr/0.05;0
T6(0,0.707)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/mr/0.05;0
T7(0,0.86)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/mr/0.05;0
T9(0,1)->tex=\\scriptsize 1/tr/0.05;0
T11(-0.5,0)->tex=\\scriptsize-\\frac{1}{2}/bc/0;-0.05
T12(-0.707,0)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/bc/0;-0.05
T13(-0.86,0)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/bc/0;-0.05
T14(-1,0)->tex=\\scriptsize -1/bl/-0.04;0
T15(0,-0.5)->tex=\\scriptsize-\\frac{1}{2}/mr/0.05;0
T16(0,-0.707)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/mr/0.05;0
T17(0,-0.86)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/mr/0.05;0
T19(0,-1)->tex=\\scriptsize -1/br/0.05;0
T20(1,1)->hide
X1(1,0.577)->tex=\\scriptsize \\frac{\\sqrt{3}}{3}/mr/0.05;0
X2(1,1)->tex=\\scriptsize 1/mr/0.05;0
X3(1,1.73)->tex=\\scriptsize \\sqrt{3}/mr/0.05;0
X4(1,-0.577)->tex=\\scriptsize -\\frac{\\sqrt{3}}{3}/mr/0.05;0
X5(1,-1)->tex=\\scriptsize -1/mr/0.05;0
X6(1,-1.73)->tex=\\scriptsize -\\sqrt{3}/mr/0.05;0
t=T20P0
P(0.707,0.707)->drag=c
C=proj P,Ox->hide
S=proj P,Oy->hide
c=PC.->dash,tex=@
s=PS.->dash,tex=@
p0=PO->dot
p=PO.->w=3
c1=OC.->green,w=5
s1=OS.->red,w=5
a=arc P0,O,P,0.1->tex=\\theta/mc
T=inter p,t
t1=P0T.->gold,w=5,tex=@`,
    },
    {
        name: 'Area between curves',
        code: `f(x)=(x-3)(x+2)(x-1)/6
a=fill f,-2:1->fill=green/0.3
b=fill f,1:3->fill=red/0.3
A(-2,0)->tex=a
B(1,0)->tex=b
C(3,0)->tex=c`
    },
    {
        name: 'Animation of points',
        code: `A(1,2)
B(7,6)
d=AB.
X(1,2)->red,w=10,animate,from=A,to=B,duration=3,loop
Y(1,2)->green,w=10,animate,from=A,to=B,duration=5,loop=reverse
p=perp d,X`
    },
    {
        name: 'Vectors and markers',
        code: `A(-2,2)
B(3,4)
C(6,-4)
v=vAB
b=bezier A,B,C->mark=both/20,red`
    },
    {
        name: 'Function plots: tan (asymptotes) and ln',
        parameters: 'axis,grid,x=-5:5,y=-5:5',
        code: `f(x)=tan(x)
g(x)=ln(x)->red`
    },
    {
        name: 'Parabola through three points',
        code: `A(0,1)->drag=grid,tex
B(1,3)->drag=grid,tex
C(2,9)->drag=grid,tex
q=plot A,B,C`
    },
    {
        name: 'Animation with dynamic values',
        code: `f(x)=1/4(x+2)^2-5
g(x)=1/4(x+2)^2-5,-6:4->w=10,red
X0(-6,0)
X1(4,0)
X(-6,0)->animate,from=X0,to=X1,duration=6
Y=eval f,X.x->o=20
P=proj Y,Oy
p=YP.->mark=end
R0(0,-1)
R1(0,-5)
R2(0,4)
R(0,-1)->animate,from=R0,to=R1,duration=2
S(0,-5)->animate,from=R1,to=R2,duration=4,delay=2`
    },
    {
        name: 'Tangent to a curve at a dragged point',
        parameters: 'axis,grid',
        code: `f(x)=1/2x^2-3x+5
P(4,1)->drag=f
t=tan f,P`
    },
    {
        name: 'Static drawing: box with ribbons (cavalier projection)',
        parameters: 'x=-0.5:13,y=-0.5:7.5',
        code: `A(0,0)->hide
B(10,0)->hide
C(10,4)->hide
D(0,4)->hide
E(2,3)->hide
F(12,3)->hide
G(12,7)->hide
H(2,7)->hide
P1(2.7,0)->hide
P2(2.7,4)->hide
P3(4.7,7)->hide
P4(4.7,3)->hide
P5(3.5,0)->hide
P6(3.5,4)->hide
P7(5.5,7)->hide
P8(5.5,3)->hide
Q1(6.3,0)->hide
Q2(6.3,4)->hide
Q3(8.3,7)->hide
Q4(8.3,3)->hide
Q5(7.1,0)->hide
Q6(7.1,4)->hide
Q7(9.1,7)->hide
Q8(9.1,3)->hide
R1(0,1.4)->hide
R2(10,1.4)->hide
R3(12,4.4)->hide
R4(2,4.4)->hide
R5(0,2.1)->hide
R6(10,2.1)->hide
R7(12,5.1)->hide
R8(2,5.1)->hide
y1=poly P3,P7,P8,P4->fill=gray/0.2
y2=poly P4,P8,P5,P1->fill=gray/0.2
y3=poly Q3,Q7,Q8,Q4->fill=gray/0.2
y4=poly Q4,Q8,Q5,Q1->fill=gray/0.2
y5=poly R3,R4,R8,R7->fill=gray/0.2
y6=poly R4,R1,R5,R8->fill=gray/0.2
y7=poly P2,P6,P7,P3->fill=gray/0.3
y8=poly Q2,Q6,Q7,Q3->fill=gray/0.3
y9=poly R2,R3,R7,R6->fill=gray/0.3
z1=poly P1,P5,P6,P2->fill=gray/0.55
z2=poly Q1,Q5,Q6,Q2->fill=gray/0.55
z3=poly R1,R2,R6,R5->fill=gray/0.55
ae=AE.->dot
ef=EF.->dot
eh=EH.->dot
ab=AB.
bc=BC.
cd=CD.
da=DA.
dh=DH.
cg=CG.
bf=BF.
hg=HG.
gf=GF.`
    },
    {
        name: 'Label values: angles, areas and perimeters',
        parameters: 'x=-1:21,y=-5:7',
        code: `A(1,1)->drag=grid
B(7,1)->drag=grid
C(3,6)->drag=grid
s=seg A,B
t=seg A,C
a=arc B,A,C,1.5->label=@
b=arc B,A,C,*->dash,label=@.0
c=arc B,A,C,3.5->sector,fill=orange/0.3,label=@area
l=arc B,A,C,2.5->blue,label=@length
O(12,0)->drag=grid
c1=circ O,2->label=@area
d1=circ O,3->dash,label=@perimeter/tr
P(16,-2)->drag=grid
Q(20,-2)->drag=grid
R(18,2)->drag=grid
p=poly P,Q,R->fill=teal/0.3,label=@area
q=poly P,Q,R->!,label=@perimeter/br`
    },
    {
        name: 'Label values: slopes and lengths',
        parameters: 'axis,x=-1:9,y=-1:7',
        code: `A(0,0)->drag=grid
B(4,3)->drag=grid
C(8,1)->drag=grid
d=line A,B->tex=m=@slope
e=line B,C->tex=@slope.2/tl
s=seg A,C->color=green,label=@
t=seg B,C->color=red,label=@.1/tr`
    },
    {
        name: 'Label placement: pushed away from a figure',
        parameters: 'x=-6:8,y=-5:6',
        code: `O(0,0)->drag=grid
c=circ O,3
A(0,3)->drag=c,label=@/>O
B(3,0)->drag=c,label=@/>O/0.3
C(-2,-2)->drag=grid,label=@/ml/1
P(5,3)->drag=grid
Q(7,3)->drag=grid
R(6,5)->drag=grid
t=poly P,Q,R->fill=teal/0.3
S(6,3.5)->drag=t,label=@/>t
a=arc P,O,A,1.5->label=@
E(-5,-4)->tex=E,!
F(-2,-2)->tex
e=EF.->tex=h`
    },
    {
        name: 'Units and scale of the lengths',
        parameters: 'x=-1:7,y=-1:5,unit=mm,scale=10',
        code: `A(0,0)->drag=grid
B(4,0)->drag=grid
C(4,3)->drag=grid
s=seg A,C->label=@
t=poly A,B,C->fill=orange/0.3,label=@area
c=circ A,1->label=@radius
a=arc B,A,C,1.5->label=@`
    },
    {
        name: 'Buttons: show and hide the figures',
        parameters: 'x=-1:10,y=-1:10,axis,grid',
        code: `f(x)=x/3+6
g(x)=1/8(2x-8)^2+2
@button=between->title=Between f and g
@button=under_f->title=Under f
@button=under_g->title=Under g
a=fill f,g,1.05:7.6->fill=yellow/0.3,!,toggle=between/0.5
b=fill f,1.05:7.6->fill=green/0.3,!,toggle=under_f/1
c=fill g,1.05:7.6->fill=red/0.3,!,toggle=under_g/2
A(2,3)->drag=grid,label,toggle=under_g`
    },
    {
        name: 'Slides: a construction step by step',
        parameters: 'x=-1:7,y=-1:5,axis',
        code: `@title,1=A point
A(1,1)->label
@pause=A second point and a segment
B(5,3)->label
s=seg A,B->red
@pause=The middle
M=mid A,B->blue,label`
    },
    {
        name: 'Flowchart: nodes, edges and a loop',
        parameters: 'x=-1:11,y=-1:8',
        code: `S(1,6)->label=Start,node=round,fill=lightgreen
Q(5,6)->label=Done?,node=diamond,fill=lightyellow
W(5,2)->label=Work,node
E(9,6)->label=End,node=round,fill=lightgreen
a=edge S,Q->mark=end
b=edge Q,E->mark=end,tex=\\text{yes}/mc
c=edge Q,W->mark=end,label=no
d=edge W,W->mark=end,loopSide=r
t=seg W.ml,S.bc->mark=end,dash
M=mid W.ml,S.bc->red,label=M`
    },
    {
        name: 'Probability tree',
        parameters: 'x=-1:12,y=-1:9',
        code: `R(0.5,4)->label=Start,node=circle
A(5,6.5)->label=Red,node=round
B(5,1.5)->label=Blue,node=round
A1(10,7.5)->label=Red,node
A2(10,5.5)->label=Blue,node
B1(10,2.5)->label=Red,node
B2(10,0.5)->label=Blue,node
r=edge R,A->tex=\\frac{3}{5}/mc,labelSize=sm
s=edge R,B->tex=\\frac{2}{5}/mc,labelSize=sm
a1=edge A,A1->tex=\\frac{1}{2}/mc,labelSize=sm
a2=edge A,A2->tex=\\frac{1}{2}/mc,labelSize=sm
b1=edge B,B1->tex=\\frac{3}{4}/mc,labelSize=sm
b2=edge B,B2->tex=\\frac{1}{4}/mc,labelSize=sm`
    },
    {
        name: 'Markov graph: curves and loops',
        parameters: 'x=-1:9,y=-1:7',
        code: `A(1,3)->label=A,node=circle
B(6,5)->label=B,node=circle
C(6,1)->label=C,node=circle
ab=edge A,B->mark=end,curve=0.2,label=0.5
ba=edge B,A->mark=end,curve=0.2,label=0.3
bc=edge B,C->mark=end,curve=0.2,label=0.2
cb=edge C,B->mark=end,curve=0.2,label=0.4
ca=edge C,A->mark=end,label=0.6
aa=edge A,A->mark=end,loopSide=l,label=0.5
bb=edge B,B->mark=end,loopSide=t,label=0.5`
    }
]
