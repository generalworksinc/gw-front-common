import F from "dayjs";
const je = (t, e) => {
  let n = 0;
  const r = [];
  for (; n <= e - t; )
    r.push(t + n), n += 1;
  return r;
}, ke = (t) => {
  const e = [];
  if (t) {
    for (const n of Object.keys(t))
      e.push(t[n]);
    return e;
  } else
    return e;
}, He = (t) => new Promise((e) => setTimeout(e, t)), B = /* @__PURE__ */ new Map();
function jt(t, e, n = 0) {
  const r = B.get(t), h = Date.now();
  if (r && (r.status === "pending" || r.ttl > 0 && h - r.ts <= r.ttl))
    return r.p;
  const m = e().catch((a) => {
    throw B.delete(t), a;
  }).then((a) => (n > 0 ? B.set(t, {
    p: m,
    ts: Date.now(),
    ttl: n,
    status: "settled"
  }) : B.delete(t), a));
  return B.set(t, { p: m, ts: h, ttl: n, status: "pending" }), m;
}
const kt = (t) => {
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
}, Ht = ({
  accessToken: t,
  accessTokenExpiresAtRaw: e,
  nowMs: n = Date.now(),
  refreshBufferMs: r = 300 * 1e3
}) => {
  const h = kt(e);
  return t ? h != null && h - n <= r : !0;
}, ct = async ({
  refreshAccessToken: t,
  inflightKey: e = "refresh",
  inflightTtlMs: n = 1e4
}) => jt(e, () => t(), n), zt = async ({
  getAuthState: t,
  refreshAccessToken: e,
  refreshBufferMs: n = 300 * 1e3,
  inflightKey: r = "refresh",
  inflightTtlMs: h = 1e4
}) => {
  const {
    accessToken: m,
    accessTokenExpiresAtRaw: a,
    refreshToken: Y,
    fallbackAccessToken: g
  } = await t(), _ = Ht({
    accessToken: m,
    accessTokenExpiresAtRaw: a,
    refreshBufferMs: n
  });
  if (_) {
    const y = await ct({
      refreshAccessToken: e,
      inflightKey: r,
      inflightTtlMs: h
    });
    if (y) return y;
  }
  if (!m && !_ && Y) {
    const y = await ct({
      refreshAccessToken: e,
      inflightKey: r,
      inflightTtlMs: h
    });
    if (y) return y;
  }
  return !m && g != null ? g : m;
}, ze = async (t, e) => {
  const n = await zt(t);
  try {
    return await e(n);
  } catch (r) {
    if ((r?.status ?? r?.statusCode ?? r?.response?.status) !== 401)
      throw r;
    const m = await ct(t);
    if (!m)
      throw r;
    return e(m);
  }
};
function C(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var N = { exports: {} }, At = N.exports, mt;
function Pt() {
  return mt || (mt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(At, (function() {
      var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, h = /([+-]|\d\d)/g;
      return function(m, a, Y) {
        var g = a.prototype;
        Y.utc = function(u) {
          var o = { date: u, utc: !0, args: arguments };
          return new a(o);
        }, g.utc = function(u) {
          var o = Y(this.toDate(), { locale: this.$L, utc: !0 });
          return u ? o.add(this.utcOffset(), n) : o;
        }, g.local = function() {
          return Y(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var _ = g.parse;
        g.parse = function(u) {
          u.utc && (this.$u = !0), this.$utils().u(u.$offset) || (this.$offset = u.$offset), _.call(this, u);
        };
        var y = g.init;
        g.init = function() {
          if (this.$u) {
            var u = this.$d;
            this.$y = u.getUTCFullYear(), this.$M = u.getUTCMonth(), this.$D = u.getUTCDate(), this.$W = u.getUTCDay(), this.$H = u.getUTCHours(), this.$m = u.getUTCMinutes(), this.$s = u.getUTCSeconds(), this.$ms = u.getUTCMilliseconds();
          } else y.call(this);
        };
        var L = g.utcOffset;
        g.utcOffset = function(u, o) {
          var l = this.$utils().u;
          if (l(u)) return this.$u ? 0 : l(this.$offset) ? L.call(this) : this.$offset;
          if (typeof u == "string" && (u = (function(c) {
            c === void 0 && (c = "");
            var v = c.match(r);
            if (!v) return null;
            var s = ("" + v[0]).match(h) || ["-", 0, 0], i = s[0], x = 60 * +s[1] + +s[2];
            return x === 0 ? 0 : i === "+" ? x : -x;
          })(u), u === null)) return this;
          var p = Math.abs(u) <= 16 ? 60 * u : u;
          if (p === 0) return this.utc(o);
          var d = this.clone();
          if (o) return d.$offset = p, d.$u = !1, d;
          var D = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (d = this.local().add(p + D, n)).$offset = p, d.$x.$localOffset = D, d;
        };
        var f = g.format;
        g.format = function(u) {
          var o = u || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return f.call(this, o);
        }, g.valueOf = function() {
          var u = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * u;
        }, g.isUTC = function() {
          return !!this.$u;
        }, g.toISOString = function() {
          return this.toDate().toISOString();
        }, g.toString = function() {
          return this.toDate().toUTCString();
        };
        var $ = g.toDate;
        g.toDate = function(u) {
          return u === "s" && this.$offset ? Y(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : $.call(this);
        };
        var M = g.diff;
        g.diff = function(u, o, l) {
          if (u && this.$u === u.$u) return M.call(this, u, o, l);
          var p = this.local(), d = Y(u).local();
          return M.call(p, d, o, l);
        };
      };
    }));
  })(N)), N.exports;
}
var Ft = Pt();
const Ct = /* @__PURE__ */ C(Ft);
var q = { exports: {} }, Et = q.exports, pt;
function Bt() {
  return pt || (pt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Et, (function() {
      var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
      return function(h, m, a) {
        var Y, g = function(f, $, M) {
          M === void 0 && (M = {});
          var u = new Date(f), o = (function(l, p) {
            p === void 0 && (p = {});
            var d = p.timeZoneName || "short", D = l + "|" + d, c = r[D];
            return c || (c = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: l, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: d }), r[D] = c), c;
          })($, M);
          return o.formatToParts(u);
        }, _ = function(f, $) {
          for (var M = g(f, $), u = [], o = 0; o < M.length; o += 1) {
            var l = M[o], p = l.type, d = l.value, D = n[p];
            D >= 0 && (u[D] = parseInt(d, 10));
          }
          var c = u[3], v = c === 24 ? 0 : c, s = u[0] + "-" + u[1] + "-" + u[2] + " " + v + ":" + u[4] + ":" + u[5] + ":000", i = +f;
          return (a.utc(s).valueOf() - (i -= i % 1e3)) / 6e4;
        }, y = m.prototype;
        y.tz = function(f, $) {
          f === void 0 && (f = Y);
          var M, u = this.utcOffset(), o = this.toDate(), l = o.toLocaleString("en-US", { timeZone: f }), p = Math.round((o - new Date(l)) / 1e3 / 60), d = 15 * -Math.round(o.getTimezoneOffset() / 15) - p;
          if (!Number(d)) M = this.utcOffset(0, $);
          else if (M = a(l, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(d, !0), $) {
            var D = M.utcOffset();
            M = M.add(u - D, "minute");
          }
          return M.$x.$timezone = f, M;
        }, y.offsetName = function(f) {
          var $ = this.$x.$timezone || a.tz.guess(), M = g(this.valueOf(), $, { timeZoneName: f }).find((function(u) {
            return u.type.toLowerCase() === "timezonename";
          }));
          return M && M.value;
        };
        var L = y.startOf;
        y.startOf = function(f, $) {
          if (!this.$x || !this.$x.$timezone) return L.call(this, f, $);
          var M = a(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return L.call(M, f, $).tz(this.$x.$timezone, !0);
        }, a.tz = function(f, $, M) {
          var u = M && $, o = M || $ || Y, l = _(+a(), o);
          if (typeof f != "string") return a(f).tz(o);
          var p = (function(v, s, i) {
            var x = v - 60 * s * 1e3, w = _(x, i);
            if (s === w) return [x, s];
            var O = _(x -= 60 * (w - s) * 1e3, i);
            return w === O ? [x, w] : [v - 60 * Math.min(w, O) * 1e3, Math.max(w, O)];
          })(a.utc(f, u).valueOf(), l, o), d = p[0], D = p[1], c = a(d).utcOffset(D);
          return c.$x.$timezone = o, c;
        }, a.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, a.tz.setDefault = function(f) {
          Y = f;
        };
      };
    }));
  })(q)), q.exports;
}
var Ut = Bt();
const Rt = /* @__PURE__ */ C(Ut);
var Z = { exports: {} }, It = Z.exports, vt;
function Nt() {
  return vt || (vt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(It, (function() {
      return function(n, r, h) {
        r.prototype.isBetween = function(m, a, Y, g) {
          var _ = h(m), y = h(a), L = (g = g || "()")[0] === "(", f = g[1] === ")";
          return (L ? this.isAfter(_, Y) : !this.isBefore(_, Y)) && (f ? this.isBefore(y, Y) : !this.isAfter(y, Y)) || (L ? this.isBefore(_, Y) : !this.isAfter(_, Y)) && (f ? this.isAfter(y, Y) : !this.isBefore(y, Y));
        };
      };
    }));
  })(Z)), Z.exports;
}
var qt = Nt();
const Zt = /* @__PURE__ */ C(qt);
var J = { exports: {} }, Jt = J.exports, yt;
function Wt() {
  return yt || (yt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Jt, (function() {
      var n = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(r, h, m) {
        var a = h.prototype, Y = a.format;
        m.en.formats = n, a.format = function(g) {
          g === void 0 && (g = "YYYY-MM-DDTHH:mm:ssZ");
          var _ = this.$locale().formats, y = (function(L, f) {
            return L.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function($, M, u) {
              var o = u && u.toUpperCase();
              return M || f[u] || n[u] || f[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(l, p, d) {
                return p || d.slice(1);
              }));
            }));
          })(g, _ === void 0 ? {} : _);
          return Y.call(this, y);
        };
      };
    }));
  })(J)), J.exports;
}
var Xt = Wt();
const Kt = /* @__PURE__ */ C(Xt);
var W = { exports: {} }, Gt = W.exports, gt;
function Vt() {
  return gt || (gt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Gt, (function() {
      var n, r, h = 1e3, m = 6e4, a = 36e5, Y = 864e5, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, _ = 31536e6, y = 2628e6, L = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, f = { years: _, months: y, days: Y, hours: a, minutes: m, seconds: h, milliseconds: 1, weeks: 6048e5 }, $ = function(v) {
        return v instanceof D;
      }, M = function(v, s, i) {
        return new D(v, i, s.$l);
      }, u = function(v) {
        return r.p(v) + "s";
      }, o = function(v) {
        return v < 0;
      }, l = function(v) {
        return o(v) ? Math.ceil(v) : Math.floor(v);
      }, p = function(v) {
        return Math.abs(v);
      }, d = function(v, s) {
        return v ? o(v) ? { negative: !0, format: "" + p(v) + s } : { negative: !1, format: "" + v + s } : { negative: !1, format: "" };
      }, D = (function() {
        function v(i, x, w) {
          var O = this;
          if (this.$d = {}, this.$l = w, i === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), x) return M(i * f[u(x)], this);
          if (typeof i == "number") return this.$ms = i, this.parseFromMilliseconds(), this;
          if (typeof i == "object") return Object.keys(i).forEach((function(T) {
            O.$d[u(T)] = i[T];
          })), this.calMilliseconds(), this;
          if (typeof i == "string") {
            var S = i.match(L);
            if (S) {
              var b = S.slice(2).map((function(T) {
                return T != null ? Number(T) : 0;
              }));
              return this.$d.years = b[0], this.$d.months = b[1], this.$d.weeks = b[2], this.$d.days = b[3], this.$d.hours = b[4], this.$d.minutes = b[5], this.$d.seconds = b[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var s = v.prototype;
        return s.calMilliseconds = function() {
          var i = this;
          this.$ms = Object.keys(this.$d).reduce((function(x, w) {
            return x + (i.$d[w] || 0) * f[w];
          }), 0);
        }, s.parseFromMilliseconds = function() {
          var i = this.$ms;
          this.$d.years = l(i / _), i %= _, this.$d.months = l(i / y), i %= y, this.$d.days = l(i / Y), i %= Y, this.$d.hours = l(i / a), i %= a, this.$d.minutes = l(i / m), i %= m, this.$d.seconds = l(i / h), i %= h, this.$d.milliseconds = i;
        }, s.toISOString = function() {
          var i = d(this.$d.years, "Y"), x = d(this.$d.months, "M"), w = +this.$d.days || 0;
          this.$d.weeks && (w += 7 * this.$d.weeks);
          var O = d(w, "D"), S = d(this.$d.hours, "H"), b = d(this.$d.minutes, "M"), T = this.$d.seconds || 0;
          this.$d.milliseconds && (T += this.$d.milliseconds / 1e3, T = Math.round(1e3 * T) / 1e3);
          var k = d(T, "S"), H = i.negative || x.negative || O.negative || S.negative || b.negative || k.negative, A = S.format || b.format || k.format ? "T" : "", j = (H ? "-" : "") + "P" + i.format + x.format + O.format + A + S.format + b.format + k.format;
          return j === "P" || j === "-P" ? "P0D" : j;
        }, s.toJSON = function() {
          return this.toISOString();
        }, s.format = function(i) {
          var x = i || "YYYY-MM-DDTHH:mm:ss", w = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
          return x.replace(g, (function(O, S) {
            return S || String(w[O]);
          }));
        }, s.as = function(i) {
          return this.$ms / f[u(i)];
        }, s.get = function(i) {
          var x = this.$ms, w = u(i);
          return w === "milliseconds" ? x %= 1e3 : x = w === "weeks" ? l(x / f[w]) : this.$d[w], x || 0;
        }, s.add = function(i, x, w) {
          var O;
          return O = x ? i * f[u(x)] : $(i) ? i.$ms : M(i, this).$ms, M(this.$ms + O * (w ? -1 : 1), this);
        }, s.subtract = function(i, x) {
          return this.add(i, x, !0);
        }, s.locale = function(i) {
          var x = this.clone();
          return x.$l = i, x;
        }, s.clone = function() {
          return M(this.$ms, this);
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
        }, v;
      })(), c = function(v, s, i) {
        return v.add(s.years() * i, "y").add(s.months() * i, "M").add(s.days() * i, "d").add(s.hours() * i, "h").add(s.minutes() * i, "m").add(s.seconds() * i, "s").add(s.milliseconds() * i, "ms");
      };
      return function(v, s, i) {
        n = i, r = i().$utils(), i.duration = function(O, S) {
          var b = i.locale();
          return M(O, { $l: b }, S);
        }, i.isDuration = $;
        var x = s.prototype.add, w = s.prototype.subtract;
        s.prototype.add = function(O, S) {
          return $(O) ? c(this, O, 1) : x.bind(this)(O, S);
        }, s.prototype.subtract = function(O, S) {
          return $(O) ? c(this, O, -1) : w.bind(this)(O, S);
        };
      };
    }));
  })(W)), W.exports;
}
var Qt = Vt();
const te = /* @__PURE__ */ C(Qt);
var X = { exports: {} }, ee = X.exports, $t;
function re() {
  return $t || ($t = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(ee, (function() {
      return function(n, r, h) {
        n = n || {};
        var m = r.prototype, a = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function Y(_, y, L, f) {
          return m.fromToBase(_, y, L, f);
        }
        h.en.relativeTime = a, m.fromToBase = function(_, y, L, f, $) {
          for (var M, u, o, l = L.$locale().relativeTime || a, p = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], d = p.length, D = 0; D < d; D += 1) {
            var c = p[D];
            c.d && (M = f ? h(_).diff(L, c.d, !0) : L.diff(_, c.d, !0));
            var v = (n.rounding || Math.round)(Math.abs(M));
            if (o = M > 0, v <= c.r || !c.r) {
              v <= 1 && D > 0 && (c = p[D - 1]);
              var s = l[c.l];
              $ && (v = $("" + v)), u = typeof s == "string" ? s.replace("%d", v) : s(v, y, c.l, o);
              break;
            }
          }
          if (y) return u;
          var i = o ? l.future : l.past;
          return typeof i == "function" ? i(u) : i.replace("%s", u);
        }, m.to = function(_, y) {
          return Y(_, y, this, !0);
        }, m.from = function(_, y) {
          return Y(_, y, this);
        };
        var g = function(_) {
          return _.$u ? h.utc() : h();
        };
        m.toNow = function(_) {
          return this.to(g(this), _);
        }, m.fromNow = function(_) {
          return this.from(g(this), _);
        };
      };
    }));
  })(X)), X.exports;
}
var ne = re();
const se = /* @__PURE__ */ C(ne);
var K = { exports: {} }, ie = K.exports, Mt;
function oe() {
  return Mt || (Mt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(ie, (function() {
      var n = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, r = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, h = /\d/, m = /\d\d/, a = /\d\d?/, Y = /\d*[^-_:/,()\s\d]+/, g = {}, _ = function(o) {
        return (o = +o) + (o > 68 ? 1900 : 2e3);
      }, y = function(o) {
        return function(l) {
          this[o] = +l;
        };
      }, L = [/[+-]\d\d:?(\d\d)?|Z/, function(o) {
        (this.zone || (this.zone = {})).offset = (function(l) {
          if (!l || l === "Z") return 0;
          var p = l.match(/([+-]|\d\d)/g), d = 60 * p[1] + (+p[2] || 0);
          return d === 0 ? 0 : p[0] === "+" ? -d : d;
        })(o);
      }], f = function(o) {
        var l = g[o];
        return l && (l.indexOf ? l : l.s.concat(l.f));
      }, $ = function(o, l) {
        var p, d = g.meridiem;
        if (d) {
          for (var D = 1; D <= 24; D += 1) if (o.indexOf(d(D, 0, l)) > -1) {
            p = D > 12;
            break;
          }
        } else p = o === (l ? "pm" : "PM");
        return p;
      }, M = { A: [Y, function(o) {
        this.afternoon = $(o, !1);
      }], a: [Y, function(o) {
        this.afternoon = $(o, !0);
      }], Q: [h, function(o) {
        this.month = 3 * (o - 1) + 1;
      }], S: [h, function(o) {
        this.milliseconds = 100 * +o;
      }], SS: [m, function(o) {
        this.milliseconds = 10 * +o;
      }], SSS: [/\d{3}/, function(o) {
        this.milliseconds = +o;
      }], s: [a, y("seconds")], ss: [a, y("seconds")], m: [a, y("minutes")], mm: [a, y("minutes")], H: [a, y("hours")], h: [a, y("hours")], HH: [a, y("hours")], hh: [a, y("hours")], D: [a, y("day")], DD: [m, y("day")], Do: [Y, function(o) {
        var l = g.ordinal, p = o.match(/\d+/);
        if (this.day = p[0], l) for (var d = 1; d <= 31; d += 1) l(d).replace(/\[|\]/g, "") === o && (this.day = d);
      }], w: [a, y("week")], ww: [m, y("week")], M: [a, y("month")], MM: [m, y("month")], MMM: [Y, function(o) {
        var l = f("months"), p = (f("monthsShort") || l.map((function(d) {
          return d.slice(0, 3);
        }))).indexOf(o) + 1;
        if (p < 1) throw new Error();
        this.month = p % 12 || p;
      }], MMMM: [Y, function(o) {
        var l = f("months").indexOf(o) + 1;
        if (l < 1) throw new Error();
        this.month = l % 12 || l;
      }], Y: [/[+-]?\d+/, y("year")], YY: [m, function(o) {
        this.year = _(o);
      }], YYYY: [/\d{4}/, y("year")], Z: L, ZZ: L };
      function u(o) {
        var l, p;
        l = o, p = g && g.formats;
        for (var d = (o = l.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(w, O, S) {
          var b = S && S.toUpperCase();
          return O || p[S] || n[S] || p[b].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(T, k, H) {
            return k || H.slice(1);
          }));
        }))).match(r), D = d.length, c = 0; c < D; c += 1) {
          var v = d[c], s = M[v], i = s && s[0], x = s && s[1];
          d[c] = x ? { regex: i, parser: x } : v.replace(/^\[|\]$/g, "");
        }
        return function(w) {
          for (var O = {}, S = 0, b = 0; S < D; S += 1) {
            var T = d[S];
            if (typeof T == "string") b += T.length;
            else {
              var k = T.regex, H = T.parser, A = w.slice(b), j = k.exec(A)[0];
              H.call(O, j), w = w.replace(j, "");
            }
          }
          return (function(z) {
            var E = z.afternoon;
            if (E !== void 0) {
              var P = z.hours;
              E ? P < 12 && (z.hours += 12) : P === 12 && (z.hours = 0), delete z.afternoon;
            }
          })(O), O;
        };
      }
      return function(o, l, p) {
        p.p.customParseFormat = !0, o && o.parseTwoDigitYear && (_ = o.parseTwoDigitYear);
        var d = l.prototype, D = d.parse;
        d.parse = function(c) {
          var v = c.date, s = c.utc, i = c.args;
          this.$u = s;
          var x = i[1];
          if (typeof x == "string") {
            var w = i[2] === !0, O = i[3] === !0, S = w || O, b = i[2];
            O && (b = i[2]), g = this.$locale(), !w && b && (g = p.Ls[b]), this.$d = (function(A, j, z, E) {
              try {
                if (["x", "X"].indexOf(j) > -1) return new Date((j === "X" ? 1e3 : 1) * A);
                var P = u(j)(A), tt = P.year, U = P.month, Ot = P.day, bt = P.hours, St = P.minutes, Tt = P.seconds, Lt = P.milliseconds, ht = P.zone, dt = P.week, et = /* @__PURE__ */ new Date(), rt = Ot || (tt || U ? 1 : et.getDate()), nt = tt || et.getFullYear(), R = 0;
                tt && !U || (R = U > 0 ? U - 1 : et.getMonth());
                var I, st = bt || 0, it = St || 0, ot = Tt || 0, at = Lt || 0;
                return ht ? new Date(Date.UTC(nt, R, rt, st, it, ot, at + 60 * ht.offset * 1e3)) : z ? new Date(Date.UTC(nt, R, rt, st, it, ot, at)) : (I = new Date(nt, R, rt, st, it, ot, at), dt && (I = E(I).week(dt).toDate()), I);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(v, x, s, p), this.init(), b && b !== !0 && (this.$L = this.locale(b).$L), S && v != this.format(x) && (this.$d = /* @__PURE__ */ new Date("")), g = {};
          } else if (x instanceof Array) for (var T = x.length, k = 1; k <= T; k += 1) {
            i[1] = x[k - 1];
            var H = p.apply(this, i);
            if (H.isValid()) {
              this.$d = H.$d, this.$L = H.$L, this.init();
              break;
            }
            k === T && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else D.call(this, c);
        };
      };
    }));
  })(K)), K.exports;
}
var ae = oe();
const ue = /* @__PURE__ */ C(ae);
var G = { exports: {} }, ce = G.exports, Yt;
function fe() {
  return Yt || (Yt = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r(F);
    })(ce, (function(n) {
      function r(a) {
        return a && typeof a == "object" && "default" in a ? a : { default: a };
      }
      var h = r(n), m = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(a) {
        return a + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(a) {
        return a < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return h.default.locale(m, null, !0), m;
    }));
  })(G)), G.exports;
}
fe();
const le = (t) => {
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
}, he = (t) => {
  let e;
  try {
    e = Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      era: "long"
    }).format(t).slice(0, 2);
  } catch {
    e = "不明";
  }
  return e;
}, de = (t, e) => {
  const n = e.prototype, r = n.format;
  n.format = function(m) {
    if (!m)
      return r.call(this, m);
    const a = m.replace(/\[([^\]]+)]|r+/g, (Y) => {
      switch (Y) {
        case "rrrr":
          return le(this.toDate());
        case "rr":
          return he(this.toDate());
        default:
          return Y;
      }
    });
    return r.call(this, a);
  };
};
F.extend(Ct);
F.extend(ue);
F.extend(Rt);
F.extend(Zt);
F.extend(Kt);
F.extend(te);
F.extend(se);
F.locale("ja");
F.extend(de);
const V = F, Ae = (t) => t ? V(t).format("YYYY-MM-DDTHH:mm") : "", Pe = (t) => {
  if (!t) return null;
  const e = V(t);
  return e.isValid() ? e.toDate() : null;
}, Fe = () => V, xt = 300, me = 30, pe = 20, ve = 3, ye = 2e3, ge = (t) => t.length > xt ? `${t.slice(0, xt)}...` : t, Q = (t, e = 0) => {
  if (e > ve) return "[truncated]";
  if (typeof t == "string") return ge(t);
  if (typeof t == "number" || typeof t == "boolean" || t == null)
    return t;
  if (t instanceof Date) return t.toISOString();
  if (Array.isArray(t))
    return t.slice(0, pe).map((n) => Q(n, e + 1));
  if (typeof t == "object") {
    const n = Object.entries(t).slice(
      0,
      me
    );
    return Object.fromEntries(
      n.map(([r, h]) => [r, Q(h, e + 1)])
    );
  }
  return String(t);
}, Dt = (t) => {
  if (!t) return;
  const e = Q(t, 0), n = JSON.stringify(e);
  return n.length <= ye ? e : { _truncated: !0, _size: n.length };
}, $e = (t) => {
  if (!t) return;
  const e = Object.entries(t).map(([n, r]) => [
    n,
    Q(r, 0) ?? {}
  ]);
  return Object.fromEntries(e);
}, Ce = async (t) => {
  if (!(typeof window > "u"))
    try {
      const {
        message: e,
        reason: n,
        level: r = "info",
        category: h = "app",
        data: m,
        extra: a,
        tags: Y,
        user: g,
        contexts: _,
        scope: y
      } = t, L = new Function(
        "modulePath",
        "return import(modulePath);"
      ), { addBreadcrumb: f, captureMessage: $, withScope: M } = await L("@sentry/browser"), u = Dt({
        ...n ? { reason: n } : {},
        ...m ?? {}
      }), o = Dt({
        ...n ? { reason: n } : {},
        ...a ?? {}
      }), l = $e(_);
      f({
        category: h,
        level: r,
        message: e,
        data: u && Object.keys(u).length ? u : void 0
      }), M((p) => {
        if (g && p.setUser(g), Y)
          for (const [d, D] of Object.entries(Y))
            p.setTag(d, D);
        if (l)
          for (const [d, D] of Object.entries(l))
            p.setContext(d, D);
        y && y(p), $(e, {
          level: r,
          extra: o && Object.keys(o).length ? o : void 0
        });
      });
    } catch {
    }
}, Ee = (t) => {
  if (t == null) return "";
  const e = t.toString().split(".");
  return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".");
};
var ut = { exports: {} }, wt;
function Me() {
  return wt || (wt = 1, (function(t) {
    var e = (function() {
      function n(f, $) {
        return $ != null && f instanceof $;
      }
      var r;
      try {
        r = Map;
      } catch {
        r = function() {
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
      function a(f, $, M, u, o) {
        typeof $ == "object" && (M = $.depth, u = $.prototype, o = $.includeNonEnumerable, $ = $.circular);
        var l = [], p = [], d = typeof Buffer < "u";
        typeof $ > "u" && ($ = !0), typeof M > "u" && (M = 1 / 0);
        function D(c, v) {
          if (c === null)
            return null;
          if (v === 0)
            return c;
          var s, i;
          if (typeof c != "object")
            return c;
          if (n(c, r))
            s = new r();
          else if (n(c, h))
            s = new h();
          else if (n(c, m))
            s = new m(function(A, j) {
              c.then(function(z) {
                A(D(z, v - 1));
              }, function(z) {
                j(D(z, v - 1));
              });
            });
          else if (a.__isArray(c))
            s = [];
          else if (a.__isRegExp(c))
            s = new RegExp(c.source, L(c)), c.lastIndex && (s.lastIndex = c.lastIndex);
          else if (a.__isDate(c))
            s = new Date(c.getTime());
          else {
            if (d && Buffer.isBuffer(c))
              return Buffer.allocUnsafe ? s = Buffer.allocUnsafe(c.length) : s = new Buffer(c.length), c.copy(s), s;
            n(c, Error) ? s = Object.create(c) : typeof u > "u" ? (i = Object.getPrototypeOf(c), s = Object.create(i)) : (s = Object.create(u), i = u);
          }
          if ($) {
            var x = l.indexOf(c);
            if (x != -1)
              return p[x];
            l.push(c), p.push(s);
          }
          n(c, r) && c.forEach(function(A, j) {
            var z = D(j, v - 1), E = D(A, v - 1);
            s.set(z, E);
          }), n(c, h) && c.forEach(function(A) {
            var j = D(A, v - 1);
            s.add(j);
          });
          for (var w in c) {
            var O;
            i && (O = Object.getOwnPropertyDescriptor(i, w)), !(O && O.set == null) && (s[w] = D(c[w], v - 1));
          }
          if (Object.getOwnPropertySymbols)
            for (var S = Object.getOwnPropertySymbols(c), w = 0; w < S.length; w++) {
              var b = S[w], T = Object.getOwnPropertyDescriptor(c, b);
              T && !T.enumerable && !o || (s[b] = D(c[b], v - 1), T.enumerable || Object.defineProperty(s, b, {
                enumerable: !1
              }));
            }
          if (o)
            for (var k = Object.getOwnPropertyNames(c), w = 0; w < k.length; w++) {
              var H = k[w], T = Object.getOwnPropertyDescriptor(c, H);
              T && T.enumerable || (s[H] = D(c[H], v - 1), Object.defineProperty(s, H, {
                enumerable: !1
              }));
            }
          return s;
        }
        return D(f, M);
      }
      a.clonePrototype = function($) {
        if ($ === null)
          return null;
        var M = function() {
        };
        return M.prototype = $, new M();
      };
      function Y(f) {
        return Object.prototype.toString.call(f);
      }
      a.__objToStr = Y;
      function g(f) {
        return typeof f == "object" && Y(f) === "[object Date]";
      }
      a.__isDate = g;
      function _(f) {
        return typeof f == "object" && Y(f) === "[object Array]";
      }
      a.__isArray = _;
      function y(f) {
        return typeof f == "object" && Y(f) === "[object RegExp]";
      }
      a.__isRegExp = y;
      function L(f) {
        var $ = "";
        return f.global && ($ += "g"), f.ignoreCase && ($ += "i"), f.multiline && ($ += "m"), $;
      }
      return a.__getRegExpFlags = L, a;
    })();
    t.exports && (t.exports = e);
  })(ut)), ut.exports;
}
var Ye = Me();
const xe = /* @__PURE__ */ C(Ye), De = (t) => t.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), ft = (t) => t.replace(/_./g, (e) => e.charAt(1).toUpperCase()), Be = (t) => {
  const e = ft(t);
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}, we = (t) => t.substring(0, 1).toLowerCase() + t.substring(1), Ue = (t) => t.substring(0, 1).toUpperCase() + t.substring(1), Re = (t) => t || "", Ie = (t) => t == null || String(t).trim() === "", Ne = (t, e, n) => t.slice(0, e) + n + t.slice(e), qe = (t) => t.replace(
  /[ａ-ｚＡ-Ｚ０-９]/g,
  (e) => String.fromCharCode(e.charCodeAt(0) - 65248)
).replace(/[-ー―−‐―]/g, ""), _e = (t) => {
  const e = typeof t;
  if (t === null || e !== "object" && e !== "function")
    return console.log("object is not object", t, e), t;
  if (Object.freeze(t), e === "function")
    return t;
  for (const n in t) {
    const r = t[n];
    !Object.prototype.hasOwnProperty.call(t, n) || typeof r != "object" || Object.isFrozen(r) || _e(r);
  }
  return t;
}, Oe = (t) => typeof t == "object" && t !== null && t.constructor === Object && Object.prototype.toString.call(t) === "[object Object]", lt = (t, e) => {
  if (t === null || typeof t != "object")
    return t;
  const n = {};
  for (const r in t) {
    const h = t[r];
    Object.prototype.hasOwnProperty.call(t, r) && (n[e(r)] = h !== null ? lt(h, e) : null);
  }
  return n;
}, Ze = (t) => lt(t, ft), be = (t) => lt(t, we), Je = (t) => {
  const e = xe(t);
  for (const n of Object.keys(e))
    (!e[n] || e[n] === 0) && (e[n] = void 0);
  return e;
}, Se = (t, e, n = !1, r = !1) => {
  if (!Oe(t))
    return t;
  let h;
  e && e.length > 0 ? h = (a) => e.includes(a) : h = (a) => !0;
  const m = {};
  for (const a of Object.keys(t).filter(h)) {
    const Y = n ? De(a) : r ? ft(a) : a;
    m[Y] = Se(
      t[a],
      void 0,
      n,
      r
    );
  }
  return m;
}, We = (t, e, n) => {
  const r = !e || e.length === 0 ? Object.keys(t) : e, h = {};
  for (const m of Object.keys(t).filter((a) => r?.includes(a))) {
    const a = n ? n(m) : m;
    h[a] = t[m];
  }
  return h;
}, Xe = (t, e) => {
  const n = {};
  for (const r of Object.keys(t).filter((h) => e(t[h])))
    n[r] = t[r];
  return n;
}, _t = (t, e, n) => {
  if (t.indexOf(".") === 0)
    n[e[t]] = e;
  else {
    let r = e;
    for (const h of t.split(".")) {
      if (r == null)
        break;
      r = r[h];
    }
    if (r == null)
      throw new Error("keyName is not found in object");
    n[r] = e;
  }
}, Ke = (t, e = "id") => {
  const n = {};
  if (t)
    if (Array.isArray(t)) {
      for (const r of t)
        _t(e, r, n);
      return n;
    } else {
      for (const r of Object.keys(t)) {
        const h = t[r];
        _t(e, h, n);
      }
      return n;
    }
  else return n;
}, Ge = (t) => be(t), Ve = (t) => {
  const e = new URLSearchParams();
  for (const [n, r] of Object.entries(t))
    if (r != null) {
      if (Array.isArray(r)) {
        for (const h of r)
          h != null && e.append(n, String(h));
        continue;
      }
      e.set(n, String(r));
    }
  return e.toString();
}, Qe = (t) => t == null ? !1 : {}.toString.call(t) === "[object Function]";
export {
  Fe as $getDayjs,
  Ge as __test__replaceHeadLower,
  Re as cNull,
  De as camelToSnake,
  qe as cardConv,
  V as dayjsJp,
  _e as deepFreeze,
  zt as ensureFreshAccessTokenByState,
  ze as fetchWithAuthByState,
  Ae as formatDateForInput,
  we as headLower,
  Ue as headUpper,
  Ie as isBlank,
  Qe as isFunction,
  Oe as isPlainObject,
  Ce as logSentryMessageWithBreadcrumb,
  Ee as numberWithCommas,
  ke as obj2Array,
  Je as objectConvUndefined,
  Se as objectFilter,
  Xe as objectFilterFunc,
  We as objectFilterKey,
  Ke as objectifyByKeyParam,
  Pe as parseInputDate,
  kt as parseTokenExpiryEpochMs,
  je as range,
  lt as replaceKeys,
  Ze as replaceSnakeToCamel,
  Ht as shouldRefreshAccessTokenByExpiryMs,
  He as sleep,
  ft as snakeToCamel,
  Be as snakeToCamelHeadUpper,
  Ne as strIns,
  Ve as toQueryString,
  jt as withInflight
};
