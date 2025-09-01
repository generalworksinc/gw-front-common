import dayjs from "dayjs";
const range = (from, to) => {
  let ind = 0;
  const ret = [];
  while (ind <= to - from) {
    ret.push(from + ind);
    ind += 1;
  }
  return ret;
};
const obj2Array = (obj) => {
  const retArray = [];
  if (!obj) {
    return retArray;
  } else {
    for (const key of Object.keys(obj)) {
      retArray.push(obj[key]);
    }
    return retArray;
  }
};
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var timezone$2 = { exports: {} };
var timezone$1 = timezone$2.exports;
var hasRequiredTimezone;
function requireTimezone() {
  if (hasRequiredTimezone) return timezone$2.exports;
  hasRequiredTimezone = 1;
  (function(module, exports) {
    !(function(t, e) {
      module.exports = e();
    })(timezone$1, (function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e = {};
      return function(n, i, o) {
        var r, a = function(t2, n2, i2) {
          void 0 === i2 && (i2 = {});
          var o2 = new Date(t2), r2 = (function(t3, n3) {
            void 0 === n3 && (n3 = {});
            var i3 = n3.timeZoneName || "short", o3 = t3 + "|" + i3, r3 = e[o3];
            return r3 || (r3 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t3, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: i3 }), e[o3] = r3), r3;
          })(n2, i2);
          return r2.formatToParts(o2);
        }, u = function(e2, n2) {
          for (var i2 = a(e2, n2), r2 = [], u2 = 0; u2 < i2.length; u2 += 1) {
            var f2 = i2[u2], s2 = f2.type, m = f2.value, c = t[s2];
            c >= 0 && (r2[c] = parseInt(m, 10));
          }
          var d = r2[3], l = 24 === d ? 0 : d, h = r2[0] + "-" + r2[1] + "-" + r2[2] + " " + l + ":" + r2[4] + ":" + r2[5] + ":000", v = +e2;
          return (o.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
        }, f = i.prototype;
        f.tz = function(t2, e2) {
          void 0 === t2 && (t2 = r);
          var n2, i2 = this.utcOffset(), a2 = this.toDate(), u2 = a2.toLocaleString("en-US", { timeZone: t2 }), f2 = Math.round((a2 - new Date(u2)) / 1e3 / 60), s2 = 15 * -Math.round(a2.getTimezoneOffset() / 15) - f2;
          if (!Number(s2)) n2 = this.utcOffset(0, e2);
          else if (n2 = o(u2, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(s2, true), e2) {
            var m = n2.utcOffset();
            n2 = n2.add(i2 - m, "minute");
          }
          return n2.$x.$timezone = t2, n2;
        }, f.offsetName = function(t2) {
          var e2 = this.$x.$timezone || o.tz.guess(), n2 = a(this.valueOf(), e2, { timeZoneName: t2 }).find((function(t3) {
            return "timezonename" === t3.type.toLowerCase();
          }));
          return n2 && n2.value;
        };
        var s = f.startOf;
        f.startOf = function(t2, e2) {
          if (!this.$x || !this.$x.$timezone) return s.call(this, t2, e2);
          var n2 = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return s.call(n2, t2, e2).tz(this.$x.$timezone, true);
        }, o.tz = function(t2, e2, n2) {
          var i2 = n2 && e2, a2 = n2 || e2 || r, f2 = u(+o(), a2);
          if ("string" != typeof t2) return o(t2).tz(a2);
          var s2 = (function(t3, e3, n3) {
            var i3 = t3 - 60 * e3 * 1e3, o2 = u(i3, n3);
            if (e3 === o2) return [i3, e3];
            var r2 = u(i3 -= 60 * (o2 - e3) * 1e3, n3);
            return o2 === r2 ? [i3, o2] : [t3 - 60 * Math.min(o2, r2) * 1e3, Math.max(o2, r2)];
          })(o.utc(t2, i2).valueOf(), f2, a2), m = s2[0], c = s2[1], d = o(m).utcOffset(c);
          return d.$x.$timezone = a2, d;
        }, o.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, o.tz.setDefault = function(t2) {
          r = t2;
        };
      };
    }));
  })(timezone$2);
  return timezone$2.exports;
}
var timezoneExports = requireTimezone();
const timezone = /* @__PURE__ */ getDefaultExportFromCjs(timezoneExports);
var utc$2 = { exports: {} };
var utc$1 = utc$2.exports;
var hasRequiredUtc;
function requireUtc() {
  if (hasRequiredUtc) return utc$2.exports;
  hasRequiredUtc = 1;
  (function(module, exports) {
    !(function(t, i) {
      module.exports = i();
    })(utc$1, (function() {
      var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f, n) {
        var u = f.prototype;
        n.utc = function(t2) {
          var i2 = { date: t2, utc: true, args: arguments };
          return new f(i2);
        }, u.utc = function(i2) {
          var e2 = n(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e2.add(this.utcOffset(), t) : e2;
        }, u.local = function() {
          return n(this.toDate(), { locale: this.$L, utc: false });
        };
        var r = u.parse;
        u.parse = function(t2) {
          t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), r.call(this, t2);
        };
        var o = u.init;
        u.init = function() {
          if (this.$u) {
            var t2 = this.$d;
            this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
          } else o.call(this);
        };
        var a = u.utcOffset;
        u.utcOffset = function(s2, f2) {
          var n2 = this.$utils().u;
          if (n2(s2)) return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = (function(t2) {
            void 0 === t2 && (t2 = "");
            var s3 = t2.match(i);
            if (!s3) return null;
            var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
            return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
          })(s2), null === s2)) return this;
          var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2;
          if (0 === u2) return this.utc(f2);
          var r2 = this.clone();
          if (f2) return r2.$offset = u2, r2.$u = false, r2;
          var o2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          return (r2 = this.local().add(u2 + o2, t)).$offset = u2, r2.$x.$localOffset = o2, r2;
        };
        var h = u.format;
        u.format = function(t2) {
          var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u.valueOf = function() {
          var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t2;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u.toDate;
        u.toDate = function(t2) {
          return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c = u.diff;
        u.diff = function(t2, i2, e2) {
          if (t2 && this.$u === t2.$u) return c.call(this, t2, i2, e2);
          var s2 = this.local(), f2 = n(t2).local();
          return c.call(s2, f2, i2, e2);
        };
      };
    }));
  })(utc$2);
  return utc$2.exports;
}
var utcExports = requireUtc();
const utc = /* @__PURE__ */ getDefaultExportFromCjs(utcExports);
var ja$1 = { exports: {} };
var ja = ja$1.exports;
var hasRequiredJa;
function requireJa() {
  if (hasRequiredJa) return ja$1.exports;
  hasRequiredJa = 1;
  (function(module, exports) {
    !(function(e, _) {
      module.exports = _(dayjs);
    })(ja, (function(e) {
      function _(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var t = _(e), d = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e2) {
        return e2 + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(e2) {
        return e2 < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return t.default.locale(d, null, true), d;
    }));
  })(ja$1);
  return ja$1.exports;
}
requireJa();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
const dayjsJp = dayjs;
const formatDateForInput = (date) => {
  if (!date) return "";
  const d = typeof date === "string" ? dayjsJp(date) : dayjsJp(date);
  return d.format("YYYY-MM-DDTHH:mm");
};
const parseInputDate = (dateString) => {
  if (!dateString) return null;
  const d = dayjsJp(dateString);
  return d.isValid() ? d.toDate() : null;
};
const $getDayjs = () => dayjsJp;
const numberWithCommas = (num) => {
  if (num == null) return "";
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
var clone$1 = { exports: {} };
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone$1.exports;
  hasRequiredClone = 1;
  (function(module) {
    var clone2 = (function() {
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone3(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone3.__isArray(parent2)) {
            child = [];
          } else if (clone3.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex) child.lastIndex = parent2.lastIndex;
          } else if (clone3.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone3.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone3.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone3.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone3.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone3.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
      }
      clone3.__getRegExpFlags = __getRegExpFlags;
      return clone3;
    })();
    if (module.exports) {
      module.exports = clone2;
    }
  })(clone$1);
  return clone$1.exports;
}
var cloneExports = requireClone();
const clone = /* @__PURE__ */ getDefaultExportFromCjs(cloneExports);
const camelToSnake = (p) => p.replace(/([A-Z])/g, (s) => `_${s.charAt(0).toLowerCase()}`);
const snakeToCamel = (p) => p.replace(/_./g, (s) => s.charAt(1).toUpperCase());
const snakeToCamelHeadUpper = (p) => {
  const camel = snakeToCamel(p);
  return camel.substring(0, 1).toUpperCase() + camel.substring(1);
};
const headLower = (p) => {
  return p.substring(0, 1).toLowerCase() + p.substring(1);
};
const headUpper = (p) => {
  return p.substring(0, 1).toUpperCase() + p.substring(1);
};
const cNull = (str) => str || "";
const isBlank = (str) => str === void 0 || str === null || String(str).trim() === "";
const strIns = (str, idx, val) => str.slice(0, idx) + val + str.slice(idx);
const cardConv = (str) => {
  return str.replace(
    /[ａ-ｚＡ-Ｚ０-９]/g,
    (s) => String.fromCharCode(s.charCodeAt(0) - 65248)
  ).replace(/[-ー―−‐―]/g, "");
};
const deepFreeze = (object) => {
  const typeOfObject = typeof object;
  if (object === null || typeOfObject !== "object" && typeOfObject !== "function") {
    console.log("object is not object", object, typeOfObject);
    return object;
  }
  Object.freeze(object);
  if (typeOfObject === "function") {
    return object;
  }
  for (const key in object) {
    const value = object[key];
    if (!Object.prototype.hasOwnProperty.call(object, key) || typeof value !== "object" || Object.isFrozen(value)) {
      continue;
    }
    deepFreeze(value);
  }
  return object;
};
const isPlainObject = (obj) => {
  return typeof obj === "object" && obj !== null && obj.constructor === Object && Object.prototype.toString.call(obj) === "[object Object]";
};
const replaceKeys = (object, func) => {
  if (object === null || typeof object !== "object") {
    return object;
  }
  const replacedObj = {};
  for (const key in object) {
    const value = object[key];
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }
    replacedObj[func(key)] = value !== null ? replaceKeys(value, func) : null;
  }
  return replacedObj;
};
const replaceSnakeToCamel = (object) => {
  return replaceKeys(object, snakeToCamel);
};
const replaceHeadLower = (object) => {
  return replaceKeys(object, headLower);
};
const objectConvUndefined = (obj) => {
  const o = clone(obj);
  for (const key of Object.keys(o)) {
    if (!o[key] || o[key] === 0) {
      o[key] = void 0;
    }
  }
  return o;
};
const objectFilter = (obj, params, convSnakeCase = false, convCamelCase = false) => {
  if (!isPlainObject(obj)) {
    return obj;
  }
  let filterFunc;
  if (params && params.length > 0) {
    filterFunc = (key) => params.includes(key);
  } else {
    filterFunc = (_key) => true;
  }
  const out = {};
  for (const key of Object.keys(obj).filter(filterFunc)) {
    const outKey = convSnakeCase ? camelToSnake(key) : convCamelCase ? snakeToCamel(key) : key;
    out[outKey] = objectFilter(
      obj[key],
      void 0,
      convSnakeCase,
      convCamelCase
    );
  }
  return out;
};
const objectFilterKey = (obj, params, keyFunc) => {
  const targetParams = !params || params.length === 0 ? Object.keys(obj) : params;
  const out = {};
  for (const key of Object.keys(obj).filter((k) => targetParams?.includes(k))) {
    const outKey = keyFunc ? keyFunc(key) : key;
    out[outKey] = obj[key];
  }
  return out;
};
const objectFilterFunc = (obj, func) => {
  const out = {};
  for (const key of Object.keys(obj).filter((k) => func(obj[k]))) {
    out[key] = obj[key];
  }
  return out;
};
const makeNewObject = (keyName, value, retObj) => {
  if (keyName.indexOf(".") === 0) {
    retObj[value[keyName]] = value;
  } else {
    let targetKeyValue = value;
    for (const key of keyName.split(".")) {
      if (targetKeyValue == null) {
        break;
      }
      targetKeyValue = targetKeyValue[key];
    }
    if (targetKeyValue == null) {
      throw new Error("keyName is not found in object");
    }
    retObj[targetKeyValue] = value;
  }
};
const objectifyByKeyParam = (fromObject, keyName = "id") => {
  const retObj = {};
  if (!fromObject) {
    return retObj;
  } else if (Array.isArray(fromObject)) {
    for (const value of fromObject) {
      makeNewObject(keyName, value, retObj);
    }
    return retObj;
  } else {
    for (const key of Object.keys(fromObject)) {
      const value = fromObject[key];
      makeNewObject(keyName, value, retObj);
    }
    return retObj;
  }
};
const __test__replaceHeadLower = (object) => replaceHeadLower(object);
const isFunction = (functionToCheck) => {
  if (functionToCheck === null || functionToCheck === void 0) {
    return false;
  }
  return {}.toString.call(functionToCheck) === "[object Function]";
};
export {
  $getDayjs,
  __test__replaceHeadLower,
  cNull,
  camelToSnake,
  cardConv,
  dayjsJp,
  deepFreeze,
  formatDateForInput,
  headLower,
  headUpper,
  isBlank,
  isFunction,
  isPlainObject,
  numberWithCommas,
  obj2Array,
  objectConvUndefined,
  objectFilter,
  objectFilterFunc,
  objectFilterKey,
  objectifyByKeyParam,
  parseInputDate,
  range,
  replaceKeys,
  replaceSnakeToCamel,
  sleep,
  snakeToCamel,
  snakeToCamelHeadUpper,
  strIns
};
