# Tracé des courbes (2026-10-29)

Mesures faites en préparant `Plot.ts`. Fenêtre de 800 x 600 pixels, 50 pixels par unité, x de -9 à 9. L'écart est la distance maximale entre la
polyline et une référence 20 fois plus fine, dans la partie visible.

## Constat

L'ancien algorithme échantillonnait un point par pixel (`samples` = pixels par unité) puis subdivisait chaque intervalle d'un pixel : environ
1800 points pour n'importe quelle fonction, une droite comprise. Les subdivisions étaient inutiles (sous le pixel), et la courbe s'arrêtait
un pas avant le bord de sa définition (`sqrt(4-x^2)` perdait 14 pixels de haut aux extrémités).

## Algorithme retenu (`calculus/computeCurve.ts`)

- pas initial de 8 pixels ;
- un intervalle est coupé si le milieu ou l'un des deux quarts s'écarte de la corde de plus de `tolerance` (0,5 px) : le milieu seul se trompe
  sur `x^3`, dont le milieu est sur la corde ;
- pas de subdivision quand les deux extrémités sont hors de la vue du même côté ;
- recherche du bord de définition par dichotomie (12 pas) quand un échantillon est défini et son voisin non ;
- les points au-delà de `asymptoteThreshold` hauteurs sont non définis ;
- simplification de Douglas-Peucker à `tolerance / 2` sur chaque tronçon défini ;
- chemin avec 2 décimales.

## Résultats (points / écart en pixels)

| Fonction | Ancien | Retenu |
|---|---|---|
| `x` | 1801 / 0 | 2 / 0 |
| `sin(x)` | 1801 / 0 | 89 / 0,27 |
| `sin(3x)` | 1801 / 0,01 | 240 / 0,25 |
| `sin(10x)` | 1801 / 0,06 | 419 / 0,37 |
| `x^2` | 1801 / 0 | 77 / 0,25 |
| `x^3` | 1801 / 0 | 107 / 0,24 |
| `x^5` | 1489 / 0 | 130 / 0,26 |
| `sqrt(x)` | 1351 / 0,12 | 76 / 0,25 |
| `abs(x)` | 1801 / 0 | 3 / 0 |
| `1/(1+x^2)` | 1801 / 0 | 31 / 0,20 |
| `sqrt(4-x^2)` | 1101 / 0,12 | 121 / 0,46 |
| `1/x` | 1799 / 0,01 | 55 / 0,27 |
| `tan(x)` | 1793 / 0,01 | 237 / 0,26 |
| `2^x` | 1801 / 0 | 67 / 0,24 |
| `x*sin(1/x)` | 1819 / 1,03 | 53 / 3,10 (pas de 12 px : 64 / 0,45) |

Le seul cas pathologique est une oscillation infinie (`x*sin(1/x)` en 0) : un pas initial plus fin (`samples`) la suit.

## Réutilisation

`sampleCurve(at, from, to, options)` prend une fonction `paramètre -> point en pixels` (un point sans position coupe la courbe) : `Plot` passe
`x -> (x, f(x))`, `Parametric` passera `t -> (x(t), y(t))`.
