# Documentation du parser PiDraw

## Syntaxe générale

```
<id>=<clé> <valeur1>,<valeur2>,...-><option1>=<valeur>/<param1>/<param2>,<option2>,...
```

Un seul `->` sépare la définition de la figure de ses options, et les options sont séparées par des virgules. Une option s'écrit
`clé=valeur/param1/param2` ; la valeur et les paramètres sont facultatifs (`dash`, `o=8`, `label=A/tl`). Écrire plusieurs `->`
n'est pas pris en compte : seules les options de la première flèche sont lues.

Exemple : `A=pt 3,4->o=8,color=red,label=A/tl`.

Un dernier argument `*` choisit la **forme alternative** de la construction (seul `*` convient, toute autre valeur est une erreur) :

| Ligne | Sans `*` | Avec `*` |
|---|---|---|
| `c=circ A,B,C` | cercle circonscrit | `c=circ A,B,C,*` : cercle inscrit |
| `P=dpt A,d,3` | le long de `d` | `P=dpt A,d,3,*` : perpendiculaire à `d` |
| `b=bis d1,d2` | bissectrice des directions sommées | `b=bis d1,d2,*` : l'autre bissectrice |
| `a=arc B,A,C` | l'angle BAC, dans le sens trigonométrique | `a=arc B,A,C,*` : l'autre arc, dans le sens inverse |
| `b=bezier A,B,C,D` | la courbe lisse **par** les points | `b=bezier A,B,C,D,*` : la courbe **tirée** par les points de contrôle |
| `t=follow f` | le point seul | `t=follow f,*` : avec la tangente |

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

## Paramètres du graphe

Ces entrées règlent ce que le graphe montre. Elles s'écrivent dans `parameters` (le premier champ de `Draw`), séparées par des virgules,
toutes facultatives : `x=-10:10,y=-8:8,axis,grid`.

### La fenêtre et l'échelle

| Entrée | Description |
|---|---|
| `x=min:max`, `y=min:max` | La partie du repère qui est dessinée, en unités (défaut −8:8). Une borne peut s'écrire avec `pi` : `x=-2pi:2pi` |
| `x=6`, `y=4` | Pour `x=-6:6`, `y=-4:4` |
| `box=5` | Pour `x=-5:5,y=-5:5`. `box=8;6` donne `x=-8:8,y=-6:6`, et `box=-3:7` le même intervalle pour les deux. `x` et `y` précisent `box` |
| `unitX=2`, `unitY=3` | La longueur d'une unité de chaque axe, **en cm** (défaut 1). Seul `unitX` vaut pour les deux axes ; `unitY` seul laisse `unitX` à 1 |

Le dessin a sa **taille réelle** : `dx · unitX` cm de large et `dy · unitY` cm de haut. Il ne dépend ni de la page ni de sa largeur, et il est
affiché à cette taille, ou réduit à la largeur de la page quand il est plus large. La fenêtre peut changer sans que la longueur d'une unité,
l'épaisseur des traits ou la taille des points changent. Dans l'export TikZ, une unité est exactement `unitX` cm (1 cm = 28,45 pt).

### Les axes et la grille

Les axes du graphe s'appellent `Ox` et `Oy` : ce sont des droites comme les autres, que le graphe les montre ou non, et on peut les nommer dans toute construction
(`P=inter d,Ox`, `H=proj A,Oy`, `p=perp Ox,A`, `c=circ O,Ox`, `b=bis Ox,d`), même quand ils sont obliques. Ces deux noms sont réservés : une figure ne peut pas les porter.
Pour le glisser-déposer, `drag=Ox` et `drag=Oy` gardent leur sens (se déplacer parallèlement à l'axe).

| Entrée | Description |
|---|---|
| `axis` | Montre les axes `Ox` et `Oy` (une flèche à leur bout, à 20 pixels des bords). Sans lui ils existent, mais ne sont pas dessinés |
| `axisX`, `axisY` | Montre seulement cet axe |
| `axis=1`, `axis=0.5`, `axis=pi`, `axis=pi/3` | Gradue les axes : un repère et un nombre tous les `pas` unités, à partir de 0. Avec un pas en π, l'axe des x écrit des fractions de π (`π/2`, `3π/2`, `-π`) et l'axe des y garde un pas de 1. `axisX=…` et `axisY=…` précisent un axe |
| `axisXname=x`, `axisYname=y` | Le nom écrit au bout de l'axe, du côté sans nombres ; l'axe est montré |
| `grid` | La grille : une ligne par unité sur chaque axe |
| `grid=0.5` | Un pas de 0,5 sur les deux axes |
| `grid=pi`, `grid=2pi`, `grid=pi/3` | Un pas de π/2, 2π/2, π/3 sur l'axe des x (le dénominateur est le paramètre, 2 par défaut), de 1 sur l'axe des y |
| `gridX=2`, `gridY=0.5` | Le pas d'un axe ; l'autre garde la valeur de `grid`, ou 1 |

Les lignes d'une grille qui seraient à moins de 3 pixels l'une de l'autre ne sont pas dessinées (une grille trop fine pour l'échelle).

Les nombres de l'axe des x sont sous l'axe, ceux de l'axe des y à sa gauche, sans le 0 (il est à l'autre axe). Quand l'origine est hors de la fenêtre (`x=2:10`), l'axe
qui devrait être dehors est dessiné **au bord le plus proche** (à 2 pixels), avec ses nombres vers l'intérieur : les graduations restent celles du repère (`2`, `3`, `4`…).
Ce n'est fait que pour des axes orthogonaux. Des repères à moins de 4 pixels l'un de l'autre ne sont pas
dessinés ; à moins de 36 pixels, un nombre sur deux, trois… est écrit pour qu'ils ne se touchent pas. Aucun repère n'est dessiné tout contre la flèche. Les nombres et le
nom ont la couleur de l'axe (`axis->red`).

Les options `ticks`, `numbers` et `padding` d'une entrée `axis`, `axisX` ou `axisY` règlent la graduation (les autres options en sont le style) :

| Option | Description |
|---|---|
| `ticks=n` | Seuls les repères d'indice multiple de `n` sont dessinés (`ticks=5` : un sur cinq) ; l'indice est 0 au zéro, 1 au premier repère... |
| `ticks=first` | Seul le premier repère après le zéro (l'unité) : le repère (O, I, J) |
| `ticks=n/first` | Les multiples de `n` **et** le premier repère |
| `numbers=n`, `numbers=first`, `numbers=n/first` | Les nombres ne sont écrits que sur ces repères (tous les repères restent dessinés) |
| `numbers=none` | Aucun nombre |
| `padding=40` | La distance de l'axe aux bords, en pixels (20 par défaut) |

Une sélection sans pas gradue l'axe avec un pas de 1. Sans `numbers`, les nombres sont éclaircis automatiquement quand ils se toucheraient ; une sélection écrite est prise telle quelle.

```
x=-6:6,axis->ticks=first
x=-20:20,axis=1->numbers=5/first,,grid
axisX=pi/2->numbers=2,,axisY->ticks=first
```

### Les valeurs par défaut des figures

| Entrée | Description |
|---|---|
| `default.label` | Les points ont un label (leur nom) |
| `default.tex` | Les labels des points sont écrits en LaTeX |
| `default.points=no` | Les points ne sont pas dessinés |
| `default.points=o`, `s`, `*`, `o/12` | La forme des points (cercle, carré, croix de visée) et leur taille |

### Les options d'un axe ou de la grille

Une entrée de décor (`axis`, `axisX`, `axisY`, `grid`, `gridX`, `gridY`) peut avoir des options après `->`, les mêmes que celles d'une figure
(couleur, épaisseur, pointillés…). Les virgules qui suivent sont celles des options, **jusqu'à une double virgule `,,`** (ou la fin) :

```
axis=pi/2,grid=2->red,w=5,,unitX=5
```

Ici `grid=2` a les options `red` et `w=5`, et `unitX=5` est une entrée. Les options de `axis` valent pour les deux axes ; celles de `axisX` ou de
`axisY` s'ajoutent aux siennes pour un axe. L'option propre à la grille est `subgrid` : chaque pas est coupé en 2 parties (`subgrid`) ou en `n`
(`subgrid=4`, entier de 2 à 20) par des lignes de la même couleur, deux fois plus claires.

```
x=-2pi:2pi,y=-2:2,axis,grid=pi/2->subgrid=3
box=6,unitX=1.2,axis,grid,default.label,default.points=s/8
```

Une entrée qui n'existe pas, ou qui n'existe plus (`ppu`, `subgrid`, `label`, `tex`, `points`, `no-points` : le message nomme son remplaçant), et une valeur
qui n'est pas de la forme attendue sont des erreurs.

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
| `mark` | Marqueur (flèche) aux deux extrémités |
| `mark=<côté>` | Marqueur au `start`, à l'`end`, aux deux (`both`), ou aucun (`none`, retire les marqueurs) |
| `mark=<côté>/<taille>` | Marqueur de la taille donnée (10 par défaut), par exemple `mark=both/20` |

Le marqueur prend la couleur et l'épaisseur du trait, quel que soit l'ordre des options. Seules les figures tracées par une
ligne, une polyligne, un polygone ou un chemin (droite, segment, courbe de Bézier, arc, fonction…) peuvent porter un marqueur :
un point ou un cercle avec `mark` est une erreur. Un côté ou une taille invalide est aussi une erreur.

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

Dans le texte, `@` est la valeur de la figure, mise à jour quand la figure bouge (glisser-déposer, animation) :

| Figure | Valeur de `@` |
|---|---|
| Point | ses coordonnées : `(x;y)` |
| Segment | sa longueur, en unités du repère |

`@.n` donne `n` décimales (2 par défaut). Chaque `@` du texte est remplacé. Sur les autres figures (droite, demi-droite, cercle…),
`@` reste un caractère ordinaire.

```
A(1.23456,2)->label=A@
A(1.23456,2)->label=A@.4/tl
s=seg A,B->label=@.1
```

Le label d'un segment ou d'un vecteur se place au milieu de la figure, celui d'une droite ou d'une demi-droite près de son extrémité
visible (10 pixels à l'intérieur du bord du dessin). Une position (`label=d/tl`) le déplace par rapport à ce point.

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

Aujourd'hui, seuls les **points** peuvent être animés : un point se déplace de `from` vers `to`, qui doivent tous deux être le nom
d'un point du dessin. `animate` sur une autre figure, un `from` ou un `to` qui n'est pas un point (ou qui manque), une durée qui
n'est pas un nombre supérieur à 0 ou un délai négatif sont des erreurs. Les autres figures pourront déclarer leur propre
animation plus tard.

### Couleurs disponibles

`black`, `white`, `red`, `green`, `blue`, `cyan`, `magenta`, `yellow`, `gray`, `grey`, `darkgray`, `darkgrey`, `lightgray`, `lightgrey`, `brown`, `lime`, `olive`, `orange`, `pink`, `purple`, `teal`, `gold`

---

## Figures

### Points

Une ligne dont les valeurs ne conviennent pas à la clé (nombre de valeurs, type de figure : `mid` veut deux points, `proj` un point
et une droite…) est une erreur, qui nomme la ligne en cause.

#### `pt` — Point fixe

**Syntaxe :**
```
A(x,y)
A=pt x,y
```

Les coordonnées peuvent référencer un autre point : `A.x` (abscisse de A), `A.y` (ordonnée de A).

Exactement deux valeurs : une troisième (la 3D n'existe pas) ou une valeur manquante est une erreur.

**Forme du point :**

| Option | Description |
|---|---|
| `o` ou `o=<taille>` | Forme cercle (défaut, taille 5) |
| `s` ou `s=<taille>` | Forme carré (taille 10) |
| `*` ou `*=<taille>` | Forme croix (taille 10) |

La taille est celle de la boîte qui contient la forme : le diamètre du cercle, le côté du carré, la largeur de la croix. Une
taille qui n'est pas un nombre strictement positif est une erreur, et ces options n'ont de sens que sur un point. Elles
s'écrivent dans n'importe quel ordre par rapport aux autres options.

Tous les points du dessin prennent par défaut la forme du paramètre `points=o`, `points=s` ou `points=*`, avec une taille
facultative : `points=s/12`. L'option d'un point l'emporte sur ce paramètre.

**Autres options :**

| Option | Description |
|---|---|
| `drag` | Rend le point déplaçable |
| `drag=grid` | Met le point sur les lignes de la grille : son pas si le graphe en montre une, une unité sinon, en comptant à partir de l'origine |
| `drag=Ox` | Déplace le point parallèlement à l'axe x : il garde sa hauteur |
| `drag=Oy` | Déplace le point parallèlement à l'axe y : il garde son abscisse |
| `drag=<figure>` | Contraint à suivre une figure (ex : un plot) |
| `drag=<domaine>` | Contraint à un domaine |

Les contraintes se combinent (`drag=grid/Ox`) et s'appliquent dans cet ordre : `Ox` ou `Oy`, la grille, le domaine (que la grille ne fait jamais franchir), puis les figures suivies.
Deux domaines du même axe limitent le point à la partie qu'ils ont en commun. Le point reste toujours dans le dessin.

**Exemples :**
```
A(3,4)
B(-1,2)->o=8,color=red
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
P=dpt A,d,distance,*?
```

Crée un point à `distance` de A dans la direction de d. Si le dernier argument est `*`, la direction devient perpendiculaire à d.
Toute autre quatrième valeur est une erreur.

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

Fonctionne aussi avec les axes `Ox` et `Oy`, qui sont des droites comme les autres (avec un cercle aussi). Les deux figures peuvent être données dans n'importe quel ordre
(`P=inter c,d` ou `P=inter d,c`). Deux figures d'un autre type, ou un autre nombre de figures, sont une erreur.

Quand l'intersection n'existe pas (droites parallèles, figures qui ne se touchent pas, cercles tangents pour le deuxième
point), le point n'est pas dessiné. Il réapparaît dès que l'intersection existe de nouveau.

**Exemples :**
```
P=inter d1,d2
P=inter c,d
```

---

### Lignes

Une ligne dont les valeurs ne conviennent pas à la clé (nombre de valeurs, type de figure : `seg` veut deux points, `perp` une droite et
un point…) est une erreur, qui nomme la ligne en cause. Les raccourcis (`d=AB`, `d=AB.`, `d=[AB]`, `d=AB[`, `d=[AB[`, `d=vAB`) s'écrivent
avec exactement deux noms de points, chacun une majuscule suivie de chiffres (`A`, `B1`, `d=A1B2`) ; toute autre écriture est une erreur.

#### `line` — Droite

**Syntaxe :**
```
d=AB
d=line A,B
d=line A,2          (par A, de pente 2)
d=line y=2x+1       (par son équation)
```

Seule la clé `line` accepte une pente ou une équation : `seg`, `vec` et `ray` demandent deux points. La pente est un nombre ou une
fraction (`d=line A,1/2`), en unités du repère. L'équation s'écrit avec des termes de chaque côté du `=` : `y=2x+1`, `3x=6`,
`y=x/2`, `2x-3y+6=0`. Une équation qui n'est pas celle d'une droite (`y=x^2`, `1=2`) est une erreur.

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
p=perp Ox,A
```

Droite perpendiculaire à d (une droite, ou l'axe `Ox` ou `Oy`) passant par A.

**Exemple :**
```
p=perp d,A
```

---

#### `para` — Parallèle

**Syntaxe :**
```
p=para d,A
p=para Ox,A
```

Droite parallèle à d (une droite, ou l'axe `Ox` ou `Oy`) passant par A.

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
b=bis d1,d2          (bissectrice de deux droites ou axes)
b=bis d1,d2,*        (l'autre bissectrice)
b=bis B,A,C          (bissectrice de l'angle BAC, sommet en A)
```

`d1` et `d2` sont des droites, ou les axes `Ox` et `Oy`. Deux droites sécantes ont deux bissectrices, perpendiculaires entre elles :
`bis d1,d2` trace celle dont la direction est la somme des directions de `d1` et de `d2` (celle de l'angle formé par leurs deux sens),
`bis d1,d2,*` trace l'autre (la différence des directions), toutes deux passant par leur point commun. Pour deux droites parallèles
(ou confondues), il n'y a qu'une bissectrice, la droite qui est au milieu d'elles : `bis d1,d2,*` n'existe pas alors et n'est pas tracée.

**Exemples :**
```
b=bis d1,d2
b2=bis d1,d2,*
b3=bis Ox,d1
```

---

### Cercles

#### `circ` — Cercle

**Syntaxe :**
```
c=circ O,r          (centre et rayon)
c=circ O,d          (de centre O, tangent à la droite d ou à un axe : c=circ O,Ox)
c=circ A,B,C        (par trois points : cercle circonscrit)
c=circ A,B,C,*      (inscrit dans le triangle ABC)
c=circ A:B          (de diamètre [AB])
```

`r` peut être un nombre (rayon), un point situé sur le cercle, ou `A:B` (le rayon est la distance entre les points A et B). Un nombre est
un rayon en unités de l'axe x (le cercle reste rond quand les axes ont des échelles différentes) ; un rayon nul, négatif ou qui n'est pas
un nombre est une erreur. Quand le point `r` est confondu avec le centre, le cercle n'est pas tracé, jusqu'à ce que le point s'éloigne ;
de même pour trois points alignés, ou un centre situé sur sa tangente. Les axes `Ox` et `Oy` sont les droites de
l'axe des x et de l'axe des y du repère. Toute autre combinaison de valeurs est une erreur, qui nomme la ligne.

**Exemples :**
```
c=circ O,3
c=circ O,A
c=circ O,A:B
c=circ O,Ox
c=circ A,B,C,*
c=circ A:B
```

---

#### `arc` — Arc

**Syntaxe :**
```
a=arc B,A,C            (l'angle BAC : de AB à AC, sens trigonométrique, centre A)
a=arc B,A,C,rayon      (avec un rayon)
a=arc O,2,30,120       (centre O, rayon 2, de 30 à 120 degrés)
a=arc O,A,60           (le point A tourne de 60 degrés autour de O)
a=arc O,A,-60,rayon    (sens horaire, avec un rayon)
a=arc B,A,C,*          (l'autre arc entre les mêmes directions, sens inverse)
```

Le sens est toujours le sens trigonométrique, de la première direction à la seconde. Un dernier `*` donne l'autre arc entre les
mêmes directions : on le parcourt dans le sens horaire (pour `O,A,60`, c'est le reste du tour, 300 degrés). Le rayon est un nombre
(en unités de l'axe x), un point (la distance au centre) ou `A:B` (la distance entre deux points) ; sans rayon, c'est la distance du
centre au premier point. Dans `O,2,30,120` le rayon est un nombre. Les angles sont en degrés ; deux directions identiques ne donnent
pas d'arc (un cercle le dessine mieux) et l'arc n'est pas tracé.

L'ordre des points change selon la construction : `B,A,C` met le centre au milieu (c'est l'angle BAC), `O,A,60` met le centre en premier.

**Paramètres spécifiques :**

| Paramètre | Description |
|---|---|
| `sector` | Ferme l'arc par ses deux rayons (secteur, à remplir) |
| `square` | Un angle droit est tracé comme une équerre (seulement si l'arc couvre 90 degrés) |

Le label se place à l'extérieur de l'arc, dans la direction du milieu de l'angle. Une position donnée (`label=θ/tl`) est respectée,
même quand l'arc bouge.

**Exemples :**
```
a=arc B,A,C
a=arc B,A,C->sector->fill=blue/0.3
a=arc B,A,C->square
a=arc O,2,30,120->label=θ
b=arc O,A,60,*
```

---

### Fonctions et courbes

#### `plot` — Fonction f(x)

**Syntaxe :**
```
f(x)=<expression>
f(x)=<expression>@samples,domaine,image
f=plot <expression>,@samples,domaine,image
f=plot A,B,C           (la parabole par trois points)
```

| Paramètre | Description |
|---|---|
| `@samples` | Nombre d'échantillons **par unité de x** au départ (nombre > 0), collé à la fin d'une valeur (`sin(x)@50`, `-pi:pi@50`) ou seul (`,@50`). Par défaut un tous les 8 pixels. La courbe est ensuite affinée là où elle courbe : une droite n'a que ses deux extrémités |
| `domaine` | Intervalle x sous la forme `min:max`. Par défaut ce qui est visible |
| `image` | Les valeurs de y dessinées, sous la forme `min:max`. La courbe est coupée en dehors |

Dans l'ordre libre après la fonction : au plus un nombre (échantillons) et deux intervalles (le domaine, puis l'image). Tout autre
valeur est une erreur. Chaque borne d'un intervalle est un nombre ou une expression de nombres : `-1.5:2.5`, `-2pi:2pi`, `.5pi:pi`,
`0:3pi/2`, `-2e:e` (une variable est refusée). L'expression est lue telle qu'elle est écrite, avec la seule variable `x` (voir les fonctions de `NumExp` : `sin`,
`cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `abs`, `ln`, `log`, `nthrt`, les constantes `pi` et `e`).

`f=plot A,B,C` trace la parabole qui passe par les trois points (une droite s'ils sont alignés) ; elle suit les points quand on les
déplace. Si deux points ont la même abscisse il n'y a pas de parabole : la courbe n'est pas tracée.

La courbe tracée n'est jamais à plus de 0,5 pixel de la courbe réelle (réglable dans la configuration avec `tolerance`), avec bien
moins de points qu'avant : une droite en a deux, un sinus une centaine. Elle est coupée là où la fonction n'existe pas, et aux
asymptotes. La forme d'écriture `f(x)=…` doit avoir un `=` et une expression, sinon c'est une erreur.

Le label d'une courbe se place à l'extrémité visible, du côté libre : sous une courbe qui monte, au-dessus d'une courbe qui descend.
Une position donnée (`label=f/tl`) est respectée.

**Exemples :**
```
f(x)=x^2
f(x)=sin(x)@50,-3:3,-2:2
g=plot x^2+1
q=plot A,B,C
```

---

#### `parametric` — Courbe paramétrique

**Syntaxe :**
```
f(t)=<expr_x>,<expr_y>
f(t)=<expr_x>,<expr_y>,domaine@samples
f=parametric <expr_x>,<expr_y>,domaine,@samples
```

La courbe est le point `(x(t), y(t))` quand `t` parcourt le domaine. Les fonctions s'écrivent avec la seule variable `t`.

| Paramètre | Description |
|---|---|
| `domaine` | Intervalle de `t` sous la forme `min:max`, par défaut **`0:2pi`**. Chaque borne est un nombre ou une expression de nombres : `-1.5:2.5`, `0:2pi`, `-pi:pi`, `.5pi:2pi` |
| `@samples` | Nombre d'échantillons **par unité de `t`** au départ (nombre > 0), collé à la fin d'une valeur (`0:2pi@50`) ou seul (`,@50`). Par défaut au moins 64 intervalles, ou un tous les 8 pixels de l'étendue du domaine. La courbe est ensuite affinée là où elle courbe |

Le domaine et le nombre d'échantillons s'écrivent dans l'ordre que l'on veut. La courbe tracée n'est jamais à plus de 0,5 pixel de la
courbe réelle ; elle est coupée là où une fonction n'existe pas et aux asymptotes. La forme `f(t)=…` doit avoir un `=` et des
fonctions, sinon c'est une erreur. Le label se place à l'extrémité visible de la courbe, à gauche du sens du parcours ; une position
donnée (`label=c/tl`) est respectée.

**Exemples :**
```
f(t)=cos(t),sin(t)
g(t)=t^2/4,sin(t),-2pi:2pi
h(t)=2cos(t),sin(t),0:2pi@80
```

---

#### `bezier` — Courbe de Bézier

**Syntaxe :**
```
b=bezier A,B,C,...                 (la courbe lisse qui passe par les points, 2 au moins)
b=bezier A,B/H,C/45,D/V/0.4        (avec une direction et un ratio à certains points)
b=bezier A,B,C,*                   (la courbe tirée par 3 points de contrôle : quadratique)
b=bezier A,B,C,D,*                 (la courbe tirée par 4 points de contrôle : cubique)
b=bezier A,B,C,D->close            (la courbe lisse fermée)
```

Après le nom d'un point : `/direction` puis `/ratio`, l'un et l'autre facultatifs.

| Direction | Description |
|---|---|
| `S` (ou absente) | Lisse (défaut) : la courbe suit la droite qui joint les voisins du point |
| `H` | Horizontale. Le sens (gauche ou droite) est celui qui va vers les voisins |
| `V` | Verticale. Le sens (haut ou bas) est celui qui va vers les voisins |
| un nombre | Un angle en degrés, dans le sens trigonométrique tel qu'on le voit à l'écran (`45`, `-30`, `90` vers le haut). La courbe passe par le point exactement dans ce sens |

`ratio` — facteur de courbure, un nombre > 0 : la distance des points de contrôle au point, en part de la distance entre ses deux voisins
(défaut : 0.2).

Avec un dernier `*` la courbe est celle des logiciels de dessin : elle part du premier point, finit au dernier et **ne passe pas** par les
autres (les poignées). Seuls 3 ou 4 points sont acceptés, et ils ne portent ni direction ni ratio. L'option `close` ferme la courbe lisse (la
dernière courbe rejoint le premier point, lisse aussi à cet endroit) ; elle demande au moins 3 points et n'existe pas avec les points de
contrôle. Une courbe dont un point n'a pas de position n'est pas tracée. Le label se place au milieu de la courbe, à gauche du sens du
parcours ; une position donnée (`label=b/tl`) est respectée.

**Exemples :**
```
b=bezier A,B/H,C/V/0.4,D
b=bezier A,B/90,C/-45/0.3
b=bezier A,B,C,D,*
b=bezier A,B,C,D->close->fill=teal/0.3
```

---

#### `follow` — Point et tangente mobiles

**Syntaxe :**
```
t=follow f             (le point suit la souris le long de f)
t=follow f,A           (le point part de l'endroit de f le plus proche de A)
t=follow f,*           (avec la tangente de f en ce point)
t=follow f,A,*
```

Crée un point interactif qui suit la souris le long d'une figure : une droite (ou un segment, une demi-droite), un cercle, un arc, un polygone (son contour),
une courbe de Bézier, une fonction (`plot`) ou une courbe paramétrique. Au bout d'un arc le point s'arrête, et la tangente reste dessinée. Un dernier `*` dessine aussi la tangente de la figure en ce point (sans lui, il n'y a que le point).
Avant que la souris bouge, le point est à l'endroit de la figure le plus proche du point `A` s'il est donné, sinon de l'origine du repère.
Quand la figure n'existe pas là où est la souris, le point et la tangente disparaissent. Le point reste sur la figure quand elle change.
Une couleur de remplissage (`fill=red`) colore le point, une couleur de trait (`stroke=red`) la tangente. Le label se place à côté du point,
à gauche du sens de la figure ; une position donnée (`label=t/tl`) est respectée.

**Exemples :**
```
f(x)=x^2
t=follow f,*
u=follow f,A->fill=red
```

---

#### `fill` — Aire entre courbes

**Syntaxe :**
```
z=fill f
z=fill f,g
z=fill f,domaine
z=fill f,g,domaine
```

Remplit l'aire entre deux fonctions (`plot`), ou entre une fonction et l'axe des x si `g` est absente. Le domaine est un intervalle
`min:max` dont les bornes peuvent s'écrire avec `pi` (`0:2pi`). Par défaut c'est le domaine des fonctions (là où elles sont toutes
dessinées), et si elles n'en ont pas, ce qu'on voit ; des fonctions qui n'ont aucune abscisse en commun sont une erreur. L'aire est
coupée là où une fonction n'existe pas ou a une asymptote, et là où les deux courbes se croisent les deux côtés sont remplis. Elle
suit les fonctions quand elles changent. Le label peut montrer l'aire (`@`, 2 décimales par défaut) et se place au milieu de l'aire.

**Exemples :**
```
f(x)=x^2
g(x)=x+2
z=fill f,g,-1:2->fill=blue/0.3
w=fill f,0:5->fill=green/0.3
```

---

#### `riemann` — Somme de Riemann

**Syntaxe :**
```
r=riemann f
r=riemann f,domaine
r=riemann f,domaine,n
r=riemann f,domaine,n,position
r=riemann f,n,position
```

| Paramètre | Description |
|---|---|
| `f` | Une fonction (`plot`) |
| `domaine` | Intervalle `min:max`, les bornes peuvent s'écrire avec `pi` (`0:2pi`). Par défaut le domaine de `f`, qui doit alors en avoir un (`f(x)=x^2@50,0:4`) : sinon c'est une erreur |
| `n` | Nombre de rectangles, entier de 1 à 1000 (défaut : 5) |
| `position` | Où `f` est lue dans chaque intervalle, de `0` (à gauche, défaut) à `1` (à droite) ; `0.5` au milieu |

Les rectangles vont de l'axe des x à la courbe ; ceux d'une fonction négative sont sous l'axe. Là où `f` n'est pas définie il n'y a
pas de rectangle. La somme se recalcule quand `f` change. Le label peut montrer la somme (`@`, 2 décimales par défaut) et le
nombre de rectangles.

**Exemple :**
```
f(x)=x^2@50,0:4
r=riemann f,0:4,10,0.5->fill=green/0.4
s=riemann f,10,1
```

---

### Polygones

#### `poly` — Polygone

**Syntaxe :**
```
p=poly A,B,C,...       (le polygone par des points, 3 au moins)
p=poly A,4,5           (régulier : centre A, rayon 4, 5 côtés)
p=poly A,B,5           (régulier : [AB] est un côté, 5 côtés)
p=poly A,4,5,2         (régulier étoilé {5/2} : centre A, rayon 4)
p=poly A,B,5,2         (régulier étoilé {5/2} dont [AB] est un trait de l'étoile)
```

La clé est la même, les valeurs disent la construction : que des points, un point puis un nombre, ou deux points puis un nombre.

| Paramètre | Description |
|---|---|
| `A,B,C,...` | Les sommets, dans l'ordre. Au moins 3 points |
| `A,rayon,n` | Centre, rayon et nombre de côtés. Le rayon est un nombre (en unités de l'axe x) ou `B:C` (la distance entre deux points). Le premier sommet est au-dessus du centre, les autres suivent dans le sens trigonométrique |
| `A,B,n` | `A` et `B` sont deux sommets consécutifs. Le polygone est **à gauche** de `A` vers `B` tel qu'on le voit à l'écran ; pour l'autre côté, on écrit `B,A,n` |
| `...,n,k` | Le polygone étoilé régulier `{n/k}` : les sommets sont reliés de `k` en `k` (`5,2` : le pentagramme). `k` est un entier de 1 (le polygone convexe) à moins de `n/2`. Quand `n` et `k` ont un diviseur commun la figure est faite de plusieurs polygones : `6,2` donne deux triangles. Avec `A,B,n,k`, `[AB]` est un des traits de l'étoile (deux sommets qu'elle relie) |

`n` est un entier de 3 à 1000. Un polygone dont une position n'existe pas (un sommet sans position, `A` et `B` confondus) n'est pas tracé.
Le label se place au centre des sommets ; une position donnée (`label=p/tl`) est respectée.

**Exemples :**
```
p=poly A,B,C,D->fill=yellow/0.3
p=poly O,3,6
p=poly A,B,4->fill=teal/0.3
s=poly O,3,5,2->stroke=red
h=poly O,3,6,2
```

### Chemins

#### `path` — Chemin SVG

**Syntaxe :**
```
p=path M 0,0 L 2,1 Q 3,3 4,0 Z
```

Les données d'un chemin SVG (`d`), **écrites en unités du repère** (pas en pixels) : `M 1,2` est le point (1 ; 2) du graphe, l'axe des ordonnées vers le haut. Les virgules de la ligne
coupent les valeurs, qui sont remises bout à bout : on écrit les données comme dans un fichier SVG, avec des virgules ou des espaces entre les nombres.

| Commande | Description |
|---|---|
| `M x,y` | Début d'un morceau (la première commande est toujours `M`) |
| `L x,y` `H x` `V y` | Segments |
| `C x1,y1 x2,y2 x,y` `S x2,y2 x,y` | Courbes de Bézier cubiques |
| `Q x1,y1 x,y` `T x,y` | Courbes de Bézier quadratiques |
| `A rx,ry rotation grand sens x,y` | Arc d'ellipse |
| `Z` | Ferme le morceau |

Les majuscules sont des positions, les minuscules des déplacements depuis le point courant. Un chemin peut avoir plusieurs morceaux (un `M` par morceau). Il est lu comme des segments
et des courbes de Bézier cubiques : un arc est dessiné par quelques courbes qui le suivent.

Le label se place au milieu du plus long morceau, à gauche du sens du tracé ; une position donnée (`label=p/tl`) est respectée. Un point peut suivre un chemin (`follow p`).
Des données qui ne sont pas celles d'un chemin (ne commencent pas par `M`, commande inconnue, nombre manquant) sont une erreur du parser.

**Exemples :**
```
p=path M 0,0 L 2,1 L 3,0
q=path M 0,3 C 1,5 3,5 4,3 Z->fill=green/0.3
r=path M 1,0 A 1,1 0 0 1 2,1->stroke=red
```

### Grilles et droites graduées

Ces figures s'écrivent dans le code, comme les autres, mais elles n'ont **aucun effet sur le graphe** : l'axe et la grille du graphe se règlent par les paramètres.

#### `grid` — Grille

**Syntaxe :**
```
g=grid                       (toute la fenêtre, un pas de 1)
g=grid 0.5                   (un pas de 0,5 sur les deux axes)
g=grid 0:5,0:3               (la grille de la portion x∈[0,5], y∈[0,3])
g=grid -2pi:2pi,-1:1,pi/2    (un pas de π/2 sur x, 1 sur y)
g=grid 0:5,0:3,0.5;1         (un pas par axe : 0,5 sur x, 1 sur y)
```

| Valeur | Description |
|---|---|
| `x,y` | Deux intervalles `min:max` (les bornes peuvent s'écrire avec `pi`) : la portion qui a la grille. Sans eux, toute la fenêtre |
| pas | Un nombre (les deux axes), un nombre de π (`pi/3`, `pi` vaut π/2 ; pour l'axe des x, l'axe des y garde 1) ou un vecteur `sx;sy`. 1 par défaut |

Les lignes d'une portion sont aux multiples du pas (elles se raccordent à la grille du graphe) et **sur les bords de la portion**, qui forment un cadre. Les lignes à moins de 3
pixels l'une de l'autre ne sont pas dessinées. L'option `subgrid` (`->subgrid`, `->subgrid=4`) coupe chaque pas en 2, ou en `n` (2 à 20), par des lignes de la même couleur,
deux fois plus claires. La grille est sous toutes les figures.

**Exemples :**
```
g=grid 0:5,0:3->subgrid=4,color=gray
h=grid -2:2,-2:2,0.5
```

#### `axis` — Droite graduée

**Syntaxe :**
```
a=axis A,B                   (la droite par A et B : A vaut 0, B vaut 1)
a=axis A,B,0.5               (un repère tous les 0,5)
a=axis A,B,pi/2              (les nombres sont des fractions de π)
```

La droite passe par `A` (son zéro) et `B` (l'unité), avec une flèche au bout et un repère avec son nombre à chaque pas, des deux côtés du zéro (le 0 est écrit).
Les nombres sont à droite de la droite vue dans le sens de A vers B (sous une droite qui va vers la droite). Le pas est un nombre, ou un nombre de π (`pi/3`, `pi` vaut π/2).

| Option | Description |
|---|---|
| `ticks=n`, `ticks=first`, `ticks=n/first` | Quels repères sont dessinés (voir les paramètres du graphe) |
| `numbers=n`, `numbers=first`, `numbers=n/first`, `numbers=none` | Sur quels repères un nombre est écrit |
| `name=t` | Le nom écrit au bout de la flèche, du côté sans nombres |
| `side=left` | Les nombres sont de l'autre côté (`right` : sous une droite qui va vers la droite) |
| `padding=40` | La distance aux bords de la fenêtre, en pixels (20 par défaut) |

Les couleurs, l'épaisseur et les pointillés sont ceux des options communes ; les nombres et le nom ont la couleur de la droite.

**Exemples :**
```
A(0,0)
B(1,0)
a=axis A,B->ticks=first
r=axis A,B,0.5->numbers=2,name=t,color=red
```
