# Registre des analyses `file-analyse`

Ce fichier trace la dernière analyse de type `file-analyse` (skill `/file-analyse`)
effectuée sur chaque fichier source de `src/`.

Règles de tenue :

- **Mise à jour uniquement à la clôture d'un `file-analyse`** (analyse terminée et
  fichier validé), jamais à la production du rapport ni lors d'une simple
  modification de code.
- `Dernière analyse` : date au format `YYYY-MM-DD` de la clôture de la dernière
  analyse, ou `Jamais` si l'analyse n'est pas terminée (ou pas commencée).
- `En attente (<raison>)` : l'analyse est faite (code écrit, testé, documenté) mais sa clôture, qui valide le fichier avec la vérification
  complète, attend quelque chose d'extérieur (aujourd'hui la refonte de PiParser). La date est écrite à la clôture, `Discussions` dit déjà quelles
  discussions ont analysé le fichier.
- `Discussions` : une entrée par discussion ayant analysé ce fichier, au format
  `YYYY-MM-DD : <session-uuid>` (le transcript `~/.claude/projects/<projet>/<uuid>.jsonl`).
  Plusieurs entrées séparées par `<br>`.
- `Suggestions suivantes` : jusqu'à 5 fichiers liés (dépendances / consommateurs)
  qu'il serait pertinent d'analyser ensuite, déterminés lors de l'analyse.

| Fichier | Dernière analyse | Discussions | Suggestions suivantes |
|---------|------------------|-------------|-----------------------|
| src/animate/Animate.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/Graph.ts, src/Draw/Draw.options.ts, src/index.ts |
| src/animate/Animate.types.ts | 2026-11-04 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8<br>2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/codemirror/completion.ts | Jamais |  |  |
| src/codemirror/decorations.ts | Jamais |  |  |
| src/codemirror/highlight.ts | Jamais |  |  |
| src/codemirror/index.ts | Jamais |  |  |
| src/codemirror/language.ts | Jamais |  |  |
| src/codemirror/vocabulary.ts | Jamais |  |  |
| src/Graph.types.ts | 2026-11-03 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/zoom/Zoom.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/index.ts |
| src/zoom/Zoom.types.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/slides/Slides.ts | 2026-11-05 | 2026-11-05 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/index.ts |
| src/slides/slideSet.ts | 2026-11-05 | 2026-11-05 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/slides/Slides.syntax.ts |
| src/slides/Slides.syntax.ts | Jamais |  |  |
| src/animate/animation.ts | Jamais |  |  |
| src/animate/Animate.syntax.ts | Jamais |  |  |
| src/controls/controls.ts | Jamais |  |  |
| src/controls/controls.types.ts | Jamais |  |  |
| src/buttons/Buttons.ts | Jamais |  |  |
| src/buttons/Buttons.syntax.ts | Jamais |  |  |
| src/buttons/Buttons.types.ts | Jamais |  |  |
| src/buttons/toggle.ts | Jamais |  |  |
| src/slides/Slides.types.ts | 2026-11-05 | 2026-11-05 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/calculus/computeAxis.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Axis/Axis.ts |
| src/calculus/computeBezier.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Bezier/Bezier.ts |
| src/calculus/computeCurve.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Parametric/Parametric.ts |
| src/calculus/computeCircle.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/calculus/computeDrag.ts | 2026-10-31 | 2026-10-31 : 1603dae8-d887-4f54-baa3-5b3073e79aa5 | src/Graph.ts |
| src/calculus/computeArc.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/calculus/computeFillBetween.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/FillBetween/FillBetween.ts |
| src/calculus/computeGrid.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Grid/Grid.ts |
| src/calculus/computeLayout.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/Graph.ts |
| src/calculus/computeLine.ts | 2026-10-29 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493<br>2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Axis/Axis.ts, src/figures/Grid/Grid.ts, src/figures/Follow/Follow.ts, src/figures/Line/Line.ts |
| src/calculus/computePath.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Path/Path.ts, src/figures/Path/Path.parser.ts |
| src/calculus/computePolygon.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/calculus/computeQuadratic.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/figures/Plot/Plot.ts |
| src/calculus/computeRiemann.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Riemann/Riemann.ts |
| src/calculus/easing.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/animate/Animate.ts, src/figures/AbstractFigure/AbstractFigure.ts |
| src/calculus/computeZoom.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/zoom/Zoom.ts |
| src/calculus/coordinates.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/Graph.ts, src/figures/AbstractFigure/AbstractFigure.ts, src/figures/Point/Point.ts |
| src/calculus/geometry.ts | 2026-10-29 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493<br>2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Line/Line.ts, src/figures/Point/Point.ts, src/figures/Arc/Arc.ts, src/figures/Polygon/Polygon.ts |
| src/calculus/index.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 |  |
| src/calculus/intersections.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/calculus/linearEquation.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/calculus/numbers.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/figures/Point/Point.ts, src/figures/Line/Line.ts, src/figures/Arc/Arc.ts |
| src/calculus/NumExp.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/figures/Plot/Plot.ts, src/figures/Parametric/Parametric.ts, src/figures/Line/Line.ts |
| src/Draw/Draw.ts | En attente (PiParser) | 2026-11-02 : df1377f9-517b-471c-a289-a201a38f3fa7<br>2026-11-02 : 4261b093-4072-4960-9490-f6dcbb8c5ccb | src/Animate.ts, src/pidraw.common.ts, src/index.ts, src/parser/parser.config.ts, src/parser/parser.common.ts |
| src/Draw/Draw.diff.ts | En attente (PiParser) | 2026-11-02 : df1377f9-517b-471c-a289-a201a38f3fa7<br>2026-11-02 : 4261b093-4072-4960-9490-f6dcbb8c5ccb | |
| src/Draw/Draw.lines.ts | En attente (PiParser) | 2026-11-02 : df1377f9-517b-471c-a289-a201a38f3fa7<br>2026-11-02 : 4261b093-4072-4960-9490-f6dcbb8c5ccb | |
| src/Draw/Draw.options.ts | En attente (PiParser) | 2026-11-02 : df1377f9-517b-471c-a289-a201a38f3fa7<br>2026-11-02 : 4261b093-4072-4960-9490-f6dcbb8c5ccb | |
| src/Draw/Draw.report.ts | En attente (PiParser) | 2026-11-02 : df1377f9-517b-471c-a289-a201a38f3fa7<br>2026-11-02 : 4261b093-4072-4960-9490-f6dcbb8c5ccb | |
| src/errors.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/calculus/NumExp.ts |
| src/Graph.ts | 2026-10-31 | 2026-10-31 : 1603dae8-d887-4f54-baa3-5b3073e79aa5 | src/Draw/Draw.ts, src/Animate.ts, src/pidraw.common.ts, src/index.ts, src/calculus/computeDrag.ts |
| src/figures/AbstractFigure/AbstractFigure.ts | 2026-10-29 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493<br>2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Point/Point.ts, src/figures/Line/Line.ts, src/figures/Plot/Plot.ts, src/figures/Label/Label.ts, src/Graph.ts |
| src/figures/AbstractFigure/AbstractFigure.constraints.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc |  |
| src/figures/AbstractFigure/AbstractFigure.tikz.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Label/Label.ts |
| src/figures/Arc/Arc.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Arc/Arc.parser.ts, src/figures/Label/Label.ts, src/Draw/Draw.ts, src/Graph.ts, src/figures/Polygon/Polygon.ts |
| src/figures/Axis/Axis.constraints.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Axis/Axis.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/Draw/Draw.ts, src/figures/Axis/Axis.parser.ts, src/figures/Line/Line.ts, src/figures/Point/Point.ts |
| src/figures/Axis/Axis.types.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Curve/Curve.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Curve/Curve.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Arc/Arc.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Arc/Arc.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Bezier/Bezier.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Bezier/Bezier.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Bezier/Bezier.parser.ts, src/Draw/Draw.ts, src/Graph.ts, src/figures/Path/Path.ts, src/figures/Follow/Follow.ts |
| src/figures/Bezier/Bezier.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Circle/Circle.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Circle/Circle.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Circle/Circle.parser.ts, src/figures/Arc/Arc.ts, src/Graph.ts, src/figures/Plot/Plot.ts, src/Draw/Draw.ts |
| src/figures/Circle/Circle.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/FillBetween/FillBetween.constraints.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/FillBetween/FillBetween.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/figures/FillBetween/FillBetween.parser.ts, src/figures/Label/Label.ts |
| src/figures/FillBetween/FillBetween.types.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Follow/Follow.constraints.ts | 2026-10-30 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Follow/Follow.ts | 2026-10-30 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/figures/Follow/Follow.parser.ts, src/figures/Riemann/Riemann.ts, src/figures/FillBetween/FillBetween.ts, src/figures/Label/Label.ts |
| src/figures/Follow/Follow.types.ts | 2026-10-30 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Grid/Grid.constraints.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Grid/Grid.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/Draw/Draw.ts, src/figures/Grid/Grid.parser.ts, src/figures/Axis/Axis.ts, src/calculus/computeGrid.ts |
| src/figures/Grid/Grid.types.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Line/Line.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Line/Line.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Line/Line.parser.ts, src/figures/Circle/Circle.ts, src/figures/Plot/Plot.ts, src/Draw/Draw.ts, src/Graph.ts |
| src/figures/Line/Line.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Parametric/Parametric.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Parametric/Parametric.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Follow/Follow.ts, src/figures/FillBetween/FillBetween.ts, src/figures/Riemann/Riemann.ts, src/Graph.ts, src/figures/Label/Label.ts |
| src/figures/Parametric/Parametric.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Path/Path.constraints.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc |  |
| src/figures/Path/Path.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/figures/Follow/Follow.ts, src/figures/Path/Path.parser.ts, src/calculus/computePath.ts, src/Draw/Draw.ts |
| src/figures/Path/Path.types.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc |  |
| src/figures/Plot/Plot.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Parametric/Parametric.ts, src/figures/Follow/Follow.ts, src/figures/Riemann/Riemann.ts, src/figures/FillBetween/FillBetween.ts, src/Graph.ts |
| src/figures/Plot/Plot.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Plot/Plot.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Point/Point.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Point/Point.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Line/Line.ts, src/figures/Circle/Circle.ts, src/figures/Plot/Plot.ts, src/figures/Label/Label.ts, src/figures/Point/Point.parser.ts |
| src/figures/Point/Point.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Polygon/Polygon.constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Polygon/Polygon.types.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Polygon/Polygon.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Polygon/Polygon.parser.ts, src/Draw/Draw.ts, src/Graph.ts, src/calculus/computePolygon.ts, src/figures/AbstractFigure/AbstractFigure.ts |
| src/figures/Riemann/Riemann.constraints.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/Riemann/Riemann.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Graph.ts, src/figures/Riemann/Riemann.parser.ts, src/figures/FillBetween/FillBetween.ts, src/figures/Label/Label.ts |
| src/figures/Riemann/Riemann.types.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/figures/constraints.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/index.ts | 2026-11-04 | 2026-11-04 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/figures/Label/Label.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/Graph.ts, src/figures/AbstractFigure/AbstractFigure.ts, src/pidraw.common.ts |
| src/figures/Label/Label.constraints.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc |  |
| src/figures/Label/Label.types.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc |  |
| src/figures/Arc/Arc.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Arc/Arc.ts |
| src/figures/Axis/Axis.parser.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/figures/Axis/Axis.ts |
| src/figures/Bezier/Bezier.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Bezier/Bezier.ts |
| src/figures/Circle/Circle.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Arc/Arc.ts, src/figures/Arc/Arc.parser.ts, src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts |
| src/figures/Grid/Grid.parser.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/figures/Grid/Grid.ts |
| src/figures/Label/Label.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | |
| src/parser/buildLayout.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/Graph.ts, src/figures/Grid/Grid.parser.ts, src/figures/Axis/Axis.parser.ts, src/figures/Grid/Grid.ts |
| src/figures/Line/Line.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Plot/Plot.parser.ts, src/figures/Circle/Circle.ts |
| src/figures/FillBetween/FillBetween.parser.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/figures/FillBetween/FillBetween.ts |
| src/figures/Follow/Follow.parser.ts | 2026-10-30 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Follow/Follow.ts |
| src/figures/Parametric/Parametric.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.curve.ts, src/figures/Parametric/Parametric.ts |
| src/figures/Path/Path.parser.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/figures/Path/Path.ts, src/parser/parser.config.ts |
| src/parser/parser.curve.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/figures/Riemann/Riemann.parser.ts, src/figures/FillBetween/FillBetween.parser.ts |
| src/figures/Plot/Plot.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/figures/Parametric/Parametric.ts, src/figures/Parametric/Parametric.parser.ts |
| src/figures/Riemann/Riemann.parser.ts | 2026-10-30 | 2026-10-30 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/figures/Riemann/Riemann.ts |
| src/figures/Point/Point.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Line/Line.parser.ts, src/figures/Line/Line.ts |
| src/figures/Polygon/Polygon.parser.ts | 2026-10-29 | 2026-10-29 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/Draw/Draw.ts, src/parser/parser.config.ts, src/parser/parser.common.ts, src/figures/Polygon/Polygon.ts |
| src/parser/parser.common.ts | 2026-11-03 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/parser/parser.config.ts, src/index.ts |
| src/parser/parser.types.ts | 2026-11-03 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | |
| src/parser/parser.config.ts | 2026-11-03 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/index.ts, src/Draw/Draw.ts |
| src/parser/parser.interval.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/parser/buildLayout.ts, src/figures/Grid/Grid.parser.ts |
| src/parser/parser.step.ts | 2026-10-31 | 2026-10-31 : 2c074a69-e519-4c8f-82a5-8e23320a64cc | src/parser/buildLayout.ts, src/figures/Grid/Grid.parser.ts, src/figures/Axis/Axis.parser.ts |
| src/pidraw.common.ts | 2026-11-03 | 2026-11-03 : c2352409-1f0d-483b-b9dd-7ae70aa615e8 | src/parser/parser.common.ts, src/parser/parser.config.ts, src/index.ts |
| src/svg/marker.ts | 2026-10-28 | 2026-10-28 : bde2415e-7be7-44ba-a29c-d7450ab94493 | src/figures/AbstractFigure/AbstractFigure.ts, src/figures/Line/Line.ts, src/figures/Axis/Axis.ts |
| src/calculus/computeNode.ts | Jamais |  |  |
| src/calculus/computeEdge.ts | Jamais |  |  |
| src/figures/Edge/Edge.ts | Jamais |  |  |
| src/figures/Edge/Edge.types.ts | Jamais |  |  |
| src/figures/Edge/Edge.constraints.ts | Jamais |  |  |
| src/figures/Edge/Edge.parser.ts | Jamais |  |  |
