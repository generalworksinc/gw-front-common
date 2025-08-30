import z from "dayjs";
const yt = (t, e) => {
  let r = 0;
  const i = [];
  for (; r <= e - t; )
    i.push(t + r), r += 1;
  return i;
}, gt = (t) => {
  const e = [];
  if (t) {
    for (const r of Object.keys(t))
      e.push(t[r]);
    return e;
  } else
    return e;
}, pt = (t) => new Promise((e) => setTimeout(e, t));
function A(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var k = { exports: {} }, G = k.exports, Z;
function Q() {
  return Z || (Z = 1, (function(t, e) {
    (function(r, i) {
      t.exports = i();
    })(G, (function() {
      var r = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, i = {};
      return function(h, p, s) {
        var $, d = function(u, f, a) {
          a === void 0 && (a = {});
          var n = new Date(u), l = (function(_, y) {
            y === void 0 && (y = {});
            var m = y.timeZoneName || "short", v = _ + "|" + m, o = i[v];
            return o || (o = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: _, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: m }), i[v] = o), o;
          })(f, a);
          return l.formatToParts(n);
        }, b = function(u, f) {
          for (var a = d(u, f), n = [], l = 0; l < a.length; l += 1) {
            var _ = a[l], y = _.type, m = _.value, v = r[y];
            v >= 0 && (n[v] = parseInt(m, 10));
          }
          var o = n[3], O = o === 24 ? 0 : o, c = n[0] + "-" + n[1] + "-" + n[2] + " " + O + ":" + n[4] + ":" + n[5] + ":000", Y = +u;
          return (s.utc(c).valueOf() - (Y -= Y % 1e3)) / 6e4;
        }, x = p.prototype;
        x.tz = function(u, f) {
          u === void 0 && (u = $);
          var a, n = this.utcOffset(), l = this.toDate(), _ = l.toLocaleString("en-US", { timeZone: u }), y = Math.round((l - new Date(_)) / 1e3 / 60), m = 15 * -Math.round(l.getTimezoneOffset() / 15) - y;
          if (!Number(m)) a = this.utcOffset(0, f);
          else if (a = s(_, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(m, !0), f) {
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
        var j = x.startOf;
        x.startOf = function(u, f) {
          if (!this.$x || !this.$x.$timezone) return j.call(this, u, f);
          var a = s(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return j.call(a, u, f).tz(this.$x.$timezone, !0);
        }, s.tz = function(u, f, a) {
          var n = a && f, l = a || f || $, _ = b(+s(), l);
          if (typeof u != "string") return s(u).tz(l);
          var y = (function(O, c, Y) {
            var D = O - 60 * c * 1e3, g = b(D, Y);
            if (c === g) return [D, c];
            var w = b(D -= 60 * (g - c) * 1e3, Y);
            return g === w ? [D, g] : [O - 60 * Math.min(g, w) * 1e3, Math.max(g, w)];
          })(s.utc(u, n).valueOf(), _, l), m = y[0], v = y[1], o = s(m).utcOffset(v);
          return o.$x.$timezone = l, o;
        }, s.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, s.tz.setDefault = function(u) {
          $ = u;
        };
      };
    }));
  })(k)), k.exports;
}
var X = Q();
const tt = /* @__PURE__ */ A(X);
var U = { exports: {} }, et = U.exports, K;
function nt() {
  return K || (K = 1, (function(t, e) {
    (function(r, i) {
      t.exports = i();
    })(et, (function() {
      var r = "minute", i = /[+-]\d\d(?::?\d\d)?/g, h = /([+-]|\d\d)/g;
      return function(p, s, $) {
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
        var j = d.utcOffset;
        d.utcOffset = function(n, l) {
          var _ = this.$utils().u;
          if (_(n)) return this.$u ? 0 : _(this.$offset) ? j.call(this) : this.$offset;
          if (typeof n == "string" && (n = (function(o) {
            o === void 0 && (o = "");
            var O = o.match(i);
            if (!O) return null;
            var c = ("" + O[0]).match(h) || ["-", 0, 0], Y = c[0], D = 60 * +c[1] + +c[2];
            return D === 0 ? 0 : Y === "+" ? D : -D;
          })(n), n === null)) return this;
          var y = Math.abs(n) <= 16 ? 60 * n : n, m = this;
          if (l) return m.$offset = y, m.$u = n === 0, m;
          if (n !== 0) {
            var v = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (m = this.local().add(y + v, r)).$offset = y, m.$x.$localOffset = v;
          } else m = this.utc();
          return m;
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
        d.diff = function(n, l, _) {
          if (n && this.$u === n.$u) return a.call(this, n, l, _);
          var y = this.local(), m = $(n).local();
          return a.call(y, m, l, _);
        };
      };
    }));
  })(U)), U.exports;
}
var rt = nt();
const ot = /* @__PURE__ */ A(rt);
var P = { exports: {} }, it = P.exports, J;
function st() {
  return J || (J = 1, (function(t, e) {
    (function(r, i) {
      t.exports = i(z);
    })(it, (function(r) {
      function i(s) {
        return s && typeof s == "object" && "default" in s ? s : { default: s };
      }
      var h = i(r), p = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s) {
        return s + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(s) {
        return s < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return h.default.locale(p, null, !0), p;
    }));
  })(P)), P.exports;
}
st();
z.extend(ot);
z.extend(tt);
z.locale("ja");
const F = z, Ot = (t) => t ? F(t).format("YYYY-MM-DDTHH:mm") : "", $t = (t) => {
  if (!t) return null;
  const e = F(t);
  return e.isValid() ? e.toDate() : null;
}, Yt = () => F, Dt = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var E = { exports: {} }, V;
function ut() {
  return V || (V = 1, (function(t) {
    var e = (function() {
      function r(u, f) {
        return f != null && u instanceof f;
      }
      var i;
      try {
        i = Map;
      } catch {
        i = function() {
        };
      }
      var h;
      try {
        h = Set;
      } catch {
        h = function() {
        };
      }
      var p;
      try {
        p = Promise;
      } catch {
        p = function() {
        };
      }
      function s(u, f, a, n, l) {
        typeof f == "object" && (a = f.depth, n = f.prototype, l = f.includeNonEnumerable, f = f.circular);
        var _ = [], y = [], m = typeof Buffer < "u";
        typeof f > "u" && (f = !0), typeof a > "u" && (a = 1 / 0);
        function v(o, O) {
          if (o === null)
            return null;
          if (O === 0)
            return o;
          var c, Y;
          if (typeof o != "object")
            return o;
          if (r(o, i))
            c = new i();
          else if (r(o, h))
            c = new h();
          else if (r(o, p))
            c = new p(function(S, T) {
              o.then(function(C) {
                S(v(C, O - 1));
              }, function(C) {
                T(v(C, O - 1));
              });
            });
          else if (s.__isArray(o))
            c = [];
          else if (s.__isRegExp(o))
            c = new RegExp(o.source, j(o)), o.lastIndex && (c.lastIndex = o.lastIndex);
          else if (s.__isDate(o))
            c = new Date(o.getTime());
          else {
            if (m && Buffer.isBuffer(o))
              return Buffer.allocUnsafe ? c = Buffer.allocUnsafe(o.length) : c = new Buffer(o.length), o.copy(c), c;
            r(o, Error) ? c = Object.create(o) : typeof n > "u" ? (Y = Object.getPrototypeOf(o), c = Object.create(Y)) : (c = Object.create(n), Y = n);
          }
          if (f) {
            var D = _.indexOf(o);
            if (D != -1)
              return y[D];
            _.push(o), y.push(c);
          }
          r(o, i) && o.forEach(function(S, T) {
            var C = v(T, O - 1), N = v(S, O - 1);
            c.set(C, N);
          }), r(o, h) && o.forEach(function(S) {
            var T = v(S, O - 1);
            c.add(T);
          });
          for (var g in o) {
            var w;
            Y && (w = Object.getOwnPropertyDescriptor(Y, g)), !(w && w.set == null) && (c[g] = v(o[g], O - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var B = Object.getOwnPropertySymbols(o), g = 0; g < B.length; g++) {
              var H = B[g], M = Object.getOwnPropertyDescriptor(o, H);
              M && !M.enumerable && !l || (c[H] = v(o[H], O - 1), M.enumerable || Object.defineProperty(c, H, {
                enumerable: !1
              }));
            }
          if (l)
            for (var q = Object.getOwnPropertyNames(o), g = 0; g < q.length; g++) {
              var L = q[g], M = Object.getOwnPropertyDescriptor(o, L);
              M && M.enumerable || (c[L] = v(o[L], O - 1), Object.defineProperty(c, L, {
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
      function j(u) {
        var f = "";
        return u.global && (f += "g"), u.ignoreCase && (f += "i"), u.multiline && (f += "m"), f;
      }
      return s.__getRegExpFlags = j, s;
    })();
    t.exports && (t.exports = e);
  })(E)), E.exports;
}
var ft = ut();
const ct = /* @__PURE__ */ A(ft), at = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), I = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), xt = (t) => {
  const e = I(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, lt = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), bt = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), jt = (t) => t || "", wt = (t) => t == null || String(t).trim() === "", Mt = (t, e, r) => t.slice(0, e) + r + t.slice(e), St = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), ht = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const r in t) {
    const i = t[r];
    !Object.prototype.hasOwnProperty.call(t, r) || typeof i != "object" || Object.isFrozen(i) || ht(i);
  }
  return t;
}, dt = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", R = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const r = {};
  for (const i in t) {
    const h = t[i];
    Object.prototype.hasOwnProperty.call(t, i) && (r[e(i)] = h !== null ? R(h, e) : null);
  }
  return r;
}, Tt = (t) => R(t, I), vt = (t) => R(t, lt), Ct = (t) => {
  const e = ct(t);
  for (const r of Object.keys(e))
    (!e[r] || e[r] === 0) && (e[r] = void 0);
  return e;
}, mt = (t, e, r = !1, i = !1) => {
  if (!dt(t))
    return t;
  let h;
  e && e.length > 0 ? h = (s) => e.includes(s) : h = (s) => !0;
  const p = {};
  for (const s of Object.keys(t).filter(h)) {
    const $ = r ? at(s) : i ? I(s) : s;
    p[$] = mt(
      t[s],
      void 0,
      r,
      i
    );
  }
  return p;
}, zt = (t, e, r) => {
  const i = !e || e.length === 0 ? Object.keys(t) : e, h = {};
  for (const p of Object.keys(t).filter((s) => i?.includes(s))) {
    const s = r ? r(p) : p;
    h[s] = t[p];
  }
  return h;
}, Ht = (t, e) => {
  const r = {};
  for (const i of Object.keys(t).filter((h) => e(t[h])))
    r[i] = t[i];
  return r;
}, W = (t, e, r) => {
  if (t.indexOf(".") === 0)
    r[e[t]] = e;
  else {
    let i = e;
    for (const h of t.split(".")) {
      if (i == null)
        break;
      i = i[h];
    }
    if (i == null)
      throw new Error("keyName is not found in object");
    r[i] = e;
  }
}, Lt = (t, e = "id") => {
  const r = {};
  if (t)
    if (Array.isArray(t)) {
      for (const i of t)
        W(e, i, r);
      return r;
    } else {
      for (const i of Object.keys(t)) {
        const h = t[i];
        W(e, h, r);
      }
      return r;
    }
  else return r;
}, kt = (t) => vt(t), Ut = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  Yt as $getDayjs,
  kt as __test__replaceHeadLower,
  jt as cNull,
  at as camelToSnake,
  St as cardConv,
  F as dayjsJp,
  ht as deepFreeze,
  Ot as formatDateForInput,
  lt as headLower,
  bt as headUpper,
  wt as isBlank,
  Ut as isFunction,
  dt as isPlainObject,
  Dt as numberWithCommas,
  gt as obj2Array,
  Ct as objectConvUndefined,
  mt as objectFilter,
  Ht as objectFilterFunc,
  zt as objectFilterKey,
  Lt as objectifyByKeyParam,
  $t as parseInputDate,
  yt as range,
  R as replaceKeys,
  Tt as replaceSnakeToCamel,
  pt as sleep,
  I as snakeToCamel,
  xt as snakeToCamelHeadUpper,
  Mt as strIns
};
