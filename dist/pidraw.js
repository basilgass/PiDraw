import { $ as e, A as t, At as n, B as r, C as i, Ct as a, D as o, Dt as s, E as c, Et as l, F as u, G as d, H as f, I as p, J as m, K as ee, L as te, M as h, Mt as ne, N as g, Nt as _, O as v, Ot as re, P as y, Q as b, R as x, S as ie, St as ae, T as oe, Tt as S, U as C, V as se, W as ce, X as le, Y as ue, Z as de, _ as w, _t as fe, a as pe, at as me, b as he, bt as ge, c as T, ct as E, d as _e, dt as ve, et as ye, f as be, ft as D, g as O, gt as xe, h as k, ht as A, i as Se, it as j, j as Ce, jt as we, k as M, kt as N, l as Te, lt as Ee, m as P, mt as F, nt as De, o as Oe, ot as ke, pt as Ae, q as je, r as Me, rt as Ne, s as Pe, st as I, t as Fe, tt as Ie, u as Le, ut as Re, v as L, vt as ze, w as Be, wt as Ve, x as R, xt as He, y as Ue, yt as We, z as Ge } from "./shared.js";
// src/calculus/computeDrag.ts
function Ke(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function qe(e, t, n) {
	let { x: r, y: i } = e;
	if (t.along) {
		let { axis: e, keep: n } = t.along;
		e === "x" ? i = n.y : r = n.x;
	}
	if (t.step) {
		let e = Ne({
			x: r,
			y: i
		}, n);
		({x: r, y: i} = j({
			x: Math.round(e.x / t.step.x) * t.step.x,
			y: Math.round(e.y / t.step.y) * t.step.y
		}, n));
	}
	if (t.bounds?.x) {
		let { min: e, max: i } = j(t.bounds.x, n, "x");
		r = Ke(r, e, i);
	}
	if (t.bounds?.y) {
		let { min: e, max: r } = j(t.bounds.y, n, "y");
		i = Ke(i, e, r);
	}
	return {
		x: r,
		y: i
	};
}
// src/calculus/computeFillBetween.ts
var Je = 1e-9;
function Ye(t, n, r, i, a, o) {
	let { bound: s } = o, c = (e) => I(e) && Math.abs(e.x) <= s && Math.abs(e.y) <= s, l = [i.min, i.max];
	for (let r of n === null ? [t] : [t, n]) for (let t of e(r, i.min, i.max, o)) I(t) && l.push(Math.min(i.max, Math.max(i.min, a(t.x))));
	l.sort((e, t) => e - t);
	let u = l.filter((e, t) => t === 0 || e - l[t - 1] > Je), d = [], f = {
		first: [],
		second: []
	}, p = () => {
		f.first.length >= 2 && d.push(f), f = {
			first: [],
			second: []
		};
	};
	for (let e of u) {
		let i = t(e), a = n === null ? {
			x: i.x,
			y: r
		} : n(e);
		if (!c(i) || !c(a)) {
			p();
			continue;
		}
		let o = f.first.length - 1;
		o >= 0 && (Math.abs(i.y - f.first[o].y) > s || Math.abs(a.y - f.second[o].y) > s) && p(), f.first.push(i), f.second.push(a);
	}
	return p(), d;
}
function Xe(e) {
	if (e.length === 0) return "M 0 0";
	let t = (e) => `${b(e.x)} ${b(e.y)}`;
	return e.map(({ first: e, second: n }) => `M ${e.map(t).join(" L ")} L ${[...n].reverse().map(t).join(" L ")} Z`).join(" ");
}
function Ze(e) {
	let t = 0;
	for (let { first: n, second: r } of e) for (let e = 1; e < n.length; e++) {
		let i = n[e].x - n[e - 1].x, a = r[e - 1].y - n[e - 1].y, o = r[e].y - n[e].y;
		a * o >= 0 ? t += i * (Math.abs(a) + Math.abs(o)) / 2 : t += i * (a * a + o * o) / (2 * (Math.abs(a) + Math.abs(o)));
	}
	return t;
}
// src/calculus/computeLayout.ts
var Qe = 28.45274 / .75, $e = 800, et = 600;
function tt(e) {
	return Object.fromEntries(Object.entries(e ?? {}).filter(([, e]) => e !== void 0));
}
function nt(e) {
	let t = e?.width ?? $e, n = e?.height ?? et, r = {
		width: t,
		height: n,
		origin: { ...e?.origin ?? {
			x: t / 2,
			y: n / 2
		} },
		system: e?.system ?? Ae.CARTESIAN_2D,
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
	return rt(r), {
		config: r,
		display: {
			grid: !0,
			axis: !0,
			...tt(e?.display)
		}
	};
}
function rt(e) {
	let t = (e, t, n) => new S(`Invalid ${e} ${typeof t == "number" ? String(t) : JSON.stringify(t)} for the graph: expected ${n}`), n = ({ x: e, y: t }) => Number.isFinite(e) && Number.isFinite(t);
	for (let n of ["width", "height"]) if (!(Number.isFinite(e[n]) && e[n] > 0)) throw t(n, e[n], "a finite number greater than 0");
	if (!n(e.origin)) throw t("origin", e.origin, "a position with finite coordinates");
	for (let r of ["x", "y"]) {
		let i = e.axis[r];
		if (!n(i) || Math.hypot(i.x, i.y) === 0) throw t(`vector of the axis ${r}`, i, "a finite vector that is not null");
	}
	if (e.system !== Ae.CARTESIAN_2D) throw new s(`The coordinate system "${e.system}" cannot be drawn yet`);
}
function it({ x: e, y: t, unit: n }) {
	let r = n.x * Qe, i = n.y * Qe;
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
var at = 1e-9;
function ot(e, t, n, r) {
	let i = Math.abs(r.x.y) <= at && Math.abs(r.y.x) <= at, a = (t) => ({
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
var st = {
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
}, ct = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y, lt = /[A-Za-z]/;
function ut(e, t, n, r, i, a, o) {
	if (e.x === o.x && e.y === o.y) return [];
	if (t === 0 || n === 0) return [{
		type: "L",
		p: o
	}];
	let s = r * Math.PI / 180, c = Math.cos(s), l = Math.sin(s), u = {
		x: (e.x - o.x) / 2,
		y: (e.y - o.y) / 2
	}, d = c * u.x + l * u.y, f = -l * u.x + c * u.y, p = Math.abs(t), m = Math.abs(n), ee = d * d / (p * p) + f * f / (m * m);
	ee > 1 && (p *= Math.sqrt(ee), m *= Math.sqrt(ee));
	let te = p * p, h = m * m, ne = te * h - te * f * f - h * d * d, g = (i === a ? -1 : 1) * Math.sqrt(Math.max(0, ne / (te * f * f + h * d * d))), _ = g * p * f / m, v = -g * m * d / p, re = {
		x: c * _ - l * v + (e.x + o.x) / 2,
		y: l * _ + c * v + (e.y + o.y) / 2
	}, y = (e, t, n, r) => Math.atan2(e * r - t * n, e * n + t * r), b = y(1, 0, (d - _) / p, (f - v) / m), x = y((d - _) / p, (f - v) / m, (-d - _) / p, (-f - v) / m);
	!a && x > 0 ? x -= 2 * Math.PI : a && x < 0 && (x += 2 * Math.PI);
	let ie = (e) => ({
		x: re.x + p * Math.cos(e) * c - m * Math.sin(e) * l,
		y: re.y + p * Math.cos(e) * l + m * Math.sin(e) * c
	}), ae = (e) => ({
		x: -p * Math.sin(e) * c - m * Math.cos(e) * l,
		y: -p * Math.sin(e) * l + m * Math.cos(e) * c
	}), oe = Math.max(1, Math.ceil(Math.abs(x) / (Math.PI / 2) - 1e-9)), S = x / oe, C = 4 / 3 * Math.tan(S / 4);
	return Array.from({ length: oe }, (e, t) => {
		let n = b + t * S, r = n + S, i = ie(n), a = t === oe - 1 ? o : ie(r), s = ae(n), c = ae(r);
		return {
			type: "C",
			c1: {
				x: i.x + C * s.x,
				y: i.y + C * s.y
			},
			c2: {
				x: a.x - C * c.x,
				y: a.y - C * c.y
			},
			p: a
		};
	});
}
function dt(e) {
	let t = [], n = 0, r = "", i = {
		x: 0,
		y: 0
	}, a = {
		x: 0,
		y: 0
	}, o = null, s = null, c = (t) => {
		throw new N(`Invalid path ${JSON.stringify(e)}: ${t} (at the character ${n + 1})`);
	}, l = () => {
		for (; n < e.length && /\s/.test(e[n]);) n++;
	}, u = () => {
		l(), e[n] === "," && (n++, l());
	}, d = () => {
		u(), ct.lastIndex = n;
		let t = ct.exec(e);
		return t === null ? c("expected a number") : (n += t[0].length, +t[0]);
	}, f = () => (u(), e[n] !== "0" && e[n] !== "1" ? c("expected 0 or 1") : (n++, e[n - 1] === "1"));
	for (l(); n < e.length && (l(), !(n >= e.length));) {
		if (lt.test(e[n])) {
			if (r = e[n], r.toUpperCase() in st || c(`the command "${r}" does not exist`), t.length === 0 && r !== "M" && r !== "m" && c("a path begins with M"), n++, r === "Z" || r === "z") {
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
				t.push(...ut(i, e, n, r, a, c, l)), i = l, o = s = null;
			}
		}
	}
	return t;
}
function ft(e, t) {
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
function pt(e) {
	let t = (e) => `${b(e.x)} ${b(e.y)}`;
	return e.map((e) => {
		switch (e.type) {
			case "M":
			case "L": return `${e.type} ${t(e.p)}`;
			case "C": return `C ${t(e.c1)} ${t(e.c2)} ${t(e.p)}`;
			case "Z": return "Z";
		}
	}).join(" ");
}
function mt(e) {
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
function ht(e, t) {
	return t === 0 ? e : ht(t, e % t);
}
function gt(e, t = 1) {
	let n = ht(e, t), r = e / n;
	return Array.from({ length: n }, (n, i) => Array.from({ length: r }, (n, r) => (i + r * t) % e));
}
function _t(e, t, n, r = 1) {
	return !I(e) || !Number.isFinite(t) || t <= 0 ? null : {
		vertices: Array.from({ length: n }, (r, i) => Ee(e.x, e.y, t, 90 + i * 360 / n)),
		cycles: gt(n, r)
	};
}
function vt(e, t, n, r = 1) {
	let i = I(e) && I(t) ? ke(e, t) : NaN;
	if (!Number.isFinite(i) || i === 0) return null;
	let a = Math.PI * r / n, o = me(e, t), s = Ee((e.x + t.x) / 2, (e.y + t.y) / 2, i / (2 * Math.tan(a)), o + 90), c = i / (2 * Math.sin(a)), l = me(s, e);
	return {
		vertices: Array.from({ length: n }, (e, t) => Ee(s.x, s.y, c, l + t * 360 / n)),
		cycles: gt(n, r)
	};
}
function yt(e) {
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
function bt(e, t) {
	let n = E(), r = Infinity;
	for (let i of e.cycles) {
		let a = [...i, i[0]].map((t) => e.vertices[t]), o = de(a, t), s = Math.hypot(o.x - t.x, o.y - t.y);
		s < r && (r = s, n = o);
	}
	return n;
}
function xt(e) {
	return e.cycles.map((t) => t.map((t, n) => `${n === 0 ? "M" : "L"} ${b(e.vertices[t].x)} ${b(e.vertices[t].y)}`).join(" ") + " Z").join(" ");
}
// src/calculus/computeRiemann.ts
function St(e, t, n, r) {
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
function Ct(e) {
	return e.reduce((e, { x0: t, x1: n, y: r }) => e + r * (n - t), 0);
}
// src/calculus/computeZoom.ts
var wt = {
	min: 1 / 100,
	max: 100
}, Tt = 1e-9, Et = (e) => Number.isFinite(e.x) && Number.isFinite(e.y);
function Dt(e, t) {
	if (!Et(e)) throw new S(`Invalid ${t} (${e.x}, ${e.y}): expected a position with finite numbers`);
}
function Ot(e) {
	if (!Number.isFinite(e) || e <= 0) throw new S(`Invalid zoom factor ${e}: expected a finite number greater than 0`);
}
function kt(e, t, n) {
	Ot(t), Dt(n, "center");
	let r = (e) => ({
		x: e.x * t,
		y: e.y * t
	});
	return {
		...e,
		axis: {
			x: r(e.axis.x),
			y: r(e.axis.y)
		},
		origin: {
			x: n.x + (e.origin.x - n.x) * t,
			y: n.y + (e.origin.y - n.y) * t
		}
	};
}
function At(e, t) {
	return Dt(t, "move"), {
		...e,
		origin: {
			x: e.origin.x + t.x,
			y: e.origin.y + t.y
		}
	};
}
function jt(e, t) {
	let { x: n, y: r } = t;
	if (![
		n.min,
		n.max,
		r.min,
		r.max
	].every(Number.isFinite) || n.min >= n.max || r.min >= r.max) throw new S(`Invalid window x ${n.min}:${n.max}, y ${r.min}:${r.max}: expected finite numbers, each min below its max`);
	let { axis: i } = e;
	if (!(Math.abs(i.x.y) <= Tt && Math.abs(i.y.x) <= Tt && i.x.x > 0 && i.y.y < 0)) throw new S("A window can be shown only with the usual axes: orthogonal, the x axis to the right and the y axis up");
	let a = e.width / (n.max - n.min), o = e.height / (r.max - r.min);
	return {
		...e,
		axis: {
			x: {
				x: a,
				y: 0
			},
			y: {
				x: 0,
				y: -o
			}
		},
		origin: {
			x: -n.min * a,
			y: r.max * o
		}
	};
}
function Mt(e) {
	let t = [
		{
			x: 0,
			y: 0
		},
		{
			x: e.width,
			y: 0
		},
		{
			x: 0,
			y: e.height
		},
		{
			x: e.width,
			y: e.height
		}
	].map((t) => Ne(t, e)), n = t.map((e) => e.x), r = t.map((e) => e.y);
	return {
		x: {
			min: Math.min(...n),
			max: Math.max(...n)
		},
		y: {
			min: Math.min(...r),
			max: Math.max(...r)
		}
	};
}
function z(e, t) {
	let n = (e) => Math.hypot(e.x, e.y);
	return {
		x: n(e.axis.x) / n(t.axis.x),
		y: n(e.axis.y) / n(t.axis.y)
	};
}
function Nt(e, t, n = wt) {
	Ot(e);
	let r = Math.max(n.min / t.x, n.min / t.y), i = Math.min(n.max / t.x, n.max / t.y);
	return r > i ? 1 : Math.min(Math.max(e, r), i);
}
// src/animate/Animate.ts
var Pt = 100, Ft = class extends EventTarget {
	_graph;
	_animatedPoints = [];
	_last = null;
	_paused = !1;
	_rafId = null;
	_resetTimer = null;
	_animations = /* @__PURE__ */ new Map();
	constructor(e) {
		super(), this._graph = e, e.attach(this), this._updatePoints();
	}
	start() {
		this.isRunning() || (this._paused ? (this._paused = !1, this._last = null, this._rafId = requestAnimationFrame(this._step), this._emit("start")) : this._begin());
	}
	pause() {
		this._rafId === null || this._paused || (cancelAnimationFrame(this._rafId), this._rafId = null, this._paused = !0, this._last = null, this._emit("pause"));
	}
	restart() {
		this._begin();
	}
	stop() {
		let e = this.isRunning() || this._paused;
		this._halt(), this._resetTimer = setTimeout(() => {
			this._resetTimer = null, this._graph.update(), this._updatePoints();
		}, 200), e && this._emit("stop");
	}
	dispose() {
		this._halt(), this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [];
	}
	onFiguresRemoved(e) {
		let t = (t) => t instanceof g && e.includes(t.name);
		for (let [e, n] of this._animations) {
			let r = n.point.animate;
			(t(n.point) || t(r?.from) || t(r?.to)) && this._animations.delete(e);
		}
		this._animatedPoints = [...this._animations.values()].map((e) => e.point), this._animations.size === 0 && (this.isRunning() || this._paused) && (this._halt(), this._emit("stop"));
	}
	isRunning() {
		return this._rafId !== null && !this._paused;
	}
	isPaused() {
		return this._paused;
	}
	canBeAnimated() {
		return !this.isRunning() && !this._paused && this._updatePoints(), this._animations.size > 0;
	}
	on(e, t) {
		return this.addEventListener(e, t), this;
	}
	off(e, t) {
		return this.removeEventListener(e, t), this;
	}
	_emit(e) {
		this.dispatchEvent(new CustomEvent(e));
	}
	_begin() {
		this._halt(), this._updatePoints(), this._rafId = requestAnimationFrame(this._step), this._emit("start");
	}
	_halt() {
		this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._resetTimer !== null && (clearTimeout(this._resetTimer), this._resetTimer = null), this._paused = !1, this._last = null;
	}
	_updatePoints() {
		return this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [], Object.values(this._graph.figures).forEach((e) => {
			if (!(e instanceof g) || e.animate === null) return;
			let { from: t, to: n, duration: r, delay: i, easing: a, loop: o } = e.animate;
			t instanceof g && n instanceof g && (this._animations.set(e.name, {
				point: e,
				start: t,
				end: n,
				reversed: !1,
				duration: r * 1e3,
				delay: i * 1e3,
				ease: ne[a],
				loop: o,
				elapsed: 0
			}), this._animatedPoints.push(e));
		}), this._animatedPoints;
	}
	_step = (e) => {
		if (this._paused) return;
		let t = this._last === null ? 0 : Math.min(Math.max(e - this._last, 0), Pt);
		this._last = e;
		let n = !1;
		for (let e of this._animations.values()) {
			e.elapsed += t;
			let r = e.reversed ? e.end.pixels : e.start.pixels, i = e.reversed ? e.start.pixels : e.end.pixels;
			if (e.elapsed < e.delay) {
				e.point.pixels = r, n = !0;
				continue;
			}
			let a = e.elapsed - e.delay, o = Math.min(a / e.duration, 1), s = e.ease(o);
			e.point.pixels = {
				x: r.x + (i.x - r.x) * s,
				y: r.y + (i.y - r.y) * s
			}, o < 1 ? n = !0 : e.loop === _.RESET ? (e.point.pixels = r, e.elapsed = 0, n = !0) : e.loop === _.REVERSE && (e.reversed = !e.reversed, e.elapsed = 0, n = !0);
		}
		this._graph.update(this._animatedPoints), n ? this._rafId = requestAnimationFrame(this._step) : (this._rafId = null, this._emit("end"));
	};
}, It = [
	"both",
	"zoom",
	"move"
], Lt = 1.25, Rt = .0015, zt = class extends EventTarget {
	allow;
	gestures;
	_graph;
	_home;
	_own = !1;
	_navigating = !1;
	_layer = null;
	_pending = null;
	_frame = null;
	_pointers = /* @__PURE__ */ new Map();
	constructor(e, t = {}) {
		super();
		let n = t.allow ?? "both";
		if (!It.includes(n)) throw new S(`Invalid zoom allow ${n}: expected ${It.join(", ")}`);
		this.allow = n, this.gestures = t.gestures ?? !1, this._graph = e, e.attach(this), this._home = structuredClone(e.config), this.gestures && this.canZoom && e.rootSVG.node.addEventListener("wheel", this._ctrlWheel, { passive: !1 });
	}
	get canZoom() {
		return this.allow !== "move";
	}
	get canMove() {
		return this.allow !== "zoom";
	}
	get window() {
		return Mt(this._graph.config);
	}
	get scale() {
		return z(this._graph.config, this._home);
	}
	zoomIn(e = Lt, t) {
		this._zoom(e, t);
	}
	zoomOut(e = Lt, t) {
		if (!Number.isFinite(e) || e <= 0) throw new S(`Invalid zoom factor ${e}: expected a finite number greater than 0`);
		this._zoom(1 / e, t);
	}
	zoomTo(e) {
		this._requireZoom(), this._requireMove();
		let t = jt(this._current(), e), n = z(t, this._home), r = (e) => e < wt.min || e > wt.max;
		if (r(n.x) || r(n.y)) throw new S("This window needs units more than a hundred times shorter or longer than the ones at the start");
		this._apply(t);
	}
	moveOrigin(e, t) {
		this._requireMove(), this._apply(At(this._current(), {
			x: e,
			y: t
		}));
	}
	reset() {
		this._apply(structuredClone(this._home));
	}
	get navigating() {
		return this._navigating;
	}
	set navigating(e) {
		if (!this.gestures) throw new we("This zoom was made without gestures: made it with {gestures: true} to navigate with the mouse and the fingers");
		e !== this._navigating && (e ? this._enter() : this._leave(), this._navigating = e, this._emit("navigation", e));
	}
	dispose() {
		this._cancelFrame(), this._pending = null, this._removeLayer(), this._graph.rootSVG.node.removeEventListener("wheel", this._ctrlWheel), this._navigating = !1;
	}
	onLayoutChanged(e) {
		this._own || (this._home = structuredClone(e), this._pending = null, this._cancelFrame()), this._layer?.size(e.width, e.height), this._emit("change", this.window);
	}
	on(e, t) {
		return this.addEventListener(e, t), this;
	}
	off(e, t) {
		return this.removeEventListener(e, t), this;
	}
	_emit(e, t) {
		this.dispatchEvent(new CustomEvent(e, { detail: t }));
	}
	_requireZoom() {
		if (!this.canZoom) throw new we("This zoom may only move (allow: \"move\"): it cannot change the length of a unit");
	}
	_requireMove() {
		if (!this.canMove) throw new we("This zoom may only zoom (allow: \"zoom\"): the origin stays where it is");
	}
	_current() {
		return this._pending ?? this._graph.config;
	}
	_fixed(e) {
		let t = this._current();
		return this.allow === "zoom" ? t.origin : e ?? {
			x: t.width / 2,
			y: t.height / 2
		};
	}
	_zoom(e, t) {
		this._requireZoom();
		let n = this._current(), r = Nt(e, z(n, this._home));
		r !== 1 && this._apply(kt(n, r, this._fixed(t)));
	}
	_apply(e) {
		this._pending = null, this._cancelFrame();
		let t = this._graph.config;
		if (e.origin.x !== t.origin.x || e.origin.y !== t.origin.y || e.axis.x.x !== t.axis.x.x || e.axis.x.y !== t.axis.x.y || e.axis.y.x !== t.axis.y.x || e.axis.y.y !== t.axis.y.y) {
			this._own = !0;
			try {
				this._graph.updateLayout(e);
			} finally {
				this._own = !1;
			}
		}
	}
	_cancelFrame() {
		this._frame !== null && (cancelAnimationFrame(this._frame), this._frame = null);
	}
	_enter() {
		let { width: e, height: t } = this._graph.config, n = this._graph.rootSVG.rect(e, t).fill({
			color: "#000",
			opacity: 0
		}).attr({ "pointer-events": "all" });
		n.css({
			touchAction: "none",
			cursor: this.canMove ? "grab" : "default"
		});
		let r = n.node;
		r.addEventListener("pointerdown", this._down), r.addEventListener("pointermove", this._moved), r.addEventListener("pointerup", this._up), r.addEventListener("pointercancel", this._up), r.addEventListener("wheel", this._wheel, { passive: !1 }), this._layer = n;
	}
	_leave() {
		this._flushNow(), this._pointers.clear(), this._removeLayer();
	}
	_removeLayer() {
		this._layer?.remove(), this._layer = null, this._pointers.clear();
	}
	_local(e) {
		let t = this._graph.rootSVG.node.getBoundingClientRect(), { width: n, height: r } = this._graph.config;
		return {
			x: t.width > 0 ? (e.clientX - t.left) * n / t.width : e.clientX,
			y: t.height > 0 ? (e.clientY - t.top) * r / t.height : e.clientY
		};
	}
	_schedule(e) {
		this._pending = e, this._frame ??= requestAnimationFrame(this._flush);
	}
	_flush = () => {
		this._frame = null, this._flushNow();
	};
	_flushNow() {
		let e = this._pending;
		this._cancelFrame(), this._pending = null, e !== null && this._apply(e);
	}
	_down = (e) => {
		if (e.pointerType !== "mouse" || e.button === 0) {
			e.preventDefault();
			try {
				this._layer?.node.setPointerCapture(e.pointerId);
			} catch {}
			this._pointers.set(e.pointerId, this._local(e)), this.canMove && this._layer?.css({ cursor: "grabbing" });
		}
	};
	_moved = (e) => {
		let t = this._pointers.get(e.pointerId);
		if (t === void 0) return;
		let n = this._local(e), r = [...this._pointers.values()];
		this._pointers.set(e.pointerId, n), e.preventDefault(), r.length === 1 ? this.canMove && this._schedule(At(this._current(), {
			x: n.x - t.x,
			y: n.y - t.y
		})) : this._pinch([r[0], r[1]], [...this._pointers.values()].slice(0, 2));
	};
	_up = (e) => {
		this._pointers.delete(e.pointerId), this._pointers.size === 0 && this.canMove && this._layer?.css({ cursor: "grab" });
	};
	_pinch(e, t) {
		let n = ([e, t]) => ({
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		}), r = ([e, t]) => Math.hypot(e.x - t.x, e.y - t.y), i = this._current();
		if (this.canZoom && r(e) > 0 && r(t) > 0) {
			let a = Nt(r(t) / r(e), z(i, this._home));
			a !== 1 && (i = kt(i, a, this._fixed(n(e))));
		}
		if (this.canMove) {
			let r = n(e), a = n(t);
			i = At(i, {
				x: a.x - r.x,
				y: a.y - r.y
			});
		}
		this._schedule(i);
	}
	_wheel = (e) => {
		this.canZoom && (e.preventDefault(), this._wheelBy(e));
	};
	_ctrlWheel = (e) => {
		!this._navigating && e.ctrlKey && (e.preventDefault(), this._wheelBy(e));
	};
	_wheelBy(e) {
		let t = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1, n = Math.exp(-e.deltaY * t * Rt);
		if (!Number.isFinite(n) || n <= 0) return;
		let r = this._current(), i = Nt(n, z(r, this._home));
		i !== 1 && this._schedule(kt(r, i, this._fixed(this._local(e))));
	}
}, Bt = (e) => (e.changedTouches && (e = e.changedTouches[0]), {
	x: e.clientX,
	y: e.clientY
}), Vt = class {
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
		e.preventDefault(), e.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Bt(e));
		let n = (t ? "mousemove" : "touchmove") + ".drag", r = (t ? "mouseup" : "touchend") + ".drag";
		Ve(window, n, this.drag, this, { passive: !1 }), Ve(window, r, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", {
			event: e,
			handler: this,
			box: this.box
		});
	}
	drag(e) {
		let { box: t, lastClick: n } = this, r = this.el.point(Bt(e)), i = r.x - n.x, a = r.y - n.y;
		if (!i && !a) return t;
		let o = t.x + i, s = t.y + a;
		this.box = new ze(o, s, t.w, t.h), this.lastClick = r, !this.el.dispatch("dragmove", {
			event: e,
			handler: this,
			box: this.box,
			dx: i,
			dy: a
		}).defaultPrevented && this.move(o, s);
	}
	move(e, t) {
		this.el.type === "svg" ? ge.prototype.move.call(this.el, e, t) : this.el.move(e, t);
	}
	endDrag(e) {
		this.drag(e), this.el.fire("dragend", {
			event: e,
			handler: this,
			box: this.box
		}), a(window, "mousemove.drag"), a(window, "touchmove.drag"), a(window, "mouseup.drag"), a(window, "touchend.drag"), this.init(!0);
	}
};
ae(We, { draggable(e = !0) {
	return (this.remember("_draggable") || new Vt(this)).init(e), this;
} });
// src/figures/Polygon/Polygon.constraints.ts
var Ht = 1e3;
function Ut(e, t) {
	if (!Number.isInteger(e) || e < 3 || e > 1e3) throw new S(`Invalid number of sides ${e}: expected an integer from 3 to ${Ht}`);
	if (t !== void 0 && (!Number.isInteger(t) || t < 1 || 2 * t >= e)) throw new S(`Invalid star ${t} for ${e} sides: expected an integer from 1 to less than ${e / 2}`);
	return t ?? 1;
}
var Wt = {
	vertices: (e) => {
		if (!Array.isArray(e) || e.length < 3) throw new S(`A polygon needs at least 3 vertices, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = Ge(e, "vertex of the polygon");
		return t.some((e) => !Number.isFinite(e.x) || !Number.isFinite(e.y)) ? null : {
			vertices: t.map((e) => ({
				x: e.x,
				y: e.y
			})),
			cycles: [t.map((e, t) => t)]
		};
	},
	regular: ({ center: e, radius: t, sides: n, star: i }, a) => {
		let o = Ut(n, i), s = r({ center: e }, "polygon").center;
		return _t(s, se(t, s, a), n, o);
	},
	onSide: ({ A: e, B: t, sides: n, star: i }) => {
		let a = Ut(n, i), o = r({
			A: e,
			B: t
		}, "side of the polygon");
		return vt(o.A, o.B, n, a);
	}
};
function Gt(e, t) {
	return x(Wt, e, t, "polygon");
}
function Kt(e, t, n) {
	return f(Wt, e, t, n);
}
// src/figures/Polygon/Polygon.ts
var qt = class e extends C {
	constructor(t, n, r) {
		Kt(Gt(r, n), r, t.config), super(t, n), this._config = e._copy(r), this._polygon = null, this._makeShape(), this.computed();
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
		let n = Kt(Gt(t, this.name), t, this.graphConfig);
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
		return this._polygon === null ? E() : yt(this._polygon.vertices);
	}
	computed() {
		return this._place(Kt(Gt(this._config, this.name), this._config, this.graphConfig));
	}
	_place(e) {
		return this._polygon = e, this._setDefined(e !== null), this.shape.plot(e === null ? "M 0 0" : xt(e)), this;
	}
	followable = !0;
	follow(e, t) {
		return this._polygon === null ? E() : bt(this._polygon, {
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
};
// src/figures/Parametric/Parametric.constraints.ts
function Jt(e, t, n) {
	if (typeof e != "string") throw new S(`Invalid function ${JSON.stringify(e)} of ${t} for the curve "${n}": expected text`);
	return Ce(e, "t", `of ${t} of the curve "${n}"`);
}
function Yt(e, n) {
	t(e, n);
	let r = e.expressions;
	if (typeof r != "object") throw new S(`The curve "${n}" needs its functions: {expressions: {x, y}}`);
	return {
		x: Jt(r.x, "x", n),
		y: Jt(r.y, "y", n)
	};
}
// src/figures/Parametric/Parametric.ts
var Xt = {
	min: 0,
	max: 2 * Math.PI
}, Zt = 64, Qt = class extends C {
	constructor(e, t, n) {
		let r = Yt(n, t);
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
		let t = Yt(e, this.name);
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
		return j(this.valueAt(e), this.graphConfig);
	}
	_draw() {
		let t = this.graphConfig, { width: n, height: r } = t, i = this._config.domain ?? Xt, a = r * (this._config.asymptoteThreshold ?? 10), o = { t: 0 }, s = (e) => {
			o.t = e;
			let n = this._numExp.x.evaluate(o), r = this._numExp.y.evaluate(o);
			return Number.isFinite(n) && Number.isFinite(r) ? j({
				x: n,
				y: r
			}, t) : E();
		}, c = this._config.samples === void 0 ? Math.max(Zt, (i.max - i.min) * Math.abs(t.axis.x.x) / 8) : (i.max - i.min) * this._config.samples, l = e(s, i.min, i.max, {
			intervals: c,
			tolerance: this._config.tolerance ?? .5,
			maxDepth: this._config.maxDepth ?? 6,
			view: {
				left: 0,
				right: n,
				top: 0,
				bottom: r
			},
			bound: a
		});
		return this.shape.plot(m(l, a)), this._range = {
			from: i.min,
			to: i.max,
			intervals: c
		}, this._points = l, this._labelAnchor = le(l, n, r), this;
	}
	_points;
	followable = !0;
	follow(e, t) {
		return de(this._points, {
			x: e,
			y: t
		});
	}
	_range;
	_labelAnchor;
	_labelPlace({ point: e, direction: t }) {
		return fe(e, t, this._labelGap);
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
		let { definitions: e, options: t } = this._tikzCurveStyle(), n = this._tikzView(), r = (e) => Re(e, 5), i = ([e, t]) => [e - (t - e), t + (t - e)], a = { t: "x" }, o = [
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
function $t(e, t) {
	let n = e.follow;
	if (!(n instanceof C)) throw new S(`The point "${t}" needs a figure to follow`);
	if (!n.followable) throw new S(`The point "${t}" cannot follow the figure "${n.name}": a point follows a line, a circle, a plot or a parametric curve`);
	if (e.size !== void 0 && !(typeof e.size == "number" && Number.isFinite(e.size) && e.size > 0)) throw new S(`Invalid size ${JSON.stringify(e.size)} for the point "${t}": expected a finite number greater than 0`);
	let r = e.at;
	if (r !== void 0 && (typeof r != "object" || typeof r.x != "number" || typeof r.y != "number")) throw new S(`Invalid starting position ${JSON.stringify(r)} for the point "${t}": expected a position {x, y}`);
}
// src/figures/Follow/Follow.ts
var en = class extends C {
	_labelGap = 12;
	constructor(e, t, n) {
		$t(n, t), super(e, t), this.appearance.fill.color = "black", this._config = { ...n }, this._mouse = null, this._state = null, this._listener = (e) => {
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
		$t(e, this.name), this._config = { ...e }, this._makeShape(), this.computed(), this.updateLabel();
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
		if (!I(n)) return this._state = null, this._point?.hide(), this._tangent?.hide(), this;
		this._state = {
			point: {
				x: n.x,
				y: n.y
			},
			direction: ue((t, n) => e.follow(t, n), n)
		}, this._point?.show().center(n.x, n.y);
		let r = this._tangentLine();
		return r === null ? this._tangent?.hide() : this._tangent?.show().plot(r[0].x, r[0].y, r[1].x, r[1].y), this;
	}
	_tangentLine() {
		let e = this._state?.direction;
		if (this._config.tangent !== !0 || this._state === null || !e) return null;
		let { width: t, height: n } = this.graphConfig, r = De(this._state.point, e, t, n);
		return r === null ? null : Ie(r[0], r[1], t, n);
	}
	moveLabel() {
		if (!this.label || this._state === null) return this;
		let { point: e, alignement: t } = this._labelPlace(this._state);
		return this.label.alignementGiven || (this.label.config.alignement = t), this.label.move(e.x, e.y), this;
	}
	_labelPlace({ point: e, direction: t }) {
		return fe(e, t ?? {
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
function tn(e) {
	return h(e.domain, [e.plot, e.other].flatMap((e) => e === void 0 ? [] : [e]));
}
function nn(e, t) {
	let n = e.plot, r = e.other;
	if (!(n instanceof M)) throw new S(`The area "${t}" needs a plot`);
	if (r !== void 0 && !(r instanceof M)) throw new S(`The area "${t}" can only be between plots, got ${JSON.stringify(r)} as the second one`);
	if (e.domain !== void 0 && !(A(e.domain) && Number.isFinite(e.domain.min) && Number.isFinite(e.domain.max))) throw new S(`Invalid domain ${JSON.stringify(e.domain)} for the area "${t}": expected finite numbers`);
	let i = tn(e);
	if (i !== null && i.min >= i.max) throw new S(e.domain === void 0 ? `The plots of the area "${t}" have no abscissa in common: give a domain` : `Invalid domain ${JSON.stringify(e.domain)} for the area "${t}": the minimum must be below the maximum`);
}
// src/figures/FillBetween/FillBetween.ts
var rn = .5, an = 6, on = 10, sn = class e extends C {
	constructor(t, n, r) {
		nn(r, n), super(t, n), this._config = e._copy(r), this._runs = [], this._range = null, this._makeShape(), this.computed();
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
		nn(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
	}
	_runs;
	_range;
	get area() {
		if (this._runs.length === 0) return NaN;
		let { x: e, y: t } = this.graphConfig.axis;
		return Ze(this._runs) / Math.abs(e.x * t.y);
	}
	computed() {
		let e = this.graphConfig, { origin: t, width: n, height: r } = e, i = e.axis.x.x;
		this._runs = [], this._range = null;
		let a = {
			min: -t.x / i - 1,
			max: (n - t.x) / i + 1
		}, o = tn(this._config) ?? a, s = Math.max(o.min, a.min), c = Math.min(o.max, a.max);
		if (s < c) {
			let { plot: a, other: o } = this._config, l = (c - s) * Math.abs(i) / 8;
			this._runs = Ye((e) => a.evaluate(e), o === void 0 ? null : (e) => o.evaluate(e), t.y, {
				min: s,
				max: c
			}, (t) => Ne({
				x: t,
				y: 0
			}, e).x, {
				intervals: l,
				tolerance: rn,
				maxDepth: an,
				view: {
					left: 0,
					right: n,
					top: 0,
					bottom: r
				},
				bound: r * on
			}), this._range = this._runs.length === 0 ? null : {
				from: s,
				to: c,
				intervals: l
			};
		}
		return this._setDefined(this._runs.length > 0), this.shape.plot(Xe(this._runs)), this;
	}
	labelFields() {
		return { area: (e) => Re(this.area, e).toString() };
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
		let { definitions: r, options: i } = this._tikzStyle(), { plot: a, other: o } = this._config, [s, c] = this._tikzView().y, l = (e) => Re(e, 5), u = `pidraw-${this.name}-1`, d = `pidraw-${this.name}-2`, f = (r, i) => `\\addplot[name path=${r}, draw=none, domain=${l(e)}:${l(t)}, samples=${this._tikzSamples(n)}] {${i.numExp.toPgf()}};`;
		return [...r, ...this._tikzAxis([
			f(u, a),
			o === void 0 ? `\\path[name path=${d}] (axis cs:${l(e)},0) -- (axis cs:${l(t)},0);` : f(d, o),
			`\\addplot[${i.join(", ")}] fill between[of=${u} and ${d}];`
		], { y: [s - (c - s), c + (c - s)] })].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, cn = 1e3;
function ln(e) {
	return h(e.domain, [e.plot]);
}
function un(e, t) {
	if (!(e.plot instanceof M)) throw new S(`The Riemann sum "${t}" needs a plot`);
	let n = ln(e);
	if (n === null) throw new S(`The Riemann sum "${t}" needs a domain: give one, or give a domain to the plot "${e.plot.name}"`);
	if (!A(n) || !Number.isFinite(n.min) || !Number.isFinite(n.max) || n.min >= n.max) throw new S(`Invalid domain ${JSON.stringify(n)} for the Riemann sum "${t}": expected finite numbers with the minimum below the maximum`);
	let { rectangles: r, position: i } = e;
	if (r !== void 0 && !(Number.isInteger(r) && r >= 1 && r <= 1e3)) throw new S(`Invalid number of rectangles ${JSON.stringify(r)} for the Riemann sum "${t}": expected an integer from 1 to ${cn}`);
	if (i !== void 0 && !(typeof i == "number" && i >= 0 && i <= 1)) throw new S(`Invalid position ${JSON.stringify(i)} for the Riemann sum "${t}": expected a number from 0 (left) to 1 (right)`);
}
// src/figures/Riemann/Riemann.ts
var dn = class e extends C {
	_labelGap = 6;
	constructor(t, n, r) {
		un(r, n), super(t, n), this._config = e._copy(r), this._rectangles = [], this._makeShape(), this.computed();
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
		un(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
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
		return this._rectangles.length === 0 ? NaN : Ct(this._rectangles);
	}
	computed() {
		let e = ln(this._config), t = this._config.plot;
		return this._rectangles = e === null ? [] : St((e) => t.valueAt(e), e, this.rectangles, this.position), this._setDefined(this._rectangles.length > 0), this.shape.plot(this._path()), this;
	}
	_path() {
		if (this._rectangles.length === 0) return "M 0 0";
		let e = (e, t) => {
			let n = j({
				x: e,
				y: t
			}, this.graphConfig);
			return `${b(n.x)} ${b(n.y)}`;
		};
		return this._rectangles.map(({ x0: t, x1: n, y: r }) => `M ${e(t, 0)} L ${e(n, 0)} L ${e(n, r)} L ${e(t, r)} Z`).join(" ");
	}
	_labelPlace() {
		let e = ln(this._config);
		if (e === null || this._rectangles.length === 0) return null;
		let t = Math.max(0, ...this._rectangles.map(({ y: e }) => e)), { x: n, y: r } = j({
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
			sum: (e) => Re(this.sum, e).toString(),
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
		let n = (e, t) => `(${this._tikzCoordinates(j({
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
function fn(e, t) {
	let n = e.d, r = e.units;
	if (typeof n != "string") throw new S(`Invalid data ${JSON.stringify(n)} for the path "${t}": expected the text of an SVG path`);
	if (r !== void 0 && typeof r != "boolean") throw new S(`Invalid units ${JSON.stringify(r)} for the path "${t}": expected true or false`);
	return dt(n);
}
// src/figures/Path/Path.ts
var pn = (e) => e.reduce((t, n, r) => r === 0 ? 0 : t + Math.hypot(n.x - e[r - 1].x, n.y - e[r - 1].y), 0), mn = class extends C {
	constructor(e, t, n) {
		let r = fn(n, t);
		super(e, t), this._config = { ...n }, this._commands = r, this._pixels = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = fn(e, this.name);
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
		return this._pixels = this._config.units === !0 ? ft(this._commands, (t) => j(t, e)) : this._commands, this._setDefined(this._pixels.length > 0), this.shape.plot(this._pixels.length === 0 ? "M 0 0" : pt(this._pixels)), this;
	}
	followable = !0;
	follow(e, t) {
		let n = E(), r = Infinity;
		for (let i of mt(this._pixels)) {
			let a = de(je(i), {
				x: e,
				y: t
			}), o = Math.hypot(a.x - e, a.y - t);
			o < r && (r = o, n = a);
		}
		return n;
	}
	_labelPlace() {
		let e = mt(this._pixels).map((e) => ({
			piece: e,
			length: pn(je(e))
		})).reduce((e, t) => e === null || t.length > e.length ? t : e, null), t = e === null ? null : ee(e.piece);
		return t === null ? null : fe(t.point, t.direction, this._labelGap);
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
}, hn = "MAINGRID", gn = "-edge", _n = [
	hn,
	D.X,
	D.Y,
	`${D.X}${gn}`,
	`${D.Y}${gn}`
], vn = 5;
function yn(e, t = vn) {
	if (e instanceof C) return [e];
	if (t === 0 || typeof e != "object" || !e) return [];
	let n = Object.getPrototypeOf(e);
	return !Array.isArray(e) && n !== Object.prototype && n !== null ? [] : [...new Set(Object.values(e).flatMap((e) => yn(e, t - 1)))];
}
var bn = class extends EventTarget {
	_controllers = [];
	_layout;
	_decor = [];
	_lines = /* @__PURE__ */ new Map();
	_held = /* @__PURE__ */ new Set();
	_drags = /* @__PURE__ */ new Map();
	_total = 0;
	_links = /* @__PURE__ */ new Map();
	_dependents = null;
	constructor(e, t) {
		super();
		let { config: n, display: r } = nt(t), i = typeof e == "string" ? document.getElementById(e) : e;
		if (i === null) throw new S(`Cannot find the element "${e}" to draw the graph in`);
		let a = document.createElement("DIV");
		a.style.position = "relative", a.style.width = "100%", a.style.height = "auto", a.style.userSelect = "none", i.appendChild(a), this._wrapper = a, this._config = n, this._display = r, this._toTex = t?.tex, this._rootSVG = He().addTo(a), this._fitSvg(), this._rootSVG.defs(), this._layers = {}, Object.values(F).forEach((e) => {
			this._layers[e] = this._rootSVG.group().attr("id", `LAYER_${e}`);
		}), this._figures = Object.create(null);
		try {
			this._layout = this._makeLayout();
		} catch (e) {
			throw a.remove(), e;
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
			point: (e, t, n) => {
				let r = xe(e) ? { coordinates: e } : e, i = this._make(t, F.POINTS, () => new g(this, t, r));
				return n && i.addLabel(t, {
					asHtml: n.html,
					...this._toTex === void 0 ? {} : { texConverter: this._toTex }
				}), i;
			},
			line: this._maker(u, F.MAIN),
			path: this._maker(mn, F.MAIN),
			bezier: this._maker(Be, F.MAIN),
			plot: this._maker(M, F.PLOTS),
			parametric: this._maker(Qt, F.PLOTS),
			circle: this._maker(v, F.MAIN),
			polygon: this._maker(qt, F.MAIN),
			arc: this._maker(oe, F.MAIN),
			follow: this._maker(en, F.PLOTS_FOREGROUND),
			fillbetween: this._maker(sn, F.PLOTS_BACKGROUND),
			grid: this._maker(c, F.GRIDS),
			axis: this._maker(y, F.MAIN),
			riemann: this._maker(dn, F.PLOTS_BACKGROUND)
		};
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
		if (!Object.hasOwn(this._figures, e)) throw new S(`There is no figure named "${e}" to remove`);
		let n = this._figures[e], r = this._affectedBy([n]);
		if (r.length > 0 && t?.cascade !== !0) {
			let t = r.map((e) => `"${e.name}"`).join(", ");
			throw new S(`Cannot remove the figure "${e}": ${t} depend on it (remove them first, or use {cascade: true})`);
		}
		let i = [...r.reverse(), n];
		i.forEach((e) => {
			this._detach(e);
		});
		let a = i.map((e) => e.name);
		return this._notifyRemoved(a), a;
	}
	attach(e) {
		if (this._controllers.some((t) => t.constructor === e.constructor)) throw new S(`A ${e.constructor.name} is already attached to this graph`);
		return this._controllers.push(e), e;
	}
	clear() {
		let e = Object.keys(this._figures);
		Object.values(this._figures).forEach((e) => {
			this._detach(e);
		}), this._notifyRemoved(e);
	}
	_notifyRemoved(e) {
		e.length !== 0 && this._controllers.forEach((t) => {
			t.onFiguresRemoved?.(e);
		});
	}
	dispose() {
		this.clear(), this._controllers.forEach((e) => {
			e.dispose();
		}), this._controllers = [], this._clearLayout(), this._lines.forEach((e) => {
			e.dispose(), e.element.remove();
		}), this._lines.clear(), this._wrapper.remove();
	}
	handle(e, t = {}) {
		let n = this.create.point({
			x: 0,
			y: 0
		}, `${e.name}_drag`);
		try {
			return n.pixels = e.pixels, n.asCircle(30).fill({
				color: "white",
				opacity: .8
			}), this.layers.interactive.add(n.element), this.draggable(n, {
				target: e,
				...t
			});
		} catch (e) {
			throw this.remove(n.name), e;
		}
	}
	dragTo(e, t) {
		let n = this._drags.get(e);
		if (n === void 0) throw new S(`The point "${e.name}" cannot be dragged: make it draggable first`);
		this._dragMove(n.figure, n.options, t);
	}
	_dragMove(e, t, n) {
		let { along: r, bounds: i, callback: a, follow: o = [], grid: s, target: c } = t, l = qe({
			x: Math.max(0, Math.min(n.x, this._config.width)),
			y: Math.max(0, Math.min(n.y, this._config.height))
		}, {
			...r ? { along: {
				axis: r,
				keep: (c ?? e).pixels
			} } : {},
			...i ? { bounds: i } : {},
			...s ? { step: this._gridStep() } : {}
		}, this._config);
		for (let e of o) l = e instanceof C ? e.follow(l.x, l.y) : e(l.x, l.y);
		return e.pixels.x === l.x && e.pixels.y === l.y ? null : (e.pixels = l, c && (c.pixels = l), a && a(e), this.update(c ? [e, c] : [e]));
	}
	draggable(e, t = {}) {
		this._checkDraggable(e, t);
		let n = t.target ?? e;
		return this._drags.set(e, {
			figure: e,
			options: t
		}), t.target && this._drags.set(t.target, {
			figure: e,
			options: t
		}), this._held.add(e), this._held.add(n), this._layers.interactive.add(e.element), e.isDraggable = !0, e.shape.draggable().on("dragstart", () => {
			this._emit("dragstart", {
				graph: this,
				figure: e,
				target: n
			});
		}).on("dragmove", (r) => {
			r.preventDefault();
			let { box: i } = r.detail, a = this._dragMove(e, t, {
				x: i.x + i.width / 2,
				y: i.y + i.height / 2
			});
			a !== null && this._emit("dragmove", {
				graph: this,
				figure: e,
				target: n,
				...a
			});
		}).on("dragend", () => {
			this._emit("dragend", {
				graph: this,
				figure: e,
				target: n
			});
		}), e;
	}
	toPixels(e, t) {
		return j(e, this.config, t);
	}
	toCoordinates(e, t) {
		return Ne(e, this.config, t);
	}
	update(e, t) {
		let n = 0;
		if (e === void 0) return Object.values(this._figures).forEach((e) => {
			n += +!!this._refresh(e, t);
		}), {
			updated: n,
			total: this._total
		};
		let r = e instanceof C ? [e] : e;
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
		e !== void 0 && rt(e);
		let n = Object.values(this._figures).filter((e) => e instanceof g && e.isMoved()).map((e) => ({
			point: e,
			coordinates: e.coordinates
		})), r = {
			config: this._config,
			display: this._display
		};
		try {
			this._config = e ?? this._config, this._display = t ?? this._display, this._fitSvg(), this._layout = this._makeLayout();
		} catch (e) {
			throw this._config = r.config, this._display = r.display, this._fitSvg(), this._layout = this._makeLayout(), e;
		}
		this.update(void 0, !0);
		let i = n.filter(({ coordinates: e }) => I(e));
		i.forEach(({ point: e, coordinates: t }) => {
			e.pixels = this.toPixels(t);
		}), i.length > 0 && this.update(i.map(({ point: e }) => e)), this._controllers.forEach((e) => {
			e.onLayoutChanged?.(this._config);
		});
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
		for (let n of Object.values(F)) n !== F.INTERACTIVE && this._layers[n].children().forEach((n) => {
			let r = e.get(n.node);
			r && t.push(r.tikz());
		});
		return d(this._config, t);
	}
	tikzPreamble() {
		return ce;
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
		return o(typeof e == "object" ? e : {});
	}
	_checkDraggable(e, t) {
		if (!(e instanceof g)) {
			let t = e instanceof C ? `"${e.name}" is a ${e.constructor.name}` : "it is not a figure";
			throw new S(`Only a point can be made draggable: ${t}`);
		}
		if (this._held.has(e) || e.isDraggable) throw new S(`The point "${e.name}" is already draggable`);
		let { along: n, bounds: r, follow: i, target: a } = t;
		if (n !== void 0 && n !== "x" && n !== "y") throw new S(`Invalid along ${JSON.stringify(n)} for the point "${e.name}": expected 'x' or 'y'`);
		if (a !== void 0 && !(a instanceof g)) throw new S(`The target of the point "${e.name}" must be a point`);
		if (i !== void 0 && (!Array.isArray(i) || i.some((e) => typeof e != "function" && !(e instanceof C)))) throw new S(`The follow of the point "${e.name}" must be a list of functions and figures`);
		for (let [t, n] of Object.entries(r ?? {})) if (n !== void 0 && !(Number.isFinite(n.min) && Number.isFinite(n.max))) throw new S(`Invalid bounds ${t} ${JSON.stringify(n)} for the point "${e.name}": expected {min, max}, two finite numbers`);
	}
	_detach(e) {
		e.dispose(), e.element.remove(), delete this._figures[e.name], this._total--, this._held.delete(e), this._drags.forEach((t, n) => {
			(n === e || t.figure === e) && this._drags.delete(n);
		}), this._links.delete(e), this._dependents = null;
	}
	_dependentsMap() {
		let e = Object.values(this._figures), t = this._dependents === null;
		for (let n of e) this._links.get(n)?.config !== n.config && (this._links.set(n, {
			config: n.config,
			dependencies: yn(n.config)
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
				if (t === "visiting") throw new S(`The figure "${r.name}" depends on itself, through "${e.name}"`);
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
		this._mainGrid = e ? this._decorate(new c(this, hn, e === !0 ? {} : e), F.GRIDS) : null;
		let { origin: t, axis: n, width: r, height: i } = this._config, a = p(this._display.axis), o = ot(t, r, i, n), s = this._makeLayoutAxis(D.X, n.x, a.x, o.x), l = this._makeLayoutAxis(D.Y, n.y, a.y, o.y);
		return (/* @__PURE__ */ new Set([
			s.line,
			s.drawn,
			l.line,
			l.drawn
		])).forEach((e) => {
			this._layers.axis.add(e.element);
		}), {
			axes: {
				x: s.line,
				y: l.line
			},
			drawn: {
				x: s.drawn,
				y: l.drawn
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
			drawn: n === !1 ? i : this._makeAxis(`${e}${gn}`, t, r.A, n, r.side)
		};
	}
	_makeAxis(e, t, n, r, i, a = !1) {
		let o = te({
			A: n,
			d: t
		}, i, r), s = a ? this._lines.get(e) : void 0;
		return s ? (s.resetStyle(), s.config = o) : a ? (s = new y(this, e, o), this._layers.axis.add(s.element), this._lines.set(e, s)) : s = this._decorate(new y(this, e, o), F.AXIS), s.static = !0, r === !1 ? s.hide() : s;
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
		if (typeof t != "string" || t.trim() === "") throw new S(`Invalid name ${JSON.stringify(t)} for a figure: expected a text`);
		if (_n.includes(e)) throw new S(`The name "${e}" is the one of a figure of the layout of the graph (the grid and the axes): choose another name`);
		if (Object.hasOwn(this._figures, e)) throw new S(`There is already a figure named "${e}"`);
	}
}, xn = "circle", Sn = "a center and a radius (a number, a point or A:B), a center and a line or an axis, three points (with a last * for the inscribed circle), or A:B for a diameter";
function Cn(e, t) {
	if (e.key !== P.CIRCLE.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a circle`);
	return {
		create: xn,
		config: wn(O(e.values, t), e, t)
	};
}
function wn(e, t, n) {
	let r = () => k(t, Sn, e.length === 0 ? "no value" : e.map(w).join(", "));
	if (e.length === 1) {
		let t = ie(e[0], n);
		return t === null ? r() : { diameter: {
			A: t[0],
			B: t[1]
		} };
	}
	if (e.length === 2) {
		let [t, a] = e;
		if (!R(t)) return r();
		if (he(a)) return { tangent: {
			center: t,
			to: a
		} };
		let o = i(a, n);
		return o === null ? r() : {
			center: t,
			radius: o
		};
	}
	if (e.length === 3 || e.length === 4) {
		let [t, n, r, i] = e;
		if (R(t) && R(n) && R(r)) {
			if (e.length === 3) return { through: {
				A: t,
				B: n,
				C: r
			} };
			if (Ue(i)) return { inscribed: {
				A: t,
				B: n,
				C: r
			} };
		}
	}
	return r();
}
// src/figures/Line/Line.parser.ts
var Tn = "line", En = (e) => (t, n) => {
	L(n, t, 2, 2, "two points");
	let [r, i] = t;
	return R(r) && R(i) ? {
		through: {
			A: r,
			B: i
		},
		shape: e
	} : k(n, "two points", `${w(r)} and ${w(i)}`);
};
function Dn(e, t) {
	try {
		return ve(e);
	} catch (n) {
		if (n instanceof N) return k(t, "a slope, a number or a fraction", w(e));
		throw n;
	}
}
var On = (e) => (t, n) => {
	let r = "a line or an axis, and a point";
	L(n, t, 2, 2, r);
	let [i, a] = t;
	return he(i) && R(a) ? e === "perpendicular" ? { perpendicular: {
		to: i,
		through: a
	} } : { parallel: {
		to: i,
		through: a
	} } : k(n, r, `${w(i)} and ${w(a)}`);
}, kn = {
	[P.LINE]: (e, t) => {
		let n = "an equation, two points, or a point and a slope";
		if (L(t, e, 1, 2, n), e.length === 1) {
			let [r] = e;
			return typeof r == "string" ? { equation: r } : k(t, n, w(r));
		}
		let [r, i] = e;
		return R(r) && R(i) ? {
			through: {
				A: r,
				B: i
			},
			shape: "line"
		} : R(r) && (typeof i == "number" || typeof i == "string") ? {
			slope: {
				A: r,
				slope: Dn(i, t)
			},
			shape: "line"
		} : k(t, n, `${w(r)} and ${w(i)}`);
	},
	[P.SEGMENT]: En("segment"),
	[P.VECTOR]: En("vector"),
	[P.RAY]: En("ray"),
	[P.PERPENDICULAR]: On("perpendicular"),
	[P.PARALLEL]: On("parallel"),
	[P.MEDIATOR]: (e, t) => {
		L(t, e, 2, 2, "two points");
		let [n, r] = e;
		return R(n) && R(r) ? { mediator: {
			A: n,
			B: r
		} } : k(t, "two points", `${w(n)} and ${w(r)}`);
	},
	[P.TANGENT]: (e, t) => {
		let n = "a curve and a point";
		L(t, e, 2, 2, n);
		let [r, i] = e;
		return r instanceof M && R(i) ? { tangent: {
			f: r,
			A: i
		} } : k(t, n, `${w(r)} and ${w(i)}`);
	},
	[P.BISECTOR]: (e, t) => {
		let n = "two lines or axes (with a last * for the other bisector), or three points (the vertex of the angle is the second)";
		L(t, e, 2, 3, n);
		let [r, i] = e, a = e.at(2);
		return he(r) && he(i) && (a === void 0 || Ue(a)) ? a === void 0 ? { bisector: {
			d1: r,
			d2: i
		} } : { bisector: {
			d1: r,
			d2: i,
			alternative: !0
		} } : e.length === 3 && R(r) && R(i) && R(a) ? { bisector: {
			A: i,
			B: r,
			C: a
		} } : k(t, n, e.map(w).join(", "));
	}
};
function B(e, t) {
	let n = Object.hasOwn(kn, e.key) ? kn[e.key] : void 0;
	if (n === void 0) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a line`);
	return {
		create: Tn,
		config: n(O(e.values, t), e)
	};
}
var An = Object.values(P), V = "[A-Z][0-9]*", jn = [
	[RegExp(`^v(${V})(${V})$`), P.VECTOR],
	[RegExp(`^\\[(${V})(${V})\\]$`), P.SEGMENT],
	[RegExp(`^(${V})(${V})\\.$`), P.SEGMENT],
	[RegExp(`^\\[(${V})(${V})\\[$`), P.RAY],
	[RegExp(`^(${V})(${V})\\[$`), P.RAY],
	[RegExp(`^\\[(${V})(${V})$`), P.RAY],
	[RegExp(`^(${V})(${V})$`), P.LINE]
];
function Mn(e) {
	let t = e.indexOf("=");
	if (t <= 0 || e.includes(" ")) return null;
	let n = e.slice(0, t), r = e.slice(t + 1);
	if (An.includes(r)) return null;
	for (let [e, t] of jn) {
		let i = e.exec(r);
		if (i !== null) return `${n}=${t} ${i[1]},${i[2]}`;
	}
	throw new N(`Cannot read "${e}" as a line: expected two points, like AB, AB., [AB], AB[, [AB[, [AB or vAB, after the "="`);
}
// src/parser/parser.curve.ts
function Nn(e, t, n) {
	try {
		let t = new ye(e).evaluate();
		if (Number.isFinite(t)) return t;
	} catch (e) {
		if (!(e instanceof N || e instanceof S)) throw e;
	}
	return k(t, n, `${JSON.stringify(e)} as a bound (a number, or an expression of numbers like 2pi)`);
}
function Pn(e, t, n) {
	let r = e.split(":");
	if (r.length !== 2 || r.some((e) => e.trim() === "")) return k(t, n, `${JSON.stringify(e)} (expected min:max)`);
	let i = Nn(r[0], t, n), a = Nn(r[1], t, n);
	return i > a ? k(t, n, `${JSON.stringify(e)}, whose minimum is greater than its maximum`) : {
		min: i,
		max: a
	};
}
function Fn(e) {
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
function H(e, t, n, r) {
	let i = {}, a = [];
	for (let o of e) {
		let e = o;
		if (typeof o == "string" && o.includes("@")) {
			let n = o.lastIndexOf("@"), a = +o.slice(n + 1);
			(i.samples !== void 0 || o.slice(n + 1).trim() === "" || !Number.isFinite(a) || a <= 0) && k(t, r, `${w(o)} as the samples (a single @ and a number greater than 0)`), i.samples = a, e = o.slice(0, n);
		}
		e !== "" && (a.length >= n && k(t, r, `${w(o)} after the ${n === 1 ? "domain" : "domain and the image"}`), typeof e == "string" ? a.push(Pn(e, t, r)) : A(e) ? a.push({
			min: e.min,
			max: e.max
		}) : k(t, r, w(o)));
	}
	return a.length > 0 && (i.domain = a[0]), a.length > 1 && (i.image = a[1]), i;
}
// src/figures/FillBetween/FillBetween.parser.ts
var In = "fillbetween", U = "a plot, then another plot (or nothing for the x axis), then a domain (min:max, like 0:2pi)";
function Ln(e, t) {
	if (e.key !== P.FILL_BETWEEN.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define an area between plots`);
	let [n, ...r] = O(e.values, t);
	if (!(n instanceof M)) return k(e, U, e.values.length === 0 ? "no value" : `${w(e.values[0])}, which is not a plot`);
	let i = r.at(0), a = i !== void 0 && !(typeof i == "string" || A(i));
	if (a && !(i instanceof M)) return k(e, U, `${w(i)}, which is not a plot`);
	let o = e.values.slice(a ? 2 : 1);
	if (o.length > 1) return k(e, U, e.values.map(w).join(", "));
	let s = H(o, e, 1, U);
	return s.samples === void 0 ? {
		create: In,
		config: {
			plot: n,
			...a ? { other: i } : {},
			...s.domain === void 0 ? {} : { domain: s.domain }
		}
	} : k(e, U, w(o[0]));
}
// src/figures/Follow/Follow.parser.ts
var Rn = "follow", zn = "a line, a circle or a curve to follow, then a point where to start, and a last * to draw the tangent";
function Bn(e, t) {
	if (e.key !== P.FOLLOW.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a point that follows a figure`);
	let n = O(e.values, t), r = Ue(n.at(-1)), i = r ? n.slice(0, -1) : n, a = i.at(0), o = i.at(1);
	return a instanceof C ? a.followable ? o !== void 0 && !(o instanceof g) || i.length > 2 ? k(e, zn, n.map(w).join(", ")) : {
		create: Rn,
		config: {
			follow: a,
			...o === void 0 ? {} : { at: o },
			...r ? { tangent: r } : {}
		}
	} : k(e, zn, `${w(a)}, which cannot be followed`) : k(e, zn, n.length === 0 ? "no value" : w(n[0]));
}
// src/figures/Parametric/Parametric.parser.ts
var Vn = "parametric", Hn = "two functions of t (x then y), then a domain (min:max, like 0:2pi) and a number of samples per unit (@50)";
function Un(e, t) {
	if (e.key !== P.PARAMETRIC.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a parametric curve`);
	let n = Fn(e.values.at(0)), r = Fn(e.values.at(1));
	if (n === null || r === null || n.text.trim() === "" || r.text.trim() === "") return k(e, Hn, e.values.length === 0 ? "no value" : e.values.map(w).join(", "));
	let { domain: i, samples: a } = H([
		...n.samples,
		...r.samples,
		...e.values.slice(2)
	], e, 1, Hn);
	return {
		create: Vn,
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
var Wn = /^([a-z][0-9]*)\(t\)/;
function Gn(e) {
	let t = Wn.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new N(`Cannot read the curve "${e}": expected ${t[1]}(t)=<function of x>,<function of y>`);
	return `${t[1]}=${P.PARAMETRIC} ${n.slice(1)}`;
}
// src/figures/Path/Path.parser.ts
var Kn = "the data of an SVG path in units of the coordinate system, like M 0,0 L 2,1 Q 3,3 4,0 Z";
function qn(e) {
	if (e.key !== P.PATH.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a path`);
	if (e.values.length === 0 || e.values.some((e) => typeof e != "string" && typeof e != "number")) return k(e, Kn, e.values.length === 0 ? "no value" : e.values.map(w).join(", "));
	let t = e.values.map(String).join(",");
	try {
		dt(t);
	} catch (t) {
		throw t instanceof N ? new N(`Cannot build "${e.name}" (${e.key}): ${t.message}`, { cause: t }) : t;
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
var Jn = "plot", Yn = "an expression or three points (the parabola through them), then a number of samples per unit (@50), a domain (min:max, like -2pi:2pi) and an image (min:max)";
function Xn(e, t) {
	if (e.key !== P.PLOT.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a plot`);
	let [n, r, i] = O(e.values.slice(0, 3), t);
	if (R(n) && R(r) && R(i)) return {
		create: Jn,
		config: {
			quadratic: {
				A: n,
				B: r,
				C: i
			},
			...H(e.values.slice(3), e, 2, Yn)
		}
	};
	let a = Fn(e.values.at(0));
	return a === null || a.text.trim() === "" ? k(e, Yn, e.values.length === 0 ? "no value" : w(e.values[0])) : {
		create: Jn,
		config: {
			expression: a.text,
			...H([...a.samples, ...e.values.slice(1)], e, 2, Yn)
		}
	};
}
var Zn = /^([a-z][0-9]*)\(x\)/;
function Qn(e) {
	let t = Zn.exec(e);
	if (t === null) return null;
	let n = e.slice(t[0].length);
	if (!n.startsWith("=") || n.slice(1).trim() === "") throw new N(`Cannot read the plot "${e}": expected ${t[1]}(x)=<function>`);
	return `${t[1]}=${P.PLOT} ${n.slice(1)}`;
}
// src/figures/Riemann/Riemann.parser.ts
var $n = "riemann", er = "a plot, then a domain (min:max, like 0:2pi), a number of rectangles and a position from 0 (left) to 1 (right)";
function tr(e, t) {
	if (e.key !== P.RIEMANN.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a Riemann sum`);
	let [n, ...r] = O(e.values, t);
	if (!(n instanceof M)) return k(e, er, e.values.length === 0 ? "no value" : `${w(e.values[0])}, which is not a plot`);
	let i = r.length > 0 && (typeof r[0] == "string" || A(r[0])), a = i ? r.slice(1) : r, o = { plot: n };
	if (i) {
		let t = H([e.values[1]], e, 1, er);
		if (t.samples !== void 0 || t.domain === void 0) return k(e, er, w(e.values[1]));
		o.domain = t.domain;
	}
	let s = a.at(0), c = a.at(1);
	return a.length > 2 || a.some((e) => typeof e != "number") ? k(e, er, e.values.map(w).join(", ")) : (s !== void 0 && (o.rectangles = s), c !== void 0 && (o.position = c), {
		create: $n,
		config: o
	});
}
// src/figures/Polygon/Polygon.parser.ts
var nr = "polygon", rr = "three points or more, a center with a radius (a number or A:B) and a number of sides, or two points and a number of sides; the number of sides can be followed by the step of a star (5,2)";
function ir(e, t, n) {
	return typeof e == "number" && Number.isInteger(e) ? e : k(t, rr, `${w(e)} as the ${n} (an integer)`);
}
function ar(e, t) {
	let n = i(e, t);
	return typeof n == "number" || n !== null && "point1" in n ? n : null;
}
function or(e, t) {
	if (e.key !== P.POLYGON.toString()) throw new N(`Cannot build "${e.name}" (${e.key}): the key does not define a polygon`);
	let n = O(e.values, t), r = () => k(e, rr, n.length === 0 ? "no value" : n.map(w).join(", "));
	if (n.every(R)) return n.length >= 3 ? {
		create: nr,
		config: { vertices: n }
	} : r();
	let [i, a, o, s, ...c] = n;
	if (!R(i) || o === void 0 || c.length > 0) return r();
	let l = s === void 0 ? {} : { star: ir(s, e, "step of the star") };
	if (R(a)) return {
		create: nr,
		config: { onSide: {
			A: i,
			B: a,
			sides: ir(o, e, "number of sides"),
			...l
		} }
	};
	let u = ar(a, t);
	return u === null ? r() : {
		create: nr,
		config: { regular: {
			center: i,
			radius: u,
			sides: ir(o, e, "number of sides"),
			...l
		} }
	};
}
// src/parser/parser.config.ts
var sr = {
	[P.POINT]: {
		name: "point",
		description: "Create a point",
		code: "A(3,4)",
		build: T
	},
	[P.VECTOR_POINT]: {
		name: "point from two points",
		description: "Create a point from a vector defined by two points and a starting point",
		code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
		build: T
	},
	[P.DIRECTION_POINT]: {
		name: "point from direction line",
		description: "Create a point from a line and a starting point",
		code: "A=dpt <point>,<line>,<distance>,<perpendicular?>",
		build: T
	},
	[P.MIDDLE]: {
		name: "mid",
		description: "Create the middle of two points",
		code: "A=mid <point>,<point>",
		build: T
	},
	[P.PROJECTION]: {
		name: "projection",
		description: "Create the projection of a point on a line",
		code: "A=proj <point>,<line>",
		build: T
	},
	[P.INTERSECTION]: {
		name: "intersection",
		description: "Create the intersection of two lines",
		code: "A=inter <line|circle>,<line|circle>",
		build: Pe
	},
	[P.SYMMETRY]: {
		name: "symmetry",
		description: "Create the symmetry of a point",
		code: "A=sym <point>,<point|line>",
		build: T
	},
	[P.EVAL_FX]: {
		name: "point on a function",
		description: "Create the point of a function at a value",
		code: "A=eval f,3",
		build: T
	},
	[P.LINE]: {
		name: "line",
		description: "Create a line through two points, through a point with a slope, or from its equation",
		code: "d=AB | d=line <point>,<point> | d=line <point>,<slope> | d=line <equation>",
		build: B
	},
	[P.VECTOR]: {
		name: "vector",
		description: "Create a vector: a segment with an arrow at its end",
		code: "v=vAB | v=vec <point>,<point>",
		build: B
	},
	[P.SEGMENT]: {
		name: "segment",
		description: "Create a segment through two points",
		code: "s=AB. | s=[AB] | s=seg <point>,<point>",
		build: B
	},
	[P.RAY]: {
		name: "ray (half line)",
		description: "Create a ray: it starts at the first point and goes through the second",
		code: "r=AB[ | r=[AB[ | r=[AB | r=ray <point>,<point>",
		build: B
	},
	[P.PERPENDICULAR]: {
		name: "perpendicular",
		description: "Create the perpendicular of a line from a point",
		code: "d=perp <line>,<point>",
		build: B
	},
	[P.PARALLEL]: {
		name: "parallel",
		description: "Create a parallel line from a point",
		code: "d=para <line>,<point>",
		build: B
	},
	[P.MEDIATOR]: {
		name: "mediator",
		description: "Create the mediator of two points",
		code: "d=med <point>,<point>",
		build: B
	},
	[P.TANGENT]: {
		name: "tangent",
		description: "Create a tangent line from a <circle|plot> by a Point",
		code: "d=tan <circle|plot>,<point>",
		build: B
	},
	[P.BISECTOR]: {
		name: "bisector",
		description: "Create the bisector of an angle (three points), or of two lines or axes (a last * for the other bisector)",
		code: "d=bis <point>,<point>,<point> | d=bis <line>,<line>[,*]",
		build: B
	},
	[P.CIRCLE]: {
		name: "circle",
		description: "Create a circle: from its center and its radius (a number, a point or A:B), from three points (a last * for the inscribed circle), from a center and a tangent line, or from a diameter A:B",
		code: "c=circ <point>,<radius> | c=circ <point>,<line> | c=circ <point>,<point>,<point>[,*] | c=circ <point>:<point>",
		build: Cn
	},
	[P.ARC]: {
		name: "arc",
		description: "Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last * for the other arc)",
		code: "a=arc <point>,<point>,<point>[,<radius>][,*] | a=arc <point>,<number>,<number>,<number>[,*] | a=arc <point>,<point>,<number>[,<radius>][,*]",
		build: be
	},
	[P.PLOT]: {
		name: "plot",
		description: "Plot a function, or the parabola through three points (a line if they are aligned)",
		code: "f(x)=<function>[@<number>,<domain>,<image>] | f=plot <function>[@<number>,<domain>,<image>] | f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]",
		build: Xn
	},
	[P.PARAMETRIC]: {
		name: "parametric",
		description: "Plot a parametric function",
		code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
		build: Un
	},
	[P.BEZIER]: {
		name: "bezier",
		description: "Create a Bézier curve: the smooth curve through points (a direction and a ratio at each one), or, with a last *, the curve pulled by 3 or 4 control points",
		code: "b=bezier <point>[/<H|V|S|angle>[/<ratio>]],... | b=bezier <point>,<point>,<point>[,<point>],*",
		build: Oe
	},
	[P.POLYGON]: {
		name: "polygon",
		description: "Create a polygon: through points, or a regular polygon (and a regular star polygon with a last step) from a center and a radius, or from a side",
		code: "p=poly <point>,<point>,<point>,... | p=poly <point>,<radius>,<sides>[,<step>] | p=poly <point>,<point>,<sides>[,<step>]",
		build: or
	},
	[P.FOLLOW]: {
		name: "follow",
		description: "Create a point that follows the mouse along a line, a circle or a curve (a last * draws the tangent too)",
		code: "t=follow <figure>[,<point>][,*]",
		build: Bn
	},
	[P.FILL_BETWEEN]: {
		name: "fillbetween",
		description: "Fill the area between two plots, or between a plot and the x axis",
		code: "z=fill <plot>[,<plot>][,<domain>]",
		build: Ln
	},
	[P.PATH]: {
		name: "path",
		description: "Draw an SVG path, written in units of the coordinate system",
		code: "p=path M 0,0 L 2,1 Q 3,3 4,0 Z",
		build: qn
	},
	[P.GRID]: {
		name: "grid",
		description: "Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph",
		code: "g=grid [<x interval>,<y interval>][,<step>]",
		build: Le
	},
	[P.AXIS]: {
		name: "axis",
		description: "Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph",
		code: "a=axis <point>,<point>[,<step>]",
		build: _e
	},
	[P.RIEMANN]: {
		name: "riemann",
		description: "Create the Riemann sum of a plot: rectangles from the x axis to its graph",
		code: "r=riemann <plot>[,<domain>][,<rectangles>][,<position>]",
		build: tr
	}
}, cr = (e) => {
	throw TypeError(e);
}, lr = (e, t, n) => t.has(e) || cr("Cannot " + n), W = (e, t, n) => (lr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), G = (e, t, n) => t.has(e) ? cr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), K = (e, t, n, r) => (lr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), ur = (e, t, n) => (lr(e, t, "access private method"), n);
function q(e) {
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
	return e.startsWith("[") && e.endsWith("]") ? e.slice(1, -1).split(",").map(q) : e;
}
function dr(e, t) {
	return e.replace(RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function fr(e) {
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
var J, Y, X, Z, Q, $, pr, mr, hr = class {
	constructor(e) {
		G(this, $), G(this, J), G(this, Y, "->"), G(this, X, ","), G(this, Z, "/"), G(this, Q, []);
		var t, n, r;
		e && (K(this, J, e.formatter ?? void 0), (t = e.splitter) != null && t.main && K(this, Y, e.splitter.main), (n = e.splitter) != null && n.entry && K(this, X, e.splitter.entry), (r = e.splitter) != null && r.parameter && K(this, Z, e.splitter.parameter), e.keys && K(this, Q, e.keys));
	}
	get splitter() {
		return {
			main: W(this, Y),
			entry: W(this, X),
			parameter: W(this, Z)
		};
	}
	set splitter_main(e) {
		K(this, Y, e);
	}
	set splitter_entry(e) {
		K(this, X, e);
	}
	set splitter_parameter(e) {
		K(this, Z, e);
	}
	get formatter() {
		return W(this, J);
	}
	set formatter(e) {
		K(this, J, e);
	}
	get keys() {
		return W(this, Q);
	}
	set keys(e) {
		K(this, Q, e);
	}
	parse(e) {
		let [t, n] = e.split(W(this, Y)), r = W(this, J) ? W(this, J).call(this, t) : t.trim(), { name: i, key: a, values: o } = ur(this, $, pr).call(this, r);
		return {
			name: i,
			key: a,
			values: o,
			parameters: ur(this, $, mr).call(this, n)
		};
	}
	parameters(e, t) {
		return ur(this, $, mr).call(this, e, t ?? W(this, Q));
	}
};
J = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakSet(), pr = function(e) {
	let [t, ...n] = e.split(" "), [r, i] = t.split("=");
	return {
		name: r,
		key: i,
		values: dr(n.join(" "), W(this, X)).map((e) => q(e))
	};
}, mr = function(e, t) {
	if (e === void 0) return {};
	let n;
	if (t === void 0 || t.length === 0) n = dr(e, W(this, X));
	else {
		let r = dr(e, W(this, X)), i = t.map((e) => `${e}=`);
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
		let { key: t, value: n } = fr(e);
		if (/^[-.\d]+\/[-.\d]+$/.exec(n)) {
			r[t] = {
				value: q(n),
				options: []
			};
			return;
		}
		let [i, ...a] = n.split(W(this, Z));
		r[t] = {
			value: q(i),
			options: a.map((e) => q(e))
		};
	}), r;
};
// src/Draw/Draw.lines.ts
var gr = "$", _r = "@";
function vr(e) {
	return Te(e) ?? Qn(e) ?? Gn(e) ?? Mn(e) ?? e;
}
function yr(e, t) {
	let n = [];
	return e.split("\n").forEach((e, r) => {
		let i = r + 1, a = e.trim(), o = e.length - e.trimStart().length;
		if (!(a === "" || a.startsWith(gr))) try {
			if (a.startsWith(_r)) throw new N(`Cannot read the command "${a}": there is no command`);
			n.push({
				number: i,
				text: a,
				indent: o,
				item: t(a)
			});
		} catch (e) {
			n.push({
				number: i,
				text: a,
				indent: o,
				error: br(e, a)
			});
		}
	}), n;
}
function br(e, t) {
	if (e instanceof N) return e;
	let n = e instanceof Error ? e.message : String(e);
	return new N(`Cannot read "${t}": ${n}`, { cause: e });
}
// src/Draw/Draw.diff.ts
function xr(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length && e[n].text === t[n].text && !e[n].fallback;) n++;
	return n;
}
function Sr(e, t, n) {
	let r = (e) => e.filter((e) => e.number !== n).map((e) => `${e.number}:${e.text}`), i = r(e), a = r(t);
	if (!(i.length !== a.length || i.some((e, t) => e !== a[t]))) return e.find((e) => e.number === n);
}
// src/Draw/Draw.report.ts
function Cr(e, t) {
	if (e instanceof n) return e;
	let r = e instanceof Error ? e.message : String(e);
	return new N(`Cannot read "${t}": ${r}`, { cause: e });
}
function wr(e, t, n = 0) {
	let r = e.indexOf("->");
	if (!(t instanceof re) || r < 0) return {};
	let i = r + 2;
	for (let r of e.slice(i).split(",")) {
		if (r.split(/[=/]/)[0].trim() === t.option) {
			let e = r.length - r.trimStart().length;
			return {
				from: n + i + e,
				to: n + i + r.trimEnd().length
			};
		}
		i += r.length + 1;
	}
	return {};
}
function Tr(e, t, n) {
	return {
		line: e.number,
		text: e.text,
		...wr(e.text, t, e.indent),
		severity: n,
		message: t.message,
		error: t
	};
}
// src/Draw/Draw.ts
var Er = Object.values(D), Dr = [...Se], Or = class {
	graph;
	_parser;
	_settings;
	_report = {
		errors: [],
		lines: []
	};
	_layoutError = null;
	_lines = [];
	_parameters;
	_moved = /* @__PURE__ */ new Map();
	constructor(e, t) {
		this.graph = new bn(e, t?.tex === void 0 ? {} : { tex: t.tex }), this._parser = new hr({
			formatter: vr,
			keys: Dr,
			splitter: {
				main: "->",
				entry: ",",
				parameter: "/"
			}
		}), this._settings = {}, this.graph.on("dragmove", (e) => {
			this._remember(e.detail.target);
		});
		let n = this.refreshLayout(t?.parameters);
		return n !== null && (this.refreshLayout(), this._layoutError = n), this._code = [], t?.code && this._build(t.code), this;
	}
	_code;
	get code() {
		return this._code;
	}
	get report() {
		return this._report;
	}
	get errors() {
		return this._report.errors;
	}
	get layoutError() {
		return this._layoutError;
	}
	static documentation() {
		return sr;
	}
	refresh(e, t = {}) {
		let { editing: n, drag: r = "keep" } = t;
		if (n !== void 0 && !(Number.isInteger(n) && n >= 1)) throw new S(`Invalid line ${String(n)} to edit: expected a line number, an integer from 1`);
		return this._build(e, n, r);
	}
	refreshLayout(e) {
		try {
			let t = pe(e ?? "", this._parser);
			this.graph.updateLayout({
				...it({
					...t.window,
					unit: t.unit
				}),
				system: Ae.CARTESIAN_2D
			}, t.display), this._settings = t.defaults, this._applyLayoutOptions(t.options), (e ?? "") !== this._parameters && (this._lines = []), this._parameters = e ?? "", this._layoutError = null;
		} catch (t) {
			if (!(t instanceof n)) throw t;
			let r = (e ?? "").trim();
			this._layoutError = Tr({
				number: 1,
				text: r,
				indent: 0
			}, t, "error");
		}
		return this._layoutError;
	}
	_applyLayoutOptions(e) {
		let t = [
			[this.graph.drawnAxes.x, e.x],
			[this.graph.drawnAxes.y, e.y],
			[this.graph.mainGrid, e.grid]
		];
		for (let [e, n] of t) e !== null && Object.keys(n).length > 0 && Fe(n, e, this.graph);
	}
	_build(e, t, n = "keep") {
		let r = yr(e, (e) => this._parser.parse(e)), i = this._lines, a = t === void 0 ? void 0 : Sr(i, r, t), o = xr(i, r);
		if (n === "reset") {
			let e = i.findIndex((e) => e.created.some((e) => this._moved.has(e)));
			o = e < 0 ? o : Math.min(o, e), this._moved.clear();
		}
		let s = i.slice(0, o).map((e, t) => ({
			...e,
			number: r[t].number,
			indent: r[t].indent
		}));
		this._removeAfter(new Set(s.flatMap((e) => e.created)));
		let c = [];
		for (let e of r.slice(o)) {
			let n = this._buildLine(e, e.number === t ? a : void 0);
			this._restore(n), c.push(...n.created), s.push(n);
		}
		return this._code = r.flatMap((e) => e.item === void 0 ? [] : [e.item]), this._lines = s, this._report = this._reportOf(s, t), this._moved.forEach((e, t) => {
			Object.hasOwn(this.graph.figures, t) || this._moved.delete(t);
		}), c.length > 0 && this.graph.update(c.map((e) => this.graph.figures[e])), this._report;
	}
	_removeAfter(e) {
		Object.keys(this.graph.figures).reverse().filter((t) => !e.has(t)).forEach((e) => {
			Object.hasOwn(this.graph.figures, e) && this.graph.remove(e, { cascade: !0 });
		});
	}
	_reportOf(e, t) {
		let n = [], r = [];
		for (let i of e) if (i.error === null) r.push({
			line: i.number,
			status: "ok"
		});
		else {
			let e = i.number === t ? "pending" : "error";
			n.push(Tr(i, i.error, e)), r.push({
				line: i.number,
				status: e
			});
		}
		return {
			errors: n,
			lines: r
		};
	}
	_remember(e) {
		let t = this._lines.find((t) => t.created.includes(e.name));
		t?.validText != null && this._moved.set(e.name, {
			text: t.validText,
			coordinates: e.coordinates
		});
	}
	_restore(e) {
		for (let t of e.created) {
			let n = this._moved.get(t);
			if (n !== void 0) {
				if (n.text !== e.validText) this._moved.delete(t);
				else try {
					this.graph.dragTo(this.graph.figures[t], this.graph.toPixels(n.coordinates));
				} catch {
					this._moved.delete(t);
				}
			}
		}
	}
	_buildLine(e, t) {
		let n = Object.keys(this.graph.figures).length, r = () => Object.keys(this.graph.figures).slice(n), i = {
			number: e.number,
			text: e.text,
			indent: e.indent
		};
		try {
			if (e.error !== void 0) throw e.error;
			let t = structuredClone(e.item);
			return this._buildItem(e.item), {
				...i,
				valid: t,
				validText: e.text,
				error: null,
				fallback: !1,
				created: r()
			};
		} catch (n) {
			let a = Cr(n, e.text);
			if (t?.valid == null) return {
				...i,
				valid: null,
				validText: null,
				error: a,
				fallback: !1,
				created: r()
			};
			this._removeMade(r());
			try {
				return this._buildItem(structuredClone(t.valid)), {
					...i,
					valid: t.valid,
					validText: t.validText,
					error: a,
					fallback: !0,
					created: r()
				};
			} catch {
				return this._removeMade(r()), {
					...i,
					valid: null,
					validText: null,
					error: a,
					fallback: !1,
					created: []
				};
			}
		}
	}
	_removeMade(e) {
		[...e].reverse().forEach((e) => {
			Object.hasOwn(this.graph.figures, e) && this.graph.remove(e, { cascade: !0 });
		});
	}
	_buildItem(e) {
		if (Er.includes(e.name)) throw new N(`Cannot build "${e.name}" (${e.key}): ${e.name} is the name of an axis of the graph, choose another name`);
		let t = e.key;
		if (t === void 0 || !Object.hasOwn(sr, t)) throw new N(`Cannot build "${e.name}": ${t === void 0 ? "expected <name>=<key> <values>" : `"${t}" is not a kind of figure`}`);
		e.name = this._uniqueName(e.name);
		let n = sr[e.key].build(e, this._namedFigures(), this.graph.config);
		if (n === null) throw new N(`Cannot build "${e.name}" (${e.key}): nothing to build`);
		let r = Array.isArray(n) ? n : [n];
		r.forEach(({ config: t, create: n }, i) => {
			let a = this.graph.create, o = Object.hasOwn(a, n) ? a[n] : void 0;
			if (o === void 0) throw new N(`Cannot build "${e.name}" (${e.key}): the graph cannot make a "${n}"`);
			let s = o.call(a, t, e.name + (r.length > 1 ? `${i + 1}` : ""));
			Fe(Me(e.parameters, this._settings, s), s, this.graph);
		});
	}
	_namedFigures() {
		return {
			Ox: this.graph.axes.x,
			Oy: this.graph.axes.y,
			...this.graph.figures
		};
	}
	_uniqueName(e) {
		let t = e, n = 1;
		for (; this.graph.figures[t];) t = `${e}_${n}`, n++;
		return t;
	}
};
export { Ft as Animate, D as Axes, Ae as CoordinateSystem, ne as EASINGS, S as InvalidArgumentError, F as LayerName, _ as LoopStyle, l as MathError, s as NotImplementedError, re as OptionError, N as ParseError, Or as PiDraw, n as PiDrawError, bn as PiGraph, we as UnsupportedOperationError, It as ZOOM_ALLOWS, wt as ZOOM_LIMITS, Lt as ZOOM_STEP, zt as Zoom, A as isDomain, xe as isXY };

//# sourceMappingURL=pidraw.js.map