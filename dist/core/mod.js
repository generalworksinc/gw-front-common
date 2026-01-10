import H from "dayjs";
const yt = (t, e) => {
  let n = 0;
  const r = [];
  for (; n <= e - t; )
    r.push(t + n), n += 1;
  return r;
}, pt = (t) => {
  const e = [];
  if (t) {
    for (const n of Object.keys(t))
      e.push(t[n]);
    return e;
  } else
    return e;
}, Ot = (t) => new Promise((e) => setTimeout(e, t));
function I(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var P = { exports: {} }, G = P.exports, K;
function X() {
  return K || (K = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(G, (function() {
      var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(l, m, s) {
        var $, d = function(u, f, a) {
          a === void 0 && (a = {});
          var o = new Date(u), h = (function(y, g) {
            g === void 0 && (g = {});
            var _ = g.timeZoneName || "short", v = y + "|" + _, i = r[v];
            return i || (i = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: y, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: _ }), r[v] = i), i;
          })(f, a);
          return h.formatToParts(o);
        }, b = function(u, f) {
          for (var a = d(u, f), o = [], h = 0; h < a.length; h += 1) {
            var y = a[h], g = y.type, _ = y.value, v = n[g];
            v >= 0 && (o[v] = parseInt(_, 10));
          }
          var i = o[3], O = i === 24 ? 0 : i, c = o[0] + "-" + o[1] + "-" + o[2] + " " + O + ":" + o[4] + ":" + o[5] + ":000", D = +u;
          return (s.utc(c).valueOf() - (D -= D % 1e3)) / 6e4;
        }, x = m.prototype;
        x.tz = function(u, f) {
          u === void 0 && (u = $);
          var a, o = this.utcOffset(), h = this.toDate(), y = h.toLocaleString("en-US", { timeZone: u }), g = Math.round((h - new Date(y)) / 1e3 / 60), _ = 15 * -Math.round(h.getTimezoneOffset() / 15) - g;
          if (!Number(_)) a = this.utcOffset(0, f);
          else if (a = s(y, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(_, !0), f) {
            var v = a.utcOffset();
            a = a.add(o - v, "minute");
          }
          return a.$x.$timezone = u, a;
        }, x.offsetName = function(u) {
          var f = this.$x.$timezone || s.tz.guess(), a = d(this.valueOf(), f, { timeZoneName: u }).find((function(o) {
            return o.type.toLowerCase() === "timezonename";
          }));
          return a && a.value;
        };
        var w = x.startOf;
        x.startOf = function(u, f) {
          if (!this.$x || !this.$x.$timezone) return w.call(this, u, f);
          var a = s(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return w.call(a, u, f).tz(this.$x.$timezone, !0);
        }, s.tz = function(u, f, a) {
          var o = a && f, h = a || f || $, y = b(+s(), h);
          if (typeof u != "string") return s(u).tz(h);
          var g = (function(O, c, D) {
            var Y = O - 60 * c * 1e3, p = b(Y, D);
            if (c === p) return [Y, c];
            var j = b(Y -= 60 * (p - c) * 1e3, D);
            return p === j ? [Y, p] : [O - 60 * Math.min(p, j) * 1e3, Math.max(p, j)];
          })(s.utc(u, o).valueOf(), y, h), _ = g[0], v = g[1], i = s(_).utcOffset(v);
          return i.$x.$timezone = h, i;
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
const et = /* @__PURE__ */ I(tt);
var k = { exports: {} }, nt = k.exports, J;
function rt() {
  return J || (J = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(nt, (function() {
      var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, l = /([+-]|\d\d)/g;
      return function(m, s, $) {
        var d = s.prototype;
        $.utc = function(o) {
          var h = { date: o, utc: !0, args: arguments };
          return new s(h);
        }, d.utc = function(o) {
          var h = $(this.toDate(), { locale: this.$L, utc: !0 });
          return o ? h.add(this.utcOffset(), n) : h;
        }, d.local = function() {
          return $(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var b = d.parse;
        d.parse = function(o) {
          o.utc && (this.$u = !0), this.$utils().u(o.$offset) || (this.$offset = o.$offset), b.call(this, o);
        };
        var x = d.init;
        d.init = function() {
          if (this.$u) {
            var o = this.$d;
            this.$y = o.getUTCFullYear(), this.$M = o.getUTCMonth(), this.$D = o.getUTCDate(), this.$W = o.getUTCDay(), this.$H = o.getUTCHours(), this.$m = o.getUTCMinutes(), this.$s = o.getUTCSeconds(), this.$ms = o.getUTCMilliseconds();
          } else x.call(this);
        };
        var w = d.utcOffset;
        d.utcOffset = function(o, h) {
          var y = this.$utils().u;
          if (y(o)) return this.$u ? 0 : y(this.$offset) ? w.call(this) : this.$offset;
          if (typeof o == "string" && (o = (function(i) {
            i === void 0 && (i = "");
            var O = i.match(r);
            if (!O) return null;
            var c = ("" + O[0]).match(l) || ["-", 0, 0], D = c[0], Y = 60 * +c[1] + +c[2];
            return Y === 0 ? 0 : D === "+" ? Y : -Y;
          })(o), o === null)) return this;
          var g = Math.abs(o) <= 16 ? 60 * o : o;
          if (g === 0) return this.utc(h);
          var _ = this.clone();
          if (h) return _.$offset = g, _.$u = !1, _;
          var v = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (_ = this.local().add(g + v, n)).$offset = g, _.$x.$localOffset = v, _;
        };
        var u = d.format;
        d.format = function(o) {
          var h = o || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return u.call(this, h);
        }, d.valueOf = function() {
          var o = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * o;
        }, d.isUTC = function() {
          return !!this.$u;
        }, d.toISOString = function() {
          return this.toDate().toISOString();
        }, d.toString = function() {
          return this.toDate().toUTCString();
        };
        var f = d.toDate;
        d.toDate = function(o) {
          return o === "s" && this.$offset ? $(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : f.call(this);
        };
        var a = d.diff;
        d.diff = function(o, h, y) {
          if (o && this.$u === o.$u) return a.call(this, o, h, y);
          var g = this.local(), _ = $(o).local();
          return a.call(g, _, h, y);
        };
      };
    }));
  })(k)), k.exports;
}
var ot = rt();
const it = /* @__PURE__ */ I(ot);
var F = { exports: {} }, st = F.exports, V;
function ut() {
  return V || (V = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r(H);
    })(st, (function(n) {
      function r(s) {
        return s && typeof s == "object" && "default" in s ? s : { default: s };
      }
      var l = r(n), m = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s) {
        return s + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(s) {
        return s < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return l.default.locale(m, null, !0), m;
    }));
  })(F)), F.exports;
}
ut();
H.extend(it);
H.extend(et);
H.locale("ja");
const A = H, $t = (t) => t ? A(t).format("YYYY-MM-DDTHH:mm") : "", Dt = (t) => {
  if (!t) return null;
  const e = A(t);
  return e.isValid() ? e.toDate() : null;
}, Yt = () => A, xt = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var E = { exports: {} }, W;
function ft() {
  return W || (W = 1, (function(t) {
    var e = (function() {
      function n(u, f) {
        return f != null && u instanceof f;
      }
      var r;
      try {
        r = Map;
      } catch {
        r = function() {
        };
      }
      var l;
      try {
        l = Set;
      } catch {
        l = function() {
        };
      }
      var m;
      try {
        m = Promise;
      } catch {
        m = function() {
        };
      }
      function s(u, f, a, o, h) {
        typeof f == "object" && (a = f.depth, o = f.prototype, h = f.includeNonEnumerable, f = f.circular);
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
          if (n(i, r))
            c = new r();
          else if (n(i, l))
            c = new l();
          else if (n(i, m))
            c = new m(function(M, T) {
              i.then(function(C) {
                M(v(C, O - 1));
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
            n(i, Error) ? c = Object.create(i) : typeof o > "u" ? (D = Object.getPrototypeOf(i), c = Object.create(D)) : (c = Object.create(o), D = o);
          }
          if (f) {
            var Y = y.indexOf(i);
            if (Y != -1)
              return g[Y];
            y.push(i), g.push(c);
          }
          n(i, r) && i.forEach(function(M, T) {
            var C = v(T, O - 1), Q = v(M, O - 1);
            c.set(C, Q);
          }), n(i, l) && i.forEach(function(M) {
            var T = v(M, O - 1);
            c.add(T);
          });
          for (var p in i) {
            var j;
            D && (j = Object.getOwnPropertyDescriptor(D, p)), !(j && j.set == null) && (c[p] = v(i[p], O - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var q = Object.getOwnPropertySymbols(i), p = 0; p < q.length; p++) {
              var L = q[p], S = Object.getOwnPropertyDescriptor(i, L);
              S && !S.enumerable && !h || (c[L] = v(i[L], O - 1), S.enumerable || Object.defineProperty(c, L, {
                enumerable: !1
              }));
            }
          if (h)
            for (var Z = Object.getOwnPropertyNames(i), p = 0; p < Z.length; p++) {
              var U = Z[p], S = Object.getOwnPropertyDescriptor(i, U);
              S && S.enumerable || (c[U] = v(i[U], O - 1), Object.defineProperty(c, U, {
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
  })(E)), E.exports;
}
var ct = ft();
const at = /* @__PURE__ */ I(ct), lt = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), R = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), bt = (t) => {
  const e = R(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, ht = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), wt = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), jt = (t) => t || "", St = (t) => t == null || String(t).trim() === "", Mt = (t, e, n) => t.slice(0, e) + n + t.slice(e), Tt = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), dt = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const n in t) {
    const r = t[n];
    !Object.prototype.hasOwnProperty.call(t, n) || typeof r != "object" || Object.isFrozen(r) || dt(r);
  }
  return t;
}, vt = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", B = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const n = {};
  for (const r in t) {
    const l = t[r];
    Object.prototype.hasOwnProperty.call(t, r) && (n[e(r)] = l !== null ? B(l, e) : null);
  }
  return n;
}, Ct = (t) => B(t, R), mt = (t) => B(t, ht), zt = (t) => {
  const e = at(t);
  for (const n of Object.keys(e))
    (!e[n] || e[n] === 0) && (e[n] = void 0);
  return e;
}, gt = (t, e, n = !1, r = !1) => {
  if (!vt(t))
    return t;
  let l;
  e && e.length > 0 ? l = (s) => e.includes(s) : l = (s) => !0;
  const m = {};
  for (const s of Object.keys(t).filter(l)) {
    const $ = n ? lt(s) : r ? R(s) : s;
    m[$] = gt(
      t[s],
      void 0,
      n,
      r
    );
  }
  return m;
}, Ht = (t, e, n) => {
  const r = !e || e.length === 0 ? Object.keys(t) : e, l = {};
  for (const m of Object.keys(t).filter((s) => r?.includes(s))) {
    const s = n ? n(m) : m;
    l[s] = t[m];
  }
  return l;
}, Lt = (t, e) => {
  const n = {};
  for (const r of Object.keys(t).filter((l) => e(t[l])))
    n[r] = t[r];
  return n;
}, N = (t, e, n) => {
  if (t.indexOf(".") === 0)
    n[e[t]] = e;
  else {
    let r = e;
    for (const l of t.split(".")) {
      if (r == null)
        break;
      r = r[l];
    }
    if (r == null)
      throw new Error("keyName is not found in object");
    n[r] = e;
  }
}, Ut = (t, e = "id") => {
  const n = {};
  if (t)
    if (Array.isArray(t)) {
      for (const r of t)
        N(e, r, n);
      return n;
    } else {
      for (const r of Object.keys(t)) {
        const l = t[r];
        N(e, l, n);
      }
      return n;
    }
  else return n;
}, Pt = (t) => mt(t), z = /* @__PURE__ */ new Map();
function kt(t, e, n = 0) {
  const r = z.get(t), l = Date.now();
  if (r && (r.status === "pending" || r.ttl > 0 && l - r.ts <= r.ttl))
    return r.p;
  const m = e().catch((s) => {
    throw z.delete(t), s;
  }).then((s) => (n > 0 ? z.set(t, {
    p: m,
    ts: Date.now(),
    ttl: n,
    status: "settled"
  }) : z.delete(t), s));
  return z.set(t, { p: m, ts: l, ttl: n, status: "pending" }), m;
}
const Ft = (t) => {
  const e = new URLSearchParams();
  for (const [n, r] of Object.entries(t))
    if (r != null) {
      if (Array.isArray(r)) {
        for (const l of r)
          l != null && e.append(n, String(l));
        continue;
      }
      e.set(n, String(r));
    }
  return e.toString();
}, At = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  Yt as $getDayjs,
  Pt as __test__replaceHeadLower,
  jt as cNull,
  lt as camelToSnake,
  Tt as cardConv,
  A as dayjsJp,
  dt as deepFreeze,
  $t as formatDateForInput,
  ht as headLower,
  wt as headUpper,
  St as isBlank,
  At as isFunction,
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
  Mt as strIns,
  Ft as toQueryString,
  kt as withInflight
};
