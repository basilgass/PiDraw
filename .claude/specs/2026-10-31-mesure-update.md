# Mesure de la mise à jour (référence « avant » A10)

Date : 2026-10-31. Commande : `npm run bench` (`bench/update.bench.ts`, mode `bench` de vitest, qui ne lance que les fichiers de `bench/`).
Node 22.15, `svgdom` 0.1.29, avant tout changement de `Graph.update`.

## Méthode

- Graphe construit par `Draw` à partir de N groupes **indépendants** (trois points, deux segments `seg`, un cercle `circ` par les trois points : 6 figures par groupe), avec ou sans
  `default.label`. Tailles : 50 groupes (300 figures) et 200 groupes (1200 figures).
- Une exécution de chaque scénario compte les appels à `computed()` et `updateLabel()` de chaque figure, les nœuds svg créés (`createElementNS`) et les nœuds du svg ; puis 3 exécutions de
  chauffe et 15 exécutions chronométrées, dont on garde la médiane.
- **Le temps sous `svgdom` n'est pas celui d'un navigateur** : il sert à comparer une version du code à une autre, pas à prédire une durée réelle. Il varie d'un passage à l'autre (un même
  scénario a donné de 2,3 à 4,8 ms pour 300 figures) ; les compteurs, eux, ne varient pas.
- Scénarios : `one point moved` (un point déplacé, `isDraggable`, puis `update([nom])` comme `draggable`), `update of the whole graph` (`update()`), `forced update` (`update([], true)`),
  `layout drawn again` (`updateLayout()`), `decor drawn again, figures not updated` (`_makeLayout()` seul).

## Résultats

| figures | labels | scenario | computed() | updateLabel() | nodes created | nodes in svg | median ms |
|---|---|---|---|---|---|---|---|
| 300 | no | one point moved | 299 | 300 | 0 | 623 | 1.82 |
| 300 | no | update of the whole graph | 299 | 299 | 0 | 623 | 1.22 |
| 300 | no | forced update | 300 | 300 | 0 | 623 | 1.29 |
| 300 | no | layout drawn again | 300 | 300 | 10 | 623 | 4.03 |
| 300 | no | decor drawn again, figures not updated | 0 | 0 | 10 | 623 | 4.48 |
| 300 | yes | one point moved | 299 | 300 | 0 | 1073 | 2.97 |
| 300 | yes | update of the whole graph | 299 | 299 | 0 | 1073 | 1.37 |
| 300 | yes | forced update | 300 | 300 | 0 | 1073 | 1.63 |
| 300 | yes | layout drawn again | 300 | 300 | 10 | 1073 | 9.01 |
| 300 | yes | decor drawn again, figures not updated | 0 | 0 | 10 | 1073 | 4 |
| 1200 | no | one point moved | 1199 | 1200 | 0 | 2423 | 11.35 |
| 1200 | no | update of the whole graph | 1199 | 1199 | 0 | 2423 | 8.71 |
| 1200 | no | forced update | 1200 | 1200 | 0 | 2423 | 8.08 |
| 1200 | no | layout drawn again | 1200 | 1200 | 10 | 2423 | 33.56 |
| 1200 | no | decor drawn again, figures not updated | 0 | 0 | 10 | 2423 | 18.06 |
| 1200 | yes | one point moved | 1199 | 1200 | 0 | 4223 | 11.67 |
| 1200 | yes | update of the whole graph | 1199 | 1199 | 0 | 4223 | 10.31 |
| 1200 | yes | forced update | 1200 | 1200 | 0 | 4223 | 12.16 |
| 1200 | yes | layout drawn again | 1200 | 1200 | 10 | 4223 | 46.28 |
| 1200 | yes | decor drawn again, figures not updated | 0 | 0 | 10 | 4223 | 36.82 |

## Ce que les chiffres disent

1. **Déplacer un point recalcule tout le graphe** : 299 `computed()` sur 300 figures (1199 sur 1200), alors que seuls le segment `AB` et le cercle dépendent du point (2 figures) : le travail est
   proportionnel au nombre de figures, pas à celui des figures touchées. C'est le gain visé par le graphe de dépendances.
2. **Aucun nœud svg n'est créé par une mise à jour** (0 pour les points, segments et cercles). Ces figures mettent à jour les attributs de leur élément : la recréation des formes ne coûte rien
   ici. **La piste « formes réutilisées » est donc à vérifier figure par figure (courbes, chemins, polygones) avant d'être engagée**, elle n'est pas justifiée pour ce cas.
3. **Les labels pèsent** : avec labels, le svg a 1,7 fois plus de nœuds et une mise à jour prend plus de temps (de 1,1 à 1,7 fois selon le passage : le temps est trop variable pour une valeur plus précise). `updateLabel()` est appelé pour chaque figure recalculée,
   que le texte ou la position ait changé ou non.
4. **Redessiner le décor coûte cher et grandit avec le nombre de figures** alors que le décor est le même (10 nœuds) : de 3 à 8 ms pour 300 figures, de 21 à 37 ms pour 1200, sans aucune
   mise à jour de figure. Piste à vérifier, non prouvée : `createMarker` cherche le marqueur par `svg.findOne('#id')`, une recherche dans tout le svg à chaque axe créé.
5. `forced update` ne coûte pas plus que `update()` : le filtre `static || isDraggable` économise peu.

## Après le graphe de dépendances (`update(changed)`, 2026-10-31)

Même banc, même machine. Le scénario `one point moved` appelle maintenant `draw.update([point])` ; `forced update` appelle `draw.update(undefined, true)`.

| figures | labels | scenario | computed() | updateLabel() | nodes created | nodes in svg | median ms |
|---|---|---|---|---|---|---|---|
| 300 | no | one point moved | 2 | 3 | 0 | 623 | 0.27 |
| 300 | no | update of the whole graph | 299 | 299 | 0 | 623 | 2.86 |
| 300 | no | forced update | 300 | 300 | 0 | 623 | 2.29 |
| 300 | no | layout drawn again | 300 | 300 | 10 | 623 | 6.63 |
| 300 | no | decor drawn again, figures not updated | 0 | 0 | 10 | 623 | 4.3 |
| 300 | yes | one point moved | 2 | 3 | 0 | 1073 | 0.76 |
| 300 | yes | update of the whole graph | 299 | 299 | 0 | 1073 | 1.55 |
| 300 | yes | forced update | 300 | 300 | 0 | 1073 | 1.41 |
| 300 | yes | layout drawn again | 300 | 300 | 10 | 1073 | 8.24 |
| 300 | yes | decor drawn again, figures not updated | 0 | 0 | 10 | 1073 | 6.82 |
| 1200 | no | one point moved | 2 | 3 | 0 | 2423 | 0.59 |
| 1200 | no | update of the whole graph | 1199 | 1199 | 0 | 2423 | 5.68 |
| 1200 | no | forced update | 1200 | 1200 | 0 | 2423 | 5.18 |
| 1200 | no | layout drawn again | 1200 | 1200 | 10 | 2423 | 25.47 |
| 1200 | no | decor drawn again, figures not updated | 0 | 0 | 10 | 2423 | 21.24 |
| 1200 | yes | one point moved | 2 | 3 | 0 | 4223 | 2.16 |
| 1200 | yes | update of the whole graph | 1199 | 1199 | 0 | 4223 | 8.18 |
| 1200 | yes | forced update | 1200 | 1200 | 0 | 4223 | 9.02 |
| 1200 | yes | layout drawn again | 1200 | 1200 | 10 | 4223 | 41.93 |
| 1200 | yes | decor drawn again, figures not updated | 0 | 0 | 10 | 4223 | 29.4 |

- **Un point déplacé : 2 `computed()` au lieu de 299 (1199 pour 1200 figures), 3 `updateLabel()` au lieu de 300** : le segment et le cercle qui dépendent du point, plus le label du point lui-même.
  Le travail ne dépend plus du nombre de figures du graphe : 1200 figures coûtent comme 300 (le temps, trop variable sous `svgdom` pour une valeur précise, passe d'environ 10 ms à moins de 2 ms).
- `update()` sans figure, `forced update` et `layout drawn again` ne changent pas : ils recalculent tout, ce qui est voulu (premier dessin, changement d'échelle).
- Reste le coût du décor (`decor drawn again`), qui grandit avec le nombre de figures sans les toucher : piste de la mise en page incrémentale.

## Après le décor incrémental (A17, 2026-10-31)

`Ox` et `Oy` sont réutilisés d'une mise en page à l'autre (`resetStyle()` puis `config =`), la grille et les axes de bord sont recréés, et les marqueurs sont cherchés dans les `defs` (placés en premier dans le svg) au lieu de tout le svg.

| figures | labels | scenario | computed() | updateLabel() | nodes created | nodes in svg | median ms |
|---|---|---|---|---|---|---|---|
| 300 | no | one point moved | 2 | 3 | 0 | 623 | 0.3 |
| 300 | no | update of the whole graph | 299 | 299 | 0 | 623 | 3.31 |
| 300 | no | forced update | 300 | 300 | 0 | 623 | 2.63 |
| 300 | no | layout drawn again | 300 | 300 | 6 | 623 | 3.24 |
| 300 | no | decor drawn again, figures not updated | 0 | 0 | 6 | 623 | 1.03 |
| 300 | yes | one point moved | 2 | 3 | 0 | 1073 | 2.76 |
| 300 | yes | update of the whole graph | 299 | 299 | 0 | 1073 | 4.74 |
| 300 | yes | forced update | 300 | 300 | 0 | 1073 | 2.97 |
| 300 | yes | layout drawn again | 300 | 300 | 6 | 1073 | 3.83 |
| 300 | yes | decor drawn again, figures not updated | 0 | 0 | 6 | 1073 | 1.31 |
| 1200 | no | one point moved | 2 | 3 | 0 | 2423 | 0.65 |
| 1200 | no | update of the whole graph | 1199 | 1199 | 0 | 2423 | 4.74 |
| 1200 | no | forced update | 1200 | 1200 | 0 | 2423 | 6.42 |
| 1200 | no | layout drawn again | 1200 | 1200 | 6 | 2423 | 6.04 |
| 1200 | no | decor drawn again, figures not updated | 0 | 0 | 6 | 2423 | 0.41 |
| 1200 | yes | one point moved | 2 | 3 | 0 | 4223 | 1.54 |
| 1200 | yes | update of the whole graph | 1199 | 1199 | 0 | 4223 | 7.23 |
| 1200 | yes | forced update | 1200 | 1200 | 0 | 4223 | 8.23 |
| 1200 | yes | layout drawn again | 1200 | 1200 | 6 | 4223 | 11.06 |
| 1200 | yes | decor drawn again, figures not updated | 0 | 0 | 6 | 4223 | 0.86 |

- **Le coût du décor ne dépend plus du nombre de figures** : `decor drawn again` passe de 3 à 8 ms (300 figures) et de 21 à 37 ms (1200 figures) à environ 1 ms et 0,4 à 0,9 ms. `layout drawn again` (le décor plus la mise à jour de toutes les figures) passe
  de 24 à 46 ms à 6 à 11 ms pour 1200 figures : il ne reste que le coût de redessiner les figures. Les nœuds créés par une mise en page passent de 10 à 6 (les deux axes ne sont plus recréés).
- Cause : `createMarker` cherchait le marqueur par `svg.findOne('#id')`, une recherche dans tout le svg à chaque axe créé (3,3 ms pour 1200 figures, plusieurs fois par axe).

## Items clos sans être faits (2026-10-31)

Mesures faites avant de décider (tests jetables, `svgdom`) :

- **Formes réutilisées (A15)** : une mise à jour crée **0 nœud svg** pour les 13 types de figures (point, droite, segment, chemin, Bézier, courbe, courbe paramétrée, cercle, polygone, arc, point suiveur, aire entre courbes, somme de Riemann).
  Il n'y a rien à réutiliser : les figures mettent déjà à jour les attributs de leur élément.
- **Labels (A16)** : pour 1200 figures, tous les `updateLabel()` coûtent 1,3 ms (contre 6,1 ms pour tous les `computed()`), et tous les `computeLabel()` 0,07 ms. Un indicateur « le texte est fixe » économiserait au plus 0,07 ms ;
  le `JSON.stringify` de `Label._state()` est dans les 1,3 ms. Aucun gain visible.
- **Propagation coupée (A14)** : un point déplacé redessine 2 figures sur 1200 ; il n'y a pas de cas mesuré où une dépendante garde la même géométrie. À rouvrir si un graphe réel a de longues chaînes de figures qui ne changent pas
  (intersections sans solution, figures cachées), ou pour que `updated` compte les figures qui ont vraiment changé.

## Redessiner le code : les lignes qui n'ont pas changé gardent leurs figures (2026-11-02)

`npm run bench` (le deuxième test, `vitest run --mode bench --silent=false -t "drawing the code again"` pour voir le tableau), `Draw.refresh(code)` avec 300 et 1200 figures :

| figures | scénario | nœuds svg créés | médiane (ms) |
|---|---|---|---|
| 300 | un nouveau `Draw` du code (l'ancien `refresh`) | 1239 | 182,0 |
| 300 | le même code | 0 | 2,3 |
| 300 | la dernière ligne change | 3 | 4,3 |
| 300 | une ligne du milieu change | 600 | 120,6 |
| 300 | la première ligne change | 1200 | 186,8 |
| 1200 | un nouveau `Draw` du code (l'ancien `refresh`) | 4839 | 1717,8 |
| 1200 | le même code | 0 | 6,0 |
| 1200 | la dernière ligne change | 3 | 9,0 |
| 1200 | une ligne du milieu change | 2400 | 1440,2 |
| 1200 | la première ligne change | 4800 | 2031,0 |

- Écrire à la fin du code (le cas courant) coûte 4 à 9 ms au lieu de 180 à 1700 ms. Changer la première ligne coûte comme avant.
- Ce que reste à gagner est une ligne du milieu ou du haut : la mise à jour en place (`config =` après `resetStyle()`) ne servirait que là. Elle suppose qu'aucun `build*` ne
  lit une valeur d'une figure au lieu de sa référence ; à décider si ce cas se plaint.
