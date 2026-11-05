import { _ as e, a as t, d as n, g as r, l as i, o as a, r as o, s } from "./shared.js";
import { autocompletion as c } from "@codemirror/autocomplete";
import { RangeSetBuilder as l } from "@codemirror/state";
import { Decoration as u, EditorView as d, ViewPlugin as f } from "@codemirror/view";
import { HighlightStyle as p, StreamLanguage as m, syntaxHighlighting as h } from "@codemirror/language";
import { tags as g } from "@lezer/highlight";
// src/codemirror/vocabulary.ts
var _ = {
	drag: [
		"grid",
		"Ox",
		"Oy"
	],
	...s()
}, v = ["color", "fill"], y = Object.fromEntries(Object.entries(n).map(([e, t]) => [e, t.summary])), b = {
	w: "width: w=3",
	color: "stroke color: color=red/0.5",
	fill: "fill color: fill=blue/0.3",
	dash: "dashed",
	dot: "dotted",
	mark: "markers at the ends",
	hide: "hides the figure and its label",
	"!": "hides the figure, keeps the label",
	"?": "hides the label, keeps the figure",
	static: "cannot be moved",
	_: "cannot be moved",
	move: "move=1;2",
	scale: "scale=2;1",
	label: "label=A/tl",
	tex: "tex=A/br",
	drag: "drag=grid|Ox|Oy|figure",
	ultrathin: "width 0.5",
	thin: "width 0.75",
	thick: "width 2.5",
	ultrathick: "width 4",
	...a()
}, x = {
	x: "x=-10:10 — window, horizontal",
	y: "y=-10:10 — window, vertical",
	box: "box=-10:10,-5:5 — window",
	unitX: "unitX=1 — cm for one unit",
	unitY: "unitY=1 — cm for one unit",
	axis: "axes",
	grid: "grid",
	"default.label": "label of the figures",
	"default.tex": "LaTeX label of the figures",
	"default.points": "default shape of the points"
};
function S() {
	return {
		keys: Object.values(e),
		options: o(),
		parameters: i,
		colors: r
	};
}
// src/codemirror/completion.ts
var C = /[a-zA-Z][a-zA-Z0-9]*/, w = /^[a-zA-Z0-9]*$/;
function T(e, t, n) {
	return e.map((e) => ({
		label: e,
		type: t,
		detail: n[e]
	}));
}
function E(e, t) {
	let n = S(), r = e.state.doc.lineAt(e.pos), i = r.text.slice(0, e.pos - r.from), a = i.indexOf("->");
	if (a < 0) return t === "parameters" ? i.split(",").at(-1)?.includes("=") ? null : T(n.parameters, "keyword", x) : !i.includes("=") || /^\s*[$@]/.test(i) ? null : /^[^=]*=\s*[a-z]*$/.test(i) ? T(n.keys, "keyword", y) : null;
	let o = i.slice(a + 2).split(",").at(-1) ?? "", s = /^\s*([a-zA-Z]+)=[a-zA-Z0-9]*$/.exec(o);
	if (s) {
		if (v.includes(s[1])) return n.colors.map((e) => ({
			label: e,
			type: "constant"
		}));
		let e = _[s[1]];
		return e ? e.map((e) => ({
			label: e,
			type: "keyword"
		})) : null;
	}
	return /=|\//.test(o) ? null : [...T(n.options, "property", b), ...n.colors.map((e) => ({
		label: e,
		type: "constant"
	}))];
}
function D(e = "code") {
	return (t) => {
		let n = E(t, e);
		if (n === null) return null;
		let r = t.matchBefore(C);
		return r === null && !t.explicit ? null : {
			from: r?.from ?? t.pos,
			options: n,
			validFor: w
		};
	};
}
// src/codemirror/decorations.ts
var O = /^([A-Za-z][A-Za-z0-9]*)(?=[=(])/, k = /^[A-Za-z][A-Za-z0-9]*\([xt]\)\s*=/, A = /([A-Za-z][A-Za-z0-9]*)\.[xy]/g;
function j(e) {
	return e !== "" && !/^[$@]/.test(e);
}
function M(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = r.trimStart();
		t.push({
			text: e,
			offset: n,
			indent: r.length - e.length
		}), n += r.length + 1;
	}
	let r = /* @__PURE__ */ new Map();
	for (let { text: e, offset: n, indent: i } of t) {
		let t = j(e.trimEnd()) ? O.exec(e)?.[1] : void 0;
		t !== void 0 && r.set(t, [...r.get(t) ?? [], n + i]);
	}
	let i = [];
	for (let [e, t] of r) for (let n of t) i.push({
		from: n,
		to: n + e.length,
		kind: t.length > 1 ? "dup" : "def"
	});
	let a = [...r.keys()], o = new Set(a.filter((e) => /^[A-Z]/.test(e))), s = new Set(a.filter((e) => /^[a-z]/.test(e))), c = (e, t, n) => {
		e !== n && i.push({
			from: e,
			to: e + t.length,
			kind: "ref"
		});
	};
	for (let { text: e, offset: n, indent: i } of t) {
		let t = e.trimEnd(), a = j(t) ? O.exec(t) : null;
		if (a === null) continue;
		let l = n + i, u = t.indexOf("->"), d = u < 0 ? t : t.slice(0, u), f = d.indexOf("="), p = f < 0 ? a[1].length + 1 : f + 1, m = d.slice(p), h = n + i + p;
		if (k.test(t)) {
			for (let e of m.matchAll(A)) r.has(e[1]) && c(h + e.index, e[1], l);
			continue;
		}
		let g = /^\s*[a-z]+\s+/.exec(m), _ = g === null || f < 0 ? 0 : g[0].length, v = m.slice(_), y = h + _;
		for (let e of v.matchAll(/[A-Z][0-9]*/g)) o.has(e[0]) && c(y + e.index, e[0], l);
		let b = 0;
		for (let e of v.split(",")) {
			let t = e.trim();
			s.has(t) && c(y + b + e.indexOf(t), t, l);
			for (let t of e.matchAll(/([a-z][a-zA-Z0-9]*)\.[xy]/g)) s.has(t[1]) && c(y + b + t.index, t[1], l);
			b += e.length + 1;
		}
	}
	let l = {
		dup: 0,
		ref: 1,
		def: 2
	};
	i.sort((e, t) => e.from - t.from || l[e.kind] - l[t.kind]);
	let u = [];
	for (let e of i) e.from >= (u.at(-1)?.to ?? 0) && e.from < e.to && u.push(e);
	return u;
}
var N = {
	def: u.mark({ class: "cm-pidraw-def" }),
	dup: u.mark({ class: "cm-pidraw-dup" }),
	ref: u.mark({ class: "cm-pidraw-ref" })
};
function P(e) {
	let t = new l();
	for (let { from: n, to: r, kind: i } of M(e.state.doc.toString())) t.add(n, r, N[i]);
	return t.finish();
}
function F() {
	return [f.fromClass(class {
		decorations;
		constructor(e) {
			this.decorations = P(e);
		}
		update(e) {
			e.docChanged && (this.decorations = P(e.view));
		}
	}, { decorations: (e) => e.decorations }), d.baseTheme({
		".cm-pidraw-def": { fontWeight: "bold" },
		".cm-pidraw-dup": {
			fontWeight: "bold",
			color: "var(--pidraw-dup, #dc2626)"
		},
		".cm-pidraw-ref": {
			backgroundColor: "var(--pidraw-ref, #dbeafe)",
			borderRadius: "2px",
			padding: "0 1px"
		}
	})];
}
// src/codemirror/highlight.ts
function I() {
	return h(p.define([
		{
			tag: g.keyword,
			class: "tok-keyword"
		},
		{
			tag: [g.string, g.special(g.string)],
			class: "tok-string"
		},
		{
			tag: [
				g.number,
				g.bool,
				g.null
			],
			class: "tok-number"
		},
		{
			tag: [
				g.lineComment,
				g.blockComment,
				g.comment
			],
			class: "tok-comment"
		},
		{
			tag: [g.function(g.variableName), g.propertyName],
			class: "tok-function"
		},
		{
			tag: g.className,
			class: "tok-class"
		},
		{
			tag: g.invalid,
			class: "tok-invalid"
		}
	]));
}
// src/codemirror/language.ts
var L = /^-?(\d+(\.\d+)?|\.\d+)/, R = /^[a-zA-Z][a-zA-Z0-9]*/, z = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)?/, B = "$", V = "@", H = Object.values(t).flatMap((e) => e.commands === void 0 ? [] : [e.commands.pattern]);
function U(e) {
	let t = S(), n = new Set(t.keys), r = new Set(t.options), i = new Set(t.parameters), a = new Set(t.colors);
	return (t, o) => {
		if (t.sol()) {
			o.stage = e === "code" ? "name" : "values", o.inOptions = !1, o.segmentStart = !0;
			let n = t.peek();
			if (n === B) return t.skipToEnd(), "comment";
			if (n === V) {
				let n = e === "code" && H.some((e) => t.match(e) !== null);
				return t.skipToEnd(), n ? "keyword" : "invalid";
			}
		}
		if (t.eatSpace()) return null;
		if (t.match("->")) return o.inOptions = !0, o.segmentStart = !0, "operator";
		if (e === "parameters" && o.inOptions && t.match(",,")) return o.inOptions = !1, o.segmentStart = !0, "operator";
		let s = o.segmentStart;
		if (t.match(",")) return o.segmentStart = !0, "operator";
		if (o.segmentStart = !1, t.match(L)) return "number";
		if (o.inOptions) {
			if (s && t.match(/^[!?_*]/)) return "atom";
			let e = t.match(R);
			return e ? s ? a.has(e[0]) ? "string" : r.has(e[0]) ? "propertyName" : "variableName" : a.has(e[0]) ? "string" : "variableName" : (t.next(), "operator");
		}
		if (e === "parameters") {
			if (s) {
				let e = t.match(z);
				if (e) return i.has(e[0]) ? "keyword" : "variableName";
			}
		} else if (o.stage === "key") {
			o.stage = "values";
			let e = t.match(/^[a-z]+(?=\s|$)/);
			if (e) return n.has(e[0]) ? "keyword" : "variableName";
		}
		return t.match(R) ? "variableName" : (t.next() === "=" && o.stage === "name" && (o.stage = "key"), "operator");
	};
}
function W(e = "code") {
	return m.define({
		name: e === "code" ? "pidraw" : "pidraw-parameters",
		startState: () => ({
			stage: e === "code" ? "name" : "values",
			inOptions: !1,
			segmentStart: !0
		}),
		token: U(e),
		languageData: { commentTokens: { line: B } }
	});
}
// src/codemirror/index.ts
function G(e, { completion: t = !0, highlight: n = !0, names: r = !0 }) {
	let i = W(e);
	return [
		i,
		...n ? [I()] : [],
		...r && e === "code" ? [F()] : [],
		...t ? [i.data.of({ autocomplete: D(e) }), c()] : []
	];
}
function K(e = {}) {
	return G("code", e);
}
function q(e = {}) {
	return G("parameters", e);
}
export { M as nameRanges, K as pidraw, D as pidrawCompletion, I as pidrawHighlight, W as pidrawLanguage, F as pidrawNames, q as pidrawParameters, S as readVocabulary };

//# sourceMappingURL=codemirror.js.map