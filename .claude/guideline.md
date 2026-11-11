# workflow-instructions

## Processus de modification du code

Avant toute modification de code, suivre ce processus :

### Étape 1 : Analyse et questions

- Analyser la demande, identifier les ambiguïtés et les choix à faire
- Poser TOUTES les questions nécessaires en une seule fois, avant de proposer un plan
- Ne pas passer à l'étape suivante tant que les questions n'ont pas de réponse

### Étape 2 : Plan préliminaire des modifications

Présenter un plan numéroté : fichiers modifiés (nature exacte de la modification), changements de code importants
(ancien → nouveau), risques identifiés, tests à exécuter.

### Étape 3 : Validation et exécution

- Attendre une validation explicite du plan ("oui", "ok", "valide", "go", "procède")
- Si des ajustements sont demandés, retourner à l'étape 2
- Une fois validé, exécuter et signaler chaque étape complétée

### Étape 4 : Vérification post-modification

- Tant que la tâche n'est pas terminée : tests ciblés **en mode rapide** (`npx vitest run --mode quick <fichiers>`)
- Un test rapide rouge est un échec à investiguer, jamais à relancer jusqu'au vert
- Quand la dernière modification de la tâche est appliquée : `npm run test` (mode normal) et `npx tsc --noEmit` sur les fichiers touchés
- Si tout passe, confirmer la fin de la tâche, afficher le tableau des tâches restantes (sans la tâche résolue) et demander la suivante

### Clôture d'un fichier (`file-analyse`)

- À la fin de chaque tâche, demander s'il reste des items pour le fichier. S'il n'en reste plus (ou si l'utilisateur
  passe au suivant), le fichier est **validé** : exécuter la **vérification complète** (`npm run test:full`,
  `npx tsc --noEmit -p tsconfig-build.json`, `npm run build` si l'API publique a bougé)
- Ne pas déclarer un fichier validé sans cette vérification

### Étape 5 : Préparation de la prochaine tâche

Afficher le tableau des tâches restantes, demander laquelle traiter, retourner à l'étape 1.

## Tâches restantes

| ID | Titre | Description courte |
|----|-------|--------------------|
| P1 | ...   | max 10 mots        |
| A1 | ...   | max 10 mots        |

**Quelle tâche veux-tu traiter ? (réponds avec l'ID, ex: P1)**

## Enregistrement des conventions et de l'architecture

Toute information d'architecture, de convention ou de structure repérée doit être consignée :

1. dans ce fichier (section « Conventions »),
2. dans la mémoire persistante (fichier dédié + ligne dans `MEMORY.md`).

Une documentation détaillée peut être créée dans `.claude/specs`.

## Enregistrement des breaking changes

Tout breaking change (renommage d'API publique, changement de signature ou de sémantique observable, suppression)
est ajouté à `.claude/docs/breaking-changes.md` dans la même session que le changement. Les changements de
sémantique silencieux comptent, ainsi que la syntaxe du parser (le guide, `docs/guide/`) : elle fait partie de l'API.

## Parser et figures

- Les figures (`Point`, `Line`, `Label`…) reçoivent des **valeurs explicites** : objets, configs typées, unions. Les mini-langages du
  parser (`@` dans un texte de label, `couleur/opacité`, tableaux d'options positionnels) sont interprétés par `Draw` et les
  `build*`, qui les traduisent en configs. Une figure n'analyse jamais une chaîne de syntaxe.
- Restent des `string` dans l'API d'une figure les valeurs qui sont naturellement du texte : nom de couleur, motif de pointillés CSS,
  texte LaTeX.
- **Les tirets sont en pixels, jamais en unités** (le zoom rend une taille en unités incohérente) : `dash` seul est `DEFAULT_DASH` (`6 4`), `dash=xs|sm|md|lg|xl` sont traduits en motifs par `DASH_SIZES` (`Draw.options.ts`), `dot` fait 3 px.
- Un label est un `LabelContent` : du texte, ou une liste de morceaux de texte et de champs explicites (`{field, digits}`). Chaque
  figure déclare les champs qu'elle sait calculer (`labelFields()`) ; un champ qu'elle ne connaît pas lève `InvalidArgumentError`.
- **`@` dans un texte de label** (`parseLabelText`, `Label.parser.ts`) : `@nom` ou `@nom.n` (`n` décimales) est le champ de ce nom (`@area`, `@slope`, `@length`, `@radius`, `@perimeter`, `@angle`) ; `@` seul est `defaultLabelField()` de la figure, **la valeur la plus classique, et `null`
  au moindre doute** (droite, cercle, polygone : `@` seul est refusé et le message liste les champs) ; `@@` est un `@` du texte. Une figure sans aucun champ garde son texte tel quel. Un champ sans `.n` laisse `digits` absent : le champ choisit son défaut (`fieldNumber`, 2 décimales ; la pente est
  une fraction TeX quand elle est exacte). Un champ nouveau : `LabelFieldName`, `labelFields()` de la figure, `labelFields` de son entrée dans `*_ITEMS` (suggestions de l'éditeur) et `LABEL_FIELD_DETAILS` (`tsc` échoue s'il manque). La place du label suit son **premier champ** (`_firstLabelField()` :
  `@area` d'un arc au milieu du secteur, d'un cercle au centre, en `mc`).
- **Un label repoussé par une figure** : la position d'un label peut être `>Nom` (`label=A/>O`). La figure garde sa référence (`setLabelReference`, `labelReference`), et `updateLabel()` oriente le label après `moveLabel()` (`_orientLabel` : direction = ancre du label moins `referenceAnchorPoint()` de la référence, `Label.setAway`). Une figure déclare `referenceable` et `referenceAnchorPoint()` (point, centre d'un cercle ou d'un arc, barycentre d'un polygone). La référence **n'est pas une dépendance de redessin** (aucun cycle possible) : `Graph.update` replace seulement les labels qui la suivent. La lettre d'une position dit **de quel côté** de la figure est le label (`ml` : à gauche), et un nombre seul après la position est une distance en unités de l'axe x qui pousse le label plus loin de ce côté (`Label.push`, `labelPush`). Un point qui a une poignée de `drag` écarte son label de `HANDLE_SIZE / 2` (`labelClearance`, remplacée par une distance écrite). Le label d'un cercle est au centre ; celui d'un arc est du côté de sa direction médiane à tout angle (`Label.config.away`).
- **Unité et échelle des longueurs d'un label** : paramètres du graphe `unit=mm` (`LENGTH_UNITS`, `calculus/units.ts`) et `scale=10` / `scale=1/10`, gardés dans `IGraphConfig.measure` (lue en direct par les figures, comme le reste de la config). Ils ne touchent ni au dessin, ni aux axes, ni aux coordonnées, ni à
  `unitX` / `unitY` (taille réelle en cm) ; une unité ne donne pas d'échelle, ni l'inverse. Une figure écrit ses longueurs par `fieldLength(valeur, digits, measure, format, puissance)` (`scale^puissance`, unité²pour une aire) et son angle par `fieldAngle` (toujours `°`) ; ne sont **pas** mesurés : `slope`,
  `coordinates`, et l'aire sous une courbe (`FillBetween`, `Riemann`), dont l'axe `y` n'est pas forcément une longueur. Une fonction de champ reçoit `format: {tex}` (le `asHtml` du label) : `60°` / `60^\circ`, `5 mm` / `5\,\mathrm{mm}`, `3/2` / `\frac{3}{2}`.
- Les options d'une figure (après le `->`) sont appliquées par `Draw`, pas par le `build*` : le `build*` ne lit que la définition. Les
  fonctions qui appliquent les options d'une figure (`applyPointShapeOption`) vivent avec son `build*`, et lèvent `OptionError`.
- **Le registre des options** (`Draw/Draw.options.ts`) est une table nom d'option vers `OptionHandler` (`(figure, option, context)`) : pas de `switch`. Les options
  communes (apparence, visibilité, label, animation, `drag`) y sont ; chaque figure exporte la table des siennes (`POINT_OPTIONS`, `ARC_OPTION_HANDLERS`, `BEZIER_OPTION_HANDLERS`,
  `AXIS_OPTION_HANDLERS`, `GRID_OPTION_HANDLERS`, de type `FigureOptionHandler`) et le registre les joint (un nom en double lève au chargement). Une option inconnue est une
  `OptionError`, un `InvalidArgumentError` d'une figure devient une `OptionError`. Les valeurs par défaut du graphe (`default.label`, `default.points`) sont ajoutées par `withDefaults`
  (pure, ne change pas les options reçues), pas par mutation. Ce qui touche au dessin vit dans `Graph` ou la figure (`Graph.handle`, `AbstractFigure.hideShape`), pas dans `Draw`.
- **Les axes `Ox` et `Oy`** sont des `Axis` (donc des `Line`) : une contrainte qui accepte une droite les accepte, sans cas particulier ni chaîne. `Draw` les ajoute aux figures qu'un `build*` peut nommer (`_namedFigures`), et aucune figure ne peut porter ces noms.
- **Les axes `Ox` et `Oy`** sont des `Axis` (donc des `Line`) : une contrainte qui accepte une droite les accepte, sans cas particulier ni chaîne. `Draw` les ajoute aux figures qu'un `build*` peut nommer (`_namedFigures`), et aucune figure ne peut porter ces noms.
- **Lignes ignorées** (`readCode`, `Draw.lines.ts`) : une ligne vide, une ligne en `%` (commentaire, ligne entière seulement) et une ligne en `$` (pour un autre consommateur du même code, comme les paramètres de Scolcours ; PiDraw l'ignore mais ne la tient pas pour un commentaire) sont sautées et comptées dans `number`.
  L'éditeur les distingue (`comment` / `tok-comment`, `meta` / `tok-meta`). `readCode` n'expose ni l'une ni l'autre : un consommateur relit son propre texte.
- **Une grille ou un axe écrit dans le code** (`g=grid`, `a=axis A,B`) est une figure ordinaire sans effet sur le graphe ; les paramètres (`grid`, `axis`) règlent le graphe lui-même. Ils partagent le vocabulaire : pas, `subgrid`, `ticks`, `numbers`
  (`first` est le repère d'indice +1, `n/first` ajoute les multiples de `n`). `Graph.axes` sont les droites `Ox` et `Oy` (pour les constructions), `Graph.drawnAxes` ce qu'on voit (au bord de la fenêtre quand l'origine est dehors).
- **L'étendue d'un axe** : `range=-10:10` (ou `range=10`, pour `-10:10`) est une option d'axe, pour `axis`, `axisX`, `axisY` (`axisY->range=-10:10,,axisX`) et pour une droite `a=axis A,B->range=…`. `axisY=10` est déjà le **pas** de la graduation : l'étendue n'est jamais la valeur de l'entrée. L'intervalle est en unités de l'axe, **mesuré depuis son zéro**
  (`{min, max}` dans `IAxisOptions.range` et `IAxisDisplay.range`, lu par `readInterval` comme la fenêtre) et s'ajoute aux bords de la fenêtre et à `padding` : `Axis._place` rogne le segment par `insetEnds`, puis `clampToRange` (pure, `Axis.constraints.ts`) le borne ; un intervalle sans intersection n'est pas dessiné (`_setDefined(false)`). La flèche, la graduation et `tikz()` partent des extrémités
  bornées. Un axe sans zéro (`slope`, `parallel`) refuse `range` (`InvalidArgumentError`). Dans les paramètres, `axisX` / `axisY` écrit **après** `axis` l'emporte sur lui pour son axe. Une option d'axe nouvelle : `AxisOption`, `splitAxisOptions` (si elle vaut dans les paramètres), `AXIS_OPTION_HANDLERS`, `OPTION_DETAILS` (autocomplétion), un exemple dans `graph.md` et `grids-axes.md`.
- **Les paramètres du graphe** (`parameters` de `Draw` : `x=-10:10,axis,grid`) sont lus par `buildLayout.ts` (pur, testé), pas par `Draw`. Une entrée de décor (`axis`, `grid`…) accepte des options après `->`, qui courent
  **jusqu'à une double virgule `,,`** ; `Draw.refreshLayout` les donne aux axes et à la grille (`_applyLayoutOptions`). Une clé inconnue ou supprimée est une `ParseError`. La géométrie (taille réelle en cm, origine, vecteurs des axes) est dans
  `calculus/computeLayout.ts`. `Axis` et `Grid` y sont des figures du graphe (`Graph.axes`, `Graph.mainGrid`), hors de `figures` ; depuis le code ce seraient des objets sans effet sur le graphe.
- **Une clé par sorte de figure** (`poly` : `A,B,C`, `A,4,5`, `A,B,5` et un dernier nombre pour l'étoile `{n/k}`, sans `*` : un nombre en plus dit déjà comment) (`circ`, `line`, `bis`…) : la clé dit ce qu'on fait, les valeurs (leur nombre et leur type) disent
  comment, et un **dernier argument `*`** (`ALTERNATIVE`, `isAlternative` de `parser.common.ts`) choisit la forme alternative de la
  construction (`circ A,B,C,*` : inscrit ; `dpt A,d,3,*` : perpendiculaire). Seul `*` est accepté ; pas de mot propre à chaque clé
  (`bis d1,d2,*` : l'autre bissectrice). Le symbole n'est écrit qu'une fois, dans `ALTERNATIVE` : les messages d'erreur, `parser.config.ts`
  et les tests l'utilisent, jamais un `'*'` écrit en dur. Pour un arc (`arc B,A,C,*`), c'est l'autre arc entre les mêmes directions (sens horaire).
- **Le label d'une figure** : le `Label` garde son élément svg (`setLabel` écrit le texte dedans ; un label caché le reste) et ne se redessine que si quelque chose a changé (`move`). Sa rotation (`rotate`, `autoRotate` pour
  une droite) est autour de l'**ancre**, pas de son centre : un label à côté du segment (`bc`, `tc`) reste de son côté quand il tourne. Un label HTML sans `texConverter` écrit son texte comme texte. La figure pose l'ancre dans `moveLabel()`. Si elle choisit aussi un alignement, elle ne l'écrit que si
  `label.alignementGiven` est faux, pour ne pas écraser la position demandée par l'utilisateur (`label=θ/tl`). `Draw` ne passe un alignement
  à `Label.position` que s'il est écrit dans le code.
- Les **raccourcis de syntaxe** d'une figure (`A(3,4)`, `d=AB`, `d=AB.`, `f(x)=…`) sont des fonctions pures de son `build*`
  (`parsePointShorthand`, `parseLineShorthand`) qui renvoient la forme standard (`A=pt 3,4`), ou `null` si le texte n'est pas leur
  raccourci, et lèvent `ParseError` s'il l'est mais est mal formé. `Draw._parseKeyCode` ne fait que les enchaîner. Reste à déplacer :
  `_parseKeyCodePlot` (avec `Plot.parser.ts`).
- Le fichier `<Figure>.parser.ts` d'une figure à plusieurs builders (le point : `buildPoint` et `buildIntersection`) les regroupe. Les fonctions
  gardent leur nom `build*`. Seuls les fichiers `*.parser.ts` (et `*.syntax.ts` des thèmes) ont le droit d'importer `src/parser/` ; `Line.ts`
  n’importe plus rien de ce dossier.
- Les figures reçoivent des valeurs explicites, y compris pour l'apparence : une couleur avec opacité est `{color, opacity}` (`fill`, `stroke`), un marqueur `{side, size, shape}`
  (`mark`), un label `addLabel(contenu, {asHtml, texConverter})`. Les chaînes `'red/0.5'`, `mark=end/20` et le nom des axes (`Axes.X`, `Axes.Y`, jamais `'Ox'` écrit en dur)
  sont la syntaxe du parser, que `Draw.options.ts` traduit.

## Dette technique

Un point connu, accepté pour l'instant et à traiter plus tard est consigné dans `.claude/docs/dette-technique.md` (date, contexte,
ce qui manque), au lieu d'un `TODO` dans le code.

## Conventions TypeScript

- TypeScript strict (`strict`, `noImplicitAny`, `noImplicitOverride`), ES2022, modules ESNext
- Méthodes de classe en méthodes classiques (`foo() {}`), pas en arrow functions
- Pas de `public` explicite (défaut TS) ; on n'écrit que `private` / `protected` / `readonly`
- Types, interfaces et enums exportés en PascalCase
- Tout type cité par une signature publique est exporté (TypeDoc ne doit produire aucun avertissement)
- **La surface publique est `src/index.ts`**, et `tests/index.test.ts` en donne la liste exacte à l'exécution (une valeur ajoutée ou retirée fait échouer le test) ; `tests/index.types.test.ts` compile les types principaux depuis `'../src'`. Les figures sont exportées en **types seulement** (on les crée par `PiGraph.create`
  ou par `PiDraw`, jamais par `new`). Un outil de calcul interne (`mathLine`, `NumExp`) n'est pas de l'API : son getter public est `@internal`. `typedoc.json` exclut `protected` et traite les avertissements comme des erreurs : un `{@link}` ne cible jamais un symbole interne ou `protected`, on écrit son nom en code.

## Conventions de tests et de commentaires

- **Pas d'identifiants de tâche** (`P1`, `A2`, `T3`, `D4`…) dans le code : ni dans les titres de tests, ni dans les
  commentaires ou le JSDoc. Un titre de test décrit le comportement vérifié ; un commentaire explique le pourquoi.
- Tests dans `tests/`, structure miroir de `src/` (`src/figures/Line.ts` → `tests/figures/Line.test.ts`)
- Pas de `test.todo`, `describe.todo`, `it.skip`, `describe.skip`, ni de test sans assertion (un `console.log` n'est pas un test)
- Chaque option de configuration d'une figure / du parser a au moins un test de son effet
- Les tests portent sur la **sortie** (attributs SVG, coordonnées calculées, objets parsés), pas sur la structure interne
- Modes : `npm run test:quick` (itération), `npm run test` (normal), `npm run test:full` (vérification finale ; délai 30 s par test)
- Nettoyer au fil des analyses : quand un `file-analyse` touche un fichier source, vérifier le test miroir et retirer
  le scaffolding obsolète dans la même session

## Organisation de `src/`

- `src/calculus/` : les maths pures (aucun import de svg.js), un fichier par genre (`numbers`, `geometry`, `coordinates`,
  `computeLine`, `computeQuadratic`, `computeBezier`, `NumExp`), importés par `"../calculus"` (`index.ts` du dossier).
- Nommage des fichiers de `calculus/` : `compute<Élément>.ts` pour ce qui calcule la géométrie d'un élément à dessiner (`computeLine`,
  `computeQuadratic`, `computeBezier`) ; un nom de genre pour les outils (`numbers`, `geometry`, `coordinates`, `NumExp`). Le nom du
  fichier est celui du domaine, pas forcément celui d'une fonction exportée. Pas de `line.ts` : trop proche de `figures/Line.ts`.
- `src/svg/` : les helpers qui créent ou lisent des éléments svg.js (aujourd'hui `marker.ts`). Un helper qui touche au DOM n'a
  pas sa place dans `calculus/`.
- Tests en miroir : `tests/calculus/`, `tests/svg/`.
- `src/figures/<Figure>.types.ts` : les types de la config d’une figure (contraintes, options, types cités par ses signatures).
  Uniquement des `type` et `interface` (aucune valeur à l’exécution) ; la figure, les parsers et `Graph` les importent avec
  `import type`. Exportés par `index.ts` (`export type *`). Les types communs restent dans `pidraw.common.ts` (`XY`, `Domain`, `Exclusive`, `IGraphConfig`, `IFigureContext`, `LayerName`, `Axes`, `CoordinateSystem`) ; ceux du graphe (événements, affichage, config du constructeur, `Layers`) sont dans `src/Graph.types.ts`, ceux de l'animation dans `src/animate/Animate.types.ts` (le cœur importe ce fichier de types, jamais `Animate.ts`). `BuildResult` (ce que renvoie un `build*`) est dans `parser/parser.types.ts`. Les noms exportés sont en PascalCase, valeurs d'énumération en majuscules.
- `src/figures/<Figure>.constraints.ts` : pour une figure à contrainte unique, la résolution des contraintes sous forme de fonctions
  pures (valeur de la contrainte + config du graphe vers le résultat) : la table de résolveurs, `constraintOf` et ses aides. Aucun
  accès au SVG ni à `this`. Pas de fichier de ce genre pour les figures sans table de contraintes.
- **Un dossier par figure** (fait le 2026-10-31, voir « Rôle de chaque fichier d'une figure ») : `src/figures/<Figure>/<Figure>.ts`, `.types.ts`, `.constraints.ts` (si la figure a une table de
  contraintes) et `.parser.ts` (le `build*` de la figure, ses raccourcis et ses `apply*Option`). Tests en miroir : `tests/figures/<Figure>/<Figure>.test.ts` et
  `<Figure>.parser.test.ts`. Pas de `index.ts` par dossier : on importe `./Point/Point`. `Label` y est aussi (il n'hérite pas de `AbstractFigure`, mais il a
  sa config et son parser) et n'importe aucune figure. Restent à la racine de `figures/` : `constraints.ts` (`singleConstraint`, `Exclusive`) ; `Curve/` regroupe
  `Curve.types.ts` et `Curve.constraints.ts`, partagés par les figures qui tracent une fonction. `src/parser/` garde `parser.types.ts` (types seuls : `IParserValues`, `IParserParameters`, `BuildResult`, `FigureOptionHandler`, réglages), `parser.common.ts` (`PARSER_TYPE`, aides communes aux `build*`), `parser.config.ts`,
  `parser.curve.ts`, `parser.interval.ts` et `buildLayout.ts` (les paramètres du graphe, qui ne sont pas une figure).

## Rôle de chaque fichier d'une figure

Chaque type de fichier a un seul rôle ; ce qui sert à plusieurs figures vit dans un fichier partagé, pas dans celui d'une figure.

| Fichier | Contient | Ne contient pas |
|---|---|---|
| `<Figure>.types.ts` | `type`, `interface`, `enum` de la config (contraintes, options) et des types cités par la signature publique | de valeur à l'exécution, de fonction |
| `<Figure>.constraints.ts` | fonctions pures : validation de la config (`InvalidArgumentError`), table de résolveurs, `constructionOf` / `constraintOf`, valeurs par défaut de la config (`DEFAULT_STEP`), bornes de validation (`MAX_RECTANGLES`) | svg, `this`, `Graph`, constante de dessin |
| `<Figure>.parser.ts` | de la syntaxe vers la config : `build<Figure>`, raccourcis (`parse…Shorthand`), `apply<Figure>Option` (`OptionError`) ; seul fichier qui importe `src/parser/` | de dessin, de maths (elles vont dans `calculus/`) |
| `<Figure>.ts` | la classe : dessin svg, constantes de dessin (`MIN_SPACING`, écarts en pixels), label, `follow`, `tikz()` | de lecture de syntaxe, de validation longue (elle va dans `.constraints.ts`) |

- Une aide utilisée par plusieurs figures n'appartient à aucune : `figures/constraints.ts` (`singleConstraint`, `constraintIn`, `resolveIn`, `positions`, `positionList`, `radiusOf`), `Curve/Curve.constraints.ts` (options, domaine et
  compilation des figures qui tracent une fonction), `src/parser/parser.step.ts` (les pas), `parser.common.ts` (le reste du vocabulaire du parser), `calculus/` (les maths).
- Un parser n'importe jamais un autre parser, une contrainte jamais le parser d'une figure.
- Le texte de TikZ vient de `AbstractFigure/AbstractFigure.tikz.ts` (fonctions pures) ; la figure appelle les helpers `_tikz*` d'`AbstractFigure`.
- Les constantes de dessin communes à plusieurs figures se règlent par un champ de `AbstractFigure` que la figure surcharge (`_labelGap`, 8 par défaut), pas par une copie dans chaque fichier.

## Créer une nouvelle figure

Une figure `Xxx` (par exemple `Node`, `Edge` : `.claude/specs/2026-10-28-figures-node-edge.md`) suit toujours ce chemin :

1. **Dossier** `src/figures/Xxx/` avec `Xxx.ts`, `Xxx.types.ts`, `Xxx.constraints.ts` et `Xxx.parser.ts`, même presque vides. Une figure sans table de contraintes n'a pas de `.constraints.ts`
   vide : les valeurs qu'elle valide y vont quand même (`checkXxx`).
2. **Types** : la config (`IXxxConfig`) en union exclusive si la figure a plusieurs constructions (`Exclusive<T>`), les options communes en intersection. Tout type cité par une signature publique est exporté.
3. **Contraintes** : `checkXxx(config, name)` lève `InvalidArgumentError` ; avec plusieurs constructions, une table `RESOLVERS` typée, `constraintIn(RESOLVERS, config, name, 'xxx')` et `resolveIn(RESOLVERS, key, config, graph)`.
4. **Classe** : `class Xxx extends AbstractFigure`. Le constructeur lit et valide la config **avant** `super` (rien dans le svg en cas d'erreur), puis `_makeShape()` et `computed()`.
   `computed()` ne déroule que des étapes (une méthode privée par cas). Implémenter `moveLabel()`, `tikz()` (compilé avec `pdflatex`), `labelFields()` si la figure a des champs de label ;
   `follow` et `override readonly followable = true` si un point peut la suivre ; un cas dans `animate/animation.ts` si elle s'anime ; `dispose()` si elle garde un écouteur hors de son groupe.
5. **Parser** : `buildXxx(item, figures)` renvoie `{create: 'xxx', config}` et lève `ParseError` ; les options (après `->`) sont appliquées par `Draw` avec `applyXxxOption` (`OptionError`) ; les raccourcis sont des fonctions pures.
6. **Enregistrement** (la table des clés de la figure, `XXX_ITEMS` de `Xxx.parser.ts` : `name`, `description`, `forms`, `summary`, `build`, jointe dans `PARSER_CONFIG`) : une ligne `xxx: this._maker(Xxx, LayerName.…)` dans `Graph.create` (calque, `_figures[name]`, nom contrôlé avant la construction : jamais deux figures de même nom, ni un nom du décor) et un cas dans `tests/Graph.test.ts` ; `PARSER_TYPE` dans `parser.common.ts` ; une entrée de `PARSER_CONFIG` (`parser.config.ts`) ; la table des options de la figure dans le registre de `Draw.options.ts` ; les exports de `src/index.ts`
   (`export type * from "./figures/Xxx/Xxx"` et `.types`).
7. **Tests** en miroir : `tests/figures/Xxx/Xxx.test.ts`, `Xxx.parser.test.ts` (et `Xxx.constraints.test.ts` s'il y a de la logique propre), une ligne `Draw` de bout en bout si la syntaxe est neuve.
8. **Documentation** : la page du guide de la figure, `docs/guide/` (syntaxe, exemples `pidraw` vérifiés par `docs:check`, bloc « Mistakes »), `.claude/docs/breaking-changes.md`, `.claude/docs/file-analyse-log.md`, la section « Fait pour » de TikZ et la liste des figures suivables de ce fichier, une note de mémoire.

## Éditeur CodeMirror (`src/codemirror/`)

Spec et intégration dans Scolcours : `.claude/specs/2026-11-04-coloration-codemirror.md`.

- `src/codemirror/` est une **entrée de build à part** (`pidraw/codemirror`, comme `pimath/codemirror`) : il lit la bibliothèque, la bibliothèque ne l'importe jamais (règle `core-not-to-codemirror` de dependency-cruiser). `@codemirror/*` et `@lezer/*` sont externes et
  déclarés en `peerDependencies` optionnelles ; ce sont des `devDependencies` ici, pour les tests.
- **Le vocabulaire est lu dans le parser** (`readVocabulary()` : `PARSER_TYPE`, `optionNames()`, `LAYOUT_KEYS`, `PARSER_COLOR_VALUES`), jamais recopié. Une nouvelle clé de figure doit avoir sa description dans `KEY_DETAILS` (typé par `PARSER_TYPE` : sinon `tsc` échoue) ; une
  nouvelle option ou un nouveau paramètre, sa description dans `OPTION_DETAILS` / `PARAMETER_DETAILS` (les suggestions fonctionnent sans, mais sans texte).
- **Les couleurs ne sont jamais dans le paquet** : des classes `tok-keyword`, `tok-string`, `tok-number`, `tok-comment`, `tok-function`, `tok-class` (les mêmes que `pimath/codemirror`) et `tok-invalid`. La page les colore. Les noms des figures : `cm-pidraw-def|ref|dup`, couleurs par `--pidraw-ref` et `--pidraw-dup`.
- Un mot n'est une clé de figure que **juste après le premier `=` et suivi d'un espace** (`t=tan f,A` : `tan` est une clé, `f(x)=tan(x)` : une fonction).

## Contexte des figures et imports

- Une figure ne dépend **jamais** de la classe `Graph` (cycle d'imports) : elle reçoit un `IFigureContext` (`rootSVG` + `config` vivante)
  par son constructeur, `Graph` se passe lui-même. Pas d'attribut `data-*` ni de `remember` pour transporter de la configuration.
- Un import qui ne sert qu'aux types s'écrit `import type {A, B} from "..."`, **jamais** `import {type A} from "..."` : avec
  `verbatimModuleSyntax`, ce dernier reste un import d'effet de bord et recrée le cycle (`Class extends value undefined`).
  `dependency-cruiser` ne voit pas ce cas : `tests/modules.test.ts` charge chaque module de `src/` en premier.

## Classes CSS des figures

- Le groupe svg d'une figure porte la classe de sa sorte (`pidraw-point`, `pidraw-line`, `pidraw-axis`…) : chaque figure la déclare par `protected override get _className()` (un **getter** : le constructeur d'`AbstractFigure` la lit avant l'initialisation des champs de la sous-classe), puis les classes de l'option commune `class=a/b` (`setClasses`, `classes`). `resetStyle()` retire celles de l'utilisateur, pas celle de la sorte. TikZ les ignore. Aucun style visuel dans la bibliothèque : une page les habille en CSS.

## Couleur et fond d'un label

- `labelColor=red` (texte, sans opacité) et `labelFill=white/0.8` (fond) valent pour `label` et `tex`, dans n'importe quel ordre : la figure garde le style (`setLabelStyle`, `_labelStyle`), l'applique à chaque nouveau `Label` (`addLabel`) et le vide dans `resetStyle()`. **Le texte ne suit pas le trait** (`color`) de la figure : changer cela casserait les dessins existants, et un nœud a trois couleurs indépendantes (trait, fond de la forme, texte).
- Le fond est un `<rect>` frère placé avant le texte, de la taille mesurée plus `LABEL_PADDING` (3 px), pour un `<text>` comme pour un label HTML ; il suit le déplacement, la rotation, `hide`/`show` et `remove()` du label (jamais `label.shape.remove()`). `Label.size()` est la mesure, publique : un test la remplace (`vi.spyOn(label, 'size')`), `svgdom` ne mesure rien.
- **Un label d'arête posé sur le trait (`/mc`) y fait un trou** (`Edge.cutsLine`, `_updateCut`) : un `<mask>` de `defs` appliqué au tracé (blanc partout, un rectangle noir de la taille du label + `LABEL_PADDING`), jamais une couleur de fond (la page derrière est inconnue). Il vaut quand le label est visible, que sa position `mc` est écrite et que **aucun `labelFill` n'est écrit** (`_labelStyle.fill`) ; `labelFill=none` / `transparent` / opacité 0 ne dessine ni boîte ni trou (`Label._drawBackground`). Le masque est hors du groupe : `Edge.dispose()` le retire. TikZ n'a pas de masque : `_tikzLabelConfig` donne un fond blanc. `Label.bounds` donne le centre et la taille du texte. Limite : un label montré ou caché sans `updateLabel()` laisse le trou périmé (`dette-technique.md`). `applyLabel` appelle `figure.updateLabel()` après `position()`, pour que la figure place le label selon la position écrite.
- **Taille du texte** : `labelSize` (`xs`…`xl` relatifs à la police de la page : 0.7, 0.85, 1, 1.25, 1.5 em ; un nombre = pixels ; une longueur `px|pt|em|rem|%`) est une **grammaire fermée** (`parseLabelSize`, `Label.constraints.ts`) : une chaîne CSS libre n'aurait pas d'équivalent TikZ, et une apparence sans équivalent n'est jamais ignorée. `Label.config.size` garde la chaîne CSS, `_labelStyle.size` suit le même chemin que les couleurs. TikZ : `font=\small` ou `\fontsize{…}{…}\selectfont` (`tikzLabelFont`) ; `em`, `rem` et `%` sont relatifs à 10 pt.
- TikZ : `text=`, `fill=`, `fill opacity=` et `inner sep=` (la même marge) sur le `\node` ; `tikzLabelDefinitions` donne les `\definecolor`, que `_tikzLabel` écrit avant le nœud.

## Nœuds (`node=` d'un point)

- Un nœud n'est pas une figure : c'est un `Point` qui a `node` (`rect`, `round`, `diamond`, `circle`), une boîte autour de son label **à la place de sa marque** (`o`, `s`, `*`, `size` : exclusifs, `InvalidArgumentError`, `OptionError` côté `Draw`). Les maths (taille, contour, ancres) sont pures, dans `calculus/computeNode.ts` ; `Point.ts` dessine (`_makeShape`, `_drawNode`), mesure par `label.size()` et se redessine dans `moveLabel()` quand la taille change. La boîte est **derrière** le label (`shape.back()`), le label est centré (`mc`). `Point.boundaryPoint(from)` (le contour, le point lui-même sans `node`) et `anchorPoint(place)` servent aux figures qui s'y accrochent (`Edge`).
- **Les 9 places** `A.tl`…`A.br` sont de vrais `Point` cachés, de contrainte `anchor: {node, position}` : le graphe ne suit une dépendance que par une figure dans la config (`figuresIn`), donc jamais un objet `{x, y}` calculé. `Draw._ensureAnchors` les crée avant le `build*` de la ligne qui les nomme la première fois (la ligne les possède : `Draw.refresh` les défait avec elle) ; un point sans `node` donne une `ParseError`. Un nom de place s'écrit comme une valeur, jamais comme une figure à part.
- `withDefaults` ne donne ni la forme ni l'invisibilité de `default.points` à un nœud. Cas limites connus : `.claude/docs/dette-technique.md`.
- **`clear()`, `hideShape()` et `showShape()` passent par `_isLabelPart`** : le label **et son fond** (`<name>-label`, `<name>-label-background`) ne sont pas la forme.

## Figures qu'un point suit

- Une figure qui redéfinit `follow(x, y)` (le point de la figure le plus proche d'une position en pixels) se déclare aussi
  `override readonly followable = true` : `Follow` n'accepte que ces figures (aujourd'hui `Line`, `Circle`, `Arc`, `Polygon`, `Bezier`, `Edge`, `Path`, `Plot`, `Parametric`). Une figure qui garde un écouteur hors de son groupe svg le
  retire dans `dispose()`, que `Graph.clear()` appelle.

## Contrôleurs du graphe (animation, zoom, diapositives)

Design : `.claude/specs/2026-11-03-modules-de-controle.md`. Un module qui agit sur le dessin depuis l'extérieur est un **contrôleur** : le programme le crée avec le graphe (`new Animate(graph)`) et il s'attache par
`graph.attach(this)` (contrat `IGraphController`, `Graph.types.ts` : `dispose()`, et `onFiguresRemoved?(names)` appelé après tout retrait de figures, `remove` et `clear`). Le graphe n'importe jamais un contrôleur, un thème n'en importe jamais un autre
(dossiers `src/animate/`, `src/zoom/`, `src/slides/`, chacun avec son `.types.ts` que le cœur peut importer) : deux règles de `dependency-cruiser` le font respecter (`npm run dependencies:check`). Un second contrôleur de la même classe sur un graphe lève `InvalidArgumentError`.
Aucune interface dans `src/`. Un contrôleur est un `EventTarget` (`on` / `off`) : une page qui montre des boutons écoute ses événements au lieu de tenir sa propre idée de l'état. `Animate` : `start` (reprend après une pause), `pause`, `stop` (remet les points), `restart`, `dispose` ;
événements `start`, `pause`, `end`, `stop`.
`Zoom` : `zoomIn`, `zoomOut`, `zoomTo`, `moveOrigin` (pixels), `reset`, `window`, `scale` ; `allow` (`both`, `zoom` : l'origine est le point fixe, `move`) dit ce qu'il peut faire et un appel refusé lève `UnsupportedOperationError` ; événements `change` et `navigation`. Les gestes (`gestures: true`) : Ctrl + molette hors mode ; dans le mode
de navigation (`navigating`), un calque transparent pris au-dessus du dessin capte la souris et les doigts (glisser, molette, pincement), ce qui évite tout conflit avec le glisser des points ; les gestes sont regroupés par image (`requestAnimationFrame`). Un `updateLayout` garde les points déplacés (tirés, animés) à leurs coordonnées (`Point.isMoved`), et prévient les contrôleurs (`onLayoutChanged`).
`Slides` : `next`, `previous`, `first`, `last`, `goto(n)`, `current`, `count` (la plus grande étape citée par une figure, au moins 1, ou `{count}`), événement `change`. **L'étape vit dans `Slides` seul** : le cœur ne connaît que, par figure, l'entrée `controls.slide` (`ISlideSet`, écrite par `setSlide`, qui la valide avec `checkSlideSet`) et une visibilité par raisons nommées (`setHiddenBy('slide', …)`, distincte de `hide()` et de « pas de position » ; `_tikzShown` la lit).
Une figure qui reçoit une entrée de `controls` (`setControl`) prévient son contexte (`IFigureContext.figureChanged`), le graphe relaie (`IGraphController.onFigureChanged`), `Slides` recompte et applique : une figure faite après le `Slides` est montrée ou cachée tout de suite, et sans `Slides` le paramètre est ignoré. Syntaxe : option `slide=<2-5,7,9->` (ensemble de PiParser, `Slides.syntax.ts` déclare `slide: 'set'`), commandes `@pause` / `@pause=Titre`, `@slides` / `@slides=<…>` et `@title,N=Titre` (dans `Slides.syntax.ts` : `Draw.lines.ts` ne les connaît pas) : ce que les commandes donnent à une ligne (`controls`) est un **pliage pur des lignes qui précèdent** (`readCode`), pas un état de `Draw`, donc `Draw.refresh` reste identique à un `Draw` neuf. La poignée `<point>_drag` reçoit l'entrée que le thème déclare transmissible (`handleControls`), donc le `slide` de son point.

## Animations des figures

- L'animation d'un point est `point.controls.animate` (entrée de `controls`, voir « Thèmes »). Elle s'écrit par `setAnimation(figure, animation | null)` (`src/animate/animation.ts`), qui valide `duration`, `delay`, `easing`, `loop` et que la figure est un point
  d'un point à un point (`InvalidArgumentError`), puis appelle `figure.setControl('animate', …)`. Une figure animable un jour (un `Plot` qui se dessine) aura son cas dans `animation.ts` et dans `Animate` : le cœur n'a ni `animatable` ni `_checkAnimation`.
  Le code qui joue l'animation (`Animate`) choisit les figures par leur classe, pas par la forme de leurs propriétés.

## Ce que le dessin demande au programme (`Draw.usage`)

- `Draw.hasDraggable()`, `Draw.uses(clé)` et `Draw.usedControls()` se lisent sur les figures du graphe (`isDraggable`, `figure.controls`), sans état : un balayage de `graph.figures`. Un thème nouveau est couvert dès que sa clé est dans `IControlsFigure`. Une déclaration du graphe sans figure (`@button` non cité, `@slides` seul) n'est pas un usage.
- `Draw` est un `EventTarget` : l'événement `usage` (`IDrawUsage` : `{draggable, controls}`, `IDrawEventMap` dans `Draw.report.ts`) est émis à la fin de `_build` seulement si le résultat diffère du précédent ; le constructeur n'émet pas (aucun écouteur n'existe encore).

## Boutons (`src/buttons/`)

- `@button=id->title=Texte` (titre = `id` s'il manque) déclare un bouton, **au-dessus** des figures qui le citent ; `toggle=id` ou `toggle=id/secondes` lie une figure (`controls.toggle` : `{id, duration, hidden}`). Un `toggle` sur un bouton non déclaré avant sa ligne est une `OptionError` : le `fold` de `@button` est la source, l'option lit l'état des commandes par `IOptionContext.states` (clé du thème dans `THEMES` : `toggle`).
- **Toute durée du code est en secondes** (`animate` : `duration`, `delay` ; `toggle=id/0.5`), jamais en millisecondes ; seul le code interne (`performance.now`, `requestAnimationFrame`) compte en ms.
- `!` sur une ligne qui a un `toggle` veut dire « caché jusqu'au clic », label compris (`hidden: true`, `AbstractFigure.showShape()` annule le `hideShape`) ; sans `!`, la figure est montrée et le clic la cache. Un clic inverse toutes les figures du bouton, chacune depuis son état de départ. `Buttons` (`toggle`, `reset`, `buttons`, `isActive`, événement `change`) cache par la raison `toggle` (`setHiddenBy`) et fond par l'opacité du groupe ; aucune interface dans `src/` (`ButtonsControls.vue` dans la documentation).

## Thèmes : ce que le cœur ne sait pas

Un **thème** (`animate`, `slides`, `zoom`, demain un autre) est un dossier `src/<thème>/` avec son contrôleur, son `.types.ts` et, s'il ajoute à la syntaxe, son `<Thème>.syntax.ts`. **Casser ou retirer un thème ne touche jamais la logique du cœur** : retirer son dossier, sa ligne dans `controls/controls.ts`
et ses exports de `index.ts`. Le cœur tolère les `import type` des `*.types.ts` des thèmes (un fichier de types ne contient aucune valeur à l'exécution).

- **Un seul champ générique sur la figure** : `AbstractFigure.controls` (lecture, `Partial<IControlsFigure>`) et `setControl(key, value | null)` (écriture, prévient le contexte). Aucun getter ni setter par thème (plus de `figure.animate` ni `figure.slide`). La clé est le **nom de l'option** du thème : `animate`, `slide`.
  `IControlsFigure` (`src/controls/controls.types.ts`) liste les entrées, par type seulement. Un thème fournit ses fonctions typées pour écrire (`setSlide`, `setAnimation`, qui valident) et lire (`slideOf`, `animationOf`) ; `setControl` ne valide rien.
- **Ce qui appartient au graphe et non à une figure** (les titres des étapes) suit le même chemin : `Graph.controls` (lecture, `Partial<IControlsGraph>`) et `Graph.setControl(key, value | null)`, qui appelle `onControlsChanged?(key)` des contrôleurs. Une commande donne `graphControls(état)` : `Draw` l'applique après chaque lecture du code
  (`readCode` renvoie `{lines, graphControls}`, calculé sur l'**état final** du pliage : une commande peut être n'importe où). `Slides` lit `graph.controls.titles` à sa création et émet `change` si les titres diffèrent ; un titre ne crée jamais d'étape.
- **Le registre** `src/controls/controls.ts` (`THEMES`, typé par `keyof IControlsFigure` : une entrée sans syntaxe, ou une syntaxe sans entrée, ne compile pas) est le seul fichier qui nomme les fichiers `*.syntax.ts`. `Draw` (options, commandes, poignées), `src/codemirror` (suggestions, coloration) et `index.ts` le lisent ; le cœur,
  les figures et les autres thèmes jamais (règles `core-not-to-themes`, `core-not-to-registry`, `theme-not-to-syntax-layer` de `dependency-cruiser`).
- **`IThemeSyntax`** (`parser/parser.types.ts`) : `options` (table de `OptionHandler`, un nom appartient à un seul thème), `optionTypes` (`'text'` / `'set'` pour PiParser), `optionDetails` et `optionValues` (suggestions de l'éditeur), `commands` (`ICommandSyntax` : `names`, `pattern` pour la coloration, `initial`, `fold`, `defaults`)
  et `handleControls` (entrées que la poignée `<point>_drag` reprend). Une `@commande` est un pliage pur : `fold(état, commande, parser)` sur les lignes qui précèdent, `defaults(état)` donne les `controls` des figures qui suivent, et `Draw` ne les applique qu'à une figure dont la ligne n'a pas l'option du même nom.
- **Nouveau thème** : dossier `src/<thème>/` ; une ligne dans `IControlsFigure` s'il garde quelque chose sur les figures ; `<Thème>.syntax.ts` et une ligne dans `THEMES` s'il ajoute des options ou des commandes ; exports dans `index.ts` (`tests/index.test.ts`) ; exemple dans le guide pour chaque option et chaque forme de commande (`docs:check`) ; ligne dans `.claude/docs/breaking-changes.md`.

## Mise à jour des figures (dépendances)

- Une figure qui en utilise une autre la **garde dans sa config** (`{through: {A: point, B: point}}`, `{intersection: {A: ligne, B: ligne}}`, `{plot}`…). `Graph` en tire les dépendances (`figuresIn(figure.config)`) : aucune figure ne les déclare, et un
  `figure.config = …` les change tout seul (le graphe compare l'identité de `config`). Donc **une figure lit les autres figures par sa config, jamais par leur nom ni par `graph`** ; autrement elle ne serait pas redessinée.
- `graph.update(changed)` redessine les figures qui dépendent de `changed` (une fois, après celles dont elles dépendent) et replace le label de `changed`, qui n'est pas redessiné. Tout code qui déplace une figure (glisser, animation) le
  dit à `update` : `draw.graph.update([point])`. `update()` sans argument redessine tout (premier dessin, nouvelle échelle).
- `graph.update` renvoie `{updated, total}` (figures atteintes sur figures du graphe) et `dragmove` le porte : un compteur, jamais une comparaison du dessin. Le glisser (`Graph.draggable`) se décrit par des options
  explicites (`along`, `grid`, `bounds`, `follow`), appliquées par `constrainDrag` (`calculus/computeDrag.ts`) ; `Draw` traduit `drag=…` en ces options, `Graph` ne lit aucune chaîne de syntaxe.
- **`Ox` et `Oy` sont stables** : `Graph` les crée une fois et `updateLayout` leur redonne droite et style (`resetStyle()` puis `config =`) ; les figures qui les nomment gardent donc des objets vivants. Une figure que l'on réutilise avec
  une autre config doit pouvoir être remise à zéro par `resetStyle()` : tout état que le parser ou `Draw` laisse sur une figure (couleur, pointillés, marqueur, label…) y est remis. Le test `tests/Graph.test.ts` qui compare `refreshLayout(p1)` puis `refreshLayout(p2)`
  au dessin d'un graphe neuf avec `p2` le contrôle.
- `AbstractFigure` déclare `abstract get config(): object` : l'objet renvoyé reste le même tant que la figure n'a pas reçu une autre config (comparé par identité).
- Contrôle de non-régression : `tests/Graph.test.ts` compare, sur les exemples de la démo, le svg après `update(point)` à celui après `update()` complet. Une dépendance cachée y fait échouer un exemple. Mesure : `npm run bench`
  (`.claude/specs/2026-10-31-mesure-update.md`).

## `computed()` des figures

- `computed()` est souvent trop long, avec de longues chaînes de `if / else if / else`. À chaque analyse d'une figure,
  l'examiner et le simplifier : une méthode privée par cas (ou par étape), une table de correspondance à la place d'une
  chaîne de conditions, des retours anticipés. `computed()` ne doit plus que dérouler les étapes.
- La simplification ne change pas la sortie : les tests sur le SVG produit servent de filet, à écrire avant de découper si
  la figure n'en a pas.

## Configurations exclusives des figures

- Une figure définie par **une** contrainte parmi plusieurs (`Point` : `coordinates`, `middle`, `projection`…; `Line` : `through`,
  `parallel`, `slope`…; et les autres figures construites de la même façon) type sa config comme une **union exclusive**, pas
  comme une interface d'options facultatives. Une union simple n'interdit pas le mélange : chaque membre déclare les clés des
  autres en `?: never` (type utilitaire `Exclusive<T>`, à partager entre figures).
- Les options communes (`shape`, `size`…) s'ajoutent par intersection : `type IXConfig = XConstraint & { shape?: …, … }`.
- `computed()` choisit la contrainte en cherchant la clé présente dans une table de résolveurs typée
  (`{ [K in keyof Contraintes]: (valeur: Contraintes[K]) => … }`), puis appelle le résolveur : pas de cast, pas de chaîne de `if`.
- Le contrôle reste à l'exécution (le parser fait des `as`, et JavaScript n'a pas le compilateur) : zéro ou plusieurs contraintes
  lève `InvalidArgumentError`. Passer à l'union est un breaking change de types, à consigner.
- Les types cités par une signature publique sont exportés (`PointConstraint`, etc.).
- La contrainte unique d'une config se trouve avec `singleConstraint` (`src/figures/constraints.ts`, partagé), qui lève
  `InvalidArgumentError` pour zéro ou plusieurs contraintes.
- Une figure dont la position n'existe pas (intersection sans solution, deux points confondus) n'est pas dessinée : elle appelle
  `_setDefined(false)` (`visibility="hidden"`, indépendant de `hide()`), ses extrémités ou sa position valent `NaN`, et elle ne
  trace rien. Elle réapparaît dès que sa position revient.
- Une position qui n'existe pas est `nowhere()` (`calculus/geometry.ts`, `{x: NaN, y: NaN}`, un objet neuf à chaque appel) et se teste avec
  `isDefinedPosition(position)` : jamais de copie locale ni de `Number.isFinite(x) && Number.isFinite(y)` écrit à la main.
- Les maths pures d'une figure (bissectrice, médiatrice, équation) vont dans `calculus/` (`compute<Élément>.ts` pour la géométrie
  d'un élément, un nom de genre pour un outil comme `linearEquation.ts`) ; les résolveurs, qui connaissent les figures, restent dans
  `<Figure>.constraints.ts`.

## Export TikZ des figures

- `tikz(): string` est abstraite dans `AbstractFigure` : une figure retourne un **fragment** de commandes (`\draw`, `\node`,
  `\definecolor`), jamais un `tikzpicture` (le `Graph` assemblera l'ensemble et posera l'échelle `x=…cm, y=…cm`).
- Les coordonnées sont en **unités mathématiques**, pas en pixels. Les largeurs et les longueurs en pixels passent en points
  (1 px = 0,75 pt).
- Une figure construit sa géométrie et appelle les helpers de `AbstractFigure` pour le reste : `_tikzDraw(path)` (apparence :
  trait, remplissage, pointillés, marqueurs, avec les `\definecolor` nécessaires), `_tikzLabel(at)` (le label, avec le texte
  courant de ses champs), `_tikzCoordinates(pixels)` (position en unités du repère, 5 décimales), `_tikzLength(pixels)` (longueur
  en points).
- L'export est fidèle au dessin : `_tikzShown()` dit ce qui est montré. Une figure masquée (`hide`) ou invisible (point sans
  position) ne produit rien ; avec `!` seul le label est écrit, avec `?` seule la forme. Pas de remplissage que le dessin n'a pas.
- Chaque forme écrite est compilée avec `pdflatex` avant de valider (MiKTeX est installé) ; les tests comparent la chaîne produite.
- Les couleurs hexadécimales et `rgb()` (`pidraw-rrggbb`) et les noms CSS (`pidraw-green`, teinte de `CSS_COLORS`, `calculus/colors.ts` ; seuls `black`
  et `white` restent natifs) sont définies dans le fragment par `\definecolor` ; `tikzPicture` les regroupe au début du `tikzpicture`, une fois chacune.
  Une couleur hors CSS lève `InvalidArgumentError`, une apparence sans équivalent TikZ aussi : elle n'est jamais ignorée.
- `Grid` et `Axis` (décor du graphe) ont leur `tikz()` comme les autres figures : `Graph.tikz()` les assemble. Une `Grid` est un `\draw` avec `grid` de TikZ (`(x0,y0) grid[xstep=…, ystep=…] (x1,y1)`, dont les lignes sont aux multiples du pas **depuis l'origine**,
  comme celles de la grille ; une boîte ajoute `rectangle` pour ses bords) ; elle écrit ses lignes une par une quand `grid` ne dirait pas ce qui est dessiné (les lignes d'une direction sont trop serrées pour être tracées, axes obliques). Un `Axis` est une flèche (`->`).
- Les figures qui tracent une fonction (`Plot`, `Parametric`, `FillBetween`) utilisent `pgfplots` (`FillBetween` demande aussi `\usepgfplotslibrary{fillbetween}`) : `NumExp.toPgf()` écrit
  l'expression (angles par `deg`/`rad`, tout parenthésé). Une courbe écrit son propre `axis` (`hide axis`, `scale only axis`) dont les
  unités `x=…, y=…` sont celles de `AbstractFigure._tikzUnits()` (1 pixel = 0,75 pt) et dont la position `at=` est en longueurs : le
  `tikzpicture` de `Graph.tikz()` doit poser les mêmes unités. Le marqueur croix demande `arrows.meta`.
- Les valeurs qui suivent les fonctions d'une courbe dans le parser (`@samples`, domaine, image) sont lues par `curveValues` (`parser.curve.ts`) : `@50` est collé à la fin d'une valeur ou seul,
  une borne d'intervalle est un nombre ou une expression de nombres (`2pi`, `.5pi`). Les options communes des courbes sont dans `Curve.types.ts` / `Curve.constraints.ts`.
- Le tracé d'une courbe (`y = f(x)`, `(x(t), y(t))`) est dans `calculus/computeCurve.ts` (`sampleCurve`, `curvePath`) : un point par
  intervalle seulement là où la courbe courbe, jamais un point par pixel. Mesures : `.claude/specs/2026-10-29-trace-des-courbes.md`.
- Tant qu'une figure n'a pas son `tikz()`, elle lève `NotImplementedError` : l'implémenter dans son `file-analyse`, avec test.
  Fait pour : `Point`, `Line`, `Circle`, `Arc`, `Plot`, `Parametric`, `Polygon`, `Bezier`, `Edge`, `Path`, `Follow`, `Riemann`, `FillBetween`, `Grid`, `Axis`.
- **`Graph.tikz()` est un `tikzpicture` complet** (`tikzPicture`, `AbstractFigure.tikz.ts`) : l'échelle `x=…, y=…` d'une unité, la taille de la fenêtre (`\path (x0,y0) rectangle (x1,y1)`), puis les figures dans l'ordre du svg (couche par couche ; la couche
  `interactive`, les poignées, n'est pas écrite). Les commandes sont coupées à la fenêtre par un `\clip` **dans un `scope`**, sauf les `axis` de pgfplots, qui se coupent seuls : un `\clip` ou un `\useasboundingbox` actif devant un `fill between` fait échouer pgfplots
  (« Dimension too large »). `Graph.tikzPreamble()` donne les lignes à mettre avant `\begin{document}` (`TIKZ_PREAMBLE`). Axes obliques ou renversés : `NotImplementedError` ; image plus grande que TeX (16 383 pt) : `InvalidArgumentError`.
  Vérification : compiler les exemples de la démo avec `pdflatex` (classe `standalone` pour voir le rendu), et pour un changement d'écriture comparer les lignes du PDF (décompressé avec `\pdfcompresslevel=0`) à celles de l'ancienne écriture.

## Tests des figures

- Les figures se testent avec `svgdom` (devDependency, DOM virtuel de l'auteur de svg.js). `tests/helpers/figure.ts` fournit
  `createContext()` (un `IFigureContext` sans `Graph`), `createSvg()` et `graphConfig()` (800 x 600, origine au centre, 50 px par unité).
- `Graph` se teste avec `svgdom` aussi, par `tests/helpers/graph.ts` (`useDocument()` dans un `beforeAll`, `createGraph()`, `createContainer(id?)`) : `svgdom` fait de `createElement` un élément svg, que svg.js ne prend pas
  pour le parent d'un svg racine ; le helper crée donc des éléments de l'espace de noms XHTML. Pas besoin de `jsdom` ni de `happy-dom`.
- **Construction et mise en page de `Graph`** : la config est résolue et validée avant de toucher à la page (`resolveGraphConfig`, `checkGraphConfig` dans `calculus/computeLayout.ts`) ; une erreur de construction ne laisse rien
  dans le conteneur. La mise en page se change par `updateLayout(config?, display?)` (plus de setters `config`/`display`), qui valide puis applique et laisse le graphe intact en cas d'échec. Le décor (grille et axes du graphe)
  est la liste `_decor` de `Graph` : il se retire figure par figure, jamais en vidant une couche, car la couche des grilles contient aussi celles des figures. `axesDisplay` et `axisConfigOf` (`Axis.constraints.ts`)
  traduisent l'affichage en config d'axe.

## Gestion des erreurs

Alignée sur PiMath (mêmes noms quand c'est possible) : toutes les erreurs de PiDraw héritent de `PiDrawError` (`src/errors.ts`,
exporté par `index.ts`).

- `ParseError` : une chaîne ne peut pas être analysée (expression, syntaxe du parser)
- `InvalidArgumentError` : un argument ou une option est invalide (hors parsing de chaîne)
- `MathError` : opération mathématiquement invalide sur des entrées valides
- Les types manquants (`StateError`, `IndexError`, `NotImplementedError`, `UnsupportedOperationError`, `DimensionError`…) sont
  ajoutés **au fil des analyses**, au premier fichier qui en a besoin, avec le nom de PiMath.
- **Pas d'échec silencieux** : une entrée invalide lève, elle ne produit pas `NaN`, `undefined` ni un flag `isValid`. Chaque
  suppression d'un échec silencieux est un breaking change à consigner.
- Exception voulue : un résultat mathématiquement indéfini reste une **valeur** (`sqrt(-1)` : `NaN`, `1/0` : `Infinity`), pour que
  les tracés gèrent les asymptotes et les trous.
- Le message nomme l'entrée fautive (`Cannot parse "x+": ...`). Les erreurs se testent avec `toThrow(Classe)`, jamais sur le seul message.
- **Erreurs du parser** (le code s'écrit parfois en direct, donc des lignes invalides sont normales) : trois couches.
  - Les `build*` **lèvent** : `ParseError` pour la définition de la figure (avant le `->`), `OptionError` (sous-classe de `ParseError`)
    pour une option (après le `->`). Le message nomme la figure (`id`) et la clé ou l'option fautive. Jamais de `null` silencieux.
  - `Draw` **gère** : une ligne en erreur n'arrête pas le dessin ; `refresh(code, {editing})` renvoie un `IDrawReport` (`Draw.report.ts`) : les `IDrawError` (numéro et texte de la ligne, `from`/`to` pour une
    option, gravité `error` ou `pending`) et l'état de chaque ligne (`ok`, `error`, `pending`). Rien n'est écrit dans la console. La ligne en cours d'écriture (`editing`) garde la figure de sa dernière version
    valide, par numéro de ligne, tant que c'est la seule ligne qui diffère du dernier dessin (`editedRecord`). Les paramètres du graphe suivent la même voie : `refreshLayout` renvoie l'erreur (`layoutError`), il ne lève pas.
  - Le composant Vue **affiche** les erreurs et les lignes en cause (diagnostics CodeMirror : `doc.line(line).from + from`).

## Redessiner le code (`Draw.refresh`)

- Les lignes du début du code qui sont les mêmes que dans le dernier dessin (même rang, même texte, `reusableCount` de `Draw.diff.ts`) **gardent leurs figures** (les mêmes objets) ; à partir de la première
  qui diffère, tout est refait, les figures en trop sont retirées en partant de la fin. Cela donne le dessin d'un `Draw` neuf **parce qu'une ligne ne se construit que des figures des lignes qui la précèdent
  et du code** (noms uniques et ordre des calques compris) : un `build*` ne lit rien d'autre, un état caché de `Draw` ou de `Graph` y met fin. `tests/Draw/Draw.refresh.test.ts` compare, sur les exemples de la démo,
  un code redessiné à un `Draw` neuf. Mesures : `.claude/specs/2026-10-31-mesure-update.md`.
- Les figures d'une ligne sont celles que le graphe a en plus après elle (`Object.keys(graph.figures)`), ce qui comprend les poignées de `drag`. Les paramètres du graphe qui changent (`refreshLayout`) font tout refaire.
- **Le snap d'un point tiré** (`->drag,snap=A/B/C,snapRadius=30`) est un aimant, pas une limite : `snap` et `snapRadius` complètent le `drag` écrit avant eux (`Graph.snap`, `OptionError` sinon) et ne remplacent rien. Une figure déclare `snappable` (un **getter**, car `Line` dépend de sa forme) et `snapPoints()` (pixels ; `[]` par défaut) comme elle déclare
  `followable` et `follow` : un point (sa position), un cercle (son centre), un segment et un arc (extrémités et milieu ; le milieu d'un arc est le point de l'arc à mi-angle, le centre n'attire pas), un polygone (sommets, puis milieu de chaque côté **dessiné**, donc suivant `cycles`). Ne sont pas `snappable` : rayon,
  vecteur, droite, axes (leurs bouts sont les bords de la fenêtre), courbes, `Bezier`, `Path` (à définir). Après les limites de `drag`, `Graph._snapped` prend le candidat le plus proche dans le rayon (`SNAP_RADIUS`, 12 px, ou `snapRadius`) **que les limites laissent atteignable** (`_limited` le rend inchangé) : les limites gagnent. Les positions sont lues
  au glisser, sans dépendance de redessin ; un point ne peut pas se snapper à lui-même ni à sa poignée.
  **Retour visuel** : pendant un glisser à la souris d'un point qui a un `snap` (`dragstart` à `dragend`, jamais pour `dragTo`), un anneau marque chaque position atteignable, plus grand sur celle qui tient le point. Les anneaux sont sur la couche `LayerName.TEMPORARY` (tout élément éphémère y va : vide hors d'un glisser, absente du TikZ).
  L'état du glisser (`_snapDrags`, par point tenu : anneaux et dernière liste de candidats) ne redessine que ce qui a changé : une position inchangée garde sa réponse « atteignable » et son anneau (comparaison de positions, pas de prédiction par l'arbre de dépendances, qui se tromperait avec une animation ou deux doigts). `updateLayout` relit tout (les limites dépendent du
  layout) ; retirer le point tenu retire ses anneaux. `dragmove` porte `snapped` (`IGraphMove`).
- **La position d'un point tiré** est dans le point (`pixels`), pas dans la config : `Draw` écoute `dragmove` (`target`) et la garde en unités avec le texte de la ligne. Une ligne refaite dont le texte est le même
  remet le point par `Graph.dragTo` (qui ré-applique `along`, `grid`, `bounds`, `follow`) ; un texte qui change, `drag: 'reset'` ou une figure qui disparaît l'oublient. Un point que personne n'a tiré n'est jamais remis.

## JSDoc : documenter le contrat, pas la mécanique

Le JSDoc encode ce que la signature ne dit pas (`@throws`, unités, mutation, valeurs spéciales, préconditions).
Pas de types redéclarés, pas de paraphrase du corps. Le JSDoc public alimente la référence d'API (TypeDoc).

## Documentation publique (VitePress)

Alignée sur PiMath : site VitePress dans `docs/` (anglais, public = enseignants), référence d'API générée par TypeDoc.

- `npm run docs:dev` / `docs:build` (= `docs:check`, `typedoc`, puis `vitepress build docs`) / `docs:preview` / `docs:check`
- `typedoc.json` écrit dans `docs/public/api/` (généré, ignoré par git). Ne jamais pointer TypeDoc vers `docs/`.
- **Les pages du guide** sont dans `docs/guide/` : `getting-started`, `syntax`, `graph` (paramètres du graphe), `options` (options communes), une page par famille de figures (`points`, `lines`, `circles`, `curves`, `polygons`, `grids-axes`),
  `interaction` (drag, animation), `code` (`PiDraw` et `PiGraph` depuis le code), `errors` (rapport, mode édition), `tikz`. L'ancien `docs/parser.md` (français) a été repris dans ces pages puis supprimé.
- **Un exemple est un bloc ````pidraw````** (````pidraw params="x=-1:6,axis" errors="3"````) : le site l'affiche avec son dessin, construit dans le navigateur par la bibliothèque (`PiDrawExample.vue`, import dynamique de `pidraw`,
  alias vers `src/`). `params` sont les paramètres du graphe, `errors` les numéros de lignes du bloc que l'exemple montre en erreur. L'analyse des blocs est dans `docs/.vitepress/theme/fence.ts`.
- **`npm run docs:check`** (`scripts/docs-check.test.ts`, mode Vitest `docs`, sous `svgdom`) construit chaque exemple et échoue si son rapport n'est pas celui qu'il annonce ; il construit aussi les exemples de `demo/`.
  **Exhaustivité** : chaque clé de `PARSER_CONFIG`, chaque option du registre (`optionNames()`), une couleur, et chaque paramètre du graphe (`LAYOUT_KEYS`) doit avoir un exemple ; la liste de ce qui manque est affichée
  (`--silent=false`), et fait échouer le contrôle : une clé, une option ou un paramètre sans exemple est un oubli.
- **La page « Reference of the keys »** (`docs/guide/reference.md`) est générée à la construction du site par un chargeur de données (`reference.data.ts`) qui lit `PARSER_CONFIG` : elle ne s'écrit jamais à la main. `docs:check` ('syntax of the registry') exige que chaque forme de `forms` soit construite par un exemple (la clé écrite dans la forme est celle de l'entrée, le nombre de valeurs est dans l'intervalle que la forme annonce) : une forme du registre que le guide ne montre pas, ou un registre qui ne dit pas ce que le guide montre, fait échouer le contrôle.
- **Toute forme de syntaxe écrite dans un bloc sans langage** d'une page du guide (`c=circ A,B,C,*`) doit être construite par au moins un exemple : `docs:check` compare la forme (clé, nombre de valeurs, `*`) à ce que les exemples
  construisent. Une ligne avec un espace réservé (`<expression>`) n'est pas contrôlée. **Toute affirmation « ceci est une erreur »** s'écrit en bloc `errors="…"` : les numéros de lignes sont contrôlés, et on lit les messages réels
  (`--silent=false` ou un test jetable) pour que la raison dite soit la vraie. Ces deux contrôles ont trouvé des formes oubliées (`d=[AB`, la coordonnée `A:B`) et un message d'erreur trompeur (`f=plot` lu comme un raccourci de droite).
- Les exemples publiés doivent être exécutés/vérifiés ; ne pas y mettre de sortie non vérifiée. Un bloc `ts`, `html` ou `bash` est illustratif : il ne promet aucun résultat.
- Une nouvelle clé de figure ou une nouvelle option sans exemple dans le guide est un oubli que `docs:check` signale : l'écrire avec la figure (étape « Documentation » de « Créer une nouvelle figure »).
- Les blocs `js` du guide sont exécutés (`docs:check`) : `container` est un élément où dessiner, les exports de la bibliothèque sont des noms libres, `expr // résultat` compare, `expr // throws Classe` attend une erreur ; `js no-run` saute un bloc. Un bloc `latex` qui suit
  immédiatement un exemple `pidraw` est le TikZ de cet exemple, comparé à `graph.tikz()`.
- **Les contrôles** (`docs/controls.md`, `ControlsPlayground.vue`) : un composant par thème, `AnimationControls.vue` pour l'animation, `ZoomControls.vue` pour le zoom (puis `SlidesControls.vue`). Il agit sur un contrôleur passé en prop (`Animate`) et tient son état des **événements** du contrôleur (`on` / `off`), jamais du compte des clics ;
  `PiDrawExample.vue` et `Playground.vue` l'utilisent aussi. Les démos de la page sont des données (`controlsDemos.ts`) que `docs:check` construit (sans erreur, avec une animation). Aucun test unitaire pour les composants Vue : le contrôle est `vitepress build docs` et l'oeil.
- La **démo** (`docs/demo.md`, `Playground.vue`) est un éditeur CodeMirror : à chaque frappe `draw.refresh(code, {editing: ligne du curseur})`, et le rapport devient les diagnostics (`setDiagnostics`, `lintGutter`). C'est le modèle du futur composant Vue.
- **CI** : `.github/workflows/ci.yml` (`tsc`, `eslint src tests`, tests dont `docs:check`, build) et `docs.yml` (`docs:build`, déploiement sur GitHub Pages).
- **Migration et changelog** : `docs/guide/migration.md` (ce qu'un programme ou un dessin doit changer, tableaux en code en ligne : pas de bloc sans langage, `docs:check` en contrôlerait les formes) et `CHANGELOG.md` (à la racine, section « Unreleased » jusqu'à la publication). Un breaking change consigné dans `.claude/docs/breaking-changes.md` qui touche un utilisateur s'écrit aussi dans ces deux fichiers.

## file-analyse — points spécifiques PiDraw

- Suivi **global** : `.claude/docs/file-analyse-log.md` (tous les fichiers de `src/`, un fichier ajouté ou déplacé s'y inscrit ou s'y corrige dans la même session)
- Pour chaque figure (`src/figures/*`) vérifier : lien avec le parser (`<Figure>.parser.ts`), options exposées et
  documentées dans la page du guide, cohérence avec `AbstractFigure`
- Pour chaque `*.parser.ts` : toute syntaxe acceptée doit apparaître dans le guide (un exemple `pidraw` qui la construit) et avoir un test

## Démo (`demo/`)

- `demo/parsing_examples/basic_examples.ts` : les exemples (`IDemoExample` : `name`, `code`, `parameters?`, les paramètres par défaut sont `DEFAULT_PARAMETERS`). Il est lu aussi par `docs/.vitepress/theme/Playground.vue` (l'exemple `[0]` est l'exemple de départ), `tests/Graph.test.ts`, `tests/Draw/Draw.refresh.test.ts` et `scripts/docs-check.test.ts`. Un nom est unique ; les paramètres d'un exemple sont appliqués (démo et `docs:check`).
- Le tableau des exemples (`examplesTable.vue`) montre les **particularités calculées** (`features.ts` : `draw.hasDraggable()`, `draw.uses('animate' | 'slide' | 'toggle')`, et `snap=` lu dans le texte, car `Draw` ne le déclare pas), jamais écrites à la main. Une particularité sans exemple fait échouer `docs:check`.
- Les boutons de la démo (toggles, animation, étapes) sont dans un seul bloc, sous le graphe.
