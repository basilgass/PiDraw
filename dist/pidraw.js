//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = {}, r = [];
function i(e, t) {
	if (Array.isArray(e)) {
		for (let n of e) i(n, t);
		return;
	}
	if (typeof e == "object") {
		for (let t in e) i(t, e[t]);
		return;
	}
	s(Object.getOwnPropertyNames(t)), n[e] = Object.assign(n[e] || {}, t);
}
function a(e) {
	return n[e] || {};
}
function o() {
	return [...new Set(r)];
}
function s(e) {
	r.push(...e);
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/utils/utils.js
function c(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) i.push(t(e[n]));
	return i;
}
function l(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) t(e[n]) && i.push(e[n]);
	return i;
}
function u(e) {
	return e % 360 * Math.PI / 180;
}
function d(e) {
	return e.replace(/([A-Z])/g, function(e, t) {
		return "-" + t.toLowerCase();
	});
}
function f(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function p(e, t, n, r) {
	return (t == null || n == null) && (r ||= e.bbox(), t == null ? t = r.width / r.height * n : n ??= r.height / r.width * t), {
		width: t,
		height: n
	};
}
function m(e, t) {
	let n = e.origin, r = e.ox == null ? e.originX == null ? "center" : e.originX : e.ox, i = e.oy == null ? e.originY == null ? "center" : e.originY : e.oy;
	n != null && ([r, i] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
	let a = typeof r == "string", o = typeof i == "string";
	if (a || o) {
		let { height: e, width: n, x: s, y: c } = t.bbox();
		a && (r = r.includes("left") ? s : r.includes("right") ? s + n : s + n / 2), o && (i = i.includes("top") ? c : i.includes("bottom") ? c + e : c + e / 2);
	}
	return [r, i];
}
var h = /* @__PURE__ */ new Set([
	"desc",
	"metadata",
	"title"
]), g = (e) => h.has(e.nodeName), _ = (e, t, n = {}) => {
	let r = { ...t };
	for (let e in r) r[e].valueOf() === n[e] && delete r[e];
	Object.keys(r).length ? e.node.setAttribute("data-svgjs", JSON.stringify(r)) : (e.node.removeAttribute("data-svgjs"), e.node.removeAttribute("svgjs:data"));
}, v = "http://www.w3.org/2000/svg", ee = "http://www.w3.org/1999/xhtml", te = "http://www.w3.org/2000/xmlns/", ne = "http://www.w3.org/1999/xlink", y = {
	window: typeof window > "u" ? null : window,
	document: typeof document > "u" ? null : document
};
function re() {
	return y.window;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/Base.js
var ie = class {}, ae = {}, oe = "___SYMBOL___ROOT___";
function se(e, t = v) {
	return y.document.createElementNS(t, e);
}
function b(e, t = !1) {
	if (e instanceof ie) return e;
	if (typeof e == "object") return ce(e);
	if (e == null) return new ae[oe]();
	if (typeof e == "string" && e.trim().charAt(0) !== "<") return ce(y.document.querySelector(e));
	let n = t ? y.document.createElement("div") : se("svg");
	return n.innerHTML = e.trim(), e = ce(n.firstElementChild), n.removeChild(n.firstElementChild), e;
}
function x(e, t) {
	return t && (t instanceof y.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : se(e);
}
function S(e) {
	if (!e) return null;
	if (e.instance instanceof ie) return e.instance;
	if (e.nodeName === "#document-fragment") return new ae.Fragment(e);
	let t = f(e.nodeName || "Dom");
	return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : ae[t] || (t = "Dom"), new ae[t](e);
}
var ce = S;
function C(e, t = e.name, n = !1) {
	return ae[t] = e, n && (ae[oe] = e), s(Object.getOwnPropertyNames(e.prototype)), e;
}
function le(e) {
	return ae[e];
}
var ue = 1e3;
function de(e) {
	return "Svgjs" + f(e) + ue++;
}
function fe(e) {
	for (let t = e.children.length - 1; t >= 0; t--) fe(e.children[t]);
	return e.id &&= de(e.nodeName), e;
}
function w(e, t) {
	let n, r;
	for (e = Array.isArray(e) ? e : [e], r = e.length - 1; r >= 0; r--) for (n in t) e[r].prototype[n] = t[n];
}
function T(e) {
	return function(...t) {
		let n = t[t.length - 1];
		return n && n.constructor === Object && !(n instanceof Array) ? e.apply(this, t.slice(0, -1)).attr(n) : e.apply(this, t);
	};
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js
function pe() {
	return this.parent().children();
}
function me() {
	return this.parent().index(this);
}
function he() {
	return this.siblings()[this.position() + 1];
}
function ge() {
	return this.siblings()[this.position() - 1];
}
function _e() {
	let e = this.position();
	return this.parent().add(this.remove(), e + 1), this;
}
function ve() {
	let e = this.position();
	return this.parent().add(this.remove(), e ? e - 1 : 0), this;
}
function ye() {
	return this.parent().add(this.remove()), this;
}
function be() {
	return this.parent().add(this.remove(), 0), this;
}
function xe(e) {
	e = b(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t), this;
}
function Se(e) {
	e = b(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t + 1), this;
}
function Ce(e) {
	return e = b(e), e.before(this), this;
}
function we(e) {
	return e = b(e), e.after(this), this;
}
i("Dom", {
	siblings: pe,
	position: me,
	next: he,
	prev: ge,
	forward: _e,
	backward: ve,
	front: ye,
	back: be,
	before: xe,
	after: Se,
	insertBefore: Ce,
	insertAfter: we
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/regex.js
var Te = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Ee = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, De = /rgb\((\d+),(\d+),(\d+)\)/, Oe = /(#[a-z_][a-z0-9\-_]*)/i, ke = /\)\s*,?\s*/, Ae = /\s/g, je = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Me = /^rgb\(/, Ne = /^(\s+)?$/, Pe = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Fe = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, E = /[\s,]+/, Ie = /[MLHVCSQTAZ]/i;
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/class.js
function Le() {
	let e = this.attr("class");
	return e == null ? [] : e.trim().split(E);
}
function Re(e) {
	return this.classes().indexOf(e) !== -1;
}
function ze(e) {
	if (!this.hasClass(e)) {
		let t = this.classes();
		t.push(e), this.attr("class", t.join(" "));
	}
	return this;
}
function Be(e) {
	return this.hasClass(e) && this.attr("class", this.classes().filter(function(t) {
		return t !== e;
	}).join(" ")), this;
}
function Ve(e) {
	return this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
}
i("Dom", {
	classes: Le,
	hasClass: Re,
	addClass: ze,
	removeClass: Be,
	toggleClass: Ve
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/css.js
function He(e, t) {
	let n = {};
	if (arguments.length === 0) return this.node.style.cssText.split(/\s*;\s*/).filter(function(e) {
		return !!e.length;
	}).forEach(function(e) {
		let t = e.split(/\s*:\s*/);
		n[t[0]] = t[1];
	}), n;
	if (arguments.length < 2) {
		if (Array.isArray(e)) {
			for (let t of e) {
				let e = t;
				n[t] = this.node.style.getPropertyValue(e);
			}
			return n;
		}
		if (typeof e == "string") return this.node.style.getPropertyValue(e);
		if (typeof e == "object") for (let t in e) this.node.style.setProperty(t, e[t] == null || Ne.test(e[t]) ? "" : e[t]);
	}
	return arguments.length === 2 && this.node.style.setProperty(e, t == null || Ne.test(t) ? "" : t), this;
}
function Ue() {
	return this.css("display", "");
}
function We() {
	return this.css("display", "none");
}
function Ge() {
	return this.css("display") !== "none";
}
i("Dom", {
	css: He,
	show: Ue,
	hide: We,
	visible: Ge
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/data.js
function Ke(e, t, n) {
	if (e == null) return this.data(c(l(this.node.attributes, (e) => e.nodeName.indexOf("data-") === 0), (e) => e.nodeName.slice(5)));
	if (e instanceof Array) {
		let t = {};
		for (let n of e) t[n] = this.data(n);
		return t;
	} else if (typeof e == "object") for (t in e) this.data(t, e[t]);
	else if (arguments.length < 2) try {
		return JSON.parse(this.attr("data-" + e));
	} catch {
		return this.attr("data-" + e);
	}
	else this.attr("data-" + e, t === null ? null : n === !0 || typeof t == "string" || typeof t == "number" ? t : JSON.stringify(t));
	return this;
}
i("Dom", { data: Ke });
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js
function qe(e, t) {
	if (typeof arguments[0] == "object") for (let t in e) this.remember(t, e[t]);
	else if (arguments.length === 1) return this.memory()[e];
	else this.memory()[e] = t;
	return this;
}
function Je() {
	if (arguments.length === 0) this._memory = {};
	else for (let e = arguments.length - 1; e >= 0; e--) delete this.memory()[arguments[e]];
	return this;
}
function Ye() {
	return this._memory = this._memory || {};
}
i("Dom", {
	remember: qe,
	forget: Je,
	memory: Ye
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/Color.js
function Xe(e) {
	return e.length === 4 ? [
		"#",
		e.substring(1, 2),
		e.substring(1, 2),
		e.substring(2, 3),
		e.substring(2, 3),
		e.substring(3, 4),
		e.substring(3, 4)
	].join("") : e;
}
function Ze(e) {
	let t = Math.max(0, Math.min(255, Math.round(e))).toString(16);
	return t.length === 1 ? "0" + t : t;
}
function Qe(e, t) {
	for (let n = t.length; n--;) if (e[t[n]] == null) return !1;
	return !0;
}
function $e(e, t) {
	let n = Qe(e, "rgb") ? {
		_a: e.r,
		_b: e.g,
		_c: e.b,
		_d: 0,
		space: "rgb"
	} : Qe(e, "xyz") ? {
		_a: e.x,
		_b: e.y,
		_c: e.z,
		_d: 0,
		space: "xyz"
	} : Qe(e, "hsl") ? {
		_a: e.h,
		_b: e.s,
		_c: e.l,
		_d: 0,
		space: "hsl"
	} : Qe(e, "lab") ? {
		_a: e.l,
		_b: e.a,
		_c: e.b,
		_d: 0,
		space: "lab"
	} : Qe(e, "lch") ? {
		_a: e.l,
		_b: e.c,
		_c: e.h,
		_d: 0,
		space: "lch"
	} : Qe(e, "cmyk") ? {
		_a: e.c,
		_b: e.m,
		_c: e.y,
		_d: e.k,
		space: "cmyk"
	} : {
		_a: 0,
		_b: 0,
		_c: 0,
		space: "rgb"
	};
	return n.space = t || n.space, n;
}
function et(e) {
	return e === "lab" || e === "xyz" || e === "lch";
}
function tt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
var D = class e {
	constructor(...e) {
		this.init(...e);
	}
	static isColor(t) {
		return t && (t instanceof e || this.isRgb(t) || this.test(t));
	}
	static isRgb(e) {
		return e && typeof e.r == "number" && typeof e.g == "number" && typeof e.b == "number";
	}
	static random(t = "vibrant", n) {
		let { random: r, round: i, sin: a, PI: o } = Math;
		if (t === "vibrant") {
			let t = 24 * r() + 57, n = 38 * r() + 45, i = 360 * r();
			return new e(t, n, i, "lch");
		} else if (t === "sine") {
			n ??= r();
			let t = i(80 * a(2 * o * n / .5 + .01) + 150), s = i(50 * a(2 * o * n / .5 + 4.6) + 200), c = i(100 * a(2 * o * n / .5 + 2.3) + 150);
			return new e(t, s, c);
		} else if (t === "pastel") {
			let t = 8 * r() + 86, n = 17 * r() + 9, i = 360 * r();
			return new e(t, n, i, "lch");
		} else if (t === "dark") {
			let t = 10 + 10 * r(), n = 50 * r() + 86, i = 360 * r();
			return new e(t, n, i, "lch");
		} else if (t === "rgb") {
			let t = 255 * r(), n = 255 * r(), i = 255 * r();
			return new e(t, n, i);
		} else if (t === "lab") {
			let t = 100 * r(), n = 256 * r() - 128, i = 256 * r() - 128;
			return new e(t, n, i, "lab");
		} else if (t === "grey") {
			let t = 255 * r();
			return new e(t, t, t);
		} else throw Error("Unsupported random color mode");
	}
	static test(e) {
		return typeof e == "string" && (je.test(e) || Me.test(e));
	}
	cmyk() {
		let { _a: t, _b: n, _c: r } = this.rgb(), [i, a, o] = [
			t,
			n,
			r
		].map((e) => e / 255), s = Math.min(1 - i, 1 - a, 1 - o);
		if (s === 1) return new e(0, 0, 0, 1, "cmyk");
		let c = (1 - i - s) / (1 - s), l = (1 - a - s) / (1 - s), u = (1 - o - s) / (1 - s);
		return new e(c, l, u, s, "cmyk");
	}
	hsl() {
		let { _a: t, _b: n, _c: r } = this.rgb(), [i, a, o] = [
			t,
			n,
			r
		].map((e) => e / 255), s = Math.max(i, a, o), c = Math.min(i, a, o), l = (s + c) / 2, u = s === c, d = s - c, f = u ? 0 : l > .5 ? d / (2 - s - c) : d / (s + c), p = u ? 0 : s === i ? ((a - o) / d + (a < o ? 6 : 0)) / 6 : s === a ? ((o - i) / d + 2) / 6 : s === o ? ((i - a) / d + 4) / 6 : 0;
		return new e(360 * p, 100 * f, 100 * l, "hsl");
	}
	init(e = 0, t = 0, n = 0, r = 0, i = "rgb") {
		if (e ||= 0, this.space) for (let e in this.space) delete this[this.space[e]];
		if (typeof e == "number") i = typeof r == "string" ? r : i, r = typeof r == "string" ? 0 : r, Object.assign(this, {
			_a: e,
			_b: t,
			_c: n,
			_d: r,
			space: i
		});
		else if (e instanceof Array) this.space = t || (typeof e[3] == "string" ? e[3] : e[4]) || "rgb", Object.assign(this, {
			_a: e[0],
			_b: e[1],
			_c: e[2],
			_d: e[3] || 0
		});
		else if (e instanceof Object) {
			let n = $e(e, t);
			Object.assign(this, n);
		} else if (typeof e == "string") if (Me.test(e)) {
			let t = e.replace(Ae, ""), [n, r, i] = De.exec(t).slice(1, 4).map((e) => parseInt(e));
			Object.assign(this, {
				_a: n,
				_b: r,
				_c: i,
				_d: 0,
				space: "rgb"
			});
		} else if (je.test(e)) {
			let [, t, n, r] = Ee.exec(Xe(e)).map((e) => parseInt(e, 16));
			Object.assign(this, {
				_a: t,
				_b: n,
				_c: r,
				_d: 0,
				space: "rgb"
			});
		} else throw Error("Unsupported string format, can't construct Color");
		let { _a: a, _b: o, _c: s, _d: c } = this, l = this.space === "rgb" ? {
			r: a,
			g: o,
			b: s
		} : this.space === "xyz" ? {
			x: a,
			y: o,
			z: s
		} : this.space === "hsl" ? {
			h: a,
			s: o,
			l: s
		} : this.space === "lab" ? {
			l: a,
			a: o,
			b: s
		} : this.space === "lch" ? {
			l: a,
			c: o,
			h: s
		} : this.space === "cmyk" ? {
			c: a,
			m: o,
			y: s,
			k: c
		} : {};
		Object.assign(this, l);
	}
	lab() {
		let { x: t, y: n, z: r } = this.xyz(), i = 116 * n - 16, a = 500 * (t - n), o = 200 * (n - r);
		return new e(i, a, o, "lab");
	}
	lch() {
		let { l: t, a: n, b: r } = this.lab(), i = Math.sqrt(n ** 2 + r ** 2), a = 180 * Math.atan2(r, n) / Math.PI;
		return a < 0 && (a *= -1, a = 360 - a), new e(t, i, a, "lch");
	}
	rgb() {
		if (this.space === "rgb") return this;
		if (et(this.space)) {
			let { x: t, y: n, z: r } = this;
			if (this.space === "lab" || this.space === "lch") {
				let { l: e, a: i, b: a } = this;
				if (this.space === "lch") {
					let { c: e, h: t } = this, n = Math.PI / 180;
					i = e * Math.cos(n * t), a = e * Math.sin(n * t);
				}
				let o = (e + 16) / 116, s = i / 500 + o, c = o - a / 200, l = 16 / 116, u = .008856, d = 7.787;
				t = .95047 * (s ** 3 > u ? s ** 3 : (s - l) / d), n = 1 * (o ** 3 > u ? o ** 3 : (o - l) / d), r = 1.08883 * (c ** 3 > u ? c ** 3 : (c - l) / d);
			}
			let i = t * 3.2406 + n * -1.5372 + r * -.4986, a = t * -.9689 + n * 1.8758 + r * .0415, o = t * .0557 + n * -.204 + r * 1.057, s = Math.pow, c = .0031308, l = i > c ? 1.055 * s(i, 1 / 2.4) - .055 : 12.92 * i, u = a > c ? 1.055 * s(a, 1 / 2.4) - .055 : 12.92 * a, d = o > c ? 1.055 * s(o, 1 / 2.4) - .055 : 12.92 * o;
			return new e(255 * l, 255 * u, 255 * d);
		} else if (this.space === "hsl") {
			let { h: t, s: n, l: r } = this;
			if (t /= 360, n /= 100, r /= 100, n === 0) return r *= 255, new e(r, r, r);
			let i = r < .5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i, o = 255 * tt(a, i, t + 1 / 3), s = 255 * tt(a, i, t), c = 255 * tt(a, i, t - 1 / 3);
			return new e(o, s, c);
		} else if (this.space === "cmyk") {
			let { c: t, m: n, y: r, k: i } = this, a = 255 * (1 - Math.min(1, t * (1 - i) + i)), o = 255 * (1 - Math.min(1, n * (1 - i) + i)), s = 255 * (1 - Math.min(1, r * (1 - i) + i));
			return new e(a, o, s);
		} else return this;
	}
	toArray() {
		let { _a: e, _b: t, _c: n, _d: r, space: i } = this;
		return [
			e,
			t,
			n,
			r,
			i
		];
	}
	toHex() {
		let [e, t, n] = this._clamped().map(Ze);
		return `#${e}${t}${n}`;
	}
	toRgb() {
		let [e, t, n] = this._clamped();
		return `rgb(${e},${t},${n})`;
	}
	toString() {
		return this.toHex();
	}
	xyz() {
		let { _a: t, _b: n, _c: r } = this.rgb(), [i, a, o] = [
			t,
			n,
			r
		].map((e) => e / 255), s = i > .04045 ? ((i + .055) / 1.055) ** 2.4 : i / 12.92, c = a > .04045 ? ((a + .055) / 1.055) ** 2.4 : a / 12.92, l = o > .04045 ? ((o + .055) / 1.055) ** 2.4 : o / 12.92, u = (s * .4124 + c * .3576 + l * .1805) / .95047, d = (s * .2126 + c * .7152 + l * .0722) / 1, f = (s * .0193 + c * .1192 + l * .9505) / 1.08883, p = u > .008856 ? u ** (1 / 3) : 7.787 * u + 16 / 116, m = d > .008856 ? d ** (1 / 3) : 7.787 * d + 16 / 116, h = f > .008856 ? f ** (1 / 3) : 7.787 * f + 16 / 116;
		return new e(p, m, h, "xyz");
	}
	_clamped() {
		let { _a: e, _b: t, _c: n } = this.rgb(), { max: r, min: i, round: a } = Math;
		return [
			e,
			t,
			n
		].map((e) => r(0, i(a(e), 255)));
	}
}, O = class e {
	constructor(...e) {
		this.init(...e);
	}
	clone() {
		return new e(this);
	}
	init(e, t) {
		let n = {
			x: 0,
			y: 0
		}, r = Array.isArray(e) ? {
			x: e[0],
			y: e[1]
		} : typeof e == "object" ? {
			x: e.x,
			y: e.y
		} : {
			x: e,
			y: t
		};
		return this.x = r.x == null ? n.x : r.x, this.y = r.y == null ? n.y : r.y, this;
	}
	toArray() {
		return [this.x, this.y];
	}
	transform(e) {
		return this.clone().transformO(e);
	}
	transformO(e) {
		k.isMatrixLike(e) || (e = new k(e));
		let { x: t, y: n } = this;
		return this.x = e.a * t + e.c * n + e.e, this.y = e.b * t + e.d * n + e.f, this;
	}
};
function nt(e, t) {
	return new O(e, t).transformO(this.screenCTM().inverseO());
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/Matrix.js
function rt(e, t, n) {
	return Math.abs(t - e) < (n || 1e-6);
}
var k = class e {
	constructor(...e) {
		this.init(...e);
	}
	static formatTransforms(e) {
		let t = e.flip === "both" || e.flip === !0, n = e.flip && (t || e.flip === "x") ? -1 : 1, r = e.flip && (t || e.flip === "y") ? -1 : 1, i = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, a = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, o = e.scale && e.scale.length ? e.scale[0] * n : isFinite(e.scale) ? e.scale * n : isFinite(e.scaleX) ? e.scaleX * n : n, s = e.scale && e.scale.length ? e.scale[1] * r : isFinite(e.scale) ? e.scale * r : isFinite(e.scaleY) ? e.scaleY * r : r, c = e.shear || 0, l = e.rotate || e.theta || 0, u = new O(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), d = u.x, f = u.y, p = new O(e.position || e.px || e.positionX || NaN, e.py || e.positionY || NaN), m = p.x, h = p.y, g = new O(e.translate || e.tx || e.translateX, e.ty || e.translateY), _ = g.x, v = g.y, ee = new O(e.relative || e.rx || e.relativeX, e.ry || e.relativeY);
		return {
			scaleX: o,
			scaleY: s,
			skewX: i,
			skewY: a,
			shear: c,
			theta: l,
			rx: ee.x,
			ry: ee.y,
			tx: _,
			ty: v,
			ox: d,
			oy: f,
			px: m,
			py: h
		};
	}
	static fromArray(e) {
		return {
			a: e[0],
			b: e[1],
			c: e[2],
			d: e[3],
			e: e[4],
			f: e[5]
		};
	}
	static isMatrixLike(e) {
		return e.a != null || e.b != null || e.c != null || e.d != null || e.e != null || e.f != null;
	}
	static matrixMultiply(e, t, n) {
		let r = e.a * t.a + e.c * t.b, i = e.b * t.a + e.d * t.b, a = e.a * t.c + e.c * t.d, o = e.b * t.c + e.d * t.d, s = e.e + e.a * t.e + e.c * t.f, c = e.f + e.b * t.e + e.d * t.f;
		return n.a = r, n.b = i, n.c = a, n.d = o, n.e = s, n.f = c, n;
	}
	around(e, t, n) {
		return this.clone().aroundO(e, t, n);
	}
	aroundO(e, t, n) {
		let r = e || 0, i = t || 0;
		return this.translateO(-r, -i).lmultiplyO(n).translateO(r, i);
	}
	clone() {
		return new e(this);
	}
	decompose(e = 0, t = 0) {
		let n = this.a, r = this.b, i = this.c, a = this.d, o = this.e, s = this.f, c = n * a - r * i, l = c > 0 ? 1 : -1, u = l * Math.sqrt(n * n + r * r), d = Math.atan2(l * r, l * n), f = 180 / Math.PI * d, p = Math.cos(d), m = Math.sin(d), h = (n * i + r * a) / c, g = i * u / (h * n - r) || a * u / (h * r + n);
		return {
			scaleX: u,
			scaleY: g,
			shear: h,
			rotate: f,
			translateX: o - e + e * p * u + t * (h * p * u - m * g),
			translateY: s - t + e * m * u + t * (h * m * u + p * g),
			originX: e,
			originY: t,
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
			e: this.e,
			f: this.f
		};
	}
	equals(t) {
		if (t === this) return !0;
		let n = new e(t);
		return rt(this.a, n.a) && rt(this.b, n.b) && rt(this.c, n.c) && rt(this.d, n.d) && rt(this.e, n.e) && rt(this.f, n.f);
	}
	flip(e, t) {
		return this.clone().flipO(e, t);
	}
	flipO(e, t) {
		return e === "x" ? this.scaleO(-1, 1, t, 0) : e === "y" ? this.scaleO(1, -1, 0, t) : this.scaleO(-1, -1, e, t || e);
	}
	init(t) {
		let n = e.fromArray([
			1,
			0,
			0,
			1,
			0,
			0
		]);
		return t = t instanceof N ? t.matrixify() : typeof t == "string" ? e.fromArray(t.split(E).map(parseFloat)) : Array.isArray(t) ? e.fromArray(t) : typeof t == "object" && e.isMatrixLike(t) ? t : typeof t == "object" ? new e().transform(t) : arguments.length === 6 ? e.fromArray([].slice.call(arguments)) : n, this.a = t.a == null ? n.a : t.a, this.b = t.b == null ? n.b : t.b, this.c = t.c == null ? n.c : t.c, this.d = t.d == null ? n.d : t.d, this.e = t.e == null ? n.e : t.e, this.f = t.f == null ? n.f : t.f, this;
	}
	inverse() {
		return this.clone().inverseO();
	}
	inverseO() {
		let e = this.a, t = this.b, n = this.c, r = this.d, i = this.e, a = this.f, o = e * r - t * n;
		if (!o) throw Error("Cannot invert " + this);
		let s = r / o, c = -t / o, l = -n / o, u = e / o, d = -(s * i + l * a), f = -(c * i + u * a);
		return this.a = s, this.b = c, this.c = l, this.d = u, this.e = d, this.f = f, this;
	}
	lmultiply(e) {
		return this.clone().lmultiplyO(e);
	}
	lmultiplyO(t) {
		let n = this, r = t instanceof e ? t : new e(t);
		return e.matrixMultiply(r, n, this);
	}
	multiply(e) {
		return this.clone().multiplyO(e);
	}
	multiplyO(t) {
		let n = this, r = t instanceof e ? t : new e(t);
		return e.matrixMultiply(n, r, this);
	}
	rotate(e, t, n) {
		return this.clone().rotateO(e, t, n);
	}
	rotateO(e, t = 0, n = 0) {
		e = u(e);
		let r = Math.cos(e), i = Math.sin(e), { a, b: o, c: s, d: c, e: l, f: d } = this;
		return this.a = a * r - o * i, this.b = o * r + a * i, this.c = s * r - c * i, this.d = c * r + s * i, this.e = l * r - d * i + n * i - t * r + t, this.f = d * r + l * i - t * i - n * r + n, this;
	}
	scale() {
		return this.clone().scaleO(...arguments);
	}
	scaleO(e, t = e, n = 0, r = 0) {
		arguments.length === 3 && (r = n, n = t, t = e);
		let { a: i, b: a, c: o, d: s, e: c, f: l } = this;
		return this.a = i * e, this.b = a * t, this.c = o * e, this.d = s * t, this.e = c * e - n * e + n, this.f = l * t - r * t + r, this;
	}
	shear(e, t, n) {
		return this.clone().shearO(e, t, n);
	}
	shearO(e, t = 0, n = 0) {
		let { a: r, b: i, c: a, d: o, e: s, f: c } = this;
		return this.a = r + i * e, this.c = a + o * e, this.e = s + c * e - n * e, this;
	}
	skew() {
		return this.clone().skewO(...arguments);
	}
	skewO(e, t = e, n = 0, r = 0) {
		arguments.length === 3 && (r = n, n = t, t = e), e = u(e), t = u(t);
		let i = Math.tan(e), a = Math.tan(t), { a: o, b: s, c, d: l, e: d, f } = this;
		return this.a = o + s * i, this.b = s + o * a, this.c = c + l * i, this.d = l + c * a, this.e = d + f * i - r * i, this.f = f + d * a - n * a, this;
	}
	skewX(e, t, n) {
		return this.skew(e, 0, t, n);
	}
	skewY(e, t, n) {
		return this.skew(0, e, t, n);
	}
	toArray() {
		return [
			this.a,
			this.b,
			this.c,
			this.d,
			this.e,
			this.f
		];
	}
	toString() {
		return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
	}
	transform(t) {
		if (e.isMatrixLike(t)) return new e(t).multiplyO(this);
		let n = e.formatTransforms(t), r = this, { x: i, y: a } = new O(n.ox, n.oy).transform(r), o = new e().translateO(n.rx, n.ry).lmultiplyO(r).translateO(-i, -a).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(i, a);
		if (isFinite(n.px) || isFinite(n.py)) {
			let e = new O(i, a).transform(o), t = isFinite(n.px) ? n.px - e.x : 0, r = isFinite(n.py) ? n.py - e.y : 0;
			o.translateO(t, r);
		}
		return o.translateO(n.tx, n.ty), o;
	}
	translate(e, t) {
		return this.clone().translateO(e, t);
	}
	translateO(e, t) {
		return this.e += e || 0, this.f += t || 0, this;
	}
	valueOf() {
		return {
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
			e: this.e,
			f: this.f
		};
	}
};
function it() {
	return new k(this.node.getCTM());
}
function at() {
	try {
		if (typeof this.isRoot == "function" && !this.isRoot()) {
			let e = this.rect(1, 1), t = e.node.getScreenCTM();
			return e.remove(), new k(t);
		}
		return new k(this.node.getScreenCTM());
	} catch {
		return console.warn(`Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`), new k();
	}
}
C(k, "Matrix");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/parser.js
function ot() {
	if (!ot.nodes) {
		let e = b().size(2, 0);
		e.node.style.cssText = [
			"opacity: 0",
			"position: absolute",
			"left: -100%",
			"top: -100%",
			"overflow: hidden"
		].join(";"), e.attr("focusable", "false"), e.attr("aria-hidden", "true"), ot.nodes = {
			svg: e,
			path: e.path().node
		};
	}
	if (!ot.nodes.svg.node.parentNode) {
		let e = y.document.body || y.document.documentElement;
		ot.nodes.svg.addTo(e);
	}
	return ot.nodes;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/Box.js
function st(e) {
	return !e.width && !e.height && !e.x && !e.y;
}
function ct(e) {
	return e === y.document || (y.document.documentElement.contains || function(e) {
		for (; e.parentNode;) e = e.parentNode;
		return e === y.document;
	}).call(y.document.documentElement, e);
}
var A = class e {
	constructor(...e) {
		this.init(...e);
	}
	addOffset() {
		return this.x += y.window.pageXOffset, this.y += y.window.pageYOffset, new e(this);
	}
	init(e) {
		return e = typeof e == "string" ? e.split(E).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [
			e.left == null ? e.x : e.left,
			e.top == null ? e.y : e.top,
			e.width,
			e.height
		] : arguments.length === 4 ? [].slice.call(arguments) : [
			0,
			0,
			0,
			0
		], this.x = e[0] || 0, this.y = e[1] || 0, this.width = this.w = e[2] || 0, this.height = this.h = e[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
	}
	isNulled() {
		return st(this);
	}
	merge(t) {
		let n = Math.min(this.x, t.x), r = Math.min(this.y, t.y), i = Math.max(this.x + this.width, t.x + t.width) - n, a = Math.max(this.y + this.height, t.y + t.height) - r;
		return new e(n, r, i, a);
	}
	toArray() {
		return [
			this.x,
			this.y,
			this.width,
			this.height
		];
	}
	toString() {
		return this.x + " " + this.y + " " + this.width + " " + this.height;
	}
	transform(t) {
		t instanceof k || (t = new k(t));
		let n = Infinity, r = -Infinity, i = Infinity, a = -Infinity;
		return [
			new O(this.x, this.y),
			new O(this.x2, this.y),
			new O(this.x, this.y2),
			new O(this.x2, this.y2)
		].forEach(function(e) {
			e = e.transform(t), n = Math.min(n, e.x), r = Math.max(r, e.x), i = Math.min(i, e.y), a = Math.max(a, e.y);
		}), new e(n, i, r - n, a - i);
	}
};
function lt(e, t, n) {
	let r;
	try {
		if (r = t(e.node), st(r) && !ct(e.node)) throw Error("Element not in the dom");
	} catch {
		r = n(e);
	}
	return r;
}
function ut() {
	return new A(lt(this, (e) => e.getBBox(), (e) => {
		try {
			let t = e.clone().addTo(ot().svg).show(), n = t.node.getBBox();
			return t.remove(), n;
		} catch (t) {
			throw Error(`Getting bbox of element "${e.node.nodeName}" is not possible: ${t.toString()}`);
		}
	}));
}
function dt(e) {
	let t = new A(lt(this, (e) => e.getBoundingClientRect(), (e) => {
		throw Error(`Getting rbox of element "${e.node.nodeName}" is not possible`);
	}));
	return e ? t.transform(e.screenCTM().inverseO()) : t.addOffset();
}
function ft(e, t) {
	let n = this.bbox();
	return e > n.x && t > n.y && e < n.x + n.width && t < n.y + n.height;
}
i({ viewbox: {
	viewbox(e, t, n, r) {
		return e == null ? new A(this.attr("viewBox")) : this.attr("viewBox", new A(e, t, n, r));
	},
	zoom(e, t) {
		let { width: n, height: r } = this.attr(["width", "height"]);
		if ((!n && !r || typeof n == "string" || typeof r == "string") && (n = this.node.clientWidth, r = this.node.clientHeight), !n || !r) throw Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
		let i = this.viewbox(), a = n / i.width, o = r / i.height, s = Math.min(a, o);
		if (e == null) return s;
		let c = s / e;
		c === Infinity && (c = (2 ** 53 - 1) / 100), t ||= new O(n / 2 / a + i.x, r / 2 / o + i.y);
		let l = new A(i).transform(new k({
			scale: c,
			origin: t
		}));
		return this.viewbox(l);
	}
} }), C(A, "Box");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/List.js
var pt = class extends Array {
	constructor(e = [], ...t) {
		if (super(e, ...t), typeof e == "number") return this;
		this.length = 0, this.push(...e);
	}
};
w([pt], {
	each(e, ...t) {
		return typeof e == "function" ? this.map((t, n, r) => e.call(t, t, n, r)) : this.map((n) => n[e](...t));
	},
	toArray() {
		return Array.prototype.concat.apply([], this);
	}
});
var mt = [
	"toArray",
	"constructor",
	"each"
];
pt.extend = function(e) {
	e = e.reduce((e, t) => mt.includes(t) || t[0] === "_" ? e : (t in Array.prototype && (e["$" + t] = Array.prototype[t]), e[t] = function(...e) {
		return this.each(t, ...e);
	}, e), {}), w([pt], e);
};
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/selector.js
function ht(e, t) {
	return new pt(c((t || y.document).querySelectorAll(e), function(e) {
		return S(e);
	}));
}
function gt(e) {
	return ht(e, this.node);
}
function _t(e) {
	return S(this.node.querySelector(e));
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/event.js
var vt = 0, yt = {};
function bt(e) {
	let t = e.getEventHolder();
	return t === y.window && (t = yt), t.events ||= {}, t.events;
}
function xt(e) {
	return e.getEventTarget();
}
function St(e) {
	let t = e.getEventHolder();
	t === y.window && (t = yt), t.events &&= {};
}
function Ct(e, t, n, r, i) {
	let a = n.bind(r || e), o = b(e), s = bt(o), c = xt(o);
	t = Array.isArray(t) ? t : t.split(E), n._svgjsListenerId ||= ++vt, t.forEach(function(e) {
		let t = e.split(".")[0], r = e.split(".")[1] || "*";
		s[t] = s[t] || {}, s[t][r] = s[t][r] || {}, s[t][r][n._svgjsListenerId] = a, c.addEventListener(t, a, i || !1);
	});
}
function j(e, t, n, r) {
	let i = b(e), a = bt(i), o = xt(i);
	typeof n == "function" && (n = n._svgjsListenerId, !n) || (t = Array.isArray(t) ? t : (t || "").split(E), t.forEach(function(e) {
		let t = e && e.split(".")[0], s = e && e.split(".")[1], c, l;
		if (n) a[t] && a[t][s || "*"] && (o.removeEventListener(t, a[t][s || "*"][n], r || !1), delete a[t][s || "*"][n]);
		else if (t && s) {
			if (a[t] && a[t][s]) {
				for (l in a[t][s]) j(o, [t, s].join("."), l);
				delete a[t][s];
			}
		} else if (s) for (e in a) for (c in a[e]) s === c && j(o, [e, s].join("."));
		else if (t) {
			if (a[t]) {
				for (c in a[t]) j(o, [t, c].join("."));
				delete a[t];
			}
		} else {
			for (e in a) j(o, e);
			St(i);
		}
	}));
}
function wt(e, t, n, r) {
	let i = xt(e);
	return t instanceof y.window.Event || (t = new y.window.CustomEvent(t, {
		detail: n,
		cancelable: !0,
		...r
	})), i.dispatchEvent(t), t;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/EventTarget.js
var Tt = class extends ie {
	addEventListener() {}
	dispatch(e, t, n) {
		return wt(this, e, t, n);
	}
	dispatchEvent(e) {
		let t = this.getEventHolder().events;
		if (!t) return !0;
		let n = t[e.type];
		for (let t in n) for (let r in n[t]) n[t][r](e);
		return !e.defaultPrevented;
	}
	fire(e, t, n) {
		return this.dispatch(e, t, n), this;
	}
	getEventHolder() {
		return this;
	}
	getEventTarget() {
		return this;
	}
	off(e, t, n) {
		return j(this, e, t, n), this;
	}
	on(e, t, n, r) {
		return Ct(this, e, t, n, r), this;
	}
	removeEventListener() {}
};
C(Tt, "EventTarget");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js
function Et() {}
var Dt = {
	duration: 400,
	ease: ">",
	delay: 0
}, Ot = {
	"fill-opacity": 1,
	"stroke-opacity": 1,
	"stroke-width": 0,
	"stroke-linejoin": "miter",
	"stroke-linecap": "butt",
	fill: "#000000",
	stroke: "#000000",
	opacity: 1,
	x: 0,
	y: 0,
	cx: 0,
	cy: 0,
	width: 0,
	height: 0,
	r: 0,
	rx: 0,
	ry: 0,
	offset: 0,
	"stop-opacity": 1,
	"stop-color": "#000000",
	"text-anchor": "start"
}, kt = class extends Array {
	constructor(...e) {
		super(...e), this.init(...e);
	}
	clone() {
		return new this.constructor(this);
	}
	init(e) {
		return typeof e == "number" ? this : (this.length = 0, this.push(...this.parse(e)), this);
	}
	parse(e = []) {
		return e instanceof Array ? e : e.trim().split(E).map(parseFloat);
	}
	toArray() {
		return Array.prototype.concat.apply([], this);
	}
	toSet() {
		return new Set(this);
	}
	toString() {
		return this.join(" ");
	}
	valueOf() {
		let e = [];
		return e.push(...this), e;
	}
}, M = class e {
	constructor(...e) {
		this.init(...e);
	}
	convert(t) {
		return new e(this.value, t);
	}
	divide(t) {
		return t = new e(t), new e(this / t, this.unit || t.unit);
	}
	init(t, n) {
		return n = Array.isArray(t) ? t[1] : n, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = n || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (n = t.match(Te), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : t instanceof e && (this.value = t.valueOf(), this.unit = t.unit), this;
	}
	minus(t) {
		return t = new e(t), new e(this - t, this.unit || t.unit);
	}
	plus(t) {
		return t = new e(t), new e(this + t, this.unit || t.unit);
	}
	times(t) {
		return t = new e(t), new e(this * t, this.unit || t.unit);
	}
	toArray() {
		return [this.value, this.unit];
	}
	toJSON() {
		return this.toString();
	}
	toString() {
		return (this.unit === "%" ? ~~(this.value * 1e8) / 1e6 : this.unit === "s" ? this.value / 1e3 : this.value) + this.unit;
	}
	valueOf() {
		return this.value;
	}
}, At = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"bgcolor",
	"stop-color",
	"flood-color",
	"lighting-color"
]), jt = [];
function Mt(e) {
	jt.push(e);
}
function Nt(e, t, n) {
	if (e == null) {
		e = {}, t = this.node.attributes;
		for (let n of t) e[n.nodeName] = Pe.test(n.nodeValue) ? parseFloat(n.nodeValue) : n.nodeValue;
		return e;
	} else if (e instanceof Array) return e.reduce((e, t) => (e[t] = this.attr(t), e), {});
	else if (typeof e == "object" && e.constructor === Object) for (t in e) this.attr(t, e[t]);
	else if (t === null) this.node.removeAttribute(e);
	else if (t == null) return t = this.node.getAttribute(e), t == null ? Ot[e] : Pe.test(t) ? parseFloat(t) : t;
	else t = jt.reduce((t, n) => n(e, t, this), t), typeof t == "number" ? t = new M(t) : At.has(e) && D.isColor(t) ? t = new D(t) : t.constructor === Array && (t = new kt(t)), e === "leading" ? this.leading && this.leading(t) : typeof n == "string" ? this.node.setAttributeNS(n, e, t.toString()) : this.node.setAttribute(e, t.toString()), this.rebuild && (e === "font-size" || e === "x") && this.rebuild();
	return this;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Dom.js
var Pt = class e extends Tt {
	constructor(e, t) {
		super(), this.node = e, this.type = e.nodeName, t && e !== t && this.attr(t);
	}
	add(e, t) {
		return e = b(e), e.removeNamespace && this.node instanceof y.window.SVGElement && e.removeNamespace(), t == null ? this.node.appendChild(e.node) : e.node !== this.node.childNodes[t] && this.node.insertBefore(e.node, this.node.childNodes[t]), this;
	}
	addTo(e, t) {
		return b(e).put(this, t);
	}
	children() {
		return new pt(c(this.node.children, function(e) {
			return S(e);
		}));
	}
	clear() {
		for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);
		return this;
	}
	clone(e = !0, t = !0) {
		this.writeDataToDom();
		let n = this.node.cloneNode(e);
		return t && (n = fe(n)), new this.constructor(n);
	}
	each(e, t) {
		let n = this.children(), r, i;
		for (r = 0, i = n.length; r < i; r++) e.apply(n[r], [r, n]), t && n[r].each(e, t);
		return this;
	}
	element(t, n) {
		return this.put(new e(se(t), n));
	}
	first() {
		return S(this.node.firstChild);
	}
	get(e) {
		return S(this.node.childNodes[e]);
	}
	getEventHolder() {
		return this.node;
	}
	getEventTarget() {
		return this.node;
	}
	has(e) {
		return this.index(e) >= 0;
	}
	html(e, t) {
		return this.xml(e, t, ee);
	}
	id(e) {
		return e === void 0 && !this.node.id && (this.node.id = de(this.type)), this.attr("id", e);
	}
	index(e) {
		return [].slice.call(this.node.childNodes).indexOf(e.node);
	}
	last() {
		return S(this.node.lastChild);
	}
	matches(e) {
		let t = this.node, n = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector || null;
		return n && n.call(t, e);
	}
	parent(e) {
		let t = this;
		if (!t.node.parentNode) return null;
		if (t = S(t.node.parentNode), !e) return t;
		do
			if (typeof e == "string" ? t.matches(e) : t instanceof e) return t;
		while (t = S(t.node.parentNode));
		return t;
	}
	put(e, t) {
		return e = b(e), this.add(e, t), e;
	}
	putIn(e, t) {
		return b(e).add(this, t);
	}
	remove() {
		return this.parent() && this.parent().removeElement(this), this;
	}
	removeElement(e) {
		return this.node.removeChild(e.node), this;
	}
	replace(e) {
		return e = b(e), this.node.parentNode && this.node.parentNode.replaceChild(e.node, this.node), e;
	}
	round(e = 2, t = null) {
		let n = 10 ** e, r = this.attr(t);
		for (let e in r) typeof r[e] == "number" && (r[e] = Math.round(r[e] * n) / n);
		return this.attr(r), this;
	}
	svg(e, t) {
		return this.xml(e, t, v);
	}
	toString() {
		return this.id();
	}
	words(e) {
		return this.node.textContent = e, this;
	}
	wrap(e) {
		let t = this.parent();
		if (!t) return this.addTo(e);
		let n = t.index(this);
		return t.put(e, n).put(this);
	}
	writeDataToDom() {
		return this.each(function() {
			this.writeDataToDom();
		}), this;
	}
	xml(e, t, n) {
		if (typeof e == "boolean" && (n = t, t = e, e = null), e == null || typeof e == "function") {
			t ??= !0, this.writeDataToDom();
			let n = this;
			if (e != null) {
				if (n = S(n.node.cloneNode(!0)), t) {
					let t = e(n);
					if (n = t || n, t === !1) return "";
				}
				n.each(function() {
					let t = e(this), n = t || this;
					t === !1 ? this.remove() : t && this !== n && this.replace(n);
				}, !0);
			}
			return t ? n.node.outerHTML : n.node.innerHTML;
		}
		t ??= !1;
		let r = se("wrapper", n), i = y.document.createDocumentFragment();
		r.innerHTML = e;
		for (let e = r.children.length; e--;) i.appendChild(r.firstElementChild);
		let a = this.parent();
		return t ? this.replace(i) && a : this.add(i);
	}
};
w(Pt, {
	attr: Nt,
	find: gt,
	findOne: _t
}), C(Pt, "Dom");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Element.js
var N = class extends Pt {
	constructor(e, t) {
		super(e, t), this.dom = {}, this.node.instance = this, (e.hasAttribute("data-svgjs") || e.hasAttribute("svgjs:data")) && this.setData(JSON.parse(e.getAttribute("data-svgjs")) ?? JSON.parse(e.getAttribute("svgjs:data")) ?? {});
	}
	center(e, t) {
		return this.cx(e).cy(t);
	}
	cx(e) {
		return e == null ? this.x() + this.width() / 2 : this.x(e - this.width() / 2);
	}
	cy(e) {
		return e == null ? this.y() + this.height() / 2 : this.y(e - this.height() / 2);
	}
	defs() {
		let e = this.root();
		return e && e.defs();
	}
	dmove(e, t) {
		return this.dx(e).dy(t);
	}
	dx(e = 0) {
		return this.x(new M(e).plus(this.x()));
	}
	dy(e = 0) {
		return this.y(new M(e).plus(this.y()));
	}
	getEventHolder() {
		return this;
	}
	height(e) {
		return this.attr("height", e);
	}
	move(e, t) {
		return this.x(e).y(t);
	}
	parents(e = this.root()) {
		let t = typeof e == "string";
		t || (e = b(e));
		let n = new pt(), r = this;
		for (; (r = r.parent()) && r.node !== y.document && r.nodeName !== "#document-fragment" && (n.push(r), !(!t && r.node === e.node || t && r.matches(e)));) if (r.node === this.root().node) return null;
		return n;
	}
	reference(e) {
		if (e = this.attr(e), !e) return null;
		let t = (e + "").match(Oe);
		return t ? b(t[1]) : null;
	}
	root() {
		let e = this.parent(le(oe));
		return e && e.root();
	}
	setData(e) {
		return this.dom = e, this;
	}
	size(e, t) {
		let n = p(this, e, t);
		return this.width(new M(n.width)).height(new M(n.height));
	}
	width(e) {
		return this.attr("width", e);
	}
	writeDataToDom() {
		return _(this, this.dom), super.writeDataToDom();
	}
	x(e) {
		return this.attr("x", e);
	}
	y(e) {
		return this.attr("y", e);
	}
};
w(N, {
	bbox: ut,
	rbox: dt,
	inside: ft,
	point: nt,
	ctm: it,
	screenCTM: at
}), C(N, "Element");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js
var Ft = {
	stroke: [
		"color",
		"width",
		"opacity",
		"linecap",
		"linejoin",
		"miterlimit",
		"dasharray",
		"dashoffset"
	],
	fill: [
		"color",
		"opacity",
		"rule"
	],
	prefix: function(e, t) {
		return t === "color" ? e : e + "-" + t;
	}
};
["fill", "stroke"].forEach(function(e) {
	let t = {}, n;
	t[e] = function(t) {
		if (t === void 0) return this.attr(e);
		if (typeof t == "string" || t instanceof D || D.isRgb(t) || t instanceof N) this.attr(e, t);
		else for (n = Ft[e].length - 1; n >= 0; n--) t[Ft[e][n]] != null && this.attr(Ft.prefix(e, Ft[e][n]), t[Ft[e][n]]);
		return this;
	}, i(["Element", "Runner"], t);
}), i(["Element", "Runner"], {
	matrix: function(e, t, n, r, i, a) {
		return e == null ? new k(this) : this.attr("transform", new k(e, t, n, r, i, a));
	},
	rotate: function(e, t, n) {
		return this.transform({
			rotate: e,
			ox: t,
			oy: n
		}, !0);
	},
	skew: function(e, t, n, r) {
		return arguments.length === 1 || arguments.length === 3 ? this.transform({
			skew: e,
			ox: t,
			oy: n
		}, !0) : this.transform({
			skew: [e, t],
			ox: n,
			oy: r
		}, !0);
	},
	shear: function(e, t, n) {
		return this.transform({
			shear: e,
			ox: t,
			oy: n
		}, !0);
	},
	scale: function(e, t, n, r) {
		return arguments.length === 1 || arguments.length === 3 ? this.transform({
			scale: e,
			ox: t,
			oy: n
		}, !0) : this.transform({
			scale: [e, t],
			ox: n,
			oy: r
		}, !0);
	},
	translate: function(e, t) {
		return this.transform({ translate: [e, t] }, !0);
	},
	relative: function(e, t) {
		return this.transform({ relative: [e, t] }, !0);
	},
	flip: function(e = "both", t = "center") {
		return "xybothtrue".indexOf(e) === -1 && (t = e, e = "both"), this.transform({
			flip: e,
			origin: t
		}, !0);
	},
	opacity: function(e) {
		return this.attr("opacity", e);
	}
}), i("radius", { radius: function(e, t = e) {
	return (this._element || this).type === "radialGradient" ? this.attr("r", new M(e)) : this.rx(e).ry(t);
} }), i("Path", {
	length: function() {
		return this.node.getTotalLength();
	},
	pointAt: function(e) {
		return new O(this.node.getPointAtLength(e));
	}
}), i(["Element", "Runner"], { font: function(e, t) {
	if (typeof e == "object") {
		for (t in e) this.font(t, e[t]);
		return this;
	}
	return e === "leading" ? this.leading(t) : e === "anchor" ? this.attr("text-anchor", t) : e === "size" || e === "family" || e === "weight" || e === "stretch" || e === "variant" || e === "style" ? this.attr("font-" + e, t) : this.attr(e, t);
} }), i("Element", [
	"click",
	"dblclick",
	"mousedown",
	"mouseup",
	"mouseover",
	"mouseout",
	"mousemove",
	"mouseenter",
	"mouseleave",
	"touchstart",
	"touchmove",
	"touchleave",
	"touchend",
	"touchcancel",
	"contextmenu",
	"wheel",
	"pointerdown",
	"pointermove",
	"pointerup",
	"pointerleave",
	"pointercancel"
].reduce(function(e, t) {
	return e[t] = function(e) {
		return e === null ? this.off(t) : this.on(t, e), this;
	}, e;
}, {}));
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js
function It() {
	return this.attr("transform", null);
}
function Lt() {
	return (this.attr("transform") || "").split(ke).slice(0, -1).map(function(e) {
		let t = e.trim().split("(");
		return [t[0], t[1].split(E).map(function(e) {
			return parseFloat(e);
		})];
	}).reverse().reduce(function(e, t) {
		return t[0] === "matrix" ? e.lmultiply(k.fromArray(t[1])) : e[t[0]].apply(e, t[1]);
	}, new k());
}
function Rt(e, t) {
	if (this === e) return this;
	if (g(this.node)) return this.addTo(e, t);
	let n = this.screenCTM(), r = e.screenCTM().inverse();
	return this.addTo(e, t).untransform().transform(r.multiply(n)), this;
}
function zt(e) {
	return this.toParent(this.root(), e);
}
function Bt(e, t) {
	if (e == null || typeof e == "string") {
		let t = new k(this).decompose();
		return e == null ? t : t[e];
	}
	k.isMatrixLike(e) || (e = {
		...e,
		origin: m(e, this)
	});
	let n = new k(t === !0 ? this : t || !1).transform(e);
	return this.attr("transform", n);
}
i("Element", {
	untransform: It,
	matrixify: Lt,
	toParent: Rt,
	toRoot: zt,
	transform: Bt
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Container.js
var P = class e extends N {
	flatten() {
		return this.each(function() {
			if (this instanceof e) return this.flatten().ungroup();
		}), this;
	}
	ungroup(e = this.parent(), t = e.index(this)) {
		return t = t === -1 ? e.children().length : t, this.each(function(n, r) {
			return r[r.length - n - 1].toParent(e, t);
		}), this.remove();
	}
};
C(P, "Container");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Defs.js
var Vt = class extends P {
	constructor(e, t = e) {
		super(x("defs", e), t);
	}
	flatten() {
		return this;
	}
	ungroup() {
		return this;
	}
};
C(Vt, "Defs");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Shape.js
var F = class extends N {};
C(F, "Shape");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/circled.js
var Ht = /* @__PURE__ */ t({
	cx: () => qt,
	cy: () => Jt,
	height: () => Xt,
	rx: () => Ut,
	ry: () => Wt,
	width: () => Yt,
	x: () => Gt,
	y: () => Kt
});
function Ut(e) {
	return this.attr("rx", e);
}
function Wt(e) {
	return this.attr("ry", e);
}
function Gt(e) {
	return e == null ? this.cx() - this.rx() : this.cx(e + this.rx());
}
function Kt(e) {
	return e == null ? this.cy() - this.ry() : this.cy(e + this.ry());
}
function qt(e) {
	return this.attr("cx", e);
}
function Jt(e) {
	return this.attr("cy", e);
}
function Yt(e) {
	return e == null ? this.rx() * 2 : this.rx(new M(e).divide(2));
}
function Xt(e) {
	return e == null ? this.ry() * 2 : this.ry(new M(e).divide(2));
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js
var Zt = class extends F {
	constructor(e, t = e) {
		super(x("ellipse", e), t);
	}
	size(e, t) {
		let n = p(this, e, t);
		return this.rx(new M(n.width).divide(2)).ry(new M(n.height).divide(2));
	}
};
w(Zt, Ht), i("Container", { ellipse: T(function(e = 0, t = e) {
	return this.put(new Zt()).size(e, t).move(0, 0);
}) }), C(Zt, "Ellipse");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Fragment.js
var Qt = class extends Pt {
	constructor(e = y.document.createDocumentFragment()) {
		super(e);
	}
	xml(e, t, n) {
		if (typeof e == "boolean" && (n = t, t = e, e = null), e == null || typeof e == "function") {
			let e = new Pt(se("wrapper", n));
			return e.add(this.node.cloneNode(!0)), e.xml(!1, n);
		}
		return super.xml(e, !1, n);
	}
};
C(Qt, "Fragment");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js
var $t = /* @__PURE__ */ t({
	from: () => en,
	to: () => tn
});
function en(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		fx: new M(e),
		fy: new M(t)
	}) : this.attr({
		x1: new M(e),
		y1: new M(t)
	});
}
function tn(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		cx: new M(e),
		cy: new M(t)
	}) : this.attr({
		x2: new M(e),
		y2: new M(t)
	});
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Gradient.js
var nn = class extends P {
	constructor(e, t) {
		super(x(e + "Gradient", typeof e == "string" ? null : e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "gradientTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new A();
	}
	targets() {
		return ht("svg [fill*=" + this.id() + "]");
	}
	toString() {
		return this.url();
	}
	update(e) {
		return this.clear(), typeof e == "function" && e.call(this, this), this;
	}
	url() {
		return "url(#" + this.id() + ")";
	}
};
w(nn, $t), i({
	Container: { gradient(...e) {
		return this.defs().gradient(...e);
	} },
	Defs: { gradient: T(function(e, t) {
		return this.put(new nn(e)).update(t);
	}) }
}), C(nn, "Gradient");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Pattern.js
var rn = class extends P {
	constructor(e, t = e) {
		super(x("pattern", e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "patternTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new A();
	}
	targets() {
		return ht("svg [fill*=" + this.id() + "]");
	}
	toString() {
		return this.url();
	}
	update(e) {
		return this.clear(), typeof e == "function" && e.call(this, this), this;
	}
	url() {
		return "url(#" + this.id() + ")";
	}
};
i({
	Container: { pattern(...e) {
		return this.defs().pattern(...e);
	} },
	Defs: { pattern: T(function(e, t, n) {
		return this.put(new rn()).update(n).attr({
			x: 0,
			y: 0,
			width: e,
			height: t,
			patternUnits: "userSpaceOnUse"
		});
	}) }
}), C(rn, "Pattern");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Image.js
var an = class extends F {
	constructor(e, t = e) {
		super(x("image", e), t);
	}
	load(e, t) {
		if (!e) return this;
		let n = new y.window.Image();
		return Ct(n, "load", function(e) {
			let r = this.parent(rn);
			this.width() === 0 && this.height() === 0 && this.size(n.width, n.height), r instanceof rn && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof t == "function" && t.call(this, e);
		}, this), Ct(n, "load error", function() {
			j(n);
		}), this.attr("href", n.src = e, ne);
	}
};
Mt(function(e, t, n) {
	return (e === "fill" || e === "stroke") && Fe.test(t) && (t = n.root().defs().image(t)), t instanceof an && (t = n.root().defs().pattern(0, 0, (e) => {
		e.add(t);
	})), t;
}), i({ Container: { image: T(function(e, t) {
	return this.put(new an()).size(0, 0).load(e, t);
}) } }), C(an, "Image");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/PointArray.js
var I = class extends kt {
	bbox() {
		let e = -Infinity, t = -Infinity, n = Infinity, r = Infinity;
		return this.forEach(function(i) {
			e = Math.max(i[0], e), t = Math.max(i[1], t), n = Math.min(i[0], n), r = Math.min(i[1], r);
		}), new A(n, r, e - n, t - r);
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n = this.length - 1; n >= 0; n--) this[n] = [this[n][0] + e, this[n][1] + t];
		return this;
	}
	parse(e = [0, 0]) {
		let t = [];
		e = e instanceof Array ? Array.prototype.concat.apply([], e) : e.trim().split(E).map(parseFloat), e.length % 2 != 0 && e.pop();
		for (let n = 0, r = e.length; n < r; n += 2) t.push([e[n], e[n + 1]]);
		return t;
	}
	size(e, t) {
		let n, r = this.bbox();
		for (n = this.length - 1; n >= 0; n--) r.width && (this[n][0] = (this[n][0] - r.x) * e / r.width + r.x), r.height && (this[n][1] = (this[n][1] - r.y) * t / r.height + r.y);
		return this;
	}
	toLine() {
		return {
			x1: this[0][0],
			y1: this[0][1],
			x2: this[1][0],
			y2: this[1][1]
		};
	}
	toString() {
		let e = [];
		for (let t = 0, n = this.length; t < n; t++) e.push(this[t].join(","));
		return e.join(" ");
	}
	transform(e) {
		return this.clone().transformO(e);
	}
	transformO(e) {
		k.isMatrixLike(e) || (e = new k(e));
		for (let t = this.length; t--;) {
			let [n, r] = this[t];
			this[t][0] = e.a * n + e.c * r + e.e, this[t][1] = e.b * n + e.d * r + e.f;
		}
		return this;
	}
}, on = /* @__PURE__ */ t({
	MorphArray: () => sn,
	height: () => dn,
	width: () => un,
	x: () => cn,
	y: () => ln
}), sn = I;
function cn(e) {
	return e == null ? this.bbox().x : this.move(e, this.bbox().y);
}
function ln(e) {
	return e == null ? this.bbox().y : this.move(this.bbox().x, e);
}
function un(e) {
	let t = this.bbox();
	return e == null ? t.width : this.size(e, t.height);
}
function dn(e) {
	let t = this.bbox();
	return e == null ? t.height : this.size(t.width, e);
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Line.js
var fn = class extends F {
	constructor(e, t = e) {
		super(x("line", e), t);
	}
	array() {
		return new I([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
	}
	move(e, t) {
		return this.attr(this.array().move(e, t).toLine());
	}
	plot(e, t, n, r) {
		return e == null ? this.array() : (e = t === void 0 ? new I(e).toLine() : {
			x1: e,
			y1: t,
			x2: n,
			y2: r
		}, this.attr(e));
	}
	size(e, t) {
		let n = p(this, e, t);
		return this.attr(this.array().size(n.width, n.height).toLine());
	}
};
w(fn, on), i({ Container: { line: T(function(...e) {
	return fn.prototype.plot.apply(this.put(new fn()), e[0] == null ? [
		0,
		0,
		0,
		0
	] : e);
}) } }), C(fn, "Line");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Marker.js
var pn = class extends P {
	constructor(e, t = e) {
		super(x("marker", e), t);
	}
	height(e) {
		return this.attr("markerHeight", e);
	}
	orient(e) {
		return this.attr("orient", e);
	}
	ref(e, t) {
		return this.attr("refX", e).attr("refY", t);
	}
	toString() {
		return "url(#" + this.id() + ")";
	}
	update(e) {
		return this.clear(), typeof e == "function" && e.call(this, this), this;
	}
	width(e) {
		return this.attr("markerWidth", e);
	}
};
i({
	Container: { marker(...e) {
		return this.defs().marker(...e);
	} },
	Defs: { marker: T(function(e, t, n) {
		return this.put(new pn()).size(e, t).ref(e / 2, t / 2).viewbox(0, 0, e, t).attr("orient", "auto").update(n);
	}) },
	marker: { marker(e, t, n, r) {
		let i = ["marker"];
		return e !== "all" && i.push(e), i = i.join("-"), e = arguments[1] instanceof pn ? arguments[1] : this.defs().marker(t, n, r), this.attr(i, e);
	} }
}), C(pn, "Marker");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/animation/Controller.js
function mn(e, t) {
	return function(n) {
		return n == null ? this[e] : (this[e] = n, t && t.call(this), this);
	};
}
var hn = {
	"-": function(e) {
		return e;
	},
	"<>": function(e) {
		return -Math.cos(e * Math.PI) / 2 + .5;
	},
	">": function(e) {
		return Math.sin(e * Math.PI / 2);
	},
	"<": function(e) {
		return -Math.cos(e * Math.PI / 2) + 1;
	},
	bezier: function(e, t, n, r) {
		return function(i) {
			return i < 0 ? e > 0 ? t / e * i : n > 0 ? r / n * i : 0 : i > 1 ? n < 1 ? (1 - r) / (1 - n) * i + (r - n) / (1 - n) : e < 1 ? (1 - t) / (1 - e) * i + (t - e) / (1 - e) : 1 : 3 * i * (1 - i) ** 2 * t + 3 * i ** 2 * (1 - i) * r + i ** 3;
		};
	},
	steps: function(e, t = "end") {
		t = t.split("-").reverse()[0];
		let n = e;
		return t === "none" ? --n : t === "both" && ++n, (r, i = !1) => {
			let a = Math.floor(r * e), o = r * a % 1 == 0;
			return (t === "start" || t === "both") && ++a, i && o && --a, r >= 0 && a < 0 && (a = 0), r <= 1 && a > n && (a = n), a / n;
		};
	}
}, gn = class {
	done() {
		return !1;
	}
}, _n = class extends gn {
	constructor(e = Dt.ease) {
		super(), this.ease = hn[e] || e;
	}
	step(e, t, n) {
		return typeof e == "number" ? e + (t - e) * this.ease(n) : n < 1 ? e : t;
	}
}, vn = class extends gn {
	constructor(e) {
		super(), this.stepper = e;
	}
	done(e) {
		return e.done;
	}
	step(e, t, n, r) {
		return this.stepper(e, t, n, r);
	}
};
function yn() {
	let e = (this._duration || 500) / 1e3, t = this._overshoot || 0, n = Math.PI, r = Math.log(t / 100 + 1e-10), i = -r / Math.sqrt(n * n + r * r), a = 3.9 / (i * e);
	this.d = 2 * i * a, this.k = a * a;
}
w(class extends vn {
	constructor(e = 500, t = 0) {
		super(), this.duration(e).overshoot(t);
	}
	step(e, t, n, r) {
		if (typeof e == "string") return e;
		if (r.done = n === Infinity, n === Infinity) return t;
		if (n === 0) return e;
		n > 100 && (n = 16), n /= 1e3;
		let i = r.velocity || 0, a = -this.d * i - this.k * (e - t), o = e + i * n + a * n * n / 2;
		return r.velocity = i + a * n, r.done = Math.abs(t - o) + Math.abs(i) < .002, r.done ? t : o;
	}
}, {
	duration: mn("_duration", yn),
	overshoot: mn("_overshoot", yn)
}), w(class extends vn {
	constructor(e = .1, t = .01, n = 0, r = 1e3) {
		super(), this.p(e).i(t).d(n).windup(r);
	}
	step(e, t, n, r) {
		if (typeof e == "string") return e;
		if (r.done = n === Infinity, n === Infinity) return t;
		if (n === 0) return e;
		let i = t - e, a = (r.integral || 0) + i * n, o = (i - (r.error || 0)) / n, s = this._windup;
		return s !== !1 && (a = Math.max(-s, Math.min(a, s))), r.error = i, r.integral = a, r.done = Math.abs(i) < .001, r.done ? t : e + (this.P * i + this.I * a + this.D * o);
	}
}, {
	windup: mn("_windup"),
	p: mn("P"),
	i: mn("I"),
	d: mn("D")
});
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/utils/pathParser.js
var bn = {
	M: 2,
	L: 2,
	H: 1,
	V: 1,
	C: 6,
	S: 4,
	Q: 4,
	T: 2,
	A: 7,
	Z: 0
}, xn = {
	M: function(e, t, n) {
		return t.x = n.x = e[0], t.y = n.y = e[1], [
			"M",
			t.x,
			t.y
		];
	},
	L: function(e, t) {
		return t.x = e[0], t.y = e[1], [
			"L",
			e[0],
			e[1]
		];
	},
	H: function(e, t) {
		return t.x = e[0], ["H", e[0]];
	},
	V: function(e, t) {
		return t.y = e[0], ["V", e[0]];
	},
	C: function(e, t) {
		return t.x = e[4], t.y = e[5], [
			"C",
			e[0],
			e[1],
			e[2],
			e[3],
			e[4],
			e[5]
		];
	},
	S: function(e, t) {
		return t.x = e[2], t.y = e[3], [
			"S",
			e[0],
			e[1],
			e[2],
			e[3]
		];
	},
	Q: function(e, t) {
		return t.x = e[2], t.y = e[3], [
			"Q",
			e[0],
			e[1],
			e[2],
			e[3]
		];
	},
	T: function(e, t) {
		return t.x = e[0], t.y = e[1], [
			"T",
			e[0],
			e[1]
		];
	},
	Z: function(e, t, n) {
		return t.x = n.x, t.y = n.y, ["Z"];
	},
	A: function(e, t) {
		return t.x = e[5], t.y = e[6], [
			"A",
			e[0],
			e[1],
			e[2],
			e[3],
			e[4],
			e[5],
			e[6]
		];
	}
}, Sn = "mlhvqtcsaz".split("");
for (let e = 0, t = Sn.length; e < t; ++e) xn[Sn[e]] = (function(e) {
	return function(t, n, r) {
		if (e === "H") t[0] += n.x;
		else if (e === "V") t[0] += n.y;
		else if (e === "A") t[5] += n.x, t[6] += n.y;
		else for (let e = 0, r = t.length; e < r; ++e) t[e] = t[e] + (e % 2 ? n.y : n.x);
		return xn[e](t, n, r);
	};
})(Sn[e].toUpperCase());
function Cn(e) {
	return xn[e.segment[0]](e.segment.slice(1), e.p, e.p0);
}
function wn(e) {
	return e.segment.length && e.segment.length - 1 === bn[e.segment[0].toUpperCase()];
}
function Tn(e, t) {
	e.inNumber && En(e, !1);
	let n = Ie.test(t);
	if (n) e.segment = [t];
	else {
		let t = e.lastCommand, n = t.toLowerCase();
		e.segment = [n === "m" ? t === n ? "l" : "L" : t];
	}
	return e.inSegment = !0, e.lastCommand = e.segment[0], n;
}
function En(e, t) {
	if (!e.inNumber) throw Error("Parser Error");
	e.number && e.segment.push(parseFloat(e.number)), e.inNumber = t, e.number = "", e.pointSeen = !1, e.hasExponent = !1, wn(e) && Dn(e);
}
function Dn(e) {
	e.inSegment = !1, e.absolute && (e.segment = Cn(e)), e.segments.push(e.segment);
}
function On(e) {
	if (!e.segment.length) return !1;
	let t = e.segment[0].toUpperCase() === "A", n = e.segment.length;
	return t && (n === 4 || n === 5);
}
function kn(e) {
	return e.lastToken.toUpperCase() === "E";
}
var An = /* @__PURE__ */ new Set([
	" ",
	",",
	"	",
	"\n",
	"\r",
	"\f"
]);
function jn(e, t = !0) {
	let n = 0, r = "", i = {
		segment: [],
		inNumber: !1,
		number: "",
		lastToken: "",
		inSegment: !1,
		segments: [],
		pointSeen: !1,
		hasExponent: !1,
		absolute: t,
		p0: new O(),
		p: new O()
	};
	for (; i.lastToken = r, r = e.charAt(n++);) if (!(!i.inSegment && Tn(i, r))) {
		if (r === ".") {
			if (i.pointSeen || i.hasExponent) {
				En(i, !1), --n;
				continue;
			}
			i.inNumber = !0, i.pointSeen = !0, i.number += r;
			continue;
		}
		if (!isNaN(parseInt(r))) {
			if (i.number === "0" || On(i)) {
				i.inNumber = !0, i.number = r, En(i, !0);
				continue;
			}
			i.inNumber = !0, i.number += r;
			continue;
		}
		if (An.has(r)) {
			i.inNumber && En(i, !1);
			continue;
		}
		if (r === "-" || r === "+") {
			if (i.inNumber && !kn(i)) {
				En(i, !1), --n;
				continue;
			}
			i.number += r, i.inNumber = !0;
			continue;
		}
		if (r.toUpperCase() === "E") {
			i.number += r, i.hasExponent = !0;
			continue;
		}
		if (Ie.test(r)) {
			if (i.inNumber) En(i, !1);
			else if (wn(i)) Dn(i);
			else throw Error("parser Error");
			--n;
		}
	}
	return i.inNumber && En(i, !1), i.inSegment && wn(i) && Dn(i), i.segments;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/types/PathArray.js
function Mn(e) {
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) t += e[n][0], e[n][1] != null && (t += e[n][1], e[n][2] != null && (t += " ", t += e[n][2], e[n][3] != null && (t += " ", t += e[n][3], t += " ", t += e[n][4], e[n][5] != null && (t += " ", t += e[n][5], t += " ", t += e[n][6], e[n][7] != null && (t += " ", t += e[n][7])))));
	return t + " ";
}
var Nn = class extends kt {
	bbox() {
		return ot().path.setAttribute("d", this.toString()), new A(ot.nodes.path.getBBox());
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n, r = this.length - 1; r >= 0; r--) n = this[r][0], n === "M" || n === "L" || n === "T" ? (this[r][1] += e, this[r][2] += t) : n === "H" ? this[r][1] += e : n === "V" ? this[r][1] += t : n === "C" || n === "S" || n === "Q" ? (this[r][1] += e, this[r][2] += t, this[r][3] += e, this[r][4] += t, n === "C" && (this[r][5] += e, this[r][6] += t)) : n === "A" && (this[r][6] += e, this[r][7] += t);
		return this;
	}
	parse(e = "M0 0") {
		return Array.isArray(e) && (e = Array.prototype.concat.apply([], e).toString()), jn(e);
	}
	size(e, t) {
		let n = this.bbox(), r, i;
		for (n.width = n.width === 0 ? 1 : n.width, n.height = n.height === 0 ? 1 : n.height, r = this.length - 1; r >= 0; r--) i = this[r][0], i === "M" || i === "L" || i === "T" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y) : i === "H" ? this[r][1] = (this[r][1] - n.x) * e / n.width + n.x : i === "V" ? this[r][1] = (this[r][1] - n.y) * t / n.height + n.y : i === "C" || i === "S" || i === "Q" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y, this[r][3] = (this[r][3] - n.x) * e / n.width + n.x, this[r][4] = (this[r][4] - n.y) * t / n.height + n.y, i === "C" && (this[r][5] = (this[r][5] - n.x) * e / n.width + n.x, this[r][6] = (this[r][6] - n.y) * t / n.height + n.y)) : i === "A" && (this[r][1] = this[r][1] * e / n.width, this[r][2] = this[r][2] * t / n.height, this[r][6] = (this[r][6] - n.x) * e / n.width + n.x, this[r][7] = (this[r][7] - n.y) * t / n.height + n.y);
		return this;
	}
	toString() {
		return Mn(this);
	}
}, Pn = (e) => {
	let t = typeof e;
	return t === "number" ? M : t === "string" ? D.isColor(e) ? D : E.test(e) ? Ie.test(e) ? Nn : kt : Te.test(e) ? M : In : Bn.indexOf(e.constructor) > -1 ? e.constructor : Array.isArray(e) ? kt : t === "object" ? zn : In;
}, Fn = class {
	constructor(e) {
		this._stepper = e || new _n("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
	}
	at(e) {
		return this._morphObj.morph(this._from, this._to, e, this._stepper, this._context);
	}
	done() {
		return this._context.map(this._stepper.done).reduce(function(e, t) {
			return e && t;
		}, !0);
	}
	from(e) {
		return e == null ? this._from : (this._from = this._set(e), this);
	}
	stepper(e) {
		return e == null ? this._stepper : (this._stepper = e, this);
	}
	to(e) {
		return e == null ? this._to : (this._to = this._set(e), this);
	}
	type(e) {
		return e == null ? this._type : (this._type = e, this);
	}
	_set(e) {
		this._type || this.type(Pn(e));
		let t = new this._type(e);
		return this._type === D && (t = this._to ? t[this._to[4]]() : this._from ? t[this._from[4]]() : t), this._type === zn && (t = this._to ? t.align(this._to) : this._from ? t.align(this._from) : t), t = t.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(t.length)).map(Object).map(function(e) {
			return e.done = !0, e;
		}), t;
	}
}, In = class {
	constructor(...e) {
		this.init(...e);
	}
	init(e) {
		return e = Array.isArray(e) ? e[0] : e, this.value = e, this;
	}
	toArray() {
		return [this.value];
	}
	valueOf() {
		return this.value;
	}
}, Ln = class e {
	constructor(...e) {
		this.init(...e);
	}
	init(t) {
		return Array.isArray(t) && (t = {
			scaleX: t[0],
			scaleY: t[1],
			shear: t[2],
			rotate: t[3],
			translateX: t[4],
			translateY: t[5],
			originX: t[6],
			originY: t[7]
		}), Object.assign(this, e.defaults, t), this;
	}
	toArray() {
		let e = this;
		return [
			e.scaleX,
			e.scaleY,
			e.shear,
			e.rotate,
			e.translateX,
			e.translateY,
			e.originX,
			e.originY
		];
	}
};
Ln.defaults = {
	scaleX: 1,
	scaleY: 1,
	shear: 0,
	rotate: 0,
	translateX: 0,
	translateY: 0,
	originX: 0,
	originY: 0
};
var Rn = (e, t) => e[0] < t[0] ? -1 : +(e[0] > t[0]), zn = class {
	constructor(...e) {
		this.init(...e);
	}
	align(e) {
		let t = this.values;
		for (let n = 0, r = t.length; n < r; ++n) {
			if (t[n + 1] === e[n + 1]) {
				if (t[n + 1] === D && e[n + 7] !== t[n + 7]) {
					let t = e[n + 7], r = new D(this.values.splice(n + 3, 5))[t]().toArray();
					this.values.splice(n + 3, 0, ...r);
				}
				n += t[n + 2] + 2;
				continue;
			}
			if (!e[n + 1]) return this;
			let r = new e[n + 1]().toArray(), i = t[n + 2] + 3;
			t.splice(n, i, e[n], e[n + 1], e[n + 2], ...r), n += t[n + 2] + 2;
		}
		return this;
	}
	init(e) {
		if (this.values = [], Array.isArray(e)) {
			this.values = e.slice();
			return;
		}
		e ||= {};
		let t = [];
		for (let n in e) {
			let r = Pn(e[n]), i = new r(e[n]).toArray();
			t.push([
				n,
				r,
				i.length,
				...i
			]);
		}
		return t.sort(Rn), this.values = t.reduce((e, t) => e.concat(t), []), this;
	}
	toArray() {
		return this.values;
	}
	valueOf() {
		let e = {}, t = this.values;
		for (; t.length;) {
			let n = t.shift(), r = t.shift(), i = t.shift();
			e[n] = new r(t.splice(0, i));
		}
		return e;
	}
}, Bn = [
	In,
	Ln,
	zn
];
function Vn(e = []) {
	Bn.push(...[].concat(e));
}
function Hn() {
	w(Bn, {
		to(e) {
			return new Fn().type(this.constructor).from(this.toArray()).to(e);
		},
		fromArray(e) {
			return this.init(e), this;
		},
		toConsumable() {
			return this.toArray();
		},
		morph(e, t, n, r, i) {
			return this.fromArray(e.map(function(e, a) {
				return r.step(e, t[a], n, i[a], i);
			}));
		}
	});
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Path.js
var Un = class extends F {
	constructor(e, t = e) {
		super(x("path", e), t);
	}
	array() {
		return this._array ||= new Nn(this.attr("d"));
	}
	clear() {
		return delete this._array, this;
	}
	height(e) {
		return e == null ? this.bbox().height : this.size(this.bbox().width, e);
	}
	move(e, t) {
		return this.attr("d", this.array().move(e, t));
	}
	plot(e) {
		return e == null ? this.array() : this.clear().attr("d", typeof e == "string" ? e : this._array = new Nn(e));
	}
	size(e, t) {
		let n = p(this, e, t);
		return this.attr("d", this.array().size(n.width, n.height));
	}
	width(e) {
		return e == null ? this.bbox().width : this.size(e, this.bbox().height);
	}
	x(e) {
		return e == null ? this.bbox().x : this.move(e, this.bbox().y);
	}
	y(e) {
		return e == null ? this.bbox().y : this.move(this.bbox().x, e);
	}
};
Un.prototype.MorphArray = Nn, i({ Container: { path: T(function(e) {
	return this.put(new Un()).plot(e || new Nn());
}) } }), C(Un, "Path");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/poly.js
var Wn = /* @__PURE__ */ t({
	array: () => Gn,
	clear: () => Kn,
	move: () => qn,
	plot: () => Jn,
	size: () => Yn
});
function Gn() {
	return this._array ||= new I(this.attr("points"));
}
function Kn() {
	return delete this._array, this;
}
function qn(e, t) {
	return this.attr("points", this.array().move(e, t));
}
function Jn(e) {
	return e == null ? this.array() : this.clear().attr("points", typeof e == "string" ? e : this._array = new I(e));
}
function Yn(e, t) {
	let n = p(this, e, t);
	return this.attr("points", this.array().size(n.width, n.height));
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Polygon.js
var Xn = class extends F {
	constructor(e, t = e) {
		super(x("polygon", e), t);
	}
};
i({ Container: { polygon: T(function(e) {
	return this.put(new Xn()).plot(e || new I());
}) } }), w(Xn, on), w(Xn, Wn), C(Xn, "Polygon");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Polyline.js
var Zn = class extends F {
	constructor(e, t = e) {
		super(x("polyline", e), t);
	}
};
i({ Container: { polyline: T(function(e) {
	return this.put(new Zn()).plot(e || new I());
}) } }), w(Zn, on), w(Zn, Wn), C(Zn, "Polyline");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Rect.js
var Qn = class extends F {
	constructor(e, t = e) {
		super(x("rect", e), t);
	}
};
w(Qn, {
	rx: Ut,
	ry: Wt
}), i({ Container: { rect: T(function(e, t) {
	return this.put(new Qn()).size(e, t);
}) } }), C(Qn, "Rect");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/animation/Queue.js
var $n = class {
	constructor() {
		this._first = null, this._last = null;
	}
	first() {
		return this._first && this._first.value;
	}
	last() {
		return this._last && this._last.value;
	}
	push(e) {
		let t = e.next === void 0 ? {
			value: e,
			next: null,
			prev: null
		} : e;
		return this._last ? (t.prev = this._last, this._last.next = t, this._last = t) : (this._last = t, this._first = t), t;
	}
	remove(e) {
		e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e === this._last && (this._last = e.prev), e === this._first && (this._first = e.next), e.prev = null, e.next = null;
	}
	shift() {
		let e = this._first;
		return e ? (this._first = e.next, this._first && (this._first.prev = null), this._last = this._first ? this._last : null, e.value) : null;
	}
}, L = {
	nextDraw: null,
	frames: new $n(),
	timeouts: new $n(),
	immediates: new $n(),
	timer: () => y.window.performance || y.window.Date,
	transforms: [],
	frame(e) {
		let t = L.frames.push({ run: e });
		return L.nextDraw === null && (L.nextDraw = y.window.requestAnimationFrame(L._draw)), t;
	},
	timeout(e, t) {
		t ||= 0;
		let n = L.timer().now() + t, r = L.timeouts.push({
			run: e,
			time: n
		});
		return L.nextDraw === null && (L.nextDraw = y.window.requestAnimationFrame(L._draw)), r;
	},
	immediate(e) {
		let t = L.immediates.push(e);
		return L.nextDraw === null && (L.nextDraw = y.window.requestAnimationFrame(L._draw)), t;
	},
	cancelFrame(e) {
		e != null && L.frames.remove(e);
	},
	clearTimeout(e) {
		e != null && L.timeouts.remove(e);
	},
	cancelImmediate(e) {
		e != null && L.immediates.remove(e);
	},
	_draw(e) {
		let t = null, n = L.timeouts.last();
		for (; (t = L.timeouts.shift()) && (e >= t.time ? t.run() : L.timeouts.push(t), t !== n););
		let r = null, i = L.frames.last();
		for (; r !== i && (r = L.frames.shift());) r.run(e);
		let a = null;
		for (; a = L.immediates.shift();) a();
		L.nextDraw = L.timeouts.first() || L.frames.first() ? y.window.requestAnimationFrame(L._draw) : null;
	}
}, er = function(e) {
	let t = e.start, n = e.runner.duration();
	return {
		start: t,
		duration: n,
		end: t + n,
		runner: e.runner
	};
}, tr = function() {
	let e = y.window;
	return (e.performance || e.Date).now();
}, nr = class extends Tt {
	constructor(e = tr) {
		super(), this._timeSource = e, this.terminate();
	}
	active() {
		return !!this._nextFrame;
	}
	finish() {
		return this.time(this.getEndTimeOfTimeline() + 1), this.pause();
	}
	getEndTime() {
		let e = this.getLastRunnerInfo(), t = e ? e.runner.duration() : 0;
		return (e ? e.start : this._time) + t;
	}
	getEndTimeOfTimeline() {
		let e = this._runners.map((e) => e.start + e.runner.duration());
		return Math.max(0, ...e);
	}
	getLastRunnerInfo() {
		return this.getRunnerInfoById(this._lastRunnerId);
	}
	getRunnerInfoById(e) {
		return this._runners[this._runnerIds.indexOf(e)] || null;
	}
	pause() {
		return this._paused = !0, this._continue();
	}
	persist(e) {
		return e == null ? this._persist : (this._persist = e, this);
	}
	play() {
		return this._paused = !1, this.updateTime()._continue();
	}
	reverse(e) {
		let t = this.speed();
		if (e == null) return this.speed(-t);
		let n = Math.abs(t);
		return this.speed(e ? -n : n);
	}
	schedule(e, t, n) {
		if (e == null) return this._runners.map(er);
		let r = 0, i = this.getEndTime();
		if (t ||= 0, n == null || n === "last" || n === "after") r = i;
		else if (n === "absolute" || n === "start") r = t, t = 0;
		else if (n === "now") r = this._time;
		else if (n === "relative") {
			let n = this.getRunnerInfoById(e.id);
			n && (r = n.start + t, t = 0);
		} else if (n === "with-last") {
			let e = this.getLastRunnerInfo();
			r = e ? e.start : this._time;
		} else throw Error("Invalid value for the \"when\" parameter");
		e.unschedule(), e.timeline(this);
		let a = e.persist(), o = {
			persist: a === null ? this._persist : a,
			start: r + t,
			runner: e
		};
		return this._lastRunnerId = e.id, this._runners.push(o), this._runners.sort((e, t) => e.start - t.start), this._runnerIds = this._runners.map((e) => e.runner.id), this.updateTime()._continue(), this;
	}
	seek(e) {
		return this.time(this._time + e);
	}
	source(e) {
		return e == null ? this._timeSource : (this._timeSource = e, this);
	}
	speed(e) {
		return e == null ? this._speed : (this._speed = e, this);
	}
	stop() {
		return this.time(0), this.pause();
	}
	time(e) {
		return e == null ? this._time : (this._time = e, this._continue(!0));
	}
	unschedule(e) {
		let t = this._runnerIds.indexOf(e.id);
		return t < 0 ? this : (this._runners.splice(t, 1), this._runnerIds.splice(t, 1), e.timeline(null), this);
	}
	updateTime() {
		return this.active() || (this._lastSourceTime = this._timeSource()), this;
	}
	_continue(e = !1) {
		return L.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : (this._paused || (this._nextFrame = L.frame(this._step)), this);
	}
	_stepFn(e = !1) {
		let t = this._timeSource(), n = t - this._lastSourceTime;
		e && (n = 0);
		let r = this._speed * n + (this._time - this._lastStepTime);
		this._lastSourceTime = t, e || (this._time += r, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
		for (let e = this._runners.length; e--;) {
			let t = this._runners[e], n = t.runner;
			this._time - t.start <= 0 && n.reset();
		}
		let i = !1;
		for (let e = 0, t = this._runners.length; e < t; e++) {
			let n = this._runners[e], a = n.runner, o = r, s = this._time - n.start;
			if (s <= 0) {
				i = !0;
				continue;
			} else s < o && (o = s);
			a.active() && (a.step(o).done ? n.persist !== !0 && a.duration() - a.time() + this._time + n.persist < this._time && (a.unschedule(), --e, --t) : i = !0);
		}
		return i && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
	}
	terminate() {
		this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
	}
};
i({ Element: { timeline: function(e) {
	return e == null ? (this._timeline = this._timeline || new nr(), this._timeline) : (this._timeline = e, this);
} } });
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/animation/Runner.js
var R = class e extends Tt {
	constructor(t) {
		super(), this.id = e.id++, t ??= Dt.duration, t = typeof t == "function" ? new vn(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof vn, this._stepper = this._isDeclarative ? t : new _n(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new k(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
	}
	static sanitise(e, t, n) {
		let r = 1, i = !1, a = 0;
		return e ??= Dt.duration, t ??= Dt.delay, n ||= "last", typeof e == "object" && !(e instanceof gn) && (t = e.delay ?? t, n = e.when ?? n, i = e.swing || i, r = e.times ?? r, a = e.wait ?? a, e = e.duration ?? Dt.duration), {
			duration: e,
			delay: t,
			swing: i,
			times: r,
			wait: a,
			when: n
		};
	}
	active(e) {
		return e == null ? this.enabled : (this.enabled = e, this);
	}
	addTransform(e) {
		return this.transforms.lmultiplyO(e), this;
	}
	after(e) {
		return this.on("finished", e);
	}
	animate(t, n, r) {
		let i = e.sanitise(t, n, r), a = new e(i.duration);
		return this._timeline && a.timeline(this._timeline), this._element && a.element(this._element), a.loop(i).schedule(i.delay, i.when);
	}
	clearTransform() {
		return this.transforms = new k(), this;
	}
	clearTransformsFromQueue() {
		(!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) && (this._queue = this._queue.filter((e) => !e.isTransform));
	}
	delay(e) {
		return this.animate(0, e);
	}
	duration() {
		return this._times * (this._wait + this._duration) - this._wait;
	}
	during(e) {
		return this.queue(null, e);
	}
	ease(e) {
		return this._stepper = new _n(e), this;
	}
	element(e) {
		return e == null ? this._element : (this._element = e, e._prepareRunner(), this);
	}
	finish() {
		return this.step(Infinity);
	}
	loop(e, t, n) {
		return typeof e == "object" && (t = e.swing, n = e.wait, e = e.times), this._times = e || Infinity, this._swing = t || !1, this._wait = n || 0, this._times === !0 && (this._times = Infinity), this;
	}
	loops(e) {
		let t = this._duration + this._wait;
		if (e == null) {
			let e = Math.floor(this._time / t), n = (this._time - e * t) / this._duration;
			return Math.min(e + n, this._times);
		}
		let n = Math.floor(e), r = e % 1, i = t * n + this._duration * r;
		return this.time(i);
	}
	persist(e) {
		return e == null ? this._persist : (this._persist = e, this);
	}
	position(e) {
		let t = this._time, n = this._duration, r = this._wait, i = this._times, a = this._swing, o = this._reverse, s;
		if (e == null) {
			let e = function(e) {
				let t = a * Math.floor(e % (2 * (r + n)) / (r + n)), i = t && !o || !t && o, s = (-1) ** i * (e % (r + n)) / n + i;
				return Math.max(Math.min(s, 1), 0);
			}, c = i * (r + n) - r;
			return s = t <= 0 ? Math.round(e(1e-5)) : t < c ? e(t) : Math.round(e(c - 1e-5)), s;
		}
		let c = Math.floor(this.loops()), l = a && c % 2 == 0;
		return s = c + (l && !o || o && l ? e : 1 - e), this.loops(s);
	}
	progress(e) {
		return e == null ? Math.min(1, this._time / this.duration()) : this.time(e * this.duration());
	}
	queue(e, t, n, r) {
		return this._queue.push({
			initialiser: e || Et,
			runner: t || Et,
			retarget: n,
			isTransform: r,
			initialised: !1,
			finished: !1
		}), this.timeline() && this.timeline()._continue(), this;
	}
	reset() {
		return this._reseted ? this : (this.time(0), this._reseted = !0, this);
	}
	reverse(e) {
		return this._reverse = e ?? !this._reverse, this;
	}
	schedule(e, t, n) {
		if (e instanceof nr || (n = t, t = e, e = this.timeline()), !e) throw Error("Runner cannot be scheduled without timeline");
		return e.schedule(this, t, n), this;
	}
	step(e) {
		if (!this.enabled) return this;
		e ??= 16, this._time += e;
		let t = this.position(), n = this._lastPosition !== t && this._time >= 0;
		this._lastPosition = t;
		let r = this.duration(), i = this._lastTime <= 0 && this._time > 0, a = this._lastTime < r && this._time >= r;
		this._lastTime = this._time, i && this.fire("start", this);
		let o = this._isDeclarative;
		this.done = !o && !a && this._time >= r, this._reseted = !1;
		let s = !1;
		return (n || o) && (this._initialise(n), this.transforms = new k(), s = this._run(o ? e : t), this.fire("step", this)), this.done = this.done || s && o, a && this.fire("finished", this), this;
	}
	time(e) {
		if (e == null) return this._time;
		let t = e - this._time;
		return this.step(t), this;
	}
	timeline(e) {
		return e === void 0 ? this._timeline : (this._timeline = e, this);
	}
	unschedule() {
		let e = this.timeline();
		return e && e.unschedule(this), this;
	}
	_initialise(e) {
		if (!(!e && !this._isDeclarative)) for (let t = 0, n = this._queue.length; t < n; ++t) {
			let n = this._queue[t], r = this._isDeclarative || !n.initialised && e;
			e = !n.finished, r && e && (n.initialiser.call(this), n.initialised = !0);
		}
	}
	_rememberMorpher(e, t) {
		if (this._history[e] = {
			morpher: t,
			caller: this._queue[this._queue.length - 1]
		}, this._isDeclarative) {
			let e = this.timeline();
			e && e.play();
		}
	}
	_run(e) {
		let t = !0;
		for (let n = 0, r = this._queue.length; n < r; ++n) {
			let r = this._queue[n], i = r.runner.call(this, e);
			r.finished = r.finished || i === !0, t &&= r.finished;
		}
		return t;
	}
	_tryRetarget(e, t, n) {
		if (this._history[e]) {
			if (!this._history[e].caller.initialised) {
				let t = this._queue.indexOf(this._history[e].caller);
				return this._queue.splice(t, 1), !1;
			}
			this._history[e].caller.retarget ? this._history[e].caller.retarget.call(this, t, n) : this._history[e].morpher.to(t), this._history[e].caller.finished = !1;
			let r = this.timeline();
			return r && r.play(), !0;
		}
		return !1;
	}
};
R.id = 0;
var rr = class {
	constructor(e = new k(), t = -1, n = !0) {
		this.transforms = e, this.id = t, this.done = n;
	}
	clearTransformsFromQueue() {}
};
w([R, rr], { mergeWith(e) {
	return new rr(e.transforms.lmultiply(this.transforms), e.id);
} });
var ir = (e, t) => e.lmultiplyO(t), ar = (e) => e.transforms;
function or() {
	let e = this._transformationRunners.runners.map(ar).reduce(ir, new k());
	this.transform(e), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
var sr = class {
	constructor() {
		this.runners = [], this.ids = [];
	}
	add(e) {
		if (this.runners.includes(e)) return;
		let t = e.id + 1;
		return this.runners.push(e), this.ids.push(t), this;
	}
	clearBefore(e) {
		let t = this.ids.indexOf(e + 1) || 1;
		return this.ids.splice(0, t, 0), this.runners.splice(0, t, new rr()).forEach((e) => e.clearTransformsFromQueue()), this;
	}
	edit(e, t) {
		let n = this.ids.indexOf(e + 1);
		return this.ids.splice(n, 1, e + 1), this.runners.splice(n, 1, t), this;
	}
	getByID(e) {
		return this.runners[this.ids.indexOf(e + 1)];
	}
	length() {
		return this.ids.length;
	}
	merge() {
		let e = null;
		for (let t = 0; t < this.runners.length; ++t) {
			let n = this.runners[t];
			if (e && n.done && e.done && (!n._timeline || !n._timeline._runnerIds.includes(n.id)) && (!e._timeline || !e._timeline._runnerIds.includes(e.id))) {
				this.remove(n.id);
				let r = n.mergeWith(e);
				this.edit(e.id, r), e = r, --t;
			} else e = n;
		}
		return this;
	}
	remove(e) {
		let t = this.ids.indexOf(e + 1);
		return this.ids.splice(t, 1), this.runners.splice(t, 1), this;
	}
};
i({ Element: {
	animate(e, t, n) {
		let r = R.sanitise(e, t, n), i = this.timeline();
		return new R(r.duration).loop(r).element(this).timeline(i.play()).schedule(r.delay, r.when);
	},
	delay(e, t) {
		return this.animate(0, e, t);
	},
	_clearTransformRunnersBefore(e) {
		this._transformationRunners.clearBefore(e.id);
	},
	_currentTransform(e) {
		return this._transformationRunners.runners.filter((t) => t.id <= e.id).map(ar).reduce(ir, new k());
	},
	_addRunner(e) {
		this._transformationRunners.add(e), L.cancelImmediate(this._frameId), this._frameId = L.immediate(or.bind(this));
	},
	_prepareRunner() {
		this._frameId ?? (this._transformationRunners = new sr().add(new rr(new k(this))));
	}
} });
var cr = (e, t) => e.filter((e) => !t.includes(e));
w(R, {
	attr(e, t) {
		return this.styleAttr("attr", e, t);
	},
	css(e, t) {
		return this.styleAttr("css", e, t);
	},
	styleAttr(e, t, n) {
		if (typeof t == "string") return this.styleAttr(e, { [t]: n });
		let r = t;
		if (this._tryRetarget(e, r)) return this;
		let i = new Fn(this._stepper).to(r), a = Object.keys(r);
		return this.queue(function() {
			i = i.from(this.element()[e](a));
		}, function(t) {
			return this.element()[e](i.at(t).valueOf()), i.done();
		}, function(t) {
			let n = Object.keys(t), o = cr(n, a);
			if (o.length) {
				let t = this.element()[e](o), n = new zn(i.from()).valueOf();
				Object.assign(n, t), i.from(n);
			}
			let s = new zn(i.to()).valueOf();
			Object.assign(s, t), i.to(s), a = n, r = t;
		}), this._rememberMorpher(e, i), this;
	},
	zoom(e, t) {
		if (this._tryRetarget("zoom", e, t)) return this;
		let n = new Fn(this._stepper).to(new M(e));
		return this.queue(function() {
			n = n.from(this.element().zoom());
		}, function(e) {
			return this.element().zoom(n.at(e), t), n.done();
		}, function(e, r) {
			t = r, n.to(e);
		}), this._rememberMorpher("zoom", n), this;
	},
	transform(e, t, n) {
		if (t = e.relative || t, this._isDeclarative && !t && this._tryRetarget("transform", e)) return this;
		let r = k.isMatrixLike(e);
		n = e.affine == null ? n ?? !r : e.affine;
		let i = new Fn(this._stepper).type(n ? Ln : k), a, o, s, c, l;
		function u() {
			o ||= this.element(), a ||= m(e, o), l = new k(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
		}
		function d(u) {
			t || this.clearTransform();
			let { x: d, y: f } = new O(a).transform(o._currentTransform(this)), p = new k({
				...e,
				origin: [d, f]
			}), m = this._isDeclarative && s ? s : l;
			if (n) {
				p = p.decompose(d, f), m = m.decompose(d, f);
				let e = p.rotate, t = m.rotate, n = [
					e - 360,
					e,
					e + 360
				], r = n.map((e) => Math.abs(e - t)), i = Math.min(...r), a = r.indexOf(i);
				p.rotate = n[a];
			}
			t && (r || (p.rotate = e.rotate || 0), this._isDeclarative && c && (m.rotate = c)), i.from(m), i.to(p);
			let h = i.at(u);
			return c = h.rotate, s = new k(h), this.addTransform(s), o._addRunner(this), i.done();
		}
		function f(t) {
			(t.origin || "center").toString() !== (e.origin || "center").toString() && (a = m(t, o)), e = {
				...t,
				origin: a
			};
		}
		return this.queue(u, d, f, !0), this._isDeclarative && this._rememberMorpher("transform", i), this;
	},
	x(e) {
		return this._queueNumber("x", e);
	},
	y(e) {
		return this._queueNumber("y", e);
	},
	ax(e) {
		return this._queueNumber("ax", e);
	},
	ay(e) {
		return this._queueNumber("ay", e);
	},
	dx(e = 0) {
		return this._queueNumberDelta("x", e);
	},
	dy(e = 0) {
		return this._queueNumberDelta("y", e);
	},
	dmove(e, t) {
		return this.dx(e).dy(t);
	},
	_queueNumberDelta(e, t) {
		if (t = new M(t), this._tryRetarget(e, t)) return this;
		let n = new Fn(this._stepper).to(t), r = null;
		return this.queue(function() {
			r = this.element()[e](), n.from(r), n.to(r + t);
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}, function(e) {
			n.to(r + new M(e));
		}), this._rememberMorpher(e, n), this;
	},
	_queueObject(e, t) {
		if (this._tryRetarget(e, t)) return this;
		let n = new Fn(this._stepper).to(t);
		return this.queue(function() {
			n.from(this.element()[e]());
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}), this._rememberMorpher(e, n), this;
	},
	_queueNumber(e, t) {
		return this._queueObject(e, new M(t));
	},
	cx(e) {
		return this._queueNumber("cx", e);
	},
	cy(e) {
		return this._queueNumber("cy", e);
	},
	move(e, t) {
		return this.x(e).y(t);
	},
	amove(e, t) {
		return this.ax(e).ay(t);
	},
	center(e, t) {
		return this.cx(e).cy(t);
	},
	size(e, t) {
		let n;
		return (!e || !t) && (n = this._element.bbox()), e ||= n.width / n.height * t, t ||= n.height / n.width * e, this.width(e).height(t);
	},
	width(e) {
		return this._queueNumber("width", e);
	},
	height(e) {
		return this._queueNumber("height", e);
	},
	plot(e, t, n, r) {
		if (arguments.length === 4) return this.plot([
			e,
			t,
			n,
			r
		]);
		if (this._tryRetarget("plot", e)) return this;
		let i = new Fn(this._stepper).type(this._element.MorphArray).to(e);
		return this.queue(function() {
			i.from(this._element.array());
		}, function(e) {
			return this._element.plot(i.at(e)), i.done();
		}), this._rememberMorpher("plot", i), this;
	},
	leading(e) {
		return this._queueNumber("leading", e);
	},
	viewbox(e, t, n, r) {
		return this._queueObject("viewbox", new A(e, t, n, r));
	},
	update(e) {
		return typeof e == "object" ? (e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", e.offset), this) : this.update({
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		});
	}
}), w(R, {
	rx: Ut,
	ry: Wt,
	from: en,
	to: tn
}), C(R, "Runner");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Svg.js
var lr = class extends P {
	constructor(e, t = e) {
		super(x("svg", e), t), this.namespace();
	}
	defs() {
		return this.isRoot() ? S(this.node.querySelector("defs")) || this.put(new Vt()) : this.root().defs();
	}
	isRoot() {
		return !this.node.parentNode || !(this.node.parentNode instanceof y.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
	}
	namespace() {
		return this.isRoot() ? this.attr({
			xmlns: v,
			version: "1.1"
		}).attr("xmlns:xlink", ne, te) : this.root().namespace();
	}
	removeNamespace() {
		return this.attr({
			xmlns: null,
			version: null
		}).attr("xmlns:xlink", null, te).attr("xmlns:svgjs", null, te);
	}
	root() {
		return this.isRoot() ? this : super.root();
	}
};
i({ Container: { nested: T(function() {
	return this.put(new lr());
}) } }), C(lr, "Svg", !0);
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Symbol.js
var ur = class extends P {
	constructor(e, t = e) {
		super(x("symbol", e), t);
	}
};
i({ Container: { symbol: T(function() {
	return this.put(new ur());
}) } }), C(ur, "Symbol");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/textable.js
var dr = /* @__PURE__ */ t({
	amove: () => Sr,
	ax: () => br,
	ay: () => xr,
	build: () => Cr,
	center: () => yr,
	cx: () => _r,
	cy: () => vr,
	length: () => pr,
	move: () => gr,
	plain: () => fr,
	x: () => mr,
	y: () => hr
});
function fr(e) {
	return this._build === !1 && this.clear(), this.node.appendChild(y.document.createTextNode(e)), this;
}
function pr() {
	return this.node.getComputedTextLength();
}
function mr(e, t = this.bbox()) {
	return e == null ? t.x : this.attr("x", this.attr("x") + e - t.x);
}
function hr(e, t = this.bbox()) {
	return e == null ? t.y : this.attr("y", this.attr("y") + e - t.y);
}
function gr(e, t, n = this.bbox()) {
	return this.x(e, n).y(t, n);
}
function _r(e, t = this.bbox()) {
	return e == null ? t.cx : this.attr("x", this.attr("x") + e - t.cx);
}
function vr(e, t = this.bbox()) {
	return e == null ? t.cy : this.attr("y", this.attr("y") + e - t.cy);
}
function yr(e, t, n = this.bbox()) {
	return this.cx(e, n).cy(t, n);
}
function br(e) {
	return this.attr("x", e);
}
function xr(e) {
	return this.attr("y", e);
}
function Sr(e, t) {
	return this.ax(e).ay(t);
}
function Cr(e) {
	return this._build = !!e, this;
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Text.js
var z = class extends F {
	constructor(e, t = e) {
		super(x("text", e), t), this.dom.leading = this.dom.leading ?? new M(1.3), this._rebuild = !0, this._build = !1;
	}
	leading(e) {
		return e == null ? this.dom.leading : (this.dom.leading = new M(e), this.rebuild());
	}
	rebuild(e) {
		if (typeof e == "boolean" && (this._rebuild = e), this._rebuild) {
			let e = this, t = 0, n = this.dom.leading;
			this.each(function(r) {
				if (g(this.node)) return;
				let i = y.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new M(i);
				this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === "\n" ? t += a : (this.attr("dy", r ? a + t : 0), t = 0));
			}), this.fire("rebuild");
		}
		return this;
	}
	setData(e) {
		return this.dom = e, this.dom.leading = new M(e.leading || 1.3), this;
	}
	writeDataToDom() {
		return _(this, this.dom, { leading: 1.3 }), this;
	}
	text(e) {
		if (e === void 0) {
			let t = this.node.childNodes, n = 0;
			e = "";
			for (let r = 0, i = t.length; r < i; ++r) {
				if (t[r].nodeName === "textPath" || g(t[r])) {
					r === 0 && (n = r + 1);
					continue;
				}
				r !== n && t[r].nodeType !== 3 && S(t[r]).dom.newLined === !0 && (e += "\n"), e += t[r].textContent;
			}
			return e;
		}
		if (this.clear().build(!0), typeof e == "function") e.call(this, this);
		else {
			e = (e + "").split("\n");
			for (let t = 0, n = e.length; t < n; t++) this.newLine(e[t]);
		}
		return this.build(!1).rebuild();
	}
};
w(z, dr), i({ Container: {
	text: T(function(e = "") {
		return this.put(new z()).text(e);
	}),
	plain: T(function(e = "") {
		return this.put(new z()).plain(e);
	})
} }), C(z, "Text");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Tspan.js
var wr = class extends F {
	constructor(e, t = e) {
		super(x("tspan", e), t), this._build = !1;
	}
	dx(e) {
		return this.attr("dx", e);
	}
	dy(e) {
		return this.attr("dy", e);
	}
	newLine() {
		this.dom.newLined = !0;
		let e = this.parent();
		if (!(e instanceof z)) return this;
		let t = e.index(this), n = y.window.getComputedStyle(this.node).getPropertyValue("font-size"), r = e.dom.leading * new M(n);
		return this.dy(t ? r : 0).attr("x", e.x());
	}
	text(e) {
		return e == null ? this.node.textContent + (this.dom.newLined ? "\n" : "") : (typeof e == "function" ? (this.clear().build(!0), e.call(this, this), this.build(!1)) : this.plain(e), this);
	}
};
w(wr, dr), i({
	Tspan: { tspan: T(function(e = "") {
		let t = new wr();
		return this._build || this.clear(), this.put(t).text(e);
	}) },
	Text: { newLine: function(e = "") {
		return this.tspan(e).newLine();
	} }
}), C(wr, "Tspan");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Circle.js
var Tr = class extends F {
	constructor(e, t = e) {
		super(x("circle", e), t);
	}
	radius(e) {
		return this.attr("r", e);
	}
	rx(e) {
		return this.attr("r", e);
	}
	ry(e) {
		return this.rx(e);
	}
	size(e) {
		return this.radius(new M(e).divide(2));
	}
};
w(Tr, {
	x: Gt,
	y: Kt,
	cx: qt,
	cy: Jt,
	width: Yt,
	height: Xt
}), i({ Container: { circle: T(function(e = 0) {
	return this.put(new Tr()).size(e).move(0, 0);
}) } }), C(Tr, "Circle");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js
var Er = class extends P {
	constructor(e, t = e) {
		super(x("clipPath", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unclip();
		}), super.remove();
	}
	targets() {
		return ht("svg [clip-path*=" + this.id() + "]");
	}
};
i({
	Container: { clip: T(function() {
		return this.defs().put(new Er());
	}) },
	Element: {
		clipper() {
			return this.reference("clip-path");
		},
		clipWith(e) {
			let t = e instanceof Er ? e : this.parent().clip().add(e);
			return this.attr("clip-path", "url(#" + t.id() + ")");
		},
		unclip() {
			return this.attr("clip-path", null);
		}
	}
}), C(Er, "ClipPath");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js
var Dr = class extends N {
	constructor(e, t = e) {
		super(x("foreignObject", e), t);
	}
};
i({ Container: { foreignObject: T(function(e, t) {
	return this.put(new Dr()).size(e, t);
}) } }), C(Dr, "ForeignObject");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js
var Or = /* @__PURE__ */ t({
	dmove: () => kr,
	dx: () => Ar,
	dy: () => jr,
	height: () => Mr,
	move: () => Nr,
	size: () => Pr,
	width: () => Fr,
	x: () => Ir,
	y: () => Lr
});
function kr(e, t) {
	return this.children().forEach((n) => {
		let r;
		try {
			r = n.node instanceof re().SVGSVGElement ? new A(n.attr([
				"x",
				"y",
				"width",
				"height"
			])) : n.bbox();
		} catch {
			return;
		}
		let i = new k(n), a = i.translate(e, t).transform(i.inverse()), o = new O(r.x, r.y).transform(a);
		n.move(o.x, o.y);
	}), this;
}
function Ar(e) {
	return this.dmove(e, 0);
}
function jr(e) {
	return this.dmove(0, e);
}
function Mr(e, t = this.bbox()) {
	return e == null ? t.height : this.size(t.width, e, t);
}
function Nr(e = 0, t = 0, n = this.bbox()) {
	let r = e - n.x, i = t - n.y;
	return this.dmove(r, i);
}
function Pr(e, t, n = this.bbox()) {
	let r = p(this, e, t, n), i = r.width / n.width, a = r.height / n.height;
	return this.children().forEach((e) => {
		let t = new O(n).transform(new k(e).inverse());
		e.scale(i, a, t.x, t.y);
	}), this;
}
function Fr(e, t = this.bbox()) {
	return e == null ? t.width : this.size(e, t.height, t);
}
function Ir(e, t = this.bbox()) {
	return e == null ? t.x : this.move(e, t.y, t);
}
function Lr(e, t = this.bbox()) {
	return e == null ? t.y : this.move(t.x, e, t);
}
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/G.js
var Rr = class extends P {
	constructor(e, t = e) {
		super(x("g", e), t);
	}
};
w(Rr, Or), i({ Container: { group: T(function() {
	return this.put(new Rr());
}) } }), C(Rr, "G");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/A.js
var zr = class extends P {
	constructor(e, t = e) {
		super(x("a", e), t);
	}
	target(e) {
		return this.attr("target", e);
	}
	to(e) {
		return this.attr("href", e, ne);
	}
};
w(zr, Or), i({
	Container: { link: T(function(e) {
		return this.put(new zr()).to(e);
	}) },
	Element: {
		unlink() {
			let e = this.linker();
			if (!e) return this;
			let t = e.parent();
			if (!t) return this.remove();
			let n = t.index(e);
			return t.add(this, n), e.remove(), this;
		},
		linkTo(e) {
			let t = this.linker();
			return t || (t = new zr(), this.wrap(t)), typeof e == "function" ? e.call(t, t) : t.to(e), this;
		},
		linker() {
			let e = this.parent();
			return e && e.node.nodeName.toLowerCase() === "a" ? e : null;
		}
	}
}), C(zr, "A");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Mask.js
var Br = class extends P {
	constructor(e, t = e) {
		super(x("mask", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unmask();
		}), super.remove();
	}
	targets() {
		return ht("svg [mask*=" + this.id() + "]");
	}
};
i({
	Container: { mask: T(function() {
		return this.defs().put(new Br());
	}) },
	Element: {
		masker() {
			return this.reference("mask");
		},
		maskWith(e) {
			let t = e instanceof Br ? e : this.parent().mask().add(e);
			return this.attr("mask", "url(#" + t.id() + ")");
		},
		unmask() {
			return this.attr("mask", null);
		}
	}
}), C(Br, "Mask");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Stop.js
var Vr = class extends N {
	constructor(e, t = e) {
		super(x("stop", e), t);
	}
	update(e) {
		return (typeof e == "number" || e instanceof M) && (e = {
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		}), e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", new M(e.offset)), this;
	}
};
i({ Gradient: { stop: function(e, t, n) {
	return this.put(new Vr()).update(e, t, n);
} } }), C(Vr, "Stop");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Style.js
function Hr(e, t) {
	if (!e) return "";
	if (!t) return e;
	let n = e + "{";
	for (let e in t) n += d(e) + ":" + t[e] + ";";
	return n += "}", n;
}
var Ur = class extends N {
	constructor(e, t = e) {
		super(x("style", e), t);
	}
	addText(e = "") {
		return this.node.textContent += e, this;
	}
	font(e, t, n = {}) {
		return this.rule("@font-face", {
			fontFamily: e,
			src: t,
			...n
		});
	}
	rule(e, t) {
		return this.addText(Hr(e, t));
	}
};
i("Dom", {
	style(e, t) {
		return this.put(new Ur()).rule(e, t);
	},
	fontface(e, t, n) {
		return this.put(new Ur()).font(e, t, n);
	}
}), C(Ur, "Style");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/TextPath.js
var Wr = class extends z {
	constructor(e, t = e) {
		super(x("textPath", e), t);
	}
	array() {
		let e = this.track();
		return e ? e.array() : null;
	}
	plot(e) {
		let t = this.track(), n = null;
		return t && (n = t.plot(e)), e == null ? n : this;
	}
	track() {
		return this.reference("href");
	}
};
i({
	Container: { textPath: T(function(e, t) {
		return e instanceof z || (e = this.text(e)), e.path(t);
	}) },
	Text: {
		path: T(function(e, t = !0) {
			let n = new Wr();
			e instanceof Un || (e = this.defs().path(e)), n.attr("href", "#" + e, ne);
			let r;
			if (t) for (; r = this.node.firstChild;) n.node.appendChild(r);
			return this.put(n);
		}),
		textPath() {
			return this.findOne("textPath");
		}
	},
	Path: {
		text: T(function(e) {
			return e instanceof z || (e = new z().addTo(this.parent()).text(e)), e.path(this);
		}),
		targets() {
			return ht("svg textPath").filter((e) => (e.attr("href") || "").includes(this.id()));
		}
	}
}), Wr.prototype.MorphArray = Nn, C(Wr, "TextPath");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/elements/Use.js
var Gr = class extends F {
	constructor(e, t = e) {
		super(x("use", e), t);
	}
	use(e, t) {
		return this.attr("href", (t || "") + "#" + e, ne);
	}
};
i({ Container: { use: T(function(e, t) {
	return this.put(new Gr()).use(e, t);
}) } }), C(Gr, "Use");
//#endregion
//#region node_modules/@svgdotjs/svg.js/src/main.js
var Kr = b;
w([
	lr,
	ur,
	an,
	rn,
	pn
], a("viewbox")), w([
	fn,
	Zn,
	Xn,
	Un
], a("marker")), w(z, a("Text")), w(Un, a("Path")), w(Vt, a("Defs")), w([z, wr], a("Tspan")), w([
	Qn,
	Zt,
	nn,
	R
], a("radius")), w(Tt, a("EventTarget")), w(Pt, a("Dom")), w(N, a("Element")), w(F, a("Shape")), w([P, Qt], a("Container")), w(nn, a("Gradient")), w(R, a("Runner")), pt.extend(o()), Vn([
	M,
	D,
	A,
	k,
	kt,
	I,
	Nn,
	O
]), Hn();
//#endregion
//#region src/pidraw.common.ts
function B(e) {
	return e?.x !== void 0 && e.y !== void 0;
}
function V(e) {
	return e?.min !== void 0 && e.max !== void 0;
}
var qr = /* @__PURE__ */ function(e) {
	return e.BACKGROUND = "background", e.GRIDS = "grids", e.AXIS = "axis", e.MAIN = "main", e.PLOTS_BACKGROUND = "plots_BG", e.PLOTS = "plots", e.PLOTS_FOREGROUND = "plots_FG", e.FOREGROUND = "foreground", e.POINTS = "points", e.INTERACTIVE = "interactive", e;
}({}), Jr = /* @__PURE__ */ function(e) {
	return e.X = "Ox", e.Y = "Oy", e;
}({}), Yr = /* @__PURE__ */ function(e) {
	return e.CARTESIAN_2D = "cartesian_2d", e.POLAR = "polar", e;
}({}), Xr = /* @__PURE__ */ function(e) {
	return e.FREE = "free", e.FIXED = "fixed", e.MIDDLE = "middle", e.PROJECTION = "projection", e.INTERSECTION_LINES = "intersection_lines", e.FOLLOW = "follow", e.DIRECTION = "direction", e.VECTOR = "vector", e.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", e.INTERSECTION_CIRCLES = "intersection_circles", e.SYMMETRY = "symmetry", e.COORDINATES = "coordinates", e;
}({}), Zr = /* @__PURE__ */ function(e) {
	return e.FIXED = "fixed", e.PARALLEL = "parallel", e.PERPENDICULAR = "perpendicular", e.TANGENT = "tangent", e.MEDIATOR = "mediator", e.SLOPE = "slope", e.BISECTOR = "bisector", e;
}({}), Qr = /* @__PURE__ */ function(e) {
	return e.FIXED = "fixed", e.REGULAR = "regular", e.STAR = "star", e;
}({}), H = /* @__PURE__ */ function(e) {
	return e.SMOOTH = "smooth", e.VERTICAL = "vertical", e.HORIZONTAL = "horizontal", e.UP = "up", e.DOWN = "down", e.RIGHT = "right", e.LEFT = "left", e;
}({}), $r = (e) => (e.changedTouches && (e = e.changedTouches[0]), {
	x: e.clientX,
	y: e.clientY
}), ei = class {
	constructor(e) {
		e.remember("_draggable", this), this.el = e, this.drag = this.drag.bind(this), this.startDrag = this.startDrag.bind(this), this.endDrag = this.endDrag.bind(this);
	}
	init(e) {
		e ? (this.el.on("mousedown.drag", this.startDrag), this.el.on("touchstart.drag", this.startDrag, { passive: !1 })) : (this.el.off("mousedown.drag"), this.el.off("touchstart.drag"));
	}
	startDrag(e) {
		let t = !e.type.indexOf("mouse");
		if (t && e.which !== 1 && e.buttons !== 0 || this.el.dispatch("beforedrag", {
			event: e,
			handler: this
		}).defaultPrevented) return;
		e.preventDefault(), e.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point($r(e));
		let n = (t ? "mousemove" : "touchmove") + ".drag", r = (t ? "mouseup" : "touchend") + ".drag";
		Ct(window, n, this.drag, this, { passive: !1 }), Ct(window, r, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", {
			event: e,
			handler: this,
			box: this.box
		});
	}
	drag(e) {
		let { box: t, lastClick: n } = this, r = this.el.point($r(e)), i = r.x - n.x, a = r.y - n.y;
		if (!i && !a) return t;
		let o = t.x + i, s = t.y + a;
		this.box = new A(o, s, t.w, t.h), this.lastClick = r, !this.el.dispatch("dragmove", {
			event: e,
			handler: this,
			box: this.box,
			dx: i,
			dy: a
		}).defaultPrevented && this.move(o, s);
	}
	move(e, t) {
		this.el.type === "svg" ? Rr.prototype.move.call(this.el, e, t) : this.el.move(e, t);
	}
	endDrag(e) {
		this.drag(e), this.el.fire("dragend", {
			event: e,
			handler: this,
			box: this.box
		}), j(window, "mousemove.drag"), j(window, "touchmove.drag"), j(window, "mouseup.drag"), j(window, "touchend.drag"), this.init(!0);
	}
};
w(N, { draggable(e = !0) {
	return (this.remember("_draggable") || new ei(this)).init(e), this;
} });
//#endregion
//#region src/labels/Label.ts
var ti = class {
	_element;
	_name;
	_style;
	constructor(e, t, n) {
		this._element = e, this._name = t, this._config = Object.assign({
			text: t,
			asHtml: !1,
			alignement: "br",
			offset: {
				x: 0,
				y: 0
			},
			rotate: 0,
			size: null,
			texConverter: (e) => e
		}, n), this._displayName = n.text ?? t, this._x = 0, this._y = 0, this._style = "display: block; position: fixed; white-space:nowrap", this._shape = this._makeLabel();
	}
	_shape;
	get shape() {
		return this._shape;
	}
	_config;
	get config() {
		return this._config;
	}
	_displayName;
	get displayName() {
		return this._config.asHtml ? this._config.texConverter(this._displayName) : this._displayName;
	}
	_x;
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e;
	}
	_y;
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e;
	}
	_auto_rotate = !1;
	get auto_rotate() {
		return this._auto_rotate;
	}
	set auto_rotate(e) {
		this._auto_rotate = e;
	}
	get asHtml() {
		return this._config.asHtml;
	}
	get alignement() {
		return this._config.alignement;
	}
	get label() {
		return this._shape;
	}
	hide() {
		return this._shape.hide(), this;
	}
	show() {
		return this._shape.show(), this;
	}
	setLabel(e) {
		return e !== void 0 && (this._displayName = e), this._makeLabel(), this;
	}
	move(e, t) {
		return this._x = e, this._y = t, this.position(), this;
	}
	rotate(e) {
		return this._shape.transform({
			rotate: e,
			origin: {
				x: this._x,
				y: this._y
			}
		}), this;
	}
	position(e, t, n) {
		e ??= this._config.alignement, t ??= this._config.offset, n ??= this._config.rotate, t = {
			x: isNaN(t.x) ? 0 : t.x,
			y: isNaN(t.y) ? 0 : t.y
		}, this._config.alignement = e, this._config.offset = t, this._config.rotate = n;
		let r = this._x, i = this._y, a = 0, o = 0;
		return this._shape instanceof Dr ? (a = this._shape.node.children[0].clientWidth, o = this._shape.node.children[0].clientHeight, this.label.width(a), this.label.height(o)) : (a = this._shape.length(), o = this._shape.bbox().h), e.includes("l") ? r = r - a / 2 + (e.includes("m") ? -10 : 0) : e.includes("r") ? r = r + a / 2 + (e.includes("m") ? 10 : 0) : e.includes("c") && (r = +r), e.includes("t") ? i -= o / 2 : e.includes("m") ? i = +i : e.includes("b") && (i += o / 2), this._shape instanceof Dr, this._shape.center(r + (t.x ?? 0), i - (t.y ?? 0)), n !== 0 && n !== void 0 && this.rotate(n), this;
	}
	_makeLabel() {
		this._shape && this._shape.remove();
		let e = this._style + (this._config.size === null ? "" : `; font-size: ${this._config.size}`);
		return this._shape = this._config.asHtml ? this._element.foreignObject(1, 1).attr("style", "overflow:visible").add(Kr(`<div style="${e}">${this.displayName}</div>`, !0)) : this._element.text(this.displayName).css("vector-effect", "non-scaling-size"), this._shape.attr("id", `${this._name}-label`), this._shape;
	}
};
//#endregion
//#region src/Calculus.ts
function ni(e, t = 10) {
	return +e.toFixed(t);
}
function ri(e) {
	return e === -Infinity || e === Infinity;
}
function ii(e, t) {
	return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
var U = class e {
	constructor(e, t) {
		return this._x = 0, this._y = 0, B(e) && B(t) ? (this._x = t.x - e.x, this._y = t.y - e.y) : B(e) && t === void 0 ? (this._x = e.x, this._y = e.y) : !isNaN(+e) && t !== void 0 && !isNaN(+t) && (this._x = +e, this._y = +t), this;
	}
	_x;
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e;
	}
	_y;
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e;
	}
	get norm() {
		return Math.sqrt(this._x ** 2 + this._y ** 2);
	}
	get normal() {
		return new e(this._y, -this._x);
	}
	get unit() {
		let t = this.norm;
		return new e(this._x / t, this._y / t);
	}
	static scalarProduct(e, t) {
		return e.x * t.x + e.y * t.y;
	}
	projection(t) {
		let n = t.x, r = t.y, i = e.scalarProduct(this, t) / (n ** 2 + r ** 2);
		return new e(n * i, r * i);
	}
	rotate(e) {
		let t = +e * Math.PI / 180, n = +this._x, r = +this._y;
		return this._x = Math.cos(t) * n - Math.sin(t) * r, this._y = Math.sin(t) * n + Math.cos(t) * r, this;
	}
	add(t) {
		return new e(this._x + t.x, this._y + t.y);
	}
	setLength(e) {
		let t = this.norm;
		return this._x = this._x * e / t, this._y = this._y * e / t, this;
	}
}, ai = class e {
	constructor(t, n) {
		if (this._A = {
			x: 0,
			y: 0
		}, this._director = new U(0, 0), n instanceof U) this._A = t, this._director = n;
		else return new e(t, new U(t, n));
	}
	_A;
	get A() {
		return this._A;
	}
	set A(e) {
		this._A = e;
	}
	_director;
	get director() {
		return this._director;
	}
	set director(e) {
		this._director = e;
	}
	get normal() {
		return new U(this._director.y, -this._director.x);
	}
	get slope() {
		return this._director.y / this._director.x;
	}
	get ordinate() {
		return this._A.y - this._A.x * this.slope;
	}
	getValueAtX(e) {
		return e * this.slope + this.ordinate;
	}
	getValueAtY(e) {
		let t = this.slope;
		return ri(t) ? this._A.x : (e - this.ordinate) / this.slope;
	}
	intersection(e) {
		let t = this.slope, n = this.ordinate, r = e.slope, i = e.ordinate, a, o;
		return t === Infinity || t === -Infinity ? (a = this._A.x, o = r * a + i) : r === Infinity || r === -Infinity ? (a = e.A.x, o = t * a + n) : (a = (i - n) / (t - r), o = t * a + n), a === Infinity || a === -Infinity ? null : {
			x: a,
			y: o
		};
	}
	projection(e) {
		let t = this._director, n = new U(this._A, e), r = U.scalarProduct(t, n) / U.scalarProduct(t, t);
		return {
			x: this._A.x + t.x * r,
			y: this._A.y + t.y * r
		};
	}
}, oi = class {
	constructor(e, t) {
		this._expression = e;
		try {
			this._rpn = new ci("numeric").parse(e, t ?? !0).rpn, this._isValid = !0;
		} catch {
			this._rpn = [], this._isValid = !1;
		}
	}
	_rpn;
	get rpn() {
		return this._rpn;
	}
	_expression;
	get expression() {
		return this._expression;
	}
	_isValid;
	get isValid() {
		try {
			this.evaluate({ x: 0 }), this._isValid = !0;
		} catch {
			this._isValid = !1;
		}
		return this._isValid;
	}
	set isValid(e) {
		this._isValid = e;
	}
	evaluate(e) {
		let t = [];
		if (this._rpn.length === 0) return this._isValid = !1, NaN;
		this.isValid = !0;
		for (let n of this._rpn) if (n.tokenType === "coefficient") isNaN(+n.token) ? console.log("adding Fraction - should not be here ! ") : this._addToStack(t, +n.token);
		else if (n.tokenType === "variable") e?.[n.token] !== void 0 && this._addToStack(t, +e[n.token]);
		else if (n.tokenType === "constant") this._addToStack(t, si[n.token]);
		else if (n.tokenType === "operation") {
			if (n.token === "*") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) return this.isValid = !1, NaN;
				this._addToStack(t, n * e);
			} else if (n.token === "/") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) return this.isValid = !1, NaN;
				this._addToStack(t, n / e);
			} else if (n.token === "+") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) return this.isValid = !1, NaN;
				this._addToStack(t, +n + +e);
			} else if (n.token === "-") {
				let e = t.pop(), n = t.pop() ?? 0;
				if (e === void 0) return this.isValid = !1, NaN;
				this._addToStack(t, n - e);
			} else if (n.token === "^") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) return this.isValid = !1, NaN;
				this._addToStack(t, n ** +e);
			}
		} else if (n.tokenType === "function") {
			let e = t.pop();
			if (e === void 0) return this.isValid = !1, NaN;
			if (n.token === "sin") this._addToStack(t, Math.sin(e));
			else if (n.token === "cos") this._addToStack(t, Math.cos(e));
			else if (n.token === "tan") this._addToStack(t, Math.tan(e));
			else if (n.token === "asin") this._addToStack(t, Math.asin(e));
			else if (n.token === "acos") this._addToStack(t, Math.acos(e));
			else if (n.token === "atan") this._addToStack(t, Math.atan(e));
			else if (n.token === "sqrt") this._addToStack(t, Math.sqrt(e));
			else if (n.token === "nthrt") {
				let n = t.pop();
				if (n === void 0) return this._isValid = !1, NaN;
				e % 2 == 0 && n < 0 ? this._addToStack(t, NaN) : this._addToStack(t, (n < 0 ? -1 : 1) * Math.abs(n) ** (1 / e));
			} else n.token === "ln" ? this._addToStack(t, Math.log(e)) : n.token === "log" ? this._addToStack(t, Math.log10(e)) : n.token === "abs" && this._addToStack(t, Math.abs(e));
		}
		if (t.length === 1) return t[0];
		throw Error(`There was a problem parsing: ${this._expression}`);
	}
	_extractDecimalPart(e) {
		let t = e.toString();
		return t.includes(".") ? (t = t.split(".")[1], t.substring(0, t.length - 2)) : "";
	}
	_addToStack(e, t) {
		e.push(ni(t));
	}
}, si = {
	pi: Math.PI,
	e: Math.exp(1)
}, ci = class {
	_mode;
	_tokenConfig;
	_tokenConstant;
	_tokenKeys;
	_uniformize;
	constructor(e) {
		this._mode = e === void 0 ? "polynom" : e, this._tokenConfig = {}, this._tokenConstant = {}, this._tokenKeys = [], this._uniformize = !1, this.tokenConfigInitialization();
	}
	_rpn = [];
	get rpn() {
		return this._rpn;
	}
	get rpnToken() {
		return this._rpn.map((e) => e.token);
	}
	tokenConfigInitialization() {
		return this._mode === "numeric" ? (this._tokenConfig = {
			"^": {
				precedence: 4,
				associative: "right",
				type: "operation"
			},
			"*": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"/": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"+": {
				precedence: 2,
				associative: "left",
				type: "operation"
			},
			"-": {
				precedence: 2,
				associative: "left",
				type: "operation"
			},
			"%": {
				precedence: 3,
				associative: "right",
				type: "operation"
			},
			sin: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			cos: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			tan: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			asin: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			acos: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			atan: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			sqrt: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			nthrt: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			ln: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			log: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			abs: {
				precedence: 4,
				associative: "right",
				type: "function"
			}
		}, this._uniformize = !1) : this._mode === "expression" ? (this._tokenConfig = {
			"^": {
				precedence: 4,
				associative: "right",
				type: "operation"
			},
			"*": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"/": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"+": {
				precedence: 2,
				associative: "left",
				type: "operation"
			},
			"-": {
				precedence: 2,
				associative: "left",
				type: "operation"
			},
			"%": {
				precedence: 3,
				associative: "right",
				type: "operation"
			},
			sin: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			cos: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			tan: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			asin: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			acos: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			atan: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			sqrt: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			nthrt: {
				precedence: 4,
				associative: "right",
				type: "function"
			},
			abs: {
				precedence: 4,
				associative: "right",
				type: "function"
			}
		}, this._uniformize = !0) : (this._tokenConfig = {
			"^": {
				precedence: 4,
				associative: "right",
				type: "operation"
			},
			"*": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"/": {
				precedence: 3,
				associative: "left",
				type: "operation"
			},
			"+": {
				precedence: 2,
				associative: "left",
				type: "operation"
			},
			"-": {
				precedence: 2,
				associative: "left",
				type: "operation"
			}
		}, this._uniformize = !0), this._tokenKeys = Object.keys(this._tokenConfig).sort((e, t) => t.length - e.length), this._tokenConfig;
	}
	NextToken(e, t) {
		let n, r;
		if (n = "", r = "monom", e[t] === "(") n = "(", r = "(";
		else if (e[t] === ")") n = ")", r = ")";
		else if (e[t] === ",") n = ",", r = "function-argument";
		else {
			for (let i of this._tokenKeys) if (e.substring(t, t + i.length) === i) {
				n += i, r = this._tokenConfig[i].type;
				break;
			}
			for (let i in si) if (e.substring(t, t + i.length) === i) {
				n += i, r = "constant";
				break;
			}
			if (n === "") if (/[0-9]/.exec(e[t])) {
				let i = /^([0-9.]+)/.exec(e.substring(t));
				i && (n = i[0]), r = "coefficient";
			} else if (/[a-zA-Z]/.exec(e[t])) {
				let i = /^([a-zA-Z]+)/.exec(e.substring(t));
				i && (n = i[0], r = "variable");
			} else console.log("Unidentified token", e[t], e, t), n = e[t], r = "monom";
		}
		return [
			n,
			t + n.length,
			r
		];
	}
	normalize(e) {
		if (e.length === 1) return e;
		let t = [], n = [];
		for (let e in this._tokenConfig) this._tokenConfig[e].type === "function" && t.push(e);
		t.sort((e, t) => t.length - e.length);
		for (let e in si) n.push(e);
		n.sort((e, t) => t.length - e.length);
		let r = "", i = 0, a, o;
		for (; i < e.length - 1;) {
			let s = 0;
			for (; s < t.length;) {
				let n = t[s];
				e.slice(i, i + n.length + 1) === n + "(" ? (r += n + "(", i += n.length + 1, s = 0) : s++;
			}
			for (s = 0; s < n.length;) {
				let t = n[s];
				if (e.slice(i, i + t.length) === t) {
					r += t, i += t.length;
					break;
				}
				s++;
			}
			if (i >= e.length) break;
			a = e[i], o = e[i + 1], r += a, a.match(/[a-zA-Z]/g) ? /[a-zA-Z\d(]/.exec(o) && (r += "*") : /\d/.exec(a) ? /[a-zA-Z(]/.exec(o) && (r += "*") : a === ")" && /[a-zA-Z\d(]/.exec(o) && (r += "*"), i++;
		}
		return r + (o ?? "");
	}
	parse(e, t) {
		(t ?? this._uniformize) && (e = this.normalize(e));
		let n = 50, r, i = 0, a, o, s = [], c = [];
		for (; i < e.length;) {
			if (n--, n === 0) {
				console.log("SECURITY LEVEL 1 EXIT");
				break;
			}
			switch ([a, i, o] = this.NextToken(e, i), o) {
				case "monom":
				case "coefficient":
				case "variable":
				case "constant":
					s.push({
						token: a,
						tokenType: o
					});
					break;
				case "operation":
					if (c.length > 0) {
						let e = c[c.length - 1];
						for (r = 50; e.token in this._tokenConfig && (this._tokenConfig[a].associative === "left" && this._tokenConfig[a].precedence <= this._tokenConfig[e.token].precedence || this._tokenConfig[a].associative === "right" && this._tokenConfig[a].precedence < this._tokenConfig[e.token].precedence);) {
							if (r--, r === 0) {
								console.log("SECURITY LEVEL 2 OPERATION EXIT");
								break;
							}
							if (s.push(c.pop() ?? {
								token: "",
								tokenType: "operation"
							}), c.length === 0) break;
							e = c[c.length - 1];
						}
					}
					c.push({
						token: a,
						tokenType: o
					});
					break;
				case "function-argument":
					for (r = 50; c[c.length - 1].token !== "(" && c.length > 0;) {
						if (r--, r === 0) {
							console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
							break;
						}
						s.push(c.pop() ?? {
							token: a,
							tokenType: o
						});
					}
					break;
				case "(":
					c.push({
						token: a,
						tokenType: o
					}), e[i] === "-" && s.push({
						token: "0",
						tokenType: "coefficient"
					});
					break;
				case ")":
					for (r = 50; c[c.length - 1].token !== "(" && c.length > 1;) {
						if (r--, r === 0) {
							console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
							break;
						}
						s.push(c.pop() ?? {
							token: a,
							tokenType: o
						});
					}
					c.pop();
					break;
				case "function":
					c.push({
						token: a,
						tokenType: o
					});
					break;
				default: console.log(`SHUTING YARD: ${o} : ${a} `);
			}
		}
		return this._rpn = s.concat(c.reverse()), this;
	}
};
function W(e, t, n) {
	if (typeof e == "number") return n === "y" ? e * t.axis.y.y : e * t.axis.x.x;
	if (V(e)) {
		let r, i;
		return n === "y" ? (r = t.origin.y + e.min * t.axis.y.y, i = t.origin.y + e.max * t.axis.y.y) : (r = t.origin.x + e.min * t.axis.x.x, i = t.origin.x + e.max * t.axis.x.x), {
			min: Math.min(r, i),
			max: Math.max(r, i)
		};
	}
	return B(e) ? {
		x: t.origin.x + e.x * t.axis.x.x + e.y * t.axis.y.x,
		y: t.origin.y + e.x * t.axis.x.y + e.y * t.axis.y.y
	} : e;
}
function li(e, t, n) {
	if (typeof e == "number") return n === "y" ? e / t.axis.y.y : e / t.axis.x.x;
	if (V(e)) {
		let r, i;
		return n === "y" ? (r = t.origin.y + e.min / t.axis.y.y, i = t.origin.y + e.max / t.axis.y.y) : (r = t.origin.x + e.min / t.axis.x.x, i = t.origin.x + e.max / t.axis.x.x), {
			min: Math.min(r, i),
			max: Math.max(r, i)
		};
	}
	return B(e) ? {
		x: (e.x - t.origin.x) / t.axis.x.x,
		y: (e.y - t.origin.y) / t.axis.y.y
	} : e;
}
function ui(e, t, n, r, i = 0, a = !1, o) {
	let s = 0, c = 0, l = 0, u = 0;
	if (t.x === 0) s = e.x, c = a ? e.y + i : t.y > 0 ? +i : r - i, l = e.x, u = o ? t.y < 0 ? e.y + o * t.y : 0 + i : t.y > 0 ? r - i : 0 + i;
	else if (t.y === 0) s = a ? e.x - i : t.x > 0 ? 0 + i : n - i, c = e.y, l = o ? t.x > 0 ? e.x + o * t.x : 0 - i : t.x > 0 ? n - i : 0 + i, u = e.y;
	else {
		let r = 0, d = 0;
		t.x > 0 ? (r = a ? -i / t.x : o || (e.x - i) / t.x, d = o || (n - e.x - i) / t.x) : t.x < 0 && (r = a ? -i / t.x : o || (n - e.x - i) / t.x, d = o || (e.x - i) / t.x), r = Math.abs(r), d = Math.abs(d), s = e.x - r * t.x, c = e.y - r * t.y, l = e.x + d * t.x, u = e.y + d * t.y;
	}
	return s > n && l > n || s < 0 && l < 0 || c > r && u > r || c < 0 && u < 0 ? null : [{
		x: s,
		y: c
	}, {
		x: l,
		y: u
	}];
}
function di(e, t, n, r) {
	let i = -r * Math.PI / 180;
	return {
		x: e + n * Math.cos(i),
		y: t + n * Math.sin(i)
	};
}
function fi(e, t) {
	let n, r = t.x - e.x, i = -(t.y - e.y);
	if (n = t.x - e.x === 0 ? 90 : Math.atan(i / r) * 180 / Math.PI, r >= 0) {
		if (!(i >= 0)) for (; n < 270;) n += 180;
	} else if (i >= 0) for (; n < 90;) n += 180;
	else for (; n < 180;) n += 180;
	return n;
}
function pi(e, t, n) {
	return {
		id: e,
		viewBox: `0 0 ${t} ${t}`,
		...n ?? {
			refX: t / 2,
			refY: t / 2
		},
		markerWidth: t,
		markerHeight: t,
		orient: "auto-start-reverse",
		markerUnits: "userSpaceOnUse"
	};
}
function mi(e, t, n, r = "->") {
	let i = (t) => e.findOne(`#${t}`);
	if (r === "x") {
		let r = `marker-x-${t}-${n}`;
		return i(r) ?? e.marker(n, n, (e) => {
			e.path(`M0,0 L${n},${n} M${n},0 L0,${n}`).stroke({
				color: "black",
				width: 1
			});
		}).attr(pi(r, n));
	}
	if (r === "|") return i(`marker-|-${t}-${n}`) ?? e.marker(n, n, (e) => {
		e.path(`M${n / 2},${n} L${n / 2},0`).stroke({
			color: "black",
			width: 1
		});
	}).attr(pi(t, n));
	let a = `marker-${t}-${n}`;
	return i(a) ?? e.marker(n * 1.2, n * 1.2, (e) => {
		e.path(`M1,0 L1,${n}, L${n * 1.2},${n / 2} L1,0z`).stroke({
			color: "black",
			width: 1
		});
	}).attr(pi(a, n, {
		refX: n,
		refY: n / 2
	}));
}
function hi(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string" && e.includes("/")) {
		let [t, n] = e.split("/");
		return t / +n;
	}
	return +e;
}
function gi(e, t, n) {
	let r = [
		"x^2",
		"x",
		""
	];
	return Object.values(_i(e, t, n)).map((e, t) => e === 0 ? "" : (t > 0 && e > 0 ? `+${e.toFixed(4)}` : e.toFixed(4)) + r[t]).join("");
}
function _i(e, t, n) {
	let { x: r, y: i } = e, { x: a, y: o } = t, { x: s, y: c } = n, l = (r - a) * (r - s) * (a - s);
	return {
		a: (i * (a - s) + o * (s - r) + c * (r - a)) / l,
		b: (i * (s ** 2 - a ** 2) + o * (r ** 2 - s ** 2) + c * (a ** 2 - r ** 2)) / l,
		c: (i * (a * s * (a - s)) + o * (s * r * (s - r)) + c * (r * a * (r - a))) / l
	};
}
//#endregion
//#region src/figures/AbstractFigure.ts
var G = class {
	constructor(e, t) {
		this._rootSVG = e, this._name = t, this._static = !1, this._isDraggable = !1, this._animate = null, this._label = null, this._element = this._rootSVG.group().attr("id", this._name), this._appearance = {
			stroke: {
				color: "black",
				width: 1,
				opacity: 1
			},
			fill: {
				color: "transparent",
				opacity: 1
			}
		}, this._shape = this._element.path();
	}
	_rootSVG;
	get rootSVG() {
		return this._rootSVG;
	}
	_name;
	get name() {
		return this._name;
	}
	_element;
	get element() {
		return this._element;
	}
	_shape;
	get shape() {
		return this._shape;
	}
	set shape(e) {
		this._shape = e;
	}
	_appearance;
	get appearance() {
		return this._appearance;
	}
	set appearance(e) {
		this._appearance = e;
	}
	_static;
	get static() {
		return this._static;
	}
	set static(e) {
		this._static = e;
	}
	_isDraggable;
	get isDraggable() {
		return this._isDraggable;
	}
	set isDraggable(e) {
		this._isDraggable = e;
	}
	_label;
	get label() {
		return this._label;
	}
	_animate;
	get animate() {
		return this._animate;
	}
	set animate(e) {
		this._animate = e;
	}
	get graphConfig() {
		return this._rootSVG.data("config");
	}
	hide() {
		return this._element.hide(), this;
	}
	show() {
		return this._element.show(), this;
	}
	strokeable() {
		return [this._shape];
	}
	fillable() {
		return [this._shape];
	}
	fill(e) {
		if (e !== void 0) {
			let [t, n] = e.split("/");
			this._appearance.fill.color = t, this._appearance.fill.opacity = n === void 0 ? 1 : +n;
		}
		return this.fillable().forEach((e) => {
			e.fill(this._appearance.fill), e.opacity(this._appearance.fill.opacity);
		}), this;
	}
	stroke(e, t) {
		if (typeof e == "string") {
			let [n, r] = e.split("/");
			this._appearance.stroke.color = n, this._appearance.stroke.opacity = r === void 0 ? 1 : +r, this._appearance.stroke.width = t ?? this._appearance.stroke.width;
		}
		return typeof e == "number" && t === void 0 && (this._appearance.stroke.width = e), this.strokeable().forEach((e) => {
			e.stroke(this._appearance.stroke), e.opacity(this._appearance.stroke.opacity);
		}), [this._shape.reference("marker-start"), this._shape.reference("marker-end")].filter((e) => e !== null).forEach((e) => {
			e.children().forEach((e) => {
				e.attr({
					fill: this._appearance.stroke.color,
					stroke: this._appearance.stroke.color,
					"stroke-width": this._appearance.stroke.width
				});
			});
		}), this;
	}
	dash(e) {
		return this.strokeable().forEach((t) => {
			t.stroke({ dasharray: e ?? (this.graphConfig.axis.x.x / 2).toString() });
		}), this;
	}
	dot() {
		return this.dash("3");
	}
	clear(e) {
		return e ? (this._element.clear(), this) : (this._element.children().forEach((e) => {
			e.attr("id") !== `${this._name}-label` && e.remove();
		}), this);
	}
	update(e) {
		return (this.static || this._isDraggable) && e !== !0 ? this : (this.computed(), this.updateLabel(), this);
	}
	addLabel(e, t, n) {
		return this._label = new ti(this._element, this._name, {
			text: e ?? this._name,
			asHtml: t ?? !1,
			alignement: "br",
			size: "inherit",
			offset: {
				x: 0,
				y: 0
			},
			texConverter: n ?? ((e) => e)
		}), this.updateLabel(), this._label;
	}
	updateLabel() {
		return this._label ? (this._label.setLabel(this.computeLabel()), this.moveLabel(), this) : this;
	}
	computeLabel() {
		return this._label?.config.text ?? this._name;
	}
	move(e) {
		if (B(e)) {
			let t = W(e.x, this.graphConfig), n = W(e.y, this.graphConfig);
			this._shape.translate(t, -n);
		} else if (typeof e == "number") {
			let t = W(e, this.graphConfig);
			this._shape.translate(t, 0);
		}
		return this;
	}
	scale(e) {
		return typeof e == "number" ? this.scale({
			x: e,
			y: e
		}) : (this._shape.scale(e.x, e.y), this);
	}
	mark(e, t) {
		let n = t?.find((e) => typeof e == "number") ?? 10, r = t?.find((e) => typeof e == "string") ?? "->", i = mi(this._rootSVG, this.name, n, r), a = this._shape;
		return e === "start" ? (a.marker("start", i), this) : e === "end" ? (a.marker("end", i), this) : (a.marker("start", i), a.marker("end", i), this);
	}
	follow(e, t) {
		return {
			x: e,
			y: t
		};
	}
}, K = /* @__PURE__ */ function(e) {
	return e.UNKNOWN = "unknown", e.POINT = "pt", e.MIDDLE = "mid", e.PROJECTION = "proj", e.INTERSECTION = "inter", e.SYMMETRY = "sym", e.DIRECTION_POINT = "dpt", e.VECTOR_POINT = "vpt", e.EVAL_FX = "eval", e.LINE = "line", e.VECTOR = "vec", e.SEGMENT = "seg", e.RAY = "ray", e.PERPENDICULAR = "perp", e.PARALLEL = "para", e.MEDIATOR = "med", e.TANGENT = "tan", e.BISECTOR = "bis", e.CIRCLE = "circ", e.ARC = "arc", e.PLOT = "plot", e.PARAMETRIC = "parametric", e.POLYGON = "poly", e.REGULAR = "reg", e.FOLLOW = "follow", e.FILL_BETWEEN = "fill", e.RIEMANN = "riemann", e.PATH = "path", e;
}({});
function q(e, t) {
	return e.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
var vi = [
	"black",
	"white",
	"red",
	"green",
	"blue",
	"cyan",
	"magenta",
	"yellow",
	"gray",
	"grey",
	"darkgray",
	"darkgrey",
	"lightgray",
	"lightgrey",
	"brown",
	"lime",
	"olive",
	"orange",
	"pink",
	"purple",
	"teal",
	"gold"
], J = class extends G {
	constructor(e, t, n) {
		return super(e, t), this._config = Object.assign({ shape: "line" }, n), this._start = {
			x: 0,
			y: 0
		}, this._end = {
			x: this.graphConfig.width,
			y: this.graphConfig.height
		}, this.shape = this._makeShape(), this.computed(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this._makeShape();
	}
	_end;
	get end() {
		return this._end;
	}
	set end(e) {
		this._end = e;
	}
	_start;
	get start() {
		return this._start;
	}
	set start(e) {
		this._start = e;
	}
	get angle() {
		return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
	}
	get direction() {
		return {
			x: this.end.x - this.start.x,
			y: this.end.y - this.start.y
		};
	}
	get math() {
		return new ai(this.start, this.end);
	}
	get normal() {
		let e = this.direction;
		return {
			x: e.y,
			y: -e.x
		};
	}
	computeLabel() {
		if (this.label?.config.text.includes("@") && this._config.shape === "segment") {
			let e = li(this._start, this.graphConfig), t = li(this._end, this.graphConfig);
			return this.label.config.text.replace("@", ni(+ii(e, t).toFixed(2)).toString());
		}
		return this.label?.config.text ?? this.name;
	}
	computed() {
		let e = {
			x: 0,
			y: 0
		};
		if (this._config.through?.A && this._config.through.B) this.start = this._config.through.A, this.end = this._config.through.B, e = this.direction;
		else if (this._config.director?.A && this._config.director.d) this.start = this._config.director.A, this.end = {
			x: this._config.director.A.x + this._config.director.d.x,
			y: this._config.director.A.y + this._config.director.d.y
		}, e = this._config.director.d;
		else if (this._config.slope?.A && this._config.slope.slope) this.start = this._config.slope.A, e = {
			x: 1,
			y: -this._config.slope.slope
		};
		else if (this._config.parallel?.to && this._config.parallel.through) this.start = this._config.parallel.through, e = this._config.parallel.to === "Ox" ? {
			x: 1,
			y: 0
		} : this._config.parallel.to === "Oy" ? {
			x: 0,
			y: 1
		} : this._config.parallel.to.direction;
		else if (this._config.perpendicular?.to && this._config.perpendicular.through) this.start = this._config.perpendicular.through, e = this._config.perpendicular.to === "Ox" ? {
			x: 0,
			y: 1
		} : this._config.perpendicular.to === "Oy" ? {
			x: 1,
			y: 0
		} : this._config.perpendicular.to.normal;
		else if (this._config.mediator?.A && this._config.mediator.B) this.start = {
			x: (this._config.mediator.A.x + this._config.mediator.B.x) / 2,
			y: (this._config.mediator.A.y + this._config.mediator.B.y) / 2
		}, e = {
			x: this._config.mediator.B.y - this._config.mediator.A.y,
			y: -(this._config.mediator.B.x - this._config.mediator.A.x)
		};
		else if (this._config.bisector) {
			if ("d1" in this._config.bisector && "d2" in this._config.bisector, "A" in this._config.bisector && "B" in this._config.bisector && "C" in this._config.bisector) {
				let { A: t, B: n, C: r } = this._config.bisector, i = new U(t, n), a = i.norm, o = new U(t, r), s = o.norm;
				this.start = t, e = {
					x: i.x / a + o.x / s,
					y: i.y / a + o.y / s
				};
			}
		} else if (this._config.equation) {
			let t = this._config.equation;
			if (!t.includes("=")) return this;
			let n = {
				x: 0,
				y: 0
			};
			if (t.startsWith("y=") && !t.includes("x")) {
				let r = q([t.split("=")[1]], {})[0];
				n = W({
					x: 0,
					y: r
				}, this.graphConfig), e = {
					x: 1,
					y: 0
				};
			} else if (t.startsWith("x=")) {
				let r = q([t.split("=")[1]], {})[0];
				n = W({
					x: r,
					y: 0
				}, this.graphConfig), e = {
					x: 0,
					y: 1
				};
			} else {
				let [r, i] = t.split("="), a = yi(r), o = yi(i), s = {
					a: a.a - o.a,
					b: a.b - o.b,
					c: a.c - o.c
				};
				n = W({
					x: 0,
					y: -s.c / s.b
				}, this.graphConfig), e = {
					x: s.b,
					y: s.a
				};
			}
			this.start = n, this.end = {
				x: n.x + e.x,
				y: n.y + e.y
			};
		} else if (this._config.tangent?.A && this._config.tangent?.f) {
			let t = this._config.tangent.A, n = li(t, this.graphConfig).x + 1e-4, r = W({
				x: n,
				y: this._config.tangent.f.numExp.evaluate({ x: n })
			}, this.graphConfig);
			this.start = {
				x: t.x,
				y: t.y
			}, e = {
				x: r.x - t.x,
				y: r.y - t.y
			};
		} else console.log(this._config);
		if (this._config.shape === void 0 || this._config.shape === "line" || this._config.shape === "ray") {
			let t = ui(this.start, e, this.graphConfig.width, this.graphConfig.height, 0, this._config.shape === "ray");
			t !== null && (this.start = t[0], this.end = t[1]);
		}
		return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
	}
	follow(e, t) {
		let n = this.math.projection({
			x: e,
			y: t
		});
		if (this._config.shape === "line") return n;
		let { x: r, y: i } = this.start, { x: a, y: o } = this.end, s = a - r, c = o - i, l = Math.max(0, Math.min(1, ((e - r) * s + (t - i) * c) / (s * s + c * c)));
		return {
			x: r + l * s,
			y: i + l * c
		};
	}
	move(e) {
		if (typeof e == "number") {
			let t = new U(this.normal).setLength(e);
			return this.move(t);
		}
		return super.move(e);
	}
	moveLabel() {
		if (!this.label) return this;
		if (this._config.shape === "segment" || this._config.shape === "vector") {
			let e = (this.start.x + this.end.x) / 2, t = (this.start.y + this.end.y) / 2;
			if (this.label.move(e, t), this.label.auto_rotate) {
				let e = -this.angle;
				e > 90 && (e -= 180), e < -90 && (e += 180), this.label.position(void 0, void 0, e);
			}
		}
		return this;
	}
	_makeShape() {
		if (this.element.clear(), this.shape = this.element.line(this.start.x, this.start.y, this.end.x, this.end.y), this._config.shape === "vector") {
			let e = mi(this.rootSVG, this.name, 10);
			this.shape.marker("end", e);
		}
		return this.fill().stroke(), this.shape;
	}
};
function yi(e) {
	let t = e.split(/([+-]?[0-9./]*[xy]?)/).filter((e) => e.trim() !== ""), n = bi(t, "x"), r = bi(t, "y"), i = hi(t.find((e) => !e.includes("x") && !e.includes("y")) ?? 0);
	return {
		a: +q([n], {})[0],
		b: +q([r], {})[0],
		c: +q([i], {})[0]
	};
}
function bi(e, t) {
	return e.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : hi(e.replace(t, "")))[0] ?? 0;
}
//#endregion
//#region src/figures/Point.ts
var Y = class extends G {
	constructor(e, t, n) {
		return super(e, t), this._pixels = {
			x: NaN,
			y: NaN
		}, this._config = Object.assign({
			size: 2,
			shape: "circle"
		}, n), this.computed(), this.shape = this._makeShape(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this._makeShape();
	}
	_pixels;
	get pixels() {
		return this._pixels;
	}
	set pixels(e) {
		this._pixels = e, this.shape.center(this._pixels.x, this._pixels.y);
	}
	get coordinates() {
		return li(this._pixels, this.graphConfig);
	}
	get size() {
		return this._config.size;
	}
	set size(e) {
		this._config.size = e, this._makeShape();
	}
	get x() {
		return this._pixels.x;
	}
	set x(e) {
		this._pixels.x = e, this.shape.center(e, this._pixels.y);
	}
	get y() {
		return this._pixels.y;
	}
	set y(e) {
		this._pixels.y = e, this.shape.center(this._pixels.x, e);
	}
	asCircle(e) {
		return this.config.shape = "circle", this.config.size = e ?? 2, this._makeShape(), this;
	}
	asCrosshair(e) {
		return this.config.shape = "crosshair", this.config.size = e ?? 10, this._makeShape(), this;
	}
	asSquare(e) {
		return this.config.shape = "square", this.config.size = e ?? 10, this._makeShape(), this;
	}
	computeLabel() {
		if (this.label?.config.text.includes("@")) {
			let e = li(this._pixels, this.graphConfig), t = Number(this.label.config.text.match(/@\.(\d+)/)?.[1] ?? 2);
			return this.label.config.text.replace("@", `(${ni(e.x, t)};${ni(e.y, t)})`);
		}
		return this.label?.config.text ?? this.name;
	}
	computed() {
		if (this._config.coordinates) {
			let { x: e, y: t } = this._config.coordinates;
			return this.pixels = W({
				x: this._coordToNumber(e),
				y: this._coordToNumber(t)
			}, this.graphConfig), this;
		}
		if (this._config.middle) {
			let e = this._config.middle.A, t = this._config.middle.B;
			return this.x = (e.x + t.x) / 2, this.y = (e.y + t.y) / 2, this;
		}
		if (this._config.projection) {
			let e = this._config.projection.point;
			if (this._config.projection.axis === "Ox") return this.x = e.x, this.y = this.graphConfig.origin.y, this;
			if (this._config.projection.axis === "Oy") return this.x = this.graphConfig.origin.x, this.y = e.y, this;
			if (this._config.projection.axis instanceof J) {
				let t = this._config.projection.axis, n = t.start.x, r = t.start.y, i = e.x - n, a = e.y - r, o = t.direction, s = i * o.x + a * o.y, c = o.x * o.x + o.y * o.y;
				this.x = n + s * o.x / c, this.y = r + s * o.y / c;
			}
		}
		if (this._config.intersection) {
			let e = this._config.intersection.A, t = this._config.intersection.B, n = e.math.intersection(t.math);
			if (n === null) return this;
			this.pixels = n;
		}
		if (this._config.intersectionWithCircle) {
			let e = this._config.intersectionWithCircle.A, t = this._config.intersectionWithCircle.B, n = this._config.intersectionWithCircle.index, r = e.intersectionWithLine(t);
			if (r === null) return this.pixels = {
				x: NaN,
				y: NaN
			}, this;
			this.pixels = r[n];
		}
		if (this._config.intersectionBetweenCircles) {
			let e = this._config.intersectionBetweenCircles.A, t = this._config.intersectionBetweenCircles.B, n = this._config.intersectionBetweenCircles.index, r = e.intersectionWithCircle(t);
			if (r === null) return this.pixels = {
				x: NaN,
				y: NaN
			}, this;
			this.show(), this.pixels = r[n];
		}
		if (this._config.symmetry) {
			let e = this._config.symmetry.A, t = this._config.symmetry.B;
			if (t instanceof J) {
				let n = new U(t.direction).normal, r = new U(e, t.start).projection(n);
				this.x = e.x + 2 * r.x, this.y = e.y + 2 * r.y;
			} else if (t === "Ox") this.x = e.x, this.y = 2 * this.graphConfig.origin.y - e.y;
			else if (t === "Oy") this.x = 2 * this.graphConfig.origin.x - e.x, this.y = e.y;
			else {
				let n = t.x, r = t.y, i = e.x - n, a = e.y - r;
				this.x = n - i, this.y = r - a;
			}
		}
		if (this._config.direction) {
			let { point: e, direction: t, distance: n } = this._config.direction;
			if (t === "Ox") return this.x = e.x + W(n, this.graphConfig), this.y = e.y, this;
			if (t === "Oy") return this.x = e.x, this.y = e.y - W(n, this.graphConfig), this;
			if (t instanceof J) {
				let r = new U(this._config.direction.perpendicular ? t.normal : t.direction).unit, i = W(n, this.graphConfig);
				return this.x = e.x + i * r.x, this.y = e.y + i * r.y, this;
			}
			if (t.A && t.B) {
				let r = new U(t.A, t.B);
				return this.x = e.x + n * r.x, this.y = e.y + n * r.y, this;
			}
		}
		if (this._config.evaluation) {
			let { fx: e, x: t } = this._config.evaluation;
			this.pixels = e.evaluate(this._coordToNumber(t));
		}
		return this;
	}
	moveLabel() {
		return this.label && this.label.move(this.x, this.y), this;
	}
	_makeShape() {
		switch (this.clear(), this.config.shape) {
			case "circle":
				this.shape = this.element.circle(this.size).center(this._pixels.x, this._pixels.y);
				break;
			case "square":
				this.shape = this.element.rect(this.size, this.size).center(this._pixels.x, this._pixels.y);
				break;
			case "crosshair": {
				let e = this.size / Math.sqrt(2);
				this.shape = this.element.path(`M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`).center(this._pixels.x, this._pixels.y);
				break;
			}
		}
		return this.fill().stroke(), this.shape;
	}
	_coordToNumber(e) {
		if (typeof e == "number") return e;
		if ("point" in e && "axis" in e) return e.point.coordinates[e.axis];
		if ("point1" in e && "point2" in e) return ii(e.point1.coordinates, e.point2.coordinates);
		throw Error(`${e} not recognized.`);
	}
}, xi = class extends G {
	_fx;
	constructor(e, t, n) {
		return super(e, t), this._config = Object.assign({
			expression: "",
			samples: this.graphConfig.axis.x.x,
			asymptoteThreshold: 10
		}, n), this.shape = this._makeShape(), this._fx = this._getExpression(), this._numExp = new oi(this._fx), this.computed(), this;
	}
	_numExp;
	get numExp() {
		return this._numExp;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	computed() {
		let e = this._getExpression();
		if (!e || e === "") return this;
		e !== this._fx && (this._fx = e, this._numExp = new oi(e));
		let t = this.graphConfig, n = -t.origin.x / t.axis.x.x - 1, r = (t.width - t.origin.x) / t.axis.x.x + 1, i = this._config.domain ?? {
			min: n,
			max: r
		}, a = this._config.image ?? {
			min: -Infinity,
			max: Infinity
		}, o = this._config.samples ?? t.axis.x.x, s = this._numExp, c = this._calculatePointsCoordinates(i, o, s, a, t), l = c[0], u = t.height * (this._config.asymptoteThreshold ?? 10), d = "";
		for (let e = 0; e < c.length; e++) {
			let { x: t, y: n } = c[e], r = e === 0 ? "M" : "L";
			isNaN(n) ? (r = "M", n = isNaN(l.y) ? (c[e + 1] ?? {
				x: NaN,
				y: NaN
			}).y > 0 ? -u : u : l.y > 0 ? -u : u) : e > 0 && Math.abs(n - l.y) > u && (r = "M"), l = {
				x: t,
				y: n
			}, d += `${r} ${t} ${n} `;
		}
		return this.shape.plot(d), this;
	}
	moveLabel() {
		return this;
	}
	evaluate(e, t) {
		return t === !0 ? {
			x: e,
			y: this._numExp.evaluate({ x: e })
		} : W({
			x: e,
			y: this._numExp.evaluate({ x: e })
		}, this.graphConfig);
	}
	follow(e, t) {
		let n = li({
			x: e,
			y: t
		}, this.graphConfig);
		return this.evaluate(n.x);
	}
	_getExpression() {
		if (typeof this._config.expression == "string") return this._config.expression;
		if (this._config.quadratic && this._config.quadratic.length === 3 && this._config.quadratic.every((e) => e instanceof Y)) {
			let [e, t, n] = this._config.quadratic.map((e) => e.coordinates);
			return gi(e, t, n);
		}
		return "";
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	_calculatePointsCoordinates(e, t, n, r, i = this.graphConfig) {
		let a = (this._config.tolerance ?? 1) ** 2, o = this._config.maxDepth ?? 6, s = i.height * (this._config.asymptoteThreshold ?? 10), c = i.origin.x, l = i.origin.y, u = i.axis.x.x, d = i.axis.y.y, f = { x: 0 }, p = (e) => {
			f.x = e;
			let t = n.evaluate(f), i = c + e * u;
			return isNaN(t) || t === Infinity || t === -Infinity || t < r.min || t > r.max ? {
				x: i,
				y: NaN
			} : {
				x: i,
				y: l + t * d
			};
		}, m = [], h = (e, t, n, r, i) => {
			if (i >= o || isNaN(t.y) || isNaN(r.y) || Math.abs(t.y - r.y) > s) return;
			let c = (e + n) / 2, l = p(c);
			if (isNaN(l.y)) {
				m.push(l);
				return;
			}
			let u = r.x - t.x, d = r.y - t.y, f = u * u + d * d, g;
			if (f === 0) g = (l.x - t.x) ** 2 + (l.y - t.y) ** 2;
			else {
				let e = Math.max(0, Math.min(1, ((l.x - t.x) * u + (l.y - t.y) * d) / f));
				g = (l.x - (t.x + e * u)) ** 2 + (l.y - (t.y + e * d)) ** 2;
			}
			if (g <= a) {
				m.push(l);
				return;
			}
			h(e, t, c, l, i + 1), m.push(l), h(c, l, n, r, i + 1);
		}, g = 1 / t, _ = e.min, v = p(_);
		m.push(v);
		for (let t = e.min + g; t <= e.max; t += g) {
			let e = p(t);
			h(_, v, t, e, 0), m.push(e), _ = t, v = e;
		}
		return m;
	}
}, Si = class extends G {
	constructor(e, t, n) {
		super(e, t), this._config = Object.assign({
			figures: [],
			property: "fixed",
			center: {
				x: 0,
				y: 0
			},
			radius: 1
		}, n), this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this._makeShape();
	}
	get center() {
		return this._config.center;
	}
	get radius() {
		return typeof this._config.radius == "number" ? W(this._config.radius, this.graphConfig) : ii(this.center, this._config.radius);
	}
	computed() {
		let e = this.shape;
		return e.radius(this.radius), e.center(this.center.x, this.center.y), this;
	}
	moveLabel() {
		return this.label && this.label.move(this.center.x + this.radius / 2, this.center.y - this.radius / 2), this;
	}
	follow(e, t) {
		let n = this.radius, r = e - this.center.x, i = t - this.center.y, a = Math.sqrt(r ** 2 + i ** 2);
		return e = r / a * n + this.center.x, t = i / a * n + this.center.y, {
			x: e,
			y: t
		};
	}
	intersectionWithLine(e, t) {
		let { x: n, y: r } = this.center, { x: i, y: a } = e.start, { x: o, y: s } = e.end, c = o - i, l = s - a, u = i - n, d = a - r, f = c * c + l * l, p = 2 * (c * u + l * d), m = u * u + d * d - this.radius * this.radius, h = p * p - 4 * f * m;
		if (h < 0) return null;
		let g = [], _ = Math.sqrt(h), v = (-p - _) / (2 * f), ee = (-p + _) / (2 * f);
		for (let e of [v, ee]) t && (e < 0 || e > 1) || g.push({
			x: i + e * c,
			y: a + e * l
		});
		return g;
	}
	intersectionWithCircle(e) {
		let { x: t, y: n } = this.center, { x: r, y: i } = e.center, a = this.radius, o = e.radius, s = r - t, c = i - n, l = Math.hypot(s, c);
		if (l > a + o || l < Math.abs(a - o) || l === 0) return null;
		let u = (a * a - o * o + l * l) / (2 * l), d = Math.sqrt(a * a - u * u), f = t + u * s / l, p = n + u * c / l, m = -c * (d / l), h = d / l * s, g = {
			x: f + m,
			y: p + h
		}, _ = {
			x: f - m,
			y: p - h
		};
		return Math.abs(d) < 1e-10 ? [g] : [g, _];
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
	}
}, Ci = class extends G {
	constructor(e, t, n) {
		super(e, t), this._config = Object.assign({ shape: "polygon" }, n), this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this._makeShape();
	}
	get vertices() {
		return this._config.vertices;
	}
	get radius() {
		return this._config.regular ? typeof this._config.regular.radius == "number" ? W(this._config.regular.radius, this.graphConfig) : this._config.vertices && B(this._config.vertices[0]) && B(this._config.regular.radius) ? ii(this._config.vertices[0], this._config.regular.radius) : 0 : this.graphConfig.axis.x.x;
	}
	_figuresXYtoArray() {
		let e = [];
		return this._config.vertices?.forEach((t) => {
			B(t) && e.push([t.x, t.y]);
		}), e;
	}
	_makeShape() {
		this.element.clear();
		let e = this._figuresXYtoArray();
		if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), this._config.mark) {
			let t = this._config.mark.center?.length ?? 0, n = e.reduce((e, t) => (e.x += t[0], e.y += t[1], e), {
				x: 0,
				y: 0
			});
			n.x /= e.length, n.y /= e.length, e.forEach((e) => {
				let r = new U(n, {
					x: e[0],
					y: e[1]
				});
				t && r.setLength(t * 20), this.element.line(n.x, n.y, n.x + r.x, n.y + r.y).stroke({
					color: "gray",
					width: .5
				});
			});
		}
		return this.shape;
	}
	computed() {
		let e = this.shape;
		if (this._config.vertices && this._config.vertices.length > 2) e.plot(this._figuresXYtoArray());
		else if (this._config.regular) {
			let t = [], n = this.radius, r = new U(this._config.regular.center, B(this._config.regular.radius) ? this._config.regular.radius : {
				x: this._config.regular.center.x,
				y: this._config.regular.center.y - n
			});
			for (let e = 0; e < this._config.regular.sides; e++) t.push([this._config.regular.center.x + r.x, this._config.regular.center.y + r.y]), r.rotate(360 / this._config.regular.sides);
			e.plot(t);
		}
		return this;
	}
	update() {
		return this.computed(), this;
	}
	moveLabel() {
		return this;
	}
}, wi = class extends G {
	constructor(e, t, n) {
		return super(e, t), this.static = !0, this._config = Object.assign({
			...this.graphConfig,
			subdivisions: 0
		}, n), this.shape = this._makeShape(), this.computed(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	computed() {
		let e = [...this._computeLines(this._config.axis.x, this._config.axis.y), ...this._computeLines(this._config.axis.y, this._config.axis.x)].reduce((e, t) => {
			let [n, r] = t;
			return e + `M${n.x},${n.y} L${r.x},${r.y}`;
		}, "");
		return this.shape.plot(e), this;
	}
	moveLabel() {
		return this;
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
	}
	_computeLines(e, t) {
		let n = +this._config.origin.x, r = +this._config.origin.y, i = [], a = ui({
			x: n,
			y: r
		}, e, this._config.width, this._config.height), o = (this._config.width + this._config.height) / 2, s = 0;
		for (; s < o && (a && i.push(a), n += t.x, r -= t.y, a = ui({
			x: n,
			y: r
		}, e, this._config.width, this._config.height), !(a === null && (n > this._config.width || r > this._config.height)));) {
			if (i.length > 1e3) throw Error("Too many lines");
			s++;
		}
		for (n = this._config.origin.x - t.x, r = this._config.origin.y + t.y, a = ui({
			x: n,
			y: r
		}, e, this._config.width, this._config.height), s = 0; s < o && (a && i.push(a), n -= t.x, r += t.y, a = ui({
			x: n,
			y: r
		}, e, this._config.width, this._config.height), !(a === null && (n < 0 || r < 0)));) {
			if (i.length > 1e3) throw Error("Too many lines");
			s++;
		}
		return i;
	}
}, Ti = class extends G {
	constructor(e, t, n) {
		super(e, t), this._config = Object.assign({
			start: {
				x: 0,
				y: 0
			},
			center: {
				x: 10,
				y: 10
			},
			end: {
				x: 0,
				y: 10
			},
			radius: this.graphConfig.axis.x.x,
			morphToSquare: !0,
			sector: !1,
			acute: !1
		}, n), this.config = n;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this._makeShape(), this.computed();
	}
	get center() {
		return this._config.center;
	}
	get start() {
		return this._config.start;
	}
	get end() {
		return this._config.end;
	}
	get radius() {
		return typeof this._config.radius == "number" ? W(this._config.radius, this.graphConfig) : ii(this.center, this._config.radius ?? this._config.start);
	}
	get angle() {
		let { start: e, end: t } = this.getAngles();
		return t - e < 0 ? 360 + t - e : t - e;
	}
	get isSquare() {
		return ni((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
	}
	computed() {
		return this.shape.plot(this.getPath()), this;
	}
	moveLabel() {
		if (!this.label) return this;
		let e = this.radius, t = this.angle < 180 ? 1 : -1, n = new U(this.center, this.start).unit, r = new U(this.center, this.end).unit, i = n.add(r).unit, a = this.center.x + t * i.x * (e + 20), o = this.center.y + t * i.y * (e + 20);
		return t * i.x > 0 && t * i.y > 0 ? this.label.config.alignement = "mr" : t * i.x < 0 && t * i.y > 0 ? this.label.config.alignement = "ml" : t * i.x > 0 && t * i.y < 0 ? this.label.config.alignement = "mr" : t * i.x < 0 && t * i.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, o), this;
	}
	getAngles() {
		return {
			start: +fi(this.center, this.start).toFixed(10),
			end: +fi(this.center, this.end).toFixed(10)
		};
	}
	getPath() {
		let { start: e, end: t } = this.getAngles(), n = this._config.morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = di(this.center.x, this.center.y, n, e), i = di(this.center.x, this.center.y, n, t);
		return this._config.morphToSquare && this.isSquare ? this._describeSquare(this.center, r, i) : this._describeArc(this.center, r, i, n, t - e);
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	_describeSquare(e, t, n) {
		let r = [
			"M",
			t.x,
			t.y,
			"l",
			n.x - e.x,
			n.y - e.y,
			"L",
			n.x,
			n.y
		];
		return r = this._describe_add_sector(r, e, t), r.join(" ");
	}
	_describe_add_sector(e, t, n) {
		return this._config.sector && (e = e.concat([
			"L",
			t.x,
			t.y,
			"L",
			n.x,
			n.y
		])), e;
	}
	_describeArc(e, t, n, r, i) {
		let a = (i + 360) % 360 <= 180 ? 0 : 1, o = 0;
		this.config.acute && i > 180 && (a = (a + 1) % 2, o = 1);
		let s = [
			"M",
			t.x,
			t.y,
			"A",
			r,
			r,
			0,
			a,
			o,
			n.x,
			n.y
		];
		return s = this._describe_add_sector(s, e, t), s.join(" ");
	}
}, Ei = class extends G {
	_axis;
	constructor(e, t, n) {
		return super(e, t), this.static = !0, Object.values(Yr).includes(n) ? this._config = this._defaultConfig(n) : this._config = n, this._axis = this._makeShape(), this.computed(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	get xAxis() {
		return this._axis.x;
	}
	get yAxis() {
		return this._axis.y;
	}
	computed() {
		return this._updateAxis(this._axis.x, this._config.x.direction, this._config.x), this._updateAxis(this._axis.y, this._config.y.direction, this._config.y), this;
	}
	moveLabel() {
		throw Error("Method not implemented.");
	}
	_defaultConfig(e) {
		return Yr.POLAR, {
			x: {
				direction: this.graphConfig.axis.x,
				color: "black",
				padding: 20,
				half: !1,
				length: 0
			},
			y: {
				direction: this.graphConfig.axis.y,
				color: "black",
				padding: 20,
				half: !1,
				length: 0
			}
		};
	}
	_makeShape() {
		this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
		let e = {
			x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
			y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
		};
		return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
	}
	_updateAxis(e, t, n) {
		let r = n?.color ?? "black", i = n?.padding ?? 0, a = n?.half ?? !1, o = n?.length ?? 0, s = mi(this.rootSVG, `axis-${t.x}-${t.y}`, 10).fill(r), c = ui(this.graphConfig.origin, t, this.graphConfig.width, this.graphConfig.height, i, a, o);
		return c !== null && e.plot(c[0].x, c[0].y, c[1].x, c[1].y), e.stroke({
			color: r,
			width: 1
		}).marker("end", s), this.shape.add(e), e;
	}
}, Di = class extends G {
	_numExp;
	constructor(e, t, n) {
		return super(e, t), this._config = Object.assign({ expressions: {
			x: "",
			y: ""
		} }, n), this._numExp = {
			x: new oi(this._config.expressions.x),
			y: new oi(this._config.expressions.y)
		}, this.shape = this._makeShape(), this.computed(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	computed() {
		let e = this._config.samples ?? this.graphConfig.axis.x.x, t = this._config.domain ?? {
			min: -2 * Math.PI,
			max: 2 * Math.PI
		}, n = [];
		for (let r = t.min; r < t.max; r += 1 / e) {
			let { x: e, y: t } = this.evaluate(r);
			n.push({
				x: e,
				y: t
			});
		}
		let r = n.map(({ x: e, y: t }, n) => `${n === 0 ? "M" : "L"} ${e} ${t}`).join(" ");
		return this.shape.plot(r), this;
	}
	moveLabel() {
		return this;
	}
	evaluate(e) {
		return W({
			x: this._numExp.x.evaluate({ t: e }),
			y: this._numExp.y.evaluate({ t: e })
		}, this.graphConfig);
	}
}, Oi = class extends G {
	_reference;
	_delta;
	_point;
	_tangent;
	constructor(e, t, n) {
		return super(e, t), this._config = Object.assign({ size: 10 }, n), this.appearance.fill.color = "black", this._reference = this._config.follow.follow(0, 0), this._delta = {
			x: 0,
			y: 0
		}, this._tangent = this.element.line(), this._point = this.element.circle(this._config.size).center(this._reference.x, this._reference.y), this.shape = this._makeShape(), this.computed(), this.rootSVG.on("mousemove", (e) => {
			let t = this.rootSVG.node.createSVGPoint();
			t.x = e.clientX, t.y = e.clientY, t = t.matrixTransform(this.rootSVG.node.getScreenCTM()?.inverse());
			let n = this._config.follow.follow(t.x, t.y);
			isNaN(n.y) ? this._point.hide() : (this._point.show(), this._point.center(n.x, n.y), this._reference = n, this._delta = this._config.follow.follow(t.x + .01, t.y + .01), this.computed());
		}), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	_makeShape() {
		return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	computed() {
		let e = ui(this._reference, {
			x: this._delta.x - this._reference.x,
			y: this._delta.y - this._reference.y
		}, this.graphConfig.width, this.graphConfig.height);
		return e === null || this._tangent.plot(e[0].x, e[0].y, e[1].x, e[1].y), this;
	}
	moveLabel() {
		return this;
	}
	strokeable() {
		return [this._tangent];
	}
	fillable() {
		return [this._point];
	}
}, ki = class extends G {
	constructor(e, t, n) {
		return super(e, t), this._config = Object.assign({ samples: 100 }, n), this.shape = this._makeShape(), this.computed(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	get domain() {
		return this._config.domain ? W(this._config.domain, this.graphConfig) : {
			min: 0,
			max: this.graphConfig.width
		};
	}
	get image() {
		return this._config.image ? W(this._config.image, this.graphConfig, "y") : {
			min: 0,
			max: this.graphConfig.height
		};
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	computed() {
		let [e, t] = this._config.expressions, n = this.domain;
		this.image;
		function r(e, t) {
			let [n, r, i] = e;
			return `${t === 0 ? "M" : n} ${r ?? 0} ${i ?? 0}`;
		}
		let i = e.shape.array().filter((e) => {
			let t = e[1];
			return t !== void 0 && t >= n.min && t <= n.max;
		}).map(r), a = [];
		return a = t ? [...t.shape.array()].filter((e) => {
			let t = e[1];
			return t !== void 0 && t >= n.min && t <= n.max;
		}).map(r).reverse() : [`m ${n.min} 0`], this.shape.plot(`${i.join(" ")} ${a.join(" ")} Z`), this;
	}
	moveLabel() {
		return this;
	}
}, Ai = class extends G {
	constructor(e, t, n) {
		super(e, t), this._config = Object.assign({}, n), this.shape = this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e, this.computed();
	}
	get rectangles() {
		return this._config.rectangles;
	}
	set rectangles(e) {
		this._config.rectangles = e > 0 ? e : 10;
	}
	get position() {
		return this._config.position < 0 && (this._config.position = 0), this._config.position > 1 && (this._config.position = 1), this._config.position;
	}
	set position(e) {
		e < 0 && (e = 0), e > 1 && (e = 1), this._config.position = e;
	}
	_makeShape() {
		return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	computed() {
		this.shape.clear();
		let e = W(this._config.domain, this.graphConfig), t = (e.max - e.min) / this._config.rectangles, n = (this._config.domain.max - this._config.domain.min) / this._config.rectangles, r = this.graphConfig.origin.y;
		for (let i = 0; i < this._config.rectangles; i += 1) {
			let a = e.min + i * t, o = this._config.domain.min + (i + this.position) * n, s = this._config.follow.evaluate(o).y;
			this.shape.add(this.element.rect(t, Math.abs(r - s)).move(a, s));
		}
		return this;
	}
	moveLabel() {
		return this;
	}
}, ji = class extends G {
	constructor(e, t, n) {
		super(e, t), n && (this._d = n, this.computed(), this._makeShape());
	}
	_d = "";
	get d() {
		return this._d;
	}
	set d(e) {
		this._d = e, this.shape.plot(this._d);
	}
	computed() {
		return this;
	}
	moveLabel() {
		throw Error("Method not implemented.");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path(this._d).fill("none").stroke({
			color: "black",
			width: 1
		}), this.shape;
	}
};
//#endregion
//#region src/functions/computedBezier.ts
function Mi(e) {
	return e.reduce((e, t, n, r) => n === 0 ? `M ${t.point.x},${t.point.y}` : `${e} ${Fi(t, n, r)}`, "");
}
function Ni(e, t) {
	let n = t.point.x - e.point.x, r = t.point.y - e.point.y;
	return {
		length: Math.sqrt(n ** 2 + r ** 2),
		angle: Math.atan2(r, n)
	};
}
function Pi(e, t, n, r) {
	let i = t ?? e, a = n ?? e, o = e.controls.ratio ?? .2, s = Ni(i, a), c = s.angle + (r ? Math.PI : 0), l = s.length * o;
	return e.controls.type === H.VERTICAL || e.controls.type === H.DOWN ? c = Math.PI / 2 + (r ? Math.PI : 0) : e.controls.type === H.UP ? c = Math.PI / 2 + (r ? 0 : Math.PI) : e.controls.type === H.HORIZONTAL || e.controls.type === H.RIGHT ? c = r ? Math.PI : 0 : e.controls.type === H.LEFT && (c = r ? 0 : Math.PI), [e.point.x + Math.cos(c) * l, e.point.y + Math.sin(c) * l];
}
function Fi(e, t, n) {
	let [r, i] = Pi(n[t - 1], n[t - 2], e), [a, o] = Pi(e, n[t - 1], n[t + 1], !0);
	return `C ${r},${i} ${a},${o} ${e.point.x},${e.point.y}`;
}
//#endregion
//#region src/figures/Bezier.ts
var Ii = class extends G {
	constructor(e, t, n) {
		super(e, t), this._config = n, this._points = [], this.points = n.points, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e;
	}
	_points;
	get points() {
		return this._points;
	}
	set points(e) {
		let t = {
			type: H.SMOOTH,
			ratio: .2,
			left: null,
			right: null
		};
		this._points = e, this._points.forEach((e) => {
			e.controls = Object.assign({}, t, e.controls);
		});
	}
	computed() {
		let e = Mi(this._points);
		return this.shape.plot(e), this;
	}
	getPointByName(e) {
		return this._points.find((t) => t.point.name === e);
	}
	moveLabel() {
		if (!this.label) return this;
		throw Error("Method not implemented.");
	}
	setControlRatio(e, t) {
		let n = this.getPointByName(e);
		return n && (n.controls.ratio = t), this;
	}
	setControlType(e, t) {
		let n = this.getPointByName(e);
		return n && (n.controls.type = t), this;
	}
	_makeShape() {
		return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
	}
}, Li = /* @__PURE__ */ function(e) {
	return e.RESET = "reset", e.REVERSE = "reverse", e.NONE = "none", e;
}({}), Ri = class {
	_graph;
	_animatedPoints = [];
	_startTime = 0;
	_elapsedAtPause = 0;
	_paused = !1;
	_rafId = null;
	_animations = /* @__PURE__ */ new Map();
	constructor(e) {
		this._graph = e, this._updatePoints();
	}
	start() {
		this.cancel(), this._paused = !1, this._startTime = 0, this._elapsedAtPause = 0, this._animations.forEach((e) => {
			e.startTime = 0;
		}), this._rafId = requestAnimationFrame(this._step);
	}
	pause() {
		this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._paused = !0, this._elapsedAtPause = performance.now();
	}
	resume() {
		if (this._paused) {
			let e = performance.now() - this._elapsedAtPause;
			this._animations.forEach((t) => {
				t.startTime += e;
			}), this._paused = !1, this._rafId = requestAnimationFrame(this._step);
		}
	}
	cancel() {
		this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._paused = !1, this._elapsedAtPause = 0, this._startTime = 0, setTimeout(() => {
			this._graph.update(), this._updatePoints();
		}, 200);
	}
	isRunning() {
		return this._rafId !== null && !this._paused;
	}
	isPaused() {
		return this._paused;
	}
	canBeAnimated() {
		return this._animations.size > 0;
	}
	_updatePoints() {
		return this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [], Object.values(this._graph.figures).forEach((e) => {
			if (B(e) && e.animate !== null) {
				let t = e.animate, n = e, r = t.from, i = t.to;
				this._animations.set(e.name, {
					point: n,
					from: {
						x: +r.pixels.x,
						y: +r.pixels.y
					},
					to: {
						x: +i.pixels.x,
						y: +i.pixels.y
					},
					duration: t.duration * 1e3,
					ease: (e) => e,
					loop: t.loop,
					reverse: !1,
					delay: t.delay * 1e3,
					startTime: 0
				}), this._animatedPoints.push(e.name);
			}
		}), this._animatedPoints;
	}
	_step = (e) => {
		if (this._startTime === 0 && (this._startTime = e - this._elapsedAtPause), this._paused) return;
		let t = !1;
		for (let n of this._animations.values()) {
			n.startTime === 0 && (n.startTime = this._startTime);
			let r = e - n.startTime;
			if (r < n.delay) {
				n.point.x = n.from.x, n.point.y = n.from.y, t = !0;
				continue;
			}
			let i = r - n.delay, a = Math.min(i / n.duration, 1), o = n.ease(a);
			n.point.x = n.from.x + (n.to.x - n.from.x) * o, n.point.y = n.from.y + (n.to.y - n.from.y) * o, a < 1 ? t = !0 : n.loop === "reset" ? (n.point.x = n.from.x, n.point.y = n.from.y, n.startTime = e, t = !0) : n.loop === "reverse" && ([n.from, n.to] = [n.to, n.from], n.startTime = e, t = !0);
		}
		this._graph.update(this._animatedPoints), t ? this._rafId = requestAnimationFrame(this._step) : this._rafId = null;
	};
};
function zi(e) {
	return e === !0 || e === "1" || e === 1 ? "reset" : typeof e == "string" && Object.values(Li).includes(e) ? e : "none";
}
//#endregion
//#region src/Graph.ts
var Bi = class {
	_Animate = null;
	constructor(e, t) {
		let n = document.createElement("DIV");
		n.style.position = "relative", n.style.width = "100%", n.style.height = "auto", n.style.userSelect = "none", typeof e == "string" ? document.getElementById(e)?.appendChild(n) : e.appendChild(n);
		let r = t?.ppu ?? 50;
		return this._config = Object.assign({
			width: 800,
			height: 600,
			origin: {
				x: 400,
				y: 300
			},
			system: Yr.CARTESIAN_2D,
			axis: {
				x: {
					x: r,
					y: 0
				},
				y: {
					x: 0,
					y: -r
				}
			}
		}, t), this._toTex = t?.tex ?? ((e) => e), this._display = Object.assign({
			grid: !0,
			subgrid: 0,
			axis: !0
		}, t?.display), this._rootSVG = Kr().addTo(n).viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
			width: this._config.width,
			height: this._config.height,
			origin: this._config.origin,
			axis: this._config.axis
		}), this._layers = {}, Object.values(qr).forEach((e) => {
			this._layers[e] = this._rootSVG.group().attr("id", `LAYER_${e}`);
		}), this._figures = {}, this._makeLayout(), this;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		this._config = e;
	}
	_display;
	get display() {
		return this._display;
	}
	set display(e) {
		this._display = e;
	}
	_figures;
	get figures() {
		return this._figures;
	}
	_layers;
	get layers() {
		return this._layers;
	}
	_rootSVG;
	get rootSVG() {
		return this._rootSVG;
	}
	_toTex;
	get toTex() {
		return this._toTex;
	}
	get create() {
		return {
			point: (e, t, n) => {
				let r = {};
				r = B(e) ? { coordinates: e } : e;
				let i = new Y(this._rootSVG, t, r);
				return this._layers.points.add(i.element), this._figures[t] = i, n && i.addLabel(t, n.html, this._toTex), i;
			},
			line: (e, t) => {
				let n = new J(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			path: (e, t) => {
				let n = new ji(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			bezier: (e, t) => {
				let n = new Ii(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			plot: (e, t) => {
				let n = new xi(this._rootSVG, t, e);
				return this._layers.plots.add(n.element), this._figures[t] = n, n;
			},
			parametric: (e, t) => {
				let n = new Di(this._rootSVG, t, e);
				return this._layers.plots.add(n.element), this._figures[t] = n, n;
			},
			circle: (e, t) => {
				let n = new Si(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			polygon: (e, t) => {
				let n = new Ci(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			arc: (e, t) => {
				let n = new Ti(this._rootSVG, t, e);
				return this._layers.main.add(n.element), this._figures[t] = n, n;
			},
			follow: (e, t) => {
				let n = new Oi(this._rootSVG, t, e);
				return this._layers.plots_FG.add(n.element), this._figures[t] = n, n;
			},
			fillbetween: (e, t) => {
				let n = new ki(this._rootSVG, t, e);
				return this._layers.plots_BG.add(n.element), this._figures[t] = n, n;
			},
			riemann: (e, t) => {
				let n = new Ai(this._rootSVG, t, e);
				return this._layers.plots_BG.add(n.element), this._figures[t] = n, n;
			}
		};
	}
	get animation() {
		return this._Animate ||= new Ri(this), this._Animate;
	}
	clear() {
		Object.keys(this.figures).forEach((e) => {
			this.figures[e].element.remove();
		}), this._figures = {};
	}
	coordinate_system(e) {
		let t = new Ei(this._rootSVG, "COORDINATE_SYSTEM", e);
		return this._layers.axis.add(t.element), t;
	}
	draggable(e, t) {
		return this._layers.interactive.add(e.element), e.isDraggable = !0, e.shape.draggable().on("dragmove", (n) => {
			let r = e, { box: i } = n.detail, { x: a, y: o } = i;
			if (n.preventDefault(), a < 0 || a > this._config.width - i.width / 2 || o < 0 || o > this._config.height - i.height / 2) return;
			if (t?.follow?.length) {
				let e = {
					x: a,
					y: o
				};
				t.follow.forEach((t) => {
					e = t instanceof G ? t.follow(a, o) : typeof t == "string" ? this.follow(t, r)(a, o) : t(a, o), a = e.x, o = e.y;
				});
			}
			if (r.pixels.x === a && r.pixels.y === o) return;
			r.pixels = {
				x: a,
				y: o
			};
			let s = t?.target ?? null;
			s instanceof Y && (s.pixels = {
				x: a,
				y: o
			}), t?.callback && t.callback(e);
			let c = [e.name];
			s && c.push(s.name), this.update(c);
		}), e;
	}
	follow(e, t) {
		return e === "Ox" ? (e) => ({
			x: e,
			y: t.y
		}) : e === "Oy" ? (e, n) => ({
			x: t.x,
			y: n
		}) : e === "grid" ? (e, t) => {
			let n = this._config.axis.x.x, r = this._config.axis.y.y;
			return e = Math.round(e / n) * n, t = Math.round(t / r) * r, {
				x: e,
				y: t
			};
		} : (e, t) => ({
			x: e,
			y: t
		});
	}
	grid(e, t) {
		let n = new wi(this._rootSVG, e, {
			axis: t,
			origin: this._config.origin,
			width: this._config.width,
			height: this._config.height,
			subdivisions: 0
		});
		return this._layers.grids.add(n.element), n;
	}
	subgrid(e, t) {
		let n = {
			x: {
				x: this._config.axis.x.x / t,
				y: this._config.axis.x.y / t
			},
			y: {
				x: this._config.axis.y.x / t,
				y: this._config.axis.y.y / t
			}
		};
		return this.grid(e, n);
	}
	toPixels(e, t) {
		return W(e, this.config, t);
	}
	toCoordinates(e, t) {
		return li(e, this.config, t);
	}
	update(e, t) {
		e ??= [], Object.keys(this.figures).forEach((t) => {
			let n = `${t}_drag`;
			n in this.figures && e.push(t, n);
		}), this.updateLabels(e, t);
	}
	updateLabels(e, t) {
		Object.keys(this.figures).forEach((n) => {
			e.includes(n) ? this.figures[n].updateLabel() : this.figures[n].update(t);
		});
	}
	updateLayout() {
		this._rootSVG.viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
			width: this._config.width,
			height: this._config.height,
			origin: this._config.origin,
			axis: this._config.axis
		}), this._makeLayout(), this.update([], !0);
	}
	_makeLayout() {
		if (this._layers.grids.clear(), this._layers.axis.clear(), this._display.subgrid && this.subgrid("SUBGRID", this._display.subgrid).stroke("purple/0.5", .1), this._display.grid) if (this._display.grid === !0) this.grid("MAINGRID", this._config.axis).stroke("lightgray", 1);
		else {
			let { x: e, y: t } = this._display.grid;
			e !== void 0 && t !== void 0 && this.grid("MAINGRID", {
				x: {
					x: this._config.axis.x.x * e,
					y: this._config.axis.x.y * t
				},
				y: {
					x: this._config.axis.y.x * e,
					y: this._config.axis.y.y * t
				}
			}).stroke("lightgray", 1);
		}
		this._display.axis && this.coordinate_system(this._config.system);
	}
}, Vi = (e) => {
	throw TypeError(e);
}, Hi = (e, t, n) => t.has(e) || Vi("Cannot " + n), X = (e, t, n) => (Hi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Ui = (e, t, n) => t.has(e) ? Vi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Z = (e, t, n, r) => (Hi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Wi = (e, t, n) => (Hi(e, t, "access private method"), n);
function Gi(e) {
	if (e === "") return !0;
	if (!isNaN(Number(e))) return parseFloat(e);
	if (/^[-.\d]+\/[-.\d]+$/.exec(e)) {
		let [t, n] = e.split("/").map(Number);
		return t / n;
	}
	if (/^[-.\d]+;[-.\d]+$/.exec(e)) {
		let [t, n] = e.split(";").map(Number);
		return {
			x: t,
			y: n
		};
	}
	if (/^[-.\d]+:[-.\d]+(:[xy])?$/.exec(e)) {
		let [t, n, r] = e.split(":"), i = Number(t), a = Number(n);
		return {
			min: Math.min(i, a),
			max: Math.max(i, a),
			axis: r ?? "x"
		};
	}
	if (/^[-.\d]+:[-.\d]+:[.\d]+$/.exec(e)) {
		let [t, n, r] = e.split(":").map(Number), i = Number(t), a = Number(n), o = Number(r), s = (a - i) / 100;
		return {
			min: Math.min(t, n),
			max: Math.max(t, n),
			step: Math.max(o, s)
		};
	}
	return e.startsWith("[") && e.endsWith("]") ? e.slice(1, -1).split(",").map(Gi) : e;
}
function Ki(e, t) {
	return e.replace(RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function qi(e) {
	if (!e.includes("=")) return {
		key: e,
		value: ""
	};
	let [t, ...n] = e.split("=");
	return {
		key: t,
		value: n.join("=")
	};
}
var Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na = class {
	constructor(e) {
		Ui(this, $i), Ui(this, Ji), Ui(this, Yi, "->"), Ui(this, Xi, ","), Ui(this, Zi, "/"), Ui(this, Qi, []);
		var t, n, r;
		e && (Z(this, Ji, e.formatter ?? void 0), (t = e.splitter) != null && t.main && Z(this, Yi, e.splitter.main), (n = e.splitter) != null && n.entry && Z(this, Xi, e.splitter.entry), (r = e.splitter) != null && r.parameter && Z(this, Zi, e.splitter.parameter), e.keys && Z(this, Qi, e.keys));
	}
	get splitter() {
		return {
			main: X(this, Yi),
			entry: X(this, Xi),
			parameter: X(this, Zi)
		};
	}
	set splitter_main(e) {
		Z(this, Yi, e);
	}
	set splitter_entry(e) {
		Z(this, Xi, e);
	}
	set splitter_parameter(e) {
		Z(this, Zi, e);
	}
	get formatter() {
		return X(this, Ji);
	}
	set formatter(e) {
		Z(this, Ji, e);
	}
	get keys() {
		return X(this, Qi);
	}
	set keys(e) {
		Z(this, Qi, e);
	}
	parse(e) {
		let [t, n] = e.split(X(this, Yi)), r = X(this, Ji) ? X(this, Ji).call(this, t) : t.trim(), { name: i, key: a, values: o } = Wi(this, $i, ea).call(this, r);
		return {
			name: i,
			key: a,
			values: o,
			parameters: Wi(this, $i, ta).call(this, n)
		};
	}
	parameters(e, t) {
		return Wi(this, $i, ta).call(this, e, t ?? X(this, Qi));
	}
};
Ji = /* @__PURE__ */ new WeakMap(), Yi = /* @__PURE__ */ new WeakMap(), Xi = /* @__PURE__ */ new WeakMap(), Zi = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakSet(), ea = function(e) {
	let [t, ...n] = e.split(" "), [r, i] = t.split("=");
	return {
		name: r,
		key: i,
		values: Ki(n.join(" "), X(this, Xi)).map((e) => Gi(e))
	};
}, ta = function(e, t) {
	if (e === void 0) return {};
	let n;
	if (t === void 0 || t.length === 0) n = Ki(e, X(this, Xi));
	else {
		let r = Ki(e, X(this, Xi)), i = t.map((e) => `${e}=`);
		n = [], r.forEach((e) => {
			if (t.includes(e)) n.push(e);
			else if (e.includes("=")) {
				let t = e.split("=")[0] + "=";
				i.includes(t) && n.push(e);
			} else n[n.length - 1].includes("=") ? n[n.length - 1] += `,${e}` : n.push(e);
		});
	}
	let r = {};
	return n.forEach((e) => {
		let { key: t, value: n } = qi(e);
		if (/^[-.\d]+\/[-.\d]+$/.exec(n)) {
			r[t] = {
				value: Gi(n),
				options: []
			};
			return;
		}
		let [i, ...a] = n.split(X(this, Zi));
		r[t] = {
			value: Gi(i),
			options: a.map((e) => Gi(e))
		};
	}), r;
};
//#endregion
//#region src/parser/buildCircle.ts
function ra(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.CIRCLE.toString() && r.length >= 2) {
		let [e, t] = r;
		if (e instanceof Y && (t instanceof Y || typeof t == "number")) return {
			create: "circle",
			config: {
				center: e,
				radius: t
			}
		};
	}
	return null;
}
function ia(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.ARC.toString() && r.length >= 3) {
		let [t, n, i, a] = r;
		if (t instanceof Y && n instanceof Y && i instanceof Y) return {
			create: "arc",
			config: {
				start: t,
				center: n,
				end: i,
				radius: a,
				morphToSquare: e.parameters?.square?.value ?? !1,
				sector: e.parameters?.sector?.value ?? !1,
				acute: e.parameters?.acute?.value ?? !1
			}
		};
	}
	return null;
}
//#endregion
//#region src/parser/buildLine.ts
var Q = "line";
function $(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.LINE.toString() || e.key === K.SEGMENT.toString() || e.key === K.VECTOR.toString() || e.key === K.RAY.toString() && r.length === 2) {
		let [t, n] = r;
		if (t instanceof Y && n instanceof Y) {
			let r = "line";
			switch (e.key) {
				case K.SEGMENT.toString():
					r = "segment";
					break;
				case K.VECTOR.toString():
					r = "vector";
					break;
				case K.RAY.toString():
					r = "ray";
					break;
			}
			return {
				create: Q,
				config: {
					through: {
						A: t,
						B: n
					},
					shape: r
				}
			};
		}
		if (t instanceof Y && (typeof n == "number" || typeof n == "string")) return {
			create: Q,
			config: {
				slope: {
					A: t,
					slope: +n
				},
				shape: "line"
			}
		};
	}
	if (e.key === K.LINE.toString() && r.length === 1) return {
		create: Q,
		config: { equation: r[0] }
	};
	if (e.key === K.MEDIATOR.toString() && r.length === 2) {
		let [e, t] = r;
		if (e instanceof Y && t instanceof Y) return {
			create: Q,
			config: { mediator: {
				A: e,
				B: t
			} }
		};
	}
	if (e.key === K.PERPENDICULAR.toString() && r.length === 2) {
		let [e, t] = r;
		if ((e instanceof J || e === "Ox" || e === "Oy") && t instanceof Y) return {
			create: Q,
			config: { perpendicular: {
				to: e,
				through: t
			} }
		};
	}
	if (e.key === K.PARALLEL.toString() && r.length === 2) {
		let [e, t] = r;
		if (e instanceof J && t instanceof Y) return {
			create: Q,
			config: { parallel: {
				to: e,
				through: t
			} }
		};
	}
	if (e.key === K.BISECTOR.toString() && r.length === 2) {
		let [e, t] = r;
		if (e instanceof J && t instanceof J) return {
			create: Q,
			config: { bisector: {
				d1: e,
				d2: t
			} }
		};
	}
	if (e.key === K.BISECTOR.toString() && r.length === 3) {
		let [e, t, n] = r;
		if (t instanceof Y && e instanceof Y && n instanceof Y) return {
			create: Q,
			config: { bisector: {
				A: t,
				B: e,
				C: n
			} }
		};
	}
	if (e.key === K.TANGENT.toString() && r.length === 2) {
		let [e, t] = r;
		if (t instanceof Y && e instanceof xi) return {
			create: Q,
			config: { tangent: {
				A: t,
				f: e
			} }
		};
	}
	return null;
}
//#endregion
//#region src/parser/buildPlot.ts
function aa(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.PLOT.toString()) {
		let [e, ...t] = r, n = { expression: typeof e == "number" ? e.toString() : e }, i = t.filter((e) => V(e));
		i.length > 0 && (n.domain = i[0]), i.length > 1 && (n.image = i[1]);
		let a = t.filter((e) => typeof e == "number");
		return a.length > 0 && (n.samples = a[0] > 0 ? a[0] : 10), {
			create: "plot",
			config: n
		};
	}
	return null;
}
function oa(e, t, n) {
	let r = q(e.values.slice(0, 3), t);
	return r.every((e) => e instanceof Y) ? {
		create: "plot",
		config: {
			expression: null,
			quadratic: r
		}
	} : null;
}
function sa(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.PARAMETRIC.toString() && r.length === 2) {
		let [e, t] = r;
		if (typeof e == "string" && typeof t == "string") return {
			create: "parametric",
			config: { expressions: {
				x: e,
				y: t
			} }
		};
	}
	return null;
}
function ca(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.FOLLOW.toString() && r.length >= 1) {
		let [e, t] = r;
		if (e instanceof xi) return {
			create: "follow",
			config: {
				follow: e,
				tangent: t === "show"
			}
		};
	}
	return null;
}
function la(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.FILL_BETWEEN.toString() && r.length >= 2) {
		let e = r[0], t = r[1] instanceof xi ? r[1] : null, n = V(r[1]) ? r[1] : r[2], i = V(r[1]) ? r[2] : r[3];
		if (e instanceof xi) return {
			create: "fillbetween",
			config: {
				expressions: t instanceof xi ? [e, t] : [e],
				domain: V(n) ? n : {
					min: NaN,
					max: NaN
				},
				image: V(i) ? i : {
					min: NaN,
					max: NaN
				}
			}
		};
	}
	return null;
}
function ua(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.RIEMANN.toString() && r.length >= 2) {
		let [e, t, n, i] = r;
		return {
			create: "riemann",
			config: {
				follow: e,
				domain: V(t) ? t : {
					min: NaN,
					max: NaN
				},
				rectangles: typeof n == "number" ? n : 5,
				position: typeof i == "number" ? i : 0
			}
		};
	}
	return null;
}
//#endregion
//#region src/parser/buildPoint.ts
var da = "point";
function fa(e, t, n) {
	let r = "circle", i = 5, a = Object.keys(e.parameters).find((e) => e.includes("*") || e.includes("s") || e.includes("o"));
	switch (a) {
		case "o":
			r = "circle", i = e.parameters[a].value === !0 ? 5 : e.parameters[a].value;
			break;
		case "s":
			r = "square", i = e.parameters[a].value === !0 ? 10 : e.parameters[a].value;
			break;
		case "*":
			r = "crosshair", i = e.parameters[a].value === !0 ? 10 : e.parameters[a].value;
			break;
	}
	let o = pa(e, t, n);
	return o ? {
		create: da,
		config: Object.assign(o, {
			shape: r,
			size: i
		})
	} : null;
}
function pa(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.POINT.toString()) {
		let [e, n] = r;
		try {
			return { coordinates: {
				x: ma(e, t),
				y: ma(n, t)
			} };
		} catch {
			return null;
		}
	}
	if (e.key === K.MIDDLE.toString() && r.length === 2) {
		let e = r[0], t = r[1];
		if (e instanceof Y && t instanceof Y) return { middle: {
			A: e,
			B: t
		} };
	}
	if (e.key === K.PROJECTION.toString() && r.length === 2) {
		let e = r[0], t = r[1];
		if (e instanceof Y && (t instanceof J || t === "Ox" || t === "Oy")) return { projection: {
			point: e,
			axis: t
		} };
	}
	if (e.key === K.SYMMETRY.toString() && r.length === 2) {
		let e = r[0], t = r[1];
		if (e instanceof Y && (t instanceof Y || t instanceof J || t === "Ox" || t === "Oy")) return { symmetry: {
			A: e,
			B: t
		} };
	}
	if (e.key === K.DIRECTION_POINT.toString() && r.length >= 3) {
		let [e, t, n, i] = r;
		if (e instanceof Y && (t instanceof J || t === "Ox" || t === "Oy") && typeof n == "number") return { direction: {
			direction: t,
			distance: n,
			point: e,
			perpendicular: i !== void 0
		} };
	}
	if (e.key === K.VECTOR_POINT.toString() && r.length >= 2) {
		let [e, t, n, i] = r;
		if (e instanceof Y && t instanceof Y) return { direction: {
			point: i instanceof Y ? i : e,
			direction: {
				A: e,
				B: t
			},
			distance: typeof n == "number" ? n : 1
		} };
	}
	if (e.key === K.EVAL_FX.toString() && r.length >= 2) {
		let [e, n] = r;
		if (!(e instanceof xi)) return null;
		try {
			return { evaluation: {
				fx: e,
				x: ma(n, t)
			} };
		} catch {
			return null;
		}
	}
	return null;
}
function ma(e, t) {
	if (typeof e == "string") {
		if (e.includes(".")) {
			let [n, r] = e.split("."), i = t[n], a = r === "x" || r === "y" ? r : null;
			if (i instanceof Y && a !== null) return {
				point: i,
				axis: a
			};
			throw Error("Point or axis unrecognized");
		}
		if (e.includes(":")) {
			let [n, r] = e.split(":"), i = t[n], a = t[r];
			if (i instanceof Y && a instanceof Y) return {
				point1: i,
				point2: a
			};
			throw Error("Points are not unrecognized");
		}
	} else return e;
	throw Error("Nothing to parse...");
}
//#endregion
//#region src/parser/buildPolygon.ts
var ha = "polygon";
function ga(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.POLYGON.toString() && r.length >= 2) {
		let e = r;
		if (e.every((e) => e instanceof Y)) return {
			create: ha,
			config: { vertices: e }
		};
	}
	if (e.key === K.REGULAR.toString() && r.length >= 3) {
		let [e, t, n] = r;
		if (e instanceof Y && (typeof t == "number" || t instanceof Y) && typeof n == "number") return {
			create: ha,
			config: { regular: {
				center: e,
				radius: t,
				sides: n
			} }
		};
	}
	return null;
}
//#endregion
//#region src/parser/buildBezier.ts
function _a(e, t, n) {
	return {
		create: "bezier",
		config: { points: e.values.map((e) => {
			if (typeof e == "string") {
				let [n, r, i] = e.split("/");
				if (!(n in t)) return null;
				let a = t[n], o;
				switch (r) {
					case "H":
						o = H.HORIZONTAL;
						break;
					case "V":
						o = H.VERTICAL;
						break;
					default: o = H.SMOOTH;
				}
				return {
					point: a,
					controls: {
						type: o,
						ratio: i === void 0 ? .2 : +i,
						left: null,
						right: null
					}
				};
			} else return null;
		}).filter((e) => e !== null) }
	};
}
//#endregion
//#region src/parser/buildIntersection.ts
var va = "point";
function ya(e, t, n) {
	let r = "circle", i = 5, a = Object.keys(e.parameters).find((e) => e.includes("*") || e.includes("s") || e.includes("o"));
	switch (a) {
		case "o":
			r = "circle", i = e.parameters[a].value === !0 ? 5 : e.parameters[a].value;
			break;
		case "s":
			r = "square", i = e.parameters[a].value === !0 ? 10 : e.parameters[a].value;
			break;
		case "*":
			r = "crosshair", i = e.parameters[a].value === !0 ? 10 : e.parameters[a].value;
			break;
	}
	let o = ba(e, t, n);
	return o ? o.map((e) => ({
		create: va,
		config: Object.assign(e, {
			shape: r,
			size: i
		})
	})) : null;
}
function ba(e, t, n) {
	let r = q(e.values, t);
	if (e.key === K.INTERSECTION.toString() && r.length >= 2) {
		let e = r[0], t = r[1];
		if ((e instanceof J || e === "Ox" || e === "Oy") && (t instanceof J || t === "Ox" || t === "Oy")) return [{ intersection: {
			A: e,
			B: t
		} }];
		if (e instanceof Si && t instanceof J) return [{ intersectionWithCircle: {
			A: e,
			B: t,
			index: 0
		} }, { intersectionWithCircle: {
			A: e,
			B: t,
			index: 1
		} }];
		if (e instanceof Si && t instanceof Si) return [{ intersectionBetweenCircles: {
			A: e,
			B: t,
			index: 0
		} }, { intersectionBetweenCircles: {
			A: e,
			B: t,
			index: 1
		} }];
	}
	return null;
}
//#endregion
//#region src/parser/parser.config.ts
var xa = {
	pt: {
		name: "point",
		description: "Create a point",
		code: "A(3,4)",
		parameters: [
			"drag",
			"drag:grid",
			"drag:axis",
			"drag:x",
			"drag:y",
			"drag:<figure>"
		],
		build: fa
	},
	vpt: {
		name: "point from two points",
		description: "Create a point from a vector defined by two points and a starting point",
		code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
		parameters: [],
		build: fa
	},
	dpt: {
		name: "point from direction line",
		description: "Create a point from a line and a starting point",
		code: "A=dpt <point>,<line>,<distance>,<perpendicular?>",
		parameters: [],
		build: fa
	},
	mid: {
		name: "mid",
		description: "Create the middle of two points",
		code: "A=mid <point>,<point>",
		parameters: [],
		build: fa
	},
	proj: {
		name: "projection",
		description: "Create the projection of a point on a line",
		code: "A=proj <point>,<line>",
		parameters: [],
		build: fa
	},
	inter: {
		name: "intersection",
		description: "Create the intersection of two lines",
		code: "A=inter <line|circle>,<line|circle>",
		parameters: [],
		build: ya
	},
	sym: {
		name: "symmetry",
		description: "Create the symmetry of a point",
		code: "A=sym <point>,<point|line>",
		parameters: [],
		build: fa
	},
	eval: {
		name: "evaluate function",
		description: "Evaluate a funciton at a value",
		code: "A=eval f,3",
		parameters: [],
		build: fa
	},
	line: {
		name: "line",
		description: "Create a line, a half line or a segment",
		code: "d=<line> | <line>[ | <line>.",
		parameters: ["dash", "dot"],
		build: $
	},
	vec: {
		name: "vector",
		description: "Create a vector",
		code: "d=v<line>",
		parameters: [],
		build: $
	},
	seg: {
		name: "segment",
		description: "Create a segment through two points",
		code: "s=<A><B>.",
		parameters: [],
		build: $
	},
	ray: {
		name: "ray (half line)",
		description: "Create a line, a half line or a segment",
		code: "d=<line> | <line>[ | <line>.",
		parameters: ["dash", "dot"],
		build: $
	},
	perp: {
		name: "perpendicular",
		description: "Create the perpendicular of a line from a point",
		code: "d=perp <line>,<point>",
		parameters: [],
		build: $
	},
	para: {
		name: "parallel",
		description: "Create a parallel line from a point",
		code: "d=para <line>,<point>",
		parameters: [],
		build: $
	},
	med: {
		name: "mediator",
		description: "Create the mediator of two points",
		code: "d=med <point>,<point>",
		parameters: [],
		build: $
	},
	tan: {
		name: "tangent",
		description: "Create a tangent line from a <circle|plot> by a Point",
		code: "d=tan <circle|plot>,<point>",
		parameters: [],
		build: $
	},
	bis: {
		name: "bisector",
		description: "Create the bisector of an angle",
		code: "d=bis <point>,<point>,<point>",
		parameters: [],
		build: $
	},
	circ: {
		name: "circle",
		description: "Create a circle",
		code: "c=circ <point>,<radius>",
		parameters: [],
		build: ra
	},
	arc: {
		name: "arc",
		description: "Create an arc",
		code: "c=arc <point>,<point>,<point>[,<number>]",
		parameters: [
			"sector",
			"square",
			"acute"
		],
		build: ia
	},
	plot: {
		name: "plot",
		description: "Plot a function",
		code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
		parameters: [],
		build: aa
	},
	quad: {
		name: "quad",
		description: "quadrative plot through three points",
		code: "f=quad A,B,C[@<number>,<domain>,<image>]",
		parameters: [],
		build: oa
	},
	parametric: {
		name: "parametric",
		description: "Plot a parametric function",
		code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
		parameters: [],
		build: sa
	},
	bezier: {
		name: "bezier",
		description: "bezier curve through points",
		code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
		parameters: [],
		build: _a
	},
	poly: {
		name: "polygon",
		description: "Create a polygon",
		code: "p=poly <point>,<point>,<point>,...",
		parameters: [],
		build: ga
	},
	reg: {
		name: "regular",
		description: "Create a regular polygon",
		code: "p=reg <center>,<radius>,<sides>",
		parameters: [],
		build: ga
	},
	follow: {
		name: "follow",
		description: "Create a tangent that follows a function",
		code: "f=follow <function>,<tangent?>",
		parameters: [],
		build: ca
	},
	fill: {
		name: "fillbetween",
		description: "Fill the area between two functions",
		code: "f=fill <function>,<function?>,<domain?>",
		parameters: [],
		build: la
	},
	riemann: {
		name: "riemann",
		description: "Create a Riemann sum",
		code: "f=riemann <function>,<domain>,<number>,<position>",
		parameters: [],
		build: ua
	}
}, Sa = [
	"ppu",
	"x",
	"y",
	"unitX",
	"unitY",
	"grid",
	"axis",
	"subgrid",
	"label",
	"tex",
	"points",
	"no-points"
], Ca = class extends Bi {
	_parser;
	_settings;
	constructor(e, t) {
		return super(e, { tex: t?.tex ?? ((e) => e) }), this._parser = new na({
			formatter: (e) => this._parseKeyCode(e),
			keys: Sa,
			splitter: {
				main: "->",
				entry: ",",
				parameter: "/"
			}
		}), this._settings = {}, t?.parameters && this.refreshLayout(t.parameters), this._code = [], t?.code && this._build(t.code), this;
	}
	_code;
	get code() {
		return this._code;
	}
	static documentation() {
		return xa;
	}
	refresh(e) {
		this.clear(), this._build(e);
	}
	refreshLayout(e) {
		let t = this._parseLayout(e);
		this.config = t.config, this.display = t.display, this._settings = t.settings, this.updateLayout();
	}
	_applyDrag(e, t, n) {
		if (e instanceof Y) {
			let r = [], i = [], a = this.create.point({
				x: 0,
				y: 0
			}, e.name + "_drag");
			a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[t].value, ...n[t].options].forEach((t) => {
				if ([
					"grid",
					"Ox",
					"Oy"
				].includes(t) && r.push(this.follow(t, e)), V(t)) {
					let e = t.axis ?? "x", n = this.toPixels(t, e);
					r.push((t, r) => ({
						x: e === "x" ? Math.max(n.min, Math.min(t, n.max)) : t,
						y: e === "y" ? Math.max(n.min, Math.min(r, n.max)) : r
					}));
				}
				if (Object.hasOwn(this.figures, t)) {
					let e = this.figures[t];
					i.push((t, n) => e.follow(t, n));
				}
			}), this.draggable(a, {
				target: e,
				follow: [...r, ...i]
			});
		}
	}
	_applyOptions(e, t) {
		Object.keys(e).forEach((n) => {
			switch (n) {
				case "w":
					t.stroke(e[n].value);
					break;
				case "ultrathin":
					t.stroke(.5);
					break;
				case "thin":
					t.stroke(.75);
					break;
				case "thick":
					t.stroke(2.5);
					break;
				case "ultrathick":
					t.stroke(4);
					break;
				case "color": {
					let r = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
					t.stroke(r);
					break;
				}
				case "fill": {
					let r = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
					t.fill(r);
					break;
				}
				case "dash":
					e[n].value === !0 ? t.dash() : t.dash(e[n].value);
					break;
				case "dot":
					t.dot();
					break;
				case "mark":
					t.mark(e[n].value, e[n].options);
					break;
				case "hide":
					t.hide();
					break;
				case "!":
					t.element.children().forEach((e) => {
						e.attr("id") !== `${t.name}-label` && e.hide();
					});
					break;
				case "_":
				case "static":
					t.static = e[n].value;
					break;
				case "?":
					t.label?.hide();
					break;
				case "move":
					t.move(e[n].value);
					break;
				case "scale":
					t.scale(e[n].value);
					break;
				case "label":
				case "tex": {
					let r = t.name;
					if (typeof e[n].value == "string" && (r = e[n].value), n === "tex" && r.length === 2 && !isNaN(+r[1]) && (r = r[0] + "_" + r[1]), t.addLabel(r, n === "tex", this.toTex), t.label) {
						let r = e[n].options[0] === !1 || e[n].options[0] === !0 ? "br" : e[n].options[0], i = e[n].options[1] ?? {
							x: 0,
							y: 0
						}, a = {
							x: i.x * this.config.axis.x.x,
							y: -i.y * this.config.axis.y.y
						}, o = e[n].options[2];
						t.label.auto_rotate = o === !0, t.label.position(r, a, typeof o == "number" ? o : 0);
					}
					break;
				}
				case "drag":
					this._applyDrag(t, n, e);
					break;
				case "animate": {
					let n = {
						from: null,
						to: null,
						duration: 2,
						delay: 0,
						easing: "linear",
						loop: Li.NONE
					};
					if (Object.hasOwn(e, "from")) {
						let t = e.from.value;
						Object.hasOwn(this.figures, t) && this.figures[t] instanceof Y && (n.from = this.figures[t]);
					}
					if (Object.hasOwn(e, "to")) {
						let t = e.to.value;
						Object.hasOwn(this.figures, t) && this.figures[t] instanceof Y && (n.to = this.figures[t]);
					}
					Object.hasOwn(e, "duration") && (n.duration = e.duration.value), Object.hasOwn(e, "delay") && (n.delay = e.delay.value), Object.hasOwn(e, "easing") && (n.easing = e.easing.value), Object.hasOwn(e, "loop") && (n.loop = zi(e.loop.value)), t.animate = n;
					break;
				}
				default: vi.includes(n) && t.stroke(n);
			}
		});
	}
	_build(e) {
		this._code = this._prepare(e);
		let t = xa;
		this._code.forEach((e) => {
			e.name = this._uniqueName(e.name);
			let n;
			if (Object.hasOwn(t, e.key)) {
				let { build: r, parameters: i } = t[e.key];
				i && i.length > 0 && Object.keys(e.parameters).length === 0 && Object.keys(e.parameters).filter((e) => i.includes(e)).forEach((t) => {
					e.parameters[t] = {
						value: !0,
						options: []
					};
				});
				let a = r(e, this.figures, this.config);
				a && (Array.isArray(a) || (a = [a]), a.forEach((t, r) => {
					try {
						let { config: i, create: o } = t;
						i && o && (n = this.create[o](i, e.name + (a.length > 1 ? `${r + 1}` : "")));
					} catch (e) {
						console.error(e);
					}
					n && this._buildOptions(n, e);
				}));
			}
		}), this.updateLabels([]);
	}
	_buildOptions(e, t) {
		this._settings.label && e instanceof Y && t.parameters.label === void 0 && t.parameters.tex === void 0 && (t.parameters.label = {
			value: !0,
			options: []
		}), this._settings.tex && e instanceof Y && t.parameters.label === void 0 && t.parameters.tex === void 0 && (t.parameters.tex = {
			value: !0,
			options: []
		}), e instanceof Y && this._settings.points === !1 && (t.parameters["!"] = {
			value: !0,
			options: []
		}), this._applyOptions(t.parameters, e);
	}
	_defineCommand(e) {
		let [t, n] = e.slice(1).split(":");
		return {
			key: n,
			value: t === "begin"
		};
	}
	_parseKeyCode(e) {
		return /^[A-Z][0-9]*\(.*\)$/.exec(e) ? this._parseKeyCodePoint(e) : /^[a-z][0-9]*\([x|t]\)/.exec(e) ? this._parseKeyCodePlot(e) : e.includes("=") && !e.includes(" ") ? this._parseKeyCodeLine(e) : e;
	}
	_parseKeyCodeLine(e) {
		let [t, ...n] = e.split("="), r = n.join("="), i = r[0];
		i !== "v" && i !== "[" && (i = null);
		let a = r[r.length - 1];
		a !== "." && a !== "]" && a !== "[" && (a = null);
		let o = "line";
		i === "v" && a === null ? (r = r.slice(1), o = "vec") : i === null && a === "." || i === "[" && a === "]" ? (i === "[" && (r = r.slice(1)), r = r.slice(0, -1), o = "seg") : (i === "[" && a === "[" || i === null && a === "[" || i === "[" && a === null) && (i === "[" && (r = r.slice(1)), a === "[" && (r = r.slice(0, -1)), o = "ray");
		let s = r.split(/(?=[A-Z])/);
		return `${t}=${o} ${s[0]},${s[1]}`;
	}
	_parseKeyCodePlot(e) {
		let [t, n] = e.split("=");
		return `${t.split("(")[0]}=${e.includes("(x)=") ? K.PLOT : K.PARAMETRIC} ${n}`;
	}
	_parseKeyCodePoint(e) {
		let t = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
		return `${t}=pt ${n[0]},${n[1]}`;
	}
	_parseLayout(e) {
		let t = this._parser.parameters(e ?? "", Sa), n = t.x && V(t.x.value) ? t.x.value : {
			min: -8,
			max: 8
		}, r = t.y && V(t.y.value) ? t.y.value : {
			min: -8,
			max: 8
		}, i = Math.abs(n.max - n.min), a = Math.abs(r.max - r.min), o = this.rootSVG.node.getBoundingClientRect(), s = Math.max(Math.round(o.width / i), 20);
		Object.hasOwn(t, "ppu") && !isNaN(+t.ppu.value) && (s = parseFloat(t.ppu.value));
		let c = t.unitX ? parseFloat(t.unitX.value) : 1, l = t.unitY ? parseFloat(t.unitY.value) : 1, u = i * s, d = a * s, f = {
			x: -n.min * s,
			y: r.max * s
		}, p = Yr.CARTESIAN_2D, m = {
			x: {
				x: s * c,
				y: 0
			},
			y: {
				x: 0,
				y: -s * l
			}
		}, h = Object.hasOwn(t, "grid") ? t.grid.value : !1;
		if (typeof h == "string" && h.includes("pi")) {
			let e = h === "pi" ? 1 : +h.split("pi")[0], n = t.grid.options.length && Number.isSafeInteger(+t.grid.options[0]) ? t.grid.options[0] : 2;
			h = {
				x: e * Math.PI / n,
				y: 1
			};
		}
		let g = !!t.axis, _ = t.subgrid ? parseFloat(t.subgrid.value) : 0, v = {
			label: !!t.label,
			tex: !!t.tex,
			points: t["no-points"] ? !1 : t.points ? t.points.value : "o"
		};
		return {
			config: {
				width: u,
				height: d,
				origin: f,
				system: p,
				axis: m
			},
			display: {
				grid: h,
				subgrid: _,
				axis: g
			},
			settings: v
		};
	}
	_prepare(e) {
		let t = [], n = e.split("\n").map((e) => e.trim()).filter((e) => e.trim() !== "" && !e.startsWith("$")), r = {};
		for (let e of n) {
			if (e.startsWith("@")) {
				let { key: t, value: n } = this._defineCommand(e);
				r[t] = {
					value: n,
					options: []
				};
				continue;
			}
			let n = this._parser.parse(e);
			n.parameters = Object.assign(n.parameters, r), t.push(n);
		}
		return t;
	}
	_uniqueName(e) {
		let t = e, n = 1;
		for (; this.figures[t];) t = `${e}_${n}`, n++;
		return t;
	}
};
//#endregion
export { Jr as AXIS, H as BEZIERCONTROL, Yr as COORDINATE_SYSTEM, qr as LAYER_NAME, Zr as LINECONSTRAINT, Xr as POINTCONSTRAINT, Qr as POLYGON_CONSTRAINT, Ca as PiDraw, Bi as PiGraph, V as isDOMAIN, B as isXY };

//# sourceMappingURL=pidraw.js.map