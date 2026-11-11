# Spec PiDraw : figures `Node` et `Edge` (flowchart, arbre de probabilités)

> **Statut au 2026-11-11 : implémenté, avec une conception différente de celle ci-dessous.** Ce qui suit est la spec d'origine ; **ce qui existe** est ceci (et c'est ce dont dépend la spec Scolcours). Guide : `docs/guide/points.md` (« A node ») et `docs/guide/diagrams.md`.
>
> - **Pas de figure `Node`** : un nœud est un `Point` qui a l'option `node=rect|round|diamond|circle` (`node` seul : `rect`). C'est une boîte autour du label à la place de la marque (`o`, `s`, `*` exclus) ; elle prend la taille du label mesuré (`Label.size()`), le label est au centre. Un nœud se déplace comme un point (`drag`), il a `fill`, `color`, `w`, `dash`… `default.points` (forme, invisibilité) ne s'applique pas à lui. API : `{node: 'rect'}` dans la config d'un `Point`, `point.setNode(shape | null)`, `point.node`, `point.boundaryPoint(from)`, `point.anchorPoint(place)`.
> - **Ancres** : `A.tl`, `A.tc`, `A.tr`, `A.ml`, `A.mc`, `A.mr`, `A.bl`, `A.bc`, `A.br` (le point `A` doit avoir `node`, sinon `ParseError`). Ce sont de vrais `Point` cachés, de contrainte `anchor: {node, position}`, créés par `Draw._ensureAnchors` à la première ligne qui les nomme (le graphe ne suit une dépendance que par une figure dans la config). Le point dans l'identifiant est accepté par PiParser. Elles servent de valeur à toute figure qui attend un point (`seg A.mr,B.tl`, `mid`, `edge`…).
> - **`edge`** : `e=edge A,B` (clé `edge`, figure `Edge`, calque principal : sous les nœuds). Elle s'arrête au bord des nœuds (`boundaryPoint`), exactement sur un point qui n'est pas un nœud (une ancre comprise). Options : `curve=0.3` (le milieu est déplacé de 0,3 × la distance, à gauche du sens de parcours à l'écran ; négatif : à droite), `edge A,A` est une boucle avec `loopSide=t|r|b|l` (`t` par défaut). Aucune flèche par défaut : `mark=end`. Le label est à côté du trait (à gauche du trajet) ; `label=yes/mc` le met sur le trait, avec `labelFill=white` pour cacher le trait. **L'option s'appelle `loopSide`, pas `loop`** : `loop` est l'animation, `side` les axes.
> - **Label** : `labelColor=red` (texte, sans opacité) et `labelFill=white/0.8` (fond : un `<rect>` à 3 px du texte), pour `label` et `tex`, dans n'importe quel ordre. **Le texte ne suit pas le trait** de la figure.
> - **Classes CSS** : le groupe svg de chaque figure a la classe de sa sorte (`pidraw-point`, `pidraw-node`, `pidraw-edge`…), et `class=a/b` en ajoute. Aucun style visuel (`handDrawn`…) dans PiDraw : une page les fait en CSS.
> - **TikZ** : nœud = sa boîte (`rectangle`, `rounded corners`, polygone, `circle`) + le label au centre ; arête = `--` ou `.. controls ..`.
> - **Pas fait** (voir `.claude/docs/dette-technique.md`) : poignée de `drag` sur un nœud, label repoussé sur un nœud, `setNode(null)` qui rend l'alignement, taille d'un nœud qui change pendant son déplacement.
> - **Vérifié dans un navigateur** (Edge, bibliothèque construite) pour le texte simple ; le TeX (KaTeX) se contrôle dans la démo.

> **Mise à jour du 2026-10-31.** Cette spec date d'avant la réorganisation du code : le fond reste valable, les chemins non. Aujourd'hui :
> - une figure a son dossier `src/figures/Node/` avec `Node.ts`, `Node.types.ts`, `Node.constraints.ts`, `Node.parser.ts` (idem `Edge/`) ; le chemin à suivre est « Créer une nouvelle figure » dans `.claude/guideline.md` ;
> - `src/parser/buildNode.ts` et `buildEdge.ts` deviennent `Node.parser.ts` et `Edge.parser.ts` ; `parser_config` et `PARSER_TYPE` n'ont pas changé ;
> - `src/labels/Label.ts` est `src/figures/Label/Label.ts` (types dans `Label.types.ts`, fonctions pures dans `Label.constraints.ts`), et `src/Calculus.ts` est `src/calculus/` ;
> - `Bezier.moveLabel()` ne lève plus d'erreur, et les ancres `N1.tr` passent par `Draw._namedFigures()` comme les axes `Ox` et `Oy` ;
> - les tests sont dans `tests/figures/<Figure>/` (il n'y a plus de `tests/graph.test.ts`) ; chaque figure doit avoir son `tikz()` et, si on peut la suivre, son `follow`.

Date : 2026-10-28
Origine : étude de faisabilité menée dans le projet Scolcours (remplacer `mermaid` + `ProbabilityTree.ts`).
Statut : à implémenter. La partie Scolcours (parseurs, layout, widget) est décrite dans
`scolcours_gymnase/.claude/specs/2026-10-28-flowchart-widget-pidraw.md` et ne sera faite qu'après cette partie.

## 1. But

Ajouter à PiDraw deux nouvelles figures :

- `Node` : une forme (rectangle, arrondi, losange, cercle) autour d'un label (TeX ou texte), qui se dimensionne
  d'après son label et expose des **ancres nommées utilisables comme des `Point`**.
- `Edge` : une flèche entre deux nœuds (ou deux ancres) qui s'arrête au bord des formes, avec un label optionnel, et
  qui gère la boucle (nœud vers lui-même).

Pourquoi dans PiDraw : forme + texte, arrêt de la flèche au bord et taille du label sont de la géométrie de dessin.
Scolcours n'aura plus qu'à convertir un code flowchart / arbre en code PiDraw (texte) et à calculer le layout
(positions des nœuds). Précédent côté Scolcours : `PiMarkovGraph.vue` fait cela à la main (ancres calculées
manuellement, `bezier ... ->mark=end`, label séparé).

## 2. Constats sur l'existant (vérifiés dans `src/`)

- `Graph` (`src/Graph.ts`) : fabrique typée `create.point/line/bezier/circle/polygon/...`. Chaque figure est stockée
  dans `_figures[name]`. `update()` parcourt toutes les figures dans l'ordre d'insertion et appelle `computed()`.
  **Ordre de création = ordre de dépendance** (un `Edge` doit être créé après ses nœuds).
- `Draw extends Graph` (`src/Draw.ts`) : `_build()` lit le texte (`PiParse`, séparateurs `->`, `,`, `/`), cherche
  `parser_config[key]`, appelle `build(item, figures, config)` qui renvoie `{create, config}` (ou un tableau), puis
  `this.create[create](config, name)`. Si `build` renvoie un tableau de plus d'un élément, les noms sont suffixés
  `name1`, `name2`... (voir `_build`). `_build` termine par `updateLabels([])` une seconde fois « pour l'alignement ».
- Les dépendances entre figures passent par des **objets** : `buildBezier` met `figures[name]` (instances de `Point`)
  dans la config ; `convertIdToFigure()` (`parser.common.ts`) convertit les noms en figures ; les `build*` testent
  `instanceof Point`.
- `Graph` n'est pas « en pixels » : il porte le système de coordonnées (`config.origin`, `config.axis`, donc le `ppu`)
  et convertit avec `toPixels` / `toCoordinates` (`Calculus.ts`). `Point` garde `pixels` et expose `coordinates`.
- Taille de la zone : `Draw._parseLayout` calcule `width = dx * ppu`, `height = dy * ppu` d'après `x=min:max`,
  `y=min:max`. Pas d'ajustement automatique au contenu.
- `Label` (`src/labels/Label.ts`) : positions `tl tc tr ml mc mr bl bc br`. La taille du label est lue via
  `clientWidth` / `clientHeight` du `foreignObject` au moment de `position()`. Pas d'accesseur public de taille.
- `Bezier.moveLabel()` lève `Error("Method not implemented.")` : une figure de type flèche ne peut donc pas porter de
  label tant que ce n'est pas implémenté (c'est pourquoi `PiMarkovGraph` utilise un point séparé pour le label).
- Exports publics : `src/index.ts` (`export type * from "./figures/..."` pour les types, `PiDraw` = `Draw`,
  `PiGraph` = `Graph`).

## 3. Périmètre

### 3.1 Couche `Graph`

1. **`src/figures/Node.ts`** (`extends AbstractFigure`)
   - Config (`INodeConfig`) :
     - `center: Point | XY` : position, en coordonnées ;
     - `shape: 'rect' | 'round' | 'diamond' | 'circle'` (défaut `rect`) ;
     - `padding` (px, défaut à calibrer) et `minWidth` / `minHeight` ;
     - le texte du label vient de `addLabel` (même mécanisme que `Point`).
   - `computed()` : mesurer le label (voir 3.1.4), calculer la taille de la forme, tracer la forme (`rect` avec `rx`,
     `polygon` pour le losange, `circle`/`ellipse`), puis recalculer les ancres.
   - **Losange** : le rectangle du texte doit être inscrit dans le losange, donc environ `2 × (w, h)` du texte
     (`w'/2 + h'/2 >= w/2 + h/2` à adapter, à valider visuellement). **Cercle** : diamètre >= diagonale du texte.
   - `strokeable()` / `fillable()` retournent la forme, pour que `fill()`, `stroke()`, `dash()` d'`AbstractFigure`
     fonctionnent sans code spécifique.
   - **Ancres nommées** : une instance de `Point` par code de position `tl tc tr ml mc mr bl bc br` (même
     vocabulaire que `LABEL_POSITION`). Ce sont de vrais `Point` (donc utilisables par `mid`, `bezier`, `seg`,
     `circ`, ...), mis à jour par `Node.computed()`, non dessinés par défaut (masqués), enregistrés dans
     `graph.figures` sous `<node>.<code>` (ex. `N1.tr`). Pour un losange/cercle, les ancres `t/b/l/r` sont les
     sommets/points cardinaux ; les coins (`tl`, ...) sont sur le contour.
   - `boundaryPoint(from: XY): XY` : point du contour du nœud dans la direction d'un point donné (en pixels ou en
     coordonnées, à fixer). Utilisé par `Edge`. Un cas par forme : intersection segment/rectangle, segment/losange,
     segment/ellipse.
   - `moveLabel()` : label centré (`mc`).
   - Conversion taille en pixels vers unités : passer par `graphConfig.axis` (gère `unitX != unitY` / anisotropie).
     Les ancres sont calculées en pixels (`point.pixels = ...`) et exposées en coordonnées par `Point.coordinates`.

2. **`src/figures/Edge.ts`** (`extends AbstractFigure`)
   - Config (`IEdgeConfig`) :
     - `from: Node | Point` et `to: Node | Point` ;
     - `curve?: number` (courbure, 0 = droite) ;
     - `loop?: 't' | 'r' | 'b' | 'l' | ...` (côté de la boucle quand `from === to`) ;
     - `mark?: 'end' | 'start' | 'both' | 'none'` (réutiliser `createMarker` de `Calculus.ts`, comme `Line`).
   - Si `from`/`to` est un `Node` : les extrémités sont `node.boundaryPoint(<autre extrémité>)`. Si c'est un `Point` (ancre
     nommée) : extrémité exactement sur le point.
   - Tracé : droite ou bézier (réutiliser `computeBezierPath`). Boucle : bézier avec deux ancres voisines du nœud.
   - **Label d'arête** : implémenter `moveLabel()` (ne pas lever d'erreur) : position au milieu du tracé, fond blanc
     (comme les labels de branche de `ProbabilityTree.ts`), éventuellement décalage perpendiculaire.
   - `dash()` / `dot()` d'`AbstractFigure` pour les arêtes pointillées.

3. **`src/Graph.ts`** : ajouter `create.node(config, name)` et `create.edge(config, name)` sur le patron des autres
   (ajout dans un `layer`, enregistrement dans `_figures`). Le `Node` doit enregistrer ses ancres dans `_figures`
   **avant** les figures qui les utilisent (ordre d'insertion). Prévoir un calque adéquat (`LAYER_NAME`, `pidraw.common.ts`) :
   arêtes sous les nœuds, nœuds sous les labels.

4. **`src/labels/Label.ts`** : ajouter un accesseur public de taille mesurée (`size(): {width, height}`), pour
   que `Node.computed()` n'accède pas aux internes. Vérifier l'ordre mesure → ancres → arêtes pendant `update()` (le
   second `updateLabels([])` de `_build` suggère que cet ordre est déjà fragile).

5. **`src/index.ts`** : `export type * from "./figures/Node"` et `"./figures/Edge"`.

### 3.2 Couche `Draw` (parseur)

1. **`src/parser/parser.common.ts`** : ajouter `NODE = 'node'` et `EDGE = 'edge'` dans `PARSER_TYPE`.
2. **`src/parser/buildNode.ts`**, **`src/parser/buildEdge.ts`** (même forme que `buildBezier` / `buildCircle`) :
   - `buildNode` : valeurs = point de position (nom d'un `Point` ou coordonnées) + forme (`rect|round|diamond|circle`).
   - `buildEdge` : `convertIdToFigure(item.values, figures)` puis test `instanceof Node | Point`.
3. **`src/parser/parser.config.ts`** : entrées `node` et `edge` (`name`, `description`, `code`, `parameters`, `build`) ;
   `Draw.documentation()` les expose automatiquement.
4. **Options** (via `_applyOptions` / `_buildOptions` de `Draw.ts`, à lire avant) : `tex=` / label sur le nœud et sur
   l'arête, `dash`, `dot`, couleurs `fill`/`stroke` (vérifier la syntaxe existante des couleurs `red/0.3`), `mark=end`.
5. **Résolution des noms d'ancres** : `N1.tr` doit être résolu par `convertIdToFigure` (c'est une clé de `figures`).
   **À vérifier** : le tokenizer `piparser` accepte-t-il le point dans un identifiant ? Sinon utiliser `N1_tr`
   (décision à prendre ici, la spec Scolcours s'adaptera).
6. **Drag** : `_applyDrag` ne gère que `Point`. Un nœud se déplace en déplaçant son point central
   (`center: Point`) : les arêtes suivent par `update()`. Pas de drag direct de `Node` en v1.

### 3.3 Syntaxe cible (indicative, à ajuster à `piparser`)

```
A(0,0)
B(0,-3)
nA=node A/diamond->tex=\text{Position relative}
nB=node B/rect->tex=\text{parallèles}
e1=edge nA,nB->mark=end,tex=oui
e2=edge nA.mr,nB.tl->dash
loop=edge nA,nA/t->mark=end,tex=0.6
```

## 4. Hors périmètre (v1)

- Layout automatique (positions) : c'est du côté Scolcours (composable de layout), pas dans PiDraw.
- Autoajustement de la fenêtre au contenu (`x=auto`) : Scolcours fournit `x=...,y=...` d'après son layout.
- Formes avancées (parallélogramme, sous-routine, cylindre...).
- Routage orthogonal des arêtes (coudes), évitement d'obstacles.

## 5. Risques et points d'attention

- **Mesure du label** : `clientWidth` est en pixels écran, alors que le tracé est en unités du `viewBox`. C'est correct
  tant que le SVG est affiché à l'échelle ~1:1 (`ppu` auto = `box.width / dx`), comme pour les labels existants ; si le
  conteneur est redimensionné après coup, la taille mesurée est fausse. À tester avec un conteneur étroit.
- **Anisotropie** (`unitX != unitY`) : la taille d'un nœud doit rester constante en pixels (cf. le correctif des
  carrés de Study dans Scolcours, `controlSize()`).
- **Ordre `update()`** : le nœud doit être mesuré avant que l'arête lise ses ancres. Prévoir un test dédié.
- **Boucles** : choix de la géométrie par défaut (deux ancres voisines + bézier) à valider visuellement.
- **Compatibilité** : aucun changement de comportement des figures existantes ; la numérotation des noms par
  `buildResult.length > 1` dans `_build` ne doit pas casser les noms d'ancres (les ancres sont créées par `Node`, pas par
  le tableau de `build`).

## 6. Tests et livrables

- Tests dans `tests/` (framework : `vitest`, déjà en place avec `tests/graph.test.ts`) :
  - construction d'un `Node` par forme, vérification des ancres (coordonnées de `tl/tc/.../br`) ;
  - `boundaryPoint` par forme (rect, losange, cercle), dont cas limites (point à l'intérieur, sur l'axe) ;
  - `Edge` entre deux nœuds : extrémités sur le contour, pas au centre ; entre deux ancres : exactement sur les ancres ;
  - boucle ; label d'arête (pas d'exception) ; `dash` ;
  - parseur : `node`, `edge`, ancre nommée comme argument de `mid` / `seg`.
  - Remarque : le DOM de test (jsdom) ne mesure pas les tailles : prévoir des tailles de label injectables ou simulées.
- Démo : ajouter un exemple dans `demo/` (flowchart minimal + arbre de probabilités à 2 niveaux).
- Documentation : compléter `docs/parser.md` avec `node` et `edge`.
- Build (`npm run build`) puis publication de la version (Scolcours consomme `pidraw ^0.2.28`, il faudra monter la version).

## 7. Critère de fin

Un code PiDraw texte de 10 à 15 lignes produit un flowchart lisible (3 formes, flèches arrêtées au bord, labels
TeX sur les arêtes, une boucle), et une ancre nommée sert d'argument à une figure existante (`mid`, `seg`). Les tests
ciblés passent, `npm run build` réussit. Noter à la fin de la session la syntaxe réellement implémentée (noms
d'ancres, options) : la spec Scolcours en dépend.
