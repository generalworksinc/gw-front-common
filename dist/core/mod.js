import L from "dayjs";
const te = (t, e) => {
  let n = 0;
  const r = [];
  for (; n <= e - t; )
    r.push(t + n), n += 1;
  return r;
}, ee = (t) => {
  const e = [];
  if (t) {
    for (const n of Object.keys(t))
      e.push(t[n]);
    return e;
  } else
    return e;
}, re = (t) => new Promise((e) => setTimeout(e, t));
function k(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var F = { exports: {} }, ct = F.exports, G;
function ft() {
  return G || (G = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(ct, (function() {
      var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, f = /([+-]|\d\d)/g;
      return function(p, u, v) {
        var y = u.prototype;
        v.utc = function(o) {
          var m = { date: o, utc: !0, args: arguments };
          return new u(m);
        }, y.utc = function(o) {
          var m = v(this.toDate(), { locale: this.$L, utc: !0 });
          return o ? m.add(this.utcOffset(), n) : m;
        }, y.local = function() {
          return v(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var _ = y.parse;
        y.parse = function(o) {
          o.utc && (this.$u = !0), this.$utils().u(o.$offset) || (this.$offset = o.$offset), _.call(this, o);
        };
        var O = y.init;
        y.init = function() {
          if (this.$u) {
            var o = this.$d;
            this.$y = o.getUTCFullYear(), this.$M = o.getUTCMonth(), this.$D = o.getUTCDate(), this.$W = o.getUTCDay(), this.$H = o.getUTCHours(), this.$m = o.getUTCMinutes(), this.$s = o.getUTCSeconds(), this.$ms = o.getUTCMilliseconds();
          } else O.call(this);
        };
        var w = y.utcOffset;
        y.utcOffset = function(o, m) {
          var g = this.$utils().u;
          if (g(o)) return this.$u ? 0 : g(this.$offset) ? w.call(this) : this.$offset;
          if (typeof o == "string" && (o = (function(a) {
            a === void 0 && (a = "");
            var d = a.match(r);
            if (!d) return null;
            var s = ("" + d[0]).match(f) || ["-", 0, 0], i = s[0], M = 60 * +s[1] + +s[2];
            return M === 0 ? 0 : i === "+" ? M : -M;
          })(o), o === null)) return this;
          var x = Math.abs(o) <= 16 ? 60 * o : o;
          if (x === 0) return this.utc(m);
          var Y = this.clone();
          if (m) return Y.$offset = x, Y.$u = !1, Y;
          var D = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (Y = this.local().add(x + D, n)).$offset = x, Y.$x.$localOffset = D, Y;
        };
        var c = y.format;
        y.format = function(o) {
          var m = o || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return c.call(this, m);
        }, y.valueOf = function() {
          var o = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * o;
        }, y.isUTC = function() {
          return !!this.$u;
        }, y.toISOString = function() {
          return this.toDate().toISOString();
        }, y.toString = function() {
          return this.toDate().toUTCString();
        };
        var h = y.toDate;
        y.toDate = function(o) {
          return o === "s" && this.$offset ? v(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : h.call(this);
        };
        var l = y.diff;
        y.diff = function(o, m, g) {
          if (o && this.$u === o.$u) return l.call(this, o, m, g);
          var x = this.local(), Y = v(o).local();
          return l.call(x, Y, m, g);
        };
      };
    }));
  })(F)), F.exports;
}
var lt = ft();
const dt = /* @__PURE__ */ k(lt);
var B = { exports: {} }, ht = B.exports, V;
function mt() {
  return V || (V = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(ht, (function() {
      var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(f, p, u) {
        var v, y = function(c, h, l) {
          l === void 0 && (l = {});
          var o = new Date(c), m = (function(g, x) {
            x === void 0 && (x = {});
            var Y = x.timeZoneName || "short", D = g + "|" + Y, a = r[D];
            return a || (a = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: g, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: Y }), r[D] = a), a;
          })(h, l);
          return m.formatToParts(o);
        }, _ = function(c, h) {
          for (var l = y(c, h), o = [], m = 0; m < l.length; m += 1) {
            var g = l[m], x = g.type, Y = g.value, D = n[x];
            D >= 0 && (o[D] = parseInt(Y, 10));
          }
          var a = o[3], d = a === 24 ? 0 : a, s = o[0] + "-" + o[1] + "-" + o[2] + " " + d + ":" + o[4] + ":" + o[5] + ":000", i = +c;
          return (u.utc(s).valueOf() - (i -= i % 1e3)) / 6e4;
        }, O = p.prototype;
        O.tz = function(c, h) {
          c === void 0 && (c = v);
          var l, o = this.utcOffset(), m = this.toDate(), g = m.toLocaleString("en-US", { timeZone: c }), x = Math.round((m - new Date(g)) / 1e3 / 60), Y = 15 * -Math.round(m.getTimezoneOffset() / 15) - x;
          if (!Number(Y)) l = this.utcOffset(0, h);
          else if (l = u(g, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(Y, !0), h) {
            var D = l.utcOffset();
            l = l.add(o - D, "minute");
          }
          return l.$x.$timezone = c, l;
        }, O.offsetName = function(c) {
          var h = this.$x.$timezone || u.tz.guess(), l = y(this.valueOf(), h, { timeZoneName: c }).find((function(o) {
            return o.type.toLowerCase() === "timezonename";
          }));
          return l && l.value;
        };
        var w = O.startOf;
        O.startOf = function(c, h) {
          if (!this.$x || !this.$x.$timezone) return w.call(this, c, h);
          var l = u(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return w.call(l, c, h).tz(this.$x.$timezone, !0);
        }, u.tz = function(c, h, l) {
          var o = l && h, m = l || h || v, g = _(+u(), m);
          if (typeof c != "string") return u(c).tz(m);
          var x = (function(d, s, i) {
            var M = d - 60 * s * 1e3, $ = _(M, i);
            if (s === $) return [M, s];
            var b = _(M -= 60 * ($ - s) * 1e3, i);
            return $ === b ? [M, $] : [d - 60 * Math.min($, b) * 1e3, Math.max($, b)];
          })(u.utc(c, o).valueOf(), g, m), Y = x[0], D = x[1], a = u(Y).utcOffset(D);
          return a.$x.$timezone = m, a;
        }, u.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, u.tz.setDefault = function(c) {
          v = c;
        };
      };
    }));
  })(B)), B.exports;
}
var pt = mt();
const vt = /* @__PURE__ */ k(pt);
var U = { exports: {} }, yt = U.exports, Q;
function gt() {
  return Q || (Q = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(yt, (function() {
      return function(n, r, f) {
        r.prototype.isBetween = function(p, u, v, y) {
          var _ = f(p), O = f(u), w = (y = y || "()")[0] === "(", c = y[1] === ")";
          return (w ? this.isAfter(_, v) : !this.isBefore(_, v)) && (c ? this.isBefore(O, v) : !this.isAfter(O, v)) || (w ? this.isBefore(_, v) : !this.isAfter(_, v)) && (c ? this.isAfter(O, v) : !this.isBefore(O, v));
        };
      };
    }));
  })(U)), U.exports;
}
var $t = gt();
const _t = /* @__PURE__ */ k($t);
var I = { exports: {} }, Mt = I.exports, tt;
function Yt() {
  return tt || (tt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Mt, (function() {
      var n = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(r, f, p) {
        var u = f.prototype, v = u.format;
        p.en.formats = n, u.format = function(y) {
          y === void 0 && (y = "YYYY-MM-DDTHH:mm:ssZ");
          var _ = this.$locale().formats, O = (function(w, c) {
            return w.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(h, l, o) {
              var m = o && o.toUpperCase();
              return l || c[o] || n[o] || c[m].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(g, x, Y) {
                return x || Y.slice(1);
              }));
            }));
          })(y, _ === void 0 ? {} : _);
          return v.call(this, O);
        };
      };
    }));
  })(I)), I.exports;
}
var xt = Yt();
const Ot = /* @__PURE__ */ k(xt);
var R = { exports: {} }, Dt = R.exports, et;
function bt() {
  return et || (et = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Dt, (function() {
      var n, r, f = 1e3, p = 6e4, u = 36e5, v = 864e5, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, _ = 31536e6, O = 2628e6, w = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, c = { years: _, months: O, days: v, hours: u, minutes: p, seconds: f, milliseconds: 1, weeks: 6048e5 }, h = function(d) {
        return d instanceof D;
      }, l = function(d, s, i) {
        return new D(d, i, s.$l);
      }, o = function(d) {
        return r.p(d) + "s";
      }, m = function(d) {
        return d < 0;
      }, g = function(d) {
        return m(d) ? Math.ceil(d) : Math.floor(d);
      }, x = function(d) {
        return Math.abs(d);
      }, Y = function(d, s) {
        return d ? m(d) ? { negative: !0, format: "" + x(d) + s } : { negative: !1, format: "" + d + s } : { negative: !1, format: "" };
      }, D = (function() {
        function d(i, M, $) {
          var b = this;
          if (this.$d = {}, this.$l = $, i === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), M) return l(i * c[o(M)], this);
          if (typeof i == "number") return this.$ms = i, this.parseFromMilliseconds(), this;
          if (typeof i == "object") return Object.keys(i).forEach((function(T) {
            b.$d[o(T)] = i[T];
          })), this.calMilliseconds(), this;
          if (typeof i == "string") {
            var j = i.match(w);
            if (j) {
              var S = j.slice(2).map((function(T) {
                return T != null ? Number(T) : 0;
              }));
              return this.$d.years = S[0], this.$d.months = S[1], this.$d.weeks = S[2], this.$d.days = S[3], this.$d.hours = S[4], this.$d.minutes = S[5], this.$d.seconds = S[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var s = d.prototype;
        return s.calMilliseconds = function() {
          var i = this;
          this.$ms = Object.keys(this.$d).reduce((function(M, $) {
            return M + (i.$d[$] || 0) * c[$];
          }), 0);
        }, s.parseFromMilliseconds = function() {
          var i = this.$ms;
          this.$d.years = g(i / _), i %= _, this.$d.months = g(i / O), i %= O, this.$d.days = g(i / v), i %= v, this.$d.hours = g(i / u), i %= u, this.$d.minutes = g(i / p), i %= p, this.$d.seconds = g(i / f), i %= f, this.$d.milliseconds = i;
        }, s.toISOString = function() {
          var i = Y(this.$d.years, "Y"), M = Y(this.$d.months, "M"), $ = +this.$d.days || 0;
          this.$d.weeks && ($ += 7 * this.$d.weeks);
          var b = Y($, "D"), j = Y(this.$d.hours, "H"), S = Y(this.$d.minutes, "M"), T = this.$d.seconds || 0;
          this.$d.milliseconds && (T += this.$d.milliseconds / 1e3, T = Math.round(1e3 * T) / 1e3);
          var A = Y(T, "S"), C = i.negative || M.negative || b.negative || j.negative || S.negative || A.negative, H = j.format || S.format || A.format ? "T" : "", z = (C ? "-" : "") + "P" + i.format + M.format + b.format + H + j.format + S.format + A.format;
          return z === "P" || z === "-P" ? "P0D" : z;
        }, s.toJSON = function() {
          return this.toISOString();
        }, s.format = function(i) {
          var M = i || "YYYY-MM-DDTHH:mm:ss", $ = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
          return M.replace(y, (function(b, j) {
            return j || String($[b]);
          }));
        }, s.as = function(i) {
          return this.$ms / c[o(i)];
        }, s.get = function(i) {
          var M = this.$ms, $ = o(i);
          return $ === "milliseconds" ? M %= 1e3 : M = $ === "weeks" ? g(M / c[$]) : this.$d[$], M || 0;
        }, s.add = function(i, M, $) {
          var b;
          return b = M ? i * c[o(M)] : h(i) ? i.$ms : l(i, this).$ms, l(this.$ms + b * ($ ? -1 : 1), this);
        }, s.subtract = function(i, M) {
          return this.add(i, M, !0);
        }, s.locale = function(i) {
          var M = this.clone();
          return M.$l = i, M;
        }, s.clone = function() {
          return l(this.$ms, this);
        }, s.humanize = function(i) {
          return n().add(this.$ms, "ms").locale(this.$l).fromNow(!i);
        }, s.valueOf = function() {
          return this.asMilliseconds();
        }, s.milliseconds = function() {
          return this.get("milliseconds");
        }, s.asMilliseconds = function() {
          return this.as("milliseconds");
        }, s.seconds = function() {
          return this.get("seconds");
        }, s.asSeconds = function() {
          return this.as("seconds");
        }, s.minutes = function() {
          return this.get("minutes");
        }, s.asMinutes = function() {
          return this.as("minutes");
        }, s.hours = function() {
          return this.get("hours");
        }, s.asHours = function() {
          return this.as("hours");
        }, s.days = function() {
          return this.get("days");
        }, s.asDays = function() {
          return this.as("days");
        }, s.weeks = function() {
          return this.get("weeks");
        }, s.asWeeks = function() {
          return this.as("weeks");
        }, s.months = function() {
          return this.get("months");
        }, s.asMonths = function() {
          return this.as("months");
        }, s.years = function() {
          return this.get("years");
        }, s.asYears = function() {
          return this.as("years");
        }, d;
      })(), a = function(d, s, i) {
        return d.add(s.years() * i, "y").add(s.months() * i, "M").add(s.days() * i, "d").add(s.hours() * i, "h").add(s.minutes() * i, "m").add(s.seconds() * i, "s").add(s.milliseconds() * i, "ms");
      };
      return function(d, s, i) {
        n = i, r = i().$utils(), i.duration = function(b, j) {
          var S = i.locale();
          return l(b, { $l: S }, j);
        }, i.isDuration = h;
        var M = s.prototype.add, $ = s.prototype.subtract;
        s.prototype.add = function(b, j) {
          return h(b) ? a(this, b, 1) : M.bind(this)(b, j);
        }, s.prototype.subtract = function(b, j) {
          return h(b) ? a(this, b, -1) : $.bind(this)(b, j);
        };
      };
    }));
  })(R)), R.exports;
}
var wt = bt();
const St = /* @__PURE__ */ k(wt);
var q = { exports: {} }, jt = q.exports, rt;
function Tt() {
  return rt || (rt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(jt, (function() {
      return function(n, r, f) {
        n = n || {};
        var p = r.prototype, u = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function v(_, O, w, c) {
          return p.fromToBase(_, O, w, c);
        }
        f.en.relativeTime = u, p.fromToBase = function(_, O, w, c, h) {
          for (var l, o, m, g = w.$locale().relativeTime || u, x = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], Y = x.length, D = 0; D < Y; D += 1) {
            var a = x[D];
            a.d && (l = c ? f(_).diff(w, a.d, !0) : w.diff(_, a.d, !0));
            var d = (n.rounding || Math.round)(Math.abs(l));
            if (m = l > 0, d <= a.r || !a.r) {
              d <= 1 && D > 0 && (a = x[D - 1]);
              var s = g[a.l];
              h && (d = h("" + d)), o = typeof s == "string" ? s.replace("%d", d) : s(d, O, a.l, m);
              break;
            }
          }
          if (O) return o;
          var i = m ? g.future : g.past;
          return typeof i == "function" ? i(o) : i.replace("%s", o);
        }, p.to = function(_, O) {
          return v(_, O, this, !0);
        }, p.from = function(_, O) {
          return v(_, O, this);
        };
        var y = function(_) {
          return _.$u ? f.utc() : f();
        };
        p.toNow = function(_) {
          return this.to(y(this), _);
        }, p.fromNow = function(_) {
          return this.from(y(this), _);
        };
      };
    }));
  })(q)), q.exports;
}
var Lt = Tt();
const zt = /* @__PURE__ */ k(Lt);
var N = { exports: {} }, Ht = N.exports, nt;
function kt() {
  return nt || (nt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r(L);
    })(Ht, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var f = r(n), p = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(u) {
        return u + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(u) {
        return u < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return f.default.locale(p, null, !0), p;
    }));
  })(N)), N.exports;
}
kt();
const At = (t) => {
  let e;
  try {
    e = Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      year: "2-digit",
      era: "long"
    }).format(t).slice(0, 4).replace(/年$/, "");
  } catch {
    e = "該当なし";
  }
  return e;
}, Ct = (t) => {
  let e;
  try {
    e = Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      era: "long"
    }).format(t).slice(0, 2);
  } catch {
    e = "不明";
  }
  return e;
}, Pt = (t, e) => {
  const n = e.prototype, r = n.format;
  n.format = function(p) {
    if (!p)
      return r.call(this, p);
    const u = p.replace(/\[([^\]]+)]|r+/g, (v) => {
      switch (v) {
        case "rrrr":
          return At(this.toDate());
        case "rr":
          return Ct(this.toDate());
        default:
          return v;
      }
    });
    return r.call(this, u);
  };
};
L.extend(dt);
L.extend(vt);
L.extend(_t);
L.extend(Ot);
L.extend(St);
L.extend(zt);
L.locale("ja");
L.extend(Pt);
const J = L, ne = (t) => t ? J(t).format("YYYY-MM-DDTHH:mm") : "", se = (t) => {
  if (!t) return null;
  const e = J(t);
  return e.isValid() ? e.toDate() : null;
}, ie = () => J, st = 300, Et = 30, Ft = 20, Bt = 3, Ut = 2e3, It = (t) => t.length > st ? `${t.slice(0, st)}...` : t, Z = (t, e = 0) => {
  if (e > Bt) return "[truncated]";
  if (typeof t == "string") return It(t);
  if (typeof t == "number" || typeof t == "boolean" || t == null)
    return t;
  if (t instanceof Date) return t.toISOString();
  if (Array.isArray(t))
    return t.slice(0, Ft).map((n) => Z(n, e + 1));
  if (typeof t == "object") {
    const n = Object.entries(t).slice(
      0,
      Et
    );
    return Object.fromEntries(
      n.map(([r, f]) => [r, Z(f, e + 1)])
    );
  }
  return String(t);
}, it = (t) => {
  if (!t) return;
  const e = Z(t, 0), n = JSON.stringify(e);
  return n.length <= Ut ? e : { _truncated: !0, _size: n.length };
}, Rt = (t) => {
  if (!t) return;
  const e = Object.entries(t).map(([n, r]) => [
    n,
    Z(r, 0) ?? {}
  ]);
  return Object.fromEntries(e);
}, oe = async (t) => {
  if (!(typeof window > "u"))
    try {
      const {
        message: e,
        reason: n,
        level: r = "info",
        category: f = "app",
        data: p,
        extra: u,
        tags: v,
        user: y,
        contexts: _,
        scope: O
      } = t, { addBreadcrumb: w, captureMessage: c, withScope: h } = await import("@sentry/browser"), l = it({
        ...n ? { reason: n } : {},
        ...p ?? {}
      }), o = it({
        ...n ? { reason: n } : {},
        ...u ?? {}
      }), m = Rt(_);
      w({
        category: f,
        level: r,
        message: e,
        data: l && Object.keys(l).length ? l : void 0
      }), h((g) => {
        if (y && g.setUser(y), v)
          for (const [x, Y] of Object.entries(v))
            g.setTag(x, Y);
        if (m)
          for (const [x, Y] of Object.entries(m))
            g.setContext(x, Y);
        O && O(g), c(e, {
          level: r,
          extra: o && Object.keys(o).length ? o : void 0
        });
      });
    } catch {
    }
}, ue = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var K = { exports: {} }, ot;
function qt() {
  return ot || (ot = 1, (function(t) {
    var e = (function() {
      function n(c, h) {
        return h != null && c instanceof h;
      }
      var r;
      try {
        r = Map;
      } catch {
        r = function() {
        };
      }
      var f;
      try {
        f = Set;
      } catch {
        f = function() {
        };
      }
      var p;
      try {
        p = Promise;
      } catch {
        p = function() {
        };
      }
      function u(c, h, l, o, m) {
        typeof h == "object" && (l = h.depth, o = h.prototype, m = h.includeNonEnumerable, h = h.circular);
        var g = [], x = [], Y = typeof Buffer < "u";
        typeof h > "u" && (h = !0), typeof l > "u" && (l = 1 / 0);
        function D(a, d) {
          if (a === null)
            return null;
          if (d === 0)
            return a;
          var s, i;
          if (typeof a != "object")
            return a;
          if (n(a, r))
            s = new r();
          else if (n(a, f))
            s = new f();
          else if (n(a, p))
            s = new p(function(H, z) {
              a.then(function(P) {
                H(D(P, d - 1));
              }, function(P) {
                z(D(P, d - 1));
              });
            });
          else if (u.__isArray(a))
            s = [];
          else if (u.__isRegExp(a))
            s = new RegExp(a.source, w(a)), a.lastIndex && (s.lastIndex = a.lastIndex);
          else if (u.__isDate(a))
            s = new Date(a.getTime());
          else {
            if (Y && Buffer.isBuffer(a))
              return Buffer.allocUnsafe ? s = Buffer.allocUnsafe(a.length) : s = new Buffer(a.length), a.copy(s), s;
            n(a, Error) ? s = Object.create(a) : typeof o > "u" ? (i = Object.getPrototypeOf(a), s = Object.create(i)) : (s = Object.create(o), i = o);
          }
          if (h) {
            var M = g.indexOf(a);
            if (M != -1)
              return x[M];
            g.push(a), x.push(s);
          }
          n(a, r) && a.forEach(function(H, z) {
            var P = D(z, d - 1), at = D(H, d - 1);
            s.set(P, at);
          }), n(a, f) && a.forEach(function(H) {
            var z = D(H, d - 1);
            s.add(z);
          });
          for (var $ in a) {
            var b;
            i && (b = Object.getOwnPropertyDescriptor(i, $)), !(b && b.set == null) && (s[$] = D(a[$], d - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var j = Object.getOwnPropertySymbols(a), $ = 0; $ < j.length; $++) {
              var S = j[$], T = Object.getOwnPropertyDescriptor(a, S);
              T && !T.enumerable && !m || (s[S] = D(a[S], d - 1), T.enumerable || Object.defineProperty(s, S, {
                enumerable: !1
              }));
            }
          if (m)
            for (var A = Object.getOwnPropertyNames(a), $ = 0; $ < A.length; $++) {
              var C = A[$], T = Object.getOwnPropertyDescriptor(a, C);
              T && T.enumerable || (s[C] = D(a[C], d - 1), Object.defineProperty(s, C, {
                enumerable: !1
              }));
            }
          return s;
        }
        return D(c, l);
      }
      u.clonePrototype = function(h) {
        if (h === null)
          return null;
        var l = function() {
        };
        return l.prototype = h, new l();
      };
      function v(c) {
        return Object.prototype.toString.call(c);
      }
      u.__objToStr = v;
      function y(c) {
        return typeof c == "object" && v(c) === "[object Date]";
      }
      u.__isDate = y;
      function _(c) {
        return typeof c == "object" && v(c) === "[object Array]";
      }
      u.__isArray = _;
      function O(c) {
        return typeof c == "object" && v(c) === "[object RegExp]";
      }
      u.__isRegExp = O;
      function w(c) {
        var h = "";
        return c.global && (h += "g"), c.ignoreCase && (h += "i"), c.multiline && (h += "m"), h;
      }
      return u.__getRegExpFlags = w, u;
    })();
    t.exports && (t.exports = e);
  })(K)), K.exports;
}
var Nt = qt();
const Jt = /* @__PURE__ */ k(Nt), Zt = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), W = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), ae = (t) => {
  const e = W(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, Kt = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), ce = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), fe = (t) => t || "", le = (t) => t == null || String(t).trim() === "", de = (t, e, n) => t.slice(0, e) + n + t.slice(e), he = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), Wt = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const n in t) {
    const r = t[n];
    !Object.prototype.hasOwnProperty.call(t, n) || typeof r != "object" || Object.isFrozen(r) || Wt(r);
  }
  return t;
}, Xt = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", X = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const n = {};
  for (const r in t) {
    const f = t[r];
    Object.prototype.hasOwnProperty.call(t, r) && (n[e(r)] = f !== null ? X(f, e) : null);
  }
  return n;
}, me = (t) => X(t, W), Gt = (t) => X(t, Kt), pe = (t) => {
  const e = Jt(t);
  for (const n of Object.keys(e))
    (!e[n] || e[n] === 0) && (e[n] = void 0);
  return e;
}, Vt = (t, e, n = !1, r = !1) => {
  if (!Xt(t))
    return t;
  let f;
  e && e.length > 0 ? f = (u) => e.includes(u) : f = (u) => !0;
  const p = {};
  for (const u of Object.keys(t).filter(f)) {
    const v = n ? Zt(u) : r ? W(u) : u;
    p[v] = Vt(
      t[u],
      void 0,
      n,
      r
    );
  }
  return p;
}, ve = (t, e, n) => {
  const r = !e || e.length === 0 ? Object.keys(t) : e, f = {};
  for (const p of Object.keys(t).filter((u) => r?.includes(u))) {
    const u = n ? n(p) : p;
    f[u] = t[p];
  }
  return f;
}, ye = (t, e) => {
  const n = {};
  for (const r of Object.keys(t).filter((f) => e(t[f])))
    n[r] = t[r];
  return n;
}, ut = (t, e, n) => {
  if (t.indexOf(".") === 0)
    n[e[t]] = e;
  else {
    let r = e;
    for (const f of t.split(".")) {
      if (r == null)
        break;
      r = r[f];
    }
    if (r == null)
      throw new Error("keyName is not found in object");
    n[r] = e;
  }
}, ge = (t, e = "id") => {
  const n = {};
  if (t)
    if (Array.isArray(t)) {
      for (const r of t)
        ut(e, r, n);
      return n;
    } else {
      for (const r of Object.keys(t)) {
        const f = t[r];
        ut(e, f, n);
      }
      return n;
    }
  else return n;
}, $e = (t) => Gt(t), E = /* @__PURE__ */ new Map();
function _e(t, e, n = 0) {
  const r = E.get(t), f = Date.now();
  if (r && (r.status === "pending" || r.ttl > 0 && f - r.ts <= r.ttl))
    return r.p;
  const p = e().catch((u) => {
    throw E.delete(t), u;
  }).then((u) => (n > 0 ? E.set(t, {
    p,
    ts: Date.now(),
    ttl: n,
    status: "settled"
  }) : E.delete(t), u));
  return E.set(t, { p, ts: f, ttl: n, status: "pending" }), p;
}
const Me = (t) => {
  const e = new URLSearchParams();
  for (const [n, r] of Object.entries(t))
    if (r != null) {
      if (Array.isArray(r)) {
        for (const f of r)
          f != null && e.append(n, String(f));
        continue;
      }
      e.set(n, String(r));
    }
  return e.toString();
}, Ye = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  ie as $getDayjs,
  $e as __test__replaceHeadLower,
  fe as cNull,
  Zt as camelToSnake,
  he as cardConv,
  J as dayjsJp,
  Wt as deepFreeze,
  ne as formatDateForInput,
  Kt as headLower,
  ce as headUpper,
  le as isBlank,
  Ye as isFunction,
  Xt as isPlainObject,
  oe as logSentryMessageWithBreadcrumb,
  ue as numberWithCommas,
  ee as obj2Array,
  pe as objectConvUndefined,
  Vt as objectFilter,
  ye as objectFilterFunc,
  ve as objectFilterKey,
  ge as objectifyByKeyParam,
  se as parseInputDate,
  te as range,
  X as replaceKeys,
  me as replaceSnakeToCamel,
  re as sleep,
  W as snakeToCamel,
  ae as snakeToCamelHeadUpper,
  de as strIns,
  Me as toQueryString,
  _e as withInflight
};
