var Qi = Object.defineProperty;
var Zi = (i, t, e) => t in i ? Qi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var f = (i, t, e) => Zi(i, typeof t != "symbol" ? t + "" : t, e);
const _e = {}, pi = [];
function x(i, t) {
  if (Array.isArray(i)) {
    for (const e of i)
      x(e, t);
    return;
  }
  if (typeof i == "object") {
    for (const e in i)
      x(e, i[e]);
    return;
  }
  di(Object.getOwnPropertyNames(t)), _e[i] = Object.assign(_e[i] || {}, t);
}
function R(i) {
  return _e[i] || {};
}
function Ji() {
  return [...new Set(pi)];
}
function di(i) {
  pi.push(...i);
}
function Ne(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function ts(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function ae(i) {
  return i % 360 * Math.PI / 180;
}
function es(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function gi(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Tt(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function ye(i, t) {
  const e = i.origin;
  let s = i.ox != null ? i.ox : i.originX != null ? i.originX : "center", n = i.oy != null ? i.oy : i.originY != null ? i.originY : "center";
  e != null && ([s, n] = Array.isArray(e) ? e : typeof e == "object" ? [e.x, e.y] : [e, e]);
  const r = typeof s == "string", o = typeof n == "string";
  if (r || o) {
    const { height: a, width: h, x: c, y: l } = t.bbox();
    r && (s = s.includes("left") ? c : s.includes("right") ? c + h : c + h / 2), o && (n = n.includes("top") ? l : n.includes("bottom") ? l + a : l + a / 2);
  }
  return [s, n];
}
const is = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), xe = (i) => is.has(i.nodeName), mi = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, Ie = "http://www.w3.org/2000/svg", ss = "http://www.w3.org/1999/xhtml", he = "http://www.w3.org/2000/xmlns/", qt = "http://www.w3.org/1999/xlink", C = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function ns() {
  return C.window;
}
class Ee {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const gt = {}, Le = "___SYMBOL___ROOT___";
function zt(i, t = Ie) {
  return C.document.createElementNS(t, i);
}
function j(i, t = !1) {
  if (i instanceof Ee) return i;
  if (typeof i == "object")
    return ce(i);
  if (i == null)
    return new gt[Le]();
  if (typeof i == "string" && i.trim().charAt(0) !== "<")
    return ce(C.document.querySelector(i));
  const e = t ? C.document.createElement("div") : zt("svg");
  return e.innerHTML = i.trim(), i = ce(e.firstElementChild), e.removeChild(e.firstElementChild), i;
}
function N(i, t) {
  return t && (t instanceof C.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : zt(i);
}
function W(i) {
  if (!i) return null;
  if (i.instance instanceof Ee) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new gt.Fragment(i);
  let t = gi(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : gt[t] || (t = "Dom"), new gt[t](i);
}
let ce = W;
function S(i, t = i.name, e = !1) {
  return gt[t] = i, e && (gt[Le] = i), di(Object.getOwnPropertyNames(i.prototype)), i;
}
function rs(i) {
  return gt[i];
}
let os = 1e3;
function _i(i) {
  return "Svgjs" + gi(i) + os++;
}
function yi(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    yi(i.children[t]);
  return i.id && (i.id = _i(i.nodeName)), i;
}
function b(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function O(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function as() {
  return this.parent().children();
}
function hs() {
  return this.parent().index(this);
}
function cs() {
  return this.siblings()[this.position() + 1];
}
function ls() {
  return this.siblings()[this.position() - 1];
}
function us() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function fs() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function ps() {
  return this.parent().add(this.remove()), this;
}
function ds() {
  return this.parent().add(this.remove(), 0), this;
}
function gs(i) {
  i = j(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function ms(i) {
  i = j(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function _s(i) {
  return i = j(i), i.before(this), this;
}
function ys(i) {
  return i = j(i), i.after(this), this;
}
x("Dom", {
  siblings: as,
  position: hs,
  next: cs,
  prev: ls,
  forward: us,
  backward: fs,
  front: ps,
  back: ds,
  before: gs,
  after: ms,
  insertBefore: _s,
  insertAfter: ys
});
const xi = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, xs = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, bs = /rgb\((\d+),(\d+),(\d+)\)/, ws = /(#[a-z_][a-z0-9\-_]*)/i, ks = /\)\s*,?\s*/, vs = /\s/g, Qe = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Ze = /^rgb\(/, Je = /^(\s+)?$/, ti = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Cs = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, st = /[\s,]+/, $e = /[MLHVCSQTAZ]/i;
function Ss() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(st);
}
function Ms(i) {
  return this.classes().indexOf(i) !== -1;
}
function Ts(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function As(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function Os(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
x("Dom", {
  classes: Ss,
  hasClass: Ms,
  addClass: Ts,
  removeClass: As,
  toggleClass: Os
});
function Ns(i, t) {
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
          i[s] == null || Je.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || Je.test(t) ? "" : t
  ), this;
}
function Is() {
  return this.css("display", "");
}
function Es() {
  return this.css("display", "none");
}
function Ls() {
  return this.css("display") !== "none";
}
x("Dom", {
  css: Ns,
  show: Is,
  hide: Es,
  visible: Ls
});
function $s(i, t, e) {
  if (i == null)
    return this.data(
      Ne(
        ts(
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
x("Dom", { data: $s });
function zs(i, t) {
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
function Ds() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function Ps() {
  return this._memory = this._memory || {};
}
x("Dom", { remember: zs, forget: Ds, memory: Ps });
function js(i) {
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
function Vs(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function yt(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function Fs(i, t) {
  const e = yt(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : yt(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : yt(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : yt(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : yt(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : yt(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function qs(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function le(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
class A {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof A || this.isRgb(t) || this.test(t));
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
      const a = 24 * s() + 57, h = 38 * s() + 45, c = 360 * s();
      return new A(a, h, c, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * o * e / 0.5 + 0.01) + 150), h = n(50 * r(2 * o * e / 0.5 + 4.6) + 200), c = n(100 * r(2 * o * e / 0.5 + 2.3) + 150);
      return new A(a, h, c);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, h = 17 * s() + 9, c = 360 * s();
      return new A(a, h, c, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), h = 50 * s() + 86, c = 360 * s();
      return new A(a, h, c, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), h = 255 * s(), c = 255 * s();
      return new A(a, h, c);
    } else if (t === "lab") {
      const a = 100 * s(), h = 256 * s() - 128, c = 256 * s() - 128;
      return new A(a, h, c, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new A(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (Qe.test(t) || Ze.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((p) => p / 255), a = Math.min(1 - n, 1 - r, 1 - o);
    if (a === 1)
      return new A(0, 0, 0, 1, "cmyk");
    const h = (1 - n - a) / (1 - a), c = (1 - r - a) / (1 - a), l = (1 - o - a) / (1 - a);
    return new A(h, c, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((m) => m / 255), a = Math.max(n, r, o), h = Math.min(n, r, o), c = (a + h) / 2, l = a === h, u = a - h, p = l ? 0 : c > 0.5 ? u / (2 - a - h) : u / (a + h), d = l ? 0 : a === n ? ((r - o) / u + (r < o ? 6 : 0)) / 6 : a === r ? ((o - n) / u + 2) / 6 : a === o ? ((n - r) / u + 4) / 6 : 0;
    return new A(360 * d, 100 * p, 100 * c, "hsl");
  }
  init(t = 0, e = 0, s = 0, n = 0, r = "rgb") {
    if (t = t || 0, this.space)
      for (const u in this.space)
        delete this[this.space[u]];
    if (typeof t == "number")
      r = typeof n == "string" ? n : r, n = typeof n == "string" ? 0 : n, Object.assign(this, { _a: t, _b: e, _c: s, _d: n, space: r });
    else if (t instanceof Array)
      this.space = e || (typeof t[3] == "string" ? t[3] : t[4]) || "rgb", Object.assign(this, { _a: t[0], _b: t[1], _c: t[2], _d: t[3] || 0 });
    else if (t instanceof Object) {
      const u = Fs(t, e);
      Object.assign(this, u);
    } else if (typeof t == "string")
      if (Ze.test(t)) {
        const u = t.replace(vs, ""), [p, d, y] = bs.exec(u).slice(1, 4).map((m) => parseInt(m));
        Object.assign(this, { _a: p, _b: d, _c: y, _d: 0, space: "rgb" });
      } else if (Qe.test(t)) {
        const u = (m) => parseInt(m, 16), [, p, d, y] = xs.exec(js(t)).map(u);
        Object.assign(this, { _a: p, _b: d, _c: y, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: o, _b: a, _c: h, _d: c } = this, l = this.space === "rgb" ? { r: o, g: a, b: h } : this.space === "xyz" ? { x: o, y: a, z: h } : this.space === "hsl" ? { h: o, s: a, l: h } : this.space === "lab" ? { l: o, a, b: h } : this.space === "lch" ? { l: o, c: a, h } : this.space === "cmyk" ? { c: o, m: a, y: h, k: c } : {};
    Object.assign(this, l);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), o = 200 * (e - s);
    return new A(n, r, o, "lab");
  }
  lch() {
    const { l: t, a: e, b: s } = this.lab(), n = Math.sqrt(e ** 2 + s ** 2);
    let r = 180 * Math.atan2(s, e) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new A(t, n, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (qs(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: d, a: y, b: m } = this;
        if (this.space === "lch") {
          const { c: F, h: Ut } = this, Yt = Math.PI / 180;
          y = F * Math.cos(Yt * Ut), m = F * Math.sin(Yt * Ut);
        }
        const v = (d + 16) / 116, w = y / 500 + v, L = v - m / 200, z = 16 / 116, U = 8856e-6, Y = 7.787;
        t = 0.95047 * (w ** 3 > U ? w ** 3 : (w - z) / Y), e = 1 * (v ** 3 > U ? v ** 3 : (v - z) / Y), s = 1.08883 * (L ** 3 > U ? L ** 3 : (L - z) / Y);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, o = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, h = 31308e-7, c = n > h ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > h ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, u = o > h ? 1.055 * a(o, 1 / 2.4) - 0.055 : 12.92 * o;
      return new A(255 * c, 255 * l, 255 * u);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new A(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, o = 255 * le(r, n, t + 1 / 3), a = 255 * le(r, n, t), h = 255 * le(r, n, t - 1 / 3);
      return new A(o, a, h);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), o = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new A(r, o, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(Vs);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((w) => w / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, h = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, c = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, l = (a * 0.4124 + h * 0.3576 + c * 0.1805) / 0.95047, u = (a * 0.2126 + h * 0.7152 + c * 0.0722) / 1, p = (a * 0.0193 + h * 0.1192 + c * 0.9505) / 1.08883, d = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, y = u > 8856e-6 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116, m = p > 8856e-6 ? Math.pow(p, 1 / 3) : 7.787 * p + 16 / 116;
    return new A(d, y, m, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a: t, _b: e, _c: s } = this.rgb(), { max: n, min: r, round: o } = Math, a = (h) => n(0, r(o(h), 255));
    return [t, e, s].map(a);
  }
  /*
  Constructing colors
  */
}
let $ = class bi {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new bi(this);
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
    g.isMatrixLike(t) || (t = new g(t));
    const { x: e, y: s } = this;
    return this.x = t.a * e + t.c * s + t.e, this.y = t.b * e + t.d * s + t.f, this;
  }
};
function Rs(i, t) {
  return new $(i, t).transformO(this.screenCTM().inverseO());
}
function xt(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class g {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, o = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, h = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, c = t.shear || 0, l = t.rotate || t.theta || 0, u = new $(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), p = u.x, d = u.y, y = new $(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), m = y.x, v = y.y, w = new $(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), L = w.x, z = w.y, U = new $(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Y = U.x, F = U.y;
    return {
      scaleX: a,
      scaleY: h,
      skewX: r,
      skewY: o,
      shear: c,
      theta: l,
      rx: Y,
      ry: F,
      tx: L,
      ty: z,
      ox: p,
      oy: d,
      px: m,
      py: v
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
    const n = t.a * e.a + t.c * e.b, r = t.b * e.a + t.d * e.b, o = t.a * e.c + t.c * e.d, a = t.b * e.c + t.d * e.d, h = t.e + t.a * e.e + t.c * e.f, c = t.f + t.b * e.e + t.d * e.f;
    return s.a = n, s.b = r, s.c = o, s.d = a, s.e = h, s.f = c, s;
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
    return new g(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(t = 0, e = 0) {
    const s = this.a, n = this.b, r = this.c, o = this.d, a = this.e, h = this.f, c = s * o - n * r, l = c > 0 ? 1 : -1, u = l * Math.sqrt(s * s + n * n), p = Math.atan2(l * n, l * s), d = 180 / Math.PI * p, y = Math.cos(p), m = Math.sin(p), v = (s * r + n * o) / c, w = r * u / (v * s - n) || o * u / (v * n + s), L = a - t + t * y * u + e * (v * y * u - m * w), z = h - e + t * m * u + e * (v * m * u + y * w);
    return {
      // Return the affine parameters
      scaleX: u,
      scaleY: w,
      shear: v,
      rotate: d,
      translateX: L,
      translateY: z,
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
    const e = new g(t);
    return xt(this.a, e.a) && xt(this.b, e.b) && xt(this.c, e.c) && xt(this.d, e.d) && xt(this.e, e.e) && xt(this.f, e.f);
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
    const e = g.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof tt ? t.matrixify() : typeof t == "string" ? g.fromArray(t.split(st).map(parseFloat)) : Array.isArray(t) ? g.fromArray(t) : typeof t == "object" && g.isMatrixLike(t) ? t : typeof t == "object" ? new g().transform(t) : arguments.length === 6 ? g.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, o = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const h = n / a, c = -e / a, l = -s / a, u = t / a, p = -(h * r + l * o), d = -(c * r + u * o);
    return this.a = h, this.b = c, this.c = l, this.d = u, this.e = p, this.f = d, this;
  }
  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }
  lmultiplyO(t) {
    const e = this, s = t instanceof g ? t : new g(t);
    return g.matrixMultiply(s, e, this);
  }
  // Left multiplies by the given matrix
  multiply(t) {
    return this.clone().multiplyO(t);
  }
  multiplyO(t) {
    const e = this, s = t instanceof g ? t : new g(t);
    return g.matrixMultiply(e, s, this);
  }
  // Rotate matrix
  rotate(t, e, s) {
    return this.clone().rotateO(t, e, s);
  }
  rotateO(t, e = 0, s = 0) {
    t = ae(t);
    const n = Math.cos(t), r = Math.sin(t), { a: o, b: a, c: h, d: c, e: l, f: u } = this;
    return this.a = o * n - a * r, this.b = a * n + o * r, this.c = h * n - c * r, this.d = c * n + h * r, this.e = l * n - u * r + s * r - e * n + e, this.f = u * n + l * r - e * r - s * n + s, this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t);
    const { a: r, b: o, c: a, d: h, e: c, f: l } = this;
    return this.a = r * t, this.b = o * e, this.c = a * t, this.d = h * e, this.e = c * t - s * t + s, this.f = l * e - n * e + n, this;
  }
  // Shear matrix
  shear(t, e, s) {
    return this.clone().shearO(t, e, s);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(t, e = 0, s = 0) {
    const { a: n, b: r, c: o, d: a, e: h, f: c } = this;
    return this.a = n + r * t, this.c = o + a * t, this.e = h + c * t - s * t, this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(t, e = t, s = 0, n = 0) {
    arguments.length === 3 && (n = s, s = e, e = t), t = ae(t), e = ae(e);
    const r = Math.tan(t), o = Math.tan(e), { a, b: h, c, d: l, e: u, f: p } = this;
    return this.a = a + h * r, this.b = h + a * o, this.c = c + l * r, this.d = l + c * o, this.e = u + p * r - n * r, this.f = p + u * o - s * o, this;
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
    if (g.isMatrixLike(t))
      return new g(t).multiplyO(this);
    const e = g.formatTransforms(t), s = this, { x: n, y: r } = new $(e.ox, e.oy).transform(s), o = new g().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const a = new $(n, r).transform(o), h = isFinite(e.px) ? e.px - a.x : 0, c = isFinite(e.py) ? e.py - a.y : 0;
      o.translateO(h, c);
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
function Bs() {
  return new g(this.node.getCTM());
}
function Gs() {
  try {
    if (typeof this.isRoot == "function" && !this.isRoot()) {
      const i = this.rect(1, 1), t = i.node.getScreenCTM();
      return i.remove(), new g(t);
    }
    return new g(this.node.getScreenCTM());
  } catch {
    return console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    ), new g();
  }
}
S(g, "Matrix");
function rt() {
  if (!rt.nodes) {
    const i = j().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    rt.nodes = { svg: i, path: t };
  }
  if (!rt.nodes.svg.node.parentNode) {
    const i = C.document.body || C.document.documentElement;
    rt.nodes.svg.addTo(i);
  }
  return rt.nodes;
}
function wi(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function Xs(i) {
  return i === C.document || (C.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === C.document;
  }).call(C.document.documentElement, i);
}
class D {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += C.window.pageXOffset, this.y += C.window.pageYOffset, new D(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(st).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return wi(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const e = Math.min(this.x, t.x), s = Math.min(this.y, t.y), n = Math.max(this.x + this.width, t.x + t.width) - e, r = Math.max(this.y + this.height, t.y + t.height) - s;
    return new D(e, s, n, r);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(t) {
    t instanceof g || (t = new g(t));
    let e = 1 / 0, s = -1 / 0, n = 1 / 0, r = -1 / 0;
    return [
      new $(this.x, this.y),
      new $(this.x2, this.y),
      new $(this.x, this.y2),
      new $(this.x2, this.y2)
    ].forEach(function(a) {
      a = a.transform(t), e = Math.min(e, a.x), s = Math.max(s, a.x), n = Math.min(n, a.y), r = Math.max(r, a.y);
    }), new D(e, n, s - e, r - n);
  }
}
function ki(i, t, e) {
  let s;
  try {
    if (s = t(i.node), wi(s) && !Xs(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Hs() {
  const e = ki(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(rt().svg).show(), o = r.node.getBBox();
      return r.remove(), o;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new D(e);
}
function Us(i) {
  const s = ki(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new D(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Ys(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
x({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new D(this.attr("viewBox")) : this.attr("viewBox", new D(i, t, e, s));
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
      let h = a / i;
      h === 1 / 0 && (h = Number.MAX_SAFE_INTEGER / 100), t = t || new $(e / 2 / r + n.x, s / 2 / o + n.y);
      const c = new D(n).transform(
        new g({ scale: h, origin: t })
      );
      return this.viewbox(c);
    }
  }
});
S(D, "Box");
class mt extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
b([mt], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Ws = ["toArray", "constructor", "each"];
mt.extend = function(i) {
  i = i.reduce((t, e) => (Ws.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), b([mt], i);
};
function At(i, t) {
  return new mt(
    Ne((t || C.document).querySelectorAll(i), function(e) {
      return W(e);
    })
  );
}
function Ks(i) {
  return At(i, this.node);
}
function Qs(i) {
  return W(this.node.querySelector(i));
}
let Zs = 0;
const vi = {};
function Ci(i) {
  let t = i.getEventHolder();
  return t === C.window && (t = vi), t.events || (t.events = {}), t.events;
}
function ze(i) {
  return i.getEventTarget();
}
function Js(i) {
  let t = i.getEventHolder();
  t === C.window && (t = vi), t.events && (t.events = {});
}
function Dt(i, t, e, s, n) {
  const r = e.bind(s || i), o = j(i), a = Ci(o), h = ze(o);
  t = Array.isArray(t) ? t : t.split(st), e._svgjsListenerId || (e._svgjsListenerId = ++Zs), t.forEach(function(c) {
    const l = c.split(".")[0], u = c.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][u] = a[l][u] || {}, a[l][u][e._svgjsListenerId] = r, h.addEventListener(l, r, n || !1);
  });
}
function it(i, t, e, s) {
  const n = j(i), r = Ci(n), o = ze(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(st), t.forEach(function(a) {
    const h = a && a.split(".")[0], c = a && a.split(".")[1];
    let l, u;
    if (e)
      r[h] && r[h][c || "*"] && (o.removeEventListener(
        h,
        r[h][c || "*"][e],
        s || !1
      ), delete r[h][c || "*"][e]);
    else if (h && c) {
      if (r[h] && r[h][c]) {
        for (u in r[h][c])
          it(o, [h, c].join("."), u);
        delete r[h][c];
      }
    } else if (c)
      for (a in r)
        for (l in r[a])
          c === l && it(o, [a, c].join("."));
    else if (h) {
      if (r[h]) {
        for (l in r[h])
          it(o, [h, l].join("."));
        delete r[h];
      }
    } else {
      for (a in r)
        it(o, a);
      Js(n);
    }
  }));
}
function tn(i, t, e, s) {
  const n = ze(i);
  return t instanceof C.window.Event || (t = new C.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Rt extends Ee {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return tn(this, t, e, s);
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
    return it(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Dt(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
S(Rt, "EventTarget");
function ei() {
}
const It = {
  duration: 400,
  ease: ">",
  delay: 0
}, en = {
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
class Mt extends Array {
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
    return t instanceof Array ? t : t.trim().split(st).map(parseFloat);
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
class _ {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  convert(t) {
    return new _(this.value, t);
  }
  // Divide number
  divide(t) {
    return t = new _(t), new _(this / t, this.unit || t.unit);
  }
  init(t, e) {
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(xi), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof _ && (this.value = t.valueOf(), this.unit = t.unit), this;
  }
  // Subtract number
  minus(t) {
    return t = new _(t), new _(this - t, this.unit || t.unit);
  }
  // Add number
  plus(t) {
    return t = new _(t), new _(this + t, this.unit || t.unit);
  }
  // Multiply number
  times(t) {
    return t = new _(t), new _(this * t, this.unit || t.unit);
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
const sn = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Si = [];
function nn(i) {
  Si.push(i);
}
function rn(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = ti.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? en[i] : ti.test(t) ? parseFloat(t) : t;
      t = Si.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new _(t) : sn.has(i) && A.isColor(t) ? t = new A(t) : t.constructor === Array && (t = new Mt(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class at extends Rt {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = j(t), t.removeNamespace && this.node instanceof C.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return j(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new mt(
      Ne(this.node.children, function(t) {
        return W(t);
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
    return e && (s = yi(s)), new this.constructor(s);
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
    return this.put(new at(zt(t), e));
  }
  // Get first child
  first() {
    return W(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return W(this.node.childNodes[t]);
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
    return this.xml(t, e, ss);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = _i(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return W(this.node.lastChild);
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
    if (e = W(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = W(e.node.parentNode));
    return e;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, e) {
    return t = j(t), this.add(t, e), t;
  }
  // Add element to given container and return container
  putIn(t, e) {
    return j(t).add(this, e);
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
    return t = j(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
  }
  round(t = 2, e = null) {
    const s = 10 ** t, n = this.attr(e);
    for (const r in n)
      typeof n[r] == "number" && (n[r] = Math.round(n[r] * s) / s);
    return this.attr(n), this;
  }
  // Import / Export raw svg
  svg(t, e) {
    return this.xml(t, e, Ie);
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
        if (a = W(a.node.cloneNode(!0)), e) {
          const h = t(a);
          if (a = h || a, h === !1) return "";
        }
        a.each(function() {
          const h = t(this), c = h || this;
          h === !1 ? this.remove() : h && this !== c && this.replace(c);
        }, !0);
      }
      return e ? a.node.outerHTML : a.node.innerHTML;
    }
    e = e ?? !1;
    const n = zt("wrapper", s), r = C.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const o = this.parent();
    return e ? this.replace(r) && o : this.add(r);
  }
}
b(at, { attr: rn, find: Ks, findOne: Qs });
S(at, "Dom");
class tt extends at {
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
    return this.x(new _(t).plus(this.x()));
  }
  // Relative move over y axis
  dy(t = 0) {
    return this.y(new _(t).plus(this.y()));
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
    e || (t = j(t));
    const s = new mt();
    let n = this;
    for (; (n = n.parent()) && n.node !== C.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(ws);
    return e ? j(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(rs(Le));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Tt(this, t, e);
    return this.width(new _(s.width)).height(new _(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return mi(this, this.dom), super.writeDataToDom();
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
b(tt, {
  bbox: Hs,
  rbox: Us,
  inside: Ys,
  point: Rs,
  ctm: Bs,
  screenCTM: Gs
});
S(tt, "Element");
const Nt = {
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
    if (typeof s == "string" || s instanceof A || A.isRgb(s) || s instanceof tt)
      this.attr(i, s);
    else
      for (e = Nt[i].length - 1; e >= 0; e--)
        s[Nt[i][e]] != null && this.attr(Nt.prefix(i, Nt[i][e]), s[Nt[i][e]]);
    return this;
  }, x(["Element", "Runner"], t);
});
x(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(i, t, e, s, n, r) {
    return i == null ? new g(this) : this.attr("transform", new g(i, t, e, s, n, r));
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
x("radius", {
  // Add x and y radius
  radius: function(i, t = i) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new _(i)) : this.rx(i).ry(t);
  }
});
x("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(i) {
    return new $(this.node.getPointAtLength(i));
  }
});
x(["Element", "Runner"], {
  // Set font
  font: function(i, t) {
    if (typeof i == "object") {
      for (t in i) this.font(t, i[t]);
      return this;
    }
    return i === "leading" ? this.leading(t) : i === "anchor" ? this.attr("text-anchor", t) : i === "size" || i === "family" || i === "weight" || i === "stretch" || i === "variant" || i === "style" ? this.attr("font-" + i, t) : this.attr(i, t);
  }
});
const on = [
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
x("Element", on);
function an() {
  return this.attr("transform", null);
}
function hn() {
  return (this.attr("transform") || "").split(ks).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(st).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(g.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new g());
}
function cn(i, t) {
  if (this === i) return this;
  if (xe(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function ln(i) {
  return this.toParent(this.root(), i);
}
function un(i, t) {
  if (i == null || typeof i == "string") {
    const n = new g(this).decompose();
    return i == null ? n : n[i];
  }
  g.isMatrixLike(i) || (i = { ...i, origin: ye(i, this) });
  const e = t === !0 ? this : t || !1, s = new g(e).transform(i);
  return this.attr("transform", s);
}
x("Element", {
  untransform: an,
  matrixify: hn,
  toParent: cn,
  toRoot: ln,
  transform: un
});
class B extends tt {
  flatten() {
    return this.each(function() {
      if (this instanceof B)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
S(B, "Container");
class De extends B {
  constructor(t, e = t) {
    super(N("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
S(De, "Defs");
class H extends tt {
}
S(H, "Shape");
function Pe(i) {
  return this.attr("rx", i);
}
function je(i) {
  return this.attr("ry", i);
}
function Mi(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function Ti(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function Ai(i) {
  return this.attr("cx", i);
}
function Oi(i) {
  return this.attr("cy", i);
}
function Ni(i) {
  return i == null ? this.rx() * 2 : this.rx(new _(i).divide(2));
}
function Ii(i) {
  return i == null ? this.ry() * 2 : this.ry(new _(i).divide(2));
}
const fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: Ai,
  cy: Oi,
  height: Ii,
  rx: Pe,
  ry: je,
  width: Ni,
  x: Mi,
  y: Ti
}, Symbol.toStringTag, { value: "Module" }));
class ie extends H {
  constructor(t, e = t) {
    super(N("ellipse", t), e);
  }
  size(t, e) {
    const s = Tt(this, t, e);
    return this.rx(new _(s.width).divide(2)).ry(
      new _(s.height).divide(2)
    );
  }
}
b(ie, fn);
x("Container", {
  // Create an ellipse
  ellipse: O(function(i = 0, t = i) {
    return this.put(new ie()).size(i, t).move(0, 0);
  })
});
S(ie, "Ellipse");
class Ei extends at {
  constructor(t = C.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new at(zt("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
S(Ei, "Fragment");
function Li(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new _(i), fy: new _(t) }) : this.attr({ x1: new _(i), y1: new _(t) });
}
function $i(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new _(i), cy: new _(t) }) : this.attr({ x2: new _(i), y2: new _(t) });
}
const pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: Li,
  to: $i
}, Symbol.toStringTag, { value: "Module" }));
class Bt extends B {
  constructor(t, e) {
    super(
      N(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new D();
  }
  targets() {
    return At("svg [fill*=" + this.id() + "]");
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
b(Bt, pn);
x({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: O(function(i, t) {
      return this.put(new Bt(i)).update(t);
    })
  }
});
S(Bt, "Gradient");
class Pt extends B {
  // Initialize node
  constructor(t, e = t) {
    super(N("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new D();
  }
  targets() {
    return At("svg [fill*=" + this.id() + "]");
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
x({
  Container: {
    // Create pattern element in defs
    pattern(...i) {
      return this.defs().pattern(...i);
    }
  },
  Defs: {
    pattern: O(function(i, t, e) {
      return this.put(new Pt()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
S(Pt, "Pattern");
class se extends H {
  constructor(t, e = t) {
    super(N("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new C.window.Image();
    return Dt(
      s,
      "load",
      function(n) {
        const r = this.parent(Pt);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Pt && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Dt(s, "load error", function() {
      it(s);
    }), this.attr("href", s.src = t, qt);
  }
}
nn(function(i, t, e) {
  return (i === "fill" || i === "stroke") && Cs.test(t) && (t = e.root().defs().image(t)), t instanceof se && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
x({
  Container: {
    // create image element, load image and set its size
    image: O(function(i, t) {
      return this.put(new se()).size(0, 0).load(i, t);
    })
  }
});
S(se, "Image");
class ht extends Mt {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new D(s, n, t - s, e - n);
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(st).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
    g.isMatrixLike(t) || (t = new g(t));
    for (let e = this.length; e--; ) {
      const [s, n] = this[e];
      this[e][0] = t.a * s + t.c * n + t.e, this[e][1] = t.b * s + t.d * n + t.f;
    }
    return this;
  }
}
const dn = ht;
function gn(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function mn(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function _n(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function yn(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: dn,
  height: yn,
  width: _n,
  x: gn,
  y: mn
}, Symbol.toStringTag, { value: "Module" }));
let jt = class extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("line", t), e);
  }
  // Get array
  array() {
    return new ht([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new ht(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Tt(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
b(jt, Ve);
x({
  Container: {
    // Create a line element
    line: O(function(...i) {
      return jt.prototype.plot.apply(
        this.put(new jt()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
S(jt, "Line");
class Kt extends B {
  // Initialize node
  constructor(t, e = t) {
    super(N("marker", t), e);
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
x({
  Container: {
    marker(...i) {
      return this.defs().marker(...i);
    }
  },
  Defs: {
    // Create marker
    marker: O(function(i, t, e) {
      return this.put(new Kt()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof Kt ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
S(Kt, "Marker");
function vt(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const xn = {
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
class Fe {
  done() {
    return !1;
  }
}
class be extends Fe {
  constructor(t = It.ease) {
    super(), this.ease = xn[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class Qt extends Fe {
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
function ii() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), o = 3.9 / (r * i);
  this.d = 2 * r * o, this.k = o * o;
}
class bn extends Qt {
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
b(bn, {
  duration: vt("_duration", ii),
  overshoot: vt("_overshoot", ii)
});
class wn extends Qt {
  constructor(t = 0.1, e = 0.01, s = 0, n = 1e3) {
    super(), this.p(t).i(e).d(s).windup(n);
  }
  step(t, e, s, n) {
    if (typeof t == "string") return t;
    if (n.done = s === 1 / 0, s === 1 / 0) return e;
    if (s === 0) return t;
    const r = e - t;
    let o = (n.integral || 0) + r * s;
    const a = (r - (n.error || 0)) / s, h = this._windup;
    return h !== !1 && (o = Math.max(-h, Math.min(o, h))), n.error = r, n.integral = o, n.done = Math.abs(r) < 1e-3, n.done ? e : t + (this.P * r + this.I * o + this.D * a);
  }
}
b(wn, {
  windup: vt("_windup"),
  p: vt("P"),
  i: vt("I"),
  d: vt("D")
});
const kn = {
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
}, we = {
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
}, ue = "mlhvqtcsaz".split("");
for (let i = 0, t = ue.length; i < t; ++i)
  we[ue[i]] = /* @__PURE__ */ (function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let o = 0, a = s.length; o < a; ++o)
          s[o] = s[o] + (o % 2 ? n.y : n.x);
      return we[e](s, n, r);
    };
  })(ue[i].toUpperCase());
function vn(i) {
  const t = i.segment[0];
  return we[t](i.segment.slice(1), i.p, i.p0);
}
function ke(i) {
  return i.segment.length && i.segment.length - 1 === kn[i.segment[0].toUpperCase()];
}
function Cn(i, t) {
  i.inNumber && ut(i, !1);
  const e = $e.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function ut(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, ke(i) && ve(i);
}
function ve(i) {
  i.inSegment = !1, i.absolute && (i.segment = vn(i)), i.segments.push(i.segment);
}
function Sn(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function Mn(i) {
  return i.lastToken.toUpperCase() === "E";
}
const Tn = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function An(i, t = !0) {
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
    p0: new $(),
    p: new $()
  };
  for (; n.lastToken = s, s = i.charAt(e++); )
    if (!(!n.inSegment && Cn(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          ut(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || Sn(n)) {
          n.inNumber = !0, n.number = s, ut(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (Tn.has(s)) {
        n.inNumber && ut(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !Mn(n)) {
          ut(n, !1), --e;
          continue;
        }
        n.number += s, n.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        n.number += s, n.hasExponent = !0;
        continue;
      }
      if ($e.test(s)) {
        if (n.inNumber)
          ut(n, !1);
        else if (ke(n))
          ve(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && ut(n, !1), n.inSegment && ke(n) && ve(n), n.segments;
}
function On(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class _t extends Mt {
  // Get bounding box of path
  bbox() {
    return rt().path.setAttribute("d", this.toString()), new D(rt.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), An(t);
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
    return On(this);
  }
}
const zi = (i) => {
  const t = typeof i;
  return t === "number" ? _ : t === "string" ? A.isColor(i) ? A : st.test(i) ? $e.test(i) ? _t : Mt : xi.test(i) ? _ : Ce : qe.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? Mt : t === "object" ? Vt : Ce;
};
class ft {
  constructor(t) {
    this._stepper = t || new be("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
    this._type || this.type(zi(t));
    let e = new this._type(t);
    return this._type === A && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Vt && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class Ce {
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
class Gt {
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
    }), Object.assign(this, Gt.defaults, t), this;
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
Gt.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Nn = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Vt {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === A && t[s + 7] !== e[s + 7]) {
          const a = t[s + 7], h = new A(this.values.splice(s + 3, 5))[a]().toArray();
          this.values.splice(s + 3, 0, ...h);
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
      const n = zi(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(Nn), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const qe = [Ce, Gt, Vt];
function In(i = []) {
  qe.push(...[].concat(i));
}
function En() {
  b(qe, {
    to(i) {
      return new ft().type(this.constructor).from(this.toArray()).to(i);
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
let Ot = class extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new _t(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new _t(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Tt(this, t, e);
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
Ot.prototype.MorphArray = _t;
x({
  Container: {
    // Create a wrapped path element
    path: O(function(i) {
      return this.put(new Ot()).plot(i || new _t());
    })
  }
});
S(Ot, "Path");
function Ln() {
  return this._array || (this._array = new ht(this.attr("points")));
}
function $n() {
  return delete this._array, this;
}
function zn(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function Dn(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new ht(i)
  );
}
function Pn(i, t) {
  const e = Tt(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Ln,
  clear: $n,
  move: zn,
  plot: Dn,
  size: Pn
}, Symbol.toStringTag, { value: "Module" }));
let Xt = class extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("polygon", t), e);
  }
};
x({
  Container: {
    // Create a wrapped polygon element
    polygon: O(function(i) {
      return this.put(new Xt()).plot(i || new ht());
    })
  }
});
b(Xt, Ve);
b(Xt, Di);
S(Xt, "Polygon");
class Ht extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("polyline", t), e);
  }
}
x({
  Container: {
    // Create a wrapped polygon element
    polyline: O(function(i) {
      return this.put(new Ht()).plot(i || new ht());
    })
  }
});
b(Ht, Ve);
b(Ht, Di);
S(Ht, "Polyline");
class ne extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("rect", t), e);
  }
}
b(ne, { rx: Pe, ry: je });
x({
  Container: {
    // Create a rect element
    rect: O(function(i, t) {
      return this.put(new ne()).size(i, t);
    })
  }
});
S(ne, "Rect");
class fe {
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
const T = {
  nextDraw: null,
  frames: new fe(),
  timeouts: new fe(),
  immediates: new fe(),
  timer: () => C.window.performance || C.window.Date,
  transforms: [],
  frame(i) {
    const t = T.frames.push({ run: i });
    return T.nextDraw === null && (T.nextDraw = C.window.requestAnimationFrame(T._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = T.timer().now() + t, s = T.timeouts.push({ run: i, time: e });
    return T.nextDraw === null && (T.nextDraw = C.window.requestAnimationFrame(T._draw)), s;
  },
  immediate(i) {
    const t = T.immediates.push(i);
    return T.nextDraw === null && (T.nextDraw = C.window.requestAnimationFrame(T._draw)), t;
  },
  cancelFrame(i) {
    i != null && T.frames.remove(i);
  },
  clearTimeout(i) {
    i != null && T.timeouts.remove(i);
  },
  cancelImmediate(i) {
    i != null && T.immediates.remove(i);
  },
  _draw(i) {
    let t = null;
    const e = T.timeouts.last();
    for (; (t = T.timeouts.shift()) && (i >= t.time ? t.run() : T.timeouts.push(t), t !== e); )
      ;
    let s = null;
    const n = T.frames.last();
    for (; s !== n && (s = T.frames.shift()); )
      s.run(i);
    let r = null;
    for (; r = T.immediates.shift(); )
      r();
    T.nextDraw = T.timeouts.first() || T.frames.first() ? C.window.requestAnimationFrame(T._draw) : null;
  }
}, jn = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, Vn = function() {
  const i = C.window;
  return (i.performance || i.Date).now();
};
class Pi extends Rt {
  // Construct a new timeline on the given element
  constructor(t = Vn) {
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
      return this._runners.map(jn);
    let n = 0;
    const r = this.getEndTime();
    if (e = e || 0, s == null || s === "last" || s === "after")
      n = r;
    else if (s === "absolute" || s === "start")
      n = e, e = 0;
    else if (s === "now")
      n = this._time;
    else if (s === "relative") {
      const h = this.getRunnerInfoById(t.id);
      h && (n = h.start + e, e = 0);
    } else if (s === "with-last") {
      const h = this.getLastRunnerInfo();
      n = h ? h.start : this._time;
    } else
      throw new Error('Invalid value for the "when" parameter');
    t.unschedule(), t.timeline(this);
    const o = t.persist(), a = {
      persist: o === null ? this._persist : o,
      start: n + e,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(a), this._runners.sort((h, c) => h.start - c.start), this._runnerIds = this._runners.map((h) => h.runner.id), this.updateTime()._continue(), this;
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
    return T.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = T.frame(this._step), this);
  }
  _stepFn(t = !1) {
    const e = this._timeSource();
    let s = e - this._lastSourceTime;
    t && (s = 0);
    const n = this._speed * s + (this._time - this._lastStepTime);
    this._lastSourceTime = e, t || (this._time += n, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let o = this._runners.length; o--; ) {
      const a = this._runners[o], h = a.runner;
      this._time - a.start <= 0 && h.reset();
    }
    let r = !1;
    for (let o = 0, a = this._runners.length; o < a; o++) {
      const h = this._runners[o], c = h.runner;
      let l = n;
      const u = this._time - h.start;
      if (u <= 0) {
        r = !0;
        continue;
      } else u < l && (l = u);
      if (!c.active()) continue;
      c.step(l).done ? h.persist !== !0 && c.duration() - c.time() + this._time + h.persist < this._time && (c.unschedule(), --o, --a) : r = !0;
    }
    return r && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
  terminate() {
    this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }
}
x({
  Element: {
    timeline: function(i) {
      return i == null ? (this._timeline = this._timeline || new Pi(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class X extends Rt {
  constructor(t) {
    super(), this.id = X.id++, t = t ?? It.duration, t = typeof t == "function" ? new Qt(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof Qt, this._stepper = this._isDeclarative ? t : new be(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new g(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, o = 0;
    return t = t ?? It.duration, e = e ?? It.delay, s = s || "last", typeof t == "object" && !(t instanceof Fe) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, o = t.wait ?? o, t = t.duration ?? It.duration), {
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
    const n = X.sanitise(t, e, s), r = new X(n.duration);
    return this._timeline && r.timeline(this._timeline), this._element && r.element(this._element), r.loop(n).schedule(n.delay, n.when);
  }
  clearTransform() {
    return this.transforms = new g(), this;
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
    return this._stepper = new be(t), this;
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
      const o = Math.floor(this._time / e), h = (this._time - o * e) / this._duration;
      return Math.min(o + h, this._times);
    }
    const s = Math.floor(t), n = t % 1, r = e * s + this._duration * n;
    return this.time(r);
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  position(t) {
    const e = this._time, s = this._duration, n = this._wait, r = this._times, o = this._swing, a = this._reverse;
    let h;
    if (t == null) {
      const p = function(y) {
        const m = o * Math.floor(y % (2 * (n + s)) / (n + s)), v = m && !a || !m && a, w = Math.pow(-1, v) * (y % (n + s)) / s + v;
        return Math.max(Math.min(w, 1), 0);
      }, d = r * (n + s) - n;
      return h = e <= 0 ? Math.round(p(1e-5)) : e < d ? p(e) : Math.round(p(d - 1e-5)), h;
    }
    const c = Math.floor(this.loops()), l = o && c % 2 === 0;
    return h = c + (l && !a || a && l ? t : 1 - t), this.loops(h);
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
      initialiser: t || ei,
      runner: e || ei,
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
    if (t instanceof Pi || (s = e, e = t, t = this.timeline()), !t)
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
    let h = !1;
    return (s || a) && (this._initialise(s), this.transforms = new g(), h = this._run(a ? t : e), this.fire("step", this)), this.done = this.done || h && a, o && this.fire("finished", this), this;
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
X.id = 0;
class Zt {
  constructor(t = new g(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
b([X, Zt], {
  mergeWith(i) {
    return new Zt(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const ji = (i, t) => i.lmultiplyO(t), Vi = (i) => i.transforms;
function Fn() {
  const t = this._transformationRunners.runners.map(Vi).reduce(ji, new g());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class qn {
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
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new Zt()).forEach((s) => s.clearTransformsFromQueue()), this;
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
x({
  Element: {
    animate(i, t, e) {
      const s = X.sanitise(i, t, e), n = this.timeline();
      return new X(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(Vi).reduce(ji, new g());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), T.cancelImmediate(this._frameId), this._frameId = T.immediate(Fn.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new qn().add(
        new Zt(new g(this))
      ));
    }
  }
});
const Rn = (i, t) => i.filter((e) => !t.includes(e));
b(X, {
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
    let n = new ft(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(o) {
        return this.element()[i](n.at(o).valueOf()), n.done();
      },
      function(o) {
        const a = Object.keys(o), h = Rn(a, r);
        if (h.length) {
          const l = this.element()[i](h), u = new Vt(n.from()).valueOf();
          Object.assign(u, l), n.from(u);
        }
        const c = new Vt(n.to()).valueOf();
        Object.assign(c, o), n.to(c), r = a, s = o;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new ft(this._stepper).to(new _(i));
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
    const s = g.isMatrixLike(i);
    e = i.affine != null ? i.affine : e ?? !s;
    const n = new ft(this._stepper).type(
      e ? Gt : g
    );
    let r, o, a, h, c;
    function l() {
      o = o || this.element(), r = r || ye(i, o), c = new g(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
    }
    function u(d) {
      t || this.clearTransform();
      const { x: y, y: m } = new $(r).transform(
        o._currentTransform(this)
      );
      let v = new g({ ...i, origin: [y, m] }), w = this._isDeclarative && a ? a : c;
      if (e) {
        v = v.decompose(y, m), w = w.decompose(y, m);
        const z = v.rotate, U = w.rotate, Y = [z - 360, z, z + 360], F = Y.map((Ki) => Math.abs(Ki - U)), Ut = Math.min(...F), Yt = F.indexOf(Ut);
        v.rotate = Y[Yt];
      }
      t && (s || (v.rotate = i.rotate || 0), this._isDeclarative && h && (w.rotate = h)), n.from(w), n.to(v);
      const L = n.at(d);
      return h = L.rotate, a = new g(L), this.addTransform(a), o._addRunner(this), n.done();
    }
    function p(d) {
      (d.origin || "center").toString() !== (i.origin || "center").toString() && (r = ye(d, o)), i = { ...d, origin: r };
    }
    return this.queue(l, u, p, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
    if (t = new _(t), this._tryRetarget(i, t)) return this;
    const e = new ft(this._stepper).to(t);
    let s = null;
    return this.queue(
      function() {
        s = this.element()[i](), e.from(s), e.to(s + t);
      },
      function(n) {
        return this.element()[i](e.at(n)), e.done();
      },
      function(n) {
        e.to(s + new _(n));
      }
    ), this._rememberMorpher(i, e), this;
  },
  _queueObject(i, t) {
    if (this._tryRetarget(i, t)) return this;
    const e = new ft(this._stepper).to(t);
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
    return this._queueObject(i, new _(t));
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
    const n = new ft(this._stepper).type(this._element.MorphArray).to(i);
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
    return this._queueObject("viewbox", new D(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
b(X, { rx: Pe, ry: je, from: Li, to: $i });
S(X, "Runner");
class Re extends B {
  constructor(t, e = t) {
    super(N("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? W(this.node.querySelector("defs")) || this.put(new De()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof C.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: Ie, version: "1.1" }).attr(
      "xmlns:xlink",
      qt,
      he
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, he).attr("xmlns:svgjs", null, he);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    return this.isRoot() ? this : super.root();
  }
}
x({
  Container: {
    // Create nested svg document
    nested: O(function() {
      return this.put(new Re());
    })
  }
});
S(Re, "Svg", !0);
let Be = class extends B {
  // Initialize node
  constructor(t, e = t) {
    super(N("symbol", t), e);
  }
};
x({
  Container: {
    symbol: O(function() {
      return this.put(new Be());
    })
  }
});
S(Be, "Symbol");
function Bn(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(C.document.createTextNode(i)), this;
}
function Gn() {
  return this.node.getComputedTextLength();
}
function Xn(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function Hn(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function Un(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function Yn(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function Wn(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function Kn(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Qn(i) {
  return this.attr("x", i);
}
function Zn(i) {
  return this.attr("y", i);
}
function Jn(i, t) {
  return this.ax(i).ay(t);
}
function tr(i) {
  return this._build = !!i, this;
}
const Fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Jn,
  ax: Qn,
  ay: Zn,
  build: tr,
  center: Kn,
  cx: Yn,
  cy: Wn,
  length: Gn,
  move: Un,
  plain: Bn,
  x: Xn,
  y: Hn
}, Symbol.toStringTag, { value: "Module" }));
class J extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("text", t), e), this.dom.leading = this.dom.leading ?? new _(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(t) {
    return t == null ? this.dom.leading : (this.dom.leading = new _(t), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(t) {
    if (typeof t == "boolean" && (this._rebuild = t), this._rebuild) {
      const e = this;
      let s = 0;
      const n = this.dom.leading;
      this.each(function(r) {
        if (xe(this.node)) return;
        const o = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new _(o);
        this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === `
` ? s += a : (this.attr("dy", r ? a + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new _(t.leading || 1.3), this;
  }
  writeDataToDom() {
    return mi(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || xe(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && W(e[n]).dom.newLined === !0 && (t += `
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
b(J, Fi);
x({
  Container: {
    // Create text element
    text: O(function(i = "") {
      return this.put(new J()).text(i);
    }),
    // Create plain text element
    plain: O(function(i = "") {
      return this.put(new J()).plain(i);
    })
  }
});
S(J, "Text");
class re extends H {
  // Initialize node
  constructor(t, e = t) {
    super(N("tspan", t), e), this._build = !1;
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
    if (!(t instanceof J))
      return this;
    const e = t.index(this), s = C.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new _(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
b(re, Fi);
x({
  Tspan: {
    tspan: O(function(i = "") {
      const t = new re();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
S(re, "Tspan");
let Ge = class extends H {
  constructor(t, e = t) {
    super(N("circle", t), e);
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
    return this.radius(new _(t).divide(2));
  }
};
b(Ge, { x: Mi, y: Ti, cx: Ai, cy: Oi, width: Ni, height: Ii });
x({
  Container: {
    // Create circle element
    circle: O(function(i = 0) {
      return this.put(new Ge()).size(i).move(0, 0);
    })
  }
});
S(Ge, "Circle");
class Se extends B {
  constructor(t, e = t) {
    super(N("clipPath", t), e);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return At("svg [clip-path*=" + this.id() + "]");
  }
}
x({
  Container: {
    // Create clipping element
    clip: O(function() {
      return this.defs().put(new Se());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof Se ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
S(Se, "ClipPath");
class Jt extends tt {
  constructor(t, e = t) {
    super(N("foreignObject", t), e);
  }
}
x({
  Container: {
    foreignObject: O(function(i, t) {
      return this.put(new Jt()).size(i, t);
    })
  }
});
S(Jt, "ForeignObject");
function er(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof ns().SVGSVGElement ? new D(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new g(e), r = n.translate(i, t).transform(n.inverse()), o = new $(s.x, s.y).transform(r);
    e.move(o.x, o.y);
  }), this;
}
function ir(i) {
  return this.dmove(i, 0);
}
function sr(i) {
  return this.dmove(0, i);
}
function nr(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function rr(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function or(i, t, e = this.bbox()) {
  const s = Tt(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((o) => {
    const a = new $(e).transform(new g(o).inverse());
    o.scale(n, r, a.x, a.y);
  }), this;
}
function ar(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function hr(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function cr(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: er,
  dx: ir,
  dy: sr,
  height: nr,
  move: rr,
  size: or,
  width: ar,
  x: hr,
  y: cr
}, Symbol.toStringTag, { value: "Module" }));
class oe extends B {
  constructor(t, e = t) {
    super(N("g", t), e);
  }
}
b(oe, qi);
x({
  Container: {
    // Create a group element
    group: O(function() {
      return this.put(new oe());
    })
  }
});
S(oe, "G");
class te extends B {
  constructor(t, e = t) {
    super(N("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, qt);
  }
}
b(te, qi);
x({
  Container: {
    // Create a hyperlink element
    link: O(function(i) {
      return this.put(new te()).to(i);
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
      return t || (t = new te(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
S(te, "A");
class Me extends B {
  // Initialize node
  constructor(t, e = t) {
    super(N("mask", t), e);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return At("svg [mask*=" + this.id() + "]");
  }
}
x({
  Container: {
    mask: O(function() {
      return this.defs().put(new Me());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof Me ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
S(Me, "Mask");
class Ri extends tt {
  constructor(t, e = t) {
    super(N("stop", t), e);
  }
  // add color stops
  update(t) {
    return (typeof t == "number" || t instanceof _) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new _(t.offset)), this;
  }
}
x({
  Gradient: {
    // Add a color stop
    stop: function(i, t, e) {
      return this.put(new Ri()).update(i, t, e);
    }
  }
});
S(Ri, "Stop");
function lr(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += es(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Te extends tt {
  constructor(t, e = t) {
    super(N("style", t), e);
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
    return this.addText(lr(t, e));
  }
}
x("Dom", {
  style(i, t) {
    return this.put(new Te()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Te()).font(i, t, e);
  }
});
S(Te, "Style");
class Xe extends J {
  // Initialize node
  constructor(t, e = t) {
    super(N("textPath", t), e);
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
x({
  Container: {
    textPath: O(function(i, t) {
      return i instanceof J || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: O(function(i, t = !0) {
      const e = new Xe();
      i instanceof Ot || (i = this.defs().path(i)), e.attr("href", "#" + i, qt);
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
    text: O(function(i) {
      return i instanceof J || (i = new J().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return At("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
Xe.prototype.MorphArray = _t;
S(Xe, "TextPath");
class Bi extends H {
  constructor(t, e = t) {
    super(N("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, qt);
  }
}
x({
  Container: {
    // Create a use element
    use: O(function(i, t) {
      return this.put(new Bi()).use(i, t);
    })
  }
});
S(Bi, "Use");
const Gi = j;
b([Re, Be, se, Pt, Kt], R("viewbox"));
b([jt, Ht, Xt, Ot], R("marker"));
b(J, R("Text"));
b(Ot, R("Path"));
b(De, R("Defs"));
b([J, re], R("Tspan"));
b([ne, ie, Bt, X], R("radius"));
b(Rt, R("EventTarget"));
b(at, R("Dom"));
b(tt, R("Element"));
b(H, R("Shape"));
b([B, Ei], R("Container"));
b(Bt, R("Gradient"));
b(X, R("Runner"));
mt.extend(Ji());
In([
  _,
  A,
  D,
  g,
  Mt,
  ht,
  _t,
  $
]);
En();
function K(i) {
  return (i == null ? void 0 : i.x) !== void 0 && i.y !== void 0;
}
function Z(i) {
  return (i == null ? void 0 : i.min) !== void 0 && i.max !== void 0;
}
var Xi = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(Xi || {}), ur = /* @__PURE__ */ ((i) => (i.X = "Ox", i.Y = "Oy", i))(ur || {}), Ft = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(Ft || {}), fr = /* @__PURE__ */ ((i) => (i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates", i))(fr || {}), pr = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector", i))(pr || {}), dr = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star", i))(dr || {}), Q = /* @__PURE__ */ ((i) => (i.SMOOTH = "smooth", i.VERTICAL = "vertical", i.HORIZONTAL = "horizontal", i.UP = "up", i.DOWN = "down", i.RIGHT = "right", i.LEFT = "left", i))(Q || {});
const si = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class gr {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(si(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Dt(window, s, this.drag, this, { passive: !1 }), Dt(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(si(t)), r = n.x - s.x, o = n.y - s.y;
    if (!r && !o) return e;
    const a = e.x + r, h = e.y + o;
    this.box = new D(a, h, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box,
      dx: r,
      dy: o
    }).defaultPrevented && this.move(a, h);
  }
  move(t, e) {
    this.el.type === "svg" ? oe.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), it(window, "mousemove.drag"), it(window, "touchmove.drag"), it(window, "mouseup.drag"), it(window, "touchend.drag"), this.init(!0);
  }
}
b(tt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new gr(this)).init(i), this;
  }
});
class mr {
  constructor(t, e, s) {
    f(this, "_element");
    f(this, "_name");
    f(this, "_style");
    f(this, "_shape");
    f(this, "_config");
    f(this, "_displayName");
    f(this, "_x");
    f(this, "_y");
    f(this, "_auto_rotate", !1);
    this._element = t, this._name = e, this._config = Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        rotate: 0,
        size: null,
        texConverter: (n) => n
      },
      s
    ), this._displayName = s.text ?? e, this._x = 0, this._y = 0, this._style = "display: block; position: fixed; white-space:nowrap", this._shape = this._makeLabel();
  }
  get shape() {
    return this._shape;
  }
  get config() {
    return this._config;
  }
  get displayName() {
    return this._config.asHtml ? this._config.texConverter(this._displayName) : this._displayName;
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
  get auto_rotate() {
    return this._auto_rotate;
  }
  set auto_rotate(t) {
    this._auto_rotate = t;
  }
  get asHtml() {
    return this._config.asHtml;
  }
  get alignement() {
    return this._config.alignement;
  }
  // Get the label of the figure.
  get label() {
    return this._shape;
  }
  hide() {
    return this._shape.hide(), this;
  }
  show() {
    return this._shape.show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && (this._displayName = t), this._makeLabel(), this;
  }
  move(t, e) {
    return this._x = t, this._y = e, this.position(), this;
  }
  rotate(t) {
    return this._shape.transform({
      rotate: t,
      origin: { x: this._x, y: this._y }
    }), this;
  }
  position(t, e, s) {
    t ?? (t = this._config.alignement), e ?? (e = this._config.offset), s ?? (s = this._config.rotate), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, this._config.alignement = t, this._config.offset = e, this._config.rotate = s;
    let n = this._x, r = this._y, o = 0, a = 0;
    return this._shape instanceof Jt ? (o = this._shape.node.children[0].clientWidth, a = this._shape.node.children[0].clientHeight, this.label.width(o), this.label.height(a)) : (o = this._shape.length(), a = this._shape.bbox().h), t.includes("l") ? n = n - o / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? n = n + o / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (n = +n), t.includes("t") ? r = r - a / 2 : t.includes("m") ? r = +r : t.includes("b") && (r = r + a / 2), this._shape instanceof Jt ? this._shape.center(n + (e.x ?? 0), r - (e.y ?? 0)) : this._shape.center(n + (e.x ?? 0), r - (e.y ?? 0)), s !== 0 && s !== void 0 && this.rotate(s), this;
  }
  _makeLabel() {
    this._shape && this._shape.remove();
    const t = this._style + (this._config.size !== null ? `; font-size: ${this._config.size}` : "");
    return this._shape = this._config.asHtml ? this._element.foreignObject(1, 1).attr("style", "overflow:visible").add(Gi(`<div style="${t}">${this.displayName}</div>`, !0)) : this._element.text(this.displayName).css("vector-effect", "non-scaling-size"), this._shape.attr("id", `${this._name}-label`), this._shape;
  }
}
function Hi(i, t = 10) {
  return +i.toFixed(t);
}
function _r(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function He(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class I {
  constructor(t, e) {
    f(this, "_x");
    f(this, "_y");
    return this._x = 0, this._y = 0, K(t) && K(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : K(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
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
    return new I(this._y, -this._x);
  }
  get unit() {
    const t = this.norm;
    return new I(this._x / t, this._y / t);
  }
  static scalarProduct(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  projection(t) {
    const e = t.x, s = t.y, n = I.scalarProduct(this, t) / (e ** 2 + s ** 2);
    return new I(e * n, s * n);
  }
  rotate(t) {
    const e = +t * Math.PI / 180, s = +this._x, n = +this._y;
    return this._x = Math.cos(e) * s - Math.sin(e) * n, this._y = Math.sin(e) * s + Math.cos(e) * n, this;
  }
  add(t) {
    return new I(this._x + t.x, this._y + t.y);
  }
  setLength(t) {
    const e = this.norm;
    return this._x = this._x * t / e, this._y = this._y * t / e, this;
  }
}
class Ue {
  constructor(t, e) {
    f(this, "_A");
    f(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new I(0, 0), e instanceof I)
      this._A = t, this._director = e;
    else
      return new Ue(t, new I(t, e));
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
    return new I(this._director.y, -this._director.x);
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
    return _r(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let o, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (o = this._A.x, a = n * o + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (o = t.A.x, a = e * o + s) : (o = (r - s) / (e - n), a = e * o + s), o === Number.POSITIVE_INFINITY || o === Number.NEGATIVE_INFINITY ? null : { x: o, y: a };
  }
  projection(t) {
    const e = this._director, s = new I(this._A, t), n = I.scalarProduct(e, s) / I.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class $t {
  constructor(t, e) {
    f(this, "_rpn");
    f(this, "_expression");
    f(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new yr(
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
        this._addToStack(e, Ae[s.token]);
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
    t.push(Hi(e));
  }
}
const Ae = {
  pi: Math.PI,
  e: Math.exp(1)
};
class yr {
  constructor(t) {
    f(this, "_mode");
    f(this, "_tokenConfig");
    f(this, "_tokenConstant");
    f(this, "_tokenKeys");
    f(this, "_uniformize");
    f(this, "_rpn", []);
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
      for (const r in Ae)
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
    for (const h in this._tokenConfig)
      this._tokenConfig[h].type === "function" && e.push(h);
    e.sort((h, c) => c.length - h.length);
    for (const h in Ae)
      s.push(h);
    s.sort((h, c) => c.length - h.length);
    let n = "", r = 0, o, a;
    for (; r < t.length - 1; ) {
      let h = 0;
      for (; h < e.length; ) {
        const c = e[h];
        t.slice(r, r + c.length + 1) === c + "(" ? (n += c + "(", r += c.length + 1, h = 0) : h++;
      }
      for (h = 0; h < s.length; ) {
        const c = s[h];
        if (t.slice(r, r + c.length) === c) {
          n += c, r += c.length;
          break;
        }
        h++;
      }
      if (r >= t.length)
        break;
      o = t[r], a = t[r + 1], n += o, o.match(/[a-zA-Z]/g) ? /[a-zA-Z\d(]/.exec(a) && (n += "*") : /\d/.exec(o) ? /[a-zA-Z(]/.exec(a) && (n += "*") : o === ")" && /[a-zA-Z\d(]/.exec(a) && (n += "*"), r++;
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
    const h = [], c = [];
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
          h.push({ token: o, tokenType: a });
          break;
        case "operation":
          if (c.length > 0) {
            let l = c[c.length - 1];
            for (n = 50; l.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[o].associative === "left" && this._tokenConfig[o].precedence <= this._tokenConfig[l.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[o].associative === "right" && this._tokenConfig[o].precedence < this._tokenConfig[l.token].precedence); ) {
              if (n--, n === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (h.push(c.pop() ?? {
                token: "",
                tokenType: "operation"
                /* OPERATION */
              }), c.length === 0)
                break;
              l = c[c.length - 1];
            }
          }
          c.push({ token: o, tokenType: a });
          break;
        case "function-argument":
          for (n = 50; c[c.length - 1].token !== "(" && c.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            h.push(c.pop() ?? { token: o, tokenType: a });
          }
          break;
        case "(":
          c.push({ token: o, tokenType: a }), t[r] === "-" && h.push({
            token: "0",
            tokenType: "coefficient"
            /* COEFFICIENT */
          });
          break;
        case ")":
          for (n = 50; c[c.length - 1].token !== "(" && c.length > 1; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESES EXIT");
              break;
            }
            h.push(c.pop() ?? { token: o, tokenType: a });
          }
          c.pop();
          break;
        case "function":
          c.push({ token: o, tokenType: a });
          break;
        default:
          console.log(`SHUTING YARD: ${a} : ${o} `);
      }
    }
    return this._rpn = h.concat(c.reverse()), this;
  }
}
function E(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (Z(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return K(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function ee(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i / t.axis.y.y : i / t.axis.x.x;
  if (Z(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min / t.axis.y.y, n = t.origin.y + i.max / t.axis.y.y) : (s = t.origin.x + i.min / t.axis.x.x, n = t.origin.x + i.max / t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return K(i) ? {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  } : i;
}
function dt(i, t, e, s, n = 0, r = !1, o) {
  let a = 0, h = 0, c = 0, l = 0;
  if (t.x === 0)
    a = i.x, r ? h = i.y + n : h = t.y > 0 ? +n : s - n, c = i.x, o ? l = t.y < 0 ? i.y + o * t.y : 0 + n : l = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? a = i.x - n : a = t.x > 0 ? 0 + n : e - n, h = i.y, o ? c = t.x > 0 ? i.x + o * t.x : 0 - n : c = t.x > 0 ? e - n : 0 + n, l = i.y;
  else {
    let u = 0, p = 0;
    t.x > 0 ? (u = r ? -n / t.x : o || (i.x - n) / t.x, p = o || (e - i.x - n) / t.x) : t.x < 0 && (u = r ? -n / t.x : o || (e - i.x - n) / t.x, p = o || (i.x - n) / t.x), u = Math.abs(u), p = Math.abs(p), a = i.x - u * t.x, h = i.y - u * t.y, c = i.x + p * t.x, l = i.y + p * t.y;
  }
  return a > e && c > e || a < 0 && c < 0 || h > s && l > s || h < 0 && l < 0 ? null : [{ x: a, y: h }, { x: c, y: l }];
}
function ni(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function ri(i, t) {
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
function pe(i, t, e) {
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
function Ye(i, t, e, s = "->") {
  const n = (o) => i.findOne(`#${o}`);
  if (s === "x") {
    const o = `marker-x-${t}-${e}`;
    return n(o) ?? i.marker(e, e, (a) => {
      a.path(`M0,0 L${e},${e} M${e},0 L0,${e}`).stroke({ color: "black", width: 1 });
    }).attr(pe(o, e));
  }
  if (s === "|") {
    const o = `marker-|-${t}-${e}`;
    return n(o) ?? i.marker(e, e, (a) => {
      a.path(`M${e / 2},${e} L${e / 2},0`).stroke({ color: "black", width: 1 });
    }).attr(pe(t, e));
  }
  const r = `marker-${t}-${e}`;
  return n(r) ?? i.marker(
    e * 1.2,
    e * 1.2,
    (o) => {
      o.path(`M1,0 L1,${e}, L${e * 1.2},${e / 2} L1,0z`).stroke({ color: "black", width: 1 });
    }
  ).attr(pe(r, e, { refX: e, refY: e / 2 }));
}
function Ui(i) {
  if (typeof i == "number")
    return i;
  if (typeof i == "string" && i.includes("/")) {
    const [t, e] = i.split("/");
    return +t / +e;
  }
  return +i;
}
function xr(i, t, e) {
  const n = ["x^2", "x", ""];
  return Object.values(br(i, t, e)).map((o, a) => o === 0 ? "" : (a > 0 && o > 0 ? `+${o.toFixed(4)}` : o.toFixed(4)) + n[a]).join("");
}
function br(i, t, e) {
  const { x: s, y: n } = i, { x: r, y: o } = t, { x: a, y: h } = e, c = (s - r) * (s - a) * (r - a), l = (n * (r - a) + o * (a - s) + h * (s - r)) / c, u = (n * (a ** 2 - r ** 2) + o * (s ** 2 - a ** 2) + h * (r ** 2 - s ** 2)) / c, p = (n * (r * a * (r - a)) + o * (a * s * (a - s)) + h * (s * r * (s - r))) / c;
  return { a: l, b: u, c: p };
}
class V {
  constructor(t, e) {
    f(this, "_rootSVG");
    f(this, "_name");
    f(this, "_element");
    f(this, "_shape");
    f(this, "_appearance");
    f(this, "_static");
    f(this, "_isDraggable");
    f(this, "_label");
    f(this, "_animate");
    this._rootSVG = t, this._name = e, this._static = !1, this._isDraggable = !1, this._animate = null, this._label = null, this._element = this._rootSVG.group().attr("id", this._name), this._appearance = {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }, this._shape = this._element.path();
  }
  get rootSVG() {
    return this._rootSVG;
  }
  get name() {
    return this._name;
  }
  get element() {
    return this._element;
  }
  get shape() {
    return this._shape;
  }
  set shape(t) {
    this._shape = t;
  }
  get appearance() {
    return this._appearance;
  }
  set appearance(t) {
    this._appearance = t;
  }
  get static() {
    return this._static;
  }
  set static(t) {
    this._static = t;
  }
  get isDraggable() {
    return this._isDraggable;
  }
  set isDraggable(t) {
    this._isDraggable = t;
  }
  get label() {
    return this._label;
  }
  get animate() {
    return this._animate;
  }
  set animate(t) {
    this._animate = t;
  }
  get graphConfig() {
    return this._rootSVG.data("config");
  }
  hide() {
    return this._element.hide(), this;
  }
  show() {
    return this._element.show(), this;
  }
  // Defines the shape as strokeable and fillable.
  strokeable() {
    return [this._shape];
  }
  fillable() {
    return [this._shape];
  }
  fill(t) {
    if (t !== void 0) {
      const [e, s] = t.split("/");
      this._appearance.fill.color = e, this._appearance.fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(this._appearance.fill), e.opacity(this._appearance.fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      this._appearance.stroke.color = s, this._appearance.stroke.opacity = n === void 0 ? 1 : +n, this._appearance.stroke.width = e ?? this._appearance.stroke.width;
    }
    return typeof t == "number" && e === void 0 && (this._appearance.stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(this._appearance.stroke), s.opacity(this._appearance.stroke.opacity);
    }), [this._shape.reference("marker-start"), this._shape.reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s.children().forEach((n) => {
        n.attr({
          fill: this._appearance.stroke.color,
          stroke: this._appearance.stroke.color,
          "stroke-width": this._appearance.stroke.width
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
    return t ? (this._element.clear(), this) : (this._element.children().forEach((e) => {
      e.attr("id") !== `${this._name}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || this._isDraggable) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return this._label = new mr(
      this._element,
      this._name,
      {
        text: t ?? this._name,
        asHtml: e ?? !1,
        alignement: "br",
        size: "inherit",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    ), this.updateLabel(), this._label;
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return this._label ? (this._label.setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = this._label) == null ? void 0 : t.config.text) ?? this._name;
  }
  move(t) {
    if (K(t)) {
      const e = E(t.x, this.graphConfig), s = E(t.y, this.graphConfig);
      this._shape.translate(e, -s);
    } else if (typeof t == "number") {
      const e = E(t, this.graphConfig);
      this._shape.translate(e, 0);
    }
    return this;
  }
  scale(t) {
    return typeof t == "number" ? this.scale({
      x: t,
      y: t
    }) : (this._shape.scale(t.x, t.y), this);
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.find((a) => typeof a == "number")) ?? 10, n = (e == null ? void 0 : e.find((a) => typeof a == "string")) ?? "->", r = Ye(
      this._rootSVG,
      this.name,
      s,
      n
    ), o = this._shape;
    return t === "start" ? (o.marker("start", r), this) : t === "end" ? (o.marker("end", r), this) : (o.marker("start", r), o.marker("end", r), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
var M = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.EVAL_FX = "eval", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(M || {});
function P(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const wr = [
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
class q extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    f(this, "_end");
    f(this, "_start");
    return this._config = Object.assign(
      { shape: "line" },
      n
    ), this._start = { x: 0, y: 0 }, this._end = { x: this.graphConfig.width, y: this.graphConfig.height }, this.shape = this._makeShape(), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._makeShape();
  }
  get end() {
    return this._end;
  }
  set end(e) {
    this._end = e;
  }
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
    return new Ue(this.start, this.end);
  }
  get normal() {
    const e = this.direction;
    return {
      x: e.y,
      y: -e.x
    };
  }
  computed() {
    var n, r, o, a, h;
    let e = { x: 0, y: 0 };
    if ((n = this._config.through) != null && n.A && this._config.through.B)
      this.start = this._config.through.A, this.end = this._config.through.B, e = this.direction;
    else if ((r = this._config.director) != null && r.A && this._config.director.d)
      this.start = this._config.director.A, this.end = {
        x: this._config.director.A.x + this._config.director.d.x,
        y: this._config.director.A.y + this._config.director.d.y
      }, e = this._config.director.d;
    else if ((o = this._config.parallel) != null && o.to && this._config.parallel.through)
      this.start = this._config.parallel.through, e = this._config.parallel.to.direction;
    else if ((a = this._config.perpendicular) != null && a.to && this._config.perpendicular.through)
      this.start = this._config.perpendicular.through, e = this._config.perpendicular.to.normal;
    else if ((h = this._config.mediator) != null && h.A && this._config.mediator.B)
      this.start = {
        x: (this._config.mediator.A.x + this._config.mediator.B.x) / 2,
        y: (this._config.mediator.A.y + this._config.mediator.B.y) / 2
      }, e = {
        x: this._config.mediator.B.y - this._config.mediator.A.y,
        y: -(this._config.mediator.B.x - this._config.mediator.A.x)
      };
    else if (this._config.bisector) {
      if ("d1" in this._config.bisector && "d2" in this._config.bisector, "A" in this._config.bisector && "B" in this._config.bisector && "C" in this._config.bisector) {
        const { A: c, B: l, C: u } = this._config.bisector, p = new I(c, l), d = p.norm, y = new I(c, u), m = y.norm;
        this.start = c, e = {
          x: p.x / d + y.x / m,
          y: p.y / d + y.y / m
        };
      }
    } else if (this._config.equation) {
      const c = this._config.equation;
      if (!c.includes("="))
        return this;
      let l = { x: 0, y: 0 };
      if (c.startsWith("y=") && !c.includes("x")) {
        const u = P([c.split("=")[1]], {})[0];
        l = E({ x: 0, y: u }, this.graphConfig), e = { x: 1, y: 0 };
      } else if (c.startsWith("x=")) {
        const u = P([c.split("=")[1]], {})[0];
        l = E({ x: u, y: 0 }, this.graphConfig), e = { x: 0, y: 1 };
      } else {
        const [u, p] = c.split("="), d = oi(u), y = oi(p), m = {
          a: d.a - y.a,
          b: d.b - y.b,
          c: d.c - y.c
        };
        l = E({ x: 0, y: -m.c / m.b }, this.graphConfig), e = {
          x: m.b,
          y: m.a
        };
      }
      this.start = l, this.end = {
        x: l.x + e.x,
        y: l.y + e.y
      };
    }
    if (this._config.shape === void 0 || this._config.shape === "line" || this._config.shape === "ray") {
      const c = dt(
        this.start,
        e,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        this._config.shape === "ray"
      );
      c !== null && (this.start = c[0], this.end = c[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  follow(e, s) {
    const n = this.math.projection({ x: e, y: s });
    if (this._config.shape === "line")
      return n;
    const { x: r, y: o } = this.start, { x: a, y: h } = this.end, c = a - r, l = h - o, u = Math.max(0, Math.min(1, ((e - r) * c + (s - o) * l) / (c * c + l * l)));
    return {
      x: r + u * c,
      y: o + u * l
    };
  }
  move(e) {
    if (typeof e == "number") {
      const s = new I(this.normal).setLength(e);
      return this.move(s);
    }
    return super.move(e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    if (this._config.shape === "segment" || this._config.shape === "vector") {
      const e = (this.start.x + this.end.x) / 2, s = (this.start.y + this.end.y) / 2;
      if (this.label.move(e, s), this.label.auto_rotate) {
        let n = -this.angle;
        n > 90 && (n = n - 180), n < -90 && (n = n + 180), this.label.position(void 0, void 0, n);
      }
    }
    return this;
  }
  _makeShape() {
    if (this.element.clear(), this.shape = this.element.line(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y
    ), this._config.shape === "vector") {
      const e = Ye(this.rootSVG, this.name, 10);
      this.shape.marker("end", e);
    }
    return this.fill().stroke(), this.shape;
  }
}
function oi(i) {
  const t = i.split(/([+-]?[0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = ai(t, "x"), s = ai(t, "y"), n = Ui(t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? 0);
  return {
    a: +P([e], {})[0],
    b: +P([s], {})[0],
    c: +P([n], {})[0]
  };
}
function ai(i, t) {
  return i.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : Ui(e.replace(t, "")))[0] ?? 0;
}
class k extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    // Coordinates of the point in pixels
    f(this, "_pixels");
    return this._pixels = { x: NaN, y: NaN }, this._config = Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    ), this.computed(), this.shape = this._makeShape(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._makeShape();
  }
  get pixels() {
    return this._pixels;
  }
  set pixels(e) {
    this._pixels = e, this.shape.center(this._pixels.x, this._pixels.y);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return ee(this._pixels, this.graphConfig);
  }
  get size() {
    return this._config.size;
  }
  set size(e) {
    this._config.size = e, this._makeShape();
  }
  get x() {
    return this._pixels.x;
  }
  set x(e) {
    this._pixels.x = e, this.shape.center(e, this._pixels.y);
  }
  get y() {
    return this._pixels.y;
  }
  set y(e) {
    this._pixels.y = e, this.shape.center(this._pixels.x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, this._makeShape(), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, this._makeShape(), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, this._makeShape(), this;
  }
  computeLabel() {
    var e, s;
    if ((e = this.label) != null && e.config.text.includes("@")) {
      const n = ee(this._pixels, this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
  computed() {
    if (this._config.coordinates) {
      const { x: e, y: s } = this._config.coordinates;
      return this.pixels = E({
        x: typeof e == "number" ? e : e.point.coordinates[e.axis],
        y: typeof s == "number" ? s : s.point.coordinates[s.axis]
      }, this.graphConfig), this;
    }
    if (this._config.middle) {
      const e = this._config.middle.A, s = this._config.middle.B;
      return this._pixels.x = (e.x + s.x) / 2, this._pixels.y = (e.y + s.y) / 2, this;
    }
    if (this._config.projection) {
      const e = this._config.projection.point;
      if (this._config.projection.axis === "Ox")
        return this.x = e.x, this.y = this.graphConfig.origin.y, this;
      if (this._config.projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = e.y, this;
      if (this._config.projection.axis instanceof q) {
        const s = this._config.projection.axis, n = s.start.x, r = s.start.y, o = e.x - n, a = e.y - r, h = s.direction, c = o * h.x + a * h.y, l = h.x * h.x + h.y * h.y;
        this.x = n + c * h.x / l, this.y = r + c * h.y / l;
      }
    }
    if (this._config.intersection) {
      const e = this._config.intersection.A, s = this._config.intersection.B, n = e.math.intersection(s.math);
      if (n === null)
        return this;
      this.pixels = n;
    }
    if (this._config.intersectionWithCircle) {
      const e = this._config.intersectionWithCircle.A, s = this._config.intersectionWithCircle.B, n = this._config.intersectionWithCircle.index, r = e.intersectionWithLine(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.pixels = r[n];
    }
    if (this._config.intersectionBetweenCircles) {
      const e = this._config.intersectionBetweenCircles.A, s = this._config.intersectionBetweenCircles.B, n = this._config.intersectionBetweenCircles.index, r = e.intersectionWithCircle(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.show(), this.pixels = r[n];
    }
    if (this._config.symmetry) {
      const e = this._config.symmetry.A, s = this._config.symmetry.B;
      if (s instanceof q) {
        const r = new I(s.direction).normal, a = new I(e, s.start).projection(r);
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
    if (this._config.direction) {
      const { point: e, direction: s, distance: n } = this._config.direction;
      if (s === "Ox")
        return this.x = e.x + E(n, this.graphConfig), this.y = e.y, this;
      if (s === "Oy")
        return this.x = e.x, this.y = e.y - E(n, this.graphConfig), this;
      if (s instanceof q) {
        const r = new I(this._config.direction.perpendicular ? s.normal : s.direction).unit, o = E(n, this.graphConfig);
        return this.x = e.x + o * r.x, this.y = e.y + o * r.y, this;
      }
      if (s.A && s.B) {
        const r = new I(s.A, s.B);
        return this.x = e.x + n * r.x, this.y = e.y + n * r.y, this;
      }
    }
    if (this._config.evaluation) {
      const { fx: e, x: s } = this._config.evaluation;
      this.pixels = e.evaluate(typeof s == "number" ? s : s.point.coordinates[s.axis]);
    }
    return this;
  }
  moveLabel() {
    return this.label && this.label.move(this.x, this.y), this;
  }
  _makeShape() {
    switch (this.clear(), this.config.shape) {
      case "circle":
        this.shape = this.element.circle(this.size).center(this._pixels.x, this._pixels.y);
        break;
      case "square":
        this.shape = this.element.rect(this.size, this.size).center(this._pixels.x, this._pixels.y);
        break;
      case "crosshair": {
        const e = this.size / Math.sqrt(2);
        this.shape = this.element.path(
          `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
        ).center(this._pixels.x, this._pixels.y);
        break;
      }
    }
    return this.fill().stroke(), this.shape;
  }
}
class St extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_numExp");
    f(this, "_fx");
    f(this, "_config");
    return this._config = Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n), this.shape = this._makeShape(), this._fx = this._getExpression(), this._numExp = new $t(this._fx), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._numExp = new $t(this._getExpression()), this.computed();
  }
  computed() {
    const e = this._getExpression();
    if (!e || e === "")
      return this;
    e !== this._fx && (this._fx = e, this._numExp = new $t(this._getExpression()));
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = this._config.domain ?? { min: s, max: n }, o = this._config.image ?? { min: -1 / 0, max: 1 / 0 }, a = this._config.samples ?? this.graphConfig.axis.x.x, h = this._numExp, c = this._calculatePointsCoordinates(r, a, h, o);
    let l = c[0];
    const u = 1e6, p = c.map(({ x: y, y: m }, v) => {
      let w = v === 0 ? "M" : "L";
      return v > 0 && (isNaN(m) ? (w = "M", m = l.y > 0 ? u : -u) : (l.y < 0 && m > this.graphConfig.height || m < 0 && l.y > this.graphConfig.height) && (w = "M")), l = { x: y, y: m }, `${w} ${y} ${m}`;
    }).join(" ");
    return this.shape.plot(p), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: this._numExp.evaluate({ x: e }) } : E(
      { x: e, y: this._numExp.evaluate({ x: e }) },
      this.graphConfig
    );
  }
  follow(e, s) {
    const n = ee({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
  _getExpression() {
    if (typeof this._config.expression == "string")
      return this._config.expression;
    if (this._config.quadratic && this._config.quadratic.length === 3 && this._config.quadratic.every((e) => e instanceof k)) {
      const [e, s, n] = this._config.quadratic.map((r) => r.coordinates);
      return xr(e, s, n);
    }
    return "";
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  _calculatePointsCoordinates(e, s, n, r) {
    const o = [];
    for (let a = e.min; a < e.max; a += 1 / s) {
      const h = n.evaluate({ x: a });
      if (isNaN(h) || h === 1 / 0 || h === -1 / 0 || h < r.min || h > r.max) {
        const c = E({ x: a, y: 0 }, this.graphConfig);
        o.push({ x: c.x, y: NaN });
      } else
        o.push(E({ x: a, y: h }, this.graphConfig));
    }
    return o;
  }
}
class Wt extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    this._config = Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n), this._makeShape(), this.computed();
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._makeShape();
  }
  get center() {
    return this._config.center;
  }
  get radius() {
    return typeof this._config.radius == "number" ? E(this._config.radius, this.graphConfig) : He(this.center, this._config.radius);
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
    const { x: n, y: r } = this.center, { x: o, y: a } = e.start, { x: h, y: c } = e.end, l = h - o, u = c - a, p = o - n, d = a - r, y = l * l + u * u, m = 2 * (l * p + u * d), v = p * p + d * d - this.radius * this.radius, w = m * m - 4 * y * v;
    if (w < 0)
      return null;
    const L = [], z = Math.sqrt(w), U = (-m - z) / (2 * y), Y = (-m + z) / (2 * y);
    for (const F of [U, Y])
      s && (F < 0 || F > 1) || L.push({
        x: o + F * l,
        y: a + F * u
      });
    return L;
  }
  intersectionWithCircle(e) {
    const { x: s, y: n } = this.center, { x: r, y: o } = e.center, a = this.radius, h = e.radius, c = r - s, l = o - n, u = Math.hypot(c, l);
    if (u > a + h || u < Math.abs(a - h) || u === 0)
      return null;
    const p = (a * a - h * h + u * u) / (2 * u), d = Math.sqrt(a * a - p * p), y = s + p * c / u, m = n + p * l / u, v = -l * (d / u), w = c * (d / u), L = { x: y + v, y: m + w }, z = { x: y - v, y: m - w };
    return Math.abs(d) < 1e-10 ? [L] : [L, z];
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
  }
}
class kr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    this._config = Object.assign({
      shape: "polygon"
    }, n), this._makeShape(), this.computed();
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._makeShape();
  }
  get vertices() {
    return this._config.vertices;
  }
  get radius() {
    return this._config.regular ? typeof this._config.regular.radius == "number" ? E(this._config.regular.radius, this.graphConfig) : this._config.vertices && K(this._config.vertices[0]) && K(this._config.regular.radius) ? He(this._config.vertices[0], this._config.regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  _figuresXYtoArray() {
    var s;
    const e = [];
    return (s = this._config.vertices) == null || s.forEach((n) => {
      K(n) && e.push([n.x, n.y]);
    }), e;
  }
  _makeShape() {
    var s;
    this.element.clear();
    const e = this._figuresXYtoArray();
    if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), this._config.mark) {
      const n = ((s = this._config.mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
        (o, a) => (o.x += a[0], o.y += a[1], o),
        { x: 0, y: 0 }
      );
      r.x /= e.length, r.y /= e.length, e.forEach((o) => {
        const a = new I(r, { x: o[0], y: o[1] });
        n && a.setLength(n * 20), this.element.line(r.x, r.y, r.x + a.x, r.y + a.y).stroke({ color: "gray", width: 0.5 });
      });
    }
    return this.shape;
  }
  computed() {
    const e = this.shape;
    if (this._config.vertices && this._config.vertices.length > 2)
      e.plot(this._figuresXYtoArray());
    else if (this._config.regular) {
      const s = [], n = this.radius, r = new I(
        this._config.regular.center,
        K(this._config.regular.radius) ? this._config.regular.radius : { x: this._config.regular.center.x, y: this._config.regular.center.y - n }
      );
      for (let o = 0; o < this._config.regular.sides; o++)
        s.push([
          this._config.regular.center.x + r.x,
          this._config.regular.center.y + r.y
        ]), r.rotate(360 / this._config.regular.sides);
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
class vr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    return this.static = !0, this._config = Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    ), this.shape = this._makeShape(), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  computed() {
    const s = [
      ...this._computeLines(this._config.axis.x, this._config.axis.y),
      ...this._computeLines(this._config.axis.y, this._config.axis.x)
    ].reduce((r, o) => {
      const [a, h] = o;
      return r + `M${a.x},${a.y} L${h.x},${h.y}`;
    }, "");
    return this.shape.plot(s), this;
  }
  moveLabel() {
    return this;
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
  }
  _computeLines(e, s) {
    let n = +this._config.origin.x, r = +this._config.origin.y;
    const o = [];
    let a = dt(
      { x: n, y: r },
      e,
      this._config.width,
      this._config.height
    );
    const h = (this._config.width + this._config.height) / 2;
    let c = 0;
    for (; c < h && (a && o.push(a), n += s.x, r -= s.y, a = dt(
      { x: n, y: r },
      e,
      this._config.width,
      this._config.height
    ), !(a === null && (n > this._config.width || r > this._config.height))); ) {
      if (o.length > 1e3)
        throw new Error("Too many lines");
      c++;
    }
    for (n = this._config.origin.x - s.x, r = this._config.origin.y + s.y, a = dt(
      { x: n, y: r },
      e,
      this._config.width,
      this._config.height
    ), c = 0; c < h && (a && o.push(a), n -= s.x, r += s.y, a = dt(
      { x: n, y: r },
      e,
      this._config.width,
      this._config.height
    ), !(a === null && (n < 0 || r < 0))); ) {
      if (o.length > 1e3)
        throw new Error("Too many lines");
      c++;
    }
    return o;
  }
}
class Cr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    this._config = Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n), this.config = n;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this._makeShape(), this.computed();
  }
  get center() {
    return this._config.center;
  }
  get start() {
    return this._config.start;
  }
  get end() {
    return this._config.end;
  }
  get radius() {
    return typeof this._config.radius == "number" ? E(this._config.radius, this.graphConfig) : He(this.center, this._config.radius ?? this._config.start);
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return Hi((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new I(this.center, this.start).unit, r = new I(this.center, this.end).unit, o = n.add(r).unit, a = this.center.x + s * o.x * (e + 20), h = this.center.y + s * o.y * (e + 20);
    return s * o.x > 0 && s * o.y > 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y > 0 ? this.label.config.alignement = "ml" : s * o.x > 0 && s * o.y < 0 ? this.label.config.alignement = "mr" : s * o.x < 0 && s * o.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, h), this;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +ri(this.center, this.start).toFixed(10),
      end: +ri(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = this._config.morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = ni(this.center.x, this.center.y, n, e), o = ni(this.center.x, this.center.y, n, s);
    return this._config.morphToSquare && this.isSquare ? this._describeSquare(this.center, r, o) : this._describeArc(this.center, r, o, n, s - e);
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
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
    let c = [
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
    return this._config.sector && (c = c.concat(["L", e.x, e.y, "L", s.x, s.y])), c.join(" ");
  }
}
class Sr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_axis");
    f(this, "_config");
    return this.static = !0, Object.values(Ft).includes(n) ? this._config = this._defaultConfig(n) : this._config = n, this._axis = this._makeShape(), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  get xAxis() {
    return this._axis.x;
  }
  get yAxis() {
    return this._axis.y;
  }
  computed() {
    return this._updateAxis(this._axis.x, this._config.x.direction, this._config.x), this._updateAxis(this._axis.y, this._config.y.direction, this._config.y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
  _defaultConfig(e) {
    return Ft.POLAR, {
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
  }
  _makeShape() {
    this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
    const e = {
      x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
      y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
    };
    return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
  }
  _updateAxis(e, s, n) {
    const r = (n == null ? void 0 : n.color) ?? "black", o = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, h = (n == null ? void 0 : n.length) ?? 0, c = Ye(this.rootSVG, `axis-${s.x}-${s.y}`, 10).fill(r), l = dt(
      this.graphConfig.origin,
      s,
      this.graphConfig.width,
      this.graphConfig.height,
      o,
      a,
      h
    );
    return l !== null && e.plot(l[0].x, l[0].y, l[1].x, l[1].y), e.stroke({ color: r, width: 1 }).marker("end", c), this.shape.add(e), e;
  }
}
class Mr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_numExp");
    f(this, "_config");
    return this._config = Object.assign({
      expressions: { x: "", y: "" }
    }, n), this._numExp = {
      x: new $t(this._config.expressions.x),
      y: new $t(this._config.expressions.y)
    }, this.shape = this._makeShape(), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const e = this._config.samples ?? this.graphConfig.axis.x.x, s = this._config.domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
    for (let a = s.min; a < s.max; a += 1 / e) {
      const { x: h, y: c } = this.evaluate(a);
      n.push({ x: h, y: c });
    }
    const r = n.map(({ x: a, y: h }, c) => `${c === 0 ? "M" : "L"} ${a} ${h}`).join(" ");
    return this.shape.plot(r), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e) {
    return E(
      {
        x: this._numExp.x.evaluate({ t: e }),
        y: this._numExp.y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
class Tr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_reference");
    f(this, "_delta");
    f(this, "_point");
    f(this, "_tangent");
    f(this, "_config");
    return this._config = Object.assign({
      size: 10
    }, n), this.appearance.fill.color = "black", this._reference = this._config.follow.follow(0, 0), this._delta = { x: 0, y: 0 }, this._tangent = this.element.line(), this._point = this.element.circle(this._config.size).center(this._reference.x, this._reference.y), this.shape = this._makeShape(), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var h;
      let o = this.rootSVG.node.createSVGPoint();
      o.x = r.clientX, o.y = r.clientY, o = o.matrixTransform((h = this.rootSVG.node.getScreenCTM()) == null ? void 0 : h.inverse());
      const a = this._config.follow.follow(o.x, o.y);
      isNaN(a.y) ? this._point.hide() : (this._point.show(), this._point.center(a.x, a.y), this._reference = a, this._delta = this._config.follow.follow(o.x + 0.01, o.y + 0.01), this.computed());
    }), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  _makeShape() {
    return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const e = dt(
      this._reference,
      {
        x: this._delta.x - this._reference.x,
        y: this._delta.y - this._reference.y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (this._tangent.plot(
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
    return [this._tangent];
  }
  fillable() {
    return [this._point];
  }
}
class Ar extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    return this._config = Object.assign({
      samples: 100
    }, n), this.shape = this._makeShape(), this.computed(), this;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  get domain() {
    return this._config.domain ? E(this._config.domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return this._config.image ? E(this._config.image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const [e, s] = this._config.expressions, n = this.domain;
    this.image;
    function r(c, l) {
      const [u, p, d] = c;
      return `${l === 0 ? "M" : u} ${p ?? 0} ${d ?? 0}`;
    }
    const o = e.shape.array().filter((c) => {
      const l = c[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r);
    let a = [];
    return s ? a = [...s.shape.array()].filter((c) => {
      const l = c[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r).reverse() : a = [`m ${n.min} 0`], this.shape.plot(`${o.join(" ")} ${a.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
class Or extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    this._config = Object.assign({}, n), this.shape = this._makeShape(), this.computed();
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e, this.computed();
  }
  get rectangles() {
    return this._config.rectangles;
  }
  set rectangles(e) {
    this._config.rectangles = e > 0 ? e : 10;
  }
  get position() {
    return this._config.position < 0 && (this._config.position = 0), this._config.position > 1 && (this._config.position = 1), this._config.position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), this._config.position = e;
  }
  _makeShape() {
    return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    this.shape.clear();
    const e = E(this._config.domain, this.graphConfig), n = (e.max - e.min) / this._config.rectangles, r = (this._config.domain.max - this._config.domain.min) / this._config.rectangles, o = this.graphConfig.origin.y;
    for (let a = 0; a < this._config.rectangles; a += 1) {
      const h = e.min + a * n, c = this._config.domain.min + (a + this.position) * r, l = this._config.follow.evaluate(c).y;
      this.shape.add(
        this.element.rect(n, Math.abs(o - l)).move(h, l)
      );
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
class Nr extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_d", "");
    n && (this._d = n, this.computed(), this._makeShape());
  }
  get d() {
    return this._d;
  }
  set d(e) {
    this._d = e, this.shape.plot(this._d);
  }
  computed() {
    return this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
  _makeShape() {
    return this.clear(), this.shape = this.element.path(this._d).fill("none").stroke({ color: "black", width: 1 }), this.shape;
  }
}
function Ir(i) {
  return i.reduce(
    (t, e, s, n) => s === 0 ? (
      // if first point
      `M ${e.point.x},${e.point.y}`
    ) : (
      // else
      `${t} ${Lr(e, s, n)}`
    ),
    ""
  );
}
function Er(i, t) {
  const e = t.point.x - i.point.x, s = t.point.y - i.point.y;
  return {
    length: Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)),
    angle: Math.atan2(s, e)
  };
}
function hi(i, t, e, s) {
  const n = t ?? i, r = e ?? i, o = i.controls.ratio ?? 0.2, a = Er(n, r);
  let h = a.angle + (s ? Math.PI : 0);
  const c = a.length * o;
  i.controls.type === Q.VERTICAL || i.controls.type === Q.DOWN ? h = Math.PI / 2 + (s ? Math.PI : 0) : i.controls.type === Q.UP ? h = Math.PI / 2 + (s ? 0 : Math.PI) : i.controls.type === Q.HORIZONTAL || i.controls.type === Q.RIGHT ? h = s ? Math.PI : 0 : i.controls.type === Q.LEFT && (h = s ? 0 : Math.PI);
  const l = i.point.x + Math.cos(h) * c, u = i.point.y + Math.sin(h) * c;
  return [l, u];
}
function Lr(i, t, e) {
  const [s, n] = hi(e[t - 1], e[t - 2], i), [r, o] = hi(i, e[t - 1], e[t + 1], !0);
  return `C ${s},${n} ${r},${o} ${i.point.x},${i.point.y}`;
}
class $r extends V {
  constructor(e, s, n) {
    super(e, s);
    f(this, "_config");
    f(this, "_points");
    this._config = n, this._points = [], this.points = n.points, this._makeShape(), this.computed();
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e;
  }
  get points() {
    return this._points;
  }
  set points(e) {
    const s = {
      type: Q.SMOOTH,
      ratio: 0.2,
      left: null,
      right: null
    };
    this._points = e, this._points.forEach((n) => {
      n.controls = Object.assign({}, s, n.controls);
    });
  }
  computed() {
    const e = Ir(this._points);
    return this.shape.plot(e), this;
  }
  getPointByName(e) {
    return this._points.find((s) => s.point.name === e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    throw new Error("Method not implemented.");
  }
  setControlRatio(e, s) {
    const n = this.getPointByName(e);
    return n && (n.controls.ratio = s), this;
  }
  setControlType(e, s) {
    const n = this.getPointByName(e);
    return n && (n.controls.type = s), this;
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
  }
}
var We = /* @__PURE__ */ ((i) => (i.RESET = "reset", i.REVERSE = "reverse", i.NONE = "none", i))(We || {});
class zr {
  constructor(t) {
    f(this, "_graph");
    f(this, "_animatedPoints", []);
    f(this, "_startTime", 0);
    f(this, "_elapsedAtPause", 0);
    f(this, "_paused", !1);
    f(this, "_rafId", null);
    f(this, "_animations", /* @__PURE__ */ new Map());
    f(this, "_step", (t) => {
      if (this._startTime === 0 && (this._startTime = t - this._elapsedAtPause), this._paused)
        return;
      let e = !1;
      for (const s of this._animations.values()) {
        s.startTime === 0 && (s.startTime = this._startTime);
        const n = t - s.startTime;
        if (n < s.delay) {
          s.point.x = s.from.x, s.point.y = s.from.y, e = !0;
          continue;
        }
        const r = n - s.delay, o = Math.min(r / s.duration, 1), a = s.ease(o);
        s.point.x = s.from.x + (s.to.x - s.from.x) * a, s.point.y = s.from.y + (s.to.y - s.from.y) * a, o < 1 ? e = !0 : s.loop === "reset" ? (s.point.x = s.from.x, s.point.y = s.from.y, s.startTime = t, e = !0) : s.loop === "reverse" && ([s.from, s.to] = [s.to, s.from], s.startTime = t, e = !0);
      }
      this._graph.update(this._animatedPoints), e ? this._rafId = requestAnimationFrame(this._step) : this._rafId = null;
    });
    this._graph = t, this._updatePoints();
  }
  start() {
    this.cancel(), this._paused = !1, this._startTime = 0, this._elapsedAtPause = 0, this._animations.forEach((t) => {
      t.startTime = 0;
    }), this._rafId = requestAnimationFrame(this._step);
  }
  pause() {
    this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._paused = !0, this._elapsedAtPause = performance.now();
  }
  resume() {
    if (this._paused) {
      const t = performance.now() - this._elapsedAtPause;
      this._animations.forEach((e) => {
        e.startTime += t;
      }), this._paused = !1, this._rafId = requestAnimationFrame(this._step);
    }
  }
  cancel() {
    this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null), this._paused = !1, this._elapsedAtPause = 0, this._startTime = 0, setTimeout(() => {
      this._graph.update(), this._updatePoints();
    }, 200);
  }
  isRunning() {
    return this._rafId !== null && !this._paused;
  }
  isPaused() {
    return this._paused;
  }
  canBeAnimated() {
    return this._animations.size > 0;
  }
  _updatePoints() {
    return this._animations = /* @__PURE__ */ new Map(), this._animatedPoints = [], Object.values(this._graph.figures).forEach((t) => {
      if (K(t) && t.animate !== null) {
        const e = t.animate, s = t, n = e.from, r = e.to;
        this._animations.set(
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
            delay: e.delay * 1e3,
            startTime: 0
          }
        ), this._animatedPoints.push(t.name);
      }
    }), this._animatedPoints;
  }
}
function Dr(i) {
  return i === !0 || i === "1" || i === 1 ? "reset" : typeof i == "string" && Object.values(We).includes(i) ? i : "none";
}
class Pr {
  constructor(t, e) {
    f(this, "_Animate", null);
    f(this, "_config");
    f(this, "_display");
    f(this, "_figures");
    f(this, "_layers");
    f(this, "_rootSVG");
    f(this, "_toTex");
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return this._config = Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Ft.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e), this._toTex = (e == null ? void 0 : e.tex) ?? ((o) => o), this._display = Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display), this._rootSVG = Gi().addTo(s).viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
      width: this._config.width,
      height: this._config.height,
      origin: this._config.origin,
      // grids: this.#grids,
      axis: this._config.axis
    }), this._layers = {}, Object.values(Xi).forEach((o) => {
      this._layers[o] = this._rootSVG.group().attr("id", `LAYER_${o}`);
    }), this._figures = {}, this._makeLayout(), this;
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
        K(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new k(
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
        const s = new q(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      path: (t, e) => {
        const s = new Nr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      bezier: (t, e) => {
        const s = new $r(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      plot: (t, e) => {
        const s = new St(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new Mr(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      circle: (t, e) => {
        const s = new Wt(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new kr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      arc: (t, e) => {
        const s = new Cr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      follow: (t, e) => {
        const s = new Tr(this._rootSVG, e, t);
        return this._layers.plots_FG.add(s.element), this._figures[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new Ar(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new Or(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      }
    };
  }
  get animation() {
    return this._Animate || (this._Animate = new zr(this)), this._Animate;
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), this._figures = {};
  }
  coordinate_system(t) {
    const e = new Sr(
      this._rootSVG,
      "COORDINATE_SYSTEM",
      t
    );
    return this._layers.axis.add(e.element), e;
  }
  draggable(t, e) {
    const s = (n) => {
      var u;
      const r = t, { box: o } = n.detail;
      let { x: a, y: h } = o;
      if (n.preventDefault(), a < 0 || a > this._config.width - o.width / 2 || h < 0 || h > this._config.height - o.height / 2)
        return;
      if ((u = e == null ? void 0 : e.follow) != null && u.length) {
        let p = { x: a, y: h };
        e.follow.forEach((d) => {
          d instanceof V ? p = d.follow(a, h) : typeof d == "string" ? p = this.follow(d, r)(a, h) : p = d(a, h), a = p.x, h = p.y;
        });
      }
      if (r.pixels.x === a && r.pixels.y === h)
        return;
      r.pixels = { x: a, y: h };
      const c = (e == null ? void 0 : e.target) ?? null;
      c instanceof k && (c.pixels = { x: a, y: h }), e != null && e.callback && e.callback(t);
      const l = [t.name];
      c && l.push(c.name), this.update(l);
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
    const s = new vr(this._rootSVG, t, {
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
    return E(t, this.config, e);
  }
  toCoordinates(t, e) {
    return ee(t, this.config, e);
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
    }), this._makeLayout(), this.update([], !0);
  }
  _makeLayout() {
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
  }
}
var Yi = (i) => {
  throw TypeError(i);
}, Ke = (i, t, e) => t.has(i) || Yi("Cannot " + e), G = (i, t, e) => (Ke(i, t, "read from private field"), e ? e.call(i) : t.get(i)), bt = (i, t, e) => t.has(i) ? Yi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), et = (i, t, e, s) => (Ke(i, t, "write to private field"), t.set(i, e), e), de = (i, t, e) => (Ke(i, t, "access private method"), e);
function Et(i) {
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
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(Et) : i;
}
function ge(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function jr(i) {
  if (!i.includes("="))
    return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var pt, wt, ot, Ct, kt, Lt, Wi, Oe;
class Vr {
  constructor(t) {
    bt(this, Lt), bt(this, pt), bt(this, wt, "->"), bt(this, ot, ","), bt(this, Ct, "/"), bt(this, kt, []);
    var e, s, n;
    t && (et(this, pt, t.formatter ?? void 0), (e = t.splitter) != null && e.main && et(this, wt, t.splitter.main), (s = t.splitter) != null && s.entry && et(this, ot, t.splitter.entry), (n = t.splitter) != null && n.parameter && et(this, Ct, t.splitter.parameter), t.keys && et(this, kt, t.keys));
  }
  get splitter() {
    return {
      main: G(this, wt),
      entry: G(this, ot),
      parameter: G(this, Ct)
    };
  }
  set splitter_main(t) {
    et(this, wt, t);
  }
  set splitter_entry(t) {
    et(this, ot, t);
  }
  set splitter_parameter(t) {
    et(this, Ct, t);
  }
  get formatter() {
    return G(this, pt);
  }
  set formatter(t) {
    et(this, pt, t);
  }
  get keys() {
    return G(this, kt);
  }
  set keys(t) {
    et(this, kt, t);
  }
  parse(t) {
    const [e, s] = t.split(G(this, wt)), n = G(this, pt) ? G(this, pt).call(this, e) : e.trim(), { name: r, key: o, values: a } = de(this, Lt, Wi).call(this, n), h = de(this, Lt, Oe).call(this, s);
    return { name: r, key: o, values: a, parameters: h };
  }
  parameters(t, e) {
    return de(this, Lt, Oe).call(this, t, e ?? G(this, kt));
  }
}
pt = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakSet(), Wi = function(i) {
  const [t, ...e] = i.split(" "), [s, n] = t.split("="), r = ge(
    e.join(" "),
    G(this, ot)
  ).map((o) => Et(o));
  return { name: s, key: n, values: r };
}, Oe = function(i, t) {
  if (i === void 0)
    return {};
  let e;
  if (t === void 0 || t.length === 0)
    e = ge(i, G(this, ot));
  else {
    const n = ge(i, G(this, ot)), r = t.map((o) => `${o}=`);
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
    const { key: r, value: o } = jr(n);
    if (/^[-.\d]+\/[-.\d]+$/.exec(o)) {
      s[r] = {
        value: Et(o),
        options: []
      };
      return;
    }
    const [a, ...h] = o.split(G(this, Ct));
    s[r] = {
      value: Et(a),
      options: h.map((c) => Et(c))
    };
  }), s;
};
function Fr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof k && (r instanceof k || typeof r == "number"))
      return {
        create: "circle",
        config: { center: n, radius: r }
      };
  }
  return null;
}
function qr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.ARC.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof k && r instanceof k && o instanceof k)
      return {
        create: "arc",
        config: { start: n, center: r, end: o, radius: a }
      };
  }
  return null;
}
const ct = "line";
function nt(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.LINE.toString() || i.key === M.SEGMENT.toString() || i.key === M.VECTOR.toString() || i.key === M.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof k && r instanceof k) {
      let o = "line";
      switch (i.key) {
        case M.SEGMENT.toString():
          o = "segment";
          break;
        case M.VECTOR.toString():
          o = "vector";
          break;
        case M.RAY.toString():
          o = "ray";
          break;
      }
      return {
        create: ct,
        config: {
          through: { A: n, B: r },
          shape: o
        }
      };
    }
  }
  if (i.key === M.LINE.toString() && s.length === 1)
    return {
      create: ct,
      config: {
        equation: s[0]
      }
    };
  if (i.key === M.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof k && r instanceof k)
      return {
        create: ct,
        config: { mediator: { A: n, B: r } }
      };
  }
  if (i.key === M.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof q && r instanceof k)
      return {
        create: ct,
        config: { perpendicular: { to: n, through: r } }
      };
  }
  if (i.key === M.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof q && r instanceof k)
      return {
        create: ct,
        config: { parallel: { to: n, through: r } }
      };
  }
  if (i.key === M.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof q && r instanceof q)
      return {
        create: ct,
        config: { bisector: { d1: n, d2: r } }
      };
  }
  if (i.key === M.BISECTOR.toString() && s.length === 3) {
    const [n, r, o] = s;
    if (r instanceof k && n instanceof k && o instanceof k)
      return {
        create: ct,
        config: { bisector: { A: r, B: n, C: o } }
      };
  }
  return null;
}
function Rr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.PLOT.toString()) {
    const [n, ...r] = s, o = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((c) => Z(c));
    a.length > 0 && (o.domain = a[0]), a.length > 1 && (o.image = a[1]);
    const h = r.filter((c) => typeof c == "number");
    return h.length > 0 && (o.samples = h[0] > 0 ? h[0] : 10), {
      create: "plot",
      config: o
    };
  }
  return null;
}
function Br(i, t, e) {
  const s = P(i.values.slice(0, 3), t);
  return s.every((r) => r instanceof k) ? {
    create: "plot",
    config: { expression: null, quadratic: s }
  } : null;
}
function Gr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return {
        create: "parametric",
        config: { expressions: { x: n, y: r } }
      };
  }
  return null;
}
function Xr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof St)
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
function Hr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.FILL_BETWEEN.toString() && s.length >= 2) {
    const n = s[0], r = s[1] instanceof St ? s[1] : null, o = Z(s[1]) ? s[1] : s[2], a = Z(s[1]) ? s[2] : s[3];
    if (n instanceof St)
      return {
        create: "fillbetween",
        config: {
          expressions: r instanceof St ? [n, r] : [n],
          domain: Z(o) ? o : { min: NaN, max: NaN },
          image: Z(a) ? a : { min: NaN, max: NaN }
        }
      };
  }
  return null;
}
function Ur(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.RIEMANN.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    return {
      create: "riemann",
      config: {
        follow: n,
        domain: Z(r) ? r : { min: NaN, max: NaN },
        rectangles: typeof o == "number" ? o : 5,
        position: typeof a == "number" ? a : 0
      }
    };
  }
  return null;
}
const Yr = "point";
function lt(i, t, e) {
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
  const o = Wr(i, t);
  return o ? {
    create: Yr,
    config: Object.assign(o, { shape: s, size: n })
  } : null;
}
function Wr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.POINT.toString()) {
    const [n, r] = s;
    try {
      return {
        coordinates: {
          x: me(n, t),
          y: me(r, t)
        }
      };
    } catch {
      return null;
    }
  }
  if (i.key === M.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof k && r instanceof k)
      return { middle: { A: n, B: r } };
  }
  if (i.key === M.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof k && (r instanceof q || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === M.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof k && (r instanceof k || r instanceof q || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === M.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof k && (r instanceof q || r === "Ox" || r === "Oy") && typeof o == "number")
      return {
        direction: {
          direction: r,
          distance: o,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === M.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    if (n instanceof k && r instanceof k)
      return {
        direction: {
          point: a instanceof k ? a : n,
          direction: { A: n, B: r },
          distance: typeof o == "number" ? o : 1
        }
      };
  }
  if (i.key === M.EVAL_FX.toString() && s.length >= 2) {
    const [n, r] = s;
    if (!(n instanceof St))
      return null;
    try {
      const o = me(r, t);
      return {
        evaluation: {
          fx: n,
          x: o
        }
      };
    } catch {
      return null;
    }
  }
  return null;
}
function me(i, t) {
  if (typeof i == "string") {
    const [e, s] = i.split("."), n = t[e], r = s === "x" || s === "y" ? s : null;
    if (n === null || r === null)
      throw new Error("Point or axis unrecognized");
    return { point: n, axis: r };
  } else
    return i;
}
const ci = "polygon";
function li(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof k))
      return {
        create: ci,
        config: { vertices: n }
      };
  }
  if (i.key === M.REGULAR.toString() && s.length >= 3) {
    const [n, r, o] = s;
    if (n instanceof k && (typeof r == "number" || r instanceof k) && typeof o == "number")
      return {
        create: ci,
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
function Kr(i, t, e) {
  return {
    create: "bezier",
    config: { points: i.values.map((n) => {
      if (typeof n == "string") {
        const [r, o, a] = n.split("/");
        if (!(r in t))
          return null;
        const h = t[r];
        let c;
        switch (o) {
          case "H":
            c = Q.HORIZONTAL;
            break;
          case "V":
            c = Q.VERTICAL;
            break;
          default:
            c = Q.SMOOTH;
        }
        return {
          point: h,
          controls: {
            type: c,
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
const Qr = "point";
function Zr(i, t, e) {
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
  const o = Jr(i, t);
  return o ? o.map((a) => ({
    create: Qr,
    config: Object.assign(a, { shape: s, size: n })
  })) : null;
}
function Jr(i, t, e) {
  const s = P(i.values, t);
  if (i.key === M.INTERSECTION.toString() && s.length >= 2) {
    const n = s[0], r = s[1];
    if ((n instanceof q || n === "Ox" || n === "Oy") && (r instanceof q || r === "Ox" || r === "Oy"))
      return [
        {
          intersection: { A: n, B: r }
        }
      ];
    if (n instanceof Wt && r instanceof q)
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
    if (n instanceof Wt && r instanceof Wt)
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
const ui = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: lt
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: lt
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: lt
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: lt
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: lt
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line|circle>,<line|circle>",
    parameters: [],
    build: Zr
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: lt
  },
  eval: {
    name: "evaluate function",
    description: "Evaluate a funciton at a value",
    code: "A=eval f,3",
    parameters: [],
    build: lt
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: nt
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: nt
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: nt
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: nt
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: nt
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: nt
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: nt
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
    build: nt
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Fr
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: qr
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: Rr
  },
  quad: {
    name: "quad",
    description: "quadrativ plot through three points",
    code: "f=quad A,B,C[@<number>,<domain>,<image>]",
    parameters: [],
    build: Br
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: Gr
  },
  bezier: {
    name: "bezier",
    description: "bezier curve through points",
    code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
    parameters: [],
    build: Kr
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: li
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: li
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: Xr
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: Hr
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: Ur
  }
}, fi = [
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
class oo extends Pr {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    f(this, "_parser");
    f(this, "_settings");
    f(this, "_code");
    return this._parser = new Vr({
      formatter: (n) => this._parseKeyCode(n),
      keys: fi,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    }), this._settings = {}, s != null && s.parameters && this.refreshLayout(s.parameters), this._code = [], s != null && s.code && this._build(s.code), this;
  }
  get code() {
    return this._code;
  }
  static documentation() {
    return ui;
  }
  /**
   * Refresh the code to display
   * @param code Code to parse and display
   */
  refresh(e) {
    this.clear(), this._build(e);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(e) {
    const s = this._parseLayout(e);
    this.config = s.config, this.display = s.display, this._settings = s.settings, this.updateLayout();
  }
  _applyDrag(e, s, n) {
    if (e instanceof k) {
      const r = [], o = [], a = this.create.point({ x: 0, y: 0 }, e.name + "_drag");
      a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[s].value, ...n[s].options].forEach((c) => {
        if (["grid", "Ox", "Oy"].includes(c) && r.push(this.follow(c, e)), Z(c)) {
          const l = c.axis ?? "x", u = this.toPixels(c, l);
          r.push(
            (p, d) => ({
              x: l === "x" ? Math.max(u.min, Math.min(p, u.max)) : p,
              y: l === "y" ? Math.max(u.min, Math.min(d, u.max)) : d
            })
          );
        }
        if (Object.hasOwn(this.figures, c)) {
          const l = this.figures[c];
          o.push((u, p) => l.follow(u, p));
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
  }
  _applyOptions(e, s) {
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
        case "_":
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
            const a = e[n].options[0] === !1 || e[n].options[0] === !0 ? "br" : e[n].options[0], h = e[n].options[1] ?? { x: 0, y: 0 }, c = {
              x: h.x * this.config.axis.x.x,
              y: -h.y * this.config.axis.y.y
            }, l = e[n].options[2];
            s.label.auto_rotate = l === !0, s.label.position(
              a,
              c,
              typeof l == "number" ? l : 0
            );
          }
          break;
        }
        // Draggable
        case "drag":
          this._applyDrag(s, n, e);
          break;
        // Animation
        case "animate": {
          const o = {
            from: null,
            to: null,
            duration: 2,
            delay: 0,
            easing: "linear",
            loop: We.NONE
          };
          if (Object.hasOwn(e, "from")) {
            const a = e.from.value;
            Object.hasOwn(this.figures, a) && this.figures[a] instanceof k && (o.from = this.figures[a]);
          }
          if (Object.hasOwn(e, "to")) {
            const a = e.to.value;
            Object.hasOwn(this.figures, a) && this.figures[a] instanceof k && (o.to = this.figures[a]);
          }
          Object.hasOwn(e, "duration") && (o.duration = e.duration.value), Object.hasOwn(e, "delay") && (o.delay = e.delay.value), Object.hasOwn(e, "easing") && (o.easing = e.easing.value), Object.hasOwn(e, "loop") && (o.loop = Dr(e.loop.value)), s.animate = o;
          break;
        }
        default:
          wr.includes(n) && s.stroke(n);
      }
    });
  }
  /**
   * Build the figures from the code
   */
  _build(e) {
    this._code = this._prepare(e);
    const s = ui;
    this._code.forEach((n) => {
      n.name = this._uniqueName(n.name);
      let r;
      if (Object.hasOwn(s, n.key)) {
        const { build: o, parameters: a } = s[n.key];
        a && a.length > 0 && Object.keys(n.parameters).length === 0 && Object.keys(n.parameters).filter((l) => a.includes(l)).forEach((l) => {
          n.parameters[l] = { value: !0, options: [] };
        });
        let h = o(n, this.figures, this.config);
        h && (Array.isArray(h) || (h = [h]), h.forEach((c, l) => {
          try {
            const { config: u, create: p } = c;
            u && p && (r = this.create[p](u, n.name + (h.length > 1 ? `${l + 1}` : "")));
          } catch (u) {
            console.error(u);
          }
          r && this._buildOptions(r, n);
        }));
      }
    }), this.updateLabels([]);
  }
  _buildOptions(e, s) {
    this._settings.label && e instanceof k && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.label = { value: !0, options: [] }), this._settings.tex && e instanceof k && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.tex = { value: !0, options: [] }), e instanceof k && this._settings.points === !1 && (s.parameters["!"] = { value: !0, options: [] }), this._applyOptions(s.parameters, e);
  }
  _defineCommand(e) {
    const [s, n] = e.slice(1).split(":");
    return { key: n, value: s === "begin" };
  }
  _parseKeyCode(e) {
    return /^[A-Z][0-9]*\(.*\)$/.exec(e) ? this._parseKeyCodePoint(e) : /^[a-z][0-9]*\([x|t]\)/.exec(e) ? this._parseKeyCodePlot(e) : e.includes("=") && !e.includes(" ") ? this._parseKeyCodeLine(e) : e;
  }
  // TO BE MOVED TO BUILD_LINE
  _parseKeyCodeLine(e) {
    const [s, ...n] = e.split("=");
    let r = n.join("="), o = r[0];
    o !== "v" && o !== "[" && (o = null);
    let a = r[r.length - 1];
    a !== "." && a !== "]" && a !== "[" && (a = null);
    let h = "line";
    o === "v" && a === null ? (r = r.slice(1), h = "vec") : o === null && a === "." || o === "[" && a === "]" ? (o === "[" && (r = r.slice(1)), r = r.slice(0, -1), h = "seg") : (o === "[" && a === "[" || o === null && a === "[" || o === "[" && a === null) && (o === "[" && (r = r.slice(1)), a === "[" && (r = r.slice(0, -1)), h = "ray");
    const c = r.split(/(?=[A-Z])/);
    return `${s}=${h} ${c[0]},${c[1]}`;
  }
  // TO BE MOVED TO BUILD_PLOT
  _parseKeyCodePlot(e) {
    const [s, n] = e.split("="), r = s.split("(")[0], o = e.includes("(x)=") ? M.PLOT : M.PARAMETRIC;
    return `${r}=${o} ${n}`;
  }
  // TO BE MOVED TO BUILD_POINT
  _parseKeyCodePoint(e) {
    const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
    return `${s}=pt ${n[0]},${n[1]}`;
  }
  _parseLayout(e) {
    const s = this._parser.parameters(e ?? "", fi), n = s.x && Z(s.x.value) ? s.x.value : { min: -8, max: 8 }, r = s.y && Z(s.y.value) ? s.y.value : { min: -8, max: 8 }, o = Math.abs(n.max - n.min), a = Math.abs(r.max - r.min), h = this.rootSVG.node.getBoundingClientRect();
    let c = Math.max(Math.round(h.width / o), 20);
    Object.hasOwn(s, "ppu") && !isNaN(+s.ppu.value) && (c = parseFloat(s.ppu.value));
    const l = s.unitX ? parseFloat(s.unitX.value) : 1, u = s.unitY ? parseFloat(s.unitY.value) : 1, p = o * c, d = a * c, y = {
      x: -n.min * c,
      y: r.max * c
    }, m = Ft.CARTESIAN_2D, v = {
      x: { x: c * l, y: 0 },
      y: { x: 0, y: -c * u }
    };
    let w = Object.hasOwn(s, "grid") ? s.grid.value : !1;
    if (typeof w == "string" && w.includes("pi")) {
      const Y = w === "pi" ? 1 : +w.split("pi")[0], F = s.grid.options.length && Number.isSafeInteger(+s.grid.options[0]) ? s.grid.options[0] : 2;
      w = { x: Y * Math.PI / F, y: 1 };
    }
    const L = !!s.axis, z = s.subgrid ? parseFloat(s.subgrid.value) : 0, U = {
      label: !!s.label,
      tex: !!s.tex,
      points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
    };
    return {
      config: {
        width: p,
        height: d,
        origin: y,
        system: m,
        axis: v
      },
      display: {
        grid: w,
        subgrid: z,
        axis: L
      },
      settings: U
    };
  }
  /**
   * Prepare the code to load
   * @param input Input code to parse and prepare
   * @returns
   */
  _prepare(e) {
    const s = [], n = e.split(`
`).map((o) => o.trim()).filter((o) => o.trim() !== "" && !o.startsWith("$")), r = {};
    for (const o of n) {
      if (o.startsWith("@")) {
        const { key: h, value: c } = this._defineCommand(o);
        r[h] = { value: c, options: [] };
        continue;
      }
      const a = this._parser.parse(o);
      a.parameters = Object.assign(
        a.parameters,
        r
      ), s.push(a);
    }
    return s;
  }
  _uniqueName(e) {
    let s = e, n = 1;
    for (; this.figures[s]; )
      s = `${e}_${n}`, n++;
    return s;
  }
}
export {
  ur as AXIS,
  Q as BEZIERCONTROL,
  Ft as COORDINATE_SYSTEM,
  Xi as LAYER_NAME,
  pr as LINECONSTRAINT,
  fr as POINTCONSTRAINT,
  dr as POLYGON_CONSTRAINT,
  oo as PiDraw,
  Pr as PiGraph,
  Z as isDOMAIN,
  K as isXY
};
//# sourceMappingURL=pidraw.js.map
