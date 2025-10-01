export const basic_examples = [
    {
        name: 'basic_example_1',
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
p1=poly A,B,C->fill=teal/0.3,red/0.5,w=10
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
        name: 'basic_example_2',
        code: `A(1,2)->drag=grid,tex=A=@/tr/1;3}
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
Y=vpt A2,K,B,1`
    },
    {
        name: 'bezier curve',
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
        name: 'segment labeling',
        code: `A(3,2)->tex=A,!\nB(6,8)->tex\nd=AB.->tex=h`,
    },
    {
        name: 'circle intersections',
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
        name: 'trigonometric circle (with static code)',
        code: `@begin:static
O(0,0)
c=circ O,10
P0(10,0)
P1(8.67,5)->tex=\\frac{\\pi}{6}/mr/0.5;0
P2(7.07,7.07)->tex=\\frac{\\pi}{4}/mr/0.5;0.4
P3(5,8.67)->tex=\\frac{\\pi}{3}/tr/0.5;0
P4(0,10)->tex=\\frac{\\pi}{2}/tl/-0.5;0.2
P7(-8.67,5)->tex=\\frac{5\\pi}{6}/ml/-0.5;0
P6(-7.07,7.07)->tex=\\frac{3\\pi}{4}/ml/-0.5;0.4
P5(-5,8.67)->tex=\\frac{2\\pi}{3}/tl/-0.5;0
P8(-10,0)->tex=\\frac{3\\pi}{2}/tl/-0.5;0.3
P9(8.67,-5)->tex=\\frac{11\\pi}{6}/mr/0.5;0
P10(7.07,-7.07)->tex=\\frac{7\\pi}{4}/br/0.5;0
P311(5,-8.67)->tex=\\frac{5\\pi}{3}/br/0.5;0
P12(0,-10)->tex=\\frac{3\\pi}{2}/bl/-0.5;-0.3
P13(-8.67,-5)->tex=\\frac{7\\pi}{6}/ml/-0.5;0
P14(-7.07,-7.07)->tex=\\frac{5\\pi}{4}/bl/-0.5;0
P15(-5,-8.67)->tex=\\frac{4\\pi}{3}/bl/-0.5;0
T1(5,0)->tex=\\scriptsize\\frac{1}{2}/cb/0;-0.5
T2(7.07,0)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/cb/0;-0.5
T3(8.6,0)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/cb/0;-0.5
T4(10,0)->tex=\\scriptsize 1/rb/0.4;0
T5(0,5)->tex=\\scriptsize\\frac{1}{2}/rm/0.5;0
T6(0,7.07)->tex=\\scriptsize\\frac{\\sqrt{2}}{2}/rm/0.5;0
T7(0,8.6)->tex=\\scriptsize\\frac{\\sqrt{3}}{2}/rm/0.5;0
T9(0,10)->tex=\\scriptsize 1/rt/0.5;0
T11(-5,0)->tex=\\scriptsize-\\frac{1}{2}/cb/0;-0.5
T12(-7.07,0)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/cb/0;-0.5
T13(-8.6,0)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/cb/0;-0.5
T14(-10,0)->tex=\\scriptsize -1/lb/-0.4;0
T15(0,-5)->tex=\\scriptsize-\\frac{1}{2}/rm/0.5;0
T16(0,-7.07)->tex=\\scriptsize-\\frac{\\sqrt{2}}{2}/rm/0.5;0
T17(0,-8.6)->tex=\\scriptsize-\\frac{\\sqrt{3}}{2}/rm/0.5;0
T19(0,-10)->tex=\\scriptsize -1/rb/0.5;0
T20(10,10)->hide
X1(10,5.77)->tex=\\scriptsize \\frac{\\sqrt{3}}{3}/mr/0.5;0
X2(10,10)->tex=\\scriptsize 1/mr/0.5;0
X3(10,17.3)->tex=\\scriptsize \\sqrt{3}/mr/0.5;0
X4(10,-5.77)->tex=\\scriptsize -\\frac{\\sqrt{3}}{3}/mr/0.5;0
X5(10,-10)->tex=\\scriptsize -1/mr/0.5;0
X6(10,-17.3)->tex=\\scriptsize -\\sqrt{3}/mr/0.5;0
t=T20P0
@end:static
P(7.07,7.07)->drag=c
C=proj P,Ox->hide
S=proj P,Oy->hide
c=PC.->dash
s=PS.->dash
p0=PO->dot
p=PO.->w=3
c1=OC.->green,w=5
s1=OS.->red,w=5
a=arc P0,O,P,1->tex=\\theta/mc
T=inter p,t
t1=P0T.->gold,w=5`,
    },
    {
        name: 'ara fill',
        code: `f(x)=(x-3)(x+2)(x-1)/6
a=fill f,-2:1->fill=green/0.3
b=fill f,1:3->fill=red/0.3
A(-2,0)->tick,tex=a
B(1,0)->tick,tex=b
C(3,0)->tick,tex=c`
    },{
    name: 'animation',
        code: `A(1,2)
B(7,6)
d=AB.
X(1,2)->red,w=10,animate,from=A,to=B,duration=3,loop
Y(1,2)->green,w=10,animate,from=A,to=B,duration=5,loop=reverse
p=perp d,X`
    },
    {
        name: 'vectors and markers',
        code: `A(-2,2)
B(3,4)
v=vAB`
    }
]