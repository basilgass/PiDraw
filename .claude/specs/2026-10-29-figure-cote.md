# Spec PiDraw : figure « cote » (distance entre deux points)

Date : 2026-10-29
Origine : demande de l'utilisateur pendant l'analyse de `Line.ts`.
Statut : idée à concevoir, après l'analyse des figures existantes. Rien n'est implémenté.

## 1. But

Tracer la distance entre deux points (ou le long d'un segment) comme une cote de dessin technique : un trait parallèle au segment,
décalé, avec une flèche à chaque bout, le texte de la distance (`3.5 cm`) au milieu, et les **guides** (traits d'attache) qui relient les
deux points mesurés aux bouts de la cote.

```
 A ·                         · B
   |                         |        guides
   |<-------- 3.5 cm ------->|        cote : trait + flèches + texte
```

## 2. Pourquoi une figure à part, pas une configuration de `Line`

- Une cote est **composite** : un trait fléché, deux guides, un texte. `Line` est un seul trait (droite, demi-droite, segment, vecteur).
  Les figures composites existent déjà (`Follow`, `Riemann` : un groupe de formes).
- Le **décalage** (`offset`, en unités, le long de la normale) est un paramètre de la figure, pas une translation de la forme : la longueur
  des guides en dépend, il doit donc entrer dans `computed()`. C'est pourquoi `Line.move(nombre)` est supprimé : un déplacement de la
  forme ne recalculerait pas les guides.
- La distance est un **champ de label** : le champ `length` existe déjà (label d'un segment, `@` traduit par `parseLabelText`), il suffit
  que la cote le déclare dans `labelFields()`.

## 3. Configuration envisagée (indicative)

- `from`, `to` : deux points (`XY` en pixels) ; ou un segment (`Line` de forme `segment`), dont la figure lit `start` et `end`.
- `offset` : décalage de la cote le long de la normale, en unités (0 : la cote est sur le segment, sans guides).
- `guides` : afficher les guides (par défaut oui quand `offset` ≠ 0).
- `digits`, `unit` : décimales et unité écrite à côté du nombre (`cm`).
- Le texte est tourné le long de la cote (rotation automatique, comme le label d'un segment).

## 4. Export TikZ

`\draw[<->] (A') -- (B') node[midway, sloped, above] {3.5 cm};` pour la cote, et `\draw (A) -- (A');` pour chaque guide, avec les
options de trait habituelles (`_tikzDraw`, `_tikzLabel`).

## 5. Parser (à décider avec le vocabulaire)

Une clé du genre `dist` : `m=dist A,B->offset=0.5,unit=cm`, ou `m=dist s` à partir d'un segment. Le nom de la clé, des options et
leur forme sont à fixer lors de l'inventaire du vocabulaire du parser (voir `.claude/docs/dette-technique.md`).

## 6. Questions ouvertes

- Nom de la figure et de la clé du parser (`dist`, `cote`, `length`).
- Les guides dépassent-ils un peu la cote (convention du dessin technique) ?
- Sens du décalage (vers la gauche ou vers la droite du segment orienté de `from` vers `to`), et valeurs négatives.
- Unité : texte libre, ou conversion (l'unité du repère n'est pas forcément le centimètre) ?
