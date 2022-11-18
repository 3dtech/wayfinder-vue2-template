if (Float32Array === undefined) {
    var Float32Array = function() {
        return [ 0, 0 ];
    };
}

if (typeof window !== "undefined") {
    window.requestAnimFrame = function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 16);
        };
    }();
    (function() {
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })();
    if (typeof String.prototype.format !== "function") {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != "undefined" ? args[number] : match;
            });
        };
    }
    window.log = function() {
        log.history = log.history || [];
        log.history.push(arguments);
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments));
        }
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}

window.console = window.console || {
    log: function() {},
    error: function() {}
};

var Class = function() {};

(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            }(name, prop[name]) : prop[name];
        }
        function Class() {
            if (!initializing && this.init) this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();

function ClassCallback(classScope, fnCallback) {
    return function() {
        return fnCallback.apply(classScope, arguments);
    };
}

var Callback = ClassCallback;

!function(a, b) {
    "use strict";
    function c() {
        d.READY || (s.determineEventTypes(), r.each(d.gestures, function(a) {
            u.register(a);
        }), s.onTouch(d.DOCUMENT, n, u.detect), s.onTouch(d.DOCUMENT, o, u.detect), d.READY = !0);
    }
    var d = function v(a, b) {
        return new v.Instance(a, b || {});
    };
    d.VERSION = "1.1.2", d.defaults = {
        behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    }, d.DOCUMENT = document, d.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, 
    d.HAS_TOUCHEVENTS = "ontouchstart" in a, d.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent), 
    d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && d.IS_MOBILE || d.HAS_POINTEREVENTS, d.CALCULATE_INTERVAL = 25;
    var e = {}, f = d.DIRECTION_DOWN = "down", g = d.DIRECTION_LEFT = "left", h = d.DIRECTION_UP = "up", i = d.DIRECTION_RIGHT = "right", j = d.POINTER_MOUSE = "mouse", k = d.POINTER_TOUCH = "touch", l = d.POINTER_PEN = "pen", m = d.EVENT_START = "start", n = d.EVENT_MOVE = "move", o = d.EVENT_END = "end", p = d.EVENT_RELEASE = "release", q = d.EVENT_TOUCH = "touch";
    d.READY = !1, d.plugins = d.plugins || {}, d.gestures = d.gestures || {};
    var r = d.utils = {
        extend: function(a, c, d) {
            for (var e in c) !c.hasOwnProperty(e) || a[e] !== b && d || (a[e] = c[e]);
            return a;
        },
        on: function(a, b, c) {
            a.addEventListener(b, c, !1);
        },
        off: function(a, b, c) {
            a.removeEventListener(b, c, !1);
        },
        each: function(a, c, d) {
            var e, f;
            if ("forEach" in a) a.forEach(c, d); else if (a.length !== b) {
                for (e = 0, f = a.length; f > e; e++) if (c.call(d, a[e], e, a) === !1) return;
            } else for (e in a) if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return;
        },
        inStr: function(a, b) {
            return a.indexOf(b) > -1;
        },
        inArray: function(a, b) {
            if (a.indexOf) {
                var c = a.indexOf(b);
                return -1 === c ? !1 : c;
            }
            for (var d = 0, e = a.length; e > d; d++) if (a[d] === b) return d;
            return !1;
        },
        toArray: function(a) {
            return Array.prototype.slice.call(a, 0);
        },
        hasParent: function(a, b) {
            for (;a; ) {
                if (a == b) return !0;
                a = a.parentNode;
            }
            return !1;
        },
        getCenter: function(a) {
            var b = [], c = [], d = [], e = [], f = Math.min, g = Math.max;
            return 1 === a.length ? {
                pageX: a[0].pageX,
                pageY: a[0].pageY,
                clientX: a[0].clientX,
                clientY: a[0].clientY
            } : (r.each(a, function(a) {
                b.push(a.pageX), c.push(a.pageY), d.push(a.clientX), e.push(a.clientY);
            }), {
                pageX: (f.apply(Math, b) + g.apply(Math, b)) / 2,
                pageY: (f.apply(Math, c) + g.apply(Math, c)) / 2,
                clientX: (f.apply(Math, d) + g.apply(Math, d)) / 2,
                clientY: (f.apply(Math, e) + g.apply(Math, e)) / 2
            });
        },
        getVelocity: function(a, b, c) {
            return {
                x: Math.abs(b / a) || 0,
                y: Math.abs(c / a) || 0
            };
        },
        getAngle: function(a, b) {
            var c = b.clientX - a.clientX, d = b.clientY - a.clientY;
            return 180 * Math.atan2(d, c) / Math.PI;
        },
        getDirection: function(a, b) {
            var c = Math.abs(a.clientX - b.clientX), d = Math.abs(a.clientY - b.clientY);
            return c >= d ? a.clientX - b.clientX > 0 ? g : i : a.clientY - b.clientY > 0 ? h : f;
        },
        getDistance: function(a, b) {
            var c = b.clientX - a.clientX, d = b.clientY - a.clientY;
            return Math.sqrt(c * c + d * d);
        },
        getScale: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1;
        },
        getRotation: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0;
        },
        isVertical: function(a) {
            return a == h || a == f;
        },
        setPrefixedCss: function(a, b, c, d) {
            var e = [ "", "Webkit", "Moz", "O", "ms" ];
            b = r.toCamelCase(b);
            for (var f = 0; f < e.length; f++) {
                var g = b;
                if (e[f] && (g = e[f] + g.slice(0, 1).toUpperCase() + g.slice(1)), g in a.style) {
                    a.style[g] = (null == d || d) && c || "";
                    break;
                }
            }
        },
        toggleBehavior: function(a, b, c) {
            if (b && a && a.style) {
                r.each(b, function(b, d) {
                    r.setPrefixedCss(a, d, b, c);
                });
                var d = c && function() {
                    return !1;
                };
                "none" == b.userSelect && (a.onselectstart = d), "none" == b.userDrag && (a.ondragstart = d);
            }
        },
        toCamelCase: function(a) {
            return a.replace(/[_-]([a-z])/g, function(a) {
                return a[1].toUpperCase();
            });
        }
    }, s = d.event = {
        preventMouseEvents: !1,
        started: !1,
        shouldDetect: !1,
        on: function(a, b, c, d) {
            var e = b.split(" ");
            r.each(e, function(b) {
                r.on(a, b, c), d && d(b);
            });
        },
        off: function(a, b, c, d) {
            var e = b.split(" ");
            r.each(e, function(b) {
                r.off(a, b, c), d && d(b);
            });
        },
        onTouch: function(a, b, c) {
            var f = this, g = function(e) {
                var g, h = e.type.toLowerCase(), i = d.HAS_POINTEREVENTS, j = r.inStr(h, "mouse");
                j && f.preventMouseEvents || (j && b == m && 0 === e.button ? (f.preventMouseEvents = !1, 
                f.shouldDetect = !0) : i && b == m ? f.shouldDetect = 1 === e.buttons : j || b != m || (f.preventMouseEvents = !0, 
                f.shouldDetect = !0), i && b != o && t.updatePointer(b, e), f.shouldDetect && (g = f.doDetect.call(f, e, b, a, c)), 
                g == o && (f.preventMouseEvents = !1, f.shouldDetect = !1, t.reset()), i && b == o && t.updatePointer(b, e));
            };
            return this.on(a, e[b], g), g;
        },
        doDetect: function(a, b, c, d) {
            var e = this.getTouchList(a, b), f = e.length, g = b, h = e.trigger, i = f;
            b == m ? h = q : b == o && (h = p, i = e.length - (a.changedTouches ? a.changedTouches.length : 1)), 
            i > 0 && this.started && (g = n), this.started = !0;
            var j = this.collectEventData(c, g, e, a);
            return b != o && d.call(u, j), h && (j.changedLength = i, j.eventType = h, d.call(u, j), 
            j.eventType = g, delete j.changedLength), g == o && (d.call(u, j), this.started = !1), 
            g;
        },
        determineEventTypes: function() {
            var b;
            return b = d.HAS_POINTEREVENTS ? a.PointerEvent ? [ "pointerdown", "pointermove", "pointerup pointercancel lostpointercapture" ] : [ "MSPointerDown", "MSPointerMove", "MSPointerUp MSPointerCancel MSLostPointerCapture" ] : d.NO_MOUSEEVENTS ? [ "touchstart", "touchmove", "touchend touchcancel" ] : [ "touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup" ], 
            e[m] = b[0], e[n] = b[1], e[o] = b[2], e;
        },
        getTouchList: function(a, b) {
            if (d.HAS_POINTEREVENTS) return t.getTouchList();
            if (a.touches) {
                if (b == n) return a.touches;
                var c = [], e = [].concat(r.toArray(a.touches), r.toArray(a.changedTouches)), f = [];
                return r.each(e, function(a) {
                    r.inArray(c, a.identifier) === !1 && f.push(a), c.push(a.identifier);
                }), f;
            }
            return a.identifier = 1, [ a ];
        },
        collectEventData: function(a, b, c, d) {
            var e = k;
            return r.inStr(d.type, "mouse") || t.matchType(j, d) ? e = j : t.matchType(l, d) && (e = l), 
            {
                center: r.getCenter(c),
                timeStamp: Date.now(),
                target: d.target,
                touches: c,
                eventType: b,
                pointerType: e,
                srcEvent: d,
                preventDefault: function() {
                    var a = this.srcEvent;
                    a.preventManipulation && a.preventManipulation(), a.preventDefault && a.preventDefault();
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation();
                },
                stopDetect: function() {
                    return u.stopDetect();
                }
            };
        }
    }, t = d.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var a = [];
            return r.each(this.pointers, function(b) {
                a.push(b);
            }), a;
        },
        updatePointer: function(a, b) {
            a == o || a != o && 1 !== b.buttons ? delete this.pointers[b.pointerId] : (b.identifier = b.pointerId, 
            this.pointers[b.pointerId] = b);
        },
        matchType: function(a, b) {
            if (!b.pointerType) return !1;
            var c = b.pointerType, d = {};
            return d[j] = c === (b.MSPOINTER_TYPE_MOUSE || j), d[k] = c === (b.MSPOINTER_TYPE_TOUCH || k), 
            d[l] = c === (b.MSPOINTER_TYPE_PEN || l), d[a];
        },
        reset: function() {
            this.pointers = {};
        }
    }, u = d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(a, b) {
            this.current || (this.stopped = !1, this.current = {
                inst: a,
                startEvent: r.extend({}, b),
                lastEvent: !1,
                lastCalcEvent: !1,
                futureCalcEvent: !1,
                lastCalcData: {},
                name: ""
            }, this.detect(b));
        },
        detect: function(a) {
            if (this.current && !this.stopped) {
                a = this.extendEventData(a);
                var b = this.current.inst, c = b.options;
                return r.each(this.gestures, function(d) {
                    return !this.stopped && b.enabled && c[d.name] && d.handler.call(d, a, b) === !1 ? (this.stopDetect(), 
                    !1) : void 0;
                }, this), this.current && (this.current.lastEvent = a), a.eventType == o && this.stopDetect(), 
                a;
            }
        },
        stopDetect: function() {
            this.previous = r.extend({}, this.current), this.current = null, this.stopped = !0;
        },
        getCalculatedData: function(a, b, c, e, f) {
            var g = this.current, h = !1, i = g.lastCalcEvent, j = g.lastCalcData;
            i && a.timeStamp - i.timeStamp > d.CALCULATE_INTERVAL && (b = i.center, c = a.timeStamp - i.timeStamp, 
            e = a.center.clientX - i.center.clientX, f = a.center.clientY - i.center.clientY, 
            h = !0), (a.eventType == q || a.eventType == p) && (g.futureCalcEvent = a), (!g.lastCalcEvent || h) && (j.velocity = r.getVelocity(c, e, f), 
            j.angle = r.getAngle(b, a.center), j.direction = r.getDirection(b, a.center), g.lastCalcEvent = g.futureCalcEvent || a, 
            g.futureCalcEvent = a), a.velocityX = j.velocity.x, a.velocityY = j.velocity.y, 
            a.interimAngle = j.angle, a.interimDirection = j.direction;
        },
        extendEventData: function(a) {
            var b = this.current, c = b.startEvent, d = b.lastEvent || c;
            (a.eventType == q || a.eventType == p) && (c.touches = [], r.each(a.touches, function(a) {
                c.touches.push({
                    clientX: a.clientX,
                    clientY: a.clientY
                });
            }));
            var e = a.timeStamp - c.timeStamp, f = a.center.clientX - c.center.clientX, g = a.center.clientY - c.center.clientY;
            return this.getCalculatedData(a, d.center, e, f, g), r.extend(a, {
                startEvent: c,
                deltaTime: e,
                deltaX: f,
                deltaY: g,
                distance: r.getDistance(c.center, a.center),
                angle: r.getAngle(c.center, a.center),
                direction: r.getDirection(c.center, a.center),
                scale: r.getScale(c.touches, a.touches),
                rotation: r.getRotation(c.touches, a.touches)
            }), a;
        },
        register: function(a) {
            var c = a.defaults || {};
            return c[a.name] === b && (c[a.name] = !0), r.extend(d.defaults, c, !0), a.index = a.index || 1e3, 
            this.gestures.push(a), this.gestures.sort(function(a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
            }), this.gestures;
        }
    };
    d.Instance = function(a, b) {
        var e = this;
        c(), this.element = a, this.enabled = !0, r.each(b, function(a, c) {
            delete b[c], b[r.toCamelCase(c)] = a;
        }), this.options = r.extend(r.extend({}, d.defaults), b || {}), this.options.behavior && r.toggleBehavior(this.element, this.options.behavior, !0), 
        this.eventStartHandler = s.onTouch(a, m, function(a) {
            e.enabled && a.eventType == m ? u.startDetect(e, a) : a.eventType == q && u.detect(a);
        }), this.eventHandlers = [];
    }, d.Instance.prototype = {
        on: function(a, b) {
            var c = this;
            return s.on(c.element, a, b, function(a) {
                c.eventHandlers.push({
                    gesture: a,
                    handler: b
                });
            }), c;
        },
        off: function(a, b) {
            var c = this;
            return s.off(c.element, a, b, function(a) {
                var d = r.inArray({
                    gesture: a,
                    handler: b
                });
                d !== !1 && c.eventHandlers.splice(d, 1);
            }), c;
        },
        trigger: function(a, b) {
            b || (b = {});
            var c = d.DOCUMENT.createEvent("Event");
            c.initEvent(a, !0, !0), c.gesture = b;
            var e = this.element;
            return r.hasParent(b.target, e) && (e = b.target), e.dispatchEvent(c), this;
        },
        enable: function(a) {
            return this.enabled = a, this;
        },
        dispose: function() {
            var a, b;
            for (r.toggleBehavior(this.element, this.options.behavior, !1), a = -1; b = this.eventHandlers[++a]; ) r.off(this.element, b.gesture, b.handler);
            return this.eventHandlers = [], s.off(this.element, e[m], this.eventStartHandler), 
            null;
        }
    }, function(a) {
        function b(b, d) {
            var e = u.current;
            if (!(d.options.dragMaxTouches > 0 && b.touches.length > d.options.dragMaxTouches)) switch (b.eventType) {
              case m:
                c = !1;
                break;

              case n:
                if (b.distance < d.options.dragMinDistance && e.name != a) return;
                var j = e.startEvent.center;
                if (e.name != a && (e.name = a, d.options.dragDistanceCorrection && b.distance > 0)) {
                    var k = Math.abs(d.options.dragMinDistance / b.distance);
                    j.pageX += b.deltaX * k, j.pageY += b.deltaY * k, j.clientX += b.deltaX * k, j.clientY += b.deltaY * k, 
                    b = u.extendEventData(b);
                }
                (e.lastEvent.dragLockToAxis || d.options.dragLockToAxis && d.options.dragLockMinDistance <= b.distance) && (b.dragLockToAxis = !0);
                var l = e.lastEvent.direction;
                b.dragLockToAxis && l !== b.direction && (b.direction = r.isVertical(l) ? b.deltaY < 0 ? h : f : b.deltaX < 0 ? g : i), 
                c || (d.trigger(a + "start", b), c = !0), d.trigger(a, b), d.trigger(a + b.direction, b);
                var q = r.isVertical(b.direction);
                (d.options.dragBlockVertical && q || d.options.dragBlockHorizontal && !q) && b.preventDefault();
                break;

              case p:
                c && b.changedLength <= d.options.dragMaxTouches && (d.trigger(a + "end", b), c = !1);
                break;

              case o:
                c = !1;
            }
        }
        var c = !1;
        d.gestures.Drag = {
            name: a,
            index: 50,
            handler: b,
            defaults: {
                dragMinDistance: 10,
                dragDistanceCorrection: !0,
                dragMaxTouches: 1,
                dragBlockHorizontal: !1,
                dragBlockVertical: !1,
                dragLockToAxis: !1,
                dragLockMinDistance: 25
            }
        };
    }("drag"), d.gestures.Gesture = {
        name: "gesture",
        index: 1337,
        handler: function(a, b) {
            b.trigger(this.name, a);
        }
    }, function(a) {
        function b(b, d) {
            var e = d.options, f = u.current;
            switch (b.eventType) {
              case m:
                clearTimeout(c), f.name = a, c = setTimeout(function() {
                    f && f.name == a && d.trigger(a, b);
                }, e.holdTimeout);
                break;

              case n:
                b.distance > e.holdThreshold && clearTimeout(c);
                break;

              case p:
                clearTimeout(c);
            }
        }
        var c;
        d.gestures.Hold = {
            name: a,
            index: 10,
            defaults: {
                holdTimeout: 500,
                holdThreshold: 2
            },
            handler: b
        };
    }("hold"), d.gestures.Release = {
        name: "release",
        index: 1 / 0,
        handler: function(a, b) {
            a.eventType == p && b.trigger(this.name, a);
        }
    }, d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipeMinTouches: 1,
            swipeMaxTouches: 1,
            swipeVelocityX: .6,
            swipeVelocityY: .6
        },
        handler: function(a, b) {
            if (a.eventType == p) {
                var c = a.touches.length, d = b.options;
                if (c < d.swipeMinTouches || c > d.swipeMaxTouches) return;
                (a.velocityX > d.swipeVelocityX || a.velocityY > d.swipeVelocityY) && (b.trigger(this.name, a), 
                b.trigger(this.name + a.direction, a));
            }
        }
    }, function(a) {
        function b(b, d) {
            var e, f, g = d.options, h = u.current, i = u.previous;
            switch (b.eventType) {
              case m:
                c = !1;
                break;

              case n:
                c = c || b.distance > g.tapMaxDistance;
                break;

              case o:
                "touchcancel" != b.srcEvent.type && b.deltaTime < g.tapMaxTime && !c && (e = i && i.lastEvent && b.timeStamp - i.lastEvent.timeStamp, 
                f = !1, i && i.name == a && e && e < g.doubleTapInterval && b.distance < g.doubleTapDistance && (d.trigger("doubletap", b), 
                f = !0), (!f || g.tapAlways) && (h.name = a, d.trigger(h.name, b)));
            }
        }
        var c = !1;
        d.gestures.Tap = {
            name: a,
            index: 100,
            handler: b,
            defaults: {
                tapMaxTime: 250,
                tapMaxDistance: 10,
                tapAlways: !0,
                doubleTapDistance: 20,
                doubleTapInterval: 300
            }
        };
    }("tap"), d.gestures.Touch = {
        name: "touch",
        index: -1 / 0,
        defaults: {
            preventDefault: !1,
            preventMouse: !1
        },
        handler: function(a, b) {
            return b.options.preventMouse && a.pointerType == j ? void a.stopDetect() : (b.options.preventDefault && a.preventDefault(), 
            void (a.eventType == q && b.trigger("touch", a)));
        }
    }, function(a) {
        function b(b, d) {
            switch (b.eventType) {
              case m:
                c = !1;
                break;

              case n:
                if (b.touches.length < 2) return;
                var e = Math.abs(1 - b.scale), f = Math.abs(b.rotation);
                if (e < d.options.transformMinScale && f < d.options.transformMinRotation) return;
                u.current.name = a, c || (d.trigger(a + "start", b), c = !0), d.trigger(a, b), f > d.options.transformMinRotation && d.trigger("rotate", b), 
                e > d.options.transformMinScale && (d.trigger("pinch", b), d.trigger("pinch" + (b.scale < 1 ? "in" : "out"), b));
                break;

              case p:
                c && b.changedLength < 2 && (d.trigger(a + "end", b), c = !1);
            }
        }
        var c = !1;
        d.gestures.Transform = {
            name: a,
            index: 45,
            defaults: {
                transformMinScale: .01,
                transformMinRotation: 1
            },
            handler: b
        };
    }("transform"), "function" == typeof define && define.amd ? define(function() {
        return d;
    }) : "undefined" != typeof module && module.exports ? module.exports = d : a.Hammer = d;
}(window);

(function() {
    "use strict";
    var shim = {};
    if (typeof exports === "undefined") {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            shim.exports = {};
            define(function() {
                return shim.exports;
            });
        } else {
            shim.exports = window;
        }
    } else {
        shim.exports = exports;
    }
    (function(exports) {
        if (typeof vec2 === "undefined") {
            var vec2 = {};
        }
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec2.create = function() {
            return new Float32Array(2);
        };
        vec2.clone = function(a) {
            var out = new Float32Array(2);
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        vec2.fromValues = function(x, y) {
            var out = new Float32Array(2);
            out[0] = x;
            out[1] = y;
            return out;
        };
        vec2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        vec2.set = function(out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };
        vec2.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };
        vec2.sub = vec2.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };
        vec2.mul = vec2.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };
        vec2.div = vec2.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };
        vec2.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };
        vec2.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };
        vec2.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };
        vec2.dist = vec2.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };
        vec2.sqrDist = vec2.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return x * x + y * y;
        };
        vec2.len = vec2.length = function(a) {
            var x = a[0], y = a[1];
            return Math.sqrt(x * x + y * y);
        };
        vec2.sqrLen = vec2.squaredLength = function(a) {
            var x = a[0], y = a[1];
            return x * x + y * y;
        };
        vec2.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };
        vec2.normalize = function(out, a) {
            var x = a[0], y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };
        vec2.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };
        vec2.cross = function(out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        };
        vec2.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };
        vec2.transformMat2 = function(out, a, m) {
            var x = a[0], y = a[1];
            out[0] = x * m[0] + y * m[1];
            out[1] = x * m[2] + y * m[3];
            return out;
        };
        vec2.forEach = function() {
            var vec = new Float32Array(2);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                }
                return a;
            };
        }();
        vec2.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec2 = vec2;
        }
        if (typeof vec3 === "undefined") {
            var vec3 = {};
        }
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec3.create = function() {
            return new Float32Array(3);
        };
        vec3.clone = function(a) {
            var out = new Float32Array(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };
        vec3.fromValues = function(x, y, z) {
            var out = new Float32Array(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };
        vec3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };
        vec3.set = function(out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };
        vec3.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out;
        };
        vec3.sub = vec3.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out;
        };
        vec3.mul = vec3.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        };
        vec3.div = vec3.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        };
        vec3.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        };
        vec3.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        };
        vec3.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        };
        vec3.dist = vec3.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        vec3.sqrDist = vec3.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
            return x * x + y * y + z * z;
        };
        vec3.len = vec3.length = function(a) {
            var x = a[0], y = a[1], z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        vec3.sqrLen = vec3.squaredLength = function(a) {
            var x = a[0], y = a[1], z = a[2];
            return x * x + y * y + z * z;
        };
        vec3.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };
        vec3.normalize = function(out, a) {
            var x = a[0], y = a[1], z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
            }
            return out;
        };
        vec3.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };
        vec3.cross = function(out, a, b) {
            var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        };
        vec3.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out;
        };
        vec3.transformMat4 = function(out, a, m) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return out;
        };
        vec3.transformQuat = function(out, a, q) {
            var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };
        vec3.forEach = function() {
            var vec = new Float32Array(3);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                }
                return a;
            };
        }();
        vec3.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec3 = vec3;
        }
        if (typeof vec4 === "undefined") {
            var vec4 = {};
        }
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec4.create = function() {
            return new Float32Array(4);
        };
        vec4.clone = function(a) {
            var out = new Float32Array(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        vec4.fromValues = function(x, y, z, w) {
            var out = new Float32Array(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };
        vec4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        vec4.set = function(out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };
        vec4.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };
        vec4.sub = vec4.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };
        vec4.mul = vec4.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        };
        vec4.div = vec4.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        };
        vec4.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        };
        vec4.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        };
        vec4.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };
        vec4.dist = vec4.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        vec4.sqrDist = vec4.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        };
        vec4.len = vec4.length = function(a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        vec4.sqrLen = vec4.squaredLength = function(a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            return x * x + y * y + z * z + w * w;
        };
        vec4.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        };
        vec4.normalize = function(out, a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len;
            }
            return out;
        };
        vec4.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        };
        vec4.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        };
        vec4.transformMat4 = function(out, a, m) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        };
        vec4.transformQuat = function(out, a, q) {
            var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };
        vec4.forEach = function() {
            var vec = new Float32Array(4);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                    a[i + 3] = vec[3];
                }
                return a;
            };
        }();
        vec4.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec4 = vec4;
        }
        if (typeof mat2 === "undefined") {
            var mat2 = {};
        }
        var mat2Identity = new Float32Array([ 1, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat2.create = function() {
            return new Float32Array(mat2Identity);
        };
        mat2.clone = function(a) {
            var out = new Float32Array(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        mat2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        mat2.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };
        mat2.transpose = function(out, a) {
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }
            return out;
        };
        mat2.invert = function(out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], det = a0 * a3 - a2 * a1;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;
            return out;
        };
        mat2.adjoint = function(out, a) {
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;
            return out;
        };
        mat2.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1];
        };
        mat2.mul = mat2.multiply = function(out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = a0 * b0 + a1 * b2;
            out[1] = a0 * b1 + a1 * b3;
            out[2] = a2 * b0 + a3 * b2;
            out[3] = a2 * b1 + a3 * b3;
            return out;
        };
        mat2.rotate = function(out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = a0 * c + a1 * s;
            out[1] = a0 * -s + a1 * c;
            out[2] = a2 * c + a3 * s;
            out[3] = a2 * -s + a3 * c;
            return out;
        };
        mat2.scale = function(out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v1;
            out[2] = a2 * v0;
            out[3] = a3 * v1;
            return out;
        };
        mat2.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat2 = mat2;
        }
        if (typeof mat3 === "undefined") {
            var mat3 = {};
        }
        var mat3Identity = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat3.create = function() {
            return new Float32Array(mat3Identity);
        };
        mat3.clone = function(a) {
            var out = new Float32Array(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        mat3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        mat3.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };
        mat3.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }
            return out;
        };
        mat3.invert = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20, det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };
        mat3.adjoint = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        };
        mat3.determinant = function(a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };
        mat3.mul = mat3.multiply = function(out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b00 = b[0], b01 = b[1], b02 = b[2], b10 = b[3], b11 = b[4], b12 = b[5], b20 = b[6], b21 = b[7], b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };
        mat3.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat3 = mat3;
        }
        if (typeof mat4 === "undefined") {
            var mat4 = {};
        }
        var mat4Identity = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat4.create = function() {
            return new Float32Array(mat4Identity);
        };
        mat4.clone = function(a) {
            var out = new Float32Array(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };
        mat4.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
            return out;
        };
        mat4.invert = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return out;
        };
        mat4.adjoint = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        };
        mat4.determinant = function(a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        };
        mat4.mul = mat4.multiply = function(out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        };
        mat4.translate = function(out, a, v) {
            var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            } else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
            return out;
        };
        mat4.scale = function(out, a, v) {
            var x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.rotate = function(out, a, rad, axis) {
            var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (Math.abs(len) < GLMAT_EPSILON) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };
        mat4.rotateX = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            if (a !== out) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        };
        mat4.rotateY = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            if (a !== out) {
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        };
        mat4.rotateZ = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            if (a !== out) {
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        };
        mat4.fromRotationTranslation = function(out, q, v) {
            var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        };
        mat4.frustum = function(out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left), tb = 1 / (top - bottom), nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        };
        mat4.perspective = function(out, fovy, aspect, near, far) {
            var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        };
        mat4.ortho = function(out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        };
        mat4.lookAt = function(out, eye, center, up) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
            if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out);
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;
            return out;
        };
        mat4.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat4 = mat4;
        }
        var quat = {};
        var quatIdentity = new Float32Array([ 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        quat.create = function() {
            return new Float32Array(quatIdentity);
        };
        quat.clone = vec4.clone;
        quat.fromValues = vec4.fromValues;
        quat.copy = vec4.copy;
        quat.set = vec4.set;
        quat.identity = function(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };
        quat.setAxisAngle = function(out, axis, rad) {
            rad = rad * .5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        };
        quat.add = vec4.add;
        quat.mul = quat.multiply = function(out, a, b) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        };
        quat.scale = vec4.scale;
        quat.rotateX = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        };
        quat.rotateY = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], by = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        };
        quat.rotateZ = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bz = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        };
        quat.calculateW = function(out, a) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = -Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
            return out;
        };
        quat.dot = vec4.dot;
        quat.lerp = vec4.lerp;
        quat.slerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = a[3];
            var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw, halfTheta, sinHalfTheta, ratioA, ratioB;
            if (Math.abs(cosHalfTheta) >= 1) {
                if (out !== a) {
                    out[0] = ax;
                    out[1] = ay;
                    out[2] = az;
                    out[3] = aw;
                }
                return out;
            }
            halfTheta = Math.acos(cosHalfTheta);
            sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
            if (Math.abs(sinHalfTheta) < .001) {
                out[0] = ax * .5 + bx * .5;
                out[1] = ay * .5 + by * .5;
                out[2] = az * .5 + bz * .5;
                out[3] = aw * .5 + bw * .5;
                return out;
            }
            ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
            out[0] = ax * ratioA + bx * ratioB;
            out[1] = ay * ratioA + by * ratioB;
            out[2] = az * ratioA + bz * ratioB;
            out[3] = aw * ratioA + bw * ratioB;
            return out;
        };
        quat.invert = function(out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3, invDot = dot ? 1 / dot : 0;
            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        };
        quat.conjugate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        };
        quat.len = quat.length = vec4.length;
        quat.sqrLen = quat.squaredLength = vec4.squaredLength;
        quat.normalize = vec4.normalize;
        quat.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.quat = quat;
        }
    })(shim.exports);
})();

var ArrayUtility = Class.extend({
    init: function(objectOrArray) {
        if (objectOrArray instanceof Object) {
            var object = objectOrArray;
            this.data = [];
            for (var i in object) {
                this.data.push(object[i]);
            }
        } else if (objectOrArray instanceof Array) {
            this.data = objectOrArray;
        } else throw "Argument objectOrArray must be an object or array";
    },
    get: function() {
        return this.data;
    },
    sort: function(callback) {
        var cb = function(a, b) {
            if (callback(a, b)) return 1;
            if (callback(b, a)) return -1;
            return 0;
        };
        this.data.sort(cb);
        return this.data;
    }
});

var Color = function(r, g, b, a) {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
    this.clone = function() {
        return new Color(this.r, this.g, this.b, this.a);
    };
    this.fromHex = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
        if (result) {
            this.r = parseInt(result[1], 16) / 255;
            this.g = parseInt(result[2], 16) / 255;
            this.b = parseInt(result[3], 16) / 255;
            if (result[4]) this.a = parseInt(result[4], 16) / 255;
        }
        return this;
    };
    this.toHex = function() {
        var componentToHex = function(v) {
            var h = v.toString(16);
            return h.length == 1 ? "0" + h : h;
        };
        return "#" + componentToHex(this.r * 255) + componentToHex(this.g * 255) + componentToHex(this.b * 255) + componentToHex(this.a * 255);
    };
    this.toString = function() {
        return "rgba(" + Math.floor(this.r * 255) + ", " + Math.floor(this.g * 255) + ", " + Math.floor(this.b * 255) + ", " + this.a + ")";
    };
    this.toVector = function() {
        return vec4.fromValues(this.r, this.g, this.b, this.a);
    };
    this.set = function(r, g, b, a) {
        if (typeof r == "number") this.r = r;
        if (typeof g == "number") this.g = g;
        if (typeof b == "number") this.b = b;
        if (typeof a == "number") this.a = a;
    };
    this.set(r, g, b, a);
};

function Rectangle(_x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.intersects = function(other) {
        return !(other.x > this.x + this.width || other.x + other.width < this.x || other.y > this.y + this.height || other.y + other.height < this.y);
    };
}

var WayfinderAPI = {
    LOCATION: "//api.3dwayfinder.com/",
    PROJECT: false,
    getJSON: function(url, callback) {
        Logistics.getJSON(url, callback).error(function(info) {
            if (console && console.log) console.log("Failed to get JSON: " + JSON.stringify(info));
        });
    },
    getURL: function(classname, method, args) {
        if (WayfinderAPI.PROJECT === false) throw "No project opened! Call WayfinderAPI.open(<project name>);";
        args = args || [];
        return [ WayfinderAPI.LOCATION, "public", WayfinderAPI.PROJECT, classname, method ].concat(args).join("/");
    },
    open: function(project) {
        WayfinderAPI.PROJECT = project;
    }
};

WayfinderAPI["2d"] = {};

WayfinderAPI["3d"] = {};

WayfinderAPI["access"] = {};

WayfinderAPI["advertisements"] = {};

WayfinderAPI["beacons"] = {};

WayfinderAPI["building"] = {};

WayfinderAPI["guitranslations"] = {};

WayfinderAPI["images"] = {};

WayfinderAPI["languages"] = {};

WayfinderAPI["lights"] = {};

WayfinderAPI["locationgroups"] = {};

WayfinderAPI["locations"] = {};

WayfinderAPI["materials"] = {};

WayfinderAPI["mobile"] = {};

WayfinderAPI["models"] = {};

WayfinderAPI["navigation"] = {};

WayfinderAPI["poisettings"] = {};

WayfinderAPI["svg"] = {};

WayfinderAPI["settings"] = {};

WayfinderAPI["statistics"] = {};

WayfinderAPI["templates"] = {};

WayfinderAPI["textures"] = {};

WayfinderAPI["2d"]["bundle"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "bundle", []), callback);
};

WayfinderAPI["2d"]["bundle"].url = function() {
    return WayfinderAPI.getURL("2d", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["edges"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "edges", []), callback);
};

WayfinderAPI["2d"]["edges"].url = function() {
    return WayfinderAPI.getURL("2d", "edges", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["getWatermark"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "getWatermark", []), callback);
};

WayfinderAPI["2d"]["getWatermark"].url = function() {
    return WayfinderAPI.getURL("2d", "getWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["image"] = function(level_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "image", [ level_id ]), callback);
};

WayfinderAPI["2d"]["image"].url = function(level_id) {
    return WayfinderAPI.getURL("2d", "image", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["lod"] = function(level_id, lod, x, y, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "lod", [ level_id, lod, x, y ]), callback);
};

WayfinderAPI["2d"]["lod"].url = function(level_id, lod, x, y) {
    return WayfinderAPI.getURL("2d", "lod", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["lodcount"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "lodcount", []), callback);
};

WayfinderAPI["2d"]["lodcount"].url = function() {
    return WayfinderAPI.getURL("2d", "lodcount", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["nodes"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "nodes", []), callback);
};

WayfinderAPI["2d"]["nodes"].url = function() {
    return WayfinderAPI.getURL("2d", "nodes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["overlays"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "overlays", []), callback);
};

WayfinderAPI["2d"]["overlays"].url = function() {
    return WayfinderAPI.getURL("2d", "overlays", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["pack"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "pack", []), callback);
};

WayfinderAPI["2d"]["pack"].url = function() {
    return WayfinderAPI.getURL("2d", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["getWatermark"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "getWatermark", []), callback);
};

WayfinderAPI["3d"]["getWatermark"].url = function() {
    return WayfinderAPI.getURL("3d", "getWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["pack"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "pack", []), callback);
};

WayfinderAPI["3d"]["pack"].url = function() {
    return WayfinderAPI.getURL("3d", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["scene"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "scene", []), callback);
};

WayfinderAPI["3d"]["scene"].url = function() {
    return WayfinderAPI.getURL("3d", "scene", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["access"]["hasWatermark"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("access", "hasWatermark", []), callback);
};

WayfinderAPI["access"]["hasWatermark"].url = function() {
    return WayfinderAPI.getURL("access", "hasWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["access"]["template"] = function(templateName, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("access", "template", [ templateName ]), callback);
};

WayfinderAPI["access"]["template"].url = function(templateName) {
    return WayfinderAPI.getURL("access", "template", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["all"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "all", []), callback);
};

WayfinderAPI["advertisements"]["all"].url = function() {
    return WayfinderAPI.getURL("advertisements", "all", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["data"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "data", [ id ]), callback);
};

WayfinderAPI["advertisements"]["data"].url = function(id) {
    return WayfinderAPI.getURL("advertisements", "data", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["frames"] = function(template_id, container_id, check_time, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "frames", [ template_id, container_id, check_time ]), callback);
};

WayfinderAPI["advertisements"]["frames"].url = function(template_id, container_id, check_time) {
    return WayfinderAPI.getURL("advertisements", "frames", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["beacons"]["getBeacon"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("beacons", "getBeacon", [ id ]), callback);
};

WayfinderAPI["beacons"]["getBeacon"].url = function(id) {
    return WayfinderAPI.getURL("beacons", "getBeacon", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["beacons"]["getBeacons"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("beacons", "getBeacons", []), callback);
};

WayfinderAPI["beacons"]["getBeacons"].url = function() {
    return WayfinderAPI.getURL("beacons", "getBeacons", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["levels"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "levels", []), callback);
};

WayfinderAPI["building"]["levels"].url = function() {
    return WayfinderAPI.getURL("building", "levels", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["location"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "location", []), callback);
};

WayfinderAPI["building"]["location"].url = function() {
    return WayfinderAPI.getURL("building", "location", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["pack"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "pack", []), callback);
};

WayfinderAPI["building"]["pack"].url = function() {
    return WayfinderAPI.getURL("building", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["guitranslations"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("guitranslations", "get", []), callback);
};

WayfinderAPI["guitranslations"]["get"].url = function() {
    return WayfinderAPI.getURL("guitranslations", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["checkImage"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "checkImage", [ id ]), callback);
};

WayfinderAPI["images"]["checkImage"].url = function(id) {
    return WayfinderAPI.getURL("images", "checkImage", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["get"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "get", [ id ]), callback);
};

WayfinderAPI["images"]["get"].url = function(id) {
    return WayfinderAPI.getURL("images", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["thumbnail"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "thumbnail", [ id ]), callback);
};

WayfinderAPI["images"]["thumbnail"].url = function(id) {
    return WayfinderAPI.getURL("images", "thumbnail", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["languages"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("languages", "get", []), callback);
};

WayfinderAPI["languages"]["get"].url = function() {
    return WayfinderAPI.getURL("languages", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["languages"]["translation"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("languages", "translation", [ id ]), callback);
};

WayfinderAPI["languages"]["translation"].url = function(id) {
    return WayfinderAPI.getURL("languages", "translation", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["lights"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("lights", "get", []), callback);
};

WayfinderAPI["lights"]["get"].url = function() {
    return WayfinderAPI.getURL("lights", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locationgroups"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locationgroups", "get", []), callback);
};

WayfinderAPI["locationgroups"]["get"].url = function() {
    return WayfinderAPI.getURL("locationgroups", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["byfloor"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "byfloor", []), callback);
};

WayfinderAPI["locations"]["byfloor"].url = function() {
    return WayfinderAPI.getURL("locations", "byfloor", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["bygroup"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "bygroup", []), callback);
};

WayfinderAPI["locations"]["bygroup"].url = function() {
    return WayfinderAPI.getURL("locations", "bygroup", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["bynode"] = function(node_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "bynode", [ node_id ]), callback);
};

WayfinderAPI["locations"]["bynode"].url = function(node_id) {
    return WayfinderAPI.getURL("locations", "bynode", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "get", []), callback);
};

WayfinderAPI["locations"]["get"].url = function() {
    return WayfinderAPI.getURL("locations", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["location"] = function(poi_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "location", [ poi_id ]), callback);
};

WayfinderAPI["locations"]["location"].url = function(poi_id) {
    return WayfinderAPI.getURL("locations", "location", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["tags"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "tags", []), callback);
};

WayfinderAPI["locations"]["tags"].url = function() {
    return WayfinderAPI.getURL("locations", "tags", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "get", []), callback);
};

WayfinderAPI["materials"]["get"].url = function() {
    return WayfinderAPI.getURL("materials", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["textureMaterialNames"] = function(names, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "textureMaterialNames", [ names ]), callback);
};

WayfinderAPI["materials"]["textureMaterialNames"].url = function(names) {
    return WayfinderAPI.getURL("materials", "textureMaterialNames", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["textures"] = function(materialName, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "textures", [ materialName ]), callback);
};

WayfinderAPI["materials"]["textures"].url = function(materialName) {
    return WayfinderAPI.getURL("materials", "textures", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["uniforms"] = function(materialName, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "uniforms", [ materialName ]), callback);
};

WayfinderAPI["materials"]["uniforms"].url = function(materialName) {
    return WayfinderAPI.getURL("materials", "uniforms", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["mobile"]["bundle"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("mobile", "bundle", []), callback);
};

WayfinderAPI["mobile"]["bundle"].url = function() {
    return WayfinderAPI.getURL("mobile", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["all"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "all", []), callback);
};

WayfinderAPI["models"]["all"].url = function() {
    return WayfinderAPI.getURL("models", "all", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["allmeshes"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "allmeshes", []), callback);
};

WayfinderAPI["models"]["allmeshes"].url = function() {
    return WayfinderAPI.getURL("models", "allmeshes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "get", []), callback);
};

WayfinderAPI["models"]["get"].url = function() {
    return WayfinderAPI.getURL("models", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["instances"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "instances", []), callback);
};

WayfinderAPI["models"]["instances"].url = function() {
    return WayfinderAPI.getURL("models", "instances", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["json"] = function(model_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "json", [ model_id ]), callback);
};

WayfinderAPI["models"]["json"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "json", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshes"] = function(model_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshes", [ model_id ]), callback);
};

WayfinderAPI["models"]["meshes"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "meshes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshesOfInstances"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshesOfInstances", []), callback);
};

WayfinderAPI["models"]["meshesOfInstances"].url = function() {
    return WayfinderAPI.getURL("models", "meshesOfInstances", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshesbyfloor"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshesbyfloor", []), callback);
};

WayfinderAPI["models"]["meshesbyfloor"].url = function() {
    return WayfinderAPI.getURL("models", "meshesbyfloor", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["model"] = function(model_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "model", [ model_id ]), callback);
};

WayfinderAPI["models"]["model"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "model", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["allAttributes"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "allAttributes", []), callback);
};

WayfinderAPI["navigation"]["allAttributes"].url = function() {
    return WayfinderAPI.getURL("navigation", "allAttributes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["attributes"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "attributes", [ id ]), callback);
};

WayfinderAPI["navigation"]["attributes"].url = function(id) {
    return WayfinderAPI.getURL("navigation", "attributes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["edges"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "edges", []), callback);
};

WayfinderAPI["navigation"]["edges"].url = function() {
    return WayfinderAPI.getURL("navigation", "edges", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["node"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "node", [ id ]), callback);
};

WayfinderAPI["navigation"]["node"].url = function(id) {
    return WayfinderAPI.getURL("navigation", "node", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["nodes"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "nodes", []), callback);
};

WayfinderAPI["navigation"]["nodes"].url = function() {
    return WayfinderAPI.getURL("navigation", "nodes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["nodesbytype"] = function(type, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "nodesbytype", [ type ]), callback);
};

WayfinderAPI["navigation"]["nodesbytype"].url = function(type) {
    return WayfinderAPI.getURL("navigation", "nodesbytype", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "get", []), callback);
};

WayfinderAPI["poisettings"]["get"].url = function() {
    return WayfinderAPI.getURL("poisettings", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getAllPOISettings"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getAllPOISettings", []), callback);
};

WayfinderAPI["poisettings"]["getAllPOISettings"].url = function() {
    return WayfinderAPI.getURL("poisettings", "getAllPOISettings", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getText"] = function(key, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getText", [ key ]), callback);
};

WayfinderAPI["poisettings"]["getText"].url = function(key) {
    return WayfinderAPI.getURL("poisettings", "getText", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getTexts"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getTexts", []), callback);
};

WayfinderAPI["poisettings"]["getTexts"].url = function() {
    return WayfinderAPI.getURL("poisettings", "getTexts", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["map"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "map", []), callback);
};

WayfinderAPI["poisettings"]["map"].url = function() {
    return WayfinderAPI.getURL("poisettings", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["setting"] = function(key, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "setting", [ key ]), callback);
};

WayfinderAPI["poisettings"]["setting"].url = function(key) {
    return WayfinderAPI.getURL("poisettings", "setting", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["svg"]["bundle"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("svg", "bundle", []), callback);
};

WayfinderAPI["svg"]["bundle"].url = function() {
    return WayfinderAPI.getURL("svg", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["svg"]["get"] = function(id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("svg", "get", [ id ]), callback);
};

WayfinderAPI["svg"]["get"].url = function(id) {
    return WayfinderAPI.getURL("svg", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["get"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "get", []), callback);
};

WayfinderAPI["settings"]["get"].url = function() {
    return WayfinderAPI.getURL("settings", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["getText"] = function(key, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "getText", [ key ]), callback);
};

WayfinderAPI["settings"]["getText"].url = function(key) {
    return WayfinderAPI.getURL("settings", "getText", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["getTexts"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "getTexts", []), callback);
};

WayfinderAPI["settings"]["getTexts"].url = function() {
    return WayfinderAPI.getURL("settings", "getTexts", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["map"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "map", []), callback);
};

WayfinderAPI["settings"]["map"].url = function() {
    return WayfinderAPI.getURL("settings", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["setting"] = function(key, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "setting", [ key ]), callback);
};

WayfinderAPI["settings"]["setting"].url = function(key) {
    return WayfinderAPI.getURL("settings", "setting", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["click"] = function(data, session_id, type, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "click", [ data, session_id, type ]), callback);
};

WayfinderAPI["statistics"]["click"].url = function(data, session_id, type) {
    return WayfinderAPI.getURL("statistics", "click", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["device"] = function(width, height, kiosk, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "device", [ width, height, kiosk ]), callback);
};

WayfinderAPI["statistics"]["device"].url = function(width, height, kiosk) {
    return WayfinderAPI.getURL("statistics", "device", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["endSession"] = function(session_id, language_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "endSession", [ session_id, language_id ]), callback);
};

WayfinderAPI["statistics"]["endSession"].url = function(session_id, language_id) {
    return WayfinderAPI.getURL("statistics", "endSession", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["search"] = function(data, session_id, type, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "search", [ data, session_id, type ]), callback);
};

WayfinderAPI["statistics"]["search"].url = function(data, session_id, type) {
    return WayfinderAPI.getURL("statistics", "search", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["startSession"] = function(language_id, kiosk, application, layout, device_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "startSession", [ language_id, kiosk, application, layout, device_id ]), callback);
};

WayfinderAPI["statistics"]["startSession"].url = function(language_id, kiosk, application, layout, device_id) {
    return WayfinderAPI.getURL("statistics", "startSession", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["templates"]["css"] = function(template_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("templates", "css", [ template_id ]), callback);
};

WayfinderAPI["templates"]["css"].url = function(template_id) {
    return WayfinderAPI.getURL("templates", "css", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["count"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "count", []), callback);
};

WayfinderAPI["textures"]["count"].url = function() {
    return WayfinderAPI.getURL("textures", "count", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["map"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "map", []), callback);
};

WayfinderAPI["textures"]["map"].url = function() {
    return WayfinderAPI.getURL("textures", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["mipmap"] = function(level, name, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "mipmap", [ level, name ]), callback);
};

WayfinderAPI["textures"]["mipmap"].url = function(level, name) {
    return WayfinderAPI.getURL("textures", "mipmap", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["names"] = function(callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "names", []), callback);
};

WayfinderAPI["textures"]["names"].url = function() {
    return WayfinderAPI.getURL("textures", "names", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["texture"] = function(name, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "texture", [ name ]), callback);
};

WayfinderAPI["textures"]["texture"].url = function(name) {
    return WayfinderAPI.getURL("textures", "texture", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["texturebyid"] = function(texture_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "texturebyid", [ texture_id ]), callback);
};

WayfinderAPI["textures"]["texturebyid"].url = function(texture_id) {
    return WayfinderAPI.getURL("textures", "texturebyid", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["thumbnail"] = function(name, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "thumbnail", [ name ]), callback);
};

WayfinderAPI["textures"]["thumbnail"].url = function(name) {
    return WayfinderAPI.getURL("textures", "thumbnail", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["thumbnailbyid"] = function(texture_id, callback) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "thumbnailbyid", [ texture_id ]), callback);
};

WayfinderAPI["textures"]["thumbnailbyid"].url = function(texture_id) {
    return WayfinderAPI.getURL("textures", "thumbnailbyid", Array.prototype.slice.call(arguments, 0));
};

var WayfinderOptions = Class.extend({
    init: function() {
        this.application = "wayfinder";
        this.map = "map";
        this.project = "demo";
        this.kiosk = false;
        this.debugLog = false;
        this.debugPOIs = false;
        this.debugTranslations = false;
        this.drawKioskIcon = true;
        this.apiLocation = "../../api/";
        this.language = "en";
        this.disablePathDrawing = false;
        this.searchScroreLimiter = 3;
        this.searchMinimumScrore = 10;
        this.filterPOIs = "";
        this.assetsLocation = "/shared/";
        this.pathDisplayInstructions = true;
        this.pathZoomPadding = 100;
        this.pathColor = "rgba(255,0,0,0.8)";
        this.pathPauseTime = 2e3;
        this.pathSpotRadius = 3;
        this.pathStride = 30;
        this.pathSpeed = 60;
        this.zoomPadding = 1.05;
        this.poiColor = "rgba(100,200,0,0.9)";
        this.poiRadius = 9;
        this.textureLOD = 0;
        this.debugTransparency = false;
        this.disableModelLoading = false;
        this.disableCollisionTrees = false;
        this.disableRendering = false;
        this.mapSize = [ 1024, 1024 ];
        this.forceFullMapUpdate = false;
        this.enableLOD = true;
        this.maxLOD = 2;
        this.enableUserLocation = true;
        this.overlayHighlightColor = "#ff0000dd";
        this.mapPadding = .1;
        this.enableUserYAHSetting = false;
        this.application = "2D";
        this.pathZoomIn = false;
        this.poi2DTitlePadding = 12;
        this.path2DMessageSize = 16;
        this.map2DRotation = 0;
        this.disableMap2DMovement = false;
        this.debug = false;
        this.debugBeacons = false;
        this.debugMouseLocation = false;
        this.upscale = 1;
        this.yahRotation = 0;
        this.poi2DTitleWeight = "normal";
        this.factory = new WayfinderFactory();
    },
    loadFromURL: function() {
        if (location.hash.length >= 2 && location.hash.indexOf("{") > -1) {
            var args = unescape(location.hash.substring(1)).split("#");
            if (args.length >= 1 && args[0].indexOf("{") > -1 && args[0].indexOf("}") > -1) {
                var options = JSON.parse(args[0]);
                for (var i in options) {
                    log("Overriding option: " + i + "=" + options[i]);
                    this[i] = options[i];
                    if (i === "kiosk") {
                        this["kiosk.default"] = options[i];
                    }
                }
            }
        } else if (location.search.length >= 2) {
            var options = unescape(location.search.substring(1)).split("&");
            console.log("location.search.1", options);
            if (options.length >= 1) {
                var option;
                for (var i in options) {
                    option = options[i].split("=");
                    if (option.length > 1) {
                        log("Overriding option: " + option[0] + "=" + option[1]);
                        this[option[0]] = option[1];
                        if (option[0] === "kiosk") {
                            this["kiosk.default"] = option[1];
                        }
                    }
                }
            }
        }
    }
});

var WF_DEBUG = false;

var Wayfinder = Class.extend({
    init: function(options, factory) {
        if (!options || !(options instanceof WayfinderOptions)) options = new WayfinderOptions();
        if (!factory) factory = new WayfinderFactory(this);
        this.factory = factory;
        this.setOptions(options);
        this.settings = new Settings();
        this.statistics = new WFStatistics(this);
        this.firstFinishedLoading = false;
        this.debugLog = false;
        this.kiosk = false;
        this.dataLoaded = false;
        if (options.debugLog && DebugLog && typeof DebugLog === "DebugLog") {
            this.debugLog = new DebugLog(options.debugLog);
        }
        Logistics.onStageProgress(ClassCallback(this, this.onStageProgress));
        Logistics.onProgress(ClassCallback(this, this.onProgress));
        this.languages = {};
        this.pois = {};
        this.poisArray = [];
        this.poiGroups = {};
        this.nodes = {};
        this.edges = {};
        this.attributes = {};
        this.poisettings = new Settings();
        this.poiAdvertisements = {};
        this.advertisements = {};
        this.translator = new Translator(this.options.language, {});
        this.building = null;
        this.firstLanguageChange = true;
        this.search = new WayfinderSearch(this);
        this.events = new WayfinderEvents(this);
        this.currentFloor = false;
        this.accessibility = "";
        this.maps = {};
        this.hasWatermark = true;
    },
    cbOnPOIClick: function(poi) {},
    cbOnDataLoaded: function() {},
    cbOnProgress: function(percentage) {},
    cbOnStageProgress: function(stage, percentage) {},
    cbOnLanguageChange: function(language) {},
    cbOnBeforeFloorChange: function(floor) {},
    cbOnFloorChange: function(floor) {},
    cbOnZoomChange: function(percentage) {},
    cbOnPathStep: function(steps, i) {},
    cbOnPathStart: function(endNode, poi) {},
    cbOnPathFinished: function(path) {},
    cbOnTouch: function(action, value) {},
    cbOnMapUpdate: function() {},
    cbOnMapReady: function() {},
    cbOnLocationChange: function(location) {},
    cbOnWebGLContextFail: function() {
        console.warn("cbOnWebGLContextFail has to be overridden");
    },
    finishedLoading: function(argument) {
        if (!this.firstFinishedLoading) {
            this.firstFinishedLoading = true;
            this.onDataLoaded();
        }
    },
    setOptions: function(options) {
        this.options = options;
        this.options.project = this.readProjectName();
        this.options.loadFromURL();
    },
    setStyle: function(template_id) {
        $("head").append('<link rel="stylesheet" type="text/css" href="{0}">'.format(WayfinderAPI.templates.css.url(template_id)));
    },
    open: function(project) {
        if (typeof project !== "undefined") {
            this.options.project = project;
        }
        WayfinderAPI.open(this.options.project);
        this.startLoading();
        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", ClassCallback(this, this.onVisibilityChange));
        }
        console.log("Open", this.options.project);
    },
    readProjectName: function() {
        if (typeof document !== "undefined") {
            var path = document.location.pathname;
            var folders = path.split("/");
            for (var i = 0; i < folders.length; i++) {
                if (folders[i] == "projects") {
                    if (folders.length > i + 1) {
                        return folders[i + 1];
                    }
                }
            }
        }
        return this.options.project;
    },
    getLayout: function() {
        if (typeof document !== "undefined") {
            var metas = document.getElementsByTagName("meta");
            for (var i in metas) {
                if (metas[i].name == "layout") return metas[i].content;
            }
            var path = document.location.pathname;
            var folders = path.split("/");
            for (var i = 0; i < folders.length; i++) {
                if (folders[i] == "projects") {
                    if (folders.length > i + 2) {
                        return folders[i + 2];
                    }
                }
            }
        }
        return "default";
    },
    log: function() {
        if (this.debugLog) {
            this.debugLog.logArray(this.log.arguments);
        }
    },
    getProject: function() {
        return this.options.project;
    },
    getAPILocation: function() {
        if (WayfinderAPI && WayfinderAPI.LOCATION) {
            return WayfinderAPI.LOCATION;
        } else {
            return this.options.apiLocation;
        }
    },
    setKiosk: function(node_id) {
        this.options.kiosk = node_id;
    },
    getKiosk: function() {
        return this.options.kiosk;
    },
    getKioskNode: function() {
        if (this.options.kiosk && this.options.kiosk in this.nodes) return this.nodes[this.options.kiosk];
        return false;
    },
    showPath: function(endNode, poi) {
        return this.logic.showPath(this.getKioskNode(), endNode, poi);
    },
    showKiosk: function() {
        return this.logic.showKiosk();
    },
    showFloor: function(floor, callback) {
        this.logic.showFloor(floor);
        if (typeof floor === "object") {
            this.building.setActiveFloors(floor);
        }
        console.log("showFloor", this.cbOnFloorChange, typeof this.cbOnFloorChange === "function");
        if (this.cbOnFloorChange && typeof this.cbOnFloorChange === "function") {
            this.cbOnFloorChange(floor);
        }
    },
    getLanguage: function() {
        return this.translator.getLanguage();
    },
    setLanguage: function(language) {
        this.translator.translate(language);
        if (typeof this.cbOnLanguageChange === "function") {
            this.cbOnLanguageChange(language);
            this.events.trigger("language-change", language);
        }
    },
    startLoading: function() {
        Logistics.getJSON(WayfinderAPI["building"].pack.url(), null, ClassCallback(this, this.onBundleData), {
            stage: "settings"
        });
    },
    onBundleData: function(response) {
        console.log("Wayfinder.onBundleData", response);
        var data = response.data;
        this.settings.data = data.settings;
        this.poisettings.data = data.poisettings;
        this.hasWatermark = data.hasWatermark;
        this.texts = data.texts;
        this.onSettings();
        if (data.guitranslations) {
            this.translator.setTranslations(data.guitranslations);
        }
        this.factory.createLanguages(data.languages);
        this.factory.createFloors(data.levels);
        this.factory.createLocations(data);
    },
    loadSecondaryResources: function() {
        var scope = this;
        function load() {
            scope.loadHiddenPOIIcons();
        }
        setTimeout(load, 1e3);
    },
    loadHiddenPOIIcons: function(data) {
        if (this.pois) {
            for (var i in this.pois) {
                if (this.pois[i].image_id && this.pois[i].image_id !== 0 && !this.pois[i].alwaysVisible) {
                    Logistics.getImage(WayfinderAPI.getURL("images", "thumbnail", [ this.pois[i].image_id ]), ClassCallback(this.pois[i], this.pois[i].setIcon));
                }
            }
        }
    },
    onAdvertisementsLoaded: function(response) {
        this.advertisements = response.data;
    },
    onSettings: function() {
        this.building = this.factory.createBuilding(this.settings.data);
        this.options.language = this.settings.get("language.default", this.options.language);
        this.setLanguage(this.options.language);
        if (this.options.kiosk === false) {
            this.setKiosk(this.settings.getInt("kiosk.default", 0));
        }
    },
    onFinishedLoading: function() {
        this.cbOnProgress(100);
        this.cbOnDataLoaded();
        var scope = this;
        setTimeout(function() {
            scope.statistics.start();
        }, 100);
    },
    createTranslations: function(translations) {
        if (this.translator && translations) {
            this.translator.setTranslations(translations["data"]);
        }
    },
    onProgress: function(progress) {
        if (typeof this.cbOnProgress === "function") this.cbOnProgress(progress);
    },
    onStageProgress: function(stage, progress) {
        if (typeof this.cbOnStageProgress === "function") {
            this.cbOnStageProgress(stage, progress);
        }
    },
    resize: function() {
        this.logic.resize();
    },
    onPOIClick: function(poi, position, event) {
        if (typeof this.cbOnPOIClick === "function") {
            this.cbOnPOIClick(poi, position, event);
        }
    },
    onZoomChange: function(zoom) {
        if (typeof this.cbOnZoomChange === "function") {
            this.cbOnZoomChange(zoom);
        }
    },
    setZoom: function(percentage) {},
    zoomIn: function() {},
    zoomOut: function() {},
    pathToText: function(path) {},
    textPathSimplification: function(path) {
        var simplePath = {};
        var shortDist = 30;
        var doNotUse = "generic portal kiosk landmark";
        simplePath.distance = 0;
        simplePath.steps = [];
        function getTurn(angle) {
            if (angle >= 45 && angle < 135) {
                return "right";
            } else if (angle >= 135 && angle < 225) {
                return "around";
            } else if (angle >= 225 && angle < 315) {
                return "left";
            }
            return false;
        }
        if (path && path.length > 0) {
            var turn = false;
            var turn2 = false;
            var startNode = path[path.length - 1].bNode;
            var lastDistance = 0;
            for (var i = 0; i < path.length; i++) {
                simplePath.distance += path[i].distance;
                lastDistance += path[i].distance;
                turn = getTurn(path[i].angle);
                if (path[i].type && path[i].type == "landmark") {
                    if (path[i].bNode && path[i].bNode.pois && path[i].bNode.pois.length > 0) simplePath.steps.push({
                        landmark: path[i].bNode.pois,
                        endNode: path[i].bNode,
                        startNode: startNode,
                        in: lastDistance
                    }); else if (path[i].aNode && path[i].aNode.pois && path[i].aNode.pois.length > 0) simplePath.steps.push({
                        landmark: path[i].aNode.pois,
                        endNode: path[i].aNode,
                        startNode: startNode,
                        in: lastDistance
                    });
                }
                if (turn) {
                    if (!(typeof path[i].type == "string" && doNotUse.indexOf(path[i].type) == -1)) {
                        if (lastDistance > 0) simplePath.steps.push({
                            walk: lastDistance / 100,
                            endNode: path[i].bNode,
                            startNode: startNode
                        });
                        simplePath.steps.push({
                            turn: turn,
                            endNode: path[i].bNode,
                            startNode: startNode,
                            in: lastDistance
                        });
                    }
                    startNode = path[i].bNode;
                    lastDistance = 0;
                }
                if (path[i].type && doNotUse.indexOf(path[i].type) == -1) {
                    if (i > 0 && i < path.length - 1 && path[i].type !== path[i + 1].type) {
                        if (lastDistance > 0) {
                            simplePath.steps.push({
                                walk: lastDistanc / 100,
                                endNode: path[i].bNode,
                                startNode: startNode
                            });
                        }
                        simplePath.steps.push({
                            use: path[i].type,
                            endNode: path[i].bNode,
                            startNode: startNode,
                            in: lastDistance
                        });
                        startNode = path[i].bNode;
                    }
                    lastDistance = 0;
                }
                if (path[i].go_to_floor) {
                    if (lastDistance > 0) {
                        simplePath.steps({
                            walk: lastDistance / 100,
                            endNode: path[i].bNode,
                            startNode: startNode
                        });
                    }
                    lastDistance = 0;
                    simplePath.steps.push({
                        go_to_floor: path[i].go_to_floor,
                        endNode: path[i].bNode,
                        startNode: startNode
                    });
                    startNode = path[i].bNode;
                }
            }
            if (lastDistance > 0) {
                simplePath.steps.push({
                    walk: lastDistance / 100,
                    endNode: path[path.length - 1].bNode,
                    startNode: startNode
                });
            }
        }
        return simplePath;
    },
    getPOIWithExternalId: function(id) {
        for (var i in this.pois) {
            if (this.pois[i].room_id == id) {
                return this.pois[i];
            }
        }
        return false;
    },
    getNearestPOI: function(source, pois) {},
    restoreDefaultState: function() {
        if (this.options.language) {
            this.setLanguage(this.options.language);
        }
        this.clearHighlights();
        this.showKiosk();
    },
    showScreensaver: function() {},
    hideScreensaver: function() {},
    setHighlights: function(pois) {},
    clearHighlights: function() {},
    setDisplaying: function(pois) {},
    clearDisplaying: function() {},
    onSetLanguage: function(language) {},
    getLanguages: function() {
        return this.languages;
    },
    getPOIs: function() {
        return this.pois;
    },
    getPOIsArray: function() {
        return this.poisArray;
    },
    getPOIGroups: function() {
        return this.poiGroups;
    },
    getNodes: function() {
        return this.nodes;
    },
    getEdges: function() {
        return this.edges;
    },
    clearPath: function() {},
    zoomOnPathSegment: function(startNode, endNode) {},
    getCurrentFloor: function() {
        return this.building.getCurrentFloor();
    },
    setCurrentFloor: function(floor) {
        return this.building.setCurrentFloor(floor);
    },
    findNearestNodeOnFloor: function(floor, position) {
        return this.logic.findNearestNodeOnFloor(floor, position);
    },
    getImageData: function() {
        return false;
    },
    createExtraMap: function(key, logic, canvas) {
        if (typeof logic === "function") {
            logic = new logic(this, key);
            this.maps[key] = {
                logic: logic,
                canvas: canvas,
                loaded: false
            };
            logic.initData();
            logic.loadMapData();
        } else {
            console.log("Logic", logic);
            throw new Error("Given logic is not a function");
        }
    },
    isMapInitialized: function(key) {
        return !!this.maps[key];
    },
    switchToMap: function(key) {
        if (this.maps[key]) {
            for (var i in this.maps) {
                if (typeof this.maps[i] === "object" && this.maps[i].logic) {
                    this.maps[i].logic.pause();
                }
            }
            this.logic = this.maps[key].logic;
            this.logic.run();
        } else {
            throw new Error("No such map inialized: " + key);
        }
    },
    isDataLoaded: function(type) {
        return !!this.loadedData[type];
    },
    run: function() {
        return this.logic.run();
    },
    pause: function() {
        return this.logic.pause();
    },
    update: function(fullUpdate) {
        return this.logic.update(fullUpdate);
    },
    getScreenPosition: function(poi) {
        return this.logic.getScreenPosition(poi);
    },
    switchCanvas: function(element) {
        this.logic.switchCanvas(element);
    },
    getNearestPOIs: function(source, pois, radius) {
        return this.logic.getNearestPOIs(source, pois, radius);
    }
});

var WayfinderFactory = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
    },
    createFloors: function(floors) {
        if (floors && this.wayfinder.building) {
            for (var i in floors) {
                if (typeof floors[i] === "object") {
                    this.wayfinder.building.addFloor(this.createFloor(floors[i], this.wayfinder.languages));
                }
            }
        }
    },
    createNodes: function(nodes) {
        if (nodes) {
            var defaultKiosk = this.wayfinder.settings.getInt("kiosk.default", 0);
            var floors = this.wayfinder.building.getFloors();
            for (var i = 0; i < nodes.length; i++) {
                var node = this.createNode(nodes[i]);
                if (!node) continue;
                this.wayfinder.nodes[nodes[i].id] = node;
                if (node.floor_id in floors) {
                    floors[node.floor_id].addNode(node);
                }
                if (nodes[i].id == defaultKiosk) {
                    this.wayfinder.kiosk = node;
                }
            }
        }
    },
    createAttributes: function(attributes) {
        if (attributes) {
            this.wayfinder.attributes = attributes;
        }
    },
    createPOIs: function(pois) {
        for (var i = 0; i < pois.length; i++) {
            var poi = this.createPOI(pois[i], this.wayfinder.languages);
            this.wayfinder.pois[pois[i].id] = poi;
            this.wayfinder.poisArray.push(poi);
            if (poi.node_id in this.wayfinder.nodes) {
                this.wayfinder.nodes[poi.node_id].addPOI(poi);
            }
            if (this.wayfinder.poisettings && this.wayfinder.poisettings.data && this.wayfinder.poisettings["data"][poi.id]) {
                poi.settings.data = this.wayfinder.poisettings["data"][poi.id];
            }
        }
    },
    createTags: function(tags) {
        if (tags) {
            for (var t in tags) {
                var tag = tags[t];
                var poi = this.wayfinder.pois[tag["poi_id"]];
                if (poi) {
                    poi.setTags(tag["tags"]);
                }
            }
        }
    },
    filterPOIs: function(tags) {
        if (tags && tags.length > 0) {
            var poi;
            var tag = "";
            for (var j in tags) {
                tag = tags[j].trim();
                if (tag && tag !== "") {
                    for (var i in this.wayfinder.pois) {
                        poi = this.wayfinder.pois[i];
                        poi.setShowInMenu(false);
                        if (poi.getTags().indexOf(tag) > -1) {
                            poi.setShowInMenu(true);
                            continue;
                        }
                    }
                }
            }
        }
    },
    createGroups: function(poiGroupsData, poisInGroupsData) {
        if (poisInGroupsData && poiGroupsData) {
            var poiGroup, poiGroupData;
            for (poiGroupData in poiGroupsData) {
                poiGroup = this.createPOIGroup(poiGroupsData[poiGroupData], this.wayfinder.languages);
                this.wayfinder.poiGroups[poiGroup.getID()] = poiGroup;
            }
            for (var poiGroupID in poisInGroupsData) {
                poiGroupData = poisInGroupsData[poiGroupID];
                for (var poiIndex in poiGroupData) {
                    var poi = this.wayfinder.pois[poiGroupData[poiIndex]];
                    poiGroup = this.wayfinder.poiGroups[poiGroupID];
                    if (poi && poiGroup) {
                        poiGroup.addPOI(poi);
                        poi.addGroup(poiGroup);
                    }
                }
            }
        }
    },
    createAdvertisements: function(poiAdsData) {
        if (poiAdsData) {
            for (var poiAdIndex in poiAdsData) {
                var poiAdData = poiAdsData[poiAdIndex];
                var poi = this.wayfinder.pois[poiAdData["poi_id"]];
                if (poi) {
                    var poiAd = this.createPOIAdvertisement(poi, poiAdData, this.wayfinder.languages);
                    this.wayfinder.poiAdvertisements[poiAdData["id"]] = poiAd;
                    poi.addAdvertisement(poiAd);
                }
            }
        }
    },
    addPOIsToFloor: function(floorPOIs) {
        for (var floor_id in floorPOIs) {
            var floors = this.wayfinder.building.getFloors();
            if (!(floor_id in floors)) continue;
            var floor = floors[floor_id];
            for (var i in floorPOIs[floor_id]) {
                if (!(floorPOIs[floor_id][i] in this.wayfinder.pois)) continue;
                floor.addPOI(this.wayfinder.pois[floorPOIs[floor_id][i]]);
            }
        }
    },
    createEdges: function(edges) {
        if (edges) {
            for (var node_id in edges) {
                if (!(node_id in this.wayfinder.nodes)) continue;
                for (var i in edges[node_id]) {
                    if (!(edges[node_id][i] in this.wayfinder.nodes)) continue;
                    this.wayfinder.nodes[node_id].addNeighbour(this.wayfinder.nodes[edges[node_id][i]]);
                }
            }
            this.wayfinder.edges = edges;
        }
    },
    createBuilding: function(data) {
        return new Building(data);
    },
    createFloor: function(floorData, languages) {
        return new Floor(floorData, languages);
    },
    createNode: function(data) {
        return new NavigationNode(data);
    },
    createPOI: function(data, languages) {
        return new POI(data, languages);
    },
    createPOIGroup: function(data, languages) {
        return new POIGroup(data, languages);
    },
    createPOIAdvertisement: function(poi, data, languages) {
        return new POIAdvertisement(poi, data, languages);
    },
    createLanguages: function(languages) {
        for (var name in languages) {
            this.wayfinder.languages[name] = new Language(languages[name]);
            if (name.toLowerCase() == this.wayfinder.options.language.toLowerCase()) {
                this.wayfinder.translator.language = name;
            }
        }
        this.wayfinder.translator.translate();
    },
    createLocations: function(data) {
        this.createNodes(data.navigation.nodes);
        this.createEdges(data.navigation.edges);
        this.createPOIs(data.locations.all);
        this.addPOIsToFloor(data.locations.byfloor);
        this.createGroups(data.locations.groups, data.locations.bygroup);
        this.createTags(data.locations.tags);
        if (this.wayfinder.options.filterPOIs) {
            this.filterPOIs(this.wayfinder.options.filterPOIs.trim().split(","));
        }
        this.wayfinder.advertisements = data.a;
        this.createAttributes(data.locations.attributes);
    }
});

var WayfinderSearch = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.searchParams = [];
        this.limit = 0;
        this.options = {
            maxSearchParams: 15,
            stringSearch: "relative",
            minimumScore: 1,
            splitKeywords: true,
            limit: Infinity,
            scoreLimit: 1.25,
            searchStringLength: 2,
            poi: {
                name: 1,
                description: .5,
                tags: 1,
                room_id: .5
            }
        };
        this.results = {};
        this.highScore = 0;
        this.scores = [];
        this.providers = {};
        this.setupProviders();
    },
    overrideOptions: function(options) {
        for (var i in options) {
            this.options[i] = options[i];
        }
    },
    setupProviders: function() {
        this.providers["poi"] = ClassCallback(this, this.POIsProvider);
    },
    clearResults: function() {
        this.results = {};
        this.highScore = 0;
        this.scores = [];
    },
    search: function(searchstring, _type, _options) {
        var type = "poi";
        this.clearResults();
        if (typeof _type == "string") type = _type;
        this.overrideOptions(_options);
        if (typeof searchstring !== "undefined" && searchstring.length >= this.options.searchStringLength) {
            searchstring = searchstring.trim().toLowerCase();
            if (this.options.splitKeywords) this.searchParams = searchstring.split(" "); else {
                this.searchParams.push(searchstring);
            }
            if (this.searchParams.length > this.options.maxSearchParams) {
                this.searchParams.splice(this.options.maxSearchParams, this.searchParams.length - this.options.maxSearchParams);
            }
            var foundPOIs = [];
            var pois = this.wayfinder.pois;
            var score = 0;
            for (var p = 0; p < this.searchParams.length; p++) {
                if (this.providers[type] && typeof this.providers[type] == "function") {
                    this.providers[type](this.searchParams[p], this.wayfinder);
                }
            }
        }
        return this.order(this.results, this.highScore, this.scores);
    },
    pushResult: function(score, key, obj) {
        if (score >= this.options.minimumScore) {
            score = parseFloat(parseFloat(score).toFixed(2));
            if (!this.results[score]) this.results[score] = {};
            if (this.scores.indexOf(score) == -1) this.scores.push(score);
            this.results[score][key] = obj;
            this.highScore = Math.max(this.highScore, score);
        }
    },
    POIsProvider: function(keyword, wayfinder) {
        var language = this.wayfinder.getLanguage();
        var scope = this;
        function searchPOI(poi, param) {
            var _score = 0;
            if (scope.options.poi.name && poi.getName(language)) {
                _score = scope.searchString(poi.getName(language), param, scope.options.poi.name);
            }
            if (scope.options.poi.description && poi.getDescription(language)) {
                _score = Math.max(_score, scope.searchString(poi.getDescription(language), param, scope.options.poi.description));
            }
            if (scope.options.poi.tags && poi.getTags()) {
                _score = Math.max(_score, scope.searchString(poi.getTags(), param, scope.options.poi.tags));
            }
            if (scope.options.poi.room_id && poi.getRoomId()) {
                _score = Math.max(_score, scope.searchString(poi.getRoomId(), param, scope.options.poi.room_id));
            }
            return _score;
        }
        var pois = wayfinder.pois;
        for (var i in pois) {
            if (pois[i].getShowInMenu()) {
                score = searchPOI(pois[i], keyword);
                this.pushResult(score, pois[i].getID(), pois[i]);
            }
        }
    },
    findWithChar: function(character) {
        var foundPOIs = [];
        var language = this.wayfinder.getLanguage();
        foundPOIs[0] = [];
        var pois = this.sortPOIs(this.wayfinder.pois);
        for (var i in pois) {
            if (pois[i].getShowInMenu() && pois[i].getName(language).charAt(0) == character) {
                foundPOIs[0].push(pois[i]);
            }
        }
    },
    searchString: function(string, keyword, scoreDown) {
        if (typeof string == "string" && typeof keyword == "string") {
            string = string.toLowerCase().trim();
            keyword = keyword.toLowerCase().trim();
            switch (this.options.stringSearch) {
              case "strict":
                return this.searchStringStrict(string, keyword, scoreDown);
                break;

              case "relative":
                return this.searchStringRelatively(string, keyword, scoreDown);

              default:
                return this.searchStringStrict(string, keyword, scoreDown);
            }
        }
        return 0;
    },
    searchStringStrict: function(string, keyword, scoreDown) {
        if (!(string && keyword)) {
            return 0;
        }
        var pos = keyword.indexOf(string);
        if (pos > -1) {
            pos = pos / string.length * 100;
            var len = keyword.length / string.length * 100;
            return (pos + len) / 2;
        } else {
            return 0;
        }
    },
    searchStringRelatively: function(string, keyword, scoreDown) {
        if (!(string && keyword)) {
            return 0;
        }
        var tokens = keyword.split("");
        var strings = string.split(/,\s*|\s/);
        var tokenIndex = 0, stringIndex = 0, matchWithHighlights = "", matchedPositions = [], score = -1;
        var lastFoundIndex = 0;
        if (!scoreDown) {
            scoreDown = 1;
        }
        function evaluate(matchedTokens, tokens, string) {
            var value;
            var maxSubArrayLength = 0;
            var currentLength = 0;
            var holesTotalLength = 0;
            var subArrayCount = 0;
            var lastToken = -1;
            for (var i = 0; i < matchedTokens.length; i++) {
                if (lastToken == matchedTokens[i] - 1) {
                    currentLength++;
                    maxSubArrayLength = Math.max(maxSubArrayLength, currentLength);
                } else {
                    holesTotalLength += matchedTokens[i] - lastToken - 1;
                    currentLength = 1;
                }
                lastToken = matchedTokens[i];
            }
            var score = maxSubArrayLength / string.length * 1.4;
            score += matchedTokens[0] === 0 ? 1 : 0;
            score += 1 - holesTotalLength / string.length;
            score += matchedTokens.length / tokens;
            score += maxSubArrayLength / tokens * 1.2;
            score += tokens > string.length ? 0 : matchedTokens.length / string.length * 1.3;
            score += tokens.length == string.length ? 1 : 0;
            return score * 10;
        }
        for (var i = 0; i < strings.length; i++) {
            string = strings[i];
            if (string.length > 1) {
                while (stringIndex < string.length) {
                    if (string[stringIndex] === tokens[tokenIndex]) {
                        lastFoundIndex = stringIndex;
                        matchedPositions.push(stringIndex);
                        tokenIndex++;
                        if (tokenIndex >= tokens.length) {
                            break;
                        }
                    } else if (stringIndex == string.length - 1 && tokenIndex < tokens.length) {
                        stringIndex = lastFoundIndex;
                        tokenIndex++;
                    }
                    stringIndex++;
                }
                if (matchedPositions.length > 0) {
                    score = Math.max(score, evaluate(matchedPositions, tokens.length, string));
                } else score = Math.max(score, -1);
                tokenIndex = 0;
                stringIndex = 0;
                matchedPositions.length = 0;
            }
        }
        score = Math.round(score * scoreDown);
        return score;
    },
    order: function(searchResult, highScore, scores) {
        if (!searchResult || searchResult.length == 0) return [];
        var sorted = [];
        var count = 0;
        var keys = scores.sort(function(a, b) {
            return a - b;
        }).reverse();
        var s;
        for (var i in keys) {
            s = keys[i];
            if (searchResult[s]) {
                var obj;
                for (var i in searchResult[s]) {
                    obj = searchResult[s][parseInt(i)];
                    if (highScore / s > this.options.scoreLimit && count > 0) {
                        return sorted;
                    }
                    sorted.push(obj);
                    count++;
                    if (this.options.limit > 0 && count > this.options.limit) {
                        return sorted;
                    }
                }
            }
        }
        return sorted;
    }
});

var WayfinderEvents = Class.extend({
    init: function() {
        this.events = {
            "map-click": [],
            "language-change": []
        };
    },
    listen: function(type, callback) {
        if (typeof this.events[type] !== "object") {
            this.events[type] = [];
        }
        this.events[type].push(callback);
    },
    trigger: function() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length > 0) {
            var type = args[0];
            args.shift();
            if (this.events[type]) {
                var fun;
                for (var i = 0, len = this.events[type].length; i < len; i++) {
                    fun = this.events[type][i];
                    if (typeof fun === "function") {
                        fun.apply(this, args);
                    }
                }
            }
        }
    }
});

var Building = Class.extend({
    init: function(settings, languages) {
        this.name = settings["building.name"];
        this.address = settings["building.address"];
        this.link = new Translations(settings["building.link"]);
        this.description = new Translations(settings["building.description"]);
        this.logoID = settings["building.logo"];
        this.backgroundID = settings["building.background"];
        this.floors = {};
        this.currentFloor = false;
    },
    addFloor: function(floor) {
        this.floors[floor.id] = floor;
    },
    removeFloor: function(floor) {
        delete this.floors[floor.id];
    },
    getFloors: function() {
        return this.floors;
    },
    getSortedFloors: function() {
        var sortedFloors = new ArrayUtility(this.floors);
        return sortedFloors.sort(function(a, b) {
            return a.index < b.index;
        });
    },
    setActiveFloors: function(floor) {
        if (typeof floor === "object") {
            var _floor;
            for (var i in this.floors) {
                _floor = this.floors[i];
                if (typeof _floor === "object" && _floor.setActive) {
                    _floor.setActive(false);
                }
            }
            floor.setActive(true);
            this.currentFloor = floor;
        }
    },
    getCurrentFloor: function() {
        return this.currentFloor;
    },
    setCurrentFloor: function(floor) {
        if (typeof floor === "object") {
            this.currentFloor = floor;
        }
    }
});

var Settings = Class.extend({
    init: function() {
        this.data = {};
    },
    has: function(key) {
        return key in this.data;
    },
    get: function(key, defaultValue, item) {
        if (item && item.settings["data"] && item.settings["data"][key]) {
            return item.settings["data"][key]["value"];
        }
        if (key in this.data) return this.data[key];
        return defaultValue;
    },
    getInt: function(key, defaultValue, item) {
        return parseInt(this.get(key, defaultValue, item));
    },
    getFloat: function(key, defaultValue, item) {
        return parseFloat(this.get(key, defaultValue, item));
    },
    getColor: function(key, defaultValue, item) {
        return new Color().fromHex(this.get(key, defaultValue, item));
    },
    getBoolean: function(key, defaultValue, item) {
        return this.get(key, defaultValue, item) === true;
    },
    getModel: function(key, defaultValue, item) {
        var val = this.getInt(key, 0, item);
        return val === 0 ? defaultValue : val;
    },
    set: function(key, value) {
        this.data[key] = value;
    },
    override: function(local) {
        for (var i in local) {
            this.data[i] = local[i];
        }
    }
});

var NavigationNode = Class.extend({
    init: function(nodeData) {
        this.id = nodeData.id;
        this.floor_id = nodeData.level_id;
        this.type = nodeData.type;
        this.position = vec3.fromValues(-parseFloat(nodeData.x), parseFloat(nodeData.y), parseFloat(nodeData.z));
        this.rotation = vec3.fromValues(parseFloat(nodeData.rotation_x), parseFloat(nodeData.rotation_y), parseFloat(nodeData.rotation_z));
        this.floor = false;
        this.pois = [];
        this.weight = 0;
        this.zoom = 0;
        this.position2d = vec2.create();
        this.neighbours = [];
        if (nodeData.weight) {
            this.weight = parseFloat(nodeData.weight);
        }
        if (nodeData.zoom) {
            this.zoom = parseFloat(nodeData.zoom);
        }
    },
    setFloor: function(floor) {
        if (floor instanceof Floor && floor.id == this.floor_id) this.floor = floor;
    },
    addPOI: function(poi) {
        if (poi instanceof POI && poi.node_id == this.id) {
            poi.setNode(this);
            this.pois.push(poi);
        }
    },
    getID: function() {
        return this.id;
    },
    getFloor: function() {
        return this.floor;
    },
    getPOIs: function() {
        return this.pois;
    },
    setPosition2D: function(x, y) {
        this.position2d = vec2.fromValues(parseFloat(x), parseFloat(y));
    },
    setWeight: function(weight) {
        this.weight = parseFloat(weight);
    },
    addNeighbour: function(node) {
        if (node instanceof NavigationNode) this.neighbours.push(node);
    }
});

var Floor = Class.extend({
    init: function(floorData, languages) {
        this.id = parseInt(floorData.id, 10);
        this.name_id = parseInt(floorData.name_id, 10);
        this.model_id = parseInt(floorData.model_id, 10);
        this.index = parseInt(floorData.index, 10);
        this.y = parseFloat(floorData.y, 10);
        this.lightmap_id = parseInt(floorData.lightmap_id, 10);
        this.showInMenu = parseInt(floorData.show_in_menu, 10) !== 0;
        this.names = new Translations();
        this.active = false;
        this.svg = floorData.svg;
        for (var language in languages) {
            this.names.set(language, floorData[language]);
        }
        this.pois = [];
        this.nodes = [];
        this.node3D = false;
        this.mapMeshPathToID = {};
        this.mapIDToMeshPath = {};
    },
    getID: function() {
        return this.id;
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    addPOI: function(poi) {
        if (poi instanceof POI) {
            poi.setFloor(this);
            this.pois.push(poi);
        }
    },
    addNode: function(node) {
        if (typeof node === "object" && node.floor_id == this.id) {
            node.setFloor(this);
            this.nodes.push(node);
        }
    },
    getPOIs: function() {
        return this.pois;
    },
    getNodes: function() {
        return this.nodes;
    },
    getShowInMenu: function() {
        return this.showInMenu;
    },
    setActive: function(_active) {
        this.active = _active;
    },
    getActive: function() {
        return this.active;
    },
    setMeshNames: function(idNameMap) {
        for (var meshID in idNameMap) {
            this.mapMeshPathToID[idNameMap[meshID]] = parseInt(meshID);
            this.mapIDToMeshPath[parseInt(meshID)] = idNameMap[meshID];
        }
    },
    getMeshIDByPath: function(path) {
        if (path in this.mapMeshPathToID) return this.mapMeshPathToID[path];
        return 0;
    },
    getMeshPathByID: function(mesh_id) {
        if (mesh_id in this.mapIDToMeshPath) return this.mapIDToMeshPath[mesh_id];
        return false;
    },
    showYAH: function() {
        if (!this.node3D) return;
        var yah = this.node3D.find("YAHLocation/YAH");
        if (!yah) return;
        yah.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.enable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.enable();
        });
    },
    hideYAH: function() {
        if (!this.node3D) return;
        var yah = this.node3D.find("YAHLocation/YAH");
        if (!yah) return;
        yah.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.disable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.disable();
        });
    }
});

var POI = Class.extend({
    init: function(poiData, languages) {
        this.id = parseInt(poiData.id);
        this.type = poiData.type;
        this.node_id = parseInt(poiData.node_id);
        this.mesh_id = parseInt(poiData.mesh_id);
        this.room_id = poiData.room_id;
        this.image_id = parseInt(poiData.image_id);
        this.icon = null;
        this.background_id = parseInt(poiData.background_id);
        this.background = null;
        this.showInMenu = parseInt(poiData.show_in_menu) != 0;
        this.alwaysVisible = parseInt(poiData.always_visible) != 0;
        this.mesh_name = poiData.mesh_name;
        this.settings = {};
        this.names = new Translations();
        this.descriptions = new Translations();
        this.hasName = false;
        for (var language in languages) {
            this.names.set(language, poiData["names_" + language]);
            this.descriptions.set(language, poiData["descriptions_" + language]);
            if (this.names.get(language).length > 0) this.hasName = true;
        }
        this.floor = false;
        this.node = false;
        this.groups = [];
        this.advertisements = [];
        this.groupNames = {};
        this.tags = "";
        this.object = false;
        this.visible = false;
        this.meshNode = false;
        this.submesh = false;
        this.canvasBoard = false;
        this.geometryCreated = false;
        this.engine;
        this.wayfinder;
    },
    getID: function() {
        return this.id;
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    getDescription: function(language) {
        return this.descriptions.get(language);
    },
    getDescriptions: function() {
        return this.descriptions;
    },
    getShowInMenu: function() {
        return this.showInMenu && this.hasName;
    },
    setShowInMenu: function(value) {
        this.showInMenu = value;
    },
    setFloor: function(floor) {
        if (floor instanceof Floor) this.floor = floor;
    },
    getFloor: function() {
        return this.floor;
    },
    setNode: function(node) {
        if (typeof node === "object") {
            this.node = node;
        }
        if (this.object && this.node) {
            mat4.fromTranslation(this.object.transform.relative, this.node.position);
        }
    },
    getNode: function() {
        return this.node;
    },
    addGroup: function(group) {
        this.groups.push(group);
    },
    getGroups: function() {
        return this.groups;
    },
    getGroupNames: function() {
        if (this.groupNames[language]) return this.groupNames[language];
        var result = {};
        for (var groupID in this.groups) {
            if (typeof this.groups[groupID] === "object") {
                var translations = this.groups[groupID].getNames();
                for (var language in translations.getAll()) {
                    if (!result[language]) result[language] = [];
                    result[language].push(translations.get(language));
                }
            }
        }
        this.groupNames[language] = result;
        return result;
    },
    addAdvertisement: function(advertisement) {
        this.advertisements.push(advertisement);
    },
    getAdvertisements: function() {
        return this.advertisements;
    },
    getTags: function() {
        return this.tags;
    },
    setTags: function(tag) {
        this.tags = tag;
    },
    setIcon: function(image) {
        this.icon = image;
    },
    getIcon: function() {
        return this.icon;
    },
    setBackground: function(image) {
        this.background = image;
    },
    getBackground: function() {
        return this.background;
    },
    getRoomId: function() {
        return this.room_id;
    },
    isAlwaysVisible: function() {
        return this.alwaysVisible;
    },
    show: function(duration) {
        if (!this.object) return;
        if (!this.geometryCreated) this.createActualGeometry(true);
        var scope = this;
        this.visible = true;
        this.object.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.enable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.enable();
            var distancescaling = subnode.getComponent(DistanceScalingComponent);
            if (distancescaling) distancescaling.enable();
        });
    },
    hide: function() {
        if (!this.object) return;
        this.visible = false;
        this.object.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.disable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.disable();
            var distancescaling = subnode.getComponent(DistanceScalingComponent);
            if (distancescaling) distancescaling.disable();
        });
    },
    highlight: function() {
        if (!this.object) return;
        if (!this.geometryCreated) this.createActualGeometry(true);
        this.object.onEachChildComponent(function(c) {
            if (c instanceof POIComponent) {
                c.startHighlight();
            }
        });
    },
    stopHighlight: function() {
        if (!this.object) return;
        this.object.onEachChildComponent(function(c) {
            if (c instanceof POIComponent) {
                c.stopHighlight();
            }
        });
    },
    dehighlight: function() {
        if (!this.object) return;
        this.object.onEachChildComponent(function(c) {
            if (c instanceof POIComponent) {
                c.dehighlight();
            }
        });
    },
    startAnimating: function() {
        if (!this.object) return;
        if (!this.geometryCreated) this.createActualGeometry();
        this.object.onEachChild(function(subnode) {
            var animation = subnode.getComponent(AnimationComponent);
            if (animation) animation.startAnimating();
        });
    },
    setAnimation: function(lowestPosition, higestPosition, animationSpeed) {
        if (!this.object) return;
        this.object.onEachChild(function(subnode) {
            var animation = subnode.getComponent(AnimationComponent);
            if (animation) {
                if (lowestPosition) animation.setLowestPosition(lowestPosition);
                if (higestPosition) animation.setHighestPosition(higestPosition);
                if (animationSpeed) animation.setAnimationSpeed(animationSpeed);
            }
        });
    },
    stopAnimating: function() {
        if (!this.object) return;
        this.object.onEachChild(function(subnode) {
            var animation = subnode.getComponent(AnimationComponent);
            if (animation) animation.finishAnimating();
        });
    },
    createGeometry: function(engine, wayfinder) {
        this.engine = engine;
        this.wayfinder = wayfinder;
        this.object = new Node("POILocation");
        if (this.alwaysVisible) {
            this.createActualGeometry();
        }
    },
    createActualGeometry: function(triggerOnStart) {
        var disableBillboard = this.wayfinder.settings.getBoolean("poi.3d.billboard", false, this);
        var billboardClickable = this.wayfinder.settings.getBoolean("poi.3d.billboard-clickable", true, this);
        var heightFromFloor = this.wayfinder.settings.getBoolean("poi.3d.height-from-floor-enabled", true, this);
        var heightFromFloor = this.wayfinder.settings.getBoolean("poi.3d.height-from-floor-enabled", true, this);
        var wrap = this.wayfinder.settings.getInt("poi.text.wrap", -1, this);
        var canvasBoard = this.wayfinder.settings.getBoolean("poi.3d.enable-canvas-board", false, this);
        var showOnlyName = this.wayfinder.settings.getBoolean("poi.map.only-text", false, this);
        if (this.mesh_id == 0) disableBillboard = false;
        var options = {
            billboardClickable: billboardClickable,
            heightFromFloor: heightFromFloor,
            disableBillboard: disableBillboard,
            wordWrap: wrap
        };
        if (canvasBoard) this.createCanvasBoard(this.engine, this.wayfinder, options); else if (this.image_id > 0 && !showOnlyName) this.createIconGeometry(this.engine, this.wayfinder, options); else this.createNameGeometry(this.engine, this.wayfinder, options);
        this.geometryCreated = true;
        this.applySettings(this.wayfinder.settings, triggerOnStart);
    },
    createIconGeometry: function(engine, wayfinder, options) {
        var imageDescriptor = new TextureDescriptor(this.image_id);
        imageDescriptor.loadAsImage = true;
        var material = new Material(engine.assetsManager.addShaderSource("Transparent"), {
            diffuse: new UniformColor(new Color())
        }, [ new Sampler("diffuse0", engine.assetsManager.texturesManager.addDescriptor(imageDescriptor)) ]);
        engine.assetsManager.texturesManager.load(function() {});
        material.name = "POI_icon_" + this.getID();
        material.shader.requirements.transparent = true;
        var poiObject = Primitives.plane(1, 1, material);
        poiObject.name = "POI";
        var meshRendererComponent = poiObject.getComponent(MeshRendererComponent);
        meshRendererComponent.disable();
        meshRendererComponent.castShadows = false;
        meshRendererComponent.lightContribution = 0;
        if (options.billboardClickable) poiObject.addComponent(new MeshCollider());
        if (!options.disableBillboard) poiObject.addComponent(new Billboard(engine.scene.camera, true));
        poiObject.addComponent(new DistanceScalingComponent(engine.scene.camera));
        poiObject.addComponent(new AnimationComponent());
        var poiComponent = new POIComponent(this, wayfinder.getKioskNode());
        poiComponent.heightFromFloor = options.heightFromFloor;
        poiObject.addComponent(poiComponent);
        poiObject.layer = Layers.POI;
        mat4.fromTranslation(this.object.transform.relative, this.node.position);
        this.object.addNode(poiObject);
    },
    createNameGeometry: function(engine, wayfinder, options) {
        var poiText = Primitives.text(this.getName(wayfinder.translator.getLanguage()), options.wordWrap);
        if (options.billboardClickable) poiText.addComponent(new MeshCollider());
        var poiComponent = new POIComponent(this, wayfinder.getKioskNode());
        poiComponent.heightFromFloor = options.heightFromFloor;
        poiText.addComponent(poiComponent);
        poiText.addComponent(new DistanceScalingComponent(engine.scene.camera));
        if (!options.disableBillboard) poiText.addComponent(new Billboard(engine.scene.camera, true));
        poiText.addComponent(new AnimationComponent());
        poiText.getComponent(TextRendererComponent).castShadows = false;
        poiText.getComponent(TextRendererComponent).lightContribution = 0;
        poiText.getComponent(TextRendererComponent).disable();
        poiText.layer = Layers.POI;
        var textComponent = poiText.getComponent(TextComponent);
        textComponent.family = "Tahoma, Geneva, sans-serif";
        textComponent.color.set(1, 1, 1, 1);
        textComponent.outlineColor.set(0, 0, 0, 1);
        mat4.fromTranslation(this.object.transform.relative, this.node.position);
        this.object.addNode(poiText);
    },
    createCanvasBoard: function(engine, wayfinder, options) {
        this.canvasBoard = Primitives.canvasBoard(256, 256);
        this.canvasBoard.name = "POI";
        if (options.billboardClickable) this.canvasBoard.addComponent(new MeshCollider());
        var poiComponent = new POIComponent(this, wayfinder.getKioskNode());
        poiComponent.heightFromFloor = options.heightFromFloor;
        this.canvasBoard.addComponent(poiComponent);
        this.canvasBoard.addComponent(new DistanceScalingComponent(engine.scene.camera));
        if (!options.disableBillboard) this.canvasBoard.addComponent(new Billboard(engine.scene.camera, true));
        this.canvasBoard.addComponent(new AnimationComponent());
        this.canvasBoard.getComponent(CanvasBoardRendererComponent).castShadows = false;
        this.canvasBoard.getComponent(CanvasBoardRendererComponent).lightContribution = 0;
        this.canvasBoard.getComponent(CanvasBoardRendererComponent).disable();
        this.canvasBoard.layer = Layers.POI;
        mat4.fromTranslation(this.object.transform.relative, this.node.position);
        this.object.addNode(this.canvasBoard);
    },
    getCanvasBoard: function() {
        if (this.canvasBoard) return this.canvasBoard.getComponent(CanvasBoardComponent); else return false;
    },
    createPOISignOnMeshGeometry: function(engine, wayfinder) {
        var poiText = Primitives.text(this.getName(wayfinder.translator.getLanguage()));
        var lineNode = new Node("DebugLine");
        var l = lineNode.addComponent(new LineRendererComponent(new Color(1, 0, 1, 1)));
        l.overlay = true;
        poiText.addComponent(new POIComponent(this, wayfinder.getKioskNode(), l));
        poiText.getComponent(TextRendererComponent).castShadows = false;
        poiText.getComponent(TextRendererComponent).lightContribution = 0;
        poiText.getComponent(TextRendererComponent).disable();
        var textComponent = poiText.getComponent(TextComponent);
        textComponent.family = "Tahoma, Geneva, sans-serif";
        textComponent.color.set(1, 1, 1, 1);
        textComponent.outlineColor.set(0, 0, 0, 1);
        this.object = new Node("POILocation");
        mat4.fromTranslation(this.object.transform.relative, this.node.position);
        this.object.addNode(poiText);
        mat4.fromTranslation(lineNode.transform.relative, vec3.fromValues(-this.node.position[0], 0, -this.node.position[2]));
        this.object.addNode(lineNode);
    },
    linkMesh: function() {
        if (this.mesh_id === 0 || !this.object || !this.floor || !this.floor.node3D) return;
        var poiController = this.object.find("/POIController").getComponent(POIController);
        var info = poiController.getMeshInfoByID(this.mesh_id);
        if (info === false) return;
        var parts = info.path.split("/");
        if (parts.length < 2) return;
        var meshName = parseInt(parts.pop().substring(5));
        var path = parts.join("/");
        if (meshName < 0) return;
        this.meshNode = info.floor.node3D.find(path);
        if (!this.meshNode) {
            if (info.floor.node3D.subnodes.length > 0) {
                for (var i = 0; i < info.floor.node3D.subnodes.length; i++) {
                    this.meshNode = info.floor.node3D.subnodes[i].find(parts[1]);
                    if (this.meshNode) break;
                }
                if (!this.meshNode) return;
            } else {
                return;
            }
        }
        var meshComponent = this.meshNode.getComponent(MeshComponent);
        if (!meshComponent) return;
        if (meshName < meshComponent.mesh.submeshes.length) this.submesh = meshComponent.mesh.submeshes[meshName];
        if (this.setDistanceScalingByMesh) {
            this.object.onEachChildComponent(function(c) {
                if (c instanceof DistanceScalingComponent) {
                    c.maxScale = Math.min(meshComponent.mesh.boundingSphere.radius / 2, c.maxScale);
                }
            });
        }
    },
    applySettings: function(settings, triggerOnStart) {
        if (!this.object) return;
        var me = this;
        this.object.onEachChildComponent(function(c) {
            if (c instanceof POIComponent) {
                c.offsetY = settings.getFloat("poi.3d.offset", 0, me);
                c.width = settings.getFloat("poi.width", 1, me);
                c.height = settings.getFloat("poi.height", 1, me);
                c.highlightColors[0] = settings.getColor("poi.highlight.color1", "#ff0000ff", me).toVector();
                c.highlightColors[1] = settings.getColor("poi.highlight.color2", "#0000ffff", me).toVector();
                c.dehighlightColor = settings.getColor("poi.dehighlight.color", "#888888ff", me).toVector();
                c.highlightDuration = settings.getFloat("poi.highlight.duration", 5, me);
                c.highlightSpeed = settings.getFloat("poi.highlight.speed", 1, me);
                c.textSize = settings.getFloat("poi.text.size", 1, me);
                c.textColor = settings.getColor("poi.text.color", "#FFFFFF", me);
                c.outline = settings.getBoolean("poi.text.outline", false, me);
                c.outlineColor = settings.getColor("poi.text.outline-color", "#000000", me);
                c.outlineWidth = settings.getInt("poi.text.outline-width", 5, me);
                c.backgroundColor = settings.getColor("poi.text.background-color", "#00000000", me);
                c.disableBillboard = settings.getBoolean("poi.3d.billboard", false, me);
                c.billboardClickable = settings.getBoolean("poi.3d.billboard-clickable", me);
                if (settings.getBoolean("poi.3d.meshgroupcolor", false, me)) {
                    if (me.groups.length > 0 && me.groups[0]) {
                        var group = me.groups[0];
                        c.groupColor = group.getColor().toVector();
                    }
                }
                if (triggerOnStart) {
                    c.onStart();
                }
            } else if (c instanceof DistanceScalingComponent) {
                c.doingIt = settings.getBoolean("poi.distancescaling.enabled", false, me);
                c.maxScale = settings.getFloat("poi.distancescaling.maxscale", 15, me);
                if (settings.getBoolean("poi.distancescaling.mesh", false, me)) {
                    me.setDistanceScalingByMesh = true;
                }
            } else if (c instanceof AnimationComponent) {
                if (!settings.getBoolean("path.animation.poi", false, me)) c.disable();
            }
        });
    }
});

var POIAdvertisement = Class.extend({
    init: function(poi, adData, languages) {
        this.id = adData.id;
        this.image_id = adData.image_id;
        this.text1 = {};
        this.text2 = {};
        this.link = {};
        this.poi = poi;
        for (var language in languages) {
            this.link[language] = adData["link_" + language];
            if (adData["text1_" + language]) this.text1[language] = adData["text1_" + language]; else this.text1[language] = adData["menu_" + language];
            if (adData["text2_" + language]) this.text2[language] = adData["text2_" + language]; else this.text2[language] = adData["3d_" + language];
        }
    },
    getID: function() {
        return this.id;
    },
    getPOI: function() {
        return this.poi;
    },
    getText1: function(language) {
        if (language in this.text1) return this.text1[language];
        return false;
    },
    getText2: function(language) {
        if (language in this.text2) return this.text2[language];
        return false;
    },
    getLink: function(language) {
        if (language in this.link) return this.link[language];
        return false;
    }
});

var POIGroup = Class.extend({
    init: function(poiGroupData, languages) {
        this.id = poiGroupData.group_id;
        this.names = new Translations();
        this.imageID = poiGroupData.image_id;
        for (var language in languages) {
            this.names.set(language, poiGroupData[language]);
        }
        this.pois = [];
        this.showInMenu = poiGroupData.show_main;
        this.showInTopMenu = poiGroupData.show_top;
        this.color = new Color().fromHex(poiGroupData.color);
        this.parent_id = poiGroupData.parent_id;
    },
    getID: function() {
        return this.id;
    },
    getNames: function() {
        return this.names;
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    getShowInMenu: function() {
        return this.showInMenu != 0;
    },
    getShowInTopMenu: function() {
        return this.showInTopMenu != 0;
    },
    getImageID: function() {
        return this.imageID;
    },
    addPOI: function(poi) {
        this.pois.push(poi);
    },
    getPOIs: function() {
        return this.pois;
    },
    getColor: function() {
        return this.color;
    }
});

var Logistics = function() {
    var storageSupport = false;
    if (typeof window !== "undefined") {
        storageSupport = "localStorage" in window && window["localStorage"] !== null;
    }
    var queue = [];
    var multiQueue = [];
    var stages = {};
    var loadedCount = 0;
    var loading = false;
    var afterLoadCallback = null;
    var progressCallback = null;
    var stageCallback = null;
    var loadedCheckTimer = null;
    var options = {
        loadFromLocalStorage: false,
        storeToLocalStorage: false,
        loadFromFile: false,
        enableCORS: true,
        useCookies: false,
        fallbackFromStorage: true,
        urlParseFunction: null
    };
    var me = this;
    var typefunctions = {
        text: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.responseText;
            },
            store: function(dt) {
                return dt.data;
            },
            restore: function(dt, data) {
                return data;
            }
        },
        json: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                try {
                    dt.data = JSON.parse(http.responseText);
                } catch (e) {
                    if (typeof console !== "undefined" && console.error) {
                        console.error("JSON parsing failed for " + dt.url, e);
                    }
                }
            },
            store: function(dt) {
                return JSON.stringify(dt.data);
            },
            restore: function(dt, data) {
                if (data) {
                    return JSON.parse(data);
                } else {
                    return {};
                }
            }
        },
        xml: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                if (http.responseXML) {
                    dt.data = http.responseXML;
                } else {
                    dt.data = parseXML(http.responseText);
                }
            },
            store: function(dt) {
                if (XMLSerializer) {
                    return new XMLSerializer().serializeToString(dt.data);
                } else {
                    return "";
                }
            },
            restore: function(dt, data) {
                return parseXML(data);
            }
        },
        image: {
            load: function(dt) {
                if (dt) {
                    dt.data = new Image();
                    if (dt.useCORS) {
                        dt.data.crossOrigin = "Anonymous";
                    }
                    dt.data.onload = function() {
                        dt.ready();
                    };
                    dt.data.onerror = function() {
                        dt.failed();
                    };
                    dt.data.src = dt.url;
                }
            },
            parse: function(dt) {},
            store: function(dt) {
                var canvas = document.createElement("canvas");
                canvas.width = dt.data.width;
                canvas.height = dt.data.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(dt.data, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                canvas = null;
                return dataURL;
            },
            restore: function(dt, data) {
                var img = new Image();
                img.src = data;
                return img;
            }
        },
        binary: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.response;
            },
            store: function(dt) {
                var str = "";
                var bytes = new Uint8Array(dt.data);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    str += String.fromCharCode(bytes[i]);
                }
                return window.btoa(str);
            },
            restore: function(dt, data) {
                var buf = new ArrayBuffer(data.length * 2);
                var bufView = new Uint16Array(buf);
                for (var i = 0, strLen = data.length; i < strLen; i++) {
                    bufView[i] = data.charCodeAt(i);
                }
                return buf;
            }
        }
    };
    var DataTransporter = function(_url, _params, _success, _type, _requestType, _options) {
        this.url = _url;
        this.params = _params;
        this.success = _success;
        this.dataType = _type;
        this.loaded = false;
        this.data = false;
        this.requestType = _requestType;
        this.useCORS = false;
        this.options = _options ? _options : {};
        this.successCallback = _success;
        this.errorCallback = false;
        this.alwaysCallback = false;
        this.progressCallback = false;
        this.setOption = function(key, value) {
            this.options[key] = value;
        };
        this.getOption = function(key) {
            return this.options[key];
        };
        this.ready = function() {
            this.loaded = true;
            loadedCount++;
            callSuccess(this);
            callProgress(this);
        };
        this.failed = function() {
            loadedCount++;
            callProgress(this);
            callError(this);
        };
        this.done = function(callback) {
            this.successCallback = callback;
        };
        this.fail = function(callback) {
            this.errorCallback = callback;
        };
        this.error = function(callback) {
            this.errorCallback = callback;
        };
        this.always = function(callback) {
            this.alwaysCallback = callback;
        };
        this.progress = function(callback) {
            this.progressCallback = callback;
        };
        this.toString = function() {
            return this.data;
        };
    };
    var MultiTransporter = function(urlList, _success, _options) {
        this.urls = urlList;
        this.results = {};
        this.loadedCount = 0;
        this.count = 0;
        this.successCallback = _success;
        _options = _options ? _options : {};
        this.load = function() {
            var dt = null;
            var url = null;
            for (var key in this.urls) {
                if (this.urls.hasOwnProperty(key)) {
                    this.count++;
                }
            }
            for (var i in this.urls) {
                url = this.urls[i];
                if (url && url.url && url.type) {
                    try {
                        dt = get(url.url, undefined, callback(this, this.ready, i), url.type, JSON.parse(JSON.stringify(_options)));
                        dt.setOption("logistics.multi.key", i);
                        dt.fail(callback(this, this.fail));
                    } catch (e) {
                        this.fail();
                    }
                }
            }
        };
        this.ready = function(data, status, dt) {
            var key = dt.getOption("logistics.multi.key");
            this.results[key] = data;
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.fail = function(dt) {
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.getKeyForURL = function(url) {};
        this.checkIfAllReady = function() {
            if (this.loadedCount >= this.count) {
                if (typeof this.successCallback === "function") {
                    this.successCallback(this.results);
                }
            }
        };
    };
    var get = function(_url, _params, _success, _type, _options) {
        var _requestType = "GET";
        if (typeof _params === "function") {
            _options = _success;
            _success = _params;
            _params = undefined;
        } else if (_params && typeof _params === "object") {
            _requestType = "POST";
        }
        if (typeof options.urlParseFunction == "function") {
            _url = options.urlParseFunction(_url);
        }
        var dt = new DataTransporter(_url, _params, _success, _type, _requestType, _options);
        if (options.enableCORS) {
            dt.useCORS = ifCORSNeeded(_url);
        }
        if (dt) {
            queue.push(dt);
            startLoad(dt);
        }
        return dt;
    };
    var getMultiple = function(urlList, success, options) {
        var mt = new MultiTransporter(urlList, success, options);
        multiQueue.push(mt);
        mt.load();
    };
    var ifCORSNeeded = function(_url) {
        if (typeof document === "undefined") return false;
        var url = _url.match(/(https?:)?\/\/([^\/]+)\/(.*)/);
        if (!url) return false;
        if (document && url[1] === document.location.origin) return false;
        return true;
    };
    var checkOptions = function(dt) {
        if (dt) {
            var stage = dt.getOption("stage");
            if (stage) {
                if (typeof stages[stage] !== "object") {
                    stages[stage] = [];
                }
                stages[stage].push(dt);
            }
        }
    };
    var startLoad = function(dt) {
        load(dt);
        return true;
    };
    var load = function(dt) {
        checkOptions(dt);
        if (options.loadFromLocalStorage && inLocalStorage(dt)) {
            restore(dt);
        } else {
            getTypeFunction(dt.dataType, "load")(dt);
        }
    };
    var inLocalStorage = function(dt) {
        if (storageSupport && localStorage.getItem(dt.url) !== null) {
            return true;
        }
        return false;
    };
    var restore = function(dt) {
        dt.data = getTypeFunction(dt.dataType, "restore")(dt, loadFromLocalStorage(dt));
        dt.ready();
    };
    var getTypeFunction = function(type, method) {
        if (typefunctions && typefunctions[type] && typefunctions[type][method]) {
            return typefunctions[type][method];
        } else if (typefunctions && typefunctions[type]) {
            return typefunctions[type];
        }
        return function() {
            if (typeof console !== "undefined" && console.warn) {
                console.warn("Method " + method + " for " + type + " not found");
            }
        };
    };
    var setTypeFunction = function(type, method) {
        if (type && method) {
            typefunctions[type] = method;
        }
    };
    var makeHTTPRequest = function(dt) {
        var xhr = getHTTPObject(dt);
        if (xhr && dt) {
            var url = dt.url;
            var params = null;
            xhr.open(dt.requestType, url, true);
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/xml");
            }
            if (dt.dataType == "binary") {
                xhr.responseType = "arraybuffer";
                if (dt.useCORS) {
                    xhr.setRequestHeader("Content-Type", "application/x-3dtechdata");
                }
            }
            if (dt.dataType == "default") {
                xhr.responseType = "arraybuffer";
                if (dt.useCORS) {
                    xhr.setRequestHeader("Content-Type", "application/octet-stream");
                }
            }
            if (dt.options.headers) {
                for (var h in dt.options.headers) {
                    xhr.setRequestHeader(h, dt.options.headers[h]);
                }
            }
            if (dt.params) {
                params = new FormData();
                for (var i in dt.params) {
                    params.append(i, dt.params[i]);
                }
            }
            if (dt.useCORS && options.useCookies) {
                xhr.withCredentials = true;
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status == 200 || status == 0 || status == 300) {
                        getTypeFunction(dt.dataType, "parse")(dt, xhr);
                        dt.ready();
                    } else {
                        dt.failed();
                    }
                } else {
                    if (typeof dt.progressCallback === "function") {
                        dt.progressCallback(xhr);
                    }
                }
            };
            xhr.ontimeout = function() {
                dt.failed();
            };
            xhr.onerror = function() {
                dt.failed();
            };
            callProgress(dt);
            xhr.send(params);
        } else {
            throw "http failed";
        }
    };
    var parseXML = function(data) {
        var xml = null;
        if (!data || typeof data !== "string") {
            return xml;
        }
        if (window && window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(data, "text/xml");
        } else {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            throw "XML parsing failed";
        }
        return xml;
    };
    var getHTTPObject = function(dt) {
        var http = false;
        if (dt.useCORS && window && window.XDomainRequest) {
            try {
                http = new XDomainRequest();
            } catch (E) {
                http = false;
            }
        } else if (XMLHttpRequest) {
            try {
                http = new XMLHttpRequest();
            } catch (e) {
                http = false;
            }
        } else if (typeof ActiveXObject !== "undefined") {
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
                alert(2);
            } catch (e) {
                try {
                    http = new ActiveXObject("Microsoft.XMLHTTP");
                    alert(3);
                } catch (E) {
                    http = false;
                }
            }
        }
        return http;
    };
    var clear = function() {
        queue = [];
        multiQueue = [];
        loadedCount = 0;
        loading = false;
    };
    var store = function() {
        if (storageSupport) {
            for (var i in queue) {
                storeToLocalStorage(queue[i]);
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var clearStorage = function() {
        localStorage.clear();
    };
    var storeToLocalStorage = function(dt) {
        if (storageSupport) {
            try {
                localStorage[dt.url] = getTypeFunction(dt.dataType, "store")(dt);
            } catch (err) {
                console.warn("localStorage limit exceeded");
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var loadFromLocalStorage = function(dt) {
        return localStorage[dt.url];
    };
    var callSuccess = function(dt) {
        if (dt && typeof dt.successCallback === "function") {
            dt.successCallback(dt.data, "success", dt);
            callIfFinished();
        }
        if (dt && options.storeToLocalStorage) {
            storeToLocalStorage(dt);
        }
    };
    var callError = function(dt) {
        if (dt && options.fallbackFromStorage && inLocalStorage(dt)) {
            restore(dt);
            return;
        } else if (dt && typeof dt.errorCallback === "function") {
            dt.errorCallback(dt, "error", "");
        } else {
            throw "Resource " + dt.url + " not loaded";
        }
        callIfFinished();
    };
    var callProgress = function(dt) {
        if (progressCallback && typeof progressCallback === "function" && queue.length && loadedCount) {
            progressCallback(loadedCount / queue.length);
        }
        if (dt && dt.getOption("stage")) {
            callStageCallback(dt);
        }
    };
    var callStageCallback = function(dt) {
        if (stageCallback && typeof stageCallback === "function") {
            var stage = stages[dt.getOption("stage")];
            var length = stage.length;
            var loadedCount = 0;
            for (var i = 0; i < length; i++) {
                if (stage[i] && stage[i].loaded) {
                    loadedCount++;
                }
            }
            if (length > 0) {
                stageCallback(dt.getOption("stage"), loadedCount / length);
            }
        }
    };
    var callIfFinished = function() {
        if (loadedCheckTimer === null) {
            loadedCheckTimer = setTimeout(finishedChecker, 5);
        }
    };
    var finishedChecker = function() {
        loadedCheckTimer = null;
        if (queue.length == loadedCount && afterLoadCallback && typeof afterLoadCallback === "function") {
            afterLoadCallback();
        }
    };
    var callback = function(classScope, fnCallback) {
        return function() {
            return fnCallback.apply(classScope, arguments);
        };
    };
    var setOption = function(key, value) {
        options[key] = value;
    };
    var getOption = function(key) {
        return options[key];
    };
    return {
        count: function() {
            return queue.length;
        },
        loadedCount: function() {
            return loadedCount;
        },
        clear: function() {
            clear();
        },
        get: function(url, params, success, type, options) {
            return get(url, params, success, toLowerCase(type), options);
        },
        getJSON: function(url, params, success, options) {
            return get(url, params, success, "json", options);
        },
        getImage: function(url, params, success, options) {
            return get(url, params, success, "image", options);
        },
        getBinary: function(url, params, success, options) {
            return get(url, params, success, "binary", options);
        },
        getXML: function(url, params, success, options) {
            return get(url, params, success, "xml", options);
        },
        getText: function(url, params, success, options) {
            return get(url, params, success, "text", options);
        },
        getMultiple: function(urlList, success, options) {
            getMultiple(urlList, success, options);
        },
        store: function() {
            store();
        },
        clearStorage: function() {
            clearStorage();
        },
        types: function() {
            return typefunctions;
        },
        onFinishedLoading: function(callback) {
            afterLoadCallback = callback;
        },
        onProgress: function(callback) {
            progressCallback = callback;
        },
        onStageProgress: function(callback) {
            stageCallback = callback;
        },
        getQueue: function() {
            return queue;
        },
        getTypeFunction: function(type, method) {
            return getTypeFunction(type, method);
        },
        setTypeFunction: function(type, method) {
            return setTypeFunction(type, method);
        },
        getOption: function(key) {
            return getOption(key);
        },
        setOption: function(key, value) {
            setOption(key, value);
        },
        start: function() {
            return start();
        }
    };
}();

var Language = Class.extend({
    init: function(languageData) {
        this.name = languageData.name;
        this.id = languageData.id;
        this.nativeName = languageData["native"];
        this.textDirection = languageData.text_direction.toLowerCase();
        this.flagImage = languageData.flag;
    },
    getName: function() {
        return this.name;
    },
    getID: function() {
        return this.id;
    },
    getNativeName: function() {
        return this.nativeName;
    },
    getTextDirection: function() {
        return this.textDirection;
    }
});

var Translator = Class.extend({
    init: function(language, translationMap) {
        this.language = language;
        this.translations = translationMap;
    },
    setTranslations: function(translationMap) {
        this.translations = translationMap;
    },
    setLanguage: function(language) {
        this.language = language;
    },
    getLanguage: function() {
        return this.language;
    },
    _isJQueryObject: function(obj) {
        return typeof jQuery !== "undefined" && obj instanceof jQuery;
    },
    get: function(key, params) {
        if (this.translations && key && this.translations[key] && this.translations[key][this.language]) {
            var str = this.translations[key][this.language];
            if (params) {
                str = this.replaceValues(str, params);
            }
            return str;
        }
        return key;
    },
    translate: function(language) {
        if (language) {
            this.language = language;
        }
        if (typeof document !== "undefined" && document.querySelectorAll) {
            var elements = document.querySelectorAll("[data-translation-element]");
            for (var i = 0; i < elements.length; i++) {
                this.translateElement(elements[i], elements[i].getAttribute("data-translation-element"));
            }
            var elements = document.querySelectorAll("[data-translation-attributes]");
            for (var i = 0; i < elements.length; i++) {
                var attributes = elements[i].getAttribute("data-translation-attributes").split(",");
                var key = "";
                for (var j = 0; j < attributes.length; j++) {
                    key = elements[i].getAttribute("data-translation-attribute-" + attributes[j]);
                    if (elements[i] && key) {
                        elements[i].setAttribute(attributes[j], this.get(key));
                    }
                }
            }
        }
    },
    setElement: function(element, key) {
        if (element && key) {
            if (this._isJQueryObject(element)) {
                element = element[0];
            }
            element.setAttribute("data-translation-element", key);
        }
    },
    setAttribute: function(element, attribute, key) {
        if (element && key && attribute) {
            if (this._isJQueryObject(element)) {
                element = element[0];
            }
            var attr = [];
            if (element.getAttribute("data-translation-attributes")) {
                attr = element.getAttribute("data-translation-attributes").split(",");
            }
            attr.push(attribute);
            element.setAttribute("data-translation-attributes", attr.join(","));
            element.setAttribute("data-translation-attribute-" + attribute, key);
        }
    },
    translateElement: function(parent, key, params) {
        if (parent) {
            if (this._isJQueryObject(parent)) {
                parent = parent[0];
            }
            if (key && this.exists(key)) {
                var value = this.get(key, params);
                this.setElement(parent, key);
                parent.innerHTML = value;
            } else {
                if (parent.classList) parent.classList.add("no-translation");
            }
        }
    },
    translateAttribute: function(parent, attribute, key, params) {
        if (parent && attribute && key) {
            if (this._isJQueryObject(parent)) {
                parent = parent[0];
            }
            var value = this.get(key, params);
            this.setAttribute(parent, attribute, key);
            parent.setAttribute(attribute, value);
            if (!this.exists(key) && parent.classList) {
                parent.classList.add("no-translation");
            }
        }
    },
    replaceValues: function(str, params) {
        if (str && params) {
            var count = 0;
            for (var i in params) {
                str = str.replace("%" + count++, params[i]);
            }
        }
        return str;
    },
    exists: function(key) {
        if (this.translations && key && this.translations[key] && this.translations[key][this.language]) return true; else return false;
    }
});

var Translations = Class.extend({
    init: function(translations) {
        if (translations) this.translations = translations; else this.translations = {};
    },
    set: function(language, translation) {
        this.translations[language] = translation;
    },
    get: function(language) {
        if (!this.translations[language]) return false;
        return this.translations[language];
    },
    setAll: function(translations) {
        this.translations = translations;
    },
    getAll: function() {
        return this.translations;
    },
    setTranslations: function(element, language) {
        var defaultAdded = false;
        if (element && language) {
            for (var l in this.translations) {
                element.attr("data-lang-" + l, this.translations[l]);
            }
            if (this.translations[language]) element.html(this.translations[language]); else element.html("no translation");
            element.attr("data-translated", true);
        }
    }
});

var TranslationsMap = Class.extend({
    init: function() {
        this.translations = {};
    },
    add: function(id, translations) {
        if (!(translations instanceof Translations)) throw "Only Translation instances can be added to translations map";
        this.translations[id] = translations;
    },
    get: function(id) {
        if (!this.translations[id]) return new Translations({
            english: "--missing--"
        });
        return this.translations[id];
    }
});

var WFStatistics = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.session_id = 0;
        this.storageSupport = typeof window !== "undefined" && "localStorage" in window && window["localStorage"] !== null;
        this.storagePrefix = "wfstats_";
        this.device_id = 0;
        this.searchPhrase = "";
        this.checkStorage();
    },
    start: function() {
        var me = this;
        if (typeof screen !== "undefined" && !this.device_id) {
            WayfinderAPI.statistics.device(screen.width, screen.height, this.wayfinder.getKiosk(), function(data) {
                if (data) {
                    me.device_id = data["data"]["id"];
                    me.store("deviceId", data["data"]["id"]);
                    log("Device created", data);
                }
            });
        }
    },
    onSessionStart: function() {
        var me = this;
        var language = this.wayfinder.languages[this.wayfinder.getLanguage()];
        if (language && language.getID() && this.wayfinder.getKiosk()) {
            WayfinderAPI.statistics.startSession(language.getID(), this.wayfinder.getKiosk(), this.wayfinder.options.application, this.wayfinder.getLayout(), this.device_id, function(data) {
                try {
                    if (data) me.session_id = data["data"];
                } catch (e) {
                    log("Something went wrong sending startSession");
                }
            });
        }
    },
    onSessionEnd: function() {
        var scope = this;
        if (this.session_id) {
            var language = this.wayfinder.languages[this.wayfinder.getLanguage()];
            WayfinderAPI.statistics.endSession(this.session_id, language.getID(), function() {
                scope.session_id = 0;
                log("Session ended!");
            });
        }
    },
    onClick: function(location, type) {
        WayfinderAPI.statistics.click(location, this.session_id, type);
    },
    onLanguageChange: function(language) {},
    onSearch: function(searchstring, type) {
        WayfinderAPI.statistics.search(searchstring, this.session_id, type);
    },
    checkStorage: function() {
        if (this.storageSupport) {
            this.deviceId = localStorage.getItem(this.storagePrefix + "deviceId");
        }
    },
    getTime: function() {},
    store: function(key, value) {
        if (this.storageSupport) {
            localStorage[this.storagePrefix + key] = JSON.stringify(value);
        }
    },
    isOnline: function() {}
});

var WayfinderLogic = Class.extend({
    init: function(wayfinder, name) {
        this.wayfinder = wayfinder;
        this.name = name;
    },
    resize: function() {
        if (typeof document !== "undefined") {
            var canvas = this.getCanvas();
            if (canvas && typeof window !== "undefined") {
                var style = window.getComputedStyle(canvas.parentNode, null);
                canvas.setAttribute("width", style.width);
                canvas.setAttribute("height", style.height);
            }
        }
    },
    getCanvas: function() {
        if (this.name && this.wayfinder) {
            if (this.wayfinder.maps[this.name]) {
                return this.wayfinder.maps[this.name].canvas;
            }
        }
        return false;
    },
    loadMapData: function() {},
    showFloor: function() {},
    onDataLoaded: function() {
        this.wayfinder.setKiosk(this.wayfinder.options.kiosk);
        this.wayfinder.showFloor(this.wayfinder.getKioskNode().getFloor());
        this.showKiosk();
        this.dataLoaded = true;
        this.wayfinder.loadSecondaryResources();
        this.wayfinder.onFinishedLoading();
    },
    loadPOIIcons: function(data) {
        if (this.wayfinder.pois) {
            var dt = null;
            var poi;
            for (var i in this.wayfinder.pois) {
                poi = this.wayfinder.pois[i];
                if (poi.image_id && poi.image_id !== 0 && poi.alwaysVisible) {
                    dt = Logistics.getImage(WayfinderAPI.getURL("images", "get", [ poi.image_id ]), null, ClassCallback(poi, poi.setIcon), {
                        stage: "locations"
                    });
                }
            }
        }
    }
});

var WayfinderLogic2D = WayfinderLogic.extend({
    init: function(wayfinder, name) {
        this._super(wayfinder, name);
        this.map = wayfinder.map;
        this.currentFloor = false;
        this.factory = new WayfinderFactory2D(this.wayfinder);
    },
    cbOnZoomChange: function() {
        this.wayfinder.cbOnZoomChange();
    },
    loadMapData: function() {
        Logistics.getJSON(WayfinderAPI["2d"].pack.url(), null, ClassCallback(this, this.onMapData), {
            stage: "map"
        });
    },
    onMapData: function(result) {
        var scope = this;
        var data = result.data;
        this.factory.addNode2DData(data.nodes);
        this.factory.createOverlays(data.overlays);
        var yahSetting = this.wayfinder.settings.getInt("kiosk.you-are-here-image", 0);
        var yahImage = yahSetting !== 0 ? WayfinderAPI.getURL("images", "get", [ yahSetting ]) : "images/yah.png";
        Logistics.getImage(yahImage, function(img, b) {
            scope.wayfinder.yahImage = img;
        });
        this.wayfinder.padding = this.wayfinder.settings.getInt("path.2d.padding", this.wayfinder.options.pathZoomPadding);
        this.setup();
        this.loadMapImages();
        this.wayfinder.resize();
        if (this.wayfinder.cbOnMapReady && typeof this.wayfinder.cbOnMapReady === "function") {
            this.wayfinder.cbOnMapReady();
        }
        this.loadPOIIcons();
        this.onDataLoaded();
        this.wayfinder.map.start();
        this.wayfinder.map.update(true);
        this.showKiosk();
    },
    onDataLoaded: function() {
        this._super();
        if (this.cbOnDataLoaded && typeof this.cbOnDataLoaded === "function") {
            this.cbOnDataLoaded();
        }
        if (this.wayfinder.getCurrentFloor()) {
            if (!this.wayfinder.settings.getBoolean("camera.2d.disablezooming", false)) {
                var floor = this.wayfinder.building.getFloors()[this.wayfinder.getCurrentFloor().id];
                if (typeof floor === "object") {
                    this.map.fitMultiplePOIsInView(floor.pois);
                }
            } else this.showKiosk();
        }
    },
    setup: function() {
        this.map = new Map2D(this.wayfinder);
        this.wayfinder.map = this.map;
        this.map.setup();
        this.map.onPOIClick = ClassCallback(this.wayfinder, this.wayfinder.onPOIClick);
        this.map.getTransformer().cbOnZoomChange = ClassCallback(this.wayfinder, this.wayfinder.onZoomChange);
    },
    loadMapImages: function() {
        var scope = this;
        var floor;
        var setImage = function(image, status, dt) {
            scope.wayfinder.map.addLODImage(dt.params.floor_id, 0, 0, 0, image);
        };
        for (var i in this.wayfinder.building.getFloors()) {
            floor = this.wayfinder.building.getFloors()[i];
            Logistics.getImage(WayfinderAPI.getURL("2d", "image", [ floor.id ]), {
                floor_id: floor.id
            }, setImage, {
                stage: "floors"
            });
        }
    },
    setDefaultView: function(zoom) {
        if (this.wayfinder.pathComponent) {
            this.wayfinder.pathComponent.clearPath();
        }
        this.setKioskView(zoom);
    },
    setNodeView: function(node, zoom, rotate) {},
    showPath: function(sourceNode, endNode, poi) {
        if (sourceNode === false || endNode === false) return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        this.path = pathFinder.find(sourceNode.id, endNode.id);
        if (this.path === false) return;
        var scope = this;
        if (!(this.wayfinder.settings.getBoolean("camera.2d.disableMap2DMovement", false) || this.wayfinder.settings.getBoolean("camera.2d.disableZooming", false))) {
            this.wayfinder.map.fitPathInView(this.path);
        }
        this.wayfinder.map.pathRenderer.reset();
        console.log("wayfinder.showFloor(sourceNode.floor)", sourceNode.floor);
        this.wayfinder.showFloor(sourceNode.floor);
        this.wayfinder.map.redraw();
        this.wayfinder.map.pathRenderer.setPath(this.path, function() {
            if (poi) {
                scope.clearHighlights();
                scope.clearDisplaying();
                scope.setHighlights([ poi ]);
                scope.setDisplaying([ poi ]);
            }
            scope.wayfinder.map.redraw();
            if (typeof scope.cbOnPathFinished === "function") {
                scope.wayfinder.cbOnPathFinished(scope.path, endNode, poi);
            }
        });
        return this.path;
    },
    updatePath: function(startNode, endNode, poi) {
        if (this.wayfinder.getKiosk() === false || endNode === false) return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        this.path = pathFinder.find(startNode.id, endNode.id);
        if (this.path === false) {
            console.log("updatePath", "No path found", startNode, endNode);
            return;
        }
        var scope = this;
        this.map.pathRenderer.reset();
        this.map.redraw();
        this.map.pathRenderer.updatePath(this.path, function() {
            if (poi) {
                scope.clearHighlights();
                scope.setHighlights([ poi ]);
            }
            scope.map.redraw();
            if (typeof scope.cbOnPathFinished === "function") {
                scope.cbOnPathFinished(scope.path, endNode, poi);
            }
        });
        return this.path;
    },
    getNearestPOIs: function(source, pois, radius) {
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        var path, poi, _dist;
        var _pois = [];
        for (var i = 0, len = pois.length; i < len; i++) {
            poi = pois[i];
            if (poi && poi.node && poi.node.position2d) {
                if (radius && vec2.dist(source.position2d, poi.node.position2d) >= radius) {
                    continue;
                }
                path = pathFinder.find(source.id, poi.node.id);
                if (path) {
                    _dist = path.getDistance();
                    if (radius >= _dist) {
                        _pois.push(poi);
                    }
                } else {
                    console.log("No path for", poi);
                }
            }
        }
        return _pois;
    },
    resize: function() {
        this._super();
        if (this.map) {
            var scale = 1;
            if (this.wayfinder.options.upscale > 0) {
                var context = this.map.renderer.context;
                var devicePixelRatio = window.devicePixelRatio || 1;
                var backingStoreRatio = this.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
                scale = Math.max(this.wayfinder.options.upscale, devicePixelRatio / backingStoreRatio);
            }
            var canvas = this.getCanvas();
            this.map.resize(canvas, canvas.width * scale, canvas.height * scale, scale);
            this.map.redraw();
        }
    },
    setZoom: function(percentage) {
        this.map.setZoom(percentage);
        this.map.update(true);
    },
    zoomIn: function() {
        this.map.zoomIn();
        this.map.update(true);
    },
    zoomOut: function() {
        this.map.zoomOut();
        this.map.update(true);
    },
    setHighlights: function(pois) {
        this.map.setHighlights(pois);
        this.map.update(true);
    },
    clearHighlights: function() {
        this.map.clearHighlights();
        this.map.update(true);
    },
    clearDisplaying: function() {
        this.map.clearDisplaying();
        this.map.update(true);
    },
    setDisplaying: function(pois) {
        this.map.setDisplaying(pois);
        this.map.update(true);
    },
    showFloor: function() {
        if (this.wayfinder.map) {
            this.wayfinder.map.update(true);
        }
    },
    showKiosk: function() {
        if (this.wayfinder.getKiosk() === false) return;
        this.wayfinder.map.pathRenderer.reset();
        this.wayfinder.showFloor(this.wayfinder.getKioskNode().floor);
        var floor = this.wayfinder.getCurrentFloor();
        if (floor) {
            if (!this.wayfinder.settings.getBoolean("camera.2d.disableZooming", false) || this.wayfinder.settings.getBoolean("kiosk.view.fit-floor-pois", false)) {
                this.wayfinder.map.fitMultiplePOIsInView(this.wayfinder.building.getFloors()[floor.id].pois);
            } else {
                this.setZoom(0);
            }
        }
        this.wayfinder.map.redraw();
    },
    clearPath: function() {
        this.map.pathRenderer.clearPath();
        this.map.pathRenderer.reset();
        this.map.update(true);
    },
    setLanguage: function(language) {
        this._super(language);
        this.map.update(true);
    },
    switchCanvas: function(element) {
        this.canvas = element;
        this.map.updateCanvas(this.canvas);
        this.resize();
        this.map.update(true);
    },
    findNearestNodeOnFloor: function(floor, position, hasNeighbours) {
        return this.map.findNearestNodeOnFloor(floor, position, hasNeighbours);
    },
    pause: function() {
        this.paused = true;
    },
    run: function() {
        this.paused = false;
    },
    onVisibilityChange: function() {
        if (typeof document !== "undefined" && document.hidden) {
            this.pause();
        } else {
            this.run();
        }
    },
    getScreenPosition: function(poi) {
        return this.map.getPOIOverlayLocationOnMap(poi);
    },
    update: function(full) {
        if (this.map) {
            this.map.update(full);
        }
    },
    switchCanvas: function(element) {
        this.wayfinder.maps[this.name].canvas = element;
        this.map.updateCanvas(element);
        this.resize();
        this.map.update(true);
    }
});

var WayfinderFactory2D = WayfinderFactory.extend({
    createOverlays: function(overlays) {
        if (overlays) {
            var poi_id, i;
            for (poi_id in overlays) {
                if (poi_id in this.wayfinder.pois) {
                    if (!this.wayfinder.overlays[poi_id]) this.wayfinder.overlays[poi_id] = [];
                    for (i in overlays[poi_id]) this.wayfinder.overlays[poi_id].push(new Overlay(this.wayfinder.pois[poi_id], overlays[poi_id][i], this.wayfinder.options.map2DRotation));
                }
            }
        }
    },
    addNode2DData: function(coordinates) {
        if (this.wayfinder.nodes) {
            for (var i in this.wayfinder.nodes) {
                var node = this.wayfinder.nodes[i];
                if (coordinates[node.floor_id]) {
                    var coordinate = coordinates[node.floor_id][node.id];
                    if (coordinate) {
                        node.setPosition2D(coordinate.x, coordinate.y);
                        node.setWeight(coordinate.weight);
                    }
                }
            }
        }
    },
    createNode: function(data) {
        return new NavigationNode2D(data);
    }
});

var Wayfinder2D = Wayfinder.extend({
    init: function(options, canvas) {
        if (!options || !(options instanceof Wayfinder2DOptions)) options = new Wayfinder2DOptions();
        this._super(options, new WayfinderFactory2D(this));
        this.logic = new WayfinderLogic2D(this, "2d");
        this.overlays = {};
        this.adImage = false;
        this.yahImage = false;
        this.paused = false;
        this.path = false;
        if (!canvas && typeof document !== "undefined") {
            canvas = document.getElementById(this.options.map);
        }
        this.maps["2d"] = {
            logic: this.logic,
            canvas: canvas,
            loaded: false
        };
    },
    onBundleData: function(result) {
        this._super(result);
        this.logic.loadMapData();
    },
    isCanvasSupported: function() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
    },
    onPOIsLoaded: function(data) {
        this._super(data);
        Logistics.getMultiple({
            nodes_2d: {
                url: WayfinderAPI.getURL("2d", "nodes", []),
                type: "json"
            },
            overlays: {
                url: WayfinderAPI.getURL("2d", "overlays", []),
                type: "json"
            },
            location: {
                url: WayfinderAPI.getURL("building", "location", []),
                type: "json"
            },
            lodcount: {
                url: WayfinderAPI.getURL("2d", "lodcount", []),
                type: "json"
            },
            "ad-image": {
                url: "images/ad.png",
                type: "image"
            },
            "yah-image": {
                url: "images/yah.png",
                type: "image"
            }
        }, ClassCallback(this, this.on2DDataLoaded), {
            stage: "settings"
        });
        this.loadMapImages();
    },
    on2DDataLoaded: function(data) {
        var scope = this;
        var nodes = data["nodes_2d"]["data"];
        var overlays = data["overlays"]["data"];
        this.adImage = data["ad-image"];
        scope.yahImage = scope.settings.getInt("kiosk.you-are-here-image", 0) ? scope.settings.getInt("kiosk.you-are-here-image", 0) : data["yah-image"];
        this.options.maxLOD = data["lodcount"]["data"];
        console.log("nodes", nodes);
        this.factory.addNode2DData(nodes);
        this.factory.createOverlays(overlays);
        this.map.update(true);
        this.onDataLoaded();
    },
    onDataLoaded: function() {
        this._super();
    },
    overrideOptions: function() {
        this.options.disableMap2DMovement = this.settings.getBoolean("camera.2d.disableMap2DMovement", false);
    },
    setupFloor: function() {
        var floor = false;
        if (this.getKioskNode() && this.getKioskNode().floor) {
            floor = this.getKioskNode().floor;
        } else {
            var maxIndex = 0;
            for (var j in this.building.getFloors()) {
                floor = this.building.getFloors()[j];
                if (floor.index >= maxIndex) {
                    maxIndex = floor.index;
                }
            }
        }
        if (floor) {
            this.showFloor(floor);
        }
    }
});

var Wayfinder2DOptions = WayfinderOptions.extend({
    init: function() {
        this._super();
        this.pathZoomPadding = 50;
        this.pathStride = 10;
        this.poiColor = "rgba(100,100,100,0.5)";
    }
});

var NavigationNode2D = NavigationNode.extend({
    init: function(nodeData) {
        this._super(nodeData);
        this.position2d = false;
        this.weight = false;
        this.neighbours = [];
    },
    setPosition2D: function(x, y) {
        this.position2d = vec2.fromValues(parseFloat(x), parseFloat(y));
    },
    setWeight: function(weight) {
        this.weight = parseFloat(weight);
    },
    addNeighbour: function(node) {
        if (node instanceof NavigationNode2D) this.neighbours.push(node);
    }
});

var Overlay = Class.extend({
    init: function(poi, overlayData, rotate) {
        this.visible = overlayData["visible"] == "1" ? true : false;
        this.polygon = this.createPolygon(overlayData["polygon"]);
        this.poi = poi;
        this.rotate = rotate ? rotate : 0;
        this.bounds = this.calculateBounds(this.polygon, 0);
        this.rotatedAreaBounds = this.calculateRotatedAreaBounds(this.polygon);
    },
    createPolygon: function(data) {
        var polygon = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].x && data[i].y) {
                    polygon.push(vec2.fromValues(data[i].x, data[i].y));
                }
            }
        }
        return polygon;
    },
    contains: function(pt) {
        var i, j;
        var c = false;
        for (i = 0, j = this.polygon.length - 1; i < this.polygon.length; j = i++) {
            if (this.polygon[i][1] > pt[1] != this.polygon[j][1] > pt[1] && pt[0] < (this.polygon[j][0] - this.polygon[i][0]) * (pt[1] - this.polygon[i][1]) / (this.polygon[j][1] - this.polygon[i][1]) + this.polygon[i][0]) c = !c;
        }
        return c;
    },
    calculateBounds: function(polygon, rotation) {
        if (!polygon) return false;
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var point;
        for (var i = 0; i < polygon.length; i++) {
            point = polygon[i];
            if (rotation) {
                point = this.rotatePoint(point, rotation);
            }
            minX = Math.min(minX, point[0]);
            minY = Math.min(minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        }
        point = this.rotatePoint(vec2.fromValues(minX, minY), -rotation);
        return [ point[0], point[1], maxX - minX, maxY - minY, maxX, maxY ];
    },
    calculateArea: function(points) {
        var area = 0, i, j, point1, point2;
        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i];
            point2 = points[j];
            area += point1[0] * point2[1];
            area -= point1[1] * point2[0];
        }
        area /= 2;
        return area;
    },
    calculateCenter: function(points) {
        var total = vec2.create();
        for (var i = 0; i < points.length; i++) {
            vec2.add(total, total, points[i]);
        }
        return vec2.divide(total, total, vec2.fromValues(points.length, points.length));
    },
    calculateRotatedAreaBounds: function(poly, options) {
        var aRatio, aRatios, angle, angleRad, angleStep, angles, area, aspectRatioStep, aspectRatios, bBox, boxHeight, boxWidth, centroid, events, height, insidePoly, l, left, len, len1, len2, len3, m, maxArea, maxAspectRatio, maxHeight, maxRect, maxWidth, maxx, maxy, minAspectRatio, minSqDistH, minSqDistW, minx, miny, modifOrigins, origOrigin, origin, origins, p, p1H, p1W, p2H, p2W, rectPoly, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, right, rndPoint, rndX, rndY, tempPoly, tolerance, width, widthStep, x0, y0;
        if (typeof poly === "array" && poly.length < 3) {
            return null;
        }
        events = [];
        aspectRatioStep = .5;
        angleStep = 5;
        if (options == null) {
            options = {};
        }
        options.maxAspectRatio = 15;
        options.minWidth = 0;
        options.minHeight = 0;
        options.tolerance = 3;
        options.nTries = 20;
        angles = [ -90, -30, 0, 30, 90 ];
        area = Math.abs(this.calculateArea(poly));
        if (area === 0) {
            return null;
        }
        minx = this.bounds[4] - this.bounds[2];
        miny = this.bounds[5] - this.bounds[3];
        maxx = this.bounds[4];
        maxy = this.bounds[5];
        tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;
        tempPoly = function() {
            var j, len, results;
            results = [];
            for (j = 0, len = poly.length; j < len; j++) {
                p = poly[j];
                results.push({
                    x: p[0],
                    y: p[1]
                });
            }
            return results;
        }();
        if (tolerance > 0) {
            tempPoly = this.findConvexHull(tempPoly, tolerance);
            poly = function() {
                var j, len, results;
                results = [];
                for (j = 0, len = tempPoly.length; j < len; j++) {
                    p = tempPoly[j];
                    results.push([ p[0], p[1] ]);
                }
                return results;
            }();
        }
        bBox = [ [ minx, miny ], [ maxx, miny ], [ maxx, maxy ], [ minx, maxy ] ];
        boxWidth = Math.abs(maxx - minx);
        boxHeight = Math.abs(maxy - miny);
        widthStep = Math.min(boxWidth, boxHeight) / 50;
        if (!origins) {
            origins = [];
            centroid = this.calculateCenter(poly);
            if (this.pointInPoly(centroid, poly)) {
                origins.push(centroid);
            }
            var wc = 0;
            while (origins.length < options.nTries) {
                rndX = Math.random() * boxWidth + minx;
                rndY = Math.random() * boxHeight + miny;
                rndPoint = [ rndX, rndY ];
                if (this.pointInPoly(rndPoint, poly)) {
                    origins.push(rndPoint);
                }
                wc++;
                if (wc > 15e3) {
                    console.log("Failed to find bounds", poly.length, this.poi.getName("en"));
                    return false;
                }
            }
        }
        maxArea = 0;
        maxRect = null;
        for (var j = 0, len = angles.length; j < len; j++) {
            angle = angles[j];
            angleRad = -angle * Math.PI / 180;
            for (var i = k = 0, len1 = origins.length; k < len1; i = ++k) {
                origOrigin = origins[i];
                ref5 = this.intersectPoints(poly, origOrigin, angleRad), p1W = ref5[0], p2W = ref5[1];
                ref6 = this.intersectPoints(poly, origOrigin, angleRad + Math.PI / 2), p1H = ref6[0], 
                p2H = ref6[1];
                modifOrigins = [];
                if (p1W != null && p2W != null) {
                    modifOrigins.push([ (p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2 ]);
                }
                if (p1H != null && p2H != null) {
                    modifOrigins.push([ (p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2 ]);
                }
                for (var l = 0, len2 = modifOrigins.length; l < len2; l++) {
                    origin = modifOrigins[l];
                    ref7 = this.intersectPoints(poly, origin, angleRad), p1W = ref7[0], p2W = ref7[1];
                    if (p1W === null || p2W === null) {
                        continue;
                    }
                    minSqDistW = Math.min(this.squaredDist(origin, p1W), this.squaredDist(origin, p2W));
                    maxWidth = 2 * Math.sqrt(minSqDistW);
                    ref8 = this.intersectPoints(poly, origin, angleRad + Math.PI / 2), p1H = ref8[0], 
                    p2H = ref8[1];
                    if (p1H === null || p2H === null) {
                        continue;
                    }
                    minSqDistH = Math.min(this.squaredDist(origin, p1H), this.squaredDist(origin, p2H));
                    maxHeight = 2 * Math.sqrt(minSqDistH);
                    if (maxWidth * maxHeight < maxArea) {
                        continue;
                    }
                    if (aspectRatios != null) {
                        aRatios = aspectRatios;
                    } else {
                        minAspectRatio = Math.max(1, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
                        maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, maxWidth * maxWidth / maxArea);
                        aRatios = [];
                        for (var i = minAspectRatio; i < maxAspectRatio + aspectRatioStep; i += aspectRatioStep) {
                            aRatios.push(i);
                        }
                    }
                    for (var m = 0, len3 = aRatios.length; m < len3; m++) {
                        aRatio = aRatios[m];
                        left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
                        right = Math.min(maxWidth, maxHeight * aRatio);
                        if (right * maxHeight < maxArea) {
                            continue;
                        }
                        while (right - left >= widthStep) {
                            width = (left + right) / 2;
                            height = width / aRatio;
                            x0 = origin[0], y0 = origin[1];
                            rectPoly = [ [ x0 - width / 2, y0 - height / 2 ], [ x0 + width / 2, y0 - height / 2 ], [ x0 + width / 2, y0 + height / 2 ], [ x0 - width / 2, y0 + height / 2 ] ];
                            rectPoly = this.rotatePoly(rectPoly, angleRad, origin);
                            if (this.polyInsidePoly(rectPoly, poly)) {
                                insidePoly = true;
                                maxArea = width * height;
                                maxRect = {
                                    cx: x0,
                                    cy: y0,
                                    width: width,
                                    height: height,
                                    angle: angle
                                };
                                left = width;
                            } else {
                                insidePoly = false;
                                right = width;
                            }
                        }
                    }
                }
            }
        }
        if (maxRect) {
            return {
                angle: -maxRect.angle * Math.PI / 180,
                bounds: {
                    width: maxRect.width,
                    height: maxRect.height
                },
                center: [ maxRect.cx, maxRect.cy ]
            };
        } else return false;
    },
    squaredDist: function(a, b) {
        var deltax, deltay;
        deltax = b[0] - a[0];
        deltay = b[1] - a[1];
        return deltax * deltax + deltay * deltay;
    },
    rayIntersectsSegment: function(p, p1, p2) {
        var a, b, mAB, mAP, ref;
        ref = p1[1] < p2[1] ? [ p1, p2 ] : [ p2, p1 ], a = ref[0], b = ref[1];
        if (p[1] === b[1] || p[1] === a[1]) {
            p[1] += Number.MIN_VALUE;
        }
        if (p[1] > b[1] || p[1] < a[1]) {
            return false;
        } else if (p[0] > a[0] && p[0] > b[0]) {
            return false;
        } else if (p[0] < a[0] && p[0] < b[0]) {
            return true;
        } else {
            mAB = (b[1] - a[1]) / (b[0] - a[0]);
            mAP = (p[1] - a[1]) / (p[0] - a[0]);
            return mAP > mAB;
        }
    },
    pointInPoly: function(p, poly) {
        var a, b, c, i, n;
        i = -1;
        n = poly.length;
        b = poly[n - 1];
        c = 0;
        while (++i < n) {
            a = b;
            b = poly[i];
            if (this.rayIntersectsSegment(p, a, b)) {
                c++;
            }
        }
        return c % 2 !== 0;
    },
    pointInSegmentBox: function(p, p1, q1) {
        var eps, px, py;
        eps = 1e-9;
        px = p[0], py = p[1];
        if (px < Math.min(p1[0], q1[0]) - eps || px > Math.max(p1[0], q1[0]) + eps || py < Math.min(p1[1], q1[1]) - eps || py > Math.max(p1[1], q1[1]) + eps) {
            return false;
        }
        return true;
    },
    lineIntersection: function(p1, q1, p2, q2) {
        var cross1, cross2, denom, dx1, dx2, dy1, dy2, eps, px, py;
        eps = 1e-9;
        dx1 = p1[0] - q1[0];
        dy1 = p1[1] - q1[1];
        dx2 = p2[0] - q2[0];
        dy2 = p2[1] - q2[1];
        denom = dx1 * dy2 - dy1 * dx2;
        if (Math.abs(denom) < eps) {
            return null;
        }
        cross1 = p1[0] * q1[1] - p1[1] * q1[0];
        cross2 = p2[0] * q2[1] - p2[1] * q2[0];
        px = (cross1 * dx2 - cross2 * dx1) / denom;
        py = (cross1 * dy2 - cross2 * dy1) / denom;
        return [ px, py ];
    },
    segmentsIntersect: function(p1, q1, p2, q2) {
        var p;
        p = this.lineIntersection(p1, q1, p2, q2);
        if (p == null) {
            return false;
        }
        return this.pointInSegmentBox(p, p1, q1) && this.pointInSegmentBox(p, p2, q2);
    },
    polyInsidePoly: function(polyA, polyB) {
        var aA, aB, bA, bB, iA, iB, nA, nB;
        iA = -1;
        nA = polyA.length;
        nB = polyB.length;
        bA = polyA[nA - 1];
        while (++iA < nA) {
            aA = bA;
            bA = polyA[iA];
            iB = -1;
            bB = polyB[nB - 1];
            while (++iB < nB) {
                aB = bB;
                bB = polyB[iB];
                if (this.segmentsIntersect(aA, bA, aB, bB)) {
                    return false;
                }
            }
        }
        return this.pointInPoly(polyA[0], polyB);
    },
    rotatePoint: function(p, alpha, origin) {
        var cosAlpha, sinAlpha, xshifted, yshifted;
        if (origin == null) {
            origin = [ 0, 0 ];
        }
        xshifted = p[0] - origin[0];
        yshifted = p[1] - origin[1];
        cosAlpha = Math.cos(alpha);
        sinAlpha = Math.sin(alpha);
        return [ cosAlpha * xshifted - sinAlpha * yshifted + origin[0], sinAlpha * xshifted + cosAlpha * yshifted + origin[1] ];
    },
    rotatePoly: function(poly, alpha, origin) {
        var j, len, point, results;
        results = [];
        for (j = 0, len = poly.length; j < len; j++) {
            point = poly[j];
            results.push(this.rotatePoint(point, alpha, origin));
        }
        return results;
    },
    intersectPoints: function(poly, origin, alpha) {
        var a, b, closestPointLeft, closestPointRight, eps, i, idx, minSqDistLeft, minSqDistRight, n, p, shiftedOrigin, sqDist, x0, y0;
        eps = 1e-9;
        origin = [ origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha) ];
        x0 = origin[0], y0 = origin[1];
        shiftedOrigin = [ x0 + Math.cos(alpha), y0 + Math.sin(alpha) ];
        idx = 0;
        if (Math.abs(shiftedOrigin[0] - x0) < eps) {
            idx = 1;
        }
        i = -1;
        n = poly.length;
        b = poly[n - 1];
        minSqDistLeft = Number.MAX_VALUE;
        minSqDistRight = Number.MAX_VALUE;
        closestPointLeft = null;
        closestPointRight = null;
        while (++i < n) {
            a = b;
            b = poly[i];
            p = this.lineIntersection(origin, shiftedOrigin, a, b);
            if (p != null && this.pointInSegmentBox(p, a, b)) {
                sqDist = this.squaredDist(origin, p);
                if (p[idx] < origin[idx]) {
                    if (sqDist < minSqDistLeft) {
                        minSqDistLeft = sqDist;
                        closestPointLeft = p;
                    }
                } else if (p[idx] > origin[idx]) {
                    if (sqDist < minSqDistRight) {
                        minSqDistRight = sqDist;
                        closestPointRight = p;
                    }
                }
            }
        }
        return [ closestPointLeft, closestPointRight ];
    },
    findConvexHull: function() {
        var hull = [];
        var count = 0;
        var endpoint;
        if (this.polygon.length > 0) {
            var pointOnHull = this.polygon[0];
            for (var i = 1; i < this.polygon.length; i++) {
                if (this.polygon[i][0] < pointOnHull[0]) {
                    pointOnHull = this.polygon[i];
                }
            }
            var points = this.polygon;
            do {
                count++;
                hull.push(pointOnHull);
                endpoint = points[0];
                for (var j = 1; j < points.length; j++) {
                    if (pointOnHull == endpoint || this.getOrientation(pointOnHull, endpoint, points[j]) == -1) {
                        endpoint = points[j];
                    }
                }
                if (count > 1e3) {
                    console.log("Hull finding is ending to infinity loop!", this.poi);
                    break;
                }
                pointOnHull = endpoint;
            } while (hull[0] !== endpoint);
        }
        return hull;
    },
    getOrientation: function(p1, p2, p) {
        var orin = (p2[0] - p1[0]) * (p[1] - p1[1]) - (p[0] - p1[0]) * (p2[1] - p1[1]);
        if (orin > 0) return -1;
        if (orin < 0) return 1;
        return 0;
    },
    getBounds: function() {
        return this.bounds;
    },
    getRotatedAreaBounds: function() {
        return this.rotatedAreaBounds;
    }
});

var Renderer2D = Class.extend({
    init: function(renderQueue) {
        this.wayfinder = false;
        this.context = false;
        this.enabled = true;
        this.damaged = true;
        this.renderQueue = renderQueue;
    },
    onAdd: function() {},
    enable: function() {
        this.enabled = true;
    },
    disable: function() {
        this.enabled = false;
    },
    damage: function() {
        this.damaged = true;
    },
    undamage: function() {
        this.damaged = false;
    },
    setContext: function(context) {
        this.context = context;
    },
    setWayfinder: function(wayfinder) {
        this.wayfinder = wayfinder;
    },
    render: function(rect) {}
});

var FloorRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(1);
        this.lod = 0;
        this.debugPoint = vec2.create();
        this.mapImages = [];
    },
    setLOD: function(lod) {
        this.lod = lod;
    },
    getLOD: function() {
        return lod;
    },
    getRequiredTiles: function(rect) {
        var tiles = [];
        var splitTo = Math.pow(2, this.lod);
        var width = this.wayfinder.options.mapSize[0] / splitTo;
        var height = this.wayfinder.options.mapSize[1] / splitTo;
        for (var x = 0; x < splitTo; x++) {
            for (var y = 0; y < splitTo; y++) {
                var r = new Rectangle(x * width, y * height, width, height);
                if (rect.intersects(r)) tiles.push(vec2.fromValues(x, y));
            }
        }
        return tiles;
    },
    clear: function() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    renderDefault: function() {
        var T = this.wayfinder.map.getTransformer();
        var image = this.wayfinder.map.getCurrentLOD(0, 0, 0);
        if (!image) return;
        this.context.save();
        this.clear();
        this.context.translate(T.getViewWidth() / 2, T.getViewHeight() / 2);
        this.context.rotate(this.wayfinder.options.map2DRotation * Math.PI / 180);
        this.context.translate(-T.getViewWidth() / 2, -T.getViewHeight() / 2);
        this.context.translate(T.getZoomedMapPosition()[0], T.getZoomedMapPosition()[1]);
        this.context.scale(T.getZoom(), T.getZoom());
        this.context.drawImage(image, 0, 0);
        this.context.restore();
    },
    renderTile: function(tile) {
        if (tile.image === false) return;
        var T = this.wayfinder.map.getTransformer();
        var splitTo = Math.pow(2, this.lod);
        var width = this.wayfinder.options.mapSize[0] / splitTo;
        var height = this.wayfinder.options.mapSize[1] / splitTo;
        this.context.save();
        this.context.translate(T.getViewWidth() / 2, T.getViewHeight() / 2);
        this.context.rotate(this.wayfinder.options.map2DRotation * Math.PI / 180);
        this.context.translate(-T.getViewWidth() / 2, -T.getViewHeight() / 2);
        this.context.translate(T.getZoomedMapPosition()[0], T.getZoomedMapPosition()[1]);
        this.context.drawImage(tile.image, tile.x * width * T.getZoom(), tile.y * height * T.getZoom(), width * T.getZoom(), height * T.getZoom());
        this.context.restore();
    },
    render: function(rect) {
        if (!this.wayfinder.getCurrentFloor()) {
            return;
        }
        var i;
        var T = this.wayfinder.map.getTransformer();
        if (this.lod === 0 || !this.wayfinder.options.enableLOD) {
            this.renderDefault();
        } else {
            var tiles = [];
            var requiredTiles = this.getRequiredTiles(rect);
            var fallbackNeeded = false;
            for (i = 0; i < requiredTiles.length; i++) {
                var tile = this.wayfinder.map.getCurrentLOD(this.lod, requiredTiles[i][0], requiredTiles[i][1]);
                tiles.push({
                    x: requiredTiles[i][0],
                    y: requiredTiles[i][1],
                    image: tile
                });
                if (tile === false) {
                    fallbackNeeded = true;
                }
            }
            if (fallbackNeeded) {
                return this.renderDefault();
            }
            this.clear();
            for (i = 0; i < requiredTiles.length; i++) {
                this.renderTile(tiles[i]);
            }
        }
        if (this.wayfinder.options.debugMouseLocation) {
            this.context.save();
            var pt = T.transformPoint(this.debugPoint);
            this.context.beginPath();
            this.context.fillStyle = "rgba(255,0,0,0.7)";
            this.context.arc(pt[0], pt[1], 5, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        }
    }
});

var POIsRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(4);
    },
    onAdd: function() {
        this.overlayColor = this.wayfinder.settings.getColor("poi.2d.overlay.color", this.wayfinder.options.overlayHighlightColor);
        this.drawAlwaysNames = this.wayfinder.settings.getBoolean("poi.2d.display-names-always", false);
        this.overlayColorFromGroup = this.wayfinder.settings.getBoolean("poi.2d.overlay-group-color", false);
        this.fitToOverlay = this.wayfinder.settings.getBoolean("poi.2d.fit-to-overlay", false);
        this.nameColor = this.wayfinder.settings.getColor("poi.2d.name.color", "#000000");
        this.nameBackgroundColor = this.wayfinder.settings.getColor("poi.2d.name.background-color", "#ffffff");
        this.nameFontSize = this.wayfinder.settings.getInt("poi.2d.name.font-size", 12);
        this.nameFontFamily = this.wayfinder.settings.get("poi.2d.name.font-family", "Arial");
        this.displayRoomID = this.wayfinder.settings.get("poi.2d.name.display-room-id", true);
        this.fontPadding = this.wayfinder.settings.getInt("poi.2d.name.padding", this.wayfinder.options.poi2DTitlePadding);
    },
    render: function(rect) {
        var floor = this.wayfinder.map.getCurrentFloor();
        if (!floor) return;
        var T = this.wayfinder.map.getTransformer();
        this.context.save();
        for (var i = 0; i < floor.nodes.length; i++) {
            if (floor.nodes[i].pois.length === 0) continue;
            var has_overlay = false;
            var hasAd = false;
            var pt = T.transformPoint(floor.nodes[i].position2d);
            var poi = false;
            if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
                for (var j = 0; j < floor.nodes[i].pois.length; j++) {
                    poi = floor.nodes[i].pois[j];
                    if (poi.id in this.wayfinder.overlays && this.isPOIinHighlights(poi)) {
                        var overlay = this.wayfinder.overlays[poi.id];
                        if (overlay && 0 < overlay.length) {
                            has_overlay = true;
                            for (var o in overlay) {
                                this.renderPOIOverlay(overlay[o]);
                            }
                        }
                    }
                    if (poi.getAdvertisements().length > 0) {
                        hasAd = true;
                        break;
                    }
                    if (poi.alwaysVisible || this.isPOIinDisplaying(poi)) {
                        if (poi.image_id !== 0) {
                            this.renderPOIIcon(poi, pt);
                            has_overlay = true;
                        } else if (poi.hasName) {
                            this.renderPOIName(poi, pt);
                            has_overlay = true;
                        }
                    } else if (this.drawAlwaysNames && poi.showInMenu) {
                        this.renderPOIName(poi, pt);
                        has_overlay = true;
                    }
                }
                if (!has_overlay && !poi.showInMenu) {
                    this.context.beginPath();
                    this.context.fillStyle = this.wayfinder.options.poiColor;
                    this.context.arc(pt[0], pt[1], this.wayfinder.options.poiRadius, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }
                if (this.wayfinder.adImage && hasAd) {
                    this.context.drawImage(this.wayfinder.adImage, pt[0] - this.wayfinder.options.poiRadius * 1.5, pt[1] - this.wayfinder.options.poiRadius * 1.5, this.wayfinder.options.poiRadius * 3, this.wayfinder.options.poiRadius * 3);
                }
            }
        }
        this.context.restore();
    },
    isPOIinHighlights: function(poi) {
        for (var i in this.wayfinder.map.highlights) {
            if (this.wayfinder.map.highlights[i] == poi) {
                return true;
            }
        }
        return false;
    },
    isPOIinDisplaying: function(poi) {
        for (var i in this.wayfinder.map.displaying) {
            if (this.wayfinder.map.displaying[i] === poi) {
                return true;
            }
        }
        return false;
    },
    renderPOIOverlay: function(overlay) {
        if (overlay && (overlay.visible || this.isPOIinHighlights(overlay.poi)) && overlay.polygon && overlay.polygon.length > 3) {
            var T = this.wayfinder.map.getTransformer();
            var poi = overlay.poi;
            var groupColor = null;
            if (poi && poi.getGroups()) {
                var group = poi.getGroups()[0];
                if (group && group.getColor()) {
                    groupColor = group.getColor().toString();
                }
            }
            if (this.overlayColorFromGroup && groupColor) {
                this.context.fillStyle = groupColor;
            } else {
                this.context.fillStyle = this.overlayColor.toString();
            }
            var pt = T.transformPoint(overlay.polygon[0]);
            this.context.beginPath();
            this.context.moveTo(pt[0], pt[1]);
            for (var i = 0; i < overlay.polygon.length; i++) {
                pt = T.transformPoint(overlay.polygon[i]);
                this.context.lineTo(pt[0], pt[1]);
            }
            this.context.closePath();
            this.context.fill();
        }
    },
    renderPOIIcon: function(poi, pt) {
        if (poi && poi.getIcon()) {
            var T = this.wayfinder.map.getTransformer();
            var overlay = this.wayfinder.overlays[poi.id];
            var ratio = poi.getIcon().height / poi.getIcon().width;
            var context = this.context;
            var width = this.wayfinder.settings.getInt("poi.2d.icon-size", this.wayfinder.options.poiRadius, poi) * T.getZoom();
            var height = this.wayfinder.settings.getInt("poi.2d.icon-size", this.wayfinder.options.poiRadius, poi) * T.getZoom();
            var rotation = 0;
            if (overlay && 0 < overlay.length) {
                var bounds = overlay[0].getRotatedAreaBounds();
                if (bounds) {
                    var boundWidth = bounds.bounds.width * T.getZoom();
                    var boundHeight = bounds.bounds.height * T.getZoom();
                    pt = T.transformPoint(bounds.center);
                    if (boundWidth < width || boundHeight < height) {
                        if (boundHeight < boundWidth) {
                            width = boundWidth * (boundHeight / width) * .9;
                        } else {
                            width = boundWidth * .9;
                        }
                        if (this.wayfinder.options.map2DRotation !== 0 && this.wayfinder.options.map2DRotation < 180) {
                            rotation = this.wayfinder.options.map2DRotation * (Math.PI / 180) - Math.abs(bounds.angle);
                        } else if (this.wayfinder.options.map2DRotation >= 180) {
                            rotation = this.wayfinder.options.map2DRotation * (Math.PI / 180) - Math.abs(bounds.angle) - Math.PI;
                        }
                    }
                }
            }
            if (this.isPOIinHighlights(poi)) {
                width = width * 1.1;
            }
            var height = width * ratio;
            this.context.save();
            this.context.rotate(rotation);
            pt = T.rotatePoint(pt, -rotation);
            this.context.drawImage(poi.getIcon(), pt[0] - width / 2, pt[1] - height / 2, Math.round(width), Math.round(height));
            this.context.restore();
        }
    },
    renderPOIName: function(poi, pt) {
        var debug = "Timberland";
        var name = poi.getName(this.wayfinder.getLanguage());
        var fontWeight = this.wayfinder.settings.get("poi.2d.name.weight", this.wayfinder.options.poi2DTitleWeight, poi);
        if (typeof name === "string") {
            var smallestFontSize = 6;
            var T = this.wayfinder.map.getTransformer();
            var fontSize = Math.floor(this.nameFontSize * T.getZoom());
            this.context.font = fontWeight + " " + fontSize + "px " + this.nameFontFamily;
            this.context.textAlign = "center";
            var overlay = this.wayfinder.overlays[poi.id];
            var textWidth = this.context.measureText(name).width;
            var textHeight = fontSize;
            var lineSpacing = fontSize * 0;
            var wrap = this.wayfinder.settings.getInt("poi.text.wrap", -1, poi);
            var lines = [ name.replace("&shy;", "") ];
            var rotation = 0;
            if (wrap > -1) {
                lines = this.getLines(name, wrap);
                textWidth = 0;
                textHeight = 0;
                for (var i = 0; i < lines.length; i++) {
                    textWidth = Math.max(textWidth, this.context.measureText(lines[i]).width);
                    textHeight += fontSize + lineSpacing;
                }
            }
            this.context.save();
            if (overlay && 0 < overlay.length) {
                var bounds = overlay[0].getRotatedAreaBounds();
                if (bounds) {
                    var boundWidth = Math.abs(bounds.bounds.width);
                    var boundHeight = Math.abs(bounds.bounds.height);
                    var textAreaLength = boundWidth * T.getZoom() - this.fontPadding;
                    var textAreaHeight = boundHeight * T.getZoom() - this.fontPadding;
                    if (textWidth > boundWidth && boundWidth * 1.3 < boundHeight) {
                        rotation = bounds.angle;
                        if (rotation === 0) {
                            rotation += Math.PI / 2;
                        }
                        textAreaLength = boundWidth * T.getZoom() - this.fontPadding;
                        textAreaHeight = boundHeight * T.getZoom() - this.fontPadding;
                    }
                    pt = T.transformPoint(bounds.center);
                    if (textAreaLength < textWidth) {
                        rotation = bounds.angle;
                        var bigger = textAreaLength / textWidth;
                        fontSize = Math.floor(fontSize * bigger);
                    }
                    if (textAreaHeight < textHeight) {
                        fontSize = Math.floor(textAreaHeight - this.fontPadding) / lines.length;
                    }
                }
            } else {
                fontSize = Math.max(smallestFontSize, Math.floor(fontSize));
            }
            if (this.wayfinder.options.map2DRotation !== 0) {
                rotation = this.wayfinder.options.map2DRotation * (Math.PI / 180) - Math.abs(rotation);
            }
            textWidth = 0;
            textHeight = 0;
            this.context.textBaseline = "middle";
            this.context.font = fontWeight + " " + fontSize + "px " + this.nameFontFamily;
            for (var i = 0; i < lines.length; i++) {
                textWidth = Math.max(textWidth, this.context.measureText(lines[i]).width);
                textHeight += fontSize + lineSpacing;
            }
            var roundness = 5;
            metrics = this.context.measureText(name);
            var bgWidth = textWidth + roundness * 2;
            var bgHeight = textHeight + roundness * 2;
            this.context.rotate(rotation);
            pt = T.rotatePoint(pt, -rotation);
            var offset = lines.length == 1 ? 0 : textHeight / 2 - fontSize / 2;
            if (fontSize > smallestFontSize) {
                if (this.nameBackgroundColor.a > 0) {
                    this.roundedRect(this.context, pt[0] - bgWidth / 2, pt[1] - bgHeight / 2, bgWidth, bgHeight, roundness, this.nameBackgroundColor.toString());
                }
                this.context.fillStyle = this.nameColor.toString();
                for (var j = 0; j < lines.length; j++) {
                    this.context.fillText(lines[j], pt[0], pt[1] - offset);
                    offset -= fontSize + lineSpacing;
                }
            }
            this.context.restore();
        }
    },
    measureText: function() {},
    roundedRect: function(ctx, x, y, width, height, radius, color) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.fillStyle = color;
        ctx.fill();
    },
    renderRotatedAreaBounds: function(ctx, bounds, color, name) {
        var T = this.wayfinder.map.getTransformer();
        var a = T.transformPoint(bounds[0]);
        var b = vec2.add(vec2.create(), a, bounds[1]);
        vec2.scale(b, b, T.getZoom());
        var c = T.transformPoint(bounds[1]);
        var d = T.transformPoint(bounds[0]);
        var e = T.transformPoint(bounds[1]);
        this.context.beginPath();
        this.context.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.context.arc(a[0], a[1], 5 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "rgba(0, 255, 0, 1.0)";
        this.context.arc(b[0], b[1], 3 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "rgba(0, 0, 255, 1.0)";
        this.context.arc(c[0], c[1], 3 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    },
    calcNiceAngle: function(angle, name) {
        if (angle > Math.PI / 2) {
            angle = Math.PI - angle;
        }
        var pis = angle / (Math.PI / 2);
        var nearAng = Math.round(pis) - pis;
        if (Math.abs(nearAng) < .27) {
            angle = Math.round(pis) * (Math.PI / 2);
        }
        return angle;
    },
    nearPI: function(angle) {
        var pis = angle / (Math.PI / 2);
        var nearAng = Math.round(pis) - pis;
        if (Math.abs(nearAng) < .27) {
            return true;
        }
        return false;
    },
    getBoundsMidPoint: function(bounds) {
        var vec = vec2.sub(vec2.create(), bounds[1], bounds[0]);
        vec2.scale(vec, vec, .5);
        var cross = vec2.fromValues(-vec[1], vec[0]);
        vec2.normalize(cross, cross);
        vec2.scale(cross, cross, bounds[2] / 2);
        var value = vec2.add(vec2.create(), bounds[0], vec);
        vec2.sub(value, value, cross);
        return value;
    },
    getPOILocationOnMap: function(poi) {
        var T = this.wayfinder.map.getTransformer();
        var pt = vec2.scale(vec2.create(), T.transformPoint(poi.getNode().position2d), 1 / T.getViewScale());
        if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
            return pt;
        } else {
            return false;
        }
    },
    getPOIOverlayLocationOnMap: function(poi) {
        var overlay = this.wayfinder.overlays[poi.id];
        if (overlay && overlay.length > 0) {
            overlay = overlay[0];
            var T = this.wayfinder.map.getTransformer();
            var pt = vec2.scale(vec2.create(), T.transformPoint(vec2.fromValues(overlay.bounds[0] + overlay.bounds[2] / 2, overlay.bounds[1] + overlay.bounds[3] / 2)), 1 / T.getViewScale());
            if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
                return pt;
            } else return this.getPOILocationOnMap(poi);
        } else {
            return this.getPOILocationOnMap(poi);
        }
    },
    renderPolygon: function(polygon, color, angle) {
        var T = this.wayfinder.map.getTransformer();
        var pt = T.transformPoint(vec2.fromValues(polygon[0][0], polygon[0][1]));
        this.context.fillStyle = color;
        this.context.beginPath();
        if (angle) {
            pt = T.rotatePoint(pt, angle);
        }
        this.context.moveTo(pt[0], pt[1]);
        for (var i = 0; i < polygon.length; i++) {
            pt = T.transformPoint(vec2.set(pt, polygon[i][0], polygon[i][1]));
            if (angle) {
                pt = T.rotatePoint(pt, angle);
            }
            this.context.lineTo(pt[0], pt[1]);
        }
        this.context.closePath();
        this.context.fill();
    },
    drawRectangle: function(ctx, point, width, height, rotation, color) {
        var T = this.wayfinder.map.getTransformer();
        point = T.transformPoint(point);
        if (rotation) {} else {
            rotation = 0;
        }
        width = width * T.getZoom();
        height = height * T.getZoom();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(point[0], point[1]);
        ctx.rotate(rotation);
        ctx.rect(0, 0, width, height);
        ctx.stroke();
        ctx.restore();
    },
    drawPoint: function(point, radius, color) {
        var T = this.wayfinder.map.getTransformer();
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(point[0], point[1], radius * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    },
    getLines: function(text, linesCount) {
        var words = text.replace(/\&shy;/g, " &shy; ").split(" ");
        var textLength = text.replace("&shy;", "-").length;
        var lines = [];
        var currentLine = words[0];
        if (linesCount <= 0) return words;
        if (words.length <= linesCount) return words;
        for (var i = 1; i < words.length; i++) {
            if (words[i].toLowerCase() !== "&shy;") {
                if (currentLine.length > textLength / linesCount) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine += " " + words[i];
                }
            } else {
                if (currentLine.length + 1 > textLength / linesCount) {
                    lines.push(currentLine + "-");
                    currentLine = "";
                } else if (i + 1 < words.length) {
                    lines.push(currentLine + words[++i]);
                    currentLine = "";
                }
            }
        }
        if (currentLine !== "") lines.push(currentLine);
        return lines;
    }
});

var PathRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(3);
        this.spots = [];
        this.position = 0;
        this.timer = false;
        this.animating = false;
        this.paused = false;
        this.msgOffset = vec2.fromValues(0, 10);
        this.message = "";
        this.messagePosition = vec2.fromValues(0, 0);
    },
    onAdd: function() {
        this.spotColor = this.wayfinder.settings.getColor("path.2d.color", "rgba(255,0,0,0.8)");
        this.pathPauseTime = this.wayfinder.settings.getInt("path.2d.pause-time", this.wayfinder.options.pathPauseTime);
        this.messageSize = this.wayfinder.settings.getInt("path.2d.message-size", this.wayfinder.options.path2DMessageSize);
        this.spotSize = this.wayfinder.settings.getFloat("path.2d.size", this.wayfinder.options.pathSpotRadius);
        this.pathSpeed = this.wayfinder.settings.getFloat("path.2d.speed", this.wayfinder.options.pathSpeed);
        this.pathStride = this.wayfinder.settings.getFloat("path.2d.stride", this.wayfinder.options.pathStride);
        if (this.spotSize < .1) this.spotSize = .1;
        if (this.pathSpeed < .05) this.pathSpeed = .05;
        if (this.pathStride < .05) this.pathStride = .05;
    },
    reset: function() {
        this.position = 0;
    },
    generatePath: function(path) {
        this.spots = [];
        var offset = 0;
        var step = this.pathStride;
        var spot, a, b, dir, length;
        for (var i = 1, len = path.nodes.length; i < len; i++) {
            a = path.nodes[i - 1];
            b = path.nodes[i];
            dir = vec2.normalize(vec2.create(), vec2.subtract(vec2.create(), b.position2d, a.position2d));
            length = vec2.distance(a.position2d, b.position2d);
            if (a.type === "portal" && b.type === "portal") {
                this.spots.push({
                    floor: a.floor,
                    position: a.position2d,
                    node: a
                });
            } else {
                for (var pos = offset; pos < length; pos += step) {
                    spot = {
                        floor: a.floor,
                        position: vec2.add(vec2.create(), a.position2d, vec2.scale(vec2.create(), dir, pos))
                    };
                    if (pos + step > length) {
                        offset = step - (length - pos);
                        spot["node"] = path.nodes[i];
                    }
                    this.spots.push(spot);
                }
            }
        }
    },
    setPath: function(path, callback) {
        if (!(path instanceof Path2D) || path.isEmpty()) return;
        if (this.timer !== false) {
            clearTimeout(this.timer);
            this.timer = false;
        }
        this.position = 0;
        this.generatePath(path);
        vec2.set(this.messagePosition, 0, 0);
        var getActualNextFloor = function(spots, position) {
            var count = 0;
            for (var i = position + 1, len = spots.length; i < len; i++) {
                if (spots[i].floor.id == spots[i - 1].floor.id) {
                    count++;
                    if (count == 2) {
                        return spots[i].floor;
                    }
                } else {
                    count = 0;
                }
            }
            return false;
        };
        var scope = this;
        this.animating = true;
        var animate = function() {
            scope.paused = false;
            var currentSpot = scope.spots[scope.position];
            scope.renderSpot(scope.position);
            scope.position++;
            var nextSpot = scope.spots[scope.position];
            if (currentSpot && currentSpot.node) {
                scope.wayfinder.cbOnPathStep(currentSpot);
            }
            if (scope.position === scope.spots.length) {
                scope.animating = false;
                if (callback && typeof callback === "function") {
                    callback();
                }
                return;
            }
            var pause = 0;
            if (nextSpot && currentSpot.floor.id !== nextSpot.floor.id) {
                var targetFloor = getActualNextFloor(scope.spots, scope.position + 1);
                pause = scope.pathPauseTime;
                if (targetFloor && scope.wayfinder.options.pathDisplayInstructions) {
                    scope.messagePosition = scope.wayfinder.map.getTransformer().transformPoint(vec2.add(scope.messagePosition, currentSpot.position, scope.msgOffset));
                    var language = scope.wayfinder.getLanguage();
                    scope.message = scope.wayfinder.translator.get("go_to_floor", [ scope.wayfinder.map.getCurrentFloor().getName(language), targetFloor.getName(language) ]);
                    scope.renderMessage(scope.messagePosition, scope.message);
                    scope.paused = true;
                }
            } else if (scope.position > 1 && scope.spots[scope.position - 2].floor.id !== currentSpot.floor.id) {
                scope.wayfinder.showFloor(currentSpot.floor);
                scope.wayfinder.map.renderer.damageAll();
                scope.wayfinder.map.renderer.render();
            }
            scope.timer = setTimeout(animate, scope.pathSpeed + pause);
        };
        if (!this.paused) {
            this.timer = setTimeout(animate, this.wayfinder.options.pathSpeed);
        }
        if (typeof this.wayfinder.cbOnPathStart === "function" && !path.isEmpty()) {
            this.wayfinder.cbOnPathStart(path.nodes[path.nodes.length - 1]);
        }
    },
    updatePath: function(path) {
        if (!this.animating) {
            this.generatePath(path);
            this.position = this.spots.length;
        }
    },
    clearPath: function() {
        this.position = 0;
        this.spots = [];
        clearTimeout(this.timer);
    },
    renderMessage: function(position, msg) {
        var T = this.wayfinder.map.getTransformer();
        var padding = 20;
        this.context.save();
        this.context.font = "bold " + this.messageSize * T.getViewScale() + "px sans-serif";
        this.context.textBaseline = "top";
        this.context.textAlign = "center";
        this.context.fillStyle = "rgba(40, 40, 40, 0.75)";
        var width = this.context.measureText(msg).width;
        this.context.fillRect(position[0] - (width + padding) / 2, position[1], width + padding, this.messageSize * T.getViewScale() + padding);
        this.context.fillStyle = "rgba(255,255,255,1.0)";
        this.context.fillText(msg, position[0], position[1] + padding / 2);
        this.context.restore();
    },
    renderSpot: function(position) {
        var T = this.wayfinder.map.getTransformer();
        if (!this.spots[position]) return;
        this.context.save();
        var pt = T.transformPoint(this.spots[position].position);
        this.context.beginPath();
        this.context.fillStyle = this.spotColor.toString();
        this.context.arc(pt[0], pt[1], this.spotSize * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    },
    render: function(rect) {
        if (this.spots.length === 0) {
            return;
        }
        var floor = this.wayfinder.map.getCurrentFloor();
        this.context.save();
        for (var i = 0, len = this.position; i < len; i++) {
            if (this.spots[i].floor.id !== floor.id) {
                continue;
            }
            this.renderSpot(i);
        }
        if (this.paused) {
            this.renderMessage(this.messagePosition, this.message);
        }
        this.context.restore();
    }
});

var NodesRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(2);
    },
    render: function(rect) {
        var T = this.wayfinder.map.getTransformer();
        var floor = this.wayfinder.map.getCurrentFloor();
        if (!floor) return;
        this.context.save();
        for (var i in floor.nodes) {
            var pt = T.transformPoint(floor.nodes[i].position2d);
            this.context.beginPath();
            this.context.fillStyle = "rgba(60,120,0,0.7)";
            this.context.arc(pt[0], pt[1], 2, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            this.context.fillText(floor.nodes[i].id, pt[0] + 2, pt[1] + 2);
        }
        this.context.restore();
    }
});

var EdgesRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(2);
    },
    render: function(rect) {
        var T = this.wayfinder.map.getTransformer();
        var floor = this.wayfinder.map.getCurrentFloor();
        if (!floor) return;
        this.context.save();
        for (var i in floor.nodes) {
            var origin = T.transformPoint(floor.nodes[i].position2d);
            for (var j in floor.nodes[i].neighbours) {
                var pt = T.transformPoint(floor.nodes[i].neighbours[j].position2d);
                this.context.lineWidth = 1;
                this.context.strokeStyle = "rgba(10,10,10,0.1)";
                this.context.beginPath();
                this.context.moveTo(origin[0], origin[1]);
                this.context.lineTo(pt[0], pt[1]);
                this.context.closePath();
                this.context.stroke();
            }
        }
        this.context.restore();
    }
});

var ExtrasRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(5);
        this.yahSize = 30;
    },
    onAdd: function() {
        this.yahSize = this.wayfinder.settings.getInt("poi.2d.icon-size", this.wayfinder.options.poiRadius);
    },
    render: function(rect) {
        var scope = this;
        var T = this.wayfinder.map.getTransformer();
        this.context.save();
        this.yahImage = "";
        if (this.wayfinder.options.enableUserLocation && typeof this.wayfinder.getCurrentPosition == "function" && this.wayfinder.getCurrentPosition()) {
            var posData = this.wayfinder.getCurrentPosition();
            var userLocation = T.transformPoint(posData.location);
            this.context.beginPath();
            this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
            this.context.arc(userLocation[0], userLocation[1], 5 * T.getZoom(), 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            var debug = false;
            if (debug) {
                var spot, loc;
                var center = T.transformPoint(posData.center);
                var lineStart = vec2.clone(posData.center);
                var line = T.transformPoint(lineStart);
                for (var i in posData.hotspots) {
                    spot = posData.hotspots[i];
                    loc = T.transformPoint([ spot.location[0], spot.location[1] ]);
                    this.context.beginPath();
                    this.context.fillStyle = "rgba(0, 0, 200, 0.1)";
                    this.context.arc(loc[0], loc[1], spot.radius * spot.power * 5 * T.getZoom(), 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                    this.context.beginPath();
                    this.context.font = "12px Arial";
                    var id = spot.id.split(".");
                    this.context.fillStyle = "green";
                    this.context.fillText(" #" + id[1] + "." + id[2] + " " + Math.floor(spot.pullValue * 100) / 100 + " " + spot.strength.length, loc[0], loc[1]);
                }
            }
            this.context.fill();
        }
        if (this.wayfinder.yahImage && this.wayfinder.options.drawKioskIcon && this.wayfinder.getKioskNode() !== false && this.wayfinder.getKioskNode().floor.id == this.wayfinder.getCurrentFloor().id) {
            var yahImage = this.wayfinder.yahImage;
            var yahPosition = T.transformPoint(this.wayfinder.getKioskNode().position2d);
            var width = this.yahSize * T.getZoom();
            var height = width / yahImage.width * yahImage.height;
            if (this.wayfinder.options.yahRotation === 0) {
                this.context.drawImage(yahImage, yahPosition[0] - width / 2, yahPosition[1] - height, width, height);
            } else {
                this.context.save();
                this.context.translate(yahPosition[0], yahPosition[1]);
                this.context.rotate(scope.wayfinder.options.yahRotation * Math.PI / 180);
                this.context.drawImage(yahImage, -(width / 2), -(height / 2), width, height);
                this.context.restore();
            }
        }
        this.context.restore();
    }
});

var DebugRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(5);
        this.yahSize = 30;
    },
    onAdd: function() {
        this.debugBeacons = this.wayfinder.options.debugBeacons;
    },
    render: function(rect) {
        var scope = this;
        var T = this.wayfinder.map.getTransformer();
        this.context.save();
        if (this.debugBeacons && this.wayfinder.mobileLogic) {
            var beacons = this.wayfinder.mobileLogic.mobileData.ibeacons;
            var found = this.wayfinder.mobileLogic.device.locationManager ? this.wayfinder.mobileLogic.device.locationManager.locator.foundBeacons : {};
            var spot, loc, beacon;
            for (var i in beacons) {
                beacon = beacons[i];
                spot = this.wayfinder.nodes[parseInt(beacon.node_id)];
                if (spot && this.wayfinder.map.getCurrentFloor().id === spot.floor.id) {
                    loc = T.transformPoint(spot.position2d);
                    if (spot.position2d) {
                        this.context.beginPath();
                        if (found[parseInt(spot.id)]) {
                            this.context.fillStyle = "rgba(0, 200, 0, 0.9)";
                        } else {
                            this.context.fillStyle = "rgba(0, 0, 200, 0.9)";
                        }
                        this.context.arc(loc[0], loc[1], 8 * T.getZoom(), 0, Math.PI * 2, true);
                        this.context.closePath();
                        this.context.fill();
                        this.context.font = 7 * T.getZoom() + "px Arial";
                        var id = spot.id.split(".");
                        this.context.fillStyle = "white";
                        this.context.fillText(beacon.major + "." + beacon.minor, loc[0] - 7 * T.getZoom(), loc[1] + 2 * T.getZoom());
                    }
                }
            }
        }
        this.context.restore();
    }
});

var Wayfinder2DRendering = Class.extend({
    init: function(wayfinder, canvas) {
        this.wayfinder = wayfinder;
        this.context = null;
        this.renderers = [];
        if (canvas) {
            this.context = canvas.getContext("2d");
        }
    },
    damageAll: function() {
        for (var i = 0; i < this.renderers.length; i++) {
            this.renderers[i].damage();
        }
    },
    render: function() {
        var T = this.wayfinder.map.getTransformer();
        var rect = new Rectangle(T.getX(), T.getY(), T.getUnzoomedViewWidth(), T.getUnzoomedViewHeight());
        var damaged = false;
        for (var i = 0; i < this.renderers.length; i++) {
            if (this.renderers[i] && this.renderers[i].enabled && this.renderers[i].damaged) {
                this.renderers[i].render(rect);
                this.renderers[i].undamage();
                damaged = true;
            }
        }
    },
    add: function(renderer) {
        if (!(renderer instanceof Renderer2D)) return false;
        renderer.setContext(this.context);
        renderer.setWayfinder(this.wayfinder);
        for (var i = 0; i < this.renderers.length; i++) {
            if (renderer.renderQueue < this.renderers[i].renderQueue) {
                this.renderers.splice(i, 0, renderer);
                renderer.onAdd();
                return true;
            }
        }
        this.renderers.push(renderer);
        renderer.onAdd();
        return true;
    },
    updateRenderers: function() {
        for (var i = 0; i < this.renderers.length; i++) {
            this.renderers[i].setContext(this.context);
        }
    }
});

var Map2D = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.highlights = [];
        this.displaying = [];
        this.LODImages = [];
        this.onUpdateCallback = null;
        this.renderAll = false;
        this.renderOnlyBase = false;
        this.renderCycle = null;
        this.renderInterval = 22;
        this.wayfinder.padding = 0;
        this.mapClickAll = this.wayfinder.settings.getBoolean("poi.2d.map-click-all", false);
        this.onPOIClick = false;
        this.renderer;
        this.wayfinder.cbOnPositionUpdate = ClassCallback(this, this.onPositionUpdate);
    },
    setup: function() {
        this.renderer = new Wayfinder2DRendering(this.wayfinder, this.wayfinder.logic.getCanvas());
        this.mapMover = new Map2DMover(this.wayfinder.logic.getCanvas(), this.wayfinder.options, ClassCallback(this, this.update));
        this.mapMover.cbOnClick = ClassCallback(this, this.onClick);
        this.mapMover.cbOnLongClick = ClassCallback(this, this.onLongClick);
        this.pathRenderer = new PathRenderer2D();
        this.floorRenderer = new FloorRenderer2D();
        this.poisRenderer = new POIsRenderer2D();
        this.extrasRenderer = new ExtrasRenderer2D();
        if (this.wayfinder.options.debug) {
            this.debugRenderer = new DebugRenderer2D();
        }
        this.addRenderers();
    },
    updateCanvas: function(canvas) {
        this.renderer.context = canvas.getContext("2d");
        this.renderer.updateRenderers();
        this.mapMover.view = canvas;
        this.mapMover.bindEvents();
    },
    start: function() {
        var me = this;
        this.renderAll = true;
        var render = function() {
            if (me.renderAll) {
                me.renderer.damageAll();
                me.renderer.render();
                me.renderAll = false;
                me.renderOnlyBase = false;
            } else if (me.renderOnlyBase) {
                me.floorRenderer.damage();
                me.renderer.render();
                me.renderOnlyBase = false;
            }
            me.renderCycle = requestAnimFrame(render, this.renderInterval);
        };
        this.renderCycle = requestAnimFrame(render, this.renderInterval);
    },
    addLODImage: function(floor_id, lod, x, y, image) {
        if (this.LODImages) {
            if (!this.LODImages[floor_id]) {
                this.LODImages[floor_id] = [];
            }
            if (!this.LODImages[floor_id][lod]) {
                this.LODImages[floor_id][lod] = [];
            }
            if (!this.LODImages[floor_id][lod][x]) {
                this.LODImages[floor_id][lod][x] = [];
            }
            if (!this.LODImages[floor_id][lod][x][y]) {
                this.LODImages[floor_id][lod][x][y] = [];
            }
            this.LODImages[floor_id][lod][x][y] = image;
        }
    },
    getLODImage: function(floor_id, lod, x, y) {
        if (this.LODImages[floor_id] && this.LODImages[floor_id][lod] && this.LODImages[floor_id][lod][x] && this.LODImages[floor_id][lod][x][y]) {
            return this.LODImages[floor_id][lod][x][y];
        }
        return false;
    },
    getContainerNeededLevel: function() {
        var lod = 0;
        var size = Math.max(this.getTransformer().getZoomedMapWidth(), this.getTransformer().getZoomedMapHeight());
        var tmpLOD = Math.floor(size / this.wayfinder.options.mapSize[0]);
        lod = Math.min(tmpLOD, this.wayfinder.options.maxLOD);
        return lod;
    },
    getMaxLODLevel: function(floor_id) {
        var level = 0;
        if (this.LODImages[floor_id]) {
            for (var i = 0; i <= this.wayfinder.options.maxLOD; i++) {
                if (this.LODImages[floor_id][i] && this.LODImages[floor_id][i].length == Math.pow(2, i) && this.imagesInLevel(floor_id, i) == Math.pow(4, i)) {
                    level = i;
                }
            }
            level = Math.max(0, Math.min(level, this.wayfinder.options.maxLOD));
        }
        return level;
    },
    imagesInLevel: function(floor_id, lod) {
        var count = 0;
        if (this.LODImages[floor_id] && this.LODImages[floor_id][lod]) {
            for (var x in this.LODImages[floor_id][lod]) {
                if (this.LODImages[floor_id][lod][x]) {
                    count += this.LODImages[floor_id][lod][x].length;
                }
            }
        }
        return count;
    },
    addRenderers: function() {
        this.renderer.add(this.floorRenderer);
        this.renderer.add(this.poisRenderer);
        this.renderer.add(this.pathRenderer);
        this.renderer.add(this.pathRenderer);
        this.renderer.add(this.extrasRenderer);
        this.renderer.add(this.debugRenderer);
    },
    onPositionUpdate: function() {
        var currentPosition = this.wayfinder.geolocation.currentPosition;
        var currentGeoPosition = this.wayfinder.geolocation.currentGeoPosition;
        console.log("=== Position Update ===");
        console.log("Geo.pos: (" + currentGeoPosition[0] + ", " + currentGeoPosition[1] + ")", currentGeoPosition);
        console.log("Map.pos: (" + currentPosition[0] + ", " + currentPosition[1] + ")", currentPosition);
        var nearestNode;
        if (currentPosition[0] === undefined) nearestNode = this.findNearestNodeOnFloor(this.getCurrentFloor(), vec2.fromValues(currentPosition.x, currentPosition.y)); else nearestNode = this.findNearestNodeOnFloor(this.getCurrentFloor(), currentPosition);
        if (nearestNode !== false) {
            this.wayfinder.kiosk = nearestNode;
        }
        this.update(true);
    },
    onClick: function(position) {
        var floor = this.getCurrentFloor();
        if (floor) {
            var pt = position;
            var foundPOIs = [];
            if (this.wayfinder.options.debugMouseLocation) {
                this.floorRenderer.debugPoint = pt;
            }
            for (var i in floor.nodes) {
                if (typeof floor.nodes[i] !== "object" || floor.nodes[i].pois.length === 0) continue;
                for (var j = 0; j < floor.nodes[i].pois.length; j++) {
                    var poi = floor.nodes[i].pois[j];
                    if (this.wayfinder.overlays[poi.id]) {
                        for (var o in this.wayfinder.overlays[poi.id]) {
                            if (typeof this.wayfinder.overlays[poi.id][o] === "object" && this.wayfinder.overlays[poi.id][o].contains(pt)) {
                                foundPOIs.push(poi);
                                if (!this.mapClickAll) continue;
                            }
                        }
                    }
                    if (vec2.distance(pt, floor.nodes[i].position2d) < this.wayfinder.options.poiRadius) {
                        foundPOIs.push(poi);
                        if (!this.mapClickAll) continue;
                    }
                }
            }
            if (foundPOIs.length > 0) {
                var pos = vec2.scale(vec2.create(), position, 1 / this.getTransformer().getViewScale());
                this.openPOI(foundPOIs[0], pos);
                this.wayfinder.events.trigger("map-click", foundPOIs, pos);
            }
        }
    },
    openPOI: function(poi, position) {
        this.clearHighlights();
        this.clearDisplaying();
        if (this.wayfinder.settings.getBoolean("poi.highlight", true, poi)) {
            this.highlights.push(poi);
        }
        if (this.wayfinder.settings.getBoolean("poi.display", true, poi)) {
            this.displaying.push(poi);
        }
        this.pathRenderer.clearPath();
        this.update(true);
        if (this.onPOIClick && typeof this.onPOIClick === "function") {
            this.onPOIClick(poi, position);
        }
    },
    onLongClick: function(position) {
        if (this.wayfinder.options.enableUserYAHSetting) {
            var pt = this.getTransformer().inverseTransformPoint(position);
            var node = this.findNearestNodeOnFloor(this.getCurrentFloor(), pt);
            if (node !== false) {
                this.wayfinder.kiosk = node;
                this.update(true);
            }
        }
    },
    update: function(redrawAll) {
        if (!this.wayfinder.paused) {
            if (this.wayfinder.options.enableLOD) {
                this.checkLODLevels();
            }
            if (redrawAll || this.wayfinder.options.forceFullMapUpdate === true) {
                this.renderAll = true;
            } else {
                this.renderOnlyBase = true;
            }
            if (typeof this.wayfinder.cbOnMapUpdate === "function") {
                this.wayfinder.cbOnMapUpdate(redrawAll);
            }
        }
    },
    resize: function(canvas, width, height, scale) {
        canvas.setAttribute("width", width + "px");
        canvas.setAttribute("height", height + "px");
        if (this.getTransformer()) {
            var transformer = this.getTransformer();
            transformer.setViewSize(vec2.fromValues(width, height));
            transformer.setViewScale(scale);
            transformer.setZoom(0);
            this.update(true);
        }
    },
    getTransformer: function() {
        if (this.mapMover) return this.mapMover.mapTransformer; else {
            return false;
        }
    },
    getCurrentFloor: function() {
        return this.wayfinder.getCurrentFloor();
    },
    fitPathInView: function(path) {
        if (path === false) return;
        var bounds = path.getBounds();
        var T = this.getTransformer();
        var padding = vec2.fromValues(this.wayfinder.padding, this.wayfinder.padding);
        var paddedSize = vec2.add(vec2.create(), bounds.size, padding);
        var newZoom = -1;
        if (bounds.size[0] > bounds.size[1]) {
            newZoom = T.getViewWidth() / paddedSize[0];
            if (newZoom < T.getZoom() || this.wayfinder.options.pathZoomIn) T.setZoom(newZoom);
        } else {
            newZoom = T.getViewHeight() / paddedSize[1];
            if (newZoom < T.getZoom() || this.wayfinder.options.pathZoomIn) T.setZoom(newZoom);
        }
        T.setPosition(bounds.min[0] - (T.getUnzoomedViewWidth() / 2 - bounds.size[0] / 2), bounds.min[1] - (T.getUnzoomedViewHeight() / 2 - bounds.size[1] / 2));
    },
    fitPOIInView: function(poi) {
        if (poi === false) return;
        var overlay = this.wayfinder.overlays[poi.id];
        var bounds = [ 0, 0, 0, 0 ];
        if (overlay && overlay.length > 0) {
            bounds = overlay[0].getBounds();
        } else {
            bounds = [ poi.getNode().position2d[0], poi.getNode().position2d[1], 1, 1 ];
        }
        var T = this.getTransformer();
        var paddedBounds = [ Math.max(bounds[0] - this.wayfinder.padding, 0), Math.max(bounds[1] - this.wayfinder.padding, 0), Math.min(bounds[2] + this.wayfinder.padding * 2, T.getMapWidth()), Math.min(bounds[3] + this.wayfinder.padding * 2, T.getMapHeight()) ];
        if (bounds[2] > bounds[3]) T.setZoom(Math.min(T.getZoom(), T.getViewWidth() / paddedBounds[2])); else T.setZoom(Math.min(T.getZoom(), T.getViewHeight() / paddedBounds[3]));
        var pos = T.getPosition();
        var deltaX = 0;
        var deltaY = 0;
        deltaX = Math.min(0, paddedBounds[0] - pos[0]);
        deltaY = Math.min(0, paddedBounds[1] - pos[1]);
        deltaX = Math.max(deltaX, paddedBounds[0] + paddedBounds[2] - pos[0] - T.getViewWidth());
        deltaY = Math.max(deltaY, paddedBounds[1] + paddedBounds[3] - pos[1] - T.getViewHeight());
        T.setPosition(pos[0] + deltaX, pos[1] + deltaY);
    },
    fitMultiplePOIsInView: function(pois) {
        if (pois === false) return;
        var poi = false;
        var minX = 1024;
        var minY = 1024;
        var maxX = 0;
        var maxY = 0;
        if (this.wayfinder.kiosk) {
            maxX = this.wayfinder.kiosk.position2d[0];
            maxY = this.wayfinder.kiosk.position2d[1];
        }
        var overlay = false;
        for (var i = 0; i < pois.length; i++) {
            poi = pois[i];
            if (poi && poi.getNode()) {
                overlay = this.wayfinder.overlays[poi.id];
                if (overlay && overlay.length > 0 && overlay[0].getBounds()) {
                    minX = Math.min(minX, overlay[0].getBounds()[0]);
                    minY = Math.min(minY, overlay[0].getBounds()[1]);
                    maxX = Math.max(maxX, overlay[0].getBounds()[0] + overlay[0].getBounds()[2]);
                    maxY = Math.max(maxY, overlay[0].getBounds()[1] + overlay[0].getBounds()[3]);
                } else if (poi.getNode().position2d) {
                    minX = Math.min(minX, poi.getNode().position2d[0]);
                    minY = Math.min(minY, poi.getNode().position2d[1]);
                    maxX = Math.max(maxX, poi.getNode().position2d[0]);
                    maxY = Math.max(maxY, poi.getNode().position2d[1]);
                }
            }
        }
        var bounds = [ minX, minY, maxX - minX, maxY - minY ];
        var T = this.getTransformer();
        bounds[0] = Math.max(1, bounds[0] - this.wayfinder.padding);
        bounds[1] = Math.max(1, bounds[1] - this.wayfinder.padding);
        bounds[2] = Math.min(T.mapSize[0], bounds[2] + this.wayfinder.padding * 2);
        bounds[3] = Math.min(T.mapSize[1], bounds[3] + this.wayfinder.padding * 2);
        var zoom = T.getViewWidth() / bounds[2];
        zoom = Math.min(zoom, T.getViewHeight() / bounds[3]);
        T.setZoom(zoom);
        T.setPosition(bounds[0] - (T.getUnzoomedViewWidth() / 2 - bounds[2] / 2), bounds[1] - (T.getUnzoomedViewHeight() / 2 - bounds[3] / 2));
    },
    checkLODLevels: function() {
        if (this.getCurrentFloor()) {
            var floorID = this.getCurrentFloor().id;
            var currentMaxLOD = this.getMaxLODLevel(floorID);
            var neededLODLevel = this.getContainerNeededLevel();
            var isLODLoading = this.isLODLoading(floorID, neededLODLevel);
            var isLODLoaded = this.isLODLoaded(floorID, neededLODLevel);
            if (isLODLoaded) {
                this.floorRenderer.setLOD(neededLODLevel);
            } else {
                this.floorRenderer.setLOD(currentMaxLOD);
            }
            if (!isLODLoading) {
                this.preloadNextLODLevel(floorID, neededLODLevel);
            }
        }
    },
    isLODLoading: function(level, lod) {
        if (this.LODImages[level] && this.LODImages[level][lod]) {
            return true;
        }
        return false;
    },
    isLODLoaded: function(level, lod) {
        if (this.LODImages[level] && this.LODImages[level][lod]) {
            if (this.LODImages[level][lod] && this.LODImages[level][lod].length == Math.pow(2, lod) && this.imagesInLevel(level, lod) == Math.pow(4, lod)) {
                return true;
            }
        }
        return false;
    },
    getCurrentLOD: function(level, x, y) {
        if (level > -1) {
            var img = this.getLODImage(this.getCurrentFloor().id, level, x, y);
            if (img) {
                return img;
            }
        }
        return false;
    },
    preloadNextLODLevel: function(floor, level) {
        if (floor && level < this.wayfinder.options.maxLOD) {
            var scope = this;
            var tiles = Math.pow(2, level);
            if (!this.LODImages[floor]) this.LODImages[floor] = [];
            if (!this.LODImages[floor][level]) this.LODImages[floor][level] = [];
            var setImages = function(data) {
                var params = [];
                for (var i in data) {
                    params = i.split("_");
                    scope.addLODImage(params[0], params[1], params[2], params[3], data[i]);
                }
                scope.afterPreload(floor, level);
            };
            var urls = {};
            for (var x = 0; x < tiles; x++) {
                for (var y = 0; y < tiles; y++) {
                    urls[floor + "_" + level + "_" + x + "_" + y] = {
                        url: WayfinderAPI.getURL("2d", "lod", [ floor, level, x, y ]),
                        type: "image"
                    };
                }
            }
            Logistics.getMultiple(urls, setImages);
        }
    },
    afterPreload: function(floor, level) {
        this.update(true);
    },
    setHighlights: function(_highlights) {
        for (var i in _highlights) this.highlights.push(_highlights[i]);
    },
    clearHighlights: function() {
        this.highlights = [];
    },
    setDisplaying: function(_displaying) {
        for (var i in _displaying) this.displaying.push(_displaying[i]);
    },
    clearDisplaying: function() {
        this.displaying = [];
    },
    findNearestNodeOnFloor: function(floor, position, hasNeighbours) {
        if (!(floor instanceof Floor)) return false;
        var min = Infinity;
        var node = false;
        var _node;
        for (var i in floor.nodes) {
            _node = floor.nodes[i];
            if (_node.neighbours && !(_node.neighbours.length > 0)) {
                continue;
            }
            var d = vec2.distance(position, _node.position2d);
            if (d < min) {
                node = _node;
                min = d;
            }
        }
        return node;
    },
    setZoom: function(percentage) {
        var T = this.getTransformer();
        T.setZoomPercentage(percentage);
    },
    zoomIn: function() {
        this.mapMover.mapTransformer.zoomIn();
    },
    zoomOut: function() {
        this.mapMover.mapTransformer.zoomOut();
    },
    redraw: function() {
        if (this.renderer) {
            this.renderer.damageAll();
            this.renderer.render();
        }
    },
    getPOILocationOnMap: function(poi) {
        return this.poisRenderer.getPOILocationOnMap(poi);
    },
    getPOIOverlayLocationOnMap: function(poi) {
        return this.poisRenderer.getPOIOverlayLocationOnMap(poi);
    },
    onMapUpdate: function() {
        if (typeof this.wayfinder.cbOnMapUpdate === "function") {
            this.wayfinder.cbOnMapUpdate();
        }
    }
});

var Map2DFallback = Map2D.extend({
    init: function(wayfinder) {
        this.wayfinder = false;
        if (wayfinder instanceof Wayfinder) this.wayfinder = wayfinder;
        this.currentFloorID = 0;
        this.highlights = new Array();
        this.LODImages = new Array();
        this.onPOIClick = false;
        this.wayfinder.cbOnPositionUpdate = ClassCallback(this, this.onPositionUpdate);
        this.map = $("<div id='" + this.wayfinder.options.map + "_fallback''></div>");
        $("#" + this.wayfinder.options.map).parent().append(this.map);
        this.map.text("Your browser does not support this application. Please upgrade your browser.");
    },
    update: function() {
        if (this.currentFloorID > 0) {
            var img = this.getCurrentLOD(this.currentFloorID, 0, 0);
            log(this.currentFloorID, img);
            if (img) {
                this.map.append(img);
            }
        }
    },
    fitPathInView: function() {},
    fitMultiplePOIsInView: function() {},
    resize: function(width, height) {},
    zoomIn: function() {},
    zoomOut: function() {},
    addRenderers: function() {},
    redraw: function() {}
});

var Map2DMover = Class.extend({
    init: function(view, options, cbUpdate) {
        this.view = view;
        this.options = options;
        this.cbUpdate = cbUpdate;
        this.cbOnClick = false;
        this.cbOnLongClick = false;
        this.mouseDelta = vec2.create();
        this.mouseDown = false;
        this.mouseDelta = vec2.create();
        this.smoothPanning = true;
        this.dragTimeout = null;
        this.panInterval = 10;
        this.panSensitivity = .3;
        this.lastPinch = 0;
        this.rendering = false;
        this.lastDraw = -1;
        this.waitForFullRedraw = 300;
        this.fullRedrawTimer = null;
        this._dragVec = vec2.create();
        this.zeroVec = vec2.create();
        this.setup();
    },
    setup: function() {
        this.mapTransformer = new Map2DTransformer(vec2.fromValues(this.options.mapSize[0], this.options.mapSize[1]), vec2.fromValues(this.view.offsetWidth, this.view.offsetHeight), true, this.options);
        if (!this.options.disableMap2DMovement) {
            this.bindEvents();
        }
    },
    bindEvents: function() {
        Hammer(this.view).on("pinch", ClassCallback(this, this.onPinch));
        Hammer(this.view).on("hold", ClassCallback(this, this.onHold));
        Hammer(this.view).on("tap", ClassCallback(this, this.onTap));
        Hammer(this.view).on("release", ClassCallback(this, this.stop));
        Hammer(this.view).on("drag", ClassCallback(this, this.onDrag));
        Hammer(this.view).on("dragend", ClassCallback(this, this.onEndDrag));
        Hammer(this.view).on("dragstart", ClassCallback(this, this.onStartDrag));
        this.bindMouseWheel(ClassCallback(this, this.onWheel));
    },
    stop: function(event) {
        var me = this;
        this.cbUpdate(true);
        this.lastPinch = 0;
        this.mouseDelta = vec2.create();
    },
    getRelativeMousePosition: function(v) {
        var left = this.view.getBoundingClientRect().left + document.body.scrollLeft;
        var top = this.view.getBoundingClientRect().top + document.body.scrollTop;
        var translatePoint = vec2.sub(vec2.create(), v, vec2.fromValues(left, top));
        translatePoint = this.mapTransformer.inverseTransformPoint(translatePoint);
        return translatePoint;
    },
    bindMouseWheel: function(callback) {
        if (this.view.addEventListener) {
            this.view.addEventListener("mousewheel", callback, false);
            this.view.addEventListener("DOMMouseScroll", callback, false);
        } else {
            this.view.attachEvent("onmousewheel", callback);
        }
    },
    onStartDrag: function(event) {
        this.stop();
        this.mouseDelta = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);
    },
    onDrag: function(event) {
        event.gesture.preventDefault();
        if (!this.rendering && event.type == "drag") {
            var v = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);
            vec2.scale(v, v, this.mapTransformer.getViewScale());
            var me = this;
            var panVector = vec2.sub(this._dragVec, this.mouseDelta, v);
            this.pan(panVector, false);
            this.mouseDelta = v;
        }
    },
    pan: function(panVector, redrawAll) {
        this.rendering = true;
        if (typeof redrawAll === "undefined") redrawAll = true;
        if (this.options.map2DRotation !== 0) {
            var len = vec2.len(panVector);
            panVector = this.mapTransformer.rotatePointAroundCenter(panVector, this.zeroVec, -this.options.map2DRotation);
            vec2.normalize(panVector, panVector);
            vec2.scale(panVector, panVector, len);
        }
        this.mapTransformer.move(panVector);
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(redrawAll);
            this.lastDraw = new Date().getTime();
        }
        if (this.fullRedrawTimer === null) {
            this.fullRedrawTimer = setTimeout(ClassCallback(this, this.checkFullDraw), this.waitForFullRedraw);
        }
        this.rendering = false;
    },
    checkFullDraw: function() {
        var time = new Date().getTime();
        if (this.lastDraw > 0 && time - this.lastDraw > this.waitForFullRedraw) {
            if (typeof this.cbUpdate === "function") {
                this.cbUpdate(true);
            }
            this.fullRedrawTimer = null;
            this.lastDraw = -1;
        } else if (this.lastDraw !== -1) {
            this.fullRedrawTimer = setTimeout(ClassCallback(this, this.checkFullDraw), this.waitForFullRedraw);
        }
    },
    onEndDrag: function(event) {
        if (event !== undefined && event.type === "dragend" && event.gesture) {
            event.gesture.preventDefault();
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            var velocity = vec2.fromValues(event.gesture.velocityX, event.gesture.velocityY);
            if (this.smoothPanning && vec2.sqrLen(velocity) > .3) {
                var dragLength = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);
                var smoothDistance = vec2.create();
                vec2.multiply(smoothDistance, dragLength, velocity);
                var me = this;
                var smoothScrollTimer = function() {
                    var distance = vec2.create();
                    vec2.div(distance, smoothDistance, vec2.fromValues(13, 13));
                    vec2.sub(smoothDistance, smoothDistance, distance);
                    var len = vec2.sqrLen(distance);
                    if (len > 3) {
                        if (me.timeout) clearTimeout(me.timeout);
                        me.timeout = setTimeout(smoothScrollTimer, me.panInterval);
                        if (!this.rendering) {
                            var v = vec2.negate(vec2.create(), distance);
                            me.pan(v, false);
                        }
                    } else {
                        me.pan(vec2.create(), true);
                        me.lastDraw = -1;
                    }
                };
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(smoothScrollTimer, this.panInterval);
            }
            this.pan(vec2.create(), true);
            this.lastDraw = -1;
        }
    },
    onHold: function(event) {
        if (this.cbOnLongClick && typeof this.cbOnLongClick === "function") {
            this.cbOnLongClick(vec2.fromValues(event.gesture.center.pageX, event.gesture.center.pageY));
        }
    },
    onTap: function(event) {
        event.gesture.preventDefault();
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.cbOnClick && typeof this.cbOnClick === "function") {
            this.cbOnClick(this.getRelativeMousePosition(vec2.fromValues(event.gesture.center.pageX, event.gesture.center.pageY)));
        }
    },
    onWheel: function(event) {
        event = window.event || event;
        if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
        var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
        var sign = function(a) {
            if (a < 0) return -1;
            if (a > 0) return 1;
            return 0;
        };
        var direction = 0;
        if (typeof delta != "undefined") direction = sign(delta); else if (typeof event.detail != "undefined") direction = -sign(event.detail);
        if (direction > 0) this.mapTransformer.zoomIn(); else if (direction < 0) this.mapTransformer.zoomOut(); else return;
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    onPinch: function(event) {
        event.gesture.preventDefault();
        if (!this.rendering && event.gesture) {
            if (this.lastPinch === 0) {
                this.lastPinch = this.mapTransformer.getZoom();
            }
            var scale = this.lastPinch * event.gesture.scale;
            this.pinch(scale);
        }
    },
    pinch: function(scale) {
        this.rendering = true;
        if (scale !== 0) {
            this.mapTransformer.setZoom(scale);
            if (this.cbUpdate && typeof this.cbUpdate === "function") {
                this.cbUpdate(true);
            }
        }
        this.rendering = false;
    },
    onDoubleTap: function(event) {
        var center = event.gesture.center;
        var newZoom = this.mapTransformer.getZoom() + this.mapTransformer.getZoomStep() * 2;
        var v = vec2.create();
        vec2.sub(v, vec2.fromValues(center.pageX, center.pageY), vec2.fromValues(this.view.getBoundingClientRect().left, this.view.getBoundingClientRect().top));
        var v2 = this.mapTransformer.inverseTransformPoint(center.pageX, center.pageY);
        this.mapTransformer.setPosition(v2.x, v2.y);
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    onZoomInPressed: function(event) {
        this.mapTransformer.zoomIn();
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
        this.zoomTimer = setTimeout(ClassCallback(this, this.onZoomInPressed), this.zoomInterval);
    },
    onZoomOutPressed: function(event) {
        this.mapTransformer.zoomOut();
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
        this.zoomTimer = setTimeout(ClassCallback(this, this.onZoomOutPressed), this.zoomInterval);
    },
    onZoomEnd: function() {
        if (this.zoomTimer !== false) {
            clearTimeout(this.zoomTimer);
            this.zoomTimer = false;
        }
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    viewScale: function() {
        var view = vec2.fromValues(this.view.offsetWidth, this.view.offsetHeight);
        var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
        var win = vec2.fromValues(x, y);
        return vec2.sqrLen(view) / vec2.sqrLen(win);
    }
});

var Map2DTransformer = Class.extend({
    init: function(_mapSize, _viewSize, _centering, _options) {
        this.position = vec2.create();
        this.zoom = 1;
        this.options = _options;
        this.mapSize = _mapSize;
        this.viewSize = _viewSize;
        this.viewScale = 1;
        this.zoomRange = vec2.fromValues(.1, 3 * this.viewScale);
        this.zoomSteps = 30;
        this.centering = _centering !== undefined ? _centering : true;
        this.padding = this.options.pathZoomPadding !== undefined ? this.options.pathZoomPadding : 0;
        this.centerIfZoomedOut();
        this.cbOnZoomChange = null;
    },
    getPosition: function() {
        return this.position;
    },
    getViewSize: function() {
        return this.viewSize;
    },
    getViewScale: function() {
        return this.viewScale;
    },
    getMapPosition: function() {
        return vec2.negate(vec2.create(), this.position);
    },
    getZoomedMapPosition: function() {
        return vec2.negate(vec2.create(), this.getZoomedPosition());
    },
    getZoomedPosition: function() {
        return vec2.scale(vec2.create(), this.position, this.zoom);
    },
    getX: function() {
        return this.position[0];
    },
    getY: function() {
        return this.position[1];
    },
    getZoomedX: function() {
        return this.position[0] * this.zoom;
    },
    getZoomedY: function() {
        return this.position[1] * this.zoom;
    },
    getZoom: function() {
        return this.zoom;
    },
    getZoomRange: function() {
        return this.zoomRange;
    },
    getZoomStep: function() {
        return (this.zoomRange[1] * this.viewScale - this.zoomRange[0]) / this.zoomSteps;
    },
    setPosition: function(_x, _y) {
        this.position[0] = _x;
        this.position[1] = _y;
        this.position[0] = Math.min(this.position[0], this.getMapWidth() - this.getUnzoomedViewWidth());
        this.position[1] = Math.min(this.position[1], this.getMapHeight() - this.getUnzoomedViewHeight());
        this.position[0] = Math.max(this.position[0], 0);
        this.position[1] = Math.max(this.position[1], 0);
        this.centerIfZoomedOut();
    },
    setZoomedPosition: function(x, y) {
        this.setPosition(x / this.getZoom(), y / this.getZoom());
    },
    move: function(delta) {
        this.setPosition(this.position[0] + delta[0] / this.getZoom(), this.position[1] + delta[1] / this.getZoom());
    },
    setViewSize: function(_viewSize) {
        this.viewSize = _viewSize;
        var minLen = Math.min(this.viewSize[0], this.viewSize[1]);
        var maxLen = Math.max(this.viewSize[0], this.viewSize[1]);
        this.zoomRange[0] = minLen / this.mapSize[0];
        this.zoomRange[1] = Math.max(this.options.maxLOD, this.mapSize[0] * this.options.maxLOD / maxLen);
    },
    setViewScale: function(_viewScale) {
        this.viewScale = _viewScale;
    },
    setZoom: function(_zoom) {
        var oldZoomWidth = this.getUnzoomedViewWidth();
        var oldZoomHeight = this.getUnzoomedViewHeight();
        this.zoom = _zoom;
        if (this.zoom < this.zoomRange[0]) this.zoom = this.zoomRange[0];
        if (this.zoom > this.zoomRange[1] * this.viewScale) this.zoom = this.zoomRange[1] * this.viewScale;
        var viewWidthDelta = this.getUnzoomedViewWidth() - oldZoomWidth;
        var viewHeightDelta = this.getUnzoomedViewHeight() - oldZoomHeight;
        this.setPosition(this.getX() - viewWidthDelta / 2, this.getY() - viewHeightDelta / 2);
        this.centerIfZoomedOut();
        if (typeof this.cbOnZoomChange === "function") {
            var zoomPercentage = (this.zoomRange[1] - this.zoom) / (this.zoomRange[1] - this.zoomRange[0]);
            this.cbOnZoomChange(zoomPercentage);
        }
    },
    setZoomPercentage: function(percentage) {
        var zoom = this.zoomRange[1] - (this.zoomRange[1] - this.zoomRange[0]) * (1 - percentage);
        this.setZoom(zoom);
    },
    centerIfZoomedOut: function() {
        if (!this.centering) return;
        if (this.getUnzoomedViewWidth() >= this.getMapWidth()) this.position[0] = -(this.getUnzoomedViewWidth() - this.getMapWidth()) / 2;
        if (this.getUnzoomedViewHeight() >= this.getMapHeight()) this.position[1] = -(this.getUnzoomedViewHeight() - this.getMapHeight()) / 2;
    },
    zoomIn: function() {
        this.setZoom(this.getZoom() + this.getZoomStep());
    },
    zoomOut: function() {
        this.setZoom(this.getZoom() - this.getZoomStep());
    },
    zoomToFit: function() {
        if (this.mapSize[0] > this.mapSize[1]) this.zoom = this.viewSize[0] / this.mapSize[0]; else this.zoom = this.viewSize[1] / this.mapSize[1];
        if (this.getZoomedMapHeight() > this.getViewHeight()) this.zoom = Math.min(this.viewSize[0], this.viewSize[1]) / Math.min(this.mapSize[0], this.mapSize[1]);
        this.setZoom(this.zoom);
    },
    getMapWidth: function() {
        return this.mapSize[0];
    },
    getMapHeight: function() {
        return this.mapSize[1];
    },
    getZoomedMapWidth: function() {
        return this.mapSize[0] * this.zoom;
    },
    getZoomedMapHeight: function() {
        return this.mapSize[1] * this.zoom;
    },
    getViewWidth: function() {
        return this.viewSize[0];
    },
    getViewHeight: function() {
        return this.viewSize[1];
    },
    getUnzoomedViewWidth: function() {
        return this.viewSize[0] / this.zoom;
    },
    getUnzoomedViewHeight: function() {
        return this.viewSize[1] / this.zoom;
    },
    transformPoint: function(point) {
        var translatedPoint = vec2.add(vec2.create(), this.getZoomedMapPosition(), vec2.scale(vec2.create(), point, this.zoom));
        if (this.options.map2DRotation !== 0) {
            return this.rotatePointAroundCenter(translatedPoint, vec2.fromValues(this.getViewWidth() / 2, this.getViewHeight() / 2), this.options.map2DRotation);
        }
        return translatedPoint;
    },
    inverseTransformPoint: function(point) {
        if (this.options.map2DRotation !== 0) {
            var center = vec2.fromValues(this.getViewWidth() / (2 * this.getViewScale()), this.getViewHeight() / (2 * this.getViewScale()));
            point = this.rotatePointAroundCenter(point, center, -this.options.map2DRotation);
        }
        vec2.scale(point, point, this.viewScale);
        vec2.add(point, point, this.getZoomedPosition());
        vec2.scale(point, point, 1 / this.zoom);
        return point;
    },
    getDrawingArea: function() {
        var unZoomed = this.viewSize;
        return vec2.add(vec2.create(), this.viewSize, this.getZoomedPosition());
    },
    rotatePoint: function(point, angle) {
        var x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
        var y = point[1] * Math.cos(angle) + point[0] * Math.sin(angle);
        return vec2.fromValues(x, y);
    },
    rotatePointAroundCenter: function(point, center, angle) {
        angle = angle * Math.PI / 180;
        return vec2.fromValues(Math.cos(angle) * (point[0] - center[0]) - Math.sin(angle) * (point[1] - center[1]) + center[0], Math.sin(angle) * (point[0] - center[0]) + Math.cos(angle) * (point[1] - center[1]) + center[1]);
    }
});

var Path2D = Class.extend({
    init: function() {
        this.nodes = [];
    },
    isEmpty: function() {
        if (this.nodes.length === 0) return true;
        return false;
    },
    getBounds: function(fnTransform) {
        var bounds = {
            min: vec2.create(),
            max: vec2.create(),
            center: vec2.create(),
            size: vec2.create()
        };
        if (this.nodes.length > 0) {
            bounds.min[0] = this.nodes[0].position2d[0];
            bounds.min[1] = this.nodes[0].position2d[1];
            bounds.max[0] = this.nodes[0].position2d[0];
            bounds.max[1] = this.nodes[0].position2d[1];
            for (var i = 1; i < this.nodes.length; i++) {
                var x = this.nodes[i].position2d[0];
                var y = this.nodes[i].position2d[1];
                if (x < bounds.min[0]) bounds.min[0] = x;
                if (y < bounds.min[1]) bounds.min[1] = y;
                if (x > bounds.max[0]) bounds.max[0] = x;
                if (y > bounds.max[1]) bounds.max[1] = y;
            }
        }
        if (fnTransform && typeof fnTransform === "function") {
            bounds.min = fnTransform(bounds.min);
            bounds.max = fnTransform(bounds.max);
        }
        bounds.size[0] = bounds.max[0] - bounds.min[0];
        bounds.size[1] = bounds.max[1] - bounds.min[1];
        bounds.center[0] = bounds.min[0] + bounds.size[0] / 2;
        bounds.center[1] = bounds.min[1] + bounds.size[1] / 2;
        return bounds;
    },
    getDistance: function() {
        var length = 0;
        if (this.nodes.length == 0) {
            return length;
        }
        var last = this.nodes[0];
        for (var i = 1, len = this.nodes.length; i < len; i++) {
            length += vec2.dist(last.position2d, this.nodes[i].position2d);
            last = this.nodes[i];
        }
        return length;
    }
});

var PathFinder2D = Class.extend({
    init: function(nodes) {
        this.nodes = nodes;
        this.Infinity = Infinity;
        this.reset();
    },
    reset: function() {
        this.dist = {};
        this.previous = {};
        this.Q = [];
        this.searched = {};
    },
    getNodeWithSmallestDistance: function() {
        var min = Infinity;
        var index = 0;
        for (var i = 1; i < this.Q.length; i++) {
            if (this.dist[this.Q[i]] < min) {
                min = this.dist[this.Q[i]];
                index = i;
            }
        }
        return index;
    },
    isSearched: function(node_id) {
        return node_id in this.searched;
    },
    decreaseKey: function(node_id) {
        var index = 0;
        for (;index < this.Q.length; index++) {
            if (this.Q[index] == node_id) break;
        }
        for (var i = index - 1; i > 0; i--) {
            if (this.dist[this.Q[index]] < this.dist[this.Q[i]]) {
                var tmp = this.Q[i];
                this.Q[i] = this.Q[index];
                this.Q[index] = tmp;
                index = i;
            } else break;
        }
    },
    distanceBetween: function(a, b) {
        return vec3.len(vec3.fromValues(b.position[0] - a.position[0], b.position[1] - a.position[1], b.position[2] - a.position[2]));
    },
    find: function(source, dest) {
        this.reset();
        if (!(source in this.nodes) || !(dest in this.nodes)) return false;
        for (var i in this.nodes) {
            this.dist[i] = this.Infinity;
            this.previous[i] = null;
            this.Q.push(i);
        }
        this.dist[source] = 0;
        while (this.Q.length > 0) {
            var nodeIndex = this.getNodeWithSmallestDistance();
            var u = this.Q[nodeIndex];
            if (this.dist[u] == this.Infinity) {
                break;
            }
            this.Q.splice(nodeIndex, 1);
            this.searched[u] = true;
            if (u == dest) {
                var path = new Path2D();
                u = dest;
                while (this.previous[u] !== null) {
                    path.nodes.push(this.nodes[u]);
                    u = this.previous[u];
                }
                path.nodes.push(this.nodes[source]);
                path.nodes.reverse();
                return path;
            }
            for (var i = 0; i < this.nodes[u].neighbours.length; i++) {
                var neighbour = this.nodes[u].neighbours[i];
                if (this.isSearched(neighbour.id)) continue;
                var alt = this.dist[u] + this.distanceBetween(this.nodes[u], neighbour) + neighbour.weight;
                if (alt < this.dist[neighbour.id]) {
                    this.dist[neighbour.id] = alt;
                    this.previous[neighbour.id] = u;
                    this.decreaseKey(neighbour.id);
                }
            }
        }
        return false;
    }
});