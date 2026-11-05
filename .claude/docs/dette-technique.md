# Dette technique

Points connus, acceptés pour l'instant, à traiter plus tard. Une entrée par sujet : date, contexte, ce qui manque.

## 2026-10-29 : tailles visuelles dépendantes du zoom du `viewBox`

- **Symptôme** (signalé pendant l'analyse de `Point.ts`) : avec le constructeur de `Draw`, `x=-4:4,y=-4:4` donne des traits plus épais et
  une police plus grande que `x=-10:10,y=-10:10`, pour des dimensions affichées équivalentes (par exemple un div à deux colonnes).
- **Mécanisme** : `Graph` fait `svg.viewbox(0, 0, width, height)` avec `width = dx × ppu` (`Draw._parseLayout`), et le `<svg>` prend la
  largeur de son conteneur. Tout ce qui est exprimé en unités de `viewBox` (épaisseur de trait, rayon d'un point, police, marqueurs)
  est multiplié par `largeur affichée / largeur du viewBox`. Avec un `ppu` fixe (la démo écrit `ppu=50`), `-4:4` donne un viewBox de
  400 unités sur 800 px (×2), `-10:10` un viewBox de 1000 unités (×0,8).
- **À vérifier dans l'analyse de `Draw.ts` et `Graph.ts`** : avec `ppu=auto` le facteur devrait rester proche de 1
  (`ppu = max(round(largeur mesurée / dx), 20)`). Un facteur qui varie quand même peut venir d'une largeur mesurée trop tôt (avant la
  mise en page du conteneur), de l'arrondi ou du minimum de 20.
- **Ce qui existe** : `Label` applique `size` (`font-size`, `inherit` par défaut) aux textes et aux labels HTML ; le `vector-effect` sans effet qu'il posait est retiré (2026-10-30).
- **Principe envisagé** : les « tailles visuelles » (trait, point, police, marqueurs, pointillés) sont en pixels écran, indépendantes du
  `viewBox`. `Graph` mesure `zoom = largeur affichée / largeur du viewBox` (1 sans mise en page, par exemple `svgdom`), le republie au
  redimensionnement du conteneur, et le fournit aux figures par `IFigureContext`. Chaque figure convertit `taille écran / zoom`.
  Alternative : fixer `width` / `height` du `<svg>` à ceux du `viewBox` (zoom toujours 1, mais le graphe n'a plus la taille de son conteneur).
- **Fichiers concernés** : `Graph.ts` (mesure, `ResizeObserver`), `Draw.ts` (`ppu`), `AbstractFigure.ts` (épaisseur, pointillés),
  `Label.ts` (police), `svg/marker.ts` (marqueurs), `Point.ts` (taille), `Grid.ts` et `Axis.ts` (traits).
- **Décision de l'utilisateur** : à traiter après l'analyse et la correction des autres fichiers. En attendant, les tailles de `Point`
  restent en unités de `viewBox`, mais n'ont qu'un seul endroit de définition (table `SHAPES`) pour faciliter le changement.
- **Réglé en grande partie (2026-10-30, paramètres du graphe)** : l'alternative « fixer la taille du `<svg>` à celle du `viewBox` » est faite. Le dessin a sa taille réelle en cm (`unitX`, `unitY` ; 1 cm = 37,94 px) ; le `<svg>` a
  `width` en pixels et `max-width: 100%`. Le `viewBox` ne dépend plus de la largeur du conteneur ni de la fenêtre : changer `x` ou `y` ne change plus l'épaisseur des traits ni la police. **Reste** : un dessin plus large que son conteneur est réduit
  (zoom < 1, traits et polices réduits en proportion) ; une mesure du zoom pour le compenser n'est pas faite. `ppu` n'existe plus.

## 2026-10-29 : gestion des erreurs du parser dans `Draw` (code écrit en direct)

- **Contexte** : sur Scolcours, le code est parfois écrit en direct ; une ligne invalide est donc normale pendant la frappe. Décision de
  l'utilisateur : les `build*` lèvent (`ParseError` avant le `->`, `OptionError` après), `Draw` gère, le composant Vue affiche.
- **État actuel de `Draw._build`** : un `build*` qui renvoie `null` est ignoré sans message ; les erreurs de `create` sont attrapées
  par `console.error` ; l'appel à `build(...)` n'est pas protégé ; les erreurs des options (`_applyOptions`) ne sont pas attrapées.
- **À faire dans l'analyse de `Draw.ts`** :
  - protéger chaque ligne (`build`, `create`, options) : une ligne en erreur n'arrête pas le dessin ;
  - collecter les erreurs avec le numéro et le texte de la ligne (`ParseError`/`OptionError` ne portent que l'id de la figure et la clé) ;
    les exposer (propriété, événement ou rappel) pour que le composant Vue les affiche, et les vider à chaque `refresh` ;
  - convertir en `OptionError` (qui nomme l'option) les `InvalidArgumentError` levées par les figures quand `_applyOptions` applique
    une option (`color`, `fill`, `dash`, `mark`, `label`...) ;
  - décider si une figure dont une option est invalide reste dessinée sans cette option (évite l'enchaînement d'erreurs « figure inconnue »
    sur les lignes suivantes) ;
  - `_build` : la variable `obj` est partagée entre les figures créées par une même ligne (intersections) et le bloc des paramètres par
    défaut (`parameters`) lit des clés d'un objet vide : code mort.

## 2026-10-29 : documentation et vocabulaire du parser (`Draw` et tous les `build*`)

- **Décision de l'utilisateur** : gros travail de documentation à faire sur `Draw` et les `build*`, avec un vocabulaire cohérent dans toutes
  les commandes (clés, options, séparateurs). Des modifications de syntaxe passées ont pu laisser des incohérences.
- **Premier relevé (vérifié avec `piparser`, séparateurs `->`, `,` et `/`)** :
  - `piparser` lit `clé=valeur/option1/option2`. `A=pt 1,2->o/8` et `->o:8` donnent une clé nommée `o/8` ou `o:8` (valeur `true`), donc
    la taille n'est jamais lue ; seul `->o=8` donne la valeur 8. `docs/parser.md` documente pourtant `o:<taille>`, `s:<taille>`,
    `*:<taille>` et l'exemple `B(-1,2)->o/8->color=red`.
  - La documentation écrit aussi `w:<nombre>`, `dash:<motif>`, `label:<texte>/<position>`, `drag:grid`… alors que le parseur lit `=`
    (`label=A@.4/tl`, `drag=Ox`). Le `:` des tableaux sert-il de notation, ou de syntaxe ? À trancher et à rendre uniforme.
  - `parser_config` (`parameters: ['drag:grid', …]`) et `parser.common.ts` (`PARSER_BOOLEAN_VALUES`) ont leur propre liste de noms.
  - `Draw._applyOptions` ignore sans rien dire une option inconnue (`switch` sans `default`) : à signaler par un `OptionError`.
- **À faire** : inventaire de toutes les clés et options acceptées (par `build*` et par `_applyOptions`), choix d'une notation unique,
  mise à jour de `docs/parser.md`, `parser_config` et `PARSER_BOOLEAN_VALUES`, avec un test par option documentée. Chaque analyse d'un
  `build*` relève et corrige son vocabulaire en passant.

### Complément (2026-10-29) : syntaxe des options visée et écarts constatés

- **Syntaxe visée par l'utilisateur** : un seul `->` après la définition, puis des options séparées par des virgules, chacune de la forme
  `clé=valeur/param1/param2/param3` : `A=pt 3,4->o=8,red/0.6,tex=A_2/mc/0:-0.5`. Seule exception : la couleur nue (`red/0.6`), raccourci de
  `fill=red/0.6` (peut-être aussi `stroke=` : l'utilisateur n'est pas sûr). Vérifié : c'est bien ce que lit `piparser`.
- **Écarts constatés (vérifiés avec `piparser`)** :
  - **Plusieurs `->` ne marchent pas** : `A=pt 3,4->o=8->red/0.6->tex=A_2` ne lit que `o=8`, le reste est perdu sans message. La
    documentation écrit pourtant `->o/8->color=red`.
  - **`red/0.6` nu** est lu comme une clé nommée `red/0.6` : `Draw` ne la reconnaît pas (`PARSER_COLOR_VALUES.includes('red/0.6')` est
    faux), l'option est ignorée. Seul `red` nu fonctionne, et il applique `stroke` (pas `fill`). À trancher : `fill` ou `stroke` ?
  - **Vecteur et domaine** : `0;-0.5` est un vecteur `{x, y}` (le décalage d'un label : `tex=A_2/mc/0;-0.5`), `0:-0.5` est un domaine
    `{min, max}`. Les deux notations se ressemblent : à bien distinguer dans la documentation.

## 2026-10-29 : un dossier par figure (tâche mécanique, à la fin de l'analyse des figures)

- **Décision de l'utilisateur** : à plat pendant les analyses, puis une seule tâche qui crée un dossier par figure, avec le barrel de
  `index.ts`. Le renommage `build*` en `<Figure>.build.ts` se fait au même moment (pas avant : un seul déplacement par fichier).
- **Liste de correspondance** (à compléter à chaque analyse de figure) :

| Avant | Après |
|---|---|
| `src/figures/Point.ts` | `src/figures/Point/Point.ts` |
| `src/figures/Point.types.ts` | `src/figures/Point/Point.types.ts` |
| `src/figures/Point.constraints.ts` | `src/figures/Point/Point.constraints.ts` |
| `src/parser/buildPoint.ts` (contient `buildIntersection`) | `src/figures/Point/Point.build.ts` |
| `tests/figures/Point.test.ts` | `tests/figures/Point/Point.test.ts` |
| `tests/parser/buildPoint.test.ts` | `tests/figures/Point/Point.build.test.ts` |

- **À faire avec le déplacement** : imports (`parser.config.ts`, `Draw.ts`, `Graph.ts`, `Animate.ts`, les autres figures, `index.ts`), chemins
  du registre `file-analyse-log.md`, du guideline, de la mémoire et de `docs/`, règle `dependency-cruiser` « seuls les `*.build.ts`
  importent `src/parser/` » (après avoir retiré `convertIdToFigure` de `Line.ts`), puis la vérification complète.

### Complément (2026-10-29) : `Line`

- **Liste de correspondance « un dossier par figure »** (suite) :

| Avant | Après |
|---|---|
| `src/figures/Line.ts` | `src/figures/Line/Line.ts` |
| `src/figures/Line.types.ts` | `src/figures/Line/Line.types.ts` |
| `src/figures/Line.constraints.ts` | `src/figures/Line/Line.constraints.ts` |
| `src/parser/buildLine.ts` | `src/figures/Line/Line.build.ts` |
| `tests/figures/Line.test.ts` | `tests/figures/Line/Line.test.ts` |

  `src/figures/constraints.ts` (aide partagée `singleConstraint`) reste au niveau de `src/figures/`.
- **TikZ des droites** : `computeLine` donne les extrémités d'une droite diagonale sur les bords **en x** du canvas (par exemple y = ±8 pour
  un canvas qui va à ±6). Le SVG les coupe, pas le TikZ : `Graph.tikz()` devra poser un `\clip` du cadre du dessin.
- **`Line.move(nombre)`** : redéfinition supprimée à la tâche suivante (S4) ; la figure de cote prend son décalage en configuration.
- **Mise à jour (S5 de `Line`)** : les droites et demi-droites sont maintenant découpées sur les quatre bords du canvas (`clipSegment`), donc
  leur TikZ reste dans le cadre. Le `clip` de `Graph.tikz()` reste utile pour les autres figures (courbes, tangentes de `Follow`).

### Complément (2026-10-29) : raccourcis de syntaxe et `_prepare`

- **Règle de l'utilisateur** : les raccourcis (`A(3,4)`, `d=AB`, `f(x)=…`) vont dans le `build*` de leur figure. Fait pour le point et la droite
  (avec `buildLine.ts`) ; **reste `Draw._parseKeyCodePlot`**, à déplacer dans `buildPlot.ts` avec l'analyse de ce fichier.
- **`Draw._prepare`** analysait toutes les lignes sans protection : une erreur levée par un raccourci aurait fait échouer tout le dessin. Un
  `try/catch` par ligne (journal par `console.error`, la ligne est sautée) est ajouté en attendant la gestion complète des erreurs de `Draw`.
- **Mise à jour (`buildLine`)** : les raccourcis du point et de la droite sont déplacés (`parsePointShorthand`, `parseLineShorthand`). Le `buildLine.ts`
  devient `Line.build.ts` avec le passage aux dossiers (voir la liste de correspondance de `Line`).

### Complément (2026-10-29) : `Circle`

- **Liste de correspondance « un dossier par figure »** (suite) :

| Avant | Après |
|---|---|
| `src/figures/Circle.ts` | `src/figures/Circle/Circle.ts` |
| `src/figures/Circle.types.ts` | `src/figures/Circle/Circle.types.ts` |
| `src/figures/Circle.constraints.ts` | `src/figures/Circle/Circle.constraints.ts` |
| `src/parser/buildCircle.ts` | `src/figures/Circle/Circle.build.ts` |
| `src/parser/buildArc.ts` (séparé de `buildCircle.ts`) | `src/figures/Arc/Arc.build.ts` |
| `tests/figures/Circle.test.ts` | `tests/figures/Circle/Circle.test.ts` |

- **Constructions à ajouter plus tard** : l'équation du cercle (`(x-1)^2+(y+2)^2=9`, comme l'équation de droite), les cercles par deux points et tangents à une droite (problème d'Apollonius, deux solutions, écartés).

### Complément (2026-10-29) : le dernier argument `*`

- **Principe de l'utilisateur** : une clé par sorte de figure, et un dernier argument `*` pour la forme alternative. Appliqué à `circ A,B,C,*` (inscrit) et
  `dpt A,d,3,*` (perpendiculaire). `bis d1,d2,*` (l'autre bissectrice) est fait. **À faire dans la passe de vocabulaire** : relire les autres clés pour y trouver des variantes.
- **Attention au sens de `*`** : l'option `->*` est déjà la forme « croix » d'un point. La documentation a un tableau unique du dernier `*`, par clé.
- **Cercle tangent à un axe** (`circ O,Ox`) : fait, avec les axes pris comme l'horizontale et la verticale par l'origine, comme pour `Point` et `Line`. Les
  axes obliques viendront avec les axes par identifiant (voir la dette « intersection avec les axes par id »).
- **`buildArc`** : fait avec `Arc.ts` (2026-10-29) : trois constructions, `*`, options appliquées par `Draw`, `ParseError`.
- **Riemann** (2026-10-30) : les sommes inférieure et supérieure (minimum et maximum de la fonction dans chaque intervalle, pas seulement à gauche, au milieu ou à droite) ne sont pas offertes ; le
  dernier `*` du parser est libre pour cela. Une somme ne suit pas encore un `Parametric` (une fonction de `x` seulement).
- **FillBetween** (2026-10-30) : l'aire se calcule sur ce qu'on voit (comme un plot), donc l'aire affichée par le label est celle de la partie dessinée. L'aire entre un plot et une droite autre que
  l'axe des x (`fill f,2`) n'est pas offerte ; l'`image` du plot n'est pas prise en compte (l'aire suit la fonction). Une aire entre courbes paramétriques n'est pas offerte.
- **Figures qui sont des « plugins » d'un plot** (fait : `Parametric` le 2026-10-29, `Follow`, `Riemann` et `FillBetween` le 2026-10-30) : chacune a sa figure, son `.types.ts`, son `build*`
  qui lève `ParseError`, et lit ses domaines avec `curveValues` (`parser.curve.ts`) pour accepter `pi`. Reste le passage au dossier par figure (`xxx.build.ts`). Mesures du tracé :
  `.claude/specs/2026-10-29-trace-des-courbes.md`.
- **`Plot.follow`** : renvoie le point de la courbe à l'abscisse du curseur ; le plus proche point de la courbe (le `TODO` qui était dans le code) reste à faire.
- **TikZ d'une courbe** : chaque `Plot` écrit son propre `axis` pgfplots (sans axe, aligné sur le repère). `Graph.tikz()` devra poser `x=<unité>, y=<unité>` sur le `tikzpicture` avec les
  longueurs de `AbstractFigure._tikzUnits()` (1 pixel = 0,75 pt) pour que les courbes tombent sur les autres figures, et demander `pgfplots` dans le préambule. L'`axis` pourrait être
  partagé entre plusieurs courbes plus tard (fichier plus court).
- **Figures à suivre** (2026-10-30) : `Arc`, `Polygon` et `Bezier` sont suivables (`nearestOnArc`, `nearestOnPolygon`, `bezierPolyline`). Un `Arc` en secteur ou en coin carré se suit sur son
  seul arc, un `Polygon` sur son seul contour. `Path` se suit aussi (2026-10-31) : son `d` est relu par `parsePath` (lignes et courbes cubiques), sans `getPointAtLength`. `Riemann` et `FillBetween` (des aires) et `Point` n'ont pas de sens à suivre. `Graph.clear()` appelle `dispose()` : pas testé (`Graph` ne se
  construit pas sous `svgdom`).
- **Bézier** (2026-10-29) : le `ratio` est unique par point (même distance des deux côtés) ; un ratio gauche/droite (le `TODO` de l'ancien `computeBezier.ts`) n'est pas fait. Le `close` ne vaut que
  pour la courbe par les points. Une courbe de Bézier de plus de 4 points de contrôle (degré supérieur) n'est pas offerte.
- **Polygone** (2026-10-29) : champs de label `area` et `perimeter` à ajouter avec les autres champs de label. `Polygon.vertices` donne les sommets d'un polygone régulier (utile pour des intersections ou des
  points sur le polygone, pas encore demandés).
- **Paramètres du graphe** (2026-10-31) : les axes au bord ne concernent que des axes orthogonaux ; pas de repères de deux tailles (grands repères tous les `n`, petits entre, comme une règle). `Graph` et `Draw.refreshLayout` ne se testent pas sous `svgdom` (`document.createElement`) : seuls `buildLayout`, `computeLayout`,
  `Grid`, `Axis` et `Draw._applyLayoutOptions` le sont. Si un environnement DOM (jsdom, happy-dom) entre dans le projet, tester `Graph._makeLayout` et `_fitSvg`.
- **Repère polaire** (2026-10-30) : `COORDINATE_SYSTEM.POLAR` lève `NotImplementedError` dans `Graph._makeLayout` ; un repère polaire (cercles et rayons à la place de la grille et des axes) reste à faire.
- **Axis : graduations** (2026-10-31) : faites pour les axes du graphe et pour une droite graduée du code (`a=axis A,B,pas`). Les nombres sont du texte svg simple (pas de LaTeX rendu par le convertisseur du graphe, pas de taille de police réglable) ; le
  TikZ a de vraies fractions. Pas de graduation d'un axe donné par `slope`, `parallel`… (pas de zéro). Des nombres plus larges que 36 px (beaucoup de décimales) peuvent se toucher.
- **Axes par identifiant** (fait le 2026-10-31) : les contraintes de `Point`, `Line` et `Circle` prennent les axes comme des `Line`. Restent `drag=Ox` / `drag=Oy` et `Graph.follow`, qui gardent
  les chaînes (leur sens, « parallèlement à l'axe », n'est pas celui d'une droite) : à reprendre avec `Draw`.
- **Constructions d'arc écartées** : le cercle et deux points (`arc c,A,B`) ; l'arc par trois points de l'arc (il faudrait une autre clé, `arc A,B,C` est déjà l'angle).
- **Position du label** (2026-10-29) : `Label.alignementGiven` distingue la position demandée de la position par défaut ; seul `Arc` s'en sert. Les autres figures gardent
  `br` par défaut : à reprendre figure par figure (une droite, un polygone…) avec l'analyse de `Label.ts`.
- **Intersections à plusieurs points** (2026-10-31) : `X=inter d,c` donne deux points `X1` et `X2`, et on n'en veut parfois qu'un. Deux pistes : un moyen de n'afficher qu'un des
  points, ou, dans le parser, rappeler une figure déjà définie pour lui appliquer des options (`X2->red,size=5` : « prends `X2` et applique-lui ces options »). La seconde demande
  que `Draw` accepte une ligne sans clé qui ne nomme qu'une figure existante.
- **`Plot.follow`** (2026-10-31) : il utilise `evaluate` à l'abscisse du curseur, donc le point file quand la courbe est presque verticale (une même variation de x donne un grand écart de y). `Path.follow`
  cherche le point de la courbe le plus proche du curseur (`nearestOnPolyline` sur un tracé échantillonné), ce qui est plus régulier ; à comparer visuellement, puis à reprendre pour `Plot` et `Parametric`.


## 2026-11-03 : figure ellipse

- **Contexte** : un `TODO: ajouter l'ellipse` était en tête de `parser.config.ts`, retiré du code.
- **Ce qui manque** : une figure `Ellipse` (suivre « Créer une nouvelle figure » du guideline) : clé de la syntaxe, config, contraintes, `tikz()`, page du guide.
