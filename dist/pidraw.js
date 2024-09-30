var An = Object.defineProperty;
var fs = (i) => {
  throw TypeError(i);
};
var Mn = (i, t, e) => t in i ? An(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var tt = (i, t, e) => Mn(i, typeof t != "symbol" ? t + "" : t, e), yi = (i, t, e) => t.has(i) || fs("Cannot " + e);
var o = (i, t, e) => (yi(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? fs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), f = (i, t, e, s) => (yi(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), x = (i, t, e) => (yi(i, t, "access private method"), e);
const Ti = {}, Ns = [];
function _(i, t) {
  if (Array.isArray(i)) {
    for (const e of i)
      _(e, t);
    return;
  }
  if (typeof i == "object") {
    for (const e in i)
      _(e, i[e]);
    return;
  }
  Ss(Object.getOwnPropertyNames(t)), Ti[i] = Object.assign(Ti[i] || {}, t);
}
function it(i) {
  return Ti[i] || {};
}
function In() {
  return [...new Set(Ns)];
}
function Ss(i) {
  Ns.push(...i);
}
function Yi(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function Ln(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function xi(i) {
  return i % 360 * Math.PI / 180;
}
function En(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function Os(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Ce(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function Ni(i, t) {
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
const Pn = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Si = (i) => Pn.has(i.nodeName), As = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, Wi = "http://www.w3.org/2000/svg", $n = "http://www.w3.org/1999/xhtml", bi = "http://www.w3.org/2000/xmlns/", qe = "http://www.w3.org/1999/xlink", C = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function zn() {
  return C.window;
}
class Ki {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const he = {}, Zi = "___SYMBOL___ROOT___";
function Me(i, t = Wi) {
  return C.document.createElementNS(t, i);
}
function Q(i, t = !1) {
  if (i instanceof Ki) return i;
  if (typeof i == "object")
    return wi(i);
  if (i == null)
    return new he[Zi]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return wi(C.document.querySelector(i));
  const e = t ? C.document.createElement("div") : Me("svg");
  return e.innerHTML = i, i = wi(e.firstChild), e.removeChild(e.firstChild), i;
}
function D(i, t) {
  return t && (t instanceof C.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Me(i);
}
function lt(i) {
  if (!i) return null;
  if (i.instance instanceof Ki) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new he.Fragment(i);
  let t = Os(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : he[t] || (t = "Dom"), new he[t](i);
}
let wi = lt;
function T(i, t = i.name, e = !1) {
  return he[t] = i, e && (he[Zi] = i), Ss(Object.getOwnPropertyNames(i.prototype)), i;
}
function Dn(i) {
  return he[i];
}
let jn = 1e3;
function Ms(i) {
  return "Svgjs" + Os(i) + jn++;
}
function Is(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    Is(i.children[t]);
  return i.id && (i.id = Ms(i.nodeName)), i;
}
function k(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function $(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function Rn() {
  return this.parent().children();
}
function Fn() {
  return this.parent().index(this);
}
function Bn() {
  return this.siblings()[this.position() + 1];
}
function qn() {
  return this.siblings()[this.position() - 1];
}
function Vn() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function Gn() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function Un() {
  return this.parent().add(this.remove()), this;
}
function Xn() {
  return this.parent().add(this.remove(), 0), this;
}
function Hn(i) {
  i = Q(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function Yn(i) {
  i = Q(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function Wn(i) {
  return i = Q(i), i.before(this), this;
}
function Kn(i) {
  return i = Q(i), i.after(this), this;
}
_("Dom", {
  siblings: Rn,
  position: Fn,
  next: Bn,
  prev: qn,
  forward: Vn,
  backward: Gn,
  front: Un,
  back: Xn,
  before: Hn,
  after: Yn,
  insertBefore: Wn,
  insertAfter: Kn
});
const Ls = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Zn = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, Qn = /rgb\((\d+),(\d+),(\d+)\)/, Jn = /(#[a-z_][a-z0-9\-_]*)/i, tr = /\)\s*,?\s*/, er = /\s/g, ds = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, ps = /^rgb\(/, ms = /^(\s+)?$/, gs = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ir = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, Lt = /[\s,]+/, Qi = /[MLHVCSQTAZ]/i;
function sr() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(Lt);
}
function nr(i) {
  return this.classes().indexOf(i) !== -1;
}
function rr(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function or(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function hr(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
_("Dom", {
  classes: sr,
  hasClass: nr,
  addClass: rr,
  removeClass: or,
  toggleClass: hr
});
function ar(i, t) {
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
          i[s] == null || ms.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || ms.test(t) ? "" : t
  ), this;
}
function cr() {
  return this.css("display", "");
}
function ur() {
  return this.css("display", "none");
}
function lr() {
  return this.css("display") !== "none";
}
_("Dom", {
  css: ar,
  show: cr,
  hide: ur,
  visible: lr
});
function fr(i, t, e) {
  if (i == null)
    return this.data(
      Yi(
        Ln(
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
_("Dom", { data: fr });
function dr(i, t) {
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
function pr() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function mr() {
  return this._memory = this._memory || {};
}
_("Dom", { remember: dr, forget: pr, memory: mr });
function gr(i) {
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
function yr(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function fe(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function xr(i, t) {
  const e = fe(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : fe(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : fe(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : fe(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : fe(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : fe(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function br(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function _i(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
class E {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof E || this.isRgb(t) || this.test(t));
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
      return new E(a, c, u, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * h * e / 0.5 + 0.01) + 150), c = n(50 * r(2 * h * e / 0.5 + 4.6) + 200), u = n(100 * r(2 * h * e / 0.5 + 2.3) + 150);
      return new E(a, c, u);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, c = 17 * s() + 9, u = 360 * s();
      return new E(a, c, u, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), c = 50 * s() + 86, u = 360 * s();
      return new E(a, c, u, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), c = 255 * s(), u = 255 * s();
      return new E(a, c, u);
    } else if (t === "lab") {
      const a = 100 * s(), c = 256 * s() - 128, u = 256 * s() - 128;
      return new E(a, c, u, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new E(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (ds.test(t) || ps.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((m) => m / 255), a = Math.min(1 - n, 1 - r, 1 - h);
    if (a === 1)
      return new E(0, 0, 0, 1, "cmyk");
    const c = (1 - n - a) / (1 - a), u = (1 - r - a) / (1 - a), l = (1 - h - a) / (1 - a);
    return new E(c, u, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((L) => L / 255), a = Math.max(n, r, h), c = Math.min(n, r, h), u = (a + c) / 2, l = a === c, d = a - c, m = l ? 0 : u > 0.5 ? d / (2 - a - c) : d / (a + c), w = l ? 0 : a === n ? ((r - h) / d + (r < h ? 6 : 0)) / 6 : a === r ? ((h - n) / d + 2) / 6 : a === h ? ((n - r) / d + 4) / 6 : 0;
    return new E(360 * w, 100 * m, 100 * u, "hsl");
  }
  init(t = 0, e = 0, s = 0, n = 0, r = "rgb") {
    if (t = t || 0, this.space)
      for (const d in this.space)
        delete this[this.space[d]];
    if (typeof t == "number")
      r = typeof n == "string" ? n : r, n = typeof n == "string" ? 0 : n, Object.assign(this, { _a: t, _b: e, _c: s, _d: n, space: r });
    else if (t instanceof Array)
      this.space = e || (typeof t[3] == "string" ? t[3] : t[4]) || "rgb", Object.assign(this, { _a: t[0], _b: t[1], _c: t[2], _d: t[3] || 0 });
    else if (t instanceof Object) {
      const d = xr(t, e);
      Object.assign(this, d);
    } else if (typeof t == "string")
      if (ps.test(t)) {
        const d = t.replace(er, ""), [m, w, v] = Qn.exec(d).slice(1, 4).map((L) => parseInt(L));
        Object.assign(this, { _a: m, _b: w, _c: v, _d: 0, space: "rgb" });
      } else if (ds.test(t)) {
        const d = (L) => parseInt(L, 16), [, m, w, v] = Zn.exec(gr(t)).map(d);
        Object.assign(this, { _a: m, _b: w, _c: v, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: h, _b: a, _c: c, _d: u } = this, l = this.space === "rgb" ? { r: h, g: a, b: c } : this.space === "xyz" ? { x: h, y: a, z: c } : this.space === "hsl" ? { h, s: a, l: c } : this.space === "lab" ? { l: h, a, b: c } : this.space === "lch" ? { l: h, c: a, h: c } : this.space === "cmyk" ? { c: h, m: a, y: c, k: u } : {};
    Object.assign(this, l);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), h = 200 * (e - s);
    return new E(n, r, h, "lab");
  }
  lch() {
    const { l: t, a: e, b: s } = this.lab(), n = Math.sqrt(e ** 2 + s ** 2);
    let r = 180 * Math.atan2(s, e) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new E(t, n, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (br(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: w, a: v, b: L } = this;
        if (this.space === "lch") {
          const { c: Yt, h: We } = this, Ke = Math.PI / 180;
          v = Yt * Math.cos(Ke * We), L = Yt * Math.sin(Ke * We);
        }
        const A = (w + 16) / 116, B = v / 500 + A, ft = A - L / 200, dt = 16 / 116, Et = 8856e-6, Pt = 7.787;
        t = 0.95047 * (B ** 3 > Et ? B ** 3 : (B - dt) / Pt), e = 1 * (A ** 3 > Et ? A ** 3 : (A - dt) / Pt), s = 1.08883 * (ft ** 3 > Et ? ft ** 3 : (ft - dt) / Pt);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, h = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, c = 31308e-7, u = n > c ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > c ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, d = h > c ? 1.055 * a(h, 1 / 2.4) - 0.055 : 12.92 * h;
      return new E(255 * u, 255 * l, 255 * d);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new E(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, h = 255 * _i(r, n, t + 1 / 3), a = 255 * _i(r, n, t), c = 255 * _i(r, n, t - 1 / 3);
      return new E(h, a, c);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), h = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new E(r, h, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(yr);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((B) => B / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, u = h > 0.04045 ? Math.pow((h + 0.055) / 1.055, 2.4) : h / 12.92, l = (a * 0.4124 + c * 0.3576 + u * 0.1805) / 0.95047, d = (a * 0.2126 + c * 0.7152 + u * 0.0722) / 1, m = (a * 0.0193 + c * 0.1192 + u * 0.9505) / 1.08883, w = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, v = d > 8856e-6 ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116, L = m > 8856e-6 ? Math.pow(m, 1 / 3) : 7.787 * m + 16 / 116;
    return new E(w, v, L, "xyz");
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
let Y = class Es {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new Es(this);
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
    y.isMatrixLike(t) || (t = new y(t));
    const { x: e, y: s } = this;
    return this.x = t.a * e + t.c * s + t.e, this.y = t.b * e + t.d * s + t.f, this;
  }
};
function wr(i, t) {
  return new Y(i, t).transformO(this.screenCTM().inverseO());
}
function de(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class y {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, h = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, u = t.shear || 0, l = t.rotate || t.theta || 0, d = new Y(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), m = d.x, w = d.y, v = new Y(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), L = v.x, A = v.y, B = new Y(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), ft = B.x, dt = B.y, Et = new Y(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Pt = Et.x, Yt = Et.y;
    return {
      scaleX: a,
      scaleY: c,
      skewX: r,
      skewY: h,
      shear: u,
      theta: l,
      rx: Pt,
      ry: Yt,
      tx: ft,
      ty: dt,
      ox: m,
      oy: w,
      px: L,
      py: A
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
    return new y(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(t = 0, e = 0) {
    const s = this.a, n = this.b, r = this.c, h = this.d, a = this.e, c = this.f, u = s * h - n * r, l = u > 0 ? 1 : -1, d = l * Math.sqrt(s * s + n * n), m = Math.atan2(l * n, l * s), w = 180 / Math.PI * m, v = Math.cos(m), L = Math.sin(m), A = (s * r + n * h) / u, B = r * d / (A * s - n) || h * d / (A * n + s), ft = a - t + t * v * d + e * (A * v * d - L * B), dt = c - e + t * L * d + e * (A * L * d + v * B);
    return {
      // Return the affine parameters
      scaleX: d,
      scaleY: B,
      shear: A,
      rotate: w,
      translateX: ft,
      translateY: dt,
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
    const e = new y(t);
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
    const e = y.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof xt ? t.matrixify() : typeof t == "string" ? y.fromArray(t.split(Lt).map(parseFloat)) : Array.isArray(t) ? y.fromArray(t) : typeof t == "object" && y.isMatrixLike(t) ? t : typeof t == "object" ? new y().transform(t) : arguments.length === 6 ? y.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, h = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const c = n / a, u = -e / a, l = -s / a, d = t / a, m = -(c * r + l * h), w = -(u * r + d * h);
    return this.a = c, this.b = u, this.c = l, this.d = d, this.e = m, this.f = w, this;
  }
  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }
  lmultiplyO(t) {
    const e = this, s = t instanceof y ? t : new y(t);
    return y.matrixMultiply(s, e, this);
  }
  // Left multiplies by the given matrix
  multiply(t) {
    return this.clone().multiplyO(t);
  }
  multiplyO(t) {
    const e = this, s = t instanceof y ? t : new y(t);
    return y.matrixMultiply(e, s, this);
  }
  // Rotate matrix
  rotate(t, e, s) {
    return this.clone().rotateO(t, e, s);
  }
  rotateO(t, e = 0, s = 0) {
    t = xi(t);
    const n = Math.cos(t), r = Math.sin(t), { a: h, b: a, c, d: u, e: l, f: d } = this;
    return this.a = h * n - a * r, this.b = a * n + h * r, this.c = c * n - u * r, this.d = u * n + c * r, this.e = l * n - d * r + s * r - e * n + e, this.f = d * n + l * r - e * r - s * n + s, this;
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
    const r = Math.tan(t), h = Math.tan(e), { a, b: c, c: u, d: l, e: d, f: m } = this;
    return this.a = a + c * r, this.b = c + a * h, this.c = u + l * r, this.d = l + u * h, this.e = d + m * r - n * r, this.f = m + d * h - s * h, this;
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
    if (y.isMatrixLike(t))
      return new y(t).multiplyO(this);
    const e = y.formatTransforms(t), s = this, { x: n, y: r } = new Y(e.ox, e.oy).transform(s), h = new y().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const a = new Y(n, r).transform(h), c = isFinite(e.px) ? e.px - a.x : 0, u = isFinite(e.py) ? e.py - a.y : 0;
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
function _r() {
  return new y(this.node.getCTM());
}
function kr() {
  try {
    if (typeof this.isRoot == "function" && !this.isRoot()) {
      const i = this.rect(1, 1), t = i.node.getScreenCTM();
      return i.remove(), new y(t);
    }
    return new y(this.node.getScreenCTM());
  } catch {
    return console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    ), new y();
  }
}
T(y, "Matrix");
function zt() {
  if (!zt.nodes) {
    const i = Q().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    zt.nodes = { svg: i, path: t };
  }
  if (!zt.nodes.svg.node.parentNode) {
    const i = C.document.body || C.document.documentElement;
    zt.nodes.svg.addTo(i);
  }
  return zt.nodes;
}
function Ps(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function vr(i) {
  return i === C.document || (C.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === C.document;
  }).call(C.document.documentElement, i);
}
class W {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += C.window.pageXOffset, this.y += C.window.pageYOffset, new W(this);
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
    return Ps(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const e = Math.min(this.x, t.x), s = Math.min(this.y, t.y), n = Math.max(this.x + this.width, t.x + t.width) - e, r = Math.max(this.y + this.height, t.y + t.height) - s;
    return new W(e, s, n, r);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(t) {
    t instanceof y || (t = new y(t));
    let e = 1 / 0, s = -1 / 0, n = 1 / 0, r = -1 / 0;
    return [
      new Y(this.x, this.y),
      new Y(this.x2, this.y),
      new Y(this.x, this.y2),
      new Y(this.x2, this.y2)
    ].forEach(function(a) {
      a = a.transform(t), e = Math.min(e, a.x), s = Math.max(s, a.x), n = Math.min(n, a.y), r = Math.max(r, a.y);
    }), new W(e, n, s - e, r - n);
  }
}
function $s(i, t, e) {
  let s;
  try {
    if (s = t(i.node), Ps(s) && !vr(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Cr() {
  const e = $s(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(zt().svg).show(), h = r.node.getBBox();
      return r.remove(), h;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new W(e);
}
function Tr(i) {
  const s = $s(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new W(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Nr(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
_({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new W(this.attr("viewBox")) : this.attr("viewBox", new W(i, t, e, s));
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
      c === 1 / 0 && (c = Number.MAX_SAFE_INTEGER / 100), t = t || new Y(e / 2 / r + n.x, s / 2 / h + n.y);
      const u = new W(n).transform(
        new y({ scale: c, origin: t })
      );
      return this.viewbox(u);
    }
  }
});
T(W, "Box");
class ae extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
k([ae], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Sr = ["toArray", "constructor", "each"];
ae.extend = function(i) {
  i = i.reduce((t, e) => (Sr.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), k([ae], i);
};
function Te(i, t) {
  return new ae(
    Yi((t || C.document).querySelectorAll(i), function(e) {
      return lt(e);
    })
  );
}
function Or(i) {
  return Te(i, this.node);
}
function Ar(i) {
  return lt(this.node.querySelector(i));
}
let Mr = 0;
const zs = {};
function Ds(i) {
  let t = i.getEventHolder();
  return t === C.window && (t = zs), t.events || (t.events = {}), t.events;
}
function Ji(i) {
  return i.getEventTarget();
}
function Ir(i) {
  let t = i.getEventHolder();
  t === C.window && (t = zs), t.events && (t.events = {});
}
function Ie(i, t, e, s, n) {
  const r = e.bind(s || i), h = Q(i), a = Ds(h), c = Ji(h);
  t = Array.isArray(t) ? t : t.split(Lt), e._svgjsListenerId || (e._svgjsListenerId = ++Mr), t.forEach(function(u) {
    const l = u.split(".")[0], d = u.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][d] = a[l][d] || {}, a[l][d][e._svgjsListenerId] = r, c.addEventListener(l, r, n || !1);
  });
}
function Nt(i, t, e, s) {
  const n = Q(i), r = Ds(n), h = Ji(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(Lt), t.forEach(function(a) {
    const c = a && a.split(".")[0], u = a && a.split(".")[1];
    let l, d;
    if (e)
      r[c] && r[c][u || "*"] && (h.removeEventListener(
        c,
        r[c][u || "*"][e],
        s || !1
      ), delete r[c][u || "*"][e]);
    else if (c && u) {
      if (r[c] && r[c][u]) {
        for (d in r[c][u])
          Nt(h, [c, u].join("."), d);
        delete r[c][u];
      }
    } else if (u)
      for (a in r)
        for (l in r[a])
          u === l && Nt(h, [a, u].join("."));
    else if (c) {
      if (r[c]) {
        for (l in r[c])
          Nt(h, [c, l].join("."));
        delete r[c];
      }
    } else {
      for (a in r)
        Nt(h, a);
      Ir(n);
    }
  }));
}
function Lr(i, t, e, s) {
  const n = Ji(i);
  return t instanceof C.window.Event || (t = new C.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Ve extends Ki {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return Lr(this, t, e, s);
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
    return Nt(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Ie(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
T(Ve, "EventTarget");
function ys() {
}
const Oe = {
  duration: 400,
  ease: ">",
  delay: 0
}, Er = {
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
class ve extends Array {
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
class b {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  convert(t) {
    return new b(this.value, t);
  }
  // Divide number
  divide(t) {
    return t = new b(t), new b(this / t, this.unit || t.unit);
  }
  init(t, e) {
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(Ls), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof b && (this.value = t.valueOf(), this.unit = t.unit), this;
  }
  // Subtract number
  minus(t) {
    return t = new b(t), new b(this - t, this.unit || t.unit);
  }
  // Add number
  plus(t) {
    return t = new b(t), new b(this + t, this.unit || t.unit);
  }
  // Multiply number
  times(t) {
    return t = new b(t), new b(this * t, this.unit || t.unit);
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
const Pr = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), js = [];
function $r(i) {
  js.push(i);
}
function zr(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = gs.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? Er[i] : gs.test(t) ? parseFloat(t) : t;
      t = js.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new b(t) : Pr.has(i) && E.isColor(t) ? t = new E(t) : t.constructor === Array && (t = new ve(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class Ut extends Ve {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = Q(t), t.removeNamespace && this.node instanceof C.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return Q(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new ae(
      Yi(this.node.children, function(t) {
        return lt(t);
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
    return e && (s = Is(s)), new this.constructor(s);
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
    return this.put(new Ut(Me(t), e));
  }
  // Get first child
  first() {
    return lt(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return lt(this.node.childNodes[t]);
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
    return this.xml(t, e, $n);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = Ms(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return lt(this.node.lastChild);
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
    if (e = lt(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = lt(e.node.parentNode));
    return e;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, e) {
    return t = Q(t), this.add(t, e), t;
  }
  // Add element to given container and return container
  putIn(t, e) {
    return Q(t).add(this, e);
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
    return t = Q(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
  }
  round(t = 2, e = null) {
    const s = 10 ** t, n = this.attr(e);
    for (const r in n)
      typeof n[r] == "number" && (n[r] = Math.round(n[r] * s) / s);
    return this.attr(n), this;
  }
  // Import / Export raw svg
  svg(t, e) {
    return this.xml(t, e, Wi);
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
        if (a = lt(a.node.cloneNode(!0)), e) {
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
    const n = Me("wrapper", s), r = C.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const h = this.parent();
    return e ? this.replace(r) && h : this.add(r);
  }
}
k(Ut, { attr: zr, find: Or, findOne: Ar });
T(Ut, "Dom");
class xt extends Ut {
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
    return this.x(new b(t).plus(this.x()));
  }
  // Relative move over y axis
  dy(t = 0) {
    return this.y(new b(t).plus(this.y()));
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
    e || (t = Q(t));
    const s = new ae();
    let n = this;
    for (; (n = n.parent()) && n.node !== C.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(Jn);
    return e ? Q(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(Dn(Zi));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ce(this, t, e);
    return this.width(new b(s.width)).height(new b(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return As(this, this.dom), super.writeDataToDom();
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
k(xt, {
  bbox: Cr,
  rbox: Tr,
  inside: Nr,
  point: wr,
  ctm: _r,
  screenCTM: kr
});
T(xt, "Element");
const Se = {
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
    if (typeof s == "string" || s instanceof E || E.isRgb(s) || s instanceof xt)
      this.attr(i, s);
    else
      for (e = Se[i].length - 1; e >= 0; e--)
        s[Se[i][e]] != null && this.attr(Se.prefix(i, Se[i][e]), s[Se[i][e]]);
    return this;
  }, _(["Element", "Runner"], t);
});
_(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(i, t, e, s, n, r) {
    return i == null ? new y(this) : this.attr("transform", new y(i, t, e, s, n, r));
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
_("radius", {
  // Add x and y radius
  radius: function(i, t = i) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new b(i)) : this.rx(i).ry(t);
  }
});
_("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(i) {
    return new Y(this.node.getPointAtLength(i));
  }
});
_(["Element", "Runner"], {
  // Set font
  font: function(i, t) {
    if (typeof i == "object") {
      for (t in i) this.font(t, i[t]);
      return this;
    }
    return i === "leading" ? this.leading(t) : i === "anchor" ? this.attr("text-anchor", t) : i === "size" || i === "family" || i === "weight" || i === "stretch" || i === "variant" || i === "style" ? this.attr("font-" + i, t) : this.attr(i, t);
  }
});
const Dr = [
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
_("Element", Dr);
function jr() {
  return this.attr("transform", null);
}
function Rr() {
  return (this.attr("transform") || "").split(tr).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(Lt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(y.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new y());
}
function Fr(i, t) {
  if (this === i) return this;
  if (Si(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function Br(i) {
  return this.toParent(this.root(), i);
}
function qr(i, t) {
  if (i == null || typeof i == "string") {
    const n = new y(this).decompose();
    return i == null ? n : n[i];
  }
  y.isMatrixLike(i) || (i = { ...i, origin: Ni(i, this) });
  const e = t === !0 ? this : t || !1, s = new y(e).transform(i);
  return this.attr("transform", s);
}
_("Element", {
  untransform: jr,
  matrixify: Rr,
  toParent: Fr,
  toRoot: Br,
  transform: qr
});
class st extends xt {
  flatten() {
    return this.each(function() {
      if (this instanceof st)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
T(st, "Container");
class ts extends st {
  constructor(t, e = t) {
    super(D("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
T(ts, "Defs");
class at extends xt {
}
T(at, "Shape");
function es(i) {
  return this.attr("rx", i);
}
function is(i) {
  return this.attr("ry", i);
}
function Rs(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function Fs(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function Bs(i) {
  return this.attr("cx", i);
}
function qs(i) {
  return this.attr("cy", i);
}
function Vs(i) {
  return i == null ? this.rx() * 2 : this.rx(new b(i).divide(2));
}
function Gs(i) {
  return i == null ? this.ry() * 2 : this.ry(new b(i).divide(2));
}
const Vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: Bs,
  cy: qs,
  height: Gs,
  rx: es,
  ry: is,
  width: Vs,
  x: Rs,
  y: Fs
}, Symbol.toStringTag, { value: "Module" }));
class fi extends at {
  constructor(t, e = t) {
    super(D("ellipse", t), e);
  }
  size(t, e) {
    const s = Ce(this, t, e);
    return this.rx(new b(s.width).divide(2)).ry(
      new b(s.height).divide(2)
    );
  }
}
k(fi, Vr);
_("Container", {
  // Create an ellipse
  ellipse: $(function(i = 0, t = i) {
    return this.put(new fi()).size(i, t).move(0, 0);
  })
});
T(fi, "Ellipse");
class Us extends Ut {
  constructor(t = C.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new Ut(Me("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
T(Us, "Fragment");
function Xs(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new b(i), fy: new b(t) }) : this.attr({ x1: new b(i), y1: new b(t) });
}
function Hs(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new b(i), cy: new b(t) }) : this.attr({ x2: new b(i), y2: new b(t) });
}
const Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: Xs,
  to: Hs
}, Symbol.toStringTag, { value: "Module" }));
class Ge extends st {
  constructor(t, e) {
    super(
      D(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new W();
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
k(Ge, Gr);
_({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: $(function(i, t) {
      return this.put(new Ge(i)).update(t);
    })
  }
});
T(Ge, "Gradient");
class Le extends st {
  // Initialize node
  constructor(t, e = t) {
    super(D("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new W();
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
_({
  Container: {
    // Create pattern element in defs
    pattern(...i) {
      return this.defs().pattern(...i);
    }
  },
  Defs: {
    pattern: $(function(i, t, e) {
      return this.put(new Le()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
T(Le, "Pattern");
class di extends at {
  constructor(t, e = t) {
    super(D("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new C.window.Image();
    return Ie(
      s,
      "load",
      function(n) {
        const r = this.parent(Le);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Le && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Ie(s, "load error", function() {
      Nt(s);
    }), this.attr("href", s.src = t, qe);
  }
}
$r(function(i, t, e) {
  return (i === "fill" || i === "stroke") && ir.test(t) && (t = e.root().defs().image(t)), t instanceof di && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
_({
  Container: {
    // create image element, load image and set its size
    image: $(function(i, t) {
      return this.put(new di()).size(0, 0).load(i, t);
    })
  }
});
T(di, "Image");
class Xt extends ve {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new W(s, n, t - s, e - n);
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
    y.isMatrixLike(t) || (t = new y(t));
    for (let e = this.length; e--; ) {
      const [s, n] = this[e];
      this[e][0] = t.a * s + t.c * n + t.e, this[e][1] = t.b * s + t.d * n + t.f;
    }
    return this;
  }
}
const Ur = Xt;
function Xr(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function Hr(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function Yr(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function Wr(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: Ur,
  height: Wr,
  width: Yr,
  x: Xr,
  y: Hr
}, Symbol.toStringTag, { value: "Module" }));
let Ee = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("line", t), e);
  }
  // Get array
  array() {
    return new Xt([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new Xt(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ce(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
k(Ee, ss);
_({
  Container: {
    // Create a line element
    line: $(function(...i) {
      return Ee.prototype.plot.apply(
        this.put(new Ee()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
T(Ee, "Line");
class Ze extends st {
  // Initialize node
  constructor(t, e = t) {
    super(D("marker", t), e);
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
_({
  Container: {
    marker(...i) {
      return this.defs().marker(...i);
    }
  },
  Defs: {
    // Create marker
    marker: $(function(i, t, e) {
      return this.put(new Ze()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof Ze ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
T(Ze, "Marker");
function pe(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const Kr = {
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
class ns {
  done() {
    return !1;
  }
}
class Oi extends ns {
  constructor(t = Oe.ease) {
    super(), this.ease = Kr[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class Qe extends ns {
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
function xs() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), h = 3.9 / (r * i);
  this.d = 2 * r * h, this.k = h * h;
}
class Zr extends Qe {
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
k(Zr, {
  duration: pe("_duration", xs),
  overshoot: pe("_overshoot", xs)
});
class Qr extends Qe {
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
k(Qr, {
  windup: pe("_windup"),
  p: pe("P"),
  i: pe("I"),
  d: pe("D")
});
const Jr = {
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
function to(i) {
  const t = i.segment[0];
  return Ai[t](i.segment.slice(1), i.p, i.p0);
}
function Mi(i) {
  return i.segment.length && i.segment.length - 1 === Jr[i.segment[0].toUpperCase()];
}
function eo(i, t) {
  i.inNumber && Kt(i, !1);
  const e = Qi.test(t);
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
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, Mi(i) && Ii(i);
}
function Ii(i) {
  i.inSegment = !1, i.absolute && (i.segment = to(i)), i.segments.push(i.segment);
}
function io(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function so(i) {
  return i.lastToken.toUpperCase() === "E";
}
const no = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function ro(i, t = !0) {
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
    p0: new Y(),
    p: new Y()
  };
  for (; n.lastToken = s, s = i.charAt(e++); )
    if (!(!n.inSegment && eo(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          Kt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || io(n)) {
          n.inNumber = !0, n.number = s, Kt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (no.has(s)) {
        n.inNumber && Kt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !so(n)) {
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
      if (Qi.test(s)) {
        if (n.inNumber)
          Kt(n, !1);
        else if (Mi(n))
          Ii(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && Kt(n, !1), n.inSegment && Mi(n) && Ii(n), n.segments;
}
function oo(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class ce extends ve {
  // Get bounding box of path
  bbox() {
    return zt().path.setAttribute("d", this.toString()), new W(zt.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), ro(t);
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
    return oo(this);
  }
}
const Ys = (i) => {
  const t = typeof i;
  return t === "number" ? b : t === "string" ? E.isColor(i) ? E : Lt.test(i) ? Qi.test(i) ? ce : ve : Ls.test(i) ? b : Li : rs.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? ve : t === "object" ? Pe : Li;
};
class Zt {
  constructor(t) {
    this._stepper = t || new Oi("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
    this._type || this.type(Ys(t));
    let e = new this._type(t);
    return this._type === E && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Pe && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class Li {
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
class Ue {
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
    }), Object.assign(this, Ue.defaults, t), this;
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
Ue.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const ho = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Pe {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === E && t[s + 7] !== e[s + 7]) {
          const a = t[s + 7], c = new E(this.values.splice(s + 3, 5))[a]().toArray();
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
      const n = Ys(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(ho), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const rs = [Li, Ue, Pe];
function ao(i = []) {
  rs.push(...[].concat(i));
}
function co() {
  k(rs, {
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
let Ne = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("path", t), e);
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
};
Ne.prototype.MorphArray = ce;
_({
  Container: {
    // Create a wrapped path element
    path: $(function(i) {
      return this.put(new Ne()).plot(i || new ce());
    })
  }
});
T(Ne, "Path");
function uo() {
  return this._array || (this._array = new Xt(this.attr("points")));
}
function lo() {
  return delete this._array, this;
}
function fo(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function po(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new Xt(i)
  );
}
function mo(i, t) {
  const e = Ce(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: uo,
  clear: lo,
  move: fo,
  plot: po,
  size: mo
}, Symbol.toStringTag, { value: "Module" }));
let Xe = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("polygon", t), e);
  }
};
_({
  Container: {
    // Create a wrapped polygon element
    polygon: $(function(i) {
      return this.put(new Xe()).plot(i || new Xt());
    })
  }
});
k(Xe, ss);
k(Xe, Ws);
T(Xe, "Polygon");
class He extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("polyline", t), e);
  }
}
_({
  Container: {
    // Create a wrapped polygon element
    polyline: $(function(i) {
      return this.put(new He()).plot(i || new Xt());
    })
  }
});
k(He, ss);
k(He, Ws);
T(He, "Polyline");
class pi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("rect", t), e);
  }
}
k(pi, { rx: es, ry: is });
_({
  Container: {
    // Create a rect element
    rect: $(function(i, t) {
      return this.put(new pi()).size(i, t);
    })
  }
});
T(pi, "Rect");
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
const I = {
  nextDraw: null,
  frames: new vi(),
  timeouts: new vi(),
  immediates: new vi(),
  timer: () => C.window.performance || C.window.Date,
  transforms: [],
  frame(i) {
    const t = I.frames.push({ run: i });
    return I.nextDraw === null && (I.nextDraw = C.window.requestAnimationFrame(I._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = I.timer().now() + t, s = I.timeouts.push({ run: i, time: e });
    return I.nextDraw === null && (I.nextDraw = C.window.requestAnimationFrame(I._draw)), s;
  },
  immediate(i) {
    const t = I.immediates.push(i);
    return I.nextDraw === null && (I.nextDraw = C.window.requestAnimationFrame(I._draw)), t;
  },
  cancelFrame(i) {
    i != null && I.frames.remove(i);
  },
  clearTimeout(i) {
    i != null && I.timeouts.remove(i);
  },
  cancelImmediate(i) {
    i != null && I.immediates.remove(i);
  },
  _draw(i) {
    let t = null;
    const e = I.timeouts.last();
    for (; (t = I.timeouts.shift()) && (i >= t.time ? t.run() : I.timeouts.push(t), t !== e); )
      ;
    let s = null;
    const n = I.frames.last();
    for (; s !== n && (s = I.frames.shift()); )
      s.run(i);
    let r = null;
    for (; r = I.immediates.shift(); )
      r();
    I.nextDraw = I.timeouts.first() || I.frames.first() ? C.window.requestAnimationFrame(I._draw) : null;
  }
}, go = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, yo = function() {
  const i = C.window;
  return (i.performance || i.Date).now();
};
class Ks extends Ve {
  // Construct a new timeline on the given element
  constructor(t = yo) {
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
      return this._runners.map(go);
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
    return I.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = I.frame(this._step), this);
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
      const d = this._time - c.start;
      if (d <= 0) {
        r = !0;
        continue;
      } else d < l && (l = d);
      if (!u.active()) continue;
      u.step(l).done ? c.persist !== !0 && u.duration() - u.time() + this._time + c.persist < this._time && (u.unschedule(), --h, --a) : r = !0;
    }
    return r && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
  terminate() {
    this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }
}
_({
  Element: {
    timeline: function(i) {
      return i == null ? (this._timeline = this._timeline || new Ks(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class ht extends Ve {
  constructor(t) {
    super(), this.id = ht.id++, t = t ?? Oe.duration, t = typeof t == "function" ? new Qe(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof Qe, this._stepper = this._isDeclarative ? t : new Oi(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new y(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, h = 0;
    return t = t ?? Oe.duration, e = e ?? Oe.delay, s = s || "last", typeof t == "object" && !(t instanceof ns) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, h = t.wait ?? h, t = t.duration ?? Oe.duration), {
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
    return this.transforms = new y(), this;
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
    return this._stepper = new Oi(t), this;
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
      const m = function(v) {
        const L = h * Math.floor(v % (2 * (n + s)) / (n + s)), A = L && !a || !L && a, B = Math.pow(-1, A) * (v % (n + s)) / s + A;
        return Math.max(Math.min(B, 1), 0);
      }, w = r * (n + s) - n;
      return c = e <= 0 ? Math.round(m(1e-5)) : e < w ? m(e) : Math.round(m(w - 1e-5)), c;
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
      initialiser: t || ys,
      runner: e || ys,
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
    if (t instanceof Ks || (s = e, e = t, t = this.timeline()), !t)
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
    return (s || a) && (this._initialise(s), this.transforms = new y(), c = this._run(a ? t : e), this.fire("step", this)), this.done = this.done || c && a, h && this.fire("finished", this), this;
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
class Je {
  constructor(t = new y(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
k([ht, Je], {
  mergeWith(i) {
    return new Je(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const Zs = (i, t) => i.lmultiplyO(t), Qs = (i) => i.transforms;
function xo() {
  const t = this._transformationRunners.runners.map(Qs).reduce(Zs, new y());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class bo {
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
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new Je()).forEach((s) => s.clearTransformsFromQueue()), this;
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
_({
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(Qs).reduce(Zs, new y());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), I.cancelImmediate(this._frameId), this._frameId = I.immediate(xo.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new bo().add(
        new Je(new y(this))
      ));
    }
  }
});
const wo = (i, t) => i.filter((e) => !t.includes(e));
k(ht, {
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
        const a = Object.keys(h), c = wo(a, r);
        if (c.length) {
          const l = this.element()[i](c), d = new Pe(n.from()).valueOf();
          Object.assign(d, l), n.from(d);
        }
        const u = new Pe(n.to()).valueOf();
        Object.assign(u, h), n.to(u), r = a, s = h;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new Zt(this._stepper).to(new b(i));
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
    const s = y.isMatrixLike(i);
    e = i.affine != null ? i.affine : e ?? !s;
    const n = new Zt(this._stepper).type(
      e ? Ue : y
    );
    let r, h, a, c, u;
    function l() {
      h = h || this.element(), r = r || Ni(i, h), u = new y(t ? void 0 : h), h._addRunner(this), t || h._clearTransformRunnersBefore(this);
    }
    function d(w) {
      t || this.clearTransform();
      const { x: v, y: L } = new Y(r).transform(
        h._currentTransform(this)
      );
      let A = new y({ ...i, origin: [v, L] }), B = this._isDeclarative && a ? a : u;
      if (e) {
        A = A.decompose(v, L), B = B.decompose(v, L);
        const dt = A.rotate, Et = B.rotate, Pt = [dt - 360, dt, dt + 360], Yt = Pt.map((On) => Math.abs(On - Et)), We = Math.min(...Yt), Ke = Yt.indexOf(We);
        A.rotate = Pt[Ke];
      }
      t && (s || (A.rotate = i.rotate || 0), this._isDeclarative && c && (B.rotate = c)), n.from(B), n.to(A);
      const ft = n.at(w);
      return c = ft.rotate, a = new y(ft), this.addTransform(a), h._addRunner(this), n.done();
    }
    function m(w) {
      (w.origin || "center").toString() !== (i.origin || "center").toString() && (r = Ni(w, h)), i = { ...w, origin: r };
    }
    return this.queue(l, d, m, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
    if (t = new b(t), this._tryRetarget(i, t)) return this;
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
        e.to(s + new b(n));
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
    return this._queueObject(i, new b(t));
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
    return this._queueObject("viewbox", new W(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
k(ht, { rx: es, ry: is, from: Xs, to: Hs });
T(ht, "Runner");
class os extends st {
  constructor(t, e = t) {
    super(D("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? lt(this.node.querySelector("defs")) || this.put(new ts()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof C.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: Wi, version: "1.1" }).attr(
      "xmlns:xlink",
      qe,
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
_({
  Container: {
    // Create nested svg document
    nested: $(function() {
      return this.put(new os());
    })
  }
});
T(os, "Svg", !0);
let hs = class extends st {
  // Initialize node
  constructor(t, e = t) {
    super(D("symbol", t), e);
  }
};
_({
  Container: {
    symbol: $(function() {
      return this.put(new hs());
    })
  }
});
T(hs, "Symbol");
function _o(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(C.document.createTextNode(i)), this;
}
function ko() {
  return this.node.getComputedTextLength();
}
function vo(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function Co(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function To(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function No(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function So(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function Oo(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Ao(i) {
  return this.attr("x", i);
}
function Mo(i) {
  return this.attr("y", i);
}
function Io(i, t) {
  return this.ax(i).ay(t);
}
function Lo(i) {
  return this._build = !!i, this;
}
const Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Io,
  ax: Ao,
  ay: Mo,
  build: Lo,
  center: Oo,
  cx: No,
  cy: So,
  length: ko,
  move: To,
  plain: _o,
  x: vo,
  y: Co
}, Symbol.toStringTag, { value: "Module" }));
class yt extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("text", t), e), this.dom.leading = this.dom.leading ?? new b(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(t) {
    return t == null ? this.dom.leading : (this.dom.leading = new b(t), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(t) {
    if (typeof t == "boolean" && (this._rebuild = t), this._rebuild) {
      const e = this;
      let s = 0;
      const n = this.dom.leading;
      this.each(function(r) {
        if (Si(this.node)) return;
        const h = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new b(h);
        this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === `
` ? s += a : (this.attr("dy", r ? a + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new b(t.leading || 1.3), this;
  }
  writeDataToDom() {
    return As(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || Si(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && lt(e[n]).dom.newLined === !0 && (t += `
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
k(yt, Js);
_({
  Container: {
    // Create text element
    text: $(function(i = "") {
      return this.put(new yt()).text(i);
    }),
    // Create plain text element
    plain: $(function(i = "") {
      return this.put(new yt()).plain(i);
    })
  }
});
T(yt, "Text");
class mi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(D("tspan", t), e), this._build = !1;
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
    if (!(t instanceof yt))
      return this;
    const e = t.index(this), s = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new b(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
k(mi, Js);
_({
  Tspan: {
    tspan: $(function(i = "") {
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
T(mi, "Tspan");
let as = class extends at {
  constructor(t, e = t) {
    super(D("circle", t), e);
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
    return this.radius(new b(t).divide(2));
  }
};
k(as, { x: Rs, y: Fs, cx: Bs, cy: qs, width: Vs, height: Gs });
_({
  Container: {
    // Create circle element
    circle: $(function(i = 0) {
      return this.put(new as()).size(i).move(0, 0);
    })
  }
});
T(as, "Circle");
class Ei extends st {
  constructor(t, e = t) {
    super(D("clipPath", t), e);
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
_({
  Container: {
    // Create clipping element
    clip: $(function() {
      return this.defs().put(new Ei());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof Ei ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
T(Ei, "ClipPath");
class ti extends xt {
  constructor(t, e = t) {
    super(D("foreignObject", t), e);
  }
}
_({
  Container: {
    foreignObject: $(function(i, t) {
      return this.put(new ti()).size(i, t);
    })
  }
});
T(ti, "ForeignObject");
function Eo(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof zn().SVGSVGElement ? new W(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new y(e), r = n.translate(i, t).transform(n.inverse()), h = new Y(s.x, s.y).transform(r);
    e.move(h.x, h.y);
  }), this;
}
function Po(i) {
  return this.dmove(i, 0);
}
function $o(i) {
  return this.dmove(0, i);
}
function zo(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function Do(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function jo(i, t, e = this.bbox()) {
  const s = Ce(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((h) => {
    const a = new Y(e).transform(new y(h).inverse());
    h.scale(n, r, a.x, a.y);
  }), this;
}
function Ro(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function Fo(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function Bo(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: Eo,
  dx: Po,
  dy: $o,
  height: zo,
  move: Do,
  size: jo,
  width: Ro,
  x: Fo,
  y: Bo
}, Symbol.toStringTag, { value: "Module" }));
class gi extends st {
  constructor(t, e = t) {
    super(D("g", t), e);
  }
}
k(gi, tn);
_({
  Container: {
    // Create a group element
    group: $(function() {
      return this.put(new gi());
    })
  }
});
T(gi, "G");
class ei extends st {
  constructor(t, e = t) {
    super(D("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, qe);
  }
}
k(ei, tn);
_({
  Container: {
    // Create a hyperlink element
    link: $(function(i) {
      return this.put(new ei()).to(i);
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
      return t || (t = new ei(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
T(ei, "A");
class Pi extends st {
  // Initialize node
  constructor(t, e = t) {
    super(D("mask", t), e);
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
_({
  Container: {
    mask: $(function() {
      return this.defs().put(new Pi());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof Pi ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
T(Pi, "Mask");
class en extends xt {
  constructor(t, e = t) {
    super(D("stop", t), e);
  }
  // add color stops
  update(t) {
    return (typeof t == "number" || t instanceof b) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new b(t.offset)), this;
  }
}
_({
  Gradient: {
    // Add a color stop
    stop: function(i, t, e) {
      return this.put(new en()).update(i, t, e);
    }
  }
});
T(en, "Stop");
function qo(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += En(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class $i extends xt {
  constructor(t, e = t) {
    super(D("style", t), e);
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
    return this.addText(qo(t, e));
  }
}
_("Dom", {
  style(i, t) {
    return this.put(new $i()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new $i()).font(i, t, e);
  }
});
T($i, "Style");
class cs extends yt {
  // Initialize node
  constructor(t, e = t) {
    super(D("textPath", t), e);
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
_({
  Container: {
    textPath: $(function(i, t) {
      return i instanceof yt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: $(function(i, t = !0) {
      const e = new cs();
      i instanceof Ne || (i = this.defs().path(i)), e.attr("href", "#" + i, qe);
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
    text: $(function(i) {
      return i instanceof yt || (i = new yt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return Te("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
cs.prototype.MorphArray = ce;
T(cs, "TextPath");
class sn extends at {
  constructor(t, e = t) {
    super(D("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, qe);
  }
}
_({
  Container: {
    // Create a use element
    use: $(function(i, t) {
      return this.put(new sn()).use(i, t);
    })
  }
});
T(sn, "Use");
const nn = Q;
k([os, hs, di, Le, Ze], it("viewbox"));
k([Ee, He, Xe, Ne], it("marker"));
k(yt, it("Text"));
k(Ne, it("Path"));
k(ts, it("Defs"));
k([yt, mi], it("Tspan"));
k([pi, fi, Ge, ht], it("radius"));
k(Ve, it("EventTarget"));
k(Ut, it("Dom"));
k(xt, it("Element"));
k(at, it("Shape"));
k([st, Us], it("Container"));
k(Ge, it("Gradient"));
k(ht, it("Runner"));
ae.extend(In());
ao([
  b,
  E,
  W,
  y,
  ve,
  Xt,
  ce,
  Y
]);
co();
const bs = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class Vo {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(bs(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Ie(window, s, this.drag, this, { passive: !1 }), Ie(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(bs(t)), r = n.x - s.x, h = n.y - s.y;
    if (!r && !h) return e;
    const a = e.x + r, c = e.y + h;
    this.box = new W(a, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box
    }).defaultPrevented && this.move(a, c);
  }
  move(t, e) {
    this.el.type === "svg" ? gi.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), Nt(window, "mousemove.drag"), Nt(window, "touchmove.drag"), Nt(window, "mouseup.drag"), Nt(window, "touchend.drag"), this.init(!0);
  }
}
k(xt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new Vo(this)).init(i), this;
  }
});
function St(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function Gt(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var rn = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(rn || {}), $e = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))($e || {}), me, ze, q, et, te, Ot, At, De, je, zi;
class Go {
  constructor(t, e, s) {
    p(this, je);
    p(this, me);
    p(this, ze);
    p(this, q);
    p(this, et);
    p(this, te);
    p(this, Ot);
    p(this, At);
    p(this, De);
    f(this, me, t), f(this, ze, e), f(this, et, Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: (n) => n
      },
      s
    )), f(this, te, s.text ?? e), f(this, Ot, 0), f(this, At, 0), f(this, De, "display: block; position: fixed; white-space:nowrap"), f(this, q, x(this, je, zi).call(this));
  }
  get config() {
    return o(this, et);
  }
  get x() {
    return o(this, Ot);
  }
  set x(t) {
    f(this, Ot, t);
  }
  get y() {
    return o(this, At);
  }
  set y(t) {
    f(this, At, t);
  }
  get asHtml() {
    return o(this, et).asHtml;
  }
  get shape() {
    return o(this, q);
  }
  get alignement() {
    return o(this, et).alignement;
  }
  // Get the label of the figure.
  get label() {
    return o(this, q);
  }
  get displayName() {
    return o(this, et).asHtml ? o(this, et).texConverter(o(this, te)) : o(this, te);
  }
  hide() {
    return o(this, q).hide(), this;
  }
  show() {
    return o(this, q).show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && f(this, te, t), x(this, je, zi).call(this), this;
  }
  move(t, e) {
    return f(this, Ot, t), f(this, At, e), this.position(), this;
  }
  rotate(t) {
    return o(this, q).transform({
      rotate: t,
      origin: { x: o(this, Ot), y: o(this, At) }
    }), this;
  }
  position(t, e) {
    t === void 0 && (t = o(this, et).alignement), e === void 0 && (e = o(this, et).offset), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, o(this, et).alignement = t, o(this, et).offset = e;
    let s = o(this, Ot), n = o(this, At), r = 0, h = 0;
    return o(this, q) instanceof ti ? (r = o(this, q).node.children[0].clientWidth, h = o(this, q).node.children[0].clientHeight, this.label.width(r), this.label.height(h)) : (r = o(this, q).length(), h = o(this, q).bbox().h), t.includes("l") ? s = s - r / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? s = s + r / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (s = +s), t.includes("t") ? n = n - h / 2 : t.includes("m") ? n = +n : t.includes("b") && (n = n + h / 2), o(this, q) instanceof ti ? o(this, q).center(s + (e.x ?? 0), n - (e.y ?? 0)) : o(this, q).center(s + (e.x ?? 0), n - (e.y ?? 0)), this;
  }
}
me = new WeakMap(), ze = new WeakMap(), q = new WeakMap(), et = new WeakMap(), te = new WeakMap(), Ot = new WeakMap(), At = new WeakMap(), De = new WeakMap(), je = new WeakSet(), zi = function() {
  return o(this, q) && o(this, q).remove(), f(this, q, o(this, et).asHtml ? o(this, me).foreignObject(1, 1).attr("style", "overflow:visible").add(nn(`<div style="${o(this, De)}">${this.displayName}</div>`, !0)) : o(this, me).text(this.displayName)), o(this, q).attr("id", `${o(this, ze)}-label`), o(this, q);
};
function on(i, t = 10) {
  return +i.toFixed(t);
}
function Uo(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function us(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class R {
  constructor(t, e) {
    tt(this, "_x");
    tt(this, "_y");
    return this._x = 0, this._y = 0, St(t) && St(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : St(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
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
    return new R(this._y, -this._x);
  }
  get unit() {
    const t = this.norm;
    return new R(this._x / t, this._y / t);
  }
  static scalarProduct(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  projection(t) {
    const e = t.x, s = t.y, n = R.scalarProduct(this, t) / (e ** 2 + s ** 2);
    return new R(e * n, s * n);
  }
  rotate(t) {
    const e = +t * Math.PI / 180, s = +this._x, n = +this._y;
    return this._x = Math.cos(e) * s - Math.sin(e) * n, this._y = Math.sin(e) * s + Math.cos(e) * n, this;
  }
  add(t) {
    return new R(this._x + t.x, this._y + t.y);
  }
  setLength(t) {
    const e = this.norm;
    return this._x = this._x * t / e, this._y = this._y * t / e, this;
  }
}
class ls {
  constructor(t, e) {
    tt(this, "_A");
    tt(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new R(0, 0), e instanceof R)
      this._A = t, this._director = e;
    else
      return new ls(t, new R(t, e));
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
    return new R(this._director.y, -this._director.x);
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
    return Uo(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let h, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (h = this._A.x, a = n * h + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (h = t.A.x, a = e * h + s) : (h = (r - s) / (e - n), a = e * h + s), h === Number.POSITIVE_INFINITY || h === Number.NEGATIVE_INFINITY ? null : { x: h, y: a };
  }
  projection(t) {
    const e = this._director, s = new R(this._A, t), n = R.scalarProduct(e, s) / R.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class ii {
  constructor(t, e) {
    tt(this, "_rpn");
    tt(this, "_expression");
    tt(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new Xo(
        "numeric"
        /* NUMERIC */
      ).parse(t, e ?? !0).rpn, this._isValid = !0;
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
      if (s.tokenType === "coefficient")
        isNaN(+s.token) ? console.log("adding Fraction - should not be here ! ") : this._addToStack(e, +s.token);
      else if (s.tokenType === "variable")
        (t == null ? void 0 : t[s.token]) !== void 0 && this._addToStack(e, +t[s.token]);
      else if (s.tokenType === "constant")
        this._addToStack(e, Di[s.token]);
      else if (s.tokenType === "operation") {
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
      } else if (s.tokenType === "function") {
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
    t.push(on(e));
  }
}
const Di = {
  pi: Math.PI,
  e: Math.exp(1)
};
class Xo {
  constructor(t) {
    tt(this, "_mode");
    tt(this, "_tokenConfig");
    tt(this, "_tokenConstant");
    tt(this, "_tokenKeys");
    tt(this, "_uniformize");
    tt(this, "_rpn", []);
    this._mode = typeof t > "u" ? "polynom" : t, this._tokenConfig = {}, this._tokenConstant = {}, this._tokenKeys = [], this._uniformize = !1, this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return this._rpn;
  }
  get rpnToken() {
    return this._rpn.map((t) => t.token);
  }
  tokenConfigInitialization() {
    return this._mode === "numeric" ? (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "%": {
        precedence: 3,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      sin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      cos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      tan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      asin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      acos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      atan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      sqrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      nthrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      ln: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      log: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      abs: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      }
    }, this._uniformize = !1) : this._mode === "expression" ? (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "%": {
        precedence: 3,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      sin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      cos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      tan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      asin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      acos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      atan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      sqrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      nthrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      abs: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      }
    }, this._uniformize = !0) : (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      }
    }, this._uniformize = !0), this._tokenKeys = Object.keys(this._tokenConfig).sort((t, e) => e.length - t.length), this._tokenConfig;
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(t, e) {
    let s, n;
    if (s = "", n = "monom", t[e] === "(")
      s = "(", n = "(";
    else if (t[e] === ")")
      s = ")", n = ")";
    else if (t[e] === ",")
      s = ",", n = "function-argument";
    else {
      for (const r of this._tokenKeys)
        if (t.substring(e, e + r.length) === r) {
          s += r, n = this._tokenConfig[r].type;
          break;
        }
      for (const r in Di)
        if (t.substring(e, e + r.length) === r) {
          s += r, n = "constant";
          break;
        }
      if (s === "")
        if (t[e].match(/[0-9]/)) {
          const r = t.substring(e).match(/^([0-9.]+)/);
          r && (s = r[0]), n = "coefficient";
        } else if (t[e].match(/[a-zA-Z]/)) {
          const r = t.substring(e).match(/^([a-zA-Z]+)/);
          r && (s = r[0], n = "variable");
        } else
          console.log("Unidentified token", t[e], t, e), s = t[e], n = "monom";
    }
    return [s, e + s.length, n];
  }
  normalize(t) {
    if (t.length === 1)
      return t;
    const e = [], s = [];
    for (const c in this._tokenConfig)
      this._tokenConfig[c].type === "function" && e.push(c);
    e.sort((c, u) => u.length - c.length);
    for (const c in Di)
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
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
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
        case "monom":
        case "coefficient":
        case "variable":
        case "constant":
          u.push({ token: h, tokenType: a });
          break;
        case "operation":
          if (l.length > 0) {
            let d = l[l.length - 1];
            for (n = +c; d.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[h].associative === "left" && this._tokenConfig[h].precedence <= this._tokenConfig[d.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[h].associative === "right" && this._tokenConfig[h].precedence < this._tokenConfig[d.token].precedence); ) {
              if (n--, n === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (u.push(l.pop() ?? {
                token: "",
                tokenType: "operation"
                /* OPERATION */
              }), l.length === 0)
                break;
              d = l[l.length - 1];
            }
          }
          l.push({ token: h, tokenType: a });
          break;
        case "function-argument":
          for (n = +c; l[l.length - 1].token !== "(" && l.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            u.push(l.pop() ?? { token: h, tokenType: a });
          }
          break;
        case "(":
          l.push({ token: h, tokenType: a }), t[r] === "-" && u.push({
            token: "0",
            tokenType: "coefficient"
            /* COEFFICIENT */
          });
          break;
        case ")":
          for (n = +c; l[l.length - 1].token !== "(" && l.length > 1; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
              break;
            }
            u.push(l.pop() ?? { token: h, tokenType: a });
          }
          l.pop();
          break;
        case "function":
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
  if (Gt(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return St(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function ji(i, t) {
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
    let d = 0, m = 0;
    t.x > 0 ? (d = r ? -n / t.x : h || (i.x - n) / t.x, m = h || (e - i.x - n) / t.x) : t.x < 0 && (d = r ? -n / t.x : h || (e - i.x - n) / t.x, m = h || (i.x - n) / t.x), d = Math.abs(d), m = Math.abs(m), a = i.x - d * t.x, c = i.y - d * t.y, u = i.x + m * t.x, l = i.y + m * t.y;
  }
  return a > e && u > e || a < 0 && u < 0 || c > s && l > s || c < 0 && l < 0 ? null : [{ x: a, y: c }, { x: u, y: l }];
}
function ws(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function _s(i, t) {
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
function Ye(i, t, e) {
  return e === "x" ? {
    start: i.marker(
      t,
      t,
      function(s) {
        s.path(`M0,0 L${t},${t} M${t},0 L0,${t}`).stroke({
          color: "black",
          width: 1
        });
      }
    ).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(
      t,
      t,
      function(s) {
        s.path(`M0,0 L${t},${t} M${t},0 L0,${t}`).stroke({
          color: "black",
          width: 1
        });
      }
    ).attr("markerUnits", "userSpaceOnUse")
  } : e === "|" ? {
    start: i.marker(
      t,
      t,
      function(s) {
        s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
      }
    ).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(
      t,
      t,
      function(s) {
        s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
      }
    ).attr("markerUnits", "userSpaceOnUse")
  } : {
    start: i.marker(
      t * 1.2,
      t * 1.2,
      function(s) {
        s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`).rotate(180);
      }
    ).ref(0, t / 2).attr("markerUnits", "userSpaceOnUse"),
    end: i.marker(
      t * 1.2,
      t * 1.2,
      function(s) {
        s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`);
      }
    ).ref(t, t / 2).attr("markerUnits", "userSpaceOnUse")
  };
}
var Dt, bt, pt, rt, H, ge, ee, wt;
class nt {
  constructor(t, e) {
    p(this, Dt);
    p(this, bt);
    p(this, pt);
    p(this, rt);
    p(this, H);
    p(this, ge);
    p(this, ee);
    p(this, wt);
    f(this, Dt, t), f(this, bt, e), f(this, ge, !1), f(this, ee, !1), f(this, wt, null), f(this, pt, o(this, Dt).group().attr("id", o(this, bt))), f(this, H, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), f(this, rt, o(this, pt).path());
  }
  get element() {
    return o(this, pt);
  }
  get name() {
    return o(this, bt);
  }
  get rootSVG() {
    return o(this, Dt);
  }
  get shape() {
    return o(this, rt);
  }
  set shape(t) {
    f(this, rt, t);
  }
  get appearance() {
    return o(this, H);
  }
  set appearance(t) {
    f(this, H, t);
  }
  get graphConfig() {
    return o(this, Dt).data("config");
  }
  get static() {
    return o(this, ge);
  }
  set static(t) {
    f(this, ge, t);
  }
  get isDraggable() {
    return o(this, ee);
  }
  set isDraggable(t) {
    f(this, ee, t);
  }
  hide() {
    return o(this, pt).hide(), this;
  }
  show() {
    return o(this, pt).show(), this;
  }
  // Defines the shape as strokeable and fillable.
  strokeable() {
    return [o(this, rt)];
  }
  fillable() {
    return [o(this, rt)];
  }
  fill(t) {
    if (t !== void 0) {
      const [e, s] = t.split("/");
      o(this, H).fill.color = e, o(this, H).fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(o(this, H).fill), e.opacity(o(this, H).fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      o(this, H).stroke.color = s, o(this, H).stroke.opacity = n === void 0 ? 1 : +n, o(this, H).stroke.width = e ?? o(this, H).stroke.width;
    }
    return typeof t == "number" && e === void 0 && (o(this, H).stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(o(this, H).stroke), s.opacity(o(this, H).stroke.opacity);
    }), [o(this, rt).reference("marker-start"), o(this, rt).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s == null || s.children().forEach((n) => {
        n.attr({
          fill: o(this, H).stroke.color,
          stroke: o(this, H).stroke.color,
          "stroke-width": o(this, H).stroke.width
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
    return t ? (o(this, pt).clear(), this) : (o(this, pt).children().forEach((e) => {
      e.attr("id") !== `${o(this, bt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || o(this, ee)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return f(this, wt, new Go(
      o(this, pt),
      o(this, bt),
      {
        text: t ?? o(this, bt),
        asHtml: e ?? !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    )), this.updateLabel(), o(this, wt);
  }
  get label() {
    return o(this, wt);
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return o(this, wt) ? (o(this, wt).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = o(this, wt)) == null ? void 0 : t.config.text) ?? o(this, bt);
  }
  move(t) {
    if (St(t)) {
      const e = X(t.x, this.graphConfig), s = X(t.y, this.graphConfig);
      o(this, rt).translate(e, -s);
    } else if (typeof t == "number") {
      const e = X(t, this.graphConfig);
      o(this, rt).translate(e, 0);
    }
    return this;
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.filter((a) => typeof a == "number")[0]) ?? 10, n = (e == null ? void 0 : e.filter((a) => typeof a == "string")[0]) ?? void 0, r = Ye(
      o(this, Dt),
      s,
      n
    ), h = o(this, rt);
    return t === "start" ? (h.marker("start", r.start), this) : t === "end" ? (h.marker("end", r.end), this) : (h.marker("start", r.start), h.marker("end", r.end), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
Dt = new WeakMap(), bt = new WeakMap(), pt = new WeakMap(), rt = new WeakMap(), H = new WeakMap(), ge = new WeakMap(), ee = new WeakMap(), wt = new WeakMap();
var g, ye, xe, Re, Ri;
class ot extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, Re);
    p(this, g);
    p(this, ye);
    p(this, xe);
    return f(this, g, Object.assign(
      { shape: "line" },
      n
    )), f(this, xe, { x: 0, y: 0 }), f(this, ye, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = x(this, Re, Ri).call(this), this.computed(), this;
  }
  get angle() {
    return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
  }
  computed() {
    let e = { x: 0, y: 0 };
    if (o(this, g).through && o(this, g).through.A && o(this, g).through.B)
      this.start = o(this, g).through.A, this.end = o(this, g).through.B, e = this.direction;
    else if (o(this, g).director && o(this, g).director.A && o(this, g).director.d)
      this.start = o(this, g).director.A, this.end = {
        x: o(this, g).director.A.x + o(this, g).director.d.x,
        y: o(this, g).director.A.y + o(this, g).director.d.y
      }, e = o(this, g).director.d;
    else if (o(this, g).parallel && o(this, g).parallel.to && o(this, g).parallel.through)
      this.start = o(this, g).parallel.through, e = o(this, g).parallel.to.direction;
    else if (o(this, g).perpendicular && o(this, g).perpendicular.to && o(this, g).perpendicular.through)
      this.start = o(this, g).perpendicular.through, e = o(this, g).perpendicular.to.normal;
    else if (o(this, g).mediator && o(this, g).mediator.A && o(this, g).mediator.B)
      this.start = {
        x: (o(this, g).mediator.A.x + o(this, g).mediator.B.x) / 2,
        y: (o(this, g).mediator.A.y + o(this, g).mediator.B.y) / 2
      }, e = {
        x: o(this, g).mediator.B.y - o(this, g).mediator.A.y,
        y: -(o(this, g).mediator.B.x - o(this, g).mediator.A.x)
      };
    else if (o(this, g).bisector && ("d1" in o(this, g).bisector && "d2" in o(this, g).bisector, "A" in o(this, g).bisector && "B" in o(this, g).bisector && "C" in o(this, g).bisector)) {
      const { A: n, B: r, C: h } = o(this, g).bisector, a = new R(n, r), c = a.norm, u = new R(n, h), l = u.norm;
      this.start = n, e = {
        x: a.x / c + u.x / l,
        y: a.y / c + u.y / l
      };
    }
    if (o(this, g).shape === void 0 || o(this, g).shape === "line" || o(this, g).shape === "ray") {
      const n = Jt(
        this.start,
        e,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        o(this, g).shape === "ray"
      );
      n !== null && (this.start = n[0], this.end = n[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  get config() {
    return o(this, g);
  }
  set config(e) {
    f(this, g, e), x(this, Re, Ri).call(this);
  }
  get direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y
    };
  }
  get end() {
    return o(this, ye);
  }
  set end(e) {
    f(this, ye, e);
  }
  follow(e, s) {
    return this.math.projection({ x: e, y: s });
  }
  get math() {
    return new ls(this.start, this.end);
  }
  move(e) {
    if (typeof e == "number") {
      const s = new R(this.normal).setLength(e);
      return this.move(s);
    }
    return super.move(e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    if (o(this, g).shape === "segment") {
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
    return o(this, xe);
  }
  set start(e) {
    f(this, xe, e);
  }
}
g = new WeakMap(), ye = new WeakMap(), xe = new WeakMap(), Re = new WeakSet(), Ri = function() {
  if (this.element.clear(), this.shape = this.element.line(
    this.start.x,
    this.start.y,
    this.end.x,
    this.end.y
  ), o(this, g).shape === "vector") {
    const e = Ye(this.rootSVG, 10).end;
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var j, P, Mt, Qt;
class N extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, Mt);
    // Coordinates of the point in pixels
    p(this, j);
    p(this, P);
    return f(this, j, { x: NaN, y: NaN }), f(this, P, Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    )), this.computed(), this.shape = x(this, Mt, Qt).call(this), this;
  }
  get config() {
    return o(this, P);
  }
  set config(e) {
    f(this, P, e), x(this, Mt, Qt).call(this);
  }
  get size() {
    return o(this, P).size;
  }
  set size(e) {
    o(this, P).size = e, x(this, Mt, Qt).call(this);
  }
  get pixels() {
    return o(this, j);
  }
  set pixels(e) {
    f(this, j, e), this.shape.center(o(this, j).x, o(this, j).y);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return ji(o(this, j), this.graphConfig);
  }
  get x() {
    return o(this, j).x;
  }
  set x(e) {
    o(this, j).x = e, this.shape.center(e, o(this, j).y);
  }
  get y() {
    return o(this, j).y;
  }
  set y(e) {
    o(this, j).y = e, this.shape.center(o(this, j).x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, x(this, Mt, Qt).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, x(this, Mt, Qt).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, x(this, Mt, Qt).call(this), this;
  }
  computed() {
    if (o(this, P).coordinates)
      return this.pixels = X(o(this, P).coordinates, this.graphConfig), this;
    if (o(this, P).middle) {
      const e = o(this, P).middle.A, s = o(this, P).middle.B;
      return o(this, j).x = (e.x + s.x) / 2, o(this, j).y = (e.y + s.y) / 2, this;
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
        const r = new R(s.direction).normal, a = new R(e, s.start).projection(r);
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
        const r = new R(o(this, P).direction.perpendicular ? s.normal : s.direction).unit, h = X(n, this.graphConfig);
        return this.x = e.x + h * r.x, this.y = e.y + h * r.y, this;
      }
      if (s.A && s.B) {
        const r = new R(s.A, s.B);
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
      const n = ji(o(this, j), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
}
j = new WeakMap(), P = new WeakMap(), Mt = new WeakSet(), Qt = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(o(this, j).x, o(this, j).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(o(this, j).x, o(this, j).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(
        `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
      ).center(o(this, j).x, o(this, j).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var ct, jt, ni, hn;
class si extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, ni);
    p(this, ct);
    p(this, jt);
    return f(this, ct, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = x(this, ni, hn).call(this), f(this, jt, new ii(o(this, ct).expression)), this.computed(), this;
  }
  get config() {
    return o(this, ct);
  }
  set config(e) {
    f(this, ct, e), f(this, jt, new ii(o(this, ct).expression)), this.computed();
  }
  computed() {
    const e = o(this, ct).expression;
    if (!e || e === "")
      return this;
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = o(this, ct).domain ?? { min: s, max: n }, h = o(this, ct).image ?? { min: -1 / 0, max: 1 / 0 }, a = o(this, ct).samples ?? this.graphConfig.axis.x.x, c = o(this, jt), u = [];
    for (let w = r.min; w < r.max; w += 1 / a) {
      const v = c.evaluate({ x: w });
      if (isNaN(v) || v === 1 / 0 || v === -1 / 0 || v < h.min || v > h.max) {
        const L = X({ x: w, y: 0 }, this.graphConfig);
        u.push({ x: L.x, y: NaN });
      } else
        u.push(X({ x: w, y: v }, this.graphConfig));
    }
    let l = u[0];
    const d = u.map(({ x: w, y: v }, L) => {
      let A = L === 0 ? "M" : "L";
      return isNaN(v) ? (A = "M", v = -123456789) : l.y === -123456789 && (A = "M"), l = { x: w, y: v }, `${A} ${w} ${v}`;
    }).join(" ");
    return this.shape.plot(d), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: o(this, jt).evaluate({ x: e }) } : X(
      { x: e, y: o(this, jt).evaluate({ x: e }) },
      this.graphConfig
    );
  }
  follow(e, s) {
    const n = ji({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
ct = new WeakMap(), jt = new WeakMap(), ni = new WeakSet(), hn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var _t, Fe, Fi;
class Ho extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, Fe);
    p(this, _t);
    f(this, _t, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), x(this, Fe, Fi).call(this), this.computed();
  }
  get config() {
    return o(this, _t);
  }
  set config(e) {
    f(this, _t, e), x(this, Fe, Fi).call(this);
  }
  get center() {
    return o(this, _t).center;
  }
  get radius() {
    return typeof o(this, _t).radius == "number" ? X(o(this, _t).radius, this.graphConfig) : us(this.center, o(this, _t).radius);
  }
  computed() {
    const e = this.shape;
    return e.radius(this.radius), e.center(this.center.x, this.center.y), this;
  }
  moveLabel() {
    return this.label && this.label.move(
      this.center.x + this.radius / 2,
      this.center.y - this.radius / 2
    ), this;
  }
  follow(e, s) {
    const n = this.radius, r = e - this.center.x, h = s - this.center.y, a = Math.sqrt(r ** 2 + h ** 2);
    return e = r / a * n + this.center.x, s = h / a * n + this.center.y, { x: e, y: s };
  }
}
_t = new WeakMap(), Fe = new WeakSet(), Fi = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var M, Ht, Bi, qi;
class Yo extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ht);
    p(this, M);
    f(this, M, Object.assign({
      shape: "polygon"
    }, n)), x(this, Ht, qi).call(this), this.computed();
  }
  get config() {
    return o(this, M);
  }
  set config(e) {
    f(this, M, e), x(this, Ht, qi).call(this);
  }
  get vertices() {
    return o(this, M).vertices;
  }
  get radius() {
    return o(this, M).regular ? typeof o(this, M).regular.radius == "number" ? X(o(this, M).regular.radius, this.graphConfig) : o(this, M).vertices && St(o(this, M).vertices[0]) && St(o(this, M).regular.radius) ? us(o(this, M).vertices[0], o(this, M).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (o(this, M).vertices && o(this, M).vertices.length > 2)
      e.plot(x(this, Ht, Bi).call(this));
    else if (o(this, M).regular) {
      const s = [], n = this.radius, r = new R(
        o(this, M).regular.center,
        St(o(this, M).regular.radius) ? o(this, M).regular.radius : { x: o(this, M).regular.center.x, y: o(this, M).regular.center.y - n }
      );
      for (let h = 0; h < o(this, M).regular.sides; h++)
        s.push([
          o(this, M).regular.center.x + r.x,
          o(this, M).regular.center.y + r.y
        ]), r.rotate(360 / o(this, M).regular.sides);
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
M = new WeakMap(), Ht = new WeakSet(), Bi = function() {
  var s;
  const e = [];
  return (s = o(this, M).vertices) == null || s.forEach((n) => {
    St(n) && e.push([n.x, n.y]);
  }), e;
}, qi = function() {
  var s;
  this.element.clear();
  const e = x(this, Ht, Bi).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), o(this, M).mark) {
    const n = ((s = o(this, M).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
      (h, a) => (h.x += a[0], h.y += a[1], h),
      { x: 0, y: 0 }
    );
    r.x /= e.length, r.y /= e.length, e.forEach((h) => {
      const a = new R(r, { x: h[0], y: h[1] });
      n && a.setLength(n * 20), this.element.line(r.x, r.y, r.x + a.x, r.y + a.y).stroke({ color: "gray", width: 0.5 });
    });
  }
  return this.shape;
};
var V, ue, an, Vi;
class Wo extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, ue);
    p(this, V);
    return this.static = !0, f(this, V, Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    )), this.shape = x(this, ue, an).call(this), this.computed(), this;
  }
  get config() {
    return o(this, V);
  }
  set config(e) {
    f(this, V, e), this.computed();
  }
  computed() {
    const s = [
      ...x(this, ue, Vi).call(this, o(this, V).axis.x, o(this, V).axis.y),
      ...x(this, ue, Vi).call(this, o(this, V).axis.y, o(this, V).axis.x)
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
V = new WeakMap(), ue = new WeakSet(), an = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, Vi = function(e, s) {
  let n = +o(this, V).origin.x, r = +o(this, V).origin.y;
  const h = [];
  let a = Jt(
    { x: n, y: r },
    e,
    o(this, V).width,
    o(this, V).height
  );
  for (; a; )
    if (h.push(a), n += s.x, r -= s.y, a = Jt(
      { x: n, y: r },
      e,
      o(this, V).width,
      o(this, V).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  for (n = o(this, V).origin.x - s.x, r = o(this, V).origin.y + s.y, a = Jt(
    { x: n, y: r },
    e,
    o(this, V).width,
    o(this, V).height
  ); a; )
    if (h.push(a), n -= s.x, r += s.y, a = Jt(
      { x: n, y: r },
      e,
      o(this, V).width,
      o(this, V).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  return h;
};
var K, ri, oi, cn;
class Ko extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, oi);
    p(this, K);
    p(this, ri);
    f(this, K, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), f(this, ri, Ye(this.rootSVG, 8)), this.config = n;
  }
  get config() {
    return o(this, K);
  }
  set config(e) {
    f(this, K, e), x(this, oi, cn).call(this), this.computed();
  }
  get center() {
    return o(this, K).center;
  }
  get start() {
    return o(this, K).start;
  }
  get end() {
    return o(this, K).end;
  }
  get radius() {
    return typeof o(this, K).radius == "number" ? X(o(this, K).radius, this.graphConfig) : us(this.center, o(this, K).radius ?? o(this, K).start);
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new R(this.center, this.start).unit, r = new R(this.center, this.end).unit, h = n.add(r).unit, a = this.center.x + s * h.x * (e + 20), c = this.center.y + s * h.y * (e + 20);
    return s * h.x > 0 && s * h.y > 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y > 0 ? this.label.config.alignement = "ml" : s * h.x > 0 && s * h.y < 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, c), this;
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return on((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +_s(this.center, this.start).toFixed(10),
      end: +_s(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = o(this, K).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = ws(this.center.x, this.center.y, n, e), h = ws(this.center.x, this.center.y, n, s);
    return o(this, K).morphToSquare && this.isSquare ? this._describeSquare(this.center, r, h) : this._describeArc(this.center, r, h, n, s - e);
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
    return o(this, K).sector && (u = u.concat(["L", e.x, e.y, "L", s.x, s.y])), u.join(" ");
  }
}
K = new WeakMap(), ri = new WeakMap(), oi = new WeakSet(), cn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var mt, Rt, It, un, ln, Gi;
class Zo extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, It);
    p(this, mt);
    p(this, Rt);
    return this.static = !0, Object.values($e).includes(n) ? f(this, mt, x(this, It, un).call(this, n)) : f(this, mt, n), f(this, Rt, x(this, It, ln).call(this)), this.computed(), this;
  }
  get config() {
    return o(this, mt);
  }
  set config(e) {
    f(this, mt, e), this.computed();
  }
  get xAxis() {
    return o(this, Rt).x;
  }
  get yAxis() {
    return o(this, Rt).y;
  }
  computed() {
    return x(this, It, Gi).call(this, o(this, Rt).x, o(this, mt).x.direction, o(this, mt).x), x(this, It, Gi).call(this, o(this, Rt).y, o(this, mt).y.direction, o(this, mt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
mt = new WeakMap(), Rt = new WeakMap(), It = new WeakSet(), un = function(e) {
  return $e.POLAR, {
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
}, ln = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, Gi = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", h = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, u = Ye(this.rootSVG, 10).end.fill(r), l = Jt(
    this.graphConfig.origin,
    s,
    this.graphConfig.width,
    this.graphConfig.height,
    h,
    a,
    c
  );
  return l !== null && e.plot(l[0].x, l[0].y, l[1].x, l[1].y), e.stroke({ color: r, width: 1 }).marker("end", u), this.shape.add(e), e;
};
var kt, be, hi, fn;
class Qo extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, hi);
    p(this, kt);
    p(this, be);
    return f(this, kt, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), f(this, be, {
      x: new ii(o(this, kt).expressions.x),
      y: new ii(o(this, kt).expressions.y)
    }), this.shape = x(this, hi, fn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, kt);
  }
  set config(e) {
    f(this, kt, e), this.computed();
  }
  computed() {
    const e = o(this, kt).samples ?? this.graphConfig.axis.x.x, s = o(this, kt).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
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
    return X(
      {
        x: o(this, be).x.evaluate({ t: e }),
        y: o(this, be).y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
kt = new WeakMap(), be = new WeakMap(), hi = new WeakSet(), fn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var vt, Ct, ie, Ft, we, ai, dn;
class Jo extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, ai);
    p(this, vt);
    p(this, Ct);
    p(this, ie);
    p(this, Ft);
    p(this, we);
    return f(this, vt, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", f(this, Ct, o(this, vt).follow.follow(0, 0)), f(this, ie, { x: 0, y: 0 }), f(this, we, this.element.line()), f(this, Ft, this.element.circle(o(this, vt).size).center(o(this, Ct).x, o(this, Ct).y)), this.shape = x(this, ai, dn).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let h = this.rootSVG.node.createSVGPoint();
      h.x = r.clientX, h.y = r.clientY, h = h.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const a = o(this, vt).follow.follow(h.x, h.y);
      isNaN(a.y) ? o(this, Ft).hide() : (o(this, Ft).show(), o(this, Ft).center(a.x, a.y), f(this, Ct, a), f(this, ie, o(this, vt).follow.follow(h.x + 0.01, h.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return o(this, vt);
  }
  set config(e) {
    f(this, vt, e), this.computed();
  }
  computed() {
    const e = Jt(
      o(this, Ct),
      {
        x: o(this, ie).x - o(this, Ct).x,
        y: o(this, ie).y - o(this, Ct).y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (o(this, we).plot(
      e[0].x,
      e[0].y,
      e[1].x,
      e[1].y
    ), this);
  }
  moveLabel() {
    return this;
  }
  strokeable() {
    return [o(this, we)];
  }
  fillable() {
    return [o(this, Ft)];
  }
}
vt = new WeakMap(), Ct = new WeakMap(), ie = new WeakMap(), Ft = new WeakMap(), we = new WeakMap(), ai = new WeakSet(), dn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var gt, ci, pn;
class th extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, ci);
    p(this, gt);
    return console.log("FILL BETWR"), f(this, gt, Object.assign({
      samples: 100
    }, n)), this.shape = x(this, ci, pn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, gt);
  }
  set config(e) {
    f(this, gt, e), this.computed();
  }
  get domain() {
    return o(this, gt).domain ? X(o(this, gt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return o(this, gt).image ? X(o(this, gt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = o(this, gt).expressions, n = this.domain;
    this.image;
    function r(u, l) {
      const [d, m, w] = u;
      return `${l === 0 ? "M" : d} ${m ?? 0} ${w ?? 0}`;
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
gt = new WeakMap(), ci = new WeakSet(), pn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var G, ui, mn;
class eh extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, ui);
    p(this, G);
    f(this, G, Object.assign({}, n)), this.shape = x(this, ui, mn).call(this), this.computed();
  }
  get config() {
    return o(this, G);
  }
  set config(e) {
    f(this, G, e), this.computed();
  }
  get rectangles() {
    return o(this, G).rectangles;
  }
  set rectangles(e) {
    o(this, G).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return o(this, G).position < 0 && (o(this, G).position = 0), o(this, G).position > 1 && (o(this, G).position = 1), o(this, G).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), o(this, G).position = e;
  }
  computed() {
    this.shape.clear();
    const e = X(o(this, G).domain, this.graphConfig), n = (e.max - e.min) / o(this, G).rectangles, r = (o(this, G).domain.max - o(this, G).domain.min) / o(this, G).rectangles, h = this.graphConfig.origin.y;
    for (let a = 0; a < o(this, G).rectangles; a += 1) {
      const c = e.min + a * n, u = o(this, G).domain.min + (a + this.position) * r, l = o(this, G).follow.evaluate(u).y;
      this.shape.add(
        this.element.rect(n, Math.abs(h - l)).move(c, l)
      );
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
G = new WeakMap(), ui = new WeakSet(), mn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Bt, li, gn;
class ih extends nt {
  constructor(e, s, n) {
    super(e, s);
    p(this, li);
    p(this, Bt, "");
    n && (f(this, Bt, n), this.computed(), x(this, li, gn).call(this));
  }
  computed() {
    return this;
  }
  get d() {
    return o(this, Bt);
  }
  set d(e) {
    f(this, Bt, e), this.shape.plot(o(this, Bt));
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
Bt = new WeakMap(), li = new WeakSet(), gn = function() {
  return this.clear(), this.shape = this.element.path(o(this, Bt)).fill("none").stroke({ color: "black", width: 1 }), this.shape;
};
var O, Tt, Z, U, F, _e, Be, Ui;
class sh {
  constructor(t, e) {
    p(this, Be);
    p(this, O);
    p(this, Tt);
    p(this, Z);
    p(this, U);
    p(this, F);
    p(this, _e);
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return f(this, O, Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: $e.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e)), f(this, _e, (e == null ? void 0 : e.tex) ?? ((h) => h)), f(this, Tt, Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display)), f(this, F, nn().addTo(s).viewbox(0, 0, o(this, O).width, o(this, O).height)), o(this, F).data("config", {
      width: o(this, O).width,
      height: o(this, O).height,
      origin: o(this, O).origin,
      // grids: this.#grids,
      axis: o(this, O).axis
    }), f(this, U, {}), Object.values(rn).forEach((h) => {
      o(this, U)[h] = o(this, F).group().attr("id", `LAYER_${h}`);
    }), f(this, Z, {}), x(this, Be, Ui).call(this), this;
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), f(this, Z, {});
  }
  get config() {
    return o(this, O);
  }
  set config(t) {
    f(this, O, t);
  }
  coordinate_system(t) {
    const e = new Zo(
      o(this, F),
      "COORDINATE_SYSTEM",
      t
    );
    return o(this, U).axis.add(e.element), e;
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        St(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new N(
          o(this, F),
          e,
          n
        );
        return o(this, U).points.add(r.element), o(this, Z)[e] = r, s && r.addLabel(
          e,
          s.html,
          o(this, _e)
        ), r;
      },
      line: (t, e) => {
        const s = new ot(o(this, F), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      path: (t, e) => {
        const s = new ih(o(this, F), e, t);
        return o(this, U).main.add(s.element), s;
      },
      plot: (t, e) => {
        const s = new si(o(this, F), e, t);
        return o(this, U).plots.add(s.element), o(this, Z)[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new Qo(o(this, F), e, t);
        return o(this, U).plots.add(s.element), o(this, Z)[e] = s, s;
      },
      circle: (t, e) => {
        const s = new Ho(o(this, F), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new Yo(o(this, F), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      arc: (t, e) => {
        const s = new Ko(o(this, F), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      follow: (t, e) => {
        const s = new Jo(o(this, F), e, t);
        return o(this, U).plots_FG.add(s.element), o(this, Z)[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new th(o(this, F), e, t);
        return o(this, U).plots_BG.add(s.element), o(this, Z)[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new eh(o(this, F), e, t);
        return o(this, U).plots_BG.add(s.element), o(this, Z)[e] = s, s;
      }
    };
  }
  get display() {
    return o(this, Tt);
  }
  set display(t) {
    f(this, Tt, t);
  }
  draggable(t, e, s) {
    const n = (r) => {
      var l;
      const h = t, { box: a } = r.detail;
      let { x: c, y: u } = a;
      if (r.preventDefault(), !(c < 0 || c > o(this, O).width - a.width / 2) && !(u < 0 || u > o(this, O).height - a.height / 2)) {
        if ((l = s == null ? void 0 : s.follow) != null && l.length) {
          let d = { x: c, y: u };
          s.follow.forEach((m) => {
            m instanceof nt ? d = m.follow(c, u) : typeof m == "string" ? d = this.follow(m, h)(c, u) : d = m(c, u), c = d.x, u = d.y;
          });
        }
        h.pixels.x === c && h.pixels.y === u || (h.pixels = { x: c, y: u }, e instanceof N && (e.pixels = { x: c, y: u }), s != null && s.callback && s.callback(t), this.update([t.name, e.name]));
      }
    };
    return o(this, U).interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", n), t;
  }
  get figures() {
    return o(this, Z);
  }
  // Default follow function
  follow(t, e) {
    return t === "Ox" ? (s, n) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = o(this, O).axis.x.x, h = o(this, O).axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / h) * h, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
  grid(t, e) {
    const s = new Wo(o(this, F), t, {
      axis: e,
      origin: o(this, O).origin,
      width: o(this, O).width,
      height: o(this, O).height,
      subdivisions: 0
    });
    return o(this, U).grids.add(s.element), s;
  }
  get layers() {
    return o(this, U);
  }
  marker(t) {
    return Ye(o(this, F), t);
  }
  get rootSVG() {
    return o(this, F);
  }
  subgrid(t, e) {
    const s = {
      x: { x: o(this, O).axis.x.x / e, y: o(this, O).axis.x.y / e },
      y: { x: o(this, O).axis.y.x / e, y: o(this, O).axis.y.y / e }
    };
    return this.grid(t, s);
  }
  toPixels(t, e) {
    return X(t, this.config, e);
  }
  get toTex() {
    return o(this, _e);
  }
  // Update each figures in the graph
  update(t, e) {
    t === void 0 && (t = []), Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  // Update the layout of the graph
  updateLayout() {
    o(this, F).viewbox(0, 0, o(this, O).width, o(this, O).height), o(this, F).data("config", {
      width: o(this, O).width,
      height: o(this, O).height,
      origin: o(this, O).origin,
      axis: o(this, O).axis
    }), x(this, Be, Ui).call(this), this.update([], !0);
  }
}
O = new WeakMap(), Tt = new WeakMap(), Z = new WeakMap(), U = new WeakMap(), F = new WeakMap(), _e = new WeakMap(), Be = new WeakSet(), Ui = function() {
  o(this, U).grids.clear(), o(this, U).axis.clear(), o(this, Tt).subgrid && this.subgrid("SUBGRID", o(this, Tt).subgrid).stroke("purple/0.5", 0.1), o(this, Tt).grid && this.grid("MAINGRID", o(this, O).axis).stroke("lightgray", 1), o(this, Tt).axis && this.coordinate_system(o(this, O).system);
};
var S = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(S || {});
function J(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const nh = [
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
function rh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof N && (r instanceof N || typeof r == "number"))
      return { center: n, radius: r };
  }
  return null;
}
function oh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.ARC.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof N && r instanceof N && h instanceof N)
      return { start: n, center: r, end: h, radius: a };
  }
  return null;
}
function $t(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.LINE.toString() || i.key === S.SEGMENT.toString() || i.key === S.VECTOR.toString() || i.key === S.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof N && r instanceof N) {
      let h = "line";
      switch (i.key) {
        case S.SEGMENT.toString():
          h = "segment";
          break;
        case S.VECTOR.toString():
          h = "vector";
          break;
        case S.RAY.toString():
          h = "ray";
          break;
      }
      return {
        through: { A: n, B: r },
        shape: h
      };
    }
  }
  if (i.key === S.LINE.toString() && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const m = J([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: 0, y: m }, e), d: { x: 1, y: 0 } },
        shape: "line"
      };
    }
    if (n.startsWith("x=")) {
      const m = J([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: m, y: 0 }, e), d: { x: 0, y: 1 } },
        shape: "line"
      };
    }
    const [r, h] = n.split("="), a = ks(r), c = ks(h), u = {
      a: a.a - c.a,
      b: a.b - c.b,
      c: a.c - c.c
    }, l = X({ x: 0, y: -u.c / u.b }, e), d = {
      x: -u.b,
      y: u.a
    };
    return {
      director: { A: l, d },
      shape: "line"
    };
  }
  if (i.key === S.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof N && r instanceof N)
      return { mediator: { A: n, B: r } };
  }
  if (i.key === S.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof N)
      return { perpendicular: { to: n, through: r } };
  }
  if (i.key === S.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof N)
      return { parallel: { to: n, through: r } };
  }
  if (i.key === S.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof ot)
      return { bisector: { d1: n, d2: r } };
  }
  if (i.key === S.BISECTOR.toString() && s.length === 3) {
    const [n, r, h] = s;
    if (r instanceof N && n instanceof N && h instanceof N)
      return { bisector: { A: r, B: n, C: h } };
  }
  return null;
}
function ks(i) {
  const t = i.split(/([+-][0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = t.filter((r) => r.includes("x")).map((r) => r === "x" ? "1" : r.replace("x", ""))[0] ?? "0", s = t.filter((r) => r.includes("y")).map((r) => r === "y" ? "1" : r.replace("y", ""))[0] ?? "0", n = t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? "0";
  return {
    a: J([e], {})[0],
    b: J([s], {})[0],
    c: J([n], {})[0]
  };
}
function hh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.PLOT.toString()) {
    const [n, ...r] = s, h = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((u) => Gt(u));
    a.length > 0 && (h.domain = a[0]), a.length > 1 && (h.image = a[1]);
    const c = r.filter((u) => typeof u == "number");
    return c.length > 0 && (h.samples = c[0] > 0 ? c[0] : 10), h;
  }
  return null;
}
function ah(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return { expressions: { x: n, y: r } };
  }
  return null;
}
function ch(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof si)
      return {
        follow: n,
        tangent: r === "show"
      };
  }
  return null;
}
function uh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.FILL_BETWEEN.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof si && r instanceof si)
      return {
        expressions: [n, r],
        domain: Gt(h) ? h : { min: NaN, max: NaN },
        image: Gt(a) ? a : { min: NaN, max: NaN }
      };
  }
  return null;
}
function lh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.RIEMANN.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    return {
      follow: n,
      domain: Gt(r) ? r : { min: NaN, max: NaN },
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
  const h = fh(i, t);
  return h ? Object.assign(h, { shape: s, size: n }) : null;
}
function fh(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.POINT.toString()) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === S.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && r instanceof N)
      return { middle: { A: n, B: r } };
  }
  if (i.key === S.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && (r instanceof ot || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === S.INTERSECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if ((n instanceof ot || n === "Ox" || n === "Oy") && (r instanceof ot || r === "Ox" || r === "Oy"))
      return { intersection: { A: n, B: r } };
  }
  if (i.key === S.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && (r instanceof N || r instanceof ot || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === S.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof N && (r instanceof ot || r === "Ox" || r === "Oy") && typeof h == "number")
      return {
        direction: {
          direction: r,
          distance: h,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === S.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof N && r instanceof N)
      return {
        direction: {
          point: a instanceof N ? a : n,
          direction: { A: n, B: r },
          distance: typeof h == "number" ? h : 1
        }
      };
  }
  return null;
}
function vs(i, t, e) {
  const s = J(i.values, t);
  if (i.key === S.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof N))
      return { vertices: n };
  }
  if (i.key === S.REGULAR.toString() && s.length >= 3) {
    const [n, r, h] = s;
    if (n instanceof N && (typeof r == "number" || r instanceof N) && typeof h == "number")
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
const Cs = {
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
    build: $t,
    create: "line"
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: $t,
    create: "line"
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: $t,
    create: "line"
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: $t,
    create: "line"
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: $t,
    create: "line"
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: $t,
    create: "line"
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: $t,
    create: "line"
  },
  // tangent: {
  // name: 'tangent',
  //     description: 'Create a tangent line from a point to a circle',
  //     code: 'd=tan <point>,<point>',
  //     parameters: []
  // },
  bis: {
    name: "bisector",
    description: "Create the bisector of an angle",
    code: "d=bis <point>,<point>,<point>",
    parameters: [],
    build: $t,
    create: "line"
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: rh,
    create: "circle"
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: oh,
    create: "arc"
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: hh,
    create: "plot"
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: ah,
    create: "parametric"
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: vs,
    create: "polygon"
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: vs,
    create: "polygon"
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: ch,
    create: "follow"
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: uh,
    create: "fillbetween"
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: lh,
    create: "riemann"
  }
};
function Ae(i) {
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
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(Ae) : i;
}
function Ci(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((s) => s.replace("ESCAPESPLITTER", t));
}
function dh(i) {
  if (!i.includes("=")) return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var qt, se, ut, ne, re, le, yn, Xi;
class ph {
  constructor(t) {
    p(this, le);
    p(this, qt);
    p(this, se, "->");
    p(this, ut, ",");
    p(this, ne, "/");
    p(this, re, []);
    var e, s, n;
    t && (f(this, qt, t.formatter ?? void 0), (e = t.splitter) != null && e.main && f(this, se, t.splitter.main), (s = t.splitter) != null && s.entry && f(this, ut, t.splitter.entry), (n = t.splitter) != null && n.parameter && f(this, ne, t.splitter.parameter), t.keys && f(this, re, t.keys));
  }
  get splitter() {
    return {
      main: o(this, se),
      entry: o(this, ut),
      parameter: o(this, ne)
    };
  }
  set splitter_main(t) {
    f(this, se, t);
  }
  set splitter_entry(t) {
    f(this, ut, t);
  }
  set splitter_parameter(t) {
    f(this, ne, t);
  }
  get formatter() {
    return o(this, qt);
  }
  set formatter(t) {
    f(this, qt, t);
  }
  get keys() {
    return o(this, re);
  }
  set keys(t) {
    f(this, re, t);
  }
  parse(t) {
    const [e, s] = t.split(o(this, se)), n = o(this, qt) ? o(this, qt).call(this, e) : e.trim(), { name: r, key: h, values: a } = x(this, le, yn).call(this, n), c = x(this, le, Xi).call(this, s);
    return { name: r, key: h, values: a, parameters: c };
  }
  parameters(t, e) {
    return x(this, le, Xi).call(this, t, e ?? o(this, re));
  }
}
qt = new WeakMap(), se = new WeakMap(), ut = new WeakMap(), ne = new WeakMap(), re = new WeakMap(), le = new WeakSet(), yn = function(t) {
  const [e, ...s] = t.split(" "), [n, r] = e.split("="), h = Ci(
    s.join(" "),
    o(this, ut)
  ).map((a) => Ae(a));
  return { name: n, key: r, values: h };
}, Xi = function(t, e) {
  if (t === void 0)
    return {};
  let s;
  e === void 0 || e.length === 0 ? s = Ci(t, o(this, ut)) : s = t.split(new RegExp(`(?=${o(this, ut)}${e.join(`|${o(this, ut)}`)})`)).map((r) => {
    let h = r.trim();
    return h.startsWith(",") && (h = h.slice(1).trim()), h.endsWith(",") && (h = h.slice(0, -1)), Ci(h, o(this, ut)).join(o(this, ut));
  });
  const n = {};
  return s.forEach((r) => {
    const { key: h, value: a } = dh(r);
    if (a.match(/^[-.\d]+\/[-.\d]+$/)) {
      n[h] = {
        value: Ae(a),
        options: []
      };
      return;
    }
    const [c, ...u] = a.split(o(this, ne));
    n[h] = {
      value: Ae(c),
      options: u.map((l) => Ae(l))
    };
  }), n;
};
const Ts = [
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
var oe, Vt, ke, z, xn, bn, Hi, wn, _n, kn, vn, Cn, Tn, Nn, Sn;
class _h extends sh {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    p(this, z);
    p(this, oe);
    p(this, Vt);
    p(this, ke);
    return f(this, ke, new ph({
      formatter: (n) => x(this, z, vn).call(this, n),
      keys: Ts,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    })), f(this, Vt, {}), s != null && s.parameters && this.refreshLayout(s.parameters), f(this, oe, []), s != null && s.code && x(this, z, Hi).call(this, s.code), this;
  }
  static documentation() {
    return Cs;
  }
  get code() {
    return o(this, oe);
  }
  /**
   * Refresh the code to display
   * @param code Code to parse and display
   */
  refresh(e) {
    this.clear(), x(this, z, Hi).call(this, e);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(e) {
    const s = x(this, z, kn).call(this, e);
    this.config = s.config, this.display = s.display, f(this, Vt, s.settings), this.updateLayout();
  }
}
oe = new WeakMap(), Vt = new WeakMap(), ke = new WeakMap(), z = new WeakSet(), /**
 * Prepare the code to load
 * @param input Input code to parse and prepare
 * @returns 
 */
xn = function(e) {
  const s = [], n = e.split(`
`).map((h) => h.trim()).filter((h) => h.trim() !== "" && !h.startsWith("$")), r = {};
  for (const h of n) {
    if (h.startsWith("@")) {
      const { key: c, value: u } = x(this, z, _n).call(this, h);
      r[c] = { value: u, options: [] };
      continue;
    }
    const a = o(this, ke).parse(h);
    a.parameters = Object.assign(
      a.parameters,
      r
    ), s.push(a);
  }
  return s;
}, bn = function(e) {
  let s = e, n = 1;
  for (; this.figures[s]; )
    s = `${e}_${n}`, n++;
  return s;
}, /**
 * Build the figures from the code
 */
Hi = function(e) {
  f(this, oe, x(this, z, xn).call(this, e));
  const s = Cs, n = this.create;
  o(this, oe).forEach((r) => {
    r.name = x(this, z, bn).call(this, r.name);
    let h;
    if (s[r.key]) {
      const { build: a, create: c, parameters: u } = s[r.key];
      if (u && u.length > 0 && Object.keys(r.parameters).length === 0 && Object.keys(r.parameters).filter((d) => u.includes(d)).forEach((d) => {
        r.parameters[d] = { value: !0, options: [] };
      }), Object.hasOwn(n, c))
        try {
          const l = a(r, this.figures, this.config);
          l && (h = this.create[c](l, r.name));
        } catch (l) {
          console.log(l);
        }
    }
    h && (o(this, Vt).label && h instanceof N && r.parameters.label === void 0 && r.parameters.tex === void 0 && (r.parameters.label = { value: !0, options: [] }), o(this, Vt).tex && h instanceof N && r.parameters.label === void 0 && r.parameters.tex === void 0 && (r.parameters.tex = { value: !0, options: [] }), h instanceof N && o(this, Vt).points === !1 && (r.parameters["!"] = { value: !0, options: [] }), x(this, z, wn).call(this, r.parameters, h));
  });
}, wn = function(e, s) {
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
        s.mark(
          e[n].value,
          e[n].options
        );
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
        if (s.addLabel(
          e[n].value === !0 ? s.name : e[n].value,
          n === "tex",
          this.toTex
        ), s.label) {
          const h = e[n].options[0] === !1 ? "br" : e[n].options[0], a = e[n].options[1] ?? { x: 0, y: 0 }, c = {
            x: a.x * this.config.axis.x.x,
            y: -a.y * this.config.axis.y.y
          };
          s.label.position(
            h,
            c
          );
        }
        break;
      case "drag":
        x(this, z, Sn).call(this, s, n, e);
        break;
      default:
        nh.includes(n) && s.stroke(n);
    }
  });
}, _n = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, kn = function(e) {
  const s = o(this, ke).parameters(e ?? "", Ts), n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && Gt(s.x.value) ? s.x.value : { min: -8, max: 8 }, h = s.y && Gt(s.y.value) ? s.y.value : { min: -8, max: 8 }, a = Math.abs(r.max - r.min), c = Math.abs(h.max - h.min), u = a * n, l = c * n, d = {
    x: -r.min * n,
    y: h.max * n
  }, m = $e.CARTESIAN_2D, w = {
    x: { x: n, y: 0 },
    y: { x: 0, y: -n }
  }, v = !!s.grid, L = !!s.axis, A = s.subgrid ? parseFloat(s.subgrid.value) : 0, B = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: u,
      height: l,
      origin: d,
      system: m,
      axis: w
    },
    display: {
      grid: v,
      subgrid: A,
      axis: L
    },
    settings: B
  };
}, vn = function(e) {
  return e.match(/^[A-Z][0-9]*\(.*\)$/) ? x(this, z, Cn).call(this, e) : e.match(/^[a-z][0-9]*\([x|t]\)/) ? x(this, z, Nn).call(this, e) : e.includes("=") && !e.includes(" ") ? x(this, z, Tn).call(this, e) : e;
}, // TO BE MOVED TO BUILD_POINT
Cn = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
  return `${s}=pt ${n[0]},${n[1]}`;
}, // TO BE MOVED TO BUILD_LINE
Tn = function(e) {
  const [s, ...n] = e.split("=");
  let r = n.join("="), h = r[0];
  h !== "v" && h !== "[" && (h = null);
  let a = r[r.length - 1];
  a !== "." && a !== "]" && a !== "[" && (a = null);
  let c = "line";
  h === "v" && a === null ? (r = r.slice(1), c = "vec") : h === null && a === "." || h === "[" && a === "]" ? (h === "[" && (r = r.slice(1)), r = r.slice(0, -1), c = "seg") : (h === "[" && a === "[" || h === null && a === "[" || h === "[" && a === null) && (h === "[" && (r = r.slice(1)), a === "[" && (r = r.slice(0, -1)), c = "ray");
  const u = r.split(/(?=[A-Z])/);
  return `${s}=${c} ${u[0]},${u[1]}`;
}, // TO BE MOVED TO BUILD_PLOT
Nn = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], h = e.includes("(x)=") ? S.PLOT : S.PARAMETRIC;
  return `${r}=${h} ${n}`;
}, Sn = function(e, s, n) {
  if (e instanceof N) {
    const r = [], h = [], a = new N(this.rootSVG, e.name + "_drag", {
      coordinates: { x: 0, y: 0 }
    });
    a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[s].value, ...n[s].options].forEach((u) => {
      if (["grid", "Ox", "Oy"].includes(u) && r.push(this.follow(u, e)), Gt(u)) {
        const l = u.axis ?? "x", d = this.toPixels(u, l);
        r.push(
          (m, w) => ({
            x: l === "x" ? Math.max(d.min, Math.min(m, d.max)) : m,
            y: l === "y" ? Math.max(d.min, Math.min(w, d.max)) : w
          })
        );
      }
      if (Object.hasOwn(this.figures, u)) {
        const l = this.figures[u];
        h.push((d, m) => l.follow(d, m));
      }
    }), this.draggable(
      a,
      e,
      {
        follow: [
          ...r,
          ...h
        ]
      }
    );
  }
};
export {
  _h as PiDraw,
  sh as PiGraph
};
