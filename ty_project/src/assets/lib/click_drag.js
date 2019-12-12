/*
@license

dhtmlxGantt v.6.3.0 Standard

This version of dhtmlxGantt is distributed under GPL 2.0 license and can be legally used in GPL projects.

To use dhtmlxGantt in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("ext/dhtmlxgantt_click_drag", [], e) : "object" == typeof exports ? exports["ext/dhtmlxgantt_click_drag"] = e() : t["ext/dhtmlxgantt_click_drag"] = e()
}(window, function() {
    return function(t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var o = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
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
            }), 2 & e && "string" != typeof t)
                for (var o in t) n.d(i, o, function(e) {
                    return t[e]
                }.bind(null, o));
            return i
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "/codebase/", n(n.s = 217)
    }({
        2: function(t, e) {
            var n = {
                second: 1,
                minute: 60,
                hour: 3600,
                day: 86400,
                week: 604800,
                month: 2592e3,
                quarter: 7776e3,
                year: 31536e3
            };

            function i(t, e) {
                var n = [];
                if (t.filter) return t.filter(e);
                for (var i = 0; i < t.length; i++) e(t[i], i) && (n[n.length] = t[i]);
                return n
            }
            t.exports = {
                getSecondsInUnit: function(t) {
                    return n[t] || n.hour
                },
                forEach: function(t, e) {
                    if (t.forEach) t.forEach(e);
                    else
                        for (var n = t.slice(), i = 0; i < n.length; i++) e(n[i], i)
                },
                arrayMap: function(t, e) {
                    if (t.map) return t.map(e);
                    for (var n = t.slice(), i = [], o = 0; o < n.length; o++) i.push(e(n[o], o));
                    return i
                },
                arrayFind: function(t, e) {
                    if (t.find) return t.find(e);
                    for (var n = 0; n < t.length; n++)
                        if (e(t[n], n)) return t[n]
                },
                arrayFilter: i,
                arrayDifference: function(t, e) {
                    return i(t, function(t, n) {
                        return !e(t, n)
                    })
                },
                arraySome: function(t, e) {
                    if (0 === t.length) return !1;
                    for (var n = 0; n < t.length; n++)
                        if (e(t[n], n, t)) return !0;
                    return !1
                },
                hashToArray: function(t) {
                    var e = [];
                    for (var n in t) t.hasOwnProperty(n) && e.push(t[n]);
                    return e
                },
                sortArrayOfHash: function(t, e, n) {
                    var i = function(t, e) {
                        return t < e
                    };
                    t.sort(function(t, o) {
                        return t[e] === o[e] ? 0 : n ? i(t[e], o[e]) : i(o[e], t[e])
                    })
                },
                throttle: function(t, e) {
                    var n = !1;
                    return function() {
                        n || (t.apply(null, arguments), n = !0, setTimeout(function() {
                            n = !1
                        }, e))
                    }
                },
                isArray: function(t) {
                    return Array.isArray ? Array.isArray(t) : t && void 0 !== t.length && t.pop && t.push
                },
                isDate: function(t) {
                    return !(!t || "object" != typeof t || !(t.getFullYear && t.getMonth && t.getDate))
                },
                isStringObject: function(t) {
                    return t && "object" == typeof t && "function String() { [native code] }" === Function.prototype.toString.call(t.constructor)
                },
                isNumberObject: function(t) {
                    return t && "object" == typeof t && "function Number() { [native code] }" === Function.prototype.toString.call(t.constructor)
                },
                isBooleanObject: function(t) {
                    return t && "object" == typeof t && "function Boolean() { [native code] }" === Function.prototype.toString.call(t.constructor)
                },
                delay: function(t, e) {
                    var n, i = function() {
                        i.$cancelTimeout(), t.$pending = !0;
                        var o = Array.prototype.slice.call(arguments);
                        n = setTimeout(function() {
                            t.apply(this, o), i.$pending = !1
                        }, e)
                    };
                    return i.$pending = !1, i.$cancelTimeout = function() {
                        clearTimeout(n), t.$pending = !1
                    }, i.$execute = function() {
                        t(), t.$cancelTimeout()
                    }, i
                },
                objectKeys: function(t) {
                    if (Object.keys) return Object.keys(t);
                    var e, n = [];
                    for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
                    return n
                },
                requestAnimationFrame: function(t) {
                    var e = window;
                    return (e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function(t) {
                        setTimeout(t, 1e3 / 60)
                    })(t)
                },
                isEventable: function(t) {
                    return t.attachEvent && t.detachEvent
                }
            }
        },
        215: function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(4),
                o = n(2);

            function r(t, e) {
                var n = t - e;
                return n >= 0 ? n : -n
            }
            var a = function() {
                function t(t) {
                    var e = this;
                    this._el = document.createElement("div"), this._viewPort = t.viewPort, this._el.classList.add(t.className), "function" == typeof t.callback && (this._callback = t.callback), "function" == typeof t.render && (this.render = function() {
                        e._el = t.render(e._startPoint, e._endPoint), "" !== t.className && e._el.classList.add(t.className), e.draw()
                    }), o.isEventable(this._viewPort) || i(this._viewPort), this._singleRow = t.singleRow, this._useRequestAnimationFrame = t.useRequestAnimationFrame
                }
                return t.prototype.setStyles = function() {
                    if (this._singleRow) {
                        var t = gantt.config.row_height;
                        this._el.style.height = t + "px", this._el.style.top = (Math.ceil(this._positionPoint.relative.top / t) - 1) * t + "px"
                    } else this._el.style.height = r(this._endPoint.relative.top, this._startPoint.relative.top) + "px", this._el.style.top = this._positionPoint.relative.top + "px";
                    this._el.style.width = r(this._endPoint.relative.left, this._startPoint.relative.left) + "px", this._el.style.left = this._positionPoint.relative.left + "px"
                }, t.prototype.render = function() {
                    this.setStyles(), this.draw()
                }, t.prototype.draw = function() {
                    var t = this;
                    if (this._useRequestAnimationFrame) return o.requestAnimationFrame(function() {
                        t._viewPort.appendChild(t.getElement())
                    });
                    this._viewPort.appendChild(this.getElement())
                }, t.prototype.clear = function() {
                    var t = this;
                    if (this._useRequestAnimationFrame) return o.requestAnimationFrame(function() {
                        t._el.parentNode && t._viewPort.removeChild(t._el)
                    });
                    this._el.parentNode && this._viewPort.removeChild(this._el)
                }, t.prototype.getElement = function() {
                    return this._el
                }, t.prototype.getViewPort = function() {
                    return this._viewPort
                }, t.prototype.setStart = function(t) {
                    this._startPoint = t, this._startDate = gantt.dateFromPos(this._startPoint.relative.left), this._viewPort.callEvent("onBeforeDrag", [this._startPoint])
                }, t.prototype.setEnd = function(t) {
                    if (this._endPoint = t, this._singleRow) {
                        var e = gantt.config.row_height;
                        this._endPoint.relative.top = Math.ceil(this._startPoint.relative.top / e) * e
                    }
                    this._endDate = gantt.dateFromPos(this._endPoint.relative.left), this._startPoint.relative.left > this._endPoint.relative.left && (this._positionPoint = {
                        relative: {
                            left: this._endPoint.relative.left,
                            top: this._positionPoint.relative.top
                        },
                        absolute: {
                            left: this._endPoint.absolute.left,
                            top: this._positionPoint.absolute.top
                        }
                    }), this._startPoint.relative.top > this._endPoint.relative.top && (this._positionPoint = {
                        relative: {
                            left: this._positionPoint.relative.left,
                            top: this._endPoint.relative.top
                        },
                        absolute: {
                            left: this._positionPoint.absolute.left,
                            top: this._endPoint.absolute.top
                        }
                    }), this._viewPort.callEvent("onDrag", [this._startPoint, this._endPoint])
                }, t.prototype.setPosition = function(t) {
                    this._positionPoint = t
                }, t.prototype.dragEnd = function(t) {
                    var e;
                    t.relative.left < 0 && (t.relative.left = 0), this._viewPort.callEvent("onBeforeDragEnd", [this._startPoint, t]), this.setEnd(t), this._startDate.valueOf() > this._endDate.valueOf() && (e = [this._endDate, this._startDate], this._startDate = e[0], this._endDate = e[1]), this.clear();
                    var n = gantt.getTaskByTime(this._startDate, this._endDate),
                        i = this._getTasksByTop(this._startPoint.relative.top, this._endPoint.relative.top);
                    this._viewPort.callEvent("onDragEnd", [this._startPoint, this._endPoint]), this._callback && this._callback(this._startPoint, this._endPoint, this._startDate, this._endDate, n, i)
                }, t.prototype.getInBounds = function() {
                    return this._singleRow
                }, t.prototype._getTasksByTop = function(t, e) {
                    var n = t,
                        i = e;
                    t > e && (n = e, i = t);
                    for (var o = gantt.config.row_height, r = Math.ceil(n / o) - 1, a = Math.ceil(i / o) - 1, s = [], l = r; l <= a; l++) {
                        gantt.getTaskByIndex(l) && s.push(gantt.getTaskByIndex(l))
                    }
                    return s
                }, t
            }();
            e.SelectedRegion = a
        },
        216: function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t() {
                    this._mouseDown = !1, this._eventsIds = []
                }
                return t.prototype.attach = function(t, e) {
                    var n = this,
                        i = t.getViewPort();
                    this._originPosition = window.getComputedStyle(i).display, this._restoreOriginPosition = function() {
                        i.style.position = n._originPosition
                    }, "static" === this._originPosition && (i.style.position = "relative");
                    var o = gantt.$services.getService("state");
                    o.registerProvider("clickDrag", function() {
                        return {
                            autoscroll: !1
                        }
                    });
                    var r = null;
                    this._eventsIds[this._eventsIds.length] = gantt.event(i, "mousedown", function(i) {
                        r = null, gantt.utils.dom.closest(i.target, ".gantt_task_line, .gantt_task_link") || (o.registerProvider("clickDrag", function() {
                            return {
                                autoscroll: n._mouseDown
                            }
                        }), e && !0 !== i[e] || (r = n._getCoordinates(i, t)))
                    }), this._eventsIds[this._eventsIds.length] = gantt.event(document.body, "mouseup", function(i) {
                        if (r = null, (!e || !0 === i[e]) && !0 === n._mouseDown) {
                            n._mouseDown = !1;
                            var o = n._getCoordinates(i, t);
                            t.dragEnd(o)
                        }
                    }), this._eventsIds[this._eventsIds.length] = gantt.event(i, "mousemove", function(i) {
                        if (!e || !0 === i[e]) {
                            var o = null;
                            if (!n._mouseDown && r) return o = n._getCoordinates(i, t), void(Math.abs(r.relative.left - o.relative.left) > 5 && r && (n._mouseDown = !0, t.setStart(r), t.setPosition(r), t.setEnd(r), r = null));
                            !0 === n._mouseDown && (o = n._getCoordinates(i, t), t.setEnd(o), t.render())
                        }
                    })
                }, t.prototype.detach = function() {
                    this._restoreOriginPosition(), this._eventsIds.forEach(function(t) {
                        gantt.eventRemove(t)
                    }), gantt.$services.getService("state").unregisterProvider("clickDrag")
                }, t.prototype.destructor = function() {
                    this.detach()
                }, t.prototype._getCoordinates = function(t, e) {
                    var n = e.getViewPort(),
                        i = n.getBoundingClientRect(),
                        o = t.clientX,
                        r = t.clientY;
                    return {
                        absolute: {
                            left: o,
                            top: r
                        },
                        relative: {
                            left: o - i.left + n.scrollLeft,
                            top: r - i.top + n.scrollTop
                        }
                    }
                }, t
            }();
            e.EventsManager = i
        },
        217: function(t, e, n) {
            "use strict";
            var i = this && this.__assign || function() {
                return (i = Object.assign || function(t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(216),
                r = n(215);
            gantt.ext || (gantt.ext = {});
            var a = {
                    className: "gantt_click_drag_rect",
                    useRequestAnimationFrame: !0,
                    callback: void 0,
                    singleRow: !1
                },
                s = new o.EventsManager;
            gantt.ext.clickDrag = s, gantt.attachEvent("onGanttReady", function() {
                var t = i({
                    viewPort: gantt.$task_data
                }, a);
                if (gantt.config.click_drag) {
                    var e = gantt.config.click_drag;
                    t.render = e.render || a.render, t.className = e.className || a.className, t.callback = e.callback || a.callback, t.viewPort = e.viewPort || gantt.$task_data, t.useRequestAnimationFrame = void 0 === e.useRequestAnimationFrame ? a.useRequestAnimationFrame : e.useRequestAnimationFrame, t.singleRow = void 0 === e.singleRow ? a.singleRow : e.singleRow;
                    var n = new r.SelectedRegion(t);
                    gantt.ext.clickDrag.attach(n, e.useKey)
                }
            }), gantt.attachEvent("onDestroy", function() {
                s.destructor()
            })
        },
        4: function(t, e) {
            var n = function() {
                this._connected = [], this._silent_mode = !1
            };
            n.prototype = {
                _silentStart: function() {
                    this._silent_mode = !0
                },
                _silentEnd: function() {
                    this._silent_mode = !1
                }
            };
            var i = function(t) {
                var e = [],
                    n = function() {
                        for (var n = !0, i = 0; i < e.length; i++)
                            if (e[i]) {
                                var o = e[i].apply(t, arguments);
                                n = n && o
                            } return n
                    };
                return n.addEvent = function(t) {
                    return "function" == typeof t && e.push(t) - 1
                }, n.removeEvent = function(t) {
                    e[t] = null
                }, n
            };
            t.exports = function(t) {
                var e = new n;
                t.attachEvent = function(t, n, o) {
                    return t = "ev_" + t.toLowerCase(), e[t] || (e[t] = i(o || this)), t + ":" + e[t].addEvent(n)
                }, t.attachAll = function(t, e) {
                    this.attachEvent("listen_all", t, e)
                }, t.callEvent = function(t, n, i) {
                    if (e._silent_mode) return !0;
                    var o = "ev_" + t.toLowerCase();
                    return e.ev_listen_all && e.ev_listen_all.apply(i || this, [t].concat(n)), !e[o] || e[o].apply(i || this, n)
                }, t.checkEvent = function(t) {
                    return !!e["ev_" + t.toLowerCase()]
                }, t.detachEvent = function(t) {
                    if (t) {
                        var n = t.split(":"),
                            i = n[0],
                            o = n[1];
                        e[i] && e[i].removeEvent(o)
                    }
                }, t.detachAllEvents = function() {
                    for (var t in e) 0 === t.indexOf("ev_") && delete e[t]
                }
            }
        }
    })
});
//# sourceMappingURL=dhtmlxgantt_click_drag.js.map
