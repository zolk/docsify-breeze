var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a3, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a3, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    }
  return a3;
};
var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/lit-html/lit-html.js
var t;
var i = globalThis.trustedTypes;
var s = i ? i.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var e = `lit$${(Math.random() + "").slice(9)}$`;
var o = "?" + e;
var n = `<${o}>`;
var l = document;
var h = (t4 = "") => l.createComment(t4);
var r = (t4) => t4 === null || typeof t4 != "object" && typeof t4 != "function";
var d = Array.isArray;
var u = (t4) => {
  var i5;
  return d(t4) || typeof ((i5 = t4) === null || i5 === void 0 ? void 0 : i5[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea)$/i;
var $ = (t4) => (i5, ...s5) => ({ _$litType$: t4, strings: i5, values: s5 });
var p = $(1);
var y = $(2);
var b = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var x = /* @__PURE__ */ new WeakMap();
var w = (t4, i5, s5) => {
  var e5, o6;
  const n6 = (e5 = s5 == null ? void 0 : s5.renderBefore) !== null && e5 !== void 0 ? e5 : i5;
  let l4 = n6._$litPart$;
  if (l4 === void 0) {
    const t5 = (o6 = s5 == null ? void 0 : s5.renderBefore) !== null && o6 !== void 0 ? o6 : null;
    n6._$litPart$ = l4 = new N(i5.insertBefore(h(), t5), t5, void 0, s5 != null ? s5 : {});
  }
  return l4._$AI(t4), l4;
};
var A = l.createTreeWalker(l, 129, null, false);
var C = (t4, i5) => {
  const o6 = t4.length - 1, l4 = [];
  let h3, r4 = i5 === 2 ? "<svg>" : "", d2 = c;
  for (let i6 = 0; i6 < o6; i6++) {
    const s5 = t4[i6];
    let o7, u3, $2 = -1, p2 = 0;
    for (; p2 < s5.length && (d2.lastIndex = p2, u3 = d2.exec(s5), u3 !== null); )
      p2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h3 != null ? h3 : c, $2 = -1) : u3[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u3[2].length, o7 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t4[i6 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s5 + n : $2 >= 0 ? (l4.push(o7), s5.slice(0, $2) + "$lit$" + s5.slice($2) + e + y2) : s5 + e + ($2 === -2 ? (l4.push(void 0), i6) : y2);
  }
  const u2 = r4 + (t4[o6] || "<?>") + (i5 === 2 ? "</svg>" : "");
  return [s !== void 0 ? s.createHTML(u2) : u2, l4];
};
var P = class {
  constructor({ strings: t4, _$litType$: s5 }, n6) {
    let l4;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u2 = t4.length - 1, c2 = this.parts, [v2, a3] = C(t4, s5);
    if (this.el = P.createElement(v2, n6), A.currentNode = this.el.content, s5 === 2) {
      const t5 = this.el.content, i5 = t5.firstChild;
      i5.remove(), t5.append(...i5.childNodes);
    }
    for (; (l4 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l4.nodeType === 1) {
        if (l4.hasAttributes()) {
          const t5 = [];
          for (const i5 of l4.getAttributeNames())
            if (i5.endsWith("$lit$") || i5.startsWith(e)) {
              const s6 = a3[d2++];
              if (t5.push(i5), s6 !== void 0) {
                const t6 = l4.getAttribute(s6.toLowerCase() + "$lit$").split(e), i6 = /([.?@])?(.*)/.exec(s6);
                c2.push({ type: 1, index: r4, name: i6[2], strings: t6, ctor: i6[1] === "." ? M : i6[1] === "?" ? H : i6[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r4 });
            }
          for (const i5 of t5)
            l4.removeAttribute(i5);
        }
        if (g.test(l4.tagName)) {
          const t5 = l4.textContent.split(e), s6 = t5.length - 1;
          if (s6 > 0) {
            l4.textContent = i ? i.emptyScript : "";
            for (let i5 = 0; i5 < s6; i5++)
              l4.append(t5[i5], h()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
            l4.append(t5[s6], h());
          }
        }
      } else if (l4.nodeType === 8)
        if (l4.data === o)
          c2.push({ type: 2, index: r4 });
        else {
          let t5 = -1;
          for (; (t5 = l4.data.indexOf(e, t5 + 1)) !== -1; )
            c2.push({ type: 7, index: r4 }), t5 += e.length - 1;
        }
      r4++;
    }
  }
  static createElement(t4, i5) {
    const s5 = l.createElement("template");
    return s5.innerHTML = t4, s5;
  }
};
function V(t4, i5, s5 = t4, e5) {
  var o6, n6, l4, h3;
  if (i5 === b)
    return i5;
  let d2 = e5 !== void 0 ? (o6 = s5._$Cl) === null || o6 === void 0 ? void 0 : o6[e5] : s5._$Cu;
  const u2 = r(i5) ? void 0 : i5._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n6 = d2 == null ? void 0 : d2._$AO) === null || n6 === void 0 || n6.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t4), d2._$AT(t4, s5, e5)), e5 !== void 0 ? ((l4 = (h3 = s5)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e5] = d2 : s5._$Cu = d2), d2 !== void 0 && (i5 = V(t4, d2._$AS(t4, i5.values), d2, e5)), i5;
}
var E = class {
  constructor(t4, i5) {
    this.v = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t4) {
    var i5;
    const { el: { content: s5 }, parts: e5 } = this._$AD, o6 = ((i5 = t4 == null ? void 0 : t4.creationScope) !== null && i5 !== void 0 ? i5 : l).importNode(s5, true);
    A.currentNode = o6;
    let n6 = A.nextNode(), h3 = 0, r4 = 0, d2 = e5[0];
    for (; d2 !== void 0; ) {
      if (h3 === d2.index) {
        let i6;
        d2.type === 2 ? i6 = new N(n6, n6.nextSibling, this, t4) : d2.type === 1 ? i6 = new d2.ctor(n6, d2.name, d2.strings, this, t4) : d2.type === 6 && (i6 = new L(n6, this, t4)), this.v.push(i6), d2 = e5[++r4];
      }
      h3 !== (d2 == null ? void 0 : d2.index) && (n6 = A.nextNode(), h3++);
    }
    return o6;
  }
  m(t4) {
    let i5 = 0;
    for (const s5 of this.v)
      s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t4, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t4[i5])), i5++;
  }
};
var N = class {
  constructor(t4, i5, s5, e5) {
    var o6;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s5, this.options = e5, this._$Cg = (o6 = e5 == null ? void 0 : e5.isConnected) === null || o6 === void 0 || o6;
  }
  get _$AU() {
    var t4, i5;
    return (i5 = (t4 = this._$AM) === null || t4 === void 0 ? void 0 : t4._$AU) !== null && i5 !== void 0 ? i5 : this._$Cg;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return i5 !== void 0 && t4.nodeType === 11 && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = V(this, t4, i5), r(t4) ? t4 === T || t4 == null || t4 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t4 !== this._$AH && t4 !== b && this.$(t4) : t4._$litType$ !== void 0 ? this.T(t4) : t4.nodeType !== void 0 ? this.S(t4) : u(t4) ? this.M(t4) : this.$(t4);
  }
  A(t4, i5 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t4, i5);
  }
  S(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.A(t4));
  }
  $(t4) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t4 : this.S(l.createTextNode(t4)), this._$AH = t4;
  }
  T(t4) {
    var i5;
    const { values: s5, _$litType$: e5 } = t4, o6 = typeof e5 == "number" ? this._$AC(t4) : (e5.el === void 0 && (e5.el = P.createElement(e5.h, this.options)), e5);
    if (((i5 = this._$AH) === null || i5 === void 0 ? void 0 : i5._$AD) === o6)
      this._$AH.m(s5);
    else {
      const t5 = new E(o6, this), i6 = t5.p(this.options);
      t5.m(s5), this.S(i6), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = x.get(t4.strings);
    return i5 === void 0 && x.set(t4.strings, i5 = new P(t4)), i5;
  }
  M(t4) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s5, e5 = 0;
    for (const o6 of t4)
      e5 === i5.length ? i5.push(s5 = new N(this.A(h()), this.A(h()), this, this.options)) : s5 = i5[e5], s5._$AI(o6), e5++;
    e5 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, i5) {
    var s5;
    for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i5); t4 && t4 !== this._$AB; ) {
      const i6 = t4.nextSibling;
      t4.remove(), t4 = i6;
    }
  }
  setConnected(t4) {
    var i5;
    this._$AM === void 0 && (this._$Cg = t4, (i5 = this._$AP) === null || i5 === void 0 || i5.call(this, t4));
  }
};
var S = class {
  constructor(t4, i5, s5, e5, o6) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = o6, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4, i5 = this, s5, e5) {
    const o6 = this.strings;
    let n6 = false;
    if (o6 === void 0)
      t4 = V(this, t4, i5, 0), n6 = !r(t4) || t4 !== this._$AH && t4 !== b, n6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let l4, h3;
      for (t4 = o6[0], l4 = 0; l4 < o6.length - 1; l4++)
        h3 = V(this, e6[s5 + l4], i5, l4), h3 === b && (h3 = this._$AH[l4]), n6 || (n6 = !r(h3) || h3 !== this._$AH[l4]), h3 === T ? t4 = T : t4 !== T && (t4 += (h3 != null ? h3 : "") + o6[l4 + 1]), this._$AH[l4] = h3;
    }
    n6 && !e5 && this.k(t4);
  }
  k(t4) {
    t4 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 != null ? t4 : "");
  }
};
var M = class extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t4) {
    this.element[this.name] = t4 === T ? void 0 : t4;
  }
};
var k = i ? i.emptyScript : "";
var H = class extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t4) {
    t4 && t4 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S {
  constructor(t4, i5, s5, e5, o6) {
    super(t4, i5, s5, e5, o6), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    var s5;
    if ((t4 = (s5 = V(this, t4, i5, 0)) !== null && s5 !== void 0 ? s5 : T) === b)
      return;
    const e5 = this._$AH, o6 = t4 === T && e5 !== T || t4.capture !== e5.capture || t4.once !== e5.once || t4.passive !== e5.passive, n6 = t4 !== T && (e5 === T || o6);
    o6 && this.element.removeEventListener(this.name, this, e5), n6 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    var i5, s5;
    typeof this._$AH == "function" ? this._$AH.call((s5 = (i5 = this.options) === null || i5 === void 0 ? void 0 : i5.host) !== null && s5 !== void 0 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var L = class {
  constructor(t4, i5, s5) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    V(this, t4);
  }
};
var z = window.litHtmlPolyfillSupport;
z == null || z(P, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.0.2");

// node_modules/@lit/reactive-element/css-tag.js
var t2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e2 = Symbol();
var n2 = /* @__PURE__ */ new Map();
var s2 = class {
  constructor(t4, n6) {
    if (this._$cssResult$ = true, n6 !== e2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4;
  }
  get styleSheet() {
    let e5 = n2.get(this.cssText);
    return t2 && e5 === void 0 && (n2.set(this.cssText, e5 = new CSSStyleSheet()), e5.replaceSync(this.cssText)), e5;
  }
  toString() {
    return this.cssText;
  }
};
var o2 = (t4) => new s2(typeof t4 == "string" ? t4 : t4 + "", e2);
var r2 = (t4, ...n6) => {
  const o6 = t4.length === 1 ? t4[0] : n6.reduce((e5, n7, s5) => e5 + ((t5) => {
    if (t5._$cssResult$ === true)
      return t5.cssText;
    if (typeof t5 == "number")
      return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n7) + t4[s5 + 1], t4[0]);
  return new s2(o6, e2);
};
var i2 = (e5, n6) => {
  t2 ? e5.adoptedStyleSheets = n6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n6.forEach((t4) => {
    const n7 = document.createElement("style"), s5 = window.litNonce;
    s5 !== void 0 && n7.setAttribute("nonce", s5), n7.textContent = t4.cssText, e5.appendChild(n7);
  });
};
var S2 = t2 ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const n6 of t5.cssRules)
    e5 += n6.cssText;
  return o2(e5);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var s3;
var e3 = window.trustedTypes;
var r3 = e3 ? e3.emptyScript : "";
var h2 = window.reactiveElementPolyfillSupport;
var o3 = { toAttribute(t4, i5) {
  switch (i5) {
    case Boolean:
      t4 = t4 ? r3 : null;
      break;
    case Object:
    case Array:
      t4 = t4 == null ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, i5) {
  let s5 = t4;
  switch (i5) {
    case Boolean:
      s5 = t4 !== null;
      break;
    case Number:
      s5 = t4 === null ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t4);
      } catch (t5) {
        s5 = null;
      }
  }
  return s5;
} };
var n3 = (t4, i5) => i5 !== t4 && (i5 == i5 || t4 == t4);
var l2 = { attribute: true, type: String, converter: o3, reflect: false, hasChanged: n3 };
var a2 = class extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t4) {
    var i5;
    (i5 = this.l) !== null && i5 !== void 0 || (this.l = []), this.l.push(t4);
  }
  static get observedAttributes() {
    this.finalize();
    const t4 = [];
    return this.elementProperties.forEach((i5, s5) => {
      const e5 = this._$Eh(s5, i5);
      e5 !== void 0 && (this._$Eu.set(e5, s5), t4.push(e5));
    }), t4;
  }
  static createProperty(t4, i5 = l2) {
    if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t4, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t4)) {
      const s5 = typeof t4 == "symbol" ? Symbol() : "__" + t4, e5 = this.getPropertyDescriptor(t4, s5, i5);
      e5 !== void 0 && Object.defineProperty(this.prototype, t4, e5);
    }
  }
  static getPropertyDescriptor(t4, i5, s5) {
    return { get() {
      return this[i5];
    }, set(e5) {
      const r4 = this[t4];
      this[i5] = e5, this.requestUpdate(t4, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) || l2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t4 = Object.getPrototypeOf(this);
    if (t4.finalize(), this.elementProperties = new Map(t4.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t5 = this.properties, i5 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
      for (const s5 of i5)
        this.createProperty(s5, t5[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i5) {
    const s5 = [];
    if (Array.isArray(i5)) {
      const e5 = new Set(i5.flat(1 / 0).reverse());
      for (const i6 of e5)
        s5.unshift(S2(i6));
    } else
      i5 !== void 0 && s5.push(S2(i5));
    return s5;
  }
  static _$Eh(t4, i5) {
    const s5 = i5.attribute;
    return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t4 == "string" ? t4.toLowerCase() : void 0;
  }
  o() {
    var t4;
    this._$Ep = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t4 = this.constructor.l) === null || t4 === void 0 || t4.forEach((t5) => t5(this));
  }
  addController(t4) {
    var i5, s5;
    ((i5 = this._$Eg) !== null && i5 !== void 0 ? i5 : this._$Eg = []).push(t4), this.renderRoot !== void 0 && this.isConnected && ((s5 = t4.hostConnected) === null || s5 === void 0 || s5.call(t4));
  }
  removeController(t4) {
    var i5;
    (i5 = this._$Eg) === null || i5 === void 0 || i5.splice(this._$Eg.indexOf(t4) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t4, i5) => {
      this.hasOwnProperty(i5) && (this._$Et.set(i5, this[i5]), delete this[i5]);
    });
  }
  createRenderRoot() {
    var t4;
    const s5 = (t4 = this.shadowRoot) !== null && t4 !== void 0 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
    return i2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t4;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
      var i5;
      return (i5 = t5.hostConnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
    });
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    var t4;
    (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
      var i5;
      return (i5 = t5.hostDisconnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
    });
  }
  attributeChangedCallback(t4, i5, s5) {
    this._$AK(t4, s5);
  }
  _$ES(t4, i5, s5 = l2) {
    var e5, r4;
    const h3 = this.constructor._$Eh(t4, s5);
    if (h3 !== void 0 && s5.reflect === true) {
      const n6 = ((r4 = (e5 = s5.converter) === null || e5 === void 0 ? void 0 : e5.toAttribute) !== null && r4 !== void 0 ? r4 : o3.toAttribute)(i5, s5.type);
      this._$Ei = t4, n6 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n6), this._$Ei = null;
    }
  }
  _$AK(t4, i5) {
    var s5, e5, r4;
    const h3 = this.constructor, n6 = h3._$Eu.get(t4);
    if (n6 !== void 0 && this._$Ei !== n6) {
      const t5 = h3.getPropertyOptions(n6), l4 = t5.converter, a3 = (r4 = (e5 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e5 !== void 0 ? e5 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o3.fromAttribute;
      this._$Ei = n6, this[n6] = a3(i5, t5.type), this._$Ei = null;
    }
  }
  requestUpdate(t4, i5, s5) {
    let e5 = true;
    t4 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || n3)(this[t4], i5) ? (this._$AL.has(t4) || this._$AL.set(t4, i5), s5.reflect === true && this._$Ei !== t4 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t4, s5))) : e5 = false), !this.isUpdatePending && e5 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return t4 != null && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t4;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t5, i6) => this[i6] = t5), this._$Et = void 0);
    let i5 = false;
    const s5 = this._$AL;
    try {
      i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
        var i6;
        return (i6 = t5.hostUpdate) === null || i6 === void 0 ? void 0 : i6.call(t5);
      }), this.update(s5)) : this._$EU();
    } catch (t5) {
      throw i5 = false, this._$EU(), t5;
    }
    i5 && this._$AE(s5);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    var i5;
    (i5 = this._$Eg) === null || i5 === void 0 || i5.forEach((t5) => {
      var i6;
      return (i6 = t5.hostUpdated) === null || i6 === void 0 ? void 0 : i6.call(t5);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$E_ !== void 0 && (this._$E_.forEach((t5, i5) => this._$ES(i5, this[i5], t5)), this._$E_ = void 0), this._$EU();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
a2.finalized = true, a2.elementProperties = /* @__PURE__ */ new Map(), a2.elementStyles = [], a2.shadowRootOptions = { mode: "open" }, h2 == null || h2({ ReactiveElement: a2 }), ((s3 = globalThis.reactiveElementVersions) !== null && s3 !== void 0 ? s3 : globalThis.reactiveElementVersions = []).push("1.0.2");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends a2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t4, e5;
    const i5 = super.createRenderRoot();
    return (t4 = (e5 = this.renderOptions).renderBefore) !== null && t4 !== void 0 || (e5.renderBefore = i5.firstChild), i5;
  }
  update(t4) {
    const i5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Dt = w(i5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t4;
    super.connectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(true);
  }
  disconnectedCallback() {
    var t4;
    super.disconnectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(false);
  }
  render() {
    return b;
  }
};
s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
n4 == null || n4({ LitElement: s4 });
((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.0.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n5 = (n6) => (e5) => typeof e5 == "function" ? ((n7, e6) => (window.customElements.define(n7, e6), e6))(n6, e5) : ((n7, e6) => {
  const { kind: t4, elements: i5 } = e6;
  return { kind: t4, elements: i5, finisher(e7) {
    window.customElements.define(n7, e7);
  } };
})(n6, e5);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i5, e5) => e5.kind === "method" && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n6) {
  n6.createProperty(e5.key, i5);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  typeof e5.initializer == "function" && (this[e5.key] = e5.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e5.key, i5);
} };
function e4(e5) {
  return (n6, t4) => t4 !== void 0 ? ((i5, e6, n7) => {
    e6.constructor.createProperty(n7, i5);
  })(e5, n6, t4) : i3(e5, n6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t4) {
  return e4(__spreadProps(__spreadValues({}, t4), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e5, descriptor: t4 }) => (o6, n6) => {
  var r4;
  if (n6 === void 0) {
    const n7 = (r4 = o6.originalKey) !== null && r4 !== void 0 ? r4 : o6.key, i5 = t4 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t4(o6.key) } : __spreadProps(__spreadValues({}, o6), { key: n7 });
    return e5 != null && (i5.finisher = function(t5) {
      e5(t5, n7);
    }), i5;
  }
  {
    const r5 = o6.constructor;
    t4 !== void 0 && Object.defineProperty(o6, n6, t4(n6)), e5 == null || e5(r5, n6);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i4(i5, n6) {
  return o5({ descriptor: (o6) => {
    const t4 = { get() {
      var o7, n7;
      return (n7 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i5)) !== null && n7 !== void 0 ? n7 : null;
    }, enumerable: true, configurable: true };
    if (n6) {
      const n7 = typeof o6 == "symbol" ? Symbol() : "__" + o6;
      t4.get = function() {
        var o7, t5;
        return this[n7] === void 0 && (this[n7] = (t5 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i5)) !== null && t5 !== void 0 ? t5 : null), this[n7];
      };
    }
    return t4;
  } });
}

// src/lib/base-styles.ts
var base_styles_default = r2`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;

export {
  __decorateClass,
  r2 as r,
  p,
  y,
  T,
  s4 as s,
  n5 as n,
  e4 as e,
  t3 as t,
  i4 as i,
  base_styles_default
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
