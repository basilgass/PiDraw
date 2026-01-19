const _e = {}, pi = [];
function m(i, t) {
  if (Array.isArray(i)) {
    for (const e of i)
      m(e, t);
    return;
  }
  if (typeof i == "object") {
    for (const e in i)
      m(e, i[e]);
    return;
  }
  di(Object.getOwnPropertyNames(t)), _e[i] = Object.assign(_e[i] || {}, t);
}
function q(i) {
  return _e[i] || {};
}
function Ki() {
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
function Qi(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function ae(i) {
  return i % 360 * Math.PI / 180;
}
function Zi(i) {
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
const Ji = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), xe = (i) => Ji.has(i.nodeName), mi = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, Ie = "http://www.w3.org/2000/svg", ts = "http://www.w3.org/1999/xhtml", he = "http://www.w3.org/2000/xmlns/", qt = "http://www.w3.org/1999/xlink", w = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function es() {
  return w.window;
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
const dt = {}, Le = "___SYMBOL___ROOT___";
function zt(i, t = Ie) {
  return w.document.createElementNS(t, i);
}
function j(i, t = !1) {
  if (i instanceof Ee) return i;
  if (typeof i == "object")
    return ce(i);
  if (i == null)
    return new dt[Le]();
  if (typeof i == "string" && i.trim().charAt(0) !== "<")
    return ce(w.document.querySelector(i));
  const e = t ? w.document.createElement("div") : zt("svg");
  return e.innerHTML = i.trim(), i = ce(e.firstElementChild), e.removeChild(e.firstElementChild), i;
}
function O(i, t) {
  return t && (t instanceof w.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : zt(i);
}
function U(i) {
  if (!i) return null;
  if (i.instance instanceof Ee) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new dt.Fragment(i);
  let t = gi(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : dt[t] || (t = "Dom"), new dt[t](i);
}
let ce = U;
function k(i, t = i.name, e = !1) {
  return dt[t] = i, e && (dt[Le] = i), di(Object.getOwnPropertyNames(i.prototype)), i;
}
function is(i) {
  return dt[i];
}
let ss = 1e3;
function _i(i) {
  return "Svgjs" + gi(i) + ss++;
}
function yi(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    yi(i.children[t]);
  return i.id && (i.id = _i(i.nodeName)), i;
}
function y(i, t) {
  let e, s;
  for (i = Array.isArray(i) ? i : [i], s = i.length - 1; s >= 0; s--)
    for (e in t)
      i[s].prototype[e] = t[e];
}
function A(i) {
  return function(...t) {
    const e = t[t.length - 1];
    return e && e.constructor === Object && !(e instanceof Array) ? i.apply(this, t.slice(0, -1)).attr(e) : i.apply(this, t);
  };
}
function ns() {
  return this.parent().children();
}
function rs() {
  return this.parent().index(this);
}
function os() {
  return this.siblings()[this.position() + 1];
}
function as() {
  return this.siblings()[this.position() - 1];
}
function hs() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function cs() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function ls() {
  return this.parent().add(this.remove()), this;
}
function us() {
  return this.parent().add(this.remove(), 0), this;
}
function fs(i) {
  i = j(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function ps(i) {
  i = j(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function ds(i) {
  return i = j(i), i.before(this), this;
}
function gs(i) {
  return i = j(i), i.after(this), this;
}
m("Dom", {
  siblings: ns,
  position: rs,
  next: os,
  prev: as,
  forward: hs,
  backward: cs,
  front: ls,
  back: us,
  before: fs,
  after: ps,
  insertBefore: ds,
  insertAfter: gs
});
const xi = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, ms = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, _s = /rgb\((\d+),(\d+),(\d+)\)/, ys = /(#[a-z_][a-z0-9\-_]*)/i, xs = /\)\s*,?\s*/, bs = /\s/g, Qe = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Ze = /^rgb\(/, Je = /^(\s+)?$/, ti = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ws = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, et = /[\s,]+/, $e = /[MLHVCSQTAZ]/i;
function ks() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(et);
}
function vs(i) {
  return this.classes().indexOf(i) !== -1;
}
function Cs(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function Ss(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function Ms(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
m("Dom", {
  classes: ks,
  hasClass: vs,
  addClass: Cs,
  removeClass: Ss,
  toggleClass: Ms
});
function Ts(i, t) {
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
function As() {
  return this.css("display", "");
}
function Os() {
  return this.css("display", "none");
}
function Ns() {
  return this.css("display") !== "none";
}
m("Dom", {
  css: Ts,
  show: As,
  hide: Os,
  visible: Ns
});
function Is(i, t, e) {
  if (i == null)
    return this.data(
      Ne(
        Qi(
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
m("Dom", { data: Is });
function Es(i, t) {
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
function Ls() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function $s() {
  return this._memory = this._memory || {};
}
m("Dom", { remember: Es, forget: Ls, memory: $s });
function zs(i) {
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
function Ds(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function _t(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function Ps(i, t) {
  const e = _t(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : _t(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : _t(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : _t(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : _t(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : _t(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function js(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function le(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
class M {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof M || this.isRgb(t) || this.test(t));
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
      return new M(a, h, c, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * o * e / 0.5 + 0.01) + 150), h = n(50 * r(2 * o * e / 0.5 + 4.6) + 200), c = n(100 * r(2 * o * e / 0.5 + 2.3) + 150);
      return new M(a, h, c);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, h = 17 * s() + 9, c = 360 * s();
      return new M(a, h, c, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), h = 50 * s() + 86, c = 360 * s();
      return new M(a, h, c, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), h = 255 * s(), c = 255 * s();
      return new M(a, h, c);
    } else if (t === "lab") {
      const a = 100 * s(), h = 256 * s() - 128, c = 256 * s() - 128;
      return new M(a, h, c, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new M(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (Qe.test(t) || Ze.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((f) => f / 255), a = Math.min(1 - n, 1 - r, 1 - o);
    if (a === 1)
      return new M(0, 0, 0, 1, "cmyk");
    const h = (1 - n - a) / (1 - a), c = (1 - r - a) / (1 - a), l = (1 - o - a) / (1 - a);
    return new M(h, c, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((v) => v / 255), a = Math.max(n, r, o), h = Math.min(n, r, o), c = (a + h) / 2, l = a === h, u = a - h, f = l ? 0 : c > 0.5 ? u / (2 - a - h) : u / (a + h), x = l ? 0 : a === n ? ((r - o) / u + (r < o ? 6 : 0)) / 6 : a === r ? ((o - n) / u + 2) / 6 : a === o ? ((n - r) / u + 4) / 6 : 0;
    return new M(360 * x, 100 * f, 100 * c, "hsl");
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
      const u = Ps(t, e);
      Object.assign(this, u);
    } else if (typeof t == "string")
      if (Ze.test(t)) {
        const u = t.replace(bs, ""), [f, x, _] = _s.exec(u).slice(1, 4).map((v) => parseInt(v));
        Object.assign(this, { _a: f, _b: x, _c: _, _d: 0, space: "rgb" });
      } else if (Qe.test(t)) {
        const u = (v) => parseInt(v, 16), [, f, x, _] = ms.exec(zs(t)).map(u);
        Object.assign(this, { _a: f, _b: x, _c: _, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: o, _b: a, _c: h, _d: c } = this, l = this.space === "rgb" ? { r: o, g: a, b: h } : this.space === "xyz" ? { x: o, y: a, z: h } : this.space === "hsl" ? { h: o, s: a, l: h } : this.space === "lab" ? { l: o, a, b: h } : this.space === "lch" ? { l: o, c: a, h } : this.space === "cmyk" ? { c: o, m: a, y: h, k: c } : {};
    Object.assign(this, l);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), o = 200 * (e - s);
    return new M(n, r, o, "lab");
  }
  lch() {
    const { l: t, a: e, b: s } = this.lab(), n = Math.sqrt(e ** 2 + s ** 2);
    let r = 180 * Math.atan2(s, e) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new M(t, n, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (js(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: x, a: _, b: v } = this;
        if (this.space === "lch") {
          const { c: at, h: Ut } = this, Yt = Math.PI / 180;
          _ = at * Math.cos(Yt * Ut), v = at * Math.sin(Yt * Ut);
        }
        const g = (x + 16) / 116, T = _ / 500 + g, L = g - v / 200, D = 16 / 116, H = 8856e-6, P = 7.787;
        t = 0.95047 * (T ** 3 > H ? T ** 3 : (T - D) / P), e = 1 * (g ** 3 > H ? g ** 3 : (g - D) / P), s = 1.08883 * (L ** 3 > H ? L ** 3 : (L - D) / P);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, o = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, h = 31308e-7, c = n > h ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > h ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, u = o > h ? 1.055 * a(o, 1 / 2.4) - 0.055 : 12.92 * o;
      return new M(255 * c, 255 * l, 255 * u);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new M(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, o = 255 * le(r, n, t + 1 / 3), a = 255 * le(r, n, t), h = 255 * le(r, n, t - 1 / 3);
      return new M(o, a, h);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), o = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new M(r, o, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(Ds);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, o] = [t, e, s].map((T) => T / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, h = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, c = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, l = (a * 0.4124 + h * 0.3576 + c * 0.1805) / 0.95047, u = (a * 0.2126 + h * 0.7152 + c * 0.0722) / 1, f = (a * 0.0193 + h * 0.1192 + c * 0.9505) / 1.08883, x = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, _ = u > 8856e-6 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116, v = f > 8856e-6 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116;
    return new M(x, _, v, "xyz");
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
let E = class bi {
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
    p.isMatrixLike(t) || (t = new p(t));
    const { x: e, y: s } = this;
    return this.x = t.a * e + t.c * s + t.e, this.y = t.b * e + t.d * s + t.f, this;
  }
};
function Fs(i, t) {
  return new E(i, t).transformO(this.screenCTM().inverseO());
}
function yt(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class p {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, o = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, h = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, c = t.shear || 0, l = t.rotate || t.theta || 0, u = new E(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), f = u.x, x = u.y, _ = new E(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), v = _.x, g = _.y, T = new E(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), L = T.x, D = T.y, H = new E(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), P = H.x, at = H.y;
    return {
      scaleX: a,
      scaleY: h,
      skewX: r,
      skewY: o,
      shear: c,
      theta: l,
      rx: P,
      ry: at,
      tx: L,
      ty: D,
      ox: f,
      oy: x,
      px: v,
      py: g
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
    return new p(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(t = 0, e = 0) {
    const s = this.a, n = this.b, r = this.c, o = this.d, a = this.e, h = this.f, c = s * o - n * r, l = c > 0 ? 1 : -1, u = l * Math.sqrt(s * s + n * n), f = Math.atan2(l * n, l * s), x = 180 / Math.PI * f, _ = Math.cos(f), v = Math.sin(f), g = (s * r + n * o) / c, T = r * u / (g * s - n) || o * u / (g * n + s), L = a - t + t * _ * u + e * (g * _ * u - v * T), D = h - e + t * v * u + e * (g * v * u + _ * T);
    return {
      // Return the affine parameters
      scaleX: u,
      scaleY: T,
      shear: g,
      rotate: x,
      translateX: L,
      translateY: D,
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
    const e = new p(t);
    return yt(this.a, e.a) && yt(this.b, e.b) && yt(this.c, e.c) && yt(this.d, e.d) && yt(this.e, e.e) && yt(this.f, e.f);
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
    const e = p.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof Z ? t.matrixify() : typeof t == "string" ? p.fromArray(t.split(et).map(parseFloat)) : Array.isArray(t) ? p.fromArray(t) : typeof t == "object" && p.isMatrixLike(t) ? t : typeof t == "object" ? new p().transform(t) : arguments.length === 6 ? p.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, o = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const h = n / a, c = -e / a, l = -s / a, u = t / a, f = -(h * r + l * o), x = -(c * r + u * o);
    return this.a = h, this.b = c, this.c = l, this.d = u, this.e = f, this.f = x, this;
  }
  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }
  lmultiplyO(t) {
    const e = this, s = t instanceof p ? t : new p(t);
    return p.matrixMultiply(s, e, this);
  }
  // Left multiplies by the given matrix
  multiply(t) {
    return this.clone().multiplyO(t);
  }
  multiplyO(t) {
    const e = this, s = t instanceof p ? t : new p(t);
    return p.matrixMultiply(e, s, this);
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
    const r = Math.tan(t), o = Math.tan(e), { a, b: h, c, d: l, e: u, f } = this;
    return this.a = a + h * r, this.b = h + a * o, this.c = c + l * r, this.d = l + c * o, this.e = u + f * r - n * r, this.f = f + u * o - s * o, this;
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
    if (p.isMatrixLike(t))
      return new p(t).multiplyO(this);
    const e = p.formatTransforms(t), s = this, { x: n, y: r } = new E(e.ox, e.oy).transform(s), o = new p().translateO(e.rx, e.ry).lmultiplyO(s).translateO(-n, -r).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n, r);
    if (isFinite(e.px) || isFinite(e.py)) {
      const a = new E(n, r).transform(o), h = isFinite(e.px) ? e.px - a.x : 0, c = isFinite(e.py) ? e.py - a.y : 0;
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
function Vs() {
  return new p(this.node.getCTM());
}
function qs() {
  try {
    if (typeof this.isRoot == "function" && !this.isRoot()) {
      const i = this.rect(1, 1), t = i.node.getScreenCTM();
      return i.remove(), new p(t);
    }
    return new p(this.node.getScreenCTM());
  } catch {
    return console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    ), new p();
  }
}
k(p, "Matrix");
function st() {
  if (!st.nodes) {
    const i = j().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    st.nodes = { svg: i, path: t };
  }
  if (!st.nodes.svg.node.parentNode) {
    const i = w.document.body || w.document.documentElement;
    st.nodes.svg.addTo(i);
  }
  return st.nodes;
}
function wi(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function Rs(i) {
  return i === w.document || (w.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === w.document;
  }).call(w.document.documentElement, i);
}
class $ {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += w.window.pageXOffset, this.y += w.window.pageYOffset, new $(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(et).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
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
    return new $(e, s, n, r);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(t) {
    t instanceof p || (t = new p(t));
    let e = 1 / 0, s = -1 / 0, n = 1 / 0, r = -1 / 0;
    return [
      new E(this.x, this.y),
      new E(this.x2, this.y),
      new E(this.x, this.y2),
      new E(this.x2, this.y2)
    ].forEach(function(a) {
      a = a.transform(t), e = Math.min(e, a.x), s = Math.max(s, a.x), n = Math.min(n, a.y), r = Math.max(r, a.y);
    }), new $(e, n, s - e, r - n);
  }
}
function ki(i, t, e) {
  let s;
  try {
    if (s = t(i.node), wi(s) && !Rs(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function Bs() {
  const e = ki(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(st().svg).show(), o = r.node.getBBox();
      return r.remove(), o;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new $(e);
}
function Gs(i) {
  const s = ki(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new $(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function Xs(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
m({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new $(this.attr("viewBox")) : this.attr("viewBox", new $(i, t, e, s));
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
      h === 1 / 0 && (h = Number.MAX_SAFE_INTEGER / 100), t = t || new E(e / 2 / r + n.x, s / 2 / o + n.y);
      const c = new $(n).transform(
        new p({ scale: h, origin: t })
      );
      return this.viewbox(c);
    }
  }
});
k($, "Box");
class gt extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
y([gt], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Hs = ["toArray", "constructor", "each"];
gt.extend = function(i) {
  i = i.reduce((t, e) => (Hs.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), y([gt], i);
};
function At(i, t) {
  return new gt(
    Ne((t || w.document).querySelectorAll(i), function(e) {
      return U(e);
    })
  );
}
function Us(i) {
  return At(i, this.node);
}
function Ys(i) {
  return U(this.node.querySelector(i));
}
let Ws = 0;
const vi = {};
function Ci(i) {
  let t = i.getEventHolder();
  return t === w.window && (t = vi), t.events || (t.events = {}), t.events;
}
function ze(i) {
  return i.getEventTarget();
}
function Ks(i) {
  let t = i.getEventHolder();
  t === w.window && (t = vi), t.events && (t.events = {});
}
function Dt(i, t, e, s, n) {
  const r = e.bind(s || i), o = j(i), a = Ci(o), h = ze(o);
  t = Array.isArray(t) ? t : t.split(et), e._svgjsListenerId || (e._svgjsListenerId = ++Ws), t.forEach(function(c) {
    const l = c.split(".")[0], u = c.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][u] = a[l][u] || {}, a[l][u][e._svgjsListenerId] = r, h.addEventListener(l, r, n || !1);
  });
}
function tt(i, t, e, s) {
  const n = j(i), r = Ci(n), o = ze(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(et), t.forEach(function(a) {
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
          tt(o, [h, c].join("."), u);
        delete r[h][c];
      }
    } else if (c)
      for (a in r)
        for (l in r[a])
          c === l && tt(o, [a, c].join("."));
    else if (h) {
      if (r[h]) {
        for (l in r[h])
          tt(o, [h, l].join("."));
        delete r[h];
      }
    } else {
      for (a in r)
        tt(o, a);
      Ks(n);
    }
  }));
}
function Qs(i, t, e, s) {
  const n = ze(i);
  return t instanceof w.window.Event || (t = new w.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class Rt extends Ee {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return Qs(this, t, e, s);
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
    return tt(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Dt(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
k(Rt, "EventTarget");
function ei() {
}
const It = {
  duration: 400,
  ease: ">",
  delay: 0
}, Zs = {
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
class St extends Array {
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
    return t instanceof Array ? t : t.trim().split(et).map(parseFloat);
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
class d {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  convert(t) {
    return new d(this.value, t);
  }
  // Divide number
  divide(t) {
    return t = new d(t), new d(this / t, this.unit || t.unit);
  }
  init(t, e) {
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(xi), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof d && (this.value = t.valueOf(), this.unit = t.unit), this;
  }
  // Subtract number
  minus(t) {
    return t = new d(t), new d(this - t, this.unit || t.unit);
  }
  // Add number
  plus(t) {
    return t = new d(t), new d(this + t, this.unit || t.unit);
  }
  // Multiply number
  times(t) {
    return t = new d(t), new d(this * t, this.unit || t.unit);
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
const Js = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Si = [];
function tn(i) {
  Si.push(i);
}
function en(i, t, e) {
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
        return t = this.node.getAttribute(i), t == null ? Zs[i] : ti.test(t) ? parseFloat(t) : t;
      t = Si.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new d(t) : Js.has(i) && M.isColor(t) ? t = new M(t) : t.constructor === Array && (t = new St(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class rt extends Rt {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = j(t), t.removeNamespace && this.node instanceof w.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return j(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new gt(
      Ne(this.node.children, function(t) {
        return U(t);
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
    return this.put(new rt(zt(t), e));
  }
  // Get first child
  first() {
    return U(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return U(this.node.childNodes[t]);
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
    return this.xml(t, e, ts);
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
    return U(this.node.lastChild);
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
    if (e = U(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = U(e.node.parentNode));
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
        if (a = U(a.node.cloneNode(!0)), e) {
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
    const n = zt("wrapper", s), r = w.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const o = this.parent();
    return e ? this.replace(r) && o : this.add(r);
  }
}
y(rt, { attr: en, find: Us, findOne: Ys });
k(rt, "Dom");
class Z extends rt {
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
    return this.x(new d(t).plus(this.x()));
  }
  // Relative move over y axis
  dy(t = 0) {
    return this.y(new d(t).plus(this.y()));
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
    const s = new gt();
    let n = this;
    for (; (n = n.parent()) && n.node !== w.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(ys);
    return e ? j(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(is(Le));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Tt(this, t, e);
    return this.width(new d(s.width)).height(new d(s.height));
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
y(Z, {
  bbox: Bs,
  rbox: Gs,
  inside: Xs,
  point: Fs,
  ctm: Vs,
  screenCTM: qs
});
k(Z, "Element");
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
    if (typeof s == "string" || s instanceof M || M.isRgb(s) || s instanceof Z)
      this.attr(i, s);
    else
      for (e = Nt[i].length - 1; e >= 0; e--)
        s[Nt[i][e]] != null && this.attr(Nt.prefix(i, Nt[i][e]), s[Nt[i][e]]);
    return this;
  }, m(["Element", "Runner"], t);
});
m(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(i, t, e, s, n, r) {
    return i == null ? new p(this) : this.attr("transform", new p(i, t, e, s, n, r));
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
m("radius", {
  // Add x and y radius
  radius: function(i, t = i) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new d(i)) : this.rx(i).ry(t);
  }
});
m("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(i) {
    return new E(this.node.getPointAtLength(i));
  }
});
m(["Element", "Runner"], {
  // Set font
  font: function(i, t) {
    if (typeof i == "object") {
      for (t in i) this.font(t, i[t]);
      return this;
    }
    return i === "leading" ? this.leading(t) : i === "anchor" ? this.attr("text-anchor", t) : i === "size" || i === "family" || i === "weight" || i === "stretch" || i === "variant" || i === "style" ? this.attr("font-" + i, t) : this.attr(i, t);
  }
});
const sn = [
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
m("Element", sn);
function nn() {
  return this.attr("transform", null);
}
function rn() {
  return (this.attr("transform") || "").split(xs).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(et).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(p.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new p());
}
function on(i, t) {
  if (this === i) return this;
  if (xe(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function an(i) {
  return this.toParent(this.root(), i);
}
function hn(i, t) {
  if (i == null || typeof i == "string") {
    const n = new p(this).decompose();
    return i == null ? n : n[i];
  }
  p.isMatrixLike(i) || (i = { ...i, origin: ye(i, this) });
  const e = t === !0 ? this : t || !1, s = new p(e).transform(i);
  return this.attr("transform", s);
}
m("Element", {
  untransform: nn,
  matrixify: rn,
  toParent: on,
  toRoot: an,
  transform: hn
});
class R extends Z {
  flatten() {
    return this.each(function() {
      if (this instanceof R)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
k(R, "Container");
class De extends R {
  constructor(t, e = t) {
    super(O("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
k(De, "Defs");
class X extends Z {
}
k(X, "Shape");
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
  return i == null ? this.rx() * 2 : this.rx(new d(i).divide(2));
}
function Ii(i) {
  return i == null ? this.ry() * 2 : this.ry(new d(i).divide(2));
}
const cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
class ee extends X {
  constructor(t, e = t) {
    super(O("ellipse", t), e);
  }
  size(t, e) {
    const s = Tt(this, t, e);
    return this.rx(new d(s.width).divide(2)).ry(
      new d(s.height).divide(2)
    );
  }
}
y(ee, cn);
m("Container", {
  // Create an ellipse
  ellipse: A(function(i = 0, t = i) {
    return this.put(new ee()).size(i, t).move(0, 0);
  })
});
k(ee, "Ellipse");
class Ei extends rt {
  constructor(t = w.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new rt(zt("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
k(Ei, "Fragment");
function Li(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new d(i), fy: new d(t) }) : this.attr({ x1: new d(i), y1: new d(t) });
}
function $i(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new d(i), cy: new d(t) }) : this.attr({ x2: new d(i), y2: new d(t) });
}
const ln = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: Li,
  to: $i
}, Symbol.toStringTag, { value: "Module" }));
class Bt extends R {
  constructor(t, e) {
    super(
      O(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new $();
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
y(Bt, ln);
m({
  Container: {
    // Create gradient element in defs
    gradient(...i) {
      return this.defs().gradient(...i);
    }
  },
  // define gradient
  Defs: {
    gradient: A(function(i, t) {
      return this.put(new Bt(i)).update(t);
    })
  }
});
k(Bt, "Gradient");
class Pt extends R {
  // Initialize node
  constructor(t, e = t) {
    super(O("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new $();
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
m({
  Container: {
    // Create pattern element in defs
    pattern(...i) {
      return this.defs().pattern(...i);
    }
  },
  Defs: {
    pattern: A(function(i, t, e) {
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
k(Pt, "Pattern");
class ie extends X {
  constructor(t, e = t) {
    super(O("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new w.window.Image();
    return Dt(
      s,
      "load",
      function(n) {
        const r = this.parent(Pt);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Pt && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Dt(s, "load error", function() {
      tt(s);
    }), this.attr("href", s.src = t, qt);
  }
}
tn(function(i, t, e) {
  return (i === "fill" || i === "stroke") && ws.test(t) && (t = e.root().defs().image(t)), t instanceof ie && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
m({
  Container: {
    // create image element, load image and set its size
    image: A(function(i, t) {
      return this.put(new ie()).size(0, 0).load(i, t);
    })
  }
});
k(ie, "Image");
class ot extends St {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new $(s, n, t - s, e - n);
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(et).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
    p.isMatrixLike(t) || (t = new p(t));
    for (let e = this.length; e--; ) {
      const [s, n] = this[e];
      this[e][0] = t.a * s + t.c * n + t.e, this[e][1] = t.b * s + t.d * n + t.f;
    }
    return this;
  }
}
const un = ot;
function fn(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function pn(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function dn(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function gn(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: un,
  height: gn,
  width: dn,
  x: fn,
  y: pn
}, Symbol.toStringTag, { value: "Module" }));
let jt = class extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("line", t), e);
  }
  // Get array
  array() {
    return new ot([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new ot(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Tt(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
y(jt, Fe);
m({
  Container: {
    // Create a line element
    line: A(function(...i) {
      return jt.prototype.plot.apply(
        this.put(new jt()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
k(jt, "Line");
class Kt extends R {
  // Initialize node
  constructor(t, e = t) {
    super(O("marker", t), e);
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
m({
  Container: {
    marker(...i) {
      return this.defs().marker(...i);
    }
  },
  Defs: {
    // Create marker
    marker: A(function(i, t, e) {
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
k(Kt, "Marker");
function kt(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const mn = {
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
class Ve {
  done() {
    return !1;
  }
}
class be extends Ve {
  constructor(t = It.ease) {
    super(), this.ease = mn[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class Qt extends Ve {
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
class _n extends Qt {
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
y(_n, {
  duration: kt("_duration", ii),
  overshoot: kt("_overshoot", ii)
});
class yn extends Qt {
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
y(yn, {
  windup: kt("_windup"),
  p: kt("P"),
  i: kt("I"),
  d: kt("D")
});
const xn = {
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
function bn(i) {
  const t = i.segment[0];
  return we[t](i.segment.slice(1), i.p, i.p0);
}
function ke(i) {
  return i.segment.length && i.segment.length - 1 === xn[i.segment[0].toUpperCase()];
}
function wn(i, t) {
  i.inNumber && lt(i, !1);
  const e = $e.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function lt(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, ke(i) && ve(i);
}
function ve(i) {
  i.inSegment = !1, i.absolute && (i.segment = bn(i)), i.segments.push(i.segment);
}
function kn(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function vn(i) {
  return i.lastToken.toUpperCase() === "E";
}
const Cn = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function Sn(i, t = !0) {
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
    p0: new E(),
    p: new E()
  };
  for (; n.lastToken = s, s = i.charAt(e++); )
    if (!(!n.inSegment && wn(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          lt(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || kn(n)) {
          n.inNumber = !0, n.number = s, lt(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (Cn.has(s)) {
        n.inNumber && lt(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !vn(n)) {
          lt(n, !1), --e;
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
          lt(n, !1);
        else if (ke(n))
          ve(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && lt(n, !1), n.inSegment && ke(n) && ve(n), n.segments;
}
function Mn(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class mt extends St {
  // Get bounding box of path
  bbox() {
    return st().path.setAttribute("d", this.toString()), new $(st.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), Sn(t);
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
    return Mn(this);
  }
}
const zi = (i) => {
  const t = typeof i;
  return t === "number" ? d : t === "string" ? M.isColor(i) ? M : et.test(i) ? $e.test(i) ? mt : St : xi.test(i) ? d : Ce : qe.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? St : t === "object" ? Ft : Ce;
};
class ut {
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
    return this._type === M && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Ft && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
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
const Tn = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Ft {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const e = this.values;
    for (let s = 0, n = e.length; s < n; ++s) {
      if (e[s + 1] === t[s + 1]) {
        if (e[s + 1] === M && t[s + 7] !== e[s + 7]) {
          const a = t[s + 7], h = new M(this.values.splice(s + 3, 5))[a]().toArray();
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
    return e.sort(Tn), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const qe = [Ce, Gt, Ft];
function An(i = []) {
  qe.push(...[].concat(i));
}
function On() {
  y(qe, {
    to(i) {
      return new ut().type(this.constructor).from(this.toArray()).to(i);
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
let Ot = class extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new mt(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new mt(t)
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
Ot.prototype.MorphArray = mt;
m({
  Container: {
    // Create a wrapped path element
    path: A(function(i) {
      return this.put(new Ot()).plot(i || new mt());
    })
  }
});
k(Ot, "Path");
function Nn() {
  return this._array || (this._array = new ot(this.attr("points")));
}
function In() {
  return delete this._array, this;
}
function En(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function Ln(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new ot(i)
  );
}
function $n(i, t) {
  const e = Tt(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Nn,
  clear: In,
  move: En,
  plot: Ln,
  size: $n
}, Symbol.toStringTag, { value: "Module" }));
let Xt = class extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("polygon", t), e);
  }
};
m({
  Container: {
    // Create a wrapped polygon element
    polygon: A(function(i) {
      return this.put(new Xt()).plot(i || new ot());
    })
  }
});
y(Xt, Fe);
y(Xt, Di);
k(Xt, "Polygon");
class Ht extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("polyline", t), e);
  }
}
m({
  Container: {
    // Create a wrapped polygon element
    polyline: A(function(i) {
      return this.put(new Ht()).plot(i || new ot());
    })
  }
});
y(Ht, Fe);
y(Ht, Di);
k(Ht, "Polyline");
class se extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("rect", t), e);
  }
}
y(se, { rx: Pe, ry: je });
m({
  Container: {
    // Create a rect element
    rect: A(function(i, t) {
      return this.put(new se()).size(i, t);
    })
  }
});
k(se, "Rect");
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
const S = {
  nextDraw: null,
  frames: new fe(),
  timeouts: new fe(),
  immediates: new fe(),
  timer: () => w.window.performance || w.window.Date,
  transforms: [],
  frame(i) {
    const t = S.frames.push({ run: i });
    return S.nextDraw === null && (S.nextDraw = w.window.requestAnimationFrame(S._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = S.timer().now() + t, s = S.timeouts.push({ run: i, time: e });
    return S.nextDraw === null && (S.nextDraw = w.window.requestAnimationFrame(S._draw)), s;
  },
  immediate(i) {
    const t = S.immediates.push(i);
    return S.nextDraw === null && (S.nextDraw = w.window.requestAnimationFrame(S._draw)), t;
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
    S.nextDraw = S.timeouts.first() || S.frames.first() ? w.window.requestAnimationFrame(S._draw) : null;
  }
}, zn = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, Dn = function() {
  const i = w.window;
  return (i.performance || i.Date).now();
};
class Pi extends Rt {
  // Construct a new timeline on the given element
  constructor(t = Dn) {
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
      return this._runners.map(zn);
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
    return S.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = S.frame(this._step), this);
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
m({
  Element: {
    timeline: function(i) {
      return i == null ? (this._timeline = this._timeline || new Pi(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class G extends Rt {
  constructor(t) {
    super(), this.id = G.id++, t = t ?? It.duration, t = typeof t == "function" ? new Qt(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof Qt, this._stepper = this._isDeclarative ? t : new be(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new p(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, o = 0;
    return t = t ?? It.duration, e = e ?? It.delay, s = s || "last", typeof t == "object" && !(t instanceof Ve) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, o = t.wait ?? o, t = t.duration ?? It.duration), {
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
    const n = G.sanitise(t, e, s), r = new G(n.duration);
    return this._timeline && r.timeline(this._timeline), this._element && r.element(this._element), r.loop(n).schedule(n.delay, n.when);
  }
  clearTransform() {
    return this.transforms = new p(), this;
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
      const f = function(_) {
        const v = o * Math.floor(_ % (2 * (n + s)) / (n + s)), g = v && !a || !v && a, T = Math.pow(-1, g) * (_ % (n + s)) / s + g;
        return Math.max(Math.min(T, 1), 0);
      }, x = r * (n + s) - n;
      return h = e <= 0 ? Math.round(f(1e-5)) : e < x ? f(e) : Math.round(f(x - 1e-5)), h;
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
    return (s || a) && (this._initialise(s), this.transforms = new p(), h = this._run(a ? t : e), this.fire("step", this)), this.done = this.done || h && a, o && this.fire("finished", this), this;
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
G.id = 0;
class Zt {
  constructor(t = new p(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
y([G, Zt], {
  mergeWith(i) {
    return new Zt(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const ji = (i, t) => i.lmultiplyO(t), Fi = (i) => i.transforms;
function Pn() {
  const t = this._transformationRunners.runners.map(Fi).reduce(ji, new p());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class jn {
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
m({
  Element: {
    animate(i, t, e) {
      const s = G.sanitise(i, t, e), n = this.timeline();
      return new G(s.duration).loop(s).element(this).timeline(n.play()).schedule(s.delay, s.when);
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(Fi).reduce(ji, new p());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), S.cancelImmediate(this._frameId), this._frameId = S.immediate(Pn.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new jn().add(
        new Zt(new p(this))
      ));
    }
  }
});
const Fn = (i, t) => i.filter((e) => !t.includes(e));
y(G, {
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
    let n = new ut(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(o) {
        return this.element()[i](n.at(o).valueOf()), n.done();
      },
      function(o) {
        const a = Object.keys(o), h = Fn(a, r);
        if (h.length) {
          const l = this.element()[i](h), u = new Ft(n.from()).valueOf();
          Object.assign(u, l), n.from(u);
        }
        const c = new Ft(n.to()).valueOf();
        Object.assign(c, o), n.to(c), r = a, s = o;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new ut(this._stepper).to(new d(i));
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
    const s = p.isMatrixLike(i);
    e = i.affine != null ? i.affine : e ?? !s;
    const n = new ut(this._stepper).type(
      e ? Gt : p
    );
    let r, o, a, h, c;
    function l() {
      o = o || this.element(), r = r || ye(i, o), c = new p(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
    }
    function u(x) {
      t || this.clearTransform();
      const { x: _, y: v } = new E(r).transform(
        o._currentTransform(this)
      );
      let g = new p({ ...i, origin: [_, v] }), T = this._isDeclarative && a ? a : c;
      if (e) {
        g = g.decompose(_, v), T = T.decompose(_, v);
        const D = g.rotate, H = T.rotate, P = [D - 360, D, D + 360], at = P.map((Wi) => Math.abs(Wi - H)), Ut = Math.min(...at), Yt = at.indexOf(Ut);
        g.rotate = P[Yt];
      }
      t && (s || (g.rotate = i.rotate || 0), this._isDeclarative && h && (T.rotate = h)), n.from(T), n.to(g);
      const L = n.at(x);
      return h = L.rotate, a = new p(L), this.addTransform(a), o._addRunner(this), n.done();
    }
    function f(x) {
      (x.origin || "center").toString() !== (i.origin || "center").toString() && (r = ye(x, o)), i = { ...x, origin: r };
    }
    return this.queue(l, u, f, !0), this._isDeclarative && this._rememberMorpher("transform", n), this;
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
    if (t = new d(t), this._tryRetarget(i, t)) return this;
    const e = new ut(this._stepper).to(t);
    let s = null;
    return this.queue(
      function() {
        s = this.element()[i](), e.from(s), e.to(s + t);
      },
      function(n) {
        return this.element()[i](e.at(n)), e.done();
      },
      function(n) {
        e.to(s + new d(n));
      }
    ), this._rememberMorpher(i, e), this;
  },
  _queueObject(i, t) {
    if (this._tryRetarget(i, t)) return this;
    const e = new ut(this._stepper).to(t);
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
    return this._queueObject(i, new d(t));
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
    const n = new ut(this._stepper).type(this._element.MorphArray).to(i);
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
    return this._queueObject("viewbox", new $(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
y(G, { rx: Pe, ry: je, from: Li, to: $i });
k(G, "Runner");
class Re extends R {
  constructor(t, e = t) {
    super(O("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? U(this.node.querySelector("defs")) || this.put(new De()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof w.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
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
m({
  Container: {
    // Create nested svg document
    nested: A(function() {
      return this.put(new Re());
    })
  }
});
k(Re, "Svg", !0);
let Be = class extends R {
  // Initialize node
  constructor(t, e = t) {
    super(O("symbol", t), e);
  }
};
m({
  Container: {
    symbol: A(function() {
      return this.put(new Be());
    })
  }
});
k(Be, "Symbol");
function Vn(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(w.document.createTextNode(i)), this;
}
function qn() {
  return this.node.getComputedTextLength();
}
function Rn(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function Bn(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function Gn(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function Xn(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function Hn(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function Un(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function Yn(i) {
  return this.attr("x", i);
}
function Wn(i) {
  return this.attr("y", i);
}
function Kn(i, t) {
  return this.ax(i).ay(t);
}
function Qn(i) {
  return this._build = !!i, this;
}
const Vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Kn,
  ax: Yn,
  ay: Wn,
  build: Qn,
  center: Un,
  cx: Xn,
  cy: Hn,
  length: qn,
  move: Gn,
  plain: Vn,
  x: Rn,
  y: Bn
}, Symbol.toStringTag, { value: "Module" }));
class Q extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("text", t), e), this.dom.leading = this.dom.leading ?? new d(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(t) {
    return t == null ? this.dom.leading : (this.dom.leading = new d(t), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(t) {
    if (typeof t == "boolean" && (this._rebuild = t), this._rebuild) {
      const e = this;
      let s = 0;
      const n = this.dom.leading;
      this.each(function(r) {
        if (xe(this.node)) return;
        const o = w.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new d(o);
        this.dom.newLined && (this.attr("x", e.attr("x")), this.text() === `
` ? s += a : (this.attr("dy", r ? a + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new d(t.leading || 1.3), this;
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
        n !== s && e[n].nodeType !== 3 && U(e[n]).dom.newLined === !0 && (t += `
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
y(Q, Vi);
m({
  Container: {
    // Create text element
    text: A(function(i = "") {
      return this.put(new Q()).text(i);
    }),
    // Create plain text element
    plain: A(function(i = "") {
      return this.put(new Q()).plain(i);
    })
  }
});
k(Q, "Text");
class ne extends X {
  // Initialize node
  constructor(t, e = t) {
    super(O("tspan", t), e), this._build = !1;
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
    if (!(t instanceof Q))
      return this;
    const e = t.index(this), s = w.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new d(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
y(ne, Vi);
m({
  Tspan: {
    tspan: A(function(i = "") {
      const t = new ne();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
k(ne, "Tspan");
let Ge = class extends X {
  constructor(t, e = t) {
    super(O("circle", t), e);
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
    return this.radius(new d(t).divide(2));
  }
};
y(Ge, { x: Mi, y: Ti, cx: Ai, cy: Oi, width: Ni, height: Ii });
m({
  Container: {
    // Create circle element
    circle: A(function(i = 0) {
      return this.put(new Ge()).size(i).move(0, 0);
    })
  }
});
k(Ge, "Circle");
class Se extends R {
  constructor(t, e = t) {
    super(O("clipPath", t), e);
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
m({
  Container: {
    // Create clipping element
    clip: A(function() {
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
k(Se, "ClipPath");
class Jt extends Z {
  constructor(t, e = t) {
    super(O("foreignObject", t), e);
  }
}
m({
  Container: {
    foreignObject: A(function(i, t) {
      return this.put(new Jt()).size(i, t);
    })
  }
});
k(Jt, "ForeignObject");
function Zn(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof es().SVGSVGElement ? new $(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new p(e), r = n.translate(i, t).transform(n.inverse()), o = new E(s.x, s.y).transform(r);
    e.move(o.x, o.y);
  }), this;
}
function Jn(i) {
  return this.dmove(i, 0);
}
function tr(i) {
  return this.dmove(0, i);
}
function er(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function ir(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function sr(i, t, e = this.bbox()) {
  const s = Tt(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((o) => {
    const a = new E(e).transform(new p(o).inverse());
    o.scale(n, r, a.x, a.y);
  }), this;
}
function nr(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function rr(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function or(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: Zn,
  dx: Jn,
  dy: tr,
  height: er,
  move: ir,
  size: sr,
  width: nr,
  x: rr,
  y: or
}, Symbol.toStringTag, { value: "Module" }));
class re extends R {
  constructor(t, e = t) {
    super(O("g", t), e);
  }
}
y(re, qi);
m({
  Container: {
    // Create a group element
    group: A(function() {
      return this.put(new re());
    })
  }
});
k(re, "G");
class te extends R {
  constructor(t, e = t) {
    super(O("a", t), e);
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
y(te, qi);
m({
  Container: {
    // Create a hyperlink element
    link: A(function(i) {
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
k(te, "A");
class Me extends R {
  // Initialize node
  constructor(t, e = t) {
    super(O("mask", t), e);
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
m({
  Container: {
    mask: A(function() {
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
k(Me, "Mask");
class Ri extends Z {
  constructor(t, e = t) {
    super(O("stop", t), e);
  }
  // add color stops
  update(t) {
    return (typeof t == "number" || t instanceof d) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new d(t.offset)), this;
  }
}
m({
  Gradient: {
    // Add a color stop
    stop: function(i, t, e) {
      return this.put(new Ri()).update(i, t, e);
    }
  }
});
k(Ri, "Stop");
function ar(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += Zi(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class Te extends Z {
  constructor(t, e = t) {
    super(O("style", t), e);
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
    return this.addText(ar(t, e));
  }
}
m("Dom", {
  style(i, t) {
    return this.put(new Te()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new Te()).font(i, t, e);
  }
});
k(Te, "Style");
class Xe extends Q {
  // Initialize node
  constructor(t, e = t) {
    super(O("textPath", t), e);
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
m({
  Container: {
    textPath: A(function(i, t) {
      return i instanceof Q || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: A(function(i, t = !0) {
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
    text: A(function(i) {
      return i instanceof Q || (i = new Q().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return At("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
Xe.prototype.MorphArray = mt;
k(Xe, "TextPath");
class Bi extends X {
  constructor(t, e = t) {
    super(O("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, qt);
  }
}
m({
  Container: {
    // Create a use element
    use: A(function(i, t) {
      return this.put(new Bi()).use(i, t);
    })
  }
});
k(Bi, "Use");
const Gi = j;
y([Re, Be, ie, Pt, Kt], q("viewbox"));
y([jt, Ht, Xt, Ot], q("marker"));
y(Q, q("Text"));
y(Ot, q("Path"));
y(De, q("Defs"));
y([Q, ne], q("Tspan"));
y([se, ee, Bt, G], q("radius"));
y(Rt, q("EventTarget"));
y(rt, q("Dom"));
y(Z, q("Element"));
y(X, q("Shape"));
y([R, Ei], q("Container"));
y(Bt, q("Gradient"));
y(G, q("Runner"));
gt.extend(Ki());
An([
  d,
  M,
  $,
  p,
  St,
  ot,
  mt,
  E
]);
On();
function Y(i) {
  return i?.x !== void 0 && i.y !== void 0;
}
function K(i) {
  return i?.min !== void 0 && i.max !== void 0;
}
var Xi = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(Xi || {}), hr = /* @__PURE__ */ ((i) => (i.X = "Ox", i.Y = "Oy", i))(hr || {}), Vt = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(Vt || {}), cr = /* @__PURE__ */ ((i) => (i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates", i))(cr || {}), lr = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector", i))(lr || {}), ur = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star", i))(ur || {}), W = /* @__PURE__ */ ((i) => (i.SMOOTH = "smooth", i.VERTICAL = "vertical", i.HORIZONTAL = "horizontal", i.UP = "up", i.DOWN = "down", i.RIGHT = "right", i.LEFT = "left", i))(W || {});
const si = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class fr {
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
    this.box = new $(a, h, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box,
      dx: r,
      dy: o
    }).defaultPrevented && this.move(a, h);
  }
  move(t, e) {
    this.el.type === "svg" ? re.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), tt(window, "mousemove.drag"), tt(window, "touchmove.drag"), tt(window, "mouseup.drag"), tt(window, "touchend.drag"), this.init(!0);
  }
}
y(Z, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new fr(this)).init(i), this;
  }
});
class pr {
  _element;
  _name;
  _style;
  constructor(t, e, s) {
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
    return this._config.asHtml ? this._config.texConverter(this._displayName) : this._displayName;
  }
  _x;
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
  }
  _y;
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t;
  }
  _auto_rotate = !1;
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
    t ??= this._config.alignement, e ??= this._config.offset, s ??= this._config.rotate, e = {
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
function He(i, t = 10) {
  return +i.toFixed(t);
}
function dr(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function oe(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class N {
  constructor(t, e) {
    return this._x = 0, this._y = 0, Y(t) && Y(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : Y(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
  }
  _x;
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
  }
  _y;
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
    return new N(this._y, -this._x);
  }
  get unit() {
    const t = this.norm;
    return new N(this._x / t, this._y / t);
  }
  static scalarProduct(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  projection(t) {
    const e = t.x, s = t.y, n = N.scalarProduct(this, t) / (e ** 2 + s ** 2);
    return new N(e * n, s * n);
  }
  rotate(t) {
    const e = +t * Math.PI / 180, s = +this._x, n = +this._y;
    return this._x = Math.cos(e) * s - Math.sin(e) * n, this._y = Math.sin(e) * s + Math.cos(e) * n, this;
  }
  add(t) {
    return new N(this._x + t.x, this._y + t.y);
  }
  setLength(t) {
    const e = this.norm;
    return this._x = this._x * t / e, this._y = this._y * t / e, this;
  }
}
class Ue {
  constructor(t, e) {
    if (this._A = { x: 0, y: 0 }, this._director = new N(0, 0), e instanceof N)
      this._A = t, this._director = e;
    else
      return new Ue(t, new N(t, e));
  }
  _A;
  get A() {
    return this._A;
  }
  set A(t) {
    this._A = t;
  }
  _director;
  get director() {
    return this._director;
  }
  set director(t) {
    this._director = t;
  }
  get normal() {
    return new N(this._director.y, -this._director.x);
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
    return dr(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let o, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (o = this._A.x, a = n * o + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (o = t.A.x, a = e * o + s) : (o = (r - s) / (e - n), a = e * o + s), o === Number.POSITIVE_INFINITY || o === Number.NEGATIVE_INFINITY ? null : { x: o, y: a };
  }
  projection(t) {
    const e = this._director, s = new N(this._A, t), n = N.scalarProduct(e, s) / N.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class $t {
  constructor(t, e) {
    this._expression = t;
    try {
      this._rpn = new gr(
        "numeric"
        /* NUMERIC */
      ).parse(t, e ?? !0).rpn, this._isValid = !0;
    } catch {
      this._rpn = [], this._isValid = !1;
    }
  }
  _rpn;
  get rpn() {
    return this._rpn;
  }
  _expression;
  get expression() {
    return this._expression;
  }
  _isValid;
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
        t?.[s.token] !== void 0 && this._addToStack(e, +t[s.token]);
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
    t.push(He(e));
  }
}
const Ae = {
  pi: Math.PI,
  e: Math.exp(1)
};
class gr {
  _mode;
  _tokenConfig;
  _tokenConstant;
  _tokenKeys;
  _uniformize;
  constructor(t) {
    this._mode = typeof t > "u" ? "polynom" : t, this._tokenConfig = {}, this._tokenConstant = {}, this._tokenKeys = [], this._uniformize = !1, this.tokenConfigInitialization();
  }
  _rpn = [];
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
function I(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (K(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return Y(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function Mt(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i / t.axis.y.y : i / t.axis.x.x;
  if (K(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min / t.axis.y.y, n = t.origin.y + i.max / t.axis.y.y) : (s = t.origin.x + i.min / t.axis.x.x, n = t.origin.x + i.max / t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return Y(i) ? {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  } : i;
}
function pt(i, t, e, s, n = 0, r = !1, o) {
  let a = 0, h = 0, c = 0, l = 0;
  if (t.x === 0)
    a = i.x, r ? h = i.y + n : h = t.y > 0 ? +n : s - n, c = i.x, o ? l = t.y < 0 ? i.y + o * t.y : 0 + n : l = t.y > 0 ? s - n : 0 + n;
  else if (t.y === 0)
    r ? a = i.x - n : a = t.x > 0 ? 0 + n : e - n, h = i.y, o ? c = t.x > 0 ? i.x + o * t.x : 0 - n : c = t.x > 0 ? e - n : 0 + n, l = i.y;
  else {
    let u = 0, f = 0;
    t.x > 0 ? (u = r ? -n / t.x : o || (i.x - n) / t.x, f = o || (e - i.x - n) / t.x) : t.x < 0 && (u = r ? -n / t.x : o || (e - i.x - n) / t.x, f = o || (i.x - n) / t.x), u = Math.abs(u), f = Math.abs(f), a = i.x - u * t.x, h = i.y - u * t.y, c = i.x + f * t.x, l = i.y + f * t.y;
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
function Hi(i) {
  if (typeof i == "number")
    return i;
  if (typeof i == "string" && i.includes("/")) {
    const [t, e] = i.split("/");
    return +t / +e;
  }
  return +i;
}
function mr(i, t, e) {
  const n = ["x^2", "x", ""];
  return Object.values(_r(i, t, e)).map((o, a) => o === 0 ? "" : (a > 0 && o > 0 ? `+${o.toFixed(4)}` : o.toFixed(4)) + n[a]).join("");
}
function _r(i, t, e) {
  const { x: s, y: n } = i, { x: r, y: o } = t, { x: a, y: h } = e, c = (s - r) * (s - a) * (r - a), l = (n * (r - a) + o * (a - s) + h * (s - r)) / c, u = (n * (a ** 2 - r ** 2) + o * (s ** 2 - a ** 2) + h * (r ** 2 - s ** 2)) / c, f = (n * (r * a * (r - a)) + o * (a * s * (a - s)) + h * (s * r * (s - r))) / c;
  return { a: l, b: u, c: f };
}
class F {
  constructor(t, e) {
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
  set shape(t) {
    this._shape = t;
  }
  _appearance;
  get appearance() {
    return this._appearance;
  }
  set appearance(t) {
    this._appearance = t;
  }
  _static;
  get static() {
    return this._static;
  }
  set static(t) {
    this._static = t;
  }
  _isDraggable;
  get isDraggable() {
    return this._isDraggable;
  }
  set isDraggable(t) {
    this._isDraggable = t;
  }
  _label;
  get label() {
    return this._label;
  }
  _animate;
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
    return this._label = new pr(
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
    return this._label?.config.text ?? this._name;
  }
  move(t) {
    if (Y(t)) {
      const e = I(t.x, this.graphConfig), s = I(t.y, this.graphConfig);
      this._shape.translate(e, -s);
    } else if (typeof t == "number") {
      const e = I(t, this.graphConfig);
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
    const s = e?.find((a) => typeof a == "number") ?? 10, n = e?.find((a) => typeof a == "string") ?? "->", r = Ye(
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
var C = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.EVAL_FX = "eval", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(C || {});
function z(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const yr = [
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
class V extends F {
  constructor(t, e, s) {
    return super(t, e), this._config = Object.assign(
      { shape: "line" },
      s
    ), this._start = { x: 0, y: 0 }, this._end = { x: this.graphConfig.width, y: this.graphConfig.height }, this.shape = this._makeShape(), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._makeShape();
  }
  _end;
  get end() {
    return this._end;
  }
  set end(t) {
    this._end = t;
  }
  _start;
  get start() {
    return this._start;
  }
  set start(t) {
    this._start = t;
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
    const t = this.direction;
    return {
      x: t.y,
      y: -t.x
    };
  }
  computeLabel() {
    if (this.label?.config.text.includes("@") && this._config.shape === "segment") {
      const t = Mt(this._start, this.graphConfig), e = Mt(this._end, this.graphConfig);
      return this.label.config.text.replace("@", He(+oe(t, e).toFixed(2)).toString());
    }
    return this.label?.config.text ?? this.name;
  }
  computed() {
    let t = { x: 0, y: 0 };
    if (this._config.through?.A && this._config.through.B)
      this.start = this._config.through.A, this.end = this._config.through.B, t = this.direction;
    else if (this._config.director?.A && this._config.director.d)
      this.start = this._config.director.A, this.end = {
        x: this._config.director.A.x + this._config.director.d.x,
        y: this._config.director.A.y + this._config.director.d.y
      }, t = this._config.director.d;
    else if (this._config.parallel?.to && this._config.parallel.through)
      this.start = this._config.parallel.through, t = this._config.parallel.to.direction;
    else if (this._config.perpendicular?.to && this._config.perpendicular.through)
      this.start = this._config.perpendicular.through, t = this._config.perpendicular.to.normal;
    else if (this._config.mediator?.A && this._config.mediator.B)
      this.start = {
        x: (this._config.mediator.A.x + this._config.mediator.B.x) / 2,
        y: (this._config.mediator.A.y + this._config.mediator.B.y) / 2
      }, t = {
        x: this._config.mediator.B.y - this._config.mediator.A.y,
        y: -(this._config.mediator.B.x - this._config.mediator.A.x)
      };
    else if (this._config.bisector) {
      if ("d1" in this._config.bisector && "d2" in this._config.bisector, "A" in this._config.bisector && "B" in this._config.bisector && "C" in this._config.bisector) {
        const { A: s, B: n, C: r } = this._config.bisector, o = new N(s, n), a = o.norm, h = new N(s, r), c = h.norm;
        this.start = s, t = {
          x: o.x / a + h.x / c,
          y: o.y / a + h.y / c
        };
      }
    } else if (this._config.equation) {
      const s = this._config.equation;
      if (!s.includes("="))
        return this;
      let n = { x: 0, y: 0 };
      if (s.startsWith("y=") && !s.includes("x")) {
        const r = z([s.split("=")[1]], {})[0];
        n = I({ x: 0, y: r }, this.graphConfig), t = { x: 1, y: 0 };
      } else if (s.startsWith("x=")) {
        const r = z([s.split("=")[1]], {})[0];
        n = I({ x: r, y: 0 }, this.graphConfig), t = { x: 0, y: 1 };
      } else {
        const [r, o] = s.split("="), a = oi(r), h = oi(o), c = {
          a: a.a - h.a,
          b: a.b - h.b,
          c: a.c - h.c
        };
        n = I({ x: 0, y: -c.c / c.b }, this.graphConfig), t = {
          x: c.b,
          y: c.a
        };
      }
      this.start = n, this.end = {
        x: n.x + t.x,
        y: n.y + t.y
      };
    }
    if (this._config.shape === void 0 || this._config.shape === "line" || this._config.shape === "ray") {
      const s = pt(
        this.start,
        t,
        this.graphConfig.width,
        this.graphConfig.height,
        0,
        this._config.shape === "ray"
      );
      s !== null && (this.start = s[0], this.end = s[1]);
    }
    return this.shape.plot(this.start.x, this.start.y, this.end.x, this.end.y), this;
  }
  follow(t, e) {
    const s = this.math.projection({ x: t, y: e });
    if (this._config.shape === "line")
      return s;
    const { x: n, y: r } = this.start, { x: o, y: a } = this.end, h = o - n, c = a - r, l = Math.max(0, Math.min(1, ((t - n) * h + (e - r) * c) / (h * h + c * c)));
    return {
      x: n + l * h,
      y: r + l * c
    };
  }
  move(t) {
    if (typeof t == "number") {
      const e = new N(this.normal).setLength(t);
      return this.move(e);
    }
    return super.move(t);
  }
  moveLabel() {
    if (!this.label)
      return this;
    if (this._config.shape === "segment" || this._config.shape === "vector") {
      const t = (this.start.x + this.end.x) / 2, e = (this.start.y + this.end.y) / 2;
      if (this.label.move(t, e), this.label.auto_rotate) {
        let s = -this.angle;
        s > 90 && (s = s - 180), s < -90 && (s = s + 180), this.label.position(void 0, void 0, s);
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
      const t = Ye(this.rootSVG, this.name, 10);
      this.shape.marker("end", t);
    }
    return this.fill().stroke(), this.shape;
  }
}
function oi(i) {
  const t = i.split(/([+-]?[0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = ai(t, "x"), s = ai(t, "y"), n = Hi(t.find((r) => !r.includes("x") && !r.includes("y")) ?? 0);
  return {
    a: +z([e], {})[0],
    b: +z([s], {})[0],
    c: +z([n], {})[0]
  };
}
function ai(i, t) {
  return i.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : Hi(e.replace(t, "")))[0] ?? 0;
}
class b extends F {
  constructor(t, e, s) {
    return super(t, e), this._pixels = { x: NaN, y: NaN }, this._config = Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      s
    ), this.computed(), this.shape = this._makeShape(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._makeShape();
  }
  // Coordinates of the point in pixels
  _pixels;
  get pixels() {
    return this._pixels;
  }
  set pixels(t) {
    this._pixels = t, this.shape.center(this._pixels.x, this._pixels.y);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return Mt(this._pixels, this.graphConfig);
  }
  get size() {
    return this._config.size;
  }
  set size(t) {
    this._config.size = t, this._makeShape();
  }
  get x() {
    return this._pixels.x;
  }
  set x(t) {
    this._pixels.x = t, this.shape.center(t, this._pixels.y);
  }
  get y() {
    return this._pixels.y;
  }
  set y(t) {
    this._pixels.y = t, this.shape.center(this._pixels.x, t);
  }
  asCircle(t) {
    return this.config.shape = "circle", this.config.size = t ?? 2, this._makeShape(), this;
  }
  asCrosshair(t) {
    return this.config.shape = "crosshair", this.config.size = t ?? 10, this._makeShape(), this;
  }
  asSquare(t) {
    return this.config.shape = "square", this.config.size = t ?? 10, this._makeShape(), this;
  }
  computeLabel() {
    if (this.label?.config.text.includes("@")) {
      const t = Mt(this._pixels, this.graphConfig);
      return this.label.config.text.replace("@", `(${t.x};${t.y})`);
    }
    return this.label?.config.text ?? this.name;
  }
  computed() {
    if (this._config.coordinates) {
      const { x: t, y: e } = this._config.coordinates;
      return this.pixels = I({
        x: typeof t == "number" ? t : t.point.coordinates[t.axis],
        y: typeof e == "number" ? e : e.point.coordinates[e.axis]
      }, this.graphConfig), this;
    }
    if (this._config.middle) {
      const t = this._config.middle.A, e = this._config.middle.B;
      return this._pixels.x = (t.x + e.x) / 2, this._pixels.y = (t.y + e.y) / 2, this;
    }
    if (this._config.projection) {
      const t = this._config.projection.point;
      if (this._config.projection.axis === "Ox")
        return this.x = t.x, this.y = this.graphConfig.origin.y, this;
      if (this._config.projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = t.y, this;
      if (this._config.projection.axis instanceof V) {
        const e = this._config.projection.axis, s = e.start.x, n = e.start.y, r = t.x - s, o = t.y - n, a = e.direction, h = r * a.x + o * a.y, c = a.x * a.x + a.y * a.y;
        this.x = s + h * a.x / c, this.y = n + h * a.y / c;
      }
    }
    if (this._config.intersection) {
      const t = this._config.intersection.A, e = this._config.intersection.B, s = t.math.intersection(e.math);
      if (s === null)
        return this;
      this.pixels = s;
    }
    if (this._config.intersectionWithCircle) {
      const t = this._config.intersectionWithCircle.A, e = this._config.intersectionWithCircle.B, s = this._config.intersectionWithCircle.index, n = t.intersectionWithLine(e);
      if (n === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.pixels = n[s];
    }
    if (this._config.intersectionBetweenCircles) {
      const t = this._config.intersectionBetweenCircles.A, e = this._config.intersectionBetweenCircles.B, s = this._config.intersectionBetweenCircles.index, n = t.intersectionWithCircle(e);
      if (n === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.show(), this.pixels = n[s];
    }
    if (this._config.symmetry) {
      const t = this._config.symmetry.A, e = this._config.symmetry.B;
      if (e instanceof V) {
        const n = new N(e.direction).normal, o = new N(t, e.start).projection(n);
        this.x = t.x + 2 * o.x, this.y = t.y + 2 * o.y;
      } else if (e === "Ox")
        this.x = t.x, this.y = 2 * this.graphConfig.origin.y - t.y;
      else if (e === "Oy")
        this.x = 2 * this.graphConfig.origin.x - t.x, this.y = t.y;
      else {
        const s = e.x, n = e.y, r = t.x - s, o = t.y - n;
        this.x = s - r, this.y = n - o;
      }
    }
    if (this._config.direction) {
      const { point: t, direction: e, distance: s } = this._config.direction;
      if (e === "Ox")
        return this.x = t.x + I(s, this.graphConfig), this.y = t.y, this;
      if (e === "Oy")
        return this.x = t.x, this.y = t.y - I(s, this.graphConfig), this;
      if (e instanceof V) {
        const n = new N(this._config.direction.perpendicular ? e.normal : e.direction).unit, r = I(s, this.graphConfig);
        return this.x = t.x + r * n.x, this.y = t.y + r * n.y, this;
      }
      if (e.A && e.B) {
        const n = new N(e.A, e.B);
        return this.x = t.x + s * n.x, this.y = t.y + s * n.y, this;
      }
    }
    if (this._config.evaluation) {
      const { fx: t, x: e } = this._config.evaluation;
      this.pixels = t.evaluate(typeof e == "number" ? e : e.point.coordinates[e.axis]);
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
        const t = this.size / Math.sqrt(2);
        this.shape = this.element.path(
          `M ${-t} ${t} L ${t} ${-t} M ${-t} ${-t} L ${t} ${t}`
        ).center(this._pixels.x, this._pixels.y);
        break;
      }
    }
    return this.fill().stroke(), this.shape;
  }
}
class Ct extends F {
  _numExp;
  _fx;
  constructor(t, e, s) {
    return super(t, e), this._config = Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, s), this.shape = this._makeShape(), this._fx = this._getExpression(), this._numExp = new $t(this._fx), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._numExp = new $t(this._getExpression()), this.computed();
  }
  computed() {
    const t = this._getExpression();
    if (!t || t === "")
      return this;
    t !== this._fx && (this._fx = t, this._numExp = new $t(this._getExpression()));
    const e = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, s = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, n = this._config.domain ?? { min: e, max: s }, r = this._config.image ?? { min: -1 / 0, max: 1 / 0 }, o = this._config.samples ?? this.graphConfig.axis.x.x, a = this._numExp, h = this._calculatePointsCoordinates(n, o, a, r);
    let c = h[0];
    const l = 1e6, u = h.map(({ x, y: _ }, v) => {
      let g = v === 0 ? "M" : "L";
      return v > 0 && (isNaN(_) ? (g = "M", _ = c.y > 0 ? l : -l) : (c.y < 0 && _ > this.graphConfig.height || _ < 0 && c.y > this.graphConfig.height) && (g = "M")), c = { x, y: _ }, `${g} ${x} ${_}`;
    }).join(" ");
    return this.shape.plot(u), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(t, e) {
    return e === !0 ? { x: t, y: this._numExp.evaluate({ x: t }) } : I(
      { x: t, y: this._numExp.evaluate({ x: t }) },
      this.graphConfig
    );
  }
  follow(t, e) {
    const s = Mt({ x: t, y: e }, this.graphConfig);
    return this.evaluate(s.x);
  }
  _getExpression() {
    if (typeof this._config.expression == "string")
      return this._config.expression;
    if (this._config.quadratic && this._config.quadratic.length === 3 && this._config.quadratic.every((t) => t instanceof b)) {
      const [t, e, s] = this._config.quadratic.map((n) => n.coordinates);
      return mr(t, e, s);
    }
    return "";
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  _calculatePointsCoordinates(t, e, s, n) {
    const r = [];
    for (let o = t.min; o < t.max; o += 1 / e) {
      const a = s.evaluate({ x: o });
      if (isNaN(a) || a === 1 / 0 || a === -1 / 0 || a < n.min || a > n.max) {
        const h = I({ x: o, y: 0 }, this.graphConfig);
        r.push({ x: h.x, y: NaN });
      } else
        r.push(I({ x: o, y: a }, this.graphConfig));
    }
    return r;
  }
}
class Wt extends F {
  constructor(t, e, s) {
    super(t, e), this._config = Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, s), this._makeShape(), this.computed();
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._makeShape();
  }
  get center() {
    return this._config.center;
  }
  get radius() {
    return typeof this._config.radius == "number" ? I(this._config.radius, this.graphConfig) : oe(this.center, this._config.radius);
  }
  computed() {
    const t = this.shape;
    return t.radius(this.radius), t.center(this.center.x, this.center.y), this;
  }
  moveLabel() {
    return this.label && this.label.move(
      this.center.x + this.radius / 2,
      this.center.y - this.radius / 2
    ), this;
  }
  follow(t, e) {
    const s = this.radius, n = t - this.center.x, r = e - this.center.y, o = Math.sqrt(n ** 2 + r ** 2);
    return t = n / o * s + this.center.x, e = r / o * s + this.center.y, { x: t, y: e };
  }
  intersectionWithLine(t, e) {
    const { x: s, y: n } = this.center, { x: r, y: o } = t.start, { x: a, y: h } = t.end, c = a - r, l = h - o, u = r - s, f = o - n, x = c * c + l * l, _ = 2 * (c * u + l * f), v = u * u + f * f - this.radius * this.radius, g = _ * _ - 4 * x * v;
    if (g < 0)
      return null;
    const T = [], L = Math.sqrt(g), D = (-_ - L) / (2 * x), H = (-_ + L) / (2 * x);
    for (const P of [D, H])
      e && (P < 0 || P > 1) || T.push({
        x: r + P * c,
        y: o + P * l
      });
    return T;
  }
  intersectionWithCircle(t) {
    const { x: e, y: s } = this.center, { x: n, y: r } = t.center, o = this.radius, a = t.radius, h = n - e, c = r - s, l = Math.hypot(h, c);
    if (l > o + a || l < Math.abs(o - a) || l === 0)
      return null;
    const u = (o * o - a * a + l * l) / (2 * l), f = Math.sqrt(o * o - u * u), x = e + u * h / l, _ = s + u * c / l, v = -c * (f / l), g = h * (f / l), T = { x: x + v, y: _ + g }, L = { x: x - v, y: _ - g };
    return Math.abs(f) < 1e-10 ? [T] : [T, L];
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
  }
}
class xr extends F {
  constructor(t, e, s) {
    super(t, e), this._config = Object.assign({
      shape: "polygon"
    }, s), this._makeShape(), this.computed();
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._makeShape();
  }
  get vertices() {
    return this._config.vertices;
  }
  get radius() {
    return this._config.regular ? typeof this._config.regular.radius == "number" ? I(this._config.regular.radius, this.graphConfig) : this._config.vertices && Y(this._config.vertices[0]) && Y(this._config.regular.radius) ? oe(this._config.vertices[0], this._config.regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  _figuresXYtoArray() {
    const t = [];
    return this._config.vertices?.forEach((e) => {
      Y(e) && t.push([e.x, e.y]);
    }), t;
  }
  _makeShape() {
    this.element.clear();
    const t = this._figuresXYtoArray();
    if (this.shape = this.element.polygon(t), this.fill().stroke(), this.element.add(this.shape), this._config.mark) {
      const e = this._config.mark.center?.length ?? 0, s = t.reduce(
        (n, r) => (n.x += r[0], n.y += r[1], n),
        { x: 0, y: 0 }
      );
      s.x /= t.length, s.y /= t.length, t.forEach((n) => {
        const r = new N(s, { x: n[0], y: n[1] });
        e && r.setLength(e * 20), this.element.line(s.x, s.y, s.x + r.x, s.y + r.y).stroke({ color: "gray", width: 0.5 });
      });
    }
    return this.shape;
  }
  computed() {
    const t = this.shape;
    if (this._config.vertices && this._config.vertices.length > 2)
      t.plot(this._figuresXYtoArray());
    else if (this._config.regular) {
      const e = [], s = this.radius, n = new N(
        this._config.regular.center,
        Y(this._config.regular.radius) ? this._config.regular.radius : { x: this._config.regular.center.x, y: this._config.regular.center.y - s }
      );
      for (let r = 0; r < this._config.regular.sides; r++)
        e.push([
          this._config.regular.center.x + n.x,
          this._config.regular.center.y + n.y
        ]), n.rotate(360 / this._config.regular.sides);
      t.plot(e);
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
class br extends F {
  constructor(t, e, s) {
    return super(t, e), this.static = !0, this._config = Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      s
    ), this.shape = this._makeShape(), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
  }
  computed() {
    const e = [
      ...this._computeLines(this._config.axis.x, this._config.axis.y),
      ...this._computeLines(this._config.axis.y, this._config.axis.x)
    ].reduce((n, r) => {
      const [o, a] = r;
      return n + `M${o.x},${o.y} L${a.x},${a.y}`;
    }, "");
    return this.shape.plot(e), this;
  }
  moveLabel() {
    return this;
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
  }
  _computeLines(t, e) {
    let s = +this._config.origin.x, n = +this._config.origin.y;
    const r = [];
    let o = pt(
      { x: s, y: n },
      t,
      this._config.width,
      this._config.height
    );
    const a = (this._config.width + this._config.height) / 2;
    let h = 0;
    for (; h < a && (o && r.push(o), s += e.x, n -= e.y, o = pt(
      { x: s, y: n },
      t,
      this._config.width,
      this._config.height
    ), !(o === null && (s > this._config.width || n > this._config.height))); ) {
      if (r.length > 1e3)
        throw new Error("Too many lines");
      h++;
    }
    for (s = this._config.origin.x - e.x, n = this._config.origin.y + e.y, o = pt(
      { x: s, y: n },
      t,
      this._config.width,
      this._config.height
    ), h = 0; h < a && (o && r.push(o), s -= e.x, n += e.y, o = pt(
      { x: s, y: n },
      t,
      this._config.width,
      this._config.height
    ), !(o === null && (s < 0 || n < 0))); ) {
      if (r.length > 1e3)
        throw new Error("Too many lines");
      h++;
    }
    return r;
  }
}
class wr extends F {
  constructor(t, e, s) {
    super(t, e), this._config = Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, s), this.config = s;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this._makeShape(), this.computed();
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
    return typeof this._config.radius == "number" ? I(this._config.radius, this.graphConfig) : oe(this.center, this._config.radius ?? this._config.start);
  }
  get angle() {
    const { start: t, end: e } = this.getAngles();
    return e - t < 0 ? 360 + e - t : e - t;
  }
  get isSquare() {
    return He((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const t = this.radius, e = this.angle < 180 ? 1 : -1, s = new N(this.center, this.start).unit, n = new N(this.center, this.end).unit, r = s.add(n).unit, o = this.center.x + e * r.x * (t + 20), a = this.center.y + e * r.y * (t + 20);
    return e * r.x > 0 && e * r.y > 0 ? this.label.config.alignement = "mr" : e * r.x < 0 && e * r.y > 0 ? this.label.config.alignement = "ml" : e * r.x > 0 && e * r.y < 0 ? this.label.config.alignement = "mr" : e * r.x < 0 && e * r.y < 0 && (this.label.config.alignement = "ml"), this.label.move(o, a), this;
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
    const { start: t, end: e } = this.getAngles(), s = this._config.morphToSquare && this.isSquare ? this.radius / 2 : this.radius, n = ni(this.center.x, this.center.y, s, t), r = ni(this.center.x, this.center.y, s, e);
    return this._config.morphToSquare && this.isSquare ? this._describeSquare(this.center, n, r) : this._describeArc(this.center, n, r, s, e - t);
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  _describeSquare(t, e, s) {
    return [
      "M",
      e.x,
      e.y,
      "l",
      s.x - t.x,
      s.y - t.y,
      "L",
      s.x,
      s.y
    ].join(" ");
  }
  _describeArc(t, e, s, n, r) {
    const o = (r + 360) % 360 <= 180 ? 0 : 1;
    let h = [
      "M",
      e.x,
      e.y,
      "A",
      n,
      n,
      0,
      o,
      0,
      s.x,
      s.y
    ];
    return this._config.sector && (h = h.concat(["L", t.x, t.y, "L", e.x, e.y])), h.join(" ");
  }
}
class kr extends F {
  _axis;
  constructor(t, e, s) {
    return super(t, e), this.static = !0, Object.values(Vt).includes(s) ? this._config = this._defaultConfig(s) : this._config = s, this._axis = this._makeShape(), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
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
  _defaultConfig(t) {
    return Vt.POLAR, {
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
    const t = {
      x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
      y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
    };
    return this.shape.add(t.x).add(t.y), this.element.add(this.shape), t;
  }
  _updateAxis(t, e, s) {
    const n = s?.color ?? "black", r = s?.padding ?? 0, o = s?.half ?? !1, a = s?.length ?? 0, h = Ye(this.rootSVG, `axis-${e.x}-${e.y}`, 10).fill(n), c = pt(
      this.graphConfig.origin,
      e,
      this.graphConfig.width,
      this.graphConfig.height,
      r,
      o,
      a
    );
    return c !== null && t.plot(c[0].x, c[0].y, c[1].x, c[1].y), t.stroke({ color: n, width: 1 }).marker("end", h), this.shape.add(t), t;
  }
}
class vr extends F {
  _numExp;
  constructor(t, e, s) {
    return super(t, e), this._config = Object.assign({
      expressions: { x: "", y: "" }
    }, s), this._numExp = {
      x: new $t(this._config.expressions.x),
      y: new $t(this._config.expressions.y)
    }, this.shape = this._makeShape(), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const t = this._config.samples ?? this.graphConfig.axis.x.x, e = this._config.domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, s = [];
    for (let o = e.min; o < e.max; o += 1 / t) {
      const { x: a, y: h } = this.evaluate(o);
      s.push({ x: a, y: h });
    }
    const n = s.map(({ x: o, y: a }, h) => `${h === 0 ? "M" : "L"} ${o} ${a}`).join(" ");
    return this.shape.plot(n), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(t) {
    return I(
      {
        x: this._numExp.x.evaluate({ t }),
        y: this._numExp.y.evaluate({ t })
      },
      this.graphConfig
    );
  }
}
class Cr extends F {
  _reference;
  _delta;
  _point;
  _tangent;
  constructor(t, e, s) {
    return super(t, e), this._config = Object.assign({
      size: 10
    }, s), this.appearance.fill.color = "black", this._reference = this._config.follow.follow(0, 0), this._delta = { x: 0, y: 0 }, this._tangent = this.element.line(), this._point = this.element.circle(this._config.size).center(this._reference.x, this._reference.y), this.shape = this._makeShape(), this.computed(), this.rootSVG.on("mousemove", (n) => {
      let r = this.rootSVG.node.createSVGPoint();
      r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(this.rootSVG.node.getScreenCTM()?.inverse());
      const o = this._config.follow.follow(r.x, r.y);
      isNaN(o.y) ? this._point.hide() : (this._point.show(), this._point.center(o.x, o.y), this._reference = o, this._delta = this._config.follow.follow(r.x + 0.01, r.y + 0.01), this.computed());
    }), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
  }
  _makeShape() {
    return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const t = pt(
      this._reference,
      {
        x: this._delta.x - this._reference.x,
        y: this._delta.y - this._reference.y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return t === null ? this : (this._tangent.plot(
      t[0].x,
      t[0].y,
      t[1].x,
      t[1].y
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
class Sr extends F {
  constructor(t, e, s) {
    return super(t, e), this._config = Object.assign({
      samples: 100
    }, s), this.shape = this._makeShape(), this.computed(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
  }
  get domain() {
    return this._config.domain ? I(this._config.domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return this._config.image ? I(this._config.image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    const [t, e] = this._config.expressions, s = this.domain;
    this.image;
    function n(h, c) {
      const [l, u, f] = h;
      return `${c === 0 ? "M" : l} ${u ?? 0} ${f ?? 0}`;
    }
    const r = t.shape.array().filter((h) => {
      const c = h[1];
      return c !== void 0 && c >= s.min && c <= s.max;
    }).map(n);
    let o = [];
    return e ? o = [...e.shape.array()].filter((h) => {
      const c = h[1];
      return c !== void 0 && c >= s.min && c <= s.max;
    }).map(n).reverse() : o = [`m ${s.min} 0`], this.shape.plot(`${r.join(" ")} ${o.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
class Mr extends F {
  constructor(t, e, s) {
    super(t, e), this._config = Object.assign({}, s), this.shape = this._makeShape(), this.computed();
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t, this.computed();
  }
  get rectangles() {
    return this._config.rectangles;
  }
  set rectangles(t) {
    this._config.rectangles = t > 0 ? t : 10;
  }
  get position() {
    return this._config.position < 0 && (this._config.position = 0), this._config.position > 1 && (this._config.position = 1), this._config.position;
  }
  set position(t) {
    t < 0 && (t = 0), t > 1 && (t = 1), this._config.position = t;
  }
  _makeShape() {
    return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
  }
  computed() {
    this.shape.clear();
    const t = I(this._config.domain, this.graphConfig), s = (t.max - t.min) / this._config.rectangles, n = (this._config.domain.max - this._config.domain.min) / this._config.rectangles, r = this.graphConfig.origin.y;
    for (let o = 0; o < this._config.rectangles; o += 1) {
      const a = t.min + o * s, h = this._config.domain.min + (o + this.position) * n, c = this._config.follow.evaluate(h).y;
      this.shape.add(
        this.element.rect(s, Math.abs(r - c)).move(a, c)
      );
    }
    return this;
  }
  moveLabel() {
    return this;
  }
}
class Tr extends F {
  constructor(t, e, s) {
    super(t, e), s && (this._d = s, this.computed(), this._makeShape());
  }
  _d = "";
  get d() {
    return this._d;
  }
  set d(t) {
    this._d = t, this.shape.plot(this._d);
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
function Ar(i) {
  return i.reduce(
    (t, e, s, n) => s === 0 ? (
      // if first point
      `M ${e.point.x},${e.point.y}`
    ) : (
      // else
      `${t} ${Nr(e, s, n)}`
    ),
    ""
  );
}
function Or(i, t) {
  const e = t.point.x - i.point.x, s = t.point.y - i.point.y;
  return {
    length: Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)),
    angle: Math.atan2(s, e)
  };
}
function hi(i, t, e, s) {
  const n = t ?? i, r = e ?? i, o = i.controls.ratio ?? 0.2, a = Or(n, r);
  let h = a.angle + (s ? Math.PI : 0);
  const c = a.length * o;
  i.controls.type === W.VERTICAL || i.controls.type === W.DOWN ? h = Math.PI / 2 + (s ? Math.PI : 0) : i.controls.type === W.UP ? h = Math.PI / 2 + (s ? 0 : Math.PI) : i.controls.type === W.HORIZONTAL || i.controls.type === W.RIGHT ? h = s ? Math.PI : 0 : i.controls.type === W.LEFT && (h = s ? 0 : Math.PI);
  const l = i.point.x + Math.cos(h) * c, u = i.point.y + Math.sin(h) * c;
  return [l, u];
}
function Nr(i, t, e) {
  const [s, n] = hi(e[t - 1], e[t - 2], i), [r, o] = hi(i, e[t - 1], e[t + 1], !0);
  return `C ${s},${n} ${r},${o} ${i.point.x},${i.point.y}`;
}
class Ir extends F {
  constructor(t, e, s) {
    super(t, e), this._config = s, this._points = [], this.points = s.points, this._makeShape(), this.computed();
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t;
  }
  _points;
  get points() {
    return this._points;
  }
  set points(t) {
    const e = {
      type: W.SMOOTH,
      ratio: 0.2,
      left: null,
      right: null
    };
    this._points = t, this._points.forEach((s) => {
      s.controls = Object.assign({}, e, s.controls);
    });
  }
  computed() {
    const t = Ar(this._points);
    return this.shape.plot(t), this;
  }
  getPointByName(t) {
    return this._points.find((e) => e.point.name === t);
  }
  moveLabel() {
    if (!this.label)
      return this;
    throw new Error("Method not implemented.");
  }
  setControlRatio(t, e) {
    const s = this.getPointByName(t);
    return s && (s.controls.ratio = e), this;
  }
  setControlType(t, e) {
    const s = this.getPointByName(t);
    return s && (s.controls.type = e), this;
  }
  _makeShape() {
    return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
  }
}
var We = /* @__PURE__ */ ((i) => (i.RESET = "reset", i.REVERSE = "reverse", i.NONE = "none", i))(We || {});
class Er {
  _graph;
  _animatedPoints = [];
  _startTime = 0;
  _elapsedAtPause = 0;
  _paused = !1;
  _rafId = null;
  _animations = /* @__PURE__ */ new Map();
  constructor(t) {
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
      if (Y(t) && t.animate !== null) {
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
  _step = (t) => {
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
  };
}
function Lr(i) {
  return i === !0 || i === "1" || i === 1 ? "reset" : typeof i == "string" && Object.values(We).includes(i) ? i : "none";
}
class $r {
  _Animate = null;
  constructor(t, e) {
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.userSelect = "none", typeof t == "string" ? document.getElementById(t)?.appendChild(s) : t.appendChild(s);
    const n = e?.ppu ?? 50;
    return this._config = Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: Vt.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e), this._toTex = e?.tex ?? ((r) => r), this._display = Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e?.display), this._rootSVG = Gi().addTo(s).viewbox(0, 0, this._config.width, this._config.height), this._rootSVG.data("config", {
      width: this._config.width,
      height: this._config.height,
      origin: this._config.origin,
      // grids: this.#grids,
      axis: this._config.axis
    }), this._layers = {}, Object.values(Xi).forEach((r) => {
      this._layers[r] = this._rootSVG.group().attr("id", `LAYER_${r}`);
    }), this._figures = {}, this._makeLayout(), this;
  }
  _config;
  get config() {
    return this._config;
  }
  set config(t) {
    this._config = t;
  }
  _display;
  get display() {
    return this._display;
  }
  set display(t) {
    this._display = t;
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
      point: (t, e, s) => {
        let n = {};
        Y(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new b(
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
        const s = new V(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      path: (t, e) => {
        const s = new Tr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      bezier: (t, e) => {
        const s = new Ir(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      plot: (t, e) => {
        const s = new Ct(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new vr(this._rootSVG, e, t);
        return this._layers.plots.add(s.element), this._figures[e] = s, s;
      },
      circle: (t, e) => {
        const s = new Wt(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new xr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      arc: (t, e) => {
        const s = new wr(this._rootSVG, e, t);
        return this._layers.main.add(s.element), this._figures[e] = s, s;
      },
      follow: (t, e) => {
        const s = new Cr(this._rootSVG, e, t);
        return this._layers.plots_FG.add(s.element), this._figures[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new Sr(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new Mr(this._rootSVG, e, t);
        return this._layers.plots_BG.add(s.element), this._figures[e] = s, s;
      }
    };
  }
  get animation() {
    return this._Animate || (this._Animate = new Er(this)), this._Animate;
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), this._figures = {};
  }
  coordinate_system(t) {
    const e = new kr(
      this._rootSVG,
      "COORDINATE_SYSTEM",
      t
    );
    return this._layers.axis.add(e.element), e;
  }
  draggable(t, e) {
    const s = (n) => {
      const r = t, { box: o } = n.detail;
      let { x: a, y: h } = o;
      if (n.preventDefault(), a < 0 || a > this._config.width - o.width / 2 || h < 0 || h > this._config.height - o.height / 2)
        return;
      if (e?.follow?.length) {
        let u = { x: a, y: h };
        e.follow.forEach((f) => {
          f instanceof F ? u = f.follow(a, h) : typeof f == "string" ? u = this.follow(f, r)(a, h) : u = f(a, h), a = u.x, h = u.y;
        });
      }
      if (r.pixels.x === a && r.pixels.y === h)
        return;
      r.pixels = { x: a, y: h };
      const c = e?.target ?? null;
      c instanceof b && (c.pixels = { x: a, y: h }), e?.callback && e.callback(t);
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
    const s = new br(this._rootSVG, t, {
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
    return I(t, this.config, e);
  }
  toCoordinates(t, e) {
    return Mt(t, this.config, e);
  }
  // Update each figures in the graph
  update(t, e) {
    t ??= [], Object.keys(this.figures).forEach((s) => {
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
var Ui = (i) => {
  throw TypeError(i);
}, Ke = (i, t, e) => t.has(i) || Ui("Cannot " + e), B = (i, t, e) => (Ke(i, t, "read from private field"), e ? e.call(i) : t.get(i)), xt = (i, t, e) => t.has(i) ? Ui("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), J = (i, t, e, s) => (Ke(i, t, "write to private field"), t.set(i, e), e), de = (i, t, e) => (Ke(i, t, "access private method"), e);
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
function zr(i) {
  if (!i.includes("="))
    return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var ft, bt, nt, vt, wt, Lt, Yi, Oe;
class Dr {
  constructor(t) {
    xt(this, Lt), xt(this, ft), xt(this, bt, "->"), xt(this, nt, ","), xt(this, vt, "/"), xt(this, wt, []);
    var e, s, n;
    t && (J(this, ft, t.formatter ?? void 0), (e = t.splitter) != null && e.main && J(this, bt, t.splitter.main), (s = t.splitter) != null && s.entry && J(this, nt, t.splitter.entry), (n = t.splitter) != null && n.parameter && J(this, vt, t.splitter.parameter), t.keys && J(this, wt, t.keys));
  }
  get splitter() {
    return {
      main: B(this, bt),
      entry: B(this, nt),
      parameter: B(this, vt)
    };
  }
  set splitter_main(t) {
    J(this, bt, t);
  }
  set splitter_entry(t) {
    J(this, nt, t);
  }
  set splitter_parameter(t) {
    J(this, vt, t);
  }
  get formatter() {
    return B(this, ft);
  }
  set formatter(t) {
    J(this, ft, t);
  }
  get keys() {
    return B(this, wt);
  }
  set keys(t) {
    J(this, wt, t);
  }
  parse(t) {
    const [e, s] = t.split(B(this, bt)), n = B(this, ft) ? B(this, ft).call(this, e) : e.trim(), { name: r, key: o, values: a } = de(this, Lt, Yi).call(this, n), h = de(this, Lt, Oe).call(this, s);
    return { name: r, key: o, values: a, parameters: h };
  }
  parameters(t, e) {
    return de(this, Lt, Oe).call(this, t, e ?? B(this, wt));
  }
}
ft = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakSet(), Yi = function(i) {
  const [t, ...e] = i.split(" "), [s, n] = t.split("="), r = ge(
    e.join(" "),
    B(this, nt)
  ).map((o) => Et(o));
  return { name: s, key: n, values: r };
}, Oe = function(i, t) {
  if (i === void 0)
    return {};
  let e;
  if (t === void 0 || t.length === 0)
    e = ge(i, B(this, nt));
  else {
    const n = ge(i, B(this, nt)), r = t.map((o) => `${o}=`);
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
    const { key: r, value: o } = zr(n);
    if (/^[-.\d]+\/[-.\d]+$/.exec(o)) {
      s[r] = {
        value: Et(o),
        options: []
      };
      return;
    }
    const [a, ...h] = o.split(B(this, vt));
    s[r] = {
      value: Et(a),
      options: h.map((c) => Et(c))
    };
  }), s;
};
function Pr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof b && (r instanceof b || typeof r == "number"))
      return {
        create: "circle",
        config: { center: n, radius: r }
      };
  }
  return null;
}
function jr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.ARC.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof b && r instanceof b && o instanceof b)
      return {
        create: "arc",
        config: { start: n, center: r, end: o, radius: a }
      };
  }
  return null;
}
const ht = "line";
function it(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.LINE.toString() || i.key === C.SEGMENT.toString() || i.key === C.VECTOR.toString() || i.key === C.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof b && r instanceof b) {
      let o = "line";
      switch (i.key) {
        case C.SEGMENT.toString():
          o = "segment";
          break;
        case C.VECTOR.toString():
          o = "vector";
          break;
        case C.RAY.toString():
          o = "ray";
          break;
      }
      return {
        create: ht,
        config: {
          through: { A: n, B: r },
          shape: o
        }
      };
    }
  }
  if (i.key === C.LINE.toString() && s.length === 1)
    return {
      create: ht,
      config: {
        equation: s[0]
      }
    };
  if (i.key === C.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof b && r instanceof b)
      return {
        create: ht,
        config: { mediator: { A: n, B: r } }
      };
  }
  if (i.key === C.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof V && r instanceof b)
      return {
        create: ht,
        config: { perpendicular: { to: n, through: r } }
      };
  }
  if (i.key === C.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof V && r instanceof b)
      return {
        create: ht,
        config: { parallel: { to: n, through: r } }
      };
  }
  if (i.key === C.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof V && r instanceof V)
      return {
        create: ht,
        config: { bisector: { d1: n, d2: r } }
      };
  }
  if (i.key === C.BISECTOR.toString() && s.length === 3) {
    const [n, r, o] = s;
    if (r instanceof b && n instanceof b && o instanceof b)
      return {
        create: ht,
        config: { bisector: { A: r, B: n, C: o } }
      };
  }
  return null;
}
function Fr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.PLOT.toString()) {
    const [n, ...r] = s, o = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((c) => K(c));
    a.length > 0 && (o.domain = a[0]), a.length > 1 && (o.image = a[1]);
    const h = r.filter((c) => typeof c == "number");
    return h.length > 0 && (o.samples = h[0] > 0 ? h[0] : 10), {
      create: "plot",
      config: o
    };
  }
  return null;
}
function Vr(i, t, e) {
  const s = z(i.values.slice(0, 3), t);
  return s.every((r) => r instanceof b) ? {
    create: "plot",
    config: { expression: null, quadratic: s }
  } : null;
}
function qr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return {
        create: "parametric",
        config: { expressions: { x: n, y: r } }
      };
  }
  return null;
}
function Rr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof Ct)
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
function Br(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.FILL_BETWEEN.toString() && s.length >= 2) {
    const n = s[0], r = s[1] instanceof Ct ? s[1] : null, o = K(s[1]) ? s[1] : s[2], a = K(s[1]) ? s[2] : s[3];
    if (n instanceof Ct)
      return {
        create: "fillbetween",
        config: {
          expressions: r instanceof Ct ? [n, r] : [n],
          domain: K(o) ? o : { min: NaN, max: NaN },
          image: K(a) ? a : { min: NaN, max: NaN }
        }
      };
  }
  return null;
}
function Gr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.RIEMANN.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    return {
      create: "riemann",
      config: {
        follow: n,
        domain: K(r) ? r : { min: NaN, max: NaN },
        rectangles: typeof o == "number" ? o : 5,
        position: typeof a == "number" ? a : 0
      }
    };
  }
  return null;
}
const Xr = "point";
function ct(i, t, e) {
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
  const o = Hr(i, t);
  return o ? {
    create: Xr,
    config: Object.assign(o, { shape: s, size: n })
  } : null;
}
function Hr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.POINT.toString()) {
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
  if (i.key === C.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof b && r instanceof b)
      return { middle: { A: n, B: r } };
  }
  if (i.key === C.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof b && (r instanceof V || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === C.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof b && (r instanceof b || r instanceof V || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === C.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, o, a] = s;
    if (n instanceof b && (r instanceof V || r === "Ox" || r === "Oy") && typeof o == "number")
      return {
        direction: {
          direction: r,
          distance: o,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === C.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, o, a] = s;
    if (n instanceof b && r instanceof b)
      return {
        direction: {
          point: a instanceof b ? a : n,
          direction: { A: n, B: r },
          distance: typeof o == "number" ? o : 1
        }
      };
  }
  if (i.key === C.EVAL_FX.toString() && s.length >= 2) {
    const [n, r] = s;
    if (!(n instanceof Ct))
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
  const s = z(i.values, t);
  if (i.key === C.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof b))
      return {
        create: ci,
        config: { vertices: n }
      };
  }
  if (i.key === C.REGULAR.toString() && s.length >= 3) {
    const [n, r, o] = s;
    if (n instanceof b && (typeof r == "number" || r instanceof b) && typeof o == "number")
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
function Ur(i, t, e) {
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
            c = W.HORIZONTAL;
            break;
          case "V":
            c = W.VERTICAL;
            break;
          default:
            c = W.SMOOTH;
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
const Yr = "point";
function Wr(i, t, e) {
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
  const o = Kr(i, t);
  return o ? o.map((a) => ({
    create: Yr,
    config: Object.assign(a, { shape: s, size: n })
  })) : null;
}
function Kr(i, t, e) {
  const s = z(i.values, t);
  if (i.key === C.INTERSECTION.toString() && s.length >= 2) {
    const n = s[0], r = s[1];
    if ((n instanceof V || n === "Ox" || n === "Oy") && (r instanceof V || r === "Ox" || r === "Oy"))
      return [
        {
          intersection: { A: n, B: r }
        }
      ];
    if (n instanceof Wt && r instanceof V)
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
    build: ct
  },
  vpt: {
    name: "point from two points",
    description: "Create a point from a vector defined by two points and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: ct
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=dpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: ct
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: ct
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: ct
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line|circle>,<line|circle>",
    parameters: [],
    build: Wr
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: ct
  },
  eval: {
    name: "evaluate function",
    description: "Evaluate a funciton at a value",
    code: "A=eval f,3",
    parameters: [],
    build: ct
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: it
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: it
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: it
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: it
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: it
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: it
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: it
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
    build: it
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Pr
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: jr
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: Fr
  },
  quad: {
    name: "quad",
    description: "quadrativ plot through three points",
    code: "f=quad A,B,C[@<number>,<domain>,<image>]",
    parameters: [],
    build: Vr
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: qr
  },
  bezier: {
    name: "bezier",
    description: "bezier curve through points",
    code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
    parameters: [],
    build: Ur
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
    build: Rr
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: Br
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: Gr
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
class io extends $r {
  _parser;
  _settings;
  constructor(t, e) {
    return super(t, {
      tex: e?.tex ?? ((s) => s)
    }), this._parser = new Dr({
      formatter: (s) => this._parseKeyCode(s),
      keys: fi,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    }), this._settings = {}, e?.parameters && this.refreshLayout(e.parameters), this._code = [], e?.code && this._build(e.code), this;
  }
  _code;
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
  refresh(t) {
    this.clear(), this._build(t);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(t) {
    const e = this._parseLayout(t);
    this.config = e.config, this.display = e.display, this._settings = e.settings, this.updateLayout();
  }
  _applyDrag(t, e, s) {
    if (t instanceof b) {
      const n = [], r = [], o = this.create.point({ x: 0, y: 0 }, t.name + "_drag");
      o.pixels = t.pixels, o.asCircle(30).fill("white/0.8"), this.layers.interactive.add(o.element), [s[e].value, ...s[e].options].forEach((h) => {
        if (["grid", "Ox", "Oy"].includes(h) && n.push(this.follow(h, t)), K(h)) {
          const c = h.axis ?? "x", l = this.toPixels(h, c);
          n.push(
            (u, f) => ({
              x: c === "x" ? Math.max(l.min, Math.min(u, l.max)) : u,
              y: c === "y" ? Math.max(l.min, Math.min(f, l.max)) : f
            })
          );
        }
        if (Object.hasOwn(this.figures, h)) {
          const c = this.figures[h];
          r.push((l, u) => c.follow(l, u));
        }
      }), this.draggable(
        o,
        {
          target: t,
          follow: [
            ...n,
            ...r
          ]
        }
      );
    }
  }
  _applyOptions(t, e) {
    Object.keys(t).forEach((s) => {
      switch (s) {
        // Appearance
        case "w":
          e.stroke(t[s].value);
          break;
        case "ultrathin":
          e.stroke(0.5);
          break;
        case "thin":
          e.stroke(0.75);
          break;
        case "thick":
          e.stroke(2.5);
          break;
        case "ultrathick":
          e.stroke(4);
          break;
        case "color": {
          const n = t[s].value + (t[s].options.length > 0 ? `/${t[s].options[0]}` : "");
          e.stroke(n);
          break;
        }
        case "fill": {
          const n = t[s].value + (t[s].options.length > 0 ? `/${t[s].options[0]}` : "");
          e.fill(n);
          break;
        }
        case "dash": {
          t[s].value === !0 ? e.dash() : e.dash(t[s].value);
          break;
        }
        case "dot":
          e.dot();
          break;
        case "mark":
          e.mark(
            t[s].value,
            t[s].options
          );
          break;
        // Visibility
        case "hide":
          e.hide();
          break;
        case "!":
          e.element.children().forEach((n) => {
            n.attr("id") !== `${e.name}-label` && n.hide();
          });
          break;
        case "_":
        case "static":
          e.static = t[s].value;
          break;
        case "?":
          e.label?.hide();
          break;
        // Placement
        case "move":
          e.move(t[s].value);
          break;
        case "scale":
          e.scale(t[s].value);
          break;
        // Label and text
        case "label":
        case "tex": {
          let n = e.name;
          if (typeof t[s].value == "string" && (n = t[s].value), s === "tex" && n.length === 2 && !isNaN(+n[1]) && (n = n[0] + "_" + n[1]), e.addLabel(
            n,
            s === "tex",
            this.toTex
          ), e.label) {
            const r = t[s].options[0] === !1 || t[s].options[0] === !0 ? "br" : t[s].options[0], o = t[s].options[1] ?? { x: 0, y: 0 }, a = {
              x: o.x * this.config.axis.x.x,
              y: -o.y * this.config.axis.y.y
            }, h = t[s].options[2];
            e.label.auto_rotate = h === !0, e.label.position(
              r,
              a,
              typeof h == "number" ? h : 0
            );
          }
          break;
        }
        // Draggable
        case "drag":
          this._applyDrag(e, s, t);
          break;
        // Animation
        case "animate": {
          const n = {
            from: null,
            to: null,
            duration: 2,
            delay: 0,
            easing: "linear",
            loop: We.NONE
          };
          if (Object.hasOwn(t, "from")) {
            const r = t.from.value;
            Object.hasOwn(this.figures, r) && this.figures[r] instanceof b && (n.from = this.figures[r]);
          }
          if (Object.hasOwn(t, "to")) {
            const r = t.to.value;
            Object.hasOwn(this.figures, r) && this.figures[r] instanceof b && (n.to = this.figures[r]);
          }
          Object.hasOwn(t, "duration") && (n.duration = t.duration.value), Object.hasOwn(t, "delay") && (n.delay = t.delay.value), Object.hasOwn(t, "easing") && (n.easing = t.easing.value), Object.hasOwn(t, "loop") && (n.loop = Lr(t.loop.value)), e.animate = n;
          break;
        }
        default:
          yr.includes(s) && e.stroke(s);
      }
    });
  }
  /**
   * Build the figures from the code
   */
  _build(t) {
    this._code = this._prepare(t);
    const e = ui;
    this._code.forEach((s) => {
      s.name = this._uniqueName(s.name);
      let n;
      if (Object.hasOwn(e, s.key)) {
        const { build: r, parameters: o } = e[s.key];
        o && o.length > 0 && Object.keys(s.parameters).length === 0 && Object.keys(s.parameters).filter((c) => o.includes(c)).forEach((c) => {
          s.parameters[c] = { value: !0, options: [] };
        });
        let a = r(s, this.figures, this.config);
        a && (Array.isArray(a) || (a = [a]), a.forEach((h, c) => {
          try {
            const { config: l, create: u } = h;
            l && u && (n = this.create[u](l, s.name + (a.length > 1 ? `${c + 1}` : "")));
          } catch (l) {
            console.error(l);
          }
          n && this._buildOptions(n, s);
        }));
      }
    }), this.updateLabels([]);
  }
  _buildOptions(t, e) {
    this._settings.label && t instanceof b && e.parameters.label === void 0 && e.parameters.tex === void 0 && (e.parameters.label = { value: !0, options: [] }), this._settings.tex && t instanceof b && e.parameters.label === void 0 && e.parameters.tex === void 0 && (e.parameters.tex = { value: !0, options: [] }), t instanceof b && this._settings.points === !1 && (e.parameters["!"] = { value: !0, options: [] }), this._applyOptions(e.parameters, t);
  }
  _defineCommand(t) {
    const [e, s] = t.slice(1).split(":");
    return { key: s, value: e === "begin" };
  }
  _parseKeyCode(t) {
    return /^[A-Z][0-9]*\(.*\)$/.exec(t) ? this._parseKeyCodePoint(t) : /^[a-z][0-9]*\([x|t]\)/.exec(t) ? this._parseKeyCodePlot(t) : t.includes("=") && !t.includes(" ") ? this._parseKeyCodeLine(t) : t;
  }
  // TO BE MOVED TO BUILD_LINE
  _parseKeyCodeLine(t) {
    const [e, ...s] = t.split("=");
    let n = s.join("="), r = n[0];
    r !== "v" && r !== "[" && (r = null);
    let o = n[n.length - 1];
    o !== "." && o !== "]" && o !== "[" && (o = null);
    let a = "line";
    r === "v" && o === null ? (n = n.slice(1), a = "vec") : r === null && o === "." || r === "[" && o === "]" ? (r === "[" && (n = n.slice(1)), n = n.slice(0, -1), a = "seg") : (r === "[" && o === "[" || r === null && o === "[" || r === "[" && o === null) && (r === "[" && (n = n.slice(1)), o === "[" && (n = n.slice(0, -1)), a = "ray");
    const h = n.split(/(?=[A-Z])/);
    return `${e}=${a} ${h[0]},${h[1]}`;
  }
  // TO BE MOVED TO BUILD_PLOT
  _parseKeyCodePlot(t) {
    const [e, s] = t.split("="), n = e.split("(")[0], r = t.includes("(x)=") ? C.PLOT : C.PARAMETRIC;
    return `${n}=${r} ${s}`;
  }
  // TO BE MOVED TO BUILD_POINT
  _parseKeyCodePoint(t) {
    const e = t.split("(")[0], s = t.split("(")[1].split(")")[0].split(",");
    return `${e}=pt ${s[0]},${s[1]}`;
  }
  _parseLayout(t) {
    const e = this._parser.parameters(t ?? "", fi), s = e.x && K(e.x.value) ? e.x.value : { min: -8, max: 8 }, n = e.y && K(e.y.value) ? e.y.value : { min: -8, max: 8 }, r = Math.abs(s.max - s.min), o = Math.abs(n.max - n.min), a = this.rootSVG.node.getBoundingClientRect();
    let h = Math.max(Math.round(a.width / r), 20);
    Object.hasOwn(e, "ppu") && !isNaN(+e.ppu.value) && (h = parseFloat(e.ppu.value));
    const c = e.unitX ? parseFloat(e.unitX.value) : 1, l = e.unitY ? parseFloat(e.unitY.value) : 1, u = r * h, f = o * h, x = {
      x: -s.min * h,
      y: n.max * h
    }, _ = Vt.CARTESIAN_2D, v = {
      x: { x: h * c, y: 0 },
      y: { x: 0, y: -h * l }
    };
    let g = Object.hasOwn(e, "grid") ? e.grid.value : !1;
    if (typeof g == "string" && g.includes("pi")) {
      const H = g === "pi" ? 1 : +g.split("pi")[0], P = e.grid.options.length && Number.isSafeInteger(+e.grid.options[0]) ? e.grid.options[0] : 2;
      g = { x: H * Math.PI / P, y: 1 };
    }
    const T = !!e.axis, L = e.subgrid ? parseFloat(e.subgrid.value) : 0, D = {
      label: !!e.label,
      tex: !!e.tex,
      points: e["no-points"] ? !1 : e.points ? e.points.value : "o"
    };
    return {
      config: {
        width: u,
        height: f,
        origin: x,
        system: _,
        axis: v
      },
      display: {
        grid: g,
        subgrid: L,
        axis: T
      },
      settings: D
    };
  }
  /**
   * Prepare the code to load
   * @param input Input code to parse and prepare
   * @returns
   */
  _prepare(t) {
    const e = [], s = t.split(`
`).map((r) => r.trim()).filter((r) => r.trim() !== "" && !r.startsWith("$")), n = {};
    for (const r of s) {
      if (r.startsWith("@")) {
        const { key: a, value: h } = this._defineCommand(r);
        n[a] = { value: h, options: [] };
        continue;
      }
      const o = this._parser.parse(r);
      o.parameters = Object.assign(
        o.parameters,
        n
      ), e.push(o);
    }
    return e;
  }
  _uniqueName(t) {
    let e = t, s = 1;
    for (; this.figures[e]; )
      e = `${t}_${s}`, s++;
    return e;
  }
}
export {
  hr as AXIS,
  W as BEZIERCONTROL,
  Vt as COORDINATE_SYSTEM,
  Xi as LAYER_NAME,
  lr as LINECONSTRAINT,
  cr as POINTCONSTRAINT,
  ur as POLYGON_CONSTRAINT,
  io as PiDraw,
  $r as PiGraph,
  K as isDOMAIN,
  Y as isXY
};
//# sourceMappingURL=pidraw.js.map
