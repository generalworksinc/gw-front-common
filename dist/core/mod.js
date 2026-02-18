import k from "dayjs";
const ie = (t, e) => {
  let n = 0;
  const r = [];
  for (; n <= e - t; )
    r.push(t + n), n += 1;
  return r;
}, oe = (t) => {
  const e = [];
  if (t) {
    for (const n of Object.keys(t))
      e.push(t[n]);
    return e;
  } else
    return e;
}, ue = (t) => new Promise((e) => setTimeout(e, t)), P = /* @__PURE__ */ new Map();
function ft(t, e, n = 0) {
  const r = P.get(t), f = Date.now();
  if (r && (r.status === "pending" || r.ttl > 0 && f - r.ts <= r.ttl))
    return r.p;
  const l = e().catch((u) => {
    throw P.delete(t), u;
  }).then((u) => (n > 0 ? P.set(t, {
    p: l,
    ts: Date.now(),
    ttl: n,
    status: "settled"
  }) : P.delete(t), u));
  return P.set(t, { p: l, ts: f, ttl: n, status: "pending" }), l;
}
const lt = (t) => {
  if (t == null) return null;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : null;
  const e = String(t).trim();
  if (!e) return null;
  if (/^\d+$/.test(e)) {
    const r = Number(e);
    return Number.isFinite(r) ? r : null;
  }
  const n = Date.parse(e);
  return Number.isNaN(n) ? null : n;
}, dt = ({
  accessToken: t,
  accessTokenExpiresAtRaw: e,
  nowMs: n = Date.now(),
  refreshBufferMs: r = 300 * 1e3
}) => {
  const f = lt(e);
  return t ? f != null && f - n <= r : !0;
}, K = async ({
  refreshAccessToken: t,
  inflightKey: e = "refresh",
  inflightTtlMs: n = 1e4
}) => ft(e, () => t(), n), ht = async ({
  getAuthState: t,
  refreshAccessToken: e,
  refreshBufferMs: n = 300 * 1e3,
  inflightKey: r = "refresh",
  inflightTtlMs: f = 1e4
}) => {
  const {
    accessToken: l,
    accessTokenExpiresAtRaw: u,
    refreshToken: y,
    fallbackAccessToken: v
  } = await t(), g = dt({
    accessToken: l,
    accessTokenExpiresAtRaw: u,
    refreshBufferMs: n
  });
  if (g) {
    const $ = await K({
      refreshAccessToken: e,
      inflightKey: r,
      inflightTtlMs: f
    });
    if ($) return $;
  }
  if (!l && !g && y) {
    const $ = await K({
      refreshAccessToken: e,
      inflightKey: r,
      inflightTtlMs: f
    });
    if ($) return $;
  }
  return !l && v != null ? v : l;
}, ae = async (t, e) => {
  const n = await ht(t);
  try {
    return await e(n);
  } catch (r) {
    if ((r?.status ?? r?.statusCode ?? r?.response?.status) !== 401)
      throw r;
    const l = await K(t);
    if (!l)
      throw r;
    return e(l);
  }
};
function H(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var F = { exports: {} }, mt = F.exports, V;
function pt() {
  return V || (V = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(mt, (function() {
      var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, f = /([+-]|\d\d)/g;
      return function(l, u, y) {
        var v = u.prototype;
        y.utc = function(o) {
          var p = { date: o, utc: !0, args: arguments };
          return new u(p);
        }, v.utc = function(o) {
          var p = y(this.toDate(), { locale: this.$L, utc: !0 });
          return o ? p.add(this.utcOffset(), n) : p;
        }, v.local = function() {
          return y(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var g = v.parse;
        v.parse = function(o) {
          o.utc && (this.$u = !0), this.$utils().u(o.$offset) || (this.$offset = o.$offset), g.call(this, o);
        };
        var $ = v.init;
        v.init = function() {
          if (this.$u) {
            var o = this.$d;
            this.$y = o.getUTCFullYear(), this.$M = o.getUTCMonth(), this.$D = o.getUTCDate(), this.$W = o.getUTCDay(), this.$H = o.getUTCHours(), this.$m = o.getUTCMinutes(), this.$s = o.getUTCSeconds(), this.$ms = o.getUTCMilliseconds();
          } else $.call(this);
        };
        var b = v.utcOffset;
        v.utcOffset = function(o, p) {
          var x = this.$utils().u;
          if (x(o)) return this.$u ? 0 : x(this.$offset) ? b.call(this) : this.$offset;
          if (typeof o == "string" && (o = (function(a) {
            a === void 0 && (a = "");
            var d = a.match(r);
            if (!d) return null;
            var s = ("" + d[0]).match(f) || ["-", 0, 0], i = s[0], _ = 60 * +s[1] + +s[2];
            return _ === 0 ? 0 : i === "+" ? _ : -_;
          })(o), o === null)) return this;
          var D = Math.abs(o) <= 16 ? 60 * o : o;
          if (D === 0) return this.utc(p);
          var Y = this.clone();
          if (p) return Y.$offset = D, Y.$u = !1, Y;
          var O = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (Y = this.local().add(D + O, n)).$offset = D, Y.$x.$localOffset = O, Y;
        };
        var c = v.format;
        v.format = function(o) {
          var p = o || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return c.call(this, p);
        }, v.valueOf = function() {
          var o = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * o;
        }, v.isUTC = function() {
          return !!this.$u;
        }, v.toISOString = function() {
          return this.toDate().toISOString();
        }, v.toString = function() {
          return this.toDate().toUTCString();
        };
        var h = v.toDate;
        v.toDate = function(o) {
          return o === "s" && this.$offset ? y(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : h.call(this);
        };
        var m = v.diff;
        v.diff = function(o, p, x) {
          if (o && this.$u === o.$u) return m.call(this, o, p, x);
          var D = this.local(), Y = y(o).local();
          return m.call(D, Y, p, x);
        };
      };
    }));
  })(F)), F.exports;
}
var yt = pt();
const vt = /* @__PURE__ */ H(yt);
var B = { exports: {} }, gt = B.exports, Q;
function $t() {
  return Q || (Q = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(gt, (function() {
      var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(f, l, u) {
        var y, v = function(c, h, m) {
          m === void 0 && (m = {});
          var o = new Date(c), p = (function(x, D) {
            D === void 0 && (D = {});
            var Y = D.timeZoneName || "short", O = x + "|" + Y, a = r[O];
            return a || (a = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: x, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: Y }), r[O] = a), a;
          })(h, m);
          return p.formatToParts(o);
        }, g = function(c, h) {
          for (var m = v(c, h), o = [], p = 0; p < m.length; p += 1) {
            var x = m[p], D = x.type, Y = x.value, O = n[D];
            O >= 0 && (o[O] = parseInt(Y, 10));
          }
          var a = o[3], d = a === 24 ? 0 : a, s = o[0] + "-" + o[1] + "-" + o[2] + " " + d + ":" + o[4] + ":" + o[5] + ":000", i = +c;
          return (u.utc(s).valueOf() - (i -= i % 1e3)) / 6e4;
        }, $ = l.prototype;
        $.tz = function(c, h) {
          c === void 0 && (c = y);
          var m, o = this.utcOffset(), p = this.toDate(), x = p.toLocaleString("en-US", { timeZone: c }), D = Math.round((p - new Date(x)) / 1e3 / 60), Y = 15 * -Math.round(p.getTimezoneOffset() / 15) - D;
          if (!Number(Y)) m = this.utcOffset(0, h);
          else if (m = u(x, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(Y, !0), h) {
            var O = m.utcOffset();
            m = m.add(o - O, "minute");
          }
          return m.$x.$timezone = c, m;
        }, $.offsetName = function(c) {
          var h = this.$x.$timezone || u.tz.guess(), m = v(this.valueOf(), h, { timeZoneName: c }).find((function(o) {
            return o.type.toLowerCase() === "timezonename";
          }));
          return m && m.value;
        };
        var b = $.startOf;
        $.startOf = function(c, h) {
          if (!this.$x || !this.$x.$timezone) return b.call(this, c, h);
          var m = u(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return b.call(m, c, h).tz(this.$x.$timezone, !0);
        }, u.tz = function(c, h, m) {
          var o = m && h, p = m || h || y, x = g(+u(), p);
          if (typeof c != "string") return u(c).tz(p);
          var D = (function(d, s, i) {
            var _ = d - 60 * s * 1e3, M = g(_, i);
            if (s === M) return [_, s];
            var w = g(_ -= 60 * (M - s) * 1e3, i);
            return M === w ? [_, M] : [d - 60 * Math.min(M, w) * 1e3, Math.max(M, w)];
          })(u.utc(c, o).valueOf(), x, p), Y = D[0], O = D[1], a = u(Y).utcOffset(O);
          return a.$x.$timezone = p, a;
        }, u.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, u.tz.setDefault = function(c) {
          y = c;
        };
      };
    }));
  })(B)), B.exports;
}
var Mt = $t();
const _t = /* @__PURE__ */ H(Mt);
var R = { exports: {} }, xt = R.exports, tt;
function Yt() {
  return tt || (tt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(xt, (function() {
      return function(n, r, f) {
        r.prototype.isBetween = function(l, u, y, v) {
          var g = f(l), $ = f(u), b = (v = v || "()")[0] === "(", c = v[1] === ")";
          return (b ? this.isAfter(g, y) : !this.isBefore(g, y)) && (c ? this.isBefore($, y) : !this.isAfter($, y)) || (b ? this.isBefore(g, y) : !this.isAfter(g, y)) && (c ? this.isAfter($, y) : !this.isBefore($, y));
        };
      };
    }));
  })(R)), R.exports;
}
var Ot = Yt();
const Dt = /* @__PURE__ */ H(Ot);
var U = { exports: {} }, wt = U.exports, et;
function bt() {
  return et || (et = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(wt, (function() {
      var n = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(r, f, l) {
        var u = f.prototype, y = u.format;
        l.en.formats = n, u.format = function(v) {
          v === void 0 && (v = "YYYY-MM-DDTHH:mm:ssZ");
          var g = this.$locale().formats, $ = (function(b, c) {
            return b.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(h, m, o) {
              var p = o && o.toUpperCase();
              return m || c[o] || n[o] || c[p].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(x, D, Y) {
                return D || Y.slice(1);
              }));
            }));
          })(v, g === void 0 ? {} : g);
          return y.call(this, $);
        };
      };
    }));
  })(U)), U.exports;
}
var St = bt();
const Tt = /* @__PURE__ */ H(St);
var I = { exports: {} }, jt = I.exports, rt;
function kt() {
  return rt || (rt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(jt, (function() {
      var n, r, f = 1e3, l = 6e4, u = 36e5, y = 864e5, v = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = 31536e6, $ = 2628e6, b = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, c = { years: g, months: $, days: y, hours: u, minutes: l, seconds: f, milliseconds: 1, weeks: 6048e5 }, h = function(d) {
        return d instanceof O;
      }, m = function(d, s, i) {
        return new O(d, i, s.$l);
      }, o = function(d) {
        return r.p(d) + "s";
      }, p = function(d) {
        return d < 0;
      }, x = function(d) {
        return p(d) ? Math.ceil(d) : Math.floor(d);
      }, D = function(d) {
        return Math.abs(d);
      }, Y = function(d, s) {
        return d ? p(d) ? { negative: !0, format: "" + D(d) + s } : { negative: !1, format: "" + d + s } : { negative: !1, format: "" };
      }, O = (function() {
        function d(i, _, M) {
          var w = this;
          if (this.$d = {}, this.$l = M, i === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), _) return m(i * c[o(_)], this);
          if (typeof i == "number") return this.$ms = i, this.parseFromMilliseconds(), this;
          if (typeof i == "object") return Object.keys(i).forEach((function(j) {
            w.$d[o(j)] = i[j];
          })), this.calMilliseconds(), this;
          if (typeof i == "string") {
            var T = i.match(b);
            if (T) {
              var S = T.slice(2).map((function(j) {
                return j != null ? Number(j) : 0;
              }));
              return this.$d.years = S[0], this.$d.months = S[1], this.$d.weeks = S[2], this.$d.days = S[3], this.$d.hours = S[4], this.$d.minutes = S[5], this.$d.seconds = S[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var s = d.prototype;
        return s.calMilliseconds = function() {
          var i = this;
          this.$ms = Object.keys(this.$d).reduce((function(_, M) {
            return _ + (i.$d[M] || 0) * c[M];
          }), 0);
        }, s.parseFromMilliseconds = function() {
          var i = this.$ms;
          this.$d.years = x(i / g), i %= g, this.$d.months = x(i / $), i %= $, this.$d.days = x(i / y), i %= y, this.$d.hours = x(i / u), i %= u, this.$d.minutes = x(i / l), i %= l, this.$d.seconds = x(i / f), i %= f, this.$d.milliseconds = i;
        }, s.toISOString = function() {
          var i = Y(this.$d.years, "Y"), _ = Y(this.$d.months, "M"), M = +this.$d.days || 0;
          this.$d.weeks && (M += 7 * this.$d.weeks);
          var w = Y(M, "D"), T = Y(this.$d.hours, "H"), S = Y(this.$d.minutes, "M"), j = this.$d.seconds || 0;
          this.$d.milliseconds && (j += this.$d.milliseconds / 1e3, j = Math.round(1e3 * j) / 1e3);
          var A = Y(j, "S"), C = i.negative || _.negative || w.negative || T.negative || S.negative || A.negative, z = T.format || S.format || A.format ? "T" : "", L = (C ? "-" : "") + "P" + i.format + _.format + w.format + z + T.format + S.format + A.format;
          return L === "P" || L === "-P" ? "P0D" : L;
        }, s.toJSON = function() {
          return this.toISOString();
        }, s.format = function(i) {
          var _ = i || "YYYY-MM-DDTHH:mm:ss", M = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
          return _.replace(v, (function(w, T) {
            return T || String(M[w]);
          }));
        }, s.as = function(i) {
          return this.$ms / c[o(i)];
        }, s.get = function(i) {
          var _ = this.$ms, M = o(i);
          return M === "milliseconds" ? _ %= 1e3 : _ = M === "weeks" ? x(_ / c[M]) : this.$d[M], _ || 0;
        }, s.add = function(i, _, M) {
          var w;
          return w = _ ? i * c[o(_)] : h(i) ? i.$ms : m(i, this).$ms, m(this.$ms + w * (M ? -1 : 1), this);
        }, s.subtract = function(i, _) {
          return this.add(i, _, !0);
        }, s.locale = function(i) {
          var _ = this.clone();
          return _.$l = i, _;
        }, s.clone = function() {
          return m(this.$ms, this);
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
        n = i, r = i().$utils(), i.duration = function(w, T) {
          var S = i.locale();
          return m(w, { $l: S }, T);
        }, i.isDuration = h;
        var _ = s.prototype.add, M = s.prototype.subtract;
        s.prototype.add = function(w, T) {
          return h(w) ? a(this, w, 1) : _.bind(this)(w, T);
        }, s.prototype.subtract = function(w, T) {
          return h(w) ? a(this, w, -1) : M.bind(this)(w, T);
        };
      };
    }));
  })(I)), I.exports;
}
var Lt = kt();
const zt = /* @__PURE__ */ H(Lt);
var N = { exports: {} }, Ht = N.exports, nt;
function At() {
  return nt || (nt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Ht, (function() {
      return function(n, r, f) {
        n = n || {};
        var l = r.prototype, u = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function y(g, $, b, c) {
          return l.fromToBase(g, $, b, c);
        }
        f.en.relativeTime = u, l.fromToBase = function(g, $, b, c, h) {
          for (var m, o, p, x = b.$locale().relativeTime || u, D = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], Y = D.length, O = 0; O < Y; O += 1) {
            var a = D[O];
            a.d && (m = c ? f(g).diff(b, a.d, !0) : b.diff(g, a.d, !0));
            var d = (n.rounding || Math.round)(Math.abs(m));
            if (p = m > 0, d <= a.r || !a.r) {
              d <= 1 && O > 0 && (a = D[O - 1]);
              var s = x[a.l];
              h && (d = h("" + d)), o = typeof s == "string" ? s.replace("%d", d) : s(d, $, a.l, p);
              break;
            }
          }
          if ($) return o;
          var i = p ? x.future : x.past;
          return typeof i == "function" ? i(o) : i.replace("%s", o);
        }, l.to = function(g, $) {
          return y(g, $, this, !0);
        }, l.from = function(g, $) {
          return y(g, $, this);
        };
        var v = function(g) {
          return g.$u ? f.utc() : f();
        };
        l.toNow = function(g) {
          return this.to(v(this), g);
        }, l.fromNow = function(g) {
          return this.from(v(this), g);
        };
      };
    }));
  })(N)), N.exports;
}
var Ct = At();
const Et = /* @__PURE__ */ H(Ct);
var q = { exports: {} }, Pt = q.exports, st;
function Ft() {
  return st || (st = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r(k);
    })(Pt, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var f = r(n), l = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(u) {
        return u + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(u) {
        return u < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return f.default.locale(l, null, !0), l;
    }));
  })(q)), q.exports;
}
Ft();
const Bt = (t) => {
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
}, Rt = (t) => {
  let e;
  try {
    e = Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      era: "long"
    }).format(t).slice(0, 2);
  } catch {
    e = "不明";
  }
  return e;
}, Ut = (t, e) => {
  const n = e.prototype, r = n.format;
  n.format = function(l) {
    if (!l)
      return r.call(this, l);
    const u = l.replace(/\[([^\]]+)]|r+/g, (y) => {
      switch (y) {
        case "rrrr":
          return Bt(this.toDate());
        case "rr":
          return Rt(this.toDate());
        default:
          return y;
      }
    });
    return r.call(this, u);
  };
};
k.extend(vt);
k.extend(_t);
k.extend(Dt);
k.extend(Tt);
k.extend(zt);
k.extend(Et);
k.locale("ja");
k.extend(Ut);
const J = k, ce = (t) => t ? J(t).format("YYYY-MM-DDTHH:mm") : "", fe = (t) => {
  if (!t) return null;
  const e = J(t);
  return e.isValid() ? e.toDate() : null;
}, le = () => J, it = 300, It = 30, Nt = 20, qt = 3, Jt = 2e3, Zt = (t) => t.length > it ? `${t.slice(0, it)}...` : t, Z = (t, e = 0) => {
  if (e > qt) return "[truncated]";
  if (typeof t == "string") return Zt(t);
  if (typeof t == "number" || typeof t == "boolean" || t == null)
    return t;
  if (t instanceof Date) return t.toISOString();
  if (Array.isArray(t))
    return t.slice(0, Nt).map((n) => Z(n, e + 1));
  if (typeof t == "object") {
    const n = Object.entries(t).slice(
      0,
      It
    );
    return Object.fromEntries(
      n.map(([r, f]) => [r, Z(f, e + 1)])
    );
  }
  return String(t);
}, ot = (t) => {
  if (!t) return;
  const e = Z(t, 0), n = JSON.stringify(e);
  return n.length <= Jt ? e : { _truncated: !0, _size: n.length };
}, Wt = (t) => {
  if (!t) return;
  const e = Object.entries(t).map(([n, r]) => [
    n,
    Z(r, 0) ?? {}
  ]);
  return Object.fromEntries(e);
}, de = async (t) => {
  if (!(typeof window > "u"))
    try {
      const {
        message: e,
        reason: n,
        level: r = "info",
        category: f = "app",
        data: l,
        extra: u,
        tags: y,
        user: v,
        contexts: g,
        scope: $
      } = t, b = new Function(
        "modulePath",
        "return import(modulePath);"
      ), { addBreadcrumb: c, captureMessage: h, withScope: m } = await b("@sentry/browser"), o = ot({
        ...n ? { reason: n } : {},
        ...l ?? {}
      }), p = ot({
        ...n ? { reason: n } : {},
        ...u ?? {}
      }), x = Wt(g);
      c({
        category: f,
        level: r,
        message: e,
        data: o && Object.keys(o).length ? o : void 0
      }), m((D) => {
        if (v && D.setUser(v), y)
          for (const [Y, O] of Object.entries(y))
            D.setTag(Y, O);
        if (x)
          for (const [Y, O] of Object.entries(x))
            D.setContext(Y, O);
        $ && $(D), h(e, {
          level: r,
          extra: p && Object.keys(p).length ? p : void 0
        });
      });
    } catch {
    }
}, he = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var W = { exports: {} }, ut;
function Kt() {
  return ut || (ut = 1, (function(t) {
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
      var l;
      try {
        l = Promise;
      } catch {
        l = function() {
        };
      }
      function u(c, h, m, o, p) {
        typeof h == "object" && (m = h.depth, o = h.prototype, p = h.includeNonEnumerable, h = h.circular);
        var x = [], D = [], Y = typeof Buffer < "u";
        typeof h > "u" && (h = !0), typeof m > "u" && (m = 1 / 0);
        function O(a, d) {
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
          else if (n(a, l))
            s = new l(function(z, L) {
              a.then(function(E) {
                z(O(E, d - 1));
              }, function(E) {
                L(O(E, d - 1));
              });
            });
          else if (u.__isArray(a))
            s = [];
          else if (u.__isRegExp(a))
            s = new RegExp(a.source, b(a)), a.lastIndex && (s.lastIndex = a.lastIndex);
          else if (u.__isDate(a))
            s = new Date(a.getTime());
          else {
            if (Y && Buffer.isBuffer(a))
              return Buffer.allocUnsafe ? s = Buffer.allocUnsafe(a.length) : s = new Buffer(a.length), a.copy(s), s;
            n(a, Error) ? s = Object.create(a) : typeof o > "u" ? (i = Object.getPrototypeOf(a), s = Object.create(i)) : (s = Object.create(o), i = o);
          }
          if (h) {
            var _ = x.indexOf(a);
            if (_ != -1)
              return D[_];
            x.push(a), D.push(s);
          }
          n(a, r) && a.forEach(function(z, L) {
            var E = O(L, d - 1), ct = O(z, d - 1);
            s.set(E, ct);
          }), n(a, f) && a.forEach(function(z) {
            var L = O(z, d - 1);
            s.add(L);
          });
          for (var M in a) {
            var w;
            i && (w = Object.getOwnPropertyDescriptor(i, M)), !(w && w.set == null) && (s[M] = O(a[M], d - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var T = Object.getOwnPropertySymbols(a), M = 0; M < T.length; M++) {
              var S = T[M], j = Object.getOwnPropertyDescriptor(a, S);
              j && !j.enumerable && !p || (s[S] = O(a[S], d - 1), j.enumerable || Object.defineProperty(s, S, {
                enumerable: !1
              }));
            }
          if (p)
            for (var A = Object.getOwnPropertyNames(a), M = 0; M < A.length; M++) {
              var C = A[M], j = Object.getOwnPropertyDescriptor(a, C);
              j && j.enumerable || (s[C] = O(a[C], d - 1), Object.defineProperty(s, C, {
                enumerable: !1
              }));
            }
          return s;
        }
        return O(c, m);
      }
      u.clonePrototype = function(h) {
        if (h === null)
          return null;
        var m = function() {
        };
        return m.prototype = h, new m();
      };
      function y(c) {
        return Object.prototype.toString.call(c);
      }
      u.__objToStr = y;
      function v(c) {
        return typeof c == "object" && y(c) === "[object Date]";
      }
      u.__isDate = v;
      function g(c) {
        return typeof c == "object" && y(c) === "[object Array]";
      }
      u.__isArray = g;
      function $(c) {
        return typeof c == "object" && y(c) === "[object RegExp]";
      }
      u.__isRegExp = $;
      function b(c) {
        var h = "";
        return c.global && (h += "g"), c.ignoreCase && (h += "i"), c.multiline && (h += "m"), h;
      }
      return u.__getRegExpFlags = b, u;
    })();
    t.exports && (t.exports = e);
  })(W)), W.exports;
}
var Xt = Kt();
const Gt = /* @__PURE__ */ H(Xt), Vt = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), X = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), me = (t) => {
  const e = X(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, Qt = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), pe = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), ye = (t) => t || "", ve = (t) => t == null || String(t).trim() === "", ge = (t, e, n) => t.slice(0, e) + n + t.slice(e), $e = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), te = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const n in t) {
    const r = t[n];
    !Object.prototype.hasOwnProperty.call(t, n) || typeof r != "object" || Object.isFrozen(r) || te(r);
  }
  return t;
}, ee = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", G = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const n = {};
  for (const r in t) {
    const f = t[r];
    Object.prototype.hasOwnProperty.call(t, r) && (n[e(r)] = f !== null ? G(f, e) : null);
  }
  return n;
}, Me = (t) => G(t, X), re = (t) => G(t, Qt), _e = (t) => {
  const e = Gt(t);
  for (const n of Object.keys(e))
    (!e[n] || e[n] === 0) && (e[n] = void 0);
  return e;
}, ne = (t, e, n = !1, r = !1) => {
  if (!ee(t))
    return t;
  let f;
  e && e.length > 0 ? f = (u) => e.includes(u) : f = (u) => !0;
  const l = {};
  for (const u of Object.keys(t).filter(f)) {
    const y = n ? Vt(u) : r ? X(u) : u;
    l[y] = ne(
      t[u],
      void 0,
      n,
      r
    );
  }
  return l;
}, xe = (t, e, n) => {
  const r = !e || e.length === 0 ? Object.keys(t) : e, f = {};
  for (const l of Object.keys(t).filter((u) => r?.includes(u))) {
    const u = n ? n(l) : l;
    f[u] = t[l];
  }
  return f;
}, Ye = (t, e) => {
  const n = {};
  for (const r of Object.keys(t).filter((f) => e(t[f])))
    n[r] = t[r];
  return n;
}, at = (t, e, n) => {
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
}, Oe = (t, e = "id") => {
  const n = {};
  if (t)
    if (Array.isArray(t)) {
      for (const r of t)
        at(e, r, n);
      return n;
    } else {
      for (const r of Object.keys(t)) {
        const f = t[r];
        at(e, f, n);
      }
      return n;
    }
  else return n;
}, De = (t) => re(t), we = (t) => {
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
}, be = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  le as $getDayjs,
  De as __test__replaceHeadLower,
  ye as cNull,
  Vt as camelToSnake,
  $e as cardConv,
  J as dayjsJp,
  te as deepFreeze,
  ht as ensureFreshAccessTokenByState,
  ae as fetchWithAuthByState,
  ce as formatDateForInput,
  Qt as headLower,
  pe as headUpper,
  ve as isBlank,
  be as isFunction,
  ee as isPlainObject,
  de as logSentryMessageWithBreadcrumb,
  he as numberWithCommas,
  oe as obj2Array,
  _e as objectConvUndefined,
  ne as objectFilter,
  Ye as objectFilterFunc,
  xe as objectFilterKey,
  Oe as objectifyByKeyParam,
  fe as parseInputDate,
  lt as parseTokenExpiryEpochMs,
  ie as range,
  G as replaceKeys,
  Me as replaceSnakeToCamel,
  dt as shouldRefreshAccessTokenByExpiryMs,
  ue as sleep,
  X as snakeToCamel,
  me as snakeToCamelHeadUpper,
  ge as strIns,
  we as toQueryString,
  ft as withInflight
};
