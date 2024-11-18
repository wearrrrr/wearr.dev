/*!
 * css-vars-ponyfill
 * v2.4.9
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2024 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).cssVars = t());
})(this, function () {
    "use strict";
    function e() {
        return (
            (e = Object.assign
                ? Object.assign.bind()
                : function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                          var r = arguments[t];
                          for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                      }
                      return e;
                  }),
            e.apply(this, arguments)
        );
    }
    function t(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = { mimeType: t.mimeType || null, onBeforeSend: t.onBeforeSend || Function.prototype, onSuccess: t.onSuccess || Function.prototype, onError: t.onError || Function.prototype, onComplete: t.onComplete || Function.prototype },
            n = Array.isArray(e) ? e : [e],
            o = Array.apply(null, Array(n.length)).map(function (e) {
                return null;
            });
        function s(e) {
            var t = "string" == typeof e,
                r = t && "<" === e.trim().charAt(0);
            return t && !r;
        }
        function a(e, t) {
            r.onError(e, n[t], t);
        }
        function c(e, t) {
            var s = r.onSuccess(e, n[t], t);
            (e = !1 === s ? "" : s || e), (o[t] = e), -1 === o.indexOf(null) && r.onComplete(o);
        }
        var i = document.createElement("a");
        n.forEach(function (e, t) {
            if ((i.setAttribute("href", e), (i.href = String(i.href)), Boolean(document.all && !window.atob) && i.host.split(":")[0] !== location.host.split(":")[0])) {
                if (i.protocol === location.protocol) {
                    var n = new XDomainRequest();
                    n.open("GET", e),
                        (n.timeout = 0),
                        (n.onprogress = Function.prototype),
                        (n.ontimeout = Function.prototype),
                        (n.onload = function () {
                            var e = n.responseText;
                            s(e) ? c(e, t) : a(n, t);
                        }),
                        (n.onerror = function (e) {
                            a(n, t);
                        }),
                        setTimeout(function () {
                            n.send();
                        }, 0);
                } else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e, ")")), a(null, t);
            } else {
                var o = new XMLHttpRequest();
                o.open("GET", e),
                    r.mimeType && o.overrideMimeType && o.overrideMimeType(r.mimeType),
                    r.onBeforeSend(o, e, t),
                    (o.onreadystatechange = function () {
                        if (4 === o.readyState) {
                            var e = o.responseText;
                            (o.status < 400 && s(e)) || (0 === o.status && s(e)) ? c(e, t) : a(o, t);
                        }
                    }),
                    o.send();
            }
        });
    }
    function r(e) {
        var r = /\/\*[\s\S]+?\*\//g,
            o = /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,
            s = {
                rootElement: e.rootElement || document,
                include: e.include || 'style,link[rel="stylesheet"]',
                exclude: e.exclude || null,
                filter: e.filter || null,
                skipDisabled: !1 !== e.skipDisabled,
                useCSSOM: e.useCSSOM || !1,
                onBeforeSend: e.onBeforeSend || Function.prototype,
                onSuccess: e.onSuccess || Function.prototype,
                onError: e.onError || Function.prototype,
                onComplete: e.onComplete || Function.prototype,
            },
            a = Array.apply(null, s.rootElement.querySelectorAll(s.include)).filter(function (e) {
                return (t = e), (r = s.exclude), !(t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector).call(t, r);
                var t, r;
            }),
            c = Array.apply(null, Array(a.length)).map(function (e) {
                return null;
            });
        function i() {
            if (-1 === c.indexOf(null)) {
                c.reduce(function (e, t, r) {
                    return "" === t && e.push(r), e;
                }, [])
                    .reverse()
                    .forEach(function (e) {
                        return [a, c].forEach(function (t) {
                            return t.splice(e, 1);
                        });
                    });
                var e = c.join("");
                s.onComplete(e, c, a);
            }
        }
        function u(e, t, r, n) {
            var o = s.onSuccess(e, r, n);
            f((e = void 0 !== o && !1 === Boolean(o) ? "" : o || e), r, n, function (e, n) {
                null === c[t] &&
                    (n.forEach(function (e) {
                        return s.onError(e.xhr, r, e.url);
                    }),
                    !s.filter || s.filter.test(e) ? (c[t] = e) : (c[t] = ""),
                    i());
            });
        }
        function l(e, t) {
            var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                a = {};
            return (
                (a.rules = (e.replace(r, "").match(o) || []).filter(function (e) {
                    return -1 === s.indexOf(e);
                })),
                (a.urls = a.rules.map(function (e) {
                    return e.replace(o, "$1");
                })),
                (a.absoluteUrls = a.urls.map(function (e) {
                    return n(e, t);
                })),
                (a.absoluteRules = a.rules.map(function (e, r) {
                    var o = a.urls[r],
                        s = n(a.absoluteUrls[r], t);
                    return e.replace(o, s);
                })),
                a
            );
        }
        function f(e, r, n, o) {
            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [],
                c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [],
                i = l(e, n, c);
            i.rules.length
                ? t(i.absoluteUrls, {
                      onBeforeSend: function (e, t, n) {
                          s.onBeforeSend(e, r, t);
                      },
                      onSuccess: function (e, t, n) {
                          var o = s.onSuccess(e, r, t),
                              a = l((e = !1 === o ? "" : o || e), t, c);
                          return (
                              a.rules.forEach(function (t, r) {
                                  e = e.replace(t, a.absoluteRules[r]);
                              }),
                              e
                          );
                      },
                      onError: function (t, s, u) {
                          a.push({ xhr: t, url: s }), c.push(i.rules[u]), f(e, r, n, o, a, c);
                      },
                      onComplete: function (t) {
                          t.forEach(function (t, r) {
                              e = e.replace(i.rules[r], t);
                          }),
                              f(e, r, n, o, a, c);
                      },
                  })
                : o(e, a);
        }
        a.length
            ? a.forEach(function (e, r) {
                  var o = e.getAttribute("href"),
                      a = e.getAttribute("rel"),
                      l = "link" === e.nodeName.toLowerCase() && o && a && -1 !== a.toLowerCase().indexOf("stylesheet"),
                      f = !1 !== s.skipDisabled && e.disabled,
                      d = "style" === e.nodeName.toLowerCase();
                  if (l && !f)
                      if (-1 !== o.indexOf("data:text/css")) {
                          var p = decodeURIComponent(o.substring(o.indexOf(",") + 1));
                          s.useCSSOM &&
                              (p = Array.apply(null, e.sheet.cssRules)
                                  .map(function (e) {
                                      return e.cssText;
                                  })
                                  .join("")),
                              u(p, r, e, location.href);
                      } else
                          t(o, {
                              mimeType: "text/css",
                              onBeforeSend: function (t, r, n) {
                                  s.onBeforeSend(t, e, r);
                              },
                              onSuccess: function (t, s, a) {
                                  var c = n(o);
                                  u(t, r, e, c);
                              },
                              onError: function (t, n, o) {
                                  (c[r] = ""), s.onError(t, e, n), i();
                              },
                          });
                  else if (d && !f) {
                      var m = e.textContent;
                      s.useCSSOM &&
                          (m = Array.apply(null, e.sheet.cssRules)
                              .map(function (e) {
                                  return e.cssText;
                              })
                              .join("")),
                          u(m, r, e, location.href);
                  } else (c[r] = ""), i();
              })
            : s.onComplete("", []);
    }
    function n(e, t) {
        var r = document.implementation.createHTMLDocument(""),
            n = r.createElement("base"),
            o = r.createElement("a");
        return r.head.appendChild(n), r.body.appendChild(o), (n.href = t || document.baseURI || (document.querySelector("base") || {}).href || location.href), (o.href = e), o.href;
    }
    var o = s;
    function s(e, t, r) {
        e instanceof RegExp && (e = a(e, r)), t instanceof RegExp && (t = a(t, r));
        var n = c(e, t, r);
        return n && { start: n[0], end: n[1], pre: r.slice(0, n[0]), body: r.slice(n[0] + e.length, n[1]), post: r.slice(n[1] + t.length) };
    }
    function a(e, t) {
        var r = t.match(e);
        return r ? r[0] : null;
    }
    function c(e, t, r) {
        var n,
            o,
            s,
            a,
            c,
            i = r.indexOf(e),
            u = r.indexOf(t, i + 1),
            l = i;
        if (i >= 0 && u > 0) {
            if (e === t) return [i, u];
            for (n = [], s = r.length; l >= 0 && !c; ) l == i ? (n.push(l), (i = r.indexOf(e, l + 1))) : 1 == n.length ? (c = [n.pop(), u]) : ((o = n.pop()) < s && ((s = o), (a = u)), (u = r.indexOf(t, l + 1))), (l = i < u && i >= 0 ? i : u);
            n.length && (c = [s, a]);
        }
        return c;
    }
    function i(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = { preserveStatic: !0, removeComments: !1 },
            s = e({}, n, r),
            a = [];
        function c(e) {
            throw new Error("CSS parse error: ".concat(e));
        }
        function i(e) {
            var r = e.exec(t);
            if (r) return (t = t.slice(r[0].length)), r;
        }
        function u() {
            return i(/^{\s*/);
        }
        function l() {
            return i(/^}/);
        }
        function f() {
            i(/^\s*/);
        }
        function d() {
            if ((f(), "/" === t[0] && "*" === t[1])) {
                for (var e = 2; t[e] && ("*" !== t[e] || "/" !== t[e + 1]); ) e++;
                if (!t[e]) return c("end of comment is missing");
                var r = t.slice(2, e);
                return (t = t.slice(e + 2)), { type: "comment", comment: r };
            }
        }
        function p() {
            for (var e, t = []; (e = d()); ) t.push(e);
            return s.removeComments ? [] : t;
        }
        function m() {
            for (f(); "}" === t[0]; ) c("extra closing bracket");
            var e = i(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
            if (e) {
                var r,
                    n = e[0].trim();
                /\/\*/.test(n) && (n = n.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, ""));
                var o = /["']\w*,\w*["']/.test(n);
                return (
                    o &&
                        (n = n.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
                            return e.replace(/,/g, "‌");
                        })),
                    (r = /,/.test(n) ? n.split(/\s*(?![^(]*\)),\s*/) : [n]),
                    o &&
                        (r = r.map(function (e) {
                            return e.replace(/\u200C/g, ",");
                        })),
                    r
                );
            }
        }
        function v() {
            if ("@" === t[0]) return _();
            i(/^([;\s]*)+/);
            var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
                r = i(/^(\*?[-#/*\\\w.]+(\[[0-9a-z_-]+\])?)\s*/);
            if (r) {
                if (((r = r[0].trim()), !i(/^:\s*/))) return c("property missing ':'");
                var n = i(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
                    o = { type: "declaration", property: r.replace(e, ""), value: n ? n[0].replace(e, "").trim() : "" };
                return i(/^[;\s]*/), o;
            }
        }
        function h() {
            if (!u()) return c("missing '{'");
            for (var e, t = p(); (e = v()); ) t.push(e), (t = t.concat(p()));
            return l() ? t : c("missing '}'");
        }
        function y() {
            f();
            for (var e, t = []; (e = i(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)); ) t.push(e[1]), i(/^,\s*/);
            if (t.length) return { type: "keyframe", values: t, declarations: h() };
        }
        function g() {
            var e = i(/^@([-\w]+)?keyframes\s*/);
            if (e) {
                var t = e[1];
                if (!(e = i(/^([-\w]+)\s*/))) return c("@keyframes missing name");
                var r,
                    n = e[1];
                if (!u()) return c("@keyframes missing '{'");
                for (var o = p(); (r = y()); ) o.push(r), (o = o.concat(p()));
                return l() ? { type: "keyframes", name: n, vendor: t, keyframes: o } : c("@keyframes missing '}'");
            }
        }
        function b() {
            if (i(/^@page */)) return { type: "page", selectors: m() || [], declarations: h() };
        }
        function S() {
            var e = i(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);
            if (e) return { type: "page-margin-box", name: "".concat(e[1], "-").concat(e[2]) + (e[3] ? "-".concat(e[3]) : ""), declarations: h() };
        }
        function E() {
            if (i(/^@font-face\s*/)) return { type: "font-face", declarations: h() };
        }
        function w() {
            var e = i(/^@supports *([^{]+)/);
            if (e) return { type: "supports", supports: e[1].trim(), rules: M() };
        }
        function C() {
            if (i(/^@host\s*/)) return { type: "host", rules: M() };
        }
        function x() {
            var e = i(/^@media([^{]+)*/);
            if (e) return { type: "media", media: (e[1] || "").trim(), rules: M() };
        }
        function O() {
            var e = i(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (e) return { type: "custom-media", name: e[1].trim(), media: e[2].trim() };
        }
        function A() {
            var e = i(/^@([-\w]+)?document *([^{]+)/);
            if (e) return { type: "document", document: e[2].trim(), vendor: e[1] ? e[1].trim() : null, rules: M() };
        }
        function k() {
            var e = i(/^@(import|charset|namespace)\s*([^;]+);/);
            if (e) return { type: e[1], name: e[2].trim() };
        }
        function _() {
            if ((f(), "@" === t[0])) {
                var e = k() || E() || x() || g() || w() || A() || O() || C() || b() || S();
                if (e && !s.preserveStatic) {
                    var r = !1;
                    if (e.declarations)
                        r = e.declarations.some(function (e) {
                            return /var\(/.test(e.value);
                        });
                    else
                        r = (e.keyframes || e.rules || []).some(function (e) {
                            return (e.declarations || []).some(function (e) {
                                return /var\(/.test(e.value);
                            });
                        });
                    return r ? e : {};
                }
                return e;
            }
        }
        function j() {
            if (!s.preserveStatic) {
                var e = o("{", "}", t);
                if (e) {
                    var r = /:(?:root|host)(?![.:#(])/.test(e.pre) && /--\S*\s*:/.test(e.body),
                        n = /var\(/.test(e.body);
                    if (!r && !n) return (t = t.slice(e.end + 1)), {};
                }
            }
            var a = m() || [],
                i = s.preserveStatic
                    ? h()
                    : h().filter(function (e) {
                          var t =
                                  a.some(function (e) {
                                      return /:(?:root|host)(?![.:#(])/.test(e);
                                  }) && /^--\S/.test(e.property),
                              r = /var\(/.test(e.value);
                          return t || r;
                      });
            return a.length || c("selector missing"), { type: "rule", selectors: a, declarations: i };
        }
        function M(e) {
            if (!e && !u()) return c("missing '{'");
            for (var r, n = p(); t.length && (e || "}" !== t[0]) && (r = _() || j()); ) r.type && n.push(r), (n = n.concat(p()));
            return e || l() ? n : c("missing '}'");
        }
        return { type: "stylesheet", stylesheet: { rules: M(!0), errors: a } };
    }
    function u(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = { parseHost: !1, store: {}, onWarning: function () {} },
            o = e({}, n, r),
            s = new RegExp(":".concat(o.parseHost ? "host" : "root", "$"));
        return (
            "string" == typeof t && (t = i(t, o)),
            t.stylesheet.rules.forEach(function (e) {
                "rule" === e.type &&
                    e.selectors.some(function (e) {
                        return s.test(e);
                    }) &&
                    e.declarations.forEach(function (e, t) {
                        var r = e.property,
                            n = e.value;
                        r && 0 === r.indexOf("--") && (o.store[r] = n);
                    });
            }),
            o.store
        );
    }
    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            r = arguments.length > 2 ? arguments[2] : void 0,
            n = {
                charset: function (e) {
                    return "@charset " + e.name + ";";
                },
                comment: function (e) {
                    return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : "";
                },
                "custom-media": function (e) {
                    return "@custom-media " + e.name + " " + e.media + ";";
                },
                declaration: function (e) {
                    return e.property + ":" + e.value + ";";
                },
                document: function (e) {
                    return "@" + (e.vendor || "") + "document " + e.document + "{" + o(e.rules) + "}";
                },
                "font-face": function (e) {
                    return "@font-face{" + o(e.declarations) + "}";
                },
                host: function (e) {
                    return "@host{" + o(e.rules) + "}";
                },
                import: function (e) {
                    return "@import " + e.name + ";";
                },
                keyframe: function (e) {
                    return e.values.join(",") + "{" + o(e.declarations) + "}";
                },
                keyframes: function (e) {
                    return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + o(e.keyframes) + "}";
                },
                media: function (e) {
                    return "@media " + e.media + "{" + o(e.rules) + "}";
                },
                namespace: function (e) {
                    return "@namespace " + e.name + ";";
                },
                page: function (e) {
                    return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + o(e.declarations) + "}";
                },
                "page-margin-box": function (e) {
                    return "@" + e.name + "{" + o(e.declarations) + "}";
                },
                rule: function (e) {
                    var t = e.declarations;
                    if (t.length) return e.selectors.join(",") + "{" + o(t) + "}";
                },
                supports: function (e) {
                    return "@supports " + e.supports + "{" + o(e.rules) + "}";
                },
            };
        function o(e) {
            for (var o = "", s = 0; s < e.length; s++) {
                var a = e[s];
                r && r(a);
                var c = n[a.type](a);
                c && ((o += c), c.length && a.selectors && (o += t));
            }
            return o;
        }
        return o(e.stylesheet.rules);
    }
    function f(e, t) {
        e.rules.forEach(function (r) {
            r.rules
                ? f(r, t)
                : r.keyframes
                  ? r.keyframes.forEach(function (e) {
                        "keyframe" === e.type && t(e.declarations, r);
                    })
                  : r.declarations && t(r.declarations, e);
        });
    }
    s.range = c;
    function d(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = { preserveStatic: !0, preserveVars: !1, variables: {}, onWarning: function () {} },
            o = e({}, n, r);
        return (
            "string" == typeof t && (t = i(t, o)),
            f(t.stylesheet, function (e, t) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r],
                        s = n.type,
                        a = n.property,
                        c = n.value;
                    if ("declaration" === s)
                        if (o.preserveVars || !a || 0 !== a.indexOf("--")) {
                            if (-1 !== c.indexOf("var(")) {
                                var i = m(c, o);
                                i !== n.value && ((i = p(i)), o.preserveVars ? (e.splice(r, 0, { type: s, property: a, value: i }), r++) : (n.value = i));
                            }
                        } else e.splice(r, 1), r--;
                }
            }),
            l(t)
        );
    }
    function p(e) {
        return (
            (e.match(/calc\(([^)]+)\)/g) || []).forEach(function (t) {
                var r = "calc".concat(t.split("calc").join(""));
                e = e.replace(t, r);
            }),
            e
        );
    }
    function m(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments.length > 2 ? arguments[2] : void 0;
        if (-1 === e.indexOf("var(")) return e;
        var n = o("(", ")", e);
        function s(e) {
            var n = e.split(",")[0].replace(/[\s\n\t]/g, ""),
                o = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
                s = Object.prototype.hasOwnProperty.call(t.variables, n) ? String(t.variables[n]) : void 0,
                a = s || (o ? String(o) : void 0),
                c = r || e;
            return s || t.onWarning('variable "'.concat(n, '" is undefined')), a && "undefined" !== a && a.length > 0 ? m(a, t, c) : "var(".concat(c, ")");
        }
        if (n) {
            if ("var" === n.pre.slice(-3)) {
                var a = 0 === n.body.trim().length;
                return a ? (t.onWarning("var() must contain a non-whitespace string"), e) : n.pre.slice(0, -3) + s(n.body) + m(n.post, t);
            }
            return n.pre + "(".concat(m(n.body, t), ")") + m(n.post, t);
        }
        return -1 !== e.indexOf("var(") && t.onWarning('missing closing ")" in the value "'.concat(e, '"')), e;
    }
    var v = "undefined" != typeof window,
        h = v && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"),
        y = { group: 0, job: 0 },
        g = {
            rootElement: v ? document : null,
            shadowDOM: !1,
            include: "style,link[rel=stylesheet]",
            exclude: "",
            variables: {},
            onlyLegacy: !0,
            preserveStatic: !0,
            preserveVars: !1,
            silent: !1,
            updateDOM: !0,
            updateURLs: !0,
            watch: null,
            onBeforeSend: function () {},
            onError: function () {},
            onWarning: function () {},
            onSuccess: function () {},
            onComplete: function () {},
            onFinally: function () {},
        },
        b = {
            cssComments: /\/\*[\s\S]+?\*\//g,
            cssKeyframes: /@(?:-\w*-)?keyframes/,
            cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
            cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
            cssVarDeclRules: /(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
            cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
            cssVarFunc: /var\(\s*--[\w-]/,
            cssVars: /(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/,
        },
        S = { dom: {}, job: {}, user: {} },
        E = !1,
        w = null,
        C = 0,
        x = null,
        O = !1;
    function A() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = "cssVars(): ",
            o = e({}, g, t);
        function s(e, t, r, s) {
            !o.silent && window.console && console.error("".concat(n).concat(e, "\n"), t), o.onError(e, t, r, s);
        }
        function a(e) {
            !o.silent && window.console && console.warn("".concat(n).concat(e)), o.onWarning(e);
        }
        function c(e) {
            o.onFinally(Boolean(e), h, R() - o.__benchmark);
        }
        if (v) {
            if (o.watch) return (o.watch = g.watch), k(o), void A(o);
            if ((!1 === o.watch && w && (w.disconnect(), (w = null)), !o.__benchmark)) {
                if (E === o.rootElement) return void _(t);
                var f = [].slice.call(o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));
                if (
                    ((o.__benchmark = R()),
                    (o.exclude = [w ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', "link[disabled]:not([data-cssvars])", o.exclude]
                        .filter(function (e) {
                            return e;
                        })
                        .join(",")),
                    (o.variables = V(o.variables)),
                    f.forEach(function (e) {
                        var t = "style" === e.nodeName.toLowerCase() && e.__cssVars.text,
                            r = t && e.textContent !== e.__cssVars.text;
                        t && r && (e.sheet && (e.sheet.disabled = !1), e.setAttribute("data-cssvars", ""));
                    }),
                    !w)
                ) {
                    var p = [].slice.call(o.rootElement.querySelectorAll('[data-cssvars="out"]'));
                    p.forEach(function (e) {
                        var t = e.getAttribute("data-cssvars-group");
                        (t ? o.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t, '"]')) : null) || e.parentNode.removeChild(e);
                    }),
                        C && f.length < C && ((C = f.length), (S.dom = {}));
                }
            }
            if ("loading" !== document.readyState)
                if (h && o.onlyLegacy) {
                    var m = !1;
                    if (o.updateDOM) {
                        var x = o.rootElement.host || (o.rootElement === document ? document.documentElement : o.rootElement);
                        Object.keys(o.variables).forEach(function (e) {
                            var t = o.variables[e];
                            (m = m || t !== getComputedStyle(x).getPropertyValue(e)), x.style.setProperty(e, t);
                        });
                    }
                    c(m);
                } else
                    !O && (o.shadowDOM || o.rootElement.shadowRoot || o.rootElement.host)
                        ? r({
                              rootElement: g.rootElement,
                              include: g.include,
                              exclude: o.exclude,
                              skipDisabled: !1,
                              onSuccess: function (e, t, r) {
                                  return !((t.sheet || {}).disabled && !t.__cssVars) && ((e = ((e = e.replace(b.cssComments, "").replace(b.cssMediaQueries, "")).match(b.cssVarDeclRules) || []).join("")) || !1);
                              },
                              onComplete: function (e, t, r) {
                                  u(e, { store: S.dom, onWarning: a }), (O = !0), A(o);
                              },
                          })
                        : ((E = o.rootElement),
                          r({
                              rootElement: o.rootElement,
                              include: o.include,
                              exclude: o.exclude,
                              skipDisabled: !1,
                              onBeforeSend: o.onBeforeSend,
                              onError: function (e, t, r) {
                                  var n = e.responseURL || L(r, location.href),
                                      o = e.statusText ? "(".concat(e.statusText, ")") : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
                                  s("CSS XHR Error: ".concat(n, " ").concat(e.status, " ").concat(o), t, e, n);
                              },
                              onSuccess: function (e, t, r) {
                                  if ((t.sheet || {}).disabled && !t.__cssVars) return !1;
                                  var n = "link" === t.nodeName.toLowerCase(),
                                      s = "style" === t.nodeName.toLowerCase() && e !== t.textContent,
                                      a = o.onSuccess(e, t, r);
                                  return (e = void 0 !== a && !1 === Boolean(a) ? "" : a || e), o.updateURLs && (n || s) && (e = M(e, r)), e;
                              },
                              onComplete: function (t, r) {
                                  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                                      f = e({}, S.dom, S.user);
                                  if (
                                      ((S.job = {}),
                                      n.forEach(function (e, t) {
                                          var n = r[t];
                                          if (((e.__cssVars = e.__cssVars || {}), (e.__cssVars.text = n), b.cssVars.test(n)))
                                              try {
                                                  var c = i(n, { preserveStatic: o.preserveStatic, removeComments: !0 });
                                                  u(c, { parseHost: Boolean(o.rootElement.host), store: S.dom, onWarning: a }), (e.__cssVars.tree = c);
                                              } catch (t) {
                                                  s(t.message, e);
                                              }
                                      }),
                                      e(S.job, S.dom),
                                      o.updateDOM ? (e(S.user, o.variables), e(S.job, S.user)) : (e(S.job, S.user, o.variables), e(f, o.variables)),
                                      y.job > 0 &&
                                          Boolean(
                                              Object.keys(S.job).length > Object.keys(f).length ||
                                                  Boolean(
                                                      Object.keys(f).length &&
                                                          Object.keys(S.job).some(function (e) {
                                                              return S.job[e] !== f[e];
                                                          })
                                                  )
                                          ))
                                  )
                                      T(o.rootElement), A(o);
                                  else {
                                      var p = [],
                                          m = [],
                                          v = !1;
                                      if (
                                          (o.updateDOM && y.job++,
                                          n.forEach(function (t, n) {
                                              var c = !t.__cssVars.tree;
                                              if (t.__cssVars.tree)
                                                  try {
                                                      d(t.__cssVars.tree, e({}, o, { variables: S.job, onWarning: a }));
                                                      var i = l(t.__cssVars.tree);
                                                      if (o.updateDOM) {
                                                          var u = r[n],
                                                              f = b.cssVarFunc.test(u);
                                                          if ((t.getAttribute("data-cssvars") || t.setAttribute("data-cssvars", "src"), i.length && f)) {
                                                              var h = t.getAttribute("data-cssvars-group") || ++y.group,
                                                                  g = i.replace(/\s/g, ""),
                                                                  E = o.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(h, '"]')) || document.createElement("style");
                                                              (v = v || b.cssKeyframes.test(i)),
                                                                  o.preserveStatic && t.sheet && (t.sheet.disabled = !0),
                                                                  E.hasAttribute("data-cssvars") || E.setAttribute("data-cssvars", "out"),
                                                                  g === t.textContent.replace(/\s/g, "")
                                                                      ? ((c = !0), E && E.parentNode && (t.removeAttribute("data-cssvars-group"), E.parentNode.removeChild(E)))
                                                                      : g !== E.textContent.replace(/\s/g, "") &&
                                                                        ([t, E].forEach(function (e) {
                                                                            e.setAttribute("data-cssvars-job", y.job), e.setAttribute("data-cssvars-group", h);
                                                                        }),
                                                                        (E.textContent = i),
                                                                        p.push(i),
                                                                        m.push(E),
                                                                        E.parentNode || t.parentNode.insertBefore(E, t.nextSibling));
                                                          }
                                                      } else t.textContent.replace(/\s/g, "") !== i && p.push(i);
                                                  } catch (e) {
                                                      s(e.message, t);
                                                  }
                                              c && t.setAttribute("data-cssvars", "skip"), t.hasAttribute("data-cssvars-job") || t.setAttribute("data-cssvars-job", y.job);
                                          }),
                                          (C = o.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length),
                                          o.shadowDOM)
                                      )
                                          for (var h, g = [].concat(o.rootElement).concat([].slice.call(o.rootElement.querySelectorAll("*"))), w = 0; (h = g[w]); ++w)
                                              if (h.shadowRoot && h.shadowRoot.querySelector("style")) {
                                                  var x = e({}, o, { rootElement: h.shadowRoot });
                                                  A(x);
                                              }
                                      o.updateDOM && v && j(o.rootElement), (E = !1), o.onComplete(p.join(""), m, JSON.parse(JSON.stringify(S.job)), R() - o.__benchmark), c(m.length);
                                  }
                              },
                          }));
            else
                document.addEventListener("DOMContentLoaded", function e(r) {
                    A(t), document.removeEventListener("DOMContentLoaded", e);
                });
        }
    }
    function k(e) {
        function t(e) {
            var t = r(e) && e.hasAttribute("disabled"),
                n = (e.sheet || {}).disabled;
            return t || n;
        }
        function r(e) {
            return "link" === e.nodeName.toLowerCase() && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet");
        }
        function n(e) {
            return "style" === e.nodeName.toLowerCase();
        }
        window.MutationObserver &&
            (w && (w.disconnect(), (w = null)),
            (w = new MutationObserver(function (o) {
                o.some(function (o) {
                    return (
                        (function (n) {
                            var o = !1;
                            if ("attributes" === n.type && r(n.target) && !t(n.target)) {
                                var s = "disabled" === n.attributeName,
                                    a = "href" === n.attributeName,
                                    c = "skip" === n.target.getAttribute("data-cssvars"),
                                    i = "src" === n.target.getAttribute("data-cssvars");
                                s ? (o = !c && !i) : a && (c ? n.target.setAttribute("data-cssvars", "") : i && T(e.rootElement, !0), (o = !0));
                            }
                            return o;
                        })(o) ||
                        (function (e) {
                            var t = !1;
                            if ("childList" === e.type) {
                                var r = n(e.target),
                                    o = "out" === e.target.getAttribute("data-cssvars");
                                t = r && !o;
                            }
                            return t;
                        })(o) ||
                        (function (e) {
                            var o = !1;
                            return (
                                "childList" === e.type &&
                                    (o = [].slice.call(e.addedNodes).some(function (e) {
                                        var o = 1 === e.nodeType && e.hasAttribute("data-cssvars"),
                                            s = n(e) && b.cssVars.test(e.textContent);
                                        return !o && (r(e) || s) && !t(e);
                                    })),
                                o
                            );
                        })(o) ||
                        (function (t) {
                            var r = !1;
                            return (
                                "childList" === t.type &&
                                    (r = [].slice.call(t.removedNodes).some(function (t) {
                                        var r = 1 === t.nodeType,
                                            n = r && "out" === t.getAttribute("data-cssvars"),
                                            o = r && "src" === t.getAttribute("data-cssvars"),
                                            s = o;
                                        if (o || n) {
                                            var a = t.getAttribute("data-cssvars-group"),
                                                c = e.rootElement.querySelector('[data-cssvars-group="'.concat(a, '"]'));
                                            o && T(e.rootElement, !0), c && c.parentNode.removeChild(c);
                                        }
                                        return s;
                                    })),
                                r
                            );
                        })(o)
                    );
                }) && A(e);
            })).observe(document.documentElement, { attributes: !0, attributeFilter: ["disabled", "href"], childList: !0, subtree: !0 }));
    }
    function _(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
        clearTimeout(x),
            (x = setTimeout(function () {
                (e.__benchmark = null), A(e);
            }, t));
    }
    function j(e) {
        var t = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (e) {
            return getComputedStyle(document.body)[e];
        })[0];
        if (t) {
            for (var r = [].slice.call(e.querySelectorAll("*")), n = [], o = "__CSSVARSPONYFILL-KEYFRAMES__", s = 0, a = r.length; s < a; s++) {
                var c = r[s];
                "none" !== getComputedStyle(c)[t] && ((c.style[t] += o), n.push(c));
            }
            document.body.offsetHeight;
            for (var i = 0, u = n.length; i < u; i++) {
                var l = n[i].style;
                l[t] = l[t].replace(o, "");
            }
        }
    }
    function M(e, t) {
        return (
            (e.replace(b.cssComments, "").match(b.cssUrls) || []).forEach(function (r) {
                var n = r.replace(b.cssUrls, "$1"),
                    o = L(n, t);
                e = e.replace(r, r.replace(n, o));
            }),
            e
        );
    }
    function V() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = /^-{2}/;
        return Object.keys(e).reduce(function (r, n) {
            return (r[t.test(n) ? n : "--".concat(n.replace(/^-+/, ""))] = e[n]), r;
        }, {});
    }
    function L(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
            r = document.implementation.createHTMLDocument(""),
            n = r.createElement("base"),
            o = r.createElement("a");
        return r.head.appendChild(n), r.body.appendChild(o), (n.href = t), (o.href = e), o.href;
    }
    function R() {
        return v && (window.performance || {}).now ? window.performance.now() : new Date().getTime();
    }
    function T(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = [].slice.call(e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));
        r.forEach(function (e) {
            return e.setAttribute("data-cssvars", "");
        }),
            t && (S.dom = {});
    }
    return (
        (A.reset = function () {
            for (var e in ((y.job = 0), (y.group = 0), (E = !1), w && (w.disconnect(), (w = null)), (C = 0), (x = null), (O = !1), S)) S[e] = {};
        }),
        A
    );
});
