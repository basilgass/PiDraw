# Coloration CodeMirror de PiDraw (et PiMath) : intégration dans Scolcours

Date : 2026-11-04. État : paquets prêts (PiDraw, PiMath), **Scolcours pas encore adapté** : à faire après la publication.

## Ce qui a été fait

### PiDraw : `pidraw/codemirror`

Nouvelle entrée du paquet, comme `pimath/codemirror` : `dist/codemirror.js` (+ `dist/shared.js`, le code commun avec `pidraw.js`), types dans `types/codemirror/`.
`@codemirror/*` et `@lezer/*` sont **externes** (peer dependencies optionnelles) : le projet qui importe le module fournit la copie unique de CodeMirror.

Source : `src/codemirror/`.

| Fichier | Rôle |
|---|---|
| `vocabulary.ts` | le vocabulaire **lu dans le parser** (`PARSER_TYPE`, `optionNames()`, `LAYOUT_KEYS`, `PARSER_COLOR_VALUES`) ; les descriptions des suggestions (`KEY_DETAILS` est typé par `PARSER_TYPE` : une nouvelle clé ne compile pas sans description) |
| `language.ts` | le `StreamLanguage` : mode `code` (`nom=clé valeurs -> options`) et mode `parameters` (`x=-10:10,axis,grid`) |
| `decorations.ts` | `nameRanges(code)` (pure, testée) et `pidrawNames()` : définition en gras, doublon, référence |
| `completion.ts` | `pidrawCompletion(mode)` : clés après `=`, options après `->`, couleurs après `color=`/`fill=`, valeurs de `easing`/`loop`/`drag`, paramètres du graphe |
| `highlight.ts` | `pidrawHighlight()` : le `HighlightStyle` aux classes `tok-*` |
| `index.ts` | `pidraw(options?)`, `pidrawParameters(options?)` et les morceaux exportés seuls |

API pour l'éditeur :

```ts
import {pidraw, pidrawParameters} from 'pidraw/codemirror'

pidraw()                                  // [langage, coloration, noms des figures, suggestions]
pidrawParameters()                        // idem pour les paramètres du graphe (sans les noms)
pidraw({completion: false, highlight: false, names: false})   // pour couper une partie
```

La règle `core-not-to-codemirror` (`.dependency-cruiser.cjs`) interdit au cœur d'importer `src/codemirror/`.

### PiMath : `pimath/codemirror`

Ajout de `pimathHighlight()` (et `pimathHighlightStyle`) : le même `HighlightStyle`, repris du Playground de la doc. Nouvelles peer dependencies optionnelles : `@codemirror/language`, `@lezer/highlight`.

### Le style commun : les classes `tok-*`

Les deux paquets posent les **mêmes classes**, jamais de couleurs. Les couleurs viennent de la page, donc du thème (clair, sombre).

| Classe | PiMath (JavaScript) | PiDraw |
|---|---|---|
| `tok-keyword` | mots-clés | clés de figures (`seg`), paramètres du graphe (`axis`) |
| `tok-function` | fonctions, propriétés | options (`w`, `label`) |
| `tok-string` | chaînes | couleurs (`red`) |
| `tok-number` | nombres | nombres |
| `tok-comment` | commentaires | `$ ...` |
| `tok-class` | classes | (pas utilisé) |
| `tok-invalid` | | ligne qui commence par `@` |

Noms des figures (PiDraw seulement) : `cm-pidraw-def` (gras), `cm-pidraw-ref`, `cm-pidraw-dup`. Couleurs réglables par les variables CSS `--pidraw-ref` et `--pidraw-dup`.

## À faire dans Scolcours

### 0. Prérequis

- Publier PiDraw (≥ 0.2.29) et PiMath (≥ 0.3.3), puis `npm install pidraw@latest pimath@latest` dans Scolcours.
- Les peer dependencies sont déjà dans Scolcours (`@codemirror/*` via `vue-codemirror` et `codemirror`). Vérifier que `@lezer/highlight` et `@codemirror/language` sont **résolus une seule fois** (`npm ls @codemirror/state @codemirror/language @lezer/highlight`). Deux copies de `@codemirror/state` produisent `Unrecognized extension value in extension set`. En cas de doublon : `resolve.dedupe: ['@codemirror/state', '@codemirror/view', '@codemirror/language', '@lezer/highlight']` dans `vite.config`.
- Si besoin d'essayer avant la publication : `npm pack` dans PiDraw puis `npm install ../PiDraw/pidraw-<version>.tgz` (préférable à `npm link`, qui duplique `@codemirror`).

### 1. `resources/js/Components/Form/FormCodearea.vue`

Remplacer l'import (ligne 8) :

```ts
// avant
import {pidrawExtensions, pidrawParamsLanguage} from "@/helpers/pidrawLanguage.ts"
// après
import {pidraw, pidrawParameters} from "pidraw/codemirror"
import {pimathHighlight} from "pimath/codemirror"
```

Remplacer les lignes 61 et 62 de `extensions` :

```ts
if (props.language === 'pidraw') return [basicSetup, ...pidraw(), ...singleLineExt.value, ...lineWrapExt.value, ...cmExtensions.value]
if (props.language === 'pidraw-params') return [basicSetup, ...pidrawParameters(), ...singleLineExt.value, ...lineWrapExt.value, ...cmExtensions.value]
```

Pour la coloration de PiMath, ajouter `pimathHighlight()` aux langages `javascript` (et `json` si on veut les mêmes couleurs) :

```ts
if (props.language === 'javascript') return [basicSetup, javascript(), pimathHighlight(), ...]
```

Points à contrôler :
- `basicSetup` contient déjà `autocompletion()` et un style de coloration par défaut (`defaultHighlightStyle`, utilisé en repli). `pidraw()` ajoute son propre `autocompletion()` : sans conséquence, les configurations se fusionnent. Si on veut éviter le doublon, `pidraw({completion: false})` et ajouter `pidrawCompletion()` à la main via `pidrawLanguage().data.of(...)`.
- `cmExtensions` (`useCodeMirrorEditor`) ajoute les complétions des `completionGroups` : elles s'ajoutent à celles de PiDraw. Les mots de PiDraw restent proposés après `=` et `->` seulement.
- `pidrawParameters()` n'a pas les décorations des noms (il n'y a pas de noms dans les paramètres).

### 2. Supprimer `resources/js/helpers/pidrawLanguage.ts`

Plus d'import ailleurs (vérifié : seul `FormCodearea.vue` l'utilise). Ce fichier était une **copie** (`pidraw-version: 0.2.28`) qui avait dérivé du parser : `reg` supprimé, `ppu`, `subgrid`, `no-points`, `label`, `tex`, `points` qui ne sont plus des paramètres (`box`, `axisX`, `gridX`, `default.*` les remplacent), `path`, `grid` et `axis` absents.
Plus de copie à synchroniser : le vocabulaire est lu dans le parser de la version installée.

### 3. Le CSS : donner leur couleur aux classes `tok-*`

À mettre dans `resources/css/app.css` (ou le CSS de l'éditeur), avec les couleurs de l'application. Exemple clair + sombre :

```css
.cm-editor .tok-keyword { color: #2563eb; }
.cm-editor .tok-function { color: #4f46e5; }
.cm-editor .tok-string { color: #16a34a; }
.cm-editor .tok-number { color: #9333ea; }
.cm-editor .tok-comment { color: #64748b; font-style: italic; }
.cm-editor .tok-class { color: #ca8a04; }
.cm-editor .tok-invalid { color: #dc2626; }

.cm-editor {
	--pidraw-ref: #dbeafe;
	--pidraw-dup: #dc2626;
}

.dark .cm-editor .tok-keyword { color: #60a5fa; }
/* ... */
```

Ces règles servent aux deux langages (PiMath et PiDraw), aux deux paquets, à tout éditeur de l'application.

### 4. Vérifier dans l'application

- `Tools/graphe.vue` (`language: 'pidraw-params'` et `'pidraw'`) et `Pages/Illustrations/IllustrationEdit.vue` (`pidraw-params`).
- Une ligne `s=seg A,B->red,w=3` : `seg` en `tok-keyword`, `red` en `tok-string`, `w` en `tok-function`, `3` en `tok-number`.
- Un nom défini deux fois (`A(1,1)` puis `A(2,2)`) est en rouge, gras.
- Les suggestions : `A=` puis une lettre propose les clés ; après `->`, les options et les couleurs.

## Hors périmètre (autre chantier)

Les breaking changes de PiDraw (syntaxe du parser, `reg` supprimé, paramètres renommés, `ILine` supprimé...) touchent le code **enregistré en base** par Scolcours : `DrawChecker`, `ZonesChecker`, `DevPiDraw*`, `KeyboardDraw*`, les exemples et les illustrations de la base. La coloration ne les migre pas : une ligne qui n'est plus valide est colorée comme les autres, et c'est `draw.refresh()` qui la signale.
