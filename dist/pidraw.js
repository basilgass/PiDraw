import { $ as e, A as t, At as n, B as r, C as i, Ct as a, D as o, Dt as s, E as c, Et as l, F as u, Ft as d, G as f, H as p, I as m, It as h, J as ee, K as te, L as ne, Lt as g, M as re, Mt as ie, N as _, Nt as ae, O as oe, Ot as se, P as v, Pt as ce, Q as le, R as ue, Rt as de, S as fe, St as pe, T as me, Tt as he, U as y, V as ge, W as _e, X as ve, Y as ye, Z as be, _t as xe, a as Se, at as Ce, b as we, bt as b, c as Te, ct as Ee, d as De, dt as x, et as Oe, f as ke, ft as S, gt as C, h as Ae, ht as w, i as je, it as Me, j as Ne, jt as T, k as Pe, kt as E, lt as Fe, m as Ie, mt as Le, n as Re, nt as ze, ot as D, p as Be, pt as Ve, q as He, rt as Ue, st as O, t as We, tt as Ge, u as Ke, ut as qe, v as Je, vt as k, w as Ye, wt as Xe, x as Ze, xt as A, y as Qe, yt as j, z as $e, zt as M } from "./shared.js";
// src/calculus/computeDrag.ts
function et(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function tt(e, t, n) {
	let { x: r, y: i } = e;
	if (t.along) {
		let { axis: e, keep: n } = t.along;
		e === "x" ? i = n.y : r = n.x;
	}
	if (t.step) {
		let e = x({
			x: r,
			y: i
		}, n);
		({x: r, y: i} = S({
			x: Math.round(e.x / t.step.x) * t.step.x,
			y: Math.round(e.y / t.step.y) * t.step.y
		}, n));
	}
	if (t.bounds?.x) {
		let { min: e, max: i } = S(t.bounds.x, n, "x");
		r = et(r, e, i);
	}
	if (t.bounds?.y) {
		let { min: e, max: r } = S(t.bounds.y, n, "y");
		i = et(i, e, r);
	}
	return {
		x: r,
		y: i
	};
}
// src/calculus/computeFillBetween.ts
var nt = 1e-9;
function rt(e, t, n, r, i, a) {
	let { bound: o } = a, s = (e) => w(e) && Math.abs(e.x) <= o && Math.abs(e.y) <= o, c = [r.min, r.max];
	for (let n of t === null ? [e] : [e, t]) for (let e of Ee(n, r.min, r.max, a)) w(e) && c.push(Math.min(r.max, Math.max(r.min, i(e.x))));
	c.sort((e, t) => e - t);
	let l = c.filter((e, t) => t === 0 || e - c[t - 1] > nt), u = [], d = {
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
function it(e) {
	if (e.length === 0) return "M 0 0";
	let t = (e) => `${O(e.x)} ${O(e.y)}`;
	return e.map(({ first: e, second: n }) => `M ${e.map(t).join(" L ")} L ${[...n].reverse().map(t).join(" L ")} Z`).join(" ");
}
function at(e) {
	let t = 0;
	for (let { first: n, second: r } of e) for (let e = 1; e < n.length; e++) {
		let i = n[e].x - n[e - 1].x, a = r[e - 1].y - n[e - 1].y, o = r[e].y - n[e].y;
		a * o >= 0 ? t += i * (Math.abs(a) + Math.abs(o)) / 2 : t += i * (a * a + o * o) / (2 * (Math.abs(a) + Math.abs(o)));
	}
	return t;
}
// src/calculus/computeLayout.ts
var ot = 28.45274 / .75, st = 800, ct = 600;
function lt(e) {
	return Object.fromEntries(Object.entries(e ?? {}).filter(([, e]) => e !== void 0));
}
function ut(t) {
	let n = t?.width ?? st, r = t?.height ?? ct, i = {
		width: n,
		height: r,
		origin: { ...t?.origin ?? {
			x: n / 2,
			y: r / 2
		} },
		system: t?.system ?? j.CARTESIAN_2D,
		measure: {
			...e,
			...lt(t?.measure)
		},
		axis: {
			x: { ...t?.axis?.x ?? {
				x: 37.93698666666666,
				y: 0
			} },
			y: { ...t?.axis?.y ?? {
				x: 0,
				y: -37.93698666666666
			} }
		}
	};
	return dt(i), {
		config: i,
		display: {
			grid: !0,
			axis: !0,
			...lt(t?.display)
		}
	};
}
function dt(e) {
	let t = (e, t, n) => new T(`Invalid ${e} ${typeof t == "number" ? String(t) : JSON.stringify(t)} for the graph: expected ${n}`), n = ({ x: e, y: t }) => Number.isFinite(e) && Number.isFinite(t);
	for (let n of ["width", "height"]) if (!(Number.isFinite(e[n]) && e[n] > 0)) throw t(n, e[n], "a finite number greater than 0");
	if (!n(e.origin)) throw t("origin", e.origin, "a position with finite coordinates");
	for (let r of ["x", "y"]) {
		let i = e.axis[r];
		if (!n(i) || Math.hypot(i.x, i.y) === 0) throw t(`vector of the axis ${r}`, i, "a finite vector that is not null");
	}
	if (e.measure !== void 0 && Oe(e.measure), e.system !== j.CARTESIAN_2D) throw new ae(`The coordinate system "${e.system}" cannot be drawn yet`);
}
function ft({ x: e, y: t, unit: n }) {
	let r = n.x * ot, i = n.y * ot;
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
var pt = 1e-9;
function mt(e, t, n, r) {
	let i = Math.abs(r.x.y) <= pt && Math.abs(r.y.x) <= pt, a = (t) => ({
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
// src/calculus/computePolygon.ts
function ht(e, t) {
	return t === 0 ? e : ht(t, e % t);
}
function gt(e, t = 1) {
	let n = ht(e, t), r = e / n;
	return Array.from({ length: n }, (n, i) => Array.from({ length: r }, (n, r) => (i + r * t) % e));
}
function _t(e, t, n, r = 1) {
	return !w(e) || !Number.isFinite(t) || t <= 0 ? null : {
		vertices: Array.from({ length: n }, (r, i) => xe(e.x, e.y, t, 90 + i * 360 / n)),
		cycles: gt(n, r)
	};
}
function vt(e, t, n, r = 1) {
	let i = w(e) && w(t) ? Le(e, t) : NaN;
	if (!Number.isFinite(i) || i === 0) return null;
	let a = Math.PI * r / n, o = Ve(e, t), s = xe((e.x + t.x) / 2, (e.y + t.y) / 2, i / (2 * Math.tan(a)), o + 90), c = i / (2 * Math.sin(a)), l = Ve(s, e);
	return {
		vertices: Array.from({ length: n }, (e, t) => xe(s.x, s.y, c, l + t * 360 / n)),
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
	let n = C(), r = Infinity;
	for (let i of e.cycles) {
		let a = [...i, i[0]].map((t) => e.vertices[t]), o = D(a, t), s = Math.hypot(o.x - t.x, o.y - t.y);
		s < r && (r = s, n = o);
	}
	return n;
}
function xt(e) {
	return e.cycles.map((t) => t.map((t, n) => `${n === 0 ? "M" : "L"} ${O(e.vertices[t].x)} ${O(e.vertices[t].y)}`).join(" ") + " Z").join(" ");
}
function St(e) {
	return e.cycles.reduce((t, n) => t + n.reduce((t, r, i) => {
		let a = e.vertices[n[(i + 1) % n.length]];
		return t + Le(e.vertices[r], a);
	}, 0), 0);
}
function Ct(e) {
	return e.cycles.reduce((t, n) => {
		let r = n.reduce((t, r, i) => {
			let a = e.vertices[r], o = e.vertices[n[(i + 1) % n.length]];
			return t + a.x * o.y - o.x * a.y;
		}, 0);
		return t + Math.abs(r) / 2;
	}, 0);
}
// src/calculus/computeRiemann.ts
function wt(e, t, n, r) {
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
function Tt(e) {
	return e.reduce((e, { x0: t, x1: n, y: r }) => e + r * (n - t), 0);
}
// src/calculus/computeZoom.ts
var N = {
	min: 1 / 100,
	max: 100
}, Et = 1e-9, Dt = (e) => Number.isFinite(e.x) && Number.isFinite(e.y);
function Ot(e, t) {
	if (!Dt(e)) throw new T(`Invalid ${t} (${e.x}, ${e.y}): expected a position with finite numbers`);
}
function kt(e) {
	if (!Number.isFinite(e) || e <= 0) throw new T(`Invalid zoom factor ${e}: expected a finite number greater than 0`);
}
function P(e, t, n) {
	kt(t), Ot(n, "center");
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
function F(e, t) {
	return Ot(t, "move"), {
		...e,
		origin: {
			x: e.origin.x + t.x,
			y: e.origin.y + t.y
		}
	};
}
function At(e, t) {
	let { x: n, y: r } = t;
	if (![
		n.min,
		n.max,
		r.min,
		r.max
	].every(Number.isFinite) || n.min >= n.max || r.min >= r.max) throw new T(`Invalid window x ${n.min}:${n.max}, y ${r.min}:${r.max}: expected finite numbers, each min below its max`);
	let { axis: i } = e;
	if (!(Math.abs(i.x.y) <= Et && Math.abs(i.y.x) <= Et && i.x.x > 0 && i.y.y < 0)) throw new T("A window can be shown only with the usual axes: orthogonal, the x axis to the right and the y axis up");
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
function jt(e) {
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
	].map((t) => x(t, e)), n = t.map((e) => e.x), r = t.map((e) => e.y);
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
function I(e, t) {
	let n = (e) => Math.hypot(e.x, e.y);
	return {
		x: n(e.axis.x) / n(t.axis.x),
		y: n(e.axis.y) / n(t.axis.y)
	};
}
function L(e, t, n = N) {
	kt(e);
	let r = Math.max(n.min / t.x, n.min / t.y), i = Math.min(n.max / t.x, n.max / t.y);
	return r > i ? 1 : Math.min(Math.max(e, r), i);
}
// src/animate/Animate.ts
var Mt = 100, Nt = class extends EventTarget {
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
		let t = (t) => t instanceof _ && e.includes(t.name);
		for (let [e, n] of this._animations) {
			let r = Ne(n.point);
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
			if (!(e instanceof _)) return;
			let t = Ne(e);
			if (t === null) return;
			let { from: n, to: r, duration: i, delay: a, easing: o, loop: s } = t;
			n instanceof _ && r instanceof _ && (this._animations.set(e.name, {
				point: e,
				start: n,
				end: r,
				reversed: !1,
				duration: i * 1e3,
				delay: a * 1e3,
				ease: de[o],
				loop: s,
				elapsed: 0
			}), this._animatedPoints.push(e));
		}), this._animatedPoints;
	}
	_step = (e) => {
		if (this._paused) return;
		let t = this._last === null ? 0 : Math.min(Math.max(e - this._last, 0), Mt);
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
			}, o < 1 ? n = !0 : e.loop === M.RESET ? (e.point.pixels = r, e.elapsed = 0, n = !0) : e.loop === M.REVERSE && (e.reversed = !e.reversed, e.elapsed = 0, n = !0);
		}
		this._graph.update(this._animatedPoints), n ? this._rafId = requestAnimationFrame(this._step) : (this._rafId = null, this._emit("end"));
	};
}, R = [
	"both",
	"zoom",
	"move"
], z = 1.25, Pt = .0015, Ft = class extends EventTarget {
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
		if (!R.includes(n)) throw new T(`Invalid zoom allow ${n}: expected ${R.join(", ")}`);
		this.allow = n, this.gestures = t.gestures ?? !1, this._graph = e, e.attach(this), this._home = structuredClone(e.config), this.gestures && this.canZoom && e.rootSVG.node.addEventListener("wheel", this._ctrlWheel, { passive: !1 });
	}
	get canZoom() {
		return this.allow !== "move";
	}
	get canMove() {
		return this.allow !== "zoom";
	}
	get window() {
		return jt(this._graph.config);
	}
	get scale() {
		return I(this._graph.config, this._home);
	}
	zoomIn(e = z, t) {
		this._zoom(e, t);
	}
	zoomOut(e = z, t) {
		if (!Number.isFinite(e) || e <= 0) throw new T(`Invalid zoom factor ${e}: expected a finite number greater than 0`);
		this._zoom(1 / e, t);
	}
	zoomTo(e) {
		this._requireZoom(), this._requireMove();
		let t = At(this._current(), e), n = I(t, this._home), r = (e) => e < N.min || e > N.max;
		if (r(n.x) || r(n.y)) throw new T("This window needs units more than a hundred times shorter or longer than the ones at the start");
		this._apply(t);
	}
	moveOrigin(e, t) {
		this._requireMove(), this._apply(F(this._current(), {
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
		if (!this.gestures) throw new g("This zoom was made without gestures: made it with {gestures: true} to navigate with the mouse and the fingers");
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
		if (!this.canZoom) throw new g("This zoom may only move (allow: \"move\"): it cannot change the length of a unit");
	}
	_requireMove() {
		if (!this.canMove) throw new g("This zoom may only zoom (allow: \"zoom\"): the origin stays where it is");
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
		let n = this._current(), r = L(e, I(n, this._home));
		r !== 1 && this._apply(P(n, r, this._fixed(t)));
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
		this._pointers.set(e.pointerId, n), e.preventDefault(), r.length === 1 ? this.canMove && this._schedule(F(this._current(), {
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
			let a = L(r(t) / r(e), I(i, this._home));
			a !== 1 && (i = P(i, a, this._fixed(n(e))));
		}
		if (this.canMove) {
			let r = n(e), a = n(t);
			i = F(i, {
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
		let t = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1, n = Math.exp(-e.deltaY * t * Pt);
		if (!Number.isFinite(n) || n <= 0) return;
		let r = this._current(), i = L(n, I(r, this._home));
		i !== 1 && this._schedule(P(r, i, this._fixed(this._local(e))));
	}
}, It = "slide", Lt = class extends EventTarget {
	_graph;
	_least;
	_current = 1;
	_count;
	_disposed = !1;
	_titles;
	constructor(e, t = {}) {
		super();
		let n = t.count ?? 1;
		if (!Number.isInteger(n) || n < 1) throw new T(`Invalid count ${n} of slides: expected an integer from 1`);
		this._graph = e, e.attach(this), this._least = n, this._titles = e.controls.titles ?? {}, this._count = this._countOfFigures(), this._applyAll();
	}
	get current() {
		return this._current;
	}
	get count() {
		return this._count;
	}
	get title() {
		return this.titleOf(this._current);
	}
	titleOf(e) {
		return Object.hasOwn(this._titles, e) ? this._titles[e] : null;
	}
	get titles() {
		return { ...this._titles };
	}
	get state() {
		return {
			current: this._current,
			count: this._count,
			title: this.title
		};
	}
	next() {
		this._show(Math.min(this._current + 1, this._count));
	}
	previous() {
		this._show(Math.max(this._current - 1, 1));
	}
	first() {
		this._show(1);
	}
	last() {
		this._show(this._count);
	}
	goto(e) {
		if (!Number.isInteger(e) || e < 1 || e > this._count) throw new T(`Invalid step ${e}: expected an integer from 1 to ${this._count}`);
		this._show(e);
	}
	onFigureChanged(e) {
		!this._disposed && Object.hasOwn(this._graph.figures, e) && (this._apply(this._graph.figures[e]), this._sync());
	}
	onControlsChanged(e) {
		if (this._disposed || e !== "titles") return;
		let t = this._graph.controls.titles ?? {}, n = Object.entries(this._titles), r = Object.entries(t);
		n.length === r.length && n.every(([e, n]) => t[Number(e)] === n) || (this._titles = t, this._emit());
	}
	onFiguresRemoved() {
		this._disposed || this._sync();
	}
	dispose() {
		this._disposed = !0, Object.values(this._graph.figures).forEach((e) => {
			e.setHiddenBy(It, !1);
		});
	}
	on(e, t) {
		return this.addEventListener(e, t), this;
	}
	off(e, t) {
		return this.removeEventListener(e, t), this;
	}
	_emit() {
		this.dispatchEvent(new CustomEvent("change", { detail: this.state }));
	}
	_countOfFigures() {
		return Object.values(this._graph.figures).reduce((e, n) => Math.max(e, Pe(t(n) ?? [])), this._least);
	}
	_apply(e) {
		let n = t(e);
		e.setHiddenBy(It, n !== null && !oe(n, this._current));
	}
	_applyAll() {
		Object.values(this._graph.figures).forEach((e) => {
			this._apply(e);
		});
	}
	_show(e) {
		e !== this._current && (this._current = e, this._applyAll(), this._emit());
	}
	_sync() {
		let e = this._countOfFigures(), t = Math.min(this._current, e);
		(e !== this._count || t !== this._current) && (this._count = e, t !== this._current && (this._current = t, this._applyAll()), this._emit());
	}
}, Rt = (e) => (e.changedTouches && (e = e.changedTouches[0]), {
	x: e.clientX,
	y: e.clientY
}), zt = class {
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
		e.preventDefault(), e.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Rt(e));
		let r = (t ? "mousemove" : "touchmove") + ".drag", i = (t ? "mouseup" : "touchend") + ".drag";
		n(window, r, this.drag, this, { passive: !1 }), n(window, i, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", {
			event: e,
			handler: this,
			box: this.box
		});
	}
	drag(e) {
		let { box: t, lastClick: n } = this, r = this.el.point(Rt(e)), i = r.x - n.x, a = r.y - n.y;
		if (!i && !a) return t;
		let o = t.x + i, s = t.y + a;
		this.box = new Xe(o, s, t.w, t.h), this.lastClick = r, !this.el.dispatch("dragmove", {
			event: e,
			handler: this,
			box: this.box,
			dx: i,
			dy: a
		}).defaultPrevented && this.move(o, s);
	}
	move(e, t) {
		this.el.type === "svg" ? l.prototype.move.call(this.el, e, t) : this.el.move(e, t);
	}
	endDrag(e) {
		this.drag(e), this.el.fire("dragend", {
			event: e,
			handler: this,
			box: this.box
		}), E(window, "mousemove.drag"), E(window, "touchmove.drag"), E(window, "mouseup.drag"), E(window, "touchend.drag"), this.init(!0);
	}
};
se(he, { draggable(e = !0) {
	return (this.remember("_draggable") || new zt(this)).init(e), this;
} });
// src/figures/Polygon/Polygon.constraints.ts
var Bt = 1e3;
function Vt(e, t) {
	if (!Number.isInteger(e) || e < 3 || e > 1e3) throw new T(`Invalid number of sides ${e}: expected an integer from 3 to ${Bt}`);
	if (t !== void 0 && (!Number.isInteger(t) || t < 1 || 2 * t >= e)) throw new T(`Invalid star ${t} for ${e} sides: expected an integer from 1 to less than ${e / 2}`);
	return t ?? 1;
}
var Ht = {
	vertices: (e) => {
		if (!Array.isArray(e) || e.length < 3) throw new T(`A polygon needs at least 3 vertices, got ${Array.isArray(e) ? e.length : typeof e}`);
		let t = $e(e, "vertex of the polygon");
		return t.some((e) => !Number.isFinite(e.x) || !Number.isFinite(e.y)) ? null : {
			vertices: t.map((e) => ({
				x: e.x,
				y: e.y
			})),
			cycles: [t.map((e, t) => t)]
		};
	},
	regular: ({ center: e, radius: t, sides: n, star: i }, a) => {
		let o = Vt(n, i), s = r({ center: e }, "polygon").center;
		return _t(s, ge(t, s, a), n, o);
	},
	onSide: ({ A: e, B: t, sides: n, star: i }) => {
		let a = Vt(n, i), o = r({
			A: e,
			B: t
		}, "side of the polygon");
		return vt(o.A, o.B, n, a);
	}
};
function B(e, t) {
	return ue(Ht, e, t, "polygon");
}
function V(e, t, n) {
	return p(Ht, e, t, n);
}
// src/figures/Polygon/Polygon.ts
var Ut = class e extends y {
	constructor(t, n, r) {
		V(B(r, n), r, t.config), super(t, n), this._config = e._copy(r), this._polygon = null, this._makeShape(), this.computed();
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
		let n = V(B(t, this.name), t, this.graphConfig);
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
		return this._polygon === null ? C() : yt(this._polygon.vertices);
	}
	labelFields() {
		let e = () => {
			let e = this._polygon ?? {
				vertices: [],
				cycles: []
			};
			return {
				...e,
				vertices: e.vertices.map((e) => x(e, this.graphConfig))
			};
		}, t = () => this.graphConfig.measure;
		return {
			perimeter: (n, r) => te(St(e()), n, t(), r),
			area: (n, r) => te(Ct(e()), n, t(), r, 2)
		};
	}
	referenceable = !0;
	referenceAnchorPoint() {
		return this._polygon === null ? null : this.centroid;
	}
	computed() {
		return this._place(V(B(this._config, this.name), this._config, this.graphConfig));
	}
	_place(e) {
		return this._polygon = e, this._setDefined(e !== null), this.shape.plot(e === null ? "M 0 0" : xt(e)), this;
	}
	followable = !0;
	follow(e, t) {
		return this._polygon === null ? C() : bt(this._polygon, {
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
function Wt(e, t, n) {
	if (typeof e != "string") throw new T(`Invalid function ${JSON.stringify(e)} of ${t} for the curve "${n}": expected text`);
	return me(e, "t", `of ${t} of the curve "${n}"`);
}
function Gt(e, t) {
	Ye(e, t);
	let n = e.expressions;
	if (typeof n != "object") throw new T(`The curve "${t}" needs its functions: {expressions: {x, y}}`);
	return {
		x: Wt(n.x, "x", t),
		y: Wt(n.y, "y", t)
	};
}
// src/figures/Parametric/Parametric.ts
var Kt = {
	min: 0,
	max: 2 * Math.PI
}, qt = 64, Jt = class extends y {
	constructor(e, t, n) {
		let r = Gt(n, t);
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
		let t = Gt(e, this.name);
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
		return S(this.valueAt(e), this.graphConfig);
	}
	_draw() {
		let e = this.graphConfig, { width: t, height: n } = e, r = this._config.domain ?? Kt, i = n * (this._config.asymptoteThreshold ?? 10), a = { t: 0 }, o = (t) => {
			a.t = t;
			let n = this._numExp.x.evaluate(a), r = this._numExp.y.evaluate(a);
			return Number.isFinite(n) && Number.isFinite(r) ? S({
				x: n,
				y: r
			}, e) : C();
		}, s = this._config.samples === void 0 ? Math.max(qt, (r.max - r.min) * Math.abs(e.axis.x.x) / 8) : (r.max - r.min) * this._config.samples, c = Ee(o, r.min, r.max, {
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
		return this.shape.plot(Ue(c, i)), this._range = {
			from: r.min,
			to: r.max,
			intervals: s
		}, this._points = c, this._labelAnchor = Ce(c, t, n), this;
	}
	_points;
	followable = !0;
	follow(e, t) {
		return D(this._points, {
			x: e,
			y: t
		});
	}
	_range;
	_labelAnchor;
	_labelPlace({ point: e, direction: t }) {
		return ee(e, t, this._labelGap);
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
		let { definitions: e, options: t } = this._tikzCurveStyle(), n = this._tikzView(), r = (e) => a(e, 5), i = ([e, t]) => [e - (t - e), t + (t - e)], o = { t: "x" }, s = [
			`domain=${r(this._range.from)}:${r(this._range.to)}`,
			`samples=${this._tikzSamples(this._range.intervals)}`,
			...t
		];
		return [...e, ...this._tikzAxis([`\\addplot[${s.join(", ")}] ({${this._numExp.x.toPgf(o)}}, {${this._numExp.y.toPgf(o)}});`], {
			x: i(n.x),
			y: i(n.y)
		})].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
};
// src/figures/Follow/Follow.constraints.ts
function Yt(e, t) {
	let n = e.follow;
	if (!(n instanceof y)) throw new T(`The point "${t}" needs a figure to follow`);
	if (!n.followable) throw new T(`The point "${t}" cannot follow the figure "${n.name}": a point follows a line, a circle, a plot or a parametric curve`);
	if (e.size !== void 0 && !(typeof e.size == "number" && Number.isFinite(e.size) && e.size > 0)) throw new T(`Invalid size ${JSON.stringify(e.size)} for the point "${t}": expected a finite number greater than 0`);
	let r = e.at;
	if (r !== void 0 && (typeof r != "object" || typeof r.x != "number" || typeof r.y != "number")) throw new T(`Invalid starting position ${JSON.stringify(r)} for the point "${t}": expected a position {x, y}`);
}
// src/figures/Follow/Follow.ts
var Xt = class extends y {
	_labelGap = 12;
	constructor(e, t, n) {
		Yt(n, t), super(e, t), this.appearance.fill.color = "black", this._config = { ...n }, this._mouse = null, this._state = null, this._listener = (e) => {
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
		Yt(e, this.name), this._config = { ...e }, this._makeShape(), this.computed(), this.updateLabel();
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
		if (!w(n)) return this._state = null, this._point?.hide(), this._tangent?.hide(), this;
		this._state = {
			point: {
				x: n.x,
				y: n.y
			},
			direction: Me((t, n) => e.follow(t, n), n)
		}, this._point?.show().center(n.x, n.y);
		let r = this._tangentLine();
		return r === null ? this._tangent?.hide() : this._tangent?.show().plot(r[0].x, r[0].y, r[1].x, r[1].y), this;
	}
	_tangentLine() {
		let e = this._state?.direction;
		if (this._config.tangent !== !0 || this._state === null || !e) return null;
		let { width: t, height: n } = this.graphConfig, r = qe(this._state.point, e, t, n);
		return r === null ? null : Fe(r[0], r[1], t, n);
	}
	moveLabel() {
		if (!this.label || this._state === null) return this;
		let { point: e, alignement: t } = this._labelPlace(this._state);
		return this.label.alignementGiven || (this.label.config.alignement = t), this.label.move(e.x, e.y), this;
	}
	_labelPlace({ point: e, direction: t }) {
		return ee(e, t ?? {
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
function Zt(e) {
	return c(e.domain, [e.plot, e.other].flatMap((e) => e === void 0 ? [] : [e]));
}
function Qt(e, t) {
	let n = e.plot, r = e.other;
	if (!(n instanceof i)) throw new T(`The area "${t}" needs a plot`);
	if (r !== void 0 && !(r instanceof i)) throw new T(`The area "${t}" can only be between plots, got ${JSON.stringify(r)} as the second one`);
	if (e.domain !== void 0 && !(A(e.domain) && Number.isFinite(e.domain.min) && Number.isFinite(e.domain.max))) throw new T(`Invalid domain ${JSON.stringify(e.domain)} for the area "${t}": expected finite numbers`);
	let a = Zt(e);
	if (a !== null && a.min >= a.max) throw new T(e.domain === void 0 ? `The plots of the area "${t}" have no abscissa in common: give a domain` : `Invalid domain ${JSON.stringify(e.domain)} for the area "${t}": the minimum must be below the maximum`);
}
// src/figures/FillBetween/FillBetween.ts
var $t = .5, en = 6, tn = 10, nn = class e extends y {
	constructor(t, n, r) {
		Qt(r, n), super(t, n), this._config = e._copy(r), this._runs = [], this._range = null, this._makeShape(), this.computed();
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
		Qt(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
	}
	_runs;
	_range;
	get area() {
		if (this._runs.length === 0) return NaN;
		let { x: e, y: t } = this.graphConfig.axis;
		return at(this._runs) / Math.abs(e.x * t.y);
	}
	computed() {
		let e = this.graphConfig, { origin: t, width: n, height: r } = e, i = e.axis.x.x;
		this._runs = [], this._range = null;
		let a = {
			min: -t.x / i - 1,
			max: (n - t.x) / i + 1
		}, o = Zt(this._config) ?? a, s = Math.max(o.min, a.min), c = Math.min(o.max, a.max);
		if (s < c) {
			let { plot: a, other: o } = this._config, l = (c - s) * Math.abs(i) / 8;
			this._runs = rt((e) => a.evaluate(e), o === void 0 ? null : (e) => o.evaluate(e), t.y, {
				min: s,
				max: c
			}, (t) => x({
				x: t,
				y: 0
			}, e).x, {
				intervals: l,
				tolerance: $t,
				maxDepth: en,
				view: {
					left: 0,
					right: n,
					top: 0,
					bottom: r
				},
				bound: r * tn
			}), this._range = this._runs.length === 0 ? null : {
				from: s,
				to: c,
				intervals: l
			};
		}
		return this._setDefined(this._runs.length > 0), this.shape.plot(it(this._runs)), this;
	}
	labelFields() {
		return { area: (e) => He(this.area, e) };
	}
	defaultLabelField() {
		return "area";
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
		let { definitions: r, options: i } = this._tikzStyle(), { plot: o, other: s } = this._config, [c, l] = this._tikzView().y, u = (e) => a(e, 5), d = `pidraw-${this.name}-1`, f = `pidraw-${this.name}-2`, p = (r, i) => `\\addplot[name path=${r}, draw=none, domain=${u(e)}:${u(t)}, samples=${this._tikzSamples(n)}] {${i.numExp.toPgf()}};`;
		return [...r, ...this._tikzAxis([
			p(d, o),
			s === void 0 ? `\\path[name path=${f}] (axis cs:${u(e)},0) -- (axis cs:${u(t)},0);` : p(f, s),
			`\\addplot[${i.join(", ")}] fill between[of=${d} and ${f}];`
		], { y: [c - (l - c), l + (l - c)] })].join("\n");
	}
	_makeShape() {
		return this.clear(), this.shape = this.element.path("M 0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
	}
}, rn = 1e3;
function H(e) {
	return c(e.domain, [e.plot]);
}
function an(e, t) {
	if (!(e.plot instanceof i)) throw new T(`The Riemann sum "${t}" needs a plot`);
	let n = H(e);
	if (n === null) throw new T(`The Riemann sum "${t}" needs a domain: give one, or give a domain to the plot "${e.plot.name}"`);
	if (!A(n) || !Number.isFinite(n.min) || !Number.isFinite(n.max) || n.min >= n.max) throw new T(`Invalid domain ${JSON.stringify(n)} for the Riemann sum "${t}": expected finite numbers with the minimum below the maximum`);
	let { rectangles: r, position: a } = e;
	if (r !== void 0 && !(Number.isInteger(r) && r >= 1 && r <= 1e3)) throw new T(`Invalid number of rectangles ${JSON.stringify(r)} for the Riemann sum "${t}": expected an integer from 1 to ${rn}`);
	if (a !== void 0 && !(typeof a == "number" && a >= 0 && a <= 1)) throw new T(`Invalid position ${JSON.stringify(a)} for the Riemann sum "${t}": expected a number from 0 (left) to 1 (right)`);
}
// src/figures/Riemann/Riemann.ts
var on = class e extends y {
	_labelGap = 6;
	constructor(t, n, r) {
		an(r, n), super(t, n), this._config = e._copy(r), this._rectangles = [], this._makeShape(), this.computed();
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
		an(t, this.name), this._config = e._copy(t), this.computed(), this.updateLabel();
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
		return this._rectangles.length === 0 ? NaN : Tt(this._rectangles);
	}
	computed() {
		let e = H(this._config), t = this._config.plot;
		return this._rectangles = e === null ? [] : wt((e) => t.valueAt(e), e, this.rectangles, this.position), this._setDefined(this._rectangles.length > 0), this.shape.plot(this._path()), this;
	}
	_path() {
		if (this._rectangles.length === 0) return "M 0 0";
		let e = (e, t) => {
			let n = S({
				x: e,
				y: t
			}, this.graphConfig);
			return `${O(n.x)} ${O(n.y)}`;
		};
		return this._rectangles.map(({ x0: t, x1: n, y: r }) => `M ${e(t, 0)} L ${e(n, 0)} L ${e(n, r)} L ${e(t, r)} Z`).join(" ");
	}
	_labelPlace() {
		let e = H(this._config);
		if (e === null || this._rectangles.length === 0) return null;
		let t = Math.max(0, ...this._rectangles.map(({ y: e }) => e)), { x: n, y: r } = S({
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
			sum: (e) => He(this.sum, e),
			rectangles: () => String(this.rectangles)
		};
	}
	defaultLabelField() {
		return "sum";
	}
	moveLabel() {
		let e = this._labelPlace();
		return !this.label || e === null || (this.label.alignementGiven || (this.label.config.alignement = "tc"), this.label.move(e.x, e.y)), this;
	}
	tikz() {
		let e = this._tikzShown(), t = this._labelPlace();
		if (t === null || !e.shape && !e.label) return "";
		let n = (e, t) => `(${this._tikzCoordinates(S({
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
function sn(e, t) {
	let n = e.d, r = e.units;
	if (typeof n != "string") throw new T(`Invalid data ${JSON.stringify(n)} for the path "${t}": expected the text of an SVG path`);
	if (r !== void 0 && typeof r != "boolean") throw new T(`Invalid units ${JSON.stringify(r)} for the path "${t}": expected true or false`);
	return ye(n);
}
// src/figures/Path/Path.ts
var cn = (e) => e.reduce((t, n, r) => r === 0 ? 0 : t + Math.hypot(n.x - e[r - 1].x, n.y - e[r - 1].y), 0), ln = class extends y {
	constructor(e, t, n) {
		let r = sn(n, t);
		super(e, t), this._config = { ...n }, this._commands = r, this._pixels = [], this._makeShape(), this.computed();
	}
	_config;
	get config() {
		return this._config;
	}
	set config(e) {
		let t = sn(e, this.name);
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
		return this._pixels = this._config.units === !0 ? le(this._commands, (t) => S(t, e)) : this._commands, this._setDefined(this._pixels.length > 0), this.shape.plot(this._pixels.length === 0 ? "M 0 0" : be(this._pixels)), this;
	}
	followable = !0;
	follow(e, t) {
		let n = C(), r = Infinity;
		for (let i of ve(this._pixels)) {
			let a = D(ze(i), {
				x: e,
				y: t
			}), o = Math.hypot(a.x - e, a.y - t);
			o < r && (r = o, n = a);
		}
		return n;
	}
	_labelPlace() {
		let e = ve(this._pixels).map((e) => ({
			piece: e,
			length: cn(ze(e))
		})).reduce((e, t) => e === null || t.length > e.length ? t : e, null), t = e === null ? null : Ge(e.piece);
		return t === null ? null : ee(t.point, t.direction, this._labelGap);
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
}, un = "MAINGRID", U = "-edge", dn = [
	un,
	k.X,
	k.Y,
	`${k.X}${U}`,
	`${k.Y}${U}`
], fn = 30, pn = 5;
function mn(e, t = pn) {
	if (e instanceof y) return [e];
	if (t === 0 || typeof e != "object" || !e) return [];
	let n = Object.getPrototypeOf(e);
	return !Array.isArray(e) && n !== Object.prototype && n !== null ? [] : [...new Set(Object.values(e).flatMap((e) => mn(e, t - 1)))];
}
var hn = class extends EventTarget {
	_controllers = [];
	_controls = {};
	get controls() {
		return this._controls;
	}
	setControl(e, t) {
		return t === null ? Reflect.deleteProperty(this._controls, e) : this._controls[e] = t, this._controllers.forEach((t) => {
			t.onControlsChanged?.(e);
		}), this;
	}
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
		let { config: n, display: r } = ut(t), i = typeof e == "string" ? document.getElementById(e) : e;
		if (i === null) throw new T(`Cannot find the element "${e}" to draw the graph in`);
		let a = document.createElement("DIV");
		a.style.position = "relative", a.style.width = "100%", a.style.height = "auto", a.style.userSelect = "none", i.appendChild(a), this._wrapper = a, this._config = n, this._display = r, this._toTex = t?.tex, this._rootSVG = s().addTo(a), this._fitSvg(), this._rootSVG.defs(), this._layers = {}, Object.values(b).forEach((e) => {
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
				let r = pe(e) ? { coordinates: e } : e, i = this._make(t, b.POINTS, () => new _(this, t, r));
				return n && i.addLabel(t, {
					asHtml: n.html,
					...this._toTex === void 0 ? {} : { texConverter: this._toTex }
				}), i;
			},
			line: this._maker(u, b.MAIN),
			path: this._maker(ln, b.MAIN),
			bezier: this._maker(Je, b.MAIN),
			plot: this._maker(i, b.PLOTS),
			parametric: this._maker(Jt, b.PLOTS),
			circle: this._maker(fe, b.MAIN),
			polygon: this._maker(Ut, b.MAIN),
			arc: this._maker(Qe, b.MAIN),
			follow: this._maker(Xt, b.PLOTS_FOREGROUND),
			fillbetween: this._maker(nn, b.PLOTS_BACKGROUND),
			grid: this._maker(we, b.GRIDS),
			axis: this._maker(v, b.MAIN),
			riemann: this._maker(on, b.PLOTS_BACKGROUND)
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
		if (!Object.hasOwn(this._figures, e)) throw new T(`There is no figure named "${e}" to remove`);
		let n = this._figures[e], r = this._affectedBy([n]);
		if (r.length > 0 && t?.cascade !== !0) {
			let t = r.map((e) => `"${e.name}"`).join(", ");
			throw new T(`Cannot remove the figure "${e}": ${t} depend on it (remove them first, or use {cascade: true})`);
		}
		let i = [...r.reverse(), n];
		i.forEach((e) => {
			this._detach(e);
		});
		let a = i.map((e) => e.name);
		return this._notifyRemoved(a), a;
	}
	attach(e) {
		if (this._controllers.some((t) => t.constructor === e.constructor)) throw new T(`A ${e.constructor.name} is already attached to this graph`);
		return this._controllers.push(e), e;
	}
	clear() {
		let e = Object.keys(this._figures);
		Object.values(this._figures).forEach((e) => {
			this._detach(e);
		}), this._notifyRemoved(e);
	}
	figureChanged(e) {
		this._controllers.forEach((t) => {
			t.onFigureChanged?.(e);
		});
	}
	_notifyRemoved(e) {
		e.length !== 0 && this._controllers.forEach((t) => {
			t.onFiguresRemoved?.(e);
		});
	}
	dispose() {
		this.clear(), this._controllers.forEach((e) => {
			e.dispose();
		}), this._controllers = [], this._controls = {}, this._clearLayout(), this._lines.forEach((e) => {
			e.dispose(), e.element.remove();
		}), this._lines.clear(), this._wrapper.remove();
	}
	handle(e, t = {}) {
		let n = this.create.point({
			x: 0,
			y: 0
		}, `${e.name}_drag`);
		try {
			n.pixels = e.pixels, n.asCircle(fn).fill({
				color: "white",
				opacity: .8
			}), this.layers.interactive.add(n.element);
			let r = this.draggable(n, {
				target: e,
				...t
			});
			return e.setLabelClearance(fn / 2), r;
		} catch (e) {
			throw this.remove(n.name), e;
		}
	}
	dragTo(e, t) {
		let n = this._drags.get(e);
		if (n === void 0) throw new T(`The point "${e.name}" cannot be dragged: make it draggable first`);
		this._dragMove(n.figure, n.options, t);
	}
	_dragMove(e, t, n) {
		let { along: r, bounds: i, callback: a, follow: o = [], grid: s, target: c } = t, l = tt({
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
		for (let e of o) l = e instanceof y ? e.follow(l.x, l.y) : e(l.x, l.y);
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
		return S(e, this.config, t);
	}
	toCoordinates(e, t) {
		return x(e, this.config, t);
	}
	update(e, t) {
		let n = 0;
		if (e === void 0) return Object.values(this._figures).forEach((e) => {
			n += +!!this._refresh(e, t);
		}), {
			updated: n,
			total: this._total
		};
		let r = e instanceof y ? [e] : e, i = this._affectedBy(r);
		i.forEach((e) => {
			n += +!!this._refresh(e, t);
		});
		let a = new Set(r);
		a.forEach((e) => {
			e.updateLabel();
		});
		let o = /* @__PURE__ */ new Set([...a, ...i]);
		return Object.values(this._figures).forEach((e) => {
			e.labelReference !== null && o.has(e.labelReference) && e.updateLabel();
		}), {
			updated: n + a.size,
			total: this._total
		};
	}
	updateLayout(e, t) {
		e !== void 0 && dt(e);
		let n = Object.values(this._figures).filter((e) => e instanceof _ && e.isMoved()).map((e) => ({
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
		let i = n.filter(({ coordinates: e }) => w(e));
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
		for (let n of Object.values(b)) n !== b.INTERACTIVE && this._layers[n].children().forEach((n) => {
			let r = e.get(n.node);
			r && t.push(r.tikz());
		});
		return f(this._config, t);
	}
	tikzPreamble() {
		return _e;
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
		let e = typeof this._display.grid == "object" ? this._display.grid : {}, { x: t, y: n } = Ze(e), r = e.subdivisions ?? 1;
		return {
			x: t / r,
			y: n / r
		};
	}
	_checkDraggable(e, t) {
		if (!(e instanceof _)) {
			let t = e instanceof y ? `"${e.name}" is a ${e.constructor.name}` : "it is not a figure";
			throw new T(`Only a point can be made draggable: ${t}`);
		}
		if (this._held.has(e) || e.isDraggable) throw new T(`The point "${e.name}" is already draggable`);
		let { along: n, bounds: r, follow: i, target: a } = t;
		if (n !== void 0 && n !== "x" && n !== "y") throw new T(`Invalid along ${JSON.stringify(n)} for the point "${e.name}": expected 'x' or 'y'`);
		if (a !== void 0 && !(a instanceof _)) throw new T(`The target of the point "${e.name}" must be a point`);
		if (i !== void 0 && (!Array.isArray(i) || i.some((e) => typeof e != "function" && !(e instanceof y)))) throw new T(`The follow of the point "${e.name}" must be a list of functions and figures`);
		for (let [t, n] of Object.entries(r ?? {})) if (n !== void 0 && !(Number.isFinite(n.min) && Number.isFinite(n.max))) throw new T(`Invalid bounds ${t} ${JSON.stringify(n)} for the point "${e.name}": expected {min, max}, two finite numbers`);
	}
	_detach(e) {
		let t = e instanceof _ ? this._drags.get(e) : void 0;
		t?.figure === e && t.options.target?.setLabelClearance(0), Object.values(this._figures).forEach((t) => {
			t.labelReference === e && t.setLabelReference(null);
		}), e.dispose(), e.element.remove(), delete this._figures[e.name], this._total--, this._held.delete(e), this._drags.forEach((t, n) => {
			(n === e || t.figure === e) && this._drags.delete(n);
		}), this._links.delete(e), this._dependents = null;
	}
	_dependentsMap() {
		let e = Object.values(this._figures), t = this._dependents === null;
		for (let n of e) this._links.get(n)?.config !== n.config && (this._links.set(n, {
			config: n.config,
			dependencies: mn(n.config)
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
				if (t === "visiting") throw new T(`The figure "${r.name}" depends on itself, through "${e.name}"`);
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
		this._mainGrid = e ? this._decorate(new we(this, un, e === !0 ? {} : e), b.GRIDS) : null;
		let { origin: t, axis: n, width: r, height: i } = this._config, a = m(this._display.axis), o = mt(t, r, i, n), s = this._makeLayoutAxis(k.X, n.x, a.x, o.x), c = this._makeLayoutAxis(k.Y, n.y, a.y, o.y);
		return (/* @__PURE__ */ new Set([
			s.line,
			s.drawn,
			c.line,
			c.drawn
		])).forEach((e) => {
			this._layers.axis.add(e.element);
		}), {
			axes: {
				x: s.line,
				y: c.line
			},
			drawn: {
				x: s.drawn,
				y: c.drawn
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
			drawn: n === !1 ? i : this._makeAxis(`${e}${U}`, t, r.A, n, r.side)
		};
	}
	_makeAxis(e, t, n, r, i, a = !1) {
		let o = ne({
			A: n,
			d: t
		}, i, r), s = a ? this._lines.get(e) : void 0;
		return s ? (s.resetStyle(), s.config = o) : a ? (s = new v(this, e, o), this._layers.axis.add(s.element), this._lines.set(e, s)) : s = this._decorate(new v(this, e, o), b.AXIS), s.static = !0, r === !1 ? s.hide() : s;
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
		if (typeof t != "string" || t.trim() === "") throw new T(`Invalid name ${JSON.stringify(t)} for a figure: expected a text`);
		if (dn.includes(e)) throw new T(`The name "${e}" is the one of a figure of the layout of the graph (the grid and the axes): choose another name`);
		if (Object.hasOwn(this._figures, e)) throw new T(`There is already a figure named "${e}"`);
	}
}, gn = String.raw`(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?`, W = `[+-]?${gn}`, _n = RegExp(`^${W}$`), vn = RegExp(`^(${W})/(${W})$`), yn = RegExp(`^(${W});(${W})(?:;(?<z>${W}))?$`), bn = RegExp(`^(${W}):(${W})(?::(?<axis>[xyz]))?$`), xn = RegExp(`^(${W}):(${W}):(${gn})$`);
function Sn(e) {
	return vn.test(e);
}
function G(e) {
	let t = e.trim();
	if (t.startsWith("[") && t.endsWith("]")) {
		let n = t.slice(1, -1);
		return n.includes("[") || n.includes("]") ? e : n.trim() === "" ? [] : n.split(",").map((e) => Cn(e.trim()));
	}
	return Cn(e);
}
function Cn(e) {
	if (e === "") return !0;
	let t = e.trim();
	if (_n.test(t)) {
		let n = Number(t);
		return Number.isFinite(n) ? n : e;
	}
	let n = vn.exec(t);
	if (n) {
		let t = Number(n[1]) / Number(n[2]);
		return Number.isFinite(t) ? t : e;
	}
	let r = yn.exec(t);
	if (r) {
		let t = Number(r[1]), n = Number(r[2]), i = r.groups?.z === void 0 ? void 0 : Number(r.groups.z);
		return [
			t,
			n,
			i ?? 0
		].every(Number.isFinite) ? i === void 0 ? {
			x: t,
			y: n
		} : {
			x: t,
			y: n,
			z: i
		} : e;
	}
	let i = bn.exec(t);
	if (i) {
		let t = Number(i[1]), n = Number(i[2]);
		return [t, n].every(Number.isFinite) ? {
			min: Math.min(t, n),
			max: Math.max(t, n),
			axis: i.groups?.axis ?? "x"
		} : e;
	}
	let a = xn.exec(t);
	if (a) {
		let t = Number(a[1]), n = Number(a[2]), r = Number(a[3]);
		return [
			t,
			n,
			r
		].every(Number.isFinite) ? {
			min: Math.min(t, n),
			max: Math.max(t, n),
			step: Math.max(r, Math.abs(n - t) / 100)
		} : e;
	}
	return e;
}
var wn = class extends Error {
	name = "PiParserError";
}, K = class extends wn {
	name = "ParseError";
	from;
	to;
	constructor(e, t) {
		super(e, t), this.from = t?.from, this.to = t?.to;
	}
}, q = class extends wn {
	name = "InvalidArgumentError";
};
function J(e) {
	let t = [];
	for (let n = 0; n <= e.length; n++) t.push(n);
	return {
		text: e,
		at: t
	};
}
function Y(e) {
	return {
		from: e.at[0],
		to: e.at[e.text.length]
	};
}
function X(e, t, n) {
	let r = Math.min(Math.max(t, 0), e.text.length), i = Math.max(r, Math.min(n, e.text.length));
	return {
		text: e.text.slice(r, i),
		at: e.at.slice(r, i + 1)
	};
}
function Z(e) {
	return e.text.trim() === "" ? X(e, 0, 0) : X(e, e.text.length - e.text.trimStart().length, e.text.trimEnd().length);
}
function Tn(e, t) {
	let n = "", r = [];
	return e.forEach((i, a) => {
		if (a > 0) {
			let i = e[a - 1].at.at(-1) ?? 0;
			n += t;
			for (let e = 0; e < t.length; e++) r.push(i + e);
		}
		n += i.text, r.push(...i.at.slice(0, -1));
	}), r.push(e.at(-1)?.at.at(-1) ?? 0), {
		text: n,
		at: r
	};
}
function Q(e, t) {
	if (t === "") throw new q("The splitter must not be empty");
	let { text: n, at: r } = e, i = "\\" + t, a = [], o = "", s = [], c = 0;
	for (; c < n.length;) if (n.startsWith(i, c)) {
		o += t, s.push(r[c]);
		for (let e = 1; e < t.length; e++) s.push(r[c + 1 + e]);
		c += 1 + t.length;
	} else n.startsWith(t, c) ? (s.push(r[c]), a.push({
		text: o,
		at: s
	}), o = "", s = [], c += t.length) : (o += n[c], s.push(r[c]), c++);
	return s.push(r[n.length]), a.push({
		text: o,
		at: s
	}), a;
}
function En(e, t) {
	return Q(J(e), t).map((e) => e.text);
}
function Dn(e) {
	let t = e.indexOf("=");
	return t === -1 ? {
		key: e,
		value: void 0
	} : {
		key: e.slice(0, t),
		value: e.slice(t + 1)
	};
}
function On(e) {
	let t = e.text.indexOf("=");
	return t === -1 ? {
		key: e,
		value: void 0
	} : {
		key: X(e, 0, t),
		value: X(e, t + 1, e.text.length)
	};
}
function kn(e, t = ",") {
	let n = e.trim();
	if (!n.startsWith("<")) throw new K(`expected a set between chevrons like "<3-5,7,9>", found "${n}"`);
	let r = n.indexOf(">");
	if (r === -1) throw new K(`the "<" of "${n}" has no closing ">"`);
	if (r !== n.length - 1) throw new K(`unexpected text "${n.slice(r + 1)}" after the ">" of "${n.slice(0, r + 1)}"`);
	let i = En(n.slice(1, r), t).map((e) => e.trim()).filter((e) => e !== "").map((e) => jn(e));
	if (i.length === 0) throw new K(`the set "${n}" has no element`);
	return {
		items: i,
		raw: n
	};
}
var An = /^(\d+)?(?:(\s*-\s*)(\d+)?)?$/;
function jn(e) {
	let t = An.exec(e);
	if (t === null || $(t, 1) === void 0 && $(t, 3) === void 0) throw new K(`invalid element "${e}": expected 3, 3-5, 3- or -5`);
	let n = $(t, 1), r = $(t, 2), i = $(t, 3), a = n === void 0 ? 1 : Mn(n, e);
	if (r === void 0) return {
		from: a,
		to: a
	};
	if (i === void 0) return { from: a };
	let o = Mn(i, e);
	if (o < a) throw new K(`the element "${e}" is reversed: its second number must not be less than the first`);
	return {
		from: a,
		to: o
	};
}
function $(e, t) {
	return e[t];
}
function Mn(e, t) {
	let n = Number(e);
	if (!Number.isSafeInteger(n)) throw new K(`the number of the element "${t}" is too large`);
	if (n < 1) throw new K(`the element "${t}" must be at least 1`);
	return n;
}
var Nn = class {
	#e;
	#t = "->";
	#n = ",";
	#r = "/";
	#i = [];
	#a = {};
	constructor(e) {
		e && (this.#e = e.formatter, e.splitter?.main !== void 0 && (this.splitter_main = e.splitter.main), e.splitter?.entry !== void 0 && (this.splitter_entry = e.splitter.entry), e.splitter?.parameter !== void 0 && (this.splitter_parameter = e.splitter.parameter), e.keys && (this.keys = e.keys), e.types && (this.types = e.types));
	}
	get splitter() {
		return {
			main: this.#t,
			entry: this.#n,
			parameter: this.#r
		};
	}
	set splitter_main(e) {
		this.#t = this.#o("main", e);
	}
	set splitter_entry(e) {
		this.#n = this.#o("entry", e);
	}
	set splitter_parameter(e) {
		this.#r = this.#o("parameter", e);
	}
	#o(e, t) {
		if (t === "") throw new q(`The ${e} splitter must not be empty`);
		return t;
	}
	get formatter() {
		return this.#e;
	}
	set formatter(e) {
		this.#e = e;
	}
	get keys() {
		return [...this.#i];
	}
	set keys(e) {
		this.#i = [...e];
	}
	get types() {
		return { ...this.#a };
	}
	set types(e) {
		this.#a = this.#s(e);
	}
	#s(e) {
		for (let [t, n] of Object.entries(e)) if (!(typeof n == "function" || [
			"auto",
			"text",
			"set"
		].includes(n))) throw new q(`The type of the key "${t}" is not valid: expected 'auto', 'text', 'set' or a function`);
		return { ...e };
	}
	#c(e) {
		return e === void 0 ? { types: {} } : Array.isArray(e) ? {
			keys: e,
			types: {}
		} : {
			keys: e.keys,
			types: e.types ? this.#s(e.types) : {}
		};
	}
	parse(e, t) {
		let [n, ...r] = Q(J(e), this.#t), i = r.length > 0 ? Tn(r, this.#t) : void 0, a = Y(Z(n)), o = (this.#e ? this.#e(n.text) : n.text).trim(), { name: s, key: c, values: l, rawValues: u } = this.#l(o, a), { keys: d, types: f } = this.#c(t);
		return {
			name: s,
			key: c,
			values: l,
			rawValues: u,
			entry: a,
			parameters: this.#h(i, d, f)
		};
	}
	tryParse(e, t) {
		try {
			return {
				ok: !0,
				value: this.parse(e, t)
			};
		} catch (e) {
			if (e instanceof K) return {
				ok: !1,
				error: e
			};
			throw e;
		}
	}
	parameters(e, t) {
		let { keys: n, types: r } = this.#c(t);
		return this.#h(J(e), n ?? this.#i, {
			...this.#a,
			...r
		});
	}
	#l(e, t) {
		let n = e.search(/\s/), r = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1), a = r.split("=");
		if (a.length !== 2) throw new K(`Cannot parse "${e}": expected "name=key", found ${a.length === 1 ? "no" : "several"} "="`, t);
		let [o, s] = a;
		if (o === "" || s === "") throw new K(`Cannot parse "${e}": the ${o === "" ? "name" : "key"} is empty`, t);
		let c = this.#u(J(i)).map((e) => e.text.trim());
		return {
			name: o,
			key: s,
			values: c.map((e) => G(e)),
			rawValues: c
		};
	}
	#u(e) {
		return Q(e, this.#n).filter((e) => e.text.trim() !== "");
	}
	#d(e, t, n) {
		let r = [...t, ...Object.keys(n)], i = [], a;
		for (let t of e) {
			if (a !== void 0) {
				a.push(t), t.text.includes(">") && (a = void 0);
				continue;
			}
			let e = i.at(-1);
			e !== void 0 && this.#p(e[0].text, t.text, r, n) ? e.push(t) : (i.push([t]), this.#m(t.text, n) && (a = i.at(-1)));
		}
		return i.map((e) => e.length === 1 ? e[0] : Tn(e, this.#n));
	}
	#f(e, t) {
		let n = Dn(e).key.trim();
		return Object.hasOwn(t, n) ? t[n] : void 0;
	}
	#p(e, t, n, r) {
		if (!e.includes("=")) return !1;
		let i = this.#f(e, r);
		return i === "set" ? !1 : i === "text" ? !n.includes(Dn(t).key.trim()) : !t.includes("=") && !n.includes(t.trim());
	}
	#m(e, t) {
		if (this.#f(e, t) !== "set") return !1;
		let n = (Dn(e).value ?? "").trim();
		return n.startsWith("<") && !n.includes(">");
	}
	#h(e, t, n) {
		if (e === void 0) return {};
		let r = this.#u(e), i = t ?? [], a = i.length === 0 && Object.keys(n).length === 0 ? r : this.#d(r, i, n), o = {};
		for (let e of a) {
			let { key: t, parameter: r } = this.#g(e, n);
			if (Object.hasOwn(o, t)) throw new K(`Cannot parse the parameter "${e.text.trim()}": the key "${t}" is already used`, r.range);
			Object.defineProperty(o, t, {
				value: r,
				enumerable: !0,
				writable: !0,
				configurable: !0
			});
		}
		return o;
	}
	#g(e, t) {
		let { key: n, value: r } = On(e), i = Z(n), a = i.text, o = Y(Z(e)), s = Y(i);
		if (a === "") throw new K(`Cannot parse the parameter "${e.text.trim()}": the key is empty`, o);
		let c = r === void 0 ? {
			text: "",
			at: [s.to]
		} : Z(r), l = c.text, u = Object.hasOwn(t, a) ? t[a] : void 0, d = u === void 0 || u === "auto";
		if (d && this.#r === "/" && Sn(l)) return {
			key: a,
			parameter: {
				value: G(l),
				raw: l,
				options: [],
				rawOptions: [],
				range: o,
				keyRange: s,
				valueRange: Y(c),
				optionRanges: []
			}
		};
		let [f, ...p] = Q(c, this.#r).map((e) => Z(e)), m = Y(f);
		return {
			key: a,
			parameter: {
				value: d ? G(f.text) : this.#_(f.text, u, e.text, m),
				raw: f.text,
				options: p.map((e) => G(e.text)),
				rawOptions: p.map((e) => e.text),
				range: o,
				keyRange: s,
				valueRange: m,
				optionRanges: p.map((e) => Y(e))
			}
		};
	}
	#_(e, t, n, r) {
		try {
			return t === "set" ? kn(e, this.#n) : e === "" ? !0 : t === "text" ? e : t(e);
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			throw new K(`Cannot parse the parameter "${n.trim()}": ${t}`, {
				cause: e,
				...r
			});
		}
	}
}, Pn = "%", Fn = "$", In = "@";
function Ln(e) {
	return ke(e) ?? Be(e) ?? Ie(e) ?? Ae(e) ?? e;
}
function Rn() {
	return Object.entries(Se).flatMap(([e, t]) => t.commands === void 0 ? [] : [[e, t.commands]]);
}
function zn(e, t, n) {
	let r = [], i = Rn(), a = new Map(i.map(([e, t]) => [e, t.initial])), o = {};
	return e.split("\n").forEach((e, s) => {
		let c = s + 1, l = e.trim(), u = e.length - e.trimStart().length;
		if (!(l === "" || l.startsWith(Pn) || l.startsWith(Fn))) try {
			if (l.startsWith(In)) {
				let [e, t, s] = Bn(l, i);
				a.set(t, s.fold(a.get(t), e, n)), o = Object.assign({}, ...i.map(([e, t]) => t.defaults(a.get(e)))), r.push({
					number: c,
					text: l,
					indent: u,
					command: e
				});
				return;
			}
			r.push({
				number: c,
				text: l,
				indent: u,
				item: t(l),
				controls: o
			});
		} catch (e) {
			r.push({
				number: c,
				text: l,
				indent: u,
				error: Vn(e, l),
				controls: o
			});
		}
	}), {
		lines: r,
		graphControls: i.reduce((e, [t, n]) => ({
			...e,
			...n.graphControls?.(a.get(t))
		}), {})
	};
}
function Bn(e, t) {
	let n = /^@(\w+)\s*(.*)$/.exec(e), r = n === null ? void 0 : t.find(([, e]) => e.names.includes(n[1]));
	if (n === null || r === void 0) {
		let n = t.flatMap(([, e]) => e.names);
		throw new d(`Cannot read the command "${e}": expected ${n.map((e) => `@${e}`).join(" or ")}`);
	}
	return [{
		name: n[1],
		value: n[2],
		text: e
	}, ...r];
}
function Vn(e, t) {
	if (e instanceof d) return e;
	let n = e instanceof Error ? e.message : String(e);
	return new d(`Cannot read "${t}": ${n}`, { cause: e });
}
// src/Draw/Draw.diff.ts
function Hn(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length && e[n].text === t[n].text && !e[n].fallback;) n++;
	return n;
}
function Un(e, t, n) {
	let r = (e) => e.filter((e) => e.number !== n).map((e) => `${e.number}:${e.text}`), i = r(e), a = r(t);
	if (!(i.length !== a.length || i.some((e, t) => e !== a[t]))) return e.find((e) => e.number === n);
}
// src/Draw/Draw.report.ts
function Wn(e, t) {
	if (e instanceof h) return e;
	let n = e instanceof Error ? e.message : String(e);
	return new d(`Cannot read "${t}": ${n}`, { cause: e });
}
function Gn(e, t, n = 0) {
	let r = e.indexOf("->");
	if (!(t instanceof ce) || r < 0) return {};
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
function Kn(e, t, n) {
	return {
		line: e.number,
		text: e.text,
		...Gn(e.text, t, e.indent),
		severity: n,
		message: t.message,
		error: t
	};
}
// src/Draw/Draw.ts
var qn = Object.values(k), Jn = Te().flatMap((e) => e.handleControls ?? []);
function Yn(e, t, n) {
	let r = e[n];
	r !== void 0 && t.setControl(n, r);
}
var Xn = class {
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
		this.graph = new hn(e, t?.tex === void 0 ? {} : { tex: t.tex }), this._parser = new Nn({
			formatter: Ln,
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
		return De;
	}
	refresh(e, t = {}) {
		let { editing: n, drag: r = "keep" } = t;
		if (n !== void 0 && !(Number.isInteger(n) && n >= 1)) throw new T(`Invalid line ${String(n)} to edit: expected a line number, an integer from 1`);
		return this._build(e, n, r);
	}
	refreshLayout(e) {
		try {
			let t = Ke(e ?? "", this._parser);
			this.graph.updateLayout({
				...ft({
					...t.window,
					unit: t.unit
				}),
				system: j.CARTESIAN_2D,
				measure: t.measure
			}, t.display), this._settings = t.defaults, this._applyLayoutOptions(t.options), (e ?? "") !== this._parameters && (this._lines = []), this._parameters = e ?? "", this._layoutError = null;
		} catch (t) {
			if (!(t instanceof h)) throw t;
			let n = (e ?? "").trim();
			this._layoutError = Kn({
				number: 1,
				text: n,
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
		for (let [e, n] of t) e !== null && Object.keys(n).length > 0 && We(n, e, this.graph);
	}
	_build(e, t, n = "keep") {
		let { lines: r, graphControls: i } = zn(e, (e) => this._parser.parse(e, Re()), this._parser), a = this._lines, o = t === void 0 ? void 0 : Un(a, r, t), s = Hn(a, r);
		if (n === "reset") {
			let e = a.findIndex((e) => e.created.some((e) => this._moved.has(e)));
			s = e < 0 ? s : Math.min(s, e), this._moved.clear();
		}
		let c = a.slice(0, s).map((e, t) => ({
			...e,
			number: r[t].number,
			indent: r[t].indent
		}));
		this._removeAfter(new Set(c.flatMap((e) => e.created)));
		let l = [];
		for (let e of r.slice(s)) {
			let n = this._buildLine(e, e.number === t ? o : void 0);
			this._restore(n), l.push(...n.created), c.push(n);
		}
		this._code = r.flatMap((e) => e.item === void 0 ? [] : [e.item]), this._lines = c, this._report = this._reportOf(c, t);
		for (let e of Object.keys(i)) this.graph.setControl(e, i[e] ?? null);
		return this._moved.forEach((e, t) => {
			Object.hasOwn(this.graph.figures, t) || this._moved.delete(t);
		}), l.length > 0 && this.graph.update(l.map((e) => this.graph.figures[e])), this._report;
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
			n.push(Kn(i, i.error, e)), r.push({
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
			if (e.command !== void 0) return {
				...i,
				valid: null,
				validText: e.text,
				error: null,
				fallback: !1,
				created: []
			};
			let t = structuredClone(e.item);
			return this._buildItem(e.item, e.controls), {
				...i,
				valid: t,
				validText: e.text,
				error: null,
				fallback: !1,
				created: r()
			};
		} catch (n) {
			let a = Wn(n, e.text);
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
				return this._buildItem(structuredClone(t.valid), e.controls ?? {}), {
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
	_buildItem(e, t) {
		if (qn.includes(e.name)) throw new d(`Cannot build "${e.name}" (${e.key}): ${e.name} is the name of an axis of the graph, choose another name`);
		let n = e.key;
		if (n === void 0 || !Object.hasOwn(De, n)) throw new d(`Cannot build "${e.name}": ${n === void 0 ? "expected <name>=<key> <values>" : `"${n}" is not a kind of figure`}`);
		e.name = this._uniqueName(e.name);
		let r = De[e.key].build(e, this._namedFigures(), this.graph.config);
		if (r === null) throw new d(`Cannot build "${e.name}" (${e.key}): nothing to build`);
		let i = Array.isArray(r) ? r : [r];
		i.forEach(({ config: n, create: r }, a) => {
			let o = this.graph.create, s = Object.hasOwn(o, r) ? o[r] : void 0;
			if (s === void 0) throw new d(`Cannot build "${e.name}" (${e.key}): the graph cannot make a "${r}"`);
			let c = s.call(o, n, e.name + (i.length > 1 ? `${a + 1}` : ""));
			We(je(e.parameters, this._settings, c), c, this.graph);
			for (let n of Object.keys(t)) Object.hasOwn(e.parameters, n) || Yn(t, c, n);
			let l = this.graph.figures[`${c.name}_drag`];
			l !== void 0 && Jn.forEach((e) => {
				Yn(c.controls, l, e);
			});
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
export { Nt as Animate, k as Axes, j as CoordinateSystem, de as EASINGS, T as InvalidArgumentError, b as LayerName, M as LoopStyle, ie as MathError, ae as NotImplementedError, ce as OptionError, d as ParseError, Xn as PiDraw, h as PiDrawError, hn as PiGraph, Lt as Slides, g as UnsupportedOperationError, R as ZOOM_ALLOWS, N as ZOOM_LIMITS, z as ZOOM_STEP, Ft as Zoom, A as isDomain, pe as isXY, re as setAnimation, o as setSlide };

//# sourceMappingURL=pidraw.js.map