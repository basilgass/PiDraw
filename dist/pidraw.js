var Wn = Object.defineProperty;
var vs = (i) => {
  throw TypeError(i);
};
var Yn = (i, t, e) => t in i ? Wn(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var nt = (i, t, e) => Yn(i, typeof t != "symbol" ? t + "" : t, e), Si = (i, t, e) => t.has(i) || vs("Cannot " + e);
var h = (i, t, e) => (Si(i, t, "read from private field"), e ? e.call(i) : t.get(i)), m = (i, t, e) => t.has(i) ? vs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, s) => (Si(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), b = (i, t, e) => (Si(i, t, "access private method"), e);
const zi = {}, Bs = [];
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
  Fs(Object.getOwnPropertyNames(t)), zi[i] = Object.assign(zi[i] || {}, t);
}
function ht(i) {
  return zi[i] || {};
}
function Zn() {
  return [...new Set(Bs)];
}
function Fs(i) {
  Bs.push(...i);
}
function ns(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function Kn(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function Oi(i) {
  return i % 360 * Math.PI / 180;
}
function Qn(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function qs(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Ie(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function Di(i, t) {
  const e = i.origin;
  let s = i.ox != null ? i.ox : i.originX != null ? i.originX : "center", n = i.oy != null ? i.oy : i.originY != null ? i.originY : "center";
  e != null && ([s, n] = Array.isArray(e) ? e : typeof e == "object" ? [e.x, e.y] : [e, e]);
  const r = typeof s == "string", o = typeof n == "string";
  if (r || o) {
    const { height: a, width: c, x: l, y: u } = t.bbox();
    r && (s = s.includes("left") ? l : s.includes("right") ? l + c : l + c / 2), o && (n = n.includes("top") ? u : n.includes("bottom") ? u + a : u + a / 2);
  }
  return [s, n];
}
const Jn = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Pi = (i) => Jn.has(i.nodeName), Vs = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, rs = "http://www.w3.org/2000/svg", tr = "http://www.w3.org/1999/xhtml", Ti = "http://www.w3.org/2000/xmlns/", Ke = "http://www.w3.org/1999/xlink", O = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function er() {
  return O.window;
}
class os {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const he = {}, hs = "___SYMBOL___ROOT___";
function Re(i, t = rs) {
  return O.document.createElementNS(t, i);
}
function it(i, t = !1) {
  if (i instanceof os) return i;
  if (typeof i == "object")
    return Ai(i);
  if (i == null)
    return new he[hs]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return Ai(O.document.querySelector(i));
  const e = t ? O.document.createElement("div") : Re("svg");
  return e.innerHTML = i, i = Ai(e.firstChild), e.removeChild(e.firstChild), i;
}
function j(i, t) {
  return t && (t instanceof O.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : Re(i);
}
function pt(i) {
  if (!i) return null;
  if (i.instance instanceof os) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new he.Fragment(i);
  let t = qs(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : he[t] || (t = "Dom"), new he[t](i);
}
let Ai = pt;
function T(i, t = i.name, e = !1) {
  return he[t] = i, e && (he[hs] = i), Fs(Object.getOwnPropertyNames(i.prototype)), i;
}
function ir(i) {
  return he[i];
}
let sr = 1e3;
function Gs(i) {
  return "Svgjs" + qs(i) + sr++;
}
function Us(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    Us(i.children[t]);
  return i.id && (i.id = Gs(i.nodeName)), i;
}
function k(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function P(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function nr() {
  return this.parent().children();
}
function rr() {
  return this.parent().index(this);
}
function or() {
  return this.siblings()[this.position() + 1];
}
function hr() {
  return this.siblings()[this.position() - 1];
}
function ar() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function cr() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function lr() {
  return this.parent().add(this.remove()), this;
}
function ur() {
  return this.parent().add(this.remove(), 0), this;
}
function fr(i) {
  i = it(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function dr(i) {
  i = it(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function pr(i) {
  return i = it(i), i.before(this), this;
}
function mr(i) {
  return i = it(i), i.after(this), this;
}
_("Dom", {
  siblings: nr,
  position: rr,
  next: or,
  prev: hr,
  forward: ar,
  backward: cr,
  front: lr,
  back: ur,
  before: fr,
  after: dr,
  insertBefore: pr,
  insertAfter: mr
});
const Hs = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, gr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, yr = /rgb\((\d+),(\d+),(\d+)\)/, xr = /(#[a-z_][a-z0-9\-_]*)/i, br = /\)\s*,?\s*/, wr = /\s/g, Cs = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Ms = /^rgb\(/, Ss = /^(\s+)?$/, Os = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, _r = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, Rt = /[\s,]+/, as = /[MLHVCSQTAZ]/i;
function kr() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(Rt);
}
function vr(i) {
  return this.classes().indexOf(i) !== -1;
}
function Cr(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function Mr(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function Sr(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
_("Dom", {
  classes: kr,
  hasClass: vr,
  addClass: Cr,
  removeClass: Mr,
  toggleClass: Sr
});
function Or(i, t) {
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
          i[s] == null || Ss.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || Ss.test(t) ? "" : t
  ), this;
}
function Tr() {
  return this.css("display", "");
}
function Ar() {
  return this.css("display", "none");
}
function Nr() {
  return this.css("display") !== "none";
}
_("Dom", {
  css: Or,
  show: Tr,
  hide: Ar,
  visible: Nr
});
function Ir(i, t, e) {
  if (i == null)
    return this.data(
      ns(
        Kn(
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
_("Dom", { data: Ir });
function Er(i, t) {
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
function Lr() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function $r() {
  return this._memory = this._memory || {};
}
_("Dom", { remember: Er, forget: Lr, memory: $r });
function zr(i) {
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
function Dr(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function fe(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function Pr(i, t) {
  const e = fe(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : fe(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : fe(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : fe(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : fe(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : fe(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function jr(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function Ni(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
class $ {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof $ || this.isRgb(t) || this.test(t));
  }
  // Test if given value is an rgb object
  static isRgb(t) {
    return t && typeof t.r == "number" && typeof t.g == "number" && typeof t.b == "number";
  }
  /*
  Generating random colors
  */
  static random(t = "vibrant", e) {
    const { random: s, round: n, sin: r, PI: o } = Math;
    if (t === "vibrant") {
      const a = 24 * s() + 57, c = 38 * s() + 45, l = 360 * s();
      return new $(a, c, l, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * o * e / 0.5 + 0.01) + 150), c = n(50 * r(2 * o * e / 0.5 + 4.6) + 200), l = n(100 * r(2 * o * e / 0.5 + 2.3) + 150);
      return new $(a, c, l);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, c = 17 * s() + 9, l = 360 * s();
      return new $(a, c, l, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), c = 50 * s() + 86, l = 360 * s();
      return new $(a, c, l, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), c = 255 * s(), l = 255 * s();
      return new $(a, c, l);
    } else if (t === "lab") {
      const a = 100 * s(), c = 256 * s() - 128, l = 256 * s() - 128;
      return new $(a, c, l, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new $(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (Cs.test(t) || Ms.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((p) => p / 255), a = Math.min(1 - n, 1 - r, 1 - o);
    if (a === 1)
      return new $(0, 0, 0, 1, "cmyk");
    const c = (1 - n - a) / (1 - a), l = (1 - r - a) / (1 - a), u = (1 - o - a) / (1 - a);
    return new $(c, l, u, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((M) => M / 255), a = Math.max(n, r, o), c = Math.min(n, r, o), l = (a + c) / 2, u = a === c, f = a - c, p = u ? 0 : l > 0.5 ? f / (2 - a - c) : f / (a + c), y = u ? 0 : a === n ? ((r - o) / f + (r < o ? 6 : 0)) / 6 : a === r ? ((o - n) / f + 2) / 6 : a === o ? ((n - r) / f + 4) / 6 : 0;
    return new $(360 * y, 100 * p, 100 * l, "hsl");
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
      const f = Pr(t, e);
      Object.assign(this, f);
    } else if (typeof t == "string")
      if (Ms.test(t)) {
        const f = t.replace(wr, ""), [p, y, v] = yr.exec(f).slice(1, 4).map((M) => parseInt(M));
        Object.assign(this, { _a: p, _b: y, _c: v, _d: 0, space: "rgb" });
      } else if (Cs.test(t)) {
        const f = (M) => parseInt(M, 16), [, p, y, v] = gr.exec(zr(t)).map(f);
        Object.assign(this, { _a: p, _b: y, _c: v, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: o, _b: a, _c: c, _d: l } = this, u = this.space === "rgb" ? { r: o, g: a, b: c } : this.space === "xyz" ? { x: o, y: a, z: c } : this.space === "hsl" ? { h: o, s: a, l: c } : this.space === "lab" ? { l: o, a, b: c } : this.space === "lch" ? { l: o, c: a, h: c } : this.space === "cmyk" ? { c: o, m: a, y: c, k: l } : {};
    Object.assign(this, u);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), o = 200 * (e - s);
    return new $(n, r, o, "lab");
  }
  lch() {
    const { l: t, a: e, b: s } = this.lab(), n = Math.sqrt(e ** 2 + s ** 2);
    let r = 180 * Math.atan2(s, e) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new $(t, n, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (jr(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: y, a: v, b: M } = this;
        if (this.space === "lch") {
          const { c: ft, h: ni } = this, ri = Math.PI / 180;
          v = ft * Math.cos(ri * ni), M = ft * Math.sin(ri * ni);
        }
        const S = (y + 16) / 116, z = v / 500 + S, K = S - M / 200, Q = 16 / 116, wt = 8856e-6, _t = 7.787;
        t = 0.95047 * (z ** 3 > wt ? z ** 3 : (z - Q) / _t), e = 1 * (S ** 3 > wt ? S ** 3 : (S - Q) / _t), s = 1.08883 * (K ** 3 > wt ? K ** 3 : (K - Q) / _t);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, o = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, c = 31308e-7, l = n > c ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, u = r > c ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, f = o > c ? 1.055 * a(o, 1 / 2.4) - 0.055 : 12.92 * o;
      return new $(255 * l, 255 * u, 255 * f);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new $(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, o = 255 * Ni(r, n, t + 1 / 3), a = 255 * Ni(r, n, t), c = 255 * Ni(r, n, t - 1 / 3);
      return new $(o, a, c);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), o = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new $(r, o, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(Dr);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((z) => z / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, l = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, u = (a * 0.4124 + c * 0.3576 + l * 0.1805) / 0.95047, f = (a * 0.2126 + c * 0.7152 + l * 0.0722) / 1, p = (a * 0.0193 + c * 0.1192 + l * 0.9505) / 1.08883, y = u > 8856e-6 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116, v = f > 8856e-6 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, M = p > 8856e-6 ? Math.pow(p, 1 / 3) : 7.787 * p + 16 / 116;
    return new $(y, v, M, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a: t, _b: e, _c: s } = this.rgb(), { max: n, min: r, round: o } = Math, a = (c) => n(0, r(o(c), 255));
    return [t, e, s].map(a);
  }
  /*
  Constructing colors
  */
}
let W = class Xs {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new Xs(this);
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
function Rr(i, t) {
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
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, o = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, l = t.shear || 0, u = t.rotate || t.theta || 0, f = new W(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), p = f.x, y = f.y, v = new W(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), M = v.x, S = v.y, z = new W(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), K = z.x, Q = z.y, wt = new W(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), _t = wt.x, ft = wt.y;
    return {
      scaleX: a,
      scaleY: c,
      skewX: r,
      skewY: o,
      shear: l,
      theta: u,
      rx: _t,
      ry: ft,
      tx: K,
      ty: Q,
      ox: p,
      oy: y,
      px: M,
      py: S
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
    const n = t.a * e.a + t.c * e.b, r = t.b * e.a + t.d * e.b, o = t.a * e.c + t.c * e.d, a = t.b * e.c + t.d * e.d, c = t.e + t.a * e.e + t.c * e.f, l = t.f + t.b * e.e + t.d * e.f;
    return s.a = n, s.b = r, s.c = o, s.d = a, s.e = c, s.f = l, s;
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
    const s = this.a, n = this.b, r = this.c, o = this.d, a = this.e, c = this.f, l = s * o - n * r, u = l > 0 ? 1 : -1, f = u * Math.sqrt(s * s + n * n), p = Math.atan2(u * n, u * s), y = 180 / Math.PI * p, v = Math.cos(p), M = Math.sin(p), S = (s * r + n * o) / l, z = r * f / (S * s - n) || o * f / (S * n + s), K = a - t + t * v * f + e * (S * v * f - M * z), Q = c - e + t * M * f + e * (S * M * f + v * z);
    return {
      // Return the affine parameters
      scaleX: f,
      scaleY: z,
      shear: S,
      rotate: y,
      translateX: K,
      translateY: Q,
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
    return t = t instanceof bt ? t.matrixify() : typeof t == "string" ? x.fromArray(t.split(Rt).map(parseFloat)) : Array.isArray(t) ? x.fromArray(t) : typeof t == "object" && x.isMatrixLike(t) ? t : typeof t == "object" ? new x().transform(t) : arguments.length === 6 ? x.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, o = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const c = n / a, l = -e / a, u = -s / a, f = t / a, p = -(c * r + u * o), y = -(l * r + f * o);
    return this.a = c, this.b = l, this.c = u, this.d = f, this.e = p, this.f = y, this;
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
    t = Oi(t);
    const n = Math.cos(t), r = Math.sin(t), { a: o, b: a, c, d: l, e: u, f } = this;
    return this.a = o * n - a * r, this.b = a * n + o * r, this.c = c * n - l * r, this.d = l * n + c * r, this.e = u * n - f * r + s * r - e * n + e, this.f = f * n + u * r - e * r - s * n + s, this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t);
    const { a: r, b: o, c: a, d: c, e: l, f: u } = this;
    return this.a = r * t, this.b = o * e, this.c = a * t, this.d = c * e, this.e = l * t - s * t + s, this.f = u * e - n * e + n, this;
  }
  // Shear matrix
  shear(t, e, s) {
    return this.clone().shearO(t, e, s);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(t, e = 0, s = 0) {
    const { a: n, b: r, c: o, d: a, e: c, f: l } = this;
    return this.a = n + r * t, this.c = o + a * t, this.e = c + l * t - s * t, this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t), t = Oi(t), e = Oi(e);
    const r = Math.tan(t), o = Math.tan(e), { a, b: c, c: l, d: u, e: f, f: p } = this;
    return this.a = a + c * r, this.b = c + a * o, this.c = l + u * r, this.d = u + l * o, this.e = f + p * r - n * r, this.f = p + f * o - s * o, this;
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
    const e = x.formatTransforms(t), s = this, { x: n, y: r } = new W(e.ox, e.oy).transform(s), o = new x().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const a = new W(n, r).transform(o), c = isFinite(e.px) ? e.px - a.x : 0, l = isFinite(e.py) ? e.py - a.y : 0;
      o.translateO(c, l);
    }
    return o.translateO(e.tx, e.ty), o;
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
function Br() {
  return new x(this.node.getCTM());
}
function Fr() {
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
T(x, "Matrix");
function Ft() {
  if (!Ft.nodes) {
    const i = it().size(2, 0);
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
function Ws(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function qr(i) {
  return i === O.document || (O.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === O.document;
  }).call(O.document.documentElement, i);
}
class Z {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += O.window.pageXOffset, this.y += O.window.pageYOffset, new Z(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(Rt).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return Ws(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const e = Math.min(this.x, t.x), s = Math.min(this.y, t.y), n = Math.max(this.x + this.width, t.x + t.width) - e, r = Math.max(this.y + this.height, t.y + t.height) - s;
    return new Z(e, s, n, r);
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
    }), new Z(e, n, s - e, r - n);
  }
}
function Ys(i, t, e) {
  let s;
  try {
    if (s = t(i.node), Ws(s) && !qr(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Vr() {
  const e = Ys(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(Ft().svg).show(), o = r.node.getBBox();
      return r.remove(), o;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new Z(e);
}
function Gr(i) {
  const s = Ys(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new Z(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Ur(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
_({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new Z(this.attr("viewBox")) : this.attr("viewBox", new Z(i, t, e, s));
    },
    zoom(i, t) {
      let { width: e, height: s } = this.attr(["width", "height"]);
      if ((!e && !s || typeof e == "string" || typeof s == "string") && (e = this.node.clientWidth, s = this.node.clientHeight), !e || !s)
        throw new Error(
          "Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element"
        );
      const n = this.viewbox(), r = e / n.width, o = s / n.height, a = Math.min(r, o);
      if (i == null)
        return a;
      let c = a / i;
      c === 1 / 0 && (c = Number.MAX_SAFE_INTEGER / 100), t = t || new W(e / 2 / r + n.x, s / 2 / o + n.y);
      const l = new Z(n).transform(
        new x({ scale: c, origin: t })
      );
      return this.viewbox(l);
    }
  }
});
T(Z, "Box");
class ce extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
k([ce], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Hr = ["toArray", "constructor", "each"];
ce.extend = function(i) {
  i = i.reduce((t, e) => (Hr.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), k([ce], i);
};
function Ee(i, t) {
  return new ce(
    ns((t || O.document).querySelectorAll(i), function(e) {
      return pt(e);
    })
  );
}
function Xr(i) {
  return Ee(i, this.node);
}
function Wr(i) {
  return pt(this.node.querySelector(i));
}
let Yr = 0;
const Zs = {};
function Ks(i) {
  let t = i.getEventHolder();
  return t === O.window && (t = Zs), t.events || (t.events = {}), t.events;
}
function cs(i) {
  return i.getEventTarget();
}
function Zr(i) {
  let t = i.getEventHolder();
  t === O.window && (t = Zs), t.events && (t.events = {});
}
function Be(i, t, e, s, n) {
  const r = e.bind(s || i), o = it(i), a = Ks(o), c = cs(o);
  t = Array.isArray(t) ? t : t.split(Rt), e._svgjsListenerId || (e._svgjsListenerId = ++Yr), t.forEach(function(l) {
    const u = l.split(".")[0], f = l.split(".")[1] || "*";
    a[u] = a[u] || {}, a[u][f] = a[u][f] || {}, a[u][f][e._svgjsListenerId] = r, c.addEventListener(u, r, n || !1);
  });
}
function Nt(i, t, e, s) {
  const n = it(i), r = Ks(n), o = cs(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(Rt), t.forEach(function(a) {
    const c = a && a.split(".")[0], l = a && a.split(".")[1];
    let u, f;
    if (e)
      r[c] && r[c][l || "*"] && (o.removeEventListener(
        c,
        r[c][l || "*"][e],
        s || !1
      ), delete r[c][l || "*"][e]);
    else if (c && l) {
      if (r[c] && r[c][l]) {
        for (f in r[c][l])
          Nt(o, [c, l].join("."), f);
        delete r[c][l];
      }
    } else if (l)
      for (a in r)
        for (u in r[a])
          l === u && Nt(o, [a, l].join("."));
    else if (c) {
      if (r[c]) {
        for (u in r[c])
          Nt(o, [c, u].join("."));
        delete r[c];
      }
    } else {
      for (a in r)
        Nt(o, a);
      Zr(n);
    }
  }));
}
function Kr(i, t, e, s) {
  const n = cs(i);
  return t instanceof O.window.Event || (t = new O.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Qe extends os {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return Kr(this, t, e, s);
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
    return Be(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
T(Qe, "EventTarget");
function Ts() {
}
const ze = {
  duration: 400,
  ease: ">",
  delay: 0
}, Qr = {
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
class Ae extends Array {
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
    return t instanceof Array ? t : t.trim().split(Rt).map(parseFloat);
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
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(Hs), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof w && (this.value = t.valueOf(), this.unit = t.unit), this;
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
const Jr = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Qs = [];
function to(i) {
  Qs.push(i);
}
function eo(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = Os.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? Qr[i] : Os.test(t) ? parseFloat(t) : t;
      t = Qs.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new w(t) : Jr.has(i) && $.isColor(t) ? t = new $(t) : t.constructor === Array && (t = new Ae(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class Yt extends Qe {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = it(t), t.removeNamespace && this.node instanceof O.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return it(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new ce(
      ns(this.node.children, function(t) {
        return pt(t);
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
    return e && (s = Us(s)), new this.constructor(s);
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
    return this.put(new Yt(Re(t), e));
  }
  // Get first child
  first() {
    return pt(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return pt(this.node.childNodes[t]);
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
    return this.xml(t, e, tr);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = Gs(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return pt(this.node.lastChild);
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
    if (e = pt(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = pt(e.node.parentNode));
    return e;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, e) {
    return t = it(t), this.add(t, e), t;
  }
  // Add element to given container and return container
  putIn(t, e) {
    return it(t).add(this, e);
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
    return t = it(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
  }
  round(t = 2, e = null) {
    const s = 10 ** t, n = this.attr(e);
    for (const r in n)
      typeof n[r] == "number" && (n[r] = Math.round(n[r] * s) / s);
    return this.attr(n), this;
  }
  // Import / Export raw svg
  svg(t, e) {
    return this.xml(t, e, rs);
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
        if (a = pt(a.node.cloneNode(!0)), e) {
          const c = t(a);
          if (a = c || a, c === !1) return "";
        }
        a.each(function() {
          const c = t(this), l = c || this;
          c === !1 ? this.remove() : c && this !== l && this.replace(l);
        }, !0);
      }
      return e ? a.node.outerHTML : a.node.innerHTML;
    }
    e = e ?? !1;
    const n = Re("wrapper", s), r = O.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const o = this.parent();
    return e ? this.replace(r) && o : this.add(r);
  }
}
k(Yt, { attr: eo, find: Xr, findOne: Wr });
T(Yt, "Dom");
class bt extends Yt {
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
    e || (t = it(t));
    const s = new ce();
    let n = this;
    for (; (n = n.parent()) && n.node !== O.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(xr);
    return e ? it(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(ir(hs));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ie(this, t, e);
    return this.width(new w(s.width)).height(new w(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return Vs(this, this.dom), super.writeDataToDom();
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
k(bt, {
  bbox: Vr,
  rbox: Gr,
  inside: Ur,
  point: Rr,
  ctm: Br,
  screenCTM: Fr
});
T(bt, "Element");
const $e = {
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
    if (typeof s == "string" || s instanceof $ || $.isRgb(s) || s instanceof bt)
      this.attr(i, s);
    else
      for (e = $e[i].length - 1; e >= 0; e--)
        s[$e[i][e]] != null && this.attr($e.prefix(i, $e[i][e]), s[$e[i][e]]);
    return this;
  }, _(["Element", "Runner"], t);
});
_(["Element", "Runner"], {
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
    return new W(this.node.getPointAtLength(i));
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
const io = [
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
_("Element", io);
function so() {
  return this.attr("transform", null);
}
function no() {
  return (this.attr("transform") || "").split(br).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(Rt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(x.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new x());
}
function ro(i, t) {
  if (this === i) return this;
  if (Pi(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function oo(i) {
  return this.toParent(this.root(), i);
}
function ho(i, t) {
  if (i == null || typeof i == "string") {
    const n = new x(this).decompose();
    return i == null ? n : n[i];
  }
  x.isMatrixLike(i) || (i = { ...i, origin: Di(i, this) });
  const e = t === !0 ? this : t || !1, s = new x(e).transform(i);
  return this.attr("transform", s);
}
_("Element", {
  untransform: so,
  matrixify: no,
  toParent: ro,
  toRoot: oo,
  transform: ho
});
class at extends bt {
  flatten() {
    return this.each(function() {
      if (this instanceof at)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
T(at, "Container");
class ls extends at {
  constructor(t, e = t) {
    super(j("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
T(ls, "Defs");
class ut extends bt {
}
T(ut, "Shape");
function us(i) {
  return this.attr("rx", i);
}
function fs(i) {
  return this.attr("ry", i);
}
function Js(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function tn(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function en(i) {
  return this.attr("cx", i);
}
function sn(i) {
  return this.attr("cy", i);
}
function nn(i) {
  return i == null ? this.rx() * 2 : this.rx(new w(i).divide(2));
}
function rn(i) {
  return i == null ? this.ry() * 2 : this.ry(new w(i).divide(2));
}
const ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: en,
  cy: sn,
  height: rn,
  rx: us,
  ry: fs,
  width: nn,
  x: Js,
  y: tn
}, Symbol.toStringTag, { value: "Module" }));
class _i extends ut {
  constructor(t, e = t) {
    super(j("ellipse", t), e);
  }
  size(t, e) {
    const s = Ie(this, t, e);
    return this.rx(new w(s.width).divide(2)).ry(
      new w(s.height).divide(2)
    );
  }
}
k(_i, ao);
_("Container", {
  // Create an ellipse
  ellipse: P(function(i = 0, t = i) {
    return this.put(new _i()).size(i, t).move(0, 0);
  })
});
T(_i, "Ellipse");
class on extends Yt {
  constructor(t = O.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new Yt(Re("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
T(on, "Fragment");
function hn(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new w(i), fy: new w(t) }) : this.attr({ x1: new w(i), y1: new w(t) });
}
function an(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new w(i), cy: new w(t) }) : this.attr({ x2: new w(i), y2: new w(t) });
}
const co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: hn,
  to: an
}, Symbol.toStringTag, { value: "Module" }));
class Je extends at {
  constructor(t, e) {
    super(
      j(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new Z();
  }
  targets() {
    return Ee("svg [fill*=" + this.id() + "]");
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
k(Je, co);
_({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: P(function(i, t) {
      return this.put(new Je(i)).update(t);
    })
  }
});
T(Je, "Gradient");
class Fe extends at {
  // Initialize node
  constructor(t, e = t) {
    super(j("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new Z();
  }
  targets() {
    return Ee("svg [fill*=" + this.id() + "]");
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
    pattern: P(function(i, t, e) {
      return this.put(new Fe()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
T(Fe, "Pattern");
class ki extends ut {
  constructor(t, e = t) {
    super(j("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new O.window.Image();
    return Be(
      s,
      "load",
      function(n) {
        const r = this.parent(Fe);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Fe && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Be(s, "load error", function() {
      Nt(s);
    }), this.attr("href", s.src = t, Ke);
  }
}
to(function(i, t, e) {
  return (i === "fill" || i === "stroke") && _r.test(t) && (t = e.root().defs().image(t)), t instanceof ki && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
_({
  Container: {
    // create image element, load image and set its size
    image: P(function(i, t) {
      return this.put(new ki()).size(0, 0).load(i, t);
    })
  }
});
T(ki, "Image");
class Zt extends Ae {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new Z(s, n, t - s, e - n);
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(Rt).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
const lo = Zt;
function uo(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function fo(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function po(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function mo(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: lo,
  height: mo,
  width: po,
  x: uo,
  y: fo
}, Symbol.toStringTag, { value: "Module" }));
let qe = class extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("line", t), e);
  }
  // Get array
  array() {
    return new Zt([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new Zt(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ie(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
k(qe, ds);
_({
  Container: {
    // Create a line element
    line: P(function(...i) {
      return qe.prototype.plot.apply(
        this.put(new qe()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
T(qe, "Line");
class hi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(j("marker", t), e);
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
    marker: P(function(i, t, e) {
      return this.put(new hi()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof hi ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
T(hi, "Marker");
function xe(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const go = {
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
      const o = s * r % 1 === 0;
      return (t === "start" || t === "both") && ++r, n && o && --r, s >= 0 && r < 0 && (r = 0), s <= 1 && r > e && (r = e), r / e;
    };
  }
};
class ps {
  done() {
    return !1;
  }
}
class ji extends ps {
  constructor(t = ze.ease) {
    super(), this.ease = go[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class ai extends ps {
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
function As() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), o = 3.9 / (r * i);
  this.d = 2 * r * o, this.k = o * o;
}
class yo extends ai {
  constructor(t = 500, e = 0) {
    super(), this.duration(t).overshoot(e);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    s > 100 && (s = 16), s /= 1e3;
    const r = n.velocity || 0, o = -this.d * r - this.k * (t - e), a = t + r * s + o * s * s / 2;
    return n.velocity = r + o * s, n.done = Math.abs(e - a) + Math.abs(r) < 2e-3, n.done ? e : a;
  }
}
k(yo, {
  duration: xe("_duration", As),
  overshoot: xe("_overshoot", As)
});
class xo extends ai {
  constructor(t = 0.1, e = 0.01, s = 0, n = 1e3) {
    super(), this.p(t).i(e).d(s).windup(n);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    const r = e - t;
    let o = (n.integral || 0) + r * s;
    const a = (r - (n.error || 0)) / s, c = this._windup;
    return c !== !1 && (o = Math.max(-c, Math.min(o, c))), n.error = r, n.integral = o, n.done = Math.abs(r) < 1e-3, n.done ? e : t + (this.P * r + this.I * o + this.D * a);
  }
}
k(xo, {
  windup: xe("_windup"),
  p: xe("P"),
  i: xe("I"),
  d: xe("D")
});
const bo = {
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
}, Ri = {
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
}, Ii = "mlhvqtcsaz".split("");
for (let i = 0, t = Ii.length; i < t; ++i)
  Ri[Ii[i]] = /* @__PURE__ */ function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let o = 0, a = s.length; o < a; ++o)
          s[o] = s[o] + (o % 2 ? n.y : n.x);
      return Ri[e](s, n, r);
    };
  }(Ii[i].toUpperCase());
function wo(i) {
  const t = i.segment[0];
  return Ri[t](i.segment.slice(1), i.p, i.p0);
}
function Bi(i) {
  return i.segment.length && i.segment.length - 1 === bo[i.segment[0].toUpperCase()];
}
function _o(i, t) {
  i.inNumber && Qt(i, !1);
  const e = as.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function Qt(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, Bi(i) && Fi(i);
}
function Fi(i) {
  i.inSegment = !1, i.absolute && (i.segment = wo(i)), i.segments.push(i.segment);
}
function ko(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function vo(i) {
  return i.lastToken.toUpperCase() === "E";
}
const Co = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function Mo(i, t = !0) {
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
    if (!(!n.inSegment && _o(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          Qt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || ko(n)) {
          n.inNumber = !0, n.number = s, Qt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (Co.has(s)) {
        n.inNumber && Qt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !vo(n)) {
          Qt(n, !1), --e;
          continue;
        }
        n.number += s, n.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        n.number += s, n.hasExponent = !0;
        continue;
      }
      if (as.test(s)) {
        if (n.inNumber)
          Qt(n, !1);
        else if (Bi(n))
          Fi(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && Qt(n, !1), n.inSegment && Bi(n) && Fi(n), n.segments;
}
function So(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class le extends Ae {
  // Get bounding box of path
  bbox() {
    return Ft().path.setAttribute("d", this.toString()), new Z(Ft.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), Mo(t);
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
    return So(this);
  }
}
const cn = (i) => {
  const t = typeof i;
  return t === "number" ? w : t === "string" ? $.isColor(i) ? $ : Rt.test(i) ? as.test(i) ? le : Ae : Hs.test(i) ? w : qi : ms.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? Ae : t === "object" ? Ve : qi;
};
class Jt {
  constructor(t) {
    this._stepper = t || new ji("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
    this._type || this.type(cn(t));
    let e = new this._type(t);
    return this._type === $ && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Ve && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class qi {
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
class ti {
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
    }), Object.assign(this, ti.defaults, t), this;
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
ti.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Oo = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Ve {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === $ && t[s + 7] !== e[s + 7]) {
          const a = t[s + 7], c = new $(this.values.splice(s + 3, 5))[a]().toArray();
          this.values.splice(s + 3, 0, ...c);
        }
        s += e[s + 2] + 2;
        continue;
      }
      if (!t[s + 1])
        return this;
      const r = new t[s + 1]().toArray(), o = e[s + 2] + 3;
      e.splice(
        s,
        o,
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
      const n = cn(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(Oo), this.values = e.reduce((s, n) => s.concat(n), []), this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const t = {}, e = this.values;
    for (; e.length; ) {
      const s = e.shift(), n = e.shift(), r = e.shift(), o = e.splice(0, r);
      t[s] = new n(o);
    }
    return t;
  }
}
const ms = [qi, ti, Ve];
function To(i = []) {
  ms.push(...[].concat(i));
}
function Ao() {
  k(ms, {
    to(i) {
      return new Jt().type(this.constructor).from(this.toArray()).to(i);
    },
    fromArray(i) {
      return this.init(i), this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(i, t, e, s, n) {
      const r = function(o, a) {
        return s.step(o, t[a], e, n[a], n);
      };
      return this.fromArray(i.map(r));
    }
  });
}
let Le = class extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new le(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new le(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Ie(this, t, e);
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
Le.prototype.MorphArray = le;
_({
  Container: {
    // Create a wrapped path element
    path: P(function(i) {
      return this.put(new Le()).plot(i || new le());
    })
  }
});
T(Le, "Path");
function No() {
  return this._array || (this._array = new Zt(this.attr("points")));
}
function Io() {
  return delete this._array, this;
}
function Eo(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function Lo(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new Zt(i)
  );
}
function $o(i, t) {
  const e = Ie(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const ln = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: No,
  clear: Io,
  move: Eo,
  plot: Lo,
  size: $o
}, Symbol.toStringTag, { value: "Module" }));
let ei = class extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("polygon", t), e);
  }
};
_({
  Container: {
    // Create a wrapped polygon element
    polygon: P(function(i) {
      return this.put(new ei()).plot(i || new Zt());
    })
  }
});
k(ei, ds);
k(ei, ln);
T(ei, "Polygon");
class ii extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("polyline", t), e);
  }
}
_({
  Container: {
    // Create a wrapped polygon element
    polyline: P(function(i) {
      return this.put(new ii()).plot(i || new Zt());
    })
  }
});
k(ii, ds);
k(ii, ln);
T(ii, "Polyline");
class vi extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("rect", t), e);
  }
}
k(vi, { rx: us, ry: fs });
_({
  Container: {
    // Create a rect element
    rect: P(function(i, t) {
      return this.put(new vi()).size(i, t);
    })
  }
});
T(vi, "Rect");
class Ei {
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
const L = {
  nextDraw: null,
  frames: new Ei(),
  timeouts: new Ei(),
  immediates: new Ei(),
  timer: () => O.window.performance || O.window.Date,
  transforms: [],
  frame(i) {
    const t = L.frames.push({ run: i });
    return L.nextDraw === null && (L.nextDraw = O.window.requestAnimationFrame(L._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = L.timer().now() + t, s = L.timeouts.push({ run: i, time: e });
    return L.nextDraw === null && (L.nextDraw = O.window.requestAnimationFrame(L._draw)), s;
  },
  immediate(i) {
    const t = L.immediates.push(i);
    return L.nextDraw === null && (L.nextDraw = O.window.requestAnimationFrame(L._draw)), t;
  },
  cancelFrame(i) {
    i != null && L.frames.remove(i);
  },
  clearTimeout(i) {
    i != null && L.timeouts.remove(i);
  },
  cancelImmediate(i) {
    i != null && L.immediates.remove(i);
  },
  _draw(i) {
    let t = null;
    const e = L.timeouts.last();
    for (; (t = L.timeouts.shift()) && (i >= t.time ? t.run() : L.timeouts.push(t), t !== e); )
      ;
    let s = null;
    const n = L.frames.last();
    for (; s !== n && (s = L.frames.shift()); )
      s.run(i);
    let r = null;
    for (; r = L.immediates.shift(); )
      r();
    L.nextDraw = L.timeouts.first() || L.frames.first() ? O.window.requestAnimationFrame(L._draw) : null;
  }
}, zo = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, Do = function() {
  const i = O.window;
  return (i.performance || i.Date).now();
};
class un extends Qe {
  // Construct a new timeline on the given element
  constructor(t = Do) {
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
      return this._runners.map(zo);
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
    const o = t.persist(), a = {
      persist: o === null ? this._persist : o,
      start: n + e,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(a), this._runners.sort((c, l) => c.start - l.start), this._runnerIds = this._runners.map((c) => c.runner.id), this.updateTime()._continue(), this;
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
    return L.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = L.frame(this._step), this);
  }
  _stepFn(t = !1) {
    const e = this._timeSource();
    let s = e - this._lastSourceTime;
    t && (s = 0);
    const n = this._speed * s + (this._time - this._lastStepTime);
    this._lastSourceTime = e, t || (this._time += n, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let o = this._runners.length; o--; ) {
      const a = this._runners[o], c = a.runner;
      this._time - a.start <= 0 && c.reset();
    }
    let r = !1;
    for (let o = 0, a = this._runners.length; o < a; o++) {
      const c = this._runners[o], l = c.runner;
      let u = n;
      const f = this._time - c.start;
      if (f <= 0) {
        r = !0;
        continue;
      } else f < u && (u = f);
      if (!l.active()) continue;
      l.step(u).done ? c.persist !== !0 && l.duration() - l.time() + this._time + c.persist < this._time && (l.unschedule(), --o, --a) : r = !0;
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
      return i == null ? (this._timeline = this._timeline || new un(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class lt extends Qe {
  constructor(t) {
    super(), this.id = lt.id++, t = t ?? ze.duration, t = typeof t == "function" ? new ai(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof ai, this._stepper = this._isDeclarative ? t : new ji(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new x(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, o = 0;
    return t = t ?? ze.duration, e = e ?? ze.delay, s = s || "last", typeof t == "object" && !(t instanceof ps) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, o = t.wait ?? o, t = t.duration ?? ze.duration), {
      duration: t,
      delay: e,
      swing: r,
      times: n,
      wait: o,
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
    const n = lt.sanitise(t, e, s), r = new lt(n.duration);
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
    return this._stepper = new ji(t), this;
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
      const o = Math.floor(this._time / e), c = (this._time - o * e) / this._duration;
      return Math.min(o + c, this._times);
    }
    const s = Math.floor(t), n = t % 1, r = e * s + this._duration * n;
    return this.time(r);
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  position(t) {
    const e = this._time, s = this._duration, n = this._wait, r = this._times, o = this._swing, a = this._reverse;
    let c;
    if (t == null) {
      const p = function(v) {
        const M = o * Math.floor(v % (2 * (n + s)) / (n + s)), S = M && !a || !M && a, z = Math.pow(-1, S) * (v % (n + s)) / s + S;
        return Math.max(Math.min(z, 1), 0);
      }, y = r * (n + s) - n;
      return c = e <= 0 ? Math.round(p(1e-5)) : e < y ? p(e) : Math.round(p(y - 1e-5)), c;
    }
    const l = Math.floor(this.loops()), u = o && l % 2 === 0;
    return c = l + (u && !a || a && u ? t : 1 - t), this.loops(c);
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
      initialiser: t || Ts,
      runner: e || Ts,
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
    if (t instanceof un || (s = e, e = t, t = this.timeline()), !t)
      throw Error("Runner cannot be scheduled without timeline");
    return t.schedule(this, e, s), this;
  }
  step(t) {
    if (!this.enabled) return this;
    t = t ?? 16, this._time += t;
    const e = this.position(), s = this._lastPosition !== e && this._time >= 0;
    this._lastPosition = e;
    const n = this.duration(), r = this._lastTime <= 0 && this._time > 0, o = this._lastTime < n && this._time >= n;
    this._lastTime = this._time, r && this.fire("start", this);
    const a = this._isDeclarative;
    this.done = !a && !o && this._time >= n, this._reseted = !1;
    let c = !1;
    return (s || a) && (this._initialise(s), this.transforms = new x(), c = this._run(a ? t : e), this.fire("step", this)), this.done = this.done || c && a, o && this.fire("finished", this), this;
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
      const r = this._queue[s], o = r.runner.call(this, t);
      r.finished = r.finished || o === !0, e = e && r.finished;
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
lt.id = 0;
class ci {
  constructor(t = new x(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
k([lt, ci], {
  mergeWith(i) {
    return new ci(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const fn = (i, t) => i.lmultiplyO(t), dn = (i) => i.transforms;
function Po() {
  const t = this._transformationRunners.runners.map(dn).reduce(fn, new x());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class jo {
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
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new ci()).forEach((s) => s.clearTransformsFromQueue()), this;
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
      const s = lt.sanitise(i, t, e), n = this.timeline();
      return new lt(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(dn).reduce(fn, new x());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), L.cancelImmediate(this._frameId), this._frameId = L.immediate(Po.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new jo().add(
        new ci(new x(this))
      ));
    }
  }
});
const Ro = (i, t) => i.filter((e) => !t.includes(e));
k(lt, {
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
    let n = new Jt(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(o) {
        return this.element()[i](n.at(o).valueOf()), n.done();
      },
      function(o) {
        const a = Object.keys(o), c = Ro(a, r);
        if (c.length) {
          const u = this.element()[i](c), f = new Ve(n.from()).valueOf();
          Object.assign(f, u), n.from(f);
        }
        const l = new Ve(n.to()).valueOf();
        Object.assign(l, o), n.to(l), r = a, s = o;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new Jt(this._stepper).to(new w(i));
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
    const n = new Jt(this._stepper).type(
      e ? ti : x
    );
    let r, o, a, c, l;
    function u() {
      o = o || this.element(), r = r || Di(i, o), l = new x(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
    }
    function f(y) {
      t || this.clearTransform();
      const { x: v, y: M } = new W(r).transform(
        o._currentTransform(this)
      );
      let S = new x({ ...i, origin: [v, M] }), z = this._isDeclarative && a ? a : l;
      if (e) {
        S = S.decompose(v, M), z = z.decompose(v, M);
        const Q = S.rotate, wt = z.rotate, _t = [Q - 360, Q, Q + 360], ft = _t.map((Xn) => Math.abs(Xn - wt)), ni = Math.min(...ft), ri = ft.indexOf(ni);
        S.rotate = _t[ri];
      }
      t && (s || (S.rotate = i.rotate || 0), this._isDeclarative && c && (z.rotate = c)), n.from(z), n.to(S);
      const K = n.at(y);
      return c = K.rotate, a = new x(K), this.addTransform(a), o._addRunner(this), n.done();
    }
    function p(y) {
      (y.origin || "center").toString() !== (i.origin || "center").toString() && (r = Di(y, o)), i = { ...y, origin: r };
    }
    return this.queue(u, f, p, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
    const e = new Jt(this._stepper).to(t);
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
    const e = new Jt(this._stepper).to(t);
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
    const n = new Jt(this._stepper).type(this._element.MorphArray).to(i);
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
    return this._queueObject("viewbox", new Z(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
k(lt, { rx: us, ry: fs, from: hn, to: an });
T(lt, "Runner");
class gs extends at {
  constructor(t, e = t) {
    super(j("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? pt(this.node.querySelector("defs")) || this.put(new ls()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof O.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: rs, version: "1.1" }).attr(
      "xmlns:xlink",
      Ke,
      Ti
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, Ti).attr("xmlns:svgjs", null, Ti);
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
    nested: P(function() {
      return this.put(new gs());
    })
  }
});
T(gs, "Svg", !0);
let ys = class extends at {
  // Initialize node
  constructor(t, e = t) {
    super(j("symbol", t), e);
  }
};
_({
  Container: {
    symbol: P(function() {
      return this.put(new ys());
    })
  }
});
T(ys, "Symbol");
function Bo(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(O.document.createTextNode(i)), this;
}
function Fo() {
  return this.node.getComputedTextLength();
}
function qo(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function Vo(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function Go(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function Uo(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function Ho(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function Xo(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Wo(i) {
  return this.attr("x", i);
}
function Yo(i) {
  return this.attr("y", i);
}
function Zo(i, t) {
  return this.ax(i).ay(t);
}
function Ko(i) {
  return this._build = !!i, this;
}
const pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Zo,
  ax: Wo,
  ay: Yo,
  build: Ko,
  center: Xo,
  cx: Uo,
  cy: Ho,
  length: Fo,
  move: Go,
  plain: Bo,
  x: qo,
  y: Vo
}, Symbol.toStringTag, { value: "Module" }));
class xt extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("text", t), e), this.dom.leading = this.dom.leading ?? new w(1.3), this._rebuild = !0, this._build = !1;
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
        if (Pi(this.node)) return;
        const o = O.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new w(o);
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
    return Vs(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || Pi(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && pt(e[n]).dom.newLined === !0 && (t += `
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
k(xt, pn);
_({
  Container: {
    // Create text element
    text: P(function(i = "") {
      return this.put(new xt()).text(i);
    }),
    // Create plain text element
    plain: P(function(i = "") {
      return this.put(new xt()).plain(i);
    })
  }
});
T(xt, "Text");
class Ci extends ut {
  // Initialize node
  constructor(t, e = t) {
    super(j("tspan", t), e), this._build = !1;
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
k(Ci, pn);
_({
  Tspan: {
    tspan: P(function(i = "") {
      const t = new Ci();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
T(Ci, "Tspan");
let xs = class extends ut {
  constructor(t, e = t) {
    super(j("circle", t), e);
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
k(xs, { x: Js, y: tn, cx: en, cy: sn, width: nn, height: rn });
_({
  Container: {
    // Create circle element
    circle: P(function(i = 0) {
      return this.put(new xs()).size(i).move(0, 0);
    })
  }
});
T(xs, "Circle");
class Vi extends at {
  constructor(t, e = t) {
    super(j("clipPath", t), e);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return Ee("svg [clip-path*=" + this.id() + "]");
  }
}
_({
  Container: {
    // Create clipping element
    clip: P(function() {
      return this.defs().put(new Vi());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof Vi ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
T(Vi, "ClipPath");
class li extends bt {
  constructor(t, e = t) {
    super(j("foreignObject", t), e);
  }
}
_({
  Container: {
    foreignObject: P(function(i, t) {
      return this.put(new li()).size(i, t);
    })
  }
});
T(li, "ForeignObject");
function Qo(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof er().SVGSVGElement ? new Z(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new x(e), r = n.translate(i, t).transform(n.inverse()), o = new W(s.x, s.y).transform(r);
    e.move(o.x, o.y);
  }), this;
}
function Jo(i) {
  return this.dmove(i, 0);
}
function th(i) {
  return this.dmove(0, i);
}
function eh(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function ih(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function sh(i, t, e = this.bbox()) {
  const s = Ie(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((o) => {
    const a = new W(e).transform(new x(o).inverse());
    o.scale(n, r, a.x, a.y);
  }), this;
}
function nh(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function rh(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function oh(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: Qo,
  dx: Jo,
  dy: th,
  height: eh,
  move: ih,
  size: sh,
  width: nh,
  x: rh,
  y: oh
}, Symbol.toStringTag, { value: "Module" }));
class Mi extends at {
  constructor(t, e = t) {
    super(j("g", t), e);
  }
}
k(Mi, mn);
_({
  Container: {
    // Create a group element
    group: P(function() {
      return this.put(new Mi());
    })
  }
});
T(Mi, "G");
class ui extends at {
  constructor(t, e = t) {
    super(j("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, Ke);
  }
}
k(ui, mn);
_({
  Container: {
    // Create a hyperlink element
    link: P(function(i) {
      return this.put(new ui()).to(i);
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
      return t || (t = new ui(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
T(ui, "A");
class Gi extends at {
  // Initialize node
  constructor(t, e = t) {
    super(j("mask", t), e);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return Ee("svg [mask*=" + this.id() + "]");
  }
}
_({
  Container: {
    mask: P(function() {
      return this.defs().put(new Gi());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof Gi ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
T(Gi, "Mask");
class gn extends bt {
  constructor(t, e = t) {
    super(j("stop", t), e);
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
      return this.put(new gn()).update(i, t, e);
    }
  }
});
T(gn, "Stop");
function hh(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += Qn(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Ui extends bt {
  constructor(t, e = t) {
    super(j("style", t), e);
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
    return this.addText(hh(t, e));
  }
}
_("Dom", {
  style(i, t) {
    return this.put(new Ui()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Ui()).font(i, t, e);
  }
});
T(Ui, "Style");
class bs extends xt {
  // Initialize node
  constructor(t, e = t) {
    super(j("textPath", t), e);
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
    textPath: P(function(i, t) {
      return i instanceof xt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: P(function(i, t = !0) {
      const e = new bs();
      i instanceof Le || (i = this.defs().path(i)), e.attr("href", "#" + i, Ke);
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
    text: P(function(i) {
      return i instanceof xt || (i = new xt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return Ee("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
bs.prototype.MorphArray = le;
T(bs, "TextPath");
class yn extends ut {
  constructor(t, e = t) {
    super(j("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, Ke);
  }
}
_({
  Container: {
    // Create a use element
    use: P(function(i, t) {
      return this.put(new yn()).use(i, t);
    })
  }
});
T(yn, "Use");
const xn = it;
k([gs, ys, ki, Fe, hi], ht("viewbox"));
k([qe, ii, ei, Le], ht("marker"));
k(xt, ht("Text"));
k(Le, ht("Path"));
k(ls, ht("Defs"));
k([xt, Ci], ht("Tspan"));
k([vi, _i, Je, lt], ht("radius"));
k(Qe, ht("EventTarget"));
k(Yt, ht("Dom"));
k(bt, ht("Element"));
k(ut, ht("Shape"));
k([at, on], ht("Container"));
k(Je, ht("Gradient"));
k(lt, ht("Runner"));
ce.extend(Zn());
To([
  w,
  $,
  Z,
  x,
  Ae,
  Zt,
  le,
  W
]);
Ao();
function It(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function Et(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var bn = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(bn || {}), ah = /* @__PURE__ */ ((i) => (i.X = "Ox", i.Y = "Oy", i))(ah || {}), Ge = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(Ge || {}), ch = /* @__PURE__ */ ((i) => (i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates", i))(ch || {}), lh = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector", i))(lh || {}), uh = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star", i))(uh || {}), ae = /* @__PURE__ */ ((i) => (i.SMOOTH = "smooth", i.VERTICAL = "vertical", i.HORIZONTAL = "horizontal", i))(ae || {});
const Ns = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class fh {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Ns(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Be(window, s, this.drag, this, { passive: !1 }), Be(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(Ns(t)), r = n.x - s.x, o = n.y - s.y;
    if (!r && !o) return e;
    const a = e.x + r, c = e.y + o;
    this.box = new Z(a, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box,
      dx: r,
      dy: o
    }).defaultPrevented && this.move(a, c);
  }
  move(t, e) {
    this.el.type === "svg" ? Mi.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), Nt(window, "mousemove.drag"), Nt(window, "touchmove.drag"), Nt(window, "mouseup.drag"), Nt(window, "touchend.drag"), this.init(!0);
  }
}
k(bt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new fh(this)).init(i), this;
  }
});
var we, Ue, V, J, se, $t, zt, He, Xe, Hi;
class dh {
  constructor(t, e, s) {
    m(this, Xe);
    m(this, we);
    m(this, Ue);
    m(this, V);
    m(this, J);
    m(this, se);
    m(this, $t);
    m(this, zt);
    m(this, He);
    d(this, we, t), d(this, Ue, e), d(this, J, Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        rotate: void 0,
        texConverter: (n) => n
      },
      s
    )), d(this, se, s.text ?? e), d(this, $t, 0), d(this, zt, 0), d(this, He, "display: block; position: fixed; white-space:nowrap"), d(this, V, b(this, Xe, Hi).call(this));
  }
  get config() {
    return h(this, J);
  }
  get x() {
    return h(this, $t);
  }
  set x(t) {
    d(this, $t, t);
  }
  get y() {
    return h(this, zt);
  }
  set y(t) {
    d(this, zt, t);
  }
  get asHtml() {
    return h(this, J).asHtml;
  }
  get shape() {
    return h(this, V);
  }
  get alignement() {
    return h(this, J).alignement;
  }
  // Get the label of the figure.
  get label() {
    return h(this, V);
  }
  get displayName() {
    return h(this, J).asHtml ? h(this, J).texConverter(h(this, se)) : h(this, se);
  }
  hide() {
    return h(this, V).hide(), this;
  }
  show() {
    return h(this, V).show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && d(this, se, t), b(this, Xe, Hi).call(this), this;
  }
  move(t, e) {
    return d(this, $t, t), d(this, zt, e), this.position(), this;
  }
  rotate(t) {
    return h(this, V).transform({
      rotate: t,
      origin: { x: h(this, $t), y: h(this, zt) }
    }), this;
  }
  position(t, e, s) {
    t === void 0 && (t = h(this, J).alignement), e === void 0 && (e = h(this, J).offset), s === void 0 && (s = h(this, J).rotate), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, h(this, J).alignement = t, h(this, J).offset = e, h(this, J).rotate = s;
    let n = h(this, $t), r = h(this, zt), o = 0, a = 0;
    return h(this, V) instanceof li ? (o = h(this, V).node.children[0].clientWidth, a = h(this, V).node.children[0].clientHeight, this.label.width(o), this.label.height(a)) : (o = h(this, V).length(), a = h(this, V).bbox().h), t.includes("l") ? n = n - o / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? n = n + o / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (n = +n), t.includes("t") ? r = r - a / 2 : t.includes("m") ? r = +r : t.includes("b") && (r = r + a / 2), h(this, V) instanceof li ? h(this, V).center(n + (e.x ?? 0), r - (e.y ?? 0)) : h(this, V).center(n + (e.x ?? 0), r - (e.y ?? 0)), s !== 0 && s !== void 0 && this.rotate(s), this;
  }
}
we = new WeakMap(), Ue = new WeakMap(), V = new WeakMap(), J = new WeakMap(), se = new WeakMap(), $t = new WeakMap(), zt = new WeakMap(), He = new WeakMap(), Xe = new WeakSet(), Hi = function() {
  return h(this, V) && h(this, V).remove(), d(this, V, h(this, J).asHtml ? h(this, we).foreignObject(1, 1).attr("style", "overflow:visible").add(xn(`<div style="${h(this, He)}">${this.displayName}</div>`, !0)) : h(this, we).text(this.displayName)), h(this, V).attr("id", `${h(this, Ue)}-label`), h(this, V);
};
function wn(i, t = 10) {
  return +i.toFixed(t);
}
function ph(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function ws(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class F {
  constructor(t, e) {
    nt(this, "_x");
    nt(this, "_y");
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
    return new F(this._y, -this._x);
  }
  get unit() {
    const t = this.norm;
    return new F(this._x / t, this._y / t);
  }
  static scalarProduct(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  projection(t) {
    const e = t.x, s = t.y, n = F.scalarProduct(this, t) / (e ** 2 + s ** 2);
    return new F(e * n, s * n);
  }
  rotate(t) {
    const e = +t * Math.PI / 180, s = +this._x, n = +this._y;
    return this._x = Math.cos(e) * s - Math.sin(e) * n, this._y = Math.sin(e) * s + Math.cos(e) * n, this;
  }
  add(t) {
    return new F(this._x + t.x, this._y + t.y);
  }
  setLength(t) {
    const e = this.norm;
    return this._x = this._x * t / e, this._y = this._y * t / e, this;
  }
}
class _s {
  constructor(t, e) {
    nt(this, "_A");
    nt(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new F(0, 0), e instanceof F)
      this._A = t, this._director = e;
    else
      return new _s(t, new F(t, e));
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
    return new F(this._director.y, -this._director.x);
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
    return ph(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let o, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (o = this._A.x, a = n * o + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (o = t.A.x, a = e * o + s) : (o = (r - s) / (e - n), a = e * o + s), o === Number.POSITIVE_INFINITY || o === Number.NEGATIVE_INFINITY ? null : { x: o, y: a };
  }
  projection(t) {
    const e = this._director, s = new F(this._A, t), n = F.scalarProduct(e, s) / F.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class fi {
  constructor(t, e) {
    nt(this, "_rpn");
    nt(this, "_expression");
    nt(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new mh(
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
        this._addToStack(e, Xi[s.token]);
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
    t.push(wn(e));
  }
}
const Xi = {
  pi: Math.PI,
  e: Math.exp(1)
};
class mh {
  constructor(t) {
    nt(this, "_mode");
    nt(this, "_tokenConfig");
    nt(this, "_tokenConstant");
    nt(this, "_tokenKeys");
    nt(this, "_uniformize");
    nt(this, "_rpn", []);
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
      for (const r in Xi)
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
    e.sort((c, l) => l.length - c.length);
    for (const c in Xi)
      s.push(c);
    s.sort((c, l) => l.length - c.length);
    let n = "", r = 0, o, a;
    for (; r < t.length - 1; ) {
      let c = 0;
      for (; c < e.length; ) {
        const l = e[c];
        t.slice(r, r + l.length + 1) === l + "(" ? (n += l + "(", r += l.length + 1, c = 0) : c++;
      }
      for (c = 0; c < s.length; ) {
        const l = s[c];
        if (t.slice(r, r + l.length) === l) {
          n += l, r += l.length;
          break;
        }
        c++;
      }
      if (r >= t.length)
        break;
      o = t[r], a = t[r + 1], n += o, o.match(/[a-zA-Z]/g) ? a.match(/[a-zA-Z\d(]/) && (n += "*") : o.match(/\d/) ? a.match(/[a-zA-Z(]/) && (n += "*") : o === ")" && a.match(/[a-zA-Z\d(]/) && (n += "*"), r++;
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
    let s = 50, n, r = 0, o, a;
    const c = [], l = [];
    for (; r < t.length; ) {
      if (s--, s === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([o, r, a] = this.NextToken(t, r), a) {
        case "monom":
        case "coefficient":
        case "variable":
        case "constant":
          c.push({ token: o, tokenType: a });
          break;
        case "operation":
          if (l.length > 0) {
            let u = l[l.length - 1];
            for (n = 50; u.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[o].associative === "left" && this._tokenConfig[o].precedence <= this._tokenConfig[u.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[o].associative === "right" && this._tokenConfig[o].precedence < this._tokenConfig[u.token].precedence); ) {
              if (n--, n === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (c.push(l.pop() ?? {
                token: "",
                tokenType: "operation"
                /* OPERATION */
              }), l.length === 0)
                break;
              u = l[l.length - 1];
            }
          }
          l.push({ token: o, tokenType: a });
          break;
        case "function-argument":
          for (n = 50; l[l.length - 1].token !== "(" && l.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            c.push(l.pop() ?? { token: o, tokenType: a });
          }
          break;
        case "(":
          l.push({ token: o, tokenType: a }), t[r] === "-" && c.push({
            token: "0",
            tokenType: "coefficient"
            /* COEFFICIENT */
          });
          break;
        case ")":
          for (n = 50; l[l.length - 1].token !== "(" && l.length > 1; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
              break;
            }
            c.push(l.pop() ?? { token: o, tokenType: a });
          }
          l.pop();
          break;
        case "function":
          l.push({ token: o, tokenType: a });
          break;
        default:
          console.log(`SHUTING YARD: ${a} : ${o} `);
      }
    }
    return this._rpn = c.concat(l.reverse()), this;
  }
}
function H(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (Et(i)) {
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
function Wi(i, t) {
  return {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  };
}
function ie(i, t, e, s, n = 0, r = !1, o) {
  let a = 0, c = 0, l = 0, u = 0;
  if (t.x === 0)
    a = i.x, r ? c = i.y + n : c = t.y > 0 ? +n : s - n, l = i.x, o ? u = t.y < 0 ? i.y + o * t.y : 0 + n : u = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? a = i.x - n : a = t.x > 0 ? 0 + n : e - n, c = i.y, o ? l = t.x > 0 ? i.x + o * t.x : 0 - n : l = t.x > 0 ? e - n : 0 + n, u = i.y;
  else {
    let f = 0, p = 0;
    t.x > 0 ? (f = r ? -n / t.x : o || (i.x - n) / t.x, p = o || (e - i.x - n) / t.x) : t.x < 0 && (f = r ? -n / t.x : o || (e - i.x - n) / t.x, p = o || (i.x - n) / t.x), f = Math.abs(f), p = Math.abs(p), a = i.x - f * t.x, c = i.y - f * t.y, l = i.x + p * t.x, u = i.y + p * t.y;
  }
  return a > e && l > e || a < 0 && l < 0 || c > s && u > s || c < 0 && u < 0 ? null : [{ x: a, y: c }, { x: l, y: u }];
}
function Is(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function Es(i, t) {
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
function si(i, t, e) {
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
function _n(i) {
  if (typeof i == "number")
    return i;
  if (typeof i == "string" && i.includes("/")) {
    const [t, e] = i.split("/");
    return +t / +e;
  }
  return +i;
}
var qt, vt, mt, rt, X, _e, ne, Ct;
class st {
  constructor(t, e) {
    m(this, qt);
    m(this, vt);
    m(this, mt);
    m(this, rt);
    m(this, X);
    m(this, _e);
    m(this, ne);
    m(this, Ct);
    d(this, qt, t), d(this, vt, e), d(this, _e, !1), d(this, ne, !1), d(this, Ct, null), d(this, mt, h(this, qt).group().attr("id", h(this, vt))), d(this, X, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), d(this, rt, h(this, mt).path());
  }
  get element() {
    return h(this, mt);
  }
  get name() {
    return h(this, vt);
  }
  get rootSVG() {
    return h(this, qt);
  }
  get shape() {
    return h(this, rt);
  }
  set shape(t) {
    d(this, rt, t);
  }
  get appearance() {
    return h(this, X);
  }
  set appearance(t) {
    d(this, X, t);
  }
  get graphConfig() {
    return h(this, qt).data("config");
  }
  get static() {
    return h(this, _e);
  }
  set static(t) {
    d(this, _e, t);
  }
  get isDraggable() {
    return h(this, ne);
  }
  set isDraggable(t) {
    d(this, ne, t);
  }
  get label() {
    return h(this, Ct);
  }
  hide() {
    return h(this, mt).hide(), this;
  }
  show() {
    return h(this, mt).show(), this;
  }
  // Defines the shape as strokeable and fillable.
  strokeable() {
    return [h(this, rt)];
  }
  fillable() {
    return [h(this, rt)];
  }
  fill(t) {
    if (t !== void 0) {
      const [e, s] = t.split("/");
      h(this, X).fill.color = e, h(this, X).fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(h(this, X).fill), e.opacity(h(this, X).fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      h(this, X).stroke.color = s, h(this, X).stroke.opacity = n === void 0 ? 1 : +n, h(this, X).stroke.width = e ?? h(this, X).stroke.width;
    }
    return typeof t == "number" && e === void 0 && (h(this, X).stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(h(this, X).stroke), s.opacity(h(this, X).stroke.opacity);
    }), [h(this, rt).reference("marker-start"), h(this, rt).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s.children().forEach((n) => {
        n.attr({
          fill: h(this, X).stroke.color,
          stroke: h(this, X).stroke.color,
          "stroke-width": h(this, X).stroke.width
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
    return t ? (h(this, mt).clear(), this) : (h(this, mt).children().forEach((e) => {
      e.attr("id") !== `${h(this, vt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || h(this, ne)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return d(this, Ct, new dh(
      h(this, mt),
      h(this, vt),
      {
        text: t ?? h(this, vt),
        asHtml: e ?? !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    )), this.updateLabel(), h(this, Ct);
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return h(this, Ct) ? (h(this, Ct).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = h(this, Ct)) == null ? void 0 : t.config.text) ?? h(this, vt);
  }
  move(t) {
    if (It(t)) {
      const e = H(t.x, this.graphConfig), s = H(t.y, this.graphConfig);
      h(this, rt).translate(e, -s);
    } else if (typeof t == "number") {
      const e = H(t, this.graphConfig);
      h(this, rt).translate(e, 0);
    }
    return this;
  }
  scale(t) {
    return typeof t == "number" ? this.scale({
      x: t,
      y: t
    }) : (h(this, rt).scale(t.x, t.y), this);
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.filter((a) => typeof a == "number")[0]) ?? 10, n = (e == null ? void 0 : e.filter((a) => typeof a == "string")[0]) ?? void 0, r = si(
      h(this, qt),
      s,
      n
    ), o = h(this, rt);
    return t === "start" ? (o.marker("start", r.start), this) : t === "end" ? (o.marker("end", r.end), this) : (o.marker("start", r.start), o.marker("end", r.end), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
qt = new WeakMap(), vt = new WeakMap(), mt = new WeakMap(), rt = new WeakMap(), X = new WeakMap(), _e = new WeakMap(), ne = new WeakMap(), Ct = new WeakMap();
var g, ke, ve, We, Yi;
class ot extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, We);
    m(this, g);
    m(this, ke);
    m(this, ve);
    return d(this, g, Object.assign(
      { shape: "line" },
      n
    )), d(this, ve, { x: 0, y: 0 }), d(this, ke, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = b(this, We, Yi).call(this), this.computed(), this;
  }
  get angle() {
    return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
  }
  get config() {
    return h(this, g);
  }
  set config(e) {
    d(this, g, e), b(this, We, Yi).call(this);
  }
  get direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y
    };
  }
  get end() {
    return h(this, ke);
  }
  set end(e) {
    d(this, ke, e);
  }
  get math() {
    return new _s(this.start, this.end);
  }
  get normal() {
    const e = this.direction;
    return {
      x: e.y,
      y: -e.x
    };
  }
  get start() {
    return h(this, ve);
  }
  set start(e) {
    d(this, ve, e);
  }
  computed() {
    let e = { x: 0, y: 0 };
    if (h(this, g).through && h(this, g).through.A && h(this, g).through.B)
      this.start = h(this, g).through.A, this.end = h(this, g).through.B, e = this.direction;
    else if (h(this, g).director && h(this, g).director.A && h(this, g).director.d)
      this.start = h(this, g).director.A, this.end = {
        x: h(this, g).director.A.x + h(this, g).director.d.x,
        y: h(this, g).director.A.y + h(this, g).director.d.y
      }, e = h(this, g).director.d;
    else if (h(this, g).parallel && h(this, g).parallel.to && h(this, g).parallel.through)
      this.start = h(this, g).parallel.through, e = h(this, g).parallel.to.direction;
    else if (h(this, g).perpendicular && h(this, g).perpendicular.to && h(this, g).perpendicular.through)
      this.start = h(this, g).perpendicular.through, e = h(this, g).perpendicular.to.normal;
    else if (h(this, g).mediator && h(this, g).mediator.A && h(this, g).mediator.B)
      this.start = {
        x: (h(this, g).mediator.A.x + h(this, g).mediator.B.x) / 2,
        y: (h(this, g).mediator.A.y + h(this, g).mediator.B.y) / 2
      }, e = {
        x: h(this, g).mediator.B.y - h(this, g).mediator.A.y,
        y: -(h(this, g).mediator.B.x - h(this, g).mediator.A.x)
      };
    else if (h(this, g).bisector && ("d1" in h(this, g).bisector && "d2" in h(this, g).bisector, "A" in h(this, g).bisector && "B" in h(this, g).bisector && "C" in h(this, g).bisector)) {
      const { A: n, B: r, C: o } = h(this, g).bisector, a = new F(n, r), c = a.norm, l = new F(n, o), u = l.norm;
      this.start = n, e = {
        x: a.x / c + l.x / u,
        y: a.y / c + l.y / u
      };
    }
    if (h(this, g).shape === void 0 || h(this, g).shape === "line" || h(this, g).shape === "ray") {
      const n = ie(
        this.start,
        e,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        h(this, g).shape === "ray"
      );
      n !== null && (this.start = n[0], this.end = n[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  follow(e, s) {
    return this.math.projection({ x: e, y: s });
  }
  move(e) {
    if (typeof e == "number") {
      const s = new F(this.normal).setLength(e);
      return this.move(s);
    }
    return super.move(e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    if (h(this, g).shape === "segment") {
      const e = (this.start.x + this.end.x) / 2, s = (this.start.y + this.end.y) / 2;
      let n = -this.angle;
      n > 90 && (n = n - 180), n < -90 && (n = n + 180), this.label.move(e, s), this.label.position(void 0, void 0, n);
    }
    return this;
  }
}
g = new WeakMap(), ke = new WeakMap(), ve = new WeakMap(), We = new WeakSet(), Yi = function() {
  if (this.element.clear(), this.shape = this.element.line(
    this.start.x,
    this.start.y,
    this.end.x,
    this.end.y
  ), h(this, g).shape === "vector") {
    const e = si(this.rootSVG, 10).end;
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var C, R, Dt, te;
class N extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, Dt);
    m(this, C);
    // Coordinates of the point in pixels
    m(this, R);
    return d(this, R, { x: NaN, y: NaN }), d(this, C, Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    )), this.computed(), this.shape = b(this, Dt, te).call(this), this;
  }
  get config() {
    return h(this, C);
  }
  set config(e) {
    d(this, C, e), b(this, Dt, te).call(this);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return Wi(h(this, R), this.graphConfig);
  }
  get pixels() {
    return h(this, R);
  }
  set pixels(e) {
    d(this, R, e), this.shape.center(h(this, R).x, h(this, R).y);
  }
  get size() {
    return h(this, C).size;
  }
  set size(e) {
    h(this, C).size = e, b(this, Dt, te).call(this);
  }
  get x() {
    return h(this, R).x;
  }
  set x(e) {
    h(this, R).x = e, this.shape.center(e, h(this, R).y);
  }
  get y() {
    return h(this, R).y;
  }
  set y(e) {
    h(this, R).y = e, this.shape.center(h(this, R).x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, b(this, Dt, te).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, b(this, Dt, te).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, b(this, Dt, te).call(this), this;
  }
  computeLabel() {
    var e, s;
    if ((e = this.label) != null && e.config.text.includes("@")) {
      const n = Wi(h(this, R), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
  computed() {
    if (h(this, C).coordinates)
      return this.pixels = H(h(this, C).coordinates, this.graphConfig), this;
    if (h(this, C).middle) {
      const e = h(this, C).middle.A, s = h(this, C).middle.B;
      return h(this, R).x = (e.x + s.x) / 2, h(this, R).y = (e.y + s.y) / 2, this;
    }
    if (h(this, C).projection) {
      const e = h(this, C).projection.point;
      if (h(this, C).projection.axis === "Ox")
        return this.x = e.x, this.y = this.graphConfig.origin.y, this;
      if (h(this, C).projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = e.y, this;
      if (h(this, C).projection.axis instanceof ot) {
        const s = h(this, C).projection.axis, n = s.start.x, r = s.start.y, o = e.x - n, a = e.y - r, c = s.direction, l = o * c.x + a * c.y, u = c.x * c.x + c.y * c.y;
        this.x = n + l * c.x / u, this.y = r + l * c.y / u;
      }
    }
    if (h(this, C).intersection) {
      const e = h(this, C).intersection.A, s = h(this, C).intersection.B, n = e.math.intersection(s.math);
      if (n === null)
        return this;
      this.pixels = n;
    }
    if (h(this, C).intersectionWithCircle) {
      const e = h(this, C).intersectionWithCircle.A, s = h(this, C).intersectionWithCircle.B, n = h(this, C).intersectionWithCircle.index, r = e.intersectionWithLine(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.pixels = r[n];
    }
    if (h(this, C).intersectionBetweenCircles) {
      const e = h(this, C).intersectionBetweenCircles.A, s = h(this, C).intersectionBetweenCircles.B, n = h(this, C).intersectionBetweenCircles.index, r = e.intersectionWithCircle(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.show(), this.pixels = r[n];
    }
    if (h(this, C).symmetry) {
      const e = h(this, C).symmetry.A, s = h(this, C).symmetry.B;
      if (s instanceof ot) {
        const r = new F(s.direction).normal, a = new F(e, s.start).projection(r);
        this.x = e.x + 2 * a.x, this.y = e.y + 2 * a.y;
      } else if (s === "Ox")
        this.x = e.x, this.y = 2 * this.graphConfig.origin.y - e.y;
      else if (s === "Oy")
        this.x = 2 * this.graphConfig.origin.x - e.x, this.y = e.y;
      else {
        const n = s.x, r = s.y, o = e.x - n, a = e.y - r;
        this.x = n - o, this.y = r - a;
      }
    }
    if (h(this, C).direction) {
      const { point: e, direction: s, distance: n } = h(this, C).direction;
      if (s === "Ox")
        return this.x = e.x + H(n, this.graphConfig), this.y = e.y, this;
      if (s === "Oy")
        return this.x = e.x, this.y = e.y - H(n, this.graphConfig), this;
      if (s instanceof ot) {
        const r = new F(h(this, C).direction.perpendicular ? s.normal : s.direction).unit, o = H(n, this.graphConfig);
        return this.x = e.x + o * r.x, this.y = e.y + o * r.y, this;
      }
      if (s.A && s.B) {
        const r = new F(s.A, s.B);
        return this.x = e.x + n * r.x, this.y = e.y + n * r.y, this;
      }
    }
    return this;
  }
  moveLabel() {
    return this.label && this.label.move(this.x, this.y), this;
  }
}
C = new WeakMap(), R = new WeakMap(), Dt = new WeakSet(), te = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(h(this, R).x, h(this, R).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(h(this, R).x, h(this, R).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(
        `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
      ).center(h(this, R).x, h(this, R).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var dt, Vt, Ne, kn, vn;
class je extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, Ne);
    m(this, dt);
    m(this, Vt);
    return d(this, dt, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = b(this, Ne, kn).call(this), d(this, Vt, new fi(h(this, dt).expression)), this.computed(), this;
  }
  get config() {
    return h(this, dt);
  }
  set config(e) {
    d(this, dt, e), d(this, Vt, new fi(h(this, dt).expression)), this.computed();
  }
  computed() {
    const e = h(this, dt).expression;
    if (!e || e === "")
      return this;
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = h(this, dt).domain ?? { min: s, max: n }, o = h(this, dt).image ?? { min: -1 / 0, max: 1 / 0 }, a = h(this, dt).samples ?? this.graphConfig.axis.x.x, c = h(this, Vt);
    let l;
    l = b(this, Ne, vn).call(this, r, a, c, o);
    let u = l[0];
    const f = l.map(({ x: y, y: v }, M) => {
      let S = M === 0 ? "M" : "L";
      return isNaN(v) ? (S = "M", v = -123456789) : u.y === -123456789 && (S = "M"), u = { x: y, y: v }, `${S} ${y} ${v}`;
    }).join(" ");
    return this.shape.plot(f), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: h(this, Vt).evaluate({ x: e }) } : H(
      { x: e, y: h(this, Vt).evaluate({ x: e }) },
      this.graphConfig
    );
  }
  follow(e, s) {
    const n = Wi({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
dt = new WeakMap(), Vt = new WeakMap(), Ne = new WeakSet(), kn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
}, vn = function(e, s, n, r) {
  const o = [];
  for (let a = e.min; a < e.max; a += 1 / s) {
    const c = n.evaluate({ x: a });
    if (isNaN(c) || c === 1 / 0 || c === -1 / 0 || c < r.min || c > r.max) {
      const l = H({ x: a, y: 0 }, this.graphConfig);
      o.push({ x: l.x, y: NaN });
    } else
      o.push(H({ x: a, y: c }, this.graphConfig));
  }
  return o;
};
var Mt, Ye, Zi;
class oi extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, Ye);
    m(this, Mt);
    d(this, Mt, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), b(this, Ye, Zi).call(this), this.computed();
  }
  get config() {
    return h(this, Mt);
  }
  set config(e) {
    d(this, Mt, e), b(this, Ye, Zi).call(this);
  }
  get center() {
    return h(this, Mt).center;
  }
  get radius() {
    return typeof h(this, Mt).radius == "number" ? H(h(this, Mt).radius, this.graphConfig) : ws(this.center, h(this, Mt).radius);
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
    const n = this.radius, r = e - this.center.x, o = s - this.center.y, a = Math.sqrt(r ** 2 + o ** 2);
    return e = r / a * n + this.center.x, s = o / a * n + this.center.y, { x: e, y: s };
  }
  intersectionWithLine(e, s) {
    const { x: n, y: r } = this.center, { x: o, y: a } = e.start, { x: c, y: l } = e.end, u = c - o, f = l - a, p = o - n, y = a - r, v = u * u + f * f, M = 2 * (u * p + f * y), S = p * p + y * y - this.radius * this.radius, z = M * M - 4 * v * S;
    if (z < 0)
      return null;
    const K = [], Q = Math.sqrt(z), wt = (-M - Q) / (2 * v), _t = (-M + Q) / (2 * v);
    for (const ft of [wt, _t])
      s && (ft < 0 || ft > 1) || K.push({
        x: o + ft * u,
        y: a + ft * f
      });
    return K;
  }
  intersectionWithCircle(e) {
    const { x: s, y: n } = this.center, { x: r, y: o } = e.center, a = this.radius, c = e.radius, l = r - s, u = o - n, f = Math.hypot(l, u);
    if (f > a + c || f < Math.abs(a - c) || f === 0)
      return null;
    const p = (a * a - c * c + f * f) / (2 * f), y = Math.sqrt(a * a - p * p), v = s + p * l / f, M = n + p * u / f, S = -u * (y / f), z = l * (y / f), K = { x: v + S, y: M + z }, Q = { x: v - S, y: M - z };
    return Math.abs(y) < 1e-10 ? [K] : [K, Q];
  }
}
Mt = new WeakMap(), Ye = new WeakSet(), Zi = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var E, Kt, Ki, Qi;
class gh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, Kt);
    m(this, E);
    d(this, E, Object.assign({
      shape: "polygon"
    }, n)), b(this, Kt, Qi).call(this), this.computed();
  }
  get config() {
    return h(this, E);
  }
  set config(e) {
    d(this, E, e), b(this, Kt, Qi).call(this);
  }
  get vertices() {
    return h(this, E).vertices;
  }
  get radius() {
    return h(this, E).regular ? typeof h(this, E).regular.radius == "number" ? H(h(this, E).regular.radius, this.graphConfig) : h(this, E).vertices && It(h(this, E).vertices[0]) && It(h(this, E).regular.radius) ? ws(h(this, E).vertices[0], h(this, E).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (h(this, E).vertices && h(this, E).vertices.length > 2)
      e.plot(b(this, Kt, Ki).call(this));
    else if (h(this, E).regular) {
      const s = [], n = this.radius, r = new F(
        h(this, E).regular.center,
        It(h(this, E).regular.radius) ? h(this, E).regular.radius : { x: h(this, E).regular.center.x, y: h(this, E).regular.center.y - n }
      );
      for (let o = 0; o < h(this, E).regular.sides; o++)
        s.push([
          h(this, E).regular.center.x + r.x,
          h(this, E).regular.center.y + r.y
        ]), r.rotate(360 / h(this, E).regular.sides);
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
E = new WeakMap(), Kt = new WeakSet(), Ki = function() {
  var s;
  const e = [];
  return (s = h(this, E).vertices) == null || s.forEach((n) => {
    It(n) && e.push([n.x, n.y]);
  }), e;
}, Qi = function() {
  var s;
  this.element.clear();
  const e = b(this, Kt, Ki).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), h(this, E).mark) {
    const n = ((s = h(this, E).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
      (o, a) => (o.x += a[0], o.y += a[1], o),
      { x: 0, y: 0 }
    );
    r.x /= e.length, r.y /= e.length, e.forEach((o) => {
      const a = new F(r, { x: o[0], y: o[1] });
      n && a.setLength(n * 20), this.element.line(r.x, r.y, r.x + a.x, r.y + a.y).stroke({ color: "gray", width: 0.5 });
    });
  }
  return this.shape;
};
var G, ue, Cn, Ji;
class yh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, ue);
    m(this, G);
    return this.static = !0, d(this, G, Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    )), this.shape = b(this, ue, Cn).call(this), this.computed(), this;
  }
  get config() {
    return h(this, G);
  }
  set config(e) {
    d(this, G, e), this.computed();
  }
  computed() {
    const s = [
      ...b(this, ue, Ji).call(this, h(this, G).axis.x, h(this, G).axis.y),
      ...b(this, ue, Ji).call(this, h(this, G).axis.y, h(this, G).axis.x)
    ].reduce((r, o) => {
      const [a, c] = o;
      return r + `M${a.x},${a.y} L${c.x},${c.y}`;
    }, "");
    return this.shape.plot(s), this;
  }
  moveLabel() {
    return this;
  }
}
G = new WeakMap(), ue = new WeakSet(), Cn = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, Ji = function(e, s) {
  let n = +h(this, G).origin.x, r = +h(this, G).origin.y;
  const o = [];
  let a = ie(
    { x: n, y: r },
    e,
    h(this, G).width,
    h(this, G).height
  );
  for (; a; )
    if (o.push(a), n += s.x, r -= s.y, a = ie(
      { x: n, y: r },
      e,
      h(this, G).width,
      h(this, G).height
    ), o.length > 1e3)
      throw new Error("Too many lines");
  for (n = h(this, G).origin.x - s.x, r = h(this, G).origin.y + s.y, a = ie(
    { x: n, y: r },
    e,
    h(this, G).width,
    h(this, G).height
  ); a; )
    if (o.push(a), n -= s.x, r += s.y, a = ie(
      { x: n, y: r },
      e,
      h(this, G).width,
      h(this, G).height
    ), o.length > 1e3)
      throw new Error("Too many lines");
  return o;
};
var tt, di, pi, Mn;
class xh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, pi);
    m(this, tt);
    m(this, di);
    d(this, tt, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), d(this, di, si(this.rootSVG, 8)), this.config = n;
  }
  get config() {
    return h(this, tt);
  }
  set config(e) {
    d(this, tt, e), b(this, pi, Mn).call(this), this.computed();
  }
  get center() {
    return h(this, tt).center;
  }
  get start() {
    return h(this, tt).start;
  }
  get end() {
    return h(this, tt).end;
  }
  get radius() {
    return typeof h(this, tt).radius == "number" ? H(h(this, tt).radius, this.graphConfig) : ws(this.center, h(this, tt).radius ?? h(this, tt).start);
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new F(this.center, this.start).unit, r = new F(this.center, this.end).unit, o = n.add(r).unit, a = this.center.x + s * o.x * (e + 20), c = this.center.y + s * o.y * (e + 20);
    return s * o.x > 0 && s * o.y > 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y > 0 ? this.label.config.alignement = "ml" : s * o.x > 0 && s * o.y < 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, c), this;
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return wn((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +Es(this.center, this.start).toFixed(10),
      end: +Es(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = h(this, tt).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = Is(this.center.x, this.center.y, n, e), o = Is(this.center.x, this.center.y, n, s);
    return h(this, tt).morphToSquare && this.isSquare ? this._describeSquare(this.center, r, o) : this._describeArc(this.center, r, o, n, s - e);
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
  _describeArc(e, s, n, r, o) {
    const a = (o + 360) % 360 <= 180 ? 0 : 1;
    let l = [
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
    return h(this, tt).sector && (l = l.concat(["L", e.x, e.y, "L", s.x, s.y])), l.join(" ");
  }
}
tt = new WeakMap(), di = new WeakMap(), pi = new WeakSet(), Mn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var gt, Gt, jt, Sn, On, ts;
class bh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, jt);
    m(this, gt);
    m(this, Gt);
    return this.static = !0, Object.values(Ge).includes(n) ? d(this, gt, b(this, jt, Sn).call(this, n)) : d(this, gt, n), d(this, Gt, b(this, jt, On).call(this)), this.computed(), this;
  }
  get config() {
    return h(this, gt);
  }
  set config(e) {
    d(this, gt, e), this.computed();
  }
  get xAxis() {
    return h(this, Gt).x;
  }
  get yAxis() {
    return h(this, Gt).y;
  }
  computed() {
    return b(this, jt, ts).call(this, h(this, Gt).x, h(this, gt).x.direction, h(this, gt).x), b(this, jt, ts).call(this, h(this, Gt).y, h(this, gt).y.direction, h(this, gt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
gt = new WeakMap(), Gt = new WeakMap(), jt = new WeakSet(), Sn = function(e) {
  return Ge.POLAR, {
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
}, On = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, ts = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", o = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, l = si(this.rootSVG, 10).end.fill(r), u = ie(
    this.graphConfig.origin,
    s,
    this.graphConfig.width,
    this.graphConfig.height,
    o,
    a,
    c
  );
  return u !== null && e.plot(u[0].x, u[0].y, u[1].x, u[1].y), e.stroke({ color: r, width: 1 }).marker("end", l), this.shape.add(e), e;
};
var St, Ce, mi, Tn;
class wh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, mi);
    m(this, St);
    m(this, Ce);
    return d(this, St, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), d(this, Ce, {
      x: new fi(h(this, St).expressions.x),
      y: new fi(h(this, St).expressions.y)
    }), this.shape = b(this, mi, Tn).call(this), this.computed(), this;
  }
  get config() {
    return h(this, St);
  }
  set config(e) {
    d(this, St, e), this.computed();
  }
  computed() {
    const e = h(this, St).samples ?? this.graphConfig.axis.x.x, s = h(this, St).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
    for (let a = s.min; a < s.max; a += 1 / e) {
      const { x: c, y: l } = this.evaluate(a);
      n.push({ x: c, y: l });
    }
    const r = n.map(({ x: a, y: c }, l) => `${l === 0 ? "M" : "L"} ${a} ${c}`).join(" ");
    return this.shape.plot(r), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e) {
    return H(
      {
        x: h(this, Ce).x.evaluate({ t: e }),
        y: h(this, Ce).y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
St = new WeakMap(), Ce = new WeakMap(), mi = new WeakSet(), Tn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Ot, Tt, re, Ut, Me, gi, An;
class _h extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, gi);
    m(this, Ot);
    m(this, Tt);
    m(this, re);
    m(this, Ut);
    m(this, Me);
    return d(this, Ot, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", d(this, Tt, h(this, Ot).follow.follow(0, 0)), d(this, re, { x: 0, y: 0 }), d(this, Me, this.element.line()), d(this, Ut, this.element.circle(h(this, Ot).size).center(h(this, Tt).x, h(this, Tt).y)), this.shape = b(this, gi, An).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let o = this.rootSVG.node.createSVGPoint();
      o.x = r.clientX, o.y = r.clientY, o = o.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const a = h(this, Ot).follow.follow(o.x, o.y);
      isNaN(a.y) ? h(this, Ut).hide() : (h(this, Ut).show(), h(this, Ut).center(a.x, a.y), d(this, Tt, a), d(this, re, h(this, Ot).follow.follow(o.x + 0.01, o.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return h(this, Ot);
  }
  set config(e) {
    d(this, Ot, e), this.computed();
  }
  computed() {
    const e = ie(
      h(this, Tt),
      {
        x: h(this, re).x - h(this, Tt).x,
        y: h(this, re).y - h(this, Tt).y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (h(this, Me).plot(
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
    return [h(this, Me)];
  }
  fillable() {
    return [h(this, Ut)];
  }
}
Ot = new WeakMap(), Tt = new WeakMap(), re = new WeakMap(), Ut = new WeakMap(), Me = new WeakMap(), gi = new WeakSet(), An = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var yt, yi, Nn;
class kh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, yi);
    m(this, yt);
    return d(this, yt, Object.assign({
      samples: 100
    }, n)), this.shape = b(this, yi, Nn).call(this), this.computed(), this;
  }
  get config() {
    return h(this, yt);
  }
  set config(e) {
    d(this, yt, e), this.computed();
  }
  get domain() {
    return h(this, yt).domain ? H(h(this, yt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return h(this, yt).image ? H(h(this, yt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = h(this, yt).expressions, n = this.domain;
    this.image;
    function r(l, u) {
      const [f, p, y] = l;
      return `${u === 0 ? "M" : f} ${p ?? 0} ${y ?? 0}`;
    }
    const o = e.shape.array().filter((l) => {
      const u = l[1];
      return u !== void 0 && u >= n.min && u <= n.max;
    }).map(r);
    let a = [];
    return s ? a = [...s.shape.array()].filter((l) => {
      const u = l[1];
      return u !== void 0 && u >= n.min && u <= n.max;
    }).map(r).reverse() : a = [`m ${n.min} 0`], this.shape.plot(`${o.join(" ")} ${a.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
yt = new WeakMap(), yi = new WeakSet(), Nn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var U, xi, In;
class vh extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, xi);
    m(this, U);
    d(this, U, Object.assign({}, n)), this.shape = b(this, xi, In).call(this), this.computed();
  }
  get config() {
    return h(this, U);
  }
  set config(e) {
    d(this, U, e), this.computed();
  }
  get rectangles() {
    return h(this, U).rectangles;
  }
  set rectangles(e) {
    h(this, U).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return h(this, U).position < 0 && (h(this, U).position = 0), h(this, U).position > 1 && (h(this, U).position = 1), h(this, U).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), h(this, U).position = e;
  }
  computed() {
    this.shape.clear();
    const e = H(h(this, U).domain, this.graphConfig), n = (e.max - e.min) / h(this, U).rectangles, r = (h(this, U).domain.max - h(this, U).domain.min) / h(this, U).rectangles, o = this.graphConfig.origin.y;
    for (let a = 0; a < h(this, U).rectangles; a += 1) {
      const c = e.min + a * n, l = h(this, U).domain.min + (a + this.position) * r, u = h(this, U).follow.evaluate(l).y;
      this.shape.add(
        this.element.rect(n, Math.abs(o - u)).move(c, u)
      );
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
U = new WeakMap(), xi = new WeakSet(), In = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Ht, bi, En;
class Ch extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, bi);
    m(this, Ht, "");
    n && (d(this, Ht, n), this.computed(), b(this, bi, En).call(this));
  }
  computed() {
    return this;
  }
  get d() {
    return h(this, Ht);
  }
  set d(e) {
    d(this, Ht, e), this.shape.plot(h(this, Ht));
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
Ht = new WeakMap(), bi = new WeakSet(), En = function() {
  return this.clear(), this.shape = this.element.path(h(this, Ht)).fill("none").stroke({ color: "black", width: 1 }), this.shape;
};
function Mh(i) {
  return i.reduce(
    (t, e, s, n) => s === 0 ? (
      // if first point
      `M ${e.point.x},${e.point.y}`
    ) : (
      // else
      `${t} ${Oh(e, s, n)}`
    ),
    ""
  );
}
function Sh(i, t) {
  const e = t.point.x - i.point.x, s = t.point.y - i.point.y;
  return {
    length: Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)),
    angle: Math.atan2(s, e)
  };
}
function Ls(i, t, e, s) {
  const n = t ?? i, r = e ?? i, o = i.controls.ratio ?? 0.2, a = Sh(n, r);
  let c = a.angle + (s ? Math.PI : 0);
  const l = a.length * o;
  i.controls.type === ae.VERTICAL ? c = Math.PI / 2 + (s ? Math.PI : 0) : i.controls.type === ae.HORIZONTAL && (c = 0 + (s ? Math.PI : 0));
  const u = i.point.x + Math.cos(c) * l, f = i.point.y + Math.sin(c) * l;
  return [u, f];
}
function Oh(i, t, e) {
  const [s, n] = Ls(e[t - 1], e[t - 2], i), [r, o] = Ls(i, e[t - 1], e[t + 1], !0);
  return `C ${s},${n} ${r},${o} ${i.point.x},${i.point.y}`;
}
var Se, Pt, wi, Ln;
class Th extends st {
  constructor(e, s, n) {
    super(e, s);
    m(this, wi);
    m(this, Se);
    m(this, Pt);
    d(this, Se, n), d(this, Pt, []), this.points = n.points, b(this, wi, Ln).call(this), this.computed();
  }
  computed() {
    const e = Mh(h(this, Pt));
    return this.shape.plot(e), this;
  }
  get config() {
    return h(this, Se);
  }
  set config(e) {
    d(this, Se, e);
  }
  getPointByName(e) {
    return h(this, Pt).find((s) => s.point.name === e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    throw new Error("Method not implemented.");
  }
  get points() {
    return h(this, Pt);
  }
  set points(e) {
    const s = {
      type: ae.SMOOTH,
      ratio: 0.2,
      left: null,
      right: null
    };
    d(this, Pt, e), h(this, Pt).forEach((n) => {
      n.controls = Object.assign({}, s, n.controls);
    });
  }
  setControlRatio(e, s) {
    const n = this.getPointByName(e);
    return n && (n.controls.ratio = s), this;
  }
  setControlType(e, s) {
    const n = this.getPointByName(e);
    return n && (n.controls.type = s), this;
  }
}
Se = new WeakMap(), Pt = new WeakMap(), wi = new WeakSet(), Ln = function() {
  return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
};
var I, At, Y, q, B, Oe, Ze, es;
class Ah {
  constructor(t, e) {
    m(this, Ze);
    m(this, I);
    m(this, At);
    m(this, Y);
    m(this, q);
    m(this, B);
    m(this, Oe);
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return d(this, I, Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Ge.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e)), d(this, Oe, (e == null ? void 0 : e.tex) ?? ((o) => o)), d(this, At, Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display)), d(this, B, xn().addTo(s).viewbox(0, 0, h(this, I).width, h(this, I).height)), h(this, B).data("config", {
      width: h(this, I).width,
      height: h(this, I).height,
      origin: h(this, I).origin,
      // grids: this.#grids,
      axis: h(this, I).axis
    }), d(this, q, {}), Object.values(bn).forEach((o) => {
      h(this, q)[o] = h(this, B).group().attr("id", `LAYER_${o}`);
    }), d(this, Y, {}), b(this, Ze, es).call(this), this;
  }
  get config() {
    return h(this, I);
  }
  set config(t) {
    d(this, I, t);
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        It(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new N(
          h(this, B),
          e,
          n
        );
        return h(this, q).points.add(r.element), h(this, Y)[e] = r, s && r.addLabel(
          e,
          s.html,
          h(this, Oe)
        ), r;
      },
      line: (t, e) => {
        const s = new ot(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      path: (t, e) => {
        const s = new Ch(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      bezier: (t, e) => {
        const s = new Th(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      plot: (t, e) => {
        const s = new je(h(this, B), e, t);
        return h(this, q).plots.add(s.element), h(this, Y)[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new wh(h(this, B), e, t);
        return h(this, q).plots.add(s.element), h(this, Y)[e] = s, s;
      },
      circle: (t, e) => {
        const s = new oi(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new gh(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      arc: (t, e) => {
        const s = new xh(h(this, B), e, t);
        return h(this, q).main.add(s.element), h(this, Y)[e] = s, s;
      },
      follow: (t, e) => {
        const s = new _h(h(this, B), e, t);
        return h(this, q).plots_FG.add(s.element), h(this, Y)[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new kh(h(this, B), e, t);
        return h(this, q).plots_BG.add(s.element), h(this, Y)[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new vh(h(this, B), e, t);
        return h(this, q).plots_BG.add(s.element), h(this, Y)[e] = s, s;
      }
    };
  }
  get display() {
    return h(this, At);
  }
  set display(t) {
    d(this, At, t);
  }
  get figures() {
    return h(this, Y);
  }
  get layers() {
    return h(this, q);
  }
  get rootSVG() {
    return h(this, B);
  }
  get toTex() {
    return h(this, Oe);
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), d(this, Y, {});
  }
  coordinate_system(t) {
    const e = new bh(
      h(this, B),
      "COORDINATE_SYSTEM",
      t
    );
    return h(this, q).axis.add(e.element), e;
  }
  draggable(t, e) {
    const s = (n) => {
      var f;
      const r = t, { box: o } = n.detail;
      let { x: a, y: c } = o;
      if (n.preventDefault(), a < 0 || a > h(this, I).width - o.width / 2 || c < 0 || c > h(this, I).height - o.height / 2)
        return;
      if ((f = e == null ? void 0 : e.follow) != null && f.length) {
        let p = { x: a, y: c };
        e.follow.forEach((y) => {
          y instanceof st ? p = y.follow(a, c) : typeof y == "string" ? p = this.follow(y, r)(a, c) : p = y(a, c), a = p.x, c = p.y;
        });
      }
      if (r.pixels.x === a && r.pixels.y === c)
        return;
      r.pixels = { x: a, y: c };
      const l = (e == null ? void 0 : e.target) ?? null;
      l instanceof N && (l.pixels = { x: a, y: c }), e != null && e.callback && e.callback(t);
      const u = [t.name];
      l && u.push(l.name), this.update(u);
    };
    return h(this, q).interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", s), t;
  }
  // Default follow function
  follow(t, e) {
    return t === "Ox" ? (s) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = h(this, I).axis.x.x, o = h(this, I).axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / o) * o, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
  grid(t, e) {
    const s = new yh(h(this, B), t, {
      axis: e,
      origin: h(this, I).origin,
      width: h(this, I).width,
      height: h(this, I).height,
      subdivisions: 0
    });
    return h(this, q).grids.add(s.element), s;
  }
  marker(t) {
    return si(h(this, B), t);
  }
  subgrid(t, e) {
    const s = {
      x: { x: h(this, I).axis.x.x / e, y: h(this, I).axis.x.y / e },
      y: { x: h(this, I).axis.y.x / e, y: h(this, I).axis.y.y / e }
    };
    return this.grid(t, s);
  }
  toPixels(t, e) {
    return H(t, this.config, e);
  }
  // Update each figures in the graph
  update(t, e) {
    t === void 0 && (t = []), Object.keys(this.figures).forEach((s) => {
      const n = `${s}_drag`;
      n in this.figures && t.push(s, n);
    }), Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  // Update the layout of the graph
  updateLayout() {
    h(this, B).viewbox(0, 0, h(this, I).width, h(this, I).height), h(this, B).data("config", {
      width: h(this, I).width,
      height: h(this, I).height,
      origin: h(this, I).origin,
      axis: h(this, I).axis
    }), b(this, Ze, es).call(this), this.update([], !0);
  }
}
I = new WeakMap(), At = new WeakMap(), Y = new WeakMap(), q = new WeakMap(), B = new WeakMap(), Oe = new WeakMap(), Ze = new WeakSet(), es = function() {
  h(this, q).grids.clear(), h(this, q).axis.clear(), h(this, At).subgrid && this.subgrid("SUBGRID", h(this, At).subgrid).stroke("purple/0.5", 0.1), h(this, At).grid && this.grid("MAINGRID", h(this, I).axis).stroke("lightgray", 1), h(this, At).axis && this.coordinate_system(h(this, I).system);
};
var A = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(A || {});
function et(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const Nh = [
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
var $n = (i) => {
  throw TypeError(i);
}, ks = (i, t, e) => t.has(i) || $n("Cannot " + e), ct = (i, t, e) => (ks(i, t, "read from private field"), e ? e.call(i) : t.get(i)), pe = (i, t, e) => t.has(i) ? $n("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), kt = (i, t, e, s) => (ks(i, t, "write to private field"), t.set(i, e), e), Li = (i, t, e) => (ks(i, t, "access private method"), e);
function De(i) {
  if (i === "")
    return !0;
  if (!isNaN(Number(i)))
    return parseFloat(i);
  if (/^[-.\d]+\/[-.\d]+$/.exec(i)) {
    const [t, e] = i.split("/").map(Number);
    return t / e;
  }
  if (/^[-.\d]+;[-.\d]+$/.exec(i)) {
    const [t, e] = i.split(";").map(Number);
    return { x: t, y: e };
  }
  if (/^[-.\d]+:[-.\d]+(:[xy])?$/.exec(i)) {
    const [t, e, s] = i.split(":"), n = Number(t), r = Number(e);
    return {
      min: Math.min(n, r),
      max: Math.max(n, r),
      axis: s ?? "x"
    };
  }
  if (/^[-.\d]+:[-.\d]+:[.\d]+$/.exec(i)) {
    const [t, e, s] = i.split(":").map(Number), n = Number(t), r = Number(e), o = Number(s), a = (r - n) / 100;
    return {
      min: Math.min(t, e),
      max: Math.max(t, e),
      step: Math.max(o, a)
    };
  }
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(De) : i;
}
function $i(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function Ih(i) {
  if (!i.includes("="))
    return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var ee, ge, Wt, be, ye, Pe, zn, is;
class Eh {
  constructor(t) {
    pe(this, Pe), pe(this, ee), pe(this, ge, "->"), pe(this, Wt, ","), pe(this, be, "/"), pe(this, ye, []);
    var e, s, n;
    t && (kt(this, ee, t.formatter ?? void 0), (e = t.splitter) != null && e.main && kt(this, ge, t.splitter.main), (s = t.splitter) != null && s.entry && kt(this, Wt, t.splitter.entry), (n = t.splitter) != null && n.parameter && kt(this, be, t.splitter.parameter), t.keys && kt(this, ye, t.keys));
  }
  get splitter() {
    return {
      main: ct(this, ge),
      entry: ct(this, Wt),
      parameter: ct(this, be)
    };
  }
  set splitter_main(t) {
    kt(this, ge, t);
  }
  set splitter_entry(t) {
    kt(this, Wt, t);
  }
  set splitter_parameter(t) {
    kt(this, be, t);
  }
  get formatter() {
    return ct(this, ee);
  }
  set formatter(t) {
    kt(this, ee, t);
  }
  get keys() {
    return ct(this, ye);
  }
  set keys(t) {
    kt(this, ye, t);
  }
  parse(t) {
    const [e, s] = t.split(ct(this, ge)), n = ct(this, ee) ? ct(this, ee).call(this, e) : e.trim(), { name: r, key: o, values: a } = Li(this, Pe, zn).call(this, n), c = Li(this, Pe, is).call(this, s);
    return { name: r, key: o, values: a, parameters: c };
  }
  parameters(t, e) {
    return Li(this, Pe, is).call(this, t, e ?? ct(this, ye));
  }
}
ee = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakSet(), zn = function(i) {
  const [t, ...e] = i.split(" "), [s, n] = t.split("="), r = $i(
    e.join(" "),
    ct(this, Wt)
  ).map((o) => De(o));
  return { name: s, key: n, values: r };
}, is = function(i, t) {
  if (i === void 0)
    return {};
  let e;
  if (t === void 0 || t.length === 0)
    e = $i(i, ct(this, Wt));
  else {
    const n = $i(i, ct(this, Wt)), r = t.map((o) => `${o}=`);
    e = [], n.forEach((o) => {
      if (t.includes(o))
        e.push(o);
      else if (o.includes("=")) {
        const a = o.split("=")[0] + "=";
        r.includes(a) && e.push(o);
      } else
        e[e.length - 1].includes("=") ? e[e.length - 1] += `,${o}` : e.push(o);
    });
  }
  const s = {};
  return e.forEach((n) => {
    const { key: r, value: o } = Ih(n);
    if (/^[-.\d]+\/[-.\d]+$/.exec(o)) {
      s[r] = {
        value: De(o),
        options: []
      };
      return;
    }
    const [a, ...c] = o.split(ct(this, be));
    s[r] = {
      value: De(a),
      options: c.map((l) => De(l))
    };
  }), s;
};
function Lh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof N && (r instanceof N || typeof r == "number"))
      return {
        create: "circle",
        config: { center: n, radius: r }
      };
  }
  return null;
}
function $h(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.ARC.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof N && r instanceof N && o instanceof N)
      return {
        create: "arc",
        config: { start: n, center: r, end: o, radius: a }
      };
  }
  return null;
}
const Lt = "line";
function Bt(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.LINE.toString() || i.key === A.SEGMENT.toString() || i.key === A.VECTOR.toString() || i.key === A.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof N && r instanceof N) {
      let o = "line";
      switch (i.key) {
        case A.SEGMENT.toString():
          o = "segment";
          break;
        case A.VECTOR.toString():
          o = "vector";
          break;
        case A.RAY.toString():
          o = "ray";
          break;
      }
      return {
        create: Lt,
        config: {
          through: { A: n, B: r },
          shape: o
        }
      };
    }
  }
  if (i.key === A.LINE.toString() && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const p = et([n.split("=")[1]], t)[0], y = H({ x: 0, y: p }, e);
      return {
        create: Lt,
        config: {
          director: { A: y, d: { x: 1, y: 0 } },
          shape: "line"
        }
      };
    }
    if (n.startsWith("x=")) {
      const p = et([n.split("=")[1]], t)[0], y = H({ x: p, y: 0 }, e);
      return {
        create: Lt,
        config: {
          director: { A: y, d: { x: 0, y: 1 } },
          shape: "line"
        }
      };
    }
    const [r, o] = n.split("="), a = $s(r), c = $s(o), l = {
      a: a.a - c.a,
      b: a.b - c.b,
      c: a.c - c.c
    }, u = H({ x: 0, y: -l.c / l.b }, e), f = {
      x: l.b,
      y: l.a
    };
    return {
      create: Lt,
      config: {
        director: { A: u, d: f },
        shape: "line"
      }
    };
  }
  if (i.key === A.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof N && r instanceof N)
      return {
        create: Lt,
        config: { mediator: { A: n, B: r } }
      };
  }
  if (i.key === A.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof N)
      return {
        create: Lt,
        config: { perpendicular: { to: n, through: r } }
      };
  }
  if (i.key === A.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof N)
      return {
        create: Lt,
        config: { parallel: { to: n, through: r } }
      };
  }
  if (i.key === A.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ot && r instanceof ot)
      return {
        create: Lt,
        config: { bisector: { d1: n, d2: r } }
      };
  }
  if (i.key === A.BISECTOR.toString() && s.length === 3) {
    const [n, r, o] = s;
    if (r instanceof N && n instanceof N && o instanceof N)
      return {
        create: Lt,
        config: { bisector: { A: r, B: n, C: o } }
      };
  }
  return null;
}
function $s(i) {
  const t = i.split(/([+-]?[0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = zs(t, "x"), s = zs(t, "y"), n = _n(t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? 0);
  return {
    a: +et([e], {})[0],
    b: +et([s], {})[0],
    c: +et([n], {})[0]
  };
}
function zs(i, t) {
  return i.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : _n(e.replace(t, "")))[0] ?? 0;
}
function zh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.PLOT.toString()) {
    const [n, ...r] = s, o = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((l) => Et(l));
    a.length > 0 && (o.domain = a[0]), a.length > 1 && (o.image = a[1]);
    const c = r.filter((l) => typeof l == "number");
    return c.length > 0 && (o.samples = c[0] > 0 ? c[0] : 10), {
      create: "plot",
      config: o
    };
  }
  return null;
}
function Dh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return {
        create: "parametric",
        config: { expressions: { x: n, y: r } }
      };
  }
  return null;
}
function Ph(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof je)
      return {
        create: "follow",
        config: {
          follow: n,
          tangent: r === "show"
        }
      };
  }
  return null;
}
function jh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.FILL_BETWEEN.toString() && s.length >= 2) {
    const n = s[0], r = s[1] instanceof je ? s[1] : null, o = Et(s[1]) ? s[1] : s[2], a = Et(s[1]) ? s[2] : s[3];
    if (n instanceof je)
      return {
        create: "fillbetween",
        config: {
          expressions: r instanceof je ? [n, r] : [n],
          domain: Et(o) ? o : { min: NaN, max: NaN },
          image: Et(a) ? a : { min: NaN, max: NaN }
        }
      };
  }
  return null;
}
function Rh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.RIEMANN.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    return {
      create: "riemann",
      config: {
        follow: n,
        domain: Et(r) ? r : { min: NaN, max: NaN },
        rectangles: typeof o == "number" ? o : 5,
        position: typeof a == "number" ? a : 0
      }
    };
  }
  return null;
}
const Bh = "point";
function me(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).find((a) => a.includes("*") || a.includes("s") || a.includes("o"));
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
  const o = Fh(i, t);
  return o ? {
    create: Bh,
    config: Object.assign(o, { shape: s, size: n })
  } : null;
}
function Fh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.POINT.toString()) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === A.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && r instanceof N)
      return { middle: { A: n, B: r } };
  }
  if (i.key === A.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && (r instanceof ot || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === A.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof N && (r instanceof N || r instanceof ot || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === A.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof N && (r instanceof ot || r === "Ox" || r === "Oy") && typeof o == "number")
      return {
        direction: {
          direction: r,
          distance: o,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === A.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    if (n instanceof N && r instanceof N)
      return {
        direction: {
          point: a instanceof N ? a : n,
          direction: { A: n, B: r },
          distance: typeof o == "number" ? o : 1
        }
      };
  }
  return null;
}
const Ds = "polygon";
function Ps(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof N))
      return {
        create: Ds,
        config: { vertices: n }
      };
  }
  if (i.key === A.REGULAR.toString() && s.length >= 3) {
    const [n, r, o] = s;
    if (n instanceof N && (typeof r == "number" || r instanceof N) && typeof o == "number")
      return {
        create: Ds,
        config: {
          regular: {
            center: n,
            radius: r,
            sides: o
          }
        }
      };
  }
  return null;
}
function qh(i, t, e) {
  return {
    create: "bezier",
    config: { points: i.values.map((n) => {
      if (typeof n == "string") {
        const [r, o, a] = n.split("/");
        if (!(r in t))
          return null;
        const c = t[r];
        let l;
        switch (o) {
          case "H":
            l = ae.HORIZONTAL;
            break;
          case "V":
            l = ae.VERTICAL;
            break;
          default:
            l = ae.SMOOTH;
        }
        return {
          point: c,
          controls: {
            type: l,
            ratio: a === void 0 ? 0.2 : +a,
            left: null,
            right: null
          }
        };
      } else
        return null;
    }).filter((n) => n !== null) }
  };
}
const Vh = "point";
function Gh(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).find((a) => a.includes("*") || a.includes("s") || a.includes("o"));
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
  const o = Uh(i, t);
  return o ? o.map((a) => ({
    create: Vh,
    config: Object.assign(a, { shape: s, size: n })
  })) : null;
}
function Uh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === A.INTERSECTION.toString() && s.length >= 2) {
    const n = s[0], r = s[1];
    if ((n instanceof ot || n === "Ox" || n === "Oy") && (r instanceof ot || r === "Ox" || r === "Oy"))
      return [
        {
          intersection: { A: n, B: r }
        }
      ];
    if (n instanceof oi && r instanceof ot)
      return [
        {
          intersectionWithCircle: {
            A: n,
            B: r,
            index: 0
          }
        },
        {
          intersectionWithCircle: {
            A: n,
            B: r,
            index: 1
          }
        }
      ];
    if (n instanceof oi && r instanceof oi)
      return [
        {
          intersectionBetweenCircles: {
            A: n,
            B: r,
            index: 0
          }
        },
        {
          intersectionBetweenCircles: {
            A: n,
            B: r,
            index: 1
          }
        }
      ];
  }
  return null;
}
const js = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: me
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: me
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: me
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: me
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: me
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line|circle>,<line|circle>",
    parameters: [],
    build: Gh
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: me
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Bt
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: Bt
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: Bt
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Bt
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: Bt
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: Bt
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: Bt
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
    build: Bt
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Lh
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: $h
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: zh
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: Dh
  },
  bezier: {
    name: "bezier",
    description: "bezier curve through points",
    code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
    parameters: [],
    build: qh
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: Ps
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: Ps
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: Ph
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: jh
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: Rh
  }
}, Rs = [
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
var oe, Te, Xt, D, Dn, Pn, ss, jn, Rn, Bn, Fn, qn, Vn, Gn, Un, Hn;
class Qh extends Ah {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    m(this, D);
    m(this, oe);
    m(this, Te);
    m(this, Xt);
    return d(this, Te, new Eh({
      formatter: (n) => b(this, D, Bn).call(this, n),
      keys: Rs,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    })), d(this, Xt, {}), s != null && s.parameters && this.refreshLayout(s.parameters), d(this, oe, []), s != null && s.code && b(this, D, ss).call(this, s.code), this;
  }
  get code() {
    return h(this, oe);
  }
  static documentation() {
    return js;
  }
  /**
   * Refresh the code to display
   * @param code Code to parse and display
   */
  refresh(e) {
    this.clear(), b(this, D, ss).call(this, e);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(e) {
    const s = b(this, D, Gn).call(this, e);
    this.config = s.config, this.display = s.display, d(this, Xt, s.settings), this.updateLayout();
  }
}
oe = new WeakMap(), Te = new WeakMap(), Xt = new WeakMap(), D = new WeakSet(), Dn = function(e, s, n) {
  if (e instanceof N) {
    const r = [], o = [], a = this.create.point({ x: 0, y: 0 }, e.name + "_drag");
    a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[s].value, ...n[s].options].forEach((l) => {
      if (["grid", "Ox", "Oy"].includes(l) && r.push(this.follow(l, e)), Et(l)) {
        const u = l.axis ?? "x", f = this.toPixels(l, u);
        r.push(
          (p, y) => ({
            x: u === "x" ? Math.max(f.min, Math.min(p, f.max)) : p,
            y: u === "y" ? Math.max(f.min, Math.min(y, f.max)) : y
          })
        );
      }
      if (Object.hasOwn(this.figures, l)) {
        const u = this.figures[l];
        o.push((f, p) => u.follow(f, p));
      }
    }), this.draggable(
      a,
      {
        target: e,
        follow: [
          ...r,
          ...o
        ]
      }
    );
  }
}, Pn = function(e, s) {
  Object.keys(e).forEach((n) => {
    var r;
    switch (n) {
      // Appearance
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
      case "color": {
        const o = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
        s.stroke(o);
        break;
      }
      case "fill": {
        const o = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
        s.fill(o);
        break;
      }
      case "dash": {
        e[n].value === !0 ? s.dash() : s.dash(e[n].value);
        break;
      }
      case "dot":
        s.dot();
        break;
      case "mark":
        s.mark(
          e[n].value,
          e[n].options
        );
        break;
      // Visibility
      case "hide":
        s.hide();
        break;
      case "!":
        s.element.children().forEach((o) => {
          o.attr("id") !== `${s.name}-label` && o.hide();
        });
        break;
      case "#":
      case "static":
        s.static = e[n].value;
        break;
      case "?":
        (r = s.label) == null || r.hide();
        break;
      // Placement
      case "move":
        s.move(e[n].value);
        break;
      case "scale":
        s.scale(e[n].value);
        break;
      // Label and text
      case "label":
      case "tex": {
        let o = s.name;
        if (typeof e[n].value == "string" && (o = e[n].value), n === "tex" && o.length === 2 && !isNaN(+o[1]) && (o = o[0] + "_" + o[1]), s.addLabel(
          o,
          n === "tex",
          this.toTex
        ), s.label) {
          const a = e[n].options[0] === !1 || e[n].options[0] === !0 ? "br" : e[n].options[0], c = e[n].options[1] ?? { x: 0, y: 0 }, l = {
            x: c.x * this.config.axis.x.x,
            y: -c.y * this.config.axis.y.y
          }, u = e[n].options[2];
          s.label.position(
            a,
            l,
            u
          );
        }
        break;
      }
      // Draggable
      case "drag":
        b(this, D, Dn).call(this, s, n, e);
        break;
      default:
        Nh.includes(n) && s.stroke(n);
    }
  });
}, /**
 * Build the figures from the code
 */
ss = function(e) {
  d(this, oe, b(this, D, Un).call(this, e));
  const s = js;
  h(this, oe).forEach((n) => {
    n.name = b(this, D, Hn).call(this, n.name);
    let r;
    if (Object.hasOwn(s, n.key)) {
      const { build: o, parameters: a } = s[n.key];
      a && a.length > 0 && Object.keys(n.parameters).length === 0 && Object.keys(n.parameters).filter((u) => a.includes(u)).forEach((u) => {
        n.parameters[u] = { value: !0, options: [] };
      });
      let c = o(n, this.figures, this.config);
      c && (Array.isArray(c) || (c = [c]), c.forEach((l, u) => {
        try {
          const { config: f, create: p } = l;
          f && p && (r = this.create[p](f, n.name + (c.length > 1 ? `${u + 1}` : "")));
        } catch (f) {
          console.error(f);
        }
        r && b(this, D, jn).call(this, r, n);
      }));
    }
  });
}, jn = function(e, s) {
  h(this, Xt).label && e instanceof N && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.label = { value: !0, options: [] }), h(this, Xt).tex && e instanceof N && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.tex = { value: !0, options: [] }), e instanceof N && h(this, Xt).points === !1 && (s.parameters["!"] = { value: !0, options: [] }), b(this, D, Pn).call(this, s.parameters, e);
}, Rn = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, Bn = function(e) {
  return /^[A-Z][0-9]*\(.*\)$/.exec(e) ? b(this, D, Vn).call(this, e) : /^[a-z][0-9]*\([x|t]\)/.exec(e) ? b(this, D, qn).call(this, e) : e.includes("=") && !e.includes(" ") ? b(this, D, Fn).call(this, e) : e;
}, // TO BE MOVED TO BUILD_LINE
Fn = function(e) {
  const [s, ...n] = e.split("=");
  let r = n.join("="), o = r[0];
  o !== "v" && o !== "[" && (o = null);
  let a = r[r.length - 1];
  a !== "." && a !== "]" && a !== "[" && (a = null);
  let c = "line";
  o === "v" && a === null ? (r = r.slice(1), c = "vec") : o === null && a === "." || o === "[" && a === "]" ? (o === "[" && (r = r.slice(1)), r = r.slice(0, -1), c = "seg") : (o === "[" && a === "[" || o === null && a === "[" || o === "[" && a === null) && (o === "[" && (r = r.slice(1)), a === "[" && (r = r.slice(0, -1)), c = "ray");
  const l = r.split(/(?=[A-Z])/);
  return `${s}=${c} ${l[0]},${l[1]}`;
}, // TO BE MOVED TO BUILD_PLOT
qn = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], o = e.includes("(x)=") ? A.PLOT : A.PARAMETRIC;
  return `${r}=${o} ${n}`;
}, // TO BE MOVED TO BUILD_POINT
Vn = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
  return `${s}=pt ${n[0]},${n[1]}`;
}, Gn = function(e) {
  const s = h(this, Te).parameters(e ?? "", Rs), n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && Et(s.x.value) ? s.x.value : { min: -8, max: 8 }, o = s.y && Et(s.y.value) ? s.y.value : { min: -8, max: 8 }, a = Math.abs(r.max - r.min), c = Math.abs(o.max - o.min), l = a * n, u = c * n, f = {
    x: -r.min * n,
    y: o.max * n
  }, p = Ge.CARTESIAN_2D, y = {
    x: { x: n, y: 0 },
    y: { x: 0, y: -n }
  }, v = !!s.grid, M = !!s.axis, S = s.subgrid ? parseFloat(s.subgrid.value) : 0, z = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: l,
      height: u,
      origin: f,
      system: p,
      axis: y
    },
    display: {
      grid: v,
      subgrid: S,
      axis: M
    },
    settings: z
  };
}, /**
 * Prepare the code to load
 * @param input Input code to parse and prepare
 * @returns
 */
Un = function(e) {
  const s = [], n = e.split(`
`).map((o) => o.trim()).filter((o) => o.trim() !== "" && !o.startsWith("$")), r = {};
  for (const o of n) {
    if (o.startsWith("@")) {
      const { key: c, value: l } = b(this, D, Rn).call(this, o);
      r[c] = { value: l, options: [] };
      continue;
    }
    const a = h(this, Te).parse(o);
    a.parameters = Object.assign(
      a.parameters,
      r
    ), s.push(a);
  }
  return s;
}, Hn = function(e) {
  let s = e, n = 1;
  for (; this.figures[s]; )
    s = `${e}_${n}`, n++;
  return s;
};
export {
  ah as AXIS,
  ae as BEZIERCONTROL,
  Ge as COORDINATE_SYSTEM,
  bn as LAYER_NAME,
  lh as LINECONSTRAINT,
  ch as POINTCONSTRAINT,
  uh as POLYGON_CONSTRAINT,
  Qh as PiDraw,
  Ah as PiGraph,
  Et as isDOMAIN,
  It as isXY
};
//# sourceMappingURL=pidraw.js.map
