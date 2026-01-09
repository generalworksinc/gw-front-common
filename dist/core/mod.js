import H from "dayjs";
const yt = (t, e) => {
  let r = 0;
  const o = [];
  for (; r <= e - t; )
    o.push(t + r), r += 1;
  return o;
}, pt = (t) => {
  const e = [];
  if (t) {
    for (const r of Object.keys(t))
      e.push(t[r]);
    return e;
  } else
    return e;
}, Ot = (t) => new Promise((e) => setTimeout(e, t));
function A(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var P = { exports: {} }, Q = P.exports, K;
function X() {
  return K || (K = 1, (function(t, e) {
    (function(r, o) {
      t.exports = o();
    })(Q, (function() {
      var r = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, o = {};
      return function(h, m, s) {
        var $, d = function(u, f, a) {
          a === void 0 && (a = {});
          var n = new Date(u), l = (function(y, g) {
            g === void 0 && (g = {});
            var _ = g.timeZoneName || "short", v = y + "|" + _, i = o[v];
            return i || (i = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: y, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: _ }), o[v] = i), i;
          })(f, a);
          return l.formatToParts(n);
        }, b = function(u, f) {
          for (var a = d(u, f), n = [], l = 0; l < a.length; l += 1) {
            var y = a[l], g = y.type, _ = y.value, v = r[g];
            v >= 0 && (n[v] = parseInt(_, 10));
          }
          var i = n[3], O = i === 24 ? 0 : i, c = n[0] + "-" + n[1] + "-" + n[2] + " " + O + ":" + n[4] + ":" + n[5] + ":000", D = +u;
          return (s.utc(c).valueOf() - (D -= D % 1e3)) / 6e4;
        }, x = m.prototype;
        x.tz = function(u, f) {
          u === void 0 && (u = $);
          var a, n = this.utcOffset(), l = this.toDate(), y = l.toLocaleString("en-US", { timeZone: u }), g = Math.round((l - new Date(y)) / 1e3 / 60), _ = 15 * -Math.round(l.getTimezoneOffset() / 15) - g;
          if (!Number(_)) a = this.utcOffset(0, f);
          else if (a = s(y, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(_, !0), f) {
            var v = a.utcOffset();
            a = a.add(n - v, "minute");
          }
          return a.$x.$timezone = u, a;
        }, x.offsetName = function(u) {
          var f = this.$x.$timezone || s.tz.guess(), a = d(this.valueOf(), f, { timeZoneName: u }).find((function(n) {
            return n.type.toLowerCase() === "timezonename";
          }));
          return a && a.value;
        };
        var w = x.startOf;
        x.startOf = function(u, f) {
          if (!this.$x || !this.$x.$timezone) return w.call(this, u, f);
          var a = s(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return w.call(a, u, f).tz(this.$x.$timezone, !0);
        }, s.tz = function(u, f, a) {
          var n = a && f, l = a || f || $, y = b(+s(), l);
          if (typeof u != "string") return s(u).tz(l);
          var g = (function(O, c, D) {
            var Y = O - 60 * c * 1e3, p = b(Y, D);
            if (c === p) return [Y, c];
            var j = b(Y -= 60 * (p - c) * 1e3, D);
            return p === j ? [Y, p] : [O - 60 * Math.min(p, j) * 1e3, Math.max(p, j)];
          })(s.utc(u, n).valueOf(), y, l), _ = g[0], v = g[1], i = s(_).utcOffset(v);
          return i.$x.$timezone = l, i;
        }, s.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, s.tz.setDefault = function(u) {
          $ = u;
        };
      };
    }));
  })(P)), P.exports;
}
var tt = X();
const et = /* @__PURE__ */ A(tt);
var k = { exports: {} }, nt = k.exports, J;
function rt() {
  return J || (J = 1, (function(t, e) {
    (function(r, o) {
      t.exports = o();
    })(nt, (function() {
      var r = "minute", o = /[+-]\d\d(?::?\d\d)?/g, h = /([+-]|\d\d)/g;
      return function(m, s, $) {
        var d = s.prototype;
        $.utc = function(n) {
          var l = { date: n, utc: !0, args: arguments };
          return new s(l);
        }, d.utc = function(n) {
          var l = $(this.toDate(), { locale: this.$L, utc: !0 });
          return n ? l.add(this.utcOffset(), r) : l;
        }, d.local = function() {
          return $(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var b = d.parse;
        d.parse = function(n) {
          n.utc && (this.$u = !0), this.$utils().u(n.$offset) || (this.$offset = n.$offset), b.call(this, n);
        };
        var x = d.init;
        d.init = function() {
          if (this.$u) {
            var n = this.$d;
            this.$y = n.getUTCFullYear(), this.$M = n.getUTCMonth(), this.$D = n.getUTCDate(), this.$W = n.getUTCDay(), this.$H = n.getUTCHours(), this.$m = n.getUTCMinutes(), this.$s = n.getUTCSeconds(), this.$ms = n.getUTCMilliseconds();
          } else x.call(this);
        };
        var w = d.utcOffset;
        d.utcOffset = function(n, l) {
          var y = this.$utils().u;
          if (y(n)) return this.$u ? 0 : y(this.$offset) ? w.call(this) : this.$offset;
          if (typeof n == "string" && (n = (function(i) {
            i === void 0 && (i = "");
            var O = i.match(o);
            if (!O) return null;
            var c = ("" + O[0]).match(h) || ["-", 0, 0], D = c[0], Y = 60 * +c[1] + +c[2];
            return Y === 0 ? 0 : D === "+" ? Y : -Y;
          })(n), n === null)) return this;
          var g = Math.abs(n) <= 16 ? 60 * n : n;
          if (g === 0) return this.utc(l);
          var _ = this.clone();
          if (l) return _.$offset = g, _.$u = !1, _;
          var v = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (_ = this.local().add(g + v, r)).$offset = g, _.$x.$localOffset = v, _;
        };
        var u = d.format;
        d.format = function(n) {
          var l = n || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return u.call(this, l);
        }, d.valueOf = function() {
          var n = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * n;
        }, d.isUTC = function() {
          return !!this.$u;
        }, d.toISOString = function() {
          return this.toDate().toISOString();
        }, d.toString = function() {
          return this.toDate().toUTCString();
        };
        var f = d.toDate;
        d.toDate = function(n) {
          return n === "s" && this.$offset ? $(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : f.call(this);
        };
        var a = d.diff;
        d.diff = function(n, l, y) {
          if (n && this.$u === n.$u) return a.call(this, n, l, y);
          var g = this.local(), _ = $(n).local();
          return a.call(g, _, l, y);
        };
      };
    }));
  })(k)), k.exports;
}
var ot = rt();
const it = /* @__PURE__ */ A(ot);
var F = { exports: {} }, st = F.exports, V;
function ut() {
  return V || (V = 1, (function(t, e) {
    (function(r, o) {
      t.exports = o(H);
    })(st, (function(r) {
      function o(s) {
        return s && typeof s == "object" && "default" in s ? s : { default: s };
      }
      var h = o(r), m = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s) {
        return s + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(s) {
        return s < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return h.default.locale(m, null, !0), m;
    }));
  })(F)), F.exports;
}
ut();
H.extend(it);
H.extend(et);
H.locale("ja");
const E = H, $t = (t) => t ? E(t).format("YYYY-MM-DDTHH:mm") : "", Dt = (t) => {
  if (!t) return null;
  const e = E(t);
  return e.isValid() ? e.toDate() : null;
}, Yt = () => E, xt = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var I = { exports: {} }, W;
function ft() {
  return W || (W = 1, (function(t) {
    var e = (function() {
      function r(u, f) {
        return f != null && u instanceof f;
      }
      var o;
      try {
        o = Map;
      } catch {
        o = function() {
        };
      }
      var h;
      try {
        h = Set;
      } catch {
        h = function() {
        };
      }
      var m;
      try {
        m = Promise;
      } catch {
        m = function() {
        };
      }
      function s(u, f, a, n, l) {
        typeof f == "object" && (a = f.depth, n = f.prototype, l = f.includeNonEnumerable, f = f.circular);
        var y = [], g = [], _ = typeof Buffer < "u";
        typeof f > "u" && (f = !0), typeof a > "u" && (a = 1 / 0);
        function v(i, O) {
          if (i === null)
            return null;
          if (O === 0)
            return i;
          var c, D;
          if (typeof i != "object")
            return i;
          if (r(i, o))
            c = new o();
          else if (r(i, h))
            c = new h();
          else if (r(i, m))
            c = new m(function(S, T) {
              i.then(function(C) {
                S(v(C, O - 1));
              }, function(C) {
                T(v(C, O - 1));
              });
            });
          else if (s.__isArray(i))
            c = [];
          else if (s.__isRegExp(i))
            c = new RegExp(i.source, w(i)), i.lastIndex && (c.lastIndex = i.lastIndex);
          else if (s.__isDate(i))
            c = new Date(i.getTime());
          else {
            if (_ && Buffer.isBuffer(i))
              return Buffer.allocUnsafe ? c = Buffer.allocUnsafe(i.length) : c = new Buffer(i.length), i.copy(c), c;
            r(i, Error) ? c = Object.create(i) : typeof n > "u" ? (D = Object.getPrototypeOf(i), c = Object.create(D)) : (c = Object.create(n), D = n);
          }
          if (f) {
            var Y = y.indexOf(i);
            if (Y != -1)
              return g[Y];
            y.push(i), g.push(c);
          }
          r(i, o) && i.forEach(function(S, T) {
            var C = v(T, O - 1), G = v(S, O - 1);
            c.set(C, G);
          }), r(i, h) && i.forEach(function(S) {
            var T = v(S, O - 1);
            c.add(T);
          });
          for (var p in i) {
            var j;
            D && (j = Object.getOwnPropertyDescriptor(D, p)), !(j && j.set == null) && (c[p] = v(i[p], O - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var q = Object.getOwnPropertySymbols(i), p = 0; p < q.length; p++) {
              var L = q[p], M = Object.getOwnPropertyDescriptor(i, L);
              M && !M.enumerable && !l || (c[L] = v(i[L], O - 1), M.enumerable || Object.defineProperty(c, L, {
                enumerable: !1
              }));
            }
          if (l)
            for (var Z = Object.getOwnPropertyNames(i), p = 0; p < Z.length; p++) {
              var U = Z[p], M = Object.getOwnPropertyDescriptor(i, U);
              M && M.enumerable || (c[U] = v(i[U], O - 1), Object.defineProperty(c, U, {
                enumerable: !1
              }));
            }
          return c;
        }
        return v(u, a);
      }
      s.clonePrototype = function(f) {
        if (f === null)
          return null;
        var a = function() {
        };
        return a.prototype = f, new a();
      };
      function $(u) {
        return Object.prototype.toString.call(u);
      }
      s.__objToStr = $;
      function d(u) {
        return typeof u == "object" && $(u) === "[object Date]";
      }
      s.__isDate = d;
      function b(u) {
        return typeof u == "object" && $(u) === "[object Array]";
      }
      s.__isArray = b;
      function x(u) {
        return typeof u == "object" && $(u) === "[object RegExp]";
      }
      s.__isRegExp = x;
      function w(u) {
        var f = "";
        return u.global && (f += "g"), u.ignoreCase && (f += "i"), u.multiline && (f += "m"), f;
      }
      return s.__getRegExpFlags = w, s;
    })();
    t.exports && (t.exports = e);
  })(I)), I.exports;
}
var ct = ft();
const at = /* @__PURE__ */ A(ct), lt = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), R = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), bt = (t) => {
  const e = R(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, ht = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), wt = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), jt = (t) => t || "", Mt = (t) => t == null || String(t).trim() === "", St = (t, e, r) => t.slice(0, e) + r + t.slice(e), Tt = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), dt = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const r in t) {
    const o = t[r];
    !Object.prototype.hasOwnProperty.call(t, r) || typeof o != "object" || Object.isFrozen(o) || dt(o);
  }
  return t;
}, vt = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", B = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const r = {};
  for (const o in t) {
    const h = t[o];
    Object.prototype.hasOwnProperty.call(t, o) && (r[e(o)] = h !== null ? B(h, e) : null);
  }
  return r;
}, Ct = (t) => B(t, R), mt = (t) => B(t, ht), zt = (t) => {
  const e = at(t);
  for (const r of Object.keys(e))
    (!e[r] || e[r] === 0) && (e[r] = void 0);
  return e;
}, gt = (t, e, r = !1, o = !1) => {
  if (!vt(t))
    return t;
  let h;
  e && e.length > 0 ? h = (s) => e.includes(s) : h = (s) => !0;
  const m = {};
  for (const s of Object.keys(t).filter(h)) {
    const $ = r ? lt(s) : o ? R(s) : s;
    m[$] = gt(
      t[s],
      void 0,
      r,
      o
    );
  }
  return m;
}, Ht = (t, e, r) => {
  const o = !e || e.length === 0 ? Object.keys(t) : e, h = {};
  for (const m of Object.keys(t).filter((s) => o?.includes(s))) {
    const s = r ? r(m) : m;
    h[s] = t[m];
  }
  return h;
}, Lt = (t, e) => {
  const r = {};
  for (const o of Object.keys(t).filter((h) => e(t[h])))
    r[o] = t[o];
  return r;
}, N = (t, e, r) => {
  if (t.indexOf(".") === 0)
    r[e[t]] = e;
  else {
    let o = e;
    for (const h of t.split(".")) {
      if (o == null)
        break;
      o = o[h];
    }
    if (o == null)
      throw new Error("keyName is not found in object");
    r[o] = e;
  }
}, Ut = (t, e = "id") => {
  const r = {};
  if (t)
    if (Array.isArray(t)) {
      for (const o of t)
        N(e, o, r);
      return r;
    } else {
      for (const o of Object.keys(t)) {
        const h = t[o];
        N(e, h, r);
      }
      return r;
    }
  else return r;
}, Pt = (t) => mt(t), z = /* @__PURE__ */ new Map();
function kt(t, e, r = 0) {
  const o = z.get(t), h = Date.now();
  if (o && h - o.ts <= o.ttl)
    return o.p;
  const m = e().catch((s) => {
    throw z.delete(t), s;
  }).then((s) => (r > 0 ? z.set(t, { p: m, ts: Date.now(), ttl: r }) : z.delete(t), s));
  return z.set(t, { p: m, ts: h, ttl: r }), m;
}
const Ft = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  Yt as $getDayjs,
  Pt as __test__replaceHeadLower,
  jt as cNull,
  lt as camelToSnake,
  Tt as cardConv,
  E as dayjsJp,
  dt as deepFreeze,
  $t as formatDateForInput,
  ht as headLower,
  wt as headUpper,
  Mt as isBlank,
  Ft as isFunction,
  vt as isPlainObject,
  xt as numberWithCommas,
  pt as obj2Array,
  zt as objectConvUndefined,
  gt as objectFilter,
  Lt as objectFilterFunc,
  Ht as objectFilterKey,
  Ut as objectifyByKeyParam,
  Dt as parseInputDate,
  yt as range,
  B as replaceKeys,
  Ct as replaceSnakeToCamel,
  Ot as sleep,
  R as snakeToCamel,
  bt as snakeToCamelHeadUpper,
  St as strIns,
  kt as withInflight
};
