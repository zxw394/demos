/*
@license

dhtmlxTree v.6.3.0 GPL

This software is covered by GPL license.
To use it in non-GPL project, you need obtain Commercial or Enterprise license
Please contact sales@dhtmlx.com. Usage without proper license is prohibited.
(c) XB Software.

*/
if (window.dhx && (window.dhx_legacy = dhx, delete window.dhx), function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.dhx = e() : t.dhx = e()
}(window, function() {
    return function(t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var r = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = t, n.c = e, n.d = function(t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var r in t) n.d(i, r, function(e) {
                return t[e]
            }.bind(null, r));
            return i
        }, n.n = function(t) {
            var e = t && t.__esModule ?
                function() {
                    return t.
                        default
                } : function() {
                    return t
                };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "/codebase/", n(n.s = 21)
    }([function(t, e, n) {
        "use strict";
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(38);

            function r(t) {
                var n = window.ResizeObserver,
                    i = function(e) {
                        var n = e.el.offsetHeight,
                            i = e.el.offsetWidth;
                        t(i, n)
                    };
                return n ? e.el("div.dhx-resize-observer", {
                    _hooks: {
                        didInsert: function(t) {
                            new n(function() {
                                return i(t)
                            }).observe(t.el)
                        }
                    }
                }) : e.el("iframe.dhx-resize-observer", {
                    _hooks: {
                        didInsert: function(t) {
                            t.el.contentWindow.onresize = function() {
                                return i(t)
                            }, i(t)
                        }
                    }
                })
            }
            e.el = i.defineElement, e.sv = i.defineSvgElement, e.view = i.defineView, e.create = i.createView, e.inject = i.injectView, e.KEYED_LIST = i.KEYED_LIST, e.disableHelp = function() {
                i.DEVMODE.mutations = !1, i.DEVMODE.warnings = !1, i.DEVMODE.verbose = !1, i.DEVMODE.UNKEYED_INPUT = !1
            }, e.resizer = r, e.resizeHandler = function(t, n) {
                return e.create({
                    render: function() {
                        return r(n)
                    }
                }).mount(t)
            }, e.awaitRedraw = function() {
                return new t(function(t) {
                    requestAnimationFrame(function() {
                        t()
                    })
                })
            }
        }).call(this, n(10))
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__assign ||
            function() {
                return (i = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };

        function r(t, e, n) {
            for (void 0 === e && (e = "dhx_id"), void 0 === n && (n = "target"), t instanceof Event && (t = t[n]); t;) {
                if (t.getAttribute && t.getAttribute(e)) return t;
                t = t.parentNode
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n(30), e.toNode = function(t) {
            return "string" == typeof t && (t = document.getElementById(t) || document.querySelector(t)), t || document.body
        }, e.eventHandler = function(t, e) {
            var n = Object.keys(e);
            return function(i) {
                for (var r = t(i), o = i.target; o;) {
                    var a = o.getAttribute && o.getAttribute("class") || "";
                    if (a.length) for (var s = a.split(" "), u = 0; u < n.length; u++) if (s.indexOf(n[u]) > -1) return e[n[u]](i, r);
                    o = o.parentNode
                }
                return !0
            }
        }, e.locate = function(t, e) {
            void 0 === e && (e = "dhx_id");
            var n = r(t, e);
            return n ? n.getAttribute(e) : ""
        }, e.locateNode = r, e.getBox = function(t) {
            var e = t.getBoundingClientRect(),
                n = document.body,
                i = window.pageYOffset || n.scrollTop,
                r = window.pageXOffset || n.scrollLeft;
            return {
                top: e.top + i,
                left: e.left + r,
                right: n.offsetWidth - e.right,
                bottom: n.offsetHeight - e.bottom,
                width: e.right - e.left,
                height: e.bottom - e.top
            }
        };
        var o, a = -1;

        function s(t) {
            var e = t.getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                right: e.right + window.pageXOffset,
                top: e.top + window.pageYOffset,
                bottom: e.bottom + window.pageYOffset
            }
        }
        function u(t, e) {
            var n = e.mode === o.bottom || e.mode === o.top ? l(t, e) : d(t, e),
                i = n.left,
                r = n.top;
            return {
                left: Math.round(i) + "px",
                top: Math.round(r) + "px",
                minWidth: Math.round(e.width) + "px",
                position: "absolute"
            }
        }
        function c() {
            return {
                rightBorder: window.pageXOffset + window.innerWidth,
                bottomBorder: window.pageYOffset + window.innerHeight
            }
        }
        function l(t, e) {
            var n, r, a = c(),
                s = a.rightBorder,
                u = a.bottomBorder - t.bottom - e.height,
                l = t.top - e.height;
            if (e.mode === o.bottom ? u >= 0 ? r = t.bottom : l >= 0 && (r = l) : l >= 0 ? r = l : u >= 0 && (r = t.bottom), u < 0 && l < 0) {
                if (e.auto) return d(t, i({}, e, {
                    mode: o.right,
                    auto: !1
                }));
                r = u > l ? t.bottom : l
            }
            if (e.centering) n = function(t, e, n) {
                var i = (e - (t.right - t.left)) / 2,
                    r = t.left - i,
                    o = t.right + i;
                return r >= 0 && o <= n ? r : r < 0 ? 0 : n - e
            }(t, e.width, s);
            else {
                var f = s - t.left - e.width,
                    h = t.right - e.width;
                n = f >= 0 ? t.left : h >= 0 ? h : h > f ? t.left : h
            }
            return {
                left: n,
                top: r
            }
        }
        function d(t, e) {
            var n, r, a = c(),
                s = a.rightBorder,
                u = a.bottomBorder,
                d = s - t.right - e.width,
                f = t.left - e.width;
            if (e.mode === o.right ? d >= 0 ? n = t.right : f >= 0 && (n = f) : f >= 0 ? n = f : d >= 0 && (n = t.right), f < 0 && d < 0) {
                if (e.auto) return l(t, i({}, e, {
                    mode: o.bottom,
                    auto: !1
                }));
                n = f > d ? f : t.right
            }
            if (e.centering) r = function(t, e, n) {
                var i = (e - (t.bottom - t.top)) / 2,
                    r = t.top - i,
                    o = t.bottom + i;
                return r >= 0 && o <= n ? r : r < 0 ? 0 : n - e
            }(t, e.height, s);
            else {
                var h = t.bottom - e.height,
                    p = u - t.top - e.height;
                r = p >= 0 ? t.top : h > 0 ? h : h > p ? h : t.top
            }
            return {
                left: n,
                top: r
            }
        }
        e.getScrollbarWidth = function() {
            if (a > -1) return a;
            var t = document.createElement("div");
            return document.body.appendChild(t), t.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;", a = t.offsetWidth - t.clientWidth, document.body.removeChild(t), a
        }, e.fitPosition = function(t, e) {
            return u(s(t), e)
        }, e.isIE = function() {
            var t = window.navigator.userAgent;
            return t.indexOf("MSIE ") > -1 || t.indexOf("Trident/") > -1
        }, e.getRealPosition = s, function(t) {
            t.left = "left", t.right = "right", t.bottom = "bottom", t.top = "top"
        }(o = e.Position || (e.Position = {})), e.calculatePosition = u
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), function(t) {
            t.all = "all", t.level = "level", t.leafs = "leafs"
        }(e.TreeFilterType || (e.TreeFilterType = {})), function(t) {
            t.top = "top", t.bot = "bot", t. in = "in"
        }(e.DropPosition || (e.DropPosition = {})), function(t) {
            t.afterAdd = "afteradd", t.beforeAdd = "beforeadd", t.removeAll = "removeall", t.beforeRemove = "beforeremove", t.afterRemove = "afterremove", t.change = "change", t.load = "load", t.loadError = "loaderror"
        }(e.DataEvents || (e.DataEvents = {})), function(t) {
            t.beforeDrag = "beforedrag", t.beforeDrop = "beforeDrop", t.dragStart = "dragstart", t.dragEnd = "dragend", t.canDrop = "candrop", t.cancelDrop = "canceldrop", t.dropComplete = "dropcomplete", t.dragOut = "dragOut", t.dragIn = "dragIn"
        }(e.DragEvents || (e.DragEvents = {})), function(t) {
            t.target = "target", t.both = "both", t.source = "source"
        }(e.DragMode || (e.DragMode = {})), function(t) {
            t.child = "child", t.sibling = "sibling", t.complex = "complex"
        }(e.DropBehaviour || (e.DropBehaviour = {})), function(t) {
            t.json = "json", t.csv = "csv", t.xml = "xml"
        }(e.DataDriver || (e.DataDriver = {}))
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(9),
            r = n(16);
        e.isEqualObj = function(t, e) {
            for (var n in t) if (t[n] !== e[n]) return !1;
            return !0
        }, e.naturalCompare = function(t, e) {
            if (isNaN(t) || isNaN(e)) {
                var n = [],
                    i = [];
                for (t.replace(/(\d+)|(\D+)/g, function(t, e, i) {
                    n.push([e || 1 / 0, i || ""])
                }), e.replace(/(\d+)|(\D+)/g, function(t, e, n) {
                    i.push([e || 1 / 0, n || ""])
                }); n.length && i.length;) {
                    var r = n.shift(),
                        o = i.shift(),
                        a = r[0] - o[0] || r[1].localeCompare(o[1]);
                    if (a) return a
                }
                return n.length - i.length
            }
            return t - e
        }, e.findByConf = function(t, e) {
            if ("function" == typeof e) {
                if (e.call(this, t)) return t
            } else if (e.by && e.match && t[e.by] === e.match) return t
        }, e.isDebug = function() {
            var t = window.dhx;
            if (void 0 !== t) return void 0 !== t.debug && t.debug
        }, e.dhxWarning = function(t) {
            console.warn(t)
        }, e.dhxError = function(t) {
            throw new Error(t)
        }, e.toProxy = function(t) {
            var e = typeof t;
            return "string" === e ? new i.DataProxy(t) : "object" === e ? t : void 0
        }, e.toDataDriver = function(t) {
            if ("string" == typeof t) {
                var e = window.dhx,
                    n = e && e.dataDrivers || r.dataDrivers;
                if (n[t]) return new n[t];
                console.warn("Incorrect data driver type:", t), console.warn("Available types:", JSON.stringify(Object.keys(n)))
            } else if ("object" == typeof t) return t
        }, e.copyWithoutInner = function(t, e) {
            var n = {};
            for (var i in t)"$" === i[0] || e && e[i] || (n[i] = t[i]);
            return n
        }, e.isTreeCollection = function(t) {
            return Boolean(t.getRoot)
        }, e.hasJsonOrArrayStructure = function(t) {
            if ("object" == typeof t) return !0;
            if ("string" != typeof t) return !1;
            try {
                var e = JSON.parse(t);
                return "[object Object]" === Object.prototype.toString.call(e) || Array.isArray(e)
            } catch (t) {
                return !1
            }
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(1),
            r = (new Date).valueOf();
        e.uid = function() {
            return "u" + r++
        }, e.extend = function t(e, n, i) {
            if (void 0 === i && (i = !0), n) for (var r in n) {
                var o = n[r],
                    a = e[r];
                !i || "object" != typeof a || a instanceof Date || a instanceof Array ? e[r] = o : t(a, o)
            }
            return e
        }, e.copy = function(t, e) {
            var n = {};
            for (var i in t) e && "$" === i[0] || (n[i] = t[i]);
            return n
        }, e.naturalSort = function(t) {
            return t.sort(function(t, e) {
                return "string" == typeof t ? t.localeCompare(e) : t - e
            })
        }, e.findIndex = function(t, e) {
            for (var n = t.length, i = 0; i < n; i++) if (e(t[i])) return i;
            return -1
        }, e.isEqualString = function(t, e) {
            if (t.length > e.length) return !1;
            for (var n = 0; n < t.length; n++) if (t[n].toLowerCase() !== e[n].toLowerCase()) return !1;
            return !0
        }, e.singleOuterClick = function(t) {
            var e = function(n) {
                t(n) && document.removeEventListener("click", e)
            };
            document.addEventListener("click", e)
        }, e.detectWidgetClick = function(t, e) {
            var n = function(n) {
                return e(i.locate(n, "dhx_widget_id") === t)
            };
            return document.addEventListener("click", n), function() {
                return document.removeEventListener("click", n)
            }
        }, e.unwrapBox = function(t) {
            return Array.isArray(t) ? t[0] : t
        }, e.wrapBox = function(t) {
            return Array.isArray(t) ? t : [t]
        }, e.isDefined = function(t) {
            return null !== t && void 0 !== t
        }, e.range = function(t, e) {
            if (t > e) return [];
            for (var n = []; t <= e;) n.push(t++);
            return n
        }, e.isNumeric = function(t) {
            return !isNaN(t - parseFloat(t))
        }, e.downloadFile = function(t, e, n) {
            void 0 === n && (n = "text/plain");
            var i = new Blob([t], {
                type: n
            });
            if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(i, e);
            else {
                var r = document.createElement("a"),
                    o = URL.createObjectURL(i);
                r.href = o, r.download = e, document.body.appendChild(r), r.click(), setTimeout(function() {
                    document.body.removeChild(r), window.URL.revokeObjectURL(o)
                }, 0)
            }
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = function() {
            function t(t) {
                this.events = {}, this.context = t || this
            }
            return t.prototype.on = function(t, e, n) {
                var i = t.toLowerCase();
                this.events[i] = this.events[i] || [], this.events[i].push({
                    callback: e,
                    context: n || this.context
                })
            }, t.prototype.detach = function(t, e) {
                var n = t.toLowerCase(),
                    i = this.events[n];
                if (e && i && i.length) for (var r = i.length - 1; r >= 0; r--) i[r].context === e && i.splice(r, 1);
                else this.events[n] = []
            }, t.prototype.fire = function(t, e) {
                void 0 === e && (e = []);
                var n = t.toLowerCase();
                return !this.events[n] || this.events[n].map(function(t) {
                    return t.callback.apply(t.context, e)
                }).indexOf(!1) < 0
            }, t.prototype.clear = function() {
                this.events = {}
            }, t
        }();
        e.EventSystem = i, e.EventsMixin = function(t) {
            var e = new i(t = t || {});
            t.detachEvent = e.detach.bind(e), t.attachEvent = e.on.bind(e), t.callEvent = e.fire.bind(e)
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(8);
        e.DataEvents = i.DataEvents, function(t) {
            t.button = "button", t.imageButton = "imageButton", t.selectButton = "selectButton", t.customHTMLButton = "customButton", t.input = "input", t.separator = "separator", t.title = "title", t.spacer = "spacer", t.menuItem = "menuItem", t.block = "block", t.navItem = "navItem", t.customHTML = "customHTML"
        }(e.ItemType || (e.ItemType = {})), function(t) {
            t.inputCreated = "inputCreated", t.click = "click", t.openMenu = "openmenu", t.beforeHide = "beforeHide", t.afterHide = "afterHide", t.inputFocus = "inputfocus", t.inputBlur = "inputblur"
        }(e.NavigationBarEvents || (e.NavigationBarEvents = {})), function(t) {
            t.pointer = "pointer", t.click = "click"
        }(e.NavigationType || (e.NavigationType = {}))
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(6);
        e.getCount = function(t, e, n) {
            var r = {
                danger: " dhx_navbar-count--color_danger",
                secondary: " dhx_navbar-count--color_secondary",
                primary: " dhx_navbar-count--color_primary",
                success: " dhx_navbar-count--color_success"
            }[t.countColor] || " dhx_navbar-count--color_danger";
            return i.el(".dhx_navbar-count", {
                class: e + r + (!n && parseInt(t.count, 10) > 99 ? " dhx_navbar-count--overlimit" : "")
            }, n && parseInt(t.count, 10) > 99 ? "99+" : t.count)
        }, e.getIcon = function(t, e) {
            return void 0 === t && (t = ""), "dxi" === t.slice(0, 3) && (t = "dxi " + t), i.el("span", {
                class: "dhx_" + e + "__icon " + t
            })
        }, e.navbarComponentMixin = function(t, e, n, a) {
            var s = o(t, e, n),
                u = "ribbon" === t && (e.type === r.ItemType.navItem || e.type === r.ItemType.imageButton);
            return i.el("li", {
                _key: e.id,
                class: s + (e.icon && !e.value && u ? " dhx_ribbon__item--icon" : "") + (e.src && !e.value && u ? " dhx_ribbon__item--icon" : "") + (e.size && u ? " dhx_ribbon__item--" + e.size : ""),
                ".innerHTML": e.type === r.ItemType.customHTML ? e.html : void 0,
                dhx_id: e.type === r.ItemType.customHTML ? e.id : void 0
            }, e.type !== r.ItemType.customHTML ? [a] : void 0)
        }, e.getNavbarButtonCSS = function(t, e) {
            var n = t.color,
                i = t.size,
                r = t.view,
                o = t.full,
                a = t.icon,
                s = t.circle,
                u = t.loading,
                c = t.value,
                l = t.active;
            return ({
                danger: " dhx_button--color_danger",
                secondary: " dhx_button--color_secondary",
                primary: " dhx_button--color_primary",
                success: " dhx_button--color_success"
            }[n] || " dhx_button--color_primary") + ({
                small: " dhx_button--size_small",
                medium: " dhx_button--size_medium"
            }[i] || " dhx_button--size_medium") + ({
                flat: " dhx_button--view_flat",
                link: " dhx_button--view_link"
            }[r] || " dhx_button--view_flat") + (o ? " dhx_button--width_full" : "") + (s ? " dhx_button--circle" : "") + (u ? " dhx_button--loading" : "") + (l ? " dhx_button--active" : "") + (a && !c ? " dhx_button--icon" : "")
        };
        var o = function(t, e, n) {
            var i = "",
                o = "";
            return o = (i = n ? "dhx_menu-item" : "dhx_" + t + "__item") + (e.css ? " " + e.css : ""), e.type !== r.ItemType.spacer && e.type !== r.ItemType.separator || (o += " " + i + "--" + e.type), "button" !== e.type || "sidebar" !== t || e.icon || (o += " dhx_navbar-item--colapse_hidden"), o
        }
    }, function(t, e, n) {
        "use strict";

        function i(t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), i(n(2)), i(n(14)), i(n(31)), i(n(32)), i(n(9)), i(n(3)), i(n(18)), i(n(17)), i(n(34)), i(n(16)), i(n(15))
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(15),
            r = function() {
                function t(t) {
                    this.url = t
                }
                return t.prototype.load = function() {
                    return i.ajax.get(this.url)
                }, t.prototype.save = function(t, e) {
                    switch (e) {
                        case "delete":
                            return i.ajax.delete(this.url, t);
                        case "update":
                        case "insert":
                        default:
                            return i.ajax.post(this.url, t)
                    }
                }, t
            }();
        e.DataProxy = r
    }, function(t, e, n) {
        (function(e, n) {
            !
                function() {
                    var i = 1,
                        r = {},
                        o = !1;

                    function a(t) {
                        e.setImmediate ? n(t) : e.importScripts ? setTimeout(t) : (r[++i] = t, e.postMessage(i, "*"))
                    }
                    function s(t) {
                        "use strict";
                        if ("function" != typeof t && void 0 != t) throw TypeError();
                        if ("object" != typeof this || this && this.then) throw TypeError();
                        var e, n, i = this,
                            r = 0,
                            o = 0,
                            u = [];
                        i.promise = i, i.resolve = function(t) {
                            return e = i.fn, n = i.er, r || (o = t, r = 1, a(d)), i
                        }, i.reject = function(t) {
                            return e = i.fn, n = i.er, r || (o = t, r = 2, a(d)), i
                        }, i._d = 1, i.then = function(t, e) {
                            if (1 != this._d) throw TypeError();
                            var n = new s;
                            return n.fn = t, n.er = e, 3 == r ? n.resolve(o) : 4 == r ? n.reject(o) : u.push(n), n
                        }, i.
                            catch = function(t) {
                            return i.then(null, t)
                        };
                        var c = function(t) {
                            r = t || 4, u.map(function(t) {
                                3 == r && t.resolve(o) || t.reject(o)
                            })
                        };
                        try {
                            "function" == typeof t && t(i.resolve, i.reject)
                        } catch (t) {
                            i.reject(t)
                        }
                        return i;

                        function l(t, e, n, i) {
                            if (2 == r) return i();
                            if ("object" != typeof o && "function" != typeof o || "function" != typeof t) i();
                            else try {
                                var a = 0;
                                t.call(o, function(t) {
                                    a++ || (o = t, e())
                                }, function(t) {
                                    a++ || (o = t, n())
                                })
                            } catch (t) {
                                o = t, n()
                            }
                        }
                        function d() {
                            var t;
                            try {
                                t = o && o.then
                            } catch (t) {
                                return o = t, r = 2, d()
                            }
                            l(t, function() {
                                r = 1, d()
                            }, function() {
                                r = 2, d()
                            }, function() {
                                try {
                                    1 == r && "function" == typeof e ? o = e(o) : 2 == r && "function" == typeof n && (o = n(o), r = 1)
                                } catch (t) {
                                    return o = t, c()
                                }
                                o == i ? (o = TypeError(), c()) : l(t, function() {
                                    c(3)
                                }, c, function() {
                                    c(1 == r && 3)
                                })
                            })
                        }
                    }(e = this).setImmediate || e.addEventListener("message", function(t) {
                        if (t.source == e) if (o) a(r[t.data]);
                        else {
                            o = !0;
                            try {
                                r[t.data]()
                            } catch (t) {}
                            delete r[t.data], o = !1
                        }
                    }), s.resolve = function(t) {
                        if (1 != this._d) throw TypeError();
                        return t instanceof s ? t : new s(function(e) {
                            e(t)
                        })
                    }, s.reject = function(t) {
                        if (1 != this._d) throw TypeError();
                        return new s(function(e, n) {
                            n(t)
                        })
                    }, s.all = function(t) {
                        if (1 != this._d) throw TypeError();
                        if (!(t instanceof Array)) return s.reject(TypeError());
                        var e = new s;
                        return function n(i, r) {
                            return r ? e.resolve(r) : i ? e.reject(i) : (0 == t.reduce(function(t, e) {
                                return e && e.then ? t + 1 : t
                            }, 0) && e.resolve(t), void t.map(function(e, i) {
                                e && e.then && e.then(function(e) {
                                    return t[i] = e, n(), e
                                }, n)
                            }))
                        }(), e
                    }, s.race = function(t) {
                        if (1 != this._d) throw TypeError();
                        if (!(t instanceof Array)) return s.reject(TypeError());
                        if (0 == t.length) return new s;
                        var e = new s;
                        return function n(i, r) {
                            return r ? e.resolve(r) : i ? e.reject(i) : (0 == t.reduce(function(t, e) {
                                return e && e.then ? t + 1 : t
                            }, 0) && e.resolve(t), void t.map(function(t, e) {
                                t && t.then && t.then(function(t) {
                                    n(null, t)
                                }, n)
                            }))
                        }(), e
                    }, s._d = 1, t.exports = s
                }()
        }).call(this, n(11), n(24).setImmediate)
    }, function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function(t, e, n) {
        "use strict";

        function i(t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), i(n(37)), i(n(39)), i(n(6))
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(1);

        function r(t) {
            for (var e = t.toLowerCase().match(/\w+/g), n = 0, i = "", r = 0; r < e.length; r++) {
                var o = e[r];
                "ctrl" === o ? n += 4 : "shift" === o ? n += 2 : "alt" === o ? n += 1 : i = o
            }
            return n + i
        }
        var o = function() {
            function t() {
                var t = this;
                this._keysStorage = {}, document.addEventListener("keydown", function(e) {
                    var n, r = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0) + ((n = e.which >= 48 && e.which <= 57 || e.which >= 65 && e.which <= 90 ? String.fromCharCode(e.which) : 32 !== e.which || i.isIE() ? e.key : e.code) && n.toLowerCase()),
                        o = t._keysStorage[r];
                    if (o) for (var a = 0; a < o.length; a++) o[a].handler(e)
                })
            }
            return t.prototype.addHotKey = function(t, e, n) {
                var i = r(t);
                this._keysStorage[i] || (this._keysStorage[i] = []), this._keysStorage[i].push({
                    handler: e,
                    scope: n
                })
            }, t.prototype.removeHotKey = function(t, e) {
                var n = this._keysStorage;
                t && delete n[i = r(t)];
                if (e) for (var i in n) {
                    for (var o = [], a = 0; a < n[i].length; a++) n[i][a].scope === e && o.push(a);
                    if (n[i].length === o.length) delete n[i];
                    else for (a = o.length - 1; a >= 0; a--) n[i].splice(o[a], 1)
                }
            }, t.prototype.exist = function(t) {
                var e = r(t);
                return !!this._keysStorage[e]
            }, t
        }();
        e.keyManager = new o, e.addHotkeys = function(t, n) {
            var i = new Date,
                r = function(t) {
                    return function(e) {
                        n && !1 === n() || t(e)
                    }
                };
            for (var o in t) e.keyManager.addHotKey(o, r(t[o]), i);
            return function() {
                return e.keyManager.removeHotKey(void 0, i)
            }
        }
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__assign ||
            function() {
                return (i = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(5),
            o = n(23),
            a = n(29),
            s = n(9),
            u = n(3),
            c = n(2),
            l = n(4),
            d = function() {
                function t(t, e) {
                    this.config = t || {}, this._order = [], this._pull = {}, this._changes = {
                        order: []
                    }, this._initOrder = null, this._sort = new a.Sort, this._loader = new o.Loader(this, this._changes), this.events = e || new r.EventSystem(this), this.events.on(c.DataEvents.loadError, function(t) {
                        "string" != typeof t ? u.dhxError(t) : u.dhxWarning(t)
                    })
                }
                return t.prototype.add = function(t, e) {
                    var n = this;
                    if (this.events.fire(c.DataEvents.beforeAdd, [t])) {
                        if (Array.isArray(t)) return t.map(function(t, i) {
                            0 !== i && (e += 1);
                            var r = n._addCore(t, e);
                            return n._onChange("add", t.id, t), n.events.fire(c.DataEvents.afterAdd, [t]), r
                        });
                        var i = this._addCore(t, e);
                        return this._onChange("add", t.id, t), this.events.fire(c.DataEvents.afterAdd, [t]), i
                    }
                }, t.prototype.remove = function(t) {
                    var e = this;
                    if (t) if (t instanceof Array) t.map(function(t) {
                        var n = e._pull[t];
                        if (n) {
                            if (!e.events.fire(c.DataEvents.beforeRemove, [n])) return;
                            e._removeCore(n.id), e._onChange("remove", t, n)
                        }
                        e.events.fire(c.DataEvents.afterRemove, [n])
                    });
                    else {
                        var n = this._pull[t];
                        if (n) {
                            if (!this.events.fire(c.DataEvents.beforeRemove, [n])) return;
                            this._removeCore(n.id), this._onChange("remove", t, n)
                        }
                        this.events.fire(c.DataEvents.afterRemove, [n])
                    }
                }, t.prototype.removeAll = function() {
                    this._removeAll(), this.events.fire(c.DataEvents.removeAll), this.events.fire(c.DataEvents.change)
                }, t.prototype.exists = function(t) {
                    return !!this._pull[t]
                }, t.prototype.getNearId = function(t) {
                    if (!this._pull[t]) return this._order[0].id || ""
                }, t.prototype.getItem = function(t) {
                    return this._pull[t]
                }, t.prototype.update = function(t, e, n) {
                    var i = this.getItem(t);
                    if (i) {
                        if (u.isEqualObj(e, i)) return;
                        e.id && t !== e.id ? (u.dhxWarning("this method doesn't allow change id"), u.isDebug()) : (l.extend(this._pull[t], e, !1), this.config.update && this.config.update(this._pull[t]), n || this._onChange("update", t, this._pull[t]))
                    } else u.dhxWarning("item not found")
                }, t.prototype.getIndex = function(t) {
                    var e = l.findIndex(this._order, function(e) {
                        return e.id === t
                    });
                    return this._pull[t] && e >= 0 ? e : -1
                }, t.prototype.getId = function(t) {
                    if (this._order[t]) return this._order[t].id
                }, t.prototype.getLength = function() {
                    return this._order.length
                }, t.prototype.filter = function(t, e) {
                    if ((e = l.extend({
                        add: !1,
                        multiple: !0
                    }, e)).add || (this._order = this._initOrder || this._order, this._initOrder = null), this._filters = this._filters || {}, e.multiple && t || (this._filters = {}), t) {
                        if ("function" == typeof t) {
                            this._filters._ = {
                                match: "_",
                                compare: t
                            }
                        } else t.match ? (t.compare = t.compare ||
                            function(t, e) {
                                return t === e
                            }, this._filters[t.by] = t) : delete this._filters[t.by];
                        this._applyFilters()
                    }
                    this.events.fire(c.DataEvents.change)
                }, t.prototype.find = function(t) {
                    for (var e in this._pull) {
                        var n = u.findByConf(this._pull[e], t);
                        if (n) return n
                    }
                    return null
                }, t.prototype.findAll = function(t) {
                    var e = [];
                    for (var n in this._pull) {
                        var i = u.findByConf(this._pull[n], t);
                        i && e.push(i)
                    }
                    return e
                }, t.prototype.sort = function(t) {
                    if (t) this._sort.sort(this._order, t), this._initOrder && this._initOrder.length && this._sort.sort(this._initOrder, t);
                    else {
                        for (var e in this._order = [], this._pull) this._order.push(this._pull[e]);
                        this._applyFilters()
                    }
                    this.events.fire(c.DataEvents.change)
                }, t.prototype.copy = function(e, n, r, o) {
                    var a = this;
                    if (e instanceof Array) return e.map(function(e, s) {
                        if (!a.exists(e)) return null;
                        var c = l.uid(),
                            d = -1 === n ? -1 : n + s;
                        return r ? r instanceof t || !o ? r.exists(e) ? (r.add(i({}, u.copyWithoutInner(a.getItem(e)), {
                            id: c
                        }), d), c) : (r.add(u.copyWithoutInner(a.getItem(e)), d), e) : void r.add(u.copyWithoutInner(a.getItem(e)), d) : (a.add(i({}, u.copyWithoutInner(a.getItem(e)), {
                            id: c
                        }), d), c)
                    });
                    if (!this.exists(e)) return null;
                    var s = l.uid();
                    return r ? r instanceof t || !o ? r.exists(e) ? (r.add(i({}, u.copyWithoutInner(this.getItem(e)), {
                        id: s
                    }), n), s) : (r.add(u.copyWithoutInner(this.getItem(e)), n), e) : void r.add(u.copyWithoutInner(this.getItem(e)), n) : (this.add(i({}, u.copyWithoutInner(this.getItem(e)), {
                        id: s
                    }), n), s)
                }, t.prototype.move = function(t, e, n, i) {
                    var r = this;
                    if (t instanceof Array) return t.map(function(t, o) {
                        var a = -1 === e ? -1 : e + o;
                        if (n && n !== r && r.exists(t)) {
                            var s = l.copy(r.getItem(t), !0);
                            return n.exists(t) && (s.id = l.uid()), i && (s.parent = i), n.add(s, a), r.remove(t), s.id
                        }
                        if (r.getIndex(t) === a) return null;
                        var u = r._order.splice(r.getIndex(t), 1)[0];
                        return -1 === e && (e = r._order.length), r._order.splice(a, 0, u), r.events.fire(c.DataEvents.change), t
                    });
                    if (n && n !== this && this.exists(t)) {
                        var o = l.copy(this.getItem(t), !0);
                        return n.exists(t) && (o.id = l.uid()), i && (o.parent = i), n.add(o, e), this.remove(t), o.id
                    }
                    if (this.getIndex(t) === e) return null;
                    var a = this._order.splice(this.getIndex(t), 1)[0];
                    return -1 === e && (e = this._order.length), this._order.splice(e, 0, a), this.events.fire(c.DataEvents.change), t
                }, t.prototype.load = function(t, e) {
                    return "string" == typeof t && (t = new s.DataProxy(t)), this._loader.load(t, e)
                }, t.prototype.parse = function(t, e) {
                    return this._removeAll(), this._loader.parse(t, e)
                }, t.prototype.$parse = function(t) {
                    var e = this.config.approximate;
                    e && (t = this._approximate(t, e.value, e.maxNum)), this._parse_data(t), this.events.fire(c.DataEvents.change, ["load"]), this.events.fire(c.DataEvents.load)
                }, t.prototype.save = function(t) {
                    this._loader.save(t)
                }, t.prototype.isSaved = function() {
                    return !this._changes.order.length
                }, t.prototype.map = function(t) {
                    for (var e = [], n = 0; n < this._order.length; n++) e.push(t.call(this, this._order[n], n));
                    return e
                }, t.prototype.mapRange = function(t, e, n) {
                    t < 0 && (t = 0), e > this._order.length - 1 && (e = this._order.length - 1);
                    for (var i = [], r = t; r <= e; r++) i.push(n.call(this, this._order[r], r));
                    return i
                }, t.prototype.reduce = function(t, e) {
                    for (var n = 0; n < this._order.length; n++) e = t.call(this, e, this._order[n], n);
                    return e
                }, t.prototype.serialize = function(t) {
                    void 0 === t && (t = c.DataDriver.json);
                    var e = this.map(function(t) {
                            var e = i({}, t);
                            return Object.keys(e).forEach(function(t) {
                                "$" === t[0] && delete e[t]
                            }), e
                        }),
                        n = u.toDataDriver(t);
                    if (n) return n.serialize(e)
                }, t.prototype.getInitialData = function() {
                    return this._initOrder
                }, t.prototype._removeAll = function() {
                    this._pull = {}, this._order = [], this._changes.order = [], this._initOrder = null
                }, t.prototype._addCore = function(t, e) {
                    return this.config.init && (t = this.config.init(t)), t.id = t.id ? t.id.toString() : l.uid(), this._pull[t.id] && u.dhxError("Item already exist"), this._initOrder && this._initOrder.length && this._addToOrder(this._initOrder, t, e), this._addToOrder(this._order, t, e), t.id
                }, t.prototype._removeCore = function(t) {
                    this.getIndex(t) >= 0 && (this._order = this._order.filter(function(e) {
                        return e.id !== t
                    }), delete this._pull[t]), this._initOrder && this._initOrder.length && (this._initOrder = this._initOrder.filter(function(e) {
                        return e.id !== t
                    }))
                }, t.prototype._parse_data = function(t) {
                    var e = this._order.length;
                    this.config.prep && (t = this.config.prep(t));
                    for (var n = 0, i = t; n < i.length; n++) {
                        var r = i[n];
                        this.config.init && (r = this.config.init(r)), r.id = r.id || 0 === r.id ? r.id : l.uid(), this._pull[r.id] = r, this._order[e++] = r
                    }
                }, t.prototype._approximate = function(t, e, n) {
                    for (var i = t.length, r = e.length, o = Math.floor(i / n), a = Array(Math.ceil(i / o)), s = 0, u = 0; u < i; u += o) {
                        for (var c = l.copy(t[u]), d = Math.min(i, u + o), f = 0; f < r; f++) {
                            for (var h = 0, p = u; p < d; p++) h += t[p][e[f]];
                            c[e[f]] = h / (d - u)
                        }
                        a[s++] = c
                    }
                    return a
                }, t.prototype._onChange = function(t, e, n) {
                    for (var r = 0, o = this._changes.order; r < o.length; r++) {
                        var a = o[r];
                        if (a.id === e && !a.saving) return a.error && (a.error = !1), a = i({}, a, {
                            obj: n,
                            status: t
                        }), void this.events.fire(c.DataEvents.change, [e, t, n])
                    }
                    this._changes.order.push({
                        id: e,
                        status: t,
                        obj: i({}, n),
                        saving: !1
                    }), this.events.fire(c.DataEvents.change, [e, t, n])
                }, t.prototype._addToOrder = function(t, e, n) {
                    n >= 0 && t[n] ? (this._pull[e.id] = e, t.splice(n, 0, e)) : (this._pull[e.id] = e, t.push(e))
                }, t.prototype._applyFilters = function() {
                    var t = this;
                    if (this._filters && Object.keys(this._filters).length) {
                        var e = this._order.filter(function(e) {
                            return Object.keys(t._filters).every(function(n) {
                                return e[n] ? t._filters[n].compare(e[n], t._filters[n].match, e) : t._filters[n].compare(e)
                            })
                        });
                        this._initOrder || (this._initOrder = this._order), this._order = e
                    }
                }, t
            }();
        e.DataCollection = d
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(2),
                r = n(3);

            function o(t) {
                return t ? t.indexOf("json") >= 0 ? "json" : t.indexOf("xml") >= 0 ? "xml" : "text" : "text"
            }
            function a(e, n, a, s, u) {
                var c = s || {};
                if (u && (c.Accept = "application/" + u), "GET" !== a && (c["Content-Type"] = c["Content-Type"] || "application/json"), "GET" === a) {
                    var l = n && "object" == typeof n ?
                        function(t) {
                            return Object.keys(t).reduce(function(e, n) {
                                var i = "object" == typeof t[n] ? JSON.stringify(t[n]) : t[n];
                                return e.push(n + "=" + encodeURIComponent(i)), e
                            }, []).join("&")
                        }(n) : n && "string" == typeof n ? n : "";
                    l && (e += -1 === e.indexOf("?") ? "?" : "&", e += l), n = null
                }
                return window.fetch ? window.fetch(e, {
                    method: a,
                    body: n ? JSON.stringify(n) : null,
                    headers: c
                }).then(function(e) {
                    if (!e.ok) return e.text().then(function(n) {
                        return t.reject({
                            status: e.status,
                            statusText: e.statusText,
                            message: n
                        })
                    });
                    var n = u || o(e.headers.get("Content-Type"));
                    if ("raw" === n) return {
                        headers: Object.fromEntries(e.headers.entries()),
                        url: e.url,
                        body: e.body
                    };
                    if (204 !== e.status) switch (n) {
                        case "json":
                            return e.json();
                        case "xml":
                            var a = r.toDataDriver(i.DataDriver.xml);
                            return a ? e.text().then(a.toJsonObject) : e.text();
                        default:
                            return e.text()
                    }
                }) : new t(function(t, s) {
                    var l = new XMLHttpRequest;
                    for (var d in l.onload = function() {
                        l.status >= 200 && l.status < 300 ? ("raw" === u && t({
                            url: l.responseURL,
                            headers: l.getAllResponseHeaders().trim().split(/[\r\n]+/).reduce(function(t, e) {
                                var n = e.split(": ");
                                return t[n[0]] = n[1], t
                            }, {}),
                            body: l.response
                        }), 204 === l.status ? t() : t(function(t, e) {
                            switch (e) {
                                case "json":
                                    return JSON.parse(t);
                                case "text":
                                    return t;
                                case "xml":
                                    var n = r.toDataDriver(i.DataDriver.xml);
                                    return n ? n.toJsonObject(t) : {
                                        parseError: "Incorrect data driver type: 'xml'"
                                    };
                                default:
                                    return t
                            }
                        }(l.responseText, u || o(l.getResponseHeader("Content-Type"))))) : s({
                            status: l.status,
                            statusText: l.statusText
                        })
                    }, l.onerror = function() {
                        s({
                            status: l.status,
                            statusText: l.statusText,
                            message: l.responseText
                        })
                    }, l.open(a, e), c) l.setRequestHeader(d, c[d]);
                    switch (a) {
                        case "POST":
                        case "DELETE":
                        case "PUT":
                            l.send(n && JSON.stringify(n));
                            break;
                        case "GET":
                        default:
                            l.send()
                    }
                })
            }
            e.ajax = {
                get: function(t, e, n) {
                    return a(t, e, "GET", n && n.headers, void 0 !== n ? n.responseType : void 0)
                },
                post: function(t, e, n) {
                    return a(t, e, "POST", n && n.headers, void 0 !== n ? n.responseType : void 0)
                },
                put: function(t, e, n) {
                    return a(t, e, "PUT", n && n.headers, void 0 !== n ? n.responseType : void 0)
                },
                delete: function(t, e, n) {
                    return a(t, e, "DELETE", n && n.headers, void 0 !== n ? n.responseType : void 0)
                }
            }
        }).call(this, n(10))
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__assign ||
            function() {
                return (i = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(17),
            o = n(18),
            a = n(27);
        e.dataDrivers = {
            json: r.JsonDriver,
            csv: o.CsvDriver
        }, e.dataDriversPro = i({}, e.dataDrivers, {
            xml: a.XMLDriver
        })
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = function() {
            function t() {}
            return t.prototype.toJsonArray = function(t) {
                return this.getRows(t)
            }, t.prototype.serialize = function(t) {
                return t
            }, t.prototype.getFields = function(t) {
                return t
            }, t.prototype.getRows = function(t) {
                return "string" == typeof t ? JSON.parse(t) : t
            }, t
        }();
        e.JsonDriver = i
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__assign ||
            function() {
                return (i = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            function t(t) {
                this.config = i({}, {
                    skipHeader: 0,
                    nameByHeader: !1,
                    rowDelimiter: "\n",
                    columnDelimiter: ","
                }, t), this.config.nameByHeader && (this.config.skipHeader = 1)
            }
            return t.prototype.getFields = function(t, e) {
                for (var n = t.trim().split(this.config.columnDelimiter), i = {}, r = 0; r < n.length; r++) i[e ? e[r] : r + 1] = n[r];
                return i
            }, t.prototype.getRows = function(t) {
                return t.trim().split(this.config.rowDelimiter)
            }, t.prototype.toJsonArray = function(t) {
                var e = this,
                    n = this.getRows(t),
                    i = this.config.names;
                if (this.config.skipHeader) {
                    var r = n.splice(0, this.config.skipHeader);
                    this.config.nameByHeader && (i = r[0].trim().split(this.config.columnDelimiter))
                }
                return n.map(function(t) {
                    return e.getFields(t, i)
                })
            }, t.prototype.serialize = function(t, e) {
                var n = t[0] ? Object.keys(t[0]).filter(function(t) {
                        return "$" !== t[0]
                    }).join(this.config.columnDelimiter) : "",
                    i = this._serialize(t);
                return e ? i : n + i
            }, t.prototype._serialize = function(t) {
                var e = this;
                return t.reduce(function(t, n) {
                    var i = Object.keys(n).reduce(function(t, i, r) {
                        return "$" === i[0] || "items" === i ? t : "" + t + n[i] + (r === n.length - 1 ? "" : e.config.columnDelimiter)
                    }, "");
                    return n.items ? t + "\n" + i + e._serialize(n.items) : "" + t + e.config.rowDelimiter + i
                }, "")
            }, t
        }();
        e.CsvDriver = r
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), function(t) {
            t.beforeUnSelect = "beforeunselect", t.afterUnSelect = "afterunselect", t.beforeSelect = "beforeselect", t.afterSelect = "afterselect"
        }(e.SelectionEvents || (e.SelectionEvents = {}))
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(4),
            r = n(1),
            o = function() {
                function t(t, e) {
                    this._uid = i.uid(), this.config = e || {}
                }
                return t.prototype.mount = function(t, e) {
                    e && (this._view = e), t && this._view && this._view.mount && (this._container = r.toNode(t), this._container.tagName ? this._view.mount(this._container) : this._container.attach && this._container.attach(this))
                }, t.prototype.unmount = function() {
                    var t = this.getRootView();
                    t && t.node && (t.unmount(), this._view = null)
                }, t.prototype.getRootView = function() {
                    return this._view
                }, t.prototype.getRootNode = function() {
                    return this._view && this._view.node && this._view.node.el
                }, t.prototype.paint = function() {
                    this._view && (this._view.node || this._container) && (this._doNotRepaint = !1, this._view.redraw())
                }, t
            }();
        e.View = o, e.toViewLike = function(t) {
            return {
                getRootView: function() {
                    return t
                },
                paint: function() {
                    return t.node && t.redraw()
                },
                mount: function(e) {
                    return t.mount(e)
                }
            }
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n(22);
        var i = n(8);
        e.TreeCollection = i.TreeCollection;
        var r = n(35);
        e.ContextMenu = r.ContextMenu;
        var o = n(50);
        e.Tree = o.Tree
    }, function(t, e, n) {}, function(t, e, n) {
        "use strict";
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(3),
                r = n(2),
                o = function() {
                    function e(t, e) {
                        this._parent = t, this._changes = e
                    }
                    return e.prototype.load = function(t, e) {
                        var n = this;
                        return this._parent.loadData = t.load().then(function(t) {
                            return n._parent.removeAll(), n.parse(t, e)
                        }).
                        catch (function(t) {
                            n._parent.events.fire(r.DataEvents.loadError, [t])
                        })
                    }, e.prototype.parse = function(t, e) {
                        return void 0 === e && (e = "json"), "json" !== e || i.hasJsonOrArrayStructure(t) || this._parent.events.fire(r.DataEvents.loadError, ["Uncaught SyntaxError: Unexpected end of input"]), t = (e = i.toDataDriver(e)).toJsonArray(t), this._parent.$parse(t), t
                    }, e.prototype.save = function(e) {
                        for (var n = this, r = function(r) {
                            if (r.saving || r.pending) i.dhxWarning("item is saving");
                            else {
                                var a = o._findPrevState(r.id);
                                if (a && a.saving) {
                                    var s = new t(function(t, o) {
                                        a.promise.then(function() {
                                            r.pending = !1, t(n._setPromise(r, e))
                                        }).
                                        catch (function(t) {
                                            n._removeFromOrder(a), n._setPromise(r, e), i.dhxWarning(t), o(t)
                                        })
                                    });
                                    o._addToChain(s), r.pending = !0
                                } else o._setPromise(r, e)
                            }
                        }, o = this, a = 0, s = this._changes.order; a < s.length; a++) {
                            r(s[a])
                        }
                        this._parent.saveData.then(function() {
                            n._saving = !1
                        })
                    }, e.prototype._setPromise = function(t, e) {
                        var n = this;
                        return t.promise = e.save(t.obj, t.status), t.promise.then(function() {
                            n._removeFromOrder(t)
                        }).
                        catch (function(e) {
                            t.saving = !1, t.error = !0, i.dhxError(e)
                        }), t.saving = !0, this._saving = !0, this._addToChain(t.promise), t.promise
                    }, e.prototype._addToChain = function(t) {
                        this._parent.saveData && this._saving ? this._parent.saveData = this._parent.saveData.then(function() {
                            return t
                        }) : this._parent.saveData = t
                    }, e.prototype._findPrevState = function(t) {
                        for (var e = 0, n = this._changes.order; e < n.length; e++) {
                            var i = n[e];
                            if (i.id === t) return i
                        }
                        return null
                    }, e.prototype._removeFromOrder = function(t) {
                        this._changes.order = this._changes.order.filter(function(e) {
                            return !i.isEqualObj(e, t)
                        })
                    }, e
                }();
            e.Loader = o
        }).call(this, n(10))
    }, function(t, e, n) {
        (function(t) {
            var i = void 0 !== t && t || "undefined" != typeof self && self || window,
                r = Function.prototype.apply;

            function o(t, e) {
                this._id = t, this._clearFn = e
            }
            e.setTimeout = function() {
                return new o(r.call(setTimeout, i, arguments), clearTimeout)
            }, e.setInterval = function() {
                return new o(r.call(setInterval, i, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function(t) {
                t && t.close()
            }, o.prototype.unref = o.prototype.ref = function() {}, o.prototype.close = function() {
                this._clearFn.call(i, this._id)
            }, e.enroll = function(t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function(t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                    t._onTimeout && t._onTimeout()
                }, e))
            }, n(25), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
        }).call(this, n(11))
    }, function(t, e, n) {
        (function(t, e) {
            !
                function(t, n) {
                    "use strict";
                    if (!t.setImmediate) {
                        var i, r = 1,
                            o = {},
                            a = !1,
                            s = t.document,
                            u = Object.getPrototypeOf && Object.getPrototypeOf(t);
                        u = u && u.setTimeout ? u : t, "[object process]" === {}.toString.call(t.process) ? i = function(t) {
                            e.nextTick(function() {
                                l(t)
                            })
                        } : function() {
                            if (t.postMessage && !t.importScripts) {
                                var e = !0,
                                    n = t.onmessage;
                                return t.onmessage = function() {
                                    e = !1
                                }, t.postMessage("", "*"), t.onmessage = n, e
                            }
                        }() ?
                            function() {
                                var e = "setImmediate$" + Math.random() + "$",
                                    n = function(n) {
                                        n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && l(+n.data.slice(e.length))
                                    };
                                t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), i = function(n) {
                                    t.postMessage(e + n, "*")
                                }
                            }() : t.MessageChannel ?
                                function() {
                                    var t = new MessageChannel;
                                    t.port1.onmessage = function(t) {
                                        l(t.data)
                                    }, i = function(e) {
                                        t.port2.postMessage(e)
                                    }
                                }() : s && "onreadystatechange" in s.createElement("script") ?
                                    function() {
                                        var t = s.documentElement;
                                        i = function(e) {
                                            var n = s.createElement("script");
                                            n.onreadystatechange = function() {
                                                l(e), n.onreadystatechange = null, t.removeChild(n), n = null
                                            }, t.appendChild(n)
                                        }
                                    }() : i = function(t) {
                                        setTimeout(l, 0, t)
                                    }, u.setImmediate = function(t) {
                            "function" != typeof t && (t = new Function("" + t));
                            for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                            var a = {
                                callback: t,
                                args: e
                            };
                            return o[r] = a, i(r), r++
                        }, u.clearImmediate = c
                    }
                    function c(t) {
                        delete o[t]
                    }
                    function l(t) {
                        if (a) setTimeout(l, 0, t);
                        else {
                            var e = o[t];
                            if (e) {
                                a = !0;
                                try {
                                    !
                                        function(t) {
                                            var e = t.callback,
                                                i = t.args;
                                            switch (i.length) {
                                                case 0:
                                                    e();
                                                    break;
                                                case 1:
                                                    e(i[0]);
                                                    break;
                                                case 2:
                                                    e(i[0], i[1]);
                                                    break;
                                                case 3:
                                                    e(i[0], i[1], i[2]);
                                                    break;
                                                default:
                                                    e.apply(n, i)
                                            }
                                        }(e)
                                } finally {
                                    c(t), a = !1
                                }
                            }
                        }
                    }
                }("undefined" == typeof self ? void 0 === t ? this : t : self)
        }).call(this, n(11), n(26))
    }, function(t, e) {
        var n, i, r = t.exports = {};

        function o() {
            throw new Error("setTimeout has not been defined")
        }
        function a() {
            throw new Error("clearTimeout has not been defined")
        }
        function s(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }!
            function() {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : o
                } catch (t) {
                    n = o
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (t) {
                    i = a
                }
            }();
        var u, c = [],
            l = !1,
            d = -1;

        function f() {
            l && u && (l = !1, u.length ? c = u.concat(c) : d = -1, c.length && h())
        }
        function h() {
            if (!l) {
                var t = s(f);
                l = !0;
                for (var e = c.length; e;) {
                    for (u = c, c = []; ++d < e;) u && u[d].run();
                    d = -1, e = c.length
                }
                u = null, l = !1, function(t) {
                    if (i === clearTimeout) return clearTimeout(t);
                    if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                    try {
                        i(t)
                    } catch (e) {
                        try {
                            return i.call(null, t)
                        } catch (e) {
                            return i.call(this, t)
                        }
                    }
                }(t)
            }
        }
        function p(t, e) {
            this.fun = t, this.array = e
        }
        function v() {}
        r.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            c.push(new p(t, e)), 1 !== c.length || l || s(h)
        }, p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = v, r.addListener = v, r.once = v, r.off = v, r.removeListener = v, r.removeAllListeners = v, r.emit = v, r.prependListener = v, r.prependOnceListener = v, r.listeners = function(t) {
            return []
        }, r.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, r.cwd = function() {
            return "/"
        }, r.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, r.umask = function() {
            return 0
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(28);
        var r = function() {
            function t() {}
            return t.prototype.toJsonArray = function(t) {
                return this.getRows(t)
            }, t.prototype.toJsonObject = function(t) {
                var e;
                return "string" == typeof t && (e = this._fromString(t)), function t(e, n) {
                    n = n || {};
                    var i = e.attributes;
                    if (i && i.length) for (var r = 0; r < i.length; r++) n[i[r].name] = i[r].value;
                    var o = e.childNodes;
                    for (r = 0; r < o.length; r++) if (1 === o[r].nodeType) {
                        var a = o[r].tagName;
                        n[a] ? ("function" != typeof n[a].push && (n[a] = [n[a]]), n[a].push(t(o[r], {}))) : n[a] = t(o[r], {})
                    }
                    return n
                }(e)
            }, t.prototype.serialize = function(t) {
                return i.jsonToXML(t)
            }, t.prototype.getFields = function(t) {
                return t
            }, t.prototype.getRows = function(t) {
                if ("string" == typeof t && (t = this._fromString(t)), t) {
                    var e = t.childNodes && t.childNodes[0] && t.childNodes[0].childNodes;
                    return e && e.length ? this._getRows(e) : null
                }
                return []
            }, t.prototype._getRows = function(t) {
                for (var e = [], n = 0; n < t.length; n++)"item" === t[n].tagName && e.push(this._nodeToJS(t[n]));
                return e
            }, t.prototype._fromString = function(t) {
                try {
                    return (new DOMParser).parseFromString(t, "text/xml")
                } catch (t) {
                    return null
                }
            }, t.prototype._nodeToJS = function(t) {
                var e = {};
                if (this._haveAttrs(t)) for (var n = t.attributes, i = 0; i < n.length; i++) {
                    var r = n[i],
                        o = r.name,
                        a = r.value;
                    e[o] = this._toType(a)
                }
                if (3 === t.nodeType) return e.value = e.value || this._toType(t.textContent), e;
                var s = t.childNodes;
                if (s) for (i = 0; i < s.length; i++) {
                    var u = s[i],
                        c = u.tagName;
                    c && ("items" === c && u.childNodes ? e[c] = this._getRows(u.childNodes) : this._haveAttrs(u) ? e[c] = this._nodeToJS(u) : e[c] = this._toType(u.textContent))
                }
                return e
            }, t.prototype._toType = function(t) {
                return "false" === t || "true" === t ? "true" === t : isNaN(t) ? t : Number(t)
            }, t.prototype._haveAttrs = function(t) {
                return t.attributes && t.attributes.length
            }, t
        }();
        e.XMLDriver = r
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = 4;

        function r(t) {
            return " ".repeat(t)
        }
        function o(t, e) {
            void 0 === e && (e = i);
            var n = r(e) + "<item>\n";
            for (var a in t) Array.isArray(t[a]) ? (n += r(e + i) + "<" + a + ">\n", n += t[a].map(function(t) {
                return o(t, e + 2 * i)
            }).join("\n") + "\n", n += r(e + i) + "</" + a + ">\n") : n += r(e + i) + "<" + a + ">" + t[a] + "</" + a + ">\n";
            return n += r(e) + "</item>"
        }
        e.jsonToXML = function(t, e) {
            void 0 === e && (e = "root");
            for (var n = '<?xml version="1.0" encoding="iso-8859-1"?>\n<' + e + ">", i = 0; i < t.length; i++) n += "\n" + o(t[i]);
            return n + "\n</" + e + ">"
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(3),
            r = function() {
                function t() {}
                return t.prototype.sort = function(t, e) {
                    var n = this;
                    e.rule && "function" == typeof e.rule ? this._sort(t, e) : e.by && (e.rule = function(t, r) {
                        var o = n._checkVal(e.as, t[e.by]),
                            a = n._checkVal(e.as, r[e.by]);
                        return i.naturalCompare(o.toString(), a.toString())
                    }, this._sort(t, e))
                }, t.prototype._checkVal = function(t, e) {
                    return t ? t.call(this, e) : e
                }, t.prototype._sort = function(t, e) {
                    var n = this,
                        i = {
                            asc: 1,
                            desc: -1
                        };
                    return t.sort(function(t, r) {
                        return e.rule.call(n, t, r) * (i[e.dir] || i.asc)
                    })
                }, t
            }();
        e.Sort = r
    }, function(t, e) {
        if (Element && !Element.prototype.matches) {
            var n = Element.prototype;
            n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
        }
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__extends ||
            function() {
                var t = function(e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array &&
                        function(t, e) {
                            t.__proto__ = e
                        } ||
                        function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function(e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(4),
            o = n(14),
            a = n(9),
            s = n(3),
            u = n(2);

        function c(t, e, n, i) {
            void 0 !== i && -1 !== i && t[n] && t[n][i] ? t[n].splice(i, 0, e) : (t[n] || (t[n] = []), t[n].push(e))
        }
        var l = function(t) {
            function e(e, n) {
                var i, o = t.call(this, e, n) || this,
                    a = o._root = "_ROOT_" + r.uid();
                return o._childs = ((i = {})[a] = [], i), o._initChilds = null, o
            }
            return i(e, t), e.prototype.add = function(e, n, i) {
                var r = this;
                if (void 0 === n && (n = -1), void 0 === i && (i = this._root), "object" != typeof e && (e = {
                    value: e
                }), Array.isArray(e)) return e.map(function(e, o) {
                    o > 0 && -1 !== n && (n += 1), e.parent = e.parent ? e.parent.toString() : i;
                    var a = t.prototype.add.call(r, e, n);
                    if (Array.isArray(e.items)) for (var s = 0, u = e.items; s < u.length; s++) {
                        var c = u[s];
                        r.add(c, -1, e.id)
                    }
                    return a
                });
                e.parent = e.parent ? e.parent.toString() : i;
                var o = t.prototype.add.call(this, e, n);
                if (Array.isArray(e.items)) for (var a = 0, s = e.items; a < s.length; a++) {
                    var u = s[a];
                    this.add(u, -1, e.id)
                }
                return o
            }, e.prototype.getRoot = function() {
                return this._root
            }, e.prototype.getParent = function(t, e) {
                if (void 0 === e && (e = !1), !this._pull[t]) return null;
                var n = this._pull[t].parent;
                return e ? this._pull[n] : n
            }, e.prototype.getItems = function(t) {
                return this._childs && this._childs[t] ? this._childs[t] : []
            }, e.prototype.getLength = function(t) {
                return void 0 === t && (t = this._root), this._childs[t] ? this._childs[t].length : null
            }, e.prototype.removeAll = function(e) {
                var n;
                if (e) for (var i = 0, r = this._childs[e].slice(); i < r.length; i++) {
                    var o = r[i];
                    this.remove(o.id)
                } else {
                    t.prototype.removeAll.call(this);
                    var a = this._root;
                    this._initChilds = null, this._childs = ((n = {})[a] = [], n)
                }
            }, e.prototype.getIndex = function(t) {
                var e = this.getParent(t);
                return e && this._childs[e] ? r.findIndex(this._childs[e], function(e) {
                    return e.id === t
                }) : -1
            }, e.prototype.sort = function(t) {
                var e = this;
                if (t) {
                    for (var n in this._childs) this._sort.sort(this._childs[n], t);
                    if (this._initChilds && Object.keys(this._initChilds).length) for (var n in this._initChilds) this._sort.sort(this._initChilds[n], t)
                } else if (this._childs = {}, this._parse_data(Object.keys(this._pull).map(function(t) {
                    return e._pull[t]
                })), this._filters) for (var n in this._filters) {
                    var i = this._filters[n];
                    this.filter(i.rule, i.config)
                }
                this.events.fire(u.DataEvents.change)
            }, e.prototype.map = function(t, e, n) {
                void 0 === e && (e = this._root), void 0 === n && (n = !0);
                var i = [];
                if (!this.haveItems(e)) return i;
                for (var r = 0; r < this._childs[e].length; r++) if (i.push(t.call(this, this._childs[e][r], r)), n) {
                    var o = this.map(t, this._childs[e][r].id, n);
                    i = i.concat(o)
                }
                return i
            }, e.prototype.filter = function(t, e) {
                var n = this;
                if (void 0 === e && (e = {}), t) {
                    this._initChilds || (this._initChilds = this._childs), e.type = e.type || u.TreeFilterType.leafs, this._filters = {}, this._filters._ = {
                        rule: t,
                        config: e
                    };
                    var i = {};
                    this._recursiveFilter(t, e, this._root, 0, i);
                    var r = [],
                        o = function(t) {
                            var e = i[t].map(function(t) {
                                return !n.haveItems(t.id) && n.getParent(t.id) !== n.getRoot()
                            }).find(function(t) {
                                return t || null
                            });
                            if (i[t].length > 0 && i[t] !== i[a.getRoot()] && e) {
                                var o = i[a.getRoot()].find(function(e) {
                                    if (e.id === t) return e
                                });
                                o && r.push(o)
                            }
                        },
                        a = this;
                    for (var s in i) o(s);
                    i[this.getRoot()] = r, this._childs = i, this.events.fire(u.DataEvents.change)
                } else this.restoreOrder()
            }, e.prototype.restoreOrder = function() {
                this._initChilds && (this._childs = this._initChilds, this._initChilds = null), this.events.fire(u.DataEvents.change)
            }, e.prototype.copy = function(t, e, n, i) {
                var o = this;
                if (void 0 === n && (n = this), void 0 === i && (i = this._root), t instanceof Array) return t.map(function(t, a) {
                    if (!o.exists(t)) return null;
                    var u = o._childs[t],
                        c = -1 === e ? -1 : e + a;
                    if (n === o && !o.canCopy(t, i)) return null;
                    var l = s.copyWithoutInner(o.getItem(t), {
                        items: !0
                    });
                    if (n.exists(t) && (l.id = r.uid()), s.isTreeCollection(n)) {
                        if (o.exists(t) && (l.parent = i, n !== o && i === o._root && (l.parent = n.getRoot()), n.add(l, c), t = l.id), u) for (var d = 0, f = u; d < f.length; d++) {
                            var h = f[d].id,
                                p = o.getIndex(h);
                            "string" == typeof t && o.copy(h, p, n, t)
                        }
                        return t
                    }
                    n.add(l, c)
                });
                if (!this.exists(t)) return null;
                var a = this._childs[t];
                if (n === this && !this.canCopy(t, i)) return null;
                var u = s.copyWithoutInner(this.getItem(t), {
                    items: !0
                });
                if (n.exists(t) && (u.id = r.uid()), s.isTreeCollection(n)) {
                    if (this.exists(t) && (u.parent = i, n !== this && i === this._root && (u.parent = n.getRoot()), n.add(u, e), t = u.id), a) for (var c = 0, l = a; c < l.length; c++) {
                        var d = l[c].id,
                            f = this.getIndex(d);
                        "string" == typeof t && this.copy(d, f, n, t)
                    }
                    return t
                }
                n.add(u, e)
            }, e.prototype.move = function(t, e, n, i) {
                var r = this;
                if (void 0 === n && (n = this), void 0 === i && (i = this._root), t instanceof Array) return t.map(function(t, o) {
                    if (!r.exists(t)) return null;
                    var a = -1 === e ? -1 : e + o;
                    if (n !== r) {
                        if (!s.isTreeCollection(n)) return n.add(s.copyWithoutInner(r.getItem(t)), a), void r.remove(t);
                        var c = r.copy(t, a, n, i);
                        return r.remove(t), c
                    }
                    if (!r.canCopy(t, i)) return null;
                    var l = r.getParent(t),
                        d = r.getIndex(t),
                        f = r._childs[l].splice(d, 1)[0];
                    return f.parent = i, r._childs[l].length || delete r._childs[l], r.haveItems(i) || (r._childs[i] = []), -1 === a ? a = r._childs[i].push(f) : r._childs[i].splice(a, 0, f), r.events.fire(u.DataEvents.change), t
                });
                if (!this.exists(t)) return null;
                if (n !== this) {
                    if (!s.isTreeCollection(n)) return n.add(s.copyWithoutInner(this.getItem(t)), e), void this.remove(t);
                    var o = this.copy(t, e, n, i);
                    return this.remove(t), o
                }
                if (!this.canCopy(t, i)) return null;
                var a = this.getParent(t),
                    c = this.getIndex(t),
                    l = this._childs[a].splice(c, 1)[0];
                return l.parent = i, this._childs[a].length || delete this._childs[a], this.haveItems(i) || (this._childs[i] = []), -1 === e ? e = this._childs[i].push(l) : this._childs[i].splice(e, 0, l), this.events.fire(u.DataEvents.change), t
            }, e.prototype.eachChild = function(t, e, n, i) {
                if (void 0 === n && (n = !0), void 0 === i && (i = function() {
                    return !0
                }), this.haveItems(t)) for (var r = 0; r < this._childs[t].length; r++) e.call(this, this._childs[t][r], r), n && i(this._childs[t][r]) && this.eachChild(this._childs[t][r].id, e, n, i)
            }, e.prototype.getNearId = function(t) {
                return t
            }, e.prototype.loadItems = function(t, e) {
                var n = this;
                void 0 === e && (e = "json");
                var i = this.config.autoload + "?id=" + t;
                new a.DataProxy(i).load().then(function(i) {
                    i = (e = s.toDataDriver(e)).toJsonArray(i), n._parse_data(i, t), n.events.fire(u.DataEvents.change)
                })
            }, e.prototype.refreshItems = function(t, e) {
                void 0 === e && (e = "json"), this.removeAll(t), this.loadItems(t, e)
            }, e.prototype.eachParent = function(t, e, n) {
                void 0 === n && (n = !1);
                var i = this.getItem(t);
                if (i && (n && e.call(this, i), i.parent !== this._root)) {
                    var r = this.getItem(i.parent);
                    e.call(this, r), this.eachParent(i.parent, e)
                }
            }, e.prototype.haveItems = function(t) {
                return t in this._childs
            }, e.prototype.canCopy = function(t, e) {
                if (t === e) return !1;
                var n = !0;
                return this.eachParent(e, function(e) {
                    return e.id === t ? n = !1 : null
                }), n
            }, e.prototype.serialize = function(t, e) {
                void 0 === t && (t = u.DataDriver.json);
                var n = this._serialize(this._root, e),
                    i = s.toDataDriver(t);
                if (i) return i.serialize(n)
            }, e.prototype.getId = function(t, e) {
                if (void 0 === e && (e = this._root), this._childs[e] && this._childs[e][t]) return this._childs[e][t].id
            }, e.prototype._removeAll = function(e) {
                var n;
                if (e) for (var i = 0, r = this._childs[e].slice(); i < r.length; i++) {
                    var o = r[i];
                    this.remove(o.id)
                } else {
                    t.prototype._removeAll.call(this);
                    var a = this._root;
                    this._initChilds = null, this._childs = ((n = {})[a] = [], n)
                }
            }, e.prototype._removeCore = function(t) {
                if (this._pull[t]) {
                    var e = this.getParent(t);
                    this._childs[e] = this._childs[e].filter(function(e) {
                        return e.id !== t
                    }), e === this._root || this._childs[e].length || delete this._childs[e], this._initChilds && this._initChilds[e] && (this._initChilds[e] = this._initChilds[e].filter(function(e) {
                        return e.id !== t
                    }), e === this._root || this._initChilds[e].length || delete this._initChilds[e]), this._fastDeleteChilds(this._childs, t), this._initChilds && this._fastDeleteChilds(this._initChilds, t)
                }
            }, e.prototype._addToOrder = function(t, e, n) {
                var i = this._childs,
                    r = this._initChilds,
                    o = e.parent;
                this._pull[e.id] = e, c(i, e, o, n), r && c(r, e, o, n)
            }, e.prototype._parse_data = function(t, e) {
                void 0 === e && (e = this._root);
                for (var n = 0, i = t; n < i.length; n++) {
                    var o = i[n];
                    this.config.init && (o = this.config.init(o)), "object" != typeof o && (o = {
                        value: o
                    }), o.id = o.id ? o.id.toString() : r.uid(), o.parent = o.parent ? o.parent.toString() : e, this._pull[o.id] = o, this._childs[o.parent] || (this._childs[o.parent] = []), this._childs[o.parent].push(o), o.items && o.items instanceof Object && this._parse_data(o.items, o.id)
                }
            }, e.prototype._fastDeleteChilds = function(t, e) {
                if (this._pull[e] && delete this._pull[e], t[e]) {
                    for (var n = 0; n < t[e].length; n++) this._fastDeleteChilds(t, t[e][n].id);
                    delete t[e]
                }
            }, e.prototype._recursiveFilter = function(t, e, n, i, r) {
                var o = this,
                    a = this._childs[n];
                if (a) {
                    var s = function(t) {
                        switch (e.type) {
                            case u.TreeFilterType.all:
                                return !0;
                            case u.TreeFilterType.level:
                                return i === e.level;
                            case u.TreeFilterType.leafs:
                                return !o.haveItems(t.id)
                        }
                    };
                    if ("function" == typeof t) {
                        var c = function(e) {
                                return !s(e) || t(e)
                            },
                            l = a.filter(c);
                        l.length && (r[n] = l)
                    } else if (t.by && t.match) {
                        c = function(e) {
                            return !s(e) || -1 !== e[t.by].toString().toLowerCase().indexOf(t.match.toString().toLowerCase())
                        };
                        r[n] = a.filter(c)
                    }
                    for (var d = 0, f = a; d < f.length; d++) {
                        var h = f[d];
                        this._recursiveFilter(t, e, h.id, i + 1, r)
                    }
                }
            }, e.prototype._serialize = function(t, e) {
                var n = this;
                return void 0 === t && (t = this._root), this.map(function(t) {
                    var i = {};
                    for (var r in t)"parent" !== r && "items" !== r && (i[r] = t[r]);
                    return e && (i = e(i)), n.haveItems(t.id) && (i.items = n._serialize(t.id, e)), i
                }, t, !1)
            }, e
        }(o.DataCollection);
        e.TreeCollection = l
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(1),
            r = n(33),
            o = n(2),
            a = n(3);
        var s = function() {
                function t() {
                    var t = this;
                    this._transferData = {}, this._canMove = !0, this._selectedIds = [], this._onMouseMove = function(e) {
                        if (t._transferData.id) {
                            var n = e.pageX,
                                i = e.pageY;
                            if (!t._transferData.ghost) {
                                if (Math.abs(t._transferData.x - n) < 3 && Math.abs(t._transferData.y - i) < 3) return;
                                var r = t._onDragStart(t._transferData.id, t._transferData.targetId);
                                if (!r) return void t._endDrop();
                                t._transferData.ghost = r, document.body.appendChild(t._transferData.ghost)
                            }
                            t._moveGhost(n, i), t._onDrag(e)
                        }
                    }, this._onMouseUp = function() {
                        t._transferData.x && (t._transferData.ghost ? (t._removeGhost(), t._onDrop()) : t._endDrop(), document.removeEventListener("mousemove", t._onMouseMove), document.removeEventListener("mouseup", t._onMouseUp))
                    }
                }
                return t.prototype.setItem = function(t, e) {
                    r.collectionStore.setItem(t, e)
                }, t.prototype.onMouseDown = function(t, e, n) {
                    if (1 === t.which) {
                        t.preventDefault(), document.addEventListener("mousemove", this._onMouseMove), document.addEventListener("mouseup", this._onMouseUp);
                        var r = i.locateNode(t, "dhx_id"),
                            o = r && r.getAttribute("dhx_id"),
                            a = i.locate(t, "dhx_widget_id");
                        if (e && -1 !== e.indexOf(o) && e.length > 1 ? (this._selectedIds = e, this._itemsForGhost = n) : (this._selectedIds = [], this._itemsForGhost = null), o && a) {
                            var s = i.getBox(r),
                                u = s.left,
                                c = s.top;
                            this._transferData.initXOffset = t.pageX - u, this._transferData.initYOffset = t.pageY - c, this._transferData.x = t.pageX, this._transferData.y = t.pageY, this._transferData.targetId = a, this._transferData.id = o, this._transferData.item = r
                        }
                    }
                }, t.prototype._moveGhost = function(t, e) {
                    this._transferData.ghost && (this._transferData.ghost.style.left = t - this._transferData.initXOffset + "px", this._transferData.ghost.style.top = e - this._transferData.initYOffset + "px")
                }, t.prototype._removeGhost = function() {
                    document.body.removeChild(this._transferData.ghost)
                }, t.prototype._onDrop = function() {
                    if (this._canMove) {
                        var t = r.collectionStore.getItem(this._lastCollectionId),
                            e = t && t.config;
                        if (t && e.dragMode !== o.DragMode.source) {
                            if (t.events.fire(o.DragEvents.beforeDrop, [this._lastId, this._transferData.target])) {
                                var n = {
                                        id: this._lastId,
                                        target: t
                                    },
                                    i = {
                                        id: this._transferData.id,
                                        target: this._transferData.target
                                    };
                                this._move(i, n), n.target.events.fire(o.DragEvents.dropComplete, [n.id, this._transferData.dropPosition])
                            }
                            this._endDrop()
                        } else this._endDrop()
                    } else this._endDrop()
                }, t.prototype._onDragStart = function(t, e) {
                    var n = r.collectionStore.getItem(e),
                        i = n.config;
                    if (i.dragMode === o.DragMode.target) return null;
                    var a = n.data.getItem(t),
                        s = function(t, e) {
                            var n = t.getBoundingClientRect(),
                                i = document.createElement("div"),
                                r = t.cloneNode(!0);
                            return r.style.width = n.width + "px", r.style.height = n.height + "px", r.style.maxHeight = n.height + "px", r.style.fontSize = window.getComputedStyle(t.parentElement).fontSize, r.style.opacity = "0.8", r.style.fontSize = window.getComputedStyle(t.parentElement).fontSize, i.appendChild(r), e && e.length && e.forEach(function(t, e) {
                                var r = t.cloneNode(!0);
                                r.style.width = n.width + "px", r.style.height = n.height + "px", r.style.maxHeight = n.height + "px", r.style.top = 12 * (e + 1) - n.height - n.height * e + "px", r.style.left = 12 * (e + 1) + "px", r.style.opacity = "0.6", r.style.zIndex = "" + (-e - 1), i.appendChild(r)
                            }), i.className = "dhx_drag-ghost", i
                        }(this._transferData.item, this._itemsForGhost);
                    return n.events.fire(o.DragEvents.beforeDrag, [a, s]) && t ? (n.events.fire(o.DragEvents.dragStart, [t, this._selectedIds]), this._toggleTextSelection(!0), this._transferData.target = n, this._transferData.dragConfig = i, s) : null
                }, t.prototype._onDrag = function(t) {
                    var e = t.clientX,
                        n = t.clientY,
                        s = document.elementFromPoint(e, n),
                        u = i.locate(s, "dhx_widget_id");
                    if (u) {
                        var c = r.collectionStore.getItem(u),
                            l = i.locate(s, "dhx_id");
                        if (!l) return this._cancelCanDrop(), this._lastCollectionId = u, this._lastId = null, void this._canDrop();
                        if (c.config.dropBehaviour === o.DropBehaviour.complex) {
                            var d = function(t) {
                                var e = t.clientY,
                                    n = i.locateNode(t);
                                if (!n) return null;
                                var r = n.childNodes[0].getBoundingClientRect();
                                return (e - r.top) / r.height
                            }(t);
                            this._transferData.dropPosition = d <= .25 ? o.DropPosition.top : d >= .75 ? o.DropPosition.bot : o.DropPosition. in
                        } else if (this._lastId === l && this._lastCollectionId === u) return;
                        var f = {
                            id: this._transferData.id,
                            target: this._transferData.target
                        };
                        if ("source" !== c.config.dragMode) if (f.target.events.fire(o.DragEvents.dragOut, [l, c]), u !== this._transferData.targetId || !a.isTreeCollection(f.target.data) || a.isTreeCollection(f.target.data) && f.target.data.canCopy(f.id, l)) this._cancelCanDrop(), this._lastId = l, this._lastCollectionId = u, f.target.events.fire(o.DragEvents.dragIn, [l, this._transferData.dropPosition, r.collectionStore.getItem(u)]) && this._canDrop();
                        else this._cancelCanDrop()
                    } else this._canMove && this._cancelCanDrop()
                }, t.prototype._move = function(t, e) {
                    var n = t.target.data,
                        i = e.target.data,
                        r = 0,
                        s = e.id;
                    switch (a.isTreeCollection(i) ? e.target.config.dropBehaviour : void 0) {
                        case o.DropBehaviour.child:
                            break;
                        case o.DropBehaviour.sibling:
                            s = i.getParent(s), r = i.getIndex(e.id) + 1;
                            break;
                        case o.DropBehaviour.complex:
                            var u = this._transferData.dropPosition;
                            u === o.DropPosition.top ? (s = i.getParent(s), r = i.getIndex(e.id)) : u === o.DropPosition.bot && (s = i.getParent(s), r = i.getIndex(e.id) + 1);
                            break;
                        default:
                            r = e.id ? t.target === e.target && i.getIndex(t.id) < i.getIndex(e.id) ? i.getIndex(e.id) - 1 : i.getIndex(e.id) : -1
                    }
                    this._transferData.dragConfig.dragCopy ? this._selectedIds instanceof Array && this._selectedIds.length > 1 ? this._selectedIds.map(function(t) {
                        n.copy(t, r, i, s), r > -1 && r++
                    }) : n.copy(t.id, r, i, s) : this._selectedIds instanceof Array && this._selectedIds.length > 1 ? this._selectedIds.map(function(t) {
                        n.move(t, r, i, s), r > -1 && r++
                    }) : n.move(t.id, r, i, s)
                }, t.prototype._endDrop = function() {
                    this._toggleTextSelection(!1), this._transferData.target && this._transferData.target.events.fire(o.DragEvents.dragEnd, [this._transferData.id, this._selectedIds]), this._cancelCanDrop(), this._canMove = !0, this._transferData = {}, this._lastId = null, this._lastCollectionId = null
                }, t.prototype._cancelCanDrop = function() {
                    this._canMove = !1;
                    var t = r.collectionStore.getItem(this._lastCollectionId);
                    t && this._lastId && t.events.fire(o.DragEvents.cancelDrop, [this._lastId]), this._lastCollectionId = null, this._lastId = null
                }, t.prototype._canDrop = function() {
                    this._canMove = !0;
                    var t = r.collectionStore.getItem(this._lastCollectionId);
                    t && this._lastId && t.events.fire(o.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition])
                }, t.prototype._toggleTextSelection = function(t) {
                    t ? document.body.classList.add("dhx_no-select") : document.body.classList.remove("dhx_no-select")
                }, t
            }(),
            u = window.dhxHelpers = window.dhxHelpers || {};
        u.dragManager = u.dragManager || new s, e.dragManager = u.dragManager
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = function() {
                function t() {
                    this._store = {}
                }
                return t.prototype.setItem = function(t, e) {
                    this._store[t] = e
                }, t.prototype.getItem = function(t) {
                    return this._store[t] ? this._store[t] : null
                }, t
            }(),
            r = window.dhxHelpers = window.dhxHelpers || {};
        r.collectionStore = r.collectionStore || new i, e.collectionStore = r.collectionStore
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(5),
            r = n(19),
            o = n(2),
            a = function() {
                function t(t, e, n) {
                    var r = this;
                    this.events = n || new i.EventSystem(this), this._data = e, this._data.events.on(o.DataEvents.removeAll, function() {
                        r._selected = null
                    }), this._data.events.on(o.DataEvents.change, function() {
                        if (r._selected) {
                            var t = r._data.getNearId(r._selected);
                            t !== r._selected && (r._selected = null, t && r.add(t))
                        }
                    })
                }
                return t.prototype.getId = function() {
                    return this._selected
                }, t.prototype.getItem = function() {
                    return this._selected ? this._data.getItem(this._selected) : null
                }, t.prototype.remove = function(t) {
                    return !(t = t || this._selected) || !! this.events.fire(r.SelectionEvents.beforeUnSelect, [t]) && (this._data.update(t, {
                        $selected: !1
                    }), this._selected = null, this.events.fire(r.SelectionEvents.afterUnSelect, [t]), !0)
                }, t.prototype.add = function(t) {
                    this._selected !== t && (this.remove(), this.events.fire(r.SelectionEvents.beforeSelect, [t]) && (this._selected = t, this._data.update(t, {
                        $selected: !0
                    }), this.events.fire(r.SelectionEvents.afterSelect, [t])))
                }, t
            }();
        e.Selection = a
    }, function(t, e, n) {
        "use strict";

        function i(t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), i(n(36)), i(n(49));
        var r = n(12);
        e.ItemType = r.ItemType, e.NavigationBarEvents = r.NavigationBarEvents
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__extends ||
            function() {
                var t = function(e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array &&
                        function(t, e) {
                            t.__proto__ = e
                        } ||
                        function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function(e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(1),
            o = n(12),
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e._isContextMenu = !0, e
                }
                return i(e, t), e.prototype.showAt = function(t, e) {
                    if (void 0 === e && (e = "bottom"), t instanceof MouseEvent) this._changeActivePosition({
                        left: window.pageXOffset + t.x + 1,
                        right: window.pageXOffset + t.x + 1,
                        top: window.pageYOffset + t.y,
                        bottom: window.pageYOffset + t.y
                    }, e);
                    else {
                        var n = r.toNode(t);
                        this._changeActivePosition(r.getRealPosition(n), e)
                    }
                }, e.prototype._getFactory = function() {
                    return o.createFactory({
                        widget: this,
                        defaultType: o.ItemType.menuItem,
                        allowedTypes: [o.ItemType.menuItem, o.ItemType.spacer, o.ItemType.separator, o.ItemType.customHTML, o.ItemType.customHTMLButton],
                        widgetName: "context-menu"
                    })
                }, e.prototype._close = function(e) {
                    t.prototype._close.call(this, e), this._activeMenu = null, this._changeActivePosition(null, null)
                }, e.prototype._getMode = function(t, e, n) {
                    return n ? this._mode : "right"
                }, e.prototype._changeActivePosition = function(t, e) {
                    this._activePosition = t, this._mode = e, this._listenOuterClick(), this.paint()
                }, e
            }(o.Navbar);
        e.ContextMenu = a
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__extends ||
            function() {
                var t = function(e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array &&
                        function(t, e) {
                            t.__proto__ = e
                        } ||
                        function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function(e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }(), r = this && this.__assign ||
            function() {
                return (r = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(4),
            a = n(0),
            s = n(5),
            u = n(1),
            c = n(13),
            l = n(20),
            d = n(8),
            f = n(6),
            h = function(t) {
                function e(e, n) {
                    var i = t.call(this, e, o.extend({}, n)) || this;
                    return i._isContextMenu = !1, i._documentHaveListener = !1, i._rootItem = {}, Array.isArray(i.config.data) ? (i.events = new s.EventSystem(i), i.data = new d.TreeCollection({}, i.events)) : i.config.data && i.config.data.events ? (i.data = i.config.data, i.events = i.data.events, i.events.context = i) : (i.events = new s.EventSystem(i), i.data = new d.TreeCollection({}, i.events)), i._documentClick = function(t) {
                        u.locate(t, "dhx_widget_id") !== i._uid && i._documentHaveListener && (document.removeEventListener("click", i._documentClick), i._documentHaveListener = !1, i._close(t))
                    }, i._currentRoot = i.data.getRoot(), i._factory = i._getFactory(), i._initHandlers(), i._init(), i._initEvents(), Array.isArray(i.config.data) && i.data.parse(i.config.data), i
                }
                return i(e, t), e.prototype.paint = function() {
                    t.prototype.paint.call(this), this._vpopups.redraw()
                }, e.prototype.disable = function(t) {
                    this._setProp(t, "disabled", !0)
                }, e.prototype.enable = function(t) {
                    this._setProp(t, "disabled", !1)
                }, e.prototype.show = function(t) {
                    this._setProp(t, "hidden", !1)
                }, e.prototype.hide = function(t) {
                    this._setProp(t, "hidden", !0)
                }, e.prototype.destructor = function() {
                    this.unmount(), c.keyManager.removeHotKey(null, this), this._vpopups.unmount()
                }, e.prototype._customHandlers = function() {
                    return {}
                }, e.prototype._close = function(t) {
                    var e = this;
                    this._popupActive && this.events.fire(f.NavigationBarEvents.beforeHide, [this._activeMenu, t]) && (this._activeParents && this._activeParents.forEach(function(t) {
                        return e.data.exists(t) && e.data.update(t, {
                            $activeParent: !1
                        })
                    }), this.config.navigationType === f.NavigationType.click && (this._isActive = !1), clearTimeout(this._currentTimeout), this._popupActive = !1, this._activeMenu = null, this.events.fire(f.NavigationBarEvents.afterHide, [t]), this.paint())
                }, e.prototype._init = function() {
                    var t = this;
                    this._vpopups = a.create({
                        render: function() {
                            return a.el("div", {
                                dhx_widget_id: t._uid,
                                class: "dhx_" + (t._isContextMenu ? " dhx_context-menu" : ""),
                                onmousemove: t._handlers.onmousemove,
                                onmouseleave: t._handlers.onmouseleave,
                                onclick: t._handlers.onclick,
                                onmousedown: t._handlers.onmousedown
                            }, t._drawPopups())
                        }
                    }), this._vpopups.mount(document.body)
                }, e.prototype._initHandlers = function() {
                    var t = this;
                    this._isActive = this.config.navigationType !== f.NavigationType.click, this._handlers = r({
                        onmousemove: function(e) {
                            if (t._isActive) {
                                var n = u.locateNode(e);
                                if (n) {
                                    var i = n.getAttribute("dhx_id");
                                    if (t._activeMenu !== i) {
                                        if (t.data.haveItems(i)) {
                                            var r = u.getRealPosition(n);
                                            t.data.update(i, {
                                                $position: r
                                            }, !1)
                                        }
                                        t._activeItemChange(i, e)
                                    }
                                }
                            }
                        },
                        onmouseleave: function(e) {
                            if (t.config.navigationType !== f.NavigationType.click) {
                                if (t._popupActive) {
                                    var n = u.locateNode(e, "dhx_id", "relatedTarget");
                                    if (n) {
                                        var i = n.getAttribute("dhx_id");
                                        t.data.getItem(i) || t._close(e)
                                    } else t._close(e)
                                }
                                t._activeItemChange(null, e)
                            }
                        },
                        onclick: function(e) {
                            var n = u.locateNode(e);
                            if (n) {
                                var i = n.getAttribute("dhx_id"),
                                    r = t.data.getItem(i);
                                if (!r.multiClick) if (t.data.haveItems(i)) {
                                    if (i === t._currentRoot) return;
                                    t._isActive || (t._isActive = !0), t._setRoot(i);
                                    var o = u.getRealPosition(n);
                                    t.data.update(i, {
                                        $position: o
                                    }, !1), t._activeItemChange(i, e)
                                } else switch (r.type) {
                                    case f.ItemType.input:
                                    case f.ItemType.title:
                                        break;
                                    case f.ItemType.menuItem:
                                    case f.ItemType.selectButton:
                                        t._onMenuItemClick(i, e);
                                        break;
                                    case f.ItemType.imageButton:
                                    case f.ItemType.button:
                                    case f.ItemType.customHTMLButton:
                                    case f.ItemType.navItem:
                                        r.twoState && t.data.update(r.id, {
                                            active: !r.active
                                        }), t.events.fire(f.NavigationBarEvents.click, [i, e]);
                                    default:
                                        t._close(e)
                                }
                            }
                        },
                        onmousedown: function(e) {
                            var n = u.locateNode(e);
                            if (n) {
                                var i = n.getAttribute("dhx_id");
                                if (t.data.getItem(i).multiClick) {
                                    var r, o = 365,
                                        a = function() {
                                            t.events.fire(f.NavigationBarEvents.click, [i, e]), o > 50 && (o -= 55), r = setTimeout(a, o)
                                        },
                                        s = function() {
                                            clearTimeout(r), document.removeEventListener("mouseup", s)
                                        };
                                    a(), document.addEventListener("mouseup", s)
                                }
                            }
                        }
                    }, this._customHandlers())
                }, e.prototype._initEvents = function() {
                    var t = this,
                        e = null;
                    this.data.events.on(f.DataEvents.change, function() {
                        t.paint(), e && clearTimeout(e), e = setTimeout(function() {
                            var n = {};
                            t.data.eachChild(t.data.getRoot(), function(t) {
                                t.group && (t.twoState = !0, function(t, e) {
                                    t[e.group] ? (e.active && (t[e.group].active = e.id), t[e.group].elements.push(e.id)) : t[e.group] = {
                                        active: e.active ? e.id : null,
                                        elements: [e.id]
                                    }
                                }(n, t))
                            }, !0), t._groups = n, t._resetHotkeys(), e = null, t.paint()
                        }, 100)
                    }), this.events.on(f.NavigationBarEvents.click, function(e) {
                        var n = t.data.getItem(e),
                            i = t.data.getItem(n.parent);
                        if (i && i.type === f.ItemType.selectButton && t.data.update(n.parent, {
                            value: n.value,
                            icon: n.icon
                        }), n.group) {
                            var r = t._groups[n.group];
                            r.active && t.data.update(r.active, {
                                active: !1
                            }), r.active = n.id, t.data.update(n.id, {
                                active: !0
                            })
                        }
                    }), this._customInitEvents()
                }, e.prototype._getMode = function(t, e, n) {
                    return void 0 === n && (n = !1), t.parent === e ? "bottom" : "right"
                }, e.prototype._drawMenuItems = function(t, e) {
                    var n = this;
                    return void 0 === e && (e = !0), this.data.map(function(t) {
                        return n._factory(t, e)
                    }, t, !1)
                }, e.prototype._setRoot = function(t) {}, e.prototype._getParents = function(t, e) {
                    var n = [],
                        i = !1,
                        r = this.data.getItem(t),
                        o = r && r.disabled;
                    return this.data.eachParent(t, function(t) {
                        t.id === e ? (n.push(t.id), i = !0) : i || n.push(t.id)
                    }, !o), this._isContextMenu && this._activePosition && n.push(e), n
                }, e.prototype._listenOuterClick = function() {
                    this._documentHaveListener || (document.addEventListener("click", this._documentClick, !0), this._documentHaveListener = !0)
                }, e.prototype._customInitEvents = function() {}, e.prototype._drawPopups = function() {
                    var t = this,
                        e = this._activeMenu;
                    if (!this._isContextMenu && !e) return null;
                    var n = this._currentRoot;
                    if (this._isContextMenu && !this._activePosition) return null;
                    var i = this._getParents(e, n);
                    return this._activeParents = i, i.forEach(function(e) {
                        return t.data.exists(e) && t.data.update(e, {
                            $activeParent: !0
                        }, !1)
                    }), i.map(function(e) {
                        if (!t.data.haveItems(e)) return null;
                        var i = t.data.getItem(e) || t._rootItem;
                        return t._popupActive = !0, a.el("ul", {
                            class: "dhx_widget dhx_menu" + (t.config.menuCss ? " " + t.config.menuCss : ""),
                            _key: e,
                            _hooks: {
                                didInsert: function(r) {
                                    var o = r.el.getBoundingClientRect(),
                                        a = o.width,
                                        s = o.height,
                                        c = t._isContextMenu && t._activePosition && e === n ? t._activePosition : i.$position,
                                        l = t._getMode(i, n, c === t._activePosition),
                                        d = u.calculatePosition(c, {
                                            mode: l,
                                            width: a,
                                            height: s
                                        });
                                    i.$style = d, r.patch({
                                        style: d
                                    })
                                },
                                didRecycle: function(r, o) {
                                    if (t._isContextMenu && t._activePosition && e === n) {
                                        var a = o.el.getBoundingClientRect(),
                                            s = a.width,
                                            c = a.height,
                                            l = u.calculatePosition(t._activePosition, {
                                                mode: t._getMode(i, n, !0),
                                                width: s,
                                                height: c
                                            });
                                        i.$style = l, o.patch({
                                            style: l
                                        })
                                    }
                                }
                            },
                            tabindex: 0,
                            style: i.$style || {
                                position: "absolute"
                            }
                        }, t._drawMenuItems(e))
                    }).reverse()
                }, e.prototype._onMenuItemClick = function(t, e) {
                    var n = this.data.getItem(t);
                    n.disabled || (n.twoState && this.data.update(n.id, {
                        active: !n.active
                    }), this.events.fire(f.NavigationBarEvents.click, [t, e]), this._close(e))
                }, e.prototype._activeItemChange = function(t, e) {
                    var n = this;
                    if (this._activeParents) {
                        var i = this._getParents(t, this._currentRoot);
                        this._activeParents.forEach(function(t) {
                            n.data.exists(t) && -1 === i.indexOf(t) && n.data.update(t, {
                                $activeParent: !1
                            }, !1)
                        })
                    }
                    t && !this._documentHaveListener && this._listenOuterClick(), t && this.data.haveItems(t) ? (this._activeMenu === t && this._popupActive || this.events.fire(f.NavigationBarEvents.openMenu, [t]), this._activeMenu = t, clearTimeout(this._currentTimeout), this.paint()) : (clearTimeout(this._currentTimeout), this._currentTimeout = setTimeout(function() {
                        return n.paint()
                    }, 400))
                }, e.prototype._resetHotkeys = function() {
                    var t = this;
                    c.keyManager.removeHotKey(null, this), this.data.map(function(e) {
                        e.hotkey && c.keyManager.addHotKey(e.hotkey, function() {
                            return t._onMenuItemClick(e.id, null)
                        }, t)
                    })
                }, e.prototype._setProp = function(t, e, n) {
                    var i, r = this;
                    Array.isArray(t) ? t.forEach(function(t) {
                        var i;
                        return r.data.update(t, ((i = {})[e] = n, i))
                    }) : this.data.update(t, ((i = {})[e] = n, i))
                }, e
            }(l.View);
        e.Navbar = h
    }, function(t, e, n) {
        /**
         * Copyright (c) 2017, Leon Sorokin
         * All rights reserved. (MIT Licensed)
         *
         * domvm.js (DOM ViewModel)
         * A thin, fast, dependency-free vdom view layer
         * @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
         */
        t.exports = function() {
            "use strict";
            var t = 1,
                e = 2,
                n = 3,
                i = 4,
                r = 5,
                o = "undefined" != typeof window,
                a = (o ? window : {}).requestAnimationFrame,
                s = {};

            function u() {}
            var c = Array.isArray;

            function l(t) {
                return null != t
            }
            function d(t) {
                return null != t && t.constructor === Object
            }
            function f(t, e, n, i) {
                t.splice.apply(t, [n, i].concat(e))
            }
            function h(t) {
                var e = typeof t;
                return "string" === e || "number" === e
            }
            function p(t) {
                return "function" == typeof t
            }
            function v(t) {
                for (var e = arguments, n = 1; n < e.length; n++) for (var i in e[n]) t[i] = e[n][i];
                return t
            }
            function _(t, e) {
                for (var n = [], i = e; i < t.length; i++) n.push(t[i]);
                return n
            }
            function m(t, e) {
                for (var n in t) if (t[n] !== e[n]) return !1;
                return !0
            }
            function g(t, e) {
                var n = t.length;
                if (e.length !== n) return !1;
                for (var i = 0; i < n; i++) if (t[i] !== e[i]) return !1;
                return !0
            }
            function y(t) {
                if (!a) return t;
                var e, n, i;

                function r() {
                    e = 0, t.apply(n, i)
                }
                return function() {
                    n = this, i = arguments, e || (e = a(r))
                }
            }
            function b(t) {
                return "o" === t[0] && "n" === t[1]
            }
            function x(t) {
                return "_" === t[0]
            }
            function w(t) {
                return "style" === t
            }
            function I(t) {
                t && t.el && t.el.offsetHeight
            }
            function k(t) {
                return null != t.node && null != t.node.el
            }
            function T(t, e) {
                switch (e) {
                    case "value":
                    case "checked":
                    case "selected":
                        return !0
                }
                return !1
            }
            function D(t) {
                for (t = t || s; null == t.vm && t.parent;) t = t.parent;
                return t.vm
            }
            function C() {}
            var E = C.prototype = {
                constructor: C,
                type: null,
                vm: null,
                key: null,
                ref: null,
                data: null,
                hooks: null,
                ns: null,
                el: null,
                tag: null,
                attrs: null,
                body: null,
                flags: 0,
                _class: null,
                _diff: null,
                _dead: !1,
                _lis: !1,
                idx: null,
                parent: null
            };

            function O(t) {
                var n = new C;
                return n.type = e, n.body = t, n
            }
            var M = {},
                S = /\[(\w+)(?:=(\w+))?\]/g,
                P = 1,
                j = 2,
                A = 4,
                N = 8;

            function L(e, n, i, r) {
                var o = new C;
                o.type = t, l(r) && (o.flags = r), o.attrs = n;
                var a = function(t) {
                    var e, n, i, r, o = M[t];
                    if (null == o) for (M[t] = o = {
                        tag: (e = t.match(/^[-\w]+/)) ? e[0] : "div",
                        id: (n = t.match(/#([-\w]+)/)) ? n[1] : null,
                        class: (i = t.match(/\.([-\w.]+)/)) ? i[1].replace(/\./g, " ") : null,
                        attrs: null
                    }; r = S.exec(t);) null == o.attrs && (o.attrs = {}), o.attrs[r[1]] = r[2] || "";
                    return o
                }(e);
                if (o.tag = a.tag, a.id || a.class || a.attrs) {
                    var s = o.attrs || {};
                    if (a.id && !l(s.id) && (s.id = a.id), a.class && (o._class = a.class, s.class = a.class + (l(s.class) ? " " + s.class : "")), a.attrs) for (var u in a.attrs) l(s[u]) || (s[u] = a.attrs[u]);
                    o.attrs = s
                }
                var c = o.attrs;
                return l(c) && (l(c._key) && (o.key = c._key), l(c._ref) && (o.ref = c._ref), l(c._hooks) && (o.hooks = c._hooks), l(c._data) && (o.data = c._data), l(c._flags) && (o.flags = c._flags), l(o.key) || (l(o.ref) ? o.key = o.ref : l(c.id) ? o.key = c.id : l(c.name) && (o.key = c.name + ("radio" === c.type || "checkbox" === c.type ? c.value : "")))), null != i && (o.body = i), o
            }
            function H(t, n, o, a) {
                if (t.type !== r && t.type !== i) {
                    t.parent = n, t.idx = o, t.vm = a, null != t.ref &&
                    function(t, e, n) {
                        var i = ["refs"].concat(e.split("."));
                        !
                            function(t, e, n) {
                                for (var i; i = e.shift();) 0 === e.length ? t[i] = n : t[i] = t = t[i] || {}
                            }(t, i, n)
                    }(D(t), t.ref, t);
                    var s = t.hooks,
                        u = a && a.hooks;
                    (s && (s.willRemove || s.didRemove) || u && (u.willUnmount || u.didUnmount)) &&
                    function(t) {
                        for (; t = t.parent;) t.flags |= P
                    }(t), c(t.body) &&
                    function(t) {
                        for (var n = t.body, i = 0; i < n.length; i++) {
                            var r = n[i];
                            !1 === r || null == r ? n.splice(i--, 1) : c(r) ? f(n, r, i--, 1) : (null == r.type && (n[i] = r = O("" + r)), r.type === e ? null == r.body || "" === r.body ? n.splice(i--, 1) : i > 0 && n[i - 1].type === e ? (n[i - 1].body += r.body, n.splice(i--, 1)) : H(r, t, i, null) : H(r, t, i, null))
                        }
                    }(t)
                }
            }
            var B = {
                animationIterationCount: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridRow: !0,
                gridColumn: !0,
                order: !0,
                lineClamp: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0
            };

            function R(t, e) {
                return isNaN(e) || B[t] ? e : e + "px"
            }
            function $(t, e) {
                var n = (t.attrs || s).style,
                    i = e ? (e.attrs || s).style : null;
                if (null == n || h(n)) t.el.style.cssText = n;
                else {
                    for (var r in n) {
                        var o = n[r];
                        (null == i || null != o && o !== i[r]) && (t.el.style[r] = R(r, o))
                    }
                    if (i) for (var a in i) null == n[a] && (t.el.style[a] = "")
                }
            }
            var F = [];

            function z(t, e, n, i, r) {
                if (null != t) {
                    var o = n.hooks[e];
                    if (o) {
                        if ("d" !== e[0] || "i" !== e[1] || "d" !== e[2]) return o(n, i);
                        r ? I(n.parent) && o(n, i) : F.push([o, n, i])
                    }
                }
            }
            function W(t) {
                var e;
                if (F.length) for (I(t.node); e = F.shift();) e[0](e[1], e[2])
            }
            var V = o ? document : null;

            function K(t) {
                return t.nextSibling
            }
            function U(t, e, n) {
                var i = e._node,
                    r = i.vm;
                if (c(i.body)) if ((i.flags & P) === P) for (var o = 0; o < i.body.length; o++) U(e, i.body[o].el);
                else Y(i);
                delete e._node, t.removeChild(e), z(i.hooks, "didRemove", i, null, n), null != r && (z(r.hooks, "didUnmount", r, r.data, n), r.node = null)
            }
            function J(t, e) {
                var n = e._node;
                if (!n._dead) {
                    var i = function t(e) {
                        var n = e.vm,
                            i = null != n && z(n.hooks, "willUnmount", n, n.data),
                            r = z(e.hooks, "willRemove", e);
                        if ((e.flags & P) === P && c(e.body)) for (var o = 0; o < e.body.length; o++) t(e.body[o]);
                        return i || r
                    }(n);
                    null != i &&
                    function(t) {
                        return "object" == typeof t && p(t.then)
                    }(i) ? (n._dead = !0, i.then(function(t, e, n) {
                        return function() {
                            return t.apply(n, e)
                        }
                    }(U, [t, e, !0]))) : U(t, e)
                }
            }
            function Y(t) {
                for (var e = t.body, n = 0; n < e.length; n++) {
                    var i = e[n];
                    delete i.el._node, null != i.vm && (i.vm.node = null), c(i.body) && Y(i)
                }
            }
            function X(t) {
                var e = t.el;
                if (0 == (t.flags & P)) c(t.body) && Y(t), e.textContent = null;
                else {
                    var n = e.firstChild;
                    do {
                        var i = K(n);
                        J(e, n)
                    } while (n = i)
                }
            }
            function G(t, e, n) {
                var i = e._node,
                    r = null != e.parentNode,
                    o = e !== n && r ? null : i.vm;
                null != o && z(o.hooks, "willMount", o, o.data), z(i.hooks, r ? "willReinsert" : "willInsert", i), t.insertBefore(e, n), z(i.hooks, r ? "didReinsert" : "didInsert", i), null != o && z(o.hooks, "didMount", o, o.data)
            }
            function q(t, e, n) {
                G(t, e, n ? K(n) : null)
            }
            var Z = {},
                Q = u;

            function tt(t, e, n) {
                t[e] = n
            }
            function et(t, e, n, i, r) {
                var o = t.apply(r, e.concat([n, i, r, r.data]));
                r.onevent(n, i, r, r.data, e), Q.call(null, n, i, r, r.data, e), !1 === o && (n.preventDefault(), n.stopPropagation())
            }
            function nt(t) {
                var e, n, i = function(t) {
                        for (; null == t._node;) t = t.parentNode;
                        return t._node
                    }(t.target),
                    r = D(i),
                    o = t.currentTarget._node.attrs["on" + t.type];
                if (c(o)) e = o[0], n = o.slice(1), et(e, n, t, i, r);
                else for (var a in o) if (t.target.matches(a)) {
                    var s = o[a];
                    c(s) ? (e = s[0], n = s.slice(1)) : (e = s, n = []), et(e, n, t, i, r)
                }
            }
            function it(t, e, n, i) {
                if (n !== i) {
                    var r = t.el;
                    null == n || p(n) ? tt(r, e, n) : null == i && tt(r, e, nt)
                }
            }
            function rt(t, e, n) {
                "." === e[0] && (e = e.substr(1), n = !0), n ? t.el[e] = "" : t.el.removeAttribute(e)
            }
            function ot(t, e, n, i, r) {
                var o = t.el;
                null == n ? !r && rt(t, e, !1) : null != t.ns ? o.setAttribute(e, n) : "class" === e ? o.className = n : "id" === e || "boolean" == typeof n || i ? o[e] = n : "." === e[0] ? o[e.substr(1)] = n : o.setAttribute(e, n)
            }
            function at(t, e, n) {
                var i = t.attrs || s,
                    r = e.attrs || s;
                if (i === r);
                else {
                    for (var o in i) {
                        var a = i[o],
                            u = T(t.tag, o),
                            c = u ? t.el[o] : r[o];
                        a === c || (w(o) ? $(t, e) : x(o) || (b(o) ? it(t, o, a, c) : ot(t, o, a, u, n)))
                    }
                    for (var o in r)!(o in i) && !x(o) && rt(t, o, T(t.tag, o) || b(o))
                }
            }
            function st(t, e, n, r) {
                return t.type === i && (e = t.data, n = t.key, r = t.opts, t = t.view), new wt(t, e, n, r)
            }
            function ut(t) {
                for (var e = 0; e < t.body.length; e++) {
                    var o = t.body[e],
                        a = o.type;
                    if (a <= n) G(t.el, ct(o));
                    else if (a === i) {
                        var s = st(o.view, o.data, o.key, o.opts)._redraw(t, e, !1);
                        a = s.node.type, G(t.el, ct(s.node))
                    } else if (a === r) {
                        var s = o.vm;
                        s._redraw(t, e), a = s.node.type, G(t.el, s.node.el)
                    }
                }
            }
            function ct(i, r) {
                return null == i.el && (i.type === t ? (i.el = r ||
                    function(t, e) {
                        return null != e ? V.createElementNS(e, t) : V.createElement(t)
                    }(i.tag, i.ns), null != i.attrs && at(i, s, !0), (i.flags & N) === N && i.body.body(i), c(i.body) ? ut(i) : null != i.body && "" !== i.body && (i.el.textContent = i.body)) : i.type === e ? i.el = r ||
                    function(t) {
                        return V.createTextNode(t)
                    }(i.body) : i.type === n && (i.el = r ||
                    function(t) {
                        return V.createComment(t)
                    }(i.body))), i.el._node = i, i.el
            }
            window.lisMove = ht;
            var lt = 1,
                dt = 2;

            function ft(t, e, n, i, r, o, a, s) {
                return function(u, c, l, d, f, h) {
                    var p, v;
                    if (null != d[i]) {
                        if (null == (p = d[i]._node)) return void(d[i] = t(d[i]));
                        if (function(t) {
                            return t.parent
                        }(p) !== u) return v = t(d[i]), null != p.vm ? p.vm.unmount(!0) : J(c, d[i]), void(d[i] = v)
                    }
                    if (d[r] == f) return dt;
                    if (null == d[r].el) n(c, ct(d[r]), d[i]), d[r] = e(d[r], l);
                    else if (d[r].el === d[i]) d[r] = e(d[r], l), d[i] = t(d[i]);
                    else {
                        if (h || p !== d[a]) return h && null != d[i] ? ht(t, e, n, i, r, c, l, p, d) : lt;
                        v = d[i], d[i] = t(v), s(c, v, d[o]), d[o] = v
                    }
                }
            }
            function ht(t, e, n, i, r, o, a, s, u) {
                if (s._lis) n(o, u[r].el, u[i]), u[r] = e(u[r], a);
                else {
                    var c = function(t, e) {
                        var n, i = 0,
                            r = e.length - 1;
                        if (r <= 2147483647) for (; i <= r;) {
                            if (e[n = i + r >> 1] === t) return n;
                            e[n] < t ? i = n + 1 : r = n - 1
                        } else for (; i <= r;) {
                            if (n = Math.floor((i + r) / 2), e[n] === t) return n;
                            e[n] < t ? i = n + 1 : r = n - 1
                        }
                        return i == e.length ? null : i
                    }(s.idx, u.tombs);
                    s._lis = !0;
                    var l = t(u[i]);
                    n(o, u[i], null != c ? a[u.tombs[c]].el : c), null == c ? u.tombs.push(s.idx) : u.tombs.splice(c, 0, s.idx), u[i] = l
                }
            }
            var pt = ft(K, function(t, e) {
                    return e[t.idx + 1]
                }, G, "lftSib", "lftNode", "rgtSib", "rgtNode", q),
                vt = ft(function(t) {
                    return t.previousSibling
                }, function(t, e) {
                    return e[t.idx - 1]
                }, q, "rgtSib", "rgtNode", "lftSib", "lftNode", G);

            function _t(t, e, n, i) {
                for (var r = Array.prototype.slice.call(e.childNodes), o = [], a = 0; a < r.length; a++) {
                    var s = r[a]._node;
                    s.parent === t && o.push(s.idx)
                }
                for (var u = function(t) {
                    var e, n, i = t.slice(),
                        r = [];
                    r.push(0);
                    for (var o = 0, a = t.length; o < a; ++o) {
                        var s = r[r.length - 1];
                        if (t[s] < t[o]) i[o] = s, r.push(o);
                        else {
                            for (e = 0, n = r.length - 1; e < n;) {
                                var u = (e + n) / 2 | 0;
                                t[r[u]] < t[o] ? e = u + 1 : n = u
                            }
                            t[o] < t[r[e]] && (e > 0 && (i[o] = r[e - 1]), r[e] = o)
                        }
                    }
                    for (e = r.length, n = r[e - 1]; e-- > 0;) r[e] = n, n = i[n];
                    return r
                }(o).map(function(t) {
                    return o[t]
                }), c = 0; c < u.length; c++) n[u[c]]._lis = !0;
                for (i.tombs = u;;) {
                    var l = pt(t, e, n, i, null, !0);
                    if (l === dt) break
                }
            }
            function mt(t) {
                return t.el._node.parent !== t.parent
            }
            function gt(t, e, n) {
                return e[n]
            }
            function yt(t, e, n) {
                for (; n < e.length; n++) {
                    var o = e[n];
                    if (null != o.vm) {
                        if (t.type === i && o.vm.view === t.view && o.vm.key === t.key || t.type === r && o.vm === t.vm) return o
                    } else if (!mt(o) && t.tag === o.tag && t.type === o.type && t.key === o.key && (t.flags & ~P) == (o.flags & ~P)) return o
                }
                return null
            }
            function bt(t, e, n) {
                return e[e._keys[t.key]]
            }
            function xt(o, a) {
                z(a.hooks, "willRecycle", a, o);
                var u = o.el = a.el,
                    l = a.body,
                    d = o.body;
                if (u._node = o, o.type !== e || d === l) {
                    null == o.attrs && null == a.attrs || at(o, a, !1);
                    var f = c(l),
                        h = c(d),
                        p = (o.flags & N) === N;
                    f ? h || p ?
                        function(e, o) {
                            var a = e.body,
                                u = a.length,
                                c = o.body,
                                l = c.length,
                                d = (e.flags & N) === N,
                                f = (e.flags & j) === j,
                                h = (e.flags & A) === A,
                                p = !f && e.type === t,
                                v = !0,
                                _ = h ? bt : f || d ? gt : yt;
                            if (h) {
                                for (var m = {}, g = 0; g < c.length; g++) m[c[g].key] = g;
                                c._keys = m
                            }
                            if (p && 0 === u) return X(o), void(d && (e.body = []));
                            var y, b, x = 0,
                                w = !1,
                                I = 0;
                            if (d) var T = {
                                    key: null
                                },
                                D = Array(u);
                            for (var g = 0; g < u; g++) {
                                if (d) {
                                    var C = !1,
                                        E = null;
                                    v && (h && (T.key = a.key(g)), y = _(T, c, I)), null != y ? (b = y.idx, !0 === (E = a.diff(g, y)) ? ((O = y).parent = e, O.idx = g, O._lis = !1) : C = !0) : C = !0, C && (H(O = a.tpl(g), e, g), O._diff = null != E ? E : a.diff(g), null != y && xt(O, y)), D[g] = O
                                } else {
                                    var O = a[g],
                                        M = O.type;
                                    if (M <= n)(y = v && _(O, c, I)) && (xt(O, y), b = y.idx);
                                    else if (M === i) {
                                        if (y = v && _(O, c, I)) {
                                            b = y.idx;
                                            var S = y.vm._update(O.data, e, g)
                                        } else var S = st(O.view, O.data, O.key, O.opts)._redraw(e, g, !1);
                                        M = S.node.type
                                    } else if (M === r) {
                                        var P = k(O.vm),
                                            S = O.vm._update(O.data, e, g, P);
                                        M = S.node.type
                                    }
                                }
                                if (!h && null != y && (b === I ? ++I === l && u > l && (y = null, v = !1) : w = !0, l > 100 && w && ++x % 10 == 0)) for (; I < l && mt(c[I]);) I++
                            }
                            d && (e.body = D), p &&
                            function(t, e) {
                                var n = e.body,
                                    i = t.el,
                                    r = t.body,
                                    o = {
                                        lftNode: r[0],
                                        rgtNode: r[r.length - 1],
                                        lftSib: (n[0] || s).el,
                                        rgtSib: (n[n.length - 1] || s).el
                                    };
                                t: for (;;) {
                                    for (;;) {
                                        var a = pt(t, i, r, o, null, !1);
                                        if (a === lt) break;
                                        if (a === dt) break t
                                    }
                                    for (;;) {
                                        var u = vt(t, i, r, o, o.lftNode, !1);
                                        if (u === lt) break;
                                        if (u === dt) break t
                                    }
                                    _t(t, i, r, o);
                                    break
                                }
                            }(e, o)
                        }(o, a) : d !== l && (null != d ? u.textContent = d : X(a)) : h ? (X(a), ut(o)) : d !== l && (u.firstChild ? u.firstChild.nodeValue = d : u.textContent = d), z(a.hooks, "didRecycle", a, o)
                } else u.nodeValue = d
            }
            function wt(t, e, n, i) {
                var r = this;
                r.view = t, r.data = e, r.key = n, i && (r.opts = i, r.config(i));
                var o = d(t) ? t : t.call(r, r, e, n, i);
                p(o) ? r.render = o : (r.render = o.render, r.config(o)), r._redrawAsync = y(function(t) {
                    return r.redraw(!0)
                }), r._updateAsync = y(function(t) {
                    return r.update(t, !0)
                }), r.init && r.init.call(r, r, r.data, r.key, i)
            }
            var It = wt.prototype = {
                constructor: wt,
                _diff: null,
                init: null,
                view: null,
                key: null,
                data: null,
                state: null,
                api: null,
                opts: null,
                node: null,
                hooks: null,
                onevent: u,
                refs: null,
                render: null,
                mount: function(t, e) {
                    var n = this;
                    return e ? (X({
                        el: t,
                        flags: 0
                    }), n._redraw(null, null, !1), t.nodeName.toLowerCase() !== n.node.tag ? (ct(n.node), G(t.parentNode, n.node.el, t), t.parentNode.removeChild(t)) : G(t.parentNode, ct(n.node, t), t)) : (n._redraw(null, null), t && G(t, n.node.el)), t && W(n), n
                },
                unmount: function(t) {
                    var e = this.node;
                    J(e.el.parentNode, e.el), t || W(this)
                },
                config: function(t) {
                    var e = this;
                    t.init && (e.init = t.init), t.diff && (e.diff = t.diff), t.onevent && (e.onevent = t.onevent), t.hooks && (e.hooks = v(e.hooks || {}, t.hooks)), t.onemit && (e.onemit = v(e.onemit || {}, t.onemit))
                },
                parent: function() {
                    return D(this.node.parent)
                },
                root: function() {
                    for (var t = this.node; t.parent;) t = t.parent;
                    return t.vm
                },
                redraw: function(t) {
                    return t ? this._redraw(null, null, k(this)) : this._redrawAsync(), this
                },
                update: function(t, e) {
                    return e ? this._update(t, null, null, k(this)) : this._updateAsync(t), this
                },
                _update: function(t, e, n, i) {
                    var r = this;
                    return null != t && r.data !== t && (z(r.hooks, "willUpdate", r, t), r.data = t), r._redraw(e, n, i)
                },
                _redraw: function(t, e, n) {
                    var i, r, o = null == t,
                        a = this,
                        s = a.node && a.node.el && a.node.el.parentNode,
                        u = a.node;
                    if (null != a.diff && (i = a._diff, a._diff = r = a.diff(a, a.data), null != u)) {
                        var l = c(i) ? g : m,
                            d = i === r || l(i, r);
                        if (d) return kt(a, u, t, e)
                    }
                    s && z(a.hooks, "willRedraw", a, a.data);
                    var f = a.render.call(a, a, a.data, i, r);
                    if (f === u) return kt(a, u, t, e);
                    if (a.refs = null, null != a.key && f.key !== a.key && (f.key = a.key), a.node = f, t ? (H(f, t, e, a), t.body[e] = f) : u && u.parent ? (H(f, u.parent, u.idx, a), u.parent.body[u.idx] = f) : H(f, null, null, a), !1 !== n) if (u) if (u.tag !== f.tag || u.key !== f.key) {
                        u.vm = f.vm = null;
                        var h = u.el.parentNode,
                            p = K(u.el);
                        J(h, u.el), G(h, ct(f), p), u.el = f.el, f.vm = a
                    } else xt(f, u);
                    else ct(f);
                    return s && z(a.hooks, "didRedraw", a, a.data), o && s && W(a), a
                },
                _redrawAsync: null,
                _updateAsync: null
            };

            function kt(t, e, n, i) {
                return null != n && (n.body[i] = e, e.idx = i, e.parent = n, e._lis = !1), t
            }
            function Tt(t, e, n, i) {
                var r, o;
                return null == n ? d(e) ? r = e : o = e : (r = e, o = n), L(t, r, o, i)
            }
            var Dt = "http://www.w3.org/2000/svg";

            function Ct(t, e, n, i) {
                this.view = t, this.data = e, this.key = n, this.opts = i
            }
            function Et(t) {
                this.vm = t
            }
            Ct.prototype = {
                constructor: Ct,
                type: i,
                view: null,
                data: null,
                key: null,
                opts: null
            }, Et.prototype = {
                constructor: Et,
                type: r,
                vm: null
            };
            var Ot = {
                config: function(t) {
                    Q = t.onevent || Q, t.onemit &&
                    function(t) {
                        v(Z, t)
                    }(t.onemit)
                },
                ViewModel: wt,
                VNode: C,
                createView: st,
                defineElement: Tt,
                defineSvgElement: function(t, e, n, i) {
                    var r = Tt(t, e, n, i);
                    return r.ns = Dt, r
                },
                defineText: O,
                defineComment: function(t) {
                    var e = new C;
                    return e.type = n, e.body = t, e
                },
                defineView: function(t, e, n, i) {
                    return new Ct(t, e, n, i)
                },
                injectView: function(t) {
                    return new Et(t)
                },
                injectElement: function(e) {
                    var n = new C;
                    return n.type = t, n.el = n.key = e, n
                },
                lazyList: function(t, e) {
                    var n = t.length,
                        i = {
                            items: t,
                            length: n,
                            key: function(n) {
                                return e.key(t[n], n)
                            },
                            diff: function(n, i) {
                                var r = e.diff(t[n], n);
                                if (null == i) return r;
                                var o = i._diff,
                                    a = r === o || c(o) ? g(r, o) : m(r, o);
                                return a || r
                            },
                            tpl: function(n) {
                                return e.tpl(t[n], n)
                            },
                            map: function(t) {
                                return e.tpl = t, i
                            },
                            body: function(t) {
                                for (var e = Array(n), r = 0; r < n; r++) {
                                    var o = i.tpl(r);
                                    o._diff = i.diff(r), e[r] = o, H(o, t, r)
                                }
                                t.body = e
                            }
                        };
                    return i
                },
                FIXED_BODY: j,
                DEEP_REMOVE: P,
                KEYED_LIST: A,
                LAZY_LIST: N
            };

            function Mt(t) {
                var e, n, i = arguments,
                    r = i.length;
                if (r > 1) {
                    var o = 1;
                    d(i[1]) && (n = i[1], o = 2), e = r === o + 1 && (h(i[o]) || c(i[o]) || n && (n._flags & N) === N) ? i[o] : _(i, o)
                }
                return L(t, n, e)
            }
            return E.patch = function(t, e) {
                !
                    function(t, e, n) {
                        if (null != e.type) {
                            if (null != t.vm) return;
                            H(e, t.parent, t.idx, null), t.parent.body[t.idx] = e, xt(e, t), n && I(e), W(D(e))
                        } else {
                            var i = Object.create(t);
                            i.attrs = v({}, t.attrs);
                            var r = v(t.attrs, e);
                            if (null != t._class) {
                                var o = r.class;
                                r.class = null != o && "" !== o ? t._class + " " + o : t._class
                            }
                            at(t, i), n && I(t)
                        }
                    }(this, t, e)
            }, It.emit = function(t) {
                var e = this,
                    n = e,
                    i = _(arguments, 1).concat(n, n.data);
                do {
                    var r = e.onemit,
                        o = r ? r[t] : null;
                    if (o) {
                        o.apply(e, i);
                        break
                    }
                } while (e = e.parent());
                Z[t] && Z[t].apply(e, i)
            }, It.onemit = null, It.body = function() {
                return function t(e, n) {
                    var i = e.body;
                    if (c(i)) for (var r = 0; r < i.length; r++) {
                        var o = i[r];
                        null != o.vm ? n.push(o.vm) : t(o, n)
                    }
                    return n
                }(this.node, [])
            }, Ot.defineElementSpread = Mt, Ot.defineSvgElementSpread = function() {
                var t = Mt.apply(null, arguments);
                return t.ns = Dt, t
            }, Ot
        }()
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(40),
            r = n(41),
            o = n(42),
            a = n(43),
            s = n(44),
            u = n(45),
            c = n(46),
            l = n(47),
            d = n(48),
            f = n(6),
            h = n(7);
        e.createFactory = function(t) {
            for (var e = t.defaultType, n = t.allowedTypes, p = t.widgetName, v = t.widget, _ = new Set, m = 0, g = n; m < g.length; m++) {
                var y = g[m];
                _.add(y)
            }
            var b = v.config,
                x = v.events,
                w = v.data;
            return function(t, n) {
                if (t.hidden) return null;
                if (!(t.type && "button" !== t.type && "navItem" !== t.type && "menuItem" !== t.type || t.value || t.icon || t.html)) return null;
                t.type = t.type || e, _ && !_.has(t.type) && (t.type = e), t.type === f.ItemType.imageButton && "ribbon" !== p && (t.active = !1), n && t.type !== f.ItemType.spacer && t.type !== f.ItemType.separator && t.type !== f.ItemType.customHTML && (t.type = f.ItemType.menuItem), w.haveItems(t.id) &&
                function(t, e, n) {
                    switch (t) {
                        case "sidebar":
                        case "context-menu":
                            e.$openIcon = "right";
                            break;
                        case "toolbar":
                            e.parent === n.getRoot() ? e.$openIcon = "right" : e.$openIcon = "bot";
                            break;
                        case "menu":
                            e.parent !== this.data.getRoot() && (e.$openIcon = "right");
                            break;
                        case "ribbon":
                            var i = n.getItem(e.parent);
                            i && e.type !== f.ItemType.block && (i.type === f.ItemType.block ? e.$openIcon = "bot" : e.$openIcon = "right")
                    }
                }(p, t, w);
                var v = t.type !== f.ItemType.customHTML &&
                    function(t, e, n, h) {
                        switch (t.type) {
                            case f.ItemType.navItem:
                            case f.ItemType.selectButton:
                                return r.navItem(t, n, h.collapsed);
                            case f.ItemType.button:
                                return i.button(t, n);
                            case f.ItemType.title:
                                return d.title(t, n);
                            case f.ItemType.separator:
                                return c.separator(t, n);
                            case f.ItemType.spacer:
                                return l.spacer(t, n);
                            case f.ItemType.input:
                                return s.input(t, e, n);
                            case f.ItemType.imageButton:
                                return a.imageButton(t, n);
                            case f.ItemType.menuItem:
                                return u.menuItem(t, n, h.asMenuItem);
                            case f.ItemType.customHTMLButton:
                                return o.customHTMLButton(t, n, h.asMenuItem);
                            case f.ItemType.block:
                            default:
                                throw new Error("unknown item type " + t.type)
                        }
                    }(t, x, p, {
                        asMenuItem: n,
                        collapsed: "sidebar" !== p || b.collapsed
                    });
                return h.navbarComponentMixin(p, t, n, v)
            }
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(7);
        e.button = function(t, e) {
            var n = t.icon && !t.value,
                o = n ? " dhx_navbar-count--absolute" : " dhx_navbar-count--button-inline";
            return i.el("button.dhx_button", {
                class: r.getNavbarButtonCSS(t, e),
                dhx_id: t.id,
                disabled: t.disabled,
                type: "button"
            }, [t.icon ? r.getIcon(t.icon, "button") : null, t.html ? i.el("div.dhx_button__text", {
                ".innerHTML": t.html
            }) : t.value && i.el("span.dhx_button__text", t.value), t.count > 0 && r.getCount(t, o, n), t.value && t.$openIcon ? i.el("span.dhx_button__icon.dhx_button__icon--menu.dxi.dxi-menu-right") : null, t.loading && i.el("span.dhx_button__loading", [i.el("span.dhx_button__loading-icon.dxi.dxi-loading")])])
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(7);
        e.navItem = function(t, e, n) {
            var o = " dhx_" + e + "-button";
            return i.el("button", {
                class: "dhx_button" + o + (t.active || t.$activeParent ? o + "--active" : "") + (t.disabled ? o + "--disabled" : "") + (t.$openIcon ? o + "--select" : "") + (t.circle ? o + "--circle" : "") + (t.size ? " " + o + "--" + t.size : "") + (!t.value && t.icon ? o + "--icon" : "") + (t.css ? " " + t.css : ""),
                dhx_id: t.id,
                disabled: t.disabled,
                type: "button"
            }, [t.icon && i.el("span", {
                class: t.icon + o + "__icon"
            }), t.html && i.el("div", {
                class: o.trim() + "__html",
                ".innerHTML": t.html
            }), !t.html && t.value && i.el("span", {
                class: o.trim() + "__text"
            }, t.value), t.count > 0 && r.getCount(t, o + "__count", n), t.$openIcon && i.el("span.dxi.dxi-menu-right", {
                class: o + "__caret"
            })])
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0);
        e.customHTMLButton = function(t, e, n) {
            var r = n ? " dhx_button dhx_menu-button" : " dhx_button dhx_nav-menu-button";
            return i.el("button", {
                class: "dhx_custom-button" + r + (t.$activeParent ? r + "--active" : ""),
                dhx_id: t.id,
                type: "button",
                ".innerHTML": t.html
            }, t.html ? "" : t.value)
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(7);
        e.imageButton = function(t, e) {
            var n = "dhx_" + e + "-button-image",
                o = "ribbon" === e;
            return i.el("button.dhx_button", {
                class: n + (t.size ? " " + n + "--" + t.size : "") + (!t.value && t.src ? " " + n + "--icon" : "") + (o && t.$openIcon ? " " + n + "--select" : "") + (t.active ? " " + n + "--active" : ""),
                dhx_id: t.id,
                type: "button"
            }, [o && t.value && t.$openIcon && i.el("span.dxi.dxi-menu-right", {
                class: n + "__caret"
            }), t.html ? i.el("div", {
                class: n + "__text",
                ".innerHTML": t.html
            }) : t.value && i.el("span", {
                class: n + "__text"
            }, t.value), t.src && i.el("span", {
                class: n + "__image",
                style: {
                    backgroundImage: "url(" + t.src + ")"
                }
            }), t.count > 0 && r.getCount(t, n + "__count", !0)])
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(6);

        function o(t, e) {
            t.fire(r.NavigationBarEvents.inputBlur, [e])
        }
        function a(t, e) {
            t.fire(r.NavigationBarEvents.inputFocus, [e])
        }
        e.input = function(t, e, n) {
            return i.el(".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr.dhx_" + n + "__input", {
                style: {
                    width: t.width ? t.width : "200px"
                }
            }, [i.el("label.dhx_label", {
                for :t.id
            }, t.label), i.el(".dhx_input__wrapper", [i.el("input.dhx_input", {
                placeholder: t.placeholder,
                class: t.icon ? "dhx_input--icon-padding" : "",
                value: t.value,
                onblur: [o, e, t.id],
                onfocus: [a, e, t.id],
                dhx_id: t.id,
                _hooks: {
                    didInsert: function(n) {
                        e && e.fire(r.NavigationBarEvents.inputCreated, [t.id, n.el])
                    }
                },
                _key: t.id
            }), t.icon ? i.el(".dhx_input__icon", {
                class: t.icon
            }) : null])])
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = n(7);
        e.menuItem = function(t, e, n) {
            var o = n ? " dhx_menu-button" : " dhx_nav-menu-button";
            return i.el("button", {
                class: "dhx_button" + o + (t.disabled ? o + "--disabled" : "") + (t.$activeParent ? o + "--active" : ""),
                disabled: t.disabled,
                dhx_id: t.id,
                type: "button"
            }, n ? [t.icon || t.value || t.html ? i.el("span.dhx_menu-button__block.dhx_menu-button__block--left", [t.icon && i.el("span.dhx_menu-button__icon", {
                class: t.icon
            }), t.html ? i.el("div.dhx_menu-button__text", {
                ".innerHTML": t.html
            }) : t.value && i.el("span.dhx_menu-button__text", t.value)]) : null, t.count > 0 || t.hotkey || t.items ? i.el("span.dhx_menu-button__block.dhx_menu-button__block--right", [t.count > 0 && r.getCount(t, " dhx_menu-button__count", !1), t.hotkey && i.el("span.dhx_menu-button__hotkey", t.hotkey), t.items && i.el("span.dhx_menu-button__caret.dxi.dxi-menu-right")]) : null] : [t.icon && i.el("span.dhx_menu-button__icon", {
                class: t.icon
            }), t.html ? i.el("div.dhx_menu-button__text", {
                ".innerHTML": t.html
            }) : t.value && i.el("span.dhx_nav-menu-button__text", t.value)])
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.separator = function(t, e) {
            return null
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.spacer = function(t, e) {
            return null
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0);
        e.title = function(t, e) {
            return i.el("span", {
                class: "dhx_navbar-title dhx_navbar-title--" + e,
                ".innerHTML": t.html
            }, t.html ? null : t.value)
        }
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__extends ||
            function() {
                var t = function(e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array &&
                        function(t, e) {
                            t.__proto__ = e
                        } ||
                        function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function(e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(0),
            o = n(12),
            a = function(t) {
                function e(e, n) {
                    var i = t.call(this, e, n) || this;
                    return i.mount(e, r.create({
                        render: function() {
                            return i._draw()
                        }
                    })), i
                }
                return i(e, t), e.prototype._getFactory = function() {
                    return o.createFactory({
                        widget: this,
                        defaultType: o.ItemType.menuItem,
                        allowedTypes: [o.ItemType.menuItem, o.ItemType.spacer, o.ItemType.separator, o.ItemType.customHTML, o.ItemType.customHTMLButton],
                        widgetName: "menu-nav"
                    })
                }, e.prototype._draw = function() {
                    return r.el("ul.dhx_widget", {
                        dhx_widget_id: this._uid,
                        onmousemove: this._handlers.onmousemove,
                        onmouseleave: this._handlers.onmouseleave,
                        onclick: this._handlers.onclick,
                        onmousedown: this._handlers.onmousedown,
                        class: "dhx_menu-nav " + (this.config.css ? this.config.css : "")
                    }, this._drawMenuItems(this.data.getRoot(), !1))
                }, e
            }(o.Navbar);
        e.Menu = a
    }, function(t, e, n) {
        "use strict";
        var i = this && this.__extends ||
            function() {
                var t = function(e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array &&
                        function(t, e) {
                            t.__proto__ = e
                        } ||
                        function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function(e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }(), r = this && this.__assign ||
            function() {
                return (r = Object.assign ||
                    function(t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t
                    }).apply(this, arguments)
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(4),
            a = n(0),
            s = n(5),
            u = n(1),
            c = n(19),
            l = n(20),
            d = n(8),
            f = n(51),
            h = n(52),
            p = n(53);

        function v(t) {
            return 20 * t
        }
        var _ = function(t) {
            function e(e, n) {
                void 0 === n && (n = {});
                var i = t.call(this, e, o.extend({
                        dropBehaviour: d.DropBehaviour.child,
                        icon: {
                            file: "dxi dxi-file-outline",
                            folder: "dxi dxi-folder",
                            openFolder: "dxi dxi-folder-open"
                        }
                    }, n)) || this,
                    r = function(t) {
                        return t.opened = t.opened, t.$mark = p.SelectStatus.unselected, t.checkbox = i.config.checkbox, t.$autoload = Boolean(t.items && i.config.autoload), t.$editor = !1, t
                    };
                Array.isArray(i.config.data) ? (i.events = new s.EventSystem(i), i.data = new d.TreeCollection({
                    autoload: i.config.autoload,
                    init: r
                }, i.events), i.data.parse(i.config.data)) : i.config.data && i.config.data.events ? (i.data = i.config.data, i.data.config.init = r, i.events = i.data.events, i.events.context = i) : (i.events = new s.EventSystem(i), i.data = new d.TreeCollection({
                    autoload: i.config.autoload,
                    init: r
                }, i.events)), i._isSelectionActive = !0, i.selection = new d.Selection({}, i.data, i.events), i.config.keyNavigation && h.keyNavigation.add(i._uid, i), i._editor = f.
                    default, i._initEvents(), i._initHandlers(), i.config.dragMode && d.dragManager.setItem(i._uid, i), i._root = i.data.getRoot();
                return i.mount(e, a.create({
                    render: function() {
                        return i._draw()
                    }
                })), i
            }
            return i(e, t), e.prototype.focusItem = function(t) {
                var e = this;
                this._focusId = t, this.data.eachParent(t, function(t) {
                    t.opened || e.expand(t.id)
                }), this.paint()
            }, e.prototype.destructor = function() {
                this.events.clear(), this.unmount()
            }, e.prototype.editItem = function(t, e) {
                this.data.update(t, {
                    $edit: !0,
                    $editConfig: e
                })
            }, e.prototype.getState = function() {
                var t = {};
                return this.data.eachChild(this._root, function(e) {
                    t[e.id] = {
                        open: e.opened,
                        selected: e.$mark
                    }
                }, !0), t
            }, e.prototype.setState = function(t) {
                this.data.eachChild(this._root, function(e) {
                    e.id in t && (e.opened = t[e.id].open, e.$mark = t[e.id].selected)
                }, !0), this.paint()
            }, e.prototype.toggle = function(t) {
                var e = this.data.getItem(t);
                e.$autoload ? (this.data.loadItems(t), this.data.update(t, {
                    $autoload: !1,
                    opened: !0
                })) : this.data.update(t, {
                    opened: !e.opened
                })
            }, e.prototype.getChecked = function() {
                var t = [];
                return this.data.eachChild(this._root, function(e) {
                    e.$mark === p.SelectStatus.selected && t.push(e.id)
                }), t
            }, e.prototype.checkItem = function(t) {
                this._updateItemCheck(t, p.SelectStatus.selected)
            }, e.prototype.collapse = function(t) {
                this.data.haveItems(t) && this.data.update(t, {
                    opened: !1
                })
            }, e.prototype.collapseAll = function() {
                var t = this;
                this.data.eachChild(this._root, function(e) {
                    var n = e.id;
                    return t.collapse(n)
                }, !0)
            }, e.prototype.expand = function(t) {
                this.data.haveItems(t) && this.data.update(t, {
                    opened: !0
                })
            }, e.prototype.expandAll = function() {
                var t = this;
                this.data.eachChild(this._root, function(e) {
                    var n = e.id;
                    return t.expand(n)
                }, !0)
            }, e.prototype.uncheckItem = function(t) {
                this._updateItemCheck(t, p.SelectStatus.unselected)
            }, e.prototype.close = function(t) {
                this.collapse(t)
            }, e.prototype.closeAll = function() {
                this.collapseAll()
            }, e.prototype.open = function(t) {
                this.expand(t)
            }, e.prototype.openAll = function() {
                this.expandAll()
            }, e.prototype.unCheckItem = function(t) {
                this.uncheckItem(t)
            }, e.prototype._draw = function() {
                var t = this._drawItems(this.data.getRoot());
                return a.el("ul", r({
                    class: "dhx_widget dhx_tree" + (this._isSelectionActive ? "" : " dhx_tree--no-selection ") + (this.config.css ? " " + this.config.css : ""),
                    dhx_widget_id: this._uid
                }, this._handlers), t)
            }, e.prototype._initEvents = function() {
                var t = this;
                this.data.events.on(d.DataEvents.change, function(e, n, i) {
                    "remove" === n && t._updateParents(i.parent, !0), "add" === n && t._updateParents(e), t.paint()
                }), this._editor.events.on(f.EditorEvents.end, function(e, n, i) {
                    t._uid === e && t.data.update(n, {
                        $edit: !1,
                        value: i
                    }), h.keyNavigation.block(!1)
                }), this._editor.events.on(f.EditorEvents.begin, function(e) {
                    e === t._uid && h.keyNavigation.block(!0)
                }), this.events.on(d.DragEvents.beforeDrag, function(e, n) {
                    var i = m(t.config.isFolder ? t.config.isFolder(e) : t.data.haveItems(e.id), e.opened),
                        r = (e.icon || t.config.icon)[i] || t.config.icon[i];
                    n.innerHTML = '<div class="dhx_tree-list-item__icon ' + r + '"></div><span class="dhx_tree-list-item__text">' + (e.text || e.value) + "</span>"
                }), this.events.on(d.DragEvents.canDrop, function(e, n) {
                    var i;
                    i = t.config.dropBehaviour === d.DropBehaviour.complex ? n === d.DropPosition.top ? "dhx_tree-drop--top" : n === d.DropPosition.bot ? "dhx_tree-drop--bottom" : "dhx_tree-drop--in-folder" : t.config.dropBehaviour === d.DropBehaviour.child ? "dhx_tree-drop--in-folder" : "dhx_tree-drop--bottom", t.data.exists(e) && t.data.update(e, {
                        $drophere: i
                    })
                }), this.events.on(d.DragEvents.cancelDrop, function(e) {
                    t.data.exists(e) && t.data.update(e, {
                        $drophere: null
                    })
                }), this.events.on(d.DragEvents.dropComplete, function(e, n) {
                    (t.config.dropBehaviour === d.DropBehaviour.child || t.config.dropBehaviour === d.DropBehaviour.complex && n === d.DropPosition. in ) && t.expand(e)
                }), this.events.on(d.DragEvents.dragStart, function() {
                    t._isSelectionActive = !1, t.paint()
                }), this.events.on(d.DragEvents.dragEnd, function() {
                    t._isSelectionActive = !0, t.paint()
                }), this.events.on(c.SelectionEvents.afterSelect, function(e) {
                    return t._focusId = e
                }), this.config.editing && this.events.on(p.TreeEvents.itemDblClick, function(e) {
                    return t.editItem(e)
                })
            }, e.prototype._initHandlers = function() {
                var t = this;
                this._handlers = {
                    onmouseleave: function(t) {
                        d.dragManager._cancelCanDrop()
                    },
                    onclick: function(e) {
                        var n = u.locate(e);
                        n && (e.target.classList.contains("dhx_tree-toggle-button") ? t.toggle(n) : e.target.classList.contains("dhx_tree-checkbox") ? t.data.getItem(n).$mark === p.SelectStatus.unselected ? t.checkItem(n) : t.uncheckItem(n) : (t.events.fire(p.TreeEvents.itemClick, [n, e]), t.data.exists(n) && t.selection.add(n)))
                    },
                    ondblclick: function(e) {
                        var n = u.locate(e);
                        t.events.fire(p.TreeEvents.itemDblClick, [n, e])
                    },
                    ondragstart: function(t) {
                        t.preventDefault()
                    },
                    onmousedown: function(e) {
                        t.config.dragMode && t.config.dragMode !== d.DragMode.target && d.dragManager.onMouseDown(e)
                    },
                    oncontextmenu: function(e) {
                        var n = u.locate(e);
                        n && (t.events.fire(p.TreeEvents.itemRightClick, [n, e]), t.events.fire(p.TreeEvents.itemContextMenu, [n, e]))
                    }
                }
            }, e.prototype._drawItems = function(t, e) {
                var n = this;
                return void 0 === e && (e = 0), this.data.map(function(t) {
                    if (t) {
                        var i, o, s, u = !! n.config.isFolder && n.config.isFolder(t);
                        if ((t.$autoload || n.data.haveItems(t.id)) && (u = !0, i = a.el("div", {
                            class: "dxi dxi-menu-right dhx_tree-toggle-button"
                        }, ""), t.opened && (i = a.el("div", {
                            class: "dxi dxi-menu-down dhx_tree-toggle-button dhx_tree-toggle-button--open"
                        }, ""), o = n._drawItems(t.id, e + 1))), t.checkbox) {
                            var c = t.$mark === p.SelectStatus.indeterminate ? "dxi-minus-box" : t.$mark === p.SelectStatus.selected ? "dxi-checkbox-marked" : "dxi-checkbox-blank-outline";
                            s = a.el("div", {
                                class: "dhx_tree-checkbox dxi " + c
                            })
                        }
                        var l, d = m(u, t.opened),
                            f = (t.icon || n.config.icon)[d] || n.config.icon[d];
                        return l = t.$edit ? n._editor.edit(n._uid, r({
                            item: t
                        }, t.$editConfig)) : a.el("span", {
                            class: "dhx_tree-list-item__text"
                        }, t.text || t.value), u ? a.el("li", {
                            class: "dhx_tree-list-item dhx_tree-list-item--parent" + (t.css ? " " + t.css : ""),
                            dhx_id: t.id,
                            _key: t.id
                        }, [a.el("div.dhx_tree-folder", {
                            class: (t.id === n._focusId ? " dhx_tree-folder--focused" : "") + (t.$selected ? " dhx_tree-folder--selected" : "") + (t.$drophere ? " " + t.$drophere : ""),
                            style: {
                                left: -v(e) + "px",
                                right: -v(e) + "px",
                                "margin-left": v(e) + "px"
                            }
                        }, [i, a.el("div.dhx_tree-list-item__content", [s, a.el("div", {
                            class: "dhx_tree-list-item__icon " + f
                        }), l])]), o && a.el("ul.dhx_tree-list", o)]) : a.el("li", {
                            class: "dhx_tree-list__item dhx_tree-list-item" + (t.id === n._focusId ? " dhx_tree-list-item--focused" : "") + (t.$selected ? " dhx_tree-list-item--selected" : "") + (t.$drophere ? " " + t.$drophere : "") + (u ? "dhx_tree-list-item--folder" : ""),
                            style: {
                                left: -v(e) + "px",
                                right: -v(e) + "px",
                                "margin-left": v(e) + "px"
                            },
                            dhx_id: t.id,
                            level: e
                        }, [i, a.el("div", {
                            class: "dhx_tree-list-item__content"
                        }, [s, a.el("div", {
                            class: "dhx_tree-list-item__icon " + f
                        }), l])])
                    }
                }, t, !1)
            }, e.prototype._updateItemCheck = function(t, e) {
                this.data.update(t, {
                    $mark: e
                }), this.data.eachChild(t, function(t) {
                    return t.$mark = e
                }), this._updateParents(t)
            }, e.prototype._updateParents = function(t, e) {
                var n = this;
                void 0 === e && (e = !1), t !== this._root && this.data.eachParent(t, function(t) {
                    var e = 0,
                        i = 0;
                    n.data.eachChild(t.id, function(t) {
                        if (t.checkbox) switch (t.$mark) {
                            case p.SelectStatus.unselected:
                                i++;
                                break;
                            case p.SelectStatus.selected:
                                e++
                        }
                    }, !0), t.$mark = 0 !== e && 0 !== i ? p.SelectStatus.indeterminate : 0 === e && 0 !== i ? p.SelectStatus.unselected : p.SelectStatus.selected
                }, e)
            }, e
        }(l.View);

        function m(t, e) {
            return t ? e ? p.ItemIcon.openFolder : p.ItemIcon.folder : p.ItemIcon.file
        }
        e.Tree = _
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i, r, o = n(0),
            a = n(5),
            s = n(1),
            u = n(13);
        !
            function(t) {
                t.editText = "text", t.selectItem = "select"
            }(i = e.EditorMode || (e.EditorMode = {})), function(t) {
            t.begin = "begin", t.end = "end"
        }(r = e.EditorEvents || (e.EditorEvents = {}));
        var c = function() {
            function t() {
                var t = this;
                this.events = new a.EventSystem, this._documentClick = function(e) {
                    s.locate(e, "id") !== "input_" + t._item.id && (t._removeClickListener(), t._finishEdit())
                }, this._handlers = {
                    editText: function(e) {
                        t._currentValue = e.target.value
                    },
                    itemSelected: function(e) {
                        t._currentValue = e.target.value, t._finishEdit()
                    }
                }
            }
            return t.prototype.edit = function(t, e) {
                return this._active && this._item !== e.item && this._finishEdit(), this._active = !0, this.events.fire(r.begin, [t]), this._targetId = t, this.config = e, this._item = e.item, this._currentValue = this._item.value, this._initOuterClick(), this._addHotkeys(), this._draw()
            }, t.prototype._draw = function() {
                var t = this;
                if (this.config.mode === i.selectItem) {
                    var e = this.config.options;
                    return o.el("select", {
                        id: "input_" + this._item.id,
                        dhx_id: this._item.id,
                        onchange: this._handlers.itemSelected
                    }, e.map(function(e) {
                        return o.el("option", {
                            class: "editor-select",
                            value: e,
                            selected: t._currentValue === e,
                            style: {
                                border: "1px solid"
                            }
                        }, e)
                    }))
                }
                return o.el("input", {
                    _hooks: {
                        didInsert: function(t) {
                            t.el.focus()
                        }
                    },
                    id: "input_" + this._item.id,
                    class: "dhx_tree-input",
                    oninput: this._handlers.editText,
                    value: this._item.value,
                    autofocus: !0
                })
            }, t.prototype._addHotkeys = function() {
                var t = this;
                u.keyManager.addHotKey("escape", function() {
                    t._finishEdit()
                }, this), u.keyManager.addHotKey("enter", function() {
                    t._finishEdit()
                }, this)
            }, t.prototype._removeHotkeys = function() {
                u.keyManager.removeHotKey(null, this)
            }, t.prototype._finishEdit = function() {
                this.events.fire(r.end, [this._targetId, this._item.id, this._currentValue]), this._clear()
            }, t.prototype._clear = function() {
                this._active = !1, this._removeClickListener(), this._removeHotkeys()
            }, t.prototype._initOuterClick = function() {
                document.addEventListener("click", this._documentClick)
            }, t.prototype._removeClickListener = function() {
                document.removeEventListener("click", this._documentClick)
            }, t
        }();
        e.
            default = new c
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(4),
            r = n(1),
            o = n(13),
            a = function() {
                function t() {
                    this._store = {}, this._keyManager = o.keyManager, this._listen = !1, this._blocked = !1
                }
                return t.prototype.add = function(t, e) {
                    this._listen || (this._listen = !0, this._initKeys(), this._addListeners()), this._store[t] = e
                }, t.prototype.block = function(t) {
                    this._blocked = t
                }, t.prototype._initKeys = function() {
                    var t = this;
                    this._keyManager.addHotKey("arrowleft", function(e) {
                        if (!t._blocked) {
                            e.preventDefault();
                            var n = t._store[t._activeTarget];
                            if (n) {
                                var i = t._getFocused(),
                                    r = n.data.getParent(i);
                                if (n.data.getRoot() !== r)!n.data.getItem(i).opened ? n.focusItem(r) : i !== n.data.getRoot() && n.collapse(i);
                                else n.collapse(i)
                            }
                        }
                    }), this._keyManager.addHotKey("arrowright", function(e) {
                        if (!t._blocked) {
                            e.preventDefault();
                            var n = t._store[t._activeTarget];
                            if (n) {
                                var i = t._getFocused();
                                n.data.haveItems(i) && n.expand(i)
                            }
                        }
                    }), this._keyManager.addHotKey("arrowup", function(e) {
                        if (!t._blocked) {
                            e.preventDefault();
                            var n = t._store[t._activeTarget];
                            if (n) {
                                var i = t._getFocused(),
                                    r = n.data,
                                    o = t._getClosestTop(i, r);
                                o && n.focusItem(o)
                            }
                        }
                    }), this._keyManager.addHotKey("arrowdown", function(e) {
                        if (!t._blocked) {
                            e.preventDefault();
                            var n = t._store[t._activeTarget];
                            if (n) {
                                var i = t._getFocused(),
                                    r = n.data,
                                    o = t._getClosestBot(i, r);
                                o && n.focusItem(o)
                            }
                        }
                    }), this._keyManager.addHotKey("enter", function() {
                        if (!t._blocked) {
                            var e = t._store[t._activeTarget];
                            if (e) {
                                var n = t._getFocused();
                                n && e.selection.add(n)
                            }
                        }
                    })
                }, t.prototype._getFocused = function() {
                    var t = this._store[this._activeTarget],
                        e = t._focusId;
                    if (e) return e;
                    var n = t.data.getRoot();
                    return t.data.getItems(n)[0].id
                }, t.prototype._addListeners = function() {
                    var t = this;
                    document.addEventListener("click", function(e) {
                        var n = r.locate(e, "dhx_widget_id");
                        n in t._store && (t._activeTarget = n)
                    }), o.keyManager.addHotKey("tab", function(e) {
                        var n = r.locate(e, "dhx_widget_id");
                        n in t._store && (t._activeTarget = n)
                    }, this)
                }, t.prototype._getClosestBot = function(t, e, n) {
                    void 0 === n && (n = !1);
                    var r = e.getItem(t);
                    if (e.haveItems(t) && r.opened && !n) return e.getItems(t)[0].id;
                    var o = e.getParent(t),
                        a = e.getItems(o),
                        s = i.findIndex(a, function(e) {
                            return e.id === t
                        });
                    return s + 1 < a.length ? a[s + 1].id : o === e.getRoot() ? null : this._getClosestBot(o, e, !0)
                }, t.prototype._getClosestTop = function(t, e) {
                    var n = e.getIndex(t),
                        i = e.getParent(t);
                    if (n > 0) {
                        var r = e.getItems(i)[n - 1];
                        if (!e.haveItems(r.id) || !r.opened) return r.id;
                        for (; e.haveItems(r.id) && r.opened;) {
                            var o = e.getItems(r.id);
                            r = o[o.length - 1]
                        }
                        return r.id
                    }
                    return i === e.getRoot() ? null : i
                }, t
            }();
        e.keyNavigation = new a
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), function(t) {
            t[t.unselected = 0] = "unselected", t[t.selected = 1] = "selected", t[t.indeterminate = 2] = "indeterminate"
        }(e.SelectStatus || (e.SelectStatus = {})), function(t) {
            t.file = "file", t.folder = "folder", t.openFolder = "openFolder"
        }(e.ItemIcon || (e.ItemIcon = {})), function(t) {
            t.itemClick = "itemclick", t.itemDblClick = "itemdblclick", t.itemRightClick = "itemrightclick", t.itemContextMenu = "itemcontextmenu"
        }(e.TreeEvents || (e.TreeEvents = {}))
    }])
}), window.dhx_legacy) {
    if (window.dhx) for (var key in dhx) dhx_legacy[key] = dhx[key];
    window.dhx = dhx_legacy, delete window.dhx_legacy
}
