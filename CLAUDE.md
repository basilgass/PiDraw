@.claude/guideline.md

# PiDraw - Bibliothèque TypeScript de dessin géométrique (SVG)

## Description

Bibliothèque TypeScript pour dessiner des figures géométriques et des graphes de fonctions en SVG (`@svgdotjs/svg.js`),
à partir d'une syntaxe texte courte analysée par un parser (documentée dans `docs/guide/`).

Version actuelle : 0.2.28 | Auteur : Basil Gass | Licence : MIT

## Structure du projet

```
src/
├── figures/     # Un dossier par figure : <Figure>.ts, .types.ts, .constraints.ts, .parser.ts (AbstractFigure, Point, Line, Label, Plot, Grid...)
├── parser/      # Parser commun (parser.config.ts, parser.common.ts, buildLayout.ts) ; le parser d'une figure est dans son dossier
├── calculus/    # Maths pures, sans svg.js : NumExp, géométrie, coordonnées, computeLine, computeQuadratic, computeBezier (index.ts)
├── svg/         # Helpers svg.js (marker)
├── codemirror/  # Entrée `pidraw/codemirror` : langage, coloration, noms des figures, suggestions pour CodeMirror 6 (jamais importé par le cœur)
├── errors.ts    # PiDrawError, ParseError, InvalidArgumentError, MathError
├── Graph.ts     # Classe Graph : dessine, met à jour et exporte (TikZ) les figures
├── Draw/        # Draw.ts (classe PiDraw : lit le code, construit les figures dans un Graph, `draw.graph`), Draw.lines.ts (lecture des lignes, pur)
├── animate/     # Animate.ts (lecture de l'animation), Animate.types.ts (LoopStyle, IFigureAnimation) ; futurs slides/, zoom/ à part
├── Graph.types.ts, pidraw.common.ts
└── index.ts     # Point d'entrée

tests/           # Tests Vitest, structure miroir de src/
docs/            # Site VitePress (guide en anglais avec exemples vérifiés, référence d'API générée)
demo/            # Application de démonstration (Vue + Tailwind)
dist/, types/    # Générés par le build : ne pas toucher
```

## Commandes principales

```bash
npm run test        # Vitest, mode normal
npm run test:quick  # mode rapide : pendant l'itération
npm run test:full   # mode complet : vérification finale d'un fichier
npm run bench       # mesure de la mise à jour (bench/), à lancer avant et après un changement de update
npm run build       # tsc + vite build
npm run docs:dev    # Site VitePress en local
npm run docs:check  # construit les exemples de la documentation (mode Vitest docs)
npm run docs:build  # docs:check + TypeDoc + VitePress
```

## Suivi des analyses

`/file-analyse` : registre global `.claude/docs/file-analyse-log.md`.

## Ce qu'il NE faut PAS toucher

- `dist/` et `types/` : générés par le build
