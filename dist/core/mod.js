import e from "dayjs";
import "dayjs/locale/ja.js";
// \0rolldown/runtime.js
var t = Object.create, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.getPrototypeOf, o = Object.prototype.hasOwnProperty, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), c = (e, t, a, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = i(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o.call(e, d) && d !== a && n(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r(t, d)) || s.enumerable
	});
	return e;
}, l = (e, r, i) => (i = e == null ? {} : t(a(e)), c(r || !e || !e.__esModule || !o.call(e, "default") ? n(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), u = (e, t) => {
	let n = 0, r = [];
	for (; n <= t - e;) r.push(e + n), n += 1;
	return r;
}, d = (e) => {
	let t = [];
	if (e) {
		for (let n of Object.keys(e)) t.push(e[n]);
		return t;
	}
	return t;
}, f = (e) => new Promise((t) => setTimeout(t, e)), p = /* @__PURE__ */ new Map();
function m(e, t, n = 0) {
	let r = p.get(e), i = Date.now();
	if (r && (r.status === "pending" || r.ttl > 0 && i - r.ts <= r.ttl)) return r.p;
	let a = t().catch((t) => {
		throw p.delete(e), t;
	}).then((t) => (n > 0 ? p.set(e, {
		p: a,
		ts: Date.now(),
		ttl: n,
		status: "settled"
	}) : p.delete(e), t));
	return p.set(e, {
		p: a,
		ts: i,
		ttl: n,
		status: "pending"
	}), a;
}
// core/common/features/auth.ts
var h = (e) => {
	if (e == null) return null;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	let t = String(e).trim();
	if (!t) return null;
	if (/^\d+$/.test(t)) {
		let e = Number(t);
		return Number.isFinite(e) ? e : null;
	}
	let n = Date.parse(t);
	return Number.isNaN(n) ? null : n;
}, g = ({ accessToken: e, accessTokenExpiresAtRaw: t, nowMs: n = Date.now(), refreshBufferMs: r = 3e5 }) => {
	let i = h(t);
	return !e || i != null && i - n <= r;
}, _ = async ({ refreshAccessToken: e, inflightKey: t = "refresh", inflightTtlMs: n = 1e4 }) => m(t, () => e(), n), v = async ({ getAuthState: e, refreshAccessToken: t, refreshBufferMs: n = 3e5, inflightKey: r = "refresh", inflightTtlMs: i = 1e4 }) => {
	let { accessToken: a, accessTokenExpiresAtRaw: o, refreshToken: s, fallbackAccessToken: c } = await e(), l = g({
		accessToken: a,
		accessTokenExpiresAtRaw: o,
		refreshBufferMs: n
	});
	if (l) {
		let e = await _({
			refreshAccessToken: t,
			inflightKey: r,
			inflightTtlMs: i
		});
		if (e) return e;
	}
	if (!a && !l && s) {
		let e = await _({
			refreshAccessToken: t,
			inflightKey: r,
			inflightTtlMs: i
		});
		if (e) return e;
	}
	return !a && c != null ? c : a;
}, y = async (e, t) => {
	let n = await v(e);
	try {
		return await t(n);
	} catch (n) {
		if ((n?.status ?? n?.statusCode ?? n?.response?.status) !== 401) throw n;
		let r = await _(e);
		if (!r) throw n;
		return t(r);
	}
}, b = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_utc = r();
	})(n, (function() {
		var e = "minute", t = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
		return function(r, i, a) {
			var o = i.prototype;
			a.utc = function(e) {
				return new i({
					date: e,
					utc: !0,
					args: arguments
				});
			}, o.utc = function(t) {
				var n = a(this.toDate(), {
					locale: this.$L,
					utc: !0
				});
				return t ? n.add(this.utcOffset(), e) : n;
			}, o.local = function() {
				return a(this.toDate(), {
					locale: this.$L,
					utc: !1
				});
			};
			var s = o.parse;
			o.parse = function(e) {
				e.utc && (this.$u = !0), this.$utils().u(e.$offset) || (this.$offset = e.$offset), s.call(this, e);
			};
			var c = o.init;
			o.init = function() {
				if (this.$u) {
					var e = this.$d;
					this.$y = e.getUTCFullYear(), this.$M = e.getUTCMonth(), this.$D = e.getUTCDate(), this.$W = e.getUTCDay(), this.$H = e.getUTCHours(), this.$m = e.getUTCMinutes(), this.$s = e.getUTCSeconds(), this.$ms = e.getUTCMilliseconds();
				} else c.call(this);
			};
			var l = o.utcOffset;
			o.utcOffset = function(r, i) {
				var a = this.$utils().u;
				if (a(r)) return this.$u ? 0 : a(this.$offset) ? l.call(this) : this.$offset;
				if (typeof r == "string" && (r = function(e) {
					e === void 0 && (e = "");
					var r = e.match(t);
					if (!r) return null;
					var i = ("" + r[0]).match(n) || [
						"-",
						0,
						0
					], a = i[0], o = 60 * i[1] + +i[2];
					return o === 0 ? 0 : a === "+" ? o : -o;
				}(r), r === null)) return this;
				var o = Math.abs(r) <= 16 ? 60 * r : r;
				if (o === 0) return this.utc(i);
				var s = this.clone();
				if (i) return s.$offset = o, s.$u = !1, s;
				var c = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
				return (s = this.local().add(o + c, e)).$offset = o, s.$x.$localOffset = c, s;
			};
			var u = o.format;
			o.format = function(e) {
				var t = e || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
				return u.call(this, t);
			}, o.valueOf = function() {
				var e = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
				return this.$d.valueOf() - 6e4 * e;
			}, o.isUTC = function() {
				return !!this.$u;
			}, o.toISOString = function() {
				return this.toDate().toISOString();
			}, o.toString = function() {
				return this.toDate().toUTCString();
			};
			var d = o.toDate;
			o.toDate = function(e) {
				return e === "s" && this.$offset ? a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this);
			};
			var f = o.diff;
			o.diff = function(e, t, n) {
				if (e && this.$u === e.$u) return f.call(this, e, t, n);
				var r = this.local(), i = a(e).local();
				return f.call(r, i, t, n);
			};
		};
	}));
})), x = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_timezone = r();
	})(n, (function() {
		var e = {
			year: 0,
			month: 1,
			day: 2,
			hour: 3,
			minute: 4,
			second: 5
		}, t = {};
		return function(n, r, i) {
			var a, o = function(e, n, r) {
				r === void 0 && (r = {});
				var i = new Date(e);
				return function(e, n) {
					n === void 0 && (n = {});
					var r = n.timeZoneName || "short", i = e + "|" + r, a = t[i];
					return a || (a = new Intl.DateTimeFormat("en-US", {
						hour12: !1,
						timeZone: e,
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						timeZoneName: r
					}), t[i] = a), a;
				}(n, r).formatToParts(i);
			}, s = function(t, n) {
				for (var r = o(t, n), a = [], s = 0; s < r.length; s += 1) {
					var c = r[s], l = c.type, u = c.value, d = e[l];
					d >= 0 && (a[d] = parseInt(u, 10));
				}
				var f = a[3], p = f === 24 ? 0 : f, m = a[0] + "-" + a[1] + "-" + a[2] + " " + p + ":" + a[4] + ":" + a[5] + ":000", h = +t;
				return (i.utc(m).valueOf() - (h -= h % 1e3)) / 6e4;
			}, c = r.prototype;
			c.tz = function(e, t) {
				e === void 0 && (e = a);
				var n, r = this.utcOffset(), o = this.toDate(), s = o.toLocaleString("en-US", { timeZone: e }), c = Math.round((o - new Date(s)) / 1e3 / 60), l = 15 * -Math.round(o.getTimezoneOffset() / 15) - c;
				if (!Number(l)) n = this.utcOffset(0, t);
				else if (n = i(s, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(l, !0), t) {
					var u = n.utcOffset();
					n = n.add(r - u, "minute");
				}
				return n.$x.$timezone = e, n;
			}, c.offsetName = function(e) {
				var t = this.$x.$timezone || i.tz.guess(), n = o(this.valueOf(), t, { timeZoneName: e }).find((function(e) {
					return e.type.toLowerCase() === "timezonename";
				}));
				return n && n.value;
			};
			var l = c.startOf;
			c.startOf = function(e, t) {
				if (!this.$x || !this.$x.$timezone) return l.call(this, e, t);
				var n = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
				return l.call(n, e, t).tz(this.$x.$timezone, !0);
			}, i.tz = function(e, t, n) {
				var r = n && t, o = n || t || a, c = s(+i(), o);
				if (typeof e != "string") return i(e).tz(o);
				var l = function(e, t, n) {
					var r = e - 60 * t * 1e3, i = s(r, n);
					if (t === i) return [r, t];
					var a = s(r -= 60 * (i - t) * 1e3, n);
					return i === a ? [r, i] : [e - 60 * Math.min(i, a) * 1e3, Math.max(i, a)];
				}(i.utc(e, r).valueOf(), c, o), u = l[0], d = l[1], f = i(u).utcOffset(d);
				return f.$x.$timezone = o, f;
			}, i.tz.guess = function() {
				return Intl.DateTimeFormat().resolvedOptions().timeZone;
			}, i.tz.setDefault = function(e) {
				a = e;
			};
		};
	}));
})), S = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_isBetween = r();
	})(n, (function() {
		return function(e, t, n) {
			t.prototype.isBetween = function(e, t, r, i) {
				var a = n(e), o = n(t), s = (i ||= "()")[0] === "(", c = i[1] === ")";
				return (s ? this.isAfter(a, r) : !this.isBefore(a, r)) && (c ? this.isBefore(o, r) : !this.isAfter(o, r)) || (s ? this.isBefore(a, r) : !this.isAfter(a, r)) && (c ? this.isAfter(o, r) : !this.isBefore(o, r));
			};
		};
	}));
})), C = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_localizedFormat = r();
	})(n, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		};
		return function(t, n, r) {
			var i = n.prototype, a = i.format;
			r.en.formats = e, i.format = function(t) {
				t === void 0 && (t = "YYYY-MM-DDTHH:mm:ssZ");
				var n = this.$locale().formats, r = function(t, n) {
					return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, r, i) {
						var a = i && i.toUpperCase();
						return r || n[i] || e[i] || n[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
							return t || n.slice(1);
						}));
					}));
				}(t, n === void 0 ? {} : n);
				return a.call(this, r);
			};
		};
	}));
})), w = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_duration = r();
	})(n, (function() {
		var e, t, n = 1e3, r = 6e4, i = 36e5, a = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, s = 31536e6, c = 2628e6, l = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, u = {
			years: s,
			months: c,
			days: a,
			hours: i,
			minutes: r,
			seconds: n,
			milliseconds: 1,
			weeks: 6048e5
		}, d = function(e) {
			return e instanceof v;
		}, f = function(e, t, n) {
			return new v(e, n, t.$l);
		}, p = function(e) {
			return t.p(e) + "s";
		}, m = function(e) {
			return e < 0;
		}, h = function(e) {
			return m(e) ? Math.ceil(e) : Math.floor(e);
		}, g = function(e) {
			return Math.abs(e);
		}, _ = function(e, t) {
			return e ? m(e) ? {
				negative: !0,
				format: "" + g(e) + t
			} : {
				negative: !1,
				format: "" + e + t
			} : {
				negative: !1,
				format: ""
			};
		}, v = function() {
			function m(e, t, n) {
				var r = this;
				if (this.$d = {}, this.$l = n, e === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), t) return f(e * u[p(t)], this);
				if (typeof e == "number") return this.$ms = e, this.parseFromMilliseconds(), this;
				if (typeof e == "object") return Object.keys(e).forEach((function(t) {
					r.$d[p(t)] = e[t];
				})), this.calMilliseconds(), this;
				if (typeof e == "string") {
					var i = e.match(l);
					if (i) {
						var a = i.slice(2).map((function(e) {
							return e == null ? 0 : Number(e);
						}));
						return this.$d.years = a[0], this.$d.months = a[1], this.$d.weeks = a[2], this.$d.days = a[3], this.$d.hours = a[4], this.$d.minutes = a[5], this.$d.seconds = a[6], this.calMilliseconds(), this;
					}
				}
				return this;
			}
			var g = m.prototype;
			return g.calMilliseconds = function() {
				var e = this;
				this.$ms = Object.keys(this.$d).reduce((function(t, n) {
					return t + (e.$d[n] || 0) * u[n];
				}), 0);
			}, g.parseFromMilliseconds = function() {
				var e = this.$ms;
				this.$d.years = h(e / s), e %= s, this.$d.months = h(e / c), e %= c, this.$d.days = h(e / a), e %= a, this.$d.hours = h(e / i), e %= i, this.$d.minutes = h(e / r), e %= r, this.$d.seconds = h(e / n), e %= n, this.$d.milliseconds = e;
			}, g.toISOString = function() {
				var e = _(this.$d.years, "Y"), t = _(this.$d.months, "M"), n = +this.$d.days || 0;
				this.$d.weeks && (n += 7 * this.$d.weeks);
				var r = _(n, "D"), i = _(this.$d.hours, "H"), a = _(this.$d.minutes, "M"), o = this.$d.seconds || 0;
				this.$d.milliseconds && (o += this.$d.milliseconds / 1e3, o = Math.round(1e3 * o) / 1e3);
				var s = _(o, "S"), c = e.negative || t.negative || r.negative || i.negative || a.negative || s.negative, l = i.format || a.format || s.format ? "T" : "", u = (c ? "-" : "") + "P" + e.format + t.format + r.format + l + i.format + a.format + s.format;
				return u === "P" || u === "-P" ? "P0D" : u;
			}, g.toJSON = function() {
				return this.toISOString();
			}, g.format = function(e) {
				var n = e || "YYYY-MM-DDTHH:mm:ss", r = {
					Y: this.$d.years,
					YY: t.s(this.$d.years, 2, "0"),
					YYYY: t.s(this.$d.years, 4, "0"),
					M: this.$d.months,
					MM: t.s(this.$d.months, 2, "0"),
					D: this.$d.days,
					DD: t.s(this.$d.days, 2, "0"),
					H: this.$d.hours,
					HH: t.s(this.$d.hours, 2, "0"),
					m: this.$d.minutes,
					mm: t.s(this.$d.minutes, 2, "0"),
					s: this.$d.seconds,
					ss: t.s(this.$d.seconds, 2, "0"),
					SSS: t.s(this.$d.milliseconds, 3, "0")
				};
				return n.replace(o, (function(e, t) {
					return t || String(r[e]);
				}));
			}, g.as = function(e) {
				return this.$ms / u[p(e)];
			}, g.get = function(e) {
				var t = this.$ms, n = p(e);
				return n === "milliseconds" ? t %= 1e3 : t = n === "weeks" ? h(t / u[n]) : this.$d[n], t || 0;
			}, g.add = function(e, t, n) {
				var r = t ? e * u[p(t)] : d(e) ? e.$ms : f(e, this).$ms;
				return f(this.$ms + r * (n ? -1 : 1), this);
			}, g.subtract = function(e, t) {
				return this.add(e, t, !0);
			}, g.locale = function(e) {
				var t = this.clone();
				return t.$l = e, t;
			}, g.clone = function() {
				return f(this.$ms, this);
			}, g.humanize = function(t) {
				return e().add(this.$ms, "ms").locale(this.$l).fromNow(!t);
			}, g.valueOf = function() {
				return this.asMilliseconds();
			}, g.milliseconds = function() {
				return this.get("milliseconds");
			}, g.asMilliseconds = function() {
				return this.as("milliseconds");
			}, g.seconds = function() {
				return this.get("seconds");
			}, g.asSeconds = function() {
				return this.as("seconds");
			}, g.minutes = function() {
				return this.get("minutes");
			}, g.asMinutes = function() {
				return this.as("minutes");
			}, g.hours = function() {
				return this.get("hours");
			}, g.asHours = function() {
				return this.as("hours");
			}, g.days = function() {
				return this.get("days");
			}, g.asDays = function() {
				return this.as("days");
			}, g.weeks = function() {
				return this.get("weeks");
			}, g.asWeeks = function() {
				return this.as("weeks");
			}, g.months = function() {
				return this.get("months");
			}, g.asMonths = function() {
				return this.as("months");
			}, g.years = function() {
				return this.get("years");
			}, g.asYears = function() {
				return this.as("years");
			}, m;
		}(), y = function(e, t, n) {
			return e.add(t.years() * n, "y").add(t.months() * n, "M").add(t.days() * n, "d").add(t.hours() * n, "h").add(t.minutes() * n, "m").add(t.seconds() * n, "s").add(t.milliseconds() * n, "ms");
		};
		return function(n, r, i) {
			e = i, t = i().$utils(), i.duration = function(e, t) {
				return f(e, { $l: i.locale() }, t);
			}, i.isDuration = d;
			var a = r.prototype.add, o = r.prototype.subtract;
			r.prototype.add = function(e, t) {
				return d(e) ? y(this, e, 1) : a.bind(this)(e, t);
			}, r.prototype.subtract = function(e, t) {
				return d(e) ? y(this, e, -1) : o.bind(this)(e, t);
			};
		};
	}));
})), ee = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_relativeTime = r();
	})(n, (function() {
		return function(e, t, n) {
			e ||= {};
			var r = t.prototype, i = {
				future: "in %s",
				past: "%s ago",
				s: "a few seconds",
				m: "a minute",
				mm: "%d minutes",
				h: "an hour",
				hh: "%d hours",
				d: "a day",
				dd: "%d days",
				M: "a month",
				MM: "%d months",
				y: "a year",
				yy: "%d years"
			};
			function a(e, t, n, i) {
				return r.fromToBase(e, t, n, i);
			}
			n.en.relativeTime = i, r.fromToBase = function(t, r, a, o, s) {
				for (var c, l, u, d = a.$locale().relativeTime || i, f = e.thresholds || [
					{
						l: "s",
						r: 44,
						d: "second"
					},
					{
						l: "m",
						r: 89
					},
					{
						l: "mm",
						r: 44,
						d: "minute"
					},
					{
						l: "h",
						r: 89
					},
					{
						l: "hh",
						r: 21,
						d: "hour"
					},
					{
						l: "d",
						r: 35
					},
					{
						l: "dd",
						r: 25,
						d: "day"
					},
					{
						l: "M",
						r: 45
					},
					{
						l: "MM",
						r: 10,
						d: "month"
					},
					{
						l: "y",
						r: 17
					},
					{
						l: "yy",
						d: "year"
					}
				], p = f.length, m = 0; m < p; m += 1) {
					var h = f[m];
					h.d && (c = o ? n(t).diff(a, h.d, !0) : a.diff(t, h.d, !0));
					var g = (e.rounding || Math.round)(Math.abs(c));
					if (u = c > 0, g <= h.r || !h.r) {
						g <= 1 && m > 0 && (h = f[m - 1]);
						var _ = d[h.l];
						s && (g = s("" + g)), l = typeof _ == "string" ? _.replace("%d", g) : _(g, r, h.l, u);
						break;
					}
				}
				if (r) return l;
				var v = u ? d.future : d.past;
				return typeof v == "function" ? v(l) : v.replace("%s", l);
			}, r.to = function(e, t) {
				return a(e, t, this, !0);
			}, r.from = function(e, t) {
				return a(e, t, this);
			};
			var o = function(e) {
				return e.$u ? n.utc() : n();
			};
			r.toNow = function(e) {
				return this.to(o(this), e);
			}, r.fromNow = function(e) {
				return this.from(o(this), e);
			};
		};
	}));
})), T = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_customParseFormat = r();
	})(n, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, a = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e) {
			return (e = +e) + (e > 68 ? 1900 : 2e3);
		}, c = function(e) {
			return function(t) {
				this[e] = +t;
			};
		}, l = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
			(this.zone ||= {}).offset = function(e) {
				if (!e || e === "Z") return 0;
				var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
				return n === 0 ? 0 : t[0] === "+" ? -n : n;
			}(e);
		}], u = function(e) {
			var t = o[e];
			return t && (t.indexOf ? t : t.s.concat(t.f));
		}, d = function(e, t) {
			var n, r = o.meridiem;
			if (r) {
				for (var i = 1; i <= 24; i += 1) if (e.indexOf(r(i, 0, t)) > -1) {
					n = i > 12;
					break;
				}
			} else n = e === (t ? "pm" : "PM");
			return n;
		}, f = {
			A: [a, function(e) {
				this.afternoon = d(e, !1);
			}],
			a: [a, function(e) {
				this.afternoon = d(e, !0);
			}],
			Q: [n, function(e) {
				this.month = 3 * (e - 1) + 1;
			}],
			S: [n, function(e) {
				this.milliseconds = 100 * e;
			}],
			SS: [r, function(e) {
				this.milliseconds = 10 * e;
			}],
			SSS: [/\d{3}/, function(e) {
				this.milliseconds = +e;
			}],
			s: [i, c("seconds")],
			ss: [i, c("seconds")],
			m: [i, c("minutes")],
			mm: [i, c("minutes")],
			H: [i, c("hours")],
			h: [i, c("hours")],
			HH: [i, c("hours")],
			hh: [i, c("hours")],
			D: [i, c("day")],
			DD: [r, c("day")],
			Do: [a, function(e) {
				var t = o.ordinal, n = e.match(/\d+/);
				if (this.day = n[0], t) for (var r = 1; r <= 31; r += 1) t(r).replace(/\[|\]/g, "") === e && (this.day = r);
			}],
			w: [i, c("week")],
			ww: [r, c("week")],
			M: [i, c("month")],
			MM: [r, c("month")],
			MMM: [a, function(e) {
				var t = u("months"), n = (u("monthsShort") || t.map((function(e) {
					return e.slice(0, 3);
				}))).indexOf(e) + 1;
				if (n < 1) throw Error();
				this.month = n % 12 || n;
			}],
			MMMM: [a, function(e) {
				var t = u("months").indexOf(e) + 1;
				if (t < 1) throw Error();
				this.month = t % 12 || t;
			}],
			Y: [/[+-]?\d+/, c("year")],
			YY: [r, function(e) {
				this.year = s(e);
			}],
			YYYY: [/\d{4}/, c("year")],
			Z: l,
			ZZ: l
		};
		function p(n) {
			for (var r = n, i = o && o.formats, a = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
				var a = r && r.toUpperCase();
				return n || i[r] || e[r] || i[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
					return t || n.slice(1);
				}));
			}))).match(t), s = a.length, c = 0; c < s; c += 1) {
				var l = a[c], u = f[l], d = u && u[0], p = u && u[1];
				a[c] = p ? {
					regex: d,
					parser: p
				} : l.replace(/^\[|\]$/g, "");
			}
			return function(e) {
				for (var t = {}, n = 0, r = 0; n < s; n += 1) {
					var i = a[n];
					if (typeof i == "string") r += i.length;
					else {
						var o = i.regex, c = i.parser, l = e.slice(r), u = o.exec(l)[0];
						c.call(t, u), e = e.replace(u, "");
					}
				}
				return function(e) {
					var t = e.afternoon;
					if (t !== void 0) {
						var n = e.hours;
						t ? n < 12 && (e.hours += 12) : n === 12 && (e.hours = 0), delete e.afternoon;
					}
				}(t), t;
			};
		}
		return function(e, t, n) {
			n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (s = e.parseTwoDigitYear);
			var r = t.prototype, i = r.parse;
			r.parse = function(e) {
				var t = e.date, r = e.utc, a = e.args;
				this.$u = r;
				var s = a[1];
				if (typeof s == "string") {
					var c = !0 === a[2], l = !0 === a[3], u = c || l, d = a[2];
					l && (d = a[2]), o = this.$locale(), !c && d && (o = n.Ls[d]), this.$d = function(e, t, n, r) {
						try {
							if (["x", "X"].indexOf(t) > -1) return /* @__PURE__ */ new Date((t === "X" ? 1e3 : 1) * e);
							var i = p(t)(e), a = i.year, o = i.month, s = i.day, c = i.hours, l = i.minutes, u = i.seconds, d = i.milliseconds, f = i.zone, m = i.week, h = /* @__PURE__ */ new Date(), g = s || (a || o ? 1 : h.getDate()), _ = a || h.getFullYear(), v = 0;
							a && !o || (v = o > 0 ? o - 1 : h.getMonth());
							var y, b = c || 0, x = l || 0, S = u || 0, C = d || 0;
							return f ? new Date(Date.UTC(_, v, g, b, x, S, C + 60 * f.offset * 1e3)) : n ? new Date(Date.UTC(_, v, g, b, x, S, C)) : (y = new Date(_, v, g, b, x, S, C), m && (y = r(y).week(m).toDate()), y);
						} catch {
							return /* @__PURE__ */ new Date("");
						}
					}(t, s, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(s) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
				} else if (s instanceof Array) for (var f = s.length, m = 1; m <= f; m += 1) {
					a[1] = s[m - 1];
					var h = n.apply(this, a);
					if (h.isValid()) {
						this.$d = h.$d, this.$L = h.$L, this.init();
						break;
					}
					m === f && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i.call(this, e);
			};
		};
	}));
})), E = /* @__PURE__ */ l(b(), 1), te = /* @__PURE__ */ l(x(), 1), ne = /* @__PURE__ */ l(S(), 1), D = /* @__PURE__ */ l(C(), 1), O = /* @__PURE__ */ l(w(), 1), k = /* @__PURE__ */ l(ee(), 1), A = /* @__PURE__ */ l(T(), 1), j = (e) => {
	let t;
	try {
		t = Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
			year: "2-digit",
			era: "long"
		}).format(e).slice(0, 4).replace(/年$/, "");
	} catch {
		t = "該当なし";
	}
	return t;
}, re = (e) => {
	let t;
	try {
		t = Intl.DateTimeFormat("ja-JP-u-ca-japanese", { era: "long" }).format(e).slice(0, 2);
	} catch {
		t = "不明";
	}
	return t;
};
e.extend(E.default), e.extend(A.default), e.extend(te.default), e.extend(ne.default), e.extend(D.default), e.extend(O.default), e.extend(k.default), e.locale("ja"), e.extend((e, t) => {
	let n = t.prototype, r = n.format;
	n.format = function(e) {
		if (!e) return r.call(this, e);
		let t = e.replace(/\[([^\]]+)]|r+/g, (e) => {
			switch (e) {
				case "rrrr": return j(this.toDate());
				case "rr": return re(this.toDate());
				default: return e;
			}
		});
		return r.call(this, t);
	};
});
var M = e, ie = (e) => e ? M(e).format("YYYY-MM-DDTHH:mm") : "", ae = (e) => {
	if (!e) return null;
	let t = M(e);
	return t.isValid() ? t.toDate() : null;
}, N = () => M, P = 300, F = 30, I = 20, L = 3, R = 2e3, z = (e) => e.length > P ? `${e.slice(0, P)}...` : e, B = (e, t = 0) => {
	if (t > L) return "[truncated]";
	if (typeof e == "string") return z(e);
	if (typeof e == "number" || typeof e == "boolean" || e == null) return e;
	if (e instanceof Date) return e.toISOString();
	if (Array.isArray(e)) return e.slice(0, I).map((e) => B(e, t + 1));
	if (typeof e == "object") {
		let n = Object.entries(e).slice(0, F);
		return Object.fromEntries(n.map(([e, n]) => [e, B(n, t + 1)]));
	}
	return String(e);
}, V = (e) => {
	if (!e) return;
	let t = B(e, 0), n = JSON.stringify(t);
	return n.length <= R ? t : {
		_truncated: !0,
		_size: n.length
	};
}, H = (e) => {
	if (!e) return;
	let t = Object.entries(e).map(([e, t]) => [e, B(t, 0) ?? {}]);
	return Object.fromEntries(t);
}, U = async (e) => {
	if (typeof window < "u") try {
		let { message: t, reason: n, level: r = "info", category: i = "app", data: a, extra: o, tags: s, user: c, contexts: l, scope: u } = e, { addBreadcrumb: d, captureMessage: f, withScope: p } = await Function("modulePath", "return import(modulePath);")("@sentry/browser"), m = V({
			...n ? { reason: n } : {},
			...a ?? {}
		}), h = V({
			...n ? { reason: n } : {},
			...o ?? {}
		}), g = H(l);
		d({
			category: i,
			level: r,
			message: t,
			data: m && Object.keys(m).length ? m : void 0
		}), p((e) => {
			if (c && e.setUser(c), s) for (let [t, n] of Object.entries(s)) e.setTag(t, n);
			if (g) for (let [t, n] of Object.entries(g)) e.setContext(t, n);
			u && u(e), f(t, {
				level: r,
				extra: h && Object.keys(h).length ? h : void 0
			});
		});
	} catch {}
}, W = (e) => {
	if (e == null) return "";
	let t = e.toString().split(".");
	return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), t.join(".");
}, G = /* @__PURE__ */ l((/* @__PURE__ */ s(((e, t) => {
	var n = (function() {
		function e(e, t) {
			return t != null && e instanceof t;
		}
		var t;
		try {
			t = Map;
		} catch {
			t = function() {};
		}
		var n;
		try {
			n = Set;
		} catch {
			n = function() {};
		}
		var r;
		try {
			r = Promise;
		} catch {
			r = function() {};
		}
		function i(a, o, s, c, u) {
			typeof o == "object" && (s = o.depth, c = o.prototype, u = o.includeNonEnumerable, o = o.circular);
			var d = [], f = [], p = typeof Buffer < "u";
			o === void 0 && (o = !0), s === void 0 && (s = Infinity);
			function m(a, s) {
				if (a === null) return null;
				if (s === 0) return a;
				var h, g;
				if (typeof a != "object") return a;
				if (e(a, t)) h = new t();
				else if (e(a, n)) h = new n();
				else if (e(a, r)) h = new r(function(e, t) {
					a.then(function(t) {
						e(m(t, s - 1));
					}, function(e) {
						t(m(e, s - 1));
					});
				});
				else if (i.__isArray(a)) h = [];
				else if (i.__isRegExp(a)) h = new RegExp(a.source, l(a)), a.lastIndex && (h.lastIndex = a.lastIndex);
				else if (i.__isDate(a)) h = new Date(a.getTime());
				else if (p && Buffer.isBuffer(a)) return h = Buffer.allocUnsafe ? Buffer.allocUnsafe(a.length) : new Buffer(a.length), a.copy(h), h;
				else e(a, Error) ? h = Object.create(a) : c === void 0 ? (g = Object.getPrototypeOf(a), h = Object.create(g)) : (h = Object.create(c), g = c);
				if (o) {
					var _ = d.indexOf(a);
					if (_ != -1) return f[_];
					d.push(a), f.push(h);
				}
				for (var v in e(a, t) && a.forEach(function(e, t) {
					var n = m(t, s - 1), r = m(e, s - 1);
					h.set(n, r);
				}), e(a, n) && a.forEach(function(e) {
					var t = m(e, s - 1);
					h.add(t);
				}), a) {
					var y;
					g && (y = Object.getOwnPropertyDescriptor(g, v)), y && y.set == null || (h[v] = m(a[v], s - 1));
				}
				if (Object.getOwnPropertySymbols) for (var b = Object.getOwnPropertySymbols(a), v = 0; v < b.length; v++) {
					var x = b[v], S = Object.getOwnPropertyDescriptor(a, x);
					(!S || S.enumerable || u) && (h[x] = m(a[x], s - 1), S.enumerable || Object.defineProperty(h, x, { enumerable: !1 }));
				}
				if (u) for (var C = Object.getOwnPropertyNames(a), v = 0; v < C.length; v++) {
					var w = C[v], S = Object.getOwnPropertyDescriptor(a, w);
					S && S.enumerable || (h[w] = m(a[w], s - 1), Object.defineProperty(h, w, { enumerable: !1 }));
				}
				return h;
			}
			return m(a, s);
		}
		i.clonePrototype = function(e) {
			if (e === null) return null;
			var t = function() {};
			return t.prototype = e, new t();
		};
		function a(e) {
			return Object.prototype.toString.call(e);
		}
		i.__objToStr = a;
		function o(e) {
			return typeof e == "object" && a(e) === "[object Date]";
		}
		i.__isDate = o;
		function s(e) {
			return typeof e == "object" && a(e) === "[object Array]";
		}
		i.__isArray = s;
		function c(e) {
			return typeof e == "object" && a(e) === "[object RegExp]";
		}
		i.__isRegExp = c;
		function l(e) {
			var t = "";
			return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), t;
		}
		return i.__getRegExpFlags = l, i;
	})();
	typeof t == "object" && t.exports && (t.exports = n);
})))(), 1), K = (e) => e.replace(/([A-Z])/g, (e) => `_${e.charAt(0).toLowerCase()}`), q = (e) => e.replace(/_./g, (e) => e.charAt(1).toUpperCase()), oe = (e) => {
	let t = q(e);
	return t.substring(0, 1).toUpperCase() + t.substring(1);
}, J = (e) => e.substring(0, 1).toLowerCase() + e.substring(1), se = (e) => e.substring(0, 1).toUpperCase() + e.substring(1), ce = (e) => e || "", le = (e) => e == null || String(e).trim() === "", ue = (e, t, n) => e.slice(0, t) + n + e.slice(t), de = (e) => e.replace(/[ａ-ｚＡ-Ｚ０-９]/g, (e) => String.fromCharCode(e.charCodeAt(0) - 65248)).replace(/[-ー―−‐―]/g, ""), Y = (e) => {
	let t = typeof e;
	if (e === null || t !== "object" && t !== "function") return console.log("object is not object", e, t), e;
	if (Object.freeze(e), t === "function") return e;
	for (let t in e) {
		let n = e[t];
		Object.prototype.hasOwnProperty.call(e, t) && typeof n == "object" && !Object.isFrozen(n) && Y(n);
	}
	return e;
}, X = (e) => typeof e == "object" && !!e && e.constructor === Object && Object.prototype.toString.call(e) === "[object Object]", Z = (e, t) => {
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) {
		let i = e[r];
		Object.prototype.hasOwnProperty.call(e, r) && (n[t(r)] = i === null ? null : Z(i, t));
	}
	return n;
}, fe = (e) => Z(e, q), pe = (e) => Z(e, J), me = (e) => {
	let t = (0, G.default)(e);
	for (let e of Object.keys(t)) t[e] && t[e] !== 0 || (t[e] = void 0);
	return t;
}, Q = (e, t, n = !1, r = !1) => {
	if (!X(e)) return e;
	let i;
	i = t && t.length > 0 ? (e) => t.includes(e) : (e) => !0;
	let a = {};
	for (let t of Object.keys(e).filter(i)) {
		let i = n ? K(t) : r ? q(t) : t;
		a[i] = Q(e[t], void 0, n, r);
	}
	return a;
}, he = (e, t, n) => {
	let r = !t || t.length === 0 ? Object.keys(e) : t, i = {};
	for (let t of Object.keys(e).filter((e) => r?.includes(e))) {
		let r = n ? n(t) : t;
		i[r] = e[t];
	}
	return i;
}, ge = (e, t) => {
	let n = {};
	for (let r of Object.keys(e).filter((n) => t(e[n]))) n[r] = e[r];
	return n;
}, $ = (e, t, n) => {
	if (e.indexOf(".") === 0) n[t[e]] = t;
	else {
		let r = t;
		for (let t of e.split(".")) {
			if (r == null) break;
			r = r[t];
		}
		if (r == null) throw Error("keyName is not found in object");
		n[r] = t;
	}
}, _e = (e, t = "id") => {
	let n = {};
	if (!e) return n;
	if (Array.isArray(e)) {
		for (let r of e) $(t, r, n);
		return n;
	}
	for (let r of Object.keys(e)) {
		let i = e[r];
		$(t, i, n);
	}
	return n;
}, ve = (e) => pe(e), ye = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r != null) {
		if (Array.isArray(r)) for (let e of r) e != null && t.append(n, String(e));
		else t.set(n, String(r));
	}
	return t.toString();
}, be = (e) => e != null && {}.toString.call(e) === "[object Function]";
export { N as $getDayjs, ve as __test__replaceHeadLower, ce as cNull, K as camelToSnake, de as cardConv, M as dayjsJp, Y as deepFreeze, v as ensureFreshAccessTokenByState, y as fetchWithAuthByState, ie as formatDateForInput, J as headLower, se as headUpper, le as isBlank, be as isFunction, X as isPlainObject, U as logSentryMessageWithBreadcrumb, W as numberWithCommas, d as obj2Array, me as objectConvUndefined, Q as objectFilter, ge as objectFilterFunc, he as objectFilterKey, _e as objectifyByKeyParam, ae as parseInputDate, h as parseTokenExpiryEpochMs, u as range, Z as replaceKeys, fe as replaceSnakeToCamel, g as shouldRefreshAccessTokenByExpiryMs, f as sleep, q as snakeToCamel, oe as snakeToCamelHeadUpper, ue as strIns, ye as toQueryString, m as withInflight };
