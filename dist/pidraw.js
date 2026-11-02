// src/pidraw.common.ts
function e(e) {
	return e?.x !== void 0 && e.y !== void 0;
}
function t(e) {
	return e?.min !== void 0 && e.max !== void 0;
}
var n = /* @__PURE__ */ function(e) {
	return e.BACKGROUND = "background", e.GRIDS = "grids", e.AXIS = "axis", e.MAIN = "main", e.PLOTS_BACKGROUND = "plots_BG", e.PLOTS = "plots", e.PLOTS_FOREGROUND = "plots_FG", e.FOREGROUND = "foreground", e.POINTS = "points", e.INTERACTIVE = "interactive", e;
}({}), r = /* @__PURE__ */ function(e) {
	return e.X = "Ox", e.Y = "Oy", e;
}({}), i = /* @__PURE__ */ function(e) {
	return e.CARTESIAN_2D = "cartesian_2d", e.POLAR = "polar", e;
}({}), a = /* @__PURE__ */ function(e) {
	return e.FREE = "free", e.FIXED = "fixed", e.MIDDLE = "middle", e.PROJECTION = "projection", e.INTERSECTION_LINES = "intersection_lines", e.FOLLOW = "follow", e.DIRECTION = "direction", e.VECTOR = "vector", e.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", e.INTERSECTION_CIRCLES = "intersection_circles", e.SYMMETRY = "symmetry", e.COORDINATES = "coordinates", e;
}({}), o = /* @__PURE__ */ function(e) {
	return e.FIXED = "fixed", e.PARALLEL = "parallel", e.PERPENDICULAR = "perpendicular", e.TANGENT = "tangent", e.MEDIATOR = "mediator", e.SLOPE = "slope", e.BISECTOR = "bisector", e;
}({}), s = Object.create, c = Object.defineProperty, l = Object.getOwnPropertyDescriptor, u = Object.getOwnPropertyNames, d = Object.getPrototypeOf, f = Object.prototype.hasOwnProperty, p = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), m = (e, t) => {
	let n = {};
	for (var r in e) c(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || c(n, Symbol.toStringTag, { value: "Module" }), n;
}, h = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = u(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !f.call(e, s) && s !== n && c(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = l(t, s)) || r.enumerable
	});
	return e;
}, g = (e, t, n) => (n = e == null ? {} : s(d(e)), h(t || !e || !e.__esModule ? c(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), _ = {}, ee = [];
function v(e, t) {
	if (Array.isArray(e)) for (let n of e) v(n, t);
	else if (typeof e == "object") for (let t in e) v(t, e[t]);
	else b(Object.getOwnPropertyNames(t)), _[e] = Object.assign(_[e] || {}, t);
}
function y(e) {
	return _[e] || {};
}
function te() {
	return [...new Set(ee)];
}
function b(e) {
	ee.push(...e);
}
var x = /* @__PURE__ */ p(((e, t) => {
	t.exports = function(e) {
		try {
			return !!e();
		} catch {
			return !0;
		}
	};
})), ne = /* @__PURE__ */ p(((e, t) => {
	t.exports = !x()(function() {
		var e = function() {}.bind();
		return typeof e != "function" || e.hasOwnProperty("prototype");
	});
})), S = /* @__PURE__ */ p(((e, t) => {
	var n = ne(), r = Function.prototype, i = r.call, a = n && r.bind.bind(i, i);
	t.exports = n ? a : function(e) {
		return function() {
			return i.apply(e, arguments);
		};
	};
})), re = /* @__PURE__ */ p(((e, t) => {
	t.exports = S()({}.isPrototypeOf);
})), C = /* @__PURE__ */ p(((e, t) => {
	var n = function(e) {
		return e && e.Math === Math && e;
	};
	t.exports = n(typeof globalThis == "object" && globalThis) || n(typeof window == "object" && window) || n(typeof self == "object" && self) || n(typeof global == "object" && global) || n(typeof e == "object" && e) || (function() {
		return this;
	})() || Function("return this")();
})), ie = /* @__PURE__ */ p(((e, t) => {
	var n = ne(), r = Function.prototype, i = r.apply, a = r.call;
	t.exports = typeof Reflect == "object" && Reflect.apply || (n ? a.bind(i) : function() {
		return a.apply(i, arguments);
	});
})), ae = /* @__PURE__ */ p(((e, t) => {
	var n = S(), r = n({}.toString), i = n("".slice);
	t.exports = function(e) {
		return i(r(e), 8, -1);
	};
})), oe = /* @__PURE__ */ p(((e, t) => {
	var n = ae(), r = S();
	t.exports = function(e) {
		if (n(e) === "Function") return r(e);
	};
})), se = /* @__PURE__ */ p(((e, t) => {
	var n = typeof document == "object" && document.all;
	t.exports = n === void 0 && n !== void 0 ? function(e) {
		return typeof e == "function" || e === n;
	} : function(e) {
		return typeof e == "function";
	};
})), ce = /* @__PURE__ */ p(((e, t) => {
	t.exports = !x()(function() {
		return Object.defineProperty({}, 1, { get: function() {
			return 7;
		} })[1] !== 7;
	});
})), le = /* @__PURE__ */ p(((e, t) => {
	var n = ne(), r = Function.prototype.call;
	t.exports = n ? r.bind(r) : function() {
		return r.apply(r, arguments);
	};
})), ue = /* @__PURE__ */ p(((e) => {
	var t = {}.propertyIsEnumerable, n = Object.getOwnPropertyDescriptor;
	e.f = n && !t.call({ 1: 2 }, 1) ? function(e) {
		var t = n(this, e);
		return !!t && t.enumerable;
	} : t;
})), de = /* @__PURE__ */ p(((e, t) => {
	t.exports = function(e, t) {
		return {
			enumerable: !(e & 1),
			configurable: !(e & 2),
			writable: !(e & 4),
			value: t
		};
	};
})), fe = /* @__PURE__ */ p(((e, t) => {
	var n = S(), r = x(), i = ae(), a = Object, o = n("".split);
	t.exports = r(function() {
		return !a("z").propertyIsEnumerable(0);
	}) ? function(e) {
		return i(e) === "String" ? o(e, "") : a(e);
	} : a;
})), pe = /* @__PURE__ */ p(((e, t) => {
	t.exports = function(e) {
		return e == null;
	};
})), me = /* @__PURE__ */ p(((e, t) => {
	var n = pe(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("Can't call method on " + e);
		return e;
	};
})), he = /* @__PURE__ */ p(((e, t) => {
	var n = fe(), r = me();
	t.exports = function(e) {
		return n(r(e));
	};
})), ge = /* @__PURE__ */ p(((e, t) => {
	var n = se();
	t.exports = function(e) {
		return typeof e == "object" ? e !== null : n(e);
	};
})), _e = /* @__PURE__ */ p(((e, t) => {
	t.exports = {};
})), ve = /* @__PURE__ */ p(((e, t) => {
	var n = _e(), r = C(), i = se(), a = function(e) {
		return i(e) ? e : void 0;
	};
	t.exports = function(e, t) {
		return arguments.length < 2 ? a(n[e]) || a(r[e]) : n[e] && n[e][t] || r[e] && r[e][t];
	};
})), ye = /* @__PURE__ */ p(((e, t) => {
	var n = C().navigator, r = n && n.userAgent;
	t.exports = r ? String(r) : "";
})), be = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = ye(), i = n.process, a = n.Deno, o = i && i.versions || a && a.version, s = o && o.v8, c, l;
	s && (c = s.split("."), l = c[0] > 0 && c[0] < 4 ? 1 : +(c[0] + c[1])), !l && r && (c = r.match(/Edge\/(\d+)/), (!c || c[1] >= 74) && (c = r.match(/Chrome\/(\d+)/), c && (l = +c[1]))), t.exports = l;
})), xe = /* @__PURE__ */ p(((e, t) => {
	var n = be(), r = x(), i = C().String;
	t.exports = !!Object.getOwnPropertySymbols && !r(function() {
		var e = Symbol("symbol detection");
		return !i(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && n && n < 41;
	});
})), Se = /* @__PURE__ */ p(((e, t) => {
	t.exports = xe() && !Symbol.sham && typeof Symbol.iterator == "symbol";
})), Ce = /* @__PURE__ */ p(((e, t) => {
	var n = ve(), r = se(), i = re(), a = Se(), o = Object;
	t.exports = a ? function(e) {
		return typeof e == "symbol";
	} : function(e) {
		var t = n("Symbol");
		return r(t) && i(t.prototype, o(e));
	};
})), we = /* @__PURE__ */ p(((e, t) => {
	var n = String;
	t.exports = function(e) {
		try {
			return n(e);
		} catch {
			return "Object";
		}
	};
})), Te = /* @__PURE__ */ p(((e, t) => {
	var n = se(), r = we(), i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not a function");
	};
})), Ee = /* @__PURE__ */ p(((e, t) => {
	var n = Te(), r = pe();
	t.exports = function(e, t) {
		var i = e[t];
		return r(i) ? void 0 : n(i);
	};
})), De = /* @__PURE__ */ p(((e, t) => {
	var n = le(), r = se(), i = ge(), a = TypeError;
	t.exports = function(e, t) {
		var o, s;
		if (t === "string" && r(o = e.toString) && !i(s = n(o, e)) || r(o = e.valueOf) && !i(s = n(o, e)) || t !== "string" && r(o = e.toString) && !i(s = n(o, e))) return s;
		throw new a("Can't convert object to primitive value");
	};
})), Oe = /* @__PURE__ */ p(((e, t) => {
	t.exports = !0;
})), ke = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = Object.defineProperty;
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
})), Ae = /* @__PURE__ */ p(((e, t) => {
	var n = Oe(), r = C(), i = ke(), a = "__core-js_shared__", o = t.exports = r[a] || i(a, {});
	(o.versions ||= []).push({
		version: "3.49.0",
		mode: n ? "pure" : "global",
		copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
		license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
		source: "https://github.com/zloirock/core-js"
	});
})), je = /* @__PURE__ */ p(((e, t) => {
	var n = Ae();
	t.exports = function(e, t) {
		return n[e] || (n[e] = t || {});
	};
})), Me = /* @__PURE__ */ p(((e, t) => {
	var n = me(), r = Object;
	t.exports = function(e) {
		return r(n(e));
	};
})), Ne = /* @__PURE__ */ p(((e, t) => {
	var n = S(), r = Me(), i = n({}.hasOwnProperty);
	t.exports = Object.hasOwn || function(e, t) {
		return i(r(e), t);
	};
})), Pe = /* @__PURE__ */ p(((e, t) => {
	var n = S(), r = 0, i = Math.random(), a = n(1.1.toString);
	t.exports = function(e) {
		return "Symbol(" + (e === void 0 ? "" : e) + ")_" + a(++r + i, 36);
	};
})), Fe = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = je(), i = Ne(), a = Pe(), o = xe(), s = Se(), c = n.Symbol, l = r("wks"), u = s ? c.for || c : c && c.withoutSetter || a;
	t.exports = function(e) {
		return i(l, e) || (l[e] = o && i(c, e) ? c[e] : u("Symbol." + e)), l[e];
	};
})), Ie = /* @__PURE__ */ p(((e, t) => {
	var n = le(), r = ge(), i = Ce(), a = Ee(), o = De(), s = Fe(), c = TypeError, l = s("toPrimitive");
	t.exports = function(e, t) {
		if (!r(e) || i(e)) return e;
		var s = a(e, l), u;
		if (s) {
			if (t === void 0 && (t = "default"), u = n(s, e, t), !r(u) || i(u)) return u;
			throw new c("Can't convert object to primitive value");
		}
		return t === void 0 && (t = "number"), o(e, t);
	};
})), Le = /* @__PURE__ */ p(((e, t) => {
	var n = Ie(), r = Ce();
	t.exports = function(e) {
		var t = n(e, "string");
		return r(t) ? t : t + "";
	};
})), Re = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = ge(), i = n.document, a = r(i) && r(i.createElement);
	t.exports = function(e) {
		return a ? i.createElement(e) : {};
	};
})), ze = /* @__PURE__ */ p(((e, t) => {
	var n = ce(), r = x(), i = Re();
	t.exports = !n && !r(function() {
		return Object.defineProperty(i("div"), "a", { get: function() {
			return 7;
		} }).a !== 7;
	});
})), Be = /* @__PURE__ */ p(((e) => {
	var t = ce(), n = le(), r = ue(), i = de(), a = he(), o = Le(), s = Ne(), c = ze(), l = Object.getOwnPropertyDescriptor;
	e.f = t ? l : function(e, t) {
		if (e = a(e), t = o(t), c) try {
			return l(e, t);
		} catch {}
		if (s(e, t)) return i(!n(r.f, e, t), e[t]);
	};
})), Ve = /* @__PURE__ */ p(((e, t) => {
	var n = x(), r = se(), i = /#|\.prototype\./, a = function(e, t) {
		var i = s[o(e)];
		return i === l ? !0 : i === c ? !1 : r(t) ? n(t) : !!t;
	}, o = a.normalize = function(e) {
		return String(e).replace(i, ".").toLowerCase();
	}, s = a.data = {}, c = a.NATIVE = "N", l = a.POLYFILL = "P";
	t.exports = a;
})), He = /* @__PURE__ */ p(((e, t) => {
	var n = oe(), r = Te(), i = ne(), a = n(n.bind);
	t.exports = function(e, t) {
		return r(e), t === void 0 ? e : i ? a(e, t) : function() {
			return e.apply(t, arguments);
		};
	};
})), Ue = /* @__PURE__ */ p(((e, t) => {
	var n = ce(), r = x();
	t.exports = n && r(function() {
		return Object.defineProperty(function() {}, "prototype", {
			value: 42,
			writable: !1
		}).prototype !== 42;
	});
})), We = /* @__PURE__ */ p(((e, t) => {
	var n = ge(), r = String, i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not an object");
	};
})), Ge = /* @__PURE__ */ p(((e) => {
	var t = ce(), n = ze(), r = Ue(), i = We(), a = Le(), o = TypeError, s = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = "enumerable", u = "configurable", d = "writable";
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
})), Ke = /* @__PURE__ */ p(((e, t) => {
	var n = ce(), r = Ge(), i = de();
	t.exports = n ? function(e, t, n) {
		return r.f(e, t, i(1, n));
	} : function(e, t, n) {
		return e[t] = n, e;
	};
})), qe = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = ie(), i = oe(), a = se(), o = Be().f, s = Ve(), c = _e(), l = He(), u = Ke(), d = Ne();
	Ae();
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
		var r = e.target, p = e.global, m = e.stat, h = e.proto, g = p ? n : m ? n[r] : n[r] && n[r].prototype, _ = p ? c : c[r] || u(c, r, {})[r], ee = _.prototype, v, y, te, b, x, ne, S, re, C;
		for (b in t) v = s(p ? b : r + (m ? "." : "#") + b, e.forced), y = !v && g && d(g, b), ne = _[b], y && (e.dontCallGetSet ? (C = o(g, b), S = C && C.value) : S = g[b]), x = y && S ? S : t[b], (v || h || typeof ne != typeof x) && (re = e.bind && y ? l(x, n) : e.wrap && y ? f(x) : h && a(x) ? i(x) : x, (e.sham || x && x.sham || ne && ne.sham) && u(re, "sham", !0), u(_, b, re), h && (te = r + "Prototype", d(c, te) || u(c, te, {}), u(c[te], b, x), e.real && ee && (v || !ee[b]) && u(ee, b, x)));
	};
})), Je = /* @__PURE__ */ p(((e, t) => {
	var n = Math.ceil, r = Math.floor;
	t.exports = Math.trunc || function(e) {
		var t = +e;
		return (t > 0 ? r : n)(t);
	};
})), Ye = /* @__PURE__ */ p(((e, t) => {
	var n = Je();
	t.exports = function(e) {
		var t = +e;
		return t !== t || t === 0 ? 0 : n(t);
	};
})), Xe = /* @__PURE__ */ p(((e, t) => {
	var n = Ye(), r = Math.max, i = Math.min;
	t.exports = function(e, t) {
		var a = n(e);
		return a < 0 ? r(a + t, 0) : i(a, t);
	};
})), Ze = /* @__PURE__ */ p(((e, t) => {
	var n = Ye(), r = Math.min;
	t.exports = function(e) {
		var t = n(e);
		return t > 0 ? r(t, 9007199254740991) : 0;
	};
})), Qe = /* @__PURE__ */ p(((e, t) => {
	var n = Ze();
	t.exports = function(e) {
		return n(e.length);
	};
})), $e = /* @__PURE__ */ p(((e, t) => {
	var n = he(), r = Xe(), i = Qe(), a = function(e) {
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
})), et = /* @__PURE__ */ p(((e, t) => {
	t.exports = function() {};
})), tt = /* @__PURE__ */ p((() => {
	var e = qe(), t = $e().includes, n = x(), r = et(), i = n(function() {
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
})), nt = /* @__PURE__ */ p(((e, t) => {
	var n = C(), r = _e();
	t.exports = function(e, t) {
		var i = r[e + "Prototype"], a = i && i[t];
		if (a) return a;
		var o = n[e], s = o && o.prototype;
		return s && s[t];
	};
})), rt = /* @__PURE__ */ p(((e, t) => {
	tt(), t.exports = nt()("Array", "includes");
})), it = /* @__PURE__ */ p(((e, t) => {
	var n = ge(), r = ae(), i = Fe()("match");
	t.exports = function(e) {
		var t;
		return n(e) && ((t = e[i]) === void 0 ? r(e) === "RegExp" : !!t);
	};
})), at = /* @__PURE__ */ p(((e, t) => {
	var n = it(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("The method doesn't accept regular expressions");
		return e;
	};
})), ot = /* @__PURE__ */ p(((e, t) => {
	var n = Fe()("toStringTag"), r = {};
	r[n] = "z", t.exports = String(r) === "[object z]";
})), st = /* @__PURE__ */ p(((e, t) => {
	var n = ot(), r = se(), i = ae(), a = Fe()("toStringTag"), o = Object, s = i(function() {
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
})), ct = /* @__PURE__ */ p(((e, t) => {
	var n = st(), r = String;
	t.exports = function(e) {
		if (n(e) === "Symbol") throw TypeError("Cannot convert a Symbol value to a string");
		return r(e);
	};
})), lt = /* @__PURE__ */ p(((e, t) => {
	var n = Fe()("match");
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
})), ut = /* @__PURE__ */ p((() => {
	var e = qe(), t = S(), n = at(), r = me(), i = ct(), a = lt(), o = t("".indexOf);
	e({
		target: "String",
		proto: !0,
		forced: !a("includes")
	}, { includes: function(e) {
		return !!~o(i(r(this)), i(n(e)), arguments.length > 1 ? arguments[1] : void 0);
	} });
})), dt = /* @__PURE__ */ p(((e, t) => {
	ut(), t.exports = nt()("String", "includes");
})), ft = /* @__PURE__ */ p(((e, t) => {
	var n = re(), r = rt(), i = dt(), a = Array.prototype, o = String.prototype;
	t.exports = function(e) {
		var t = e.includes;
		return e === a || n(a, e) && t === a.includes ? r : typeof e == "string" || e === o || n(o, e) && t === o.includes ? i : t;
	};
})), pt = /* @__PURE__ */ g((/* @__PURE__ */ p(((e, t) => {
	t.exports = ft();
})))(), 1);
function mt(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) i.push(t(e[n]));
	return i;
}
function ht(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) t(e[n]) && i.push(e[n]);
	return i;
}
function gt(e) {
	return e % 360 * Math.PI / 180;
}
function _t(e) {
	return e.replace(/([A-Z])/g, function(e, t) {
		return "-" + t.toLowerCase();
	});
}
function vt(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function yt(e, t, n, r) {
	return (t == null || n == null) && (r ||= e.bbox(), t == null ? t = r.width / r.height * n : n ??= r.height / r.width * t), {
		width: t,
		height: n
	};
}
function bt(e, t) {
	let n = e.origin, r = e.ox == null ? e.originX == null ? "center" : e.originX : e.ox, i = e.oy == null ? e.originY == null ? "center" : e.originY : e.oy;
	n != null && ([r, i] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
	let a = typeof r == "string", o = typeof i == "string";
	if (a || o) {
		let { height: e, width: n, x: s, y: c } = t.bbox();
		a && (r = (0, pt.default)(r).call(r, "left") ? s : (0, pt.default)(r).call(r, "right") ? s + n : s + n / 2), o && (i = (0, pt.default)(i).call(i, "top") ? c : (0, pt.default)(i).call(i, "bottom") ? c + e : c + e / 2);
	}
	return [r, i];
}
var xt = /* @__PURE__ */ new Set([
	"desc",
	"metadata",
	"title"
]), St = (e) => xt.has(e.nodeName), Ct = (e, t, n = {}) => {
	let r = { ...t };
	for (let e in r) r[e].valueOf() === n[e] && delete r[e];
	Object.keys(r).length ? e.node.setAttribute("data-svgjs", JSON.stringify(r)) : (e.node.removeAttribute("data-svgjs"), e.node.removeAttribute("svgjs:data"));
}, wt = "http://www.w3.org/2000/svg", Tt = "http://www.w3.org/1999/xhtml", Et = "http://www.w3.org/2000/xmlns/", Dt = "http://www.w3.org/1999/xlink", w = {
	window: typeof window > "u" ? null : window,
	document: typeof document > "u" ? null : document
};
function Ot() {
	return w.window;
}
var kt = class {}, At = {}, jt = "___SYMBOL___ROOT___";
function Mt(e, t = wt) {
	return w.document.createElementNS(t, e);
}
function T(e, t = !1) {
	if (e instanceof kt) return e;
	if (typeof e == "object") return Nt(e);
	if (e == null) return new At[jt]();
	if (typeof e == "string" && e.trim().charAt(0) !== "<") return Nt(w.document.querySelector(e));
	let n = t ? w.document.createElement("div") : Mt("svg");
	return n.innerHTML = e.trim(), e = Nt(n.firstElementChild), n.removeChild(n.firstElementChild), e;
}
function E(e, t) {
	return t && (t instanceof w.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Mt(e);
}
function D(e) {
	if (!e) return null;
	if (e.instance instanceof kt) return e.instance;
	if (e.nodeName === "#document-fragment") return new At.Fragment(e);
	let t = vt(e.nodeName || "Dom");
	return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : At[t] || (t = "Dom"), new At[t](e);
}
var Nt = D;
function O(e, t = e.name, n = !1) {
	return At[t] = e, n && (At[jt] = e), b(Object.getOwnPropertyNames(e.prototype)), e;
}
function Pt(e) {
	return At[e];
}
var Ft = 1e3;
function It(e) {
	return "Svgjs" + vt(e) + Ft++;
}
function Lt(e) {
	for (let t = e.children.length - 1; t >= 0; t--) Lt(e.children[t]);
	return e.id &&= It(e.nodeName), e;
}
function k(e, t) {
	let n, r;
	for (e = Array.isArray(e) ? e : [e], r = e.length - 1; r >= 0; r--) for (n in t) e[r].prototype[n] = t[n];
}
function A(e) {
	return function(...t) {
		let n = t[t.length - 1];
		return n && n.constructor === Object && !(n instanceof Array) ? e.apply(this, t.slice(0, -1)).attr(n) : e.apply(this, t);
	};
}
function Rt() {
	return this.parent().children();
}
function zt() {
	return this.parent().index(this);
}
function Bt() {
	return this.siblings()[this.position() + 1];
}
function Vt() {
	return this.siblings()[this.position() - 1];
}
function Ht() {
	let e = this.position();
	return this.parent().add(this.remove(), e + 1), this;
}
function Ut() {
	let e = this.position();
	return this.parent().add(this.remove(), e ? e - 1 : 0), this;
}
function Wt() {
	return this.parent().add(this.remove()), this;
}
function Gt() {
	return this.parent().add(this.remove(), 0), this;
}
function Kt(e) {
	e = T(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t), this;
}
function qt(e) {
	e = T(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t + 1), this;
}
function Jt(e) {
	return e = T(e), e.before(this), this;
}
function Yt(e) {
	return e = T(e), e.after(this), this;
}
v("Dom", {
	siblings: Rt,
	position: zt,
	next: Bt,
	prev: Vt,
	forward: Ht,
	backward: Ut,
	front: Wt,
	back: Gt,
	before: Kt,
	after: qt,
	insertBefore: Jt,
	insertAfter: Yt
});
var Xt = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Zt = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, Qt = /rgb\((\d+),(\d+),(\d+)\)/, $t = /^(#[^\s]+)$/, en = /\)\s*,?\s*/, tn = /\s/g, nn = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, rn = /^rgb\(/, an = /^(\s+)?$/, on = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, sn = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, cn = /[\s,]+/, ln = /[MLHVCSQTAZ]/i;
function un() {
	let e = this.attr("class");
	return e == null ? [] : e.trim().split(cn);
}
function dn(e) {
	return this.classes().indexOf(e) !== -1;
}
function fn(e) {
	if (!this.hasClass(e)) {
		let t = this.classes();
		t.push(e), this.attr("class", t.join(" "));
	}
	return this;
}
function pn(e) {
	return this.hasClass(e) && this.attr("class", this.classes().filter(function(t) {
		return t !== e;
	}).join(" ")), this;
}
function mn(e) {
	return this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
}
v("Dom", {
	classes: un,
	hasClass: dn,
	addClass: fn,
	removeClass: pn,
	toggleClass: mn
});
var hn = (e) => e.startsWith("--") ? e : _t(e);
function gn(e, t) {
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
				let e = hn(t);
				n[t] = this.node.style.getPropertyValue(e);
			}
			return n;
		}
		if (typeof e == "string") return this.node.style.getPropertyValue(hn(e));
		if (typeof e == "object") for (let t in e) this.node.style.setProperty(hn(t), e[t] == null || an.test(e[t]) ? "" : e[t]);
	}
	return arguments.length === 2 && this.node.style.setProperty(hn(e), t == null || an.test(t) ? "" : t), this;
}
function _n() {
	return this.css("display", "");
}
function vn() {
	return this.css("display", "none");
}
function yn() {
	return this.css("display") !== "none";
}
v("Dom", {
	css: gn,
	show: _n,
	hide: vn,
	visible: yn
});
function bn(e, t, n) {
	if (e == null) return this.data(mt(ht(this.node.attributes, (e) => e.nodeName.indexOf("data-") === 0), (e) => e.nodeName.slice(5)));
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
v("Dom", { data: bn });
function xn(e, t) {
	if (typeof arguments[0] == "object") for (let t in e) this.remember(t, e[t]);
	else if (arguments.length === 1) return this.memory()[e];
	else this.memory()[e] = t;
	return this;
}
function Sn() {
	if (arguments.length === 0) this._memory = {};
	else for (let e = arguments.length - 1; e >= 0; e--) delete this.memory()[arguments[e]];
	return this;
}
function Cn() {
	return this._memory = this._memory || {};
}
v("Dom", {
	remember: xn,
	forget: Sn,
	memory: Cn
});
function wn(e) {
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
function Tn(e) {
	let t = Math.max(0, Math.min(255, Math.round(e))).toString(16);
	return t.length === 1 ? "0" + t : t;
}
function En(e, t) {
	for (let n = t.length; n--;) if (e[t[n]] == null) return !1;
	return !0;
}
function Dn(e, t) {
	let n = En(e, "rgb") ? {
		_a: e.r,
		_b: e.g,
		_c: e.b,
		_d: 0,
		space: "rgb"
	} : En(e, "xyz") ? {
		_a: e.x,
		_b: e.y,
		_c: e.z,
		_d: 0,
		space: "xyz"
	} : En(e, "hsl") ? {
		_a: e.h,
		_b: e.s,
		_c: e.l,
		_d: 0,
		space: "hsl"
	} : En(e, "lab") ? {
		_a: e.l,
		_b: e.a,
		_c: e.b,
		_d: 0,
		space: "lab"
	} : En(e, "lch") ? {
		_a: e.l,
		_b: e.c,
		_c: e.h,
		_d: 0,
		space: "lch"
	} : En(e, "cmyk") ? {
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
function On(e) {
	return e === "lab" || e === "xyz" || e === "lch";
}
function kn(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
var An = class e {
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
		return typeof e == "string" && (nn.test(e) || rn.test(e));
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
			let n = Dn(e, t);
			Object.assign(this, n);
		} else if (typeof e == "string") {
			if (rn.test(e)) {
				let t = e.replace(tn, ""), [n, r, i] = Qt.exec(t).slice(1, 4).map((e) => parseInt(e));
				Object.assign(this, {
					_a: n,
					_b: r,
					_c: i,
					_d: 0,
					space: "rgb"
				});
			} else if (nn.test(e)) {
				let [, t, n, r] = Zt.exec(wn(e)).map((e) => parseInt(e, 16));
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
		if (On(this.space)) {
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
			let i = r < .5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i, o = 255 * kn(a, i, t + 1 / 3), s = 255 * kn(a, i, t), c = 255 * kn(a, i, t - 1 / 3);
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
		let [e, t, n] = this._clamped().map(Tn);
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
}, j = class e {
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
		M.isMatrixLike(e) || (e = new M(e));
		let { x: t, y: n } = this;
		return this.x = e.a * t + e.c * n + e.e, this.y = e.b * t + e.d * n + e.f, this;
	}
};
function jn(e, t) {
	return new j(e, t).transformO(this.screenCTM().inverseO());
}
function Mn(e, t, n) {
	return Math.abs(t - e) < (n || 1e-6);
}
var M = class e {
	constructor(...e) {
		this.init(...e);
	}
	static formatTransforms(e) {
		let t = e.flip === "both" || e.flip === !0, n = e.flip && (t || e.flip === "x") ? -1 : 1, r = e.flip && (t || e.flip === "y") ? -1 : 1, i = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, a = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, o = e.scale && e.scale.length ? e.scale[0] * n : isFinite(e.scale) ? e.scale * n : isFinite(e.scaleX) ? e.scaleX * n : n, s = e.scale && e.scale.length ? e.scale[1] * r : isFinite(e.scale) ? e.scale * r : isFinite(e.scaleY) ? e.scaleY * r : r, c = e.shear || 0, l = e.rotate || e.theta || 0, u = new j(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), d = u.x, f = u.y, p = new j(e.position ?? e.px ?? e.positionX ?? NaN, e.py ?? e.positionY ?? NaN), m = p.x, h = p.y, g = new j(e.translate || e.tx || e.translateX, e.ty || e.translateY), _ = g.x, ee = g.y, v = new j(e.relative || e.rx || e.relativeX, e.ry || e.relativeY);
		return {
			scaleX: o,
			scaleY: s,
			skewX: i,
			skewY: a,
			shear: c,
			theta: l,
			rx: v.x,
			ry: v.y,
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
		return Mn(this.a, n.a) && Mn(this.b, n.b) && Mn(this.c, n.c) && Mn(this.d, n.d) && Mn(this.e, n.e) && Mn(this.f, n.f);
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
		return t = t instanceof _r ? t.matrixify() : typeof t == "string" ? e.fromArray(t.split(cn).map(parseFloat)) : Array.isArray(t) ? e.fromArray(t) : typeof t == "object" && e.isMatrixLike(t) ? t : typeof t == "object" ? new e().transform(t) : arguments.length === 6 ? e.fromArray([].slice.call(arguments)) : n, this.a = t.a == null ? n.a : t.a, this.b = t.b == null ? n.b : t.b, this.c = t.c == null ? n.c : t.c, this.d = t.d == null ? n.d : t.d, this.e = t.e == null ? n.e : t.e, this.f = t.f == null ? n.f : t.f, this;
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
		e = gt(e);
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
		arguments.length === 3 && (r = n, n = t, t = e), e = gt(e), t = gt(t);
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
		let n = e.formatTransforms(t), r = this, { x: i, y: a } = new j(n.ox, n.oy).transform(r), o = new e().translateO(n.rx, n.ry).lmultiplyO(r).translateO(-i, -a).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(i, a);
		if (isFinite(n.px) || isFinite(n.py)) {
			let e = new j(i, a).transform(o), t = isFinite(n.px) ? n.px - e.x : 0, r = isFinite(n.py) ? n.py - e.y : 0;
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
function Nn() {
	return new M(this.node.getCTM());
}
function Pn() {
	try {
		if (typeof this.isRoot == "function" && !this.isRoot()) {
			let e = this.rect(1, 1), t = e.node.getScreenCTM();
			return e.remove(), new M(t);
		}
		return new M(this.node.getScreenCTM());
	} catch {
		return console.warn(`Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`), new M();
	}
}
O(M, "Matrix");
function Fn() {
	if (!Fn.nodes || Fn.nodes.svg.node.ownerDocument !== w.document) {
		let e = T().size(2, 0);
		e.node.style.cssText = "opacity: 0;position: absolute;left: -100%;top: -100%;overflow: hidden", e.attr("focusable", "false"), e.attr("aria-hidden", "true"), Fn.nodes = {
			svg: e,
			path: e.path().node
		};
	}
	return Fn.nodes.svg.node.parentNode || Fn.nodes.svg.addTo(w.document.body || w.document.documentElement), Fn.nodes;
}
function In(e) {
	return !e.width && !e.height && !e.x && !e.y;
}
function Ln(e) {
	return e === w.document || (w.document.documentElement.contains || function(e) {
		for (; e.parentNode;) e = e.parentNode;
		return e === w.document;
	}).call(w.document.documentElement, e);
}
var N = class e {
	constructor(...e) {
		this.init(...e);
	}
	addOffset() {
		return this.x += w.window.pageXOffset, this.y += w.window.pageYOffset, new e(this);
	}
	init(e) {
		return e = typeof e == "string" ? e.split(cn).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [
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
		return In(this);
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
		t instanceof M || (t = new M(t));
		let n = Infinity, r = -Infinity, i = Infinity, a = -Infinity;
		return [
			new j(this.x, this.y),
			new j(this.x2, this.y),
			new j(this.x, this.y2),
			new j(this.x2, this.y2)
		].forEach(function(e) {
			e = e.transform(t), n = Math.min(n, e.x), r = Math.max(r, e.x), i = Math.min(i, e.y), a = Math.max(a, e.y);
		}), new e(n, i, r - n, a - i);
	}
};
function Rn(e, t, n) {
	let r;
	try {
		if (r = t(e.node), In(r) && !Ln(e.node)) throw Error("Element not in the dom");
	} catch {
		r = n(e);
	}
	return r;
}
function zn() {
	return new N(Rn(this, (e) => e.getBBox(), (e) => {
		try {
			let t = e.clone().addTo(Fn().svg).show(), n = t.node.getBBox();
			return t.remove(), n;
		} catch (t) {
			throw Error(`Getting bbox of element "${e.node.nodeName}" is not possible: ${t.toString()}`);
		}
	}));
}
function Bn(e) {
	let t = new N(Rn(this, (e) => e.getBoundingClientRect(), (e) => {
		throw Error(`Getting rbox of element "${e.node.nodeName}" is not possible`);
	}));
	return e ? t.transform(e.screenCTM().inverseO()) : t.addOffset();
}
function Vn(e, t) {
	let n = this.bbox();
	return e > n.x && t > n.y && e < n.x + n.width && t < n.y + n.height;
}
v({ viewbox: {
	viewbox(e, t, n, r) {
		return e == null ? new N(this.attr("viewBox")) : this.attr("viewBox", new N(e, t, n, r));
	},
	zoom(e, t) {
		let { width: n, height: r } = this.attr(["width", "height"]);
		if ((!n && !r || typeof n == "string" || typeof r == "string") && (n = this.node.clientWidth, r = this.node.clientHeight), !n || !r) throw Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
		let i = this.viewbox(), a = n / i.width, o = r / i.height, s = Math.min(a, o);
		if (e == null) return s;
		let c = s / e;
		c === Infinity && (c = (2 ** 53 - 1) / 100), t ||= new j(n / 2 / a + i.x, r / 2 / o + i.y);
		let l = new N(i).transform(new M({
			scale: c,
			origin: t
		}));
		return this.viewbox(l);
	}
} }), O(N, "Box");
var Hn = class extends Array {
	constructor(e = [], ...t) {
		if (super(e, ...t), typeof e == "number") return this;
		this.length = 0, this.push(...e);
	}
};
k([Hn], {
	each(e, ...t) {
		return typeof e == "function" ? this.map((t, n, r) => e.call(t, t, n, r)) : this.map((n) => n[e](...t));
	},
	toArray() {
		return Array.prototype.concat.apply([], this);
	}
});
var Un = [
	"toArray",
	"constructor",
	"each"
];
Hn.extend = function(e) {
	e = e.reduce((e, t) => ((0, pt.default)(Un).call(Un, t) || t[0] === "_" || (t in Array.prototype && (e["$" + t] = Array.prototype[t]), e[t] = function(...e) {
		return this.each(t, ...e);
	}), e), {}), k([Hn], e);
};
function Wn(e) {
	let t = (e + "").trim(), n = t.match(/^url\((.*)\)$/i);
	if (n) {
		t = n[1].trim();
		let e = t[0];
		if (e === "\"" || e === "'") {
			if (t[t.length - 1] !== e) return null;
			t = t.slice(1, -1);
		}
	}
	let r = t.match($t);
	return r ? r[1].slice(1) : null;
}
function Gn(e, t) {
	let n = `#${w.window.CSS.escape(t)}`;
	return e.nodeType === 1 && e.matches(n) ? e : e.querySelector(n);
}
function Kn(e, t) {
	let n = Wn(t);
	return n ? Gn(e.getRootNode(), n) : null;
}
function qn(e, t, n = `[${t}]`) {
	let r = e.getAttribute("id"), i = e.getRootNode();
	if (!r || Gn(i, r) !== e) return new Hn();
	let a = [];
	i.nodeType === 1 && i.matches(n) && Wn(i.getAttribute(t)) === r && a.push(D(i));
	for (let e of i.querySelectorAll(n)) Wn(e.getAttribute(t)) === r && a.push(D(e));
	return new Hn(a);
}
function Jn(e, t) {
	return new Hn(mt((t || w.document).querySelectorAll(e), function(e) {
		return D(e);
	}));
}
function Yn(e) {
	return Jn(e, this.node);
}
function Xn(e) {
	return D(this.node.querySelector(e));
}
var Zn = 0, Qn = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), er = () => Object.create(null);
function tr(e) {
	let t = e.getEventHolder(), n = Qn.get(t);
	return n || (n = er(), Qn.set(t, n)), n;
}
function nr(e) {
	return e.getEventTarget();
}
function rr(e) {
	Qn.delete(e.getEventHolder());
}
function ir(e, t, n, r, i) {
	let a = n.bind(r || e), o = i || !1, s = T(e), c = tr(s), l = nr(s);
	t = Array.isArray(t) ? t : t.split(cn);
	let u = $n.get(n);
	u || (u = ++Zn, $n.set(n, u)), t.forEach(function(e) {
		let t = e.split(".")[0], n = e.split(".")[1] || "*";
		c[t] = c[t] || er(), c[t][n] = c[t][n] || er(), c[t][n][u] = c[t][n][u] || [], c[t][n][u].push({
			listener: a,
			options: o
		}), l.addEventListener(t, a, o);
	});
}
function ar(e, t, n, r) {
	let i = T(e), a = tr(i), o = nr(i);
	typeof n == "function" && (n = $n.get(n), !n) || (t = Array.isArray(t) ? t : (t || "").split(cn), t.forEach(function(e) {
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
				for (l in a[t][s]) ar(o, [t, s].join("."), l);
				delete a[t][s];
			}
		} else if (s) for (e in a) for (c in a[e]) s === c && ar(o, [e, s].join("."));
		else if (t) {
			if (a[t]) {
				for (c in a[t]) ar(o, [t, c].join("."));
				delete a[t];
			}
		} else {
			for (e in a) ar(o, e);
			rr(i);
		}
	}));
}
function or(e, t, n, r) {
	let i = nr(e);
	return t instanceof w.window.Event || (t = new w.window.CustomEvent(t, {
		detail: n,
		cancelable: !0,
		...r
	})), i.dispatchEvent(t), t;
}
var sr = class extends kt {
	addEventListener() {}
	dispatch(e, t, n) {
		return or(this, e, t, n);
	}
	dispatchEvent(e) {
		let t = tr(this)[e.type];
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
		return ar(this, e, t, n), this;
	}
	on(e, t, n, r) {
		return ir(this, e, t, n, r), this;
	}
	removeEventListener() {}
};
O(sr, "EventTarget");
function cr() {}
var lr = {
	duration: 400,
	ease: ">",
	delay: 0
}, ur = {
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
}, dr = class extends Array {
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
		return e instanceof Array ? e : e.trim().split(cn).map(parseFloat);
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
}, P = class e {
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
		return n = Array.isArray(t) ? t[1] : n, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = n || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (n = t.match(Xt), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : t instanceof e && (this.value = t.valueOf(), this.unit = t.unit), this;
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
}, fr = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"bgcolor",
	"stop-color",
	"flood-color",
	"lighting-color"
]), pr = [];
function mr(e) {
	pr.push(e);
}
function hr(e, t, n) {
	if (e == null) {
		e = {}, t = this.node.attributes;
		for (let n of t) e[n.nodeName] = on.test(n.nodeValue) ? parseFloat(n.nodeValue) : n.nodeValue;
		return e;
	}
	if (e instanceof Array) return e.reduce((e, t) => (e[t] = this.attr(t), e), {});
	if (typeof e == "object" && e.constructor === Object) for (t in e) this.attr(t, e[t]);
	else if (t === null) this.node.removeAttribute(e);
	else if (t == null) return t = this.node.getAttribute(e), t == null ? ur[e] : on.test(t) ? parseFloat(t) : t;
	else t = pr.reduce((t, n) => n(e, t, this), t), typeof t == "number" ? t = new P(t) : fr.has(e) && An.isColor(t) ? t = new An(t) : t.constructor === Array && (t = new dr(t)), e === "leading" ? this.leading && this.leading(t) : typeof n == "string" ? this.node.setAttributeNS(n, e, t.toString()) : this.node.setAttribute(e, t.toString()), this.rebuild && (e === "font-size" || e === "x") && this.rebuild();
	return this;
}
var gr = class e extends sr {
	constructor(e, t) {
		super(), this.node = e, this.type = e.nodeName, t && e !== t && this.attr(t);
	}
	add(e, t) {
		return e = T(e), e.removeNamespace && this.node instanceof w.window.SVGElement && e.removeNamespace(), t == null ? this.node.appendChild(e.node) : e.node !== this.node.childNodes[t] && this.node.insertBefore(e.node, this.node.childNodes[t]), this;
	}
	addTo(e, t) {
		return T(e).put(this, t);
	}
	children() {
		return new Hn(mt(this.node.children, function(e) {
			return D(e);
		}));
	}
	clear() {
		for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);
		return this;
	}
	clone(e = !0, t = !0) {
		this.writeDataToDom();
		let n = this.node.cloneNode(e);
		return t && (n = Lt(n)), new this.constructor(n);
	}
	each(e, t) {
		let n = this.children(), r, i;
		for (r = 0, i = n.length; r < i; r++) e.apply(n[r], [r, n]), t && n[r].each(e, t);
		return this;
	}
	element(t, n) {
		return this.put(new e(Mt(t), n));
	}
	first() {
		return D(this.node.firstChild);
	}
	get(e) {
		return D(this.node.childNodes[e]);
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
		return this.xml(e, t, Tt);
	}
	id(e) {
		return e === void 0 && !this.node.id && (this.node.id = It(this.type)), this.attr("id", e);
	}
	index(e) {
		return [].slice.call(this.node.childNodes).indexOf(e.node);
	}
	last() {
		return D(this.node.lastChild);
	}
	matches(e) {
		let t = this.node, n = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector || null;
		return n && n.call(t, e);
	}
	parent(e) {
		let t = this;
		if (!t.node.parentNode) return null;
		if (t = D(t.node.parentNode), !e) return t;
		do
			if (typeof e == "string" ? t.matches(e) : t instanceof e) return t;
		while (t = D(t.node.parentNode));
		return t;
	}
	put(e, t) {
		return e = T(e), this.add(e, t), e;
	}
	putIn(e, t) {
		return T(e).add(this, t);
	}
	remove() {
		return this.parent() && this.parent().removeElement(this), this;
	}
	removeElement(e) {
		return this.node.removeChild(e.node), this;
	}
	replace(e) {
		return e = T(e), this.node.parentNode && this.node.parentNode.replaceChild(e.node, this.node), e;
	}
	round(e = 2, t = null) {
		let n = 10 ** e, r = this.attr(t);
		for (let e in r) typeof r[e] == "number" && (r[e] = Math.round(r[e] * n) / n);
		return this.attr(r), this;
	}
	svg(e, t) {
		return this.xml(e, t, wt);
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
				if (n = D(n.node.cloneNode(!0)), t) {
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
		let r = Mt("wrapper", n), i = w.document.createDocumentFragment();
		r.innerHTML = e;
		for (let e = r.children.length; e--;) i.appendChild(r.firstElementChild);
		let a = this.parent();
		return t ? this.replace(i) && a : this.add(i);
	}
};
k(gr, {
	attr: hr,
	find: Yn,
	findOne: Xn
}), O(gr, "Dom");
var _r = class extends gr {
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
		return this.x(new P(e).plus(this.x()));
	}
	dy(e = 0) {
		return this.y(new P(e).plus(this.y()));
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
		t || (e &&= T(e).node);
		let i = new Hn(), a = this;
		for (; (a = a.parent()) && a.node !== w.document && a.node.nodeName !== "#document-fragment" && (i.push(a), !(!t && a.node === e || t && a.matches(e)));) if (r && a.node === r) return null;
		return i;
	}
	reference(e) {
		if (e = this.attr(e), !e) return null;
		let t = Kn(this.node, e);
		return t ? T(t) : null;
	}
	root() {
		let e = this.parent(Pt(jt));
		return e && e.root();
	}
	setData(e) {
		return this.dom = e, this;
	}
	size(e, t) {
		let n = yt(this, e, t);
		return this.width(new P(n.width)).height(new P(n.height));
	}
	width(e) {
		return this.attr("width", e);
	}
	writeDataToDom(e) {
		return Ct(this, this.dom, e), super.writeDataToDom();
	}
	x(e) {
		return this.attr("x", e);
	}
	y(e) {
		return this.attr("y", e);
	}
};
k(_r, {
	bbox: zn,
	rbox: Bn,
	inside: Vn,
	point: jn,
	ctm: Nn,
	screenCTM: Pn
}), O(_r, "Element");
var vr = {
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
		if (typeof t == "string" || t instanceof An || An.isRgb(t) || t instanceof _r) this.attr(e, t);
		else for (n = vr[e].length - 1; n >= 0; n--) t[vr[e][n]] != null && this.attr(vr.prefix(e, vr[e][n]), t[vr[e][n]]);
		return this;
	}, v(["Element", "Runner"], t);
}), v(["Element", "Runner"], {
	matrix: function(e, t, n, r, i, a) {
		return e == null ? new M(this) : this.attr("transform", new M(e, t, n, r, i, a));
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
}), v("radius", { radius: function(e, t = e) {
	return (this._element || this).type === "radialGradient" ? this.attr("r", new P(e)) : this.rx(e).ry(t);
} }), v("Path", {
	length: function() {
		return this.node.getTotalLength();
	},
	pointAt: function(e) {
		return new j(this.node.getPointAtLength(e));
	}
}), v(["Element", "Runner"], { font: function(e, t) {
	if (typeof e == "object") {
		for (t in e) this.font(t, e[t]);
		return this;
	}
	return e === "leading" ? this.leading(t) : e === "anchor" ? this.attr("text-anchor", t) : e === "size" || e === "family" || e === "weight" || e === "stretch" || e === "variant" || e === "style" ? this.attr("font-" + e, t) : this.attr(e, t);
} }), v("Element", [
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
function yr() {
	return this.attr("transform", null);
}
function br() {
	return (this.attr("transform") || "").split(en).slice(0, -1).map(function(e) {
		let t = e.trim().split("(");
		return [t[0].trim(), t[1].split(cn).map(function(e) {
			return parseFloat(e);
		})];
	}).reverse().reduce(function(e, t) {
		return t[0] === "matrix" ? e.lmultiply(M.fromArray(t[1])) : e[t[0]].apply(e, t[1]);
	}, new M());
}
function xr(e, t) {
	if (this === e) return this;
	if (St(this.node)) return this.addTo(e, t);
	let n = this.screenCTM(), r = e.screenCTM().inverse();
	return this.addTo(e, t).untransform().transform(r.multiply(n)), this;
}
function Sr(e) {
	return this.toParent(this.root(), e);
}
function Cr(e, t) {
	if (e == null || typeof e == "string") {
		let t = new M(this).decompose();
		return e == null ? t : t[e];
	}
	M.isMatrixLike(e) || (e = {
		...e,
		origin: bt(e, this)
	});
	let n = new M(t === !0 ? this : t || !1).transform(e);
	return this.attr("transform", n);
}
v("Element", {
	untransform: yr,
	matrixify: br,
	toParent: xr,
	toRoot: Sr,
	transform: Cr
});
var wr = class e extends _r {
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
O(wr, "Container");
var Tr = class extends wr {
	constructor(e, t = e) {
		super(E("defs", e), t);
	}
	flatten() {
		return this;
	}
	ungroup() {
		return this;
	}
};
O(Tr, "Defs");
var Er = class extends _r {};
O(Er, "Shape");
var Dr = /* @__PURE__ */ m({
	cx: () => Mr,
	cy: () => Nr,
	height: () => Fr,
	rx: () => Or,
	ry: () => kr,
	width: () => Pr,
	x: () => Ar,
	y: () => jr
});
function Or(e) {
	return this.attr("rx", e);
}
function kr(e) {
	return this.attr("ry", e);
}
function Ar(e) {
	return e == null ? this.cx() - this.rx() : this.cx(e + this.rx());
}
function jr(e) {
	return e == null ? this.cy() - this.ry() : this.cy(e + this.ry());
}
function Mr(e) {
	return this.attr("cx", e);
}
function Nr(e) {
	return this.attr("cy", e);
}
function Pr(e) {
	return e == null ? this.rx() * 2 : this.rx(new P(e).divide(2));
}
function Fr(e) {
	return e == null ? this.ry() * 2 : this.ry(new P(e).divide(2));
}
var Ir = class extends Er {
	constructor(e, t = e) {
		super(E("ellipse", e), t);
	}
	size(e, t) {
		let n = yt(this, e, t);
		return this.rx(new P(n.width).divide(2)).ry(new P(n.height).divide(2));
	}
};
k(Ir, Dr), v("Container", { ellipse: A(function(e = 0, t = e) {
	return this.put(new Ir()).size(e, t).move(0, 0);
}) }), O(Ir, "Ellipse");
var Lr = class extends gr {
	constructor(e = w.document.createDocumentFragment()) {
		super(e);
	}
	xml(e, t, n) {
		if (typeof e == "boolean" && (n = t, t = e, e = null), e == null || typeof e == "function") {
			let e = new gr(Mt("wrapper", n));
			return e.add(this.node.cloneNode(!0)), e.xml(!1, n);
		}
		return super.xml(e, !1, n);
	}
};
O(Lr, "Fragment");
var Rr = /* @__PURE__ */ m({
	from: () => zr,
	to: () => Br
});
function zr(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		fx: new P(e),
		fy: new P(t)
	}) : this.attr({
		x1: new P(e),
		y1: new P(t)
	});
}
function Br(e, t) {
	return (this._element || this).type === "radialGradient" ? this.attr({
		cx: new P(e),
		cy: new P(t)
	}) : this.attr({
		x2: new P(e),
		y2: new P(t)
	});
}
var Vr = class extends wr {
	constructor(e, t) {
		super(E(e + "Gradient", typeof e == "string" ? null : e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "gradientTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new N();
	}
	targets() {
		return qn(this.node, "fill");
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
k(Vr, Rr), v({
	Container: { gradient(...e) {
		return this.defs().gradient(...e);
	} },
	Defs: { gradient: A(function(e, t) {
		return this.put(new Vr(e)).update(t);
	}) }
}), O(Vr, "Gradient");
var Hr = class extends wr {
	constructor(e, t = e) {
		super(E("pattern", e), t);
	}
	attr(e, t, n) {
		return e === "transform" && (e = "patternTransform"), super.attr(e, t, n);
	}
	bbox() {
		return new N();
	}
	targets() {
		return qn(this.node, "fill");
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
v({
	Container: { pattern(...e) {
		return this.defs().pattern(...e);
	} },
	Defs: { pattern: A(function(e, t, n) {
		return this.put(new Hr()).update(n).attr({
			x: 0,
			y: 0,
			width: e,
			height: t,
			patternUnits: "userSpaceOnUse"
		});
	}) }
}), O(Hr, "Pattern");
var Ur = class extends Er {
	constructor(e, t = e) {
		super(E("image", e), t);
	}
	load(e, t) {
		if (!e) return this;
		let n = new w.window.Image();
		return ir(n, "load", function(e) {
			let r = this.parent(Hr);
			this.width() === 0 && this.height() === 0 && this.size(n.width, n.height), r instanceof Hr && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof t == "function" && t.call(this, e);
		}, this), ir(n, "load error", function() {
			ar(n);
		}), this.attr("href", n.src = e, Dt);
	}
};
mr(function(e, t, n) {
	return (e === "fill" || e === "stroke") && sn.test(t) && (t = n.root().defs().image(t)), t instanceof Ur && (t = n.root().defs().pattern(0, 0, (e) => {
		e.add(t);
	})), t;
}), v({ Container: { image: A(function(e, t) {
	return this.put(new Ur()).size(0, 0).load(e, t);
}) } }), O(Ur, "Image");
var Wr = class extends dr {
	bbox() {
		let e = -Infinity, t = -Infinity, n = Infinity, r = Infinity;
		return this.forEach(function(i) {
			e = Math.max(i[0], e), t = Math.max(i[1], t), n = Math.min(i[0], n), r = Math.min(i[1], r);
		}), new N(n, r, e - n, t - r);
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n = this.length - 1; n >= 0; n--) this[n] = [this[n][0] + e, this[n][1] + t];
		return this;
	}
	parse(e = [0, 0]) {
		let t = [];
		e = e instanceof Array ? Array.prototype.concat.apply([], e) : e.trim().split(cn).map(parseFloat), e.length % 2 != 0 && e.pop();
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
		M.isMatrixLike(e) || (e = new M(e));
		for (let t = this.length; t--;) {
			let [n, r] = this[t];
			this[t][0] = e.a * n + e.c * r + e.e, this[t][1] = e.b * n + e.d * r + e.f;
		}
		return this;
	}
}, Gr = /* @__PURE__ */ m({
	MorphArray: () => Kr,
	height: () => Xr,
	width: () => Yr,
	x: () => qr,
	y: () => Jr
}), Kr = Wr;
function qr(e) {
	return e == null ? this.bbox().x : this.move(e, this.bbox().y);
}
function Jr(e) {
	return e == null ? this.bbox().y : this.move(this.bbox().x, e);
}
function Yr(e) {
	let t = this.bbox();
	return e == null ? t.width : this.size(e, t.height);
}
function Xr(e) {
	let t = this.bbox();
	return e == null ? t.height : this.size(t.width, e);
}
var Zr = class extends Er {
	constructor(e, t = e) {
		super(E("line", e), t);
	}
	array() {
		return new Wr([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
	}
	move(e, t) {
		return this.attr(this.array().move(e, t).toLine());
	}
	plot(e, t, n, r) {
		return e == null ? this.array() : (e = t === void 0 ? new Wr(e).toLine() : {
			x1: e,
			y1: t,
			x2: n,
			y2: r
		}, this.attr(e));
	}
	size(e, t) {
		let n = yt(this, e, t);
		return this.attr(this.array().size(n.width, n.height).toLine());
	}
};
k(Zr, Gr), v({ Container: { line: A(function(...e) {
	return Zr.prototype.plot.apply(this.put(new Zr()), e[0] == null ? [
		0,
		0,
		0,
		0
	] : e);
}) } }), O(Zr, "Line");
var Qr = class extends wr {
	constructor(e, t = e) {
		super(E("marker", e), t);
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
v({
	Container: { marker(...e) {
		return this.defs().marker(...e);
	} },
	Defs: { marker: A(function(e, t, n) {
		return this.put(new Qr()).size(e, t).ref(e / 2, t / 2).viewbox(0, 0, e, t).attr("orient", "auto").update(n);
	}) },
	marker: { marker(e, t, n, r) {
		let i = ["marker"];
		return e !== "all" && i.push(e), i = i.join("-"), e = arguments[1] instanceof Qr ? arguments[1] : this.defs().marker(t, n, r), this.attr(i, e);
	} }
}), O(Qr, "Marker");
function $r(e, t) {
	return function(n) {
		return n == null ? this[e] : (this[e] = n, t && t.call(this), this);
	};
}
var ei = {
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
}, ti = class {
	done() {
		return !1;
	}
}, ni = class extends ti {
	constructor(e = lr.ease) {
		super(), this.ease = ei[e] || e;
	}
	step(e, t, n) {
		return typeof e == "number" ? e + (t - e) * this.ease(n) : n < 1 ? e : t;
	}
}, ri = class extends ti {
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
function ii() {
	let e = (this._duration || 500) / 1e3, t = this._overshoot || 0, n = Math.PI, r = Math.log(t / 100 + 1e-10), i = -r / Math.sqrt(n * n + r * r), a = 3.9 / (i * e);
	this.d = 2 * i * a, this.k = a * a;
}
k(class extends ri {
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
	duration: $r("_duration", ii),
	overshoot: $r("_overshoot", ii)
}), k(class extends ri {
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
	windup: $r("_windup"),
	p: $r("P"),
	i: $r("I"),
	d: $r("D")
});
var ai = {
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
}, oi = {
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
}, si = "mlhvqtcsaz".split("");
for (let e = 0, t = si.length; e < t; ++e) oi[si[e]] = function(e) {
	return function(t, n, r) {
		if (e === "H") t[0] += n.x;
		else if (e === "V") t[0] += n.y;
		else if (e === "A") t[5] += n.x, t[6] += n.y;
		else for (let e = 0, r = t.length; e < r; ++e) t[e] = t[e] + (e % 2 ? n.y : n.x);
		return oi[e](t, n, r);
	};
}(si[e].toUpperCase());
function ci(e) {
	return oi[e.segment[0]](e.segment.slice(1), e.p, e.p0);
}
function li(e) {
	return e.segment.length && e.segment.length - 1 === ai[e.segment[0].toUpperCase()];
}
function ui(e, t) {
	e.inNumber && di(e, !1);
	let n = ln.test(t);
	if (n) e.segment = [t];
	else {
		let t = e.lastCommand, n = t.toLowerCase();
		e.segment = [n === "m" ? t === n ? "l" : "L" : t];
	}
	return e.inSegment = !0, e.lastCommand = e.segment[0], n;
}
function di(e, t) {
	if (!e.inNumber) throw Error("Parser Error");
	e.number && e.segment.push(parseFloat(e.number)), e.inNumber = t, e.number = "", e.pointSeen = !1, e.hasExponent = !1, li(e) && fi(e);
}
function fi(e) {
	e.inSegment = !1, e.absolute && (e.segment = ci(e)), e.segments.push(e.segment);
}
function pi(e) {
	if (!e.segment.length) return !1;
	let t = e.segment[0].toUpperCase() === "A", n = e.segment.length;
	return t && (n === 4 || n === 5);
}
function mi(e) {
	return e.lastToken.toUpperCase() === "E";
}
var hi = /* @__PURE__ */ new Set([
	" ",
	",",
	"	",
	"\n",
	"\r",
	"\f"
]);
function gi(e, t = !0) {
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
		p0: new j(),
		p: new j()
	};
	for (; i.lastToken = r, r = e.charAt(n++);) if (i.inSegment || !ui(i, r)) {
		if (r === ".") {
			if (i.pointSeen || i.hasExponent) {
				di(i, !1), --n;
				continue;
			}
			i.inNumber = !0, i.pointSeen = !0, i.number += r;
		} else if (!isNaN(parseInt(r))) {
			if (i.number === "0" || pi(i)) {
				i.inNumber = !0, i.number = r, di(i, !0);
				continue;
			}
			i.inNumber = !0, i.number += r;
		} else if (hi.has(r)) i.inNumber && di(i, !1);
		else if (r === "-" || r === "+") {
			if (i.inNumber && !mi(i)) {
				di(i, !1), --n;
				continue;
			}
			i.number += r, i.inNumber = !0;
		} else if (r.toUpperCase() === "E") i.number += r, i.hasExponent = !0;
		else if (ln.test(r)) {
			if (i.inNumber) di(i, !1);
			else if (li(i)) fi(i);
			else throw Error("parser Error");
			--n;
		}
	}
	return i.inNumber && di(i, !1), i.inSegment && li(i) && fi(i), i.segments;
}
function _i(e) {
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) t += e[n][0], e[n][1] != null && (t += e[n][1], e[n][2] != null && (t += " ", t += e[n][2], e[n][3] != null && (t += " ", t += e[n][3], t += " ", t += e[n][4], e[n][5] != null && (t += " ", t += e[n][5], t += " ", t += e[n][6], e[n][7] != null && (t += " ", t += e[n][7])))));
	return t + " ";
}
var vi = class extends dr {
	bbox() {
		return Fn().path.setAttribute("d", this.toString()), new N(Fn.nodes.path.getBBox());
	}
	move(e, t) {
		let n = this.bbox();
		if (e -= n.x, t -= n.y, !isNaN(e) && !isNaN(t)) for (let n, r = this.length - 1; r >= 0; r--) n = this[r][0], n === "M" || n === "L" || n === "T" ? (this[r][1] += e, this[r][2] += t) : n === "H" ? this[r][1] += e : n === "V" ? this[r][1] += t : n === "C" || n === "S" || n === "Q" ? (this[r][1] += e, this[r][2] += t, this[r][3] += e, this[r][4] += t, n === "C" && (this[r][5] += e, this[r][6] += t)) : n === "A" && (this[r][6] += e, this[r][7] += t);
		return this;
	}
	parse(e = "M0 0") {
		return Array.isArray(e) && (e = Array.prototype.concat.apply([], e).toString()), gi(e);
	}
	size(e, t) {
		let n = this.bbox(), r, i;
		for (n.width = n.width === 0 ? 1 : n.width, n.height = n.height === 0 ? 1 : n.height, r = this.length - 1; r >= 0; r--) i = this[r][0], i === "M" || i === "L" || i === "T" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y) : i === "H" ? this[r][1] = (this[r][1] - n.x) * e / n.width + n.x : i === "V" ? this[r][1] = (this[r][1] - n.y) * t / n.height + n.y : i === "C" || i === "S" || i === "Q" ? (this[r][1] = (this[r][1] - n.x) * e / n.width + n.x, this[r][2] = (this[r][2] - n.y) * t / n.height + n.y, this[r][3] = (this[r][3] - n.x) * e / n.width + n.x, this[r][4] = (this[r][4] - n.y) * t / n.height + n.y, i === "C" && (this[r][5] = (this[r][5] - n.x) * e / n.width + n.x, this[r][6] = (this[r][6] - n.y) * t / n.height + n.y)) : i === "A" && (this[r][1] = this[r][1] * e / n.width, this[r][2] = this[r][2] * t / n.height, this[r][6] = (this[r][6] - n.x) * e / n.width + n.x, this[r][7] = (this[r][7] - n.y) * t / n.height + n.y);
		return this;
	}
	toString() {
		return _i(this);
	}
}, yi = (e) => {
	let t = typeof e;
	return t === "number" ? P : t === "string" ? An.isColor(e) ? An : cn.test(e) ? ln.test(e) ? vi : dr : Xt.test(e) ? P : xi : Ti.indexOf(e.constructor) > -1 ? e.constructor : Array.isArray(e) ? dr : t === "object" ? wi : xi;
}, bi = class {
	constructor(e) {
		this._stepper = e || new ni("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
		this._type || this.type(yi(e));
		let t = new this._type(e);
		return this._type === An && (t = this._to ? t[this._to[4]]() : this._from ? t[this._from[4]]() : t), this._type === wi && (t = this._to ? t.align(this._to) : this._from ? t.align(this._from) : t), t = t.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(t.length)).map(Object).map(function(e) {
			return e.done = !0, e;
		}), t;
	}
}, xi = class {
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
}, Si = class e {
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
Si.defaults = {
	scaleX: 1,
	scaleY: 1,
	shear: 0,
	rotate: 0,
	translateX: 0,
	translateY: 0,
	originX: 0,
	originY: 0
};
var Ci = (e, t) => e[0] < t[0] ? -1 : +(e[0] > t[0]), wi = class {
	constructor(...e) {
		this.init(...e);
	}
	align(e) {
		let t = this.values;
		for (let n = 0, r = t.length; n < r; ++n) {
			if (t[n + 1] === e[n + 1]) {
				if (t[n + 1] === An && e[n + 7] !== t[n + 7]) {
					let t = e[n + 7], r = new An(this.values.splice(n + 3, 5))[t]().toArray();
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
			let r = yi(e[n]), i = new r(e[n]).toArray();
			t.push([
				n,
				r,
				i.length,
				...i
			]);
		}
		return t.sort(Ci), this.values = t.reduce((e, t) => e.concat(t), []), this;
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
}, Ti = [
	xi,
	Si,
	wi
];
function Ei(e = []) {
	Ti.push(...[].concat(e));
}
function Di() {
	k(Ti, {
		to(e) {
			return new bi().type(this.constructor).from(this.toArray()).to(e);
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
var Oi = class extends Er {
	constructor(e, t = e) {
		super(E("path", e), t);
	}
	array() {
		return this._array ||= new vi(this.attr("d"));
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
		return e == null ? this.array() : this.clear().attr("d", typeof e == "string" ? e : this._array = new vi(e));
	}
	size(e, t) {
		let n = yt(this, e, t);
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
Oi.prototype.MorphArray = vi, v({ Container: { path: A(function(e) {
	return this.put(new Oi()).plot(e || new vi());
}) } }), O(Oi, "Path");
var ki = /* @__PURE__ */ m({
	array: () => Ai,
	clear: () => ji,
	move: () => Mi,
	plot: () => Ni,
	size: () => Pi
});
function Ai() {
	return this._array ||= new Wr(this.attr("points"));
}
function ji() {
	return delete this._array, this;
}
function Mi(e, t) {
	return this.attr("points", this.array().move(e, t));
}
function Ni(e) {
	return e == null ? this.array() : this.clear().attr("points", typeof e == "string" ? e : this._array = new Wr(e));
}
function Pi(e, t) {
	let n = yt(this, e, t);
	return this.attr("points", this.array().size(n.width, n.height));
}
var Fi = class extends Er {
	constructor(e, t = e) {
		super(E("polygon", e), t);
	}
};
v({ Container: { polygon: A(function(e) {
	return this.put(new Fi()).plot(e || new Wr());
}) } }), k(Fi, Gr), k(Fi, ki), O(Fi, "Polygon");
var Ii = class extends Er {
	constructor(e, t = e) {
		super(E("polyline", e), t);
	}
};
v({ Container: { polyline: A(function(e) {
	return this.put(new Ii()).plot(e || new Wr());
}) } }), k(Ii, Gr), k(Ii, ki), O(Ii, "Polyline");
var Li = class extends Er {
	constructor(e, t = e) {
		super(E("rect", e), t);
	}
};
k(Li, {
	rx: Or,
	ry: kr
}), v({ Container: { rect: A(function(e, t) {
	return this.put(new Li()).size(e, t);
}) } }), O(Li, "Rect");
var Ri = class {
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
}, F = {
	nextDraw: null,
	frames: new Ri(),
	timeouts: new Ri(),
	immediates: new Ri(),
	timer: () => w.window.performance || w.window.Date,
	frame(e) {
		let t = F.frames.push({ run: e });
		return F.nextDraw === null && (F.nextDraw = w.window.requestAnimationFrame(F._draw)), t;
	},
	timeout(e, t) {
		t ||= 0;
		let n = F.timer().now() + t, r = F.timeouts.push({
			run: e,
			time: n
		});
		return F.nextDraw === null && (F.nextDraw = w.window.requestAnimationFrame(F._draw)), r;
	},
	immediate(e) {
		let t = F.immediates.push(e);
		return F.nextDraw === null && (F.nextDraw = w.window.requestAnimationFrame(F._draw)), t;
	},
	cancelFrame(e) {
		e != null && F.frames.remove(e);
	},
	clearTimeout(e) {
		e != null && F.timeouts.remove(e);
	},
	cancelImmediate(e) {
		e != null && F.immediates.remove(e);
	},
	_draw(e) {
		try {
			let t = null, n = F.timeouts.last();
			for (; (t = F.timeouts.shift()) && (e >= t.time ? t.run() : F.timeouts.push(t), t !== n););
			let r = null, i = F.frames.last();
			for (; r !== i && (r = F.frames.shift());) r.run(e);
			let a = null;
			for (; a = F.immediates.shift();) a();
		} finally {
			F.nextDraw = F.timeouts.first() || F.frames.first() || F.immediates.first() ? w.window.requestAnimationFrame(F._draw) : null;
		}
	}
}, zi = function(e) {
	let t = e.start, n = e.runner.duration();
	return {
		start: t,
		duration: n,
		end: t + n,
		runner: e.runner
	};
}, Bi = function() {
	let e = w.window;
	return (e.performance || e.Date).now();
}, Vi = class extends sr {
	constructor(e = Bi) {
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
		if (e == null) return this._runners.map(zi);
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
		return F.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : (this._paused || (this._nextFrame = F.frame(this._step)), this);
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
		F.cancelFrame(this._nextFrame), this._generation = (this._generation || 0) + 1, this._startTime = 0, this._speed = 1, this._persist = 0;
		for (let { runner: e } of this._runners || []) e._retired = !0, e._runnerInfo = null;
		this._nextFrame = null, this._paused = !0, this._finishing = !1, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
	}
};
v({ Element: { timeline: function(e) {
	return e == null ? (this._timeline = this._timeline || new Vi(), this._timeline) : (this._timeline = e, this);
} } });
var Hi = class e extends sr {
	constructor(t) {
		super(), this.id = e.id++, t ??= lr.duration, t = typeof t == "function" ? new ri(t) : t, this._element = null, this._timeline = null, this._runnerInfo = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof ri, this._stepper = this._isDeclarative ? t : new ni(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new M(), this._isAbsoluteTransform = !1, this._hasTransform = !1, this._transformInitialised = !1, this._transformActive = !1, this._retired = !1, this._reverse = !1, this._swing = !1, this._wait = 0, this._times = 1, this._persist = this._isDeclarative ? !0 : null;
	}
	static sanitise(e, t, n) {
		let r = 1, i = !1, a = 0;
		return e ??= lr.duration, t ??= lr.delay, n ||= "last", typeof e == "object" && !(e instanceof ti) && (t = e.delay ?? t, n = e.when ?? n, i = e.swing || i, r = e.times ?? r, a = e.wait ?? a, e = e.duration ?? lr.duration), {
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
		return this.transforms = new M(), this;
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
		return this._stepper = new ni(e), this;
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
			initialiser: e || cr,
			runner: t || cr,
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
		if (e instanceof Vi || (n = t, t = e, e = this.timeline()), !e) throw Error("Runner cannot be scheduled without timeline");
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
		return (r || o) && (this._initialise(r), this.transforms = new M(), c = this._run(o ? e : n), this._transformActive = s, this.fire("step", this)), this.done = this.done || c && o, this.done && !t && this.fire("finished", this), this;
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
Hi.id = 0;
var Ui = class {
	constructor(e = new M(), t = -1, n = !0, r = !1) {
		this.transforms = e, this.id = t, this.done = n, this._isAbsoluteTransform = r, this._transformActive = !0, this._retired = !0;
	}
};
k([Hi, Ui], { mergeWith(e) {
	return new Ui(this._isAbsoluteTransform ? this.transforms : e.transforms.lmultiply(this.transforms), e.id, !0, e._isAbsoluteTransform || this._isAbsoluteTransform);
} });
var Wi = (e, t) => e.lmultiplyO(t), Gi = (e) => e.transforms, Ki = (e) => e._transformActive;
function qi(e) {
	let t = e.filter(Ki), n = 0;
	for (let e = 0; e < t.length; ++e) t[e]._isAbsoluteTransform && (n = e);
	return t.slice(n);
}
function Ji() {
	let e = qi(this._transformationRunners.runners).map(Gi).reduce(Wi, new M());
	this.transform(e), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
var Yi = class {
	constructor() {
		this.runners = [];
	}
	add(e) {
		var t;
		if (!(0, pt.default)(t = this.runners).call(t, e)) return this.runners.push(e), this;
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
v({ Element: {
	animate(e, t, n) {
		let r = Hi.sanitise(e, t, n), i = this.timeline();
		return new Hi(r.duration).loop(r).element(this).timeline(i.play()).schedule(r.delay, r.when);
	},
	delay(e, t) {
		return this.animate(0, e, t);
	},
	_currentTransform(e) {
		let t = this._transformationRunners.runners, n = t.indexOf(e);
		return qi(t.slice(0, n + 1)).map(Gi).reduce(Wi, new M());
	},
	_addRunner(e) {
		this._transformationRunners.length() === 1 && this._transformationRunners.runners[0].id === -1 && (this._transformationRunners.runners[0].transforms = new M(this)), this._transformationRunners.add(e), F.cancelImmediate(this._frameId), this._frameId = F.immediate(Ji.bind(this));
	},
	_prepareRunner() {
		this._frameId ?? (this._transformationRunners = new Yi().add(new Ui(new M(this))));
	}
} });
var Xi = (e, t) => e.filter((e) => !(0, pt.default)(t).call(t, e));
k(Hi, {
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
		let a = new bi(this._stepper).to(r), o = Object.keys(r);
		return this.queue(function() {
			a = a.from(this.element()[e](o));
		}, function(t) {
			return this.element()[e](a.at(t).valueOf()), a.done();
		}, function(t) {
			let n = Xi(Object.keys(t), o);
			if (n.length && a.from() != null) {
				let t = this.element()[e](n), r = new wi(a.from()).valueOf();
				Object.assign(r, t), a.from(r);
			}
			let r = new wi(a.to()).valueOf();
			Object.assign(r, t), a.to(r), o = Object.keys(r);
		}), this._rememberMorpher(e, a), this;
	},
	zoom(e, t) {
		if (this._tryRetarget("zoom", e, t)) return this;
		let n = new bi(this._stepper).to(new P(e));
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
		let r = M.isMatrixLike(e);
		n = e.affine == null ? n ?? !r : e.affine;
		let i = new bi(this._stepper).type(n ? Si : M), a = n ? new bi(this._stepper).type(M) : i, o, s, c, l, u;
		function d() {
			s ||= this.element(), o ||= bt(e, s), u = new M(t ? void 0 : s), s._addRunner(this);
		}
		function f(d) {
			t || this.clearTransform();
			let { x: f, y: p } = new j(o).transform(s._currentTransform(this)), m = {
				...e,
				origin: [f, p]
			};
			m.relative === !0 && delete m.relative;
			let h = new M(m), g = this._isDeclarative && c ? c : u, _ = i;
			if (n) {
				let e = h.decompose(f, p), t = g.decompose(f, p);
				if (!new Si(e).toArray().concat(new Si(t).toArray()).every(Number.isFinite)) _ = a;
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
			return l = ee.rotate, c = new M(ee), this.addTransform(c), s._addRunner(this), _.done();
		}
		function p(t) {
			o = bt(t, s), e = { ...t };
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
		if (t = new P(t), this._tryRetarget(e, t)) return this;
		let n = new bi(this._stepper).to(t), r = null;
		return this.queue(function() {
			r = this.element()[e](), n.from(r), n.to(r + t);
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}, function(e) {
			n.to(r + new P(e));
		}), this._rememberMorpher(e, n), this;
	},
	_queueObject(e, t) {
		if (this._tryRetarget(e, t)) return this;
		let n = new bi(this._stepper).to(t);
		return this.queue(function() {
			n.from(this.element()[e]());
		}, function(t) {
			return this.element()[e](n.at(t)), n.done();
		}), this._rememberMorpher(e, n), this;
	},
	_queueNumber(e, t) {
		return this._queueObject(e, new P(t));
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
		let n = yt(this._element, e, t);
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
		let i = new bi(this._stepper).type(this._element.MorphArray).to(e);
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
		return this._queueObject("viewbox", new N(e, t, n, r));
	},
	update(e) {
		return typeof e == "object" ? (e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", e.offset), this) : this.update({
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		});
	}
}), k(Hi, {
	rx: Or,
	ry: kr,
	from: zr,
	to: Br
}), O(Hi, "Runner");
var Zi = class extends wr {
	constructor(e, t = e) {
		super(E("svg", e), t), this.namespace();
	}
	defs() {
		return this.isRoot() ? D(this.node.querySelector("defs")) || this.put(new Tr()) : this.root().defs();
	}
	isRoot() {
		return !this.node.parentNode || !(this.node.parentNode instanceof w.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
	}
	namespace() {
		return this.isRoot() ? this.attr({
			xmlns: wt,
			version: "1.1"
		}).attr("xmlns:xlink", Dt, Et) : this.root().namespace();
	}
	removeNamespace() {
		return this.attr({
			xmlns: null,
			version: null
		}).attr("xmlns:xlink", null, Et).attr("xmlns:svgjs", null, Et);
	}
	root() {
		return this.isRoot() ? this : super.root();
	}
};
v({ Container: { nested: A(function() {
	return this.put(new Zi());
}) } }), O(Zi, "Svg", !0);
var Qi = class extends wr {
	constructor(e, t = e) {
		super(E("symbol", e), t);
	}
};
v({ Container: { symbol: A(function() {
	return this.put(new Qi());
}) } }), O(Qi, "Symbol");
var $i = /* @__PURE__ */ m({
	amove: () => ua,
	ax: () => ca,
	ay: () => la,
	build: () => da,
	center: () => sa,
	cx: () => aa,
	cy: () => oa,
	length: () => ta,
	move: () => ia,
	plain: () => ea,
	x: () => na,
	y: () => ra
});
function ea(e) {
	return this._build === !1 && this.clear(), this.node.appendChild(w.document.createTextNode(e)), this;
}
function ta() {
	return this.node.getComputedTextLength();
}
function na(e, t = this.bbox()) {
	return e == null ? t.x : this.attr("x", this.attr("x") + e - t.x);
}
function ra(e, t = this.bbox()) {
	return e == null ? t.y : this.attr("y", this.attr("y") + e - t.y);
}
function ia(e, t, n = this.bbox()) {
	return this.x(e, n).y(t, n);
}
function aa(e, t = this.bbox()) {
	return e == null ? t.cx : this.attr("x", this.attr("x") + e - t.cx);
}
function oa(e, t = this.bbox()) {
	return e == null ? t.cy : this.attr("y", this.attr("y") + e - t.cy);
}
function sa(e, t, n = this.bbox()) {
	return this.cx(e, n).cy(t, n);
}
function ca(e) {
	return this.attr("x", e);
}
function la(e) {
	return this.attr("y", e);
}
function ua(e, t) {
	return this.ax(e).ay(t);
}
function da(e) {
	return this._build = !!e, this;
}
var fa = class extends Er {
	constructor(e, t = e) {
		super(E("text", e), t), this.dom.leading = this.dom.leading ?? new P(1.3), this._rebuild = !0, this._build = !1;
	}
	leading(e) {
		return e == null ? this.dom.leading : (this.dom.leading = new P(e), this.rebuild());
	}
	rebuild(e) {
		if (typeof e == "boolean" && (this._rebuild = e), this._rebuild) {
			let e = this, t = 0, n = this.dom.leading;
			this.each(function(r) {
				if (St(this.node)) return;
				let i = w.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new P(i);
				this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === "\n" ? t += a : (this.attr("dy", r ? a + t : 0), t = 0));
			}), this.fire("rebuild");
		}
		return this;
	}
	setData(e) {
		return this.dom = e, this.dom.leading = new P(e.leading || 1.3), this;
	}
	writeDataToDom() {
		return super.writeDataToDom({ leading: 1.3 });
	}
	text(e) {
		if (e === void 0) {
			let t = this.node.childNodes, n = 0;
			e = "";
			for (let r = 0, i = t.length; r < i; ++r) t[r].nodeName === "textPath" || St(t[r]) ? r === 0 && (n = r + 1) : (r !== n && t[r].nodeType !== 3 && D(t[r]).dom.newLined === !0 && (e += "\n"), e += t[r].textContent);
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
k(fa, $i), v({ Container: {
	text: A(function(e = "") {
		return this.put(new fa()).text(e);
	}),
	plain: A(function(e = "") {
		return this.put(new fa()).plain(e);
	})
} }), O(fa, "Text");
var pa = class extends Er {
	constructor(e, t = e) {
		super(E("tspan", e), t), this._build = !1;
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
		if (!(e instanceof fa)) return this;
		let t = e.index(this), n = w.window.getComputedStyle(this.node).getPropertyValue("font-size"), r = e.dom.leading * new P(n);
		return this.dy(t ? r : 0).attr("x", e.x());
	}
	text(e) {
		return e == null ? this.node.textContent + (this.dom.newLined ? "\n" : "") : (typeof e == "function" ? (this.clear().build(!0), e.call(this, this), this.build(!1)) : this.plain(e), this);
	}
};
k(pa, $i), v({
	Tspan: { tspan: A(function(e = "") {
		let t = new pa();
		return this._build || this.clear(), this.put(t).text(e);
	}) },
	Text: { newLine: function(e = "") {
		return this.tspan(e).newLine();
	} }
}), O(pa, "Tspan");
var ma = class extends Er {
	constructor(e, t = e) {
		super(E("circle", e), t);
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
		return this.radius(new P(e).divide(2));
	}
};
k(ma, {
	x: Ar,
	y: jr,
	cx: Mr,
	cy: Nr,
	width: Pr,
	height: Fr
}), v({ Container: { circle: A(function(e = 0) {
	return this.put(new ma()).size(e).move(0, 0);
}) } }), O(ma, "Circle");
var ha = class extends wr {
	constructor(e, t = e) {
		super(E("clipPath", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unclip();
		}), super.remove();
	}
	targets() {
		return qn(this.node, "clip-path");
	}
};
v({
	Container: { clip: A(function() {
		return this.defs().put(new ha());
	}) },
	Element: {
		clipper() {
			return this.reference("clip-path");
		},
		clipWith(e) {
			let t = e instanceof ha ? e : this.parent().clip().add(e);
			return this.attr("clip-path", "url(#" + t.id() + ")");
		},
		unclip() {
			return this.attr("clip-path", null);
		}
	}
}), O(ha, "ClipPath");
var ga = class extends _r {
	constructor(e, t = e) {
		super(E("foreignObject", e), t);
	}
};
v({ Container: { foreignObject: A(function(e, t) {
	return this.put(new ga()).size(e, t);
}) } }), O(ga, "ForeignObject");
var _a = /* @__PURE__ */ m({
	dmove: () => va,
	dx: () => ya,
	dy: () => ba,
	height: () => xa,
	move: () => Sa,
	size: () => Ca,
	width: () => wa,
	x: () => Ta,
	y: () => Ea
});
function va(e, t) {
	return this.children().forEach((n) => {
		let r;
		try {
			r = n.node instanceof Ot().SVGSVGElement ? new N(n.attr([
				"x",
				"y",
				"width",
				"height"
			])) : n.bbox();
		} catch {
			return;
		}
		let i = new M(n), a = i.translate(e, t).transform(i.inverse()), o = new j(r.x, r.y).transform(a);
		n.dmove(o.x - r.x, o.y - r.y);
	}), this;
}
function ya(e) {
	return this.dmove(e, 0);
}
function ba(e) {
	return this.dmove(0, e);
}
function xa(e, t = this.bbox()) {
	return e == null ? t.height : this.size(t.width, e, t);
}
function Sa(e = 0, t = 0, n = this.bbox()) {
	let r = e - n.x, i = t - n.y;
	return this.dmove(r, i);
}
function Ca(e, t, n = this.bbox()) {
	let r = yt(this, e, t, n), i = r.width / n.width, a = r.height / n.height;
	return this.children().forEach((e) => {
		let t = new j(n).transform(new M(e).inverse());
		e.scale(i, a, t.x, t.y);
	}), this;
}
function wa(e, t = this.bbox()) {
	return e == null ? t.width : this.size(e, t.height, t);
}
function Ta(e, t = this.bbox()) {
	return e == null ? t.x : this.move(e, t.y, t);
}
function Ea(e, t = this.bbox()) {
	return e == null ? t.y : this.move(t.x, e, t);
}
var Da = class extends wr {
	constructor(e, t = e) {
		super(E("g", e), t);
	}
};
k(Da, _a), v({ Container: { group: A(function() {
	return this.put(new Da());
}) } }), O(Da, "G");
var Oa = class extends wr {
	constructor(e, t = e) {
		super(E("a", e), t);
	}
	target(e) {
		return this.attr("target", e);
	}
	to(e) {
		return this.attr("href", e, Dt);
	}
};
k(Oa, _a), v({
	Container: { link: A(function(e) {
		return this.put(new Oa()).to(e);
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
			return t || (t = new Oa(), this.wrap(t)), typeof e == "function" ? e.call(t, t) : t.to(e), this;
		},
		linker() {
			let e = this.parent();
			return e && e.node.nodeName.toLowerCase() === "a" ? e : null;
		}
	}
}), O(Oa, "A");
var ka = class extends wr {
	constructor(e, t = e) {
		super(E("mask", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unmask();
		}), super.remove();
	}
	targets() {
		return qn(this.node, "mask");
	}
};
v({
	Container: { mask: A(function() {
		return this.defs().put(new ka());
	}) },
	Element: {
		masker() {
			return this.reference("mask");
		},
		maskWith(e) {
			let t = e instanceof ka ? e : this.parent().mask().add(e);
			return this.attr("mask", "url(#" + t.id() + ")");
		},
		unmask() {
			return this.attr("mask", null);
		}
	}
}), O(ka, "Mask");
var Aa = class extends _r {
	constructor(e, t = e) {
		super(E("stop", e), t);
	}
	update(e) {
		return (typeof e == "number" || e instanceof P) && (e = {
			offset: arguments[0],
			color: arguments[1],
			opacity: arguments[2]
		}), e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", new P(e.offset)), this;
	}
};
v({ Gradient: { stop: function(e, t, n) {
	return this.put(new Aa()).update(e, t, n);
} } }), O(Aa, "Stop");
function ja(e, t) {
	if (!e) return "";
	if (!t) return e;
	let n = e + "{";
	for (let e in t) n += _t(e) + ":" + t[e] + ";";
	return n += "}", n;
}
var Ma = class extends _r {
	constructor(e, t = e) {
		super(E("style", e), t);
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
		return this.addText(ja(e, t));
	}
};
v("Dom", {
	style(e, t) {
		return this.put(new Ma()).rule(e, t);
	},
	fontface(e, t, n) {
		return this.put(new Ma()).font(e, t, n);
	}
}), O(Ma, "Style");
var Na = class extends fa {
	constructor(e, t = e) {
		super(E("textPath", e), t);
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
v({
	Container: { textPath: A(function(e, t) {
		return e instanceof fa || (e = this.text(e)), e.path(t);
	}) },
	Text: {
		path: A(function(e, t = !0) {
			let n = new Na();
			e instanceof Oi || (e = this.defs().path(e)), n.attr("href", "#" + e, Dt);
			let r;
			if (t) for (; r = this.node.firstChild;) n.node.appendChild(r);
			return this.put(n);
		}),
		textPath() {
			return this.findOne("textPath");
		}
	},
	Path: {
		text: A(function(e) {
			return e instanceof fa || (e = new fa().addTo(this.parent()).text(e)), e.path(this);
		}),
		targets() {
			return qn(this.node, "href", "textPath");
		}
	}
}), Na.prototype.MorphArray = vi, O(Na, "TextPath");
var Pa = class extends Er {
	constructor(e, t = e) {
		super(E("use", e), t);
	}
	use(e, t) {
		return this.attr("href", (t || "") + "#" + e, Dt);
	}
};
v({ Container: { use: A(function(e, t) {
	return this.put(new Pa()).use(e, t);
}) } }), O(Pa, "Use");
var Fa = T;
k([
	Zi,
	Qi,
	Ur,
	Hr,
	Qr
], y("viewbox")), k([
	Zr,
	Ii,
	Fi,
	Oi
], y("marker")), k(fa, y("Text")), k(Oi, y("Path")), k(Tr, y("Defs")), k([fa, pa], y("Tspan")), k([
	Li,
	Ir,
	Vr,
	Hi
], y("radius")), k(sr, y("EventTarget")), k(gr, y("Dom")), k(_r, y("Element")), k(Er, y("Shape")), k([wr, Lr], y("Container")), k(Vr, y("Gradient")), k(Hi, y("Runner")), Hn.extend(te()), Ei([
	P,
	An,
	N,
	M,
	dr,
	Wr,
	vi,
	j
]), Di();
// node_modules/@svgdotjs/svg.draggable.js/dist/svg.draggable.mjs
var Ia = (e) => (e.changedTouches && (e = e.changedTouches[0]), {
	x: e.clientX,
	y: e.clientY
}), La = class {
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
		e.preventDefault(), e.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Ia(e));
		let n = (t ? "mousemove" : "touchmove") + ".drag", r = (t ? "mouseup" : "touchend") + ".drag";
		ir(window, n, this.drag, this, { passive: !1 }), ir(window, r, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", {
			event: e,
			handler: this,
			box: this.box
		});
	}
	drag(e) {
		let { box: t, lastClick: n } = this, r = this.el.point(Ia(e)), i = r.x - n.x, a = r.y - n.y;
		if (!i && !a) return t;
		let o = t.x + i, s = t.y + a;
		this.box = new N(o, s, t.w, t.h), this.lastClick = r, !this.el.dispatch("dragmove", {
			event: e,
			handler: this,
			box: this.box,
			dx: i,
			dy: a
		}).defaultPrevented && this.move(o, s);
	}
	move(e, t) {
		this.el.type === "svg" ? Da.prototype.move.call(this.el, e, t) : this.el.move(e, t);
	}
	endDrag(e) {
		this.drag(e), this.el.fire("dragend", {
			event: e,
			handler: this,
			box: this.box
		}), ar(window, "mousemove.drag"), ar(window, "touchmove.drag"), ar(window, "mouseup.drag"), ar(window, "touchend.drag"), this.init(!0);
	}
};
k(_r, { draggable(e = !0) {
	return (this.remember("_draggable") || new La(this)).init(e), this;
} });
// src/errors.ts
var Ra = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, I = class extends Ra {}, L = class extends I {
	option;
	constructor(e, t, n) {
		super(t, n), this.option = e;
	}
}, R = class extends Ra {}, za = class extends Ra {}, Ba = class extends Ra {}, Va = .38;
function Ha(e, t) {
	let n = Math.hypot(e, t);
	return n === 0 ? "tc" : `${t / n > Va ? "b" : t / n < -.38 ? "t" : "m"}${e / n > Va ? "r" : e / n < -.38 ? "l" : "c"}`;
}
function Ua(e, t, n) {
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
		alignement: Ha(i.x, i.y)
	};
}
function Wa(e, t, n) {
	if (typeof e == "string") return;
	let r = Object.keys(t);
	for (let t of e) if (typeof t != "string") {
		if (!r.includes(t.field)) throw new R(`The figure "${n}" cannot show the field "${t.field}" in its label: ${r.length === 0 ? "it has none" : `expected ${r.join(", ")}`}`);
		if (!Number.isInteger(t.digits) || t.digits < 0) throw new R(`Invalid number of digits ${t.digits} for the field "${t.field}" of the label of "${n}": expected an integer of 0 or more`);
	}
}
function Ga(e, t) {
	return typeof e == "string" ? e : e.map((e) => {
		if (typeof e == "string") return e;
		let n = t[e.field];
		if (n === void 0) throw new R(`The label cannot show the field "${e.field}"`);
		return n(e.digits);
	}).join("");
}
var Ka = 10;
function qa(e, t, n, r) {
	let [i, a] = e, o = i === "m" ? Ka : 0;
	return {
		x: a === "l" ? t.x - n / 2 - o : a === "r" ? t.x + n / 2 + o : t.x,
		y: i === "t" ? t.y - r / 2 : i === "b" ? t.y + r / 2 : t.y
	};
}
// src/figures/Label/Label.ts
function Ja(e) {
	return e.replace(/[&<>"']/g, (e) => `&#${e.charCodeAt(0)};`);
}
var Ya = class {
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
		if (this._shape instanceof ga) {
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
		let { alignement: e, offset: t, rotate: n } = this._config, { width: r, height: i } = this._size(), a = qa(e, {
			x: this._x,
			y: this._y
		}, r, i);
		this._shape.center(a.x + t.x, a.y - t.y), this.rotate(n), this._applied = this._state();
	}
	_html() {
		return this._config.texConverter ? this.displayName : Ja(this._displayName);
	}
	_style() {
		return `display: block; position: fixed; white-space:nowrap; font-size: ${this._config.size}`;
	}
	_write() {
		this._shape instanceof ga ? (this._shape.clear(), this._shape.add(Fa(`<div style="${this._style()}">${this._html()}</div>`, !0))) : this._shape.text(this._displayName);
	}
	_makeLabel() {
		let e = this._config.asHtml ? this._element.foreignObject(1, 1).attr("style", "overflow:visible") : this._element.text(this._displayName).css("font-size", this._config.size);
		return e.attr("id", `${this._name}-label`), this._shape = e, e instanceof ga && this._write(), e;
	}
}, Xa = [
	"->",
	"x",
	"|"
];
function Za(e, t, n) {
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
function Qa(e, t, n, r = "->") {
	let i = (e) => e.replace(/[^\w-]/g, "_"), a = (t) => e.defs().findOne(`#${t}`);
	if (r === "x") {
		let r = i(`marker-x-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M0,0 L${n},${n} M${n},0 L0,${n}`).stroke({
				color: "black",
				width: 1
			});
		}).attr(Za(r, n));
	}
	if (r === "|") {
		let r = i(`marker-bar-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M${n / 2},${n} L${n / 2},0`).stroke({
				color: "black",
				width: 1
			});
		}).attr(Za(r, n));
	}
	let o = i(`marker-${t}-${n}`);
	return a(o) ?? e.marker(n * 1.2, n * 1.2, (e) => {
		e.path(`M1,0 L1,${n}, L${n * 1.2},${n / 2} L1,0z`).stroke({
			color: "black",
			width: 1
		});
	}).attr(Za(o, n, {
		refX: n,
		refY: n / 2
	}));
}
// src/figures/AbstractFigure/AbstractFigure.constraints.ts
function $a(t, n) {
	if (!e(t) || !Number.isFinite(t.x) || !Number.isFinite(t.y)) throw new R(`${n} expects a finite number or a {x, y} of finite numbers, got ${JSON.stringify(t)}`);
	return t;
}
// src/calculus/numbers.ts
function z(e, t = 10) {
	let n = 10 ** t, r = e * n;
	return !Number.isFinite(r) || Math.abs(r) >= 2 ** 53 - 1 ? e : Math.round(r) / n + 0;
}
function eo(e) {
	if (typeof e == "number") return e;
	let t = e.split("/"), n = t.map((e) => e.trim() === "" ? NaN : +e);
	if (t.length > 2 || n.some(isNaN)) throw new I(`Cannot parse "${e}" as a number or a fraction`);
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
var to = class t {
	x;
	y;
	constructor(t, n) {
		if (e(t) && e(n)) this.x = n.x - t.x, this.y = n.y - t.y;
		else if (e(t) && n === void 0) this.x = t.x, this.y = t.y;
		else if (typeof t == "number" && typeof n == "number") this.x = t, this.y = n;
		else throw new R(`Cannot build a vector from ${JSON.stringify(t)} and ${JSON.stringify(n)}`);
	}
	get norm() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	get normal() {
		return new t(this.y, -this.x);
	}
	get unit() {
		let e = this.norm;
		return new t(this.x / e, this.y / e);
	}
	static scalarProduct(e, t) {
		return e.x * t.x + e.y * t.y;
	}
	projection(e) {
		let n = t.scalarProduct(this, e) / (e.x * e.x + e.y * e.y);
		return new t(e.x * n, e.y * n);
	}
	rotate(e) {
		let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t), i = this.x, a = this.y;
		return this.x = n * i - r * a, this.y = r * i + n * a, this;
	}
	add(e) {
		return new t(this.x + e.x, this.y + e.y);
	}
	setLength(e) {
		let t = e / this.norm;
		return this.x *= t, this.y *= t, this;
	}
}, no = class {
	A;
	director;
	constructor(e, t) {
		this.A = e, this.director = t instanceof to ? t : new to(e, t);
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
		let t = this.director, n = new to(this.A, e), r = to.scalarProduct(t, n) / to.scalarProduct(t, t);
		return {
			x: this.A.x + t.x * r,
			y: this.A.y + t.y * r
		};
	}
};
function ro(e, t, n, r) {
	let i = -r * Math.PI / 180;
	return {
		x: e + n * Math.cos(i),
		y: t + n * Math.sin(i)
	};
}
function io(e, t) {
	let n = Math.atan2(-(t.y - e.y), t.x - e.x) * 180 / Math.PI;
	return (n < 0 ? n + 360 : n) + 0;
}
// src/calculus/coordinates.ts
function U(n, r, i) {
	if (typeof n == "number") return n * (i === "y" ? r.axis.y.y : r.axis.x.x);
	if (t(n)) {
		let e = i === "y" ? r.origin.y : r.origin.x, t = i === "y" ? r.axis.y.y : r.axis.x.x, a = e + n.min * t, o = e + n.max * t;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (e(n)) return {
		x: r.origin.x + n.x * r.axis.x.x + n.y * r.axis.y.x,
		y: r.origin.y + n.x * r.axis.x.y + n.y * r.axis.y.y
	};
	throw new R(`Cannot convert ${JSON.stringify(n)} to pixels`);
}
function W(n, r, i) {
	if (typeof n == "number") return n / (i === "y" ? r.axis.y.y : r.axis.x.x);
	if (t(n)) {
		let e = i === "y" ? r.origin.y : r.origin.x, t = i === "y" ? r.axis.y.y : r.axis.x.x, a = (n.min - e) / t, o = (n.max - e) / t;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (e(n)) {
		let { x: e, y: t } = r.axis.x, { x: i, y: a } = r.axis.y, o = e * a - i * t;
		if (o === 0) throw new Ba("The axes of the coordinate system are collinear: a point cannot be converted to coordinates");
		let s = n.x - r.origin.x, c = n.y - r.origin.y;
		return {
			x: (s * a - c * i) / o,
			y: (c * e - s * t) / o
		};
	}
	throw new R(`Cannot convert ${JSON.stringify(n)} to coordinates`);
}
// src/calculus/computeCircle.ts
var ao = 1e-12, oo = 1e-9;
function so() {
	return {
		center: B(),
		radius: NaN
	};
}
function co(e, t, n) {
	let r = t.x - e.x, i = t.y - e.y, a = n.x - e.x, o = n.y - e.y, s = 2 * (r * o - i * a);
	if (!(Math.abs(s) > ao * Math.hypot(r, i) * Math.hypot(a, o))) return so();
	let c = r * r + i * i, l = a * a + o * o, u = (o * c - i * l) / s, d = (r * l - a * c) / s;
	return {
		center: {
			x: e.x + u,
			y: e.y + d
		},
		radius: Math.hypot(u, d)
	};
}
function lo(e, t, n) {
	let r = H(t, n), i = H(n, e), a = H(e, t), o = r + i + a, s = Math.abs((t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x));
	return s > ao * o * o ? {
		center: {
			x: (r * e.x + i * t.x + a * n.x) / o,
			y: (r * e.y + i * t.y + a * n.y) / o
		},
		radius: s / o
	} : so();
}
function uo(e, t) {
	let n = H(e, t) / 2;
	return n > 0 ? {
		center: {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		},
		radius: n
	} : so();
}
function fo(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = Math.hypot(r, i);
	if (!(a > 0)) return so();
	let o = Math.abs(r * (e.y - t.y) - i * (e.x - t.x)) / a;
	return o > oo ? {
		center: {
			x: e.x,
			y: e.y
		},
		radius: o
	} : so();
}
// src/calculus/computeDrag.ts
function po(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function mo(e, t, n) {
	let { x: r, y: i } = e;
	if (t.along) {
		let { axis: e, keep: n } = t.along;
		e === "x" ? i = n.y : r = n.x;
	}
	if (t.step) {
		let e = W({
			x: r,
			y: i
		}, n);
		({x: r, y: i} = U({
			x: Math.round(e.x / t.step.x) * t.step.x,
			y: Math.round(e.y / t.step.y) * t.step.y
		}, n));
	}
	if (t.bounds?.x) {
		let { min: e, max: i } = U(t.bounds.x, n, "x");
		r = po(r, e, i);
	}
	if (t.bounds?.y) {
		let { min: e, max: r } = U(t.bounds.y, n, "y");
		i = po(i, e, r);
	}
	return {
		x: r,
		y: i
	};
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
	let r = new to(e, t), i = new to(e, n), a = {
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
			if (n === void 0) throw new R(`No value for the variable "${e}"`);
			return n;
		}
	};
}
var Lo = /^(?:\d+\.?\d*|\.\d+)/;
function Ro(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e[n];
		if (/\s/.test(r)) n++;
		else if (/[\d.]/.test(r)) {
			let r = Lo.exec(e.slice(n));
			if (r === null) throw new I(`Cannot parse "${e}": invalid number at position ${n}`);
			t.push({
				kind: "number",
				text: r[0]
			}), n += r[0].length;
		} else if (/[a-zA-Z]/.test(r)) {
			let i = ko.find((t) => e.startsWith(t + "(", n));
			i === void 0 ? e.startsWith("pi", n) ? (t.push({
				kind: "constant",
				text: "pi"
			}), n += 2) : (t.push({
				kind: r === "e" ? "constant" : "variable",
				text: r
			}), n++) : (t.push({
				kind: "function",
				text: i
			}), n += i.length);
		} else if ("+-*/%^".includes(r)) t.push({
			kind: "operator",
			text: r
		}), n++;
		else if (r === "(" || r === ")" || r === ",") t.push({
			kind: r,
			text: r
		}), n++;
		else throw new I(`Cannot parse "${e}": unexpected character "${r}" at position ${n}`);
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
		throw new I(`Cannot parse "${this._expression}": ${e}`);
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
	let t = (t, n) => new I(`Cannot parse "${e}" as the equation of a line: ${t}`, { cause: n }), n = e.split("=");
	if (n.length !== 2) throw t("expected one \"=\"");
	let r;
	try {
		r = new wo(`(${n[0]})-(${n[1]})`);
	} catch (e) {
		throw t(e instanceof Error ? e.message : "malformed", e);
	}
	let i = (e, n) => {
		try {
			return r.evaluate({
				x: e,
				y: n
			});
		} catch (e) {
			throw e instanceof R ? t("only x and y are allowed", e) : e;
		}
	}, a = i(0, 0), o = i(1, 0) - a, s = i(0, 1) - a, c = Bo.every(([e, t]) => {
		let n = o * e + s * t + a;
		return Math.abs(i(e, t) - n) <= 1e-8 * (1 + Math.abs(n));
	});
	if (![
		o,
		s,
		a
	].every(Number.isFinite) || !c) throw t("it is not linear in x and y");
	if (Math.abs(o) < 1e-9 && Math.abs(s) < 1e-9) throw t("x and y are both missing");
	return {
		a: o,
		b: s,
		c: a
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
	let { x: r, y: i } = e, { x: a, y: o } = t, { x: s, y: c } = n, l = (r - a) * (r - s) * (a - s);
	if (l === 0) throw new Ba("A parabola through three points needs three different abscissas");
	return {
		a: (i * (a - s) + o * (s - r) + c * (r - a)) / l,
		b: (i * (s ** 2 - a ** 2) + o * (r ** 2 - s ** 2) + c * (a ** 2 - r ** 2)) / l,
		c: (i * (a * s * (a - s)) + o * (s * r * (s - r)) + c * (r * a * (r - a))) / l
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
function G(e) {
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
		n.push(`${e ? "L" : "M"} ${G(i.x)} ${G(i.y)}`), r = i;
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
	throw new R(`A Bézier curve of control points has 3 or 4 points, got ${e.length}`);
}
function rs(e, t = !1) {
	if (e.length === 0) return "M 0 0";
	let n = (e) => `${G(e.x)},${G(e.y)}`, r = e.map(({ control1: e, control2: t, end: r }) => `C ${n(e)} ${n(t)} ${n(r)}`);
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
	let o = io(e, a);
	if ((i ? ds(o, n) : ds(n, o)) <= r) return ro(e.x, e.y, t, o);
	let s = ro(e.x, e.y, t, n), c = ro(e.x, e.y, t, i ? n - r : n + r);
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
// src/calculus/computeFillBetween.ts
var xs = 1e-9;
function Ss(e, t, n, r, i, a) {
	let { bound: o } = a, s = (e) => V(e) && Math.abs(e.x) <= o && Math.abs(e.y) <= o, c = [r.min, r.max];
	for (let n of t === null ? [e] : [e, t]) for (let e of Yo(n, r.min, r.max, a)) V(e) && c.push(Math.min(r.max, Math.max(r.min, i(e.x))));
	c.sort((e, t) => e - t);
	let l = c.filter((e, t) => t === 0 || e - c[t - 1] > xs), u = [], d = {
		first: [],
		second: []
	}, f = () => {
		d.first.length >= 2 && u.push(d), d = {
			first: [],
			second: []
		};
	};
	for (let r of l) {
		let i = e(r), a = t === null ? {
			x: i.x,
			y: n
		} : t(r);
		if (!s(i) || !s(a)) {
			f();
			continue;
		}
		let c = d.first.length - 1;
		c >= 0 && (Math.abs(i.y - d.first[c].y) > o || Math.abs(a.y - d.second[c].y) > o) && f(), d.first.push(i), d.second.push(a);
	}
	return f(), u;
}
function Cs(e) {
	if (e.length === 0) return "M 0 0";
	let t = (e) => `${G(e.x)} ${G(e.y)}`;
	return e.map(({ first: e, second: n }) => `M ${e.map(t).join(" L ")} L ${[...n].reverse().map(t).join(" L ")} Z`).join(" ");
}
function ws(e) {
	let t = 0;
	for (let { first: n, second: r } of e) for (let e = 1; e < n.length; e++) {
		let i = n[e].x - n[e - 1].x, a = r[e - 1].y - n[e - 1].y, o = r[e].y - n[e].y;
		a * o >= 0 ? t += i * (Math.abs(a) + Math.abs(o)) / 2 : t += i * (a * a + o * o) / (2 * (Math.abs(a) + Math.abs(o)));
	}
	return t;
}
// src/calculus/computeGrid.ts
var Ts = 1e-9;
function Es(e, t, n, r, i, a, o = 0) {
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
	].map(([t, n]) => (t - e.x) * c.x + (n - e.y) * c.y), d = [Math.min(...u) / l, Math.max(...u) / l], f = Math.ceil(Math.min(...d) - Ts), p = Math.floor(Math.max(...d) + Ts), m = [];
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
function Ds(e, t) {
	let n = Math.max(e.min, t.min), r = Math.min(e.max, t.max);
	return n <= r ? {
		min: n,
		max: r
	} : null;
}
function Os(e, t, n, r) {
	let i = Ds(e, t);
	if (i === null) return [];
	let a = n / r, o = Math.ceil(i.min / a - Ts), s = Math.floor(i.max / a + Ts), c = [];
	for (let e = o; e <= s; e++) (r === 1 || e % r !== 0) && c.push(z(e * a));
	if (r === 1) for (let n of [e.min, e.max]) {
		let e = n >= t.min && n <= t.max, r = c.some((e) => Math.abs(e - n) <= Ts * Math.max(1, Math.abs(n)));
		e && !r && c.push(n);
	}
	return c.sort((e, t) => e - t);
}
function ks(e, t, n, r, i, a = 1) {
	let o = Ds(e.x, t.x), s = Ds(e.y, t.y);
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
	}, l = (e) => !(c(e) >= i), u = l("y") ? [] : Os(e.y, t.y, n.y, a).map((e) => [r({
		x: o.min,
		y: e
	}), r({
		x: o.max,
		y: e
	})]), d = l("x") ? [] : Os(e.x, t.x, n.x, a).map((e) => [r({
		x: e,
		y: s.min
	}), r({
		x: e,
		y: s.max
	})]);
	return [...u, ...d];
}
// src/calculus/computeLayout.ts
var As = 28.45274 / .75, js = 800, Ms = 600;
function Ns(e) {
	return Object.fromEntries(Object.entries(e ?? {}).filter(([, e]) => e !== void 0));
}
function Ps(e) {
	let t = e?.width ?? js, n = e?.height ?? Ms, r = {
		width: t,
		height: n,
		origin: { ...e?.origin ?? {
			x: t / 2,
			y: n / 2
		} },
		system: e?.system ?? i.CARTESIAN_2D,
		axis: {
			x: { ...e?.axis?.x ?? {
				x: 37.93698666666666,
				y: 0
			} },
			y: { ...e?.axis?.y ?? {
				x: 0,
				y: -37.93698666666666
			} }
		}
	};
	return Fs(r), {
		config: r,
		display: {
			grid: !0,
			axis: !0,
			...Ns(e?.display)
		}
	};
}
function Fs(e) {
	let t = (e, t, n) => new R(`Invalid ${e} ${typeof t == "number" ? String(t) : JSON.stringify(t)} for the graph: expected ${n}`), n = ({ x: e, y: t }) => Number.isFinite(e) && Number.isFinite(t);
	for (let n of ["width", "height"]) if (!(Number.isFinite(e[n]) && e[n] > 0)) throw t(n, e[n], "a finite number greater than 0");
	if (!n(e.origin)) throw t("origin", e.origin, "a position with finite coordinates");
	for (let r of ["x", "y"]) {
		let i = e.axis[r];
		if (!n(i) || Math.hypot(i.x, i.y) === 0) throw t(`vector of the axis ${r}`, i, "a finite vector that is not null");
	}
	if (e.system !== i.CARTESIAN_2D) throw new za(`The coordinate system "${e.system}" cannot be drawn yet`);
}
function Is({ x: e, y: t, unit: n }) {
	let r = n.x * As, i = n.y * As;
	return {
		width: (e.max - e.min) * r,
		height: (t.max - t.min) * i,
		origin: {
			x: -e.min * r,
			y: t.max * i
		},
		axis: {
			x: {
				x: r,
				y: 0
			},
			y: {
				x: 0,
				y: -i
			}
		}
	};
}
var Ls = 1e-9;
function Rs(e, t, n, r) {
	let i = Math.abs(r.x.y) <= Ls && Math.abs(r.y.x) <= Ls, a = (t) => ({
		A: { ...e },
		displaced: !1,
		side: t
	});
	if (!i) return {
		x: a("right"),
		y: a("left")
	};
	let o = (e, r) => -r.y * (t / 2 - e.x) + r.x * (n / 2 - e.y) > 0 ? "right" : "left", s = (e, t) => e < 0 ? 2 : t - 2;
	return {
		x: e.y < 0 || e.y > n ? (() => {
			let t = {
				x: e.x,
				y: s(e.y, n)
			};
			return {
				A: t,
				displaced: !0,
				side: o(t, r.x)
			};
		})() : a("right"),
		y: e.x < 0 || e.x > t ? (() => {
			let n = {
				x: s(e.x, t),
				y: e.y
			};
			return {
				A: n,
				displaced: !0,
				side: o(n, r.y)
			};
		})() : a("left")
	};
}
// src/calculus/computePath.ts
var zs = {
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
}, Bs = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y, Vs = /[A-Za-z]/;
function Hs(e, t, n, r, i, a, o) {
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
	let g = p * p, _ = m * m, ee = g * _ - g * f * f - _ * d * d, v = (i === a ? -1 : 1) * Math.sqrt(Math.max(0, ee / (g * f * f + _ * d * d))), y = v * p * f / m, te = -v * m * d / p, b = {
		x: c * y - l * te + (e.x + o.x) / 2,
		y: l * y + c * te + (e.y + o.y) / 2
	}, x = (e, t, n, r) => Math.atan2(e * r - t * n, e * n + t * r), ne = x(1, 0, (d - y) / p, (f - te) / m), S = x((d - y) / p, (f - te) / m, (-d - y) / p, (-f - te) / m);
	!a && S > 0 ? S -= 2 * Math.PI : a && S < 0 && (S += 2 * Math.PI);
	let re = (e) => ({
		x: b.x + p * Math.cos(e) * c - m * Math.sin(e) * l,
		y: b.y + p * Math.cos(e) * l + m * Math.sin(e) * c
	}), C = (e) => ({
		x: -p * Math.sin(e) * c - m * Math.cos(e) * l,
		y: -p * Math.sin(e) * l + m * Math.cos(e) * c
	}), ie = Math.max(1, Math.ceil(Math.abs(S) / (Math.PI / 2) - 1e-9)), ae = S / ie, oe = 4 / 3 * Math.tan(ae / 4);
	return Array.from({ length: ie }, (e, t) => {
		let n = ne + t * ae, r = n + ae, i = re(n), a = t === ie - 1 ? o : re(r), s = C(n), c = C(r);
		return {
			type: "C",
			c1: {
				x: i.x + oe * s.x,
				y: i.y + oe * s.y
			},
			c2: {
				x: a.x - oe * c.x,
				y: a.y - oe * c.y
			},
			p: a
		};
	});
}
function Us(e) {
	let t = [], n = 0, r = "", i = {
		x: 0,
		y: 0
	}, a = {
		x: 0,
		y: 0
	}, o = null, s = null, c = (t) => {
		throw new I(`Invalid path ${JSON.stringify(e)}: ${t} (at the character ${n + 1})`);
	}, l = () => {
		for (; n < e.length && /\s/.test(e[n]);) n++;
	}, u = () => {
		l(), e[n] === "," && (n++, l());
	}, d = () => {
		u(), Bs.lastIndex = n;
		let t = Bs.exec(e);
		return t === null ? c("expected a number") : (n += t[0].length, +t[0]);
	}, f = () => (u(), e[n] !== "0" && e[n] !== "1" ? c("expected 0 or 1") : (n++, e[n - 1] === "1"));
	for (l(); n < e.length && (l(), !(n >= e.length));) {
		if (Vs.test(e[n])) {
			if (r = e[n], r.toUpperCase() in zs || c(`the command "${r}" does not exist`), t.length === 0 && r !== "M" && r !== "m" && c("a path begins with M"), n++, r === "Z" || r === "z") {
				t.push({ type: "Z" }), i = a, o = s = null, r = "";
				continue;
			}
		} else r === "" && c("expected a command");
		let l = r === r.toLowerCase(), u = r.toUpperCase(), p = l ? i : {
			x: 0,
			y: 0
		}, m = () => ({
			x: p.x + d(),
			y: p.y + d()
		});
		switch (u) {
			case "M":
				i = m(), a = i, t.push({
					type: "M",
					p: i
				}), o = s = null, r = l ? "l" : "L";
				break;
			case "L":
				i = m(), t.push({
					type: "L",
					p: i
				}), o = s = null;
				break;
			case "H":
				i = {
					x: p.x + d(),
					y: i.y
				}, t.push({
					type: "L",
					p: i
				}), o = s = null;
				break;
			case "V":
				i = {
					x: i.x,
					y: p.y + d()
				}, t.push({
					type: "L",
					p: i
				}), o = s = null;
				break;
			case "C": {
				let e = m(), n = m();
				i = m(), t.push({
					type: "C",
					c1: e,
					c2: n,
					p: i
				}), o = n, s = null;
				break;
			}
			case "S": {
				let e = o === null ? i : {
					x: 2 * i.x - o.x,
					y: 2 * i.y - o.y
				}, n = m();
				i = m(), t.push({
					type: "C",
					c1: e,
					c2: n,
					p: i
				}), o = n, s = null;
				break;
			}
			case "Q":
			case "T": {
				let e = u === "T" ? s === null ? i : {
					x: 2 * i.x - s.x,
					y: 2 * i.y - s.y
				} : m(), n = m();
				t.push({
					type: "C",
					c1: {
						x: i.x + 2 / 3 * (e.x - i.x),
						y: i.y + 2 / 3 * (e.y - i.y)
					},
					c2: {
						x: n.x + 2 / 3 * (e.x - n.x),
						y: n.y + 2 / 3 * (e.y - n.y)
					},
					p: n
				}), i = n, s = e, o = null;
				break;
			}
			default: {
				let e = d(), n = d(), r = d(), a = f(), c = f(), l = m();
				t.push(...Hs(i, e, n, r, a, c, l)), i = l, o = s = null;
			}
		}
	}
	return t;
}
function Ws(e, t) {
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
function Gs(e) {
	let t = (e) => `${G(e.x)} ${G(e.y)}`;
	return e.map((e) => {
		switch (e.type) {
			case "M":
			case "L": return `${e.type} ${t(e.p)}`;
			case "C": return `C ${t(e.c1)} ${t(e.c2)} ${t(e.p)}`;
			case "Z": return "Z";
		}
	}).join(" ");
}
function Ks(e) {
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
// src/calculus/computePolygon.ts
function qs(e, t) {
	return t === 0 ? e : qs(t, e % t);
}
function Js(e, t = 1) {
	let n = qs(e, t), r = e / n;
	return Array.from({ length: n }, (n, i) => Array.from({ length: r }, (n, r) => (i + r * t) % e));
}
function Ys(e, t, n, r = 1) {
	return !V(e) || !Number.isFinite(t) || t <= 0 ? null : {
		vertices: Array.from({ length: n }, (r, i) => ro(e.x, e.y, t, 90 + i * 360 / n)),
		cycles: Js(n, r)
	};
}
function Xs(e, t, n, r = 1) {
	let i = V(e) && V(t) ? H(e, t) : NaN;
	if (!Number.isFinite(i) || i === 0) return null;
	let a = Math.PI * r / n, o = io(e, t), s = ro((e.x + t.x) / 2, (e.y + t.y) / 2, i / (2 * Math.tan(a)), o + 90), c = i / (2 * Math.sin(a)), l = io(s, e);
	return {
		vertices: Array.from({ length: n }, (e, t) => ro(s.x, s.y, c, l + t * 360 / n)),
		cycles: Js(n, r)
	};
}
function Zs(e) {
	let t = e.reduce((e, t) => ({
		x: e.x + t.x,
		y: e.y + t.y
	}), {
		x: 0,
		y: 0
	});
	return {
		x: t.x / e.length,
		y: t.y / e.length
	};
}
function Qs(e, t) {
	let n = B(), r = Infinity;
	for (let i of e.cycles) {
		let a = Zo([...i, i[0]].map((t) => e.vertices[t]), t), o = Math.hypot(a.x - t.x, a.y - t.y);
		o < r && (r = o, n = a);
	}
	return n;
}
function $s(e) {
	return e.cycles.map((t) => t.map((t, n) => `${n === 0 ? "M" : "L"} ${G(e.vertices[t].x)} ${G(e.vertices[t].y)}`).join(" ") + " Z").join(" ");
}
// src/calculus/computeRiemann.ts
function ec(e, t, n, r) {
	let i = (t.max - t.min) / n;
	return Array.from({ length: n }, (n, a) => {
		let o = t.min + a * i;
		return {
			x0: o,
			x1: o + i,
			y: e(o + r * i)
		};
	}).filter(({ y: e }) => Number.isFinite(e));
}
function tc(e) {
	return e.reduce((e, { x0: t, x1: n, y: r }) => e + r * (n - t), 0);
}
// src/figures/AbstractFigure/AbstractFigure.tikz.ts
var nc = .75, rc = [
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
], ic = {
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
function ac(e, t = 3) {
	let n = 10 ** t;
	return String(Math.round(e * n) / n);
}
function oc(e) {
	return `${ac(e * nc)}pt`;
}
function sc(e) {
	let t = e.trim().toLowerCase();
	if (t === "transparent" || t === "none") return null;
	let n = null, r = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(t), i = /^#([0-9a-f]{6})$/.exec(t), a = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(t);
	if (r ? n = r.slice(1).map((e) => e + e).join("") : i ? n = i[1] : a?.slice(1).every((e) => +e <= 255) && (n = a.slice(1).map((e) => (+e).toString(16).padStart(2, "0")).join("")), n !== null) {
		let e = `pidraw-${n}`;
		return {
			name: e,
			definition: `\\definecolor{${e}}{HTML}{${n.toUpperCase()}}`
		};
	}
	if (rc.includes(t)) return {
		name: t,
		definition: null
	};
	throw new R(`The color "${e}" has no TikZ equivalent: use a hexadecimal color ('#rrggbb') or one of ${rc.join(", ")}`);
}
function cc(e, t) {
	let { x: n, y: r } = W(e, t);
	return `${ac(n, 5)},${ac(r, 5)}`;
}
function lc(e) {
	let { x: t, y: n } = e.axis;
	return {
		x: oc(Math.hypot(t.x, t.y)),
		y: oc(Math.hypot(n.x, n.y))
	};
}
function uc(e) {
	let { origin: t, width: n, height: r, axis: i } = e, a = [-t.x / i.x.x, (n - t.x) / i.x.x], o = [-t.y / i.y.y, (r - t.y) / i.y.y];
	return {
		x: [Math.min(...a), Math.max(...a)],
		y: [Math.min(...o), Math.max(...o)]
	};
}
function dc(e, t, n = {}) {
	let { x: r, y: i } = uc(e), a = lc(e), { axis: o } = e, s = (e) => z(e, 5), c = [
		"hide axis",
		"scale only axis",
		"trig format plots=deg",
		"unbounded coords=jump",
		`x=${a.x}`,
		`y=${a.y}`,
		`at={(${oc(r[0] * Math.abs(o.x.x))},${oc(i[0] * Math.abs(o.y.y))})}`,
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
function fc(e) {
	return Math.min(1e3, Math.max(2, Math.ceil(4 * e) + 1));
}
function pc(e, t) {
	let { x: n, y: r } = t.axis, i = Math.hypot(n.x, n.y), a = Math.hypot(r.x, r.y), o = z(e / i, 5);
	return Math.abs(i - a) <= 1e-9 * Math.max(i, a) ? `radius=${o}` : `x radius=${o}, y radius=${z(e / a, 5)}`;
}
function mc(e, t, n) {
	let { stroke: r, fill: i } = e, a = /* @__PURE__ */ new Set(), o = [], s = (e) => {
		let t = sc(e);
		return t?.definition && a.add(t.definition), t?.name ?? null;
	}, c = s(r.color);
	o.push(c === null ? "draw=none" : `draw=${c}`), c !== null && (o.push(`line width=${ac(r.width * nc)}pt`), r.opacity < 1 && o.push(`draw opacity=${ac(r.opacity)}`));
	let l = s(i.color);
	if (l !== null && (o.push(`fill=${l}`), i.opacity < 1 && o.push(`fill opacity=${ac(i.opacity)}`)), t !== null) {
		let e = t.split(/[\s,]+/).map((e) => `${ac(+e * nc)}pt`), n = e.length % 2 == 1 ? [...e, ...e] : e;
		o.push(`dash pattern=${n.map((e, t) => `${t % 2 == 0 ? "on" : "off"} ${e}`).join(" ")}`);
	}
	if (n.start !== null || n.end !== null) {
		let e = n.start === null ? "" : ic[n.start].start, t = n.end === null ? "" : ic[n.end].end;
		o.push(`${e}-${t}`);
	}
	return {
		definitions: [...a],
		options: o
	};
}
function hc(e, t) {
	return t && !e.includes("$") ? `$${e}$` : e;
}
function gc(e, t, n) {
	let { alignement: r, offset: i, rotate: a } = e, o = [`${{
		t: "above",
		b: "below",
		m: ""
	}[r[0]]} ${{
		l: "left",
		r: "right",
		c: ""
	}[r[1]]}`.trim()];
	i.x && o.push(`xshift=${ac(i.x * nc)}pt`), i.y && o.push(`yshift=${ac(i.y * nc)}pt`), a && o.push(`rotate=${ac(-a)}`);
	let s = o.filter((e) => e !== "").join(", ");
	return `\\node${s === "" ? "" : `[${s}]`} at (${t}) {${n}};`;
}
var _c = "\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\\usetikzlibrary{arrows.meta}\n\\usepgfplotslibrary{fillbetween}";
function vc(e, t) {
	let { x: n, y: r } = e.axis;
	if (!(Math.abs(n.y) <= bc && Math.abs(r.x) <= bc && n.x > 0 && r.y < 0)) throw new za("A graph can be written in TikZ only if its x axis goes to the right and its y axis goes up");
	if (Math.max(e.width, e.height) * nc > yc) throw new R(`A drawing of ${oc(e.width)} by ${oc(e.height)} is too large for TeX, which holds at most ${yc}pt`);
	let i = lc(e), a = uc(e), o = (e) => z(e, 5), s = `(${o(a.x[0])},${o(a.y[0])}) rectangle (${o(a.x[1])},${o(a.y[1])})`, c = [], l = [], u = () => {
		l.length > 0 && (c.push("\\begin{scope}", `\\clip ${s};`, ...l, "\\end{scope}"), l = []);
	};
	for (let e of t.filter((e) => e !== "")) e.includes("\\begin{axis}") ? (u(), c.push(e)) : l.push(e);
	return u(), [
		`\\begin{tikzpicture}[x=${i.x}, y=${i.y}]`,
		`\\path ${s};`,
		...c,
		"\\end{tikzpicture}"
	].join("\n");
}
var yc = 16383, bc = 1e-9;
// src/figures/AbstractFigure/AbstractFigure.ts
function xc(e) {
	let t = e.split("/"), n = t[0], r = t[1];
	if (t.length > 2 || n.trim() === "") throw new R(`Invalid color "${e}": expected 'color' or 'color/opacity'`);
	if (r === void 0) return {
		color: n,
		opacity: 1
	};
	let i = r.trim() === "" ? NaN : +r;
	if (!(i >= 0 && i <= 1)) throw new R(`Invalid opacity "${r}" in "${e}": expected a number from 0 to 1`);
	return {
		color: n,
		opacity: i
	};
}
function Sc(e) {
	if (e === void 0 || e === !0) return "both";
	if (e === !1) return "none";
	if (e === "start" || e === "end" || e === "both" || e === "none") return e;
	throw new R(`Invalid marker position "${e}": expected 'start', 'end', 'both' or 'none'`);
}
function Cc() {
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
var K = class {
	_context;
	constructor(e, t) {
		this._context = e, this._rootSVG = e.rootSVG, this._name = t, this._static = !1, this._isDraggable = !1, this._animate = null, this._label = null, this._labelContent = t, this._element = this._rootSVG.group().attr("id", this._name), this._appearance = Cc(), this._shape = this._element.path();
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
	_animate;
	get animate() {
		return this._animate;
	}
	set animate(e) {
		if (e !== null) {
			if (!this.animatable) throw new R(`The figure "${this._name}" cannot be animated`);
			if (!Number.isFinite(e.duration) || e.duration <= 0) throw new R(`Invalid duration ${e.duration} for the animation of "${this._name}": expected a number greater than 0`);
			if (!Number.isFinite(e.delay) || e.delay < 0) throw new R(`Invalid delay ${e.delay} for the animation of "${this._name}": expected a number of 0 or more`);
			this._checkAnimation(e);
		}
		this._animate = e;
	}
	animatable = !1;
	followable = !1;
	_checkAnimation() {}
	get graphConfig() {
		return this._context.config;
	}
	hide() {
		return this._element.hide(), this;
	}
	show() {
		return this._element.show(), this;
	}
	resetStyle() {
		return this._appearance = Cc(), this._dasharray = null, this._markerStart = null, this._markerEnd = null, this._shape.attr("transform", null), this._label?.shape.remove(), this._label = null, this._labelContent = this._name, this._animate = null, this._isDraggable = !1, this._element.css("display") === "none" && (this._element.show(), this._element.attr("style") === "" && this._element.attr("style", null)), this;
	}
	strokeable() {
		return [this._shape];
	}
	fillable() {
		return [this._shape];
	}
	fill(e) {
		if (e !== void 0) {
			let t = xc(e);
			this._appearance.fill.color = t.color, this._appearance.fill.opacity = t.opacity;
		}
		return this.fillable().forEach((e) => {
			e.fill(this._appearance.fill);
		}), this;
	}
	stroke(e, t) {
		if (typeof e == "string") {
			let n = xc(e);
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
		if (!/^(none|\d+(\.\d+)?([\s,]+\d+(\.\d+)?)*)$/.test(t)) throw new R(`Invalid dash pattern "${t}": expected 'none' or lengths like '5' or '5 2'`);
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
	addLabel(e, t, n) {
		let r = e ?? this._name;
		return Wa(r, this.labelFields(), this._name), this._label?.shape.remove(), this._labelContent = r, this._label = new Ya(this._element, this._name, {
			text: Ga(r, this.labelFields()),
			asHtml: t ?? !1,
			...n === void 0 ? {} : { texConverter: n }
		}), this.updateLabel(), this._label;
	}
	_setDefined(e) {
		this._element.attr("visibility", e ? null : "hidden");
	}
	_tikzCoordinates(e) {
		return cc(e, this.graphConfig);
	}
	_tikzUnits() {
		return lc(this.graphConfig);
	}
	_tikzView() {
		return uc(this.graphConfig);
	}
	_tikzAxis(e, t = {}) {
		return dc(this.graphConfig, e, t);
	}
	_tikzSamples(e) {
		return fc(e);
	}
	_tikzCurveStyle() {
		let e = this._tikzStyle();
		if (e.options.some((e) => e.startsWith("fill="))) throw new R(`The curve "${this._name}" has a fill, which has no equivalent in TikZ: use a fillbetween`);
		return e;
	}
	_tikzLength(e) {
		return oc(e);
	}
	_tikzRadius(e) {
		return pc(e, this.graphConfig);
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
		return mc(this._appearance, this._dasharray, {
			start: this._markerStart,
			end: this._markerEnd
		});
	}
	_tikzDraw(e) {
		let { definitions: t, options: n } = this._tikzStyle();
		return [...t, `\\draw[${n.join(", ")}] ${e};`].join("\n");
	}
	_tikzLabel(e) {
		return this._label ? gc(this._label.config, e, this._tikzLabelText()) : "";
	}
	_tikzLabelText() {
		return hc(this.computeLabel(), this._label?.asHtml === !0);
	}
	_labelGap = 8;
	updateLabel() {
		return this._label && (this._label.setLabel(this.computeLabel()), this.moveLabel()), this;
	}
	labelFields() {
		return {};
	}
	computeLabel() {
		return this._label ? Ga(this._labelContent, this.labelFields()) : this._name;
	}
	move(e) {
		let t = $a(typeof e == "number" ? {
			x: e,
			y: 0
		} : e, "move"), { x: n, y: r } = this.graphConfig.axis;
		return this._shape.translate(t.x * n.x + t.y * r.x, t.x * n.y + t.y * r.y), this;
	}
	scale(e) {
		let t = $a(typeof e == "number" ? {
			x: e,
			y: e
		} : e, "scale");
		return this._shape.scale(t.x, t.y), this;
	}
	mark(e, t) {
		let n = Sc(e), r = t?.find((e) => typeof e == "number") ?? 10, i = t?.find((e) => typeof e == "string") ?? "->";
		if (!Number.isFinite(r) || r <= 0) throw new R(`Invalid marker size ${r}: expected a number greater than 0`);
		if (!Xa.includes(i)) throw new R(`Invalid marker shape "${i}": expected ${Xa.map((e) => `'${e}'`).join(", ")}`);
		if (n === "none") return this._shape.attr({
			"marker-start": null,
			"marker-end": null
		}), this._markerStart = null, this._markerEnd = null, this;
		if (!("marker" in this._shape)) throw new R(`The figure "${this._name}" cannot have a marker: its shape is a ${this._shape.type}`);
		let a = this._shape, o = Qa(this._rootSVG, this.name, r, i);
		return n !== "end" && (a.marker("start", o), this._markerStart = i), n !== "start" && (a.marker("end", o), this._markerEnd = i), this._styleMarkers(), this;
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
function wc(e, t, n, r) {
	let i = t.filter((t) => e[t] !== void 0);
	if (i.length !== 1) throw new R(`The ${r} "${n}" needs exactly one constraint (${t.join(", ")}), got ${i.length === 0 ? "none" : i.join(", ")}`);
	return i[0];
}
function Tc(e, t, n, r) {
	return wc(t, Object.keys(e), n, r);
}
function Ec(e, t, n, r) {
	let i = e[t];
	return i(n[t], r);
}
var Dc = (e) => typeof e == "object" && !!e && "x" in e && "y" in e && typeof e.x == "number" && typeof e.y == "number";
function q(e, t) {
	for (let [n, r] of Object.entries(e)) if (!Dc(r)) throw new R(`Invalid ${t}: "${n}" is not a position {x, y}`);
	return e;
}
function Oc(e, t) {
	return Object.values(q(Object.fromEntries(e.map((e, t) => [String(t), e])), t));
}
function kc(e, t, n) {
	if (typeof e == "number") {
		if (!Number.isFinite(e) || e <= 0) throw new R(`Invalid radius ${e}: expected a finite number greater than 0`);
		return Math.abs(U(e, n));
	}
	if (typeof e == "object" && "point1" in e) {
		let { point1: t, point2: n } = q(e, "radius");
		return H(t, n);
	}
	return H(t, q({ radius: e }, "radius").radius);
}
// src/figures/Line/Line.constraints.ts
var Ac = ({ point: e, direction: t }) => ({
	start: e,
	direction: t
});
function jc(e, t, n) {
	let r = U(e, n), i = U({
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
function Mc(e, t, n) {
	return jc(W(e, n), {
		x: 1,
		y: t
	}, n);
}
function Nc(e) {
	let t = e;
	if (typeof t == "object" && t && t.math instanceof no) return t.math;
	throw new R(`Invalid line (${typeof t}): expected a line or an axis`);
}
var Pc = 1e-4, Fc = {
	bisector: (e) => Ac("d1" in e ? yo(Nc(e.d1), Nc(e.d2), e.alternative) : vo(e.A, e.B, e.C)),
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
		return jc(Math.abs(r) >= Math.abs(n) ? {
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
	mediator: ({ A: e, B: t }) => Ac(_o(e, t)),
	parallel: ({ to: e, through: t }) => ({
		start: t,
		direction: e.direction
	}),
	perpendicular: ({ to: e, through: t }) => ({
		start: t,
		direction: e.normal
	}),
	slope: ({ A: e, slope: t }, n) => {
		if (!Number.isFinite(t)) throw new R(`Invalid slope ${t}: expected a finite number`);
		return Mc(e, t, n);
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
		let r = W(t, n).x;
		return Mc(t, (e.numExp.evaluate({ x: r + Pc }) - e.numExp.evaluate({ x: r - Pc })) / (2 * Pc), n);
	}
};
function Ic(e, t) {
	return Tc(Fc, e, t, "line");
}
function Lc(e, t, n) {
	return Ec(Fc, e, t, n);
}
// src/figures/Axis/Axis.constraints.ts
var Rc = {
	step: 1,
	labels: "numbers",
	digits: 2,
	size: 6,
	zero: !0
}, zc = 1e3;
function Bc(e, t, n) {
	let r = (r) => new R(`Invalid ${t} ${JSON.stringify(e)} for the graduation of the axis "${n}": expected ${r}`);
	if (typeof e != "object" || !e) throw r("{every, first}");
	let { every: i, first: a } = e;
	if (i !== void 0 && !(typeof i == "number" && Number.isInteger(i) && i >= 1 && i <= 1e3)) throw r(`an integer from 1 to ${zc} for every`);
	if (a !== void 0 && typeof a != "boolean") throw r("true or false for first");
}
function Vc(e) {
	return e.ticks === void 0 ? null : {
		...Rc,
		...e.ticks
	};
}
function Hc(e, t) {
	let n = e.padding;
	if (n !== void 0 && !(typeof n == "number" && Number.isFinite(n) && n >= 0)) throw new R(`Invalid padding ${JSON.stringify(n)} for the axis "${t}": expected a finite number of 0 or more`);
	let r = e.side;
	if (r !== void 0 && r !== "left" && r !== "right") throw new R(`Invalid side ${JSON.stringify(r)} for the axis "${t}": expected 'left' or 'right'`);
	let i = e.name;
	if (i !== void 0 && (typeof i != "string" || i.trim() === "")) throw new R(`Invalid name ${JSON.stringify(i)} for the axis "${t}": expected a text`);
	if (e.ticks === void 0) return;
	let a = e.ticks, o = (e) => typeof e == "number" && Number.isFinite(e) && e > 0, s = (e, n, r) => new R(`Invalid ${e} ${JSON.stringify(r)} for the graduation of the axis "${t}": expected ${n}`);
	if (a.step !== void 0 && !o(a.step)) throw s("step", "a finite number greater than 0", a.step);
	if (a.size !== void 0 && !o(a.size)) throw s("size", "a finite number greater than 0", a.size);
	if (a.labels !== void 0 && a.labels !== "numbers" && a.labels !== "pi") throw s("labels", "'numbers' or 'pi'", a.labels);
	if (a.digits !== void 0 && !(typeof a.digits == "number" && Number.isInteger(a.digits) && a.digits >= 0 && a.digits <= 8)) throw s("digits", "an integer from 0 to 8", a.digits);
	if (a.zero !== void 0 && typeof a.zero != "boolean") throw s("zero", "true or false", a.zero);
	a.marks !== void 0 && Bc(a.marks, "marks", t), a.numbers !== void 0 && a.numbers !== "none" && Bc(a.numbers, "numbers", t);
	let c = Ic(e, t);
	if (c !== "director" && c !== "through") throw new R(`The axis "${t}" is given by ${c}, which has no zero: a graduated axis is given by two points (through) or a point and a vector (director)`);
}
function Uc(e) {
	return e === !0 ? {
		x: {},
		y: {}
	} : e === void 0 || e === !1 ? {
		x: !1,
		y: !1
	} : e;
}
function Wc(e, t, n) {
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
function Gc(e, t, n) {
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
var Kc = [
	"segment",
	"ray",
	"line",
	"vector"
], qc = 10;
function Jc(e, t) {
	let n = Ic(e, t), r = e.shape ?? "line";
	if (!Kc.includes(r)) throw new R(`Invalid shape "${r}" for the line "${t}": expected ${Kc.map((e) => `'${e}'`).join(", ")}`);
	if ((r === "segment" || r === "vector") && n !== "through" && n !== "director") throw new R(`The ${r} "${t}" is given by two points (through) or a point and a vector (director), not by ${n}`);
	return {
		...e,
		shape: r
	};
}
var Yc = class extends K {
	constructor(e, t, n) {
		let r = Jc(n, t);
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
		let t = Jc(e, this.name), n = Lc(Ic(t, this.name), t, this.graphConfig);
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
		return new no(this.start, this.end);
	}
	get normal() {
		let e = this.direction;
		return {
			x: e.y,
			y: -e.x
		};
	}
	labelFields() {
		return this._config.shape === "segment" ? { length: (e) => z(H(W(this._start, this.graphConfig), W(this._end, this.graphConfig)), e).toString() } : {};
	}
	computed() {
		return this._place(Lc(Ic(this._config, this.name), this._config, this.graphConfig)), this;
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
			x: t.x - qc * (t.x - e.x) / n,
			y: t.y - qc * (t.y - e.y) / n
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
		return this.clear(), this.shape = this.element.line(0, 0, 0, 0), this.mark(this._config.shape === "vector" ? "end" : "none"), this.fill().stroke(), this.shape;
	}
}, Xc = 4, Zc = 36, Qc = 10, $c = 4, el = 6, tl = {
	l: "end",
	c: "middle",
	r: "start"
}, nl = {
	t: "auto",
	m: "central",
	b: "hanging"
}, rl = {
	t: "above",
	m: "",
	b: "below"
}, il = {
	l: "left",
	c: "",
	r: "right"
}, al = class e extends Yc {
	constructor(e, t, n) {
		Hc(n, t), super(e, t, {
			...n,
			shape: "line"
		});
	}
	get config() {
		return this._config;
	}
	set config(e) {
		Hc(e, this.name), super.config = {
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
		return this.mark("end"), this._marks = this.element.path("M 0 0"), this._texts = this.element.group(), this._ticks = [], this._drawnName = null, this.stroke(), e;
	}
	strokeable() {
		return this._marks === void 0 ? [this.shape] : [this.shape, this._marks];
	}
	_styleMarkers() {
		super._styleMarkers(), this._texts?.attr("fill", this._appearance.stroke.color);
	}
	_place(e) {
		super._place(e);
		let t = Ic(this._config, this.name);
		if (this._unit = (t === "director" || t === "through") && Number.isFinite(e.direction.x) && Number.isFinite(e.direction.y) ? {
			x: e.direction.x,
			y: e.direction.y
		} : null, Number.isNaN(this._start.x)) return this._graduate(e, !1);
		let n = Gc(this._start, this._end, this.padding);
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
					x: this._end.x + el * (t.x - r.x),
					y: this._end.y + el * (t.y - r.y)
				},
				alignement: Ha(t.x - r.x, t.y - r.y)
			});
		}
		return this._paint(), this;
	}
	_ticksOf(e, t, n) {
		let r = Vc(this._config);
		if (r === null) return [];
		let i = {
			x: this._end.x - Qc * t.x,
			y: this._end.y - Qc * t.y
		}, a = gs(e.start, e.direction, r.step, this._start, i, Xc), o = Ha(n.x, n.y), s = r.size / 2, c = r.marks?.every ?? 1, l = vs(r.step * Math.hypot(e.direction.x, e.direction.y) * c, Zc) * c, u = (e) => r.numbers === void 0 ? e % l === 0 || r.marks?.first === !0 && e === 1 : r.numbers !== "none" && _s(e, r.numbers);
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
					x: i.x + (s + $c) * n.x,
					y: i.y + (s + $c) * n.y
				},
				alignement: o
			} : null
		}));
	}
	_paint() {
		let e = (e) => `${G(e.x)},${G(e.y)}`, t = this._ticks, n = this._texts;
		this._marks?.plot(t.length === 0 ? "M 0 0" : t.map(({ from: t, to: n }) => `M${e(t)} L${e(n)}`).join(" ")), n?.clear();
		let r = (e, t, r) => {
			n?.text(e).attr({
				x: G(t.x),
				y: G(t.y),
				"text-anchor": tl[r[1]],
				"dominant-baseline": nl[r[0]]
			});
		};
		for (let e of t) e.label !== null && r(e.label.text, e.label.at, e.label.alignement);
		this._drawnName !== null && r(this._drawnName.text, this._drawnName.at, this._drawnName.alignement), this._styleMarkers();
	}
	static _tikzSide(e) {
		return [rl[e[0]], il[e[1]]].filter((e) => e !== "").join(" ");
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
}, ol = {
	coordinates: ({ x: e, y: t }, n) => U({
		x: ll(e),
		y: ll(t)
	}, n),
	direction: fl,
	evaluation: ({ fx: e, x: t }) => e.evaluate(ll(t)),
	intersection: ({ A: e, B: t }) => Nc(e).intersection(Nc(t)) ?? B(),
	intersectionBetweenCircles: ({ A: e, B: t, index: n }) => e.intersectionWithCircle(t)?.[n] ?? B(),
	intersectionWithCircle: ({ A: e, B: t, index: n }) => e.intersectionWithLine(t)?.[n] ?? B(),
	middle: ({ A: e, B: t }) => ({
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	}),
	projection: ul,
	symmetry: dl
};
function sl(e, t) {
	return Tc(ol, e, t, "point");
}
function cl(e, t, n) {
	return Ec(ol, e, t, n);
}
function ll(e) {
	if (typeof e == "number") return e;
	if ("point" in e && "axis" in e) return e.point.coordinates[e.axis];
	if ("point1" in e && "point2" in e) return H(e.point1.coordinates, e.point2.coordinates);
	throw new R(`Invalid coordinate ${JSON.stringify(e)}: expected a number, {point, axis} or {point1, point2}`);
}
function ul({ point: e, axis: t }) {
	let { x: n, y: r } = t.start, i = t.direction, a = e.x - n, o = e.y - r, s = a * i.x + o * i.y, c = i.x * i.x + i.y * i.y;
	return {
		x: n + s * i.x / c,
		y: r + s * i.y / c
	};
}
function dl({ A: e, B: t }) {
	if (t instanceof Yc) {
		let n = new to(t.direction).normal, r = new to(e, t.start).projection(n);
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
function fl({ point: e, direction: t, distance: n, perpendicular: r }, i) {
	if (t instanceof Yc) {
		let a = new to(r ? t.normal : t.direction).unit, o = t instanceof al ? t.unit : null, s = o === null ? U(n, i) : n * Math.hypot(o.x, o.y);
		return {
			x: e.x + s * a.x,
			y: e.y + s * a.y
		};
	}
	let a = new to(t.A, t.B);
	return {
		x: e.x + n * a.x,
		y: e.y + n * a.y
	};
}
// src/figures/Point/Point.ts
var pl = {
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
function ml(e, t) {
	if (!Number.isFinite(e) || e <= 0) throw new R(`Invalid size ${e} for the point "${t}": expected a finite number greater than 0`);
	return e;
}
function hl({ shape: e = "circle", size: t }, n) {
	if (!Object.hasOwn(pl, e)) throw new R(`Invalid shape "${e}" for the point "${n}": expected ${Object.keys(pl).map((e) => `'${e}'`).join(", ")}`);
	return {
		shape: e,
		size: ml(t ?? pl[e].size, n)
	};
}
var J = class e extends K {
	constructor(e, t, n) {
		sl(n, t);
		let r = hl(n, t);
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
		sl(e, this.name);
		let t = this._config;
		this._config = {
			...e,
			...hl(e, this.name)
		};
		try {
			this.computed();
		} catch (e) {
			throw this._config = t, e;
		}
		this._makeShape(), this.updateLabel();
	}
	animatable = !0;
	_checkAnimation(t) {
		if (!(t.from instanceof e) || !(t.to instanceof e)) throw new R(`The animation of the point "${this.name}" needs a start and an end point (from, to)`);
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
		return W(this._pixels, this.graphConfig);
	}
	get size() {
		return this._config.size;
	}
	set size(e) {
		this._config.size = ml(e, this.name), this._makeShape();
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
		return Object.assign(this._config, hl({
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
	computed() {
		return this.pixels = cl(sl(this._config, this.name), this._config, this.graphConfig), this;
	}
	tikz() {
		let e = this._tikzShown();
		if (!e.shape && !e.label) return "";
		let t = this._tikzCoordinates(this._pixels), n = this._tikzLength(this.size / 2);
		return [e.shape ? this._tikzDraw(pl[this._config.shape].tikz(t, n)) : "", e.label ? this._tikzLabel(t) : ""].filter((e) => e !== "").join("\n");
	}
	moveLabel() {
		return this.label && this.label.move(this.x, this.y), this;
	}
	_makeShape() {
		this.clear();
		let { shape: e, size: t } = this._config;
		return this.shape = this._centerShape(pl[e].draw(this.element, t)), this.fill().stroke(), this.shape;
	}
	_centerShape(e) {
		return V(this._pixels) && e.center(this._pixels.x, this._pixels.y), e;
	}
};
// src/figures/Curve/Curve.constraints.ts
function gl(e, t) {
	let n = e;
	return typeof n == "object" && !!n && typeof n.min == "number" && typeof n.max == "number" && !Number.isNaN(n.min) && !Number.isNaN(n.max) && n.min <= n.max && (t || Number.isFinite(n.min) && Number.isFinite(n.max));
}
var _l = (e) => typeof e == "number" && Number.isFinite(e) && e > 0, vl = {
	domain: {
		valid: (e) => gl(e, !1),
		expected: "{min, max} with finite numbers and min <= max"
	},
	samples: {
		valid: _l,
		expected: "a finite number greater than 0"
	},
	tolerance: {
		valid: _l,
		expected: "a finite number greater than 0"
	},
	maxDepth: {
		valid: (e) => Number.isInteger(e) && e >= 0,
		expected: "an integer of 0 or more"
	},
	asymptoteThreshold: {
		valid: _l,
		expected: "a finite number greater than 0"
	}
}, yl = {
	valid: (e) => gl(e, !0),
	expected: "{min, max} with min <= max"
};
function bl(e, t, n = {}) {
	let r = {
		...vl,
		...n
	}, i = e;
	for (let [e, n] of Object.entries(r)) {
		let r = i[e];
		if (r !== void 0 && !n.valid(r)) throw new R(`Invalid ${e} ${JSON.stringify(r)} for the curve "${t}": expected ${n.expected}`);
	}
}
function xl(e, t) {
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
function Sl(e, t, n) {
	let r = new wo(e);
	try {
		r.evaluate({ [t]: 0 });
	} catch (r) {
		throw r instanceof R ? new R(`The function "${e}" ${n} can only use the variable ${t}: ${r.message}`, { cause: r }) : r;
	}
	return r;
}
// src/figures/Plot/Plot.constraints.ts
var Cl = {
	expression: (e) => e,
	quadratic: (e, t) => {
		let { A: n, B: r, C: i } = q(e, "points of the parabola");
		try {
			return Ho(W(n, t), W(r, t), W(i, t));
		} catch (e) {
			if (e instanceof Ba) return null;
			throw e;
		}
	}
};
function wl(e, t) {
	return Tc(Cl, e, t, "plot");
}
function Tl(e, t, n) {
	return Ec(Cl, e, t, n);
}
function El(e, t, n) {
	let r = wl(e, t);
	bl(e, t, { image: yl });
	let i = Tl(r, e, n);
	return i === null ? null : {
		expression: i,
		numExp: Sl(i, "x", `of the plot "${t}"`)
	};
}
// src/figures/Plot/Plot.ts
var Dl = "0/0", Ol = class extends K {
	_labelGap = 6;
	constructor(e, t, n) {
		let r = El(n, t, e.config);
		super(e, t), this._config = { ...n }, this._fx = r?.expression ?? "", this._numExp = r?.numExp ?? new wo(Dl), this._labelAnchor = null, this._range = null, this._makeShape(), this._draw(r !== null);
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
		let t = El(e, this.name, this.graphConfig);
		this._config = { ...e }, this._fx = t?.expression ?? "", this._numExp = t?.numExp ?? new wo(Dl), this._draw(t !== null), this.updateLabel();
	}
	computed() {
		let e = Tl(wl(this._config, this.name), this._config, this.graphConfig);
		return e !== this._fx && (this._fx = e ?? "", this._numExp = e === null ? new wo(Dl) : new wo(e)), this._draw(e !== null);
	}
	valueAt(e) {
		return this._numExp.evaluate({ x: e });
	}
	evaluate(e) {
		return U({
			x: e,
			y: this.valueAt(e)
		}, this.graphConfig);
	}
	followable = !0;
	follow(e, t) {
		return this.evaluate(W({
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
}, kl = {
	radius: ({ center: e, radius: t }, n) => {
		let r = q({ center: e }, "circle").center;
		return {
			center: r,
			radius: kc(t, r, n)
		};
	},
	through: ({ through: e }) => {
		let { A: t, B: n, C: r } = q(e, "points of the circle");
		return co(t, n, r);
	},
	tangent: ({ tangent: e }) => {
		let { center: t } = q({ center: e.center }, "circle"), { to: n } = e;
		if (!(n instanceof Yc)) throw new R("Invalid tangent: \"to\" is neither a line nor an axis");
		return fo(t, n.start, n.end);
	},
	diameter: ({ diameter: e }) => {
		let { A: t, B: n } = q(e, "diameter");
		return uo(t, n);
	},
	inscribed: ({ inscribed: e }) => {
		let { A: t, B: n, C: r } = q(e, "triangle");
		return lo(t, n, r);
	}
};
function Al(e, t) {
	let n = Tc(kl, e, t, "circle");
	if (n !== "radius" && e.center !== void 0) throw new R(`The circle "${t}" has a center, which goes with a radius, and a ${n}`);
	if (n === "radius" && e.center === void 0) throw new R(`The circle "${t}" has a radius and needs a center`);
	return n;
}
function jl(e, t, n) {
	let r = kl[e];
	return r(t, n);
}
// src/figures/Circle/Circle.ts
var Ml = class extends K {
	followable = !0;
	constructor(e, t, n) {
		jl(Al(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = B(), this._radius = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = jl(Al(e, this.name), e, this.graphConfig);
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
		return this._place(jl(Al(this._config, this.name), this._config, this.graphConfig));
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
}, Nl = 1e3;
function Pl(e, t) {
	if (!Number.isInteger(e) || e < 3 || e > 1e3) throw new R(`Invalid number of sides ${e}: expected an integer from 3 to ${Nl}`);
	if (t !== void 0 && (!Number.isInteger(t) || t < 1 || 2 * t >= e)) throw new R(`Invalid star ${t} for ${e} sides: expected an integer from 1 to less than ${e / 2}`);
	return t ?? 1;
}
var Fl = {
	vertices: (e) => {
		if (!Array.isArray(e) || e.length < 3) throw new R(`A polygon needs at least 3 vertices, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = Oc(e, "vertex of the polygon");
		return t.some((e) => !Number.isFinite(e.x) || !Number.isFinite(e.y)) ? null : {
			vertices: t.map((e) => ({
				x: e.x,
				y: e.y
			})),
			cycles: [t.map((e, t) => t)]
		};
	},
	regular: ({ center: e, radius: t, sides: n, star: r }, i) => {
		let a = Pl(n, r), o = q({ center: e }, "polygon").center;
		return Ys(o, kc(t, o, i), n, a);
	},
	onSide: ({ A: e, B: t, sides: n, star: r }) => {
		let i = Pl(n, r), a = q({
			A: e,
			B: t
		}, "side of the polygon");
		return Xs(a.A, a.B, n, i);
	}
};
function Il(e, t) {
	return Tc(Fl, e, t, "polygon");
}
function Ll(e, t, n) {
	return Ec(Fl, e, t, n);
}
// src/figures/Polygon/Polygon.ts
var Rl = class e extends K {
	constructor(t, n, r) {
		Ll(Il(r, n), r, t.config), super(t, n), this._config = e._copy(r), this._polygon = null, this._makeShape(), this.computed();
	}
	static _copy(e) {
		return e.vertices === void 0 ? { ...e } : {
			...e,
			vertices: [...e.vertices]
		};
	}
	_config;
	get config() {
		return this._config;
	}
	set config(t) {
		let n = Ll(Il(t, this.name), t, this.graphConfig);
		this._config = e._copy(t), this._makeShape(), this._place(n), this.updateLabel();
	}
	_polygon;
	get vertices() {
		return this._polygon === null ? [] : this._polygon.vertices.map((e) => ({
			x: e.x,
			y: e.y
		}));
	}
	get centroid() {
		return this._polygon === null ? B() : Zs(this._polygon.vertices);
	}
	computed() {
		return this._place(Ll(Il(this._config, this.name), this._config, this.graphConfig));
	}
	_place(e) {
		return this._polygon = e, this._setDefined(e !== null), this.shape.plot(e === null ? "M 0 0" : $s(e)), this;
	}
	followable = !0;
	follow(e, t) {
		return this._polygon === null ? B() : Qs(this._polygon, {
			x: e,
			y: t
		});
	}
	moveLabel() {
		if (!this.label || this._polygon === null) return this;
		this.label.alignementGiven || (this.label.config.alignement = "mc");
		let { x: e, y: t } = this.centroid;
		return this.label.move(e, t), this;
	}
	tikz() {
		let e = this._tikzShown();
		if (this._polygon === null || !e.shape && !e.label) return "";
		let { vertices: t, cycles: n } = this._polygon, r = (e) => `(${this._tikzCoordinates(t[e])})`, i = n.map((e) => `${e.map(r).join(" -- ")} -- cycle`).join(" ");
		return [e.shape ? this._tikzDraw(i) : "", e.label ? this._tikzLabel(this._tikzCoordinates(this.centroid)) : ""].filter((e) => e !== "").join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, zl = {
	x: 1,
	y: 1
};
function Bl(e) {
	return e.step === void 0 ? { ...zl } : {
		x: e.step.x,
		y: e.step.y
	};
}
function Vl(e, t) {
	let n = e.step, r = (e) => typeof e == "number" && Number.isFinite(e) && e > 0;
	if (n !== void 0 && (typeof n != "object" || !r(n.x) || !r(n.y))) throw new R(`Invalid step ${JSON.stringify(e.step)} for the grid "${t}": expected {x, y}, two finite numbers greater than 0`);
	let i = (e) => typeof e == "object" && !!e && Number.isFinite(e.min) && Number.isFinite(e.max) && e.min < e.max;
	if (e.x === void 0 != (e.y === void 0)) throw new R(`The grid "${t}" needs both x and y to be a part of the drawing, or none for all of it`);
	for (let [n, r] of [["x", e.x], ["y", e.y]]) if (r !== void 0 && !i(r)) throw new R(`Invalid ${n} ${JSON.stringify(r)} for the grid "${t}": expected {min, max}, two finite numbers with the minimum lower than the maximum`);
	let a = e.subdivisions;
	if (a !== void 0 && !(typeof a == "number" && Number.isInteger(a) && a >= 2 && a <= 20)) throw new R(`Invalid subdivisions ${JSON.stringify(a)} for the grid "${t}": expected an integer from 2 to 20`);
}
// src/figures/Grid/Grid.ts
var Hl = 3, Ul = .5;
function Wl(e) {
	let t = (e) => `${G(e.x)},${G(e.y)}`;
	return e.length === 0 ? "M 0 0" : e.map(([e, n]) => `M${t(e)} L${t(n)}`).join(" ");
}
var Gl = class extends K {
	constructor(e, t, n = {}) {
		Vl(n, t), super(e, t), this.static = !0, this.appearance.stroke.color = "lightgray", this._config = { ...n }, this._lines = [], this._subLines = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		Vl(e, this.name), this._config = { ...e }, this.computed();
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
		].map((e) => W(e, this.graphConfig)), r = n.map((e) => e.x), i = n.map((e) => e.y);
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
		let { origin: n, width: r, height: i, axis: a } = this.graphConfig, o = Bl(this._config), { x: s, y: c } = this._config;
		return s !== void 0 && c !== void 0 ? ks({
			x: s,
			y: c
		}, this._view(), o, (e) => U(e, this.graphConfig), Hl, e) : [...Es(n, a.x, {
			x: a.y.x * o.y / e,
			y: a.y.y * o.y / e
		}, r, i, Hl, t), ...Es(n, a.y, {
			x: a.x.x * o.x / e,
			y: a.x.y * o.x / e
		}, r, i, Hl, t)];
	}
	computed() {
		let e = this._config.subdivisions ?? 0;
		return this._lines = this._family(1, 0), this._subLines = e === 0 ? [] : this._family(e, e), this._setDefined(this._lines.length > 0 || this._subLines.length > 0), this.shape.plot(Wl(this._lines)), this._sub?.plot(Wl(this._subLines)), this;
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
		return [t === "" ? "" : `\\begin{scope}[opacity=${Ul}]\n${t}\n\\end{scope}`, e(this._lines, 1)].filter((e) => e !== "").join("\n");
	}
	_tikzGridPath(e) {
		let { axis: t } = this.graphConfig, n = Bl(this._config), r = Math.abs(t.x.y) <= 1e-9 && Math.abs(t.y.x) <= 1e-9, i = Math.hypot(t.x.x, t.x.y) * n.x / e >= Hl && Math.hypot(t.y.x, t.y.y) * n.y / e >= Hl;
		if (!r || !i) return null;
		let { x: a, y: o } = this._config, s = a !== void 0 && o !== void 0, c = s ? {
			x: [a.min, a.max],
			y: [o.min, o.max]
		} : this._tikzView(), l = (e) => z(e, 5), u = `(${l(c.x[0])},${l(c.y[0])})`, d = `(${l(c.x[1])},${l(c.y[1])})`;
		return `${u} grid[xstep=${l(n.x / e)}, ystep=${l(n.y / e)}] ${d}${s && e === 1 ? ` ${u} rectangle ${d}` : ""}`;
	}
	_makeShape() {
		return this.clear(), this._sub = this.element.group().opacity(Ul).path("M 0 0"), this.shape = this.element.path("M 0 0"), this.stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Arc/Arc.constraints.ts
function Kl(e, t) {
	if (!Number.isFinite(e)) throw new R(`Invalid ${t} ${e}: expected a finite number`);
	return e;
}
function ql(e, t, n, r) {
	return e === void 0 ? H(t, n) : kc(e, t, r);
}
var Jl = {
	points: ({ start: e, center: t, end: n, radius: r }, i) => {
		let a = q({
			start: e,
			center: t,
			end: n
		}, "arc");
		return {
			...a,
			radius: ql(r, a.center, a.start, i)
		};
	},
	angles: ({ center: e, radius: t, from: n, to: r }, i) => {
		let a = q({ center: e }, "arc").center, o = kc(t, a, i), s = (e) => ro(a.x, a.y, o, Kl(e, "angle"));
		return {
			center: a,
			start: s(n),
			end: s(r),
			radius: o
		};
	},
	rotation: ({ start: e, center: t, angle: n, radius: r }, i) => {
		let a = q({
			start: e,
			center: t
		}, "arc"), o = Kl(n, "angle"), s = H(a.center, a.start), c = ro(a.center.x, a.center.y, s, io(a.center, a.start) + o), l = ql(r, a.center, a.start, i);
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
function Yl(e, t) {
	return Tc(Jl, e, t, "arc");
}
function Xl(e, t, n) {
	return Ec(Jl, e, t, n);
}
// src/figures/Arc/Arc.ts
var Zl = 1e-6, Ql = class extends K {
	constructor(e, t, n) {
		Xl(Yl(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = B(), this._start = B(), this._end = B(), this._radius = NaN, this._from = NaN, this._sweep = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = Xl(Yl(e, this.name), e, this.graphConfig);
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
		return Math.abs(this._sweep - 90) < Zl;
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
		return this._place(Xl(Yl(this._config, this.name), this._config, this.graphConfig));
	}
	_place({ center: e, start: t, end: n, radius: r }) {
		let i = V(e) && V(t) && V(n) && Number.isFinite(r) && r > 0 && H(e, t) > 0 && H(e, n) > 0 ? io(e, t) : NaN, a = Number.isNaN(i) ? 0 : ds(i, io(e, n));
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
		return ro(this._center.x, this._center.y, t, e);
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
			alignement: Ha(Math.cos(e * Math.PI / 180), -Math.sin(e * Math.PI / 180))
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
// src/figures/Parametric/Parametric.constraints.ts
function $l(e, t, n) {
	if (typeof e != "string") throw new R(`Invalid function ${JSON.stringify(e)} of ${t} for the curve "${n}": expected text`);
	return Sl(e, "t", `of ${t} of the curve "${n}"`);
}
function eu(e, t) {
	bl(e, t);
	let n = e.expressions;
	if (typeof n != "object") throw new R(`The curve "${t}" needs its functions: {expressions: {x, y}}`);
	return {
		x: $l(n.x, "x", t),
		y: $l(n.y, "y", t)
	};
}
// src/figures/Parametric/Parametric.ts
var tu = {
	min: 0,
	max: 2 * Math.PI
}, nu = 64, ru = class extends K {
	constructor(e, t, n) {
		let r = eu(n, t);
		super(e, t), this._config = {
			...n,
			expressions: { ...n.expressions }
		}, this._numExp = r, this._labelAnchor = null, this._range = null, this._points = [], this._makeShape(), this._draw();
	}
	_numExp;
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = eu(e, this.name);
		this._config = {
			...e,
			expressions: { ...e.expressions }
		}, this._numExp = t, this._draw(), this.updateLabel();
	}
	computed() {
		return this._draw();
	}
	valueAt(e) {
		return {
			x: this._numExp.x.evaluate({ t: e }),
			y: this._numExp.y.evaluate({ t: e })
		};
	}
	evaluate(e) {
		return U(this.valueAt(e), this.graphConfig);
	}
	_draw() {
		let e = this.graphConfig, { width: t, height: n } = e, r = this._config.domain ?? tu, i = n * (this._config.asymptoteThreshold ?? 10), a = { t: 0 }, o = (t) => {
			a.t = t;
			let n = this._numExp.x.evaluate(a), r = this._numExp.y.evaluate(a);
			return Number.isFinite(n) && Number.isFinite(r) ? U({
				x: n,
				y: r
			}, e) : B();
		}, s = this._config.samples === void 0 ? Math.max(nu, (r.max - r.min) * Math.abs(e.axis.x.x) / 8) : (r.max - r.min) * this._config.samples, c = Yo(o, r.min, r.max, {
			intervals: s,
			tolerance: this._config.tolerance ?? .5,
			maxDepth: this._config.maxDepth ?? 6,
			view: {
				left: 0,
				right: t,
				top: 0,
				bottom: n
			},
			bound: i
		});
		return this.shape.plot($o(c, i)), this._range = {
			from: r.min,
			to: r.max,
			intervals: s
		}, this._points = c, this._labelAnchor = Xo(c, t, n), this;
	}
	_points;
	followable = !0;
	follow(e, t) {
		return Zo(this._points, {
			x: e,
			y: t
		});
	}
	_range;
	_labelAnchor;
	_labelPlace({ point: e, direction: t }) {
		return Ua(e, t, this._labelGap);
	}
	moveLabel() {
		if (!this.label || this._labelAnchor === null) return this;
		let { point: e, alignement: t } = this._labelPlace(this._labelAnchor);
		return this.label.alignementGiven || (this.label.config.alignement = t), this.label.move(e.x, e.y), this;
	}
	tikz() {
		let e = this._tikzShown();
		return [e.shape ? this._tikzCurve() : "", e.label && this._labelAnchor !== null ? this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._labelAnchor).point)) : ""].filter((e) => e !== "").join("\n");
	}
	_tikzCurve() {
		if (this._range === null) return "";
		let { definitions: e, options: t } = this._tikzCurveStyle(), n = this._tikzView(), r = (e) => z(e, 5), i = ([e, t]) => [e - (t - e), t + (t - e)], a = { t: "x" }, o = [
			`domain=${r(this._range.from)}:${r(this._range.to)}`,
			`samples=${this._tikzSamples(this._range.intervals)}`,
			...t
		];
		return [...e, ...this._tikzAxis([`\\addplot[${o.join(", ")}] ({${this._numExp.x.toPgf(a)}}, {${this._numExp.y.toPgf(a)}});`], {
			x: i(n.x),
			y: i(n.y)
		})].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Follow/Follow.constraints.ts
function iu(e, t) {
	let n = e.follow;
	if (!(n instanceof K)) throw new R(`The point "${t}" needs a figure to follow`);
	if (!n.followable) throw new R(`The point "${t}" cannot follow the figure "${n.name}": a point follows a line, a circle, a plot or a parametric curve`);
	if (e.size !== void 0 && !(typeof e.size == "number" && Number.isFinite(e.size) && e.size > 0)) throw new R(`Invalid size ${JSON.stringify(e.size)} for the point "${t}": expected a finite number greater than 0`);
	let r = e.at;
	if (r !== void 0 && (typeof r != "object" || typeof r.x != "number" || typeof r.y != "number")) throw new R(`Invalid starting position ${JSON.stringify(r)} for the point "${t}": expected a position {x, y}`);
}
// src/figures/Follow/Follow.ts
var au = class extends K {
	_labelGap = 12;
	constructor(e, t, n) {
		iu(n, t), super(e, t), this.appearance.fill.color = "black", this._config = { ...n }, this._mouse = null, this._state = null, this._listener = (e) => {
			let t = this.rootSVG.node, n = t.getScreenCTM();
			if (n === null) return;
			let r = t.createSVGPoint();
			r.x = e.clientX, r.y = e.clientY;
			let { x: i, y: a } = r.matrixTransform(n.inverse());
			this.moveTo(i, a);
		}, this.rootSVG.on("mousemove", this._listener), this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		iu(e, this.name), this._config = { ...e }, this._makeShape(), this.computed(), this.updateLabel();
	}
	_mouse;
	_state;
	_listener;
	_point;
	_tangent;
	get position() {
		return this._state === null ? {
			x: NaN,
			y: NaN
		} : { ...this._state.point };
	}
	dispose() {
		this.rootSVG.off("mousemove", this._listener);
	}
	moveTo(e, t) {
		return this._mouse = {
			x: e,
			y: t
		}, this.computed().updateLabel();
	}
	_target() {
		return this._mouse ?? this._config.at ?? this.graphConfig.origin;
	}
	computed() {
		let e = this._config.follow, t = this._target(), n = e.follow(t.x, t.y);
		if (!V(n)) return this._state = null, this._point?.hide(), this._tangent?.hide(), this;
		this._state = {
			point: {
				x: n.x,
				y: n.y
			},
			direction: Qo((t, n) => e.follow(t, n), n)
		}, this._point?.show().center(n.x, n.y);
		let r = this._tangentLine();
		return r === null ? this._tangent?.hide() : this._tangent?.show().plot(r[0].x, r[0].y, r[1].x, r[1].y), this;
	}
	_tangentLine() {
		let e = this._state?.direction;
		if (this._config.tangent !== !0 || this._state === null || !e) return null;
		let { width: t, height: n } = this.graphConfig, r = ho(this._state.point, e, t, n);
		return r === null ? null : go(r[0], r[1], t, n);
	}
	moveLabel() {
		if (!this.label || this._state === null) return this;
		let { point: e, alignement: t } = this._labelPlace(this._state);
		return this.label.alignementGiven || (this.label.config.alignement = t), this.label.move(e.x, e.y), this;
	}
	_labelPlace({ point: e, direction: t }) {
		return Ua(e, t ?? {
			x: 0,
			y: 0
		}, this._labelGap);
	}
	tikz() {
		let e = this._tikzShown();
		if (this._state === null || !e.shape && !e.label) return "";
		let { definitions: t, options: n } = this._tikzStyle(), r = [];
		if (e.shape) {
			let e = this._tangentLine(), i = n.filter((e) => !e.startsWith("fill")), a = n.filter((e) => e.startsWith("fill")), o = (e) => `(${this._tikzCoordinates(e)})`;
			r.push(...t), e !== null && !i.includes("draw=none") && r.push(`\\draw[${i.join(", ")}] ${o(e[0])} -- ${o(e[1])};`), a.length > 0 && r.push(`\\fill[${a.join(", ")}] ${o(this._state.point)} circle[radius=${this._tikzLength((this._config.size ?? 10) / 2)}];`);
		}
		return e.label && r.push(this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._state).point))), r.join("\n");
	}
	_makeShape() {
		this.clear();
		let e = this.element.group();
		return this.shape = e, this._tangent = e.line(0, 0, 0, 0), this._point = e.circle(this._config.size ?? 10), this.fill().stroke(), e;
	}
	strokeable() {
		return this._tangent ? [this._tangent] : [];
	}
	fillable() {
		return this._point ? [this._point] : [];
	}
};
// src/figures/FillBetween/FillBetween.constraints.ts
function ou(e) {
	return xl(e.domain, [e.plot, e.other].flatMap((e) => e === void 0 ? [] : [e]));
}
function su(e, n) {
	let r = e.plot, i = e.other;
	if (!(r instanceof Ol)) throw new R(`The area "${n}" needs a plot`);
	if (i !== void 0 && !(i instanceof Ol)) throw new R(`The area "${n}" can only be between plots, got ${JSON.stringify(i)} as the second one`);
	if (e.domain !== void 0 && !(t(e.domain) && Number.isFinite(e.domain.min) && Number.isFinite(e.domain.max))) throw new R(`Invalid domain ${JSON.stringify(e.domain)} for the area "${n}": expected finite numbers`);
	let a = ou(e);
	if (a !== null && a.min >= a.max) throw new R(e.domain === void 0 ? `The plots of the area "${n}" have no abscissa in common: give a domain` : `Invalid domain ${JSON.stringify(e.domain)} for the area "${n}": the minimum must be below the maximum`);
}
// src/figures/FillBetween/FillBetween.ts
var cu = .5, lu = 6, uu = 10, du = class e extends K {
	constructor(t, n, r) {
		su(r, n), super(t, n), this._config = e._copy(r), this._runs = [], this._range = null, this._makeShape(), this.computed();
	}
	static _copy(e) {
		return e.domain === void 0 ? { ...e } : {
			...e,
			domain: {
				min: e.domain.min,
				max: e.domain.max
			}
		};
	}
	_config;
	get config() {
		return this._config;
	}
	set config(t) {
		su(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
	}
	_runs;
	_range;
	get area() {
		if (this._runs.length === 0) return NaN;
		let { x: e, y: t } = this.graphConfig.axis;
		return ws(this._runs) / Math.abs(e.x * t.y);
	}
	computed() {
		let e = this.graphConfig, { origin: t, width: n, height: r } = e, i = e.axis.x.x;
		this._runs = [], this._range = null;
		let a = {
			min: -t.x / i - 1,
			max: (n - t.x) / i + 1
		}, o = ou(this._config) ?? a, s = Math.max(o.min, a.min), c = Math.min(o.max, a.max);
		if (s < c) {
			let { plot: a, other: o } = this._config, l = (c - s) * Math.abs(i) / 8;
			this._runs = Ss((e) => a.evaluate(e), o === void 0 ? null : (e) => o.evaluate(e), t.y, {
				min: s,
				max: c
			}, (t) => W({
				x: t,
				y: 0
			}, e).x, {
				intervals: l,
				tolerance: cu,
				maxDepth: lu,
				view: {
					left: 0,
					right: n,
					top: 0,
					bottom: r
				},
				bound: r * uu
			}), this._range = this._runs.length === 0 ? null : {
				from: s,
				to: c,
				intervals: l
			};
		}
		return this._setDefined(this._runs.length > 0), this.shape.plot(Cs(this._runs)), this;
	}
	labelFields() {
		return { area: (e) => z(this.area, e).toString() };
	}
	_labelPlace() {
		let e = this._runs.flatMap(({ first: e, second: t }) => [...e, ...t]);
		if (e.length === 0) return null;
		let t = e.map((e) => e.x), n = e.map((e) => e.y);
		return {
			x: (Math.min(...t) + Math.max(...t)) / 2,
			y: (Math.min(...n) + Math.max(...n)) / 2
		};
	}
	moveLabel() {
		let e = this._labelPlace();
		return !this.label || e === null || (this.label.alignementGiven || (this.label.config.alignement = "mc"), this.label.move(e.x, e.y)), this;
	}
	tikz() {
		let e = this._tikzShown(), t = this._labelPlace();
		return this._range === null || t === null || !e.shape && !e.label ? "" : [e.shape ? this._tikzArea(this._range) : "", e.label ? this._tikzLabel(this._tikzCoordinates(t)) : ""].filter((e) => e !== "").join("\n");
	}
	_tikzArea({ from: e, to: t, intervals: n }) {
		let { definitions: r, options: i } = this._tikzStyle(), { plot: a, other: o } = this._config, [s, c] = this._tikzView().y, l = (e) => z(e, 5), u = `pidraw-${this.name}-1`, d = `pidraw-${this.name}-2`, f = (r, i) => `\\addplot[name path=${r}, draw=none, domain=${l(e)}:${l(t)}, samples=${this._tikzSamples(n)}] {${i.numExp.toPgf()}};`;
		return [...r, ...this._tikzAxis([
			f(u, a),
			o === void 0 ? `\\path[name path=${d}] (axis cs:${l(e)},0) -- (axis cs:${l(t)},0);` : f(d, o),
			`\\addplot[${i.join(", ")}] fill between[of=${u} and ${d}];`
		], { y: [s - (c - s), c + (c - s)] })].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, fu = 1e3;
function pu(e) {
	return xl(e.domain, [e.plot]);
}
function mu(e, n) {
	if (!(e.plot instanceof Ol)) throw new R(`The Riemann sum "${n}" needs a plot`);
	let r = pu(e);
	if (r === null) throw new R(`The Riemann sum "${n}" needs a domain: give one, or give a domain to the plot "${e.plot.name}"`);
	if (!t(r) || !Number.isFinite(r.min) || !Number.isFinite(r.max) || r.min >= r.max) throw new R(`Invalid domain ${JSON.stringify(r)} for the Riemann sum "${n}": expected finite numbers with the minimum below the maximum`);
	let { rectangles: i, position: a } = e;
	if (i !== void 0 && !(Number.isInteger(i) && i >= 1 && i <= 1e3)) throw new R(`Invalid number of rectangles ${JSON.stringify(i)} for the Riemann sum "${n}": expected an integer from 1 to ${fu}`);
	if (a !== void 0 && !(typeof a == "number" && a >= 0 && a <= 1)) throw new R(`Invalid position ${JSON.stringify(a)} for the Riemann sum "${n}": expected a number from 0 (left) to 1 (right)`);
}
// src/figures/Riemann/Riemann.ts
var hu = class e extends K {
	_labelGap = 6;
	constructor(t, n, r) {
		mu(r, n), super(t, n), this._config = e._copy(r), this._rectangles = [], this._makeShape(), this.computed();
	}
	static _copy(e) {
		return e.domain === void 0 ? { ...e } : {
			...e,
			domain: {
				min: e.domain.min,
				max: e.domain.max
			}
		};
	}
	_config;
	get config() {
		return this._config;
	}
	set config(t) {
		mu(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
	}
	get rectangles() {
		return this._config.rectangles ?? 5;
	}
	set rectangles(e) {
		this.config = {
			...this._config,
			rectangles: e
		};
	}
	get position() {
		return this._config.position ?? 0;
	}
	set position(e) {
		this.config = {
			...this._config,
			position: e
		};
	}
	get rectanglesDrawn() {
		return this._rectangles.map((e) => ({ ...e }));
	}
	_rectangles;
	get sum() {
		return this._rectangles.length === 0 ? NaN : tc(this._rectangles);
	}
	computed() {
		let e = pu(this._config), t = this._config.plot;
		return this._rectangles = e === null ? [] : ec((e) => t.valueAt(e), e, this.rectangles, this.position), this._setDefined(this._rectangles.length > 0), this.shape.plot(this._path()), this;
	}
	_path() {
		if (this._rectangles.length === 0) return "M 0 0";
		let e = (e, t) => {
			let n = U({
				x: e,
				y: t
			}, this.graphConfig);
			return `${G(n.x)} ${G(n.y)}`;
		};
		return this._rectangles.map(({ x0: t, x1: n, y: r }) => `M ${e(t, 0)} L ${e(n, 0)} L ${e(n, r)} L ${e(t, r)} Z`).join(" ");
	}
	_labelPlace() {
		let e = pu(this._config);
		if (e === null || this._rectangles.length === 0) return null;
		let t = Math.max(0, ...this._rectangles.map(({ y: e }) => e)), { x: n, y: r } = U({
			x: (e.min + e.max) / 2,
			y: t
		}, this.graphConfig);
		return {
			x: n,
			y: r - this._labelGap
		};
	}
	labelFields() {
		return {
			sum: (e) => z(this.sum, e).toString(),
			rectangles: () => String(this.rectangles)
		};
	}
	moveLabel() {
		let e = this._labelPlace();
		return !this.label || e === null || (this.label.alignementGiven || (this.label.config.alignement = "tc"), this.label.move(e.x, e.y)), this;
	}
	tikz() {
		let e = this._tikzShown(), t = this._labelPlace();
		if (t === null || !e.shape && !e.label) return "";
		let n = (e, t) => `(${this._tikzCoordinates(U({
			x: e,
			y: t
		}, this.graphConfig))})`, r = this._rectangles.map(({ x0: e, x1: t, y: r }) => `${n(e, 0)} rectangle ${n(t, r)}`).join(" ");
		return [e.shape ? this._tikzDraw(r) : "", e.label ? this._tikzLabel(this._tikzCoordinates(t)) : ""].filter((e) => e !== "").join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Path/Path.constraints.ts
function gu(e, t) {
	let n = e.d, r = e.units;
	if (typeof n != "string") throw new R(`Invalid data ${JSON.stringify(n)} for the path "${t}": expected the text of an SVG path`);
	if (r !== void 0 && typeof r != "boolean") throw new R(`Invalid units ${JSON.stringify(r)} for the path "${t}": expected true or false`);
	return Us(n);
}
// src/figures/Path/Path.ts
var _u = (e) => e.reduce((t, n, r) => r === 0 ? 0 : t + Math.hypot(n.x - e[r - 1].x, n.y - e[r - 1].y), 0), vu = class extends K {
	constructor(e, t, n) {
		let r = gu(n, t);
		super(e, t), this._config = { ...n }, this._commands = r, this._pixels = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = gu(e, this.name);
		this._config = { ...e }, this._commands = t, this.computed(), this.updateLabel();
	}
	get d() {
		return this._config.d;
	}
	set d(e) {
		this.config = {
			...this._config,
			d: e
		};
	}
	_commands;
	_pixels;
	get commands() {
		return structuredClone(this._pixels);
	}
	computed() {
		let e = this.graphConfig;
		return this._pixels = this._config.units === !0 ? Ws(this._commands, (t) => U(t, e)) : this._commands, this._setDefined(this._pixels.length > 0), this.shape.plot(this._pixels.length === 0 ? "M 0 0" : Gs(this._pixels)), this;
	}
	followable = !0;
	follow(e, t) {
		let n = B(), r = Infinity;
		for (let i of Ks(this._pixels)) {
			let a = Zo(ss(i), {
				x: e,
				y: t
			}), o = Math.hypot(a.x - e, a.y - t);
			o < r && (r = o, n = a);
		}
		return n;
	}
	_labelPlace() {
		let e = Ks(this._pixels).map((e) => ({
			piece: e,
			length: _u(ss(e))
		})).reduce((e, t) => e === null || t.length > e.length ? t : e, null), t = e === null ? null : ls(e.piece);
		return t === null ? null : Ua(t.point, t.direction, this._labelGap);
	}
	moveLabel() {
		let e = this._labelPlace();
		return !this.label || e === null || (this.label.alignementGiven || (this.label.config.alignement = e.alignement), this.label.move(e.point.x, e.point.y)), this;
	}
	_tikzPath() {
		let e = (e) => `(${this._tikzCoordinates(e)})`, t = [], n = {
			x: 0,
			y: 0
		}, r = !1;
		for (let i of this._pixels) i.type === "Z" ? (t.push("-- cycle"), r = !0) : i.type === "M" ? (n = i.p, r = !1, t.push(e(i.p))) : (r &&= (t.push(e(n)), !1), t.push(i.type === "L" ? `-- ${e(i.p)}` : `.. controls ${e(i.c1)} and ${e(i.c2)} .. ${e(i.p)}`));
		return t.join(" ");
	}
	tikz() {
		let e = this._tikzShown(), t = this._labelPlace();
		return this._pixels.length === 0 || !e.shape && !e.label ? "" : [e.shape ? this._tikzDraw(this._tikzPath()) : "", e.label && t !== null ? this._tikzLabel(this._tikzCoordinates(t.point)) : ""].filter((e) => e !== "").join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Bezier/Bezier.constraints.ts
function yu(e) {
	if (e !== void 0 && e !== "horizontal" && e !== "vertical" && !(typeof e == "number" && Number.isFinite(e))) throw new R(`Invalid direction ${JSON.stringify(e)}: expected 'horizontal', 'vertical' or an angle in degrees`);
}
function bu(e) {
	if (e !== void 0 && !(typeof e == "number" && Number.isFinite(e) && e > 0)) throw new R(`Invalid ratio ${JSON.stringify(e)}: expected a finite number greater than 0`);
}
var xu = {
	through: (e, t) => {
		let n = t ? 3 : 2;
		if (!Array.isArray(e) || e.length < n) throw new R(`A ${t ? "closed " : ""}curve needs at least ${n} points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let r = e.map((e, t) => {
			let { point: n } = q({ point: e?.point }, `point ${t} of the curve`);
			return yu(e.direction), bu(e.ratio), {
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
		if (!Array.isArray(e) || e.length !== 3 && e.length !== 4) throw new R(`A curve of control points has 3 or 4 points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = Oc(e, "control point of the curve");
		return t.every(V) ? ns(t.map((e) => ({
			x: e.x,
			y: e.y
		}))) : null;
	}
};
function Su(e, t) {
	return Tc(xu, e, t, "curve");
}
function Cu(e, t, n) {
	if (t.closed === !0 && e !== "through") throw new R(`The curve "${n}" has control points and cannot be closed: only a curve through points can`);
	return Ec(xu, e, t, t.closed === !0);
}
// src/figures/Bezier/Bezier.ts
var wu = class e extends K {
	constructor(t, n, r) {
		Cu(Su(r, n), r, n), super(t, n), this._config = e._copy(r), this._segments = null, this._makeShape(), this.computed();
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
		let n = Cu(Su(t, this.name), t, this.name);
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
		return this._place(Cu(Su(this._config, this.name), this._config, this.name));
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
		return e === null ? null : Ua(e.point, e.direction, this._labelGap);
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
}, Tu = /* @__PURE__ */ function(e) {
	return e.RESET = "reset", e.REVERSE = "reverse", e.NONE = "none", e;
}({}), Eu = class {
	_graph;
	_animatedPoints = [];
	_startTime = 0;
	_elapsedAtPause = 0;
	_paused = !1;
	_rafId = null;
	_resetTimer = null;
	_animations = /* @__PURE__ */ new Map();
	constructor(e) {
		this._graph = e, this._updatePoints();
	}
	start() {
		this.cancel(), this._updatePoints(), this._paused = !1, this._startTime = 0, this._elapsedAtPause = 0, this._animations.forEach((e) => {
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
		this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._paused = !1, this._elapsedAtPause = 0, this._startTime = 0, this._clearReset(), this._resetTimer = setTimeout(() => {
			this._resetTimer = null, this._graph.update(), this._updatePoints();
		}, 200);
	}
	stop() {
		this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._clearReset(), this._paused = !1, this._elapsedAtPause = 0, this._startTime = 0, this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [];
	}
	_clearReset() {
		this._resetTimer !== null && (clearTimeout(this._resetTimer), this._resetTimer = null);
	}
	isRunning() {
		return this._rafId !== null && !this._paused;
	}
	isPaused() {
		return this._paused;
	}
	canBeAnimated() {
		return !this.isRunning() && !this.isPaused() && this._updatePoints(), this._animations.size > 0;
	}
	_updatePoints() {
		return this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [], Object.values(this._graph.figures).forEach((e) => {
			if (e instanceof J && e.animate !== null) {
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
				}), this._animatedPoints.push(e);
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
				n.point.pixels = n.from, t = !0;
				continue;
			}
			let i = r - n.delay, a = Math.min(i / n.duration, 1), o = n.ease(a);
			n.point.pixels = {
				x: n.from.x + (n.to.x - n.from.x) * o,
				y: n.from.y + (n.to.y - n.from.y) * o
			}, a < 1 ? t = !0 : n.loop === "reset" ? (n.point.pixels = n.from, n.startTime = e, t = !0) : n.loop === "reverse" && ([n.from, n.to] = [n.to, n.from], n.startTime = e, t = !0);
		}
		this._graph.update(this._animatedPoints), this._rafId = t ? requestAnimationFrame(this._step) : null;
	};
};
function Du(e) {
	return e === !0 || e === "1" || e === 1 ? "reset" : typeof e == "string" && Object.values(Tu).includes(e) ? e : "none";
}
// src/Graph.ts
var Ou = "MAINGRID", ku = "-edge", Au = [
	Ou,
	r.X,
	r.Y,
	`${r.X}${ku}`,
	`${r.Y}${ku}`
], ju = 5;
function Mu(e, t = ju) {
	if (e instanceof K) return [e];
	if (t === 0 || typeof e != "object" || !e) return [];
	let n = Object.getPrototypeOf(e);
	return !Array.isArray(e) && n !== Object.prototype && n !== null ? [] : [...new Set(Object.values(e).flatMap((e) => Mu(e, t - 1)))];
}
var Nu = class extends EventTarget {
	_animation = null;
	_layout;
	_decor = [];
	_lines = /* @__PURE__ */ new Map();
	_held = /* @__PURE__ */ new Set();
	_total = 0;
	_links = /* @__PURE__ */ new Map();
	_dependents = null;
	constructor(e, t) {
		super();
		let { config: r, display: i } = Ps(t), a = typeof e == "string" ? document.getElementById(e) : e;
		if (a === null) throw new R(`Cannot find the element "${e}" to draw the graph in`);
		let o = document.createElement("DIV");
		o.style.position = "relative", o.style.width = "100%", o.style.height = "auto", o.style.userSelect = "none", a.appendChild(o), this._wrapper = o, this._config = r, this._display = i, this._toTex = t?.tex, this._rootSVG = Fa().addTo(o), this._fitSvg(), this._rootSVG.defs(), this._layers = {}, Object.values(n).forEach((e) => {
			this._layers[e] = this._rootSVG.group().attr("id", `LAYER_${e}`);
		}), this._figures = Object.create(null);
		try {
			this._layout = this._makeLayout();
		} catch (e) {
			throw o.remove(), e;
		}
	}
	_wrapper;
	_config;
	get config() {
		return this._config;
	}
	_display;
	get display() {
		return this._display;
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
			point: (t, r, i) => {
				let a = e(t) ? { coordinates: t } : t, o = this._make(r, n.POINTS, () => new J(this, r, a));
				return i && o.addLabel(r, i.html, this._toTex), o;
			},
			line: this._maker(Yc, n.MAIN),
			path: this._maker(vu, n.MAIN),
			bezier: this._maker(wu, n.MAIN),
			plot: this._maker(Ol, n.PLOTS),
			parametric: this._maker(ru, n.PLOTS),
			circle: this._maker(Ml, n.MAIN),
			polygon: this._maker(Rl, n.MAIN),
			arc: this._maker(Ql, n.MAIN),
			follow: this._maker(au, n.PLOTS_FOREGROUND),
			fillbetween: this._maker(du, n.PLOTS_BACKGROUND),
			grid: this._maker(Gl, n.GRIDS),
			axis: this._maker(al, n.MAIN),
			riemann: this._maker(hu, n.PLOTS_BACKGROUND)
		};
	}
	get animation() {
		return this._animation ??= new Eu(this), this._animation;
	}
	_mainGrid = null;
	get mainGrid() {
		return this._mainGrid;
	}
	get axes() {
		return this._layout.axes;
	}
	get drawnAxes() {
		return this._layout.drawn;
	}
	remove(e, t) {
		if (!Object.hasOwn(this._figures, e)) throw new R(`There is no figure named "${e}" to remove`);
		let n = this._figures[e], r = this._affectedBy([n]);
		if (r.length > 0 && t?.cascade !== !0) throw new R(`Cannot remove the figure "${e}": ${r.map((e) => `"${e.name}"`).join(", ")} depend on it (remove them first, or use {cascade: true})`);
		let i = [...r.reverse(), n];
		return i.forEach((e) => {
			this._detach(e);
		}), i.map((e) => e.name);
	}
	clear() {
		this._animation?.stop(), Object.values(this._figures).forEach((e) => {
			this._detach(e);
		});
	}
	dispose() {
		this.clear(), this._clearLayout(), this._lines.forEach((e) => {
			e.dispose(), e.element.remove();
		}), this._lines.clear(), this._wrapper.remove();
	}
	draggable(e, t = {}) {
		this._checkDraggable(e, t);
		let { along: n, bounds: r, callback: i, follow: a = [], grid: o, target: s } = t;
		return this._held.add(e), s && this._held.add(s), this._layers.interactive.add(e.element), e.isDraggable = !0, e.shape.draggable().on("dragstart", () => {
			this._emit("dragstart", {
				graph: this,
				figure: e
			});
		}).on("dragmove", (t) => {
			t.preventDefault();
			let { box: c } = t.detail, l = mo({
				x: Math.max(0, Math.min(c.x + c.width / 2, this._config.width)),
				y: Math.max(0, Math.min(c.y + c.height / 2, this._config.height))
			}, {
				...n ? { along: {
					axis: n,
					keep: (s ?? e).pixels
				} } : {},
				...r ? { bounds: r } : {},
				...o ? { step: this._gridStep() } : {}
			}, this._config);
			for (let e of a) l = e instanceof K ? e.follow(l.x, l.y) : e(l.x, l.y);
			if (e.pixels.x === l.x && e.pixels.y === l.y) return;
			e.pixels = l, s && (s.pixels = l), i && i(e);
			let u = this.update(s ? [e, s] : [e]);
			this._emit("dragmove", {
				graph: this,
				figure: e,
				...u
			});
		}).on("dragend", () => {
			this._emit("dragend", {
				graph: this,
				figure: e
			});
		}), e;
	}
	toPixels(e, t) {
		return U(e, this.config, t);
	}
	toCoordinates(e, t) {
		return W(e, this.config, t);
	}
	update(e, t) {
		let n = 0;
		if (e === void 0) return Object.values(this._figures).forEach((e) => {
			n += +!!this._refresh(e, t);
		}), {
			updated: n,
			total: this._total
		};
		let r = e instanceof K ? [e] : e;
		this._affectedBy(r).forEach((e) => {
			n += +!!this._refresh(e, t);
		});
		let i = new Set(r);
		return i.forEach((e) => {
			e.updateLabel();
		}), {
			updated: n + i.size,
			total: this._total
		};
	}
	updateLayout(e, t) {
		e !== void 0 && Fs(e);
		let n = {
			config: this._config,
			display: this._display
		};
		try {
			this._config = e ?? this._config, this._display = t ?? this._display, this._fitSvg(), this._layout = this._makeLayout();
		} catch (e) {
			throw this._config = n.config, this._display = n.display, this._fitSvg(), this._layout = this._makeLayout(), e;
		}
		this.update(void 0, !0);
	}
	on(e, t) {
		return this.addEventListener(e, t), this;
	}
	off(e, t) {
		return this.removeEventListener(e, t), this;
	}
	tikz() {
		let e = /* @__PURE__ */ new Map();
		[
			...Object.values(this._figures),
			...this._decor,
			...this._lines.values()
		].forEach((t) => {
			e.set(t.element.node, t);
		});
		let t = [];
		for (let r of Object.values(n)) r !== n.INTERACTIVE && this._layers[r].children().forEach((n) => {
			let r = e.get(n.node);
			r && t.push(r.tikz());
		});
		return vc(this._config, t);
	}
	tikzPreamble() {
		return _c;
	}
	_fitSvg() {
		let { width: e, height: t } = this._config;
		this._rootSVG.viewbox(0, 0, e, t).css({
			width: `${e}px`,
			"max-width": "100%",
			height: "auto"
		});
	}
	_emit(e, t) {
		this.dispatchEvent(new CustomEvent(e, { detail: t }));
	}
	_refresh(e, t) {
		return this._held.has(e) ? (e.updateLabel(), !0) : (e.static || e.isDraggable) && t !== !0 ? !1 : (e.update(t), !0);
	}
	_gridStep() {
		let e = this._display.grid;
		return Bl(typeof e == "object" ? e : {});
	}
	_checkDraggable(e, t) {
		if (!(e instanceof J)) throw new R(`Only a point can be made draggable: ${e instanceof K ? `"${e.name}" is a ${e.constructor.name}` : "it is not a figure"}`);
		if (this._held.has(e) || e.isDraggable) throw new R(`The point "${e.name}" is already draggable`);
		let { along: n, bounds: r, follow: i, target: a } = t;
		if (n !== void 0 && n !== "x" && n !== "y") throw new R(`Invalid along ${JSON.stringify(n)} for the point "${e.name}": expected 'x' or 'y'`);
		if (a !== void 0 && !(a instanceof J)) throw new R(`The target of the point "${e.name}" must be a point`);
		if (i !== void 0 && (!Array.isArray(i) || i.some((e) => typeof e != "function" && !(e instanceof K)))) throw new R(`The follow of the point "${e.name}" must be a list of functions and figures`);
		for (let [t, n] of Object.entries(r ?? {})) if (n !== void 0 && !(Number.isFinite(n.min) && Number.isFinite(n.max))) throw new R(`Invalid bounds ${t} ${JSON.stringify(n)} for the point "${e.name}": expected {min, max}, two finite numbers`);
	}
	_detach(e) {
		e.dispose(), e.element.remove(), delete this._figures[e.name], this._total--, this._held.delete(e), this._links.delete(e), this._dependents = null;
	}
	_dependentsMap() {
		let e = Object.values(this._figures), t = this._dependents === null;
		for (let n of e) this._links.get(n)?.config !== n.config && (this._links.set(n, {
			config: n.config,
			dependencies: Mu(n.config)
		}), t = !0);
		if (this._dependents !== null && !t) return this._dependents;
		let n = /* @__PURE__ */ new Map();
		for (let t of e) for (let e of this._links.get(t)?.dependencies ?? []) n.set(e, [...n.get(e) ?? [], t]);
		return this._dependents = n, n;
	}
	_affectedBy(e) {
		let t = this._dependentsMap(), n = /* @__PURE__ */ new Map(), r = [], i = (e) => {
			n.set(e, "visiting");
			for (let r of t.get(e) ?? []) {
				let t = n.get(r);
				if (t === "visiting") throw new R(`The figure "${r.name}" depends on itself, through "${e.name}"`);
				t === void 0 && i(r);
			}
			n.set(e, "done"), r.push(e);
		};
		return e.forEach((e) => {
			n.has(e) || i(e);
		}), r.reverse().filter((t) => !e.includes(t));
	}
	_clearLayout() {
		this._decor.forEach((e) => {
			e.dispose(), e.element.remove();
		}), this._decor = [], this._mainGrid = null;
	}
	_makeLayout() {
		this._clearLayout();
		let e = this._display.grid;
		this._mainGrid = e ? this._decorate(new Gl(this, Ou, e === !0 ? {} : e), n.GRIDS) : null;
		let { origin: t, axis: i, width: a, height: o } = this._config, s = Uc(this._display.axis), c = Rs(t, a, o, i), l = this._makeLayoutAxis(r.X, i.x, s.x, c.x), u = this._makeLayoutAxis(r.Y, i.y, s.y, c.y);
		return (/* @__PURE__ */ new Set([
			l.line,
			l.drawn,
			u.line,
			u.drawn
		])).forEach((e) => {
			this._layers.axis.add(e.element);
		}), {
			axes: {
				x: l.line,
				y: u.line
			},
			drawn: {
				x: l.drawn,
				y: u.drawn
			}
		};
	}
	_makeLayoutAxis(e, t, n, r) {
		if (!r.displaced) {
			let i = this._makeAxis(e, t, this._config.origin, n, r.side, !0);
			return {
				line: i,
				drawn: i
			};
		}
		let i = this._makeAxis(e, t, this._config.origin, !1, r.side, !0);
		return {
			line: i,
			drawn: n === !1 ? i : this._makeAxis(`${e}${ku}`, t, r.A, n, r.side)
		};
	}
	_makeAxis(e, t, r, i, a, o = !1) {
		let s = Wc({
			A: r,
			d: t
		}, a, i), c = o ? this._lines.get(e) : void 0;
		return c ? (c.resetStyle(), c.config = s) : o ? (c = new al(this, e, s), this._layers.axis.add(c.element), this._lines.set(e, c)) : c = this._decorate(new al(this, e, s), n.AXIS), c.static = !0, i === !1 ? c.hide() : c;
	}
	_decorate(e, t) {
		return this._layers[t].add(e.element), this._decor.push(e), e;
	}
	_maker(e, t) {
		return (n, r) => this._make(r, t, () => new e(this, r, n));
	}
	_make(e, t, n) {
		this._checkName(e);
		let r = n();
		return this._layers[t].add(r.element), this._figures[e] = r, this._total++, r;
	}
	_checkName(e) {
		let t = e;
		if (typeof t != "string" || t.trim() === "") throw new R(`Invalid name ${JSON.stringify(t)} for a figure: expected a text`);
		if (Au.includes(e)) throw new R(`The name "${e}" is the one of a figure of the layout of the graph (the grid and the axes): choose another name`);
		if (Object.hasOwn(this._figures, e)) throw new R(`There is already a figure named "${e}"`);
	}
}, Y = /* @__PURE__ */ function(e) {
	return e.UNKNOWN = "unknown", e.POINT = "pt", e.MIDDLE = "mid", e.PROJECTION = "proj", e.INTERSECTION = "inter", e.SYMMETRY = "sym", e.DIRECTION_POINT = "dpt", e.VECTOR_POINT = "vpt", e.EVAL_FX = "eval", e.LINE = "line", e.VECTOR = "vec", e.SEGMENT = "seg", e.RAY = "ray", e.PERPENDICULAR = "perp", e.PARALLEL = "para", e.MEDIATOR = "med", e.TANGENT = "tan", e.BISECTOR = "bis", e.CIRCLE = "circ", e.ARC = "arc", e.PLOT = "plot", e.PARAMETRIC = "parametric", e.BEZIER = "bezier", e.POLYGON = "poly", e.GRID = "grid", e.AXIS = "axis", e.FOLLOW = "follow", e.FILL_BETWEEN = "fill", e.RIEMANN = "riemann", e.PATH = "path", e;
}({});
function Pu(e, t) {
	return e.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
var Fu = [
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
], X = (e) => e instanceof J, Iu = (e) => e instanceof Yc, Lu = (e) => e === "*";
function Ru(e, t) {
	if (typeof e != "string") return null;
	let n = e.split(":");
	if (n.length !== 2) return null;
	let [r, i] = n.map((e) => Object.hasOwn(t, e) ? t[e] : void 0);
	return r instanceof J && i instanceof J ? [r, i] : null;
}
function zu(e, t) {
	if (typeof e == "number" || X(e)) return e;
	let n = Ru(e, t);
	return n === null ? null : {
		point1: n[0],
		point2: n[1]
	};
}
function Z(e) {
	return e instanceof Object && "name" in e && typeof e.name == "string" ? `the figure "${e.name}"` : e === void 0 ? "nothing" : JSON.stringify(e);
}
function Q(e, t, n) {
	throw new I(`Cannot build "${e.name}" (${e.key}): expected ${t}, got ${n}`);
}
function Bu(e, t, n, r, i) {
	(t.length < n || t.length > r) && Q(e, i, `${t.length} value${t.length === 1 ? "" : "s"}`);
}
// src/figures/Arc/Arc.parser.ts
var Vu = "arc", Hu = "three points (start, center, end) and a radius, a center with a radius and two angles, or a center, a point and an angle and a radius (the radius is always optional but with the two angles), all with a last * for the other arc";
function Uu(e, t) {
	if (e.key !== Y.ARC.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define an arc`);
	let n = Pu(e.values, t), r = Lu(n.at(-1)), i = Wu(r ? n.slice(0, -1) : n, t) ?? Q(e, Hu, n.length === 0 ? "no value" : n.map(Z).join(", "));
	return {
		create: Vu,
		config: r ? {
			...i,
			alternative: r
		} : i
	};
}
function Wu(e, t) {
	let [n, r, i, a] = e;
	if (!X(n) || e.length < 3 || e.length > 4) return null;
	if (X(r) && X(i)) {
		let e = a === void 0 ? void 0 : zu(a, t);
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
	if (X(r) && typeof i == "number") {
		let e = a === void 0 ? void 0 : zu(a, t);
		return e === null ? null : { rotation: {
			center: n,
			start: r,
			angle: i,
			...e === void 0 ? {} : { radius: e }
		} };
	}
	return null;
}
var Gu = {
	sector: (e) => e.asSector(),
	square: (e) => e.asSquare()
};
Object.keys(Gu);
function Ku(e, t, n) {
	if (!(e instanceof Ql)) throw new L(t, `The option "${t}" shapes an arc, and "${e.name}" is not an arc`);
	if (n !== !0) throw new L(t, `Invalid value ${Z(n)} for the option "${t}" of "${e.name}": it takes no value`);
	Gu[t](e);
}
// src/parser/parser.step.ts
var qu = /^(\d*\.?\d*)pi$/, Ju = /^(\d*\.?\d*)pi(?:\/(\d+))?$/, Yu = 2;
function Xu(e, t) {
	throw new I(`Cannot read the parameter ${e}: expected ${t}`);
}
function Zu({ value: e, options: t }, n) {
	let r = `"${n}=${[e, ...t].map((e) => Z(e)).join("/")}"`;
	if (e === !0) return t.length === 0 ? null : Xu(r, `no option after ${n}`);
	if (typeof e == "number") return (t.length > 0 || !(Number.isFinite(e) && e > 0)) && Xu(r, `a step greater than 0 (${n}=0.5)`), {
		step: e,
		pi: !1
	};
	let i = typeof e == "string" ? qu.exec(e) : null;
	if (i === null) return Xu(r, `a step (${n}=0.5, ${n}=pi, ${n}=2pi/3), got ${Z(e)}`);
	let a = i[1] === "" ? 1 : +i[1], o = t.length === 0 ? Yu : t[0];
	return (t.length > 1 || typeof o != "number" || !Number.isInteger(o) || o <= 0 || !(a > 0)) && Xu(r, `a multiple of pi over an integer greater than 0 (${n}=pi/3)`), {
		step: a * Math.PI / o,
		pi: !0
	};
}
function Qu(e) {
	if (typeof e == "number") return Number.isFinite(e) && e > 0 ? {
		step: e,
		pi: !1
	} : null;
	let t = typeof e == "string" ? Ju.exec(e) : null;
	if (t === null) return null;
	let n = t[1] === "" ? 1 : +t[1], r = t.at(2) === void 0 ? Yu : +t[2];
	return n > 0 && r > 0 ? {
		step: n * Math.PI / r,
		pi: !0
	} : null;
}
var $ = (e) => e !== void 0 && e.value !== !1;
// src/figures/Axis/Axis.parser.ts
function $u(e, t) {
	let { value: n, options: r } = e;
	if (typeof n != "string" && typeof n != "number" || r.length > 0 || String(n).trim() === "") throw new I(`Cannot read the parameter "${t}=${Z(n)}": expected a name (${t}=x)`);
	return String(n);
}
function ed({ value: e, options: t }, n, r) {
	if (e === "none" && r && t.length === 0) return "none";
	if (e === "first" && t.length === 0) return { first: !0 };
	if (typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= 1e3) {
		if (t.length === 0) return { every: e };
		if (t.length === 1 && t[0] === "first") return {
			every: e,
			first: !0
		};
	}
	throw new I(`Cannot read the option "${n}=${[e, ...t].map((e) => Z(e)).join("/")}": expected an integer from 1 to ${zc} (${n}=5), first, 5/first${r ? " or none" : ""}`);
}
function td(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e)) if (r === "ticks") t.marks = ed(i, r, !1);
	else if (r === "numbers") t.numbers = ed(i, r, !0);
	else if (r === "padding") t.padding = nd(i);
	else if (r === "name" || r === "side") throw new I(`The option "${r}" is for an axis drawn from the code, not for the axes of the graph: ${r === "name" ? "use axisXname or axisYname" : "the graph puts the numbers inside of the drawing"}`);
	else n[r] = i;
	return {
		extra: t,
		style: n
	};
}
function nd({ value: e, options: t }) {
	if (typeof e != "number" || t.length > 0 || !(Number.isFinite(e) && e >= 0)) throw new I(`Cannot read the option "padding=${Z(e)}": expected a number of 0 or more (pixels)`);
	return e;
}
function rd(e, t = {}) {
	let n = $(e.axis) ? Zu(e.axis, "axis") : null, r = (t, n, r, i, a, o) => {
		if (!($(e.axis) || $(t) || $(r))) return !1;
		let s = $(t) ? Zu(t, n) : null, c = s === null ? { ...a } : {
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
		return $(r) ? {
			...l,
			name: $u(r, i)
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
var id = "two points (the zero, then the unit), then a step: a number (0.5) or a number of pi (pi/2)";
function ad(e, t) {
	if (e.key !== Y.AXIS.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define an axis`);
	let [n, r, ...i] = Pu(e.values, t);
	if (!X(n) || !X(r) || i.length > 1) return Q(e, id, e.values.length === 0 ? "no value" : e.values.map(Z).join(", "));
	if (i.length === 0) return {
		create: "axis",
		config: {
			through: {
				A: n,
				B: r
			},
			ticks: {}
		}
	};
	let a = Qu(i[0]);
	return a === null ? Q(e, id, Z(i[0])) : {
		create: "axis",
		config: {
			through: {
				A: n,
				B: r
			},
			ticks: {
				step: a.step,
				labels: a.pi ? "pi" : "numbers"
			}
		}
	};
}
function od(e, t, n) {
	if (!(e instanceof al)) throw new L(t, `The option "${t}" is for an axis, and "${e.name}" is not one`);
	let { value: r, options: i } = n, a = e.config, o = (n) => new L(t, `Invalid value ${Z(r)} for the option "${t}" of "${e.name}": expected ${n}`), s;
	try {
		switch (t) {
			case "ticks":
				s = {
					...a,
					ticks: {
						...a.ticks,
						marks: ed(n, t, !1)
					}
				};
				break;
			case "numbers":
				s = {
					...a,
					ticks: {
						...a.ticks,
						numbers: ed(n, t, !0)
					}
				};
				break;
			case "padding":
				s = {
					...a,
					padding: nd(n)
				};
				break;
			case "name":
				if (typeof r != "string" && typeof r != "number" || i.length > 0 || String(r).trim() === "") throw o("a name (name=t)");
				s = {
					...a,
					name: String(r)
				};
				break;
			case "side":
				if (r !== "left" && r !== "right" || i.length > 0) throw o("left or right");
				s = {
					...a,
					side: r
				};
		}
		e.config = s;
	} catch (n) {
		throw n instanceof L ? n : n instanceof R || n instanceof I ? new L(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
// src/figures/Circle/Circle.parser.ts
var sd = "circle", cd = "a center and a radius (a number, a point or A:B), a center and a line or an axis, three points (with a last * for the inscribed circle), or A:B for a diameter";
function ld(e, t) {
	if (e.key !== Y.CIRCLE.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a circle`);
	return {
		create: sd,
		config: ud(Pu(e.values, t), e, t)
	};
}
function ud(e, t, n) {
	let r = () => Q(t, cd, e.length === 0 ? "no value" : e.map(Z).join(", "));
	if (e.length === 1) {
		let t = Ru(e[0], n);
		return t === null ? r() : { diameter: {
			A: t[0],
			B: t[1]
		} };
	}
	if (e.length === 2) {
		let [t, i] = e;
		if (!X(t)) return r();
		if (Iu(i)) return { tangent: {
			center: t,
			to: i
		} };
		let a = zu(i, n);
		return a === null ? r() : {
			center: t,
			radius: a
		};
	}
	if (e.length === 3 || e.length === 4) {
		let [t, n, r, i] = e;
		if (X(t) && X(n) && X(r)) {
			if (e.length === 3) return { through: {
				A: t,
				B: n,
				C: r
			} };
			if (Lu(i)) return { inscribed: {
				A: t,
				B: n,
				C: r
			} };
		}
	}
	return r();
}
// src/figures/Line/Line.parser.ts
var dd = "line", fd = (e) => (t, n) => {
	Bu(n, t, 2, 2, "two points");
	let [r, i] = t;
	return X(r) && X(i) ? {
		through: {
			A: r,
			B: i
		},
		shape: e
	} : Q(n, "two points", `${Z(r)} and ${Z(i)}`);
};
function pd(e, t) {
	try {
		return eo(e);
	} catch (n) {
		if (n instanceof I) return Q(t, "a slope, a number or a fraction", Z(e));
		throw n;
	}
}
var md = (e) => (t, n) => {
	let r = "a line or an axis, and a point";
	Bu(n, t, 2, 2, r);
	let [i, a] = t;
	return Iu(i) && X(a) ? e === "perpendicular" ? { perpendicular: {
		to: i,
		through: a
	} } : { parallel: {
		to: i,
		through: a
	} } : Q(n, r, `${Z(i)} and ${Z(a)}`);
}, hd = {
	[Y.LINE]: (e, t) => {
		let n = "an equation, two points, or a point and a slope";
		if (Bu(t, e, 1, 2, n), e.length === 1) {
			let [r] = e;
			return typeof r == "string" ? { equation: r } : Q(t, n, Z(r));
		}
		let [r, i] = e;
		return X(r) && X(i) ? {
			through: {
				A: r,
				B: i
			},
			shape: "line"
		} : X(r) && (typeof i == "number" || typeof i == "string") ? {
			slope: {
				A: r,
				slope: pd(i, t)
			},
			shape: "line"
		} : Q(t, n, `${Z(r)} and ${Z(i)}`);
	},
	[Y.SEGMENT]: fd("segment"),
	[Y.VECTOR]: fd("vector"),
	[Y.RAY]: fd("ray"),
	[Y.PERPENDICULAR]: md("perpendicular"),
	[Y.PARALLEL]: md("parallel"),
	[Y.MEDIATOR]: (e, t) => {
		Bu(t, e, 2, 2, "two points");
		let [n, r] = e;
		return X(n) && X(r) ? { mediator: {
			A: n,
			B: r
		} } : Q(t, "two points", `${Z(n)} and ${Z(r)}`);
	},
	[Y.TANGENT]: (e, t) => {
		let n = "a curve and a point";
		Bu(t, e, 2, 2, n);
		let [r, i] = e;
		return r instanceof Ol && X(i) ? { tangent: {
			f: r,
			A: i
		} } : Q(t, n, `${Z(r)} and ${Z(i)}`);
	},
	[Y.BISECTOR]: (e, t) => {
		let n = "two lines or axes (with a last * for the other bisector), or three points (the vertex of the angle is the second)";
		Bu(t, e, 2, 3, n);
		let [r, i] = e, a = e.at(2);
		return Iu(r) && Iu(i) && (a === void 0 || Lu(a)) ? a === void 0 ? { bisector: {
			d1: r,
			d2: i
		} } : { bisector: {
			d1: r,
			d2: i,
			alternative: !0
		} } : e.length === 3 && X(r) && X(i) && X(a) ? { bisector: {
			A: i,
			B: r,
			C: a
		} } : Q(t, n, e.map(Z).join(", "));
	}
};
function gd(e, t) {
	let n = Object.hasOwn(hd, e.key) ? hd[e.key] : void 0;
	if (n === void 0) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a line`);
	return {
		create: dd,
		config: n(Pu(e.values, t), e)
	};
}
var _d = [Y.GRID], vd = "[A-Z][0-9]*", yd = [
	[RegExp(`^v(${vd})(${vd})$`), Y.VECTOR],
	[RegExp(`^\\[(${vd})(${vd})\\]$`), Y.SEGMENT],
	[RegExp(`^(${vd})(${vd})\\.$`), Y.SEGMENT],
	[RegExp(`^\\[(${vd})(${vd})\\[$`), Y.RAY],
	[RegExp(`^(${vd})(${vd})\\[$`), Y.RAY],
	[RegExp(`^\\[(${vd})(${vd})$`), Y.RAY],
	[RegExp(`^(${vd})(${vd})$`), Y.LINE]
];
function bd(e) {
	let t = e.indexOf("=");
	if (t <= 0 || e.includes(" ")) return null;
	let n = e.slice(0, t), r = e.slice(t + 1);
	if (_d.includes(r)) return null;
	for (let [e, t] of yd) {
		let i = e.exec(r);
		if (i !== null) return `${n}=${t} ${i[1]},${i[2]}`;
	}
	throw new I(`Cannot read "${e}" as a line: expected two points, like AB, AB., [AB], AB[, [AB[ or vAB, after the "="`);
}
// src/parser/parser.curve.ts
function xd(e, t, n) {
	try {
		let t = new wo(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof I || e instanceof R)) throw e;
	}
	return Q(t, n, `${JSON.stringify(e)} as a bound (a number, or an expression of numbers like 2pi)`);
}
function Sd(e, t, n) {
	let r = e.split(":");
	if (r.length !== 2 || r.some((e) => e.trim() === "")) return Q(t, n, `${JSON.stringify(e)} (expected min:max)`);
	let i = xd(r[0], t, n), a = xd(r[1], t, n);
	return i > a ? Q(t, n, `${JSON.stringify(e)}, whose minimum is greater than its maximum`) : {
		min: i,
		max: a
	};
}
function Cd(e) {
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
function wd(e, n, r, i) {
	let a = {}, o = [];
	for (let s of e) {
		let e = s;
		if (typeof s == "string" && s.includes("@")) {
			let t = s.lastIndexOf("@"), r = +s.slice(t + 1);
			(a.samples !== void 0 || s.slice(t + 1).trim() === "" || !Number.isFinite(r) || r <= 0) && Q(n, i, `${Z(s)} as the samples (a single @ and a number greater than 0)`), a.samples = r, e = s.slice(0, t);
		}
		e !== "" && (o.length >= r && Q(n, i, `${Z(s)} after the ${r === 1 ? "domain" : "domain and the image"}`), typeof e == "string" ? o.push(Sd(e, n, i)) : t(e) ? o.push({
			min: e.min,
			max: e.max
		}) : Q(n, i, Z(s)));
	}
	return o.length > 0 && (a.domain = o[0]), o.length > 1 && (a.image = o[1]), a;
}
// src/figures/FillBetween/FillBetween.parser.ts
var Td = "fillbetween", Ed = "a plot, then another plot (or nothing for the x axis), then a domain (min:max, like 0:2pi)";
function Dd(e, n) {
	if (e.key !== Y.FILL_BETWEEN.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define an area between plots`);
	let [r, ...i] = Pu(e.values, n);
	if (!(r instanceof Ol)) return Q(e, Ed, e.values.length === 0 ? "no value" : `${Z(e.values[0])}, which is not a plot`);
	let a = i.at(0), o = a !== void 0 && !(typeof a == "string" || t(a));
	if (o && !(a instanceof Ol)) return Q(e, Ed, `${Z(a)}, which is not a plot`);
	let s = e.values.slice(o ? 2 : 1);
	if (s.length > 1) return Q(e, Ed, e.values.map(Z).join(", "));
	let c = wd(s, e, 1, Ed);
	return c.samples === void 0 ? {
		create: Td,
		config: {
			plot: r,
			...o ? { other: a } : {},
			...c.domain === void 0 ? {} : { domain: c.domain }
		}
	} : Q(e, Ed, Z(s[0]));
}
// src/parser/parser.interval.ts
function Od(e, t) {
	try {
		let t = new wo(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof I || e instanceof R)) throw e;
	}
	throw new I(`Cannot read the parameter "${t}": ${JSON.stringify(e)} is not a number, or an expression of numbers like 2pi`);
}
function kd(e) {
	return t(e) && !("step" in e) || typeof e == "string" && e.includes(":");
}
function Ad(e, n) {
	let r, i;
	if (t(e) && !("step" in e)) ({min: r, max: i} = e);
	else if (typeof e == "number" || typeof e == "string" && !e.includes(":")) i = typeof e == "number" ? e : Od(e, n), r = -i;
	else if (typeof e == "string") {
		let [t, a, ...o] = e.split(":");
		if (o.length > 0 || t.trim() === "" || a.trim() === "") throw new I(`Cannot read the parameter "${n}=${e}": expected min:max, or one number for -n:n`);
		r = Od(t, n), i = Od(a, n);
	} else throw new I(`Cannot read the parameter "${n}=${Z(e)}": expected min:max, or one number for -n:n`);
	if (!(Number.isFinite(r) && Number.isFinite(i) && r < i)) throw new I(`Invalid interval ${Z(e)} for the parameter "${n}": expected a minimum lower than the maximum`);
	return {
		min: r,
		max: i
	};
}
// src/figures/Grid/Grid.parser.ts
function jd(e, t, n) {
	if (!$(e) && !$(t) && !$(n)) return null;
	let r = $(e) ? Zu(e, "grid") : null, i = $(t) ? Zu(t, "gridX") : null, a = $(n) ? Zu(n, "gridY") : null, o = {
		x: i?.step ?? r?.step ?? 1,
		y: a?.step ?? (r === null || r.pi ? 1 : r.step)
	};
	return o.x === 1 && o.y === 1 ? {} : { step: o };
}
var Md = "an x interval and a y interval (0:5,0:3, a bound can be 2pi) for a part of the drawing, then a step: a number (0.5), a number of pi (pi/3) or a step for each axis (0.5;1)";
function Nd(t) {
	if (t.key !== Y.GRID.toString()) throw new I(`Cannot build "${t.name}" (${t.key}): the key does not define a grid`);
	let n = t.values.length === 1 && t.values[0] === !0 ? [] : t.values, [r, i, ...a] = n, o = kd(r);
	if (o && !kd(i)) return Q(t, Md, `${Z(r)} alone`);
	let s = o ? a : n, c = {};
	if (s.length > 1) return Q(t, Md, n.map(Z).join(", "));
	if (o) try {
		c.x = Ad(r, "x"), c.y = Ad(i, "y");
	} catch (e) {
		throw e instanceof I ? new I(`Cannot build "${t.name}" (${t.key}): ${e.message}`, { cause: e }) : e;
	}
	if (s.length === 1) {
		let [n] = s, r = e(n) && !kd(n) ? Pd(n) : Qu(n);
		if (r === null) return Q(t, Md, Z(n));
		c.step = "x" in r ? r : {
			x: r.step,
			y: r.pi ? 1 : r.step
		};
	}
	return {
		create: "grid",
		config: c
	};
}
function Pd(e) {
	return Number.isFinite(e.x) && Number.isFinite(e.y) && e.x > 0 && e.y > 0 ? {
		x: e.x,
		y: e.y
	} : null;
}
function Fd(e, t, n) {
	if (!(e instanceof Gl)) throw new L(t, `The option "${t}" cuts the steps of a grid, and "${e.name}" is not one`);
	let r = n === !0 ? 2 : n;
	try {
		e.config = {
			...e.config,
			subdivisions: r
		};
	} catch (r) {
		throw r instanceof R ? new L(t, `Invalid value ${Z(n)} for the option "${t}" of "${e.name}": expected an integer from 2 to 20`, { cause: r }) : r;
	}
}
// src/figures/Follow/Follow.parser.ts
var Id = "follow", Ld = "a line, a circle or a curve to follow, then a point where to start, and a last * to draw the tangent";
function Rd(e, t) {
	if (e.key !== Y.FOLLOW.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a point that follows a figure`);
	let n = Pu(e.values, t), r = Lu(n.at(-1)), i = r ? n.slice(0, -1) : n, a = i.at(0), o = i.at(1);
	return a instanceof K ? a.followable ? o !== void 0 && !(o instanceof J) || i.length > 2 ? Q(e, Ld, n.map(Z).join(", ")) : {
		create: Id,
		config: {
			follow: a,
			...o === void 0 ? {} : { at: o },
			...r ? { tangent: r } : {}
		}
	} : Q(e, Ld, `${Z(a)}, which cannot be followed`) : Q(e, Ld, n.length === 0 ? "no value" : Z(n[0]));
}
// src/figures/Parametric/Parametric.parser.ts
var zd = "parametric", Bd = "two functions of t (x then y), then a domain (min:max, like 0:2pi) and a number of samples per unit (@50)";
function Vd(e, t) {
	if (e.key !== Y.PARAMETRIC.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a parametric curve`);
	let n = Cd(e.values.at(0)), r = Cd(e.values.at(1));
	if (n === null || r === null || n.text.trim() === "" || r.text.trim() === "") return Q(e, Bd, e.values.length === 0 ? "no value" : e.values.map(Z).join(", "));
	let { domain: i, samples: a } = wd([
		...n.samples,
		...r.samples,
		...e.values.slice(2)
	], e, 1, Bd);
	return {
		create: zd,
		config: {
			expressions: {
				x: n.text,
				y: r.text
			},
			...i === void 0 ? {} : { domain: i },
			...a === void 0 ? {} : { samples: a }
		}
	};
}
var Hd = /^([a-z][0-9]*)\(t\)/;
function Ud(e) {
	let t = Hd.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new I(`Cannot read the curve "${e}": expected ${t[1]}(t)=<function of x>,<function of y>`);
	return `${t[1]}=${Y.PARAMETRIC} ${n.slice(1)}`;
}
// src/figures/Path/Path.parser.ts
var Wd = "the data of an SVG path in units of the coordinate system, like M 0,0 L 2,1 Q 3,3 4,0 Z";
function Gd(e) {
	if (e.key !== Y.PATH.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a path`);
	if (e.values.length === 0 || e.values.some((e) => typeof e != "string" && typeof e != "number")) return Q(e, Wd, e.values.length === 0 ? "no value" : e.values.map(Z).join(", "));
	let t = e.values.map(String).join(",");
	try {
		Us(t);
	} catch (t) {
		throw t instanceof I ? new I(`Cannot build "${e.name}" (${e.key}): ${t.message}`, { cause: t }) : t;
	}
	return {
		create: "path",
		config: {
			d: t,
			units: !0
		}
	};
}
// src/figures/Plot/Plot.parser.ts
var Kd = "plot", qd = "an expression or three points (the parabola through them), then a number of samples per unit (@50), a domain (min:max, like -2pi:2pi) and an image (min:max)";
function Jd(e, t) {
	if (e.key !== Y.PLOT.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a plot`);
	let [n, r, i] = Pu(e.values.slice(0, 3), t);
	if (X(n) && X(r) && X(i)) return {
		create: Kd,
		config: {
			quadratic: {
				A: n,
				B: r,
				C: i
			},
			...wd(e.values.slice(3), e, 2, qd)
		}
	};
	let a = Cd(e.values.at(0));
	return a === null || a.text.trim() === "" ? Q(e, qd, e.values.length === 0 ? "no value" : Z(e.values[0])) : {
		create: Kd,
		config: {
			expression: a.text,
			...wd([...a.samples, ...e.values.slice(1)], e, 2, qd)
		}
	};
}
var Yd = /^([a-z][0-9]*)\(x\)/;
function Xd(e) {
	let t = Yd.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new I(`Cannot read the plot "${e}": expected ${t[1]}(x)=<function>`);
	return `${t[1]}=${Y.PLOT} ${n.slice(1)}`;
}
// src/figures/Riemann/Riemann.parser.ts
var Zd = "riemann", Qd = "a plot, then a domain (min:max, like 0:2pi), a number of rectangles and a position from 0 (left) to 1 (right)";
function $d(e, n) {
	if (e.key !== Y.RIEMANN.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a Riemann sum`);
	let [r, ...i] = Pu(e.values, n);
	if (!(r instanceof Ol)) return Q(e, Qd, e.values.length === 0 ? "no value" : `${Z(e.values[0])}, which is not a plot`);
	let a = i.length > 0 && (typeof i[0] == "string" || t(i[0])), o = a ? i.slice(1) : i, s = { plot: r };
	if (a) {
		let t = wd([e.values[1]], e, 1, Qd);
		if (t.samples !== void 0 || t.domain === void 0) return Q(e, Qd, Z(e.values[1]));
		s.domain = t.domain;
	}
	let c = o.at(0), l = o.at(1);
	return o.length > 2 || o.some((e) => typeof e != "number") ? Q(e, Qd, e.values.map(Z).join(", ")) : (c !== void 0 && (s.rectangles = c), l !== void 0 && (s.position = l), {
		create: Zd,
		config: s
	});
}
// src/figures/Point/Point.parser.ts
var ef = "point";
function tf(e, t, n) {
	let r = (e) => Object.hasOwn(n, e) ? n[e] : void 0;
	if (typeof e == "number") return e;
	if (typeof e == "string" && e.includes(".")) {
		let [t, n] = e.split("."), i = r(t);
		if (i instanceof J && (n === "x" || n === "y")) return {
			point: i,
			axis: n
		};
	}
	let i = Ru(e, n);
	return i === null ? Q(t, "a number, <point>.x, <point>.y or <point>:<point>", Z(e)) : {
		point1: i[0],
		point2: i[1]
	};
}
var nf = {
	[Y.POINT]: (e, t, n) => (Bu(t, e, 2, 2, "two coordinates (x,y)"), { coordinates: {
		x: tf(e[0], t, n),
		y: tf(e[1], t, n)
	} }),
	[Y.MIDDLE]: (e, t) => {
		Bu(t, e, 2, 2, "two points");
		let [n, r] = e;
		return X(n) && X(r) ? { middle: {
			A: n,
			B: r
		} } : Q(t, "two points", `${Z(n)} and ${Z(r)}`);
	},
	[Y.PROJECTION]: (e, t) => {
		Bu(t, e, 2, 2, "a point and a line or an axis");
		let [n, r] = e;
		return X(n) && Iu(r) ? { projection: {
			point: n,
			axis: r
		} } : Q(t, "a point and a line or an axis", `${Z(n)} and ${Z(r)}`);
	},
	[Y.SYMMETRY]: (e, t) => {
		Bu(t, e, 2, 2, "a point and a point, a line or an axis");
		let [n, r] = e;
		return X(n) && (X(r) || Iu(r)) ? { symmetry: {
			A: n,
			B: r
		} } : Q(t, "a point and a point, a line or an axis", `${Z(n)} and ${Z(r)}`);
	},
	[Y.DIRECTION_POINT]: (e, t) => {
		let n = "a point, a line or an axis, a distance and, to be perpendicular, a last *";
		Bu(t, e, 3, 4, n);
		let [r, i, a, o] = e;
		return X(r) && Iu(i) && typeof a == "number" && (o === void 0 || Lu(o)) ? { direction: {
			point: r,
			direction: i,
			distance: a,
			perpendicular: o !== void 0
		} } : Q(t, n, `${Z(r)}, ${Z(i)} and ${Z(a)}`);
	},
	[Y.VECTOR_POINT]: (e, t) => {
		let n = "two points, then optionally a scale (a number) and a starting point";
		Bu(t, e, 2, 4, n);
		let [r, i, a, o] = e;
		return X(r) && X(i) && (a === void 0 || typeof a == "number") && (o === void 0 || X(o)) ? { direction: {
			point: o ?? r,
			direction: {
				A: r,
				B: i
			},
			distance: a ?? 1
		} } : Q(t, n, e.map(Z).join(", "));
	},
	[Y.EVAL_FX]: (e, t, n) => {
		Bu(t, e, 2, 2, "a curve and an abscissa");
		let [r] = e;
		return r instanceof Ol ? { evaluation: {
			fx: r,
			x: tf(e[1], t, n)
		} } : Q(t, "a curve and an abscissa", `${Z(r)} as a curve`);
	}
};
function rf(e, t) {
	let n = Object.hasOwn(nf, e.key) ? nf[e.key] : void 0;
	if (n === void 0) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a point`);
	return {
		create: ef,
		config: n(Pu(e.values, t), e, t)
	};
}
function af(e, t) {
	let n = "two figures: two lines or axes, a circle and a line, or two circles";
	if (e.key !== Y.INTERSECTION.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key is not an intersection`);
	let r = Pu(e.values, t);
	Bu(e, r, 2, 2, n);
	let [i, a] = r;
	if (Iu(i) && Iu(a)) return [{
		create: ef,
		config: { intersection: {
			A: i,
			B: a
		} }
	}];
	if (i instanceof Ml && a instanceof Ml) return [0, 1].map((e) => ({
		create: ef,
		config: { intersectionBetweenCircles: {
			A: i,
			B: a,
			index: e
		} }
	}));
	let o = i instanceof Ml ? i : a, s = i instanceof Ml ? a : i;
	return o instanceof Ml && s instanceof Yc ? [0, 1].map((e) => ({
		create: ef,
		config: { intersectionWithCircle: {
			A: o,
			B: s,
			index: e
		} }
	})) : Q(e, n, `${Z(i)} and ${Z(a)}`);
}
var of = {
	o: (e, t) => e.asCircle(t),
	s: (e, t) => e.asSquare(t),
	"*": (e, t) => e.asCrosshair(t)
};
function sf(e, t, n) {
	if (!(e instanceof J)) throw new L(t, `The option "${t}" sets the shape of a point, and "${e.name}" is not a point`);
	if (n !== !0 && typeof n != "number") throw new L(t, `Invalid value ${Z(n)} for the option "${t}" of "${e.name}": expected a size, a number greater than 0`);
	try {
		of[t](e, n === !0 ? void 0 : n);
	} catch (n) {
		throw n instanceof R ? new L(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
function cf(e) {
	let t = /^([A-Z][0-9]*)\((.*)\)$/.exec(e);
	return t === null ? null : `${t[1]}=pt ${t[2].split(",").map((e) => e.trim()).join(",")}`;
}
// src/figures/Polygon/Polygon.parser.ts
var lf = "polygon", uf = "three points or more, a center with a radius (a number or A:B) and a number of sides, or two points and a number of sides; the number of sides can be followed by the step of a star (5,2)";
function df(e, t, n) {
	return typeof e == "number" && Number.isInteger(e) ? e : Q(t, uf, `${Z(e)} as the ${n} (an integer)`);
}
function ff(e, t) {
	let n = zu(e, t);
	return typeof n == "number" || n !== null && "point1" in n ? n : null;
}
function pf(e, t) {
	if (e.key !== Y.POLYGON.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a polygon`);
	let n = Pu(e.values, t), r = () => Q(e, uf, n.length === 0 ? "no value" : n.map(Z).join(", "));
	if (n.every(X)) return n.length >= 3 ? {
		create: lf,
		config: { vertices: n }
	} : r();
	let [i, a, o, s, ...c] = n;
	if (!X(i) || o === void 0 || c.length > 0) return r();
	let l = s === void 0 ? {} : { star: df(s, e, "step of the star") };
	if (X(a)) return {
		create: lf,
		config: { onSide: {
			A: i,
			B: a,
			sides: df(o, e, "number of sides"),
			...l
		} }
	};
	let u = ff(a, t);
	return u === null ? r() : {
		create: lf,
		config: { regular: {
			center: i,
			radius: u,
			sides: df(o, e, "number of sides"),
			...l
		} }
	};
}
// src/figures/Bezier/Bezier.parser.ts
var mf = "bezier", hf = "two points or more, each one a name that can be followed by a direction (H, V, S, or an angle in degrees) and a ratio (A/H/0.4, B/45/0.3), or, with a last *, 3 or 4 control points";
function gf(e, t) {
	let n = Object.hasOwn(t, e) ? t[e] : void 0;
	return n instanceof J ? n : null;
}
function _f(e) {
	let t = +e;
	return e.trim() === "" || !Number.isFinite(t) ? null : t;
}
function vf(e) {
	switch (e) {
		case "H": return "horizontal";
		case "V": return "vertical";
		case "S": return;
		default: return _f(e);
	}
}
function yf(e, t, n) {
	let r = typeof e == "string" ? e.split("/") : [], i = r.at(0), a = r.at(1), o = r.at(2), s = i === void 0 ? null : gf(i, n);
	if (s === null) return Q(t, hf, `${Z(e)} as a point`);
	let c = a === void 0 ? void 0 : vf(a), l = o === void 0 ? void 0 : _f(o);
	return c === null || r.length > 3 ? Q(t, hf, `${Z(e)} (the direction must be H, V, S or an angle in degrees)`) : l === null || l !== void 0 && l <= 0 ? Q(t, hf, `${Z(e)} (the ratio must be a number greater than 0)`) : {
		point: s,
		...c === void 0 ? {} : { direction: c },
		...l === void 0 ? {} : { ratio: l }
	};
}
function bf(e, t) {
	if (e.key !== Y.BEZIER.toString()) throw new I(`Cannot build "${e.name}" (${e.key}): the key does not define a Bézier curve`);
	let n = Lu(e.values.at(-1)), r = n ? e.values.slice(0, -1) : e.values;
	if (n) {
		let n = r.map((e) => typeof e == "string" ? gf(e, t) : null);
		return n.length !== 3 && n.length !== 4 || n.some((e) => e === null) ? Q(e, hf, r.length === 0 ? "no value" : r.map(Z).join(", ")) : {
			create: mf,
			config: { controls: n }
		};
	}
	return r.length < 2 ? Q(e, hf, r.length === 0 ? "no value" : Z(r[0])) : {
		create: mf,
		config: { through: r.map((n) => yf(n, e, t)) }
	};
}
var xf = { close: (e) => e.asClosed() };
Object.keys(xf);
function Sf(e, t, n) {
	if (!(e instanceof wu)) throw new L(t, `The option "${t}" shapes a Bézier curve, and "${e.name}" is not one`);
	if (n !== !0) throw new L(t, `Invalid value ${Z(n)} for the option "${t}" of "${e.name}": it takes no value`);
	try {
		xf[t](e);
	} catch (n) {
		throw n instanceof R ? new L(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
// src/parser/parser.config.ts
var Cf = {
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
		build: rf
	},
	vpt: {
		name: "point from two points",
		description: "Create a point from a vector defined by two points and a starting point",
		code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
		parameters: [],
		build: rf
	},
	dpt: {
		name: "point from direction line",
		description: "Create a point from a line and a starting point",
		code: "A=dpt <point>,<line>,<distance>,<perpendicular?>",
		parameters: [],
		build: rf
	},
	mid: {
		name: "mid",
		description: "Create the middle of two points",
		code: "A=mid <point>,<point>",
		parameters: [],
		build: rf
	},
	proj: {
		name: "projection",
		description: "Create the projection of a point on a line",
		code: "A=proj <point>,<line>",
		parameters: [],
		build: rf
	},
	inter: {
		name: "intersection",
		description: "Create the intersection of two lines",
		code: "A=inter <line|circle>,<line|circle>",
		parameters: [],
		build: af
	},
	sym: {
		name: "symmetry",
		description: "Create the symmetry of a point",
		code: "A=sym <point>,<point|line>",
		parameters: [],
		build: rf
	},
	eval: {
		name: "evaluate function",
		description: "Evaluate a funciton at a value",
		code: "A=eval f,3",
		parameters: [],
		build: rf
	},
	line: {
		name: "line",
		description: "Create a line, a half line or a segment",
		code: "d=<line> | <line>[ | <line>.",
		parameters: ["dash", "dot"],
		build: gd
	},
	vec: {
		name: "vector",
		description: "Create a vector",
		code: "d=v<line>",
		parameters: [],
		build: gd
	},
	seg: {
		name: "segment",
		description: "Create a segment through two points",
		code: "s=<A><B>.",
		parameters: [],
		build: gd
	},
	ray: {
		name: "ray (half line)",
		description: "Create a line, a half line or a segment",
		code: "d=<line> | <line>[ | <line>.",
		parameters: ["dash", "dot"],
		build: gd
	},
	perp: {
		name: "perpendicular",
		description: "Create the perpendicular of a line from a point",
		code: "d=perp <line>,<point>",
		parameters: [],
		build: gd
	},
	para: {
		name: "parallel",
		description: "Create a parallel line from a point",
		code: "d=para <line>,<point>",
		parameters: [],
		build: gd
	},
	med: {
		name: "mediator",
		description: "Create the mediator of two points",
		code: "d=med <point>,<point>",
		parameters: [],
		build: gd
	},
	tan: {
		name: "tangent",
		description: "Create a tangent line from a <circle|plot> by a Point",
		code: "d=tan <circle|plot>,<point>",
		parameters: [],
		build: gd
	},
	bis: {
		name: "bisector",
		description: "Create the bisector of an angle (three points), or of two lines or axes (a last * for the other bisector)",
		code: "d=bis <point>,<point>,<point> | d=bis <line>,<line>[,*]",
		parameters: [],
		build: gd
	},
	circ: {
		name: "circle",
		description: "Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last * for the inscribed circle), from a center and a tangent line, or from a diameter A:B",
		code: "c=circ <point>,<radius> | c=circ <point>,<line> | c=circ <point>,<point>,<point>[,*] | c=circ <point>:<point>",
		parameters: [],
		build: ld
	},
	arc: {
		name: "arc",
		description: "Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last * for the other arc)",
		code: "a=arc <point>,<point>,<point>[,<radius>][,*] | a=arc <point>,<number>,<number>,<number>[,*] | a=arc <point>,<point>,<number>[,<radius>][,*]",
		parameters: [
			"sector",
			"square",
			"acute"
		],
		build: Uu
	},
	plot: {
		name: "plot",
		description: "Plot a function, or the parabola through three points (a line if they are aligned)",
		code: "f(x)=<function>[@<number>,<domain>,<image>] | f=plot <function>[@<number>,<domain>,<image>] | f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]",
		parameters: [],
		build: Jd
	},
	parametric: {
		name: "parametric",
		description: "Plot a parametric function",
		code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
		parameters: [],
		build: Vd
	},
	bezier: {
		name: "bezier",
		description: "Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last *, the curve pulled by 3 or 4 control points",
		code: "b=bezier <point>[/<H|V|S|angle>[/<ratio>]],... | b=bezier <point>,<point>,<point>[,<point>],*",
		parameters: [],
		build: bf
	},
	poly: {
		name: "polygon",
		description: "Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side",
		code: "p=poly <point>,<point>,<point>,... | p=poly <point>,<radius>,<sides>[,<step>] | p=poly <point>,<point>,<sides>[,<step>]",
		parameters: [],
		build: pf
	},
	follow: {
		name: "follow",
		description: "Create a point that follows the mouse along a line, a circle or a curve (a last * draws the tangent too)",
		code: "t=follow <figure>[,<point>][,*]",
		parameters: [],
		build: Rd
	},
	fill: {
		name: "fillbetween",
		description: "Fill the area between two plots, or between a plot and the x axis",
		code: "z=fill <plot>[,<plot>][,<domain>]",
		parameters: [],
		build: Dd
	},
	path: {
		name: "path",
		description: "Draw an SVG path, written in units of the coordinate system",
		code: "p=path M 0,0 L 2,1 Q 3,3 4,0 Z",
		parameters: [],
		build: Gd
	},
	grid: {
		name: "grid",
		description: "Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph",
		code: "g=grid [<x interval>,<y interval>][,<step>]",
		parameters: [],
		build: Nd
	},
	axis: {
		name: "axis",
		description: "Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph",
		code: "a=axis <point>,<point>[,<step>]",
		parameters: [],
		build: ad
	},
	riemann: {
		name: "riemann",
		description: "Create the Riemann sum of a plot: rectangles from the x axis to its graph",
		code: "r=riemann <plot>[,<domain>][,<rectangles>][,<position>]",
		parameters: [],
		build: $d
	}
}, wf = [
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
], Tf = {
	ppu: "unitX and unitY, the length of a unit in cm (unitX=1.5)",
	subgrid: "the option subgrid of grid (grid->subgrid=4)",
	label: "default.label",
	tex: "default.tex",
	points: "default.points",
	"no-points": "default.points=no"
}, Ef = [
	"axis",
	"axisX",
	"axisY",
	"axisXname",
	"axisYname",
	"grid",
	"gridX",
	"gridY"
], Df = 8;
function Of(e) {
	let t = [], n = null;
	for (let r of e.split(",").map((e) => e.trim())) n === null ? r !== "" && (r.includes("->") ? n = r : t.push(r)) : r === "" ? (t.push(n), n = null) : n += `,${r}`;
	return n !== null && t.push(n), t;
}
function kf({ value: e, options: t }, n) {
	if (t.length > 0) throw new I(`Cannot read the parameter "${n}=${Z(e)}/${t.map(Z).join("/")}": expected min:max, or one number for -n:n`);
	return Ad(e, n);
}
function Af(e) {
	let { value: n } = e;
	if (typeof n == "object" && !t(n) && "x" in n && "y" in n) return {
		x: Ad(n.x, "box"),
		y: Ad(n.y, "box")
	};
	let r = kf(e, "box");
	return {
		x: r,
		y: { ...r }
	};
}
function jf(e, t) {
	if (!$(e)) return null;
	let { value: n, options: r } = e;
	if (typeof n != "number" || r.length > 0 || !(Number.isFinite(n) && n > 0)) throw new I(`Cannot read the parameter "${t}=${Z(n)}": expected a length in cm greater than 0 (${t}=1.5)`);
	return n;
}
function Mf(e, t) {
	if (!$(e)) return !1;
	if (e.value !== !0 || e.options.length > 0) throw new I(`Cannot read the parameter "${t}=${Z(e.value)}": expected the word ${t} alone`);
	return !0;
}
function Nf(e) {
	if (!$(e)) return { shape: "o" };
	if (e.value === "no" && e.options.length === 0) return !1;
	try {
		return If(e);
	} catch (e) {
		throw e instanceof L ? new I(`Cannot read the parameter "default.points": ${e.message} (or "no" to hide the points)`, { cause: e }) : e;
	}
}
function Pf(e, t) {
	let n = e.indexOf("->"), r = (n < 0 ? e : e.slice(0, n)).trim(), i = r.split("=")[0].trim();
	if (Object.hasOwn(Tf, i)) throw new I(`The parameter "${i}" does not exist any more: use ${Tf[i]}`);
	if (!wf.includes(i)) throw new I(`Unknown parameter "${i}": expected ${wf.join(", ")}`);
	let a = t.parameters(r, wf)[i];
	if (a === void 0) throw new I(`Cannot read the parameter "${r}"`);
	let o = n < 0 ? "" : e.slice(n + 2).trim();
	return {
		key: i,
		parameter: a,
		options: o === "" ? {} : t.parse(`layout=grid ->${o}`).parameters
	};
}
function Ff(e, t) {
	let n = {}, r = {
		x: {},
		y: {},
		grid: {}
	}, i = {
		x: {},
		y: {}
	};
	for (let a of Of(e)) {
		let { key: e, parameter: o, options: s } = Pf(a, t);
		if (Object.hasOwn(n, e)) throw new I(`The parameter "${e}" is written twice`);
		if (n[e] = o, Object.keys(s).length > 0 && !Ef.includes(e)) throw new I(`The parameter "${e}" has no options, got ${Object.keys(s).join(", ")} after "->"`);
		let c = e === "axis" || e === "axisX" || e === "axisXname", l = e === "axis" || e === "axisY" || e === "axisYname";
		if (c || l) {
			let { extra: e, style: t } = td(s);
			c && (Object.assign(r.x, t), Object.assign(i.x, e)), l && (Object.assign(r.y, t), Object.assign(i.y, e));
		}
		(e === "grid" || e === "gridX" || e === "gridY") && Object.assign(r.grid, s);
	}
	let a = $(n.box) ? Af(n.box) : null, o = {
		x: $(n.x) ? kf(n.x, "x") : a?.x ?? {
			min: -8,
			max: Df
		},
		y: $(n.y) ? kf(n.y, "y") : a?.y ?? {
			min: -8,
			max: Df
		}
	}, s = jf(n.unitX, "unitX"), c = jf(n.unitY, "unitY"), l = jd(n.grid, n.gridX, n.gridY);
	return {
		window: o,
		unit: {
			x: s ?? 1,
			y: c ?? s ?? 1
		},
		display: {
			axis: rd(n, i),
			grid: l ?? !1
		},
		defaults: {
			label: Mf(n["default.label"], "default.label"),
			tex: Mf(n["default.tex"], "default.tex"),
			points: Nf(n["default.points"])
		},
		options: r
	};
}
function If({ value: e, options: t }) {
	let n = e === !0 ? "o" : e;
	if (n !== "o" && n !== "s" && n !== "*") throw new L("points", `Invalid shape ${Z(e)} for the option "points": expected 'o', 's' or '*'`);
	let r = t.at(0);
	if (r === void 0) return { shape: n };
	if (typeof r != "number" || !Number.isFinite(r) || r <= 0) throw new L("points", `Invalid size ${Z(r)} for the option "points": expected a number greater than 0`);
	return {
		shape: n,
		size: r
	};
}
// src/figures/Label/Label.parser.ts
var Lf = /@(?:\.(\d+))?/g;
function Rf(e, t) {
	let n = Object.keys(t.labelFields()).at(0);
	if (n === void 0 || !e.includes("@")) return e;
	let r = [], i = 0;
	for (let t of e.matchAll(Lf)) {
		t.index > i && r.push(e.slice(i, t.index));
		let a = t[1];
		r.push({
			field: n,
			digits: a === void 0 ? 2 : +a
		}), i = t.index + t[0].length;
	}
	return i < e.length && r.push(e.slice(i)), r;
}
// node_modules/piparser/dist/piparser.js
var zf = (e) => {
	throw TypeError(e);
}, Bf = (e, t, n) => t.has(e) || zf("Cannot " + n), Vf = (e, t, n) => (Bf(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Hf = (e, t, n) => t.has(e) ? zf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Uf = (e, t, n, r) => (Bf(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Wf = (e, t, n) => (Bf(e, t, "access private method"), n);
function Gf(e) {
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
	return e.startsWith("[") && e.endsWith("]") ? e.slice(1, -1).split(",").map(Gf) : e;
}
function Kf(e, t) {
	return e.replace(RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function qf(e) {
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
var Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np = class {
	constructor(e) {
		Hf(this, $f), Hf(this, Jf), Hf(this, Yf, "->"), Hf(this, Xf, ","), Hf(this, Zf, "/"), Hf(this, Qf, []);
		var t, n, r;
		e && (Uf(this, Jf, e.formatter ?? void 0), (t = e.splitter) != null && t.main && Uf(this, Yf, e.splitter.main), (n = e.splitter) != null && n.entry && Uf(this, Xf, e.splitter.entry), (r = e.splitter) != null && r.parameter && Uf(this, Zf, e.splitter.parameter), e.keys && Uf(this, Qf, e.keys));
	}
	get splitter() {
		return {
			main: Vf(this, Yf),
			entry: Vf(this, Xf),
			parameter: Vf(this, Zf)
		};
	}
	set splitter_main(e) {
		Uf(this, Yf, e);
	}
	set splitter_entry(e) {
		Uf(this, Xf, e);
	}
	set splitter_parameter(e) {
		Uf(this, Zf, e);
	}
	get formatter() {
		return Vf(this, Jf);
	}
	set formatter(e) {
		Uf(this, Jf, e);
	}
	get keys() {
		return Vf(this, Qf);
	}
	set keys(e) {
		Uf(this, Qf, e);
	}
	parse(e) {
		let [t, n] = e.split(Vf(this, Yf)), r = Vf(this, Jf) ? Vf(this, Jf).call(this, t) : t.trim(), { name: i, key: a, values: o } = Wf(this, $f, ep).call(this, r);
		return {
			name: i,
			key: a,
			values: o,
			parameters: Wf(this, $f, tp).call(this, n)
		};
	}
	parameters(e, t) {
		return Wf(this, $f, tp).call(this, e, t ?? Vf(this, Qf));
	}
};
Jf = /* @__PURE__ */ new WeakMap(), Yf = /* @__PURE__ */ new WeakMap(), Xf = /* @__PURE__ */ new WeakMap(), Zf = /* @__PURE__ */ new WeakMap(), Qf = /* @__PURE__ */ new WeakMap(), $f = /* @__PURE__ */ new WeakSet(), ep = function(e) {
	let [t, ...n] = e.split(" "), [r, i] = t.split("=");
	return {
		name: r,
		key: i,
		values: Kf(n.join(" "), Vf(this, Xf)).map((e) => Gf(e))
	};
}, tp = function(e, t) {
	if (e === void 0) return {};
	let n;
	if (t === void 0 || t.length === 0) n = Kf(e, Vf(this, Xf));
	else {
		let r = Kf(e, Vf(this, Xf)), i = t.map((e) => `${e}=`);
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
		let { key: t, value: n } = qf(e);
		if (/^[-.\d]+\/[-.\d]+$/.exec(n)) {
			r[t] = {
				value: Gf(n),
				options: []
			};
			return;
		}
		let [i, ...a] = n.split(Vf(this, Zf));
		r[t] = {
			value: Gf(i),
			options: a.map((e) => Gf(e))
		};
	}), r;
};
// src/Draw.ts
var rp = ["Ox", "Oy"], ip = [...wf], ap = class extends Nu {
	_parser;
	_settings;
	constructor(e, t) {
		return super(e, t?.tex === void 0 ? {} : { tex: t.tex }), this._parser = new np({
			formatter: (e) => this._parseKeyCode(e),
			keys: ip,
			splitter: {
				main: "->",
				entry: ",",
				parameter: "/"
			}
		}), this._settings = {}, this.refreshLayout(t?.parameters), this._code = [], t?.code && this._build(t.code), this;
	}
	_code;
	get code() {
		return this._code;
	}
	static documentation() {
		return Cf;
	}
	refresh(e) {
		this.clear(), this._build(e);
	}
	refreshLayout(e) {
		let t = Ff(e ?? "", this._parser);
		this.updateLayout({
			...Is({
				...t.window,
				unit: t.unit
			}),
			system: i.CARTESIAN_2D
		}, t.display), this._settings = t.defaults, this._applyLayoutOptions(t.options);
	}
	_applyLayoutOptions(e) {
		let t = [
			[this.drawnAxes.x, e.x],
			[this.drawnAxes.y, e.y],
			[this.mainGrid, e.grid]
		];
		for (let [e, n] of t) e !== null && Object.keys(n).length > 0 && this._applyOptions(n, e);
	}
	_applyDrag(e, t, n) {
		if (e instanceof J) {
			let r = this.create.point({
				x: 0,
				y: 0
			}, e.name + "_drag");
			r.pixels = e.pixels, r.asCircle(30).fill("white/0.8"), this.layers.interactive.add(r.element), this.draggable(r, {
				target: e,
				...this._dragConfig([n[t].value, ...n[t].options])
			});
		}
	}
	_dragConfig(e) {
		let n = {}, r = [];
		for (let i of e) if (i === "grid") n.grid = !0;
		else if (i === "Ox") n.along = "x";
		else if (i === "Oy") n.along = "y";
		else if (t(i)) {
			let e = i.axis ?? "x", t = n.bounds?.[e];
			n.bounds = {
				...n.bounds,
				[e]: {
					min: Math.max(t?.min ?? -Infinity, i.min),
					max: Math.min(t?.max ?? Infinity, i.max)
				}
			};
		} else typeof i == "string" && Object.hasOwn(this.figures, i) && r.push(this.figures[i]);
		return r.length > 0 && (n.follow = r), n;
	}
	_animationPoint(e, t) {
		let n = typeof e == "string" && Object.hasOwn(this.figures, e) ? this.figures[e] : void 0;
		if (!(n instanceof J)) throw new R(`The option ${t}=${String(e)} of an animation must be the name of a point of the drawing`);
		return n;
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
					if (typeof e[n].value == "string" && (r = e[n].value), n === "tex" && r.length === 2 && !isNaN(+r[1]) && (r = r[0] + "_" + r[1]), t.addLabel(Rf(r, t), n === "tex", this.toTex), t.label) {
						let r = e[n].options[0], i = typeof r == "boolean" ? void 0 : r, a = e[n].options[1] ?? {
							x: 0,
							y: 0
						}, o = {
							x: a.x * this.config.axis.x.x,
							y: -a.y * this.config.axis.y.y
						}, s = e[n].options[2];
						t.label.autoRotate = s === !0, t.label.position(i, o, typeof s == "number" ? s : 0);
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
						loop: Tu.NONE
					};
					Object.hasOwn(e, "from") && (n.from = this._animationPoint(e.from.value, "from")), Object.hasOwn(e, "to") && (n.to = this._animationPoint(e.to.value, "to")), Object.hasOwn(e, "duration") && (n.duration = e.duration.value), Object.hasOwn(e, "delay") && (n.delay = e.delay.value), Object.hasOwn(e, "easing") && (n.easing = e.easing.value), Object.hasOwn(e, "loop") && (n.loop = Du(e.loop.value)), t.animate = n;
					break;
				}
				case "close":
					Sf(t, n, e[n].value);
					break;
				case "ticks":
				case "numbers":
				case "name":
				case "side":
				case "padding":
					od(t, n, e[n]);
					break;
				case "subgrid":
					Fd(t, n, e[n].value);
					break;
				case "sector":
				case "square":
					Ku(t, n, e[n].value);
					break;
				case "o":
				case "s":
				case "*":
					sf(t, n, e[n].value);
					break;
				default: Fu.includes(n) && t.stroke(n);
			}
		});
	}
	_build(e) {
		this._code = this._prepare(e);
		let t = Cf;
		this._code.forEach((e) => {
			try {
				this._buildItem(e, t);
			} catch (e) {
				console.error(e);
			}
		}), this.update();
	}
	_buildItem(e, t) {
		if (rp.includes(e.name)) throw new I(`Cannot build "${e.name}" (${e.key}): ${e.name} is the name of an axis of the graph, choose another name`);
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
			let a = r(e, this._namedFigures(), this.config);
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
	}
	_buildOptions(e, t) {
		this._settings.label && e instanceof J && t.parameters.label === void 0 && t.parameters.tex === void 0 && (t.parameters.label = {
			value: !0,
			options: []
		}), this._settings.tex && e instanceof J && t.parameters.label === void 0 && t.parameters.tex === void 0 && (t.parameters.tex = {
			value: !0,
			options: []
		}), e instanceof J && this._settings.points === !1 && (t.parameters["!"] = {
			value: !0,
			options: []
		});
		let n = this._settings.points;
		e instanceof J && n && ![
			"o",
			"s",
			"*"
		].some((e) => Object.hasOwn(t.parameters, e)) && (n.shape !== "o" || n.size !== void 0) && sf(e, n.shape, n.size ?? !0), this._applyOptions(t.parameters, e);
	}
	_defineCommand(e) {
		let [t, n] = e.slice(1).split(":");
		return {
			key: n,
			value: t === "begin"
		};
	}
	_parseKeyCode(e) {
		let t = cf(e);
		if (t !== null) return t;
		let n = Xd(e);
		if (n !== null) return n;
		let r = Ud(e);
		return r === null ? bd(e) ?? e : r;
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
			let n;
			try {
				n = this._parser.parse(e);
			} catch (e) {
				console.error(e);
				continue;
			}
			n.parameters = Object.assign(n.parameters, r), t.push(n);
		}
		return t;
	}
	_namedFigures() {
		return {
			Ox: this.axes.x,
			Oy: this.axes.y,
			...this.figures
		};
	}
	_uniqueName(e) {
		let t = e, n = 1;
		for (; this.figures[t];) t = `${e}_${n}`, n++;
		return t;
	}
};
export { r as AXIS, i as COORDINATE_SYSTEM, R as InvalidArgumentError, n as LAYER_NAME, o as LINECONSTRAINT, Ba as MathError, za as NotImplementedError, L as OptionError, a as POINTCONSTRAINT, I as ParseError, ap as PiDraw, Ra as PiDrawError, Nu as PiGraph, t as isDOMAIN, e as isXY };

//# sourceMappingURL=pidraw.js.map