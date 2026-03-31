# Documentation du parser PiDraw

## Syntaxe générale

```
<id>=<clé> <param1>,<param2>,...-><option1>/<valeur>-><option2>
```

Formes raccourcies disponibles :

| Forme | Équivalent | Description |
|---|---|---|
| `A(3,4)` | `A=pt 3,4` | Point fixe |
| `d=AB` | `d=line A,B` | Droite par A et B |
| `d=AB.` ou `d=[AB]` | `d=seg A,B` | Segment |
| `d=[AB[` ou `d=AB[` | `d=ray A,B` | Demi-droite |
| `d=vAB` | `d=vec A,B` | Vecteur |
| `f(x)=x^2` | `f=plot x^2` | Fonction f(x) |

---

## Paramètres communs

Ces paramètres s'appliquent à toutes les figures. Ils sont ajoutés après `->`.

### Apparence

| Paramètre | Description |
|---|---|
| `w:<nombre>` | Épaisseur du trait |
| `ultrathin` | Trait très fin (0.5) |
| `thin` | Trait fin (0.75) |
| `thick` | Trait épais (2.5) |
| `ultrathick` | Trait très épais (4) |
| `color:<couleur>` | Couleur du trait |
| `color:<couleur>/<opacité>` | Couleur du trait avec opacité |
| `fill:<couleur>` | Couleur de remplissage |
| `fill:<couleur>/<opacité>` | Couleur de remplissage avec opacité |
| `dash` | Trait en pointillés (motif par défaut) |
| `dash:<motif>` | Trait en pointillés avec motif personnalisé |
| `dot` | Trait en points |
| `mark` | Marqueur sur la figure |

### Visibilité

| Paramètre | Description |
|---|---|
| `hide` | Cache la figure et le label |
| `!` | Cache la figure, garde le label |
| `?` | Cache le label, garde la figure |
| `_` ou `static` | Figure statique (pas de mise à jour) |

### Labels

```
label:<texte>/<position>/<offset>/<rotation>
tex:<texte>/<position>/<offset>/<rotation>
```

- `label` — ajoute un label texte
- `tex` — ajoute un label TeX

Positions disponibles : `br`, `bl`, `tr`, `tl`, `r`, `l`, `t`, `b`

### Déplacement et mise à l'échelle

| Paramètre | Description |
|---|---|
| `move:<XY>` | Déplace la figure |
| `scale:<XY>` | Met à l'échelle |

### Animation

| Paramètre | Description |
|---|---|
| `animate` | Active l'animation |
| `from:<point>` | Point de départ |
| `to:<point>` | Point d'arrivée |
| `duration:<secondes>` | Durée de l'animation |
| `delay:<secondes>` | Délai avant démarrage |
| `easing:linear` | Interpolation linéaire |
| `easing:inOut` | Interpolation ease in/out |
| `loop` | Boucle l'animation |

### Couleurs disponibles

`black`, `white`, `red`, `green`, `blue`, `cyan`, `magenta`, `yellow`, `gray`, `grey`, `darkgray`, `darkgrey`, `lightgray`, `lightgrey`, `brown`, `lime`, `olive`, `orange`, `pink`, `purple`, `teal`, `gold`

---

## Figures

### Points

#### `pt` — Point fixe

**Syntaxe :**
```
A(x,y)
A=pt x,y
```

Les coordonnées peuvent référencer un autre point : `A.x` (abscisse de A), `A.y` (ordonnée de A).

**Paramètres spécifiques :**

| Paramètre | Description |
|---|---|
| `o` ou `o:<taille>` | Forme cercle (défaut, taille 5) |
| `s` ou `s:<taille>` | Forme carré (taille 10) |
| `*` ou `*:<taille>` | Forme croix (taille 10) |
| `drag` | Rend le point déplaçable |
| `drag=grid` | Contraint à la grille |
| `drag=Ox` | Contraint à l'axe x |
| `drag=Oy` | Contraint à l'axe y |
| `drag=<figure>` | Contraint à suivre une figure (ex : un plot) |
| `drag=<domaine>` | Contraint à un domaine |

**Exemples :**
```
A(3,4)
B(-1,2)->o/8->color=red
C(A.x,0)->drag=Ox
```

---

#### `mid` — Milieu

**Syntaxe :**
```
M=mid A,B
```

Crée le point milieu de A et B.

**Exemple :**
```
M=mid A,B
```

---

#### `proj` — Projection

**Syntaxe :**
```
H=proj A,d
H=proj A,Ox
H=proj A,Oy
```

Projette le point A sur la droite d, ou sur un axe.

**Exemple :**
```
H=proj A,d
```

---

#### `sym` — Symétrie

**Syntaxe :**
```
Ap=sym A,B    (symétrie par rapport au point B)
Ap=sym A,d    (symétrie par rapport à la droite d)
Ap=sym A,Ox   (symétrie par rapport à l'axe Ox)
```

**Exemple :**
```
Ap=sym A,d
```

---

#### `dpt` — Point à distance sur une direction

**Syntaxe :**
```
P=dpt A,d,distance,perpendiculaire?
```

Crée un point à `distance` de A dans la direction de d. Si un 4e argument est présent, la direction devient perpendiculaire.

**Exemple :**
```
P=dpt A,d,3
```

---

#### `vpt` — Point depuis un vecteur

**Syntaxe :**
```
P=vpt A,B,scale?,depart?
```

Crée un point en suivant le vecteur AB, à partir du point `depart` (défaut : A), avec un facteur `scale` (défaut : 1).

**Exemple :**
```
P=vpt A,B,2,C
```

---

#### `eval` — Évaluation de fonction

**Syntaxe :**
```
P=eval f,x
```

Crée le point (x, f(x)) sur la courbe f.

**Exemple :**
```
P=eval f,2
```

---

#### `inter` — Intersection

**Syntaxe :**
```
P=inter fig1,fig2
```

| Combinaison | Résultat |
|---|---|
| Droite + droite | 1 point |
| Cercle + droite | 2 points |
| Cercle + cercle | 2 points |

Fonctionne aussi avec les axes `Ox` et `Oy`.

**Exemples :**
```
P=inter d1,d2
P=inter c,d
```

---

### Lignes

#### `line` — Droite

**Syntaxe :**
```
d=AB
d=line A,B
```

**Exemple :**
```
d=AB->dash
```

---

#### `seg` — Segment

**Syntaxe :**
```
s=AB.
s=[AB]
s=seg A,B
```

**Exemple :**
```
s=AB.
```

---

#### `ray` — Demi-droite

**Syntaxe :**
```
r=AB[
r=[AB[
r=ray A,B
```

**Exemple :**
```
r=AB[
```

---

#### `vec` — Vecteur

**Syntaxe :**
```
v=vAB
v=vec A,B
```

**Exemple :**
```
v=vAB->color=blue
```

---

#### `perp` — Perpendiculaire

**Syntaxe :**
```
p=perp d,A
```

Droite perpendiculaire à d passant par A.

**Exemple :**
```
p=perp d,A
```

---

#### `para` — Parallèle

**Syntaxe :**
```
p=para d,A
```

Droite parallèle à d passant par A.

**Exemple :**
```
p=para d,A
```

---

#### `med` — Médiatrice

**Syntaxe :**
```
m=med A,B
```

Médiatrice du segment AB.

**Exemple :**
```
m=med A,B
```

---

#### `tan` — Tangente

**Syntaxe :**
```
t=tan f,A
```

Tangente à la courbe f au point A.

**Exemple :**
```
t=tan f,A
```

---

#### `bis` — Bissectrice

**Syntaxe :**
```
b=bis d1,d2          (bissectrice de deux droites)
b=bis B,A,C          (bissectrice de l'angle BAC, sommet en A)
```

**Exemple :**
```
b=bis d1,d2
```

---

### Cercles

#### `circ` — Cercle

**Syntaxe :**
```
c=circ O,r
```

`r` peut être un nombre (rayon) ou un point situé sur le cercle.

**Exemples :**
```
c=circ O,3
c=circ O,A
```

---

#### `arc` — Arc

**Syntaxe :**
```
a=arc debut,centre,fin,rayon?
```

**Paramètres spécifiques :**

| Paramètre | Description |
|---|---|
| `sector` | Affiche en secteur (rempli) |
| `square` | Affiche en équerre (angle droit) |
| `acute` | Force l'angle aigu |

**Exemples :**
```
a=arc B,A,C
a=arc B,A,C->sector->fill=blue/0.3
```

---

### Fonctions et courbes

#### `plot` — Fonction f(x)

**Syntaxe :**
```
f(x)=<expression>
f(x)=<expression>@samples,domaine,image
f=plot <expression>,@samples,domaine,image
```

| Paramètre | Description |
|---|---|
| `@samples` | Nombre d'échantillons pour la passe initiale (entier) |
| `domaine` | Intervalle x sous la forme `min:max` |
| `image` | Contrainte sur y sous la forme `min:max` |

**Exemples :**
```
f(x)=x^2
f(x)=sin(x)@50,-3:3,-2:2
g=plot x^2+1
```

---

#### `quad` — Parabole par 3 points

**Syntaxe :**
```
f=quad A,B,C
```

Construit la parabole passant par les 3 points A, B et C.

**Exemple :**
```
f=quad A,B,C
```

---

#### `parametric` — Courbe paramétrique

**Syntaxe :**
```
f(t)=<expr_x>,<expr_y>
f=parametric <expr_x>,<expr_y>,domaine
```

**Exemple :**
```
f(t)=cos(t),sin(t)
```

---

#### `bezier` — Courbe de Bézier

**Syntaxe :**
```
b=bezier A/<ctrl>/<ratio>,B/<ctrl>/<ratio>,...
```

**Contrôles disponibles :**

| Contrôle | Description |
|---|---|
| `S` (ou absent) | Smooth (défaut) |
| `H` | Horizontal |
| `V` | Vertical |

`ratio` — facteur de courbure (défaut : 0.2)

**Exemple :**
```
b=bezier A,B/H,C/V/0.4,D
```

---

#### `follow` — Point et tangente mobiles

**Syntaxe :**
```
t=follow f
t=follow f,show
```

Crée un point interactif qui suit la courbe f. L'option `show` affiche également la tangente en ce point.

**Exemple :**
```
t=follow f,show
```

---

#### `fill` — Aire entre courbes

**Syntaxe :**
```
z=fill f1,f2?,domaine?,image?
```

Remplit l'aire entre f1 et f2. Si f2 est absent, l'aire est calculée entre f1 et l'axe x. Le domaine et l'image sont optionnels.

**Exemples :**
```
z=fill f,g,0:3
z=fill f,0:5->fill=blue/0.3
```

---

#### `riemann` — Somme de Riemann

**Syntaxe :**
```
r=riemann f,domaine,n,position
```

| Paramètre | Description |
|---|---|
| `domaine` | Intervalle sous la forme `min:max` |
| `n` | Nombre de rectangles (défaut : 5) |
| `position` | `-1` gauche, `0` milieu, `1` droite |

**Exemple :**
```
r=riemann f,0:4,10,0->fill=green/0.4
```

---

### Polygones

#### `poly` — Polygone

**Syntaxe :**
```
p=poly A,B,C,...
```

Au moins 2 points requis.

**Exemple :**
```
p=poly A,B,C,D->fill=yellow/0.3
```

---

#### `reg` — Polygone régulier

**Syntaxe :**
```
p=reg centre,rayon,n
```

| Paramètre | Description |
|---|---|
| `centre` | Point centre du cercle circonscrit |
| `rayon` | Nombre ou point sur le cercle circonscrit |
| `n` | Nombre de côtés |

**Exemples :**
```
p=reg O,3,6
p=reg O,A,5
```
