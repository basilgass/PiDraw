var Mn = Object.defineProperty;
var ds = (i) => {
  throw TypeError(i);
};
var Ln = (i, t, e) => t in i ? Mn(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var et = (i, t, e) => Ln(i, typeof t != "symbol" ? t + "" : t, e), yi = (i, t, e) => t.has(i) || ds("Cannot " + e);
var o = (i, t, e) => (yi(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? ds("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, s) => (yi(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), b = (i, t, e) => (yi(i, t, "access private method"), e);
const Oi = {}, Ss = [];
function k(i, t) {
  if (Array.isArray(i)) {
    for (const e of i)
      k(e, t);
    return;
  }
  if (typeof i == "object") {
    for (const e in i)
      k(e, i[e]);
    return;
  }
  Ms(Object.getOwnPropertyNames(t)), Oi[i] = Object.assign(Oi[i] || {}, t);
}
function st(i) {
  return Oi[i] || {};
}
function Rn() {
  return [...new Set(Ss)];
}
function Ms(i) {
  Ss.push(...i);
}
function Wi(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function Pn(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function xi(i) {
  return i % 360 * Math.PI / 180;
}
function Dn(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function Ls(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Ce(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function Ci(i, t) {
  const e = i.origin;
  let s = i.ox != null ? i.ox : i.originX != null ? i.originX : "center", n = i.oy != null ? i.oy : i.originY != null ? i.originY : "center";
  e != null && ([s, n] = Array.isArray(e) ? e : typeof e == "object" ? [e.x, e.y] : [e, e]);
  const r = typeof s == "string", h = typeof n == "string";
  if (r || h) {
    const { height: a, width: c, x: u, y: l } = t.bbox();
    r && (s = s.includes("left") ? u : s.includes("right") ? u + c : u + c / 2), h && (n = n.includes("top") ? l : n.includes("bottom") ? l + a : l + a / 2);
  }
  return [s, n];
}
const Fn = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Ti = (i) => Fn.has(i.nodeName), Rs = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, Ki = "http://www.w3.org/2000/svg", zn = "http://www.w3.org/1999/xhtml", bi = "http://www.w3.org/2000/xmlns/", Ve = "http://www.w3.org/1999/xlink", O = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function $n() {
  return O.window;
}
class Zi {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const he = {}, Qi = "___SYMBOL___ROOT___";
function Me(i, t = Ki) {
  return O.document.createElementNS(t, i);
}
function J(i, t = !1) {
  if (i instanceof Zi) return i;
  if (typeof i == "object")
    return wi(i);
  if (i == null)
    return new he[Qi]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return wi(O.document.querySelector(i));
  const e = t ? O.document.createElement("div") : Me("svg");
  return e.innerHTML = i, i = wi(e.firstChild), e.removeChild(e.firstChild), i;
}
function z(i, t) {
  return t && (t instanceof O.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Me(i);
}
function ft(i) {
  if (!i) return null;
  if (i.instance instanceof Zi) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new he.Fragment(i);
  let t = Ls(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : he[t] || (t = "Dom"), new he[t](i);
}
let wi = ft;
function C(i, t = i.name, e = !1) {
  return he[t] = i, e && (he[Qi] = i), Ms(Object.getOwnPropertyNames(i.prototype)), i;
}
function jn(i) {
  return he[i];
}
let Un = 1e3;
function Ps(i) {
  return "Svgjs" + Ls(i) + Un++;
}
function Ds(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    Ds(i.children[t]);
  return i.id && (i.id = Ps(i.nodeName)), i;
}
function v(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function D(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function Bn() {
  return this.parent().children();
}
function Vn() {
  return this.parent().index(this);
}
function qn() {
  return this.siblings()[this.position() + 1];
}
function Gn() {
  return this.siblings()[this.position() - 1];
}
function Hn() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function Xn() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function Yn() {
  return this.parent().add(this.remove()), this;
}
function Wn() {
  return this.parent().add(this.remove(), 0), this;
}
function Kn(i) {
  i = J(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function Zn(i) {
  i = J(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function Qn(i) {
  return i = J(i), i.before(this), this;
}
function Jn(i) {
  return i = J(i), i.after(this), this;
}
k("Dom", {
  siblings: Bn,
  position: Vn,
  next: qn,
  prev: Gn,
  forward: Hn,
  backward: Xn,
  front: Yn,
  back: Wn,
  before: Kn,
  after: Zn,
  insertBefore: Qn,
  insertAfter: Jn
});
const Fs = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, tr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, er = /rgb\((\d+),(\d+),(\d+)\)/, ir = /(#[a-z_][a-z0-9\-_]*)/i, sr = /\)\s*,?\s*/, nr = /\s/g, ps = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, ms = /^rgb\(/, gs = /^(\s+)?$/, ys = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, rr = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, Lt = /[\s,]+/, Ji = /[MLHVCSQTAZ]/i;
function or() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(Lt);
}
function hr(i) {
  return this.classes().indexOf(i) !== -1;
}
function ar(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function cr(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function ur(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
k("Dom", {
  classes: or,
  hasClass: hr,
  addClass: ar,
  removeClass: cr,
  toggleClass: ur
});
function lr(i, t) {
  const e = {};
  if (arguments.length === 0)
    return this.node.style.cssText.split(/\s*;\s*/).filter(function(s) {
      return !!s.length;
    }).forEach(function(s) {
      const n = s.split(/\s*:\s*/);
      e[n[0]] = n[1];
    }), e;
  if (arguments.length < 2) {
    if (Array.isArray(i)) {
      for (const s of i) {
        const n = s;
        e[s] = this.node.style.getPropertyValue(n);
      }
      return e;
    }
    if (typeof i == "string")
      return this.node.style.getPropertyValue(i);
    if (typeof i == "object")
      for (const s in i)
        this.node.style.setProperty(
          s,
          i[s] == null || gs.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || gs.test(t) ? "" : t
  ), this;
}
function fr() {
  return this.css("display", "");
}
function dr() {
  return this.css("display", "none");
}
function pr() {
  return this.css("display") !== "none";
}
k("Dom", {
  css: lr,
  show: fr,
  hide: dr,
  visible: pr
});
function mr(i, t, e) {
  if (i == null)
    return this.data(
      Wi(
        Pn(
          this.node.attributes,
          (s) => s.nodeName.indexOf("data-") === 0
        ),
        (s) => s.nodeName.slice(5)
      )
    );
  if (i instanceof Array) {
    const s = {};
    for (const n of i)
      s[n] = this.data(n);
    return s;
  } else if (typeof i == "object")
    for (t in i)
      this.data(t, i[t]);
  else if (arguments.length < 2)
    try {
      return JSON.parse(this.attr("data-" + i));
    } catch {
      return this.attr("data-" + i);
    }
  else
    this.attr(
      "data-" + i,
      t === null ? null : e === !0 || typeof t == "string" || typeof t == "number" ? t : JSON.stringify(t)
    );
  return this;
}
k("Dom", { data: mr });
function gr(i, t) {
  if (typeof arguments[0] == "object")
    for (const e in i)
      this.remember(e, i[e]);
  else {
    if (arguments.length === 1)
      return this.memory()[i];
    this.memory()[i] = t;
  }
  return this;
}
function yr() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function xr() {
  return this._memory = this._memory || {};
}
k("Dom", { remember: gr, forget: yr, memory: xr });
function br(i) {
  return i.length === 4 ? [
    "#",
    i.substring(1, 2),
    i.substring(1, 2),
    i.substring(2, 3),
    i.substring(2, 3),
    i.substring(3, 4),
    i.substring(3, 4)
  ].join("") : i;
}
function wr(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function fe(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function _r(i, t) {
  const e = fe(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : fe(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : fe(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : fe(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : fe(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : fe(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function kr(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function _i(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
class R {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof R || this.isRgb(t) || this.test(t));
  }
  // Test if given value is an rgb object
  static isRgb(t) {
    return t && typeof t.r == "number" && typeof t.g == "number" && typeof t.b == "number";
  }
  /*
  Generating random colors
  */
  static random(t = "vibrant", e) {
    const { random: s, round: n, sin: r, PI: h } = Math;
    if (t === "vibrant") {
      const a = 24 * s() + 57, c = 38 * s() + 45, u = 360 * s();
      return new R(a, c, u, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * h * e / 0.5 + 0.01) + 150), c = n(50 * r(2 * h * e / 0.5 + 4.6) + 200), u = n(100 * r(2 * h * e / 0.5 + 2.3) + 150);
      return new R(a, c, u);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, c = 17 * s() + 9, u = 360 * s();
      return new R(a, c, u, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), c = 50 * s() + 86, u = 360 * s();
      return new R(a, c, u, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), c = 255 * s(), u = 255 * s();
      return new R(a, c, u);
    } else if (t === "lab") {
      const a = 100 * s(), c = 256 * s() - 128, u = 256 * s() - 128;
      return new R(a, c, u, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new R(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (ps.test(t) || ms.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((g) => g / 255), a = Math.min(1 - n, 1 - r, 1 - h);
    if (a === 1)
      return new R(0, 0, 0, 1, "cmyk");
    const c = (1 - n - a) / (1 - a), u = (1 - r - a) / (1 - a), l = (1 - h - a) / (1 - a);
    return new R(c, u, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((L) => L / 255), a = Math.max(n, r, h), c = Math.min(n, r, h), u = (a + c) / 2, l = a === c, f = a - c, g = l ? 0 : u > 0.5 ? f / (2 - a - c) : f / (a + c), _ = l ? 0 : a === n ? ((r - h) / f + (r < h ? 6 : 0)) / 6 : a === r ? ((h - n) / f + 2) / 6 : a === h ? ((n - r) / f + 4) / 6 : 0;
    return new R(360 * _, 100 * g, 100 * u, "hsl");
  }
  init(t = 0, e = 0, s = 0, n = 0, r = "rgb") {
    if (t = t || 0, this.space)
      for (const f in this.space)
        delete this[this.space[f]];
    if (typeof t == "number")
      r = typeof n == "string" ? n : r, n = typeof n == "string" ? 0 : n, Object.assign(this, { _a: t, _b: e, _c: s, _d: n, space: r });
    else if (t instanceof Array)
      this.space = e || (typeof t[3] == "string" ? t[3] : t[4]) || "rgb", Object.assign(this, { _a: t[0], _b: t[1], _c: t[2], _d: t[3] || 0 });
    else if (t instanceof Object) {
      const f = _r(t, e);
      Object.assign(this, f);
    } else if (typeof t == "string")
      if (ms.test(t)) {
        const f = t.replace(nr, ""), [g, _, N] = er.exec(f).slice(1, 4).map((L) => parseInt(L));
        Object.assign(this, { _a: g, _b: _, _c: N, _d: 0, space: "rgb" });
      } else if (ps.test(t)) {
        const f = (L) => parseInt(L, 16), [, g, _, N] = tr.exec(br(t)).map(f);
        Object.assign(this, { _a: g, _b: _, _c: N, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: h, _b: a, _c: c, _d: u } = this, l = this.space === "rgb" ? { r: h, g: a, b: c } : this.space === "xyz" ? { x: h, y: a, z: c } : this.space === "hsl" ? { h, s: a, l: c } : this.space === "lab" ? { l: h, a, b: c } : this.space === "lch" ? { l: h, c: a, h: c } : this.space === "cmyk" ? { c: h, m: a, y: c, k: u } : {};
    Object.assign(this, l);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), h = 200 * (e - s);
    return new R(n, r, h, "lab");
  }
  lch() {
    const { l: t, a: e, b: s } = this.lab(), n = Math.sqrt(e ** 2 + s ** 2);
    let r = 180 * Math.atan2(s, e) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new R(t, n, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (kr(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: _, a: N, b: L } = this;
        if (this.space === "lch") {
          const { c: Yt, h: Ke } = this, Ze = Math.PI / 180;
          N = Yt * Math.cos(Ze * Ke), L = Yt * Math.sin(Ze * Ke);
        }
        const E = (_ + 16) / 116, U = N / 500 + E, dt = E - L / 200, pt = 16 / 116, Rt = 8856e-6, Pt = 7.787;
        t = 0.95047 * (U ** 3 > Rt ? U ** 3 : (U - pt) / Pt), e = 1 * (E ** 3 > Rt ? E ** 3 : (E - pt) / Pt), s = 1.08883 * (dt ** 3 > Rt ? dt ** 3 : (dt - pt) / Pt);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, h = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, c = 31308e-7, u = n > c ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > c ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, f = h > c ? 1.055 * a(h, 1 / 2.4) - 0.055 : 12.92 * h;
      return new R(255 * u, 255 * l, 255 * f);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new R(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, h = 255 * _i(r, n, t + 1 / 3), a = 255 * _i(r, n, t), c = 255 * _i(r, n, t - 1 / 3);
      return new R(h, a, c);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), h = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new R(r, h, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(wr);
    return `#${t}${e}${s}`;
  }
  toRgb() {
    const [t, e, s] = this._clamped();
    return `rgb(${t},${e},${s})`;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((U) => U / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, u = h > 0.04045 ? Math.pow((h + 0.055) / 1.055, 2.4) : h / 12.92, l = (a * 0.4124 + c * 0.3576 + u * 0.1805) / 0.95047, f = (a * 0.2126 + c * 0.7152 + u * 0.0722) / 1, g = (a * 0.0193 + c * 0.1192 + u * 0.9505) / 1.08883, _ = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, N = f > 8856e-6 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, L = g > 8856e-6 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116;
    return new R(_, N, L, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a: t, _b: e, _c: s } = this.rgb(), { max: n, min: r, round: h } = Math, a = (c) => n(0, r(h(c), 255));
    return [t, e, s].map(a);
  }
  /*
  Constructing colors
  */
}
let W = class zs {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new zs(this);
  }
  init(t, e) {
    const s = { x: 0, y: 0 }, n = Array.isArray(t) ? { x: t[0], y: t[1] } : typeof t == "object" ? { x: t.x, y: t.y } : { x: t, y: e };
    return this.x = n.x == null ? s.x : n.x, this.y = n.y == null ? s.y : n.y, this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(t) {
    return this.clone().transformO(t);
  }
  // Transform point with matrix
  transformO(t) {
    x.isMatrixLike(t) || (t = new x(t));
    const { x: e, y: s } = this;
    return this.x = t.a * e + t.c * s + t.e, this.y = t.b * e + t.d * s + t.f, this;
  }
};
function vr(i, t) {
  return new W(i, t).transformO(this.screenCTM().inverseO());
}
function de(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class x {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, h = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, u = t.shear || 0, l = t.rotate || t.theta || 0, f = new W(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), g = f.x, _ = f.y, N = new W(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), L = N.x, E = N.y, U = new W(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), dt = U.x, pt = U.y, Rt = new W(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Pt = Rt.x, Yt = Rt.y;
    return {
      scaleX: a,
      scaleY: c,
      skewX: r,
      skewY: h,
      shear: u,
      theta: l,
      rx: Pt,
      ry: Yt,
      tx: dt,
      ty: pt,
      ox: g,
      oy: _,
      px: L,
      py: E
    };
  }
  static fromArray(t) {
    return { a: t[0], b: t[1], c: t[2], d: t[3], e: t[4], f: t[5] };
  }
  static isMatrixLike(t) {
    return t.a != null || t.b != null || t.c != null || t.d != null || t.e != null || t.f != null;
  }
  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(t, e, s) {
    const n = t.a * e.a + t.c * e.b, r = t.b * e.a + t.d * e.b, h = t.a * e.c + t.c * e.d, a = t.b * e.c + t.d * e.d, c = t.e + t.a * e.e + t.c * e.f, u = t.f + t.b * e.e + t.d * e.f;
    return s.a = n, s.b = r, s.c = h, s.d = a, s.e = c, s.f = u, s;
  }
  around(t, e, s) {
    return this.clone().aroundO(t, e, s);
  }
  // Transform around a center point
  aroundO(t, e, s) {
    const n = t || 0, r = e || 0;
    return this.translateO(-n, -r).lmultiplyO(s).translateO(n, r);
  }
  // Clones this matrix
  clone() {
    return new x(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(t = 0, e = 0) {
    const s = this.a, n = this.b, r = this.c, h = this.d, a = this.e, c = this.f, u = s * h - n * r, l = u > 0 ? 1 : -1, f = l * Math.sqrt(s * s + n * n), g = Math.atan2(l * n, l * s), _ = 180 / Math.PI * g, N = Math.cos(g), L = Math.sin(g), E = (s * r + n * h) / u, U = r * f / (E * s - n) || h * f / (E * n + s), dt = a - t + t * N * f + e * (E * N * f - L * U), pt = c - e + t * L * f + e * (E * L * f + N * U);
    return {
      // Return the affine parameters
      scaleX: f,
      scaleY: U,
      shear: E,
      rotate: _,
      translateX: dt,
      translateY: pt,
      originX: t,
      originY: e,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
  // Check if two matrices are equal
  equals(t) {
    if (t === this) return !0;
    const e = new x(t);
    return de(this.a, e.a) && de(this.b, e.b) && de(this.c, e.c) && de(this.d, e.d) && de(this.e, e.e) && de(this.f, e.f);
  }
  // Flip matrix on x or y, at a given offset
  flip(t, e) {
    return this.clone().flipO(t, e);
  }
  flipO(t, e) {
    return t === "x" ? this.scaleO(-1, 1, e, 0) : t === "y" ? this.scaleO(1, -1, 0, e) : this.scaleO(-1, -1, t, e || t);
  }
  // Initialize
  init(t) {
    const e = x.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof bt ? t.matrixify() : typeof t == "string" ? x.fromArray(t.split(Lt).map(parseFloat)) : Array.isArray(t) ? x.fromArray(t) : typeof t == "object" && x.isMatrixLike(t) ? t : typeof t == "object" ? new x().transform(t) : arguments.length === 6 ? x.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, h = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const c = n / a, u = -e / a, l = -s / a, f = t / a, g = -(c * r + l * h), _ = -(u * r + f * h);
    return this.a = c, this.b = u, this.c = l, this.d = f, this.e = g, this.f = _, this;
  }
  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }
  lmultiplyO(t) {
    const e = this, s = t instanceof x ? t : new x(t);
    return x.matrixMultiply(s, e, this);
  }
  // Left multiplies by the given matrix
  multiply(t) {
    return this.clone().multiplyO(t);
  }
  multiplyO(t) {
    const e = this, s = t instanceof x ? t : new x(t);
    return x.matrixMultiply(e, s, this);
  }
  // Rotate matrix
  rotate(t, e, s) {
    return this.clone().rotateO(t, e, s);
  }
  rotateO(t, e = 0, s = 0) {
    t = xi(t);
    const n = Math.cos(t), r = Math.sin(t), { a: h, b: a, c, d: u, e: l, f } = this;
    return this.a = h * n - a * r, this.b = a * n + h * r, this.c = c * n - u * r, this.d = u * n + c * r, this.e = l * n - f * r + s * r - e * n + e, this.f = f * n + l * r - e * r - s * n + s, this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t);
    const { a: r, b: h, c: a, d: c, e: u, f: l } = this;
    return this.a = r * t, this.b = h * e, this.c = a * t, this.d = c * e, this.e = u * t - s * t + s, this.f = l * e - n * e + n, this;
  }
  // Shear matrix
  shear(t, e, s) {
    return this.clone().shearO(t, e, s);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(t, e = 0, s = 0) {
    const { a: n, b: r, c: h, d: a, e: c, f: u } = this;
    return this.a = n + r * t, this.c = h + a * t, this.e = c + u * t - s * t, this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t), t = xi(t), e = xi(e);
    const r = Math.tan(t), h = Math.tan(e), { a, b: c, c: u, d: l, e: f, f: g } = this;
    return this.a = a + c * r, this.b = c + a * h, this.c = u + l * r, this.d = l + u * h, this.e = f + g * r - n * r, this.f = g + f * h - s * h, this;
  }
  // SkewX
  skewX(t, e, s) {
    return this.skew(t, 0, e, s);
  }
  // SkewY
  skewY(t, e, s) {
    return this.skew(0, t, e, s);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
  // Convert matrix to string
  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }
  // Transform a matrix into another matrix by manipulating the space
  transform(t) {
    if (x.isMatrixLike(t))
      return new x(t).multiplyO(this);
    const e = x.formatTransforms(t), s = this, { x: n, y: r } = new W(e.ox, e.oy).transform(s), h = new x().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const a = new W(n, r).transform(h), c = isFinite(e.px) ? e.px - a.x : 0, u = isFinite(e.py) ? e.py - a.y : 0;
      h.translateO(c, u);
    }
    return h.translateO(e.tx, e.ty), h;
  }
  // Translate matrix
  translate(t, e) {
    return this.clone().translateO(t, e);
  }
  translateO(t, e) {
    return this.e += t || 0, this.f += e || 0, this;
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
}
function Nr() {
  return new x(this.node.getCTM());
}
function Or() {
  try {
    if (typeof this.isRoot == "function" && !this.isRoot()) {
      const i = this.rect(1, 1), t = i.node.getScreenCTM();
      return i.remove(), new x(t);
    }
    return new x(this.node.getScreenCTM());
  } catch {
    return console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    ), new x();
  }
}
C(x, "Matrix");
function Ft() {
  if (!Ft.nodes) {
    const i = J().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    Ft.nodes = { svg: i, path: t };
  }
  if (!Ft.nodes.svg.node.parentNode) {
    const i = O.document.body || O.document.documentElement;
    Ft.nodes.svg.addTo(i);
  }
  return Ft.nodes;
}
function $s(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function Cr(i) {
  return i === O.document || (O.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === O.document;
  }).call(O.document.documentElement, i);
}
class K {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += O.window.pageXOffset, this.y += O.window.pageYOffset, new K(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(Lt).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return $s(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const e = Math.min(this.x, t.x), s = Math.min(this.y, t.y), n = Math.max(this.x + this.width, t.x + t.width) - e, r = Math.max(this.y + this.height, t.y + t.height) - s;
    return new K(e, s, n, r);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(t) {
    t instanceof x || (t = new x(t));
    let e = 1 / 0, s = -1 / 0, n = 1 / 0, r = -1 / 0;
    return [
      new W(this.x, this.y),
      new W(this.x2, this.y),
      new W(this.x, this.y2),
      new W(this.x2, this.y2)
    ].forEach(function(a) {
      a = a.transform(t), e = Math.min(e, a.x), s = Math.max(s, a.x), n = Math.min(n, a.y), r = Math.max(r, a.y);
    }), new K(e, n, s - e, r - n);
  }
}
function js(i, t, e) {
  let s;
  try {
    if (s = t(i.node), $s(s) && !Cr(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Tr() {
  const e = js(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(Ft().svg).show(), h = r.node.getBBox();
      return r.remove(), h;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new K(e);
}
function Ir(i) {
  const s = js(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new K(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Ar(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
k({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new K(this.attr("viewBox")) : this.attr("viewBox", new K(i, t, e, s));
    },
    zoom(i, t) {
      let { width: e, height: s } = this.attr(["width", "height"]);
      if ((!e && !s || typeof e == "string" || typeof s == "string") && (e = this.node.clientWidth, s = this.node.clientHeight), !e || !s)
        throw new Error(
          "Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element"
        );
      const n = this.viewbox(), r = e / n.width, h = s / n.height, a = Math.min(r, h);
      if (i == null)
        return a;
      let c = a / i;
      c === 1 / 0 && (c = Number.MAX_SAFE_INTEGER / 100), t = t || new W(e / 2 / r + n.x, s / 2 / h + n.y);
      const u = new K(n).transform(
        new x({ scale: c, origin: t })
      );
      return this.viewbox(u);
    }
  }
});
C(K, "Box");
class ae extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
v([ae], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Er = ["toArray", "constructor", "each"];
ae.extend = function(i) {
  i = i.reduce((t, e) => (Er.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), v([ae], i);
};
function Te(i, t) {
  return new ae(
    Wi((t || O.document).querySelectorAll(i), function(e) {
      return ft(e);
    })
  );
}
function Sr(i) {
  return Te(i, this.node);
}
function Mr(i) {
  return ft(this.node.querySelector(i));
}
let Lr = 0;
const Us = {};
function Bs(i) {
  let t = i.getEventHolder();
  return t === O.window && (t = Us), t.events || (t.events = {}), t.events;
}
function ts(i) {
  return i.getEventTarget();
}
function Rr(i) {
  let t = i.getEventHolder();
  t === O.window && (t = Us), t.events && (t.events = {});
}
function Le(i, t, e, s, n) {
  const r = e.bind(s || i), h = J(i), a = Bs(h), c = ts(h);
  t = Array.isArray(t) ? t : t.split(Lt), e._svgjsListenerId || (e._svgjsListenerId = ++Lr), t.forEach(function(u) {
    const l = u.split(".")[0], f = u.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][f] = a[l][f] || {}, a[l][f][e._svgjsListenerId] = r, c.addEventListener(l, r, n || !1);
  });
}
function Tt(i, t, e, s) {
  const n = J(i), r = Bs(n), h = ts(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(Lt), t.forEach(function(a) {
    const c = a && a.split(".")[0], u = a && a.split(".")[1];
    let l, f;
    if (e)
      r[c] && r[c][u || "*"] && (h.removeEventListener(
        c,
        r[c][u || "*"][e],
        s || !1
      ), delete r[c][u || "*"][e]);
    else if (c && u) {
      if (r[c] && r[c][u]) {
        for (f in r[c][u])
          Tt(h, [c, u].join("."), f);
        delete r[c][u];
      }
    } else if (u)
      for (a in r)
        for (l in r[a])
          u === l && Tt(h, [a, u].join("."));
    else if (c) {
      if (r[c]) {
        for (l in r[c])
          Tt(h, [c, l].join("."));
        delete r[c];
      }
    } else {
      for (a in r)
        Tt(h, a);
      Rr(n);
    }
  }));
}
function Pr(i, t, e, s) {
  const n = ts(i);
  return t instanceof O.window.Event || (t = new O.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class qe extends Zi {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return Pr(this, t, e, s);
  }
  dispatchEvent(t) {
    const e = this.getEventHolder().events;
    if (!e) return !0;
    const s = e[t.type];
    for (const n in s)
      for (const r in s[n])
        s[n][r](t);
    return !t.defaultPrevented;
  }
  // Fire given event
  fire(t, e, s) {
    return this.dispatch(t, e, s), this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(t, e, s) {
    return Tt(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Le(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
C(qe, "EventTarget");
function xs() {
}
const Ee = {
  duration: 400,
  ease: ">",
  delay: 0
}, Dr = {
  // fill and stroke
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  // text
  "text-anchor": "start"
};
class Ne extends Array {
  constructor(...t) {
    super(...t), this.init(...t);
  }
  clone() {
    return new this.constructor(this);
  }
  init(t) {
    return typeof t == "number" ? this : (this.length = 0, this.push(...this.parse(t)), this);
  }
  // Parse whitespace separated string
  parse(t = []) {
    return t instanceof Array ? t : t.trim().split(Lt).map(parseFloat);
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
  // Flattens the array if needed
  valueOf() {
    const t = [];
    return t.push(...this), t;
  }
}
class w {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  convert(t) {
    return new w(this.value, t);
  }
  // Divide number
  divide(t) {
    return t = new w(t), new w(this / t, this.unit || t.unit);
  }
  init(t, e) {
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(Fs), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof w && (this.value = t.valueOf(), this.unit = t.unit), this;
  }
  // Subtract number
  minus(t) {
    return t = new w(t), new w(this - t, this.unit || t.unit);
  }
  // Add number
  plus(t) {
    return t = new w(t), new w(this + t, this.unit || t.unit);
  }
  // Multiply number
  times(t) {
    return t = new w(t), new w(this * t, this.unit || t.unit);
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
}
const Fr = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Vs = [];
function zr(i) {
  Vs.push(i);
}
function $r(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = ys.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
    return i;
  } else {
    if (i instanceof Array)
      return i.reduce((s, n) => (s[n] = this.attr(n), s), {});
    if (typeof i == "object" && i.constructor === Object)
      for (t in i) this.attr(t, i[t]);
    else if (t === null)
      this.node.removeAttribute(i);
    else {
      if (t == null)
        return t = this.node.getAttribute(i), t == null ? Dr[i] : ys.test(t) ? parseFloat(t) : t;
      t = Vs.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new w(t) : Fr.has(i) && R.isColor(t) ? t = new R(t) : t.constructor === Array && (t = new Ne(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class Gt extends qe {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = J(t), t.removeNamespace && this.node instanceof O.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return J(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new ae(
      Wi(this.node.children, function(t) {
        return ft(t);
      })
    );
  }
  // Remove all elements in this container
  clear() {
    for (; this.node.hasChildNodes(); )
      this.node.removeChild(this.node.lastChild);
    return this;
  }
  // Clone element
  clone(t = !0, e = !0) {
    this.writeDataToDom();
    let s = this.node.cloneNode(t);
    return e && (s = Ds(s)), new this.constructor(s);
  }
  // Iterates over all children and invokes a given block
  each(t, e) {
    const s = this.children();
    let n, r;
    for (n = 0, r = s.length; n < r; n++)
      t.apply(s[n], [n, s]), e && s[n].each(t, e);
    return this;
  }
  element(t, e) {
    return this.put(new Gt(Me(t), e));
  }
  // Get first child
  first() {
    return ft(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return ft(this.node.childNodes[t]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }
  // Checks if the given element is a child
  has(t) {
    return this.index(t) >= 0;
  }
  html(t, e) {
    return this.xml(t, e, zn);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = Ps(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return ft(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(t) {
    const e = this.node, s = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector || null;
    return s && s.call(e, t);
  }
  // Returns the parent element instance
  parent(t) {
    let e = this;
    if (!e.node.parentNode) return null;
    if (e = ft(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = ft(e.node.parentNode));
    return e;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, e) {
    return t = J(t), this.add(t, e), t;
  }
  // Add element to given container and return container
  putIn(t, e) {
    return J(t).add(this, e);
  }
  // Remove element
  remove() {
    return this.parent() && this.parent().removeElement(this), this;
  }
  // Remove a given child
  removeElement(t) {
    return this.node.removeChild(t.node), this;
  }
  // Replace this with element
  replace(t) {
    return t = J(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
  }
  round(t = 2, e = null) {
    const s = 10 ** t, n = this.attr(e);
    for (const r in n)
      typeof n[r] == "number" && (n[r] = Math.round(n[r] * s) / s);
    return this.attr(n), this;
  }
  // Import / Export raw svg
  svg(t, e) {
    return this.xml(t, e, Ki);
  }
  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(t) {
    return this.node.textContent = t, this;
  }
  wrap(t) {
    const e = this.parent();
    if (!e)
      return this.addTo(t);
    const s = e.index(this);
    return e.put(t, s).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return this.each(function() {
      this.writeDataToDom();
    }), this;
  }
  // Import / Export raw svg
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      e = e ?? !0, this.writeDataToDom();
      let a = this;
      if (t != null) {
        if (a = ft(a.node.cloneNode(!0)), e) {
          const c = t(a);
          if (a = c || a, c === !1) return "";
        }
        a.each(function() {
          const c = t(this), u = c || this;
          c === !1 ? this.remove() : c && this !== u && this.replace(u);
        }, !0);
      }
      return e ? a.node.outerHTML : a.node.innerHTML;
    }
    e = e ?? !1;
    const n = Me("wrapper", s), r = O.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const h = this.parent();
    return e ? this.replace(r) && h : this.add(r);
  }
}
v(Gt, { attr: $r, find: Sr, findOne: Mr });
C(Gt, "Dom");
class bt extends Gt {
  constructor(t, e) {
    super(t, e), this.dom = {}, this.node.instance = this, (t.hasAttribute("data-svgjs") || t.hasAttribute("svgjs:data")) && this.setData(
      JSON.parse(t.getAttribute("data-svgjs")) ?? JSON.parse(t.getAttribute("svgjs:data")) ?? {}
    );
  }
  // Move element by its center
  center(t, e) {
    return this.cx(t).cy(e);
  }
  // Move by center over x-axis
  cx(t) {
    return t == null ? this.x() + this.width() / 2 : this.x(t - this.width() / 2);
  }
  // Move by center over y-axis
  cy(t) {
    return t == null ? this.y() + this.height() / 2 : this.y(t - this.height() / 2);
  }
  // Get defs
  defs() {
    const t = this.root();
    return t && t.defs();
  }
  // Relative move over x and y axes
  dmove(t, e) {
    return this.dx(t).dy(e);
  }
  // Relative move over x axis
  dx(t = 0) {
    return this.x(new w(t).plus(this.x()));
  }
  // Relative move over y axis
  dy(t = 0) {
    return this.y(new w(t).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }
  // Set height of element
  height(t) {
    return this.attr("height", t);
  }
  // Move element to given x and y values
  move(t, e) {
    return this.x(t).y(e);
  }
  // return array of all ancestors of given type up to the root svg
  parents(t = this.root()) {
    const e = typeof t == "string";
    e || (t = J(t));
    const s = new ae();
    let n = this;
    for (; (n = n.parent()) && n.node !== O.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(ir);
    return e ? J(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(jn(Qi));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ce(this, t, e);
    return this.width(new w(s.width)).height(new w(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return Rs(this, this.dom), super.writeDataToDom();
  }
  // Move over x-axis
  x(t) {
    return this.attr("x", t);
  }
  // Move over y-axis
  y(t) {
    return this.attr("y", t);
  }
}
v(bt, {
  bbox: Tr,
  rbox: Ir,
  inside: Ar,
  point: vr,
  ctm: Nr,
  screenCTM: Or
});
C(bt, "Element");
const Ae = {
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
  fill: ["color", "opacity", "rule"],
  prefix: function(i, t) {
    return t === "color" ? i : i + "-" + t;
  }
};
["fill", "stroke"].forEach(function(i) {
  const t = {};
  let e;
  t[i] = function(s) {
    if (typeof s > "u")
      return this.attr(i);
    if (typeof s == "string" || s instanceof R || R.isRgb(s) || s instanceof bt)
      this.attr(i, s);
    else
      for (e = Ae[i].length - 1; e >= 0; e--)
        s[Ae[i][e]] != null && this.attr(Ae.prefix(i, Ae[i][e]), s[Ae[i][e]]);
    return this;
  }, k(["Element", "Runner"], t);
});
k(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(i, t, e, s, n, r) {
    return i == null ? new x(this) : this.attr("transform", new x(i, t, e, s, n, r));
  },
  // Map rotation to transform
  rotate: function(i, t, e) {
    return this.transform({ rotate: i, ox: t, oy: e }, !0);
  },
  // Map skew to transform
  skew: function(i, t, e, s) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ skew: i, ox: t, oy: e }, !0) : this.transform({ skew: [i, t], ox: e, oy: s }, !0);
  },
  shear: function(i, t, e) {
    return this.transform({ shear: i, ox: t, oy: e }, !0);
  },
  // Map scale to transform
  scale: function(i, t, e, s) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ scale: i, ox: t, oy: e }, !0) : this.transform({ scale: [i, t], ox: e, oy: s }, !0);
  },
  // Map translate to transform
  translate: function(i, t) {
    return this.transform({ translate: [i, t] }, !0);
  },
  // Map relative translations to transform
  relative: function(i, t) {
    return this.transform({ relative: [i, t] }, !0);
  },
  // Map flip to transform
  flip: function(i = "both", t = "center") {
    return "xybothtrue".indexOf(i) === -1 && (t = i, i = "both"), this.transform({ flip: i, origin: t }, !0);
  },
  // Opacity
  opacity: function(i) {
    return this.attr("opacity", i);
  }
});
k("radius", {
  // Add x and y radius
  radius: function(i, t = i) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new w(i)) : this.rx(i).ry(t);
  }
});
k("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(i) {
    return new W(this.node.getPointAtLength(i));
  }
});
k(["Element", "Runner"], {
  // Set font
  font: function(i, t) {
    if (typeof i == "object") {
      for (t in i) this.font(t, i[t]);
      return this;
    }
    return i === "leading" ? this.leading(t) : i === "anchor" ? this.attr("text-anchor", t) : i === "size" || i === "family" || i === "weight" || i === "stretch" || i === "variant" || i === "style" ? this.attr("font-" + i, t) : this.attr(i, t);
  }
});
const jr = [
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
].reduce(function(i, t) {
  const e = function(s) {
    return s === null ? this.off(t) : this.on(t, s), this;
  };
  return i[t] = e, i;
}, {});
k("Element", jr);
function Ur() {
  return this.attr("transform", null);
}
function Br() {
  return (this.attr("transform") || "").split(sr).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(Lt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(x.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new x());
}
function Vr(i, t) {
  if (this === i) return this;
  if (Ti(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function qr(i) {
  return this.toParent(this.root(), i);
}
function Gr(i, t) {
  if (i == null || typeof i == "string") {
    const n = new x(this).decompose();
    return i == null ? n : n[i];
  }
  x.isMatrixLike(i) || (i = { ...i, origin: Ci(i, this) });
  const e = t === !0 ? this : t || !1, s = new x(e).transform(i);
  return this.attr("transform", s);
}
k("Element", {
  untransform: Ur,
  matrixify: Br,
  toParent: Vr,
  toRoot: qr,
  transform: Gr
});
class nt extends bt {
  flatten() {
    return this.each(function() {
      if (this instanceof nt)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
C(nt, "Container");
class es extends nt {
  constructor(t, e = t) {
    super(z("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
C(es, "Defs");
class at extends bt {
}
C(at, "Shape");
function is(i) {
  return this.attr("rx", i);
}
function ss(i) {
  return this.attr("ry", i);
}
function qs(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function Gs(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function Hs(i) {
  return this.attr("cx", i);
}
function Xs(i) {
  return this.attr("cy", i);
}
function Ys(i) {
  return i == null ? this.rx() * 2 : this.rx(new w(i).divide(2));
}
function Ws(i) {
  return i == null ? this.ry() * 2 : this.ry(new w(i).divide(2));
}
const Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: Hs,
  cy: Xs,
  height: Ws,
  rx: is,
  ry: ss,
  width: Ys,
  x: qs,
  y: Gs
}, Symbol.toStringTag, { value: "Module" }));
class fi extends at {
  constructor(t, e = t) {
    super(z("ellipse", t), e);
  }
  size(t, e) {
    const s = Ce(this, t, e);
    return this.rx(new w(s.width).divide(2)).ry(
      new w(s.height).divide(2)
    );
  }
}
v(fi, Hr);
k("Container", {
  // Create an ellipse
  ellipse: D(function(i = 0, t = i) {
    return this.put(new fi()).size(i, t).move(0, 0);
  })
});
C(fi, "Ellipse");
class Ks extends Gt {
  constructor(t = O.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new Gt(Me("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
C(Ks, "Fragment");
function Zs(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new w(i), fy: new w(t) }) : this.attr({ x1: new w(i), y1: new w(t) });
}
function Qs(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new w(i), cy: new w(t) }) : this.attr({ x2: new w(i), y2: new w(t) });
}
const Xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: Zs,
  to: Qs
}, Symbol.toStringTag, { value: "Module" }));
class Ge extends nt {
  constructor(t, e) {
    super(
      z(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new K();
  }
  targets() {
    return Te("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update gradient
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
v(Ge, Xr);
k({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: D(function(i, t) {
      return this.put(new Ge(i)).update(t);
    })
  }
});
C(Ge, "Gradient");
class Re extends nt {
  // Initialize node
  constructor(t, e = t) {
    super(z("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new K();
  }
  targets() {
    return Te("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update pattern by rebuilding
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
k({
  Container: {
    // Create pattern element in defs
    pattern(...i) {
      return this.defs().pattern(...i);
    }
  },
  Defs: {
    pattern: D(function(i, t, e) {
      return this.put(new Re()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
C(Re, "Pattern");
class di extends at {
  constructor(t, e = t) {
    super(z("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new O.window.Image();
    return Le(
      s,
      "load",
      function(n) {
        const r = this.parent(Re);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Re && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Le(s, "load error", function() {
      Tt(s);
    }), this.attr("href", s.src = t, Ve);
  }
}
zr(function(i, t, e) {
  return (i === "fill" || i === "stroke") && rr.test(t) && (t = e.root().defs().image(t)), t instanceof di && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
k({
  Container: {
    // create image element, load image and set its size
    image: D(function(i, t) {
      return this.put(new di()).size(0, 0).load(i, t);
    })
  }
});
C(di, "Image");
class Ht extends Ne {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new K(s, n, t - s, e - n);
  }
  // Move point string
  move(t, e) {
    const s = this.bbox();
    if (t -= s.x, e -= s.y, !isNaN(t) && !isNaN(e))
      for (let n = this.length - 1; n >= 0; n--)
        this[n] = [this[n][0] + t, this[n][1] + e];
    return this;
  }
  // Parse point string and flat array
  parse(t = [0, 0]) {
    const e = [];
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(Lt).map(parseFloat), t.length % 2 !== 0 && t.pop();
    for (let s = 0, n = t.length; s < n; s = s + 2)
      e.push([t[s], t[s + 1]]);
    return e;
  }
  // Resize poly string
  size(t, e) {
    let s;
    const n = this.bbox();
    for (s = this.length - 1; s >= 0; s--)
      n.width && (this[s][0] = (this[s][0] - n.x) * t / n.width + n.x), n.height && (this[s][1] = (this[s][1] - n.y) * e / n.height + n.y);
    return this;
  }
  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }
  // Convert array to string
  toString() {
    const t = [];
    for (let e = 0, s = this.length; e < s; e++)
      t.push(this[e].join(","));
    return t.join(" ");
  }
  transform(t) {
    return this.clone().transformO(t);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(t) {
    x.isMatrixLike(t) || (t = new x(t));
    for (let e = this.length; e--; ) {
      const [s, n] = this[e];
      this[e][0] = t.a * s + t.c * n + t.e, this[e][1] = t.b * s + t.d * n + t.f;
    }
    return this;
  }
}
const Yr = Ht;
function Wr(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function Kr(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function Zr(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function Qr(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: Yr,
  height: Qr,
  width: Zr,
  x: Wr,
  y: Kr
}, Symbol.toStringTag, { value: "Module" }));
let Pe = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("line", t), e);
  }
  // Get array
  array() {
    return new Ht([
      [this.attr("x1"), this.attr("y1")],
      [this.attr("x2"), this.attr("y2")]
    ]);
  }
  // Move by left top corner
  move(t, e) {
    return this.attr(this.array().move(t, e).toLine());
  }
  // Overwrite native plot() method
  plot(t, e, s, n) {
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new Ht(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ce(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
v(Pe, ns);
k({
  Container: {
    // Create a line element
    line: D(function(...i) {
      return Pe.prototype.plot.apply(
        this.put(new Pe()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
C(Pe, "Line");
class Qe extends nt {
  // Initialize node
  constructor(t, e = t) {
    super(z("marker", t), e);
  }
  // Set height of element
  height(t) {
    return this.attr("markerHeight", t);
  }
  orient(t) {
    return this.attr("orient", t);
  }
  // Set marker refX and refY
  ref(t, e) {
    return this.attr("refX", t).attr("refY", e);
  }
  // Return the fill id
  toString() {
    return "url(#" + this.id() + ")";
  }
  // Update marker
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Set width of element
  width(t) {
    return this.attr("markerWidth", t);
  }
}
k({
  Container: {
    marker(...i) {
      return this.defs().marker(...i);
    }
  },
  Defs: {
    // Create marker
    marker: D(function(i, t, e) {
      return this.put(new Qe()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof Qe ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
C(Qe, "Marker");
function pe(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const Jr = {
  "-": function(i) {
    return i;
  },
  "<>": function(i) {
    return -Math.cos(i * Math.PI) / 2 + 0.5;
  },
  ">": function(i) {
    return Math.sin(i * Math.PI / 2);
  },
  "<": function(i) {
    return -Math.cos(i * Math.PI / 2) + 1;
  },
  bezier: function(i, t, e, s) {
    return function(n) {
      return n < 0 ? i > 0 ? t / i * n : e > 0 ? s / e * n : 0 : n > 1 ? e < 1 ? (1 - s) / (1 - e) * n + (s - e) / (1 - e) : i < 1 ? (1 - t) / (1 - i) * n + (t - i) / (1 - i) : 1 : 3 * n * (1 - n) ** 2 * t + 3 * n ** 2 * (1 - n) * s + n ** 3;
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(i, t = "end") {
    t = t.split("-").reverse()[0];
    let e = i;
    return t === "none" ? --e : t === "both" && ++e, (s, n = !1) => {
      let r = Math.floor(s * i);
      const h = s * r % 1 === 0;
      return (t === "start" || t === "both") && ++r, n && h && --r, s >= 0 && r < 0 && (r = 0), s <= 1 && r > e && (r = e), r / e;
    };
  }
};
class rs {
  done() {
    return !1;
  }
}
class Ii extends rs {
  constructor(t = Ee.ease) {
    super(), this.ease = Jr[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class Je extends rs {
  constructor(t) {
    super(), this.stepper = t;
  }
  done(t) {
    return t.done;
  }
  step(t, e, s, n) {
    return this.stepper(t, e, s, n);
  }
}
function bs() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), h = 3.9 / (r * i);
  this.d = 2 * r * h, this.k = h * h;
}
class to extends Je {
  constructor(t = 500, e = 0) {
    super(), this.duration(t).overshoot(e);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    s > 100 && (s = 16), s /= 1e3;
    const r = n.velocity || 0, h = -this.d * r - this.k * (t - e), a = t + r * s + h * s * s / 2;
    return n.velocity = r + h * s, n.done = Math.abs(e - a) + Math.abs(r) < 2e-3, n.done ? e : a;
  }
}
v(to, {
  duration: pe("_duration", bs),
  overshoot: pe("_overshoot", bs)
});
class eo extends Je {
  constructor(t = 0.1, e = 0.01, s = 0, n = 1e3) {
    super(), this.p(t).i(e).d(s).windup(n);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    const r = e - t;
    let h = (n.integral || 0) + r * s;
    const a = (r - (n.error || 0)) / s, c = this._windup;
    return c !== !1 && (h = Math.max(-c, Math.min(h, c))), n.error = r, n.integral = h, n.done = Math.abs(r) < 1e-3, n.done ? e : t + (this.P * r + this.I * h + this.D * a);
  }
}
v(eo, {
  windup: pe("_windup"),
  p: pe("P"),
  i: pe("I"),
  d: pe("D")
});
const io = {
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
}, Ai = {
  M: function(i, t, e) {
    return t.x = e.x = i[0], t.y = e.y = i[1], ["M", t.x, t.y];
  },
  L: function(i, t) {
    return t.x = i[0], t.y = i[1], ["L", i[0], i[1]];
  },
  H: function(i, t) {
    return t.x = i[0], ["H", i[0]];
  },
  V: function(i, t) {
    return t.y = i[0], ["V", i[0]];
  },
  C: function(i, t) {
    return t.x = i[4], t.y = i[5], ["C", i[0], i[1], i[2], i[3], i[4], i[5]];
  },
  S: function(i, t) {
    return t.x = i[2], t.y = i[3], ["S", i[0], i[1], i[2], i[3]];
  },
  Q: function(i, t) {
    return t.x = i[2], t.y = i[3], ["Q", i[0], i[1], i[2], i[3]];
  },
  T: function(i, t) {
    return t.x = i[0], t.y = i[1], ["T", i[0], i[1]];
  },
  Z: function(i, t, e) {
    return t.x = e.x, t.y = e.y, ["Z"];
  },
  A: function(i, t) {
    return t.x = i[5], t.y = i[6], ["A", i[0], i[1], i[2], i[3], i[4], i[5], i[6]];
  }
}, ki = "mlhvqtcsaz".split("");
for (let i = 0, t = ki.length; i < t; ++i)
  Ai[ki[i]] = /* @__PURE__ */ function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let h = 0, a = s.length; h < a; ++h)
          s[h] = s[h] + (h % 2 ? n.y : n.x);
      return Ai[e](s, n, r);
    };
  }(ki[i].toUpperCase());
function so(i) {
  const t = i.segment[0];
  return Ai[t](i.segment.slice(1), i.p, i.p0);
}
function Ei(i) {
  return i.segment.length && i.segment.length - 1 === io[i.segment[0].toUpperCase()];
}
function no(i, t) {
  i.inNumber && Kt(i, !1);
  const e = Ji.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function Kt(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, Ei(i) && Si(i);
}
function Si(i) {
  i.inSegment = !1, i.absolute && (i.segment = so(i)), i.segments.push(i.segment);
}
function ro(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function oo(i) {
  return i.lastToken.toUpperCase() === "E";
}
const ho = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function ao(i, t = !0) {
  let e = 0, s = "";
  const n = {
    segment: [],
    inNumber: !1,
    number: "",
    lastToken: "",
    inSegment: !1,
    segments: [],
    pointSeen: !1,
    hasExponent: !1,
    absolute: t,
    p0: new W(),
    p: new W()
  };
  for (; n.lastToken = s, s = i.charAt(e++); )
    if (!(!n.inSegment && no(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          Kt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || ro(n)) {
          n.inNumber = !0, n.number = s, Kt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (ho.has(s)) {
        n.inNumber && Kt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !oo(n)) {
          Kt(n, !1), --e;
          continue;
        }
        n.number += s, n.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        n.number += s, n.hasExponent = !0;
        continue;
      }
      if (Ji.test(s)) {
        if (n.inNumber)
          Kt(n, !1);
        else if (Ei(n))
          Si(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && Kt(n, !1), n.inSegment && Ei(n) && Si(n), n.segments;
}
function co(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class ce extends Ne {
  // Get bounding box of path
  bbox() {
    return Ft().path.setAttribute("d", this.toString()), new K(Ft.nodes.path.getBBox());
  }
  // Move path string
  move(t, e) {
    const s = this.bbox();
    if (t -= s.x, e -= s.y, !isNaN(t) && !isNaN(e))
      for (let n, r = this.length - 1; r >= 0; r--)
        n = this[r][0], n === "M" || n === "L" || n === "T" ? (this[r][1] += t, this[r][2] += e) : n === "H" ? this[r][1] += t : n === "V" ? this[r][1] += e : n === "C" || n === "S" || n === "Q" ? (this[r][1] += t, this[r][2] += e, this[r][3] += t, this[r][4] += e, n === "C" && (this[r][5] += t, this[r][6] += e)) : n === "A" && (this[r][6] += t, this[r][7] += e);
    return this;
  }
  // Absolutize and parse path to array
  parse(t = "M0 0") {
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), ao(t);
  }
  // Resize path string
  size(t, e) {
    const s = this.bbox();
    let n, r;
    for (s.width = s.width === 0 ? 1 : s.width, s.height = s.height === 0 ? 1 : s.height, n = this.length - 1; n >= 0; n--)
      r = this[n][0], r === "M" || r === "L" || r === "T" ? (this[n][1] = (this[n][1] - s.x) * t / s.width + s.x, this[n][2] = (this[n][2] - s.y) * e / s.height + s.y) : r === "H" ? this[n][1] = (this[n][1] - s.x) * t / s.width + s.x : r === "V" ? this[n][1] = (this[n][1] - s.y) * e / s.height + s.y : r === "C" || r === "S" || r === "Q" ? (this[n][1] = (this[n][1] - s.x) * t / s.width + s.x, this[n][2] = (this[n][2] - s.y) * e / s.height + s.y, this[n][3] = (this[n][3] - s.x) * t / s.width + s.x, this[n][4] = (this[n][4] - s.y) * e / s.height + s.y, r === "C" && (this[n][5] = (this[n][5] - s.x) * t / s.width + s.x, this[n][6] = (this[n][6] - s.y) * e / s.height + s.y)) : r === "A" && (this[n][1] = this[n][1] * t / s.width, this[n][2] = this[n][2] * e / s.height, this[n][6] = (this[n][6] - s.x) * t / s.width + s.x, this[n][7] = (this[n][7] - s.y) * e / s.height + s.y);
    return this;
  }
  // Convert array to string
  toString() {
    return co(this);
  }
}
const Js = (i) => {
  const t = typeof i;
  return t === "number" ? w : t === "string" ? R.isColor(i) ? R : Lt.test(i) ? Ji.test(i) ? ce : Ne : Fs.test(i) ? w : Mi : os.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? Ne : t === "object" ? De : Mi;
};
class Zt {
  constructor(t) {
    this._stepper = t || new Ii("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
  }
  at(t) {
    return this._morphObj.morph(
      this._from,
      this._to,
      t,
      this._stepper,
      this._context
    );
  }
  done() {
    return this._context.map(this._stepper.done).reduce(function(e, s) {
      return e && s;
    }, !0);
  }
  from(t) {
    return t == null ? this._from : (this._from = this._set(t), this);
  }
  stepper(t) {
    return t == null ? this._stepper : (this._stepper = t, this);
  }
  to(t) {
    return t == null ? this._to : (this._to = this._set(t), this);
  }
  type(t) {
    return t == null ? this._type : (this._type = t, this);
  }
  _set(t) {
    this._type || this.type(Js(t));
    let e = new this._type(t);
    return this._type === R && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === De && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class Mi {
  constructor(...t) {
    this.init(...t);
  }
  init(t) {
    return t = Array.isArray(t) ? t[0] : t, this.value = t, this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
}
class He {
  constructor(...t) {
    this.init(...t);
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
    }), Object.assign(this, He.defaults, t), this;
  }
  toArray() {
    const t = this;
    return [
      t.scaleX,
      t.scaleY,
      t.shear,
      t.rotate,
      t.translateX,
      t.translateY,
      t.originX,
      t.originY
    ];
  }
}
He.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const uo = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class De {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === R && t[s + 7] !== e[s + 7]) {
          const a = t[s + 7], c = new R(this.values.splice(s + 3, 5))[a]().toArray();
          this.values.splice(s + 3, 0, ...c);
        }
        s += e[s + 2] + 2;
        continue;
      }
      if (!t[s + 1])
        return this;
      const r = new t[s + 1]().toArray(), h = e[s + 2] + 3;
      e.splice(
        s,
        h,
        t[s],
        t[s + 1],
        t[s + 2],
        ...r
      ), s += e[s + 2] + 2;
    }
    return this;
  }
  init(t) {
    if (this.values = [], Array.isArray(t)) {
      this.values = t.slice();
      return;
    }
    t = t || {};
    const e = [];
    for (const s in t) {
      const n = Js(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(uo), this.values = e.reduce((s, n) => s.concat(n), []), this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const t = {}, e = this.values;
    for (; e.length; ) {
      const s = e.shift(), n = e.shift(), r = e.shift(), h = e.splice(0, r);
      t[s] = new n(h);
    }
    return t;
  }
}
const os = [Mi, He, De];
function lo(i = []) {
  os.push(...[].concat(i));
}
function fo() {
  v(os, {
    to(i) {
      return new Zt().type(this.constructor).from(this.toArray()).to(i);
    },
    fromArray(i) {
      return this.init(i), this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(i, t, e, s, n) {
      const r = function(h, a) {
        return s.step(h, t[a], e, n[a], n);
      };
      return this.fromArray(i.map(r));
    }
  });
}
class Ie extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new ce(this.attr("d")));
  }
  // Clear array cache
  clear() {
    return delete this._array, this;
  }
  // Set height of element
  height(t) {
    return t == null ? this.bbox().height : this.size(this.bbox().width, t);
  }
  // Move by left top corner
  move(t, e) {
    return this.attr("d", this.array().move(t, e));
  }
  // Plot new path
  plot(t) {
    return t == null ? this.array() : this.clear().attr(
      "d",
      typeof t == "string" ? t : this._array = new ce(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ce(this, t, e);
    return this.attr("d", this.array().size(s.width, s.height));
  }
  // Set width of element
  width(t) {
    return t == null ? this.bbox().width : this.size(t, this.bbox().height);
  }
  // Move by left top corner over x-axis
  x(t) {
    return t == null ? this.bbox().x : this.move(t, this.bbox().y);
  }
  // Move by left top corner over y-axis
  y(t) {
    return t == null ? this.bbox().y : this.move(this.bbox().x, t);
  }
}
Ie.prototype.MorphArray = ce;
k({
  Container: {
    // Create a wrapped path element
    path: D(function(i) {
      return this.put(new Ie()).plot(i || new ce());
    })
  }
});
C(Ie, "Path");
function po() {
  return this._array || (this._array = new Ht(this.attr("points")));
}
function mo() {
  return delete this._array, this;
}
function go(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function yo(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new Ht(i)
  );
}
function xo(i, t) {
  const e = Ce(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: po,
  clear: mo,
  move: go,
  plot: yo,
  size: xo
}, Symbol.toStringTag, { value: "Module" }));
let Xe = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("polygon", t), e);
  }
};
k({
  Container: {
    // Create a wrapped polygon element
    polygon: D(function(i) {
      return this.put(new Xe()).plot(i || new Ht());
    })
  }
});
v(Xe, ns);
v(Xe, tn);
C(Xe, "Polygon");
class Ye extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("polyline", t), e);
  }
}
k({
  Container: {
    // Create a wrapped polygon element
    polyline: D(function(i) {
      return this.put(new Ye()).plot(i || new Ht());
    })
  }
});
v(Ye, ns);
v(Ye, tn);
C(Ye, "Polyline");
class pi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("rect", t), e);
  }
}
v(pi, { rx: is, ry: ss });
k({
  Container: {
    // Create a rect element
    rect: D(function(i, t) {
      return this.put(new pi()).size(i, t);
    })
  }
});
C(pi, "Rect");
class vi {
  constructor() {
    this._first = null, this._last = null;
  }
  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }
  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(t) {
    const e = typeof t.next < "u" ? t : { value: t, next: null, prev: null };
    return this._last ? (e.prev = this._last, this._last.next = e, this._last = e) : (this._last = e, this._first = e), e;
  }
  // Removes the item that was returned from the push
  remove(t) {
    t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t === this._last && (this._last = t.prev), t === this._first && (this._first = t.next), t.prev = null, t.next = null;
  }
  shift() {
    const t = this._first;
    return t ? (this._first = t.next, this._first && (this._first.prev = null), this._last = this._first ? this._last : null, t.value) : null;
  }
}
const M = {
  nextDraw: null,
  frames: new vi(),
  timeouts: new vi(),
  immediates: new vi(),
  timer: () => O.window.performance || O.window.Date,
  transforms: [],
  frame(i) {
    const t = M.frames.push({ run: i });
    return M.nextDraw === null && (M.nextDraw = O.window.requestAnimationFrame(M._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = M.timer().now() + t, s = M.timeouts.push({ run: i, time: e });
    return M.nextDraw === null && (M.nextDraw = O.window.requestAnimationFrame(M._draw)), s;
  },
  immediate(i) {
    const t = M.immediates.push(i);
    return M.nextDraw === null && (M.nextDraw = O.window.requestAnimationFrame(M._draw)), t;
  },
  cancelFrame(i) {
    i != null && M.frames.remove(i);
  },
  clearTimeout(i) {
    i != null && M.timeouts.remove(i);
  },
  cancelImmediate(i) {
    i != null && M.immediates.remove(i);
  },
  _draw(i) {
    let t = null;
    const e = M.timeouts.last();
    for (; (t = M.timeouts.shift()) && (i >= t.time ? t.run() : M.timeouts.push(t), t !== e); )
      ;
    let s = null;
    const n = M.frames.last();
    for (; s !== n && (s = M.frames.shift()); )
      s.run(i);
    let r = null;
    for (; r = M.immediates.shift(); )
      r();
    M.nextDraw = M.timeouts.first() || M.frames.first() ? O.window.requestAnimationFrame(M._draw) : null;
  }
}, bo = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, wo = function() {
  const i = O.window;
  return (i.performance || i.Date).now();
};
class en extends qe {
  // Construct a new timeline on the given element
  constructor(t = wo) {
    super(), this._timeSource = t, this.terminate();
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    return this.time(this.getEndTimeOfTimeline() + 1), this.pause();
  }
  // Calculates the end of the timeline
  getEndTime() {
    const t = this.getLastRunnerInfo(), e = t ? t.runner.duration() : 0;
    return (t ? t.start : this._time) + e;
  }
  getEndTimeOfTimeline() {
    const t = this._runners.map((e) => e.start + e.runner.duration());
    return Math.max(0, ...t);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(t) {
    return this._runners[this._runnerIds.indexOf(t)] || null;
  }
  pause() {
    return this._paused = !0, this._continue();
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  play() {
    return this._paused = !1, this.updateTime()._continue();
  }
  reverse(t) {
    const e = this.speed();
    if (t == null) return this.speed(-e);
    const s = Math.abs(e);
    return this.speed(t ? -s : s);
  }
  // schedules a runner on the timeline
  schedule(t, e, s) {
    if (t == null)
      return this._runners.map(bo);
    let n = 0;
    const r = this.getEndTime();
    if (e = e || 0, s == null || s === "last" || s === "after")
      n = r;
    else if (s === "absolute" || s === "start")
      n = e, e = 0;
    else if (s === "now")
      n = this._time;
    else if (s === "relative") {
      const c = this.getRunnerInfoById(t.id);
      c && (n = c.start + e, e = 0);
    } else if (s === "with-last") {
      const c = this.getLastRunnerInfo();
      n = c ? c.start : this._time;
    } else
      throw new Error('Invalid value for the "when" parameter');
    t.unschedule(), t.timeline(this);
    const h = t.persist(), a = {
      persist: h === null ? this._persist : h,
      start: n + e,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(a), this._runners.sort((c, u) => c.start - u.start), this._runnerIds = this._runners.map((c) => c.runner.id), this.updateTime()._continue(), this;
  }
  seek(t) {
    return this.time(this._time + t);
  }
  source(t) {
    return t == null ? this._timeSource : (this._timeSource = t, this);
  }
  speed(t) {
    return t == null ? this._speed : (this._speed = t, this);
  }
  stop() {
    return this.time(0), this.pause();
  }
  time(t) {
    return t == null ? this._time : (this._time = t, this._continue(!0));
  }
  // Remove the runner from this timeline
  unschedule(t) {
    const e = this._runnerIds.indexOf(t.id);
    return e < 0 ? this : (this._runners.splice(e, 1), this._runnerIds.splice(e, 1), t.timeline(null), this);
  }
  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    return this.active() || (this._lastSourceTime = this._timeSource()), this;
  }
  // Checks if we are running and continues the animation
  _continue(t = !1) {
    return M.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = M.frame(this._step), this);
  }
  _stepFn(t = !1) {
    const e = this._timeSource();
    let s = e - this._lastSourceTime;
    t && (s = 0);
    const n = this._speed * s + (this._time - this._lastStepTime);
    this._lastSourceTime = e, t || (this._time += n, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let h = this._runners.length; h--; ) {
      const a = this._runners[h], c = a.runner;
      this._time - a.start <= 0 && c.reset();
    }
    let r = !1;
    for (let h = 0, a = this._runners.length; h < a; h++) {
      const c = this._runners[h], u = c.runner;
      let l = n;
      const f = this._time - c.start;
      if (f <= 0) {
        r = !0;
        continue;
      } else f < l && (l = f);
      if (!u.active()) continue;
      u.step(l).done ? c.persist !== !0 && u.duration() - u.time() + this._time + c.persist < this._time && (u.unschedule(), --h, --a) : r = !0;
    }
    return r && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
  terminate() {
    this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }
}
k({
  Element: {
    timeline: function(i) {
      return i == null ? (this._timeline = this._timeline || new en(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class ht extends qe {
  constructor(t) {
    super(), this.id = ht.id++, t = t ?? Ee.duration, t = typeof t == "function" ? new Je(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof Je, this._stepper = this._isDeclarative ? t : new Ii(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new x(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, h = 0;
    return t = t ?? Ee.duration, e = e ?? Ee.delay, s = s || "last", typeof t == "object" && !(t instanceof rs) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, h = t.wait ?? h, t = t.duration ?? Ee.duration), {
      duration: t,
      delay: e,
      swing: r,
      times: n,
      wait: h,
      when: s
    };
  }
  active(t) {
    return t == null ? this.enabled : (this.enabled = t, this);
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(t) {
    return this.transforms.lmultiplyO(t), this;
  }
  after(t) {
    return this.on("finished", t);
  }
  animate(t, e, s) {
    const n = ht.sanitise(t, e, s), r = new ht(n.duration);
    return this._timeline && r.timeline(this._timeline), this._element && r.element(this._element), r.loop(n).schedule(n.delay, n.when);
  }
  clearTransform() {
    return this.transforms = new x(), this;
  }
  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) && (this._queue = this._queue.filter((t) => !t.isTransform));
  }
  delay(t) {
    return this.animate(0, t);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(t) {
    return this.queue(null, t);
  }
  ease(t) {
    return this._stepper = new Ii(t), this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */
  element(t) {
    return t == null ? this._element : (this._element = t, t._prepareRunner(), this);
  }
  finish() {
    return this.step(1 / 0);
  }
  loop(t, e, s) {
    return typeof t == "object" && (e = t.swing, s = t.wait, t = t.times), this._times = t || 1 / 0, this._swing = e || !1, this._wait = s || 0, this._times === !0 && (this._times = 1 / 0), this;
  }
  loops(t) {
    const e = this._duration + this._wait;
    if (t == null) {
      const h = Math.floor(this._time / e), c = (this._time - h * e) / this._duration;
      return Math.min(h + c, this._times);
    }
    const s = Math.floor(t), n = t % 1, r = e * s + this._duration * n;
    return this.time(r);
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  position(t) {
    const e = this._time, s = this._duration, n = this._wait, r = this._times, h = this._swing, a = this._reverse;
    let c;
    if (t == null) {
      const g = function(N) {
        const L = h * Math.floor(N % (2 * (n + s)) / (n + s)), E = L && !a || !L && a, U = Math.pow(-1, E) * (N % (n + s)) / s + E;
        return Math.max(Math.min(U, 1), 0);
      }, _ = r * (n + s) - n;
      return c = e <= 0 ? Math.round(g(1e-5)) : e < _ ? g(e) : Math.round(g(_ - 1e-5)), c;
    }
    const u = Math.floor(this.loops()), l = h && u % 2 === 0;
    return c = u + (l && !a || a && l ? t : 1 - t), this.loops(c);
  }
  progress(t) {
    return t == null ? Math.min(1, this._time / this.duration()) : this.time(t * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(t, e, s, n) {
    return this._queue.push({
      initialiser: t || xs,
      runner: e || xs,
      retarget: s,
      isTransform: n,
      initialised: !1,
      finished: !1
    }), this.timeline() && this.timeline()._continue(), this;
  }
  reset() {
    return this._reseted ? this : (this.time(0), this._reseted = !0, this);
  }
  reverse(t) {
    return this._reverse = t ?? !this._reverse, this;
  }
  schedule(t, e, s) {
    if (t instanceof en || (s = e, e = t, t = this.timeline()), !t)
      throw Error("Runner cannot be scheduled without timeline");
    return t.schedule(this, e, s), this;
  }
  step(t) {
    if (!this.enabled) return this;
    t = t ?? 16, this._time += t;
    const e = this.position(), s = this._lastPosition !== e && this._time >= 0;
    this._lastPosition = e;
    const n = this.duration(), r = this._lastTime <= 0 && this._time > 0, h = this._lastTime < n && this._time >= n;
    this._lastTime = this._time, r && this.fire("start", this);
    const a = this._isDeclarative;
    this.done = !a && !h && this._time >= n, this._reseted = !1;
    let c = !1;
    return (s || a) && (this._initialise(s), this.transforms = new x(), c = this._run(a ? t : e), this.fire("step", this)), this.done = this.done || c && a, h && this.fire("finished", this), this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(t) {
    if (t == null)
      return this._time;
    const e = t - this._time;
    return this.step(e), this;
  }
  timeline(t) {
    return typeof t > "u" ? this._timeline : (this._timeline = t, this);
  }
  unschedule() {
    const t = this.timeline();
    return t && t.unschedule(this), this;
  }
  // Run each initialise function in the runner if required
  _initialise(t) {
    if (!(!t && !this._isDeclarative))
      for (let e = 0, s = this._queue.length; e < s; ++e) {
        const n = this._queue[e], r = this._isDeclarative || !n.initialised && t;
        t = !n.finished, r && t && (n.initialiser.call(this), n.initialised = !0);
      }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(t, e) {
    if (this._history[t] = {
      morpher: e,
      caller: this._queue[this._queue.length - 1]
    }, this._isDeclarative) {
      const s = this.timeline();
      s && s.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(t) {
    let e = !0;
    for (let s = 0, n = this._queue.length; s < n; ++s) {
      const r = this._queue[s], h = r.runner.call(this, t);
      r.finished = r.finished || h === !0, e = e && r.finished;
    }
    return e;
  }
  // do nothing and return false
  _tryRetarget(t, e, s) {
    if (this._history[t]) {
      if (!this._history[t].caller.initialised) {
        const r = this._queue.indexOf(this._history[t].caller);
        return this._queue.splice(r, 1), !1;
      }
      this._history[t].caller.retarget ? this._history[t].caller.retarget.call(this, e, s) : this._history[t].morpher.to(e), this._history[t].caller.finished = !1;
      const n = this.timeline();
      return n && n.play(), !0;
    }
    return !1;
  }
}
ht.id = 0;
class ti {
  constructor(t = new x(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
v([ht, ti], {
  mergeWith(i) {
    return new ti(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const sn = (i, t) => i.lmultiplyO(t), nn = (i) => i.transforms;
function _o() {
  const t = this._transformationRunners.runners.map(nn).reduce(sn, new x());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class ko {
  constructor() {
    this.runners = [], this.ids = [];
  }
  add(t) {
    if (this.runners.includes(t)) return;
    const e = t.id + 1;
    return this.runners.push(t), this.ids.push(e), this;
  }
  clearBefore(t) {
    const e = this.ids.indexOf(t + 1) || 1;
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new ti()).forEach((s) => s.clearTransformsFromQueue()), this;
  }
  edit(t, e) {
    const s = this.ids.indexOf(t + 1);
    return this.ids.splice(s, 1, t + 1), this.runners.splice(s, 1, e), this;
  }
  getByID(t) {
    return this.runners[this.ids.indexOf(t + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let t = null;
    for (let e = 0; e < this.runners.length; ++e) {
      const s = this.runners[e];
      if (t && s.done && t.done && // don't merge runner when persisted on timeline
      (!s._timeline || !s._timeline._runnerIds.includes(s.id)) && (!t._timeline || !t._timeline._runnerIds.includes(t.id))) {
        this.remove(s.id);
        const r = s.mergeWith(t);
        this.edit(t.id, r), t = r, --e;
      } else
        t = s;
    }
    return this;
  }
  remove(t) {
    const e = this.ids.indexOf(t + 1);
    return this.ids.splice(e, 1), this.runners.splice(e, 1), this;
  }
}
k({
  Element: {
    animate(i, t, e) {
      const s = ht.sanitise(i, t, e), n = this.timeline();
      return new ht(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
    },
    delay(i, t) {
      return this.animate(0, i, t);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(i) {
      this._transformationRunners.clearBefore(i.id);
    },
    _currentTransform(i) {
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(nn).reduce(sn, new x());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), M.cancelImmediate(this._frameId), this._frameId = M.immediate(_o.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new ko().add(
        new ti(new x(this))
      ));
    }
  }
});
const vo = (i, t) => i.filter((e) => !t.includes(e));
v(ht, {
  attr(i, t) {
    return this.styleAttr("attr", i, t);
  },
  // Add animatable styles
  css(i, t) {
    return this.styleAttr("css", i, t);
  },
  styleAttr(i, t, e) {
    if (typeof t == "string")
      return this.styleAttr(i, { [t]: e });
    let s = t;
    if (this._tryRetarget(i, s)) return this;
    let n = new Zt(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(h) {
        return this.element()[i](n.at(h).valueOf()), n.done();
      },
      function(h) {
        const a = Object.keys(h), c = vo(a, r);
        if (c.length) {
          const l = this.element()[i](c), f = new De(n.from()).valueOf();
          Object.assign(f, l), n.from(f);
        }
        const u = new De(n.to()).valueOf();
        Object.assign(u, h), n.to(u), r = a, s = h;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new Zt(this._stepper).to(new w(i));
    return this.queue(
      function() {
        e = e.from(this.element().zoom());
      },
      function(s) {
        return this.element().zoom(e.at(s), t), e.done();
      },
      function(s, n) {
        t = n, e.to(s);
      }
    ), this._rememberMorpher("zoom", e), this;
  },
  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(i, t, e) {
    if (t = i.relative || t, this._isDeclarative && !t && this._tryRetarget("transform", i))
      return this;
    const s = x.isMatrixLike(i);
    e = i.affine != null ? i.affine : e ?? !s;
    const n = new Zt(this._stepper).type(
      e ? He : x
    );
    let r, h, a, c, u;
    function l() {
      h = h || this.element(), r = r || Ci(i, h), u = new x(t ? void 0 : h), h._addRunner(this), t || h._clearTransformRunnersBefore(this);
    }
    function f(_) {
      t || this.clearTransform();
      const { x: N, y: L } = new W(r).transform(
        h._currentTransform(this)
      );
      let E = new x({ ...i, origin: [N, L] }), U = this._isDeclarative && a ? a : u;
      if (e) {
        E = E.decompose(N, L), U = U.decompose(N, L);
        const pt = E.rotate, Rt = U.rotate, Pt = [pt - 360, pt, pt + 360], Yt = Pt.map((Sn) => Math.abs(Sn - Rt)), Ke = Math.min(...Yt), Ze = Yt.indexOf(Ke);
        E.rotate = Pt[Ze];
      }
      t && (s || (E.rotate = i.rotate || 0), this._isDeclarative && c && (U.rotate = c)), n.from(U), n.to(E);
      const dt = n.at(_);
      return c = dt.rotate, a = new x(dt), this.addTransform(a), h._addRunner(this), n.done();
    }
    function g(_) {
      (_.origin || "center").toString() !== (i.origin || "center").toString() && (r = Ci(_, h)), i = { ..._, origin: r };
    }
    return this.queue(l, f, g, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
  },
  // Animatable x-axis
  x(i) {
    return this._queueNumber("x", i);
  },
  // Animatable y-axis
  y(i) {
    return this._queueNumber("y", i);
  },
  ax(i) {
    return this._queueNumber("ax", i);
  },
  ay(i) {
    return this._queueNumber("ay", i);
  },
  dx(i = 0) {
    return this._queueNumberDelta("x", i);
  },
  dy(i = 0) {
    return this._queueNumberDelta("y", i);
  },
  dmove(i, t) {
    return this.dx(i).dy(t);
  },
  _queueNumberDelta(i, t) {
    if (t = new w(t), this._tryRetarget(i, t)) return this;
    const e = new Zt(this._stepper).to(t);
    let s = null;
    return this.queue(
      function() {
        s = this.element()[i](), e.from(s), e.to(s + t);
      },
      function(n) {
        return this.element()[i](e.at(n)), e.done();
      },
      function(n) {
        e.to(s + new w(n));
      }
    ), this._rememberMorpher(i, e), this;
  },
  _queueObject(i, t) {
    if (this._tryRetarget(i, t)) return this;
    const e = new Zt(this._stepper).to(t);
    return this.queue(
      function() {
        e.from(this.element()[i]());
      },
      function(s) {
        return this.element()[i](e.at(s)), e.done();
      }
    ), this._rememberMorpher(i, e), this;
  },
  _queueNumber(i, t) {
    return this._queueObject(i, new w(t));
  },
  // Animatable center x-axis
  cx(i) {
    return this._queueNumber("cx", i);
  },
  // Animatable center y-axis
  cy(i) {
    return this._queueNumber("cy", i);
  },
  // Add animatable move
  move(i, t) {
    return this.x(i).y(t);
  },
  amove(i, t) {
    return this.ax(i).ay(t);
  },
  // Add animatable center
  center(i, t) {
    return this.cx(i).cy(t);
  },
  // Add animatable size
  size(i, t) {
    let e;
    return (!i || !t) && (e = this._element.bbox()), i || (i = e.width / e.height * t), t || (t = e.height / e.width * i), this.width(i).height(t);
  },
  // Add animatable width
  width(i) {
    return this._queueNumber("width", i);
  },
  // Add animatable height
  height(i) {
    return this._queueNumber("height", i);
  },
  // Add animatable plot
  plot(i, t, e, s) {
    if (arguments.length === 4)
      return this.plot([i, t, e, s]);
    if (this._tryRetarget("plot", i)) return this;
    const n = new Zt(this._stepper).type(this._element.MorphArray).to(i);
    return this.queue(
      function() {
        n.from(this._element.array());
      },
      function(r) {
        return this._element.plot(n.at(r)), n.done();
      }
    ), this._rememberMorpher("plot", n), this;
  },
  // Add leading method
  leading(i) {
    return this._queueNumber("leading", i);
  },
  // Add animatable viewbox
  viewbox(i, t, e, s) {
    return this._queueObject("viewbox", new K(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
v(ht, { rx: is, ry: ss, from: Zs, to: Qs });
C(ht, "Runner");
class hs extends nt {
  constructor(t, e = t) {
    super(z("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? ft(this.node.querySelector("defs")) || this.put(new es()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof O.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: Ki, version: "1.1" }).attr(
      "xmlns:xlink",
      Ve,
      bi
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, bi).attr("xmlns:svgjs", null, bi);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    return this.isRoot() ? this : super.root();
  }
}
k({
  Container: {
    // Create nested svg document
    nested: D(function() {
      return this.put(new hs());
    })
  }
});
C(hs, "Svg", !0);
let as = class extends nt {
  // Initialize node
  constructor(t, e = t) {
    super(z("symbol", t), e);
  }
};
k({
  Container: {
    symbol: D(function() {
      return this.put(new as());
    })
  }
});
C(as, "Symbol");
function No(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(O.document.createTextNode(i)), this;
}
function Oo() {
  return this.node.getComputedTextLength();
}
function Co(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function To(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function Io(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function Ao(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function Eo(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function So(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Mo(i) {
  return this.attr("x", i);
}
function Lo(i) {
  return this.attr("y", i);
}
function Ro(i, t) {
  return this.ax(i).ay(t);
}
function Po(i) {
  return this._build = !!i, this;
}
const rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Ro,
  ax: Mo,
  ay: Lo,
  build: Po,
  center: So,
  cx: Ao,
  cy: Eo,
  length: Oo,
  move: Io,
  plain: No,
  x: Co,
  y: To
}, Symbol.toStringTag, { value: "Module" }));
class xt extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("text", t), e), this.dom.leading = this.dom.leading ?? new w(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(t) {
    return t == null ? this.dom.leading : (this.dom.leading = new w(t), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(t) {
    if (typeof t == "boolean" && (this._rebuild = t), this._rebuild) {
      const e = this;
      let s = 0;
      const n = this.dom.leading;
      this.each(function(r) {
        if (Ti(this.node)) return;
        const h = O.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new w(h);
        this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === `
` ? s += a : (this.attr("dy", r ? a + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new w(t.leading || 1.3), this;
  }
  writeDataToDom() {
    return Rs(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || Ti(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && ft(e[n]).dom.newLined === !0 && (t += `
`), t += e[n].textContent;
      }
      return t;
    }
    if (this.clear().build(!0), typeof t == "function")
      t.call(this, this);
    else {
      t = (t + "").split(`
`);
      for (let e = 0, s = t.length; e < s; e++)
        this.newLine(t[e]);
    }
    return this.build(!1).rebuild();
  }
}
v(xt, rn);
k({
  Container: {
    // Create text element
    text: D(function(i = "") {
      return this.put(new xt()).text(i);
    }),
    // Create plain text element
    plain: D(function(i = "") {
      return this.put(new xt()).plain(i);
    })
  }
});
C(xt, "Text");
class mi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(z("tspan", t), e), this._build = !1;
  }
  // Shortcut dx
  dx(t) {
    return this.attr("dx", t);
  }
  // Shortcut dy
  dy(t) {
    return this.attr("dy", t);
  }
  // Create new line
  newLine() {
    this.dom.newLined = !0;
    const t = this.parent();
    if (!(t instanceof xt))
      return this;
    const e = t.index(this), s = O.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new w(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
v(mi, rn);
k({
  Tspan: {
    tspan: D(function(i = "") {
      const t = new mi();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
C(mi, "Tspan");
let cs = class extends at {
  constructor(t, e = t) {
    super(z("circle", t), e);
  }
  radius(t) {
    return this.attr("r", t);
  }
  // Radius x value
  rx(t) {
    return this.attr("r", t);
  }
  // Alias radius x value
  ry(t) {
    return this.rx(t);
  }
  size(t) {
    return this.radius(new w(t).divide(2));
  }
};
v(cs, { x: qs, y: Gs, cx: Hs, cy: Xs, width: Ys, height: Ws });
k({
  Container: {
    // Create circle element
    circle: D(function(i = 0) {
      return this.put(new cs()).size(i).move(0, 0);
    })
  }
});
C(cs, "Circle");
class Li extends nt {
  constructor(t, e = t) {
    super(z("clipPath", t), e);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return Te("svg [clip-path*=" + this.id() + "]");
  }
}
k({
  Container: {
    // Create clipping element
    clip: D(function() {
      return this.defs().put(new Li());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof Li ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
C(Li, "ClipPath");
class ei extends bt {
  constructor(t, e = t) {
    super(z("foreignObject", t), e);
  }
}
k({
  Container: {
    foreignObject: D(function(i, t) {
      return this.put(new ei()).size(i, t);
    })
  }
});
C(ei, "ForeignObject");
function Do(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof $n().SVGSVGElement ? new K(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new x(e), r = n.translate(i, t).transform(n.inverse()), h = new W(s.x, s.y).transform(r);
    e.move(h.x, h.y);
  }), this;
}
function Fo(i) {
  return this.dmove(i, 0);
}
function zo(i) {
  return this.dmove(0, i);
}
function $o(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function jo(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function Uo(i, t, e = this.bbox()) {
  const s = Ce(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((h) => {
    const a = new W(e).transform(new x(h).inverse());
    h.scale(n, r, a.x, a.y);
  }), this;
}
function Bo(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function Vo(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function qo(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const on = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: Do,
  dx: Fo,
  dy: zo,
  height: $o,
  move: jo,
  size: Uo,
  width: Bo,
  x: Vo,
  y: qo
}, Symbol.toStringTag, { value: "Module" }));
class gi extends nt {
  constructor(t, e = t) {
    super(z("g", t), e);
  }
}
v(gi, on);
k({
  Container: {
    // Create a group element
    group: D(function() {
      return this.put(new gi());
    })
  }
});
C(gi, "G");
class ii extends nt {
  constructor(t, e = t) {
    super(z("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, Ve);
  }
}
v(ii, on);
k({
  Container: {
    // Create a hyperlink element
    link: D(function(i) {
      return this.put(new ii()).to(i);
    })
  },
  Element: {
    unlink() {
      const i = this.linker();
      if (!i) return this;
      const t = i.parent();
      if (!t)
        return this.remove();
      const e = t.index(i);
      return t.add(this, e), i.remove(), this;
    },
    linkTo(i) {
      let t = this.linker();
      return t || (t = new ii(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
C(ii, "A");
class Ri extends nt {
  // Initialize node
  constructor(t, e = t) {
    super(z("mask", t), e);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return Te("svg [mask*=" + this.id() + "]");
  }
}
k({
  Container: {
    mask: D(function() {
      return this.defs().put(new Ri());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof Ri ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
C(Ri, "Mask");
class hn extends bt {
  constructor(t, e = t) {
    super(z("stop", t), e);
  }
  // add color stops
  update(t) {
    return (typeof t == "number" || t instanceof w) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new w(t.offset)), this;
  }
}
k({
  Gradient: {
    // Add a color stop
    stop: function(i, t, e) {
      return this.put(new hn()).update(i, t, e);
    }
  }
});
C(hn, "Stop");
function Go(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += Dn(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Pi extends bt {
  constructor(t, e = t) {
    super(z("style", t), e);
  }
  addText(t = "") {
    return this.node.textContent += t, this;
  }
  font(t, e, s = {}) {
    return this.rule("@font-face", {
      fontFamily: t,
      src: e,
      ...s
    });
  }
  rule(t, e) {
    return this.addText(Go(t, e));
  }
}
k("Dom", {
  style(i, t) {
    return this.put(new Pi()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Pi()).font(i, t, e);
  }
});
C(Pi, "Style");
class us extends xt {
  // Initialize node
  constructor(t, e = t) {
    super(z("textPath", t), e);
  }
  // return the array of the path track element
  array() {
    const t = this.track();
    return t ? t.array() : null;
  }
  // Plot path if any
  plot(t) {
    const e = this.track();
    let s = null;
    return e && (s = e.plot(t)), t == null ? s : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
}
k({
  Container: {
    textPath: D(function(i, t) {
      return i instanceof xt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: D(function(i, t = !0) {
      const e = new us();
      i instanceof Ie || (i = this.defs().path(i)), e.attr("href", "#" + i, Ve);
      let s;
      if (t)
        for (; s = this.node.firstChild; )
          e.node.appendChild(s);
      return this.put(e);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: D(function(i) {
      return i instanceof xt || (i = new xt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return Te("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
us.prototype.MorphArray = ce;
C(us, "TextPath");
class an extends at {
  constructor(t, e = t) {
    super(z("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, Ve);
  }
}
k({
  Container: {
    // Create a use element
    use: D(function(i, t) {
      return this.put(new an()).use(i, t);
    })
  }
});
C(an, "Use");
const cn = J;
v([hs, as, di, Re, Qe], st("viewbox"));
v([Pe, Ye, Xe, Ie], st("marker"));
v(xt, st("Text"));
v(Ie, st("Path"));
v(es, st("Defs"));
v([xt, mi], st("Tspan"));
v([pi, fi, Ge, ht], st("radius"));
v(qe, st("EventTarget"));
v(Gt, st("Dom"));
v(bt, st("Element"));
v(at, st("Shape"));
v([nt, Ks], st("Container"));
v(Ge, st("Gradient"));
v(ht, st("Runner"));
ae.extend(Rn());
lo([
  w,
  R,
  K,
  x,
  Ne,
  Ht,
  ce,
  W
]);
fo();
const ws = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class Ho {
  constructor(t) {
    t.remember("_draggable", this), this.el = t, this.drag = this.drag.bind(this), this.startDrag = this.startDrag.bind(this), this.endDrag = this.endDrag.bind(this);
  }
  // Enables or disabled drag based on input
  init(t) {
    t ? (this.el.on("mousedown.drag", this.startDrag), this.el.on("touchstart.drag", this.startDrag, { passive: !1 })) : (this.el.off("mousedown.drag"), this.el.off("touchstart.drag"));
  }
  // Start dragging
  startDrag(t) {
    const e = !t.type.indexOf("mouse");
    if (e && t.which !== 1 && t.buttons !== 0 || this.el.dispatch("beforedrag", { event: t, handler: this }).defaultPrevented)
      return;
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(ws(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Le(window, s, this.drag, this, { passive: !1 }), Le(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(ws(t)), r = n.x - s.x, h = n.y - s.y;
    if (!r && !h) return e;
    const a = e.x + r, c = e.y + h;
    this.box = new K(a, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box
    }).defaultPrevented && this.move(a, c);
  }
  move(t, e) {
    this.el.type === "svg" ? gi.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), Tt(window, "mousemove.drag"), Tt(window, "touchmove.drag"), Tt(window, "mouseup.drag"), Tt(window, "touchend.drag"), this.init(!0);
  }
}
v(bt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new Ho(this)).init(i), this;
  }
});
function It(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function qt(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var Di;
(function(i) {
  i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive";
})(Di || (Di = {}));
var _s;
(function(i) {
  i.X = "Ox", i.Y = "Oy";
})(_s || (_s = {}));
var Oe;
(function(i) {
  i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar";
})(Oe || (Oe = {}));
var ks;
(function(i) {
  i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates";
})(ks || (ks = {}));
var vs;
(function(i) {
  i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector";
})(vs || (vs = {}));
var Ns;
(function(i) {
  i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star";
})(Ns || (Ns = {}));
var ge, Fe, B, it, te, At, Et, ze, $e, Fi;
class Xo {
  constructor(t, e, s) {
    p(this, $e);
    p(this, ge);
    p(this, Fe);
    p(this, B);
    p(this, it);
    p(this, te);
    p(this, At);
    p(this, Et);
    p(this, ze);
    d(this, ge, t), d(this, Fe, e), d(this, it, Object.assign({
      text: e,
      asHtml: !1,
      alignement: "br",
      offset: { x: 0, y: 0 },
      texConverter: (n) => n
    }, s)), d(this, te, s.text ?? e), d(this, At, 0), d(this, Et, 0), d(this, ze, "display: block; position: fixed; white-space:nowrap"), d(this, B, b(this, $e, Fi).call(this));
  }
  get config() {
    return o(this, it);
  }
  get x() {
    return o(this, At);
  }
  set x(t) {
    d(this, At, t);
  }
  get y() {
    return o(this, Et);
  }
  set y(t) {
    d(this, Et, t);
  }
  get asHtml() {
    return o(this, it).asHtml;
  }
  get shape() {
    return o(this, B);
  }
  get alignement() {
    return o(this, it).alignement;
  }
  get label() {
    return o(this, B);
  }
  get displayName() {
    return o(this, it).asHtml ? o(this, it).texConverter(o(this, te)) : o(this, te);
  }
  hide() {
    return o(this, B).hide(), this;
  }
  show() {
    return o(this, B).show(), this;
  }
  setLabel(t) {
    return t !== void 0 && d(this, te, t), b(this, $e, Fi).call(this), this;
  }
  move(t, e) {
    return d(this, At, t), d(this, Et, e), this.position(), this;
  }
  rotate(t) {
    return o(this, B).transform({
      rotate: t,
      origin: { x: o(this, At), y: o(this, Et) }
    }), this;
  }
  position(t, e) {
    t === void 0 && (t = o(this, it).alignement), e === void 0 && (e = o(this, it).offset), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, o(this, it).alignement = t, o(this, it).offset = e;
    let s = o(this, At), n = o(this, Et), r = 0, h = 0;
    return o(this, B) instanceof ei ? (r = o(this, B).node.children[0].clientWidth, h = o(this, B).node.children[0].clientHeight, this.label.width(r), this.label.height(h)) : (r = o(this, B).length(), h = o(this, B).bbox().h), t.includes("l") ? s = s - r / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? s = s + r / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (s = +s), t.includes("t") ? n = n - h / 2 : t.includes("m") ? n = +n : t.includes("b") && (n = n + h / 2), o(this, B) instanceof ei ? o(this, B).center(s + (e.x ?? 0), n - (e.y ?? 0)) : o(this, B).center(s + (e.x ?? 0), n - (e.y ?? 0)), this;
  }
}
ge = new WeakMap(), Fe = new WeakMap(), B = new WeakMap(), it = new WeakMap(), te = new WeakMap(), At = new WeakMap(), Et = new WeakMap(), ze = new WeakMap(), $e = new WeakSet(), Fi = function() {
  return o(this, B) && o(this, B).remove(), d(this, B, o(this, it).asHtml ? o(this, ge).foreignObject(1, 1).attr("style", "overflow:visible").add(cn(`<div style="${o(this, ze)}">${this.displayName}</div>`, !0)) : o(this, ge).text(this.displayName)), o(this, B).attr("id", `${o(this, Fe)}-label`), o(this, B);
};
function un(i, t = 10) {
  return +i.toFixed(t);
}
function Yo(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function ls(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class j {
  constructor(t, e) {
    et(this, "_x");
    et(this, "_y");
    return this._x = 0, this._y = 0, It(t) && It(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : It(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t;
  }
  get norm() {
    return Math.sqrt(this._x ** 2 + this._y ** 2);
  }
  get normal() {
    return new j(this._y, -this._x);
  }
  get unit() {
    const t = this.norm;
    return new j(this._x / t, this._y / t);
  }
  static scalarProduct(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  projection(t) {
    const e = t.x, s = t.y, n = j.scalarProduct(this, t) / (e ** 2 + s ** 2);
    return new j(e * n, s * n);
  }
  rotate(t) {
    const e = +t * Math.PI / 180, s = +this._x, n = +this._y;
    return this._x = Math.cos(e) * s - Math.sin(e) * n, this._y = Math.sin(e) * s + Math.cos(e) * n, this;
  }
  add(t) {
    return new j(this._x + t.x, this._y + t.y);
  }
  setLength(t) {
    const e = this.norm;
    return this._x = this._x * t / e, this._y = this._y * t / e, this;
  }
}
class fs {
  constructor(t, e) {
    et(this, "_A");
    et(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new j(0, 0), e instanceof j)
      this._A = t, this._director = e;
    else
      return new fs(t, new j(t, e));
  }
  get A() {
    return this._A;
  }
  set A(t) {
    this._A = t;
  }
  get director() {
    return this._director;
  }
  set director(t) {
    this._director = t;
  }
  get normal() {
    return new j(this._director.y, -this._director.x);
  }
  get slope() {
    return this._director.y / this._director.x;
  }
  get ordinate() {
    return this._A.y - this._A.x * this.slope;
  }
  getValueAtX(t) {
    return t * this.slope + this.ordinate;
  }
  getValueAtY(t) {
    const e = this.slope;
    return Yo(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let h, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (h = this._A.x, a = n * h + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (h = t.A.x, a = e * h + s) : (h = (r - s) / (e - n), a = e * h + s), h === Number.POSITIVE_INFINITY || h === Number.NEGATIVE_INFINITY ? null : { x: h, y: a };
  }
  projection(t) {
    const e = this._director, s = new j(this._A, t), n = j.scalarProduct(e, s) / j.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class si {
  constructor(t, e) {
    et(this, "_rpn");
    et(this, "_expression");
    et(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new Wo(me.NUMERIC).parse(t, e ?? !0).rpn, this._isValid = !0;
    } catch {
      this._rpn = [], this._isValid = !1;
    }
  }
  get rpn() {
    return this._rpn;
  }
  get expression() {
    return this._expression;
  }
  get isValid() {
    try {
      this.evaluate({ x: 0 }), this._isValid = !0;
    } catch {
      this._isValid = !1;
    }
    return this._isValid;
  }
  set isValid(t) {
    this._isValid = t;
  }
  evaluate(t) {
    const e = [];
    if (this._rpn.length === 0)
      return this._isValid = !1, NaN;
    this.isValid = !0;
    for (const s of this._rpn)
      if (s.tokenType === m.COEFFICIENT)
        isNaN(+s.token) ? console.log("adding Fraction - should not be here ! ") : this._addToStack(e, +s.token);
      else if (s.tokenType === m.VARIABLE)
        (t == null ? void 0 : t[s.token]) !== void 0 && this._addToStack(e, +t[s.token]);
      else if (s.tokenType === m.CONSTANT)
        this._addToStack(e, zi[s.token]);
      else if (s.tokenType === m.OPERATION) {
        if (s.token === "*") {
          const n = e.pop(), r = e.pop();
          if (r === void 0 || n === void 0)
            return this.isValid = !1, NaN;
          this._addToStack(e, r * n);
        } else if (s.token === "/") {
          const n = e.pop(), r = e.pop();
          if (r === void 0 || n === void 0)
            return this.isValid = !1, NaN;
          this._addToStack(e, r / n);
        } else if (s.token === "+") {
          const n = e.pop(), r = e.pop();
          if (r === void 0 || n === void 0)
            return this.isValid = !1, NaN;
          this._addToStack(e, +r + +n);
        } else if (s.token === "-") {
          const n = e.pop(), r = e.pop() ?? 0;
          if (n === void 0)
            return this.isValid = !1, NaN;
          this._addToStack(e, r - n);
        } else if (s.token === "^") {
          const n = e.pop(), r = e.pop();
          if (r === void 0 || n === void 0)
            return this.isValid = !1, NaN;
          this._addToStack(e, Math.pow(r, n));
        }
      } else if (s.tokenType === m.FUNCTION) {
        const n = e.pop();
        if (n === void 0)
          return this.isValid = !1, NaN;
        if (s.token === "sin")
          this._addToStack(e, Math.sin(n));
        else if (s.token === "cos")
          this._addToStack(e, Math.cos(n));
        else if (s.token === "tan")
          this._addToStack(e, Math.tan(n));
        else if (s.token === "asin")
          this._addToStack(e, Math.asin(n));
        else if (s.token === "acos")
          this._addToStack(e, Math.acos(n));
        else if (s.token === "atan")
          this._addToStack(e, Math.atan(n));
        else if (s.token === "sqrt")
          this._addToStack(e, Math.sqrt(n));
        else if (s.token === "nthrt") {
          const r = e.pop();
          if (r === void 0)
            return this._isValid = !1, NaN;
          n % 2 === 0 && r < 0 ? this._addToStack(e, NaN) : this._addToStack(e, (r < 0 ? -1 : 1) * Math.pow(Math.abs(r), 1 / n));
        } else s.token === "ln" ? this._addToStack(e, Math.log(n)) : s.token === "log" ? this._addToStack(e, Math.log10(n)) : s.token === "abs" && this._addToStack(e, Math.abs(n));
      }
    if (e.length === 1)
      return e[0];
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _extractDecimalPart(t) {
    let e = t.toString();
    return e.includes(".") ? (e = e.split(".")[1], e.substring(0, e.length - 2)) : "";
  }
  _addToStack(t, e) {
    t.push(un(e));
  }
}
const zi = {
  pi: Math.PI,
  e: Math.exp(1)
};
var m;
(function(i) {
  i.LEFT_PARENTHESIS = "(", i.RIGHT_PARENTHESIS = ")", i.VARIABLE = "variable", i.COEFFICIENT = "coefficient", i.OPERATION = "operation", i.CONSTANT = "constant", i.FUNCTION = "function", i.FUNCTION_ARGUMENT = "function-argument", i.MONOM = "monom";
})(m || (m = {}));
var me;
(function(i) {
  i.EXPRESSION = "expression", i.POLYNOM = "polynom", i.NUMERIC = "numeric";
})(me || (me = {}));
class Wo {
  constructor(t) {
    et(this, "_mode");
    et(this, "_tokenConfig");
    et(this, "_tokenConstant");
    et(this, "_tokenKeys");
    et(this, "_uniformize");
    et(this, "_rpn", []);
    this._mode = typeof t > "u" ? me.POLYNOM : t, this._tokenConfig = {}, this._tokenConstant = {}, this._tokenKeys = [], this._uniformize = !1, this.tokenConfigInitialization();
  }
  get rpn() {
    return this._rpn;
  }
  get rpnToken() {
    return this._rpn.map((t) => t.token);
  }
  tokenConfigInitialization() {
    return this._mode === me.NUMERIC ? (this._tokenConfig = {
      "^": { precedence: 4, associative: "right", type: m.OPERATION },
      "*": { precedence: 3, associative: "left", type: m.OPERATION },
      "/": { precedence: 3, associative: "left", type: m.OPERATION },
      "+": { precedence: 2, associative: "left", type: m.OPERATION },
      "-": { precedence: 2, associative: "left", type: m.OPERATION },
      "%": { precedence: 3, associative: "right", type: m.OPERATION },
      sin: { precedence: 4, associative: "right", type: m.FUNCTION },
      cos: { precedence: 4, associative: "right", type: m.FUNCTION },
      tan: { precedence: 4, associative: "right", type: m.FUNCTION },
      asin: { precedence: 4, associative: "right", type: m.FUNCTION },
      acos: { precedence: 4, associative: "right", type: m.FUNCTION },
      atan: { precedence: 4, associative: "right", type: m.FUNCTION },
      sqrt: { precedence: 4, associative: "right", type: m.FUNCTION },
      nthrt: { precedence: 4, associative: "right", type: m.FUNCTION },
      ln: { precedence: 4, associative: "right", type: m.FUNCTION },
      log: { precedence: 4, associative: "right", type: m.FUNCTION },
      abs: { precedence: 4, associative: "right", type: m.FUNCTION }
    }, this._uniformize = !1) : this._mode === me.EXPRESSION ? (this._tokenConfig = {
      "^": { precedence: 4, associative: "right", type: m.OPERATION },
      "*": { precedence: 3, associative: "left", type: m.OPERATION },
      "/": { precedence: 3, associative: "left", type: m.OPERATION },
      "+": { precedence: 2, associative: "left", type: m.OPERATION },
      "-": { precedence: 2, associative: "left", type: m.OPERATION },
      "%": { precedence: 3, associative: "right", type: m.OPERATION },
      sin: { precedence: 4, associative: "right", type: m.FUNCTION },
      cos: { precedence: 4, associative: "right", type: m.FUNCTION },
      tan: { precedence: 4, associative: "right", type: m.FUNCTION },
      asin: { precedence: 4, associative: "right", type: m.FUNCTION },
      acos: { precedence: 4, associative: "right", type: m.FUNCTION },
      atan: { precedence: 4, associative: "right", type: m.FUNCTION },
      sqrt: { precedence: 4, associative: "right", type: m.FUNCTION },
      nthrt: { precedence: 4, associative: "right", type: m.FUNCTION },
      abs: { precedence: 4, associative: "right", type: m.FUNCTION }
    }, this._uniformize = !0) : (this._tokenConfig = {
      "^": { precedence: 4, associative: "right", type: m.OPERATION },
      "*": { precedence: 3, associative: "left", type: m.OPERATION },
      "/": { precedence: 3, associative: "left", type: m.OPERATION },
      "+": { precedence: 2, associative: "left", type: m.OPERATION },
      "-": { precedence: 2, associative: "left", type: m.OPERATION }
    }, this._uniformize = !0), this._tokenKeys = Object.keys(this._tokenConfig).sort((t, e) => e.length - t.length), this._tokenConfig;
  }
  NextToken(t, e) {
    let s, n;
    if (s = "", n = m.MONOM, t[e] === "(")
      s = "(", n = m.LEFT_PARENTHESIS;
    else if (t[e] === ")")
      s = ")", n = m.RIGHT_PARENTHESIS;
    else if (t[e] === ",")
      s = ",", n = m.FUNCTION_ARGUMENT;
    else {
      for (const r of this._tokenKeys)
        if (t.substring(e, e + r.length) === r) {
          s += r, n = this._tokenConfig[r].type;
          break;
        }
      for (const r in zi)
        if (t.substring(e, e + r.length) === r) {
          s += r, n = m.CONSTANT;
          break;
        }
      if (s === "")
        if (t[e].match(/[0-9]/)) {
          const r = t.substring(e).match(/^([0-9.]+)/);
          r && (s = r[0]), n = m.COEFFICIENT;
        } else if (t[e].match(/[a-zA-Z]/)) {
          const r = t.substring(e).match(/^([a-zA-Z]+)/);
          r && (s = r[0], n = m.VARIABLE);
        } else
          console.log("Unidentified token", t[e], t, e), s = t[e], n = m.MONOM;
    }
    return [s, e + s.length, n];
  }
  normalize(t) {
    if (t.length === 1)
      return t;
    const e = [], s = [];
    for (const c in this._tokenConfig)
      this._tokenConfig[c].type === m.FUNCTION && e.push(c);
    e.sort((c, u) => u.length - c.length);
    for (const c in zi)
      s.push(c);
    s.sort((c, u) => u.length - c.length);
    let n = "", r = 0, h, a;
    for (; r < t.length - 1; ) {
      let c = 0;
      for (; c < e.length; ) {
        const u = e[c];
        t.slice(r, r + u.length + 1) === u + "(" ? (n += u + "(", r += u.length + 1, c = 0) : c++;
      }
      for (c = 0; c < s.length; ) {
        const u = s[c];
        if (t.slice(r, r + u.length) === u) {
          n += u, r += u.length;
          break;
        }
        c++;
      }
      if (r >= t.length)
        break;
      h = t[r], a = t[r + 1], n += h, h.match(/[a-zA-Z]/g) ? a.match(/[a-zA-Z\d(]/) && (n += "*") : h.match(/\d/) ? a.match(/[a-zA-Z(]/) && (n += "*") : h === ")" && a.match(/[a-zA-Z\d(]/) && (n += "*"), r++;
    }
    return n + (a ?? "");
  }
  parse(t, e) {
    (e ?? this._uniformize) && (t = this.normalize(t));
    let s = 50, n, r = 0, h, a;
    const c = 50, u = [], l = [];
    for (; r < t.length; ) {
      if (s--, s === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([h, r, a] = this.NextToken(t, r), a) {
        case m.MONOM:
        case m.COEFFICIENT:
        case m.VARIABLE:
        case m.CONSTANT:
          u.push({ token: h, tokenType: a });
          break;
        case m.OPERATION:
          if (l.length > 0) {
            let f = l[l.length - 1];
            for (n = +c; f.token in this._tokenConfig && (this._tokenConfig[h].associative === "left" && this._tokenConfig[h].precedence <= this._tokenConfig[f.token].precedence || this._tokenConfig[h].associative === "right" && this._tokenConfig[h].precedence < this._tokenConfig[f.token].precedence); ) {
              if (n--, n === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (u.push(l.pop() ?? { token: "", tokenType: m.OPERATION }), l.length === 0)
                break;
              f = l[l.length - 1];
            }
          }
          l.push({ token: h, tokenType: a });
          break;
        case m.FUNCTION_ARGUMENT:
          for (n = +c; l[l.length - 1].token !== "(" && l.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            u.push(l.pop() ?? { token: h, tokenType: a });
          }
          break;
        case m.LEFT_PARENTHESIS:
          l.push({ token: h, tokenType: a }), t[r] === "-" && u.push({ token: "0", tokenType: m.COEFFICIENT });
          break;
        case m.RIGHT_PARENTHESIS:
          for (n = +c; l[l.length - 1].token !== "(" && l.length > 1; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
              break;
            }
            u.push(l.pop() ?? { token: h, tokenType: a });
          }
          l.pop();
          break;
        case m.FUNCTION:
          l.push({ token: h, tokenType: a });
          break;
        default:
          console.log(`SHUTING YARD: ${a} : ${h} `);
      }
    }
    return this._rpn = u.concat(l.reverse()), this;
  }
}
function X(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (qt(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return It(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function $i(i, t) {
  return {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  };
}
function Jt(i, t, e, s, n = 0, r = !1, h) {
  let a = 0, c = 0, u = 0, l = 0;
  if (t.x === 0)
    a = i.x, r ? c = i.y + n : c = t.y > 0 ? +n : s - n, u = i.x, h ? l = t.y < 0 ? i.y + h * t.y : 0 + n : l = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? a = i.x - n : a = t.x > 0 ? 0 + n : e - n, c = i.y, h ? u = t.x > 0 ? i.x + h * t.x : 0 - n : u = t.x > 0 ? e - n : 0 + n, l = i.y;
  else {
    let f = 0, g = 0;
    t.x > 0 ? (f = r ? -n / t.x : h || (i.x - n) / t.x, g = h || (e - i.x - n) / t.x) : t.x < 0 && (f = r ? -n / t.x : h || (e - i.x - n) / t.x, g = h || (i.x - n) / t.x), f = Math.abs(f), g = Math.abs(g), a = i.x - f * t.x, c = i.y - f * t.y, u = i.x + g * t.x, l = i.y + g * t.y;
  }
  return a > e && u > e || a < 0 && u < 0 || c > s && l > s || c < 0 && l < 0 ? null : [{ x: a, y: c }, { x: u, y: l }];
}
function Os(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function Cs(i, t) {
  let e;
  const s = t.x - i.x, n = -(t.y - i.y);
  if (e = t.x - i.x === 0 ? 90 : Math.atan(n / s) * 180 / Math.PI, s >= 0) {
    if (!(n >= 0)) for (; e < 270; )
      e += 180;
  } else if (n >= 0)
    for (; e < 90; )
      e += 180;
  else
    for (; e < 180; )
      e += 180;
  return e;
}
function We(i, t, e) {
  return e === "x" ? {
    start: i.marker(t, t, function(s) {
      s.path(`M0,0 L${t},${t} M${t},0 L0,${t}`).stroke({
        color: "black",
        width: 1
      });
    }).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(t, t, function(s) {
      s.path(`M0,0 L${t},${t} M${t},0 L0,${t}`).stroke({
        color: "black",
        width: 1
      });
    }).attr("markerUnits", "userSpaceOnUse")
  } : e === "|" ? {
    start: i.marker(t, t, function(s) {
      s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
    }).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(t, t, function(s) {
      s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
    }).attr("markerUnits", "userSpaceOnUse")
  } : {
    start: i.marker(t * 1.2, t * 1.2, function(s) {
      s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`).rotate(180);
    }).ref(0, t / 2).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(t * 1.2, t * 1.2, function(s) {
      s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`);
    }).ref(t, t / 2).attr("markerUnits", "userSpaceOnUse")
  };
}
var zt, wt, mt, rt, Y, ye, ee, _t;
class ct {
  constructor(t, e) {
    p(this, zt);
    p(this, wt);
    p(this, mt);
    p(this, rt);
    p(this, Y);
    p(this, ye);
    p(this, ee);
    p(this, _t);
    d(this, zt, t), d(this, wt, e), d(this, ye, !1), d(this, ee, !1), d(this, _t, null), d(this, mt, o(this, zt).group().attr("id", o(this, wt))), d(this, Y, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), d(this, rt, o(this, mt).path());
  }
  get element() {
    return o(this, mt);
  }
  get name() {
    return o(this, wt);
  }
  get rootSVG() {
    return o(this, zt);
  }
  get shape() {
    return o(this, rt);
  }
  set shape(t) {
    d(this, rt, t);
  }
  get appearance() {
    return o(this, Y);
  }
  set appearance(t) {
    d(this, Y, t);
  }
  get graphConfig() {
    return o(this, zt).data("config");
  }
  get static() {
    return o(this, ye);
  }
  set static(t) {
    d(this, ye, t);
  }
  get isDraggable() {
    return o(this, ee);
  }
  set isDraggable(t) {
    d(this, ee, t);
  }
  hide() {
    return o(this, mt).hide(), this;
  }
  show() {
    return o(this, mt).show(), this;
  }
  strokeable() {
    return [o(this, rt)];
  }
  fillable() {
    return [o(this, rt)];
  }
  fill(t) {
    if (t !== void 0) {
      const [e, s] = t.split("/");
      o(this, Y).fill.color = e, o(this, Y).fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(o(this, Y).fill), e.opacity(o(this, Y).fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      o(this, Y).stroke.color = s, o(this, Y).stroke.opacity = n === void 0 ? 1 : +n, o(this, Y).stroke.width = e ?? o(this, Y).stroke.width;
    }
    return typeof t == "number" && e === void 0 && (o(this, Y).stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(o(this, Y).stroke), s.opacity(o(this, Y).stroke.opacity);
    }), [o(this, rt).reference("marker-start"), o(this, rt).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s == null || s.children().forEach((n) => {
        n.attr({
          fill: o(this, Y).stroke.color,
          stroke: o(this, Y).stroke.color,
          "stroke-width": o(this, Y).stroke.width
        });
      });
    }), this;
  }
  dash(t) {
    return this.strokeable().forEach((e) => {
      e.stroke({ dasharray: t ?? (this.graphConfig.axis.x.x / 2).toString() });
    }), this;
  }
  dot() {
    return this.dash("3");
  }
  clear(t) {
    return t ? (o(this, mt).clear(), this) : (o(this, mt).children().forEach((e) => {
      e.attr("id") !== `${o(this, wt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || o(this, ee)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  addLabel(t, e, s) {
    return d(this, _t, new Xo(o(this, mt), o(this, wt), {
      text: t ?? o(this, wt),
      asHtml: e ?? !1,
      alignement: "br",
      offset: { x: 0, y: 0 },
      texConverter: s ?? ((n) => n)
    })), this.updateLabel(), o(this, _t);
  }
  get label() {
    return o(this, _t);
  }
  updateLabel() {
    return o(this, _t) ? (o(this, _t).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = o(this, _t)) == null ? void 0 : t.config.text) ?? o(this, wt);
  }
  move(t) {
    if (It(t)) {
      const e = X(t.x, this.graphConfig), s = X(t.y, this.graphConfig);
      o(this, rt).translate(e, -s);
    } else if (typeof t == "number") {
      const e = X(t, this.graphConfig);
      o(this, rt).translate(e, 0);
    }
    return this;
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.filter((a) => typeof a == "number")[0]) ?? 10, n = (e == null ? void 0 : e.filter((a) => typeof a == "string")[0]) ?? void 0, r = We(o(this, zt), s, n), h = o(this, rt);
    return t === "start" ? (h.marker("start", r.start), this) : t === "end" ? (h.marker("end", r.end), this) : (h.marker("start", r.start), h.marker("end", r.end), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
zt = new WeakMap(), wt = new WeakMap(), mt = new WeakMap(), rt = new WeakMap(), Y = new WeakMap(), ye = new WeakMap(), ee = new WeakMap(), _t = new WeakMap();
var y, xe, be, je, ji;
class ot extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, je);
    p(this, y);
    p(this, xe);
    p(this, be);
    return d(this, y, Object.assign({ shape: "line" }, n)), d(this, be, { x: 0, y: 0 }), d(this, xe, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = b(this, je, ji).call(this), this.computed(), this;
  }
  get angle() {
    return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
  }
  computed() {
    let e = { x: 0, y: 0 };
    if (o(this, y).through && o(this, y).through.A && o(this, y).through.B)
      this.start = o(this, y).through.A, this.end = o(this, y).through.B, e = this.direction;
    else if (o(this, y).director && o(this, y).director.A && o(this, y).director.d)
      this.start = o(this, y).director.A, this.end = {
        x: o(this, y).director.A.x + o(this, y).director.d.x,
        y: o(this, y).director.A.y + o(this, y).director.d.y
      }, e = o(this, y).director.d;
    else if (o(this, y).parallel && o(this, y).parallel.to && o(this, y).parallel.through)
      this.start = o(this, y).parallel.through, e = o(this, y).parallel.to.direction;
    else if (o(this, y).perpendicular && o(this, y).perpendicular.to && o(this, y).perpendicular.through)
      this.start = o(this, y).perpendicular.through, e = o(this, y).perpendicular.to.normal;
    else if (o(this, y).mediator && o(this, y).mediator.A && o(this, y).mediator.B)
      this.start = {
        x: (o(this, y).mediator.A.x + o(this, y).mediator.B.x) / 2,
        y: (o(this, y).mediator.A.y + o(this, y).mediator.B.y) / 2
      }, e = {
        x: o(this, y).mediator.B.y - o(this, y).mediator.A.y,
        y: -(o(this, y).mediator.B.x - o(this, y).mediator.A.x)
      };
    else if (o(this, y).bisector && ("d1" in o(this, y).bisector && "d2" in o(this, y).bisector, "A" in o(this, y).bisector && "B" in o(this, y).bisector && "C" in o(this, y).bisector)) {
      const { A: n, B: r, C: h } = o(this, y).bisector, a = new j(n, r), c = a.norm, u = new j(n, h), l = u.norm;
      this.start = n, e = {
        x: a.x / c + u.x / l,
        y: a.y / c + u.y / l
      };
    }
    if (o(this, y).shape === void 0 || o(this, y).shape === "line" || o(this, y).shape === "ray") {
      const n = Jt(this.start, e, this.graphConfig.width, this.graphConfig.height, 0, o(this, y).shape === "ray");
      n !== null && (this.start = n[0], this.end = n[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  get config() {
    return o(this, y);
  }
  set config(e) {
    d(this, y, e), b(this, je, ji).call(this);
  }
  get direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y
    };
  }
  get end() {
    return o(this, xe);
  }
  set end(e) {
    d(this, xe, e);
  }
  follow(e, s) {
    return this.math.projection({ x: e, y: s });
  }
  get math() {
    return new fs(this.start, this.end);
  }
  move(e) {
    if (typeof e == "number") {
      const s = new j(this.normal).setLength(e);
      return this.move(s);
    }
    return super.move(e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    if (o(this, y).shape === "segment") {
      const e = (this.start.x + this.end.x) / 2, s = (this.start.y + this.end.y) / 2;
      let n = -this.angle;
      n > 90 && (n = n - 180), n < -90 && (n = n + 180), this.label.move(e, s), this.label.rotate(n), this.label.position();
    }
    return this;
  }
  get normal() {
    const e = this.direction;
    return {
      x: e.y,
      y: -e.x
    };
  }
  get start() {
    return o(this, be);
  }
  set start(e) {
    d(this, be, e);
  }
}
y = new WeakMap(), xe = new WeakMap(), be = new WeakMap(), je = new WeakSet(), ji = function() {
  if (this.element.clear(), this.shape = this.element.line(this.start.x, this.start.y, this.end.x, this.end.y), o(this, y).shape === "vector") {
    const e = We(this.rootSVG, 10).end;
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var $, P, St, Qt;
class I extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, St);
    p(this, $);
    p(this, P);
    return d(this, $, { x: NaN, y: NaN }), d(this, P, Object.assign({
      size: 2,
      shape: "circle"
    }, n)), this.computed(), this.shape = b(this, St, Qt).call(this), this;
  }
  get config() {
    return o(this, P);
  }
  set config(e) {
    d(this, P, e), b(this, St, Qt).call(this);
  }
  get size() {
    return o(this, P).size;
  }
  set size(e) {
    o(this, P).size = e, b(this, St, Qt).call(this);
  }
  get pixels() {
    return o(this, $);
  }
  set pixels(e) {
    d(this, $, e), this.shape.center(o(this, $).x, o(this, $).y);
  }
  get coordinates() {
    return $i(o(this, $), this.graphConfig);
  }
  get x() {
    return o(this, $).x;
  }
  set x(e) {
    o(this, $).x = e, this.shape.center(e, o(this, $).y);
  }
  get y() {
    return o(this, $).y;
  }
  set y(e) {
    o(this, $).y = e, this.shape.center(o(this, $).x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, b(this, St, Qt).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, b(this, St, Qt).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, b(this, St, Qt).call(this), this;
  }
  computed() {
    if (o(this, P).coordinates)
      return this.pixels = X(o(this, P).coordinates, this.graphConfig), this;
    if (o(this, P).middle) {
      const e = o(this, P).middle.A, s = o(this, P).middle.B;
      return o(this, $).x = (e.x + s.x) / 2, o(this, $).y = (e.y + s.y) / 2, this;
    }
    if (o(this, P).projection) {
      const e = o(this, P).projection.point;
      if (o(this, P).projection.axis === "Ox")
        return this.x = e.x, this.y = this.graphConfig.origin.y, this;
      if (o(this, P).projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = e.y, this;
      if (o(this, P).projection.axis instanceof ot) {
        const s = o(this, P).projection.axis, n = s.start.x, r = s.start.y, h = e.x - n, a = e.y - r, c = s.direction, u = h * c.x + a * c.y, l = c.x * c.x + c.y * c.y;
        this.x = n + u * c.x / l, this.y = r + u * c.y / l;
      }
    }
    if (o(this, P).intersection) {
      const e = o(this, P).intersection.A, s = o(this, P).intersection.B, n = e.math.intersection(s.math);
      if (n === null)
        return this;
      this.pixels = n;
    }
    if (o(this, P).symmetry) {
      const e = o(this, P).symmetry.A, s = o(this, P).symmetry.B;
      if (s instanceof ot) {
        const r = new j(s.direction).normal, a = new j(e, s.start).projection(r);
        this.x = e.x + 2 * a.x, this.y = e.y + 2 * a.y;
      } else if (s === "Ox")
        this.x = e.x, this.y = 2 * this.graphConfig.origin.y - e.y;
      else if (s === "Oy")
        this.x = 2 * this.graphConfig.origin.x - e.x, this.y = e.y;
      else {
        const n = s.x, r = s.y, h = e.x - n, a = e.y - r;
        this.x = n - h, this.y = r - a;
      }
    }
    if (o(this, P).direction) {
      const { point: e, direction: s, distance: n } = o(this, P).direction;
      if (s === "Ox")
        return this.x = e.x + X(n, this.graphConfig), this.y = e.y, this;
      if (s === "Oy")
        return this.x = e.x, this.y = e.y - X(n, this.graphConfig), this;
      if (s instanceof ot) {
        const r = new j(o(this, P).direction.perpendicular ? s.normal : s.direction).unit, h = X(n, this.graphConfig);
        return this.x = e.x + h * r.x, this.y = e.y + h * r.y, this;
      }
      if (s.A && s.B) {
        const r = new j(s.A, s.B);
        return this.x = e.x + n * r.x, this.y = e.y + n * r.y, this;
      }
    }
    return this;
  }
  moveLabel() {
    return this.label && this.label.move(this.x, this.y), this;
  }
  computeLabel() {
    var e, s;
    if ((e = this.label) != null && e.config.text.includes("@")) {
      const n = $i(o(this, $), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
}
$ = new WeakMap(), P = new WeakMap(), St = new WeakSet(), Qt = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(o(this, $).x, o(this, $).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(o(this, $).x, o(this, $).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(`M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`).center(o(this, $).x, o(this, $).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var ut, $t, ri, ln;
class ni extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, ri);
    p(this, ut);
    p(this, $t);
    return d(this, ut, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = b(this, ri, ln).call(this), d(this, $t, new si(o(this, ut).expression)), this.computed(), this;
  }
  get config() {
    return o(this, ut);
  }
  set config(e) {
    d(this, ut, e), d(this, $t, new si(o(this, ut).expression)), this.computed();
  }
  computed() {
    const e = o(this, ut).expression;
    if (!e || e === "")
      return this;
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = o(this, ut).domain ?? { min: s, max: n }, h = o(this, ut).image ?? { min: -1 / 0, max: 1 / 0 }, a = o(this, ut).samples ?? this.graphConfig.axis.x.x, c = o(this, $t), u = [];
    for (let _ = r.min; _ < r.max; _ += 1 / a) {
      const N = c.evaluate({ x: _ });
      if (isNaN(N) || N === 1 / 0 || N === -1 / 0 || N < h.min || N > h.max) {
        const L = X({ x: _, y: 0 }, this.graphConfig);
        u.push({ x: L.x, y: NaN });
      } else
        u.push(X({ x: _, y: N }, this.graphConfig));
    }
    let l = u[0];
    const f = u.map(({ x: _, y: N }, L) => {
      let E = L === 0 ? "M" : "L";
      return isNaN(N) ? (E = "M", N = -123456789) : l.y === -123456789 && (E = "M"), l = { x: _, y: N }, `${E} ${_} ${N}`;
    }).join(" ");
    return this.shape.plot(f), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: o(this, $t).evaluate({ x: e }) } : X({ x: e, y: o(this, $t).evaluate({ x: e }) }, this.graphConfig);
  }
  follow(e, s) {
    const n = $i({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
ut = new WeakMap(), $t = new WeakMap(), ri = new WeakSet(), ln = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var kt, Ue, Ui;
class Ko extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ue);
    p(this, kt);
    d(this, kt, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), b(this, Ue, Ui).call(this), this.computed();
  }
  get config() {
    return o(this, kt);
  }
  set config(e) {
    d(this, kt, e), b(this, Ue, Ui).call(this);
  }
  get center() {
    return o(this, kt).center;
  }
  get radius() {
    return typeof o(this, kt).radius == "number" ? X(o(this, kt).radius, this.graphConfig) : ls(this.center, o(this, kt).radius);
  }
  computed() {
    const e = this.shape;
    return e.radius(this.radius), e.center(this.center.x, this.center.y), this;
  }
  moveLabel() {
    return this.label && this.label.move(this.center.x + this.radius / 2, this.center.y - this.radius / 2), this;
  }
  follow(e, s) {
    const n = this.radius, r = e - this.center.x, h = s - this.center.y, a = Math.sqrt(r ** 2 + h ** 2);
    return e = r / a * n + this.center.x, s = h / a * n + this.center.y, { x: e, y: s };
  }
}
kt = new WeakMap(), Ue = new WeakSet(), Ui = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var S, Xt, Bi, Vi;
class Zo extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, Xt);
    p(this, S);
    d(this, S, Object.assign({
      shape: "polygon"
    }, n)), b(this, Xt, Vi).call(this), this.computed();
  }
  get config() {
    return o(this, S);
  }
  set config(e) {
    d(this, S, e), b(this, Xt, Vi).call(this);
  }
  get vertices() {
    return o(this, S).vertices;
  }
  get radius() {
    return o(this, S).regular ? typeof o(this, S).regular.radius == "number" ? X(o(this, S).regular.radius, this.graphConfig) : o(this, S).vertices && It(o(this, S).vertices[0]) && It(o(this, S).regular.radius) ? ls(o(this, S).vertices[0], o(this, S).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (o(this, S).vertices && o(this, S).vertices.length > 2)
      e.plot(b(this, Xt, Bi).call(this));
    else if (o(this, S).regular) {
      const s = [], n = this.radius, r = new j(o(this, S).regular.center, It(o(this, S).regular.radius) ? o(this, S).regular.radius : { x: o(this, S).regular.center.x, y: o(this, S).regular.center.y - n });
      for (let h = 0; h < o(this, S).regular.sides; h++)
        s.push([
          o(this, S).regular.center.x + r.x,
          o(this, S).regular.center.y + r.y
        ]), r.rotate(360 / o(this, S).regular.sides);
      e.plot(s);
    }
    return this;
  }
  update() {
    return this.computed(), this;
  }
  moveLabel() {
    return this;
  }
}
S = new WeakMap(), Xt = new WeakSet(), Bi = function() {
  var s;
  const e = [];
  return (s = o(this, S).vertices) == null || s.forEach((n) => {
    It(n) && e.push([n.x, n.y]);
  }), e;
}, Vi = function() {
  var s;
  this.element.clear();
  const e = b(this, Xt, Bi).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), o(this, S).mark) {
    const n = ((s = o(this, S).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce((h, a) => (h.x += a[0], h.y += a[1], h), { x: 0, y: 0 });
    r.x /= e.length, r.y /= e.length, e.forEach((h) => {
      const a = new j(r, { x: h[0], y: h[1] });
      n && a.setLength(n * 20), this.element.line(r.x, r.y, r.x + a.x, r.y + a.y).stroke({ color: "gray", width: 0.5 });
    });
  }
  return this.shape;
};
var V, ue, fn, qi;
class Qo extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, ue);
    p(this, V);
    return this.static = !0, d(this, V, Object.assign({
      ...this.graphConfig,
      subdivisions: 0
    }, n)), this.shape = b(this, ue, fn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, V);
  }
  set config(e) {
    d(this, V, e), this.computed();
  }
  computed() {
    const s = [
      ...b(this, ue, qi).call(this, o(this, V).axis.x, o(this, V).axis.y),
      ...b(this, ue, qi).call(this, o(this, V).axis.y, o(this, V).axis.x)
    ].reduce((r, h) => {
      const [a, c] = h;
      return r + `M${a.x},${a.y} L${c.x},${c.y}`;
    }, "");
    return this.shape.plot(s), this;
  }
  moveLabel() {
    return this;
  }
}
V = new WeakMap(), ue = new WeakSet(), fn = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, qi = function(e, s) {
  let n = +o(this, V).origin.x, r = +o(this, V).origin.y;
  const h = [];
  let a = Jt({ x: n, y: r }, e, o(this, V).width, o(this, V).height);
  for (; a; )
    if (h.push(a), n += s.x, r -= s.y, a = Jt({ x: n, y: r }, e, o(this, V).width, o(this, V).height), h.length > 1e3)
      throw new Error("Too many lines");
  for (n = o(this, V).origin.x - s.x, r = o(this, V).origin.y + s.y, a = Jt({ x: n, y: r }, e, o(this, V).width, o(this, V).height); a; )
    if (h.push(a), n -= s.x, r += s.y, a = Jt({ x: n, y: r }, e, o(this, V).width, o(this, V).height), h.length > 1e3)
      throw new Error("Too many lines");
  return h;
};
var Z, oi, hi, dn;
class Jo extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, hi);
    p(this, Z);
    p(this, oi);
    d(this, Z, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), d(this, oi, We(this.rootSVG, 8)), this.config = n;
  }
  get config() {
    return o(this, Z);
  }
  set config(e) {
    d(this, Z, e), b(this, hi, dn).call(this), this.computed();
  }
  get center() {
    return o(this, Z).center;
  }
  get start() {
    return o(this, Z).start;
  }
  get end() {
    return o(this, Z).end;
  }
  get radius() {
    return typeof o(this, Z).radius == "number" ? X(o(this, Z).radius, this.graphConfig) : ls(this.center, o(this, Z).radius ?? o(this, Z).start);
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new j(this.center, this.start).unit, r = new j(this.center, this.end).unit, h = n.add(r).unit, a = this.center.x + s * h.x * (e + 20), c = this.center.y + s * h.y * (e + 20);
    return s * h.x > 0 && s * h.y > 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y > 0 ? this.label.config.alignement = "ml" : s * h.x > 0 && s * h.y < 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, c), this;
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return un((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  getAngles() {
    return {
      start: +Cs(this.center, this.start).toFixed(10),
      end: +Cs(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = o(this, Z).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = Os(this.center.x, this.center.y, n, e), h = Os(this.center.x, this.center.y, n, s);
    return o(this, Z).morphToSquare && this.isSquare ? this._describeSquare(this.center, r, h) : this._describeArc(this.center, r, h, n, s - e);
  }
  _describeSquare(e, s, n) {
    return [
      "M",
      s.x,
      s.y,
      "l",
      n.x - e.x,
      n.y - e.y,
      "L",
      n.x,
      n.y
    ].join(" ");
  }
  _describeArc(e, s, n, r, h) {
    const a = (h + 360) % 360 <= 180 ? 0 : 1;
    let u = [
      "M",
      s.x,
      s.y,
      "A",
      r,
      r,
      0,
      a,
      0,
      n.x,
      n.y
    ];
    return o(this, Z).sector && (u = u.concat(["L", e.x, e.y, "L", s.x, s.y])), u.join(" ");
  }
}
Z = new WeakMap(), oi = new WeakMap(), hi = new WeakSet(), dn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var gt, jt, Mt, pn, mn, Gi;
class th extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, Mt);
    p(this, gt);
    p(this, jt);
    return this.static = !0, Object.values(Oe).includes(n) ? d(this, gt, b(this, Mt, pn).call(this, n)) : d(this, gt, n), d(this, jt, b(this, Mt, mn).call(this)), this.computed(), this;
  }
  get config() {
    return o(this, gt);
  }
  set config(e) {
    d(this, gt, e), this.computed();
  }
  get xAxis() {
    return o(this, jt).x;
  }
  get yAxis() {
    return o(this, jt).y;
  }
  computed() {
    return b(this, Mt, Gi).call(this, o(this, jt).x, o(this, gt).x.direction, o(this, gt).x), b(this, Mt, Gi).call(this, o(this, jt).y, o(this, gt).y.direction, o(this, gt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
gt = new WeakMap(), jt = new WeakMap(), Mt = new WeakSet(), pn = function(e) {
  return Oe.POLAR, {
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
}, mn = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, Gi = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", h = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, u = We(this.rootSVG, 10).end.fill(r), l = Jt(this.graphConfig.origin, s, this.graphConfig.width, this.graphConfig.height, h, a, c);
  return l !== null && e.plot(l[0].x, l[0].y, l[1].x, l[1].y), e.stroke({ color: r, width: 1 }).marker("end", u), this.shape.add(e), e;
};
var vt, we, ai, gn;
class eh extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, ai);
    p(this, vt);
    p(this, we);
    return d(this, vt, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), d(this, we, {
      x: new si(o(this, vt).expressions.x),
      y: new si(o(this, vt).expressions.y)
    }), this.shape = b(this, ai, gn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, vt);
  }
  set config(e) {
    d(this, vt, e), this.computed();
  }
  computed() {
    const e = o(this, vt).samples ?? this.graphConfig.axis.x.x, s = o(this, vt).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
    for (let a = s.min; a < s.max; a += 1 / e) {
      const { x: c, y: u } = this.evaluate(a);
      n.push({ x: c, y: u });
    }
    const r = n.map(({ x: a, y: c }, u) => `${u === 0 ? "M" : "L"} ${a} ${c}`).join(" ");
    return this.shape.plot(r), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e) {
    return X({
      x: o(this, we).x.evaluate({ t: e }),
      y: o(this, we).y.evaluate({ t: e })
    }, this.graphConfig);
  }
}
vt = new WeakMap(), we = new WeakMap(), ai = new WeakSet(), gn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Nt, Ot, ie, Ut, _e, ci, yn;
class ih extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, ci);
    p(this, Nt);
    p(this, Ot);
    p(this, ie);
    p(this, Ut);
    p(this, _e);
    return d(this, Nt, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", d(this, Ot, o(this, Nt).follow.follow(0, 0)), d(this, ie, { x: 0, y: 0 }), d(this, _e, this.element.line()), d(this, Ut, this.element.circle(o(this, Nt).size).center(o(this, Ot).x, o(this, Ot).y)), this.shape = b(this, ci, yn).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let h = this.rootSVG.node.createSVGPoint();
      h.x = r.clientX, h.y = r.clientY, h = h.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const a = o(this, Nt).follow.follow(h.x, h.y);
      isNaN(a.y) ? o(this, Ut).hide() : (o(this, Ut).show(), o(this, Ut).center(a.x, a.y), d(this, Ot, a), d(this, ie, o(this, Nt).follow.follow(h.x + 0.01, h.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return o(this, Nt);
  }
  set config(e) {
    d(this, Nt, e), this.computed();
  }
  computed() {
    const e = Jt(o(this, Ot), {
      x: o(this, ie).x - o(this, Ot).x,
      y: o(this, ie).y - o(this, Ot).y
    }, this.graphConfig.width, this.graphConfig.height);
    return e === null ? this : (o(this, _e).plot(e[0].x, e[0].y, e[1].x, e[1].y), this);
  }
  moveLabel() {
    return this;
  }
  strokeable() {
    return [o(this, _e)];
  }
  fillable() {
    return [o(this, Ut)];
  }
}
Nt = new WeakMap(), Ot = new WeakMap(), ie = new WeakMap(), Ut = new WeakMap(), _e = new WeakMap(), ci = new WeakSet(), yn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var yt, ui, xn;
class sh extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, ui);
    p(this, yt);
    return console.log("FILL BETWR"), d(this, yt, Object.assign({
      samples: 100
    }, n)), this.shape = b(this, ui, xn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, yt);
  }
  set config(e) {
    d(this, yt, e), this.computed();
  }
  get domain() {
    return o(this, yt).domain ? X(o(this, yt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return o(this, yt).image ? X(o(this, yt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = o(this, yt).expressions, n = this.domain;
    this.image;
    function r(u, l) {
      const [f, g, _] = u;
      return `${l === 0 ? "M" : f} ${g ?? 0} ${_ ?? 0}`;
    }
    const h = e.shape.array().filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r), a = [...s.shape.array()].filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r).reverse();
    return this.shape.plot(`${h.join(" ")} ${a.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
yt = new WeakMap(), ui = new WeakSet(), xn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var q, li, bn;
class nh extends ct {
  constructor(e, s, n) {
    super(e, s);
    p(this, li);
    p(this, q);
    d(this, q, Object.assign({}, n)), this.shape = b(this, li, bn).call(this), this.computed();
  }
  get config() {
    return o(this, q);
  }
  set config(e) {
    d(this, q, e), this.computed();
  }
  get rectangles() {
    return o(this, q).rectangles;
  }
  set rectangles(e) {
    o(this, q).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return o(this, q).position < 0 && (o(this, q).position = 0), o(this, q).position > 1 && (o(this, q).position = 1), o(this, q).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), o(this, q).position = e;
  }
  computed() {
    this.shape.clear();
    const e = X(o(this, q).domain, this.graphConfig), n = (e.max - e.min) / o(this, q).rectangles, r = (o(this, q).domain.max - o(this, q).domain.min) / o(this, q).rectangles, h = this.graphConfig.origin.y;
    for (let a = 0; a < o(this, q).rectangles; a += 1) {
      const c = e.min + a * n, u = o(this, q).domain.min + (a + this.position) * r, l = o(this, q).follow.evaluate(u).y;
      this.shape.add(this.element.rect(n, Math.abs(h - l)).move(c, l));
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
q = new WeakMap(), li = new WeakSet(), bn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var G, H, Q, A, Ct, ke, Be, Hi;
class rh {
  constructor(t, e) {
    p(this, Be);
    p(this, G);
    p(this, H);
    p(this, Q);
    p(this, A);
    p(this, Ct);
    p(this, ke);
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return d(this, A, Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Oe.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e)), d(this, ke, (e == null ? void 0 : e.tex) ?? ((h) => h)), d(this, Ct, Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display)), d(this, G, cn().addTo(s).viewbox(0, 0, o(this, A).width, o(this, A).height)), o(this, G).data("config", {
      width: o(this, A).width,
      height: o(this, A).height,
      origin: o(this, A).origin,
      axis: o(this, A).axis
    }), d(this, H, {}), Object.values(Di).forEach((h) => {
      o(this, H)[h] = o(this, G).group().attr("id", `LAYER_${h}`);
    }), d(this, Q, {}), b(this, Be, Hi).call(this), this;
  }
  get rootSVG() {
    return o(this, G);
  }
  get figures() {
    return o(this, Q);
  }
  get config() {
    return o(this, A);
  }
  set config(t) {
    d(this, A, t);
  }
  get display() {
    return o(this, Ct);
  }
  set display(t) {
    d(this, Ct, t);
  }
  get toTex() {
    return o(this, ke);
  }
  get layers() {
    return o(this, H);
  }
  grid(t, e) {
    const s = new Qo(o(this, G), t, {
      axis: e,
      origin: o(this, A).origin,
      width: o(this, A).width,
      height: o(this, A).height,
      subdivisions: 0
    });
    return o(this, H).grids.add(s.element), s;
  }
  subgrid(t, e) {
    const s = {
      x: { x: o(this, A).axis.x.x / e, y: o(this, A).axis.x.y / e },
      y: { x: o(this, A).axis.y.x / e, y: o(this, A).axis.y.y / e }
    };
    return this.grid(t, s);
  }
  coordinate_system(t) {
    const e = new th(o(this, G), "COORDINATE_SYSTEM", t);
    return o(this, H).axis.add(e.element), e;
  }
  marker(t) {
    return We(o(this, G), t);
  }
  toPixels(t, e) {
    return X(t, this.config, e);
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        It(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new I(o(this, G), e, n);
        return o(this, H).points.add(r.element), o(this, Q)[e] = r, s && r.addLabel(e, s.html, o(this, ke)), r;
      },
      line: (t, e) => {
        const s = new ot(o(this, G), e, t);
        return o(this, H).main.add(s.element), o(this, Q)[e] = s, s;
      },
      plot: (t, e) => {
        const s = new ni(o(this, G), e, t);
        return o(this, H).plots.add(s.element), o(this, Q)[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new eh(o(this, G), e, t);
        return o(this, H).plots.add(s.element), o(this, Q)[e] = s, s;
      },
      circle: (t, e) => {
        const s = new Ko(o(this, G), e, t);
        return o(this, H).main.add(s.element), o(this, Q)[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new Zo(o(this, G), e, t);
        return o(this, H).main.add(s.element), o(this, Q)[e] = s, s;
      },
      arc: (t, e) => {
        const s = new Jo(o(this, G), e, t);
        return o(this, H).main.add(s.element), o(this, Q)[e] = s, s;
      },
      follow: (t, e) => {
        const s = new ih(o(this, G), e, t);
        return o(this, H).plots_FG.add(s.element), o(this, Q)[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new sh(o(this, G), e, t);
        return o(this, H).plots_BG.add(s.element), o(this, Q)[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new nh(o(this, G), e, t);
        return o(this, H).plots_BG.add(s.element), o(this, Q)[e] = s, s;
      }
    };
  }
  draggable(t, e, s) {
    const n = (r) => {
      var l;
      const h = t, { box: a } = r.detail;
      let { x: c, y: u } = a;
      if (r.preventDefault(), !(c < 0 || c > o(this, A).width - a.width / 2) && !(u < 0 || u > o(this, A).height - a.height / 2)) {
        if ((l = s == null ? void 0 : s.follow) != null && l.length) {
          let f = { x: c, y: u };
          s.follow.forEach((g) => {
            g instanceof ct ? f = g.follow(c, u) : typeof g == "string" ? f = this.follow(g, h)(c, u) : f = g(c, u), c = f.x, u = f.y;
          });
        }
        h.pixels.x === c && h.pixels.y === u || (h.pixels = { x: c, y: u }, e instanceof I && (e.pixels = { x: c, y: u }), s != null && s.callback && s.callback(t), this.update([t.name, e.name]));
      }
    };
    return o(this, H).interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", n), t;
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), d(this, Q, {});
  }
  updateLayout() {
    o(this, G).viewbox(0, 0, o(this, A).width, o(this, A).height), o(this, G).data("config", {
      width: o(this, A).width,
      height: o(this, A).height,
      origin: o(this, A).origin,
      axis: o(this, A).axis
    }), b(this, Be, Hi).call(this), this.update([], !0);
  }
  update(t, e) {
    t === void 0 && (t = []), Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  follow(t, e) {
    return t === "Ox" ? (s, n) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = o(this, A).axis.x.x, h = o(this, A).axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / h) * h, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
}
G = new WeakMap(), H = new WeakMap(), Q = new WeakMap(), A = new WeakMap(), Ct = new WeakMap(), ke = new WeakMap(), Be = new WeakSet(), Hi = function() {
  o(this, H).grids.clear(), o(this, H).axis.clear(), o(this, Ct).subgrid && this.subgrid("SUBGRID", o(this, Ct).subgrid).stroke("purple/0.5", 0.1), o(this, Ct).grid && this.grid("MAINGRID", o(this, A).axis).stroke("lightgray", 1), o(this, Ct).axis && this.coordinate_system(o(this, A).system);
};
var T;
(function(i) {
  i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann";
})(T || (T = {}));
function tt(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const oh = [
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
];
function hh(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof I && (r instanceof I || typeof r == "number"))
      return { center: n, radius: r };
  }
  return null;
}
function ah(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.ARC.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof I && r instanceof I && h instanceof I)
      return { start: n, center: r, end: h, radius: a };
  }
  return null;
}
function Dt(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.LINE.toString() || i.key === T.SEGMENT.toString() || i.key === T.VECTOR.toString() || i.key === T.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof I && r instanceof I) {
      let h = "line";
      switch (i.key) {
        case T.SEGMENT.toString():
          h = "segment";
          break;
        case T.VECTOR.toString():
          h = "vector";
          break;
        case T.RAY.toString():
          h = "ray";
          break;
      }
      return {
        through: { A: n, B: r },
        shape: h
      };
    }
  }
  if (i.key === T.LINE.toString() && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const g = tt([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: 0, y: g }, e), d: { x: 1, y: 0 } },
        shape: "line"
      };
    }
    if (n.startsWith("x=")) {
      const g = tt([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: g, y: 0 }, e), d: { x: 0, y: 1 } },
        shape: "line"
      };
    }
    const [r, h] = n.split("="), a = Ts(r), c = Ts(h), u = {
      a: a.a - c.a,
      b: a.b - c.b,
      c: a.c - c.c
    }, l = X({ x: 0, y: -u.c / u.b }, e), f = {
      x: -u.b,
      y: u.a
    };
    return {
      director: { A: l, d: f },
      shape: "line"
    };
  }
  if (i.key === T.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof I && r instanceof I)
      return { mediator: { A: n, B: r } };
  }
  if (i.key === T.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof I)
      return { perpendicular: { to: n, through: r } };
  }
  if (i.key === T.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof I)
      return { parallel: { to: n, through: r } };
  }
  if (i.key === T.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof ot)
      return { bisector: { d1: n, d2: r } };
  }
  if (i.key === T.BISECTOR.toString() && s.length === 3) {
    const [n, r, h] = s;
    if (r instanceof I && n instanceof I && h instanceof I)
      return { bisector: { A: r, B: n, C: h } };
  }
  return null;
}
function Ts(i) {
  const t = i.split(/([+-][0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = t.filter((r) => r.includes("x")).map((r) => r === "x" ? "1" : r.replace("x", ""))[0] ?? "0", s = t.filter((r) => r.includes("y")).map((r) => r === "y" ? "1" : r.replace("y", ""))[0] ?? "0", n = t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? "0";
  return {
    a: tt([e], {})[0],
    b: tt([s], {})[0],
    c: tt([n], {})[0]
  };
}
function ch(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.PLOT.toString()) {
    const [n, ...r] = s, h = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((u) => qt(u));
    a.length > 0 && (h.domain = a[0]), a.length > 1 && (h.image = a[1]);
    const c = r.filter((u) => typeof u == "number");
    return c.length > 0 && (h.samples = c[0] > 0 ? c[0] : 10), h;
  }
  return null;
}
function uh(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return { expressions: { x: n, y: r } };
  }
  return null;
}
function lh(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof ni)
      return {
        follow: n,
        tangent: r === "show"
      };
  }
  return null;
}
function fh(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.FILL_BETWEEN.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof ni && r instanceof ni)
      return {
        expressions: [n, r],
        domain: qt(h) ? h : { min: NaN, max: NaN },
        image: qt(a) ? a : { min: NaN, max: NaN }
      };
  }
  return null;
}
function dh(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.RIEMANN.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    return {
      follow: n,
      domain: qt(r) ? r : { min: NaN, max: NaN },
      rectangles: typeof h == "number" ? h : 5,
      position: typeof a == "number" ? a : 0
    };
  }
  return null;
}
function Wt(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).filter((a) => a.includes("*") || a.includes("s") || a.includes("o"))[0] ?? "o";
  switch (r) {
    case "o":
      s = "circle", n = i.parameters[r].value === !0 ? 5 : i.parameters[r].value;
      break;
    case "s":
      s = "square", n = i.parameters[r].value === !0 ? 10 : i.parameters[r].value;
      break;
    case "*":
      s = "crosshair", n = i.parameters[r].value === !0 ? 10 : i.parameters[r].value;
      break;
  }
  const h = ph(i, t);
  return h ? Object.assign(h, { shape: s, size: n }) : null;
}
function ph(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.POINT.toString()) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === T.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof I && r instanceof I)
      return { middle: { A: n, B: r } };
  }
  if (i.key === T.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof I && (r instanceof ot || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === T.INTERSECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if ((n instanceof ot || n === "Ox" || n === "Oy") && (r instanceof ot || r === "Ox" || r === "Oy"))
      return { intersection: { A: n, B: r } };
  }
  if (i.key === T.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof I && (r instanceof I || r instanceof ot || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === T.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof I && (r instanceof ot || r === "Ox" || r === "Oy") && typeof h == "number")
      return {
        direction: {
          direction: r,
          distance: h,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === T.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof I && r instanceof I)
      return {
        direction: {
          point: a instanceof I ? a : n,
          direction: { A: n, B: r },
          distance: typeof h == "number" ? h : 1
        }
      };
  }
  return null;
}
function Is(i, t, e) {
  const s = tt(i.values, t);
  if (i.key === T.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof I))
      return { vertices: n };
  }
  if (i.key === T.REGULAR.toString() && s.length >= 3) {
    const [n, r, h] = s;
    if (n instanceof I && (typeof r == "number" || r instanceof I) && typeof h == "number")
      return {
        regular: {
          center: n,
          radius: r,
          sides: h
        }
      };
  }
  return null;
}
const As = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: Wt,
    create: "point"
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line>,<line>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: Wt,
    create: "point"
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Dt,
    create: "line"
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: Dt,
    create: "line"
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: Dt,
    create: "line"
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Dt,
    create: "line"
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: Dt,
    create: "line"
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: Dt,
    create: "line"
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: Dt,
    create: "line"
  },
  bis: {
    name: "bisector",
    description: "Create the bisector of an angle",
    code: "d=bis <point>,<point>,<point>",
    parameters: [],
    build: Dt,
    create: "line"
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: hh,
    create: "circle"
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: ah,
    create: "arc"
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: ch,
    create: "plot"
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: uh,
    create: "parametric"
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: Is,
    create: "polygon"
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: Is,
    create: "polygon"
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: lh,
    create: "follow"
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: fh,
    create: "fillbetween"
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: dh,
    create: "riemann"
  }
};
function Se(i) {
  if (i === "") return !0;
  if (!isNaN(Number(i))) return parseFloat(i);
  if (i.match(/^[-.\d]+\/[-.\d]+$/)) {
    const [t, e] = i.split("/").map(Number);
    return t / e;
  }
  if (i.match(/^[-.\d]+;[-.\d]+$/)) {
    const [t, e] = i.split(";").map(Number);
    return { x: t, y: e };
  }
  if (i.match(/^[-.\d]+:[-.\d]+(:[xy])?$/)) {
    const [t, e, s] = i.split(":"), n = Number(t), r = Number(e);
    return {
      min: Math.min(n, r),
      max: Math.max(n, r),
      axis: s ?? "x"
    };
  }
  if (i.match(/^[-.\d]+:[-.\d]+:[.\d]+$/)) {
    const [t, e, s] = i.split(":").map(Number), n = Number(t), r = Number(e), h = Number(s), c = (r - n) / 100;
    return {
      min: Math.min(t, e),
      max: Math.max(t, e),
      step: Math.max(h, c)
    };
  }
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(Se) : i;
}
function Ni(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((s) => s.replace("ESCAPESPLITTER", t));
}
function mh(i) {
  if (!i.includes("=")) return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var Bt, se, lt, ne, re, le, wn, Xi;
class gh {
  constructor(t) {
    p(this, le);
    p(this, Bt);
    p(this, se, "->");
    p(this, lt, ",");
    p(this, ne, "/");
    p(this, re, []);
    var e, s, n;
    t && (d(this, Bt, t.formatter ?? void 0), (e = t.splitter) != null && e.main && d(this, se, t.splitter.main), (s = t.splitter) != null && s.entry && d(this, lt, t.splitter.entry), (n = t.splitter) != null && n.parameter && d(this, ne, t.splitter.parameter), t.keys && d(this, re, t.keys));
  }
  get splitter() {
    return {
      main: o(this, se),
      entry: o(this, lt),
      parameter: o(this, ne)
    };
  }
  set splitter_main(t) {
    d(this, se, t);
  }
  set splitter_entry(t) {
    d(this, lt, t);
  }
  set splitter_parameter(t) {
    d(this, ne, t);
  }
  get formatter() {
    return o(this, Bt);
  }
  set formatter(t) {
    d(this, Bt, t);
  }
  get keys() {
    return o(this, re);
  }
  set keys(t) {
    d(this, re, t);
  }
  parse(t) {
    const [e, s] = t.split(o(this, se)), n = o(this, Bt) ? o(this, Bt).call(this, e) : e.trim(), { name: r, key: h, values: a } = b(this, le, wn).call(this, n), c = b(this, le, Xi).call(this, s);
    return { name: r, key: h, values: a, parameters: c };
  }
  parameters(t, e) {
    return b(this, le, Xi).call(this, t, e ?? o(this, re));
  }
}
Bt = new WeakMap(), se = new WeakMap(), lt = new WeakMap(), ne = new WeakMap(), re = new WeakMap(), le = new WeakSet(), wn = function(t) {
  const [e, ...s] = t.split(" "), [n, r] = e.split("="), h = Ni(
    s.join(" "),
    o(this, lt)
  ).map((a) => Se(a));
  return { name: n, key: r, values: h };
}, Xi = function(t, e) {
  if (t === void 0)
    return {};
  let s;
  e === void 0 || e.length === 0 ? s = Ni(t, o(this, lt)) : s = t.split(new RegExp(`(?=${o(this, lt)}${e.join(`|${o(this, lt)}`)})`)).map((r) => {
    let h = r.trim();
    return h.startsWith(",") && (h = h.slice(1).trim()), h.endsWith(",") && (h = h.slice(0, -1)), Ni(h, o(this, lt)).join(o(this, lt));
  });
  const n = {};
  return s.forEach((r) => {
    const { key: h, value: a } = mh(r);
    if (a.match(/^[-.\d]+\/[-.\d]+$/)) {
      n[h] = {
        value: Se(a),
        options: []
      };
      return;
    }
    const [c, ...u] = a.split(o(this, ne));
    n[h] = {
      value: Se(c),
      options: u.map((l) => Se(l))
    };
  }), n;
};
const Es = [
  "ppu",
  "x",
  "y",
  "grid",
  "axis",
  "label",
  "tex",
  "points",
  "no-points",
  "subgrid"
];
var oe, Vt, ve, F, _n, kn, Yi, vn, Nn, On, Cn, Tn, In, An, En;
class kh extends rh {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    p(this, F);
    p(this, oe);
    p(this, Vt);
    p(this, ve);
    return d(this, ve, new gh({
      formatter: (n) => b(this, F, Cn).call(this, n),
      keys: Es,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    })), d(this, Vt, {}), s != null && s.parameters && this.refreshLayout(s.parameters), d(this, oe, []), s != null && s.code && b(this, F, Yi).call(this, s.code), this;
  }
  static documentation() {
    return As;
  }
  get code() {
    return o(this, oe);
  }
  refresh(e) {
    this.clear(), b(this, F, Yi).call(this, e);
  }
  refreshLayout(e) {
    const s = b(this, F, On).call(this, e);
    this.config = s.config, this.display = s.display, d(this, Vt, s.settings), this.updateLayout();
  }
}
oe = new WeakMap(), Vt = new WeakMap(), ve = new WeakMap(), F = new WeakSet(), _n = function(e) {
  const s = [], n = e.split(`
`).map((h) => h.trim()).filter((h) => h.trim() !== "" && !h.startsWith("$")), r = {};
  for (const h of n) {
    if (h.startsWith("@")) {
      const { key: c, value: u } = b(this, F, Nn).call(this, h);
      r[c] = { value: u, options: [] };
      continue;
    }
    const a = o(this, ve).parse(h);
    a.parameters = Object.assign(a.parameters, r), s.push(a);
  }
  return s;
}, kn = function(e) {
  let s = e, n = 1;
  for (; this.figures[s]; )
    s = `${e}_${n}`, n++;
  return s;
}, Yi = function(e) {
  d(this, oe, b(this, F, _n).call(this, e));
  const s = As, n = this.create;
  o(this, oe).forEach((r) => {
    r.name = b(this, F, kn).call(this, r.name);
    let h;
    if (s[r.key]) {
      const { build: a, create: c, parameters: u } = s[r.key];
      if (u && u.length > 0 && Object.keys(r.parameters).length === 0 && Object.keys(r.parameters).filter((f) => u.includes(f)).forEach((f) => {
        r.parameters[f] = { value: !0, options: [] };
      }), Object.hasOwn(n, c))
        try {
          const l = a(r, this.figures, this.config);
          l && (h = this.create[c](l, r.name));
        } catch (l) {
          console.log(l);
        }
    }
    h && (o(this, Vt).label && h instanceof I && r.parameters.label === void 0 && r.parameters.tex === void 0 && (r.parameters.label = { value: !0, options: [] }), o(this, Vt).tex && h instanceof I && r.parameters.label === void 0 && r.parameters.tex === void 0 && (r.parameters.tex = { value: !0, options: [] }), h instanceof I && o(this, Vt).points === !1 && (r.parameters["!"] = { value: !0, options: [] }), b(this, F, vn).call(this, r.parameters, h));
  });
}, vn = function(e, s) {
  Object.keys(e).forEach((n) => {
    var r;
    switch (n) {
      case "w":
        s.stroke(e[n].value);
        break;
      case "ultrathin":
        s.stroke(0.5);
        break;
      case "thin":
        s.stroke(0.75);
        break;
      case "thick":
        s.stroke(2.5);
        break;
      case "ultrathick":
        s.stroke(4);
        break;
      case "color":
        s.stroke(e[n].value);
        break;
      case "fill":
        s.fill(e[n].value);
        break;
      case "dash":
        e[n].value === !0 ? s.dash() : s.dash(e[n].value);
        break;
      case "dot":
        s.dot();
        break;
      case "mark":
        s.mark(e[n].value, e[n].options);
        break;
      case "hide":
      case "!":
        s.hide();
        break;
      case "#":
      case "static":
        s.static = e[n].value;
        break;
      case "?":
        (r = s.label) == null || r.hide();
        break;
      case "move":
        s.move(e[n].value);
        break;
      case "label":
      case "tex":
        if (s.addLabel(e[n].value === !0 ? s.name : e[n].value, n === "tex", this.toTex), s.label) {
          const h = e[n].options[0] === !1 ? "br" : e[n].options[0], a = e[n].options[1] ?? { x: 0, y: 0 }, c = {
            x: a.x * this.config.axis.x.x,
            y: -a.y * this.config.axis.y.y
          };
          s.label.position(h, c);
        }
        break;
      case "drag":
        b(this, F, En).call(this, s, n, e);
        break;
      default:
        oh.includes(n) && s.stroke(n);
    }
  });
}, Nn = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, On = function(e) {
  const s = o(this, ve).parameters(e ?? "", Es), n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && qt(s.x.value) ? s.x.value : { min: -8, max: 8 }, h = s.y && qt(s.y.value) ? s.y.value : { min: -8, max: 8 }, a = Math.abs(r.max - r.min), c = Math.abs(h.max - h.min), u = a * n, l = c * n, f = {
    x: -r.min * n,
    y: h.max * n
  }, g = Oe.CARTESIAN_2D, _ = {
    x: { x: n, y: 0 },
    y: { x: 0, y: -n }
  }, N = !!s.grid, L = !!s.axis, E = s.subgrid ? parseFloat(s.subgrid.value) : 0, U = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: u,
      height: l,
      origin: f,
      system: g,
      axis: _
    },
    display: {
      grid: N,
      subgrid: E,
      axis: L
    },
    settings: U
  };
}, Cn = function(e) {
  return e.match(/^[A-Z][0-9]*\(.*\)$/) ? b(this, F, Tn).call(this, e) : e.match(/^[a-z][0-9]*\([x|t]\)/) ? b(this, F, An).call(this, e) : e.includes("=") && !e.includes(" ") ? b(this, F, In).call(this, e) : e;
}, Tn = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
  return `${s}=pt ${n[0]},${n[1]}`;
}, In = function(e) {
  const [s, ...n] = e.split("=");
  let r = n.join("="), h = r[0];
  h !== "v" && h !== "[" && (h = null);
  let a = r[r.length - 1];
  a !== "." && a !== "]" && a !== "[" && (a = null);
  let c = "line";
  h === "v" && a === null ? (r = r.slice(1), c = "vec") : h === null && a === "." || h === "[" && a === "]" ? (h === "[" && (r = r.slice(1)), r = r.slice(0, -1), c = "seg") : (h === "[" && a === "[" || h === null && a === "[" || h === "[" && a === null) && (h === "[" && (r = r.slice(1)), a === "[" && (r = r.slice(0, -1)), c = "ray");
  const u = r.split(/(?=[A-Z])/);
  return `${s}=${c} ${u[0]},${u[1]}`;
}, An = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], h = e.includes("(x)=") ? T.PLOT : T.PARAMETRIC;
  return `${r}=${h} ${n}`;
}, En = function(e, s, n) {
  if (e instanceof I) {
    const r = [], h = [], a = new I(this.rootSVG, e.name + "_drag", {
      coordinates: { x: 0, y: 0 }
    });
    a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[s].value, ...n[s].options].forEach((u) => {
      if (["grid", "Ox", "Oy"].includes(u) && r.push(this.follow(u, e)), qt(u)) {
        const l = u.axis ?? "x", f = this.toPixels(u, l);
        r.push((g, _) => ({
          x: l === "x" ? Math.max(f.min, Math.min(g, f.max)) : g,
          y: l === "y" ? Math.max(f.min, Math.min(_, f.max)) : _
        }));
      }
      if (Object.hasOwn(this.figures, u)) {
        const l = this.figures[u];
        h.push((f, g) => l.follow(f, g));
      }
    }), this.draggable(a, e, {
      follow: [
        ...r,
        ...h
      ]
    });
  }
};
export {
  kh as PiDraw,
  rh as PiGraph
};
