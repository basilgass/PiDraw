var xn = Object.defineProperty;
var ss = (i) => {
  throw TypeError(i);
};
var bn = (i, t, e) => t in i ? xn(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var tt = (i, t, e) => bn(i, typeof t != "symbol" ? t + "" : t, e), ai = (i, t, e) => t.has(i) || ss("Cannot " + e);
var o = (i, t, e) => (ai(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? ss("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, s) => (ai(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), x = (i, t, e) => (ai(i, t, "access private method"), e);
const gi = {}, xs = [];
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
  bs(Object.getOwnPropertyNames(t)), gi[i] = Object.assign(gi[i] || {}, t);
}
function it(i) {
  return gi[i] || {};
}
function wn() {
  return [...new Set(xs)];
}
function bs(i) {
  xs.push(...i);
}
function Ri(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function _n(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function ci(i) {
  return i % 360 * Math.PI / 180;
}
function kn(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function ws(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function ge(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function yi(i, t) {
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
const vn = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), xi = (i) => vn.has(i.nodeName), _s = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, Fi = "http://www.w3.org/2000/svg", Cn = "http://www.w3.org/1999/xhtml", ui = "http://www.w3.org/2000/xmlns/", Ee = "http://www.w3.org/1999/xlink", C = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function Tn() {
  return C.window;
}
class Bi {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const te = {}, qi = "___SYMBOL___ROOT___";
function _e(i, t = Fi) {
  return C.document.createElementNS(t, i);
}
function J(i, t = !1) {
  if (i instanceof Bi) return i;
  if (typeof i == "object")
    return li(i);
  if (i == null)
    return new te[qi]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return li(C.document.querySelector(i));
  const e = t ? C.document.createElement("div") : _e("svg");
  return e.innerHTML = i, i = li(e.firstChild), e.removeChild(e.firstChild), i;
}
function D(i, t) {
  return t && (t instanceof C.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : _e(i);
}
function ut(i) {
  if (!i) return null;
  if (i.instance instanceof Bi) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new te.Fragment(i);
  let t = ws(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : te[t] || (t = "Dom"), new te[t](i);
}
let li = ut;
function T(i, t = i.name, e = !1) {
  return te[t] = i, e && (te[qi] = i), bs(Object.getOwnPropertyNames(i.prototype)), i;
}
function Nn(i) {
  return te[i];
}
let On = 1e3;
function ks(i) {
  return "Svgjs" + ws(i) + On++;
}
function vs(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    vs(i.children[t]);
  return i.id && (i.id = ks(i.nodeName)), i;
}
function k(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function j(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function An() {
  return this.parent().children();
}
function In() {
  return this.parent().index(this);
}
function Sn() {
  return this.siblings()[this.position() + 1];
}
function Mn() {
  return this.siblings()[this.position() - 1];
}
function Ln() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function En() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function Pn() {
  return this.parent().add(this.remove()), this;
}
function zn() {
  return this.parent().add(this.remove(), 0), this;
}
function jn(i) {
  i = J(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function Dn(i) {
  i = J(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function $n(i) {
  return i = J(i), i.before(this), this;
}
function Rn(i) {
  return i = J(i), i.after(this), this;
}
_("Dom", {
  siblings: An,
  position: In,
  next: Sn,
  prev: Mn,
  forward: Ln,
  backward: En,
  front: Pn,
  back: zn,
  before: jn,
  after: Dn,
  insertBefore: $n,
  insertAfter: Rn
});
const Cs = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Fn = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, Bn = /rgb\((\d+),(\d+),(\d+)\)/, qn = /(#[a-z_][a-z0-9\-_]*)/i, Vn = /\)\s*,?\s*/, Gn = /\s/g, ns = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, rs = /^rgb\(/, os = /^(\s+)?$/, hs = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Un = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, Mt = /[\s,]+/, Vi = /[MLHVCSQTAZ]/i;
function Xn() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(Mt);
}
function Hn(i) {
  return this.classes().indexOf(i) !== -1;
}
function Yn(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function Wn(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function Kn(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
_("Dom", {
  classes: Xn,
  hasClass: Hn,
  addClass: Yn,
  removeClass: Wn,
  toggleClass: Kn
});
function Zn(i, t) {
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
          i[s] == null || os.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || os.test(t) ? "" : t
  ), this;
}
function Qn() {
  return this.css("display", "");
}
function Jn() {
  return this.css("display", "none");
}
function tr() {
  return this.css("display") !== "none";
}
_("Dom", {
  css: Zn,
  show: Qn,
  hide: Jn,
  visible: tr
});
function er(i, t, e) {
  if (i == null)
    return this.data(
      Ri(
        _n(
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
_("Dom", { data: er });
function ir(i, t) {
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
function sr() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function nr() {
  return this._memory = this._memory || {};
}
_("Dom", { remember: ir, forget: sr, memory: nr });
function rr(i) {
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
function or(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function ne(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function hr(i, t) {
  const e = ne(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : ne(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : ne(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : ne(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : ne(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : ne(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function ar(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function fi(i, t, e) {
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
    return typeof t == "string" && (ns.test(t) || rs.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((m) => m / 255), a = Math.min(1 - n, 1 - r, 1 - h);
    if (a === 1)
      return new E(0, 0, 0, 1, "cmyk");
    const c = (1 - n - a) / (1 - a), u = (1 - r - a) / (1 - a), l = (1 - h - a) / (1 - a);
    return new E(c, u, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((L) => L / 255), a = Math.max(n, r, h), c = Math.min(n, r, h), u = (a + c) / 2, l = a === c, f = a - c, m = l ? 0 : u > 0.5 ? f / (2 - a - c) : f / (a + c), b = l ? 0 : a === n ? ((r - h) / f + (r < h ? 6 : 0)) / 6 : a === r ? ((h - n) / f + 2) / 6 : a === h ? ((n - r) / f + 4) / 6 : 0;
    return new E(360 * b, 100 * m, 100 * u, "hsl");
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
      const f = hr(t, e);
      Object.assign(this, f);
    } else if (typeof t == "string")
      if (rs.test(t)) {
        const f = t.replace(Gn, ""), [m, b, v] = Bn.exec(f).slice(1, 4).map((L) => parseInt(L));
        Object.assign(this, { _a: m, _b: b, _c: v, _d: 0, space: "rgb" });
      } else if (ns.test(t)) {
        const f = (L) => parseInt(L, 16), [, m, b, v] = Fn.exec(rr(t)).map(f);
        Object.assign(this, { _a: m, _b: b, _c: v, _d: 0, space: "rgb" });
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
    if (ar(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: b, a: v, b: L } = this;
        if (this.space === "lch") {
          const { c: Gt, h: Fe } = this, Be = Math.PI / 180;
          v = Gt * Math.cos(Be * Fe), L = Gt * Math.sin(Be * Fe);
        }
        const A = (b + 16) / 116, F = v / 500 + A, lt = A - L / 200, ft = 16 / 116, Lt = 8856e-6, Et = 7.787;
        t = 0.95047 * (F ** 3 > Lt ? F ** 3 : (F - ft) / Et), e = 1 * (A ** 3 > Lt ? A ** 3 : (A - ft) / Et), s = 1.08883 * (lt ** 3 > Lt ? lt ** 3 : (lt - ft) / Et);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, h = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, c = 31308e-7, u = n > c ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > c ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, f = h > c ? 1.055 * a(h, 1 / 2.4) - 0.055 : 12.92 * h;
      return new E(255 * u, 255 * l, 255 * f);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new E(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, h = 255 * fi(r, n, t + 1 / 3), a = 255 * fi(r, n, t), c = 255 * fi(r, n, t - 1 / 3);
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
    const [t, e, s] = this._clamped().map(or);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((F) => F / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, u = h > 0.04045 ? Math.pow((h + 0.055) / 1.055, 2.4) : h / 12.92, l = (a * 0.4124 + c * 0.3576 + u * 0.1805) / 0.95047, f = (a * 0.2126 + c * 0.7152 + u * 0.0722) / 1, m = (a * 0.0193 + c * 0.1192 + u * 0.9505) / 1.08883, b = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, v = f > 8856e-6 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, L = m > 8856e-6 ? Math.pow(m, 1 / 3) : 7.787 * m + 16 / 116;
    return new E(b, v, L, "xyz");
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
let Y = class Ts {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new Ts(this);
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
function cr(i, t) {
  return new Y(i, t).transformO(this.screenCTM().inverseO());
}
function re(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class y {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, h = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, u = t.shear || 0, l = t.rotate || t.theta || 0, f = new Y(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), m = f.x, b = f.y, v = new Y(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), L = v.x, A = v.y, F = new Y(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), lt = F.x, ft = F.y, Lt = new Y(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Et = Lt.x, Gt = Lt.y;
    return {
      scaleX: a,
      scaleY: c,
      skewX: r,
      skewY: h,
      shear: u,
      theta: l,
      rx: Et,
      ry: Gt,
      tx: lt,
      ty: ft,
      ox: m,
      oy: b,
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
    const s = this.a, n = this.b, r = this.c, h = this.d, a = this.e, c = this.f, u = s * h - n * r, l = u > 0 ? 1 : -1, f = l * Math.sqrt(s * s + n * n), m = Math.atan2(l * n, l * s), b = 180 / Math.PI * m, v = Math.cos(m), L = Math.sin(m), A = (s * r + n * h) / u, F = r * f / (A * s - n) || h * f / (A * n + s), lt = a - t + t * v * f + e * (A * v * f - L * F), ft = c - e + t * L * f + e * (A * L * f + v * F);
    return {
      // Return the affine parameters
      scaleX: f,
      scaleY: F,
      shear: A,
      rotate: b,
      translateX: lt,
      translateY: ft,
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
    return re(this.a, e.a) && re(this.b, e.b) && re(this.c, e.c) && re(this.d, e.d) && re(this.e, e.e) && re(this.f, e.f);
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
    return t = t instanceof yt ? t.matrixify() : typeof t == "string" ? y.fromArray(t.split(Mt).map(parseFloat)) : Array.isArray(t) ? y.fromArray(t) : typeof t == "object" && y.isMatrixLike(t) ? t : typeof t == "object" ? new y().transform(t) : arguments.length === 6 ? y.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, h = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const c = n / a, u = -e / a, l = -s / a, f = t / a, m = -(c * r + l * h), b = -(u * r + f * h);
    return this.a = c, this.b = u, this.c = l, this.d = f, this.e = m, this.f = b, this;
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
    t = ci(t);
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
    arguments.length === 3 && (n = s, s = e, e = t), t = ci(t), e = ci(e);
    const r = Math.tan(t), h = Math.tan(e), { a, b: c, c: u, d: l, e: f, f: m } = this;
    return this.a = a + c * r, this.b = c + a * h, this.c = u + l * r, this.d = l + u * h, this.e = f + m * r - n * r, this.f = m + f * h - s * h, this;
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
function ur() {
  return new y(this.node.getCTM());
}
function lr() {
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
function Pt() {
  if (!Pt.nodes) {
    const i = J().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    Pt.nodes = { svg: i, path: t };
  }
  if (!Pt.nodes.svg.node.parentNode) {
    const i = C.document.body || C.document.documentElement;
    Pt.nodes.svg.addTo(i);
  }
  return Pt.nodes;
}
function Ns(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function fr(i) {
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
    return t = typeof t == "string" ? t.split(Mt).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return Ns(this);
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
function Os(i, t, e) {
  let s;
  try {
    if (s = t(i.node), Ns(s) && !fr(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function dr() {
  const e = Os(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(Pt().svg).show(), h = r.node.getBBox();
      return r.remove(), h;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new W(e);
}
function pr(i) {
  const s = Os(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new W(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function mr(i, t) {
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
class ee extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
k([ee], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const gr = ["toArray", "constructor", "each"];
ee.extend = function(i) {
  i = i.reduce((t, e) => (gr.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), k([ee], i);
};
function ye(i, t) {
  return new ee(
    Ri((t || C.document).querySelectorAll(i), function(e) {
      return ut(e);
    })
  );
}
function yr(i) {
  return ye(i, this.node);
}
function xr(i) {
  return ut(this.node.querySelector(i));
}
let br = 0;
const As = {};
function Is(i) {
  let t = i.getEventHolder();
  return t === C.window && (t = As), t.events || (t.events = {}), t.events;
}
function Gi(i) {
  return i.getEventTarget();
}
function wr(i) {
  let t = i.getEventHolder();
  t === C.window && (t = As), t.events && (t.events = {});
}
function ke(i, t, e, s, n) {
  const r = e.bind(s || i), h = J(i), a = Is(h), c = Gi(h);
  t = Array.isArray(t) ? t : t.split(Mt), e._svgjsListenerId || (e._svgjsListenerId = ++br), t.forEach(function(u) {
    const l = u.split(".")[0], f = u.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][f] = a[l][f] || {}, a[l][f][e._svgjsListenerId] = r, c.addEventListener(l, r, n || !1);
  });
}
function Tt(i, t, e, s) {
  const n = J(i), r = Is(n), h = Gi(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(Mt), t.forEach(function(a) {
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
      wr(n);
    }
  }));
}
function _r(i, t, e, s) {
  const n = Gi(i);
  return t instanceof C.window.Event || (t = new C.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Pe extends Bi {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return _r(this, t, e, s);
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
    return ke(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
T(Pe, "EventTarget");
function as() {
}
const we = {
  duration: 400,
  ease: ">",
  delay: 0
}, kr = {
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
class me extends Array {
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
    return t instanceof Array ? t : t.trim().split(Mt).map(parseFloat);
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
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(Cs), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof w && (this.value = t.valueOf(), this.unit = t.unit), this;
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
const vr = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Ss = [];
function Cr(i) {
  Ss.push(i);
}
function Tr(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = hs.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? kr[i] : hs.test(t) ? parseFloat(t) : t;
      t = Ss.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new w(t) : vr.has(i) && E.isColor(t) ? t = new E(t) : t.constructor === Array && (t = new me(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class Bt extends Pe {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = J(t), t.removeNamespace && this.node instanceof C.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return J(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new ee(
      Ri(this.node.children, function(t) {
        return ut(t);
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
    return e && (s = vs(s)), new this.constructor(s);
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
    return this.put(new Bt(_e(t), e));
  }
  // Get first child
  first() {
    return ut(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return ut(this.node.childNodes[t]);
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
    return this.xml(t, e, Cn);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = ks(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return ut(this.node.lastChild);
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
    if (e = ut(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = ut(e.node.parentNode));
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
    return this.xml(t, e, Fi);
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
        if (a = ut(a.node.cloneNode(!0)), e) {
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
    const n = _e("wrapper", s), r = C.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const h = this.parent();
    return e ? this.replace(r) && h : this.add(r);
  }
}
k(Bt, { attr: Tr, find: yr, findOne: xr });
T(Bt, "Dom");
class yt extends Bt {
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
    const s = new ee();
    let n = this;
    for (; (n = n.parent()) && n.node !== C.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(qn);
    return e ? J(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(Nn(qi));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = ge(this, t, e);
    return this.width(new w(s.width)).height(new w(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return _s(this, this.dom), super.writeDataToDom();
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
k(yt, {
  bbox: dr,
  rbox: pr,
  inside: mr,
  point: cr,
  ctm: ur,
  screenCTM: lr
});
T(yt, "Element");
const be = {
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
    if (typeof s == "string" || s instanceof E || E.isRgb(s) || s instanceof yt)
      this.attr(i, s);
    else
      for (e = be[i].length - 1; e >= 0; e--)
        s[be[i][e]] != null && this.attr(be.prefix(i, be[i][e]), s[be[i][e]]);
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
    return (this._element || this).type === "radialGradient" ? this.attr("r", new w(i)) : this.rx(i).ry(t);
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
const Nr = [
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
_("Element", Nr);
function Or() {
  return this.attr("transform", null);
}
function Ar() {
  return (this.attr("transform") || "").split(Vn).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(Mt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(y.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new y());
}
function Ir(i, t) {
  if (this === i) return this;
  if (xi(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function Sr(i) {
  return this.toParent(this.root(), i);
}
function Mr(i, t) {
  if (i == null || typeof i == "string") {
    const n = new y(this).decompose();
    return i == null ? n : n[i];
  }
  y.isMatrixLike(i) || (i = { ...i, origin: yi(i, this) });
  const e = t === !0 ? this : t || !1, s = new y(e).transform(i);
  return this.attr("transform", s);
}
_("Element", {
  untransform: Or,
  matrixify: Ar,
  toParent: Ir,
  toRoot: Sr,
  transform: Mr
});
class st extends yt {
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
class Ui extends st {
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
T(Ui, "Defs");
class ht extends yt {
}
T(ht, "Shape");
function Xi(i) {
  return this.attr("rx", i);
}
function Hi(i) {
  return this.attr("ry", i);
}
function Ms(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function Ls(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function Es(i) {
  return this.attr("cx", i);
}
function Ps(i) {
  return this.attr("cy", i);
}
function zs(i) {
  return i == null ? this.rx() * 2 : this.rx(new w(i).divide(2));
}
function js(i) {
  return i == null ? this.ry() * 2 : this.ry(new w(i).divide(2));
}
const Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: Es,
  cy: Ps,
  height: js,
  rx: Xi,
  ry: Hi,
  width: zs,
  x: Ms,
  y: Ls
}, Symbol.toStringTag, { value: "Module" }));
class si extends ht {
  constructor(t, e = t) {
    super(D("ellipse", t), e);
  }
  size(t, e) {
    const s = ge(this, t, e);
    return this.rx(new w(s.width).divide(2)).ry(
      new w(s.height).divide(2)
    );
  }
}
k(si, Lr);
_("Container", {
  // Create an ellipse
  ellipse: j(function(i = 0, t = i) {
    return this.put(new si()).size(i, t).move(0, 0);
  })
});
T(si, "Ellipse");
class Ds extends Bt {
  constructor(t = C.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new Bt(_e("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
T(Ds, "Fragment");
function $s(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new w(i), fy: new w(t) }) : this.attr({ x1: new w(i), y1: new w(t) });
}
function Rs(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new w(i), cy: new w(t) }) : this.attr({ x2: new w(i), y2: new w(t) });
}
const Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: $s,
  to: Rs
}, Symbol.toStringTag, { value: "Module" }));
class ze extends st {
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
    return ye("svg [fill*=" + this.id() + "]");
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
k(ze, Er);
_({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: j(function(i, t) {
      return this.put(new ze(i)).update(t);
    })
  }
});
T(ze, "Gradient");
class ve extends st {
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
    return ye("svg [fill*=" + this.id() + "]");
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
    pattern: j(function(i, t, e) {
      return this.put(new ve()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
T(ve, "Pattern");
class ni extends ht {
  constructor(t, e = t) {
    super(D("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new C.window.Image();
    return ke(
      s,
      "load",
      function(n) {
        const r = this.parent(ve);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof ve && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), ke(s, "load error", function() {
      Tt(s);
    }), this.attr("href", s.src = t, Ee);
  }
}
Cr(function(i, t, e) {
  return (i === "fill" || i === "stroke") && Un.test(t) && (t = e.root().defs().image(t)), t instanceof ni && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
_({
  Container: {
    // create image element, load image and set its size
    image: j(function(i, t) {
      return this.put(new ni()).size(0, 0).load(i, t);
    })
  }
});
T(ni, "Image");
class qt extends me {
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(Mt).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
const Pr = qt;
function zr(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function jr(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function Dr(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function $r(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: Pr,
  height: $r,
  width: Dr,
  x: zr,
  y: jr
}, Symbol.toStringTag, { value: "Module" }));
let Ce = class extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("line", t), e);
  }
  // Get array
  array() {
    return new qt([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new qt(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = ge(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
k(Ce, Yi);
_({
  Container: {
    // Create a line element
    line: j(function(...i) {
      return Ce.prototype.plot.apply(
        this.put(new Ce()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
T(Ce, "Line");
class Ve extends st {
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
    marker: j(function(i, t, e) {
      return this.put(new Ve()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof Ve ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
T(Ve, "Marker");
function he(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const Rr = {
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
class Wi {
  done() {
    return !1;
  }
}
class bi extends Wi {
  constructor(t = we.ease) {
    super(), this.ease = Rr[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class Ge extends Wi {
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
function cs() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), h = 3.9 / (r * i);
  this.d = 2 * r * h, this.k = h * h;
}
class Fr extends Ge {
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
k(Fr, {
  duration: he("_duration", cs),
  overshoot: he("_overshoot", cs)
});
class Br extends Ge {
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
k(Br, {
  windup: he("_windup"),
  p: he("P"),
  i: he("I"),
  d: he("D")
});
const qr = {
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
}, wi = {
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
}, di = "mlhvqtcsaz".split("");
for (let i = 0, t = di.length; i < t; ++i)
  wi[di[i]] = /* @__PURE__ */ function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let h = 0, a = s.length; h < a; ++h)
          s[h] = s[h] + (h % 2 ? n.y : n.x);
      return wi[e](s, n, r);
    };
  }(di[i].toUpperCase());
function Vr(i) {
  const t = i.segment[0];
  return wi[t](i.segment.slice(1), i.p, i.p0);
}
function _i(i) {
  return i.segment.length && i.segment.length - 1 === qr[i.segment[0].toUpperCase()];
}
function Gr(i, t) {
  i.inNumber && Xt(i, !1);
  const e = Vi.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function Xt(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, _i(i) && ki(i);
}
function ki(i) {
  i.inSegment = !1, i.absolute && (i.segment = Vr(i)), i.segments.push(i.segment);
}
function Ur(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function Xr(i) {
  return i.lastToken.toUpperCase() === "E";
}
const Hr = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function Yr(i, t = !0) {
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
    if (!(!n.inSegment && Gr(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          Xt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || Ur(n)) {
          n.inNumber = !0, n.number = s, Xt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (Hr.has(s)) {
        n.inNumber && Xt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !Xr(n)) {
          Xt(n, !1), --e;
          continue;
        }
        n.number += s, n.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        n.number += s, n.hasExponent = !0;
        continue;
      }
      if (Vi.test(s)) {
        if (n.inNumber)
          Xt(n, !1);
        else if (_i(n))
          ki(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && Xt(n, !1), n.inSegment && _i(n) && ki(n), n.segments;
}
function Wr(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class ie extends me {
  // Get bounding box of path
  bbox() {
    return Pt().path.setAttribute("d", this.toString()), new W(Pt.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), Yr(t);
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
    return Wr(this);
  }
}
const Fs = (i) => {
  const t = typeof i;
  return t === "number" ? w : t === "string" ? E.isColor(i) ? E : Mt.test(i) ? Vi.test(i) ? ie : me : Cs.test(i) ? w : vi : Ki.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? me : t === "object" ? Te : vi;
};
class Ht {
  constructor(t) {
    this._stepper = t || new bi("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
    this._type || this.type(Fs(t));
    let e = new this._type(t);
    return this._type === E && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Te && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class vi {
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
class je {
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
    }), Object.assign(this, je.defaults, t), this;
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
je.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Kr = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Te {
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
      const n = Fs(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(Kr), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const Ki = [vi, je, Te];
function Zr(i = []) {
  Ki.push(...[].concat(i));
}
function Qr() {
  k(Ki, {
    to(i) {
      return new Ht().type(this.constructor).from(this.toArray()).to(i);
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
class xe extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new ie(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new ie(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = ge(this, t, e);
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
xe.prototype.MorphArray = ie;
_({
  Container: {
    // Create a wrapped path element
    path: j(function(i) {
      return this.put(new xe()).plot(i || new ie());
    })
  }
});
T(xe, "Path");
function Jr() {
  return this._array || (this._array = new qt(this.attr("points")));
}
function to() {
  return delete this._array, this;
}
function eo(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function io(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new qt(i)
  );
}
function so(i, t) {
  const e = ge(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Jr,
  clear: to,
  move: eo,
  plot: io,
  size: so
}, Symbol.toStringTag, { value: "Module" }));
let De = class extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("polygon", t), e);
  }
};
_({
  Container: {
    // Create a wrapped polygon element
    polygon: j(function(i) {
      return this.put(new De()).plot(i || new qt());
    })
  }
});
k(De, Yi);
k(De, Bs);
T(De, "Polygon");
class $e extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("polyline", t), e);
  }
}
_({
  Container: {
    // Create a wrapped polygon element
    polyline: j(function(i) {
      return this.put(new $e()).plot(i || new qt());
    })
  }
});
k($e, Yi);
k($e, Bs);
T($e, "Polyline");
class ri extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("rect", t), e);
  }
}
k(ri, { rx: Xi, ry: Hi });
_({
  Container: {
    // Create a rect element
    rect: j(function(i, t) {
      return this.put(new ri()).size(i, t);
    })
  }
});
T(ri, "Rect");
class pi {
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
const S = {
  nextDraw: null,
  frames: new pi(),
  timeouts: new pi(),
  immediates: new pi(),
  timer: () => C.window.performance || C.window.Date,
  transforms: [],
  frame(i) {
    const t = S.frames.push({ run: i });
    return S.nextDraw === null && (S.nextDraw = C.window.requestAnimationFrame(S._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = S.timer().now() + t, s = S.timeouts.push({ run: i, time: e });
    return S.nextDraw === null && (S.nextDraw = C.window.requestAnimationFrame(S._draw)), s;
  },
  immediate(i) {
    const t = S.immediates.push(i);
    return S.nextDraw === null && (S.nextDraw = C.window.requestAnimationFrame(S._draw)), t;
  },
  cancelFrame(i) {
    i != null && S.frames.remove(i);
  },
  clearTimeout(i) {
    i != null && S.timeouts.remove(i);
  },
  cancelImmediate(i) {
    i != null && S.immediates.remove(i);
  },
  _draw(i) {
    let t = null;
    const e = S.timeouts.last();
    for (; (t = S.timeouts.shift()) && (i >= t.time ? t.run() : S.timeouts.push(t), t !== e); )
      ;
    let s = null;
    const n = S.frames.last();
    for (; s !== n && (s = S.frames.shift()); )
      s.run(i);
    let r = null;
    for (; r = S.immediates.shift(); )
      r();
    S.nextDraw = S.timeouts.first() || S.frames.first() ? C.window.requestAnimationFrame(S._draw) : null;
  }
}, no = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, ro = function() {
  const i = C.window;
  return (i.performance || i.Date).now();
};
class qs extends Pe {
  // Construct a new timeline on the given element
  constructor(t = ro) {
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
      return this._runners.map(no);
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
    return S.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = S.frame(this._step), this);
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
_({
  Element: {
    timeline: function(i) {
      return i == null ? (this._timeline = this._timeline || new qs(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class ot extends Pe {
  constructor(t) {
    super(), this.id = ot.id++, t = t ?? we.duration, t = typeof t == "function" ? new Ge(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof Ge, this._stepper = this._isDeclarative ? t : new bi(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new y(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, h = 0;
    return t = t ?? we.duration, e = e ?? we.delay, s = s || "last", typeof t == "object" && !(t instanceof Wi) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, h = t.wait ?? h, t = t.duration ?? we.duration), {
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
    const n = ot.sanitise(t, e, s), r = new ot(n.duration);
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
    return this._stepper = new bi(t), this;
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
        const L = h * Math.floor(v % (2 * (n + s)) / (n + s)), A = L && !a || !L && a, F = Math.pow(-1, A) * (v % (n + s)) / s + A;
        return Math.max(Math.min(F, 1), 0);
      }, b = r * (n + s) - n;
      return c = e <= 0 ? Math.round(m(1e-5)) : e < b ? m(e) : Math.round(m(b - 1e-5)), c;
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
      initialiser: t || as,
      runner: e || as,
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
    if (t instanceof qs || (s = e, e = t, t = this.timeline()), !t)
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
ot.id = 0;
class Ue {
  constructor(t = new y(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
k([ot, Ue], {
  mergeWith(i) {
    return new Ue(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const Vs = (i, t) => i.lmultiplyO(t), Gs = (i) => i.transforms;
function oo() {
  const t = this._transformationRunners.runners.map(Gs).reduce(Vs, new y());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class ho {
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
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new Ue()).forEach((s) => s.clearTransformsFromQueue()), this;
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
      const s = ot.sanitise(i, t, e), n = this.timeline();
      return new ot(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(Gs).reduce(Vs, new y());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), S.cancelImmediate(this._frameId), this._frameId = S.immediate(oo.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new ho().add(
        new Ue(new y(this))
      ));
    }
  }
});
const ao = (i, t) => i.filter((e) => !t.includes(e));
k(ot, {
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
    let n = new Ht(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(h) {
        return this.element()[i](n.at(h).valueOf()), n.done();
      },
      function(h) {
        const a = Object.keys(h), c = ao(a, r);
        if (c.length) {
          const l = this.element()[i](c), f = new Te(n.from()).valueOf();
          Object.assign(f, l), n.from(f);
        }
        const u = new Te(n.to()).valueOf();
        Object.assign(u, h), n.to(u), r = a, s = h;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new Ht(this._stepper).to(new w(i));
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
    const n = new Ht(this._stepper).type(
      e ? je : y
    );
    let r, h, a, c, u;
    function l() {
      h = h || this.element(), r = r || yi(i, h), u = new y(t ? void 0 : h), h._addRunner(this), t || h._clearTransformRunnersBefore(this);
    }
    function f(b) {
      t || this.clearTransform();
      const { x: v, y: L } = new Y(r).transform(
        h._currentTransform(this)
      );
      let A = new y({ ...i, origin: [v, L] }), F = this._isDeclarative && a ? a : u;
      if (e) {
        A = A.decompose(v, L), F = F.decompose(v, L);
        const ft = A.rotate, Lt = F.rotate, Et = [ft - 360, ft, ft + 360], Gt = Et.map((yn) => Math.abs(yn - Lt)), Fe = Math.min(...Gt), Be = Gt.indexOf(Fe);
        A.rotate = Et[Be];
      }
      t && (s || (A.rotate = i.rotate || 0), this._isDeclarative && c && (F.rotate = c)), n.from(F), n.to(A);
      const lt = n.at(b);
      return c = lt.rotate, a = new y(lt), this.addTransform(a), h._addRunner(this), n.done();
    }
    function m(b) {
      (b.origin || "center").toString() !== (i.origin || "center").toString() && (r = yi(b, h)), i = { ...b, origin: r };
    }
    return this.queue(l, f, m, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
    const e = new Ht(this._stepper).to(t);
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
    const e = new Ht(this._stepper).to(t);
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
    const n = new Ht(this._stepper).type(this._element.MorphArray).to(i);
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
k(ot, { rx: Xi, ry: Hi, from: $s, to: Rs });
T(ot, "Runner");
class Zi extends st {
  constructor(t, e = t) {
    super(D("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? ut(this.node.querySelector("defs")) || this.put(new Ui()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof C.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: Fi, version: "1.1" }).attr(
      "xmlns:xlink",
      Ee,
      ui
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, ui).attr("xmlns:svgjs", null, ui);
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
    nested: j(function() {
      return this.put(new Zi());
    })
  }
});
T(Zi, "Svg", !0);
let Qi = class extends st {
  // Initialize node
  constructor(t, e = t) {
    super(D("symbol", t), e);
  }
};
_({
  Container: {
    symbol: j(function() {
      return this.put(new Qi());
    })
  }
});
T(Qi, "Symbol");
function co(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(C.document.createTextNode(i)), this;
}
function uo() {
  return this.node.getComputedTextLength();
}
function lo(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function fo(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function po(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function mo(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function go(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function yo(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function xo(i) {
  return this.attr("x", i);
}
function bo(i) {
  return this.attr("y", i);
}
function wo(i, t) {
  return this.ax(i).ay(t);
}
function _o(i) {
  return this._build = !!i, this;
}
const Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: wo,
  ax: xo,
  ay: bo,
  build: _o,
  center: yo,
  cx: mo,
  cy: go,
  length: uo,
  move: po,
  plain: co,
  x: lo,
  y: fo
}, Symbol.toStringTag, { value: "Module" }));
class gt extends ht {
  // Initialize node
  constructor(t, e = t) {
    super(D("text", t), e), this.dom.leading = this.dom.leading ?? new w(1.3), this._rebuild = !0, this._build = !1;
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
        if (xi(this.node)) return;
        const h = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new w(h);
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
    return _s(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || xi(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && ut(e[n]).dom.newLined === !0 && (t += `
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
k(gt, Us);
_({
  Container: {
    // Create text element
    text: j(function(i = "") {
      return this.put(new gt()).text(i);
    }),
    // Create plain text element
    plain: j(function(i = "") {
      return this.put(new gt()).plain(i);
    })
  }
});
T(gt, "Text");
class oi extends ht {
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
    if (!(t instanceof gt))
      return this;
    const e = t.index(this), s = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new w(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
k(oi, Us);
_({
  Tspan: {
    tspan: j(function(i = "") {
      const t = new oi();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
T(oi, "Tspan");
let Ji = class extends ht {
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
    return this.radius(new w(t).divide(2));
  }
};
k(Ji, { x: Ms, y: Ls, cx: Es, cy: Ps, width: zs, height: js });
_({
  Container: {
    // Create circle element
    circle: j(function(i = 0) {
      return this.put(new Ji()).size(i).move(0, 0);
    })
  }
});
T(Ji, "Circle");
class Ci extends st {
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
    return ye("svg [clip-path*=" + this.id() + "]");
  }
}
_({
  Container: {
    // Create clipping element
    clip: j(function() {
      return this.defs().put(new Ci());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof Ci ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
T(Ci, "ClipPath");
class Xe extends yt {
  constructor(t, e = t) {
    super(D("foreignObject", t), e);
  }
}
_({
  Container: {
    foreignObject: j(function(i, t) {
      return this.put(new Xe()).size(i, t);
    })
  }
});
T(Xe, "ForeignObject");
function ko(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof Tn().SVGSVGElement ? new W(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new y(e), r = n.translate(i, t).transform(n.inverse()), h = new Y(s.x, s.y).transform(r);
    e.move(h.x, h.y);
  }), this;
}
function vo(i) {
  return this.dmove(i, 0);
}
function Co(i) {
  return this.dmove(0, i);
}
function To(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function No(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function Oo(i, t, e = this.bbox()) {
  const s = ge(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((h) => {
    const a = new Y(e).transform(new y(h).inverse());
    h.scale(n, r, a.x, a.y);
  }), this;
}
function Ao(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function Io(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function So(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const Xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: ko,
  dx: vo,
  dy: Co,
  height: To,
  move: No,
  size: Oo,
  width: Ao,
  x: Io,
  y: So
}, Symbol.toStringTag, { value: "Module" }));
class hi extends st {
  constructor(t, e = t) {
    super(D("g", t), e);
  }
}
k(hi, Xs);
_({
  Container: {
    // Create a group element
    group: j(function() {
      return this.put(new hi());
    })
  }
});
T(hi, "G");
class He extends st {
  constructor(t, e = t) {
    super(D("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, Ee);
  }
}
k(He, Xs);
_({
  Container: {
    // Create a hyperlink element
    link: j(function(i) {
      return this.put(new He()).to(i);
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
      return t || (t = new He(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
T(He, "A");
class Ti extends st {
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
    return ye("svg [mask*=" + this.id() + "]");
  }
}
_({
  Container: {
    mask: j(function() {
      return this.defs().put(new Ti());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof Ti ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
T(Ti, "Mask");
class Hs extends yt {
  constructor(t, e = t) {
    super(D("stop", t), e);
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
_({
  Gradient: {
    // Add a color stop
    stop: function(i, t, e) {
      return this.put(new Hs()).update(i, t, e);
    }
  }
});
T(Hs, "Stop");
function Mo(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += kn(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Ni extends yt {
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
    return this.addText(Mo(t, e));
  }
}
_("Dom", {
  style(i, t) {
    return this.put(new Ni()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Ni()).font(i, t, e);
  }
});
T(Ni, "Style");
class ts extends gt {
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
    textPath: j(function(i, t) {
      return i instanceof gt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: j(function(i, t = !0) {
      const e = new ts();
      i instanceof xe || (i = this.defs().path(i)), e.attr("href", "#" + i, Ee);
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
    text: j(function(i) {
      return i instanceof gt || (i = new gt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return ye("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
ts.prototype.MorphArray = ie;
T(ts, "TextPath");
class Ys extends ht {
  constructor(t, e = t) {
    super(D("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, Ee);
  }
}
_({
  Container: {
    // Create a use element
    use: j(function(i, t) {
      return this.put(new Ys()).use(i, t);
    })
  }
});
T(Ys, "Use");
const Ws = J;
k([Zi, Qi, ni, ve, Ve], it("viewbox"));
k([Ce, $e, De, xe], it("marker"));
k(gt, it("Text"));
k(xe, it("Path"));
k(Ui, it("Defs"));
k([gt, oi], it("Tspan"));
k([ri, si, ze, ot], it("radius"));
k(Pe, it("EventTarget"));
k(Bt, it("Dom"));
k(yt, it("Element"));
k(ht, it("Shape"));
k([st, Ds], it("Container"));
k(ze, it("Gradient"));
k(ot, it("Runner"));
ee.extend(wn());
Zr([
  w,
  E,
  W,
  y,
  me,
  qt,
  ie,
  Y
]);
Qr();
const us = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class Lo {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(us(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    ke(window, s, this.drag, this, { passive: !1 }), ke(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(us(t)), r = n.x - s.x, h = n.y - s.y;
    if (!r && !h) return e;
    const a = e.x + r, c = e.y + h;
    this.box = new W(a, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box
    }).defaultPrevented && this.move(a, c);
  }
  move(t, e) {
    this.el.type === "svg" ? hi.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), Tt(window, "mousemove.drag"), Tt(window, "touchmove.drag"), Tt(window, "mouseup.drag"), Tt(window, "touchend.drag"), this.init(!0);
  }
}
k(yt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new Lo(this)).init(i), this;
  }
});
function Nt(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function Ft(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var Ks = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(Ks || {}), Ne = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(Ne || {}), ae, Oe, B, et, Kt, Ot, At, Ae, Ie, Oi;
class Eo {
  constructor(t, e, s) {
    p(this, Ie);
    p(this, ae);
    p(this, Oe);
    p(this, B);
    p(this, et);
    p(this, Kt);
    p(this, Ot);
    p(this, At);
    p(this, Ae);
    d(this, ae, t), d(this, Oe, e), d(this, et, Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: (n) => n
      },
      s
    )), d(this, Kt, s.text ?? e), d(this, Ot, 0), d(this, At, 0), d(this, Ae, "display: block; position: fixed; white-space:nowrap"), d(this, B, x(this, Ie, Oi).call(this));
  }
  get config() {
    return o(this, et);
  }
  get x() {
    return o(this, Ot);
  }
  set x(t) {
    d(this, Ot, t);
  }
  get y() {
    return o(this, At);
  }
  set y(t) {
    d(this, At, t);
  }
  get asHtml() {
    return o(this, et).asHtml;
  }
  get shape() {
    return o(this, B);
  }
  get alignement() {
    return o(this, et).alignement;
  }
  // Get the label of the figure.
  get label() {
    return o(this, B);
  }
  get displayName() {
    return o(this, et).asHtml ? o(this, et).texConverter(o(this, Kt)) : o(this, Kt);
  }
  hide() {
    return o(this, B).hide(), this;
  }
  show() {
    return o(this, B).show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && d(this, Kt, t), x(this, Ie, Oi).call(this), this;
  }
  move(t, e) {
    return d(this, Ot, t), d(this, At, e), this.position(), this;
  }
  rotate(t) {
    return o(this, B).transform({
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
    return o(this, B) instanceof Xe ? (r = o(this, B).node.children[0].clientWidth, h = o(this, B).node.children[0].clientHeight, this.label.width(r), this.label.height(h)) : (r = o(this, B).length(), h = o(this, B).bbox().h), t.includes("l") ? s = s - r / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? s = s + r / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (s = +s), t.includes("t") ? n = n - h / 2 : t.includes("m") ? n = +n : t.includes("b") && (n = n + h / 2), o(this, B) instanceof Xe ? o(this, B).center(s + (e.x ?? 0), n - (e.y ?? 0)) : o(this, B).center(s + (e.x ?? 0), n - (e.y ?? 0)), this;
  }
}
ae = new WeakMap(), Oe = new WeakMap(), B = new WeakMap(), et = new WeakMap(), Kt = new WeakMap(), Ot = new WeakMap(), At = new WeakMap(), Ae = new WeakMap(), Ie = new WeakSet(), Oi = function() {
  return o(this, B) && o(this, B).remove(), d(this, B, o(this, et).asHtml ? o(this, ae).foreignObject(1, 1).attr("style", "overflow:visible").add(Ws(`<div style="${o(this, Ae)}">${this.displayName}</div>`, !0)) : o(this, ae).text(this.displayName)), o(this, B).attr("id", `${o(this, Oe)}-label`), o(this, B);
};
function Zs(i, t = 10) {
  return +i.toFixed(t);
}
function Po(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function es(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class R {
  constructor(t, e) {
    tt(this, "_x");
    tt(this, "_y");
    return this._x = 0, this._y = 0, Nt(t) && Nt(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : Nt(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
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
class is {
  constructor(t, e) {
    tt(this, "_A");
    tt(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new R(0, 0), e instanceof R)
      this._A = t, this._director = e;
    else
      return new is(t, new R(t, e));
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
    return Po(e) ? this._A.x : (t - this.ordinate) / this.slope;
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
class Ye {
  constructor(t, e) {
    tt(this, "_rpn");
    tt(this, "_expression");
    tt(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new zo(
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
        this._addToStack(e, Ai[s.token]);
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
    t.push(Zs(e));
  }
}
const Ai = {
  pi: Math.PI,
  e: Math.exp(1)
};
class zo {
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
      for (const r in Ai)
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
    for (const c in Ai)
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
            let f = l[l.length - 1];
            for (n = +c; f.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[h].associative === "left" && this._tokenConfig[h].precedence <= this._tokenConfig[f.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[h].associative === "right" && this._tokenConfig[h].precedence < this._tokenConfig[f.token].precedence); ) {
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
              f = l[l.length - 1];
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
  if (Ft(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return Nt(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function Ii(i, t) {
  return {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  };
}
function Wt(i, t, e, s, n = 0, r = !1, h) {
  let a = 0, c = 0, u = 0, l = 0;
  if (t.x === 0)
    a = i.x, r ? c = i.y + n : c = t.y > 0 ? +n : s - n, u = i.x, h ? l = t.y < 0 ? i.y + h * t.y : 0 + n : l = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? a = i.x - n : a = t.x > 0 ? 0 + n : e - n, c = i.y, h ? u = t.x > 0 ? i.x + h * t.x : 0 - n : u = t.x > 0 ? e - n : 0 + n, l = i.y;
  else {
    let f = 0, m = 0;
    t.x > 0 ? (f = r ? -n / t.x : h || (i.x - n) / t.x, m = h || (e - i.x - n) / t.x) : t.x < 0 && (f = r ? -n / t.x : h || (e - i.x - n) / t.x, m = h || (i.x - n) / t.x), f = Math.abs(f), m = Math.abs(m), a = i.x - f * t.x, c = i.y - f * t.y, u = i.x + m * t.x, l = i.y + m * t.y;
  }
  return a > e && u > e || a < 0 && u < 0 || c > s && l > s || c < 0 && l < 0 ? null : [{ x: a, y: c }, { x: u, y: l }];
}
function ls(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function fs(i, t) {
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
function Re(i, t, e) {
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
var zt, xt, dt, nt, H, ce, Zt, bt;
class at {
  constructor(t, e) {
    p(this, zt);
    p(this, xt);
    p(this, dt);
    p(this, nt);
    p(this, H);
    p(this, ce);
    p(this, Zt);
    p(this, bt);
    d(this, zt, t), d(this, xt, e), d(this, ce, !1), d(this, Zt, !1), d(this, bt, null), d(this, dt, o(this, zt).group().attr("id", o(this, xt))), d(this, H, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), d(this, nt, o(this, dt).path());
  }
  get element() {
    return o(this, dt);
  }
  get name() {
    return o(this, xt);
  }
  get rootSVG() {
    return o(this, zt);
  }
  get shape() {
    return o(this, nt);
  }
  set shape(t) {
    d(this, nt, t);
  }
  get appearance() {
    return o(this, H);
  }
  set appearance(t) {
    d(this, H, t);
  }
  get graphConfig() {
    return o(this, zt).data("config");
  }
  get static() {
    return o(this, ce);
  }
  set static(t) {
    d(this, ce, t);
  }
  get isDraggable() {
    return o(this, Zt);
  }
  set isDraggable(t) {
    d(this, Zt, t);
  }
  hide() {
    return o(this, dt).hide(), this;
  }
  show() {
    return o(this, dt).show(), this;
  }
  // Defines the shape as strokeable and fillable.
  strokeable() {
    return [o(this, nt)];
  }
  fillable() {
    return [o(this, nt)];
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
    }), [o(this, nt).reference("marker-start"), o(this, nt).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
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
    return t ? (o(this, dt).clear(), this) : (o(this, dt).children().forEach((e) => {
      e.attr("id") !== `${o(this, xt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || o(this, Zt)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return d(this, bt, new Eo(
      o(this, dt),
      o(this, xt),
      {
        text: t ?? o(this, xt),
        asHtml: e ?? !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    )), this.updateLabel(), o(this, bt);
  }
  get label() {
    return o(this, bt);
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return o(this, bt) ? (o(this, bt).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = o(this, bt)) == null ? void 0 : t.config.text) ?? o(this, xt);
  }
  move(t) {
    if (Nt(t)) {
      const e = X(t.x, this.graphConfig), s = X(t.y, this.graphConfig);
      o(this, nt).translate(e, -s);
    } else if (typeof t == "number") {
      const e = X(t, this.graphConfig);
      o(this, nt).translate(e, 0);
    }
    return this;
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.filter((a) => typeof a == "number")[0]) ?? 10, n = (e == null ? void 0 : e.filter((a) => typeof a == "string")[0]) ?? void 0, r = Re(
      o(this, zt),
      s,
      n
    ), h = o(this, nt);
    return t === "start" ? (h.marker("start", r.start), this) : t === "end" ? (h.marker("end", r.end), this) : (h.marker("start", r.start), h.marker("end", r.end), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
zt = new WeakMap(), xt = new WeakMap(), dt = new WeakMap(), nt = new WeakMap(), H = new WeakMap(), ce = new WeakMap(), Zt = new WeakMap(), bt = new WeakMap();
var g, ue, le, Se, Si;
class rt extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Se);
    p(this, g);
    p(this, ue);
    p(this, le);
    return d(this, g, Object.assign(
      { shape: "line" },
      n
    )), d(this, ue, { x: 0, y: 0 }), d(this, le, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = x(this, Se, Si).call(this), this.computed(), this;
  }
  get config() {
    return o(this, g);
  }
  set config(e) {
    d(this, g, e), x(this, Se, Si).call(this);
  }
  get start() {
    return o(this, ue);
  }
  set start(e) {
    d(this, ue, e);
  }
  get end() {
    return o(this, le);
  }
  set end(e) {
    d(this, le, e);
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
  get normal() {
    const e = this.direction;
    return {
      x: e.y,
      y: -e.x
    };
  }
  get math() {
    return new is(this.start, this.end);
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
    if (o(this, g).shape === void 0 || o(this, g).shape === "line" || o(this, g).shape === "half_line") {
      const n = Wt(
        this.start,
        e,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        o(this, g).shape === "half_line"
      );
      n !== null && (this.start = n[0], this.end = n[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
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
  move(e) {
    if (typeof e == "number") {
      const s = new R(this.normal).setLength(e);
      return this.move(s);
    }
    return super.move(e);
  }
  follow(e, s) {
    return this.math.projection({ x: e, y: s });
  }
}
g = new WeakMap(), ue = new WeakMap(), le = new WeakMap(), Se = new WeakSet(), Si = function() {
  if (this.element.clear(), this.shape = this.element.line(
    this.start.x,
    this.start.y,
    this.end.x,
    this.end.y
  ), o(this, g).shape === "vector") {
    const e = Re(this.rootSVG, 10).end;
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var $, P, It, Yt;
class O extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, It);
    // Coordinates of the point in pixels
    p(this, $);
    p(this, P);
    return d(this, $, { x: NaN, y: NaN }), d(this, P, Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    )), this.computed(), this.shape = x(this, It, Yt).call(this), this;
  }
  get config() {
    return o(this, P);
  }
  set config(e) {
    d(this, P, e), x(this, It, Yt).call(this);
  }
  get size() {
    return o(this, P).size;
  }
  set size(e) {
    o(this, P).size = e, x(this, It, Yt).call(this);
  }
  get pixels() {
    return o(this, $);
  }
  set pixels(e) {
    d(this, $, e), this.shape.center(o(this, $).x, o(this, $).y);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return Ii(o(this, $), this.graphConfig);
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
    return this.config.shape = "circle", this.config.size = e ?? 2, x(this, It, Yt).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, x(this, It, Yt).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, x(this, It, Yt).call(this), this;
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
      if (o(this, P).projection.axis instanceof rt) {
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
      if (s instanceof rt) {
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
      if (s instanceof rt) {
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
      const n = Ii(o(this, $), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
}
$ = new WeakMap(), P = new WeakMap(), It = new WeakSet(), Yt = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(o(this, $).x, o(this, $).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(o(this, $).x, o(this, $).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(
        `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
      ).center(o(this, $).x, o(this, $).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var ct, jt, Ke, Qs;
class We extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ke);
    p(this, ct);
    p(this, jt);
    return d(this, ct, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = x(this, Ke, Qs).call(this), d(this, jt, new Ye(o(this, ct).expression)), this.computed(), this;
  }
  get config() {
    return o(this, ct);
  }
  set config(e) {
    d(this, ct, e), d(this, jt, new Ye(o(this, ct).expression)), this.computed();
  }
  computed() {
    const e = o(this, ct).expression;
    if (!e || e === "")
      return this;
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = o(this, ct).domain ?? { min: s, max: n }, h = o(this, ct).image ?? { min: -1 / 0, max: 1 / 0 }, a = o(this, ct).samples ?? this.graphConfig.axis.x.x, c = o(this, jt), u = [];
    for (let b = r.min; b < r.max; b += 1 / a) {
      const v = c.evaluate({ x: b });
      if (isNaN(v) || v === 1 / 0 || v === -1 / 0 || v < h.min || v > h.max) {
        const L = X({ x: b, y: 0 }, this.graphConfig);
        u.push({ x: L.x, y: NaN });
      } else
        u.push(X({ x: b, y: v }, this.graphConfig));
    }
    let l = u[0];
    const f = u.map(({ x: b, y: v }, L) => {
      let A = L === 0 ? "M" : "L";
      return isNaN(v) ? (A = "M", v = -123456789) : l.y === -123456789 && (A = "M"), l = { x: b, y: v }, `${A} ${b} ${v}`;
    }).join(" ");
    return this.shape.plot(f), this;
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
    const n = Ii({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
ct = new WeakMap(), jt = new WeakMap(), Ke = new WeakSet(), Qs = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var wt, Me, Mi;
class jo extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Me);
    p(this, wt);
    d(this, wt, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), x(this, Me, Mi).call(this), this.computed();
  }
  get config() {
    return o(this, wt);
  }
  set config(e) {
    d(this, wt, e), x(this, Me, Mi).call(this);
  }
  get center() {
    return o(this, wt).center;
  }
  get radius() {
    return typeof o(this, wt).radius == "number" ? X(o(this, wt).radius, this.graphConfig) : es(this.center, o(this, wt).radius);
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
wt = new WeakMap(), Me = new WeakSet(), Mi = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var I, Vt, Li, Ei;
class Do extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Vt);
    p(this, I);
    d(this, I, Object.assign({
      shape: "polygon"
    }, n)), x(this, Vt, Ei).call(this), this.computed();
  }
  get config() {
    return o(this, I);
  }
  set config(e) {
    d(this, I, e), x(this, Vt, Ei).call(this);
  }
  get vertices() {
    return o(this, I).vertices;
  }
  get radius() {
    return o(this, I).regular ? typeof o(this, I).regular.radius == "number" ? X(o(this, I).regular.radius, this.graphConfig) : o(this, I).vertices && Nt(o(this, I).vertices[0]) && Nt(o(this, I).regular.radius) ? es(o(this, I).vertices[0], o(this, I).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (o(this, I).vertices && o(this, I).vertices.length > 2)
      e.plot(x(this, Vt, Li).call(this));
    else if (o(this, I).regular) {
      const s = [], n = this.radius, r = new R(
        o(this, I).regular.center,
        Nt(o(this, I).regular.radius) ? o(this, I).regular.radius : { x: o(this, I).regular.center.x, y: o(this, I).regular.center.y - n }
      );
      for (let h = 0; h < o(this, I).regular.sides; h++)
        s.push([
          o(this, I).regular.center.x + r.x,
          o(this, I).regular.center.y + r.y
        ]), r.rotate(360 / o(this, I).regular.sides);
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
I = new WeakMap(), Vt = new WeakSet(), Li = function() {
  var s;
  const e = [];
  return (s = o(this, I).vertices) == null || s.forEach((n) => {
    Nt(n) && e.push([n.x, n.y]);
  }), e;
}, Ei = function() {
  var s;
  this.element.clear();
  const e = x(this, Vt, Li).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), o(this, I).mark) {
    const n = ((s = o(this, I).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
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
var q, se, Js, Pi;
class $o extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, se);
    p(this, q);
    return this.static = !0, d(this, q, Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    )), this.shape = x(this, se, Js).call(this), this.computed(), this;
  }
  get config() {
    return o(this, q);
  }
  set config(e) {
    d(this, q, e), this.computed();
  }
  computed() {
    const s = [
      ...x(this, se, Pi).call(this, o(this, q).axis.x, o(this, q).axis.y),
      ...x(this, se, Pi).call(this, o(this, q).axis.y, o(this, q).axis.x)
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
q = new WeakMap(), se = new WeakSet(), Js = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, Pi = function(e, s) {
  let n = +o(this, q).origin.x, r = +o(this, q).origin.y;
  const h = [];
  let a = Wt(
    { x: n, y: r },
    e,
    o(this, q).width,
    o(this, q).height
  );
  for (; a; )
    if (h.push(a), n += s.x, r -= s.y, a = Wt(
      { x: n, y: r },
      e,
      o(this, q).width,
      o(this, q).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  for (n = o(this, q).origin.x - s.x, r = o(this, q).origin.y + s.y, a = Wt(
    { x: n, y: r },
    e,
    o(this, q).width,
    o(this, q).height
  ); a; )
    if (h.push(a), n -= s.x, r += s.y, a = Wt(
      { x: n, y: r },
      e,
      o(this, q).width,
      o(this, q).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  return h;
};
var K, Ze, Qe, tn;
class Ro extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Qe);
    p(this, K);
    p(this, Ze);
    d(this, K, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), d(this, Ze, Re(this.rootSVG, 8)), this.config = n;
  }
  get config() {
    return o(this, K);
  }
  set config(e) {
    d(this, K, e), x(this, Qe, tn).call(this), this.computed();
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
    return typeof o(this, K).radius == "number" ? X(o(this, K).radius, this.graphConfig) : es(this.center, o(this, K).radius ?? o(this, K).start);
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
    return Zs((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +fs(this.center, this.start).toFixed(10),
      end: +fs(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = o(this, K).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = ls(this.center.x, this.center.y, n, e), h = ls(this.center.x, this.center.y, n, s);
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
K = new WeakMap(), Ze = new WeakMap(), Qe = new WeakSet(), tn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var pt, Dt, St, en, sn, zi;
class Fo extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, St);
    p(this, pt);
    p(this, Dt);
    return this.static = !0, Object.values(Ne).includes(n) ? d(this, pt, x(this, St, en).call(this, n)) : d(this, pt, n), d(this, Dt, x(this, St, sn).call(this)), this.computed(), this;
  }
  get config() {
    return o(this, pt);
  }
  set config(e) {
    d(this, pt, e), this.computed();
  }
  get xAxis() {
    return o(this, Dt).x;
  }
  get yAxis() {
    return o(this, Dt).y;
  }
  computed() {
    return x(this, St, zi).call(this, o(this, Dt).x, o(this, pt).x.direction, o(this, pt).x), x(this, St, zi).call(this, o(this, Dt).y, o(this, pt).y.direction, o(this, pt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
pt = new WeakMap(), Dt = new WeakMap(), St = new WeakSet(), en = function(e) {
  return Ne.POLAR, {
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
}, sn = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, zi = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", h = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, u = Re(this.rootSVG, 10).end.fill(r), l = Wt(
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
var _t, fe, Je, nn;
class Bo extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, Je);
    p(this, _t);
    p(this, fe);
    return d(this, _t, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), d(this, fe, {
      x: new Ye(o(this, _t).expressions.x),
      y: new Ye(o(this, _t).expressions.y)
    }), this.shape = x(this, Je, nn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, _t);
  }
  set config(e) {
    d(this, _t, e), this.computed();
  }
  computed() {
    const e = o(this, _t).samples ?? this.graphConfig.axis.x.x, s = o(this, _t).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
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
        x: o(this, fe).x.evaluate({ t: e }),
        y: o(this, fe).y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
_t = new WeakMap(), fe = new WeakMap(), Je = new WeakSet(), nn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var kt, vt, Qt, $t, de, ti, rn;
class qo extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, ti);
    p(this, kt);
    p(this, vt);
    p(this, Qt);
    p(this, $t);
    p(this, de);
    return d(this, kt, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", d(this, vt, o(this, kt).follow.follow(0, 0)), d(this, Qt, { x: 0, y: 0 }), d(this, de, this.element.line()), d(this, $t, this.element.circle(o(this, kt).size).center(o(this, vt).x, o(this, vt).y)), this.shape = x(this, ti, rn).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let h = this.rootSVG.node.createSVGPoint();
      h.x = r.clientX, h.y = r.clientY, h = h.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const a = o(this, kt).follow.follow(h.x, h.y);
      isNaN(a.y) ? o(this, $t).hide() : (o(this, $t).show(), o(this, $t).center(a.x, a.y), d(this, vt, a), d(this, Qt, o(this, kt).follow.follow(h.x + 0.01, h.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return o(this, kt);
  }
  set config(e) {
    d(this, kt, e), this.computed();
  }
  computed() {
    const e = Wt(
      o(this, vt),
      {
        x: o(this, Qt).x - o(this, vt).x,
        y: o(this, Qt).y - o(this, vt).y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (o(this, de).plot(
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
    return [o(this, de)];
  }
  fillable() {
    return [o(this, $t)];
  }
}
kt = new WeakMap(), vt = new WeakMap(), Qt = new WeakMap(), $t = new WeakMap(), de = new WeakMap(), ti = new WeakSet(), rn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var mt, ei, on;
class Vo extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, ei);
    p(this, mt);
    return d(this, mt, Object.assign({
      samples: 100
    }, n)), this.shape = x(this, ei, on).call(this), this.computed(), this;
  }
  get config() {
    return o(this, mt);
  }
  set config(e) {
    d(this, mt, e), this.computed();
  }
  get domain() {
    return o(this, mt).domain ? X(o(this, mt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return o(this, mt).image ? X(o(this, mt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = o(this, mt).expressions, n = this.domain;
    this.image;
    function r(u, l) {
      const [f, m, b] = u;
      return `${l === 0 ? "M" : f} ${m ?? 0} ${b ?? 0}`;
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
mt = new WeakMap(), ei = new WeakSet(), on = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var V, ii, hn;
class Go extends at {
  constructor(e, s, n) {
    super(e, s);
    p(this, ii);
    p(this, V);
    d(this, V, Object.assign({}, n)), this.shape = x(this, ii, hn).call(this), this.computed();
  }
  get config() {
    return o(this, V);
  }
  set config(e) {
    d(this, V, e), this.computed();
  }
  get rectangles() {
    return o(this, V).rectangles;
  }
  set rectangles(e) {
    o(this, V).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return o(this, V).position < 0 && (o(this, V).position = 0), o(this, V).position > 1 && (o(this, V).position = 1), o(this, V).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), o(this, V).position = e;
  }
  computed() {
    this.shape.clear();
    const e = X(o(this, V).domain, this.graphConfig), n = (e.max - e.min) / o(this, V).rectangles, r = (o(this, V).domain.max - o(this, V).domain.min) / o(this, V).rectangles, h = this.graphConfig.origin.y;
    for (let a = 0; a < o(this, V).rectangles; a += 1) {
      const c = e.min + a * n, u = o(this, V).domain.min + (a + this.position) * r, l = o(this, V).follow.evaluate(u).y;
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
V = new WeakMap(), ii = new WeakSet(), hn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var G, U, Z, N, Ct, pe, Le, ji;
class Uo {
  constructor(t, e) {
    p(this, Le);
    p(this, G);
    p(this, U);
    p(this, Z);
    p(this, N);
    p(this, Ct);
    p(this, pe);
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return d(this, N, Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Ne.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e)), d(this, pe, (e == null ? void 0 : e.tex) ?? ((h) => h)), d(this, Ct, Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display)), d(this, G, Ws().addTo(s).viewbox(0, 0, o(this, N).width, o(this, N).height)), o(this, G).data("config", {
      width: o(this, N).width,
      height: o(this, N).height,
      origin: o(this, N).origin,
      // grids: this.#grids,
      axis: o(this, N).axis
    }), d(this, U, {}), Object.values(Ks).forEach((h) => {
      o(this, U)[h] = o(this, G).group().attr("id", `LAYER_${h}`);
    }), d(this, Z, {}), x(this, Le, ji).call(this), this;
  }
  get rootSVG() {
    return o(this, G);
  }
  get figures() {
    return o(this, Z);
  }
  get config() {
    return o(this, N);
  }
  set config(t) {
    d(this, N, t);
  }
  get display() {
    return o(this, Ct);
  }
  set display(t) {
    d(this, Ct, t);
  }
  get toTex() {
    return o(this, pe);
  }
  get layers() {
    return o(this, U);
  }
  grid(t, e) {
    const s = new $o(o(this, G), t, {
      axis: e,
      origin: o(this, N).origin,
      width: o(this, N).width,
      height: o(this, N).height,
      subdivisions: 0
    });
    return o(this, U).grids.add(s.element), s;
  }
  subgrid(t, e) {
    const s = {
      x: { x: o(this, N).axis.x.x / e, y: o(this, N).axis.x.y / e },
      y: { x: o(this, N).axis.y.x / e, y: o(this, N).axis.y.y / e }
    };
    return this.grid(t, s);
  }
  coordinate_system(t) {
    const e = new Fo(
      o(this, G),
      "COORDINATE_SYSTEM",
      t
    );
    return o(this, U).axis.add(e.element), e;
  }
  marker(t) {
    return Re(o(this, G), t);
  }
  toPixels(t, e) {
    return X(t, this.config, e);
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        Nt(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new O(
          o(this, G),
          e,
          n
        );
        return o(this, U).points.add(r.element), o(this, Z)[e] = r, s && r.addLabel(
          e,
          s.html,
          o(this, pe)
        ), r;
      },
      line: (t, e) => {
        const s = new rt(o(this, G), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      plot: (t, e) => {
        const s = new We(o(this, G), e, t);
        return o(this, U).plots.add(s.element), o(this, Z)[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new Bo(o(this, G), e, t);
        return o(this, U).plots.add(s.element), o(this, Z)[e] = s, s;
      },
      circle: (t, e) => {
        const s = new jo(o(this, G), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new Do(o(this, G), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      arc: (t, e) => {
        const s = new Ro(o(this, G), e, t);
        return o(this, U).main.add(s.element), o(this, Z)[e] = s, s;
      },
      follow: (t, e) => {
        const s = new qo(o(this, G), e, t);
        return o(this, U).plots_FG.add(s.element), o(this, Z)[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new Vo(o(this, G), e, t);
        return o(this, U).plots_BG.add(s.element), o(this, Z)[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new Go(o(this, G), e, t);
        return o(this, U).plots_BG.add(s.element), o(this, Z)[e] = s, s;
      }
    };
  }
  draggable(t, e) {
    const s = (n) => {
      var u;
      const r = t, { box: h } = n.detail;
      let { x: a, y: c } = h;
      if (n.preventDefault(), !(a < 0 || a > o(this, N).width - h.width / 2) && !(c < 0 || c > o(this, N).height - h.height / 2)) {
        if ((u = e == null ? void 0 : e.follow) != null && u.length) {
          let l = { x: a, y: c };
          e.follow.forEach((f) => {
            f instanceof at ? l = f.follow(a, c) : typeof f == "string" ? l = this.follow(f, r)(a, c) : l = f(a, c), a = l.x, c = l.y;
          });
        }
        r.pixels.x === a && r.pixels.y === c || (r.pixels = { x: a, y: c }, e != null && e.callback && e.callback(t), this.update([t.name]));
      }
    };
    return o(this, U).interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", s), t;
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), d(this, Z, {});
  }
  // Update the layout of the graph
  updateLayout() {
    o(this, G).viewbox(0, 0, o(this, N).width, o(this, N).height), o(this, G).data("config", {
      width: o(this, N).width,
      height: o(this, N).height,
      origin: o(this, N).origin,
      axis: o(this, N).axis
    }), x(this, Le, ji).call(this), this.update([], !0);
  }
  // Update each figures in the graph
  update(t, e) {
    t === void 0 && (t = []), Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  // Default follow function
  follow(t, e) {
    return t === "Ox" ? (s, n) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = o(this, N).axis.x.x, h = o(this, N).axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / h) * h, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
}
G = new WeakMap(), U = new WeakMap(), Z = new WeakMap(), N = new WeakMap(), Ct = new WeakMap(), pe = new WeakMap(), Le = new WeakSet(), ji = function() {
  o(this, U).grids.clear(), o(this, U).axis.clear(), o(this, Ct).subgrid && this.subgrid("SUBGRID", o(this, Ct).subgrid).stroke("purple/0.5", 0.1), o(this, Ct).grid && this.grid("MAINGRID", o(this, N).axis).stroke("lightgray", 1), o(this, Ct).axis && this.coordinate_system(o(this, N).system);
};
var M = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i))(M || {});
const ds = [
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
function Q(i, t) {
  return i.map((e) => {
    if (e === "")
      return !1;
    if (t[e])
      return t[e];
    if (e.includes(":")) {
      const [s, n, r] = e.split(":");
      return r !== void 0 && ["x", "y"].includes(s) ? {
        axis: s,
        min: parseFloat(n),
        max: parseFloat(r)
      } : {
        min: parseFloat(s),
        max: parseFloat(n)
      };
    } else if (e.includes(";")) {
      const [s, n] = e.split(";");
      if (!isNaN(+s) && !isNaN(+n))
        return {
          x: parseFloat(s),
          y: parseFloat(n)
        };
    } else if (isNaN(+e)) {
      if (e.startsWith("@"))
        return parseFloat(e.slice(1));
      if (e.includes("/")) {
        const [s, n] = e.split("/");
        if (!isNaN(+s) && !isNaN(+n) && +n != 0)
          return parseFloat(s) / parseFloat(n);
      }
    } else return parseFloat(e);
    return e;
  });
}
function Xo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.CIRCLE && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof O && (r instanceof O || typeof r == "number"))
      return { center: n, radius: r };
  }
  return null;
}
function Ho(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.ARC && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof O && r instanceof O && h instanceof O)
      return { start: n, center: r, end: h, radius: a };
  }
  return null;
}
function oe(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.LINE && s.length === 2) {
    const [n, r] = s;
    if (n instanceof O && r instanceof O) {
      const h = i.parameters.shape ? i.parameters.shape.value : "line";
      return {
        through: { A: n, B: r },
        shape: h
      };
    }
  }
  if (i.key === M.LINE && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const m = Q([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: 0, y: m }, e), d: { x: 1, y: 0 } },
        shape: "line"
      };
    }
    if (n.startsWith("x=")) {
      const m = Q([n.split("=")[1]], t)[0];
      return {
        director: { A: X({ x: m, y: 0 }, e), d: { x: 0, y: 1 } },
        shape: "line"
      };
    }
    const [r, h] = n.split("="), a = ps(r), c = ps(h), u = {
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
  if (i.key === M.MEDIATOR && s.length === 2) {
    const [n, r] = s;
    if (n instanceof O && r instanceof O)
      return { mediator: { A: n, B: r } };
  }
  if (i.key === M.PERPENDICULAR && s.length === 2) {
    const [n, r] = s;
    if (n instanceof rt && r instanceof O)
      return { perpendicular: { to: n, through: r } };
  }
  if (i.key === M.PARALLEL && s.length === 2) {
    const [n, r] = s;
    if (n instanceof rt && r instanceof O)
      return { parallel: { to: n, through: r } };
  }
  if (i.key === M.BISECTOR && s.length === 2) {
    const [n, r] = s;
    if (n instanceof rt && r instanceof rt)
      return { bisector: { d1: n, d2: r } };
  }
  if (i.key === M.BISECTOR && s.length === 3) {
    const [n, r, h] = s;
    if (r instanceof O && n instanceof O && h instanceof O)
      return { bisector: { A: r, B: n, C: h } };
  }
  return null;
}
function ps(i) {
  const t = i.split(/([+-][0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = t.filter((r) => r.includes("x")).map((r) => r === "x" ? "1" : r.replace("x", ""))[0] ?? "0", s = t.filter((r) => r.includes("y")).map((r) => r === "y" ? "1" : r.replace("y", ""))[0] ?? "0", n = t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? "0";
  return {
    a: Q([e], {})[0],
    b: Q([s], {})[0],
    c: Q([n], {})[0]
  };
}
function Yo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.PLOT) {
    const [n, ...r] = s, h = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((u) => Ft(u));
    a.length > 0 && (h.domain = a[0]), a.length > 1 && (h.image = a[1]);
    const c = r.filter((u) => typeof u == "number");
    return c.length > 0 && (h.samples = c[0] > 0 ? c[0] : 10), h;
  }
  return null;
}
function Wo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.PARAMETRIC && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return { expressions: { x: n, y: r } };
  }
  return null;
}
function Ko(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.FOLLOW && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof We)
      return {
        follow: n,
        tangent: r === "show"
      };
  }
  return null;
}
function Zo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.FILL_BETWEEN && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof We && r instanceof We)
      return {
        expressions: [n, r],
        domain: Ft(h) ? h : { min: NaN, max: NaN },
        image: Ft(a) ? a : { min: NaN, max: NaN }
      };
  }
  return null;
}
function Qo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.RIEMANN && s.length >= 2) {
    const [n, r, h, a] = s;
    return {
      follow: n,
      domain: Ft(r) ? r : { min: NaN, max: NaN },
      rectangles: typeof h == "number" ? h : 5,
      position: typeof a == "number" ? a : 0
    };
  }
  return null;
}
function Ut(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).filter((a) => a.includes("*") || a.includes("s"))[0] ?? "o";
  switch (r) {
    case "s":
      s = "square", n = i.parameters[r].value === !0 ? 10 : i.parameters[r].value;
      break;
    case "*":
      s = "crosshair", n = i.parameters[r].value === !0 ? 10 : i.parameters[r].value;
      break;
  }
  const h = Jo(i, t);
  return h ? Object.assign(h, { shape: s, size: n }) : null;
}
function Jo(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.POINT) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === M.MIDDLE && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof O && r instanceof O)
      return { middle: { A: n, B: r } };
  }
  if (i.key === M.PROJECTION && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof O && (r instanceof rt || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === M.INTERSECTION && s.length === 2) {
    const n = s[0], r = s[1];
    if ((n instanceof rt || n === "Ox" || n === "Oy") && (r instanceof rt || r === "Ox" || r === "Oy"))
      return { intersection: { A: n, B: r } };
  }
  if (i.key === M.SYMMETRY && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof O && (r instanceof O || r instanceof rt || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === M.DIRECTION_POINT && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof O && (r instanceof rt || r === "Ox" || r === "Oy") && typeof h == "number")
      return {
        direction: {
          direction: r,
          distance: h,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === M.VECTOR_POINT && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof O && r instanceof O)
      return {
        direction: {
          point: a instanceof O ? a : n,
          direction: { A: n, B: r },
          distance: typeof h == "number" ? h : 1
        }
      };
  }
  return null;
}
function ms(i, t, e) {
  const s = Q(i.code, t);
  if (i.key === M.POLYGON && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof O))
      return { vertices: n };
  }
  if (i.key === M.REGULAR && s.length >= 3) {
    const [n, r, h] = s;
    if (n instanceof O && (typeof r == "number" || r instanceof O) && typeof h == "number")
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
const gs = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: Ut,
    create: "point"
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line>,<line>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: Ut,
    create: "point"
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: oe,
    create: "line"
  },
  vector: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: oe,
    create: "line"
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: oe,
    create: "line"
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: oe,
    create: "line"
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: oe,
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
    build: oe,
    create: "line"
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Xo,
    create: "circle"
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: Ho,
    create: "arc"
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: Yo,
    create: "plot"
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: Wo,
    create: "parametric"
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: ms,
    create: "polygon"
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: ms,
    create: "polygon"
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: Ko,
    create: "follow"
  },
  fillbetween: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: Zo,
    create: "fillbetween"
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: Qo,
    create: "riemann"
  }
};
function qe(i) {
  if (i === "") return !0;
  if (Number(i)) return parseFloat(i);
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
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(qe) : i;
}
function ys(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((s) => s.replace("ESCAPESPLITTER", t));
}
function th(i) {
  if (!i.includes("=")) return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
const mi = ",", eh = "/";
function ih(i, t) {
  return sh(i, t);
}
function sh(i, t) {
  let e;
  t === void 0 || t.length === 0 ? e = ys(i, mi) : e = i.split(new RegExp(`(?=${t.join("|")})`)).map((n) => {
    let r = n.trim();
    return r.startsWith(",") && (r = r.slice(1).trim()), r.endsWith(",") && (r = r.slice(0, -1)), ys(r, mi).join(mi);
  });
  const s = {};
  return e.forEach((n) => {
    const { key: r, value: h } = th(n);
    if (h.match(/^[-.\d]+\/[-.\d]+$/)) {
      s[r] = {
        value: qe(h),
        options: []
      };
      return;
    }
    const [a, ...c] = h.split(eh);
    s[r] = {
      value: qe(a),
      options: c.map((u) => qe(u))
    };
  }), s;
}
var Jt, Rt, z, an, Di, cn, un, ln, fn, dn, pn, mn, gn, $i;
class ch extends Uo {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    p(this, z);
    p(this, Jt);
    p(this, Rt);
    return d(this, Rt, {}), s != null && s.parameters && this.refreshLayout(s.parameters), d(this, Jt, []), s != null && s.code && x(this, z, Di).call(this, s.code), this;
  }
  static documentation() {
    return gs;
  }
  get code() {
    return o(this, Jt);
  }
  refresh(e) {
    this.clear(), x(this, z, Di).call(this, e);
  }
  refreshLayout(e) {
    const s = x(this, z, ln).call(this, e);
    this.config = s.config, this.display = s.display, d(this, Rt, s.settings), this.updateLayout();
  }
}
Jt = new WeakMap(), Rt = new WeakMap(), z = new WeakSet(), /**
 * Prepare the code to load
 * @param input Input code to parse and prepare
 * @returns 
 */
an = function(e) {
  const s = [], n = e.split(`
`).map((h) => h.trim()).filter((h) => h.trim() !== "" && !h.startsWith("$")), r = {};
  for (const h of n) {
    if (h.startsWith("@")) {
      const { key: c, value: u } = x(this, z, un).call(this, h);
      r[c] = { value: u, options: [] };
      continue;
    }
    const a = x(this, z, fn).call(this, h);
    a.parameters = Object.assign(
      a.parameters,
      r
    ), s.push(a);
  }
  return s;
}, /**
 * Build the figures from the code
 */
Di = function(e) {
  d(this, Jt, x(this, z, an).call(this, e));
  const s = gs;
  o(this, Jt).forEach((n) => {
    let r = n.id, h = 1;
    for (; Object.hasOwn(this.figures, r); )
      r = `${n.id}${h++}`;
    n.id = r;
    let a;
    const c = this.create;
    if (s[n.key]) {
      const { build: u, create: l, parameters: f } = s[n.key];
      if (f && f.length > 0 && Object.keys(n.parameters).length === 0 && Object.keys(n.parameters).filter((b) => f.includes(b)).forEach((b) => {
        n.parameters[b] = { value: !0, options: [] };
      }), Object.hasOwn(c, l))
        try {
          const m = u(n, this.figures, this.config);
          m && (a = this.create[l](m, n.id));
        } catch (m) {
          console.log(m);
        }
    }
    a && (o(this, Rt).label && a instanceof O && n.parameters.label === void 0 && n.parameters.tex === void 0 && (n.parameters.label = { value: !0, options: [] }), o(this, Rt).tex && a instanceof O && n.parameters.label === void 0 && n.parameters.tex === void 0 && (n.parameters.tex = { value: !0, options: [] }), a instanceof O && o(this, Rt).points === !1 && (n.parameters["!"] = { value: !0, options: [] }), x(this, z, cn).call(this, n.parameters, a));
  });
}, cn = function(e, s) {
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
        if (s instanceof O) {
          const h = [], a = [];
          [e[n].value, ...e[n].options].forEach((c) => {
            if (["grid", "Ox", "Oy"].includes(c) && h.push(this.follow(c, s)), Ft(c)) {
              const u = c.axis ?? "x", l = this.toPixels(c, u);
              h.push(
                (f, m) => ({
                  x: u === "x" ? Math.max(l.min, Math.min(f, l.max)) : f,
                  y: u === "y" ? Math.max(l.min, Math.min(m, l.max)) : m
                })
              );
            }
            if (Object.hasOwn(this.figures, c)) {
              const u = this.figures[c];
              a.push((l, f) => u.follow(l, f));
            }
          }), this.layers.interactive.add(s.element), s.asCircle(20).fill("white/0.8"), this.draggable(
            s,
            {
              follow: [
                ...h,
                ...a
              ]
            }
          );
        }
        break;
    }
  });
}, un = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, ln = function(e) {
  const s = ih(e ?? "", [
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
  ]);
  console.log(s);
  const n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && Ft(s.x.value) ? s.x.value : { min: -8, max: 8 }, h = s.y && Ft(s.y.value) ? s.y.value : { min: -8, max: 8 }, a = Math.abs(r.max - r.min), c = Math.abs(h.max - h.min), u = a * n, l = c * n, f = {
    x: -r.min * n,
    y: h.max * n
  }, m = Ne.CARTESIAN_2D, b = {
    x: { x: n, y: 0 },
    y: { x: 0, y: -n }
  }, v = !!s.grid, L = !!s.axis, A = s.subgrid ? parseFloat(s.subgrid.value) : 0, F = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: u,
      height: l,
      origin: f,
      system: m,
      axis: b
    },
    display: {
      grid: v,
      subgrid: A,
      axis: L
    },
    settings: F
  };
}, fn = function(e) {
  const [s, n] = e.split("->"), r = x(this, z, dn).call(this, s);
  return r.parameters = Object.assign(
    r.parameters,
    x(this, z, $i).call(this, n)
  ), r;
}, dn = function(e) {
  if (e.match(/^[A-Z][0-9]*\(.*\)$/))
    return x(this, z, pn).call(this, e);
  if (e.match(/^[a-z][0-9]*\([x|t]\)/))
    return x(this, z, gn).call(this, e);
  if (e.includes("=") && !e.includes(" "))
    return x(this, z, mn).call(this, e);
  const [s, ...n] = e.split("="), [r, ...h] = n.join("=").split(" ");
  return Object.values(M).includes(r) && h.length > 0 ? {
    id: s,
    key: r,
    code: h.join(" ").split(","),
    // Split the code into an array of strings
    parameters: {}
  } : {
    id: "",
    key: M.UNKNOWN,
    code: [h.join(" ")],
    parameters: {}
  };
}, pn = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(","), r = x(this, z, $i).call(this, e.split(")")[1]);
  return {
    id: s,
    key: M.POINT,
    code: n,
    parameters: r
  };
}, mn = function(e) {
  const [s, ...n] = e.split("=");
  let r = n.join("=");
  const h = {};
  let a = r[0];
  a !== "v" && a !== "[" && (a = null);
  let c = r[r.length - 1];
  c !== "." && c !== "]" && c !== "[" && (c = null), a === "v" && c === null ? (r = r.slice(1), h.shape = { value: "vector", options: [] }) : a === null && c === "." || a === "[" && c === "]" ? (a === "[" && (r = r.slice(1)), r = r.slice(0, -1), h.shape = { value: "segment", options: [] }) : a === "[" && c === "[" || a === null && c === "[" || a === "[" && c === null ? (a === "[" && (r = r.slice(1)), c === "[" && (r = r.slice(0, -1)), h.shape = { value: "half_line", options: [] }) : h.shape = { value: "line", options: [] };
  const u = r.split(/(?=[A-Z])/);
  return {
    id: s,
    key: M.LINE,
    code: u,
    parameters: h
  };
}, gn = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], h = e.includes("(x)=") ? M.PLOT : M.PARAMETRIC;
  return {
    id: r,
    key: h,
    code: n.split(","),
    parameters: {}
  };
}, $i = function(e) {
  if (e === void 0)
    return {};
  const s = {};
  return e.split(",").forEach((r) => {
    if (r.includes("=")) {
      const [h, ...a] = r.split("="), c = a.join("=").split("/"), u = Q(c, {});
      let l = u.shift() ?? !0;
      ["label", "tex"].includes(h) && (l = c[0] ?? ""), ds.includes(l) && u.length === 1 ? s[h] = { value: `${l}/${u[0]}`, options: [] } : s[h] = { value: l, options: u };
    } else {
      const [h] = r.split("/");
      ds.includes(h) ? s.color = { value: r, options: [] } : s[r] = { value: !0, options: [] };
    }
  }), s;
};
export {
  ch as PiDraw,
  Uo as PiGraph
};
