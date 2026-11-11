# Breaking changes

Liste des changements cassants (API publique, syntaxe du parser, sémantique observable) à consigner au fil des analyses.

## 2026-10-28 : erreurs typées et réécriture de `NumExp`

Fichiers : `src/errors.ts` (nouveau), `src/NumExp.ts` (nouveau, retiré de `Calculus.ts`).

- **Nouvelles erreurs** exportées par `index.ts` : `PiDrawError` (base), `ParseError`, `InvalidArgumentError`, `MathError`.
  Mêmes noms que PiMath. Tester avec `instanceof`, pas avec `name`.
- **`new NumExp(expr)` lève `ParseError`** si l'expression est vide ou mal formée (parenthèses, caractère inconnu,
  nombre d'arguments, opérande manquant, `=`). Avant : `isValid` valait `false` et `evaluate` renvoyait `NaN`.
  Conséquence : un `Plot` ou un `Parametric` dont l'expression est mal formée lève dès sa construction (tracé vide avant).
- **`evaluate` lève `InvalidArgumentError`** si une variable n'a pas de valeur. Avant : la variable était ignorée et le
  résultat valait `NaN`.
- **Supprimés** : `isValid` (getter et setter), `rpn`, le paramètre `uniformize` du constructeur, les exports
  `Shutingyard`, `ShutingyardType`, `ShutingyardMode` (jamais exportés par `index.ts`).
- **Import** : `NumExp` s'importe de `src/NumExp.ts`, plus de `src/Calculus.ts`.
- **Sémantique** :
  - `sin(x)^2` vaut maintenant `sin(x)²` (avant : `sin(x²)`) ;
  - `2*-3`, `x^-1`, `sin(pi)`, `ln(e)`, `cos(2*pi)` sont évalués (avant : `NaN`) ;
  - une expression de plus de 50 tokens n'est plus tronquée ;
  - `%` est le reste JavaScript (avant : déclaré, jamais évalué) ;
  - l'arrondi à 10 décimales ne se fait plus qu'au résultat final (avant : après chaque opération), et il est ignoré
    au-delà de 1e5 en valeur absolue ; `-0` devient `0`.
- Les résultats mathématiquement indéfinis restent des valeurs (`sqrt(-1)` : `NaN`, `1/0` : `Infinity`).

## 2026-10-28 : `Calculus.ts` éclaté en `src/calculus/` et `src/svg/`

- **Imports** (internes, `Calculus.ts` n'est pas exporté par `index.ts`) : `src/Calculus.ts` n'existe plus. Les calculs
  s'importent de `src/calculus` (`numbers`, `geometry`, `coordinates`, `computeLine`, `computeQuadratic`, `computeBezier`, `NumExp`),
  `createMarker` de `src/svg/marker`, `computeBezierPath` de `src/calculus` (ancien `src/functions/computedBezier.ts`).
- **Supprimés** (jamais appelés) : `nearestPointToPath`, `isInfinity`, et sur `mathLine` : `slope`, `ordinate`, `normal`,
  `getValueAtX`, `getValueAtY`. `mathVector` et `mathLine` ont des champs publics (`x`, `y`, `A`, `director`) à la place
  des accesseurs.
- **Erreurs au lieu d'échecs silencieux** :
  - `toPixels` / `toCoordinates` (et `Graph.toPixels` / `Graph.toCoordinates`) lèvent `InvalidArgumentError` pour une valeur
    qui n'est ni un nombre, ni un domaine, ni un point (avant : la valeur était rendue telle quelle). Elles sont typées par
    surcharges, plus génériques en `<T>`.
  - `toCoordinates` d'un point lève `MathError` si les deux axes sont colinéaires.
  - `new mathVector(...)` lève `InvalidArgumentError` pour une combinaison d'arguments non reconnue (avant : vecteur nul).
  - `toNumber` lève `ParseError` pour une chaîne qui n'est ni un nombre ni une fraction `a/b` (avant : `NaN`, ou le
    deuxième `/` ignoré, ou `0` pour une chaîne vide).
  - `quadraticThroughABC` lève `MathError` si deux points ont la même abscisse (avant : `Infinityx^2...`).
- **Corrections de résultat** :
  - `toCoordinates` d'un domaine soustrait l'origine (avant : elle était ajoutée) ;
  - `toCoordinates` d'un point inverse les axes obliques (avant : les composantes croisées étaient ignorées) ;
  - `mathLine.intersection` renvoie `null` pour des droites parallèles ou confondues (avant : `{NaN, NaN}`, ou une
    ordonnée `NaN` pour des verticales) ;
  - `computeLine` : avec `length`, la ligne se termine à `origine + length * direction` dans toutes les directions ;
    en demi-axe, elle commence `padding` derrière l'origine quel que soit le sens de la direction ; une direction nulle
    renvoie `null` ;
  - `quadraticThroughABC` écrit les coefficients avec jusqu'à 10 décimales (avant : 4), sans les coefficients nuls ;
  - `createMarker` : l'id du marqueur `'|'` est `marker-bar-<id>-<échelle>` (avant : l'attribut ne portait pas l'id cherché,
    donc le marqueur n'était jamais réutilisé) ; les caractères hors `[\w-]` d'un id sont remplacés par `_`.

## 2026-10-28 : les figures reçoivent leur contexte par le constructeur

- **Constructeurs des figures** (internes : `index.ts` n'exporte que les types des figures, jamais leurs classes) :
  `new Point(rootSVG, name, config)` devient `new Point(context, name, config)`, avec `context: IFigureContext`
  (`rootSVG` et `config`). `Graph` se passe lui-même (`new Point(this, ...)`).
- **`AbstractFigure.graphConfig`** renvoie la configuration vivante du graphe, complète (avec `system`), au lieu d'une copie
  relue en JSON à chaque accès. Un changement de la configuration de `Graph` est vu tout de suite par les figures.
- **`Graph` n'écrit plus l'attribut `data-config`** dans le SVG.
- Nouveau type exporté : `IFigureContext`.

## 2026-10-28 : `AbstractFigure` : opacité, `move` et `scale`

- **`fill` / `stroke`** : l'opacité (`'red/0.5'`) n'est plus appliquée deux fois. Elle ne pose plus que `fill-opacity` ou
  `stroke-opacity` ; l'attribut `opacity` de la forme n'est plus jamais posé. Avant, `fill('red/0.5')` donnait un remplissage
  à 0,25 et le dernier appel de `fill` / `stroke` imposait son opacité à l'autre. Un SVG qui comptait sur l'ancien rendu
  change d'aspect.
- **`fill` / `stroke` lèvent `InvalidArgumentError`** pour une couleur vide, une opacité qui n'est pas un nombre de 0 à 1
  (`'red/abc'`, `'red/2'`, `'red/'`) ou plus d'un `/`. La figure est alors inchangée. Avant : opacité `NaN`.
- **`move`** déplace par `x * axis.x + y * axis.y` : l'échelle de l'axe y et les axes obliques sont respectés (avant : l'échelle
  de x servait aussi pour y). Rien ne change avec les axes par défaut. `move(nombre)` est `move({x: nombre, y: 0})`.
- **`move` / `scale` lèvent `InvalidArgumentError`** si la valeur n'est pas un nombre fini ou un `{x, y}` de nombres finis
  (avant : ignorée en silence, ou `TypeError` pour `scale(undefined)`). Les chaînes (`'1'`) sont refusées.

## 2026-10-28 : `AbstractFigure` : cycle de vie de la forme et du label

- **`AbstractFigure.clear(all?)` devient `clear()`** : le paramètre `all` (jamais utilisé) disparaît ; `clear()` retire tout ce que
  la figure a dessiné, sauf son label.
- **Les figures n'effacent plus leur groupe avec `element.clear()`** mais avec `clear()` : le label reste dans le SVG quand une
  figure reconstruit sa forme (par exemple `circle.config = ...`). Avant, le label disparaissait jusqu'à la prochaine mise à jour.
- **Le setter `shape` retire l'ancienne forme du SVG** (avant : elle restait, d'où un `<path>` vide orphelin pour les figures
  qui ne vidaient pas leur groupe).
- **`addLabel` remplace le label existant** : l'ancien est retiré du SVG (avant : deux labels dans le DOM, avec le même id).

## 2026-10-28 : `AbstractFigure.mark`

- **`mark` lève `InvalidArgumentError`** pour une position autre que `'start'`, `'end'`, `'both'` ou `'none'` (avant : toute autre
  valeur, `mark=edn` par exemple, posait des marqueurs aux deux bouts), pour une forme autre que `'->'`, `'x'` ou `'|'` (avant :
  une flèche), et pour une taille qui n'est pas un nombre fini supérieur à 0.
- **`mark` lève `InvalidArgumentError` sur une figure dont la forme ne porte pas de marqueur** (point, cercle, figures à base de
  groupe) : avant, `TypeError: path.marker is not a function` qui faisait échouer tout le dessin.
- **`mark('none')` ou `mark(false)` retire les marqueurs** des deux extrémités (avant : ils étaient posés aux deux bouts). `mark`
  seul, `true` ou `undefined` restent « aux deux extrémités ».
- **La couleur et l'épaisseur du marqueur ne dépendent plus de l'ordre des options** : `red,mark=end` donnait une flèche noire,
  `mark=end,red` une flèche rouge. `mark` applique maintenant le trait de la figure au marqueur.
- Nouvel export interne : `MARKER_SHAPES` (`src/svg/marker.ts`).

## 2026-10-28 : animations

- **`animate` reste sur `AbstractFigure`, mais une figure doit se déclarer animable** (`animatable`, `false` par défaut ; `Point`
  est la seule figure animable). Affecter une animation à une autre figure lève `InvalidArgumentError` (avant : la valeur était
  stockée et ignorée sans erreur). `animate = null` est toujours possible.
- **Contrôles à l'affectation** (`figure.animate = ...`) : `duration` doit être un nombre fini supérieur à 0, `delay` un nombre
  fini de 0 ou plus, et la figure vérifie sa propre animation (`_checkAnimation`). Pour un `Point` : `from` et `to` doivent être
  des `Point` (avant : `null` ou un `{x, y}` passait, puis `Animate` levait une `TypeError` au lancement de l'animation). En cas
  d'erreur, l'animation précédente est conservée.
- **`Draw`** : `from=` ou `to=` qui ne nomme pas un point du dessin lève `InvalidArgumentError` (avant : ignoré, `from` restait
  `null`).
- **`Animate`** reconnaît les points par `instanceof Point` (avant : un objet qui avait `x` et `y`) et n'importe plus `isXY`.
- Non fait : `IFigureAnimation` garde `from` / `to` obligatoires (propres au déplacement d'un point) ; une animation d'une autre
  nature (tracé progressif d'un `Plot`) demandera de séparer les champs communs (`duration`, `delay`, `easing`, `loop`) de ceux du
  déplacement. `easing` est lu mais ignoré par `Animate` (à traiter avec `Animate.ts`).

## 2026-10-28 : `AbstractFigure` : pointillés, `Circle`

- **`dash` mémorise le motif** et `stroke()` le réapplique : une figure qui recrée sa forme (par exemple `circle.config = ...`)
  garde ses pointillés (avant : perdus). `dash('none')` redonne un trait continu. `dash` accepte aussi un nombre (le parser en
  donne un pour `dash=5`).
- **`dash` lève `InvalidArgumentError`** si le motif n'est ni `'none'` ni une liste de nombres positifs (`'5'`, `'5 2'`, `'5,2,1'`).
  Avant : un motif invalide était écrit tel quel dans le SVG. La figure reste inchangée.
- **`Circle`** applique tout son trait en recréant sa forme (couleur, épaisseur, opacité, pointillé) comme les autres figures,
  avec `fill().stroke()` (avant : seulement la couleur du trait, l'épaisseur retombait à celle par défaut de SVG).
- `AbstractFigure` : JSDoc de la classe et de ses méthodes ; code commenté retiré (dont un `TODO` sur `vector-effect`).

## 2026-10-29 : `AbstractFigure.tikz()` (export TikZ)

- **Nouvelle méthode abstraite `tikz(): string`** : toute sous-classe de `AbstractFigure` doit l'implémenter (rupture pour
  les figures définies hors de PiDraw). Elle retourne un fragment de commandes TikZ (`\definecolor`, `\draw`, `\node`),
  sans `tikzpicture`, en coordonnées mathématiques, label compris.
- **Nouvelle erreur `NotImplementedError`** (`src/errors.ts`, exportée par `index.ts`, nom de PiMath). Les 14 figures de
  `src/figures/` la lèvent tant que leur `tikz()` n'est pas écrit (implémentation à chaque `file-analyse`).
- **`tikz()` lève `InvalidArgumentError`** si une couleur n'a pas d'équivalent LaTeX : seuls `#rgb`, `#rrggbb`, `rgb(r, g, b)` et
  les noms de `xcolor` (`red`, `blue`, `orange`...) sont acceptés ; `transparent` et `none` ne dessinent rien.
- `AbstractFigure` retient les formes des marqueurs de début et de fin (`mark`), pour les écrire en TikZ. Sans effet sur le SVG.

## 2026-10-29 : `Point` : une seule contrainte, types dans `Point.types.ts`

- **`IPointConfig` est une union exclusive** : une config contient exactement une contrainte (`coordinates`, `middle`, `projection`,
  `symmetry`, `direction`, `evaluation`, `intersection`, `intersectionWithCircle`, `intersectionBetweenCircles`), plus les options
  `shape` et `size`. Une config vide (`{}`) ou qui mélange des contraintes ne compile plus. Nouveau type utilitaire exporté :
  `Exclusive<T>` (`pidraw.common.ts`).
- **Erreur à l'exécution** : `new Point(...)` et `point.config = ...` lèvent `InvalidArgumentError` (qui nomme le point) pour zéro
  ou plusieurs contraintes. Avant : zéro contrainte laissait le point en `NaN`, plusieurs s'additionnaient dans l'ordre du code.
- **Option `pixels` retirée de `IPointConfig`** (jamais lue).
- **Types déplacés** vers `src/figures/Point.types.ts` (`ILine`, `PointCoordinateType`, `PointConfigCoordinates`, `IPointConfig`) ;
  nouveaux : `PointConstraints`, `PointConstraint`, `IPointOptions`, `PointShape`. `index.ts` les exporte sous les mêmes noms ;
  les imports internes depuis `figures/Point` doivent viser `figures/Point.types`.
- **`direction` sur `Oy`** : la distance utilise l'échelle de l'axe y (avant : celle de l'axe x, faux quand les échelles diffèrent).
- **`intersectionBetweenCircles`** n'appelle plus `show()` quand le point existe (le masquage des intersections sera traité avec
  les intersections sans solution).

## 2026-10-29 : `Point` : intersections sans solution et position non finie

- **Un point dont la position n'est pas finie n'est pas dessiné** : son groupe reçoit l'attribut `visibility="hidden"` (indépendant de
  `display`, donc de `hide()` et de l'option `!` du parser), retiré dès que la position revient. Vaut pour toute contrainte : deux
  droites parallèles, un cercle qui ne touche pas la droite ou l'autre cercle, une fonction non définie (`evaluation` de `sqrt(x)` en -1).
- **Deux droites parallèles** : la position vaut `NaN` (avant : le point restait à sa position précédente, visible). Les figures qui
  en dépendent deviennent indéfinies.
- **La forme d'un point sans position n'est plus recentrée** : elle reste où elle était (avant : `center(NaN, NaN)`).
- **`intersection` accepte `'Ox'` et `'Oy'`** : le parser les autorisait mais le point levait un `TypeError`. Les axes sont pris comme
  l'horizontale et la verticale passant par l'origine (axes obliques ignorés, voir `.claude/docs/dette-technique.md`).
- **Cercles tangents** : le deuxième point (`index: 1`) n'existe pas ; il levait un `TypeError`.

## 2026-10-29 : `Point.pixels` immuable, setters `x` / `y`

- **`pixels` est en lecture seule** : le getter renvoie un `Readonly<XY>` (objet gelé), jamais modifié sur place. Écrire
  `point.pixels.x = 5` ne compile plus en TypeScript et lève une `TypeError` en JavaScript (avant : la valeur changeait sans que la
  forme suive). Pour déplacer un point : `point.pixels = {x, y}`, `point.x = …` ou `point.y = …`.
- **Le setter `pixels` copie la valeur** (avant : il gardait l'objet reçu). Deux points qui partageaient un objet de position
  (`interactive.pixels = obj.pixels` dans `Draw`) ne se déplacent plus ensemble.
- **Les setters `x` et `y` passent par `pixels`** : ils mettent à jour la visibilité d'un point sans position, et ne recentrent plus
  la forme sur une valeur non finie.
- `Animate` affecte `pixels` une fois par image et par point (avant : `x` puis `y`).

## 2026-10-29 : `Point` : forme, taille et config

- **Taille par défaut** : un cercle sans taille mesure 5 (avant : 2 pour `new Point` et `asCircle()` sans argument, alors que le
  parser et `docs/parser.md` disaient 5). Carré et croix : 10, inchangé.
- **`size` est la boîte englobante pour les trois formes** : le diamètre du cercle, le côté du carré, la largeur de la croix. La croix
  est environ 29 % plus petite qu'avant (sa boîte mesurait `size × √2`).
- **`InvalidArgumentError`** (qui nomme le point) pour une `size` qui n'est pas un nombre fini supérieur à 0, et pour une `shape` qui
  n'est pas `'circle'`, `'square'` ou `'crosshair'` : constructeur, setters `size` et `config`, `asCircle`, `asSquare`, `asCrosshair`.
  Avant : aucune validation. Le point reste inchangé après l'erreur, et un constructeur qui échoue ne laisse rien dans le SVG.
- **Le setter `config`** complète la forme et la taille par défaut (avant : sans `shape` dans la nouvelle config, plus rien n'était
  dessiné), recalcule la position du point et replace son label (avant : seule la forme était recréée).
- **`point.config`** est un `IPointResolvedConfig` (`shape` et `size` toujours présents), exporté par `Point.types.ts`.

## 2026-10-29 : label structuré (`LabelContent`) : le `@` est traduit par le parser

- **`addLabel(content?, asHtml?, texConverter?)`** prend un `LabelContent` : un texte, ou une liste de textes et de champs
  `{field, digits}` (`'coordinates'` pour un point, `'length'` pour un segment). Le texte est écrit **tel quel** : `addLabel('P@')`
  n'affiche plus les coordonnées (avant : `Point` et `Line` interprétaient `@` à chaque mise à jour). Les utilisateurs de `Draw` ne
  voient pas de différence : `parseLabelText` (`src/parser/buildLabel.ts`) traduit `@` et `@.n` en champs.
- **`InvalidArgumentError`** si le contenu a un champ que la figure ne sait pas calculer (`labelFields()`), ou un `digits` qui n'est pas
  un entier de 0 ou plus ; la figure reste inchangée. Avant : le `@` restait dans le texte, sans erreur.
- **Nouveau** : `AbstractFigure.labelFields()` (public) déclare les champs d'une figure ; `Point` offre `coordinates`, un segment
  offre `length`, les autres figures n'en offrent aucun. Une sous-classe externe qui surchargeait `computeLabel` pour un champ doit
  surcharger `labelFields`. Types exportés par `labels/Label` : `LabelContent`, `LabelField`, `LabelFieldName`, `LabelFields`.
- **Syntaxe du parser** (`docs/parser.md`) : `@.n` est consommé en entier (avant : `Point` laissait le `.n` dans le texte,
  `A@.3` donnait `A(1;2).3`) ; tous les `@` du texte sont remplacés (avant : le premier seulement) ; `@.n` fonctionne pour la longueur
  d'un segment (avant : toujours 2 décimales) ; `@` reste un caractère ordinaire sur les autres figures.

## 2026-10-29 : `Point.tikz()`, coordonnée invalide, nettoyage de `Point`

- **`Point.tikz()`** est implémentée (avant : `NotImplementedError`) : cercle, carré ou croix, puis le label. Fidèle au dessin : un point
  sans `fill` reste un anneau vide ; rien pour un point masqué (`hide`) ou sans position ; `!` ne garde que le label, `?` que la forme.
- **Une coordonnée invalide lève `InvalidArgumentError`** (avant : `Error` générique avec `[object Object]`). Un constructeur qui échoue
  ne laisse rien dans le SVG ; un setter `config` qui échoue laisse le point comme il était.
- **`Point._coordToNumber` est retiré** (passerelle publique devenue inutile) et **`Point._makeShape` devient `protected`**.
- `AbstractFigure` : nouveaux helpers `protected` `_tikzCoordinates`, `_tikzLength` et `_tikzShown`.

## 2026-10-29 : `buildPoint` / `buildIntersection` : erreurs typées, options de forme dans `Draw`

- **Nouvelle erreur `OptionError`** (`src/errors.ts`, sous-classe de `ParseError`, propriété `option`) : une option (après le `->`) invalide
  ou inapplicable. `ParseError` : la définition de la figure (avant le `->`) ne convient pas.
- **`buildPoint(item, figures)` et `buildIntersection(item, figures)`** (le paramètre `graphConfig`, inutilisé, est retiré) **lèvent
  `ParseError`** au lieu de renvoyer `null` : mauvais nombre de valeurs, mauvais type de figure, clé qui ne définit pas un point. Le
  message nomme la ligne (`"P" (mid)`). Avant, `Draw` ignorait la ligne sans rien dire. `src/parser/buildIntersection.ts` n'existe plus :
  `buildIntersection` est exporté par `src/parser/buildPoint.ts`.
- **Nouvelles valeurs refusées** (avant : acceptées sans message) : `pt` avec une valeur manquante (le point était créé sans `y`), avec
  une troisième valeur (ignorée) ou avec un nom de point seul comme coordonnée (l'objet `Point` devenait la coordonnée) ; `vpt` avec une
  échelle qui n'est pas un nombre ou un point de départ qui n'est pas un point (ignorés) ; `dpt` avec plus de quatre valeurs.
- **`inter` accepte la droite puis le cercle** (avant : seul cercle puis droite) ; un cercle avec un axe `Ox` / `Oy` est une erreur.
- **Les options `o`, `s`, `*` (forme du point) ne sont plus lues par `buildPoint`** mais appliquées par `Draw._applyOptions`
  (`applyPointShapeOption`, dans `buildPoint.ts`), comme les autres options. Elles marchent dans n'importe quel ordre (avant :
  `->color=red->o=8` ignorait `o`, car la clé `color` contient un `o` et était prise pour la forme). Une taille invalide ou une forme sur
  une figure qui n'est pas un point lève `OptionError`.
- **Syntaxe de la taille** : `o=8`, `s=12`, `*=6`. Les formes `o/8` et `o:8` ne marchaient pas (la clé `o/8` n'était pas reconnue) et
  ne sont pas ajoutées. Plusieurs `->` ne sont pas pris en compte par `piparser` (documenté).
- **Le paramètre `points=o|s|*` du dessin est appliqué** (avant : lu et ignoré), avec une taille facultative (`points=s/12`). Une valeur
  invalide lève `OptionError` dans `_parseLayout`. `IParserSettings.points` devient `false | IPointsSetting` (avant :
  `boolean | 'o' | '*' | 's'`).
- **`Draw._build`** protège chaque ligne (`_buildItem`) : une ligne qui échoue est journalisée par `console.error` et les autres sont
  dessinées. La collecte des erreurs avec le numéro de ligne reste à faire (voir `.claude/docs/dette-technique.md`).

## 2026-10-29 : `Line` : union exclusive, équations et pente, droites sans position

- **`ILineConfig` est une union exclusive** (`src/figures/Line.types.ts`) : exactement une contrainte parmi `bisector`, `director`, `equation`,
  `mediator`, `parallel`, `perpendicular`, `slope`, `through`, `tangent`, plus `shape`. Une config vide ou qui en mélange plusieurs ne
  compile plus. **`ILineType` et `ILine` sont déplacés** de `figures/Line` et `figures/Point.types` vers `figures/Line.types` (noms inchangés,
  toujours exportés par `index.ts`). Nouveaux types : `LineConstraints`, `LineConstraint`, `ILineOptions`, `ILineResolvedConfig`.
- **`InvalidArgumentError`** (qui nomme la droite) pour zéro ou plusieurs contraintes, une `shape` inconnue, un segment ou un vecteur donné
  autrement que par `through` ou `director`, une pente non finie. Avant : une config sans contrainte reconnue écrivait `console.log` et
  dessinait la diagonale du canvas. Un constructeur qui échoue ne laisse rien dans le SVG ; le setter `config` qui échoue laisse la droite
  comme elle était.
- **Pente 0** (`d=line A,0`) est une droite horizontale (avant : la diagonale du canvas, car `0` était pris pour « pas de pente »).
- **Équations** : `y=1/2`, `3x=6`, `y=x/2`, `y=-x/2+1`, `2x-3y+6=0` marchent (avant : `NaN` ou `ParseError` sur la division ; une équation
  sans `=` était ignorée en silence). Une équation qui n'est pas linéaire ou qui n'est pas celle d'une droite lève `ParseError`.
  Nouvelle fonction pure `parseLinearEquation` (`calculus/linearEquation.ts`).
- **Pente et équation en unités du repère** : correct avec des échelles d'axes différentes (`unitX` ≠ `unitY`) ; avant, la direction était
  lue comme un vecteur en pixels.
- **Bissectrice de deux droites** (`bis d1,d2`) est écrite (avant : documentée mais jamais calculée, la diagonale s'affichait). Nouvelles fonctions
  pures `bisectorOfLines`, `bisectorOfAngle`, `mediatorOf` (`calculus/computeLine.ts`). La tangente prend une dérivée centrée.
- **Une droite sans position** (deux points confondus, point sans position) n'est pas dessinée (`visibility="hidden"`, comme un point),
  `start` et `end` valent `NaN`, et elle réapparaît quand sa position revient. Avant : invisible sans signal, ou attributs `NaN`.
- **`start` et `end` sont des copies** des positions (avant, pour un segment, c'était l'objet `Point` vivant). Une droite qui sort du canvas
  garde deux points de la droite (avant : ceux de la config).
- **Le setter `config`** complète la `shape` par défaut, recalcule la droite, recrée la forme et replace le label (avant : seule la forme était
  recréée).
- **`Line` n'importe plus le parser** (`convertIdToFigure` retiré avec `parsePolynom`).
- Nouveaux : `AbstractFigure._setDefined` (helper partagé avec `Point`) et `figures/constraints.ts` (`singleConstraint`, partagé avec `Point`).

## 2026-10-29 : `Line` : label, déplacement, flèche du vecteur, `tikz()`

- **`Line.move(nombre)` n'est plus redéfini** : un nombre déplace le long de l'axe x, en unités du repère, comme toutes les figures (avant :
  déplacement « perpendiculaire » qui n'était pas perpendiculaire, l'axe y étant inversé). `move({x, y})` est inchangé. Le décalage d'une cote
  sera un paramètre de la figure de cote (voir `.claude/specs/2026-10-29-figure-cote.md`).
- **Le label d'une droite ou d'une demi-droite est placé** près de `end`, 10 pixels à l'intérieur (avant : il restait en (0, 0), en haut à
  gauche). `auto_rotate` tourne maintenant le label de toutes les formes (avant : segment et vecteur seulement). Un segment et un vecteur
  gardent le milieu. Une droite sans position ne déplace pas son label.
- **Une droite et une demi-droite s'arrêtent sur les quatre bords du canvas** (nouvelle fonction pure `clipSegment`, `calculus/computeLine.ts`).
  Avant, une droite oblique s'arrêtait sur les bords en x, hors du canvas en y (le SVG la coupait) : `start`, `end`, le label et le TikZ
  sont maintenant dans le cadre. `computeLine` est inchangé (`Grid`, `CoordinateSystem` et `Follow` l'utilisent).
- **La flèche du vecteur** est posée par `mark('end')` (avant : un marqueur posé à la main, sans que `AbstractFigure` le sache) : `tikz()` écrit
  la flèche, elle suit la couleur du trait, et un vecteur qui change de forme (`config`) perd sa flèche.
- **`Line.tikz()`** est implémentée (avant : `NotImplementedError`) : `\draw[…] (départ) -- (arrivée);` avec les extrémités dessinées, la flèche
  d'un vecteur (`->`), puis le label. Rien pour une droite masquée ou sans position ; `!` ne garde que le label, `?` que la forme.
- **`Line.follow`** d'une droite sans position laisse le point où il est (avant : `NaN`).

## 2026-10-29 : `buildLine` : erreurs typées, raccourcis dans les `build*`

- **`buildLine(item, figures)`** (le paramètre `graphConfig`, inutilisé, est retiré) **lève `ParseError`** au lieu de renvoyer `null` : mauvais
  nombre de valeurs, mauvais type de figure, clé qui ne définit pas une droite. Le message nomme la ligne (`"P" (seg)`). Avant, `Draw` ignorait
  la ligne sans rien dire.
- **Valeurs refusées** (avant : acceptées sans message) : une valeur de trop pour `line` (`line A,B,A`, la troisième était ignorée, alors que
  `ray A,B,A` donnait `null`) ; **une pente avec `seg`, `vec` ou `ray`** (`seg A,2` traçait une droite de pente 2) ; une pente qui n'est ni un
  nombre ni une fraction ; `line 5` et `line A` (une équation qui n'est pas un texte plantait plus loin avec un `TypeError`).
- **La pente peut être une fraction** : `line A,1/2` (avant : `NaN`).
- **`para` accepte les axes** `Ox` et `Oy`, comme `perp` et comme `Line` (avant : `null`).
- **Les raccourcis sont des fonctions du `build*` de leur figure** : `parsePointShorthand` (`buildPoint.ts`) et `parseLineShorthand`
  (`buildLine.ts`) remplacent `Draw._parseKeyCodePoint` et `Draw._parseKeyCodeLine` (supprimés). Ils renvoient la forme standard, ou `null` si le
  texte n'est pas leur raccourci, et `ParseError` s'il l'est mais est mal formé. Le raccourci d'un point garde toutes ses valeurs :
  `A(1,2,3)` est refusé par `pt` (avant : la troisième valeur était perdue).
- **Écritures de droite refusées** (avant : une droite fausse, ou rien) : `d=vAB.` (donnait `d=line v,A`), `d=A` (le texte `undefined` devenait un
  nom), `d=ABC` (`C` ignoré), `d=AB-x`, `d=y=2x+1` (écrire `d=line y=2x+1`). Les noms de points d'un raccourci sont une majuscule et des chiffres.
- **`Draw._prepare`** protège chaque ligne : une ligne qui ne peut pas être analysée est journalisée (`console.error`) et sautée, les autres sont
  analysées (avant : une erreur aurait arrêté toutes les lignes).
- **`parser.common.ts`** exporte les aides des builders : `isPoint`, `isLine`, `isAxis`, `isLineOrAxis`, `describeValue`, `buildError`, `expectCount`.

## 2026-10-29 : `Circle` : constructions, validation, intersections, `tikz()`

- **`ICircleConfig` est une union exclusive** (`src/figures/Circle.types.ts`) de cinq constructions : `{center, radius}` (inchangée), `{through: {A, B, C}}`
  (circonscrit), `{tangent: {center, to: line}}`, `{diameter: {A, B}}` et `{inscribed: {A, B, C}}`. `radius` accepte aussi `{point1, point2}` (la distance
  entre deux points). Nouveaux types : `CircleRadius`, `CircleByRadius`, `CircleThrough`, `CircleTangent`, `CircleDiameter`, `CircleInscribed` ;
  `ICircleConfig` est déplacé de `figures/Circle` vers `figures/Circle.types`. Les nouvelles écritures du parser (`circ A,B,C`, `circ A:B`…) sont
  ajoutées avec `buildCircle.ts`.
- **`InvalidArgumentError`** (qui nomme le cercle) pour zéro ou plusieurs constructions, un centre qui ne va pas avec un rayon, un rayon nombre ≤ 0 ou non
  fini, une position qui n'est pas `{x, y}`, un `tangent.to` qui n'est pas une droite. Avant : aucune validation (rayon négatif écrit dans le SVG,
  valeurs par défaut mortes `figures`, `property`, centre `{0, 0}` et rayon 1). Un constructeur qui échoue ne laisse rien dans le SVG ; le setter
  `config` qui échoue laisse le cercle comme il était.
- **Le setter `config` donne le bon rayon** (avant : la moitié, car `circle(rayon)` prend un diamètre), recalcule le cercle et replace le label.
- **`center` et `radius` sont des copies recalculées par `computed()`** (avant : le centre était l'objet `Point` vivant, le rayon était recalculé à chaque
  lecture). Un cercle se met à jour avant les figures qui en dépendent (`Draw` met à jour dans l'ordre de création).
- **Un cercle qui n'existe pas** (centre non fini, points alignés, centre sur sa tangente, rayon point confondu avec le centre) **n'est pas dessiné**
  (`visibility="hidden"`), `center` et `radius` valent `NaN` (avant : `NaN` écrit dans le SVG).
- **Intersections** : `intersectionWithLine(line)` perd son paramètre `segment` (jamais utilisé) et la droite est toujours la droite entière. Une droite
  tangente donne **un** point (avant : deux points identiques), deux cercles tangents un point, avec une tolérance (avant : des cercles presque tangents
  donnaient deux points ou `NaN`). Une droite dégénérée ou un nombre non fini donne `null`. Calcul dans des fonctions pures `intersectionCircleLine` et
  `intersectionCircleCircle` (`calculus/intersections.ts`), plus `circumcircle`, `incircle`, `circleWithDiameter`, `circleTangentTo` (`calculus/computeCircle.ts`).
- **`follow`** d'un point au centre le place à droite sur le cercle (avant : `NaN`) ; sans cercle, le point est inchangé.
- **`Circle.tikz()`** est implémentée (avant : `NotImplementedError`) : `\draw[…] (centre) circle[radius=r];`, avec `x radius` et `y radius` quand les
  échelles des axes diffèrent, puis le label. Rien pour un cercle masqué ou qui n'existe pas.

## 2026-10-29 : `buildCircle` : constructions, `buildArc` séparé, forme alternative `*`

- **`buildCircle(item, figures)`** (le paramètre `graphConfig`, inutilisé, est retiré) **lève `ParseError`** au lieu de renvoyer `null` : mauvais nombre de
  valeurs, mauvais type de figure, nom inconnu dans `A:B`. Le message nomme la ligne (`"P" (circ)`).
- **Nouvelles écritures de `circ`** : `circ O,A:B` (rayon = distance de A à B), `circ A,B,C` (par trois points), `circ A,B,C,*` (inscrit dans le triangle),
  `circ O,d` (tangent à la droite d), `circ A:B` (de diamètre [AB]). **`circ A,B,C` change de sens** : avant, le troisième point était ignoré et la ligne
  donnait un cercle de centre A et de rayon AB. `circ O,Ox` et `circ O,Oy` donnent le cercle de centre O tangent à l'axe (`tangent.to` est une droite ou un
  axe : `ILine`).
- **Valeurs de trop refusées** (avant : ignorées) : `circ O,3,5`.
- **Forme alternative : un dernier `*`** (`ALTERNATIVE`, `isAlternative`, `parser.common.ts`). **`dpt A,d,3,x` n'est plus accepté** : le quatrième argument
  de `dpt` rend la direction perpendiculaire seulement s'il vaut `*` (avant : n'importe quelle valeur, `1`, `true`, `x`). Une autre valeur est une `ParseError`.
- **Plot** (`Plot.ts`, `Plot.types.ts`, `Plot.constraints.ts`, `buildPlot.ts`, `calculus/computeCurve.ts`, 2026-10-29). **La clé `quad` est supprimée** : `f=quad A,B,C` devient `f=plot A,B,C`
  (parabole par trois points, droite si alignés ; `buildQuad` et `PARSER_TYPE` de `quad` n'existent plus). `IPlotConfig` est une union exclusive (`expression` ou `quadratic: {A, B, C}`,
  avant : `expression: string | null` et `quadratic?: XY[]`, qui n'acceptait que des `Point`), avec les options `domain`, `image`, `samples`, `tolerance`, `maxDepth`, `asymptoteThreshold`.
  **Le tracé change** : `samples` reste « par unité de x » mais son défaut passe de « pixels par unité » à « un tous les 8 pixels » ; la courbe est affinée là où elle courbe et simplifiée
  (`tolerance` 0,5 pixel au lieu de 1) : environ vingt fois moins de points, des chemins avec 2 décimales, la courbe arrive jusqu'au bord de la définition (`sqrt(x)`, `sqrt(4-x^2)`),
  et seule la partie visible du domaine est calculée. Les points au-delà de `asymptoteThreshold` hauteurs sont coupés (avant : ramenés à cette valeur). `evaluate(x, asCoordinates)` n'a plus de
  booléen : `evaluate(x)` donne des pixels, `valueAt(x)` l'ordonnée en unités (`NaN` hors définition). Une parabole dont deux points ont la même abscisse n'est plus une `MathError` à chaque
  déplacement : elle n'est pas tracée (`numExp` vaut `NaN`). Le constructeur et le setter lèvent `InvalidArgumentError` (option invalide, variable autre que `x`) ou `ParseError` (expression) sans
  rien laisser dans le svg ; avant, `samples <= 0` ou un domaine infini bouclaient sans fin. `buildPlot` lève `ParseError` (plus de `null`, plus de repli silencieux de `@0` à 10, plus de
  valeurs ignorées), lit l'expression telle qu'écrite (un nom de figure n'est plus converti) ; `f(x)=` sans `=` ou sans expression est une `ParseError` (avant : `f=plot undefined`).
  `parsePlotShorthand` remplace `Draw._parseKeyCodePlot` pour `(x)` ; `(t)` reste dans `Draw` jusqu'à `Parametric`. `buildParametric`, `buildFollow`, `buildFillBetween` et `buildRiemann`
  quittent `buildPlot.ts` pour leurs fichiers (sans changement). `Plot.tikz()` est écrit (pgfplots), ainsi que `NumExp.toPgf()` et `AbstractFigure._tikzUnits()`.
- **Axes par identifiant** (`Point.constraints.ts`, `Line.constraints.ts`, `Circle.constraints.ts`, `Line.types.ts`, `Point.types.ts`, `Circle.types.ts`, `parser.common.ts`, `Axis.ts`, `Draw.ts`, 2026-10-31). **Les axes `Ox` et `Oy` ne sont plus
  des chaînes** : `Graph.axes.x` et `.y` (des `Axis`, donc des `Line`) sont passés aux contraintes. **`ILine` disparaît** (c'était `Line | 'Ox' | 'Oy'`) : `bisector`, `parallel`, `perpendicular`, `intersection`, `projection`, `symmetry`, `direction` et
  `tangent` prennent une `Line`. `mathLineOf(line)` n'a plus de `config`. `isAxis` et `isLineOrAxis` disparaissent (`isLine`). **Les axes obliques sont justes** (avant : toujours l'horizontale et la verticale par l'origine), et l'intersection d'un
  cercle et d'un axe existe (avant : une erreur). `Axis.unit` est nouveau : le déplacement `dpt` le long d'un axe se fait dans l'unité de cet axe (l'unité de l'axe y le long de `Oy`, comme avant). `Draw` passe `Ox` et `Oy` aux `build*` en plus des figures ;
  **une figure ne peut plus s'appeler `Ox` ou `Oy`** (`ParseError`). Un axe qui n'est pas montré garde une marge de 0 pour rester entier. `drag=Ox` et `drag=Oy` ne changent pas.
- **Grilles et axes depuis le code, axes au bord, sélection des repères** (`buildGrid.ts`, `buildAxis.ts`, `Grid.ts`, `Axis.ts`, `computeGrid.ts`, `computeAxis.ts`, `computeLayout.ts`, `Graph.ts`, `Draw.ts`, `parser.interval.ts`, 2026-10-31).
  **Nouvelles clés `grid` et `axis`** du parser (`PARSER_TYPE.GRID`, `AXIS`) : `g=grid 0:5,0:3,0.5->subgrid=4`, `a=axis A,B,pi/2->name=t` (figures enregistrées, sans effet sur le graphe). **`buildGrid(grid, gridX, gridY)` devient `buildGridParameters`** ;
  `buildGrid(item)` lit la ligne de code. `IGridConfig` gagne `x`, `y` (la portion : multiples du pas et bords) ; `IAxisTicks` gagne `marks` et `numbers` (`{every?, first?}`, `numbers` aussi `'none'`) ; `IAxisDisplay` gagne `marks`, `numbers`, `padding`.
  **Options** : `ticks`, `numbers`, `name`, `side`, `padding` sont les options d'un axe (`applyAxisOption`) ; `first` est le repère d'indice +1 seulement, `n/first` les multiples de `n` et ce repère. Pour les paramètres du graphe, `ticks`, `numbers` et `padding` écrits après `axis`/`axisX`/`axisY`
  sont lus par `buildLayout` (un pas de 1 si l'axe n'en a pas) ; `name` et `side` y sont une `ParseError`. **Les axes hors de la fenêtre sont maintenant dessinés** au bord le plus proche (2 px), nombres vers l'intérieur (avant : invisibles) ; `Graph.axes` reste les droites
  `y = 0` et `x = 0` (cachées si déplacées), `Graph.drawnAxes` donne ceux qu'on voit (`Ox-edge`, `Oy-edge` si déplacés) et reçoit les options des paramètres. `Graph.create` gagne `grid` et `axis`. `g=grid` sans valeur n'est plus lu comme un raccourci de droite (`parseLineShorthand`).
- **Graduations** (`computeAxis.ts`, `Axis.ts`, `Axis.types.ts`, `Axis.constraints.ts`, `Graph.ts`, 2026-10-30). **`axis=<pas>` et `axisXname=…` dessinent maintenant** (avant : lus, ignorés) : un repère de 6 px et un nombre à chaque pas
  (au plus 2 décimales, des fractions de π avec `axis=pi/…`), le nom au bout de la flèche. `IAxisOptions` gagne `ticks` (`IAxisTicks` : `step`, `labels`, `digits`, `size`, `zero`), `name` et `side` ; une contrainte sans zéro (`slope`, `parallel`…) avec `ticks`
  lève `InvalidArgumentError`. `Axis.ticks` et `Axis.drawnName` donnent ce qui est dessiné. `Axis.tikz()` écrit en plus les repères (un `\draw`, sans la flèche) et un `\node` par nombre et par nom, en mode math (`$\frac{\pi}{2}$`). Un dessin dont les axes
  n'ont pas de pas ne change pas.
- **Paramètres du graphe** (`buildLayout.ts`, `computeLayout.ts`, `buildGrid.ts`, `buildAxis.ts`, `Grid.ts`, `Draw.ts`, `Graph.ts`, 2026-10-30). **Nouvelle grammaire de `parameters`** : `x`, `y` (bornes avec `pi`, `x=6` pour `-6:6`),
  `box`, `unitX`, `unitY`, `axis`/`axisX`/`axisY`, `axisXname`/`axisYname`, `grid`/`gridX`/`gridY`, `default.label`, `default.tex`, `default.points`. **Supprimés (ParseError qui nomme le remplaçant)** : `ppu`, `subgrid`, `label`, `tex`,
  `points`, `no-points` ; **une clé inconnue est une `ParseError`** (avant : ignorée), comme une valeur invalide (avant : ignorée ou remplacée par un défaut : `x=-2pi:2pi` retombait sur -8:8, `grid=2` ne dessinait rien).
  **`unitX` / `unitY` changent de sens** : la longueur d'une unité en **cm** (avant : un multiplicateur du `ppu`), et les bornes `x` / `y` sont en unités du repère (avant : en unités de base, sans tenir compte de `unitX`). **`ppu` disparaît**, ainsi que
  `IGraphConstructorConfig.ppu` : le dessin a sa **taille réelle** (`dx · unitX` cm sur `dy · unitY` cm, 1 cm = 37,94 px) au lieu de remplir le conteneur ; le `<svg>` prend `width` en pixels, `max-width: 100%` et `height: auto`. Le `viewBox` ne dépend plus de la
  largeur du conteneur mesurée au chargement. Sans `parameters`, `Draw` utilise la fenêtre -8:8 (avant : les 800 x 600 de `Graph`). **`subgrid` devient l'option `subgrid[=n]` de `grid`** (`grid->subgrid=4`) ; il coupe le **pas de la grille** (avant : l'unité),
  avec la couleur de la grille à moitié d'opacité (avant : violet). `Grid` gagne `subdivisions` ; `Graph.grid(name, …)` et `Graph.subgrid(name, n)` disparaissent (`Graph.mainGrid` donne la grille). `IGraphDisplay` devient `{axis?, grid?}` (`axis` : booléen ou chaque axe).
  Un axe peut être montré seul (`axisX`). Les options d'un axe ou de la grille s'écrivent après `->`, jusqu'à `,,` : `axis=pi/2,grid=2->red,w=5,,unitX=5`. `Draw.refreshLayout` lève `ParseError` (avant : jamais), et son constructeur aussi pour des `parameters` invalides.
  `_parseLayout` disparaît. La démo affiche l'erreur sous le champ des paramètres.
- **Grid et Axis** (`Grid.ts`, `Grid.types.ts`, `Grid.constraints.ts`, `buildGrid.ts`, `Axis.ts`, `Axis.types.ts`, `Axis.constraints.ts`, `buildAxis.ts`, `computeGrid.ts`, 2026-10-30). **`CoordinateSystem` est supprimé**, ainsi que
  `Graph.coordinate_system()`, `ICoordinateSystem` et l'ancien `IAxisConfig` (`color`, `half`, `length`, `padding`, jamais lus). **`Axis` (nouvelle, une `Line`) le remplace** : `Graph` crée toujours `Ox` et `Oy` (`Graph.axes`),
  dessinés seulement avec `axis` ; un axe hors du dessin ou plus court que sa marge est caché (avant : il gardait sa dernière position). **`IGraphDisplay`** devient `{axis?: boolean, grid?: boolean | IGridConfig, subgrid?: number}`
  (`IGraphAxisType` disparaît). **`Grid` prend un pas en unités** (`{step: {x, y}}`, 1 par défaut) au lieu d'une copie de la config du graphe et de vecteurs en pixels ; `Graph.grid(name, config)` et `Graph.subgrid(name, n)` changent de
  signature et renvoient une `Grid`. Les lignes sont calculées directement (avant : une boucle de pas, juste pour des axes orthogonaux) ; une grille dont les lignes seraient à moins de 3 pixels n'est pas dessinée (avant :
  `Error("Too many lines")` après 1000 lignes, qui faisait échouer tout le dessin) ; un pas nul, négatif ou qui n'est pas un nombre lève `InvalidArgumentError`. **Parser** : `grid=0.5` fonctionne (avant : ignoré sans erreur) ;
  `subgrid` seul vaut `subgrid=2` (avant : ignoré) ; une valeur invalide de `grid`, `subgrid` ou `axis` lève `ParseError` (avant : ignorée ou incomplète) ; une `grid` dont la valeur est `pi` a un dénominateur entier
  obligatoire (avant : un dénominateur invalide valait 2 sans le dire). `Grid` et `Axis` ont un `tikz()`. `POLAR` lève `NotImplementedError` (avant : repère cartésien). Le tracé d'une grille aux axes obliques est juste
  (l'ancien code mélangeait les composantes des vecteurs).
- **Label** (`Label.ts`, 2026-10-30). **`Label.auto_rotate` devient `autoRotate`.** `Label.x` et `Label.y` ne sont plus modifiables (les setters ne déplaçaient rien), le getter `Label.label` (doublon de
  `shape`) disparaît, `_element` est protégé, `visible` est nouveau. **`setLabel` écrit le texte dans le même élément** (avant : il retirait l'élément svg et en créait un autre) : un label caché par `?`
  le reste après une mise à jour, et rien n'est repositionné ni mesuré quand le texte, l'ancre, l'alignement, le décalage et la rotation n'ont pas changé (`move` ; `position()` redessine toujours).
  **Une rotation de 0 remet le label droit** (avant : un label tourné le long d'une droite le restait quand la droite devenait horizontale). **`size` agit aussi sur un label texte** (avant : seulement
  HTML ; un label sans `size` avait `font-size: undefined`). **Le texte d'un label HTML est écrit comme texte quand il n'y a pas de `texConverter`** (avant : inséré comme HTML, donc exécutable) ;
  `Graph.toTex` vaut `undefined` quand le graphe est fait sans `tex` (avant : l'identité), et `AbstractFigure.addLabel` ne remplace plus un convertisseur absent. Le constructeur de `Label` prend des
  options facultatives (`LabelOptions`), `ILabelConfig` n'a plus `text` (le texte est `displayName`) et a `texConverter` facultatif. `css('vector-effect', 'non-scaling-size')` (valeur invalide, sans
  effet) est retiré. `LabelType` de `pidraw.common.ts` (inutilisé) est supprimé. `labelCenter` (calcul pur de la place du label) est nouveau.
- **FillBetween** (`FillBetween.ts`, `FillBetween.types.ts`, `FillBetween.constraints.ts`, `buildFillBetween.ts`, `computeFillBetween.ts`, 2026-10-30). **`expressions: [f, g]` devient `{plot: f, other: g}`**
  (`other` facultatif). **`image` est supprimée** (config et parser : `fill f,g,0:3,-2:2` lève `ParseError`) : elle était lue mais jamais appliquée. **`fill f` va bien jusqu'à l'axe des x** (avant : l'aire était
  fermée par une corde, le déplacement `m <min> 0` étant relatif et en pixels). L'aire est calculée à partir des fonctions des plots (avant : à partir de leur tracé, filtré par abscisse) ; les bords du
  domaine sont exacts (avant : au dernier échantillon), les courbes coupées par une asymptote ou une fonction non définie donnent des morceaux séparés bien formés (avant : un seul chemin mêlant `M` et
  les commandes). Le domaine par défaut est celui des plots, sinon ce qu'on voit (avant : toute la largeur en pixels) ; un domaine invalide ou des plots sans abscisse commune lèvent
  `InvalidArgumentError` (avant : `{min: NaN, max: NaN}` et une aire vide). Les lignes invalides lèvent `ParseError` (avant : `null`) et le domaine accepte `pi`. `samples` (assigné mais absent de
  l'interface) disparaît. `area` et le champ de label `area` sont nouveaux (`LabelFieldName`), `moveLabel()` et `tikz()` sont écrits (`pgfplots` avec la bibliothèque `fillbetween`).
- **Riemann** (`Riemann.ts`, `Riemann.types.ts`, `Riemann.constraints.ts`, `buildRiemann.ts`, `computeRiemann.ts`, 2026-10-30). **`IRiemannConfig.follow` devient `plot`** et ses champs `domain`, `rectangles` et
  `position` sont facultatifs (avant : obligatoires). **Le domaine par défaut est celui du `Plot`**, et une somme sans domaine (ni le sien ni celui du plot) lève `InvalidArgumentError` (avant :
  `{min: NaN, max: NaN}`, des rectangles `NaN`). **La doc dit maintenant ce que le code faisait** : `position` va de `0` (gauche, défaut) à `1` (droite), `0.5` au milieu ; la valeur `-1` de
  l'ancienne doc est refusée. Le domaine accepte `pi` (`0:2pi`). Les valeurs invalides lèvent `InvalidArgumentError` (avant : corrigées sans le dire : `rectangles <= 0` valait 10, `position` était
  plafonnée à 0..1 dans le getter, un nombre de rectangles non entier ou énorme passait) ; le nombre de rectangles est un entier de 1 à 1000. Les rectangles d'une fonction négative sont sous l'axe
  (avant : ils partaient de la courbe vers le bas) et il n'y en a pas là où la fonction n'est pas définie (avant : des attributs `NaN`). Les rectangles forment un seul `path` (avant : un `rect` par
  rectangle dans un groupe `id=name`). `rectangles` et `position` valident et redessinent (avant : sans recalcul) ; `sum`, `rectanglesDrawn` et les champs de label `sum` et `rectangles` sont nouveaux
  (`LabelFieldName`) ; `tikz()` et `moveLabel()` sont écrits. `buildRiemann` lève `ParseError` (avant : `null`) et vérifie que la figure est un `Plot` (avant : un cast).
- **Follow** (`Follow.ts`, `Follow.types.ts`, `Follow.constraints.ts`, `buildFollow.ts`, 2026-10-29). **`follow f` ne montre plus la tangente** : l'option `tangent` était ignorée et la tangente toujours
  tracée ; maintenant elle ne l'est qu'avec `follow f,*`. **Le mot `show` est supprimé** (`follow f,show` devient `follow f,*`). **Le point part de l'origine du repère**, comme le commentaire du code
  le disait (avant : du pixel (0, 0), le coin du dessin). `IFollowConfig.follow` passe de `Plot` à `AbstractFigure` (une figure `followable`) ; `at` (position de départ) est nouveau, ainsi que
  `follow f,A`. Une courbe paramétrique, une droite et un cercle se suivent (avant : seulement `Plot`). Le constructeur et le setter lèvent `InvalidArgumentError` (figure qui ne peut pas être
  suivie, taille invalide) sans rien laisser dans le svg. Le point est replacé sur la figure à chaque calcul (avant : il restait à son ancienne place si la figure changeait) et se cache avec la
  tangente quand la figure n'existe pas sous la souris (avant : la tangente restait). La tangente est calculée par une différence centrée à deux sondes (avant : un décalage de 0,01 pixel d'un
  seul côté, nul pour une droite à −45°) et découpée sur le cadre (`clipSegment`). `moveTo(x, y)`, `position` et `dispose()` sont nouveaux ; `AbstractFigure.followable` et `AbstractFigure.dispose()`
  aussi (vrai pour `Line`, `Circle`, `Plot`, `Parametric` ; `Graph.clear()` appelle `dispose()`, qui retire l'écouteur de la souris, resté attaché jusque-là). `Parametric.follow` est nouveau
  (`nearestOnPolyline`, `computeCurve.ts`). `buildFollow` lève `ParseError` (avant : `null`). `moveLabel` et `tikz()` sont écrits (l'état dessiné). `labelBesideWay` (`Label.ts`) factorise le
  placement du label des courbes (`Parametric`, `Bezier`, `Follow`). Ajout (2026-10-30) : `Arc`, `Polygon` et `Bezier` sont `followable` et redéfinissent `follow(x, y)` (un arc se suit sur son seul
  arc et s'arrête à ses extrémités, un polygone sur son contour) ; `follow a`, `follow p` et `follow b` sont acceptés par le parser (avant : `ParseError`). Nouveaux : `nearestOnArc`,
  `nearestOnPolygon`, `bezierPolyline` (`calculus/`).
- **Bezier** (`Bezier.ts`, `Bezier.types.ts`, `Bezier.constraints.ts`, `buildBezier.ts`, `calculus/computeBezier.ts`, 2026-10-29). **Nouvelle forme de la config** : `IBezierConfig` est une union exclusive
  `through: BezierPoint[]` (`{point, direction?, ratio?}`) ou `controls: XY[]`, avec `closed?` (avant : `{points: [{point, controls: {type, ratio, left, right}}]}`) ; `graph.create.bezier` change. Sont supprimés :
  l'énumération `BEZIERCONTROL` (et `POLYGON_CONSTRAINT`, sans usage depuis `Polygon`), `controls.left` et `controls.right` (jamais lus), `setControlRatio`, `setControlType`, `getPointByName`, le
  setter `points` (qui modifiait les objets reçus) ; `IBezierPointInterface` n'existe plus. **Le sens de `H` et `V` suit le chemin** (avant : `H` partait toujours vers la droite de l'écran et `V` vers
  le bas, ce qui faisait des boucles quand le voisin était de l'autre côté) ; une courbe sans direction est inchangée au pixel près (vérifié contre l'ancien algorithme). Nouveau : un angle en degrés
  (`A/45`), `S` explicite, `bezier A,B,C,D,*` (courbe tirée par 3 ou 4 points de contrôle), l'option `->close` (`applyBezierOption`). Les nombres du chemin ont 2 décimales. Le constructeur et le setter lèvent
  `InvalidArgumentError` (moins de 2 points, 3 pour `closed`, position, direction, ratio invalides) sans rien laisser dans le svg ; une position sans valeur ne produit plus `NaN` dans le chemin : la courbe
  n'est pas tracée. Le setter `config` recalcule, la config est copiée. `buildBezier` lève `ParseError` (avant : un nom inconnu était ignoré, un contrôle inconnu devenait lisse, un ratio absurde était `NaN`,
  n'importe quelle figure était prise pour un point). `moveLabel` (qui levait `Error`) et `tikz()` sont écrits. `PARSER_TYPE.BEZIER` est nouveau.
- **Polygon** (`Polygon.ts`, `Polygon.types.ts`, `Polygon.constraints.ts`, `buildPolygon.ts`, `calculus/computePolygon.ts`, 2026-10-29). **La clé `reg` est supprimée** (une clé par sorte de figure) :
  `reg O,3,6` devient `poly O,3,6`. **`reg O,A,5` (centre et sommet) n'existe plus** : `poly A,B,5` est maintenant le polygone régulier dont `[AB]` est un côté (à gauche de A vers B), il ne
  se confond pas avec l'ancien sens. Le rayon est un nombre ou `B:C` (avant : un point, qui était le premier sommet). Nouveau : `poly O,3,5,2` et `poly A,B,5,2`, le polygone étoilé `{n/k}` (pentagramme,
  deux triangles pour `{6/2}`). `IPolygonConfig` est une union exclusive (`vertices`, `regular: {center, radius, sides, star?}`, `onSide: {A, B, sides, star?}`) ; `mark.center` (les traits gris du centre aux
  sommets, inaccessibles du parser) et le getter `radius` sont supprimés. L'élément svg est un `<path>` (avant : `<polygon points>`), pour tracer plusieurs boucles. `poly A,B` (2 points) est une
  `ParseError` (avant : acceptée, rien n'était dessiné). Le constructeur et le setter lèvent `InvalidArgumentError` (moins de 3 sommets, `sides` pas un entier de 3 à 1000, `star` pas un entier de 1 à moins
  de `sides/2`, rayon <= 0) sans rien laisser dans le svg ; avant, `sides` infini bouclait sans fin. Un polygone dont une position n'existe pas n'est pas dessiné (avant : attribut `points` invalide). Le setter
  `config` recalcule (avant : le polygone régulier restait vide) et `update()` n'est plus redéfini (avant : il court-circuitait `static` et le label). `vertices` et `centroid` sont des copies en pixels.
  `moveLabel` et `tikz()` sont écrits. `buildPolygon` lève `ParseError` (plus de `null`).
- **Parametric** (`Parametric.ts`, `Parametric.types.ts`, `Parametric.constraints.ts`, `buildParametric.ts`, `parser.curve.ts`, 2026-10-29). **Le domaine par défaut passe de `-2pi:2pi` à `0:2pi`**
  (un tour). Le tracé est celui de `Plot` (`sampleCurve`) : adaptatif, 0,5 pixel d'écart, coupé aux valeurs indéfinies (avant : `L NaN NaN`, un chemin invalide), dernière valeur du domaine
  incluse (avant : `t < max`). `samples` par défaut : au moins 64 intervalles au départ au lieu de « pixels par unité » de `t`. `IParametricConfig` étend `CurveOptions` (`domain`, `samples`,
  `tolerance`, `maxDepth`, `asymptoteThreshold`). Le constructeur et le setter valident (`InvalidArgumentError`, `ParseError`) sans rien laisser dans le svg ; le setter recompile les fonctions
  (avant : changer `expressions` n'avait aucun effet) ; `samples <= 0` ou un domaine infini bouclaient sans fin. `valueAt(t)` (unités) est nouveau, `evaluate(t)` reste en pixels. `moveLabel` et
  `tikz()` sont écrits. **Parser** : `f=parametric x,y,domaine` est enfin accepté (avant : `null` en silence), avec `@samples` ; les bornes d'un intervalle peuvent contenir `pi` et des expressions
  de nombres (`0:2pi`, `.5pi:pi/2`), pour `parametric` et pour `plot`. **`@samples` ne marchait pas** (le `@50` restait collé à l'expression, que `NumExp` refusait) : il est maintenant lu
  (`sin(x)@50`, `,@50`, `-pi:pi@50`). `buildParametric` lève `ParseError` ; `parseParametricShorthand` remplace `Draw._parseKeyCodeParametric` (qui disparaît) ; `f(t)` sans `=` est une `ParseError`.
  `NumExp.toPgf(rename)`, `AbstractFigure._tikzAxis` / `_tikzView` / `_tikzSamples` / `_tikzCurveStyle`, `labelAlignementToward` (`Label.ts`, aussi pour `Arc`) et `endOfCurve` (`computeCurve.ts`) sont nouveaux.
- **Arc** (`src/figures/Arc.ts`, `Arc.types.ts`, `Arc.constraints.ts`, `buildArc.ts`). `IArcConfig` est une union exclusive (`points`, `angles`, `rotation`) avec les options
  `alternative`, `sector`, `square` (avant : `{start, center, end, radius?, morphToSquare, sector, acute}`). **`acute` est supprimé** : `arc B,A,C,*` donne l'autre arc ;
  l'option `->acute` est ignorée sans erreur. `morphToSquare` devient `square`. `buildArc` lève `ParseError` au lieu de renvoyer `null`, refuse les valeurs en trop et un
  rayon qui n'est ni nombre, ni point, ni `A:B` ; il ne lit plus les options : `Draw` applique `sector` et `square` (`applyArcOption`, `OptionError`). Nouvelles syntaxes `arc O,2,30,120` et
  `arc O,A,60`. Sémantique : `square` ne trace une équerre que si l'arc couvre 90 degrés (avant : dès que les côtés étaient perpendiculaires, même pour un arc de 270). Le
  constructeur lève `InvalidArgumentError` (rayon invalide, angle non fini, deux constructions) ; un arc sans position ou de deux directions identiques n'est pas dessiné. `center`, `start`,
  `end`, `radius` sont des copies recalculées en pixels ; `getAngles()` est supprimée. `Arc.tikz()` est écrit. Le `*` de `Arc` aussi : le défaut de `morphToSquare` perdu (config écrasée) disparaît.
- **Position du label** : `Label.alignementGiven` ; `Draw` ne passe plus `'br'` quand `label=…` n'a pas de position (il passe `undefined`), ce qui laisse la figure choisir (un arc place
  son label du côté de l'angle, sans écraser la position donnée). `AbstractFigure._tikzRadius(pixels)` remplace `Circle._tikzRadius()`. `parseRadius` (`parser.common.ts`) est partagé par `circ` et `arc`.
- **`bis d1,d2,*`** (l'autre bissectrice) : `LineConstraints.bisector` prend `{d1: ILine, d2: ILine, alternative?: boolean}` (avant : `d1` et `d2` étaient des
  `Line`) ; les axes `Ox`/`Oy` sont acceptés (`bis Ox,d`). `bisectorOfLines(d1, d2, alternative = false)`. `bis d1,d2,3` ou `bis d,A,*` sont des `ParseError`
  (avant : `bis d1,d2,x` était pris pour trois points et refusé de la même façon, mais le message ne parlait pas des droites). `mathLineOf(line, config)`
  (`Line.constraints.ts`) remplace la fonction privée `lineOf` de `Point.constraints.ts`.
- **`A:B`** est lu par `parsePointPair` (`parser.common.ts`), commun au point et au cercle. Trois noms (`A:B:C`) sont maintenant refusés (avant : les deux
  premiers étaient pris, le troisième ignoré).
- **`buildArc`** est dans son propre fichier `src/parser/buildArc.ts` (même comportement ; son analyse viendra avec `Arc.ts`). `parser_config` décrit les
  nouvelles écritures de `circ`.

## 2026-10-31 : `Path` : config typée, validation, `path` dans le parser

Fichiers : `src/figures/Path.ts`, `Path.types.ts`, `Path.constraints.ts`, `src/calculus/computePath.ts`, `src/parser/buildPath.ts`.

- **`new Path(context, name, values)` prend un `IPathConfig`** `{d, units?}` (avant : la chaîne `d`). `Graph.create.path(values: IPathConfig, name)` de même. `units: true` écrit les
  données en unités du repère (le chemin suit le repère quand il change) ; par défaut les données sont en pixels, comme avant.
- **Les données sont validées** : un `d` qui n'est pas un chemin SVG (ne commence pas par `M`, commande inconnue, nombre manquant) lève `ParseError`, un `d` qui n'est pas un texte ou
  des `units` qui ne sont pas un booléen lèvent `InvalidArgumentError`, sans rien laisser dans le svg (avant : le texte était donné tel quel au svg). Le setter `d` valide de même et laisse
  le chemin intact en cas d'erreur, puis redessine le chemin et son label.
- **Le chemin est relu en lignes et courbes cubiques absolues** : le `d` du svg produit est réécrit (`m 10 10 l 5 0` devient `M 10 10 L 15 10`, un arc devient des courbes `C`, nombres à
  2 décimales). `Path.commands` (pixels) est nouveau.
- **`Path.moveLabel()` ne lève plus** `NotImplementedError` : le label est au milieu du plus long morceau, à gauche du sens du tracé. `Path.tikz()` est écrit (avant :
  `NotImplementedError`) ; `Path.followable` et `Path.follow(x, y)` sont nouveaux (`follow p` fonctionne).
- **Parser** : nouvelle clé `path` (`p=path M 0,0 L 2,1 Q 3,3 4,0 Z`), en unités. Les virgules de la ligne sont remises dans les données. Avant : aucune syntaxe ne créait un chemin.

## 2026-10-31 : un dossier par figure, `Label` en trois fichiers, TikZ d'un label en TeX

- **TikZ d'un label écrit en TeX** (option `tex`) : le texte du `\node` est entre `$…$` (sauf s'il contient déjà un `$`). Avant : `{A_1}`, que LaTeX refuse en mode texte. Un label sans `tex` ne change pas.
- **Chemins** : `src/figures/<Figure>.ts` devient `src/figures/<Figure>/<Figure>.ts` (idem `.types.ts` et `.constraints.ts`) ; `src/parser/build<Figure>.ts` devient `src/figures/<Figure>/<Figure>.parser.ts` ; `src/labels/Label.ts` devient
  `src/figures/Label/Label.ts`. Les fonctions gardent leur nom. `src/index.ts` exporte les mêmes types (et `Label.types`) ; `dist/` et `types/` sont régénérés (anciens fichiers à supprimer).
- **`Label`** : les types (`LABEL_POSITION`, `LabelContent`, `LabelFields`, `ILabelConfig`, `LabelOptions`…) sont dans `Label.types.ts` et les fonctions pures (`checkLabelContent`, `renderLabelContent`, `labelCenter`, `labelAlignementToward`,
  `labelBesideWay`) dans `Label.constraints.ts` ; `Label.ts` ne garde que la classe.
- **Constantes** : `MIN_TICK_SPACING`, `MIN_LABEL_SPACING`, `ARROW_CLEARANCE`, `LABEL_GAP` (renommée `NUMBER_GAP`), `NAME_GAP` ne sont plus exportées par `Axis.constraints.ts` ; `MIN_SPACING` ne l'est plus par `Grid.constraints.ts`. `PIXELS_PER_SAMPLE` est
  exportée par `calculus/computeCurve.ts`. `positions` et `radiusOf` sont dans `figures/constraints.ts` (avant : `Circle.constraints.ts`). `parseStep`, `parseStepValue`, `given` et `IStep` sont dans `src/parser/parser.step.ts`
  (avant : `Grid.parser.ts`), `parsePointsSetting` dans `buildLayout.ts` (avant : `Point.parser.ts`). `domainOf` de `FillBetween` et `Riemann` et `compile` de `Plot` et `Parametric` gardent leur nom et leur sortie.

## 2026-10-31 : construction et mise en page de `Graph`

Fichiers : `src/Graph.ts`, `src/Draw.ts`, `src/calculus/computeLayout.ts`, `src/figures/Axis/Axis.constraints.ts`.

- **`new Graph(id)` lève `InvalidArgumentError`** si l'élément `id` n'existe pas (avant : le graphe était créé dans un `DIV` détaché, sans erreur).
- **Configuration validée** (`resolveGraphConfig`, `checkGraphConfig`) : une largeur ou une hauteur qui n'est pas un nombre fini plus grand que 0, une origine non finie, ou un vecteur d'axe nul ou non fini lève `InvalidArgumentError` ;
  un système de coordonnées autre que cartésien lève `NotImplementedError` **avant** de toucher à la page (avant : un `DIV` restait dans le conteneur). Une erreur de construction ne laisse plus rien dans le conteneur.
- **`graph.config` ne contient que `width`, `height`, `origin`, `system`, `axis`** : `display` et `tex` n'y entrent plus. Une clé à `undefined` garde le défaut (avant : elle l'écrasait).
  **L'origine par défaut est le centre de `width x height`** (avant : toujours `{400, 300}`).
- **Les setters `graph.config =` et `graph.display =` sont supprimés** : `updateLayout(config?, display?)` les remplace. Il valide avant d'appliquer, et un échec laisse le graphe comme il était.
- **Correction** : `updateLayout()` ne supprime plus les grilles des figures (`g=grid` écrit dans le code), qui disparaissaient du svg mais restaient dans `figures` ; seul le décor (grille et axes du graphe) est retiré.

## 2026-10-31 : enregistrement des figures de `Graph` (`create`, `remove`, `clear`)

Fichiers : `src/Graph.ts`.

- **`graph.create.xxx(config, name)` lève `InvalidArgumentError`** si le nom n'est pas un texte non vide, est déjà celui d'une figure, ou est celui d'une figure du décor (`Ox`, `Oy`, `Ox-edge`, `Oy-edge`, `MAINGRID`). Avant : la nouvelle figure
  écrasait l'ancienne dans `figures` sans la retirer du svg (deux groupes de même `id`, l'ancien n'était plus mis à jour ni effacé par `clear()`). Le nom est contrôlé **avant** de construire la figure : rien n'est dessiné en cas d'erreur.
  `Draw` renomme déjà ses lignes (`_uniqueName`) ; un résultat multiple (`nom1`, `nom2`) ou le jumeau `X_drag` qui retrouverait un nom pris est maintenant signalé (`console.error`) au lieu d'écraser.
- **Types de retour exacts** : `create.follow`, `create.fillbetween` et `create.riemann` renvoient `Follow`, `FillBetween` et `Riemann` (avant : `AbstractFigure`). `create.grid` accepte une config absente.
- **Nouvelle méthode `graph.remove(name)`** : `dispose()`, retrait du svg et de `figures` ; un nom inconnu (ou celui du décor) lève `InvalidArgumentError`. `clear()` l'utilise.
- **`graph.figures` est un objet sans prototype** : `__proto__`, `toString`, `constructor` sont des noms de figure comme les autres, et `figures` garde la même identité après `clear()` (avant : un objet neuf).

## 2026-10-31 : mise à jour des figures par dépendances (`Graph.update`, `Graph.remove`)

Fichiers : `src/Graph.ts`, `src/Animate.ts`, `src/Draw.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`.

- **`graph.update(changed?, forceUpdate?)` remplace `update(except?: string[], forceUpdate?)`.** `changed` est une figure ou une liste de figures (plus des noms) : seules les figures qui en dépendent, directement ou non, sont redessinées, chacune une fois et après
  celles dont elle dépend ; les figures de `changed` ne sont pas redessinées (leur position est celle qu'on leur a donnée), seul leur label est replacé. Sans argument, toutes les figures sont redessinées comme avant. **`update(figures)` ne modifie plus
  la liste reçue.** Avant : toutes les figures sauf `except` étaient redessinées, et `except` recevait les noms des figures qui ont un jumeau `X_drag`.
- **`graph.updateLabels(except, forceUpdate)` est supprimé** (`update()` fait le travail). La convention de nom `X_drag` n'est plus lue par `Graph` : une figure que l'utilisateur tient (`draggable(figure, {target})` : la figure et sa cible) n'est jamais
  redessinée par une mise à jour, seul son label l'est. Avant, c'étaient les noms qui avaient un jumeau `_drag`, et une mise à jour forcée les laissait aussi.
- **Les dépendances sont lues dans `figure.config`** (les figures qu'elle contient, dans des objets et des listes) et relues quand une figure reçoit une autre config (`figure.config = …`). Une figure qui dépend d'elle-même lève `InvalidArgumentError`
  quand une mise à jour l'atteint. **`AbstractFigure` déclare `abstract get config(): object`** : une sous-classe doit la fournir (les figures de PiDraw l'ont déjà).
- **`graph.remove(name, {cascade?})` renvoie les noms retirés** (avant : rien) et **lève `InvalidArgumentError` si d'autres figures dépendent de celle-ci**, en les nommant. Avec `{cascade: true}` elles sont retirées d'abord. `clear()` retire tout sans ce contrôle.
- **`Animate._updatePoints()` renvoie les points animés** (avant : leurs noms) et `Graph.update` reçoit ces points.

## 2026-10-31 : glisser d'un point (`Graph.draggable`, `dragmove`, `update`)

Fichiers : `src/Graph.ts`, `src/Draw.ts`, `src/calculus/computeDrag.ts` (nouveau), `src/pidraw.common.ts`, `src/index.ts`.

- **Correction : le point suit la souris au pixel près.** `draggable` prenait le coin haut-gauche de la boîte de la forme pour le centre du point : un glissé de +10 px en x et +5 px en y le déplaçait de -5 px et -10 px (une demi-taille de la forme)
  puis le décalait encore à chaque geste. Le centre de la boîte est maintenant la position du point.
- **`IDraggableConfig`** : `along: 'x' | 'y'` (nouveau : le point se déplace parallèlement à l'axe et garde son autre coordonnée), `grid: boolean` et `bounds: {x?, y?}` (déclarés mais jamais lus : ils fonctionnent), `follow` (fonctions et figures),
  `target` et `callback` ne reçoivent que des points. **`bounds` est en unités du repère.** Les règles s'appliquent dans cet ordre fixe : `along`, `grid`, `bounds`, puis chaque `follow` (avant : l'ordre d'écriture de `drag=…`) ;
  une borne n'est jamais franchie par la grille.
- **`Graph.follow(value, obj)` est supprimé et `IDraggableFollow` perd `string`** : `Ox`, `Oy` et `grid` ne sont plus des chaînes lues par `Graph` (`Draw` traduit `drag=Ox` en `along: 'x'`, `drag=grid` en `grid: true`, un domaine en `bounds`).
  Une chaîne inconnue n'est plus ignorée sans rien dire : le type la refuse.
- **L'aimantation à la grille compte à partir de l'origine et suit le pas affiché** (avant : elle arrondissait les pixels du svg à des multiples de l'unité, donc entre les traits dès que l'origine n'est pas un multiple de l'unité, et ignorait le pas).
  Deux `drag=<domaine>` du même axe se recoupent, comme avant ; `drag=Ox/Oy` ensemble : le dernier l'emporte.
- **`draggable(figure: Point, options)` lève `InvalidArgumentError`** pour une figure qui n'est pas un point (avant : `TypeError` au premier glissé), un point déjà déplaçable (avant : écouteurs en double), un `along`, une `target`, un `follow` ou une borne invalide.
  Il garde le point dans le dessin en le bornant (avant : le mouvement était ignoré près du bord, avec des bords asymétriques).
- **`graph.update` renvoie `{updated, total}`** (`IGraphUpdate`) : les figures redessinées et déplacées, sur toutes les figures du graphe. **L'événement `dragmove` porte les mêmes champs** (`IGraphDragMoveEvent`).

## 2026-10-31 : le décor de `Graph` garde `Ox` et `Oy` (`updateLayout`, `resetStyle`)

Fichiers : `src/Graph.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`, `src/svg/marker.ts`.

- **`graph.axes.x` et `graph.axes.y` (`Ox` et `Oy`) sont les mêmes objets pour toute la vie du graphe** : `updateLayout` leur donne leur nouvelle droite et remet leur style à zéro, au lieu de les recréer. Avant, une figure construite sur `Ox` ou `Oy`
  (`H=proj A,Ox`, `P=inter d,Oy`…) gardait l'objet de l'ancien axe après un changement de mise en page (`refreshLayout`) et devenait fausse (`H` quittait l'axe). La grille et les axes de bord (`Ox-edge`, `Oy-edge`) sont toujours recréés.
- **`AbstractFigure.resetStyle()` (nouveau)** remet une figure dans l'état d'une figure neuve avant une nouvelle config : apparence, pointillés, marqueurs, moves et scales, label, animation, `isDraggable`, masquage. `static` n'est pas touché.
- **Les `defs` sont le premier enfant du svg d'un `Graph`** et `createMarker` cherche le marqueur dans les `defs` (avant : dans tout le svg, ce qui coûtait de plus en plus cher avec le nombre de figures). Créer un axe, donc redessiner le décor, ne dépend plus du nombre de figures.

## 2026-10-31 : `Graph.tikz()` écrit un `tikzpicture` complet

Fichiers : `src/Graph.ts`, `src/figures/AbstractFigure/AbstractFigure.tikz.ts`, `src/figures/Grid/Grid.ts`.

- **`graph.tikz()` renvoie un `tikzpicture` complet** : l'échelle (`x=…, y=…`), la taille de la fenêtre, la grille et les axes du graphe, puis les figures dans l'ordre du svg, sans les poignées des points déplaçables. Avant : les fragments des figures, sans grille
  ni axes, joints dans l'ordre de création (donc un ordre d'empilement qui pouvait différer de celui de l'écran).
- **`graph.tikzPreamble()` (nouveau) et `TIKZ_PREAMBLE`** : `tikz`, `pgfplots` (`compat=1.18`), les bibliothèques `arrows.meta` et `fillbetween`.
- **`graph.tikz()` lève `NotImplementedError`** si l'axe x ne va pas vers la droite ou l'axe y vers le haut (axes obliques, renversés), et **`InvalidArgumentError`** si le dessin dépasse ce que TeX peut tenir (16 383 pt, soit environ 576 unités d'un centimètre).
- **`Grid.tikz()` écrit `grid`** (`(-8,-6) grid[xstep=1, ystep=1] (8,6)`, avec `rectangle` pour les bords d'une grille partielle) au lieu d'une liste de segments. Les lignes sont les mêmes (comparées après compilation sur sept grilles : pas, boîtes,
  subdivisions). Quand `grid` ne dirait pas ce qui est dessiné (lignes trop serrées dans une direction, axes obliques), les segments sont écrits un par un comme avant.

## 2026-10-31 : `Graph.dispose()`, animation arrêtée par `clear()`

Fichiers : `src/Graph.ts`, `src/Animate.ts`.

- **`graph.dispose()` (nouveau)** : arrête l'animation, retire les figures et le décor, et retire du conteneur l'élément que le graphe y avait fait. Le graphe ne sert plus ensuite ; un second appel ne fait rien.
- **`graph.clear()` arrête l'animation** (avant : elle continuait sur des figures retirées). **`Animate.stop()` (nouveau)** arrête les images et le retour à l'état initial que `cancel()` prévoit, et oublie les points. `cancel()` ne prévoit
  plus qu'un seul retour à la fois (avant : un par appel).
- **`Animate.canBeAnimated()` et `Animate.start()` relisent les points** des figures de `graph.figures` (avant : ils gardaient ceux lus à la création de l'animation ou 200 ms après `cancel()`, donc périmés après `Draw.refresh(code)`). La relecture
  n'a pas lieu pendant que l'animation tourne ou est en pause, pour ne pas la relancer.
- **`Graph.emit` devient `Graph._emit`** (protégé, comme les autres membres protégés) et `Graph._Animate` devient `Graph._animation`.

## 2026-11-02 : `Draw` (`PiDraw`) possède un `Graph` au lieu d'en hériter

Fichiers : `src/Draw.ts`, `demo/components/demoParser.vue`, `tests/Graph.test.ts`, `tests/Draw.test.ts`, `bench/update.bench.ts`.

- **`Draw` n'étend plus `Graph`** : `new PiDraw(id, config)` crée un `Graph`, exposé par `draw.graph`, sans délégué. Tout ce qui venait de `Graph` s'écrit
  maintenant sur `draw.graph` : `create`, `figures`, `layers`, `axes`, `drawnAxes`, `mainGrid`, `config`, `display`, `rootSVG`, `animation`, `toPixels`, `toCoordinates`,
  `update`, `updateLayout`, `draggable`, `remove`, `clear`, `dispose`, `tikz`, `tikzPreamble`, `on`, `off`.
- **Les événements** (`dragstart`, `dragmove`, `dragend`) s'écoutent sur `draw.graph.on(...)` ; `Draw` n'est plus un `EventTarget`.
- **Reste sur `Draw`** : `refresh(code)`, `refreshLayout(parameters)`, `code`, `Draw.documentation()`.

## 2026-11-02 : `Draw` dans `src/Draw/`, lecture des lignes de code

Fichiers : `src/Draw/Draw.ts` (déplacé de `src/Draw.ts`), `src/Draw/Draw.lines.ts` (nouveau).

- **Import interne** : `src/Draw.ts` devient `src/Draw/Draw.ts`. `index.ts` exporte toujours `PiDraw`.
- **Les commandes `@begin:<clé>` / `@end:<clé>` sont supprimées** (elles ajoutaient une option aux lignes suivantes ; leur seul but, éviter de redessiner des figures marquées
  `static`, ne sert plus depuis l'optimisation de `Graph.update`). Une ligne qui commence par `@` est maintenant une erreur de la ligne : le caractère est gardé pour les
  groupes de slides. L'option `static` (`_`) d'une ligne reste. Avant : `@start:x` était lu comme un `@end:x`.
- **Une erreur autre qu'une `ParseError` pendant la lecture d'une ligne** (`TypeError` du parser...) est enveloppée dans une `ParseError` qui nomme la ligne (avant : affichée telle quelle).
- Les commentaires (`$`) étaient déjà acceptés mais n'étaient pas documentés : ils sont dans `docs/parser.md`.

## 2026-11-02 : registre des options de `Draw`, couleur et opacité explicites

Fichiers : `src/Draw/Draw.options.ts` (nouveau), `src/Draw/Draw.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`, `src/Graph.ts`, les `*.parser.ts` de `Point`, `Arc`, `Bezier`, `Axis` et `Grid`.

- **Une option inconnue est une `OptionError`** (`->colr=red`, `->tick`). Avant : ignorée sans bruit, sauf un nom de couleur. Les options écrites avant elle sont appliquées, les figures suivantes
  sont dessinées. Deux options des exemples de la démo étaient dans ce cas (`red/0.5` seul, `tick`) : retirées.
- **Les valeurs sont contrôlées** : `w` veut un nombre (`w=red` colorait le trait), `color` et `fill` veulent un nom de couleur et au plus une opacité (`color=red/0.5`), `dash` un motif.
  Tout `InvalidArgumentError` d'une figure devient une `OptionError` qui nomme l'option et la figure.
- **`drag` sur une figure qui n'est pas un point** est une `OptionError` (avant : ignoré). `from`, `to`, `duration`, `delay`, `easing` et `loop` sans `animate` aussi (avant : ignorés).
- **`fill` et `stroke` de `AbstractFigure`** prennent un nom de couleur ou `{color, opacity}` (`IColorValue`, exporté). La chaîne `'red/0.5'` n'est plus lue : c'est une `InvalidArgumentError`
  (toute chaîne avec `/`). Le parser (`color=red/0.5`) n'a pas changé.
- **Nouveaux** : `AbstractFigure.hideShape()` (cache la figure, garde le label : l'option `!`) et `Graph.handle(point, options)` (point de prise de l'option `drag`, nommé `<point>_drag`, retiré
  si une erreur survient).
- **Retirés de `Draw`** (membres protégés) : `_applyOptions`, `_applyDrag`, `_dragConfig`, `_animationPoint`. Ils sont des fonctions exportées de `Draw.options.ts` (`applyOptions`, `dragConfig`, `animationPoint`).
- **Les options des figures** : `POINT_OPTIONS`, `ARC_OPTION_HANDLERS`, `BEZIER_OPTION_HANDLERS`, `AXIS_OPTION_HANDLERS`, `GRID_OPTION_HANDLERS` (nouveaux), `GridOption` est exporté.

## 2026-11-02 : `mark` et `addLabel` reçoivent des valeurs explicites

Fichiers : `src/figures/AbstractFigure/AbstractFigure.ts`, `src/Graph.ts`, `src/Draw/Draw.options.ts`.

- **`figure.mark(options)`** prend `{side?, size?, shape?}` (`IMarkOptions`, `MarkerSide`, exportés). Avant : `mark(value, options)` avec `value` le côté (ou un booléen) et un tableau positionnel
  où un nombre était la taille et un texte la forme. `mark()` met toujours un marqueur aux deux bouts ; le booléen n'existe plus (`mark(false)` s'écrit `mark({side: 'none'})`). Un côté qui n'existe pas lève toujours
  `InvalidArgumentError`.
- **`figure.addLabel(contenu, options)`** prend `{asHtml?, texConverter?}` (`ILabelOptions`, exporté). Avant : `addLabel(contenu, asHtml, texConverter)`.
- La syntaxe du parser ne change pas (`mark`, `mark=end`, `mark=both/20`, `mark=end/x/12`) ; un `mark` dont la valeur n'est ni un côté ni un booléen (`mark=3`) est une `OptionError`. La forme du marqueur
  (`->`, `x`, `|`) était acceptée mais n'était pas documentée : elle est dans `docs/parser.md`.
- `drag=Ox` / `drag=Oy` lisent les noms des axes dans l'énumération `AXIS` (plus de chaînes écrites en dur dans `Draw`).

## 2026-11-02 : rapport d'erreurs de `Draw` et ligne en cours d'écriture

Fichiers : `src/Draw/Draw.ts`, `src/Draw/Draw.report.ts` (nouveau), `src/Draw/Draw.lines.ts`, `src/index.ts`.

- **`draw.refresh(code, options?)` renvoie un `IDrawReport`** (`{errors, lines}`, avant : `void`). Types exportés : `IDrawReport`, `IDrawError`, `IDrawLineStatus`, `DrawLineState`, `DrawSeverity`,
  `IRefreshOptions`. `draw.report` et `draw.errors` donnent le dernier. L'option `editing` (numéro de ligne, un entier de 1, sinon `InvalidArgumentError`) marque la ligne qu'on écrit : si elle n'est pas
  valide, elle garde la figure de sa dernière version valide et son erreur est `pending`.
- **Plus de `console.error`** : les erreurs d'une ligne (lecture, construction, options) sont dans le rapport.
- **`draw.refreshLayout(parameters)` ne lève plus** pour des paramètres qui ne sont pas valides : il renvoie un `IDrawError` (ou `null`) et `draw.layoutError` le garde. Le constructeur de `Draw` ne lève plus non plus :
  avec des paramètres qui ne sont pas valides, le graphe a la mise en page par défaut et `layoutError` est rempli.
- **Une ligne qui n'est pas une figure est une erreur** : un nom seul (`hello`), ou une clé qui n'existe pas (`A=nothing 1,2`). Avant : ignorée sans bruit. Un `build*` qui ne renvoie rien est aussi une erreur.
- **Une figure dont la création échoue arrête sa ligne** (avant : l'erreur était affichée, puis les options de la ligne étaient appliquées à la figure de la ligne précédente, ou ignorées).
- **Interne** : `Draw._buildOptions` n'existe plus ; `Draw._buildItem(item, created)` remplit `created` avec les noms des figures faites ; `IDrawLine` a un champ `indent`.

## 2026-11-02 : `Draw.refresh` garde les figures des lignes qui n'ont pas changé, position des points tirés

Fichiers : `src/Draw/Draw.ts`, `src/Draw/Draw.diff.ts` (nouveau), `src/Draw/Draw.report.ts`, `src/Graph.ts`, `src/pidraw.common.ts`, `bench/update.bench.ts`.

- **`refresh(code)` ne vide plus le graphe** : les lignes du début du code qui sont les mêmes gardent **les mêmes objets figure** (une référence prise avant reste valable), les autres sont refaites. Le dessin est celui d'un
  `Draw` neuf. Une figure faite à la main dans `draw.graph` est toujours retirée. L'animation n'est arrêtée que si une figure est retirée (un code identique la laisse tourner).
- **`refresh(code, {drag: 'keep' | 'reset'})`** (`'keep'` par défaut) : les points que l'utilisateur a tirés restent où il les a laissés tant que leur ligne est la même, sous les règles de leur `drag`. Avant : ils revenaient
  à la position du code à chaque `refresh`. `'reset'` donne l'ancien comportement.
- **`Graph.dragTo(point, pixels)` (nouveau)** : place un point glissable (la poignée ou sa cible) comme la souris l'aurait fait, règles du glisser et mise à jour des dépendants comprises, sans événement.
- **Les événements `dragstart`, `dragmove` et `dragend` ont un champ `target`** (`IGraphDragEvent.target`) : le point qui bouge avec la souris (la cible de la poignée, sinon le point tenu). Ajout, rien n'est retiré.
- **Le repli de la ligne en cours d'écriture** exige maintenant que ce soit **la seule ligne qui diffère** du dernier dessin (avant : que le code ait le même nombre de lignes, ce qui pouvait prendre la version d'une autre ligne).
- **`refreshLayout`** avec d'autres paramètres fait refaire toutes les lignes au prochain `refresh` ; avec les mêmes, rien.
- **Interne** : `Draw._buildItem(item)` ne prend plus la liste des figures faites (`_buildLine` les relève par la différence des figures du graphe).
- Le banc `bench/update.bench.ts` appelait `_makeLayout` sur `Draw` depuis la séparation avec `Graph` : corrigé (`draw.graph`). Il mesure aussi le redessin du code.

## 2026-11-03 : `pidraw.common.ts` découpé, noms exportés en PascalCase

Fichiers : `src/pidraw.common.ts`, `src/Graph.types.ts` (nouveau), `src/animate/` (nouveau dossier : `Animate.ts` déplacé, `Animate.types.ts` nouveau), `src/parser/parser.common.ts`, `src/index.ts`.

- **Renommés** (même valeur à l'exécution, `index.ts` les exporte sous le nouveau nom) : `DOMAIN` devient `Domain`, `isDOMAIN` devient `isDomain`, `AXIS` devient `Axes` (`Axes.X === 'Ox'`), `COORDINATE_SYSTEM` devient `CoordinateSystem`,
  `LAYER_NAME` devient `LayerName`, `LOOP_STYLE` devient `LoopStyle`, `ILayers` devient `Layers`, `buildInterface` devient `BuildResult`. Les membres (`LayerName.MAIN`, `CoordinateSystem.CARTESIAN_2D`) ne changent pas.
- **Supprimés** : `POINTCONSTRAINT` et `LINECONSTRAINT` (énumérations de l'ancien modèle de contraintes, plus utilisées ; remplacées par `PointConstraint` et `LineConstraint`, unions exclusives).
- **Déplacés** (toujours exportés par `index.ts`) : `Animate.ts` vers `src/animate/Animate.ts` ; `LoopStyle` et `IFigureAnimation` vers `src/animate/Animate.types.ts` (le cœur n'importe plus `Animate.ts`) ;
  `TeXConverterType`, `Layers`, `IGraphDragEvent`, `IGraphDragMoveEvent`, `IGraphUpdate`, `IGraphEventMap`, `IAxisDisplay`, `IGraphDisplay`, `IGraphConstructorConfig` vers `src/Graph.types.ts` ;
  `BuildResult` vers `src/parser/parser.common.ts`. Un import de `src/pidraw.common` pour l'un de ces noms devient un import du nouveau fichier ; l'import depuis `pidraw` (`index.ts`) ne change pas.
- **Nouveau** : `AxisVectors` (`{x: XY, y: XY}`), partagé par `IGraphConfig` et `IGraphConstructorConfig`. `LoopStyle` est exporté comme valeur (avant : type seulement par `export type *`).
- `isXY` et `isDomain` : plus de `@ts-expect-error`, même comportement (un `x` et un `y` définis ; la valeur n'est pas contrôlée).

## 2026-11-03 : types du parser dans `parser.types.ts`, nettoyage de `parser.common.ts`

Fichiers : `src/parser/parser.types.ts` (nouveau), `src/parser/parser.common.ts`, les `*.parser.ts`, `src/index.ts`.

- **Déplacés vers `src/parser/parser.types.ts`** (types seuls) : `IParserValues`, `IParserParameters`, `FigureOptionHandler`, `BuildResult`, `IParserConfig`, `IParserSettings`, `IPointsSetting`, `PointShapeOption`. `index.ts` exporte toujours `IParserConfig` ;
  un import de `src/parser/parser.common` pour l'un de ces noms devient un import de `parser.types`.
- **Supprimés** (jamais utilisés, hors de l'API publique) : `PARSER_BOOLEAN_VALUES`, l'interface `IParser`, `PARSER_TYPE.UNKNOWN`. `PARSER_COLOR_VALUES` est un `readonly string[]`.
- **`convertIdToFigure` ne convertit plus un nom hérité du prototype** (`toString`, `constructor`) : avant, il était remplacé par la fonction du prototype et l'erreur qui suivait nommait `undefined`. Un nom qui n'est pas une figure du dessin reste le texte écrit.

## 2026-11-03 : `BuildResult.create` est typé par les figures que le graphe sait faire

Fichiers : `src/parser/parser.types.ts`, `src/parser/parser.config.ts`.

- **`BuildResult.create` n'est plus un `string`** : c'est `FigureKind` (nouveau, exporté par `parser.types.ts`), soit `keyof Graph['create']` (`point`, `line`, `circle`...). Avant, le type valait `keyof typeof parser_config`, donc `string` (et ce n'étaient pas les clés de la table : `pt`, `circ`...).
  Changement de types seulement, aucun changement à l'exécution.
- Les clés de `parser_config` sont écrites avec `PARSER_TYPE` (mêmes valeurs) ; `tests/parser/parser.config.test.ts` vérifie qu'il y a une entrée par clé de la syntaxe.

## 2026-11-03 : `PiDraw.documentation()` ne donne plus `parameters` ni `option`

Fichiers : `src/parser/parser.config.ts`.

- **Champs supprimés de `parser_item`** : `parameters` (liste d'options périmée, `arc` annonçait une option `acute` qui n'existe pas) et `option` (jamais lu). Il reste `build`, `code`, `description` et `name`.
- **Descriptions et exemples corrigés** : `line` et `ray` avaient la même description et le même `code` (un mélange des trois formes) ; `eval` avait une faute et un nom qui ne disait pas que la figure est un point. `line`, `vec`, `seg` et `ray` montrent maintenant leurs formes (`AB`, `AB.`, `[AB[`, `vAB`, et la forme avec clé).

## 2026-11-03 : `parser_item` devient `ParserItem`, `parser_config` devient `PARSER_CONFIG`

Fichiers : `src/parser/parser.config.ts`, `src/Draw/Draw.ts`, `src/index.ts`.

- **Renommés** : le type exporté `parser_item` est `ParserItem`, la table `parser_config` est `PARSER_CONFIG` (non exportée par `index.ts` ; `PiDraw.documentation()` la renvoie toujours, sous le même nom).
- Le premier paramètre de `build` s'appelle `item` (c'est la ligne entière, pas ses valeurs). Aucun effet à l'exécution.

## 2026-11-03 : contrôleurs du graphe (`attach`, `IGraphController`)

Fichiers : `src/Graph.ts`, `src/Graph.types.ts`.

- **Nouveau** : `graph.attach(controller)` retient un module qui agit sur le graphe (contrat `IGraphController` : `dispose()` et `onCleared?()`). `clear()` appelle `onCleared` de chaque contrôleur après avoir retiré les figures ;
  `dispose()` appelle `dispose` de chacun puis les détache. Un second contrôleur de la même classe lève `InvalidArgumentError`. Ajout seulement : `graph.animation` est encore là, il sera retiré avec le passage d'`Animate` à ce modèle.

## 2026-11-04 : l'animation compte le temps joué, la pause ne fausse plus la reprise

Fichiers : `src/animate/Animate.ts`.

- **Une seule horloge** : chaque animation additionne le temps entre deux images (`elapsed`) ; la durée d'une pause n'y entre jamais. Corrige : une pause hors lecture ou répétée (l'animation sautait à sa fin à la reprise), une pause dans les 200 ms
  qui suivent `start()` (idem, à cause du minuteur de remise à zéro).
- **`pause()` ne fait rien hors lecture, `resume()` ne fait rien hors pause.** Avant, `pause()` sans animation mettait `isPaused()` à vrai.
- **`start()` n'arme plus de remise à zéro** (il passait par `cancel()`) et annule celle d'un `cancel()` précédent.
- **Une image ajoute au plus 100 ms** à l'animation : une page masquée (aucune image) ne fait plus sauter l'animation en avant à son retour, elle attend.

## 2026-11-04 : entrée `pidraw/codemirror` et découpage du build

Fichiers : `src/codemirror/` (nouveau), `vite.config.js`, `package.json`.

- **Nouveau** : `pidraw/codemirror` (`pidraw()`, `pidrawParameters()`, `pidrawLanguage`, `pidrawHighlight`, `pidrawNames`, `pidrawCompletion`, `nameRanges`, `readVocabulary`). Ajout seulement.
- **Build** : le code commun à `pidraw.js` et à `codemirror.js` est dans `dist/shared.js`, que `pidraw.js` importe désormais. Sans effet par `import 'pidraw'`, mais un import direct de `dist/pidraw.js` hors du paquet a besoin de `dist/shared.js` à côté.
- **Nouvelles `peerDependencies` optionnelles** : `@codemirror/autocomplete`, `@codemirror/language`, `@codemirror/state`, `@codemirror/view`, `@lezer/highlight` (seul `pidraw/codemirror` les utilise).
- Les classes de couleurs `tok-*` et `cm-pidraw-*` font partie de l'API de ce module : les renommer serait un breaking change.

## 2026-11-04 : `Animate` est un contrôleur du graphe, `graph.animation` disparaît

Fichiers : `src/animate/Animate.ts`, `src/animate/Animate.types.ts`, `src/Graph.ts`, `src/Graph.types.ts`, `src/Draw/Draw.ts`, `src/Draw/Draw.options.ts`, `src/index.ts`, `docs/guide/code.md`, `docs/guide/interaction.md`.

- **`graph.animation` est supprimé.** On crée l'animation avec le graphe : `const animation = new Animate(graph)` (ou `new Animate(draw.graph)`). `Animate` est un export de valeur de `pidraw` (avant : type seulement). Un graphe a une seule
  `Animate` : une seconde lève `InvalidArgumentError`.
- **Verbes** : `cancel()` est `stop()` (arrête et remet les points) ; l'ancien `stop()` (qui oubliait les points) est `dispose()`, appelé par le graphe ; `resume()` est supprimé, `start()` reprend après une pause ; `restart()` est nouveau
  (recommence depuis le début). `start()` pendant la lecture ne fait plus rien (avant : il recommençait).
- **Événements** : `Animate` est un `EventTarget` (`on` / `off`, comme `Graph`) : `start`, `pause`, `end` (fin naturelle, sans boucle) et `stop`. Type `IAnimateEventMap`.
- **Contrat des contrôleurs** : `IGraphController` (`Graph.types.ts`) a `dispose()` et `onFiguresRemoved?(names)`, appelé par `Graph.remove` et `Graph.clear` après tout retrait de figures. `Draw.refresh` n'arrête plus l'animation lui-même : `Animate`
  oublie les points retirés (et ceux dont un bout `from` / `to` l'est) et s'arrête quand il n'en reste aucun. Avant, toute figure retirée arrêtait toute l'animation.
- **`getLoopStyle`** n'est plus exporté par `animate/Animate.ts` (il vit dans `Draw.options.ts`, c'est de la traduction de syntaxe).
- Règles `dependency-cruiser` (`npm run dependencies:check`) : le cœur n'importe d'un thème que ses `.types.ts` (et `index.ts` l'exporte), un thème n'importe pas un autre.

## 2026-11-04 : `easing` et `loop` de l'animation, vérifiés et appliqués

Fichiers : `src/calculus/easing.ts` (nouveau), `src/animate/Animate.ts`, `src/animate/Animate.types.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`, `src/Draw/Draw.options.ts`.

- **`easing=inOut` change enfin le mouvement** : le point démarre et finit doucement (courbe cubique). Jusqu'ici l'option était acceptée et ignorée (le mouvement restait à vitesse constante). Changement de sémantique silencieux : un code qui l'écrivait déjà est animé autrement.
- **`easing` inconnu est une erreur** : `easing=foo` est une `OptionError` qui nomme l'option et les easings connus. Avant : accepté sans effet.
- **`loop` inconnu est une erreur** : `loop=revers`, `loop=0`, `loop=false`, `loop=2` sont des `OptionError`. Avant : lus comme « pas de boucle » sans bruit. Restent valables `loop`, `loop=1`, `loop=reset`, `loop=reverse`, `loop=none`.
- **Depuis le code** : le setter `figure.animate = {...}` refuse (`InvalidArgumentError`) un `easing` qui n'est pas un nom de `EASINGS` et un `loop` qui n'est pas un `LoopStyle`.
- **Nouveau** : `EASINGS` et le type `AnimationEasing` (`calculus/easing.ts`, le type est exporté par `Animate.types.ts`). `IFigureAnimation.easing` est de type `AnimationEasing` (avant : `'linear' | 'inOut'`, les mêmes valeurs).
  Pour ajouter un easing : une ligne dans `EASINGS`, une ligne dans le guide (`interaction.md`).

## 2026-11-04 : l'animation suit les extrémités qui bougent

Fichiers : `src/animate/Animate.ts`.

- **Les points `from` et `to` sont lus à chaque image**, pas copiés au démarrage : si une extrémité est déplacée pendant la lecture (glisser, changement d'échelle), le point animé se dirige vers sa place du moment. Avant, l'animation gardait les positions du
  démarrage. Une boucle `reverse` revient vers l'extrémité telle qu'elle est alors.
- `Animate._step` et `Animate._updatePoints` sont `protected` (ils n'étaient pas de l'API). `src/animate/Animate.ts` n'est plus exclu d'eslint.

## 2026-11-04 : la surface publique de `pidraw` est testée, nouveaux exports, `Only` devient `CircleOnly`

Fichiers : `src/index.ts`, `src/figures/Circle/Circle.types.ts`, `typedoc.json`, `tests/index.test.ts`, `tests/index.types.test.ts`.

- **Nouveaux exports de valeur** : `EASINGS` (la table des easings que l'option `easing` accepte).
- **Nouveaux exports de types** : `TickLabel`, `TickSelection`, `BezierSegment`, `PathCommand`, `RiemannRectangle` (les formes que les getters des figures rendent), `BuildResult`, `FigureKind`, `CircleOnly`, `CircleKeys` (cités par `ICircleConfig`).
- **Renommé** : le type `Only` de `Circle.types.ts` (utilisé par `ICircleConfig`) devient `CircleOnly`, et exporté ; avant il n'était pas exporté, sans effet pour un programme qui ne l'importait pas.
- **Cachés de la référence d'API** (`@internal`, toujours présents dans le code) : `Line.math` (donc `Axis.math`), `Plot.numExp`, `Label.shape`. Les classes `mathLine` et `NumExp` ne sont pas de l'API publique.
- **Référence d'API** : `typedoc.json` exclut les membres `protected` (`excludeProtected`) et traite les avertissements comme des erreurs (`treatWarningsAsErrors`) : `npm run docs:build` échoue au premier avertissement.
- `tests/index.test.ts` donne la liste exacte des exports d'exécution : ajouter ou retirer un nom est une décision, et une rupture quand on en retire un.

## 2026-11-04 : `Zoom`, `updateLayout` garde les points déplacés, `onLayoutChanged`

Fichiers : `src/zoom/Zoom.ts` (nouveau), `src/zoom/Zoom.types.ts` (nouveau), `src/calculus/computeZoom.ts` (nouveau), `src/Graph.ts`, `src/Graph.types.ts`, `src/figures/Point/Point.ts`, `src/errors.ts`, `src/index.ts`.

- **`Graph.updateLayout` garde les points déplacés à leurs coordonnées** (changement de sémantique silencieux). Un point tiré ou animé (`Point.isMoved()`) est replacé, après le redessin, à la place que ses coordonnées ont dans la nouvelle disposition, et ce qui en dépend est redessiné. Avant, il retombait à la place de sa contrainte
  (par exemple `A(1,1)` déplacé de 100 pixels revenait en (1 ; 1) à chaque changement d'échelle). Cela corrige aussi les poignées `<point>_drag`, qui retombaient en (0 ; 0). `Draw` n'est pas touché : il refait ses lignes et remet ses points tirés par `dragTo`, comme avant.
- **`IGraphController.onLayoutChanged?(config)`** (nouveau) : appelé après tout `updateLayout` réussi, avec la configuration du graphe. Rien n'est appelé si la disposition n'est pas valide.
- **Nouveau : `Point.isMoved()`**, vrai si la position n'est plus celle que donne la contrainte (tolérance 1e-6 pixel).
- **Nouveau : `Zoom`** (contrôleur, `new Zoom(graph, {allow, gestures})`), `ZOOM_STEP`, `ZOOM_LIMITS`, `ZOOM_ALLOWS` et les types `ZoomAllow`, `IZoomOptions`, `IZoomEventMap`, `ViewWindow`. Comme `Animate`, il s'attache au graphe : un seul par graphe (`InvalidArgumentError` pour un second de la même classe).
- **Nouveau : `UnsupportedOperationError`** (exportée) : une opération que la façon de faire l'objet n'autorise pas (un zoom `move` qui doit zoomer, le mode de navigation d'un zoom sans `gestures`).

## 2026-11-05 : PiParser 0.2.1 (la lecture d'une ligne devient plus stricte)

Dépendance : `piparser` `^0.2.1` (la 0.2.0 n'avait pas la condition `types` dans `exports` : TypeScript ne trouvait pas ses déclarations). Fichiers : `package.json`, `package-lock.json`, `tests/Draw/Draw.test.ts`, `tests/figures/Point/Point.parser.test.ts`, `tests/parser/parser.curve.test.ts`.

- **Aucun fichier de `src/` n'a changé** : l'API de `PiParse` que PiDraw utilise (`parse`, `parameters`, `formatter`, `splitter`, `keys`, les types `PARSER` et `PARSER_VALUES`) est compatible. Les adaptations sont dans trois fichiers de tests (le résultat d'un paramètre porte maintenant `raw`, `rawOptions` et les colonnes `range`, `keyRange`, `valueRange`, `optionRanges` ;
  `DOMAIN.axis` est de type `'x' | 'y' | 'z'`).
- **Une option écrite deux fois est une erreur** (`->red,red`, `->w=2,w=3`, `->color=red,color=blue` : « the key … is already used »). Avant, la dernière valait, sans bruit.
- **`A=B=C 1,2` est une erreur** (plusieurs `=` dans le premier mot). Avant, la ligne donnait un résultat vide.
- À savoir : les nouveaux champs du résultat (colonnes de chaque morceau de la ligne) permettront à `Draw` de situer une erreur sans relire le texte ; les clés connues passées à `parse(line, keys)` (la virgule d'un texte d'étiquette) et les ensembles `<2-5,7>` (`types: {slide: 'set'}`) sont ce que la syntaxe des diapositives utilisera.

## 2026-11-05 : le texte d'une étiquette (`label`, `tex`) est lu tel quel, il peut contenir des virgules

Fichiers : `src/Draw/Draw.options.ts` (`lineParseOptions`), `src/Draw/Draw.ts`, `docs/guide/options.md`.

- **Syntaxe** : `Draw` lit les lignes de figure avec chaque option et chaque couleur comme clé connue, et `label` et `tex` comme des textes. Le texte va jusqu'à la prochaine option : `A->label=Hello, world` et `label=Hello, world,red` marchent sans échapper la virgule
  (`label=a\,b` marche toujours). Le texte n'est jamais converti : `label=2` écrit « 2 » (avant : le nom de la figure, la valeur étant lue comme un nombre).
- **Contrepartie** : un mot qui n'est pas une option, après le texte d'une étiquette, fait partie du texte (`label=Hello,rde` écrit `Hello,rde`) ; avant c'était une erreur « option inconnue ». Après une option avec valeur qui n'est pas un texte (`w=2,thck`), le mot est avalé dans la valeur et l'erreur porte sur cette option
  (« option `w` »), pas sur le mot. Après une option sans valeur (`red,foo`), un mot inconnu reste une option inconnue.
- `new PiParse({keys})` n'est plus donné par `Draw` : ses clés ne servaient qu'à `parameters()`, et `buildLayout` donne les siennes.

## 2026-11-05 : diapositives (`Slides`, `slide`, `@pause`, `@slides`)

Fichiers : `src/slides/Slides.ts` et `Slides.types.ts` (nouveaux), `src/calculus/slideSet.ts` (nouveau), `src/figures/AbstractFigure/AbstractFigure.ts`, `src/Graph.ts`, `src/Graph.types.ts`, `src/pidraw.common.ts`, `src/Draw/Draw.lines.ts`, `Draw.options.ts`, `Draw.ts`, `src/codemirror/`, `src/index.ts`.

- **Les lignes qui commencent par `@` ne sont plus toujours une erreur** : `@pause`, `@slides` et `@slides=<…>` sont des commandes (une ligne de rapport « ok », aucune figure). Toute autre commande, `@pause 2` ou `@slides=3` reste une erreur de ligne.
- **Nouvelle option `slide=<2-5,7,9->`** (ensemble entre chevrons, notation des recouvrements de Beamer) : les étapes où la figure est montrée. Sans chevrons (`slide=3`), sans valeur ou avec une option après (`slide=<2>/tl`) : `OptionError`. `@pause` donne `<n+1->` aux lignes suivantes, `@slides=<…>` fixe un défaut,
  `@slides` seul remet le défaut à « toujours » et le compte des pauses à zéro. Le `slide` écrit sur une ligne l'emporte. Sans `Slides`, tout cela est ignoré : toute figure est montrée.
- **Nouveau : `Slides`** (contrôleur, `new Slides(graph, {count?})`), `next`, `previous`, `first`, `last`, `goto`, `current`, `count`, `state`, événement `change` ; `ISlideSet`, `ISlideRange`, `ISlidesOptions`, `ISlidesState`, `ISlidesEventMap`.
- **Nouveau : `AbstractFigure.slide`** (`ISlideSet | null`, validé : `InvalidArgumentError`), **`setHiddenBy(reason, hidden)`** et **`isHiddenBy(reason)`** (une figure peut être cachée pour des raisons nommées, en plus de `hide()` et du manque de position ; `_tikzShown` en tient compte, donc le TikZ n'écrit que ce qui est montré).
- **Nouveau : `IFigureContext.figureChanged?(name)`** (facultatif) et **`IGraphController.onFigureChanged?(name)`** : le signal générique par lequel une figure prévient les contrôleurs.
- `Draw.lines.ts` : `readCode(input, parse, parseSet)` (un troisième argument), `IDrawLine` a les variantes figure (avec `slide`), commande et erreur (avec `slide`) ; `parseSteps` et `slideSetFrom` (dans `Draw.options.ts`).
- La coloration CodeMirror lit une commande valide comme un mot-clé ; `slide` a sa description dans les suggestions.

## 2026-11-05 : les thèmes (animation, diapositives) gardent leurs données dans `figure.controls`

Fichiers : `src/controls/controls.types.ts` et `controls.ts` (nouveaux), `src/animate/animation.ts`, `Animate.syntax.ts`, `src/slides/slideSet.ts` (déplacé de `src/calculus/`), `Slides.syntax.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`, `src/figures/Point/Point.ts`, `src/parser/parser.types.ts`, `parser.common.ts`, `src/Draw/Draw.lines.ts`, `Draw.options.ts`, `Draw.ts`, `src/codemirror/`, `src/index.ts`, `.dependency-cruiser.cjs`.

- **`figure.animate` et `figure.slide` n'existent plus** (getters et setters retirés d'`AbstractFigure`, sans alias). Lecture : `figure.controls.animate`, `figure.controls.slide` (`Partial<IControlsFigure>`). Écriture : `setAnimation(point, animation | null)` et `setSlide(figure, set | null)`, nouveaux exports de `index.ts`, qui valident
  comme avant (`InvalidArgumentError`) puis appellent `figure.setControl(key, value | null)`. `AbstractFigure` n'a plus de champ propre à un thème : `controls`, `setControl`, et toujours `setHiddenBy` / `isHiddenBy`.
- **`animatable` et `_checkAnimation` sont retirés d'`AbstractFigure` et de `Point`** : seul un point s'anime, et c'est `setAnimation` (dossier `src/animate/`) qui le dit. Une figure animable un jour aura son cas dans ce fichier, pas dans le cœur.
- **Nouveau type exporté : `IControlsFigure`** (`{animate: IFigureAnimation, slide: ISlideSet}`) : le seul endroit du cœur qui nomme les thèmes, par type. Un nouveau thème y ajoute sa ligne et son entrée dans le registre `controls/controls.ts` (`THEMES`, typé par `keyof IControlsFigure`).
- **Syntaxe du thème hors du cœur de la couche du code** : `Draw.options.ts` ne contient plus `animate`, `from`, `to`, `duration`, `delay`, `easing`, `loop` ni `slide` (ils sont dans `Animate.syntax.ts` et `Slides.syntax.ts`), et `Draw.lines.ts` ne connaît plus `@pause` ni `@slides` (le thème donne `commands`). `animationPoint`, `getLoopStyle`, `getEasing`
  (de `Draw.options.ts` à `Animate.syntax.ts`), `parseSteps` et `slideSetFrom` (à `Slides.syntax.ts`) ne sont plus exportés de `Draw.options.ts`. `OptionHandler`, `IOptionContext` et `Options` sont dans `parser/parser.types.ts` (réexportés par `Draw.options.ts`). Aucun de ces noms n'est dans `index.ts` : sans effet pour un programme.
- **`readCode(input, parse, parser)`** : le troisième argument est le `PiParse` (et non plus une fonction qui lit les étapes) ; `IDrawLine.slide` devient `IDrawLine.controls` (`{slide?}`), et `IDrawLine.command` est `{name, value, text}` (avant : `{name: 'pause'}` ou `{name: 'slides', set}`). Un message de commande inconnue : « expected @pause or @slides ».
- `calculus/slideSet.ts` devient `slides/slideSet.ts` (`calculus/index.ts` ne l'exporte plus) : `checkSlideSet`, `slideIncludes`, `slideLast`, plus `frozenSlide`, `slideOf`, `setSlide`.
- **Règles de dépendance** (`npm run dependencies:check`) : seul `controls/controls.ts` importe les fichiers de syntaxe des thèmes, et seuls `Draw`, `codemirror` et `index.ts` lisent le registre (`core-not-to-registry`) ; un thème n'importe ni `Draw`, ni `codemirror`, ni le registre (`theme-not-to-syntax-layer`). Le cœur reste libre d'importer les `*.types.ts` des thèmes.
- Une `@commande` d'un thème ne se coupe plus : un fichier de thème qui ne compile plus fait échouer `tsc` et son propre dossier, pas la logique du cœur.

## 2026-11-05 : titres des étapes (`@pause=Titre`, `@title,N=Titre`)

Fichiers : `src/slides/Slides.syntax.ts`, `Slides.ts`, `Slides.types.ts`, `src/controls/controls.types.ts` (`IControlsGraph`), `src/Graph.ts`, `src/Graph.types.ts`, `src/parser/parser.types.ts`, `src/Draw/Draw.lines.ts`, `Draw.ts`, `docs/guide/slides.md`.

- **`@pause=2` n'est plus une erreur** : c'est un `@pause` dont le titre est « 2 » (et `@pause=Titre` donne un titre à l'étape qu'il ouvre). `@pause now` (du texte sans `=`) reste une erreur, avec un autre message (« takes a title only after a = »). `@pause=` (titre vide) est une erreur.
- **Nouvelle commande `@title,N=Texte`** (N entier à partir de 1, n'importe où dans le code) ; un second titre pour la même étape, un texte vide, `N` absent ou invalide sont des `ParseError` de la ligne. Les titres ne créent pas d'étape, et le TikZ ne les écrit pas.
- **`ISlidesState` gagne `title: string | null`** (ajout : un programme qui lisait `{current, count}` est inchangé, mais un test qui compare l'état entier à `{current, count}` échoue). Nouveaux : `Slides.title`, `titleOf(step)`, `titles` ; `change` est aussi émis quand les titres changent.
- **Nouveau : `Graph.controls` et `Graph.setControl(key, value | null)`**, avec `IControlsGraph` (`{titles}`) et le hook `IGraphController.onControlsChanged?(key)` : le pendant pour le graphe de `AbstractFigure.controls`. `Graph.dispose()` les vide.
- **`readCode` renvoie `{lines, graphControls}`** (et non plus un tableau) ; `ICommandSyntax` gagne `graphControls?(state)`. Aucun de ces noms n'est dans `index.ts` ; `IControlsGraph` et `ISlideTitles` sont exportés (types).

## 2026-11-05 : `drag=grid` suit les subdivisions de la grille

Fichiers : `src/Graph.ts` (`_gridStep`), `docs/guide/interaction.md`.

- **Changement de sémantique silencieux** : quand la grille du graphe a un `subgrid` (`grid->subgrid=4`, `subdivisions` de la config), un point `drag=grid` (option `grid` de `Graph.draggable`) s'aimante sur les lignes de la sous-grille (pas divisé par le nombre de parties), et plus seulement sur celles de la grille. Avant : le pas de la grille seul. Les subdivisions comptent même si elles sont trop serrées pour être dessinées. Sans `subgrid`, rien ne change.

## 2026-11-05 : `PiDraw.documentation()` donne `forms` et `summary` à la place de `code`

Fichiers : `src/parser/parser.types.ts` (`ParserItem`, `ParserItems`), `src/parser/parser.config.ts`, les `*.parser.ts` des figures, `src/codemirror/vocabulary.ts`, `demo/components/demoParser.vue`.

- **Changement de type** : `ParserItem.code: string` (formes séparées par ` | `) devient `forms: string[]` (une forme par chaîne), et `ParserItem` gagne `summary: string` (une ligne pour les suggestions de l'éditeur). `name`, `description` et `build` ne changent pas. `ParserItem` est défini dans `parser.types` (toujours exporté par `index.ts`).
- **Contenu corrigé** : les formes de `parametric` disent le domaine et les échantillons (`[,<domain>][@<number>]`), qui manquaient.
- **Interne** : chaque `*.parser.ts` exporte la table de ses clés (`POINT_ITEMS`, `LINE_ITEMS`...) ; `PARSER_CONFIG` ne fait que les joindre (une clé en double lève au chargement). `KEY_DETAILS` de l'éditeur est lu dans `summary` : plus de copie à tenir.


## 2026-11-05 : valeurs d'un label (`@nom`)

Fichiers : `src/figures/Label/Label.parser.ts`, `Label.types.ts`, `Label.constraints.ts`, `src/figures/AbstractFigure/AbstractFigure.ts`, `Line`, `Arc`, `Circle`, `Polygon`, `Point`, `Riemann`, `FillBetween`, `src/calculus/numbers.ts`, `src/parser/parser.types.ts`, `src/codemirror/`, `docs/guide/options.md`.

- **Changement de syntaxe (parser)** : `@nom` (lettres minuscules collées) est le champ de ce nom (`@area`, `@slope`, `@length`, `@radius`, `@perimeter`, `@angle`, `@sum`, `@rectangles`, `@coordinates`). Avant, `@m` valait la valeur suivie de `m` ; c'est maintenant une `OptionError` si la figure n'a pas ce champ.
- **`@` seul** n'est plus « le premier champ du tableau » : c'est `defaultLabelField()` de la figure (point : `coordinates`, segment : `length`, arc : `angle`, `Riemann` : `sum`, `FillBetween` : `area`). Il est refusé (`OptionError`) pour une droite, une demi-droite, un vecteur, un cercle et un polygone, dont les champs sont à nommer. Une figure sans aucun champ garde toujours son texte tel quel.
- **`@@`** est un `@` du texte, pour les figures qui ont des champs.
- **Nouveaux champs** : droite (`slope`, aussi pour segment et vecteur), arc (`angle`, `length`, `radius`, `area`), cercle (`radius`, `perimeter`, `area`), polygone (`perimeter`, `area`). La pente est une fraction TeX (`\frac{3}{2}`) quand elle est exacte (contrainte `slope`, ou `through` entre deux points à coordonnées numériques) et que `@slope` n'a pas de décimales ; `\infty` pour une verticale.
- **Changement de type** : `LabelField.digits` est facultatif (`@` ne l'écrit plus : le défaut, 2 décimales, est celui du champ) ; `LabelFields` reçoit `number | undefined`. `AbstractFigure` gagne `defaultLabelField(): LabelFieldName | null`. `LabelFieldName` gagne `angle`, `radius`, `perimeter`, `slope`. Un arc ou un cercle qui montre `@area` écrit son label à l'intérieur (`mc`) : au milieu du secteur, au centre.
- **Interne** : `ParserItem.labelFields` (champs suggérés par l'éditeur après un `@`), `toFraction` et `fractionToTex` dans `calculus/numbers.ts`, `Point.givenByNumbers`, `fieldNumber` et `DEFAULT_LABEL_DIGITS` dans `Label.constraints.ts`.

## 2026-11-05 : `dash` par défaut en pixels, tailles `xs` à `xl`

Fichiers : `src/figures/AbstractFigure/AbstractFigure.ts`, `src/Draw/Draw.options.ts`, `docs/guide/options.md`.

- **Changement de sémantique (silencieux)** : `dash` sans valeur (option du parser et `figure.dash()`) donnait la moitié d'une unité de l'axe x, en pixels, donc des tirets énormes sur un graphe à peu d'unités. C'est maintenant `DEFAULT_DASH` (`6 4` : un tiret de 6 px, un espace de 4), le même à toute échelle, résolution et zoom. Le TikZ du défaut change de même (`on 4.5pt off 3pt`).
- **Syntaxe ajoutée** : `dash=xs|sm|md|lg|xl` (`2 2`, `4 3`, `6 4`, `10 6`, `16 8`), traduite par `Draw.options.ts` ; `dash=md` est `dash`. Une figure ne reçoit que des motifs en pixels. `dot` reste de 3 px.

## 2026-11-05 : unité et échelle des longueurs d'un label (`unit`, `scale`), format texte ou TeX

Fichiers : `src/calculus/units.ts` (nouveau), `src/pidraw.common.ts` (`IGraphConfig.measure`), `src/Graph.types.ts`, `src/calculus/computeLayout.ts`, `src/parser/buildLayout.ts`, `src/Draw/Draw.ts`, `src/figures/Label/`, `Line`, `Arc`, `Circle`, `Polygon`, `src/codemirror/vocabulary.ts`, `docs/guide/graph.md`, `options.md`.

- **Nouveaux paramètres du graphe** : `unit=<unité>` (`pm nm µm mm cm dm m dam hm km u`, `um` est `µm`) et `scale=<nombre>` ou fraction (`10`, `1/10`). Un nom d'unité inconnu ou une échelle qui n'est pas un nombre fini supérieur à 0 est une `ParseError`. `unit` ne donne pas d'échelle et `scale` ne donne pas d'unité ; ni l'un ni l'autre ne touche au dessin, aux axes, aux coordonnées, à `unitX` / `unitY`. Sans eux, les longueurs sont écrites telles quelles, sans unité.
- **Ce qui est mesuré** : `length`, `radius`, `perimeter` (valeur × `scale`, unité) et `area` (valeur × `scale²`, unité²). Ne sont pas mesurés : `slope`, `coordinates`, et l'aire d'une courbe (`FillBetween`, `Riemann`).
- **Changement de sémantique visible** : l'angle d'un arc (`@`, `@angle`) s'écrit toujours avec le degré (`60°`, `60^\circ` en TeX). Un label qui écrivait déjà `@°` l'a maintenant en double.
- **Changement de format** : un champ est écrit selon le label. En texte brut, la pente est `3/2` (et non plus `\frac{3}{2}`) et la verticale `∞` ; en TeX (`tex=`), `\frac{3}{2}` et `\infty`.
- **Changement de type** : `LabelFields` : `(digits, format: LabelFormat) => string` avec `LabelFormat = {tex}` ; `renderLabelContent(content, fields, format?)` ; `IGraphConfig.measure?: IMeasure` et `IGraphConstructorConfig.measure?: Partial<IMeasure>` (ajouts : `resolveGraphConfig` renvoie toujours `measure`, `{unit: null, scale: 1}` par défaut) ; `ILayout.measure`. `checkGraphConfig` vérifie la mesure (`InvalidArgumentError`).

## 2026-11-05 : commentaires `%`, lignes `$` pour un autre consommateur

Fichiers : `src/Draw/Draw.lines.ts`, `src/codemirror/language.ts`, `decorations.ts`, `completion.ts`, `highlight.ts`, `docs/guide/syntax.md`, `code.md`.

- **Syntaxe ajoutée** : une ligne qui commence par `%` (après les espaces) est un commentaire : ignorée, mais comptée dans les numéros de lignes. Avant, c'était une `ParseError`. Seule la ligne entière est un commentaire ; un `%` après le code d'une figure reste dans la ligne.
- **Sémantique précisée** : une ligne qui commence par `$` est toujours ignorée, mais n'est plus « le commentaire » : c'est une ligne pour un autre consommateur du même code (les paramètres de Scolcours, `$a=1,2,3/0.1=1`), qu'il distingue d'un commentaire. Aucun changement de comportement pour `Draw`.
- **Éditeur** : `%` est le commentaire de CodeMirror (`commentTokens`, token `comment`, classe `tok-comment`) ; `$` a le token `meta` et la classe `tok-meta` (nouvelle : la page lui donne une couleur). Les suggestions et les noms de figures ignorent les deux.

## 2026-11-05 : position d'un label, lettres dans n'importe quel ordre

Fichiers : `src/figures/Label/Label.parser.ts` (`parseLabelPosition`), `docs/guide/options.md`.

- **Changement de syntaxe (parser), élargissement** : `label=A/rm`, `lt`, `cb`... sont acceptés (la hauteur et le côté ne se confondent pas) et valent `mr`, `tl`, `bc`. Avant, une position à deux lettres dans l'autre ordre était une `OptionError`. Un code valide ne change pas.

## 2026-11-05 : label repoussé par une figure (`>O`), distance, marge de la poignée

Fichiers : `src/figures/Label/` (`Label.ts`, `Label.types.ts`, `Label.constraints.ts`), `src/figures/AbstractFigure/AbstractFigure.ts` et `AbstractFigure.tikz.ts`, `Point`, `Circle`, `Arc`, `Polygon`, `src/Graph.ts`, `src/Draw/Draw.options.ts`, `docs/guide/options.md`.

- **Nouvelle syntaxe (parser)** : la position d'un label peut être `>Nom` (`label=A/>O`) : le label est du côté de l'ancre opposé à la figure `Nom`, à n'importe quel angle. `Nom` est un point, un cercle, un arc ou un polygone défini avant ; sinon `OptionError`. Le champ qui suit la position accepte un **nombre seul** en plus du couple `x;y` : une distance en unités (mesurées sur l'axe x) qui pousse le label plus loin dans la direction où il se trouve (`label=A/ml/1`, `label=A/>O/0.3`) ; une position sans côté (`mc`) avec une distance est une `OptionError`. Le couple `x;y` s'ajoute à la poussée.
- **Changement visible** : le label d'un **cercle** est au centre (`mc`), et non plus à l'intérieur, en haut à droite. Le label d'un **arc** sans position écrite est du côté de sa direction médiane à n'importe quel angle (avant : l'une des neuf positions). Le label d'un **point qui a une poignée de `drag`** est écarté de 15 px (le rayon de la poignée) dans la direction où il se trouve ; une distance écrite le remplace.
- **Changement de type** : `ILabelConfig` gagne `away: XY | null`, `push: number | null`, `clearance: number` ; `Label.position(alignement?, offset?, rotate?, push?)` ; `Label.setAway`, `Label.setClearance` ; `AbstractFigure` gagne `referenceable`, `referenceAnchorPoint()`, `labelReference`, `setLabelReference`, `setLabelClearance` ; `tikzLabelNode` écrit `anchor=<angle>` et les décalages d'une poussée. `Label.position` avec une position écrite remet `away` à `null`.
- **Interne** : `Graph.update` replace les labels des figures dont la référence a bougé (ce n'est pas une dépendance de redessin : aucun cycle) ; `Graph._detach` retire les références vers la figure et la marge de la poignée ; `HANDLE_SIZE` (30 px) est partagé.

## 2026-11-05 : couleurs nommées de l'export TikZ (table CSS, `\definecolor`)

Fichiers : `src/calculus/colors.ts` (`CSS_COLORS`), `src/figures/AbstractFigure/AbstractFigure.tikz.ts` (`tikzColor`, `tikzPicture`), `docs/guide/tikz.md`.

- **Changement de sémantique (export TikZ)** : un nom de couleur n'est plus écrit tel quel (LaTeX le lisait avec la teinte de `xcolor`) mais défini par `\definecolor{pidraw-<nom>}{HTML}{RRGGBB}` avec la teinte de CSS, celle du dessin. `green` devient 008000 (avant : 00FF00), `orange` FFA500, `purple` 800080, `lightgray` D3D3D3, `darkgray` A9A9A9, etc. `black` et `white` restent natifs. Un PDF déjà produit change de teinte pour ces couleurs (c'est la correction voulue).
- **Élargissement** : tous les noms CSS s'exportent (`gold`, `grey`, `darkgrey`, `lightgrey`, `lightblue`…). Avant, ils étaient une `InvalidArgumentError`. Un nom hors CSS (`periwinkle`) lève toujours `InvalidArgumentError`, dont le message ne liste plus les noms de `xcolor`.
- **Changement de forme** : `tikzPicture` regroupe les `\definecolor` des fragments au début du `tikzpicture`, une fois chacun, avant `\path`. `figure.tikz()` garde les siens (fragment autonome). `tikzColor` renvoie `{name, definition}` pour un nom CSS (`definition` reste `null` pour `black` et `white`).

## 2026-11-05 : boutons (`Buttons`, `@button`, `toggle`)

Fichiers : `src/buttons/` (`Buttons.ts`, `Buttons.types.ts`, `Buttons.syntax.ts`, `toggle.ts`), `src/controls/` (`controls.ts`, `controls.types.ts`), `src/Draw/Draw.lines.ts`, `Draw.ts`, `Draw.options.ts`, `src/parser/parser.types.ts`, `AbstractFigure.ts`, `docs/guide/buttons.md`.

- **Nouvelle syntaxe (parser)** : la commande `@button=id->title=Texte` (le titre vaut l'`id` sans `->title=`) déclare un bouton, au-dessus des figures qui l'utilisent. L'option `toggle=id` ou `toggle=id/secondes` lie une figure à un bouton ; un bouton non déclaré avant la ligne est une `OptionError`, une durée négative ou qui n'est pas un nombre aussi. **La durée est en secondes**, comme `animate` (`duration`, `delay`), jamais en millisecondes. `!` sur une ligne qui a un `toggle` veut dire « caché jusqu'au clic » (label compris) ; sans `!`, la figure est montrée et le clic la cache. Un clic inverse toutes les figures du bouton.
- **Nouveau contrôleur** : `Buttons` (`buttons`, `isActive(id)`, `toggle(id)`, `reset()`, événement `change` : `{buttons, toggled}`), `setToggle`, types `IButton`, `IButtonDefinition`, `IButtonDefinitions`, `IButtonsChange`, `IButtonsEventMap`, `IFigureToggle`. Pas d'interface dans la bibliothèque. Sans `Buttons`, le paramètre est ignoré et toute figure est montrée.
- **Changement de type** : `IControlsFigure` gagne `toggle`, `IControlsGraph` gagne `buttons` ; `IOptionContext` gagne `states` (l'état des commandes de chaque thème avant la ligne) ; `IDrawLine` gagne `states` ; `applyOptions(options, figure, graph, states?)` ; `AbstractFigure.showShape()` (l'inverse de `hideShape()`).
- **Interne** : la raison de masquage `toggle` (`setHiddenBy`) s'ajoute à `slide` ; `readCode` donne `graphControls` avec `buttons` ; le registre `THEMES` gagne `toggle`.

## 2026-11-11 : classes CSS des figures

Fichiers : `src/figures/AbstractFigure/AbstractFigure.ts`, une classe `pidraw-<sorte>` par figure, `src/Draw/Draw.options.ts` (option `class`).

- **Ajout, pas de rupture de l'API** : le groupe svg de chaque figure porte un attribut `class` (`pidraw-point`, `pidraw-line`…), et l'option `class=a/b` en ajoute. Le balisage svg change : un test ou une feuille de style qui compare le svg complet le voit.
- `resetStyle()` retire les classes de l'utilisateur (`Ox` et `Oy` sont réutilisés) ; la classe de la sorte reste.
- Pas dans TikZ.
