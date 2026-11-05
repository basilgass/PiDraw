// src/animate/Animate.types.ts
var e = /* @__PURE__ */ function(e) {
	return e.RESET = "reset", e.REVERSE = "reverse", e.NONE = "none", e;
}({}), t = {
	linear: (e) => e,
	inOut: (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2
}, n = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, r = class extends n {}, i = class extends r {
	option;
	constructor(e, t, n) {
		super(t, n), this.option = e;
	}
}, a = class extends n {}, o = class extends n {}, s = class extends n {}, c = class extends n {}, l = Object.create, u = Object.defineProperty, d = Object.getOwnPropertyDescriptor, f = Object.getOwnPropertyNames, p = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty, h = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), g = (e, t) => {
	let n = {};
	for (var r in e) u(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || u(n, Symbol.toStringTag, { value: "Module" }), n;
}, _ = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = f(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !m.call(e, s) && s !== n && u(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = d(t, s)) || r.enumerable
	});
	return e;
}, ee = (e, t, n) => (n = e == null ? {} : l(p(e)), _(t || !e || !e.__esModule ? u(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), te = {}, v = [];
function y(e, t) {
	if (Array.isArray(e)) for (let n of e) y(n, t);
	else if (typeof e == "object") for (let t in e) y(t, e[t]);
	else ne(Object.getOwnPropertyNames(t)), te[e] = Object.assign(te[e] || {}, t);
}
function b(e) {
	return te[e] || {};
}
function x() {
	return [...new Set(v)];
}
function ne(e) {
	v.push(...e);
}
var S = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e) {
		try {
			return !!e();
		} catch {
			return !0;
		}
	};
})), re = /* @__PURE__ */ h(((e, t) => {
	t.exports = !S()(function() {
		var e = function() {}.bind();
		return typeof e != "function" || e.hasOwnProperty("prototype");
	});
})), C = /* @__PURE__ */ h(((e, t) => {
	var n = re(), r = Function.prototype, i = r.call, a = n && r.bind.bind(i, i);
	t.exports = n ? a : function(e) {
		return function() {
			return i.apply(e, arguments);
		};
	};
})), ie = /* @__PURE__ */ h(((e, t) => {
	t.exports = C()({}.isPrototypeOf);
})), w = /* @__PURE__ */ h(((e, t) => {
	var n = function(e) {
		return e && e.Math === Math && e;
	};
	t.exports = n(typeof globalThis == "object" && globalThis) || n(typeof window == "object" && window) || n(typeof self == "object" && self) || n(typeof global == "object" && global) || n(typeof e == "object" && e) || (function() {
		return this;
	})() || Function("return this")();
})), ae = /* @__PURE__ */ h(((e, t) => {
	var n = re(), r = Function.prototype, i = r.apply, a = r.call;
	t.exports = typeof Reflect == "object" && Reflect.apply || (n ? a.bind(i) : function() {
		return a.apply(i, arguments);
	});
})), oe = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = n({}.toString), i = n("".slice);
	t.exports = function(e) {
		return i(r(e), 8, -1);
	};
})), se = /* @__PURE__ */ h(((e, t) => {
	var n = oe(), r = C();
	t.exports = function(e) {
		if (n(e) === "Function") return r(e);
	};
})), ce = /* @__PURE__ */ h(((e, t) => {
	var n = typeof document == "object" && document.all;
	t.exports = n === void 0 && n !== void 0 ? function(e) {
		return typeof e == "function" || e === n;
	} : function(e) {
		return typeof e == "function";
	};
})), le = /* @__PURE__ */ h(((e, t) => {
	t.exports = !S()(function() {
		return Object.defineProperty({}, 1, { get: function() {
			return 7;
		} })[1] !== 7;
	});
})), ue = /* @__PURE__ */ h(((e, t) => {
	var n = re(), r = Function.prototype.call;
	t.exports = n ? r.bind(r) : function() {
		return r.apply(r, arguments);
	};
})), de = /* @__PURE__ */ h(((e) => {
	var t = {}.propertyIsEnumerable, n = Object.getOwnPropertyDescriptor;
	e.f = n && !t.call({ 1: 2 }, 1) ? function(e) {
		var t = n(this, e);
		return !!t && t.enumerable;
	} : t;
})), fe = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e, t) {
		return {
			enumerable: !(e & 1),
			configurable: !(e & 2),
			writable: !(e & 4),
			value: t
		};
	};
})), pe = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = S(), i = oe(), a = Object, o = n("".split);
	t.exports = r(function() {
		return !a("z").propertyIsEnumerable(0);
	}) ? function(e) {
		return i(e) === "String" ? o(e, "") : a(e);
	} : a;
})), me = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e) {
		return e == null;
	};
})), he = /* @__PURE__ */ h(((e, t) => {
	var n = me(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("Can't call method on " + e);
		return e;
	};
})), ge = /* @__PURE__ */ h(((e, t) => {
	var n = pe(), r = he();
	t.exports = function(e) {
		return n(r(e));
	};
})), _e = /* @__PURE__ */ h(((e, t) => {
	var n = ce();
	t.exports = function(e) {
		return typeof e == "object" ? e !== null : n(e);
	};
})), ve = /* @__PURE__ */ h(((e, t) => {
	t.exports = {};
})), ye = /* @__PURE__ */ h(((e, t) => {
	var n = ve(), r = w(), i = ce(), a = function(e) {
		return i(e) ? e : void 0;
	};
	t.exports = function(e, t) {
		return arguments.length < 2 ? a(n[e]) || a(r[e]) : n[e] && n[e][t] || r[e] && r[e][t];
	};
})), be = /* @__PURE__ */ h(((e, t) => {
	var n = w().navigator, r = n && n.userAgent;
	t.exports = r ? String(r) : "";
})), xe = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = be(), i = n.process, a = n.Deno, o = i && i.versions || a && a.version, s = o && o.v8, c, l;
	s && (c = s.split("."), l = c[0] > 0 && c[0] < 4 ? 1 : +(c[0] + c[1])), !l && r && (c = r.match(/Edge\/(\d+)/), (!c || c[1] >= 74) && (c = r.match(/Chrome\/(\d+)/), c && (l = +c[1]))), t.exports = l;
})), Se = /* @__PURE__ */ h(((e, t) => {
	var n = xe(), r = S(), i = w().String;
	t.exports = !!Object.getOwnPropertySymbols && !r(function() {
		var e = Symbol("symbol detection");
		return !i(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && n && n < 41;
	});
})), Ce = /* @__PURE__ */ h(((e, t) => {
	t.exports = Se() && !Symbol.sham && typeof Symbol.iterator == "symbol";
})), we = /* @__PURE__ */ h(((e, t) => {
	var n = ye(), r = ce(), i = ie(), a = Ce(), o = Object;
	t.exports = a ? function(e) {
		return typeof e == "symbol";
	} : function(e) {
		var t = n("Symbol");
		return r(t) && i(t.prototype, o(e));
	};
})), Te = /* @__PURE__ */ h(((e, t) => {
	var n = String;
	t.exports = function(e) {
		try {
			return n(e);
		} catch {
			return "Object";
		}
	};
})), Ee = /* @__PURE__ */ h(((e, t) => {
	var n = ce(), r = Te(), i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not a function");
	};
})), De = /* @__PURE__ */ h(((e, t) => {
	var n = Ee(), r = me();
	t.exports = function(e, t) {
		var i = e[t];
		return r(i) ? void 0 : n(i);
	};
})), Oe = /* @__PURE__ */ h(((e, t) => {
	var n = ue(), r = ce(), i = _e(), a = TypeError;
	t.exports = function(e, t) {
		var o, s;
		if (t === "string" && r(o = e.toString) && !i(s = n(o, e)) || r(o = e.valueOf) && !i(s = n(o, e)) || t !== "string" && r(o = e.toString) && !i(s = n(o, e))) return s;
		throw new a("Can't convert object to primitive value");
	};
})), ke = /* @__PURE__ */ h(((e, t) => {
	t.exports = !0;
})), Ae = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = Object.defineProperty;
	t.exports = function(e, t) {
		try {
			r(n, e, {
				value: t,
				configurable: !0,
				writable: !0
			});
		} catch {
			n[e] = t;
		}
		return t;
	};
})), je = /* @__PURE__ */ h(((e, t) => {
	var n = ke(), r = w(), i = Ae(), a = "__core-js_shared__", o = t.exports = r[a] || i(a, {});
	(o.versions ||= []).push({
		version: "3.49.0",
		mode: n ? "pure" : "global",
		copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
		license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
		source: "https://github.com/zloirock/core-js"
	});
})), Me = /* @__PURE__ */ h(((e, t) => {
	var n = je();
	t.exports = function(e, t) {
		return n[e] || (n[e] = t || {});
	};
})), Ne = /* @__PURE__ */ h(((e, t) => {
	var n = he(), r = Object;
	t.exports = function(e) {
		return r(n(e));
	};
})), Pe = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = Ne(), i = n({}.hasOwnProperty);
	t.exports = Object.hasOwn || function(e, t) {
		return i(r(e), t);
	};
})), Fe = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = 0, i = Math.random(), a = n(1.1.toString);
	t.exports = function(e) {
		return "Symbol(" + (e === void 0 ? "" : e) + ")_" + a(++r + i, 36);
	};
})), Ie = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = Me(), i = Pe(), a = Fe(), o = Se(), s = Ce(), c = n.Symbol, l = r("wks"), u = s ? c.for || c : c && c.withoutSetter || a;
	t.exports = function(e) {
		return i(l, e) || (l[e] = o && i(c, e) ? c[e] : u("Symbol." + e)), l[e];
	};
})), Le = /* @__PURE__ */ h(((e, t) => {
	var n = ue(), r = _e(), i = we(), a = De(), o = Oe(), s = Ie(), c = TypeError, l = s("toPrimitive");
	t.exports = function(e, t) {
		if (!r(e) || i(e)) return e;
		var s = a(e, l), u;
		if (s) {
			if (t === void 0 && (t = "default"), u = n(s, e, t), !r(u) || i(u)) return u;
			throw new c("Can't convert object to primitive value");
		}
		return t === void 0 && (t = "number"), o(e, t);
	};
})), Re = /* @__PURE__ */ h(((e, t) => {
	var n = Le(), r = we();
	t.exports = function(e) {
		var t = n(e, "string");
		return r(t) ? t : t + "";
	};
})), ze = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = _e(), i = n.document, a = r(i) && r(i.createElement);
	t.exports = function(e) {
		return a ? i.createElement(e) : {};
	};
})), Be = /* @__PURE__ */ h(((e, t) => {
	var n = le(), r = S(), i = ze();
	t.exports = !n && !r(function() {
		return Object.defineProperty(i("div"), "a", { get: function() {
			return 7;
		} }).a !== 7;
	});
})), Ve = /* @__PURE__ */ h(((e) => {
	var t = le(), n = ue(), r = de(), i = fe(), a = ge(), o = Re(), s = Pe(), c = Be(), l = Object.getOwnPropertyDescriptor;
	e.f = t ? l : function(e, t) {
		if (e = a(e), t = o(t), c) try {
			return l(e, t);
		} catch {}
		if (s(e, t)) return i(!n(r.f, e, t), e[t]);
	};
})), He = /* @__PURE__ */ h(((e, t) => {
	var n = S(), r = ce(), i = /#|\.prototype\./, a = function(e, t) {
		var i = s[o(e)];
		return i === l ? !0 : i === c ? !1 : r(t) ? n(t) : !!t;
	}, o = a.normalize = function(e) {
		return String(e).replace(i, ".").toLowerCase();
	}, s = a.data = {}, c = a.NATIVE = "N", l = a.POLYFILL = "P";
	t.exports = a;
})), Ue = /* @__PURE__ */ h(((e, t) => {
	var n = se(), r = Ee(), i = re(), a = n(n.bind);
	t.exports = function(e, t) {
		return r(e), t === void 0 ? e : i ? a(e, t) : function() {
			return e.apply(t, arguments);
		};
	};
})), We = /* @__PURE__ */ h(((e, t) => {
	var n = le(), r = S();
	t.exports = n && r(function() {
		return Object.defineProperty(function() {}, "prototype", {
			value: 42,
			writable: !1
		}).prototype !== 42;
	});
})), Ge = /* @__PURE__ */ h(((e, t) => {
	var n = _e(), r = String, i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not an object");
	};
})), Ke = /* @__PURE__ */ h(((e) => {
	var t = le(), n = Be(), r = We(), i = Ge(), a = Re(), o = TypeError, s = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = "enumerable", u = "configurable", d = "writable";
	e.f = t ? r ? function(e, t, n) {
		if (i(e), t = a(t), i(n), typeof e == "function" && t === "prototype" && "value" in n && d in n && !n[d]) {
			var r = c(e, t);
			r && r[d] && (e[t] = n.value, n = {
				configurable: u in n ? n[u] : r[u],
				enumerable: l in n ? n[l] : r[l],
				writable: !1
			});
		}
		return s(e, t, n);
	} : s : function(e, t, r) {
		if (i(e), t = a(t), i(r), n) try {
			return s(e, t, r);
		} catch {}
		if ("get" in r || "set" in r) throw new o("Accessors not supported");
		return "value" in r && (e[t] = r.value), e;
	};
})), qe = /* @__PURE__ */ h(((e, t) => {
	var n = le(), r = Ke(), i = fe();
	t.exports = n ? function(e, t, n) {
		return r.f(e, t, i(1, n));
	} : function(e, t, n) {
		return e[t] = n, e;
	};
})), Je = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = ae(), i = se(), a = ce(), o = Ve().f, s = He(), c = ve(), l = Ue(), u = qe(), d = Pe();
	je();
	var f = function(e) {
		var t = function(n, i, a) {
			if (this instanceof t) {
				switch (arguments.length) {
					case 0: return new e();
					case 1: return new e(n);
					case 2: return new e(n, i);
				}
				return new e(n, i, a);
			}
			return r(e, this, arguments);
		};
		return t.prototype = e.prototype, t;
	};
	t.exports = function(e, t) {
		var r = e.target, p = e.global, m = e.stat, h = e.proto, g = p ? n : m ? n[r] : n[r] && n[r].prototype, _ = p ? c : c[r] || u(c, r, {})[r], ee = _.prototype, te, v, y, b, x, ne, S, re, C;
		for (b in t) te = s(p ? b : r + (m ? "." : "#") + b, e.forced), v = !te && g && d(g, b), ne = _[b], v && (e.dontCallGetSet ? (C = o(g, b), S = C && C.value) : S = g[b]), x = v && S ? S : t[b], (te || h || typeof ne != typeof x) && (re = e.bind && v ? l(x, n) : e.wrap && v ? f(x) : h && a(x) ? i(x) : x, (e.sham || x && x.sham || ne && ne.sham) && u(re, "sham", !0), u(_, b, re), h && (y = r + "Prototype", d(c, y) || u(c, y, {}), u(c[y], b, x), e.real && ee && (te || !ee[b]) && u(ee, b, x)));
	};
})), Ye = /* @__PURE__ */ h(((e, t) => {
	var n = Math.ceil, r = Math.floor;
	t.exports = Math.trunc || function(e) {
		var t = +e;
		return (t > 0 ? r : n)(t);
	};
})), Xe = /* @__PURE__ */ h(((e, t) => {
	var n = Ye();
	t.exports = function(e) {
		var t = +e;
		return t !== t || t === 0 ? 0 : n(t);
	};
})), Ze = /* @__PURE__ */ h(((e, t) => {
	var n = Xe(), r = Math.max, i = Math.min;
	t.exports = function(e, t) {
		var a = n(e);
		return a < 0 ? r(a + t, 0) : i(a, t);
	};
})), Qe = /* @__PURE__ */ h(((e, t) => {
	var n = Xe(), r = Math.min;
	t.exports = function(e) {
		var t = n(e);
		return t > 0 ? r(t, 9007199254740991) : 0;
	};
})), $e = /* @__PURE__ */ h(((e, t) => {
	var n = Qe();
	t.exports = function(e) {
		return n(e.length);
	};
})), et = /* @__PURE__ */ h(((e, t) => {
	var n = ge(), r = Ze(), i = $e(), a = function(e) {
		return function(t, a, o) {
			var s = n(t), c = i(s);
			if (c === 0) return !e && -1;
			var l = r(o, c), u;
			if (e && a !== a) {
				for (; c > l;) if (u = s[l++], u !== u) return !0;
			} else for (; c > l; l++) if ((e || l in s) && s[l] === a) return e || l || 0;
			return !e && -1;
		};
	};
	t.exports = {
		includes: a(!0),
		indexOf: a(!1)
	};
})), tt = /* @__PURE__ */ h(((e, t) => {
	t.exports = function() {};
})), nt = /* @__PURE__ */ h((() => {
	var e = Je(), t = et().includes, n = S(), r = tt(), i = n(function() {
		return ![,].includes();
	}), a = n(function() {
		return [, 1].includes(void 0, 1);
	});
	e({
		target: "Array",
		proto: !0,
		forced: i || a
	}, { includes: function(e) {
		return t(this, e, arguments.length > 1 ? arguments[1] : void 0);
	} }), r("includes");
})), rt = /* @__PURE__ */ h(((e, t) => {
	var n = w(), r = ve();
	t.exports = function(e, t) {
		var i = r[e + "Prototype"], a = i && i[t];
		if (a) return a;
		var o = n[e], s = o && o.prototype;
		return s && s[t];
	};
})), it = /* @__PURE__ */ h(((e, t) => {
	nt(), t.exports = rt()("Array", "includes");
})), at = /* @__PURE__ */ h(((e, t) => {
	var n = _e(), r = oe(), i = Ie()("match");
	t.exports = function(e) {
		var t;
		return n(e) && ((t = e[i]) === void 0 ? r(e) === "RegExp" : !!t);
	};
})), ot = /* @__PURE__ */ h(((e, t) => {
	var n = at(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("The method doesn't accept regular expressions");
		return e;
	};
})), st = /* @__PURE__ */ h(((e, t) => {
	var n = Ie()("toStringTag"), r = {};
	r[n] = "z", t.exports = String(r) === "[object z]";
})), ct = /* @__PURE__ */ h(((e, t) => {
	var n = st(), r = ce(), i = oe(), a = Ie()("toStringTag"), o = Object, s = i(function() {
		return arguments;
	}()) === "Arguments", c = function(e, t) {
		try {
			return e[t];
		} catch {}
	};
	t.exports = n ? i : function(e) {
		var t, n, l;
		return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (n = c(t = o(e), a)) == "string" ? n : s ? i(t) : (l = i(t)) === "Object" && r(t.callee) ? "Arguments" : l;
	};
})), lt = /* @__PURE__ */ h(((e, t) => {
	var n = ct(), r = String;
	t.exports = function(e) {
		if (n(e) === "Symbol") throw TypeError("Cannot convert a Symbol value to a string");
		return r(e);
	};
})), ut = /* @__PURE__ */ h(((e, t) => {
	var n = Ie()("match");
	t.exports = function(e) {
		var t = /./;
		try {
			"/./"[e](t);
		} catch {
			try {
				return t[n] = !1, "/./"[e](t);
			} catch {}
		}
		return !1;
	};
})), dt = /* @__PURE__ */ h((() => {
	var e = Je(), t = C(), n = ot(), r = he(), i = lt(), a = ut(), o = t("".indexOf);
	e({
		target: "String",
		proto: !0,
		forced: !a("includes")
	}, { includes: function(e) {
		return !!~o(i(r(this)), i(n(e)), arguments.length > 1 ? arguments[1] : void 0);
	} });
})), ft = /* @__PURE__ */ h(((e, t) => {
	dt(), t.exports = rt()("String", "includes");
})), pt = /* @__PURE__ */ h(((e, t) => {
	var n = ie(), r = it(), i = ft(), a = Array.prototype, o = String.prototype;
	t.exports = function(e) {
		var t = e.includes;
		return e === a || n(a, e) && t === a.includes ? r : typeof e == "string" || e === o || n(o, e) && t === o.includes ? i : t;
	};
})), mt = /* @__PURE__ */ ee((/* @__PURE__ */ h(((e, t) => {
	t.exports = pt();
})))(), 1);
function ht(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) i.push(t(e[n]));
	return i;
}
function gt(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) t(e[n]) && i.push(e[n]);
	return i;
}
function _t(e) {
	return e % 360 * Math.PI / 180;
}
function vt(e) {
	return e.replace(/([A-Z])/g, function(e, t) {
		return "-" + t.toLowerCase();
	});
}
function yt(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function bt(e, t, n, r) {
	return (t == null || n == null) && (r ||= e.bbox(), t == null ? t = r.width / r.height * n : n ??= r.height / r.width * t), {
		width: t,
		height: n
	};
}
function xt(e, t) {
	let n = e.origin, r = e.ox == null ? e.originX == null ? "center" : e.originX : e.ox, i = e.oy == null ? e.originY == null ? "center" : e.originY : e.oy;
	n != null && ([r, i] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
	let a = typeof r == "string", o = typeof i == "string";
	if (a || o) {
		let { height: e, width: n, x: s, y: c } = t.bbox();
		a && (r = (0, mt.default)(r).call(r, "left") ? s : (0, mt.default)(r).call(r, "right") ? s + n : s + n / 2), o && (i = (0, mt.default)(i).call(i, "top") ? c : (0, mt.default)(i).call(i, "bottom") ? c + e : c + e / 2);
	}
	return [r, i];
}
var St = /* @__PURE__ */ new Set([
	"desc",
	"metadata",
	"title"
]), Ct = (e) => St.has(e.nodeName), wt = (e, t, n = {}) => {
	let r = { ...t };
	for (let e in r) r[e].valueOf() === n[e] && delete r[e];
	Object.keys(r).length ? e.node.setAttribute("data-svgjs", JSON.stringify(r)) : (e.node.removeAttribute("data-svgjs"), e.node.removeAttribute("svgjs:data"));
}, Tt = "http://www.w3.org/2000/svg", Et = "http://www.w3.org/1999/xhtml", Dt = "http://www.w3.org/2000/xmlns/", Ot = "http://www.w3.org/1999/xlink", T = {
	window: typeof window > "u" ? null : window,
	document: typeof document > "u" ? null : document
};
function kt() {
	return T.window;
}
var At = class {}, jt = {}, Mt = "___SYMBOL___ROOT___";
function Nt(e, t = Tt) {
	return T.document.createElementNS(t, e);
}
function E(e, t = !1) {
	if (e instanceof At) return e;
	if (typeof e == "object") return Pt(e);
	if (e == null) return new jt[Mt]();
	if (typeof e == "string" && e.trim().charAt(0) !== "<") return Pt(T.document.querySelector(e));
	let n = t ? T.document.createElement("div") : Nt("svg");
	return n.innerHTML = e.trim(), e = Pt(n.firstElementChild), n.removeChild(n.firstElementChild), e;
}
function D(e, t) {
	return t && (t instanceof T.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Nt(e);
}
function O(e) {
	if (!e) return null;
	if (e.instance instanceof At) return e.instance;
	if (e.nodeName === "#document-fragment") return new jt.Fragment(e);
	let t = yt(e.nodeName || "Dom");
	return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : jt[t] || (t = "Dom"), new jt[t](e);
}
var Pt = O;
function k(e, t = e.name, n = !1) {
	return jt[t] = e, n && (jt[Mt] = e), ne(Object.getOwnPropertyNames(e.prototype)), e;
}
function Ft(e) {
	return jt[e];
}
var It = 1e3;
function Lt(e) {
	return "Svgjs" + yt(e) + It++;
}
function Rt(e) {
	for (let t = e.children.length - 1; t >= 0; t--) Rt(e.children[t]);
	return e.id &&= Lt(e.nodeName), e;
}
function A(e, t) {
	let n, r;
	for (e = Array.isArray(e) ? e : [e], r = e.length - 1; r >= 0; r--) for (n in t) e[r].prototype[n] = t[n];
}
function j(e) {
	return function(...t) {
		let n = t[t.length - 1];
		return n && n.constructor === Object && !(n instanceof Array) ? e.apply(this, t.slice(0, -1)).attr(n) : e.apply(this, t);
	};
}
function zt() {
	return this.parent().children();
}
function Bt() {
	return this.parent().index(this);
}
function Vt() {
	return this.siblings()[this.position() + 1];
}
function Ht() {
	return this.siblings()[this.position() - 1];
}
function Ut() {
	let e = this.position();
	return this.parent().add(this.remove(), e + 1), this;
}
function Wt() {
	let e = this.position();
	return this.parent().add(this.remove(), e ? e - 1 : 0), this;
}
function Gt() {
	return this.parent().add(this.remove()), this;
}
function Kt() {
	return this.parent().add(this.remove(), 0), this;
}
function qt(e) {
	e = E(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t), this;
}
function Jt(e) {
	e = E(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t + 1), this;
}
function Yt(e) {
	return e = E(e), e.before(this), this;
}
function Xt(e) {
	return e = E(e), e.after(this), this;
}
y("Dom", {
	siblings: zt,
	position: Bt,
	next: Vt,
	prev: Ht,
	forward: Ut,
	backward: Wt,
	front: Gt,
	back: Kt,
	before: qt,
	after: Jt,
	insertBefore: Yt,
	insertAfter: Xt
});
var Zt = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Qt = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, $t = /rgb\((\d+),(\d+),(\d+)\)/, en = /^(#[^\s]+)$/, tn = /\)\s*,?\s*/, nn = /\s/g, rn = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, an = /^rgb\(/, on = /^(\s+)?$/, sn = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, cn = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, ln = /[\s,]+/, un = /[MLHVCSQTAZ]/i;
function dn() {
	let e = this.attr("class");
	return e == null ? [] : e.trim().split(ln);
}
function fn(e) {
	return this.classes().indexOf(e) !== -1;
}
function pn(e) {
	if (!this.hasClass(e)) {
		let t = this.classes();
		t.push(e), this.attr("class", t.join(" "));
	}
	return this;
}
function mn(e) {
	return this.hasClass(e) && this.attr("class", this.classes().filter(function(t) {
		return t !== e;
	}).join(" ")), this;
}
function hn(e) {
	return this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
}
y("Dom", {
	classes: dn,
	hasClass: fn,
	addClass: pn,
	removeClass: mn,
	toggleClass: hn
});
var gn = (e) => e.startsWith("--") ? e : vt(e);
function _n(e, t) {
	let n = {};
	if (arguments.length === 0) {
		let e = this.node.style;
		for (let t = 0; t < e.length; t++) {
			let r = e.item(t), i = e.getPropertyValue(r), a = e.getPropertyPriority(r);
			n[r] = a ? `${i} !${a}` : i;
		}
		return n;
	}
	if (arguments.length < 2) {
		if (Array.isArray(e)) {
			for (let t of e) {
				let e = gn(t);
				n[t] = this.node.style.getPropertyValue(e);
			}
			return n;
		}
		if (typeof e == "string") return this.node.style.getPropertyValue(gn(e));
		if (typeof e == "object") for (let t in e) this.node.style.setProperty(gn(t), e[t] == null || on.test(e[t]) ? "" : e[t]);
	}
	return arguments.length === 2 && this.node.style.setProperty(gn(e), t == null || on.test(t) ? "" : t), this;
}
function vn() {
	return this.css("display", "");
}
function yn() {
	return this.css("display", "none");
}
function bn() {
	return this.css("display") !== "none";
}
y("Dom", {
	css: _n,
	show: vn,
	hide: yn,
	visible: bn
});
function xn(e, t, n) {
	if (e == null) return this.data(ht(gt(this.node.attributes, (e) => e.nodeName.indexOf("data-") === 0), (e) => e.nodeName.slice(5)));
	if (e instanceof Array) {
		let t = {};
		for (let n of e) t[n] = this.data(n);
		return t;
	}
	if (typeof e == "object") for (t in e) this.data(t, e[t]);
	else if (arguments.length < 2) try {
		return JSON.parse(this.attr("data-" + e));
	} catch {
		return this.attr("data-" + e);
	}
	else this.attr("data-" + e, t === null ? null : n === !0 || typeof t == "string" || typeof t == "number" ? t : JSON.stringify(t));
	return this;
}
y("Dom", { data: xn });
function Sn(e, t) {
	if (typeof arguments[0] == "object") for (let t in e) this.remember(t, e[t]);
	else if (arguments.length === 1) return this.memory()[e];
	else this.memory()[e] = t;
	return this;
}
function Cn() {
	if (arguments.length === 0) this._memory = {};
	else for (let e = arguments.length - 1; e >= 0; e--) delete this.memory()[arguments[e]];
	return this;
}
function wn() {
	return this._memory = this._memory || {};
}
y("Dom", {
	remember: Sn,
	forget: Cn,
	memory: wn
});
function Tn(e) {
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
function En(e) {
	let t = Math.max(0, Math.min(255, Math.round(e))).toString(16);
	return t.length === 1 ? "0" + t : t;
}
function Dn(e, t) {
	for (let n = t.length; n--;) if (e[t[n]] == null) return !1;
	return !0;
}
function On(e, t) {
	let n = Dn(e, "rgb") ? {
		_a: e.r,
		_b: e.g,
		_c: e.b,
		_d: 0,
		space: "rgb"
	} : Dn(e, "xyz") ? {
		_a: e.x,
		_b: e.y,
		_c: e.z,
		_d: 0,
		space: "xyz"
	} : Dn(e, "hsl") ? {
		_a: e.h,
		_b: e.s,
		_c: e.l,
		_d: 0,
		space: "hsl"
	} : Dn(e, "lab") ? {
		_a: e.l,
		_b: e.a,
		_c: e.b,
		_d: 0,
		space: "lab"
	} : Dn(e, "lch") ? {
		_a: e.l,
		_b: e.c,
		_c: e.h,
		_d: 0,
		space: "lch"
	} : Dn(e, "cmyk") ? {
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
function kn(e) {
	return e === "lab" || e === "xyz" || e === "lch";
}
function An(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
var jn = class e {
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
		}
		if (t === "sine") {
			n ??= r();
			let t = i(80 * a(2 * o * n / .5 + .01) + 150), s = i(50 * a(2 * o * n / .5 + 4.6) + 200), c = i(100 * a(2 * o * n / .5 + 2.3) + 150);
			return new e(t, s, c);
		}
		if (t === "pastel") {
			let t = 8 * r() + 86, n = 17 * r() + 9, i = 360 * r();
			return new e(t, n, i, "lch");
		}
		if (t === "dark") {
			let t = 10 + 10 * r(), n = 50 * r() + 86, i = 360 * r();
			return new e(t, n, i, "lch");
		}
		if (t === "rgb") {
			let t = 255 * r(), n = 255 * r(), i = 255 * r();
			return new e(t, n, i);
		}
		if (t === "lab") {
			let t = 100 * r(), n = 256 * r() - 128, i = 256 * r() - 128;
			return new e(t, n, i, "lab");
		}
		if (t === "grey") {
			let t = 255 * r();
			return new e(t, t, t);
		}
		throw Error("Unsupported random color mode");
	}
	static test(e) {
		return typeof e == "string" && (rn.test(e) || an.test(e));
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
			let n = On(e, t);
			Object.assign(this, n);
		} else if (typeof e == "string") {
			if (an.test(e)) {
				let t = e.replace(nn, ""), [n, r, i] = $t.exec(t).slice(1, 4).map((e) => parseInt(e));
				Object.assign(this, {
					_a: n,
					_b: r,
					_c: i,
					_d: 0,
					space: "rgb"
				});
			} else if (rn.test(e)) {
				let [, t, n, r] = Qt.exec(Tn(e)).map((e) => parseInt(e, 16));
				Object.assign(this, {
					_a: t,
					_b: n,
					_c: r,
					_d: 0,
					space: "rgb"
				});
			} else throw Error("Unsupported string format, can't construct Color");
		}
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
		if (kn(this.space)) {
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
		}
		if (this.space === "hsl") {
			let { h: t, s: n, l: r } = this;
			if (t /= 360, n /= 100, r /= 100, n === 0) return r *= 255, new e(r, r, r);
			let i = r < .5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i, o = 255 * An(a, i, t + 1 / 3), s = 255 * An(a, i, t), c = 255 * An(a, i, t - 1 / 3);
			return new e(o, s, c);
		}
		if (this.space === "cmyk") {
			let { c: t, m: n, y: r, k: i } = this, a = 255 * (1 - Math.min(1, t * (1 - i) + i)), o = 255 * (1 - Math.min(1, n * (1 - i) + i)), s = 255 * (1 - Math.min(1, r * (1 - i) + i));
			return new e(a, o, s);
		}
		return this;
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
		let [e, t, n] = this._clamped().map(En);
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
}, M = class e {
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
		N.isMatrixLike(e) || (e = new N(e));
		let { x: t, y: n } = this;
		return this.x = e.a * t + e.c * n + e.e, this.y = e.b * t + e.d * n + e.f, this;
	}
};
function Mn(e, t) {
	return new M(e, t).transformO(this.screenCTM().inverseO());
}
function Nn(e, t, n) {
	return Math.abs(t - e) < (n || 1e-6);
}
var N = class e {
	constructor(...e) {
		this.init(...e);
	}
	static formatTransforms(e) {
		let t = e.flip === "both" || e.flip === !0, n = e.flip && (t || e.flip === "x") ? -1 : 1, r = e.flip && (t || e.flip === "y") ? -1 : 1, i = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, a = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, o = e.scale && e.scale.length ? e.scale[0] * n : isFinite(e.scale) ? e.scale * n : isFinite(e.scaleX) ? e.scaleX * n : n, s = e.scale && e.scale.length ? e.scale[1] * r : isFinite(e.scale) ? e.scale * r : isFinite(e.scaleY) ? e.scaleY * r : r, c = e.shear || 0, l = e.rotate || e.theta || 0, u = new M(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), d = u.x, f = u.y, p = new M(e.position ?? e.px ?? e.positionX ?? NaN, e.py ?? e.positionY ?? NaN), m = p.x, h = p.y, g = new M(e.translate || e.tx || e.translateX, e.ty || e.translateY), _ = g.x, ee = g.y, te = new M(e.relative || e.rx || e.relativeX, e.ry || e.relativeY);
		return {
			scaleX: o,
			scaleY: s,
			skewX: i,
			skewY: a,
			shear: c,
			theta: l,
			rx: te.x,
			ry: te.y,
			tx: _,
			ty: ee,
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
		let n = this.a, r = this.b, i = this.c, a = this.d, o = this.e, s = this.f, c = n * a - r * i, l = c > 0 ? 1 : -1, u = l * Math.sqrt(n * n + r * r), d = Math.atan2(l * r, l * n), f = 180 / Math.PI * d, p = (n * i + r * a) / c;
		return {
			scaleX: u,
			scaleY: i * u / (p * n - r) || a * u / (p * r + n),
			shear: p,
			rotate: f,
			translateX: o - e + e * n + t * i,
			translateY: s - t + e * r + t * a,
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
		return Nn(this.a, n.a) && Nn(this.b, n.b) && Nn(this.c, n.c) && Nn(this.d, n.d) && Nn(this.e, n.e) && Nn(this.f, n.f);
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
		return t = t instanceof vr ? t.matrixify() : typeof t == "string" ? e.fromArray(t.split(ln).map(parseFloat)) : Array.isArray(t) ? e.fromArray(t) : typeof t == "object" && e.isMatrixLike(t) ? t : typeof t == "object" ? new e().transform(t) : arguments.length === 6 ? e.fromArray([].slice.call(arguments)) : n, this.a = t.a == null ? n.a : t.a, this.b = t.b == null ? n.b : t.b, this.c = t.c == null ? n.c : t.c, this.d = t.d == null ? n.d : t.d, this.e = t.e == null ? n.e : t.e, this.f = t.f == null ? n.f : t.f, this;
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
		e = _t(e);
		let r = Math.cos(e), i = Math.sin(e), { a, b: o, c: s, d: c, e: l, f: u } = this;
		return this.a = a * r - o * i, this.b = o * r + a * i, this.c = s * r - c * i, this.d = c * r + s * i, this.e = l * r - u * i + n * i - t * r + t, this.f = u * r + l * i - t * i - n * r + n, this;
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
		arguments.length === 3 && (r = n, n = t, t = e), e = _t(e), t = _t(t);
		let i = Math.tan(e), a = Math.tan(t), { a: o, b: s, c, d: l, e: u, f: d } = this;
		return this.a = o + s * i, this.b = s + o * a, this.c = c + l * i, this.d = l + c * a, this.e = u + d * i - r * i, this.f = d + u * a - n * a, this;
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
		let n = e.formatTransforms(t), r = this, { x: i, y: a } = new M(n.ox, n.oy).transform(r), o = new e().translateO(n.rx, n.ry).lmultiplyO(r).translateO(-i, -a).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(i, a);
		if (isFinite(n.px) || isFinite(n.py)) {
			let e = new M(i, a).transform(o), t = isFinite(n.px) ? n.px - e.x : 0, r = isFinite(n.py) ? n.py - e.y : 0;
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
function Pn() {
	return new N(this.node.getCTM());
}
function Fn() {
	try {
		if (typeof this.isRoot == "function" && !this.isRoot()) {
			let e = this.rect(1, 1), t = e.node.getScreenCTM();
			return e.remove(), new N(t);
		}
		return new N(this.node.getScreenCTM());
	} catch {
		return console.warn(`Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`), new N();
	}
}
k(N, "Matrix");
function In() {
	if (!In.nodes || In.nodes.svg.node.ownerDocument !== T.document) {
		let e = E().size(2, 0);
		e.node.style.cssText = "opacity: 0;position: absolute;left: -100%;top: -100%;overflow: hidden", e.attr("focusable", "false"), e.attr("aria-hidden", "true"), In.nodes = {
			svg: e,
			path: e.path().node
		};
	}
	return In.nodes.svg.node.parentNode || In.nodes.svg.addTo(T.document.body || T.document.documentElement), In.nodes;
}
function Ln(e) {
	return !e.width && !e.height && !e.x && !e.y;
}
function Rn(e) {
	return e === T.document || (T.document.documentElement.contains || function(e) {
		for (; e.parentNode;) e = e.parentNode;
		return e === T.document;
	}).call(T.document.documentElement, e);
}
var P = class e {
	constructor(...e) {
		this.init(...e);
	}
	addOffset() {
		return this.x += T.window.pageXOffset, this.y += T.window.pageYOffset, new e(this);
	}
	init(e) {
		return e = typeof e == "string" ? e.split(ln).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [
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
		return Ln(this);
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
		t instanceof N || (t = new N(t));
		let n = Infinity, r = -Infinity, i = Infinity, a = -Infinity;
		return [
			new M(this.x, this.y),
			new M(this.x2, this.y),
			new M(this.x, this.y2),
			new M(this.x2, this.y2)
		].forEach(function(e) {
			e = e.transform(t), n = Math.min(n, e.x), r = Math.max(r, e.x), i = Math.min(i, e.y), a = Math.max(a, e.y);
		}), new e(n, i, r - n, a - i);
	}
};
function zn(e, t, n) {
	let r;
	try {
		if (r = t(e.node), Ln(r) && !Rn(e.node)) throw Error("Element not in the dom");
	} catch {
		r = n(e);
	}
	return r;
}
function Bn() {
	return new P(zn(this, (e) => e.getBBox(), (e) => {
		try {
			let t = e.clone().addTo(In().svg).show(), n = t.node.getBBox();
			return t.remove(), n;
		} catch (t) {
			throw Error(`Getting bbox of element "${e.node.nodeName}" is not possible: ${t.toString()}`);
		}
	}));
}
function Vn(e) {
	let t = new P(zn(this, (e) => e.getBoundingClientRect(), (e) => {
		throw Error(`Getting rbox of element "${e.node.nodeName}" is not possible`);
	}));
	return e ? t.transform(e.screenCTM().inverseO()) : t.addOffset();
}
function Hn(e, t) {
	let n = this.bbox();
	return e > n.x && t > n.y && e < n.x + n.width && t < n.y + n.height;
}
y({ viewbox: {
	viewbox(e, t, n, r) {
		return e == null ? new P(this.attr("viewBox")) : this.attr("viewBox", new P(e, t, n, r));
	},
	zoom(e, t) {
		let { width: n, height: r } = this.attr(["width", "height"]);
		if ((!n && !r || typeof n == "string" || typeof r == "string") && (n = this.node.clientWidth, r = this.node.clientHeight), !n || !r) throw Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
		let i = this.viewbox(), a = n / i.width, o = r / i.height, s = Math.min(a, o);
		if (e == null) return s;
		let c = s / e;
		c === Infinity && (c = (2 ** 53 - 1) / 100), t ||= new M(n / 2 / a + i.x, r / 2 / o + i.y);
		let l = new P(i).transform(new N({
			scale: c,
			origin: t
		}));
		return this.viewbox(l);
	}
} }), k(P, "Box");
var Un = class extends Array {
	constructor(e = [], ...t) {
		if (super(e, ...t), typeof e == "number") return this;
		this.length = 0, this.push(...e);
	}
};
A([Un], {
	each(e, ...t) {
		return typeof e == "function" ? this.map((t, n, r) => e.call(t, t, n, r)) : this.map((n) => n[e](...t));
	},
	toArray() {
		return Array.prototype.concat.apply([], this);
	}
});
var Wn = [
	"toArray",
	"constructor",
	"each"
];
Un.extend = function(e) {
	e = e.reduce((e, t) => ((0, mt.default)(Wn).call(Wn, t) || t[0] === "_" || (t in Array.prototype && (e["$" + t] = Array.prototype[t]), e[t] = function(...e) {
		return this.each(t, ...e);
	}), e), {}), A([Un], e);
};
function Gn(e) {
	let t = (e + "").trim(), n = t.match(/^url\((.*)\)$/i);
	if (n) {
		t = n[1].trim();
		let e = t[0];
		if (e === "\"" || e === "'") {
			if (t[t.length - 1] !== e) return null;
			t = t.slice(1, -1);
		}
	}
	let r = t.match(en);
	return r ? r[1].slice(1) : null;
}
function Kn(e, t) {
	let n = `#${T.window.CSS.escape(t)}`;
	return e.nodeType === 1 && e.matches(n) ? e : e.querySelector(n);
}
function qn(e, t) {
	let n = Gn(t);
	return n ? Kn(e.getRootNode(), n) : null;
}
function Jn(e, t, n = `[${t}]`) {
	let r = e.getAttribute("id"), i = e.getRootNode();
	if (!r || Kn(i, r) !== e) return new Un();
	let a = [];
	i.nodeType === 1 && i.matches(n) && Gn(i.getAttribute(t)) === r && a.push(O(i));
	for (let e of i.querySelectorAll(n)) Gn(e.getAttribute(t)) === r && a.push(O(e));
	return new Un(a);
}
function Yn(e, t) {
	return new Un(ht((t || T.document).querySelectorAll(e), function(e) {
		return O(e);
	}));
}
function Xn(e) {
	return Yn(e, this.node);
}
function Zn(e) {
	return O(this.node.querySelector(e));
}
var Qn = 0, $n = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), tr = () => Object.create(null);
function nr(e) {
	let t = e.getEventHolder(), n = $n.get(t);
	return n || (n = tr(), $n.set(t, n)), n;
}
function rr(e) {
	return e.getEventTarget();
}
function ir(e) {
	$n.delete(e.getEventHolder());
}
function ar(e, t, n, r, i) {
	let a = n.bind(r || e), o = i || !1, s = E(e), c = nr(s), l = rr(s);
	t = Array.isArray(t) ? t : t.split(ln);
	let u = er.get(n);
	u || (u = ++Qn, er.set(n, u)), t.forEach(function(e) {
		let t = e.split(".")[0], n = e.split(".")[1] || "*";
		c[t] = c[t] || tr(), c[t][n] = c[t][n] || tr(), c[t][n][u] = c[t][n][u] || [], c[t][n][u].push({
			listener: a,
			options: o
		}), l.addEventListener(t, a, o);
	});
}
function or(e, t, n, r) {
	let i = E(e), a = nr(i), o = rr(i);
	typeof n == "function" && (n = er.get(n), !n) || (t = Array.isArray(t) ? t : (t || "").split(ln), t.forEach(function(e) {
		let t = e && e.split(".")[0], s = e && e.split(".")[1], c, l;
		if (n) {
			if (a[t] && a[t][s || "*"]) {
				let e = a[t][s || "*"][n];
				if (!e) return;
				e.forEach(function(e) {
					o.removeEventListener(t, e.listener, e.options ?? r ?? !1);
				}), delete a[t][s || "*"][n];
			}
		} else if (t && s) {
			if (a[t] && a[t][s]) {
				for (l in a[t][s]) or(o, [t, s].join("."), l);
				delete a[t][s];
			}
		} else if (s) for (e in a) for (c in a[e]) s === c && or(o, [e, s].join("."));
		else if (t) {
			if (a[t]) {
				for (c in a[t]) or(o, [t, c].join("."));
				delete a[t];
			}
		} else {
			for (e in a) or(o, e);
			ir(i);
		}
	}));
}
function sr(e, t, n, r) {
	let i = rr(e);
	return t instanceof T.window.Event || (t = new T.window.CustomEvent(t, {
		detail: n,
		cancelable: !0,
		...r
	})), i.dispatchEvent(t), t;
}
var cr = class extends At {
	addEventListener() {}
	dispatch(e, t, n) {
		return sr(this, e, t, n);
	}
	dispatchEvent(e) {
		let t = nr(this)[e.type];
		if (!t) return !0;
		for (let n in t) for (let r in t[n]) t[n][r].forEach(function(t) {
			t.listener(e);
		});
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
		return or(this, e, t, n), this;
	}
	on(e, t, n, r) {
		return ar(this, e, t, n, r), this;
	}
	removeEventListener() {}
};
k(cr, "EventTarget");
function lr() {}
var ur = {
	duration: 400,
	ease: ">",
	delay: 0
}, dr = {
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
}, fr = class extends Array {
	constructor(...e) {
		super(...e), this.init(...e);
	}
	clone() {
		return new this.constructor(this);
	}
	init(e) {
		return typeof e == "number" || (this.length = 0, this.push(...this.parse(e))), this;
	}
	parse(e = []) {
		return e instanceof Array ? e : e.trim().split(ln).map(parseFloat);
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
}, F = class e {
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
		return n = Array.isArray(t) ? t[1] : n, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = n || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (n = t.match(Zt), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : t instanceof e && (this.value = t.valueOf(), this.unit = t.unit), this;
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
}, pr = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"bgcolor",
	"stop-color",
	"flood-color",
	"lighting-color"
]), mr = [];
function hr(e) {
	mr.push(e);
}
function gr(e, t, n) {
	if (e == null) {
		e = {}, t = this.node.attributes;
		for (let n of t) e[n.nodeName] = sn.test(n.nodeValue) ? parseFloat(n.nodeValue) : n.nodeValue;
		return e;
	}
	if (e instanceof Array) return e.reduce((e, t) => (e[t] = this.attr(t), e), {});
	if (typeof e == "object" && e.constructor === Object) for (t in e) this.attr(t, e[t]);
	else if (t === null) this.node.removeAttribute(e);
	else if (t == null) return t = this.node.getAttribute(e), t == null ? dr[e] : sn.test(t) ? parseFloat(t) : t;
	else t = mr.reduce((t, n) => n(e, t, this), t), typeof t == "number" ? t = new F(t) : pr.has(e) && jn.isColor(t) ? t = new jn(t) : t.constructor === Array && (t = new fr(t)), e === "leading" ? this.leading && this.leading(t) : typeof n == "string" ? this.node.setAttributeNS(n, e, t.toString()) : this.node.setAttribute(e, t.toString()), this.rebuild && (e === "font-size" || e === "x") && this.rebuild();
	return this;
}
var _r = class e extends cr {
	constructor(e, t) {
		super(), this.node = e, this.type = e.nodeName, t && e !== t && this.attr(t);
	}
	add(e, t) {
		return e = E(e), e.removeNamespace && this.node instanceof T.window.SVGElement && e.removeNamespace(), t == null ? this.node.appendChild(e.node) : e.node !== this.node.childNodes[t] && this.node.insertBefore(e.node, this.node.childNodes[t]), this;
	}
	addTo(e, t) {
		return E(e).put(this, t);
	}
	children() {
		return new Un(ht(this.node.children, function(e) {
			return O(e);
		}));
	}
	clear() {
		for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);
		return this;
	}
	clone(e = !0, t = !0) {
		this.writeDataToDom();
		let n = this.node.cloneNode(e);
		return t && (n = Rt(n)), new this.constructor(n);
	}
	each(e, t) {
		let n = this.children(), r, i;
		for (r = 0, i = n.length; r < i; r++) e.apply(n[r], [r, n]), t && n[r].each(e, t);
		return this;
	}
	element(t, n) {
		return this.put(new e(Nt(t), n));
	}
	first() {
		return O(this.node.firstChild);
	}
	get(e) {
		return O(this.node.childNodes[e]);
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
		return this.xml(e, t, Et);
	}
	id(e) {
		return e === void 0 && !this.node.id && (this.node.id = Lt(this.type)), this.attr("id", e);
	}
	index(e) {
		return [].slice.call(this.node.childNodes).indexOf(e.node);
	}
	last() {
		return O(this.node.lastChild);
	}
	matches(e) {
		let t = this.node, n = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector || null;
		return n && n.call(t, e);
	}
	parent(e) {
		let t = this;
		if (!t.node.parentNode) return null;
		if (t = O(t.node.parentNode), !e) return t;
		do
			if (typeof e == "string" ? t.matches(e) : t instanceof e) return t;
		while (t = O(t.node.parentNode));
		return t;
	}
	put(e, t) {
		return e = E(e), this.add(e, t), e;
	}
	putIn(e, t) {
		return E(e).add(this, t);
	}
	remove() {
		return this.parent() && this.parent().removeElement(this), this;
	}
	removeElement(e) {
		return this.node.removeChild(e.node), this;
	}
	replace(e) {
		return e = E(e), this.node.parentNode && this.node.parentNode.replaceChild(e.node, this.node), e;
	}
	round(e = 2, t = null) {
		let n = 10 ** e, r = this.attr(t);
		for (let e in r) typeof r[e] == "number" && (r[e] = Math.round(r[e] * n) / n);
		return this.attr(r), this;
	}
	svg(e, t) {
		return this.xml(e, t, Tt);
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
				if (n = O(n.node.cloneNode(!0)), t) {
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
		let r = Nt("wrapper", n), i = T.document.createDocumentFragment();
		r.innerHTML = e;
		for (let e = r.children.length; e--;) i.appendChild(r.firstElementChild);
		let a = this.parent();
		return t ? this.replace(i) && a : this.add(i);
	}
};
A(_r, {
	attr: gr,
	find: Xn,
	findOne: Zn
}), k(_r, "Dom");
var vr = class extends _r {
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
		return this.x(new F(e).plus(this.x()));
	}
	dy(e = 0) {
		return this.y(new F(e).plus(this.y()));
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
		let t = typeof e == "string", n = this.root(), r = n && n.node;
		t || (e &&= E(e).node);
		let i = new Un(), a = this;
		for (; (a = a.parent()) && a.node !== T.document && a.node.nodeName !== "#document-fragment" && (i.push(a), !(!t && a.node === e || t && a.matches(e)));) if (r && a.node === r) return null;
		return i;
	}
	reference(e) {
		if (e = this.attr(e), !e) return null;
		let t = qn(this.node, e);
		return t ? E(t) : null;
	}
	root() {
		let e = this.parent(Ft(Mt));
		return e && e.root();
	}
	setData(e) {
		return this.dom = e, this;
	}
	size(e, t) {
		let n = bt(this, e, t);
		return this.width(new F(n.width)).height(new F(n.height));
	}
	width(e) {
		return this.attr("width", e);
	}
	writeDataToDom(e) {
		return wt(this, this.dom, e), super.writeDataToDom();
	}
	x(e) {
		return this.attr("x", e);
	}
	y(e) {
		return this.attr("y", e);
	}
};
A(vr, {
	bbox: Bn,
	rbox: Vn,
	inside: Hn,
	point: Mn,
	ctm: Pn,
	screenCTM: Fn
}), k(vr, "Element");
var yr = {
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
		if (typeof t == "string" || t instanceof jn || jn.isRgb(t) || t instanceof vr) this.attr(e, t);
		else for (n = yr[e].length - 1; n >= 0; n--) t[yr[e][n]] != null && this.attr(yr.prefix(e, yr[e][n]), t[yr[e][n]]);
		return this;
	}, y(["Element", "Runner"], t);
}), y(["Element", "Runner"], {
	matrix: function(e, t, n, r, i, a) {
		return e == null ? new N(this) : this.attr("transform", new N(e, t, n, r, i, a));
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
}), y("radius", { radius: function(e, t = e) {
	return (this._element || this).type === "radialGradient" ? this.attr("r", new F(e)) : this.rx(e).ry(t);
} }), y("Path", {
	length: function() {
		return this.node.getTotalLength();
	},
	pointAt: function(e) {
		return new M(this.node.getPointAtLength(e));
	}
}), y(["Element", "Runner"], { font: function(e, t) {
	if (typeof e == "object") {
		for (t in e) this.font(t, e[t]);
		return this;
	}
	return e === "leading" ? this.leading(t) : e === "anchor" ? this.attr("text-anchor", t) : e === "size" || e === "family" || e === "weight" || e === "stretch" || e === "variant" || e === "style" ? this.attr("font-" + e, t) : this.attr(e, t);
} }), y("Element", [
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
function br() {
	return this.attr("transform", null);
}
function xr() {
	return (this.attr("transform") || "").split(tn).slice(0, -1).map(function(e) {
		let t = e.trim().split("(");
		return [t[0].trim(), t[1].split(ln).map(function(e) {
			return parseFloat(e);
		})];
	}).reverse().reduce(function(e, t) {
		return t[0] === "matrix" ? e.lmultiply(N.fromArray(t[1])) : e[t[0]].apply(e, t[1]);
	}, new N());
}
function Sr(e, t) {
	if (this === e) return this;
	if (Ct(this.node)) return this.addTo(e, t);
	let n = this.screenCTM(), r = e.screenCTM().inverse();
	return this.addTo(e, t).untransform().transform(r.multiply(n)), this;
}
function Cr(e) {
	return this.toParent(this.root(), e);
}
function wr(e, t) {
	if (e == null || typeof e == "string") {
		let t = new N(this).decompose();
		return e == null ? t : t[e];
	}
	N.isMatrixLike(e) || (e = {
		...e,
		origin: xt(e, this)
	});
	let n = new N(t === !0 ? this : t || !1).transform(e);
	return this.attr("transform", n);
}
y("Element", {
	untransform: br,
	matrixify: xr,
	toParent: Sr,
	toRoot: Cr,
	transform: wr
});
var I = class e extends vr {
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
k(I, "Container");
var Tr = class extends I {
	constructor(e, t = e) {
		super(D("defs", e), t);
	}
	flatten() {
		return this;
	}
	ungroup() {
		return this;
	}
};
k(Tr, "Defs");
var L = class extends vr {};
k(L, "Shape");
var Er = /* @__PURE__ */ g({
	cx: () => jr,
	cy: () => Mr,
	height: () => Pr,
	rx: () => Dr,
	ry: () => Or,
	width: () => Nr,
	x: () => kr,
	y: () => Ar
});
function Dr(e) {
	return this.attr("rx", e);
}
function Or(e) {
	return this.attr("ry", e);
}
function kr(e) {
	return e == null ? this.cx() - this.rx() : this.cx(e + this.rx());
}
function Ar(e) {
	return e == null ? this.cy() - this.ry() : this.cy(e + this.ry());
}
function jr(e) {
	return this.attr("cx", e);
}
function Mr(e) {
	return this.attr("cy", e);
}
function Nr(e) {
	return e == null ? this.rx() * 2 : this.rx(new F(e).divide(2));
}
function Pr(e) {
	return e == null ? this.ry() * 2 : this.ry(new F(e).divide(2));
}
var Fr = class extends L {
	constructor(e, t = e) {
		super(D("ellipse", e), t);
	}
	size(e, t) {
		let n = bt(this, e, t);
		return this.rx(new F(n.width).divide(2)).ry(new F(n.height).divide(2));
	}
};
A(Fr, Er), y("Container", { ellipse: j(function(e = 0, t = e) {
	return this.put(new Fr()).size(e, t).move(0, 0);
}) }), k(Fr, "Ellipse");
var Ir = class extends _r {
	constructor(e = T.document.createDocumentFragment()) {
		super(e);
	}
	xml(e, t, n) {
		if (typeof e == "boolean" && (n = t, t = e, e = null), e == null || typeof e == "function") {
			let e = new _r(Nt("wrapper", n));
			return e.add(this.node.cloneNode(!0)), e.xml(!1, n);
		}
		return super.xml(e, !1, n);
	}
};
k(Ir, "Fragment");
var Lr = /* @__PURE__ */ g({
	from: () => Rr,
	to: () => zr
});
function Rr(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		fx: new F(e),
		fy: new F(t)
	}) : this.attr({
		x1: new F(e),
		y1: new F(t)
	});
}
function zr(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		cx: new F(e),
		cy: new F(t)
	}) : this.attr({
		x2: new F(e),
		y2: new F(t)
	});
}
var Br = class extends I {
	constructor(e, t) {
		super(D(e + "Gradient", typeof e == "string" ? null : e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "gradientTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new P();
	}
	targets() {
		return Jn(this.node, "fill");
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
A(Br, Lr), y({
	Container: { gradient(...e) {
		return this.defs().gradient(...e);
	} },
	Defs: { gradient: j(function(e, t) {
		return this.put(new Br(e)).update(t);
	}) }
}), k(Br, "Gradient");
var Vr = class extends I {
	constructor(e, t = e) {
		super(D("pattern", e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "patternTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new P();
	}
	targets() {
		return Jn(this.node, "fill");
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
y({
	Container: { pattern(...e) {
		return this.defs().pattern(...e);
	} },
	Defs: { pattern: j(function(e, t, n) {
		return this.put(new Vr()).update(n).attr({
			x: 0,
			y: 0,
			width: e,
			height: t,
			patternUnits: "userSpaceOnUse"
		});
	}) }
}), k(Vr, "Pattern");
var Hr = class extends L {
	constructor(e, t = e) {
		super(D("image", e), t);
	}
	load(e, t) {
		if (!e) return this;
		let n = new T.window.Image();
		return ar(n, "load", function(e) {
			let r = this.parent(Vr);
			this.width() === 0 && this.height() === 0 && this.size(n.width, n.height), r instanceof Vr && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof t == "function" && t.call(this, e);
		}, this), ar(n, "load error", function() {
			or(n);
		}), this.attr("href", n.src = e, Ot);
	}
};
hr(function(e, t, n) {
	return (e === "fill" || e === "stroke") && cn.test(t) && (t = n.root().defs().image(t)), t instanceof Hr && (t = n.root().defs().pattern(0, 0, (e) => {
		e.add(t);
	})), t;
}), y({ Container: { image: j(function(e, t) {
	return this.put(new Hr()).size(0, 0).load(e, t);
}) } }), k(Hr, "Image");
var Ur = class extends fr {
	bbox() {
		let e = -Infinity, t = -Infinity, n = Infinity, r = Infinity;
		return this.forEach(function(i) {
			e = Math.max(i[0], e), t = Math.max(i[1], t), n = Math.min(i[0], n), r = Math.min(i[1], r);
		}), new P(n, r, e - n, t - r);
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n = this.length - 1; n >= 0; n--) this[n] = [this[n][0] + e, this[n][1] + t];
		return this;
	}
	parse(e = [0, 0]) {
		let t = [];
		e = e instanceof Array ? Array.prototype.concat.apply([], e) : e.trim().split(ln).map(parseFloat), e.length % 2 != 0 && e.pop();
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
		N.isMatrixLike(e) || (e = new N(e));
		for (let t = this.length; t--;) {
			let [n, r] = this[t];
			this[t][0] = e.a * n + e.c * r + e.e, this[t][1] = e.b * n + e.d * r + e.f;
		}
		return this;
	}
}, Wr = /* @__PURE__ */ g({
	MorphArray: () => Gr,
	height: () => Yr,
	width: () => Jr,
	x: () => Kr,
	y: () => qr
}), Gr = Ur;
function Kr(e) {
	return e == null ? this.bbox().x : this.move(e, this.bbox().y);
}
function qr(e) {
	return e == null ? this.bbox().y : this.move(this.bbox().x, e);
}
function Jr(e) {
	let t = this.bbox();
	return e == null ? t.width : this.size(e, t.height);
}
function Yr(e) {
	let t = this.bbox();
	return e == null ? t.height : this.size(t.width, e);
}
var Xr = class extends L {
	constructor(e, t = e) {
		super(D("line", e), t);
	}
	array() {
		return new Ur([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
	}
	move(e, t) {
		return this.attr(this.array().move(e, t).toLine());
	}
	plot(e, t, n, r) {
		return e == null ? this.array() : (e = t === void 0 ? new Ur(e).toLine() : {
			x1: e,
			y1: t,
			x2: n,
			y2: r
		}, this.attr(e));
	}
	size(e, t) {
		let n = bt(this, e, t);
		return this.attr(this.array().size(n.width, n.height).toLine());
	}
};
A(Xr, Wr), y({ Container: { line: j(function(...e) {
	return Xr.prototype.plot.apply(this.put(new Xr()), e[0] == null ? [
		0,
		0,
		0,
		0
	] : e);
}) } }), k(Xr, "Line");
var Zr = class extends I {
	constructor(e, t = e) {
		super(D("marker", e), t);
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
y({
	Container: { marker(...e) {
		return this.defs().marker(...e);
	} },
	Defs: { marker: j(function(e, t, n) {
		return this.put(new Zr()).size(e, t).ref(e / 2, t / 2).viewbox(0, 0, e, t).attr("orient", "auto").update(n);
	}) },
	marker: { marker(e, t, n, r) {
		let i = ["marker"];
		return e !== "all" && i.push(e), i = i.join("-"), e = arguments[1] instanceof Zr ? arguments[1] : this.defs().marker(t, n, r), this.attr(i, e);
	} }
}), k(Zr, "Marker");
function Qr(e, t) {
	return function(n) {
		return n == null ? this[e] : (this[e] = n, t && t.call(this), this);
	};
}
var $r = {
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
}, ei = class {
	done() {
		return !1;
	}
}, ti = class extends ei {
	constructor(e = ur.ease) {
		super(), this.ease = $r[e] || e;
	}
	step(e, t, n) {
		return typeof e == "number" ? e + (t - e) * this.ease(n) : n < 1 ? e : t;
	}
}, ni = class extends ei {
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
function ri() {
	let e = (this._duration || 500) / 1e3, t = this._overshoot || 0, n = Math.PI, r = Math.log(t / 100 + 1e-10), i = -r / Math.sqrt(n * n + r * r), a = 3.9 / (i * e);
	this.d = 2 * i * a, this.k = a * a;
}
A(class extends ni {
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
	duration: Qr("_duration", ri),
	overshoot: Qr("_overshoot", ri)
}), A(class extends ni {
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
	windup: Qr("_windup"),
	p: Qr("P"),
	i: Qr("I"),
	d: Qr("D")
});
var ii = {
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
}, ai = {
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
}, oi = "mlhvqtcsaz".split("");
for (let e = 0, t = oi.length; e < t; ++e) ai[oi[e]] = function(e) {
	return function(t, n, r) {
		if (e === "H") t[0] += n.x;
		else if (e === "V") t[0] += n.y;
		else if (e === "A") t[5] += n.x, t[6] += n.y;
		else for (let e = 0, r = t.length; e < r; ++e) t[e] = t[e] + (e % 2 ? n.y : n.x);
		return ai[e](t, n, r);
	};
}(oi[e].toUpperCase());
function si(e) {
	return ai[e.segment[0]](e.segment.slice(1), e.p, e.p0);
}
function ci(e) {
	return e.segment.length && e.segment.length - 1 === ii[e.segment[0].toUpperCase()];
}
function li(e, t) {
	e.inNumber && ui(e, !1);
	let n = un.test(t);
	if (n) e.segment = [t];
	else {
		let t = e.lastCommand, n = t.toLowerCase();
		e.segment = [n === "m" ? t === n ? "l" : "L" : t];
	}
	return e.inSegment = !0, e.lastCommand = e.segment[0], n;
}
function ui(e, t) {
	if (!e.inNumber) throw Error("Parser Error");
	e.number && e.segment.push(parseFloat(e.number)), e.inNumber = t, e.number = "", e.pointSeen = !1, e.hasExponent = !1, ci(e) && di(e);
}
function di(e) {
	e.inSegment = !1, e.absolute && (e.segment = si(e)), e.segments.push(e.segment);
}
function fi(e) {
	if (!e.segment.length) return !1;
	let t = e.segment[0].toUpperCase() === "A", n = e.segment.length;
	return t && (n === 4 || n === 5);
}
function pi(e) {
	return e.lastToken.toUpperCase() === "E";
}
var mi = /* @__PURE__ */ new Set([
	" ",
	",",
	"	",
	"\n",
	"\r",
	"\f"
]);
function hi(e, t = !0) {
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
		p0: new M(),
		p: new M()
	};
	for (; i.lastToken = r, r = e.charAt(n++);) if (i.inSegment || !li(i, r)) {
		if (r === ".") {
			if (i.pointSeen || i.hasExponent) {
				ui(i, !1), --n;
				continue;
			}
			i.inNumber = !0, i.pointSeen = !0, i.number += r;
		} else if (!isNaN(parseInt(r))) {
			if (i.number === "0" || fi(i)) {
				i.inNumber = !0, i.number = r, ui(i, !0);
				continue;
			}
			i.inNumber = !0, i.number += r;
		} else if (mi.has(r)) i.inNumber && ui(i, !1);
		else if (r === "-" || r === "+") {
			if (i.inNumber && !pi(i)) {
				ui(i, !1), --n;
				continue;
			}
			i.number += r, i.inNumber = !0;
		} else if (r.toUpperCase() === "E") i.number += r, i.hasExponent = !0;
		else if (un.test(r)) {
			if (i.inNumber) ui(i, !1);
			else if (ci(i)) di(i);
			else throw Error("parser Error");
			--n;
		}
	}
	return i.inNumber && ui(i, !1), i.inSegment && ci(i) && di(i), i.segments;
}
function gi(e) {
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) t += e[n][0], e[n][1] != null && (t += e[n][1], e[n][2] != null && (t += " ", t += e[n][2], e[n][3] != null && (t += " ", t += e[n][3], t += " ", t += e[n][4], e[n][5] != null && (t += " ", t += e[n][5], t += " ", t += e[n][6], e[n][7] != null && (t += " ", t += e[n][7])))));
	return t + " ";
}
var _i = class extends fr {
	bbox() {
		return In().path.setAttribute("d", this.toString()), new P(In.nodes.path.getBBox());
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n, r = this.length - 1; r >= 0; r--) n = this[r][0], n === "M" || n === "L" || n === "T" ? (this[r][1] += e, this[r][2] += t) : n === "H" ? this[r][1] += e : n === "V" ? this[r][1] += t : n === "C" || n === "S" || n === "Q" ? (this[r][1] += e, this[r][2] += t, this[r][3] += e, this[r][4] += t, n === "C" && (this[r][5] += e, this[r][6] += t)) : n === "A" && (this[r][6] += e, this[r][7] += t);
		return this;
	}
	parse(e = "M0 0") {
		return Array.isArray(e) && (e = Array.prototype.concat.apply([], e).toString()), hi(e);
	}
	size(e, t) {
		let n = this.bbox(), r, i;
		for (n.width = n.width === 0 ? 1 : n.width, n.height = n.height === 0 ? 1 : n.height, r = this.length - 1; r >= 0; r--) i = this[r][0], i === "M" || i === "L" || i === "T" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y) : i === "H" ? this[r][1] = (this[r][1] - n.x) * e / n.width + n.x : i === "V" ? this[r][1] = (this[r][1] - n.y) * t / n.height + n.y : i === "C" || i === "S" || i === "Q" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y, this[r][3] = (this[r][3] - n.x) * e / n.width + n.x, this[r][4] = (this[r][4] - n.y) * t / n.height + n.y, i === "C" && (this[r][5] = (this[r][5] - n.x) * e / n.width + n.x, this[r][6] = (this[r][6] - n.y) * t / n.height + n.y)) : i === "A" && (this[r][1] = this[r][1] * e / n.width, this[r][2] = this[r][2] * t / n.height, this[r][6] = (this[r][6] - n.x) * e / n.width + n.x, this[r][7] = (this[r][7] - n.y) * t / n.height + n.y);
		return this;
	}
	toString() {
		return gi(this);
	}
}, vi = (e) => {
	let t = typeof e;
	return t === "number" ? F : t === "string" ? jn.isColor(e) ? jn : ln.test(e) ? un.test(e) ? _i : fr : Zt.test(e) ? F : bi : wi.indexOf(e.constructor) > -1 ? e.constructor : Array.isArray(e) ? fr : t === "object" ? Ci : bi;
}, yi = class {
	constructor(e) {
		this._stepper = e || new ti("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
		this._type || this.type(vi(e));
		let t = new this._type(e);
		return this._type === jn && (t = this._to ? t[this._to[4]]() : this._from ? t[this._from[4]]() : t), this._type === Ci && (t = this._to ? t.align(this._to) : this._from ? t.align(this._from) : t), t = t.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(t.length)).map(Object).map(function(e) {
			return e.done = !0, e;
		}), t;
	}
}, bi = class {
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
}, xi = class e {
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
xi.defaults = {
	scaleX: 1,
	scaleY: 1,
	shear: 0,
	rotate: 0,
	translateX: 0,
	translateY: 0,
	originX: 0,
	originY: 0
};
var Si = (e, t) => e[0] < t[0] ? -1 : +(e[0] > t[0]), Ci = class {
	constructor(...e) {
		this.init(...e);
	}
	align(e) {
		let t = this.values;
		for (let n = 0, r = t.length; n < r; ++n) {
			if (t[n + 1] === e[n + 1]) {
				if (t[n + 1] === jn && e[n + 7] !== t[n + 7]) {
					let t = e[n + 7], r = new jn(this.values.splice(n + 3, 5))[t]().toArray();
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
			let r = vi(e[n]), i = new r(e[n]).toArray();
			t.push([
				n,
				r,
				i.length,
				...i
			]);
		}
		return t.sort(Si), this.values = t.reduce((e, t) => e.concat(t), []), this;
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
}, wi = [
	bi,
	xi,
	Ci
];
function Ti(e = []) {
	wi.push(...[].concat(e));
}
function Ei() {
	A(wi, {
		to(e) {
			return new yi().type(this.constructor).from(this.toArray()).to(e);
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
var Di = class extends L {
	constructor(e, t = e) {
		super(D("path", e), t);
	}
	array() {
		return this._array ||= new _i(this.attr("d"));
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
		return e == null ? this.array() : this.clear().attr("d", typeof e == "string" ? e : this._array = new _i(e));
	}
	size(e, t) {
		let n = bt(this, e, t);
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
Di.prototype.MorphArray = _i, y({ Container: { path: j(function(e) {
	return this.put(new Di()).plot(e || new _i());
}) } }), k(Di, "Path");
var Oi = /* @__PURE__ */ g({
	array: () => ki,
	clear: () => Ai,
	move: () => ji,
	plot: () => Mi,
	size: () => Ni
});
function ki() {
	return this._array ||= new Ur(this.attr("points"));
}
function Ai() {
	return delete this._array, this;
}
function ji(e, t) {
	return this.attr("points", this.array().move(e, t));
}
function Mi(e) {
	return e == null ? this.array() : this.clear().attr("points", typeof e == "string" ? e : this._array = new Ur(e));
}
function Ni(e, t) {
	let n = bt(this, e, t);
	return this.attr("points", this.array().size(n.width, n.height));
}
var Pi = class extends L {
	constructor(e, t = e) {
		super(D("polygon", e), t);
	}
};
y({ Container: { polygon: j(function(e) {
	return this.put(new Pi()).plot(e || new Ur());
}) } }), A(Pi, Wr), A(Pi, Oi), k(Pi, "Polygon");
var Fi = class extends L {
	constructor(e, t = e) {
		super(D("polyline", e), t);
	}
};
y({ Container: { polyline: j(function(e) {
	return this.put(new Fi()).plot(e || new Ur());
}) } }), A(Fi, Wr), A(Fi, Oi), k(Fi, "Polyline");
var Ii = class extends L {
	constructor(e, t = e) {
		super(D("rect", e), t);
	}
};
A(Ii, {
	rx: Dr,
	ry: Or
}), y({ Container: { rect: j(function(e, t) {
	return this.put(new Ii()).size(e, t);
}) } }), k(Ii, "Rect");
var Li = class {
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
}, R = {
	nextDraw: null,
	frames: new Li(),
	timeouts: new Li(),
	immediates: new Li(),
	timer: () => T.window.performance || T.window.Date,
	frame(e) {
		let t = R.frames.push({ run: e });
		return R.nextDraw === null && (R.nextDraw = T.window.requestAnimationFrame(R._draw)), t;
	},
	timeout(e, t) {
		t ||= 0;
		let n = R.timer().now() + t, r = R.timeouts.push({
			run: e,
			time: n
		});
		return R.nextDraw === null && (R.nextDraw = T.window.requestAnimationFrame(R._draw)), r;
	},
	immediate(e) {
		let t = R.immediates.push(e);
		return R.nextDraw === null && (R.nextDraw = T.window.requestAnimationFrame(R._draw)), t;
	},
	cancelFrame(e) {
		e != null && R.frames.remove(e);
	},
	clearTimeout(e) {
		e != null && R.timeouts.remove(e);
	},
	cancelImmediate(e) {
		e != null && R.immediates.remove(e);
	},
	_draw(e) {
		try {
			let t = null, n = R.timeouts.last();
			for (; (t = R.timeouts.shift()) && (e >= t.time ? t.run() : R.timeouts.push(t), t !== n););
			let r = null, i = R.frames.last();
			for (; r !== i && (r = R.frames.shift());) r.run(e);
			let a = null;
			for (; a = R.immediates.shift();) a();
		} finally {
			R.nextDraw = R.timeouts.first() || R.frames.first() || R.immediates.first() ? T.window.requestAnimationFrame(R._draw) : null;
		}
	}
}, Ri = function(e) {
	let t = e.start, n = e.runner.duration();
	return {
		start: t,
		duration: n,
		end: t + n,
		runner: e.runner
	};
}, zi = function() {
	let e = T.window;
	return (e.performance || e.Date).now();
}, Bi = class extends cr {
	constructor(e = zi) {
		super(), this._timeSource = e, this.terminate();
	}
	active() {
		return !!this._nextFrame;
	}
	finish() {
		this._finishing = !0;
		try {
			this.time(this.getEndTimeOfTimeline() + 1);
		} finally {
			this._finishing = !1;
		}
		return this.pause();
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
		if (e == null) return this._runners.map(Ri);
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
		e.unschedule(), e.timeline(this), e._retired = !1;
		let a = e.persist(), o = {
			persist: a === null ? this._persist : a,
			start: r + t,
			runner: e
		};
		return this._lastRunnerId = e.id, e._runnerInfo = o, this._runners.push(o), this._runners.sort((e, t) => e.start - t.start), this._runnerIds = this._runners.map((e) => e.runner.id), this.updateTime()._continue(), this;
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
		return t < 0 || (this._runners.splice(t, 1), this._runnerIds.splice(t, 1), e.timeline(null), e._runnerInfo = null, e._retired = !0), this;
	}
	updateTime() {
		return this.active() || (this._lastSourceTime = this._timeSource()), this;
	}
	_continue(e = !1) {
		return R.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : (this._paused || (this._nextFrame = R.frame(this._step)), this);
	}
	_stepFn(e = !1) {
		let t = this._generation, n = this._timeSource(), r = n - this._lastSourceTime;
		e && (r = 0);
		let i = this._speed * r + (this._time - this._lastStepTime);
		this._lastSourceTime = n, e || (this._time += i, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
		let a = this._runners.slice();
		for (let e = a.length; e--;) {
			let t = a[e];
			if (t.runner._runnerInfo !== t) continue;
			let n = t.runner;
			this._time - t.start < 0 && n.reset(!0);
		}
		let o = !1;
		for (let e of this._runners.slice()) {
			if (e.runner._runnerInfo !== e) continue;
			let t = e.runner, n = i, r = this._time - e.start;
			if (r < 0) {
				o = !0;
				continue;
			}
			if (r === 0) {
				t.reset(), o = !0;
				continue;
			}
			if (r < n && (n = r), !t.active()) continue;
			let a = (this._finishing && t._isDeclarative ? t.finish() : t.step(n)).done;
			t._runnerInfo === e && (a ? e.persist !== !0 && t.duration() - t.time() + this._time + e.persist <= this._time && t.unschedule() : o = !0);
		}
		return t === this._generation && (o ||= this._runners.some(({ start: e, runner: t }) => e >= this._time || t.active() && !t.done), o && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished"))), this;
	}
	terminate() {
		R.cancelFrame(this._nextFrame), this._generation = (this._generation || 0) + 1, this._startTime = 0, this._speed = 1, this._persist = 0;
		for (let { runner: e } of this._runners || []) e._retired = !0, e._runnerInfo = null;
		this._nextFrame = null, this._paused = !0, this._finishing = !1, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
	}
};
y({ Element: { timeline: function(e) {
	return e == null ? (this._timeline = this._timeline || new Bi(), this._timeline) : (this._timeline = e, this);
} } });
var Vi = class e extends cr {
	constructor(t) {
		super(), this.id = e.id++, t ??= ur.duration, t = typeof t == "function" ? new ni(t) : t, this._element = null, this._timeline = null, this._runnerInfo = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof ni, this._stepper = this._isDeclarative ? t : new ti(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new N(), this._isAbsoluteTransform = !1, this._hasTransform = !1, this._transformInitialised = !1, this._transformActive = !1, this._retired = !1, this._reverse = !1, this._swing = !1, this._wait = 0, this._times = 1, this._persist = this._isDeclarative ? !0 : null;
	}
	static sanitise(e, t, n) {
		let r = 1, i = !1, a = 0;
		return e ??= ur.duration, t ??= ur.delay, n ||= "last", typeof e == "object" && !(e instanceof ei) && (t = e.delay ?? t, n = e.when ?? n, i = e.swing || i, r = e.times ?? r, a = e.wait ?? a, e = e.duration ?? ur.duration), {
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
		return this.transforms.lmultiplyO(e), this._transformInitialised = !0, this._transformActive = !0, this;
	}
	after(e) {
		return this.on("finished", e);
	}
	animate(t, n, r) {
		let i = e.sanitise(t, n, r), a = new e(i.duration);
		return this._timeline && a.timeline(this._timeline), this._element && a.element(this._element), a.loop(i).schedule(i.delay, i.when);
	}
	clearTransform() {
		return this.transforms = new N(), this;
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
		return this._stepper = new ti(e), this;
	}
	element(e) {
		return e == null ? this._element : (this._element = e, e._prepareRunner(), this);
	}
	finish() {
		if (!this._isDeclarative) return this.time(this.duration());
		let e = this._time;
		return this.step(Infinity), this._time = e, this;
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
		return this._isDeclarative && (this.done = !1), this._queue.push({
			initialiser: e || lr,
			runner: t || lr,
			retarget: n,
			isTransform: r,
			initialised: !1,
			finished: !1
		}), this.timeline() && this.timeline()._continue(), this;
	}
	reset(e = !1) {
		if (this._reseted) {
			let t = !e && this._hasTransform && this.position() !== 0;
			return t && !this._transformInitialised ? (this.step(0), this._reseted = !0, this) : (t !== this._transformActive && (this._transformActive = t, this._element && this._element._addRunner(this)), this);
		}
		return this._reseted ||= (this.time(0), !0), e && this._transformActive && (this._transformActive = !1, this._element && this._element._addRunner(this)), this;
	}
	reverse(e) {
		return this._reverse = e ?? !this._reverse, this;
	}
	schedule(e, t, n) {
		if (e instanceof Bi || (n = t, t = e, e = this.timeline()), !e) throw Error("Runner cannot be scheduled without timeline");
		return e.schedule(this, t, n), this;
	}
	step(e) {
		if (!this.enabled) return this;
		let t = this.done;
		e ??= 16, this._time += e;
		let n = this.position(), r = this._lastPosition !== n && this._time >= 0;
		this._lastPosition = n;
		let i = this.duration(), a = this._lastTime <= 0 && this._time > 0;
		this._lastTime = this._time, a && this.fire("start", this);
		let o = this._isDeclarative;
		this.done = !o && this._time >= i, this._reseted = !1;
		let s = this._hasTransform && (this._time > 0 || n !== 0);
		this._transformActive = s;
		let c = !1;
		return (r || o) && (this._initialise(r), this.transforms = new N(), c = this._run(o ? e : n), this._transformActive = s, this.fire("step", this)), this.done = this.done || c && o, this.done && !t && this.fire("finished", this), this;
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
		if (e || this._isDeclarative) for (let t = 0, n = this._queue.length; t < n; ++t) {
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
			let r = this._queue[n];
			if (this._isDeclarative && r.finished && !r.isTransform) continue;
			let i = r.runner.call(this, e);
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
			this._history[e].caller.retarget ? this._history[e].caller.retarget.call(this, t, n) : this._history[e].morpher.to(t), this._history[e].caller.finished = !1, this._isDeclarative && (this.done = !1);
			let r = this.timeline();
			return r && r.play(), !0;
		}
		return !1;
	}
};
Vi.id = 0;
var Hi = class {
	constructor(e = new N(), t = -1, n = !0, r = !1) {
		this.transforms = e, this.id = t, this.done = n, this._isAbsoluteTransform = r, this._transformActive = !0, this._retired = !0;
	}
};
A([Vi, Hi], { mergeWith(e) {
	return new Hi(this._isAbsoluteTransform ? this.transforms : e.transforms.lmultiply(this.transforms), e.id, !0, e._isAbsoluteTransform || this._isAbsoluteTransform);
} });
var Ui = (e, t) => e.lmultiplyO(t), Wi = (e) => e.transforms, Gi = (e) => e._transformActive;
function Ki(e) {
	let t = e.filter(Gi), n = 0;
	for (let e = 0; e < t.length; ++e) t[e]._isAbsoluteTransform && (n = e);
	return t.slice(n);
}
function qi() {
	let e = Ki(this._transformationRunners.runners).map(Wi).reduce(Ui, new N());
	this.transform(e), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
var Ji = class {
	constructor() {
		this.runners = [];
	}
	add(e) {
		var t;
		if (!(0, mt.default)(t = this.runners).call(t, e)) return this.runners.push(e), this;
	}
	edit(e, t) {
		let n = this.runners.findIndex((t) => t.id === e);
		return n >= 0 && this.runners.splice(n, 1, t), this;
	}
	getByID(e) {
		return this.runners.find((t) => t.id === e);
	}
	length() {
		return this.runners.length;
	}
	merge() {
		let e = null;
		for (let t = 0; t < this.runners.length; ++t) {
			let n = this.runners[t];
			if (e && n.done && e.done && n._retired && e._retired) {
				this.remove(n.id);
				let r = n.mergeWith(e);
				this.edit(e.id, r), e = r, --t;
			} else e = n;
		}
		return this;
	}
	remove(e) {
		let t = this.runners.findIndex((t) => t.id === e);
		return t >= 0 && this.runners.splice(t, 1), this;
	}
};
y({ Element: {
	animate(e, t, n) {
		let r = Vi.sanitise(e, t, n), i = this.timeline();
		return new Vi(r.duration).loop(r).element(this).timeline(i.play()).schedule(r.delay, r.when);
	},
	delay(e, t) {
		return this.animate(0, e, t);
	},
	_currentTransform(e) {
		let t = this._transformationRunners.runners, n = t.indexOf(e);
		return Ki(t.slice(0, n + 1)).map(Wi).reduce(Ui, new N());
	},
	_addRunner(e) {
		this._transformationRunners.length() === 1 && this._transformationRunners.runners[0].id === -1 && (this._transformationRunners.runners[0].transforms = new N(this)), this._transformationRunners.add(e), R.cancelImmediate(this._frameId), this._frameId = R.immediate(qi.bind(this));
	},
	_prepareRunner() {
		this._frameId ?? (this._transformationRunners = new Ji().add(new Hi(new N(this))));
	}
} });
var Yi = (e, t) => e.filter((e) => !(0, mt.default)(t).call(t, e));
A(Vi, {
	attr(e, t) {
		return this.styleAttr("attr", e, t);
	},
	css(e, t) {
		return this.styleAttr("css", e, t);
	},
	styleAttr(e, t, n) {
		if (typeof t == "string") return this.styleAttr(e, { [t]: n });
		let r = t, i = this._history[e];
		if (i && !i.caller.initialised && i.caller.retarget) return i.caller.retarget.call(this, r), this;
		if (this._tryRetarget(e, r)) return this;
		let a = new yi(this._stepper).to(r), o = Object.keys(r);
		return this.queue(function() {
			a = a.from(this.element()[e](o));
		}, function(t) {
			return this.element()[e](a.at(t).valueOf()), a.done();
		}, function(t) {
			let n = Yi(Object.keys(t), o);
			if (n.length && a.from() != null) {
				let t = this.element()[e](n), r = new Ci(a.from()).valueOf();
				Object.assign(r, t), a.from(r);
			}
			let r = new Ci(a.to()).valueOf();
			Object.assign(r, t), a.to(r), o = Object.keys(r);
		}), this._rememberMorpher(e, a), this;
	},
	zoom(e, t) {
		if (this._tryRetarget("zoom", e, t)) return this;
		let n = new yi(this._stepper).to(new F(e));
		return this.queue(function() {
			n = n.from(this.element().zoom());
		}, function(e) {
			return this.element().zoom(n.at(e), t), n.done();
		}, function(e, r) {
			t = r, n.to(e);
		}), this._rememberMorpher("zoom", n), this;
	},
	transform(e, t, n) {
		if (t = e.relative || t, this._hasTransform = !0, this._isAbsoluteTransform = this._isAbsoluteTransform || !t, this._isDeclarative && !t && this._tryRetarget("transform", e)) return this;
		let r = N.isMatrixLike(e);
		n = e.affine == null ? n ?? !r : e.affine;
		let i = new yi(this._stepper).type(n ? xi : N), a = n ? new yi(this._stepper).type(N) : i, o, s, c, l, u;
		function d() {
			s ||= this.element(), o ||= xt(e, s), u = new N(t ? void 0 : s), s._addRunner(this);
		}
		function f(d) {
			t || this.clearTransform();
			let { x: f, y: p } = new M(o).transform(s._currentTransform(this)), m = {
				...e,
				origin: [f, p]
			};
			m.relative === !0 && delete m.relative;
			let h = new N(m), g = this._isDeclarative && c ? c : u, _ = i;
			if (n) {
				let e = h.decompose(f, p), t = g.decompose(f, p);
				if (!new xi(e).toArray().concat(new xi(t).toArray()).every(Number.isFinite)) _ = a;
				else {
					h = e, g = t;
					let n = h.rotate, r = g.rotate, i = [
						n - 360,
						n,
						n + 360
					], a = i.map((e) => Math.abs(e - r)), o = Math.min(...a), s = a.indexOf(o);
					h.rotate = i[s];
				}
			}
			t && _ === i && (r || (h.rotate = e.rotate || 0), this._isDeclarative && l && (g.rotate = l)), _.from(g), _.to(h);
			let ee = _.at(d);
			return l = ee.rotate, c = new N(ee), this.addTransform(c), s._addRunner(this), _.done();
		}
		function p(t) {
			o = xt(t, s), e = { ...t };
		}
		return this.queue(d, f, p, !0), this._isDeclarative && this._rememberMorpher("transform", i), this;
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
		if (t = new F(t), this._tryRetarget(e, t)) return this;
		let n = new yi(this._stepper).to(t), r = null;
		return this.queue(function() {
			r = this.element()[e](), n.from(r), n.to(r + t);
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}, function(e) {
			n.to(r + new F(e));
		}), this._rememberMorpher(e, n), this;
	},
	_queueObject(e, t) {
		if (this._tryRetarget(e, t)) return this;
		let n = new yi(this._stepper).to(t);
		return this.queue(function() {
			n.from(this.element()[e]());
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}), this._rememberMorpher(e, n), this;
	},
	_queueNumber(e, t) {
		return this._queueObject(e, new F(t));
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
		let n = bt(this._element, e, t);
		return this.width(n.width).height(n.height);
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
		let i = new yi(this._stepper).type(this._element.MorphArray).to(e);
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
		return this._queueObject("viewbox", new P(e, t, n, r));
	},
	update(e) {
		return typeof e == "object" ? (e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", e.offset), this) : this.update({
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		});
	}
}), A(Vi, {
	rx: Dr,
	ry: Or,
	from: Rr,
	to: zr
}), k(Vi, "Runner");
var Xi = class extends I {
	constructor(e, t = e) {
		super(D("svg", e), t), this.namespace();
	}
	defs() {
		return this.isRoot() ? O(this.node.querySelector("defs")) || this.put(new Tr()) : this.root().defs();
	}
	isRoot() {
		return !this.node.parentNode || !(this.node.parentNode instanceof T.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
	}
	namespace() {
		return this.isRoot() ? this.attr({
			xmlns: Tt,
			version: "1.1"
		}).attr("xmlns:xlink", Ot, Dt) : this.root().namespace();
	}
	removeNamespace() {
		return this.attr({
			xmlns: null,
			version: null
		}).attr("xmlns:xlink", null, Dt).attr("xmlns:svgjs", null, Dt);
	}
	root() {
		return this.isRoot() ? this : super.root();
	}
};
y({ Container: { nested: j(function() {
	return this.put(new Xi());
}) } }), k(Xi, "Svg", !0);
var Zi = class extends I {
	constructor(e, t = e) {
		super(D("symbol", e), t);
	}
};
y({ Container: { symbol: j(function() {
	return this.put(new Zi());
}) } }), k(Zi, "Symbol");
var Qi = /* @__PURE__ */ g({
	amove: () => la,
	ax: () => sa,
	ay: () => ca,
	build: () => ua,
	center: () => oa,
	cx: () => ia,
	cy: () => aa,
	length: () => ea,
	move: () => ra,
	plain: () => $i,
	x: () => ta,
	y: () => na
});
function $i(e) {
	return this._build === !1 && this.clear(), this.node.appendChild(T.document.createTextNode(e)), this;
}
function ea() {
	return this.node.getComputedTextLength();
}
function ta(e, t = this.bbox()) {
	return e == null ? t.x : this.attr("x", this.attr("x") + e - t.x);
}
function na(e, t = this.bbox()) {
	return e == null ? t.y : this.attr("y", this.attr("y") + e - t.y);
}
function ra(e, t, n = this.bbox()) {
	return this.x(e, n).y(t, n);
}
function ia(e, t = this.bbox()) {
	return e == null ? t.cx : this.attr("x", this.attr("x") + e - t.cx);
}
function aa(e, t = this.bbox()) {
	return e == null ? t.cy : this.attr("y", this.attr("y") + e - t.cy);
}
function oa(e, t, n = this.bbox()) {
	return this.cx(e, n).cy(t, n);
}
function sa(e) {
	return this.attr("x", e);
}
function ca(e) {
	return this.attr("y", e);
}
function la(e, t) {
	return this.ax(e).ay(t);
}
function ua(e) {
	return this._build = !!e, this;
}
var da = class extends L {
	constructor(e, t = e) {
		super(D("text", e), t), this.dom.leading = this.dom.leading ?? new F(1.3), this._rebuild = !0, this._build = !1;
	}
	leading(e) {
		return e == null ? this.dom.leading : (this.dom.leading = new F(e), this.rebuild());
	}
	rebuild(e) {
		if (typeof e == "boolean" && (this._rebuild = e), this._rebuild) {
			let e = this, t = 0, n = this.dom.leading;
			this.each(function(r) {
				if (Ct(this.node)) return;
				let i = T.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new F(i);
				this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === "\n" ? t += a : (this.attr("dy", r ? a + t : 0), t = 0));
			}), this.fire("rebuild");
		}
		return this;
	}
	setData(e) {
		return this.dom = e, this.dom.leading = new F(e.leading || 1.3), this;
	}
	writeDataToDom() {
		return super.writeDataToDom({ leading: 1.3 });
	}
	text(e) {
		if (e === void 0) {
			let t = this.node.childNodes, n = 0;
			e = "";
			for (let r = 0, i = t.length; r < i; ++r) t[r].nodeName === "textPath" || Ct(t[r]) ? r === 0 && (n = r + 1) : (r !== n && t[r].nodeType !== 3 && O(t[r]).dom.newLined === !0 && (e += "\n"), e += t[r].textContent);
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
A(da, Qi), y({ Container: {
	text: j(function(e = "") {
		return this.put(new da()).text(e);
	}),
	plain: j(function(e = "") {
		return this.put(new da()).plain(e);
	})
} }), k(da, "Text");
var fa = class extends L {
	constructor(e, t = e) {
		super(D("tspan", e), t), this._build = !1;
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
		if (!(e instanceof da)) return this;
		let t = e.index(this), n = T.window.getComputedStyle(this.node).getPropertyValue("font-size"), r = e.dom.leading * new F(n);
		return this.dy(t ? r : 0).attr("x", e.x());
	}
	text(e) {
		return e == null ? this.node.textContent + (this.dom.newLined ? "\n" : "") : (typeof e == "function" ? (this.clear().build(!0), e.call(this, this), this.build(!1)) : this.plain(e), this);
	}
};
A(fa, Qi), y({
	Tspan: { tspan: j(function(e = "") {
		let t = new fa();
		return this._build || this.clear(), this.put(t).text(e);
	}) },
	Text: { newLine: function(e = "") {
		return this.tspan(e).newLine();
	} }
}), k(fa, "Tspan");
var pa = class extends L {
	constructor(e, t = e) {
		super(D("circle", e), t);
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
		return this.radius(new F(e).divide(2));
	}
};
A(pa, {
	x: kr,
	y: Ar,
	cx: jr,
	cy: Mr,
	width: Nr,
	height: Pr
}), y({ Container: { circle: j(function(e = 0) {
	return this.put(new pa()).size(e).move(0, 0);
}) } }), k(pa, "Circle");
var ma = class extends I {
	constructor(e, t = e) {
		super(D("clipPath", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unclip();
		}), super.remove();
	}
	targets() {
		return Jn(this.node, "clip-path");
	}
};
y({
	Container: { clip: j(function() {
		return this.defs().put(new ma());
	}) },
	Element: {
		clipper() {
			return this.reference("clip-path");
		},
		clipWith(e) {
			let t = e instanceof ma ? e : this.parent().clip().add(e);
			return this.attr("clip-path", "url(#" + t.id() + ")");
		},
		unclip() {
			return this.attr("clip-path", null);
		}
	}
}), k(ma, "ClipPath");
var ha = class extends vr {
	constructor(e, t = e) {
		super(D("foreignObject", e), t);
	}
};
y({ Container: { foreignObject: j(function(e, t) {
	return this.put(new ha()).size(e, t);
}) } }), k(ha, "ForeignObject");
var ga = /* @__PURE__ */ g({
	dmove: () => _a,
	dx: () => va,
	dy: () => ya,
	height: () => ba,
	move: () => xa,
	size: () => Sa,
	width: () => Ca,
	x: () => wa,
	y: () => Ta
});
function _a(e, t) {
	return this.children().forEach((n) => {
		let r;
		try {
			r = n.node instanceof kt().SVGSVGElement ? new P(n.attr([
				"x",
				"y",
				"width",
				"height"
			])) : n.bbox();
		} catch {
			return;
		}
		let i = new N(n), a = i.translate(e, t).transform(i.inverse()), o = new M(r.x, r.y).transform(a);
		n.dmove(o.x - r.x, o.y - r.y);
	}), this;
}
function va(e) {
	return this.dmove(e, 0);
}
function ya(e) {
	return this.dmove(0, e);
}
function ba(e, t = this.bbox()) {
	return e == null ? t.height : this.size(t.width, e, t);
}
function xa(e = 0, t = 0, n = this.bbox()) {
	let r = e - n.x, i = t - n.y;
	return this.dmove(r, i);
}
function Sa(e, t, n = this.bbox()) {
	let r = bt(this, e, t, n), i = r.width / n.width, a = r.height / n.height;
	return this.children().forEach((e) => {
		let t = new M(n).transform(new N(e).inverse());
		e.scale(i, a, t.x, t.y);
	}), this;
}
function Ca(e, t = this.bbox()) {
	return e == null ? t.width : this.size(e, t.height, t);
}
function wa(e, t = this.bbox()) {
	return e == null ? t.x : this.move(e, t.y, t);
}
function Ta(e, t = this.bbox()) {
	return e == null ? t.y : this.move(t.x, e, t);
}
var Ea = class extends I {
	constructor(e, t = e) {
		super(D("g", e), t);
	}
};
A(Ea, ga), y({ Container: { group: j(function() {
	return this.put(new Ea());
}) } }), k(Ea, "G");
var Da = class extends I {
	constructor(e, t = e) {
		super(D("a", e), t);
	}
	target(e) {
		return this.attr("target", e);
	}
	to(e) {
		return this.attr("href", e, Ot);
	}
};
A(Da, ga), y({
	Container: { link: j(function(e) {
		return this.put(new Da()).to(e);
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
			return t || (t = new Da(), this.wrap(t)), typeof e == "function" ? e.call(t, t) : t.to(e), this;
		},
		linker() {
			let e = this.parent();
			return e && e.node.nodeName.toLowerCase() === "a" ? e : null;
		}
	}
}), k(Da, "A");
var Oa = class extends I {
	constructor(e, t = e) {
		super(D("mask", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unmask();
		}), super.remove();
	}
	targets() {
		return Jn(this.node, "mask");
	}
};
y({
	Container: { mask: j(function() {
		return this.defs().put(new Oa());
	}) },
	Element: {
		masker() {
			return this.reference("mask");
		},
		maskWith(e) {
			let t = e instanceof Oa ? e : this.parent().mask().add(e);
			return this.attr("mask", "url(#" + t.id() + ")");
		},
		unmask() {
			return this.attr("mask", null);
		}
	}
}), k(Oa, "Mask");
var ka = class extends vr {
	constructor(e, t = e) {
		super(D("stop", e), t);
	}
	update(e) {
		return (typeof e == "number" || e instanceof F) && (e = {
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		}), e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", new F(e.offset)), this;
	}
};
y({ Gradient: { stop: function(e, t, n) {
	return this.put(new ka()).update(e, t, n);
} } }), k(ka, "Stop");
function Aa(e, t) {
	if (!e) return "";
	if (!t) return e;
	let n = e + "{";
	for (let e in t) n += vt(e) + ":" + t[e] + ";";
	return n += "}", n;
}
var ja = class extends vr {
	constructor(e, t = e) {
		super(D("style", e), t);
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
		return this.addText(Aa(e, t));
	}
};
y("Dom", {
	style(e, t) {
		return this.put(new ja()).rule(e, t);
	},
	fontface(e, t, n) {
		return this.put(new ja()).font(e, t, n);
	}
}), k(ja, "Style");
var Ma = class extends da {
	constructor(e, t = e) {
		super(D("textPath", e), t);
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
y({
	Container: { textPath: j(function(e, t) {
		return e instanceof da || (e = this.text(e)), e.path(t);
	}) },
	Text: {
		path: j(function(e, t = !0) {
			let n = new Ma();
			e instanceof Di || (e = this.defs().path(e)), n.attr("href", "#" + e, Ot);
			let r;
			if (t) for (; r = this.node.firstChild;) n.node.appendChild(r);
			return this.put(n);
		}),
		textPath() {
			return this.findOne("textPath");
		}
	},
	Path: {
		text: j(function(e) {
			return e instanceof da || (e = new da().addTo(this.parent()).text(e)), e.path(this);
		}),
		targets() {
			return Jn(this.node, "href", "textPath");
		}
	}
}), Ma.prototype.MorphArray = _i, k(Ma, "TextPath");
var Na = class extends L {
	constructor(e, t = e) {
		super(D("use", e), t);
	}
	use(e, t) {
		return this.attr("href", (t || "") + "#" + e, Ot);
	}
};
y({ Container: { use: j(function(e, t) {
	return this.put(new Na()).use(e, t);
}) } }), k(Na, "Use");
var Pa = E;
A([
	Xi,
	Zi,
	Hr,
	Vr,
	Zr
], b("viewbox")), A([
	Xr,
	Fi,
	Pi,
	Di
], b("marker")), A(da, b("Text")), A(Di, b("Path")), A(Tr, b("Defs")), A([da, fa], b("Tspan")), A([
	Ii,
	Fr,
	Br,
	Vi
], b("radius")), A(cr, b("EventTarget")), A(_r, b("Dom")), A(vr, b("Element")), A(L, b("Shape")), A([I, Ir], b("Container")), A(Br, b("Gradient")), A(Vi, b("Runner")), Un.extend(x()), Ti([
	F,
	jn,
	P,
	N,
	fr,
	Ur,
	_i,
	M
]), Ei();
// src/figures/Label/Label.constraints.ts
var Fa = .38;
function Ia(e, t) {
	let n = Math.hypot(e, t);
	return n === 0 ? "tc" : `${t / n > Fa ? "b" : t / n < -.38 ? "t" : "m"}${e / n > Fa ? "r" : e / n < -.38 ? "l" : "c"}`;
}
function La(e, t, n) {
	let r = Math.hypot(t.x, t.y), i = r === 0 ? {
		x: 0,
		y: -1
	} : {
		x: t.y / r,
		y: -t.x / r
	};
	return {
		point: {
			x: e.x + i.x * n,
			y: e.y + i.y * n
		},
		alignement: Ia(i.x, i.y)
	};
}
function Ra(e, t, n) {
	if (typeof e == "string") return;
	let r = Object.keys(t);
	for (let t of e) if (typeof t != "string") {
		if (!r.includes(t.field)) throw new a(`The figure "${n}" cannot show the field "${t.field}" in its label: ${r.length === 0 ? "it has none" : `expected ${r.join(", ")}`}`);
		if (!Number.isInteger(t.digits) || t.digits < 0) throw new a(`Invalid number of digits ${t.digits} for the field "${t.field}" of the label of "${n}": expected an integer of 0 or more`);
	}
}
function za(e, t) {
	return typeof e == "string" ? e : e.map((e) => {
		if (typeof e == "string") return e;
		let n = t[e.field];
		if (n === void 0) throw new a(`The label cannot show the field "${e.field}"`);
		return n(e.digits);
	}).join("");
}
var Ba = [
	"tl",
	"tc",
	"tr",
	"ml",
	"mc",
	"mr",
	"bl",
	"bc",
	"br"
], Va = 10;
function Ha(e, t, n, r) {
	let [i, a] = e, o = i === "m" ? Va : 0;
	return {
		x: a === "l" ? t.x - n / 2 - o : a === "r" ? t.x + n / 2 + o : t.x,
		y: i === "t" ? t.y - r / 2 : i === "b" ? t.y + r / 2 : t.y
	};
}
// src/figures/Label/Label.ts
function Ua(e) {
	return e.replace(/[&<>"']/g, (e) => `&#${e.charCodeAt(0)};`);
}
var Wa = class {
	_element;
	_name;
	constructor(e, t, n = {}) {
		this._element = e, this._name = t, this._config = {
			asHtml: n.asHtml ?? !1,
			alignement: n.alignement ?? "br",
			offset: n.offset ?? {
				x: 0,
				y: 0
			},
			rotate: n.rotate ?? 0,
			size: n.size ?? "inherit",
			...n.texConverter === void 0 ? {} : { texConverter: n.texConverter }
		}, this._displayName = n.text ?? t, this._x = 0, this._y = 0, this._shape = this._makeLabel();
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
		return this._config.asHtml && this._config.texConverter ? this._config.texConverter(this._displayName) : this._displayName;
	}
	_x;
	get x() {
		return this._x;
	}
	_y;
	get y() {
		return this._y;
	}
	autoRotate = !1;
	get asHtml() {
		return this._config.asHtml;
	}
	get alignement() {
		return this._config.alignement;
	}
	get visible() {
		return this._shape.css("display") !== "none";
	}
	hide() {
		return this._shape.hide(), this;
	}
	show() {
		return this._shape.show(), this;
	}
	setLabel(e) {
		return e === void 0 || e === this._displayName || (this._displayName = e, this._write(), this._applied = null), this;
	}
	move(e, t) {
		return this._x = e, this._y = t, this._applied !== this._state() && this._draw(), this;
	}
	rotate(e) {
		return e === 0 ? this._shape.attr("transform", null) : this._shape.transform({
			rotate: e,
			origin: {
				x: this._x,
				y: this._y
			}
		}), this;
	}
	get alignementGiven() {
		return this._alignementGiven;
	}
	_alignementGiven = !1;
	_applied = null;
	_state() {
		let { alignement: e, offset: t, rotate: n, size: r } = this._config;
		return JSON.stringify([
			this._x,
			this._y,
			e,
			t.x,
			t.y,
			n,
			r,
			this._displayName
		]);
	}
	position(e, t, n) {
		e !== void 0 && (this._alignementGiven = !0);
		let r = t ?? this._config.offset;
		return this._config.alignement = e ?? this._config.alignement, this._config.offset = {
			x: Number.isNaN(r.x) ? 0 : r.x,
			y: Number.isNaN(r.y) ? 0 : r.y
		}, this._config.rotate = n ?? this._config.rotate, this._draw(), this;
	}
	_size() {
		if (this._shape instanceof ha) {
			let e = this._shape.node.firstElementChild, t = e?.clientWidth ?? 0, n = e?.clientHeight ?? 0;
			return this._shape.width(t), this._shape.height(n), {
				width: t,
				height: n
			};
		}
		return {
			width: this._shape.length(),
			height: this._shape.bbox().h
		};
	}
	_draw() {
		let { alignement: e, offset: t, rotate: n } = this._config, { width: r, height: i } = this._size(), a = Ha(e, {
			x: this._x,
			y: this._y
		}, r, i);
		this._shape.center(a.x + t.x, a.y - t.y), this.rotate(n), this._applied = this._state();
	}
	_html() {
		return this._config.texConverter ? this.displayName : Ua(this._displayName);
	}
	_style() {
		return `display: block; position: fixed; white-space:nowrap; font-size: ${this._config.size}`;
	}
	_write() {
		this._shape instanceof ha ? (this._shape.clear(), this._shape.add(Pa(`<div style="${this._style()}">${this._html()}</div>`, !0))) : this._shape.text(this._displayName);
	}
	_makeLabel() {
		let e = this._config.asHtml ? this._element.foreignObject(1, 1).attr("style", "overflow:visible") : this._element.text(this._displayName).css("font-size", this._config.size);
		return e.attr("id", `${this._name}-label`), this._shape = e, e instanceof ha && this._write(), e;
	}
}, Ga = [
	"->",
	"x",
	"|"
];
function Ka(e, t, n) {
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
function qa(e, t, n, r = "->") {
	let i = (e) => e.replace(/[^\w-]/g, "_"), a = (t) => e.defs().findOne(`#${t}`);
	if (r === "x") {
		let r = i(`marker-x-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M0,0 L${n},${n} M${n},0 L0,${n}`).stroke({
				color: "black",
				width: 1
			});
		}).attr(Ka(r, n));
	}
	if (r === "|") {
		let r = i(`marker-bar-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M${n / 2},${n} L${n / 2},0`).stroke({
				color: "black",
				width: 1
			});
		}).attr(Ka(r, n));
	}
	let o = i(`marker-${t}-${n}`);
	return a(o) ?? e.marker(n * 1.2, n * 1.2, (e) => {
		e.path(`M1,0 L1,${n}, L${n * 1.2},${n / 2} L1,0z`).stroke({
			color: "black",
			width: 1
		});
	}).attr(Ka(o, n, {
		refX: n,
		refY: n / 2
	}));
}
// src/pidraw.common.ts
function Ja(e) {
	return Xa(e, ["x", "y"]);
}
function Ya(e) {
	return Xa(e, ["min", "max"]);
}
function Xa(e, t) {
	if (typeof e != "object" || !e) return !1;
	let n = e;
	return t.every((e) => n[e] !== void 0);
}
var Za = /* @__PURE__ */ function(e) {
	return e.BACKGROUND = "background", e.GRIDS = "grids", e.AXIS = "axis", e.MAIN = "main", e.PLOTS_BACKGROUND = "plots_BG", e.PLOTS = "plots", e.PLOTS_FOREGROUND = "plots_FG", e.FOREGROUND = "foreground", e.POINTS = "points", e.INTERACTIVE = "interactive", e;
}({}), Qa = /* @__PURE__ */ function(e) {
	return e.X = "Ox", e.Y = "Oy", e;
}({}), $a = /* @__PURE__ */ function(e) {
	return e.CARTESIAN_2D = "cartesian_2d", e.POLAR = "polar", e;
}({});
// src/figures/AbstractFigure/AbstractFigure.constraints.ts
function eo(e, t) {
	if (!Ja(e) || !Number.isFinite(e.x) || !Number.isFinite(e.y)) throw new a(`${t} expects a finite number or a {x, y} of finite numbers, got ${JSON.stringify(e)}`);
	return e;
}
// src/calculus/numbers.ts
function z(e, t = 10) {
	let n = 10 ** t, r = e * n;
	return !Number.isFinite(r) || Math.abs(r) >= 2 ** 53 - 1 ? e : Math.round(r) / n + 0;
}
function to(e) {
	if (typeof e == "number") return e;
	let t = e.split("/"), n = t.map((e) => e.trim() === "" ? NaN : +e);
	if (t.length > 2 || n.some(isNaN)) throw new r(`Cannot parse "${e}" as a number or a fraction`);
	return t.length === 2 ? n[0] / n[1] : n[0];
}
// src/calculus/geometry.ts
function B() {
	return {
		x: NaN,
		y: NaN
	};
}
function V(e) {
	return Number.isFinite(e.x) && Number.isFinite(e.y);
}
function H(e, t) {
	return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
var no = class e {
	x;
	y;
	constructor(e, t) {
		if (Ja(e) && Ja(t)) this.x = t.x - e.x, this.y = t.y - e.y;
		else if (Ja(e) && t === void 0) this.x = e.x, this.y = e.y;
		else if (typeof e == "number" && typeof t == "number") this.x = e, this.y = t;
		else throw new a(`Cannot build a vector from ${JSON.stringify(e)} and ${JSON.stringify(t)}`);
	}
	get norm() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	get normal() {
		return new e(this.y, -this.x);
	}
	get unit() {
		let t = this.norm;
		return new e(this.x / t, this.y / t);
	}
	static scalarProduct(e, t) {
		return e.x * t.x + e.y * t.y;
	}
	projection(t) {
		let n = e.scalarProduct(this, t) / (t.x * t.x + t.y * t.y);
		return new e(t.x * n, t.y * n);
	}
	rotate(e) {
		let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t), i = this.x, a = this.y;
		return this.x = n * i - r * a, this.y = r * i + n * a, this;
	}
	add(t) {
		return new e(this.x + t.x, this.y + t.y);
	}
	setLength(e) {
		let t = e / this.norm;
		return this.x *= t, this.y *= t, this;
	}
}, ro = class {
	A;
	director;
	constructor(e, t) {
		this.A = e, this.director = t instanceof no ? t : new no(e, t);
	}
	intersection(e) {
		let t = this.director, n = e.director, r = t.x * n.y - t.y * n.x;
		if (Math.abs(r) <= 1e-12 * t.norm * n.norm) return null;
		let i = ((e.A.x - this.A.x) * n.y - (e.A.y - this.A.y) * n.x) / r;
		return {
			x: this.A.x + i * t.x,
			y: this.A.y + i * t.y
		};
	}
	projection(e) {
		let t = this.director, n = new no(this.A, e), r = no.scalarProduct(t, n) / no.scalarProduct(t, t);
		return {
			x: this.A.x + t.x * r,
			y: this.A.y + t.y * r
		};
	}
};
function io(e, t, n, r) {
	let i = -r * Math.PI / 180;
	return {
		x: e + n * Math.cos(i),
		y: t + n * Math.sin(i)
	};
}
function ao(e, t) {
	let n = Math.atan2(-(t.y - e.y), t.x - e.x) * 180 / Math.PI;
	return (n < 0 ? n + 360 : n) + 0;
}
// src/calculus/coordinates.ts
function oo(e, t, n) {
	if (typeof e == "number") return e * (n === "y" ? t.axis.y.y : t.axis.x.x);
	if (Ya(e)) {
		let r = n === "y" ? t.origin.y : t.origin.x, i = n === "y" ? t.axis.y.y : t.axis.x.x, a = r + e.min * i, o = r + e.max * i;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (Ja(e)) return {
		x: t.origin.x + e.x * t.axis.x.x + e.y * t.axis.y.x,
		y: t.origin.y + e.x * t.axis.x.y + e.y * t.axis.y.y
	};
	throw new a(`Cannot convert ${JSON.stringify(e)} to pixels`);
}
function U(e, t, n) {
	if (typeof e == "number") return e / (n === "y" ? t.axis.y.y : t.axis.x.x);
	if (Ya(e)) {
		let r = n === "y" ? t.origin.y : t.origin.x, i = n === "y" ? t.axis.y.y : t.axis.x.x, a = (e.min - r) / i, o = (e.max - r) / i;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (Ja(e)) {
		let { x: n, y: r } = t.axis.x, { x: i, y: a } = t.axis.y, o = n * a - i * r;
		if (o === 0) throw new s("The axes of the coordinate system are collinear: a point cannot be converted to coordinates");
		let c = e.x - t.origin.x, l = e.y - t.origin.y;
		return {
			x: (c * a - l * i) / o,
			y: (l * n - c * r) / o
		};
	}
	throw new a(`Cannot convert ${JSON.stringify(e)} to coordinates`);
}
// src/calculus/computeCircle.ts
var so = 1e-12, co = 1e-9;
function lo() {
	return {
		center: B(),
		radius: NaN
	};
}
function uo(e, t, n) {
	let r = t.x - e.x, i = t.y - e.y, a = n.x - e.x, o = n.y - e.y, s = 2 * (r * o - i * a);
	if (!(Math.abs(s) > so * Math.hypot(r, i) * Math.hypot(a, o))) return lo();
	let c = r * r + i * i, l = a * a + o * o, u = (o * c - i * l) / s, d = (r * l - a * c) / s;
	return {
		center: {
			x: e.x + u,
			y: e.y + d
		},
		radius: Math.hypot(u, d)
	};
}
function fo(e, t, n) {
	let r = H(t, n), i = H(n, e), a = H(e, t), o = r + i + a, s = Math.abs((t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x));
	return s > so * o * o ? {
		center: {
			x: (r * e.x + i * t.x + a * n.x) / o,
			y: (r * e.y + i * t.y + a * n.y) / o
		},
		radius: s / o
	} : lo();
}
function po(e, t) {
	let n = H(e, t) / 2;
	return n > 0 ? {
		center: {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		},
		radius: n
	} : lo();
}
function mo(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = Math.hypot(r, i);
	if (!(a > 0)) return lo();
	let o = Math.abs(r * (e.y - t.y) - i * (e.x - t.x)) / a;
	return o > co ? {
		center: {
			x: e.x,
			y: e.y
		},
		radius: o
	} : lo();
}
// src/calculus/computeLine.ts
function ho(e, t, n, r, i = 0, a = !1, o) {
	if (t.x === 0 && t.y === 0) return null;
	let s = o !== void 0 && o !== 0 ? o : null, c, l, u, d;
	if (t.x === 0) c = u = e.x, l = a ? e.y - Math.sign(t.y) * i : t.y > 0 ? i : r - i, d = s === null ? t.y > 0 ? r - i : i : e.y + s * t.y;
	else if (t.y === 0) l = d = e.y, c = a ? e.x - Math.sign(t.x) * i : t.x > 0 ? i : n - i, u = s === null ? t.x > 0 ? n - i : i : e.x + s * t.x;
	else {
		let r, o;
		t.x > 0 ? (r = a ? -i / t.x : s ?? (e.x - i) / t.x, o = s ?? (n - e.x - i) / t.x) : (r = a ? -i / t.x : s ?? (n - e.x - i) / t.x, o = s ?? (e.x - i) / t.x), r = Math.abs(r), o = Math.abs(o), c = e.x - r * t.x, l = e.y - r * t.y, u = e.x + o * t.x, d = e.y + o * t.y;
	}
	return c > n && u > n || c < 0 && u < 0 || l > r && d > r || l < 0 && d < 0 ? null : [{
		x: c,
		y: l
	}, {
		x: u,
		y: d
	}];
}
function go(e, t, n, r) {
	let i = t.x - e.x, a = t.y - e.y, o = [
		[-i, e.x],
		[i, n - e.x],
		[-a, e.y],
		[a, r - e.y]
	], s = 0, c = 1;
	for (let [e, t] of o) {
		if (e === 0) {
			if (t < 0) return null;
			continue;
		}
		let n = t / e;
		if (e < 0 ? s = Math.max(s, n) : c = Math.min(c, n), s > c) return null;
	}
	return [{
		x: e.x + s * i,
		y: e.y + s * a
	}, {
		x: e.x + c * i,
		y: e.y + c * a
	}];
}
function _o(e, t) {
	return {
		point: {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		},
		direction: {
			x: e.y - t.y,
			y: t.x - e.x
		}
	};
}
function vo(e, t, n) {
	let r = new no(e, t), i = new no(e, n), a = {
		x: r.x / r.norm + i.x / i.norm,
		y: r.y / r.norm + i.y / i.norm
	};
	return Math.hypot(a.x, a.y) < 1e-12 ? {
		point: e,
		direction: {
			x: -r.y,
			y: r.x
		}
	} : {
		point: e,
		direction: a
	};
}
function yo(e, t, n = !1) {
	let r = e.intersection(t);
	if (r === null) {
		if (n) return {
			point: B(),
			direction: B()
		};
		let r = t.projection(e.A);
		return {
			point: {
				x: (e.A.x + r.x) / 2,
				y: (e.A.y + r.y) / 2
			},
			direction: {
				x: e.director.x,
				y: e.director.y
			}
		};
	}
	let i = e.director.unit, a = t.director.unit, o = n ? -1 : 1;
	return {
		point: r,
		direction: {
			x: i.x + o * a.x,
			y: i.y + o * a.y
		}
	};
}
// src/calculus/intersections.ts
var bo = 1e-12, xo = 1e-6;
function So(e, t, n, r) {
	let i = r.x - n.x, a = r.y - n.y, o = n.x - e.x, s = n.y - e.y, c = i * i + a * a;
	if (![
		c,
		o,
		s,
		t
	].every(Number.isFinite) || !(c > 0)) return null;
	let l = 2 * (i * o + a * s), u = o * o + s * s - t * t, d = l * l - 4 * c * u, f = l * l + Math.abs(4 * c * u), p = (e) => ({
		x: n.x + e * i,
		y: n.y + e * a
	});
	if (d < -1e-12 * f) return null;
	if (d <= bo * f) return [p(-l / (2 * c))];
	let m = Math.sqrt(d);
	return [p((-l - m) / (2 * c)), p((-l + m) / (2 * c))];
}
function Co(e, t, n, r) {
	let i = n.x - e.x, a = n.y - e.y, o = Math.hypot(i, a);
	if (![
		o,
		t,
		r
	].every(Number.isFinite) || o === 0) return null;
	let s = xo * Math.max(t, r);
	if (o > t + r + s || o < Math.abs(t - r) - s) return null;
	let c = (t * t - r * r + o * o) / (2 * o), l = Math.sqrt(Math.max(0, t * t - c * c)), u = e.x + c * i / o, d = e.y + c * a / o;
	if (l <= s) return [{
		x: u,
		y: d
	}];
	let f = -a * (l / o), p = l / o * i;
	return [{
		x: u + f,
		y: d + p
	}, {
		x: u - f,
		y: d - p
	}];
}
// src/calculus/NumExp.ts
var wo = class {
	_expression;
	_run;
	constructor(e) {
		this._expression = e;
		let t = new zo(e).parse();
		this._run = t.run, this._pgf = t.pgf;
	}
	_pgf;
	toPgf(e = {}) {
		return this._pgf.replace(/«(.)»/g, (t, n) => e[n] ?? n);
	}
	get expression() {
		return this._expression;
	}
	evaluate(e = {}) {
		return Ao(this._run(e));
	}
}, To = {
	pi: Math.PI,
	e: Math.E
}, Eo = {
	sin: Math.sin,
	cos: Math.cos,
	tan: Math.tan,
	asin: Math.asin,
	acos: Math.acos,
	atan: Math.atan,
	sqrt: Math.sqrt,
	abs: Math.abs,
	ln: Math.log,
	log: Math.log10
}, Do = {
	sin: (e) => `sin(deg(${e}))`,
	cos: (e) => `cos(deg(${e}))`,
	tan: (e) => `tan(deg(${e}))`,
	asin: (e) => `rad(asin(${e}))`,
	acos: (e) => `rad(acos(${e}))`,
	atan: (e) => `rad(atan(${e}))`,
	sqrt: (e) => `sqrt(${e})`,
	abs: (e) => `abs(${e})`,
	ln: (e) => `ln(${e})`,
	log: (e) => `log10(${e})`
}, Oo = { nthrt: (e, t) => e < 0 && t % 2 == 0 ? NaN : (e < 0 ? -1 : 1) * Math.abs(e) ** (1 / t) }, ko = [...Object.keys(Eo), ...Object.keys(Oo)].sort((e, t) => t.length - e.length);
function Ao(e) {
	return Math.abs(e) < 1e5 ? Math.round(e * 1e10) / 1e10 + 0 : e;
}
function jo(e) {
	if (!Number.isFinite(e)) return Number.isNaN(e) ? "(0/0)" : e > 0 ? "(1/0)" : "(-1/0)";
	let t = String(Number(e.toPrecision(15))), n = t.includes("e") ? e.toFixed(20).replace(/\.?0+$/, "") : t;
	return e < 0 ? `(${n})` : n;
}
function Mo(e) {
	return {
		run: () => e,
		value: e,
		pgf: jo(e)
	};
}
function No(e, t, n) {
	if (e.value !== void 0) return Mo(t(e.value));
	let r = e.run;
	return {
		run: (e) => t(r(e)),
		pgf: n(e.pgf)
	};
}
function Po(e, t, n) {
	let r = t.run, i = n.run;
	if (t.value !== void 0 && n.value !== void 0) return Mo(Fo(e, t.value, n.value));
	let a = t.pgf, o = n.pgf;
	switch (e) {
		case "+": return {
			run: (e) => r(e) + i(e),
			pgf: `(${a}+${o})`
		};
		case "-": return {
			run: (e) => r(e) - i(e),
			pgf: `(${a}-${o})`
		};
		case "*": return {
			run: (e) => r(e) * i(e),
			pgf: `(${a}*${o})`
		};
		case "/": return {
			run: (e) => r(e) / i(e),
			pgf: `(${a}/${o})`
		};
		case "%": return {
			run: (e) => r(e) % i(e),
			pgf: `(${a}-int(${a}/${o})*${o})`
		};
		default: return {
			run: (e) => r(e) ** +i(e),
			pgf: `(${a}^${o})`
		};
	}
}
function Fo(e, t, n) {
	switch (e) {
		case "+": return t + n;
		case "-": return t - n;
		case "*": return t * n;
		case "/": return t / n;
		case "%": return t % n;
		default: return t ** +n;
	}
}
function Io(e) {
	return {
		pgf: `«${e}»`,
		run: (t) => {
			let n = t[e];
			if (n === void 0) throw new a(`No value for the variable "${e}"`);
			return n;
		}
	};
}
var Lo = /^(?:\d+\.?\d*|\.\d+)/;
function Ro(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let i = e[n];
		if (/\s/.test(i)) n++;
		else if (/[\d.]/.test(i)) {
			let i = Lo.exec(e.slice(n));
			if (i === null) throw new r(`Cannot parse "${e}": invalid number at position ${n}`);
			t.push({
				kind: "number",
				text: i[0]
			}), n += i[0].length;
		} else if (/[a-zA-Z]/.test(i)) {
			let r = ko.find((t) => e.startsWith(t + "(", n));
			r === void 0 ? e.startsWith("pi", n) ? (t.push({
				kind: "constant",
				text: "pi"
			}), n += 2) : (t.push({
				kind: i === "e" ? "constant" : "variable",
				text: i
			}), n++) : (t.push({
				kind: "function",
				text: r
			}), n += r.length);
		} else if ("+-*/%^".includes(i)) t.push({
			kind: "operator",
			text: i
		}), n++;
		else if (i === "(" || i === ")" || i === ",") t.push({
			kind: i,
			text: i
		}), n++;
		else throw new r(`Cannot parse "${e}": unexpected character "${i}" at position ${n}`);
	}
	return t;
}
var zo = class {
	_expression;
	_tokens;
	_pos = 0;
	constructor(e) {
		this._expression = e, this._tokens = Ro(e);
	}
	parse() {
		this._tokens.length === 0 && this._fail("the expression is empty");
		let e = this._additive();
		return this._pos < this._tokens.length && this._fail(`unexpected "${this._tokens[this._pos].text}"`), e;
	}
	_fail(e) {
		throw new r(`Cannot parse "${this._expression}": ${e}`);
	}
	_peek() {
		return this._tokens[this._pos];
	}
	_isOperator(...e) {
		let t = this._peek();
		return t?.kind === "operator" && e.includes(t.text);
	}
	_expect(e) {
		let t = this._peek();
		t?.kind !== e && this._fail(t === void 0 ? `missing "${e}"` : `expected "${e}" but found "${t.text}"`), this._pos++;
	}
	_additive() {
		let e = this._multiplicative();
		for (; this._isOperator("+", "-");) {
			let t = this._tokens[this._pos++].text;
			e = Po(t, e, this._multiplicative());
		}
		return e;
	}
	_multiplicative() {
		let e = this._unary();
		for (;;) {
			if (this._isOperator("*", "/", "%")) {
				let t = this._tokens[this._pos++].text;
				e = Po(t, e, this._unary());
				continue;
			}
			let t = this._peek();
			if (!(t !== void 0 && [
				"number",
				"variable",
				"constant",
				"function",
				"("
			].includes(t.kind))) return e;
			t.kind === "number" && this._tokens[this._pos - 1].kind === "number" && this._fail(`two numbers in a row ("${this._tokens[this._pos - 1].text} ${t.text}")`), e = Po("*", e, this._unary());
		}
	}
	_unary() {
		return this._isOperator("-") ? (this._pos++, No(this._unary(), (e) => -e, (e) => `(-${e})`)) : this._isOperator("+") ? (this._pos++, this._unary()) : this._power();
	}
	_power() {
		let e = this._primary();
		return this._isOperator("^") ? (this._pos++, Po("^", e, this._unary())) : e;
	}
	_primary() {
		let e = this._peek();
		if (e === void 0) return this._fail("the expression ends unexpectedly");
		switch (this._pos++, e.kind) {
			case "number": return Mo(+e.text);
			case "constant": return Mo(To[e.text]);
			case "variable": return Io(e.text);
			case "(": {
				let e = this._additive();
				return this._expect(")"), e;
			}
			case "function": return this._call(e.text);
			default: return this._fail(`unexpected "${e.text}"`);
		}
	}
	_call(e) {
		this._expect("(");
		let t = [this._additive()];
		for (; this._peek()?.kind === ",";) this._pos++, t.push(this._additive());
		if (this._expect(")"), e in Eo && t.length === 1) return No(t[0], Eo[e], Do[e]);
		if (e in Oo && t.length === 2) {
			let n = Oo[e], [r, i] = t;
			return r.value !== void 0 && i.value !== void 0 ? Mo(n(r.value, i.value)) : {
				run: (e) => n(r.run(e), i.run(e)),
				pgf: i.value !== void 0 && i.value % 2 == 0 ? `(${r.pgf}^(1/${i.pgf}))` : `(sign(${r.pgf})*abs(${r.pgf})^(1/${i.pgf}))`
			};
		}
		return this._fail(`"${e}" does not take ${t.length} argument(s)`);
	}
}, Bo = [
	[1, 1],
	[2, -3],
	[-4, 5]
];
function Vo(e) {
	let t = (t, n) => new r(`Cannot parse "${e}" as the equation of a line: ${t}`, { cause: n }), n = e.split("=");
	if (n.length !== 2) throw t("expected one \"=\"");
	let i;
	try {
		i = new wo(`(${n[0]})-(${n[1]})`);
	} catch (e) {
		throw t(e instanceof Error ? e.message : "malformed", e);
	}
	let o = (e, n) => {
		try {
			return i.evaluate({
				x: e,
				y: n
			});
		} catch (e) {
			throw e instanceof a ? t("only x and y are allowed", e) : e;
		}
	}, s = o(0, 0), c = o(1, 0) - s, l = o(0, 1) - s, u = Bo.every(([e, t]) => {
		let n = c * e + l * t + s;
		return Math.abs(o(e, t) - n) <= 1e-8 * (1 + Math.abs(n));
	});
	if (![
		c,
		l,
		s
	].every(Number.isFinite) || !u) throw t("it is not linear in x and y");
	if (Math.abs(c) < 1e-9 && Math.abs(l) < 1e-9) throw t("x and y are both missing");
	return {
		a: c,
		b: l,
		c: s
	};
}
// src/calculus/computeQuadratic.ts
function Ho(e, t, n) {
	let { a: r, b: i, c: a } = Uo(e, t, n), o = (e) => e.toFixed(10).replace(/\.?0+$/, ""), s = [];
	for (let [e, t] of [
		[r, "x^2"],
		[i, "x"],
		[a, ""]
	]) {
		let n = o(e);
		n !== "0" && n !== "-0" && s.push((s.length > 0 && e > 0 ? "+" : "") + n + t);
	}
	return s.length > 0 ? s.join("") : "0";
}
function Uo(e, t, n) {
	let { x: r, y: i } = e, { x: a, y: o } = t, { x: c, y: l } = n, u = (r - a) * (r - c) * (a - c);
	if (u === 0) throw new s("A parabola through three points needs three different abscissas");
	return {
		a: (i * (a - c) + o * (c - r) + l * (r - a)) / u,
		b: (i * (c ** 2 - a ** 2) + o * (r ** 2 - c ** 2) + l * (a ** 2 - r ** 2)) / u,
		c: (i * (a * c * (a - c)) + o * (c * r * (c - r)) + l * (r * a * (r - a))) / u
	};
}
// src/calculus/computeCurve.ts
var Wo = 12;
function Go(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = r * r + i * i;
	if (a === 0) return Math.hypot(e.x - t.x, e.y - t.y);
	let o = Math.max(0, Math.min(1, ((e.x - t.x) * r + (e.y - t.y) * i) / a));
	return Math.hypot(e.x - (t.x + o * r), e.y - (t.y + o * i));
}
function Ko(e, t, n) {
	return e.x < n.left && t.x < n.left || e.x > n.right && t.x > n.right || e.y < n.top && t.y < n.top || e.y > n.bottom && t.y > n.bottom;
}
function qo(e, t) {
	let n = [], r = 0;
	for (; r < e.length;) {
		if (!V(e[r])) {
			n.length > 0 && V(n[n.length - 1]) && n.push(e[r]), r++;
			continue;
		}
		let i = r;
		for (; i + 1 < e.length && V(e[i + 1]);) i++;
		n.push(...Jo(e.slice(r, i + 1), t)), r = i + 1;
	}
	return n;
}
function Jo(e, t) {
	if (e.length < 3) return e;
	let n = Array(e.length).fill(!1);
	n[0] = n[e.length - 1] = !0;
	let r = [[0, e.length - 1]];
	for (let i = r.pop(); i !== void 0; i = r.pop()) {
		let [a, o] = i, s = -1, c = t;
		for (let t = a + 1; t < o; t++) {
			let n = Go(e[t], e[a], e[o]);
			n > c && (c = n, s = t);
		}
		s >= 0 && (n[s] = !0, r.push([a, s], [s, o]));
	}
	return e.filter((e, t) => n[t]);
}
function Yo(e, t, n, r) {
	let { tolerance: i, maxDepth: a, view: o, bound: s } = r, c = Math.max(1, Math.ceil(r.intervals)), l = [], u = (t) => {
		let n = e(t);
		return V(n) && Math.abs(n.x) <= s && Math.abs(n.y) <= s ? n : B();
	}, d = (e, t, n) => V(e) && Go(e, t, n) <= i, f = (e, t, n) => {
		let r = e, i = t, a = n;
		for (let e = 0; e < Wo; e++) {
			let e = (r + a) / 2, t = u(e);
			V(t) ? (r = e, i = t) : a = e;
		}
		return [r, i];
	}, p = (e, t, n, r, i) => {
		let c = V(t), m = V(r);
		if (!c && !m) return;
		if (c !== m) {
			if (c) {
				let [r, a] = f(e, t, n);
				p(e, t, r, a, i + 1), l.push(a);
			} else {
				let [t, a] = f(n, r, e);
				l.push(a), p(t, a, n, r, i + 1);
			}
			return;
		}
		if (i >= a || Math.hypot(r.x - t.x, r.y - t.y) > s || Ko(t, r, o)) return;
		let h = (e + n) / 2, g = u(h);
		V(g) && d(g, t, r) && d(u(e + (n - e) / 4), t, r) && d(u(e + 3 * (n - e) / 4), t, r) ? l.push(g) : (p(e, t, h, g, i + 1), l.push(g), p(h, g, n, r, i + 1));
	}, m = t, h = u(t);
	l.push(h);
	for (let e = 1; e <= c; e++) {
		let r = e === c ? n : t + e * (n - t) / c, i = u(r);
		p(m, h, r, i, 0), l.push(i), m = r, h = i;
	}
	return qo(l, i / 2);
}
function Xo(e, t, n) {
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r], a = r > 0 ? e[r - 1] : void 0;
		if (!V(i)) continue;
		if (a === void 0 || !V(a)) {
			if (i.x >= 0 && i.x <= t && i.y >= 0 && i.y <= n) return {
				point: i,
				direction: {
					x: 0,
					y: 0
				}
			};
			continue;
		}
		let o = go(a, i, t, n);
		if (o !== null) return {
			point: o[1],
			direction: {
				x: o[1].x - o[0].x,
				y: o[1].y - o[0].y
			}
		};
	}
	return null;
}
function Zo(e, t) {
	let n = B(), r = Infinity, i = (e) => {
		let i = Math.hypot(e.x - t.x, e.y - t.y);
		i < r && (r = i, n = e);
	};
	return e.forEach((n, r) => {
		if (!V(n)) return;
		let a = r > 0 ? e[r - 1] : void 0;
		if (a === void 0 || !V(a)) {
			i({
				x: n.x,
				y: n.y
			});
			return;
		}
		let o = n.x - a.x, s = n.y - a.y, c = o * o + s * s, l = c === 0 ? 0 : Math.max(0, Math.min(1, ((t.x - a.x) * o + (t.y - a.y) * s) / c));
		i({
			x: a.x + l * o,
			y: a.y + l * s
		});
	}), n;
}
function Qo(e, t, n = .5) {
	let r = null, i = 1e-9;
	for (let [a, o] of [[n, n], [n, -n]]) {
		let n = e(t.x + a, t.y + o), s = e(t.x - a, t.y - o);
		if (!V(n) || !V(s)) continue;
		let c = Math.hypot(n.x - s.x, n.y - s.y);
		c > i && (i = c, r = {
			x: n.x - s.x,
			y: n.y - s.y
		});
	}
	return r;
}
function W(e) {
	return Math.round(e * 100) / 100 + 0;
}
function $o(e, t) {
	let n = [], r = null;
	for (let i of e) {
		if (!V(i)) {
			r = null;
			continue;
		}
		let e = r !== null && Math.hypot(i.x - r.x, i.y - r.y) <= t;
		n.push(`${e ? "L" : "M"} ${W(i.x)} ${W(i.y)}`), r = i;
	}
	return n.length > 0 ? n.join(" ") : "M 0 0";
}
function es(e, t) {
	let n = Math.hypot(t.x, t.y);
	if (typeof e == "number") {
		let t = e * Math.PI / 180;
		return {
			x: Math.cos(t),
			y: -Math.sin(t)
		};
	}
	return e === "horizontal" ? {
		x: t.x < 0 ? -1 : 1,
		y: 0
	} : e === "vertical" ? {
		x: 0,
		y: t.y > 0 ? 1 : -1
	} : n === 0 ? {
		x: 0,
		y: 0
	} : {
		x: t.x / n,
		y: t.y / n
	};
}
function ts(e, t = !1) {
	let n = e.length;
	if (n < 2) return [];
	let r = e.map((r, i) => {
		let a = t ? e[(i - 1 + n) % n] : e[Math.max(i - 1, 0)], o = t ? e[(i + 1) % n] : e[Math.min(i + 1, n - 1)], s = {
			x: o.point.x - a.point.x,
			y: o.point.y - a.point.y
		}, c = Math.hypot(s.x, s.y) * (r.ratio ?? .2), l = es(r.direction, s);
		return {
			forward: {
				x: r.point.x + l.x * c,
				y: r.point.y + l.y * c
			},
			backward: {
				x: r.point.x - l.x * c,
				y: r.point.y - l.y * c
			}
		};
	});
	return Array.from({ length: t ? n : n - 1 }, (t, i) => {
		let a = (i + 1) % n;
		return {
			start: e[i].point,
			control1: r[i].forward,
			control2: r[a].backward,
			end: e[a].point
		};
	});
}
function ns(e) {
	if (e.length === 4) return [{
		start: e[0],
		control1: e[1],
		control2: e[2],
		end: e[3]
	}];
	if (e.length === 3) {
		let [t, n, r] = e, i = (e) => ({
			x: e.x + 2 * (n.x - e.x) / 3,
			y: e.y + 2 * (n.y - e.y) / 3
		});
		return [{
			start: t,
			control1: i(t),
			control2: i(r),
			end: r
		}];
	}
	throw new a(`A Bézier curve of control points has 3 or 4 points, got ${e.length}`);
}
function rs(e, t = !1) {
	if (e.length === 0) return "M 0 0";
	let n = (e) => `${W(e.x)},${W(e.y)}`, r = e.map(({ control1: e, control2: t, end: r }) => `C ${n(e)} ${n(t)} ${n(r)}`);
	return [
		`M ${n(e[0].start)}`,
		...r,
		...t ? ["Z"] : []
	].join(" ");
}
function is({ start: e, control1: t, control2: n, end: r }, i) {
	let a = 1 - i, o = (e, t, n, r) => a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * n + i * i * i * r, s = (e, t, n, r) => 3 * a * a * (t - e) + 6 * a * i * (n - t) + 3 * i * i * (r - n);
	return {
		point: {
			x: o(e.x, t.x, n.x, r.x),
			y: o(e.y, t.y, n.y, r.y)
		},
		direction: {
			x: s(e.x, t.x, n.x, r.x),
			y: s(e.y, t.y, n.y, r.y)
		}
	};
}
var as = 4, os = 1e9;
function ss(e, t = .5) {
	return e.flatMap((e, n) => {
		let r = Yo((t) => is(e, t).point, 0, 1, {
			intervals: as,
			tolerance: t,
			maxDepth: 8,
			view: {
				left: -1e9,
				right: os,
				top: -1e9,
				bottom: os
			},
			bound: os
		});
		return n === 0 ? r : r.slice(1);
	});
}
var cs = 24;
function ls(e) {
	let t = e.flatMap((e) => Array.from({ length: cs }, (t, n) => is(e, (n + 1) / cs)));
	if (t.length === 0) return null;
	let n = [is(e[0], 0), ...t], r = n.map((e, t) => t === 0 ? 0 : Math.hypot(e.point.x - n[t - 1].point.x, e.point.y - n[t - 1].point.y)), i = r.reduce((e, t) => e + t, 0) / 2, a = 0;
	for (let e = 1; e < n.length; e++) {
		if (a + r[e] >= i) {
			let t = r[e] === 0 ? 0 : (i - a) / r[e], o = n[e - 1], s = n[e];
			return {
				point: {
					x: o.point.x + (s.point.x - o.point.x) * t,
					y: o.point.y + (s.point.y - o.point.y) * t
				},
				direction: {
					x: s.point.x - o.point.x,
					y: s.point.y - o.point.y
				}
			};
		}
		a += r[e];
	}
	return n[n.length - 1];
}
// src/calculus/computeArc.ts
var us = 1e-9;
function ds(e, t) {
	let n = ((t - e) % 360 + 360) % 360;
	return n < us || n > 359.999999999 ? 0 : n;
}
function fs(e, t, n, r, i, a) {
	if (!V(e) || !Number.isFinite(t) || !Number.isFinite(n) || !Number.isFinite(r) || H(e, a) === 0) return B();
	let o = ao(e, a);
	if ((i ? ds(o, n) : ds(n, o)) <= r) return io(e.x, e.y, t, o);
	let s = io(e.x, e.y, t, n), c = io(e.x, e.y, t, i ? n - r : n + r);
	return H(s, a) <= H(c, a) ? s : c;
}
// src/calculus/computeAxis.ts
var ps = 1e-9, ms = 2e3, hs = 12;
function gs(e, t, n, r, i, a) {
	let o = t.x * t.x + t.y * t.y, s = n * Math.sqrt(o);
	if (!(o > 0) || !(s >= a) || !Number.isFinite(s)) return [];
	let c = (n) => ((n.x - e.x) * t.x + (n.y - e.y) * t.y) / o, l = [c(r) / n, c(i) / n], u = Math.ceil(Math.min(...l) - ps), d = Math.floor(Math.max(...l) + ps);
	return !Number.isFinite(u) || !Number.isFinite(d) || d - u > ms ? [] : Array.from({ length: Math.max(0, d - u + 1) }, (r, i) => {
		let a = u + i;
		return {
			index: a,
			value: z(a * n),
			point: {
				x: e.x + a * n * t.x,
				y: e.y + a * n * t.y
			}
		};
	});
}
function _s(e, t) {
	return t === void 0 || e === 0 || t.first === !0 && e === 1 ? !0 : t.every === void 0 ? t.first !== !0 : e % t.every === 0;
}
function vs(e, t) {
	return e > 0 ? Math.max(1, Math.ceil(t / e - ps)) : 1;
}
function ys(e) {
	let t = e / Math.PI;
	for (let e = 1; e <= hs; e++) {
		let n = Math.round(t * e);
		if (Math.abs(t - n / e) < ps) return {
			p: n + 0,
			q: e
		};
	}
	return null;
}
function bs(e, t, n) {
	let r = t === "pi" ? ys(e) : null;
	if (r === null) {
		let t = String(z(e, n));
		return {
			text: t,
			latex: t
		};
	}
	let { p: i, q: a } = r, o = i < 0 ? "-" : "", s = Math.abs(i);
	if (i === 0) return {
		text: "0",
		latex: "0"
	};
	let c = s === 1 ? "π" : `${s}π`, l = s === 1 ? "\\pi" : `${s}\\pi`;
	return a === 1 ? {
		text: `${o}${c}`,
		latex: `${o}${l}`
	} : {
		text: `${o}${c}/${a}`,
		latex: `${o}\\frac{${l}}{${a}}`
	};
}
// src/calculus/computeGrid.ts
var xs = 1e-9;
function Ss(e, t, n, r, i, a, o = 0) {
	let s = Math.hypot(t.x, t.y), c = {
		x: -t.y / s,
		y: t.x / s
	}, l = n.x * c.x + n.y * c.y;
	if (!(Math.abs(l) >= a) || !Number.isFinite(l)) return [];
	let u = [
		[0, 0],
		[r, 0],
		[0, i],
		[r, i]
	].map(([t, n]) => (t - e.x) * c.x + (n - e.y) * c.y), d = [Math.min(...u) / l, Math.max(...u) / l], f = Math.ceil(Math.min(...d) - xs), p = Math.floor(Math.max(...d) + xs), m = [];
	for (let a = f; a <= p; a++) {
		if (o > 0 && a % o === 0) continue;
		let s = ho({
			x: e.x + a * n.x,
			y: e.y + a * n.y
		}, t, r, i), c = s === null ? null : go(s[0], s[1], r, i);
		c !== null && m.push(c);
	}
	return m;
}
function Cs(e, t) {
	let n = Math.max(e.min, t.min), r = Math.min(e.max, t.max);
	return n <= r ? {
		min: n,
		max: r
	} : null;
}
function ws(e, t, n, r) {
	let i = Cs(e, t);
	if (i === null) return [];
	let a = n / r, o = Math.ceil(i.min / a - xs), s = Math.floor(i.max / a + xs), c = [];
	for (let e = o; e <= s; e++) (r === 1 || e % r !== 0) && c.push(z(e * a));
	if (r === 1) for (let n of [e.min, e.max]) {
		let e = n >= t.min && n <= t.max, r = c.some((e) => Math.abs(e - n) <= xs * Math.max(1, Math.abs(n)));
		e && !r && c.push(n);
	}
	return c.sort((e, t) => e - t);
}
function Ts(e, t, n, r, i, a = 1) {
	let o = Cs(e.x, t.x), s = Cs(e.y, t.y);
	if (o === null || s === null) return [];
	let c = (e) => {
		let t = r({
			x: 0,
			y: 0
		}), i = r(e === "x" ? {
			x: n.x / a,
			y: 0
		} : {
			x: 0,
			y: n.y / a
		});
		return Math.hypot(i.x - t.x, i.y - t.y);
	}, l = (e) => !(c(e) >= i), u = l("y") ? [] : ws(e.y, t.y, n.y, a).map((e) => [r({
		x: o.min,
		y: e
	}), r({
		x: o.max,
		y: e
	})]), d = l("x") ? [] : ws(e.x, t.x, n.x, a).map((e) => [r({
		x: e,
		y: s.min
	}), r({
		x: e,
		y: s.max
	})]);
	return [...u, ...d];
}
// src/calculus/computePath.ts
var Es = {
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
}, Ds = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y, Os = /[A-Za-z]/;
function ks(e, t, n, r, i, a, o) {
	if (e.x === o.x && e.y === o.y) return [];
	if (t === 0 || n === 0) return [{
		type: "L",
		p: o
	}];
	let s = r * Math.PI / 180, c = Math.cos(s), l = Math.sin(s), u = {
		x: (e.x - o.x) / 2,
		y: (e.y - o.y) / 2
	}, d = c * u.x + l * u.y, f = -l * u.x + c * u.y, p = Math.abs(t), m = Math.abs(n), h = d * d / (p * p) + f * f / (m * m);
	h > 1 && (p *= Math.sqrt(h), m *= Math.sqrt(h));
	let g = p * p, _ = m * m, ee = g * _ - g * f * f - _ * d * d, te = (i === a ? -1 : 1) * Math.sqrt(Math.max(0, ee / (g * f * f + _ * d * d))), v = te * p * f / m, y = -te * m * d / p, b = {
		x: c * v - l * y + (e.x + o.x) / 2,
		y: l * v + c * y + (e.y + o.y) / 2
	}, x = (e, t, n, r) => Math.atan2(e * r - t * n, e * n + t * r), ne = x(1, 0, (d - v) / p, (f - y) / m), S = x((d - v) / p, (f - y) / m, (-d - v) / p, (-f - y) / m);
	!a && S > 0 ? S -= 2 * Math.PI : a && S < 0 && (S += 2 * Math.PI);
	let re = (e) => ({
		x: b.x + p * Math.cos(e) * c - m * Math.sin(e) * l,
		y: b.y + p * Math.cos(e) * l + m * Math.sin(e) * c
	}), C = (e) => ({
		x: -p * Math.sin(e) * c - m * Math.cos(e) * l,
		y: -p * Math.sin(e) * l + m * Math.cos(e) * c
	}), ie = Math.max(1, Math.ceil(Math.abs(S) / (Math.PI / 2) - 1e-9)), w = S / ie, ae = 4 / 3 * Math.tan(w / 4);
	return Array.from({ length: ie }, (e, t) => {
		let n = ne + t * w, r = n + w, i = re(n), a = t === ie - 1 ? o : re(r), s = C(n), c = C(r);
		return {
			type: "C",
			c1: {
				x: i.x + ae * s.x,
				y: i.y + ae * s.y
			},
			c2: {
				x: a.x - ae * c.x,
				y: a.y - ae * c.y
			},
			p: a
		};
	});
}
function As(e) {
	let t = [], n = 0, i = "", a = {
		x: 0,
		y: 0
	}, o = {
		x: 0,
		y: 0
	}, s = null, c = null, l = (t) => {
		throw new r(`Invalid path ${JSON.stringify(e)}: ${t} (at the character ${n + 1})`);
	}, u = () => {
		for (; n < e.length && /\s/.test(e[n]);) n++;
	}, d = () => {
		u(), e[n] === "," && (n++, u());
	}, f = () => {
		d(), Ds.lastIndex = n;
		let t = Ds.exec(e);
		return t === null ? l("expected a number") : (n += t[0].length, +t[0]);
	}, p = () => (d(), e[n] !== "0" && e[n] !== "1" ? l("expected 0 or 1") : (n++, e[n - 1] === "1"));
	for (u(); n < e.length && (u(), !(n >= e.length));) {
		if (Os.test(e[n])) {
			if (i = e[n], i.toUpperCase() in Es || l(`the command "${i}" does not exist`), t.length === 0 && i !== "M" && i !== "m" && l("a path begins with M"), n++, i === "Z" || i === "z") {
				t.push({ type: "Z" }), a = o, s = c = null, i = "";
				continue;
			}
		} else i === "" && l("expected a command");
		let r = i === i.toLowerCase(), u = i.toUpperCase(), d = r ? a : {
			x: 0,
			y: 0
		}, m = () => ({
			x: d.x + f(),
			y: d.y + f()
		});
		switch (u) {
			case "M":
				a = m(), o = a, t.push({
					type: "M",
					p: a
				}), s = c = null, i = r ? "l" : "L";
				break;
			case "L":
				a = m(), t.push({
					type: "L",
					p: a
				}), s = c = null;
				break;
			case "H":
				a = {
					x: d.x + f(),
					y: a.y
				}, t.push({
					type: "L",
					p: a
				}), s = c = null;
				break;
			case "V":
				a = {
					x: a.x,
					y: d.y + f()
				}, t.push({
					type: "L",
					p: a
				}), s = c = null;
				break;
			case "C": {
				let e = m(), n = m();
				a = m(), t.push({
					type: "C",
					c1: e,
					c2: n,
					p: a
				}), s = n, c = null;
				break;
			}
			case "S": {
				let e = s === null ? a : {
					x: 2 * a.x - s.x,
					y: 2 * a.y - s.y
				}, n = m();
				a = m(), t.push({
					type: "C",
					c1: e,
					c2: n,
					p: a
				}), s = n, c = null;
				break;
			}
			case "Q":
			case "T": {
				let e = u === "T" ? c === null ? a : {
					x: 2 * a.x - c.x,
					y: 2 * a.y - c.y
				} : m(), n = m();
				t.push({
					type: "C",
					c1: {
						x: a.x + 2 / 3 * (e.x - a.x),
						y: a.y + 2 / 3 * (e.y - a.y)
					},
					c2: {
						x: n.x + 2 / 3 * (e.x - n.x),
						y: n.y + 2 / 3 * (e.y - n.y)
					},
					p: n
				}), a = n, c = e, s = null;
				break;
			}
			default: {
				let e = f(), n = f(), r = f(), i = p(), o = p(), l = m();
				t.push(...ks(a, e, n, r, i, o, l)), a = l, s = c = null;
			}
		}
	}
	return t;
}
function js(e, t) {
	return e.map((e) => {
		switch (e.type) {
			case "M":
			case "L": return {
				type: e.type,
				p: t(e.p)
			};
			case "C": return {
				type: "C",
				c1: t(e.c1),
				c2: t(e.c2),
				p: t(e.p)
			};
			case "Z": return e;
		}
	});
}
function Ms(e) {
	let t = (e) => `${W(e.x)} ${W(e.y)}`;
	return e.map((e) => {
		switch (e.type) {
			case "M":
			case "L": return `${e.type} ${t(e.p)}`;
			case "C": return `C ${t(e.c1)} ${t(e.c2)} ${t(e.p)}`;
			case "Z": return "Z";
		}
	}).join(" ");
}
function Ns(e) {
	let t = [], n = [], r = {
		x: 0,
		y: 0
	}, i = {
		x: 0,
		y: 0
	}, a = (e) => ({
		start: r,
		control1: {
			x: r.x + (e.x - r.x) / 3,
			y: r.y + (e.y - r.y) / 3
		},
		control2: {
			x: r.x + 2 * (e.x - r.x) / 3,
			y: r.y + 2 * (e.y - r.y) / 3
		},
		end: e
	}), o = () => {
		n.length > 0 && t.push(n), n = [];
	};
	for (let t of e) t.type === "M" ? (o(), r = i = t.p) : t.type === "L" ? (n.push(a(t.p)), r = t.p) : t.type === "C" ? (n.push({
		start: r,
		control1: t.c1,
		control2: t.c2,
		end: t.p
	}), r = t.p) : ((r.x !== i.x || r.y !== i.y) && n.push(a(i)), r = i);
	return o(), t;
}
// src/figures/AbstractFigure/AbstractFigure.tikz.ts
var Ps = .75, Fs = [
	"black",
	"blue",
	"brown",
	"cyan",
	"darkgray",
	"gray",
	"green",
	"lightgray",
	"lime",
	"magenta",
	"olive",
	"orange",
	"pink",
	"purple",
	"red",
	"teal",
	"violet",
	"white",
	"yellow"
], Is = {
	"->": {
		start: "<",
		end: ">"
	},
	"|": {
		start: "|",
		end: "|"
	},
	x: {
		start: "{Rays[n=4,angle=45:1pt]}",
		end: "{Rays[n=4,angle=45:1pt]}"
	}
};
function Ls(e, t = 3) {
	let n = 10 ** t;
	return String(Math.round(e * n) / n);
}
function Rs(e) {
	return `${Ls(e * Ps)}pt`;
}
function zs(e) {
	let t = e.trim().toLowerCase();
	if (t === "transparent" || t === "none") return null;
	let n = null, r = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(t), i = /^#([0-9a-f]{6})$/.exec(t), o = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(t);
	if (r ? n = r.slice(1).map((e) => e + e).join("") : i ? n = i[1] : o?.slice(1).every((e) => +e <= 255) && (n = o.slice(1).map((e) => (+e).toString(16).padStart(2, "0")).join("")), n !== null) {
		let e = `pidraw-${n}`;
		return {
			name: e,
			definition: `\\definecolor{${e}}{HTML}{${n.toUpperCase()}}`
		};
	}
	if (Fs.includes(t)) return {
		name: t,
		definition: null
	};
	throw new a(`The color "${e}" has no TikZ equivalent: use a hexadecimal color ('#rrggbb') or one of ${Fs.join(", ")}`);
}
function Bs(e, t) {
	let { x: n, y: r } = U(e, t);
	return `${Ls(n, 5)},${Ls(r, 5)}`;
}
function Vs(e) {
	let { x: t, y: n } = e.axis;
	return {
		x: Rs(Math.hypot(t.x, t.y)),
		y: Rs(Math.hypot(n.x, n.y))
	};
}
function Hs(e) {
	let { origin: t, width: n, height: r, axis: i } = e, a = [-t.x / i.x.x, (n - t.x) / i.x.x], o = [-t.y / i.y.y, (r - t.y) / i.y.y];
	return {
		x: [Math.min(...a), Math.max(...a)],
		y: [Math.min(...o), Math.max(...o)]
	};
}
function Us(e, t, n = {}) {
	let { x: r, y: i } = Hs(e), a = Vs(e), { axis: o } = e, s = (e) => z(e, 5), c = [
		"hide axis",
		"scale only axis",
		"trig format plots=deg",
		"unbounded coords=jump",
		`x=${a.x}`,
		`y=${a.y}`,
		`at={(${Rs(r[0] * Math.abs(o.x.x))},${Rs(i[0] * Math.abs(o.y.y))})}`,
		"anchor=south west",
		`xmin=${s(r[0])}`,
		`xmax=${s(r[1])}`,
		`ymin=${s(i[0])}`,
		`ymax=${s(i[1])}`
	];
	for (let [e, t] of Object.entries(n)) c.push(`restrict ${e} to domain=${s(t[0])}:${s(t[1])}`);
	return [
		`\\begin{axis}[${c.join(", ")}]`,
		...t,
		"\\end{axis}"
	];
}
function Ws(e) {
	return Math.min(1e3, Math.max(2, Math.ceil(4 * e) + 1));
}
function Gs(e, t) {
	let { x: n, y: r } = t.axis, i = Math.hypot(n.x, n.y), a = Math.hypot(r.x, r.y), o = z(e / i, 5);
	return Math.abs(i - a) <= 1e-9 * Math.max(i, a) ? `radius=${o}` : `x radius=${o}, y radius=${z(e / a, 5)}`;
}
function Ks(e, t, n) {
	let { stroke: r, fill: i } = e, a = /* @__PURE__ */ new Set(), o = [], s = (e) => {
		let t = zs(e);
		return t?.definition && a.add(t.definition), t?.name ?? null;
	}, c = s(r.color);
	o.push(c === null ? "draw=none" : `draw=${c}`), c !== null && (o.push(`line width=${Ls(r.width * Ps)}pt`), r.opacity < 1 && o.push(`draw opacity=${Ls(r.opacity)}`));
	let l = s(i.color);
	if (l !== null && (o.push(`fill=${l}`), i.opacity < 1 && o.push(`fill opacity=${Ls(i.opacity)}`)), t !== null) {
		let e = t.split(/[\s,]+/).map((e) => `${Ls(+e * Ps)}pt`), n = e.length % 2 == 1 ? [...e, ...e] : e;
		o.push(`dash pattern=${n.map((e, t) => `${t % 2 == 0 ? "on" : "off"} ${e}`).join(" ")}`);
	}
	if (n.start !== null || n.end !== null) {
		let e = n.start === null ? "" : Is[n.start].start, t = n.end === null ? "" : Is[n.end].end;
		o.push(`${e}-${t}`);
	}
	return {
		definitions: [...a],
		options: o
	};
}
function qs(e, t) {
	return t && !e.includes("$") ? `$${e}$` : e;
}
function Js(e, t, n) {
	let { alignement: r, offset: i, rotate: a } = e, o = [`${{
		t: "above",
		b: "below",
		m: ""
	}[r[0]]} ${{
		l: "left",
		r: "right",
		c: ""
	}[r[1]]}`.trim()];
	i.x && o.push(`xshift=${Ls(i.x * Ps)}pt`), i.y && o.push(`yshift=${Ls(i.y * Ps)}pt`), a && o.push(`rotate=${Ls(-a)}`);
	let s = o.filter((e) => e !== "").join(", ");
	return `\\node${s === "" ? "" : `[${s}]`} at (${t}) {${n}};`;
}
var Ys = "\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\\usetikzlibrary{arrows.meta}\n\\usepgfplotslibrary{fillbetween}";
function Xs(e, t) {
	let { x: n, y: r } = e.axis;
	if (!(Math.abs(n.y) <= Qs && Math.abs(r.x) <= Qs && n.x > 0 && r.y < 0)) throw new o("A graph can be written in TikZ only if its x axis goes to the right and its y axis goes up");
	if (Math.max(e.width, e.height) * Ps > Zs) throw new a(`A drawing of ${Rs(e.width)} by ${Rs(e.height)} is too large for TeX, which holds at most ${Zs}pt`);
	let i = Vs(e), s = Hs(e), c = (e) => z(e, 5), l = `(${c(s.x[0])},${c(s.y[0])}) rectangle (${c(s.x[1])},${c(s.y[1])})`, u = [], d = [], f = () => {
		d.length > 0 && (u.push("\\begin{scope}", `\\clip ${l};`, ...d, "\\end{scope}"), d = []);
	};
	for (let e of t.filter((e) => e !== "")) e.includes("\\begin{axis}") ? (f(), u.push(e)) : d.push(e);
	return f(), [
		`\\begin{tikzpicture}[x=${i.x}, y=${i.y}]`,
		`\\path ${l};`,
		...u,
		"\\end{tikzpicture}"
	].join("\n");
}
var Zs = 16383, Qs = 1e-9, $s = [
	"start",
	"end",
	"both",
	"none"
];
function ec(e) {
	let { color: t, opacity: n } = typeof e == "string" ? {
		color: e,
		opacity: void 0
	} : e;
	if (typeof t != "string" || t.trim() === "") throw new a(`Invalid color ${JSON.stringify(t)}: expected the name of a color`);
	if (typeof e == "string" && t.includes("/")) throw new a(`Invalid color "${t}": an opacity is written {color: 'red', opacity: 0.5}`);
	if (n === void 0) return {
		color: t,
		opacity: 1
	};
	if (typeof n != "number" || !(n >= 0 && n <= 1)) throw new a(`Invalid opacity ${String(n)} for the color "${t}": expected a number from 0 to 1`);
	return {
		color: t,
		opacity: n
	};
}
function tc() {
	return {
		stroke: {
			color: "black",
			width: 1,
			opacity: 1
		},
		fill: {
			color: "transparent",
			opacity: 1
		}
	};
}
var nc = class {
	_context;
	constructor(e, t) {
		this._context = e, this._rootSVG = e.rootSVG, this._name = t, this._static = !1, this._isDraggable = !1, this._label = null, this._labelContent = t, this._element = this._rootSVG.group().attr("id", this._name), this._appearance = tc(), this._shape = this._element.path();
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
		e !== this._shape && this._shape.remove(), this._shape = e;
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
	_labelContent;
	get label() {
		return this._label;
	}
	_controls = {};
	get controls() {
		return this._controls;
	}
	setControl(e, t) {
		return t === null ? Reflect.deleteProperty(this._controls, e) : this._controls[e] = t, this._context.figureChanged?.(this._name), this;
	}
	_hiders = /* @__PURE__ */ new Set();
	_defined = !0;
	followable = !1;
	get graphConfig() {
		return this._context.config;
	}
	setHiddenBy(e, t) {
		return t ? this._hiders.add(e) : this._hiders.delete(e), this._applyVisibility(), this;
	}
	isHiddenBy(e) {
		return this._hiders.has(e);
	}
	hide() {
		return this._element.hide(), this;
	}
	show() {
		return this._element.show(), this;
	}
	hideShape() {
		return this._element.children().forEach((e) => {
			e.attr("id") !== `${this._name}-label` && e.hide();
		}), this;
	}
	resetStyle() {
		return this._appearance = tc(), this._dasharray = null, this._markerStart = null, this._markerEnd = null, this._shape.attr("transform", null), this._label?.shape.remove(), this._label = null, this._labelContent = this._name, this._isDraggable = !1, Object.keys(this._controls).length > 0 && (this._controls = {}, this._context.figureChanged?.(this._name)), this._element.css("display") === "none" && (this._element.show(), this._element.attr("style") === "" && this._element.attr("style", null)), this;
	}
	strokeable() {
		return [this._shape];
	}
	fillable() {
		return [this._shape];
	}
	fill(e) {
		if (e !== void 0) {
			let t = ec(e);
			this._appearance.fill.color = t.color, this._appearance.fill.opacity = t.opacity;
		}
		return this.fillable().forEach((e) => {
			e.fill(this._appearance.fill);
		}), this;
	}
	stroke(e, t) {
		if (typeof e == "string" || typeof e == "object") {
			let n = ec(e);
			this._appearance.stroke.color = n.color, this._appearance.stroke.opacity = n.opacity, this._appearance.stroke.width = t ?? this._appearance.stroke.width;
		}
		return typeof e == "number" && t === void 0 && (this._appearance.stroke.width = e), this.strokeable().forEach((e) => {
			e.stroke(this._appearance.stroke), this._dasharray !== null && e.stroke({ dasharray: this._dasharray });
		}), this._styleMarkers(), this;
	}
	_dasharray = null;
	_markerStart = null;
	_markerEnd = null;
	_styleMarkers() {
		[this._shape.reference("marker-start"), this._shape.reference("marker-end")].filter((e) => e !== null).forEach((e) => {
			e.children().forEach((e) => {
				e.attr({
					fill: this._appearance.stroke.color,
					stroke: this._appearance.stroke.color,
					"stroke-width": this._appearance.stroke.width
				});
			});
		});
	}
	dash(e) {
		let t = String(e ?? this.graphConfig.axis.x.x / 2).trim();
		if (!/^(none|\d+(\.\d+)?([\s,]+\d+(\.\d+)?)*)$/.test(t)) throw new a(`Invalid dash pattern "${t}": expected 'none' or lengths like '5' or '5 2'`);
		return this._dasharray = t === "none" ? null : t, this.strokeable().forEach((e) => {
			e.stroke({ dasharray: t });
		}), this;
	}
	dot() {
		return this.dash(3);
	}
	clear() {
		return this._element.children().forEach((e) => {
			e.attr("id") !== `${this._name}-label` && e.remove();
		}), this;
	}
	update(e) {
		return (this.static || this._isDraggable) && e !== !0 || (this.computed(), this.updateLabel()), this;
	}
	addLabel(e, t = {}) {
		let { asHtml: n, texConverter: r } = t, i = e ?? this._name;
		return Ra(i, this.labelFields(), this._name), this._label?.shape.remove(), this._labelContent = i, this._label = new Wa(this._element, this._name, {
			text: za(i, this.labelFields()),
			asHtml: n ?? !1,
			...r === void 0 ? {} : { texConverter: r }
		}), this.updateLabel(), this._label;
	}
	_setDefined(e) {
		this._defined = e, this._applyVisibility();
	}
	_applyVisibility() {
		this._element.attr("visibility", this._defined && this._hiders.size === 0 ? null : "hidden");
	}
	_tikzCoordinates(e) {
		return Bs(e, this.graphConfig);
	}
	_tikzUnits() {
		return Vs(this.graphConfig);
	}
	_tikzView() {
		return Hs(this.graphConfig);
	}
	_tikzAxis(e, t = {}) {
		return Us(this.graphConfig, e, t);
	}
	_tikzSamples(e) {
		return Ws(e);
	}
	_tikzCurveStyle() {
		let e = this._tikzStyle();
		if (e.options.some((e) => e.startsWith("fill="))) throw new a(`The curve "${this._name}" has a fill, which has no equivalent in TikZ: use a fillbetween`);
		return e;
	}
	_tikzLength(e) {
		return Rs(e);
	}
	_tikzRadius(e) {
		return Gs(e, this.graphConfig);
	}
	_tikzShown() {
		return this._element.css("display") === "none" || this._element.attr("visibility") === "hidden" ? {
			shape: !1,
			label: !1
		} : {
			shape: this._shape.css("display") !== "none",
			label: this._label?.visible === !0
		};
	}
	_tikzStyle() {
		return Ks(this._appearance, this._dasharray, {
			start: this._markerStart,
			end: this._markerEnd
		});
	}
	_tikzDraw(e) {
		let { definitions: t, options: n } = this._tikzStyle();
		return [...t, `\\draw[${n.join(", ")}] ${e};`].join("\n");
	}
	_tikzLabel(e) {
		return this._label ? Js(this._label.config, e, this._tikzLabelText()) : "";
	}
	_tikzLabelText() {
		return qs(this.computeLabel(), this._label?.asHtml === !0);
	}
	_labelGap = 8;
	updateLabel() {
		return this._label && (this._label.setLabel(this.computeLabel()), this.moveLabel()), this;
	}
	labelFields() {
		return {};
	}
	computeLabel() {
		return this._label ? za(this._labelContent, this.labelFields()) : this._name;
	}
	move(e) {
		let t = eo(typeof e == "number" ? {
			x: e,
			y: 0
		} : e, "move"), { x: n, y: r } = this.graphConfig.axis;
		return this._shape.translate(t.x * n.x + t.y * r.x, t.x * n.y + t.y * r.y), this;
	}
	scale(e) {
		let t = eo(typeof e == "number" ? {
			x: e,
			y: e
		} : e, "scale");
		return this._shape.scale(t.x, t.y), this;
	}
	mark(e = {}) {
		let { side: t = "both", size: n = 10, shape: r = "->" } = e;
		if (!$s.includes(t)) throw new a(`Invalid marker position "${t}": expected 'start', 'end', 'both' or 'none'`);
		if (!Number.isFinite(n) || n <= 0) throw new a(`Invalid marker size ${n}: expected a number greater than 0`);
		if (!Ga.includes(r)) throw new a(`Invalid marker shape "${r}": expected ${Ga.map((e) => `'${e}'`).join(", ")}`);
		if (t === "none") return this._shape.attr({
			"marker-start": null,
			"marker-end": null
		}), this._markerStart = null, this._markerEnd = null, this;
		if (!("marker" in this._shape)) throw new a(`The figure "${this._name}" cannot have a marker: its shape is a ${this._shape.type}`);
		let i = this._shape, o = qa(this._rootSVG, this.name, n, r);
		return t !== "end" && (i.marker("start", o), this._markerStart = r), t !== "start" && (i.marker("end", o), this._markerEnd = r), this._styleMarkers(), this;
	}
	follow(e, t) {
		return {
			x: e,
			y: t
		};
	}
	dispose() {}
};
// src/figures/constraints.ts
function rc(e, t, n, r) {
	let i = t.filter((t) => e[t] !== void 0);
	if (i.length !== 1) throw new a(`The ${r} "${n}" needs exactly one constraint (${t.join(", ")}), got ${i.length === 0 ? "none" : i.join(", ")}`);
	return i[0];
}
function ic(e, t, n, r) {
	return rc(t, Object.keys(e), n, r);
}
function ac(e, t, n, r) {
	let i = e[t];
	return i(n[t], r);
}
var oc = (e) => typeof e == "object" && !!e && "x" in e && "y" in e && typeof e.x == "number" && typeof e.y == "number";
function G(e, t) {
	for (let [n, r] of Object.entries(e)) if (!oc(r)) throw new a(`Invalid ${t}: "${n}" is not a position {x, y}`);
	return e;
}
function sc(e, t) {
	return Object.values(G(Object.fromEntries(e.map((e, t) => [String(t), e])), t));
}
function cc(e, t, n) {
	if (typeof e == "number") {
		if (!Number.isFinite(e) || e <= 0) throw new a(`Invalid radius ${e}: expected a finite number greater than 0`);
		return Math.abs(oo(e, n));
	}
	if (typeof e == "object" && "point1" in e) {
		let { point1: t, point2: n } = G(e, "radius");
		return H(t, n);
	}
	return H(t, G({ radius: e }, "radius").radius);
}
// src/figures/Line/Line.constraints.ts
var lc = ({ point: e, direction: t }) => ({
	start: e,
	direction: t
});
function uc(e, t, n) {
	let r = oo(e, n), i = oo({
		x: e.x + t.x,
		y: e.y + t.y
	}, n);
	return {
		start: r,
		direction: {
			x: i.x - r.x,
			y: i.y - r.y
		}
	};
}
function dc(e, t, n) {
	return uc(U(e, n), {
		x: 1,
		y: t
	}, n);
}
function fc(e) {
	let t = e;
	if (typeof t == "object" && t && t.math instanceof ro) return t.math;
	throw new a(`Invalid line (${typeof t}): expected a line or an axis`);
}
var pc = 1e-4, mc = {
	bisector: (e) => lc("d1" in e ? yo(fc(e.d1), fc(e.d2), e.alternative) : vo(e.A, e.B, e.C)),
	director: ({ A: e, d: t }) => ({
		start: e,
		direction: t,
		end: {
			x: e.x + t.x,
			y: e.y + t.y
		}
	}),
	equation: (e, t) => {
		let { a: n, b: r, c: i } = Vo(e);
		return uc(Math.abs(r) >= Math.abs(n) ? {
			x: 0,
			y: -i / r
		} : {
			x: -i / n,
			y: 0
		}, {
			x: r,
			y: -n
		}, t);
	},
	mediator: ({ A: e, B: t }) => lc(_o(e, t)),
	parallel: ({ to: e, through: t }) => ({
		start: t,
		direction: e.direction
	}),
	perpendicular: ({ to: e, through: t }) => ({
		start: t,
		direction: e.normal
	}),
	slope: ({ A: e, slope: t }, n) => {
		if (!Number.isFinite(t)) throw new a(`Invalid slope ${t}: expected a finite number`);
		return dc(e, t, n);
	},
	through: ({ A: e, B: t }) => ({
		start: e,
		direction: {
			x: t.x - e.x,
			y: t.y - e.y
		},
		end: t
	}),
	tangent: ({ f: e, A: t }, n) => {
		let r = U(t, n).x;
		return dc(t, (e.numExp.evaluate({ x: r + pc }) - e.numExp.evaluate({ x: r - pc })) / (2 * pc), n);
	}
};
function hc(e, t) {
	return ic(mc, e, t, "line");
}
function gc(e, t, n) {
	return ac(mc, e, t, n);
}
// src/figures/Axis/Axis.constraints.ts
var _c = {
	step: 1,
	labels: "numbers",
	digits: 2,
	size: 6,
	zero: !0
}, vc = 1e3;
function yc(e, t, n) {
	let r = (r) => new a(`Invalid ${t} ${JSON.stringify(e)} for the graduation of the axis "${n}": expected ${r}`);
	if (typeof e != "object" || !e) throw r("{every, first}");
	let { every: i, first: o } = e;
	if (i !== void 0 && !(typeof i == "number" && Number.isInteger(i) && i >= 1 && i <= 1e3)) throw r(`an integer from 1 to ${vc} for every`);
	if (o !== void 0 && typeof o != "boolean") throw r("true or false for first");
}
function bc(e) {
	return e.ticks === void 0 ? null : {
		..._c,
		...e.ticks
	};
}
function xc(e, t) {
	let n = e.padding;
	if (n !== void 0 && !(typeof n == "number" && Number.isFinite(n) && n >= 0)) throw new a(`Invalid padding ${JSON.stringify(n)} for the axis "${t}": expected a finite number of 0 or more`);
	let r = e.side;
	if (r !== void 0 && r !== "left" && r !== "right") throw new a(`Invalid side ${JSON.stringify(r)} for the axis "${t}": expected 'left' or 'right'`);
	let i = e.name;
	if (i !== void 0 && (typeof i != "string" || i.trim() === "")) throw new a(`Invalid name ${JSON.stringify(i)} for the axis "${t}": expected a text`);
	if (e.ticks === void 0) return;
	let o = e.ticks, s = (e) => typeof e == "number" && Number.isFinite(e) && e > 0, c = (e, n, r) => new a(`Invalid ${e} ${JSON.stringify(r)} for the graduation of the axis "${t}": expected ${n}`);
	if (o.step !== void 0 && !s(o.step)) throw c("step", "a finite number greater than 0", o.step);
	if (o.size !== void 0 && !s(o.size)) throw c("size", "a finite number greater than 0", o.size);
	if (o.labels !== void 0 && o.labels !== "numbers" && o.labels !== "pi") throw c("labels", "'numbers' or 'pi'", o.labels);
	if (o.digits !== void 0 && !(typeof o.digits == "number" && Number.isInteger(o.digits) && o.digits >= 0 && o.digits <= 8)) throw c("digits", "an integer from 0 to 8", o.digits);
	if (o.zero !== void 0 && typeof o.zero != "boolean") throw c("zero", "true or false", o.zero);
	o.marks !== void 0 && yc(o.marks, "marks", t), o.numbers !== void 0 && o.numbers !== "none" && yc(o.numbers, "numbers", t);
	let l = hc(e, t);
	if (l !== "director" && l !== "through") throw new a(`The axis "${t}" is given by ${l}, which has no zero: a graduated axis is given by two points (through) or a point and a vector (director)`);
}
function Sc(e) {
	return e === !0 ? {
		x: {},
		y: {}
	} : e === void 0 || e === !1 ? {
		x: !1,
		y: !1
	} : e;
}
function Cc(e, t, n) {
	let r = n === !1 ? {} : n, i = n === !1 ? 0 : r.padding, a = r.step === void 0 ? void 0 : {
		step: r.step,
		labels: r.labels ?? "numbers",
		zero: !1,
		...r.marks === void 0 ? {} : { marks: r.marks },
		...r.numbers === void 0 ? {} : { numbers: r.numbers }
	};
	return {
		director: e,
		side: t,
		...i === void 0 ? {} : { padding: i },
		...a === void 0 ? {} : { ticks: a },
		...r.name === void 0 ? {} : { name: r.name }
	};
}
function wc(e, t, n) {
	let r = Math.hypot(t.x - e.x, t.y - e.y);
	if (!(r > 2 * n)) return null;
	let i = (t.x - e.x) / r, a = (t.y - e.y) / r;
	return [{
		x: e.x + n * i,
		y: e.y + n * a
	}, {
		x: t.x - n * i,
		y: t.y - n * a
	}];
}
// src/figures/Line/Line.ts
var Tc = [
	"segment",
	"ray",
	"line",
	"vector"
], Ec = 10;
function Dc(e, t) {
	let n = hc(e, t), r = e.shape ?? "line";
	if (!Tc.includes(r)) throw new a(`Invalid shape "${r}" for the line "${t}": expected ${Tc.map((e) => `'${e}'`).join(", ")}`);
	if ((r === "segment" || r === "vector") && n !== "through" && n !== "director") throw new a(`The ${r} "${t}" is given by two points (through) or a point and a vector (director), not by ${n}`);
	return {
		...e,
		shape: r
	};
}
var Oc = class extends nc {
	constructor(e, t, n) {
		let r = Dc(n, t);
		super(e, t), this._config = r, this._start = B(), this._end = B();
		try {
			this._makeShape(), this.computed();
		} catch (e) {
			throw this.element.remove(), e;
		}
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = Dc(e, this.name), n = gc(hc(t, this.name), t, this.graphConfig);
		this._config = t, this._makeShape(), this._place(n), this.updateLabel();
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
		return new ro(this.start, this.end);
	}
	get normal() {
		let e = this.direction;
		return {
			x: e.y,
			y: -e.x
		};
	}
	labelFields() {
		return this._config.shape === "segment" ? { length: (e) => z(H(U(this._start, this.graphConfig), U(this._end, this.graphConfig)), e).toString() } : {};
	}
	computed() {
		return this._place(gc(hc(this._config, this.name), this._config, this.graphConfig)), this;
	}
	_place({ start: e, direction: t, end: n }) {
		let r = this._config.shape;
		if (!(V(e) && V(t) && (n === void 0 || V(n))) || t.x === 0 && t.y === 0) return this._start = B(), this._end = B(), this._setDefined(!1), this;
		let i = {
			x: e.x,
			y: e.y
		}, a = n ? {
			x: n.x,
			y: n.y
		} : {
			x: e.x + t.x,
			y: e.y + t.y
		};
		if (r === "line" || r === "ray") {
			let { width: e, height: n } = this.graphConfig, o = ho(i, t, e, n, 0, r === "ray"), s = o === null ? null : go(o[0], o[1], e, n);
			s !== null && ([i, a] = s);
		}
		return this._start = i, this._end = a, this._setDefined(!0), this.shape.plot(i.x, i.y, a.x, a.y), this;
	}
	followable = !0;
	follow(e, t) {
		let { x: n, y: r } = this.start, i = this.end.x - n, a = this.end.y - r, o = i * i + a * a;
		if (!(o > 0)) return {
			x: e,
			y: t
		};
		let s = ((e - n) * i + (t - r) * a) / o, c = this._config.shape === "line" ? s : Math.max(0, Math.min(1, s));
		return {
			x: n + c * i,
			y: r + c * a
		};
	}
	tikz() {
		let e = this._tikzShown();
		return !e.shape && !e.label ? "" : [e.shape ? this._tikzDraw(`(${this._tikzCoordinates(this._start)}) -- (${this._tikzCoordinates(this._end)})`) : "", e.label ? this._tikzLabel(this._tikzCoordinates(this._labelPoint())) : ""].filter((e) => e !== "").join("\n");
	}
	_labelPoint() {
		let { start: e, end: t } = this;
		if (this._config.shape === "segment" || this._config.shape === "vector") return {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		};
		let n = Math.hypot(t.x - e.x, t.y - e.y);
		return {
			x: t.x - Ec * (t.x - e.x) / n,
			y: t.y - Ec * (t.y - e.y) / n
		};
	}
	moveLabel() {
		if (!this.label || !V(this._start) || !V(this._end)) return this;
		let { x: e, y: t } = this._labelPoint();
		if (this.label.move(e, t), this.label.autoRotate) {
			let e = -this.angle;
			e > 90 && (e -= 180), e < -90 && (e += 180), this.label.position(void 0, void 0, e);
		}
		return this;
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.line(0, 0, 0, 0), this.mark({ side: this._config.shape === "vector" ? "end" : "none" }), this.fill().stroke(), this.shape;
	}
}, kc = 4, Ac = 36, jc = 10, Mc = 4, Nc = 6, Pc = {
	l: "end",
	c: "middle",
	r: "start"
}, Fc = {
	t: "auto",
	m: "central",
	b: "hanging"
}, Ic = {
	t: "above",
	m: "",
	b: "below"
}, Lc = {
	l: "left",
	c: "",
	r: "right"
}, Rc = class e extends Oc {
	constructor(e, t, n) {
		xc(n, t), super(e, t, {
			...n,
			shape: "line"
		});
	}
	get config() {
		return this._config;
	}
	set config(e) {
		xc(e, this.name), super.config = {
			...e,
			shape: "line"
		};
	}
	get padding() {
		return this._config.padding ?? 20;
	}
	get unit() {
		let e = this._unit;
		return e == null ? null : { ...e };
	}
	get ticks() {
		return (this._ticks ?? []).map((e) => ({
			...e,
			from: { ...e.from },
			to: { ...e.to },
			label: e.label === null ? null : {
				...e.label,
				at: { ...e.label.at }
			}
		}));
	}
	get drawnName() {
		let e = this._drawnName;
		return e == null ? null : {
			...e,
			at: { ...e.at }
		};
	}
	_makeShape() {
		let e = super._makeShape();
		return this.mark({ side: "end" }), this._marks = this.element.path("M 0 0"), this._texts = this.element.group(), this._ticks = [], this._drawnName = null, this.stroke(), e;
	}
	strokeable() {
		return this._marks === void 0 ? [this.shape] : [this.shape, this._marks];
	}
	_styleMarkers() {
		super._styleMarkers(), this._texts?.attr("fill", this._appearance.stroke.color);
	}
	_place(e) {
		super._place(e);
		let t = hc(this._config, this.name);
		if (this._unit = (t === "director" || t === "through") && Number.isFinite(e.direction.x) && Number.isFinite(e.direction.y) ? {
			x: e.direction.x,
			y: e.direction.y
		} : null, Number.isNaN(this._start.x)) return this._graduate(e, !1);
		let n = wc(this._start, this._end, this.padding);
		return n === null ? (this._start = B(), this._end = B(), this._setDefined(!1), this._graduate(e, !1)) : ([this._start, this._end] = n, this.shape.plot(this._start.x, this._start.y, this._end.x, this._end.y), this._graduate(e, !0));
	}
	_numbersSide(e) {
		return this._config.side === "left" ? {
			x: e.y,
			y: -e.x
		} : {
			x: -e.y,
			y: e.x
		};
	}
	_graduate(e, t) {
		this._ticks = [], this._drawnName = null;
		let n = t ? Math.hypot(this._end.x - this._start.x, this._end.y - this._start.y) : 0;
		if (n > 0) {
			let t = {
				x: (this._end.x - this._start.x) / n,
				y: (this._end.y - this._start.y) / n
			}, r = this._numbersSide(t);
			this._ticks = this._ticksOf(e, t, r), this._config.name !== void 0 && (this._drawnName = {
				text: this._config.name,
				at: {
					x: this._end.x + Nc * (t.x - r.x),
					y: this._end.y + Nc * (t.y - r.y)
				},
				alignement: Ia(t.x - r.x, t.y - r.y)
			});
		}
		return this._paint(), this;
	}
	_ticksOf(e, t, n) {
		let r = bc(this._config);
		if (r === null) return [];
		let i = {
			x: this._end.x - jc * t.x,
			y: this._end.y - jc * t.y
		}, a = gs(e.start, e.direction, r.step, this._start, i, kc), o = Ia(n.x, n.y), s = r.size / 2, c = r.marks?.every ?? 1, l = vs(r.step * Math.hypot(e.direction.x, e.direction.y) * c, Ac) * c, u = (e) => r.numbers === void 0 ? e % l === 0 || r.marks?.first === !0 && e === 1 : r.numbers !== "none" && _s(e, r.numbers);
		return a.filter((e) => (r.zero || e.index !== 0) && _s(e.index, r.marks)).map(({ index: e, value: t, point: i }) => ({
			value: t,
			from: {
				x: i.x - s * n.x,
				y: i.y - s * n.y
			},
			to: {
				x: i.x + s * n.x,
				y: i.y + s * n.y
			},
			label: u(e) ? {
				...bs(t, r.labels, r.digits),
				at: {
					x: i.x + (s + Mc) * n.x,
					y: i.y + (s + Mc) * n.y
				},
				alignement: o
			} : null
		}));
	}
	_paint() {
		let e = (e) => `${W(e.x)},${W(e.y)}`, t = this._ticks, n = this._texts;
		this._marks?.plot(t.length === 0 ? "M 0 0" : t.map(({ from: t, to: n }) => `M${e(t)} L${e(n)}`).join(" ")), n?.clear();
		let r = (e, t, r) => {
			n?.text(e).attr({
				x: W(t.x),
				y: W(t.y),
				"text-anchor": Pc[r[1]],
				"dominant-baseline": Fc[r[0]]
			});
		};
		for (let e of t) e.label !== null && r(e.label.text, e.label.at, e.label.alignement);
		this._drawnName !== null && r(this._drawnName.text, this._drawnName.at, this._drawnName.alignement), this._styleMarkers();
	}
	static _tikzSide(e) {
		return [Ic[e[0]], Lc[e[1]]].filter((e) => e !== "").join(" ");
	}
	tikz() {
		let t = super.tikz();
		if (!this._tikzShown().shape || this._ticks.length === 0 && this._drawnName === null) return t;
		let { options: n } = this._tikzStyle(), r = n.filter((e) => e.includes("=")), i = n.find((e) => e.startsWith("draw="))?.slice(5), a = (e) => `(${this._tikzCoordinates(e)})`, o = (t, n, r) => {
			let o = [e._tikzSide(r), ...i === void 0 || i === "black" || i === "none" ? [] : [`text=${i}`]].filter((e) => e !== "").join(", ");
			return `\\node${o === "" ? "" : `[${o}]`} at ${a(n)} {$${t}$};`;
		};
		return [
			t,
			this._ticks.length === 0 || r.includes("draw=none") ? "" : `\\draw[${r.join(", ")}] ${this._ticks.map(({ from: e, to: t }) => `${a(e)} -- ${a(t)}`).join(" ")};`,
			...this._ticks.flatMap(({ label: e }) => e === null ? [] : [o(e.latex, e.at, e.alignement)]),
			this._drawnName === null ? "" : o(this._drawnName.text, this._drawnName.at, this._drawnName.alignement)
		].filter((e) => e !== "").join("\n");
	}
}, zc = {
	coordinates: ({ x: e, y: t }, n) => oo({
		x: Hc(e),
		y: Hc(t)
	}, n),
	direction: Gc,
	evaluation: ({ fx: e, x: t }) => e.evaluate(Hc(t)),
	intersection: ({ A: e, B: t }) => fc(e).intersection(fc(t)) ?? B(),
	intersectionBetweenCircles: ({ A: e, B: t, index: n }) => e.intersectionWithCircle(t)?.[n] ?? B(),
	intersectionWithCircle: ({ A: e, B: t, index: n }) => e.intersectionWithLine(t)?.[n] ?? B(),
	middle: ({ A: e, B: t }) => ({
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	}),
	projection: Uc,
	symmetry: Wc
};
function Bc(e, t) {
	return ic(zc, e, t, "point");
}
function Vc(e, t, n) {
	return ac(zc, e, t, n);
}
function Hc(e) {
	if (typeof e == "number") return e;
	if ("point" in e && "axis" in e) return e.point.coordinates[e.axis];
	if ("point1" in e && "point2" in e) return H(e.point1.coordinates, e.point2.coordinates);
	throw new a(`Invalid coordinate ${JSON.stringify(e)}: expected a number, {point, axis} or {point1, point2}`);
}
function Uc({ point: e, axis: t }) {
	let { x: n, y: r } = t.start, i = t.direction, a = e.x - n, o = e.y - r, s = a * i.x + o * i.y, c = i.x * i.x + i.y * i.y;
	return {
		x: n + s * i.x / c,
		y: r + s * i.y / c
	};
}
function Wc({ A: e, B: t }) {
	if (t instanceof Oc) {
		let n = new no(t.direction).normal, r = new no(e, t.start).projection(n);
		return {
			x: e.x + 2 * r.x,
			y: e.y + 2 * r.y
		};
	}
	return {
		x: t.x - (e.x - t.x),
		y: t.y - (e.y - t.y)
	};
}
function Gc({ point: e, direction: t, distance: n, perpendicular: r }, i) {
	if (t instanceof Oc) {
		let a = new no(r ? t.normal : t.direction).unit, o = t instanceof Rc ? t.unit : null, s = o === null ? oo(n, i) : n * Math.hypot(o.x, o.y);
		return {
			x: e.x + s * a.x,
			y: e.y + s * a.y
		};
	}
	let a = new no(t.A, t.B);
	return {
		x: e.x + n * a.x,
		y: e.y + n * a.y
	};
}
// src/figures/Point/Point.ts
var Kc = {
	circle: {
		size: 5,
		draw: (e, t) => e.circle(t),
		tikz: (e, t) => `(${e}) circle[radius=${t}]`
	},
	square: {
		size: 10,
		draw: (e, t) => e.rect(t, t),
		tikz: (e, t) => `(${e}) +(-${t},-${t}) rectangle +(${t},${t})`
	},
	crosshair: {
		size: 10,
		draw: (e, t) => {
			let n = t / 2;
			return e.path(`M ${-n} ${n} L ${n} ${-n} M ${-n} ${-n} L ${n} ${n}`);
		},
		tikz: (e, t) => `(${e}) +(-${t},-${t}) -- +(${t},${t}) (${e}) +(-${t},${t}) -- +(${t},-${t})`
	}
};
function qc(e, t) {
	if (!Number.isFinite(e) || e <= 0) throw new a(`Invalid size ${e} for the point "${t}": expected a finite number greater than 0`);
	return e;
}
function Jc({ shape: e = "circle", size: t }, n) {
	if (!Object.hasOwn(Kc, e)) throw new a(`Invalid shape "${e}" for the point "${n}": expected ${Object.keys(Kc).map((e) => `'${e}'`).join(", ")}`);
	return {
		shape: e,
		size: qc(t ?? Kc[e].size, n)
	};
}
var Yc = 1e-6, K = class extends nc {
	constructor(e, t, n) {
		Bc(n, t);
		let r = Jc(n, t);
		super(e, t), this._pixels = Object.freeze({
			x: NaN,
			y: NaN
		}), this._config = {
			...n,
			...r
		};
		try {
			this.computed();
		} catch (e) {
			throw this.element.remove(), e;
		}
		this._makeShape();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		Bc(e, this.name);
		let t = this._config;
		this._config = {
			...e,
			...Jc(e, this.name)
		};
		try {
			this.computed();
		} catch (e) {
			throw this._config = t, e;
		}
		this._makeShape(), this.updateLabel();
	}
	_pixels;
	get pixels() {
		return this._pixels;
	}
	set pixels(e) {
		this._pixels = Object.freeze({
			x: e.x,
			y: e.y
		}), this._setDefined(V(e)), this._centerShape(this.shape);
	}
	get coordinates() {
		return U(this._pixels, this.graphConfig);
	}
	get size() {
		return this._config.size;
	}
	set size(e) {
		this._config.size = qc(e, this.name), this._makeShape();
	}
	get x() {
		return this._pixels.x;
	}
	set x(e) {
		this.pixels = {
			x: e,
			y: this._pixels.y
		};
	}
	get y() {
		return this._pixels.y;
	}
	set y(e) {
		this.pixels = {
			x: this._pixels.x,
			y: e
		};
	}
	asCircle(e) {
		return this._as("circle", e);
	}
	asCrosshair(e) {
		return this._as("crosshair", e);
	}
	asSquare(e) {
		return this._as("square", e);
	}
	_as(e, t) {
		return Object.assign(this._config, Jc({
			shape: e,
			size: t
		}, this.name)), this._makeShape(), this;
	}
	labelFields() {
		return { coordinates: (e) => {
			let { x: t, y: n } = this.coordinates;
			return `(${z(t, e)};${z(n, e)})`;
		} };
	}
	isMoved() {
		let e = Vc(Bc(this._config, this.name), this._config, this.graphConfig);
		return !V(e) || !V(this._pixels) ? !1 : Math.hypot(e.x - this._pixels.x, e.y - this._pixels.y) > Yc;
	}
	computed() {
		return this.pixels = Vc(Bc(this._config, this.name), this._config, this.graphConfig), this;
	}
	tikz() {
		let e = this._tikzShown();
		if (!e.shape && !e.label) return "";
		let t = this._tikzCoordinates(this._pixels), n = this._tikzLength(this.size / 2);
		return [e.shape ? this._tikzDraw(Kc[this._config.shape].tikz(t, n)) : "", e.label ? this._tikzLabel(t) : ""].filter((e) => e !== "").join("\n");
	}
	moveLabel() {
		return this.label && this.label.move(this.x, this.y), this;
	}
	_makeShape() {
		this.clear();
		let { shape: e, size: t } = this._config;
		return this.shape = this._centerShape(Kc[e].draw(this.element, t)), this.fill().stroke(), this.shape;
	}
	_centerShape(e) {
		return V(this._pixels) && e.center(this._pixels.x, this._pixels.y), e;
	}
};
// src/animate/animation.ts
function Xc(e) {
	return e.controls.animate ?? null;
}
function Zc(e, t) {
	t !== null && Qc(e, t), e.setControl("animate", t);
}
function Qc(n, r) {
	let i = n.name;
	if (!(n instanceof K)) throw new a(`The figure "${i}" cannot be animated`);
	if (!Number.isFinite(r.duration) || r.duration <= 0) throw new a(`Invalid duration ${r.duration} for the animation of "${i}": expected a number greater than 0`);
	if (!Number.isFinite(r.delay) || r.delay < 0) throw new a(`Invalid delay ${r.delay} for the animation of "${i}": expected a number of 0 or more`);
	if (!Object.hasOwn(t, r.easing)) throw new a(`Invalid easing ${r.easing} for the animation of "${i}": expected ${Object.keys(t).join(", ")}`);
	if (!Object.values(e).includes(r.loop)) throw new a(`Invalid loop ${r.loop} for the animation of "${i}": expected ${Object.values(e).join(", ")}`);
	if (!(r.from instanceof K) || !(r.to instanceof K)) throw new a(`The animation of the point "${i}" needs a start and an end point (from, to)`);
}
// src/slides/slideSet.ts
function $c(e, t) {
	if (e.length === 0) throw new a(`Invalid slides for "${t}": expected at least one run of steps, like [{from: 2}]`);
	for (let { from: n, to: r } of e) {
		let e = r ?? n;
		if (!Number.isInteger(n) || n < 1 || !Number.isInteger(e) || e < n) throw new a(`Invalid slides for "${t}": the run from ${n} to ${r ?? "the end"} needs integers from 1, the end not below the start`);
	}
}
function el(e, t) {
	return e.some(({ from: e, to: n }) => t >= e && (n === void 0 || t <= n));
}
function tl(e) {
	return e.reduce((e, { from: t, to: n }) => Math.max(e, n ?? t), 0);
}
function nl(e) {
	return Object.freeze(e.map((e) => Object.freeze({ ...e })));
}
function rl(e) {
	return e.controls.slide ?? null;
}
function il(e, t) {
	t !== null && $c(t, e.name), e.setControl("slide", t === null ? null : nl(t));
}
// src/figures/Curve/Curve.constraints.ts
function al(e, t) {
	let n = e;
	return typeof n == "object" && !!n && typeof n.min == "number" && typeof n.max == "number" && !Number.isNaN(n.min) && !Number.isNaN(n.max) && n.min <= n.max && (t || Number.isFinite(n.min) && Number.isFinite(n.max));
}
var ol = (e) => typeof e == "number" && Number.isFinite(e) && e > 0, sl = {
	domain: {
		valid: (e) => al(e, !1),
		expected: "{min, max} with finite numbers and min <= max"
	},
	samples: {
		valid: ol,
		expected: "a finite number greater than 0"
	},
	tolerance: {
		valid: ol,
		expected: "a finite number greater than 0"
	},
	maxDepth: {
		valid: (e) => Number.isInteger(e) && e >= 0,
		expected: "an integer of 0 or more"
	},
	asymptoteThreshold: {
		valid: ol,
		expected: "a finite number greater than 0"
	}
}, cl = {
	valid: (e) => al(e, !0),
	expected: "{min, max} with min <= max"
};
function ll(e, t, n = {}) {
	let r = {
		...sl,
		...n
	}, i = e;
	for (let [e, n] of Object.entries(r)) {
		let r = i[e];
		if (r !== void 0 && !n.valid(r)) throw new a(`Invalid ${e} ${JSON.stringify(r)} for the curve "${t}": expected ${n.expected}`);
	}
}
function ul(e, t) {
	if (e !== void 0) return {
		min: e.min,
		max: e.max
	};
	let n = t.flatMap((e) => e.config.domain === void 0 ? [] : [e.config.domain]);
	return n.length === 0 ? null : {
		min: Math.max(...n.map((e) => e.min)),
		max: Math.min(...n.map((e) => e.max))
	};
}
function dl(e, t, n) {
	let r = new wo(e);
	try {
		r.evaluate({ [t]: 0 });
	} catch (r) {
		throw r instanceof a ? new a(`The function "${e}" ${n} can only use the variable ${t}: ${r.message}`, { cause: r }) : r;
	}
	return r;
}
// src/figures/Plot/Plot.constraints.ts
var fl = {
	expression: (e) => e,
	quadratic: (e, t) => {
		let { A: n, B: r, C: i } = G(e, "points of the parabola");
		try {
			return Ho(U(n, t), U(r, t), U(i, t));
		} catch (e) {
			if (e instanceof s) return null;
			throw e;
		}
	}
};
function pl(e, t) {
	return ic(fl, e, t, "plot");
}
function ml(e, t, n) {
	return ac(fl, e, t, n);
}
function hl(e, t, n) {
	let r = pl(e, t);
	ll(e, t, { image: cl });
	let i = ml(r, e, n);
	return i === null ? null : {
		expression: i,
		numExp: dl(i, "x", `of the plot "${t}"`)
	};
}
// src/figures/Plot/Plot.ts
var gl = "0/0", _l = class extends nc {
	_labelGap = 6;
	constructor(e, t, n) {
		let r = hl(n, t, e.config);
		super(e, t), this._config = { ...n }, this._fx = r?.expression ?? "", this._numExp = r?.numExp ?? new wo(gl), this._labelAnchor = null, this._range = null, this._makeShape(), this._draw(r !== null);
	}
	_fx;
	_numExp;
	get numExp() {
		return this._numExp;
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = hl(e, this.name, this.graphConfig);
		this._config = { ...e }, this._fx = t?.expression ?? "", this._numExp = t?.numExp ?? new wo(gl), this._draw(t !== null), this.updateLabel();
	}
	computed() {
		let e = ml(pl(this._config, this.name), this._config, this.graphConfig);
		return e !== this._fx && (this._fx = e ?? "", this._numExp = e === null ? new wo(gl) : new wo(e)), this._draw(e !== null);
	}
	valueAt(e) {
		return this._numExp.evaluate({ x: e });
	}
	evaluate(e) {
		return oo({
			x: e,
			y: this.valueAt(e)
		}, this.graphConfig);
	}
	followable = !0;
	follow(e, t) {
		return this.evaluate(U({
			x: e,
			y: t
		}, this.graphConfig).x);
	}
	_draw(e) {
		let t = this.shape;
		if (this._setDefined(e), this._labelAnchor = null, this._range = null, !e) return t.plot($o([], 0)), this;
		let n = this.graphConfig, { origin: r, width: i, height: a } = n, o = n.axis.x.x, s = n.axis.y.y, c = {
			min: -r.x / o - 1,
			max: (i - r.x) / o + 1
		}, l = Math.max(this._config.domain?.min ?? c.min, c.min), u = Math.min(this._config.domain?.max ?? c.max, c.max), d = this._config.image ?? {
			min: -Infinity,
			max: Infinity
		}, f = a * (this._config.asymptoteThreshold ?? 10), p = { x: 0 };
		if (l > u) return t.plot($o([], 0)), this;
		let m = (e) => {
			p.x = e;
			let t = this._numExp.evaluate(p);
			return Number.isNaN(t) || t < d.min || t > d.max ? B() : {
				x: r.x + e * o,
				y: r.y + t * s
			};
		}, h = {
			left: 0,
			right: i,
			top: 0,
			bottom: a
		}, g = (u - l) * (this._config.samples ?? Math.abs(o) / 8), _ = Yo(m, l, u, {
			intervals: g,
			tolerance: this._config.tolerance ?? .5,
			maxDepth: this._config.maxDepth ?? 6,
			view: h,
			bound: f
		});
		return t.plot($o(_, f)), this._range = {
			from: l,
			to: u,
			intervals: g
		}, this._labelAnchor = Xo(_, i, a), this;
	}
	_labelAnchor;
	_range;
	moveLabel() {
		if (!this.label || this._labelAnchor === null) return this;
		let { point: e, rising: t } = this._labelPlace(this._labelAnchor);
		return this.label.alignementGiven || (this.label.config.alignement = t ? "bl" : "tl"), this.label.move(e.x, e.y), this;
	}
	tikz() {
		let e = this._tikzShown();
		return [e.shape ? this._tikzPlot() : "", e.label && this._labelAnchor !== null ? this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._labelAnchor).point)) : ""].filter((e) => e !== "").join("\n");
	}
	_labelPlace({ point: e, direction: t }) {
		let n = t.y < 0;
		return {
			point: {
				x: e.x - this._labelGap,
				y: e.y + (n ? this._labelGap : -this._labelGap)
			},
			rising: n
		};
	}
	_tikzPlot() {
		if (this._range === null) return "";
		let { definitions: e, options: t } = this._tikzCurveStyle(), [n, r] = this._tikzView().y, i = this._config.image ?? {
			min: -Infinity,
			max: Infinity
		}, a = Math.max(i.min, n - (r - n)), o = Math.min(i.max, r + (r - n));
		if (a > o) return "";
		let s = (e) => z(e, 5), c = [
			`domain=${s(this._range.from)}:${s(this._range.to)}`,
			`samples=${this._tikzSamples(this._range.intervals)}`,
			...t
		];
		return [...e, ...this._tikzAxis([`\\addplot[${c.join(", ")}] {${this._numExp.toPgf()}};`], { y: [a, o] })].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, vl = {
	radius: ({ center: e, radius: t }, n) => {
		let r = G({ center: e }, "circle").center;
		return {
			center: r,
			radius: cc(t, r, n)
		};
	},
	through: ({ through: e }) => {
		let { A: t, B: n, C: r } = G(e, "points of the circle");
		return uo(t, n, r);
	},
	tangent: ({ tangent: e }) => {
		let { center: t } = G({ center: e.center }, "circle"), { to: n } = e;
		if (!(n instanceof Oc)) throw new a("Invalid tangent: \"to\" is neither a line nor an axis");
		return mo(t, n.start, n.end);
	},
	diameter: ({ diameter: e }) => {
		let { A: t, B: n } = G(e, "diameter");
		return po(t, n);
	},
	inscribed: ({ inscribed: e }) => {
		let { A: t, B: n, C: r } = G(e, "triangle");
		return fo(t, n, r);
	}
};
function yl(e, t) {
	let n = ic(vl, e, t, "circle");
	if (n !== "radius" && e.center !== void 0) throw new a(`The circle "${t}" has a center, which goes with a radius, and a ${n}`);
	if (n === "radius" && e.center === void 0) throw new a(`The circle "${t}" has a radius and needs a center`);
	return n;
}
function bl(e, t, n) {
	let r = vl[e];
	return r(t, n);
}
// src/figures/Circle/Circle.ts
var xl = class extends nc {
	followable = !0;
	constructor(e, t, n) {
		bl(yl(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = B(), this._radius = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = bl(yl(e, this.name), e, this.graphConfig);
		this._config = { ...e }, this._makeShape(), this._place(t), this.updateLabel();
	}
	_center;
	get center() {
		return this._center;
	}
	_radius;
	get radius() {
		return this._radius;
	}
	computed() {
		return this._place(bl(yl(this._config, this.name), this._config, this.graphConfig));
	}
	tikz() {
		let e = this._tikzShown();
		return !e.shape && !e.label ? "" : [e.shape ? this._tikzDraw(`(${this._tikzCoordinates(this._center)}) circle[${this._tikzRadius(this._radius)}]`) : "", e.label ? this._tikzLabel(this._tikzCoordinates(this._labelPoint())) : ""].filter((e) => e !== "").join("\n");
	}
	moveLabel() {
		if (this.label && Number.isFinite(this._radius)) {
			let { x: e, y: t } = this._labelPoint();
			this.label.move(e, t);
		}
		return this;
	}
	follow(e, t) {
		let { x: n, y: r } = this._center, i = this._radius;
		if (!Number.isFinite(i)) return {
			x: e,
			y: t
		};
		let a = e - n, o = t - r, s = Math.hypot(a, o);
		return s === 0 ? {
			x: n + i,
			y: r
		} : {
			x: n + a / s * i,
			y: r + o / s * i
		};
	}
	intersectionWithLine(e) {
		return So(this._center, this._radius, e.start, e.end);
	}
	intersectionWithCircle(e) {
		return Co(this._center, this._radius, e.center, e.radius);
	}
	_place({ center: e, radius: t }) {
		if (!V(e) || !Number.isFinite(t) || t <= 0) return this._center = B(), this._radius = NaN, this._setDefined(!1), this;
		this._center = {
			x: e.x,
			y: e.y
		}, this._radius = t, this._setDefined(!0);
		let n = this.shape;
		return n.radius(t), n.center(e.x, e.y), this;
	}
	_labelPoint() {
		return {
			x: this._center.x + this._radius / 2,
			y: this._center.y - this._radius / 2
		};
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.circle(0), this.fill().stroke(), this.shape;
	}
}, Sl = {
	x: 1,
	y: 1
};
function Cl(e) {
	return e.step === void 0 ? { ...Sl } : {
		x: e.step.x,
		y: e.step.y
	};
}
function wl(e, t) {
	let n = e.step, r = (e) => typeof e == "number" && Number.isFinite(e) && e > 0;
	if (n !== void 0 && (typeof n != "object" || !r(n.x) || !r(n.y))) throw new a(`Invalid step ${JSON.stringify(e.step)} for the grid "${t}": expected {x, y}, two finite numbers greater than 0`);
	let i = (e) => typeof e == "object" && !!e && Number.isFinite(e.min) && Number.isFinite(e.max) && e.min < e.max;
	if (e.x === void 0 != (e.y === void 0)) throw new a(`The grid "${t}" needs both x and y to be a part of the drawing, or none for all of it`);
	for (let [n, r] of [["x", e.x], ["y", e.y]]) if (r !== void 0 && !i(r)) throw new a(`Invalid ${n} ${JSON.stringify(r)} for the grid "${t}": expected {min, max}, two finite numbers with the minimum lower than the maximum`);
	let o = e.subdivisions;
	if (o !== void 0 && !(typeof o == "number" && Number.isInteger(o) && o >= 2 && o <= 20)) throw new a(`Invalid subdivisions ${JSON.stringify(o)} for the grid "${t}": expected an integer from 2 to 20`);
}
// src/figures/Grid/Grid.ts
var Tl = 3, El = .5;
function Dl(e) {
	let t = (e) => `${W(e.x)},${W(e.y)}`;
	return e.length === 0 ? "M 0 0" : e.map(([e, n]) => `M${t(e)} L${t(n)}`).join(" ");
}
var Ol = class extends nc {
	constructor(e, t, n = {}) {
		wl(n, t), super(e, t), this.static = !0, this.appearance.stroke.color = "lightgray", this._config = { ...n }, this._lines = [], this._subLines = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		wl(e, this.name), this._config = { ...e }, this.computed();
	}
	_lines;
	_subLines;
	_sub;
	get lines() {
		return this._lines.map(([e, t]) => [{ ...e }, { ...t }]);
	}
	get subLines() {
		return this._subLines.map(([e, t]) => [{ ...e }, { ...t }]);
	}
	_view() {
		let { width: e, height: t } = this.graphConfig, n = [
			{
				x: 0,
				y: 0
			},
			{
				x: e,
				y: 0
			},
			{
				x: 0,
				y: t
			},
			{
				x: e,
				y: t
			}
		].map((e) => U(e, this.graphConfig)), r = n.map((e) => e.x), i = n.map((e) => e.y);
		return {
			x: {
				min: Math.min(...r),
				max: Math.max(...r)
			},
			y: {
				min: Math.min(...i),
				max: Math.max(...i)
			}
		};
	}
	_family(e, t) {
		let { origin: n, width: r, height: i, axis: a } = this.graphConfig, o = Cl(this._config), { x: s, y: c } = this._config;
		return s !== void 0 && c !== void 0 ? Ts({
			x: s,
			y: c
		}, this._view(), o, (e) => oo(e, this.graphConfig), Tl, e) : [...Ss(n, a.x, {
			x: a.y.x * o.y / e,
			y: a.y.y * o.y / e
		}, r, i, Tl, t), ...Ss(n, a.y, {
			x: a.x.x * o.x / e,
			y: a.x.y * o.x / e
		}, r, i, Tl, t)];
	}
	computed() {
		let e = this._config.subdivisions ?? 0;
		return this._lines = this._family(1, 0), this._subLines = e === 0 ? [] : this._family(e, e), this._setDefined(this._lines.length > 0 || this._subLines.length > 0), this.shape.plot(Dl(this._lines)), this._sub?.plot(Dl(this._subLines)), this;
	}
	moveLabel() {
		return this;
	}
	strokeable() {
		return this._sub === void 0 ? [this.shape] : [this.shape, this._sub];
	}
	tikz() {
		if (this._lines.length === 0 && this._subLines.length === 0 || !this._tikzShown().shape) return "";
		let e = (e, t) => e.length === 0 ? "" : this._tikzDraw(this._tikzGridPath(t) ?? e.map(([e, t]) => `(${this._tikzCoordinates(e)}) -- (${this._tikzCoordinates(t)})`).join(" ")), t = e(this._subLines, this._config.subdivisions ?? 1);
		return [t === "" ? "" : `\\begin{scope}[opacity=${El}]\n${t}\n\\end{scope}`, e(this._lines, 1)].filter((e) => e !== "").join("\n");
	}
	_tikzGridPath(e) {
		let { axis: t } = this.graphConfig, n = Cl(this._config), r = Math.abs(t.x.y) <= 1e-9 && Math.abs(t.y.x) <= 1e-9, i = Math.hypot(t.x.x, t.x.y) * n.x / e >= Tl && Math.hypot(t.y.x, t.y.y) * n.y / e >= Tl;
		if (!r || !i) return null;
		let { x: a, y: o } = this._config, s = a !== void 0 && o !== void 0, c = s ? {
			x: [a.min, a.max],
			y: [o.min, o.max]
		} : this._tikzView(), l = (e) => z(e, 5), u = `(${l(c.x[0])},${l(c.y[0])})`, d = `(${l(c.x[1])},${l(c.y[1])})`;
		return `${u} grid[xstep=${l(n.x / e)}, ystep=${l(n.y / e)}] ${d}${s && e === 1 ? ` ${u} rectangle ${d}` : ""}`;
	}
	_makeShape() {
		return this.clear(), this._sub = this.element.group().opacity(El).path("M 0 0"), this.shape = this.element.path("M 0 0"), this.stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Arc/Arc.constraints.ts
function kl(e, t) {
	if (!Number.isFinite(e)) throw new a(`Invalid ${t} ${e}: expected a finite number`);
	return e;
}
function Al(e, t, n, r) {
	return e === void 0 ? H(t, n) : cc(e, t, r);
}
var jl = {
	points: ({ start: e, center: t, end: n, radius: r }, i) => {
		let a = G({
			start: e,
			center: t,
			end: n
		}, "arc");
		return {
			...a,
			radius: Al(r, a.center, a.start, i)
		};
	},
	angles: ({ center: e, radius: t, from: n, to: r }, i) => {
		let a = G({ center: e }, "arc").center, o = cc(t, a, i), s = (e) => io(a.x, a.y, o, kl(e, "angle"));
		return {
			center: a,
			start: s(n),
			end: s(r),
			radius: o
		};
	},
	rotation: ({ start: e, center: t, angle: n, radius: r }, i) => {
		let a = G({
			start: e,
			center: t
		}, "arc"), o = kl(n, "angle"), s = H(a.center, a.start), c = io(a.center.x, a.center.y, s, ao(a.center, a.start) + o), l = Al(r, a.center, a.start, i);
		return o >= 0 ? {
			center: a.center,
			start: a.start,
			end: c,
			radius: l
		} : {
			center: a.center,
			start: c,
			end: a.start,
			radius: l
		};
	}
};
function Ml(e, t) {
	return ic(jl, e, t, "arc");
}
function Nl(e, t, n) {
	return ac(jl, e, t, n);
}
// src/figures/Arc/Arc.ts
var Pl = 1e-6, Fl = class extends nc {
	constructor(e, t, n) {
		Nl(Ml(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = B(), this._start = B(), this._end = B(), this._radius = NaN, this._from = NaN, this._sweep = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = Nl(Ml(e, this.name), e, this.graphConfig);
		this._config = { ...e }, this._makeShape(), this._place(t), this.updateLabel();
	}
	_center;
	get center() {
		return this._center;
	}
	_start;
	get start() {
		return this._start;
	}
	_end;
	get end() {
		return this._end;
	}
	_radius;
	get radius() {
		return this._radius;
	}
	_from;
	_sweep;
	get angle() {
		return this._sweep;
	}
	get isSquare() {
		return Math.abs(this._sweep - 90) < Pl;
	}
	asSector() {
		return this.config = {
			...this._config,
			sector: !0
		}, this;
	}
	asSquare() {
		return this.config = {
			...this._config,
			square: !0
		}, this;
	}
	computed() {
		return this._place(Nl(Ml(this._config, this.name), this._config, this.graphConfig));
	}
	_place({ center: e, start: t, end: n, radius: r }) {
		let i = V(e) && V(t) && V(n) && Number.isFinite(r) && r > 0 && H(e, t) > 0 && H(e, n) > 0 ? ao(e, t) : NaN, a = Number.isNaN(i) ? 0 : ds(i, ao(e, n));
		return a === 0 ? (this._center = B(), this._start = B(), this._end = B(), this._radius = NaN, this._from = NaN, this._sweep = NaN, this._setDefined(!1), this) : (this._center = {
			x: e.x,
			y: e.y
		}, this._start = {
			x: t.x,
			y: t.y
		}, this._end = {
			x: n.x,
			y: n.y
		}, this._radius = r, this._from = i, this._sweep = this._config.alternative ? 360 - a : a, this._setDefined(!0), this.shape.plot(this._path()), this);
	}
	followable = !0;
	follow(e, t) {
		return fs(this._center, this._radius, this._from, this._sweep, this._config.alternative === !0, {
			x: e,
			y: t
		});
	}
	_drawnAsSquare() {
		return this._config.square === !0 && this.isSquare;
	}
	_directionAt(e) {
		return this._config.alternative ? this._from - e * this._sweep : this._from + e * this._sweep;
	}
	_pointAt(e, t) {
		return io(this._center.x, this._center.y, t, e);
	}
	_drawnRadius() {
		return this._drawnAsSquare() ? this._radius / 2 : this._radius;
	}
	_path() {
		let e = this._drawnRadius(), t = this._pointAt(this._from, e), n = this._pointAt(this._directionAt(1), e), r = this._drawnAsSquare() ? [
			"M",
			t.x,
			t.y,
			"l",
			n.x - this._center.x,
			n.y - this._center.y,
			"L",
			n.x,
			n.y
		] : [
			"M",
			t.x,
			t.y,
			"A",
			e,
			e,
			0,
			+(this._sweep > 180),
			+!!this._config.alternative,
			n.x,
			n.y
		];
		return this._config.sector && r.push("L", this._center.x, this._center.y, "L", t.x, t.y), r.join(" ");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
	_labelPlace() {
		let e = this._directionAt(.5), t = this._drawnAsSquare() ? this._radius * Math.SQRT1_2 : this._radius;
		return {
			point: this._pointAt(e, t + this._labelGap),
			alignement: Ia(Math.cos(e * Math.PI / 180), -Math.sin(e * Math.PI / 180))
		};
	}
	moveLabel() {
		if (!this.label || Number.isNaN(this._sweep)) return this;
		let { point: e, alignement: t } = this._labelPlace();
		return this.label.alignementGiven || (this.label.config.alignement = t), this.label.move(e.x, e.y), this;
	}
	tikz() {
		let e = this._tikzShown();
		return !e.shape && !e.label ? "" : [e.shape ? this._tikzDraw(this._tikzPath()) : "", e.label ? this._tikzLabel(this._tikzCoordinates(this._labelPlace().point)) : ""].filter((e) => e !== "").join("\n");
	}
	_tikzPath() {
		let e = (e) => `(${this._tikzCoordinates(e)})`, t = e(this._center), n = this._drawnRadius(), r = this._pointAt(this._from, n);
		if (this._drawnAsSquare()) {
			let i = this._pointAt(this._directionAt(1), n), a = {
				x: r.x + i.x - this._center.x,
				y: r.y + i.y - this._center.y
			}, o = `${e(r)} -- ${e(a)} -- ${e(i)}`;
			return this._config.sector ? `${o} -- ${t} -- cycle` : o;
		}
		let i = `start angle=${z(this._from, 5)}, end angle=${z(this._directionAt(1), 5)}`, a = `${e(r)} arc[${i}, ${this._tikzRadius(this._radius)}]`;
		return this._config.sector ? `${t} -- ${a} -- cycle` : a;
	}
};
// src/figures/Bezier/Bezier.constraints.ts
function Il(e) {
	if (e !== void 0 && e !== "horizontal" && e !== "vertical" && !(typeof e == "number" && Number.isFinite(e))) throw new a(`Invalid direction ${JSON.stringify(e)}: expected 'horizontal', 'vertical' or an angle in degrees`);
}
function Ll(e) {
	if (e !== void 0 && !(typeof e == "number" && Number.isFinite(e) && e > 0)) throw new a(`Invalid ratio ${JSON.stringify(e)}: expected a finite number greater than 0`);
}
var Rl = {
	through: (e, t) => {
		let n = t ? 3 : 2;
		if (!Array.isArray(e) || e.length < n) throw new a(`A ${t ? "closed " : ""}curve needs at least ${n} points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let r = e.map((e, t) => {
			let { point: n } = G({ point: e?.point }, `point ${t} of the curve`);
			return Il(e.direction), Ll(e.ratio), {
				point: {
					x: n.x,
					y: n.y
				},
				direction: e.direction,
				ratio: e.ratio
			};
		});
		return r.every((e) => V(e.point)) ? ts(r, t) : null;
	},
	controls: (e) => {
		if (!Array.isArray(e) || e.length !== 3 && e.length !== 4) throw new a(`A curve of control points has 3 or 4 points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = sc(e, "control point of the curve");
		return t.every(V) ? ns(t.map((e) => ({
			x: e.x,
			y: e.y
		}))) : null;
	}
};
function zl(e, t) {
	return ic(Rl, e, t, "curve");
}
function Bl(e, t, n) {
	if (t.closed === !0 && e !== "through") throw new a(`The curve "${n}" has control points and cannot be closed: only a curve through points can`);
	return ac(Rl, e, t, t.closed === !0);
}
// src/figures/Bezier/Bezier.ts
var Vl = class e extends nc {
	constructor(t, n, r) {
		Bl(zl(r, n), r, n), super(t, n), this._config = e._copy(r), this._segments = null, this._makeShape(), this.computed();
	}
	static _copy(e) {
		return {
			...e,
			...e.through === void 0 ? {} : { through: e.through.map((e) => ({ ...e })) },
			...e.controls === void 0 ? {} : { controls: [...e.controls] }
		};
	}
	_config;
	get config() {
		return this._config;
	}
	set config(t) {
		let n = Bl(zl(t, this.name), t, this.name);
		this._config = e._copy(t), this._place(n), this.updateLabel();
	}
	_segments;
	get segments() {
		return this._segments === null ? [] : this._segments.map(({ start: e, control1: t, control2: n, end: r }) => ({
			start: { ...e },
			control1: { ...t },
			control2: { ...n },
			end: { ...r }
		}));
	}
	asClosed() {
		return this.config = {
			...this._config,
			closed: !0
		}, this;
	}
	computed() {
		return this._place(Bl(zl(this._config, this.name), this._config, this.name));
	}
	_place(e) {
		return this._segments = e, this._setDefined(e !== null), this.shape.plot(e === null ? "M 0 0" : rs(e, this._config.closed === !0)), this;
	}
	followable = !0;
	follow(e, t) {
		return Zo(this._segments === null ? [] : ss(this._segments), {
			x: e,
			y: t
		});
	}
	_labelPlace() {
		let e = this._segments === null ? null : ls(this._segments);
		return e === null ? null : La(e.point, e.direction, this._labelGap);
	}
	moveLabel() {
		let e = this._labelPlace();
		return !this.label || e === null || (this.label.alignementGiven || (this.label.config.alignement = e.alignement), this.label.move(e.point.x, e.point.y)), this;
	}
	tikz() {
		let e = this._tikzShown(), t = this._labelPlace();
		if (this._segments === null || t === null || !e.shape && !e.label) return "";
		let n = (e) => `(${this._tikzCoordinates(e)})`, r = this._config.closed === !0, i = this._segments.map(({ control1: e, control2: t, end: i }, a, o) => `.. controls ${n(e)} and ${n(t)} .. ${r && a === o.length - 1 ? "cycle" : n(i)}`), a = [n(this._segments[0].start), ...i].join(" ");
		return [e.shape ? this._tikzDraw(a) : "", e.label ? this._tikzLabel(this._tikzCoordinates(t.point)) : ""].filter((e) => e !== "").join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, q = /* @__PURE__ */ function(e) {
	return e.POINT = "pt", e.MIDDLE = "mid", e.PROJECTION = "proj", e.INTERSECTION = "inter", e.SYMMETRY = "sym", e.DIRECTION_POINT = "dpt", e.VECTOR_POINT = "vpt", e.EVAL_FX = "eval", e.LINE = "line", e.VECTOR = "vec", e.SEGMENT = "seg", e.RAY = "ray", e.PERPENDICULAR = "perp", e.PARALLEL = "para", e.MEDIATOR = "med", e.TANGENT = "tan", e.BISECTOR = "bis", e.CIRCLE = "circ", e.ARC = "arc", e.PLOT = "plot", e.PARAMETRIC = "parametric", e.BEZIER = "bezier", e.POLYGON = "poly", e.GRID = "grid", e.AXIS = "axis", e.FOLLOW = "follow", e.FILL_BETWEEN = "fill", e.RIEMANN = "riemann", e.PATH = "path", e;
}({}), Hl = [
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
], J = (e) => e instanceof K, Ul = (e) => e instanceof Oc, Wl = (e) => e === "*";
function Gl(e, t) {
	return e.map((e) => typeof e == "string" && Object.hasOwn(t, e) ? t[e] : e);
}
function Kl(e, t) {
	if (typeof e != "string") return null;
	let n = e.split(":");
	if (n.length !== 2) return null;
	let [r, i] = n.map((e) => Object.hasOwn(t, e) ? t[e] : void 0);
	return r instanceof K && i instanceof K ? [r, i] : null;
}
function ql(e, t) {
	if (typeof e == "number" || J(e)) return e;
	let n = Kl(e, t);
	return n === null ? null : {
		point1: n[0],
		point2: n[1]
	};
}
function Y(e) {
	return e instanceof Object && "name" in e && typeof e.name == "string" ? `the figure "${e.name}"` : e === void 0 ? "nothing" : JSON.stringify(e);
}
function Jl(e, t, n, r) {
	return new i(e, `Invalid value ${Y(n)} for the option "${e}" of "${t.name}": expected ${r}`);
}
function X(e, t, n) {
	throw new r(`Cannot build "${e.name}" (${e.key}): expected ${t}, got ${n}`);
}
function Z(e, t, n, r, i) {
	(t.length < n || t.length > r) && X(e, i, `${t.length} value${t.length === 1 ? "" : "s"}`);
}
// src/figures/Arc/Arc.parser.ts
var Yl = "arc", Xl = "three points (start, center, end) and a radius, a center with a radius and two angles, or a center, a point and an angle and a radius (the radius is always optional but with the two angles), all with a last * for the other arc";
function Zl(e, t) {
	if (e.key !== q.ARC.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an arc`);
	let n = Gl(e.values, t), i = Wl(n.at(-1)), a = Ql(i ? n.slice(0, -1) : n, t) ?? X(e, Xl, n.length === 0 ? "no value" : n.map(Y).join(", "));
	return {
		create: Yl,
		config: i ? {
			...a,
			alternative: i
		} : a
	};
}
function Ql(e, t) {
	let [n, r, i, a] = e;
	if (!J(n) || e.length < 3 || e.length > 4) return null;
	if (J(r) && J(i)) {
		let e = a === void 0 ? void 0 : ql(a, t);
		return e === null ? null : { points: {
			start: n,
			center: r,
			end: i,
			...e === void 0 ? {} : { radius: e }
		} };
	}
	if (typeof r == "number" && typeof i == "number" && typeof a == "number") return { angles: {
		center: n,
		radius: r,
		from: i,
		to: a
	} };
	if (J(r) && typeof i == "number") {
		let e = a === void 0 ? void 0 : ql(a, t);
		return e === null ? null : { rotation: {
			center: n,
			start: r,
			angle: i,
			...e === void 0 ? {} : { radius: e }
		} };
	}
	return null;
}
var $l = {
	sector: (e) => e.asSector(),
	square: (e) => e.asSquare()
};
Object.keys($l);
function eu(e, t, n) {
	if (!(e instanceof Fl)) throw new i(t, `The option "${t}" shapes an arc, and "${e.name}" is not an arc`);
	if (n !== !0) throw new i(t, `Invalid value ${Y(n)} for the option "${t}" of "${e.name}": it takes no value`);
	$l[t](e);
}
var tu = {
	sector: (e, { value: t }) => {
		eu(e, "sector", t);
	},
	square: (e, { value: t }) => {
		eu(e, "square", t);
	}
}, nu = { [q.ARC]: {
	name: "arc",
	description: "Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last * for the other arc)",
	forms: [
		"a=arc <point>,<point>,<point>[,<radius>][,*]",
		"a=arc <point>,<number>,<number>,<number>[,*]",
		"a=arc <point>,<point>,<number>[,<radius>][,*]"
	],
	summary: "a=arc B,A,C — arc",
	build: Zl
} }, ru = /^(\d*\.?\d*)pi$/, iu = /^(\d*\.?\d*)pi(?:\/(\d+))?$/, au = 2;
function ou(e, t) {
	throw new r(`Cannot read the parameter ${e}: expected ${t}`);
}
function su({ value: e, options: t }, n) {
	let r = `"${n}=${[e, ...t].map((e) => Y(e)).join("/")}"`;
	if (e === !0) return t.length === 0 ? null : ou(r, `no option after ${n}`);
	if (typeof e == "number") return (t.length > 0 || !(Number.isFinite(e) && e > 0)) && ou(r, `a step greater than 0 (${n}=0.5)`), {
		step: e,
		pi: !1
	};
	let i = typeof e == "string" ? ru.exec(e) : null;
	if (i === null) return ou(r, `a step (${n}=0.5, ${n}=pi, ${n}=2pi/3), got ${Y(e)}`);
	let a = i[1] === "" ? 1 : +i[1], o = t.length === 0 ? au : t[0];
	return (t.length > 1 || typeof o != "number" || !Number.isInteger(o) || o <= 0 || !(a > 0)) && ou(r, `a multiple of pi over an integer greater than 0 (${n}=pi/3)`), {
		step: a * Math.PI / o,
		pi: !0
	};
}
function cu(e) {
	if (typeof e == "number") return Number.isFinite(e) && e > 0 ? {
		step: e,
		pi: !1
	} : null;
	let t = typeof e == "string" ? iu.exec(e) : null;
	if (t === null) return null;
	let n = t[1] === "" ? 1 : +t[1], r = t.at(2) === void 0 ? au : +t[2];
	return n > 0 && r > 0 ? {
		step: n * Math.PI / r,
		pi: !0
	} : null;
}
var Q = (e) => e !== void 0 && e.value !== !1;
// src/figures/Axis/Axis.parser.ts
function lu(e, t) {
	let { value: n, options: i } = e;
	if (typeof n != "string" && typeof n != "number" || i.length > 0 || String(n).trim() === "") throw new r(`Cannot read the parameter "${t}=${Y(n)}": expected a name (${t}=x)`);
	return String(n);
}
function uu({ value: e, options: t }, n, i) {
	if (e === "none" && i && t.length === 0) return "none";
	if (e === "first" && t.length === 0) return { first: !0 };
	if (typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= 1e3) {
		if (t.length === 0) return { every: e };
		if (t.length === 1 && t[0] === "first") return {
			every: e,
			first: !0
		};
	}
	throw new r(`Cannot read the option "${n}=${[e, ...t].map((e) => Y(e)).join("/")}": expected an integer from 1 to ${vc} (${n}=5), first, 5/first${i ? " or none" : ""}`);
}
function du(e) {
	let t = {}, n = {};
	for (let [i, a] of Object.entries(e)) if (i === "ticks") t.marks = uu(a, i, !1);
	else if (i === "numbers") t.numbers = uu(a, i, !0);
	else if (i === "padding") t.padding = fu(a);
	else if (i === "name" || i === "side") throw new r(`The option "${i}" is for an axis drawn from the code, not for the axes of the graph: ${i === "name" ? "use axisXname or axisYname" : "the graph puts the numbers inside of the drawing"}`);
	else n[i] = a;
	return {
		extra: t,
		style: n
	};
}
function fu({ value: e, options: t }) {
	if (typeof e != "number" || t.length > 0 || !(Number.isFinite(e) && e >= 0)) throw new r(`Cannot read the option "padding=${Y(e)}": expected a number of 0 or more (pixels)`);
	return e;
}
function pu(e, t = {}) {
	let n = Q(e.axis) ? su(e.axis, "axis") : null, r = (t, n, r, i, a, o) => {
		if (!(Q(e.axis) || Q(t) || Q(r))) return !1;
		let s = Q(t) ? su(t, n) : null, c = s === null ? { ...a } : {
			step: s.step,
			labels: s.pi ? "pi" : "numbers"
		}, l = {
			...o?.marks !== void 0 || o?.numbers !== void 0 ? {
				step: 1,
				labels: "numbers",
				...c
			} : c,
			...o
		};
		return Q(r) ? {
			...l,
			name: lu(r, i)
		} : l;
	};
	return {
		x: r(e.axisX, "axisX", e.axisXname, "axisXname", n === null ? void 0 : {
			step: n.step,
			labels: n.pi ? "pi" : "numbers"
		}, t.x),
		y: r(e.axisY, "axisY", e.axisYname, "axisYname", n === null ? void 0 : {
			step: n.pi ? 1 : n.step,
			labels: "numbers"
		}, t.y)
	};
}
var mu = "two points (the zero, then the unit), then a step: a number (0.5) or a number of pi (pi/2)";
function hu(e, t) {
	if (e.key !== q.AXIS.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an axis`);
	let [n, i, ...a] = Gl(e.values, t);
	if (!J(n) || !J(i) || a.length > 1) return X(e, mu, e.values.length === 0 ? "no value" : e.values.map(Y).join(", "));
	if (a.length === 0) return {
		create: "axis",
		config: {
			through: {
				A: n,
				B: i
			},
			ticks: {}
		}
	};
	let o = cu(a[0]);
	return o === null ? X(e, mu, Y(a[0])) : {
		create: "axis",
		config: {
			through: {
				A: n,
				B: i
			},
			ticks: {
				step: o.step,
				labels: o.pi ? "pi" : "numbers"
			}
		}
	};
}
function gu(e, t, n) {
	if (!(e instanceof Rc)) throw new i(t, `The option "${t}" is for an axis, and "${e.name}" is not one`);
	let { value: o, options: s } = n, c = e.config, l = (n) => new i(t, `Invalid value ${Y(o)} for the option "${t}" of "${e.name}": expected ${n}`), u;
	try {
		switch (t) {
			case "ticks":
				u = {
					...c,
					ticks: {
						...c.ticks,
						marks: uu(n, t, !1)
					}
				};
				break;
			case "numbers":
				u = {
					...c,
					ticks: {
						...c.ticks,
						numbers: uu(n, t, !0)
					}
				};
				break;
			case "padding":
				u = {
					...c,
					padding: fu(n)
				};
				break;
			case "name":
				if (typeof o != "string" && typeof o != "number" || s.length > 0 || String(o).trim() === "") throw l("a name (name=t)");
				u = {
					...c,
					name: String(o)
				};
				break;
			case "side":
				if (o !== "left" && o !== "right" || s.length > 0) throw l("left or right");
				u = {
					...c,
					side: o
				};
		}
		e.config = u;
	} catch (n) {
		throw n instanceof i ? n : n instanceof a || n instanceof r ? new i(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
var _u = (e) => (t, n) => {
	gu(t, e, n);
}, vu = {
	ticks: _u("ticks"),
	numbers: _u("numbers"),
	name: _u("name"),
	side: _u("side"),
	padding: _u("padding")
}, yu = { [q.AXIS]: {
	name: "axis",
	description: "Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph",
	forms: ["a=axis <point>,<point>[,<step>]"],
	summary: "a=axis A,B — graduated line",
	build: hu
} }, bu = "bezier", xu = "two points or more, each one a name that can be followed by a direction (H, V, S, or an angle in degrees) and a ratio (A/H/0.4, B/45/0.3), or, with a last *, 3 or 4 control points";
function Su(e, t) {
	let n = Object.hasOwn(t, e) ? t[e] : void 0;
	return n instanceof K ? n : null;
}
function Cu(e) {
	let t = +e;
	return e.trim() === "" || !Number.isFinite(t) ? null : t;
}
function wu(e) {
	switch (e) {
		case "H": return "horizontal";
		case "V": return "vertical";
		case "S": return;
		default: return Cu(e);
	}
}
function Tu(e, t, n) {
	let r = typeof e == "string" ? e.split("/") : [], i = r.at(0), a = r.at(1), o = r.at(2), s = i === void 0 ? null : Su(i, n);
	if (s === null) return X(t, xu, `${Y(e)} as a point`);
	let c = a === void 0 ? void 0 : wu(a), l = o === void 0 ? void 0 : Cu(o);
	return c === null || r.length > 3 ? X(t, xu, `${Y(e)} (the direction must be H, V, S or an angle in degrees)`) : l === null || l !== void 0 && l <= 0 ? X(t, xu, `${Y(e)} (the ratio must be a number greater than 0)`) : {
		point: s,
		...c === void 0 ? {} : { direction: c },
		...l === void 0 ? {} : { ratio: l }
	};
}
function Eu(e, t) {
	if (e.key !== q.BEZIER.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a Bézier curve`);
	let n = Wl(e.values.at(-1)), i = n ? e.values.slice(0, -1) : e.values;
	if (n) {
		let n = i.map((e) => typeof e == "string" ? Su(e, t) : null);
		return n.length !== 3 && n.length !== 4 || n.some((e) => e === null) ? X(e, xu, i.length === 0 ? "no value" : i.map(Y).join(", ")) : {
			create: bu,
			config: { controls: n }
		};
	}
	return i.length < 2 ? X(e, xu, i.length === 0 ? "no value" : Y(i[0])) : {
		create: bu,
		config: { through: i.map((n) => Tu(n, e, t)) }
	};
}
var Du = { close: (e) => e.asClosed() };
Object.keys(Du);
function Ou(e, t, n) {
	if (!(e instanceof Vl)) throw new i(t, `The option "${t}" shapes a Bézier curve, and "${e.name}" is not one`);
	if (n !== !0) throw new i(t, `Invalid value ${Y(n)} for the option "${t}" of "${e.name}": it takes no value`);
	try {
		Du[t](e);
	} catch (n) {
		throw n instanceof a ? new i(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
var ku = { close: (e, { value: t }) => {
	Ou(e, "close", t);
} }, Au = { [q.BEZIER]: {
	name: "bezier",
	description: "Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last *, the curve pulled by 3 or 4 control points",
	forms: ["b=bezier <point>[/<H|V|S|angle>[/<ratio>]],...", "b=bezier <point>,<point>,<point>[,<point>],*"],
	summary: "b=bezier A,B,C — curve through points",
	build: Eu
} }, ju = "circle", Mu = "a center and a radius (a number, a point or A:B), a center and a line or an axis, three points (with a last * for the inscribed circle), or A:B for a diameter";
function Nu(e, t) {
	if (e.key !== q.CIRCLE.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a circle`);
	return {
		create: ju,
		config: Pu(Gl(e.values, t), e, t)
	};
}
function Pu(e, t, n) {
	let r = () => X(t, Mu, e.length === 0 ? "no value" : e.map(Y).join(", "));
	if (e.length === 1) {
		let t = Kl(e[0], n);
		return t === null ? r() : { diameter: {
			A: t[0],
			B: t[1]
		} };
	}
	if (e.length === 2) {
		let [t, i] = e;
		if (!J(t)) return r();
		if (Ul(i)) return { tangent: {
			center: t,
			to: i
		} };
		let a = ql(i, n);
		return a === null ? r() : {
			center: t,
			radius: a
		};
	}
	if (e.length === 3 || e.length === 4) {
		let [t, n, r, i] = e;
		if (J(t) && J(n) && J(r)) {
			if (e.length === 3) return { through: {
				A: t,
				B: n,
				C: r
			} };
			if (Wl(i)) return { inscribed: {
				A: t,
				B: n,
				C: r
			} };
		}
	}
	return r();
}
var Fu = { [q.CIRCLE]: {
	name: "circle",
	description: "Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last * for the inscribed circle), from a center and a tangent line, or from a diameter A:B",
	forms: [
		"c=circ <point>,<radius>",
		"c=circ <point>,<line>",
		"c=circ <point>,<point>,<point>[,*]",
		"c=circ <point>:<point>"
	],
	summary: "c=circ O,r — circle",
	build: Nu
} };
// src/parser/parser.curve.ts
function Iu(e, t, n) {
	try {
		let t = new wo(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof r || e instanceof a)) throw e;
	}
	return X(t, n, `${JSON.stringify(e)} as a bound (a number, or an expression of numbers like 2pi)`);
}
function Lu(e, t, n) {
	let r = e.split(":");
	if (r.length !== 2 || r.some((e) => e.trim() === "")) return X(t, n, `${JSON.stringify(e)} (expected min:max)`);
	let i = Iu(r[0], t, n), a = Iu(r[1], t, n);
	return i > a ? X(t, n, `${JSON.stringify(e)}, whose minimum is greater than its maximum`) : {
		min: i,
		max: a
	};
}
function Ru(e) {
	if (typeof e == "number") return {
		text: String(e),
		samples: []
	};
	if (typeof e != "string") return null;
	let t = e.lastIndexOf("@");
	return t < 0 ? {
		text: e,
		samples: []
	} : {
		text: e.slice(0, t),
		samples: [e.slice(t)]
	};
}
function zu(e, t, n, r) {
	let i = {}, a = [];
	for (let o of e) {
		let e = o;
		if (typeof o == "string" && o.includes("@")) {
			let n = o.lastIndexOf("@"), a = +o.slice(n + 1);
			(i.samples !== void 0 || o.slice(n + 1).trim() === "" || !Number.isFinite(a) || a <= 0) && X(t, r, `${Y(o)} as the samples (a single @ and a number greater than 0)`), i.samples = a, e = o.slice(0, n);
		}
		e !== "" && (a.length >= n && X(t, r, `${Y(o)} after the ${n === 1 ? "domain" : "domain and the image"}`), typeof e == "string" ? a.push(Lu(e, t, r)) : Ya(e) ? a.push({
			min: e.min,
			max: e.max
		}) : X(t, r, Y(o)));
	}
	return a.length > 0 && (i.domain = a[0]), a.length > 1 && (i.image = a[1]), i;
}
// src/figures/FillBetween/FillBetween.parser.ts
var Bu = "fillbetween", Vu = "a plot, then another plot (or nothing for the x axis), then a domain (min:max, like 0:2pi)";
function Hu(e, t) {
	if (e.key !== q.FILL_BETWEEN.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an area between plots`);
	let [n, ...i] = Gl(e.values, t);
	if (!(n instanceof _l)) return X(e, Vu, e.values.length === 0 ? "no value" : `${Y(e.values[0])}, which is not a plot`);
	let a = i.at(0), o = a !== void 0 && !(typeof a == "string" || Ya(a));
	if (o && !(a instanceof _l)) return X(e, Vu, `${Y(a)}, which is not a plot`);
	let s = e.values.slice(o ? 2 : 1);
	if (s.length > 1) return X(e, Vu, e.values.map(Y).join(", "));
	let c = zu(s, e, 1, Vu);
	return c.samples === void 0 ? {
		create: Bu,
		config: {
			plot: n,
			...o ? { other: a } : {},
			...c.domain === void 0 ? {} : { domain: c.domain }
		}
	} : X(e, Vu, Y(s[0]));
}
var Uu = { [q.FILL_BETWEEN]: {
	name: "fillbetween",
	description: "Fill the area between two plots, or between a plot and the x axis",
	forms: ["z=fill <plot>[,<plot>][,<domain>]"],
	summary: "z=fill f,g — area between curves",
	build: Hu
} }, Wu = "follow", Gu = "a line, a circle or a curve to follow, then a point where to start, and a last * to draw the tangent";
function Ku(e, t) {
	if (e.key !== q.FOLLOW.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a point that follows a figure`);
	let n = Gl(e.values, t), i = Wl(n.at(-1)), a = i ? n.slice(0, -1) : n, o = a.at(0), s = a.at(1);
	return o instanceof nc ? o.followable ? s !== void 0 && !(s instanceof K) || a.length > 2 ? X(e, Gu, n.map(Y).join(", ")) : {
		create: Wu,
		config: {
			follow: o,
			...s === void 0 ? {} : { at: s },
			...i ? { tangent: i } : {}
		}
	} : X(e, Gu, `${Y(o)}, which cannot be followed`) : X(e, Gu, n.length === 0 ? "no value" : Y(n[0]));
}
var qu = { [q.FOLLOW]: {
	name: "follow",
	description: "Create a point that follows the mouse along a line, a circle or a curve (a last * draws the tangent too)",
	forms: ["t=follow <figure>[,<point>][,*]"],
	summary: "F=follow f — point on a curve",
	build: Ku
} };
// src/parser/parser.interval.ts
function Ju(e, t) {
	try {
		let t = new wo(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof r || e instanceof a)) throw e;
	}
	throw new r(`Cannot read the parameter "${t}": ${JSON.stringify(e)} is not a number, or an expression of numbers like 2pi`);
}
function Yu(e) {
	return Ya(e) && !("step" in e) || typeof e == "string" && e.includes(":");
}
function Xu(e, t) {
	let n, i;
	if (Ya(e) && !("step" in e)) ({min: n, max: i} = e);
	else if (typeof e == "number" || typeof e == "string" && !e.includes(":")) i = typeof e == "number" ? e : Ju(e, t), n = -i;
	else if (typeof e == "string") {
		let [a, o, ...s] = e.split(":");
		if (s.length > 0 || a.trim() === "" || o.trim() === "") throw new r(`Cannot read the parameter "${t}=${e}": expected min:max, or one number for -n:n`);
		n = Ju(a, t), i = Ju(o, t);
	} else throw new r(`Cannot read the parameter "${t}=${Y(e)}": expected min:max, or one number for -n:n`);
	if (!(Number.isFinite(n) && Number.isFinite(i) && n < i)) throw new r(`Invalid interval ${Y(e)} for the parameter "${t}": expected a minimum lower than the maximum`);
	return {
		min: n,
		max: i
	};
}
// src/figures/Grid/Grid.parser.ts
function Zu(e, t, n) {
	if (!Q(e) && !Q(t) && !Q(n)) return null;
	let r = Q(e) ? su(e, "grid") : null, i = Q(t) ? su(t, "gridX") : null, a = Q(n) ? su(n, "gridY") : null, o = {
		x: i?.step ?? r?.step ?? 1,
		y: a?.step ?? (r === null || r.pi ? 1 : r.step)
	};
	return o.x === 1 && o.y === 1 ? {} : { step: o };
}
var Qu = "an x interval and a y interval (0:5,0:3, a bound can be 2pi) for a part of the drawing, then a step: a number (0.5), a number of pi (pi/3) or a step for each axis (0.5;1)";
function $u(e) {
	if (e.key !== q.GRID.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a grid`);
	let t = e.values.length === 1 && e.values[0] === !0 ? [] : e.values, [n, i, ...a] = t, o = Yu(n);
	if (o && !Yu(i)) return X(e, Qu, `${Y(n)} alone`);
	let s = o ? a : t, c = {};
	if (s.length > 1) return X(e, Qu, t.map(Y).join(", "));
	if (o) try {
		c.x = Xu(n, "x"), c.y = Xu(i, "y");
	} catch (t) {
		throw t instanceof r ? new r(`Cannot build "${e.name}" (${e.key}): ${t.message}`, { cause: t }) : t;
	}
	if (s.length === 1) {
		let [t] = s, n = Ja(t) && !Yu(t) ? ed(t) : cu(t);
		if (n === null) return X(e, Qu, Y(t));
		c.step = "x" in n ? n : {
			x: n.step,
			y: n.pi ? 1 : n.step
		};
	}
	return {
		create: "grid",
		config: c
	};
}
function ed(e) {
	return Number.isFinite(e.x) && Number.isFinite(e.y) && e.x > 0 && e.y > 0 ? {
		x: e.x,
		y: e.y
	} : null;
}
function td(e, t, n) {
	if (!(e instanceof Ol)) throw new i(t, `The option "${t}" cuts the steps of a grid, and "${e.name}" is not one`);
	let r = n === !0 ? 2 : n;
	try {
		e.config = {
			...e.config,
			subdivisions: r
		};
	} catch (r) {
		throw r instanceof a ? new i(t, `Invalid value ${Y(n)} for the option "${t}" of "${e.name}": expected an integer from 2 to 20`, { cause: r }) : r;
	}
}
var nd = { subgrid: (e, { value: t }) => {
	td(e, "subgrid", t);
} }, rd = { [q.GRID]: {
	name: "grid",
	description: "Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph",
	forms: ["g=grid [<x interval>,<y interval>][,<step>]"],
	summary: "g=grid — grid",
	build: $u
} }, id = "line", ad = (e) => (t, n) => {
	Z(n, t, 2, 2, "two points");
	let [r, i] = t;
	return J(r) && J(i) ? {
		through: {
			A: r,
			B: i
		},
		shape: e
	} : X(n, "two points", `${Y(r)} and ${Y(i)}`);
};
function od(e, t) {
	try {
		return to(e);
	} catch (n) {
		if (n instanceof r) return X(t, "a slope, a number or a fraction", Y(e));
		throw n;
	}
}
var sd = (e) => (t, n) => {
	let r = "a line or an axis, and a point";
	Z(n, t, 2, 2, r);
	let [i, a] = t;
	return Ul(i) && J(a) ? e === "perpendicular" ? { perpendicular: {
		to: i,
		through: a
	} } : { parallel: {
		to: i,
		through: a
	} } : X(n, r, `${Y(i)} and ${Y(a)}`);
}, cd = {
	[q.LINE]: (e, t) => {
		let n = "an equation, two points, or a point and a slope";
		if (Z(t, e, 1, 2, n), e.length === 1) {
			let [r] = e;
			return typeof r == "string" ? { equation: r } : X(t, n, Y(r));
		}
		let [r, i] = e;
		return J(r) && J(i) ? {
			through: {
				A: r,
				B: i
			},
			shape: "line"
		} : J(r) && (typeof i == "number" || typeof i == "string") ? {
			slope: {
				A: r,
				slope: od(i, t)
			},
			shape: "line"
		} : X(t, n, `${Y(r)} and ${Y(i)}`);
	},
	[q.SEGMENT]: ad("segment"),
	[q.VECTOR]: ad("vector"),
	[q.RAY]: ad("ray"),
	[q.PERPENDICULAR]: sd("perpendicular"),
	[q.PARALLEL]: sd("parallel"),
	[q.MEDIATOR]: (e, t) => {
		Z(t, e, 2, 2, "two points");
		let [n, r] = e;
		return J(n) && J(r) ? { mediator: {
			A: n,
			B: r
		} } : X(t, "two points", `${Y(n)} and ${Y(r)}`);
	},
	[q.TANGENT]: (e, t) => {
		let n = "a curve and a point";
		Z(t, e, 2, 2, n);
		let [r, i] = e;
		return r instanceof _l && J(i) ? { tangent: {
			f: r,
			A: i
		} } : X(t, n, `${Y(r)} and ${Y(i)}`);
	},
	[q.BISECTOR]: (e, t) => {
		let n = "two lines or axes (with a last * for the other bisector), or three points (the vertex of the angle is the second)";
		Z(t, e, 2, 3, n);
		let [r, i] = e, a = e.at(2);
		return Ul(r) && Ul(i) && (a === void 0 || Wl(a)) ? a === void 0 ? { bisector: {
			d1: r,
			d2: i
		} } : { bisector: {
			d1: r,
			d2: i,
			alternative: !0
		} } : e.length === 3 && J(r) && J(i) && J(a) ? { bisector: {
			A: i,
			B: r,
			C: a
		} } : X(t, n, e.map(Y).join(", "));
	}
};
function ld(e, t) {
	let n = Object.hasOwn(cd, e.key) ? cd[e.key] : void 0;
	if (n === void 0) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a line`);
	return {
		create: id,
		config: n(Gl(e.values, t), e)
	};
}
var ud = Object.values(q), $ = "[A-Z][0-9]*", dd = [
	[RegExp(`^v(${$})(${$})$`), q.VECTOR],
	[RegExp(`^\\[(${$})(${$})\\]$`), q.SEGMENT],
	[RegExp(`^(${$})(${$})\\.$`), q.SEGMENT],
	[RegExp(`^\\[(${$})(${$})\\[$`), q.RAY],
	[RegExp(`^(${$})(${$})\\[$`), q.RAY],
	[RegExp(`^\\[(${$})(${$})$`), q.RAY],
	[RegExp(`^(${$})(${$})$`), q.LINE]
];
function fd(e) {
	let t = e.indexOf("=");
	if (t <= 0 || e.includes(" ")) return null;
	let n = e.slice(0, t), i = e.slice(t + 1);
	if (ud.includes(i)) return null;
	for (let [e, t] of dd) {
		let r = e.exec(i);
		if (r !== null) return `${n}=${t} ${r[1]},${r[2]}`;
	}
	throw new r(`Cannot read "${e}" as a line: expected two points, like AB, AB., [AB], AB[, [AB[, [AB or vAB, after the "="`);
}
var pd = {
	[q.LINE]: {
		name: "line",
		description: "Create a line through two points, through a point with a slope, or from its equation",
		forms: [
			"d=AB",
			"d=line <point>,<point>",
			"d=line <point>,<slope>",
			"d=line <equation>"
		],
		summary: "d=line A,B — line (or d=AB)",
		build: ld
	},
	[q.VECTOR]: {
		name: "vector",
		description: "Create a vector: a segment with an arrow at its end",
		forms: ["v=vAB", "v=vec <point>,<point>"],
		summary: "v=vec A,B — vector (or v=vAB)",
		build: ld
	},
	[q.SEGMENT]: {
		name: "segment",
		description: "Create a segment through two points",
		forms: [
			"s=AB.",
			"s=[AB]",
			"s=seg <point>,<point>"
		],
		summary: "s=seg A,B — segment (or s=AB.)",
		build: ld
	},
	[q.RAY]: {
		name: "ray (half line)",
		description: "Create a ray: it starts at the first point and goes through the second",
		forms: [
			"r=AB[",
			"r=[AB[",
			"r=[AB",
			"r=ray <point>,<point>"
		],
		summary: "r=ray A,B — ray (or r=AB[)",
		build: ld
	},
	[q.PERPENDICULAR]: {
		name: "perpendicular",
		description: "Create the perpendicular of a line from a point",
		forms: ["d=perp <line>,<point>"],
		summary: "p=perp d,A — perpendicular",
		build: ld
	},
	[q.PARALLEL]: {
		name: "parallel",
		description: "Create a parallel line from a point",
		forms: ["d=para <line>,<point>"],
		summary: "p=para d,A — parallel",
		build: ld
	},
	[q.MEDIATOR]: {
		name: "mediator",
		description: "Create the mediator of two points",
		forms: ["d=med <point>,<point>"],
		summary: "m=med A,B — perpendicular bisector",
		build: ld
	},
	[q.TANGENT]: {
		name: "tangent",
		description: "Create a tangent line from a <circle|plot> by a Point",
		forms: ["d=tan <circle|plot>,<point>"],
		summary: "t=tan f,A — tangent",
		build: ld
	},
	[q.BISECTOR]: {
		name: "bisector",
		description: "Create the bisector of an angle (three points), or of two lines or axes (a last * for the other bisector)",
		forms: ["d=bis <point>,<point>,<point>", "d=bis <line>,<line>[,*]"],
		summary: "b=bis d1,d2 — angle bisector",
		build: ld
	}
}, md = "parametric", hd = "two functions of t (x then y), then a domain (min:max, like 0:2pi) and a number of samples per unit (@50)";
function gd(e, t) {
	if (e.key !== q.PARAMETRIC.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a parametric curve`);
	let n = Ru(e.values.at(0)), i = Ru(e.values.at(1));
	if (n === null || i === null || n.text.trim() === "" || i.text.trim() === "") return X(e, hd, e.values.length === 0 ? "no value" : e.values.map(Y).join(", "));
	let { domain: a, samples: o } = zu([
		...n.samples,
		...i.samples,
		...e.values.slice(2)
	], e, 1, hd);
	return {
		create: md,
		config: {
			expressions: {
				x: n.text,
				y: i.text
			},
			...a === void 0 ? {} : { domain: a },
			...o === void 0 ? {} : { samples: o }
		}
	};
}
var _d = /^([a-z][0-9]*)\(t\)/;
function vd(e) {
	let t = _d.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new r(`Cannot read the curve "${e}": expected ${t[1]}(t)=<function of x>,<function of y>`);
	return `${t[1]}=${q.PARAMETRIC} ${n.slice(1)}`;
}
var yd = { [q.PARAMETRIC]: {
	name: "parametric",
	description: "Plot a parametric function",
	forms: ["f(t)=<function_x>,<function_y>[,<domain>][@<number>]", "f=parametric <function_x>,<function_y>[,<domain>][,@<number>]"],
	summary: "f=parametric x(t),y(t) — parametric curve",
	build: gd
} }, bd = "the data of an SVG path in units of the coordinate system, like M 0,0 L 2,1 Q 3,3 4,0 Z";
function xd(e) {
	if (e.key !== q.PATH.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a path`);
	if (e.values.length === 0 || e.values.some((e) => typeof e != "string" && typeof e != "number")) return X(e, bd, e.values.length === 0 ? "no value" : e.values.map(Y).join(", "));
	let t = e.values.map(String).join(",");
	try {
		As(t);
	} catch (t) {
		throw t instanceof r ? new r(`Cannot build "${e.name}" (${e.key}): ${t.message}`, { cause: t }) : t;
	}
	return {
		create: "path",
		config: {
			d: t,
			units: !0
		}
	};
}
var Sd = { [q.PATH]: {
	name: "path",
	description: "Draw an SVG path, written in units of the coordinate system",
	forms: ["p=path M 0,0 L 2,1 Q 3,3 4,0 Z"],
	summary: "p=path d — SVG path",
	build: xd
} }, Cd = "plot", wd = "an expression or three points (the parabola through them), then a number of samples per unit (@50), a domain (min:max, like -2pi:2pi) and an image (min:max)";
function Td(e, t) {
	if (e.key !== q.PLOT.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a plot`);
	let [n, i, a] = Gl(e.values.slice(0, 3), t);
	if (J(n) && J(i) && J(a)) return {
		create: Cd,
		config: {
			quadratic: {
				A: n,
				B: i,
				C: a
			},
			...zu(e.values.slice(3), e, 2, wd)
		}
	};
	let o = Ru(e.values.at(0));
	return o === null || o.text.trim() === "" ? X(e, wd, e.values.length === 0 ? "no value" : Y(e.values[0])) : {
		create: Cd,
		config: {
			expression: o.text,
			...zu([...o.samples, ...e.values.slice(1)], e, 2, wd)
		}
	};
}
var Ed = /^([a-z][0-9]*)\(x\)/;
function Dd(e) {
	let t = Ed.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new r(`Cannot read the plot "${e}": expected ${t[1]}(x)=<function>`);
	return `${t[1]}=${q.PLOT} ${n.slice(1)}`;
}
var Od = { [q.PLOT]: {
	name: "plot",
	description: "Plot a function, or the parabola through three points (a line if they are aligned)",
	forms: [
		"f(x)=<function>[@<number>,<domain>,<image>]",
		"f=plot <function>[@<number>,<domain>,<image>]",
		"f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]"
	],
	summary: "f=plot expr — function (or f(x)=expr)",
	build: Td
} }, kd = "point";
function Ad(e, t, n) {
	let r = (e) => Object.hasOwn(n, e) ? n[e] : void 0;
	if (typeof e == "number") return e;
	if (typeof e == "string" && e.includes(".")) {
		let [t, n] = e.split("."), i = r(t);
		if (i instanceof K && (n === "x" || n === "y")) return {
			point: i,
			axis: n
		};
	}
	let i = Kl(e, n);
	return i === null ? X(t, "a number, <point>.x, <point>.y or <point>:<point>", Y(e)) : {
		point1: i[0],
		point2: i[1]
	};
}
var jd = {
	[q.POINT]: (e, t, n) => (Z(t, e, 2, 2, "two coordinates (x,y)"), { coordinates: {
		x: Ad(e[0], t, n),
		y: Ad(e[1], t, n)
	} }),
	[q.MIDDLE]: (e, t) => {
		Z(t, e, 2, 2, "two points");
		let [n, r] = e;
		return J(n) && J(r) ? { middle: {
			A: n,
			B: r
		} } : X(t, "two points", `${Y(n)} and ${Y(r)}`);
	},
	[q.PROJECTION]: (e, t) => {
		Z(t, e, 2, 2, "a point and a line or an axis");
		let [n, r] = e;
		return J(n) && Ul(r) ? { projection: {
			point: n,
			axis: r
		} } : X(t, "a point and a line or an axis", `${Y(n)} and ${Y(r)}`);
	},
	[q.SYMMETRY]: (e, t) => {
		Z(t, e, 2, 2, "a point and a point, a line or an axis");
		let [n, r] = e;
		return J(n) && (J(r) || Ul(r)) ? { symmetry: {
			A: n,
			B: r
		} } : X(t, "a point and a point, a line or an axis", `${Y(n)} and ${Y(r)}`);
	},
	[q.DIRECTION_POINT]: (e, t) => {
		let n = "a point, a line or an axis, a distance and, to be perpendicular, a last *";
		Z(t, e, 3, 4, n);
		let [r, i, a, o] = e;
		return J(r) && Ul(i) && typeof a == "number" && (o === void 0 || Wl(o)) ? { direction: {
			point: r,
			direction: i,
			distance: a,
			perpendicular: o !== void 0
		} } : X(t, n, `${Y(r)}, ${Y(i)} and ${Y(a)}`);
	},
	[q.VECTOR_POINT]: (e, t) => {
		let n = "two points, then optionally a scale (a number) and a starting point";
		Z(t, e, 2, 4, n);
		let [r, i, a, o] = e;
		return J(r) && J(i) && (a === void 0 || typeof a == "number") && (o === void 0 || J(o)) ? { direction: {
			point: o ?? r,
			direction: {
				A: r,
				B: i
			},
			distance: a ?? 1
		} } : X(t, n, e.map(Y).join(", "));
	},
	[q.EVAL_FX]: (e, t, n) => {
		Z(t, e, 2, 2, "a curve and an abscissa");
		let [r] = e;
		return r instanceof _l ? { evaluation: {
			fx: r,
			x: Ad(e[1], t, n)
		} } : X(t, "a curve and an abscissa", `${Y(r)} as a curve`);
	}
};
function Md(e, t) {
	let n = Object.hasOwn(jd, e.key) ? jd[e.key] : void 0;
	if (n === void 0) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a point`);
	return {
		create: kd,
		config: n(Gl(e.values, t), e, t)
	};
}
function Nd(e, t) {
	let n = "two figures: two lines or axes, a circle and a line, or two circles";
	if (e.key !== q.INTERSECTION.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key is not an intersection`);
	let i = Gl(e.values, t);
	Z(e, i, 2, 2, n);
	let [a, o] = i;
	if (Ul(a) && Ul(o)) return [{
		create: kd,
		config: { intersection: {
			A: a,
			B: o
		} }
	}];
	if (a instanceof xl && o instanceof xl) return [0, 1].map((e) => ({
		create: kd,
		config: { intersectionBetweenCircles: {
			A: a,
			B: o,
			index: e
		} }
	}));
	let s = a instanceof xl ? a : o, c = a instanceof xl ? o : a;
	return s instanceof xl && c instanceof Oc ? [0, 1].map((e) => ({
		create: kd,
		config: { intersectionWithCircle: {
			A: s,
			B: c,
			index: e
		} }
	})) : X(e, n, `${Y(a)} and ${Y(o)}`);
}
var Pd = {
	o: (e, t) => e.asCircle(t),
	s: (e, t) => e.asSquare(t),
	"*": (e, t) => e.asCrosshair(t)
};
function Fd(e, t, n) {
	if (!(e instanceof K)) throw new i(t, `The option "${t}" sets the shape of a point, and "${e.name}" is not a point`);
	if (n !== !0 && typeof n != "number") throw new i(t, `Invalid value ${Y(n)} for the option "${t}" of "${e.name}": expected a size, a number greater than 0`);
	try {
		Pd[t](e, n === !0 ? void 0 : n);
	} catch (n) {
		throw n instanceof a ? new i(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
function Id(e) {
	let t = /^([A-Z][0-9]*)\((.*)\)$/.exec(e);
	return t === null ? null : `${t[1]}=pt ${t[2].split(",").map((e) => e.trim()).join(",")}`;
}
var Ld = (e) => (t, { value: n }) => {
	Fd(t, e, n);
}, Rd = {
	o: Ld("o"),
	s: Ld("s"),
	"*": Ld("*")
}, zd = {
	[q.POINT]: {
		name: "point",
		description: "Create a point",
		forms: ["A(3,4)"],
		summary: "A=pt x,y — point",
		build: Md
	},
	[q.VECTOR_POINT]: {
		name: "point from two points",
		description: "Create a point from a vector defined by two points and a starting point",
		forms: ["A=vpt <point>,<point>,<scale?>,<starting point?>"],
		summary: "P=vpt A,B,scale — point from a vector",
		build: Md
	},
	[q.DIRECTION_POINT]: {
		name: "point from direction line",
		description: "Create a point from a line and a starting point",
		forms: ["A=dpt <point>,<line>,<distance>,<perpendicular?>"],
		summary: "P=dpt A,d,3 — point along a line",
		build: Md
	},
	[q.MIDDLE]: {
		name: "mid",
		description: "Create the middle of two points",
		forms: ["A=mid <point>,<point>"],
		summary: "M=mid A,B — middle",
		build: Md
	},
	[q.PROJECTION]: {
		name: "projection",
		description: "Create the projection of a point on a line",
		forms: ["A=proj <point>,<line>"],
		summary: "H=proj A,d — projection",
		build: Md
	},
	[q.INTERSECTION]: {
		name: "intersection",
		description: "Create the intersection of two lines",
		forms: ["A=inter <line|circle>,<line|circle>"],
		summary: "P=inter d1,d2 — intersection",
		build: Nd
	},
	[q.SYMMETRY]: {
		name: "symmetry",
		description: "Create the symmetry of a point",
		forms: ["A=sym <point>,<point|line>"],
		summary: "S=sym A,B — symmetry",
		build: Md
	},
	[q.EVAL_FX]: {
		name: "point on a function",
		description: "Create the point of a function at a value",
		forms: ["A=eval f,3"],
		summary: "P=eval f,x — point of a function",
		build: Md
	}
}, Bd = "polygon", Vd = "three points or more, a center with a radius (a number or A:B) and a number of sides, or two points and a number of sides; the number of sides can be followed by the step of a star (5,2)";
function Hd(e, t, n) {
	return typeof e == "number" && Number.isInteger(e) ? e : X(t, Vd, `${Y(e)} as the ${n} (an integer)`);
}
function Ud(e, t) {
	let n = ql(e, t);
	return typeof n == "number" || n !== null && "point1" in n ? n : null;
}
function Wd(e, t) {
	if (e.key !== q.POLYGON.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a polygon`);
	let n = Gl(e.values, t), i = () => X(e, Vd, n.length === 0 ? "no value" : n.map(Y).join(", "));
	if (n.every(J)) return n.length >= 3 ? {
		create: Bd,
		config: { vertices: n }
	} : i();
	let [a, o, s, c, ...l] = n;
	if (!J(a) || s === void 0 || l.length > 0) return i();
	let u = c === void 0 ? {} : { star: Hd(c, e, "step of the star") };
	if (J(o)) return {
		create: Bd,
		config: { onSide: {
			A: a,
			B: o,
			sides: Hd(s, e, "number of sides"),
			...u
		} }
	};
	let d = Ud(o, t);
	return d === null ? i() : {
		create: Bd,
		config: { regular: {
			center: a,
			radius: d,
			sides: Hd(s, e, "number of sides"),
			...u
		} }
	};
}
var Gd = { [q.POLYGON]: {
	name: "polygon",
	description: "Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side",
	forms: [
		"p=poly <point>,<point>,<point>,...",
		"p=poly <point>,<radius>,<sides>[,<step>]",
		"p=poly <point>,<point>,<sides>[,<step>]"
	],
	summary: "p=poly A,B,C — polygon",
	build: Wd
} }, Kd = "riemann", qd = "a plot, then a domain (min:max, like 0:2pi), a number of rectangles and a position from 0 (left) to 1 (right)";
function Jd(e, t) {
	if (e.key !== q.RIEMANN.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a Riemann sum`);
	let [n, ...i] = Gl(e.values, t);
	if (!(n instanceof _l)) return X(e, qd, e.values.length === 0 ? "no value" : `${Y(e.values[0])}, which is not a plot`);
	let a = i.length > 0 && (typeof i[0] == "string" || Ya(i[0])), o = a ? i.slice(1) : i, s = { plot: n };
	if (a) {
		let t = zu([e.values[1]], e, 1, qd);
		if (t.samples !== void 0 || t.domain === void 0) return X(e, qd, Y(e.values[1]));
		s.domain = t.domain;
	}
	let c = o.at(0), l = o.at(1);
	return o.length > 2 || o.some((e) => typeof e != "number") ? X(e, qd, e.values.map(Y).join(", ")) : (c !== void 0 && (s.rectangles = c), l !== void 0 && (s.position = l), {
		create: Kd,
		config: s
	});
}
var Yd = { [q.RIEMANN]: {
	name: "riemann",
	description: "Create the Riemann sum of a plot: rectangles from the x axis to its graph",
	forms: ["r=riemann <plot>[,<domain>][,<rectangles>][,<position>]"],
	summary: "r=riemann f — Riemann sum",
	build: Jd
} };
// src/parser/parser.config.ts
function Xd(...e) {
	let t = Object.create(null);
	for (let n of e) for (let [e, r] of Object.entries(n)) {
		if (e in t) throw Error(`The key "${e}" is defined twice`);
		t[e] = r;
	}
	return t;
}
var Zd = Xd(zd, pd, Fu, nu, Od, yd, Au, Gd, qu, Uu, Sd, rd, yu, Yd), Qd = [
	"x",
	"y",
	"box",
	"unitX",
	"unitY",
	"axis",
	"axisX",
	"axisY",
	"axisXname",
	"axisYname",
	"grid",
	"gridX",
	"gridY",
	"default.label",
	"default.tex",
	"default.points"
], $d = {
	ppu: "unitX and unitY, the length of a unit in cm (unitX=1.5)",
	subgrid: "the option subgrid of grid (grid->subgrid=4)",
	label: "default.label",
	tex: "default.tex",
	points: "default.points",
	"no-points": "default.points=no"
}, ef = [
	"axis",
	"axisX",
	"axisY",
	"axisXname",
	"axisYname",
	"grid",
	"gridX",
	"gridY"
], tf = 8;
function nf(e) {
	let t = [], n = null;
	for (let r of e.split(",").map((e) => e.trim())) n === null ? r !== "" && (r.includes("->") ? n = r : t.push(r)) : r === "" ? (t.push(n), n = null) : n += `,${r}`;
	return n !== null && t.push(n), t;
}
function rf({ value: e, options: t }, n) {
	if (t.length > 0) throw new r(`Cannot read the parameter "${n}=${Y(e)}/${t.map(Y).join("/")}": expected min:max, or one number for -n:n`);
	return Xu(e, n);
}
function af(e) {
	let { value: t } = e;
	if (typeof t == "object" && !Ya(t) && "x" in t && "y" in t) return {
		x: Xu(t.x, "box"),
		y: Xu(t.y, "box")
	};
	let n = rf(e, "box");
	return {
		x: n,
		y: { ...n }
	};
}
function of(e, t) {
	if (!Q(e)) return null;
	let { value: n, options: i } = e;
	if (typeof n != "number" || i.length > 0 || !(Number.isFinite(n) && n > 0)) throw new r(`Cannot read the parameter "${t}=${Y(n)}": expected a length in cm greater than 0 (${t}=1.5)`);
	return n;
}
function sf(e, t) {
	if (!Q(e)) return !1;
	if (e.value !== !0 || e.options.length > 0) throw new r(`Cannot read the parameter "${t}=${Y(e.value)}": expected the word ${t} alone`);
	return !0;
}
function cf(e) {
	if (!Q(e)) return { shape: "o" };
	if (e.value === "no" && e.options.length === 0) return !1;
	try {
		return df(e);
	} catch (e) {
		throw e instanceof i ? new r(`Cannot read the parameter "default.points": ${e.message} (or "no" to hide the points)`, { cause: e }) : e;
	}
}
function lf(e, t) {
	let n = e.indexOf("->"), i = (n < 0 ? e : e.slice(0, n)).trim(), a = i.split("=")[0].trim();
	if (Object.hasOwn($d, a)) throw new r(`The parameter "${a}" does not exist any more: use ${$d[a]}`);
	if (!Qd.includes(a)) throw new r(`Unknown parameter "${a}": expected ${Qd.join(", ")}`);
	let o = t.parameters(i, Qd)[a];
	if (o === void 0) throw new r(`Cannot read the parameter "${i}"`);
	let s = n < 0 ? "" : e.slice(n + 2).trim();
	return {
		key: a,
		parameter: o,
		options: s === "" ? {} : t.parse(`layout=grid ->${s}`).parameters
	};
}
function uf(e, t) {
	let n = {}, i = {
		x: {},
		y: {},
		grid: {}
	}, a = {
		x: {},
		y: {}
	};
	for (let o of nf(e)) {
		let { key: e, parameter: s, options: c } = lf(o, t);
		if (Object.hasOwn(n, e)) throw new r(`The parameter "${e}" is written twice`);
		if (n[e] = s, Object.keys(c).length > 0 && !ef.includes(e)) throw new r(`The parameter "${e}" has no options, got ${Object.keys(c).join(", ")} after "->"`);
		let l = e === "axis" || e === "axisX" || e === "axisXname", u = e === "axis" || e === "axisY" || e === "axisYname";
		if (l || u) {
			let { extra: e, style: t } = du(c);
			l && (Object.assign(i.x, t), Object.assign(a.x, e)), u && (Object.assign(i.y, t), Object.assign(a.y, e));
		}
		(e === "grid" || e === "gridX" || e === "gridY") && Object.assign(i.grid, c);
	}
	let o = Q(n.box) ? af(n.box) : null, s = {
		x: Q(n.x) ? rf(n.x, "x") : o?.x ?? {
			min: -8,
			max: tf
		},
		y: Q(n.y) ? rf(n.y, "y") : o?.y ?? {
			min: -8,
			max: tf
		}
	}, c = of(n.unitX, "unitX"), l = of(n.unitY, "unitY"), u = Zu(n.grid, n.gridX, n.gridY);
	return {
		window: s,
		unit: {
			x: c ?? 1,
			y: l ?? c ?? 1
		},
		display: {
			axis: pu(n, a),
			grid: u ?? !1
		},
		defaults: {
			label: sf(n["default.label"], "default.label"),
			tex: sf(n["default.tex"], "default.tex"),
			points: cf(n["default.points"])
		},
		options: i
	};
}
function df({ value: e, options: t }) {
	let n = e === !0 ? "o" : e;
	if (n !== "o" && n !== "s" && n !== "*") throw new i("points", `Invalid shape ${Y(e)} for the option "points": expected 'o', 's' or '*'`);
	let r = t.at(0);
	if (r === void 0) return { shape: n };
	if (typeof r != "number" || !Number.isFinite(r) || r <= 0) throw new i("points", `Invalid size ${Y(r)} for the option "points": expected a number greater than 0`);
	return {
		shape: n,
		size: r
	};
}
// src/animate/Animate.syntax.ts
var ff = [
	"from",
	"to",
	"duration",
	"delay",
	"easing",
	"loop"
];
function pf(e, t, n) {
	let r = typeof e == "string" && Object.hasOwn(n, e) ? n[e] : void 0;
	if (!(r instanceof K)) throw new a(`The option ${t}=${String(e)} of an animation must be the name of a point of the drawing`);
	return r;
}
var mf = Object.fromEntries(Object.values(e).map((e) => [e, e]));
function hf(t, n) {
	if (t === !0 || t === "1" || t === 1) return e.RESET;
	if (typeof t == "string" && Object.hasOwn(mf, t)) return mf[t];
	throw Jl("loop", n, t, `loop alone, or one of ${Object.keys(mf).join(", ")}`);
}
function gf(e, n) {
	if (typeof e == "string" && Object.hasOwn(t, e)) return e;
	throw Jl("easing", n, e, Object.keys(t).join(", "));
}
var _f = {
	options: {
		animate: (t, n, { graph: r, options: i }) => {
			let a = {
				from: null,
				to: null,
				duration: 2,
				delay: 0,
				easing: "linear",
				loop: e.NONE
			};
			Object.hasOwn(i, "from") && (a.from = pf(i.from.value, "from", r.figures)), Object.hasOwn(i, "to") && (a.to = pf(i.to.value, "to", r.figures)), Object.hasOwn(i, "duration") && (a.duration = i.duration.value), Object.hasOwn(i, "delay") && (a.delay = i.delay.value), Object.hasOwn(i, "easing") && (a.easing = gf(i.easing.value, t)), Object.hasOwn(i, "loop") && (a.loop = hf(i.loop.value, t)), Zc(t, a);
		},
		...Object.fromEntries(ff.map((e) => [e, (t, n, { options: r }) => {
			if (!Object.hasOwn(r, "animate")) throw new i(e, `The option "${e}" is part of an animation: "${t.name}" needs "animate"`);
		}]))
	},
	optionDetails: {
		animate: "animation of a point",
		from: "from=A — start of the animation",
		to: "to=B — end of the animation",
		duration: "duration=3 — seconds",
		delay: "delay=1 — seconds",
		easing: "easing=linear|inOut",
		loop: "loop=reset|reverse|none"
	},
	optionValues: {
		easing: ["linear", "inOut"],
		loop: [
			"reset",
			"reverse",
			"none"
		]
	}
};
// src/slides/Slides.syntax.ts
function vf(e) {
	return typeof e != "object" || !e || !("items" in e) || !Array.isArray(e.items) ? null : e.items.map(({ from: e, to: t }) => t === void 0 ? { from: e } : {
		from: e,
		to: t
	});
}
function yf(e, t) {
	let n = e.parameters(`slides=${t}`, { types: { slides: "set" } }), i = vf(Object.hasOwn(n, "slides") ? n.slides.value : void 0);
	if (Object.keys(n).length !== 1 || n.slides.options.length > 0 || i === null) throw new r(`Expected steps between chevrons and nothing else, like <2-4,6>, got "${t}"`);
	return i;
}
var bf = (e, { value: t, options: n }) => {
	let r = vf(t);
	if (r === null || n.length > 0) throw Jl("slide", e, r === null ? t : [t.raw, ...n.map(String)].join("/"), "steps between chevrons and nothing after them, like <2-4,6>");
	il(e, r);
};
function xf(e, t) {
	let n = e.trim();
	if (n === "") throw new r(`Cannot read the command "${t}": the title is empty`);
	return n;
}
function Sf(e, t, n, i) {
	if (Object.hasOwn(e, t)) throw new r(`Cannot read the command "${i}": the step ${t} has the title "${e[t]}" already`);
	return {
		...e,
		[t]: n
	};
}
// src/controls/controls.ts
var Cf = {
	animate: _f,
	slide: {
		options: { slide: bf },
		optionTypes: { slide: "set" },
		optionDetails: { slide: "slide=<2-4,6> — steps at which it is shown" },
		commands: {
			names: [
				"pause",
				"slides",
				"title"
			],
			pattern: /^@(?:pause(?:\s*=\s*\S.*)?|slides(?:\s*=\s*<[0-9,\s-]*>)?|title\s*,\s*\d+\s*=\s*\S.*)\s*$/,
			initial: {
				pauses: 0,
				slide: null,
				titles: {}
			},
			fold(e, { name: t, value: n, text: i }, a) {
				if (t === "pause") {
					let t = e.pauses + 1, a = {
						...e,
						pauses: t,
						slide: nl([{ from: t + 1 }])
					};
					if (n === "") return a;
					if (!n.startsWith("=")) throw new r(`Cannot read the command "${i}": @pause takes a title only after a =, like @pause=Introduction`);
					return {
						...a,
						titles: Sf(e.titles, t + 1, xf(n.slice(1), i), i)
					};
				}
				if (t === "title") {
					let t = /^\s*,\s*(\d+)\s*=(.*)$/.exec(n);
					if (t === null) throw new r(`Cannot read the command "${i}": expected the step and the title, like @title,3=Conclusion`);
					let a = Number(t[1]);
					if (a < 1) throw new r(`Cannot read the command "${i}": the step ${a} is not an integer from 1`);
					return {
						...e,
						titles: Sf(e.titles, a, xf(t[2], i), i)
					};
				}
				if (n === "") return {
					...e,
					pauses: 0,
					slide: null
				};
				if (!n.startsWith("=")) throw new r(`Cannot read the command "${i}": the steps of @slides come after a =, like @slides=<2->`);
				let o = yf(a, n.slice(1).trim());
				return $c(o, i), {
					...e,
					slide: nl(o)
				};
			},
			defaults: (e) => e.slide === null ? {} : { slide: e.slide },
			graphControls: (e) => ({ titles: Object.keys(e.titles).length === 0 ? null : Object.freeze({ ...e.titles }) })
		},
		handleControls: ["slide"]
	}
};
function wf() {
	return Object.values(Cf);
}
function Tf() {
	return Object.fromEntries(wf().flatMap((e) => Object.entries(e.optionTypes ?? {})));
}
function Ef() {
	return Object.fromEntries(wf().flatMap((e) => Object.entries(e.optionDetails ?? {})));
}
function Df() {
	return Object.fromEntries(wf().flatMap((e) => Object.entries(e.optionValues ?? {})));
}
// src/figures/Label/Label.parser.ts
var Of = "tmb", kf = "lcr", Af = /@(?:\.(\d+))?/g;
function jf(e) {
	let [t, n] = "br", r = Of.includes(e) && e.length === 1 ? e + n : kf.includes(e) && e.length === 1 ? t + e : e;
	return Ba.find((e) => e === r) ?? null;
}
function Mf(e, t) {
	let n = Object.keys(t.labelFields()).at(0);
	if (n === void 0 || !e.includes("@")) return e;
	let r = [], i = 0;
	for (let t of e.matchAll(Af)) {
		t.index > i && r.push(e.slice(i, t.index));
		let a = t[1];
		r.push({
			field: n,
			digits: a === void 0 ? 2 : +a
		}), i = t.index + t[0].length;
	}
	return i < e.length && r.push(e.slice(i)), r;
}
// src/Draw/Draw.options.ts
var Nf = {
	ultrathin: .5,
	thin: .75,
	thick: 2.5,
	ultrathick: 4
}, Pf = Object.keys(Rd);
function Ff(e, t, { value: n, options: r }) {
	if (typeof n != "string" || r.length > 1) throw Jl(e, t, n, `a color (${e}=red) with an opacity or not (${e}=red/0.5)`);
	let [i] = r;
	if (i === void 0) return { color: n };
	if (typeof i != "number") throw Jl(e, t, i, "an opacity, a number from 0 to 1");
	return {
		color: n,
		opacity: i
	};
}
function If(e, { value: t, options: n }) {
	if (typeof t != "string" && typeof t != "boolean") throw Jl("mark", e, t, "a side ('start', 'end', 'both' or 'none')");
	let r = t === !0 ? "both" : t === !1 ? "none" : t, i = n.find((e) => typeof e == "number"), a = n.find((e) => typeof e == "string");
	return {
		side: r,
		...i === void 0 ? {} : { size: i },
		...a === void 0 ? {} : { shape: a }
	};
}
function Lf(e) {
	return (t, { value: n, options: r }, { graph: i }) => {
		let a = t.name;
		typeof n == "string" && (a = n), e === "tex" && a.length === 2 && !isNaN(+a[1]) && (a = a[0] + "_" + a[1]);
		let o = r[0], s = typeof o == "boolean" || o === void 0 ? void 0 : typeof o == "string" ? jf(o) : null, c = r[1], l = r[2];
		if (s === null) throw Jl(e, t, o, `a position (${Ba.join(", ")}), or one letter (t, m, b, l, c, r) that replaces the same part of br`);
		if (c !== void 0 && typeof c != "boolean" && !(typeof c == "object" && "x" in c && "y" in c)) throw Jl(e, t, c, "a shift in units (0.5;0)");
		if (l !== void 0 && l !== !0 && typeof l != "number") throw Jl(e, t, l, "an angle in degrees, or nothing to turn the label with a line");
		if (t.addLabel(Mf(a, t), {
			asHtml: e === "tex",
			...i.toTex === void 0 ? {} : { texConverter: i.toTex }
		}), t.label) {
			let e = typeof c == "object" ? c : {
				x: 0,
				y: 0
			}, n = {
				x: e.x * i.config.axis.x.x,
				y: -e.y * i.config.axis.y.y
			};
			t.label.autoRotate = l === !0, t.label.position(s, n, typeof l == "number" ? l : 0);
		}
	};
}
function Rf(e, t) {
	let n = {}, r = [];
	for (let i of e) if (i !== !0) {
		if (i === "grid") n.grid = !0;
		else if (i === Qa.X) n.along = "x";
		else if (i === Qa.Y) n.along = "y";
		else if (Ya(i)) {
			let e = i.axis ?? "x", t = n.bounds?.[e];
			n.bounds = {
				...n.bounds,
				[e]: {
					min: Math.max(t?.min ?? -Infinity, i.min),
					max: Math.min(t?.max ?? Infinity, i.max)
				}
			};
		} else if (typeof i == "string" && Object.hasOwn(t, i)) r.push(t[i]);
		else throw new a(`Invalid limit ${Y(i)}: expected grid, ${Qa.X}, ${Qa.Y}, an interval (-2:3) or the name of a figure`);
	}
	return r.length > 0 && (n.follow = r), n;
}
var zf = (e, { value: t, options: n }, { graph: r }) => {
	if (!(e instanceof K)) throw new i("drag", `The option "drag" is for a point, and "${e.name}" is not one`);
	r.handle(e, Rf([t, ...n], r.figures));
};
function Bf(...e) {
	let t = Object.create(null);
	for (let n of e) for (let [e, r] of Object.entries(n)) {
		if (e in t) throw Error(`The option "${e}" is defined twice`);
		t[e] = r;
	}
	return t;
}
var Vf = Bf({
	w: (e, { value: t }) => {
		if (typeof t != "number") throw Jl("w", e, t, "a width, a number");
		e.stroke(t);
	},
	color: (e, t) => {
		e.stroke(Ff("color", e, t));
	},
	fill: (e, t) => {
		e.fill(Ff("fill", e, t));
	},
	dash: (e, { value: t }) => {
		if (t === !0) e.dash();
		else if (typeof t == "string" || typeof t == "number") e.dash(t);
		else throw Jl("dash", e, t, "a pattern, like dash=5 or dash=5 2");
	},
	dot: (e) => {
		e.dot();
	},
	mark: (e, t) => {
		e.mark(If(e, t));
	}
}, Object.fromEntries(Object.entries(Nf).map(([e, t]) => [e, (e) => {
	e.stroke(t);
}])), {
	hide: (e) => {
		e.hide();
	},
	"!": (e) => {
		e.hideShape();
	},
	"?": (e) => {
		e.label?.hide();
	},
	_: (e, { value: t }) => {
		e.static = t;
	},
	static: (e, { value: t }) => {
		e.static = t;
	}
}, {
	move: (e, { value: t }) => {
		e.move(t);
	},
	scale: (e, { value: t }) => {
		e.scale(t);
	}
}, {
	label: Lf("label"),
	tex: Lf("tex"),
	drag: zf
}, ...wf().map((e) => e.options), Rd, tu, ku, vu, nd);
function Hf() {
	return Object.keys(Vf);
}
var Uf;
function Wf() {
	return Uf ??= {
		keys: [...Hf(), ...Hl],
		types: {
			label: "text",
			tex: "text",
			...Tf()
		}
	}, Uf;
}
function Gf(e, t, n) {
	let r = {
		graph: n,
		options: e
	};
	for (let [n, i] of Object.entries(e)) Kf(n, i, t, r);
}
function Kf(e, t, n, r) {
	if (!(e in Vf) && Hl.includes(e)) n.stroke(e);
	else {
		if (!(e in Vf)) throw new i(e, `Unknown option "${e}" for "${n.name}"`);
		try {
			Vf[e](n, t, r);
		} catch (t) {
			throw t instanceof a && !(t instanceof i) ? new i(e, `Invalid option "${e}" of "${n.name}": ${t.message}`, { cause: t }) : t;
		}
	}
}
function qf(e, t, n) {
	if (!(n instanceof K)) return e;
	let r = {}, i = t.points;
	i && !Pf.some((t) => Object.hasOwn(e, t)) && (i.shape !== "o" || i.size !== void 0) && (r[i.shape] = {
		value: i.size ?? !0,
		options: []
	}), Object.assign(r, e);
	let a = () => Object.hasOwn(r, "label") || Object.hasOwn(r, "tex");
	return t.label && !a() && (r.label = {
		value: !0,
		options: []
	}), t.tex && !a() && (r.tex = {
		value: !0,
		options: []
	}), t.points === !1 && (r["!"] = {
		value: !0,
		options: []
	}), r;
}
export { Qo as $, rl as A, i as At, G as B, _l as C, Pa as Ct, il as D, a as Dt, ul as E, ar as Et, Oc as F, e as Ft, Xs as G, ac as H, Sc as I, Ms as J, As as K, Cc as L, Zc as M, n as Mt, K as N, c as Nt, el as O, s as Ot, Rc as P, t as Pt, $o as Q, ic as R, xl as S, Ea as St, dl as T, or as Tt, nc as U, cc as V, Ys as W, ls as X, js as Y, ss as Z, q as _, Ya as _t, Cf as a, ho as at, Ol as b, P as bt, wf as c, ao as ct, Zd as d, B as dt, Xo as et, Id as f, io as ft, Hl as g, Za as gt, fd as h, $a as ht, qf as i, go as it, Xc as j, r as jt, tl as k, o as kt, Qd as l, H as lt, vd as m, Qa as mt, Wf as n, W as nt, Ef as o, U as ot, Dd as p, z as pt, Ns as q, Hf as r, Yo as rt, Df as s, oo as st, Gf as t, Zo as tt, uf as u, V as ut, Vl as v, Ja as vt, ll as w, A as wt, Cl as x, vr as xt, Fl as y, La as yt, sc as z };

//# sourceMappingURL=shared.js.map