var Zn = Object.defineProperty;
var Ts = (i) => {
  throw TypeError(i);
};
var Kn = (i, t, e) => t in i ? Zn(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var z = (i, t, e) => Kn(i, typeof t != "symbol" ? t + "" : t, e), Ti = (i, t, e) => t.has(i) || Ts("Cannot " + e);
var a = (i, t, e) => (Ti(i, t, "read from private field"), e ? e.call(i) : t.get(i)), m = (i, t, e) => t.has(i) ? Ts("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, s) => (Ti(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), y = (i, t, e) => (Ti(i, t, "access private method"), e);
const zi = {}, qs = [];
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
  Vs(Object.getOwnPropertyNames(t)), zi[i] = Object.assign(zi[i] || {}, t);
}
function rt(i) {
  return zi[i] || {};
}
function Qn() {
  return [...new Set(qs)];
}
function Vs(i) {
  qs.push(...i);
}
function ns(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function Jn(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function Si(i) {
  return i % 360 * Math.PI / 180;
}
function tr(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function Gs(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Oe(i, t, e, s) {
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
    const { height: h, width: c, x: u, y: l } = t.bbox();
    r && (s = s.includes("left") ? u : s.includes("right") ? u + c : u + c / 2), o && (n = n.includes("top") ? l : n.includes("bottom") ? l + h : l + h / 2);
  }
  return [s, n];
}
const er = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Pi = (i) => er.has(i.nodeName), Xs = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, rs = "http://www.w3.org/2000/svg", ir = "http://www.w3.org/1999/xhtml", Mi = "http://www.w3.org/2000/xmlns/", Qe = "http://www.w3.org/1999/xlink", O = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function sr() {
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
const ne = {}, hs = "___SYMBOL___ROOT___";
function je(i, t = rs) {
  return O.document.createElementNS(t, i);
}
function tt(i, t = !1) {
  if (i instanceof os) return i;
  if (typeof i == "object")
    return Oi(i);
  if (i == null)
    return new ne[hs]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return Oi(O.document.querySelector(i));
  const e = t ? O.document.createElement("div") : je("svg");
  return e.innerHTML = i, i = Oi(e.firstChild), e.removeChild(e.firstChild), i;
}
function R(i, t) {
  return t && (t instanceof O.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : je(i);
}
function dt(i) {
  if (!i) return null;
  if (i.instance instanceof os) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new ne.Fragment(i);
  let t = Gs(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : ne[t] || (t = "Dom"), new ne[t](i);
}
let Oi = dt;
function A(i, t = i.name, e = !1) {
  return ne[t] = i, e && (ne[hs] = i), Vs(Object.getOwnPropertyNames(i.prototype)), i;
}
function nr(i) {
  return ne[i];
}
let rr = 1e3;
function Hs(i) {
  return "Svgjs" + Gs(i) + rr++;
}
function Us(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    Us(i.children[t]);
  return i.id && (i.id = Hs(i.nodeName)), i;
}
function C(i, t) {
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
function or() {
  return this.parent().children();
}
function hr() {
  return this.parent().index(this);
}
function ar() {
  return this.siblings()[this.position() + 1];
}
function cr() {
  return this.siblings()[this.position() - 1];
}
function ur() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function lr() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function fr() {
  return this.parent().add(this.remove()), this;
}
function dr() {
  return this.parent().add(this.remove(), 0), this;
}
function pr(i) {
  i = tt(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function mr(i) {
  i = tt(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function gr(i) {
  return i = tt(i), i.before(this), this;
}
function yr(i) {
  return i = tt(i), i.after(this), this;
}
_("Dom", {
  siblings: or,
  position: hr,
  next: ar,
  prev: cr,
  forward: ur,
  backward: lr,
  front: fr,
  back: dr,
  before: pr,
  after: mr,
  insertBefore: gr,
  insertAfter: yr
});
const Ys = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, xr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, br = /rgb\((\d+),(\d+),(\d+)\)/, wr = /(#[a-z_][a-z0-9\-_]*)/i, _r = /\)\s*,?\s*/, vr = /\s/g, Ss = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Ms = /^rgb\(/, Os = /^(\s+)?$/, As = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, kr = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, jt = /[\s,]+/, as = /[MLHVCSQTAZ]/i;
function Cr() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(jt);
}
function Tr(i) {
  return this.classes().indexOf(i) !== -1;
}
function Sr(i) {
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
function Or(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
_("Dom", {
  classes: Cr,
  hasClass: Tr,
  addClass: Sr,
  removeClass: Mr,
  toggleClass: Or
});
function Ar(i, t) {
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
          i[s] == null || Os.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || Os.test(t) ? "" : t
  ), this;
}
function Nr() {
  return this.css("display", "");
}
function Ir() {
  return this.css("display", "none");
}
function Er() {
  return this.css("display") !== "none";
}
_("Dom", {
  css: Ar,
  show: Nr,
  hide: Ir,
  visible: Er
});
function Lr(i, t, e) {
  if (i == null)
    return this.data(
      ns(
        Jn(
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
_("Dom", { data: Lr });
function $r(i, t) {
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
function zr() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function Dr() {
  return this._memory = this._memory || {};
}
_("Dom", { remember: $r, forget: zr, memory: Dr });
function Pr(i) {
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
function jr(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function ce(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function Rr(i, t) {
  const e = ce(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : ce(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : ce(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : ce(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : ce(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : ce(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function Br(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function Ai(i, t, e) {
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
      const h = 24 * s() + 57, c = 38 * s() + 45, u = 360 * s();
      return new $(h, c, u, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const h = n(80 * r(2 * o * e / 0.5 + 0.01) + 150), c = n(50 * r(2 * o * e / 0.5 + 4.6) + 200), u = n(100 * r(2 * o * e / 0.5 + 2.3) + 150);
      return new $(h, c, u);
    } else if (t === "pastel") {
      const h = 8 * s() + 86, c = 17 * s() + 9, u = 360 * s();
      return new $(h, c, u, "lch");
    } else if (t === "dark") {
      const h = 10 + 10 * s(), c = 50 * s() + 86, u = 360 * s();
      return new $(h, c, u, "lch");
    } else if (t === "rgb") {
      const h = 255 * s(), c = 255 * s(), u = 255 * s();
      return new $(h, c, u);
    } else if (t === "lab") {
      const h = 100 * s(), c = 256 * s() - 128, u = 256 * s() - 128;
      return new $(h, c, u, "lab");
    } else if (t === "grey") {
      const h = 255 * s();
      return new $(h, h, h);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (Ss.test(t) || Ms.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((p) => p / 255), h = Math.min(1 - n, 1 - r, 1 - o);
    if (h === 1)
      return new $(0, 0, 0, 1, "cmyk");
    const c = (1 - n - h) / (1 - h), u = (1 - r - h) / (1 - h), l = (1 - o - h) / (1 - h);
    return new $(c, u, l, h, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((v) => v / 255), h = Math.max(n, r, o), c = Math.min(n, r, o), u = (h + c) / 2, l = h === c, f = h - c, p = l ? 0 : u > 0.5 ? f / (2 - h - c) : f / (h + c), b = l ? 0 : h === n ? ((r - o) / f + (r < o ? 6 : 0)) / 6 : h === r ? ((o - n) / f + 2) / 6 : h === o ? ((n - r) / f + 4) / 6 : 0;
    return new $(360 * b, 100 * p, 100 * u, "hsl");
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
      const f = Rr(t, e);
      Object.assign(this, f);
    } else if (typeof t == "string")
      if (Ms.test(t)) {
        const f = t.replace(vr, ""), [p, b, M] = br.exec(f).slice(1, 4).map((v) => parseInt(v));
        Object.assign(this, { _a: p, _b: b, _c: M, _d: 0, space: "rgb" });
      } else if (Ss.test(t)) {
        const f = (v) => parseInt(v, 16), [, p, b, M] = xr.exec(Pr(t)).map(f);
        Object.assign(this, { _a: p, _b: b, _c: M, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: o, _b: h, _c: c, _d: u } = this, l = this.space === "rgb" ? { r: o, g: h, b: c } : this.space === "xyz" ? { x: o, y: h, z: c } : this.space === "hsl" ? { h: o, s: h, l: c } : this.space === "lab" ? { l: o, a: h, b: c } : this.space === "lch" ? { l: o, c: h, h: c } : this.space === "cmyk" ? { c: o, m: h, y: c, k: u } : {};
    Object.assign(this, l);
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
    if (Br(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: b, a: M, b: v } = this;
        if (this.space === "lch") {
          const { c: ft, h: ni } = this, ri = Math.PI / 180;
          M = ft * Math.cos(ri * ni), v = ft * Math.sin(ri * ni);
        }
        const k = (b + 16) / 116, N = M / 500 + k, H = k - v / 200, Y = 16 / 116, ut = 8856e-6, lt = 7.787;
        t = 0.95047 * (N ** 3 > ut ? N ** 3 : (N - Y) / lt), e = 1 * (k ** 3 > ut ? k ** 3 : (k - Y) / lt), s = 1.08883 * (H ** 3 > ut ? H ** 3 : (H - Y) / lt);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, o = t * 0.0557 + e * -0.204 + s * 1.057, h = Math.pow, c = 31308e-7, u = n > c ? 1.055 * h(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > c ? 1.055 * h(r, 1 / 2.4) - 0.055 : 12.92 * r, f = o > c ? 1.055 * h(o, 1 / 2.4) - 0.055 : 12.92 * o;
      return new $(255 * u, 255 * l, 255 * f);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new $(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, o = 255 * Ai(r, n, t + 1 / 3), h = 255 * Ai(r, n, t), c = 255 * Ai(r, n, t - 1 / 3);
      return new $(o, h, c);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), o = 255 * (1 - Math.min(1, e * (1 - n) + n)), h = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new $(r, o, h);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(jr);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((N) => N / 255), h = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, u = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, l = (h * 0.4124 + c * 0.3576 + u * 0.1805) / 0.95047, f = (h * 0.2126 + c * 0.7152 + u * 0.0722) / 1, p = (h * 0.0193 + c * 0.1192 + u * 0.9505) / 1.08883, b = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, M = f > 8856e-6 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, v = p > 8856e-6 ? Math.pow(p, 1 / 3) : 7.787 * p + 16 / 116;
    return new $(b, M, v, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a: t, _b: e, _c: s } = this.rgb(), { max: n, min: r, round: o } = Math, h = (c) => n(0, r(o(c), 255));
    return [t, e, s].map(h);
  }
  /*
  Constructing colors
  */
}
let U = class Ws {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new Ws(this);
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
function Fr(i, t) {
  return new U(i, t).transformO(this.screenCTM().inverseO());
}
function ue(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class x {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, o = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, h = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, u = t.shear || 0, l = t.rotate || t.theta || 0, f = new U(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), p = f.x, b = f.y, M = new U(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), v = M.x, k = M.y, N = new U(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), H = N.x, Y = N.y, ut = new U(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), lt = ut.x, ft = ut.y;
    return {
      scaleX: h,
      scaleY: c,
      skewX: r,
      skewY: o,
      shear: u,
      theta: l,
      rx: lt,
      ry: ft,
      tx: H,
      ty: Y,
      ox: p,
      oy: b,
      px: v,
      py: k
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
    const n = t.a * e.a + t.c * e.b, r = t.b * e.a + t.d * e.b, o = t.a * e.c + t.c * e.d, h = t.b * e.c + t.d * e.d, c = t.e + t.a * e.e + t.c * e.f, u = t.f + t.b * e.e + t.d * e.f;
    return s.a = n, s.b = r, s.c = o, s.d = h, s.e = c, s.f = u, s;
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
    const s = this.a, n = this.b, r = this.c, o = this.d, h = this.e, c = this.f, u = s * o - n * r, l = u > 0 ? 1 : -1, f = l * Math.sqrt(s * s + n * n), p = Math.atan2(l * n, l * s), b = 180 / Math.PI * p, M = Math.cos(p), v = Math.sin(p), k = (s * r + n * o) / u, N = r * f / (k * s - n) || o * f / (k * n + s), H = h - t + t * M * f + e * (k * M * f - v * N), Y = c - e + t * v * f + e * (k * v * f + M * N);
    return {
      // Return the affine parameters
      scaleX: f,
      scaleY: N,
      shear: k,
      rotate: b,
      translateX: H,
      translateY: Y,
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
    return ue(this.a, e.a) && ue(this.b, e.b) && ue(this.c, e.c) && ue(this.d, e.d) && ue(this.e, e.e) && ue(this.f, e.f);
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
    return t = t instanceof _t ? t.matrixify() : typeof t == "string" ? x.fromArray(t.split(jt).map(parseFloat)) : Array.isArray(t) ? x.fromArray(t) : typeof t == "object" && x.isMatrixLike(t) ? t : typeof t == "object" ? new x().transform(t) : arguments.length === 6 ? x.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, o = this.f, h = t * n - e * s;
    if (!h) throw new Error("Cannot invert " + this);
    const c = n / h, u = -e / h, l = -s / h, f = t / h, p = -(c * r + l * o), b = -(u * r + f * o);
    return this.a = c, this.b = u, this.c = l, this.d = f, this.e = p, this.f = b, this;
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
    t = Si(t);
    const n = Math.cos(t), r = Math.sin(t), { a: o, b: h, c, d: u, e: l, f } = this;
    return this.a = o * n - h * r, this.b = h * n + o * r, this.c = c * n - u * r, this.d = u * n + c * r, this.e = l * n - f * r + s * r - e * n + e, this.f = f * n + l * r - e * r - s * n + s, this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t);
    const { a: r, b: o, c: h, d: c, e: u, f: l } = this;
    return this.a = r * t, this.b = o * e, this.c = h * t, this.d = c * e, this.e = u * t - s * t + s, this.f = l * e - n * e + n, this;
  }
  // Shear matrix
  shear(t, e, s) {
    return this.clone().shearO(t, e, s);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(t, e = 0, s = 0) {
    const { a: n, b: r, c: o, d: h, e: c, f: u } = this;
    return this.a = n + r * t, this.c = o + h * t, this.e = c + u * t - s * t, this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t), t = Si(t), e = Si(e);
    const r = Math.tan(t), o = Math.tan(e), { a: h, b: c, c: u, d: l, e: f, f: p } = this;
    return this.a = h + c * r, this.b = c + h * o, this.c = u + l * r, this.d = l + u * o, this.e = f + p * r - n * r, this.f = p + f * o - s * o, this;
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
    const e = x.formatTransforms(t), s = this, { x: n, y: r } = new U(e.ox, e.oy).transform(s), o = new x().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const h = new U(n, r).transform(o), c = isFinite(e.px) ? e.px - h.x : 0, u = isFinite(e.py) ? e.py - h.y : 0;
      o.translateO(c, u);
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
function qr() {
  return new x(this.node.getCTM());
}
function Vr() {
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
A(x, "Matrix");
function Bt() {
  if (!Bt.nodes) {
    const i = tt().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    Bt.nodes = { svg: i, path: t };
  }
  if (!Bt.nodes.svg.node.parentNode) {
    const i = O.document.body || O.document.documentElement;
    Bt.nodes.svg.addTo(i);
  }
  return Bt.nodes;
}
function Zs(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function Gr(i) {
  return i === O.document || (O.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === O.document;
  }).call(O.document.documentElement, i);
}
class W {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += O.window.pageXOffset, this.y += O.window.pageYOffset, new W(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(jt).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return Zs(this);
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
    t instanceof x || (t = new x(t));
    let e = 1 / 0, s = -1 / 0, n = 1 / 0, r = -1 / 0;
    return [
      new U(this.x, this.y),
      new U(this.x2, this.y),
      new U(this.x, this.y2),
      new U(this.x2, this.y2)
    ].forEach(function(h) {
      h = h.transform(t), e = Math.min(e, h.x), s = Math.max(s, h.x), n = Math.min(n, h.y), r = Math.max(r, h.y);
    }), new W(e, n, s - e, r - n);
  }
}
function Ks(i, t, e) {
  let s;
  try {
    if (s = t(i.node), Zs(s) && !Gr(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Xr() {
  const e = Ks(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(Bt().svg).show(), o = r.node.getBBox();
      return r.remove(), o;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new W(e);
}
function Hr(i) {
  const s = Ks(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new W(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Ur(i, t) {
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
      const n = this.viewbox(), r = e / n.width, o = s / n.height, h = Math.min(r, o);
      if (i == null)
        return h;
      let c = h / i;
      c === 1 / 0 && (c = Number.MAX_SAFE_INTEGER / 100), t = t || new U(e / 2 / r + n.x, s / 2 / o + n.y);
      const u = new W(n).transform(
        new x({ scale: c, origin: t })
      );
      return this.viewbox(u);
    }
  }
});
A(W, "Box");
class oe extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
C([oe], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Yr = ["toArray", "constructor", "each"];
oe.extend = function(i) {
  i = i.reduce((t, e) => (Yr.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), C([oe], i);
};
function Ae(i, t) {
  return new oe(
    ns((t || O.document).querySelectorAll(i), function(e) {
      return dt(e);
    })
  );
}
function Wr(i) {
  return Ae(i, this.node);
}
function Zr(i) {
  return dt(this.node.querySelector(i));
}
let Kr = 0;
const Qs = {};
function Js(i) {
  let t = i.getEventHolder();
  return t === O.window && (t = Qs), t.events || (t.events = {}), t.events;
}
function cs(i) {
  return i.getEventTarget();
}
function Qr(i) {
  let t = i.getEventHolder();
  t === O.window && (t = Qs), t.events && (t.events = {});
}
function Re(i, t, e, s, n) {
  const r = e.bind(s || i), o = tt(i), h = Js(o), c = cs(o);
  t = Array.isArray(t) ? t : t.split(jt), e._svgjsListenerId || (e._svgjsListenerId = ++Kr), t.forEach(function(u) {
    const l = u.split(".")[0], f = u.split(".")[1] || "*";
    h[l] = h[l] || {}, h[l][f] = h[l][f] || {}, h[l][f][e._svgjsListenerId] = r, c.addEventListener(l, r, n || !1);
  });
}
function At(i, t, e, s) {
  const n = tt(i), r = Js(n), o = cs(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(jt), t.forEach(function(h) {
    const c = h && h.split(".")[0], u = h && h.split(".")[1];
    let l, f;
    if (e)
      r[c] && r[c][u || "*"] && (o.removeEventListener(
        c,
        r[c][u || "*"][e],
        s || !1
      ), delete r[c][u || "*"][e]);
    else if (c && u) {
      if (r[c] && r[c][u]) {
        for (f in r[c][u])
          At(o, [c, u].join("."), f);
        delete r[c][u];
      }
    } else if (u)
      for (h in r)
        for (l in r[h])
          u === l && At(o, [h, u].join("."));
    else if (c) {
      if (r[c]) {
        for (l in r[c])
          At(o, [c, l].join("."));
        delete r[c];
      }
    } else {
      for (h in r)
        At(o, h);
      Qr(n);
    }
  }));
}
function Jr(i, t, e, s) {
  const n = cs(i);
  return t instanceof O.window.Event || (t = new O.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Je extends os {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return Jr(this, t, e, s);
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
    return At(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Re(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
A(Je, "EventTarget");
function Ns() {
}
const Ee = {
  duration: 400,
  ease: ">",
  delay: 0
}, to = {
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
class Me extends Array {
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
    return t instanceof Array ? t : t.trim().split(jt).map(parseFloat);
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
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(Ys), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof w && (this.value = t.valueOf(), this.unit = t.unit), this;
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
const eo = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), tn = [];
function io(i) {
  tn.push(i);
}
function so(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = As.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? to[i] : As.test(t) ? parseFloat(t) : t;
      t = tn.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new w(t) : eo.has(i) && $.isColor(t) ? t = new $(t) : t.constructor === Array && (t = new Me(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class Ht extends Je {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = tt(t), t.removeNamespace && this.node instanceof O.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return tt(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new oe(
      ns(this.node.children, function(t) {
        return dt(t);
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
    return this.put(new Ht(je(t), e));
  }
  // Get first child
  first() {
    return dt(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return dt(this.node.childNodes[t]);
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
    return this.xml(t, e, ir);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = Hs(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return dt(this.node.lastChild);
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
    if (e = dt(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = dt(e.node.parentNode));
    return e;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, e) {
    return t = tt(t), this.add(t, e), t;
  }
  // Add element to given container and return container
  putIn(t, e) {
    return tt(t).add(this, e);
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
    return t = tt(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
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
      let h = this;
      if (t != null) {
        if (h = dt(h.node.cloneNode(!0)), e) {
          const c = t(h);
          if (h = c || h, c === !1) return "";
        }
        h.each(function() {
          const c = t(this), u = c || this;
          c === !1 ? this.remove() : c && this !== u && this.replace(u);
        }, !0);
      }
      return e ? h.node.outerHTML : h.node.innerHTML;
    }
    e = e ?? !1;
    const n = je("wrapper", s), r = O.document.createDocumentFragment();
    n.innerHTML = t;
    for (let h = n.children.length; h--; )
      r.appendChild(n.firstElementChild);
    const o = this.parent();
    return e ? this.replace(r) && o : this.add(r);
  }
}
C(Ht, { attr: so, find: Wr, findOne: Zr });
A(Ht, "Dom");
class _t extends Ht {
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
    e || (t = tt(t));
    const s = new oe();
    let n = this;
    for (; (n = n.parent()) && n.node !== O.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(wr);
    return e ? tt(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(nr(hs));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Oe(this, t, e);
    return this.width(new w(s.width)).height(new w(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return Xs(this, this.dom), super.writeDataToDom();
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
C(_t, {
  bbox: Xr,
  rbox: Hr,
  inside: Ur,
  point: Fr,
  ctm: qr,
  screenCTM: Vr
});
A(_t, "Element");
const Ie = {
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
    if (typeof s == "string" || s instanceof $ || $.isRgb(s) || s instanceof _t)
      this.attr(i, s);
    else
      for (e = Ie[i].length - 1; e >= 0; e--)
        s[Ie[i][e]] != null && this.attr(Ie.prefix(i, Ie[i][e]), s[Ie[i][e]]);
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
    return new U(this.node.getPointAtLength(i));
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
const no = [
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
_("Element", no);
function ro() {
  return this.attr("transform", null);
}
function oo() {
  return (this.attr("transform") || "").split(_r).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(jt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(x.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new x());
}
function ho(i, t) {
  if (this === i) return this;
  if (Pi(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function ao(i) {
  return this.toParent(this.root(), i);
}
function co(i, t) {
  if (i == null || typeof i == "string") {
    const n = new x(this).decompose();
    return i == null ? n : n[i];
  }
  x.isMatrixLike(i) || (i = { ...i, origin: Di(i, this) });
  const e = t === !0 ? this : t || !1, s = new x(e).transform(i);
  return this.attr("transform", s);
}
_("Element", {
  untransform: ro,
  matrixify: oo,
  toParent: ho,
  toRoot: ao,
  transform: co
});
class ot extends _t {
  flatten() {
    return this.each(function() {
      if (this instanceof ot)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
A(ot, "Container");
class us extends ot {
  constructor(t, e = t) {
    super(R("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
A(us, "Defs");
class ct extends _t {
}
A(ct, "Shape");
function ls(i) {
  return this.attr("rx", i);
}
function fs(i) {
  return this.attr("ry", i);
}
function en(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function sn(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function nn(i) {
  return this.attr("cx", i);
}
function rn(i) {
  return this.attr("cy", i);
}
function on(i) {
  return i == null ? this.rx() * 2 : this.rx(new w(i).divide(2));
}
function hn(i) {
  return i == null ? this.ry() * 2 : this.ry(new w(i).divide(2));
}
const uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: nn,
  cy: rn,
  height: hn,
  rx: ls,
  ry: fs,
  width: on,
  x: en,
  y: sn
}, Symbol.toStringTag, { value: "Module" }));
class wi extends ct {
  constructor(t, e = t) {
    super(R("ellipse", t), e);
  }
  size(t, e) {
    const s = Oe(this, t, e);
    return this.rx(new w(s.width).divide(2)).ry(
      new w(s.height).divide(2)
    );
  }
}
C(wi, uo);
_("Container", {
  // Create an ellipse
  ellipse: j(function(i = 0, t = i) {
    return this.put(new wi()).size(i, t).move(0, 0);
  })
});
A(wi, "Ellipse");
class an extends Ht {
  constructor(t = O.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new Ht(je("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
A(an, "Fragment");
function cn(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new w(i), fy: new w(t) }) : this.attr({ x1: new w(i), y1: new w(t) });
}
function un(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new w(i), cy: new w(t) }) : this.attr({ x2: new w(i), y2: new w(t) });
}
const lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: cn,
  to: un
}, Symbol.toStringTag, { value: "Module" }));
class ti extends ot {
  constructor(t, e) {
    super(
      R(t + "Gradient", typeof t == "string" ? null : t),
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
    return Ae("svg [fill*=" + this.id() + "]");
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
C(ti, lo);
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
      return this.put(new ti(i)).update(t);
    })
  }
});
A(ti, "Gradient");
class Be extends ot {
  // Initialize node
  constructor(t, e = t) {
    super(R("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new W();
  }
  targets() {
    return Ae("svg [fill*=" + this.id() + "]");
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
      return this.put(new Be()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
A(Be, "Pattern");
class _i extends ct {
  constructor(t, e = t) {
    super(R("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new O.window.Image();
    return Re(
      s,
      "load",
      function(n) {
        const r = this.parent(Be);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Be && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Re(s, "load error", function() {
      At(s);
    }), this.attr("href", s.src = t, Qe);
  }
}
io(function(i, t, e) {
  return (i === "fill" || i === "stroke") && kr.test(t) && (t = e.root().defs().image(t)), t instanceof _i && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
_({
  Container: {
    // create image element, load image and set its size
    image: j(function(i, t) {
      return this.put(new _i()).size(0, 0).load(i, t);
    })
  }
});
A(_i, "Image");
class Ut extends Me {
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(jt).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
const fo = Ut;
function po(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function mo(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function go(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function yo(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: fo,
  height: yo,
  width: go,
  x: po,
  y: mo
}, Symbol.toStringTag, { value: "Module" }));
let Fe = class extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("line", t), e);
  }
  // Get array
  array() {
    return new Ut([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new Ut(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Oe(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
C(Fe, ds);
_({
  Container: {
    // Create a line element
    line: j(function(...i) {
      return Fe.prototype.plot.apply(
        this.put(new Fe()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
A(Fe, "Line");
class hi extends ot {
  // Initialize node
  constructor(t, e = t) {
    super(R("marker", t), e);
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
A(hi, "Marker");
function me(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const xo = {
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
  constructor(t = Ee.ease) {
    super(), this.ease = xo[t] || t;
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
function Is() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), o = 3.9 / (r * i);
  this.d = 2 * r * o, this.k = o * o;
}
class bo extends ai {
  constructor(t = 500, e = 0) {
    super(), this.duration(t).overshoot(e);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    s > 100 && (s = 16), s /= 1e3;
    const r = n.velocity || 0, o = -this.d * r - this.k * (t - e), h = t + r * s + o * s * s / 2;
    return n.velocity = r + o * s, n.done = Math.abs(e - h) + Math.abs(r) < 2e-3, n.done ? e : h;
  }
}
C(bo, {
  duration: me("_duration", Is),
  overshoot: me("_overshoot", Is)
});
class wo extends ai {
  constructor(t = 0.1, e = 0.01, s = 0, n = 1e3) {
    super(), this.p(t).i(e).d(s).windup(n);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    const r = e - t;
    let o = (n.integral || 0) + r * s;
    const h = (r - (n.error || 0)) / s, c = this._windup;
    return c !== !1 && (o = Math.max(-c, Math.min(o, c))), n.error = r, n.integral = o, n.done = Math.abs(r) < 1e-3, n.done ? e : t + (this.P * r + this.I * o + this.D * h);
  }
}
C(wo, {
  windup: me("_windup"),
  p: me("P"),
  i: me("I"),
  d: me("D")
});
const _o = {
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
}, Ni = "mlhvqtcsaz".split("");
for (let i = 0, t = Ni.length; i < t; ++i)
  Ri[Ni[i]] = /* @__PURE__ */ function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let o = 0, h = s.length; o < h; ++o)
          s[o] = s[o] + (o % 2 ? n.y : n.x);
      return Ri[e](s, n, r);
    };
  }(Ni[i].toUpperCase());
function vo(i) {
  const t = i.segment[0];
  return Ri[t](i.segment.slice(1), i.p, i.p0);
}
function Bi(i) {
  return i.segment.length && i.segment.length - 1 === _o[i.segment[0].toUpperCase()];
}
function ko(i, t) {
  i.inNumber && Wt(i, !1);
  const e = as.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function Wt(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, Bi(i) && Fi(i);
}
function Fi(i) {
  i.inSegment = !1, i.absolute && (i.segment = vo(i)), i.segments.push(i.segment);
}
function Co(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function To(i) {
  return i.lastToken.toUpperCase() === "E";
}
const So = /* @__PURE__ */ new Set([" ", ",", "	", `
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
    p0: new U(),
    p: new U()
  };
  for (; n.lastToken = s, s = i.charAt(e++); )
    if (!(!n.inSegment && ko(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          Wt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || Co(n)) {
          n.inNumber = !0, n.number = s, Wt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (So.has(s)) {
        n.inNumber && Wt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !To(n)) {
          Wt(n, !1), --e;
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
          Wt(n, !1);
        else if (Bi(n))
          Fi(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && Wt(n, !1), n.inSegment && Bi(n) && Fi(n), n.segments;
}
function Oo(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class he extends Me {
  // Get bounding box of path
  bbox() {
    return Bt().path.setAttribute("d", this.toString()), new W(Bt.nodes.path.getBBox());
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
    return Oo(this);
  }
}
const ln = (i) => {
  const t = typeof i;
  return t === "number" ? w : t === "string" ? $.isColor(i) ? $ : jt.test(i) ? as.test(i) ? he : Me : Ys.test(i) ? w : qi : ms.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? Me : t === "object" ? qe : qi;
};
class Zt {
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
    this._type || this.type(ln(t));
    let e = new this._type(t);
    return this._type === $ && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === qe && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
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
class ei {
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
    }), Object.assign(this, ei.defaults, t), this;
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
ei.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Ao = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class qe {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === $ && t[s + 7] !== e[s + 7]) {
          const h = t[s + 7], c = new $(this.values.splice(s + 3, 5))[h]().toArray();
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
      const n = ln(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(Ao), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const ms = [qi, ei, qe];
function No(i = []) {
  ms.push(...[].concat(i));
}
function Io() {
  C(ms, {
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
      const r = function(o, h) {
        return s.step(o, t[h], e, n[h], n);
      };
      return this.fromArray(i.map(r));
    }
  });
}
let Ne = class extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new he(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new he(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Oe(this, t, e);
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
Ne.prototype.MorphArray = he;
_({
  Container: {
    // Create a wrapped path element
    path: j(function(i) {
      return this.put(new Ne()).plot(i || new he());
    })
  }
});
A(Ne, "Path");
function Eo() {
  return this._array || (this._array = new Ut(this.attr("points")));
}
function Lo() {
  return delete this._array, this;
}
function $o(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function zo(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new Ut(i)
  );
}
function Do(i, t) {
  const e = Oe(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Eo,
  clear: Lo,
  move: $o,
  plot: zo,
  size: Do
}, Symbol.toStringTag, { value: "Module" }));
let ii = class extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("polygon", t), e);
  }
};
_({
  Container: {
    // Create a wrapped polygon element
    polygon: j(function(i) {
      return this.put(new ii()).plot(i || new Ut());
    })
  }
});
C(ii, ds);
C(ii, fn);
A(ii, "Polygon");
class si extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("polyline", t), e);
  }
}
_({
  Container: {
    // Create a wrapped polygon element
    polyline: j(function(i) {
      return this.put(new si()).plot(i || new Ut());
    })
  }
});
C(si, ds);
C(si, fn);
A(si, "Polyline");
class vi extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("rect", t), e);
  }
}
C(vi, { rx: ls, ry: fs });
_({
  Container: {
    // Create a rect element
    rect: j(function(i, t) {
      return this.put(new vi()).size(i, t);
    })
  }
});
A(vi, "Rect");
class Ii {
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
  frames: new Ii(),
  timeouts: new Ii(),
  immediates: new Ii(),
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
}, Po = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, jo = function() {
  const i = O.window;
  return (i.performance || i.Date).now();
};
class dn extends Je {
  // Construct a new timeline on the given element
  constructor(t = jo) {
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
      return this._runners.map(Po);
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
    const o = t.persist(), h = {
      persist: o === null ? this._persist : o,
      start: n + e,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(h), this._runners.sort((c, u) => c.start - u.start), this._runnerIds = this._runners.map((c) => c.runner.id), this.updateTime()._continue(), this;
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
      const h = this._runners[o], c = h.runner;
      this._time - h.start <= 0 && c.reset();
    }
    let r = !1;
    for (let o = 0, h = this._runners.length; o < h; o++) {
      const c = this._runners[o], u = c.runner;
      let l = n;
      const f = this._time - c.start;
      if (f <= 0) {
        r = !0;
        continue;
      } else f < l && (l = f);
      if (!u.active()) continue;
      u.step(l).done ? c.persist !== !0 && u.duration() - u.time() + this._time + c.persist < this._time && (u.unschedule(), --o, --h) : r = !0;
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
      return i == null ? (this._timeline = this._timeline || new dn(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class at extends Je {
  constructor(t) {
    super(), this.id = at.id++, t = t ?? Ee.duration, t = typeof t == "function" ? new ai(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof ai, this._stepper = this._isDeclarative ? t : new ji(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new x(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, o = 0;
    return t = t ?? Ee.duration, e = e ?? Ee.delay, s = s || "last", typeof t == "object" && !(t instanceof ps) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, o = t.wait ?? o, t = t.duration ?? Ee.duration), {
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
    const n = at.sanitise(t, e, s), r = new at(n.duration);
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
    const e = this._time, s = this._duration, n = this._wait, r = this._times, o = this._swing, h = this._reverse;
    let c;
    if (t == null) {
      const p = function(M) {
        const v = o * Math.floor(M % (2 * (n + s)) / (n + s)), k = v && !h || !v && h, N = Math.pow(-1, k) * (M % (n + s)) / s + k;
        return Math.max(Math.min(N, 1), 0);
      }, b = r * (n + s) - n;
      return c = e <= 0 ? Math.round(p(1e-5)) : e < b ? p(e) : Math.round(p(b - 1e-5)), c;
    }
    const u = Math.floor(this.loops()), l = o && u % 2 === 0;
    return c = u + (l && !h || h && l ? t : 1 - t), this.loops(c);
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
      initialiser: t || Ns,
      runner: e || Ns,
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
    if (t instanceof dn || (s = e, e = t, t = this.timeline()), !t)
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
    const h = this._isDeclarative;
    this.done = !h && !o && this._time >= n, this._reseted = !1;
    let c = !1;
    return (s || h) && (this._initialise(s), this.transforms = new x(), c = this._run(h ? t : e), this.fire("step", this)), this.done = this.done || c && h, o && this.fire("finished", this), this;
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
at.id = 0;
class ci {
  constructor(t = new x(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
C([at, ci], {
  mergeWith(i) {
    return new ci(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const pn = (i, t) => i.lmultiplyO(t), mn = (i) => i.transforms;
function Ro() {
  const t = this._transformationRunners.runners.map(mn).reduce(pn, new x());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class Bo {
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
      const s = at.sanitise(i, t, e), n = this.timeline();
      return new at(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(mn).reduce(pn, new x());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), L.cancelImmediate(this._frameId), this._frameId = L.immediate(Ro.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new Bo().add(
        new ci(new x(this))
      ));
    }
  }
});
const Fo = (i, t) => i.filter((e) => !t.includes(e));
C(at, {
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
      function(o) {
        return this.element()[i](n.at(o).valueOf()), n.done();
      },
      function(o) {
        const h = Object.keys(o), c = Fo(h, r);
        if (c.length) {
          const l = this.element()[i](c), f = new qe(n.from()).valueOf();
          Object.assign(f, l), n.from(f);
        }
        const u = new qe(n.to()).valueOf();
        Object.assign(u, o), n.to(u), r = h, s = o;
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
      e ? ei : x
    );
    let r, o, h, c, u;
    function l() {
      o = o || this.element(), r = r || Di(i, o), u = new x(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
    }
    function f(b) {
      t || this.clearTransform();
      const { x: M, y: v } = new U(r).transform(
        o._currentTransform(this)
      );
      let k = new x({ ...i, origin: [M, v] }), N = this._isDeclarative && h ? h : u;
      if (e) {
        k = k.decompose(M, v), N = N.decompose(M, v);
        const Y = k.rotate, ut = N.rotate, lt = [Y - 360, Y, Y + 360], ft = lt.map((Wn) => Math.abs(Wn - ut)), ni = Math.min(...ft), ri = ft.indexOf(ni);
        k.rotate = lt[ri];
      }
      t && (s || (k.rotate = i.rotate || 0), this._isDeclarative && c && (N.rotate = c)), n.from(N), n.to(k);
      const H = n.at(b);
      return c = H.rotate, h = new x(H), this.addTransform(h), o._addRunner(this), n.done();
    }
    function p(b) {
      (b.origin || "center").toString() !== (i.origin || "center").toString() && (r = Di(b, o)), i = { ...b, origin: r };
    }
    return this.queue(l, f, p, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
C(at, { rx: ls, ry: fs, from: cn, to: un });
A(at, "Runner");
class gs extends ot {
  constructor(t, e = t) {
    super(R("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? dt(this.node.querySelector("defs")) || this.put(new us()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof O.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: rs, version: "1.1" }).attr(
      "xmlns:xlink",
      Qe,
      Mi
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, Mi).attr("xmlns:svgjs", null, Mi);
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
      return this.put(new gs());
    })
  }
});
A(gs, "Svg", !0);
let ys = class extends ot {
  // Initialize node
  constructor(t, e = t) {
    super(R("symbol", t), e);
  }
};
_({
  Container: {
    symbol: j(function() {
      return this.put(new ys());
    })
  }
});
A(ys, "Symbol");
function qo(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(O.document.createTextNode(i)), this;
}
function Vo() {
  return this.node.getComputedTextLength();
}
function Go(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function Xo(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function Ho(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function Uo(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function Yo(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function Wo(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Zo(i) {
  return this.attr("x", i);
}
function Ko(i) {
  return this.attr("y", i);
}
function Qo(i, t) {
  return this.ax(i).ay(t);
}
function Jo(i) {
  return this._build = !!i, this;
}
const gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Qo,
  ax: Zo,
  ay: Ko,
  build: Jo,
  center: Wo,
  cx: Uo,
  cy: Yo,
  length: Vo,
  move: Ho,
  plain: qo,
  x: Go,
  y: Xo
}, Symbol.toStringTag, { value: "Module" }));
class wt extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("text", t), e), this.dom.leading = this.dom.leading ?? new w(1.3), this._rebuild = !0, this._build = !1;
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
        const o = O.window.getComputedStyle(this.node).getPropertyValue("font-size"), h = n * new w(o);
        this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === `
` ? s += h : (this.attr("dy", r ? h + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new w(t.leading || 1.3), this;
  }
  writeDataToDom() {
    return Xs(this, this.dom, { leading: 1.3 }), this;
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
        n !== s && e[n].nodeType !== 3 && dt(e[n]).dom.newLined === !0 && (t += `
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
C(wt, gn);
_({
  Container: {
    // Create text element
    text: j(function(i = "") {
      return this.put(new wt()).text(i);
    }),
    // Create plain text element
    plain: j(function(i = "") {
      return this.put(new wt()).plain(i);
    })
  }
});
A(wt, "Text");
class ki extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(R("tspan", t), e), this._build = !1;
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
    if (!(t instanceof wt))
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
C(ki, gn);
_({
  Tspan: {
    tspan: j(function(i = "") {
      const t = new ki();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
A(ki, "Tspan");
let xs = class extends ct {
  constructor(t, e = t) {
    super(R("circle", t), e);
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
C(xs, { x: en, y: sn, cx: nn, cy: rn, width: on, height: hn });
_({
  Container: {
    // Create circle element
    circle: j(function(i = 0) {
      return this.put(new xs()).size(i).move(0, 0);
    })
  }
});
A(xs, "Circle");
class Vi extends ot {
  constructor(t, e = t) {
    super(R("clipPath", t), e);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return Ae("svg [clip-path*=" + this.id() + "]");
  }
}
_({
  Container: {
    // Create clipping element
    clip: j(function() {
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
A(Vi, "ClipPath");
class ui extends _t {
  constructor(t, e = t) {
    super(R("foreignObject", t), e);
  }
}
_({
  Container: {
    foreignObject: j(function(i, t) {
      return this.put(new ui()).size(i, t);
    })
  }
});
A(ui, "ForeignObject");
function th(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof sr().SVGSVGElement ? new W(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new x(e), r = n.translate(i, t).transform(n.inverse()), o = new U(s.x, s.y).transform(r);
    e.move(o.x, o.y);
  }), this;
}
function eh(i) {
  return this.dmove(i, 0);
}
function ih(i) {
  return this.dmove(0, i);
}
function sh(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function nh(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function rh(i, t, e = this.bbox()) {
  const s = Oe(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((o) => {
    const h = new U(e).transform(new x(o).inverse());
    o.scale(n, r, h.x, h.y);
  }), this;
}
function oh(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function hh(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function ah(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: th,
  dx: eh,
  dy: ih,
  height: sh,
  move: nh,
  size: rh,
  width: oh,
  x: hh,
  y: ah
}, Symbol.toStringTag, { value: "Module" }));
class Ci extends ot {
  constructor(t, e = t) {
    super(R("g", t), e);
  }
}
C(Ci, yn);
_({
  Container: {
    // Create a group element
    group: j(function() {
      return this.put(new Ci());
    })
  }
});
A(Ci, "G");
class li extends ot {
  constructor(t, e = t) {
    super(R("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, Qe);
  }
}
C(li, yn);
_({
  Container: {
    // Create a hyperlink element
    link: j(function(i) {
      return this.put(new li()).to(i);
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
      return t || (t = new li(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
A(li, "A");
class Gi extends ot {
  // Initialize node
  constructor(t, e = t) {
    super(R("mask", t), e);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return Ae("svg [mask*=" + this.id() + "]");
  }
}
_({
  Container: {
    mask: j(function() {
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
A(Gi, "Mask");
class xn extends _t {
  constructor(t, e = t) {
    super(R("stop", t), e);
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
      return this.put(new xn()).update(i, t, e);
    }
  }
});
A(xn, "Stop");
function ch(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += tr(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Xi extends _t {
  constructor(t, e = t) {
    super(R("style", t), e);
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
    return this.addText(ch(t, e));
  }
}
_("Dom", {
  style(i, t) {
    return this.put(new Xi()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Xi()).font(i, t, e);
  }
});
A(Xi, "Style");
class bs extends wt {
  // Initialize node
  constructor(t, e = t) {
    super(R("textPath", t), e);
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
      return i instanceof wt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: j(function(i, t = !0) {
      const e = new bs();
      i instanceof Ne || (i = this.defs().path(i)), e.attr("href", "#" + i, Qe);
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
      return i instanceof wt || (i = new wt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return Ae("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
bs.prototype.MorphArray = he;
A(bs, "TextPath");
class bn extends ct {
  constructor(t, e = t) {
    super(R("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, Qe);
  }
}
_({
  Container: {
    // Create a use element
    use: j(function(i, t) {
      return this.put(new bn()).use(i, t);
    })
  }
});
A(bn, "Use");
const wn = tt;
C([gs, ys, _i, Be, hi], rt("viewbox"));
C([Fe, si, ii, Ne], rt("marker"));
C(wt, rt("Text"));
C(Ne, rt("Path"));
C(us, rt("Defs"));
C([wt, ki], rt("Tspan"));
C([vi, wi, ti, at], rt("radius"));
C(Je, rt("EventTarget"));
C(Ht, rt("Dom"));
C(_t, rt("Element"));
C(ct, rt("Shape"));
C([ot, an], rt("Container"));
C(ti, rt("Gradient"));
C(at, rt("Runner"));
oe.extend(Qn());
No([
  w,
  $,
  W,
  x,
  Me,
  Ut,
  he,
  U
]);
Io();
function pt(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function xt(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var _n = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(_n || {}), uh = /* @__PURE__ */ ((i) => (i.X = "Ox", i.Y = "Oy", i))(uh || {}), Ve = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(Ve || {}), lh = /* @__PURE__ */ ((i) => (i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates", i))(lh || {}), fh = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector", i))(fh || {}), dh = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star", i))(dh || {}), re = /* @__PURE__ */ ((i) => (i.SMOOTH = "smooth", i.VERTICAL = "vertical", i.HORIZONTAL = "horizontal", i))(re || {});
const Es = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class ph {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Es(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Re(window, s, this.drag, this, { passive: !1 }), Re(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(Es(t)), r = n.x - s.x, o = n.y - s.y;
    if (!r && !o) return e;
    const h = e.x + r, c = e.y + o;
    this.box = new W(h, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box,
      dx: r,
      dy: o
    }).defaultPrevented && this.move(h, c);
  }
  move(t, e) {
    this.el.type === "svg" ? Ci.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), At(window, "mousemove.drag"), At(window, "touchmove.drag"), At(window, "mouseup.drag"), At(window, "touchend.drag"), this.init(!0);
  }
}
C(_t, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new ph(this)).init(i), this;
  }
});
var ye, Ge, q, K, te, It, Et, Xe, He, Ue, Hi;
class mh {
  constructor(t, e, s) {
    m(this, Ue);
    m(this, ye);
    m(this, Ge);
    m(this, q);
    m(this, K);
    m(this, te);
    m(this, It);
    m(this, Et);
    m(this, Xe);
    m(this, He, !1);
    d(this, ye, t), d(this, Ge, e), d(this, K, Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        rotate: 0,
        texConverter: (n) => n
      },
      s
    )), d(this, te, s.text ?? e), d(this, It, 0), d(this, Et, 0), d(this, Xe, "display: block; position: fixed; white-space:nowrap"), d(this, q, y(this, Ue, Hi).call(this));
  }
  get config() {
    return a(this, K);
  }
  get x() {
    return a(this, It);
  }
  set x(t) {
    d(this, It, t);
  }
  get y() {
    return a(this, Et);
  }
  set y(t) {
    d(this, Et, t);
  }
  get asHtml() {
    return a(this, K).asHtml;
  }
  get shape() {
    return a(this, q);
  }
  get alignement() {
    return a(this, K).alignement;
  }
  // Get the label of the figure.
  get label() {
    return a(this, q);
  }
  get auto_rotate() {
    return a(this, He);
  }
  set auto_rotate(t) {
    d(this, He, t);
  }
  get displayName() {
    return a(this, K).asHtml ? a(this, K).texConverter(a(this, te)) : a(this, te);
  }
  hide() {
    return a(this, q).hide(), this;
  }
  show() {
    return a(this, q).show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && d(this, te, t), y(this, Ue, Hi).call(this), this;
  }
  move(t, e) {
    return d(this, It, t), d(this, Et, e), this.position(), this;
  }
  rotate(t) {
    return a(this, q).transform({
      rotate: t,
      origin: { x: a(this, It), y: a(this, Et) }
    }), this;
  }
  position(t, e, s) {
    t ?? (t = a(this, K).alignement), e ?? (e = a(this, K).offset), s ?? (s = a(this, K).rotate), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, a(this, K).alignement = t, a(this, K).offset = e, a(this, K).rotate = s;
    let n = a(this, It), r = a(this, Et), o = 0, h = 0;
    return a(this, q) instanceof ui ? (o = a(this, q).node.children[0].clientWidth, h = a(this, q).node.children[0].clientHeight, this.label.width(o), this.label.height(h)) : (o = a(this, q).length(), h = a(this, q).bbox().h), t.includes("l") ? n = n - o / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? n = n + o / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (n = +n), t.includes("t") ? r = r - h / 2 : t.includes("m") ? r = +r : t.includes("b") && (r = r + h / 2), a(this, q) instanceof ui ? a(this, q).center(n + (e.x ?? 0), r - (e.y ?? 0)) : a(this, q).center(n + (e.x ?? 0), r - (e.y ?? 0)), s !== 0 && s !== void 0 && this.rotate(s), this;
  }
}
ye = new WeakMap(), Ge = new WeakMap(), q = new WeakMap(), K = new WeakMap(), te = new WeakMap(), It = new WeakMap(), Et = new WeakMap(), Xe = new WeakMap(), He = new WeakMap(), Ue = new WeakSet(), Hi = function() {
  return a(this, q) && a(this, q).remove(), d(this, q, a(this, K).asHtml ? a(this, ye).foreignObject(1, 1).attr("style", "overflow:visible").add(wn(`<div style="${a(this, Xe)}">${this.displayName}</div>`, !0)) : a(this, ye).text(this.displayName)), a(this, q).attr("id", `${a(this, Ge)}-label`), a(this, q);
};
function vn(i, t = 10) {
  return +i.toFixed(t);
}
function gh(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function ws(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class F {
  constructor(t, e) {
    z(this, "_x");
    z(this, "_y");
    return this._x = 0, this._y = 0, pt(t) && pt(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : pt(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
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
    z(this, "_A");
    z(this, "_director");
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
    return gh(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let o, h;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (o = this._A.x, h = n * o + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (o = t.A.x, h = e * o + s) : (o = (r - s) / (e - n), h = e * o + s), o === Number.POSITIVE_INFINITY || o === Number.NEGATIVE_INFINITY ? null : { x: o, y: h };
  }
  projection(t) {
    const e = this._director, s = new F(this._A, t), n = F.scalarProduct(e, s) / F.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class De {
  constructor(t, e) {
    z(this, "_rpn");
    z(this, "_expression");
    z(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new yh(
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
        this._addToStack(e, Ui[s.token]);
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
    t.push(vn(e));
  }
}
const Ui = {
  pi: Math.PI,
  e: Math.exp(1)
};
class yh {
  constructor(t) {
    z(this, "_mode");
    z(this, "_tokenConfig");
    z(this, "_tokenConstant");
    z(this, "_tokenKeys");
    z(this, "_uniformize");
    z(this, "_rpn", []);
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
      for (const r in Ui)
        if (t.substring(e, e + r.length) === r) {
          s += r, n = "constant";
          break;
        }
      if (s === "")
        if (/[0-9]/.exec(t[e])) {
          const r = /^([0-9.]+)/.exec(t.substring(e));
          r && (s = r[0]), n = "coefficient";
        } else if (/[a-zA-Z]/.exec(t[e])) {
          const r = /^([a-zA-Z]+)/.exec(t.substring(e));
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
    for (const c in Ui)
      s.push(c);
    s.sort((c, u) => u.length - c.length);
    let n = "", r = 0, o, h;
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
      o = t[r], h = t[r + 1], n += o, o.match(/[a-zA-Z]/g) ? /[a-zA-Z\d(]/.exec(h) && (n += "*") : /\d/.exec(o) ? /[a-zA-Z(]/.exec(h) && (n += "*") : o === ")" && /[a-zA-Z\d(]/.exec(h) && (n += "*"), r++;
    }
    return n + (h ?? "");
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(t, e) {
    (e ?? this._uniformize) && (t = this.normalize(t));
    let s = 50, n, r = 0, o, h;
    const c = [], u = [];
    for (; r < t.length; ) {
      if (s--, s === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([o, r, h] = this.NextToken(t, r), h) {
        case "monom":
        case "coefficient":
        case "variable":
        case "constant":
          c.push({ token: o, tokenType: h });
          break;
        case "operation":
          if (u.length > 0) {
            let l = u[u.length - 1];
            for (n = 50; l.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[o].associative === "left" && this._tokenConfig[o].precedence <= this._tokenConfig[l.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[o].associative === "right" && this._tokenConfig[o].precedence < this._tokenConfig[l.token].precedence); ) {
              if (n--, n === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (c.push(u.pop() ?? {
                token: "",
                tokenType: "operation"
                /* OPERATION */
              }), u.length === 0)
                break;
              l = u[u.length - 1];
            }
          }
          u.push({ token: o, tokenType: h });
          break;
        case "function-argument":
          for (n = 50; u[u.length - 1].token !== "(" && u.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            c.push(u.pop() ?? { token: o, tokenType: h });
          }
          break;
        case "(":
          u.push({ token: o, tokenType: h }), t[r] === "-" && c.push({
            token: "0",
            tokenType: "coefficient"
            /* COEFFICIENT */
          });
          break;
        case ")":
          for (n = 50; u[u.length - 1].token !== "(" && u.length > 1; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
              break;
            }
            c.push(u.pop() ?? { token: o, tokenType: h });
          }
          u.pop();
          break;
        case "function":
          u.push({ token: o, tokenType: h });
          break;
        default:
          console.log(`SHUTING YARD: ${h} : ${o} `);
      }
    }
    return this._rpn = c.concat(u.reverse()), this;
  }
}
function G(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (xt(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return pt(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function fi(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i / t.axis.y.y : i / t.axis.x.x;
  if (xt(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min / t.axis.y.y, n = t.origin.y + i.max / t.axis.y.y) : (s = t.origin.x + i.min / t.axis.x.x, n = t.origin.x + i.max / t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return pt(i) ? {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  } : i;
}
function Jt(i, t, e, s, n = 0, r = !1, o) {
  let h = 0, c = 0, u = 0, l = 0;
  if (t.x === 0)
    h = i.x, r ? c = i.y + n : c = t.y > 0 ? +n : s - n, u = i.x, o ? l = t.y < 0 ? i.y + o * t.y : 0 + n : l = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? h = i.x - n : h = t.x > 0 ? 0 + n : e - n, c = i.y, o ? u = t.x > 0 ? i.x + o * t.x : 0 - n : u = t.x > 0 ? e - n : 0 + n, l = i.y;
  else {
    let f = 0, p = 0;
    t.x > 0 ? (f = r ? -n / t.x : o || (i.x - n) / t.x, p = o || (e - i.x - n) / t.x) : t.x < 0 && (f = r ? -n / t.x : o || (e - i.x - n) / t.x, p = o || (i.x - n) / t.x), f = Math.abs(f), p = Math.abs(p), h = i.x - f * t.x, c = i.y - f * t.y, u = i.x + p * t.x, l = i.y + p * t.y;
  }
  return h > e && u > e || h < 0 && u < 0 || c > s && l > s || c < 0 && l < 0 ? null : [{ x: h, y: c }, { x: u, y: l }];
}
function Ls(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function $s(i, t) {
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
function Ei(i, t, e) {
  return {
    id: i,
    viewBox: `0 0 ${t} ${t}`,
    ...e ?? { refX: t / 2, refY: t / 2 },
    markerWidth: t,
    markerHeight: t,
    orient: "auto-start-reverse",
    markerUnits: "userSpaceOnUse"
  };
}
function vs(i, t, e, s = "->") {
  const n = (o) => i.findOne(`#${o}`);
  if (s === "x") {
    const o = `marker-x-${t}-${e}`;
    return n(o) ?? i.marker(e, e, (h) => {
      h.path(`M0,0 L${e},${e} M${e},0 L0,${e}`).stroke({ color: "black", width: 1 });
    }).attr(Ei(o, e));
  }
  if (s === "|") {
    const o = `marker-|-${t}-${e}`;
    return n(o) ?? i.marker(e, e, (h) => {
      h.path(`M${e / 2},${e} L${e / 2},0`).stroke({ color: "black", width: 1 });
    }).attr(Ei(t, e));
  }
  const r = `marker-${t}-${e}`;
  return n(r) ?? i.marker(
    e * 1.2,
    e * 1.2,
    (o) => {
      o.path(`M1,0 L1,${e}, L${e * 1.2},${e / 2} L1,0z`).stroke({ color: "black", width: 1 });
    }
  ).attr(Ei(r, e, { refX: e, refY: e / 2 }));
}
function kn(i) {
  if (typeof i == "number")
    return i;
  if (typeof i == "string" && i.includes("/")) {
    const [t, e] = i.split("/");
    return +t / +e;
  }
  return +i;
}
function xh(i, t, e) {
  const n = ["x^2", "x", ""];
  return Object.values(bh(i, t, e)).map((o, h) => o === 0 ? "" : (h > 0 && o > 0 ? `+${o.toFixed(4)}` : o.toFixed(4)) + n[h]).join("");
}
function bh(i, t, e) {
  const { x: s, y: n } = i, { x: r, y: o } = t, { x: h, y: c } = e, u = (s - r) * (s - h) * (r - h), l = (n * (r - h) + o * (h - s) + c * (s - r)) / u, f = (n * (h ** 2 - r ** 2) + o * (s ** 2 - h ** 2) + c * (r ** 2 - s ** 2)) / u, p = (n * (r * h * (r - h)) + o * (h * s * (h - s)) + c * (s * r * (s - r))) / u;
  return { a: l, b: f, c: p };
}
var Ft, kt, mt, it, X, xe, ee, Ct, be;
class et {
  constructor(t, e) {
    m(this, Ft);
    m(this, kt);
    m(this, mt);
    m(this, it);
    m(this, X);
    m(this, xe);
    m(this, ee);
    m(this, Ct);
    m(this, be);
    d(this, Ft, t), d(this, kt, e), d(this, xe, !1), d(this, ee, !1), d(this, be, null), d(this, Ct, null), d(this, mt, a(this, Ft).group().attr("id", a(this, kt))), d(this, X, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), d(this, it, a(this, mt).path());
  }
  get element() {
    return a(this, mt);
  }
  get name() {
    return a(this, kt);
  }
  get rootSVG() {
    return a(this, Ft);
  }
  get shape() {
    return a(this, it);
  }
  set shape(t) {
    d(this, it, t);
  }
  get appearance() {
    return a(this, X);
  }
  set appearance(t) {
    d(this, X, t);
  }
  get graphConfig() {
    return a(this, Ft).data("config");
  }
  get static() {
    return a(this, xe);
  }
  set static(t) {
    d(this, xe, t);
  }
  get isDraggable() {
    return a(this, ee);
  }
  set isDraggable(t) {
    d(this, ee, t);
  }
  get label() {
    return a(this, Ct);
  }
  get animate() {
    return a(this, be);
  }
  set animate(t) {
    d(this, be, t);
  }
  hide() {
    return a(this, mt).hide(), this;
  }
  show() {
    return a(this, mt).show(), this;
  }
  // Defines the shape as strokeable and fillable.
  strokeable() {
    return [a(this, it)];
  }
  fillable() {
    return [a(this, it)];
  }
  fill(t) {
    if (t !== void 0) {
      const [e, s] = t.split("/");
      a(this, X).fill.color = e, a(this, X).fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(a(this, X).fill), e.opacity(a(this, X).fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      a(this, X).stroke.color = s, a(this, X).stroke.opacity = n === void 0 ? 1 : +n, a(this, X).stroke.width = e ?? a(this, X).stroke.width;
    }
    return typeof t == "number" && e === void 0 && (a(this, X).stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(a(this, X).stroke), s.opacity(a(this, X).stroke.opacity);
    }), [a(this, it).reference("marker-start"), a(this, it).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s.children().forEach((n) => {
        n.attr({
          fill: a(this, X).stroke.color,
          stroke: a(this, X).stroke.color,
          "stroke-width": a(this, X).stroke.width
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
    return t ? (a(this, mt).clear(), this) : (a(this, mt).children().forEach((e) => {
      e.attr("id") !== `${a(this, kt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || a(this, ee)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return d(this, Ct, new mh(
      a(this, mt),
      a(this, kt),
      {
        text: t ?? a(this, kt),
        asHtml: e ?? !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    )), this.updateLabel(), a(this, Ct);
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return a(this, Ct) ? (a(this, Ct).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = a(this, Ct)) == null ? void 0 : t.config.text) ?? a(this, kt);
  }
  move(t) {
    if (pt(t)) {
      const e = G(t.x, this.graphConfig), s = G(t.y, this.graphConfig);
      a(this, it).translate(e, -s);
    } else if (typeof t == "number") {
      const e = G(t, this.graphConfig);
      a(this, it).translate(e, 0);
    }
    return this;
  }
  scale(t) {
    return typeof t == "number" ? this.scale({
      x: t,
      y: t
    }) : (a(this, it).scale(t.x, t.y), this);
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.find((h) => typeof h == "number")) ?? 10, n = (e == null ? void 0 : e.find((h) => typeof h == "string")) ?? "->", r = vs(
      a(this, Ft),
      this.name,
      s,
      n
    ), o = a(this, it);
    return t === "start" ? (o.marker("start", r), this) : t === "end" ? (o.marker("end", r), this) : (o.marker("start", r), o.marker("end", r), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
Ft = new WeakMap(), kt = new WeakMap(), mt = new WeakMap(), it = new WeakMap(), X = new WeakMap(), xe = new WeakMap(), ee = new WeakMap(), Ct = new WeakMap(), be = new WeakMap();
var g, we, _e, Ye, Yi;
class nt extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, Ye);
    m(this, g);
    m(this, we);
    m(this, _e);
    return d(this, g, Object.assign(
      { shape: "line" },
      n
    )), d(this, _e, { x: 0, y: 0 }), d(this, we, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = y(this, Ye, Yi).call(this), this.computed(), this;
  }
  get angle() {
    return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
  }
  get config() {
    return a(this, g);
  }
  set config(e) {
    d(this, g, e), y(this, Ye, Yi).call(this);
  }
  get direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y
    };
  }
  get end() {
    return a(this, we);
  }
  set end(e) {
    d(this, we, e);
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
    return a(this, _e);
  }
  set start(e) {
    d(this, _e, e);
  }
  computed() {
    let e = { x: 0, y: 0 };
    if (a(this, g).through && a(this, g).through.A && a(this, g).through.B)
      this.start = a(this, g).through.A, this.end = a(this, g).through.B, e = this.direction;
    else if (a(this, g).director && a(this, g).director.A && a(this, g).director.d)
      this.start = a(this, g).director.A, this.end = {
        x: a(this, g).director.A.x + a(this, g).director.d.x,
        y: a(this, g).director.A.y + a(this, g).director.d.y
      }, e = a(this, g).director.d;
    else if (a(this, g).parallel && a(this, g).parallel.to && a(this, g).parallel.through)
      this.start = a(this, g).parallel.through, e = a(this, g).parallel.to.direction;
    else if (a(this, g).perpendicular && a(this, g).perpendicular.to && a(this, g).perpendicular.through)
      this.start = a(this, g).perpendicular.through, e = a(this, g).perpendicular.to.normal;
    else if (a(this, g).mediator && a(this, g).mediator.A && a(this, g).mediator.B)
      this.start = {
        x: (a(this, g).mediator.A.x + a(this, g).mediator.B.x) / 2,
        y: (a(this, g).mediator.A.y + a(this, g).mediator.B.y) / 2
      }, e = {
        x: a(this, g).mediator.B.y - a(this, g).mediator.A.y,
        y: -(a(this, g).mediator.B.x - a(this, g).mediator.A.x)
      };
    else if (a(this, g).bisector && ("d1" in a(this, g).bisector && "d2" in a(this, g).bisector, "A" in a(this, g).bisector && "B" in a(this, g).bisector && "C" in a(this, g).bisector)) {
      const { A: n, B: r, C: o } = a(this, g).bisector, h = new F(n, r), c = h.norm, u = new F(n, o), l = u.norm;
      this.start = n, e = {
        x: h.x / c + u.x / l,
        y: h.y / c + u.y / l
      };
    }
    if (a(this, g).shape === void 0 || a(this, g).shape === "line" || a(this, g).shape === "ray") {
      const n = Jt(
        this.start,
        e,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        a(this, g).shape === "ray"
      );
      n !== null && (this.start = n[0], this.end = n[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  follow(e, s) {
    const n = this.math.projection({ x: e, y: s });
    if (a(this, g).shape === "line")
      return n;
    const { x: r, y: o } = this.start, { x: h, y: c } = this.end, u = h - r, l = c - o, f = Math.max(0, Math.min(1, ((e - r) * u + (s - o) * l) / (u * u + l * l)));
    return {
      x: r + f * u,
      y: o + f * l
    };
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
    if (a(this, g).shape === "segment" || a(this, g).shape === "vector") {
      const e = (this.start.x + this.end.x) / 2, s = (this.start.y + this.end.y) / 2;
      if (this.label.move(e, s), this.label.auto_rotate) {
        let n = -this.angle;
        n > 90 && (n = n - 180), n < -90 && (n = n + 180), this.label.position(void 0, void 0, n);
      }
    }
    return this;
  }
}
g = new WeakMap(), we = new WeakMap(), _e = new WeakMap(), Ye = new WeakSet(), Yi = function() {
  if (this.element.clear(), this.shape = this.element.line(
    this.start.x,
    this.start.y,
    this.end.x,
    this.end.y
  ), a(this, g).shape === "vector") {
    const e = vs(this.rootSVG, this.name, 10);
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var T, B, Lt, Kt;
class S extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, Lt);
    m(this, T);
    // Coordinates of the point in pixels
    m(this, B);
    return d(this, B, { x: NaN, y: NaN }), d(this, T, Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    )), this.computed(), this.shape = y(this, Lt, Kt).call(this), this;
  }
  get config() {
    return a(this, T);
  }
  set config(e) {
    d(this, T, e), y(this, Lt, Kt).call(this);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return fi(a(this, B), this.graphConfig);
  }
  get pixels() {
    return a(this, B);
  }
  set pixels(e) {
    d(this, B, e), this.shape.center(a(this, B).x, a(this, B).y);
  }
  get size() {
    return a(this, T).size;
  }
  set size(e) {
    a(this, T).size = e, y(this, Lt, Kt).call(this);
  }
  get x() {
    return a(this, B).x;
  }
  set x(e) {
    a(this, B).x = e, this.shape.center(e, a(this, B).y);
  }
  get y() {
    return a(this, B).y;
  }
  set y(e) {
    a(this, B).y = e, this.shape.center(a(this, B).x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, y(this, Lt, Kt).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, y(this, Lt, Kt).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, y(this, Lt, Kt).call(this), this;
  }
  computeLabel() {
    var e, s;
    if ((e = this.label) != null && e.config.text.includes("@")) {
      const n = fi(a(this, B), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
  computed() {
    if (a(this, T).coordinates)
      return this.pixels = G(a(this, T).coordinates, this.graphConfig), this;
    if (a(this, T).middle) {
      const e = a(this, T).middle.A, s = a(this, T).middle.B;
      return a(this, B).x = (e.x + s.x) / 2, a(this, B).y = (e.y + s.y) / 2, this;
    }
    if (a(this, T).projection) {
      const e = a(this, T).projection.point;
      if (a(this, T).projection.axis === "Ox")
        return this.x = e.x, this.y = this.graphConfig.origin.y, this;
      if (a(this, T).projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = e.y, this;
      if (a(this, T).projection.axis instanceof nt) {
        const s = a(this, T).projection.axis, n = s.start.x, r = s.start.y, o = e.x - n, h = e.y - r, c = s.direction, u = o * c.x + h * c.y, l = c.x * c.x + c.y * c.y;
        this.x = n + u * c.x / l, this.y = r + u * c.y / l;
      }
    }
    if (a(this, T).intersection) {
      const e = a(this, T).intersection.A, s = a(this, T).intersection.B, n = e.math.intersection(s.math);
      if (n === null)
        return this;
      this.pixels = n;
    }
    if (a(this, T).intersectionWithCircle) {
      const e = a(this, T).intersectionWithCircle.A, s = a(this, T).intersectionWithCircle.B, n = a(this, T).intersectionWithCircle.index, r = e.intersectionWithLine(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.pixels = r[n];
    }
    if (a(this, T).intersectionBetweenCircles) {
      const e = a(this, T).intersectionBetweenCircles.A, s = a(this, T).intersectionBetweenCircles.B, n = a(this, T).intersectionBetweenCircles.index, r = e.intersectionWithCircle(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.show(), this.pixels = r[n];
    }
    if (a(this, T).symmetry) {
      const e = a(this, T).symmetry.A, s = a(this, T).symmetry.B;
      if (s instanceof nt) {
        const r = new F(s.direction).normal, h = new F(e, s.start).projection(r);
        this.x = e.x + 2 * h.x, this.y = e.y + 2 * h.y;
      } else if (s === "Ox")
        this.x = e.x, this.y = 2 * this.graphConfig.origin.y - e.y;
      else if (s === "Oy")
        this.x = 2 * this.graphConfig.origin.x - e.x, this.y = e.y;
      else {
        const n = s.x, r = s.y, o = e.x - n, h = e.y - r;
        this.x = n - o, this.y = r - h;
      }
    }
    if (a(this, T).direction) {
      const { point: e, direction: s, distance: n } = a(this, T).direction;
      if (s === "Ox")
        return this.x = e.x + G(n, this.graphConfig), this.y = e.y, this;
      if (s === "Oy")
        return this.x = e.x, this.y = e.y - G(n, this.graphConfig), this;
      if (s instanceof nt) {
        const r = new F(a(this, T).direction.perpendicular ? s.normal : s.direction).unit, o = G(n, this.graphConfig);
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
T = new WeakMap(), B = new WeakMap(), Lt = new WeakSet(), Kt = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(a(this, B).x, a(this, B).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(a(this, B).x, a(this, B).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(
        `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
      ).center(a(this, B).x, a(this, B).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var J, $t, ie, bt, Le, Cn, Tn;
class Pe extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, bt);
    m(this, J);
    m(this, $t);
    m(this, ie);
    return d(this, J, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = y(this, bt, Cn).call(this), d(this, ie, y(this, bt, Le).call(this)), d(this, $t, new De(a(this, ie))), this.computed(), this;
  }
  get config() {
    return a(this, J);
  }
  set config(e) {
    d(this, J, e), d(this, $t, new De(y(this, bt, Le).call(this))), this.computed();
  }
  computed() {
    const e = y(this, bt, Le).call(this);
    if (!e || e === "")
      return this;
    e !== a(this, ie) && (d(this, ie, e), d(this, $t, new De(y(this, bt, Le).call(this))));
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = a(this, J).domain ?? { min: s, max: n }, o = a(this, J).image ?? { min: -1 / 0, max: 1 / 0 }, h = a(this, J).samples ?? this.graphConfig.axis.x.x, c = a(this, $t), u = y(this, bt, Tn).call(this, r, h, c, o);
    let l = u[0];
    const f = 1e6, p = u.map(({ x: M, y: v }, k) => {
      let N = k === 0 ? "M" : "L";
      return k > 0 && (isNaN(v) ? (N = "M", v = l.y > 0 ? f : -1e6) : (l.y < 0 && v > this.graphConfig.height || v < 0 && l.y > this.graphConfig.height) && (N = "M")), l = { x: M, y: v }, `${N} ${M} ${v}`;
    }).join(" ");
    return this.shape.plot(p), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: a(this, $t).evaluate({ x: e }) } : G(
      { x: e, y: a(this, $t).evaluate({ x: e }) },
      this.graphConfig
    );
  }
  follow(e, s) {
    const n = fi({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
J = new WeakMap(), $t = new WeakMap(), ie = new WeakMap(), bt = new WeakSet(), Le = function() {
  if (typeof a(this, J).expression == "string")
    return a(this, J).expression;
  if (a(this, J).quadratic && a(this, J).quadratic.length === 3 && a(this, J).quadratic.every((e) => e instanceof S)) {
    const [e, s, n] = a(this, J).quadratic.map((r) => r.coordinates);
    return xh(e, s, n);
  }
  return "";
}, Cn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
}, Tn = function(e, s, n, r) {
  const o = [];
  for (let h = e.min; h < e.max; h += 1 / s) {
    const c = n.evaluate({ x: h });
    if (isNaN(c) || c === 1 / 0 || c === -1 / 0 || c < r.min || c > r.max) {
      const u = G({ x: h, y: 0 }, this.graphConfig);
      o.push({ x: u.x, y: NaN });
    } else
      o.push(G({ x: h, y: c }, this.graphConfig));
  }
  return o;
};
var Tt, We, Wi;
class oi extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, We);
    m(this, Tt);
    d(this, Tt, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), y(this, We, Wi).call(this), this.computed();
  }
  get config() {
    return a(this, Tt);
  }
  set config(e) {
    d(this, Tt, e), y(this, We, Wi).call(this);
  }
  get center() {
    return a(this, Tt).center;
  }
  get radius() {
    return typeof a(this, Tt).radius == "number" ? G(a(this, Tt).radius, this.graphConfig) : ws(this.center, a(this, Tt).radius);
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
    const n = this.radius, r = e - this.center.x, o = s - this.center.y, h = Math.sqrt(r ** 2 + o ** 2);
    return e = r / h * n + this.center.x, s = o / h * n + this.center.y, { x: e, y: s };
  }
  intersectionWithLine(e, s) {
    const { x: n, y: r } = this.center, { x: o, y: h } = e.start, { x: c, y: u } = e.end, l = c - o, f = u - h, p = o - n, b = h - r, M = l * l + f * f, v = 2 * (l * p + f * b), k = p * p + b * b - this.radius * this.radius, N = v * v - 4 * M * k;
    if (N < 0)
      return null;
    const H = [], Y = Math.sqrt(N), ut = (-v - Y) / (2 * M), lt = (-v + Y) / (2 * M);
    for (const ft of [ut, lt])
      s && (ft < 0 || ft > 1) || H.push({
        x: o + ft * l,
        y: h + ft * f
      });
    return H;
  }
  intersectionWithCircle(e) {
    const { x: s, y: n } = this.center, { x: r, y: o } = e.center, h = this.radius, c = e.radius, u = r - s, l = o - n, f = Math.hypot(u, l);
    if (f > h + c || f < Math.abs(h - c) || f === 0)
      return null;
    const p = (h * h - c * c + f * f) / (2 * f), b = Math.sqrt(h * h - p * p), M = s + p * u / f, v = n + p * l / f, k = -l * (b / f), N = u * (b / f), H = { x: M + k, y: v + N }, Y = { x: M - k, y: v - N };
    return Math.abs(b) < 1e-10 ? [H] : [H, Y];
  }
}
Tt = new WeakMap(), We = new WeakSet(), Wi = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var E, Yt, Zi, Ki;
class wh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, Yt);
    m(this, E);
    d(this, E, Object.assign({
      shape: "polygon"
    }, n)), y(this, Yt, Ki).call(this), this.computed();
  }
  get config() {
    return a(this, E);
  }
  set config(e) {
    d(this, E, e), y(this, Yt, Ki).call(this);
  }
  get vertices() {
    return a(this, E).vertices;
  }
  get radius() {
    return a(this, E).regular ? typeof a(this, E).regular.radius == "number" ? G(a(this, E).regular.radius, this.graphConfig) : a(this, E).vertices && pt(a(this, E).vertices[0]) && pt(a(this, E).regular.radius) ? ws(a(this, E).vertices[0], a(this, E).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (a(this, E).vertices && a(this, E).vertices.length > 2)
      e.plot(y(this, Yt, Zi).call(this));
    else if (a(this, E).regular) {
      const s = [], n = this.radius, r = new F(
        a(this, E).regular.center,
        pt(a(this, E).regular.radius) ? a(this, E).regular.radius : { x: a(this, E).regular.center.x, y: a(this, E).regular.center.y - n }
      );
      for (let o = 0; o < a(this, E).regular.sides; o++)
        s.push([
          a(this, E).regular.center.x + r.x,
          a(this, E).regular.center.y + r.y
        ]), r.rotate(360 / a(this, E).regular.sides);
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
E = new WeakMap(), Yt = new WeakSet(), Zi = function() {
  var s;
  const e = [];
  return (s = a(this, E).vertices) == null || s.forEach((n) => {
    pt(n) && e.push([n.x, n.y]);
  }), e;
}, Ki = function() {
  var s;
  this.element.clear();
  const e = y(this, Yt, Zi).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), a(this, E).mark) {
    const n = ((s = a(this, E).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
      (o, h) => (o.x += h[0], o.y += h[1], o),
      { x: 0, y: 0 }
    );
    r.x /= e.length, r.y /= e.length, e.forEach((o) => {
      const h = new F(r, { x: o[0], y: o[1] });
      n && h.setLength(n * 20), this.element.line(r.x, r.y, r.x + h.x, r.y + h.y).stroke({ color: "gray", width: 0.5 });
    });
  }
  return this.shape;
};
var P, ae, Sn, Qi;
class _h extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, ae);
    m(this, P);
    return this.static = !0, d(this, P, Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    )), this.shape = y(this, ae, Sn).call(this), this.computed(), this;
  }
  get config() {
    return a(this, P);
  }
  set config(e) {
    d(this, P, e), this.computed();
  }
  computed() {
    const s = [
      ...y(this, ae, Qi).call(this, a(this, P).axis.x, a(this, P).axis.y),
      ...y(this, ae, Qi).call(this, a(this, P).axis.y, a(this, P).axis.x)
    ].reduce((r, o) => {
      const [h, c] = o;
      return r + `M${h.x},${h.y} L${c.x},${c.y}`;
    }, "");
    return this.shape.plot(s), this;
  }
  moveLabel() {
    return this;
  }
}
P = new WeakMap(), ae = new WeakSet(), Sn = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, Qi = function(e, s) {
  let n = +a(this, P).origin.x, r = +a(this, P).origin.y;
  const o = [];
  let h = Jt(
    { x: n, y: r },
    e,
    a(this, P).width,
    a(this, P).height
  );
  const c = (a(this, P).width + a(this, P).height) / 2;
  let u = 0;
  for (; u < c && (h && o.push(h), n += s.x, r -= s.y, h = Jt(
    { x: n, y: r },
    e,
    a(this, P).width,
    a(this, P).height
  ), !(h === null && (n > a(this, P).width || r > a(this, P).height))); ) {
    if (o.length > 1e3)
      throw new Error("Too many lines");
    u++;
  }
  for (n = a(this, P).origin.x - s.x, r = a(this, P).origin.y + s.y, h = Jt(
    { x: n, y: r },
    e,
    a(this, P).width,
    a(this, P).height
  ), u = 0; u < c && (h && o.push(h), n -= s.x, r += s.y, h = Jt(
    { x: n, y: r },
    e,
    a(this, P).width,
    a(this, P).height
  ), !(h === null && (n < 0 || r < 0))); ) {
    if (o.length > 1e3)
      throw new Error("Too many lines");
    u++;
  }
  return o;
};
var Q, di, Mn;
class vh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, di);
    m(this, Q);
    d(this, Q, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), this.config = n;
  }
  get config() {
    return a(this, Q);
  }
  set config(e) {
    d(this, Q, e), y(this, di, Mn).call(this), this.computed();
  }
  get center() {
    return a(this, Q).center;
  }
  get start() {
    return a(this, Q).start;
  }
  get end() {
    return a(this, Q).end;
  }
  get radius() {
    return typeof a(this, Q).radius == "number" ? G(a(this, Q).radius, this.graphConfig) : ws(this.center, a(this, Q).radius ?? a(this, Q).start);
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return vn((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new F(this.center, this.start).unit, r = new F(this.center, this.end).unit, o = n.add(r).unit, h = this.center.x + s * o.x * (e + 20), c = this.center.y + s * o.y * (e + 20);
    return s * o.x > 0 && s * o.y > 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y > 0 ? this.label.config.alignement = "ml" : s * o.x > 0 && s * o.y < 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y < 0 && (this.label.config.alignement = "ml"), this.label.move(h, c), this;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +$s(this.center, this.start).toFixed(10),
      end: +$s(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = a(this, Q).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = Ls(this.center.x, this.center.y, n, e), o = Ls(this.center.x, this.center.y, n, s);
    return a(this, Q).morphToSquare && this.isSquare ? this._describeSquare(this.center, r, o) : this._describeArc(this.center, r, o, n, s - e);
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
    const h = (o + 360) % 360 <= 180 ? 0 : 1;
    let u = [
      "M",
      s.x,
      s.y,
      "A",
      r,
      r,
      0,
      h,
      0,
      n.x,
      n.y
    ];
    return a(this, Q).sector && (u = u.concat(["L", e.x, e.y, "L", s.x, s.y])), u.join(" ");
  }
}
Q = new WeakMap(), di = new WeakSet(), Mn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var gt, qt, Pt, On, An, Ji;
class kh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, Pt);
    m(this, gt);
    m(this, qt);
    return this.static = !0, Object.values(Ve).includes(n) ? d(this, gt, y(this, Pt, On).call(this, n)) : d(this, gt, n), d(this, qt, y(this, Pt, An).call(this)), this.computed(), this;
  }
  get config() {
    return a(this, gt);
  }
  set config(e) {
    d(this, gt, e), this.computed();
  }
  get xAxis() {
    return a(this, qt).x;
  }
  get yAxis() {
    return a(this, qt).y;
  }
  computed() {
    return y(this, Pt, Ji).call(this, a(this, qt).x, a(this, gt).x.direction, a(this, gt).x), y(this, Pt, Ji).call(this, a(this, qt).y, a(this, gt).y.direction, a(this, gt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
gt = new WeakMap(), qt = new WeakMap(), Pt = new WeakSet(), On = function(e) {
  return Ve.POLAR, {
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
}, An = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, Ji = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", o = (n == null ? void 0 : n.padding) ?? 0, h = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, u = vs(this.rootSVG, `axis-${s.x}-${s.y}`, 10).fill(r), l = Jt(
    this.graphConfig.origin,
    s,
    this.graphConfig.width,
    this.graphConfig.height,
    o,
    h,
    c
  );
  return l !== null && e.plot(l[0].x, l[0].y, l[1].x, l[1].y), e.stroke({ color: r, width: 1 }).marker("end", u), this.shape.add(e), e;
};
var St, ve, pi, Nn;
class Ch extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, pi);
    m(this, St);
    m(this, ve);
    return d(this, St, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), d(this, ve, {
      x: new De(a(this, St).expressions.x),
      y: new De(a(this, St).expressions.y)
    }), this.shape = y(this, pi, Nn).call(this), this.computed(), this;
  }
  get config() {
    return a(this, St);
  }
  set config(e) {
    d(this, St, e), this.computed();
  }
  computed() {
    const e = a(this, St).samples ?? this.graphConfig.axis.x.x, s = a(this, St).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
    for (let h = s.min; h < s.max; h += 1 / e) {
      const { x: c, y: u } = this.evaluate(h);
      n.push({ x: c, y: u });
    }
    const r = n.map(({ x: h, y: c }, u) => `${u === 0 ? "M" : "L"} ${h} ${c}`).join(" ");
    return this.shape.plot(r), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e) {
    return G(
      {
        x: a(this, ve).x.evaluate({ t: e }),
        y: a(this, ve).y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
St = new WeakMap(), ve = new WeakMap(), pi = new WeakSet(), Nn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Mt, Ot, se, Vt, ke, mi, In;
class Th extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, mi);
    m(this, Mt);
    m(this, Ot);
    m(this, se);
    m(this, Vt);
    m(this, ke);
    return d(this, Mt, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", d(this, Ot, a(this, Mt).follow.follow(0, 0)), d(this, se, { x: 0, y: 0 }), d(this, ke, this.element.line()), d(this, Vt, this.element.circle(a(this, Mt).size).center(a(this, Ot).x, a(this, Ot).y)), this.shape = y(this, mi, In).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let o = this.rootSVG.node.createSVGPoint();
      o.x = r.clientX, o.y = r.clientY, o = o.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const h = a(this, Mt).follow.follow(o.x, o.y);
      isNaN(h.y) ? a(this, Vt).hide() : (a(this, Vt).show(), a(this, Vt).center(h.x, h.y), d(this, Ot, h), d(this, se, a(this, Mt).follow.follow(o.x + 0.01, o.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return a(this, Mt);
  }
  set config(e) {
    d(this, Mt, e), this.computed();
  }
  computed() {
    const e = Jt(
      a(this, Ot),
      {
        x: a(this, se).x - a(this, Ot).x,
        y: a(this, se).y - a(this, Ot).y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (a(this, ke).plot(
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
    return [a(this, ke)];
  }
  fillable() {
    return [a(this, Vt)];
  }
}
Mt = new WeakMap(), Ot = new WeakMap(), se = new WeakMap(), Vt = new WeakMap(), ke = new WeakMap(), mi = new WeakSet(), In = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var yt, gi, En;
class Sh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, gi);
    m(this, yt);
    return d(this, yt, Object.assign({
      samples: 100
    }, n)), this.shape = y(this, gi, En).call(this), this.computed(), this;
  }
  get config() {
    return a(this, yt);
  }
  set config(e) {
    d(this, yt, e), this.computed();
  }
  get domain() {
    return a(this, yt).domain ? G(a(this, yt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return a(this, yt).image ? G(a(this, yt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = a(this, yt).expressions, n = this.domain;
    this.image;
    function r(u, l) {
      const [f, p, b] = u;
      return `${l === 0 ? "M" : f} ${p ?? 0} ${b ?? 0}`;
    }
    const o = e.shape.array().filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r);
    let h = [];
    return s ? h = [...s.shape.array()].filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r).reverse() : h = [`m ${n.min} 0`], this.shape.plot(`${o.join(" ")} ${h.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
yt = new WeakMap(), gi = new WeakSet(), En = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var V, yi, Ln;
class Mh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, yi);
    m(this, V);
    d(this, V, Object.assign({}, n)), this.shape = y(this, yi, Ln).call(this), this.computed();
  }
  get config() {
    return a(this, V);
  }
  set config(e) {
    d(this, V, e), this.computed();
  }
  get rectangles() {
    return a(this, V).rectangles;
  }
  set rectangles(e) {
    a(this, V).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return a(this, V).position < 0 && (a(this, V).position = 0), a(this, V).position > 1 && (a(this, V).position = 1), a(this, V).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), a(this, V).position = e;
  }
  computed() {
    this.shape.clear();
    const e = G(a(this, V).domain, this.graphConfig), n = (e.max - e.min) / a(this, V).rectangles, r = (a(this, V).domain.max - a(this, V).domain.min) / a(this, V).rectangles, o = this.graphConfig.origin.y;
    for (let h = 0; h < a(this, V).rectangles; h += 1) {
      const c = e.min + h * n, u = a(this, V).domain.min + (h + this.position) * r, l = a(this, V).follow.evaluate(u).y;
      this.shape.add(
        this.element.rect(n, Math.abs(o - l)).move(c, l)
      );
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
V = new WeakMap(), yi = new WeakSet(), Ln = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Gt, xi, $n;
class Oh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, xi);
    m(this, Gt, "");
    n && (d(this, Gt, n), this.computed(), y(this, xi, $n).call(this));
  }
  computed() {
    return this;
  }
  get d() {
    return a(this, Gt);
  }
  set d(e) {
    d(this, Gt, e), this.shape.plot(a(this, Gt));
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
Gt = new WeakMap(), xi = new WeakSet(), $n = function() {
  return this.clear(), this.shape = this.element.path(a(this, Gt)).fill("none").stroke({ color: "black", width: 1 }), this.shape;
};
function Ah(i) {
  return i.reduce(
    (t, e, s, n) => s === 0 ? (
      // if first point
      `M ${e.point.x},${e.point.y}`
    ) : (
      // else
      `${t} ${Ih(e, s, n)}`
    ),
    ""
  );
}
function Nh(i, t) {
  const e = t.point.x - i.point.x, s = t.point.y - i.point.y;
  return {
    length: Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)),
    angle: Math.atan2(s, e)
  };
}
function zs(i, t, e, s) {
  const n = t ?? i, r = e ?? i, o = i.controls.ratio ?? 0.2, h = Nh(n, r);
  let c = h.angle + (s ? Math.PI : 0);
  const u = h.length * o;
  i.controls.type === re.VERTICAL ? c = Math.PI / 2 + (s ? Math.PI : 0) : i.controls.type === re.HORIZONTAL && (c = 0 + (s ? Math.PI : 0));
  const l = i.point.x + Math.cos(c) * u, f = i.point.y + Math.sin(c) * u;
  return [l, f];
}
function Ih(i, t, e) {
  const [s, n] = zs(e[t - 1], e[t - 2], i), [r, o] = zs(i, e[t - 1], e[t + 1], !0);
  return `C ${s},${n} ${r},${o} ${i.point.x},${i.point.y}`;
}
var Ce, zt, bi, zn;
class Eh extends et {
  constructor(e, s, n) {
    super(e, s);
    m(this, bi);
    m(this, Ce);
    m(this, zt);
    d(this, Ce, n), d(this, zt, []), this.points = n.points, y(this, bi, zn).call(this), this.computed();
  }
  computed() {
    const e = Ah(a(this, zt));
    return this.shape.plot(e), this;
  }
  get config() {
    return a(this, Ce);
  }
  set config(e) {
    d(this, Ce, e);
  }
  getPointByName(e) {
    return a(this, zt).find((s) => s.point.name === e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    throw new Error("Method not implemented.");
  }
  get points() {
    return a(this, zt);
  }
  set points(e) {
    const s = {
      type: re.SMOOTH,
      ratio: 0.2,
      left: null,
      right: null
    };
    d(this, zt, e), a(this, zt).forEach((n) => {
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
Ce = new WeakMap(), zt = new WeakMap(), bi = new WeakSet(), zn = function() {
  return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
};
var ks = /* @__PURE__ */ ((i) => (i.RESET = "reset", i.REVERSE = "reverse", i.NONE = "none", i))(ks || {}), st, Dt, Ze, ts, Te;
class Lh {
  constructor(t) {
    m(this, Ze);
    z(this, "_graph");
    z(this, "_animatedPoints", []);
    z(this, "_startTime", 0);
    z(this, "_elapsedAtPause", 0);
    z(this, "_paused", !1);
    m(this, st, null);
    m(this, Dt, /* @__PURE__ */ new Map());
    m(this, Te, (t) => {
      if (this._startTime === 0 && (this._startTime = t - this._elapsedAtPause), this._paused)
        return;
      let e = !1;
      for (const s of a(this, Dt).values()) {
        s.startTime === 0 && (s.startTime = this._startTime);
        const n = t - s.startTime, r = Math.min(n / s.duration, 1), o = s.ease(r);
        s.point.x = s.from.x + (s.to.x - s.from.x) * o, s.point.y = s.from.y + (s.to.y - s.from.y) * o, r < 1 ? e = !0 : s.loop === "reset" ? (s.point.x = s.from.x, s.point.y = s.from.y, s.startTime = t, e = !0) : s.loop === "reverse" && ([s.from, s.to] = [s.to, s.from], s.startTime = t, e = !0);
      }
      e ? d(this, st, requestAnimationFrame(a(this, Te))) : d(this, st, null);
    });
    this._graph = t, y(this, Ze, ts).call(this);
  }
  start() {
    this.cancel(), this._paused = !1, this._startTime = 0, this._elapsedAtPause = 0, a(this, Dt).forEach((t) => {
      t.startTime = 0;
    }), d(this, st, requestAnimationFrame(a(this, Te)));
  }
  pause() {
    a(this, st) !== null && (cancelAnimationFrame(a(this, st)), d(this, st, null)), this._paused = !0, this._elapsedAtPause = performance.now();
  }
  resume() {
    if (this._paused) {
      const t = performance.now() - this._elapsedAtPause;
      a(this, Dt).forEach((e) => {
        e.startTime += t;
      }), this._paused = !1, d(this, st, requestAnimationFrame(a(this, Te)));
    }
  }
  cancel() {
    a(this, st) !== null && (cancelAnimationFrame(a(this, st)), d(this, st, null)), this._paused = !1, this._elapsedAtPause = 0, this._startTime = 0, setTimeout(() => {
      this._graph.update(), y(this, Ze, ts).call(this);
    }, 200);
  }
  isRunning() {
    return a(this, st) !== null && !this._paused;
  }
  isPaused() {
    return this._paused;
  }
  canBeAnimated() {
    return a(this, Dt).size > 0;
  }
}
st = new WeakMap(), Dt = new WeakMap(), Ze = new WeakSet(), ts = function() {
  return d(this, Dt, /* @__PURE__ */ new Map()), Object.values(this._graph.figures).forEach((t) => {
    if (pt(t) && t.animate !== null) {
      const e = t.animate, s = t;
      console.log(e);
      const n = e.from, r = e.to;
      a(this, Dt).set(
        t.name,
        {
          point: s,
          from: { x: +n.pixels.x, y: +n.pixels.y },
          to: { x: +r.pixels.x, y: +r.pixels.y },
          duration: e.duration * 1e3,
          // ms
          ease: (o) => o,
          // TODO: Add easing function
          loop: e.loop,
          reverse: !1,
          startTime: 0
        }
      );
    }
  }), this._animatedPoints;
}, Te = new WeakMap();
function $h(i) {
  return i === !0 || i === "1" || i === 1 ? "reset" : typeof i == "string" && Object.values(ks).includes(i) ? i : "none";
}
var Se, Ke, es;
class zh {
  constructor(t, e) {
    m(this, Ke);
    m(this, Se, null);
    z(this, "_config");
    z(this, "_display");
    z(this, "_figures");
    z(this, "_layers");
    z(this, "_rootSVG");
    z(this, "_toTex");
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return this._config = Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Ve.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e), this._toTex = (e == null ? void 0 : e.tex) ?? ((o) => o), this._display = Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display), this._rootSVG = wn().addTo(s).viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
      width: this._config.width,
      height: this._config.height,
      origin: this._config.origin,
      // grids: this.#grids,
      axis: this._config.axis
    }), this._layers = {}, Object.values(_n).forEach((o) => {
      this._layers[o] = this._rootSVG.group().attr("id", `LAYER_${o}`);
    }), this._figures = {}, y(this, Ke, es).call(this), this;
  }
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t;
  }
  get display() {
    return this._display;
  }
  set display(t) {
    this._display = t;
  }
  get figures() {
    return this._figures;
  }
  get layers() {
    return this._layers;
  }
  get rootSVG() {
    return this._rootSVG;
  }
  get toTex() {
    return this._toTex;
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        pt(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new S(
          this._rootSVG,
          e,
          n
        );
        return this._layers.points.add(r.element), this._figures[e] = r, s && r.addLabel(
          e,
          s.html,
          this._toTex
        ), r;
      },
      line: (t, e) => {
        const s = new nt(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      path: (t, e) => {
        const s = new Oh(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      bezier: (t, e) => {
        const s = new Eh(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      plot: (t, e) => {
        const s = new Pe(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new Ch(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      circle: (t, e) => {
        const s = new oi(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new wh(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      arc: (t, e) => {
        const s = new vh(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      follow: (t, e) => {
        const s = new Th(this._rootSVG, e, t);
        return this._layers.plots_FG.add(s.element), this._figures[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new Sh(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new Mh(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      }
    };
  }
  get animation() {
    return a(this, Se) || d(this, Se, new Lh(this)), a(this, Se);
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), this._figures = {};
  }
  coordinate_system(t) {
    const e = new kh(
      this._rootSVG,
      "COORDINATE_SYSTEM",
      t
    );
    return this._layers.axis.add(e.element), e;
  }
  draggable(t, e) {
    const s = (n) => {
      var f;
      const r = t, { box: o } = n.detail;
      let { x: h, y: c } = o;
      if (n.preventDefault(), h < 0 || h > this._config.width - o.width / 2 || c < 0 || c > this._config.height - o.height / 2)
        return;
      if ((f = e == null ? void 0 : e.follow) != null && f.length) {
        let p = { x: h, y: c };
        e.follow.forEach((b) => {
          b instanceof et ? p = b.follow(h, c) : typeof b == "string" ? p = this.follow(b, r)(h, c) : p = b(h, c), h = p.x, c = p.y;
        });
      }
      if (r.pixels.x === h && r.pixels.y === c)
        return;
      r.pixels = { x: h, y: c };
      const u = (e == null ? void 0 : e.target) ?? null;
      u instanceof S && (u.pixels = { x: h, y: c }), e != null && e.callback && e.callback(t);
      const l = [t.name];
      u && l.push(u.name), this.update(l);
    };
    return this._layers.interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", s), t;
  }
  // Default follow function
  follow(t, e) {
    return t === "Ox" ? (s) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = this._config.axis.x.x, o = this._config.axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / o) * o, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
  grid(t, e) {
    const s = new _h(this._rootSVG, t, {
      axis: e,
      origin: this._config.origin,
      width: this._config.width,
      height: this._config.height,
      subdivisions: 0
    });
    return this._layers.grids.add(s.element), s;
  }
  subgrid(t, e) {
    const s = {
      x: { x: this._config.axis.x.x / e, y: this._config.axis.x.y / e },
      y: { x: this._config.axis.y.x / e, y: this._config.axis.y.y / e }
    };
    return this.grid(t, s);
  }
  toPixels(t, e) {
    return G(t, this.config, e);
  }
  toCoordinates(t, e) {
    return fi(t, this.config, e);
  }
  // Update each figures in the graph
  update(t, e) {
    t ?? (t = []), Object.keys(this.figures).forEach((s) => {
      const n = `${s}_drag`;
      n in this.figures && t.push(s, n);
    }), this.updateLabels(t, e);
  }
  updateLabels(t, e) {
    Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  // Update the layout of the graph
  updateLayout() {
    this._rootSVG.viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
      width: this._config.width,
      height: this._config.height,
      origin: this._config.origin,
      axis: this._config.axis
    }), y(this, Ke, es).call(this), this.update([], !0);
  }
}
Se = new WeakMap(), Ke = new WeakSet(), es = function() {
  if (this._layers.grids.clear(), this._layers.axis.clear(), this._display.subgrid && this.subgrid("SUBGRID", this._display.subgrid).stroke("purple/0.5", 0.1), this._display.grid)
    if (this._display.grid === !0)
      this.grid("MAINGRID", this._config.axis).stroke("lightgray", 1);
    else {
      const { x: t, y: e } = this._display.grid;
      t !== void 0 && e !== void 0 && this.grid("MAINGRID", {
        x: {
          x: this._config.axis.x.x * t,
          y: this._config.axis.x.y * e
        },
        y: {
          x: this._config.axis.y.x * t,
          y: this._config.axis.y.y * e
        }
      }).stroke("lightgray", 1);
    }
  this._display.axis && this.coordinate_system(this._config.system);
};
var I = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(I || {});
function Z(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const Dh = [
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
var Dn = (i) => {
  throw TypeError(i);
}, Cs = (i, t, e) => t.has(i) || Dn("Cannot " + e), ht = (i, t, e) => (Cs(i, t, "read from private field"), e ? e.call(i) : t.get(i)), le = (i, t, e) => t.has(i) ? Dn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), vt = (i, t, e, s) => (Cs(i, t, "write to private field"), t.set(i, e), e), Li = (i, t, e) => (Cs(i, t, "access private method"), e);
function $e(i) {
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
    const [t, e, s] = i.split(":").map(Number), n = Number(t), r = Number(e), o = Number(s), h = (r - n) / 100;
    return {
      min: Math.min(t, e),
      max: Math.max(t, e),
      step: Math.max(o, h)
    };
  }
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map($e) : i;
}
function $i(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function Ph(i) {
  if (!i.includes("="))
    return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var Qt, de, Xt, ge, pe, ze, Pn, is;
class jh {
  constructor(t) {
    le(this, ze), le(this, Qt), le(this, de, "->"), le(this, Xt, ","), le(this, ge, "/"), le(this, pe, []);
    var e, s, n;
    t && (vt(this, Qt, t.formatter ?? void 0), (e = t.splitter) != null && e.main && vt(this, de, t.splitter.main), (s = t.splitter) != null && s.entry && vt(this, Xt, t.splitter.entry), (n = t.splitter) != null && n.parameter && vt(this, ge, t.splitter.parameter), t.keys && vt(this, pe, t.keys));
  }
  get splitter() {
    return {
      main: ht(this, de),
      entry: ht(this, Xt),
      parameter: ht(this, ge)
    };
  }
  set splitter_main(t) {
    vt(this, de, t);
  }
  set splitter_entry(t) {
    vt(this, Xt, t);
  }
  set splitter_parameter(t) {
    vt(this, ge, t);
  }
  get formatter() {
    return ht(this, Qt);
  }
  set formatter(t) {
    vt(this, Qt, t);
  }
  get keys() {
    return ht(this, pe);
  }
  set keys(t) {
    vt(this, pe, t);
  }
  parse(t) {
    const [e, s] = t.split(ht(this, de)), n = ht(this, Qt) ? ht(this, Qt).call(this, e) : e.trim(), { name: r, key: o, values: h } = Li(this, ze, Pn).call(this, n), c = Li(this, ze, is).call(this, s);
    return { name: r, key: o, values: h, parameters: c };
  }
  parameters(t, e) {
    return Li(this, ze, is).call(this, t, e ?? ht(this, pe));
  }
}
Qt = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakSet(), Pn = function(i) {
  const [t, ...e] = i.split(" "), [s, n] = t.split("="), r = $i(
    e.join(" "),
    ht(this, Xt)
  ).map((o) => $e(o));
  return { name: s, key: n, values: r };
}, is = function(i, t) {
  if (i === void 0)
    return {};
  let e;
  if (t === void 0 || t.length === 0)
    e = $i(i, ht(this, Xt));
  else {
    const n = $i(i, ht(this, Xt)), r = t.map((o) => `${o}=`);
    e = [], n.forEach((o) => {
      if (t.includes(o))
        e.push(o);
      else if (o.includes("=")) {
        const h = o.split("=")[0] + "=";
        r.includes(h) && e.push(o);
      } else
        e[e.length - 1].includes("=") ? e[e.length - 1] += `,${o}` : e.push(o);
    });
  }
  const s = {};
  return e.forEach((n) => {
    const { key: r, value: o } = Ph(n);
    if (/^[-.\d]+\/[-.\d]+$/.exec(o)) {
      s[r] = {
        value: $e(o),
        options: []
      };
      return;
    }
    const [h, ...c] = o.split(ht(this, ge));
    s[r] = {
      value: $e(h),
      options: c.map((u) => $e(u))
    };
  }), s;
};
function Rh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof S && (r instanceof S || typeof r == "number"))
      return {
        create: "circle",
        config: { center: n, radius: r }
      };
  }
  return null;
}
function Bh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.ARC.toString() && s.length >= 3) {
    const [n, r, o, h] = s;
    if (n instanceof S && r instanceof S && o instanceof S)
      return {
        create: "arc",
        config: { start: n, center: r, end: o, radius: h }
      };
  }
  return null;
}
const Nt = "line";
function Rt(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.LINE.toString() || i.key === I.SEGMENT.toString() || i.key === I.VECTOR.toString() || i.key === I.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof S && r instanceof S) {
      let o = "line";
      switch (i.key) {
        case I.SEGMENT.toString():
          o = "segment";
          break;
        case I.VECTOR.toString():
          o = "vector";
          break;
        case I.RAY.toString():
          o = "ray";
          break;
      }
      return {
        create: Nt,
        config: {
          through: { A: n, B: r },
          shape: o
        }
      };
    }
  }
  if (i.key === I.LINE.toString() && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const p = Z([n.split("=")[1]], t)[0], b = G({ x: 0, y: p }, e);
      return {
        create: Nt,
        config: {
          director: { A: b, d: { x: 1, y: 0 } },
          shape: "line"
        }
      };
    }
    if (n.startsWith("x=")) {
      const p = Z([n.split("=")[1]], t)[0], b = G({ x: p, y: 0 }, e);
      return {
        create: Nt,
        config: {
          director: { A: b, d: { x: 0, y: 1 } },
          shape: "line"
        }
      };
    }
    const [r, o] = n.split("="), h = Ds(r), c = Ds(o), u = {
      a: h.a - c.a,
      b: h.b - c.b,
      c: h.c - c.c
    }, l = G({ x: 0, y: -u.c / u.b }, e), f = {
      x: u.b,
      y: u.a
    };
    return {
      create: Nt,
      config: {
        director: { A: l, d: f },
        shape: "line"
      }
    };
  }
  if (i.key === I.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof S && r instanceof S)
      return {
        create: Nt,
        config: { mediator: { A: n, B: r } }
      };
  }
  if (i.key === I.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof nt && r instanceof S)
      return {
        create: Nt,
        config: { perpendicular: { to: n, through: r } }
      };
  }
  if (i.key === I.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof nt && r instanceof S)
      return {
        create: Nt,
        config: { parallel: { to: n, through: r } }
      };
  }
  if (i.key === I.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof nt && r instanceof nt)
      return {
        create: Nt,
        config: { bisector: { d1: n, d2: r } }
      };
  }
  if (i.key === I.BISECTOR.toString() && s.length === 3) {
    const [n, r, o] = s;
    if (r instanceof S && n instanceof S && o instanceof S)
      return {
        create: Nt,
        config: { bisector: { A: r, B: n, C: o } }
      };
  }
  return null;
}
function Ds(i) {
  const t = i.split(/([+-]?[0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = Ps(t, "x"), s = Ps(t, "y"), n = kn(t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? 0);
  return {
    a: +Z([e], {})[0],
    b: +Z([s], {})[0],
    c: +Z([n], {})[0]
  };
}
function Ps(i, t) {
  return i.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : kn(e.replace(t, "")))[0] ?? 0;
}
function Fh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.PLOT.toString()) {
    const [n, ...r] = s, o = { expression: typeof n == "number" ? n.toString() : n }, h = r.filter((u) => xt(u));
    h.length > 0 && (o.domain = h[0]), h.length > 1 && (o.image = h[1]);
    const c = r.filter((u) => typeof u == "number");
    return c.length > 0 && (o.samples = c[0] > 0 ? c[0] : 10), {
      create: "plot",
      config: o
    };
  }
  return null;
}
function qh(i, t, e) {
  const s = Z(i.values.slice(0, 3), t);
  return s.every((r) => r instanceof S) ? {
    create: "plot",
    config: { expression: null, quadratic: s }
  } : null;
}
function Vh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return {
        create: "parametric",
        config: { expressions: { x: n, y: r } }
      };
  }
  return null;
}
function Gh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof Pe)
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
function Xh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.FILL_BETWEEN.toString() && s.length >= 2) {
    const n = s[0], r = s[1] instanceof Pe ? s[1] : null, o = xt(s[1]) ? s[1] : s[2], h = xt(s[1]) ? s[2] : s[3];
    if (n instanceof Pe)
      return {
        create: "fillbetween",
        config: {
          expressions: r instanceof Pe ? [n, r] : [n],
          domain: xt(o) ? o : { min: NaN, max: NaN },
          image: xt(h) ? h : { min: NaN, max: NaN }
        }
      };
  }
  return null;
}
function Hh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.RIEMANN.toString() && s.length >= 2) {
    const [n, r, o, h] = s;
    return {
      create: "riemann",
      config: {
        follow: n,
        domain: xt(r) ? r : { min: NaN, max: NaN },
        rectangles: typeof o == "number" ? o : 5,
        position: typeof h == "number" ? h : 0
      }
    };
  }
  return null;
}
const Uh = "point";
function fe(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).find((h) => h.includes("*") || h.includes("s") || h.includes("o"));
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
  const o = Yh(i, t);
  return o ? {
    create: Uh,
    config: Object.assign(o, { shape: s, size: n })
  } : null;
}
function Yh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.POINT.toString()) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === I.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof S && r instanceof S)
      return { middle: { A: n, B: r } };
  }
  if (i.key === I.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof S && (r instanceof nt || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === I.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof S && (r instanceof S || r instanceof nt || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === I.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, o, h] = s;
    if (n instanceof S && (r instanceof nt || r === "Ox" || r === "Oy") && typeof o == "number")
      return {
        direction: {
          direction: r,
          distance: o,
          point: n,
          perpendicular: h !== void 0
        }
      };
  }
  if (i.key === I.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, o, h] = s;
    if (n instanceof S && r instanceof S)
      return {
        direction: {
          point: h instanceof S ? h : n,
          direction: { A: n, B: r },
          distance: typeof o == "number" ? o : 1
        }
      };
  }
  return null;
}
const js = "polygon";
function Rs(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof S))
      return {
        create: js,
        config: { vertices: n }
      };
  }
  if (i.key === I.REGULAR.toString() && s.length >= 3) {
    const [n, r, o] = s;
    if (n instanceof S && (typeof r == "number" || r instanceof S) && typeof o == "number")
      return {
        create: js,
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
function Wh(i, t, e) {
  return {
    create: "bezier",
    config: { points: i.values.map((n) => {
      if (typeof n == "string") {
        const [r, o, h] = n.split("/");
        if (!(r in t))
          return null;
        const c = t[r];
        let u;
        switch (o) {
          case "H":
            u = re.HORIZONTAL;
            break;
          case "V":
            u = re.VERTICAL;
            break;
          default:
            u = re.SMOOTH;
        }
        return {
          point: c,
          controls: {
            type: u,
            ratio: h === void 0 ? 0.2 : +h,
            left: null,
            right: null
          }
        };
      } else
        return null;
    }).filter((n) => n !== null) }
  };
}
const Zh = "point";
function Kh(i, t, e) {
  let s = "circle", n = 5;
  const r = Object.keys(i.parameters).find((h) => h.includes("*") || h.includes("s") || h.includes("o"));
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
  const o = Qh(i, t);
  return o ? o.map((h) => ({
    create: Zh,
    config: Object.assign(h, { shape: s, size: n })
  })) : null;
}
function Qh(i, t, e) {
  const s = Z(i.values, t);
  if (i.key === I.INTERSECTION.toString() && s.length >= 2) {
    const n = s[0], r = s[1];
    if ((n instanceof nt || n === "Ox" || n === "Oy") && (r instanceof nt || r === "Ox" || r === "Oy"))
      return [
        {
          intersection: { A: n, B: r }
        }
      ];
    if (n instanceof oi && r instanceof nt)
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
const Bs = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: fe
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: fe
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: fe
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: fe
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: fe
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line|circle>,<line|circle>",
    parameters: [],
    build: Kh
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: fe
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Rt
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: Rt
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: Rt
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Rt
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: Rt
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: Rt
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: Rt
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
    build: Rt
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Rh
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: Bh
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: Fh
  },
  quad: {
    name: "quad",
    description: "quadrativ plot through three points",
    code: "f=quad A,B,C[@<number>,<domain>,<image>]",
    parameters: [],
    build: qh
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: Vh
  },
  bezier: {
    name: "bezier",
    description: "bezier curve through points",
    code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
    parameters: [],
    build: Wh
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: Rs
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: Rs
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: Gh
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: Xh
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: Hh
  }
}, Fs = [
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
];
var D, jn, Rn, ss, Bn, Fn, qn, Vn, Gn, Xn, Hn, Un, Yn;
class ra extends zh {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    m(this, D);
    z(this, "_parser");
    z(this, "_settings");
    z(this, "_code");
    return this._parser = new jh({
      formatter: (n) => y(this, D, qn).call(this, n),
      keys: Fs,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    }), this._settings = {}, s != null && s.parameters && this.refreshLayout(s.parameters), this._code = [], s != null && s.code && y(this, D, ss).call(this, s.code), this;
  }
  get code() {
    return this._code;
  }
  static documentation() {
    return Bs;
  }
  /**
   * Refresh the code to display
   * @param code Code to parse and display
   */
  refresh(e) {
    this.clear(), y(this, D, ss).call(this, e);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(e) {
    const s = y(this, D, Hn).call(this, e);
    this.config = s.config, this.display = s.display, this._settings = s.settings, this.updateLayout();
  }
}
D = new WeakSet(), jn = function(e, s, n) {
  if (e instanceof S) {
    const r = [], o = [], h = this.create.point({ x: 0, y: 0 }, e.name + "_drag");
    h.pixels = e.pixels, h.asCircle(30).fill("white/0.8"), this.layers.interactive.add(h.element), [n[s].value, ...n[s].options].forEach((u) => {
      if (["grid", "Ox", "Oy"].includes(u) && r.push(this.follow(u, e)), xt(u)) {
        const l = u.axis ?? "x", f = this.toPixels(u, l);
        r.push(
          (p, b) => ({
            x: l === "x" ? Math.max(f.min, Math.min(p, f.max)) : p,
            y: l === "y" ? Math.max(f.min, Math.min(b, f.max)) : b
          })
        );
      }
      if (Object.hasOwn(this.figures, u)) {
        const l = this.figures[u];
        o.push((f, p) => l.follow(f, p));
      }
    }), this.draggable(
      h,
      {
        target: e,
        follow: [
          ...r,
          ...o
        ]
      }
    );
  }
}, Rn = function(e, s) {
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
          const h = e[n].options[0] === !1 || e[n].options[0] === !0 ? "br" : e[n].options[0], c = e[n].options[1] ?? { x: 0, y: 0 }, u = {
            x: c.x * this.config.axis.x.x,
            y: -c.y * this.config.axis.y.y
          }, l = e[n].options[2];
          s.label.auto_rotate = l === !0, s.label.position(
            h,
            u,
            typeof l == "number" ? l : 0
          );
        }
        break;
      }
      // Draggable
      case "drag":
        y(this, D, jn).call(this, s, n, e);
        break;
      // Animation
      case "animate": {
        const o = {
          from: null,
          to: null,
          duration: 2,
          delay: 0,
          easing: "linear",
          loop: ks.NONE
        };
        if (Object.hasOwn(e, "from")) {
          const h = e.from.value;
          Object.hasOwn(this.figures, h) && this.figures[h] instanceof S && (o.from = this.figures[h]);
        }
        if (Object.hasOwn(e, "to")) {
          const h = e.to.value;
          Object.hasOwn(this.figures, h) && this.figures[h] instanceof S && (o.to = this.figures[h]);
        }
        Object.hasOwn(e, "duration") && (o.duration = e.duration.value), Object.hasOwn(e, "delay") && (o.delay = e.delay.value), Object.hasOwn(e, "easing") && (o.easing = e.easing.value), Object.hasOwn(e, "loop") && (o.loop = $h(e.loop.value)), s.animate = o;
        break;
      }
      default:
        Dh.includes(n) && s.stroke(n);
    }
  });
}, /**
 * Build the figures from the code
 */
ss = function(e) {
  this._code = y(this, D, Un).call(this, e);
  const s = Bs;
  this._code.forEach((n) => {
    n.name = y(this, D, Yn).call(this, n.name);
    let r;
    if (Object.hasOwn(s, n.key)) {
      const { build: o, parameters: h } = s[n.key];
      h && h.length > 0 && Object.keys(n.parameters).length === 0 && Object.keys(n.parameters).filter((l) => h.includes(l)).forEach((l) => {
        n.parameters[l] = { value: !0, options: [] };
      });
      let c = o(n, this.figures, this.config);
      c && (Array.isArray(c) || (c = [c]), c.forEach((u, l) => {
        try {
          const { config: f, create: p } = u;
          f && p && (r = this.create[p](f, n.name + (c.length > 1 ? `${l + 1}` : "")));
        } catch (f) {
          console.error(f);
        }
        r && y(this, D, Bn).call(this, r, n);
      }));
    }
  }), this.updateLabels([]);
}, Bn = function(e, s) {
  this._settings.label && e instanceof S && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.label = { value: !0, options: [] }), this._settings.tex && e instanceof S && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.tex = { value: !0, options: [] }), e instanceof S && this._settings.points === !1 && (s.parameters["!"] = { value: !0, options: [] }), y(this, D, Rn).call(this, s.parameters, e);
}, Fn = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, qn = function(e) {
  return /^[A-Z][0-9]*\(.*\)$/.exec(e) ? y(this, D, Xn).call(this, e) : /^[a-z][0-9]*\([x|t]\)/.exec(e) ? y(this, D, Gn).call(this, e) : e.includes("=") && !e.includes(" ") ? y(this, D, Vn).call(this, e) : e;
}, // TO BE MOVED TO BUILD_LINE
Vn = function(e) {
  const [s, ...n] = e.split("=");
  let r = n.join("="), o = r[0];
  o !== "v" && o !== "[" && (o = null);
  let h = r[r.length - 1];
  h !== "." && h !== "]" && h !== "[" && (h = null);
  let c = "line";
  o === "v" && h === null ? (r = r.slice(1), c = "vec") : o === null && h === "." || o === "[" && h === "]" ? (o === "[" && (r = r.slice(1)), r = r.slice(0, -1), c = "seg") : (o === "[" && h === "[" || o === null && h === "[" || o === "[" && h === null) && (o === "[" && (r = r.slice(1)), h === "[" && (r = r.slice(0, -1)), c = "ray");
  const u = r.split(/(?=[A-Z])/);
  return `${s}=${c} ${u[0]},${u[1]}`;
}, // TO BE MOVED TO BUILD_PLOT
Gn = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], o = e.includes("(x)=") ? I.PLOT : I.PARAMETRIC;
  return `${r}=${o} ${n}`;
}, // TO BE MOVED TO BUILD_POINT
Xn = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
  return `${s}=pt ${n[0]},${n[1]}`;
}, Hn = function(e) {
  const s = this._parser.parameters(e ?? "", Fs), n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && xt(s.x.value) ? s.x.value : { min: -8, max: 8 }, o = s.y && xt(s.y.value) ? s.y.value : { min: -8, max: 8 }, h = Math.abs(r.max - r.min), c = Math.abs(o.max - o.min), u = s.unitX ? parseFloat(s.unitX.value) : 1, l = s.unitY ? parseFloat(s.unitY.value) : 1, f = h * n, p = c * n, b = {
    x: -r.min * n,
    y: o.max * n
  }, M = Ve.CARTESIAN_2D, v = {
    x: { x: n * u, y: 0 },
    y: { x: 0, y: -n * l }
  };
  let k = Object.hasOwn(s, "grid") ? s.grid.value : !1;
  if (typeof k == "string" && k.includes("pi")) {
    const ut = k === "pi" ? 1 : +k.split("pi")[0], lt = s.grid.options.length && Number.isSafeInteger(+s.grid.options[0]) ? s.grid.options[0] : 2;
    k = { x: ut * Math.PI / lt, y: 1 };
  }
  const N = !!s.axis, H = s.subgrid ? parseFloat(s.subgrid.value) : 0, Y = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: f,
      height: p,
      origin: b,
      system: M,
      axis: v
    },
    display: {
      grid: k,
      subgrid: H,
      axis: N
    },
    settings: Y
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
      const { key: c, value: u } = y(this, D, Fn).call(this, o);
      r[c] = { value: u, options: [] };
      continue;
    }
    const h = this._parser.parse(o);
    h.parameters = Object.assign(
      h.parameters,
      r
    ), s.push(h);
  }
  return s;
}, Yn = function(e) {
  let s = e, n = 1;
  for (; this.figures[s]; )
    s = `${e}_${n}`, n++;
  return s;
};
export {
  uh as AXIS,
  re as BEZIERCONTROL,
  Ve as COORDINATE_SYSTEM,
  _n as LAYER_NAME,
  fh as LINECONSTRAINT,
  lh as POINTCONSTRAINT,
  dh as POLYGON_CONSTRAINT,
  ra as PiDraw,
  zh as PiGraph,
  xt as isDOMAIN,
  pt as isXY
};
//# sourceMappingURL=pidraw.js.map
