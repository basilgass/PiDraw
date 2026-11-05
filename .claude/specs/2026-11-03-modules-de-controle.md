# Modules de contrôle : animation, zoom, diapositives

Date : 2026-11-03. Statut : design validé, rien d'implémenté. Les trois thèmes sont indépendants les uns des autres ; PiDraw reste sans interface et fournit
l'API qu'une interface (un composant Vue, ou le code d'un enseignant) appelle.

## Décisions

| Sujet | Décision | Écartée |
|---|---|---|
| Qui crée les contrôleurs | L'utilisateur : `new Animate(graph)`, le graphe retient le contrôleur par `graph.attach` | Accesseurs paresseux sur `Graph` (`graph.animation`, `graph.zoom`) : le graphe importerait chaque thème et un nouveau thème modifierait `Graph.ts` |
| Dossiers | Un dossier par thème : `src/animate/`, `src/zoom/`, `src/slides/` | Fichiers à la racine de `src/` |
| Diapositives | Recouvrements à la Beamer : une figure est visible ou cachée selon l'étape. Indépendantes du zoom et de l'animation | Étapes de construction fixes, instantanés fournis par le programme |
| Syntaxe des diapositives | `slide=<3-6,7,9>` (spécification Beamer : `<3->`, `<-6>`, `<2-4>`, `<3>`) ; commandes `@pause` et `@slides=<…>` | Séparateur `---`, API seule |
| Lecture de `<…>` | PiParser garde un groupe `<…>` d'un bloc (les virgules sont aussi le séparateur des options) | Autre séparateur, recollage dans `Draw` |
| Interface | Aucune dans `src/`. Un composant de référence dans `demo/` ; plus tard peut-être une entrée `pidraw/vue` avec Vue en dépendance facultative | `.vue` dans le bundle de `pidraw` |

Le coût (mémoire, vitesse, réactivité) est le même dans les deux modèles : un contrôleur n'existe que s'il est créé, et la boucle d'une animation est la même.
La différence de poids du paquet est de l'ordre de 1 à 3 %, et conditionnelle (voir « Points ouverts »). Le critère retenu est l'extension : un module
tiers implémente `IGraphController` sans modifier le cœur.

## 1. Le contrat du cœur

- `IGraphController` (dans `Graph.types.ts`) : `dispose(): void`, et `onFiguresRemoved?(names: string[]): void` (appelé après tout retrait de figures, `remove` et `clear`, avec leurs noms ; jamais pour aucune figure).
- `graph.attach(controller)` retient le contrôleur et le renvoie. Un second contrôleur de la même classe sur le même graphe lève `InvalidArgumentError` (deux
  `Animate` feraient deux boucles sur les mêmes points).
- `Graph.remove()` et `Graph.clear()` appellent `onFiguresRemoved` de chaque contrôleur ; `Graph.dispose()` appelle `dispose`. `Draw.refresh` retire les figures une par une : `onCleared` seul ne l aurait pas vu.
- `graph.animation` est supprimé. `Draw.refresh` ne connaît plus `Animate` : l'arrêt de l'animation quand une figure disparaît passe par `onFiguresRemoved`, appelé
  par le graphe. Rupture à consigner dans `breaking-changes.md` ; le guide (`code.md`, `interaction.md`), `Playground.vue`, `PiDrawExample.vue`
  et `demoParser.vue` utilisent `graph.animation` et sont à reporter.

## 2. Structure et règle d'indépendance

```
src/animate/   Animate.ts, Animate.types.ts
src/zoom/      Zoom.ts, Zoom.types.ts           (+ calculus/computeZoom.ts, pur)
src/slides/    Slides.ts, Slides.types.ts       (après PiParser)
```

- Un thème n'importe que le cœur : `Graph` en type, `pidraw.common`, `Graph.types`, les `.types.ts` des figures. Jamais un autre thème.
- Le cœur n'importe jamais `Animate.ts`, `Zoom.ts` ou `Slides.ts`, seulement leurs `.types.ts` (`IFigureAnimation`, `LoopStyle`, déjà en place).
- Une règle `dependency-cruiser` fait respecter cela ; elle devient un test du dépôt (comme `tests/modules.test.ts`).
- Ce qui vient du code est un `OptionHandler` (`animate`, `slide`) ou une commande (`@pause`, `@slides`) de `Draw.lines.ts`, jamais un cas particulier de `Draw`.

Ce que chaque thème demande au cœur :

| Thème | S'appuie sur | Changement du cœur |
|---|---|---|
| Animation | `graph.update([point])` | aucun |
| Zoom | `graph.updateLayout(config)` et un calcul pur de la fenêtre | `updateLayout` garde les points déplacés, `onLayoutChanged` (fait) |
| Diapositives | la visibilité d'une figure | un troisième canal de visibilité dans `AbstractFigure` |

## 3. Vocabulaire de l'API de contrôle

La forme est commune, pas une interface unique :

| Module | Actions | État lisible | Événements |
|---|---|---|---|
| Animate | `start`, `pause`, `resume`, `stop`, `restart` | `isRunning`, `isPaused`, `canBeAnimated` | début, fin, pause |
| Zoom | `zoomIn`, `zoomOut`, `zoomTo`, `moveOrigin` (pixels), `reset`; `allow` : `both`, `zoom` (origine fixe), `move`; gestes : mode `navigating` | `window`, `scale`, `canZoom`, `canMove` | `change` (la fenêtre), `navigation` (le mode) |
| Slides | `next`, `previous`, `goto(n)` | `current`, `count` | changement d'étape |

Chaque contrôleur est un `EventTarget` typé (`on(type, listener)`) : une interface se met à jour en l'écoutant, sans interroger en boucle, et le cœur n'a pas
à connaître les événements des thèmes. Les noms exacts d'`Animate` (l'actuel `cancel` contre `stop` et `restart`) sont à régler dans son analyse.

## 4. Diapositives (à faire après PiParser)

- `slide=<spec>` : la figure est visible aux étapes de la spécification (étapes numérotées à partir de 1). Sans `slide`, la figure est toujours visible.
- `@pause` : les figures suivantes ont, par défaut, `<n+1->` pour le n-ième `@pause`. `@slides=<spec>` : la spécification par défaut des figures suivantes.
  Une valeur écrite sur la ligne l'emporte sur les valeurs par défaut.
- **Pas d'état caché dans `Draw`** : la règle de `Draw.refresh` (une ligne ne se construit que des lignes qui la précèdent et du code) vaut pour les commandes.
  Le défaut d'étape d'une figure est un pliage pur des lignes précédentes dans `Draw.lines.ts`, pas un compteur mutable. C'est un contrôle de redessin,
  sans rapport avec la mise à jour pendant un glissement.
- **Une figure cachée par une diapositive existe toujours** : elle est calculée, mise à jour, et lue par celles qui en dépendent (comme avec `->hide`).
  Seul son affichage change. C'est un canal séparé de `hide()` et de `_setDefined` : passer à l'étape suivante ne doit pas montrer une figure que
  l'utilisateur a cachée.
- Le TikZ peut écrire la spécification (`\draw<2->`), les mêmes diapositives dans un document Beamer. À faire dans un second temps, mais la syntaxe doit le permettre.
- Dépend de PiParser : le groupe `<…>` doit passer d'un bloc dans le séparateur des options.

## 5. Interface

- PiDraw reste sans interface. Le site porte l'interface de référence : `docs/.vitepress/theme/AnimationControls.vue` (puis `ZoomControls.vue`, `SlidesControls.vue`, un composant par thème), assemblés par la page `docs/controls.md`. Ils n'appellent que les contrôleurs et écoutent leurs événements.
- Quand l'API est stable : une seconde entrée du paquet (`pidraw/vue`, deux points d'entrée dans `exports`), Vue en `peerDependency` facultative.
  Aucun `.vue` dans `src/`, donc aucun dans le bundle de `pidraw`.

## 6. Ordre de travail

1. Le contrat dans `Graph` (`IGraphController`, `attach`, `onFiguresRemoved`, `dispose`) et son test. `graph.animation` est encore là, le temps de passer `Animate`.
2. `Animate` passe à ce modèle, avec son analyse complète (`file-analyse`) : verbes, événements, retrait de `graph.animation`, signal de suppression de figures,
   report des pages du guide et de la démo. Le test d'indépendance arrive ici.
3. `Zoom` (fait le 2026-11-04) : calcul pur `computeZoom`, contrôleur, gestes (calque de capture), `Graph.updateLayout` qui garde les points déplacés, `onLayoutChanged`, `ZoomControls.vue`.
4. `Slides` (fait le 2026-11-05, après PiParser 0.2.1 et le travail préalable sur les types de `parse`) : `AbstractFigure.slide` et la visibilité par raisons nommées, signal générique `figureChanged` / `onFigureChanged`, `slide=<…>`, `@pause`, `@slides`. L étape vit dans `Slides` seul ; sans `Slides` le paramètre est ignoré.
5. Un composant de contrôle par thème dans le site (`AnimationControls.vue`, `ZoomControls.vue`, `SlidesControls.vue`, faits), au fil des modules.

## Points ouverts

- Le poids du paquet : `"sideEffects": false` manque dans `package.json`, et les `enum` TypeScript (`LoopStyle`) peuvent empêcher un bundler de retirer un thème
  inutilisé. À mesurer avant de promettre un gain.
- Les verbes d'`Animate` sont fixés (2026-11-04) : `start` (reprend après une pause), `pause`, `stop` (remet les points), `restart`, `dispose` ; événements `start`, `pause`, `end`, `stop`. Plus de `resume`.
- Comment `Draw` offre un raccourci pour créer les contrôleurs du code (par exemple `draw.graph.attach(new Animate(draw.graph))` écrit à la main, ou un helper).

## Cadre des thèmes (2026-11-05)

Ajouté une fois `Slides` fait, pour que les `@commandes` et les options d'un thème (les titres des diapositives vont être le suivant) ne touchent plus le cœur ni `Draw.lines.ts`.

| Décision | Choix | Écarté |
|---|---|---|
| Donnée d'un thème sur la figure | un champ générique `controls` + `setControl(key, value\|null)` ; les entrées sont typées par `IControlsFigure` (`src/controls/controls.types.ts`) | un getter par thème (`figure.animate`, `figure.slide`), un sac non typé |
| Typage | une interface centrale qui importe les types des thèmes (le cœur tolère les `import type` des `*.types.ts`) | fusion de déclarations (`declare module`), test d'isolation par l'API de dependency-cruiser : du luxe pour ce que l'import de types tolère |
| Validation | par le thème (`setSlide`, `setAnimation`), `setControl` ne valide rien | validation dans la figure |
| Syntaxe | `IThemeSyntax` dans `<Thème>.syntax.ts`, listée par `controls/controls.ts` (`THEMES`) | cas dans `Draw.options.ts` et `Draw.lines.ts` |
| `animatable`, `_checkAnimation` | supprimés du cœur : `setAnimation` dit qu'une figure est un point | les garder sur `AbstractFigure` |
| Poignée d'un point glissé | `handleControls` du thème (entrées reprises par `<point>_drag`) | cas écrit en dur dans `Draw.ts` |

Les règles de `dependency-cruiser` : `core-not-to-themes` (le cœur n'importe que des `*.types.ts` de thèmes, sauf le registre, `Draw`… par le registre), `core-not-to-registry` (seuls `Draw`, `codemirror`, `index.ts` lisent `controls/controls.ts`), `theme-not-to-syntax-layer` (un thème n'importe ni `Draw`, ni `codemirror`, ni le registre).

## Titres des étapes (2026-11-05)

`@pause=Titre` (titre de l'étape que le `@pause` ouvre) et `@title,N=Titre` (n'importe où dans le code, texte jusqu'à la fin de la ligne, sans chevrons). Un titre n'appartient à aucune figure : il va au graphe par `Graph.controls.titles` (paire générique, comme `AbstractFigure.controls`), posé par `Draw` à partir de l'état final du pliage des commandes.
Erreurs de ligne : titre vide, second titre pour la même étape, `N` absent ou pas un entier à partir de 1. Un titre pour une étape qui n'existe pas est gardé et ne crée pas d'étape. `Slides` : `title`, `titleOf(step)`, `titles` (copie), `title` dans `state` et dans l'événement `change`, émis aussi quand les titres changent. Le TikZ n'écrit pas les titres.
