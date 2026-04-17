function O0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nf = { exports: {} }, ol = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oy;
function OS() {
  if (oy) return ol;
  oy = 1;
  var e = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function r(l, s, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), s.key !== void 0 && (f = "" + s.key), "key" in s) {
      u = {};
      for (var d in s)
        d !== "key" && (u[d] = s[d]);
    } else u = s;
    return s = u.ref, {
      $$typeof: e,
      type: l,
      key: f,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return ol.Fragment = i, ol.jsx = r, ol.jsxs = r, ol;
}
var sy;
function _S() {
  return sy || (sy = 1, nf.exports = OS()), nf.exports;
}
var St = _S(), af = { exports: {} }, wt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uy;
function NS() {
  if (uy) return wt;
  uy = 1;
  var e = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(k) {
    return k === null || typeof k != "object" ? null : (k = b && k[b] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var A = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, z = Object.assign, D = {};
  function M(k, q, T) {
    this.props = k, this.context = q, this.refs = D, this.updater = T || A;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(k, q) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, q, "setState");
  }, M.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function H() {
  }
  H.prototype = M.prototype;
  function _(k, q, T) {
    this.props = k, this.context = q, this.refs = D, this.updater = T || A;
  }
  var F = _.prototype = new H();
  F.constructor = _, z(F, M.prototype), F.isPureReactComponent = !0;
  var K = Array.isArray;
  function B() {
  }
  var I = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function J(k, q, T) {
    var at = T.ref;
    return {
      $$typeof: e,
      type: k,
      key: q,
      ref: at !== void 0 ? at : null,
      props: T
    };
  }
  function et(k, q) {
    return J(k.type, q, k.props);
  }
  function W(k) {
    return typeof k == "object" && k !== null && k.$$typeof === e;
  }
  function $(k) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(T) {
      return q[T];
    });
  }
  var vt = /\/+/g;
  function lt(k, q) {
    return typeof k == "object" && k !== null && k.key != null ? $("" + k.key) : q.toString(36);
  }
  function Z(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(B, B) : (k.status = "pending", k.then(
          function(q) {
            k.status === "pending" && (k.status = "fulfilled", k.value = q);
          },
          function(q) {
            k.status === "pending" && (k.status = "rejected", k.reason = q);
          }
        )), k.status) {
          case "fulfilled":
            return k.value;
          case "rejected":
            throw k.reason;
        }
    }
    throw k;
  }
  function O(k, q, T, at, st) {
    var ot = typeof k;
    (ot === "undefined" || ot === "boolean") && (k = null);
    var Et = !1;
    if (k === null) Et = !0;
    else
      switch (ot) {
        case "bigint":
        case "string":
        case "number":
          Et = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case e:
            case i:
              Et = !0;
              break;
            case g:
              return Et = k._init, O(
                Et(k._payload),
                q,
                T,
                at,
                st
              );
          }
      }
    if (Et)
      return st = st(k), Et = at === "" ? "." + lt(k, 0) : at, K(st) ? (T = "", Et != null && (T = Et.replace(vt, "$&/") + "/"), O(st, q, T, "", function(ke) {
        return ke;
      })) : st != null && (W(st) && (st = et(
        st,
        T + (st.key == null || k && k.key === st.key ? "" : ("" + st.key).replace(
          vt,
          "$&/"
        ) + "/") + Et
      )), q.push(st)), 1;
    Et = 0;
    var Xt = at === "" ? "." : at + ":";
    if (K(k))
      for (var bt = 0; bt < k.length; bt++)
        at = k[bt], ot = Xt + lt(at, bt), Et += O(
          at,
          q,
          T,
          ot,
          st
        );
    else if (bt = x(k), typeof bt == "function")
      for (k = bt.call(k), bt = 0; !(at = k.next()).done; )
        at = at.value, ot = Xt + lt(at, bt++), Et += O(
          at,
          q,
          T,
          ot,
          st
        );
    else if (ot === "object") {
      if (typeof k.then == "function")
        return O(
          Z(k),
          q,
          T,
          at,
          st
        );
      throw q = String(k), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Et;
  }
  function Q(k, q, T) {
    if (k == null) return k;
    var at = [], st = 0;
    return O(k, at, "", "", function(ot) {
      return q.call(T, ot, st++);
    }), at;
  }
  function nt(k) {
    if (k._status === -1) {
      var q = k._result;
      q = q(), q.then(
        function(T) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = T);
        },
        function(T) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = T);
        }
      ), k._status === -1 && (k._status = 0, k._result = q);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var pt = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, S = {
    map: Q,
    forEach: function(k, q, T) {
      Q(
        k,
        function() {
          q.apply(this, arguments);
        },
        T
      );
    },
    count: function(k) {
      var q = 0;
      return Q(k, function() {
        q++;
      }), q;
    },
    toArray: function(k) {
      return Q(k, function(q) {
        return q;
      }) || [];
    },
    only: function(k) {
      if (!W(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return wt.Activity = y, wt.Children = S, wt.Component = M, wt.Fragment = r, wt.Profiler = s, wt.PureComponent = _, wt.StrictMode = l, wt.Suspense = m, wt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I, wt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return I.H.useMemoCache(k);
    }
  }, wt.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, wt.cacheSignal = function() {
    return null;
  }, wt.cloneElement = function(k, q, T) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var at = z({}, k.props), st = k.key;
    if (q != null)
      for (ot in q.key !== void 0 && (st = "" + q.key), q)
        !j.call(q, ot) || ot === "key" || ot === "__self" || ot === "__source" || ot === "ref" && q.ref === void 0 || (at[ot] = q[ot]);
    var ot = arguments.length - 2;
    if (ot === 1) at.children = T;
    else if (1 < ot) {
      for (var Et = Array(ot), Xt = 0; Xt < ot; Xt++)
        Et[Xt] = arguments[Xt + 2];
      at.children = Et;
    }
    return J(k.type, st, at);
  }, wt.createContext = function(k) {
    return k = {
      $$typeof: f,
      _currentValue: k,
      _currentValue2: k,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, k.Provider = k, k.Consumer = {
      $$typeof: u,
      _context: k
    }, k;
  }, wt.createElement = function(k, q, T) {
    var at, st = {}, ot = null;
    if (q != null)
      for (at in q.key !== void 0 && (ot = "" + q.key), q)
        j.call(q, at) && at !== "key" && at !== "__self" && at !== "__source" && (st[at] = q[at]);
    var Et = arguments.length - 2;
    if (Et === 1) st.children = T;
    else if (1 < Et) {
      for (var Xt = Array(Et), bt = 0; bt < Et; bt++)
        Xt[bt] = arguments[bt + 2];
      st.children = Xt;
    }
    if (k && k.defaultProps)
      for (at in Et = k.defaultProps, Et)
        st[at] === void 0 && (st[at] = Et[at]);
    return J(k, ot, st);
  }, wt.createRef = function() {
    return { current: null };
  }, wt.forwardRef = function(k) {
    return { $$typeof: d, render: k };
  }, wt.isValidElement = W, wt.lazy = function(k) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: k },
      _init: nt
    };
  }, wt.memo = function(k, q) {
    return {
      $$typeof: p,
      type: k,
      compare: q === void 0 ? null : q
    };
  }, wt.startTransition = function(k) {
    var q = I.T, T = {};
    I.T = T;
    try {
      var at = k(), st = I.S;
      st !== null && st(T, at), typeof at == "object" && at !== null && typeof at.then == "function" && at.then(B, pt);
    } catch (ot) {
      pt(ot);
    } finally {
      q !== null && T.types !== null && (q.types = T.types), I.T = q;
    }
  }, wt.unstable_useCacheRefresh = function() {
    return I.H.useCacheRefresh();
  }, wt.use = function(k) {
    return I.H.use(k);
  }, wt.useActionState = function(k, q, T) {
    return I.H.useActionState(k, q, T);
  }, wt.useCallback = function(k, q) {
    return I.H.useCallback(k, q);
  }, wt.useContext = function(k) {
    return I.H.useContext(k);
  }, wt.useDebugValue = function() {
  }, wt.useDeferredValue = function(k, q) {
    return I.H.useDeferredValue(k, q);
  }, wt.useEffect = function(k, q) {
    return I.H.useEffect(k, q);
  }, wt.useEffectEvent = function(k) {
    return I.H.useEffectEvent(k);
  }, wt.useId = function() {
    return I.H.useId();
  }, wt.useImperativeHandle = function(k, q, T) {
    return I.H.useImperativeHandle(k, q, T);
  }, wt.useInsertionEffect = function(k, q) {
    return I.H.useInsertionEffect(k, q);
  }, wt.useLayoutEffect = function(k, q) {
    return I.H.useLayoutEffect(k, q);
  }, wt.useMemo = function(k, q) {
    return I.H.useMemo(k, q);
  }, wt.useOptimistic = function(k, q) {
    return I.H.useOptimistic(k, q);
  }, wt.useReducer = function(k, q, T) {
    return I.H.useReducer(k, q, T);
  }, wt.useRef = function(k) {
    return I.H.useRef(k);
  }, wt.useState = function(k) {
    return I.H.useState(k);
  }, wt.useSyncExternalStore = function(k, q, T) {
    return I.H.useSyncExternalStore(
      k,
      q,
      T
    );
  }, wt.useTransition = function() {
    return I.H.useTransition();
  }, wt.version = "19.2.5", wt;
}
var cy;
function xh() {
  return cy || (cy = 1, af.exports = NS()), af.exports;
}
var rt = xh(), rf = { exports: {} }, sl = {}, lf = { exports: {} }, of = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fy;
function LS() {
  return fy || (fy = 1, (function(e) {
    function i(O, Q) {
      var nt = O.length;
      O.push(Q);
      t: for (; 0 < nt; ) {
        var pt = nt - 1 >>> 1, S = O[pt];
        if (0 < s(S, Q))
          O[pt] = Q, O[nt] = S, nt = pt;
        else break t;
      }
    }
    function r(O) {
      return O.length === 0 ? null : O[0];
    }
    function l(O) {
      if (O.length === 0) return null;
      var Q = O[0], nt = O.pop();
      if (nt !== Q) {
        O[0] = nt;
        t: for (var pt = 0, S = O.length, k = S >>> 1; pt < k; ) {
          var q = 2 * (pt + 1) - 1, T = O[q], at = q + 1, st = O[at];
          if (0 > s(T, nt))
            at < S && 0 > s(st, T) ? (O[pt] = st, O[at] = nt, pt = at) : (O[pt] = T, O[q] = nt, pt = q);
          else if (at < S && 0 > s(st, nt))
            O[pt] = st, O[at] = nt, pt = at;
          else break t;
        }
      }
      return Q;
    }
    function s(O, Q) {
      var nt = O.sortIndex - Q.sortIndex;
      return nt !== 0 ? nt : O.id - Q.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      e.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, d = f.now();
      e.unstable_now = function() {
        return f.now() - d;
      };
    }
    var m = [], p = [], g = 1, y = null, b = 3, x = !1, A = !1, z = !1, D = !1, M = typeof setTimeout == "function" ? setTimeout : null, H = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function F(O) {
      for (var Q = r(p); Q !== null; ) {
        if (Q.callback === null) l(p);
        else if (Q.startTime <= O)
          l(p), Q.sortIndex = Q.expirationTime, i(m, Q);
        else break;
        Q = r(p);
      }
    }
    function K(O) {
      if (z = !1, F(O), !A)
        if (r(m) !== null)
          A = !0, B || (B = !0, $());
        else {
          var Q = r(p);
          Q !== null && Z(K, Q.startTime - O);
        }
    }
    var B = !1, I = -1, j = 5, J = -1;
    function et() {
      return D ? !0 : !(e.unstable_now() - J < j);
    }
    function W() {
      if (D = !1, B) {
        var O = e.unstable_now();
        J = O;
        var Q = !0;
        try {
          t: {
            A = !1, z && (z = !1, H(I), I = -1), x = !0;
            var nt = b;
            try {
              e: {
                for (F(O), y = r(m); y !== null && !(y.expirationTime > O && et()); ) {
                  var pt = y.callback;
                  if (typeof pt == "function") {
                    y.callback = null, b = y.priorityLevel;
                    var S = pt(
                      y.expirationTime <= O
                    );
                    if (O = e.unstable_now(), typeof S == "function") {
                      y.callback = S, F(O), Q = !0;
                      break e;
                    }
                    y === r(m) && l(m), F(O);
                  } else l(m);
                  y = r(m);
                }
                if (y !== null) Q = !0;
                else {
                  var k = r(p);
                  k !== null && Z(
                    K,
                    k.startTime - O
                  ), Q = !1;
                }
              }
              break t;
            } finally {
              y = null, b = nt, x = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? $() : B = !1;
        }
      }
    }
    var $;
    if (typeof _ == "function")
      $ = function() {
        _(W);
      };
    else if (typeof MessageChannel < "u") {
      var vt = new MessageChannel(), lt = vt.port2;
      vt.port1.onmessage = W, $ = function() {
        lt.postMessage(null);
      };
    } else
      $ = function() {
        M(W, 0);
      };
    function Z(O, Q) {
      I = M(function() {
        O(e.unstable_now());
      }, Q);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, e.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < O ? Math.floor(1e3 / O) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, e.unstable_next = function(O) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = b;
      }
      var nt = b;
      b = Q;
      try {
        return O();
      } finally {
        b = nt;
      }
    }, e.unstable_requestPaint = function() {
      D = !0;
    }, e.unstable_runWithPriority = function(O, Q) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var nt = b;
      b = O;
      try {
        return Q();
      } finally {
        b = nt;
      }
    }, e.unstable_scheduleCallback = function(O, Q, nt) {
      var pt = e.unstable_now();
      switch (typeof nt == "object" && nt !== null ? (nt = nt.delay, nt = typeof nt == "number" && 0 < nt ? pt + nt : pt) : nt = pt, O) {
        case 1:
          var S = -1;
          break;
        case 2:
          S = 250;
          break;
        case 5:
          S = 1073741823;
          break;
        case 4:
          S = 1e4;
          break;
        default:
          S = 5e3;
      }
      return S = nt + S, O = {
        id: g++,
        callback: Q,
        priorityLevel: O,
        startTime: nt,
        expirationTime: S,
        sortIndex: -1
      }, nt > pt ? (O.sortIndex = nt, i(p, O), r(m) === null && O === r(p) && (z ? (H(I), I = -1) : z = !0, Z(K, nt - pt))) : (O.sortIndex = S, i(m, O), A || x || (A = !0, B || (B = !0, $()))), O;
    }, e.unstable_shouldYield = et, e.unstable_wrapCallback = function(O) {
      var Q = b;
      return function() {
        var nt = b;
        b = Q;
        try {
          return O.apply(this, arguments);
        } finally {
          b = nt;
        }
      };
    };
  })(of)), of;
}
var hy;
function VS() {
  return hy || (hy = 1, lf.exports = LS()), lf.exports;
}
var sf = { exports: {} }, Ee = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function BS() {
  if (dy) return Ee;
  dy = 1;
  var e = xh();
  function i(m) {
    var p = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + m + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var l = {
    d: {
      f: r,
      r: function() {
        throw Error(i(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal");
  function u(m, p, g) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: m,
      containerInfo: p,
      implementation: g
    };
  }
  var f = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(m, p) {
    if (m === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, Ee.createPortal = function(m, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return u(m, p, null, g);
  }, Ee.flushSync = function(m) {
    var p = f.T, g = l.p;
    try {
      if (f.T = null, l.p = 2, m) return m();
    } finally {
      f.T = p, l.p = g, l.d.f();
    }
  }, Ee.preconnect = function(m, p) {
    typeof m == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(m, p));
  }, Ee.prefetchDNS = function(m) {
    typeof m == "string" && l.d.D(m);
  }, Ee.preinit = function(m, p) {
    if (typeof m == "string" && p && typeof p.as == "string") {
      var g = p.as, y = d(g, p.crossOrigin), b = typeof p.integrity == "string" ? p.integrity : void 0, x = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      g === "style" ? l.d.S(
        m,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: y,
          integrity: b,
          fetchPriority: x
        }
      ) : g === "script" && l.d.X(m, {
        crossOrigin: y,
        integrity: b,
        fetchPriority: x,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Ee.preinitModule = function(m, p) {
    if (typeof m == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var g = d(
            p.as,
            p.crossOrigin
          );
          l.d.M(m, {
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && l.d.M(m);
  }, Ee.preload = function(m, p) {
    if (typeof m == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var g = p.as, y = d(g, p.crossOrigin);
      l.d.L(m, g, {
        crossOrigin: y,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Ee.preloadModule = function(m, p) {
    if (typeof m == "string")
      if (p) {
        var g = d(p.as, p.crossOrigin);
        l.d.m(m, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(m);
  }, Ee.requestFormReset = function(m) {
    l.d.r(m);
  }, Ee.unstable_batchedUpdates = function(m, p) {
    return m(p);
  }, Ee.useFormState = function(m, p, g) {
    return f.H.useFormState(m, p, g);
  }, Ee.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Ee.version = "19.2.5", Ee;
}
var py;
function US() {
  if (py) return sf.exports;
  py = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return e(), sf.exports = BS(), sf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var my;
function jS() {
  if (my) return sl;
  my = 1;
  var e = VS(), i = xh(), r = US();
  function l(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        n += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function u(t) {
    var n = t, a = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (a = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? a : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (u(t) !== t)
      throw Error(l(188));
  }
  function p(t) {
    var n = t.alternate;
    if (!n) {
      if (n = u(t), n === null) throw Error(l(188));
      return n !== t ? null : t;
    }
    for (var a = t, o = n; ; ) {
      var c = a.return;
      if (c === null) break;
      var h = c.alternate;
      if (h === null) {
        if (o = c.return, o !== null) {
          a = o;
          continue;
        }
        break;
      }
      if (c.child === h.child) {
        for (h = c.child; h; ) {
          if (h === a) return m(c), t;
          if (h === o) return m(c), n;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (a.return !== o.return) a = c, o = h;
      else {
        for (var v = !1, w = c.child; w; ) {
          if (w === a) {
            v = !0, a = c, o = h;
            break;
          }
          if (w === o) {
            v = !0, o = c, a = h;
            break;
          }
          w = w.sibling;
        }
        if (!v) {
          for (w = h.child; w; ) {
            if (w === a) {
              v = !0, a = h, o = c;
              break;
            }
            if (w === o) {
              v = !0, o = h, a = c;
              break;
            }
            w = w.sibling;
          }
          if (!v) throw Error(l(189));
        }
      }
      if (a.alternate !== o) throw Error(l(190));
    }
    if (a.tag !== 3) throw Error(l(188));
    return a.stateNode.current === a ? t : n;
  }
  function g(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = g(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), J = Symbol.for("react.activity"), et = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var vt = Symbol.for("react.client.reference");
  function lt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === vt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case z:
        return "Fragment";
      case M:
        return "Profiler";
      case D:
        return "StrictMode";
      case K:
        return "Suspense";
      case B:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case A:
          return "Portal";
        case _:
          return t.displayName || "Context";
        case H:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case I:
          return n = t.displayName || null, n !== null ? n : lt(t.type) || "Memo";
        case j:
          n = t._payload, t = t._init;
          try {
            return lt(t(n));
          } catch {
          }
      }
    return null;
  }
  var Z = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, nt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], S = -1;
  function k(t) {
    return { current: t };
  }
  function q(t) {
    0 > S || (t.current = pt[S], pt[S] = null, S--);
  }
  function T(t, n) {
    S++, pt[S] = t.current, t.current = n;
  }
  var at = k(null), st = k(null), ot = k(null), Et = k(null);
  function Xt(t, n) {
    switch (T(ot, n), T(st, t), T(at, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? Dg(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = Dg(n), t = Rg(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    q(at), T(at, t);
  }
  function bt() {
    q(at), q(st), q(ot);
  }
  function ke(t) {
    t.memoizedState !== null && T(Et, t);
    var n = at.current, a = Rg(n, t.type);
    n !== a && (T(st, t), T(at, a));
  }
  function Oe(t) {
    st.current === t && (q(at), q(st)), Et.current === t && (q(Et), il._currentValue = nt);
  }
  var Tn, ei;
  function _e(t) {
    if (Tn === void 0)
      try {
        throw Error();
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/);
        Tn = n && n[1] || "", ei = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Tn + t + ei;
  }
  var ha = !1;
  function da(t, n) {
    if (!t || ha) return "";
    ha = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var P = function() {
                throw Error();
              };
              if (Object.defineProperty(P.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(P, []);
                } catch (U) {
                  var V = U;
                }
                Reflect.construct(t, [], P);
              } else {
                try {
                  P.call();
                } catch (U) {
                  V = U;
                }
                t.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                V = U;
              }
              (P = t()) && typeof P.catch == "function" && P.catch(function() {
              });
            }
          } catch (U) {
            if (U && V && typeof U.stack == "string")
              return [U.stack, V.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = o.DetermineComponentFrameRoot(), v = h[0], w = h[1];
      if (v && w) {
        var E = v.split(`
`), L = w.split(`
`);
        for (c = o = 0; o < E.length && !E[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; c < L.length && !L[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (o === E.length || c === L.length)
          for (o = E.length - 1, c = L.length - 1; 1 <= o && 0 <= c && E[o] !== L[c]; )
            c--;
        for (; 1 <= o && 0 <= c; o--, c--)
          if (E[o] !== L[c]) {
            if (o !== 1 || c !== 1)
              do
                if (o--, c--, 0 > c || E[o] !== L[c]) {
                  var Y = `
` + E[o].replace(" at new ", " at ");
                  return t.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", t.displayName)), Y;
                }
              while (1 <= o && 0 <= c);
            break;
          }
      }
    } finally {
      ha = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? _e(a) : "";
  }
  function Ll(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return _e(t.type);
      case 16:
        return _e("Lazy");
      case 13:
        return t.child !== n && n !== null ? _e("Suspense Fallback") : _e("Suspense");
      case 19:
        return _e("SuspenseList");
      case 0:
      case 15:
        return da(t.type, !1);
      case 11:
        return da(t.type.render, !1);
      case 1:
        return da(t.type, !0);
      case 31:
        return _e("Activity");
      default:
        return "";
    }
  }
  function Vl(t) {
    try {
      var n = "", a = null;
      do
        n += Ll(t, a), a = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var pa = Object.prototype.hasOwnProperty, ma = e.unstable_scheduleCallback, mr = e.unstable_cancelCallback, qs = e.unstable_shouldYield, Ys = e.unstable_requestPaint, Ce = e.unstable_now, Gs = e.unstable_getCurrentPriorityLevel, G = e.unstable_ImmediatePriority, it = e.unstable_UserBlockingPriority, yt = e.unstable_NormalPriority, Mt = e.unstable_LowPriority, Ut = e.unstable_IdlePriority, Fe = e.log, Ln = e.unstable_setDisableYieldValue, Me = null, fe = null;
  function Ne(t) {
    if (typeof Fe == "function" && Ln(t), fe && typeof fe.setStrictMode == "function")
      try {
        fe.setStrictMode(Me, t);
      } catch {
      }
  }
  var Pt = Math.clz32 ? Math.clz32 : vx, ni = Math.log, gn = Math.LN2;
  function vx(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ni(t) / gn | 0) | 0;
  }
  var Bl = 256, Ul = 262144, jl = 4194304;
  function Ui(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Hl(t, n, a) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var c = 0, h = t.suspendedLanes, v = t.pingedLanes;
    t = t.warmLanes;
    var w = o & 134217727;
    return w !== 0 ? (o = w & ~h, o !== 0 ? c = Ui(o) : (v &= w, v !== 0 ? c = Ui(v) : a || (a = w & ~t, a !== 0 && (c = Ui(a))))) : (w = o & ~h, w !== 0 ? c = Ui(w) : v !== 0 ? c = Ui(v) : a || (a = o & ~t, a !== 0 && (c = Ui(a)))), c === 0 ? 0 : n !== 0 && n !== c && (n & h) === 0 && (h = c & -c, a = n & -n, h >= a || h === 32 && (a & 4194048) !== 0) ? n : c;
  }
  function gr(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function bx(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function fd() {
    var t = jl;
    return jl <<= 1, (jl & 62914560) === 0 && (jl = 4194304), t;
  }
  function Xs(t) {
    for (var n = [], a = 0; 31 > a; a++) n.push(t);
    return n;
  }
  function yr(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function xx(t, n, a, o, c, h) {
    var v = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var w = t.entanglements, E = t.expirationTimes, L = t.hiddenUpdates;
    for (a = v & ~a; 0 < a; ) {
      var Y = 31 - Pt(a), P = 1 << Y;
      w[Y] = 0, E[Y] = -1;
      var V = L[Y];
      if (V !== null)
        for (L[Y] = null, Y = 0; Y < V.length; Y++) {
          var U = V[Y];
          U !== null && (U.lane &= -536870913);
        }
      a &= ~P;
    }
    o !== 0 && hd(t, o, 0), h !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(v & ~n));
  }
  function hd(t, n, a) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Pt(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | a & 261930;
  }
  function dd(t, n) {
    var a = t.entangledLanes |= n;
    for (t = t.entanglements; a; ) {
      var o = 31 - Pt(a), c = 1 << o;
      c & n | t[o] & n && (t[o] |= n), a &= ~c;
    }
  }
  function pd(t, n) {
    var a = n & -n;
    return a = (a & 42) !== 0 ? 1 : Ps(a), (a & (t.suspendedLanes | n)) !== 0 ? 0 : a;
  }
  function Ps(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Fs(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function md() {
    var t = Q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ty(t.type));
  }
  function gd(t, n) {
    var a = Q.p;
    try {
      return Q.p = t, n();
    } finally {
      Q.p = a;
    }
  }
  var ii = Math.random().toString(36).slice(2), ye = "__reactFiber$" + ii, Le = "__reactProps$" + ii, ga = "__reactContainer$" + ii, Qs = "__reactEvents$" + ii, wx = "__reactListeners$" + ii, Sx = "__reactHandles$" + ii, yd = "__reactResources$" + ii, vr = "__reactMarker$" + ii;
  function Ks(t) {
    delete t[ye], delete t[Le], delete t[Qs], delete t[wx], delete t[Sx];
  }
  function ya(t) {
    var n = t[ye];
    if (n) return n;
    for (var a = t.parentNode; a; ) {
      if (n = a[ga] || a[ye]) {
        if (a = n.alternate, n.child !== null || a !== null && a.child !== null)
          for (t = Ug(t); t !== null; ) {
            if (a = t[ye]) return a;
            t = Ug(t);
          }
        return n;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function va(t) {
    if (t = t[ye] || t[ga]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function br(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function ba(t) {
    var n = t[yd];
    return n || (n = t[yd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function me(t) {
    t[vr] = !0;
  }
  var vd = /* @__PURE__ */ new Set(), bd = {};
  function ji(t, n) {
    xa(t, n), xa(t + "Capture", n);
  }
  function xa(t, n) {
    for (bd[t] = n, t = 0; t < n.length; t++)
      vd.add(n[t]);
  }
  var Tx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), xd = {}, wd = {};
  function Ex(t) {
    return pa.call(wd, t) ? !0 : pa.call(xd, t) ? !1 : Tx.test(t) ? wd[t] = !0 : (xd[t] = !0, !1);
  }
  function ql(t, n, a) {
    if (Ex(n))
      if (a === null) t.removeAttribute(n);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + a);
      }
  }
  function Yl(t, n, a) {
    if (a === null) t.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + a);
    }
  }
  function Vn(t, n, a, o) {
    if (o === null) t.removeAttribute(a);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(n, a, "" + o);
    }
  }
  function nn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Sd(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ax(t, n, a) {
    var o = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var c = o.get, h = o.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(v) {
          a = "" + v, h.call(this, v);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(v) {
          a = "" + v;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function Zs(t) {
    if (!t._valueTracker) {
      var n = Sd(t) ? "checked" : "value";
      t._valueTracker = Ax(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Td(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var a = n.getValue(), o = "";
    return t && (o = Sd(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== a ? (n.setValue(t), !0) : !1;
  }
  function Gl(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var kx = /[\n"\\]/g;
  function an(t) {
    return t.replace(
      kx,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Is(t, n, a, o, c, h, v, w) {
    t.name = "", v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? t.type = v : t.removeAttribute("type"), n != null ? v === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + nn(n)) : t.value !== "" + nn(n) && (t.value = "" + nn(n)) : v !== "submit" && v !== "reset" || t.removeAttribute("value"), n != null ? Js(t, v, nn(n)) : a != null ? Js(t, v, nn(a)) : o != null && t.removeAttribute("value"), c == null && h != null && (t.defaultChecked = !!h), c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"), w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.name = "" + nn(w) : t.removeAttribute("name");
  }
  function Ed(t, n, a, o, c, h, v, w) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || a != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        Zs(t);
        return;
      }
      a = a != null ? "" + nn(a) : "", n = n != null ? "" + nn(n) : a, w || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? c, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = w ? t.checked : !!o, t.defaultChecked = !!o, v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (t.name = v), Zs(t);
  }
  function Js(t, n, a) {
    n === "number" && Gl(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
  }
  function wa(t, n, a, o) {
    if (t = t.options, n) {
      n = {};
      for (var c = 0; c < a.length; c++)
        n["$" + a[c]] = !0;
      for (a = 0; a < t.length; a++)
        c = n.hasOwnProperty("$" + t[a].value), t[a].selected !== c && (t[a].selected = c), c && o && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + nn(a), n = null, c = 0; c < t.length; c++) {
        if (t[c].value === a) {
          t[c].selected = !0, o && (t[c].defaultSelected = !0);
          return;
        }
        n !== null || t[c].disabled || (n = t[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ad(t, n, a) {
    if (n != null && (n = "" + nn(n), n !== t.value && (t.value = n), a == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = a != null ? "" + nn(a) : "";
  }
  function kd(t, n, a, o) {
    if (n == null) {
      if (o != null) {
        if (a != null) throw Error(l(92));
        if (Z(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        a = o;
      }
      a == null && (a = ""), n = a;
    }
    a = nn(n), t.defaultValue = a, o = t.textContent, o === a && o !== "" && o !== null && (t.value = o), Zs(t);
  }
  function Sa(t, n) {
    if (n) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Cx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cd(t, n, a) {
    var o = n.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, a) : typeof a != "number" || a === 0 || Cx.has(n) ? n === "float" ? t.cssFloat = a : t[n] = ("" + a).trim() : t[n] = a + "px";
  }
  function Md(t, n, a) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, a != null) {
      for (var o in a)
        !a.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var c in n)
        o = n[c], n.hasOwnProperty(c) && a[c] !== o && Cd(t, c, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Cd(t, h, n[h]);
  }
  function Ws(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Mx = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), zx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xl(t) {
    return zx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Bn() {
  }
  var $s = null;
  function tu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ta = null, Ea = null;
  function zd(t) {
    var n = va(t);
    if (n && (t = n.stateNode)) {
      var a = t[Le] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (Is(
            t,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), n = a.name, a.type === "radio" && n != null) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + an(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < a.length; n++) {
              var o = a[n];
              if (o !== t && o.form === t.form) {
                var c = o[Le] || null;
                if (!c) throw Error(l(90));
                Is(
                  o,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (n = 0; n < a.length; n++)
              o = a[n], o.form === t.form && Td(o);
          }
          break t;
        case "textarea":
          Ad(t, a.value, a.defaultValue);
          break t;
        case "select":
          n = a.value, n != null && wa(t, !!a.multiple, n, !1);
      }
    }
  }
  var eu = !1;
  function Dd(t, n, a) {
    if (eu) return t(n, a);
    eu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (eu = !1, (Ta !== null || Ea !== null) && (Oo(), Ta && (n = Ta, t = Ea, Ea = Ta = null, zd(n), t)))
        for (n = 0; n < t.length; n++) zd(t[n]);
    }
  }
  function xr(t, n) {
    var a = t.stateNode;
    if (a === null) return null;
    var o = a[Le] || null;
    if (o === null) return null;
    a = o[n];
    t: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (t = t.type, o = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !o;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function")
      throw Error(
        l(231, n, typeof a)
      );
    return a;
  }
  var Un = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nu = !1;
  if (Un)
    try {
      var wr = {};
      Object.defineProperty(wr, "passive", {
        get: function() {
          nu = !0;
        }
      }), window.addEventListener("test", wr, wr), window.removeEventListener("test", wr, wr);
    } catch {
      nu = !1;
    }
  var ai = null, iu = null, Pl = null;
  function Rd() {
    if (Pl) return Pl;
    var t, n = iu, a = n.length, o, c = "value" in ai ? ai.value : ai.textContent, h = c.length;
    for (t = 0; t < a && n[t] === c[t]; t++) ;
    var v = a - t;
    for (o = 1; o <= v && n[a - o] === c[h - o]; o++) ;
    return Pl = c.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Fl(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ql() {
    return !0;
  }
  function Od() {
    return !1;
  }
  function Ve(t) {
    function n(a, o, c, h, v) {
      this._reactName = a, this._targetInst = c, this.type = o, this.nativeEvent = h, this.target = v, this.currentTarget = null;
      for (var w in t)
        t.hasOwnProperty(w) && (a = t[w], this[w] = a ? a(h) : h[w]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Ql : Od, this.isPropagationStopped = Od, this;
    }
    return y(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ql);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ql);
      },
      persist: function() {
      },
      isPersistent: Ql
    }), n;
  }
  var Hi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Kl = Ve(Hi), Sr = y({}, Hi, { view: 0, detail: 0 }), Dx = Ve(Sr), au, ru, Tr, Zl = y({}, Sr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ou,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Tr && (Tr && t.type === "mousemove" ? (au = t.screenX - Tr.screenX, ru = t.screenY - Tr.screenY) : ru = au = 0, Tr = t), au);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ru;
    }
  }), _d = Ve(Zl), Rx = y({}, Zl, { dataTransfer: 0 }), Ox = Ve(Rx), _x = y({}, Sr, { relatedTarget: 0 }), lu = Ve(_x), Nx = y({}, Hi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lx = Ve(Nx), Vx = y({}, Hi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Bx = Ve(Vx), Ux = y({}, Hi, { data: 0 }), Nd = Ve(Ux), jx = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Hx = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, qx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yx(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = qx[t]) ? !!n[t] : !1;
  }
  function ou() {
    return Yx;
  }
  var Gx = y({}, Sr, {
    key: function(t) {
      if (t.key) {
        var n = jx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Fl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Hx[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ou,
    charCode: function(t) {
      return t.type === "keypress" ? Fl(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Fl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Xx = Ve(Gx), Px = y({}, Zl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Ld = Ve(Px), Fx = y({}, Sr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ou
  }), Qx = Ve(Fx), Kx = y({}, Hi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Zx = Ve(Kx), Ix = y({}, Zl, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Jx = Ve(Ix), Wx = y({}, Hi, {
    newState: 0,
    oldState: 0
  }), $x = Ve(Wx), tw = [9, 13, 27, 32], su = Un && "CompositionEvent" in window, Er = null;
  Un && "documentMode" in document && (Er = document.documentMode);
  var ew = Un && "TextEvent" in window && !Er, Vd = Un && (!su || Er && 8 < Er && 11 >= Er), Bd = " ", Ud = !1;
  function jd(t, n) {
    switch (t) {
      case "keyup":
        return tw.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Hd(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Aa = !1;
  function nw(t, n) {
    switch (t) {
      case "compositionend":
        return Hd(n);
      case "keypress":
        return n.which !== 32 ? null : (Ud = !0, Bd);
      case "textInput":
        return t = n.data, t === Bd && Ud ? null : t;
      default:
        return null;
    }
  }
  function iw(t, n) {
    if (Aa)
      return t === "compositionend" || !su && jd(t, n) ? (t = Rd(), Pl = iu = ai = null, Aa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Vd && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var aw = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function qd(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!aw[t.type] : n === "textarea";
  }
  function Yd(t, n, a, o) {
    Ta ? Ea ? Ea.push(o) : Ea = [o] : Ta = o, n = jo(n, "onChange"), 0 < n.length && (a = new Kl(
      "onChange",
      "change",
      null,
      a,
      o
    ), t.push({ event: a, listeners: n }));
  }
  var Ar = null, kr = null;
  function rw(t) {
    Eg(t, 0);
  }
  function Il(t) {
    var n = br(t);
    if (Td(n)) return t;
  }
  function Gd(t, n) {
    if (t === "change") return n;
  }
  var Xd = !1;
  if (Un) {
    var uu;
    if (Un) {
      var cu = "oninput" in document;
      if (!cu) {
        var Pd = document.createElement("div");
        Pd.setAttribute("oninput", "return;"), cu = typeof Pd.oninput == "function";
      }
      uu = cu;
    } else uu = !1;
    Xd = uu && (!document.documentMode || 9 < document.documentMode);
  }
  function Fd() {
    Ar && (Ar.detachEvent("onpropertychange", Qd), kr = Ar = null);
  }
  function Qd(t) {
    if (t.propertyName === "value" && Il(kr)) {
      var n = [];
      Yd(
        n,
        kr,
        t,
        tu(t)
      ), Dd(rw, n);
    }
  }
  function lw(t, n, a) {
    t === "focusin" ? (Fd(), Ar = n, kr = a, Ar.attachEvent("onpropertychange", Qd)) : t === "focusout" && Fd();
  }
  function ow(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Il(kr);
  }
  function sw(t, n) {
    if (t === "click") return Il(n);
  }
  function uw(t, n) {
    if (t === "input" || t === "change")
      return Il(n);
  }
  function cw(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Qe = typeof Object.is == "function" ? Object.is : cw;
  function Cr(t, n) {
    if (Qe(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var a = Object.keys(t), o = Object.keys(n);
    if (a.length !== o.length) return !1;
    for (o = 0; o < a.length; o++) {
      var c = a[o];
      if (!pa.call(n, c) || !Qe(t[c], n[c]))
        return !1;
    }
    return !0;
  }
  function Kd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Zd(t, n) {
    var a = Kd(t);
    t = 0;
    for (var o; a; ) {
      if (a.nodeType === 3) {
        if (o = t + a.textContent.length, t <= n && o >= n)
          return { node: a, offset: n - t };
        t = o;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Kd(a);
    }
  }
  function Id(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Id(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Jd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Gl(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof n.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = n.contentWindow;
      else break;
      n = Gl(t.document);
    }
    return n;
  }
  function fu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var fw = Un && "documentMode" in document && 11 >= document.documentMode, ka = null, hu = null, Mr = null, du = !1;
  function Wd(t, n, a) {
    var o = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    du || ka == null || ka !== Gl(o) || (o = ka, "selectionStart" in o && fu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Mr && Cr(Mr, o) || (Mr = o, o = jo(hu, "onSelect"), 0 < o.length && (n = new Kl(
      "onSelect",
      "select",
      null,
      n,
      a
    ), t.push({ event: n, listeners: o }), n.target = ka)));
  }
  function qi(t, n) {
    var a = {};
    return a[t.toLowerCase()] = n.toLowerCase(), a["Webkit" + t] = "webkit" + n, a["Moz" + t] = "moz" + n, a;
  }
  var Ca = {
    animationend: qi("Animation", "AnimationEnd"),
    animationiteration: qi("Animation", "AnimationIteration"),
    animationstart: qi("Animation", "AnimationStart"),
    transitionrun: qi("Transition", "TransitionRun"),
    transitionstart: qi("Transition", "TransitionStart"),
    transitioncancel: qi("Transition", "TransitionCancel"),
    transitionend: qi("Transition", "TransitionEnd")
  }, pu = {}, $d = {};
  Un && ($d = document.createElement("div").style, "AnimationEvent" in window || (delete Ca.animationend.animation, delete Ca.animationiteration.animation, delete Ca.animationstart.animation), "TransitionEvent" in window || delete Ca.transitionend.transition);
  function Yi(t) {
    if (pu[t]) return pu[t];
    if (!Ca[t]) return t;
    var n = Ca[t], a;
    for (a in n)
      if (n.hasOwnProperty(a) && a in $d)
        return pu[t] = n[a];
    return t;
  }
  var tp = Yi("animationend"), ep = Yi("animationiteration"), np = Yi("animationstart"), hw = Yi("transitionrun"), dw = Yi("transitionstart"), pw = Yi("transitioncancel"), ip = Yi("transitionend"), ap = /* @__PURE__ */ new Map(), mu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mu.push("scrollEnd");
  function yn(t, n) {
    ap.set(t, n), ji(n, [t]);
  }
  var Jl = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, rn = [], Ma = 0, gu = 0;
  function Wl() {
    for (var t = Ma, n = gu = Ma = 0; n < t; ) {
      var a = rn[n];
      rn[n++] = null;
      var o = rn[n];
      rn[n++] = null;
      var c = rn[n];
      rn[n++] = null;
      var h = rn[n];
      if (rn[n++] = null, o !== null && c !== null) {
        var v = o.pending;
        v === null ? c.next = c : (c.next = v.next, v.next = c), o.pending = c;
      }
      h !== 0 && rp(a, c, h);
    }
  }
  function $l(t, n, a, o) {
    rn[Ma++] = t, rn[Ma++] = n, rn[Ma++] = a, rn[Ma++] = o, gu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function yu(t, n, a, o) {
    return $l(t, n, a, o), to(t);
  }
  function Gi(t, n) {
    return $l(t, null, null, n), to(t);
  }
  function rp(t, n, a) {
    t.lanes |= a;
    var o = t.alternate;
    o !== null && (o.lanes |= a);
    for (var c = !1, h = t.return; h !== null; )
      h.childLanes |= a, o = h.alternate, o !== null && (o.childLanes |= a), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (c = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, c && n !== null && (c = 31 - Pt(a), t = h.hiddenUpdates, o = t[c], o === null ? t[c] = [n] : o.push(n), n.lane = a | 536870912), h) : null;
  }
  function to(t) {
    if (50 < Ir)
      throw Ir = 0, kc = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var za = {};
  function mw(t, n, a, o) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ke(t, n, a, o) {
    return new mw(t, n, a, o);
  }
  function vu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function jn(t, n) {
    var a = t.alternate;
    return a === null ? (a = Ke(
      t.tag,
      n,
      t.key,
      t.mode
    ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = n, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 65011712, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, n = t.dependencies, a.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
  }
  function lp(t, n) {
    t.flags &= 65011714;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, n = a.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function eo(t, n, a, o, c, h) {
    var v = 0;
    if (o = t, typeof t == "function") vu(t) && (v = 1);
    else if (typeof t == "string")
      v = xS(
        t,
        a,
        at.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case J:
          return t = Ke(31, a, n, c), t.elementType = J, t.lanes = h, t;
        case z:
          return Xi(a.children, c, h, n);
        case D:
          v = 8, c |= 24;
          break;
        case M:
          return t = Ke(12, a, n, c | 2), t.elementType = M, t.lanes = h, t;
        case K:
          return t = Ke(13, a, n, c), t.elementType = K, t.lanes = h, t;
        case B:
          return t = Ke(19, a, n, c), t.elementType = B, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case _:
                v = 10;
                break t;
              case H:
                v = 9;
                break t;
              case F:
                v = 11;
                break t;
              case I:
                v = 14;
                break t;
              case j:
                v = 16, o = null;
                break t;
            }
          v = 29, a = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = Ke(v, a, n, c), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function Xi(t, n, a, o) {
    return t = Ke(7, t, o, n), t.lanes = a, t;
  }
  function bu(t, n, a) {
    return t = Ke(6, t, null, n), t.lanes = a, t;
  }
  function op(t) {
    var n = Ke(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function xu(t, n, a) {
    return n = Ke(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = a, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var sp = /* @__PURE__ */ new WeakMap();
  function ln(t, n) {
    if (typeof t == "object" && t !== null) {
      var a = sp.get(t);
      return a !== void 0 ? a : (n = {
        value: t,
        source: n,
        stack: Vl(n)
      }, sp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Vl(n)
    };
  }
  var Da = [], Ra = 0, no = null, zr = 0, on = [], sn = 0, ri = null, En = 1, An = "";
  function Hn(t, n) {
    Da[Ra++] = zr, Da[Ra++] = no, no = t, zr = n;
  }
  function up(t, n, a) {
    on[sn++] = En, on[sn++] = An, on[sn++] = ri, ri = t;
    var o = En;
    t = An;
    var c = 32 - Pt(o) - 1;
    o &= ~(1 << c), a += 1;
    var h = 32 - Pt(n) + c;
    if (30 < h) {
      var v = c - c % 5;
      h = (o & (1 << v) - 1).toString(32), o >>= v, c -= v, En = 1 << 32 - Pt(n) + c | a << c | o, An = h + t;
    } else
      En = 1 << h | a << c | o, An = t;
  }
  function wu(t) {
    t.return !== null && (Hn(t, 1), up(t, 1, 0));
  }
  function Su(t) {
    for (; t === no; )
      no = Da[--Ra], Da[Ra] = null, zr = Da[--Ra], Da[Ra] = null;
    for (; t === ri; )
      ri = on[--sn], on[sn] = null, An = on[--sn], on[sn] = null, En = on[--sn], on[sn] = null;
  }
  function cp(t, n) {
    on[sn++] = En, on[sn++] = An, on[sn++] = ri, En = n.id, An = n.overflow, ri = t;
  }
  var ve = null, It = null, _t = !1, li = null, un = !1, Tu = Error(l(519));
  function oi(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Dr(ln(n, t)), Tu;
  }
  function fp(t) {
    var n = t.stateNode, a = t.type, o = t.memoizedProps;
    switch (n[ye] = t, n[Le] = o, a) {
      case "dialog":
        Dt("cancel", n), Dt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Dt("load", n);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Wr.length; a++)
          Dt(Wr[a], n);
        break;
      case "source":
        Dt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Dt("error", n), Dt("load", n);
        break;
      case "details":
        Dt("toggle", n);
        break;
      case "input":
        Dt("invalid", n), Ed(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        Dt("invalid", n);
        break;
      case "textarea":
        Dt("invalid", n), kd(n, o.value, o.defaultValue, o.children);
    }
    a = o.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || n.textContent === "" + a || o.suppressHydrationWarning === !0 || Mg(n.textContent, a) ? (o.popover != null && (Dt("beforetoggle", n), Dt("toggle", n)), o.onScroll != null && Dt("scroll", n), o.onScrollEnd != null && Dt("scrollend", n), o.onClick != null && (n.onclick = Bn), n = !0) : n = !1, n || oi(t, !0);
  }
  function hp(t) {
    for (ve = t.return; ve; )
      switch (ve.tag) {
        case 5:
        case 31:
        case 13:
          un = !1;
          return;
        case 27:
        case 3:
          un = !0;
          return;
        default:
          ve = ve.return;
      }
  }
  function Oa(t) {
    if (t !== ve) return !1;
    if (!_t) return hp(t), _t = !0, !1;
    var n = t.tag, a;
    if ((a = n !== 3 && n !== 27) && ((a = n === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || qc(t.type, t.memoizedProps)), a = !a), a && It && oi(t), hp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      It = Bg(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      It = Bg(t);
    } else
      n === 27 ? (n = It, wi(t.type) ? (t = Fc, Fc = null, It = t) : It = n) : It = ve ? fn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Pi() {
    It = ve = null, _t = !1;
  }
  function Eu() {
    var t = li;
    return t !== null && (He === null ? He = t : He.push.apply(
      He,
      t
    ), li = null), t;
  }
  function Dr(t) {
    li === null ? li = [t] : li.push(t);
  }
  var Au = k(null), Fi = null, qn = null;
  function si(t, n, a) {
    T(Au, n._currentValue), n._currentValue = a;
  }
  function Yn(t) {
    t._currentValue = Au.current, q(Au);
  }
  function ku(t, n, a) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === a) break;
      t = t.return;
    }
  }
  function Cu(t, n, a, o) {
    var c = t.child;
    for (c !== null && (c.return = t); c !== null; ) {
      var h = c.dependencies;
      if (h !== null) {
        var v = c.child;
        h = h.firstContext;
        t: for (; h !== null; ) {
          var w = h;
          h = c;
          for (var E = 0; E < n.length; E++)
            if (w.context === n[E]) {
              h.lanes |= a, w = h.alternate, w !== null && (w.lanes |= a), ku(
                h.return,
                a,
                t
              ), o || (v = null);
              break t;
            }
          h = w.next;
        }
      } else if (c.tag === 18) {
        if (v = c.return, v === null) throw Error(l(341));
        v.lanes |= a, h = v.alternate, h !== null && (h.lanes |= a), ku(v, a, t), v = null;
      } else v = c.child;
      if (v !== null) v.return = c;
      else
        for (v = c; v !== null; ) {
          if (v === t) {
            v = null;
            break;
          }
          if (c = v.sibling, c !== null) {
            c.return = v.return, v = c;
            break;
          }
          v = v.return;
        }
      c = v;
    }
  }
  function _a(t, n, a, o) {
    t = null;
    for (var c = n, h = !1; c !== null; ) {
      if (!h) {
        if ((c.flags & 524288) !== 0) h = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var v = c.alternate;
        if (v === null) throw Error(l(387));
        if (v = v.memoizedProps, v !== null) {
          var w = c.type;
          Qe(c.pendingProps.value, v.value) || (t !== null ? t.push(w) : t = [w]);
        }
      } else if (c === Et.current) {
        if (v = c.alternate, v === null) throw Error(l(387));
        v.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(il) : t = [il]);
      }
      c = c.return;
    }
    t !== null && Cu(
      n,
      t,
      a,
      o
    ), n.flags |= 262144;
  }
  function io(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Qe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Qi(t) {
    Fi = t, qn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function be(t) {
    return dp(Fi, t);
  }
  function ao(t, n) {
    return Fi === null && Qi(t), dp(t, n);
  }
  function dp(t, n) {
    var a = n._currentValue;
    if (n = { context: n, memoizedValue: a, next: null }, qn === null) {
      if (t === null) throw Error(l(308));
      qn = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else qn = qn.next = n;
    return a;
  }
  var gw = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(a, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(a) {
        return a();
      });
    };
  }, yw = e.unstable_scheduleCallback, vw = e.unstable_NormalPriority, re = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mu() {
    return {
      controller: new gw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Rr(t) {
    t.refCount--, t.refCount === 0 && yw(vw, function() {
      t.controller.abort();
    });
  }
  var Or = null, zu = 0, Na = 0, La = null;
  function bw(t, n) {
    if (Or === null) {
      var a = Or = [];
      zu = 0, Na = Oc(), La = {
        status: "pending",
        value: void 0,
        then: function(o) {
          a.push(o);
        }
      };
    }
    return zu++, n.then(pp, pp), n;
  }
  function pp() {
    if (--zu === 0 && Or !== null) {
      La !== null && (La.status = "fulfilled");
      var t = Or;
      Or = null, Na = 0, La = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function xw(t, n) {
    var a = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        a.push(c);
      }
    };
    return t.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var c = 0; c < a.length; c++) (0, a[c])(n);
      },
      function(c) {
        for (o.status = "rejected", o.reason = c, c = 0; c < a.length; c++)
          (0, a[c])(void 0);
      }
    ), o;
  }
  var mp = O.S;
  O.S = function(t, n) {
    Wm = Ce(), typeof n == "object" && n !== null && typeof n.then == "function" && bw(t, n), mp !== null && mp(t, n);
  };
  var Ki = k(null);
  function Du() {
    var t = Ki.current;
    return t !== null ? t : Ft.pooledCache;
  }
  function ro(t, n) {
    n === null ? T(Ki, Ki.current) : T(Ki, n.pool);
  }
  function gp() {
    var t = Du();
    return t === null ? null : { parent: re._currentValue, pool: t };
  }
  var Va = Error(l(460)), Ru = Error(l(474)), lo = Error(l(542)), oo = { then: function() {
  } };
  function yp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function vp(t, n, a) {
    switch (a = t[a], a === void 0 ? t.push(n) : a !== n && (n.then(Bn, Bn), n = a), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, xp(t), t;
      default:
        if (typeof n.status == "string") n.then(Bn, Bn);
        else {
          if (t = Ft, t !== null && 100 < t.shellSuspendCounter)
            throw Error(l(482));
          t = n, t.status = "pending", t.then(
            function(o) {
              if (n.status === "pending") {
                var c = n;
                c.status = "fulfilled", c.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var c = n;
                c.status = "rejected", c.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw t = n.reason, xp(t), t;
        }
        throw Ii = n, Va;
    }
  }
  function Zi(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ii = a, Va) : a;
    }
  }
  var Ii = null;
  function bp() {
    if (Ii === null) throw Error(l(459));
    var t = Ii;
    return Ii = null, t;
  }
  function xp(t) {
    if (t === Va || t === lo)
      throw Error(l(483));
  }
  var Ba = null, _r = 0;
  function so(t) {
    var n = _r;
    return _r += 1, Ba === null && (Ba = []), vp(Ba, t, n);
  }
  function Nr(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function uo(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function wp(t) {
    function n(R, C) {
      if (t) {
        var N = R.deletions;
        N === null ? (R.deletions = [C], R.flags |= 16) : N.push(C);
      }
    }
    function a(R, C) {
      if (!t) return null;
      for (; C !== null; )
        n(R, C), C = C.sibling;
      return null;
    }
    function o(R) {
      for (var C = /* @__PURE__ */ new Map(); R !== null; )
        R.key !== null ? C.set(R.key, R) : C.set(R.index, R), R = R.sibling;
      return C;
    }
    function c(R, C) {
      return R = jn(R, C), R.index = 0, R.sibling = null, R;
    }
    function h(R, C, N) {
      return R.index = N, t ? (N = R.alternate, N !== null ? (N = N.index, N < C ? (R.flags |= 67108866, C) : N) : (R.flags |= 67108866, C)) : (R.flags |= 1048576, C);
    }
    function v(R) {
      return t && R.alternate === null && (R.flags |= 67108866), R;
    }
    function w(R, C, N, X) {
      return C === null || C.tag !== 6 ? (C = bu(N, R.mode, X), C.return = R, C) : (C = c(C, N), C.return = R, C);
    }
    function E(R, C, N, X) {
      var mt = N.type;
      return mt === z ? Y(
        R,
        C,
        N.props.children,
        X,
        N.key
      ) : C !== null && (C.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === j && Zi(mt) === C.type) ? (C = c(C, N.props), Nr(C, N), C.return = R, C) : (C = eo(
        N.type,
        N.key,
        N.props,
        null,
        R.mode,
        X
      ), Nr(C, N), C.return = R, C);
    }
    function L(R, C, N, X) {
      return C === null || C.tag !== 4 || C.stateNode.containerInfo !== N.containerInfo || C.stateNode.implementation !== N.implementation ? (C = xu(N, R.mode, X), C.return = R, C) : (C = c(C, N.children || []), C.return = R, C);
    }
    function Y(R, C, N, X, mt) {
      return C === null || C.tag !== 7 ? (C = Xi(
        N,
        R.mode,
        X,
        mt
      ), C.return = R, C) : (C = c(C, N), C.return = R, C);
    }
    function P(R, C, N) {
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return C = bu(
          "" + C,
          R.mode,
          N
        ), C.return = R, C;
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case x:
            return N = eo(
              C.type,
              C.key,
              C.props,
              null,
              R.mode,
              N
            ), Nr(N, C), N.return = R, N;
          case A:
            return C = xu(
              C,
              R.mode,
              N
            ), C.return = R, C;
          case j:
            return C = Zi(C), P(R, C, N);
        }
        if (Z(C) || $(C))
          return C = Xi(
            C,
            R.mode,
            N,
            null
          ), C.return = R, C;
        if (typeof C.then == "function")
          return P(R, so(C), N);
        if (C.$$typeof === _)
          return P(
            R,
            ao(R, C),
            N
          );
        uo(R, C);
      }
      return null;
    }
    function V(R, C, N, X) {
      var mt = C !== null ? C.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return mt !== null ? null : w(R, C, "" + N, X);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case x:
            return N.key === mt ? E(R, C, N, X) : null;
          case A:
            return N.key === mt ? L(R, C, N, X) : null;
          case j:
            return N = Zi(N), V(R, C, N, X);
        }
        if (Z(N) || $(N))
          return mt !== null ? null : Y(R, C, N, X, null);
        if (typeof N.then == "function")
          return V(
            R,
            C,
            so(N),
            X
          );
        if (N.$$typeof === _)
          return V(
            R,
            C,
            ao(R, N),
            X
          );
        uo(R, N);
      }
      return null;
    }
    function U(R, C, N, X, mt) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return R = R.get(N) || null, w(C, R, "" + X, mt);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return R = R.get(
              X.key === null ? N : X.key
            ) || null, E(C, R, X, mt);
          case A:
            return R = R.get(
              X.key === null ? N : X.key
            ) || null, L(C, R, X, mt);
          case j:
            return X = Zi(X), U(
              R,
              C,
              N,
              X,
              mt
            );
        }
        if (Z(X) || $(X))
          return R = R.get(N) || null, Y(C, R, X, mt, null);
        if (typeof X.then == "function")
          return U(
            R,
            C,
            N,
            so(X),
            mt
          );
        if (X.$$typeof === _)
          return U(
            R,
            C,
            N,
            ao(C, X),
            mt
          );
        uo(C, X);
      }
      return null;
    }
    function ut(R, C, N, X) {
      for (var mt = null, Nt = null, dt = C, At = C = 0, Ot = null; dt !== null && At < N.length; At++) {
        dt.index > At ? (Ot = dt, dt = null) : Ot = dt.sibling;
        var Lt = V(
          R,
          dt,
          N[At],
          X
        );
        if (Lt === null) {
          dt === null && (dt = Ot);
          break;
        }
        t && dt && Lt.alternate === null && n(R, dt), C = h(Lt, C, At), Nt === null ? mt = Lt : Nt.sibling = Lt, Nt = Lt, dt = Ot;
      }
      if (At === N.length)
        return a(R, dt), _t && Hn(R, At), mt;
      if (dt === null) {
        for (; At < N.length; At++)
          dt = P(R, N[At], X), dt !== null && (C = h(
            dt,
            C,
            At
          ), Nt === null ? mt = dt : Nt.sibling = dt, Nt = dt);
        return _t && Hn(R, At), mt;
      }
      for (dt = o(dt); At < N.length; At++)
        Ot = U(
          dt,
          R,
          At,
          N[At],
          X
        ), Ot !== null && (t && Ot.alternate !== null && dt.delete(
          Ot.key === null ? At : Ot.key
        ), C = h(
          Ot,
          C,
          At
        ), Nt === null ? mt = Ot : Nt.sibling = Ot, Nt = Ot);
      return t && dt.forEach(function(ki) {
        return n(R, ki);
      }), _t && Hn(R, At), mt;
    }
    function gt(R, C, N, X) {
      if (N == null) throw Error(l(151));
      for (var mt = null, Nt = null, dt = C, At = C = 0, Ot = null, Lt = N.next(); dt !== null && !Lt.done; At++, Lt = N.next()) {
        dt.index > At ? (Ot = dt, dt = null) : Ot = dt.sibling;
        var ki = V(R, dt, Lt.value, X);
        if (ki === null) {
          dt === null && (dt = Ot);
          break;
        }
        t && dt && ki.alternate === null && n(R, dt), C = h(ki, C, At), Nt === null ? mt = ki : Nt.sibling = ki, Nt = ki, dt = Ot;
      }
      if (Lt.done)
        return a(R, dt), _t && Hn(R, At), mt;
      if (dt === null) {
        for (; !Lt.done; At++, Lt = N.next())
          Lt = P(R, Lt.value, X), Lt !== null && (C = h(Lt, C, At), Nt === null ? mt = Lt : Nt.sibling = Lt, Nt = Lt);
        return _t && Hn(R, At), mt;
      }
      for (dt = o(dt); !Lt.done; At++, Lt = N.next())
        Lt = U(dt, R, At, Lt.value, X), Lt !== null && (t && Lt.alternate !== null && dt.delete(Lt.key === null ? At : Lt.key), C = h(Lt, C, At), Nt === null ? mt = Lt : Nt.sibling = Lt, Nt = Lt);
      return t && dt.forEach(function(RS) {
        return n(R, RS);
      }), _t && Hn(R, At), mt;
    }
    function Gt(R, C, N, X) {
      if (typeof N == "object" && N !== null && N.type === z && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case x:
            t: {
              for (var mt = N.key; C !== null; ) {
                if (C.key === mt) {
                  if (mt = N.type, mt === z) {
                    if (C.tag === 7) {
                      a(
                        R,
                        C.sibling
                      ), X = c(
                        C,
                        N.props.children
                      ), X.return = R, R = X;
                      break t;
                    }
                  } else if (C.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === j && Zi(mt) === C.type) {
                    a(
                      R,
                      C.sibling
                    ), X = c(C, N.props), Nr(X, N), X.return = R, R = X;
                    break t;
                  }
                  a(R, C);
                  break;
                } else n(R, C);
                C = C.sibling;
              }
              N.type === z ? (X = Xi(
                N.props.children,
                R.mode,
                X,
                N.key
              ), X.return = R, R = X) : (X = eo(
                N.type,
                N.key,
                N.props,
                null,
                R.mode,
                X
              ), Nr(X, N), X.return = R, R = X);
            }
            return v(R);
          case A:
            t: {
              for (mt = N.key; C !== null; ) {
                if (C.key === mt)
                  if (C.tag === 4 && C.stateNode.containerInfo === N.containerInfo && C.stateNode.implementation === N.implementation) {
                    a(
                      R,
                      C.sibling
                    ), X = c(C, N.children || []), X.return = R, R = X;
                    break t;
                  } else {
                    a(R, C);
                    break;
                  }
                else n(R, C);
                C = C.sibling;
              }
              X = xu(N, R.mode, X), X.return = R, R = X;
            }
            return v(R);
          case j:
            return N = Zi(N), Gt(
              R,
              C,
              N,
              X
            );
        }
        if (Z(N))
          return ut(
            R,
            C,
            N,
            X
          );
        if ($(N)) {
          if (mt = $(N), typeof mt != "function") throw Error(l(150));
          return N = mt.call(N), gt(
            R,
            C,
            N,
            X
          );
        }
        if (typeof N.then == "function")
          return Gt(
            R,
            C,
            so(N),
            X
          );
        if (N.$$typeof === _)
          return Gt(
            R,
            C,
            ao(R, N),
            X
          );
        uo(R, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, C !== null && C.tag === 6 ? (a(R, C.sibling), X = c(C, N), X.return = R, R = X) : (a(R, C), X = bu(N, R.mode, X), X.return = R, R = X), v(R)) : a(R, C);
    }
    return function(R, C, N, X) {
      try {
        _r = 0;
        var mt = Gt(
          R,
          C,
          N,
          X
        );
        return Ba = null, mt;
      } catch (dt) {
        if (dt === Va || dt === lo) throw dt;
        var Nt = Ke(29, dt, null, R.mode);
        return Nt.lanes = X, Nt.return = R, Nt;
      } finally {
      }
    };
  }
  var Ji = wp(!0), Sp = wp(!1), ui = !1;
  function Ou(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function _u(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ci(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function fi(t, n, a) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Vt & 2) !== 0) {
      var c = o.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), o.pending = n, n = to(t), rp(t, null, a), n;
    }
    return $l(t, o, n, a), to(t);
  }
  function Lr(t, n, a) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (a & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, a |= o, n.lanes = a, dd(t, a);
    }
  }
  function Nu(t, n) {
    var a = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, a === o)) {
      var c = null, h = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var v = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          h === null ? c = h = v : h = h.next = v, a = a.next;
        } while (a !== null);
        h === null ? c = h = n : h = h.next = n;
      } else c = h = n;
      a = {
        baseState: o.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = n : t.next = n, a.lastBaseUpdate = n;
  }
  var Lu = !1;
  function Vr() {
    if (Lu) {
      var t = La;
      if (t !== null) throw t;
    }
  }
  function Br(t, n, a, o) {
    Lu = !1;
    var c = t.updateQueue;
    ui = !1;
    var h = c.firstBaseUpdate, v = c.lastBaseUpdate, w = c.shared.pending;
    if (w !== null) {
      c.shared.pending = null;
      var E = w, L = E.next;
      E.next = null, v === null ? h = L : v.next = L, v = E;
      var Y = t.alternate;
      Y !== null && (Y = Y.updateQueue, w = Y.lastBaseUpdate, w !== v && (w === null ? Y.firstBaseUpdate = L : w.next = L, Y.lastBaseUpdate = E));
    }
    if (h !== null) {
      var P = c.baseState;
      v = 0, Y = L = E = null, w = h;
      do {
        var V = w.lane & -536870913, U = V !== w.lane;
        if (U ? (Rt & V) === V : (o & V) === V) {
          V !== 0 && V === Na && (Lu = !0), Y !== null && (Y = Y.next = {
            lane: 0,
            tag: w.tag,
            payload: w.payload,
            callback: null,
            next: null
          });
          t: {
            var ut = t, gt = w;
            V = n;
            var Gt = a;
            switch (gt.tag) {
              case 1:
                if (ut = gt.payload, typeof ut == "function") {
                  P = ut.call(Gt, P, V);
                  break t;
                }
                P = ut;
                break t;
              case 3:
                ut.flags = ut.flags & -65537 | 128;
              case 0:
                if (ut = gt.payload, V = typeof ut == "function" ? ut.call(Gt, P, V) : ut, V == null) break t;
                P = y({}, P, V);
                break t;
              case 2:
                ui = !0;
            }
          }
          V = w.callback, V !== null && (t.flags |= 64, U && (t.flags |= 8192), U = c.callbacks, U === null ? c.callbacks = [V] : U.push(V));
        } else
          U = {
            lane: V,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null
          }, Y === null ? (L = Y = U, E = P) : Y = Y.next = U, v |= V;
        if (w = w.next, w === null) {
          if (w = c.shared.pending, w === null)
            break;
          U = w, w = U.next, U.next = null, c.lastBaseUpdate = U, c.shared.pending = null;
        }
      } while (!0);
      Y === null && (E = P), c.baseState = E, c.firstBaseUpdate = L, c.lastBaseUpdate = Y, h === null && (c.shared.lanes = 0), gi |= v, t.lanes = v, t.memoizedState = P;
    }
  }
  function Tp(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function Ep(t, n) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        Tp(a[t], n);
  }
  var Ua = k(null), co = k(0);
  function Ap(t, n) {
    t = Jn, T(co, t), T(Ua, n), Jn = t | n.baseLanes;
  }
  function Vu() {
    T(co, Jn), T(Ua, Ua.current);
  }
  function Bu() {
    Jn = co.current, q(Ua), q(co);
  }
  var Ze = k(null), cn = null;
  function hi(t) {
    var n = t.alternate;
    T(ie, ie.current & 1), T(Ze, t), cn === null && (n === null || Ua.current !== null || n.memoizedState !== null) && (cn = t);
  }
  function Uu(t) {
    T(ie, ie.current), T(Ze, t), cn === null && (cn = t);
  }
  function kp(t) {
    t.tag === 22 ? (T(ie, ie.current), T(Ze, t), cn === null && (cn = t)) : di();
  }
  function di() {
    T(ie, ie.current), T(Ze, Ze.current);
  }
  function Ie(t) {
    q(Ze), cn === t && (cn = null), q(ie);
  }
  var ie = k(0);
  function fo(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var a = n.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Xc(a) || Pc(a)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Gn = 0, Tt = null, qt = null, le = null, ho = !1, ja = !1, Wi = !1, po = 0, Ur = 0, Ha = null, ww = 0;
  function ee() {
    throw Error(l(321));
  }
  function ju(t, n) {
    if (n === null) return !1;
    for (var a = 0; a < n.length && a < t.length; a++)
      if (!Qe(t[a], n[a])) return !1;
    return !0;
  }
  function Hu(t, n, a, o, c, h) {
    return Gn = h, Tt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = t === null || t.memoizedState === null ? um : ec, Wi = !1, h = a(o, c), Wi = !1, ja && (h = Mp(
      n,
      a,
      o,
      c
    )), Cp(t), h;
  }
  function Cp(t) {
    O.H = qr;
    var n = qt !== null && qt.next !== null;
    if (Gn = 0, le = qt = Tt = null, ho = !1, Ur = 0, Ha = null, n) throw Error(l(300));
    t === null || oe || (t = t.dependencies, t !== null && io(t) && (oe = !0));
  }
  function Mp(t, n, a, o) {
    Tt = t;
    var c = 0;
    do {
      if (ja && (Ha = null), Ur = 0, ja = !1, 25 <= c) throw Error(l(301));
      if (c += 1, le = qt = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      O.H = cm, h = n(a, o);
    } while (ja);
    return h;
  }
  function Sw() {
    var t = O.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? jr(n) : n, t = t.useState()[0], (qt !== null ? qt.memoizedState : null) !== t && (Tt.flags |= 1024), n;
  }
  function qu() {
    var t = po !== 0;
    return po = 0, t;
  }
  function Yu(t, n, a) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~a;
  }
  function Gu(t) {
    if (ho) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      ho = !1;
    }
    Gn = 0, le = qt = Tt = null, ja = !1, Ur = po = 0, Ha = null;
  }
  function ze() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return le === null ? Tt.memoizedState = le = t : le = le.next = t, le;
  }
  function ae() {
    if (qt === null) {
      var t = Tt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = qt.next;
    var n = le === null ? Tt.memoizedState : le.next;
    if (n !== null)
      le = n, qt = t;
    else {
      if (t === null)
        throw Tt.alternate === null ? Error(l(467)) : Error(l(310));
      qt = t, t = {
        memoizedState: qt.memoizedState,
        baseState: qt.baseState,
        baseQueue: qt.baseQueue,
        queue: qt.queue,
        next: null
      }, le === null ? Tt.memoizedState = le = t : le = le.next = t;
    }
    return le;
  }
  function mo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function jr(t) {
    var n = Ur;
    return Ur += 1, Ha === null && (Ha = []), t = vp(Ha, t, n), n = Tt, (le === null ? n.memoizedState : le.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? um : ec), t;
  }
  function go(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return jr(t);
      if (t.$$typeof === _) return be(t);
    }
    throw Error(l(438, String(t)));
  }
  function Xu(t) {
    var n = null, a = Tt.updateQueue;
    if (a !== null && (n = a.memoCache), n == null) {
      var o = Tt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), a === null && (a = mo(), Tt.updateQueue = a), a.memoCache = n, a = n.data[n.index], a === void 0)
      for (a = n.data[n.index] = Array(t), o = 0; o < t; o++)
        a[o] = et;
    return n.index++, a;
  }
  function Xn(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function yo(t) {
    var n = ae();
    return Pu(n, qt, t);
  }
  function Pu(t, n, a) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = a;
    var c = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (c !== null) {
        var v = c.next;
        c.next = h.next, h.next = v;
      }
      n.baseQueue = c = h, o.pending = null;
    }
    if (h = t.baseState, c === null) t.memoizedState = h;
    else {
      n = c.next;
      var w = v = null, E = null, L = n, Y = !1;
      do {
        var P = L.lane & -536870913;
        if (P !== L.lane ? (Rt & P) === P : (Gn & P) === P) {
          var V = L.revertLane;
          if (V === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }), P === Na && (Y = !0);
          else if ((Gn & V) === V) {
            L = L.next, V === Na && (Y = !0);
            continue;
          } else
            P = {
              lane: 0,
              revertLane: L.revertLane,
              gesture: null,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }, E === null ? (w = E = P, v = h) : E = E.next = P, Tt.lanes |= V, gi |= V;
          P = L.action, Wi && a(h, P), h = L.hasEagerState ? L.eagerState : a(h, P);
        } else
          V = {
            lane: P,
            revertLane: L.revertLane,
            gesture: L.gesture,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null
          }, E === null ? (w = E = V, v = h) : E = E.next = V, Tt.lanes |= P, gi |= P;
        L = L.next;
      } while (L !== null && L !== n);
      if (E === null ? v = h : E.next = w, !Qe(h, t.memoizedState) && (oe = !0, Y && (a = La, a !== null)))
        throw a;
      t.memoizedState = h, t.baseState = v, t.baseQueue = E, o.lastRenderedState = h;
    }
    return c === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Fu(t) {
    var n = ae(), a = n.queue;
    if (a === null) throw Error(l(311));
    a.lastRenderedReducer = t;
    var o = a.dispatch, c = a.pending, h = n.memoizedState;
    if (c !== null) {
      a.pending = null;
      var v = c = c.next;
      do
        h = t(h, v.action), v = v.next;
      while (v !== c);
      Qe(h, n.memoizedState) || (oe = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), a.lastRenderedState = h;
    }
    return [h, o];
  }
  function zp(t, n, a) {
    var o = Tt, c = ae(), h = _t;
    if (h) {
      if (a === void 0) throw Error(l(407));
      a = a();
    } else a = n();
    var v = !Qe(
      (qt || c).memoizedState,
      a
    );
    if (v && (c.memoizedState = a, oe = !0), c = c.queue, Zu(Op.bind(null, o, c, t), [
      t
    ]), c.getSnapshot !== n || v || le !== null && le.memoizedState.tag & 1) {
      if (o.flags |= 2048, qa(
        9,
        { destroy: void 0 },
        Rp.bind(
          null,
          o,
          c,
          a,
          n
        ),
        null
      ), Ft === null) throw Error(l(349));
      h || (Gn & 127) !== 0 || Dp(o, n, a);
    }
    return a;
  }
  function Dp(t, n, a) {
    t.flags |= 16384, t = { getSnapshot: n, value: a }, n = Tt.updateQueue, n === null ? (n = mo(), Tt.updateQueue = n, n.stores = [t]) : (a = n.stores, a === null ? n.stores = [t] : a.push(t));
  }
  function Rp(t, n, a, o) {
    n.value = a, n.getSnapshot = o, _p(n) && Np(t);
  }
  function Op(t, n, a) {
    return a(function() {
      _p(n) && Np(t);
    });
  }
  function _p(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var a = n();
      return !Qe(t, a);
    } catch {
      return !0;
    }
  }
  function Np(t) {
    var n = Gi(t, 2);
    n !== null && qe(n, t, 2);
  }
  function Qu(t) {
    var n = ze();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), Wi) {
        Ne(!0);
        try {
          a();
        } finally {
          Ne(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xn,
      lastRenderedState: t
    }, n;
  }
  function Lp(t, n, a, o) {
    return t.baseState = a, Pu(
      t,
      qt,
      typeof o == "function" ? o : Xn
    );
  }
  function Tw(t, n, a, o, c) {
    if (xo(t)) throw Error(l(485));
    if (t = n.action, t !== null) {
      var h = {
        payload: c,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(v) {
          h.listeners.push(v);
        }
      };
      O.T !== null ? a(!0) : h.isTransition = !1, o(h), a = n.pending, a === null ? (h.next = n.pending = h, Vp(n, h)) : (h.next = a.next, n.pending = a.next = h);
    }
  }
  function Vp(t, n) {
    var a = n.action, o = n.payload, c = t.state;
    if (n.isTransition) {
      var h = O.T, v = {};
      O.T = v;
      try {
        var w = a(c, o), E = O.S;
        E !== null && E(v, w), Bp(t, n, w);
      } catch (L) {
        Ku(t, n, L);
      } finally {
        h !== null && v.types !== null && (h.types = v.types), O.T = h;
      }
    } else
      try {
        h = a(c, o), Bp(t, n, h);
      } catch (L) {
        Ku(t, n, L);
      }
  }
  function Bp(t, n, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(o) {
        Up(t, n, o);
      },
      function(o) {
        return Ku(t, n, o);
      }
    ) : Up(t, n, a);
  }
  function Up(t, n, a) {
    n.status = "fulfilled", n.value = a, jp(n), t.state = a, n = t.pending, n !== null && (a = n.next, a === n ? t.pending = null : (a = a.next, n.next = a, Vp(t, a)));
  }
  function Ku(t, n, a) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = a, jp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function jp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Hp(t, n) {
    return n;
  }
  function qp(t, n) {
    if (_t) {
      var a = Ft.formState;
      if (a !== null) {
        t: {
          var o = Tt;
          if (_t) {
            if (It) {
              e: {
                for (var c = It, h = un; c.nodeType !== 8; ) {
                  if (!h) {
                    c = null;
                    break e;
                  }
                  if (c = fn(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break e;
                  }
                }
                h = c.data, c = h === "F!" || h === "F" ? c : null;
              }
              if (c) {
                It = fn(
                  c.nextSibling
                ), o = c.data === "F!";
                break t;
              }
            }
            oi(o);
          }
          o = !1;
        }
        o && (n = a[0]);
      }
    }
    return a = ze(), a.memoizedState = a.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hp,
      lastRenderedState: n
    }, a.queue = o, a = lm.bind(
      null,
      Tt,
      o
    ), o.dispatch = a, o = Qu(!1), h = tc.bind(
      null,
      Tt,
      !1,
      o.queue
    ), o = ze(), c = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = c, a = Tw.bind(
      null,
      Tt,
      c,
      h,
      a
    ), c.dispatch = a, o.memoizedState = t, [n, a, !1];
  }
  function Yp(t) {
    var n = ae();
    return Gp(n, qt, t);
  }
  function Gp(t, n, a) {
    if (n = Pu(
      t,
      n,
      Hp
    )[0], t = yo(Xn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = jr(n);
      } catch (v) {
        throw v === Va ? lo : v;
      }
    else o = n;
    n = ae();
    var c = n.queue, h = c.dispatch;
    return a !== n.memoizedState && (Tt.flags |= 2048, qa(
      9,
      { destroy: void 0 },
      Ew.bind(null, c, a),
      null
    )), [o, h, t];
  }
  function Ew(t, n) {
    t.action = n;
  }
  function Xp(t) {
    var n = ae(), a = qt;
    if (a !== null)
      return Gp(n, a, t);
    ae(), n = n.memoizedState, a = ae();
    var o = a.queue.dispatch;
    return a.memoizedState = t, [n, o, !1];
  }
  function qa(t, n, a, o) {
    return t = { tag: t, create: a, deps: o, inst: n, next: null }, n = Tt.updateQueue, n === null && (n = mo(), Tt.updateQueue = n), a = n.lastEffect, a === null ? n.lastEffect = t.next = t : (o = a.next, a.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Pp() {
    return ae().memoizedState;
  }
  function vo(t, n, a, o) {
    var c = ze();
    Tt.flags |= t, c.memoizedState = qa(
      1 | n,
      { destroy: void 0 },
      a,
      o === void 0 ? null : o
    );
  }
  function bo(t, n, a, o) {
    var c = ae();
    o = o === void 0 ? null : o;
    var h = c.memoizedState.inst;
    qt !== null && o !== null && ju(o, qt.memoizedState.deps) ? c.memoizedState = qa(n, h, a, o) : (Tt.flags |= t, c.memoizedState = qa(
      1 | n,
      h,
      a,
      o
    ));
  }
  function Fp(t, n) {
    vo(8390656, 8, t, n);
  }
  function Zu(t, n) {
    bo(2048, 8, t, n);
  }
  function Aw(t) {
    Tt.flags |= 4;
    var n = Tt.updateQueue;
    if (n === null)
      n = mo(), Tt.updateQueue = n, n.events = [t];
    else {
      var a = n.events;
      a === null ? n.events = [t] : a.push(t);
    }
  }
  function Qp(t) {
    var n = ae().memoizedState;
    return Aw({ ref: n, nextImpl: t }), function() {
      if ((Vt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Kp(t, n) {
    return bo(4, 2, t, n);
  }
  function Zp(t, n) {
    return bo(4, 4, t, n);
  }
  function Ip(t, n) {
    if (typeof n == "function") {
      t = t();
      var a = n(t);
      return function() {
        typeof a == "function" ? a() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function Jp(t, n, a) {
    a = a != null ? a.concat([t]) : null, bo(4, 4, Ip.bind(null, n, t), a);
  }
  function Iu() {
  }
  function Wp(t, n) {
    var a = ae();
    n = n === void 0 ? null : n;
    var o = a.memoizedState;
    return n !== null && ju(n, o[1]) ? o[0] : (a.memoizedState = [t, n], t);
  }
  function $p(t, n) {
    var a = ae();
    n = n === void 0 ? null : n;
    var o = a.memoizedState;
    if (n !== null && ju(n, o[1]))
      return o[0];
    if (o = t(), Wi) {
      Ne(!0);
      try {
        t();
      } finally {
        Ne(!1);
      }
    }
    return a.memoizedState = [o, n], o;
  }
  function Ju(t, n, a) {
    return a === void 0 || (Gn & 1073741824) !== 0 && (Rt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = a, t = tg(), Tt.lanes |= t, gi |= t, a);
  }
  function tm(t, n, a, o) {
    return Qe(a, n) ? a : Ua.current !== null ? (t = Ju(t, a, o), Qe(t, n) || (oe = !0), t) : (Gn & 42) === 0 || (Gn & 1073741824) !== 0 && (Rt & 261930) === 0 ? (oe = !0, t.memoizedState = a) : (t = tg(), Tt.lanes |= t, gi |= t, n);
  }
  function em(t, n, a, o, c) {
    var h = Q.p;
    Q.p = h !== 0 && 8 > h ? h : 8;
    var v = O.T, w = {};
    O.T = w, tc(t, !1, n, a);
    try {
      var E = c(), L = O.S;
      if (L !== null && L(w, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var Y = xw(
          E,
          o
        );
        Hr(
          t,
          n,
          Y,
          $e(t)
        );
      } else
        Hr(
          t,
          n,
          o,
          $e(t)
        );
    } catch (P) {
      Hr(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: P },
        $e()
      );
    } finally {
      Q.p = h, v !== null && w.types !== null && (v.types = w.types), O.T = v;
    }
  }
  function kw() {
  }
  function Wu(t, n, a, o) {
    if (t.tag !== 5) throw Error(l(476));
    var c = nm(t).queue;
    em(
      t,
      c,
      n,
      nt,
      a === null ? kw : function() {
        return im(t), a(o);
      }
    );
  }
  function nm(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: nt,
      baseState: nt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: nt
      },
      next: null
    };
    var a = {};
    return n.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function im(t) {
    var n = nm(t);
    n.next === null && (n = t.alternate.memoizedState), Hr(
      t,
      n.next.queue,
      {},
      $e()
    );
  }
  function $u() {
    return be(il);
  }
  function am() {
    return ae().memoizedState;
  }
  function rm() {
    return ae().memoizedState;
  }
  function Cw(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = $e();
          t = ci(a);
          var o = fi(n, t, a);
          o !== null && (qe(o, n, a), Lr(o, n, a)), n = { cache: Mu() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Mw(t, n, a) {
    var o = $e();
    a = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xo(t) ? om(n, a) : (a = yu(t, n, a, o), a !== null && (qe(a, t, o), sm(a, n, o)));
  }
  function lm(t, n, a) {
    var o = $e();
    Hr(t, n, a, o);
  }
  function Hr(t, n, a, o) {
    var c = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (xo(t)) om(n, c);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var v = n.lastRenderedState, w = h(v, a);
          if (c.hasEagerState = !0, c.eagerState = w, Qe(w, v))
            return $l(t, n, c, 0), Ft === null && Wl(), !1;
        } catch {
        } finally {
        }
      if (a = yu(t, n, c, o), a !== null)
        return qe(a, t, o), sm(a, n, o), !0;
    }
    return !1;
  }
  function tc(t, n, a, o) {
    if (o = {
      lane: 2,
      revertLane: Oc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xo(t)) {
      if (n) throw Error(l(479));
    } else
      n = yu(
        t,
        a,
        o,
        2
      ), n !== null && qe(n, t, 2);
  }
  function xo(t) {
    var n = t.alternate;
    return t === Tt || n !== null && n === Tt;
  }
  function om(t, n) {
    ja = ho = !0;
    var a = t.pending;
    a === null ? n.next = n : (n.next = a.next, a.next = n), t.pending = n;
  }
  function sm(t, n, a) {
    if ((a & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, a |= o, n.lanes = a, dd(t, a);
    }
  }
  var qr = {
    readContext: be,
    use: go,
    useCallback: ee,
    useContext: ee,
    useEffect: ee,
    useImperativeHandle: ee,
    useLayoutEffect: ee,
    useInsertionEffect: ee,
    useMemo: ee,
    useReducer: ee,
    useRef: ee,
    useState: ee,
    useDebugValue: ee,
    useDeferredValue: ee,
    useTransition: ee,
    useSyncExternalStore: ee,
    useId: ee,
    useHostTransitionStatus: ee,
    useFormState: ee,
    useActionState: ee,
    useOptimistic: ee,
    useMemoCache: ee,
    useCacheRefresh: ee
  };
  qr.useEffectEvent = ee;
  var um = {
    readContext: be,
    use: go,
    useCallback: function(t, n) {
      return ze().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: be,
    useEffect: Fp,
    useImperativeHandle: function(t, n, a) {
      a = a != null ? a.concat([t]) : null, vo(
        4194308,
        4,
        Ip.bind(null, n, t),
        a
      );
    },
    useLayoutEffect: function(t, n) {
      return vo(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      vo(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var a = ze();
      n = n === void 0 ? null : n;
      var o = t();
      if (Wi) {
        Ne(!0);
        try {
          t();
        } finally {
          Ne(!1);
        }
      }
      return a.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, a) {
      var o = ze();
      if (a !== void 0) {
        var c = a(n);
        if (Wi) {
          Ne(!0);
          try {
            a(n);
          } finally {
            Ne(!1);
          }
        }
      } else c = n;
      return o.memoizedState = o.baseState = c, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: c
      }, o.queue = t, t = t.dispatch = Mw.bind(
        null,
        Tt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = ze();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Qu(t);
      var n = t.queue, a = lm.bind(null, Tt, n);
      return n.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var a = ze();
      return Ju(a, t, n);
    },
    useTransition: function() {
      var t = Qu(!1);
      return t = em.bind(
        null,
        Tt,
        t.queue,
        !0,
        !1
      ), ze().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, a) {
      var o = Tt, c = ze();
      if (_t) {
        if (a === void 0)
          throw Error(l(407));
        a = a();
      } else {
        if (a = n(), Ft === null)
          throw Error(l(349));
        (Rt & 127) !== 0 || Dp(o, n, a);
      }
      c.memoizedState = a;
      var h = { value: a, getSnapshot: n };
      return c.queue = h, Fp(Op.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, qa(
        9,
        { destroy: void 0 },
        Rp.bind(
          null,
          o,
          h,
          a,
          n
        ),
        null
      ), a;
    },
    useId: function() {
      var t = ze(), n = Ft.identifierPrefix;
      if (_t) {
        var a = An, o = En;
        a = (o & ~(1 << 32 - Pt(o) - 1)).toString(32) + a, n = "_" + n + "R_" + a, a = po++, 0 < a && (n += "H" + a.toString(32)), n += "_";
      } else
        a = ww++, n = "_" + n + "r_" + a.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: $u,
    useFormState: qp,
    useActionState: qp,
    useOptimistic: function(t) {
      var n = ze();
      n.memoizedState = n.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = a, n = tc.bind(
        null,
        Tt,
        !0,
        a
      ), a.dispatch = n, [t, n];
    },
    useMemoCache: Xu,
    useCacheRefresh: function() {
      return ze().memoizedState = Cw.bind(
        null,
        Tt
      );
    },
    useEffectEvent: function(t) {
      var n = ze(), a = { impl: t };
      return n.memoizedState = a, function() {
        if ((Vt & 2) !== 0)
          throw Error(l(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, ec = {
    readContext: be,
    use: go,
    useCallback: Wp,
    useContext: be,
    useEffect: Zu,
    useImperativeHandle: Jp,
    useInsertionEffect: Kp,
    useLayoutEffect: Zp,
    useMemo: $p,
    useReducer: yo,
    useRef: Pp,
    useState: function() {
      return yo(Xn);
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var a = ae();
      return tm(
        a,
        qt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = yo(Xn)[0], n = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : jr(t),
        n
      ];
    },
    useSyncExternalStore: zp,
    useId: am,
    useHostTransitionStatus: $u,
    useFormState: Yp,
    useActionState: Yp,
    useOptimistic: function(t, n) {
      var a = ae();
      return Lp(a, qt, t, n);
    },
    useMemoCache: Xu,
    useCacheRefresh: rm
  };
  ec.useEffectEvent = Qp;
  var cm = {
    readContext: be,
    use: go,
    useCallback: Wp,
    useContext: be,
    useEffect: Zu,
    useImperativeHandle: Jp,
    useInsertionEffect: Kp,
    useLayoutEffect: Zp,
    useMemo: $p,
    useReducer: Fu,
    useRef: Pp,
    useState: function() {
      return Fu(Xn);
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var a = ae();
      return qt === null ? Ju(a, t, n) : tm(
        a,
        qt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Fu(Xn)[0], n = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : jr(t),
        n
      ];
    },
    useSyncExternalStore: zp,
    useId: am,
    useHostTransitionStatus: $u,
    useFormState: Xp,
    useActionState: Xp,
    useOptimistic: function(t, n) {
      var a = ae();
      return qt !== null ? Lp(a, qt, t, n) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: Xu,
    useCacheRefresh: rm
  };
  cm.useEffectEvent = Qp;
  function nc(t, n, a, o) {
    n = t.memoizedState, a = a(o, n), a = a == null ? n : y({}, n, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var ic = {
    enqueueSetState: function(t, n, a) {
      t = t._reactInternals;
      var o = $e(), c = ci(o);
      c.payload = n, a != null && (c.callback = a), n = fi(t, c, o), n !== null && (qe(n, t, o), Lr(n, t, o));
    },
    enqueueReplaceState: function(t, n, a) {
      t = t._reactInternals;
      var o = $e(), c = ci(o);
      c.tag = 1, c.payload = n, a != null && (c.callback = a), n = fi(t, c, o), n !== null && (qe(n, t, o), Lr(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var a = $e(), o = ci(a);
      o.tag = 2, n != null && (o.callback = n), n = fi(t, o, a), n !== null && (qe(n, t, a), Lr(n, t, a));
    }
  };
  function fm(t, n, a, o, c, h, v) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, v) : n.prototype && n.prototype.isPureReactComponent ? !Cr(a, o) || !Cr(c, h) : !0;
  }
  function hm(t, n, a, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(a, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(a, o), n.state !== t && ic.enqueueReplaceState(n, n.state, null);
  }
  function $i(t, n) {
    var a = n;
    if ("ref" in n) {
      a = {};
      for (var o in n)
        o !== "ref" && (a[o] = n[o]);
    }
    if (t = t.defaultProps) {
      a === n && (a = y({}, a));
      for (var c in t)
        a[c] === void 0 && (a[c] = t[c]);
    }
    return a;
  }
  function dm(t) {
    Jl(t);
  }
  function pm(t) {
    console.error(t);
  }
  function mm(t) {
    Jl(t);
  }
  function wo(t, n) {
    try {
      var a = t.onUncaughtError;
      a(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function gm(t, n, a) {
    try {
      var o = t.onCaughtError;
      o(a.value, {
        componentStack: a.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function ac(t, n, a) {
    return a = ci(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      wo(t, n);
    }, a;
  }
  function ym(t) {
    return t = ci(t), t.tag = 3, t;
  }
  function vm(t, n, a, o) {
    var c = a.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = o.value;
      t.payload = function() {
        return c(h);
      }, t.callback = function() {
        gm(n, a, o);
      };
    }
    var v = a.stateNode;
    v !== null && typeof v.componentDidCatch == "function" && (t.callback = function() {
      gm(n, a, o), typeof c != "function" && (yi === null ? yi = /* @__PURE__ */ new Set([this]) : yi.add(this));
      var w = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: w !== null ? w : ""
      });
    });
  }
  function zw(t, n, a, o, c) {
    if (a.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = a.alternate, n !== null && _a(
        n,
        a,
        c,
        !0
      ), a = Ze.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return cn === null ? _o() : a.alternate === null && ne === 0 && (ne = 3), a.flags &= -257, a.flags |= 65536, a.lanes = c, o === oo ? a.flags |= 16384 : (n = a.updateQueue, n === null ? a.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), zc(t, o, c)), !1;
          case 22:
            return a.flags |= 65536, o === oo ? a.flags |= 16384 : (n = a.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, a.updateQueue = n) : (a = n.retryQueue, a === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : a.add(o)), zc(t, o, c)), !1;
        }
        throw Error(l(435, a.tag));
      }
      return zc(t, o, c), _o(), !1;
    }
    if (_t)
      return n = Ze.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, o !== Tu && (t = Error(l(422), { cause: o }), Dr(ln(t, a)))) : (o !== Tu && (n = Error(l(423), {
        cause: o
      }), Dr(
        ln(n, a)
      )), t = t.current.alternate, t.flags |= 65536, c &= -c, t.lanes |= c, o = ln(o, a), c = ac(
        t.stateNode,
        o,
        c
      ), Nu(t, c), ne !== 4 && (ne = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = ln(h, a), Zr === null ? Zr = [h] : Zr.push(h), ne !== 4 && (ne = 2), n === null) return !0;
    o = ln(o, a), a = n;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = c & -c, a.lanes |= t, t = ac(a.stateNode, o, t), Nu(a, t), !1;
        case 1:
          if (n = a.type, h = a.stateNode, (a.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (yi === null || !yi.has(h))))
            return a.flags |= 65536, c &= -c, a.lanes |= c, c = ym(c), vm(
              c,
              t,
              a,
              o
            ), Nu(a, c), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var rc = Error(l(461)), oe = !1;
  function xe(t, n, a, o) {
    n.child = t === null ? Sp(n, null, a, o) : Ji(
      n,
      t.child,
      a,
      o
    );
  }
  function bm(t, n, a, o, c) {
    a = a.render;
    var h = n.ref;
    if ("ref" in o) {
      var v = {};
      for (var w in o)
        w !== "ref" && (v[w] = o[w]);
    } else v = o;
    return Qi(n), o = Hu(
      t,
      n,
      a,
      v,
      h,
      c
    ), w = qu(), t !== null && !oe ? (Yu(t, n, c), Pn(t, n, c)) : (_t && w && wu(n), n.flags |= 1, xe(t, n, o, c), n.child);
  }
  function xm(t, n, a, o, c) {
    if (t === null) {
      var h = a.type;
      return typeof h == "function" && !vu(h) && h.defaultProps === void 0 && a.compare === null ? (n.tag = 15, n.type = h, wm(
        t,
        n,
        h,
        o,
        c
      )) : (t = eo(
        a.type,
        null,
        o,
        n,
        n.mode,
        c
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !dc(t, c)) {
      var v = h.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Cr, a(v, o) && t.ref === n.ref)
        return Pn(t, n, c);
    }
    return n.flags |= 1, t = jn(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function wm(t, n, a, o, c) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Cr(h, o) && t.ref === n.ref)
        if (oe = !1, n.pendingProps = o = h, dc(t, c))
          (t.flags & 131072) !== 0 && (oe = !0);
        else
          return n.lanes = t.lanes, Pn(t, n, c);
    }
    return lc(
      t,
      n,
      a,
      o,
      c
    );
  }
  function Sm(t, n, a, o) {
    var c = o.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | a : a, t !== null) {
          for (o = n.child = t.child, c = 0; o !== null; )
            c = c | o.lanes | o.childLanes, o = o.sibling;
          o = c & ~h;
        } else o = 0, n.child = null;
        return Tm(
          t,
          n,
          h,
          a,
          o
        );
      }
      if ((a & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ro(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Ap(n, h) : Vu(), kp(n);
      else
        return o = n.lanes = 536870912, Tm(
          t,
          n,
          h !== null ? h.baseLanes | a : a,
          a,
          o
        );
    } else
      h !== null ? (ro(n, h.cachePool), Ap(n, h), di(), n.memoizedState = null) : (t !== null && ro(n, null), Vu(), di());
    return xe(t, n, c, a), n.child;
  }
  function Yr(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Tm(t, n, a, o, c) {
    var h = Du();
    return h = h === null ? null : { parent: re._currentValue, pool: h }, n.memoizedState = {
      baseLanes: a,
      cachePool: h
    }, t !== null && ro(n, null), Vu(), kp(n), t !== null && _a(t, n, o, !0), n.childLanes = c, null;
  }
  function So(t, n) {
    return n = Eo(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Em(t, n, a) {
    return Ji(n, t.child, null, a), t = So(n, n.pendingProps), t.flags |= 2, Ie(n), n.memoizedState = null, t;
  }
  function Dw(t, n, a) {
    var o = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (_t) {
        if (o.mode === "hidden")
          return t = So(n, o), n.lanes = 536870912, Yr(null, t);
        if (Uu(n), (t = It) ? (t = Vg(
          t,
          un
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: ri !== null ? { id: En, overflow: An } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = op(t), a.return = n, n.child = a, ve = n, It = null)) : t = null, t === null) throw oi(n);
        return n.lanes = 536870912, null;
      }
      return So(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var v = h.dehydrated;
      if (Uu(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = Em(
            t,
            n,
            a
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (oe || _a(t, n, a, !1), c = (a & t.childLanes) !== 0, oe || c) {
        if (o = Ft, o !== null && (v = pd(o, a), v !== 0 && v !== h.retryLane))
          throw h.retryLane = v, Gi(t, v), qe(o, t, v), rc;
        _o(), n = Em(
          t,
          n,
          a
        );
      } else
        t = h.treeContext, It = fn(v.nextSibling), ve = n, _t = !0, li = null, un = !1, t !== null && cp(n, t), n = So(n, o), n.flags |= 4096;
      return n;
    }
    return t = jn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function To(t, n) {
    var a = n.ref;
    if (a === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(l(284));
      (t === null || t.ref !== a) && (n.flags |= 4194816);
    }
  }
  function lc(t, n, a, o, c) {
    return Qi(n), a = Hu(
      t,
      n,
      a,
      o,
      void 0,
      c
    ), o = qu(), t !== null && !oe ? (Yu(t, n, c), Pn(t, n, c)) : (_t && o && wu(n), n.flags |= 1, xe(t, n, a, c), n.child);
  }
  function Am(t, n, a, o, c, h) {
    return Qi(n), n.updateQueue = null, a = Mp(
      n,
      o,
      a,
      c
    ), Cp(t), o = qu(), t !== null && !oe ? (Yu(t, n, h), Pn(t, n, h)) : (_t && o && wu(n), n.flags |= 1, xe(t, n, a, h), n.child);
  }
  function km(t, n, a, o, c) {
    if (Qi(n), n.stateNode === null) {
      var h = za, v = a.contextType;
      typeof v == "object" && v !== null && (h = be(v)), h = new a(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ic, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, Ou(n), v = a.contextType, h.context = typeof v == "object" && v !== null ? be(v) : za, h.state = n.memoizedState, v = a.getDerivedStateFromProps, typeof v == "function" && (nc(
        n,
        a,
        v,
        o
      ), h.state = n.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (v = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), v !== h.state && ic.enqueueReplaceState(h, h.state, null), Br(n, o, h, c), Vr(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var w = n.memoizedProps, E = $i(a, w);
      h.props = E;
      var L = h.context, Y = a.contextType;
      v = za, typeof Y == "object" && Y !== null && (v = be(Y));
      var P = a.getDerivedStateFromProps;
      Y = typeof P == "function" || typeof h.getSnapshotBeforeUpdate == "function", w = n.pendingProps !== w, Y || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w || L !== v) && hm(
        n,
        h,
        o,
        v
      ), ui = !1;
      var V = n.memoizedState;
      h.state = V, Br(n, o, h, c), Vr(), L = n.memoizedState, w || V !== L || ui ? (typeof P == "function" && (nc(
        n,
        a,
        P,
        o
      ), L = n.memoizedState), (E = ui || fm(
        n,
        a,
        E,
        o,
        V,
        L,
        v
      )) ? (Y || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = L), h.props = o, h.state = L, h.context = v, o = E) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, _u(t, n), v = n.memoizedProps, Y = $i(a, v), h.props = Y, P = n.pendingProps, V = h.context, L = a.contextType, E = za, typeof L == "object" && L !== null && (E = be(L)), w = a.getDerivedStateFromProps, (L = typeof w == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (v !== P || V !== E) && hm(
        n,
        h,
        o,
        E
      ), ui = !1, V = n.memoizedState, h.state = V, Br(n, o, h, c), Vr();
      var U = n.memoizedState;
      v !== P || V !== U || ui || t !== null && t.dependencies !== null && io(t.dependencies) ? (typeof w == "function" && (nc(
        n,
        a,
        w,
        o
      ), U = n.memoizedState), (Y = ui || fm(
        n,
        a,
        Y,
        o,
        V,
        U,
        E
      ) || t !== null && t.dependencies !== null && io(t.dependencies)) ? (L || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, U, E), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        U,
        E
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || v === t.memoizedProps && V === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || v === t.memoizedProps && V === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = U), h.props = o, h.state = U, h.context = E, o = Y) : (typeof h.componentDidUpdate != "function" || v === t.memoizedProps && V === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || v === t.memoizedProps && V === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, To(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, a = o && typeof a.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = Ji(
      n,
      t.child,
      null,
      c
    ), n.child = Ji(
      n,
      null,
      a,
      c
    )) : xe(t, n, a, c), n.memoizedState = h.state, t = n.child) : t = Pn(
      t,
      n,
      c
    ), t;
  }
  function Cm(t, n, a, o) {
    return Pi(), n.flags |= 256, xe(t, n, a, o), n.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sc(t) {
    return { baseLanes: t, cachePool: gp() };
  }
  function uc(t, n, a) {
    return t = t !== null ? t.childLanes & ~a : 0, n && (t |= We), t;
  }
  function Mm(t, n, a) {
    var o = n.pendingProps, c = !1, h = (n.flags & 128) !== 0, v;
    if ((v = h) || (v = t !== null && t.memoizedState === null ? !1 : (ie.current & 2) !== 0), v && (c = !0, n.flags &= -129), v = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (_t) {
        if (c ? hi(n) : di(), (t = It) ? (t = Vg(
          t,
          un
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: ri !== null ? { id: En, overflow: An } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = op(t), a.return = n, n.child = a, ve = n, It = null)) : t = null, t === null) throw oi(n);
        return Pc(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var w = o.children;
      return o = o.fallback, c ? (di(), c = n.mode, w = Eo(
        { mode: "hidden", children: w },
        c
      ), o = Xi(
        o,
        c,
        a,
        null
      ), w.return = n, o.return = n, w.sibling = o, n.child = w, o = n.child, o.memoizedState = sc(a), o.childLanes = uc(
        t,
        v,
        a
      ), n.memoizedState = oc, Yr(null, o)) : (hi(n), cc(n, w));
    }
    var E = t.memoizedState;
    if (E !== null && (w = E.dehydrated, w !== null)) {
      if (h)
        n.flags & 256 ? (hi(n), n.flags &= -257, n = fc(
          t,
          n,
          a
        )) : n.memoizedState !== null ? (di(), n.child = t.child, n.flags |= 128, n = null) : (di(), w = o.fallback, c = n.mode, o = Eo(
          { mode: "visible", children: o.children },
          c
        ), w = Xi(
          w,
          c,
          a,
          null
        ), w.flags |= 2, o.return = n, w.return = n, o.sibling = w, n.child = o, Ji(
          n,
          t.child,
          null,
          a
        ), o = n.child, o.memoizedState = sc(a), o.childLanes = uc(
          t,
          v,
          a
        ), n.memoizedState = oc, n = Yr(null, o));
      else if (hi(n), Pc(w)) {
        if (v = w.nextSibling && w.nextSibling.dataset, v) var L = v.dgst;
        v = L, o = Error(l(419)), o.stack = "", o.digest = v, Dr({ value: o, source: null, stack: null }), n = fc(
          t,
          n,
          a
        );
      } else if (oe || _a(t, n, a, !1), v = (a & t.childLanes) !== 0, oe || v) {
        if (v = Ft, v !== null && (o = pd(v, a), o !== 0 && o !== E.retryLane))
          throw E.retryLane = o, Gi(t, o), qe(v, t, o), rc;
        Xc(w) || _o(), n = fc(
          t,
          n,
          a
        );
      } else
        Xc(w) ? (n.flags |= 192, n.child = t.child, n = null) : (t = E.treeContext, It = fn(
          w.nextSibling
        ), ve = n, _t = !0, li = null, un = !1, t !== null && cp(n, t), n = cc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (di(), w = o.fallback, c = n.mode, E = t.child, L = E.sibling, o = jn(E, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = E.subtreeFlags & 65011712, L !== null ? w = jn(
      L,
      w
    ) : (w = Xi(
      w,
      c,
      a,
      null
    ), w.flags |= 2), w.return = n, o.return = n, o.sibling = w, n.child = o, Yr(null, o), o = n.child, w = t.child.memoizedState, w === null ? w = sc(a) : (c = w.cachePool, c !== null ? (E = re._currentValue, c = c.parent !== E ? { parent: E, pool: E } : c) : c = gp(), w = {
      baseLanes: w.baseLanes | a,
      cachePool: c
    }), o.memoizedState = w, o.childLanes = uc(
      t,
      v,
      a
    ), n.memoizedState = oc, Yr(t.child, o)) : (hi(n), a = t.child, t = a.sibling, a = jn(a, {
      mode: "visible",
      children: o.children
    }), a.return = n, a.sibling = null, t !== null && (v = n.deletions, v === null ? (n.deletions = [t], n.flags |= 16) : v.push(t)), n.child = a, n.memoizedState = null, a);
  }
  function cc(t, n) {
    return n = Eo(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Eo(t, n) {
    return t = Ke(22, t, null, n), t.lanes = 0, t;
  }
  function fc(t, n, a) {
    return Ji(n, t.child, null, a), t = cc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function zm(t, n, a) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), ku(t.return, n, a);
  }
  function hc(t, n, a, o, c, h) {
    var v = t.memoizedState;
    v === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: a,
      tailMode: c,
      treeForkCount: h
    } : (v.isBackwards = n, v.rendering = null, v.renderingStartTime = 0, v.last = o, v.tail = a, v.tailMode = c, v.treeForkCount = h);
  }
  function Dm(t, n, a) {
    var o = n.pendingProps, c = o.revealOrder, h = o.tail;
    o = o.children;
    var v = ie.current, w = (v & 2) !== 0;
    if (w ? (v = v & 1 | 2, n.flags |= 128) : v &= 1, T(ie, v), xe(t, n, o, a), o = _t ? zr : 0, !w && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && zm(t, a, n);
        else if (t.tag === 19)
          zm(t, a, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (c) {
      case "forwards":
        for (a = n.child, c = null; a !== null; )
          t = a.alternate, t !== null && fo(t) === null && (c = a), a = a.sibling;
        a = c, a === null ? (c = n.child, n.child = null) : (c = a.sibling, a.sibling = null), hc(
          n,
          !1,
          c,
          a,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, c = n.child, n.child = null; c !== null; ) {
          if (t = c.alternate, t !== null && fo(t) === null) {
            n.child = c;
            break;
          }
          t = c.sibling, c.sibling = a, a = c, c = t;
        }
        hc(
          n,
          !0,
          a,
          null,
          h,
          o
        );
        break;
      case "together":
        hc(
          n,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Pn(t, n, a) {
    if (t !== null && (n.dependencies = t.dependencies), gi |= n.lanes, (a & n.childLanes) === 0)
      if (t !== null) {
        if (_a(
          t,
          n,
          a,
          !1
        ), (a & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (t = n.child, a = jn(t, t.pendingProps), n.child = a, a.return = n; t.sibling !== null; )
        t = t.sibling, a = a.sibling = jn(t, t.pendingProps), a.return = n;
      a.sibling = null;
    }
    return n.child;
  }
  function dc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && io(t)));
  }
  function Rw(t, n, a) {
    switch (n.tag) {
      case 3:
        Xt(n, n.stateNode.containerInfo), si(n, re, t.memoizedState.cache), Pi();
        break;
      case 27:
      case 5:
        ke(n);
        break;
      case 4:
        Xt(n, n.stateNode.containerInfo);
        break;
      case 10:
        si(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Uu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (hi(n), n.flags |= 128, null) : (a & n.child.childLanes) !== 0 ? Mm(t, n, a) : (hi(n), t = Pn(
            t,
            n,
            a
          ), t !== null ? t.sibling : null);
        hi(n);
        break;
      case 19:
        var c = (t.flags & 128) !== 0;
        if (o = (a & n.childLanes) !== 0, o || (_a(
          t,
          n,
          a,
          !1
        ), o = (a & n.childLanes) !== 0), c) {
          if (o)
            return Dm(
              t,
              n,
              a
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), T(ie, ie.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, Sm(
          t,
          n,
          a,
          n.pendingProps
        );
      case 24:
        si(n, re, t.memoizedState.cache);
    }
    return Pn(t, n, a);
  }
  function Rm(t, n, a) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        oe = !0;
      else {
        if (!dc(t, a) && (n.flags & 128) === 0)
          return oe = !1, Rw(
            t,
            n,
            a
          );
        oe = (t.flags & 131072) !== 0;
      }
    else
      oe = !1, _t && (n.flags & 1048576) !== 0 && up(n, zr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = Zi(n.elementType), n.type = t, typeof t == "function")
            vu(t) ? (o = $i(t, o), n.tag = 1, n = km(
              null,
              n,
              t,
              o,
              a
            )) : (n.tag = 0, n = lc(
              null,
              n,
              t,
              o,
              a
            ));
          else {
            if (t != null) {
              var c = t.$$typeof;
              if (c === F) {
                n.tag = 11, n = bm(
                  null,
                  n,
                  t,
                  o,
                  a
                );
                break t;
              } else if (c === I) {
                n.tag = 14, n = xm(
                  null,
                  n,
                  t,
                  o,
                  a
                );
                break t;
              }
            }
            throw n = lt(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return lc(
          t,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 1:
        return o = n.type, c = $i(
          o,
          n.pendingProps
        ), km(
          t,
          n,
          o,
          c,
          a
        );
      case 3:
        t: {
          if (Xt(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          c = h.element, _u(t, n), Br(n, o, null, a);
          var v = n.memoizedState;
          if (o = v.cache, si(n, re, o), o !== h.cache && Cu(
            n,
            [re],
            a,
            !0
          ), Vr(), o = v.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: v.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Cm(
                t,
                n,
                o,
                a
              );
              break t;
            } else if (o !== c) {
              c = ln(
                Error(l(424)),
                n
              ), Dr(c), n = Cm(
                t,
                n,
                o,
                a
              );
              break t;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (It = fn(t.firstChild), ve = n, _t = !0, li = null, un = !0, a = Sp(
                n,
                null,
                o,
                a
              ), n.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (Pi(), o === c) {
              n = Pn(
                t,
                n,
                a
              );
              break t;
            }
            xe(t, n, o, a);
          }
          n = n.child;
        }
        return n;
      case 26:
        return To(t, n), t === null ? (a = Yg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = a : _t || (a = n.type, t = n.pendingProps, o = Ho(
          ot.current
        ).createElement(a), o[ye] = n, o[Le] = t, we(o, a, t), me(o), n.stateNode = o) : n.memoizedState = Yg(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ke(n), t === null && _t && (o = n.stateNode = jg(
          n.type,
          n.pendingProps,
          ot.current
        ), ve = n, un = !0, c = It, wi(n.type) ? (Fc = c, It = fn(o.firstChild)) : It = c), xe(
          t,
          n,
          n.pendingProps.children,
          a
        ), To(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && _t && ((c = o = It) && (o = oS(
          o,
          n.type,
          n.pendingProps,
          un
        ), o !== null ? (n.stateNode = o, ve = n, It = fn(o.firstChild), un = !1, c = !0) : c = !1), c || oi(n)), ke(n), c = n.type, h = n.pendingProps, v = t !== null ? t.memoizedProps : null, o = h.children, qc(c, h) ? o = null : v !== null && qc(c, v) && (n.flags |= 32), n.memoizedState !== null && (c = Hu(
          t,
          n,
          Sw,
          null,
          null,
          a
        ), il._currentValue = c), To(t, n), xe(t, n, o, a), n.child;
      case 6:
        return t === null && _t && ((t = a = It) && (a = sS(
          a,
          n.pendingProps,
          un
        ), a !== null ? (n.stateNode = a, ve = n, It = null, t = !0) : t = !1), t || oi(n)), null;
      case 13:
        return Mm(t, n, a);
      case 4:
        return Xt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = Ji(
          n,
          null,
          o,
          a
        ) : xe(t, n, o, a), n.child;
      case 11:
        return bm(
          t,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 7:
        return xe(
          t,
          n,
          n.pendingProps,
          a
        ), n.child;
      case 8:
        return xe(
          t,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 12:
        return xe(
          t,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 10:
        return o = n.pendingProps, si(n, n.type, o.value), xe(t, n, o.children, a), n.child;
      case 9:
        return c = n.type._context, o = n.pendingProps.children, Qi(n), c = be(c), o = o(c), n.flags |= 1, xe(t, n, o, a), n.child;
      case 14:
        return xm(
          t,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 15:
        return wm(
          t,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 19:
        return Dm(t, n, a);
      case 31:
        return Dw(t, n, a);
      case 22:
        return Sm(
          t,
          n,
          a,
          n.pendingProps
        );
      case 24:
        return Qi(n), o = be(re), t === null ? (c = Du(), c === null && (c = Ft, h = Mu(), c.pooledCache = h, h.refCount++, h !== null && (c.pooledCacheLanes |= a), c = h), n.memoizedState = { parent: o, cache: c }, Ou(n), si(n, re, c)) : ((t.lanes & a) !== 0 && (_u(t, n), Br(n, null, null, a), Vr()), c = t.memoizedState, h = n.memoizedState, c.parent !== o ? (c = { parent: o, cache: o }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), si(n, re, o)) : (o = h.cache, si(n, re, o), o !== c.cache && Cu(
          n,
          [re],
          a,
          !0
        ))), xe(
          t,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function Fn(t) {
    t.flags |= 4;
  }
  function pc(t, n, a, o, c) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (c & 335544128) === c)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ag()) t.flags |= 8192;
        else
          throw Ii = oo, Ru;
    } else t.flags &= -16777217;
  }
  function Om(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Qg(n))
      if (ag()) t.flags |= 8192;
      else
        throw Ii = oo, Ru;
  }
  function Ao(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? fd() : 536870912, t.lanes |= n, Pa |= n);
  }
  function Gr(t, n) {
    if (!_t)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = t.tail;
          for (var o = null; a !== null; )
            a.alternate !== null && (o = a), a = a.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Jt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, a = 0, o = 0;
    if (n)
      for (var c = t.child; c !== null; )
        a |= c.lanes | c.childLanes, o |= c.subtreeFlags & 65011712, o |= c.flags & 65011712, c.return = t, c = c.sibling;
    else
      for (c = t.child; c !== null; )
        a |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = t, c = c.sibling;
    return t.subtreeFlags |= o, t.childLanes = a, n;
  }
  function Ow(t, n, a) {
    var o = n.pendingProps;
    switch (Su(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Jt(n), null;
      case 1:
        return Jt(n), null;
      case 3:
        return a = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Yn(re), bt(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (Oa(n) ? Fn(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Eu())), Jt(n), null;
      case 26:
        var c = n.type, h = n.memoizedState;
        return t === null ? (Fn(n), h !== null ? (Jt(n), Om(n, h)) : (Jt(n), pc(
          n,
          c,
          null,
          o,
          a
        ))) : h ? h !== t.memoizedState ? (Fn(n), Jt(n), Om(n, h)) : (Jt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Fn(n), Jt(n), pc(
          n,
          c,
          t,
          o,
          a
        )), null;
      case 27:
        if (Oe(n), a = ot.current, c = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Fn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Jt(n), null;
          }
          t = at.current, Oa(n) ? fp(n) : (t = jg(c, o, a), n.stateNode = t, Fn(n));
        }
        return Jt(n), null;
      case 5:
        if (Oe(n), c = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Fn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Jt(n), null;
          }
          if (h = at.current, Oa(n))
            fp(n);
          else {
            var v = Ho(
              ot.current
            );
            switch (h) {
              case 1:
                h = v.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                h = v.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    h = v.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    h = v.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    h = v.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? v.createElement("select", {
                      is: o.is
                    }) : v.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? v.createElement(c, { is: o.is }) : v.createElement(c);
                }
            }
            h[ye] = n, h[Le] = o;
            t: for (v = n.child; v !== null; ) {
              if (v.tag === 5 || v.tag === 6)
                h.appendChild(v.stateNode);
              else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
                v.child.return = v, v = v.child;
                continue;
              }
              if (v === n) break t;
              for (; v.sibling === null; ) {
                if (v.return === null || v.return === n)
                  break t;
                v = v.return;
              }
              v.sibling.return = v.return, v = v.sibling;
            }
            n.stateNode = h;
            t: switch (we(h, c, o), c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break t;
              case "img":
                o = !0;
                break t;
              default:
                o = !1;
            }
            o && Fn(n);
          }
        }
        return Jt(n), pc(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          a
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Fn(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = ot.current, Oa(n)) {
            if (t = n.stateNode, a = n.memoizedProps, o = null, c = ve, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  o = c.memoizedProps;
              }
            t[ye] = n, t = !!(t.nodeValue === a || o !== null && o.suppressHydrationWarning === !0 || Mg(t.nodeValue, a)), t || oi(n, !0);
          } else
            t = Ho(t).createTextNode(
              o
            ), t[ye] = n, n.stateNode = t;
        }
        return Jt(n), null;
      case 31:
        if (a = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Oa(n), a !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ye] = n;
            } else
              Pi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Jt(n), t = !1;
          } else
            a = Eu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), t = !0;
          if (!t)
            return n.flags & 256 ? (Ie(n), n) : (Ie(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Jt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (c = Oa(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!c) throw Error(l(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
              c[ye] = n;
            } else
              Pi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Jt(n), c = !1;
          } else
            c = Eu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (Ie(n), n) : (Ie(n), null);
        }
        return Ie(n), (n.flags & 128) !== 0 ? (n.lanes = a, n) : (a = o !== null, t = t !== null && t.memoizedState !== null, a && (o = n.child, c = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (c = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== c && (o.flags |= 2048)), a !== t && a && (n.child.flags |= 8192), Ao(n, n.updateQueue), Jt(n), null);
      case 4:
        return bt(), t === null && Vc(n.stateNode.containerInfo), Jt(n), null;
      case 10:
        return Yn(n.type), Jt(n), null;
      case 19:
        if (q(ie), o = n.memoizedState, o === null) return Jt(n), null;
        if (c = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (c) Gr(o, !1);
          else {
            if (ne !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = fo(t), h !== null) {
                  for (n.flags |= 128, Gr(o, !1), t = h.updateQueue, n.updateQueue = t, Ao(n, t), n.subtreeFlags = 0, t = a, a = n.child; a !== null; )
                    lp(a, t), a = a.sibling;
                  return T(
                    ie,
                    ie.current & 1 | 2
                  ), _t && Hn(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ce() > Do && (n.flags |= 128, c = !0, Gr(o, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (t = fo(h), t !== null) {
              if (n.flags |= 128, c = !0, t = t.updateQueue, n.updateQueue = t, Ao(n, t), Gr(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !_t)
                return Jt(n), null;
            } else
              2 * Ce() - o.renderingStartTime > Do && a !== 536870912 && (n.flags |= 128, c = !0, Gr(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ce(), t.sibling = null, a = ie.current, T(
          ie,
          c ? a & 1 | 2 : a & 1
        ), _t && Hn(n, o.treeForkCount), t) : (Jt(n), null);
      case 22:
      case 23:
        return Ie(n), Bu(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (a & 536870912) !== 0 && (n.flags & 128) === 0 && (Jt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Jt(n), a = n.updateQueue, a !== null && Ao(n, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== a && (n.flags |= 2048), t !== null && q(Ki), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), n.memoizedState.cache !== a && (n.flags |= 2048), Yn(re), Jt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function _w(t, n) {
    switch (Su(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Yn(re), bt(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Oe(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Ie(n), n.alternate === null)
            throw Error(l(340));
          Pi();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Ie(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          Pi();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return q(ie), null;
      case 4:
        return bt(), null;
      case 10:
        return Yn(n.type), null;
      case 22:
      case 23:
        return Ie(n), Bu(), t !== null && q(Ki), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Yn(re), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function _m(t, n) {
    switch (Su(n), n.tag) {
      case 3:
        Yn(re), bt();
        break;
      case 26:
      case 27:
      case 5:
        Oe(n);
        break;
      case 4:
        bt();
        break;
      case 31:
        n.memoizedState !== null && Ie(n);
        break;
      case 13:
        Ie(n);
        break;
      case 19:
        q(ie);
        break;
      case 10:
        Yn(n.type);
        break;
      case 22:
      case 23:
        Ie(n), Bu(), t !== null && q(Ki);
        break;
      case 24:
        Yn(re);
    }
  }
  function Xr(t, n) {
    try {
      var a = n.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        a = c;
        do {
          if ((a.tag & t) === t) {
            o = void 0;
            var h = a.create, v = a.inst;
            o = h(), v.destroy = o;
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (w) {
      Ht(n, n.return, w);
    }
  }
  function pi(t, n, a) {
    try {
      var o = n.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var h = c.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var v = o.inst, w = v.destroy;
            if (w !== void 0) {
              v.destroy = void 0, c = n;
              var E = a, L = w;
              try {
                L();
              } catch (Y) {
                Ht(
                  c,
                  E,
                  Y
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (Y) {
      Ht(n, n.return, Y);
    }
  }
  function Nm(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var a = t.stateNode;
      try {
        Ep(n, a);
      } catch (o) {
        Ht(t, t.return, o);
      }
    }
  }
  function Lm(t, n, a) {
    a.props = $i(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (o) {
      Ht(t, n, o);
    }
  }
  function Pr(t, n) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof a == "function" ? t.refCleanup = a(o) : a.current = o;
      }
    } catch (c) {
      Ht(t, n, c);
    }
  }
  function kn(t, n) {
    var a = t.ref, o = t.refCleanup;
    if (a !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (c) {
          Ht(t, n, c);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (c) {
          Ht(t, n, c);
        }
      else a.current = null;
  }
  function Vm(t) {
    var n = t.type, a = t.memoizedProps, o = t.stateNode;
    try {
      t: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && o.focus();
          break t;
        case "img":
          a.src ? o.src = a.src : a.srcSet && (o.srcset = a.srcSet);
      }
    } catch (c) {
      Ht(t, t.return, c);
    }
  }
  function mc(t, n, a) {
    try {
      var o = t.stateNode;
      eS(o, t.type, a, n), o[Le] = n;
    } catch (c) {
      Ht(t, t.return, c);
    }
  }
  function Bm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && wi(t.type) || t.tag === 4;
  }
  function gc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && wi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function yc(t, n, a) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, n) : (n = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, n.appendChild(t), a = a._reactRootContainer, a != null || n.onclick !== null || (n.onclick = Bn));
    else if (o !== 4 && (o === 27 && wi(t.type) && (a = t.stateNode, n = null), t = t.child, t !== null))
      for (yc(t, n, a), t = t.sibling; t !== null; )
        yc(t, n, a), t = t.sibling;
  }
  function ko(t, n, a) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? a.insertBefore(t, n) : a.appendChild(t);
    else if (o !== 4 && (o === 27 && wi(t.type) && (a = t.stateNode), t = t.child, t !== null))
      for (ko(t, n, a), t = t.sibling; t !== null; )
        ko(t, n, a), t = t.sibling;
  }
  function Um(t) {
    var n = t.stateNode, a = t.memoizedProps;
    try {
      for (var o = t.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      we(n, o, a), n[ye] = t, n[Le] = a;
    } catch (h) {
      Ht(t, t.return, h);
    }
  }
  var Qn = !1, se = !1, vc = !1, jm = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function Nw(t, n) {
    if (t = t.containerInfo, jc = Qo, t = Jd(t), fu(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var o = a.getSelection && a.getSelection();
          if (o && o.rangeCount !== 0) {
            a = o.anchorNode;
            var c = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              a.nodeType, h.nodeType;
            } catch {
              a = null;
              break t;
            }
            var v = 0, w = -1, E = -1, L = 0, Y = 0, P = t, V = null;
            e: for (; ; ) {
              for (var U; P !== a || c !== 0 && P.nodeType !== 3 || (w = v + c), P !== h || o !== 0 && P.nodeType !== 3 || (E = v + o), P.nodeType === 3 && (v += P.nodeValue.length), (U = P.firstChild) !== null; )
                V = P, P = U;
              for (; ; ) {
                if (P === t) break e;
                if (V === a && ++L === c && (w = v), V === h && ++Y === o && (E = v), (U = P.nextSibling) !== null) break;
                P = V, V = P.parentNode;
              }
              P = U;
            }
            a = w === -1 || E === -1 ? null : { start: w, end: E };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Hc = { focusedElem: t, selectionRange: a }, Qo = !1, ge = n; ge !== null; )
      if (n = ge, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, ge = t;
      else
        for (; ge !== null; ) {
          switch (n = ge, h = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (a = 0; a < t.length; a++)
                  c = t[a], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, a = n, c = h.memoizedProps, h = h.memoizedState, o = a.stateNode;
                try {
                  var ut = $i(
                    a.type,
                    c
                  );
                  t = o.getSnapshotBeforeUpdate(
                    ut,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (gt) {
                  Ht(
                    a,
                    a.return,
                    gt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, a = t.nodeType, a === 9)
                  Gc(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Gc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(l(163));
          }
          if (t = n.sibling, t !== null) {
            t.return = n.return, ge = t;
            break;
          }
          ge = n.return;
        }
  }
  function Hm(t, n, a) {
    var o = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Zn(t, a), o & 4 && Xr(5, a);
        break;
      case 1:
        if (Zn(t, a), o & 4)
          if (t = a.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (v) {
              Ht(a, a.return, v);
            }
          else {
            var c = $i(
              a.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                c,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (v) {
              Ht(
                a,
                a.return,
                v
              );
            }
          }
        o & 64 && Nm(a), o & 512 && Pr(a, a.return);
        break;
      case 3:
        if (Zn(t, a), o & 64 && (t = a.updateQueue, t !== null)) {
          if (n = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                n = a.child.stateNode;
                break;
              case 1:
                n = a.child.stateNode;
            }
          try {
            Ep(t, n);
          } catch (v) {
            Ht(a, a.return, v);
          }
        }
        break;
      case 27:
        n === null && o & 4 && Um(a);
      case 26:
      case 5:
        Zn(t, a), n === null && o & 4 && Vm(a), o & 512 && Pr(a, a.return);
        break;
      case 12:
        Zn(t, a);
        break;
      case 31:
        Zn(t, a), o & 4 && Gm(t, a);
        break;
      case 13:
        Zn(t, a), o & 4 && Xm(t, a), o & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = Gw.bind(
          null,
          a
        ), uS(t, a))));
        break;
      case 22:
        if (o = a.memoizedState !== null || Qn, !o) {
          n = n !== null && n.memoizedState !== null || se, c = Qn;
          var h = se;
          Qn = o, (se = n) && !h ? In(
            t,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Zn(t, a), Qn = c, se = h;
        }
        break;
      case 30:
        break;
      default:
        Zn(t, a);
    }
  }
  function qm(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, qm(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Ks(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var $t = null, Be = !1;
  function Kn(t, n, a) {
    for (a = a.child; a !== null; )
      Ym(t, n, a), a = a.sibling;
  }
  function Ym(t, n, a) {
    if (fe && typeof fe.onCommitFiberUnmount == "function")
      try {
        fe.onCommitFiberUnmount(Me, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        se || kn(a, n), Kn(
          t,
          n,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        se || kn(a, n);
        var o = $t, c = Be;
        wi(a.type) && ($t = a.stateNode, Be = !1), Kn(
          t,
          n,
          a
        ), tl(a.stateNode), $t = o, Be = c;
        break;
      case 5:
        se || kn(a, n);
      case 6:
        if (o = $t, c = Be, $t = null, Kn(
          t,
          n,
          a
        ), $t = o, Be = c, $t !== null)
          if (Be)
            try {
              ($t.nodeType === 9 ? $t.body : $t.nodeName === "HTML" ? $t.ownerDocument.body : $t).removeChild(a.stateNode);
            } catch (h) {
              Ht(
                a,
                n,
                h
              );
            }
          else
            try {
              $t.removeChild(a.stateNode);
            } catch (h) {
              Ht(
                a,
                n,
                h
              );
            }
        break;
      case 18:
        $t !== null && (Be ? (t = $t, Ng(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), $a(t)) : Ng($t, a.stateNode));
        break;
      case 4:
        o = $t, c = Be, $t = a.stateNode.containerInfo, Be = !0, Kn(
          t,
          n,
          a
        ), $t = o, Be = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        pi(2, a, n), se || pi(4, a, n), Kn(
          t,
          n,
          a
        );
        break;
      case 1:
        se || (kn(a, n), o = a.stateNode, typeof o.componentWillUnmount == "function" && Lm(
          a,
          n,
          o
        )), Kn(
          t,
          n,
          a
        );
        break;
      case 21:
        Kn(
          t,
          n,
          a
        );
        break;
      case 22:
        se = (o = se) || a.memoizedState !== null, Kn(
          t,
          n,
          a
        ), se = o;
        break;
      default:
        Kn(
          t,
          n,
          a
        );
    }
  }
  function Gm(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        $a(t);
      } catch (a) {
        Ht(n, n.return, a);
      }
    }
  }
  function Xm(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        $a(t);
      } catch (a) {
        Ht(n, n.return, a);
      }
  }
  function Lw(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new jm()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new jm()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Co(t, n) {
    var a = Lw(t);
    n.forEach(function(o) {
      if (!a.has(o)) {
        a.add(o);
        var c = Xw.bind(null, t, o);
        o.then(c, c);
      }
    });
  }
  function Ue(t, n) {
    var a = n.deletions;
    if (a !== null)
      for (var o = 0; o < a.length; o++) {
        var c = a[o], h = t, v = n, w = v;
        t: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (wi(w.type)) {
                $t = w.stateNode, Be = !1;
                break t;
              }
              break;
            case 5:
              $t = w.stateNode, Be = !1;
              break t;
            case 3:
            case 4:
              $t = w.stateNode.containerInfo, Be = !0;
              break t;
          }
          w = w.return;
        }
        if ($t === null) throw Error(l(160));
        Ym(h, v, c), $t = null, Be = !1, h = c.alternate, h !== null && (h.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Pm(n, t), n = n.sibling;
  }
  var vn = null;
  function Pm(t, n) {
    var a = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(n, t), je(t), o & 4 && (pi(3, t, t.return), Xr(3, t), pi(5, t, t.return));
        break;
      case 1:
        Ue(n, t), je(t), o & 512 && (se || a === null || kn(a, a.return)), o & 64 && Qn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? o : a.concat(o))));
        break;
      case 26:
        var c = vn;
        if (Ue(n, t), je(t), o & 512 && (se || a === null || kn(a, a.return)), o & 4) {
          var h = a !== null ? a.memoizedState : null;
          if (o = t.memoizedState, a === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, a = t.memoizedProps, c = c.ownerDocument || c;
                  e: switch (o) {
                    case "title":
                      h = c.getElementsByTagName("title")[0], (!h || h[vr] || h[ye] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = c.createElement(o), c.head.insertBefore(
                        h,
                        c.querySelector("head > title")
                      )), we(h, o, a), h[ye] = t, me(h), o = h;
                      break t;
                    case "link":
                      var v = Pg(
                        "link",
                        "href",
                        c
                      ).get(o + (a.href || ""));
                      if (v) {
                        for (var w = 0; w < v.length; w++)
                          if (h = v[w], h.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && h.getAttribute("rel") === (a.rel == null ? null : a.rel) && h.getAttribute("title") === (a.title == null ? null : a.title) && h.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            v.splice(w, 1);
                            break e;
                          }
                      }
                      h = c.createElement(o), we(h, o, a), c.head.appendChild(h);
                      break;
                    case "meta":
                      if (v = Pg(
                        "meta",
                        "content",
                        c
                      ).get(o + (a.content || ""))) {
                        for (w = 0; w < v.length; w++)
                          if (h = v[w], h.getAttribute("content") === (a.content == null ? null : "" + a.content) && h.getAttribute("name") === (a.name == null ? null : a.name) && h.getAttribute("property") === (a.property == null ? null : a.property) && h.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && h.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            v.splice(w, 1);
                            break e;
                          }
                      }
                      h = c.createElement(o), we(h, o, a), c.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[ye] = t, me(h), o = h;
                }
                t.stateNode = o;
              } else
                Fg(
                  c,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Xg(
                c,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : h.count--, o === null ? Fg(
              c,
              t.type,
              t.stateNode
            ) : Xg(
              c,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && mc(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Ue(n, t), je(t), o & 512 && (se || a === null || kn(a, a.return)), a !== null && o & 4 && mc(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (Ue(n, t), je(t), o & 512 && (se || a === null || kn(a, a.return)), t.flags & 32) {
          c = t.stateNode;
          try {
            Sa(c, "");
          } catch (ut) {
            Ht(t, t.return, ut);
          }
        }
        o & 4 && t.stateNode != null && (c = t.memoizedProps, mc(
          t,
          c,
          a !== null ? a.memoizedProps : c
        )), o & 1024 && (vc = !0);
        break;
      case 6:
        if (Ue(n, t), je(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = o;
          } catch (ut) {
            Ht(t, t.return, ut);
          }
        }
        break;
      case 3:
        if (Go = null, c = vn, vn = qo(n.containerInfo), Ue(n, t), vn = c, je(t), o & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            $a(n.containerInfo);
          } catch (ut) {
            Ht(t, t.return, ut);
          }
        vc && (vc = !1, Fm(t));
        break;
      case 4:
        o = vn, vn = qo(
          t.stateNode.containerInfo
        ), Ue(n, t), je(t), vn = o;
        break;
      case 12:
        Ue(n, t), je(t);
        break;
      case 31:
        Ue(n, t), je(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 13:
        Ue(n, t), je(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (zo = Ce()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 22:
        c = t.memoizedState !== null;
        var E = a !== null && a.memoizedState !== null, L = Qn, Y = se;
        if (Qn = L || c, se = Y || E, Ue(n, t), se = Y, Qn = L, je(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (a === null || E || Qn || se || ta(t)), a = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                E = a = n;
                try {
                  if (h = E.stateNode, c)
                    v = h.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none";
                  else {
                    w = E.stateNode;
                    var P = E.memoizedProps.style, V = P != null && P.hasOwnProperty("display") ? P.display : null;
                    w.style.display = V == null || typeof V == "boolean" ? "" : ("" + V).trim();
                  }
                } catch (ut) {
                  Ht(E, E.return, ut);
                }
              }
            } else if (n.tag === 6) {
              if (a === null) {
                E = n;
                try {
                  E.stateNode.nodeValue = c ? "" : E.memoizedProps;
                } catch (ut) {
                  Ht(E, E.return, ut);
                }
              }
            } else if (n.tag === 18) {
              if (a === null) {
                E = n;
                try {
                  var U = E.stateNode;
                  c ? Lg(U, !0) : Lg(E.stateNode, !1);
                } catch (ut) {
                  Ht(E, E.return, ut);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break t;
              a === n && (a = null), n = n.return;
            }
            a === n && (a = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (a = o.retryQueue, a !== null && (o.retryQueue = null, Co(t, a))));
        break;
      case 19:
        Ue(n, t), je(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ue(n, t), je(t);
    }
  }
  function je(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var a, o = t.return; o !== null; ) {
          if (Bm(o)) {
            a = o;
            break;
          }
          o = o.return;
        }
        if (a == null) throw Error(l(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode, h = gc(t);
            ko(t, h, c);
            break;
          case 5:
            var v = a.stateNode;
            a.flags & 32 && (Sa(v, ""), a.flags &= -33);
            var w = gc(t);
            ko(t, w, v);
            break;
          case 3:
          case 4:
            var E = a.stateNode.containerInfo, L = gc(t);
            yc(
              t,
              L,
              E
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (Y) {
        Ht(t, t.return, Y);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function Fm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        Fm(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function Zn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Hm(t, n.alternate, n), n = n.sibling;
  }
  function ta(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pi(4, n, n.return), ta(n);
          break;
        case 1:
          kn(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && Lm(
            n,
            n.return,
            a
          ), ta(n);
          break;
        case 27:
          tl(n.stateNode);
        case 26:
        case 5:
          kn(n, n.return), ta(n);
          break;
        case 22:
          n.memoizedState === null && ta(n);
          break;
        case 30:
          ta(n);
          break;
        default:
          ta(n);
      }
      t = t.sibling;
    }
  }
  function In(t, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, c = t, h = n, v = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          In(
            c,
            h,
            a
          ), Xr(4, h);
          break;
        case 1:
          if (In(
            c,
            h,
            a
          ), o = h, c = o.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (L) {
              Ht(o, o.return, L);
            }
          if (o = h, c = o.updateQueue, c !== null) {
            var w = o.stateNode;
            try {
              var E = c.shared.hiddenCallbacks;
              if (E !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < E.length; c++)
                  Tp(E[c], w);
            } catch (L) {
              Ht(o, o.return, L);
            }
          }
          a && v & 64 && Nm(h), Pr(h, h.return);
          break;
        case 27:
          Um(h);
        case 26:
        case 5:
          In(
            c,
            h,
            a
          ), a && o === null && v & 4 && Vm(h), Pr(h, h.return);
          break;
        case 12:
          In(
            c,
            h,
            a
          );
          break;
        case 31:
          In(
            c,
            h,
            a
          ), a && v & 4 && Gm(c, h);
          break;
        case 13:
          In(
            c,
            h,
            a
          ), a && v & 4 && Xm(c, h);
          break;
        case 22:
          h.memoizedState === null && In(
            c,
            h,
            a
          ), Pr(h, h.return);
          break;
        case 30:
          break;
        default:
          In(
            c,
            h,
            a
          );
      }
      n = n.sibling;
    }
  }
  function bc(t, n) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && Rr(a));
  }
  function xc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Rr(t));
  }
  function bn(t, n, a, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Qm(
          t,
          n,
          a,
          o
        ), n = n.sibling;
  }
  function Qm(t, n, a, o) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        bn(
          t,
          n,
          a,
          o
        ), c & 2048 && Xr(9, n);
        break;
      case 1:
        bn(
          t,
          n,
          a,
          o
        );
        break;
      case 3:
        bn(
          t,
          n,
          a,
          o
        ), c & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Rr(t)));
        break;
      case 12:
        if (c & 2048) {
          bn(
            t,
            n,
            a,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, v = h.id, w = h.onPostCommit;
            typeof w == "function" && w(
              v,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (E) {
            Ht(n, n.return, E);
          }
        } else
          bn(
            t,
            n,
            a,
            o
          );
        break;
      case 31:
        bn(
          t,
          n,
          a,
          o
        );
        break;
      case 13:
        bn(
          t,
          n,
          a,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, v = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? bn(
          t,
          n,
          a,
          o
        ) : Fr(t, n) : h._visibility & 2 ? bn(
          t,
          n,
          a,
          o
        ) : (h._visibility |= 2, Ya(
          t,
          n,
          a,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && bc(v, n);
        break;
      case 24:
        bn(
          t,
          n,
          a,
          o
        ), c & 2048 && xc(n.alternate, n);
        break;
      default:
        bn(
          t,
          n,
          a,
          o
        );
    }
  }
  function Ya(t, n, a, o, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, v = n, w = a, E = o, L = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          Ya(
            h,
            v,
            w,
            E,
            c
          ), Xr(8, v);
          break;
        case 23:
          break;
        case 22:
          var Y = v.stateNode;
          v.memoizedState !== null ? Y._visibility & 2 ? Ya(
            h,
            v,
            w,
            E,
            c
          ) : Fr(
            h,
            v
          ) : (Y._visibility |= 2, Ya(
            h,
            v,
            w,
            E,
            c
          )), c && L & 2048 && bc(
            v.alternate,
            v
          );
          break;
        case 24:
          Ya(
            h,
            v,
            w,
            E,
            c
          ), c && L & 2048 && xc(v.alternate, v);
          break;
        default:
          Ya(
            h,
            v,
            w,
            E,
            c
          );
      }
      n = n.sibling;
    }
  }
  function Fr(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var a = t, o = n, c = o.flags;
        switch (o.tag) {
          case 22:
            Fr(a, o), c & 2048 && bc(
              o.alternate,
              o
            );
            break;
          case 24:
            Fr(a, o), c & 2048 && xc(o.alternate, o);
            break;
          default:
            Fr(a, o);
        }
        n = n.sibling;
      }
  }
  var Qr = 8192;
  function Ga(t, n, a) {
    if (t.subtreeFlags & Qr)
      for (t = t.child; t !== null; )
        Km(
          t,
          n,
          a
        ), t = t.sibling;
  }
  function Km(t, n, a) {
    switch (t.tag) {
      case 26:
        Ga(
          t,
          n,
          a
        ), t.flags & Qr && t.memoizedState !== null && wS(
          a,
          vn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ga(
          t,
          n,
          a
        );
        break;
      case 3:
      case 4:
        var o = vn;
        vn = qo(t.stateNode.containerInfo), Ga(
          t,
          n,
          a
        ), vn = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = Qr, Qr = 16777216, Ga(
          t,
          n,
          a
        ), Qr = o) : Ga(
          t,
          n,
          a
        ));
        break;
      default:
        Ga(
          t,
          n,
          a
        );
    }
  }
  function Zm(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function Kr(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var o = n[a];
          ge = o, Jm(
            o,
            t
          );
        }
      Zm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Im(t), t = t.sibling;
  }
  function Im(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Kr(t), t.flags & 2048 && pi(9, t, t.return);
        break;
      case 3:
        Kr(t);
        break;
      case 12:
        Kr(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Mo(t)) : Kr(t);
        break;
      default:
        Kr(t);
    }
  }
  function Mo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var o = n[a];
          ge = o, Jm(
            o,
            t
          );
        }
      Zm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          pi(8, n, n.return), Mo(n);
          break;
        case 22:
          a = n.stateNode, a._visibility & 2 && (a._visibility &= -3, Mo(n));
          break;
        default:
          Mo(n);
      }
      t = t.sibling;
    }
  }
  function Jm(t, n) {
    for (; ge !== null; ) {
      var a = ge;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          pi(8, a, n);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var o = a.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Rr(a.memoizedState.cache);
      }
      if (o = a.child, o !== null) o.return = a, ge = o;
      else
        t: for (a = t; ge !== null; ) {
          o = ge;
          var c = o.sibling, h = o.return;
          if (qm(o), o === a) {
            ge = null;
            break t;
          }
          if (c !== null) {
            c.return = h, ge = c;
            break t;
          }
          ge = h;
        }
    }
  }
  var Vw = {
    getCacheForType: function(t) {
      var n = be(re), a = n.data.get(t);
      return a === void 0 && (a = t(), n.data.set(t, a)), a;
    },
    cacheSignal: function() {
      return be(re).controller.signal;
    }
  }, Bw = typeof WeakMap == "function" ? WeakMap : Map, Vt = 0, Ft = null, zt = null, Rt = 0, jt = 0, Je = null, mi = !1, Xa = !1, wc = !1, Jn = 0, ne = 0, gi = 0, ea = 0, Sc = 0, We = 0, Pa = 0, Zr = null, He = null, Tc = !1, zo = 0, Wm = 0, Do = 1 / 0, Ro = null, yi = null, he = 0, vi = null, Fa = null, Wn = 0, Ec = 0, Ac = null, $m = null, Ir = 0, kc = null;
  function $e() {
    return (Vt & 2) !== 0 && Rt !== 0 ? Rt & -Rt : O.T !== null ? Oc() : md();
  }
  function tg() {
    if (We === 0)
      if ((Rt & 536870912) === 0 || _t) {
        var t = Ul;
        Ul <<= 1, (Ul & 3932160) === 0 && (Ul = 262144), We = t;
      } else We = 536870912;
    return t = Ze.current, t !== null && (t.flags |= 32), We;
  }
  function qe(t, n, a) {
    (t === Ft && (jt === 2 || jt === 9) || t.cancelPendingCommit !== null) && (Qa(t, 0), bi(
      t,
      Rt,
      We,
      !1
    )), yr(t, a), ((Vt & 2) === 0 || t !== Ft) && (t === Ft && ((Vt & 2) === 0 && (ea |= a), ne === 4 && bi(
      t,
      Rt,
      We,
      !1
    )), Cn(t));
  }
  function eg(t, n, a) {
    if ((Vt & 6) !== 0) throw Error(l(327));
    var o = !a && (n & 127) === 0 && (n & t.expiredLanes) === 0 || gr(t, n), c = o ? Hw(t, n) : Mc(t, n, !0), h = o;
    do {
      if (c === 0) {
        Xa && !o && bi(t, n, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, h && !Uw(a)) {
          c = Mc(t, n, !1), h = !1;
          continue;
        }
        if (c === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var v = 0;
          else
            v = t.pendingLanes & -536870913, v = v !== 0 ? v : v & 536870912 ? 536870912 : 0;
          if (v !== 0) {
            n = v;
            t: {
              var w = t;
              c = Zr;
              var E = w.current.memoizedState.isDehydrated;
              if (E && (Qa(w, v).flags |= 256), v = Mc(
                w,
                v,
                !1
              ), v !== 2) {
                if (wc && !E) {
                  w.errorRecoveryDisabledLanes |= h, ea |= h, c = 4;
                  break t;
                }
                h = He, He = c, h !== null && (He === null ? He = h : He.push.apply(
                  He,
                  h
                ));
              }
              c = v;
            }
            if (h = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Qa(t, 0), bi(t, n, 0, !0);
          break;
        }
        t: {
          switch (o = t, h = c, h) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              bi(
                o,
                n,
                We,
                !mi
              );
              break t;
            case 2:
              He = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (c = zo + 300 - Ce(), 10 < c)) {
            if (bi(
              o,
              n,
              We,
              !mi
            ), Hl(o, 0, !0) !== 0) break t;
            Wn = n, o.timeoutHandle = Og(
              ng.bind(
                null,
                o,
                a,
                He,
                Ro,
                Tc,
                n,
                We,
                ea,
                Pa,
                mi,
                h,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break t;
          }
          ng(
            o,
            a,
            He,
            Ro,
            Tc,
            n,
            We,
            ea,
            Pa,
            mi,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Cn(t);
  }
  function ng(t, n, a, o, c, h, v, w, E, L, Y, P, V, U) {
    if (t.timeoutHandle = -1, P = n.subtreeFlags, P & 8192 || (P & 16785408) === 16785408) {
      P = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bn
      }, Km(
        n,
        h,
        P
      );
      var ut = (h & 62914560) === h ? zo - Ce() : (h & 4194048) === h ? Wm - Ce() : 0;
      if (ut = SS(
        P,
        ut
      ), ut !== null) {
        Wn = h, t.cancelPendingCommit = ut(
          cg.bind(
            null,
            t,
            n,
            h,
            a,
            o,
            c,
            v,
            w,
            E,
            Y,
            P,
            null,
            V,
            U
          )
        ), bi(t, h, v, !L);
        return;
      }
    }
    cg(
      t,
      n,
      h,
      a,
      o,
      c,
      v,
      w,
      E
    );
  }
  function Uw(t) {
    for (var n = t; ; ) {
      var a = n.tag;
      if ((a === 0 || a === 11 || a === 15) && n.flags & 16384 && (a = n.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var o = 0; o < a.length; o++) {
          var c = a[o], h = c.getSnapshot;
          c = c.value;
          try {
            if (!Qe(h(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = n.child, n.subtreeFlags & 16384 && a !== null)
        a.return = n, n = a;
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function bi(t, n, a, o) {
    n &= ~Sc, n &= ~ea, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var c = n; 0 < c; ) {
      var h = 31 - Pt(c), v = 1 << h;
      o[h] = -1, c &= ~v;
    }
    a !== 0 && hd(t, a, n);
  }
  function Oo() {
    return (Vt & 6) === 0 ? (Jr(0), !1) : !0;
  }
  function Cc() {
    if (zt !== null) {
      if (jt === 0)
        var t = zt.return;
      else
        t = zt, qn = Fi = null, Gu(t), Ba = null, _r = 0, t = zt;
      for (; t !== null; )
        _m(t.alternate, t), t = t.return;
      zt = null;
    }
  }
  function Qa(t, n) {
    var a = t.timeoutHandle;
    a !== -1 && (t.timeoutHandle = -1, aS(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), Wn = 0, Cc(), Ft = t, zt = a = jn(t.current, null), Rt = n, jt = 0, Je = null, mi = !1, Xa = gr(t, n), wc = !1, Pa = We = Sc = ea = gi = ne = 0, He = Zr = null, Tc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var c = 31 - Pt(o), h = 1 << c;
        n |= t[c], o &= ~h;
      }
    return Jn = n, Wl(), a;
  }
  function ig(t, n) {
    Tt = null, O.H = qr, n === Va || n === lo ? (n = bp(), jt = 3) : n === Ru ? (n = bp(), jt = 4) : jt = n === rc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Je = n, zt === null && (ne = 1, wo(
      t,
      ln(n, t.current)
    ));
  }
  function ag() {
    var t = Ze.current;
    return t === null ? !0 : (Rt & 4194048) === Rt ? cn === null : (Rt & 62914560) === Rt || (Rt & 536870912) !== 0 ? t === cn : !1;
  }
  function rg() {
    var t = O.H;
    return O.H = qr, t === null ? qr : t;
  }
  function lg() {
    var t = O.A;
    return O.A = Vw, t;
  }
  function _o() {
    ne = 4, mi || (Rt & 4194048) !== Rt && Ze.current !== null || (Xa = !0), (gi & 134217727) === 0 && (ea & 134217727) === 0 || Ft === null || bi(
      Ft,
      Rt,
      We,
      !1
    );
  }
  function Mc(t, n, a) {
    var o = Vt;
    Vt |= 2;
    var c = rg(), h = lg();
    (Ft !== t || Rt !== n) && (Ro = null, Qa(t, n)), n = !1;
    var v = ne;
    t: do
      try {
        if (jt !== 0 && zt !== null) {
          var w = zt, E = Je;
          switch (jt) {
            case 8:
              Cc(), v = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ze.current === null && (n = !0);
              var L = jt;
              if (jt = 0, Je = null, Ka(t, w, E, L), a && Xa) {
                v = 0;
                break t;
              }
              break;
            default:
              L = jt, jt = 0, Je = null, Ka(t, w, E, L);
          }
        }
        jw(), v = ne;
        break;
      } catch (Y) {
        ig(t, Y);
      }
    while (!0);
    return n && t.shellSuspendCounter++, qn = Fi = null, Vt = o, O.H = c, O.A = h, zt === null && (Ft = null, Rt = 0, Wl()), v;
  }
  function jw() {
    for (; zt !== null; ) og(zt);
  }
  function Hw(t, n) {
    var a = Vt;
    Vt |= 2;
    var o = rg(), c = lg();
    Ft !== t || Rt !== n ? (Ro = null, Do = Ce() + 500, Qa(t, n)) : Xa = gr(
      t,
      n
    );
    t: do
      try {
        if (jt !== 0 && zt !== null) {
          n = zt;
          var h = Je;
          e: switch (jt) {
            case 1:
              jt = 0, Je = null, Ka(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (yp(h)) {
                jt = 0, Je = null, sg(n);
                break;
              }
              n = function() {
                jt !== 2 && jt !== 9 || Ft !== t || (jt = 7), Cn(t);
              }, h.then(n, n);
              break t;
            case 3:
              jt = 7;
              break t;
            case 4:
              jt = 5;
              break t;
            case 7:
              yp(h) ? (jt = 0, Je = null, sg(n)) : (jt = 0, Je = null, Ka(t, n, h, 7));
              break;
            case 5:
              var v = null;
              switch (zt.tag) {
                case 26:
                  v = zt.memoizedState;
                case 5:
                case 27:
                  var w = zt;
                  if (v ? Qg(v) : w.stateNode.complete) {
                    jt = 0, Je = null;
                    var E = w.sibling;
                    if (E !== null) zt = E;
                    else {
                      var L = w.return;
                      L !== null ? (zt = L, No(L)) : zt = null;
                    }
                    break e;
                  }
              }
              jt = 0, Je = null, Ka(t, n, h, 5);
              break;
            case 6:
              jt = 0, Je = null, Ka(t, n, h, 6);
              break;
            case 8:
              Cc(), ne = 6;
              break t;
            default:
              throw Error(l(462));
          }
        }
        qw();
        break;
      } catch (Y) {
        ig(t, Y);
      }
    while (!0);
    return qn = Fi = null, O.H = o, O.A = c, Vt = a, zt !== null ? 0 : (Ft = null, Rt = 0, Wl(), ne);
  }
  function qw() {
    for (; zt !== null && !qs(); )
      og(zt);
  }
  function og(t) {
    var n = Rm(t.alternate, t, Jn);
    t.memoizedProps = t.pendingProps, n === null ? No(t) : zt = n;
  }
  function sg(t) {
    var n = t, a = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Am(
          a,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Rt
        );
        break;
      case 11:
        n = Am(
          a,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Rt
        );
        break;
      case 5:
        Gu(n);
      default:
        _m(a, n), n = zt = lp(n, Jn), n = Rm(a, n, Jn);
    }
    t.memoizedProps = t.pendingProps, n === null ? No(t) : zt = n;
  }
  function Ka(t, n, a, o) {
    qn = Fi = null, Gu(n), Ba = null, _r = 0;
    var c = n.return;
    try {
      if (zw(
        t,
        c,
        n,
        a,
        Rt
      )) {
        ne = 1, wo(
          t,
          ln(a, t.current)
        ), zt = null;
        return;
      }
    } catch (h) {
      if (c !== null) throw zt = c, h;
      ne = 1, wo(
        t,
        ln(a, t.current)
      ), zt = null;
      return;
    }
    n.flags & 32768 ? (_t || o === 1 ? t = !0 : Xa || (Rt & 536870912) !== 0 ? t = !1 : (mi = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ze.current, o !== null && o.tag === 13 && (o.flags |= 16384))), ug(n, t)) : No(n);
  }
  function No(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        ug(
          n,
          mi
        );
        return;
      }
      t = n.return;
      var a = Ow(
        n.alternate,
        n,
        Jn
      );
      if (a !== null) {
        zt = a;
        return;
      }
      if (n = n.sibling, n !== null) {
        zt = n;
        return;
      }
      zt = n = t;
    } while (n !== null);
    ne === 0 && (ne = 5);
  }
  function ug(t, n) {
    do {
      var a = _w(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, zt = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !n && (t = t.sibling, t !== null)) {
        zt = t;
        return;
      }
      zt = t = a;
    } while (t !== null);
    ne = 6, zt = null;
  }
  function cg(t, n, a, o, c, h, v, w, E) {
    t.cancelPendingCommit = null;
    do
      Lo();
    while (he !== 0);
    if ((Vt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= gu, xx(
        t,
        a,
        h,
        v,
        w,
        E
      ), t === Ft && (zt = Ft = null, Rt = 0), Fa = n, vi = t, Wn = a, Ec = h, Ac = c, $m = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Pw(yt, function() {
        return mg(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = O.T, O.T = null, c = Q.p, Q.p = 2, v = Vt, Vt |= 4;
        try {
          Nw(t, n, a);
        } finally {
          Vt = v, Q.p = c, O.T = o;
        }
      }
      he = 1, fg(), hg(), dg();
    }
  }
  function fg() {
    if (he === 1) {
      he = 0;
      var t = vi, n = Fa, a = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        a = O.T, O.T = null;
        var o = Q.p;
        Q.p = 2;
        var c = Vt;
        Vt |= 4;
        try {
          Pm(n, t);
          var h = Hc, v = Jd(t.containerInfo), w = h.focusedElem, E = h.selectionRange;
          if (v !== w && w && w.ownerDocument && Id(
            w.ownerDocument.documentElement,
            w
          )) {
            if (E !== null && fu(w)) {
              var L = E.start, Y = E.end;
              if (Y === void 0 && (Y = L), "selectionStart" in w)
                w.selectionStart = L, w.selectionEnd = Math.min(
                  Y,
                  w.value.length
                );
              else {
                var P = w.ownerDocument || document, V = P && P.defaultView || window;
                if (V.getSelection) {
                  var U = V.getSelection(), ut = w.textContent.length, gt = Math.min(E.start, ut), Gt = E.end === void 0 ? gt : Math.min(E.end, ut);
                  !U.extend && gt > Gt && (v = Gt, Gt = gt, gt = v);
                  var R = Zd(
                    w,
                    gt
                  ), C = Zd(
                    w,
                    Gt
                  );
                  if (R && C && (U.rangeCount !== 1 || U.anchorNode !== R.node || U.anchorOffset !== R.offset || U.focusNode !== C.node || U.focusOffset !== C.offset)) {
                    var N = P.createRange();
                    N.setStart(R.node, R.offset), U.removeAllRanges(), gt > Gt ? (U.addRange(N), U.extend(C.node, C.offset)) : (N.setEnd(C.node, C.offset), U.addRange(N));
                  }
                }
              }
            }
            for (P = [], U = w; U = U.parentNode; )
              U.nodeType === 1 && P.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof w.focus == "function" && w.focus(), w = 0; w < P.length; w++) {
              var X = P[w];
              X.element.scrollLeft = X.left, X.element.scrollTop = X.top;
            }
          }
          Qo = !!jc, Hc = jc = null;
        } finally {
          Vt = c, Q.p = o, O.T = a;
        }
      }
      t.current = n, he = 2;
    }
  }
  function hg() {
    if (he === 2) {
      he = 0;
      var t = vi, n = Fa, a = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        a = O.T, O.T = null;
        var o = Q.p;
        Q.p = 2;
        var c = Vt;
        Vt |= 4;
        try {
          Hm(t, n.alternate, n);
        } finally {
          Vt = c, Q.p = o, O.T = a;
        }
      }
      he = 3;
    }
  }
  function dg() {
    if (he === 4 || he === 3) {
      he = 0, Ys();
      var t = vi, n = Fa, a = Wn, o = $m;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? he = 5 : (he = 0, Fa = vi = null, pg(t, t.pendingLanes));
      var c = t.pendingLanes;
      if (c === 0 && (yi = null), Fs(a), n = n.stateNode, fe && typeof fe.onCommitFiberRoot == "function")
        try {
          fe.onCommitFiberRoot(
            Me,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = O.T, c = Q.p, Q.p = 2, O.T = null;
        try {
          for (var h = t.onRecoverableError, v = 0; v < o.length; v++) {
            var w = o[v];
            h(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          O.T = n, Q.p = c;
        }
      }
      (Wn & 3) !== 0 && Lo(), Cn(t), c = t.pendingLanes, (a & 261930) !== 0 && (c & 42) !== 0 ? t === kc ? Ir++ : (Ir = 0, kc = t) : Ir = 0, Jr(0);
    }
  }
  function pg(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Rr(n)));
  }
  function Lo() {
    return fg(), hg(), dg(), mg();
  }
  function mg() {
    if (he !== 5) return !1;
    var t = vi, n = Ec;
    Ec = 0;
    var a = Fs(Wn), o = O.T, c = Q.p;
    try {
      Q.p = 32 > a ? 32 : a, O.T = null, a = Ac, Ac = null;
      var h = vi, v = Wn;
      if (he = 0, Fa = vi = null, Wn = 0, (Vt & 6) !== 0) throw Error(l(331));
      var w = Vt;
      if (Vt |= 4, Im(h.current), Qm(
        h,
        h.current,
        v,
        a
      ), Vt = w, Jr(0, !1), fe && typeof fe.onPostCommitFiberRoot == "function")
        try {
          fe.onPostCommitFiberRoot(Me, h);
        } catch {
        }
      return !0;
    } finally {
      Q.p = c, O.T = o, pg(t, n);
    }
  }
  function gg(t, n, a) {
    n = ln(a, n), n = ac(t.stateNode, n, 2), t = fi(t, n, 2), t !== null && (yr(t, 2), Cn(t));
  }
  function Ht(t, n, a) {
    if (t.tag === 3)
      gg(t, t, a);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          gg(
            n,
            t,
            a
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (yi === null || !yi.has(o))) {
            t = ln(a, t), a = ym(2), o = fi(n, a, 2), o !== null && (vm(
              a,
              o,
              n,
              t
            ), yr(o, 2), Cn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function zc(t, n, a) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new Bw();
      var c = /* @__PURE__ */ new Set();
      o.set(n, c);
    } else
      c = o.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(n, c));
    c.has(a) || (wc = !0, c.add(a), t = Yw.bind(null, t, n, a), n.then(t, t));
  }
  function Yw(t, n, a) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, Ft === t && (Rt & a) === a && (ne === 4 || ne === 3 && (Rt & 62914560) === Rt && 300 > Ce() - zo ? (Vt & 2) === 0 && Qa(t, 0) : Sc |= a, Pa === Rt && (Pa = 0)), Cn(t);
  }
  function yg(t, n) {
    n === 0 && (n = fd()), t = Gi(t, n), t !== null && (yr(t, n), Cn(t));
  }
  function Gw(t) {
    var n = t.memoizedState, a = 0;
    n !== null && (a = n.retryLane), yg(t, a);
  }
  function Xw(t, n) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, c = t.memoizedState;
        c !== null && (a = c.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(n), yg(t, a);
  }
  function Pw(t, n) {
    return ma(t, n);
  }
  var Vo = null, Za = null, Dc = !1, Bo = !1, Rc = !1, xi = 0;
  function Cn(t) {
    t !== Za && t.next === null && (Za === null ? Vo = Za = t : Za = Za.next = t), Bo = !0, Dc || (Dc = !0, Qw());
  }
  function Jr(t, n) {
    if (!Rc && Bo) {
      Rc = !0;
      do
        for (var a = !1, o = Vo; o !== null; ) {
          if (t !== 0) {
            var c = o.pendingLanes;
            if (c === 0) var h = 0;
            else {
              var v = o.suspendedLanes, w = o.pingedLanes;
              h = (1 << 31 - Pt(42 | t) + 1) - 1, h &= c & ~(v & ~w), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (a = !0, wg(o, h));
          } else
            h = Rt, h = Hl(
              o,
              o === Ft ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || gr(o, h) || (a = !0, wg(o, h));
          o = o.next;
        }
      while (a);
      Rc = !1;
    }
  }
  function Fw() {
    vg();
  }
  function vg() {
    Bo = Dc = !1;
    var t = 0;
    xi !== 0 && iS() && (t = xi);
    for (var n = Ce(), a = null, o = Vo; o !== null; ) {
      var c = o.next, h = bg(o, n);
      h === 0 ? (o.next = null, a === null ? Vo = c : a.next = c, c === null && (Za = a)) : (a = o, (t !== 0 || (h & 3) !== 0) && (Bo = !0)), o = c;
    }
    he !== 0 && he !== 5 || Jr(t), xi !== 0 && (xi = 0);
  }
  function bg(t, n) {
    for (var a = t.suspendedLanes, o = t.pingedLanes, c = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var v = 31 - Pt(h), w = 1 << v, E = c[v];
      E === -1 ? ((w & a) === 0 || (w & o) !== 0) && (c[v] = bx(w, n)) : E <= n && (t.expiredLanes |= w), h &= ~w;
    }
    if (n = Ft, a = Rt, a = Hl(
      t,
      t === n ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, a === 0 || t === n && (jt === 2 || jt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && mr(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || gr(t, a)) {
      if (n = a & -a, n === t.callbackPriority) return n;
      switch (o !== null && mr(o), Fs(a)) {
        case 2:
        case 8:
          a = it;
          break;
        case 32:
          a = yt;
          break;
        case 268435456:
          a = Ut;
          break;
        default:
          a = yt;
      }
      return o = xg.bind(null, t), a = ma(a, o), t.callbackPriority = n, t.callbackNode = a, n;
    }
    return o !== null && o !== null && mr(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function xg(t, n) {
    if (he !== 0 && he !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (Lo() && t.callbackNode !== a)
      return null;
    var o = Rt;
    return o = Hl(
      t,
      t === Ft ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (eg(t, o, n), bg(t, Ce()), t.callbackNode != null && t.callbackNode === a ? xg.bind(null, t) : null);
  }
  function wg(t, n) {
    if (Lo()) return null;
    eg(t, n, !0);
  }
  function Qw() {
    rS(function() {
      (Vt & 6) !== 0 ? ma(
        G,
        Fw
      ) : vg();
    });
  }
  function Oc() {
    if (xi === 0) {
      var t = Na;
      t === 0 && (t = Bl, Bl <<= 1, (Bl & 261888) === 0 && (Bl = 256)), xi = t;
    }
    return xi;
  }
  function Sg(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Xl("" + t);
  }
  function Tg(t, n) {
    var a = n.ownerDocument.createElement("input");
    return a.name = n.name, a.value = n.value, t.id && a.setAttribute("form", t.id), n.parentNode.insertBefore(a, n), t = new FormData(t), a.parentNode.removeChild(a), t;
  }
  function Kw(t, n, a, o, c) {
    if (n === "submit" && a && a.stateNode === c) {
      var h = Sg(
        (c[Le] || null).action
      ), v = o.submitter;
      v && (n = (n = v[Le] || null) ? Sg(n.formAction) : v.getAttribute("formAction"), n !== null && (h = n, v = null));
      var w = new Kl(
        "action",
        "action",
        null,
        o,
        c
      );
      t.push({
        event: w,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (xi !== 0) {
                  var E = v ? Tg(c, v) : new FormData(c);
                  Wu(
                    a,
                    {
                      pending: !0,
                      data: E,
                      method: c.method,
                      action: h
                    },
                    null,
                    E
                  );
                }
              } else
                typeof h == "function" && (w.preventDefault(), E = v ? Tg(c, v) : new FormData(c), Wu(
                  a,
                  {
                    pending: !0,
                    data: E,
                    method: c.method,
                    action: h
                  },
                  h,
                  E
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var _c = 0; _c < mu.length; _c++) {
    var Nc = mu[_c], Zw = Nc.toLowerCase(), Iw = Nc[0].toUpperCase() + Nc.slice(1);
    yn(
      Zw,
      "on" + Iw
    );
  }
  yn(tp, "onAnimationEnd"), yn(ep, "onAnimationIteration"), yn(np, "onAnimationStart"), yn("dblclick", "onDoubleClick"), yn("focusin", "onFocus"), yn("focusout", "onBlur"), yn(hw, "onTransitionRun"), yn(dw, "onTransitionStart"), yn(pw, "onTransitionCancel"), yn(ip, "onTransitionEnd"), xa("onMouseEnter", ["mouseout", "mouseover"]), xa("onMouseLeave", ["mouseout", "mouseover"]), xa("onPointerEnter", ["pointerout", "pointerover"]), xa("onPointerLeave", ["pointerout", "pointerover"]), ji(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ji(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ji("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ji(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ji(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ji(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Wr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Jw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wr)
  );
  function Eg(t, n) {
    n = (n & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var o = t[a], c = o.event;
      o = o.listeners;
      t: {
        var h = void 0;
        if (n)
          for (var v = o.length - 1; 0 <= v; v--) {
            var w = o[v], E = w.instance, L = w.currentTarget;
            if (w = w.listener, E !== h && c.isPropagationStopped())
              break t;
            h = w, c.currentTarget = L;
            try {
              h(c);
            } catch (Y) {
              Jl(Y);
            }
            c.currentTarget = null, h = E;
          }
        else
          for (v = 0; v < o.length; v++) {
            if (w = o[v], E = w.instance, L = w.currentTarget, w = w.listener, E !== h && c.isPropagationStopped())
              break t;
            h = w, c.currentTarget = L;
            try {
              h(c);
            } catch (Y) {
              Jl(Y);
            }
            c.currentTarget = null, h = E;
          }
      }
    }
  }
  function Dt(t, n) {
    var a = n[Qs];
    a === void 0 && (a = n[Qs] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    a.has(o) || (Ag(n, t, 2, !1), a.add(o));
  }
  function Lc(t, n, a) {
    var o = 0;
    n && (o |= 4), Ag(
      a,
      t,
      o,
      n
    );
  }
  var Uo = "_reactListening" + Math.random().toString(36).slice(2);
  function Vc(t) {
    if (!t[Uo]) {
      t[Uo] = !0, vd.forEach(function(a) {
        a !== "selectionchange" && (Jw.has(a) || Lc(a, !1, t), Lc(a, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Uo] || (n[Uo] = !0, Lc("selectionchange", !1, n));
    }
  }
  function Ag(t, n, a, o) {
    switch (ty(n)) {
      case 2:
        var c = AS;
        break;
      case 8:
        c = kS;
        break;
      default:
        c = Jc;
    }
    a = c.bind(
      null,
      n,
      a,
      t
    ), c = void 0, !nu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), o ? c !== void 0 ? t.addEventListener(n, a, {
      capture: !0,
      passive: c
    }) : t.addEventListener(n, a, !0) : c !== void 0 ? t.addEventListener(n, a, {
      passive: c
    }) : t.addEventListener(n, a, !1);
  }
  function Bc(t, n, a, o, c) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var v = o.tag;
        if (v === 3 || v === 4) {
          var w = o.stateNode.containerInfo;
          if (w === c) break;
          if (v === 4)
            for (v = o.return; v !== null; ) {
              var E = v.tag;
              if ((E === 3 || E === 4) && v.stateNode.containerInfo === c)
                return;
              v = v.return;
            }
          for (; w !== null; ) {
            if (v = ya(w), v === null) return;
            if (E = v.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              o = h = v;
              continue t;
            }
            w = w.parentNode;
          }
        }
        o = o.return;
      }
    Dd(function() {
      var L = h, Y = tu(a), P = [];
      t: {
        var V = ap.get(t);
        if (V !== void 0) {
          var U = Kl, ut = t;
          switch (t) {
            case "keypress":
              if (Fl(a) === 0) break t;
            case "keydown":
            case "keyup":
              U = Xx;
              break;
            case "focusin":
              ut = "focus", U = lu;
              break;
            case "focusout":
              ut = "blur", U = lu;
              break;
            case "beforeblur":
            case "afterblur":
              U = lu;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = _d;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Ox;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Qx;
              break;
            case tp:
            case ep:
            case np:
              U = Lx;
              break;
            case ip:
              U = Zx;
              break;
            case "scroll":
            case "scrollend":
              U = Dx;
              break;
            case "wheel":
              U = Jx;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Bx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Ld;
              break;
            case "toggle":
            case "beforetoggle":
              U = $x;
          }
          var gt = (n & 4) !== 0, Gt = !gt && (t === "scroll" || t === "scrollend"), R = gt ? V !== null ? V + "Capture" : null : V;
          gt = [];
          for (var C = L, N; C !== null; ) {
            var X = C;
            if (N = X.stateNode, X = X.tag, X !== 5 && X !== 26 && X !== 27 || N === null || R === null || (X = xr(C, R), X != null && gt.push(
              $r(C, X, N)
            )), Gt) break;
            C = C.return;
          }
          0 < gt.length && (V = new U(
            V,
            ut,
            null,
            a,
            Y
          ), P.push({ event: V, listeners: gt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (V = t === "mouseover" || t === "pointerover", U = t === "mouseout" || t === "pointerout", V && a !== $s && (ut = a.relatedTarget || a.fromElement) && (ya(ut) || ut[ga]))
            break t;
          if ((U || V) && (V = Y.window === Y ? Y : (V = Y.ownerDocument) ? V.defaultView || V.parentWindow : window, U ? (ut = a.relatedTarget || a.toElement, U = L, ut = ut ? ya(ut) : null, ut !== null && (Gt = u(ut), gt = ut.tag, ut !== Gt || gt !== 5 && gt !== 27 && gt !== 6) && (ut = null)) : (U = null, ut = L), U !== ut)) {
            if (gt = _d, X = "onMouseLeave", R = "onMouseEnter", C = "mouse", (t === "pointerout" || t === "pointerover") && (gt = Ld, X = "onPointerLeave", R = "onPointerEnter", C = "pointer"), Gt = U == null ? V : br(U), N = ut == null ? V : br(ut), V = new gt(
              X,
              C + "leave",
              U,
              a,
              Y
            ), V.target = Gt, V.relatedTarget = N, X = null, ya(Y) === L && (gt = new gt(
              R,
              C + "enter",
              ut,
              a,
              Y
            ), gt.target = N, gt.relatedTarget = Gt, X = gt), Gt = X, U && ut)
              e: {
                for (gt = Ww, R = U, C = ut, N = 0, X = R; X; X = gt(X))
                  N++;
                X = 0;
                for (var mt = C; mt; mt = gt(mt))
                  X++;
                for (; 0 < N - X; )
                  R = gt(R), N--;
                for (; 0 < X - N; )
                  C = gt(C), X--;
                for (; N--; ) {
                  if (R === C || C !== null && R === C.alternate) {
                    gt = R;
                    break e;
                  }
                  R = gt(R), C = gt(C);
                }
                gt = null;
              }
            else gt = null;
            U !== null && kg(
              P,
              V,
              U,
              gt,
              !1
            ), ut !== null && Gt !== null && kg(
              P,
              Gt,
              ut,
              gt,
              !0
            );
          }
        }
        t: {
          if (V = L ? br(L) : window, U = V.nodeName && V.nodeName.toLowerCase(), U === "select" || U === "input" && V.type === "file")
            var Nt = Gd;
          else if (qd(V))
            if (Xd)
              Nt = uw;
            else {
              Nt = ow;
              var dt = lw;
            }
          else
            U = V.nodeName, !U || U.toLowerCase() !== "input" || V.type !== "checkbox" && V.type !== "radio" ? L && Ws(L.elementType) && (Nt = Gd) : Nt = sw;
          if (Nt && (Nt = Nt(t, L))) {
            Yd(
              P,
              Nt,
              a,
              Y
            );
            break t;
          }
          dt && dt(t, V, L), t === "focusout" && L && V.type === "number" && L.memoizedProps.value != null && Js(V, "number", V.value);
        }
        switch (dt = L ? br(L) : window, t) {
          case "focusin":
            (qd(dt) || dt.contentEditable === "true") && (ka = dt, hu = L, Mr = null);
            break;
          case "focusout":
            Mr = hu = ka = null;
            break;
          case "mousedown":
            du = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            du = !1, Wd(P, a, Y);
            break;
          case "selectionchange":
            if (fw) break;
          case "keydown":
          case "keyup":
            Wd(P, a, Y);
        }
        var At;
        if (su)
          t: {
            switch (t) {
              case "compositionstart":
                var Ot = "onCompositionStart";
                break t;
              case "compositionend":
                Ot = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Ot = "onCompositionUpdate";
                break t;
            }
            Ot = void 0;
          }
        else
          Aa ? jd(t, a) && (Ot = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (Ot = "onCompositionStart");
        Ot && (Vd && a.locale !== "ko" && (Aa || Ot !== "onCompositionStart" ? Ot === "onCompositionEnd" && Aa && (At = Rd()) : (ai = Y, iu = "value" in ai ? ai.value : ai.textContent, Aa = !0)), dt = jo(L, Ot), 0 < dt.length && (Ot = new Nd(
          Ot,
          t,
          null,
          a,
          Y
        ), P.push({ event: Ot, listeners: dt }), At ? Ot.data = At : (At = Hd(a), At !== null && (Ot.data = At)))), (At = ew ? nw(t, a) : iw(t, a)) && (Ot = jo(L, "onBeforeInput"), 0 < Ot.length && (dt = new Nd(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          Y
        ), P.push({
          event: dt,
          listeners: Ot
        }), dt.data = At)), Kw(
          P,
          t,
          L,
          a,
          Y
        );
      }
      Eg(P, n);
    });
  }
  function $r(t, n, a) {
    return {
      instance: t,
      listener: n,
      currentTarget: a
    };
  }
  function jo(t, n) {
    for (var a = n + "Capture", o = []; t !== null; ) {
      var c = t, h = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || h === null || (c = xr(t, a), c != null && o.unshift(
        $r(t, c, h)
      ), c = xr(t, n), c != null && o.push(
        $r(t, c, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function Ww(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function kg(t, n, a, o, c) {
    for (var h = n._reactName, v = []; a !== null && a !== o; ) {
      var w = a, E = w.alternate, L = w.stateNode;
      if (w = w.tag, E !== null && E === o) break;
      w !== 5 && w !== 26 && w !== 27 || L === null || (E = L, c ? (L = xr(a, h), L != null && v.unshift(
        $r(a, L, E)
      )) : c || (L = xr(a, h), L != null && v.push(
        $r(a, L, E)
      ))), a = a.return;
    }
    v.length !== 0 && t.push({ event: n, listeners: v });
  }
  var $w = /\r\n?/g, tS = /\u0000|\uFFFD/g;
  function Cg(t) {
    return (typeof t == "string" ? t : "" + t).replace($w, `
`).replace(tS, "");
  }
  function Mg(t, n) {
    return n = Cg(n), Cg(t) === n;
  }
  function Yt(t, n, a, o, c, h) {
    switch (a) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Sa(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Sa(t, "" + o);
        break;
      case "className":
        Yl(t, "class", o);
        break;
      case "tabIndex":
        Yl(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Yl(t, a, o);
        break;
      case "style":
        Md(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          Yl(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(a);
          break;
        }
        o = Xl("" + o), t.setAttribute(a, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (a === "formAction" ? (n !== "input" && Yt(t, n, "name", c.name, c, null), Yt(
            t,
            n,
            "formEncType",
            c.formEncType,
            c,
            null
          ), Yt(
            t,
            n,
            "formMethod",
            c.formMethod,
            c,
            null
          ), Yt(
            t,
            n,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (Yt(t, n, "encType", c.encType, c, null), Yt(t, n, "method", c.method, c, null), Yt(t, n, "target", c.target, c, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(a);
          break;
        }
        o = Xl("" + o), t.setAttribute(a, o);
        break;
      case "onClick":
        o != null && (t.onclick = Bn);
        break;
      case "onScroll":
        o != null && Dt("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Dt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (a = o.__html, a != null) {
            if (c.children != null) throw Error(l(60));
            t.innerHTML = a;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        a = Xl("" + o), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(a, "" + o) : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(a, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(a, o) : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(a, o) : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(a) : t.setAttribute(a, o);
        break;
      case "popover":
        Dt("beforetoggle", t), Dt("toggle", t), ql(t, "popover", o);
        break;
      case "xlinkActuate":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Vn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Vn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Vn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Vn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ql(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Mx.get(a) || a, ql(t, a, o));
    }
  }
  function Uc(t, n, a, o, c, h) {
    switch (a) {
      case "style":
        Md(t, o, h);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (a = o.__html, a != null) {
            if (c.children != null) throw Error(l(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Sa(t, o) : (typeof o == "number" || typeof o == "bigint") && Sa(t, "" + o);
        break;
      case "onScroll":
        o != null && Dt("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Dt("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Bn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!bd.hasOwnProperty(a))
          t: {
            if (a[0] === "o" && a[1] === "n" && (c = a.endsWith("Capture"), n = a.slice(2, c ? a.length - 7 : void 0), h = t[Le] || null, h = h != null ? h[a] : null, typeof h == "function" && t.removeEventListener(n, h, c), typeof o == "function")) {
              typeof h != "function" && h !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(n, o, c);
              break t;
            }
            a in t ? t[a] = o : o === !0 ? t.setAttribute(a, "") : ql(t, a, o);
          }
    }
  }
  function we(t, n, a) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Dt("error", t), Dt("load", t);
        var o = !1, c = !1, h;
        for (h in a)
          if (a.hasOwnProperty(h)) {
            var v = a[h];
            if (v != null)
              switch (h) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  Yt(t, n, h, v, a, null);
              }
          }
        c && Yt(t, n, "srcSet", a.srcSet, a, null), o && Yt(t, n, "src", a.src, a, null);
        return;
      case "input":
        Dt("invalid", t);
        var w = h = v = c = null, E = null, L = null;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var Y = a[o];
            if (Y != null)
              switch (o) {
                case "name":
                  c = Y;
                  break;
                case "type":
                  v = Y;
                  break;
                case "checked":
                  E = Y;
                  break;
                case "defaultChecked":
                  L = Y;
                  break;
                case "value":
                  h = Y;
                  break;
                case "defaultValue":
                  w = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(l(137, n));
                  break;
                default:
                  Yt(t, n, o, Y, a, null);
              }
          }
        Ed(
          t,
          h,
          w,
          E,
          L,
          v,
          c,
          !1
        );
        return;
      case "select":
        Dt("invalid", t), o = v = h = null;
        for (c in a)
          if (a.hasOwnProperty(c) && (w = a[c], w != null))
            switch (c) {
              case "value":
                h = w;
                break;
              case "defaultValue":
                v = w;
                break;
              case "multiple":
                o = w;
              default:
                Yt(t, n, c, w, a, null);
            }
        n = h, a = v, t.multiple = !!o, n != null ? wa(t, !!o, n, !1) : a != null && wa(t, !!o, a, !0);
        return;
      case "textarea":
        Dt("invalid", t), h = c = o = null;
        for (v in a)
          if (a.hasOwnProperty(v) && (w = a[v], w != null))
            switch (v) {
              case "value":
                o = w;
                break;
              case "defaultValue":
                c = w;
                break;
              case "children":
                h = w;
                break;
              case "dangerouslySetInnerHTML":
                if (w != null) throw Error(l(91));
                break;
              default:
                Yt(t, n, v, w, a, null);
            }
        kd(t, o, c, h);
        return;
      case "option":
        for (E in a)
          if (a.hasOwnProperty(E) && (o = a[E], o != null))
            switch (E) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Yt(t, n, E, o, a, null);
            }
        return;
      case "dialog":
        Dt("beforetoggle", t), Dt("toggle", t), Dt("cancel", t), Dt("close", t);
        break;
      case "iframe":
      case "object":
        Dt("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < Wr.length; o++)
          Dt(Wr[o], t);
        break;
      case "image":
        Dt("error", t), Dt("load", t);
        break;
      case "details":
        Dt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Dt("error", t), Dt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (L in a)
          if (a.hasOwnProperty(L) && (o = a[L], o != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Yt(t, n, L, o, a, null);
            }
        return;
      default:
        if (Ws(n)) {
          for (Y in a)
            a.hasOwnProperty(Y) && (o = a[Y], o !== void 0 && Uc(
              t,
              n,
              Y,
              o,
              a,
              void 0
            ));
          return;
        }
    }
    for (w in a)
      a.hasOwnProperty(w) && (o = a[w], o != null && Yt(t, n, w, o, a, null));
  }
  function eS(t, n, a, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var c = null, h = null, v = null, w = null, E = null, L = null, Y = null;
        for (U in a) {
          var P = a[U];
          if (a.hasOwnProperty(U) && P != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = P;
              default:
                o.hasOwnProperty(U) || Yt(t, n, U, null, o, P);
            }
        }
        for (var V in o) {
          var U = o[V];
          if (P = a[V], o.hasOwnProperty(V) && (U != null || P != null))
            switch (V) {
              case "type":
                h = U;
                break;
              case "name":
                c = U;
                break;
              case "checked":
                L = U;
                break;
              case "defaultChecked":
                Y = U;
                break;
              case "value":
                v = U;
                break;
              case "defaultValue":
                w = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(l(137, n));
                break;
              default:
                U !== P && Yt(
                  t,
                  n,
                  V,
                  U,
                  o,
                  P
                );
            }
        }
        Is(
          t,
          v,
          w,
          E,
          L,
          Y,
          h,
          c
        );
        return;
      case "select":
        U = v = w = V = null;
        for (h in a)
          if (E = a[h], a.hasOwnProperty(h) && E != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                U = E;
              default:
                o.hasOwnProperty(h) || Yt(
                  t,
                  n,
                  h,
                  null,
                  o,
                  E
                );
            }
        for (c in o)
          if (h = o[c], E = a[c], o.hasOwnProperty(c) && (h != null || E != null))
            switch (c) {
              case "value":
                V = h;
                break;
              case "defaultValue":
                w = h;
                break;
              case "multiple":
                v = h;
              default:
                h !== E && Yt(
                  t,
                  n,
                  c,
                  h,
                  o,
                  E
                );
            }
        n = w, a = v, o = U, V != null ? wa(t, !!a, V, !1) : !!o != !!a && (n != null ? wa(t, !!a, n, !0) : wa(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        U = V = null;
        for (w in a)
          if (c = a[w], a.hasOwnProperty(w) && c != null && !o.hasOwnProperty(w))
            switch (w) {
              case "value":
                break;
              case "children":
                break;
              default:
                Yt(t, n, w, null, o, c);
            }
        for (v in o)
          if (c = o[v], h = a[v], o.hasOwnProperty(v) && (c != null || h != null))
            switch (v) {
              case "value":
                V = c;
                break;
              case "defaultValue":
                U = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(l(91));
                break;
              default:
                c !== h && Yt(t, n, v, c, o, h);
            }
        Ad(t, V, U);
        return;
      case "option":
        for (var ut in a)
          if (V = a[ut], a.hasOwnProperty(ut) && V != null && !o.hasOwnProperty(ut))
            switch (ut) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Yt(
                  t,
                  n,
                  ut,
                  null,
                  o,
                  V
                );
            }
        for (E in o)
          if (V = o[E], U = a[E], o.hasOwnProperty(E) && V !== U && (V != null || U != null))
            switch (E) {
              case "selected":
                t.selected = V && typeof V != "function" && typeof V != "symbol";
                break;
              default:
                Yt(
                  t,
                  n,
                  E,
                  V,
                  o,
                  U
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var gt in a)
          V = a[gt], a.hasOwnProperty(gt) && V != null && !o.hasOwnProperty(gt) && Yt(t, n, gt, null, o, V);
        for (L in o)
          if (V = o[L], U = a[L], o.hasOwnProperty(L) && V !== U && (V != null || U != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(l(137, n));
                break;
              default:
                Yt(
                  t,
                  n,
                  L,
                  V,
                  o,
                  U
                );
            }
        return;
      default:
        if (Ws(n)) {
          for (var Gt in a)
            V = a[Gt], a.hasOwnProperty(Gt) && V !== void 0 && !o.hasOwnProperty(Gt) && Uc(
              t,
              n,
              Gt,
              void 0,
              o,
              V
            );
          for (Y in o)
            V = o[Y], U = a[Y], !o.hasOwnProperty(Y) || V === U || V === void 0 && U === void 0 || Uc(
              t,
              n,
              Y,
              V,
              o,
              U
            );
          return;
        }
    }
    for (var R in a)
      V = a[R], a.hasOwnProperty(R) && V != null && !o.hasOwnProperty(R) && Yt(t, n, R, null, o, V);
    for (P in o)
      V = o[P], U = a[P], !o.hasOwnProperty(P) || V === U || V == null && U == null || Yt(t, n, P, V, o, U);
  }
  function zg(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function nS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, a = performance.getEntriesByType("resource"), o = 0; o < a.length; o++) {
        var c = a[o], h = c.transferSize, v = c.initiatorType, w = c.duration;
        if (h && w && zg(v)) {
          for (v = 0, w = c.responseEnd, o += 1; o < a.length; o++) {
            var E = a[o], L = E.startTime;
            if (L > w) break;
            var Y = E.transferSize, P = E.initiatorType;
            Y && zg(P) && (E = E.responseEnd, v += Y * (E < w ? 1 : (w - L) / (E - L)));
          }
          if (--o, n += 8 * (h + v) / (c.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var jc = null, Hc = null;
  function Ho(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Dg(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Rg(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function qc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Yc = null;
  function iS() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Yc ? !1 : (Yc = t, !0) : (Yc = null, !1);
  }
  var Og = typeof setTimeout == "function" ? setTimeout : void 0, aS = typeof clearTimeout == "function" ? clearTimeout : void 0, _g = typeof Promise == "function" ? Promise : void 0, rS = typeof queueMicrotask == "function" ? queueMicrotask : typeof _g < "u" ? function(t) {
    return _g.resolve(null).then(t).catch(lS);
  } : Og;
  function lS(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function wi(t) {
    return t === "head";
  }
  function Ng(t, n) {
    var a = n, o = 0;
    do {
      var c = a.nextSibling;
      if (t.removeChild(a), c && c.nodeType === 8)
        if (a = c.data, a === "/$" || a === "/&") {
          if (o === 0) {
            t.removeChild(c), $a(n);
            return;
          }
          o--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          o++;
        else if (a === "html")
          tl(t.ownerDocument.documentElement);
        else if (a === "head") {
          a = t.ownerDocument.head, tl(a);
          for (var h = a.firstChild; h; ) {
            var v = h.nextSibling, w = h.nodeName;
            h[vr] || w === "SCRIPT" || w === "STYLE" || w === "LINK" && h.rel.toLowerCase() === "stylesheet" || a.removeChild(h), h = v;
          }
        } else
          a === "body" && tl(t.ownerDocument.body);
      a = c;
    } while (a);
    $a(n);
  }
  function Lg(t, n) {
    var a = t;
    t = 0;
    do {
      var o = a.nextSibling;
      if (a.nodeType === 1 ? n ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (n ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), o && o.nodeType === 8)
        if (a = o.data, a === "/$") {
          if (t === 0) break;
          t--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || t++;
      a = o;
    } while (a);
  }
  function Gc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var a = n;
      switch (n = n.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Gc(a), Ks(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function oS(t, n, a, o) {
    for (; t.nodeType === 1; ) {
      var c = a;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[vr])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== c.rel || t.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || t.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || t.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (c.src == null ? null : c.src) || t.getAttribute("type") !== (c.type == null ? null : c.type) || t.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var h = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else return t;
      if (t = fn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function sS(t, n, a) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = fn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Vg(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = fn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Xc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Pc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function uS(t, n) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || a.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), a.removeEventListener("DOMContentLoaded", o);
      };
      a.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function fn(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Fc = null;
  function Bg(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (n === 0)
            return fn(t.nextSibling);
          n--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ug(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (n === 0) return t;
          n--;
        } else a !== "/$" && a !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function jg(t, n, a) {
    switch (n = Ho(a), t) {
      case "html":
        if (t = n.documentElement, !t) throw Error(l(452));
        return t;
      case "head":
        if (t = n.head, !t) throw Error(l(453));
        return t;
      case "body":
        if (t = n.body, !t) throw Error(l(454));
        return t;
      default:
        throw Error(l(451));
    }
  }
  function tl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Ks(t);
  }
  var hn = /* @__PURE__ */ new Map(), Hg = /* @__PURE__ */ new Set();
  function qo(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var $n = Q.d;
  Q.d = {
    f: cS,
    r: fS,
    D: hS,
    C: dS,
    L: pS,
    m: mS,
    X: yS,
    S: gS,
    M: vS
  };
  function cS() {
    var t = $n.f(), n = Oo();
    return t || n;
  }
  function fS(t) {
    var n = va(t);
    n !== null && n.tag === 5 && n.type === "form" ? im(n) : $n.r(t);
  }
  var Ia = typeof document > "u" ? null : document;
  function qg(t, n, a) {
    var o = Ia;
    if (o && typeof n == "string" && n) {
      var c = an(n);
      c = 'link[rel="' + t + '"][href="' + c + '"]', typeof a == "string" && (c += '[crossorigin="' + a + '"]'), Hg.has(c) || (Hg.add(c), t = { rel: t, crossOrigin: a, href: n }, o.querySelector(c) === null && (n = o.createElement("link"), we(n, "link", t), me(n), o.head.appendChild(n)));
    }
  }
  function hS(t) {
    $n.D(t), qg("dns-prefetch", t, null);
  }
  function dS(t, n) {
    $n.C(t, n), qg("preconnect", t, n);
  }
  function pS(t, n, a) {
    $n.L(t, n, a);
    var o = Ia;
    if (o && t && n) {
      var c = 'link[rel="preload"][as="' + an(n) + '"]';
      n === "image" && a && a.imageSrcSet ? (c += '[imagesrcset="' + an(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (c += '[imagesizes="' + an(
        a.imageSizes
      ) + '"]')) : c += '[href="' + an(t) + '"]';
      var h = c;
      switch (n) {
        case "style":
          h = Ja(t);
          break;
        case "script":
          h = Wa(t);
      }
      hn.has(h) || (t = y(
        {
          rel: "preload",
          href: n === "image" && a && a.imageSrcSet ? void 0 : t,
          as: n
        },
        a
      ), hn.set(h, t), o.querySelector(c) !== null || n === "style" && o.querySelector(el(h)) || n === "script" && o.querySelector(nl(h)) || (n = o.createElement("link"), we(n, "link", t), me(n), o.head.appendChild(n)));
    }
  }
  function mS(t, n) {
    $n.m(t, n);
    var a = Ia;
    if (a && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + an(o) + '"][href="' + an(t) + '"]', h = c;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Wa(t);
      }
      if (!hn.has(h) && (t = y({ rel: "modulepreload", href: t }, n), hn.set(h, t), a.querySelector(c) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(nl(h)))
              return;
        }
        o = a.createElement("link"), we(o, "link", t), me(o), a.head.appendChild(o);
      }
    }
  }
  function gS(t, n, a) {
    $n.S(t, n, a);
    var o = Ia;
    if (o && t) {
      var c = ba(o).hoistableStyles, h = Ja(t);
      n = n || "default";
      var v = c.get(h);
      if (!v) {
        var w = { loading: 0, preload: null };
        if (v = o.querySelector(
          el(h)
        ))
          w.loading = 5;
        else {
          t = y(
            { rel: "stylesheet", href: t, "data-precedence": n },
            a
          ), (a = hn.get(h)) && Qc(t, a);
          var E = v = o.createElement("link");
          me(E), we(E, "link", t), E._p = new Promise(function(L, Y) {
            E.onload = L, E.onerror = Y;
          }), E.addEventListener("load", function() {
            w.loading |= 1;
          }), E.addEventListener("error", function() {
            w.loading |= 2;
          }), w.loading |= 4, Yo(v, n, o);
        }
        v = {
          type: "stylesheet",
          instance: v,
          count: 1,
          state: w
        }, c.set(h, v);
      }
    }
  }
  function yS(t, n) {
    $n.X(t, n);
    var a = Ia;
    if (a && t) {
      var o = ba(a).hoistableScripts, c = Wa(t), h = o.get(c);
      h || (h = a.querySelector(nl(c)), h || (t = y({ src: t, async: !0 }, n), (n = hn.get(c)) && Kc(t, n), h = a.createElement("script"), me(h), we(h, "link", t), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(c, h));
    }
  }
  function vS(t, n) {
    $n.M(t, n);
    var a = Ia;
    if (a && t) {
      var o = ba(a).hoistableScripts, c = Wa(t), h = o.get(c);
      h || (h = a.querySelector(nl(c)), h || (t = y({ src: t, async: !0, type: "module" }, n), (n = hn.get(c)) && Kc(t, n), h = a.createElement("script"), me(h), we(h, "link", t), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(c, h));
    }
  }
  function Yg(t, n, a, o) {
    var c = (c = ot.current) ? qo(c) : null;
    if (!c) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (n = Ja(a.href), a = ba(
          c
        ).hoistableStyles, o = a.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          t = Ja(a.href);
          var h = ba(
            c
          ).hoistableStyles, v = h.get(t);
          if (v || (c = c.ownerDocument || c, v = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, v), (h = c.querySelector(
            el(t)
          )) && !h._p && (v.instance = h, v.state.loading = 5), hn.has(t) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, hn.set(t, a), h || bS(
            c,
            t,
            a,
            v.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return v;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = a.async, a = a.src, typeof a == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Wa(a), a = ba(
          c
        ).hoistableScripts, o = a.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, t));
    }
  }
  function Ja(t) {
    return 'href="' + an(t) + '"';
  }
  function el(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Gg(t) {
    return y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function bS(t, n, a, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), we(n, "link", a), me(n), t.head.appendChild(n));
  }
  function Wa(t) {
    return '[src="' + an(t) + '"]';
  }
  function nl(t) {
    return "script[async]" + t;
  }
  function Xg(t, n, a) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + an(a.href) + '"]'
          );
          if (o)
            return n.instance = o, me(o), o;
          var c = y({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), me(o), we(o, "style", c), Yo(o, a.precedence, t), n.instance = o;
        case "stylesheet":
          c = Ja(a.href);
          var h = t.querySelector(
            el(c)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, me(h), h;
          o = Gg(a), (c = hn.get(c)) && Qc(o, c), h = (t.ownerDocument || t).createElement("link"), me(h);
          var v = h;
          return v._p = new Promise(function(w, E) {
            v.onload = w, v.onerror = E;
          }), we(h, "link", o), n.state.loading |= 4, Yo(h, a.precedence, t), n.instance = h;
        case "script":
          return h = Wa(a.src), (c = t.querySelector(
            nl(h)
          )) ? (n.instance = c, me(c), c) : (o = a, (c = hn.get(h)) && (o = y({}, a), Kc(o, c)), t = t.ownerDocument || t, c = t.createElement("script"), me(c), we(c, "link", o), t.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Yo(o, a.precedence, t));
    return n.instance;
  }
  function Yo(t, n, a) {
    for (var o = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = o.length ? o[o.length - 1] : null, h = c, v = 0; v < o.length; v++) {
      var w = o[v];
      if (w.dataset.precedence === n) h = w;
      else if (h !== c) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = a.nodeType === 9 ? a.head : a, n.insertBefore(t, n.firstChild));
  }
  function Qc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Kc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Go = null;
  function Pg(t, n, a) {
    if (Go === null) {
      var o = /* @__PURE__ */ new Map(), c = Go = /* @__PURE__ */ new Map();
      c.set(a, o);
    } else
      c = Go, o = c.get(a), o || (o = /* @__PURE__ */ new Map(), c.set(a, o));
    if (o.has(t)) return o;
    for (o.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
      var h = a[c];
      if (!(h[vr] || h[ye] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var v = h.getAttribute(n) || "";
        v = t + v;
        var w = o.get(v);
        w ? w.push(h) : o.set(v, [h]);
      }
    }
    return o;
  }
  function Fg(t, n, a) {
    t = t.ownerDocument || t, t.head.insertBefore(
      a,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function xS(t, n, a) {
    if (a === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Qg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function wS(t, n, a, o) {
    if (a.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var c = Ja(o.href), h = n.querySelector(
          el(c)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Xo.bind(t), n.then(t, t)), a.state.loading |= 4, a.instance = h, me(h);
          return;
        }
        h = n.ownerDocument || n, o = Gg(o), (c = hn.get(c)) && Qc(o, c), h = h.createElement("link"), me(h);
        var v = h;
        v._p = new Promise(function(w, E) {
          v.onload = w, v.onerror = E;
        }), we(h, "link", o), a.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, n), (n = a.state.preload) && (a.state.loading & 3) === 0 && (t.count++, a = Xo.bind(t), n.addEventListener("load", a), n.addEventListener("error", a));
    }
  }
  var Zc = 0;
  function SS(t, n) {
    return t.stylesheets && t.count === 0 && Fo(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(a) {
      var o = setTimeout(function() {
        if (t.stylesheets && Fo(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Zc === 0 && (Zc = 62500 * nS());
      var c = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Fo(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Zc ? 50 : 800) + n
      );
      return t.unsuspend = a, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(c);
      };
    } : null;
  }
  function Xo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Fo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Po = null;
  function Fo(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Po = /* @__PURE__ */ new Map(), n.forEach(TS, t), Po = null, Xo.call(t));
  }
  function TS(t, n) {
    if (!(n.state.loading & 4)) {
      var a = Po.get(t);
      if (a) var o = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Po.set(t, a);
        for (var c = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < c.length; h++) {
          var v = c[h];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") && (a.set(v.dataset.precedence, v), o = v);
        }
        o && a.set(null, o);
      }
      c = n.instance, v = c.getAttribute("data-precedence"), h = a.get(v) || o, h === o && a.set(null, c), a.set(v, c), this.count++, o = Xo.bind(this), c.addEventListener("load", o), c.addEventListener("error", o), h ? h.parentNode.insertBefore(c, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(c, t.firstChild)), n.state.loading |= 4;
    }
  }
  var il = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: nt,
    _currentValue2: nt,
    _threadCount: 0
  };
  function ES(t, n, a, o, c, h, v, w, E) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Xs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xs(0), this.hiddenUpdates = Xs(null), this.identifierPrefix = o, this.onUncaughtError = c, this.onCaughtError = h, this.onRecoverableError = v, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Kg(t, n, a, o, c, h, v, w, E, L, Y, P) {
    return t = new ES(
      t,
      n,
      a,
      v,
      E,
      L,
      Y,
      P,
      w
    ), n = 1, h === !0 && (n |= 24), h = Ke(3, null, null, n), t.current = h, h.stateNode = t, n = Mu(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: a,
      cache: n
    }, Ou(h), t;
  }
  function Zg(t) {
    return t ? (t = za, t) : za;
  }
  function Ig(t, n, a, o, c, h) {
    c = Zg(c), o.context === null ? o.context = c : o.pendingContext = c, o = ci(n), o.payload = { element: a }, h = h === void 0 ? null : h, h !== null && (o.callback = h), a = fi(t, o, n), a !== null && (qe(a, t, n), Lr(a, t, n));
  }
  function Jg(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < n ? a : n;
    }
  }
  function Ic(t, n) {
    Jg(t, n), (t = t.alternate) && Jg(t, n);
  }
  function Wg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Gi(t, 67108864);
      n !== null && qe(n, t, 67108864), Ic(t, 67108864);
    }
  }
  function $g(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = $e();
      n = Ps(n);
      var a = Gi(t, n);
      a !== null && qe(a, t, n), Ic(t, n);
    }
  }
  var Qo = !0;
  function AS(t, n, a, o) {
    var c = O.T;
    O.T = null;
    var h = Q.p;
    try {
      Q.p = 2, Jc(t, n, a, o);
    } finally {
      Q.p = h, O.T = c;
    }
  }
  function kS(t, n, a, o) {
    var c = O.T;
    O.T = null;
    var h = Q.p;
    try {
      Q.p = 8, Jc(t, n, a, o);
    } finally {
      Q.p = h, O.T = c;
    }
  }
  function Jc(t, n, a, o) {
    if (Qo) {
      var c = Wc(o);
      if (c === null)
        Bc(
          t,
          n,
          o,
          Ko,
          a
        ), ey(t, o);
      else if (MS(
        c,
        t,
        n,
        a,
        o
      ))
        o.stopPropagation();
      else if (ey(t, o), n & 4 && -1 < CS.indexOf(t)) {
        for (; c !== null; ) {
          var h = va(c);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var v = Ui(h.pendingLanes);
                  if (v !== 0) {
                    var w = h;
                    for (w.pendingLanes |= 2, w.entangledLanes |= 2; v; ) {
                      var E = 1 << 31 - Pt(v);
                      w.entanglements[1] |= E, v &= ~E;
                    }
                    Cn(h), (Vt & 6) === 0 && (Do = Ce() + 500, Jr(0));
                  }
                }
                break;
              case 31:
              case 13:
                w = Gi(h, 2), w !== null && qe(w, h, 2), Oo(), Ic(h, 2);
            }
          if (h = Wc(o), h === null && Bc(
            t,
            n,
            o,
            Ko,
            a
          ), h === c) break;
          c = h;
        }
        c !== null && o.stopPropagation();
      } else
        Bc(
          t,
          n,
          o,
          null,
          a
        );
    }
  }
  function Wc(t) {
    return t = tu(t), $c(t);
  }
  var Ko = null;
  function $c(t) {
    if (Ko = null, t = ya(t), t !== null) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var a = n.tag;
        if (a === 13) {
          if (t = f(n), t !== null) return t;
          t = null;
        } else if (a === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return Ko = t, null;
  }
  function ty(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Gs()) {
          case G:
            return 2;
          case it:
            return 8;
          case yt:
          case Mt:
            return 32;
          case Ut:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tf = !1, Si = null, Ti = null, Ei = null, al = /* @__PURE__ */ new Map(), rl = /* @__PURE__ */ new Map(), Ai = [], CS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ey(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Si = null;
        break;
      case "dragenter":
      case "dragleave":
        Ti = null;
        break;
      case "mouseover":
      case "mouseout":
        Ei = null;
        break;
      case "pointerover":
      case "pointerout":
        al.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        rl.delete(n.pointerId);
    }
  }
  function ll(t, n, a, o, c, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: a,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [c]
    }, n !== null && (n = va(n), n !== null && Wg(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), t);
  }
  function MS(t, n, a, o, c) {
    switch (n) {
      case "focusin":
        return Si = ll(
          Si,
          t,
          n,
          a,
          o,
          c
        ), !0;
      case "dragenter":
        return Ti = ll(
          Ti,
          t,
          n,
          a,
          o,
          c
        ), !0;
      case "mouseover":
        return Ei = ll(
          Ei,
          t,
          n,
          a,
          o,
          c
        ), !0;
      case "pointerover":
        var h = c.pointerId;
        return al.set(
          h,
          ll(
            al.get(h) || null,
            t,
            n,
            a,
            o,
            c
          )
        ), !0;
      case "gotpointercapture":
        return h = c.pointerId, rl.set(
          h,
          ll(
            rl.get(h) || null,
            t,
            n,
            a,
            o,
            c
          )
        ), !0;
    }
    return !1;
  }
  function ny(t) {
    var n = ya(t.target);
    if (n !== null) {
      var a = u(n);
      if (a !== null) {
        if (n = a.tag, n === 13) {
          if (n = f(a), n !== null) {
            t.blockedOn = n, gd(t.priority, function() {
              $g(a);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(a), n !== null) {
            t.blockedOn = n, gd(t.priority, function() {
              $g(a);
            });
            return;
          }
        } else if (n === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Zo(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var a = Wc(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var o = new a.constructor(
          a.type,
          a
        );
        $s = o, a.target.dispatchEvent(o), $s = null;
      } else
        return n = va(a), n !== null && Wg(n), t.blockedOn = a, !1;
      n.shift();
    }
    return !0;
  }
  function iy(t, n, a) {
    Zo(t) && a.delete(n);
  }
  function zS() {
    tf = !1, Si !== null && Zo(Si) && (Si = null), Ti !== null && Zo(Ti) && (Ti = null), Ei !== null && Zo(Ei) && (Ei = null), al.forEach(iy), rl.forEach(iy);
  }
  function Io(t, n) {
    t.blockedOn === n && (t.blockedOn = null, tf || (tf = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      zS
    )));
  }
  var Jo = null;
  function ay(t) {
    Jo !== t && (Jo = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Jo === t && (Jo = null);
        for (var n = 0; n < t.length; n += 3) {
          var a = t[n], o = t[n + 1], c = t[n + 2];
          if (typeof o != "function") {
            if ($c(o || a) === null)
              continue;
            break;
          }
          var h = va(a);
          h !== null && (t.splice(n, 3), n -= 3, Wu(
            h,
            {
              pending: !0,
              data: c,
              method: a.method,
              action: o
            },
            o,
            c
          ));
        }
      }
    ));
  }
  function $a(t) {
    function n(E) {
      return Io(E, t);
    }
    Si !== null && Io(Si, t), Ti !== null && Io(Ti, t), Ei !== null && Io(Ei, t), al.forEach(n), rl.forEach(n);
    for (var a = 0; a < Ai.length; a++) {
      var o = Ai[a];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Ai.length && (a = Ai[0], a.blockedOn === null); )
      ny(a), a.blockedOn === null && Ai.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (o = 0; o < a.length; o += 3) {
        var c = a[o], h = a[o + 1], v = c[Le] || null;
        if (typeof h == "function")
          v || ay(a);
        else if (v) {
          var w = null;
          if (h && h.hasAttribute("formAction")) {
            if (c = h, v = h[Le] || null)
              w = v.formAction;
            else if ($c(c) !== null) continue;
          } else w = v.action;
          typeof w == "function" ? a[o + 1] = w : (a.splice(o, 3), o -= 3), ay(a);
        }
      }
  }
  function ry() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(v) {
            return c = v;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      c !== null && (c(), c = null), o || setTimeout(a, 20);
    }
    function a() {
      if (!o && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, c = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(a, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), c !== null && (c(), c = null);
      };
    }
  }
  function ef(t) {
    this._internalRoot = t;
  }
  Wo.prototype.render = ef.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var a = n.current, o = $e();
    Ig(a, o, t, n, null, null);
  }, Wo.prototype.unmount = ef.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Ig(t.current, 2, null, t, null, null), Oo(), n[ga] = null;
    }
  };
  function Wo(t) {
    this._internalRoot = t;
  }
  Wo.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = md();
      t = { blockedOn: null, target: t, priority: n };
      for (var a = 0; a < Ai.length && n !== 0 && n < Ai[a].priority; a++) ;
      Ai.splice(a, 0, t), a === 0 && ny(t);
    }
  };
  var ly = i.version;
  if (ly !== "19.2.5")
    throw Error(
      l(
        527,
        ly,
        "19.2.5"
      )
    );
  Q.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = p(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var DS = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$o.isDisabled && $o.supportsFiber)
      try {
        Me = $o.inject(
          DS
        ), fe = $o;
      } catch {
      }
  }
  return sl.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var a = !1, o = "", c = dm, h = pm, v = mm;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError)), n = Kg(
      t,
      1,
      !1,
      null,
      null,
      a,
      o,
      null,
      c,
      h,
      v,
      ry
    ), t[ga] = n.current, Vc(t), new ef(n);
  }, sl.hydrateRoot = function(t, n, a) {
    if (!s(t)) throw Error(l(299));
    var o = !1, c = "", h = dm, v = pm, w = mm, E = null;
    return a != null && (a.unstable_strictMode === !0 && (o = !0), a.identifierPrefix !== void 0 && (c = a.identifierPrefix), a.onUncaughtError !== void 0 && (h = a.onUncaughtError), a.onCaughtError !== void 0 && (v = a.onCaughtError), a.onRecoverableError !== void 0 && (w = a.onRecoverableError), a.formState !== void 0 && (E = a.formState)), n = Kg(
      t,
      1,
      !0,
      n,
      a ?? null,
      o,
      c,
      E,
      h,
      v,
      w,
      ry
    ), n.context = Zg(null), a = n.current, o = $e(), o = Ps(o), c = ci(o), c.callback = null, fi(a, c, o), a = o, n.current.lanes = a, yr(n, a), Cn(n), t[ga] = n.current, Vc(t), new Wo(n);
  }, sl.version = "19.2.5", sl;
}
var gy;
function HS() {
  if (gy) return rf.exports;
  gy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return e(), rf.exports = jS(), rf.exports;
}
var qS = HS();
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YS = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), GS = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, r, l) => l ? l.toUpperCase() : r.toLowerCase()
), yy = (e) => {
  const i = GS(e);
  return i.charAt(0).toUpperCase() + i.slice(1);
}, _0 = (...e) => e.filter((i, r, l) => !!i && i.trim() !== "" && l.indexOf(i) === r).join(" ").trim(), XS = (e) => {
  for (const i in e)
    if (i.startsWith("aria-") || i === "role" || i === "title")
      return !0;
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var PS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FS = rt.forwardRef(
  ({
    color: e = "currentColor",
    size: i = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: l,
    className: s = "",
    children: u,
    iconNode: f,
    ...d
  }, m) => rt.createElement(
    "svg",
    {
      ref: m,
      ...PS,
      width: i,
      height: i,
      stroke: e,
      strokeWidth: l ? Number(r) * 24 / Number(i) : r,
      className: _0("lucide", s),
      ...!u && !XS(d) && { "aria-hidden": "true" },
      ...d
    },
    [
      ...f.map(([p, g]) => rt.createElement(p, g)),
      ...Array.isArray(u) ? u : [u]
    ]
  )
);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Os = (e, i) => {
  const r = rt.forwardRef(
    ({ className: l, ...s }, u) => rt.createElement(FS, {
      ref: u,
      iconNode: i,
      className: _0(
        `lucide-${YS(yy(e))}`,
        `lucide-${e}`,
        l
      ),
      ...s
    })
  );
  return r.displayName = yy(e), r;
};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QS = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], KS = Os("bot", QS);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZS = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
], IS = Os("message-square", ZS);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JS = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], WS = Os("send", JS);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $S = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], vy = Os("x", $S);
function N0(e) {
  var i, r, l = "";
  if (typeof e == "string" || typeof e == "number") l += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (i = 0; i < s; i++) e[i] && (r = N0(e[i])) && (l && (l += " "), l += r);
  } else for (r in e) e[r] && (l && (l += " "), l += r);
  return l;
}
function tT() {
  for (var e, i, r = 0, l = "", s = arguments.length; r < s; r++) (e = arguments[r]) && (i = N0(e)) && (l && (l += " "), l += i);
  return l;
}
const eT = (e, i) => {
  const r = new Array(e.length + i.length);
  for (let l = 0; l < e.length; l++)
    r[l] = e[l];
  for (let l = 0; l < i.length; l++)
    r[e.length + l] = i[l];
  return r;
}, nT = (e, i) => ({
  classGroupId: e,
  validator: i
}), L0 = (e = /* @__PURE__ */ new Map(), i = null, r) => ({
  nextPart: e,
  validators: i,
  classGroupId: r
}), xs = "-", by = [], iT = "arbitrary..", aT = (e) => {
  const i = lT(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: l
  } = e;
  return {
    getClassGroupId: (f) => {
      if (f.startsWith("[") && f.endsWith("]"))
        return rT(f);
      const d = f.split(xs), m = d[0] === "" && d.length > 1 ? 1 : 0;
      return V0(d, m, i);
    },
    getConflictingClassGroupIds: (f, d) => {
      if (d) {
        const m = l[f], p = r[f];
        return m ? p ? eT(p, m) : m : p || by;
      }
      return r[f] || by;
    }
  };
}, V0 = (e, i, r) => {
  if (e.length - i === 0)
    return r.classGroupId;
  const s = e[i], u = r.nextPart.get(s);
  if (u) {
    const p = V0(e, i + 1, u);
    if (p) return p;
  }
  const f = r.validators;
  if (f === null)
    return;
  const d = i === 0 ? e.join(xs) : e.slice(i).join(xs), m = f.length;
  for (let p = 0; p < m; p++) {
    const g = f[p];
    if (g.validator(d))
      return g.classGroupId;
  }
}, rT = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const i = e.slice(1, -1), r = i.indexOf(":"), l = i.slice(0, r);
  return l ? iT + l : void 0;
})(), lT = (e) => {
  const {
    theme: i,
    classGroups: r
  } = e;
  return oT(r, i);
}, oT = (e, i) => {
  const r = L0();
  for (const l in e) {
    const s = e[l];
    wh(s, r, l, i);
  }
  return r;
}, wh = (e, i, r, l) => {
  const s = e.length;
  for (let u = 0; u < s; u++) {
    const f = e[u];
    sT(f, i, r, l);
  }
}, sT = (e, i, r, l) => {
  if (typeof e == "string") {
    uT(e, i, r);
    return;
  }
  if (typeof e == "function") {
    cT(e, i, r, l);
    return;
  }
  fT(e, i, r, l);
}, uT = (e, i, r) => {
  const l = e === "" ? i : B0(i, e);
  l.classGroupId = r;
}, cT = (e, i, r, l) => {
  if (hT(e)) {
    wh(e(l), i, r, l);
    return;
  }
  i.validators === null && (i.validators = []), i.validators.push(nT(r, e));
}, fT = (e, i, r, l) => {
  const s = Object.entries(e), u = s.length;
  for (let f = 0; f < u; f++) {
    const [d, m] = s[f];
    wh(m, B0(i, d), r, l);
  }
}, B0 = (e, i) => {
  let r = e;
  const l = i.split(xs), s = l.length;
  for (let u = 0; u < s; u++) {
    const f = l[u];
    let d = r.nextPart.get(f);
    d || (d = L0(), r.nextPart.set(f, d)), r = d;
  }
  return r;
}, hT = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, dT = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let i = 0, r = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  const s = (u, f) => {
    r[u] = f, i++, i > e && (i = 0, l = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(u) {
      let f = r[u];
      if (f !== void 0)
        return f;
      if ((f = l[u]) !== void 0)
        return s(u, f), f;
    },
    set(u, f) {
      u in r ? r[u] = f : s(u, f);
    }
  };
}, jf = "!", xy = ":", pT = [], wy = (e, i, r, l, s) => ({
  modifiers: e,
  hasImportantModifier: i,
  baseClassName: r,
  maybePostfixModifierPosition: l,
  isExternal: s
}), mT = (e) => {
  const {
    prefix: i,
    experimentalParseClassName: r
  } = e;
  let l = (s) => {
    const u = [];
    let f = 0, d = 0, m = 0, p;
    const g = s.length;
    for (let z = 0; z < g; z++) {
      const D = s[z];
      if (f === 0 && d === 0) {
        if (D === xy) {
          u.push(s.slice(m, z)), m = z + 1;
          continue;
        }
        if (D === "/") {
          p = z;
          continue;
        }
      }
      D === "[" ? f++ : D === "]" ? f-- : D === "(" ? d++ : D === ")" && d--;
    }
    const y = u.length === 0 ? s : s.slice(m);
    let b = y, x = !1;
    y.endsWith(jf) ? (b = y.slice(0, -1), x = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      y.startsWith(jf) && (b = y.slice(1), x = !0)
    );
    const A = p && p > m ? p - m : void 0;
    return wy(u, x, b, A);
  };
  if (i) {
    const s = i + xy, u = l;
    l = (f) => f.startsWith(s) ? u(f.slice(s.length)) : wy(pT, !1, f, void 0, !0);
  }
  if (r) {
    const s = l;
    l = (u) => r({
      className: u,
      parseClassName: s
    });
  }
  return l;
}, gT = (e) => {
  const i = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, l) => {
    i.set(r, 1e6 + l);
  }), (r) => {
    const l = [];
    let s = [];
    for (let u = 0; u < r.length; u++) {
      const f = r[u], d = f[0] === "[", m = i.has(f);
      d || m ? (s.length > 0 && (s.sort(), l.push(...s), s = []), l.push(f)) : s.push(f);
    }
    return s.length > 0 && (s.sort(), l.push(...s)), l;
  };
}, yT = (e) => ({
  cache: dT(e.cacheSize),
  parseClassName: mT(e),
  sortModifiers: gT(e),
  ...aT(e)
}), vT = /\s+/, bT = (e, i) => {
  const {
    parseClassName: r,
    getClassGroupId: l,
    getConflictingClassGroupIds: s,
    sortModifiers: u
  } = i, f = [], d = e.trim().split(vT);
  let m = "";
  for (let p = d.length - 1; p >= 0; p -= 1) {
    const g = d[p], {
      isExternal: y,
      modifiers: b,
      hasImportantModifier: x,
      baseClassName: A,
      maybePostfixModifierPosition: z
    } = r(g);
    if (y) {
      m = g + (m.length > 0 ? " " + m : m);
      continue;
    }
    let D = !!z, M = l(D ? A.substring(0, z) : A);
    if (!M) {
      if (!D) {
        m = g + (m.length > 0 ? " " + m : m);
        continue;
      }
      if (M = l(A), !M) {
        m = g + (m.length > 0 ? " " + m : m);
        continue;
      }
      D = !1;
    }
    const H = b.length === 0 ? "" : b.length === 1 ? b[0] : u(b).join(":"), _ = x ? H + jf : H, F = _ + M;
    if (f.indexOf(F) > -1)
      continue;
    f.push(F);
    const K = s(M, D);
    for (let B = 0; B < K.length; ++B) {
      const I = K[B];
      f.push(_ + I);
    }
    m = g + (m.length > 0 ? " " + m : m);
  }
  return m;
}, xT = (...e) => {
  let i = 0, r, l, s = "";
  for (; i < e.length; )
    (r = e[i++]) && (l = U0(r)) && (s && (s += " "), s += l);
  return s;
}, U0 = (e) => {
  if (typeof e == "string")
    return e;
  let i, r = "";
  for (let l = 0; l < e.length; l++)
    e[l] && (i = U0(e[l])) && (r && (r += " "), r += i);
  return r;
}, wT = (e, ...i) => {
  let r, l, s, u;
  const f = (m) => {
    const p = i.reduce((g, y) => y(g), e());
    return r = yT(p), l = r.cache.get, s = r.cache.set, u = d, d(m);
  }, d = (m) => {
    const p = l(m);
    if (p)
      return p;
    const g = bT(m, r);
    return s(m, g), g;
  };
  return u = f, (...m) => u(xT(...m));
}, ST = [], de = (e) => {
  const i = (r) => r[e] || ST;
  return i.isThemeGetter = !0, i;
}, j0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, H0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, TT = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ET = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, AT = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, kT = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, CT = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, MT = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ci = (e) => TT.test(e), Ct = (e) => !!e && !Number.isNaN(Number(e)), Mi = (e) => !!e && Number.isInteger(Number(e)), uf = (e) => e.endsWith("%") && Ct(e.slice(0, -1)), ti = (e) => ET.test(e), q0 = () => !0, zT = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  AT.test(e) && !kT.test(e)
), Sh = () => !1, DT = (e) => CT.test(e), RT = (e) => MT.test(e), OT = (e) => !ct(e) && !ht(e), _T = (e) => Li(e, X0, Sh), ct = (e) => j0.test(e), na = (e) => Li(e, P0, zT), Sy = (e) => Li(e, qT, Ct), NT = (e) => Li(e, Q0, q0), LT = (e) => Li(e, F0, Sh), Ty = (e) => Li(e, Y0, Sh), VT = (e) => Li(e, G0, RT), ts = (e) => Li(e, K0, DT), ht = (e) => H0.test(e), ul = (e) => ca(e, P0), BT = (e) => ca(e, F0), Ey = (e) => ca(e, Y0), UT = (e) => ca(e, X0), jT = (e) => ca(e, G0), es = (e) => ca(e, K0, !0), HT = (e) => ca(e, Q0, !0), Li = (e, i, r) => {
  const l = j0.exec(e);
  return l ? l[1] ? i(l[1]) : r(l[2]) : !1;
}, ca = (e, i, r = !1) => {
  const l = H0.exec(e);
  return l ? l[1] ? i(l[1]) : r : !1;
}, Y0 = (e) => e === "position" || e === "percentage", G0 = (e) => e === "image" || e === "url", X0 = (e) => e === "length" || e === "size" || e === "bg-size", P0 = (e) => e === "length", qT = (e) => e === "number", F0 = (e) => e === "family-name", Q0 = (e) => e === "number" || e === "weight", K0 = (e) => e === "shadow", YT = () => {
  const e = de("color"), i = de("font"), r = de("text"), l = de("font-weight"), s = de("tracking"), u = de("leading"), f = de("breakpoint"), d = de("container"), m = de("spacing"), p = de("radius"), g = de("shadow"), y = de("inset-shadow"), b = de("text-shadow"), x = de("drop-shadow"), A = de("blur"), z = de("perspective"), D = de("aspect"), M = de("ease"), H = de("animate"), _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], F = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], K = () => [...F(), ht, ct], B = () => ["auto", "hidden", "clip", "visible", "scroll"], I = () => ["auto", "contain", "none"], j = () => [ht, ct, m], J = () => [Ci, "full", "auto", ...j()], et = () => [Mi, "none", "subgrid", ht, ct], W = () => ["auto", {
    span: ["full", Mi, ht, ct]
  }, Mi, ht, ct], $ = () => [Mi, "auto", ht, ct], vt = () => ["auto", "min", "max", "fr", ht, ct], lt = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...j()], Q = () => [Ci, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...j()], nt = () => [Ci, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...j()], pt = () => [Ci, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...j()], S = () => [e, ht, ct], k = () => [...F(), Ey, Ty, {
    position: [ht, ct]
  }], q = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], T = () => ["auto", "cover", "contain", UT, _T, {
    size: [ht, ct]
  }], at = () => [uf, ul, na], st = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    p,
    ht,
    ct
  ], ot = () => ["", Ct, ul, na], Et = () => ["solid", "dashed", "dotted", "double"], Xt = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], bt = () => [Ct, uf, Ey, Ty], ke = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    A,
    ht,
    ct
  ], Oe = () => ["none", Ct, ht, ct], Tn = () => ["none", Ct, ht, ct], ei = () => [Ct, ht, ct], _e = () => [Ci, "full", ...j()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ti],
      breakpoint: [ti],
      color: [q0],
      container: [ti],
      "drop-shadow": [ti],
      ease: ["in", "out", "in-out"],
      font: [OT],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ti],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ti],
      shadow: [ti],
      spacing: ["px", Ct],
      text: [ti],
      "text-shadow": [ti],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Ci, ct, ht, D]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Ct, ct, ht, d]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": _()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": _()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: K()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: B()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": B()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": B()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: I()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": I()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": I()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: J()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": J()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": J()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": J(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: J()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": J(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: J()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": J()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": J()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: J()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: J()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: J()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: J()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Mi, "auto", ht, ct]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ci, "full", "auto", d, ...j()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Ct, Ci, "auto", "initial", "none", ct]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Ct, ht, ct]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Ct, ht, ct]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Mi, "first", "last", "none", ht, ct]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": et()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: W()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": $()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": $()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": et()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: W()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": $()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": $()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": vt()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": vt()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: j()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": j()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": j()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...lt(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...lt()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": lt()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: j()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: j()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: j()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: j()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: j()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: j()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: j()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: j()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: j()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: j()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: j()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: O()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: O()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: O()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: O()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: O()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: O()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: O()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: O()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: O()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: O()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: O()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": j()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": j()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: Q()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...nt()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...nt()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...nt()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...pt()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...pt()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...pt()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [d, "screen", ...Q()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          d,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Q()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          d,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [f]
          },
          ...Q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...Q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, ul, na]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [l, HT, NT]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", uf, ct]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [BT, LT, i]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [ct]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [s, ht, ct]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Ct, "none", ht, Sy]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          u,
          ...j()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ht, ct]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ht, ct]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: S()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: S()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...Et(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Ct, "from-font", "auto", ht, na]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: S()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Ct, "auto", ht, ct]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: j()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ht, ct]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ht, ct]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: k()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: q()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: T()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Mi, ht, ct],
          radial: ["", ht, ct],
          conic: [Mi, ht, ct]
        }, jT, VT]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: S()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: at()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: at()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: at()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: S()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: S()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: S()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: st()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": st()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": st()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": st()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": st()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": st()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": st()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": st()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": st()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": st()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": st()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": st()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": st()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": st()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": st()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ot()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ot()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ot()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ot()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ot()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ot()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ot()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ot()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ot()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ot()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ot()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ot()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ot()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...Et(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Et(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: S()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": S()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": S()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": S()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": S()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": S()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": S()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": S()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": S()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": S()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": S()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: S()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...Et(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ct, ht, ct]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Ct, ul, na]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: S()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          g,
          es,
          ts
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: S()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", y, es, ts]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": S()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ot()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: S()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Ct, na]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": S()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ot()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": S()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", b, es, ts]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": S()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Ct, ht, ct]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Xt(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Xt()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Ct]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": bt()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": bt()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": S()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": S()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": bt()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": bt()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": S()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": S()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": bt()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": bt()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": S()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": S()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": bt()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": bt()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": S()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": S()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": bt()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": bt()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": S()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": S()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": bt()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": bt()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": S()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": S()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": bt()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": bt()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": S()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": S()
      }],
      "mask-image-radial": [{
        "mask-radial": [ht, ct]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": bt()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": bt()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": S()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": S()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": F()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Ct]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": bt()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": bt()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": S()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": S()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: k()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: q()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: T()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ht, ct]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ht,
          ct
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ke()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Ct, ht, ct]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Ct, ht, ct]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          x,
          es,
          ts
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": S()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Ct, ht, ct]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Ct, ht, ct]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Ct, ht, ct]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Ct, ht, ct]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Ct, ht, ct]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ht,
          ct
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ke()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Ct, ht, ct]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Ct, ht, ct]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Ct, ht, ct]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Ct, ht, ct]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Ct, ht, ct]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Ct, ht, ct]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Ct, ht, ct]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Ct, ht, ct]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": j()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": j()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": j()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ht, ct]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Ct, "initial", ht, ct]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", M, ht, ct]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Ct, ht, ct]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", H, ht, ct]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [z, ht, ct]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": K()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Oe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Oe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Oe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Oe()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Tn()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Tn()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Tn()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Tn()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ei()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ei()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ei()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ht, ct, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: K()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: _e()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": _e()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": _e()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": _e()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: S()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: S()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ht, ct]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": j()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": j()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": j()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": j()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": j()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": j()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": j()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": j()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": j()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": j()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": j()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": j()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": j()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": j()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": j()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": j()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": j()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": j()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": j()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": j()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": j()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": j()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ht, ct]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...S()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Ct, ul, na, Sy]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...S()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, GT = /* @__PURE__ */ wT(YT);
function Ay(...e) {
  return GT(tT(e));
}
const Th = rt.createContext({});
function Eh(e) {
  const i = rt.useRef(null);
  return i.current === null && (i.current = e()), i.current;
}
const XT = typeof window < "u", Z0 = XT ? rt.useLayoutEffect : rt.useEffect, _s = /* @__PURE__ */ rt.createContext(null);
function Ah(e, i) {
  e.indexOf(i) === -1 && e.push(i);
}
function ws(e, i) {
  const r = e.indexOf(i);
  r > -1 && e.splice(r, 1);
}
const _n = (e, i, r) => r > i ? i : r < e ? e : r;
function ky(e, i) {
  return i ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${i}` : e;
}
let Ml = () => {
}, ua = () => {
};
var R0;
typeof process < "u" && ((R0 = process.env) == null ? void 0 : R0.NODE_ENV) !== "production" && (Ml = (e, i, r) => {
  !e && typeof console < "u" && console.warn(ky(i, r));
}, ua = (e, i, r) => {
  if (!e)
    throw new Error(ky(i, r));
});
const _i = {}, I0 = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function J0(e) {
  return typeof e == "object" && e !== null;
}
const W0 = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function $0(e) {
  let i;
  return () => (i === void 0 && (i = e()), i);
}
const mn = /* @__NO_SIDE_EFFECTS__ */ (e) => e, PT = (e, i) => (r) => i(e(r)), zl = (...e) => e.reduce(PT), Tl = /* @__NO_SIDE_EFFECTS__ */ (e, i, r) => {
  const l = i - e;
  return l === 0 ? 1 : (r - e) / l;
};
class kh {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return Ah(this.subscriptions, i), () => ws(this.subscriptions, i);
  }
  notify(i, r, l) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](i, r, l);
      else
        for (let u = 0; u < s; u++) {
          const f = this.subscriptions[u];
          f && f(i, r, l);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ge = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, pn = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function tb(e, i) {
  return i ? e * (1e3 / i) : 0;
}
const eb = (e, i, r) => (((1 - 3 * r + 3 * i) * e + (3 * r - 6 * i)) * e + 3 * i) * e, FT = 1e-7, QT = 12;
function KT(e, i, r, l, s) {
  let u, f, d = 0;
  do
    f = i + (r - i) / 2, u = eb(f, l, s) - e, u > 0 ? r = f : i = f;
  while (Math.abs(u) > FT && ++d < QT);
  return f;
}
function Dl(e, i, r, l) {
  if (e === i && r === l)
    return mn;
  const s = (u) => KT(u, 0, 1, e, r);
  return (u) => u === 0 || u === 1 ? u : eb(s(u), i, l);
}
const nb = (e) => (i) => i <= 0.5 ? e(2 * i) / 2 : (2 - e(2 * (1 - i))) / 2, ib = (e) => (i) => 1 - e(1 - i), ab = /* @__PURE__ */ Dl(0.33, 1.53, 0.69, 0.99), Ch = /* @__PURE__ */ ib(ab), rb = /* @__PURE__ */ nb(Ch), lb = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? 0.5 * Ch(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Mh = (e) => 1 - Math.sin(Math.acos(e)), ob = ib(Mh), sb = nb(Mh), ZT = /* @__PURE__ */ Dl(0.42, 0, 1, 1), IT = /* @__PURE__ */ Dl(0, 0, 0.58, 1), ub = /* @__PURE__ */ Dl(0.42, 0, 0.58, 1), JT = (e) => Array.isArray(e) && typeof e[0] != "number", cb = (e) => Array.isArray(e) && typeof e[0] == "number", Cy = {
  linear: mn,
  easeIn: ZT,
  easeInOut: ub,
  easeOut: IT,
  circIn: Mh,
  circInOut: sb,
  circOut: ob,
  backIn: Ch,
  backInOut: rb,
  backOut: ab,
  anticipate: lb
}, WT = (e) => typeof e == "string", My = (e) => {
  if (cb(e)) {
    ua(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [i, r, l, s] = e;
    return Dl(i, r, l, s);
  } else if (WT(e))
    return ua(Cy[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Cy[e];
  return e;
}, ns = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function $T(e, i) {
  let r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), s = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let d = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function m(g) {
    f.has(g) && (p.schedule(g), e()), g(d);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, y = !1, b = !1) => {
      const A = b && s ? r : l;
      return y && f.add(g), A.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      l.delete(g), f.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (d = g, s) {
        u = !0;
        return;
      }
      s = !0;
      const y = r;
      r = l, l = y, r.forEach(m), r.clear(), s = !1, u && (u = !1, p.process(g));
    }
  };
  return p;
}
const tE = 40;
function fb(e, i) {
  let r = !1, l = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => r = !0, f = ns.reduce((_, F) => (_[F] = $T(u), _), {}), { setup: d, read: m, resolveKeyframes: p, preUpdate: g, update: y, preRender: b, render: x, postRender: A } = f, z = () => {
    const _ = _i.useManualTiming, F = _ ? s.timestamp : performance.now();
    r = !1, _ || (s.delta = l ? 1e3 / 60 : Math.max(Math.min(F - s.timestamp, tE), 1)), s.timestamp = F, s.isProcessing = !0, d.process(s), m.process(s), p.process(s), g.process(s), y.process(s), b.process(s), x.process(s), A.process(s), s.isProcessing = !1, r && i && (l = !1, e(z));
  }, D = () => {
    r = !0, l = !0, s.isProcessing || e(z);
  };
  return { schedule: ns.reduce((_, F) => {
    const K = f[F];
    return _[F] = (B, I = !1, j = !1) => (r || D(), K.schedule(B, I, j)), _;
  }, {}), cancel: (_) => {
    for (let F = 0; F < ns.length; F++)
      f[ns[F]].cancel(_);
  }, state: s, steps: f };
}
const { schedule: Qt, cancel: Ni, state: Se, steps: cf } = /* @__PURE__ */ fb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : mn, !0);
let fs;
function eE() {
  fs = void 0;
}
const De = {
  now: () => (fs === void 0 && De.set(Se.isProcessing || _i.useManualTiming ? Se.timestamp : performance.now()), fs),
  set: (e) => {
    fs = e, queueMicrotask(eE);
  }
}, hb = (e) => (i) => typeof i == "string" && i.startsWith(e), db = /* @__PURE__ */ hb("--"), nE = /* @__PURE__ */ hb("var(--"), zh = (e) => nE(e) ? iE.test(e.split("/*")[0].trim()) : !1, iE = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function zy(e) {
  return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--");
}
const cr = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, El = {
  ...cr,
  transform: (e) => _n(0, 1, e)
}, is = {
  ...cr,
  default: 1
}, gl = (e) => Math.round(e * 1e5) / 1e5, Dh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function aE(e) {
  return e == null;
}
const rE = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Rh = (e, i) => (r) => !!(typeof r == "string" && rE.test(r) && r.startsWith(e) || i && !aE(r) && Object.prototype.hasOwnProperty.call(r, i)), pb = (e, i, r) => (l) => {
  if (typeof l != "string")
    return l;
  const [s, u, f, d] = l.match(Dh);
  return {
    [e]: parseFloat(s),
    [i]: parseFloat(u),
    [r]: parseFloat(f),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, lE = (e) => _n(0, 255, e), ff = {
  ...cr,
  transform: (e) => Math.round(lE(e))
}, ra = {
  test: /* @__PURE__ */ Rh("rgb", "red"),
  parse: /* @__PURE__ */ pb("red", "green", "blue"),
  transform: ({ red: e, green: i, blue: r, alpha: l = 1 }) => "rgba(" + ff.transform(e) + ", " + ff.transform(i) + ", " + ff.transform(r) + ", " + gl(El.transform(l)) + ")"
};
function oE(e) {
  let i = "", r = "", l = "", s = "";
  return e.length > 5 ? (i = e.substring(1, 3), r = e.substring(3, 5), l = e.substring(5, 7), s = e.substring(7, 9)) : (i = e.substring(1, 2), r = e.substring(2, 3), l = e.substring(3, 4), s = e.substring(4, 5), i += i, r += r, l += l, s += s), {
    red: parseInt(i, 16),
    green: parseInt(r, 16),
    blue: parseInt(l, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Hf = {
  test: /* @__PURE__ */ Rh("#"),
  parse: oE,
  transform: ra.transform
}, Rl = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (i) => typeof i == "string" && i.endsWith(e) && i.split(" ").length === 1,
  parse: parseFloat,
  transform: (i) => `${i}${e}`
}), Di = /* @__PURE__ */ Rl("deg"), On = /* @__PURE__ */ Rl("%"), ft = /* @__PURE__ */ Rl("px"), sE = /* @__PURE__ */ Rl("vh"), uE = /* @__PURE__ */ Rl("vw"), Dy = {
  ...On,
  parse: (e) => On.parse(e) / 100,
  transform: (e) => On.transform(e * 100)
}, ir = {
  test: /* @__PURE__ */ Rh("hsl", "hue"),
  parse: /* @__PURE__ */ pb("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: i, lightness: r, alpha: l = 1 }) => "hsla(" + Math.round(e) + ", " + On.transform(gl(i)) + ", " + On.transform(gl(r)) + ", " + gl(El.transform(l)) + ")"
}, ce = {
  test: (e) => ra.test(e) || Hf.test(e) || ir.test(e),
  parse: (e) => ra.test(e) ? ra.parse(e) : ir.test(e) ? ir.parse(e) : Hf.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? ra.transform(e) : ir.transform(e),
  getAnimatableNone: (e) => {
    const i = ce.parse(e);
    return i.alpha = 0, ce.transform(i);
  }
}, cE = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function fE(e) {
  var i, r;
  return isNaN(e) && typeof e == "string" && (((i = e.match(Dh)) == null ? void 0 : i.length) || 0) + (((r = e.match(cE)) == null ? void 0 : r.length) || 0) > 0;
}
const mb = "number", gb = "color", hE = "var", dE = "var(", Ry = "${}", pE = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function sr(e) {
  const i = e.toString(), r = [], l = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let u = 0;
  const d = i.replace(pE, (m) => (ce.test(m) ? (l.color.push(u), s.push(gb), r.push(ce.parse(m))) : m.startsWith(dE) ? (l.var.push(u), s.push(hE), r.push(m)) : (l.number.push(u), s.push(mb), r.push(parseFloat(m))), ++u, Ry)).split(Ry);
  return { values: r, split: d, indexes: l, types: s };
}
function mE(e) {
  return sr(e).values;
}
function yb({ split: e, types: i }) {
  const r = e.length;
  return (l) => {
    let s = "";
    for (let u = 0; u < r; u++)
      if (s += e[u], l[u] !== void 0) {
        const f = i[u];
        f === mb ? s += gl(l[u]) : f === gb ? s += ce.transform(l[u]) : s += l[u];
      }
    return s;
  };
}
function gE(e) {
  return yb(sr(e));
}
const yE = (e) => typeof e == "number" ? 0 : ce.test(e) ? ce.getAnimatableNone(e) : e, vE = (e, i) => typeof e == "number" ? i != null && i.trim().endsWith("/") ? e : 0 : yE(e);
function bE(e) {
  const i = sr(e);
  return yb(i)(i.values.map((l, s) => vE(l, i.split[s])));
}
const Sn = {
  test: fE,
  parse: mE,
  createTransformer: gE,
  getAnimatableNone: bE
};
function hf(e, i, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (i - e) * 6 * r : r < 1 / 2 ? i : r < 2 / 3 ? e + (i - e) * (2 / 3 - r) * 6 : e;
}
function xE({ hue: e, saturation: i, lightness: r, alpha: l }) {
  e /= 360, i /= 100, r /= 100;
  let s = 0, u = 0, f = 0;
  if (!i)
    s = u = f = r;
  else {
    const d = r < 0.5 ? r * (1 + i) : r + i - r * i, m = 2 * r - d;
    s = hf(m, d, e + 1 / 3), u = hf(m, d, e), f = hf(m, d, e - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: l
  };
}
function Ss(e, i) {
  return (r) => r > 0 ? i : e;
}
const Wt = (e, i, r) => e + (i - e) * r, df = (e, i, r) => {
  const l = e * e, s = r * (i * i - l) + l;
  return s < 0 ? 0 : Math.sqrt(s);
}, wE = [Hf, ra, ir], SE = (e) => wE.find((i) => i.test(e));
function Oy(e) {
  const i = SE(e);
  if (Ml(!!i, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !i)
    return !1;
  let r = i.parse(e);
  return i === ir && (r = xE(r)), r;
}
const _y = (e, i) => {
  const r = Oy(e), l = Oy(i);
  if (!r || !l)
    return Ss(e, i);
  const s = { ...r };
  return (u) => (s.red = df(r.red, l.red, u), s.green = df(r.green, l.green, u), s.blue = df(r.blue, l.blue, u), s.alpha = Wt(r.alpha, l.alpha, u), ra.transform(s));
}, qf = /* @__PURE__ */ new Set(["none", "hidden"]);
function TE(e, i) {
  return qf.has(e) ? (r) => r <= 0 ? e : i : (r) => r >= 1 ? i : e;
}
function EE(e, i) {
  return (r) => Wt(e, i, r);
}
function Oh(e) {
  return typeof e == "number" ? EE : typeof e == "string" ? zh(e) ? Ss : ce.test(e) ? _y : CE : Array.isArray(e) ? vb : typeof e == "object" ? ce.test(e) ? _y : AE : Ss;
}
function vb(e, i) {
  const r = [...e], l = r.length, s = e.map((u, f) => Oh(u)(u, i[f]));
  return (u) => {
    for (let f = 0; f < l; f++)
      r[f] = s[f](u);
    return r;
  };
}
function AE(e, i) {
  const r = { ...e, ...i }, l = {};
  for (const s in r)
    e[s] !== void 0 && i[s] !== void 0 && (l[s] = Oh(e[s])(e[s], i[s]));
  return (s) => {
    for (const u in l)
      r[u] = l[u](s);
    return r;
  };
}
function kE(e, i) {
  const r = [], l = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < i.values.length; s++) {
    const u = i.types[s], f = e.indexes[u][l[u]], d = e.values[f] ?? 0;
    r[s] = d, l[u]++;
  }
  return r;
}
const CE = (e, i) => {
  const r = Sn.createTransformer(i), l = sr(e), s = sr(i);
  return l.indexes.var.length === s.indexes.var.length && l.indexes.color.length === s.indexes.color.length && l.indexes.number.length >= s.indexes.number.length ? qf.has(e) && !s.values.length || qf.has(i) && !l.values.length ? TE(e, i) : zl(vb(kE(l, s), s.values), r) : (Ml(!0, `Complex values '${e}' and '${i}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ss(e, i));
};
function bb(e, i, r) {
  return typeof e == "number" && typeof i == "number" && typeof r == "number" ? Wt(e, i, r) : Oh(e)(e, i);
}
const ME = (e) => {
  const i = ({ timestamp: r }) => e(r);
  return {
    start: (r = !0) => Qt.update(i, r),
    stop: () => Ni(i),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Se.isProcessing ? Se.timestamp : De.now()
  };
}, xb = (e, i, r = 10) => {
  let l = "";
  const s = Math.max(Math.round(i / r), 2);
  for (let u = 0; u < s; u++)
    l += Math.round(e(u / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, Ts = 2e4;
function _h(e) {
  let i = 0;
  const r = 50;
  let l = e.next(i);
  for (; !l.done && i < Ts; )
    i += r, l = e.next(i);
  return i >= Ts ? 1 / 0 : i;
}
function zE(e, i = 100, r) {
  const l = r({ ...e, keyframes: [0, i] }), s = Math.min(_h(l), Ts);
  return {
    type: "keyframes",
    ease: (u) => l.next(s * u).value / i,
    duration: /* @__PURE__ */ pn(s)
  };
}
const te = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Yf(e, i) {
  return e * Math.sqrt(1 - i * i);
}
const DE = 12;
function RE(e, i, r) {
  let l = r;
  for (let s = 1; s < DE; s++)
    l = l - e(l) / i(l);
  return l;
}
const pf = 1e-3;
function OE({ duration: e = te.duration, bounce: i = te.bounce, velocity: r = te.velocity, mass: l = te.mass }) {
  let s, u;
  Ml(e <= /* @__PURE__ */ Ge(te.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - i;
  f = _n(te.minDamping, te.maxDamping, f), e = _n(te.minDuration, te.maxDuration, /* @__PURE__ */ pn(e)), f < 1 ? (s = (p) => {
    const g = p * f, y = g * e, b = g - r, x = Yf(p, f), A = Math.exp(-y);
    return pf - b / x * A;
  }, u = (p) => {
    const y = p * f * e, b = y * r + r, x = Math.pow(f, 2) * Math.pow(p, 2) * e, A = Math.exp(-y), z = Yf(Math.pow(p, 2), f);
    return (-s(p) + pf > 0 ? -1 : 1) * ((b - x) * A) / z;
  }) : (s = (p) => {
    const g = Math.exp(-p * e), y = (p - r) * e + 1;
    return -pf + g * y;
  }, u = (p) => {
    const g = Math.exp(-p * e), y = (r - p) * (e * e);
    return g * y;
  });
  const d = 5 / e, m = RE(s, u, d);
  if (e = /* @__PURE__ */ Ge(e), isNaN(m))
    return {
      stiffness: te.stiffness,
      damping: te.damping,
      duration: e
    };
  {
    const p = Math.pow(m, 2) * l;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(l * p),
      duration: e
    };
  }
}
const _E = ["duration", "bounce"], NE = ["stiffness", "damping", "mass"];
function Ny(e, i) {
  return i.some((r) => e[r] !== void 0);
}
function LE(e) {
  let i = {
    velocity: te.velocity,
    stiffness: te.stiffness,
    damping: te.damping,
    mass: te.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Ny(e, NE) && Ny(e, _E))
    if (i.velocity = 0, e.visualDuration) {
      const r = e.visualDuration, l = 2 * Math.PI / (r * 1.2), s = l * l, u = 2 * _n(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(s);
      i = {
        ...i,
        mass: te.mass,
        stiffness: s,
        damping: u
      };
    } else {
      const r = OE({ ...e, velocity: 0 });
      i = {
        ...i,
        ...r,
        mass: te.mass
      }, i.isResolvedFromDuration = !0;
    }
  return i;
}
function Es(e = te.visualDuration, i = te.bounce) {
  const r = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: i
  } : e;
  let { restSpeed: l, restDelta: s } = r;
  const u = r.keyframes[0], f = r.keyframes[r.keyframes.length - 1], d = { done: !1, value: u }, { stiffness: m, damping: p, mass: g, duration: y, velocity: b, isResolvedFromDuration: x } = LE({
    ...r,
    velocity: -/* @__PURE__ */ pn(r.velocity || 0)
  }), A = b || 0, z = p / (2 * Math.sqrt(m * g)), D = f - u, M = /* @__PURE__ */ pn(Math.sqrt(m / g)), H = Math.abs(D) < 5;
  l || (l = H ? te.restSpeed.granular : te.restSpeed.default), s || (s = H ? te.restDelta.granular : te.restDelta.default);
  let _, F, K, B, I, j;
  if (z < 1)
    K = Yf(M, z), B = (A + z * M * D) / K, _ = (et) => {
      const W = Math.exp(-z * M * et);
      return f - W * (B * Math.sin(K * et) + D * Math.cos(K * et));
    }, I = z * M * B + D * K, j = z * M * D - B * K, F = (et) => Math.exp(-z * M * et) * (I * Math.sin(K * et) + j * Math.cos(K * et));
  else if (z === 1) {
    _ = (W) => f - Math.exp(-M * W) * (D + (A + M * D) * W);
    const et = A + M * D;
    F = (W) => Math.exp(-M * W) * (M * et * W - A);
  } else {
    const et = M * Math.sqrt(z * z - 1);
    _ = (lt) => {
      const Z = Math.exp(-z * M * lt), O = Math.min(et * lt, 300);
      return f - Z * ((A + z * M * D) * Math.sinh(O) + et * D * Math.cosh(O)) / et;
    };
    const W = (A + z * M * D) / et, $ = z * M * W - D * et, vt = z * M * D - W * et;
    F = (lt) => {
      const Z = Math.exp(-z * M * lt), O = Math.min(et * lt, 300);
      return Z * ($ * Math.sinh(O) + vt * Math.cosh(O));
    };
  }
  const J = {
    calculatedDuration: x && y || null,
    velocity: (et) => /* @__PURE__ */ Ge(F(et)),
    next: (et) => {
      if (!x && z < 1) {
        const $ = Math.exp(-z * M * et), vt = Math.sin(K * et), lt = Math.cos(K * et), Z = f - $ * (B * vt + D * lt), O = /* @__PURE__ */ Ge($ * (I * vt + j * lt));
        return d.done = Math.abs(O) <= l && Math.abs(f - Z) <= s, d.value = d.done ? f : Z, d;
      }
      const W = _(et);
      if (x)
        d.done = et >= y;
      else {
        const $ = /* @__PURE__ */ Ge(F(et));
        d.done = Math.abs($) <= l && Math.abs(f - W) <= s;
      }
      return d.value = d.done ? f : W, d;
    },
    toString: () => {
      const et = Math.min(_h(J), Ts), W = xb(($) => J.next(et * $).value, et, 30);
      return et + "ms " + W;
    },
    toTransition: () => {
    }
  };
  return J;
}
Es.applyToOptions = (e) => {
  const i = zE(e, 100, Es);
  return e.ease = i.ease, e.duration = /* @__PURE__ */ Ge(i.duration), e.type = "keyframes", e;
};
const VE = 5;
function wb(e, i, r) {
  const l = Math.max(i - VE, 0);
  return tb(r - e(l), i - l);
}
function Gf({ keyframes: e, velocity: i = 0, power: r = 0.8, timeConstant: l = 325, bounceDamping: s = 10, bounceStiffness: u = 500, modifyTarget: f, min: d, max: m, restDelta: p = 0.5, restSpeed: g }) {
  const y = e[0], b = {
    done: !1,
    value: y
  }, x = (j) => d !== void 0 && j < d || m !== void 0 && j > m, A = (j) => d === void 0 ? m : m === void 0 || Math.abs(d - j) < Math.abs(m - j) ? d : m;
  let z = r * i;
  const D = y + z, M = f === void 0 ? D : f(D);
  M !== D && (z = M - y);
  const H = (j) => -z * Math.exp(-j / l), _ = (j) => M + H(j), F = (j) => {
    const J = H(j), et = _(j);
    b.done = Math.abs(J) <= p, b.value = b.done ? M : et;
  };
  let K, B;
  const I = (j) => {
    x(b.value) && (K = j, B = Es({
      keyframes: [b.value, A(b.value)],
      velocity: wb(_, j, b.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: u,
      restDelta: p,
      restSpeed: g
    }));
  };
  return I(0), {
    calculatedDuration: null,
    next: (j) => {
      let J = !1;
      return !B && K === void 0 && (J = !0, F(j), I(j)), K !== void 0 && j >= K ? B.next(j - K) : (!J && F(j), b);
    }
  };
}
function BE(e, i, r) {
  const l = [], s = r || _i.mix || bb, u = e.length - 1;
  for (let f = 0; f < u; f++) {
    let d = s(e[f], e[f + 1]);
    if (i) {
      const m = Array.isArray(i) ? i[f] || mn : i;
      d = zl(m, d);
    }
    l.push(d);
  }
  return l;
}
function UE(e, i, { clamp: r = !0, ease: l, mixer: s } = {}) {
  const u = e.length;
  if (ua(u === i.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => i[0];
  if (u === 2 && i[0] === i[1])
    return () => i[1];
  const f = e[0] === e[1];
  e[0] > e[u - 1] && (e = [...e].reverse(), i = [...i].reverse());
  const d = BE(i, l, s), m = d.length, p = (g) => {
    if (f && g < e[0])
      return i[0];
    let y = 0;
    if (m > 1)
      for (; y < e.length - 2 && !(g < e[y + 1]); y++)
        ;
    const b = /* @__PURE__ */ Tl(e[y], e[y + 1], g);
    return d[y](b);
  };
  return r ? (g) => p(_n(e[0], e[u - 1], g)) : p;
}
function jE(e, i) {
  const r = e[e.length - 1];
  for (let l = 1; l <= i; l++) {
    const s = /* @__PURE__ */ Tl(0, i, l);
    e.push(Wt(r, 1, s));
  }
}
function HE(e) {
  const i = [0];
  return jE(i, e.length - 1), i;
}
function qE(e, i) {
  return e.map((r) => r * i);
}
function YE(e, i) {
  return e.map(() => i || ub).splice(0, e.length - 1);
}
function yl({ duration: e = 300, keyframes: i, times: r, ease: l = "easeInOut" }) {
  const s = JT(l) ? l.map(My) : My(l), u = {
    done: !1,
    value: i[0]
  }, f = qE(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === i.length ? r : HE(i),
    e
  ), d = UE(f, i, {
    ease: Array.isArray(s) ? s : YE(i, s)
  });
  return {
    calculatedDuration: e,
    next: (m) => (u.value = d(m), u.done = m >= e, u)
  };
}
const GE = (e) => e !== null;
function Ns(e, { repeat: i, repeatType: r = "loop" }, l, s = 1) {
  const u = e.filter(GE), d = s < 0 || i && r !== "loop" && i % 2 === 1 ? 0 : u.length - 1;
  return !d || l === void 0 ? u[d] : l;
}
const XE = {
  decay: Gf,
  inertia: Gf,
  tween: yl,
  keyframes: yl,
  spring: Es
};
function Sb(e) {
  typeof e.type == "string" && (e.type = XE[e.type]);
}
class Nh {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(i, r) {
    return this.finished.then(i, r);
  }
}
const PE = (e) => e / 100;
class As extends Nh {
  constructor(i) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var l, s;
      const { motionValue: r } = this.options;
      r && r.updatedAt !== De.now() && this.tick(De.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (s = (l = this.options).onStop) == null || s.call(l));
    }, this.options = i, this.initAnimation(), this.play(), i.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: i } = this;
    Sb(i);
    const { type: r = yl, repeat: l = 0, repeatDelay: s = 0, repeatType: u, velocity: f = 0 } = i;
    let { keyframes: d } = i;
    const m = r || yl;
    m !== yl && typeof d[0] != "number" && (this.mixKeyframes = zl(PE, bb(d[0], d[1])), d = [0, 100]);
    const p = m({ ...i, keyframes: d });
    u === "mirror" && (this.mirroredGenerator = m({
      ...i,
      keyframes: [...d].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = _h(p));
    const { calculatedDuration: g } = p;
    this.calculatedDuration = g, this.resolvedDuration = g + s, this.totalDuration = this.resolvedDuration * (l + 1) - s, this.generator = p;
  }
  updateTime(i) {
    const r = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(i, r = !1) {
    const { generator: l, totalDuration: s, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: d, calculatedDuration: m } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: p = 0, keyframes: g, repeat: y, repeatType: b, repeatDelay: x, type: A, onUpdate: z, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, i) : this.speed < 0 && (this.startTime = Math.min(i - s / this.speed, this.startTime)), r ? this.currentTime = i : this.updateTime(i);
    const M = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), H = this.playbackSpeed >= 0 ? M < 0 : M > s;
    this.currentTime = Math.max(M, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let _ = this.currentTime, F = l;
    if (y) {
      const j = Math.min(this.currentTime, s) / d;
      let J = Math.floor(j), et = j % 1;
      !et && j >= 1 && (et = 1), et === 1 && J--, J = Math.min(J, y + 1), !!(J % 2) && (b === "reverse" ? (et = 1 - et, x && (et -= x / d)) : b === "mirror" && (F = f)), _ = _n(0, 1, et) * d;
    }
    let K;
    H ? (this.delayState.value = g[0], K = this.delayState) : K = F.next(_), u && !H && (K.value = u(K.value));
    let { done: B } = K;
    !H && m !== null && (B = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const I = this.holdTime === null && (this.state === "finished" || this.state === "running" && B);
    return I && A !== Gf && (K.value = Ns(g, this.options, D, this.speed)), z && z(K.value), I && this.finish(), K;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(i, r) {
    return this.finished.then(i, r);
  }
  get duration() {
    return /* @__PURE__ */ pn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ pn(i);
  }
  get time() {
    return /* @__PURE__ */ pn(this.currentTime);
  }
  set time(i) {
    i = /* @__PURE__ */ Ge(i), this.currentTime = i, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = i : this.driver && (this.startTime = this.driver.now() - i / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = i, this.tick(i));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const i = this.currentTime;
    if (i <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(i);
    const r = this.generator.next(i).value;
    return wb((l) => this.generator.next(l).value, i, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    const r = this.playbackSpeed !== i;
    r && this.driver && this.updateTime(De.now()), this.playbackSpeed = i, r && this.driver && (this.time = /* @__PURE__ */ pn(this.currentTime));
  }
  play() {
    var s, u;
    if (this.isStopped)
      return;
    const { driver: i = ME, startTime: r } = this.options;
    this.driver || (this.driver = i((f) => this.tick(f))), (u = (s = this.options).onPlay) == null || u.call(s);
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = r ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(De.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var i, r;
    this.notifyFinished(), this.teardown(), this.state = "finished", (r = (i = this.options).onComplete) == null || r.call(i);
  }
  cancel() {
    var i, r;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (r = (i = this.options).onCancel) == null || r.call(i);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(i) {
    return this.startTime = 0, this.tick(i, !0);
  }
  attachTimeline(i) {
    var r;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (r = this.driver) == null || r.stop(), i.observe(this);
  }
}
function FE(e) {
  for (let i = 1; i < e.length; i++)
    e[i] ?? (e[i] = e[i - 1]);
}
const la = (e) => e * 180 / Math.PI, Xf = (e) => {
  const i = la(Math.atan2(e[1], e[0]));
  return Pf(i);
}, QE = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Xf,
  rotateZ: Xf,
  skewX: (e) => la(Math.atan(e[1])),
  skewY: (e) => la(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Pf = (e) => (e = e % 360, e < 0 && (e += 360), e), Ly = Xf, Vy = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), By = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), KE = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Vy,
  scaleY: By,
  scale: (e) => (Vy(e) + By(e)) / 2,
  rotateX: (e) => Pf(la(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Pf(la(Math.atan2(-e[2], e[0]))),
  rotateZ: Ly,
  rotate: Ly,
  skewX: (e) => la(Math.atan(e[4])),
  skewY: (e) => la(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Ff(e) {
  return e.includes("scale") ? 1 : 0;
}
function Qf(e, i) {
  if (!e || e === "none")
    return Ff(i);
  const r = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, s;
  if (r)
    l = KE, s = r;
  else {
    const d = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = QE, s = d;
  }
  if (!s)
    return Ff(i);
  const u = l[i], f = s[1].split(",").map(IE);
  return typeof u == "function" ? u(f) : f[u];
}
const ZE = (e, i) => {
  const { transform: r = "none" } = getComputedStyle(e);
  return Qf(r, i);
};
function IE(e) {
  return parseFloat(e.trim());
}
const fr = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], hr = new Set(fr), Uy = (e) => e === cr || e === ft, JE = /* @__PURE__ */ new Set(["x", "y", "z"]), WE = fr.filter((e) => !JE.has(e));
function $E(e) {
  const i = [];
  return WE.forEach((r) => {
    const l = e.getValue(r);
    l !== void 0 && (i.push([r, l.get()]), l.set(r.startsWith("scale") ? 1 : 0));
  }), i;
}
const Oi = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: i = "0", paddingRight: r = "0", boxSizing: l }) => {
    const s = e.max - e.min;
    return l === "border-box" ? s : s - parseFloat(i) - parseFloat(r);
  },
  height: ({ y: e }, { paddingTop: i = "0", paddingBottom: r = "0", boxSizing: l }) => {
    const s = e.max - e.min;
    return l === "border-box" ? s : s - parseFloat(i) - parseFloat(r);
  },
  top: (e, { top: i }) => parseFloat(i),
  left: (e, { left: i }) => parseFloat(i),
  bottom: ({ y: e }, { top: i }) => parseFloat(i) + (e.max - e.min),
  right: ({ x: e }, { left: i }) => parseFloat(i) + (e.max - e.min),
  // Transform
  x: (e, { transform: i }) => Qf(i, "x"),
  y: (e, { transform: i }) => Qf(i, "y")
};
Oi.translateX = Oi.x;
Oi.translateY = Oi.y;
const oa = /* @__PURE__ */ new Set();
let Kf = !1, Zf = !1, If = !1;
function Tb() {
  if (Zf) {
    const e = Array.from(oa).filter((l) => l.needsMeasurement), i = new Set(e.map((l) => l.element)), r = /* @__PURE__ */ new Map();
    i.forEach((l) => {
      const s = $E(l);
      s.length && (r.set(l, s), l.render());
    }), e.forEach((l) => l.measureInitialState()), i.forEach((l) => {
      l.render();
      const s = r.get(l);
      s && s.forEach(([u, f]) => {
        var d;
        (d = l.getValue(u)) == null || d.set(f);
      });
    }), e.forEach((l) => l.measureEndState()), e.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  Zf = !1, Kf = !1, oa.forEach((e) => e.complete(If)), oa.clear();
}
function Eb() {
  oa.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Zf = !0);
  });
}
function tA() {
  If = !0, Eb(), Tb(), If = !1;
}
class Lh {
  constructor(i, r, l, s, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...i], this.onComplete = r, this.name = l, this.motionValue = s, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (oa.add(this), Kf || (Kf = !0, Qt.read(Eb), Qt.resolveKeyframes(Tb))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, name: r, element: l, motionValue: s } = this;
    if (i[0] === null) {
      const u = s == null ? void 0 : s.get(), f = i[i.length - 1];
      if (u !== void 0)
        i[0] = u;
      else if (l && r) {
        const d = l.readValue(r, f);
        d != null && (i[0] = d);
      }
      i[0] === void 0 && (i[0] = f), s && u === void 0 && s.set(i[0]);
    }
    FE(i);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(i = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i), oa.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (oa.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const eA = (e) => e.startsWith("--");
function Ab(e, i, r) {
  eA(i) ? e.style.setProperty(i, r) : e.style[i] = r;
}
const nA = {};
function kb(e, i) {
  const r = /* @__PURE__ */ $0(e);
  return () => nA[i] ?? r();
}
const iA = /* @__PURE__ */ kb(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Cb = /* @__PURE__ */ kb(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ml = ([e, i, r, l]) => `cubic-bezier(${e}, ${i}, ${r}, ${l})`, jy = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ml([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ml([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ml([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ml([0.33, 1.53, 0.69, 0.99])
};
function Mb(e, i) {
  if (e)
    return typeof e == "function" ? Cb() ? xb(e, i) : "ease-out" : cb(e) ? ml(e) : Array.isArray(e) ? e.map((r) => Mb(r, i) || jy.easeOut) : jy[e];
}
function aA(e, i, r, { delay: l = 0, duration: s = 300, repeat: u = 0, repeatType: f = "loop", ease: d = "easeOut", times: m } = {}, p = void 0) {
  const g = {
    [i]: r
  };
  m && (g.offset = m);
  const y = Mb(d, s);
  Array.isArray(y) && (g.easing = y);
  const b = {
    delay: l,
    duration: s,
    easing: Array.isArray(y) ? "linear" : y,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (b.pseudoElement = p), e.animate(g, b);
}
function zb(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function rA({ type: e, ...i }) {
  return zb(e) && Cb() ? e.applyToOptions(i) : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class Db extends Nh {
  constructor(i) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !i)
      return;
    const { element: r, name: l, keyframes: s, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: d, onComplete: m } = i;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = i, ua(typeof i.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = rA(i);
    this.animation = aA(r, l, s, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const g = Ns(s, this.options, d, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Ab(r, l, g), this.animation.cancel();
      }
      m == null || m(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var i, r;
    (r = (i = this.animation).finish) == null || r.call(i);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: i } = this;
    i === "idle" || i === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var r, l, s;
    const i = (r = this.options) == null ? void 0 : r.element;
    !this.isPseudoElement && (i != null && i.isConnected) && ((s = (l = this.animation).commitStyles) == null || s.call(l));
  }
  get duration() {
    var r, l;
    const i = ((l = (r = this.animation.effect) == null ? void 0 : r.getComputedTiming) == null ? void 0 : l.call(r).duration) || 0;
    return /* @__PURE__ */ pn(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ pn(i);
  }
  get time() {
    return /* @__PURE__ */ pn(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ge(i), r && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    i < 0 && (this.finishedTime = null), this.animation.playbackRate = i;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(i) {
    this.manualStartTime = this.animation.startTime = i;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: i, rangeStart: r, rangeEnd: l, observe: s }) {
    var u;
    return this.allowFlatten && ((u = this.animation.effect) == null || u.updateTiming({ easing: "linear" })), this.animation.onfinish = null, i && iA() ? (this.animation.timeline = i, r && (this.animation.rangeStart = r), l && (this.animation.rangeEnd = l), mn) : s(this);
  }
}
const Rb = {
  anticipate: lb,
  backInOut: rb,
  circInOut: sb
};
function lA(e) {
  return e in Rb;
}
function oA(e) {
  typeof e.ease == "string" && lA(e.ease) && (e.ease = Rb[e.ease]);
}
const mf = 10;
class sA extends Db {
  constructor(i) {
    oA(i), Sb(i), super(i), i.startTime !== void 0 && i.autoplay !== !1 && (this.startTime = i.startTime), this.options = i;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(i) {
    const { motionValue: r, onUpdate: l, onComplete: s, element: u, ...f } = this.options;
    if (!r)
      return;
    if (i !== void 0) {
      r.set(i);
      return;
    }
    const d = new As({
      ...f,
      autoplay: !1
    }), m = Math.max(mf, De.now() - this.startTime), p = _n(0, mf, m - mf), g = d.sample(m).value, { name: y } = this.options;
    u && y && Ab(u, y, g), r.setWithVelocity(d.sample(Math.max(0, m - p)).value, g, p), d.stop();
  }
}
const Hy = (e, i) => i === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(Sn.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function uA(e) {
  const i = e[0];
  if (e.length === 1)
    return !0;
  for (let r = 0; r < e.length; r++)
    if (e[r] !== i)
      return !0;
}
function cA(e, i, r, l) {
  const s = e[0];
  if (s === null)
    return !1;
  if (i === "display" || i === "visibility")
    return !0;
  const u = e[e.length - 1], f = Hy(s, i), d = Hy(u, i);
  return Ml(f === d, `You are trying to animate ${i} from "${s}" to "${u}". "${f ? u : s}" is not an animatable value.`, "value-not-animatable"), !f || !d ? !1 : uA(e) || (r === "spring" || zb(r)) && l;
}
function Jf(e) {
  e.duration = 0, e.type = "keyframes";
}
const Ob = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), fA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hA(e) {
  for (let i = 0; i < e.length; i++)
    if (typeof e[i] == "string" && fA.test(e[i]))
      return !0;
  return !1;
}
const dA = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), pA = /* @__PURE__ */ $0(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function mA(e) {
  var y;
  const { motionValue: i, name: r, repeatDelay: l, repeatType: s, damping: u, type: f, keyframes: d } = e;
  if (!(((y = i == null ? void 0 : i.owner) == null ? void 0 : y.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: g } = i.owner.getProps();
  return pA() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Ob.has(r) || dA.has(r) && hA(d)) && (r !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && s !== "mirror" && u !== 0 && f !== "inertia";
}
const gA = 40;
class yA extends Nh {
  constructor({ autoplay: i = !0, delay: r = 0, type: l = "keyframes", repeat: s = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: d, name: m, motionValue: p, element: g, ...y }) {
    var A;
    super(), this.stop = () => {
      var z, D;
      this._animation && (this._animation.stop(), (z = this.stopTimeline) == null || z.call(this)), (D = this.keyframeResolver) == null || D.cancel();
    }, this.createdAt = De.now();
    const b = {
      autoplay: i,
      delay: r,
      type: l,
      repeat: s,
      repeatDelay: u,
      repeatType: f,
      name: m,
      motionValue: p,
      element: g,
      ...y
    }, x = (g == null ? void 0 : g.KeyframeResolver) || Lh;
    this.keyframeResolver = new x(d, (z, D, M) => this.onKeyframesResolved(z, D, b, !M), m, p, g), (A = this.keyframeResolver) == null || A.scheduleResolve();
  }
  onKeyframesResolved(i, r, l, s) {
    var M, H;
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: d, delay: m, isHandoff: p, onUpdate: g } = l;
    this.resolvedAt = De.now();
    let y = !0;
    cA(i, u, f, d) || (y = !1, (_i.instantAnimations || !m) && (g == null || g(Ns(i, l, r))), i[0] = i[i.length - 1], Jf(l), l.repeat = 0);
    const x = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > gA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...l,
      keyframes: i
    }, A = y && !p && mA(x), z = (H = (M = x.motionValue) == null ? void 0 : M.owner) == null ? void 0 : H.current;
    let D;
    if (A)
      try {
        D = new sA({
          ...x,
          element: z
        });
      } catch {
        D = new As(x);
      }
    else
      D = new As(x);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(mn), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, r) {
    return this.finished.finally(i).then(() => {
    });
  }
  get animation() {
    var i;
    return this._animation || ((i = this.keyframeResolver) == null || i.resume(), tA()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(i) : this.pendingTimeline = i, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var i;
    this._animation && this.animation.cancel(), (i = this.keyframeResolver) == null || i.cancel();
  }
}
function _b(e, i, r, l = 0, s = 1) {
  const u = Array.from(e).sort((p, g) => p.sortNodePosition(g)).indexOf(i), f = e.size, d = (f - 1) * l;
  return typeof r == "function" ? r(u, f) : s === 1 ? u * l : d - u * l;
}
const vA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function bA(e) {
  const i = vA.exec(e);
  if (!i)
    return [,];
  const [, r, l, s] = i;
  return [`--${r ?? l}`, s];
}
const xA = 4;
function Nb(e, i, r = 1) {
  ua(r <= xA, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, s] = bA(e);
  if (!l)
    return;
  const u = window.getComputedStyle(i).getPropertyValue(l);
  if (u) {
    const f = u.trim();
    return I0(f) ? parseFloat(f) : f;
  }
  return zh(s) ? Nb(s, i, r + 1) : s;
}
const wA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, SA = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), TA = {
  type: "keyframes",
  duration: 0.8
}, EA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, AA = (e, { keyframes: i }) => i.length > 2 ? TA : hr.has(e) ? e.startsWith("scale") ? SA(i[1]) : wA : EA;
function Lb(e, i) {
  if (e != null && e.inherit && i) {
    const { inherit: r, ...l } = e;
    return { ...i, ...l };
  }
  return e;
}
function Vh(e, i) {
  const r = (e == null ? void 0 : e[i]) ?? (e == null ? void 0 : e.default) ?? e;
  return r !== e ? Lb(r, e) : r;
}
const kA = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function CA(e) {
  for (const i in e)
    if (!kA.has(i))
      return !0;
  return !1;
}
const Bh = (e, i, r, l = {}, s, u) => (f) => {
  const d = Vh(l, e) || {}, m = d.delay || l.delay || 0;
  let { elapsed: p = 0 } = l;
  p = p - /* @__PURE__ */ Ge(m);
  const g = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: i.getVelocity(),
    ...d,
    delay: -p,
    onUpdate: (b) => {
      i.set(b), d.onUpdate && d.onUpdate(b);
    },
    onComplete: () => {
      f(), d.onComplete && d.onComplete();
    },
    name: e,
    motionValue: i,
    element: u ? void 0 : s
  };
  CA(d) || Object.assign(g, AA(e, g)), g.duration && (g.duration = /* @__PURE__ */ Ge(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Ge(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let y = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Jf(g), g.delay === 0 && (y = !0)), (_i.instantAnimations || _i.skipAnimations || s != null && s.shouldSkipAnimations) && (y = !0, Jf(g), g.delay = 0), g.allowFlatten = !d.type && !d.ease, y && !u && i.get() !== void 0) {
    const b = Ns(g.keyframes, d);
    if (b !== void 0) {
      Qt.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new As(g) : new yA(g);
};
function qy(e) {
  const i = [{}, {}];
  return e == null || e.values.forEach((r, l) => {
    i[0][l] = r.get(), i[1][l] = r.getVelocity();
  }), i;
}
function Uh(e, i, r, l) {
  if (typeof i == "function") {
    const [s, u] = qy(l);
    i = i(r !== void 0 ? r : e.custom, s, u);
  }
  if (typeof i == "string" && (i = e.variants && e.variants[i]), typeof i == "function") {
    const [s, u] = qy(l);
    i = i(r !== void 0 ? r : e.custom, s, u);
  }
  return i;
}
function sa(e, i, r) {
  const l = e.getProps();
  return Uh(l, i, r !== void 0 ? r : l.custom, e);
}
const Vb = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...fr
]), Yy = 30, MA = (e) => !isNaN(parseFloat(e));
class zA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(i, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      var u;
      const s = De.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && ((u = this.events.change) == null || u.notify(this.current), this.dependents))
        for (const f of this.dependents)
          f.dirty();
    }, this.hasAnimated = !1, this.setCurrent(i), this.owner = r.owner;
  }
  setCurrent(i) {
    this.current = i, this.updatedAt = De.now(), this.canTrackVelocity === null && i !== void 0 && (this.canTrackVelocity = MA(this.current));
  }
  setPrevFrameValue(i = this.current) {
    this.prevFrameValue = i, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(i) {
    return this.on("change", i);
  }
  on(i, r) {
    this.events[i] || (this.events[i] = new kh());
    const l = this.events[i].add(r);
    return i === "change" ? () => {
      l(), Qt.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : l;
  }
  clearListeners() {
    for (const i in this.events)
      this.events[i].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(i, r) {
    this.passiveEffect = i, this.stopPassiveEffect = r;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(i) {
    this.passiveEffect ? this.passiveEffect(i, this.updateAndNotify) : this.updateAndNotify(i);
  }
  setWithVelocity(i, r, l) {
    this.set(r), this.prev = void 0, this.prevFrameValue = i, this.prevUpdatedAt = this.updatedAt - l;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(i, r = !0) {
    this.updateAndNotify(i), this.prev = i, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var i;
    (i = this.events.change) == null || i.notify(this.current);
  }
  addDependent(i) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(i);
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const i = De.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || i - this.updatedAt > Yy)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, Yy);
    return tb(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(i) {
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = i(r), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var i, r;
    (i = this.dependents) == null || i.clear(), (r = this.events.destroy) == null || r.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function ur(e, i) {
  return new zA(e, i);
}
const Wf = (e) => Array.isArray(e);
function DA(e, i, r) {
  e.hasValue(i) ? e.getValue(i).set(r) : e.addValue(i, ur(r));
}
function RA(e) {
  return Wf(e) ? e[e.length - 1] || 0 : e;
}
function OA(e, i) {
  const r = sa(e, i);
  let { transitionEnd: l = {}, transition: s = {}, ...u } = r || {};
  u = { ...u, ...l };
  for (const f in u) {
    const d = RA(u[f]);
    DA(e, f, d);
  }
}
const Te = (e) => !!(e && e.getVelocity);
function _A(e) {
  return !!(Te(e) && e.add);
}
function $f(e, i) {
  const r = e.getValue("willChange");
  if (_A(r))
    return r.add(i);
  if (!r && _i.WillChange) {
    const l = new _i.WillChange("auto");
    e.addValue("willChange", l), l.add(i);
  }
}
function jh(e) {
  return e.replace(/([A-Z])/g, (i) => `-${i.toLowerCase()}`);
}
const NA = "framerAppearId", Bb = "data-" + jh(NA);
function Ub(e) {
  return e.props[Bb];
}
function LA({ protectedKeys: e, needsAnimating: i }, r) {
  const l = e.hasOwnProperty(r) && i[r] !== !0;
  return i[r] = !1, l;
}
function jb(e, i, { delay: r = 0, transitionOverride: l, type: s } = {}) {
  let { transition: u, transitionEnd: f, ...d } = i;
  const m = e.getDefaultTransition();
  u = u ? Lb(u, m) : m;
  const p = u == null ? void 0 : u.reduceMotion;
  l && (u = l);
  const g = [], y = s && e.animationState && e.animationState.getState()[s];
  for (const b in d) {
    const x = e.getValue(b, e.latestValues[b] ?? null), A = d[b];
    if (A === void 0 || y && LA(y, b))
      continue;
    const z = {
      delay: r,
      ...Vh(u || {}, b)
    }, D = x.get();
    if (D !== void 0 && !x.isAnimating() && !Array.isArray(A) && A === D && !z.velocity) {
      Qt.update(() => x.set(A));
      continue;
    }
    let M = !1;
    if (window.MotionHandoffAnimation) {
      const F = Ub(e);
      if (F) {
        const K = window.MotionHandoffAnimation(F, b, Qt);
        K !== null && (z.startTime = K, M = !0);
      }
    }
    $f(e, b);
    const H = p ?? e.shouldReduceMotion;
    x.start(Bh(b, x, A, H && Vb.has(b) ? { type: !1 } : z, e, M));
    const _ = x.animation;
    _ && g.push(_);
  }
  if (f) {
    const b = () => Qt.update(() => {
      f && OA(e, f);
    });
    g.length ? Promise.all(g).then(b) : b();
  }
  return g;
}
function th(e, i, r = {}) {
  var m;
  const l = sa(e, i, r.type === "exit" ? (m = e.presenceContext) == null ? void 0 : m.custom : void 0);
  let { transition: s = e.getDefaultTransition() || {} } = l || {};
  r.transitionOverride && (s = r.transitionOverride);
  const u = l ? () => Promise.all(jb(e, l, r)) : () => Promise.resolve(), f = e.variantChildren && e.variantChildren.size ? (p = 0) => {
    const { delayChildren: g = 0, staggerChildren: y, staggerDirection: b } = s;
    return VA(e, i, p, g, y, b, r);
  } : () => Promise.resolve(), { when: d } = s;
  if (d) {
    const [p, g] = d === "beforeChildren" ? [u, f] : [f, u];
    return p().then(() => g());
  } else
    return Promise.all([u(), f(r.delay)]);
}
function VA(e, i, r = 0, l = 0, s = 0, u = 1, f) {
  const d = [];
  for (const m of e.variantChildren)
    m.notify("AnimationStart", i), d.push(th(m, i, {
      ...f,
      delay: r + (typeof l == "function" ? 0 : l) + _b(e.variantChildren, m, l, s, u)
    }).then(() => m.notify("AnimationComplete", i)));
  return Promise.all(d);
}
function BA(e, i, r = {}) {
  e.notify("AnimationStart", i);
  let l;
  if (Array.isArray(i)) {
    const s = i.map((u) => th(e, u, r));
    l = Promise.all(s);
  } else if (typeof i == "string")
    l = th(e, i, r);
  else {
    const s = typeof i == "function" ? sa(e, i, r.custom) : i;
    l = Promise.all(jb(e, s, r));
  }
  return l.then(() => {
    e.notify("AnimationComplete", i);
  });
}
const UA = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Hb = (e) => (i) => i.test(e), qb = [cr, ft, On, Di, uE, sE, UA], Gy = (e) => qb.find(Hb(e));
function jA(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || W0(e) : !0;
}
const HA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function qA(e) {
  const [i, r] = e.slice(0, -1).split("(");
  if (i === "drop-shadow")
    return e;
  const [l] = r.match(Dh) || [];
  if (!l)
    return e;
  const s = r.replace(l, "");
  let u = HA.has(i) ? 1 : 0;
  return l !== r && (u *= 100), i + "(" + u + s + ")";
}
const YA = /\b([a-z-]*)\(.*?\)/gu, eh = {
  ...Sn,
  getAnimatableNone: (e) => {
    const i = e.match(YA);
    return i ? i.map(qA).join(" ") : e;
  }
}, nh = {
  ...Sn,
  getAnimatableNone: (e) => {
    const i = Sn.parse(e);
    return Sn.createTransformer(e)(i.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, Xy = {
  ...cr,
  transform: Math.round
}, GA = {
  rotate: Di,
  rotateX: Di,
  rotateY: Di,
  rotateZ: Di,
  scale: is,
  scaleX: is,
  scaleY: is,
  scaleZ: is,
  skew: Di,
  skewX: Di,
  skewY: Di,
  distance: ft,
  translateX: ft,
  translateY: ft,
  translateZ: ft,
  x: ft,
  y: ft,
  z: ft,
  perspective: ft,
  transformPerspective: ft,
  opacity: El,
  originX: Dy,
  originY: Dy,
  originZ: ft
}, Hh = {
  // Border props
  borderWidth: ft,
  borderTopWidth: ft,
  borderRightWidth: ft,
  borderBottomWidth: ft,
  borderLeftWidth: ft,
  borderRadius: ft,
  borderTopLeftRadius: ft,
  borderTopRightRadius: ft,
  borderBottomRightRadius: ft,
  borderBottomLeftRadius: ft,
  // Positioning props
  width: ft,
  maxWidth: ft,
  height: ft,
  maxHeight: ft,
  top: ft,
  right: ft,
  bottom: ft,
  left: ft,
  inset: ft,
  insetBlock: ft,
  insetBlockStart: ft,
  insetBlockEnd: ft,
  insetInline: ft,
  insetInlineStart: ft,
  insetInlineEnd: ft,
  // Spacing props
  padding: ft,
  paddingTop: ft,
  paddingRight: ft,
  paddingBottom: ft,
  paddingLeft: ft,
  paddingBlock: ft,
  paddingBlockStart: ft,
  paddingBlockEnd: ft,
  paddingInline: ft,
  paddingInlineStart: ft,
  paddingInlineEnd: ft,
  margin: ft,
  marginTop: ft,
  marginRight: ft,
  marginBottom: ft,
  marginLeft: ft,
  marginBlock: ft,
  marginBlockStart: ft,
  marginBlockEnd: ft,
  marginInline: ft,
  marginInlineStart: ft,
  marginInlineEnd: ft,
  // Typography
  fontSize: ft,
  // Misc
  backgroundPositionX: ft,
  backgroundPositionY: ft,
  ...GA,
  zIndex: Xy,
  // SVG
  fillOpacity: El,
  strokeOpacity: El,
  numOctaves: Xy
}, XA = {
  ...Hh,
  // Color props
  color: ce,
  backgroundColor: ce,
  outlineColor: ce,
  fill: ce,
  stroke: ce,
  // Border props
  borderColor: ce,
  borderTopColor: ce,
  borderRightColor: ce,
  borderBottomColor: ce,
  borderLeftColor: ce,
  filter: eh,
  WebkitFilter: eh,
  mask: nh,
  WebkitMask: nh
}, Yb = (e) => XA[e], PA = /* @__PURE__ */ new Set([eh, nh]);
function Gb(e, i) {
  let r = Yb(e);
  return PA.has(r) || (r = Sn), r.getAnimatableNone ? r.getAnimatableNone(i) : void 0;
}
const FA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function QA(e, i, r) {
  let l = 0, s;
  for (; l < e.length && !s; ) {
    const u = e[l];
    typeof u == "string" && !FA.has(u) && sr(u).values.length && (s = e[l]), l++;
  }
  if (s && r)
    for (const u of i)
      e[u] = Gb(r, s);
}
class KA extends Lh {
  constructor(i, r, l, s, u) {
    super(i, r, l, s, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: r, name: l } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < i.length; g++) {
      let y = i[g];
      if (typeof y == "string" && (y = y.trim(), zh(y))) {
        const b = Nb(y, r.current);
        b !== void 0 && (i[g] = b), g === i.length - 1 && (this.finalKeyframe = y);
      }
    }
    if (this.resolveNoneKeyframes(), !Vb.has(l) || i.length !== 2)
      return;
    const [s, u] = i, f = Gy(s), d = Gy(u), m = zy(s), p = zy(u);
    if (m !== p && Oi[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== d)
      if (Uy(f) && Uy(d))
        for (let g = 0; g < i.length; g++) {
          const y = i[g];
          typeof y == "string" && (i[g] = parseFloat(y));
        }
      else Oi[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: r } = this, l = [];
    for (let s = 0; s < i.length; s++)
      (i[s] === null || jA(i[s])) && l.push(s);
    l.length && QA(i, l, r);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: r, name: l } = this;
    if (!i || !i.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Oi[l](i.measureViewportBox(), window.getComputedStyle(i.current)), r[0] = this.measuredOrigin;
    const s = r[r.length - 1];
    s !== void 0 && i.getValue(l, s).jump(s, !1);
  }
  measureEndState() {
    var d;
    const { element: i, name: r, unresolvedKeyframes: l } = this;
    if (!i || !i.current)
      return;
    const s = i.getValue(r);
    s && s.jump(this.measuredOrigin, !1);
    const u = l.length - 1, f = l[u];
    l[u] = Oi[r](i.measureViewportBox(), window.getComputedStyle(i.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), (d = this.removedTransforms) != null && d.length && this.removedTransforms.forEach(([m, p]) => {
      i.getValue(m).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function Xb(e, i, r) {
  if (e == null)
    return [];
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let l = document;
    const s = (r == null ? void 0 : r[e]) ?? l.querySelectorAll(e);
    return s ? Array.from(s) : [];
  }
  return Array.from(e).filter((l) => l != null);
}
const Pb = (e, i) => i && typeof e == "number" ? i.transform(e) : e;
function hs(e) {
  return J0(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
const { schedule: qh } = /* @__PURE__ */ fb(queueMicrotask, !1), wn = {
  x: !1,
  y: !1
};
function Fb() {
  return wn.x || wn.y;
}
function ZA(e) {
  return e === "x" || e === "y" ? wn[e] ? null : (wn[e] = !0, () => {
    wn[e] = !1;
  }) : wn.x || wn.y ? null : (wn.x = wn.y = !0, () => {
    wn.x = wn.y = !1;
  });
}
function Qb(e, i) {
  const r = Xb(e), l = new AbortController(), s = {
    passive: !0,
    ...i,
    signal: l.signal
  };
  return [r, s, () => l.abort()];
}
function IA(e) {
  return !(e.pointerType === "touch" || Fb());
}
function JA(e, i, r = {}) {
  const [l, s, u] = Qb(e, r);
  return l.forEach((f) => {
    let d = !1, m = !1, p;
    const g = () => {
      f.removeEventListener("pointerleave", A);
    }, y = (D) => {
      p && (p(D), p = void 0), g();
    }, b = (D) => {
      d = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), m && (m = !1, y(D));
    }, x = () => {
      d = !0, window.addEventListener("pointerup", b, s), window.addEventListener("pointercancel", b, s);
    }, A = (D) => {
      if (D.pointerType !== "touch") {
        if (d) {
          m = !0;
          return;
        }
        y(D);
      }
    }, z = (D) => {
      if (!IA(D))
        return;
      m = !1;
      const M = i(f, D);
      typeof M == "function" && (p = M, f.addEventListener("pointerleave", A, s));
    };
    f.addEventListener("pointerenter", z, s), f.addEventListener("pointerdown", x, s);
  }), u;
}
const Kb = (e, i) => i ? e === i ? !0 : Kb(e, i.parentElement) : !1, Yh = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, WA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function $A(e) {
  return WA.has(e.tagName) || e.isContentEditable === !0;
}
const t2 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function e2(e) {
  return t2.has(e.tagName) || e.isContentEditable === !0;
}
const ds = /* @__PURE__ */ new WeakSet();
function Py(e) {
  return (i) => {
    i.key === "Enter" && e(i);
  };
}
function gf(e, i) {
  e.dispatchEvent(new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 }));
}
const n2 = (e, i) => {
  const r = e.currentTarget;
  if (!r)
    return;
  const l = Py(() => {
    if (ds.has(r))
      return;
    gf(r, "down");
    const s = Py(() => {
      gf(r, "up");
    }), u = () => gf(r, "cancel");
    r.addEventListener("keyup", s, i), r.addEventListener("blur", u, i);
  });
  r.addEventListener("keydown", l, i), r.addEventListener("blur", () => r.removeEventListener("keydown", l), i);
};
function Fy(e) {
  return Yh(e) && !Fb();
}
const Qy = /* @__PURE__ */ new WeakSet();
function i2(e, i, r = {}) {
  const [l, s, u] = Qb(e, r), f = (d) => {
    const m = d.currentTarget;
    if (!Fy(d) || Qy.has(d))
      return;
    ds.add(m), r.stopPropagation && Qy.add(d);
    const p = i(m, d), g = (x, A) => {
      window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", b), ds.has(m) && ds.delete(m), Fy(x) && typeof p == "function" && p(x, { success: A });
    }, y = (x) => {
      g(x, m === window || m === document || r.useGlobalTarget || Kb(m, x.target));
    }, b = (x) => {
      g(x, !1);
    };
    window.addEventListener("pointerup", y, s), window.addEventListener("pointercancel", b, s);
  };
  return l.forEach((d) => {
    (r.useGlobalTarget ? window : d).addEventListener("pointerdown", f, s), hs(d) && (d.addEventListener("focus", (p) => n2(p, s)), !$A(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), u;
}
function Gh(e) {
  return J0(e) && "ownerSVGElement" in e;
}
const ps = /* @__PURE__ */ new WeakMap();
let Ri;
const Zb = (e, i, r) => (l, s) => s && s[0] ? s[0][e + "Size"] : Gh(l) && "getBBox" in l ? l.getBBox()[i] : l[r], a2 = /* @__PURE__ */ Zb("inline", "width", "offsetWidth"), r2 = /* @__PURE__ */ Zb("block", "height", "offsetHeight");
function l2({ target: e, borderBoxSize: i }) {
  var r;
  (r = ps.get(e)) == null || r.forEach((l) => {
    l(e, {
      get width() {
        return a2(e, i);
      },
      get height() {
        return r2(e, i);
      }
    });
  });
}
function o2(e) {
  e.forEach(l2);
}
function s2() {
  typeof ResizeObserver > "u" || (Ri = new ResizeObserver(o2));
}
function u2(e, i) {
  Ri || s2();
  const r = Xb(e);
  return r.forEach((l) => {
    let s = ps.get(l);
    s || (s = /* @__PURE__ */ new Set(), ps.set(l, s)), s.add(i), Ri == null || Ri.observe(l);
  }), () => {
    r.forEach((l) => {
      const s = ps.get(l);
      s == null || s.delete(i), s != null && s.size || Ri == null || Ri.unobserve(l);
    });
  };
}
const ms = /* @__PURE__ */ new Set();
let ar;
function c2() {
  ar = () => {
    const e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ms.forEach((i) => i(e));
  }, window.addEventListener("resize", ar);
}
function f2(e) {
  return ms.add(e), ar || c2(), () => {
    ms.delete(e), !ms.size && typeof ar == "function" && (window.removeEventListener("resize", ar), ar = void 0);
  };
}
function Ky(e, i) {
  return typeof e == "function" ? f2(e) : u2(e, i);
}
function h2(e) {
  return Gh(e) && e.tagName === "svg";
}
const d2 = [...qb, ce, Sn], p2 = (e) => d2.find(Hb(e)), Zy = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), rr = () => ({
  x: Zy(),
  y: Zy()
}), Iy = () => ({ min: 0, max: 0 }), pe = () => ({
  x: Iy(),
  y: Iy()
}), m2 = /* @__PURE__ */ new WeakMap();
function Ls(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Al(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Xh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ph = ["initial", ...Xh];
function Vs(e) {
  return Ls(e.animate) || Ph.some((i) => Al(e[i]));
}
function Ib(e) {
  return !!(Vs(e) || e.variants);
}
function g2(e, i, r) {
  for (const l in i) {
    const s = i[l], u = r[l];
    if (Te(s))
      e.addValue(l, s);
    else if (Te(u))
      e.addValue(l, ur(s, { owner: e }));
    else if (u !== s)
      if (e.hasValue(l)) {
        const f = e.getValue(l);
        f.liveStyle === !0 ? f.jump(s) : f.hasAnimated || f.set(s);
      } else {
        const f = e.getStaticValue(l);
        e.addValue(l, ur(f !== void 0 ? f : s, { owner: e }));
      }
  }
  for (const l in r)
    i[l] === void 0 && e.removeValue(l);
  return i;
}
const ih = { current: null }, Jb = { current: !1 }, y2 = typeof window < "u";
function v2() {
  if (Jb.current = !0, !!y2)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), i = () => ih.current = e.matches;
      e.addEventListener("change", i), i();
    } else
      ih.current = !1;
}
const Jy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ks = {};
function Wb(e) {
  ks = e;
}
function b2() {
  return ks;
}
class x2 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(i, r, l) {
    return {};
  }
  constructor({ parent: i, props: r, presenceContext: l, reducedMotionConfig: s, skipAnimations: u, blockInitialAnimation: f, visualState: d }, m = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Lh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const x = De.now();
      this.renderScheduledAt < x && (this.renderScheduledAt = x, Qt.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: g } = d;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = r.initial ? { ...p } : {}, this.renderState = g, this.parent = i, this.props = r, this.presenceContext = l, this.depth = i ? i.depth + 1 : 0, this.reducedMotionConfig = s, this.skipAnimationsConfig = u, this.options = m, this.blockInitialAnimation = !!f, this.isControllingVariants = Vs(r), this.isVariantNode = Ib(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(i && i.current);
    const { willChange: y, ...b } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const x in b) {
      const A = b[x];
      p[x] !== void 0 && Te(A) && A.set(p[x]);
    }
  }
  mount(i) {
    var r, l;
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        (r = this.values.get(s)) == null || r.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = i, m2.set(i, this), this.projection && !this.projection.instance && this.projection.mount(i), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, u) => this.bindToMotionValue(u, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Jb.current || v2(), this.shouldReduceMotion = ih.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (l = this.parent) == null || l.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var i;
    this.projection && this.projection.unmount(), Ni(this.notifyUpdate), Ni(this.render), this.valueSubscriptions.forEach((r) => r()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (i = this.parent) == null || i.removeChild(this);
    for (const r in this.events)
      this.events[r].clear();
    for (const r in this.features) {
      const l = this.features[r];
      l && (l.unmount(), l.isMounted = !1);
    }
    this.current = null;
  }
  addChild(i) {
    this.children.add(i), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(i);
  }
  removeChild(i) {
    this.children.delete(i), this.enteringChildren && this.enteringChildren.delete(i);
  }
  bindToMotionValue(i, r) {
    if (this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)(), r.accelerate && Ob.has(i) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: d, times: m, ease: p, duration: g } = r.accelerate, y = new Db({
        element: this.current,
        name: i,
        keyframes: d,
        times: m,
        ease: p,
        duration: /* @__PURE__ */ Ge(g)
      }), b = f(y);
      this.valueSubscriptions.set(i, () => {
        b(), y.cancel();
      });
      return;
    }
    const l = hr.has(i);
    l && this.onBindTransform && this.onBindTransform();
    const s = r.on("change", (f) => {
      this.latestValues[i] = f, this.props.onUpdate && Qt.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, i, r)), this.valueSubscriptions.set(i, () => {
      s(), u && u(), r.owner && r.stop();
    });
  }
  sortNodePosition(i) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== i.type ? 0 : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = "animation";
    for (i in ks) {
      const r = ks[i];
      if (!r)
        continue;
      const { isEnabled: l, Feature: s } = r;
      if (!this.features[i] && s && l(this.props) && (this.features[i] = new s(this)), this.features[i]) {
        const u = this.features[i];
        u.isMounted ? u.update() : (u.mount(), u.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : pe();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, r) {
    this.latestValues[i] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(i, r) {
    (i.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = i, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let l = 0; l < Jy.length; l++) {
      const s = Jy[l];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const u = "on" + s, f = i[u];
      f && (this.propEventSubscriptions[s] = this.on(s, f));
    }
    this.prevMotionValues = g2(this, this.scrapeMotionValuesFromProps(i, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(i) {
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(i), () => r.variantChildren.delete(i);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(i, r) {
    const l = this.values.get(i);
    r !== l && (l && this.removeValue(i), this.bindToMotionValue(i, r), this.values.set(i, r), this.latestValues[i] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(i) {
    this.values.delete(i);
    const r = this.valueSubscriptions.get(i);
    r && (r(), this.valueSubscriptions.delete(i)), delete this.latestValues[i], this.removeValueFromRenderState(i, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, r) {
    if (this.props.values && this.props.values[i])
      return this.props.values[i];
    let l = this.values.get(i);
    return l === void 0 && r !== void 0 && (l = ur(r === null ? void 0 : r, { owner: this }), this.addValue(i, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(i, r) {
    let l = this.latestValues[i] !== void 0 || !this.current ? this.latestValues[i] : this.getBaseTargetFromProps(this.props, i) ?? this.readValueFromInstance(this.current, i, this.options);
    return l != null && (typeof l == "string" && (I0(l) || W0(l)) ? l = parseFloat(l) : !p2(l) && Sn.test(r) && (l = Gb(i, r)), this.setBaseTarget(i, Te(l) ? l.get() : l)), Te(l) ? l.get() : l;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(i, r) {
    this.baseTarget[i] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(i) {
    var u;
    const { initial: r } = this.props;
    let l;
    if (typeof r == "string" || typeof r == "object") {
      const f = Uh(this.props, r, (u = this.presenceContext) == null ? void 0 : u.custom);
      f && (l = f[i]);
    }
    if (r && l !== void 0)
      return l;
    const s = this.getBaseTargetFromProps(this.props, i);
    return s !== void 0 && !Te(s) ? s : this.initialValues[i] !== void 0 && l === void 0 ? void 0 : this.baseTarget[i];
  }
  on(i, r) {
    return this.events[i] || (this.events[i] = new kh()), this.events[i].add(r);
  }
  notify(i, ...r) {
    this.events[i] && this.events[i].notify(...r);
  }
  scheduleRenderMicrotask() {
    qh.render(this.render);
  }
}
class $b extends x2 {
  constructor() {
    super(...arguments), this.KeyframeResolver = KA;
  }
  sortInstanceNodePosition(i, r) {
    return i.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, r) {
    const l = i.style;
    return l ? l[r] : void 0;
  }
  removeValueFromRenderState(i, { vars: r, style: l }) {
    delete r[i], delete l[i];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    Te(i) && (this.childSubscription = i.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class Vi {
  constructor(i) {
    this.isMounted = !1, this.node = i;
  }
  update() {
  }
}
function t1({ top: e, left: i, right: r, bottom: l }) {
  return {
    x: { min: i, max: r },
    y: { min: e, max: l }
  };
}
function w2({ x: e, y: i }) {
  return { top: i.min, right: e.max, bottom: i.max, left: e.min };
}
function S2(e, i) {
  if (!i)
    return e;
  const r = i({ x: e.left, y: e.top }), l = i({ x: e.right, y: e.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: l.y,
    right: l.x
  };
}
function yf(e) {
  return e === void 0 || e === 1;
}
function ah({ scale: e, scaleX: i, scaleY: r }) {
  return !yf(e) || !yf(i) || !yf(r);
}
function aa(e) {
  return ah(e) || e1(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function e1(e) {
  return Wy(e.x) || Wy(e.y);
}
function Wy(e) {
  return e && e !== "0%";
}
function Cs(e, i, r) {
  const l = e - r, s = i * l;
  return r + s;
}
function $y(e, i, r, l, s) {
  return s !== void 0 && (e = Cs(e, s, l)), Cs(e, r, l) + i;
}
function rh(e, i = 0, r = 1, l, s) {
  e.min = $y(e.min, i, r, l, s), e.max = $y(e.max, i, r, l, s);
}
function n1(e, { x: i, y: r }) {
  rh(e.x, i.translate, i.scale, i.originPoint), rh(e.y, r.translate, r.scale, r.originPoint);
}
const tv = 0.999999999999, ev = 1.0000000000001;
function T2(e, i, r, l = !1) {
  var d;
  const s = r.length;
  if (!s)
    return;
  i.x = i.y = 1;
  let u, f;
  for (let m = 0; m < s; m++) {
    u = r[m], f = u.projectionDelta;
    const { visualElement: p } = u.options;
    p && p.props.style && p.props.style.display === "contents" || (l && u.options.layoutScroll && u.scroll && u !== u.root && (Dn(e.x, -u.scroll.offset.x), Dn(e.y, -u.scroll.offset.y)), f && (i.x *= f.x.scale, i.y *= f.y.scale, n1(e, f)), l && aa(u.latestValues) && gs(e, u.latestValues, (d = u.layout) == null ? void 0 : d.layoutBox));
  }
  i.x < ev && i.x > tv && (i.x = 1), i.y < ev && i.y > tv && (i.y = 1);
}
function Dn(e, i) {
  e.min += i, e.max += i;
}
function nv(e, i, r, l, s = 0.5) {
  const u = Wt(e.min, e.max, s);
  rh(e, i, r, u, l);
}
function iv(e, i) {
  return typeof e == "string" ? parseFloat(e) / 100 * (i.max - i.min) : e;
}
function gs(e, i, r) {
  const l = r ?? e;
  nv(e.x, iv(i.x, l.x), i.scaleX, i.scale, i.originX), nv(e.y, iv(i.y, l.y), i.scaleY, i.scale, i.originY);
}
function i1(e, i) {
  return t1(S2(e.getBoundingClientRect(), i));
}
function E2(e, i, r) {
  const l = i1(e, r), { scroll: s } = i;
  return s && (Dn(l.x, s.offset.x), Dn(l.y, s.offset.y)), l;
}
const A2 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, k2 = fr.length;
function C2(e, i, r) {
  let l = "", s = !0;
  for (let u = 0; u < k2; u++) {
    const f = fr[u], d = e[f];
    if (d === void 0)
      continue;
    let m = !0;
    if (typeof d == "number")
      m = d === (f.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(d);
      m = f.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!m || r) {
      const p = Pb(d, Hh[f]);
      if (!m) {
        s = !1;
        const g = A2[f] || f;
        l += `${g}(${p}) `;
      }
      r && (i[f] = p);
    }
  }
  return l = l.trim(), r ? l = r(i, s ? "" : l) : s && (l = "none"), l;
}
function Fh(e, i, r) {
  const { style: l, vars: s, transformOrigin: u } = e;
  let f = !1, d = !1;
  for (const m in i) {
    const p = i[m];
    if (hr.has(m)) {
      f = !0;
      continue;
    } else if (db(m)) {
      s[m] = p;
      continue;
    } else {
      const g = Pb(p, Hh[m]);
      m.startsWith("origin") ? (d = !0, u[m] = g) : l[m] = g;
    }
  }
  if (i.transform || (f || r ? l.transform = C2(i, e.transform, r) : l.transform && (l.transform = "none")), d) {
    const { originX: m = "50%", originY: p = "50%", originZ: g = 0 } = u;
    l.transformOrigin = `${m} ${p} ${g}`;
  }
}
function a1(e, { style: i, vars: r }, l, s) {
  const u = e.style;
  let f;
  for (f in i)
    u[f] = i[f];
  s == null || s.applyProjectionStyles(u, l);
  for (f in r)
    u.setProperty(f, r[f]);
}
function av(e, i) {
  return i.max === i.min ? 0 : e / (i.max - i.min) * 100;
}
const cl = {
  correct: (e, i) => {
    if (!i.target)
      return e;
    if (typeof e == "string")
      if (ft.test(e))
        e = parseFloat(e);
      else
        return e;
    const r = av(e, i.target.x), l = av(e, i.target.y);
    return `${r}% ${l}%`;
  }
}, M2 = {
  correct: (e, { treeScale: i, projectionDelta: r }) => {
    const l = e, s = Sn.parse(e);
    if (s.length > 5)
      return l;
    const u = Sn.createTransformer(e), f = typeof s[0] != "number" ? 1 : 0, d = r.x.scale * i.x, m = r.y.scale * i.y;
    s[0 + f] /= d, s[1 + f] /= m;
    const p = Wt(d, m, 0.5);
    return typeof s[2 + f] == "number" && (s[2 + f] /= p), typeof s[3 + f] == "number" && (s[3 + f] /= p), u(s);
  }
}, lh = {
  borderRadius: {
    ...cl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: cl,
  borderTopRightRadius: cl,
  borderBottomLeftRadius: cl,
  borderBottomRightRadius: cl,
  boxShadow: M2
};
function r1(e, { layout: i, layoutId: r }) {
  return hr.has(e) || e.startsWith("origin") || (i || r !== void 0) && (!!lh[e] || e === "opacity");
}
function Qh(e, i, r) {
  var f;
  const l = e.style, s = i == null ? void 0 : i.style, u = {};
  if (!l)
    return u;
  for (const d in l)
    (Te(l[d]) || s && Te(s[d]) || r1(d, e) || ((f = r == null ? void 0 : r.getValue(d)) == null ? void 0 : f.liveStyle) !== void 0) && (u[d] = l[d]);
  return u;
}
function z2(e) {
  return window.getComputedStyle(e);
}
class D2 extends $b {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = a1;
  }
  readValueFromInstance(i, r) {
    var l;
    if (hr.has(r))
      return (l = this.projection) != null && l.isProjecting ? Ff(r) : ZE(i, r);
    {
      const s = z2(i), u = (db(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof u == "string" ? u.trim() : u;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: r }) {
    return i1(i, r);
  }
  build(i, r, l) {
    Fh(i, r, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, r, l) {
    return Qh(i, r, l);
  }
}
const R2 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, O2 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function _2(e, i, r = 1, l = 0, s = !0) {
  e.pathLength = 1;
  const u = s ? R2 : O2;
  e[u.offset] = `${-l}`, e[u.array] = `${i} ${r}`;
}
const N2 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function l1(e, {
  attrX: i,
  attrY: r,
  attrScale: l,
  pathLength: s,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, m, p, g) {
  if (Fh(e, d, p), m) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: y, style: b } = e;
  y.transform && (b.transform = y.transform, delete y.transform), (b.transform || y.transformOrigin) && (b.transformOrigin = y.transformOrigin ?? "50% 50%", delete y.transformOrigin), b.transform && (b.transformBox = (g == null ? void 0 : g.transformBox) ?? "fill-box", delete y.transformBox);
  for (const x of N2)
    y[x] !== void 0 && (b[x] = y[x], delete y[x]);
  i !== void 0 && (y.x = i), r !== void 0 && (y.y = r), l !== void 0 && (y.scale = l), s !== void 0 && _2(y, s, u, f, !1);
}
const o1 = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), s1 = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function L2(e, i, r, l) {
  a1(e, i, void 0, l);
  for (const s in i.attrs)
    e.setAttribute(o1.has(s) ? s : jh(s), i.attrs[s]);
}
function u1(e, i, r) {
  const l = Qh(e, i, r);
  for (const s in e)
    if (Te(e[s]) || Te(i[s])) {
      const u = fr.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      l[u] = e[s];
    }
  return l;
}
class V2 extends $b {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = pe;
  }
  getBaseTargetFromProps(i, r) {
    return i[r];
  }
  readValueFromInstance(i, r) {
    if (hr.has(r)) {
      const l = Yb(r);
      return l && l.default || 0;
    }
    return r = o1.has(r) ? r : jh(r), i.getAttribute(r);
  }
  scrapeMotionValuesFromProps(i, r, l) {
    return u1(i, r, l);
  }
  build(i, r, l) {
    l1(i, r, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(i, r, l, s) {
    L2(i, r, l, s);
  }
  mount(i) {
    this.isSVGTag = s1(i.tagName), super.mount(i);
  }
}
const B2 = Ph.length;
function c1(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const r = e.parent ? c1(e.parent) || {} : {};
    return e.props.initial !== void 0 && (r.initial = e.props.initial), r;
  }
  const i = {};
  for (let r = 0; r < B2; r++) {
    const l = Ph[r], s = e.props[l];
    (Al(s) || s === !1) && (i[l] = s);
  }
  return i;
}
function f1(e, i) {
  if (!Array.isArray(i))
    return !1;
  const r = i.length;
  if (r !== e.length)
    return !1;
  for (let l = 0; l < r; l++)
    if (i[l] !== e[l])
      return !1;
  return !0;
}
const U2 = [...Xh].reverse(), j2 = Xh.length;
function H2(e) {
  return (i) => Promise.all(i.map(({ animation: r, options: l }) => BA(e, r, l)));
}
function q2(e) {
  let i = H2(e), r = rv(), l = !0, s = !1;
  const u = (p) => (g, y) => {
    var x;
    const b = sa(e, y, p === "exit" ? (x = e.presenceContext) == null ? void 0 : x.custom : void 0);
    if (b) {
      const { transition: A, transitionEnd: z, ...D } = b;
      g = { ...g, ...D, ...z };
    }
    return g;
  };
  function f(p) {
    i = p(e);
  }
  function d(p) {
    const { props: g } = e, y = c1(e.parent) || {}, b = [], x = /* @__PURE__ */ new Set();
    let A = {}, z = 1 / 0;
    for (let M = 0; M < j2; M++) {
      const H = U2[M], _ = r[H], F = g[H] !== void 0 ? g[H] : y[H], K = Al(F), B = H === p ? _.isActive : null;
      B === !1 && (z = M);
      let I = F === y[H] && F !== g[H] && K;
      if (I && (l || s) && e.manuallyAnimateOnMount && (I = !1), _.protectedKeys = { ...A }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && B === null || // If we didn't and don't have any defined prop for this animation type
      !F && !_.prevProp || // Or if the prop doesn't define an animation
      Ls(F) || typeof F == "boolean")
        continue;
      if (H === "exit" && _.isActive && B !== !0) {
        _.prevResolvedValues && (A = {
          ...A,
          ..._.prevResolvedValues
        });
        continue;
      }
      const j = Y2(_.prevProp, F);
      let J = j || // If we're making this variant active, we want to always make it active
      H === p && _.isActive && !I && K || // If we removed a higher-priority variant (i is in reverse order)
      M > z && K, et = !1;
      const W = Array.isArray(F) ? F : [F];
      let $ = W.reduce(u(H), {});
      B === !1 && ($ = {});
      const { prevResolvedValues: vt = {} } = _, lt = {
        ...vt,
        ...$
      }, Z = (nt) => {
        J = !0, x.has(nt) && (et = !0, x.delete(nt)), _.needsAnimating[nt] = !0;
        const pt = e.getValue(nt);
        pt && (pt.liveStyle = !1);
      };
      for (const nt in lt) {
        const pt = $[nt], S = vt[nt];
        if (A.hasOwnProperty(nt))
          continue;
        let k = !1;
        Wf(pt) && Wf(S) ? k = !f1(pt, S) : k = pt !== S, k ? pt != null ? Z(nt) : x.add(nt) : pt !== void 0 && x.has(nt) ? Z(nt) : _.protectedKeys[nt] = !0;
      }
      _.prevProp = F, _.prevResolvedValues = $, _.isActive && (A = { ...A, ...$ }), (l || s) && e.blockInitialAnimation && (J = !1);
      const O = I && j;
      J && (!O || et) && b.push(...W.map((nt) => {
        const pt = { type: H };
        if (typeof nt == "string" && (l || s) && !O && e.manuallyAnimateOnMount && e.parent) {
          const { parent: S } = e, k = sa(S, nt);
          if (S.enteringChildren && k) {
            const { delayChildren: q } = k.transition || {};
            pt.delay = _b(S.enteringChildren, e, q);
          }
        }
        return {
          animation: nt,
          options: pt
        };
      }));
    }
    if (x.size) {
      const M = {};
      if (typeof g.initial != "boolean") {
        const H = sa(e, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        H && H.transition && (M.transition = H.transition);
      }
      x.forEach((H) => {
        const _ = e.getBaseTarget(H), F = e.getValue(H);
        F && (F.liveStyle = !0), M[H] = _ ?? null;
      }), b.push({ animation: M });
    }
    let D = !!b.length;
    return l && (g.initial === !1 || g.initial === g.animate) && !e.manuallyAnimateOnMount && (D = !1), l = !1, s = !1, D ? i(b) : Promise.resolve();
  }
  function m(p, g) {
    var b;
    if (r[p].isActive === g)
      return Promise.resolve();
    (b = e.variantChildren) == null || b.forEach((x) => {
      var A;
      return (A = x.animationState) == null ? void 0 : A.setActive(p, g);
    }), r[p].isActive = g;
    const y = d(p);
    for (const x in r)
      r[x].protectedKeys = {};
    return y;
  }
  return {
    animateChanges: d,
    setActive: m,
    setAnimateFunction: f,
    getState: () => r,
    reset: () => {
      r = rv(), s = !0;
    }
  };
}
function Y2(e, i) {
  return typeof i == "string" ? i !== e : Array.isArray(i) ? !f1(i, e) : !1;
}
function ia(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function rv() {
  return {
    animate: ia(!0),
    whileInView: ia(),
    whileHover: ia(),
    whileTap: ia(),
    whileDrag: ia(),
    whileFocus: ia(),
    exit: ia()
  };
}
function oh(e, i) {
  e.min = i.min, e.max = i.max;
}
function xn(e, i) {
  oh(e.x, i.x), oh(e.y, i.y);
}
function lv(e, i) {
  e.translate = i.translate, e.scale = i.scale, e.originPoint = i.originPoint, e.origin = i.origin;
}
const h1 = 1e-4, G2 = 1 - h1, X2 = 1 + h1, d1 = 0.01, P2 = 0 - d1, F2 = 0 + d1;
function Re(e) {
  return e.max - e.min;
}
function Q2(e, i, r) {
  return Math.abs(e - i) <= r;
}
function ov(e, i, r, l = 0.5) {
  e.origin = l, e.originPoint = Wt(i.min, i.max, e.origin), e.scale = Re(r) / Re(i), e.translate = Wt(r.min, r.max, e.origin) - e.originPoint, (e.scale >= G2 && e.scale <= X2 || isNaN(e.scale)) && (e.scale = 1), (e.translate >= P2 && e.translate <= F2 || isNaN(e.translate)) && (e.translate = 0);
}
function vl(e, i, r, l) {
  ov(e.x, i.x, r.x, l ? l.originX : void 0), ov(e.y, i.y, r.y, l ? l.originY : void 0);
}
function sv(e, i, r, l = 0) {
  const s = l ? Wt(r.min, r.max, l) : r.min;
  e.min = s + i.min, e.max = e.min + Re(i);
}
function K2(e, i, r, l) {
  sv(e.x, i.x, r.x, l == null ? void 0 : l.x), sv(e.y, i.y, r.y, l == null ? void 0 : l.y);
}
function uv(e, i, r, l = 0) {
  const s = l ? Wt(r.min, r.max, l) : r.min;
  e.min = i.min - s, e.max = e.min + Re(i);
}
function Ms(e, i, r, l) {
  uv(e.x, i.x, r.x, l == null ? void 0 : l.x), uv(e.y, i.y, r.y, l == null ? void 0 : l.y);
}
function cv(e, i, r, l, s) {
  return e -= i, e = Cs(e, 1 / r, l), s !== void 0 && (e = Cs(e, 1 / s, l)), e;
}
function Z2(e, i = 0, r = 1, l = 0.5, s, u = e, f = e) {
  if (On.test(i) && (i = parseFloat(i), i = Wt(f.min, f.max, i / 100) - f.min), typeof i != "number")
    return;
  let d = Wt(u.min, u.max, l);
  e === u && (d -= i), e.min = cv(e.min, i, r, d, s), e.max = cv(e.max, i, r, d, s);
}
function fv(e, i, [r, l, s], u, f) {
  Z2(e, i[r], i[l], i[s], i.scale, u, f);
}
const I2 = ["x", "scaleX", "originX"], J2 = ["y", "scaleY", "originY"];
function hv(e, i, r, l) {
  fv(e.x, i, I2, r ? r.x : void 0, l ? l.x : void 0), fv(e.y, i, J2, r ? r.y : void 0, l ? l.y : void 0);
}
function dv(e) {
  return e.translate === 0 && e.scale === 1;
}
function p1(e) {
  return dv(e.x) && dv(e.y);
}
function pv(e, i) {
  return e.min === i.min && e.max === i.max;
}
function W2(e, i) {
  return pv(e.x, i.x) && pv(e.y, i.y);
}
function mv(e, i) {
  return Math.round(e.min) === Math.round(i.min) && Math.round(e.max) === Math.round(i.max);
}
function m1(e, i) {
  return mv(e.x, i.x) && mv(e.y, i.y);
}
function gv(e) {
  return Re(e.x) / Re(e.y);
}
function yv(e, i) {
  return e.translate === i.translate && e.scale === i.scale && e.originPoint === i.originPoint;
}
function Mn(e) {
  return [e("x"), e("y")];
}
function $2(e, i, r) {
  let l = "";
  const s = e.x.translate / i.x, u = e.y.translate / i.y, f = (r == null ? void 0 : r.z) || 0;
  if ((s || u || f) && (l = `translate3d(${s}px, ${u}px, ${f}px) `), (i.x !== 1 || i.y !== 1) && (l += `scale(${1 / i.x}, ${1 / i.y}) `), r) {
    const { transformPerspective: p, rotate: g, rotateX: y, rotateY: b, skewX: x, skewY: A } = r;
    p && (l = `perspective(${p}px) ${l}`), g && (l += `rotate(${g}deg) `), y && (l += `rotateX(${y}deg) `), b && (l += `rotateY(${b}deg) `), x && (l += `skewX(${x}deg) `), A && (l += `skewY(${A}deg) `);
  }
  const d = e.x.scale * i.x, m = e.y.scale * i.y;
  return (d !== 1 || m !== 1) && (l += `scale(${d}, ${m})`), l || "none";
}
const g1 = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], tk = g1.length, vv = (e) => typeof e == "string" ? parseFloat(e) : e, bv = (e) => typeof e == "number" || ft.test(e);
function ek(e, i, r, l, s, u) {
  s ? (e.opacity = Wt(0, r.opacity ?? 1, nk(l)), e.opacityExit = Wt(i.opacity ?? 1, 0, ik(l))) : u && (e.opacity = Wt(i.opacity ?? 1, r.opacity ?? 1, l));
  for (let f = 0; f < tk; f++) {
    const d = g1[f];
    let m = xv(i, d), p = xv(r, d);
    if (m === void 0 && p === void 0)
      continue;
    m || (m = 0), p || (p = 0), m === 0 || p === 0 || bv(m) === bv(p) ? (e[d] = Math.max(Wt(vv(m), vv(p), l), 0), (On.test(p) || On.test(m)) && (e[d] += "%")) : e[d] = p;
  }
  (i.rotate || r.rotate) && (e.rotate = Wt(i.rotate || 0, r.rotate || 0, l));
}
function xv(e, i) {
  return e[i] !== void 0 ? e[i] : e.borderRadius;
}
const nk = /* @__PURE__ */ y1(0, 0.5, ob), ik = /* @__PURE__ */ y1(0.5, 0.95, mn);
function y1(e, i, r) {
  return (l) => l < e ? 0 : l > i ? 1 : r(/* @__PURE__ */ Tl(e, i, l));
}
function ak(e, i, r) {
  const l = Te(e) ? e : ur(e);
  return l.start(Bh("", l, i, r)), l.animation;
}
function kl(e, i, r, l = { passive: !0 }) {
  return e.addEventListener(i, r, l), () => e.removeEventListener(i, r);
}
const rk = (e, i) => e.depth - i.depth;
class lk {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(i) {
    Ah(this.children, i), this.isDirty = !0;
  }
  remove(i) {
    ws(this.children, i), this.isDirty = !0;
  }
  forEach(i) {
    this.isDirty && this.children.sort(rk), this.isDirty = !1, this.children.forEach(i);
  }
}
function ok(e, i) {
  const r = De.now(), l = ({ timestamp: s }) => {
    const u = s - r;
    u >= i && (Ni(l), e(u - i));
  };
  return Qt.setup(l, !0), () => Ni(l);
}
function ys(e) {
  return Te(e) ? e.get() : e;
}
class sk {
  constructor() {
    this.members = [];
  }
  add(i) {
    Ah(this.members, i);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const l = this.members[r];
      if (l === i || l === this.lead || l === this.prevLead)
        continue;
      const s = l.instance;
      (!s || s.isConnected === !1) && !l.snapshot && (ws(this.members, l), l.unmount());
    }
    i.scheduleRender();
  }
  remove(i) {
    if (ws(this.members, i), i === this.prevLead && (this.prevLead = void 0), i === this.lead) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(i) {
    var r;
    for (let l = this.members.indexOf(i) - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s.isPresent !== !1 && ((r = s.instance) == null ? void 0 : r.isConnected) !== !1)
        return this.promote(s), !0;
    }
    return !1;
  }
  promote(i, r) {
    var s;
    const l = this.lead;
    if (i !== l && (this.prevLead = l, this.lead = i, i.show(), l)) {
      l.updateSnapshot(), i.scheduleRender();
      const { layoutDependency: u } = l.options, { layoutDependency: f } = i.options;
      (u === void 0 || u !== f) && (i.resumeFrom = l, r && (l.preserveOpacity = !0), l.snapshot && (i.snapshot = l.snapshot, i.snapshot.latestValues = l.animationValues || l.latestValues), (s = i.root) != null && s.isUpdating && (i.isLayoutDirty = !0)), i.options.crossfade === !1 && l.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      var r, l, s, u, f;
      (l = (r = i.options).onExitComplete) == null || l.call(r), (f = (s = i.resumingFrom) == null ? void 0 : (u = s.options).onExitComplete) == null || f.call(u);
    });
  }
  scheduleRender() {
    this.members.forEach((i) => i.instance && i.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var i;
    (i = this.lead) != null && i.snapshot && (this.lead.snapshot = void 0);
  }
}
const vs = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, vf = ["", "X", "Y", "Z"], uk = 1e3;
let ck = 0;
function bf(e, i, r, l) {
  const { latestValues: s } = i;
  s[e] && (r[e] = s[e], i.setStaticValue(e, 0), l && (l[e] = 0));
}
function v1(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: i } = e.options;
  if (!i)
    return;
  const r = Ub(i);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: s, layoutId: u } = e.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Qt, !(s || u));
  }
  const { parent: l } = e;
  l && !l.hasCheckedOptimisedAppear && v1(l);
}
function b1({ attachResizeListener: e, defaultParent: i, measureScroll: r, checkIsScrollRoot: l, resetTransform: s }) {
  return class {
    constructor(f = {}, d = i == null ? void 0 : i()) {
      this.id = ck++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(dk), this.nodes.forEach(bk), this.nodes.forEach(xk), this.nodes.forEach(pk);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new lk());
    }
    addEventListener(f, d) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new kh()), this.eventHandlers.get(f).add(d);
    }
    notifyListeners(f, ...d) {
      const m = this.eventHandlers.get(f);
      m && m.notify(...d);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = Gh(f) && !h2(f), this.instance = f;
      const { layoutId: d, layout: m, visualElement: p } = this.options;
      if (p && !p.current && p.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (m || d) && (this.isLayoutDirty = !0), e) {
        let g, y = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Qt.read(() => {
          y = window.innerWidth;
        }), e(f, () => {
          const x = window.innerWidth;
          x !== y && (y = x, this.root.updateBlockedByResize = !0, g && g(), g = ok(b, 250), vs.hasAnimatedSinceResize && (vs.hasAnimatedSinceResize = !1, this.nodes.forEach(Tv)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && p && (d || m) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: y, hasRelativeLayoutChanged: b, layout: x }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const A = this.options.transition || p.getDefaultTransition() || Ak, { onLayoutAnimationStart: z, onLayoutAnimationComplete: D } = p.getProps(), M = !this.targetLayout || !m1(this.targetLayout, x), H = !y && b;
        if (this.options.layoutRoot || this.resumeFrom || H || y && (M || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const _ = {
            ...Vh(A, "layout"),
            onPlay: z,
            onComplete: D
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (_.delay = 0, _.type = !1), this.startAnimation(_), this.setAnimationOrigin(g, H);
        } else
          y || Tv(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = x;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Ni(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(wk), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && v1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g];
        y.shouldResetTransform = !0, (typeof y.latestValues.x == "string" || typeof y.latestValues.y == "string") && (y.isLayoutDirty = !0), y.updateScroll("snapshot"), y.options.layoutRoot && y.willUpdate(!1);
      }
      const { layoutId: d, layout: m } = this.options;
      if (d === void 0 && !m)
        return;
      const p = this.getTransformTemplate();
      this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const m = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), m && this.nodes.forEach(gk), this.nodes.forEach(wv);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Sv);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(yk), this.nodes.forEach(vk), this.nodes.forEach(fk), this.nodes.forEach(hk)) : this.nodes.forEach(Sv), this.clearAllSnapshots();
      const d = De.now();
      Se.delta = _n(0, 1e3 / 60, d - Se.timestamp), Se.timestamp = d, Se.isProcessing = !0, cf.update.process(Se), cf.preRender.process(Se), cf.render.process(Se), Se.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, qh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(mk), this.sharedNodes.forEach(Sk);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Qt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Qt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Re(this.snapshot.measuredBox.x) && !Re(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++)
          this.path[m].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = pe()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: d } = this.options;
      d && d.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let d = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (d = !1), d && this.instance) {
        const m = l(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: m,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !p1(this.projectionDelta), m = this.getTransformTemplate(), p = m ? m(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      f && this.instance && (d || aa(this.latestValues) || g) && (s(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const d = this.measurePageBox();
      let m = this.removeElementScroll(d);
      return f && (m = this.removeTransform(m)), kk(m), {
        animationId: this.root.animationId,
        measuredBox: d,
        layoutBox: m,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var p;
      const { visualElement: f } = this.options;
      if (!f)
        return pe();
      const d = f.measureViewportBox();
      if (!(((p = this.scroll) == null ? void 0 : p.wasRoot) || this.path.some(Ck))) {
        const { scroll: g } = this.root;
        g && (Dn(d.x, g.offset.x), Dn(d.y, g.offset.y));
      }
      return d;
    }
    removeElementScroll(f) {
      var m;
      const d = pe();
      if (xn(d, f), (m = this.scroll) != null && m.wasRoot)
        return d;
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p], { scroll: y, options: b } = g;
        g !== this.root && y && b.layoutScroll && (y.wasRoot && xn(d, f), Dn(d.x, y.offset.x), Dn(d.y, y.offset.y));
      }
      return d;
    }
    applyTransform(f, d = !1, m) {
      var g, y;
      const p = m || pe();
      xn(p, f);
      for (let b = 0; b < this.path.length; b++) {
        const x = this.path[b];
        !d && x.options.layoutScroll && x.scroll && x !== x.root && (Dn(p.x, -x.scroll.offset.x), Dn(p.y, -x.scroll.offset.y)), aa(x.latestValues) && gs(p, x.latestValues, (g = x.layout) == null ? void 0 : g.layoutBox);
      }
      return aa(this.latestValues) && gs(p, this.latestValues, (y = this.layout) == null ? void 0 : y.layoutBox), p;
    }
    removeTransform(f) {
      var m;
      const d = pe();
      xn(d, f);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        if (!aa(g.latestValues))
          continue;
        let y;
        g.instance && (ah(g.latestValues) && g.updateSnapshot(), y = pe(), xn(y, g.measurePageBox())), hv(d, g.latestValues, (m = g.snapshot) == null ? void 0 : m.layoutBox, y);
      }
      return aa(this.latestValues) && hv(d, this.latestValues), d;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Se.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      var x;
      const d = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = d.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = d.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = d.isSharedProjectionDirty);
      const m = !!this.resumingFrom || this !== d;
      if (!(f || m && this.isSharedProjectionDirty || this.isProjectionDirty || (x = this.parent) != null && x.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: y } = this.options;
      if (!this.layout || !(g || y))
        return;
      this.resolvedRelativeTargetAt = Se.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = pe(), this.targetWithTransforms = pe()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), K2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : xn(this.target, this.layout.layoutBox), n1(this.target, this.targetDelta)) : xn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || ah(this.parent.latestValues) || e1(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, d, m) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = pe(), this.relativeTargetOrigin = pe(), Ms(this.relativeTargetOrigin, d, m, this.options.layoutAnchor || void 0), xn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var A;
      const f = this.getLead(), d = !!this.resumingFrom || this !== f;
      let m = !0;
      if ((this.isProjectionDirty || (A = this.parent) != null && A.isProjectionDirty) && (m = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (m = !1), this.resolvedRelativeTargetAt === Se.timestamp && (m = !1), m)
        return;
      const { layout: p, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || g))
        return;
      xn(this.layoutCorrected, this.layout.layoutBox);
      const y = this.treeScale.x, b = this.treeScale.y;
      T2(this.layoutCorrected, this.treeScale, this.path, d), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = pe());
      const { target: x } = f;
      if (!x) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (lv(this.prevProjectionDelta.x, this.projectionDelta.x), lv(this.prevProjectionDelta.y, this.projectionDelta.y)), vl(this.projectionDelta, this.layoutCorrected, x, this.latestValues), (this.treeScale.x !== y || this.treeScale.y !== b || !yv(this.projectionDelta.x, this.prevProjectionDelta.x) || !yv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", x));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      var d;
      if ((d = this.options.visualElement) == null || d.scheduleRender(), f) {
        const m = this.getStack();
        m && m.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = rr(), this.projectionDelta = rr(), this.projectionDeltaWithTransform = rr();
    }
    setAnimationOrigin(f, d = !1) {
      const m = this.snapshot, p = m ? m.latestValues : {}, g = { ...this.latestValues }, y = rr();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const b = pe(), x = m ? m.source : void 0, A = this.layout ? this.layout.source : void 0, z = x !== A, D = this.getStack(), M = !D || D.members.length <= 1, H = !!(z && !M && this.options.crossfade === !0 && !this.path.some(Ek));
      this.animationProgress = 0;
      let _;
      this.mixTargetDelta = (F) => {
        const K = F / 1e3;
        Ev(y.x, f.x, K), Ev(y.y, f.y, K), this.setTargetDelta(y), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ms(b, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Tk(this.relativeTarget, this.relativeTargetOrigin, b, K), _ && W2(this.relativeTarget, _) && (this.isProjectionDirty = !1), _ || (_ = pe()), xn(_, this.relativeTarget)), z && (this.animationValues = g, ek(g, p, this.latestValues, K, H, M)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = K;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      var d, m, p;
      this.notifyListeners("animationStart"), (d = this.currentAnimation) == null || d.stop(), (p = (m = this.resumingFrom) == null ? void 0 : m.currentAnimation) == null || p.stop(), this.pendingAnimation && (Ni(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Qt.update(() => {
        vs.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = ur(0)), this.motionValue.jump(0, !1), this.currentAnimation = ak(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (g) => {
            this.mixTargetDelta(g), f.onUpdate && f.onUpdate(g);
          },
          onStop: () => {
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(uk), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: d, target: m, layout: p, latestValues: g } = f;
      if (!(!d || !m || !p)) {
        if (this !== f && this.layout && p && x1(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          m = this.target || pe();
          const y = Re(this.layout.layoutBox.x);
          m.x.min = f.target.x.min, m.x.max = m.x.min + y;
          const b = Re(this.layout.layoutBox.y);
          m.y.min = f.target.y.min, m.y.max = m.y.min + b;
        }
        xn(d, m), gs(d, g), vl(this.projectionDeltaWithTransform, this.layoutCorrected, d, g);
      }
    }
    registerSharedNode(f, d) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new sk()), this.sharedNodes.get(f).add(d);
      const p = d.options.initialPromotionConfig;
      d.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(d) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      var d;
      const { layoutId: f } = this.options;
      return f ? ((d = this.getStack()) == null ? void 0 : d.lead) || this : this;
    }
    getPrevLead() {
      var d;
      const { layoutId: f } = this.options;
      return f ? (d = this.getStack()) == null ? void 0 : d.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: d, preserveFollowOpacity: m } = {}) {
      const p = this.getStack();
      p && p.promote(this, m), f && (this.projectionDelta = void 0, this.needsReset = !0), d && this.setOptions({ transition: d });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let d = !1;
      const { latestValues: m } = f;
      if ((m.z || m.rotate || m.rotateX || m.rotateY || m.rotateZ || m.skewX || m.skewY) && (d = !0), !d)
        return;
      const p = {};
      m.z && bf("z", f, p, this.animationValues);
      for (let g = 0; g < vf.length; g++)
        bf(`rotate${vf[g]}`, f, p, this.animationValues), bf(`skew${vf[g]}`, f, p, this.animationValues);
      f.render();
      for (const g in p)
        f.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, d) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = ys(d == null ? void 0 : d.pointerEvents) || "", f.transform = m ? m(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = ys(d == null ? void 0 : d.pointerEvents) || ""), this.hasProjected && !aa(this.latestValues) && (f.transform = m ? m({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let y = $2(this.projectionDeltaWithTransform, this.treeScale, g);
      m && (y = m(g, y)), f.transform = y;
      const { x: b, y: x } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${x.origin * 100}% 0`, p.animationValues ? f.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const A in lh) {
        if (g[A] === void 0)
          continue;
        const { correct: z, applyTo: D, isCSSVariable: M } = lh[A], H = y === "none" ? g[A] : z(g[A], p);
        if (D) {
          const _ = D.length;
          for (let F = 0; F < _; F++)
            f[D[F]] = H;
        } else
          M ? this.options.visualElement.renderState.vars[A] = H : f[A] = H;
      }
      this.options.layoutId && (f.pointerEvents = p === this ? ys(d == null ? void 0 : d.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => {
        var d;
        return (d = f.currentAnimation) == null ? void 0 : d.stop();
      }), this.root.nodes.forEach(wv), this.root.sharedNodes.clear();
    }
  };
}
function fk(e) {
  e.updateLayout();
}
function hk(e) {
  var r;
  const i = ((r = e.resumeFrom) == null ? void 0 : r.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && i && e.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = e.layout, { animationType: u } = e.options, f = i.source !== e.layout.source;
    if (u === "size")
      Mn((y) => {
        const b = f ? i.measuredBox[y] : i.layoutBox[y], x = Re(b);
        b.min = l[y].min, b.max = b.min + x;
      });
    else if (u === "x" || u === "y") {
      const y = u === "x" ? "y" : "x";
      oh(f ? i.measuredBox[y] : i.layoutBox[y], l[y]);
    } else x1(u, i.layoutBox, l) && Mn((y) => {
      const b = f ? i.measuredBox[y] : i.layoutBox[y], x = Re(l[y]);
      b.max = b.min + x, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[y].max = e.relativeTarget[y].min + x);
    });
    const d = rr();
    vl(d, l, i.layoutBox);
    const m = rr();
    f ? vl(m, e.applyTransform(s, !0), i.measuredBox) : vl(m, l, i.layoutBox);
    const p = !p1(d);
    let g = !1;
    if (!e.resumeFrom) {
      const y = e.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: x } = y;
        if (b && x) {
          const A = e.options.layoutAnchor || void 0, z = pe();
          Ms(z, i.layoutBox, b.layoutBox, A);
          const D = pe();
          Ms(D, l, x.layoutBox, A), m1(z, D) || (g = !0), y.options.layoutRoot && (e.relativeTarget = D, e.relativeTargetOrigin = z, e.relativeParent = y);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: l,
      snapshot: i,
      delta: m,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: g
    });
  } else if (e.isLead()) {
    const { onExitComplete: l } = e.options;
    l && l();
  }
  e.options.transition = void 0;
}
function dk(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function pk(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function mk(e) {
  e.clearSnapshot();
}
function wv(e) {
  e.clearMeasurements();
}
function gk(e) {
  e.isLayoutDirty = !0, e.updateLayout();
}
function Sv(e) {
  e.isLayoutDirty = !1;
}
function yk(e) {
  e.isAnimationBlocked && e.layout && !e.isLayoutDirty && (e.snapshot = e.layout, e.isLayoutDirty = !0);
}
function vk(e) {
  const { visualElement: i } = e.options;
  i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Tv(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function bk(e) {
  e.resolveTargetDelta();
}
function xk(e) {
  e.calcProjection();
}
function wk(e) {
  e.resetSkewAndRotation();
}
function Sk(e) {
  e.removeLeadSnapshot();
}
function Ev(e, i, r) {
  e.translate = Wt(i.translate, 0, r), e.scale = Wt(i.scale, 1, r), e.origin = i.origin, e.originPoint = i.originPoint;
}
function Av(e, i, r, l) {
  e.min = Wt(i.min, r.min, l), e.max = Wt(i.max, r.max, l);
}
function Tk(e, i, r, l) {
  Av(e.x, i.x, r.x, l), Av(e.y, i.y, r.y, l);
}
function Ek(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Ak = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, kv = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Cv = kv("applewebkit/") && !kv("chrome/") ? Math.round : mn;
function Mv(e) {
  e.min = Cv(e.min), e.max = Cv(e.max);
}
function kk(e) {
  Mv(e.x), Mv(e.y);
}
function x1(e, i, r) {
  return e === "position" || e === "preserve-aspect" && !Q2(gv(i), gv(r), 0.2);
}
function Ck(e) {
  var i;
  return e !== e.root && ((i = e.scroll) == null ? void 0 : i.wasRoot);
}
const Mk = b1({
  attachResizeListener: (e, i) => kl(e, "resize", i),
  measureScroll: () => {
    var e, i;
    return {
      x: document.documentElement.scrollLeft || ((e = document.body) == null ? void 0 : e.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((i = document.body) == null ? void 0 : i.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), xf = {
  current: void 0
}, w1 = b1({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!xf.current) {
      const e = new Mk({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), xf.current = e;
    }
    return xf.current;
  },
  resetTransform: (e, i) => {
    e.style.transform = i !== void 0 ? i : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), Kh = rt.createContext({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function zv(e, i) {
  if (typeof e == "function")
    return e(i);
  e != null && (e.current = i);
}
function zk(...e) {
  return (i) => {
    let r = !1;
    const l = e.map((s) => {
      const u = zv(s, i);
      return !r && typeof u == "function" && (r = !0), u;
    });
    if (r)
      return () => {
        for (let s = 0; s < l.length; s++) {
          const u = l[s];
          typeof u == "function" ? u() : zv(e[s], null);
        }
      };
  };
}
function Dk(...e) {
  return rt.useCallback(zk(...e), e);
}
class Rk extends rt.Component {
  getSnapshotBeforeUpdate(i) {
    const r = this.props.childRef.current;
    if (hs(r) && i.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = r.offsetParent, s = hs(l) && l.offsetWidth || 0, u = hs(l) && l.offsetHeight || 0, f = getComputedStyle(r), d = this.props.sizeRef.current;
      d.height = parseFloat(f.height), d.width = parseFloat(f.width), d.top = r.offsetTop, d.left = r.offsetLeft, d.right = s - d.width - d.left, d.bottom = u - d.height - d.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function Ok({ children: e, isPresent: i, anchorX: r, anchorY: l, root: s, pop: u }) {
  var b;
  const f = rt.useId(), d = rt.useRef(null), m = rt.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = rt.useContext(Kh), g = ((b = e.props) == null ? void 0 : b.ref) ?? (e == null ? void 0 : e.ref), y = Dk(d, g);
  return rt.useInsertionEffect(() => {
    const { width: x, height: A, top: z, left: D, right: M, bottom: H } = m.current;
    if (i || u === !1 || !d.current || !x || !A)
      return;
    const _ = r === "left" ? `left: ${D}` : `right: ${M}`, F = l === "bottom" ? `bottom: ${H}` : `top: ${z}`;
    d.current.dataset.motionPopId = f;
    const K = document.createElement("style");
    p && (K.nonce = p);
    const B = s ?? document.head;
    return B.appendChild(K), K.sheet && K.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${A}px !important;
            ${_}px !important;
            ${F}px !important;
          }
        `), () => {
      var I;
      (I = d.current) == null || I.removeAttribute("data-motion-pop-id"), B.contains(K) && B.removeChild(K);
    };
  }, [i]), St.jsx(Rk, { isPresent: i, childRef: d, sizeRef: m, pop: u, children: u === !1 ? e : rt.cloneElement(e, { ref: y }) });
}
const _k = ({ children: e, initial: i, isPresent: r, onExitComplete: l, custom: s, presenceAffectsLayout: u, mode: f, anchorX: d, anchorY: m, root: p }) => {
  const g = Eh(Nk), y = rt.useId();
  let b = !0, x = rt.useMemo(() => (b = !1, {
    id: y,
    initial: i,
    isPresent: r,
    custom: s,
    onExitComplete: (A) => {
      g.set(A, !0);
      for (const z of g.values())
        if (!z)
          return;
      l && l();
    },
    register: (A) => (g.set(A, !1), () => g.delete(A))
  }), [r, g, l]);
  return u && b && (x = { ...x }), rt.useMemo(() => {
    g.forEach((A, z) => g.set(z, !1));
  }, [r]), rt.useEffect(() => {
    !r && !g.size && l && l();
  }, [r]), e = St.jsx(Ok, { pop: f === "popLayout", isPresent: r, anchorX: d, anchorY: m, root: p, children: e }), St.jsx(_s.Provider, { value: x, children: e });
};
function Nk() {
  return /* @__PURE__ */ new Map();
}
function S1(e = !0) {
  const i = rt.useContext(_s);
  if (i === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: l, register: s } = i, u = rt.useId();
  rt.useEffect(() => {
    if (e)
      return s(u);
  }, [e]);
  const f = rt.useCallback(() => e && l && l(u), [u, l, e]);
  return !r && l ? [!1, f] : [!0];
}
const as = (e) => e.key || "";
function Dv(e) {
  const i = [];
  return rt.Children.forEach(e, (r) => {
    rt.isValidElement(r) && i.push(r);
  }), i;
}
const Lk = ({ children: e, custom: i, initial: r = !0, onExitComplete: l, presenceAffectsLayout: s = !0, mode: u = "sync", propagate: f = !1, anchorX: d = "left", anchorY: m = "top", root: p }) => {
  const [g, y] = S1(f), b = rt.useMemo(() => Dv(e), [e]), x = f && !g ? [] : b.map(as), A = rt.useRef(!0), z = rt.useRef(b), D = Eh(() => /* @__PURE__ */ new Map()), M = rt.useRef(/* @__PURE__ */ new Set()), [H, _] = rt.useState(b), [F, K] = rt.useState(b);
  Z0(() => {
    A.current = !1, z.current = b;
    for (let j = 0; j < F.length; j++) {
      const J = as(F[j]);
      x.includes(J) ? (D.delete(J), M.current.delete(J)) : D.get(J) !== !0 && D.set(J, !1);
    }
  }, [F, x.length, x.join("-")]);
  const B = [];
  if (b !== H) {
    let j = [...b];
    for (let J = 0; J < F.length; J++) {
      const et = F[J], W = as(et);
      x.includes(W) || (j.splice(J, 0, et), B.push(et));
    }
    return u === "wait" && B.length && (j = B), K(Dv(j)), _(b), null;
  }
  const { forceRender: I } = rt.useContext(Th);
  return St.jsx(St.Fragment, { children: F.map((j) => {
    const J = as(j), et = f && !g ? !1 : b === F || x.includes(J), W = () => {
      if (M.current.has(J))
        return;
      if (D.has(J))
        M.current.add(J), D.set(J, !0);
      else
        return;
      let $ = !0;
      D.forEach((vt) => {
        vt || ($ = !1);
      }), $ && (I == null || I(), K(z.current), f && (y == null || y()), l && l());
    };
    return St.jsx(_k, { isPresent: et, initial: !A.current || r ? void 0 : !1, custom: i, presenceAffectsLayout: s, mode: u, root: p, onExitComplete: et ? void 0 : W, anchorX: d, anchorY: m, children: j }, J);
  }) });
}, T1 = rt.createContext({ strict: !1 }), Rv = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Ov = !1;
function Vk() {
  if (Ov)
    return;
  const e = {};
  for (const i in Rv)
    e[i] = {
      isEnabled: (r) => Rv[i].some((l) => !!r[l])
    };
  Wb(e), Ov = !0;
}
function E1() {
  return Vk(), b2();
}
function Bk(e) {
  const i = E1();
  for (const r in e)
    i[r] = {
      ...i[r],
      ...e[r]
    };
  Wb(i);
}
const Uk = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function zs(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || Uk.has(e);
}
let A1 = (e) => !zs(e);
function jk(e) {
  typeof e == "function" && (A1 = (i) => i.startsWith("on") ? !zs(i) : e(i));
}
try {
  jk(require("@emotion/is-prop-valid").default);
} catch {
}
function Hk(e, i, r) {
  const l = {};
  for (const s in e)
    s === "values" && typeof e.values == "object" || Te(e[s]) || (A1(s) || r === !0 && zs(s) || !i && !zs(s) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && s.startsWith("onDrag")) && (l[s] = e[s]);
  return l;
}
const Bs = /* @__PURE__ */ rt.createContext({});
function qk(e, i) {
  if (Vs(e)) {
    const { initial: r, animate: l } = e;
    return {
      initial: r === !1 || Al(r) ? r : void 0,
      animate: Al(l) ? l : void 0
    };
  }
  return e.inherit !== !1 ? i : {};
}
function Yk(e) {
  const { initial: i, animate: r } = qk(e, rt.useContext(Bs));
  return rt.useMemo(() => ({ initial: i, animate: r }), [_v(i), _v(r)]);
}
function _v(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Zh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function k1(e, i, r) {
  for (const l in i)
    !Te(i[l]) && !r1(l, r) && (e[l] = i[l]);
}
function Gk({ transformTemplate: e }, i) {
  return rt.useMemo(() => {
    const r = Zh();
    return Fh(r, i, e), Object.assign({}, r.vars, r.style);
  }, [i]);
}
function Xk(e, i) {
  const r = e.style || {}, l = {};
  return k1(l, r, e), Object.assign(l, Gk(e, i)), l;
}
function Pk(e, i) {
  const r = {}, l = Xk(e, i);
  return e.drag && e.dragListener !== !1 && (r.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0), r.style = l, r;
}
const C1 = () => ({
  ...Zh(),
  attrs: {}
});
function Fk(e, i, r, l) {
  const s = rt.useMemo(() => {
    const u = C1();
    return l1(u, i, s1(l), e.transformTemplate, e.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [i]);
  if (e.style) {
    const u = {};
    k1(u, e.style, e), s.style = { ...u, ...s.style };
  }
  return s;
}
const Qk = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Ih(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Qk.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function Kk(e, i, r, { latestValues: l }, s, u = !1, f) {
  const m = (f ?? Ih(e) ? Fk : Pk)(i, l, s, e), p = Hk(i, typeof e == "string", u), g = e !== rt.Fragment ? { ...p, ...m, ref: r } : {}, { children: y } = i, b = rt.useMemo(() => Te(y) ? y.get() : y, [y]);
  return rt.createElement(e, {
    ...g,
    children: b
  });
}
function Zk({ scrapeMotionValuesFromProps: e, createRenderState: i }, r, l, s) {
  return {
    latestValues: Ik(r, l, s, e),
    renderState: i()
  };
}
function Ik(e, i, r, l) {
  const s = {}, u = l(e, {});
  for (const b in u)
    s[b] = ys(u[b]);
  let { initial: f, animate: d } = e;
  const m = Vs(e), p = Ib(e);
  i && p && !m && e.inherit !== !1 && (f === void 0 && (f = i.initial), d === void 0 && (d = i.animate));
  let g = r ? r.initial === !1 : !1;
  g = g || f === !1;
  const y = g ? d : f;
  if (y && typeof y != "boolean" && !Ls(y)) {
    const b = Array.isArray(y) ? y : [y];
    for (let x = 0; x < b.length; x++) {
      const A = Uh(e, b[x]);
      if (A) {
        const { transitionEnd: z, transition: D, ...M } = A;
        for (const H in M) {
          let _ = M[H];
          if (Array.isArray(_)) {
            const F = g ? _.length - 1 : 0;
            _ = _[F];
          }
          _ !== null && (s[H] = _);
        }
        for (const H in z)
          s[H] = z[H];
      }
    }
  }
  return s;
}
const M1 = (e) => (i, r) => {
  const l = rt.useContext(Bs), s = rt.useContext(_s), u = () => Zk(e, i, l, s);
  return r ? u() : Eh(u);
}, Jk = /* @__PURE__ */ M1({
  scrapeMotionValuesFromProps: Qh,
  createRenderState: Zh
}), Wk = /* @__PURE__ */ M1({
  scrapeMotionValuesFromProps: u1,
  createRenderState: C1
}), $k = Symbol.for("motionComponentSymbol");
function tC(e, i, r) {
  const l = rt.useRef(r);
  rt.useInsertionEffect(() => {
    l.current = r;
  });
  const s = rt.useRef(null);
  return rt.useCallback((u) => {
    var d;
    u && ((d = e.onMount) == null || d.call(e, u));
    const f = l.current;
    if (typeof f == "function")
      if (u) {
        const m = f(u);
        typeof m == "function" && (s.current = m);
      } else s.current ? (s.current(), s.current = null) : f(u);
    else f && (f.current = u);
    i && (u ? i.mount(u) : i.unmount());
  }, [i]);
}
const z1 = rt.createContext({});
function nr(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function eC(e, i, r, l, s, u) {
  var _, F;
  const { visualElement: f } = rt.useContext(Bs), d = rt.useContext(T1), m = rt.useContext(_s), p = rt.useContext(Kh), g = p.reducedMotion, y = p.skipAnimations, b = rt.useRef(null), x = rt.useRef(!1);
  l = l || d.renderer, !b.current && l && (b.current = l(e, {
    visualState: i,
    parent: f,
    props: r,
    presenceContext: m,
    blockInitialAnimation: m ? m.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: y,
    isSVG: u
  }), x.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const A = b.current, z = rt.useContext(z1);
  A && !A.projection && s && (A.type === "html" || A.type === "svg") && nC(b.current, r, s, z);
  const D = rt.useRef(!1);
  rt.useInsertionEffect(() => {
    A && D.current && A.update(r, m);
  });
  const M = r[Bb], H = rt.useRef(!!M && typeof window < "u" && !((_ = window.MotionHandoffIsComplete) != null && _.call(window, M)) && ((F = window.MotionHasOptimisedAnimation) == null ? void 0 : F.call(window, M)));
  return Z0(() => {
    x.current = !0, A && (D.current = !0, window.MotionIsMounted = !0, A.updateFeatures(), A.scheduleRenderMicrotask(), H.current && A.animationState && A.animationState.animateChanges());
  }), rt.useEffect(() => {
    A && (!H.current && A.animationState && A.animationState.animateChanges(), H.current && (queueMicrotask(() => {
      var K;
      (K = window.MotionHandoffMarkAsComplete) == null || K.call(window, M);
    }), H.current = !1), A.enteringChildren = void 0);
  }), A;
}
function nC(e, i, r, l) {
  const { layoutId: s, layout: u, drag: f, dragConstraints: d, layoutScroll: m, layoutRoot: p, layoutAnchor: g, layoutCrossfade: y } = i;
  e.projection = new r(e.latestValues, i["data-framer-portal-id"] ? void 0 : D1(e.parent)), e.projection.setOptions({
    layoutId: s,
    layout: u,
    alwaysMeasureLayout: !!f || d && nr(d),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: l,
    crossfade: y,
    layoutScroll: m,
    layoutRoot: p,
    layoutAnchor: g
  });
}
function D1(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : D1(e.parent);
}
function wf(e, { forwardMotionProps: i = !1, type: r } = {}, l, s) {
  l && Bk(l);
  const u = r ? r === "svg" : Ih(e), f = u ? Wk : Jk;
  function d(p, g) {
    let y;
    const b = {
      ...rt.useContext(Kh),
      ...p,
      layoutId: iC(p)
    }, { isStatic: x } = b, A = Yk(p), z = f(p, x);
    if (!x && typeof window < "u") {
      aC();
      const D = rC(b);
      y = D.MeasureLayout, A.visualElement = eC(e, z, b, s, D.ProjectionNode, u);
    }
    return St.jsxs(Bs.Provider, { value: A, children: [y && A.visualElement ? St.jsx(y, { visualElement: A.visualElement, ...b }) : null, Kk(e, p, tC(z, A.visualElement, g), z, x, i, u)] });
  }
  d.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const m = rt.forwardRef(d);
  return m[$k] = e, m;
}
function iC({ layoutId: e }) {
  const i = rt.useContext(Th).id;
  return i && e !== void 0 ? i + "-" + e : e;
}
function aC(e, i) {
  rt.useContext(T1).strict;
}
function rC(e) {
  const i = E1(), { drag: r, layout: l } = i;
  if (!r && !l)
    return {};
  const s = { ...r, ...l };
  return {
    MeasureLayout: r != null && r.isEnabled(e) || l != null && l.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function lC(e, i) {
  if (typeof Proxy > "u")
    return wf;
  const r = /* @__PURE__ */ new Map(), l = (u, f) => wf(u, f, e, i), s = (u, f) => l(u, f);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? l : (r.has(f) || r.set(f, wf(f, void 0, e, i)), r.get(f))
  });
}
const oC = (e, i) => i.isSVG ?? Ih(e) ? new V2(i) : new D2(i, {
  allowProjection: e !== rt.Fragment
});
class sC extends Vi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(i) {
    super(i), i.animationState || (i.animationState = q2(i));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    Ls(i) && (this.unmountControls = i.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    i !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var i;
    this.node.animationState.reset(), (i = this.unmountControls) == null || i.call(this);
  }
}
let uC = 0;
class cC extends Vi {
  constructor() {
    super(...arguments), this.id = uC++, this.isExitComplete = !1;
  }
  update() {
    var u;
    if (!this.node.presenceContext)
      return;
    const { isPresent: i, onExitComplete: r } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === l)
      return;
    if (i && l === !1) {
      if (this.isExitComplete) {
        const { initial: f, custom: d } = this.node.getProps();
        if (typeof f == "string") {
          const m = sa(this.node, f, d);
          if (m) {
            const { transition: p, transitionEnd: g, ...y } = m;
            for (const b in y)
              (u = this.node.getValue(b)) == null || u.jump(y[b]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const s = this.node.animationState.setActive("exit", !i);
    r && !i && s.then(() => {
      this.isExitComplete = !0, r(this.id);
    });
  }
  mount() {
    const { register: i, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), i && (this.unmount = i(this.id));
  }
  unmount() {
  }
}
const fC = {
  animation: {
    Feature: sC
  },
  exit: {
    Feature: cC
  }
};
function Ol(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const hC = (e) => (i) => Yh(i) && e(i, Ol(i));
function bl(e, i, r, l) {
  return kl(e, i, hC(r), l);
}
const R1 = ({ current: e }) => e ? e.ownerDocument.defaultView : null, Nv = (e, i) => Math.abs(e - i);
function dC(e, i) {
  const r = Nv(e.x, i.x), l = Nv(e.y, i.y);
  return Math.sqrt(r ** 2 + l ** 2);
}
const Lv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class O1 {
  constructor(i, r, { transformPagePoint: l, contextWindow: s = window, dragSnapToOrigin: u = !1, distanceThreshold: f = 3, element: d } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (x) => {
      this.handleScroll(x.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = rs(this.lastRawMoveEventInfo, this.transformPagePoint));
      const x = Sf(this.lastMoveEventInfo, this.history), A = this.startEvent !== null, z = dC(x.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!A && !z)
        return;
      const { point: D } = x, { timestamp: M } = Se;
      this.history.push({ ...D, timestamp: M });
      const { onStart: H, onMove: _ } = this.handlers;
      A || (H && H(this.lastMoveEvent, x), this.startEvent = this.lastMoveEvent), _ && _(this.lastMoveEvent, x);
    }, this.handlePointerMove = (x, A) => {
      this.lastMoveEvent = x, this.lastRawMoveEventInfo = A, this.lastMoveEventInfo = rs(A, this.transformPagePoint), Qt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (x, A) => {
      this.end();
      const { onEnd: z, onSessionEnd: D, resumeAnimation: M } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && M && M(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const H = Sf(x.type === "pointercancel" ? this.lastMoveEventInfo : rs(A, this.transformPagePoint), this.history);
      this.startEvent && z && z(x, H), D && D(x, H);
    }, !Yh(i))
      return;
    this.dragSnapToOrigin = u, this.handlers = r, this.transformPagePoint = l, this.distanceThreshold = f, this.contextWindow = s || window;
    const m = Ol(i), p = rs(m, this.transformPagePoint), { point: g } = p, { timestamp: y } = Se;
    this.history = [{ ...g, timestamp: y }];
    const { onSessionStart: b } = r;
    b && b(i, Sf(p, this.history)), this.removeListeners = zl(bl(this.contextWindow, "pointermove", this.handlePointerMove), bl(this.contextWindow, "pointerup", this.handlePointerUp), bl(this.contextWindow, "pointercancel", this.handlePointerUp)), d && this.startScrollTracking(d);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(i) {
    let r = i.parentElement;
    for (; r; ) {
      const l = getComputedStyle(r);
      (Lv.has(l.overflowX) || Lv.has(l.overflowY)) && this.scrollPositions.set(r, {
        x: r.scrollLeft,
        y: r.scrollTop
      }), r = r.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(i) {
    const r = this.scrollPositions.get(i);
    if (!r)
      return;
    const l = i === window, s = l ? { x: window.scrollX, y: window.scrollY } : {
      x: i.scrollLeft,
      y: i.scrollTop
    }, u = { x: s.x - r.x, y: s.y - r.y };
    u.x === 0 && u.y === 0 || (l ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += u.x, this.lastMoveEventInfo.point.y += u.y) : this.history.length > 0 && (this.history[0].x -= u.x, this.history[0].y -= u.y), this.scrollPositions.set(i, s), Qt.update(this.updatePoint, !0));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Ni(this.updatePoint);
  }
}
function rs(e, i) {
  return i ? { point: i(e.point) } : e;
}
function Vv(e, i) {
  return { x: e.x - i.x, y: e.y - i.y };
}
function Sf({ point: e }, i) {
  return {
    point: e,
    delta: Vv(e, _1(i)),
    offset: Vv(e, pC(i)),
    velocity: mC(i, 0.1)
  };
}
function pC(e) {
  return e[0];
}
function _1(e) {
  return e[e.length - 1];
}
function mC(e, i) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let r = e.length - 1, l = null;
  const s = _1(e);
  for (; r >= 0 && (l = e[r], !(s.timestamp - l.timestamp > /* @__PURE__ */ Ge(i))); )
    r--;
  if (!l)
    return { x: 0, y: 0 };
  l === e[0] && e.length > 2 && s.timestamp - l.timestamp > /* @__PURE__ */ Ge(i) * 2 && (l = e[1]);
  const u = /* @__PURE__ */ pn(s.timestamp - l.timestamp);
  if (u === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (s.x - l.x) / u,
    y: (s.y - l.y) / u
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function gC(e, { min: i, max: r }, l) {
  return i !== void 0 && e < i ? e = l ? Wt(i, e, l.min) : Math.max(e, i) : r !== void 0 && e > r && (e = l ? Wt(r, e, l.max) : Math.min(e, r)), e;
}
function Bv(e, i, r) {
  return {
    min: i !== void 0 ? e.min + i : void 0,
    max: r !== void 0 ? e.max + r - (e.max - e.min) : void 0
  };
}
function yC(e, { top: i, left: r, bottom: l, right: s }) {
  return {
    x: Bv(e.x, r, s),
    y: Bv(e.y, i, l)
  };
}
function Uv(e, i) {
  let r = i.min - e.min, l = i.max - e.max;
  return i.max - i.min < e.max - e.min && ([r, l] = [l, r]), { min: r, max: l };
}
function vC(e, i) {
  return {
    x: Uv(e.x, i.x),
    y: Uv(e.y, i.y)
  };
}
function bC(e, i) {
  let r = 0.5;
  const l = Re(e), s = Re(i);
  return s > l ? r = /* @__PURE__ */ Tl(i.min, i.max - l, e.min) : l > s && (r = /* @__PURE__ */ Tl(e.min, e.max - s, i.min)), _n(0, 1, r);
}
function xC(e, i) {
  const r = {};
  return i.min !== void 0 && (r.min = i.min - e.min), i.max !== void 0 && (r.max = i.max - e.min), r;
}
const sh = 0.35;
function wC(e = sh) {
  return e === !1 ? e = 0 : e === !0 && (e = sh), {
    x: jv(e, "left", "right"),
    y: jv(e, "top", "bottom")
  };
}
function jv(e, i, r) {
  return {
    min: Hv(e, i),
    max: Hv(e, r)
  };
}
function Hv(e, i) {
  return typeof e == "number" ? e : e[i] || 0;
}
const SC = /* @__PURE__ */ new WeakMap();
class TC {
  constructor(i) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = pe(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = i;
  }
  start(i, { snapToCursor: r = !1, distanceThreshold: l } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const u = (y) => {
      r && this.snapToCursor(Ol(y).point), this.stopAnimation();
    }, f = (y, b) => {
      const { drag: x, dragPropagation: A, onDragStart: z } = this.getProps();
      if (x && !A && (this.openDragLock && this.openDragLock(), this.openDragLock = ZA(x), !this.openDragLock))
        return;
      this.latestPointerEvent = y, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Mn((M) => {
        let H = this.getAxisMotionValue(M).get() || 0;
        if (On.test(H)) {
          const { projection: _ } = this.visualElement;
          if (_ && _.layout) {
            const F = _.layout.layoutBox[M];
            F && (H = Re(F) * (parseFloat(H) / 100));
          }
        }
        this.originPoint[M] = H;
      }), z && Qt.update(() => z(y, b), !1, !0), $f(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, d = (y, b) => {
      this.latestPointerEvent = y, this.latestPanInfo = b;
      const { dragPropagation: x, dragDirectionLock: A, onDirectionLock: z, onDrag: D } = this.getProps();
      if (!x && !this.openDragLock)
        return;
      const { offset: M } = b;
      if (A && this.currentDirection === null) {
        this.currentDirection = AC(M), this.currentDirection !== null && z && z(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, M), this.updateAxis("y", b.point, M), this.visualElement.render(), D && Qt.update(() => D(y, b), !1, !0);
    }, m = (y, b) => {
      this.latestPointerEvent = y, this.latestPanInfo = b, this.stop(y, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => {
      const { dragSnapToOrigin: y } = this.getProps();
      (y || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new O1(i, {
      onSessionStart: u,
      onStart: f,
      onMove: d,
      onSessionEnd: m,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: l,
      contextWindow: R1(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(i, r) {
    const l = i || this.latestPointerEvent, s = r || this.latestPanInfo, u = this.isDragging;
    if (this.cancel(), !u || !s || !l)
      return;
    const { velocity: f } = s;
    this.startAnimation(f);
    const { onDragEnd: d } = this.getProps();
    d && Qt.postRender(() => d(l, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: r } = this.visualElement;
    i && (i.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: l } = this.getProps();
    !l && this.openDragLock && (this.openDragLock(), this.openDragLock = null), r && r.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(i, r, l) {
    const { drag: s } = this.getProps();
    if (!l || !ls(i, s, this.currentDirection))
      return;
    const u = this.getAxisMotionValue(i);
    let f = this.originPoint[i] + l[i];
    this.constraints && this.constraints[i] && (f = gC(f, this.constraints[i], this.elastic[i])), u.set(f);
  }
  resolveConstraints() {
    var u;
    const { dragConstraints: i, dragElastic: r } = this.getProps(), l = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (u = this.visualElement.projection) == null ? void 0 : u.layout, s = this.constraints;
    i && nr(i) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : i && l ? this.constraints = yC(l.layoutBox, i) : this.constraints = !1, this.elastic = wC(r), s !== this.constraints && !nr(i) && l && this.constraints && !this.hasMutatedConstraints && Mn((f) => {
      this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = xC(l.layoutBox[f], this.constraints[f]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: r } = this.getProps();
    if (!i || !nr(i))
      return !1;
    const l = i.current;
    ua(l !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const u = E2(l, s.root, this.visualElement.getTransformPagePoint());
    let f = vC(s.layout.layoutBox, u);
    if (r) {
      const d = r(w2(f));
      this.hasMutatedConstraints = !!d, d && (f = t1(d));
    }
    return f;
  }
  startAnimation(i) {
    const { drag: r, dragMomentum: l, dragElastic: s, dragTransition: u, dragSnapToOrigin: f, onDragTransitionEnd: d } = this.getProps(), m = this.constraints || {}, p = Mn((g) => {
      if (!ls(g, r, this.currentDirection))
        return;
      let y = m && m[g] || {};
      (f === !0 || f === g) && (y = { min: 0, max: 0 });
      const b = s ? 200 : 1e6, x = s ? 40 : 1e7, A = {
        type: "inertia",
        velocity: l ? i[g] : 0,
        bounceStiffness: b,
        bounceDamping: x,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...u,
        ...y
      };
      return this.startAxisValueAnimation(g, A);
    });
    return Promise.all(p).then(d);
  }
  startAxisValueAnimation(i, r) {
    const l = this.getAxisMotionValue(i);
    return $f(this.visualElement, i), l.start(Bh(i, l, 0, r, this.visualElement, !1));
  }
  stopAnimation() {
    Mn((i) => this.getAxisMotionValue(i).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(i) {
    const r = `_drag${i.toUpperCase()}`, l = this.visualElement.getProps(), s = l[r];
    return s || this.visualElement.getValue(i, (l.initial ? l.initial[i] : void 0) || 0);
  }
  snapToCursor(i) {
    Mn((r) => {
      const { drag: l } = this.getProps();
      if (!ls(r, l, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, u = this.getAxisMotionValue(r);
      if (s && s.layout) {
        const { min: f, max: d } = s.layout.layoutBox[r], m = u.get() || 0;
        u.set(i[r] - Wt(f, d, 0.5) + m);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: i, dragConstraints: r } = this.getProps(), { projection: l } = this.visualElement;
    if (!nr(r) || !l || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    Mn((f) => {
      const d = this.getAxisMotionValue(f);
      if (d && this.constraints !== !1) {
        const m = d.get();
        s[f] = bC({ min: m, max: m }, this.constraints[f]);
      }
    });
    const { transformTemplate: u } = this.visualElement.getProps();
    this.visualElement.current.style.transform = u ? u({}, "") : "none", l.root && l.root.updateScroll(), l.updateLayout(), this.constraints = !1, this.resolveConstraints(), Mn((f) => {
      if (!ls(f, i, null))
        return;
      const d = this.getAxisMotionValue(f), { min: m, max: p } = this.constraints[f];
      d.set(Wt(m, p, s[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    SC.set(this.visualElement, this);
    const i = this.visualElement.current, r = bl(i, "pointerdown", (p) => {
      const { drag: g, dragListener: y = !0 } = this.getProps(), b = p.target, x = b !== i && e2(b);
      g && y && !x && this.start(p);
    });
    let l;
    const s = () => {
      const { dragConstraints: p } = this.getProps();
      nr(p) && p.current && (this.constraints = this.resolveRefConstraints(), l || (l = EC(i, p.current, () => this.scalePositionWithinConstraints())));
    }, { projection: u } = this.visualElement, f = u.addEventListener("measure", s);
    u && !u.layout && (u.root && u.root.updateScroll(), u.updateLayout()), Qt.read(s);
    const d = kl(window, "resize", () => this.scalePositionWithinConstraints()), m = u.addEventListener("didUpdate", (({ delta: p, hasLayoutChanged: g }) => {
      this.isDragging && g && (Mn((y) => {
        const b = this.getAxisMotionValue(y);
        b && (this.originPoint[y] += p[y].translate, b.set(b.get() + p[y].translate));
      }), this.visualElement.render());
    }));
    return () => {
      d(), r(), f(), m && m(), l && l();
    };
  }
  getProps() {
    const i = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: l = !1, dragPropagation: s = !1, dragConstraints: u = !1, dragElastic: f = sh, dragMomentum: d = !0 } = i;
    return {
      ...i,
      drag: r,
      dragDirectionLock: l,
      dragPropagation: s,
      dragConstraints: u,
      dragElastic: f,
      dragMomentum: d
    };
  }
}
function qv(e) {
  let i = !0;
  return () => {
    if (i) {
      i = !1;
      return;
    }
    e();
  };
}
function EC(e, i, r) {
  const l = Ky(e, qv(r)), s = Ky(i, qv(r));
  return () => {
    l(), s();
  };
}
function ls(e, i, r) {
  return (i === !0 || i === e) && (r === null || r === e);
}
function AC(e, i = 10) {
  let r = null;
  return Math.abs(e.y) > i ? r = "y" : Math.abs(e.x) > i && (r = "x"), r;
}
class kC extends Vi {
  constructor(i) {
    super(i), this.removeGroupControls = mn, this.removeListeners = mn, this.controls = new TC(i);
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    i && (this.removeGroupControls = i.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || mn;
  }
  update() {
    const { dragControls: i } = this.node.getProps(), { dragControls: r } = this.node.prevProps || {};
    i !== r && (this.removeGroupControls(), i && (this.removeGroupControls = i.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Tf = (e) => (i, r) => {
  e && Qt.update(() => e(i, r), !1, !0);
};
class CC extends Vi {
  constructor() {
    super(...arguments), this.removePointerDownListener = mn;
  }
  onPointerDown(i) {
    this.session = new O1(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: R1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: i, onPanStart: r, onPan: l, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Tf(i),
      onStart: Tf(r),
      onMove: Tf(l),
      onEnd: (u, f) => {
        delete this.session, s && Qt.postRender(() => s(u, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = bl(this.node.current, "pointerdown", (i) => this.onPointerDown(i));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Ef = !1;
class MC extends rt.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: i, layoutGroup: r, switchLayoutGroup: l, layoutId: s } = this.props, { projection: u } = i;
    u && (r.group && r.group.add(u), l && l.register && s && l.register(u), Ef && u.root.didUpdate(), u.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), u.setOptions({
      ...u.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), vs.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(i) {
    const { layoutDependency: r, visualElement: l, drag: s, isPresent: u } = this.props, { projection: f } = l;
    return f && (f.isPresent = u, i.layoutDependency !== r && f.setOptions({
      ...f.options,
      layoutDependency: r
    }), Ef = !0, s || i.layoutDependency !== r || r === void 0 || i.isPresent !== u ? f.willUpdate() : this.safeToRemove(), i.isPresent !== u && (u ? f.promote() : f.relegate() || Qt.postRender(() => {
      const d = f.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: i, layoutAnchor: r } = this.props, { projection: l } = i;
    l && (l.options.layoutAnchor = r, l.root.didUpdate(), qh.postRender(() => {
      !l.currentAnimation && l.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: i, layoutGroup: r, switchLayoutGroup: l } = this.props, { projection: s } = i;
    Ef = !0, s && (s.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(s), l && l.deregister && l.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function N1(e) {
  const [i, r] = S1(), l = rt.useContext(Th);
  return St.jsx(MC, { ...e, layoutGroup: l, switchLayoutGroup: rt.useContext(z1), isPresent: i, safeToRemove: r });
}
const zC = {
  pan: {
    Feature: CC
  },
  drag: {
    Feature: kC,
    ProjectionNode: w1,
    MeasureLayout: N1
  }
};
function Yv(e, i, r) {
  const { props: l } = e;
  e.animationState && l.whileHover && e.animationState.setActive("whileHover", r === "Start");
  const s = "onHover" + r, u = l[s];
  u && Qt.postRender(() => u(i, Ol(i)));
}
class DC extends Vi {
  mount() {
    const { current: i } = this.node;
    i && (this.unmount = JA(i, (r, l) => (Yv(this.node, l, "Start"), (s) => Yv(this.node, s, "End"))));
  }
  unmount() {
  }
}
class RC extends Vi {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(":focus-visible");
    } catch {
      i = !0;
    }
    !i || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = zl(kl(this.node.current, "focus", () => this.onFocus()), kl(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Gv(e, i, r) {
  const { props: l } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && l.whileTap && e.animationState.setActive("whileTap", r === "Start");
  const s = "onTap" + (r === "End" ? "" : r), u = l[s];
  u && Qt.postRender(() => u(i, Ol(i)));
}
class OC extends Vi {
  mount() {
    const { current: i } = this.node;
    if (!i)
      return;
    const { globalTapTarget: r, propagate: l } = this.node.props;
    this.unmount = i2(i, (s, u) => (Gv(this.node, u, "Start"), (f, { success: d }) => Gv(this.node, f, d ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: (l == null ? void 0 : l.tap) === !1
    });
  }
  unmount() {
  }
}
const uh = /* @__PURE__ */ new WeakMap(), Af = /* @__PURE__ */ new WeakMap(), _C = (e) => {
  const i = uh.get(e.target);
  i && i(e);
}, NC = (e) => {
  e.forEach(_C);
};
function LC({ root: e, ...i }) {
  const r = e || document;
  Af.has(r) || Af.set(r, {});
  const l = Af.get(r), s = JSON.stringify(i);
  return l[s] || (l[s] = new IntersectionObserver(NC, { root: e, ...i })), l[s];
}
function VC(e, i, r) {
  const l = LC(i);
  return uh.set(e, r), l.observe(e), () => {
    uh.delete(e), l.unobserve(e);
  };
}
const BC = {
  some: 0,
  all: 1
};
class UC extends Vi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    var m;
    (m = this.stopObserver) == null || m.call(this);
    const { viewport: i = {} } = this.node.getProps(), { root: r, margin: l, amount: s = "some", once: u } = i, f = {
      root: r ? r.current : void 0,
      rootMargin: l,
      threshold: typeof s == "number" ? s : BC[s]
    }, d = (p) => {
      const { isIntersecting: g } = p;
      if (this.isInView === g || (this.isInView = g, u && !g && this.hasEnteredView))
        return;
      g && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", g);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), x = g ? y : b;
      x && x(p);
    };
    this.stopObserver = VC(this.node.current, f, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: i, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(jC(i, r)) && this.startObserver();
  }
  unmount() {
    var i;
    (i = this.stopObserver) == null || i.call(this), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function jC({ viewport: e = {} }, { viewport: i = {} } = {}) {
  return (r) => e[r] !== i[r];
}
const HC = {
  inView: {
    Feature: UC
  },
  tap: {
    Feature: OC
  },
  focus: {
    Feature: RC
  },
  hover: {
    Feature: DC
  }
}, qC = {
  layout: {
    ProjectionNode: w1,
    MeasureLayout: N1
  }
}, YC = {
  ...fC,
  ...HC,
  ...zC,
  ...qC
}, os = /* @__PURE__ */ lC(YC, oC);
function GC(e, i) {
  const r = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (r.padRight ? " " : "") + "," + (r.padLeft === !1 ? "" : " ")
  ).trim();
}
const XC = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, PC = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, FC = {};
function Xv(e, i) {
  return (FC.jsx ? PC : XC).test(e);
}
const QC = /[ \t\n\f\r]/g;
function KC(e) {
  return typeof e == "object" ? e.type === "text" ? Pv(e.value) : !1 : Pv(e);
}
function Pv(e) {
  return e.replace(QC, "") === "";
}
class _l {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(i, r, l) {
    this.normal = r, this.property = i, l && (this.space = l);
  }
}
_l.prototype.normal = {};
_l.prototype.property = {};
_l.prototype.space = void 0;
function L1(e, i) {
  const r = {}, l = {};
  for (const s of e)
    Object.assign(r, s.property), Object.assign(l, s.normal);
  return new _l(r, l, i);
}
function ch(e) {
  return e.toLowerCase();
}
class Pe {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(i, r) {
    this.attribute = r, this.property = i;
  }
}
Pe.prototype.attribute = "";
Pe.prototype.booleanish = !1;
Pe.prototype.boolean = !1;
Pe.prototype.commaOrSpaceSeparated = !1;
Pe.prototype.commaSeparated = !1;
Pe.prototype.defined = !1;
Pe.prototype.mustUseProperty = !1;
Pe.prototype.number = !1;
Pe.prototype.overloadedBoolean = !1;
Pe.prototype.property = "";
Pe.prototype.spaceSeparated = !1;
Pe.prototype.space = void 0;
let ZC = 0;
const kt = fa(), ue = fa(), fh = fa(), tt = fa(), Kt = fa(), lr = fa(), tn = fa();
function fa() {
  return 2 ** ++ZC;
}
const hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: kt,
  booleanish: ue,
  commaOrSpaceSeparated: tn,
  commaSeparated: lr,
  number: tt,
  overloadedBoolean: fh,
  spaceSeparated: Kt
}, Symbol.toStringTag, { value: "Module" })), kf = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(hh)
);
class Jh extends Pe {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(i, r, l, s) {
    let u = -1;
    if (super(i, r), Fv(this, "space", s), typeof l == "number")
      for (; ++u < kf.length; ) {
        const f = kf[u];
        Fv(this, kf[u], (l & hh[f]) === hh[f]);
      }
  }
}
Jh.prototype.defined = !0;
function Fv(e, i, r) {
  r && (e[i] = r);
}
function dr(e) {
  const i = {}, r = {};
  for (const [l, s] of Object.entries(e.properties)) {
    const u = new Jh(
      l,
      e.transform(e.attributes || {}, l),
      s,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(l) && (u.mustUseProperty = !0), i[l] = u, r[ch(l)] = l, r[ch(u.attribute)] = l;
  }
  return new _l(i, r, e.space);
}
const V1 = dr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ue,
    ariaAutoComplete: null,
    ariaBusy: ue,
    ariaChecked: ue,
    ariaColCount: tt,
    ariaColIndex: tt,
    ariaColSpan: tt,
    ariaControls: Kt,
    ariaCurrent: null,
    ariaDescribedBy: Kt,
    ariaDetails: null,
    ariaDisabled: ue,
    ariaDropEffect: Kt,
    ariaErrorMessage: null,
    ariaExpanded: ue,
    ariaFlowTo: Kt,
    ariaGrabbed: ue,
    ariaHasPopup: null,
    ariaHidden: ue,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Kt,
    ariaLevel: tt,
    ariaLive: null,
    ariaModal: ue,
    ariaMultiLine: ue,
    ariaMultiSelectable: ue,
    ariaOrientation: null,
    ariaOwns: Kt,
    ariaPlaceholder: null,
    ariaPosInSet: tt,
    ariaPressed: ue,
    ariaReadOnly: ue,
    ariaRelevant: null,
    ariaRequired: ue,
    ariaRoleDescription: Kt,
    ariaRowCount: tt,
    ariaRowIndex: tt,
    ariaRowSpan: tt,
    ariaSelected: ue,
    ariaSetSize: tt,
    ariaSort: null,
    ariaValueMax: tt,
    ariaValueMin: tt,
    ariaValueNow: tt,
    ariaValueText: null,
    role: null
  },
  transform(e, i) {
    return i === "role" ? i : "aria-" + i.slice(4).toLowerCase();
  }
});
function B1(e, i) {
  return i in e ? e[i] : i;
}
function U1(e, i) {
  return B1(e, i.toLowerCase());
}
const IC = dr({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: lr,
    acceptCharset: Kt,
    accessKey: Kt,
    action: null,
    allow: null,
    allowFullScreen: kt,
    allowPaymentRequest: kt,
    allowUserMedia: kt,
    alt: null,
    as: null,
    async: kt,
    autoCapitalize: null,
    autoComplete: Kt,
    autoFocus: kt,
    autoPlay: kt,
    blocking: Kt,
    capture: null,
    charSet: null,
    checked: kt,
    cite: null,
    className: Kt,
    cols: tt,
    colSpan: null,
    content: null,
    contentEditable: ue,
    controls: kt,
    controlsList: Kt,
    coords: tt | lr,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: kt,
    defer: kt,
    dir: null,
    dirName: null,
    disabled: kt,
    download: fh,
    draggable: ue,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: kt,
    formTarget: null,
    headers: Kt,
    height: tt,
    hidden: fh,
    high: tt,
    href: null,
    hrefLang: null,
    htmlFor: Kt,
    httpEquiv: Kt,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: kt,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: kt,
    itemId: null,
    itemProp: Kt,
    itemRef: Kt,
    itemScope: kt,
    itemType: Kt,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: kt,
    low: tt,
    manifest: null,
    max: null,
    maxLength: tt,
    media: null,
    method: null,
    min: null,
    minLength: tt,
    multiple: kt,
    muted: kt,
    name: null,
    nonce: null,
    noModule: kt,
    noValidate: kt,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: kt,
    optimum: tt,
    pattern: null,
    ping: Kt,
    placeholder: null,
    playsInline: kt,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: kt,
    referrerPolicy: null,
    rel: Kt,
    required: kt,
    reversed: kt,
    rows: tt,
    rowSpan: tt,
    sandbox: Kt,
    scope: null,
    scoped: kt,
    seamless: kt,
    selected: kt,
    shadowRootClonable: kt,
    shadowRootDelegatesFocus: kt,
    shadowRootMode: null,
    shape: null,
    size: tt,
    sizes: null,
    slot: null,
    span: tt,
    spellCheck: ue,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: tt,
    step: null,
    style: null,
    tabIndex: tt,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: kt,
    useMap: null,
    value: ue,
    width: tt,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Kt,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: tt,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: tt,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: kt,
    // Lists. Use CSS to reduce space between items instead
    declare: kt,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: tt,
    // `<img>` and `<object>`
    leftMargin: tt,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: tt,
    // `<body>`
    marginWidth: tt,
    // `<body>`
    noResize: kt,
    // `<frame>`
    noHref: kt,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: kt,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: kt,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: tt,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ue,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: tt,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: tt,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: kt,
    disableRemotePlayback: kt,
    prefix: null,
    property: null,
    results: tt,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: U1
}), JC = dr({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: tn,
    accentHeight: tt,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: tt,
    amplitude: tt,
    arabicForm: null,
    ascent: tt,
    attributeName: null,
    attributeType: null,
    azimuth: tt,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: tt,
    by: null,
    calcMode: null,
    capHeight: tt,
    className: Kt,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: tt,
    diffuseConstant: tt,
    direction: null,
    display: null,
    dur: null,
    divisor: tt,
    dominantBaseline: null,
    download: kt,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: tt,
    enableBackground: null,
    end: null,
    event: null,
    exponent: tt,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: tt,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: lr,
    g2: lr,
    glyphName: lr,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: tt,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: tt,
    horizOriginX: tt,
    horizOriginY: tt,
    id: null,
    ideographic: tt,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: tt,
    k: tt,
    k1: tt,
    k2: tt,
    k3: tt,
    k4: tt,
    kernelMatrix: tn,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: tt,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: tt,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: tt,
    overlineThickness: tt,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: tt,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Kt,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: tt,
    pointsAtY: tt,
    pointsAtZ: tt,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: tn,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: tn,
    rev: tn,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: tn,
    requiredFeatures: tn,
    requiredFonts: tn,
    requiredFormats: tn,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: tt,
    specularExponent: tt,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: tt,
    strikethroughThickness: tt,
    string: null,
    stroke: null,
    strokeDashArray: tn,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: tt,
    strokeOpacity: tt,
    strokeWidth: null,
    style: null,
    surfaceScale: tt,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: tn,
    tabIndex: tt,
    tableValues: null,
    target: null,
    targetX: tt,
    targetY: tt,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: tn,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: tt,
    underlineThickness: tt,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: tt,
    values: null,
    vAlphabetic: tt,
    vMathematical: tt,
    vectorEffect: null,
    vHanging: tt,
    vIdeographic: tt,
    version: null,
    vertAdvY: tt,
    vertOriginX: tt,
    vertOriginY: tt,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: tt,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: B1
}), j1 = dr({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, i) {
    return "xlink:" + i.slice(5).toLowerCase();
  }
}), H1 = dr({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: U1
}), q1 = dr({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, i) {
    return "xml:" + i.slice(3).toLowerCase();
  }
}), WC = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, $C = /[A-Z]/g, Qv = /-[a-z]/g, tM = /^data[-\w.:]+$/i;
function eM(e, i) {
  const r = ch(i);
  let l = i, s = Pe;
  if (r in e.normal)
    return e.property[e.normal[r]];
  if (r.length > 4 && r.slice(0, 4) === "data" && tM.test(i)) {
    if (i.charAt(4) === "-") {
      const u = i.slice(5).replace(Qv, iM);
      l = "data" + u.charAt(0).toUpperCase() + u.slice(1);
    } else {
      const u = i.slice(4);
      if (!Qv.test(u)) {
        let f = u.replace($C, nM);
        f.charAt(0) !== "-" && (f = "-" + f), i = "data" + f;
      }
    }
    s = Jh;
  }
  return new s(l, i);
}
function nM(e) {
  return "-" + e.toLowerCase();
}
function iM(e) {
  return e.charAt(1).toUpperCase();
}
const aM = L1([V1, IC, j1, H1, q1], "html"), Wh = L1([V1, JC, j1, H1, q1], "svg");
function rM(e) {
  return e.join(" ").trim();
}
var tr = {}, Cf, Kv;
function lM() {
  if (Kv) return Cf;
  Kv = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, i = /\n/g, r = /^\s*/, l = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, s = /^:\s*/, u = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, f = /^[;\s]*/, d = /^\s+|\s+$/g, m = `
`, p = "/", g = "*", y = "", b = "comment", x = "declaration";
  function A(D, M) {
    if (typeof D != "string")
      throw new TypeError("First argument must be a string");
    if (!D) return [];
    M = M || {};
    var H = 1, _ = 1;
    function F(lt) {
      var Z = lt.match(i);
      Z && (H += Z.length);
      var O = lt.lastIndexOf(m);
      _ = ~O ? lt.length - O : _ + lt.length;
    }
    function K() {
      var lt = { line: H, column: _ };
      return function(Z) {
        return Z.position = new B(lt), J(), Z;
      };
    }
    function B(lt) {
      this.start = lt, this.end = { line: H, column: _ }, this.source = M.source;
    }
    B.prototype.content = D;
    function I(lt) {
      var Z = new Error(
        M.source + ":" + H + ":" + _ + ": " + lt
      );
      if (Z.reason = lt, Z.filename = M.source, Z.line = H, Z.column = _, Z.source = D, !M.silent) throw Z;
    }
    function j(lt) {
      var Z = lt.exec(D);
      if (Z) {
        var O = Z[0];
        return F(O), D = D.slice(O.length), Z;
      }
    }
    function J() {
      j(r);
    }
    function et(lt) {
      var Z;
      for (lt = lt || []; Z = W(); )
        Z !== !1 && lt.push(Z);
      return lt;
    }
    function W() {
      var lt = K();
      if (!(p != D.charAt(0) || g != D.charAt(1))) {
        for (var Z = 2; y != D.charAt(Z) && (g != D.charAt(Z) || p != D.charAt(Z + 1)); )
          ++Z;
        if (Z += 2, y === D.charAt(Z - 1))
          return I("End of comment missing");
        var O = D.slice(2, Z - 2);
        return _ += 2, F(O), D = D.slice(Z), _ += 2, lt({
          type: b,
          comment: O
        });
      }
    }
    function $() {
      var lt = K(), Z = j(l);
      if (Z) {
        if (W(), !j(s)) return I("property missing ':'");
        var O = j(u), Q = lt({
          type: x,
          property: z(Z[0].replace(e, y)),
          value: O ? z(O[0].replace(e, y)) : y
        });
        return j(f), Q;
      }
    }
    function vt() {
      var lt = [];
      et(lt);
      for (var Z; Z = $(); )
        Z !== !1 && (lt.push(Z), et(lt));
      return lt;
    }
    return J(), vt();
  }
  function z(D) {
    return D ? D.replace(d, y) : y;
  }
  return Cf = A, Cf;
}
var Zv;
function oM() {
  if (Zv) return tr;
  Zv = 1;
  var e = tr && tr.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(tr, "__esModule", { value: !0 }), tr.default = r;
  const i = e(lM());
  function r(l, s) {
    let u = null;
    if (!l || typeof l != "string")
      return u;
    const f = (0, i.default)(l), d = typeof s == "function";
    return f.forEach((m) => {
      if (m.type !== "declaration")
        return;
      const { property: p, value: g } = m;
      d ? s(p, g, m) : g && (u = u || {}, u[p] = g);
    }), u;
  }
  return tr;
}
var fl = {}, Iv;
function sM() {
  if (Iv) return fl;
  Iv = 1, Object.defineProperty(fl, "__esModule", { value: !0 }), fl.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, i = /-([a-z])/g, r = /^[^-]+$/, l = /^-(webkit|moz|ms|o|khtml)-/, s = /^-(ms)-/, u = function(p) {
    return !p || r.test(p) || e.test(p);
  }, f = function(p, g) {
    return g.toUpperCase();
  }, d = function(p, g) {
    return "".concat(g, "-");
  }, m = function(p, g) {
    return g === void 0 && (g = {}), u(p) ? p : (p = p.toLowerCase(), g.reactCompat ? p = p.replace(s, d) : p = p.replace(l, d), p.replace(i, f));
  };
  return fl.camelCase = m, fl;
}
var hl, Jv;
function uM() {
  if (Jv) return hl;
  Jv = 1;
  var e = hl && hl.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  }, i = e(oM()), r = sM();
  function l(s, u) {
    var f = {};
    return !s || typeof s != "string" || (0, i.default)(s, function(d, m) {
      d && m && (f[(0, r.camelCase)(d, u)] = m);
    }), f;
  }
  return l.default = l, hl = l, hl;
}
var cM = uM();
const fM = /* @__PURE__ */ O0(cM), Y1 = G1("end"), $h = G1("start");
function G1(e) {
  return i;
  function i(r) {
    const l = r && r.position && r.position[e] || {};
    if (typeof l.line == "number" && l.line > 0 && typeof l.column == "number" && l.column > 0)
      return {
        line: l.line,
        column: l.column,
        offset: typeof l.offset == "number" && l.offset > -1 ? l.offset : void 0
      };
  }
}
function hM(e) {
  const i = $h(e), r = Y1(e);
  if (i && r)
    return { start: i, end: r };
}
function xl(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Wv(e.position) : "start" in e || "end" in e ? Wv(e) : "line" in e || "column" in e ? dh(e) : "";
}
function dh(e) {
  return $v(e && e.line) + ":" + $v(e && e.column);
}
function Wv(e) {
  return dh(e && e.start) + "-" + dh(e && e.end);
}
function $v(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ae extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(i, r, l) {
    super(), typeof r == "string" && (l = r, r = void 0);
    let s = "", u = {}, f = !1;
    if (r && ("line" in r && "column" in r ? u = { place: r } : "start" in r && "end" in r ? u = { place: r } : "type" in r ? u = {
      ancestors: [r],
      place: r.position
    } : u = { ...r }), typeof i == "string" ? s = i : !u.cause && i && (f = !0, s = i.message, u.cause = i), !u.ruleId && !u.source && typeof l == "string") {
      const m = l.indexOf(":");
      m === -1 ? u.ruleId = l : (u.source = l.slice(0, m), u.ruleId = l.slice(m + 1));
    }
    if (!u.place && u.ancestors && u.ancestors) {
      const m = u.ancestors[u.ancestors.length - 1];
      m && (u.place = m.position);
    }
    const d = u.place && "start" in u.place ? u.place.start : u.place;
    this.ancestors = u.ancestors || void 0, this.cause = u.cause || void 0, this.column = d ? d.column : void 0, this.fatal = void 0, this.file = "", this.message = s, this.line = d ? d.line : void 0, this.name = xl(u.place) || "1:1", this.place = u.place || void 0, this.reason = this.message, this.ruleId = u.ruleId || void 0, this.source = u.source || void 0, this.stack = f && u.cause && typeof u.cause.stack == "string" ? u.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ae.prototype.file = "";
Ae.prototype.name = "";
Ae.prototype.reason = "";
Ae.prototype.message = "";
Ae.prototype.stack = "";
Ae.prototype.column = void 0;
Ae.prototype.line = void 0;
Ae.prototype.ancestors = void 0;
Ae.prototype.cause = void 0;
Ae.prototype.fatal = void 0;
Ae.prototype.place = void 0;
Ae.prototype.ruleId = void 0;
Ae.prototype.source = void 0;
const td = {}.hasOwnProperty, dM = /* @__PURE__ */ new Map(), pM = /[A-Z]/g, mM = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), gM = /* @__PURE__ */ new Set(["td", "th"]), X1 = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function yM(e, i) {
  if (!i || i.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const r = i.filePath || void 0;
  let l;
  if (i.development) {
    if (typeof i.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    l = AM(r, i.jsxDEV);
  } else {
    if (typeof i.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof i.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    l = EM(r, i.jsx, i.jsxs);
  }
  const s = {
    Fragment: i.Fragment,
    ancestors: [],
    components: i.components || {},
    create: l,
    elementAttributeNameCase: i.elementAttributeNameCase || "react",
    evaluater: i.createEvaluater ? i.createEvaluater() : void 0,
    filePath: r,
    ignoreInvalidStyle: i.ignoreInvalidStyle || !1,
    passKeys: i.passKeys !== !1,
    passNode: i.passNode || !1,
    schema: i.space === "svg" ? Wh : aM,
    stylePropertyNameCase: i.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: i.tableCellAlignToStyle !== !1
  }, u = P1(s, e, void 0);
  return u && typeof u != "string" ? u : s.create(
    e,
    s.Fragment,
    { children: u || void 0 },
    void 0
  );
}
function P1(e, i, r) {
  if (i.type === "element")
    return vM(e, i, r);
  if (i.type === "mdxFlowExpression" || i.type === "mdxTextExpression")
    return bM(e, i);
  if (i.type === "mdxJsxFlowElement" || i.type === "mdxJsxTextElement")
    return wM(e, i, r);
  if (i.type === "mdxjsEsm")
    return xM(e, i);
  if (i.type === "root")
    return SM(e, i, r);
  if (i.type === "text")
    return TM(e, i);
}
function vM(e, i, r) {
  const l = e.schema;
  let s = l;
  i.tagName.toLowerCase() === "svg" && l.space === "html" && (s = Wh, e.schema = s), e.ancestors.push(i);
  const u = Q1(e, i.tagName, !1), f = kM(e, i);
  let d = nd(e, i);
  return mM.has(i.tagName) && (d = d.filter(function(m) {
    return typeof m == "string" ? !KC(m) : !0;
  })), F1(e, f, u, i), ed(f, d), e.ancestors.pop(), e.schema = l, e.create(i, u, f, r);
}
function bM(e, i) {
  if (i.data && i.data.estree && e.evaluater) {
    const l = i.data.estree.body[0];
    return l.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(l.expression);
  }
  Cl(e, i.position);
}
function xM(e, i) {
  if (i.data && i.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(i.data.estree)
    );
  Cl(e, i.position);
}
function wM(e, i, r) {
  const l = e.schema;
  let s = l;
  i.name === "svg" && l.space === "html" && (s = Wh, e.schema = s), e.ancestors.push(i);
  const u = i.name === null ? e.Fragment : Q1(e, i.name, !0), f = CM(e, i), d = nd(e, i);
  return F1(e, f, u, i), ed(f, d), e.ancestors.pop(), e.schema = l, e.create(i, u, f, r);
}
function SM(e, i, r) {
  const l = {};
  return ed(l, nd(e, i)), e.create(i, e.Fragment, l, r);
}
function TM(e, i) {
  return i.value;
}
function F1(e, i, r, l) {
  typeof r != "string" && r !== e.Fragment && e.passNode && (i.node = l);
}
function ed(e, i) {
  if (i.length > 0) {
    const r = i.length > 1 ? i : i[0];
    r && (e.children = r);
  }
}
function EM(e, i, r) {
  return l;
  function l(s, u, f, d) {
    const p = Array.isArray(f.children) ? r : i;
    return d ? p(u, f, d) : p(u, f);
  }
}
function AM(e, i) {
  return r;
  function r(l, s, u, f) {
    const d = Array.isArray(u.children), m = $h(l);
    return i(
      s,
      u,
      f,
      d,
      {
        columnNumber: m ? m.column - 1 : void 0,
        fileName: e,
        lineNumber: m ? m.line : void 0
      },
      void 0
    );
  }
}
function kM(e, i) {
  const r = {};
  let l, s;
  for (s in i.properties)
    if (s !== "children" && td.call(i.properties, s)) {
      const u = MM(e, s, i.properties[s]);
      if (u) {
        const [f, d] = u;
        e.tableCellAlignToStyle && f === "align" && typeof d == "string" && gM.has(i.tagName) ? l = d : r[f] = d;
      }
    }
  if (l) {
    const u = (
      /** @type {Style} */
      r.style || (r.style = {})
    );
    u[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = l;
  }
  return r;
}
function CM(e, i) {
  const r = {};
  for (const l of i.attributes)
    if (l.type === "mdxJsxExpressionAttribute")
      if (l.data && l.data.estree && e.evaluater) {
        const u = l.data.estree.body[0];
        u.type;
        const f = u.expression;
        f.type;
        const d = f.properties[0];
        d.type, Object.assign(
          r,
          e.evaluater.evaluateExpression(d.argument)
        );
      } else
        Cl(e, i.position);
    else {
      const s = l.name;
      let u;
      if (l.value && typeof l.value == "object")
        if (l.value.data && l.value.data.estree && e.evaluater) {
          const d = l.value.data.estree.body[0];
          d.type, u = e.evaluater.evaluateExpression(d.expression);
        } else
          Cl(e, i.position);
      else
        u = l.value === null ? !0 : l.value;
      r[s] = /** @type {Props[keyof Props]} */
      u;
    }
  return r;
}
function nd(e, i) {
  const r = [];
  let l = -1;
  const s = e.passKeys ? /* @__PURE__ */ new Map() : dM;
  for (; ++l < i.children.length; ) {
    const u = i.children[l];
    let f;
    if (e.passKeys) {
      const m = u.type === "element" ? u.tagName : u.type === "mdxJsxFlowElement" || u.type === "mdxJsxTextElement" ? u.name : void 0;
      if (m) {
        const p = s.get(m) || 0;
        f = m + "-" + p, s.set(m, p + 1);
      }
    }
    const d = P1(e, u, f);
    d !== void 0 && r.push(d);
  }
  return r;
}
function MM(e, i, r) {
  const l = eM(e.schema, i);
  if (!(r == null || typeof r == "number" && Number.isNaN(r))) {
    if (Array.isArray(r) && (r = l.commaSeparated ? GC(r) : rM(r)), l.property === "style") {
      let s = typeof r == "object" ? r : zM(e, String(r));
      return e.stylePropertyNameCase === "css" && (s = DM(s)), ["style", s];
    }
    return [
      e.elementAttributeNameCase === "react" && l.space ? WC[l.property] || l.property : l.attribute,
      r
    ];
  }
}
function zM(e, i) {
  try {
    return fM(i, { reactCompat: !0 });
  } catch (r) {
    if (e.ignoreInvalidStyle)
      return {};
    const l = (
      /** @type {Error} */
      r
    ), s = new Ae("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: l,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw s.file = e.filePath || void 0, s.url = X1 + "#cannot-parse-style-attribute", s;
  }
}
function Q1(e, i, r) {
  let l;
  if (!r)
    l = { type: "Literal", value: i };
  else if (i.includes(".")) {
    const s = i.split(".");
    let u = -1, f;
    for (; ++u < s.length; ) {
      const d = Xv(s[u]) ? { type: "Identifier", name: s[u] } : { type: "Literal", value: s[u] };
      f = f ? {
        type: "MemberExpression",
        object: f,
        property: d,
        computed: !!(u && d.type === "Literal"),
        optional: !1
      } : d;
    }
    l = f;
  } else
    l = Xv(i) && !/^[a-z]/.test(i) ? { type: "Identifier", name: i } : { type: "Literal", value: i };
  if (l.type === "Literal") {
    const s = (
      /** @type {string | number} */
      l.value
    );
    return td.call(e.components, s) ? e.components[s] : s;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(l);
  Cl(e);
}
function Cl(e, i) {
  const r = new Ae(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: i,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw r.file = e.filePath || void 0, r.url = X1 + "#cannot-handle-mdx-estrees-without-createevaluater", r;
}
function DM(e) {
  const i = {};
  let r;
  for (r in e)
    td.call(e, r) && (i[RM(r)] = e[r]);
  return i;
}
function RM(e) {
  let i = e.replace(pM, OM);
  return i.slice(0, 3) === "ms-" && (i = "-" + i), i;
}
function OM(e) {
  return "-" + e.toLowerCase();
}
const Mf = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, _M = {};
function NM(e, i) {
  const r = _M, l = typeof r.includeImageAlt == "boolean" ? r.includeImageAlt : !0, s = typeof r.includeHtml == "boolean" ? r.includeHtml : !0;
  return K1(e, l, s);
}
function K1(e, i, r) {
  if (LM(e)) {
    if ("value" in e)
      return e.type === "html" && !r ? "" : e.value;
    if (i && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return t0(e.children, i, r);
  }
  return Array.isArray(e) ? t0(e, i, r) : "";
}
function t0(e, i, r) {
  const l = [];
  let s = -1;
  for (; ++s < e.length; )
    l[s] = K1(e[s], i, r);
  return l.join("");
}
function LM(e) {
  return !!(e && typeof e == "object");
}
const e0 = document.createElement("i");
function id(e) {
  const i = "&" + e + ";";
  e0.innerHTML = i;
  const r = e0.textContent;
  return r.charCodeAt(r.length - 1) === 59 && e !== "semi" || r === i ? !1 : r;
}
function Nn(e, i, r, l) {
  const s = e.length;
  let u = 0, f;
  if (i < 0 ? i = -i > s ? 0 : s + i : i = i > s ? s : i, r = r > 0 ? r : 0, l.length < 1e4)
    f = Array.from(l), f.unshift(i, r), e.splice(...f);
  else
    for (r && e.splice(i, r); u < l.length; )
      f = l.slice(u, u + 1e4), f.unshift(i, 0), e.splice(...f), u += 1e4, i += 1e4;
}
function dn(e, i) {
  return e.length > 0 ? (Nn(e, e.length, 0, i), e) : i;
}
const n0 = {}.hasOwnProperty;
function VM(e) {
  const i = {};
  let r = -1;
  for (; ++r < e.length; )
    BM(i, e[r]);
  return i;
}
function BM(e, i) {
  let r;
  for (r in i) {
    const s = (n0.call(e, r) ? e[r] : void 0) || (e[r] = {}), u = i[r];
    let f;
    if (u)
      for (f in u) {
        n0.call(s, f) || (s[f] = []);
        const d = u[f];
        UM(
          // @ts-expect-error Looks like a list.
          s[f],
          Array.isArray(d) ? d : d ? [d] : []
        );
      }
  }
}
function UM(e, i) {
  let r = -1;
  const l = [];
  for (; ++r < i.length; )
    (i[r].add === "after" ? e : l).push(i[r]);
  Nn(e, 0, 0, l);
}
function Z1(e, i) {
  const r = Number.parseInt(e, i);
  return (
    // C0 except for HT, LF, FF, CR, space.
    r < 9 || r === 11 || r > 13 && r < 32 || // Control character (DEL) of C0, and C1 controls.
    r > 126 && r < 160 || // Lone high surrogates and low surrogates.
    r > 55295 && r < 57344 || // Noncharacters.
    r > 64975 && r < 65008 || /* eslint-disable no-bitwise */
    (r & 65535) === 65535 || (r & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    r > 1114111 ? "�" : String.fromCodePoint(r)
  );
}
function or(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Rn = Bi(/[A-Za-z]/), en = Bi(/[\dA-Za-z]/), jM = Bi(/[#-'*+\--9=?A-Z^-~]/);
function ph(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const mh = Bi(/\d/), HM = Bi(/[\dA-Fa-f]/), qM = Bi(/[!-/:-@[-`{-~]/);
function xt(e) {
  return e !== null && e < -2;
}
function Xe(e) {
  return e !== null && (e < 0 || e === 32);
}
function Bt(e) {
  return e === -2 || e === -1 || e === 32;
}
const YM = Bi(new RegExp("\\p{P}|\\p{S}", "u")), GM = Bi(/\s/);
function Bi(e) {
  return i;
  function i(r) {
    return r !== null && r > -1 && e.test(String.fromCharCode(r));
  }
}
function pr(e) {
  const i = [];
  let r = -1, l = 0, s = 0;
  for (; ++r < e.length; ) {
    const u = e.charCodeAt(r);
    let f = "";
    if (u === 37 && en(e.charCodeAt(r + 1)) && en(e.charCodeAt(r + 2)))
      s = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) || (f = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const d = e.charCodeAt(r + 1);
      u < 56320 && d > 56319 && d < 57344 ? (f = String.fromCharCode(u, d), s = 1) : f = "�";
    } else
      f = String.fromCharCode(u);
    f && (i.push(e.slice(l, r), encodeURIComponent(f)), l = r + s + 1, f = ""), s && (r += s, s = 0);
  }
  return i.join("") + e.slice(l);
}
function Zt(e, i, r, l) {
  const s = l ? l - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return f;
  function f(m) {
    return Bt(m) ? (e.enter(r), d(m)) : i(m);
  }
  function d(m) {
    return Bt(m) && u++ < s ? (e.consume(m), d) : (e.exit(r), i(m));
  }
}
const XM = {
  tokenize: PM
};
function PM(e) {
  const i = e.attempt(this.parser.constructs.contentInitial, l, s);
  let r;
  return i;
  function l(d) {
    if (d === null) {
      e.consume(d);
      return;
    }
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), Zt(e, i, "linePrefix");
  }
  function s(d) {
    return e.enter("paragraph"), u(d);
  }
  function u(d) {
    const m = e.enter("chunkText", {
      contentType: "text",
      previous: r
    });
    return r && (r.next = m), r = m, f(d);
  }
  function f(d) {
    if (d === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(d);
      return;
    }
    return xt(d) ? (e.consume(d), e.exit("chunkText"), u) : (e.consume(d), f);
  }
}
const FM = {
  tokenize: QM
}, i0 = {
  tokenize: KM
};
function QM(e) {
  const i = this, r = [];
  let l = 0, s, u, f;
  return d;
  function d(_) {
    if (l < r.length) {
      const F = r[l];
      return i.containerState = F[1], e.attempt(F[0].continuation, m, p)(_);
    }
    return p(_);
  }
  function m(_) {
    if (l++, i.containerState._closeFlow) {
      i.containerState._closeFlow = void 0, s && H();
      const F = i.events.length;
      let K = F, B;
      for (; K--; )
        if (i.events[K][0] === "exit" && i.events[K][1].type === "chunkFlow") {
          B = i.events[K][1].end;
          break;
        }
      M(l);
      let I = F;
      for (; I < i.events.length; )
        i.events[I][1].end = {
          ...B
        }, I++;
      return Nn(i.events, K + 1, 0, i.events.slice(F)), i.events.length = I, p(_);
    }
    return d(_);
  }
  function p(_) {
    if (l === r.length) {
      if (!s)
        return b(_);
      if (s.currentConstruct && s.currentConstruct.concrete)
        return A(_);
      i.interrupt = !!(s.currentConstruct && !s._gfmTableDynamicInterruptHack);
    }
    return i.containerState = {}, e.check(i0, g, y)(_);
  }
  function g(_) {
    return s && H(), M(l), b(_);
  }
  function y(_) {
    return i.parser.lazy[i.now().line] = l !== r.length, f = i.now().offset, A(_);
  }
  function b(_) {
    return i.containerState = {}, e.attempt(i0, x, A)(_);
  }
  function x(_) {
    return l++, r.push([i.currentConstruct, i.containerState]), b(_);
  }
  function A(_) {
    if (_ === null) {
      s && H(), M(0), e.consume(_);
      return;
    }
    return s = s || i.parser.flow(i.now()), e.enter("chunkFlow", {
      _tokenizer: s,
      contentType: "flow",
      previous: u
    }), z(_);
  }
  function z(_) {
    if (_ === null) {
      D(e.exit("chunkFlow"), !0), M(0), e.consume(_);
      return;
    }
    return xt(_) ? (e.consume(_), D(e.exit("chunkFlow")), l = 0, i.interrupt = void 0, d) : (e.consume(_), z);
  }
  function D(_, F) {
    const K = i.sliceStream(_);
    if (F && K.push(null), _.previous = u, u && (u.next = _), u = _, s.defineSkip(_.start), s.write(K), i.parser.lazy[_.start.line]) {
      let B = s.events.length;
      for (; B--; )
        if (
          // The token starts before the line ending…
          s.events[B][1].start.offset < f && // …and either is not ended yet…
          (!s.events[B][1].end || // …or ends after it.
          s.events[B][1].end.offset > f)
        )
          return;
      const I = i.events.length;
      let j = I, J, et;
      for (; j--; )
        if (i.events[j][0] === "exit" && i.events[j][1].type === "chunkFlow") {
          if (J) {
            et = i.events[j][1].end;
            break;
          }
          J = !0;
        }
      for (M(l), B = I; B < i.events.length; )
        i.events[B][1].end = {
          ...et
        }, B++;
      Nn(i.events, j + 1, 0, i.events.slice(I)), i.events.length = B;
    }
  }
  function M(_) {
    let F = r.length;
    for (; F-- > _; ) {
      const K = r[F];
      i.containerState = K[1], K[0].exit.call(i, e);
    }
    r.length = _;
  }
  function H() {
    s.write([null]), u = void 0, s = void 0, i.containerState._closeFlow = void 0;
  }
}
function KM(e, i, r) {
  return Zt(e, e.attempt(this.parser.constructs.document, i, r), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function a0(e) {
  if (e === null || Xe(e) || GM(e))
    return 1;
  if (YM(e))
    return 2;
}
function ad(e, i, r) {
  const l = [];
  let s = -1;
  for (; ++s < e.length; ) {
    const u = e[s].resolveAll;
    u && !l.includes(u) && (i = u(i, r), l.push(u));
  }
  return i;
}
const gh = {
  name: "attention",
  resolveAll: ZM,
  tokenize: IM
};
function ZM(e, i) {
  let r = -1, l, s, u, f, d, m, p, g;
  for (; ++r < e.length; )
    if (e[r][0] === "enter" && e[r][1].type === "attentionSequence" && e[r][1]._close) {
      for (l = r; l--; )
        if (e[l][0] === "exit" && e[l][1].type === "attentionSequence" && e[l][1]._open && // If the markers are the same:
        i.sliceSerialize(e[l][1]).charCodeAt(0) === i.sliceSerialize(e[r][1]).charCodeAt(0)) {
          if ((e[l][1]._close || e[r][1]._open) && (e[r][1].end.offset - e[r][1].start.offset) % 3 && !((e[l][1].end.offset - e[l][1].start.offset + e[r][1].end.offset - e[r][1].start.offset) % 3))
            continue;
          m = e[l][1].end.offset - e[l][1].start.offset > 1 && e[r][1].end.offset - e[r][1].start.offset > 1 ? 2 : 1;
          const y = {
            ...e[l][1].end
          }, b = {
            ...e[r][1].start
          };
          r0(y, -m), r0(b, m), f = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: y,
            end: {
              ...e[l][1].end
            }
          }, d = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[r][1].start
            },
            end: b
          }, u = {
            type: m > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[l][1].end
            },
            end: {
              ...e[r][1].start
            }
          }, s = {
            type: m > 1 ? "strong" : "emphasis",
            start: {
              ...f.start
            },
            end: {
              ...d.end
            }
          }, e[l][1].end = {
            ...f.start
          }, e[r][1].start = {
            ...d.end
          }, p = [], e[l][1].end.offset - e[l][1].start.offset && (p = dn(p, [["enter", e[l][1], i], ["exit", e[l][1], i]])), p = dn(p, [["enter", s, i], ["enter", f, i], ["exit", f, i], ["enter", u, i]]), p = dn(p, ad(i.parser.constructs.insideSpan.null, e.slice(l + 1, r), i)), p = dn(p, [["exit", u, i], ["enter", d, i], ["exit", d, i], ["exit", s, i]]), e[r][1].end.offset - e[r][1].start.offset ? (g = 2, p = dn(p, [["enter", e[r][1], i], ["exit", e[r][1], i]])) : g = 0, Nn(e, l - 1, r - l + 3, p), r = l + p.length - g - 2;
          break;
        }
    }
  for (r = -1; ++r < e.length; )
    e[r][1].type === "attentionSequence" && (e[r][1].type = "data");
  return e;
}
function IM(e, i) {
  const r = this.parser.constructs.attentionMarkers.null, l = this.previous, s = a0(l);
  let u;
  return f;
  function f(m) {
    return u = m, e.enter("attentionSequence"), d(m);
  }
  function d(m) {
    if (m === u)
      return e.consume(m), d;
    const p = e.exit("attentionSequence"), g = a0(m), y = !g || g === 2 && s || r.includes(m), b = !s || s === 2 && g || r.includes(l);
    return p._open = !!(u === 42 ? y : y && (s || !b)), p._close = !!(u === 42 ? b : b && (g || !y)), i(m);
  }
}
function r0(e, i) {
  e.column += i, e.offset += i, e._bufferIndex += i;
}
const JM = {
  name: "autolink",
  tokenize: WM
};
function WM(e, i, r) {
  let l = 0;
  return s;
  function s(x) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(x), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), u;
  }
  function u(x) {
    return Rn(x) ? (e.consume(x), f) : x === 64 ? r(x) : p(x);
  }
  function f(x) {
    return x === 43 || x === 45 || x === 46 || en(x) ? (l = 1, d(x)) : p(x);
  }
  function d(x) {
    return x === 58 ? (e.consume(x), l = 0, m) : (x === 43 || x === 45 || x === 46 || en(x)) && l++ < 32 ? (e.consume(x), d) : (l = 0, p(x));
  }
  function m(x) {
    return x === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(x), e.exit("autolinkMarker"), e.exit("autolink"), i) : x === null || x === 32 || x === 60 || ph(x) ? r(x) : (e.consume(x), m);
  }
  function p(x) {
    return x === 64 ? (e.consume(x), g) : jM(x) ? (e.consume(x), p) : r(x);
  }
  function g(x) {
    return en(x) ? y(x) : r(x);
  }
  function y(x) {
    return x === 46 ? (e.consume(x), l = 0, g) : x === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(x), e.exit("autolinkMarker"), e.exit("autolink"), i) : b(x);
  }
  function b(x) {
    if ((x === 45 || en(x)) && l++ < 63) {
      const A = x === 45 ? b : y;
      return e.consume(x), A;
    }
    return r(x);
  }
}
const Us = {
  partial: !0,
  tokenize: $M
};
function $M(e, i, r) {
  return l;
  function l(u) {
    return Bt(u) ? Zt(e, s, "linePrefix")(u) : s(u);
  }
  function s(u) {
    return u === null || xt(u) ? i(u) : r(u);
  }
}
const I1 = {
  continuation: {
    tokenize: ez
  },
  exit: nz,
  name: "blockQuote",
  tokenize: tz
};
function tz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    if (f === 62) {
      const d = l.containerState;
      return d.open || (e.enter("blockQuote", {
        _container: !0
      }), d.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(f), e.exit("blockQuoteMarker"), u;
    }
    return r(f);
  }
  function u(f) {
    return Bt(f) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(f), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), i) : (e.exit("blockQuotePrefix"), i(f));
  }
}
function ez(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return Bt(f) ? Zt(e, u, "linePrefix", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : u(f);
  }
  function u(f) {
    return e.attempt(I1, i, r)(f);
  }
}
function nz(e) {
  e.exit("blockQuote");
}
const J1 = {
  name: "characterEscape",
  tokenize: iz
};
function iz(e, i, r) {
  return l;
  function l(u) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(u), e.exit("escapeMarker"), s;
  }
  function s(u) {
    return qM(u) ? (e.enter("characterEscapeValue"), e.consume(u), e.exit("characterEscapeValue"), e.exit("characterEscape"), i) : r(u);
  }
}
const W1 = {
  name: "characterReference",
  tokenize: az
};
function az(e, i, r) {
  const l = this;
  let s = 0, u, f;
  return d;
  function d(y) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(y), e.exit("characterReferenceMarker"), m;
  }
  function m(y) {
    return y === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(y), e.exit("characterReferenceMarkerNumeric"), p) : (e.enter("characterReferenceValue"), u = 31, f = en, g(y));
  }
  function p(y) {
    return y === 88 || y === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(y), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), u = 6, f = HM, g) : (e.enter("characterReferenceValue"), u = 7, f = mh, g(y));
  }
  function g(y) {
    if (y === 59 && s) {
      const b = e.exit("characterReferenceValue");
      return f === en && !id(l.sliceSerialize(b)) ? r(y) : (e.enter("characterReferenceMarker"), e.consume(y), e.exit("characterReferenceMarker"), e.exit("characterReference"), i);
    }
    return f(y) && s++ < u ? (e.consume(y), g) : r(y);
  }
}
const l0 = {
  partial: !0,
  tokenize: lz
}, o0 = {
  concrete: !0,
  name: "codeFenced",
  tokenize: rz
};
function rz(e, i, r) {
  const l = this, s = {
    partial: !0,
    tokenize: K
  };
  let u = 0, f = 0, d;
  return m;
  function m(B) {
    return p(B);
  }
  function p(B) {
    const I = l.events[l.events.length - 1];
    return u = I && I[1].type === "linePrefix" ? I[2].sliceSerialize(I[1], !0).length : 0, d = B, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), g(B);
  }
  function g(B) {
    return B === d ? (f++, e.consume(B), g) : f < 3 ? r(B) : (e.exit("codeFencedFenceSequence"), Bt(B) ? Zt(e, y, "whitespace")(B) : y(B));
  }
  function y(B) {
    return B === null || xt(B) ? (e.exit("codeFencedFence"), l.interrupt ? i(B) : e.check(l0, z, F)(B)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), b(B));
  }
  function b(B) {
    return B === null || xt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), y(B)) : Bt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Zt(e, x, "whitespace")(B)) : B === 96 && B === d ? r(B) : (e.consume(B), b);
  }
  function x(B) {
    return B === null || xt(B) ? y(B) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), A(B));
  }
  function A(B) {
    return B === null || xt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), y(B)) : B === 96 && B === d ? r(B) : (e.consume(B), A);
  }
  function z(B) {
    return e.attempt(s, F, D)(B);
  }
  function D(B) {
    return e.enter("lineEnding"), e.consume(B), e.exit("lineEnding"), M;
  }
  function M(B) {
    return u > 0 && Bt(B) ? Zt(e, H, "linePrefix", u + 1)(B) : H(B);
  }
  function H(B) {
    return B === null || xt(B) ? e.check(l0, z, F)(B) : (e.enter("codeFlowValue"), _(B));
  }
  function _(B) {
    return B === null || xt(B) ? (e.exit("codeFlowValue"), H(B)) : (e.consume(B), _);
  }
  function F(B) {
    return e.exit("codeFenced"), i(B);
  }
  function K(B, I, j) {
    let J = 0;
    return et;
    function et(Z) {
      return B.enter("lineEnding"), B.consume(Z), B.exit("lineEnding"), W;
    }
    function W(Z) {
      return B.enter("codeFencedFence"), Bt(Z) ? Zt(B, $, "linePrefix", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(Z) : $(Z);
    }
    function $(Z) {
      return Z === d ? (B.enter("codeFencedFenceSequence"), vt(Z)) : j(Z);
    }
    function vt(Z) {
      return Z === d ? (J++, B.consume(Z), vt) : J >= f ? (B.exit("codeFencedFenceSequence"), Bt(Z) ? Zt(B, lt, "whitespace")(Z) : lt(Z)) : j(Z);
    }
    function lt(Z) {
      return Z === null || xt(Z) ? (B.exit("codeFencedFence"), I(Z)) : j(Z);
    }
  }
}
function lz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return f === null ? r(f) : (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u);
  }
  function u(f) {
    return l.parser.lazy[l.now().line] ? r(f) : i(f);
  }
}
const zf = {
  name: "codeIndented",
  tokenize: sz
}, oz = {
  partial: !0,
  tokenize: uz
};
function sz(e, i, r) {
  const l = this;
  return s;
  function s(p) {
    return e.enter("codeIndented"), Zt(e, u, "linePrefix", 5)(p);
  }
  function u(p) {
    const g = l.events[l.events.length - 1];
    return g && g[1].type === "linePrefix" && g[2].sliceSerialize(g[1], !0).length >= 4 ? f(p) : r(p);
  }
  function f(p) {
    return p === null ? m(p) : xt(p) ? e.attempt(oz, f, m)(p) : (e.enter("codeFlowValue"), d(p));
  }
  function d(p) {
    return p === null || xt(p) ? (e.exit("codeFlowValue"), f(p)) : (e.consume(p), d);
  }
  function m(p) {
    return e.exit("codeIndented"), i(p);
  }
}
function uz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return l.parser.lazy[l.now().line] ? r(f) : xt(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : Zt(e, u, "linePrefix", 5)(f);
  }
  function u(f) {
    const d = l.events[l.events.length - 1];
    return d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], !0).length >= 4 ? i(f) : xt(f) ? s(f) : r(f);
  }
}
const cz = {
  name: "codeText",
  previous: hz,
  resolve: fz,
  tokenize: dz
};
function fz(e) {
  let i = e.length - 4, r = 3, l, s;
  if ((e[r][1].type === "lineEnding" || e[r][1].type === "space") && (e[i][1].type === "lineEnding" || e[i][1].type === "space")) {
    for (l = r; ++l < i; )
      if (e[l][1].type === "codeTextData") {
        e[r][1].type = "codeTextPadding", e[i][1].type = "codeTextPadding", r += 2, i -= 2;
        break;
      }
  }
  for (l = r - 1, i++; ++l <= i; )
    s === void 0 ? l !== i && e[l][1].type !== "lineEnding" && (s = l) : (l === i || e[l][1].type === "lineEnding") && (e[s][1].type = "codeTextData", l !== s + 2 && (e[s][1].end = e[l - 1][1].end, e.splice(s + 2, l - s - 2), i -= l - s - 2, l = s + 2), s = void 0);
  return e;
}
function hz(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function dz(e, i, r) {
  let l = 0, s, u;
  return f;
  function f(y) {
    return e.enter("codeText"), e.enter("codeTextSequence"), d(y);
  }
  function d(y) {
    return y === 96 ? (e.consume(y), l++, d) : (e.exit("codeTextSequence"), m(y));
  }
  function m(y) {
    return y === null ? r(y) : y === 32 ? (e.enter("space"), e.consume(y), e.exit("space"), m) : y === 96 ? (u = e.enter("codeTextSequence"), s = 0, g(y)) : xt(y) ? (e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), m) : (e.enter("codeTextData"), p(y));
  }
  function p(y) {
    return y === null || y === 32 || y === 96 || xt(y) ? (e.exit("codeTextData"), m(y)) : (e.consume(y), p);
  }
  function g(y) {
    return y === 96 ? (e.consume(y), s++, g) : s === l ? (e.exit("codeTextSequence"), e.exit("codeText"), i(y)) : (u.type = "codeTextData", p(y));
  }
}
class pz {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(i) {
    this.left = i ? [...i] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(i) {
    if (i < 0 || i >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + i + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return i < this.left.length ? this.left[i] : this.right[this.right.length - i + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(i, r) {
    const l = r ?? Number.POSITIVE_INFINITY;
    return l < this.left.length ? this.left.slice(i, l) : i > this.left.length ? this.right.slice(this.right.length - l + this.left.length, this.right.length - i + this.left.length).reverse() : this.left.slice(i).concat(this.right.slice(this.right.length - l + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(i, r, l) {
    const s = r || 0;
    this.setCursor(Math.trunc(i));
    const u = this.right.splice(this.right.length - s, Number.POSITIVE_INFINITY);
    return l && dl(this.left, l), u.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(i) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(i);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(i) {
    this.setCursor(Number.POSITIVE_INFINITY), dl(this.left, i);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(i) {
    this.setCursor(0), this.right.push(i);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(i) {
    this.setCursor(0), dl(this.right, i.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(i) {
    if (!(i === this.left.length || i > this.left.length && this.right.length === 0 || i < 0 && this.left.length === 0))
      if (i < this.left.length) {
        const r = this.left.splice(i, Number.POSITIVE_INFINITY);
        dl(this.right, r.reverse());
      } else {
        const r = this.right.splice(this.left.length + this.right.length - i, Number.POSITIVE_INFINITY);
        dl(this.left, r.reverse());
      }
  }
}
function dl(e, i) {
  let r = 0;
  if (i.length < 1e4)
    e.push(...i);
  else
    for (; r < i.length; )
      e.push(...i.slice(r, r + 1e4)), r += 1e4;
}
function $1(e) {
  const i = {};
  let r = -1, l, s, u, f, d, m, p;
  const g = new pz(e);
  for (; ++r < g.length; ) {
    for (; r in i; )
      r = i[r];
    if (l = g.get(r), r && l[1].type === "chunkFlow" && g.get(r - 1)[1].type === "listItemPrefix" && (m = l[1]._tokenizer.events, u = 0, u < m.length && m[u][1].type === "lineEndingBlank" && (u += 2), u < m.length && m[u][1].type === "content"))
      for (; ++u < m.length && m[u][1].type !== "content"; )
        m[u][1].type === "chunkText" && (m[u][1]._isInFirstContentOfListItem = !0, u++);
    if (l[0] === "enter")
      l[1].contentType && (Object.assign(i, mz(g, r)), r = i[r], p = !0);
    else if (l[1]._container) {
      for (u = r, s = void 0; u--; )
        if (f = g.get(u), f[1].type === "lineEnding" || f[1].type === "lineEndingBlank")
          f[0] === "enter" && (s && (g.get(s)[1].type = "lineEndingBlank"), f[1].type = "lineEnding", s = u);
        else if (!(f[1].type === "linePrefix" || f[1].type === "listItemIndent")) break;
      s && (l[1].end = {
        ...g.get(s)[1].start
      }, d = g.slice(s, r), d.unshift(l), g.splice(s, r - s + 1, d));
    }
  }
  return Nn(e, 0, Number.POSITIVE_INFINITY, g.slice(0)), !p;
}
function mz(e, i) {
  const r = e.get(i)[1], l = e.get(i)[2];
  let s = i - 1;
  const u = [];
  let f = r._tokenizer;
  f || (f = l.parser[r.contentType](r.start), r._contentTypeTextTrailing && (f._contentTypeTextTrailing = !0));
  const d = f.events, m = [], p = {};
  let g, y, b = -1, x = r, A = 0, z = 0;
  const D = [z];
  for (; x; ) {
    for (; e.get(++s)[1] !== x; )
      ;
    u.push(s), x._tokenizer || (g = l.sliceStream(x), x.next || g.push(null), y && f.defineSkip(x.start), x._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = !0), f.write(g), x._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = void 0)), y = x, x = x.next;
  }
  for (x = r; ++b < d.length; )
    // Find a void token that includes a break.
    d[b][0] === "exit" && d[b - 1][0] === "enter" && d[b][1].type === d[b - 1][1].type && d[b][1].start.line !== d[b][1].end.line && (z = b + 1, D.push(z), x._tokenizer = void 0, x.previous = void 0, x = x.next);
  for (f.events = [], x ? (x._tokenizer = void 0, x.previous = void 0) : D.pop(), b = D.length; b--; ) {
    const M = d.slice(D[b], D[b + 1]), H = u.pop();
    m.push([H, H + M.length - 1]), e.splice(H, 2, M);
  }
  for (m.reverse(), b = -1; ++b < m.length; )
    p[A + m[b][0]] = A + m[b][1], A += m[b][1] - m[b][0] - 1;
  return p;
}
const gz = {
  resolve: vz,
  tokenize: bz
}, yz = {
  partial: !0,
  tokenize: xz
};
function vz(e) {
  return $1(e), e;
}
function bz(e, i) {
  let r;
  return l;
  function l(d) {
    return e.enter("content"), r = e.enter("chunkContent", {
      contentType: "content"
    }), s(d);
  }
  function s(d) {
    return d === null ? u(d) : xt(d) ? e.check(yz, f, u)(d) : (e.consume(d), s);
  }
  function u(d) {
    return e.exit("chunkContent"), e.exit("content"), i(d);
  }
  function f(d) {
    return e.consume(d), e.exit("chunkContent"), r.next = e.enter("chunkContent", {
      contentType: "content",
      previous: r
    }), r = r.next, s;
  }
}
function xz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), Zt(e, u, "linePrefix");
  }
  function u(f) {
    if (f === null || xt(f))
      return r(f);
    const d = l.events[l.events.length - 1];
    return !l.parser.constructs.disable.null.includes("codeIndented") && d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], !0).length >= 4 ? i(f) : e.interrupt(l.parser.constructs.flow, r, i)(f);
  }
}
function tx(e, i, r, l, s, u, f, d, m) {
  const p = m || Number.POSITIVE_INFINITY;
  let g = 0;
  return y;
  function y(M) {
    return M === 60 ? (e.enter(l), e.enter(s), e.enter(u), e.consume(M), e.exit(u), b) : M === null || M === 32 || M === 41 || ph(M) ? r(M) : (e.enter(l), e.enter(f), e.enter(d), e.enter("chunkString", {
      contentType: "string"
    }), z(M));
  }
  function b(M) {
    return M === 62 ? (e.enter(u), e.consume(M), e.exit(u), e.exit(s), e.exit(l), i) : (e.enter(d), e.enter("chunkString", {
      contentType: "string"
    }), x(M));
  }
  function x(M) {
    return M === 62 ? (e.exit("chunkString"), e.exit(d), b(M)) : M === null || M === 60 || xt(M) ? r(M) : (e.consume(M), M === 92 ? A : x);
  }
  function A(M) {
    return M === 60 || M === 62 || M === 92 ? (e.consume(M), x) : x(M);
  }
  function z(M) {
    return !g && (M === null || M === 41 || Xe(M)) ? (e.exit("chunkString"), e.exit(d), e.exit(f), e.exit(l), i(M)) : g < p && M === 40 ? (e.consume(M), g++, z) : M === 41 ? (e.consume(M), g--, z) : M === null || M === 32 || M === 40 || ph(M) ? r(M) : (e.consume(M), M === 92 ? D : z);
  }
  function D(M) {
    return M === 40 || M === 41 || M === 92 ? (e.consume(M), z) : z(M);
  }
}
function ex(e, i, r, l, s, u) {
  const f = this;
  let d = 0, m;
  return p;
  function p(x) {
    return e.enter(l), e.enter(s), e.consume(x), e.exit(s), e.enter(u), g;
  }
  function g(x) {
    return d > 999 || x === null || x === 91 || x === 93 && !m || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    x === 94 && !d && "_hiddenFootnoteSupport" in f.parser.constructs ? r(x) : x === 93 ? (e.exit(u), e.enter(s), e.consume(x), e.exit(s), e.exit(l), i) : xt(x) ? (e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), g) : (e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || x === 91 || x === 93 || xt(x) || d++ > 999 ? (e.exit("chunkString"), g(x)) : (e.consume(x), m || (m = !Bt(x)), x === 92 ? b : y);
  }
  function b(x) {
    return x === 91 || x === 92 || x === 93 ? (e.consume(x), d++, y) : y(x);
  }
}
function nx(e, i, r, l, s, u) {
  let f;
  return d;
  function d(b) {
    return b === 34 || b === 39 || b === 40 ? (e.enter(l), e.enter(s), e.consume(b), e.exit(s), f = b === 40 ? 41 : b, m) : r(b);
  }
  function m(b) {
    return b === f ? (e.enter(s), e.consume(b), e.exit(s), e.exit(l), i) : (e.enter(u), p(b));
  }
  function p(b) {
    return b === f ? (e.exit(u), m(f)) : b === null ? r(b) : xt(b) ? (e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), Zt(e, p, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), g(b));
  }
  function g(b) {
    return b === f || b === null || xt(b) ? (e.exit("chunkString"), p(b)) : (e.consume(b), b === 92 ? y : g);
  }
  function y(b) {
    return b === f || b === 92 ? (e.consume(b), g) : g(b);
  }
}
function wl(e, i) {
  let r;
  return l;
  function l(s) {
    return xt(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), r = !0, l) : Bt(s) ? Zt(e, l, r ? "linePrefix" : "lineSuffix")(s) : i(s);
  }
}
const wz = {
  name: "definition",
  tokenize: Tz
}, Sz = {
  partial: !0,
  tokenize: Ez
};
function Tz(e, i, r) {
  const l = this;
  let s;
  return u;
  function u(x) {
    return e.enter("definition"), f(x);
  }
  function f(x) {
    return ex.call(
      l,
      e,
      d,
      // Note: we don’t need to reset the way `markdown-rs` does.
      r,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(x);
  }
  function d(x) {
    return s = or(l.sliceSerialize(l.events[l.events.length - 1][1]).slice(1, -1)), x === 58 ? (e.enter("definitionMarker"), e.consume(x), e.exit("definitionMarker"), m) : r(x);
  }
  function m(x) {
    return Xe(x) ? wl(e, p)(x) : p(x);
  }
  function p(x) {
    return tx(
      e,
      g,
      // Note: we don’t need to reset the way `markdown-rs` does.
      r,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(x);
  }
  function g(x) {
    return e.attempt(Sz, y, y)(x);
  }
  function y(x) {
    return Bt(x) ? Zt(e, b, "whitespace")(x) : b(x);
  }
  function b(x) {
    return x === null || xt(x) ? (e.exit("definition"), l.parser.defined.push(s), i(x)) : r(x);
  }
}
function Ez(e, i, r) {
  return l;
  function l(d) {
    return Xe(d) ? wl(e, s)(d) : r(d);
  }
  function s(d) {
    return nx(e, u, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(d);
  }
  function u(d) {
    return Bt(d) ? Zt(e, f, "whitespace")(d) : f(d);
  }
  function f(d) {
    return d === null || xt(d) ? i(d) : r(d);
  }
}
const Az = {
  name: "hardBreakEscape",
  tokenize: kz
};
function kz(e, i, r) {
  return l;
  function l(u) {
    return e.enter("hardBreakEscape"), e.consume(u), s;
  }
  function s(u) {
    return xt(u) ? (e.exit("hardBreakEscape"), i(u)) : r(u);
  }
}
const Cz = {
  name: "headingAtx",
  resolve: Mz,
  tokenize: zz
};
function Mz(e, i) {
  let r = e.length - 2, l = 3, s, u;
  return e[l][1].type === "whitespace" && (l += 2), r - 2 > l && e[r][1].type === "whitespace" && (r -= 2), e[r][1].type === "atxHeadingSequence" && (l === r - 1 || r - 4 > l && e[r - 2][1].type === "whitespace") && (r -= l + 1 === r ? 2 : 4), r > l && (s = {
    type: "atxHeadingText",
    start: e[l][1].start,
    end: e[r][1].end
  }, u = {
    type: "chunkText",
    start: e[l][1].start,
    end: e[r][1].end,
    contentType: "text"
  }, Nn(e, l, r - l + 1, [["enter", s, i], ["enter", u, i], ["exit", u, i], ["exit", s, i]])), e;
}
function zz(e, i, r) {
  let l = 0;
  return s;
  function s(g) {
    return e.enter("atxHeading"), u(g);
  }
  function u(g) {
    return e.enter("atxHeadingSequence"), f(g);
  }
  function f(g) {
    return g === 35 && l++ < 6 ? (e.consume(g), f) : g === null || Xe(g) ? (e.exit("atxHeadingSequence"), d(g)) : r(g);
  }
  function d(g) {
    return g === 35 ? (e.enter("atxHeadingSequence"), m(g)) : g === null || xt(g) ? (e.exit("atxHeading"), i(g)) : Bt(g) ? Zt(e, d, "whitespace")(g) : (e.enter("atxHeadingText"), p(g));
  }
  function m(g) {
    return g === 35 ? (e.consume(g), m) : (e.exit("atxHeadingSequence"), d(g));
  }
  function p(g) {
    return g === null || g === 35 || Xe(g) ? (e.exit("atxHeadingText"), d(g)) : (e.consume(g), p);
  }
}
const Dz = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], s0 = ["pre", "script", "style", "textarea"], Rz = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Nz,
  tokenize: Lz
}, Oz = {
  partial: !0,
  tokenize: Bz
}, _z = {
  partial: !0,
  tokenize: Vz
};
function Nz(e) {
  let i = e.length;
  for (; i-- && !(e[i][0] === "enter" && e[i][1].type === "htmlFlow"); )
    ;
  return i > 1 && e[i - 2][1].type === "linePrefix" && (e[i][1].start = e[i - 2][1].start, e[i + 1][1].start = e[i - 2][1].start, e.splice(i - 2, 2)), e;
}
function Lz(e, i, r) {
  const l = this;
  let s, u, f, d, m;
  return p;
  function p(T) {
    return g(T);
  }
  function g(T) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(T), y;
  }
  function y(T) {
    return T === 33 ? (e.consume(T), b) : T === 47 ? (e.consume(T), u = !0, z) : T === 63 ? (e.consume(T), s = 3, l.interrupt ? i : S) : Rn(T) ? (e.consume(T), f = String.fromCharCode(T), D) : r(T);
  }
  function b(T) {
    return T === 45 ? (e.consume(T), s = 2, x) : T === 91 ? (e.consume(T), s = 5, d = 0, A) : Rn(T) ? (e.consume(T), s = 4, l.interrupt ? i : S) : r(T);
  }
  function x(T) {
    return T === 45 ? (e.consume(T), l.interrupt ? i : S) : r(T);
  }
  function A(T) {
    const at = "CDATA[";
    return T === at.charCodeAt(d++) ? (e.consume(T), d === at.length ? l.interrupt ? i : $ : A) : r(T);
  }
  function z(T) {
    return Rn(T) ? (e.consume(T), f = String.fromCharCode(T), D) : r(T);
  }
  function D(T) {
    if (T === null || T === 47 || T === 62 || Xe(T)) {
      const at = T === 47, st = f.toLowerCase();
      return !at && !u && s0.includes(st) ? (s = 1, l.interrupt ? i(T) : $(T)) : Dz.includes(f.toLowerCase()) ? (s = 6, at ? (e.consume(T), M) : l.interrupt ? i(T) : $(T)) : (s = 7, l.interrupt && !l.parser.lazy[l.now().line] ? r(T) : u ? H(T) : _(T));
    }
    return T === 45 || en(T) ? (e.consume(T), f += String.fromCharCode(T), D) : r(T);
  }
  function M(T) {
    return T === 62 ? (e.consume(T), l.interrupt ? i : $) : r(T);
  }
  function H(T) {
    return Bt(T) ? (e.consume(T), H) : et(T);
  }
  function _(T) {
    return T === 47 ? (e.consume(T), et) : T === 58 || T === 95 || Rn(T) ? (e.consume(T), F) : Bt(T) ? (e.consume(T), _) : et(T);
  }
  function F(T) {
    return T === 45 || T === 46 || T === 58 || T === 95 || en(T) ? (e.consume(T), F) : K(T);
  }
  function K(T) {
    return T === 61 ? (e.consume(T), B) : Bt(T) ? (e.consume(T), K) : _(T);
  }
  function B(T) {
    return T === null || T === 60 || T === 61 || T === 62 || T === 96 ? r(T) : T === 34 || T === 39 ? (e.consume(T), m = T, I) : Bt(T) ? (e.consume(T), B) : j(T);
  }
  function I(T) {
    return T === m ? (e.consume(T), m = null, J) : T === null || xt(T) ? r(T) : (e.consume(T), I);
  }
  function j(T) {
    return T === null || T === 34 || T === 39 || T === 47 || T === 60 || T === 61 || T === 62 || T === 96 || Xe(T) ? K(T) : (e.consume(T), j);
  }
  function J(T) {
    return T === 47 || T === 62 || Bt(T) ? _(T) : r(T);
  }
  function et(T) {
    return T === 62 ? (e.consume(T), W) : r(T);
  }
  function W(T) {
    return T === null || xt(T) ? $(T) : Bt(T) ? (e.consume(T), W) : r(T);
  }
  function $(T) {
    return T === 45 && s === 2 ? (e.consume(T), O) : T === 60 && s === 1 ? (e.consume(T), Q) : T === 62 && s === 4 ? (e.consume(T), k) : T === 63 && s === 3 ? (e.consume(T), S) : T === 93 && s === 5 ? (e.consume(T), pt) : xt(T) && (s === 6 || s === 7) ? (e.exit("htmlFlowData"), e.check(Oz, q, vt)(T)) : T === null || xt(T) ? (e.exit("htmlFlowData"), vt(T)) : (e.consume(T), $);
  }
  function vt(T) {
    return e.check(_z, lt, q)(T);
  }
  function lt(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), Z;
  }
  function Z(T) {
    return T === null || xt(T) ? vt(T) : (e.enter("htmlFlowData"), $(T));
  }
  function O(T) {
    return T === 45 ? (e.consume(T), S) : $(T);
  }
  function Q(T) {
    return T === 47 ? (e.consume(T), f = "", nt) : $(T);
  }
  function nt(T) {
    if (T === 62) {
      const at = f.toLowerCase();
      return s0.includes(at) ? (e.consume(T), k) : $(T);
    }
    return Rn(T) && f.length < 8 ? (e.consume(T), f += String.fromCharCode(T), nt) : $(T);
  }
  function pt(T) {
    return T === 93 ? (e.consume(T), S) : $(T);
  }
  function S(T) {
    return T === 62 ? (e.consume(T), k) : T === 45 && s === 2 ? (e.consume(T), S) : $(T);
  }
  function k(T) {
    return T === null || xt(T) ? (e.exit("htmlFlowData"), q(T)) : (e.consume(T), k);
  }
  function q(T) {
    return e.exit("htmlFlow"), i(T);
  }
}
function Vz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return xt(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u) : r(f);
  }
  function u(f) {
    return l.parser.lazy[l.now().line] ? r(f) : i(f);
  }
}
function Bz(e, i, r) {
  return l;
  function l(s) {
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), e.attempt(Us, i, r);
  }
}
const Uz = {
  name: "htmlText",
  tokenize: jz
};
function jz(e, i, r) {
  const l = this;
  let s, u, f;
  return d;
  function d(S) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(S), m;
  }
  function m(S) {
    return S === 33 ? (e.consume(S), p) : S === 47 ? (e.consume(S), K) : S === 63 ? (e.consume(S), _) : Rn(S) ? (e.consume(S), j) : r(S);
  }
  function p(S) {
    return S === 45 ? (e.consume(S), g) : S === 91 ? (e.consume(S), u = 0, A) : Rn(S) ? (e.consume(S), H) : r(S);
  }
  function g(S) {
    return S === 45 ? (e.consume(S), x) : r(S);
  }
  function y(S) {
    return S === null ? r(S) : S === 45 ? (e.consume(S), b) : xt(S) ? (f = y, Q(S)) : (e.consume(S), y);
  }
  function b(S) {
    return S === 45 ? (e.consume(S), x) : y(S);
  }
  function x(S) {
    return S === 62 ? O(S) : S === 45 ? b(S) : y(S);
  }
  function A(S) {
    const k = "CDATA[";
    return S === k.charCodeAt(u++) ? (e.consume(S), u === k.length ? z : A) : r(S);
  }
  function z(S) {
    return S === null ? r(S) : S === 93 ? (e.consume(S), D) : xt(S) ? (f = z, Q(S)) : (e.consume(S), z);
  }
  function D(S) {
    return S === 93 ? (e.consume(S), M) : z(S);
  }
  function M(S) {
    return S === 62 ? O(S) : S === 93 ? (e.consume(S), M) : z(S);
  }
  function H(S) {
    return S === null || S === 62 ? O(S) : xt(S) ? (f = H, Q(S)) : (e.consume(S), H);
  }
  function _(S) {
    return S === null ? r(S) : S === 63 ? (e.consume(S), F) : xt(S) ? (f = _, Q(S)) : (e.consume(S), _);
  }
  function F(S) {
    return S === 62 ? O(S) : _(S);
  }
  function K(S) {
    return Rn(S) ? (e.consume(S), B) : r(S);
  }
  function B(S) {
    return S === 45 || en(S) ? (e.consume(S), B) : I(S);
  }
  function I(S) {
    return xt(S) ? (f = I, Q(S)) : Bt(S) ? (e.consume(S), I) : O(S);
  }
  function j(S) {
    return S === 45 || en(S) ? (e.consume(S), j) : S === 47 || S === 62 || Xe(S) ? J(S) : r(S);
  }
  function J(S) {
    return S === 47 ? (e.consume(S), O) : S === 58 || S === 95 || Rn(S) ? (e.consume(S), et) : xt(S) ? (f = J, Q(S)) : Bt(S) ? (e.consume(S), J) : O(S);
  }
  function et(S) {
    return S === 45 || S === 46 || S === 58 || S === 95 || en(S) ? (e.consume(S), et) : W(S);
  }
  function W(S) {
    return S === 61 ? (e.consume(S), $) : xt(S) ? (f = W, Q(S)) : Bt(S) ? (e.consume(S), W) : J(S);
  }
  function $(S) {
    return S === null || S === 60 || S === 61 || S === 62 || S === 96 ? r(S) : S === 34 || S === 39 ? (e.consume(S), s = S, vt) : xt(S) ? (f = $, Q(S)) : Bt(S) ? (e.consume(S), $) : (e.consume(S), lt);
  }
  function vt(S) {
    return S === s ? (e.consume(S), s = void 0, Z) : S === null ? r(S) : xt(S) ? (f = vt, Q(S)) : (e.consume(S), vt);
  }
  function lt(S) {
    return S === null || S === 34 || S === 39 || S === 60 || S === 61 || S === 96 ? r(S) : S === 47 || S === 62 || Xe(S) ? J(S) : (e.consume(S), lt);
  }
  function Z(S) {
    return S === 47 || S === 62 || Xe(S) ? J(S) : r(S);
  }
  function O(S) {
    return S === 62 ? (e.consume(S), e.exit("htmlTextData"), e.exit("htmlText"), i) : r(S);
  }
  function Q(S) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(S), e.exit("lineEnding"), nt;
  }
  function nt(S) {
    return Bt(S) ? Zt(e, pt, "linePrefix", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(S) : pt(S);
  }
  function pt(S) {
    return e.enter("htmlTextData"), f(S);
  }
}
const rd = {
  name: "labelEnd",
  resolveAll: Gz,
  resolveTo: Xz,
  tokenize: Pz
}, Hz = {
  tokenize: Fz
}, qz = {
  tokenize: Qz
}, Yz = {
  tokenize: Kz
};
function Gz(e) {
  let i = -1;
  const r = [];
  for (; ++i < e.length; ) {
    const l = e[i][1];
    if (r.push(e[i]), l.type === "labelImage" || l.type === "labelLink" || l.type === "labelEnd") {
      const s = l.type === "labelImage" ? 4 : 2;
      l.type = "data", i += s;
    }
  }
  return e.length !== r.length && Nn(e, 0, e.length, r), e;
}
function Xz(e, i) {
  let r = e.length, l = 0, s, u, f, d;
  for (; r--; )
    if (s = e[r][1], u) {
      if (s.type === "link" || s.type === "labelLink" && s._inactive)
        break;
      e[r][0] === "enter" && s.type === "labelLink" && (s._inactive = !0);
    } else if (f) {
      if (e[r][0] === "enter" && (s.type === "labelImage" || s.type === "labelLink") && !s._balanced && (u = r, s.type !== "labelLink")) {
        l = 2;
        break;
      }
    } else s.type === "labelEnd" && (f = r);
  const m = {
    type: e[u][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[u][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, p = {
    type: "label",
    start: {
      ...e[u][1].start
    },
    end: {
      ...e[f][1].end
    }
  }, g = {
    type: "labelText",
    start: {
      ...e[u + l + 2][1].end
    },
    end: {
      ...e[f - 2][1].start
    }
  };
  return d = [["enter", m, i], ["enter", p, i]], d = dn(d, e.slice(u + 1, u + l + 3)), d = dn(d, [["enter", g, i]]), d = dn(d, ad(i.parser.constructs.insideSpan.null, e.slice(u + l + 4, f - 3), i)), d = dn(d, [["exit", g, i], e[f - 2], e[f - 1], ["exit", p, i]]), d = dn(d, e.slice(f + 1)), d = dn(d, [["exit", m, i]]), Nn(e, u, e.length, d), e;
}
function Pz(e, i, r) {
  const l = this;
  let s = l.events.length, u, f;
  for (; s--; )
    if ((l.events[s][1].type === "labelImage" || l.events[s][1].type === "labelLink") && !l.events[s][1]._balanced) {
      u = l.events[s][1];
      break;
    }
  return d;
  function d(b) {
    return u ? u._inactive ? y(b) : (f = l.parser.defined.includes(or(l.sliceSerialize({
      start: u.end,
      end: l.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(b), e.exit("labelMarker"), e.exit("labelEnd"), m) : r(b);
  }
  function m(b) {
    return b === 40 ? e.attempt(Hz, g, f ? g : y)(b) : b === 91 ? e.attempt(qz, g, f ? p : y)(b) : f ? g(b) : y(b);
  }
  function p(b) {
    return e.attempt(Yz, g, y)(b);
  }
  function g(b) {
    return i(b);
  }
  function y(b) {
    return u._balanced = !0, r(b);
  }
}
function Fz(e, i, r) {
  return l;
  function l(y) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(y), e.exit("resourceMarker"), s;
  }
  function s(y) {
    return Xe(y) ? wl(e, u)(y) : u(y);
  }
  function u(y) {
    return y === 41 ? g(y) : tx(e, f, d, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(y);
  }
  function f(y) {
    return Xe(y) ? wl(e, m)(y) : g(y);
  }
  function d(y) {
    return r(y);
  }
  function m(y) {
    return y === 34 || y === 39 || y === 40 ? nx(e, p, r, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(y) : g(y);
  }
  function p(y) {
    return Xe(y) ? wl(e, g)(y) : g(y);
  }
  function g(y) {
    return y === 41 ? (e.enter("resourceMarker"), e.consume(y), e.exit("resourceMarker"), e.exit("resource"), i) : r(y);
  }
}
function Qz(e, i, r) {
  const l = this;
  return s;
  function s(d) {
    return ex.call(l, e, u, f, "reference", "referenceMarker", "referenceString")(d);
  }
  function u(d) {
    return l.parser.defined.includes(or(l.sliceSerialize(l.events[l.events.length - 1][1]).slice(1, -1))) ? i(d) : r(d);
  }
  function f(d) {
    return r(d);
  }
}
function Kz(e, i, r) {
  return l;
  function l(u) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), s;
  }
  function s(u) {
    return u === 93 ? (e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), e.exit("reference"), i) : r(u);
  }
}
const Zz = {
  name: "labelStartImage",
  resolveAll: rd.resolveAll,
  tokenize: Iz
};
function Iz(e, i, r) {
  const l = this;
  return s;
  function s(d) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(d), e.exit("labelImageMarker"), u;
  }
  function u(d) {
    return d === 91 ? (e.enter("labelMarker"), e.consume(d), e.exit("labelMarker"), e.exit("labelImage"), f) : r(d);
  }
  function f(d) {
    return d === 94 && "_hiddenFootnoteSupport" in l.parser.constructs ? r(d) : i(d);
  }
}
const Jz = {
  name: "labelStartLink",
  resolveAll: rd.resolveAll,
  tokenize: Wz
};
function Wz(e, i, r) {
  const l = this;
  return s;
  function s(f) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(f), e.exit("labelMarker"), e.exit("labelLink"), u;
  }
  function u(f) {
    return f === 94 && "_hiddenFootnoteSupport" in l.parser.constructs ? r(f) : i(f);
  }
}
const Df = {
  name: "lineEnding",
  tokenize: $z
};
function $z(e, i) {
  return r;
  function r(l) {
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), Zt(e, i, "linePrefix");
  }
}
const bs = {
  name: "thematicBreak",
  tokenize: tD
};
function tD(e, i, r) {
  let l = 0, s;
  return u;
  function u(p) {
    return e.enter("thematicBreak"), f(p);
  }
  function f(p) {
    return s = p, d(p);
  }
  function d(p) {
    return p === s ? (e.enter("thematicBreakSequence"), m(p)) : l >= 3 && (p === null || xt(p)) ? (e.exit("thematicBreak"), i(p)) : r(p);
  }
  function m(p) {
    return p === s ? (e.consume(p), l++, m) : (e.exit("thematicBreakSequence"), Bt(p) ? Zt(e, d, "whitespace")(p) : d(p));
  }
}
const Ye = {
  continuation: {
    tokenize: aD
  },
  exit: lD,
  name: "list",
  tokenize: iD
}, eD = {
  partial: !0,
  tokenize: oD
}, nD = {
  partial: !0,
  tokenize: rD
};
function iD(e, i, r) {
  const l = this, s = l.events[l.events.length - 1];
  let u = s && s[1].type === "linePrefix" ? s[2].sliceSerialize(s[1], !0).length : 0, f = 0;
  return d;
  function d(x) {
    const A = l.containerState.type || (x === 42 || x === 43 || x === 45 ? "listUnordered" : "listOrdered");
    if (A === "listUnordered" ? !l.containerState.marker || x === l.containerState.marker : mh(x)) {
      if (l.containerState.type || (l.containerState.type = A, e.enter(A, {
        _container: !0
      })), A === "listUnordered")
        return e.enter("listItemPrefix"), x === 42 || x === 45 ? e.check(bs, r, p)(x) : p(x);
      if (!l.interrupt || x === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), m(x);
    }
    return r(x);
  }
  function m(x) {
    return mh(x) && ++f < 10 ? (e.consume(x), m) : (!l.interrupt || f < 2) && (l.containerState.marker ? x === l.containerState.marker : x === 41 || x === 46) ? (e.exit("listItemValue"), p(x)) : r(x);
  }
  function p(x) {
    return e.enter("listItemMarker"), e.consume(x), e.exit("listItemMarker"), l.containerState.marker = l.containerState.marker || x, e.check(
      Us,
      // Can’t be empty when interrupting.
      l.interrupt ? r : g,
      e.attempt(eD, b, y)
    );
  }
  function g(x) {
    return l.containerState.initialBlankLine = !0, u++, b(x);
  }
  function y(x) {
    return Bt(x) ? (e.enter("listItemPrefixWhitespace"), e.consume(x), e.exit("listItemPrefixWhitespace"), b) : r(x);
  }
  function b(x) {
    return l.containerState.size = u + l.sliceSerialize(e.exit("listItemPrefix"), !0).length, i(x);
  }
}
function aD(e, i, r) {
  const l = this;
  return l.containerState._closeFlow = void 0, e.check(Us, s, u);
  function s(d) {
    return l.containerState.furtherBlankLines = l.containerState.furtherBlankLines || l.containerState.initialBlankLine, Zt(e, i, "listItemIndent", l.containerState.size + 1)(d);
  }
  function u(d) {
    return l.containerState.furtherBlankLines || !Bt(d) ? (l.containerState.furtherBlankLines = void 0, l.containerState.initialBlankLine = void 0, f(d)) : (l.containerState.furtherBlankLines = void 0, l.containerState.initialBlankLine = void 0, e.attempt(nD, i, f)(d));
  }
  function f(d) {
    return l.containerState._closeFlow = !0, l.interrupt = void 0, Zt(e, e.attempt(Ye, i, r), "linePrefix", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d);
  }
}
function rD(e, i, r) {
  const l = this;
  return Zt(e, s, "listItemIndent", l.containerState.size + 1);
  function s(u) {
    const f = l.events[l.events.length - 1];
    return f && f[1].type === "listItemIndent" && f[2].sliceSerialize(f[1], !0).length === l.containerState.size ? i(u) : r(u);
  }
}
function lD(e) {
  e.exit(this.containerState.type);
}
function oD(e, i, r) {
  const l = this;
  return Zt(e, s, "listItemPrefixWhitespace", l.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function s(u) {
    const f = l.events[l.events.length - 1];
    return !Bt(u) && f && f[1].type === "listItemPrefixWhitespace" ? i(u) : r(u);
  }
}
const u0 = {
  name: "setextUnderline",
  resolveTo: sD,
  tokenize: uD
};
function sD(e, i) {
  let r = e.length, l, s, u;
  for (; r--; )
    if (e[r][0] === "enter") {
      if (e[r][1].type === "content") {
        l = r;
        break;
      }
      e[r][1].type === "paragraph" && (s = r);
    } else
      e[r][1].type === "content" && e.splice(r, 1), !u && e[r][1].type === "definition" && (u = r);
  const f = {
    type: "setextHeading",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[s][1].type = "setextHeadingText", u ? (e.splice(s, 0, ["enter", f, i]), e.splice(u + 1, 0, ["exit", e[l][1], i]), e[l][1].end = {
    ...e[u][1].end
  }) : e[l][1] = f, e.push(["exit", f, i]), e;
}
function uD(e, i, r) {
  const l = this;
  let s;
  return u;
  function u(p) {
    let g = l.events.length, y;
    for (; g--; )
      if (l.events[g][1].type !== "lineEnding" && l.events[g][1].type !== "linePrefix" && l.events[g][1].type !== "content") {
        y = l.events[g][1].type === "paragraph";
        break;
      }
    return !l.parser.lazy[l.now().line] && (l.interrupt || y) ? (e.enter("setextHeadingLine"), s = p, f(p)) : r(p);
  }
  function f(p) {
    return e.enter("setextHeadingLineSequence"), d(p);
  }
  function d(p) {
    return p === s ? (e.consume(p), d) : (e.exit("setextHeadingLineSequence"), Bt(p) ? Zt(e, m, "lineSuffix")(p) : m(p));
  }
  function m(p) {
    return p === null || xt(p) ? (e.exit("setextHeadingLine"), i(p)) : r(p);
  }
}
const cD = {
  tokenize: fD
};
function fD(e) {
  const i = this, r = e.attempt(
    // Try to parse a blank line.
    Us,
    l,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, s, Zt(e, e.attempt(this.parser.constructs.flow, s, e.attempt(gz, s)), "linePrefix"))
  );
  return r;
  function l(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(u), e.exit("lineEndingBlank"), i.currentConstruct = void 0, r;
  }
  function s(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), i.currentConstruct = void 0, r;
  }
}
const hD = {
  resolveAll: ax()
}, dD = ix("string"), pD = ix("text");
function ix(e) {
  return {
    resolveAll: ax(e === "text" ? mD : void 0),
    tokenize: i
  };
  function i(r) {
    const l = this, s = this.parser.constructs[e], u = r.attempt(s, f, d);
    return f;
    function f(g) {
      return p(g) ? u(g) : d(g);
    }
    function d(g) {
      if (g === null) {
        r.consume(g);
        return;
      }
      return r.enter("data"), r.consume(g), m;
    }
    function m(g) {
      return p(g) ? (r.exit("data"), u(g)) : (r.consume(g), m);
    }
    function p(g) {
      if (g === null)
        return !0;
      const y = s[g];
      let b = -1;
      if (y)
        for (; ++b < y.length; ) {
          const x = y[b];
          if (!x.previous || x.previous.call(l, l.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ax(e) {
  return i;
  function i(r, l) {
    let s = -1, u;
    for (; ++s <= r.length; )
      u === void 0 ? r[s] && r[s][1].type === "data" && (u = s, s++) : (!r[s] || r[s][1].type !== "data") && (s !== u + 2 && (r[u][1].end = r[s - 1][1].end, r.splice(u + 2, s - u - 2), s = u + 2), u = void 0);
    return e ? e(r, l) : r;
  }
}
function mD(e, i) {
  let r = 0;
  for (; ++r <= e.length; )
    if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
      const l = e[r - 1][1], s = i.sliceStream(l);
      let u = s.length, f = -1, d = 0, m;
      for (; u--; ) {
        const p = s[u];
        if (typeof p == "string") {
          for (f = p.length; p.charCodeAt(f - 1) === 32; )
            d++, f--;
          if (f) break;
          f = -1;
        } else if (p === -2)
          m = !0, d++;
        else if (p !== -1) {
          u++;
          break;
        }
      }
      if (i._contentTypeTextTrailing && r === e.length && (d = 0), d) {
        const p = {
          type: r === e.length || m || d < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? f : l.start._bufferIndex + f,
            _index: l.start._index + u,
            line: l.end.line,
            column: l.end.column - d,
            offset: l.end.offset - d
          },
          end: {
            ...l.end
          }
        };
        l.end = {
          ...p.start
        }, l.start.offset === l.end.offset ? Object.assign(l, p) : (e.splice(r, 0, ["enter", p, i], ["exit", p, i]), r += 2);
      }
      r++;
    }
  return e;
}
const gD = {
  42: Ye,
  43: Ye,
  45: Ye,
  48: Ye,
  49: Ye,
  50: Ye,
  51: Ye,
  52: Ye,
  53: Ye,
  54: Ye,
  55: Ye,
  56: Ye,
  57: Ye,
  62: I1
}, yD = {
  91: wz
}, vD = {
  [-2]: zf,
  [-1]: zf,
  32: zf
}, bD = {
  35: Cz,
  42: bs,
  45: [u0, bs],
  60: Rz,
  61: u0,
  95: bs,
  96: o0,
  126: o0
}, xD = {
  38: W1,
  92: J1
}, wD = {
  [-5]: Df,
  [-4]: Df,
  [-3]: Df,
  33: Zz,
  38: W1,
  42: gh,
  60: [JM, Uz],
  91: Jz,
  92: [Az, J1],
  93: rd,
  95: gh,
  96: cz
}, SD = {
  null: [gh, hD]
}, TD = {
  null: [42, 95]
}, ED = {
  null: []
}, AD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: TD,
  contentInitial: yD,
  disable: ED,
  document: gD,
  flow: bD,
  flowInitial: vD,
  insideSpan: SD,
  string: xD,
  text: wD
}, Symbol.toStringTag, { value: "Module" }));
function kD(e, i, r) {
  let l = {
    _bufferIndex: -1,
    _index: 0,
    line: r && r.line || 1,
    column: r && r.column || 1,
    offset: r && r.offset || 0
  };
  const s = {}, u = [];
  let f = [], d = [];
  const m = {
    attempt: I(K),
    check: I(B),
    consume: H,
    enter: _,
    exit: F,
    interrupt: I(B, {
      interrupt: !0
    })
  }, p = {
    code: null,
    containerState: {},
    defineSkip: z,
    events: [],
    now: A,
    parser: e,
    previous: null,
    sliceSerialize: b,
    sliceStream: x,
    write: y
  };
  let g = i.tokenize.call(p, m);
  return i.resolveAll && u.push(i), p;
  function y(W) {
    return f = dn(f, W), D(), f[f.length - 1] !== null ? [] : (j(i, 0), p.events = ad(u, p.events, p), p.events);
  }
  function b(W, $) {
    return MD(x(W), $);
  }
  function x(W) {
    return CD(f, W);
  }
  function A() {
    const {
      _bufferIndex: W,
      _index: $,
      line: vt,
      column: lt,
      offset: Z
    } = l;
    return {
      _bufferIndex: W,
      _index: $,
      line: vt,
      column: lt,
      offset: Z
    };
  }
  function z(W) {
    s[W.line] = W.column, et();
  }
  function D() {
    let W;
    for (; l._index < f.length; ) {
      const $ = f[l._index];
      if (typeof $ == "string")
        for (W = l._index, l._bufferIndex < 0 && (l._bufferIndex = 0); l._index === W && l._bufferIndex < $.length; )
          M($.charCodeAt(l._bufferIndex));
      else
        M($);
    }
  }
  function M(W) {
    g = g(W);
  }
  function H(W) {
    xt(W) ? (l.line++, l.column = 1, l.offset += W === -3 ? 2 : 1, et()) : W !== -1 && (l.column++, l.offset++), l._bufferIndex < 0 ? l._index++ : (l._bufferIndex++, l._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    f[l._index].length && (l._bufferIndex = -1, l._index++)), p.previous = W;
  }
  function _(W, $) {
    const vt = $ || {};
    return vt.type = W, vt.start = A(), p.events.push(["enter", vt, p]), d.push(vt), vt;
  }
  function F(W) {
    const $ = d.pop();
    return $.end = A(), p.events.push(["exit", $, p]), $;
  }
  function K(W, $) {
    j(W, $.from);
  }
  function B(W, $) {
    $.restore();
  }
  function I(W, $) {
    return vt;
    function vt(lt, Z, O) {
      let Q, nt, pt, S;
      return Array.isArray(lt) ? (
        /* c8 ignore next 1 */
        q(lt)
      ) : "tokenize" in lt ? (
        // Looks like a construct.
        q([
          /** @type {Construct} */
          lt
        ])
      ) : k(lt);
      function k(ot) {
        return Et;
        function Et(Xt) {
          const bt = Xt !== null && ot[Xt], ke = Xt !== null && ot.null, Oe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(bt) ? bt : bt ? [bt] : [],
            ...Array.isArray(ke) ? ke : ke ? [ke] : []
          ];
          return q(Oe)(Xt);
        }
      }
      function q(ot) {
        return Q = ot, nt = 0, ot.length === 0 ? O : T(ot[nt]);
      }
      function T(ot) {
        return Et;
        function Et(Xt) {
          return S = J(), pt = ot, ot.partial || (p.currentConstruct = ot), ot.name && p.parser.constructs.disable.null.includes(ot.name) ? st() : ot.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            $ ? Object.assign(Object.create(p), $) : p,
            m,
            at,
            st
          )(Xt);
        }
      }
      function at(ot) {
        return W(pt, S), Z;
      }
      function st(ot) {
        return S.restore(), ++nt < Q.length ? T(Q[nt]) : O;
      }
    }
  }
  function j(W, $) {
    W.resolveAll && !u.includes(W) && u.push(W), W.resolve && Nn(p.events, $, p.events.length - $, W.resolve(p.events.slice($), p)), W.resolveTo && (p.events = W.resolveTo(p.events, p));
  }
  function J() {
    const W = A(), $ = p.previous, vt = p.currentConstruct, lt = p.events.length, Z = Array.from(d);
    return {
      from: lt,
      restore: O
    };
    function O() {
      l = W, p.previous = $, p.currentConstruct = vt, p.events.length = lt, d = Z, et();
    }
  }
  function et() {
    l.line in s && l.column < 2 && (l.column = s[l.line], l.offset += s[l.line] - 1);
  }
}
function CD(e, i) {
  const r = i.start._index, l = i.start._bufferIndex, s = i.end._index, u = i.end._bufferIndex;
  let f;
  if (r === s)
    f = [e[r].slice(l, u)];
  else {
    if (f = e.slice(r, s), l > -1) {
      const d = f[0];
      typeof d == "string" ? f[0] = d.slice(l) : f.shift();
    }
    u > 0 && f.push(e[s].slice(0, u));
  }
  return f;
}
function MD(e, i) {
  let r = -1;
  const l = [];
  let s;
  for (; ++r < e.length; ) {
    const u = e[r];
    let f;
    if (typeof u == "string")
      f = u;
    else switch (u) {
      case -5: {
        f = "\r";
        break;
      }
      case -4: {
        f = `
`;
        break;
      }
      case -3: {
        f = `\r
`;
        break;
      }
      case -2: {
        f = i ? " " : "	";
        break;
      }
      case -1: {
        if (!i && s) continue;
        f = " ";
        break;
      }
      default:
        f = String.fromCharCode(u);
    }
    s = u === -2, l.push(f);
  }
  return l.join("");
}
function zD(e) {
  const l = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      VM([AD, ...(e || {}).extensions || []])
    ),
    content: s(XM),
    defined: [],
    document: s(FM),
    flow: s(cD),
    lazy: {},
    string: s(dD),
    text: s(pD)
  };
  return l;
  function s(u) {
    return f;
    function f(d) {
      return kD(l, u, d);
    }
  }
}
function DD(e) {
  for (; !$1(e); )
    ;
  return e;
}
const c0 = /[\0\t\n\r]/g;
function RD() {
  let e = 1, i = "", r = !0, l;
  return s;
  function s(u, f, d) {
    const m = [];
    let p, g, y, b, x;
    for (u = i + (typeof u == "string" ? u.toString() : new TextDecoder(f || void 0).decode(u)), y = 0, i = "", r && (u.charCodeAt(0) === 65279 && y++, r = void 0); y < u.length; ) {
      if (c0.lastIndex = y, p = c0.exec(u), b = p && p.index !== void 0 ? p.index : u.length, x = u.charCodeAt(b), !p) {
        i = u.slice(y);
        break;
      }
      if (x === 10 && y === b && l)
        m.push(-3), l = void 0;
      else
        switch (l && (m.push(-5), l = void 0), y < b && (m.push(u.slice(y, b)), e += b - y), x) {
          case 0: {
            m.push(65533), e++;
            break;
          }
          case 9: {
            for (g = Math.ceil(e / 4) * 4, m.push(-2); e++ < g; ) m.push(-1);
            break;
          }
          case 10: {
            m.push(-4), e = 1;
            break;
          }
          default:
            l = !0, e = 1;
        }
      y = b + 1;
    }
    return d && (l && m.push(-5), i && m.push(i), m.push(null)), m;
  }
}
const OD = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function _D(e) {
  return e.replace(OD, ND);
}
function ND(e, i, r) {
  if (i)
    return i;
  if (r.charCodeAt(0) === 35) {
    const s = r.charCodeAt(1), u = s === 120 || s === 88;
    return Z1(r.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return id(r) || e;
}
const rx = {}.hasOwnProperty;
function LD(e, i, r) {
  return i && typeof i == "object" && (r = i, i = void 0), VD(r)(DD(zD(r).document().write(RD()(e, i, !0))));
}
function VD(e) {
  const i = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: u(pa),
      autolinkProtocol: J,
      autolinkEmail: J,
      atxHeading: u(ha),
      blockQuote: u(ke),
      characterEscape: J,
      characterReference: J,
      codeFenced: u(Oe),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: u(Oe, f),
      codeText: u(Tn, f),
      codeTextData: J,
      data: J,
      codeFlowValue: J,
      definition: u(ei),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: u(_e),
      hardBreakEscape: u(da),
      hardBreakTrailing: u(da),
      htmlFlow: u(Ll, f),
      htmlFlowData: J,
      htmlText: u(Ll, f),
      htmlTextData: J,
      image: u(Vl),
      label: f,
      link: u(pa),
      listItem: u(mr),
      listItemValue: b,
      listOrdered: u(ma, y),
      listUnordered: u(ma),
      paragraph: u(qs),
      reference: T,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: u(ha),
      strong: u(Ys),
      thematicBreak: u(Gs)
    },
    exit: {
      atxHeading: m(),
      atxHeadingSequence: K,
      autolink: m(),
      autolinkEmail: bt,
      autolinkProtocol: Xt,
      blockQuote: m(),
      characterEscapeValue: et,
      characterReferenceMarkerHexadecimal: st,
      characterReferenceMarkerNumeric: st,
      characterReferenceValue: ot,
      characterReference: Et,
      codeFenced: m(D),
      codeFencedFence: z,
      codeFencedFenceInfo: x,
      codeFencedFenceMeta: A,
      codeFlowValue: et,
      codeIndented: m(M),
      codeText: m(Z),
      codeTextData: et,
      data: et,
      definition: m(),
      definitionDestinationString: F,
      definitionLabelString: H,
      definitionTitleString: _,
      emphasis: m(),
      hardBreakEscape: m($),
      hardBreakTrailing: m($),
      htmlFlow: m(vt),
      htmlFlowData: et,
      htmlText: m(lt),
      htmlTextData: et,
      image: m(Q),
      label: pt,
      labelText: nt,
      lineEnding: W,
      link: m(O),
      listItem: m(),
      listOrdered: m(),
      listUnordered: m(),
      paragraph: m(),
      referenceString: at,
      resourceDestinationString: S,
      resourceTitleString: k,
      resource: q,
      setextHeading: m(j),
      setextHeadingLineSequence: I,
      setextHeadingText: B,
      strong: m(),
      thematicBreak: m()
    }
  };
  lx(i, (e || {}).mdastExtensions || []);
  const r = {};
  return l;
  function l(G) {
    let it = {
      type: "root",
      children: []
    };
    const yt = {
      stack: [it],
      tokenStack: [],
      config: i,
      enter: d,
      exit: p,
      buffer: f,
      resume: g,
      data: r
    }, Mt = [];
    let Ut = -1;
    for (; ++Ut < G.length; )
      if (G[Ut][1].type === "listOrdered" || G[Ut][1].type === "listUnordered")
        if (G[Ut][0] === "enter")
          Mt.push(Ut);
        else {
          const Fe = Mt.pop();
          Ut = s(G, Fe, Ut);
        }
    for (Ut = -1; ++Ut < G.length; ) {
      const Fe = i[G[Ut][0]];
      rx.call(Fe, G[Ut][1].type) && Fe[G[Ut][1].type].call(Object.assign({
        sliceSerialize: G[Ut][2].sliceSerialize
      }, yt), G[Ut][1]);
    }
    if (yt.tokenStack.length > 0) {
      const Fe = yt.tokenStack[yt.tokenStack.length - 1];
      (Fe[1] || f0).call(yt, void 0, Fe[0]);
    }
    for (it.position = {
      start: zi(G.length > 0 ? G[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: zi(G.length > 0 ? G[G.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Ut = -1; ++Ut < i.transforms.length; )
      it = i.transforms[Ut](it) || it;
    return it;
  }
  function s(G, it, yt) {
    let Mt = it - 1, Ut = -1, Fe = !1, Ln, Me, fe, Ne;
    for (; ++Mt <= yt; ) {
      const Pt = G[Mt];
      switch (Pt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Pt[0] === "enter" ? Ut++ : Ut--, Ne = void 0;
          break;
        }
        case "lineEndingBlank": {
          Pt[0] === "enter" && (Ln && !Ne && !Ut && !fe && (fe = Mt), Ne = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ne = void 0;
      }
      if (!Ut && Pt[0] === "enter" && Pt[1].type === "listItemPrefix" || Ut === -1 && Pt[0] === "exit" && (Pt[1].type === "listUnordered" || Pt[1].type === "listOrdered")) {
        if (Ln) {
          let ni = Mt;
          for (Me = void 0; ni--; ) {
            const gn = G[ni];
            if (gn[1].type === "lineEnding" || gn[1].type === "lineEndingBlank") {
              if (gn[0] === "exit") continue;
              Me && (G[Me][1].type = "lineEndingBlank", Fe = !0), gn[1].type = "lineEnding", Me = ni;
            } else if (!(gn[1].type === "linePrefix" || gn[1].type === "blockQuotePrefix" || gn[1].type === "blockQuotePrefixWhitespace" || gn[1].type === "blockQuoteMarker" || gn[1].type === "listItemIndent")) break;
          }
          fe && (!Me || fe < Me) && (Ln._spread = !0), Ln.end = Object.assign({}, Me ? G[Me][1].start : Pt[1].end), G.splice(Me || Mt, 0, ["exit", Ln, Pt[2]]), Mt++, yt++;
        }
        if (Pt[1].type === "listItemPrefix") {
          const ni = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Pt[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ln = ni, G.splice(Mt, 0, ["enter", ni, Pt[2]]), Mt++, yt++, fe = void 0, Ne = !0;
        }
      }
    }
    return G[it][1]._spread = Fe, yt;
  }
  function u(G, it) {
    return yt;
    function yt(Mt) {
      d.call(this, G(Mt), Mt), it && it.call(this, Mt);
    }
  }
  function f() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function d(G, it, yt) {
    this.stack[this.stack.length - 1].children.push(G), this.stack.push(G), this.tokenStack.push([it, yt || void 0]), G.position = {
      start: zi(it.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function m(G) {
    return it;
    function it(yt) {
      G && G.call(this, yt), p.call(this, yt);
    }
  }
  function p(G, it) {
    const yt = this.stack.pop(), Mt = this.tokenStack.pop();
    if (Mt)
      Mt[0].type !== G.type && (it ? it.call(this, G, Mt[0]) : (Mt[1] || f0).call(this, G, Mt[0]));
    else throw new Error("Cannot close `" + G.type + "` (" + xl({
      start: G.start,
      end: G.end
    }) + "): it’s not open");
    yt.position.end = zi(G.end);
  }
  function g() {
    return NM(this.stack.pop());
  }
  function y() {
    this.data.expectingFirstListItemValue = !0;
  }
  function b(G) {
    if (this.data.expectingFirstListItemValue) {
      const it = this.stack[this.stack.length - 2];
      it.start = Number.parseInt(this.sliceSerialize(G), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function x() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.lang = G;
  }
  function A() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.meta = G;
  }
  function z() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function D() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.value = G.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function M() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.value = G.replace(/(\r?\n|\r)$/g, "");
  }
  function H(G) {
    const it = this.resume(), yt = this.stack[this.stack.length - 1];
    yt.label = it, yt.identifier = or(this.sliceSerialize(G)).toLowerCase();
  }
  function _() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.title = G;
  }
  function F() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.url = G;
  }
  function K(G) {
    const it = this.stack[this.stack.length - 1];
    if (!it.depth) {
      const yt = this.sliceSerialize(G).length;
      it.depth = yt;
    }
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function I(G) {
    const it = this.stack[this.stack.length - 1];
    it.depth = this.sliceSerialize(G).codePointAt(0) === 61 ? 1 : 2;
  }
  function j() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function J(G) {
    const yt = this.stack[this.stack.length - 1].children;
    let Mt = yt[yt.length - 1];
    (!Mt || Mt.type !== "text") && (Mt = Ce(), Mt.position = {
      start: zi(G.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, yt.push(Mt)), this.stack.push(Mt);
  }
  function et(G) {
    const it = this.stack.pop();
    it.value += this.sliceSerialize(G), it.position.end = zi(G.end);
  }
  function W(G) {
    const it = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const yt = it.children[it.children.length - 1];
      yt.position.end = zi(G.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && i.canContainEols.includes(it.type) && (J.call(this, G), et.call(this, G));
  }
  function $() {
    this.data.atHardBreak = !0;
  }
  function vt() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.value = G;
  }
  function lt() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.value = G;
  }
  function Z() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.value = G;
  }
  function O() {
    const G = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const it = this.data.referenceType || "shortcut";
      G.type += "Reference", G.referenceType = it, delete G.url, delete G.title;
    } else
      delete G.identifier, delete G.label;
    this.data.referenceType = void 0;
  }
  function Q() {
    const G = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const it = this.data.referenceType || "shortcut";
      G.type += "Reference", G.referenceType = it, delete G.url, delete G.title;
    } else
      delete G.identifier, delete G.label;
    this.data.referenceType = void 0;
  }
  function nt(G) {
    const it = this.sliceSerialize(G), yt = this.stack[this.stack.length - 2];
    yt.label = _D(it), yt.identifier = or(it).toLowerCase();
  }
  function pt() {
    const G = this.stack[this.stack.length - 1], it = this.resume(), yt = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, yt.type === "link") {
      const Mt = G.children;
      yt.children = Mt;
    } else
      yt.alt = it;
  }
  function S() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.url = G;
  }
  function k() {
    const G = this.resume(), it = this.stack[this.stack.length - 1];
    it.title = G;
  }
  function q() {
    this.data.inReference = void 0;
  }
  function T() {
    this.data.referenceType = "collapsed";
  }
  function at(G) {
    const it = this.resume(), yt = this.stack[this.stack.length - 1];
    yt.label = it, yt.identifier = or(this.sliceSerialize(G)).toLowerCase(), this.data.referenceType = "full";
  }
  function st(G) {
    this.data.characterReferenceType = G.type;
  }
  function ot(G) {
    const it = this.sliceSerialize(G), yt = this.data.characterReferenceType;
    let Mt;
    yt ? (Mt = Z1(it, yt === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Mt = id(it);
    const Ut = this.stack[this.stack.length - 1];
    Ut.value += Mt;
  }
  function Et(G) {
    const it = this.stack.pop();
    it.position.end = zi(G.end);
  }
  function Xt(G) {
    et.call(this, G);
    const it = this.stack[this.stack.length - 1];
    it.url = this.sliceSerialize(G);
  }
  function bt(G) {
    et.call(this, G);
    const it = this.stack[this.stack.length - 1];
    it.url = "mailto:" + this.sliceSerialize(G);
  }
  function ke() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Oe() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Tn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function ei() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function _e() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function ha() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function da() {
    return {
      type: "break"
    };
  }
  function Ll() {
    return {
      type: "html",
      value: ""
    };
  }
  function Vl() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function pa() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ma(G) {
    return {
      type: "list",
      ordered: G.type === "listOrdered",
      start: null,
      spread: G._spread,
      children: []
    };
  }
  function mr(G) {
    return {
      type: "listItem",
      spread: G._spread,
      checked: null,
      children: []
    };
  }
  function qs() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ys() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ce() {
    return {
      type: "text",
      value: ""
    };
  }
  function Gs() {
    return {
      type: "thematicBreak"
    };
  }
}
function zi(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function lx(e, i) {
  let r = -1;
  for (; ++r < i.length; ) {
    const l = i[r];
    Array.isArray(l) ? lx(e, l) : BD(e, l);
  }
}
function BD(e, i) {
  let r;
  for (r in i)
    if (rx.call(i, r))
      switch (r) {
        case "canContainEols": {
          const l = i[r];
          l && e[r].push(...l);
          break;
        }
        case "transforms": {
          const l = i[r];
          l && e[r].push(...l);
          break;
        }
        case "enter":
        case "exit": {
          const l = i[r];
          l && Object.assign(e[r], l);
          break;
        }
      }
}
function f0(e, i) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + xl({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + i.type + "`, " + xl({
    start: i.start,
    end: i.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + i.type + "`, " + xl({
    start: i.start,
    end: i.end
  }) + ") is still open");
}
function UD(e) {
  const i = this;
  i.parser = r;
  function r(l) {
    return LD(l, {
      ...i.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: i.data("micromarkExtensions") || [],
      mdastExtensions: i.data("fromMarkdownExtensions") || []
    });
  }
}
function jD(e, i) {
  const r = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(i), !0)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function HD(e, i) {
  const r = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(i, r), [e.applyData(i, r), { type: "text", value: `
` }];
}
function qD(e, i) {
  const r = i.value ? i.value + `
` : "", l = {}, s = i.lang ? i.lang.split(/\s+/) : [];
  s.length > 0 && (l.className = ["language-" + s[0]]);
  let u = {
    type: "element",
    tagName: "code",
    properties: l,
    children: [{ type: "text", value: r }]
  };
  return i.meta && (u.data = { meta: i.meta }), e.patch(i, u), u = e.applyData(i, u), u = { type: "element", tagName: "pre", properties: {}, children: [u] }, e.patch(i, u), u;
}
function YD(e, i) {
  const r = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function GD(e, i) {
  const r = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function XD(e, i) {
  const r = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", l = String(i.identifier).toUpperCase(), s = pr(l.toLowerCase()), u = e.footnoteOrder.indexOf(l);
  let f, d = e.footnoteCounts.get(l);
  d === void 0 ? (d = 0, e.footnoteOrder.push(l), f = e.footnoteOrder.length) : f = u + 1, d += 1, e.footnoteCounts.set(l, d);
  const m = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + r + "fn-" + s,
      id: r + "fnref-" + s + (d > 1 ? "-" + d : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(f) }]
  };
  e.patch(i, m);
  const p = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [m]
  };
  return e.patch(i, p), e.applyData(i, p);
}
function PD(e, i) {
  const r = {
    type: "element",
    tagName: "h" + i.depth,
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function FD(e, i) {
  if (e.options.allowDangerousHtml) {
    const r = { type: "raw", value: i.value };
    return e.patch(i, r), e.applyData(i, r);
  }
}
function ox(e, i) {
  const r = i.referenceType;
  let l = "]";
  if (r === "collapsed" ? l += "[]" : r === "full" && (l += "[" + (i.label || i.identifier) + "]"), i.type === "imageReference")
    return [{ type: "text", value: "![" + i.alt + l }];
  const s = e.all(i), u = s[0];
  u && u.type === "text" ? u.value = "[" + u.value : s.unshift({ type: "text", value: "[" });
  const f = s[s.length - 1];
  return f && f.type === "text" ? f.value += l : s.push({ type: "text", value: l }), s;
}
function QD(e, i) {
  const r = String(i.identifier).toUpperCase(), l = e.definitionById.get(r);
  if (!l)
    return ox(e, i);
  const s = { src: pr(l.url || ""), alt: i.alt };
  l.title !== null && l.title !== void 0 && (s.title = l.title);
  const u = { type: "element", tagName: "img", properties: s, children: [] };
  return e.patch(i, u), e.applyData(i, u);
}
function KD(e, i) {
  const r = { src: pr(i.url) };
  i.alt !== null && i.alt !== void 0 && (r.alt = i.alt), i.title !== null && i.title !== void 0 && (r.title = i.title);
  const l = { type: "element", tagName: "img", properties: r, children: [] };
  return e.patch(i, l), e.applyData(i, l);
}
function ZD(e, i) {
  const r = { type: "text", value: i.value.replace(/\r?\n|\r/g, " ") };
  e.patch(i, r);
  const l = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [r]
  };
  return e.patch(i, l), e.applyData(i, l);
}
function ID(e, i) {
  const r = String(i.identifier).toUpperCase(), l = e.definitionById.get(r);
  if (!l)
    return ox(e, i);
  const s = { href: pr(l.url || "") };
  l.title !== null && l.title !== void 0 && (s.title = l.title);
  const u = {
    type: "element",
    tagName: "a",
    properties: s,
    children: e.all(i)
  };
  return e.patch(i, u), e.applyData(i, u);
}
function JD(e, i) {
  const r = { href: pr(i.url) };
  i.title !== null && i.title !== void 0 && (r.title = i.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: r,
    children: e.all(i)
  };
  return e.patch(i, l), e.applyData(i, l);
}
function WD(e, i, r) {
  const l = e.all(i), s = r ? $D(r) : sx(i), u = {}, f = [];
  if (typeof i.checked == "boolean") {
    const g = l[0];
    let y;
    g && g.type === "element" && g.tagName === "p" ? y = g : (y = { type: "element", tagName: "p", properties: {}, children: [] }, l.unshift(y)), y.children.length > 0 && y.children.unshift({ type: "text", value: " " }), y.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: i.checked, disabled: !0 },
      children: []
    }), u.className = ["task-list-item"];
  }
  let d = -1;
  for (; ++d < l.length; ) {
    const g = l[d];
    (s || d !== 0 || g.type !== "element" || g.tagName !== "p") && f.push({ type: "text", value: `
` }), g.type === "element" && g.tagName === "p" && !s ? f.push(...g.children) : f.push(g);
  }
  const m = l[l.length - 1];
  m && (s || m.type !== "element" || m.tagName !== "p") && f.push({ type: "text", value: `
` });
  const p = { type: "element", tagName: "li", properties: u, children: f };
  return e.patch(i, p), e.applyData(i, p);
}
function $D(e) {
  let i = !1;
  if (e.type === "list") {
    i = e.spread || !1;
    const r = e.children;
    let l = -1;
    for (; !i && ++l < r.length; )
      i = sx(r[l]);
  }
  return i;
}
function sx(e) {
  const i = e.spread;
  return i ?? e.children.length > 1;
}
function tR(e, i) {
  const r = {}, l = e.all(i);
  let s = -1;
  for (typeof i.start == "number" && i.start !== 1 && (r.start = i.start); ++s < l.length; ) {
    const f = l[s];
    if (f.type === "element" && f.tagName === "li" && f.properties && Array.isArray(f.properties.className) && f.properties.className.includes("task-list-item")) {
      r.className = ["contains-task-list"];
      break;
    }
  }
  const u = {
    type: "element",
    tagName: i.ordered ? "ol" : "ul",
    properties: r,
    children: e.wrap(l, !0)
  };
  return e.patch(i, u), e.applyData(i, u);
}
function eR(e, i) {
  const r = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function nR(e, i) {
  const r = { type: "root", children: e.wrap(e.all(i)) };
  return e.patch(i, r), e.applyData(i, r);
}
function iR(e, i) {
  const r = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
function aR(e, i) {
  const r = e.all(i), l = r.shift(), s = [];
  if (l) {
    const f = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([l], !0)
    };
    e.patch(i.children[0], f), s.push(f);
  }
  if (r.length > 0) {
    const f = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(r, !0)
    }, d = $h(i.children[1]), m = Y1(i.children[i.children.length - 1]);
    d && m && (f.position = { start: d, end: m }), s.push(f);
  }
  const u = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(i, u), e.applyData(i, u);
}
function rR(e, i, r) {
  const l = r ? r.children : void 0, u = (l ? l.indexOf(i) : 1) === 0 ? "th" : "td", f = r && r.type === "table" ? r.align : void 0, d = f ? f.length : i.children.length;
  let m = -1;
  const p = [];
  for (; ++m < d; ) {
    const y = i.children[m], b = {}, x = f ? f[m] : void 0;
    x && (b.align = x);
    let A = { type: "element", tagName: u, properties: b, children: [] };
    y && (A.children = e.all(y), e.patch(y, A), A = e.applyData(y, A)), p.push(A);
  }
  const g = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(p, !0)
  };
  return e.patch(i, g), e.applyData(i, g);
}
function lR(e, i) {
  const r = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, r), e.applyData(i, r);
}
const h0 = 9, d0 = 32;
function oR(e) {
  const i = String(e), r = /\r?\n|\r/g;
  let l = r.exec(i), s = 0;
  const u = [];
  for (; l; )
    u.push(
      p0(i.slice(s, l.index), s > 0, !0),
      l[0]
    ), s = l.index + l[0].length, l = r.exec(i);
  return u.push(p0(i.slice(s), s > 0, !1)), u.join("");
}
function p0(e, i, r) {
  let l = 0, s = e.length;
  if (i) {
    let u = e.codePointAt(l);
    for (; u === h0 || u === d0; )
      l++, u = e.codePointAt(l);
  }
  if (r) {
    let u = e.codePointAt(s - 1);
    for (; u === h0 || u === d0; )
      s--, u = e.codePointAt(s - 1);
  }
  return s > l ? e.slice(l, s) : "";
}
function sR(e, i) {
  const r = { type: "text", value: oR(String(i.value)) };
  return e.patch(i, r), e.applyData(i, r);
}
function uR(e, i) {
  const r = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(i, r), e.applyData(i, r);
}
const cR = {
  blockquote: jD,
  break: HD,
  code: qD,
  delete: YD,
  emphasis: GD,
  footnoteReference: XD,
  heading: PD,
  html: FD,
  imageReference: QD,
  image: KD,
  inlineCode: ZD,
  linkReference: ID,
  link: JD,
  listItem: WD,
  list: tR,
  paragraph: eR,
  // @ts-expect-error: root is different, but hard to type.
  root: nR,
  strong: iR,
  table: aR,
  tableCell: lR,
  tableRow: rR,
  text: sR,
  thematicBreak: uR,
  toml: ss,
  yaml: ss,
  definition: ss,
  footnoteDefinition: ss
};
function ss() {
}
const ux = -1, js = 0, Sl = 1, Ds = 2, ld = 3, od = 4, sd = 5, ud = 6, cx = 7, fx = 8, m0 = typeof self == "object" ? self : globalThis, fR = (e, i) => {
  const r = (s, u) => (e.set(u, s), s), l = (s) => {
    if (e.has(s))
      return e.get(s);
    const [u, f] = i[s];
    switch (u) {
      case js:
      case ux:
        return r(f, s);
      case Sl: {
        const d = r([], s);
        for (const m of f)
          d.push(l(m));
        return d;
      }
      case Ds: {
        const d = r({}, s);
        for (const [m, p] of f)
          d[l(m)] = l(p);
        return d;
      }
      case ld:
        return r(new Date(f), s);
      case od: {
        const { source: d, flags: m } = f;
        return r(new RegExp(d, m), s);
      }
      case sd: {
        const d = r(/* @__PURE__ */ new Map(), s);
        for (const [m, p] of f)
          d.set(l(m), l(p));
        return d;
      }
      case ud: {
        const d = r(/* @__PURE__ */ new Set(), s);
        for (const m of f)
          d.add(l(m));
        return d;
      }
      case cx: {
        const { name: d, message: m } = f;
        return r(new m0[d](m), s);
      }
      case fx:
        return r(BigInt(f), s);
      case "BigInt":
        return r(Object(BigInt(f)), s);
      case "ArrayBuffer":
        return r(new Uint8Array(f).buffer, f);
      case "DataView": {
        const { buffer: d } = new Uint8Array(f);
        return r(new DataView(d), f);
      }
    }
    return r(new m0[u](f), s);
  };
  return l;
}, g0 = (e) => fR(/* @__PURE__ */ new Map(), e)(0), er = "", { toString: hR } = {}, { keys: dR } = Object, pl = (e) => {
  const i = typeof e;
  if (i !== "object" || !e)
    return [js, i];
  const r = hR.call(e).slice(8, -1);
  switch (r) {
    case "Array":
      return [Sl, er];
    case "Object":
      return [Ds, er];
    case "Date":
      return [ld, er];
    case "RegExp":
      return [od, er];
    case "Map":
      return [sd, er];
    case "Set":
      return [ud, er];
    case "DataView":
      return [Sl, r];
  }
  return r.includes("Array") ? [Sl, r] : r.includes("Error") ? [cx, r] : [Ds, r];
}, us = ([e, i]) => e === js && (i === "function" || i === "symbol"), pR = (e, i, r, l) => {
  const s = (f, d) => {
    const m = l.push(f) - 1;
    return r.set(d, m), m;
  }, u = (f) => {
    if (r.has(f))
      return r.get(f);
    let [d, m] = pl(f);
    switch (d) {
      case js: {
        let g = f;
        switch (m) {
          case "bigint":
            d = fx, g = f.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + m);
            g = null;
            break;
          case "undefined":
            return s([ux], f);
        }
        return s([d, g], f);
      }
      case Sl: {
        if (m) {
          let b = f;
          return m === "DataView" ? b = new Uint8Array(f.buffer) : m === "ArrayBuffer" && (b = new Uint8Array(f)), s([m, [...b]], f);
        }
        const g = [], y = s([d, g], f);
        for (const b of f)
          g.push(u(b));
        return y;
      }
      case Ds: {
        if (m)
          switch (m) {
            case "BigInt":
              return s([m, f.toString()], f);
            case "Boolean":
            case "Number":
            case "String":
              return s([m, f.valueOf()], f);
          }
        if (i && "toJSON" in f)
          return u(f.toJSON());
        const g = [], y = s([d, g], f);
        for (const b of dR(f))
          (e || !us(pl(f[b]))) && g.push([u(b), u(f[b])]);
        return y;
      }
      case ld:
        return s([d, f.toISOString()], f);
      case od: {
        const { source: g, flags: y } = f;
        return s([d, { source: g, flags: y }], f);
      }
      case sd: {
        const g = [], y = s([d, g], f);
        for (const [b, x] of f)
          (e || !(us(pl(b)) || us(pl(x)))) && g.push([u(b), u(x)]);
        return y;
      }
      case ud: {
        const g = [], y = s([d, g], f);
        for (const b of f)
          (e || !us(pl(b))) && g.push(u(b));
        return y;
      }
    }
    const { message: p } = f;
    return s([d, { name: m, message: p }], f);
  };
  return u;
}, y0 = (e, { json: i, lossy: r } = {}) => {
  const l = [];
  return pR(!(i || r), !!i, /* @__PURE__ */ new Map(), l)(e), l;
}, Rs = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, i) => i && ("json" in i || "lossy" in i) ? g0(y0(e, i)) : structuredClone(e)
) : (e, i) => g0(y0(e, i));
function mR(e, i) {
  const r = [{ type: "text", value: "↩" }];
  return i > 1 && r.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(i) }]
  }), r;
}
function gR(e, i) {
  return "Back to reference " + (e + 1) + (i > 1 ? "-" + i : "");
}
function yR(e) {
  const i = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = e.options.footnoteBackContent || mR, l = e.options.footnoteBackLabel || gR, s = e.options.footnoteLabel || "Footnotes", u = e.options.footnoteLabelTagName || "h2", f = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, d = [];
  let m = -1;
  for (; ++m < e.footnoteOrder.length; ) {
    const p = e.footnoteById.get(
      e.footnoteOrder[m]
    );
    if (!p)
      continue;
    const g = e.all(p), y = String(p.identifier).toUpperCase(), b = pr(y.toLowerCase());
    let x = 0;
    const A = [], z = e.footnoteCounts.get(y);
    for (; z !== void 0 && ++x <= z; ) {
      A.length > 0 && A.push({ type: "text", value: " " });
      let H = typeof r == "string" ? r : r(m, x);
      typeof H == "string" && (H = { type: "text", value: H }), A.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + i + "fnref-" + b + (x > 1 ? "-" + x : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof l == "string" ? l : l(m, x),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(H) ? H : [H]
      });
    }
    const D = g[g.length - 1];
    if (D && D.type === "element" && D.tagName === "p") {
      const H = D.children[D.children.length - 1];
      H && H.type === "text" ? H.value += " " : D.children.push({ type: "text", value: " " }), D.children.push(...A);
    } else
      g.push(...A);
    const M = {
      type: "element",
      tagName: "li",
      properties: { id: i + "fn-" + b },
      children: e.wrap(g, !0)
    };
    e.patch(p, M), d.push(M);
  }
  if (d.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: u,
          properties: {
            ...Rs(f),
            id: "footnote-label"
          },
          children: [{ type: "text", value: s }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(d, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const hx = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return wR;
    if (typeof e == "function")
      return Hs(e);
    if (typeof e == "object")
      return Array.isArray(e) ? vR(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        bR(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return xR(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function vR(e) {
  const i = [];
  let r = -1;
  for (; ++r < e.length; )
    i[r] = hx(e[r]);
  return Hs(l);
  function l(...s) {
    let u = -1;
    for (; ++u < i.length; )
      if (i[u].apply(this, s)) return !0;
    return !1;
  }
}
function bR(e) {
  const i = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Hs(r);
  function r(l) {
    const s = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      l
    );
    let u;
    for (u in e)
      if (s[u] !== i[u]) return !1;
    return !0;
  }
}
function xR(e) {
  return Hs(i);
  function i(r) {
    return r && r.type === e;
  }
}
function Hs(e) {
  return i;
  function i(r, l, s) {
    return !!(SR(r) && e.call(
      this,
      r,
      typeof l == "number" ? l : void 0,
      s || void 0
    ));
  }
}
function wR() {
  return !0;
}
function SR(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const dx = [], TR = !0, v0 = !1, ER = "skip";
function AR(e, i, r, l) {
  let s;
  typeof i == "function" && typeof r != "function" ? (l = r, r = i) : s = i;
  const u = hx(s), f = l ? -1 : 1;
  d(e, void 0, [])();
  function d(m, p, g) {
    const y = (
      /** @type {Record<string, unknown>} */
      m && typeof m == "object" ? m : {}
    );
    if (typeof y.type == "string") {
      const x = (
        // `hast`
        typeof y.tagName == "string" ? y.tagName : (
          // `xast`
          typeof y.name == "string" ? y.name : void 0
        )
      );
      Object.defineProperty(b, "name", {
        value: "node (" + (m.type + (x ? "<" + x + ">" : "")) + ")"
      });
    }
    return b;
    function b() {
      let x = dx, A, z, D;
      if ((!i || u(m, p, g[g.length - 1] || void 0)) && (x = kR(r(m, g)), x[0] === v0))
        return x;
      if ("children" in m && m.children) {
        const M = (
          /** @type {UnistParent} */
          m
        );
        if (M.children && x[0] !== ER)
          for (z = (l ? M.children.length : -1) + f, D = g.concat(M); z > -1 && z < M.children.length; ) {
            const H = M.children[z];
            if (A = d(H, z, D)(), A[0] === v0)
              return A;
            z = typeof A[1] == "number" ? A[1] : z + f;
          }
      }
      return x;
    }
  }
}
function kR(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [TR, e] : e == null ? dx : [e];
}
function px(e, i, r, l) {
  let s, u, f;
  typeof i == "function" && typeof r != "function" ? (u = void 0, f = i, s = r) : (u = i, f = r, s = l), AR(e, u, d, s);
  function d(m, p) {
    const g = p[p.length - 1], y = g ? g.children.indexOf(m) : void 0;
    return f(m, y, g);
  }
}
const yh = {}.hasOwnProperty, CR = {};
function MR(e, i) {
  const r = i || CR, l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), f = { ...cR, ...r.handlers }, d = {
    all: p,
    applyData: DR,
    definitionById: l,
    footnoteById: s,
    footnoteCounts: u,
    footnoteOrder: [],
    handlers: f,
    one: m,
    options: r,
    patch: zR,
    wrap: OR
  };
  return px(e, function(g) {
    if (g.type === "definition" || g.type === "footnoteDefinition") {
      const y = g.type === "definition" ? l : s, b = String(g.identifier).toUpperCase();
      y.has(b) || y.set(b, g);
    }
  }), d;
  function m(g, y) {
    const b = g.type, x = d.handlers[b];
    if (yh.call(d.handlers, b) && x)
      return x(d, g, y);
    if (d.options.passThrough && d.options.passThrough.includes(b)) {
      if ("children" in g) {
        const { children: z, ...D } = g, M = Rs(D);
        return M.children = d.all(g), M;
      }
      return Rs(g);
    }
    return (d.options.unknownHandler || RR)(d, g, y);
  }
  function p(g) {
    const y = [];
    if ("children" in g) {
      const b = g.children;
      let x = -1;
      for (; ++x < b.length; ) {
        const A = d.one(b[x], g);
        if (A) {
          if (x && b[x - 1].type === "break" && (!Array.isArray(A) && A.type === "text" && (A.value = b0(A.value)), !Array.isArray(A) && A.type === "element")) {
            const z = A.children[0];
            z && z.type === "text" && (z.value = b0(z.value));
          }
          Array.isArray(A) ? y.push(...A) : y.push(A);
        }
      }
    }
    return y;
  }
}
function zR(e, i) {
  e.position && (i.position = hM(e));
}
function DR(e, i) {
  let r = i;
  if (e && e.data) {
    const l = e.data.hName, s = e.data.hChildren, u = e.data.hProperties;
    if (typeof l == "string")
      if (r.type === "element")
        r.tagName = l;
      else {
        const f = "children" in r ? r.children : [r];
        r = { type: "element", tagName: l, properties: {}, children: f };
      }
    r.type === "element" && u && Object.assign(r.properties, Rs(u)), "children" in r && r.children && s !== null && s !== void 0 && (r.children = s);
  }
  return r;
}
function RR(e, i) {
  const r = i.data || {}, l = "value" in i && !(yh.call(r, "hProperties") || yh.call(r, "hChildren")) ? { type: "text", value: i.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(i)
  };
  return e.patch(i, l), e.applyData(i, l);
}
function OR(e, i) {
  const r = [];
  let l = -1;
  for (i && r.push({ type: "text", value: `
` }); ++l < e.length; )
    l && r.push({ type: "text", value: `
` }), r.push(e[l]);
  return i && e.length > 0 && r.push({ type: "text", value: `
` }), r;
}
function b0(e) {
  let i = 0, r = e.charCodeAt(i);
  for (; r === 9 || r === 32; )
    i++, r = e.charCodeAt(i);
  return e.slice(i);
}
function x0(e, i) {
  const r = MR(e, i), l = r.one(e, void 0), s = yR(r), u = Array.isArray(l) ? { type: "root", children: l } : l || { type: "root", children: [] };
  return s && u.children.push({ type: "text", value: `
` }, s), u;
}
function _R(e, i) {
  return e && "run" in e ? async function(r, l) {
    const s = (
      /** @type {HastRoot} */
      x0(r, { file: l, ...i })
    );
    await e.run(s, l);
  } : function(r, l) {
    return (
      /** @type {HastRoot} */
      x0(r, { file: l, ...e || i })
    );
  };
}
function w0(e) {
  if (e)
    throw e;
}
var Rf, S0;
function NR() {
  if (S0) return Rf;
  S0 = 1;
  var e = Object.prototype.hasOwnProperty, i = Object.prototype.toString, r = Object.defineProperty, l = Object.getOwnPropertyDescriptor, s = function(p) {
    return typeof Array.isArray == "function" ? Array.isArray(p) : i.call(p) === "[object Array]";
  }, u = function(p) {
    if (!p || i.call(p) !== "[object Object]")
      return !1;
    var g = e.call(p, "constructor"), y = p.constructor && p.constructor.prototype && e.call(p.constructor.prototype, "isPrototypeOf");
    if (p.constructor && !g && !y)
      return !1;
    var b;
    for (b in p)
      ;
    return typeof b > "u" || e.call(p, b);
  }, f = function(p, g) {
    r && g.name === "__proto__" ? r(p, g.name, {
      enumerable: !0,
      configurable: !0,
      value: g.newValue,
      writable: !0
    }) : p[g.name] = g.newValue;
  }, d = function(p, g) {
    if (g === "__proto__")
      if (e.call(p, g)) {
        if (l)
          return l(p, g).value;
      } else return;
    return p[g];
  };
  return Rf = function m() {
    var p, g, y, b, x, A, z = arguments[0], D = 1, M = arguments.length, H = !1;
    for (typeof z == "boolean" && (H = z, z = arguments[1] || {}, D = 2), (z == null || typeof z != "object" && typeof z != "function") && (z = {}); D < M; ++D)
      if (p = arguments[D], p != null)
        for (g in p)
          y = d(z, g), b = d(p, g), z !== b && (H && b && (u(b) || (x = s(b))) ? (x ? (x = !1, A = y && s(y) ? y : []) : A = y && u(y) ? y : {}, f(z, { name: g, newValue: m(H, A, b) })) : typeof b < "u" && f(z, { name: g, newValue: b }));
    return z;
  }, Rf;
}
var LR = NR();
const Of = /* @__PURE__ */ O0(LR);
function vh(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const i = Object.getPrototypeOf(e);
  return (i === null || i === Object.prototype || Object.getPrototypeOf(i) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function VR() {
  const e = [], i = { run: r, use: l };
  return i;
  function r(...s) {
    let u = -1;
    const f = s.pop();
    if (typeof f != "function")
      throw new TypeError("Expected function as last argument, not " + f);
    d(null, ...s);
    function d(m, ...p) {
      const g = e[++u];
      let y = -1;
      if (m) {
        f(m);
        return;
      }
      for (; ++y < s.length; )
        (p[y] === null || p[y] === void 0) && (p[y] = s[y]);
      s = p, g ? BR(g, d)(...p) : f(null, ...p);
    }
  }
  function l(s) {
    if (typeof s != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + s
      );
    return e.push(s), i;
  }
}
function BR(e, i) {
  let r;
  return l;
  function l(...f) {
    const d = e.length > f.length;
    let m;
    d && f.push(s);
    try {
      m = e.apply(this, f);
    } catch (p) {
      const g = (
        /** @type {Error} */
        p
      );
      if (d && r)
        throw g;
      return s(g);
    }
    d || (m && m.then && typeof m.then == "function" ? m.then(u, s) : m instanceof Error ? s(m) : u(m));
  }
  function s(f, ...d) {
    r || (r = !0, i(f, ...d));
  }
  function u(f) {
    s(null, f);
  }
}
const zn = { basename: UR, dirname: jR, extname: HR, join: qR, sep: "/" };
function UR(e, i) {
  if (i !== void 0 && typeof i != "string")
    throw new TypeError('"ext" argument must be a string');
  Nl(e);
  let r = 0, l = -1, s = e.length, u;
  if (i === void 0 || i.length === 0 || i.length > e.length) {
    for (; s--; )
      if (e.codePointAt(s) === 47) {
        if (u) {
          r = s + 1;
          break;
        }
      } else l < 0 && (u = !0, l = s + 1);
    return l < 0 ? "" : e.slice(r, l);
  }
  if (i === e)
    return "";
  let f = -1, d = i.length - 1;
  for (; s--; )
    if (e.codePointAt(s) === 47) {
      if (u) {
        r = s + 1;
        break;
      }
    } else
      f < 0 && (u = !0, f = s + 1), d > -1 && (e.codePointAt(s) === i.codePointAt(d--) ? d < 0 && (l = s) : (d = -1, l = f));
  return r === l ? l = f : l < 0 && (l = e.length), e.slice(r, l);
}
function jR(e) {
  if (Nl(e), e.length === 0)
    return ".";
  let i = -1, r = e.length, l;
  for (; --r; )
    if (e.codePointAt(r) === 47) {
      if (l) {
        i = r;
        break;
      }
    } else l || (l = !0);
  return i < 0 ? e.codePointAt(0) === 47 ? "/" : "." : i === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, i);
}
function HR(e) {
  Nl(e);
  let i = e.length, r = -1, l = 0, s = -1, u = 0, f;
  for (; i--; ) {
    const d = e.codePointAt(i);
    if (d === 47) {
      if (f) {
        l = i + 1;
        break;
      }
      continue;
    }
    r < 0 && (f = !0, r = i + 1), d === 46 ? s < 0 ? s = i : u !== 1 && (u = 1) : s > -1 && (u = -1);
  }
  return s < 0 || r < 0 || // We saw a non-dot character immediately before the dot.
  u === 0 || // The (right-most) trimmed path component is exactly `..`.
  u === 1 && s === r - 1 && s === l + 1 ? "" : e.slice(s, r);
}
function qR(...e) {
  let i = -1, r;
  for (; ++i < e.length; )
    Nl(e[i]), e[i] && (r = r === void 0 ? e[i] : r + "/" + e[i]);
  return r === void 0 ? "." : YR(r);
}
function YR(e) {
  Nl(e);
  const i = e.codePointAt(0) === 47;
  let r = GR(e, !i);
  return r.length === 0 && !i && (r = "."), r.length > 0 && e.codePointAt(e.length - 1) === 47 && (r += "/"), i ? "/" + r : r;
}
function GR(e, i) {
  let r = "", l = 0, s = -1, u = 0, f = -1, d, m;
  for (; ++f <= e.length; ) {
    if (f < e.length)
      d = e.codePointAt(f);
    else {
      if (d === 47)
        break;
      d = 47;
    }
    if (d === 47) {
      if (!(s === f - 1 || u === 1)) if (s !== f - 1 && u === 2) {
        if (r.length < 2 || l !== 2 || r.codePointAt(r.length - 1) !== 46 || r.codePointAt(r.length - 2) !== 46) {
          if (r.length > 2) {
            if (m = r.lastIndexOf("/"), m !== r.length - 1) {
              m < 0 ? (r = "", l = 0) : (r = r.slice(0, m), l = r.length - 1 - r.lastIndexOf("/")), s = f, u = 0;
              continue;
            }
          } else if (r.length > 0) {
            r = "", l = 0, s = f, u = 0;
            continue;
          }
        }
        i && (r = r.length > 0 ? r + "/.." : "..", l = 2);
      } else
        r.length > 0 ? r += "/" + e.slice(s + 1, f) : r = e.slice(s + 1, f), l = f - s - 1;
      s = f, u = 0;
    } else d === 46 && u > -1 ? u++ : u = -1;
  }
  return r;
}
function Nl(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const XR = { cwd: PR };
function PR() {
  return "/";
}
function bh(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function FR(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!bh(e)) {
    const i = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw i.code = "ERR_INVALID_ARG_TYPE", i;
  }
  if (e.protocol !== "file:") {
    const i = new TypeError("The URL must be of scheme file");
    throw i.code = "ERR_INVALID_URL_SCHEME", i;
  }
  return QR(e);
}
function QR(e) {
  if (e.hostname !== "") {
    const l = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw l.code = "ERR_INVALID_FILE_URL_HOST", l;
  }
  const i = e.pathname;
  let r = -1;
  for (; ++r < i.length; )
    if (i.codePointAt(r) === 37 && i.codePointAt(r + 1) === 50) {
      const l = i.codePointAt(r + 2);
      if (l === 70 || l === 102) {
        const s = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw s.code = "ERR_INVALID_FILE_URL_PATH", s;
      }
    }
  return decodeURIComponent(i);
}
const _f = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class mx {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(i) {
    let r;
    i ? bh(i) ? r = { path: i } : typeof i == "string" || KR(i) ? r = { value: i } : r = i : r = {}, this.cwd = "cwd" in r ? "" : XR.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let l = -1;
    for (; ++l < _f.length; ) {
      const u = _f[l];
      u in r && r[u] !== void 0 && r[u] !== null && (this[u] = u === "history" ? [...r[u]] : r[u]);
    }
    let s;
    for (s in r)
      _f.includes(s) || (this[s] = r[s]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? zn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(i) {
    Lf(i, "basename"), Nf(i, "basename"), this.path = zn.join(this.dirname || "", i);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? zn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(i) {
    T0(this.basename, "dirname"), this.path = zn.join(i || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? zn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(i) {
    if (Nf(i, "extname"), T0(this.dirname, "extname"), i) {
      if (i.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (i.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = zn.join(this.dirname, this.stem + (i || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(i) {
    bh(i) && (i = FR(i)), Lf(i, "path"), this.path !== i && this.history.push(i);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? zn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(i) {
    Lf(i, "stem"), Nf(i, "stem"), this.path = zn.join(this.dirname || "", i + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(i, r, l) {
    const s = this.message(i, r, l);
    throw s.fatal = !0, s;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(i, r, l) {
    const s = this.message(i, r, l);
    return s.fatal = void 0, s;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(i, r, l) {
    const s = new Ae(
      // @ts-expect-error: the overloads are fine.
      i,
      r,
      l
    );
    return this.path && (s.name = this.path + ":" + s.name, s.file = this.path), s.fatal = !1, this.messages.push(s), s;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(i) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(i || void 0).decode(this.value);
  }
}
function Nf(e, i) {
  if (e && e.includes(zn.sep))
    throw new Error(
      "`" + i + "` cannot be a path: did not expect `" + zn.sep + "`"
    );
}
function Lf(e, i) {
  if (!e)
    throw new Error("`" + i + "` cannot be empty");
}
function T0(e, i) {
  if (!e)
    throw new Error("Setting `" + i + "` requires `path` to be set too");
}
function KR(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ZR = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(e) {
    const l = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), s = l[e], u = function() {
      return s.apply(u, arguments);
    };
    return Object.setPrototypeOf(u, l), u;
  })
), IR = {}.hasOwnProperty;
class cd extends ZR {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = VR();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const i = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new cd()
    );
    let r = -1;
    for (; ++r < this.attachers.length; ) {
      const l = this.attachers[r];
      i.use(...l);
    }
    return i.data(Of(!0, {}, this.namespace)), i;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(i, r) {
    return typeof i == "string" ? arguments.length === 2 ? (Uf("data", this.frozen), this.namespace[i] = r, this) : IR.call(this.namespace, i) && this.namespace[i] || void 0 : i ? (Uf("data", this.frozen), this.namespace = i, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const i = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [r, ...l] = this.attachers[this.freezeIndex];
      if (l[0] === !1)
        continue;
      l[0] === !0 && (l[0] = void 0);
      const s = r.call(i, ...l);
      typeof s == "function" && this.transformers.use(s);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(i) {
    this.freeze();
    const r = cs(i), l = this.parser || this.Parser;
    return Vf("parse", l), l(String(r), r);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(i, r) {
    const l = this;
    return this.freeze(), Vf("process", this.parser || this.Parser), Bf("process", this.compiler || this.Compiler), r ? s(void 0, r) : new Promise(s);
    function s(u, f) {
      const d = cs(i), m = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        l.parse(d)
      );
      l.run(m, d, function(g, y, b) {
        if (g || !y || !b)
          return p(g);
        const x = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          y
        ), A = l.stringify(x, b);
        $R(A) ? b.value = A : b.result = A, p(
          g,
          /** @type {VFileWithOutput<CompileResult>} */
          b
        );
      });
      function p(g, y) {
        g || !y ? f(g) : u ? u(y) : r(void 0, y);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(i) {
    let r = !1, l;
    return this.freeze(), Vf("processSync", this.parser || this.Parser), Bf("processSync", this.compiler || this.Compiler), this.process(i, s), A0("processSync", "process", r), l;
    function s(u, f) {
      r = !0, w0(u), l = f;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(i, r, l) {
    E0(i), this.freeze();
    const s = this.transformers;
    return !l && typeof r == "function" && (l = r, r = void 0), l ? u(void 0, l) : new Promise(u);
    function u(f, d) {
      const m = cs(r);
      s.run(i, m, p);
      function p(g, y, b) {
        const x = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          y || i
        );
        g ? d(g) : f ? f(x) : l(void 0, x, b);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(i, r) {
    let l = !1, s;
    return this.run(i, r, u), A0("runSync", "run", l), s;
    function u(f, d) {
      w0(f), s = d, l = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(i, r) {
    this.freeze();
    const l = cs(r), s = this.compiler || this.Compiler;
    return Bf("stringify", s), E0(i), s(i, l);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(i, ...r) {
    const l = this.attachers, s = this.namespace;
    if (Uf("use", this.frozen), i != null) if (typeof i == "function")
      m(i, r);
    else if (typeof i == "object")
      Array.isArray(i) ? d(i) : f(i);
    else
      throw new TypeError("Expected usable value, not `" + i + "`");
    return this;
    function u(p) {
      if (typeof p == "function")
        m(p, []);
      else if (typeof p == "object")
        if (Array.isArray(p)) {
          const [g, ...y] = (
            /** @type {PluginTuple<Array<unknown>>} */
            p
          );
          m(g, y);
        } else
          f(p);
      else
        throw new TypeError("Expected usable value, not `" + p + "`");
    }
    function f(p) {
      if (!("plugins" in p) && !("settings" in p))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      d(p.plugins), p.settings && (s.settings = Of(!0, s.settings, p.settings));
    }
    function d(p) {
      let g = -1;
      if (p != null) if (Array.isArray(p))
        for (; ++g < p.length; ) {
          const y = p[g];
          u(y);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + p + "`");
    }
    function m(p, g) {
      let y = -1, b = -1;
      for (; ++y < l.length; )
        if (l[y][0] === p) {
          b = y;
          break;
        }
      if (b === -1)
        l.push([p, ...g]);
      else if (g.length > 0) {
        let [x, ...A] = g;
        const z = l[b][1];
        vh(z) && vh(x) && (x = Of(!0, z, x)), l[b] = [p, x, ...A];
      }
    }
  }
}
const JR = new cd().freeze();
function Vf(e, i) {
  if (typeof i != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Bf(e, i) {
  if (typeof i != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Uf(e, i) {
  if (i)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function E0(e) {
  if (!vh(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function A0(e, i, r) {
  if (!r)
    throw new Error(
      "`" + e + "` finished async. Use `" + i + "` instead"
    );
}
function cs(e) {
  return WR(e) ? e : new mx(e);
}
function WR(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function $R(e) {
  return typeof e == "string" || t3(e);
}
function t3(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const e3 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", k0 = [], C0 = { allowDangerousHtml: !0 }, n3 = /^(https?|ircs?|mailto|xmpp)$/i, i3 = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function a3(e) {
  const i = r3(e), r = l3(e);
  return o3(i.runSync(i.parse(r), r), e);
}
function r3(e) {
  const i = e.rehypePlugins || k0, r = e.remarkPlugins || k0, l = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...C0 } : C0;
  return JR().use(UD).use(r).use(_R, l).use(i);
}
function l3(e) {
  const i = e.children || "", r = new mx();
  return typeof i == "string" && (r.value = i), r;
}
function o3(e, i) {
  const r = i.allowedElements, l = i.allowElement, s = i.components, u = i.disallowedElements, f = i.skipHtml, d = i.unwrapDisallowed, m = i.urlTransform || s3;
  for (const g of i3)
    Object.hasOwn(i, g.from) && ("" + g.from + (g.to ? "use `" + g.to + "` instead" : "remove it") + e3 + g.id, void 0);
  return px(e, p), yM(e, {
    Fragment: St.Fragment,
    components: s,
    ignoreInvalidStyle: !0,
    jsx: St.jsx,
    jsxs: St.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function p(g, y, b) {
    if (g.type === "raw" && b && typeof y == "number")
      return f ? b.children.splice(y, 1) : b.children[y] = { type: "text", value: g.value }, y;
    if (g.type === "element") {
      let x;
      for (x in Mf)
        if (Object.hasOwn(Mf, x) && Object.hasOwn(g.properties, x)) {
          const A = g.properties[x], z = Mf[x];
          (z === null || z.includes(g.tagName)) && (g.properties[x] = m(String(A || ""), x, g));
        }
    }
    if (g.type === "element") {
      let x = r ? !r.includes(g.tagName) : u ? u.includes(g.tagName) : !1;
      if (!x && l && typeof y == "number" && (x = !l(g, y, b)), x && b && typeof y == "number")
        return d && g.children ? b.children.splice(y, 1, ...g.children) : b.children.splice(y, 1), y;
    }
  }
}
function s3(e) {
  const i = e.indexOf(":"), r = e.indexOf("?"), l = e.indexOf("#"), s = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    i === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    s !== -1 && i > s || r !== -1 && i > r || l !== -1 && i > l || // It is a protocol, it should be allowed.
    n3.test(e.slice(0, i)) ? e : ""
  );
}
const u3 = "/api/concierge-chat", c3 = "Hello! I am the virtual manager of Diamond Banquet Hall. How can I help you plan your event today?";
function f3({ endpoint: e = u3 }) {
  const [i, r] = rt.useState(!1), [l, s] = rt.useState([{ role: "model", text: c3 }]), [u, f] = rt.useState(""), [d, m] = rt.useState(!1), p = rt.useRef(null), g = () => {
    var b;
    (b = p.current) == null || b.scrollIntoView({ behavior: "smooth" });
  };
  rt.useEffect(() => {
    i && g();
  }, [l, i]);
  const y = async () => {
    if (!u.trim()) return;
    const b = u.trim(), x = [...l, { role: "user", text: b }];
    f(""), s(x), m(!0);
    try {
      const A = await fetch(e, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: x
        })
      }), z = await A.json().catch(() => null);
      if (!A.ok || !(z != null && z.reply))
        throw new Error((z == null ? void 0 : z.error) || "Chat request failed");
      s((D) => [...D, { role: "model", text: z.reply }]);
    } catch (A) {
      console.error("Error generating response:", A), s((z) => [
        ...z,
        {
          role: "model",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us via WhatsApp."
        }
      ]);
    } finally {
      m(!1);
    }
  };
  return /* @__PURE__ */ St.jsxs(St.Fragment, { children: [
    /* @__PURE__ */ St.jsx(Lk, { children: i && /* @__PURE__ */ St.jsxs(
      os.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        className: "fixed bottom-24 right-4 z-50 flex h-[500px] max-h-[calc(100vh-120px)] w-[350px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl sm:right-8",
        children: [
          /* @__PURE__ */ St.jsxs("div", { className: "bg-amber-600 p-4 text-white flex justify-between items-center", children: [
            /* @__PURE__ */ St.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ St.jsx(KS, { className: "w-5 h-5 text-amber-100" }),
              /* @__PURE__ */ St.jsx("span", { className: "font-medium", children: "Diamond Concierge" })
            ] }),
            /* @__PURE__ */ St.jsx(
              "button",
              {
                onClick: () => r(!1),
                type: "button",
                "aria-label": "Close concierge chat",
                className: "text-amber-100 hover:text-white transition",
                children: /* @__PURE__ */ St.jsx(vy, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ St.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50", children: [
            l.map((b, x) => /* @__PURE__ */ St.jsx(
              os.div,
              {
                initial: { opacity: 0, y: 10, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.3, ease: "easeOut" },
                className: Ay(
                  "flex max-w-[85%]",
                  b.role === "user" ? "ml-auto justify-end" : "justify-start"
                ),
                children: /* @__PURE__ */ St.jsx(
                  os.div,
                  {
                    whileHover: b.role === "user" ? { scale: 1.02, backgroundColor: "#262626" } : {},
                    className: Ay(
                      "origin-bottom-right rounded-2xl p-3 text-sm shadow-sm transition-all",
                      b.role === "user" ? "cursor-default rounded-br-sm bg-neutral-900 text-white" : "rounded-bl-sm border border-neutral-100 bg-white text-neutral-800"
                    ),
                    children: b.role === "model" ? /* @__PURE__ */ St.jsx("div", { className: "prose prose-sm prose-p:my-1 prose-ul:my-1 prose-neutral", children: /* @__PURE__ */ St.jsx(a3, { children: b.text }) }) : b.text
                  }
                )
              },
              `${b.role}-${x}`
            )),
            d && /* @__PURE__ */ St.jsx("div", { className: "flex max-w-[85%] justify-start", children: /* @__PURE__ */ St.jsxs("div", { className: "bg-white border border-neutral-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center justify-center space-x-2", children: [
              /* @__PURE__ */ St.jsx("div", { className: "w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" }),
              /* @__PURE__ */ St.jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" }),
              /* @__PURE__ */ St.jsx("div", { className: "w-2 h-2 bg-amber-600 rounded-full animate-bounce" })
            ] }) }),
            /* @__PURE__ */ St.jsx("div", { ref: p })
          ] }),
          /* @__PURE__ */ St.jsx("div", { className: "p-3 bg-white border-t border-neutral-100", children: /* @__PURE__ */ St.jsxs(
            "form",
            {
              onSubmit: (b) => {
                b.preventDefault(), y();
              },
              className: "flex items-center space-x-2",
              children: [
                /* @__PURE__ */ St.jsx(
                  "input",
                  {
                    type: "text",
                    value: u,
                    onChange: (b) => f(b.target.value),
                    placeholder: "Ask about parking, catering...",
                    className: "flex-1 bg-neutral-100 text-neutral-900 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50",
                    disabled: d
                  }
                ),
                /* @__PURE__ */ St.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: !u.trim() || d,
                    "aria-label": "Send message",
                    className: "w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed",
                    children: /* @__PURE__ */ St.jsx(WS, { className: "w-4 h-4 ml-0.5" })
                  }
                )
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ St.jsx(
      os.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: () => r(!i),
        type: "button",
        "data-diamond-concierge-toggle": !0,
        "aria-label": i ? "Close concierge chat" : "Open concierge chat",
        "aria-expanded": i,
        className: "fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-amber-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-amber-700 transition z-50 border-4 border-white",
        children: i ? /* @__PURE__ */ St.jsx(vy, { className: "w-6 h-6" }) : /* @__PURE__ */ St.jsx(IS, { className: "w-6 h-6" })
      }
    )
  ] });
}
const h3 = '/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-pan-x:initial;--tw-pan-y:initial;--tw-pinch-zoom:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-font-weight:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-amber-100:oklch(96.2% .059 95.617);--color-amber-400:oklch(82.8% .189 84.429);--color-amber-500:oklch(76.9% .188 70.08);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-neutral-50:oklch(98.5% 0 0);--color-neutral-100:oklch(97% 0 0);--color-neutral-200:oklch(92.2% 0 0);--color-neutral-800:oklch(26.9% 0 0);--color-neutral-900:oklch(20.5% 0 0);--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--font-weight-medium:500;--radius-sm:.25rem;--radius-2xl:1rem;--ease-in:cubic-bezier(.4, 0, 1, 1);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-bounce:bounce 1s infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.not-sr-only{clip-path:none;white-space:normal;width:auto;height:auto;margin:0;padding:0;position:static;overflow:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.right-4{right:calc(var(--spacing) * 4)}.bottom-6{bottom:calc(var(--spacing) * 6)}.bottom-24{bottom:calc(var(--spacing) * 24)}.isolate{isolation:isolate}.isolation-auto{isolation:auto}.z-50{z-index:50}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.ml-0{margin-left:calc(var(--spacing) * 0)}.ml-0\\.5{margin-left:calc(var(--spacing) * .5)}.ml-auto{margin-left:auto}.block{display:block}.contents{display:contents}.flex{display:flex}.flow-root{display:flow-root}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.inline-grid{display:inline-grid}.inline-table{display:inline-table}.list-item{display:list-item}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-column{display:table-column}.table-column-group{display:table-column-group}.table-footer-group{display:table-footer-group}.table-header-group{display:table-header-group}.table-row{display:table-row}.table-row-group{display:table-row-group}.h-2{height:calc(var(--spacing) * 2)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-10{height:calc(var(--spacing) * 10)}.h-14{height:calc(var(--spacing) * 14)}.h-\\[500px\\]{height:500px}.max-h-\\[calc\\(100vh-120px\\)\\]{max-height:calc(100vh - 120px)}.min-h-screen{min-height:100vh}.w-2{width:calc(var(--spacing) * 2)}.w-4{width:calc(var(--spacing) * 4)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-10{width:calc(var(--spacing) * 10)}.w-14{width:calc(var(--spacing) * 14)}.w-\\[350px\\]{width:350px}.max-w-\\[85\\%\\]{max-width:85%}.max-w-\\[calc\\(100vw-32px\\)\\]{max-width:calc(100vw - 32px)}.flex-1{flex:1}.shrink{flex-shrink:1}.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.origin-bottom-right{transform-origin:100% 100%}.translate-none{translate:none}.scale-3d{scale:var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-bounce{animation:var(--animate-bounce)}.cursor-default{cursor:default}.touch-pinch-zoom{--tw-pinch-zoom:pinch-zoom;touch-action:var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)}.resize{resize:both}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-start{justify-content:flex-start}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-reverse>:not(:last-child)){--tw-space-y-reverse:1}:where(.space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.space-x-reverse>:not(:last-child)){--tw-space-x-reverse:1}:where(.divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-y-reverse>:not(:last-child)){--tw-divide-y-reverse:1}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-full{border-radius:3.40282e38px}.rounded-s{border-start-start-radius:.25rem;border-end-start-radius:.25rem}.rounded-ss{border-start-start-radius:.25rem}.rounded-e{border-start-end-radius:.25rem;border-end-end-radius:.25rem}.rounded-se{border-start-end-radius:.25rem}.rounded-ee{border-end-end-radius:.25rem}.rounded-es{border-end-start-radius:.25rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-l{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-tl{border-top-left-radius:.25rem}.rounded-r{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-tr{border-top-right-radius:.25rem}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-br{border-bottom-right-radius:.25rem}.rounded-br-sm{border-bottom-right-radius:var(--radius-sm)}.rounded-bl{border-bottom-left-radius:.25rem}.rounded-bl-sm{border-bottom-left-radius:var(--radius-sm)}.border{border-style:var(--tw-border-style);border-width:1px}.border-4{border-style:var(--tw-border-style);border-width:4px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-y{border-block-style:var(--tw-border-style);border-block-width:1px}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-bs{border-block-start-style:var(--tw-border-style);border-block-start-width:1px}.border-be{border-block-end-style:var(--tw-border-style);border-block-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-neutral-100{border-color:var(--color-neutral-100)}.border-neutral-200{border-color:var(--color-neutral-200)}.border-white{border-color:var(--color-white)}.bg-amber-400{background-color:var(--color-amber-400)}.bg-amber-500{background-color:var(--color-amber-500)}.bg-amber-600{background-color:var(--color-amber-600)}.bg-neutral-50{background-color:var(--color-neutral-50)}.bg-neutral-100{background-color:var(--color-neutral-100)}.bg-neutral-900{background-color:var(--color-neutral-900)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-repeat{background-repeat:repeat}.mask-no-clip{-webkit-mask-clip:no-clip;mask-clip:no-clip}.mask-repeat{-webkit-mask-repeat:repeat;mask-repeat:repeat}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.px-4{padding-inline:calc(var(--spacing) * 4)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-wrap{text-wrap:wrap}.text-clip{text-overflow:clip}.text-ellipsis{text-overflow:ellipsis}.text-amber-100{color:var(--color-amber-100)}.text-neutral-800{color:var(--color-neutral-800)}.text-neutral-900{color:var(--color-neutral-900)}.text-white{color:var(--color-white)}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.italic{font-style:italic}.not-italic{font-style:normal}.diagonal-fractions{--tw-numeric-fraction:diagonal-fractions;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.lining-nums{--tw-numeric-figure:lining-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.oldstyle-nums{--tw-numeric-figure:oldstyle-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.proportional-nums{--tw-numeric-spacing:proportional-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.slashed-zero{--tw-slashed-zero:slashed-zero;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.stacked-fractions{--tw-numeric-fraction:stacked-fractions;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.normal-nums{font-variant-numeric:normal}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.overline{text-decoration-line:overline}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.inset-ring{--tw-inset-ring-shadow:inset 0 0 0 1px var(--tw-inset-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.drop-shadow{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#0000001a)) drop-shadow(0 1px 1px var(--tw-drop-shadow-color,#0000000f));--tw-drop-shadow:drop-shadow(0 1px 2px #0000001a) drop-shadow(0 1px 1px #0000000f);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-grayscale{--tw-backdrop-grayscale:grayscale(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-invert{--tw-backdrop-invert:invert(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-sepia{--tw-backdrop-sepia:sepia(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-in{--tw-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.\\[animation-delay\\:-0\\.3s\\]{animation-delay:-.3s}.\\[animation-delay\\:-0\\.15s\\]{animation-delay:-.15s}:where(.divide-x-reverse>:not(:last-child)){--tw-divide-x-reverse:1}.ring-inset{--tw-ring-inset:inset}@media(hover:hover){.hover\\:bg-amber-700:hover{background-color:var(--color-amber-700)}.hover\\:text-white:hover{color:var(--color-white)}}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-amber-500\\/50:focus{--tw-ring-color:#f99c0080}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-amber-500\\/50:focus{--tw-ring-color:color-mix(in oklab, var(--color-amber-500) 50%, transparent)}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}@media(min-width:40rem){.sm\\:right-8{right:calc(var(--spacing) * 8)}}}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-pan-x{syntax:"*";inherits:false}@property --tw-pan-y{syntax:"*";inherits:false}@property --tw-pinch-zoom{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@keyframes bounce{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}', M0 = "diamond-concierge-widget-host", z0 = "data-diamond-concierge-app", D0 = "data-diamond-concierge-styles", gx = (e) => {
  if (e instanceof HTMLElement)
    return e;
  let i = document.getElementById(M0);
  return i || (i = document.createElement("div"), i.id = M0, document.body.appendChild(i)), i;
}, d3 = (e) => {
  const i = e.shadowRoot ?? e.attachShadow({ mode: "open" });
  if (!i.querySelector(`[${D0}]`)) {
    const l = document.createElement("style");
    l.setAttribute(D0, ""), l.textContent = h3, i.appendChild(l);
  }
  let r = i.querySelector(`[${z0}]`);
  return r || (r = document.createElement("div"), r.setAttribute(z0, ""), i.appendChild(r)), r;
};
function yx(e) {
  const i = gx(e), r = d3(i);
  return i.__diamondConciergeRoot || (i.__diamondConciergeRoot = qS.createRoot(r)), i.__diamondConciergeRoot.render(
    /* @__PURE__ */ St.jsx(rt.StrictMode, { children: /* @__PURE__ */ St.jsx(f3, {}) })
  ), i.__diamondConciergeRoot;
}
function p3(e) {
  yx(e);
  const i = gx(e), r = (l = 0) => {
    var u;
    const s = (u = i.shadowRoot) == null ? void 0 : u.querySelector(
      "[data-diamond-concierge-toggle]"
    );
    if (!(s instanceof HTMLButtonElement)) {
      l < 8 && window.setTimeout(() => {
        r(l + 1);
      }, 120);
      return;
    }
    s.getAttribute("aria-expanded") !== "true" ? s.click() : s.focus();
  };
  r();
}
window.DiamondConciergeWidget = {
  mount: yx,
  open: p3
};
export {
  yx as mountDiamondConcierge,
  p3 as openDiamondConcierge
};
