var ar = Object.defineProperty;
var js = (i) => {
  throw TypeError(i);
};
var cr = (i, t, e) => t in i ? ar(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var nt = (i, t, e) => cr(i, typeof t != "symbol" ? t + "" : t, e), Ri = (i, t, e) => t.has(i) || js("Cannot " + e);
var o = (i, t, e) => (Ri(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? js("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), f = (i, t, e, s) => (Ri(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), b = (i, t, e) => (Ri(i, t, "access private method"), e);
const Yi = {}, tn = [];
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
  en(Object.getOwnPropertyNames(t)), Yi[i] = Object.assign(Yi[i] || {}, t);
}
function at(i) {
  return Yi[i] || {};
}
function ur() {
  return [...new Set(tn)];
}
function en(i) {
  tn.push(...i);
}
function ys(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    n.push(t(i[e]));
  return n;
}
function lr(i, t) {
  let e;
  const s = i.length, n = [];
  for (e = 0; e < s; e++)
    t(i[e]) && n.push(i[e]);
  return n;
}
function Bi(i) {
  return i % 360 * Math.PI / 180;
}
function fr(i) {
  return i.replace(/([A-Z])/g, function(t, e) {
    return "-" + e.toLowerCase();
  });
}
function sn(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Fe(i, t, e, s) {
  return (t == null || e == null) && (s = s || i.bbox(), t == null ? t = s.width / s.height * e : e == null && (e = s.height / s.width * t)), {
    width: t,
    height: e
  };
}
function Wi(i, t) {
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
const dr = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Zi = (i) => dr.has(i.nodeName), nn = (i, t, e = {}) => {
  const s = { ...t };
  for (const n in s)
    s[n].valueOf() === e[n] && delete s[n];
  Object.keys(s).length ? i.node.setAttribute("data-svgjs", JSON.stringify(s)) : (i.node.removeAttribute("data-svgjs"), i.node.removeAttribute("svgjs:data"));
}, xs = "http://www.w3.org/2000/svg", pr = "http://www.w3.org/1999/xhtml", Fi = "http://www.w3.org/2000/xmlns/", ai = "http://www.w3.org/1999/xlink", A = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function mr() {
  return A.window;
}
class bs {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const fe = {}, ws = "___SYMBOL___ROOT___";
function We(i, t = xs) {
  return A.document.createElementNS(t, i);
}
function it(i, t = !1) {
  if (i instanceof bs) return i;
  if (typeof i == "object")
    return qi(i);
  if (i == null)
    return new fe[ws]();
  if (typeof i == "string" && i.charAt(0) !== "<")
    return qi(A.document.querySelector(i));
  const e = t ? A.document.createElement("div") : We("svg");
  return e.innerHTML = i, i = qi(e.firstChild), e.removeChild(e.firstChild), i;
}
function P(i, t) {
  return t && (t instanceof A.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : We(i);
}
function mt(i) {
  if (!i) return null;
  if (i.instance instanceof bs) return i.instance;
  if (i.nodeName === "#document-fragment")
    return new fe.Fragment(i);
  let t = sn(i.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : fe[t] || (t = "Dom"), new fe[t](i);
}
let qi = mt;
function S(i, t = i.name, e = !1) {
  return fe[t] = i, e && (fe[ws] = i), en(Object.getOwnPropertyNames(i.prototype)), i;
}
function gr(i) {
  return fe[i];
}
let yr = 1e3;
function rn(i) {
  return "Svgjs" + sn(i) + yr++;
}
function on(i) {
  for (let t = i.children.length - 1; t >= 0; t--)
    on(i.children[t]);
  return i.id && (i.id = rn(i.nodeName)), i;
}
function v(i, t) {
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
function xr() {
  return this.parent().children();
}
function br() {
  return this.parent().index(this);
}
function wr() {
  return this.siblings()[this.position() + 1];
}
function _r() {
  return this.siblings()[this.position() - 1];
}
function vr() {
  const i = this.position();
  return this.parent().add(this.remove(), i + 1), this;
}
function kr() {
  const i = this.position();
  return this.parent().add(this.remove(), i ? i - 1 : 0), this;
}
function Cr() {
  return this.parent().add(this.remove()), this;
}
function Mr() {
  return this.parent().add(this.remove(), 0), this;
}
function Or(i) {
  i = it(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t), this;
}
function Tr(i) {
  i = it(i), i.remove();
  const t = this.position();
  return this.parent().add(i, t + 1), this;
}
function Ar(i) {
  return i = it(i), i.before(this), this;
}
function Sr(i) {
  return i = it(i), i.after(this), this;
}
_("Dom", {
  siblings: xr,
  position: br,
  next: wr,
  prev: _r,
  forward: vr,
  backward: kr,
  front: Cr,
  back: Mr,
  before: Or,
  after: Tr,
  insertBefore: Ar,
  insertAfter: Sr
});
const hn = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, Nr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, Er = /rgb\((\d+),(\d+),(\d+)\)/, Ir = /(#[a-z_][a-z0-9\-_]*)/i, Lr = /\)\s*,?\s*/, $r = /\s/g, Ps = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Rs = /^rgb\(/, Bs = /^(\s+)?$/, Fs = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, zr = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, qt = /[\s,]+/, _s = /[MLHVCSQTAZ]/i;
function Dr() {
  const i = this.attr("class");
  return i == null ? [] : i.trim().split(qt);
}
function jr(i) {
  return this.classes().indexOf(i) !== -1;
}
function Pr(i) {
  if (!this.hasClass(i)) {
    const t = this.classes();
    t.push(i), this.attr("class", t.join(" "));
  }
  return this;
}
function Rr(i) {
  return this.hasClass(i) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== i;
    }).join(" ")
  ), this;
}
function Br(i) {
  return this.hasClass(i) ? this.removeClass(i) : this.addClass(i);
}
_("Dom", {
  classes: Dr,
  hasClass: jr,
  addClass: Pr,
  removeClass: Rr,
  toggleClass: Br
});
function Fr(i, t) {
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
          i[s] == null || Bs.test(i[s]) ? "" : i[s]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    i,
    t == null || Bs.test(t) ? "" : t
  ), this;
}
function qr() {
  return this.css("display", "");
}
function Vr() {
  return this.css("display", "none");
}
function Gr() {
  return this.css("display") !== "none";
}
_("Dom", {
  css: Fr,
  show: qr,
  hide: Vr,
  visible: Gr
});
function Xr(i, t, e) {
  if (i == null)
    return this.data(
      ys(
        lr(
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
_("Dom", { data: Xr });
function Hr(i, t) {
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
function Ur() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let i = arguments.length - 1; i >= 0; i--)
      delete this.memory()[arguments[i]];
  return this;
}
function Yr() {
  return this._memory = this._memory || {};
}
_("Dom", { remember: Hr, forget: Ur, memory: Yr });
function Wr(i) {
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
function Zr(i) {
  const t = Math.round(i), s = Math.max(0, Math.min(255, t)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function ye(i, t) {
  for (let e = t.length; e--; )
    if (i[t[e]] == null)
      return !1;
  return !0;
}
function Kr(i, t) {
  const e = ye(i, "rgb") ? { _a: i.r, _b: i.g, _c: i.b, _d: 0, space: "rgb" } : ye(i, "xyz") ? { _a: i.x, _b: i.y, _c: i.z, _d: 0, space: "xyz" } : ye(i, "hsl") ? { _a: i.h, _b: i.s, _c: i.l, _d: 0, space: "hsl" } : ye(i, "lab") ? { _a: i.l, _b: i.a, _c: i.b, _d: 0, space: "lab" } : ye(i, "lch") ? { _a: i.l, _b: i.c, _c: i.h, _d: 0, space: "lch" } : ye(i, "cmyk") ? { _a: i.c, _b: i.m, _c: i.y, _d: i.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return e.space = t || e.space, e;
}
function Qr(i) {
  return i === "lab" || i === "xyz" || i === "lch";
}
function Vi(i, t, e) {
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
    const { random: s, round: n, sin: r, PI: h } = Math;
    if (t === "vibrant") {
      const a = 24 * s() + 57, c = 38 * s() + 45, u = 360 * s();
      return new $(a, c, u, "lch");
    } else if (t === "sine") {
      e = e ?? s();
      const a = n(80 * r(2 * h * e / 0.5 + 0.01) + 150), c = n(50 * r(2 * h * e / 0.5 + 4.6) + 200), u = n(100 * r(2 * h * e / 0.5 + 2.3) + 150);
      return new $(a, c, u);
    } else if (t === "pastel") {
      const a = 8 * s() + 86, c = 17 * s() + 9, u = 360 * s();
      return new $(a, c, u, "lch");
    } else if (t === "dark") {
      const a = 10 + 10 * s(), c = 50 * s() + 86, u = 360 * s();
      return new $(a, c, u, "lch");
    } else if (t === "rgb") {
      const a = 255 * s(), c = 255 * s(), u = 255 * s();
      return new $(a, c, u);
    } else if (t === "lab") {
      const a = 100 * s(), c = 256 * s() - 128, u = 256 * s() - 128;
      return new $(a, c, u, "lab");
    } else if (t === "grey") {
      const a = 255 * s();
      return new $(a, a, a);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (Ps.test(t) || Rs.test(t));
  }
  cmyk() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((m) => m / 255), a = Math.min(1 - n, 1 - r, 1 - h);
    if (a === 1)
      return new $(0, 0, 0, 1, "cmyk");
    const c = (1 - n - a) / (1 - a), u = (1 - r - a) / (1 - a), l = (1 - h - a) / (1 - a);
    return new $(c, u, l, a, "cmyk");
  }
  hsl() {
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((M) => M / 255), a = Math.max(n, r, h), c = Math.min(n, r, h), u = (a + c) / 2, l = a === c, d = a - c, m = l ? 0 : u > 0.5 ? d / (2 - a - c) : d / (a + c), y = l ? 0 : a === n ? ((r - h) / d + (r < h ? 6 : 0)) / 6 : a === r ? ((h - n) / d + 2) / 6 : a === h ? ((n - r) / d + 4) / 6 : 0;
    return new $(360 * y, 100 * m, 100 * u, "hsl");
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
      const d = Kr(t, e);
      Object.assign(this, d);
    } else if (typeof t == "string")
      if (Rs.test(t)) {
        const d = t.replace($r, ""), [m, y, k] = Er.exec(d).slice(1, 4).map((M) => parseInt(M));
        Object.assign(this, { _a: m, _b: y, _c: k, _d: 0, space: "rgb" });
      } else if (Ps.test(t)) {
        const d = (M) => parseInt(M, 16), [, m, y, k] = Nr.exec(Wr(t)).map(d);
        Object.assign(this, { _a: m, _b: y, _c: k, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: h, _b: a, _c: c, _d: u } = this, l = this.space === "rgb" ? { r: h, g: a, b: c } : this.space === "xyz" ? { x: h, y: a, z: c } : this.space === "hsl" ? { h, s: a, l: c } : this.space === "lab" ? { l: h, a, b: c } : this.space === "lch" ? { l: h, c: a, h: c } : this.space === "cmyk" ? { c: h, m: a, y: c, k: u } : {};
    Object.assign(this, l);
  }
  lab() {
    const { x: t, y: e, z: s } = this.xyz(), n = 116 * e - 16, r = 500 * (t - e), h = 200 * (e - s);
    return new $(n, r, h, "lab");
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
    if (Qr(this.space)) {
      let { x: t, y: e, z: s } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: y, a: k, b: M } = this;
        if (this.space === "lch") {
          const { c: dt, h: mi } = this, gi = Math.PI / 180;
          k = dt * Math.cos(gi * mi), M = dt * Math.sin(gi * mi);
        }
        const O = (y + 16) / 116, z = k / 500 + O, Y = O - M / 200, Z = 16 / 116, Ct = 8856e-6, Mt = 7.787;
        t = 0.95047 * (z ** 3 > Ct ? z ** 3 : (z - Z) / Mt), e = 1 * (O ** 3 > Ct ? O ** 3 : (O - Z) / Mt), s = 1.08883 * (Y ** 3 > Ct ? Y ** 3 : (Y - Z) / Mt);
      }
      const n = t * 3.2406 + e * -1.5372 + s * -0.4986, r = t * -0.9689 + e * 1.8758 + s * 0.0415, h = t * 0.0557 + e * -0.204 + s * 1.057, a = Math.pow, c = 31308e-7, u = n > c ? 1.055 * a(n, 1 / 2.4) - 0.055 : 12.92 * n, l = r > c ? 1.055 * a(r, 1 / 2.4) - 0.055 : 12.92 * r, d = h > c ? 1.055 * a(h, 1 / 2.4) - 0.055 : 12.92 * h;
      return new $(255 * u, 255 * l, 255 * d);
    } else if (this.space === "hsl") {
      let { h: t, s: e, l: s } = this;
      if (t /= 360, e /= 100, s /= 100, e === 0)
        return s *= 255, new $(s, s, s);
      const n = s < 0.5 ? s * (1 + e) : s + e - s * e, r = 2 * s - n, h = 255 * Vi(r, n, t + 1 / 3), a = 255 * Vi(r, n, t), c = 255 * Vi(r, n, t - 1 / 3);
      return new $(h, a, c);
    } else if (this.space === "cmyk") {
      const { c: t, m: e, y: s, k: n } = this, r = 255 * (1 - Math.min(1, t * (1 - n) + n)), h = 255 * (1 - Math.min(1, e * (1 - n) + n)), a = 255 * (1 - Math.min(1, s * (1 - n) + n));
      return new $(r, h, a);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: e, _c: s, _d: n, space: r } = this;
    return [t, e, s, n, r];
  }
  toHex() {
    const [t, e, s] = this._clamped().map(Zr);
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
    const { _a: t, _b: e, _c: s } = this.rgb(), [n, r, h] = [t, e, s].map((z) => z / 255), a = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, c = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, u = h > 0.04045 ? Math.pow((h + 0.055) / 1.055, 2.4) : h / 12.92, l = (a * 0.4124 + c * 0.3576 + u * 0.1805) / 0.95047, d = (a * 0.2126 + c * 0.7152 + u * 0.0722) / 1, m = (a * 0.0193 + c * 0.1192 + u * 0.9505) / 1.08883, y = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, k = d > 8856e-6 ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116, M = m > 8856e-6 ? Math.pow(m, 1 / 3) : 7.787 * m + 16 / 116;
    return new $(y, k, M, "xyz");
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
let W = class an {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new an(this);
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
function Jr(i, t) {
  return new W(i, t).transformO(this.screenCTM().inverseO());
}
function xe(i, t, e) {
  return Math.abs(t - i) < 1e-6;
}
class x {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const e = t.flip === "both" || t.flip === !0, s = t.flip && (e || t.flip === "x") ? -1 : 1, n = t.flip && (e || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, h = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, a = t.scale && t.scale.length ? t.scale[0] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleX) ? t.scaleX * s : s, c = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n, u = t.shear || 0, l = t.rotate || t.theta || 0, d = new W(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), m = d.x, y = d.y, k = new W(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), M = k.x, O = k.y, z = new W(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), Y = z.x, Z = z.y, Ct = new W(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Mt = Ct.x, dt = Ct.y;
    return {
      scaleX: a,
      scaleY: c,
      skewX: r,
      skewY: h,
      shear: u,
      theta: l,
      rx: Mt,
      ry: dt,
      tx: Y,
      ty: Z,
      ox: m,
      oy: y,
      px: M,
      py: O
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
    const s = this.a, n = this.b, r = this.c, h = this.d, a = this.e, c = this.f, u = s * h - n * r, l = u > 0 ? 1 : -1, d = l * Math.sqrt(s * s + n * n), m = Math.atan2(l * n, l * s), y = 180 / Math.PI * m, k = Math.cos(m), M = Math.sin(m), O = (s * r + n * h) / u, z = r * d / (O * s - n) || h * d / (O * n + s), Y = a - t + t * k * d + e * (O * k * d - M * z), Z = c - e + t * M * d + e * (O * M * d + k * z);
    return {
      // Return the affine parameters
      scaleX: d,
      scaleY: z,
      shear: O,
      rotate: y,
      translateX: Y,
      translateY: Z,
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
    return xe(this.a, e.a) && xe(this.b, e.b) && xe(this.c, e.c) && xe(this.d, e.d) && xe(this.e, e.e) && xe(this.f, e.f);
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
    return t = t instanceof kt ? t.matrixify() : typeof t == "string" ? x.fromArray(t.split(qt).map(parseFloat)) : Array.isArray(t) ? x.fromArray(t) : typeof t == "object" && x.isMatrixLike(t) ? t : typeof t == "object" ? new x().transform(t) : arguments.length === 6 ? x.fromArray([].slice.call(arguments)) : e, this.a = t.a != null ? t.a : e.a, this.b = t.b != null ? t.b : e.b, this.c = t.c != null ? t.c : e.c, this.d = t.d != null ? t.d : e.d, this.e = t.e != null ? t.e : e.e, this.f = t.f != null ? t.f : e.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, e = this.b, s = this.c, n = this.d, r = this.e, h = this.f, a = t * n - e * s;
    if (!a) throw new Error("Cannot invert " + this);
    const c = n / a, u = -e / a, l = -s / a, d = t / a, m = -(c * r + l * h), y = -(u * r + d * h);
    return this.a = c, this.b = u, this.c = l, this.d = d, this.e = m, this.f = y, this;
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
    t = Bi(t);
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
    arguments.length === 3 && (n = s, s = e, e = t), t = Bi(t), e = Bi(e);
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
function to() {
  return new x(this.node.getCTM());
}
function eo() {
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
S(x, "Matrix");
function Gt() {
  if (!Gt.nodes) {
    const i = it().size(2, 0);
    i.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), i.attr("focusable", "false"), i.attr("aria-hidden", "true");
    const t = i.path().node;
    Gt.nodes = { svg: i, path: t };
  }
  if (!Gt.nodes.svg.node.parentNode) {
    const i = A.document.body || A.document.documentElement;
    Gt.nodes.svg.addTo(i);
  }
  return Gt.nodes;
}
function cn(i) {
  return !i.width && !i.height && !i.x && !i.y;
}
function io(i) {
  return i === A.document || (A.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === A.document;
  }).call(A.document.documentElement, i);
}
class Q {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += A.window.pageXOffset, this.y += A.window.pageYOffset, new Q(this);
  }
  init(t) {
    const e = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(qt).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : e, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return cn(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const e = Math.min(this.x, t.x), s = Math.min(this.y, t.y), n = Math.max(this.x + this.width, t.x + t.width) - e, r = Math.max(this.y + this.height, t.y + t.height) - s;
    return new Q(e, s, n, r);
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
    }), new Q(e, n, s - e, r - n);
  }
}
function un(i, t, e) {
  let s;
  try {
    if (s = t(i.node), cn(s) && !io(i.node))
      throw new Error("Element not in the dom");
  } catch {
    s = e(i);
  }
  return s;
}
function so() {
  const e = un(this, (n) => n.getBBox(), (n) => {
    try {
      const r = n.clone().addTo(Gt().svg).show(), h = r.node.getBBox();
      return r.remove(), h;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${n.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new Q(e);
}
function no(i) {
  const s = un(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), n = new Q(s);
  return i ? n.transform(i.screenCTM().inverseO()) : n.addOffset();
}
function ro(i, t) {
  const e = this.bbox();
  return i > e.x && t > e.y && i < e.x + e.width && t < e.y + e.height;
}
_({
  viewbox: {
    viewbox(i, t, e, s) {
      return i == null ? new Q(this.attr("viewBox")) : this.attr("viewBox", new Q(i, t, e, s));
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
      const u = new Q(n).transform(
        new x({ scale: c, origin: t })
      );
      return this.viewbox(u);
    }
  }
});
S(Q, "Box");
class pe extends Array {
  constructor(t = [], ...e) {
    if (super(t, ...e), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
v([pe], {
  each(i, ...t) {
    return typeof i == "function" ? this.map((e, s, n) => i.call(e, e, s, n)) : this.map((e) => e[i](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const oo = ["toArray", "constructor", "each"];
pe.extend = function(i) {
  i = i.reduce((t, e) => (oo.includes(e) || e[0] === "_" || (e in Array.prototype && (t["$" + e] = Array.prototype[e]), t[e] = function(...s) {
    return this.each(e, ...s);
  }), t), {}), v([pe], i);
};
function qe(i, t) {
  return new pe(
    ys((t || A.document).querySelectorAll(i), function(e) {
      return mt(e);
    })
  );
}
function ho(i) {
  return qe(i, this.node);
}
function ao(i) {
  return mt(this.node.querySelector(i));
}
let co = 0;
const ln = {};
function fn(i) {
  let t = i.getEventHolder();
  return t === A.window && (t = ln), t.events || (t.events = {}), t.events;
}
function vs(i) {
  return i.getEventTarget();
}
function uo(i) {
  let t = i.getEventHolder();
  t === A.window && (t = ln), t.events && (t.events = {});
}
function Ze(i, t, e, s, n) {
  const r = e.bind(s || i), h = it(i), a = fn(h), c = vs(h);
  t = Array.isArray(t) ? t : t.split(qt), e._svgjsListenerId || (e._svgjsListenerId = ++co), t.forEach(function(u) {
    const l = u.split(".")[0], d = u.split(".")[1] || "*";
    a[l] = a[l] || {}, a[l][d] = a[l][d] || {}, a[l][d][e._svgjsListenerId] = r, c.addEventListener(l, r, n || !1);
  });
}
function $t(i, t, e, s) {
  const n = it(i), r = fn(n), h = vs(n);
  typeof e == "function" && (e = e._svgjsListenerId, !e) || (t = Array.isArray(t) ? t : (t || "").split(qt), t.forEach(function(a) {
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
          $t(h, [c, u].join("."), d);
        delete r[c][u];
      }
    } else if (u)
      for (a in r)
        for (l in r[a])
          u === l && $t(h, [a, u].join("."));
    else if (c) {
      if (r[c]) {
        for (l in r[c])
          $t(h, [c, l].join("."));
        delete r[c];
      }
    } else {
      for (a in r)
        $t(h, a);
      uo(n);
    }
  }));
}
function lo(i, t, e, s) {
  const n = vs(i);
  return t instanceof A.window.Event || (t = new A.window.CustomEvent(t, {
    detail: e,
    cancelable: !0,
    ...s
  })), n.dispatchEvent(t), t;
}
class ci extends bs {
  addEventListener() {
  }
  dispatch(t, e, s) {
    return lo(this, t, e, s);
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
    return $t(this, t, e, s), this;
  }
  // Bind given event to listener
  on(t, e, s, n) {
    return Ze(this, t, e, s, n), this;
  }
  removeEventListener() {
  }
}
S(ci, "EventTarget");
function qs() {
}
const Xe = {
  duration: 400,
  ease: ">",
  delay: 0
}, fo = {
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
class Re extends Array {
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
    return t instanceof Array ? t : t.trim().split(qt).map(parseFloat);
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
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (e = t.match(hn), e && (this.value = parseFloat(e[1]), e[5] === "%" ? this.value /= 100 : e[5] === "s" && (this.value *= 1e3), this.unit = e[5])) : t instanceof w && (this.value = t.valueOf(), this.unit = t.unit), this;
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
const po = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), dn = [];
function mo(i) {
  dn.push(i);
}
function go(i, t, e) {
  if (i == null) {
    i = {}, t = this.node.attributes;
    for (const s of t)
      i[s.nodeName] = Fs.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
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
        return t = this.node.getAttribute(i), t == null ? fo[i] : Fs.test(t) ? parseFloat(t) : t;
      t = dn.reduce((s, n) => n(i, s, this), t), typeof t == "number" ? t = new w(t) : po.has(i) && $.isColor(t) ? t = new $(t) : t.constructor === Array && (t = new Re(t)), i === "leading" ? this.leading && this.leading(t) : typeof e == "string" ? this.node.setAttributeNS(e, i, t.toString()) : this.node.setAttribute(i, t.toString()), this.rebuild && (i === "font-size" || i === "x") && this.rebuild();
    }
  }
  return this;
}
class te extends ci {
  constructor(t, e) {
    super(), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }
  // Add given element at a position
  add(t, e) {
    return t = it(t), t.removeNamespace && this.node instanceof A.window.SVGElement && t.removeNamespace(), e == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }
  // Add element to given container and return self
  addTo(t, e) {
    return it(t).put(this, e);
  }
  // Returns all child elements
  children() {
    return new pe(
      ys(this.node.children, function(t) {
        return mt(t);
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
    return e && (s = on(s)), new this.constructor(s);
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
    return this.put(new te(We(t), e));
  }
  // Get first child
  first() {
    return mt(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return mt(this.node.childNodes[t]);
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
    return this.xml(t, e, pr);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = rn(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return mt(this.node.lastChild);
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
    if (e = mt(e.node.parentNode), !t) return e;
    do
      if (typeof t == "string" ? e.matches(t) : e instanceof t)
        return e;
    while (e = mt(e.node.parentNode));
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
    return this.xml(t, e, xs);
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
        if (a = mt(a.node.cloneNode(!0)), e) {
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
    const n = We("wrapper", s), r = A.document.createDocumentFragment();
    n.innerHTML = t;
    for (let a = n.children.length; a--; )
      r.appendChild(n.firstElementChild);
    const h = this.parent();
    return e ? this.replace(r) && h : this.add(r);
  }
}
v(te, { attr: go, find: ho, findOne: ao });
S(te, "Dom");
class kt extends te {
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
    const s = new pe();
    let n = this;
    for (; (n = n.parent()) && n.node !== A.document && n.nodeName !== "#document-fragment" && (s.push(n), !(!e && n.node === t.node || e && n.matches(t))); )
      if (n.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const e = (t + "").match(Ir);
    return e ? it(e[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(gr(ws));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Fe(this, t, e);
    return this.width(new w(s.width)).height(new w(s.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return nn(this, this.dom), super.writeDataToDom();
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
v(kt, {
  bbox: so,
  rbox: no,
  inside: ro,
  point: Jr,
  ctm: to,
  screenCTM: eo
});
S(kt, "Element");
const Ge = {
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
    if (typeof s == "string" || s instanceof $ || $.isRgb(s) || s instanceof kt)
      this.attr(i, s);
    else
      for (e = Ge[i].length - 1; e >= 0; e--)
        s[Ge[i][e]] != null && this.attr(Ge.prefix(i, Ge[i][e]), s[Ge[i][e]]);
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
const yo = [
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
_("Element", yo);
function xo() {
  return this.attr("transform", null);
}
function bo() {
  return (this.attr("transform") || "").split(Lr).slice(0, -1).map(function(t) {
    const e = t.trim().split("(");
    return [
      e[0],
      e[1].split(qt).map(function(s) {
        return parseFloat(s);
      })
    ];
  }).reverse().reduce(function(t, e) {
    return e[0] === "matrix" ? t.lmultiply(x.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
  }, new x());
}
function wo(i, t) {
  if (this === i) return this;
  if (Zi(this.node)) return this.addTo(i, t);
  const e = this.screenCTM(), s = i.screenCTM().inverse();
  return this.addTo(i, t).untransform().transform(s.multiply(e)), this;
}
function _o(i) {
  return this.toParent(this.root(), i);
}
function vo(i, t) {
  if (i == null || typeof i == "string") {
    const n = new x(this).decompose();
    return i == null ? n : n[i];
  }
  x.isMatrixLike(i) || (i = { ...i, origin: Wi(i, this) });
  const e = t === !0 ? this : t || !1, s = new x(e).transform(i);
  return this.attr("transform", s);
}
_("Element", {
  untransform: xo,
  matrixify: bo,
  toParent: wo,
  toRoot: _o,
  transform: vo
});
class ct extends kt {
  flatten() {
    return this.each(function() {
      if (this instanceof ct)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), e = t.index(this)) {
    return e = e === -1 ? t.children().length : e, this.each(function(s, n) {
      return n[n.length - s - 1].toParent(t, e);
    }), this.remove();
  }
}
S(ct, "Container");
class ks extends ct {
  constructor(t, e = t) {
    super(P("defs", t), e);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
S(ks, "Defs");
class ft extends kt {
}
S(ft, "Shape");
function Cs(i) {
  return this.attr("rx", i);
}
function Ms(i) {
  return this.attr("ry", i);
}
function pn(i) {
  return i == null ? this.cx() - this.rx() : this.cx(i + this.rx());
}
function mn(i) {
  return i == null ? this.cy() - this.ry() : this.cy(i + this.ry());
}
function gn(i) {
  return this.attr("cx", i);
}
function yn(i) {
  return this.attr("cy", i);
}
function xn(i) {
  return i == null ? this.rx() * 2 : this.rx(new w(i).divide(2));
}
function bn(i) {
  return i == null ? this.ry() * 2 : this.ry(new w(i).divide(2));
}
const ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: gn,
  cy: yn,
  height: bn,
  rx: Cs,
  ry: Ms,
  width: xn,
  x: pn,
  y: mn
}, Symbol.toStringTag, { value: "Module" }));
class $i extends ft {
  constructor(t, e = t) {
    super(P("ellipse", t), e);
  }
  size(t, e) {
    const s = Fe(this, t, e);
    return this.rx(new w(s.width).divide(2)).ry(
      new w(s.height).divide(2)
    );
  }
}
v($i, ko);
_("Container", {
  // Create an ellipse
  ellipse: j(function(i = 0, t = i) {
    return this.put(new $i()).size(i, t).move(0, 0);
  })
});
S($i, "Ellipse");
class wn extends te {
  constructor(t = A.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, e, s) {
    if (typeof t == "boolean" && (s = e, e = t, t = null), t == null || typeof t == "function") {
      const n = new te(We("wrapper", s));
      return n.add(this.node.cloneNode(!0)), n.xml(!1, s);
    }
    return super.xml(t, !1, s);
  }
}
S(wn, "Fragment");
function _n(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new w(i), fy: new w(t) }) : this.attr({ x1: new w(i), y1: new w(t) });
}
function vn(i, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new w(i), cy: new w(t) }) : this.attr({ x2: new w(i), y2: new w(t) });
}
const Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: _n,
  to: vn
}, Symbol.toStringTag, { value: "Module" }));
class ui extends ct {
  constructor(t, e) {
    super(
      P(t + "Gradient", typeof t == "string" ? null : t),
      e
    );
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new Q();
  }
  targets() {
    return qe("svg [fill*=" + this.id() + "]");
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
v(ui, Co);
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
      return this.put(new ui(i)).update(t);
    })
  }
});
S(ui, "Gradient");
class Ke extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(P("pattern", t), e);
  }
  // custom attr to handle transform
  attr(t, e, s) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, e, s);
  }
  bbox() {
    return new Q();
  }
  targets() {
    return qe("svg [fill*=" + this.id() + "]");
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
      return this.put(new Ke()).update(e).attr({
        x: 0,
        y: 0,
        width: i,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
S(Ke, "Pattern");
class zi extends ft {
  constructor(t, e = t) {
    super(P("image", t), e);
  }
  // (re)load image
  load(t, e) {
    if (!t) return this;
    const s = new A.window.Image();
    return Ze(
      s,
      "load",
      function(n) {
        const r = this.parent(Ke);
        this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), r instanceof Ke && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof e == "function" && e.call(this, n);
      },
      this
    ), Ze(s, "load error", function() {
      $t(s);
    }), this.attr("href", s.src = t, ai);
  }
}
mo(function(i, t, e) {
  return (i === "fill" || i === "stroke") && zr.test(t) && (t = e.root().defs().image(t)), t instanceof zi && (t = e.root().defs().pattern(0, 0, (s) => {
    s.add(t);
  })), t;
});
_({
  Container: {
    // create image element, load image and set its size
    image: j(function(i, t) {
      return this.put(new zi()).size(0, 0).load(i, t);
    })
  }
});
S(zi, "Image");
class ee extends Re {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, e = -1 / 0, s = 1 / 0, n = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), e = Math.max(r[1], e), s = Math.min(r[0], s), n = Math.min(r[1], n);
    }), new Q(s, n, t - s, e - n);
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
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(qt).map(parseFloat), t.length % 2 !== 0 && t.pop();
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
const Mo = ee;
function Oo(i) {
  return i == null ? this.bbox().x : this.move(i, this.bbox().y);
}
function To(i) {
  return i == null ? this.bbox().y : this.move(this.bbox().x, i);
}
function Ao(i) {
  const t = this.bbox();
  return i == null ? t.width : this.size(i, t.height);
}
function So(i) {
  const t = this.bbox();
  return i == null ? t.height : this.size(t.width, i);
}
const Os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: Mo,
  height: So,
  width: Ao,
  x: Oo,
  y: To
}, Symbol.toStringTag, { value: "Module" }));
let Qe = class extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("line", t), e);
  }
  // Get array
  array() {
    return new ee([
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
    return t == null ? this.array() : (typeof e < "u" ? t = { x1: t, y1: e, x2: s, y2: n } : t = new ee(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Fe(this, t, e);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
};
v(Qe, Os);
_({
  Container: {
    // Create a line element
    line: j(function(...i) {
      return Qe.prototype.plot.apply(
        this.put(new Qe()),
        i[0] != null ? i : [0, 0, 0, 0]
      );
    })
  }
});
S(Qe, "Line");
class xi extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(P("marker", t), e);
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
      return this.put(new xi()).size(i, t).ref(i / 2, t / 2).viewbox(0, 0, i, t).attr("orient", "auto").update(e);
    })
  },
  marker: {
    // Create and attach markers
    marker(i, t, e, s) {
      let n = ["marker"];
      return i !== "all" && n.push(i), n = n.join("-"), i = arguments[1] instanceof xi ? arguments[1] : this.defs().marker(t, e, s), this.attr(n, i);
    }
  }
});
S(xi, "Marker");
function Ce(i, t) {
  return function(e) {
    return e == null ? this[i] : (this[i] = e, t && t.call(this), this);
  };
}
const No = {
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
class Ts {
  done() {
    return !1;
  }
}
class Ki extends Ts {
  constructor(t = Xe.ease) {
    super(), this.ease = No[t] || t;
  }
  step(t, e, s) {
    return typeof t != "number" ? s < 1 ? t : e : t + (e - t) * this.ease(s);
  }
}
class bi extends Ts {
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
function Vs() {
  const i = (this._duration || 500) / 1e3, t = this._overshoot || 0, e = 1e-10, s = Math.PI, n = Math.log(t / 100 + e), r = -n / Math.sqrt(s * s + n * n), h = 3.9 / (r * i);
  this.d = 2 * r * h, this.k = h * h;
}
class Eo extends bi {
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
v(Eo, {
  duration: Ce("_duration", Vs),
  overshoot: Ce("_overshoot", Vs)
});
class Io extends bi {
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
v(Io, {
  windup: Ce("_windup"),
  p: Ce("P"),
  i: Ce("I"),
  d: Ce("D")
});
const Lo = {
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
}, Qi = {
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
}, Gi = "mlhvqtcsaz".split("");
for (let i = 0, t = Gi.length; i < t; ++i)
  Qi[Gi[i]] = /* @__PURE__ */ function(e) {
    return function(s, n, r) {
      if (e === "H") s[0] = s[0] + n.x;
      else if (e === "V") s[0] = s[0] + n.y;
      else if (e === "A")
        s[5] = s[5] + n.x, s[6] = s[6] + n.y;
      else
        for (let h = 0, a = s.length; h < a; ++h)
          s[h] = s[h] + (h % 2 ? n.y : n.x);
      return Qi[e](s, n, r);
    };
  }(Gi[i].toUpperCase());
function $o(i) {
  const t = i.segment[0];
  return Qi[t](i.segment.slice(1), i.p, i.p0);
}
function Ji(i) {
  return i.segment.length && i.segment.length - 1 === Lo[i.segment[0].toUpperCase()];
}
function zo(i, t) {
  i.inNumber && se(i, !1);
  const e = _s.test(t);
  if (e)
    i.segment = [t];
  else {
    const s = i.lastCommand, n = s.toLowerCase(), r = s === n;
    i.segment = [n === "m" ? r ? "l" : "L" : s];
  }
  return i.inSegment = !0, i.lastCommand = i.segment[0], e;
}
function se(i, t) {
  if (!i.inNumber) throw new Error("Parser Error");
  i.number && i.segment.push(parseFloat(i.number)), i.inNumber = t, i.number = "", i.pointSeen = !1, i.hasExponent = !1, Ji(i) && ts(i);
}
function ts(i) {
  i.inSegment = !1, i.absolute && (i.segment = $o(i)), i.segments.push(i.segment);
}
function Do(i) {
  if (!i.segment.length) return !1;
  const t = i.segment[0].toUpperCase() === "A", e = i.segment.length;
  return t && (e === 4 || e === 5);
}
function jo(i) {
  return i.lastToken.toUpperCase() === "E";
}
const Po = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function Ro(i, t = !0) {
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
    if (!(!n.inSegment && zo(n, s))) {
      if (s === ".") {
        if (n.pointSeen || n.hasExponent) {
          se(n, !1), --e;
          continue;
        }
        n.inNumber = !0, n.pointSeen = !0, n.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (n.number === "0" || Do(n)) {
          n.inNumber = !0, n.number = s, se(n, !0);
          continue;
        }
        n.inNumber = !0, n.number += s;
        continue;
      }
      if (Po.has(s)) {
        n.inNumber && se(n, !1);
        continue;
      }
      if (s === "-" || s === "+") {
        if (n.inNumber && !jo(n)) {
          se(n, !1), --e;
          continue;
        }
        n.number += s, n.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        n.number += s, n.hasExponent = !0;
        continue;
      }
      if (_s.test(s)) {
        if (n.inNumber)
          se(n, !1);
        else if (Ji(n))
          ts(n);
        else
          throw new Error("parser Error");
        --e;
      }
    }
  return n.inNumber && se(n, !1), n.inSegment && Ji(n) && ts(n), n.segments;
}
function Bo(i) {
  let t = "";
  for (let e = 0, s = i.length; e < s; e++)
    t += i[e][0], i[e][1] != null && (t += i[e][1], i[e][2] != null && (t += " ", t += i[e][2], i[e][3] != null && (t += " ", t += i[e][3], t += " ", t += i[e][4], i[e][5] != null && (t += " ", t += i[e][5], t += " ", t += i[e][6], i[e][7] != null && (t += " ", t += i[e][7])))));
  return t + " ";
}
class me extends Re {
  // Get bounding box of path
  bbox() {
    return Gt().path.setAttribute("d", this.toString()), new Q(Gt.nodes.path.getBBox());
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
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), Ro(t);
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
    return Bo(this);
  }
}
const kn = (i) => {
  const t = typeof i;
  return t === "number" ? w : t === "string" ? $.isColor(i) ? $ : qt.test(i) ? _s.test(i) ? me : Re : hn.test(i) ? w : es : As.indexOf(i.constructor) > -1 ? i.constructor : Array.isArray(i) ? Re : t === "object" ? Je : es;
};
class ne {
  constructor(t) {
    this._stepper = t || new Ki("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
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
    this._type || this.type(kn(t));
    let e = new this._type(t);
    return this._type === $ && (e = this._to ? e[this._to[4]]() : this._from ? e[this._from[4]]() : e), this._type === Je && (e = this._to ? e.align(this._to) : this._from ? e.align(this._from) : e), e = e.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(e.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), e;
  }
}
class es {
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
class li {
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
    }), Object.assign(this, li.defaults, t), this;
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
li.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Fo = (i, t) => i[0] < t[0] ? -1 : i[0] > t[0] ? 1 : 0;
class Je {
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
      const n = kn(t[s]), r = new n(t[s]).toArray();
      e.push([s, n, r.length, ...r]);
    }
    return e.sort(Fo), this.values = e.reduce((s, n) => s.concat(n), []), this;
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
const As = [es, li, Je];
function qo(i = []) {
  As.push(...[].concat(i));
}
function Vo() {
  v(As, {
    to(i) {
      return new ne().type(this.constructor).from(this.toArray()).to(i);
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
let Ve = class extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("path", t), e);
  }
  // Get array
  array() {
    return this._array || (this._array = new me(this.attr("d")));
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
      typeof t == "string" ? t : this._array = new me(t)
    );
  }
  // Set element size to given width and height
  size(t, e) {
    const s = Fe(this, t, e);
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
Ve.prototype.MorphArray = me;
_({
  Container: {
    // Create a wrapped path element
    path: j(function(i) {
      return this.put(new Ve()).plot(i || new me());
    })
  }
});
S(Ve, "Path");
function Go() {
  return this._array || (this._array = new ee(this.attr("points")));
}
function Xo() {
  return delete this._array, this;
}
function Ho(i, t) {
  return this.attr("points", this.array().move(i, t));
}
function Uo(i) {
  return i == null ? this.array() : this.clear().attr(
    "points",
    typeof i == "string" ? i : this._array = new ee(i)
  );
}
function Yo(i, t) {
  const e = Fe(this, i, t);
  return this.attr("points", this.array().size(e.width, e.height));
}
const Cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Go,
  clear: Xo,
  move: Ho,
  plot: Uo,
  size: Yo
}, Symbol.toStringTag, { value: "Module" }));
let fi = class extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("polygon", t), e);
  }
};
_({
  Container: {
    // Create a wrapped polygon element
    polygon: j(function(i) {
      return this.put(new fi()).plot(i || new ee());
    })
  }
});
v(fi, Os);
v(fi, Cn);
S(fi, "Polygon");
class di extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("polyline", t), e);
  }
}
_({
  Container: {
    // Create a wrapped polygon element
    polyline: j(function(i) {
      return this.put(new di()).plot(i || new ee());
    })
  }
});
v(di, Os);
v(di, Cn);
S(di, "Polyline");
class Di extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("rect", t), e);
  }
}
v(Di, { rx: Cs, ry: Ms });
_({
  Container: {
    // Create a rect element
    rect: j(function(i, t) {
      return this.put(new Di()).size(i, t);
    })
  }
});
S(Di, "Rect");
class Xi {
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
  frames: new Xi(),
  timeouts: new Xi(),
  immediates: new Xi(),
  timer: () => A.window.performance || A.window.Date,
  transforms: [],
  frame(i) {
    const t = L.frames.push({ run: i });
    return L.nextDraw === null && (L.nextDraw = A.window.requestAnimationFrame(L._draw)), t;
  },
  timeout(i, t) {
    t = t || 0;
    const e = L.timer().now() + t, s = L.timeouts.push({ run: i, time: e });
    return L.nextDraw === null && (L.nextDraw = A.window.requestAnimationFrame(L._draw)), s;
  },
  immediate(i) {
    const t = L.immediates.push(i);
    return L.nextDraw === null && (L.nextDraw = A.window.requestAnimationFrame(L._draw)), t;
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
    L.nextDraw = L.timeouts.first() || L.frames.first() ? A.window.requestAnimationFrame(L._draw) : null;
  }
}, Wo = function(i) {
  const t = i.start, e = i.runner.duration(), s = t + e;
  return {
    start: t,
    duration: e,
    end: s,
    runner: i.runner
  };
}, Zo = function() {
  const i = A.window;
  return (i.performance || i.Date).now();
};
class Mn extends ci {
  // Construct a new timeline on the given element
  constructor(t = Zo) {
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
      return this._runners.map(Wo);
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
    return L.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = L.frame(this._step), this);
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
      return i == null ? (this._timeline = this._timeline || new Mn(), this._timeline) : (this._timeline = i, this);
    }
  }
});
class lt extends ci {
  constructor(t) {
    super(), this.id = lt.id++, t = t ?? Xe.duration, t = typeof t == "function" ? new bi(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof bi, this._stepper = this._isDeclarative ? t : new Ki(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new x(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, e, s) {
    let n = 1, r = !1, h = 0;
    return t = t ?? Xe.duration, e = e ?? Xe.delay, s = s || "last", typeof t == "object" && !(t instanceof Ts) && (e = t.delay ?? e, s = t.when ?? s, r = t.swing || r, n = t.times ?? n, h = t.wait ?? h, t = t.duration ?? Xe.duration), {
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
    return this._stepper = new Ki(t), this;
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
      const m = function(k) {
        const M = h * Math.floor(k % (2 * (n + s)) / (n + s)), O = M && !a || !M && a, z = Math.pow(-1, O) * (k % (n + s)) / s + O;
        return Math.max(Math.min(z, 1), 0);
      }, y = r * (n + s) - n;
      return c = e <= 0 ? Math.round(m(1e-5)) : e < y ? m(e) : Math.round(m(y - 1e-5)), c;
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
      initialiser: t || qs,
      runner: e || qs,
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
    if (t instanceof Mn || (s = e, e = t, t = this.timeline()), !t)
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
lt.id = 0;
class wi {
  constructor(t = new x(), e = -1, s = !0) {
    this.transforms = t, this.id = e, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
v([lt, wi], {
  mergeWith(i) {
    return new wi(
      i.transforms.lmultiply(this.transforms),
      i.id
    );
  }
});
const On = (i, t) => i.lmultiplyO(t), Tn = (i) => i.transforms;
function Ko() {
  const t = this._transformationRunners.runners.map(Tn).reduce(On, new x());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class Qo {
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
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new wi()).forEach((s) => s.clearTransformsFromQueue()), this;
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
      return this._transformationRunners.runners.filter((t) => t.id <= i.id).map(Tn).reduce(On, new x());
    },
    _addRunner(i) {
      this._transformationRunners.add(i), L.cancelImmediate(this._frameId), this._frameId = L.immediate(Ko.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new Qo().add(
        new wi(new x(this))
      ));
    }
  }
});
const Jo = (i, t) => i.filter((e) => !t.includes(e));
v(lt, {
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
    let n = new ne(this._stepper).to(s), r = Object.keys(s);
    return this.queue(
      function() {
        n = n.from(this.element()[i](r));
      },
      function(h) {
        return this.element()[i](n.at(h).valueOf()), n.done();
      },
      function(h) {
        const a = Object.keys(h), c = Jo(a, r);
        if (c.length) {
          const l = this.element()[i](c), d = new Je(n.from()).valueOf();
          Object.assign(d, l), n.from(d);
        }
        const u = new Je(n.to()).valueOf();
        Object.assign(u, h), n.to(u), r = a, s = h;
      }
    ), this._rememberMorpher(i, n), this;
  },
  zoom(i, t) {
    if (this._tryRetarget("zoom", i, t)) return this;
    let e = new ne(this._stepper).to(new w(i));
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
    const n = new ne(this._stepper).type(
      e ? li : x
    );
    let r, h, a, c, u;
    function l() {
      h = h || this.element(), r = r || Wi(i, h), u = new x(t ? void 0 : h), h._addRunner(this), t || h._clearTransformRunnersBefore(this);
    }
    function d(y) {
      t || this.clearTransform();
      const { x: k, y: M } = new W(r).transform(
        h._currentTransform(this)
      );
      let O = new x({ ...i, origin: [k, M] }), z = this._isDeclarative && a ? a : u;
      if (e) {
        O = O.decompose(k, M), z = z.decompose(k, M);
        const Z = O.rotate, Ct = z.rotate, Mt = [Z - 360, Z, Z + 360], dt = Mt.map((hr) => Math.abs(hr - Ct)), mi = Math.min(...dt), gi = dt.indexOf(mi);
        O.rotate = Mt[gi];
      }
      t && (s || (O.rotate = i.rotate || 0), this._isDeclarative && c && (z.rotate = c)), n.from(z), n.to(O);
      const Y = n.at(y);
      return c = Y.rotate, a = new x(Y), this.addTransform(a), h._addRunner(this), n.done();
    }
    function m(y) {
      (y.origin || "center").toString() !== (i.origin || "center").toString() && (r = Wi(y, h)), i = { ...y, origin: r };
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
    if (t = new w(t), this._tryRetarget(i, t)) return this;
    const e = new ne(this._stepper).to(t);
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
    const e = new ne(this._stepper).to(t);
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
    const n = new ne(this._stepper).type(this._element.MorphArray).to(i);
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
    return this._queueObject("viewbox", new Q(i, t, e, s));
  },
  update(i) {
    return typeof i != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (i.opacity != null && this.attr("stop-opacity", i.opacity), i.color != null && this.attr("stop-color", i.color), i.offset != null && this.attr("offset", i.offset), this);
  }
});
v(lt, { rx: Cs, ry: Ms, from: _n, to: vn });
S(lt, "Runner");
class Ss extends ct {
  constructor(t, e = t) {
    super(P("svg", t), e), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? mt(this.node.querySelector("defs")) || this.put(new ks()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof A.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: xs, version: "1.1" }).attr(
      "xmlns:xlink",
      ai,
      Fi
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, Fi).attr("xmlns:svgjs", null, Fi);
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
      return this.put(new Ss());
    })
  }
});
S(Ss, "Svg", !0);
let Ns = class extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(P("symbol", t), e);
  }
};
_({
  Container: {
    symbol: j(function() {
      return this.put(new Ns());
    })
  }
});
S(Ns, "Symbol");
function th(i) {
  return this._build === !1 && this.clear(), this.node.appendChild(A.document.createTextNode(i)), this;
}
function eh() {
  return this.node.getComputedTextLength();
}
function ih(i, t = this.bbox()) {
  return i == null ? t.x : this.attr("x", this.attr("x") + i - t.x);
}
function sh(i, t = this.bbox()) {
  return i == null ? t.y : this.attr("y", this.attr("y") + i - t.y);
}
function nh(i, t, e = this.bbox()) {
  return this.x(i, e).y(t, e);
}
function rh(i, t = this.bbox()) {
  return i == null ? t.cx : this.attr("x", this.attr("x") + i - t.cx);
}
function oh(i, t = this.bbox()) {
  return i == null ? t.cy : this.attr("y", this.attr("y") + i - t.cy);
}
function hh(i, t, e = this.bbox()) {
  return this.cx(i, e).cy(t, e);
}
function ah(i) {
  return this.attr("x", i);
}
function ch(i) {
  return this.attr("y", i);
}
function uh(i, t) {
  return this.ax(i).ay(t);
}
function lh(i) {
  return this._build = !!i, this;
}
const An = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: uh,
  ax: ah,
  ay: ch,
  build: lh,
  center: hh,
  cx: rh,
  cy: oh,
  length: eh,
  move: nh,
  plain: th,
  x: ih,
  y: sh
}, Symbol.toStringTag, { value: "Module" }));
class vt extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("text", t), e), this.dom.leading = this.dom.leading ?? new w(1.3), this._rebuild = !0, this._build = !1;
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
        if (Zi(this.node)) return;
        const h = A.window.getComputedStyle(this.node).getPropertyValue("font-size"), a = n * new w(h);
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
    return nn(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const e = this.node.childNodes;
      let s = 0;
      t = "";
      for (let n = 0, r = e.length; n < r; ++n) {
        if (e[n].nodeName === "textPath" || Zi(e[n])) {
          n === 0 && (s = n + 1);
          continue;
        }
        n !== s && e[n].nodeType !== 3 && mt(e[n]).dom.newLined === !0 && (t += `
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
v(vt, An);
_({
  Container: {
    // Create text element
    text: j(function(i = "") {
      return this.put(new vt()).text(i);
    }),
    // Create plain text element
    plain: j(function(i = "") {
      return this.put(new vt()).plain(i);
    })
  }
});
S(vt, "Text");
class ji extends ft {
  // Initialize node
  constructor(t, e = t) {
    super(P("tspan", t), e), this._build = !1;
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
    if (!(t instanceof vt))
      return this;
    const e = t.index(this), s = A.window.getComputedStyle(this.node).getPropertyValue("font-size"), n = t.dom.leading * new w(s);
    return this.dy(e ? n : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
v(ji, An);
_({
  Tspan: {
    tspan: j(function(i = "") {
      const t = new ji();
      return this._build || this.clear(), this.put(t).text(i);
    })
  },
  Text: {
    newLine: function(i = "") {
      return this.tspan(i).newLine();
    }
  }
});
S(ji, "Tspan");
let Es = class extends ft {
  constructor(t, e = t) {
    super(P("circle", t), e);
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
v(Es, { x: pn, y: mn, cx: gn, cy: yn, width: xn, height: bn });
_({
  Container: {
    // Create circle element
    circle: j(function(i = 0) {
      return this.put(new Es()).size(i).move(0, 0);
    })
  }
});
S(Es, "Circle");
class is extends ct {
  constructor(t, e = t) {
    super(P("clipPath", t), e);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return qe("svg [clip-path*=" + this.id() + "]");
  }
}
_({
  Container: {
    // Create clipping element
    clip: j(function() {
      return this.defs().put(new is());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(i) {
      const t = i instanceof is ? i : this.parent().clip().add(i);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
S(is, "ClipPath");
class _i extends kt {
  constructor(t, e = t) {
    super(P("foreignObject", t), e);
  }
}
_({
  Container: {
    foreignObject: j(function(i, t) {
      return this.put(new _i()).size(i, t);
    })
  }
});
S(_i, "ForeignObject");
function fh(i, t) {
  return this.children().forEach((e) => {
    let s;
    try {
      s = e.node instanceof mr().SVGSVGElement ? new Q(e.attr(["x", "y", "width", "height"])) : e.bbox();
    } catch {
      return;
    }
    const n = new x(e), r = n.translate(i, t).transform(n.inverse()), h = new W(s.x, s.y).transform(r);
    e.move(h.x, h.y);
  }), this;
}
function dh(i) {
  return this.dmove(i, 0);
}
function ph(i) {
  return this.dmove(0, i);
}
function mh(i, t = this.bbox()) {
  return i == null ? t.height : this.size(t.width, i, t);
}
function gh(i = 0, t = 0, e = this.bbox()) {
  const s = i - e.x, n = t - e.y;
  return this.dmove(s, n);
}
function yh(i, t, e = this.bbox()) {
  const s = Fe(this, i, t, e), n = s.width / e.width, r = s.height / e.height;
  return this.children().forEach((h) => {
    const a = new W(e).transform(new x(h).inverse());
    h.scale(n, r, a.x, a.y);
  }), this;
}
function xh(i, t = this.bbox()) {
  return i == null ? t.width : this.size(i, t.height, t);
}
function bh(i, t = this.bbox()) {
  return i == null ? t.x : this.move(i, t.y, t);
}
function wh(i, t = this.bbox()) {
  return i == null ? t.y : this.move(t.x, i, t);
}
const Sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: fh,
  dx: dh,
  dy: ph,
  height: mh,
  move: gh,
  size: yh,
  width: xh,
  x: bh,
  y: wh
}, Symbol.toStringTag, { value: "Module" }));
class Pi extends ct {
  constructor(t, e = t) {
    super(P("g", t), e);
  }
}
v(Pi, Sn);
_({
  Container: {
    // Create a group element
    group: j(function() {
      return this.put(new Pi());
    })
  }
});
S(Pi, "G");
class vi extends ct {
  constructor(t, e = t) {
    super(P("a", t), e);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, ai);
  }
}
v(vi, Sn);
_({
  Container: {
    // Create a hyperlink element
    link: j(function(i) {
      return this.put(new vi()).to(i);
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
      return t || (t = new vi(), this.wrap(t)), typeof i == "function" ? i.call(t, t) : t.to(i), this;
    },
    linker() {
      const i = this.parent();
      return i && i.node.nodeName.toLowerCase() === "a" ? i : null;
    }
  }
});
S(vi, "A");
class ss extends ct {
  // Initialize node
  constructor(t, e = t) {
    super(P("mask", t), e);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return qe("svg [mask*=" + this.id() + "]");
  }
}
_({
  Container: {
    mask: j(function() {
      return this.defs().put(new ss());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(i) {
      const t = i instanceof ss ? i : this.parent().mask().add(i);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
S(ss, "Mask");
class Nn extends kt {
  constructor(t, e = t) {
    super(P("stop", t), e);
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
      return this.put(new Nn()).update(i, t, e);
    }
  }
});
S(Nn, "Stop");
function _h(i, t) {
  if (!i) return "";
  if (!t) return i;
  let e = i + "{";
  for (const s in t)
    e += fr(s) + ":" + t[s] + ";";
  return e += "}", e;
}
class ns extends kt {
  constructor(t, e = t) {
    super(P("style", t), e);
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
    return this.addText(_h(t, e));
  }
}
_("Dom", {
  style(i, t) {
    return this.put(new ns()).rule(i, t);
  },
  fontface(i, t, e) {
    return this.put(new ns()).font(i, t, e);
  }
});
S(ns, "Style");
class Is extends vt {
  // Initialize node
  constructor(t, e = t) {
    super(P("textPath", t), e);
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
      return i instanceof vt || (i = this.text(i)), i.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: j(function(i, t = !0) {
      const e = new Is();
      i instanceof Ve || (i = this.defs().path(i)), e.attr("href", "#" + i, ai);
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
      return i instanceof vt || (i = new vt().addTo(this.parent()).text(i)), i.path(this);
    }),
    targets() {
      return qe("svg textPath").filter((i) => (i.attr("href") || "").includes(this.id()));
    }
  }
});
Is.prototype.MorphArray = me;
S(Is, "TextPath");
class En extends ft {
  constructor(t, e = t) {
    super(P("use", t), e);
  }
  // Use element as a reference
  use(t, e) {
    return this.attr("href", (e || "") + "#" + t, ai);
  }
}
_({
  Container: {
    // Create a use element
    use: j(function(i, t) {
      return this.put(new En()).use(i, t);
    })
  }
});
S(En, "Use");
const In = it;
v([Ss, Ns, zi, Ke, xi], at("viewbox"));
v([Qe, di, fi, Ve], at("marker"));
v(vt, at("Text"));
v(Ve, at("Path"));
v(ks, at("Defs"));
v([vt, ji], at("Tspan"));
v([Di, $i, ui, lt], at("radius"));
v(ci, at("EventTarget"));
v(te, at("Dom"));
v(kt, at("Element"));
v(ft, at("Shape"));
v([ct, wn], at("Container"));
v(ui, at("Gradient"));
v(lt, at("Runner"));
pe.extend(ur());
qo([
  w,
  $,
  Q,
  x,
  Re,
  ee,
  me,
  W
]);
Vo();
function gt(i) {
  return i != null && i.x !== void 0 && i.y !== void 0;
}
function _t(i) {
  return i != null && i.min !== void 0 && i.max !== void 0;
}
var Ln = /* @__PURE__ */ ((i) => (i.BACKGROUND = "background", i.GRIDS = "grids", i.AXIS = "axis", i.MAIN = "main", i.PLOTS_BACKGROUND = "plots_BG", i.PLOTS = "plots", i.PLOTS_FOREGROUND = "plots_FG", i.FOREGROUND = "foreground", i.POINTS = "points", i.INTERACTIVE = "interactive", i))(Ln || {}), vh = /* @__PURE__ */ ((i) => (i.X = "Ox", i.Y = "Oy", i))(vh || {}), ti = /* @__PURE__ */ ((i) => (i.CARTESIAN_2D = "cartesian_2d", i.POLAR = "polar", i))(ti || {}), kh = /* @__PURE__ */ ((i) => (i.FREE = "free", i.FIXED = "fixed", i.MIDDLE = "middle", i.PROJECTION = "projection", i.INTERSECTION_LINES = "intersection_lines", i.FOLLOW = "follow", i.DIRECTION = "direction", i.VECTOR = "vector", i.INTERSECTION_CIRCLE_LINE = "intersection_circle_line", i.INTERSECTION_CIRCLES = "intersection_circles", i.SYMMETRY = "symmetry", i.COORDINATES = "coordinates", i))(kh || {}), Ch = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.PARALLEL = "parallel", i.PERPENDICULAR = "perpendicular", i.TANGENT = "tangent", i.MEDIATOR = "mediator", i.SLOPE = "slope", i.BISECTOR = "bisector", i))(Ch || {}), Mh = /* @__PURE__ */ ((i) => (i.FIXED = "fixed", i.REGULAR = "regular", i.STAR = "star", i))(Mh || {}), de = /* @__PURE__ */ ((i) => (i.SMOOTH = "smooth", i.VERTICAL = "vertical", i.HORIZONTAL = "horizontal", i))(de || {});
const Gs = (i) => (i.changedTouches && (i = i.changedTouches[0]), { x: i.clientX, y: i.clientY });
class Oh {
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
    t.preventDefault(), t.stopPropagation(), this.init(!1), this.box = this.el.bbox(), this.lastClick = this.el.point(Gs(t));
    const s = (e ? "mousemove" : "touchmove") + ".drag", n = (e ? "mouseup" : "touchend") + ".drag";
    Ze(window, s, this.drag, this, { passive: !1 }), Ze(window, n, this.endDrag, this, { passive: !1 }), this.el.fire("dragstart", { event: t, handler: this, box: this.box });
  }
  // While dragging
  drag(t) {
    const { box: e, lastClick: s } = this, n = this.el.point(Gs(t)), r = n.x - s.x, h = n.y - s.y;
    if (!r && !h) return e;
    const a = e.x + r, c = e.y + h;
    this.box = new Q(a, c, e.w, e.h), this.lastClick = n, !this.el.dispatch("dragmove", {
      event: t,
      handler: this,
      box: this.box,
      dx: r,
      dy: h
    }).defaultPrevented && this.move(a, c);
  }
  move(t, e) {
    this.el.type === "svg" ? Pi.prototype.move.call(this.el, t, e) : this.el.move(t, e);
  }
  endDrag(t) {
    this.drag(t), this.el.fire("dragend", { event: t, handler: this, box: this.box }), $t(window, "mousemove.drag"), $t(window, "touchmove.drag"), $t(window, "mouseup.drag"), $t(window, "touchend.drag"), this.init(!0);
  }
}
v(kt, {
  draggable(i = !0) {
    return (this.remember("_draggable") || new Oh(this)).init(i), this;
  }
});
var Oe, ei, V, J, ae, Dt, jt, ii, si, rs;
class Th {
  constructor(t, e, s) {
    p(this, si);
    p(this, Oe);
    p(this, ei);
    p(this, V);
    p(this, J);
    p(this, ae);
    p(this, Dt);
    p(this, jt);
    p(this, ii);
    f(this, Oe, t), f(this, ei, e), f(this, J, Object.assign(
      {
        text: e,
        asHtml: !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        rotate: void 0,
        texConverter: (n) => n
      },
      s
    )), f(this, ae, s.text ?? e), f(this, Dt, 0), f(this, jt, 0), f(this, ii, "display: block; position: fixed; white-space:nowrap"), f(this, V, b(this, si, rs).call(this));
  }
  get config() {
    return o(this, J);
  }
  get x() {
    return o(this, Dt);
  }
  set x(t) {
    f(this, Dt, t);
  }
  get y() {
    return o(this, jt);
  }
  set y(t) {
    f(this, jt, t);
  }
  get asHtml() {
    return o(this, J).asHtml;
  }
  get shape() {
    return o(this, V);
  }
  get alignement() {
    return o(this, J).alignement;
  }
  // Get the label of the figure.
  get label() {
    return o(this, V);
  }
  get displayName() {
    return o(this, J).asHtml ? o(this, J).texConverter(o(this, ae)) : o(this, ae);
  }
  hide() {
    return o(this, V).hide(), this;
  }
  show() {
    return o(this, V).show(), this;
  }
  // Set the label of the figure.
  setLabel(t) {
    return t !== void 0 && f(this, ae, t), b(this, si, rs).call(this), this;
  }
  move(t, e) {
    return f(this, Dt, t), f(this, jt, e), this.position(), this;
  }
  rotate(t) {
    return o(this, V).transform({
      rotate: t,
      origin: { x: o(this, Dt), y: o(this, jt) }
    }), this;
  }
  position(t, e, s) {
    t === void 0 && (t = o(this, J).alignement), e === void 0 && (e = o(this, J).offset), s === void 0 && (s = o(this, J).rotate), e = {
      x: isNaN(e.x) ? 0 : e.x,
      y: isNaN(e.y) ? 0 : e.y
    }, o(this, J).alignement = t, o(this, J).offset = e, o(this, J).rotate = s;
    let n = o(this, Dt), r = o(this, jt), h = 0, a = 0;
    return o(this, V) instanceof _i ? (h = o(this, V).node.children[0].clientWidth, a = o(this, V).node.children[0].clientHeight, this.label.width(h), this.label.height(a)) : (h = o(this, V).length(), a = o(this, V).bbox().h), t.includes("l") ? n = n - h / 2 + (t.includes("m") ? -10 : 0) : t.includes("r") ? n = n + h / 2 + (t.includes("m") ? 10 : 0) : t.includes("c") && (n = +n), t.includes("t") ? r = r - a / 2 : t.includes("m") ? r = +r : t.includes("b") && (r = r + a / 2), o(this, V) instanceof _i ? o(this, V).center(n + (e.x ?? 0), r - (e.y ?? 0)) : o(this, V).center(n + (e.x ?? 0), r - (e.y ?? 0)), s !== 0 && s !== void 0 && this.rotate(s), this;
  }
}
Oe = new WeakMap(), ei = new WeakMap(), V = new WeakMap(), J = new WeakMap(), ae = new WeakMap(), Dt = new WeakMap(), jt = new WeakMap(), ii = new WeakMap(), si = new WeakSet(), rs = function() {
  return o(this, V) && o(this, V).remove(), f(this, V, o(this, J).asHtml ? o(this, Oe).foreignObject(1, 1).attr("style", "overflow:visible").add(In(`<div style="${o(this, ii)}">${this.displayName}</div>`, !0)) : o(this, Oe).text(this.displayName)), o(this, V).attr("id", `${o(this, ei)}-label`), o(this, V);
};
function $n(i, t = 10) {
  return +i.toFixed(t);
}
function Ah(i) {
  return i === Number.NEGATIVE_INFINITY || i === Number.POSITIVE_INFINITY;
}
function Ls(i, t) {
  return Math.sqrt((t.x - i.x) ** 2 + (t.y - i.y) ** 2);
}
class F {
  constructor(t, e) {
    nt(this, "_x");
    nt(this, "_y");
    return this._x = 0, this._y = 0, gt(t) && gt(e) ? (this._x = e.x - t.x, this._y = e.y - t.y) : gt(t) && e === void 0 ? (this._x = t.x, this._y = t.y) : !isNaN(+t) && e !== void 0 && !isNaN(+e) && (this._x = +t, this._y = +e), this;
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
class $s {
  constructor(t, e) {
    nt(this, "_A");
    nt(this, "_director");
    if (this._A = { x: 0, y: 0 }, this._director = new F(0, 0), e instanceof F)
      this._A = t, this._director = e;
    else
      return new $s(t, new F(t, e));
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
    return Ah(e) ? this._A.x : (t - this.ordinate) / this.slope;
  }
  intersection(t) {
    const e = this.slope, s = this.ordinate, n = t.slope, r = t.ordinate;
    let h, a;
    return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? (h = this._A.x, a = n * h + r) : n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY ? (h = t.A.x, a = e * h + s) : (h = (r - s) / (e - n), a = e * h + s), h === Number.POSITIVE_INFINITY || h === Number.NEGATIVE_INFINITY ? null : { x: h, y: a };
  }
  projection(t) {
    const e = this._director, s = new F(this._A, t), n = F.scalarProduct(e, s) / F.scalarProduct(e, e);
    return { x: this._A.x + e.x * n, y: this._A.y + e.y * n };
  }
}
class ki {
  constructor(t, e) {
    nt(this, "_rpn");
    nt(this, "_expression");
    nt(this, "_isValid");
    this._expression = t;
    try {
      this._rpn = new Sh(
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
        this._addToStack(e, os[s.token]);
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
    t.push($n(e));
  }
}
const os = {
  pi: Math.PI,
  e: Math.exp(1)
};
class Sh {
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
      for (const r in os)
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
    for (const c in os)
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
      h = t[r], a = t[r + 1], n += h, h.match(/[a-zA-Z]/g) ? /[a-zA-Z\d(]/.exec(a) && (n += "*") : /\d/.exec(h) ? /[a-zA-Z(]/.exec(a) && (n += "*") : h === ")" && /[a-zA-Z\d(]/.exec(a) && (n += "*"), r++;
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
    const c = [], u = [];
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
          c.push({ token: h, tokenType: a });
          break;
        case "operation":
          if (u.length > 0) {
            let l = u[u.length - 1];
            for (n = 50; l.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[h].associative === "left" && this._tokenConfig[h].precedence <= this._tokenConfig[l.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[h].associative === "right" && this._tokenConfig[h].precedence < this._tokenConfig[l.token].precedence); ) {
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
          u.push({ token: h, tokenType: a });
          break;
        case "function-argument":
          for (n = 50; u[u.length - 1].token !== "(" && u.length > 0; ) {
            if (n--, n === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            c.push(u.pop() ?? { token: h, tokenType: a });
          }
          break;
        case "(":
          u.push({ token: h, tokenType: a }), t[r] === "-" && c.push({
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
            c.push(u.pop() ?? { token: h, tokenType: a });
          }
          u.pop();
          break;
        case "function":
          u.push({ token: h, tokenType: a });
          break;
        default:
          console.log(`SHUTING YARD: ${a} : ${h} `);
      }
    }
    return this._rpn = c.concat(u.reverse()), this;
  }
}
function H(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i * t.axis.y.y : i * t.axis.x.x;
  if (_t(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min * t.axis.y.y, n = t.origin.y + i.max * t.axis.y.y) : (s = t.origin.x + i.min * t.axis.x.x, n = t.origin.x + i.max * t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return gt(i) ? {
    x: t.origin.x + i.x * t.axis.x.x + i.y * t.axis.y.x,
    y: t.origin.y + i.x * t.axis.x.y + i.y * t.axis.y.y
  } : i;
}
function Ci(i, t, e) {
  if (typeof i == "number")
    return e === "y" ? i / t.axis.y.y : i / t.axis.x.x;
  if (_t(i)) {
    let s, n;
    return e === "y" ? (s = t.origin.y + i.min / t.axis.y.y, n = t.origin.y + i.max / t.axis.y.y) : (s = t.origin.x + i.min / t.axis.x.x, n = t.origin.x + i.max / t.axis.x.x), {
      min: Math.min(s, n),
      max: Math.max(s, n)
    };
  }
  return gt(i) ? {
    x: (i.x - t.origin.x) / t.axis.x.x,
    y: (i.y - t.origin.y) / t.axis.y.y
  } : i;
}
function he(i, t, e, s, n = 0, r = !1, h) {
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
function Xs(i, t, e, s) {
  const n = -s * Math.PI / 180;
  return {
    x: i + e * Math.cos(n),
    y: t + e * Math.sin(n)
  };
}
function Hs(i, t) {
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
function be(i, t) {
  return {
    viewBox: `0 0 ${i} ${i}`,
    ...t ?? { refX: i / 2, refY: i / 2 },
    markerWidth: i,
    markerHeight: i,
    orient: "auto",
    markerUnits: "userSpaceOnUse"
  };
}
function pi(i, t, e) {
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
    ).attr(be(t)),
    end: i.marker(
      t,
      t,
      function(s) {
        s.path(`M0,0 L${t},${t} M${t},0 L0,${t}`).stroke({
          color: "black",
          width: 1
        });
      }
    ).attr(be(t))
  } : e === "|" ? {
    start: i.marker(
      t,
      t,
      function(s) {
        s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
      }
    ).attr(be(t)),
    end: i.marker(
      t,
      t,
      function(s) {
        s.path(`M${t / 2},${t} L${t / 2},0`).stroke({ color: "black", width: 1 });
      }
    ).attr(be(t))
  } : {
    start: i.marker(
      t * 1.2,
      t * 1.2,
      function(s) {
        s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`).rotate(180);
      }
    ).ref(0, t / 2).attr(be(t, { refX: 0, refY: t / 2 })),
    end: i.marker(
      t * 1.2,
      t * 1.2,
      function(s) {
        s.path(`M1,0 L1,${t}, L${t * 1.2},${t / 2} L1,0z`);
      }
    ).ref(t, t / 2).attr(be(t, { refX: t, refY: t / 2 }))
  };
}
function zn(i) {
  if (typeof i == "number")
    return i;
  if (typeof i == "string" && i.includes("/")) {
    const [t, e] = i.split("/");
    return +t / +e;
  }
  return +i;
}
var Xt, Tt, yt, rt, U, Te, ce, At, Ae;
class st {
  constructor(t, e) {
    p(this, Xt);
    p(this, Tt);
    p(this, yt);
    p(this, rt);
    p(this, U);
    p(this, Te);
    p(this, ce);
    p(this, At);
    p(this, Ae);
    f(this, Xt, t), f(this, Tt, e), f(this, Te, !1), f(this, ce, !1), f(this, Ae, null), f(this, At, null), f(this, yt, o(this, Xt).group().attr("id", o(this, Tt))), f(this, U, {
      stroke: {
        color: "black",
        width: 1,
        opacity: 1
      },
      fill: {
        color: "transparent",
        opacity: 1
      }
    }), f(this, rt, o(this, yt).path());
  }
  get element() {
    return o(this, yt);
  }
  get name() {
    return o(this, Tt);
  }
  get rootSVG() {
    return o(this, Xt);
  }
  get shape() {
    return o(this, rt);
  }
  set shape(t) {
    f(this, rt, t);
  }
  get appearance() {
    return o(this, U);
  }
  set appearance(t) {
    f(this, U, t);
  }
  get graphConfig() {
    return o(this, Xt).data("config");
  }
  get static() {
    return o(this, Te);
  }
  set static(t) {
    f(this, Te, t);
  }
  get isDraggable() {
    return o(this, ce);
  }
  set isDraggable(t) {
    f(this, ce, t);
  }
  get label() {
    return o(this, At);
  }
  get animate() {
    return o(this, Ae);
  }
  set animate(t) {
    f(this, Ae, t);
  }
  hide() {
    return o(this, yt).hide(), this;
  }
  show() {
    return o(this, yt).show(), this;
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
      o(this, U).fill.color = e, o(this, U).fill.opacity = s === void 0 ? 1 : +s;
    }
    return this.fillable().forEach((e) => {
      e.fill(o(this, U).fill), e.opacity(o(this, U).fill.opacity);
    }), this;
  }
  stroke(t, e) {
    if (typeof t == "string") {
      const [s, n] = t.split("/");
      o(this, U).stroke.color = s, o(this, U).stroke.opacity = n === void 0 ? 1 : +n, o(this, U).stroke.width = e ?? o(this, U).stroke.width;
    }
    return typeof t == "number" && e === void 0 && (o(this, U).stroke.width = t), this.strokeable().forEach((s) => {
      s.stroke(o(this, U).stroke), s.opacity(o(this, U).stroke.opacity);
    }), [o(this, rt).reference("marker-start"), o(this, rt).reference("marker-end")].filter((s) => s !== null).forEach((s) => {
      s.children().forEach((n) => {
        n.attr({
          fill: o(this, U).stroke.color,
          stroke: o(this, U).stroke.color,
          "stroke-width": o(this, U).stroke.width
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
    return t ? (o(this, yt).clear(), this) : (o(this, yt).children().forEach((e) => {
      e.attr("id") !== `${o(this, Tt)}-label` && e.remove();
    }), this);
  }
  update(t) {
    return (this.static || o(this, ce)) && t !== !0 ? this : (this.computed(), this.updateLabel(), this);
  }
  // The position depends on the figure.
  addLabel(t, e, s) {
    return f(this, At, new Th(
      o(this, yt),
      o(this, Tt),
      {
        text: t ?? o(this, Tt),
        asHtml: e ?? !1,
        alignement: "br",
        offset: { x: 0, y: 0 },
        texConverter: s ?? ((n) => n)
      }
    )), this.updateLabel(), o(this, At);
  }
  // Update the label of the figure when the figure is updated.
  updateLabel() {
    return o(this, At) ? (o(this, At).setLabel(this.computeLabel()), this.moveLabel(), this) : this;
  }
  computeLabel() {
    var t;
    return ((t = o(this, At)) == null ? void 0 : t.config.text) ?? o(this, Tt);
  }
  move(t) {
    if (gt(t)) {
      const e = H(t.x, this.graphConfig), s = H(t.y, this.graphConfig);
      o(this, rt).translate(e, -s);
    } else if (typeof t == "number") {
      const e = H(t, this.graphConfig);
      o(this, rt).translate(e, 0);
    }
    return this;
  }
  scale(t) {
    return typeof t == "number" ? this.scale({
      x: t,
      y: t
    }) : (o(this, rt).scale(t.x, t.y), this);
  }
  mark(t, e) {
    const s = (e == null ? void 0 : e.filter((a) => typeof a == "number")[0]) ?? 10, n = (e == null ? void 0 : e.filter((a) => typeof a == "string")[0]) ?? void 0, r = pi(
      o(this, Xt),
      s,
      n
    ), h = o(this, rt);
    return t === "start" ? (h.marker("start", r.start), this) : t === "end" ? (h.marker("end", r.end), this) : (h.marker("start", r.start), h.marker("end", r.end), this);
  }
  follow(t, e) {
    return { x: t, y: e };
  }
}
Xt = new WeakMap(), Tt = new WeakMap(), yt = new WeakMap(), rt = new WeakMap(), U = new WeakMap(), Te = new WeakMap(), ce = new WeakMap(), At = new WeakMap(), Ae = new WeakMap();
var g, Se, Ne, ni, hs;
class ht extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, ni);
    p(this, g);
    p(this, Se);
    p(this, Ne);
    return f(this, g, Object.assign(
      { shape: "line" },
      n
    )), f(this, Ne, { x: 0, y: 0 }), f(this, Se, { x: this.graphConfig.width, y: this.graphConfig.height }), this.shape = b(this, ni, hs).call(this), this.computed(), this;
  }
  get angle() {
    return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI;
  }
  get config() {
    return o(this, g);
  }
  set config(e) {
    f(this, g, e), b(this, ni, hs).call(this);
  }
  get direction() {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y
    };
  }
  get end() {
    return o(this, Se);
  }
  set end(e) {
    f(this, Se, e);
  }
  get math() {
    return new $s(this.start, this.end);
  }
  get normal() {
    const e = this.direction;
    return {
      x: e.y,
      y: -e.x
    };
  }
  get start() {
    return o(this, Ne);
  }
  set start(e) {
    f(this, Ne, e);
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
      const { A: n, B: r, C: h } = o(this, g).bisector, a = new F(n, r), c = a.norm, u = new F(n, h), l = u.norm;
      this.start = n, e = {
        x: a.x / c + u.x / l,
        y: a.y / c + u.y / l
      };
    }
    if (o(this, g).shape === void 0 || o(this, g).shape === "line" || o(this, g).shape === "ray") {
      const n = he(
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
  follow(e, s) {
    const n = this.math.projection({ x: e, y: s });
    if (o(this, g).shape === "line")
      return n;
    const { x: r, y: h } = this.start, { x: a, y: c } = this.end, u = a - r, l = c - h, d = Math.max(0, Math.min(1, ((e - r) * u + (s - h) * l) / (u * u + l * l)));
    return {
      x: r + d * u,
      y: h + d * l
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
    if (o(this, g).shape === "segment") {
      const e = (this.start.x + this.end.x) / 2, s = (this.start.y + this.end.y) / 2;
      let n = -this.angle;
      n > 90 && (n = n - 180), n < -90 && (n = n + 180), this.label.move(e, s), this.label.position(void 0, void 0, n);
    }
    return this;
  }
}
g = new WeakMap(), Se = new WeakMap(), Ne = new WeakMap(), ni = new WeakSet(), hs = function() {
  if (this.element.clear(), this.shape = this.element.line(
    this.start.x,
    this.start.y,
    this.end.x,
    this.end.y
  ), o(this, g).shape === "vector") {
    const e = pi(this.rootSVG, 10).end;
    this.shape.marker("end", e);
  }
  return this.fill().stroke(), this.shape;
};
var C, R, Pt, re;
class T extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Pt);
    p(this, C);
    // Coordinates of the point in pixels
    p(this, R);
    return f(this, R, { x: NaN, y: NaN }), f(this, C, Object.assign(
      {
        size: 2,
        shape: "circle"
      },
      n
    )), this.computed(), this.shape = b(this, Pt, re).call(this), this;
  }
  get config() {
    return o(this, C);
  }
  set config(e) {
    f(this, C, e), b(this, Pt, re).call(this);
  }
  // Used to store the original coordinates of the point
  get coordinates() {
    return Ci(o(this, R), this.graphConfig);
  }
  get pixels() {
    return o(this, R);
  }
  set pixels(e) {
    f(this, R, e), this.shape.center(o(this, R).x, o(this, R).y);
  }
  get size() {
    return o(this, C).size;
  }
  set size(e) {
    o(this, C).size = e, b(this, Pt, re).call(this);
  }
  get x() {
    return o(this, R).x;
  }
  set x(e) {
    o(this, R).x = e, this.shape.center(e, o(this, R).y);
  }
  get y() {
    return o(this, R).y;
  }
  set y(e) {
    o(this, R).y = e, this.shape.center(o(this, R).x, e);
  }
  asCircle(e) {
    return this.config.shape = "circle", this.config.size = e ?? 2, b(this, Pt, re).call(this), this;
  }
  asCrosshair(e) {
    return this.config.shape = "crosshair", this.config.size = e ?? 10, b(this, Pt, re).call(this), this;
  }
  asSquare(e) {
    return this.config.shape = "square", this.config.size = e ?? 10, b(this, Pt, re).call(this), this;
  }
  computeLabel() {
    var e, s;
    if ((e = this.label) != null && e.config.text.includes("@")) {
      const n = Ci(o(this, R), this.graphConfig);
      return this.label.config.text.replace("@", `(${n.x};${n.y})`);
    }
    return ((s = this.label) == null ? void 0 : s.config.text) ?? this.name;
  }
  computed() {
    if (o(this, C).coordinates)
      return this.pixels = H(o(this, C).coordinates, this.graphConfig), this;
    if (o(this, C).middle) {
      const e = o(this, C).middle.A, s = o(this, C).middle.B;
      return o(this, R).x = (e.x + s.x) / 2, o(this, R).y = (e.y + s.y) / 2, this;
    }
    if (o(this, C).projection) {
      const e = o(this, C).projection.point;
      if (o(this, C).projection.axis === "Ox")
        return this.x = e.x, this.y = this.graphConfig.origin.y, this;
      if (o(this, C).projection.axis === "Oy")
        return this.x = this.graphConfig.origin.x, this.y = e.y, this;
      if (o(this, C).projection.axis instanceof ht) {
        const s = o(this, C).projection.axis, n = s.start.x, r = s.start.y, h = e.x - n, a = e.y - r, c = s.direction, u = h * c.x + a * c.y, l = c.x * c.x + c.y * c.y;
        this.x = n + u * c.x / l, this.y = r + u * c.y / l;
      }
    }
    if (o(this, C).intersection) {
      const e = o(this, C).intersection.A, s = o(this, C).intersection.B, n = e.math.intersection(s.math);
      if (n === null)
        return this;
      this.pixels = n;
    }
    if (o(this, C).intersectionWithCircle) {
      const e = o(this, C).intersectionWithCircle.A, s = o(this, C).intersectionWithCircle.B, n = o(this, C).intersectionWithCircle.index, r = e.intersectionWithLine(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.pixels = r[n];
    }
    if (o(this, C).intersectionBetweenCircles) {
      const e = o(this, C).intersectionBetweenCircles.A, s = o(this, C).intersectionBetweenCircles.B, n = o(this, C).intersectionBetweenCircles.index, r = e.intersectionWithCircle(s);
      if (r === null)
        return this.pixels = { x: NaN, y: NaN }, this;
      this.show(), this.pixels = r[n];
    }
    if (o(this, C).symmetry) {
      const e = o(this, C).symmetry.A, s = o(this, C).symmetry.B;
      if (s instanceof ht) {
        const r = new F(s.direction).normal, a = new F(e, s.start).projection(r);
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
    if (o(this, C).direction) {
      const { point: e, direction: s, distance: n } = o(this, C).direction;
      if (s === "Ox")
        return this.x = e.x + H(n, this.graphConfig), this.y = e.y, this;
      if (s === "Oy")
        return this.x = e.x, this.y = e.y - H(n, this.graphConfig), this;
      if (s instanceof ht) {
        const r = new F(o(this, C).direction.perpendicular ? s.normal : s.direction).unit, h = H(n, this.graphConfig);
        return this.x = e.x + h * r.x, this.y = e.y + h * r.y, this;
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
C = new WeakMap(), R = new WeakMap(), Pt = new WeakSet(), re = function() {
  switch (this.clear(), this.config.shape) {
    case "circle":
      this.shape = this.element.circle(this.size).center(o(this, R).x, o(this, R).y);
      break;
    case "square":
      this.shape = this.element.rect(this.size, this.size).center(o(this, R).x, o(this, R).y);
      break;
    case "crosshair": {
      const e = this.size / Math.sqrt(2);
      this.shape = this.element.path(
        `M ${-e} ${e} L ${e} ${-e} M ${-e} ${-e} L ${e} ${e}`
      ).center(o(this, R).x, o(this, R).y);
      break;
    }
  }
  return this.fill().stroke(), this.shape;
};
var pt, Ht, Be, Dn, jn;
class Ye extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Be);
    p(this, pt);
    p(this, Ht);
    return f(this, pt, Object.assign({
      expression: "",
      samples: this.graphConfig.axis.x.x
    }, n)), this.shape = b(this, Be, Dn).call(this), f(this, Ht, new ki(o(this, pt).expression)), this.computed(), this;
  }
  get config() {
    return o(this, pt);
  }
  set config(e) {
    f(this, pt, e), f(this, Ht, new ki(o(this, pt).expression)), this.computed();
  }
  computed() {
    const e = o(this, pt).expression;
    if (!e || e === "")
      return this;
    const s = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1, n = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1, r = o(this, pt).domain ?? { min: s, max: n }, h = o(this, pt).image ?? { min: -1 / 0, max: 1 / 0 }, a = o(this, pt).samples ?? this.graphConfig.axis.x.x, c = o(this, Ht);
    let u;
    u = b(this, Be, jn).call(this, r, a, c, h);
    let l = u[0];
    const d = u.map(({ x: y, y: k }, M) => {
      let O = M === 0 ? "M" : "L";
      return isNaN(k) ? (O = "M", k = -123456789) : l.y === -123456789 && (O = "M"), l = { x: y, y: k }, `${O} ${y} ${k}`;
    }).join(" ");
    return this.shape.plot(d), this;
  }
  moveLabel() {
    return this;
  }
  evaluate(e, s) {
    return s === !0 ? { x: e, y: o(this, Ht).evaluate({ x: e }) } : H(
      { x: e, y: o(this, Ht).evaluate({ x: e }) },
      this.graphConfig
    );
  }
  follow(e, s) {
    const n = Ci({ x: e, y: s }, this.graphConfig);
    return this.evaluate(n.x);
  }
}
pt = new WeakMap(), Ht = new WeakMap(), Be = new WeakSet(), Dn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
}, jn = function(e, s, n, r) {
  const h = [];
  for (let a = e.min; a < e.max; a += 1 / s) {
    const c = n.evaluate({ x: a });
    if (isNaN(c) || c === 1 / 0 || c === -1 / 0 || c < r.min || c > r.max) {
      const u = H({ x: a, y: 0 }, this.graphConfig);
      h.push({ x: u.x, y: NaN });
    } else
      h.push(H({ x: a, y: c }, this.graphConfig));
  }
  return h;
};
var St, ri, as;
class yi extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, ri);
    p(this, St);
    f(this, St, Object.assign({
      figures: [],
      property: "fixed",
      center: { x: 0, y: 0 },
      radius: 1
    }, n)), b(this, ri, as).call(this), this.computed();
  }
  get config() {
    return o(this, St);
  }
  set config(e) {
    f(this, St, e), b(this, ri, as).call(this);
  }
  get center() {
    return o(this, St).center;
  }
  get radius() {
    return typeof o(this, St).radius == "number" ? H(o(this, St).radius, this.graphConfig) : Ls(this.center, o(this, St).radius);
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
  intersectionWithLine(e, s) {
    const { x: n, y: r } = this.center, { x: h, y: a } = e.start, { x: c, y: u } = e.end, l = c - h, d = u - a, m = h - n, y = a - r, k = l * l + d * d, M = 2 * (l * m + d * y), O = m * m + y * y - this.radius * this.radius, z = M * M - 4 * k * O;
    if (z < 0)
      return null;
    const Y = [], Z = Math.sqrt(z), Ct = (-M - Z) / (2 * k), Mt = (-M + Z) / (2 * k);
    for (const dt of [Ct, Mt])
      s && (dt < 0 || dt > 1) || Y.push({
        x: h + dt * l,
        y: a + dt * d
      });
    return Y;
  }
  intersectionWithCircle(e) {
    const { x: s, y: n } = this.center, { x: r, y: h } = e.center, a = this.radius, c = e.radius, u = r - s, l = h - n, d = Math.hypot(u, l);
    if (d > a + c || d < Math.abs(a - c) || d === 0)
      return null;
    const m = (a * a - c * c + d * d) / (2 * d), y = Math.sqrt(a * a - m * m), k = s + m * u / d, M = n + m * l / d, O = -l * (y / d), z = u * (y / d), Y = { x: k + O, y: M + z }, Z = { x: k - O, y: M - z };
    return Math.abs(y) < 1e-10 ? [Y] : [Y, Z];
  }
}
St = new WeakMap(), ri = new WeakSet(), as = function() {
  return this.element.clear(), this.shape = this.element.circle(this.radius).center(this.center.x, this.center.y), this.shape.stroke(this.appearance.stroke.color), this.shape.fill(this.appearance.fill), this.shape;
};
var I, ie, cs, us;
class Nh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, ie);
    p(this, I);
    f(this, I, Object.assign({
      shape: "polygon"
    }, n)), b(this, ie, us).call(this), this.computed();
  }
  get config() {
    return o(this, I);
  }
  set config(e) {
    f(this, I, e), b(this, ie, us).call(this);
  }
  get vertices() {
    return o(this, I).vertices;
  }
  get radius() {
    return o(this, I).regular ? typeof o(this, I).regular.radius == "number" ? H(o(this, I).regular.radius, this.graphConfig) : o(this, I).vertices && gt(o(this, I).vertices[0]) && gt(o(this, I).regular.radius) ? Ls(o(this, I).vertices[0], o(this, I).regular.radius) : 0 : this.graphConfig.axis.x.x;
  }
  computed() {
    const e = this.shape;
    if (o(this, I).vertices && o(this, I).vertices.length > 2)
      e.plot(b(this, ie, cs).call(this));
    else if (o(this, I).regular) {
      const s = [], n = this.radius, r = new F(
        o(this, I).regular.center,
        gt(o(this, I).regular.radius) ? o(this, I).regular.radius : { x: o(this, I).regular.center.x, y: o(this, I).regular.center.y - n }
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
I = new WeakMap(), ie = new WeakSet(), cs = function() {
  var s;
  const e = [];
  return (s = o(this, I).vertices) == null || s.forEach((n) => {
    gt(n) && e.push([n.x, n.y]);
  }), e;
}, us = function() {
  var s;
  this.element.clear();
  const e = b(this, ie, cs).call(this);
  if (this.shape = this.element.polygon(e), this.fill().stroke(), this.element.add(this.shape), o(this, I).mark) {
    const n = ((s = o(this, I).mark.center) == null ? void 0 : s.length) ?? 0, r = e.reduce(
      (h, a) => (h.x += a[0], h.y += a[1], h),
      { x: 0, y: 0 }
    );
    r.x /= e.length, r.y /= e.length, e.forEach((h) => {
      const a = new F(r, { x: h[0], y: h[1] });
      n && a.setLength(n * 20), this.element.line(r.x, r.y, r.x + a.x, r.y + a.y).stroke({ color: "gray", width: 0.5 });
    });
  }
  return this.shape;
};
var G, ge, Pn, ls;
class Eh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, ge);
    p(this, G);
    return this.static = !0, f(this, G, Object.assign(
      {
        ...this.graphConfig,
        subdivisions: 0
      },
      n
    )), this.shape = b(this, ge, Pn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, G);
  }
  set config(e) {
    f(this, G, e), this.computed();
  }
  computed() {
    const s = [
      ...b(this, ge, ls).call(this, o(this, G).axis.x, o(this, G).axis.y),
      ...b(this, ge, ls).call(this, o(this, G).axis.y, o(this, G).axis.x)
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
G = new WeakMap(), ge = new WeakSet(), Pn = function() {
  return this.element.clear(), this.shape = this.element.path(), this.stroke(), this.element.add(this.shape), this.shape;
}, ls = function(e, s) {
  let n = +o(this, G).origin.x, r = +o(this, G).origin.y;
  const h = [];
  let a = he(
    { x: n, y: r },
    e,
    o(this, G).width,
    o(this, G).height
  );
  for (; a; )
    if (h.push(a), n += s.x, r -= s.y, a = he(
      { x: n, y: r },
      e,
      o(this, G).width,
      o(this, G).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  for (n = o(this, G).origin.x - s.x, r = o(this, G).origin.y + s.y, a = he(
    { x: n, y: r },
    e,
    o(this, G).width,
    o(this, G).height
  ); a; )
    if (h.push(a), n -= s.x, r += s.y, a = he(
      { x: n, y: r },
      e,
      o(this, G).width,
      o(this, G).height
    ), h.length > 1e3)
      throw new Error("Too many lines");
  return h;
};
var tt, Mi, Oi, Rn;
class Ih extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Oi);
    p(this, tt);
    p(this, Mi);
    f(this, tt, Object.assign({
      start: { x: 0, y: 0 },
      center: { x: 10, y: 10 },
      end: { x: 0, y: 10 },
      radius: this.graphConfig.axis.x.x,
      morphToSquare: !0,
      sector: !1,
      mark: !1
    }, n)), f(this, Mi, pi(this.rootSVG, 8)), this.config = n;
  }
  get config() {
    return o(this, tt);
  }
  set config(e) {
    f(this, tt, e), b(this, Oi, Rn).call(this), this.computed();
  }
  get center() {
    return o(this, tt).center;
  }
  get start() {
    return o(this, tt).start;
  }
  get end() {
    return o(this, tt).end;
  }
  get radius() {
    return typeof o(this, tt).radius == "number" ? H(o(this, tt).radius, this.graphConfig) : Ls(this.center, o(this, tt).radius ?? o(this, tt).start);
  }
  get angle() {
    const { start: e, end: s } = this.getAngles();
    return s - e < 0 ? 360 + s - e : s - e;
  }
  get isSquare() {
    return $n((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0;
  }
  computed() {
    return this.shape.plot(this.getPath()), this;
  }
  moveLabel() {
    if (!this.label)
      return this;
    const e = this.radius, s = this.angle < 180 ? 1 : -1, n = new F(this.center, this.start).unit, r = new F(this.center, this.end).unit, h = n.add(r).unit, a = this.center.x + s * h.x * (e + 20), c = this.center.y + s * h.y * (e + 20);
    return s * h.x > 0 && s * h.y > 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y > 0 ? this.label.config.alignement = "ml" : s * h.x > 0 && s * h.y < 0 ? this.label.config.alignement = "mr" : s * h.x < 0 && s * h.y < 0 && (this.label.config.alignement = "ml"), this.label.move(a, c), this;
  }
  /**
   * Calculate the start and end angle of an arc
   * @returns {{startAngle: number, endAngle: number}}
   */
  getAngles() {
    return {
      start: +Hs(this.center, this.start).toFixed(10),
      end: +Hs(this.center, this.end).toFixed(10)
    };
  }
  getPath() {
    const { start: e, end: s } = this.getAngles(), n = o(this, tt).morphToSquare && this.isSquare ? this.radius / 2 : this.radius, r = Xs(this.center.x, this.center.y, n, e), h = Xs(this.center.x, this.center.y, n, s);
    return o(this, tt).morphToSquare && this.isSquare ? this._describeSquare(this.center, r, h) : this._describeArc(this.center, r, h, n, s - e);
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
    return o(this, tt).sector && (u = u.concat(["L", e.x, e.y, "L", s.x, s.y])), u.join(" ");
  }
}
tt = new WeakMap(), Mi = new WeakMap(), Oi = new WeakSet(), Rn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var xt, Ut, Ft, Bn, Fn, fs;
class Lh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ft);
    p(this, xt);
    p(this, Ut);
    return this.static = !0, Object.values(ti).includes(n) ? f(this, xt, b(this, Ft, Bn).call(this, n)) : f(this, xt, n), f(this, Ut, b(this, Ft, Fn).call(this)), this.computed(), this;
  }
  get config() {
    return o(this, xt);
  }
  set config(e) {
    f(this, xt, e), this.computed();
  }
  get xAxis() {
    return o(this, Ut).x;
  }
  get yAxis() {
    return o(this, Ut).y;
  }
  computed() {
    return b(this, Ft, fs).call(this, o(this, Ut).x, o(this, xt).x.direction, o(this, xt).x), b(this, Ft, fs).call(this, o(this, Ut).y, o(this, xt).y.direction, o(this, xt).y), this;
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
xt = new WeakMap(), Ut = new WeakMap(), Ft = new WeakSet(), Bn = function(e) {
  return ti.POLAR, {
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
}, Fn = function() {
  this.element.clear(), this.shape = this.element.group().attr("id", "coordinate-system");
  const e = {
    x: this.element.line(0, 0, 0, 0).attr("id", "Ox"),
    y: this.element.line(0, 0, 0, 0).attr("id", "Oy")
  };
  return this.shape.add(e.x).add(e.y), this.element.add(this.shape), e;
}, fs = function(e, s, n) {
  const r = (n == null ? void 0 : n.color) ?? "black", h = (n == null ? void 0 : n.padding) ?? 0, a = (n == null ? void 0 : n.half) ?? !1, c = (n == null ? void 0 : n.length) ?? 0, u = pi(this.rootSVG, 10).end.fill(r), l = he(
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
var Nt, Ee, Ti, qn;
class $h extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ti);
    p(this, Nt);
    p(this, Ee);
    return f(this, Nt, Object.assign({
      expressions: { x: "", y: "" }
    }, n)), f(this, Ee, {
      x: new ki(o(this, Nt).expressions.x),
      y: new ki(o(this, Nt).expressions.y)
    }), this.shape = b(this, Ti, qn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, Nt);
  }
  set config(e) {
    f(this, Nt, e), this.computed();
  }
  computed() {
    const e = o(this, Nt).samples ?? this.graphConfig.axis.x.x, s = o(this, Nt).domain ?? { min: -2 * Math.PI, max: 2 * Math.PI }, n = [];
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
    return H(
      {
        x: o(this, Ee).x.evaluate({ t: e }),
        y: o(this, Ee).y.evaluate({ t: e })
      },
      this.graphConfig
    );
  }
}
Nt = new WeakMap(), Ee = new WeakMap(), Ti = new WeakSet(), qn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Et, It, ue, Yt, Ie, Ai, Vn;
class zh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ai);
    p(this, Et);
    p(this, It);
    p(this, ue);
    p(this, Yt);
    p(this, Ie);
    return f(this, Et, Object.assign({
      size: 10
    }, n)), this.appearance.fill.color = "black", f(this, It, o(this, Et).follow.follow(0, 0)), f(this, ue, { x: 0, y: 0 }), f(this, Ie, this.element.line()), f(this, Yt, this.element.circle(o(this, Et).size).center(o(this, It).x, o(this, It).y)), this.shape = b(this, Ai, Vn).call(this), this.computed(), this.rootSVG.on("mousemove", (r) => {
      var c;
      let h = this.rootSVG.node.createSVGPoint();
      h.x = r.clientX, h.y = r.clientY, h = h.matrixTransform((c = this.rootSVG.node.getScreenCTM()) == null ? void 0 : c.inverse());
      const a = o(this, Et).follow.follow(h.x, h.y);
      isNaN(a.y) ? o(this, Yt).hide() : (o(this, Yt).show(), o(this, Yt).center(a.x, a.y), f(this, It, a), f(this, ue, o(this, Et).follow.follow(h.x + 0.01, h.y + 0.01)), this.computed());
    }), this;
  }
  get config() {
    return o(this, Et);
  }
  set config(e) {
    f(this, Et, e), this.computed();
  }
  computed() {
    const e = he(
      o(this, It),
      {
        x: o(this, ue).x - o(this, It).x,
        y: o(this, ue).y - o(this, It).y
      },
      this.graphConfig.width,
      this.graphConfig.height
    );
    return e === null ? this : (o(this, Ie).plot(
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
    return [o(this, Ie)];
  }
  fillable() {
    return [o(this, Yt)];
  }
}
Et = new WeakMap(), It = new WeakMap(), ue = new WeakMap(), Yt = new WeakMap(), Ie = new WeakMap(), Ai = new WeakSet(), Vn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var bt, Si, Gn;
class Dh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Si);
    p(this, bt);
    return f(this, bt, Object.assign({
      samples: 100
    }, n)), this.shape = b(this, Si, Gn).call(this), this.computed(), this;
  }
  get config() {
    return o(this, bt);
  }
  set config(e) {
    f(this, bt, e), this.computed();
  }
  get domain() {
    return o(this, bt).domain ? H(o(this, bt).domain, this.graphConfig) : {
      min: 0,
      max: this.graphConfig.width
    };
  }
  get image() {
    return o(this, bt).image ? H(o(this, bt).image, this.graphConfig, "y") : {
      min: 0,
      max: this.graphConfig.height
    };
  }
  computed() {
    const [e, s] = o(this, bt).expressions, n = this.domain;
    this.image;
    function r(u, l) {
      const [d, m, y] = u;
      return `${l === 0 ? "M" : d} ${m ?? 0} ${y ?? 0}`;
    }
    const h = e.shape.array().filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r);
    let a = [];
    return s ? a = [...s.shape.array()].filter((u) => {
      const l = u[1];
      return l !== void 0 && l >= n.min && l <= n.max;
    }).map(r).reverse() : a = [`m ${n.min} 0`], this.shape.plot(`${h.join(" ")} ${a.join(" ")} Z`), this;
  }
  moveLabel() {
    return this;
  }
}
bt = new WeakMap(), Si = new WeakSet(), Gn = function() {
  return this.element.clear(), this.shape = this.element.path("M0 0"), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var X, Ni, Xn;
class jh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ni);
    p(this, X);
    f(this, X, Object.assign({}, n)), this.shape = b(this, Ni, Xn).call(this), this.computed();
  }
  get config() {
    return o(this, X);
  }
  set config(e) {
    f(this, X, e), this.computed();
  }
  get rectangles() {
    return o(this, X).rectangles;
  }
  set rectangles(e) {
    o(this, X).rectangles = e > 0 ? e : 10;
  }
  get position() {
    return o(this, X).position < 0 && (o(this, X).position = 0), o(this, X).position > 1 && (o(this, X).position = 1), o(this, X).position;
  }
  set position(e) {
    e < 0 && (e = 0), e > 1 && (e = 1), o(this, X).position = e;
  }
  computed() {
    this.shape.clear();
    const e = H(o(this, X).domain, this.graphConfig), n = (e.max - e.min) / o(this, X).rectangles, r = (o(this, X).domain.max - o(this, X).domain.min) / o(this, X).rectangles, h = this.graphConfig.origin.y;
    for (let a = 0; a < o(this, X).rectangles; a += 1) {
      const c = e.min + a * n, u = o(this, X).domain.min + (a + this.position) * r, l = o(this, X).follow.evaluate(u).y;
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
X = new WeakMap(), Ni = new WeakSet(), Xn = function() {
  return this.shape = this.element.group().attr({ id: this.name }), this.fill().stroke(), this.element.add(this.shape), this.shape;
};
var Wt, Ei, Hn;
class Ph extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ei);
    p(this, Wt, "");
    n && (f(this, Wt, n), this.computed(), b(this, Ei, Hn).call(this));
  }
  computed() {
    return this;
  }
  get d() {
    return o(this, Wt);
  }
  set d(e) {
    f(this, Wt, e), this.shape.plot(o(this, Wt));
  }
  moveLabel() {
    throw new Error("Method not implemented.");
  }
}
Wt = new WeakMap(), Ei = new WeakSet(), Hn = function() {
  return this.clear(), this.shape = this.element.path(o(this, Wt)).fill("none").stroke({ color: "black", width: 1 }), this.shape;
};
function Rh(i) {
  return i.reduce(
    (t, e, s, n) => s === 0 ? (
      // if first point
      `M ${e.point.x},${e.point.y}`
    ) : (
      // else
      `${t} ${Fh(e, s, n)}`
    ),
    ""
  );
}
function Bh(i, t) {
  const e = t.point.x - i.point.x, s = t.point.y - i.point.y;
  return {
    length: Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)),
    angle: Math.atan2(s, e)
  };
}
function Us(i, t, e, s) {
  const n = t ?? i, r = e ?? i, h = i.controls.ratio ?? 0.2, a = Bh(n, r);
  let c = a.angle + (s ? Math.PI : 0);
  const u = a.length * h;
  i.controls.type === de.VERTICAL ? c = Math.PI / 2 + (s ? Math.PI : 0) : i.controls.type === de.HORIZONTAL && (c = 0 + (s ? Math.PI : 0));
  const l = i.point.x + Math.cos(c) * u, d = i.point.y + Math.sin(c) * u;
  return [l, d];
}
function Fh(i, t, e) {
  const [s, n] = Us(e[t - 1], e[t - 2], i), [r, h] = Us(i, e[t - 1], e[t + 1], !0);
  return `C ${s},${n} ${r},${h} ${i.point.x},${i.point.y}`;
}
var Le, Rt, Ii, Un;
class qh extends st {
  constructor(e, s, n) {
    super(e, s);
    p(this, Ii);
    p(this, Le);
    p(this, Rt);
    f(this, Le, n), f(this, Rt, []), this.points = n.points, b(this, Ii, Un).call(this), this.computed();
  }
  computed() {
    const e = Rh(o(this, Rt));
    return this.shape.plot(e), this;
  }
  get config() {
    return o(this, Le);
  }
  set config(e) {
    f(this, Le, e);
  }
  getPointByName(e) {
    return o(this, Rt).find((s) => s.point.name === e);
  }
  moveLabel() {
    if (!this.label)
      return this;
    throw new Error("Method not implemented.");
  }
  get points() {
    return o(this, Rt);
  }
  set points(e) {
    const s = {
      type: de.SMOOTH,
      ratio: 0.2,
      left: null,
      right: null
    };
    f(this, Rt, e), o(this, Rt).forEach((n) => {
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
Le = new WeakMap(), Rt = new WeakMap(), Ii = new WeakSet(), Un = function() {
  return this.element.clear(), this.shape = this.element.path(""), this.fill().stroke(), this.shape;
};
var zs = /* @__PURE__ */ ((i) => (i.RESET = "reset", i.REVERSE = "reverse", i.NONE = "none", i))(zs || {}), $e, Li, Zt, Kt, wt, ot, Bt, oi, ds, ze;
class Vh {
  constructor(t) {
    p(this, oi);
    p(this, $e);
    p(this, Li, []);
    p(this, Zt, 0);
    p(this, Kt, 0);
    p(this, wt, !1);
    p(this, ot, null);
    p(this, Bt, /* @__PURE__ */ new Map());
    p(this, ze, (t) => {
      if (o(this, Zt) === 0 && f(this, Zt, t - o(this, Kt)), o(this, wt))
        return;
      let e = !1;
      for (const s of o(this, Bt).values()) {
        s.startTime === 0 && (s.startTime = o(this, Zt));
        const n = t - s.startTime, r = Math.min(n / s.duration, 1), h = s.ease(r);
        s.point.x = s.from.x + (s.to.x - s.from.x) * h, s.point.y = s.from.y + (s.to.y - s.from.y) * h, r < 1 ? e = !0 : s.loop === "reset" ? (s.point.x = s.from.x, s.point.y = s.from.y, s.startTime = t, e = !0) : s.loop === "reverse" && ([s.from, s.to] = [s.to, s.from], s.startTime = t, e = !0);
      }
      e ? f(this, ot, requestAnimationFrame(o(this, ze))) : f(this, ot, null);
    });
    f(this, $e, t), b(this, oi, ds).call(this);
  }
  start() {
    this.cancel(), f(this, wt, !1), f(this, Zt, 0), f(this, Kt, 0), o(this, Bt).forEach((t) => {
      t.startTime = 0;
    }), f(this, ot, requestAnimationFrame(o(this, ze)));
  }
  pause() {
    o(this, ot) !== null && (cancelAnimationFrame(o(this, ot)), f(this, ot, null)), f(this, wt, !0), f(this, Kt, performance.now());
  }
  resume() {
    if (o(this, wt)) {
      const t = performance.now() - o(this, Kt);
      o(this, Bt).forEach((e) => {
        e.startTime += t;
      }), f(this, wt, !1), f(this, ot, requestAnimationFrame(o(this, ze)));
    }
  }
  cancel() {
    o(this, ot) !== null && (cancelAnimationFrame(o(this, ot)), f(this, ot, null)), f(this, wt, !1), f(this, Kt, 0), f(this, Zt, 0), setTimeout(() => {
      o(this, $e).update(), b(this, oi, ds).call(this);
    }, 200);
  }
  isRunning() {
    return o(this, ot) !== null && !o(this, wt);
  }
  isPaused() {
    return o(this, wt);
  }
  canBeAnimated() {
    return o(this, Bt).size > 0;
  }
}
$e = new WeakMap(), Li = new WeakMap(), Zt = new WeakMap(), Kt = new WeakMap(), wt = new WeakMap(), ot = new WeakMap(), Bt = new WeakMap(), oi = new WeakSet(), ds = function() {
  return f(this, Bt, /* @__PURE__ */ new Map()), Object.values(o(this, $e).figures).forEach((t) => {
    if (gt(t) && t.animate !== null) {
      const e = t.animate, s = t;
      console.log(e);
      const n = e.from, r = e.to;
      o(this, Bt).set(
        t.name,
        {
          point: s,
          from: { x: +n.pixels.x, y: +n.pixels.y },
          to: { x: +r.pixels.x, y: +r.pixels.y },
          duration: e.duration * 1e3,
          // ms
          ease: (h) => h,
          // TODO: Add easing function
          loop: e.loop,
          reverse: !1,
          startTime: 0
        }
      );
    }
  }), o(this, Li);
}, ze = new WeakMap();
function Gh(i) {
  return i === !0 || i === "1" || i === 1 ? "reset" : typeof i == "string" && Object.values(zs).includes(i) ? i : "none";
}
var E, Lt, K, q, B, De, je, hi, ps;
class Xh {
  constructor(t, e) {
    p(this, hi);
    p(this, E);
    p(this, Lt);
    p(this, K);
    p(this, q);
    p(this, B);
    p(this, De);
    p(this, je, null);
    var r;
    const s = document.createElement("DIV");
    s.style.position = "relative", s.style.width = "100%", s.style.height = "auto", s.style.border = "thin solid black", s.style.userSelect = "none", typeof t == "string" ? (r = document.getElementById(t)) == null || r.appendChild(s) : t.appendChild(s);
    const n = (e == null ? void 0 : e.ppu) ?? 50;
    return f(this, E, Object.assign({
      width: 800,
      height: 600,
      origin: { x: 400, y: 300 },
      system: ti.CARTESIAN_2D,
      axis: {
        x: { x: n, y: 0 },
        y: { x: 0, y: -n }
      }
    }, e)), f(this, De, (e == null ? void 0 : e.tex) ?? ((h) => h)), f(this, Lt, Object.assign({
      grid: !0,
      subgrid: 0,
      axis: !0
    }, e == null ? void 0 : e.display)), f(this, B, In().addTo(s).viewbox(0, 0, o(this, E).width, o(this, E).height)), o(this, B).data("config", {
      width: o(this, E).width,
      height: o(this, E).height,
      origin: o(this, E).origin,
      // grids: this.#grids,
      axis: o(this, E).axis
    }), f(this, q, {}), Object.values(Ln).forEach((h) => {
      o(this, q)[h] = o(this, B).group().attr("id", `LAYER_${h}`);
    }), f(this, K, {}), b(this, hi, ps).call(this), this;
  }
  get config() {
    return o(this, E);
  }
  set config(t) {
    f(this, E, t);
  }
  get create() {
    return {
      point: (t, e, s) => {
        let n = {};
        gt(t) ? n = {
          coordinates: t
        } : n = t;
        const r = new T(
          o(this, B),
          e,
          n
        );
        return o(this, q).points.add(r.element), o(this, K)[e] = r, s && r.addLabel(
          e,
          s.html,
          o(this, De)
        ), r;
      },
      line: (t, e) => {
        const s = new ht(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      path: (t, e) => {
        const s = new Ph(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      bezier: (t, e) => {
        const s = new qh(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      plot: (t, e) => {
        const s = new Ye(o(this, B), e, t);
        return o(this, q).plots.add(s.element), o(this, K)[e] = s, s;
      },
      parametric: (t, e) => {
        const s = new $h(o(this, B), e, t);
        return o(this, q).plots.add(s.element), o(this, K)[e] = s, s;
      },
      circle: (t, e) => {
        const s = new yi(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      polygon: (t, e) => {
        const s = new Nh(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      arc: (t, e) => {
        const s = new Ih(o(this, B), e, t);
        return o(this, q).main.add(s.element), o(this, K)[e] = s, s;
      },
      follow: (t, e) => {
        const s = new zh(o(this, B), e, t);
        return o(this, q).plots_FG.add(s.element), o(this, K)[e] = s, s;
      },
      fillbetween: (t, e) => {
        const s = new Dh(o(this, B), e, t);
        return o(this, q).plots_BG.add(s.element), o(this, K)[e] = s, s;
      },
      riemann: (t, e) => {
        const s = new jh(o(this, B), e, t);
        return o(this, q).plots_BG.add(s.element), o(this, K)[e] = s, s;
      }
    };
  }
  get display() {
    return o(this, Lt);
  }
  set display(t) {
    f(this, Lt, t);
  }
  get figures() {
    return o(this, K);
  }
  get layers() {
    return o(this, q);
  }
  get rootSVG() {
    return o(this, B);
  }
  get toTex() {
    return o(this, De);
  }
  get animation() {
    return o(this, je) || f(this, je, new Vh(this)), o(this, je);
  }
  clear() {
    Object.keys(this.figures).forEach((t) => {
      this.figures[t].element.remove();
    }), f(this, K, {});
  }
  coordinate_system(t) {
    const e = new Lh(
      o(this, B),
      "COORDINATE_SYSTEM",
      t
    );
    return o(this, q).axis.add(e.element), e;
  }
  draggable(t, e) {
    const s = (n) => {
      var d;
      const r = t, { box: h } = n.detail;
      let { x: a, y: c } = h;
      if (n.preventDefault(), a < 0 || a > o(this, E).width - h.width / 2 || c < 0 || c > o(this, E).height - h.height / 2)
        return;
      if ((d = e == null ? void 0 : e.follow) != null && d.length) {
        let m = { x: a, y: c };
        e.follow.forEach((y) => {
          y instanceof st ? m = y.follow(a, c) : typeof y == "string" ? m = this.follow(y, r)(a, c) : m = y(a, c), a = m.x, c = m.y;
        });
      }
      if (r.pixels.x === a && r.pixels.y === c)
        return;
      r.pixels = { x: a, y: c };
      const u = (e == null ? void 0 : e.target) ?? null;
      u instanceof T && (u.pixels = { x: a, y: c }), e != null && e.callback && e.callback(t);
      const l = [t.name];
      u && l.push(u.name), this.update(l);
    };
    return o(this, q).interactive.add(t.element), t.isDraggable = !0, t.shape.draggable().on("dragmove", s), t;
  }
  // Default follow function
  follow(t, e) {
    return t === "Ox" ? (s) => ({ x: s, y: e.y }) : t === "Oy" ? (s, n) => ({ x: e.x, y: n }) : t === "grid" ? (s, n) => {
      const r = o(this, E).axis.x.x, h = o(this, E).axis.y.y;
      return s = Math.round(s / r) * r, n = Math.round(n / h) * h, { x: s, y: n };
    } : (s, n) => ({ x: s, y: n });
  }
  grid(t, e) {
    const s = new Eh(o(this, B), t, {
      axis: e,
      origin: o(this, E).origin,
      width: o(this, E).width,
      height: o(this, E).height,
      subdivisions: 0
    });
    return o(this, q).grids.add(s.element), s;
  }
  marker(t) {
    return pi(o(this, B), t);
  }
  subgrid(t, e) {
    const s = {
      x: { x: o(this, E).axis.x.x / e, y: o(this, E).axis.x.y / e },
      y: { x: o(this, E).axis.y.x / e, y: o(this, E).axis.y.y / e }
    };
    return this.grid(t, s);
  }
  toPixels(t, e) {
    return H(t, this.config, e);
  }
  toCoordinates(t, e) {
    return Ci(t, this.config, e);
  }
  // Update each figures in the graph
  update(t, e) {
    t ?? (t = []), Object.keys(this.figures).forEach((s) => {
      const n = `${s}_drag`;
      n in this.figures && t.push(s, n);
    }), Object.keys(this.figures).forEach((s) => {
      t.includes(s) ? this.figures[s].updateLabel() : this.figures[s].update(e);
    });
  }
  // Update the layout of the graph
  updateLayout() {
    o(this, B).viewbox(0, 0, o(this, E).width, o(this, E).height), o(this, B).data("config", {
      width: o(this, E).width,
      height: o(this, E).height,
      origin: o(this, E).origin,
      axis: o(this, E).axis
    }), b(this, hi, ps).call(this), this.update([], !0);
  }
}
E = new WeakMap(), Lt = new WeakMap(), K = new WeakMap(), q = new WeakMap(), B = new WeakMap(), De = new WeakMap(), je = new WeakMap(), hi = new WeakSet(), ps = function() {
  o(this, q).grids.clear(), o(this, q).axis.clear(), o(this, Lt).subgrid && this.subgrid("SUBGRID", o(this, Lt).subgrid).stroke("purple/0.5", 0.1), o(this, Lt).grid && this.grid("MAINGRID", o(this, E).axis).stroke("lightgray", 1), o(this, Lt).axis && this.coordinate_system(o(this, E).system);
};
var N = /* @__PURE__ */ ((i) => (i.UNKNOWN = "unknown", i.POINT = "pt", i.MIDDLE = "mid", i.PROJECTION = "proj", i.INTERSECTION = "inter", i.SYMMETRY = "sym", i.DIRECTION_POINT = "dpt", i.VECTOR_POINT = "vpt", i.LINE = "line", i.VECTOR = "vec", i.SEGMENT = "seg", i.RAY = "ray", i.PERPENDICULAR = "perp", i.PARALLEL = "para", i.MEDIATOR = "med", i.TANGENT = "tan", i.BISECTOR = "bis", i.CIRCLE = "circ", i.ARC = "arc", i.PLOT = "plot", i.PARAMETRIC = "parametric", i.POLYGON = "poly", i.REGULAR = "reg", i.FOLLOW = "follow", i.FILL_BETWEEN = "fill", i.RIEMANN = "riemann", i.PATH = "path", i))(N || {});
function et(i, t) {
  return i.map((e) => typeof e == "string" && e in t ? t[e] : e);
}
const Hh = [
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
var Yn = (i) => {
  throw TypeError(i);
}, Ds = (i, t, e) => t.has(i) || Yn("Cannot " + e), ut = (i, t, e) => (Ds(i, t, "read from private field"), e ? e.call(i) : t.get(i)), we = (i, t, e) => t.has(i) ? Yn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), Ot = (i, t, e, s) => (Ds(i, t, "write to private field"), t.set(i, e), e), Hi = (i, t, e) => (Ds(i, t, "access private method"), e);
function He(i) {
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
    const [t, e, s] = i.split(":").map(Number), n = Number(t), r = Number(e), h = Number(s), a = (r - n) / 100;
    return {
      min: Math.min(t, e),
      max: Math.max(t, e),
      step: Math.max(h, a)
    };
  }
  return i.startsWith("[") && i.endsWith("]") ? i.slice(1, -1).split(",").map(He) : i;
}
function Ui(i, t) {
  return i.replace(new RegExp(`\\\\${t}`, "g"), "ESCAPESPLITTER").split(t).map((e) => e.replace("ESCAPESPLITTER", t));
}
function Uh(i) {
  if (!i.includes("="))
    return { key: i, value: "" };
  const [t, ...e] = i.split("=");
  return {
    key: t,
    value: e.join("=")
  };
}
var oe, ve, Jt, Me, ke, Ue, Wn, ms;
class Yh {
  constructor(t) {
    we(this, Ue), we(this, oe), we(this, ve, "->"), we(this, Jt, ","), we(this, Me, "/"), we(this, ke, []);
    var e, s, n;
    t && (Ot(this, oe, t.formatter ?? void 0), (e = t.splitter) != null && e.main && Ot(this, ve, t.splitter.main), (s = t.splitter) != null && s.entry && Ot(this, Jt, t.splitter.entry), (n = t.splitter) != null && n.parameter && Ot(this, Me, t.splitter.parameter), t.keys && Ot(this, ke, t.keys));
  }
  get splitter() {
    return {
      main: ut(this, ve),
      entry: ut(this, Jt),
      parameter: ut(this, Me)
    };
  }
  set splitter_main(t) {
    Ot(this, ve, t);
  }
  set splitter_entry(t) {
    Ot(this, Jt, t);
  }
  set splitter_parameter(t) {
    Ot(this, Me, t);
  }
  get formatter() {
    return ut(this, oe);
  }
  set formatter(t) {
    Ot(this, oe, t);
  }
  get keys() {
    return ut(this, ke);
  }
  set keys(t) {
    Ot(this, ke, t);
  }
  parse(t) {
    const [e, s] = t.split(ut(this, ve)), n = ut(this, oe) ? ut(this, oe).call(this, e) : e.trim(), { name: r, key: h, values: a } = Hi(this, Ue, Wn).call(this, n), c = Hi(this, Ue, ms).call(this, s);
    return { name: r, key: h, values: a, parameters: c };
  }
  parameters(t, e) {
    return Hi(this, Ue, ms).call(this, t, e ?? ut(this, ke));
  }
}
oe = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakSet(), Wn = function(i) {
  const [t, ...e] = i.split(" "), [s, n] = t.split("="), r = Ui(
    e.join(" "),
    ut(this, Jt)
  ).map((h) => He(h));
  return { name: s, key: n, values: r };
}, ms = function(i, t) {
  if (i === void 0)
    return {};
  let e;
  if (t === void 0 || t.length === 0)
    e = Ui(i, ut(this, Jt));
  else {
    const n = Ui(i, ut(this, Jt)), r = t.map((h) => `${h}=`);
    e = [], n.forEach((h) => {
      if (t.includes(h))
        e.push(h);
      else if (h.includes("=")) {
        const a = h.split("=")[0] + "=";
        r.includes(a) && e.push(h);
      } else
        e[e.length - 1].includes("=") ? e[e.length - 1] += `,${h}` : e.push(h);
    });
  }
  const s = {};
  return e.forEach((n) => {
    const { key: r, value: h } = Uh(n);
    if (/^[-.\d]+\/[-.\d]+$/.exec(h)) {
      s[r] = {
        value: He(h),
        options: []
      };
      return;
    }
    const [a, ...c] = h.split(ut(this, Me));
    s[r] = {
      value: He(a),
      options: c.map((u) => He(u))
    };
  }), s;
};
function Wh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.CIRCLE.toString() && s.length >= 2) {
    const [n, r] = s;
    if (n instanceof T && (r instanceof T || typeof r == "number"))
      return {
        create: "circle",
        config: { center: n, radius: r }
      };
  }
  return null;
}
function Zh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.ARC.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof T && r instanceof T && h instanceof T)
      return {
        create: "arc",
        config: { start: n, center: r, end: h, radius: a }
      };
  }
  return null;
}
const zt = "line";
function Vt(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.LINE.toString() || i.key === N.SEGMENT.toString() || i.key === N.VECTOR.toString() || i.key === N.RAY.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof T && r instanceof T) {
      let h = "line";
      switch (i.key) {
        case N.SEGMENT.toString():
          h = "segment";
          break;
        case N.VECTOR.toString():
          h = "vector";
          break;
        case N.RAY.toString():
          h = "ray";
          break;
      }
      return {
        create: zt,
        config: {
          through: { A: n, B: r },
          shape: h
        }
      };
    }
  }
  if (i.key === N.LINE.toString() && s.length === 1) {
    const n = s[0];
    if (n.startsWith("y=") && !n.includes("x")) {
      const m = et([n.split("=")[1]], t)[0], y = H({ x: 0, y: m }, e);
      return {
        create: zt,
        config: {
          director: { A: y, d: { x: 1, y: 0 } },
          shape: "line"
        }
      };
    }
    if (n.startsWith("x=")) {
      const m = et([n.split("=")[1]], t)[0], y = H({ x: m, y: 0 }, e);
      return {
        create: zt,
        config: {
          director: { A: y, d: { x: 0, y: 1 } },
          shape: "line"
        }
      };
    }
    const [r, h] = n.split("="), a = Ys(r), c = Ys(h), u = {
      a: a.a - c.a,
      b: a.b - c.b,
      c: a.c - c.c
    }, l = H({ x: 0, y: -u.c / u.b }, e), d = {
      x: u.b,
      y: u.a
    };
    return {
      create: zt,
      config: {
        director: { A: l, d },
        shape: "line"
      }
    };
  }
  if (i.key === N.MEDIATOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof T && r instanceof T)
      return {
        create: zt,
        config: { mediator: { A: n, B: r } }
      };
  }
  if (i.key === N.PERPENDICULAR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ht && r instanceof T)
      return {
        create: zt,
        config: { perpendicular: { to: n, through: r } }
      };
  }
  if (i.key === N.PARALLEL.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ht && r instanceof T)
      return {
        create: zt,
        config: { parallel: { to: n, through: r } }
      };
  }
  if (i.key === N.BISECTOR.toString() && s.length === 2) {
    const [n, r] = s;
    if (n instanceof ht && r instanceof ht)
      return {
        create: zt,
        config: { bisector: { d1: n, d2: r } }
      };
  }
  if (i.key === N.BISECTOR.toString() && s.length === 3) {
    const [n, r, h] = s;
    if (r instanceof T && n instanceof T && h instanceof T)
      return {
        create: zt,
        config: { bisector: { A: r, B: n, C: h } }
      };
  }
  return null;
}
function Ys(i) {
  const t = i.split(/([+-]?[0-9./]*[xy]?)/).filter((r) => r.trim() !== ""), e = Ws(t, "x"), s = Ws(t, "y"), n = zn(t.filter((r) => !r.includes("x") && !r.includes("y"))[0] ?? 0);
  return {
    a: +et([e], {})[0],
    b: +et([s], {})[0],
    c: +et([n], {})[0]
  };
}
function Ws(i, t) {
  return i.filter((e) => e.includes(t)).map((e) => e === t || e === `+${t}` ? 1 : e === `-${t}` ? -1 : zn(e.replace(t, "")))[0] ?? 0;
}
function Kh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.PLOT.toString()) {
    const [n, ...r] = s, h = { expression: typeof n == "number" ? n.toString() : n }, a = r.filter((u) => _t(u));
    a.length > 0 && (h.domain = a[0]), a.length > 1 && (h.image = a[1]);
    const c = r.filter((u) => typeof u == "number");
    return c.length > 0 && (h.samples = c[0] > 0 ? c[0] : 10), {
      create: "plot",
      config: h
    };
  }
  return null;
}
function Qh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.PARAMETRIC.toString() && s.length === 2) {
    const [n, r] = s;
    if (typeof n == "string" && typeof r == "string")
      return {
        create: "parametric",
        config: { expressions: { x: n, y: r } }
      };
  }
  return null;
}
function Jh(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.FOLLOW.toString() && s.length >= 1) {
    const [n, r] = s;
    if (n instanceof Ye)
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
function ta(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.FILL_BETWEEN.toString() && s.length >= 2) {
    const n = s[0], r = s[1] instanceof Ye ? s[1] : null, h = _t(s[1]) ? s[1] : s[2], a = _t(s[1]) ? s[2] : s[3];
    if (n instanceof Ye)
      return {
        create: "fillbetween",
        config: {
          expressions: r instanceof Ye ? [n, r] : [n],
          domain: _t(h) ? h : { min: NaN, max: NaN },
          image: _t(a) ? a : { min: NaN, max: NaN }
        }
      };
  }
  return null;
}
function ea(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.RIEMANN.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    return {
      create: "riemann",
      config: {
        follow: n,
        domain: _t(r) ? r : { min: NaN, max: NaN },
        rectangles: typeof h == "number" ? h : 5,
        position: typeof a == "number" ? a : 0
      }
    };
  }
  return null;
}
const ia = "point";
function _e(i, t, e) {
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
  const h = sa(i, t);
  return h ? {
    create: ia,
    config: Object.assign(h, { shape: s, size: n })
  } : null;
}
function sa(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.POINT.toString()) {
    const [n, r] = s;
    if (typeof n == "number" && typeof r == "number")
      return { coordinates: { x: n, y: r } };
  }
  if (i.key === N.MIDDLE.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof T && r instanceof T)
      return { middle: { A: n, B: r } };
  }
  if (i.key === N.PROJECTION.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof T && (r instanceof ht || r === "Ox" || r === "Oy"))
      return { projection: { point: n, axis: r } };
  }
  if (i.key === N.SYMMETRY.toString() && s.length === 2) {
    const n = s[0], r = s[1];
    if (n instanceof T && (r instanceof T || r instanceof ht || r === "Ox" || r === "Oy"))
      return { symmetry: { A: n, B: r } };
  }
  if (i.key === N.DIRECTION_POINT.toString() && s.length >= 3) {
    const [n, r, h, a] = s;
    if (n instanceof T && (r instanceof ht || r === "Ox" || r === "Oy") && typeof h == "number")
      return {
        direction: {
          direction: r,
          distance: h,
          point: n,
          perpendicular: a !== void 0
        }
      };
  }
  if (i.key === N.VECTOR_POINT.toString() && s.length >= 2) {
    const [n, r, h, a] = s;
    if (n instanceof T && r instanceof T)
      return {
        direction: {
          point: a instanceof T ? a : n,
          direction: { A: n, B: r },
          distance: typeof h == "number" ? h : 1
        }
      };
  }
  return null;
}
const Zs = "polygon";
function Ks(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.POLYGON.toString() && s.length >= 2) {
    const n = s;
    if (n.every((r) => r instanceof T))
      return {
        create: Zs,
        config: { vertices: n }
      };
  }
  if (i.key === N.REGULAR.toString() && s.length >= 3) {
    const [n, r, h] = s;
    if (n instanceof T && (typeof r == "number" || r instanceof T) && typeof h == "number")
      return {
        create: Zs,
        config: {
          regular: {
            center: n,
            radius: r,
            sides: h
          }
        }
      };
  }
  return null;
}
function na(i, t, e) {
  return {
    create: "bezier",
    config: { points: i.values.map((n) => {
      if (typeof n == "string") {
        const [r, h, a] = n.split("/");
        if (!(r in t))
          return null;
        const c = t[r];
        let u;
        switch (h) {
          case "H":
            u = de.HORIZONTAL;
            break;
          case "V":
            u = de.VERTICAL;
            break;
          default:
            u = de.SMOOTH;
        }
        return {
          point: c,
          controls: {
            type: u,
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
const ra = "point";
function oa(i, t, e) {
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
  const h = ha(i, t);
  return h ? h.map((a) => ({
    create: ra,
    config: Object.assign(a, { shape: s, size: n })
  })) : null;
}
function ha(i, t, e) {
  const s = et(i.values, t);
  if (i.key === N.INTERSECTION.toString() && s.length >= 2) {
    const n = s[0], r = s[1];
    if ((n instanceof ht || n === "Ox" || n === "Oy") && (r instanceof ht || r === "Ox" || r === "Oy"))
      return [
        {
          intersection: { A: n, B: r }
        }
      ];
    if (n instanceof yi && r instanceof ht)
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
    if (n instanceof yi && r instanceof yi)
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
const Qs = {
  pt: {
    name: "point",
    description: "Create a point",
    code: "A(3,4)",
    parameters: ["drag", "drag:grid", "drag:axis", "drag:x", "drag:y", "drag:<figure>"],
    build: _e
  },
  vpt: {
    name: "point from vector",
    description: "Create a point from a vector and a starting point",
    code: "A=vpt <point>,<point>,<scale?>,<starting point?>",
    parameters: [],
    build: _e
  },
  dpt: {
    name: "point from direction line",
    description: "Create a point from a line and a starting point",
    code: "A=vpt <point>,<line>,<distance>,<perpendicular?>",
    parameters: [],
    build: _e
  },
  mid: {
    name: "mid",
    description: "Create the middle of two points",
    code: "A=mid <point>,<point>",
    parameters: [],
    build: _e
  },
  proj: {
    name: "projection",
    description: "Create the projection of a point on a line",
    code: "A=proj <point>,<line>",
    parameters: [],
    build: _e
  },
  inter: {
    name: "intersection",
    description: "Create the intersection of two lines",
    code: "A=inter <line|circle>,<line|circle>",
    parameters: [],
    build: oa
  },
  sym: {
    name: "symmetry",
    description: "Create the symmetry of a point",
    code: "A=sym <point>,<point|line>",
    parameters: [],
    build: _e
  },
  line: {
    name: "line",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Vt
  },
  vec: {
    name: "vector",
    description: "Create a vector",
    code: "d=v<line>",
    parameters: [],
    build: Vt
  },
  seg: {
    name: "segment",
    description: "Create a segment through two points",
    code: "s=<A><B>.",
    parameters: [],
    build: Vt
  },
  ray: {
    name: "ray (half line)",
    description: "Create a line, a half line or a segment",
    code: "d=<line> | <line>[ | <line>.",
    parameters: ["dash", "dot"],
    build: Vt
  },
  perp: {
    name: "perpendicular",
    description: "Create the perpendicular of a line from a point",
    code: "d=perp <line>,<point>",
    parameters: [],
    build: Vt
  },
  para: {
    name: "parallel",
    description: "Create a parallel line from a point",
    code: "d=para <line>,<point>",
    parameters: [],
    build: Vt
  },
  med: {
    name: "mediator",
    description: "Create the mediator of two points",
    code: "d=med <point>,<point>",
    parameters: [],
    build: Vt
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
    build: Vt
  },
  circ: {
    name: "circle",
    description: "Create a circle",
    code: "c=circ <point>,<radius>",
    parameters: [],
    build: Wh
  },
  arc: {
    name: "arc",
    description: "Create an arc",
    code: "c=arc <point>,<point>,<point>[,<number>]",
    parameters: [],
    build: Zh
  },
  plot: {
    name: "plot",
    description: "Plot a function",
    code: "f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]",
    parameters: [],
    build: Kh
  },
  parametric: {
    name: "parametric",
    description: "Plot a parametric function",
    code: "f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]",
    parameters: [],
    build: Qh
  },
  bezier: {
    name: "bezier",
    description: "bezier curve through points",
    code: "b=bezier A,B,C,D/<CONTROL: H,V,S>/<ratio>",
    parameters: [],
    build: na
  },
  poly: {
    name: "polygon",
    description: "Create a polygon",
    code: "p=poly <point>,<point>,<point>,...",
    parameters: [],
    build: Ks
  },
  reg: {
    name: "regular",
    description: "Create a regular polygon",
    code: "p=reg <center>,<radius>,<sides>",
    parameters: [],
    build: Ks
  },
  follow: {
    name: "follow",
    description: "Create a tangent that follows a function",
    code: "f=follow <function>,<tangent?>",
    parameters: [],
    build: Jh
  },
  fill: {
    name: "fillbetween",
    description: "Fill the area between two functions",
    code: "f=fill <function>,<function?>,<domain?>",
    parameters: [],
    build: ta
  },
  riemann: {
    name: "riemann",
    description: "Create a Riemann sum",
    code: "f=riemann <function>,<domain>,<number>,<position>",
    parameters: [],
    build: ea
  }
}, Js = [
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
var le, Pe, Qt, D, Zn, Kn, gs, Qn, Jn, tr, er, ir, sr, nr, rr, or;
class pa extends Xh {
  constructor(e, s) {
    super(e, {
      tex: (s == null ? void 0 : s.tex) ?? ((n) => n)
    });
    p(this, D);
    p(this, le);
    p(this, Pe);
    p(this, Qt);
    return f(this, Pe, new Yh({
      formatter: (n) => b(this, D, tr).call(this, n),
      keys: Js,
      splitter: {
        main: "->",
        entry: ",",
        parameter: "/"
      }
    })), f(this, Qt, {}), s != null && s.parameters && this.refreshLayout(s.parameters), f(this, le, []), s != null && s.code && b(this, D, gs).call(this, s.code), this;
  }
  get code() {
    return o(this, le);
  }
  static documentation() {
    return Qs;
  }
  /**
   * Refresh the code to display
   * @param code Code to parse and display
   */
  refresh(e) {
    this.clear(), b(this, D, gs).call(this, e);
  }
  /**
   * Refresh the layout
   * @param code Layout code to parse
   */
  refreshLayout(e) {
    const s = b(this, D, nr).call(this, e);
    this.config = s.config, this.display = s.display, f(this, Qt, s.settings), this.updateLayout();
  }
}
le = new WeakMap(), Pe = new WeakMap(), Qt = new WeakMap(), D = new WeakSet(), Zn = function(e, s, n) {
  if (e instanceof T) {
    const r = [], h = [], a = this.create.point({ x: 0, y: 0 }, e.name + "_drag");
    a.pixels = e.pixels, a.asCircle(30).fill("white/0.8"), this.layers.interactive.add(a.element), [n[s].value, ...n[s].options].forEach((u) => {
      if (["grid", "Ox", "Oy"].includes(u) && r.push(this.follow(u, e)), _t(u)) {
        const l = u.axis ?? "x", d = this.toPixels(u, l);
        r.push(
          (m, y) => ({
            x: l === "x" ? Math.max(d.min, Math.min(m, d.max)) : m,
            y: l === "y" ? Math.max(d.min, Math.min(y, d.max)) : y
          })
        );
      }
      if (Object.hasOwn(this.figures, u)) {
        const l = this.figures[u];
        h.push((d, m) => l.follow(d, m));
      }
    }), this.draggable(
      a,
      {
        target: e,
        follow: [
          ...r,
          ...h
        ]
      }
    );
  }
}, Kn = function(e, s) {
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
        const h = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
        s.stroke(h);
        break;
      }
      case "fill": {
        const h = e[n].value + (e[n].options.length > 0 ? `/${e[n].options[0]}` : "");
        s.fill(h);
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
        s.element.children().forEach((h) => {
          h.attr("id") !== `${s.name}-label` && h.hide();
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
        let h = s.name;
        if (typeof e[n].value == "string" && (h = e[n].value), n === "tex" && h.length === 2 && !isNaN(+h[1]) && (h = h[0] + "_" + h[1]), s.addLabel(
          h,
          n === "tex",
          this.toTex
        ), s.label) {
          const a = e[n].options[0] === !1 || e[n].options[0] === !0 ? "br" : e[n].options[0], c = e[n].options[1] ?? { x: 0, y: 0 }, u = {
            x: c.x * this.config.axis.x.x,
            y: -c.y * this.config.axis.y.y
          }, l = e[n].options[2];
          s.label.position(
            a,
            u,
            l
          );
        }
        break;
      }
      // Draggable
      case "drag":
        b(this, D, Zn).call(this, s, n, e);
        break;
      // Animation
      case "animate": {
        const h = {
          from: null,
          to: null,
          duration: 2,
          delay: 0,
          easing: "linear",
          loop: zs.NONE
        };
        if (Object.hasOwn(e, "from")) {
          const a = e.from.value;
          Object.hasOwn(this.figures, a) && this.figures[a] instanceof T && (h.from = this.figures[a]);
        }
        if (Object.hasOwn(e, "to")) {
          const a = e.to.value;
          Object.hasOwn(this.figures, a) && this.figures[a] instanceof T && (h.to = this.figures[a]);
        }
        Object.hasOwn(e, "duration") && (h.duration = e.duration.value), Object.hasOwn(e, "delay") && (h.delay = e.delay.value), Object.hasOwn(e, "easing") && (h.easing = e.easing.value), Object.hasOwn(e, "loop") && (h.loop = Gh(e.loop.value)), s.animate = h;
        break;
      }
      default:
        Hh.includes(n) && s.stroke(n);
    }
  });
}, /**
 * Build the figures from the code
 */
gs = function(e) {
  f(this, le, b(this, D, rr).call(this, e));
  const s = Qs;
  o(this, le).forEach((n) => {
    n.name = b(this, D, or).call(this, n.name);
    let r;
    if (Object.hasOwn(s, n.key)) {
      const { build: h, parameters: a } = s[n.key];
      a && a.length > 0 && Object.keys(n.parameters).length === 0 && Object.keys(n.parameters).filter((l) => a.includes(l)).forEach((l) => {
        n.parameters[l] = { value: !0, options: [] };
      });
      let c = h(n, this.figures, this.config);
      c && (Array.isArray(c) || (c = [c]), c.forEach((u, l) => {
        try {
          const { config: d, create: m } = u;
          d && m && (r = this.create[m](d, n.name + (c.length > 1 ? `${l + 1}` : "")));
        } catch (d) {
          console.error(d);
        }
        r && b(this, D, Qn).call(this, r, n);
      }));
    }
  });
}, Qn = function(e, s) {
  o(this, Qt).label && e instanceof T && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.label = { value: !0, options: [] }), o(this, Qt).tex && e instanceof T && s.parameters.label === void 0 && s.parameters.tex === void 0 && (s.parameters.tex = { value: !0, options: [] }), e instanceof T && o(this, Qt).points === !1 && (s.parameters["!"] = { value: !0, options: [] }), b(this, D, Kn).call(this, s.parameters, e);
}, Jn = function(e) {
  const [s, n] = e.slice(1).split(":");
  return { key: n, value: s === "begin" };
}, tr = function(e) {
  return /^[A-Z][0-9]*\(.*\)$/.exec(e) ? b(this, D, sr).call(this, e) : /^[a-z][0-9]*\([x|t]\)/.exec(e) ? b(this, D, ir).call(this, e) : e.includes("=") && !e.includes(" ") ? b(this, D, er).call(this, e) : e;
}, // TO BE MOVED TO BUILD_LINE
er = function(e) {
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
ir = function(e) {
  const [s, n] = e.split("="), r = s.split("(")[0], h = e.includes("(x)=") ? N.PLOT : N.PARAMETRIC;
  return `${r}=${h} ${n}`;
}, // TO BE MOVED TO BUILD_POINT
sr = function(e) {
  const s = e.split("(")[0], n = e.split("(")[1].split(")")[0].split(",");
  return `${s}=pt ${n[0]},${n[1]}`;
}, nr = function(e) {
  const s = o(this, Pe).parameters(e ?? "", Js), n = s.ppu ? parseFloat(s.ppu.value) : 50, r = s.x && _t(s.x.value) ? s.x.value : { min: -8, max: 8 }, h = s.y && _t(s.y.value) ? s.y.value : { min: -8, max: 8 }, a = Math.abs(r.max - r.min), c = Math.abs(h.max - h.min), u = s.unitX ? parseFloat(s.unitX.value) : 1, l = s.unitY ? parseFloat(s.unitY.value) : 1, d = a * n, m = c * n, y = {
    x: -r.min * n,
    y: h.max * n
  }, k = ti.CARTESIAN_2D, M = {
    x: { x: n * u, y: 0 },
    y: { x: 0, y: -n * l }
  }, O = !!s.grid, z = !!s.axis, Y = s.subgrid ? parseFloat(s.subgrid.value) : 0, Z = {
    label: !!s.label,
    tex: !!s.tex,
    points: s["no-points"] ? !1 : s.points ? s.points.value : "o"
  };
  return {
    config: {
      width: d,
      height: m,
      origin: y,
      system: k,
      axis: M
    },
    display: {
      grid: O,
      subgrid: Y,
      axis: z
    },
    settings: Z
  };
}, /**
 * Prepare the code to load
 * @param input Input code to parse and prepare
 * @returns
 */
rr = function(e) {
  const s = [], n = e.split(`
`).map((h) => h.trim()).filter((h) => h.trim() !== "" && !h.startsWith("$")), r = {};
  for (const h of n) {
    if (h.startsWith("@")) {
      const { key: c, value: u } = b(this, D, Jn).call(this, h);
      r[c] = { value: u, options: [] };
      continue;
    }
    const a = o(this, Pe).parse(h);
    a.parameters = Object.assign(
      a.parameters,
      r
    ), s.push(a);
  }
  return s;
}, or = function(e) {
  let s = e, n = 1;
  for (; this.figures[s]; )
    s = `${e}_${n}`, n++;
  return s;
};
export {
  vh as AXIS,
  de as BEZIERCONTROL,
  ti as COORDINATE_SYSTEM,
  Ln as LAYER_NAME,
  Ch as LINECONSTRAINT,
  kh as POINTCONSTRAINT,
  Mh as POLYGON_CONSTRAINT,
  pa as PiDraw,
  Xh as PiGraph,
  _t as isDOMAIN,
  gt as isXY
};
//# sourceMappingURL=pidraw.js.map
