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
}) : n, e)), te = {}, ne = [];
function v(e, t) {
	if (Array.isArray(e)) for (let n of e) v(n, t);
	else if (typeof e == "object") for (let t in e) v(t, e[t]);
	else re(Object.getOwnPropertyNames(t)), te[e] = Object.assign(te[e] || {}, t);
}
function y(e) {
	return te[e] || {};
}
function b() {
	return [...new Set(ne)];
}
function re(e) {
	ne.push(...e);
}
var x = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e) {
		try {
			return !!e();
		} catch {
			return !0;
		}
	};
})), ie = /* @__PURE__ */ h(((e, t) => {
	t.exports = !x()(function() {
		var e = function() {}.bind();
		return typeof e != "function" || e.hasOwnProperty("prototype");
	});
})), S = /* @__PURE__ */ h(((e, t) => {
	var n = ie(), r = Function.prototype, i = r.call, a = n && r.bind.bind(i, i);
	t.exports = n ? a : function(e) {
		return function() {
			return i.apply(e, arguments);
		};
	};
})), ae = /* @__PURE__ */ h(((e, t) => {
	t.exports = S()({}.isPrototypeOf);
})), C = /* @__PURE__ */ h(((e, t) => {
	var n = function(e) {
		return e && e.Math === Math && e;
	};
	t.exports = n(typeof globalThis == "object" && globalThis) || n(typeof window == "object" && window) || n(typeof self == "object" && self) || n(typeof global == "object" && global) || n(typeof e == "object" && e) || (function() {
		return this;
	})() || Function("return this")();
})), oe = /* @__PURE__ */ h(((e, t) => {
	var n = ie(), r = Function.prototype, i = r.apply, a = r.call;
	t.exports = typeof Reflect == "object" && Reflect.apply || (n ? a.bind(i) : function() {
		return a.apply(i, arguments);
	});
})), se = /* @__PURE__ */ h(((e, t) => {
	var n = S(), r = n({}.toString), i = n("".slice);
	t.exports = function(e) {
		return i(r(e), 8, -1);
	};
})), ce = /* @__PURE__ */ h(((e, t) => {
	var n = se(), r = S();
	t.exports = function(e) {
		if (n(e) === "Function") return r(e);
	};
})), le = /* @__PURE__ */ h(((e, t) => {
	var n = typeof document == "object" && document.all;
	t.exports = n === void 0 && n !== void 0 ? function(e) {
		return typeof e == "function" || e === n;
	} : function(e) {
		return typeof e == "function";
	};
})), ue = /* @__PURE__ */ h(((e, t) => {
	t.exports = !x()(function() {
		return Object.defineProperty({}, 1, { get: function() {
			return 7;
		} })[1] !== 7;
	});
})), de = /* @__PURE__ */ h(((e, t) => {
	var n = ie(), r = Function.prototype.call;
	t.exports = n ? r.bind(r) : function() {
		return r.apply(r, arguments);
	};
})), fe = /* @__PURE__ */ h(((e) => {
	var t = {}.propertyIsEnumerable, n = Object.getOwnPropertyDescriptor;
	e.f = n && !t.call({ 1: 2 }, 1) ? function(e) {
		var t = n(this, e);
		return !!t && t.enumerable;
	} : t;
})), pe = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e, t) {
		return {
			enumerable: !(e & 1),
			configurable: !(e & 2),
			writable: !(e & 4),
			value: t
		};
	};
})), me = /* @__PURE__ */ h(((e, t) => {
	var n = S(), r = x(), i = se(), a = Object, o = n("".split);
	t.exports = r(function() {
		return !a("z").propertyIsEnumerable(0);
	}) ? function(e) {
		return i(e) === "String" ? o(e, "") : a(e);
	} : a;
})), he = /* @__PURE__ */ h(((e, t) => {
	t.exports = function(e) {
		return e == null;
	};
})), ge = /* @__PURE__ */ h(((e, t) => {
	var n = he(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("Can't call method on " + e);
		return e;
	};
})), _e = /* @__PURE__ */ h(((e, t) => {
	var n = me(), r = ge();
	t.exports = function(e) {
		return n(r(e));
	};
})), ve = /* @__PURE__ */ h(((e, t) => {
	var n = le();
	t.exports = function(e) {
		return typeof e == "object" ? e !== null : n(e);
	};
})), ye = /* @__PURE__ */ h(((e, t) => {
	t.exports = {};
})), be = /* @__PURE__ */ h(((e, t) => {
	var n = ye(), r = C(), i = le(), a = function(e) {
		return i(e) ? e : void 0;
	};
	t.exports = function(e, t) {
		return arguments.length < 2 ? a(n[e]) || a(r[e]) : n[e] && n[e][t] || r[e] && r[e][t];
	};
})), xe = /* @__PURE__ */ h(((e, t) => {
	var n = C().navigator, r = n && n.userAgent;
	t.exports = r ? String(r) : "";
})), Se = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = xe(), i = n.process, a = n.Deno, o = i && i.versions || a && a.version, s = o && o.v8, c, l;
	s && (c = s.split("."), l = c[0] > 0 && c[0] < 4 ? 1 : +(c[0] + c[1])), !l && r && (c = r.match(/Edge\/(\d+)/), (!c || c[1] >= 74) && (c = r.match(/Chrome\/(\d+)/), c && (l = +c[1]))), t.exports = l;
})), Ce = /* @__PURE__ */ h(((e, t) => {
	var n = Se(), r = x(), i = C().String;
	t.exports = !!Object.getOwnPropertySymbols && !r(function() {
		var e = Symbol("symbol detection");
		return !i(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && n && n < 41;
	});
})), we = /* @__PURE__ */ h(((e, t) => {
	t.exports = Ce() && !Symbol.sham && typeof Symbol.iterator == "symbol";
})), Te = /* @__PURE__ */ h(((e, t) => {
	var n = be(), r = le(), i = ae(), a = we(), o = Object;
	t.exports = a ? function(e) {
		return typeof e == "symbol";
	} : function(e) {
		var t = n("Symbol");
		return r(t) && i(t.prototype, o(e));
	};
})), Ee = /* @__PURE__ */ h(((e, t) => {
	var n = String;
	t.exports = function(e) {
		try {
			return n(e);
		} catch {
			return "Object";
		}
	};
})), De = /* @__PURE__ */ h(((e, t) => {
	var n = le(), r = Ee(), i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not a function");
	};
})), Oe = /* @__PURE__ */ h(((e, t) => {
	var n = De(), r = he();
	t.exports = function(e, t) {
		var i = e[t];
		return r(i) ? void 0 : n(i);
	};
})), ke = /* @__PURE__ */ h(((e, t) => {
	var n = de(), r = le(), i = ve(), a = TypeError;
	t.exports = function(e, t) {
		var o, s;
		if (t === "string" && r(o = e.toString) && !i(s = n(o, e)) || r(o = e.valueOf) && !i(s = n(o, e)) || t !== "string" && r(o = e.toString) && !i(s = n(o, e))) return s;
		throw new a("Can't convert object to primitive value");
	};
})), Ae = /* @__PURE__ */ h(((e, t) => {
	t.exports = !0;
})), je = /* @__PURE__ */ h(((e, t) => {
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
})), Me = /* @__PURE__ */ h(((e, t) => {
	var n = Ae(), r = C(), i = je(), a = "__core-js_shared__", o = t.exports = r[a] || i(a, {});
	(o.versions ||= []).push({
		version: "3.49.0",
		mode: n ? "pure" : "global",
		copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
		license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
		source: "https://github.com/zloirock/core-js"
	});
})), Ne = /* @__PURE__ */ h(((e, t) => {
	var n = Me();
	t.exports = function(e, t) {
		return n[e] || (n[e] = t || {});
	};
})), Pe = /* @__PURE__ */ h(((e, t) => {
	var n = ge(), r = Object;
	t.exports = function(e) {
		return r(n(e));
	};
})), Fe = /* @__PURE__ */ h(((e, t) => {
	var n = S(), r = Pe(), i = n({}.hasOwnProperty);
	t.exports = Object.hasOwn || function(e, t) {
		return i(r(e), t);
	};
})), Ie = /* @__PURE__ */ h(((e, t) => {
	var n = S(), r = 0, i = Math.random(), a = n(1.1.toString);
	t.exports = function(e) {
		return "Symbol(" + (e === void 0 ? "" : e) + ")_" + a(++r + i, 36);
	};
})), Le = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = Ne(), i = Fe(), a = Ie(), o = Ce(), s = we(), c = n.Symbol, l = r("wks"), u = s ? c.for || c : c && c.withoutSetter || a;
	t.exports = function(e) {
		return i(l, e) || (l[e] = o && i(c, e) ? c[e] : u("Symbol." + e)), l[e];
	};
})), Re = /* @__PURE__ */ h(((e, t) => {
	var n = de(), r = ve(), i = Te(), a = Oe(), o = ke(), s = Le(), c = TypeError, l = s("toPrimitive");
	t.exports = function(e, t) {
		if (!r(e) || i(e)) return e;
		var s = a(e, l), u;
		if (s) {
			if (t === void 0 && (t = "default"), u = n(s, e, t), !r(u) || i(u)) return u;
			throw new c("Can't convert object to primitive value");
		}
		return t === void 0 && (t = "number"), o(e, t);
	};
})), ze = /* @__PURE__ */ h(((e, t) => {
	var n = Re(), r = Te();
	t.exports = function(e) {
		var t = n(e, "string");
		return r(t) ? t : t + "";
	};
})), Be = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = ve(), i = n.document, a = r(i) && r(i.createElement);
	t.exports = function(e) {
		return a ? i.createElement(e) : {};
	};
})), Ve = /* @__PURE__ */ h(((e, t) => {
	var n = ue(), r = x(), i = Be();
	t.exports = !n && !r(function() {
		return Object.defineProperty(i("div"), "a", { get: function() {
			return 7;
		} }).a !== 7;
	});
})), He = /* @__PURE__ */ h(((e) => {
	var t = ue(), n = de(), r = fe(), i = pe(), a = _e(), o = ze(), s = Fe(), c = Ve(), l = Object.getOwnPropertyDescriptor;
	e.f = t ? l : function(e, t) {
		if (e = a(e), t = o(t), c) try {
			return l(e, t);
		} catch {}
		if (s(e, t)) return i(!n(r.f, e, t), e[t]);
	};
})), Ue = /* @__PURE__ */ h(((e, t) => {
	var n = x(), r = le(), i = /#|\.prototype\./, a = function(e, t) {
		var i = s[o(e)];
		return i === l ? !0 : i === c ? !1 : r(t) ? n(t) : !!t;
	}, o = a.normalize = function(e) {
		return String(e).replace(i, ".").toLowerCase();
	}, s = a.data = {}, c = a.NATIVE = "N", l = a.POLYFILL = "P";
	t.exports = a;
})), We = /* @__PURE__ */ h(((e, t) => {
	var n = ce(), r = De(), i = ie(), a = n(n.bind);
	t.exports = function(e, t) {
		return r(e), t === void 0 ? e : i ? a(e, t) : function() {
			return e.apply(t, arguments);
		};
	};
})), Ge = /* @__PURE__ */ h(((e, t) => {
	var n = ue(), r = x();
	t.exports = n && r(function() {
		return Object.defineProperty(function() {}, "prototype", {
			value: 42,
			writable: !1
		}).prototype !== 42;
	});
})), Ke = /* @__PURE__ */ h(((e, t) => {
	var n = ve(), r = String, i = TypeError;
	t.exports = function(e) {
		if (n(e)) return e;
		throw new i(r(e) + " is not an object");
	};
})), qe = /* @__PURE__ */ h(((e) => {
	var t = ue(), n = Ve(), r = Ge(), i = Ke(), a = ze(), o = TypeError, s = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = "enumerable", u = "configurable", d = "writable";
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
})), Je = /* @__PURE__ */ h(((e, t) => {
	var n = ue(), r = qe(), i = pe();
	t.exports = n ? function(e, t, n) {
		return r.f(e, t, i(1, n));
	} : function(e, t, n) {
		return e[t] = n, e;
	};
})), Ye = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = oe(), i = ce(), a = le(), o = He().f, s = Ue(), c = ye(), l = We(), u = Je(), d = Fe();
	Me();
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
		var r = e.target, p = e.global, m = e.stat, h = e.proto, g = p ? n : m ? n[r] : n[r] && n[r].prototype, _ = p ? c : c[r] || u(c, r, {})[r], ee = _.prototype, te, ne, v, y, b, re, x, ie, S;
		for (y in t) te = s(p ? y : r + (m ? "." : "#") + y, e.forced), ne = !te && g && d(g, y), re = _[y], ne && (e.dontCallGetSet ? (S = o(g, y), x = S && S.value) : x = g[y]), b = ne && x ? x : t[y], (te || h || typeof re != typeof b) && (ie = e.bind && ne ? l(b, n) : e.wrap && ne ? f(b) : h && a(b) ? i(b) : b, (e.sham || b && b.sham || re && re.sham) && u(ie, "sham", !0), u(_, y, ie), h && (v = r + "Prototype", d(c, v) || u(c, v, {}), u(c[v], y, b), e.real && ee && (te || !ee[y]) && u(ee, y, b)));
	};
})), Xe = /* @__PURE__ */ h(((e, t) => {
	var n = Math.ceil, r = Math.floor;
	t.exports = Math.trunc || function(e) {
		var t = +e;
		return (t > 0 ? r : n)(t);
	};
})), Ze = /* @__PURE__ */ h(((e, t) => {
	var n = Xe();
	t.exports = function(e) {
		var t = +e;
		return t !== t || t === 0 ? 0 : n(t);
	};
})), Qe = /* @__PURE__ */ h(((e, t) => {
	var n = Ze(), r = Math.max, i = Math.min;
	t.exports = function(e, t) {
		var a = n(e);
		return a < 0 ? r(a + t, 0) : i(a, t);
	};
})), $e = /* @__PURE__ */ h(((e, t) => {
	var n = Ze(), r = Math.min;
	t.exports = function(e) {
		var t = n(e);
		return t > 0 ? r(t, 9007199254740991) : 0;
	};
})), et = /* @__PURE__ */ h(((e, t) => {
	var n = $e();
	t.exports = function(e) {
		return n(e.length);
	};
})), tt = /* @__PURE__ */ h(((e, t) => {
	var n = _e(), r = Qe(), i = et(), a = function(e) {
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
})), nt = /* @__PURE__ */ h(((e, t) => {
	t.exports = function() {};
})), rt = /* @__PURE__ */ h((() => {
	var e = Ye(), t = tt().includes, n = x(), r = nt(), i = n(function() {
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
})), it = /* @__PURE__ */ h(((e, t) => {
	var n = C(), r = ye();
	t.exports = function(e, t) {
		var i = r[e + "Prototype"], a = i && i[t];
		if (a) return a;
		var o = n[e], s = o && o.prototype;
		return s && s[t];
	};
})), at = /* @__PURE__ */ h(((e, t) => {
	rt(), t.exports = it()("Array", "includes");
})), ot = /* @__PURE__ */ h(((e, t) => {
	var n = ve(), r = se(), i = Le()("match");
	t.exports = function(e) {
		var t;
		return n(e) && ((t = e[i]) === void 0 ? r(e) === "RegExp" : !!t);
	};
})), st = /* @__PURE__ */ h(((e, t) => {
	var n = ot(), r = TypeError;
	t.exports = function(e) {
		if (n(e)) throw new r("The method doesn't accept regular expressions");
		return e;
	};
})), ct = /* @__PURE__ */ h(((e, t) => {
	var n = Le()("toStringTag"), r = {};
	r[n] = "z", t.exports = String(r) === "[object z]";
})), lt = /* @__PURE__ */ h(((e, t) => {
	var n = ct(), r = le(), i = se(), a = Le()("toStringTag"), o = Object, s = i(function() {
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
})), ut = /* @__PURE__ */ h(((e, t) => {
	var n = lt(), r = String;
	t.exports = function(e) {
		if (n(e) === "Symbol") throw TypeError("Cannot convert a Symbol value to a string");
		return r(e);
	};
})), dt = /* @__PURE__ */ h(((e, t) => {
	var n = Le()("match");
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
})), ft = /* @__PURE__ */ h((() => {
	var e = Ye(), t = S(), n = st(), r = ge(), i = ut(), a = dt(), o = t("".indexOf);
	e({
		target: "String",
		proto: !0,
		forced: !a("includes")
	}, { includes: function(e) {
		return !!~o(i(r(this)), i(n(e)), arguments.length > 1 ? arguments[1] : void 0);
	} });
})), pt = /* @__PURE__ */ h(((e, t) => {
	ft(), t.exports = it()("String", "includes");
})), mt = /* @__PURE__ */ h(((e, t) => {
	var n = ae(), r = at(), i = pt(), a = Array.prototype, o = String.prototype;
	t.exports = function(e) {
		var t = e.includes;
		return e === a || n(a, e) && t === a.includes ? r : typeof e == "string" || e === o || n(o, e) && t === o.includes ? i : t;
	};
})), ht = /* @__PURE__ */ ee((/* @__PURE__ */ h(((e, t) => {
	t.exports = mt();
})))(), 1);
function gt(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) i.push(t(e[n]));
	return i;
}
function _t(e, t) {
	let n, r = e.length, i = [];
	for (n = 0; n < r; n++) t(e[n]) && i.push(e[n]);
	return i;
}
function vt(e) {
	return e % 360 * Math.PI / 180;
}
function yt(e) {
	return e.replace(/([A-Z])/g, function(e, t) {
		return "-" + t.toLowerCase();
	});
}
function bt(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function xt(e, t, n, r) {
	return (t == null || n == null) && (r ||= e.bbox(), t == null ? t = r.width / r.height * n : n ??= r.height / r.width * t), {
		width: t,
		height: n
	};
}
function St(e, t) {
	let n = e.origin, r = e.ox == null ? e.originX == null ? "center" : e.originX : e.ox, i = e.oy == null ? e.originY == null ? "center" : e.originY : e.oy;
	n != null && ([r, i] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
	let a = typeof r == "string", o = typeof i == "string";
	if (a || o) {
		let { height: e, width: n, x: s, y: c } = t.bbox();
		a && (r = (0, ht.default)(r).call(r, "left") ? s : (0, ht.default)(r).call(r, "right") ? s + n : s + n / 2), o && (i = (0, ht.default)(i).call(i, "top") ? c : (0, ht.default)(i).call(i, "bottom") ? c + e : c + e / 2);
	}
	return [r, i];
}
var Ct = /* @__PURE__ */ new Set([
	"desc",
	"metadata",
	"title"
]), wt = (e) => Ct.has(e.nodeName), Tt = (e, t, n = {}) => {
	let r = { ...t };
	for (let e in r) r[e].valueOf() === n[e] && delete r[e];
	Object.keys(r).length ? e.node.setAttribute("data-svgjs", JSON.stringify(r)) : (e.node.removeAttribute("data-svgjs"), e.node.removeAttribute("svgjs:data"));
}, Et = "http://www.w3.org/2000/svg", Dt = "http://www.w3.org/1999/xhtml", Ot = "http://www.w3.org/2000/xmlns/", kt = "http://www.w3.org/1999/xlink", w = {
	window: typeof window > "u" ? null : window,
	document: typeof document > "u" ? null : document
};
function At() {
	return w.window;
}
var jt = class {}, Mt = {}, Nt = "___SYMBOL___ROOT___";
function Pt(e, t = Et) {
	return w.document.createElementNS(t, e);
}
function T(e, t = !1) {
	if (e instanceof jt) return e;
	if (typeof e == "object") return Ft(e);
	if (e == null) return new Mt[Nt]();
	if (typeof e == "string" && e.trim().charAt(0) !== "<") return Ft(w.document.querySelector(e));
	let n = t ? w.document.createElement("div") : Pt("svg");
	return n.innerHTML = e.trim(), e = Ft(n.firstElementChild), n.removeChild(n.firstElementChild), e;
}
function E(e, t) {
	return t && (t instanceof w.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Pt(e);
}
function D(e) {
	if (!e) return null;
	if (e.instance instanceof jt) return e.instance;
	if (e.nodeName === "#document-fragment") return new Mt.Fragment(e);
	let t = bt(e.nodeName || "Dom");
	return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : Mt[t] || (t = "Dom"), new Mt[t](e);
}
var Ft = D;
function O(e, t = e.name, n = !1) {
	return Mt[t] = e, n && (Mt[Nt] = e), re(Object.getOwnPropertyNames(e.prototype)), e;
}
function It(e) {
	return Mt[e];
}
var Lt = 1e3;
function Rt(e) {
	return "Svgjs" + bt(e) + Lt++;
}
function zt(e) {
	for (let t = e.children.length - 1; t >= 0; t--) zt(e.children[t]);
	return e.id &&= Rt(e.nodeName), e;
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
function Bt() {
	return this.parent().children();
}
function Vt() {
	return this.parent().index(this);
}
function Ht() {
	return this.siblings()[this.position() + 1];
}
function Ut() {
	return this.siblings()[this.position() - 1];
}
function Wt() {
	let e = this.position();
	return this.parent().add(this.remove(), e + 1), this;
}
function Gt() {
	let e = this.position();
	return this.parent().add(this.remove(), e ? e - 1 : 0), this;
}
function Kt() {
	return this.parent().add(this.remove()), this;
}
function qt() {
	return this.parent().add(this.remove(), 0), this;
}
function Jt(e) {
	e = T(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t), this;
}
function Yt(e) {
	e = T(e), e.remove();
	let t = this.position();
	return this.parent().add(e, t + 1), this;
}
function Xt(e) {
	return e = T(e), e.before(this), this;
}
function Zt(e) {
	return e = T(e), e.after(this), this;
}
v("Dom", {
	siblings: Bt,
	position: Vt,
	next: Ht,
	prev: Ut,
	forward: Wt,
	backward: Gt,
	front: Kt,
	back: qt,
	before: Jt,
	after: Yt,
	insertBefore: Xt,
	insertAfter: Zt
});
var Qt = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, $t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, en = /rgb\((\d+),(\d+),(\d+)\)/, tn = /^(#[^\s]+)$/, nn = /\)\s*,?\s*/, rn = /\s/g, an = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, on = /^rgb\(/, sn = /^(\s+)?$/, cn = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ln = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, un = /[\s,]+/, dn = /[MLHVCSQTAZ]/i;
function fn() {
	let e = this.attr("class");
	return e == null ? [] : e.trim().split(un);
}
function pn(e) {
	return this.classes().indexOf(e) !== -1;
}
function mn(e) {
	if (!this.hasClass(e)) {
		let t = this.classes();
		t.push(e), this.attr("class", t.join(" "));
	}
	return this;
}
function hn(e) {
	return this.hasClass(e) && this.attr("class", this.classes().filter(function(t) {
		return t !== e;
	}).join(" ")), this;
}
function gn(e) {
	return this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
}
v("Dom", {
	classes: fn,
	hasClass: pn,
	addClass: mn,
	removeClass: hn,
	toggleClass: gn
});
var _n = (e) => e.startsWith("--") ? e : yt(e);
function vn(e, t) {
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
				let e = _n(t);
				n[t] = this.node.style.getPropertyValue(e);
			}
			return n;
		}
		if (typeof e == "string") return this.node.style.getPropertyValue(_n(e));
		if (typeof e == "object") for (let t in e) this.node.style.setProperty(_n(t), e[t] == null || sn.test(e[t]) ? "" : e[t]);
	}
	return arguments.length === 2 && this.node.style.setProperty(_n(e), t == null || sn.test(t) ? "" : t), this;
}
function yn() {
	return this.css("display", "");
}
function bn() {
	return this.css("display", "none");
}
function xn() {
	return this.css("display") !== "none";
}
v("Dom", {
	css: vn,
	show: yn,
	hide: bn,
	visible: xn
});
function Sn(e, t, n) {
	if (e == null) return this.data(gt(_t(this.node.attributes, (e) => e.nodeName.indexOf("data-") === 0), (e) => e.nodeName.slice(5)));
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
v("Dom", { data: Sn });
function Cn(e, t) {
	if (typeof arguments[0] == "object") for (let t in e) this.remember(t, e[t]);
	else if (arguments.length === 1) return this.memory()[e];
	else this.memory()[e] = t;
	return this;
}
function wn() {
	if (arguments.length === 0) this._memory = {};
	else for (let e = arguments.length - 1; e >= 0; e--) delete this.memory()[arguments[e]];
	return this;
}
function Tn() {
	return this._memory = this._memory || {};
}
v("Dom", {
	remember: Cn,
	forget: wn,
	memory: Tn
});
function En(e) {
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
function Dn(e) {
	let t = Math.max(0, Math.min(255, Math.round(e))).toString(16);
	return t.length === 1 ? "0" + t : t;
}
function On(e, t) {
	for (let n = t.length; n--;) if (e[t[n]] == null) return !1;
	return !0;
}
function kn(e, t) {
	let n = On(e, "rgb") ? {
		_a: e.r,
		_b: e.g,
		_c: e.b,
		_d: 0,
		space: "rgb"
	} : On(e, "xyz") ? {
		_a: e.x,
		_b: e.y,
		_c: e.z,
		_d: 0,
		space: "xyz"
	} : On(e, "hsl") ? {
		_a: e.h,
		_b: e.s,
		_c: e.l,
		_d: 0,
		space: "hsl"
	} : On(e, "lab") ? {
		_a: e.l,
		_b: e.a,
		_c: e.b,
		_d: 0,
		space: "lab"
	} : On(e, "lch") ? {
		_a: e.l,
		_b: e.c,
		_c: e.h,
		_d: 0,
		space: "lch"
	} : On(e, "cmyk") ? {
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
function An(e) {
	return e === "lab" || e === "xyz" || e === "lch";
}
function jn(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
var Mn = class e {
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
		return typeof e == "string" && (an.test(e) || on.test(e));
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
			let n = kn(e, t);
			Object.assign(this, n);
		} else if (typeof e == "string") {
			if (on.test(e)) {
				let t = e.replace(rn, ""), [n, r, i] = en.exec(t).slice(1, 4).map((e) => parseInt(e));
				Object.assign(this, {
					_a: n,
					_b: r,
					_c: i,
					_d: 0,
					space: "rgb"
				});
			} else if (an.test(e)) {
				let [, t, n, r] = $t.exec(En(e)).map((e) => parseInt(e, 16));
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
		if (An(this.space)) {
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
			let i = r < .5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i, o = 255 * jn(a, i, t + 1 / 3), s = 255 * jn(a, i, t), c = 255 * jn(a, i, t - 1 / 3);
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
		let [e, t, n] = this._clamped().map(Dn);
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
function Nn(e, t) {
	return new j(e, t).transformO(this.screenCTM().inverseO());
}
function Pn(e, t, n) {
	return Math.abs(t - e) < (n || 1e-6);
}
var M = class e {
	constructor(...e) {
		this.init(...e);
	}
	static formatTransforms(e) {
		let t = e.flip === "both" || e.flip === !0, n = e.flip && (t || e.flip === "x") ? -1 : 1, r = e.flip && (t || e.flip === "y") ? -1 : 1, i = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, a = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, o = e.scale && e.scale.length ? e.scale[0] * n : isFinite(e.scale) ? e.scale * n : isFinite(e.scaleX) ? e.scaleX * n : n, s = e.scale && e.scale.length ? e.scale[1] * r : isFinite(e.scale) ? e.scale * r : isFinite(e.scaleY) ? e.scaleY * r : r, c = e.shear || 0, l = e.rotate || e.theta || 0, u = new j(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), d = u.x, f = u.y, p = new j(e.position ?? e.px ?? e.positionX ?? NaN, e.py ?? e.positionY ?? NaN), m = p.x, h = p.y, g = new j(e.translate || e.tx || e.translateX, e.ty || e.translateY), _ = g.x, ee = g.y, te = new j(e.relative || e.rx || e.relativeX, e.ry || e.relativeY);
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
		return Pn(this.a, n.a) && Pn(this.b, n.b) && Pn(this.c, n.c) && Pn(this.d, n.d) && Pn(this.e, n.e) && Pn(this.f, n.f);
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
		return t = t instanceof yr ? t.matrixify() : typeof t == "string" ? e.fromArray(t.split(un).map(parseFloat)) : Array.isArray(t) ? e.fromArray(t) : typeof t == "object" && e.isMatrixLike(t) ? t : typeof t == "object" ? new e().transform(t) : arguments.length === 6 ? e.fromArray([].slice.call(arguments)) : n, this.a = t.a == null ? n.a : t.a, this.b = t.b == null ? n.b : t.b, this.c = t.c == null ? n.c : t.c, this.d = t.d == null ? n.d : t.d, this.e = t.e == null ? n.e : t.e, this.f = t.f == null ? n.f : t.f, this;
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
		e = vt(e);
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
		arguments.length === 3 && (r = n, n = t, t = e), e = vt(e), t = vt(t);
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
function Fn() {
	return new M(this.node.getCTM());
}
function In() {
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
function Ln() {
	if (!Ln.nodes || Ln.nodes.svg.node.ownerDocument !== w.document) {
		let e = T().size(2, 0);
		e.node.style.cssText = "opacity: 0;position: absolute;left: -100%;top: -100%;overflow: hidden", e.attr("focusable", "false"), e.attr("aria-hidden", "true"), Ln.nodes = {
			svg: e,
			path: e.path().node
		};
	}
	return Ln.nodes.svg.node.parentNode || Ln.nodes.svg.addTo(w.document.body || w.document.documentElement), Ln.nodes;
}
function Rn(e) {
	return !e.width && !e.height && !e.x && !e.y;
}
function zn(e) {
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
		return e = typeof e == "string" ? e.split(un).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [
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
		return Rn(this);
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
function Bn(e, t, n) {
	let r;
	try {
		if (r = t(e.node), Rn(r) && !zn(e.node)) throw Error("Element not in the dom");
	} catch {
		r = n(e);
	}
	return r;
}
function Vn() {
	return new N(Bn(this, (e) => e.getBBox(), (e) => {
		try {
			let t = e.clone().addTo(Ln().svg).show(), n = t.node.getBBox();
			return t.remove(), n;
		} catch (t) {
			throw Error(`Getting bbox of element "${e.node.nodeName}" is not possible: ${t.toString()}`);
		}
	}));
}
function Hn(e) {
	let t = new N(Bn(this, (e) => e.getBoundingClientRect(), (e) => {
		throw Error(`Getting rbox of element "${e.node.nodeName}" is not possible`);
	}));
	return e ? t.transform(e.screenCTM().inverseO()) : t.addOffset();
}
function Un(e, t) {
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
var Wn = class extends Array {
	constructor(e = [], ...t) {
		if (super(e, ...t), typeof e == "number") return this;
		this.length = 0, this.push(...e);
	}
};
k([Wn], {
	each(e, ...t) {
		return typeof e == "function" ? this.map((t, n, r) => e.call(t, t, n, r)) : this.map((n) => n[e](...t));
	},
	toArray() {
		return Array.prototype.concat.apply([], this);
	}
});
var Gn = [
	"toArray",
	"constructor",
	"each"
];
Wn.extend = function(e) {
	e = e.reduce((e, t) => ((0, ht.default)(Gn).call(Gn, t) || t[0] === "_" || (t in Array.prototype && (e["$" + t] = Array.prototype[t]), e[t] = function(...e) {
		return this.each(t, ...e);
	}), e), {}), k([Wn], e);
};
function Kn(e) {
	let t = (e + "").trim(), n = t.match(/^url\((.*)\)$/i);
	if (n) {
		t = n[1].trim();
		let e = t[0];
		if (e === "\"" || e === "'") {
			if (t[t.length - 1] !== e) return null;
			t = t.slice(1, -1);
		}
	}
	let r = t.match(tn);
	return r ? r[1].slice(1) : null;
}
function qn(e, t) {
	let n = `#${w.window.CSS.escape(t)}`;
	return e.nodeType === 1 && e.matches(n) ? e : e.querySelector(n);
}
function Jn(e, t) {
	let n = Kn(t);
	return n ? qn(e.getRootNode(), n) : null;
}
function Yn(e, t, n = `[${t}]`) {
	let r = e.getAttribute("id"), i = e.getRootNode();
	if (!r || qn(i, r) !== e) return new Wn();
	let a = [];
	i.nodeType === 1 && i.matches(n) && Kn(i.getAttribute(t)) === r && a.push(D(i));
	for (let e of i.querySelectorAll(n)) Kn(e.getAttribute(t)) === r && a.push(D(e));
	return new Wn(a);
}
function Xn(e, t) {
	return new Wn(gt((t || w.document).querySelectorAll(e), function(e) {
		return D(e);
	}));
}
function Zn(e) {
	return Xn(e, this.node);
}
function Qn(e) {
	return D(this.node.querySelector(e));
}
var $n = 0, er = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), nr = () => Object.create(null);
function rr(e) {
	let t = e.getEventHolder(), n = er.get(t);
	return n || (n = nr(), er.set(t, n)), n;
}
function ir(e) {
	return e.getEventTarget();
}
function ar(e) {
	er.delete(e.getEventHolder());
}
function or(e, t, n, r, i) {
	let a = n.bind(r || e), o = i || !1, s = T(e), c = rr(s), l = ir(s);
	t = Array.isArray(t) ? t : t.split(un);
	let u = tr.get(n);
	u || (u = ++$n, tr.set(n, u)), t.forEach(function(e) {
		let t = e.split(".")[0], n = e.split(".")[1] || "*";
		c[t] = c[t] || nr(), c[t][n] = c[t][n] || nr(), c[t][n][u] = c[t][n][u] || [], c[t][n][u].push({
			listener: a,
			options: o
		}), l.addEventListener(t, a, o);
	});
}
function sr(e, t, n, r) {
	let i = T(e), a = rr(i), o = ir(i);
	typeof n == "function" && (n = tr.get(n), !n) || (t = Array.isArray(t) ? t : (t || "").split(un), t.forEach(function(e) {
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
				for (l in a[t][s]) sr(o, [t, s].join("."), l);
				delete a[t][s];
			}
		} else if (s) for (e in a) for (c in a[e]) s === c && sr(o, [e, s].join("."));
		else if (t) {
			if (a[t]) {
				for (c in a[t]) sr(o, [t, c].join("."));
				delete a[t];
			}
		} else {
			for (e in a) sr(o, e);
			ar(i);
		}
	}));
}
function cr(e, t, n, r) {
	let i = ir(e);
	return t instanceof w.window.Event || (t = new w.window.CustomEvent(t, {
		detail: n,
		cancelable: !0,
		...r
	})), i.dispatchEvent(t), t;
}
var lr = class extends jt {
	addEventListener() {}
	dispatch(e, t, n) {
		return cr(this, e, t, n);
	}
	dispatchEvent(e) {
		let t = rr(this)[e.type];
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
		return sr(this, e, t, n), this;
	}
	on(e, t, n, r) {
		return or(this, e, t, n, r), this;
	}
	removeEventListener() {}
};
O(lr, "EventTarget");
function ur() {}
var dr = {
	duration: 400,
	ease: ">",
	delay: 0
}, fr = {
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
}, pr = class extends Array {
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
		return e instanceof Array ? e : e.trim().split(un).map(parseFloat);
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
		return n = Array.isArray(t) ? t[1] : n, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = n || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (n = t.match(Qt), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : t instanceof e && (this.value = t.valueOf(), this.unit = t.unit), this;
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
}, mr = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"bgcolor",
	"stop-color",
	"flood-color",
	"lighting-color"
]), hr = [];
function gr(e) {
	hr.push(e);
}
function _r(e, t, n) {
	if (e == null) {
		e = {}, t = this.node.attributes;
		for (let n of t) e[n.nodeName] = cn.test(n.nodeValue) ? parseFloat(n.nodeValue) : n.nodeValue;
		return e;
	}
	if (e instanceof Array) return e.reduce((e, t) => (e[t] = this.attr(t), e), {});
	if (typeof e == "object" && e.constructor === Object) for (t in e) this.attr(t, e[t]);
	else if (t === null) this.node.removeAttribute(e);
	else if (t == null) return t = this.node.getAttribute(e), t == null ? fr[e] : cn.test(t) ? parseFloat(t) : t;
	else t = hr.reduce((t, n) => n(e, t, this), t), typeof t == "number" ? t = new P(t) : mr.has(e) && Mn.isColor(t) ? t = new Mn(t) : t.constructor === Array && (t = new pr(t)), e === "leading" ? this.leading && this.leading(t) : typeof n == "string" ? this.node.setAttributeNS(n, e, t.toString()) : this.node.setAttribute(e, t.toString()), this.rebuild && (e === "font-size" || e === "x") && this.rebuild();
	return this;
}
var vr = class e extends lr {
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
		return new Wn(gt(this.node.children, function(e) {
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
		return t && (n = zt(n)), new this.constructor(n);
	}
	each(e, t) {
		let n = this.children(), r, i;
		for (r = 0, i = n.length; r < i; r++) e.apply(n[r], [r, n]), t && n[r].each(e, t);
		return this;
	}
	element(t, n) {
		return this.put(new e(Pt(t), n));
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
		return this.xml(e, t, Dt);
	}
	id(e) {
		return e === void 0 && !this.node.id && (this.node.id = Rt(this.type)), this.attr("id", e);
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
		return this.xml(e, t, Et);
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
		let r = Pt("wrapper", n), i = w.document.createDocumentFragment();
		r.innerHTML = e;
		for (let e = r.children.length; e--;) i.appendChild(r.firstElementChild);
		let a = this.parent();
		return t ? this.replace(i) && a : this.add(i);
	}
};
k(vr, {
	attr: _r,
	find: Zn,
	findOne: Qn
}), O(vr, "Dom");
var yr = class extends vr {
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
		let i = new Wn(), a = this;
		for (; (a = a.parent()) && a.node !== w.document && a.node.nodeName !== "#document-fragment" && (i.push(a), !(!t && a.node === e || t && a.matches(e)));) if (r && a.node === r) return null;
		return i;
	}
	reference(e) {
		if (e = this.attr(e), !e) return null;
		let t = Jn(this.node, e);
		return t ? T(t) : null;
	}
	root() {
		let e = this.parent(It(Nt));
		return e && e.root();
	}
	setData(e) {
		return this.dom = e, this;
	}
	size(e, t) {
		let n = xt(this, e, t);
		return this.width(new P(n.width)).height(new P(n.height));
	}
	width(e) {
		return this.attr("width", e);
	}
	writeDataToDom(e) {
		return Tt(this, this.dom, e), super.writeDataToDom();
	}
	x(e) {
		return this.attr("x", e);
	}
	y(e) {
		return this.attr("y", e);
	}
};
k(yr, {
	bbox: Vn,
	rbox: Hn,
	inside: Un,
	point: Nn,
	ctm: Fn,
	screenCTM: In
}), O(yr, "Element");
var br = {
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
		if (typeof t == "string" || t instanceof Mn || Mn.isRgb(t) || t instanceof yr) this.attr(e, t);
		else for (n = br[e].length - 1; n >= 0; n--) t[br[e][n]] != null && this.attr(br.prefix(e, br[e][n]), t[br[e][n]]);
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
function xr() {
	return this.attr("transform", null);
}
function Sr() {
	return (this.attr("transform") || "").split(nn).slice(0, -1).map(function(e) {
		let t = e.trim().split("(");
		return [t[0].trim(), t[1].split(un).map(function(e) {
			return parseFloat(e);
		})];
	}).reverse().reduce(function(e, t) {
		return t[0] === "matrix" ? e.lmultiply(M.fromArray(t[1])) : e[t[0]].apply(e, t[1]);
	}, new M());
}
function Cr(e, t) {
	if (this === e) return this;
	if (wt(this.node)) return this.addTo(e, t);
	let n = this.screenCTM(), r = e.screenCTM().inverse();
	return this.addTo(e, t).untransform().transform(r.multiply(n)), this;
}
function wr(e) {
	return this.toParent(this.root(), e);
}
function Tr(e, t) {
	if (e == null || typeof e == "string") {
		let t = new M(this).decompose();
		return e == null ? t : t[e];
	}
	M.isMatrixLike(e) || (e = {
		...e,
		origin: St(e, this)
	});
	let n = new M(t === !0 ? this : t || !1).transform(e);
	return this.attr("transform", n);
}
v("Element", {
	untransform: xr,
	matrixify: Sr,
	toParent: Cr,
	toRoot: wr,
	transform: Tr
});
var F = class e extends yr {
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
O(F, "Container");
var Er = class extends F {
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
O(Er, "Defs");
var I = class extends yr {};
O(I, "Shape");
var Dr = /* @__PURE__ */ g({
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
var Ir = class extends I {
	constructor(e, t = e) {
		super(E("ellipse", e), t);
	}
	size(e, t) {
		let n = xt(this, e, t);
		return this.rx(new P(n.width).divide(2)).ry(new P(n.height).divide(2));
	}
};
k(Ir, Dr), v("Container", { ellipse: A(function(e = 0, t = e) {
	return this.put(new Ir()).size(e, t).move(0, 0);
}) }), O(Ir, "Ellipse");
var Lr = class extends vr {
	constructor(e = w.document.createDocumentFragment()) {
		super(e);
	}
	xml(e, t, n) {
		if (typeof e == "boolean" && (n = t, t = e, e = null), e == null || typeof e == "function") {
			let e = new vr(Pt("wrapper", n));
			return e.add(this.node.cloneNode(!0)), e.xml(!1, n);
		}
		return super.xml(e, !1, n);
	}
};
O(Lr, "Fragment");
var Rr = /* @__PURE__ */ g({
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
var Vr = class extends F {
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
		return Yn(this.node, "fill");
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
var Hr = class extends F {
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
		return Yn(this.node, "fill");
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
var Ur = class extends I {
	constructor(e, t = e) {
		super(E("image", e), t);
	}
	load(e, t) {
		if (!e) return this;
		let n = new w.window.Image();
		return or(n, "load", function(e) {
			let r = this.parent(Hr);
			this.width() === 0 && this.height() === 0 && this.size(n.width, n.height), r instanceof Hr && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof t == "function" && t.call(this, e);
		}, this), or(n, "load error", function() {
			sr(n);
		}), this.attr("href", n.src = e, kt);
	}
};
gr(function(e, t, n) {
	return (e === "fill" || e === "stroke") && ln.test(t) && (t = n.root().defs().image(t)), t instanceof Ur && (t = n.root().defs().pattern(0, 0, (e) => {
		e.add(t);
	})), t;
}), v({ Container: { image: A(function(e, t) {
	return this.put(new Ur()).size(0, 0).load(e, t);
}) } }), O(Ur, "Image");
var Wr = class extends pr {
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
		e = e instanceof Array ? Array.prototype.concat.apply([], e) : e.trim().split(un).map(parseFloat), e.length % 2 != 0 && e.pop();
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
}, Gr = /* @__PURE__ */ g({
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
var Zr = class extends I {
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
		let n = xt(this, e, t);
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
var Qr = class extends F {
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
	constructor(e = dr.ease) {
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
	let n = dn.test(t);
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
		else if (dn.test(r)) {
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
var vi = class extends pr {
	bbox() {
		return Ln().path.setAttribute("d", this.toString()), new N(Ln.nodes.path.getBBox());
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
	return t === "number" ? P : t === "string" ? Mn.isColor(e) ? Mn : un.test(e) ? dn.test(e) ? vi : pr : Qt.test(e) ? P : xi : Ti.indexOf(e.constructor) > -1 ? e.constructor : Array.isArray(e) ? pr : t === "object" ? wi : xi;
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
		return this._type === Mn && (t = this._to ? t[this._to[4]]() : this._from ? t[this._from[4]]() : t), this._type === wi && (t = this._to ? t.align(this._to) : this._from ? t.align(this._from) : t), t = t.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(t.length)).map(Object).map(function(e) {
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
				if (t[n + 1] === Mn && e[n + 7] !== t[n + 7]) {
					let t = e[n + 7], r = new Mn(this.values.splice(n + 3, 5))[t]().toArray();
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
var Oi = class extends I {
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
		let n = xt(this, e, t);
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
var ki = /* @__PURE__ */ g({
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
	let n = xt(this, e, t);
	return this.attr("points", this.array().size(n.width, n.height));
}
var Fi = class extends I {
	constructor(e, t = e) {
		super(E("polygon", e), t);
	}
};
v({ Container: { polygon: A(function(e) {
	return this.put(new Fi()).plot(e || new Wr());
}) } }), k(Fi, Gr), k(Fi, ki), O(Fi, "Polygon");
var Ii = class extends I {
	constructor(e, t = e) {
		super(E("polyline", e), t);
	}
};
v({ Container: { polyline: A(function(e) {
	return this.put(new Ii()).plot(e || new Wr());
}) } }), k(Ii, Gr), k(Ii, ki), O(Ii, "Polyline");
var Li = class extends I {
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
}, L = {
	nextDraw: null,
	frames: new Ri(),
	timeouts: new Ri(),
	immediates: new Ri(),
	timer: () => w.window.performance || w.window.Date,
	frame(e) {
		let t = L.frames.push({ run: e });
		return L.nextDraw === null && (L.nextDraw = w.window.requestAnimationFrame(L._draw)), t;
	},
	timeout(e, t) {
		t ||= 0;
		let n = L.timer().now() + t, r = L.timeouts.push({
			run: e,
			time: n
		});
		return L.nextDraw === null && (L.nextDraw = w.window.requestAnimationFrame(L._draw)), r;
	},
	immediate(e) {
		let t = L.immediates.push(e);
		return L.nextDraw === null && (L.nextDraw = w.window.requestAnimationFrame(L._draw)), t;
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
		try {
			let t = null, n = L.timeouts.last();
			for (; (t = L.timeouts.shift()) && (e >= t.time ? t.run() : L.timeouts.push(t), t !== n););
			let r = null, i = L.frames.last();
			for (; r !== i && (r = L.frames.shift());) r.run(e);
			let a = null;
			for (; a = L.immediates.shift();) a();
		} finally {
			L.nextDraw = L.timeouts.first() || L.frames.first() || L.immediates.first() ? w.window.requestAnimationFrame(L._draw) : null;
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
}, Vi = class extends lr {
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
		return L.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : (this._paused || (this._nextFrame = L.frame(this._step)), this);
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
		L.cancelFrame(this._nextFrame), this._generation = (this._generation || 0) + 1, this._startTime = 0, this._speed = 1, this._persist = 0;
		for (let { runner: e } of this._runners || []) e._retired = !0, e._runnerInfo = null;
		this._nextFrame = null, this._paused = !0, this._finishing = !1, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
	}
};
v({ Element: { timeline: function(e) {
	return e == null ? (this._timeline = this._timeline || new Vi(), this._timeline) : (this._timeline = e, this);
} } });
var Hi = class e extends lr {
	constructor(t) {
		super(), this.id = e.id++, t ??= dr.duration, t = typeof t == "function" ? new ri(t) : t, this._element = null, this._timeline = null, this._runnerInfo = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof ri, this._stepper = this._isDeclarative ? t : new ni(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new M(), this._isAbsoluteTransform = !1, this._hasTransform = !1, this._transformInitialised = !1, this._transformActive = !1, this._retired = !1, this._reverse = !1, this._swing = !1, this._wait = 0, this._times = 1, this._persist = this._isDeclarative ? !0 : null;
	}
	static sanitise(e, t, n) {
		let r = 1, i = !1, a = 0;
		return e ??= dr.duration, t ??= dr.delay, n ||= "last", typeof e == "object" && !(e instanceof ti) && (t = e.delay ?? t, n = e.when ?? n, i = e.swing || i, r = e.times ?? r, a = e.wait ?? a, e = e.duration ?? dr.duration), {
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
			initialiser: e || ur,
			runner: t || ur,
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
		if (!(0, ht.default)(t = this.runners).call(t, e)) return this.runners.push(e), this;
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
		this._transformationRunners.length() === 1 && this._transformationRunners.runners[0].id === -1 && (this._transformationRunners.runners[0].transforms = new M(this)), this._transformationRunners.add(e), L.cancelImmediate(this._frameId), this._frameId = L.immediate(Ji.bind(this));
	},
	_prepareRunner() {
		this._frameId ?? (this._transformationRunners = new Yi().add(new Ui(new M(this))));
	}
} });
var Xi = (e, t) => e.filter((e) => !(0, ht.default)(t).call(t, e));
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
			s ||= this.element(), o ||= St(e, s), u = new M(t ? void 0 : s), s._addRunner(this);
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
			o = St(t, s), e = { ...t };
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
		let n = xt(this._element, e, t);
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
var Zi = class extends F {
	constructor(e, t = e) {
		super(E("svg", e), t), this.namespace();
	}
	defs() {
		return this.isRoot() ? D(this.node.querySelector("defs")) || this.put(new Er()) : this.root().defs();
	}
	isRoot() {
		return !this.node.parentNode || !(this.node.parentNode instanceof w.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
	}
	namespace() {
		return this.isRoot() ? this.attr({
			xmlns: Et,
			version: "1.1"
		}).attr("xmlns:xlink", kt, Ot) : this.root().namespace();
	}
	removeNamespace() {
		return this.attr({
			xmlns: null,
			version: null
		}).attr("xmlns:xlink", null, Ot).attr("xmlns:svgjs", null, Ot);
	}
	root() {
		return this.isRoot() ? this : super.root();
	}
};
v({ Container: { nested: A(function() {
	return this.put(new Zi());
}) } }), O(Zi, "Svg", !0);
var Qi = class extends F {
	constructor(e, t = e) {
		super(E("symbol", e), t);
	}
};
v({ Container: { symbol: A(function() {
	return this.put(new Qi());
}) } }), O(Qi, "Symbol");
var $i = /* @__PURE__ */ g({
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
var fa = class extends I {
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
				if (wt(this.node)) return;
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
			for (let r = 0, i = t.length; r < i; ++r) t[r].nodeName === "textPath" || wt(t[r]) ? r === 0 && (n = r + 1) : (r !== n && t[r].nodeType !== 3 && D(t[r]).dom.newLined === !0 && (e += "\n"), e += t[r].textContent);
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
var pa = class extends I {
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
var ma = class extends I {
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
var ha = class extends F {
	constructor(e, t = e) {
		super(E("clipPath", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unclip();
		}), super.remove();
	}
	targets() {
		return Yn(this.node, "clip-path");
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
var ga = class extends yr {
	constructor(e, t = e) {
		super(E("foreignObject", e), t);
	}
};
v({ Container: { foreignObject: A(function(e, t) {
	return this.put(new ga()).size(e, t);
}) } }), O(ga, "ForeignObject");
var _a = /* @__PURE__ */ g({
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
			r = n.node instanceof At().SVGSVGElement ? new N(n.attr([
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
	let r = xt(this, e, t, n), i = r.width / n.width, a = r.height / n.height;
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
var Da = class extends F {
	constructor(e, t = e) {
		super(E("g", e), t);
	}
};
k(Da, _a), v({ Container: { group: A(function() {
	return this.put(new Da());
}) } }), O(Da, "G");
var Oa = class extends F {
	constructor(e, t = e) {
		super(E("a", e), t);
	}
	target(e) {
		return this.attr("target", e);
	}
	to(e) {
		return this.attr("href", e, kt);
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
var ka = class extends F {
	constructor(e, t = e) {
		super(E("mask", e), t);
	}
	remove() {
		return this.targets().forEach(function(e) {
			e.unmask();
		}), super.remove();
	}
	targets() {
		return Yn(this.node, "mask");
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
var Aa = class extends yr {
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
	for (let e in t) n += yt(e) + ":" + t[e] + ";";
	return n += "}", n;
}
var Ma = class extends yr {
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
			e instanceof Oi || (e = this.defs().path(e)), n.attr("href", "#" + e, kt);
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
			return Yn(this.node, "href", "textPath");
		}
	}
}), Na.prototype.MorphArray = vi, O(Na, "TextPath");
var Pa = class extends I {
	constructor(e, t = e) {
		super(E("use", e), t);
	}
	use(e, t) {
		return this.attr("href", (t || "") + "#" + e, kt);
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
], y("marker")), k(fa, y("Text")), k(Oi, y("Path")), k(Er, y("Defs")), k([fa, pa], y("Tspan")), k([
	Li,
	Ir,
	Vr,
	Hi
], y("radius")), k(lr, y("EventTarget")), k(vr, y("Dom")), k(yr, y("Element")), k(I, y("Shape")), k([F, Lr], y("Container")), k(Vr, y("Gradient")), k(Hi, y("Runner")), Wn.extend(b()), Ei([
	P,
	Mn,
	N,
	M,
	pr,
	Wr,
	vi,
	j
]), Di();
// src/calculus/numbers.ts
function R(e, t = 10) {
	let n = 10 ** t, r = e * n;
	return !Number.isFinite(r) || Math.abs(r) >= 2 ** 53 - 1 ? e : Math.round(r) / n + 0;
}
var Ia = 1e-9;
function La(e, t = 100) {
	if (!Number.isFinite(e)) return null;
	for (let n = 1; n <= t; n++) {
		let t = Math.round(e * n);
		if (Math.abs(e - t / n) <= Ia) return {
			numerator: t + 0,
			denominator: n
		};
	}
	return null;
}
function Ra({ numerator: e, denominator: t }) {
	return t === 1 ? String(e) : `${e < 0 ? "-" : ""}\\frac{${Math.abs(e)}}{${t}}`;
}
function za({ numerator: e, denominator: t }) {
	return t === 1 ? String(e) : `${e}/${t}`;
}
function Ba(e) {
	if (typeof e == "number") return e;
	let t = e.split("/"), n = t.map((e) => e.trim() === "" ? NaN : +e);
	if (t.length > 2 || n.some(isNaN)) throw new r(`Cannot parse "${e}" as a number or a fraction`);
	return t.length === 2 ? n[0] / n[1] : n[0];
}
// src/pidraw.common.ts
function Va(e) {
	return Ua(e, ["x", "y"]);
}
function Ha(e) {
	return Ua(e, ["min", "max"]);
}
function Ua(e, t) {
	if (typeof e != "object" || !e) return !1;
	let n = e;
	return t.every((e) => n[e] !== void 0);
}
var Wa = /* @__PURE__ */ function(e) {
	return e.BACKGROUND = "background", e.GRIDS = "grids", e.AXIS = "axis", e.MAIN = "main", e.PLOTS_BACKGROUND = "plots_BG", e.PLOTS = "plots", e.PLOTS_FOREGROUND = "plots_FG", e.FOREGROUND = "foreground", e.POINTS = "points", e.INTERACTIVE = "interactive", e;
}({}), Ga = /* @__PURE__ */ function(e) {
	return e.X = "Ox", e.Y = "Oy", e;
}({}), Ka = /* @__PURE__ */ function(e) {
	return e.CARTESIAN_2D = "cartesian_2d", e.POLAR = "polar", e;
}({});
// src/calculus/geometry.ts
function z() {
	return {
		x: NaN,
		y: NaN
	};
}
function B(e) {
	return Number.isFinite(e.x) && Number.isFinite(e.y);
}
function V(e, t) {
	return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
var qa = class e {
	x;
	y;
	constructor(e, t) {
		if (Va(e) && Va(t)) this.x = t.x - e.x, this.y = t.y - e.y;
		else if (Va(e) && t === void 0) this.x = e.x, this.y = e.y;
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
}, Ja = class {
	A;
	director;
	constructor(e, t) {
		this.A = e, this.director = t instanceof qa ? t : new qa(e, t);
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
		let t = this.director, n = new qa(this.A, e), r = qa.scalarProduct(t, n) / qa.scalarProduct(t, t);
		return {
			x: this.A.x + t.x * r,
			y: this.A.y + t.y * r
		};
	}
};
function Ya(e, t, n, r) {
	let i = -r * Math.PI / 180;
	return {
		x: e + n * Math.cos(i),
		y: t + n * Math.sin(i)
	};
}
function Xa(e, t) {
	let n = Math.atan2(-(t.y - e.y), t.x - e.x) * 180 / Math.PI;
	return (n < 0 ? n + 360 : n) + 0;
}
// src/calculus/coordinates.ts
function Za(e, t, n) {
	if (typeof e == "number") return e * (n === "y" ? t.axis.y.y : t.axis.x.x);
	if (Ha(e)) {
		let r = n === "y" ? t.origin.y : t.origin.x, i = n === "y" ? t.axis.y.y : t.axis.x.x, a = r + e.min * i, o = r + e.max * i;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (Va(e)) return {
		x: t.origin.x + e.x * t.axis.x.x + e.y * t.axis.y.x,
		y: t.origin.y + e.x * t.axis.x.y + e.y * t.axis.y.y
	};
	throw new a(`Cannot convert ${JSON.stringify(e)} to pixels`);
}
function H(e, t, n) {
	if (typeof e == "number") return e / (n === "y" ? t.axis.y.y : t.axis.x.x);
	if (Ha(e)) {
		let r = n === "y" ? t.origin.y : t.origin.x, i = n === "y" ? t.axis.y.y : t.axis.x.x, a = (e.min - r) / i, o = (e.max - r) / i;
		return {
			min: Math.min(a, o),
			max: Math.max(a, o)
		};
	}
	if (Va(e)) {
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
var Qa = 1e-12, $a = 1e-9;
function eo() {
	return {
		center: z(),
		radius: NaN
	};
}
function to(e, t, n) {
	let r = t.x - e.x, i = t.y - e.y, a = n.x - e.x, o = n.y - e.y, s = 2 * (r * o - i * a);
	if (!(Math.abs(s) > Qa * Math.hypot(r, i) * Math.hypot(a, o))) return eo();
	let c = r * r + i * i, l = a * a + o * o, u = (o * c - i * l) / s, d = (r * l - a * c) / s;
	return {
		center: {
			x: e.x + u,
			y: e.y + d
		},
		radius: Math.hypot(u, d)
	};
}
function no(e, t, n) {
	let r = V(t, n), i = V(n, e), a = V(e, t), o = r + i + a, s = Math.abs((t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x));
	return s > Qa * o * o ? {
		center: {
			x: (r * e.x + i * t.x + a * n.x) / o,
			y: (r * e.y + i * t.y + a * n.y) / o
		},
		radius: s / o
	} : eo();
}
function ro(e, t) {
	let n = V(e, t) / 2;
	return n > 0 ? {
		center: {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		},
		radius: n
	} : eo();
}
function io(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = Math.hypot(r, i);
	if (!(a > 0)) return eo();
	let o = Math.abs(r * (e.y - t.y) - i * (e.x - t.x)) / a;
	return o > $a ? {
		center: {
			x: e.x,
			y: e.y
		},
		radius: o
	} : eo();
}
function ao(e) {
	return 2 * Math.PI * e;
}
function oo(e) {
	return Math.PI * e * e;
}
// src/calculus/computeLine.ts
function so(e, t, n, r, i = 0, a = !1, o) {
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
function co(e, t, n, r) {
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
function lo(e, t) {
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
function uo(e, t, n) {
	let r = new qa(e, t), i = new qa(e, n), a = {
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
function fo(e, t, n = !1) {
	let r = e.intersection(t);
	if (r === null) {
		if (n) return {
			point: z(),
			direction: z()
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
var po = 1e-12, mo = 1e-6;
function ho(e, t, n, r) {
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
	if (d <= po * f) return [p(-l / (2 * c))];
	let m = Math.sqrt(d);
	return [p((-l - m) / (2 * c)), p((-l + m) / (2 * c))];
}
function go(e, t, n, r) {
	let i = n.x - e.x, a = n.y - e.y, o = Math.hypot(i, a);
	if (![
		o,
		t,
		r
	].every(Number.isFinite) || o === 0) return null;
	let s = mo * Math.max(t, r);
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
var _o = class {
	_expression;
	_run;
	constructor(e) {
		this._expression = e;
		let t = new Mo(e).parse();
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
		return Co(this._run(e));
	}
}, vo = {
	pi: Math.PI,
	e: Math.E
}, yo = {
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
}, bo = {
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
}, xo = { nthrt: (e, t) => e < 0 && t % 2 == 0 ? NaN : (e < 0 ? -1 : 1) * Math.abs(e) ** (1 / t) }, So = [...Object.keys(yo), ...Object.keys(xo)].sort((e, t) => t.length - e.length);
function Co(e) {
	return Math.abs(e) < 1e5 ? Math.round(e * 1e10) / 1e10 + 0 : e;
}
function wo(e) {
	if (!Number.isFinite(e)) return Number.isNaN(e) ? "(0/0)" : e > 0 ? "(1/0)" : "(-1/0)";
	let t = String(Number(e.toPrecision(15))), n = t.includes("e") ? e.toFixed(20).replace(/\.?0+$/, "") : t;
	return e < 0 ? `(${n})` : n;
}
function To(e) {
	return {
		run: () => e,
		value: e,
		pgf: wo(e)
	};
}
function Eo(e, t, n) {
	if (e.value !== void 0) return To(t(e.value));
	let r = e.run;
	return {
		run: (e) => t(r(e)),
		pgf: n(e.pgf)
	};
}
function Do(e, t, n) {
	let r = t.run, i = n.run;
	if (t.value !== void 0 && n.value !== void 0) return To(Oo(e, t.value, n.value));
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
function Oo(e, t, n) {
	switch (e) {
		case "+": return t + n;
		case "-": return t - n;
		case "*": return t * n;
		case "/": return t / n;
		case "%": return t % n;
		default: return t ** +n;
	}
}
function ko(e) {
	return {
		pgf: `«${e}»`,
		run: (t) => {
			let n = t[e];
			if (n === void 0) throw new a(`No value for the variable "${e}"`);
			return n;
		}
	};
}
var Ao = /^(?:\d+\.?\d*|\.\d+)/;
function jo(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let i = e[n];
		if (/\s/.test(i)) n++;
		else if (/[\d.]/.test(i)) {
			let i = Ao.exec(e.slice(n));
			if (i === null) throw new r(`Cannot parse "${e}": invalid number at position ${n}`);
			t.push({
				kind: "number",
				text: i[0]
			}), n += i[0].length;
		} else if (/[a-zA-Z]/.test(i)) {
			let r = So.find((t) => e.startsWith(t + "(", n));
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
var Mo = class {
	_expression;
	_tokens;
	_pos = 0;
	constructor(e) {
		this._expression = e, this._tokens = jo(e);
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
			e = Do(t, e, this._multiplicative());
		}
		return e;
	}
	_multiplicative() {
		let e = this._unary();
		for (;;) {
			if (this._isOperator("*", "/", "%")) {
				let t = this._tokens[this._pos++].text;
				e = Do(t, e, this._unary());
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
			t.kind === "number" && this._tokens[this._pos - 1].kind === "number" && this._fail(`two numbers in a row ("${this._tokens[this._pos - 1].text} ${t.text}")`), e = Do("*", e, this._unary());
		}
	}
	_unary() {
		return this._isOperator("-") ? (this._pos++, Eo(this._unary(), (e) => -e, (e) => `(-${e})`)) : this._isOperator("+") ? (this._pos++, this._unary()) : this._power();
	}
	_power() {
		let e = this._primary();
		return this._isOperator("^") ? (this._pos++, Do("^", e, this._unary())) : e;
	}
	_primary() {
		let e = this._peek();
		if (e === void 0) return this._fail("the expression ends unexpectedly");
		switch (this._pos++, e.kind) {
			case "number": return To(+e.text);
			case "constant": return To(vo[e.text]);
			case "variable": return ko(e.text);
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
		if (this._expect(")"), e in yo && t.length === 1) return Eo(t[0], yo[e], bo[e]);
		if (e in xo && t.length === 2) {
			let n = xo[e], [r, i] = t;
			return r.value !== void 0 && i.value !== void 0 ? To(n(r.value, i.value)) : {
				run: (e) => n(r.run(e), i.run(e)),
				pgf: i.value !== void 0 && i.value % 2 == 0 ? `(${r.pgf}^(1/${i.pgf}))` : `(sign(${r.pgf})*abs(${r.pgf})^(1/${i.pgf}))`
			};
		}
		return this._fail(`"${e}" does not take ${t.length} argument(s)`);
	}
}, No = [
	[1, 1],
	[2, -3],
	[-4, 5]
];
function Po(e) {
	let t = (t, n) => new r(`Cannot parse "${e}" as the equation of a line: ${t}`, { cause: n }), n = e.split("=");
	if (n.length !== 2) throw t("expected one \"=\"");
	let i;
	try {
		i = new _o(`(${n[0]})-(${n[1]})`);
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
	}, s = o(0, 0), c = o(1, 0) - s, l = o(0, 1) - s, u = No.every(([e, t]) => {
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
function Fo(e, t, n) {
	let { a: r, b: i, c: a } = Io(e, t, n), o = (e) => e.toFixed(10).replace(/\.?0+$/, ""), s = [];
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
function Io(e, t, n) {
	let { x: r, y: i } = e, { x: a, y: o } = t, { x: c, y: l } = n, u = (r - a) * (r - c) * (a - c);
	if (u === 0) throw new s("A parabola through three points needs three different abscissas");
	return {
		a: (i * (a - c) + o * (c - r) + l * (r - a)) / u,
		b: (i * (c ** 2 - a ** 2) + o * (r ** 2 - c ** 2) + l * (a ** 2 - r ** 2)) / u,
		c: (i * (a * c * (a - c)) + o * (c * r * (c - r)) + l * (r * a * (r - a))) / u
	};
}
// src/calculus/computeCurve.ts
var Lo = 12;
function Ro(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = r * r + i * i;
	if (a === 0) return Math.hypot(e.x - t.x, e.y - t.y);
	let o = Math.max(0, Math.min(1, ((e.x - t.x) * r + (e.y - t.y) * i) / a));
	return Math.hypot(e.x - (t.x + o * r), e.y - (t.y + o * i));
}
function zo(e, t, n) {
	return e.x < n.left && t.x < n.left || e.x > n.right && t.x > n.right || e.y < n.top && t.y < n.top || e.y > n.bottom && t.y > n.bottom;
}
function Bo(e, t) {
	let n = [], r = 0;
	for (; r < e.length;) {
		if (!B(e[r])) {
			n.length > 0 && B(n[n.length - 1]) && n.push(e[r]), r++;
			continue;
		}
		let i = r;
		for (; i + 1 < e.length && B(e[i + 1]);) i++;
		n.push(...Vo(e.slice(r, i + 1), t)), r = i + 1;
	}
	return n;
}
function Vo(e, t) {
	if (e.length < 3) return e;
	let n = Array(e.length).fill(!1);
	n[0] = n[e.length - 1] = !0;
	let r = [[0, e.length - 1]];
	for (let i = r.pop(); i !== void 0; i = r.pop()) {
		let [a, o] = i, s = -1, c = t;
		for (let t = a + 1; t < o; t++) {
			let n = Ro(e[t], e[a], e[o]);
			n > c && (c = n, s = t);
		}
		s >= 0 && (n[s] = !0, r.push([a, s], [s, o]));
	}
	return e.filter((e, t) => n[t]);
}
function Ho(e, t, n, r) {
	let { tolerance: i, maxDepth: a, view: o, bound: s } = r, c = Math.max(1, Math.ceil(r.intervals)), l = [], u = (t) => {
		let n = e(t);
		return B(n) && Math.abs(n.x) <= s && Math.abs(n.y) <= s ? n : z();
	}, d = (e, t, n) => B(e) && Ro(e, t, n) <= i, f = (e, t, n) => {
		let r = e, i = t, a = n;
		for (let e = 0; e < Lo; e++) {
			let e = (r + a) / 2, t = u(e);
			B(t) ? (r = e, i = t) : a = e;
		}
		return [r, i];
	}, p = (e, t, n, r, i) => {
		let c = B(t), m = B(r);
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
		if (i >= a || Math.hypot(r.x - t.x, r.y - t.y) > s || zo(t, r, o)) return;
		let h = (e + n) / 2, g = u(h);
		B(g) && d(g, t, r) && d(u(e + (n - e) / 4), t, r) && d(u(e + 3 * (n - e) / 4), t, r) ? l.push(g) : (p(e, t, h, g, i + 1), l.push(g), p(h, g, n, r, i + 1));
	}, m = t, h = u(t);
	l.push(h);
	for (let e = 1; e <= c; e++) {
		let r = e === c ? n : t + e * (n - t) / c, i = u(r);
		p(m, h, r, i, 0), l.push(i), m = r, h = i;
	}
	return Bo(l, i / 2);
}
function Uo(e, t, n) {
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r], a = r > 0 ? e[r - 1] : void 0;
		if (!B(i)) continue;
		if (a === void 0 || !B(a)) {
			if (i.x >= 0 && i.x <= t && i.y >= 0 && i.y <= n) return {
				point: i,
				direction: {
					x: 0,
					y: 0
				}
			};
			continue;
		}
		let o = co(a, i, t, n);
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
function Wo(e, t) {
	let n = z(), r = Infinity, i = (e) => {
		let i = Math.hypot(e.x - t.x, e.y - t.y);
		i < r && (r = i, n = e);
	};
	return e.forEach((n, r) => {
		if (!B(n)) return;
		let a = r > 0 ? e[r - 1] : void 0;
		if (a === void 0 || !B(a)) {
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
function Go(e, t, n = .5) {
	let r = null, i = 1e-9;
	for (let [a, o] of [[n, n], [n, -n]]) {
		let n = e(t.x + a, t.y + o), s = e(t.x - a, t.y - o);
		if (!B(n) || !B(s)) continue;
		let c = Math.hypot(n.x - s.x, n.y - s.y);
		c > i && (i = c, r = {
			x: n.x - s.x,
			y: n.y - s.y
		});
	}
	return r;
}
function U(e) {
	return Math.round(e * 100) / 100 + 0;
}
function Ko(e, t) {
	let n = [], r = null;
	for (let i of e) {
		if (!B(i)) {
			r = null;
			continue;
		}
		let e = r !== null && Math.hypot(i.x - r.x, i.y - r.y) <= t;
		n.push(`${e ? "L" : "M"} ${U(i.x)} ${U(i.y)}`), r = i;
	}
	return n.length > 0 ? n.join(" ") : "M 0 0";
}
function qo(e, t) {
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
function Jo(e, t = !1) {
	let n = e.length;
	if (n < 2) return [];
	let r = e.map((r, i) => {
		let a = t ? e[(i - 1 + n) % n] : e[Math.max(i - 1, 0)], o = t ? e[(i + 1) % n] : e[Math.min(i + 1, n - 1)], s = {
			x: o.point.x - a.point.x,
			y: o.point.y - a.point.y
		}, c = Math.hypot(s.x, s.y) * (r.ratio ?? .2), l = qo(r.direction, s);
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
function Yo(e) {
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
function Xo(e, t = !1) {
	if (e.length === 0) return "M 0 0";
	let n = (e) => `${U(e.x)},${U(e.y)}`, r = e.map(({ control1: e, control2: t, end: r }) => `C ${n(e)} ${n(t)} ${n(r)}`);
	return [
		`M ${n(e[0].start)}`,
		...r,
		...t ? ["Z"] : []
	].join(" ");
}
function Zo({ start: e, control1: t, control2: n, end: r }, i) {
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
var Qo = 4, $o = 1e9;
function es(e, t = .5) {
	return e.flatMap((e, n) => {
		let r = Ho((t) => Zo(e, t).point, 0, 1, {
			intervals: Qo,
			tolerance: t,
			maxDepth: 8,
			view: {
				left: -1e9,
				right: $o,
				top: -1e9,
				bottom: $o
			},
			bound: $o
		});
		return n === 0 ? r : r.slice(1);
	});
}
var ts = 24;
function ns(e) {
	let t = e.flatMap((e) => Array.from({ length: ts }, (t, n) => Zo(e, (n + 1) / ts)));
	if (t.length === 0) return null;
	let n = [Zo(e[0], 0), ...t], r = n.map((e, t) => t === 0 ? 0 : Math.hypot(e.point.x - n[t - 1].point.x, e.point.y - n[t - 1].point.y)), i = r.reduce((e, t) => e + t, 0) / 2, a = 0;
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
var rs = 1e-9;
function is(e, t) {
	let n = ((t - e) % 360 + 360) % 360;
	return n < rs || n > 359.999999999 ? 0 : n;
}
function as(e, t, n, r, i, a) {
	if (!B(e) || !Number.isFinite(t) || !Number.isFinite(n) || !Number.isFinite(r) || V(e, a) === 0) return z();
	let o = Xa(e, a);
	if ((i ? is(o, n) : is(n, o)) <= r) return Ya(e.x, e.y, t, o);
	let s = Ya(e.x, e.y, t, n), c = Ya(e.x, e.y, t, i ? n - r : n + r);
	return V(s, a) <= V(c, a) ? s : c;
}
function os(e, t) {
	return e * t * Math.PI / 180;
}
function ss(e, t) {
	return e * e * t * Math.PI / 360;
}
// src/calculus/computeAxis.ts
var cs = 1e-9, ls = 2e3, us = 12;
function ds(e, t, n, r, i, a) {
	let o = t.x * t.x + t.y * t.y, s = n * Math.sqrt(o);
	if (!(o > 0) || !(s >= a) || !Number.isFinite(s)) return [];
	let c = (n) => ((n.x - e.x) * t.x + (n.y - e.y) * t.y) / o, l = [c(r) / n, c(i) / n], u = Math.ceil(Math.min(...l) - cs), d = Math.floor(Math.max(...l) + cs);
	return !Number.isFinite(u) || !Number.isFinite(d) || d - u > ls ? [] : Array.from({ length: Math.max(0, d - u + 1) }, (r, i) => {
		let a = u + i;
		return {
			index: a,
			value: R(a * n),
			point: {
				x: e.x + a * n * t.x,
				y: e.y + a * n * t.y
			}
		};
	});
}
function fs(e, t) {
	return t === void 0 || e === 0 || t.first === !0 && e === 1 ? !0 : t.every === void 0 ? t.first !== !0 : e % t.every === 0;
}
function ps(e, t) {
	return e > 0 ? Math.max(1, Math.ceil(t / e - cs)) : 1;
}
function ms(e) {
	let t = e / Math.PI;
	for (let e = 1; e <= us; e++) {
		let n = Math.round(t * e);
		if (Math.abs(t - n / e) < cs) return {
			p: n + 0,
			q: e
		};
	}
	return null;
}
function hs(e, t, n) {
	let r = t === "pi" ? ms(e) : null;
	if (r === null) {
		let t = String(R(e, n));
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
var gs = 1e-9;
function _s(e, t, n, r, i, a, o = 0) {
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
	].map(([t, n]) => (t - e.x) * c.x + (n - e.y) * c.y), d = [Math.min(...u) / l, Math.max(...u) / l], f = Math.ceil(Math.min(...d) - gs), p = Math.floor(Math.max(...d) + gs), m = [];
	for (let a = f; a <= p; a++) {
		if (o > 0 && a % o === 0) continue;
		let s = so({
			x: e.x + a * n.x,
			y: e.y + a * n.y
		}, t, r, i), c = s === null ? null : co(s[0], s[1], r, i);
		c !== null && m.push(c);
	}
	return m;
}
function vs(e, t) {
	let n = Math.max(e.min, t.min), r = Math.min(e.max, t.max);
	return n <= r ? {
		min: n,
		max: r
	} : null;
}
function ys(e, t, n, r) {
	let i = vs(e, t);
	if (i === null) return [];
	let a = n / r, o = Math.ceil(i.min / a - gs), s = Math.floor(i.max / a + gs), c = [];
	for (let e = o; e <= s; e++) (r === 1 || e % r !== 0) && c.push(R(e * a));
	if (r === 1) for (let n of [e.min, e.max]) {
		let e = n >= t.min && n <= t.max, r = c.some((e) => Math.abs(e - n) <= gs * Math.max(1, Math.abs(n)));
		e && !r && c.push(n);
	}
	return c.sort((e, t) => e - t);
}
function bs(e, t, n, r, i, a = 1) {
	let o = vs(e.x, t.x), s = vs(e.y, t.y);
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
	}, l = (e) => !(c(e) >= i), u = l("y") ? [] : ys(e.y, t.y, n.y, a).map((e) => [r({
		x: o.min,
		y: e
	}), r({
		x: o.max,
		y: e
	})]), d = l("x") ? [] : ys(e.x, t.x, n.x, a).map((e) => [r({
		x: e,
		y: s.min
	}), r({
		x: e,
		y: s.max
	})]);
	return [...u, ...d];
}
// src/calculus/units.ts
var xs = [
	"pm",
	"nm",
	"µm",
	"mm",
	"cm",
	"dm",
	"m",
	"dam",
	"hm",
	"km",
	"u"
], Ss = {
	unit: null,
	scale: 1
}, Cs = /^[µμu]m$/;
function ws(e) {
	let t = Cs.test(e) ? "µm" : e;
	return xs.includes(t) ? t : null;
}
function Ts(e) {
	if (e.unit !== null && !xs.includes(e.unit)) throw new a(`Invalid unit ${JSON.stringify(e.unit)} for the graph: expected ${xs.join(", ")}`);
	if (!(Number.isFinite(e.scale) && e.scale > 0)) throw new a(`Invalid scale ${String(e.scale)} for the graph: expected a finite number greater than 0`);
}
function Es(e, t, n) {
	return e * t.scale ** n;
}
function Ds(e, t, n) {
	return n ? `${e === "µm" ? "\\mu\\mathrm{m}" : `\\mathrm{${e}}`}${t === 2 ? "^2" : ""}` : `${e}${t === 2 ? "²" : ""}`;
}
function Os(e, t, n, r) {
	return t === null ? e : `${e}${r ? "\\," : " "}${Ds(t, n, r)}`;
}
function ks(e, t) {
	return t ? `${e}^\\circ` : `${e}°`;
}
// src/calculus/computePath.ts
var As = {
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
}, js = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y, Ms = /[A-Za-z]/;
function Ns(e, t, n, r, i, a, o) {
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
	let g = p * p, _ = m * m, ee = g * _ - g * f * f - _ * d * d, te = (i === a ? -1 : 1) * Math.sqrt(Math.max(0, ee / (g * f * f + _ * d * d))), ne = te * p * f / m, v = -te * m * d / p, y = {
		x: c * ne - l * v + (e.x + o.x) / 2,
		y: l * ne + c * v + (e.y + o.y) / 2
	}, b = (e, t, n, r) => Math.atan2(e * r - t * n, e * n + t * r), re = b(1, 0, (d - ne) / p, (f - v) / m), x = b((d - ne) / p, (f - v) / m, (-d - ne) / p, (-f - v) / m);
	!a && x > 0 ? x -= 2 * Math.PI : a && x < 0 && (x += 2 * Math.PI);
	let ie = (e) => ({
		x: y.x + p * Math.cos(e) * c - m * Math.sin(e) * l,
		y: y.y + p * Math.cos(e) * l + m * Math.sin(e) * c
	}), S = (e) => ({
		x: -p * Math.sin(e) * c - m * Math.cos(e) * l,
		y: -p * Math.sin(e) * l + m * Math.cos(e) * c
	}), ae = Math.max(1, Math.ceil(Math.abs(x) / (Math.PI / 2) - 1e-9)), C = x / ae, oe = 4 / 3 * Math.tan(C / 4);
	return Array.from({ length: ae }, (e, t) => {
		let n = re + t * C, r = n + C, i = ie(n), a = t === ae - 1 ? o : ie(r), s = S(n), c = S(r);
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
function Ps(e) {
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
		d(), js.lastIndex = n;
		let t = js.exec(e);
		return t === null ? l("expected a number") : (n += t[0].length, +t[0]);
	}, p = () => (d(), e[n] !== "0" && e[n] !== "1" ? l("expected 0 or 1") : (n++, e[n - 1] === "1"));
	for (u(); n < e.length && (u(), !(n >= e.length));) {
		if (Ms.test(e[n])) {
			if (i = e[n], i.toUpperCase() in As || l(`the command "${i}" does not exist`), t.length === 0 && i !== "M" && i !== "m" && l("a path begins with M"), n++, i === "Z" || i === "z") {
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
				t.push(...Ns(a, e, n, r, i, o, l)), a = l, s = c = null;
			}
		}
	}
	return t;
}
function Fs(e, t) {
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
function Is(e) {
	let t = (e) => `${U(e.x)} ${U(e.y)}`;
	return e.map((e) => {
		switch (e.type) {
			case "M":
			case "L": return `${e.type} ${t(e.p)}`;
			case "C": return `C ${t(e.c1)} ${t(e.c2)} ${t(e.p)}`;
			case "Z": return "Z";
		}
	}).join(" ");
}
function Ls(e) {
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
// src/calculus/colors.ts
var Rs = {
	aliceblue: "f0f8ff",
	antiquewhite: "faebd7",
	aqua: "00ffff",
	aquamarine: "7fffd4",
	azure: "f0ffff",
	beige: "f5f5dc",
	bisque: "ffe4c4",
	black: "000000",
	blanchedalmond: "ffebcd",
	blue: "0000ff",
	blueviolet: "8a2be2",
	brown: "a52a2a",
	burlywood: "deb887",
	cadetblue: "5f9ea0",
	chartreuse: "7fff00",
	chocolate: "d2691e",
	coral: "ff7f50",
	cornflowerblue: "6495ed",
	cornsilk: "fff8dc",
	crimson: "dc143c",
	cyan: "00ffff",
	darkblue: "00008b",
	darkcyan: "008b8b",
	darkgoldenrod: "b8860b",
	darkgray: "a9a9a9",
	darkgreen: "006400",
	darkgrey: "a9a9a9",
	darkkhaki: "bdb76b",
	darkmagenta: "8b008b",
	darkolivegreen: "556b2f",
	darkorange: "ff8c00",
	darkorchid: "9932cc",
	darkred: "8b0000",
	darksalmon: "e9967a",
	darkseagreen: "8fbc8f",
	darkslateblue: "483d8b",
	darkslategray: "2f4f4f",
	darkslategrey: "2f4f4f",
	darkturquoise: "00ced1",
	darkviolet: "9400d3",
	deeppink: "ff1493",
	deepskyblue: "00bfff",
	dimgray: "696969",
	dimgrey: "696969",
	dodgerblue: "1e90ff",
	firebrick: "b22222",
	floralwhite: "fffaf0",
	forestgreen: "228b22",
	fuchsia: "ff00ff",
	gainsboro: "dcdcdc",
	ghostwhite: "f8f8ff",
	gold: "ffd700",
	goldenrod: "daa520",
	gray: "808080",
	green: "008000",
	greenyellow: "adff2f",
	grey: "808080",
	honeydew: "f0fff0",
	hotpink: "ff69b4",
	indianred: "cd5c5c",
	indigo: "4b0082",
	ivory: "fffff0",
	khaki: "f0e68c",
	lavender: "e6e6fa",
	lavenderblush: "fff0f5",
	lawngreen: "7cfc00",
	lemonchiffon: "fffacd",
	lightblue: "add8e6",
	lightcoral: "f08080",
	lightcyan: "e0ffff",
	lightgoldenrodyellow: "fafad2",
	lightgray: "d3d3d3",
	lightgreen: "90ee90",
	lightgrey: "d3d3d3",
	lightpink: "ffb6c1",
	lightsalmon: "ffa07a",
	lightseagreen: "20b2aa",
	lightskyblue: "87cefa",
	lightslategray: "778899",
	lightslategrey: "778899",
	lightsteelblue: "b0c4de",
	lightyellow: "ffffe0",
	lime: "00ff00",
	limegreen: "32cd32",
	linen: "faf0e6",
	magenta: "ff00ff",
	maroon: "800000",
	mediumaquamarine: "66cdaa",
	mediumblue: "0000cd",
	mediumorchid: "ba55d3",
	mediumpurple: "9370db",
	mediumseagreen: "3cb371",
	mediumslateblue: "7b68ee",
	mediumspringgreen: "00fa9a",
	mediumturquoise: "48d1cc",
	mediumvioletred: "c71585",
	midnightblue: "191970",
	mintcream: "f5fffa",
	mistyrose: "ffe4e1",
	moccasin: "ffe4b5",
	navajowhite: "ffdead",
	navy: "000080",
	oldlace: "fdf5e6",
	olive: "808000",
	olivedrab: "6b8e23",
	orange: "ffa500",
	orangered: "ff4500",
	orchid: "da70d6",
	palegoldenrod: "eee8aa",
	palegreen: "98fb98",
	paleturquoise: "afeeee",
	palevioletred: "db7093",
	papayawhip: "ffefd5",
	peachpuff: "ffdab9",
	peru: "cd853f",
	pink: "ffc0cb",
	plum: "dda0dd",
	powderblue: "b0e0e6",
	purple: "800080",
	rebeccapurple: "663399",
	red: "ff0000",
	rosybrown: "bc8f8f",
	royalblue: "4169e1",
	saddlebrown: "8b4513",
	salmon: "fa8072",
	sandybrown: "f4a460",
	seagreen: "2e8b57",
	seashell: "fff5ee",
	sienna: "a0522d",
	silver: "c0c0c0",
	skyblue: "87ceeb",
	slateblue: "6a5acd",
	slategray: "708090",
	slategrey: "708090",
	snow: "fffafa",
	springgreen: "00ff7f",
	steelblue: "4682b4",
	tan: "d2b48c",
	teal: "008080",
	thistle: "d8bfd8",
	tomato: "ff6347",
	turquoise: "40e0d0",
	violet: "ee82ee",
	wheat: "f5deb3",
	white: "ffffff",
	whitesmoke: "f5f5f5",
	yellow: "ffff00",
	yellowgreen: "9acd32"
}, zs = .38;
function Bs(e, t) {
	let n = Math.hypot(e, t);
	return n === 0 ? "tc" : `${t / n > zs ? "b" : t / n < -.38 ? "t" : "m"}${e / n > zs ? "r" : e / n < -.38 ? "l" : "c"}`;
}
function Vs(e, t, n) {
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
		alignement: Bs(i.x, i.y)
	};
}
function Hs(e, t) {
	return R(e, t ?? 2).toString();
}
function Us(e, t, n, r, i = 1) {
	let a = n ?? Ss;
	return Os(Hs(Es(e, a, i), t), a.unit, i, r.tex);
}
function Ws(e, t, n) {
	return ks(Hs(e, t), n.tex);
}
function Gs(e, t, n) {
	if (typeof e == "string") return;
	let r = Object.keys(t);
	for (let t of e) if (typeof t != "string") {
		if (!r.includes(t.field)) throw new a(`The figure "${n}" cannot show the field "${t.field}" in its label: ${r.length === 0 ? "it has none" : `expected ${r.join(", ")}`}`);
		if (t.digits !== void 0 && (!Number.isInteger(t.digits) || t.digits < 0)) throw new a(`Invalid number of digits ${t.digits} for the field "${t.field}" of the label of "${n}": expected an integer of 0 or more`);
	}
}
function Ks(e, t, n = { tex: !1 }) {
	return typeof e == "string" ? e : e.map((e) => {
		if (typeof e == "string") return e;
		let r = t[e.field];
		if (r === void 0) throw new a(`The label cannot show the field "${e.field}"`);
		return r(e.digits, n);
	}).join("");
}
function qs(e) {
	let [t, n] = e, r = n === "l" ? -1 : +(n === "r"), i = t === "t" ? -1 : +(t === "b");
	return r === 0 && i === 0 ? null : {
		x: r,
		y: i
	};
}
function Js(e) {
	let t = Math.hypot(e.x, e.y);
	return Number.isFinite(t) && t > 0 ? {
		x: e.x / t,
		y: e.y / t
	} : null;
}
function Ys(e) {
	let t = Js(e);
	return t === null ? {
		x: 0,
		y: 0
	} : {
		x: t.x * $s * t.x ** 2,
		y: t.y * $s * t.x ** 2
	};
}
function Xs(e, t, n, r) {
	let i = Js(t);
	if (i === null) return {
		x: e.x,
		y: e.y
	};
	let a = Math.min(i.x === 0 ? Infinity : n / 2 / Math.abs(i.x), i.y === 0 ? Infinity : r / 2 / Math.abs(i.y)), o = Ys(i);
	return {
		x: e.x + i.x * a + o.x,
		y: e.y + i.y * a + o.y
	};
}
function Zs(e, t) {
	let n = e === null ? null : Js(e);
	return n === null ? {
		x: 0,
		y: 0
	} : {
		x: n.x * t,
		y: n.y * t
	};
}
var Qs = [
	"tl",
	"tc",
	"tr",
	"ml",
	"mc",
	"mr",
	"bl",
	"bc",
	"br"
], $s = 10;
function ec(e, t, n, r) {
	let [i, a] = e, o = i === "m" ? $s : 0;
	return {
		x: a === "l" ? t.x - n / 2 - o : a === "r" ? t.x + n / 2 + o : t.x,
		y: i === "t" ? t.y - r / 2 : i === "b" ? t.y + r / 2 : t.y
	};
}
// src/figures/Label/Label.ts
function tc(e) {
	return e.replace(/[&<>"']/g, (e) => `&#${e.charCodeAt(0)};`);
}
var nc = class {
	_element;
	_name;
	constructor(e, t, n = {}) {
		this._element = e, this._name = t, this._config = {
			asHtml: n.asHtml ?? !1,
			alignement: n.alignement ?? "br",
			away: n.away ?? null,
			push: n.push ?? null,
			clearance: n.clearance ?? 0,
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
		let { alignement: e, away: t, push: n, clearance: r, offset: i, rotate: a, size: o } = this._config;
		return JSON.stringify([
			this._x,
			this._y,
			e,
			t,
			n,
			r,
			i.x,
			i.y,
			a,
			o,
			this._displayName
		]);
	}
	position(e, t, n, r) {
		e !== void 0 && (this._alignementGiven = !0, this._config.away = null);
		let i = t ?? this._config.offset;
		return this._config.alignement = e ?? this._config.alignement, this._config.offset = {
			x: Number.isNaN(i.x) ? 0 : i.x,
			y: Number.isNaN(i.y) ? 0 : i.y
		}, this._config.rotate = n ?? this._config.rotate, this._config.push = r === void 0 ? this._config.push : r, this._draw(), this;
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
	setAway(e) {
		return this._config.away = e === null ? null : Js(e), this._drawIfChanged(), this;
	}
	setClearance(e) {
		return this._config.clearance = e, this._drawIfChanged(), this;
	}
	_drawIfChanged() {
		this._applied !== null && this._applied !== this._state() && this._draw();
	}
	_draw() {
		let { alignement: e, away: t, push: n, clearance: r, offset: i, rotate: a } = this._config, { width: o, height: s } = this._size(), c = {
			x: this._x,
			y: this._y
		}, l = t === null ? ec(e, c, o, s) : Xs(c, t, o, s), u = Zs(t ?? qs(e), n ?? r);
		this._shape.center(l.x + i.x + u.x, l.y - i.y + u.y), this.rotate(a), this._applied = this._state();
	}
	_html() {
		return this._config.texConverter ? this.displayName : tc(this._displayName);
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
}, rc = [
	"->",
	"x",
	"|"
];
function ic(e, t, n) {
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
function ac(e, t, n, r = "->") {
	let i = (e) => e.replace(/[^\w-]/g, "_"), a = (t) => e.defs().findOne(`#${t}`);
	if (r === "x") {
		let r = i(`marker-x-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M0,0 L${n},${n} M${n},0 L0,${n}`).stroke({
				color: "black",
				width: 1
			});
		}).attr(ic(r, n));
	}
	if (r === "|") {
		let r = i(`marker-bar-${t}-${n}`);
		return a(r) ?? e.marker(n, n, (e) => {
			e.path(`M${n / 2},${n} L${n / 2},0`).stroke({
				color: "black",
				width: 1
			});
		}).attr(ic(r, n));
	}
	let o = i(`marker-${t}-${n}`);
	return a(o) ?? e.marker(n * 1.2, n * 1.2, (e) => {
		e.path(`M1,0 L1,${n}, L${n * 1.2},${n / 2} L1,0z`).stroke({
			color: "black",
			width: 1
		});
	}).attr(ic(o, n, {
		refX: n,
		refY: n / 2
	}));
}
// src/figures/AbstractFigure/AbstractFigure.constraints.ts
function oc(e, t) {
	if (!Va(e) || !Number.isFinite(e.x) || !Number.isFinite(e.y)) throw new a(`${t} expects a finite number or a {x, y} of finite numbers, got ${JSON.stringify(e)}`);
	return e;
}
// src/figures/AbstractFigure/AbstractFigure.tikz.ts
var sc = .75, cc = ["black", "white"], lc = {
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
function uc(e, t = 3) {
	let n = 10 ** t;
	return String(Math.round(e * n) / n);
}
function dc(e) {
	return `${uc(e * sc)}pt`;
}
function fc(e) {
	let t = e.trim().toLowerCase();
	if (t === "transparent" || t === "none") return null;
	let n = null, r = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(t), i = /^#([0-9a-f]{6})$/.exec(t), o = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(t);
	if (r ? n = r.slice(1).map((e) => e + e).join("") : i ? n = i[1] : o?.slice(1).every((e) => +e <= 255) && (n = o.slice(1).map((e) => (+e).toString(16).padStart(2, "0")).join("")), n !== null) return pc(`pidraw-${n}`, n);
	if (cc.includes(t)) return {
		name: t,
		definition: null
	};
	if (Object.hasOwn(Rs, t)) return pc(`pidraw-${t}`, Rs[t]);
	throw new a(`The color "${e}" has no TikZ equivalent: use a hexadecimal color ('#rrggbb') or a name of CSS`);
}
function pc(e, t) {
	return {
		name: e,
		definition: `\\definecolor{${e}}{HTML}{${t.toUpperCase()}}`
	};
}
function mc(e, t) {
	let { x: n, y: r } = H(e, t);
	return `${uc(n, 5)},${uc(r, 5)}`;
}
function hc(e) {
	let { x: t, y: n } = e.axis;
	return {
		x: dc(Math.hypot(t.x, t.y)),
		y: dc(Math.hypot(n.x, n.y))
	};
}
function gc(e) {
	let { origin: t, width: n, height: r, axis: i } = e, a = [-t.x / i.x.x, (n - t.x) / i.x.x], o = [-t.y / i.y.y, (r - t.y) / i.y.y];
	return {
		x: [Math.min(...a), Math.max(...a)],
		y: [Math.min(...o), Math.max(...o)]
	};
}
function _c(e, t, n = {}) {
	let { x: r, y: i } = gc(e), a = hc(e), { axis: o } = e, s = (e) => R(e, 5), c = [
		"hide axis",
		"scale only axis",
		"trig format plots=deg",
		"unbounded coords=jump",
		`x=${a.x}`,
		`y=${a.y}`,
		`at={(${dc(r[0] * Math.abs(o.x.x))},${dc(i[0] * Math.abs(o.y.y))})}`,
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
function vc(e) {
	return Math.min(1e3, Math.max(2, Math.ceil(4 * e) + 1));
}
function yc(e, t) {
	let { x: n, y: r } = t.axis, i = Math.hypot(n.x, n.y), a = Math.hypot(r.x, r.y), o = R(e / i, 5);
	return Math.abs(i - a) <= 1e-9 * Math.max(i, a) ? `radius=${o}` : `x radius=${o}, y radius=${R(e / a, 5)}`;
}
function bc(e, t, n) {
	let { stroke: r, fill: i } = e, a = /* @__PURE__ */ new Set(), o = [], s = (e) => {
		let t = fc(e);
		return t?.definition && a.add(t.definition), t?.name ?? null;
	}, c = s(r.color);
	o.push(c === null ? "draw=none" : `draw=${c}`), c !== null && (o.push(`line width=${uc(r.width * sc)}pt`), r.opacity < 1 && o.push(`draw opacity=${uc(r.opacity)}`));
	let l = s(i.color);
	if (l !== null && (o.push(`fill=${l}`), i.opacity < 1 && o.push(`fill opacity=${uc(i.opacity)}`)), t !== null) {
		let e = t.split(/[\s,]+/).map((e) => `${uc(+e * sc)}pt`), n = e.length % 2 == 1 ? [...e, ...e] : e;
		o.push(`dash pattern=${n.map((e, t) => `${t % 2 == 0 ? "on" : "off"} ${e}`).join(" ")}`);
	}
	if (n.start !== null || n.end !== null) {
		let e = n.start === null ? "" : lc[n.start].start, t = n.end === null ? "" : lc[n.end].end;
		o.push(`${e}-${t}`);
	}
	return {
		definitions: [...a],
		options: o
	};
}
function xc(e, t) {
	return t ? e.includes("$") ? e : `$${e}$` : e.replaceAll("∞", "$\\infty$");
}
function Sc(e, t, n) {
	let { alignement: r, offset: i, rotate: a, away: o = null, push: s = null, clearance: c = 0 } = e, l = o === null ? null : Js(o), u = {
		t: "above",
		b: "below",
		m: ""
	}[r[0]], d = {
		l: "left",
		r: "right",
		c: ""
	}[r[1]], f = [l === null ? `${u} ${d}`.trim() : `anchor=${uc(Math.atan2(l.y, -l.x) * 180 / Math.PI)}`], p = l === null ? {
		x: 0,
		y: 0
	} : Ys(l), m = Zs(l ?? qs(r), s ?? c), h = {
		x: i.x + m.x + p.x,
		y: i.y - m.y - p.y
	};
	Math.abs(h.x) > 1e-9 && f.push(`xshift=${uc(h.x * sc)}pt`), Math.abs(h.y) > 1e-9 && f.push(`yshift=${uc(h.y * sc)}pt`), a && f.push(`rotate=${uc(-a)}`);
	let g = f.filter((e) => e !== "").join(", ");
	return `\\node${g === "" ? "" : `[${g}]`} at (${t}) {${n}};`;
}
var Cc = "\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\\usetikzlibrary{arrows.meta}\n\\usepgfplotslibrary{fillbetween}";
function wc(e, t) {
	let { x: n, y: r } = e.axis;
	if (!(Math.abs(n.y) <= Ec && Math.abs(r.x) <= Ec && n.x > 0 && r.y < 0)) throw new o("A graph can be written in TikZ only if its x axis goes to the right and its y axis goes up");
	if (Math.max(e.width, e.height) * sc > Tc) throw new a(`A drawing of ${dc(e.width)} by ${dc(e.height)} is too large for TeX, which holds at most ${Tc}pt`);
	let i = hc(e), s = gc(e), c = (e) => R(e, 5), l = `(${c(s.x[0])},${c(s.y[0])}) rectangle (${c(s.x[1])},${c(s.y[1])})`, u = [], d = [], f = () => {
		d.length > 0 && (u.push("\\begin{scope}", `\\clip ${l};`, ...d, "\\end{scope}"), d = []);
	}, p = /* @__PURE__ */ new Set(), m = (e) => e.split("\n").filter((e) => !e.startsWith("\\definecolor") || (p.add(e), !1)).join("\n");
	for (let e of t.map(m).filter((e) => e !== "")) e.includes("\\begin{axis}") ? (f(), u.push(e)) : d.push(e);
	return f(), [
		`\\begin{tikzpicture}[x=${i.x}, y=${i.y}]`,
		...p,
		`\\path ${l};`,
		...u,
		"\\end{tikzpicture}"
	].join("\n");
}
var Tc = 16383, Ec = 1e-9, Dc = [
	"start",
	"end",
	"both",
	"none"
];
function Oc(e) {
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
function kc() {
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
var Ac = class {
	_context;
	constructor(e, t) {
		this._context = e, this._rootSVG = e.rootSVG, this._name = t, this._static = !1, this._isDraggable = !1, this._label = null, this._labelContent = t, this._element = this._rootSVG.group().attr("id", this._name), this._appearance = kc(), this._shape = this._element.path();
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
	_labelReference = null;
	get labelReference() {
		return this._labelReference;
	}
	_labelClearance = 0;
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
	referenceable = !1;
	referenceAnchorPoint() {
		return null;
	}
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
		return this._appearance = kc(), this._dasharray = null, this._markerStart = null, this._markerEnd = null, this._shape.attr("transform", null), this._label?.shape.remove(), this._label = null, this._labelContent = this._name, this._labelReference = null, this._isDraggable = !1, Object.keys(this._controls).length > 0 && (this._controls = {}, this._context.figureChanged?.(this._name)), this._element.css("display") === "none" && (this._element.show(), this._element.attr("style") === "" && this._element.attr("style", null)), this;
	}
	strokeable() {
		return [this._shape];
	}
	fillable() {
		return [this._shape];
	}
	fill(e) {
		if (e !== void 0) {
			let t = Oc(e);
			this._appearance.fill.color = t.color, this._appearance.fill.opacity = t.opacity;
		}
		return this.fillable().forEach((e) => {
			e.fill(this._appearance.fill);
		}), this;
	}
	stroke(e, t) {
		if (typeof e == "string" || typeof e == "object") {
			let n = Oc(e);
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
		let t = String(e ?? "6 4").trim();
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
		return Gs(i, this.labelFields(), this._name), this._label?.shape.remove(), this._labelContent = i, this._label = new nc(this._element, this._name, {
			text: Ks(i, this.labelFields(), { tex: n ?? !1 }),
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
		return mc(e, this.graphConfig);
	}
	_tikzUnits() {
		return hc(this.graphConfig);
	}
	_tikzView() {
		return gc(this.graphConfig);
	}
	_tikzAxis(e, t = {}) {
		return _c(this.graphConfig, e, t);
	}
	_tikzSamples(e) {
		return vc(e);
	}
	_tikzCurveStyle() {
		let e = this._tikzStyle();
		if (e.options.some((e) => e.startsWith("fill="))) throw new a(`The curve "${this._name}" has a fill, which has no equivalent in TikZ: use a fillbetween`);
		return e;
	}
	_tikzLength(e) {
		return dc(e);
	}
	_tikzRadius(e) {
		return yc(e, this.graphConfig);
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
		return bc(this._appearance, this._dasharray, {
			start: this._markerStart,
			end: this._markerEnd
		});
	}
	_tikzDraw(e) {
		let { definitions: t, options: n } = this._tikzStyle();
		return [...t, `\\draw[${n.join(", ")}] ${e};`].join("\n");
	}
	_tikzLabel(e) {
		return this._label ? Sc(this._label.config, e, this._tikzLabelText()) : "";
	}
	_tikzLabelText() {
		return xc(this.computeLabel(), this._label?.asHtml === !0);
	}
	_labelGap = 8;
	updateLabel() {
		return this._label && (this._label.setLabel(this.computeLabel()), this.moveLabel(), this._orientLabel()), this;
	}
	setLabelReference(e) {
		if (e !== null && !e.referenceable) throw new a(`The figure "${e.name}" cannot be the reference of a label: expected a point, a circle, an arc or a polygon`);
		return e === null && this._labelReference !== null && this._label?.setAway(null), this._labelReference = e, this.updateLabel(), this;
	}
	setLabelClearance(e) {
		return this._labelClearance = e, this._label?.setClearance(e), this;
	}
	_orientLabel() {
		let e = this._label;
		if (!e) return;
		e.setClearance(this._labelClearance);
		let t = this._labelReference?.referenceAnchorPoint();
		t != null && B(t) && B({
			x: e.x,
			y: e.y
		}) && e.setAway({
			x: e.x - t.x,
			y: e.y - t.y
		});
	}
	labelFields() {
		return {};
	}
	defaultLabelField() {
		return null;
	}
	_firstLabelField() {
		if (typeof this._labelContent == "string") return null;
		let e = this._labelContent.find((e) => typeof e != "string");
		return e === void 0 || typeof e == "string" ? null : e.field;
	}
	computeLabel() {
		return this._label ? Ks(this._labelContent, this.labelFields(), { tex: this._label.asHtml }) : this._name;
	}
	move(e) {
		let t = oc(typeof e == "number" ? {
			x: e,
			y: 0
		} : e, "move"), { x: n, y: r } = this.graphConfig.axis;
		return this._shape.translate(t.x * n.x + t.y * r.x, t.x * n.y + t.y * r.y), this;
	}
	scale(e) {
		let t = oc(typeof e == "number" ? {
			x: e,
			y: e
		} : e, "scale");
		return this._shape.scale(t.x, t.y), this;
	}
	mark(e = {}) {
		let { side: t = "both", size: n = 10, shape: r = "->" } = e;
		if (!Dc.includes(t)) throw new a(`Invalid marker position "${t}": expected 'start', 'end', 'both' or 'none'`);
		if (!Number.isFinite(n) || n <= 0) throw new a(`Invalid marker size ${n}: expected a number greater than 0`);
		if (!rc.includes(r)) throw new a(`Invalid marker shape "${r}": expected ${rc.map((e) => `'${e}'`).join(", ")}`);
		if (t === "none") return this._shape.attr({
			"marker-start": null,
			"marker-end": null
		}), this._markerStart = null, this._markerEnd = null, this;
		if (!("marker" in this._shape)) throw new a(`The figure "${this._name}" cannot have a marker: its shape is a ${this._shape.type}`);
		let i = this._shape, o = ac(this._rootSVG, this.name, n, r);
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
function jc(e, t, n, r) {
	let i = t.filter((t) => e[t] !== void 0);
	if (i.length !== 1) throw new a(`The ${r} "${n}" needs exactly one constraint (${t.join(", ")}), got ${i.length === 0 ? "none" : i.join(", ")}`);
	return i[0];
}
function Mc(e, t, n, r) {
	return jc(t, Object.keys(e), n, r);
}
function Nc(e, t, n, r) {
	let i = e[t];
	return i(n[t], r);
}
var Pc = (e) => typeof e == "object" && !!e && "x" in e && "y" in e && typeof e.x == "number" && typeof e.y == "number";
function W(e, t) {
	for (let [n, r] of Object.entries(e)) if (!Pc(r)) throw new a(`Invalid ${t}: "${n}" is not a position {x, y}`);
	return e;
}
function Fc(e, t) {
	return Object.values(W(Object.fromEntries(e.map((e, t) => [String(t), e])), t));
}
function Ic(e, t, n) {
	if (typeof e == "number") {
		if (!Number.isFinite(e) || e <= 0) throw new a(`Invalid radius ${e}: expected a finite number greater than 0`);
		return Math.abs(Za(e, n));
	}
	if (typeof e == "object" && "point1" in e) {
		let { point1: t, point2: n } = W(e, "radius");
		return V(t, n);
	}
	return V(t, W({ radius: e }, "radius").radius);
}
// src/figures/Line/Line.constraints.ts
var Lc = ({ point: e, direction: t }) => ({
	start: e,
	direction: t
});
function Rc(e, t, n) {
	let r = Za(e, n), i = Za({
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
function zc(e, t, n) {
	return Rc(H(e, n), {
		x: 1,
		y: t
	}, n);
}
function Bc(e) {
	let t = e;
	if (typeof t == "object" && t && t.math instanceof Ja) return t.math;
	throw new a(`Invalid line (${typeof t}): expected a line or an axis`);
}
function Vc(e, t, n, r, i) {
	if (Math.abs(e) <= Hc * Math.hypot(e, t)) return i.tex ? "\\infty" : "∞";
	let a = t / e, o = n && r === void 0 ? La(a) : null;
	return o === null ? Hs(a, r) : i.tex ? Ra(o) : za(o);
}
var Hc = 1e-9, Uc = 1e-4, Wc = {
	bisector: (e) => Lc("d1" in e ? fo(Bc(e.d1), Bc(e.d2), e.alternative) : uo(e.A, e.B, e.C)),
	director: ({ A: e, d: t }) => ({
		start: e,
		direction: t,
		end: {
			x: e.x + t.x,
			y: e.y + t.y
		}
	}),
	equation: (e, t) => {
		let { a: n, b: r, c: i } = Po(e);
		return Rc(Math.abs(r) >= Math.abs(n) ? {
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
	mediator: ({ A: e, B: t }) => Lc(lo(e, t)),
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
		return zc(e, t, n);
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
		let r = H(t, n).x;
		return zc(t, (e.numExp.evaluate({ x: r + Uc }) - e.numExp.evaluate({ x: r - Uc })) / (2 * Uc), n);
	}
};
function Gc(e, t) {
	return Mc(Wc, e, t, "line");
}
function Kc(e, t, n) {
	return Nc(Wc, e, t, n);
}
// src/figures/Axis/Axis.constraints.ts
var qc = {
	step: 1,
	labels: "numbers",
	digits: 2,
	size: 6,
	zero: !0
}, Jc = 1e3;
function Yc(e, t, n) {
	let r = (r) => new a(`Invalid ${t} ${JSON.stringify(e)} for the graduation of the axis "${n}": expected ${r}`);
	if (typeof e != "object" || !e) throw r("{every, first}");
	let { every: i, first: o } = e;
	if (i !== void 0 && !(typeof i == "number" && Number.isInteger(i) && i >= 1 && i <= 1e3)) throw r(`an integer from 1 to ${Jc} for every`);
	if (o !== void 0 && typeof o != "boolean") throw r("true or false for first");
}
function Xc(e) {
	return e.ticks === void 0 ? null : {
		...qc,
		...e.ticks
	};
}
function Zc(e, t) {
	let n = e.range, { min: r, max: i } = typeof n == "object" && n ? n : {};
	if (!(typeof r == "number" && typeof i == "number" && Number.isFinite(r) && Number.isFinite(i) && r < i)) throw new a(`Invalid range ${JSON.stringify(n)} for the axis "${t}": expected {min, max} with finite numbers and min < max`);
	let o = Gc(e, t);
	if (o !== "director" && o !== "through") throw new a(`The axis "${t}" is given by ${o}, which has no zero: a range is measured from the zero, so the axis is given by two points (through) or a point and a vector (director)`);
}
function Qc(e, t) {
	let n = e.padding;
	if (n !== void 0 && !(typeof n == "number" && Number.isFinite(n) && n >= 0)) throw new a(`Invalid padding ${JSON.stringify(n)} for the axis "${t}": expected a finite number of 0 or more`);
	e.range !== void 0 && Zc(e, t);
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
	o.marks !== void 0 && Yc(o.marks, "marks", t), o.numbers !== void 0 && o.numbers !== "none" && Yc(o.numbers, "numbers", t);
	let l = Gc(e, t);
	if (l !== "director" && l !== "through") throw new a(`The axis "${t}" is given by ${l}, which has no zero: a graduated axis is given by two points (through) or a point and a vector (director)`);
}
function $c(e) {
	return e === !0 ? {
		x: {},
		y: {}
	} : e === void 0 || e === !1 ? {
		x: !1,
		y: !1
	} : e;
}
function el(e, t, n) {
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
		...r.range === void 0 ? {} : { range: r.range },
		...a === void 0 ? {} : { ticks: a },
		...r.name === void 0 ? {} : { name: r.name }
	};
}
function tl(e, t, n) {
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
function nl(e, t, n, r, i) {
	let a = r.x * r.x + r.y * r.y, o = (e) => ((e.x - n.x) * r.x + (e.y - n.y) * r.y) / a, s = o(e), c = o(t), l = Math.max(Math.min(s, c), i.min), u = Math.min(Math.max(s, c), i.max);
	if (!(l < u)) return null;
	let d = (e) => ({
		x: n.x + e * r.x,
		y: n.y + e * r.y
	});
	return s <= c ? [d(l), d(u)] : [d(u), d(l)];
}
// src/figures/Line/Line.ts
var rl = [
	"segment",
	"ray",
	"line",
	"vector"
], il = 10;
function al(e, t) {
	let n = Gc(e, t), r = e.shape ?? "line";
	if (!rl.includes(r)) throw new a(`Invalid shape "${r}" for the line "${t}": expected ${rl.map((e) => `'${e}'`).join(", ")}`);
	if ((r === "segment" || r === "vector") && n !== "through" && n !== "director") throw new a(`The ${r} "${t}" is given by two points (through) or a point and a vector (director), not by ${n}`);
	return {
		...e,
		shape: r
	};
}
var ol = class extends Ac {
	constructor(e, t, n) {
		let r = al(n, t);
		super(e, t), this._config = r, this._start = z(), this._end = z();
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
		let t = al(e, this.name), n = Kc(Gc(t, this.name), t, this.graphConfig);
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
		return new Ja(this.start, this.end);
	}
	get normal() {
		let e = this.direction;
		return {
			x: e.y,
			y: -e.x
		};
	}
	labelFields() {
		let e = { slope: (e, t) => {
			let n = H(this._start, this.graphConfig), r = H(this._end, this.graphConfig);
			return Vc(r.x - n.x, r.y - n.y, this._slopeIsExact(), e, t);
		} };
		return this._config.shape === "segment" ? {
			...e,
			length: (e, t) => Us(V(H(this._start, this.graphConfig), H(this._end, this.graphConfig)), e, this.graphConfig.measure, t)
		} : e;
	}
	defaultLabelField() {
		return this._config.shape === "segment" ? "length" : null;
	}
	_slopeIsExact() {
		let { slope: e, through: t } = this._config;
		if (e !== void 0) return !0;
		let n = (e) => e.givenByNumbers === !0;
		return t !== void 0 && n(t.A) && n(t.B);
	}
	computed() {
		return this._place(Kc(Gc(this._config, this.name), this._config, this.graphConfig)), this;
	}
	_place({ start: e, direction: t, end: n }) {
		let r = this._config.shape;
		if (!(B(e) && B(t) && (n === void 0 || B(n))) || t.x === 0 && t.y === 0) return this._start = z(), this._end = z(), this._setDefined(!1), this;
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
			let { width: e, height: n } = this.graphConfig, o = so(i, t, e, n, 0, r === "ray"), s = o === null ? null : co(o[0], o[1], e, n);
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
			x: t.x - il * (t.x - e.x) / n,
			y: t.y - il * (t.y - e.y) / n
		};
	}
	moveLabel() {
		if (!this.label || !B(this._start) || !B(this._end)) return this;
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
}, sl = 4, cl = 36, ll = 10, ul = 4, dl = 6, fl = {
	l: "end",
	c: "middle",
	r: "start"
}, pl = {
	t: "auto",
	m: "central",
	b: "hanging"
}, ml = {
	t: "above",
	m: "",
	b: "below"
}, hl = {
	l: "left",
	c: "",
	r: "right"
}, gl = class e extends ol {
	constructor(e, t, n) {
		Qc(n, t), super(e, t, {
			...n,
			shape: "line"
		});
	}
	get config() {
		return this._config;
	}
	set config(e) {
		Qc(e, this.name), super.config = {
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
		let t = Gc(this._config, this.name);
		if (this._unit = (t === "director" || t === "through") && Number.isFinite(e.direction.x) && Number.isFinite(e.direction.y) ? {
			x: e.direction.x,
			y: e.direction.y
		} : null, Number.isNaN(this._start.x)) return this._graduate(e, !1);
		let n = tl(this._start, this._end, this.padding), r = this._config.range, i = n === null || r === void 0 || this._unit === null ? n : nl(n[0], n[1], e.start, this._unit, r);
		return i === null ? (this._start = z(), this._end = z(), this._setDefined(!1), this._graduate(e, !1)) : ([this._start, this._end] = i, this.shape.plot(this._start.x, this._start.y, this._end.x, this._end.y), this._graduate(e, !0));
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
					x: this._end.x + dl * (t.x - r.x),
					y: this._end.y + dl * (t.y - r.y)
				},
				alignement: Bs(t.x - r.x, t.y - r.y)
			});
		}
		return this._paint(), this;
	}
	_ticksOf(e, t, n) {
		let r = Xc(this._config);
		if (r === null) return [];
		let i = {
			x: this._end.x - ll * t.x,
			y: this._end.y - ll * t.y
		}, a = ds(e.start, e.direction, r.step, this._start, i, sl), o = Bs(n.x, n.y), s = r.size / 2, c = r.marks?.every ?? 1, l = ps(r.step * Math.hypot(e.direction.x, e.direction.y) * c, cl) * c, u = (e) => r.numbers === void 0 ? e % l === 0 || r.marks?.first === !0 && e === 1 : r.numbers !== "none" && fs(e, r.numbers);
		return a.filter((e) => (r.zero || e.index !== 0) && fs(e.index, r.marks)).map(({ index: e, value: t, point: i }) => ({
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
				...hs(t, r.labels, r.digits),
				at: {
					x: i.x + (s + ul) * n.x,
					y: i.y + (s + ul) * n.y
				},
				alignement: o
			} : null
		}));
	}
	_paint() {
		let e = (e) => `${U(e.x)},${U(e.y)}`, t = this._ticks, n = this._texts;
		this._marks?.plot(t.length === 0 ? "M 0 0" : t.map(({ from: t, to: n }) => `M${e(t)} L${e(n)}`).join(" ")), n?.clear();
		let r = (e, t, r) => {
			n?.text(e).attr({
				x: U(t.x),
				y: U(t.y),
				"text-anchor": fl[r[1]],
				"dominant-baseline": pl[r[0]]
			});
		};
		for (let e of t) e.label !== null && r(e.label.text, e.label.at, e.label.alignement);
		this._drawnName !== null && r(this._drawnName.text, this._drawnName.at, this._drawnName.alignement), this._styleMarkers();
	}
	static _tikzSide(e) {
		return [ml[e[0]], hl[e[1]]].filter((e) => e !== "").join(" ");
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
}, _l = {
	coordinates: ({ x: e, y: t }, n) => Za({
		x: bl(e),
		y: bl(t)
	}, n),
	direction: Cl,
	evaluation: ({ fx: e, x: t }) => e.evaluate(bl(t)),
	intersection: ({ A: e, B: t }) => Bc(e).intersection(Bc(t)) ?? z(),
	intersectionBetweenCircles: ({ A: e, B: t, index: n }) => e.intersectionWithCircle(t)?.[n] ?? z(),
	intersectionWithCircle: ({ A: e, B: t, index: n }) => e.intersectionWithLine(t)?.[n] ?? z(),
	middle: ({ A: e, B: t }) => ({
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	}),
	projection: xl,
	symmetry: Sl
};
function vl(e, t) {
	return Mc(_l, e, t, "point");
}
function yl(e, t, n) {
	return Nc(_l, e, t, n);
}
function bl(e) {
	if (typeof e == "number") return e;
	if ("point" in e && "axis" in e) return e.point.coordinates[e.axis];
	if ("point1" in e && "point2" in e) return V(e.point1.coordinates, e.point2.coordinates);
	throw new a(`Invalid coordinate ${JSON.stringify(e)}: expected a number, {point, axis} or {point1, point2}`);
}
function xl({ point: e, axis: t }) {
	let { x: n, y: r } = t.start, i = t.direction, a = e.x - n, o = e.y - r, s = a * i.x + o * i.y, c = i.x * i.x + i.y * i.y;
	return {
		x: n + s * i.x / c,
		y: r + s * i.y / c
	};
}
function Sl({ A: e, B: t }) {
	if (t instanceof ol) {
		let n = new qa(t.direction).normal, r = new qa(e, t.start).projection(n);
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
function Cl({ point: e, direction: t, distance: n, perpendicular: r }, i) {
	if (t instanceof ol) {
		let a = new qa(r ? t.normal : t.direction).unit, o = t instanceof gl ? t.unit : null, s = o === null ? Za(n, i) : n * Math.hypot(o.x, o.y);
		return {
			x: e.x + s * a.x,
			y: e.y + s * a.y
		};
	}
	let a = new qa(t.A, t.B);
	return {
		x: e.x + n * a.x,
		y: e.y + n * a.y
	};
}
// src/figures/Point/Point.ts
var wl = {
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
function Tl(e, t) {
	if (!Number.isFinite(e) || e <= 0) throw new a(`Invalid size ${e} for the point "${t}": expected a finite number greater than 0`);
	return e;
}
function El({ shape: e = "circle", size: t }, n) {
	if (!Object.hasOwn(wl, e)) throw new a(`Invalid shape "${e}" for the point "${n}": expected ${Object.keys(wl).map((e) => `'${e}'`).join(", ")}`);
	return {
		shape: e,
		size: Tl(t ?? wl[e].size, n)
	};
}
var Dl = 1e-6, G = class extends Ac {
	constructor(e, t, n) {
		vl(n, t);
		let r = El(n, t);
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
		vl(e, this.name);
		let t = this._config;
		this._config = {
			...e,
			...El(e, this.name)
		};
		try {
			this.computed();
		} catch (e) {
			throw this._config = t, e;
		}
		this._makeShape(), this.updateLabel();
	}
	get givenByNumbers() {
		let e = this._config.coordinates;
		return e !== void 0 && typeof e.x == "number" && typeof e.y == "number";
	}
	_pixels;
	get pixels() {
		return this._pixels;
	}
	set pixels(e) {
		this._pixels = Object.freeze({
			x: e.x,
			y: e.y
		}), this._setDefined(B(e)), this._centerShape(this.shape);
	}
	get coordinates() {
		return H(this._pixels, this.graphConfig);
	}
	get size() {
		return this._config.size;
	}
	set size(e) {
		this._config.size = Tl(e, this.name), this._makeShape();
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
		return Object.assign(this._config, El({
			shape: e,
			size: t
		}, this.name)), this._makeShape(), this;
	}
	labelFields() {
		return { coordinates: (e) => {
			let { x: t, y: n } = this.coordinates;
			return `(${Hs(t, e)};${Hs(n, e)})`;
		} };
	}
	defaultLabelField() {
		return "coordinates";
	}
	referenceable = !0;
	referenceAnchorPoint() {
		return B(this._pixels) ? {
			x: this._pixels.x,
			y: this._pixels.y
		} : null;
	}
	isMoved() {
		let e = yl(vl(this._config, this.name), this._config, this.graphConfig);
		return !B(e) || !B(this._pixels) ? !1 : Math.hypot(e.x - this._pixels.x, e.y - this._pixels.y) > Dl;
	}
	computed() {
		return this.pixels = yl(vl(this._config, this.name), this._config, this.graphConfig), this;
	}
	tikz() {
		let e = this._tikzShown();
		if (!e.shape && !e.label) return "";
		let t = this._tikzCoordinates(this._pixels), n = this._tikzLength(this.size / 2);
		return [e.shape ? this._tikzDraw(wl[this._config.shape].tikz(t, n)) : "", e.label ? this._tikzLabel(t) : ""].filter((e) => e !== "").join("\n");
	}
	moveLabel() {
		return this.label && this.label.move(this.x, this.y), this;
	}
	_makeShape() {
		this.clear();
		let { shape: e, size: t } = this._config;
		return this.shape = this._centerShape(wl[e].draw(this.element, t)), this.fill().stroke(), this.shape;
	}
	_centerShape(e) {
		return B(this._pixels) && e.center(this._pixels.x, this._pixels.y), e;
	}
};
// src/animate/animation.ts
function Ol(e) {
	return e.controls.animate ?? null;
}
function kl(e, t) {
	t !== null && Al(e, t), e.setControl("animate", t);
}
function Al(n, r) {
	let i = n.name;
	if (!(n instanceof G)) throw new a(`The figure "${i}" cannot be animated`);
	if (!Number.isFinite(r.duration) || r.duration <= 0) throw new a(`Invalid duration ${r.duration} for the animation of "${i}": expected a number greater than 0`);
	if (!Number.isFinite(r.delay) || r.delay < 0) throw new a(`Invalid delay ${r.delay} for the animation of "${i}": expected a number of 0 or more`);
	if (!Object.hasOwn(t, r.easing)) throw new a(`Invalid easing ${r.easing} for the animation of "${i}": expected ${Object.keys(t).join(", ")}`);
	if (!Object.values(e).includes(r.loop)) throw new a(`Invalid loop ${r.loop} for the animation of "${i}": expected ${Object.values(e).join(", ")}`);
	if (!(r.from instanceof G) || !(r.to instanceof G)) throw new a(`The animation of the point "${i}" needs a start and an end point (from, to)`);
}
// src/slides/slideSet.ts
function jl(e, t) {
	if (e.length === 0) throw new a(`Invalid slides for "${t}": expected at least one run of steps, like [{from: 2}]`);
	for (let { from: n, to: r } of e) {
		let e = r ?? n;
		if (!Number.isInteger(n) || n < 1 || !Number.isInteger(e) || e < n) throw new a(`Invalid slides for "${t}": the run from ${n} to ${r ?? "the end"} needs integers from 1, the end not below the start`);
	}
}
function Ml(e, t) {
	return e.some(({ from: e, to: n }) => t >= e && (n === void 0 || t <= n));
}
function Nl(e) {
	return e.reduce((e, { from: t, to: n }) => Math.max(e, n ?? t), 0);
}
function Pl(e) {
	return Object.freeze(e.map((e) => Object.freeze({ ...e })));
}
function Fl(e) {
	return e.controls.slide ?? null;
}
function Il(e, t) {
	t !== null && jl(t, e.name), e.setControl("slide", t === null ? null : Pl(t));
}
// src/figures/Curve/Curve.constraints.ts
function Ll(e, t) {
	let n = e;
	return typeof n == "object" && !!n && typeof n.min == "number" && typeof n.max == "number" && !Number.isNaN(n.min) && !Number.isNaN(n.max) && n.min <= n.max && (t || Number.isFinite(n.min) && Number.isFinite(n.max));
}
var Rl = (e) => typeof e == "number" && Number.isFinite(e) && e > 0, zl = {
	domain: {
		valid: (e) => Ll(e, !1),
		expected: "{min, max} with finite numbers and min <= max"
	},
	samples: {
		valid: Rl,
		expected: "a finite number greater than 0"
	},
	tolerance: {
		valid: Rl,
		expected: "a finite number greater than 0"
	},
	maxDepth: {
		valid: (e) => Number.isInteger(e) && e >= 0,
		expected: "an integer of 0 or more"
	},
	asymptoteThreshold: {
		valid: Rl,
		expected: "a finite number greater than 0"
	}
}, Bl = {
	valid: (e) => Ll(e, !0),
	expected: "{min, max} with min <= max"
};
function Vl(e, t, n = {}) {
	let r = {
		...zl,
		...n
	}, i = e;
	for (let [e, n] of Object.entries(r)) {
		let r = i[e];
		if (r !== void 0 && !n.valid(r)) throw new a(`Invalid ${e} ${JSON.stringify(r)} for the curve "${t}": expected ${n.expected}`);
	}
}
function Hl(e, t) {
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
function Ul(e, t, n) {
	let r = new _o(e);
	try {
		r.evaluate({ [t]: 0 });
	} catch (r) {
		throw r instanceof a ? new a(`The function "${e}" ${n} can only use the variable ${t}: ${r.message}`, { cause: r }) : r;
	}
	return r;
}
// src/figures/Plot/Plot.constraints.ts
var Wl = {
	expression: (e) => e,
	quadratic: (e, t) => {
		let { A: n, B: r, C: i } = W(e, "points of the parabola");
		try {
			return Fo(H(n, t), H(r, t), H(i, t));
		} catch (e) {
			if (e instanceof s) return null;
			throw e;
		}
	}
};
function Gl(e, t) {
	return Mc(Wl, e, t, "plot");
}
function Kl(e, t, n) {
	return Nc(Wl, e, t, n);
}
function ql(e, t, n) {
	let r = Gl(e, t);
	Vl(e, t, { image: Bl });
	let i = Kl(r, e, n);
	return i === null ? null : {
		expression: i,
		numExp: Ul(i, "x", `of the plot "${t}"`)
	};
}
// src/figures/Plot/Plot.ts
var Jl = "0/0", Yl = class extends Ac {
	_labelGap = 6;
	constructor(e, t, n) {
		let r = ql(n, t, e.config);
		super(e, t), this._config = { ...n }, this._fx = r?.expression ?? "", this._numExp = r?.numExp ?? new _o(Jl), this._labelAnchor = null, this._range = null, this._makeShape(), this._draw(r !== null);
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
		let t = ql(e, this.name, this.graphConfig);
		this._config = { ...e }, this._fx = t?.expression ?? "", this._numExp = t?.numExp ?? new _o(Jl), this._draw(t !== null), this.updateLabel();
	}
	computed() {
		let e = Kl(Gl(this._config, this.name), this._config, this.graphConfig);
		return e !== this._fx && (this._fx = e ?? "", this._numExp = e === null ? new _o(Jl) : new _o(e)), this._draw(e !== null);
	}
	valueAt(e) {
		return this._numExp.evaluate({ x: e });
	}
	evaluate(e) {
		return Za({
			x: e,
			y: this.valueAt(e)
		}, this.graphConfig);
	}
	followable = !0;
	follow(e, t) {
		return this.evaluate(H({
			x: e,
			y: t
		}, this.graphConfig).x);
	}
	_draw(e) {
		let t = this.shape;
		if (this._setDefined(e), this._labelAnchor = null, this._range = null, !e) return t.plot(Ko([], 0)), this;
		let n = this.graphConfig, { origin: r, width: i, height: a } = n, o = n.axis.x.x, s = n.axis.y.y, c = {
			min: -r.x / o - 1,
			max: (i - r.x) / o + 1
		}, l = Math.max(this._config.domain?.min ?? c.min, c.min), u = Math.min(this._config.domain?.max ?? c.max, c.max), d = this._config.image ?? {
			min: -Infinity,
			max: Infinity
		}, f = a * (this._config.asymptoteThreshold ?? 10), p = { x: 0 };
		if (l > u) return t.plot(Ko([], 0)), this;
		let m = (e) => {
			p.x = e;
			let t = this._numExp.evaluate(p);
			return Number.isNaN(t) || t < d.min || t > d.max ? z() : {
				x: r.x + e * o,
				y: r.y + t * s
			};
		}, h = {
			left: 0,
			right: i,
			top: 0,
			bottom: a
		}, g = (u - l) * (this._config.samples ?? Math.abs(o) / 8), _ = Ho(m, l, u, {
			intervals: g,
			tolerance: this._config.tolerance ?? .5,
			maxDepth: this._config.maxDepth ?? 6,
			view: h,
			bound: f
		});
		return t.plot(Ko(_, f)), this._range = {
			from: l,
			to: u,
			intervals: g
		}, this._labelAnchor = Uo(_, i, a), this;
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
		let s = (e) => R(e, 5), c = [
			`domain=${s(this._range.from)}:${s(this._range.to)}`,
			`samples=${this._tikzSamples(this._range.intervals)}`,
			...t
		];
		return [...e, ...this._tikzAxis([`\\addplot[${c.join(", ")}] {${this._numExp.toPgf()}};`], { y: [a, o] })].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, Xl = {
	radius: ({ center: e, radius: t }, n) => {
		let r = W({ center: e }, "circle").center;
		return {
			center: r,
			radius: Ic(t, r, n)
		};
	},
	through: ({ through: e }) => {
		let { A: t, B: n, C: r } = W(e, "points of the circle");
		return to(t, n, r);
	},
	tangent: ({ tangent: e }) => {
		let { center: t } = W({ center: e.center }, "circle"), { to: n } = e;
		if (!(n instanceof ol)) throw new a("Invalid tangent: \"to\" is neither a line nor an axis");
		return io(t, n.start, n.end);
	},
	diameter: ({ diameter: e }) => {
		let { A: t, B: n } = W(e, "diameter");
		return ro(t, n);
	},
	inscribed: ({ inscribed: e }) => {
		let { A: t, B: n, C: r } = W(e, "triangle");
		return no(t, n, r);
	}
};
function Zl(e, t) {
	let n = Mc(Xl, e, t, "circle");
	if (n !== "radius" && e.center !== void 0) throw new a(`The circle "${t}" has a center, which goes with a radius, and a ${n}`);
	if (n === "radius" && e.center === void 0) throw new a(`The circle "${t}" has a radius and needs a center`);
	return n;
}
function Ql(e, t, n) {
	let r = Xl[e];
	return r(t, n);
}
// src/figures/Circle/Circle.ts
var $l = class extends Ac {
	followable = !0;
	constructor(e, t, n) {
		Ql(Zl(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = z(), this._radius = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = Ql(Zl(e, this.name), e, this.graphConfig);
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
		return this._place(Ql(Zl(this._config, this.name), this._config, this.graphConfig));
	}
	tikz() {
		let e = this._tikzShown();
		return !e.shape && !e.label ? "" : [e.shape ? this._tikzDraw(`(${this._tikzCoordinates(this._center)}) circle[${this._tikzRadius(this._radius)}]`) : "", e.label ? this._tikzLabel(this._tikzCoordinates(this._labelPoint())) : ""].filter((e) => e !== "").join("\n");
	}
	moveLabel() {
		if (this.label && Number.isFinite(this._radius)) {
			let { x: e, y: t } = this._labelPoint();
			this.label.alignementGiven || (this.label.config.alignement = "mc"), this.label.move(e, t);
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
		return ho(this._center, this._radius, e.start, e.end);
	}
	intersectionWithCircle(e) {
		return go(this._center, this._radius, e.center, e.radius);
	}
	_place({ center: e, radius: t }) {
		if (!B(e) || !Number.isFinite(t) || t <= 0) return this._center = z(), this._radius = NaN, this._setDefined(!1), this;
		this._center = {
			x: e.x,
			y: e.y
		}, this._radius = t, this._setDefined(!0);
		let n = this.shape;
		return n.radius(t), n.center(e.x, e.y), this;
	}
	labelFields() {
		let e = () => Math.abs(H(this._radius, this.graphConfig)), t = () => this.graphConfig.measure;
		return {
			radius: (n, r) => Us(e(), n, t(), r),
			perimeter: (n, r) => Us(ao(e()), n, t(), r),
			area: (n, r) => Us(oo(e()), n, t(), r, 2)
		};
	}
	referenceable = !0;
	referenceAnchorPoint() {
		return Number.isFinite(this._radius) ? {
			x: this._center.x,
			y: this._center.y
		} : null;
	}
	_labelPoint() {
		return {
			x: this._center.x,
			y: this._center.y
		};
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.circle(0), this.fill().stroke(), this.shape;
	}
}, eu = {
	x: 1,
	y: 1
};
function tu(e) {
	return e.step === void 0 ? { ...eu } : {
		x: e.step.x,
		y: e.step.y
	};
}
function nu(e, t) {
	let n = e.step, r = (e) => typeof e == "number" && Number.isFinite(e) && e > 0;
	if (n !== void 0 && (typeof n != "object" || !r(n.x) || !r(n.y))) throw new a(`Invalid step ${JSON.stringify(e.step)} for the grid "${t}": expected {x, y}, two finite numbers greater than 0`);
	let i = (e) => typeof e == "object" && !!e && Number.isFinite(e.min) && Number.isFinite(e.max) && e.min < e.max;
	if (e.x === void 0 != (e.y === void 0)) throw new a(`The grid "${t}" needs both x and y to be a part of the drawing, or none for all of it`);
	for (let [n, r] of [["x", e.x], ["y", e.y]]) if (r !== void 0 && !i(r)) throw new a(`Invalid ${n} ${JSON.stringify(r)} for the grid "${t}": expected {min, max}, two finite numbers with the minimum lower than the maximum`);
	let o = e.subdivisions;
	if (o !== void 0 && !(typeof o == "number" && Number.isInteger(o) && o >= 2 && o <= 20)) throw new a(`Invalid subdivisions ${JSON.stringify(o)} for the grid "${t}": expected an integer from 2 to 20`);
}
// src/figures/Grid/Grid.ts
var ru = 3, iu = .5;
function au(e) {
	let t = (e) => `${U(e.x)},${U(e.y)}`;
	return e.length === 0 ? "M 0 0" : e.map(([e, n]) => `M${t(e)} L${t(n)}`).join(" ");
}
var ou = class extends Ac {
	constructor(e, t, n = {}) {
		nu(n, t), super(e, t), this.static = !0, this.appearance.stroke.color = "lightgray", this._config = { ...n }, this._lines = [], this._subLines = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		nu(e, this.name), this._config = { ...e }, this.computed();
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
		].map((e) => H(e, this.graphConfig)), r = n.map((e) => e.x), i = n.map((e) => e.y);
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
		let { origin: n, width: r, height: i, axis: a } = this.graphConfig, o = tu(this._config), { x: s, y: c } = this._config;
		return s !== void 0 && c !== void 0 ? bs({
			x: s,
			y: c
		}, this._view(), o, (e) => Za(e, this.graphConfig), ru, e) : [..._s(n, a.x, {
			x: a.y.x * o.y / e,
			y: a.y.y * o.y / e
		}, r, i, ru, t), ..._s(n, a.y, {
			x: a.x.x * o.x / e,
			y: a.x.y * o.x / e
		}, r, i, ru, t)];
	}
	computed() {
		let e = this._config.subdivisions ?? 0;
		return this._lines = this._family(1, 0), this._subLines = e === 0 ? [] : this._family(e, e), this._setDefined(this._lines.length > 0 || this._subLines.length > 0), this.shape.plot(au(this._lines)), this._sub?.plot(au(this._subLines)), this;
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
		return [t === "" ? "" : `\\begin{scope}[opacity=${iu}]\n${t}\n\\end{scope}`, e(this._lines, 1)].filter((e) => e !== "").join("\n");
	}
	_tikzGridPath(e) {
		let { axis: t } = this.graphConfig, n = tu(this._config), r = Math.abs(t.x.y) <= 1e-9 && Math.abs(t.y.x) <= 1e-9, i = Math.hypot(t.x.x, t.x.y) * n.x / e >= ru && Math.hypot(t.y.x, t.y.y) * n.y / e >= ru;
		if (!r || !i) return null;
		let { x: a, y: o } = this._config, s = a !== void 0 && o !== void 0, c = s ? {
			x: [a.min, a.max],
			y: [o.min, o.max]
		} : this._tikzView(), l = (e) => R(e, 5), u = `(${l(c.x[0])},${l(c.y[0])})`, d = `(${l(c.x[1])},${l(c.y[1])})`;
		return `${u} grid[xstep=${l(n.x / e)}, ystep=${l(n.y / e)}] ${d}${s && e === 1 ? ` ${u} rectangle ${d}` : ""}`;
	}
	_makeShape() {
		return this.clear(), this._sub = this.element.group().opacity(iu).path("M 0 0"), this.shape = this.element.path("M 0 0"), this.stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Arc/Arc.constraints.ts
function su(e, t) {
	if (!Number.isFinite(e)) throw new a(`Invalid ${t} ${e}: expected a finite number`);
	return e;
}
function cu(e, t, n, r) {
	return e === void 0 ? V(t, n) : Ic(e, t, r);
}
var lu = {
	points: ({ start: e, center: t, end: n, radius: r }, i) => {
		let a = W({
			start: e,
			center: t,
			end: n
		}, "arc");
		return {
			...a,
			radius: cu(r, a.center, a.start, i)
		};
	},
	angles: ({ center: e, radius: t, from: n, to: r }, i) => {
		let a = W({ center: e }, "arc").center, o = Ic(t, a, i), s = (e) => Ya(a.x, a.y, o, su(e, "angle"));
		return {
			center: a,
			start: s(n),
			end: s(r),
			radius: o
		};
	},
	rotation: ({ start: e, center: t, angle: n, radius: r }, i) => {
		let a = W({
			start: e,
			center: t
		}, "arc"), o = su(n, "angle"), s = V(a.center, a.start), c = Ya(a.center.x, a.center.y, s, Xa(a.center, a.start) + o), l = cu(r, a.center, a.start, i);
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
function uu(e, t) {
	return Mc(lu, e, t, "arc");
}
function du(e, t, n) {
	return Nc(lu, e, t, n);
}
// src/figures/Arc/Arc.ts
var fu = 1e-6, pu = class extends Ac {
	constructor(e, t, n) {
		du(uu(n, t), n, e.config), super(e, t), this._config = { ...n }, this._center = z(), this._start = z(), this._end = z(), this._radius = NaN, this._from = NaN, this._sweep = NaN, this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = du(uu(e, this.name), e, this.graphConfig);
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
		return Math.abs(this._sweep - 90) < fu;
	}
	labelFields() {
		let e = () => Math.abs(H(this._radius, this.graphConfig)), t = () => this.graphConfig.measure;
		return {
			angle: (e, t) => Ws(this._sweep, e, t),
			length: (n, r) => Us(os(e(), this._sweep), n, t(), r),
			radius: (n, r) => Us(e(), n, t(), r),
			area: (n, r) => Us(ss(e(), this._sweep), n, t(), r, 2)
		};
	}
	defaultLabelField() {
		return "angle";
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
		return this._place(du(uu(this._config, this.name), this._config, this.graphConfig));
	}
	_place({ center: e, start: t, end: n, radius: r }) {
		let i = B(e) && B(t) && B(n) && Number.isFinite(r) && r > 0 && V(e, t) > 0 && V(e, n) > 0 ? Xa(e, t) : NaN, a = Number.isNaN(i) ? 0 : is(i, Xa(e, n));
		return a === 0 ? (this._center = z(), this._start = z(), this._end = z(), this._radius = NaN, this._from = NaN, this._sweep = NaN, this._setDefined(!1), this) : (this._center = {
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
		return as(this._center, this._radius, this._from, this._sweep, this._config.alternative === !0, {
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
		return Ya(this._center.x, this._center.y, t, e);
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
		let e = this._directionAt(.5);
		if (this._firstLabelField() === "area") return {
			point: this._pointAt(e, this._radius / 2),
			alignement: "mc",
			away: null
		};
		let t = this._drawnAsSquare() ? this._radius * Math.SQRT1_2 : this._radius, n = this._pointAt(e, t + this._labelGap), r = {
			x: Math.cos(e * Math.PI / 180),
			y: -Math.sin(e * Math.PI / 180)
		};
		return {
			point: n,
			alignement: Bs(r.x, r.y),
			away: r
		};
	}
	referenceable = !0;
	referenceAnchorPoint() {
		return Number.isNaN(this._sweep) ? null : {
			x: this._center.x,
			y: this._center.y
		};
	}
	moveLabel() {
		if (!this.label || Number.isNaN(this._sweep)) return this;
		let { point: e, alignement: t, away: n } = this._labelPlace();
		return this.label.alignementGiven || (this.label.config.alignement = t, this.label.config.away = n), this.label.move(e.x, e.y), this;
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
		let i = `start angle=${R(this._from, 5)}, end angle=${R(this._directionAt(1), 5)}`, a = `${e(r)} arc[${i}, ${this._tikzRadius(this._radius)}]`;
		return this._config.sector ? `${t} -- ${a} -- cycle` : a;
	}
};
// src/figures/Bezier/Bezier.constraints.ts
function mu(e) {
	if (e !== void 0 && e !== "horizontal" && e !== "vertical" && !(typeof e == "number" && Number.isFinite(e))) throw new a(`Invalid direction ${JSON.stringify(e)}: expected 'horizontal', 'vertical' or an angle in degrees`);
}
function hu(e) {
	if (e !== void 0 && !(typeof e == "number" && Number.isFinite(e) && e > 0)) throw new a(`Invalid ratio ${JSON.stringify(e)}: expected a finite number greater than 0`);
}
var gu = {
	through: (e, t) => {
		let n = t ? 3 : 2;
		if (!Array.isArray(e) || e.length < n) throw new a(`A ${t ? "closed " : ""}curve needs at least ${n} points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let r = e.map((e, t) => {
			let { point: n } = W({ point: e?.point }, `point ${t} of the curve`);
			return mu(e.direction), hu(e.ratio), {
				point: {
					x: n.x,
					y: n.y
				},
				direction: e.direction,
				ratio: e.ratio
			};
		});
		return r.every((e) => B(e.point)) ? Jo(r, t) : null;
	},
	controls: (e) => {
		if (!Array.isArray(e) || e.length !== 3 && e.length !== 4) throw new a(`A curve of control points has 3 or 4 points, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = Fc(e, "control point of the curve");
		return t.every(B) ? Yo(t.map((e) => ({
			x: e.x,
			y: e.y
		}))) : null;
	}
};
function _u(e, t) {
	return Mc(gu, e, t, "curve");
}
function vu(e, t, n) {
	if (t.closed === !0 && e !== "through") throw new a(`The curve "${n}" has control points and cannot be closed: only a curve through points can`);
	return Nc(gu, e, t, t.closed === !0);
}
// src/figures/Bezier/Bezier.ts
var yu = class e extends Ac {
	constructor(t, n, r) {
		vu(_u(r, n), r, n), super(t, n), this._config = e._copy(r), this._segments = null, this._makeShape(), this.computed();
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
		let n = vu(_u(t, this.name), t, this.name);
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
		return this._place(vu(_u(this._config, this.name), this._config, this.name));
	}
	_place(e) {
		return this._segments = e, this._setDefined(e !== null), this.shape.plot(e === null ? "M 0 0" : Xo(e, this._config.closed === !0)), this;
	}
	followable = !0;
	follow(e, t) {
		return Wo(this._segments === null ? [] : es(this._segments), {
			x: e,
			y: t
		});
	}
	_labelPlace() {
		let e = this._segments === null ? null : ns(this._segments);
		return e === null ? null : Vs(e.point, e.direction, this._labelGap);
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
}, K = /* @__PURE__ */ function(e) {
	return e.POINT = "pt", e.MIDDLE = "mid", e.PROJECTION = "proj", e.INTERSECTION = "inter", e.SYMMETRY = "sym", e.DIRECTION_POINT = "dpt", e.VECTOR_POINT = "vpt", e.EVAL_FX = "eval", e.LINE = "line", e.VECTOR = "vec", e.SEGMENT = "seg", e.RAY = "ray", e.PERPENDICULAR = "perp", e.PARALLEL = "para", e.MEDIATOR = "med", e.TANGENT = "tan", e.BISECTOR = "bis", e.CIRCLE = "circ", e.ARC = "arc", e.PLOT = "plot", e.PARAMETRIC = "parametric", e.BEZIER = "bezier", e.POLYGON = "poly", e.GRID = "grid", e.AXIS = "axis", e.FOLLOW = "follow", e.FILL_BETWEEN = "fill", e.RIEMANN = "riemann", e.PATH = "path", e;
}({}), bu = [
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
], q = (e) => e instanceof G, xu = (e) => e instanceof ol, Su = (e) => e === "*";
function Cu(e, t) {
	return e.map((e) => typeof e == "string" && Object.hasOwn(t, e) ? t[e] : e);
}
function wu(e, t) {
	if (typeof e != "string") return null;
	let n = e.split(":");
	if (n.length !== 2) return null;
	let [r, i] = n.map((e) => Object.hasOwn(t, e) ? t[e] : void 0);
	return r instanceof G && i instanceof G ? [r, i] : null;
}
function Tu(e, t) {
	if (typeof e == "number" || q(e)) return e;
	let n = wu(e, t);
	return n === null ? null : {
		point1: n[0],
		point2: n[1]
	};
}
function J(e) {
	return e instanceof Object && "name" in e && typeof e.name == "string" ? `the figure "${e.name}"` : e === void 0 ? "nothing" : JSON.stringify(e);
}
function Y(e, t, n, r) {
	return new i(e, `Invalid value ${J(n)} for the option "${e}" of "${t.name}": expected ${r}`);
}
function X(e, t, n) {
	throw new r(`Cannot build "${e.name}" (${e.key}): expected ${t}, got ${n}`);
}
function Z(e, t, n, r, i) {
	(t.length < n || t.length > r) && X(e, i, `${t.length} value${t.length === 1 ? "" : "s"}`);
}
// src/figures/Arc/Arc.parser.ts
var Eu = "arc", Du = "three points (start, center, end) and a radius, a center with a radius and two angles, or a center, a point and an angle and a radius (the radius is always optional but with the two angles), all with a last * for the other arc";
function Ou(e, t) {
	if (e.key !== K.ARC.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an arc`);
	let n = Cu(e.values, t), i = Su(n.at(-1)), a = ku(i ? n.slice(0, -1) : n, t) ?? X(e, Du, n.length === 0 ? "no value" : n.map(J).join(", "));
	return {
		create: Eu,
		config: i ? {
			...a,
			alternative: i
		} : a
	};
}
function ku(e, t) {
	let [n, r, i, a] = e;
	if (!q(n) || e.length < 3 || e.length > 4) return null;
	if (q(r) && q(i)) {
		let e = a === void 0 ? void 0 : Tu(a, t);
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
	if (q(r) && typeof i == "number") {
		let e = a === void 0 ? void 0 : Tu(a, t);
		return e === null ? null : { rotation: {
			center: n,
			start: r,
			angle: i,
			...e === void 0 ? {} : { radius: e }
		} };
	}
	return null;
}
var Au = {
	sector: (e) => e.asSector(),
	square: (e) => e.asSquare()
};
Object.keys(Au);
function ju(e, t, n) {
	if (!(e instanceof pu)) throw new i(t, `The option "${t}" shapes an arc, and "${e.name}" is not an arc`);
	if (n !== !0) throw new i(t, `Invalid value ${J(n)} for the option "${t}" of "${e.name}": it takes no value`);
	Au[t](e);
}
var Mu = {
	sector: (e, { value: t }) => {
		ju(e, "sector", t);
	},
	square: (e, { value: t }) => {
		ju(e, "square", t);
	}
}, Nu = { [K.ARC]: {
	name: "arc",
	description: "Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last * for the other arc)",
	forms: [
		"a=arc <point>,<point>,<point>[,<radius>][,*]",
		"a=arc <point>,<number>,<number>,<number>[,*]",
		"a=arc <point>,<point>,<number>[,<radius>][,*]"
	],
	summary: "a=arc B,A,C — arc",
	labelFields: [
		"angle",
		"length",
		"radius",
		"area"
	],
	build: Ou
} }, Pu = /^(\d*\.?\d*)pi$/, Fu = /^(\d*\.?\d*)pi(?:\/(\d+))?$/, Iu = 2;
function Lu(e, t) {
	throw new r(`Cannot read the parameter ${e}: expected ${t}`);
}
function Ru({ value: e, options: t }, n) {
	let r = `"${n}=${[e, ...t].map((e) => J(e)).join("/")}"`;
	if (e === !0) return t.length === 0 ? null : Lu(r, `no option after ${n}`);
	if (typeof e == "number") return (t.length > 0 || !(Number.isFinite(e) && e > 0)) && Lu(r, `a step greater than 0 (${n}=0.5)`), {
		step: e,
		pi: !1
	};
	let i = typeof e == "string" ? Pu.exec(e) : null;
	if (i === null) return Lu(r, `a step (${n}=0.5, ${n}=pi, ${n}=2pi/3), got ${J(e)}`);
	let a = i[1] === "" ? 1 : +i[1], o = t.length === 0 ? Iu : t[0];
	return (t.length > 1 || typeof o != "number" || !Number.isInteger(o) || o <= 0 || !(a > 0)) && Lu(r, `a multiple of pi over an integer greater than 0 (${n}=pi/3)`), {
		step: a * Math.PI / o,
		pi: !0
	};
}
function zu(e) {
	if (typeof e == "number") return Number.isFinite(e) && e > 0 ? {
		step: e,
		pi: !1
	} : null;
	let t = typeof e == "string" ? Fu.exec(e) : null;
	if (t === null) return null;
	let n = t[1] === "" ? 1 : +t[1], r = t.at(2) === void 0 ? Iu : +t[2];
	return n > 0 && r > 0 ? {
		step: n * Math.PI / r,
		pi: !0
	} : null;
}
var Q = (e) => e !== void 0 && e.value !== !1;
// src/parser/parser.interval.ts
function Bu(e, t) {
	try {
		let t = new _o(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof r || e instanceof a)) throw e;
	}
	throw new r(`Cannot read the parameter "${t}": ${JSON.stringify(e)} is not a number, or an expression of numbers like 2pi`);
}
function Vu(e) {
	return Ha(e) && !("step" in e) || typeof e == "string" && e.includes(":");
}
function Hu(e, t) {
	let n, i;
	if (Ha(e) && !("step" in e)) ({min: n, max: i} = e);
	else if (typeof e == "number" || typeof e == "string" && !e.includes(":")) i = typeof e == "number" ? e : Bu(e, t), n = -i;
	else if (typeof e == "string") {
		let [a, o, ...s] = e.split(":");
		if (s.length > 0 || a.trim() === "" || o.trim() === "") throw new r(`Cannot read the parameter "${t}=${e}": expected min:max, or one number for -n:n`);
		n = Bu(a, t), i = Bu(o, t);
	} else throw new r(`Cannot read the parameter "${t}=${J(e)}": expected min:max, or one number for -n:n`);
	if (!(Number.isFinite(n) && Number.isFinite(i) && n < i)) throw new r(`Invalid interval ${J(e)} for the parameter "${t}": expected a minimum lower than the maximum`);
	return {
		min: n,
		max: i
	};
}
// src/figures/Axis/Axis.parser.ts
function Uu(e, t) {
	let { value: n, options: i } = e;
	if (typeof n != "string" && typeof n != "number" || i.length > 0 || String(n).trim() === "") throw new r(`Cannot read the parameter "${t}=${J(n)}": expected a name (${t}=x)`);
	return String(n);
}
function Wu({ value: e, options: t }, n, i) {
	if (e === "none" && i && t.length === 0) return "none";
	if (e === "first" && t.length === 0) return { first: !0 };
	if (typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= 1e3) {
		if (t.length === 0) return { every: e };
		if (t.length === 1 && t[0] === "first") return {
			every: e,
			first: !0
		};
	}
	throw new r(`Cannot read the option "${n}=${[e, ...t].map((e) => J(e)).join("/")}": expected an integer from 1 to ${Jc} (${n}=5), first, 5/first${i ? " or none" : ""}`);
}
function Gu(e) {
	let t = {}, n = {};
	for (let [i, a] of Object.entries(e)) if (i === "ticks") t.marks = Wu(a, i, !1);
	else if (i === "numbers") t.numbers = Wu(a, i, !0);
	else if (i === "padding") t.padding = Ku(a);
	else if (i === "range") t.range = qu(a);
	else if (i === "name" || i === "side") throw new r(`The option "${i}" is for an axis drawn from the code, not for the axes of the graph: ${i === "name" ? "use axisXname or axisYname" : "the graph puts the numbers inside of the drawing"}`);
	else n[i] = a;
	return {
		extra: t,
		style: n
	};
}
function Ku({ value: e, options: t }) {
	if (typeof e != "number" || t.length > 0 || !(Number.isFinite(e) && e >= 0)) throw new r(`Cannot read the option "padding=${J(e)}": expected a number of 0 or more (pixels)`);
	return e;
}
function qu({ value: e, options: t }) {
	if (t.length > 0) throw new r(`Cannot read the option "range=${[e, ...t].map((e) => J(e)).join("/")}": expected min:max, or one number for -n:n`);
	return Hu(e, "range");
}
function Ju(e, t = {}) {
	let n = Q(e.axis) ? Ru(e.axis, "axis") : null, r = (t, n, r, i, a, o) => {
		if (!(Q(e.axis) || Q(t) || Q(r))) return !1;
		let s = Q(t) ? Ru(t, n) : null, c = s === null ? { ...a } : {
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
			name: Uu(r, i)
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
var Yu = "two points (the zero, then the unit), then a step: a number (0.5) or a number of pi (pi/2)";
function Xu(e, t) {
	if (e.key !== K.AXIS.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an axis`);
	let [n, i, ...a] = Cu(e.values, t);
	if (!q(n) || !q(i) || a.length > 1) return X(e, Yu, e.values.length === 0 ? "no value" : e.values.map(J).join(", "));
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
	let o = zu(a[0]);
	return o === null ? X(e, Yu, J(a[0])) : {
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
function Zu(e, t, n) {
	if (!(e instanceof gl)) throw new i(t, `The option "${t}" is for an axis, and "${e.name}" is not one`);
	let { value: o, options: s } = n, c = e.config, l = (n) => new i(t, `Invalid value ${J(o)} for the option "${t}" of "${e.name}": expected ${n}`), u;
	try {
		switch (t) {
			case "ticks":
				u = {
					...c,
					ticks: {
						...c.ticks,
						marks: Wu(n, t, !1)
					}
				};
				break;
			case "numbers":
				u = {
					...c,
					ticks: {
						...c.ticks,
						numbers: Wu(n, t, !0)
					}
				};
				break;
			case "padding":
				u = {
					...c,
					padding: Ku(n)
				};
				break;
			case "range":
				u = {
					...c,
					range: qu(n)
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
var Qu = (e) => (t, n) => {
	Zu(t, e, n);
}, $u = {
	ticks: Qu("ticks"),
	numbers: Qu("numbers"),
	name: Qu("name"),
	side: Qu("side"),
	padding: Qu("padding"),
	range: Qu("range")
}, ed = { [K.AXIS]: {
	name: "axis",
	description: "Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph",
	forms: ["a=axis <point>,<point>[,<step>]"],
	summary: "a=axis A,B — graduated line",
	build: Xu
} }, td = "bezier", nd = "two points or more, each one a name that can be followed by a direction (H, V, S, or an angle in degrees) and a ratio (A/H/0.4, B/45/0.3), or, with a last *, 3 or 4 control points";
function rd(e, t) {
	let n = Object.hasOwn(t, e) ? t[e] : void 0;
	return n instanceof G ? n : null;
}
function id(e) {
	let t = +e;
	return e.trim() === "" || !Number.isFinite(t) ? null : t;
}
function ad(e) {
	switch (e) {
		case "H": return "horizontal";
		case "V": return "vertical";
		case "S": return;
		default: return id(e);
	}
}
function od(e, t, n) {
	let r = typeof e == "string" ? e.split("/") : [], i = r.at(0), a = r.at(1), o = r.at(2), s = i === void 0 ? null : rd(i, n);
	if (s === null) return X(t, nd, `${J(e)} as a point`);
	let c = a === void 0 ? void 0 : ad(a), l = o === void 0 ? void 0 : id(o);
	return c === null || r.length > 3 ? X(t, nd, `${J(e)} (the direction must be H, V, S or an angle in degrees)`) : l === null || l !== void 0 && l <= 0 ? X(t, nd, `${J(e)} (the ratio must be a number greater than 0)`) : {
		point: s,
		...c === void 0 ? {} : { direction: c },
		...l === void 0 ? {} : { ratio: l }
	};
}
function sd(e, t) {
	if (e.key !== K.BEZIER.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a Bézier curve`);
	let n = Su(e.values.at(-1)), i = n ? e.values.slice(0, -1) : e.values;
	if (n) {
		let n = i.map((e) => typeof e == "string" ? rd(e, t) : null);
		return n.length !== 3 && n.length !== 4 || n.some((e) => e === null) ? X(e, nd, i.length === 0 ? "no value" : i.map(J).join(", ")) : {
			create: td,
			config: { controls: n }
		};
	}
	return i.length < 2 ? X(e, nd, i.length === 0 ? "no value" : J(i[0])) : {
		create: td,
		config: { through: i.map((n) => od(n, e, t)) }
	};
}
var cd = { close: (e) => e.asClosed() };
Object.keys(cd);
function ld(e, t, n) {
	if (!(e instanceof yu)) throw new i(t, `The option "${t}" shapes a Bézier curve, and "${e.name}" is not one`);
	if (n !== !0) throw new i(t, `Invalid value ${J(n)} for the option "${t}" of "${e.name}": it takes no value`);
	try {
		cd[t](e);
	} catch (n) {
		throw n instanceof a ? new i(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
var ud = { close: (e, { value: t }) => {
	ld(e, "close", t);
} }, dd = { [K.BEZIER]: {
	name: "bezier",
	description: "Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last *, the curve pulled by 3 or 4 control points",
	forms: ["b=bezier <point>[/<H|V|S|angle>[/<ratio>]],...", "b=bezier <point>,<point>,<point>[,<point>],*"],
	summary: "b=bezier A,B,C — curve through points",
	build: sd
} }, fd = "circle", pd = "a center and a radius (a number, a point or A:B), a center and a line or an axis, three points (with a last * for the inscribed circle), or A:B for a diameter";
function md(e, t) {
	if (e.key !== K.CIRCLE.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a circle`);
	return {
		create: fd,
		config: hd(Cu(e.values, t), e, t)
	};
}
function hd(e, t, n) {
	let r = () => X(t, pd, e.length === 0 ? "no value" : e.map(J).join(", "));
	if (e.length === 1) {
		let t = wu(e[0], n);
		return t === null ? r() : { diameter: {
			A: t[0],
			B: t[1]
		} };
	}
	if (e.length === 2) {
		let [t, i] = e;
		if (!q(t)) return r();
		if (xu(i)) return { tangent: {
			center: t,
			to: i
		} };
		let a = Tu(i, n);
		return a === null ? r() : {
			center: t,
			radius: a
		};
	}
	if (e.length === 3 || e.length === 4) {
		let [t, n, r, i] = e;
		if (q(t) && q(n) && q(r)) {
			if (e.length === 3) return { through: {
				A: t,
				B: n,
				C: r
			} };
			if (Su(i)) return { inscribed: {
				A: t,
				B: n,
				C: r
			} };
		}
	}
	return r();
}
var gd = { [K.CIRCLE]: {
	name: "circle",
	description: "Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last * for the inscribed circle), from a center and a tangent line, or from a diameter A:B",
	forms: [
		"c=circ <point>,<radius>",
		"c=circ <point>,<line>",
		"c=circ <point>,<point>,<point>[,*]",
		"c=circ <point>:<point>"
	],
	summary: "c=circ O,r — circle",
	labelFields: [
		"radius",
		"perimeter",
		"area"
	],
	build: md
} };
// src/parser/parser.curve.ts
function _d(e, t, n) {
	try {
		let t = new _o(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof r || e instanceof a)) throw e;
	}
	return X(t, n, `${JSON.stringify(e)} as a bound (a number, or an expression of numbers like 2pi)`);
}
function vd(e, t, n) {
	let r = e.split(":");
	if (r.length !== 2 || r.some((e) => e.trim() === "")) return X(t, n, `${JSON.stringify(e)} (expected min:max)`);
	let i = _d(r[0], t, n), a = _d(r[1], t, n);
	return i > a ? X(t, n, `${JSON.stringify(e)}, whose minimum is greater than its maximum`) : {
		min: i,
		max: a
	};
}
function yd(e) {
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
function bd(e, t, n, r) {
	let i = {}, a = [];
	for (let o of e) {
		let e = o;
		if (typeof o == "string" && o.includes("@")) {
			let n = o.lastIndexOf("@"), a = +o.slice(n + 1);
			(i.samples !== void 0 || o.slice(n + 1).trim() === "" || !Number.isFinite(a) || a <= 0) && X(t, r, `${J(o)} as the samples (a single @ and a number greater than 0)`), i.samples = a, e = o.slice(0, n);
		}
		e !== "" && (a.length >= n && X(t, r, `${J(o)} after the ${n === 1 ? "domain" : "domain and the image"}`), typeof e == "string" ? a.push(vd(e, t, r)) : Ha(e) ? a.push({
			min: e.min,
			max: e.max
		}) : X(t, r, J(o)));
	}
	return a.length > 0 && (i.domain = a[0]), a.length > 1 && (i.image = a[1]), i;
}
// src/figures/FillBetween/FillBetween.parser.ts
var xd = "fillbetween", Sd = "a plot, then another plot (or nothing for the x axis), then a domain (min:max, like 0:2pi)";
function Cd(e, t) {
	if (e.key !== K.FILL_BETWEEN.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define an area between plots`);
	let [n, ...i] = Cu(e.values, t);
	if (!(n instanceof Yl)) return X(e, Sd, e.values.length === 0 ? "no value" : `${J(e.values[0])}, which is not a plot`);
	let a = i.at(0), o = a !== void 0 && !(typeof a == "string" || Ha(a));
	if (o && !(a instanceof Yl)) return X(e, Sd, `${J(a)}, which is not a plot`);
	let s = e.values.slice(o ? 2 : 1);
	if (s.length > 1) return X(e, Sd, e.values.map(J).join(", "));
	let c = bd(s, e, 1, Sd);
	return c.samples === void 0 ? {
		create: xd,
		config: {
			plot: n,
			...o ? { other: a } : {},
			...c.domain === void 0 ? {} : { domain: c.domain }
		}
	} : X(e, Sd, J(s[0]));
}
var wd = { [K.FILL_BETWEEN]: {
	name: "fillbetween",
	description: "Fill the area between two plots, or between a plot and the x axis",
	forms: ["z=fill <plot>[,<plot>][,<domain>]"],
	summary: "z=fill f,g — area between curves",
	labelFields: ["area"],
	build: Cd
} }, Td = "follow", Ed = "a line, a circle or a curve to follow, then a point where to start, and a last * to draw the tangent";
function Dd(e, t) {
	if (e.key !== K.FOLLOW.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a point that follows a figure`);
	let n = Cu(e.values, t), i = Su(n.at(-1)), a = i ? n.slice(0, -1) : n, o = a.at(0), s = a.at(1);
	return o instanceof Ac ? o.followable ? s !== void 0 && !(s instanceof G) || a.length > 2 ? X(e, Ed, n.map(J).join(", ")) : {
		create: Td,
		config: {
			follow: o,
			...s === void 0 ? {} : { at: s },
			...i ? { tangent: i } : {}
		}
	} : X(e, Ed, `${J(o)}, which cannot be followed`) : X(e, Ed, n.length === 0 ? "no value" : J(n[0]));
}
var Od = { [K.FOLLOW]: {
	name: "follow",
	description: "Create a point that follows the mouse along a line, a circle or a curve (a last * draws the tangent too)",
	forms: ["t=follow <figure>[,<point>][,*]"],
	summary: "F=follow f — point on a curve",
	build: Dd
} };
// src/figures/Grid/Grid.parser.ts
function kd(e, t, n) {
	if (!Q(e) && !Q(t) && !Q(n)) return null;
	let r = Q(e) ? Ru(e, "grid") : null, i = Q(t) ? Ru(t, "gridX") : null, a = Q(n) ? Ru(n, "gridY") : null, o = {
		x: i?.step ?? r?.step ?? 1,
		y: a?.step ?? (r === null || r.pi ? 1 : r.step)
	};
	return o.x === 1 && o.y === 1 ? {} : { step: o };
}
var Ad = "an x interval and a y interval (0:5,0:3, a bound can be 2pi) for a part of the drawing, then a step: a number (0.5), a number of pi (pi/3) or a step for each axis (0.5;1)";
function jd(e) {
	if (e.key !== K.GRID.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a grid`);
	let t = e.values.length === 1 && e.values[0] === !0 ? [] : e.values, [n, i, ...a] = t, o = Vu(n);
	if (o && !Vu(i)) return X(e, Ad, `${J(n)} alone`);
	let s = o ? a : t, c = {};
	if (s.length > 1) return X(e, Ad, t.map(J).join(", "));
	if (o) try {
		c.x = Hu(n, "x"), c.y = Hu(i, "y");
	} catch (t) {
		throw t instanceof r ? new r(`Cannot build "${e.name}" (${e.key}): ${t.message}`, { cause: t }) : t;
	}
	if (s.length === 1) {
		let [t] = s, n = Va(t) && !Vu(t) ? Md(t) : zu(t);
		if (n === null) return X(e, Ad, J(t));
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
function Md(e) {
	return Number.isFinite(e.x) && Number.isFinite(e.y) && e.x > 0 && e.y > 0 ? {
		x: e.x,
		y: e.y
	} : null;
}
function Nd(e, t, n) {
	if (!(e instanceof ou)) throw new i(t, `The option "${t}" cuts the steps of a grid, and "${e.name}" is not one`);
	let r = n === !0 ? 2 : n;
	try {
		e.config = {
			...e.config,
			subdivisions: r
		};
	} catch (r) {
		throw r instanceof a ? new i(t, `Invalid value ${J(n)} for the option "${t}" of "${e.name}": expected an integer from 2 to 20`, { cause: r }) : r;
	}
}
var Pd = { subgrid: (e, { value: t }) => {
	Nd(e, "subgrid", t);
} }, Fd = { [K.GRID]: {
	name: "grid",
	description: "Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph",
	forms: ["g=grid [<x interval>,<y interval>][,<step>]"],
	summary: "g=grid — grid",
	build: jd
} }, Id = "line", Ld = (e) => (t, n) => {
	Z(n, t, 2, 2, "two points");
	let [r, i] = t;
	return q(r) && q(i) ? {
		through: {
			A: r,
			B: i
		},
		shape: e
	} : X(n, "two points", `${J(r)} and ${J(i)}`);
};
function Rd(e, t) {
	try {
		return Ba(e);
	} catch (n) {
		if (n instanceof r) return X(t, "a slope, a number or a fraction", J(e));
		throw n;
	}
}
var zd = (e) => (t, n) => {
	let r = "a line or an axis, and a point";
	Z(n, t, 2, 2, r);
	let [i, a] = t;
	return xu(i) && q(a) ? e === "perpendicular" ? { perpendicular: {
		to: i,
		through: a
	} } : { parallel: {
		to: i,
		through: a
	} } : X(n, r, `${J(i)} and ${J(a)}`);
}, Bd = {
	[K.LINE]: (e, t) => {
		let n = "an equation, two points, or a point and a slope";
		if (Z(t, e, 1, 2, n), e.length === 1) {
			let [r] = e;
			return typeof r == "string" ? { equation: r } : X(t, n, J(r));
		}
		let [r, i] = e;
		return q(r) && q(i) ? {
			through: {
				A: r,
				B: i
			},
			shape: "line"
		} : q(r) && (typeof i == "number" || typeof i == "string") ? {
			slope: {
				A: r,
				slope: Rd(i, t)
			},
			shape: "line"
		} : X(t, n, `${J(r)} and ${J(i)}`);
	},
	[K.SEGMENT]: Ld("segment"),
	[K.VECTOR]: Ld("vector"),
	[K.RAY]: Ld("ray"),
	[K.PERPENDICULAR]: zd("perpendicular"),
	[K.PARALLEL]: zd("parallel"),
	[K.MEDIATOR]: (e, t) => {
		Z(t, e, 2, 2, "two points");
		let [n, r] = e;
		return q(n) && q(r) ? { mediator: {
			A: n,
			B: r
		} } : X(t, "two points", `${J(n)} and ${J(r)}`);
	},
	[K.TANGENT]: (e, t) => {
		let n = "a curve and a point";
		Z(t, e, 2, 2, n);
		let [r, i] = e;
		return r instanceof Yl && q(i) ? { tangent: {
			f: r,
			A: i
		} } : X(t, n, `${J(r)} and ${J(i)}`);
	},
	[K.BISECTOR]: (e, t) => {
		let n = "two lines or axes (with a last * for the other bisector), or three points (the vertex of the angle is the second)";
		Z(t, e, 2, 3, n);
		let [r, i] = e, a = e.at(2);
		return xu(r) && xu(i) && (a === void 0 || Su(a)) ? a === void 0 ? { bisector: {
			d1: r,
			d2: i
		} } : { bisector: {
			d1: r,
			d2: i,
			alternative: !0
		} } : e.length === 3 && q(r) && q(i) && q(a) ? { bisector: {
			A: i,
			B: r,
			C: a
		} } : X(t, n, e.map(J).join(", "));
	}
};
function Vd(e, t) {
	let n = Object.hasOwn(Bd, e.key) ? Bd[e.key] : void 0;
	if (n === void 0) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a line`);
	return {
		create: Id,
		config: n(Cu(e.values, t), e)
	};
}
var Hd = Object.values(K), $ = "[A-Z][0-9]*", Ud = [
	[RegExp(`^v(${$})(${$})$`), K.VECTOR],
	[RegExp(`^\\[(${$})(${$})\\]$`), K.SEGMENT],
	[RegExp(`^(${$})(${$})\\.$`), K.SEGMENT],
	[RegExp(`^\\[(${$})(${$})\\[$`), K.RAY],
	[RegExp(`^(${$})(${$})\\[$`), K.RAY],
	[RegExp(`^\\[(${$})(${$})$`), K.RAY],
	[RegExp(`^(${$})(${$})$`), K.LINE]
];
function Wd(e) {
	let t = e.indexOf("=");
	if (t <= 0 || e.includes(" ")) return null;
	let n = e.slice(0, t), i = e.slice(t + 1);
	if (Hd.includes(i)) return null;
	for (let [e, t] of Ud) {
		let r = e.exec(i);
		if (r !== null) return `${n}=${t} ${r[1]},${r[2]}`;
	}
	throw new r(`Cannot read "${e}" as a line: expected two points, like AB, AB., [AB], AB[, [AB[, [AB or vAB, after the "="`);
}
var Gd = {
	[K.LINE]: {
		name: "line",
		description: "Create a line through two points, through a point with a slope, or from its equation",
		forms: [
			"d=AB",
			"d=line <point>,<point>",
			"d=line <point>,<slope>",
			"d=line <equation>"
		],
		summary: "d=line A,B — line (or d=AB)",
		labelFields: ["slope"],
		build: Vd
	},
	[K.VECTOR]: {
		name: "vector",
		description: "Create a vector: a segment with an arrow at its end",
		forms: ["v=vAB", "v=vec <point>,<point>"],
		summary: "v=vec A,B — vector (or v=vAB)",
		labelFields: ["slope"],
		build: Vd
	},
	[K.SEGMENT]: {
		name: "segment",
		description: "Create a segment through two points",
		forms: [
			"s=AB.",
			"s=[AB]",
			"s=seg <point>,<point>"
		],
		summary: "s=seg A,B — segment (or s=AB.)",
		labelFields: ["length", "slope"],
		build: Vd
	},
	[K.RAY]: {
		name: "ray (half line)",
		description: "Create a ray: it starts at the first point and goes through the second",
		forms: [
			"r=AB[",
			"r=[AB[",
			"r=[AB",
			"r=ray <point>,<point>"
		],
		summary: "r=ray A,B — ray (or r=AB[)",
		labelFields: ["slope"],
		build: Vd
	},
	[K.PERPENDICULAR]: {
		name: "perpendicular",
		description: "Create the perpendicular of a line from a point",
		forms: ["d=perp <line>,<point>"],
		summary: "p=perp d,A — perpendicular",
		labelFields: ["slope"],
		build: Vd
	},
	[K.PARALLEL]: {
		name: "parallel",
		description: "Create a parallel line from a point",
		forms: ["d=para <line>,<point>"],
		summary: "p=para d,A — parallel",
		labelFields: ["slope"],
		build: Vd
	},
	[K.MEDIATOR]: {
		name: "mediator",
		description: "Create the mediator of two points",
		forms: ["d=med <point>,<point>"],
		summary: "m=med A,B — perpendicular bisector",
		labelFields: ["slope"],
		build: Vd
	},
	[K.TANGENT]: {
		name: "tangent",
		description: "Create a tangent line from a <circle|plot> by a Point",
		forms: ["d=tan <circle|plot>,<point>"],
		summary: "t=tan f,A — tangent",
		labelFields: ["slope"],
		build: Vd
	},
	[K.BISECTOR]: {
		name: "bisector",
		description: "Create the bisector of an angle (three points), or of two lines or axes (a last * for the other bisector)",
		forms: ["d=bis <point>,<point>,<point>", "d=bis <line>,<line>[,*]"],
		summary: "b=bis d1,d2 — angle bisector",
		labelFields: ["slope"],
		build: Vd
	}
}, Kd = "parametric", qd = "two functions of t (x then y), then a domain (min:max, like 0:2pi) and a number of samples per unit (@50)";
function Jd(e, t) {
	if (e.key !== K.PARAMETRIC.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a parametric curve`);
	let n = yd(e.values.at(0)), i = yd(e.values.at(1));
	if (n === null || i === null || n.text.trim() === "" || i.text.trim() === "") return X(e, qd, e.values.length === 0 ? "no value" : e.values.map(J).join(", "));
	let { domain: a, samples: o } = bd([
		...n.samples,
		...i.samples,
		...e.values.slice(2)
	], e, 1, qd);
	return {
		create: Kd,
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
var Yd = /^([a-z][0-9]*)\(t\)/;
function Xd(e) {
	let t = Yd.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new r(`Cannot read the curve "${e}": expected ${t[1]}(t)=<function of x>,<function of y>`);
	return `${t[1]}=${K.PARAMETRIC} ${n.slice(1)}`;
}
var Zd = { [K.PARAMETRIC]: {
	name: "parametric",
	description: "Plot a parametric function",
	forms: ["f(t)=<function_x>,<function_y>[,<domain>][@<number>]", "f=parametric <function_x>,<function_y>[,<domain>][,@<number>]"],
	summary: "f=parametric x(t),y(t) — parametric curve",
	build: Jd
} }, Qd = "the data of an SVG path in units of the coordinate system, like M 0,0 L 2,1 Q 3,3 4,0 Z";
function $d(e) {
	if (e.key !== K.PATH.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a path`);
	if (e.values.length === 0 || e.values.some((e) => typeof e != "string" && typeof e != "number")) return X(e, Qd, e.values.length === 0 ? "no value" : e.values.map(J).join(", "));
	let t = e.values.map(String).join(",");
	try {
		Ps(t);
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
var ef = { [K.PATH]: {
	name: "path",
	description: "Draw an SVG path, written in units of the coordinate system",
	forms: ["p=path M 0,0 L 2,1 Q 3,3 4,0 Z"],
	summary: "p=path d — SVG path",
	build: $d
} }, tf = "plot", nf = "an expression or three points (the parabola through them), then a number of samples per unit (@50), a domain (min:max, like -2pi:2pi) and an image (min:max)";
function rf(e, t) {
	if (e.key !== K.PLOT.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a plot`);
	let [n, i, a] = Cu(e.values.slice(0, 3), t);
	if (q(n) && q(i) && q(a)) return {
		create: tf,
		config: {
			quadratic: {
				A: n,
				B: i,
				C: a
			},
			...bd(e.values.slice(3), e, 2, nf)
		}
	};
	let o = yd(e.values.at(0));
	return o === null || o.text.trim() === "" ? X(e, nf, e.values.length === 0 ? "no value" : J(e.values[0])) : {
		create: tf,
		config: {
			expression: o.text,
			...bd([...o.samples, ...e.values.slice(1)], e, 2, nf)
		}
	};
}
var af = /^([a-z][0-9]*)\(x\)/;
function of(e) {
	let t = af.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new r(`Cannot read the plot "${e}": expected ${t[1]}(x)=<function>`);
	return `${t[1]}=${K.PLOT} ${n.slice(1)}`;
}
var sf = { [K.PLOT]: {
	name: "plot",
	description: "Plot a function, or the parabola through three points (a line if they are aligned)",
	forms: [
		"f(x)=<function>[@<number>,<domain>,<image>]",
		"f=plot <function>[@<number>,<domain>,<image>]",
		"f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]"
	],
	summary: "f=plot expr — function (or f(x)=expr)",
	build: rf
} }, cf = "point";
function lf(e, t, n) {
	let r = (e) => Object.hasOwn(n, e) ? n[e] : void 0;
	if (typeof e == "number") return e;
	if (typeof e == "string" && e.includes(".")) {
		let [t, n] = e.split("."), i = r(t);
		if (i instanceof G && (n === "x" || n === "y")) return {
			point: i,
			axis: n
		};
	}
	let i = wu(e, n);
	return i === null ? X(t, "a number, <point>.x, <point>.y or <point>:<point>", J(e)) : {
		point1: i[0],
		point2: i[1]
	};
}
var uf = {
	[K.POINT]: (e, t, n) => (Z(t, e, 2, 2, "two coordinates (x,y)"), { coordinates: {
		x: lf(e[0], t, n),
		y: lf(e[1], t, n)
	} }),
	[K.MIDDLE]: (e, t) => {
		Z(t, e, 2, 2, "two points");
		let [n, r] = e;
		return q(n) && q(r) ? { middle: {
			A: n,
			B: r
		} } : X(t, "two points", `${J(n)} and ${J(r)}`);
	},
	[K.PROJECTION]: (e, t) => {
		Z(t, e, 2, 2, "a point and a line or an axis");
		let [n, r] = e;
		return q(n) && xu(r) ? { projection: {
			point: n,
			axis: r
		} } : X(t, "a point and a line or an axis", `${J(n)} and ${J(r)}`);
	},
	[K.SYMMETRY]: (e, t) => {
		Z(t, e, 2, 2, "a point and a point, a line or an axis");
		let [n, r] = e;
		return q(n) && (q(r) || xu(r)) ? { symmetry: {
			A: n,
			B: r
		} } : X(t, "a point and a point, a line or an axis", `${J(n)} and ${J(r)}`);
	},
	[K.DIRECTION_POINT]: (e, t) => {
		let n = "a point, a line or an axis, a distance and, to be perpendicular, a last *";
		Z(t, e, 3, 4, n);
		let [r, i, a, o] = e;
		return q(r) && xu(i) && typeof a == "number" && (o === void 0 || Su(o)) ? { direction: {
			point: r,
			direction: i,
			distance: a,
			perpendicular: o !== void 0
		} } : X(t, n, `${J(r)}, ${J(i)} and ${J(a)}`);
	},
	[K.VECTOR_POINT]: (e, t) => {
		let n = "two points, then optionally a scale (a number) and a starting point";
		Z(t, e, 2, 4, n);
		let [r, i, a, o] = e;
		return q(r) && q(i) && (a === void 0 || typeof a == "number") && (o === void 0 || q(o)) ? { direction: {
			point: o ?? r,
			direction: {
				A: r,
				B: i
			},
			distance: a ?? 1
		} } : X(t, n, e.map(J).join(", "));
	},
	[K.EVAL_FX]: (e, t, n) => {
		Z(t, e, 2, 2, "a curve and an abscissa");
		let [r] = e;
		return r instanceof Yl ? { evaluation: {
			fx: r,
			x: lf(e[1], t, n)
		} } : X(t, "a curve and an abscissa", `${J(r)} as a curve`);
	}
};
function df(e, t) {
	let n = Object.hasOwn(uf, e.key) ? uf[e.key] : void 0;
	if (n === void 0) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a point`);
	return {
		create: cf,
		config: n(Cu(e.values, t), e, t)
	};
}
function ff(e, t) {
	let n = "two figures: two lines or axes, a circle and a line, or two circles";
	if (e.key !== K.INTERSECTION.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key is not an intersection`);
	let i = Cu(e.values, t);
	Z(e, i, 2, 2, n);
	let [a, o] = i;
	if (xu(a) && xu(o)) return [{
		create: cf,
		config: { intersection: {
			A: a,
			B: o
		} }
	}];
	if (a instanceof $l && o instanceof $l) return [0, 1].map((e) => ({
		create: cf,
		config: { intersectionBetweenCircles: {
			A: a,
			B: o,
			index: e
		} }
	}));
	let s = a instanceof $l ? a : o, c = a instanceof $l ? o : a;
	return s instanceof $l && c instanceof ol ? [0, 1].map((e) => ({
		create: cf,
		config: { intersectionWithCircle: {
			A: s,
			B: c,
			index: e
		} }
	})) : X(e, n, `${J(a)} and ${J(o)}`);
}
var pf = {
	o: (e, t) => e.asCircle(t),
	s: (e, t) => e.asSquare(t),
	"*": (e, t) => e.asCrosshair(t)
};
function mf(e, t, n) {
	if (!(e instanceof G)) throw new i(t, `The option "${t}" sets the shape of a point, and "${e.name}" is not a point`);
	if (n !== !0 && typeof n != "number") throw new i(t, `Invalid value ${J(n)} for the option "${t}" of "${e.name}": expected a size, a number greater than 0`);
	try {
		pf[t](e, n === !0 ? void 0 : n);
	} catch (n) {
		throw n instanceof a ? new i(t, `Invalid option "${t}" of "${e.name}": ${n.message}`, { cause: n }) : n;
	}
}
function hf(e) {
	let t = /^([A-Z][0-9]*)\((.*)\)$/.exec(e);
	return t === null ? null : `${t[1]}=pt ${t[2].split(",").map((e) => e.trim()).join(",")}`;
}
var gf = (e) => (t, { value: n }) => {
	mf(t, e, n);
}, _f = {
	o: gf("o"),
	s: gf("s"),
	"*": gf("*")
}, vf = {
	[K.POINT]: {
		name: "point",
		description: "Create a point",
		forms: ["A(3,4)"],
		summary: "A=pt x,y — point",
		labelFields: ["coordinates"],
		build: df
	},
	[K.VECTOR_POINT]: {
		name: "point from two points",
		description: "Create a point from a vector defined by two points and a starting point",
		forms: ["A=vpt <point>,<point>,<scale?>,<starting point?>"],
		summary: "P=vpt A,B,scale — point from a vector",
		labelFields: ["coordinates"],
		build: df
	},
	[K.DIRECTION_POINT]: {
		name: "point from direction line",
		description: "Create a point from a line and a starting point",
		forms: ["A=dpt <point>,<line>,<distance>,<perpendicular?>"],
		summary: "P=dpt A,d,3 — point along a line",
		labelFields: ["coordinates"],
		build: df
	},
	[K.MIDDLE]: {
		name: "mid",
		description: "Create the middle of two points",
		forms: ["A=mid <point>,<point>"],
		summary: "M=mid A,B — middle",
		labelFields: ["coordinates"],
		build: df
	},
	[K.PROJECTION]: {
		name: "projection",
		description: "Create the projection of a point on a line",
		forms: ["A=proj <point>,<line>"],
		summary: "H=proj A,d — projection",
		labelFields: ["coordinates"],
		build: df
	},
	[K.INTERSECTION]: {
		name: "intersection",
		description: "Create the intersection of two lines",
		forms: ["A=inter <line|circle>,<line|circle>"],
		summary: "P=inter d1,d2 — intersection",
		labelFields: ["coordinates"],
		build: ff
	},
	[K.SYMMETRY]: {
		name: "symmetry",
		description: "Create the symmetry of a point",
		forms: ["A=sym <point>,<point|line>"],
		summary: "S=sym A,B — symmetry",
		labelFields: ["coordinates"],
		build: df
	},
	[K.EVAL_FX]: {
		name: "point on a function",
		description: "Create the point of a function at a value",
		forms: ["A=eval f,3"],
		summary: "P=eval f,x — point of a function",
		labelFields: ["coordinates"],
		build: df
	}
}, yf = "polygon", bf = "three points or more, a center with a radius (a number or A:B) and a number of sides, or two points and a number of sides; the number of sides can be followed by the step of a star (5,2)";
function xf(e, t, n) {
	return typeof e == "number" && Number.isInteger(e) ? e : X(t, bf, `${J(e)} as the ${n} (an integer)`);
}
function Sf(e, t) {
	let n = Tu(e, t);
	return typeof n == "number" || n !== null && "point1" in n ? n : null;
}
function Cf(e, t) {
	if (e.key !== K.POLYGON.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a polygon`);
	let n = Cu(e.values, t), i = () => X(e, bf, n.length === 0 ? "no value" : n.map(J).join(", "));
	if (n.every(q)) return n.length >= 3 ? {
		create: yf,
		config: { vertices: n }
	} : i();
	let [a, o, s, c, ...l] = n;
	if (!q(a) || s === void 0 || l.length > 0) return i();
	let u = c === void 0 ? {} : { star: xf(c, e, "step of the star") };
	if (q(o)) return {
		create: yf,
		config: { onSide: {
			A: a,
			B: o,
			sides: xf(s, e, "number of sides"),
			...u
		} }
	};
	let d = Sf(o, t);
	return d === null ? i() : {
		create: yf,
		config: { regular: {
			center: a,
			radius: d,
			sides: xf(s, e, "number of sides"),
			...u
		} }
	};
}
var wf = { [K.POLYGON]: {
	name: "polygon",
	description: "Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side",
	forms: [
		"p=poly <point>,<point>,<point>,...",
		"p=poly <point>,<radius>,<sides>[,<step>]",
		"p=poly <point>,<point>,<sides>[,<step>]"
	],
	summary: "p=poly A,B,C — polygon",
	labelFields: ["perimeter", "area"],
	build: Cf
} }, Tf = "riemann", Ef = "a plot, then a domain (min:max, like 0:2pi), a number of rectangles and a position from 0 (left) to 1 (right)";
function Df(e, t) {
	if (e.key !== K.RIEMANN.toString()) throw new r(`Cannot build "${e.name}" (${e.key}): the key does not define a Riemann sum`);
	let [n, ...i] = Cu(e.values, t);
	if (!(n instanceof Yl)) return X(e, Ef, e.values.length === 0 ? "no value" : `${J(e.values[0])}, which is not a plot`);
	let a = i.length > 0 && (typeof i[0] == "string" || Ha(i[0])), o = a ? i.slice(1) : i, s = { plot: n };
	if (a) {
		let t = bd([e.values[1]], e, 1, Ef);
		if (t.samples !== void 0 || t.domain === void 0) return X(e, Ef, J(e.values[1]));
		s.domain = t.domain;
	}
	let c = o.at(0), l = o.at(1);
	return o.length > 2 || o.some((e) => typeof e != "number") ? X(e, Ef, e.values.map(J).join(", ")) : (c !== void 0 && (s.rectangles = c), l !== void 0 && (s.position = l), {
		create: Tf,
		config: s
	});
}
var Of = { [K.RIEMANN]: {
	name: "riemann",
	description: "Create the Riemann sum of a plot: rectangles from the x axis to its graph",
	forms: ["r=riemann <plot>[,<domain>][,<rectangles>][,<position>]"],
	summary: "r=riemann f — Riemann sum",
	labelFields: ["sum", "rectangles"],
	build: Df
} };
// src/parser/parser.config.ts
function kf(...e) {
	let t = Object.create(null);
	for (let n of e) for (let [e, r] of Object.entries(n)) {
		if (e in t) throw Error(`The key "${e}" is defined twice`);
		t[e] = r;
	}
	return t;
}
var Af = kf(vf, Gd, gd, Nu, sf, Zd, dd, wf, Od, wd, ef, Fd, ed, Of), jf = [
	"x",
	"y",
	"box",
	"unitX",
	"unitY",
	"unit",
	"scale",
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
], Mf = {
	ppu: "unitX and unitY, the length of a unit in cm (unitX=1.5)",
	subgrid: "the option subgrid of grid (grid->subgrid=4)",
	label: "default.label",
	tex: "default.tex",
	points: "default.points",
	"no-points": "default.points=no"
}, Nf = [
	"axis",
	"axisX",
	"axisY",
	"axisXname",
	"axisYname",
	"grid",
	"gridX",
	"gridY"
], Pf = 8;
function Ff(e) {
	let t = [], n = null;
	for (let r of e.split(",").map((e) => e.trim())) n === null ? r !== "" && (r.includes("->") ? n = r : t.push(r)) : r === "" ? (t.push(n), n = null) : n += `,${r}`;
	return n !== null && t.push(n), t;
}
function If({ value: e, options: t }, n) {
	if (t.length > 0) throw new r(`Cannot read the parameter "${n}=${J(e)}/${t.map(J).join("/")}": expected min:max, or one number for -n:n`);
	return Hu(e, n);
}
function Lf(e) {
	let { value: t } = e;
	if (typeof t == "object" && !Ha(t) && "x" in t && "y" in t) return {
		x: Hu(t.x, "box"),
		y: Hu(t.y, "box")
	};
	let n = If(e, "box");
	return {
		x: n,
		y: { ...n }
	};
}
function Rf(e, t) {
	if (!Q(e)) return null;
	let { value: n, options: i } = e;
	if (typeof n != "number" || i.length > 0 || !(Number.isFinite(n) && n > 0)) throw new r(`Cannot read the parameter "${t}=${J(n)}": expected a length in cm greater than 0 (${t}=1.5)`);
	return n;
}
function zf(e) {
	if (!Q(e)) return null;
	let { value: t, options: n } = e, i = typeof t == "string" && n.length === 0 ? ws(t) : null;
	if (i === null) throw new r(`Cannot read the parameter "unit=${J(t)}": expected ${xs.join(", ")} (unit=mm)`);
	return i;
}
function Bf(e) {
	if (!Q(e)) return null;
	let { value: t, options: n } = e;
	if (typeof t != "number" || n.length > 0 || !(Number.isFinite(t) && t > 0)) throw new r(`Cannot read the parameter "scale=${J(t)}": expected a number greater than 0, or a fraction (scale=10, scale=1/10)`);
	return t;
}
function Vf(e, t) {
	if (!Q(e)) return !1;
	if (e.value !== !0 || e.options.length > 0) throw new r(`Cannot read the parameter "${t}=${J(e.value)}": expected the word ${t} alone`);
	return !0;
}
function Hf(e) {
	if (!Q(e)) return { shape: "o" };
	if (e.value === "no" && e.options.length === 0) return !1;
	try {
		return Gf(e);
	} catch (e) {
		throw e instanceof i ? new r(`Cannot read the parameter "default.points": ${e.message} (or "no" to hide the points)`, { cause: e }) : e;
	}
}
function Uf(e, t) {
	let n = e.indexOf("->"), i = (n < 0 ? e : e.slice(0, n)).trim(), a = i.split("=")[0].trim();
	if (Object.hasOwn(Mf, a)) throw new r(`The parameter "${a}" does not exist any more: use ${Mf[a]}`);
	if (!jf.includes(a)) throw new r(`Unknown parameter "${a}": expected ${jf.join(", ")}`);
	let o = t.parameters(i, jf)[a];
	if (o === void 0) throw new r(`Cannot read the parameter "${i}"`);
	let s = n < 0 ? "" : e.slice(n + 2).trim();
	return {
		key: a,
		parameter: o,
		options: s === "" ? {} : t.parse(`layout=grid ->${s}`).parameters
	};
}
function Wf(e, t) {
	let n = {}, i = {
		x: {},
		y: {},
		grid: {}
	}, a = {
		x: {},
		y: {}
	};
	for (let o of Ff(e)) {
		let { key: e, parameter: s, options: c } = Uf(o, t);
		if (Object.hasOwn(n, e)) throw new r(`The parameter "${e}" is written twice`);
		if (n[e] = s, Object.keys(c).length > 0 && !Nf.includes(e)) throw new r(`The parameter "${e}" has no options, got ${Object.keys(c).join(", ")} after "->"`);
		let l = e === "axis" || e === "axisX" || e === "axisXname", u = e === "axis" || e === "axisY" || e === "axisYname";
		if (l || u) {
			let { extra: e, style: t } = Gu(c);
			l && (Object.assign(i.x, t), Object.assign(a.x, e)), u && (Object.assign(i.y, t), Object.assign(a.y, e));
		}
		(e === "grid" || e === "gridX" || e === "gridY") && Object.assign(i.grid, c);
	}
	let o = Q(n.box) ? Lf(n.box) : null, s = {
		x: Q(n.x) ? If(n.x, "x") : o?.x ?? {
			min: -8,
			max: Pf
		},
		y: Q(n.y) ? If(n.y, "y") : o?.y ?? {
			min: -8,
			max: Pf
		}
	}, c = Rf(n.unitX, "unitX"), l = Rf(n.unitY, "unitY"), u = kd(n.grid, n.gridX, n.gridY);
	return {
		window: s,
		unit: {
			x: c ?? 1,
			y: l ?? c ?? 1
		},
		measure: {
			unit: zf(n.unit),
			scale: Bf(n.scale) ?? Ss.scale
		},
		display: {
			axis: Ju(n, a),
			grid: u ?? !1
		},
		defaults: {
			label: Vf(n["default.label"], "default.label"),
			tex: Vf(n["default.tex"], "default.tex"),
			points: Hf(n["default.points"])
		},
		options: i
	};
}
function Gf({ value: e, options: t }) {
	let n = e === !0 ? "o" : e;
	if (n !== "o" && n !== "s" && n !== "*") throw new i("points", `Invalid shape ${J(e)} for the option "points": expected 'o', 's' or '*'`);
	let r = t.at(0);
	if (r === void 0) return { shape: n };
	if (typeof r != "number" || !Number.isFinite(r) || r <= 0) throw new i("points", `Invalid size ${J(r)} for the option "points": expected a number greater than 0`);
	return {
		shape: n,
		size: r
	};
}
// src/animate/Animate.syntax.ts
var Kf = [
	"from",
	"to",
	"duration",
	"delay",
	"easing",
	"loop"
];
function qf(e, t, n) {
	let r = typeof e == "string" && Object.hasOwn(n, e) ? n[e] : void 0;
	if (!(r instanceof G)) throw new a(`The option ${t}=${String(e)} of an animation must be the name of a point of the drawing`);
	return r;
}
var Jf = Object.fromEntries(Object.values(e).map((e) => [e, e]));
function Yf(t, n) {
	if (t === !0 || t === "1" || t === 1) return e.RESET;
	if (typeof t == "string" && Object.hasOwn(Jf, t)) return Jf[t];
	throw Y("loop", n, t, `loop alone, or one of ${Object.keys(Jf).join(", ")}`);
}
function Xf(e, n) {
	if (typeof e == "string" && Object.hasOwn(t, e)) return e;
	throw Y("easing", n, e, Object.keys(t).join(", "));
}
var Zf = {
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
			Object.hasOwn(i, "from") && (a.from = qf(i.from.value, "from", r.figures)), Object.hasOwn(i, "to") && (a.to = qf(i.to.value, "to", r.figures)), Object.hasOwn(i, "duration") && (a.duration = i.duration.value), Object.hasOwn(i, "delay") && (a.delay = i.delay.value), Object.hasOwn(i, "easing") && (a.easing = Xf(i.easing.value, t)), Object.hasOwn(i, "loop") && (a.loop = Yf(i.loop.value, t)), kl(t, a);
		},
		...Object.fromEntries(Kf.map((e) => [e, (t, n, { options: r }) => {
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
function Qf(e) {
	return typeof e != "object" || !e || !("items" in e) || !Array.isArray(e.items) ? null : e.items.map(({ from: e, to: t }) => t === void 0 ? { from: e } : {
		from: e,
		to: t
	});
}
function $f(e, t) {
	let n = e.parameters(`slides=${t}`, { types: { slides: "set" } }), i = Qf(Object.hasOwn(n, "slides") ? n.slides.value : void 0);
	if (Object.keys(n).length !== 1 || n.slides.options.length > 0 || i === null) throw new r(`Expected steps between chevrons and nothing else, like <2-4,6>, got "${t}"`);
	return i;
}
var ep = (e, { value: t, options: n }) => {
	let r = Qf(t);
	if (r === null || n.length > 0) throw Y("slide", e, r === null ? t : [t.raw, ...n.map(String)].join("/"), "steps between chevrons and nothing after them, like <2-4,6>");
	Il(e, r);
};
function tp(e, t) {
	let n = e.trim();
	if (n === "") throw new r(`Cannot read the command "${t}": the title is empty`);
	return n;
}
function np(e, t, n, i) {
	if (Object.hasOwn(e, t)) throw new r(`Cannot read the command "${i}": the step ${t} has the title "${e[t]}" already`);
	return {
		...e,
		[t]: n
	};
}
// src/controls/controls.ts
var rp = {
	animate: Zf,
	slide: {
		options: { slide: ep },
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
						slide: Pl([{ from: t + 1 }])
					};
					if (n === "") return a;
					if (!n.startsWith("=")) throw new r(`Cannot read the command "${i}": @pause takes a title only after a =, like @pause=Introduction`);
					return {
						...a,
						titles: np(e.titles, t + 1, tp(n.slice(1), i), i)
					};
				}
				if (t === "title") {
					let t = /^\s*,\s*(\d+)\s*=(.*)$/.exec(n);
					if (t === null) throw new r(`Cannot read the command "${i}": expected the step and the title, like @title,3=Conclusion`);
					let a = Number(t[1]);
					if (a < 1) throw new r(`Cannot read the command "${i}": the step ${a} is not an integer from 1`);
					return {
						...e,
						titles: np(e.titles, a, tp(t[2], i), i)
					};
				}
				if (n === "") return {
					...e,
					pauses: 0,
					slide: null
				};
				if (!n.startsWith("=")) throw new r(`Cannot read the command "${i}": the steps of @slides come after a =, like @slides=<2->`);
				let o = $f(a, n.slice(1).trim());
				return jl(o, i), {
					...e,
					slide: Pl(o)
				};
			},
			defaults: (e) => e.slide === null ? {} : { slide: e.slide },
			graphControls: (e) => ({ titles: Object.keys(e.titles).length === 0 ? null : Object.freeze({ ...e.titles }) })
		},
		handleControls: ["slide"]
	}
};
function ip() {
	return Object.values(rp);
}
function ap() {
	return Object.fromEntries(ip().flatMap((e) => Object.entries(e.optionTypes ?? {})));
}
function op() {
	return Object.fromEntries(ip().flatMap((e) => Object.entries(e.optionDetails ?? {})));
}
function sp() {
	return Object.fromEntries(ip().flatMap((e) => Object.entries(e.optionValues ?? {})));
}
// src/figures/Label/Label.parser.ts
var cp = "tmb", lp = "lcr", up = /@@|@([a-z]+)?(?:\.(\d+))?/g;
function dp(e) {
	let [t, n] = "br", r = cp.includes(e) && e.length === 1 ? e + n : lp.includes(e) && e.length === 1 ? t + e : e, i = r.length === 2 ? r[1] + r[0] : r;
	return Qs.find((e) => e === r || e === i) ?? null;
}
function fp(e, t) {
	let n = Object.keys(t.labelFields());
	if (n.length === 0 || !e.includes("@")) return e;
	let r = [], i = "", a = 0;
	for (let o of e.matchAll(up)) {
		if (i += e.slice(a, o.index), a = o.index + o[0].length, o[0] === "@@") {
			i += "@";
			continue;
		}
		i !== "" && (r.push(i), i = "");
		let s = o[1], c = o[2], l = pp(s, n, t);
		r.push(c === void 0 ? { field: l } : {
			field: l,
			digits: +c
		});
	}
	return i += e.slice(a), i !== "" && r.push(i), r;
}
function pp(e, t, n) {
	let r = e ?? n.defaultLabelField();
	if (r === null) throw new a(`The figure "${n.name}" has no default field for "@": write the field you want (${t.map((e) => `@${e}`).join(", ")})`);
	if (!t.includes(r)) throw new a(`The figure "${n.name}" cannot show "@${r}" in its label: expected ${t.map((e) => `@${e}`).join(", ")}, or @@ for a @`);
	return r;
}
// src/Draw/Draw.options.ts
var mp = {
	ultrathin: .5,
	thin: .75,
	thick: 2.5,
	ultrathick: 4
}, hp = {
	xs: "2 2",
	sm: "4 3",
	md: "6 4",
	lg: "10 6",
	xl: "16 8"
}, gp = Object.keys(_f);
function _p(e, t, { value: n, options: r }) {
	if (typeof n != "string" || r.length > 1) throw Y(e, t, n, `a color (${e}=red) with an opacity or not (${e}=red/0.5)`);
	let [i] = r;
	if (i === void 0) return { color: n };
	if (typeof i != "number") throw Y(e, t, i, "an opacity, a number from 0 to 1");
	return {
		color: n,
		opacity: i
	};
}
function vp(e, { value: t, options: n }) {
	if (typeof t != "string" && typeof t != "boolean") throw Y("mark", e, t, "a side ('start', 'end', 'both' or 'none')");
	let r = t === !0 ? "both" : t === !1 ? "none" : t, i = n.find((e) => typeof e == "number"), a = n.find((e) => typeof e == "string");
	return {
		side: r,
		...i === void 0 ? {} : { size: i },
		...a === void 0 ? {} : { shape: a }
	};
}
var yp = ">";
function bp(e, t, n, r) {
	let i = Object.hasOwn(r, n) ? r[n] : void 0;
	if (i === void 0) throw Y(e, t, `${yp}${n}`, `${yp} followed by the name of a figure that is defined before`);
	if (!i.referenceable) throw Y(e, t, `${yp}${n}`, `${yp} followed by a point, a circle, an arc or a polygon (${n} is none of them)`);
	return i;
}
function xp(e) {
	return (t, { value: n, options: r }, { graph: i }) => {
		let a = t.name;
		typeof n == "string" && (a = n), e === "tex" && a.length === 2 && !isNaN(+a[1]) && (a = a[0] + "_" + a[1]);
		let o = r[0], s = typeof o == "string" && o.startsWith(yp) ? bp(e, t, o.slice(1), i.figures) : null, c = typeof o == "boolean" || o === void 0 || s !== null ? void 0 : typeof o == "string" ? dp(o) : null, l = r[1], u = r[2];
		if (c === null) throw Y(e, t, o, `a position (${Qs.join(", ")}), one letter (t, m, b, l, c, r) that replaces the same part of br, or ${yp}<figure> to push the label away from a figure`);
		if (l !== void 0 && typeof l != "boolean" && typeof l != "number" && !(typeof l == "object" && "x" in l && "y" in l)) throw Y(e, t, l, "a shift in units (0.5;0), or a distance in units (0.5)");
		if (typeof l == "number" && c !== void 0 && qs(c) === null) throw Y(e, t, o, `a position that lies on a side (${c} has none) for the distance ${l}`);
		if (u !== void 0 && u !== !0 && typeof u != "number") throw Y(e, t, u, "an angle in degrees, or nothing to turn the label with a line");
		if (t.setLabelReference(s), t.addLabel(fp(a, t), {
			asHtml: e === "tex",
			...i.toTex === void 0 ? {} : { texConverter: i.toTex }
		}), t.label) {
			let e = typeof l == "object" ? l : {
				x: 0,
				y: 0
			}, n = i.config.axis.x, r = typeof l == "number" ? l * Math.hypot(n.x, n.y) : void 0, a = {
				x: e.x * i.config.axis.x.x,
				y: -e.y * i.config.axis.y.y
			};
			t.label.autoRotate = u === !0, t.label.position(c, a, typeof u == "number" ? u : 0, r);
		}
	};
}
function Sp(e, t) {
	let n = {}, r = [];
	for (let i of e) if (i !== !0) {
		if (i === "grid") n.grid = !0;
		else if (i === Ga.X) n.along = "x";
		else if (i === Ga.Y) n.along = "y";
		else if (Ha(i)) {
			let e = i.axis ?? "x", t = n.bounds?.[e];
			n.bounds = {
				...n.bounds,
				[e]: {
					min: Math.max(t?.min ?? -Infinity, i.min),
					max: Math.min(t?.max ?? Infinity, i.max)
				}
			};
		} else if (typeof i == "string" && Object.hasOwn(t, i)) r.push(t[i]);
		else throw new a(`Invalid limit ${J(i)}: expected grid, ${Ga.X}, ${Ga.Y}, an interval (-2:3) or the name of a figure`);
	}
	return r.length > 0 && (n.follow = r), n;
}
var Cp = (e, { value: t, options: n }, { graph: r }) => {
	if (!(e instanceof G)) throw new i("drag", `The option "drag" is for a point, and "${e.name}" is not one`);
	r.handle(e, Sp([t, ...n], r.figures));
};
function wp(...e) {
	let t = Object.create(null);
	for (let n of e) for (let [e, r] of Object.entries(n)) {
		if (e in t) throw Error(`The option "${e}" is defined twice`);
		t[e] = r;
	}
	return t;
}
var Tp = wp({
	w: (e, { value: t }) => {
		if (typeof t != "number") throw Y("w", e, t, "a width, a number");
		e.stroke(t);
	},
	color: (e, t) => {
		e.stroke(_p("color", e, t));
	},
	fill: (e, t) => {
		e.fill(_p("fill", e, t));
	},
	dash: (e, { value: t }) => {
		if (t === !0) e.dash();
		else if (typeof t == "string" && Object.hasOwn(hp, t)) e.dash(hp[t]);
		else if (typeof t == "string" || typeof t == "number") e.dash(t);
		else throw Y("dash", e, t, "a pattern or a size (xs, sm, md, lg, xl), like dash=5, dash=5 2 or dash=lg");
	},
	dot: (e) => {
		e.dot();
	},
	mark: (e, t) => {
		e.mark(vp(e, t));
	}
}, Object.fromEntries(Object.entries(mp).map(([e, t]) => [e, (e) => {
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
	label: xp("label"),
	tex: xp("tex"),
	drag: Cp
}, ...ip().map((e) => e.options), _f, Mu, ud, $u, Pd);
function Ep() {
	return Object.keys(Tp);
}
var Dp;
function Op() {
	return Dp ??= {
		keys: [...Ep(), ...bu],
		types: {
			label: "text",
			tex: "text",
			...ap()
		}
	}, Dp;
}
function kp(e, t, n) {
	let r = {
		graph: n,
		options: e
	};
	for (let [n, i] of Object.entries(e)) Ap(n, i, t, r);
}
function Ap(e, t, n, r) {
	if (!(e in Tp) && bu.includes(e)) n.stroke(e);
	else {
		if (!(e in Tp)) throw new i(e, `Unknown option "${e}" for "${n.name}"`);
		try {
			Tp[e](n, t, r);
		} catch (t) {
			throw t instanceof a && !(t instanceof i) ? new i(e, `Invalid option "${e}" of "${n.name}": ${t.message}`, { cause: t }) : t;
		}
	}
}
function jp(e, t, n) {
	if (!(n instanceof G)) return e;
	let r = {}, i = t.points;
	i && !gp.some((t) => Object.hasOwn(e, t)) && (i.shape !== "o" || i.size !== void 0) && (r[i.shape] = {
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
export { Ss as $, Fl as A, or as At, W as B, Yl as C, R as Ct, Il as D, Fa as Dt, Hl as E, Da as Et, ol as F, r as Ft, wc as G, Nc as H, $c as I, n as It, Vs as J, Us as K, el as L, c as Lt, kl as M, s as Mt, G as N, o as Nt, Ml as O, k as Ot, gl as P, i as Pt, Fs as Q, Mc as R, t as Rt, $l as S, Va as St, Ul as T, yr as Tt, Ac as U, Ic as V, Cc as W, Ls as X, Ps as Y, Is as Z, K as _, Ya as _t, rp as a, Uo as at, ou as b, Wa as bt, ip as c, Ho as ct, Af as d, H as dt, Ts as et, hf as f, Za as ft, bu as g, z as gt, Wd as h, B as ht, jp as i, Go as it, Ol as j, a as jt, Nl as k, sr as kt, jf as l, co as lt, Xd as m, V as mt, Op as n, es as nt, op as o, Wo as ot, of as p, Xa as pt, Hs as q, Ep as r, Ko as rt, sp as s, U as st, kp as t, ns as tt, Wf as u, so as ut, yu as v, Ga as vt, Vl as w, N as wt, tu as x, Ha as xt, pu as y, Ka as yt, Fc as z, e as zt };

//# sourceMappingURL=shared.js.map